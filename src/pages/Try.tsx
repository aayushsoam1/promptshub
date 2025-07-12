
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedPrompts } from "@/components/FeaturedPrompts";

const Try = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix rain background effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="text-green-500 text-xs font-mono leading-3 break-all animate-pulse">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i} className="float-left w-4">
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none animate-pulse"></div>
      
      <div className="relative z-10">
        {/* Trial Mode Banner */}
        <div className="bg-green-900/20 border-b border-green-500/30 py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-green-400 font-mono text-sm">
              {">"} TRIAL_MODE - LIMITED_PREVIEW (8 prompts only)
            </p>
          </div>
        </div>

        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <FeaturedPrompts 
          selectedCategory={selectedCategory} 
          searchQuery={searchQuery}
          limitCards={8}
        />
      </div>
    </div>
  );
};

export default Try;
