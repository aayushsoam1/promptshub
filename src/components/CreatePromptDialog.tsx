
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Terminal, Code } from "lucide-react";
import { useCreatePrompt } from "@/hooks/usePrompts";

const categories = [
  { id: "writing", name: "Writing", icon: "✍️" },
  { id: "coding", name: "Coding", icon: "💻" },
  { id: "marketing", name: "Marketing", icon: "📈" },
  { id: "design", name: "Design", icon: "🎨" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "education", name: "Education", icon: "📚" },
];

export const CreatePromptDialog = () => {
  const [open, setOpen] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-8 bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 hover:border-green-400 font-mono">
          <Plus className="h-4 w-4 mr-2" />
          {">"} CREATE_NEW_PROMPT
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900/90 border-2 border-green-500/50 text-green-300">
        <DialogHeader>
          <DialogTitle className="text-green-400 font-mono flex items-center">
            <Terminal className="h-5 w-5 mr-2" />
            {">"} NEW_PROMPT_ENTRY
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-green-400 font-mono text-sm">PROMPT_TITLE:</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter prompt title"
              className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-green-400 font-mono text-sm">DESCRIPTION:</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of what this prompt does"
              className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-green-400 font-mono text-sm">PROMPT_CONTENT:</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="The actual prompt text that will be copied"
              className="min-h-[120px] bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-green-400 font-mono text-sm">CATEGORY:</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-green-500/50 text-green-300">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="text-green-300 focus:bg-green-900/50">
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="author" className="text-green-400 font-mono text-sm">AUTHOR_NAME:</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Your name"
              className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
              required
            />
          </div>

          <div>
            <Label className="text-green-400 font-mono text-sm">TAGS:</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono focus:border-green-400"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono">
                ADD
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} className="bg-green-900/50 text-green-300 border border-green-500/30">
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
            <Button type="submit" disabled={createPromptMutation.isPending} className="bg-green-900/50 hover:bg-green-800/50 text-green-300 border border-green-500/50 font-mono">
              <Code className="h-4 w-4 mr-2" />
              {createPromptMutation.isPending ? "CREATING..." : "{"} CREATE {"}"}
            </Button>
            <Button type="button" onClick={() => setOpen(false)} className="bg-gray-800/50 hover:bg-gray-700/50 text-green-400 border border-green-500/30 font-mono">
              CANCEL
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
