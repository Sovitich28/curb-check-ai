@echo off
echo.
echo ========================================
echo   CurbCheck AI - Backend Server
echo ========================================
echo.

REM Check if in backend directory
if not exist "main.py" (
    echo Error: This script must be run from the backend directory
    echo Run: cd backend
    pause
    exit /b 1
)

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

echo Python found!
echo.

REM Check for model file
if exist "models\best.pt" (
    echo Model file found: models\best.pt
) else (
    echo.
    echo ========================================
    echo   WARNING: Model file not found!
    echo ========================================
    echo.
    echo Please copy your best.pt file to:
    echo %cd%\models\best.pt
    echo.
    pause
)

REM Install dependencies
echo.
echo Installing dependencies...
python -m pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Starting Backend Server...
echo ========================================
echo.
echo Server URL: http://localhost:8000
echo Press Ctrl+C to stop
echo.

python main.py

pause
