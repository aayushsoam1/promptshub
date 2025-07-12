
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, Eye, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIncrementInteraction } from "@/hooks/usePrompts";
import { Frame } from "@/components/ui/frame";
import { twMerge } from "tailwind-merge";

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

export const PromptCard = ({ prompt }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewLogged, setViewLogged] = useState(false);
  
  const incrementInteractionMutation = useIncrementInteraction();

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
        description: "Prompt data extracted successfully.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: ">>> ACCESS DENIED",
        description: "Copy operation failed. Try manual extraction.",
        variant: "destructive",
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
        description: "Target added to favorites database",
      });
    }
  };

  return (
    <Card className="group h-full bg-black border-2 border-green-500/30 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:border-green-400/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
      {/* Frame background effect */}
      <div
        className={twMerge([
          "absolute inset-0 size-full",
          "[--color-frame-1-stroke:hsl(var(--primary))]/50",
          "[--color-frame-1-fill:hsl(var(--primary))]/20",
          "[--color-frame-2-stroke:hsl(var(--accent))]",
          "[--color-frame-2-fill:hsl(var(--accent))]/20",
          "[--color-frame-3-stroke:hsl(var(--accent))]",
          "[--color-frame-3-fill:hsl(var(--accent))]/20",
          "[--color-frame-4-stroke:hsl(var(--accent))]",
          "[--color-frame-4-fill:hsl(var(--accent))]/20",
          "[--color-frame-5-stroke:hsl(var(--primary))]/23",
          "[--color-frame-5-fill:transparent]",
        ])}
      >
        <Frame
          className="drop-shadow-2xl drop-shadow-primary/50"
          paths={JSON.parse(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","37","12"],["L","0% + 59","12"],["L","0% + 85","0% + 33"],["L","79","0% + 12"],["L","50% - 3","12"],["L","50% + 16","30"],["L","100% - 35","30"],["L","100% - 16","47"],["L","100% - 16","100% - 47.05882352941177%"],["L","100% - 8","100% - 44.85294117647059%"],["L","100% - 9","100% - 16.666666666666668%"],["L","100% - 17","100% - 14.705882352941176%"],["L","100% - 17","100% - 30"],["L","100% - 34","100% - 12"],["L","50% + 13","100% - 12"],["L","50% + 15","100% - 26"],["L","50% - 11","100% - 12"],["L","37","100% - 12"],["L","19","100% - 30"],["L","19","0% + 50.490196078431374%"],["L","10","0% + 48.529411764705884%"],["L","10","0% + 20.098039215686274%"],["L","0% + 19.000000000000004","0% + 18.38235294117647%"],["L","19","29"],["L","37","12"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","50% + 10","15"],["L","50% + 19","15"],["L","50% + 24","0% + 20"],["L","50% + 16","0% + 20"],["L","50% + 10","15"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","50% + 25","15"],["L","50% + 34","15"],["L","50% + 40","0% + 21"],["L","50% + 31","0% + 21"],["L","50% + 25","15"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-4-stroke)","fill":"var(--color-frame-4-fill)"},"path":[["M","50% + 40","15"],["L","50% + 52","15"],["L","50% + 61","0% + 23"],["L","50% + 49","0% + 23"],["L","50% + 40","15"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-5-stroke)","fill":"var(--color-frame-5-fill)"},"path":[["M","36","3"],["L","0% + 58","0"],["L","0% + 84","0% + 40"],["L","81","0% + 0"],["L","50% - 1","4"],["L","50% + 5","6"],["L","50% + 54","7"],["L","50% + 74","23"],["L","100% - 32","21"],["L","100% - 8","42"],["L","100% - 9","100% - 52.450980392156865%"],["L","100% + 0","100% - 50.245098039215684%"],["L","100% + 0","100% - 15.196078431372548%"],["L","100% - 7","100% - 13.480392156862745%"],["L","100% - 7","100% - 27"],["L","100% - 29","100% - 3"],["L","50% + 14","100% + 0"],["L","50% + 21","100% - 31"],["L","50% - 13","100% + 0"],["L","37","100% - 4"],["L","11","100% - 28"],["L","10","0% + 55.3921568627451%"],["L","0","0% + 52.94117647058823%"],["L","1","0% + 18.627450980392158%"],["L","11","0% + 16.666666666666668%"],["L","11","25"],["L","36","3"]]}]'
          )}
        />
      </div>
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-green-400 mb-2 group-hover:text-green-300 transition-colors font-mono tracking-wider">
              {"> " + prompt.title.toUpperCase()}
            </h3>
            <p className="text-green-300/80 text-sm font-mono">
              {"// " + prompt.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3 relative z-10">
        <div className="bg-gray-900/80 rounded-lg p-4 mb-4 border border-green-500/30 backdrop-blur-sm">
          <div className="text-xs text-green-400 mb-2 font-mono">PROMPT_DATA:</div>
          <p className="text-sm text-green-300 font-mono whitespace-pre-wrap break-words leading-relaxed">
            {prompt.content}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag) => (
            <Badge key={tag} className="text-xs bg-green-900/50 text-green-400 border border-green-500/30 hover:bg-green-800/50 font-mono">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-green-500/70 font-mono">
          <span>USER: {prompt.author}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {prompt.views}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {prompt.likes}
            </div>
            <div className="flex items-center gap-1">
              <Copy className="h-3 w-3" />
              {prompt.copies}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 relative z-10">
        <div className="flex gap-2 w-full">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-green-500/50 text-green-400 hover:bg-green-900/30 hover:border-green-400 font-mono"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                EXTRACTED
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                EXTRACT
              </>
            )}
          </Button>
          <Button
            onClick={handleLike}
            variant="outline"
            size="sm"
            className={`px-3 bg-transparent border-green-500/50 hover:bg-green-900/30 font-mono ${
              liked ? 'text-red-400 border-red-400/50' : 'text-green-400 hover:border-green-400'
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current text-red-400' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
