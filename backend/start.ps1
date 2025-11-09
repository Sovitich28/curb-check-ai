# Backend Quick Start Script for Windows PowerShell

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CurbCheck AI - Backend Server Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if in backend directory
if (-not (Test-Path "main.py")) {
    Write-Host "Error: This script must be run from the backend directory" -ForegroundColor Red
    Write-Host "Run: cd backend" -ForegroundColor Yellow
    exit 1
}

# Check Python installation
Write-Host "Checking Python installation..." -ForegroundColor Yellow
$python = $null
try {
    $pythonVersion = python --version 2>&1
    if ($pythonVersion -match "Python (\d+)\.(\d+)") {
        $major = [int]$matches[1]
        $minor = [int]$matches[2]
        if ($major -ge 3 -and $minor -ge 8) {
            Write-Host "✓ Python $pythonVersion found" -ForegroundColor Green
            $python = "python"
        } else {
            Write-Host "✗ Python 3.8+ required (found $pythonVersion)" -ForegroundColor Red
            exit 1
        }
    }
} catch {
    Write-Host "✗ Python not found. Please install Python 3.8+" -ForegroundColor Red
    exit 1
}

# Check if requirements are installed
Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Yellow

$pipList = & $python -m pip list 2>&1
$needInstall = $false

$requiredPackages = @("fastapi", "uvicorn", "ultralytics", "opencv-python")
foreach ($package in $requiredPackages) {
    if ($pipList -notmatch $package) {
        $needInstall = $true
        break
    }
}

if ($needInstall) {
    Write-Host "⚠ Some dependencies missing. Installing..." -ForegroundColor Yellow
    & $python -m pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Installation failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

# Check for model file
Write-Host ""
Write-Host "Checking for YOLO model..." -ForegroundColor Yellow

if (Test-Path "models\best.pt") {
    $modelSize = (Get-Item "models\best.pt").Length / 1MB
    Write-Host "✓ Model found (${modelSize:N2} MB)" -ForegroundColor Green
} else {
    Write-Host "✗ Model file not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "IMPORTANT: Place your 'best.pt' file here:" -ForegroundColor Yellow
    Write-Host "  $(Get-Location)\models\best.pt" -ForegroundColor Cyan
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}

# Run test setup
Write-Host ""
Write-Host "Running setup verification..." -ForegroundColor Yellow
Write-Host ""
& $python test_setup.py

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Starting Backend Server..." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Server will be available at: http://localhost:8000" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    & $python main.py
} else {
    Write-Host ""
    Write-Host "Setup verification failed. Please fix the issues above." -ForegroundColor Red
    exit 1
}
