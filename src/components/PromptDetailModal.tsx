import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UseCase, sessionTypeExplanations } from '@/data/useCases';
import { formatCompactNumber } from '@/lib/utils';
import { 
  Heart, 
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
import { usePostHog } from '@/components/PostHogProvider';

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
  const [showSessionTypeExplainer, setShowSessionTypeExplainer] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { toast } = useToast();
  const [exactUses, setExactUses] = useState(0);
  const posthog = usePostHog();

  // Phase 4.5: Manual copy detection state
  const [textSelected, setTextSelected] = useState(false);
  const [selectionDetails, setSelectionDetails] = useState({
    selectedText: '',
    selectionLength: 0,
    isFullPrompt: false,
    selectionTime: null
  });

  // Phase 3: Track modal open time for engagement analytics
  useEffect(() => {
    if (isOpen && useCase) {
      window.promptOpenTime = new Date().getTime();
      
      // Get viral and visitor info
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;
      
      // Track modal opened event
      posthog.capture('prompt_modal_opened', {
        prompt_id: useCase.id,
        prompt_title: useCase.title,
        prompt_categories: useCase.categories,
        prompt_difficulty: useCase.difficulty,
        prompt_author: useCase.author,
        target_roles: useCase.targetRoles,
        // Phase 3: Enhanced tracking
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        viral_entry_prompt: viralInfo?.prompt_id,
        time_since_page_load: Math.round((new Date().getTime() - (window.pageLoadTime || new Date().getTime())) / 1000)
      });
    }
  }, [isOpen, useCase, posthog]);

  // Phase 4.5: Manual copy detection functions
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const selectedText = selection.toString();
      const selectionLength = selectedText.length;
      const promptLength = useCase.prompt.length;
      const isFullPrompt = selectionLength > promptLength * 0.9; // 90% threshold for "full" prompt
      
      setTextSelected(true);
      setSelectionDetails({
        selectedText: selectedText.substring(0, 100), // First 100 chars for logging
        selectionLength,
        isFullPrompt,
        selectionTime: new Date().getTime()
      });

      // Get context for tracking
      const timeInModal = window.promptOpenTime ? 
        Math.round((new Date().getTime() - window.promptOpenTime) / 1000) : 0;
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;

      // Track text selection
      posthog.capture('prompt_text_selected', {
        prompt_id: useCase.id,
        prompt_title: useCase.title,
        selection_length: selectionLength,
        prompt_length: promptLength,
        selection_percentage: Math.round((selectionLength / promptLength) * 100),
        is_full_prompt_selected: isFullPrompt,
        time_before_selection_seconds: timeInModal,
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        copy_intent: 'text_selection'
      });
    } else if (textSelected) {
      // User deselected text without copying
      const timeInModal = window.promptOpenTime ? 
        Math.round((new Date().getTime() - window.promptOpenTime) / 1000) : 0;
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;

      posthog.capture('prompt_text_deselected', {
        prompt_id: useCase.id,
        prompt_title: useCase.title,
        previous_selection_length: selectionDetails.selectionLength,
        was_full_prompt_selected: selectionDetails.isFullPrompt,
        selection_duration_seconds: selectionDetails.selectionTime ? 
          Math.round((new Date().getTime() - selectionDetails.selectionTime) / 1000) : null,
        time_before_deselection_seconds: timeInModal,
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        abandoned_copy_intent: true
      });

      setTextSelected(false);
    }
  };

  const handleManualCopy = (method: 'keyboard' | 'context_menu') => {
    const timeInModal = window.promptOpenTime ? 
      Math.round((new Date().getTime() - window.promptOpenTime) / 1000) : 0;
    const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;

    // Track manual copy attempt
    posthog.capture('prompt_manual_copy_attempt', {
      prompt_id: useCase.id,
      prompt_title: useCase.title,
      copy_method: method,
      had_text_selected: textSelected,
      selected_length: selectionDetails.selectionLength,
      is_full_prompt_selected: selectionDetails.isFullPrompt,
      time_from_selection_to_copy: selectionDetails.selectionTime ? 
        Math.round((new Date().getTime() - selectionDetails.selectionTime) / 1000) : null,
      time_before_copy_seconds: timeInModal,
      bypass_wizard: true, // User avoided official flow
      // Phase 3: Enhanced context
      visit_count: visitCount,
      is_returning_user: visitCount > 1,
      is_viral_session: !!viralInfo,
      conversion_funnel_step: 'manual_copy_bypass'
    });
  };

  const handleKeyboardShortcut = (e: KeyboardEvent) => {
    // Detect Ctrl+C / Cmd+C
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      if (textSelected) {
        handleManualCopy('keyboard');
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    // Track right-click on prompt area (context menu)
    if (textSelected) {
      const timeInModal = window.promptOpenTime ? 
        Math.round((new Date().getTime() - window.promptOpenTime) / 1000) : 0;
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;

      posthog.capture('prompt_right_click_detected', {
        prompt_id: useCase.id,
        prompt_title: useCase.title,
        had_text_selected: textSelected,
        selected_length: selectionDetails.selectionLength,
        is_full_prompt_selected: selectionDetails.isFullPrompt,
        time_before_right_click_seconds: timeInModal,
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        copy_intent: 'context_menu'
      });

      // Set a timer to detect if copy was likely selected from context menu
      setTimeout(() => handleManualCopy('context_menu'), 100);
    }
  };

  // Phase 4.5: Add keyboard event listener
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => handleKeyboardShortcut(e);
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, textSelected]);

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
    // Get engagement context
    const timeInModal = window.promptOpenTime ? 
      Math.round((new Date().getTime() - window.promptOpenTime) / 1000) : 0;
    const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;
    
    // Phase 4: Track "Use Prompt" button click
    posthog.capture('use_prompt_button_clicked', {
      prompt_id: useCase.id,
      prompt_title: useCase.title,
      prompt_categories: useCase.categories,
      prompt_difficulty: useCase.difficulty,
      prompt_author: useCase.author,
      time_before_use_seconds: timeInModal,
      engagement_level: timeInModal > 30 ? 'high' : timeInModal > 10 ? 'medium' : 'low',
      // Phase 3: Enhanced context
      visit_count: visitCount,
      is_returning_user: visitCount > 1,
      is_viral_session: !!viralInfo,
      viral_entry_prompt: viralInfo?.prompt_id,
      conversion_funnel_step: 'prompt_to_wizard'
    });
    
    setShowWizard(true);
    incrementUses();
  };

  // Phase 4: Track modal close with engagement metrics
  const handleModalClose = () => {
    if (window.promptOpenTime) {
      const timeInModal = Math.round((new Date().getTime() - window.promptOpenTime) / 1000);
      
      // Get viral and visitor info
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;
      
      posthog.capture('prompt_modal_closed', {
        prompt_id: useCase.id,
        prompt_title: useCase.title,
        prompt_categories: useCase.categories,
        time_in_modal_seconds: timeInModal,
        engagement_level: timeInModal > 30 ? 'high' : timeInModal > 10 ? 'medium' : 'low',
        // Phase 3: Enhanced tracking context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        viral_entry_prompt: viralInfo?.prompt_id,
        close_method: 'manual' // vs 'escape' or 'backdrop'
      });
    }
    
    onClose();
  };

  const handleVote = () => {
    if (!hasVoted) {
      // Get engagement context
      const timeInModal = window.promptOpenTime ? 
        Math.round((new Date().getTime() - window.promptOpenTime) / 1000) : 0;
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;
      
      // Phase 4: Enhanced vote tracking
      posthog.capture('prompt_voted', {
        prompt_id: useCase.id,
        prompt_title: useCase.title,
        prompt_categories: useCase.categories,
        prompt_difficulty: useCase.difficulty,
        prompt_author: useCase.author,
        time_before_vote_seconds: timeInModal,
        vote_speed: timeInModal < 5 ? 'fast' : timeInModal < 15 ? 'medium' : 'slow',
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        viral_entry_prompt: viralInfo?.prompt_id
      });
      
      onVote(useCase.id);
      setHasVoted(true);
      toast({
        title: "Vote recorded!",
        description: "Thank you for voting on this prompt.",
      });
    }
  };

  const getSessionTypeClass = (sessionType: string) => {
    switch (sessionType) {
      case 'Instant output':
        return 'session-instant-output';
      case 'Step-by-step flow':
        return 'session-step-by-step-flow';
      default:
        return 'session-instant-output';
    }
  };

  const getShareUrl = (shareSource = 'share_button') => {
    const url = new URL('/', window.location.origin); // Fixed: Use root path instead of /prompts
    url.searchParams.set('i', useCase.id);
    
    // Phase 3: Add share tracking parameters
    url.searchParams.set('utm_source', 'style_scout');
    url.searchParams.set('utm_medium', shareSource);
    url.searchParams.set('utm_campaign', 'prompt_sharing');
    url.searchParams.set('utm_content', useCase.id);
    
    // Add timestamp for unique tracking
    url.searchParams.set('shared_at', Date.now().toString());
    
    return url.toString();
  };

  const handleShare = async () => {
    const isMobile =
      typeof navigator !== 'undefined' &&
      (/(Mobi|Android|iPhone|iPad|iPod)/i.test(navigator.userAgent) ||
        (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches));

    // Determine share source based on device and capabilities
    const shareSource = isMobile && navigator.share ? 'native_share' : 'clipboard_copy';
    const shareUrl = getShareUrl(shareSource);
    const title = `Prompt: ${useCase.title}`;

    // Get viral and visitor info for enhanced tracking
    const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;

    // Track share button click with enhanced data
    posthog.capture('share_button_clicked', {
      prompt_id: useCase.id,
      prompt_title: useCase.title,
      prompt_categories: useCase.categories,
      prompt_difficulty: useCase.difficulty,
      prompt_author: useCase.author,
      target_roles: useCase.targetRoles,
      device_type: isMobile ? 'mobile' : 'desktop',
      share_url: shareUrl,
      share_method: shareSource, // NEW: Track intended share method
      source_page: 'prompt_modal',
      // Phase 3: Enhanced viral and visitor tracking
      visit_count: visitCount,
      is_returning_user: visitCount > 1,
      is_viral_session: !!viralInfo,
      viral_chain_length: viralInfo ? 1 : 0, // User is creating a viral chain
      original_viral_prompt: viralInfo?.prompt_id,
      time_on_prompt_seconds: Math.round((new Date().getTime() - (window.promptOpenTime || new Date().getTime())) / 1000)
    });

    try {
      // Mobile: use native share sheet when available
      if (isMobile && navigator.share) {
        await navigator.share({
          title,
          text: 'Check out this Desktop Commander prompt',
          url: shareUrl,
        });
        
        // Track successful native share
        posthog.capture('share_native_completed', {
          prompt_id: useCase.id,
          prompt_title: useCase.title,
          device_type: 'mobile',
          share_method: 'native_share'
        });
        
        return;
      }

      // Desktop (or when share is unavailable): copy immediately
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1500);
      
      // Track successful clipboard copy
      posthog.capture('share_link_copied', {
        prompt_id: useCase.id,
        prompt_title: useCase.title,
        device_type: isMobile ? 'mobile' : 'desktop',
        share_method: 'clipboard_copy'
      });
      
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
        // Track share failure
        posthog.capture('share_failed', {
          prompt_id: useCase.id,
          prompt_title: useCase.title,
          device_type: isMobile ? 'mobile' : 'desktop',
          error_type: 'clipboard_fallback_failed'
        });
        
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
      <DialogContent className="w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] mx-auto flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-start gap-3 sm:gap-4 pr-8 sm:pr-12 min-w-0">
            <div className="p-2 sm:p-3 bg-dc-surface-elevated rounded-lg flex-shrink-0">
              <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg sm:text-2xl leading-tight mb-2 sm:mb-3 break-words">{useCase.title}</DialogTitle>
              <DialogDescription className="sr-only">Detailed information and actions for this prompt.</DialogDescription>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
                {useCase.verified && (
                  <span className="inline-flex items-center gap-1 text-xs rounded-full border border-primary/20 bg-primary/10 text-primary px-2 py-0.5">
                    <BadgeCheck className="h-3 w-3" />
                    Verified by DC team
                  </span>
                )}
                <div className="relative inline-block">
                  <Badge 
                    className={`difficulty-badge ${getSessionTypeClass(useCase.sessionType)} text-xs flex items-center gap-1 cursor-pointer hover:opacity-90 transition-opacity`}
                    onClick={() => setShowSessionTypeExplainer(!showSessionTypeExplainer)}
                  >
                    <span>{useCase.sessionType}</span>
                    <Info className="h-3 w-3" />
                  </Badge>
                  
                  {/* Floating bubble tooltip */}
                  {showSessionTypeExplainer && (
                    <>
                      {/* Click-outside backdrop */}
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowSessionTypeExplainer(false)}
                      />
                      
                      {/* Tooltip bubble */}
                      <div className="absolute top-full left-0 mt-2 z-50 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 animate-in fade-in-0 zoom-in-95 duration-200">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {sessionTypeExplanations[useCase.sessionType as keyof typeof sessionTypeExplanations]}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowSessionTypeExplainer(false);
                            }}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {/* Arrow pointing up to the badge */}
                        <div className="absolute -top-2 left-4 w-4 h-4 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 rotate-45"></div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {useCase.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{category}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">{useCase.author}</span>
                </div>

              </div>
            </div>
            <div className="shrink-0 hidden sm:flex items-center gap-2" aria-label="All-time engagement">
              <EngagementMeter count={useCase.votes + (hasVoted ? 1 : 0)} />
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Exact uses: ${useCase.votes} (all-time)`}
                    className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" side="bottom">
                  Exact uses: {useCase.votes} (all-time)
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 overflow-y-auto min-h-0 flex-1 pr-2">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Description</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{useCase.description}</p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Target Roles</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 min-w-0">
              {useCase.targetRoles.map((role) => (
                <Badge key={role} variant="secondary" className="role-tag text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Complete Prompt</h3>
            </div>
            <div 
              className="p-3 sm:p-4 bg-dc-surface-elevated rounded-lg border min-w-0"
              onMouseUp={handleTextSelection}
              onKeyUp={handleTextSelection}
              onContextMenu={handleContextMenu}
            >
              <pre className="text-xs sm:text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed select-text break-words overflow-wrap-anywhere min-w-0">
                {useCase.prompt}
              </pre>
            </div>
          </div>
        </div>

        {/* Fixed footer with buttons */}
        <div className="flex-shrink-0 border-t pt-4 mt-4">
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 min-w-0">
            <Button variant="outline" onClick={handleModalClose} className="order-3 sm:order-1 min-w-0">
              <span className="truncate">Close</span>
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  aria-label="Share this prompt"
                  className="flex items-center gap-2 order-2 min-w-0"
                >
                  <Share2 className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{copiedLink ? 'Copied' : 'Share'}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy link to share</TooltipContent>
            </Tooltip>

            <Button 
              className="dc-button-primary flex items-center gap-2 order-1 sm:order-3 min-w-0"
              onClick={handleUsePrompt}
            >
              <Rocket className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Use Prompt</span>
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