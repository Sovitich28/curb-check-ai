from pathlib import Path
from typing import Dict, List, Tuple

import config
import cv2
import numpy as np
from ultralytics import YOLO


class RoadHazardDetector:
    """
    Road Hazard Detection using YOLO model.
    Detects potholes and speed bumps in images and videos.
    """

    def __init__(self, model_path: str = None):
        """
        Initialize the detector with a YOLO model.

        Args:
            model_path: Path to the YOLO model file (.pt)
        """
        model_path = model_path or str(config.MODEL_PATH)

        if not Path(model_path).exists():
            raise FileNotFoundError(
                f"Model file not found at {model_path}. "
                f"Please place your best.pt file in the models directory."
            )

        print(f"Loading YOLO model from {model_path}...")
        self.model = YOLO(model_path)
        self.conf_threshold = config.CONFIDENCE_THRESHOLD
        self.iou_threshold = config.IOU_THRESHOLD
        print("Model loaded successfully!")

    def detect_image(self, image_path: str) -> Tuple[np.ndarray, List[Dict]]:
        """
        Detect road hazards in an image.

        Args:
            image_path: Path to the image file

        Returns:
            Tuple of (annotated_image, detections_list)
        """
        # Read image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Failed to read image from {image_path}")

        # Run inference
        results = self.model.predict(
            image, conf=self.conf_threshold, iou=self.iou_threshold, verbose=False
        )

        # Process results
        detections = []
        annotated_image = image.copy()

        if len(results) > 0 and results[0].boxes is not None:
            boxes = results[0].boxes

            for box in boxes:
                # Get box coordinates
                x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                confidence = float(box.conf[0].cpu().numpy())
                class_id = int(box.cls[0].cpu().numpy())
                class_name = self.model.names[class_id]

                # Calculate width and height
                width = x2 - x1
                height = y2 - y1

                # Store detection
                detections.append(
                    {
                        "class": class_name,
                        "confidence": confidence,
                        "bbox": [float(x1), float(y1), float(width), float(height)],
                    }
                )

                # Draw on image
                color = (0, 0, 255) if class_name == "pothole" else (0, 255, 0)
                cv2.rectangle(
                    annotated_image, (int(x1), int(y1)), (int(x2), int(y2)), color, 2
                )

                # Add label
                label = f"{class_name} {confidence:.2f}"
                (label_width, label_height), _ = cv2.getTextSize(
                    label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2
                )
                cv2.rectangle(
                    annotated_image,
                    (int(x1), int(y1) - label_height - 10),
                    (int(x1) + label_width, int(y1)),
                    color,
                    -1,
                )
                cv2.putText(
                    annotated_image,
                    label,
                    (int(x1), int(y1) - 5),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    (255, 255, 255),
                    2,
                )

        return annotated_image, detections

    def detect_video(
        self, video_path: str, output_path: str, progress_callback=None
    ) -> List[Dict]:
        """
        Detect road hazards in a video and save annotated output.

        Args:
            video_path: Path to the input video file
            output_path: Path to save the annotated video
            progress_callback: Optional callback function for progress updates

        Returns:
            List of all detections across frames
        """
        # Open video
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            raise ValueError(f"Failed to open video from {video_path}")

        # Get video properties
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        # Create video writer
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

        all_detections = []
        frame_count = 0

        print(f"Processing video: {total_frames} frames at {fps} FPS...")

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # Run inference on frame
            results = self.model.predict(
                frame, conf=self.conf_threshold, iou=self.iou_threshold, verbose=False
            )

            # Process results
            frame_detections = []
            if len(results) > 0 and results[0].boxes is not None:
                boxes = results[0].boxes

                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                    confidence = float(box.conf[0].cpu().numpy())
                    class_id = int(box.cls[0].cpu().numpy())
                    class_name = self.model.names[class_id]

                    width_box = x2 - x1
                    height_box = y2 - y1

                    frame_detections.append(
                        {
                            "frame": frame_count,
                            "class": class_name,
                            "confidence": confidence,
                            "bbox": [
                                float(x1),
                                float(y1),
                                float(width_box),
                                float(height_box),
                            ],
                        }
                    )

                    # Draw on frame
                    color = (0, 0, 255) if class_name == "pothole" else (0, 255, 0)
                    cv2.rectangle(
                        frame, (int(x1), int(y1)), (int(x2), int(y2)), color, 2
                    )

                    label = f"{class_name} {confidence:.2f}"
                    (label_width, label_height), _ = cv2.getTextSize(
                        label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2
                    )
                    cv2.rectangle(
                        frame,
                        (int(x1), int(y1) - label_height - 10),
                        (int(x1) + label_width, int(y1)),
                        color,
                        -1,
                    )
                    cv2.putText(
                        frame,
                        label,
                        (int(x1), int(y1) - 5),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.5,
                        (255, 255, 255),
                        2,
                    )

            all_detections.extend(frame_detections)
            out.write(frame)
            frame_count += 1

            # Progress callback
            if progress_callback and frame_count % 10 == 0:
                progress = (frame_count / total_frames) * 100
                progress_callback(progress)

        cap.release()
        out.release()

        print(
            f"Video processing complete! Found {len(all_detections)} total detections."
        )
        return all_detections

    def detect_frame(self, frame: np.ndarray) -> Tuple[np.ndarray, List[Dict]]:
        """
        Detect road hazards in a single frame (for live detection).

        Args:
            frame: Input frame as numpy array

        Returns:
            Tuple of (annotated_frame, detections_list)
        """
        # Run inference
        results = self.model.predict(
            frame, conf=self.conf_threshold, iou=self.iou_threshold, verbose=False
        )

        # Debug: Log raw model output
        print(f"🤖 YOLO Results: {len(results)} result(s)")
        if len(results) > 0:
            print(f"   Boxes detected: {results[0].boxes is not None}")
            if results[0].boxes is not None:
                num_boxes = len(results[0].boxes)
                print(f"   Number of boxes: {num_boxes}")
                if num_boxes > 0:
                    for i, box in enumerate(results[0].boxes):
                        conf = float(box.conf[0].cpu().numpy())
                        cls_id = int(box.cls[0].cpu().numpy())
                        cls_name = self.model.names.get(cls_id, f"class_{cls_id}")
                        print(f"   Box {i+1}: class={cls_name} (id={cls_id}), conf={conf:.3f}")
                else:
                    print(f"   ⚠️ Boxes object exists but is empty")
            else:
                print(f"   ⚠️ No boxes in results")

        # Process results
        detections = []
        annotated_frame = frame.copy()

        if len(results) > 0 and results[0].boxes is not None:
            boxes = results[0].boxes

            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                confidence = float(box.conf[0].cpu().numpy())
                class_id = int(box.cls[0].cpu().numpy())
                class_name = self.model.names[class_id]

                width = x2 - x1
                height = y2 - y1

                detections.append(
                    {
                        "class": class_name,
                        "confidence": confidence,
                        "bbox": [float(x1), float(y1), float(width), float(height)],
                    }
                )

                # Draw on frame
                color = (0, 0, 255) if class_name == "pothole" else (0, 255, 0)
                cv2.rectangle(
                    annotated_frame, (int(x1), int(y1)), (int(x2), int(y2)), color, 2
                )

                label = f"{class_name} {confidence:.2f}"
                (label_width, label_height), _ = cv2.getTextSize(
                    label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2
                )
                cv2.rectangle(
                    annotated_frame,
                    (int(x1), int(y1) - label_height - 10),
                    (int(x1) + label_width, int(y1)),
                    color,
                    -1,
                )
                cv2.putText(
                    annotated_frame,
                    label,
                    (int(x1), int(y1) - 5),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    (255, 255, 255),
                    2,
                )

        return annotated_frame, detections
