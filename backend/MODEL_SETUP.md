# 📦 YOLO Model Setup Guide

## ⚠️ IMPORTANT: You MUST add your trained model file!

The backend **will not work** without your YOLO model file.

---

## 📍 Where to Place Your Model

Your trained YOLO model file (`best.pt`) must be placed in:

```
backend/models/best.pt
```

### Full Path:
```
C:\Users\shift\Desktop\Folder\curb-check-ai\backend\models\best.pt
```

---

## 📝 Step-by-Step Instructions

### 1. Locate Your Model File

Find your trained YOLO model file. It should be named:
- `best.pt` (most common)
- `last.pt` (if you want to use the last checkpoint)
- Or any other `.pt` file from your YOLO training

### 2. Copy to Models Directory

**Option A: Using File Explorer**
1. Open File Explorer
2. Navigate to: `C:\Users\shift\Desktop\Folder\curb-check-ai\backend\models\`
3. Copy your `best.pt` file into this folder

**Option B: Using Command Line**
```powershell
# From anywhere, copy your model file
Copy-Item "C:\path\to\your\best.pt" "C:\Users\shift\Desktop\Folder\curb-check-ai\backend\models\best.pt"
```

### 3. Verify the File

After copying, the backend/models folder should look like:
```
backend/
└── models/
    ├── .gitkeep
    └── best.pt  <- Your model file (should be several MB in size)
```

---

## ✅ Verify Your Model

Run the verification script:

```bash
cd backend
python test_setup.py
```

You should see:
```
✓ Model file found: backend\models\best.pt
✓ Size: XX.XX MB
✓ Model loaded successfully!
✓ Model classes: ['pothole', 'speed_bump']
```

---

## ❓ What if I have a different model name?

If your model file has a different name (e.g., `my_model.pt`), you can:

**Option 1: Rename it to `best.pt`** (Recommended)
```powershell
Rename-Item "backend\models\my_model.pt" "best.pt"
```

**Option 2: Update the configuration**
Edit `backend\.env` and change:
```env
MODEL_PATH=models/my_model.pt
```

---

## 🔍 Model Requirements

Your YOLO model should:
- ✅ Be trained to detect **potholes** and **speed bumps**
- ✅ Be in `.pt` format (PyTorch)
- ✅ Be compatible with Ultralytics YOLO (YOLOv8 or similar)
- ✅ Have class names: `pothole` and `speed_bump`

---

## 🐛 Troubleshooting

### Error: "Model file not found"
**Cause:** The `best.pt` file is not in the correct location

**Solution:**
1. Double-check the file path: `backend\models\best.pt`
2. Make sure the file is named exactly `best.pt` (case-sensitive on some systems)
3. Verify the file actually exists and isn't corrupted

### Error: "Failed to load model"
**Cause:** The model file might be corrupted or incompatible

**Solution:**
1. Re-download or re-export your trained model
2. Ensure it's a valid YOLO model (.pt format)
3. Check that you trained it with a compatible YOLO version

### Error: "Model classes not found"
**Cause:** Your model might have different class names

**Solution:**
1. Check your model's class names using the test script
2. Update the frontend code if your classes are named differently
3. Retrain your model with the correct class names

---

## 📊 Expected Model Info

After loading, your model should show:
- **Classes:** 2 (pothole, speed_bump)
- **Input size:** Usually 640x640
- **Format:** PyTorch (.pt)
- **Size:** Typically 6-20 MB (depending on model variant)

---

## 🚀 Next Steps

Once your model is in place:

1. ✅ Model file copied to `backend/models/best.pt`
2. ✅ Run `python test_setup.py` to verify
3. ✅ Start backend: `python main.py`
4. ✅ Start frontend: `npm run dev`
5. ✅ Test detection with your images!

---

## 💡 Tips

- Keep a backup of your `best.pt` file
- The model file is NOT committed to Git (it's in .gitignore)
- You can update the model anytime by replacing the file
- Restart the backend server after replacing the model

---

Need help? Check the logs when starting the server:
```
✓ Model loaded from: models/best.pt
✓ Model classes: ['pothole', 'speed_bump']
```

If you see this, you're all set! 🎉
