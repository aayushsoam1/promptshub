
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Terminal, Shield, Chrome } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/prompts");
    }
  }, [user, navigate]);

  // Simple CAPTCHA implementation
  const [captchaQuestion, setCaptchaQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({ a, b, answer: a + b });
    setCaptchaInput("");
    setCaptchaVerified(false);
  };

  const verifyCaptcha = () => {
    if (parseInt(captchaInput) === captchaQuestion.answer) {
      setCaptchaVerified(true);
      toast({
        title: ">>> CAPTCHA_VERIFIED",
        description: "Human verification successful",
      });
    } else {
      setCaptchaVerified(false);
      generateCaptcha();
      toast({
        title: ">>> CAPTCHA_FAILED",
        description: "Invalid verification. Try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast({
        title: ">>> ACCESS_DENIED",
        description: "Complete CAPTCHA verification first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: ">>> LOGIN_SUCCESS",
          description: "Access granted. Redirecting...",
        });
        navigate("/prompts");
      }
    } catch (error: any) {
      toast({
        title: ">>> LOGIN_FAILED",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast({
        title: ">>> ACCESS_DENIED",
        description: "Complete CAPTCHA verification first",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: ">>> PASSWORD_MISMATCH",
        description: "Password confirmation failed",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/prompts`,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: ">>> REGISTRATION_SUCCESS",
          description: "Account created. Check email for verification.",
        });
      }
    } catch (error: any) {
      toast({
        title: ">>> REGISTRATION_FAILED",
        description: error.message || "Account creation failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!captchaVerified) {
      toast({
        title: ">>> ACCESS_DENIED",
        description: "Complete CAPTCHA verification first",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/prompts`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: ">>> GOOGLE_AUTH_FAILED",
        description: error.message || "Google authentication failed",
        variant: "destructive",
      });
    }
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
              {">"} SYSTEM_ACCESS
            </CardTitle>
          </div>
          <CardDescription className="text-green-300/80 font-mono text-sm">
            {"// "} AUTHENTICATE_TO_CONTINUE
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-green-500/30">
              <TabsTrigger 
                value="signin" 
                className="font-mono text-green-400 data-[state=active]:bg-green-900/50 data-[state=active]:text-green-300"
              >
                {">"} LOGIN
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="font-mono text-green-400 data-[state=active]:bg-green-900/50 data-[state=active]:text-green-300"
              >
                {">"} REGISTER
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-green-400 font-mono text-sm">
                    EMAIL_ADDRESS:
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
                    placeholder="user@domain.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-green-400 font-mono text-sm">
                    PASSWORD:
                  </Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-green-400 hover:text-green-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* CAPTCHA */}
                <div className="space-y-2">
                  <Label className="text-green-400 font-mono text-sm flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    CAPTCHA_VERIFICATION:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm">
                      {captchaQuestion.a} + {captchaQuestion.b} = ?
                    </div>
                    <Input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400 w-20"
                      placeholder="?"
                    />
                    <Button
                      type="button"
                      onClick={verifyCaptcha}
                      className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono"
                      size="sm"
                    >
                      VERIFY
                    </Button>
                  </div>
                  {captchaVerified && (
                    <p className="text-green-400 font-mono text-xs">✓ CAPTCHA_VERIFIED</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !captchaVerified}
                  className="w-full bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono"
                >
                  {isLoading ? "AUTHENTICATING..." : "{"} LOGIN {"}"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-green-400 font-mono text-sm">
                    FULL_NAME:
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-green-400 font-mono text-sm">
                    EMAIL_ADDRESS:
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
                    placeholder="user@domain.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-green-400 font-mono text-sm">
                    PASSWORD:
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-green-400 hover:text-green-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-green-400 font-mono text-sm">
                    CONFIRM_PASSWORD:
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-green-400 hover:text-green-300"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* CAPTCHA */}
                <div className="space-y-2">
                  <Label className="text-green-400 font-mono text-sm flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    CAPTCHA_VERIFICATION:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-800/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm">
                      {captchaQuestion.a} + {captchaQuestion.b} = ?
                    </div>
                    <Input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400 w-20"
                      placeholder="?"
                    />
                    <Button
                      type="button"
                      onClick={verifyCaptcha}
                      className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono"
                      size="sm"
                    >
                      VERIFY
                    </Button>
                  </div>
                  {captchaVerified && (
                    <p className="text-green-400 font-mono text-xs">✓ CAPTCHA_VERIFIED</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !captchaVerified}
                  className="w-full bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono"
                >
                  {isLoading ? "CREATING_ACCOUNT..." : "{"} REGISTER {"}"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Google Sign In */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-green-500/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-green-400 font-mono">OR</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={!captchaVerified}
              className="w-full mt-4 bg-gray-800/50 hover:bg-gray-700/50 text-green-300 border border-green-500/50 font-mono"
            >
              <Chrome className="h-4 w-4 mr-2" />
              {">"} GOOGLE_AUTH
            </Button>
          </div>

          <div className="mt-6 text-center">
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
