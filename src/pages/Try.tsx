
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedPrompts } from "@/components/FeaturedPrompts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Terminal, Lock, Clock } from "lucide-react";

const Try = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const navigate = useNavigate();

  // Start 20-second timer when component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowLoginPrompt(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix rain background effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="text-green-500 text-xs font-mono leading-3 break-all animate-pulse">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i} className="float-left w-4">
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-pulse"></div>
      
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/90 border-2 border-green-500/50 rounded-lg p-8 max-w-md w-full text-center backdrop-blur-sm">
            <Lock className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
            
            <h2 className="text-2xl font-mono text-green-400 mb-4">
              {">"} ACCESS_RESTRICTED
            </h2>
            
            <p className="text-green-300/80 font-mono text-sm mb-6">
              {"// "} TRIAL_PERIOD_EXPIRED
              <br />
              {"// "} LOGIN_REQUIRED_FOR_FULL_ACCESS
              <br />
              {"// "} UNLOCK_ALL_PROMPTS_DATABASE
            </p>
            
            <div className="space-y-4">
              <Button
                onClick={handleLogin}
                className="w-full bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 hover:border-green-400 font-mono"
              >
                <Terminal className="h-4 w-4 mr-2" />
                {">"} LOGIN_NOW
              </Button>
              
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full bg-transparent border-green-500/30 text-green-400 hover:bg-green-900/20 font-mono"
              >
                {">"} BROWSE_FULL_SITE
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Timer Display */}
      {!showLoginPrompt && (
        <div className="fixed top-4 right-4 z-40">
          <div className="bg-gray-900/80 border border-green-500/50 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center text-green-400 font-mono text-sm">
              <Clock className="h-4 w-4 mr-2 animate-pulse" />
              TRIAL: {timeLeft}s
            </div>
          </div>
        </div>
      )}
      
      <div className="relative z-10">
        {/* Trial Mode Banner */}
        <div className="bg-green-900/20 border-b border-green-500/30 py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-green-400 font-mono text-sm">
              {">"} TRIAL_MODE_ACTIVE - LIMITED_PREVIEW ({timeLeft}s remaining)
            </p>
          </div>
        </div>

        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <FeaturedPrompts 
          selectedCategory={selectedCategory} 
          searchQuery={searchQuery}
          limitCards={8} // This prop will limit to 8 cards
        />
      </div>
    </div>
  );
};

export default Try;
