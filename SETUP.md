# CurbCheck AI - Complete Setup Guide

This guide will help you set up both the frontend and backend for the Road Hazard Detection application.

## Prerequisites

- **Node.js** 14+ and npm/bun (for frontend)
- **Python** 3.8+ (for backend)
- Your trained YOLO model file (`best.pt`)

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Add Your YOLO Model ⚠️ IMPORTANT

**Copy your `best.pt` file into the `backend/models/` directory:**

```
backend/
└── models/
    └── best.pt  <- Place your trained YOLO model here
```

### Step 4: Start the Backend Server

```bash
python main.py
```

The backend will start at `http://localhost:8000`

You should see:
```
✓ Server started successfully!
✓ Model loaded from: models/best.pt
✓ Listening on http://0.0.0.0:8000
```

---

## Frontend Setup

### Step 1: Navigate to Project Root

```bash
cd ..  # Go back to project root
```

### Step 2: Install Dependencies

If using npm:
```bash
npm install
```

If using bun:
```bash
bun install
```

### Step 3: Start the Frontend

If using npm:
```bash
npm run dev
```

If using bun:
```bash
bun run dev
```

The frontend will start at `http://localhost:8080`

---

## Verify Everything Works

1. **Check Backend Health:**
   - Open browser to `http://localhost:8000`
   - You should see: `{"status": "running", "model_status": "loaded", ...}`

2. **Check Frontend:**
   - Open browser to `http://localhost:8080`
   - You should see the RoadVision AI homepage

3. **Test Detection:**
   - Click "Image Detection" or "Get Started"
   - Upload an image with road hazards
   - Click "Run Detection"
   - You should see bounding boxes and detection results!

---

## Quick Start Commands

### Terminal 1 - Backend
```bash
cd backend
pip install -r requirements.txt
# Copy your best.pt to backend/models/
python main.py
```

### Terminal 2 - Frontend
```bash
npm install
npm run dev
```

---

## Common Issues

### Issue: "Model file not found"
**Solution:** Make sure `best.pt` is in `backend/models/best.pt`

### Issue: "Connection refused" or CORS errors
**Solution:** 
- Ensure backend is running on port 8000
- Check that frontend is trying to connect to `http://localhost:8000`
- Verify CORS settings in `backend/config.py`

### Issue: Frontend won't start
**Solution:**
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Issue: Slow detection
**Solution:**
- Use GPU if available (install `torch` with CUDA support)
- Reduce image/video resolution
- Lower confidence threshold in `backend/.env`

---

## Project Structure

```
curb-check-ai/
├── backend/              # Python FastAPI backend
│   ├── main.py          # API server
│   ├── config.py        # Configuration
│   ├── requirements.txt # Python dependencies
│   ├── models/
│   │   └── best.pt     # Your YOLO model (add this!)
│   └── utils/
│       └── detector.py  # Detection logic
│
├── src/                 # React frontend
│   ├── pages/          # Page components
│   ├── components/     # Reusable components
│   └── App.tsx         # Main app
│
├── package.json        # Frontend dependencies
└── vite.config.ts      # Vite configuration
```

---

## Features

✅ **Image Detection** - Upload and detect in static images
✅ **Video Detection** - Process entire videos with annotations
✅ **Live Detection** - Real-time webcam detection
✅ **High Accuracy** - Custom YOLO model for road hazards
✅ **Beautiful UI** - Modern dark theme with Tailwind CSS

---

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- React Router

**Backend:**
- Python 3.8+
- FastAPI
- Ultralytics YOLO
- OpenCV

---

## Next Steps

1. Test with your own images/videos
2. Adjust detection thresholds in `backend/.env`
3. Deploy to production (see deployment guides)
4. Customize UI colors/branding in `src/index.css`

---

## Support

If you encounter issues:
1. Check that both frontend and backend are running
2. Verify `best.pt` is in the correct location
3. Check browser console for errors
4. Check backend terminal for error messages

Happy detecting! 🚗🕳️
