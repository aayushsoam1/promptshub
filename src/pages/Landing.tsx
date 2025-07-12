
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Terminal, Users, Play, Code, Zap, Shield } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix rain background effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="text-green-500 text-xs font-mono leading-3 break-all animate-pulse">
          {Array.from({ length: 300 }, (_, i) => (
            <div key={i} className="float-left w-4">
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-pulse"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-green-500/30 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Terminal className="h-8 w-8 text-green-400 mr-3" />
                <h1 className="text-2xl font-mono text-green-400 font-bold">
                  {">"} PROMPT_TERMINAL
                </h1>
              </div>
              <Button
                onClick={() => navigate("/auth")}
                className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono"
              >
                {">"} SUBSCRIBE
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-mono text-green-400 mb-6 font-bold">
              {"// "} PROMPT_DATABASE_SYSTEM
            </h2>
            <p className="text-xl text-green-300/80 font-mono mb-12 leading-relaxed">
              {">> "} Access advanced AI prompt collection
              <br />
              {">> "} Optimize your AI interactions
              <br />
              {">> "} Terminal-style interface for power users
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/try")}
                className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono text-lg px-8 py-4"
              >
                <Play className="h-5 w-5 mr-2" />
                {">"} TRY_NOW
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="bg-transparent border-green-500/50 text-green-400 hover:bg-green-900/30 font-mono text-lg px-8 py-4"
              >
                <Shield className="h-5 w-5 mr-2" />
                {">"} FULL_ACCESS
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-mono text-green-400 text-center mb-12">
              {"// "} SYSTEM_FEATURES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-400 font-mono">
                    <Code className="h-5 w-5 mr-2" />
                    {">"} PROMPT_LIBRARY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-300/80 font-mono text-sm">
                    {"// "} Curated collection of high-performance AI prompts
                    <br />
                    {"// "} Categories: coding, writing, marketing, design
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-400 font-mono">
                    <Zap className="h-5 w-5 mr-2" />
                    {">"} INSTANT_COPY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-300/80 font-mono text-sm">
                    {"// "} One-click prompt extraction
                    <br />
                    {"// "} Optimized for rapid deployment
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-400 font-mono">
                    <Users className="h-5 w-5 mr-2" />
                    {">"} COMMUNITY_DRIVEN
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-300/80 font-mono text-sm">
                    {"// "} User-submitted prompts
                    <br />
                    {"// "} Rating and feedback system
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-mono text-green-400 text-center mb-12">
              {"// "} SYSTEM_DEMONSTRATION
            </h3>
            
            <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-800/50 rounded-lg border border-green-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-green-400 font-mono">
                      {">> "} VIDEO_CONTENT_LOADING
                    </p>
                    <p className="text-green-300/60 font-mono text-sm mt-2">
                      {"// "} Backend integration required
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-mono text-green-400 text-center mb-12">
              {"// "} SYSTEM_STATISTICS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-mono text-green-400 mb-2">
                    {">> "} LOADING...
                  </div>
                  <p className="text-green-300/80 font-mono text-sm">
                    TOTAL_VISITORS
                  </p>
                  <p className="text-green-300/60 font-mono text-xs mt-2">
                    {"// "} Backend integration required
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-mono text-green-400 mb-2">
                    500+
                  </div>
                  <p className="text-green-300/80 font-mono text-sm">
                    ACTIVE_PROMPTS
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-mono text-green-400 mb-2">
                    50K+
                  </div>
                  <p className="text-green-300/80 font-mono text-sm">
                    TOTAL_EXTRACTIONS
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="py-16 px-4 bg-gray-900/30">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-mono text-green-400 text-center mb-12">
              {"// "} USAGE_INSTRUCTIONS
            </h3>
            
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20">
                <CardContent className="p-6">
                  <div className="font-mono text-green-300">
                    <p className="text-green-400 mb-4">{">> "} STEP_01: ACCESS_SYSTEM</p>
                    <p className="text-sm mb-2">{"// "} Click "TRY_NOW" for limited preview mode</p>
                    <p className="text-sm mb-2">{"// "} Click "FULL_ACCESS" to subscribe with email</p>
                    <p className="text-sm">{"// "} Instant access to all 500+ prompts</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20">
                <CardContent className="p-6">
                  <div className="font-mono text-green-300">
                    <p className="text-green-400 mb-4">{">> "} STEP_02: BROWSE_PROMPTS</p>
                    <p className="text-sm mb-2">{"// "} Filter by category: coding, writing, marketing</p>
                    <p className="text-sm mb-2">{"// "} Search specific prompt types</p>
                    <p className="text-sm">{"// "} View community ratings and stats</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-2 border-green-500/30 shadow-lg shadow-green-500/20">
                <CardContent className="p-6">
                  <div className="font-mono text-green-300">
                    <p className="text-green-400 mb-4">{">> "} STEP_03: EXTRACT_DATA</p>
                    <p className="text-sm mb-2">{"// "} Click "EXTRACT" to copy prompt</p>
                    <p className="text-sm mb-2">{"// "} Paste directly into AI interface</p>
                    <p className="text-sm">{"// "} Rate prompts to help community</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-500/30 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-green-400 font-mono text-sm">
                {"// "} PROMPT_TERMINAL_v1.0 - Optimized for AI interactions
              </p>
              <p className="text-green-300/60 font-mono text-xs mt-2">
                {">> "} Built with React + Supabase + Terminal aesthetics
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
