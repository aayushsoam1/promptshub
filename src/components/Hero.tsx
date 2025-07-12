
import { Search, Terminal, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Hero = ({ searchQuery, setSearchQuery }: HeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black border-b-2 border-green-500/30">
      {/* Terminal grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-10 h-full w-full">
          {Array.from({ length: 200 }, (_, i) => (
            <div key={i} className="border border-green-500/20"></div>
          ))}
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Terminal className="h-12 w-12 text-green-400 mr-3 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold font-mono text-green-400 tracking-wider">
              {">"} PROMPT_HUB
            </h1>
            <Zap className="h-8 w-8 text-green-400 ml-3 animate-bounce" />
          </div>
          
          <div className="mb-4 font-mono text-green-300/80">
            <p className="text-sm">SYSTEM STATUS: ONLINE</p>
            <p className="text-sm">ACCESS LEVEL: GRANTED</p>
            <p className="text-sm">CONNECTION: SECURE</p>
          </div>
          
          <p className="text-xl md:text-2xl text-green-300 mb-8 max-w-3xl mx-auto font-mono">
            {"// "} ACCESSING AI PROMPT DATABASE...
            <br />
            {"// "} DISCOVER, SHARE, AND MASTER PROMPTING TECHNIQUES
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="bg-gray-900/80 border-2 border-green-500/50 rounded-lg p-1 backdrop-blur-sm">
              <div className="flex items-center">
                <Terminal className="text-green-400 h-5 w-5 ml-3 mr-2" />
                <span className="text-green-400 font-mono text-sm mr-2">root@prompthub:~$</span>
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="search --prompts --all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-0 text-green-300 placeholder-green-500/50 font-mono focus:ring-0 focus:outline-none"
                  />
                </div>
                <Search className="text-green-400 h-5 w-5 mr-3 animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 font-mono text-xs text-green-500/70">
            <p>{">"} ENTER SEARCH QUERY TO ACCESS DATABASE</p>
            <p>{">"} TYPE 'help' FOR COMMAND LIST</p>
          </div>
        </div>
      </div>
    </div>
  );
};
