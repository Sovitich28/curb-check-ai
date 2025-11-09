# ✅ Setup Checklist

Use this checklist to track your setup progress!

---

## 📦 Phase 1: Prerequisites

- [ ] Python 3.8+ installed (`python --version`)
- [ ] Node.js 14+ installed (`node --version`)
- [ ] npm or bun installed (`npm --version`)
- [ ] Git installed (optional)
- [ ] Text editor/IDE installed (VS Code recommended)
- [ ] You have your trained `best.pt` YOLO model file

---

## 🔧 Phase 2: Backend Setup

- [ ] Navigate to backend directory (`cd backend`)
- [ ] Install Python dependencies (`pip install -r requirements.txt`)
- [ ] **CRITICAL:** Copy `best.pt` to `backend/models/best.pt`
- [ ] Verify model file exists
- [ ] (Optional) Create `.env` file from `.env.example`
- [ ] Run setup verification (`python test_setup.py`)
- [ ] All tests pass ✅

---

## 🎨 Phase 3: Frontend Setup

- [ ] Navigate to project root (`cd ..`)
- [ ] Install frontend dependencies (`npm install`)
- [ ] Dependencies installed successfully
- [ ] No errors in installation

---

## 🚀 Phase 4: Starting Services

### Backend
- [ ] Open Terminal 1
- [ ] Navigate to backend (`cd backend`)
- [ ] Start backend server (`python main.py`)
- [ ] Backend running on port 8000
- [ ] See "Model loaded successfully!" message
- [ ] Visit http://localhost:8000 in browser
- [ ] See status: "running" and model_status: "loaded"

### Frontend
- [ ] Open Terminal 2
- [ ] Navigate to project root
- [ ] Start frontend (`npm run dev`)
- [ ] Frontend running on port 8080
- [ ] Visit http://localhost:8080 in browser
- [ ] See homepage load successfully

---

## 🧪 Phase 5: Testing Features

### Image Detection
- [ ] Click "Image Detection" or "Get Started"
- [ ] Upload a test image with road hazards
- [ ] Click "Run Detection"
- [ ] See detection results with bounding boxes
- [ ] Confidence scores display correctly
- [ ] Can see detected classes (pothole/speed_bump)

### Video Detection
- [ ] Navigate to "Video Detection"
- [ ] Upload a test video
- [ ] Click "Process Video"
- [ ] See progress bar updating
- [ ] Processed video downloads/displays
- [ ] Detections visible on video frames

### Live Detection
- [ ] Navigate to "Live Camera"
- [ ] Click "Start Camera"
- [ ] Browser asks for camera permission
- [ ] Grant camera access
- [ ] See live video feed
- [ ] Detections appear in real-time
- [ ] FPS counter displays
- [ ] Can stop camera successfully

---

## 🔍 Phase 6: Verification

### Backend Health
- [ ] Visit http://localhost:8000
- [ ] Returns JSON with status: "running"
- [ ] Visit http://localhost:8000/health
- [ ] Shows model_loaded: true
- [ ] Visit http://localhost:8000/docs (API documentation)
- [ ] Swagger UI loads successfully

### Frontend Navigation
- [ ] Home page loads
- [ ] Navigation menu works
- [ ] All pages accessible (Image, Video, Live, About)
- [ ] No console errors (F12 → Console tab)
- [ ] Smooth animations and transitions
- [ ] Dark theme applies correctly

---

## 🐛 Phase 7: Troubleshooting (if needed)

### If Backend Issues
- [ ] Checked Python version is 3.8+
- [ ] All dependencies installed correctly
- [ ] Model file exists at correct path
- [ ] Port 8000 is not in use by another app
- [ ] Reviewed backend terminal for errors

### If Frontend Issues
- [ ] Node.js version is 14+
- [ ] Dependencies installed without errors
- [ ] Port 8080 is not in use
- [ ] No errors in browser console
- [ ] Backend is running and accessible

### If Detection Issues
- [ ] Backend is running
- [ ] Model is loaded (check /health endpoint)
- [ ] No CORS errors in browser console
- [ ] Image/video format is supported
- [ ] File size is reasonable (<100MB)

---

## 📚 Phase 8: Documentation Review

- [ ] Read `README.md`
- [ ] Read `SETUP.md`
- [ ] Read `backend/README.md`
- [ ] Read `backend/MODEL_SETUP.md`
- [ ] Bookmarked `QUICK_REFERENCE.md` for future use
- [ ] Understand project structure (`PROJECT_STRUCTURE.md`)

---

## 🎯 Phase 9: Configuration (Optional)

### Backend Configuration
- [ ] Adjust confidence threshold if needed
- [ ] Adjust IOU threshold if needed
- [ ] Configure CORS origins if needed
- [ ] Set custom port if needed

### Frontend Configuration
- [ ] Update API URL if backend on different port
- [ ] Customize colors/theme (src/index.css)
- [ ] Adjust Vite settings if needed

---

## 🚀 Phase 10: Production Ready

- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend runs without reload mode (production)
- [ ] All features work in production build
- [ ] Performance is acceptable
- [ ] Error handling works correctly
- [ ] Ready to deploy!

---

## 📊 Progress Summary

Mark your overall progress:

- [ ] ✅ Prerequisites Complete
- [ ] ✅ Backend Setup Complete
- [ ] ✅ Frontend Setup Complete
- [ ] ✅ Services Running
- [ ] ✅ Features Tested
- [ ] ✅ Verification Passed
- [ ] ✅ Troubleshooting Done (if needed)
- [ ] ✅ Documentation Read
- [ ] ✅ Configuration Done
- [ ] ✅ Production Ready

---

## 🎉 All Done!

When all boxes are checked, you're ready to use CurbCheck AI!

**Next Steps:**
1. Test with real-world images
2. Fine-tune detection thresholds
3. Share with your team
4. Deploy to production
5. Start detecting road hazards! 🚗

---

## 💡 Tips

- Keep terminals open while working
- Check terminal output for errors
- Use browser DevTools (F12) for debugging
- Refer to `QUICK_REFERENCE.md` for commands
- Keep `best.pt` backed up
- Update documentation if you make changes

---

## 🆘 Stuck?

If you're stuck on any step:

1. Check the terminal output for error messages
2. Review the relevant documentation file
3. Run `python backend/test_setup.py` to diagnose issues
4. Check browser console for frontend errors
5. Verify both services are running
6. Try restarting both backend and frontend

---

**Date Started:** _______________

**Date Completed:** _______________

**Notes:**
_____________________________________
_____________________________________
_____________________________________

---

Good luck! 🍀
