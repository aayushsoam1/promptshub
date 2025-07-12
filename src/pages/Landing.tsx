import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Users, Zap, Terminal, ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setVisitorCount(12547);
  }, []);
  const handleTryNow = () => {
    navigate("/try");
  };
  const handleSubscribe = () => {
    navigate("/auth");
  };
  return <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix rain background effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="text-green-500 text-xs font-mono leading-3 break-all animate-pulse">
          {Array.from({
          length: 100
        }, (_, i) => <div key={i} className="float-left w-4">
              {Math.random().toString(36).substring(2, 15)}
            </div>)}
        </div>
      </div>
      
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-pulse"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Terminal className="h-16 w-16 text-green-400 mr-4 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold font-mono text-green-400 tracking-wider">
              PROMPT_HUB
            </h1>
            <Zap className="h-12 w-12 text-green-400 ml-4 animate-bounce" />
          </div>
          
          <div className="bg-gray-900/80 border-2 border-green-500/50 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm">
            <p className="text-green-300 font-mono text-lg mb-4">
              {">"} SYSTEM_INITIALIZED: AI_PROMPT_DATABASE
            </p>
            <p className="text-green-300/80 font-mono text-base">
              {"// "} DISCOVER THE ULTIMATE AI PROMPTING PLATFORM
              <br />
              {"// "} ACCESS THOUSANDS OF OPTIMIZED PROMPTS
              <br />
              {"// "} ENHANCE YOUR AI INTERACTIONS
            </p>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-mono text-green-400 mb-8 text-center">
            {">"} HOW_TO_USE.exe
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
              <div className="text-green-400 font-mono text-xl mb-4">{"1."} BROWSE</div>
              <p className="text-green-300/80 font-mono text-sm">
                {"// "} Explore our database of curated AI prompts
                <br />
                {"// "} Filter by category and search functionality
              </p>
            </div>
            
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
              <div className="text-green-400 font-mono text-xl mb-4">{"2."} EXTRACT</div>
              <p className="text-green-300/80 font-mono text-sm">
                {"// "} Copy prompts with one click
                <br />
                {"// "} Use in your favorite AI tools
              </p>
            </div>
            
            <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
              <div className="text-green-400 font-mono text-xl mb-4">{"3."} OPTIMIZE</div>
              <p className="text-green-300/80 font-mono text-sm">
                {"// "} Get better AI responses
                <br />
                {"// "} Save time with proven prompts
              </p>
            </div>
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-mono text-green-400 mb-8 text-center">
            {">"} TUTORIAL_VIDEO.mp4
          </h2>
          
          <div className="bg-gray-900/50 border-2 border-green-500/30 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="aspect-video bg-black border border-green-500/50 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black"></div>
              <div className="relative z-10 text-center">
                <Play className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
                <p className="text-green-400 font-mono text-lg">{">"} VIDEO_LOADING...</p>
                <p className="text-green-500/60 font-mono text-sm mt-2">
                  {"// "} Replace this with your YouTube embed
                </p>
              </div>
              
              <div className="absolute inset-0 opacity-10">
                <div className="text-green-500 text-xs font-mono leading-3 break-all">
                  {Array.from({
                  length: 20
                }, (_, i) => <div key={i} className="animate-pulse">
                      {Math.random().toString(36).substring(2, 15)}
                    </div>)}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4">
              
            </div>
          </div>
        </div>

        {/* Visitor Count */}
        <div className="mb-16">
          <div className="bg-gray-900/80 border-2 border-green-500/50 rounded-lg p-6 max-w-md mx-auto text-center backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-green-400 mr-3 animate-pulse" />
              <h3 className="text-2xl font-mono text-green-400">
                {">"} VISITOR_COUNT
              </h3>
            </div>
            
            <div className="text-4xl font-mono text-green-300 mb-2">
              {visitorCount.toLocaleString()}
            </div>
            
            <p className="text-green-500/60 font-mono text-sm">
              {"// "} TOTAL_USERS_ACCESSED_SYSTEM
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleTryNow} className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border-2 border-green-500/50 hover:border-green-400 font-mono text-xl px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
              <Terminal className="h-6 w-6 mr-3" />
              {">"} TRY_PREVIEW.exe
              <ArrowRight className="h-6 w-6 ml-3 animate-pulse" />
            </Button>
            
            <Button onClick={handleSubscribe} className="bg-green-600/50 hover:bg-green-500/50 text-white border-2 border-green-400/50 hover:border-green-300 font-mono text-xl px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/20">
              <Mail className="h-6 w-6 mr-3" />
              {">"} GET_FULL_ACCESS
              <Zap className="h-6 w-6 ml-3 animate-bounce" />
            </Button>
          </div>
          
          <p className="text-green-500/60 font-mono text-sm">
            {"// "} TRIAL: LIMITED PREVIEW MODE
            <br />
            {"// "} SUBSCRIBE: ENTER EMAIL FOR FULL ACCESS
          </p>
        </div>
      </div>
    </div>;
};
export default Landing;