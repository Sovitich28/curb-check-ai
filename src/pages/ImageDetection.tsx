import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import DetectionCanvas from "@/components/DetectionCanvas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ImageDetection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [detections, setDetections] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
    setDetections([]);
  };

  const handleDetect = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // TODO: Replace with your actual backend endpoint
      const response = await fetch("http://localhost:8000/api/detect/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Detection failed");

      const data = await response.json();
      setDetections(data.detections);
      toast.success("Detection completed successfully!");
    } catch (error) {
      toast.error("Detection failed. Make sure the backend server is running.");
      console.error("Detection error:", error);
      
      // Mock data for demonstration
      setDetections([
        {
          class: "pothole",
          confidence: 0.92,
          bbox: [150, 200, 180, 120],
        },
        {
          class: "speed_bump",
          confidence: 0.87,
          bbox: [400, 180, 200, 80],
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    toast.success("Download feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Image Detection</h1>
            <p className="text-muted-foreground">
              Upload an image to detect potholes and speed bumps
            </p>
          </div>

          {!imageUrl ? (
            <FileUpload
              accept="image/jpeg,image/png,image/jpg"
              onFileSelect={handleFileSelect}
              label="Upload Image"
              description="Drag and drop or click to select (JPG, PNG)"
              disabled={isProcessing}
            />
          ) : (
            <Card className="p-6 space-y-6 border-border bg-card">
              {detections.length === 0 ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <DetectionCanvas
                  imageUrl={imageUrl}
                  detections={detections}
                  className="w-full"
                />
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
                    "Run Detection"
                  )}
                </Button>

                {detections.length > 0 && (
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
                    setImageUrl("");
                    setDetections([]);
                  }}
                  variant="secondary"
                >
                  New Image
                </Button>
              </div>

              {detections.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Detections:</h3>
                  <div className="grid gap-2">
                    {detections.map((det, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary"
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
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetection;
