import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, CameraOff } from "lucide-react";
import { toast } from "sonner";

const LiveDetection = () => {
  const [isActive, setIsActive] = useState(false);
  const [fps, setFps] = useState(0);
  const [detections, setDetections] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number>();
  const currentDetectionsRef = useRef<any[]>([]); // Store detections in ref for immediate access
  const isDetectingRef = useRef(false); // Prevent multiple detection requests
  const abortControllerRef = useRef<AbortController | null>(null); // For canceling fetch requests

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      
      if (!videoRef.current) {
        console.error("Video ref is null");
        return;
      }
      
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      
      // Wait for video to load and play
      await videoRef.current.play();
      
      // Wait a bit for the first frame to be available
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Now set active and start detection
      setIsActive(true);
      
      // Start detection in next tick to ensure state update
      setTimeout(() => {
        startDetection();
        toast.success("Camera started successfully!");
      }, 100);
      
    } catch (error) {
      toast.error("Failed to access camera. Please check permissions.");
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    console.log("🛑 Stopping camera and detection loop..."); // Debug
    
    // Abort any ongoing fetch requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    isDetectingRef.current = false; // Stop detection flag
    setIsActive(false);
    setDetections([]);
    currentDetectionsRef.current = []; // Clear ref too
    toast.info("Camera stopped");
  };

  const startDetection = () => {
    console.log("🟢 Starting detection loop..."); // Debug
    
    // Create new AbortController for this detection session
    abortControllerRef.current = new AbortController();
    
    let lastTime = performance.now();
    let frameCount = 0;
    let detectionFrameCount = 0;
    const DETECTION_INTERVAL = 5; // Only detect every 5 frames for better performance
    isDetectingRef.current = true; // Set detection flag

    const detect = async () => {
      // Check if we should stop
      if (!isDetectingRef.current) {
        console.log("🔴 Detection loop exited - isDetectingRef is false");
        return;
      }

      if (!videoRef.current || !canvasRef.current) {
        if (isDetectingRef.current) {
          animationRef.current = requestAnimationFrame(detect);
        }
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        if (isDetectingRef.current) {
          animationRef.current = requestAnimationFrame(detect);
        }
        return;
      }

      // Check if video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        if (isDetectingRef.current) {
          animationRef.current = requestAnimationFrame(detect);
        }
        return;
      }

      // Set canvas size to match video (only if dimensions changed)
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Draw video frame
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        console.error("Error drawing video frame:", error);
        if (isDetectingRef.current) {
          animationRef.current = requestAnimationFrame(detect);
        }
        return;
      }

      // Draw stored detections on current frame FIRST
      if (currentDetectionsRef.current.length > 0) {
        console.log("Drawing detections:", currentDetectionsRef.current.length); // Debug
        currentDetectionsRef.current.forEach((det: any) => {
          const [x, y, w, h] = det.bbox;
          console.log(`Drawing box at (${x}, ${y}) size ${w}x${h}`); // Debug
          // Handle both "pothole" and "speed_bump"/"speedbump" class names
          const isPothole = det.class.toLowerCase().includes("pothole");
          ctx.strokeStyle = isPothole ? "#ef4444" : "#22c55e";
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, w, h);

          const label = `${det.class} (${(det.confidence * 100).toFixed(1)}%)`;
          ctx.font = "16px sans-serif";
          const textWidth = ctx.measureText(label).width;
          
          ctx.fillStyle = isPothole ? "#ef4444" : "#22c55e";
          ctx.fillRect(x, y - 28, textWidth + 10, 28);
          ctx.fillStyle = "#ffffff";
          ctx.fillText(label, x + 5, y - 8);
        });
      }

      // Only send frames to backend every N frames for better performance
      detectionFrameCount++;
      if (detectionFrameCount >= DETECTION_INTERVAL && isDetectingRef.current) {
        detectionFrameCount = 0;
        
        // Send frame to backend for detection
        canvas.toBlob(async (blob) => {
          if (!blob || !isDetectingRef.current || !abortControllerRef.current) return;
          
          const formData = new FormData();
          formData.append("frame", blob, "frame.jpg");
          
          try {
            const response = await fetch("http://localhost:8000/api/detect/frame", {
              method: "POST",
              body: formData,
              signal: abortControllerRef.current.signal, // Add abort signal
            });
            
            if (response.ok) {
              const data = await response.json();
              console.log("Detection response:", data); // Debug logging
              if (data.detections && data.detections.length > 0) {
                console.log("Found detections:", data.detections.length); // Debug logging
                currentDetectionsRef.current = data.detections; // Store in ref
                setDetections(data.detections); // Also update state for UI
              } else {
                currentDetectionsRef.current = [];
                setDetections([]);
              }
            }
          } catch (error) {
            // Check if error is due to abort
            if (error instanceof Error && error.name === 'AbortError') {
              console.log("🚫 Fetch request aborted");
              return;
            }
            console.error("Detection API error:", error);
            // Backend not running - no detections
            currentDetectionsRef.current = [];
            setDetections([]);
          }
        }, "image/jpeg", 0.8);
      }

      // Calculate FPS
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      // Continue detection loop only if still active
      if (isDetectingRef.current) {
        animationRef.current = requestAnimationFrame(detect);
      }
    };

    detect();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Live Detection</h1>
            <p className="text-muted-foreground">
              Real-time detection using your webcam
            </p>
          </div>

          <Card className="p-6 space-y-6 border-border bg-card">
            {/* Video element - always rendered but hidden */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="hidden"
            />
            
            <div className="relative">
              {!isActive ? (
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Camera is not active</p>
                    <Button
                      onClick={startCamera}
                      className="bg-gradient-primary hover:shadow-glow"
                    >
                      Start Camera
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <canvas
                    ref={canvasRef}
                    className="w-full rounded-lg shadow-lg bg-black min-h-[400px]"
                  />
                  
                  {/* FPS Counter */}
                  <Badge className="absolute top-4 right-4 bg-black/80 text-primary border-primary">
                    {fps} FPS
                  </Badge>
                </>
              )}
            </div>

            {isActive && (
              <>
                <Button
                  onClick={stopCamera}
                  variant="destructive"
                  className="w-full flex items-center gap-2"
                >
                  <CameraOff className="w-4 h-4" />
                  Stop Camera
                </Button>

                {detections.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Active Detections:</h3>
                    <div className="grid gap-2">
                      {detections.map((det, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary animate-in fade-in slide-in-from-top-2"
                        >
                          <span className="text-foreground capitalize">{det.class}</span>
                          <span className="text-primary font-semibold">
                            {(det.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveDetection;
