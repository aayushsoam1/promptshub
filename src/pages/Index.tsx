
import { Hero } from "@/components/Hero";
import { FeaturedPrompts } from "@/components/FeaturedPrompts";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Terminal, Mail, Zap, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserProfileModal } from "@/components/UserProfileModal";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const { userProfile, getOrCreateProfile } = useUserProfile();

  const currentUserEmail = localStorage.getItem('user_email');

  return (
    <div className="min-h-screen bg-background">
      {/* User Profile Modal */}
      {currentUserEmail && (
        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userEmail={currentUserEmail}
        />
      )}

      {/* Header Controls */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        {currentUserEmail && (
          <Button
            onClick={() => setShowProfileModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border border-border font-mono"
          >
            <User className="h-4 w-4 mr-2" />
            PROFILE
          </Button>
        )}
      </div>

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
