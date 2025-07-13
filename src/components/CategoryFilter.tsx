
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
  { id: "science", name: "SCIENCE_&_INNOVATION", icon: "🧪" },
  { id: "finance", name: "FINANCE_&_ECONOMY", icon: "📊" },
  { id: "career", name: "CAREER_&_JOBS", icon: "🎓" },
  { id: "lifestyle", name: "LIFESTYLE_&_HOME", icon: "🏠" },
  { id: "food", name: "FOOD_&_RECIPES", icon: "🍳" },
  { id: "pets", name: "PETS_&_ANIMALS", icon: "🐾" },
  { id: "entertainment", name: "ARTS_&_ENTERTAINMENT", icon: "🎵" },
  { id: "history", name: "HISTORY_&_CULTURE", icon: "🗺️" },
  { id: "apps", name: "APPS_&_TOOLS", icon: "📱" },
  { id: "mindfulness", name: "MINDFULNESS_&_SPIRITUALITY", icon: "🧘" },
  { id: "technology", name: "TECHNOLOGY_&_AI", icon: "🌐" },
  { id: "games", name: "GAMES_&_FUN", icon: "🎮" },
  { id: "psychology", name: "PSYCHOLOGY_&_SELF-HELP", icon: "🧠" },
  { id: "health", name: "HEALTH_&_FITNESS", icon: "🩺" },
  { id: "graphics", name: "IMAGE_&_GRAPHICS", icon: "🖼️" },
  { id: "video", name: "VIDEO_&_ANIMATION", icon: "🎬" },
  { id: "audio", name: "AUDIO_&_PODCASTING", icon: "🎙️" },
  { id: "content", name: "CONTENT_CREATION", icon: "✨" },
  { id: "photography", name: "PHOTOGRAPHY", icon: "📷" },
  { id: "videography", name: "VIDEOGRAPHY", icon: "📹" },
  { id: "script", name: "SCRIPT_&_STORYBOARDING", icon: "📄" },
  { id: "voice", name: "VOICE_&_DUBBING", icon: "🎭" },
  { id: "digital-art", name: "DIGITAL_ART", icon: "🎨" },
  { id: "tools", name: "CREATOR_TOOLS_&_RESOURCES", icon: "🧰" },
  { id: "ai-tools", name: "AI_TOOLS_FOR_CREATORS", icon: "🤖" },
  { id: "publishing", name: "PUBLISHING_&_DISTRIBUTION", icon: "📤" },
  { id: "copywriting", name: "COPYWRITING_FOR_CREATORS", icon: "📝" },
  { id: "analytics", name: "ANALYTICS_&_MONETIZATION", icon: "📈" },
  { id: "targeting", name: "NICHE_AUDIENCE_TARGETING", icon: "🎯" },
];

export const CategoryFilter = ({ selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 border-b border-border">
      <div className="text-center mb-6">
        <p className="text-foreground font-mono text-sm">{">"} SELECT_CATEGORY.exe</p>
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-2"></div>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center max-h-96 overflow-y-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 font-mono text-xs border-2 transition-all duration-300 whitespace-nowrap ${
              selectedCategory === category.id
                ? "bg-foreground text-background border-foreground shadow-lg scale-105"
                : "bg-background text-foreground border-border hover:border-foreground hover:scale-105"
            }`}
          >
            <span className="mr-2 text-sm">{category.icon}</span>
            {">"} {category.name}
          </Button>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-muted-foreground font-mono text-xs">
          {">"} FILTER_STATUS: {selectedCategory.toUpperCase()}_SELECTED
        </p>
      </div>
    </div>
  );
};
