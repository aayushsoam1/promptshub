
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Terminal, Mail, Zap, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/useSubscription";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const subscriptionMutation = useSubscription();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    setTimeLeft(20);
    
    try {
      // Save email to Supabase
      await subscriptionMutation.mutateAsync(email);
      
      // Start 20-second countdown
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsSubscribing(false);
            toast({
              title: "Welcome to PromptHub!",
              description: "You now have full access to all prompts!",
            });
            navigate("/prompts");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      setIsSubscribing(false);
      setTimeLeft(0);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
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
      
      {/* Back Button */}
      <Button
        onClick={() => navigate("/")}
        variant="outline"
        className="fixed top-4 left-4 bg-transparent border-green-500/30 text-green-400 hover:bg-green-900/20 font-mono"
        disabled={isSubscribing}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {">"} BACK
      </Button>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-gray-900/90 border-2 border-green-500/50 rounded-lg p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <Mail className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
            
            <h1 className="text-3xl font-mono text-green-400 mb-4">
              {">"} SUBSCRIBE_TO_ACCESS
            </h1>
            
            <p className="text-green-300/80 font-mono text-sm">
              {"// "} ENTER_EMAIL_FOR_UNLIMITED_ACCESS
              <br />
              {"// "} NO_PAYMENT_REQUIRED
              <br />
              {"// "} INSTANT_ACTIVATION
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-green-400 font-mono text-sm mb-2">
                {">"} EMAIL_ADDRESS:
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-green-500/30 text-green-300 placeholder:text-green-500/50 font-mono focus:border-green-400"
                required
                disabled={isSubscribing}
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubscribing}
              className="w-full bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 hover:border-green-400 font-mono py-3"
            >
              {isSubscribing ? (
                <>
                  <Terminal className="h-4 w-4 mr-2 animate-spin" />
                  {">"} PROCESSING... ({timeLeft}s)
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  {">"} GET_FULL_ACCESS
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-green-500/60 font-mono text-xs">
              {"// "} FREE_FOREVER_ACCESS
              <br />
              {"// "} NO_HIDDEN_CHARGES
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
