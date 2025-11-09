import { Card } from "@/components/ui/card";
import { CheckCircle, Code, Zap, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Custom YOLO Model",
      description: "Trained specifically for pothole and speed bump detection with high accuracy",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Optimized for CPU inference with real-time video stream support",
    },
    {
      icon: Shield,
      title: "Reliable Detection",
      description: "Consistent performance across various lighting conditions and road types",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">About RoadVision AI</h1>
            <p className="text-xl text-muted-foreground">
              Advanced road hazard detection using state-of-the-art computer vision
            </p>
          </div>

          <Card className="p-8 space-y-6 border-border bg-card">
            <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              RoadVision AI is a comprehensive web application designed to detect and identify road
              hazards including potholes and speed bumps. Using a custom-trained YOLO (You Only Look
              Once) model, the system provides accurate real-time detection across multiple input
              formats including images, videos, and live camera streams.
            </p>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 space-y-4 border-border bg-card">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 space-y-6 border-border bg-card">
            <h2 className="text-2xl font-semibold text-foreground">Technical Details</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Model Architecture</h4>
                  <p className="text-muted-foreground text-sm">
                    Custom YOLO model (best.pt) trained on road hazard dataset
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Backend</h4>
                  <p className="text-muted-foreground text-sm">
                    Python backend using FastAPI or Flask for model inference
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Frontend</h4>
                  <p className="text-muted-foreground text-sm">
                    Modern React application with real-time visualization capabilities
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Detection Classes</h4>
                  <p className="text-muted-foreground text-sm">
                    Potholes and Speed Bumps with confidence scores and bounding boxes
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 space-y-4 border-border bg-card bg-gradient-to-br from-card to-secondary">
            <h2 className="text-2xl font-semibold text-foreground">Setup Instructions</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>To connect this frontend with your Python backend:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Set up your Python backend (FastAPI recommended)</li>
                <li>Load your custom YOLO model (best.pt)</li>
                <li>Create API endpoints for image, video, and live detection</li>
                <li>Update the API URLs in the frontend code</li>
                <li>Enable CORS in your backend to allow frontend requests</li>
              </ol>
              <p className="text-sm mt-4 text-primary">
                The frontend is fully functional and ready to integrate with your backend endpoints.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
