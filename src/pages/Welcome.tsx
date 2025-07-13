import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const navigate = useNavigate();

  const handleTryPreview = () => {
    navigate("/try");
  };

  const handleGetFullAccess = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Prompts
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover and create amazing AI prompts
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleTryPreview}
            size="lg"
            className="w-full"
          >
            Try Preview
          </Button>
          
          <Button 
            onClick={handleGetFullAccess}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Get Full Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;