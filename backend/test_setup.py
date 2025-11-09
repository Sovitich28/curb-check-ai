"""
Test script to verify the backend setup and model loading.
Run this after placing your best.pt file in the models directory.
"""

import sys
from pathlib import Path


def check_dependencies():
    """Check if all required packages are installed"""
    print("=" * 60)
    print("Checking Dependencies...")
    print("=" * 60)

    required = ["fastapi", "uvicorn", "ultralytics", "cv2", "numpy", "PIL"]

    missing = []
    for package in required:
        try:
            if package == "cv2":
                __import__("cv2")
            elif package == "PIL":
                __import__("PIL")
            else:
                __import__(package)
            print(f"✓ {package:20s} installed")
        except ImportError:
            print(f"✗ {package:20s} NOT installed")
            missing.append(package)

    if missing:
        print("\n⚠ Missing packages. Install with:")
        print("pip install -r requirements.txt")
        return False

    print("\n✓ All dependencies installed!")
    return True


def check_model_file():
    """Check if the model file exists"""
    print("\n" + "=" * 60)
    print("Checking Model File...")
    print("=" * 60)

    model_path = Path(__file__).parent / "models" / "best.pt"

    if model_path.exists():
        size_mb = model_path.stat().st_size / (1024 * 1024)
        print(f"✓ Model file found: {model_path}")
        print(f"✓ Size: {size_mb:.2f} MB")
        return True
    else:
        print(f"✗ Model file NOT found at: {model_path}")
        print("\n⚠ Please copy your 'best.pt' file to:")
        print(f"   {model_path.parent}")
        return False


def test_model_loading():
    """Try to load the YOLO model"""
    print("\n" + "=" * 60)
    print("Testing Model Loading...")
    print("=" * 60)

    try:
        from utils.detector import RoadHazardDetector

        detector = RoadHazardDetector()
        print("✓ Model loaded successfully!")
        print(f"✓ Model classes: {list(detector.model.names.values())}")
        print(f"✓ Confidence threshold: {detector.conf_threshold}")
        print(f"✓ IOU threshold: {detector.iou_threshold}")
        return True
    except FileNotFoundError as e:
        print(f"✗ Model loading failed: {e}")
        return False
    except Exception as e:
        print(f"✗ Unexpected error: {e}")
        return False


def check_directories():
    """Check if required directories exist"""
    print("\n" + "=" * 60)
    print("Checking Directories...")
    print("=" * 60)

    base_dir = Path(__file__).parent
    required_dirs = ["models", "uploads", "outputs", "utils"]

    all_exist = True
    for dir_name in required_dirs:
        dir_path = base_dir / dir_name
        if dir_path.exists():
            print(f"✓ {dir_name:15s} exists")
        else:
            print(f"✗ {dir_name:15s} NOT found")
            all_exist = False

    return all_exist


def main():
    """Run all checks"""
    print("\n")
    print("╔" + "=" * 58 + "╗")
    print("║" + " " * 10 + "Backend Setup Verification" + " " * 21 + "║")
    print("╚" + "=" * 58 + "╝")
    print()

    results = {
        "Dependencies": check_dependencies(),
        "Directories": check_directories(),
        "Model File": check_model_file(),
    }

    if all(results.values()):
        results["Model Loading"] = test_model_loading()

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)

    for check, passed in results.items():
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status:8s} {check}")

    print("=" * 60)

    if all(results.values()):
        print("\n🎉 All checks passed! You're ready to start the server.")
        print("\nRun: python main.py")
    else:
        print("\n⚠ Some checks failed. Please fix the issues above.")
        sys.exit(1)


if __name__ == "__main__":
    main()
