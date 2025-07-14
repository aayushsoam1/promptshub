
import { useState, useEffect } from "react";
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

  const validateGmailEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast({
        title: ">>> EMAIL_REQUIRED",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!validateGmailEmail(email)) {
      toast({
        title: ">>> INVALID_EMAIL",
        description: "Only Gmail addresses (@gmail.com) are allowed",
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

  // Show subscribe notification every 20 seconds for unsubscribed users
  useEffect(() => {
    if (!currentUserEmail) {
      const interval = setInterval(() => {
        toast({
          title: ">>> SUBSCRIBE_REQUIRED",
          description: "Get unlimited access - Subscribe now!",
          variant: "default",
        });
      }, 20000); // 20 seconds

      return () => clearInterval(interval);
    }
  }, [currentUserEmail]);

  return (
    <div className="min-h-screen bg-background">
      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border-2 border-border rounded-lg p-8 max-w-md w-full text-center shadow-xl">
            <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
            
            <h2 className="text-2xl font-mono text-primary mb-4">
              {">"} GET_FULL_ACCESS
            </h2>
            
            <p className="text-muted-foreground font-mono text-sm mb-6">
              {"// "} ENTER_GMAIL_FOR_UNLIMITED_ACCESS
              <br />
              {"// "} ONLY_GMAIL_ADDRESSES_ACCEPTED
              <br />
              {"// "} NO_PAYMENT_REQUIRED
            </p>
            
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="your.email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground font-mono"
              />
              
              <Button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border border-border font-mono"
              >
                <Terminal className="h-4 w-4 mr-2" />
                {isSubscribing ? "PROCESSING..." : ">"} GET_ACCESS
              </Button>
              
              <Button
                onClick={() => setShowSubscribeModal(false)}
                variant="outline"
                className="w-full bg-transparent border-border text-foreground hover:bg-muted font-mono"
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

      
      {/* Subscribe Button for unsubscribed users */}
      {!currentUserEmail && (
        <div className="fixed top-4 right-4 z-40">
          <Button
            onClick={() => setShowSubscribeModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border border-border font-mono"
          >
            <Zap className="h-4 w-4 mr-2" />
            SUBSCRIBE
          </Button>
        </div>
      )}

      <div className="relative">
        {/* Trial Mode Banner */}
        <div className="bg-muted border-b border-border py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-foreground font-mono text-sm">
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
          requireSubscription={!currentUserEmail}
        />
      </div>
    </div>
  );
};

export default Try;
