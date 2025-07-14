
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Heart, Eye, Copy, Calendar } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export const UserProfileModal = ({ isOpen, onClose, userEmail }: UserProfileModalProps) => {
  const { userProfile, getUserPrompts } = useUserProfile();
  const [userPrompts, setUserPrompts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userEmail) {
      fetchUserPrompts();
    }
  }, [isOpen, userEmail]);

  const fetchUserPrompts = async () => {
    setIsLoading(true);
    const prompts = await getUserPrompts(userEmail);
    setUserPrompts(prompts);
    setIsLoading(false);
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-card border-2 border-border text-foreground overflow-y-auto">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <DialogTitle className="text-xl font-mono text-primary tracking-wider flex items-center">
                <User className="h-5 w-5 mr-2" />
                {"> USER_PROFILE_DASHBOARD"}
              </DialogTitle>
              <div className="text-muted-foreground font-mono text-sm mt-2">
                {"// " + userEmail}
              </div>
            </div>
            <Button
              onClick={() => {
                localStorage.removeItem('user_email');
                localStorage.removeItem('user_subscribed');
                window.location.href = '/try';
              }}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-mono text-sm"
              size="sm"
            >
              UNSUBSCRIBE
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-muted border-border">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-mono text-primary">{userPrompts.length}</div>
                  <div className="text-sm text-muted-foreground font-mono">PROMPTS_CREATED</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted border-border">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-mono text-primary">
                    {userPrompts.reduce((sum, p) => sum + (p.likes || 0), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">TOTAL_LIKES</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted border-border">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-mono text-primary">
                    {userPrompts.reduce((sum, p) => sum + (p.views || 0), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">TOTAL_VIEWS</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Prompts */}
          <div>
            <h3 className="text-lg font-mono text-primary mb-4 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {">"} YOUR_PROMPTS_DATABASE
            </h3>
            
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground font-mono">
                LOADING_USER_DATA...
              </div>
            ) : userPrompts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground font-mono">
                {"// NO_PROMPTS_CREATED_YET"}
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {userPrompts.map((prompt) => (
                  <Card key={prompt.id} className="bg-muted border-border hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-mono text-primary">
                        {"> " + prompt.title?.toUpperCase()}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-mono">
                        {"// " + prompt.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {prompt.tags?.map((tag: string) => (
                          <Badge key={tag} className="text-xs bg-background text-foreground border border-border font-mono">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span>CATEGORY: {prompt.category}</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {getDisplayNumber(prompt.views || 1, 'views')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {getDisplayNumber(prompt.likes || 0, 'likes')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Copy className="h-3 w-3" />
                            {getDisplayNumber(prompt.copies || 0, 'copies')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
