
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, Eye, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIncrementInteraction } from "@/hooks/usePrompts";

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
        title: "Copied to clipboard!",
        description: "The prompt has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually.",
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
        title: "Added to favorites",
        description: "Prompt added to your favorites",
      });
    }
  };

  return (
    <Card className="group h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              {prompt.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {prompt.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-700 line-clamp-3 font-mono">
            {prompt.content}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>by {prompt.author}</span>
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

      <CardFooter className="pt-3">
        <div className="flex gap-2 w-full">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex-1 group-hover:border-purple-300"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            onClick={handleLike}
            variant="outline"
            size="sm"
            className={`px-3 ${liked ? 'text-red-500 border-red-200' : ''}`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
