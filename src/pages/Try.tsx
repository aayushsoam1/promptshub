
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedPrompts } from "@/components/FeaturedPrompts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Terminal, Mail, Zap, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserProfileModal } from "@/components/UserProfileModal";

const Try = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const navigate = useNavigate();
  const { userProfile, getOrCreateProfile } = useUserProfile();

  const handleSubscribe = async () => {
    if (!email) {
      toast({
        title: ">>> EMAIL_REQUIRED",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      const profile = await getOrCreateProfile(email);
      if (profile) {
        setShowSubscribeModal(false);
        setEmail("");
        // Store email in localStorage for session
        localStorage.setItem('user_email', email);
        navigate("/prompts");
      }
    } catch (error) {
      toast({
        title: ">>> SYSTEM_ERROR",
        description: "Failed to process subscription. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const currentUserEmail = localStorage.getItem('user_email');

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
      
      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/90 border-2 border-green-500/50 rounded-lg p-8 max-w-md w-full text-center backdrop-blur-sm">
            <Mail className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
            
            <h2 className="text-2xl font-mono text-green-400 mb-4">
              {">"} GET_FULL_ACCESS
            </h2>
            
            <p className="text-green-300/80 font-mono text-sm mb-6">
              {"// "} ENTER_EMAIL_FOR_UNLIMITED_ACCESS
              <br />
              {"// "} UNLOCK_ALL_PROMPTS_DATABASE
              <br />
              {"// "} NO_PAYMENT_REQUIRED
            </p>
            
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-green-500/30 text-green-300 placeholder:text-green-500/50 font-mono"
              />
              
              <Button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="w-full bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 hover:border-green-400 font-mono"
              >
                <Terminal className="h-4 w-4 mr-2" />
                {isSubscribing ? "PROCESSING..." : ">"} GET_ACCESS
              </Button>
              
              <Button
                onClick={() => setShowSubscribeModal(false)}
                variant="outline"
                className="w-full bg-transparent border-green-500/30 text-green-400 hover:bg-green-900/20 font-mono"
              >
                {">"} CONTINUE_TRIAL
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {currentUserEmail && (
        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userEmail={currentUserEmail}
        />
      )}

      {/* Header Controls */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        {currentUserEmail && (
          <Button
            onClick={() => setShowProfileModal(true)}
            className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 hover:border-green-400 font-mono"
          >
            <User className="h-4 w-4 mr-2" />
            PROFILE
          </Button>
        )}
        <Button
          onClick={() => setShowSubscribeModal(true)}
          className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 hover:border-green-400 font-mono"
        >
          <Zap className="h-4 w-4 mr-2" />
          SUBSCRIBE
        </Button>
      </div>
      
      <div className="relative z-10">
        {/* Trial Mode Banner */}
        <div className="bg-green-900/20 border-b border-green-500/30 py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-green-400 font-mono text-sm">
              {currentUserEmail 
                ? `{">"} LOGGED_IN: ${currentUserEmail} - FULL_ACCESS_GRANTED`
                : `{">"} TRIAL_MODE_ACTIVE - LIMITED_PREVIEW (Click SUBSCRIBE for full access)`
              }
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
          limitCards={8}
        />
      </div>
    </div>
  );
};

export default Try;
