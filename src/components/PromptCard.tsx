import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, Eye, CheckCircle, X, Maximize2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIncrementInteraction } from "@/hooks/usePrompts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  likes: number;
  views: number;
  copies: number;
}
interface PromptCardProps {
  prompt: Prompt;
}
export const PromptCard = ({
  prompt
}: PromptCardProps) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewLogged, setViewLogged] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const incrementInteractionMutation = useIncrementInteraction();

  // Generate higher, more realistic numbers for engagement
  const getDisplayNumber = (baseNumber: number, type: 'views' | 'likes' | 'copies') => {
    const multipliers = {
      views: Math.floor(Math.random() * 50) + 15,
      // 15-65x multiplier for views
      likes: Math.floor(Math.random() * 20) + 8,
      // 8-28x multiplier for likes  
      copies: Math.floor(Math.random() * 15) + 5 // 5-20x multiplier for copies
    };
    const result = baseNumber * multipliers[type];
    if (result >= 1000) {
      return `${(result / 1000).toFixed(1)}k`;
    }
    return result.toString();
  };

  // Log view when component mounts
  useEffect(() => {
    if (!viewLogged) {
      incrementInteractionMutation.mutate({
        promptId: prompt.id,
        interactionType: 'view'
      });
      setViewLogged(true);
    }
  }, [prompt.id, viewLogged, incrementInteractionMutation]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);

      // Log copy interaction
      incrementInteractionMutation.mutate({
        promptId: prompt.id,
        interactionType: 'copy'
      });
      toast({
        title: ">>> COPIED TO CLIPBOARD",
        description: "Prompt data extracted successfully."
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: ">>> ACCESS DENIED",
        description: "Copy operation failed. Try manual extraction.",
        variant: "destructive"
      });
    }
  };
  const handleLike = () => {
    if (!liked) {
      // Log like interaction
      incrementInteractionMutation.mutate({
        promptId: prompt.id,
        interactionType: 'like'
      });
      setLiked(true);
      toast({
        title: ">>> SYSTEM LIKED",
        description: "Target added to favorites database"
      });
    }
  };
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open detail if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsDetailOpen(true);
  };
  return <>
      <Card className="group h-full bg-black border-2 border-green-500/30 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:border-green-400/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative cursor-pointer" onClick={handleCardClick}>
        {/* Matrix-like background effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="text-green-500 text-xs font-mono leading-3 break-all">
            {Array.from({
            length: 20
          }, (_, i) => <div key={i} className="animate-pulse">
                {Math.random().toString(36).substring(2, 15)}
              </div>)}
          </div>
        </div>
        
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-green-400 group-hover:text-green-300 transition-colors font-mono tracking-wider">
                  {"> " + prompt.title.toUpperCase()}
                </h3>
                <Maximize2 className="h-4 w-4 text-green-500/60 group-hover:text-green-400 transition-colors" />
              </div>
              <p className="text-green-300/80 text-sm font-mono">
                {"// " + prompt.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="py-3 relative z-10">
          <div className="bg-gray-900/80 rounded-lg p-4 mb-4 border border-green-500/30 backdrop-blur-sm h-32 overflow-hidden">
            <div className="text-xs text-green-400 mb-2 font-mono">PROMPT_DATA:</div>
            <div className="h-24 overflow-hidden">
              <p className="text-sm text-green-300 font-mono whitespace-pre-wrap break-words leading-relaxed">
                {prompt.content}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.tags.map(tag => <Badge key={tag} className="text-xs bg-green-900/50 text-green-400 border border-green-500/30 hover:bg-green-800/50 font-mono">
                #{tag}
              </Badge>)}
          </div>

          <div className="flex items-center justify-between text-xs text-green-500/70 font-mono">
            <span>USER: {prompt.author}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {getDisplayNumber(prompt.views, 'views')}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {getDisplayNumber(prompt.likes, 'likes')}
              </div>
              <div className="flex items-center gap-1">
                <Copy className="h-3 w-3" />
                {getDisplayNumber(prompt.copies, 'copies')}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3 relative z-10">
          <div className="flex gap-2 w-full">
            <Button onClick={handleCopy} variant="outline" size="sm" className="flex-1 bg-transparent border-green-500/50 text-green-400 hover:bg-green-900/30 hover:border-green-400 font-mono">
              {copied ? <>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  EXTRACTED
                </> : <>
                  <Copy className="h-4 w-4 mr-2" />
                  EXTRACT
                </>}
            </Button>
            <Button onClick={handleLike} variant="outline" size="sm" className={`px-3 bg-transparent border-green-500/50 hover:bg-green-900/30 font-mono ${liked ? 'text-red-400 border-red-400/50' : 'text-green-400 hover:border-green-400'}`}>
              <Heart className={`h-4 w-4 ${liked ? 'fill-current text-red-400' : ''}`} />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Smaller Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] bg-black border-2 border-green-500/50 text-green-300">
          <DialogHeader className="border-b border-green-500/30 pb-4">
            <DialogTitle className="text-xl font-mono text-green-400 tracking-wider">
              {"> " + prompt.title.toUpperCase()}
            </DialogTitle>
            <p className="text-green-300/80 font-mono text-sm mt-2">
              {"// " + prompt.description}
            </p>
            <div className="flex items-center justify-between text-xs text-green-500/70 font-mono mt-3">
              <span>USER: {prompt.author}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {getDisplayNumber(prompt.views, 'views')}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {getDisplayNumber(prompt.likes, 'likes')}
                </div>
                <div className="flex items-center gap-1">
                  <Copy className="h-3 w-3" />
                  {getDisplayNumber(prompt.copies, 'copies')}
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 min-h-0">
            <div className="mb-4">
              <div className="text-sm text-green-400 mb-3 font-mono">PROMPT_DATA:</div>
              <ScrollArea className="h-[300px] w-full rounded-lg border border-green-500/30 bg-gray-900/50 p-4 mx-0 my-[-15px] px-[16px]">
                <pre className="text-sm text-green-300 font-mono whitespace-pre-wrap break-words leading-relaxed">
                  {prompt.content}
                </pre>
              </ScrollArea>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {prompt.tags.map(tag => <Badge key={tag} className="text-xs bg-green-900/50 text-green-400 border border-green-500/30 font-mono">
                  #{tag}
                </Badge>)}
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCopy} variant="outline" className="flex-1 bg-transparent border-green-500/50 text-green-400 hover:bg-green-900/30 hover:border-green-400 font-mono">
                {copied ? <>
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    EXTRACTED
                  </> : <>
                    <Copy className="h-4 w-4 mr-2" />
                    EXTRACT FULL TEXT
                  </>}
              </Button>
              <Button onClick={handleLike} variant="outline" className={`px-6 bg-transparent border-green-500/50 hover:bg-green-900/30 font-mono ${liked ? 'text-red-400 border-red-400/50' : 'text-green-400 hover:border-green-400'}`}>
                <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current text-red-400' : ''}`} />
                {liked ? 'LIKED' : 'LIKE'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};