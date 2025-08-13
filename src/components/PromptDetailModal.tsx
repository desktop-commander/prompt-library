import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UseCase } from '@/data/useCases';
import { formatCompactNumber } from '@/lib/utils';
import { 
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
  Share2,
  Info,
  BadgeCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { EngagementMeter } from '@/components/EngagementMeter';
import { UsePromptWizard } from '@/components/UsePromptWizard';

interface PromptDetailModalProps {
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

export function PromptDetailModal({ useCase, isOpen, onClose, onVote }: PromptDetailModalProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { toast } = useToast();
  const [exactUses, setExactUses] = useState(0);

  useEffect(() => {
    if (!useCase) return;
    const key = `useCase_uses_${useCase.id}`;
    const raw = localStorage.getItem(key);
    const value = raw ? Number(raw) : 0;
    setExactUses(Number.isFinite(value) ? value : 0);
  }, [useCase?.id]);


  const incrementUses = () => {
    if (!useCase) return;
    const key = `useCase_uses_${useCase.id}`;
    setExactUses((prev) => {
      const next = prev + 1;
      localStorage.setItem(key, String(next));
      return next;
    });
  };

  if (!useCase) return null;

  const IconComponent = iconMap[useCase.icon as keyof typeof iconMap] || Code;

  const handleUsePrompt = () => {
    setShowWizard(true);
    incrementUses();
  };

  const handleVote = () => {
    if (!hasVoted) {
      onVote(useCase.id);
      setHasVoted(true);
      toast({
        title: "Vote recorded!",
        description: "Thank you for voting on this prompt.",
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

  const getShareUrl = () => {
    const url = new URL('/use-cases', window.location.origin);
    url.searchParams.set('i', useCase.id);
    return url.toString();
  };

  const handleShare = async () => {
    const shareUrl = getShareUrl();
    const title = `Prompt: ${useCase.title}`;
    const isMobile =
      typeof navigator !== 'undefined' &&
      (/(Mobi|Android|iPhone|iPad|iPod)/i.test(navigator.userAgent) ||
        (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches));

    try {
      // Mobile: use native share sheet when available
      if (isMobile && navigator.share) {
        await navigator.share({
          title,
          text: 'Check out this Desktop Commander prompt',
          url: shareUrl,
        });
        return;
      }

      // Desktop (or when share is unavailable): copy immediately
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1500);
      toast({
        title: 'Link copied',
        description: 'Share it with your team.',
        action: (
          <ToastAction altText="Open link" onClick={() => window.open(shareUrl, '_blank', 'noopener,noreferrer')}>
            Open
          </ToastAction>
        ),
      });
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 1500);
        toast({
          title: 'Link copied',
          description: 'Share it with your team.',
          action: (
            <ToastAction altText="Open link" onClick={() => window.open(shareUrl, '_blank', 'noopener,noreferrer')}>
              Open
            </ToastAction>
          ),
        });
      } catch {
        toast({
          title: 'Share failed',
          description: 'Could not share or copy the link.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 pr-12">
            <div className="p-3 bg-dc-surface-elevated rounded-lg">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl leading-tight mb-3">{useCase.title}</DialogTitle>
              <DialogDescription className="sr-only">Detailed information and actions for this prompt.</DialogDescription>
              <div className="flex items-center gap-3 flex-wrap">
                {useCase.verified && (
                  <span className="inline-flex items-center gap-1 text-xs rounded-full border border-primary/20 bg-primary/10 text-primary px-2 py-0.5">
                    <BadgeCheck className="h-3 w-3" />
                    Verified by DC team
                  </span>
                )}
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
            <div className="shrink-0 flex items-center gap-2" aria-label="All-time engagement">
              <EngagementMeter count={useCase.votes + (hasVoted ? 1 : 0)} />
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Exact uses: ${exactUses} (all-time)`}
                    className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" side="bottom">
                  Exact uses: {exactUses} (all-time)
                </PopoverContent>
              </Popover>
            </div>
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

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  aria-label="Share this prompt"
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  {copiedLink ? 'Copied' : 'Share'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy link to share</TooltipContent>
            </Tooltip>

            <Button 
              className="dc-button-primary flex items-center gap-2"
              onClick={handleUsePrompt}
            >
              <Rocket className="h-4 w-4" />
              Use Prompt
            </Button>
          </div>
        </div>
      </DialogContent>

      <UsePromptWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        prompt={useCase.prompt}
        promptTitle={useCase.title}
      />
    </Dialog>
  );
}