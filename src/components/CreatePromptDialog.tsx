import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Search, Lock } from "lucide-react";
import { useCreatePrompt } from "@/hooks/usePrompts";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

const categories = [
  { id: "writing", name: "Writing", icon: "✍️" },
  { id: "coding", name: "Coding", icon: "💻" },
  { id: "marketing", name: "Marketing", icon: "📈" },
  { id: "design", name: "Design", icon: "🎨" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "education", name: "Education", icon: "📚" },
  { id: "science", name: "Science & Innovation", icon: "🧪" },
  { id: "finance", name: "Finance & Economy", icon: "📊" },
  { id: "career", name: "Career & Jobs", icon: "🎓" },
  { id: "lifestyle", name: "Lifestyle & Home", icon: "🏠" },
  { id: "food", name: "Food & Recipes", icon: "🍳" },
  { id: "pets", name: "Pets & Animals", icon: "🐾" },
  { id: "entertainment", name: "Arts & Entertainment", icon: "🎵" },
  { id: "history", name: "History & Culture", icon: "🗺️" },
  { id: "apps", name: "Apps & Tools", icon: "📱" },
  { id: "mindfulness", name: "Mindfulness & Spirituality", icon: "🧘" },
  { id: "technology", name: "Technology & AI", icon: "🌐" },
  { id: "games", name: "Games & Fun", icon: "🎮" },
  { id: "psychology", name: "Psychology & Self-help", icon: "🧠" },
  { id: "health", name: "Health & Fitness", icon: "🩺" },
  { id: "graphics", name: "Image & Graphics", icon: "🖼️" },
  { id: "video", name: "Video & Animation", icon: "🎬" },
  { id: "audio", name: "Audio & Podcasting", icon: "🎙️" },
  { id: "content", name: "Content Creation", icon: "✨" },
  { id: "photography", name: "Photography", icon: "📷" },
  { id: "videography", name: "Videography", icon: "📹" },
  { id: "script", name: "Script & Storyboarding", icon: "📄" },
  { id: "voice", name: "Voice & Dubbing", icon: "🎭" },
  { id: "digital-art", name: "Digital Art", icon: "🎨" },
  { id: "tools", name: "Creator Tools & Resources", icon: "🧰" },
  { id: "ai-tools", name: "AI Tools for Creators", icon: "🤖" },
  { id: "publishing", name: "Publishing & Distribution", icon: "📤" },
  { id: "copywriting", name: "Copywriting for Creators", icon: "📝" },
  { id: "analytics", name: "Analytics & Monetization", icon: "📈" },
  { id: "targeting", name: "Niche Audience Targeting", icon: "🎯" },
];

export const CreatePromptDialog = () => {
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    author: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const createPromptMutation = useCreatePrompt();
  const currentUserEmail = localStorage.getItem('user_email');

  const handleDialogOpen = (isOpen: boolean) => {
    if (isOpen && !currentUserEmail) {
      toast({
        title: ">>> SUBSCRIPTION_REQUIRED",
        description: "Please subscribe with a Gmail account to create prompts",
        variant: "destructive",
      });
      return;
    }
    setOpen(isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUserEmail) {
      toast({
        title: ">>> SUBSCRIPTION_REQUIRED",
        description: "Please subscribe with a Gmail account to create prompts",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.title || !formData.description || !formData.content || !formData.category || !formData.author) {
      return;
    }

    createPromptMutation.mutate({
      ...formData,
      tags,
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      content: "",
      category: "",
      author: "",
    });
    setTags([]);
    setOpen(false);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  if (!currentUserEmail) {
    return (
      <Button 
        onClick={() => handleDialogOpen(true)}
        className="mb-8 bg-muted text-muted-foreground cursor-not-allowed"
        disabled
      >
        <Lock className="h-4 w-4 mr-2" />
        Subscribe to Create Prompts
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Prompt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter prompt title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of what this prompt does"
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Prompt Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="The actual prompt text that will be copied"
              className="min-h-[120px]"
              required
            />
          </div>

          <div>
            <Label>Category</Label>
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryOpen}
                  className="w-full justify-between"
                >
                  {selectedCategory ? (
                    <span>{selectedCategory.icon} {selectedCategory.name}</span>
                  ) : (
                    "Select category..."
                  )}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            setFormData({ ...formData, category: category.id });
                            setCategoryOpen(false);
                          }}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-700">
                  {tag}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={createPromptMutation.isPending}>
              {createPromptMutation.isPending ? "Creating..." : "Create Prompt"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
