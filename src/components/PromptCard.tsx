
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

export const PromptCard = ({ prompt }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewLogged, setViewLogged] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const incrementInteractionMutation = useIncrementInteraction();

  // Generate higher, more realistic numbers for engagement
  const getDisplayNumber = (baseNumber: number, type: 'views' | 'likes' | 'copies') => {
    const multipliers = {
      views: Math.floor(Math.random() * 50) + 15,
      likes: Math.floor(Math.random() * 20) + 8,
      copies: Math.floor(Math.random() * 15) + 5
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
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsDetailOpen(true);
  };

  return (
    <>
      <Card className="group h-full bg-card border-2 border-border shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative cursor-pointer" onClick={handleCardClick}>
        <CardHeader className="pb-3 relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-primary group-hover:text-primary/80 transition-colors font-mono tracking-wider">
                  {"> " + prompt.title.toUpperCase()}
                </h3>
                <Maximize2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-muted-foreground text-sm font-mono">
                {"// " + prompt.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="py-3 relative">
          <div className="bg-muted rounded-lg p-4 mb-4 border border-border h-32 overflow-hidden">
            <div className="text-xs text-primary mb-2 font-mono">PROMPT_DATA:</div>
            <div className="h-24 overflow-hidden">
              <p className="text-sm text-foreground font-mono whitespace-pre-wrap break-words leading-relaxed">
                {prompt.content}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {(prompt.tags || []).map(tag => (
              <Badge key={tag} className="text-xs bg-background text-foreground border border-border hover:bg-muted font-mono">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>USER: {prompt.author}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {getDisplayNumber(prompt.views, 'views')}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                {getDisplayNumber(prompt.likes, 'likes')}
              </div>
              <div className="flex items-center gap-1">
                <Copy className="h-3 w-3" />
                {getDisplayNumber(prompt.copies, 'copies')}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3 relative">
          <div className="flex gap-2 w-full">
            <Button 
              onClick={handleCopy} 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-transparent border-border text-foreground hover:bg-muted hover:border-primary font-mono"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
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
              className={`px-3 bg-transparent border-border hover:bg-muted font-mono ${
                liked ? 'text-destructive border-destructive/50' : 'text-foreground hover:border-primary'
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current text-destructive' : ''}`} />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] bg-card border-2 border-border text-foreground">
          <DialogHeader className="border-b border-border pb-4">
            <DialogTitle className="text-xl font-mono text-primary tracking-wider">
              {"> " + prompt.title.toUpperCase()}
            </DialogTitle>
            <p className="text-muted-foreground font-mono text-sm mt-2">
              {"// " + prompt.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mt-3">
              <span>USER: {prompt.author}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {getDisplayNumber(prompt.views, 'views')}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500 fill-red-500" />
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
              <div className="text-sm text-primary mb-3 font-mono">PROMPT_DATA:</div>
              <ScrollArea className="h-[200px] w-full rounded-lg border border-border bg-muted p-4">
                <pre className="text-sm text-foreground font-mono whitespace-pre-wrap break-words leading-relaxed">
                  {prompt.content}
                </pre>
              </ScrollArea>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {(prompt.tags || []).map(tag => (
                <Badge key={tag} className="text-xs bg-background text-foreground border border-border font-mono">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleCopy} 
                variant="outline" 
                className="flex-1 bg-transparent border-border text-foreground hover:bg-muted hover:border-primary font-mono"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                    EXTRACTED
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    EXTRACT FULL TEXT
                  </>
                )}
              </Button>
              <Button 
                onClick={handleLike} 
                variant="outline" 
                className={`px-6 bg-transparent border-border hover:bg-muted font-mono ${
                  liked ? 'text-destructive border-destructive/50' : 'text-foreground hover:border-primary'
                }`}
              >
                <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current text-destructive' : ''}`} />
                {liked ? 'LIKED' : 'LIKE'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
