
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, Terminal } from "lucide-react";
import { useCreatePrompt } from "@/hooks/usePrompts";
import { toast } from "@/hooks/use-toast";

const categories = [
  { id: "writing", name: "Writing", icon: "✍️" },
  { id: "coding", name: "Coding", icon: "💻" },
  { id: "marketing", name: "Marketing", icon: "📈" },
  { id: "design", name: "Design", icon: "🎨" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "education", name: "Education", icon: "📚" },
];

export const BlankPromptCard = () => {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.content || !formData.category || !formData.author) {
      toast({
        title: ">>> VALIDATION_ERROR",
        description: "All fields are required to create prompt",
        variant: "destructive",
      });
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
    setIsEditing(false);
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

  if (!isEditing) {
    return (
      <Card className="group h-full bg-black border-2 border-green-500/30 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:border-green-400/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative cursor-pointer"
            onClick={() => setIsEditing(true)}>
        {/* Matrix-like background effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="text-green-500 text-xs font-mono leading-3 break-all">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="animate-pulse">
                {Math.random().toString(36).substring(2, 15)}
              </div>
            ))}
          </div>
        </div>
        
        <CardContent className="flex flex-col items-center justify-center h-full p-8 relative z-10">
          <div className="bg-gray-900/80 rounded-full p-6 mb-4 border border-green-500/30 backdrop-blur-sm">
            <Plus className="h-12 w-12 text-green-400 animate-pulse" />
          </div>
          
          <h3 className="font-bold text-lg text-green-400 mb-2 group-hover:text-green-300 transition-colors font-mono tracking-wider text-center">
            {"> CREATE_NEW_PROMPT"}
          </h3>
          
          <p className="text-green-300/80 text-sm font-mono text-center">
            {"// CLICK TO ADD YOUR PROMPT"}
          </p>
          
          <div className="mt-4 flex items-center text-xs text-green-500/70 font-mono">
            <Terminal className="h-3 w-3 mr-1" />
            INITIALIZE_PROMPT.exe
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-black border-2 border-green-500/50 shadow-lg shadow-green-500/30 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5">
        <div className="text-green-500 text-xs font-mono leading-3 break-all">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="animate-pulse">
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>
      </div>
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-green-400 font-mono tracking-wider">
            {"> NEW_PROMPT_ENTRY"}
          </h3>
          <Button
            onClick={() => setIsEditing(false)}
            variant="outline"
            size="sm"
            className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-900/30"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="py-3 relative z-10 space-y-3">
        <div>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="PROMPT_TITLE..."
            className="bg-gray-900/50 border-green-500/30 text-green-300 placeholder:text-green-500/50 font-mono text-sm"
          />
        </div>

        <div>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="DESCRIPTION..."
            className="bg-gray-900/50 border-green-500/30 text-green-300 placeholder:text-green-500/50 font-mono text-sm min-h-[60px]"
          />
        </div>

        <div>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="PROMPT_CONTENT..."
            className="bg-gray-900/50 border-green-500/30 text-green-300 placeholder:text-green-500/50 font-mono text-sm min-h-[80px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="bg-gray-900/50 border-green-500/30 text-green-300 font-mono text-sm">
              <SelectValue placeholder="CATEGORY" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-green-500/30">
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id} className="text-green-300 font-mono">
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="AUTHOR_NAME..."
            className="bg-gray-900/50 border-green-500/30 text-green-300 placeholder:text-green-500/50 font-mono text-sm"
          />
        </div>

        <div>
          <div className="flex gap-2 mb-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="ADD_TAG..."
              className="bg-gray-900/50 border-green-500/30 text-green-300 placeholder:text-green-500/50 font-mono text-sm"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <Button
              type="button"
              onClick={addTag}
              variant="outline"
              size="sm"
              className="bg-transparent border-green-500/50 text-green-400 hover:bg-green-900/30 font-mono"
            >
              +
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} className="text-xs bg-green-900/50 text-green-400 border border-green-500/30 font-mono">
                #{tag}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 relative z-10">
        <Button
          onClick={handleSave}
          disabled={createPromptMutation.isPending}
          className="w-full bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 hover:border-green-400 font-mono"
        >
          <Save className="h-4 w-4 mr-2" />
          {createPromptMutation.isPending ? "SAVING..." : "SAVE_PROMPT"}
        </Button>
      </CardFooter>
    </Card>
  );
};
