import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { categories, roles, difficulties } from '@/data/useCases';
import { useToast } from '@/hooks/use-toast';

interface SubmitUseCaseModalProps {
  onSubmit: (useCase: any) => void;
}

export function SubmitUseCaseModal({ onSubmit }: SubmitUseCaseModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    nickname: '',
    email: '',
    description: '',
    prompt: '',
    difficulty: '',
    category: '',
    targetRoles: [] as string[],
    tags: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    if (
      !formData.title ||
      !formData.nickname ||
      !formData.email ||
      !emailValid ||
      !formData.description ||
      !formData.prompt ||
      !formData.difficulty ||
      !formData.category
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with a valid email address.",
        variant: "destructive",
      });
      return;
    }

    const newUseCase = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      prompt: formData.prompt,
      difficulty: formData.difficulty as 'Simple' | 'Medium' | 'Complex',
      targetRoles: formData.targetRoles.length > 0 ? formData.targetRoles : ['Everyone'],
      category: formData.category,
      votes: 0,
      icon: 'Code',
      author: formData.nickname,
      contactEmail: formData.email,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    onSubmit(newUseCase);
    setOpen(false);
    setFormData({
      title: '',
      nickname: '',
      email: '',
      description: '',
      prompt: '',
      difficulty: '',
      category: '',
      targetRoles: [],
      tags: ''
    });

    toast({
      title: "🎉 Use Case Submitted!",
      description: "You'll get an email once your use case is published to the library!",
    });
  };

  const handleRoleToggle = (role: string) => {
    if (role === 'All Roles') return;
    
    setFormData(prev => ({
      ...prev,
      targetRoles: prev.targetRoles.includes(role)
        ? prev.targetRoles.filter(r => r !== role)
        : [...prev.targetRoles, role]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="dc-button-primary">
          <Plus className="h-4 w-4 mr-2" />
          Submit Use Case
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit a New Use Case</DialogTitle>
          <DialogDescription>
            Share your Desktop Commander use case with the community. Help others discover new ways to use AI assistance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Explore and Understand New Repository"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">Your nickname *</Label>
              <Input
                id="nickname"
                value={formData.nickname}
                onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                placeholder="e.g., dev_jane"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of what this use case accomplishes..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(cat => cat !== 'All Categories').map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty *</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.filter(diff => diff !== 'All Difficulties').map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Target Roles</Label>
            <div className="flex flex-wrap gap-2">
              {roles.filter(role => role !== 'All Roles').map((role) => (
                <Button
                  key={role}
                  type="button"
                  variant={formData.targetRoles.includes(role) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRoleToggle(role)}
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Full Prompt *</Label>
            <Textarea
              id="prompt"
              value={formData.prompt}
              onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
              placeholder="The complete prompt that users can copy and use with Desktop Commander..."
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="e.g., repository, code-analysis, documentation"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="dc-button-primary">
              Submit Use Case
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}