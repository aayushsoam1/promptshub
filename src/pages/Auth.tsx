
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Mail, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: ">>> EMAIL_REQUIRED",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: ">>> SUBSCRIPTION_SUCCESS",
        description: "Welcome! You now have full access to all prompts.",
      });
      navigate("/prompts");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Matrix-like background effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="text-green-500 text-xs font-mono leading-3 break-all animate-pulse">
          {Array.from({ length: 200 }, (_, i) => (
            <div key={i} className="float-left w-4">
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-pulse"></div>

      <Card className="w-full max-w-md bg-gray-900/90 border-2 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Terminal className="h-8 w-8 text-green-400 mr-2" />
            <CardTitle className="text-2xl font-mono text-green-400">
              {">"} FULL_ACCESS
            </CardTitle>
          </div>
          <CardDescription className="text-green-300/80 font-mono text-sm">
            {"// "} ENTER_EMAIL_FOR_UNLIMITED_PROMPTS
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubscribe} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-400 font-mono text-sm flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                EMAIL_ADDRESS:
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
                placeholder="user@domain.com"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono text-lg py-6"
            >
              {isLoading ? (
                "PROCESSING..."
              ) : (
                <>
                  {">"} GET_FULL_ACCESS
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-green-400 font-mono text-xs mb-4">
              {"// "} INSTANT_ACCESS_TO_500+_PROMPTS
            </p>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-green-400 hover:text-green-300 font-mono text-sm"
            >
              {"<"} BACK_TO_MAIN
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
