import { useRef, useEffect } from "react";

interface Detection {
  class: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}

interface DetectionCanvasProps {
  imageUrl: string;
  detections: Detection[];
  className?: string;
}

const DetectionCanvas = ({ imageUrl, detections, className }: DetectionCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !imageRef.current || !imageUrl) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (!ctx) return;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Draw detections
      detections.forEach((det) => {
        const [x, y, w, h] = det.bbox;
        
        // Draw bounding box
        ctx.strokeStyle = det.class === "pothole" ? "#ef4444" : "#22c55e";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);

        // Draw label background
        const label = `${det.class} (${(det.confidence * 100).toFixed(1)}%)`;
        ctx.font = "16px sans-serif";
        const textWidth = ctx.measureText(label).width;
        
        ctx.fillStyle = det.class === "pothole" ? "#ef4444" : "#22c55e";
        ctx.fillRect(x, y - 28, textWidth + 10, 28);

        // Draw label text
        ctx.fillStyle = "#ffffff";
        ctx.fillText(label, x + 5, y - 8);
      });
    };

    img.src = imageUrl;
  }, [imageUrl, detections]);

  return (
    <div className={className}>
      <img ref={imageRef} src={imageUrl} alt="" className="hidden" />
      <canvas ref={canvasRef} className="w-full h-auto rounded-lg shadow-lg" />
    </div>
  );
};

export default DetectionCanvas;
