# Road Hazard Detection Backend

FastAPI backend for detecting potholes and speed bumps using a custom YOLO model.

## Setup Instructions

### 1. Install Python Dependencies

```bash
# Navigate to backend directory
cd backend

# Install required packages
pip install -r requirements.txt
```

### 2. Add Your YOLO Model

**IMPORTANT:** Place your trained YOLO model file in the `models` directory:

```
backend/
├── models/
│   └── best.pt  <- Place your model file here
```

### 3. Configure Environment (Optional)

Copy `.env.example` to `.env` and adjust settings if needed:

```bash
cp .env.example .env
```

Default configuration:
- Server runs on `http://localhost:8000`
- Confidence threshold: 0.25
- IOU threshold: 0.45

### 4. Run the Server

```bash
# From the backend directory
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The server will start at `http://localhost:8000`

### 5. Test the API

Visit `http://localhost:8000` in your browser - you should see:
```json
{
  "status": "running",
  "message": "Road Hazard Detection API",
  "model_status": "loaded",
  "version": "1.0.0"
}
```

## API Endpoints

### Health Check
- **GET** `/` - Basic health check
- **GET** `/health` - Detailed health status

### Detection Endpoints
- **POST** `/api/detect/image` - Upload image for detection
- **POST** `/api/detect/video` - Upload video for processing
- **POST** `/api/detect/frame` - Detect in single frame (for live camera)

### Maintenance
- **DELETE** `/api/cleanup` - Remove old temporary files

## Testing with cURL

### Image Detection
```bash
curl -X POST "http://localhost:8000/api/detect/image" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@path/to/your/image.jpg"
```

### Video Detection
```bash
curl -X POST "http://localhost:8000/api/detect/video" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "video=@path/to/your/video.mp4" \
  --output detected_video.mp4
```

## Project Structure

```
backend/
├── main.py              # FastAPI application
├── config.py            # Configuration settings
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
├── models/              # YOLO model directory
│   └── best.pt         # Your trained model (you need to add this)
├── utils/
│   ├── __init__.py
│   └── detector.py     # Detection logic
├── uploads/            # Temporary upload storage
└── outputs/            # Processed files storage
```

## Troubleshooting

### Model Not Found Error
If you see: `Model file not found at models/best.pt`
- Make sure you've placed your `best.pt` file in the `backend/models/` directory

### CORS Errors
If the frontend can't connect:
- Check that the backend is running on port 8000
- Verify CORS settings in `.env` or `config.py`
- Make sure your frontend URL is in `ALLOWED_ORIGINS`

### Memory Issues with Video
For large videos:
- Increase system RAM
- Reduce video resolution before processing
- Process shorter video clips

## Requirements

- Python 3.8+
- CUDA (optional, for GPU acceleration)
- 4GB+ RAM recommended
- Your trained YOLO model file (best.pt)

## Notes

- The server automatically cleans up temporary files older than 1 hour
- Processed videos are saved in MP4 format
- Detection results include class name, confidence score, and bounding boxes
- Supports both CPU and GPU inference (GPU is faster if available)
