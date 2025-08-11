import { useState } from 'react';
import { UseCase } from '@/data/useCases';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Heart, 
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

interface UseCaseCardProps {
  useCase: UseCase;
  onVote: (id: string) => void;
  onOpen?: (useCase: UseCase) => void;
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

export function UseCaseCard({ useCase, onVote, onOpen }: UseCaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

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
    <Card className="dc-card h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-dc-surface-elevated rounded-lg">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">{useCase.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={`difficulty-badge ${getDifficultyClass(useCase.difficulty)}`}>
                  {useCase.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground">{useCase.category}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVote}
            disabled={hasVoted}
            className="flex items-center gap-1 min-w-[60px]"
          >
            <Heart className={`h-4 w-4 ${hasVoted ? 'fill-current text-red-500' : ''}`} />
            <span className="text-sm">{useCase.votes + (hasVoted ? 1 : 0)}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="text-sm leading-relaxed mb-4">
          {useCase.description}
        </CardDescription>

        <div className="flex flex-wrap gap-1 mb-4">
          {useCase.targetRoles.map((role) => (
            <Badge key={role} variant="secondary" className="role-tag text-xs">
              {role}
            </Badge>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Prompt
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                View Prompt
              </>
            )}
          </Button>

          {isExpanded && (
            <div className="space-y-3">
              <div className="p-3 bg-dc-surface-elevated rounded-lg border">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {useCase.prompt}
                </pre>
              </div>
              <Button
                onClick={handleCopyPrompt}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Copy className="h-4 w-4" />
                Copy Prompt
              </Button>
            </div>
          )}

          <Button className="w-full dc-button-primary" onClick={() => onOpen?.(useCase)}>
            Try This Use Case
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}