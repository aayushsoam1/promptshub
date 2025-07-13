
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Users, Zap, Terminal, ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useYouTubeVideo, getYouTubeEmbedUrl } from "@/hooks/useYouTubeVideo";

const Landing = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const navigate = useNavigate();
  const { data: youtubeVideo, isLoading: isVideoLoading } = useYouTubeVideo();

  useEffect(() => {
    setVisitorCount(12547);
  }, []);

  const handleTryNow = () => {
    navigate("/try");
  };

  const handleSubscribe = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Terminal className="h-16 w-16 text-primary mr-4" />
            <h1 className="text-6xl md:text-8xl font-bold font-mono text-primary tracking-wider">
              PROMPT_HUB
            </h1>
            <Zap className="h-12 w-12 text-primary ml-4" />
          </div>
          
          <div className="bg-card border-2 border-border rounded-lg p-6 max-w-4xl mx-auto shadow-lg">
            <p className="text-foreground font-mono text-lg mb-4">
              {">"} SYSTEM_INITIALIZED: AI_PROMPT_DATABASE
            </p>
            <p className="text-muted-foreground font-mono text-base">
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
          <h2 className="text-3xl font-mono text-primary mb-8 text-center">
            {">"} HOW_TO_USE.exe
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-primary font-mono text-xl mb-4">{"1."} BROWSE</div>
              <p className="text-muted-foreground font-mono text-sm">
                {"// "} Explore our database of curated AI prompts
                <br />
                {"// "} Filter by category and search functionality
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-primary font-mono text-xl mb-4">{"2."} EXTRACT</div>
              <p className="text-muted-foreground font-mono text-sm">
                {"// "} Copy prompts with one click
                <br />
                {"// "} Use in your favorite AI tools
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-primary font-mono text-xl mb-4">{"3."} OPTIMIZE</div>
              <p className="text-muted-foreground font-mono text-sm">
                {"// "} Get better AI responses
                <br />
                {"// "} Save time with proven prompts
              </p>
            </div>
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-mono text-primary mb-8 text-center">
            {">"} TUTORIAL_VIDEO.mp4
          </h2>
          
          <div className="bg-card border-2 border-border rounded-lg p-6 max-w-4xl mx-auto">
            <div className="aspect-video bg-muted border border-border rounded-lg flex items-center justify-center relative overflow-hidden">
              {isVideoLoading ? (
                <div className="text-center">
                  <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-primary font-mono text-lg">{">"} VIDEO_LOADING...</p>
                </div>
              ) : youtubeVideo ? (
                <iframe
                  src={getYouTubeEmbedUrl(youtubeVideo.url)}
                  title={youtubeVideo.title}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-center">
                  <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-primary font-mono text-lg">{">"} NO_VIDEO_FOUND</p>
                  <p className="text-muted-foreground font-mono text-sm mt-2">
                    {"// "} Add a video URL in Supabase
                  </p>
                </div>
              )}
            </div>
            
            <div className="text-center mt-4">
              <p className="text-primary font-mono text-sm">
                {">"} WATCH: {youtubeVideo?.title || "Complete PromptHub Tutorial"}
              </p>
            </div>
          </div>
        </div>

        {/* Visitor Count */}
        <div className="mb-16">
          <div className="bg-card border-2 border-border rounded-lg p-6 max-w-md mx-auto text-center shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-mono text-primary">
                {">"} VISITOR_COUNT
              </h3>
            </div>
            
            <div className="text-4xl font-mono text-foreground mb-2">
              {visitorCount.toLocaleString()}
            </div>
            
            <p className="text-muted-foreground font-mono text-sm">
              {"// "} TOTAL_USERS_ACCESSED_SYSTEM
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleTryNow}
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-border font-mono text-xl px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Terminal className="h-6 w-6 mr-3" />
              {">"} TRY_PREVIEW.exe
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
            
            <Button
              onClick={handleSubscribe}
              variant="outline"
              className="bg-transparent hover:bg-muted text-foreground border-2 border-border font-mono text-xl px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Mail className="h-6 w-6 mr-3" />
              {">"} GET_FULL_ACCESS
              <Zap className="h-6 w-6 ml-3" />
            </Button>
          </div>
          
          <p className="text-muted-foreground font-mono text-sm">
            {"// "} TRIAL: LIMITED PREVIEW MODE
            <br />
            {"// "} SUBSCRIBE: ENTER EMAIL FOR FULL ACCESS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
