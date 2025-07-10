
import { PromptCard } from "@/components/PromptCard";
import { prompts } from "@/data/prompts";

interface FeaturedPromptsProps {
  selectedCategory: string;
  searchQuery: string;
}

export const FeaturedPrompts = ({ selectedCategory, searchQuery }: FeaturedPromptsProps) => {
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Prompts
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hand-picked prompts that deliver exceptional results across various use cases
        </p>
      </div>

      {filteredPrompts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No prompts found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
};
