# 🗂️ Complete Project Structure

```
curb-check-ai/
│
├── 📁 backend/                          # Python FastAPI Backend
│   ├── 📄 main.py                       # FastAPI server & API endpoints
│   ├── 📄 config.py                     # Configuration settings
│   ├── 📄 requirements.txt              # Python dependencies
│   ├── 📄 .env.example                  # Environment variables template
│   ├── 📄 .gitignore                    # Git ignore rules
│   ├── 📄 README.md                     # Backend documentation
│   ├── 📄 MODEL_SETUP.md                # Model setup guide
│   ├── 📄 test_setup.py                 # Setup verification script
│   ├── 📄 start.ps1                     # PowerShell start script
│   ├── 📄 start.bat                     # Batch start script
│   │
│   ├── 📁 models/                       # ⚠️ PLACE YOUR MODEL HERE
│   │   ├── 📄 .gitkeep                  # Keeps folder in Git
│   │   └── 📄 best.pt                   # ⭐ YOUR YOLO MODEL (YOU ADD THIS!)
│   │
│   ├── 📁 utils/                        # Utility modules
│   │   ├── 📄 __init__.py               # Package initializer
│   │   └── 📄 detector.py               # Detection logic & YOLO wrapper
│   │
│   ├── 📁 uploads/                      # Temporary upload storage
│   │   └── 📄 .gitkeep                  # (files here are auto-deleted)
│   │
│   └── 📁 outputs/                      # Processed files storage
│       └── 📄 .gitkeep                  # (files here are auto-deleted)
│
├── 📁 src/                              # React Frontend Source
│   ├── 📄 App.tsx                       # Main app component & routing
│   ├── 📄 main.tsx                      # App entry point
│   ├── 📄 index.css                     # Global styles & theme
│   ├── 📄 App.css                       # App-specific styles
│   ├── 📄 vite-env.d.ts                 # Vite type definitions
│   │
│   ├── 📁 pages/                        # Page components
│   │   ├── 📄 Home.tsx                  # Landing page
│   │   ├── 📄 ImageDetection.tsx        # Image upload & detection
│   │   ├── 📄 VideoDetection.tsx        # Video processing
│   │   ├── 📄 LiveDetection.tsx         # Webcam live detection
│   │   ├── 📄 About.tsx                 # About page
│   │   ├── 📄 Index.tsx                 # Index export
│   │   └── 📄 NotFound.tsx              # 404 page
│   │
│   ├── 📁 components/                   # Reusable components
│   │   ├── 📄 Navigation.tsx            # Top navigation bar
│   │   ├── 📄 NavLink.tsx               # Navigation link component
│   │   ├── 📄 FileUpload.tsx            # Drag & drop file upload
│   │   ├── 📄 DetectionCanvas.tsx       # Canvas for drawing detections
│   │   │
│   │   └── 📁 ui/                       # shadcn/ui components
│   │       ├── 📄 button.tsx
│   │       ├── 📄 card.tsx
│   │       ├── 📄 badge.tsx
│   │       ├── 📄 progress.tsx
│   │       ├── 📄 toast.tsx
│   │       ├── 📄 toaster.tsx
│   │       └── ... (30+ UI components)
│   │
│   ├── 📁 hooks/                        # Custom React hooks
│   │   ├── 📄 use-mobile.tsx
│   │   └── 📄 use-toast.ts
│   │
│   └── 📁 lib/                          # Utility functions
│       └── 📄 utils.ts                  # Helper functions
│
├── 📁 public/                           # Static assets
│   └── 📄 robots.txt
│
├── 📄 package.json                      # Frontend dependencies
├── 📄 bun.lockb                         # Bun lock file
├── 📄 vite.config.ts                    # Vite configuration
├── 📄 tsconfig.json                     # TypeScript config
├── 📄 tsconfig.app.json                 # App TypeScript config
├── 📄 tsconfig.node.json                # Node TypeScript config
├── 📄 tailwind.config.ts                # Tailwind CSS config
├── 📄 postcss.config.js                 # PostCSS config
├── 📄 components.json                   # shadcn/ui config
├── 📄 eslint.config.js                  # ESLint config
├── 📄 index.html                        # HTML entry point
├── 📄 README.md                         # Main documentation
└── 📄 SETUP.md                          # Setup guide
```

---

## 🎯 Key Files to Know

### Backend (Python)
- **`backend/main.py`** - Start here for API endpoints
- **`backend/utils/detector.py`** - YOLO detection logic
- **`backend/models/best.pt`** - ⚠️ YOUR MODEL FILE (YOU MUST ADD THIS!)
- **`backend/config.py`** - Adjust settings here

### Frontend (React)
- **`src/App.tsx`** - Main app & routing
- **`src/pages/ImageDetection.tsx`** - Image detection page
- **`src/pages/VideoDetection.tsx`** - Video processing page
- **`src/pages/LiveDetection.tsx`** - Live camera detection
- **`src/components/DetectionCanvas.tsx`** - Draws bounding boxes

### Configuration
- **`backend/.env`** - Backend environment variables
- **`vite.config.ts`** - Frontend dev server settings
- **`tailwind.config.ts`** - UI styling configuration

---

## 🚀 Quick Actions

### Start Backend
```bash
cd backend
python main.py
```

### Start Frontend
```bash
npm run dev
```

### Verify Setup
```bash
cd backend
python test_setup.py
```

### Install Dependencies
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
npm install
```

---

## 📦 What Gets Committed to Git?

✅ **Committed:**
- All source code
- Configuration files
- Documentation
- Empty directories (.gitkeep files)

❌ **Not Committed:**
- `backend/models/best.pt` (your model file - too large)
- `backend/uploads/*` (temporary uploads)
- `backend/outputs/*` (processed files)
- `node_modules/` (frontend dependencies)
- `__pycache__/` (Python cache)
- `.env` (environment variables)

---

## 📝 File Count Summary

- **Backend:** 12 Python files + your model
- **Frontend:** 60+ React/TypeScript files
- **UI Components:** 40+ shadcn/ui components
- **Total Lines:** ~5,000+ lines of code

---

## 🎨 Tech Stack Overview

### Backend Stack
```
FastAPI (Web Framework)
    ├── Uvicorn (ASGI Server)
    ├── Ultralytics (YOLO)
    ├── OpenCV (Image Processing)
    └── Python-multipart (File Upload)
```

### Frontend Stack
```
React 18 (UI Framework)
    ├── Vite (Build Tool)
    ├── TypeScript (Type Safety)
    ├── Tailwind CSS (Styling)
    ├── shadcn/ui (Components)
    ├── React Router (Routing)
    └── TanStack Query (Data Fetching)
```

---

## 🔄 Data Flow

```
1. Frontend (React)
   └── User uploads image/video
       ↓
2. Backend API (FastAPI)
   └── Receives file at /api/detect/*
       ↓
3. YOLO Model (Ultralytics)
   └── Processes with best.pt
       ↓
4. OpenCV
   └── Draws bounding boxes
       ↓
5. Backend Response
   └── Returns detections/annotated media
       ↓
6. Frontend Display
   └── Shows results to user
```

---

Made with ❤️ for road safety
