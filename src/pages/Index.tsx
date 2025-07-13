
import { Hero } from "@/components/Hero";
import { FeaturedPrompts } from "@/components/FeaturedPrompts";
import { CategoryFilter } from "@/components/CategoryFilter";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <FeaturedPrompts 
          selectedCategory={selectedCategory} 
          searchQuery={searchQuery} 
        />
      </div>
    </div>
  );
};

export default Index;
