import shutil
import uuid
from datetime import datetime
from pathlib import Path

import config
import cv2
import numpy as np
import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from utils.detector import RoadHazardDetector

# Initialize FastAPI app
app = FastAPI(
    title="Road Hazard Detection API",
    description="API for detecting potholes and speed bumps using YOLO",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize detector (will be loaded on startup)
detector = None


@app.on_event("startup")
async def startup_event():
    """Initialize the YOLO model on startup"""
    global detector
    try:
        detector = RoadHazardDetector()
        print("✓ Server started successfully!")
        print(f"✓ Model loaded from: {config.MODEL_PATH}")
        print(f"✓ Listening on http://{config.HOST}:{config.PORT}")
    except FileNotFoundError as e:
        print(f"✗ ERROR: {e}")
        print(f"✗ Please place your 'best.pt' file in: {config.MODEL_PATH.parent}")
        print(
            "✗ Server will start but detection endpoints will fail until model is available."
        )


@app.get("/")
async def root():
    """Health check endpoint"""
    model_status = "loaded" if detector and detector.model else "not loaded"
    return {
        "status": "running",
        "message": "Road Hazard Detection API",
        "model_status": model_status,
        "version": "1.0.0",
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "model_loaded": detector is not None,
        "model_path": str(config.MODEL_PATH),
        "confidence_threshold": config.CONFIDENCE_THRESHOLD,
        "iou_threshold": config.IOU_THRESHOLD,
    }


@app.post("/api/detect/image")
async def detect_image(image: UploadFile = File(...)):
    """
    Detect road hazards in an uploaded image.

    Args:
        image: Uploaded image file (JPG, PNG, etc.)

    Returns:
        JSON with detections array containing class, confidence, and bounding boxes
    """
    if not detector:
        raise HTTPException(
            status_code=503, detail="Model not loaded. Please check server logs."
        )

    # Validate file extension
    file_ext = Path(image.filename).suffix.lower()
    if file_ext not in config.SUPPORTED_IMAGE_FORMATS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported image format. Supported: {config.SUPPORTED_IMAGE_FORMATS}",
        )

    # Save uploaded file
    file_id = str(uuid.uuid4())
    input_path = config.UPLOAD_DIR / f"{file_id}{file_ext}"

    try:
        with input_path.open("wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Run detection
        annotated_image, detections = detector.detect_image(str(input_path))

        # Save annotated image (optional, for debugging)
        output_path = config.OUTPUT_DIR / f"{file_id}_detected{file_ext}"
        cv2.imwrite(str(output_path), annotated_image)

        return JSONResponse(
            content={
                "success": True,
                "detections": detections,
                "total_detections": len(detections),
                "image_id": file_id,
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

    finally:
        # Cleanup uploaded file
        if input_path.exists():
            input_path.unlink()


@app.post("/api/detect/video")
async def detect_video(video: UploadFile = File(...)):
    """
    Detect road hazards in an uploaded video.

    Args:
        video: Uploaded video file (MP4, AVI, MOV, etc.)

    Returns:
        Annotated video file with detections drawn
    """
    if not detector:
        raise HTTPException(
            status_code=503, detail="Model not loaded. Please check server logs."
        )

    # Validate file extension
    file_ext = Path(video.filename).suffix.lower()
    if file_ext not in config.SUPPORTED_VIDEO_FORMATS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported video format. Supported: {config.SUPPORTED_VIDEO_FORMATS}",
        )

    # Save uploaded file
    file_id = str(uuid.uuid4())
    input_path = config.UPLOAD_DIR / f"{file_id}{file_ext}"
    output_path = config.OUTPUT_DIR / f"{file_id}_detected.mp4"

    try:
        # Save uploaded video
        with input_path.open("wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        # Run detection on video
        detections = detector.detect_video(str(input_path), str(output_path))

        # Return the processed video
        return FileResponse(
            path=str(output_path),
            media_type="video/mp4",
            filename=f"detected_{video.filename}",
            headers={"X-Total-Detections": str(len(detections))},
        )

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Video processing failed: {str(e)}"
        )

    finally:
        # Cleanup uploaded file
        if input_path.exists():
            input_path.unlink()


@app.post("/api/detect/frame")
async def detect_frame(frame: UploadFile = File(...)):
    """
    Detect road hazards in a single frame (for live detection).

    Args:
        frame: Uploaded frame image

    Returns:
        JSON with detections for that frame
    """
    if not detector:
        raise HTTPException(
            status_code=503, detail="Model not loaded. Please check server logs."
        )

    try:
        # Read frame from upload
        contents = await frame.read()
        nparr = np.frombuffer(contents, np.uint8)
        frame_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame_img is None:
            raise HTTPException(status_code=400, detail="Invalid image data")

        # Log frame info
        print(f"📸 Frame received: shape={frame_img.shape}, size={len(contents)} bytes")

        # Run detection
        _, detections = detector.detect_frame(frame_img)

        # Log detection results
        print(f"🔍 Detections found: {len(detections)}")
        if len(detections) > 0:
            for det in detections:
                print(f"  - {det['class']}: {det['confidence']:.2%} at {det['bbox']}")
        else:
            print(f"  ⚠️ No detections above confidence threshold ({config.CONFIDENCE_THRESHOLD})")

        return JSONResponse(
            content={
                "success": True,
                "detections": detections,
                "total_detections": len(detections),
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Frame detection failed: {str(e)}")


@app.delete("/api/cleanup")
async def cleanup_files():
    """
    Cleanup old files in upload and output directories.
    Removes files older than 1 hour.
    """
    try:
        deleted_count = 0
        current_time = datetime.now().timestamp()

        for directory in [config.UPLOAD_DIR, config.OUTPUT_DIR]:
            for file_path in directory.glob("*"):
                if file_path.is_file():
                    file_age = current_time - file_path.stat().st_mtime
                    if file_age > 3600:  # 1 hour
                        file_path.unlink()
                        deleted_count += 1

        return {"success": True, "message": f"Cleaned up {deleted_count} old files"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cleanup failed: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=config.HOST,
        port=config.PORT,
        reload=True,  # Auto-reload on code changes
        log_level="info",
    )
