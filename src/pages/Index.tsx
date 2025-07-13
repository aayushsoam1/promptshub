
import { Hero } from "@/components/Hero";
import { FeaturedPrompts } from "@/components/FeaturedPrompts";
import { CategoryFilter } from "@/components/CategoryFilter";
import { UserProfileModal } from "@/components/UserProfileModal";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const currentUserEmail = localStorage.getItem('user_email');

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* Header with Profile Button */}
        <div className="flex justify-between items-center p-4">
          <div className="flex-1">
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          {currentUserEmail && (
            <Button
              variant="outline"
              onClick={() => setShowProfileModal(true)}
              className="ml-4"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          )}
        </div>
        
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <FeaturedPrompts 
          selectedCategory={selectedCategory} 
          searchQuery={searchQuery} 
        />
        
        {/* Profile Modal */}
        {currentUserEmail && (
          <UserProfileModal 
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            userEmail={currentUserEmail}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
