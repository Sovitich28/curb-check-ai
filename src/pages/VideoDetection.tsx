import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

const VideoDetection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string>("");

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setProcessedVideoUrl("");
    setProgress(0);
  };

  const handleDetect = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("video", selectedFile);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      // TODO: Replace with your actual backend endpoint
      const response = await fetch("http://localhost:8000/api/detect/video", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) throw new Error("Detection failed");

      const blob = await response.blob();
      setProcessedVideoUrl(URL.createObjectURL(blob));
      setProgress(100);
      toast.success("Video processing completed!");
    } catch (error) {
      toast.error("Video processing failed. Make sure the backend server is running.");
      console.error("Detection error:", error);
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedVideoUrl) {
      const a = document.createElement("a");
      a.href = processedVideoUrl;
      a.download = "detected_video.mp4";
      a.click();
      toast.success("Download started!");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Video Detection</h1>
            <p className="text-muted-foreground">
              Upload a video to process with detection annotations
            </p>
          </div>

          {!videoUrl ? (
            <FileUpload
              accept="video/mp4,video/avi,video/mov"
              onFileSelect={handleFileSelect}
              label="Upload Video"
              description="Drag and drop or click to select (MP4, AVI, MOV)"
              disabled={isProcessing}
            />
          ) : (
            <Card className="p-6 space-y-6 border-border bg-card">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Original Video</h3>
                  <video
                    src={videoUrl}
                    controls
                    className="w-full rounded-lg shadow-lg bg-black"
                  />
                </div>

                {processedVideoUrl && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Processed Video</h3>
                    <video
                      src={processedVideoUrl}
                      controls
                      className="w-full rounded-lg shadow-lg bg-black"
                    />
                  </div>
                )}
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing video...</span>
                    <span className="text-primary font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={handleDetect}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-primary hover:shadow-glow"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Process Video"
                  )}
                </Button>

                {processedVideoUrl && (
                  <Button
                    onClick={handleDownload}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                )}

                <Button
                  onClick={() => {
                    setSelectedFile(null);
                    setVideoUrl("");
                    setProcessedVideoUrl("");
                    setProgress(0);
                  }}
                  variant="secondary"
                  disabled={isProcessing}
                >
                  New Video
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetection;
