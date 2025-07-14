import { usePrompts } from "@/hooks/usePrompts";
import { PromptCard } from "./PromptCard";
import { BlankPromptCard } from "./BlankPromptCard";
import { Button } from "./ui/button";
import { ChevronRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
interface FeaturedPromptsProps {
  selectedCategory: string;
  searchQuery: string;
  limitCards?: number;
  requireSubscription?: boolean;
}
export const FeaturedPrompts = ({
  selectedCategory,
  searchQuery,
  limitCards,
  requireSubscription = false
}: FeaturedPromptsProps) => {
  const {
    data: prompts,
    isLoading,
    error
  } = usePrompts();
  const handleCreatePromptClick = () => {
    if (requireSubscription) {
      toast({
        title: ">>> SUBSCRIPTION_REQUIRED",
        description: "Please subscribe with a Gmail account to create prompts",
        variant: "destructive"
      });
      return;
    }
  };
  if (isLoading) {
    return <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({
            length: 8
          }).map((_, i) => <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>)}
          </div>
        </div>
      </section>;
  }
  if (error) {
    return <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-destructive">Failed to load prompts. Please try again.</p>
        </div>
      </section>;
  }
  if (!prompts) {
    return null;
  }
  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesSearch = !searchQuery || prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) || prompt.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  const displayPrompts = limitCards ? filteredPrompts.slice(0, limitCards) : filteredPrompts;
  return <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Featured Prompts</h2>
          {limitCards && filteredPrompts.length > limitCards && <Button asChild variant="outline" className="border-border hover:bg-muted">
              
            </Button>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {requireSubscription ? <div onClick={handleCreatePromptClick} className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-muted-foreground/50 transition-colors cursor-pointer bg-muted/20">
              <Lock className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="font-semibold text-muted-foreground mb-1">Subscribe Required</h3>
              <p className="text-sm text-muted-foreground">Subscribe with Gmail to create prompts</p>
            </div> : <BlankPromptCard />}
          
          {displayPrompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt} />)}
        </div>
        
        {displayPrompts.length === 0 && <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No prompts found matching your criteria.</p>
            {!requireSubscription && <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or category filter.</p>}
          </div>}
      </div>
    </section>;
};