
import { PromptCard } from "@/components/PromptCard";
import { BlankPromptCard } from "@/components/BlankPromptCard";
import { usePrompts } from "@/hooks/usePrompts";
import { Terminal, Database, AlertTriangle } from "lucide-react";

interface FeaturedPromptsProps {
  selectedCategory: string;
  searchQuery: string;
  limitCards?: number;
}

export const FeaturedPrompts = ({ selectedCategory, searchQuery, limitCards }: FeaturedPromptsProps) => {
  const { data: prompts, isLoading, error } = usePrompts();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <Terminal className="h-16 w-16 text-green-400 mx-auto mb-4 animate-spin" />
          <p className="text-green-400 font-mono text-lg">{">"} LOADING DATABASE...</p>
          <p className="text-green-500/60 font-mono text-sm mt-2">{">"} ACCESSING PROMPT_ENTRIES.db</p>
          <div className="flex justify-center mt-4">
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 animate-pulse rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4 animate-pulse" />
          <p className="text-red-400 font-mono text-lg">{">"} DATABASE_CONNECTION_ERROR</p>
          <p className="text-red-500/60 font-mono text-sm mt-2">{">"} FAILED TO LOAD PROMPT_ENTRIES</p>
          <p className="text-green-500/60 font-mono text-xs mt-4">{">"} TRY: sudo systemctl restart prompthub</p>
        </div>
      </div>
    );
  }

  const filteredPrompts = prompts?.filter((prompt) => {
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  }) || [];

  // Apply limit if specified
  const displayPrompts = limitCards ? filteredPrompts.slice(0, limitCards - 1) : filteredPrompts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Database className="h-8 w-8 text-green-400 mr-3 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono tracking-wider">
            {">"} FEATURED_PROMPTS.db
          </h2>
        </div>
        
        <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4 max-w-2xl mx-auto mb-8">
          <p className="text-green-300/80 font-mono text-sm">
            {"// "} HAND-PICKED PROMPT ENTRIES FOR MAXIMUM EFFICIENCY
            <br />
            {"// "} OPTIMIZED FOR VARIOUS AI MODEL INTERACTIONS
            {limitCards && (
              <>
                <br />
                {"// "} TRIAL_MODE: SHOWING {limitCards} OF {filteredPrompts.length + 1} ENTRIES
              </>
            )}
          </p>
        </div>
        
        <div className="mt-6 font-mono text-xs text-green-500/60">
          <p>{">"} TOTAL_ENTRIES: {limitCards ? `${limitCards}/${filteredPrompts.length + 1}` : filteredPrompts.length + 1}</p>
          <p>{">"} CATEGORY_FILTER: {selectedCategory.toUpperCase()}</p>
          {limitCards && <p>{">"} ACCESS_MODE: TRIAL_LIMITED</p>}
        </div>
      </div>

      {displayPrompts.length === 0 && !limitCards ? (
        <div className="text-center py-12">
          <div className="bg-gray-900/50 border-2 border-green-500/30 rounded-lg p-8 max-w-md mx-auto">
            <Terminal className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-mono text-green-300 mb-2">{">"} NO_ENTRIES_FOUND</h3>
            <p className="text-green-500/60 font-mono text-sm">{">"} SEARCH_QUERY_RETURNED_EMPTY</p>
            <p className="text-green-500/60 font-mono text-sm mt-2">{">"} TRY: MODIFY SEARCH PARAMETERS</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Always show the blank prompt card first */}
          <BlankPromptCard />
          
          {/* Then show the existing prompts */}
          {displayPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
};
