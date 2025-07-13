
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Terminal, Mail, Zap, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const navigate = useNavigate();

  const validateGmailEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    return emailRegex.test(email);
  };

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

    if (!validateGmailEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Only Gmail addresses (@gmail.com) are allowed",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribing(false);
      localStorage.setItem('user_email', email);
      toast({
        title: "Welcome to PromptHub!",
        description: "You now have full access to all prompts!",
      });
      navigate("/prompts");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* Back Button */}
      <Button
        onClick={() => navigate("/")}
        variant="outline"
        className="fixed top-4 left-4 border-border text-foreground hover:bg-muted font-mono"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {">"} BACK
      </Button>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-xl">
          <div className="text-center mb-8">
            <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
            
            <h1 className="text-3xl font-mono text-primary mb-4">
              {">"} SUBSCRIBE_TO_ACCESS
            </h1>
            
            <p className="text-muted-foreground font-mono text-sm">
              {"// "} ENTER_GMAIL_FOR_UNLIMITED_ACCESS
              <br />
              {"// "} ONLY_GMAIL_ADDRESSES_ACCEPTED
              <br />
              {"// "} INSTANT_ACTIVATION
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-foreground font-mono text-sm mb-2">
                {">"} GMAIL_ADDRESS:
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground font-mono focus:border-primary"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubscribing}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border border-border font-mono py-3"
            >
              {isSubscribing ? (
                <>
                  <Terminal className="h-4 w-4 mr-2 animate-spin" />
                  {">"} PROCESSING_SUBSCRIPTION...
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
            <p className="text-muted-foreground font-mono text-xs">
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
