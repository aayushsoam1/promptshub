
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: "all", name: "ALL_PROMPTS", icon: "🎯" },
  { id: "writing", name: "WRITING", icon: "✍️" },
  { id: "coding", name: "CODING", icon: "💻" },
  { id: "marketing", name: "MARKETING", icon: "📈" },
  { id: "design", name: "DESIGN", icon: "🎨" },
  { id: "business", name: "BUSINESS", icon: "💼" },
  { id: "education", name: "EDUCATION", icon: "📚" },
];

export const CategoryFilter = ({ selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 border-b border-green-500/20">
      <div className="text-center mb-6">
        <p className="text-green-400 font-mono text-sm">{">"} SELECT_CATEGORY.exe</p>
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mt-2"></div>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 font-mono text-sm border-2 transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-green-900/50 border-green-400 text-green-300 shadow-lg shadow-green-500/20 scale-105"
                : "bg-gray-900/50 border-green-500/30 text-green-400 hover:bg-green-900/30 hover:border-green-400/50 hover:scale-105"
            }`}
          >
            <span className="mr-2 text-base">{category.icon}</span>
            {">"} {category.name}
          </Button>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-green-500/60 font-mono text-xs">
          {">"} FILTER_STATUS: {selectedCategory.toUpperCase()}_SELECTED
        </p>
      </div>
    </div>
  );
};
