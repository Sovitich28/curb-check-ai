import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, Video, Camera, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Image,
      title: "Image Detection",
      description: "Upload images to detect potholes and speed bumps with high accuracy",
      path: "/image",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Video,
      title: "Video Detection",
      description: "Process entire videos frame-by-frame with annotated output",
      path: "/video",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Camera,
      title: "Live Detection",
      description: "Real-time detection using your webcam with FPS counter",
      path: "/live",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Road Hazard Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered detection system for identifying potholes and speed bumps
            using custom YOLO model
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/image")}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/about")}
              variant="secondary"
              size="lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <Card
              key={feature.path}
              className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer border-border bg-card"
              onClick={() => navigate(feature.path)}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">High Accuracy</h3>
                <p className="text-muted-foreground">
                  Custom-trained YOLO model for precise detection of road hazards
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Real-Time Processing</h3>
                <p className="text-muted-foreground">
                  Fast inference optimized for CPU with live video stream support
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
