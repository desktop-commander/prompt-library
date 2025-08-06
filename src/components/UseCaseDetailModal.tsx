import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UseCase } from '@/data/useCases';
import { 
  Copy, 
  Heart, 
  Calendar,
  User,
  FolderSearch,
  FolderOpen,
  Code,
  BarChart3,
  Settings,
  FileText,
  Archive,
  Shield,
  Database,
  TestTube,
  Clock,
  RefreshCw,
  ArrowRightLeft,
  Activity,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UseCaseDetailModalProps {
  useCase: UseCase | null;
  isOpen: boolean;
  onClose: () => void;
  onVote: (id: string) => void;
}

const iconMap = {
  FolderSearch,
  FolderOrganize: FolderOpen,
  Code,
  BarChart3,
  Settings,
  FileText,
  Archive,
  Shield,
  Database,
  TestTube,
  Clock,
  RefreshCw,
  ArrowRightLeft,
  Activity,
  Search
};

export function UseCaseDetailModal({ useCase, isOpen, onClose, onVote }: UseCaseDetailModalProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  if (!useCase) return null;

  const IconComponent = iconMap[useCase.icon as keyof typeof iconMap] || Code;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(useCase.prompt);
      toast({
        title: "Copied to clipboard!",
        description: "The use case prompt has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleVote = () => {
    if (!hasVoted) {
      onVote(useCase.id);
      setHasVoted(true);
      toast({
        title: "Vote recorded!",
        description: "Thank you for voting on this use case.",
      });
    }
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Simple':
        return 'difficulty-simple';
      case 'Medium':
        return 'difficulty-medium';
      case 'Complex':
        return 'difficulty-complex';
      default:
        return 'difficulty-simple';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-dc-surface-elevated rounded-lg">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl leading-tight mb-3">{useCase.title}</DialogTitle>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={`difficulty-badge ${getDifficultyClass(useCase.difficulty)}`}>
                  {useCase.difficulty}
                </Badge>
                <Badge variant="outline">{useCase.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {useCase.author}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(useCase.dateAdded).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={handleVote}
              disabled={hasVoted}
              className="flex items-center gap-2"
            >
              <Heart className={`h-5 w-5 ${hasVoted ? 'fill-current text-red-500' : ''}`} />
              <span>{useCase.votes + (hasVoted ? 1 : 0)}</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Target Roles</h3>
            <div className="flex flex-wrap gap-2">
              {useCase.targetRoles.map((role) => (
                <Badge key={role} variant="secondary" className="role-tag">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {useCase.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Complete Prompt</h3>
              <Button onClick={handleCopyPrompt} className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copy Prompt
              </Button>
            </div>
            <div className="p-4 bg-dc-surface-elevated rounded-lg border">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {useCase.prompt}
              </pre>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="dc-button-primary">
              Try This Use Case
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}