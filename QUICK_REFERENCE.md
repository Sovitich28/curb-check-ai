# 🚀 Quick Reference Card

## ⚡ Getting Started (3 Steps)

### 1️⃣ Setup Backend
```bash
cd backend
pip install -r requirements.txt
# Copy your best.pt to backend/models/
python main.py
```
✅ Backend running at http://localhost:8000

### 2️⃣ Setup Frontend
```bash
npm install
npm run dev
```
✅ Frontend running at http://localhost:8080

### 3️⃣ Test Detection
- Open http://localhost:8080
- Upload an image
- Click "Run Detection"
- See results! 🎉

---

## 📋 Common Commands

### Backend Commands
```bash
# Install dependencies
pip install -r requirements.txt

# Start server
python main.py

# Test setup
python test_setup.py

# Windows quick start
.\start.bat
# or
.\start.ps1
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📁 Important Paths

| What | Path |
|------|------|
| **Your Model** | `backend/models/best.pt` |
| **Backend Server** | `backend/main.py` |
| **Frontend App** | `src/App.tsx` |
| **Image Detection** | `src/pages/ImageDetection.tsx` |
| **API Config** | `backend/config.py` |
| **Theme/Styles** | `src/index.css` |

---

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Health check |
| GET | `/health` | Detailed status |
| POST | `/api/detect/image` | Image detection |
| POST | `/api/detect/video` | Video processing |
| POST | `/api/detect/frame` | Live frame detection |

---

## 🐛 Troubleshooting Quick Fixes

### "Model not found"
```bash
# Check if file exists
ls backend/models/best.pt

# If not, copy your model there
cp /path/to/your/best.pt backend/models/
```

### "Connection refused"
```bash
# Make sure backend is running
cd backend
python main.py
```

### "CORS error"
- Verify backend is on port 8000
- Check `backend/config.py` ALLOWED_ORIGINS

### "Module not found"
```bash
# Reinstall backend dependencies
cd backend
pip install -r requirements.txt

# Reinstall frontend dependencies
npm install
```

---

## 🎯 Ports & URLs

| Service | URL | Port |
|---------|-----|------|
| **Backend API** | http://localhost:8000 | 8000 |
| **Frontend Dev** | http://localhost:8080 | 8080 |
| **API Docs** | http://localhost:8000/docs | 8000 |

---

## 📊 Detection Output Format

```json
{
  "success": true,
  "detections": [
    {
      "class": "pothole",
      "confidence": 0.92,
      "bbox": [150, 200, 180, 120]
    }
  ],
  "total_detections": 1
}
```

---

## ⚙️ Configuration Quick Reference

### Backend (.env)
```env
HOST=0.0.0.0
PORT=8000
MODEL_PATH=models/best.pt
CONFIDENCE_THRESHOLD=0.25
IOU_THRESHOLD=0.45
```

### Frontend (vite.config.ts)
```typescript
server: {
  host: "::",
  port: 8080,
}
```

---

## 🎨 UI Components Location

All UI components: `src/components/ui/`

Commonly used:
- `button.tsx` - Buttons
- `card.tsx` - Cards
- `badge.tsx` - Badges
- `progress.tsx` - Progress bars
- `toast.tsx` - Notifications

---

## 📝 File Formats Supported

### Images
- JPG, JPEG
- PNG
- BMP
- WEBP

### Videos
- MP4
- AVI
- MOV
- MKV
- WMV

---

## 🔄 Development Workflow

1. Make changes to code
2. Frontend auto-reloads (Vite HMR)
3. Backend auto-reloads (Uvicorn reload)
4. Test in browser
5. Commit changes

---

## 🌈 Color Scheme

### Detection Colors
- **Pothole:** Red (#ef4444)
- **Speed Bump:** Green (#22c55e)

### Theme Colors
- **Primary:** Cyan (#06b6d4)
- **Background:** Dark (#1a1f2e)
- **Card:** Dark Gray (#242933)

---

## 💾 Backup Important Files

Always keep backups of:
- ✅ `backend/models/best.pt` (Your model)
- ✅ `backend/.env` (Your settings)
- ✅ Any custom code changes

---

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP.md` - Complete setup guide
- `backend/README.md` - Backend docs
- `backend/MODEL_SETUP.md` - Model setup guide
- `PROJECT_STRUCTURE.md` - File structure
- `QUICK_REFERENCE.md` - This file!

---

## 🆘 Getting Help

1. Check error messages in terminal
2. Check browser console (F12)
3. Verify backend is running: http://localhost:8000
4. Run setup test: `python backend/test_setup.py`
5. Check documentation files

---

## ✨ Pro Tips

- Use `npm run dev` for development (auto-reload)
- Use `npm run build` before deployment
- Keep backend running while developing frontend
- Check `/health` endpoint to verify backend status
- Use browser DevTools Network tab to debug API calls

---

## 🎯 Next Steps After Setup

1. ✅ Upload test images
2. ✅ Try video detection
3. ✅ Test live camera
4. ✅ Adjust confidence thresholds
5. ✅ Customize UI colors
6. ✅ Deploy to production

---

**Need more details?** Check the full documentation in:
- [SETUP.md](SETUP.md)
- [backend/README.md](backend/README.md)
- [backend/MODEL_SETUP.md](backend/MODEL_SETUP.md)

Happy detecting! 🚗💨
