
import { Search, Terminal, Zap, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePromptCount } from "@/hooks/usePrompts";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Hero = ({ searchQuery, setSearchQuery }: HeroProps) => {
  const { data: totalPrompts, isLoading: isCountLoading } = usePromptCount();
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background border-b border-border">
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Terminal className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-5xl md:text-7xl font-bold font-mono text-primary tracking-wider">
              PROMPT_HUB
            </h1>
            <Zap className="h-8 w-8 text-primary ml-3" />
          </div>
          
          <div className="mb-4 font-mono text-muted-foreground">
            <p className="text-sm">SYSTEM STATUS: ONLINE</p>
            <p className="text-sm">ACCESS LEVEL: GRANTED</p>
            <p className="text-sm">CONNECTION: SECURE</p>
          </div>
          
          <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto font-mono">
            {"// "} ACCESSING AI PROMPT DATABASE...
            <br />
            {"// "} DISCOVER, SHARE, AND MASTER PROMPTING TECHNIQUES
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="bg-card border-2 border-border rounded-lg p-1 shadow-lg">
              <div className="flex items-center">
                <Terminal className="text-primary h-5 w-5 ml-3 mr-2" />
                <span className="text-primary font-mono text-sm mr-2">root@prompthub:~$</span>
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="search --prompts --all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-0 text-foreground placeholder-muted-foreground font-mono focus:ring-0 focus:outline-none"
                  />
                </div>
                <Search className="text-primary h-5 w-5 mr-3" />
              </div>
            </div>
            
            {/* Total Prompt Count Display */}
            <div className="mt-4 flex items-center justify-center gap-2 text-primary font-mono text-sm">
              <Database className="h-4 w-4" />
              <span>TOTAL_PROMPTS: </span>
              <span className="text-foreground font-bold">
                {isCountLoading ? "LOADING..." : `${totalPrompts || 0}`}
              </span>
            </div>
          </div>
          
          <div className="mt-6 font-mono text-xs text-muted-foreground">
            <p>{">"} ENTER SEARCH QUERY TO ACCESS DATABASE</p>
            <p>{">"} TYPE 'help' FOR COMMAND LIST</p>
          </div>
        </div>
      </div>
    </div>
  );
};
