# CurbCheck AI - Road Hazard Detection System

🚗 AI-powered web application for detecting potholes and speed bumps using custom YOLO model.

![Features](https://img.shields.io/badge/Features-Image%20%7C%20Video%20%7C%20Live%20Detection-blue)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Python%20%2B%20YOLO-orange)

## 🎓 About This Project

This is a multidisciplinary project developed by 4th year students at the **Higher School of Computer Science, Sidi Bel Abbes**, specializing in **Artificial Intelligence and Data Science**. The project combines computer vision, deep learning, and web development to create a practical solution for road hazard detection.

## 📝 Project Description

CurbCheck AI is an intelligent road safety system that detects potholes and speed bumps in real-time using a custom-trained YOLO (You Only Look Once) deep learning model. The application provides three detection modes: image upload, video processing, and live webcam detection. Built with a modern React frontend and FastAPI backend, it offers high accuracy detection with an intuitive user interface for road infrastructure monitoring.

## 🌟 Features

- **📸 Image Detection** - Upload images to detect road hazards with bounding boxes
- **🎬 Video Detection** - Process entire videos with annotated output
- **📹 Live Detection** - Real-time webcam detection with FPS counter
- **🎯 High Accuracy** - Custom-trained YOLO model for potholes and speed bumps
- **🎨 Beautiful UI** - Modern dark theme with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm/bun
- Python 3.8+
- Your trained YOLO model file (`best.pt`)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# IMPORTANT: Copy your best.pt file to backend/models/
# Then start the server
python main.py
```

Backend will run at `http://localhost:8000`

### 2. Frontend Setup

```bash
# Navigate to project root
cd ..

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at `http://localhost:8080`

### 3. Test It!

1. Open `http://localhost:8080` in your browser
2. Click "Image Detection" or "Get Started"
3. Upload an image with road hazards
4. Click "Run Detection"
5. See the magic! ✨

---


## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching

### Backend
- **Python 3.8+**
- **FastAPI** - Modern web framework
- **Ultralytics YOLO** - Object detection
- **OpenCV** - Image/video processing
- **Uvicorn** - ASGI server

## 📋 API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health status
- `POST /api/detect/image` - Image detection
- `POST /api/detect/video` - Video processing
- `POST /api/detect/frame` - Single frame detection (for live camera)
- `DELETE /api/cleanup` - Cleanup old files

## 🎯 Detection Classes

- **Pothole** - Detected in red bounding boxes
- **Speed Bump** - Detected in green bounding boxes

Each detection includes:
- Class name
- Confidence score (0-1)
- Bounding box coordinates [x, y, width, height]

**CurbCheck AI** - 4th Year Project | Higher School of Computer Science, Sidi Bel Abbes | AI & Data Science Specialization
