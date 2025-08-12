import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { UseCase } from '@/data/useCases';
import { formatCompactNumber } from '@/lib/utils';
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
  Search,
  Rocket,
  MessageSquare,
  ChevronDown
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
  const [pendingProvider, setPendingProvider] = useState<null | 'claude' | 'cursor' | 'copy'>(null);
  const { toast } = useToast();

  if (!useCase) return null;

  const IconComponent = iconMap[useCase.icon as keyof typeof iconMap] || Code;

  const handleCopyPrompt = () => {
    setPendingProvider('copy');
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

  const copyPromptSilently = async () => {
    try {
      await navigator.clipboard.writeText(useCase.prompt);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please copy manually.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const openProvider = async (url: string, providerKey: string, message: string) => {
    try {
      await copyPromptSilently();
      localStorage.setItem('preferredPromptProvider', providerKey);
      window.open(url, '_blank', 'noopener,noreferrer');
      toast({
        title: message,
        description: 'Prompt copied — paste to start.',
      });
    } catch {}
  };

  const openInDC = () => openProvider('https://desktopcommander.app', 'dc', 'Opening Desktop Commander');
  const openInClaude = () => setPendingProvider('claude');
  const openInCursor = () => setPendingProvider('cursor');

  const continueWithProvider = async () => {
    if (pendingProvider === 'claude') {
      await openProvider('https://claude.ai/new', 'claude', 'Opening Claude');
    } else if (pendingProvider === 'cursor') {
      await openProvider('https://www.cursor.com/', 'cursor', 'Opening Cursor');
    } else if (pendingProvider === 'copy') {
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
    }
    setPendingProvider(null);
  };

  const handleInstallMCP = () => {
    window.open('https://desktopcommander.app/', '_blank', 'noopener,noreferrer');
    setPendingProvider(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 pr-12">
            <div className="p-3 bg-dc-surface-elevated rounded-lg">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl leading-tight mb-3">{useCase.title}</DialogTitle>
              <DialogDescription className="sr-only">Detailed information and actions for this use case.</DialogDescription>
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
                  <span>Added {new Date(useCase.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <Rocket className="h-4 w-4 text-primary" />
              <span>used {formatCompactNumber(useCase.votes + (hasVoted ? 1 : 0))} times</span>
            </Badge>
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
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Complete Prompt</h3>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="dc-button-primary flex items-center gap-2">
                  Use Prompt
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="z-50 bg-popover border rounded-md p-1 w-72 shadow-lg">
                <DropdownMenuItem disabled className="flex items-center gap-3 rounded-md cursor-not-allowed">
                  <Rocket className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm flex-1">Open in Desktop Commander App</span>
                  <button
                    type="button"
                    className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://desktopcommander.app/', '_blank', 'noopener,noreferrer');
                    }}
                  >
                    Coming soon
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openInClaude} className="flex items-center gap-3 rounded-md cursor-pointer">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Open in Claude</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openInCursor} className="flex items-center gap-3 rounded-md cursor-pointer">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Open in Cursor</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyPrompt} className="flex items-center gap-3 rounded-md cursor-pointer">
                  <Copy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Copy Prompt</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </DialogContent>

      <AlertDialog open={!!pendingProvider} onOpenChange={(open) => { if (!open) setPendingProvider(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingProvider === 'claude' ? 'Open in Claude' : pendingProvider === 'cursor' ? 'Open in Cursor' : 'Copy Prompt'}</AlertDialogTitle>
            <AlertDialogDescription>
              For this prompt to work, you need to install Desktop Commander MCP.
              <div className="mt-3 text-foreground">
                <strong>Why do I need an MCP?</strong>
                <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                  <li>Gives AI controlled access to your local files and apps.</li>
                  <li>Makes prompts reproducible and safer with explicit permissions.</li>
                  <li>Works across tools like Claude and Cursor.</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingProvider(null)}>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={handleInstallMCP}>Install MCP</Button>
            <AlertDialogAction onClick={continueWithProvider}>I have it installed — Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}