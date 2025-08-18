import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Copy, Check, ExternalLink, ChevronRight, Terminal, MessageSquare, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { usePostHog } from '@/components/PostHogProvider';

interface UsePromptWizardProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  promptTitle: string;
}

type ClientType = 'claude-desktop' | 'cursor' | 'vscode' | 'claude-code' | 'other';

const CLIENT_OPTIONS = [
  { value: 'claude-desktop', label: 'Claude Desktop', icon: MessageSquare },
  { value: 'cursor', label: 'Cursor', icon: Terminal },
  { value: 'vscode', label: 'VS Code', icon: Terminal },
  { value: 'claude-code', label: 'Claude Code', icon: Terminal },
  { value: 'other', label: 'Other', icon: Terminal }
] as const;

const getClientInstructions = (client: ClientType): string => {
  switch (client) {
    case 'claude-desktop':
      return 'Paste this prompt in Claude Desktop\'s chat window where Desktop Commander is installed.';
    case 'cursor':
      return 'Open Cursor\'s composer (Cmd+K) and paste this prompt where Desktop Commander is configured.';
    case 'vscode':
      return 'Open VS Code\'s integrated terminal and paste this prompt with Desktop Commander active.';
    case 'claude-code':
      return 'Run this prompt in Claude Code where Desktop Commander is set up.';
    default:
      return 'Paste this prompt in your LLM interface where Desktop Commander is installed.';
  }
};

// Cookie utilities
const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// We're now using the centralized analytics utility from @/lib/analytics

export function UsePromptWizard({ isOpen, onClose, prompt, promptTitle }: UsePromptWizardProps) {
  const [step, setStep] = useState(1);
  const [hasInstalled, setHasInstalled] = useState<boolean | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [copied, setCopied] = useState(false);
  const posthog = usePostHog();

  // Phase 4: Enhanced close handler for wizard abandonment tracking
  const handleWizardClose = () => {
    if (window.wizardOpenTime) {
      const timeInWizard = Math.round((new Date().getTime() - window.wizardOpenTime) / 1000);
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;
      
      // Only track abandonment if not completed (not copied)
      if (!copied) {
        posthog.capture('use_prompt_wizard_abandoned', {
          prompt_title: promptTitle,
          abandoned_at_step: step,
          time_before_abandon_seconds: timeInWizard,
          has_dc_installed: hasInstalled,
          selected_client: selectedClient,
          abandon_reason: step === 1 ? 'before_installation_check' :
                         step === 2 ? 'before_client_selection' :
                         step === 3 ? 'before_copy' : 'unknown',
          // Phase 3: Enhanced context
          visit_count: visitCount,
          is_returning_user: visitCount > 1,
          is_viral_session: !!viralInfo,
          conversion_funnel_step: 'wizard_abandoned'
        });
      }
    }
    
    onClose();
  };

  // Check cookies on mount
  useEffect(() => {
    if (isOpen) {
      // Store wizard open time for engagement tracking
      window.wizardOpenTime = new Date().getTime();
      
      const installed = getCookie('dc_installed');
      const client = getCookie('dc_client') as ClientType | null;
      
      // Get visitor and viral context
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;

      let initialStep = 1;
      if (installed === 'true') {
        setHasInstalled(true);
        if (client) {
          setSelectedClient(client);
          setStep(3); // Skip to final step
          initialStep = 3;
        } else {
          setStep(2); // Go to client selection
          initialStep = 2;
        }
      } else {
        setStep(1); // Start from beginning
        initialStep = 1;
      }

      // Phase 4: Track wizard opened with enhanced context
      posthog.capture('use_prompt_wizard_opened', { 
        prompt_title: promptTitle,
        initial_step: initialStep,
        has_dc_installed: installed === 'true',
        known_client: client,
        user_type: installed === 'true' ? 'returning_dc_user' : 'new_dc_user',
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        viral_entry_prompt: viralInfo?.prompt_id,
        wizard_entry_source: 'prompt_modal'
      });
    }
  }, [isOpen, promptTitle, posthog]);

  const handleInstallationResponse = (installed: boolean) => {
    setHasInstalled(installed);
    
    // Get context for tracking
    const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;
    const timeInWizard = window.wizardOpenTime ? 
      Math.round((new Date().getTime() - window.wizardOpenTime) / 1000) : 0;
    
    if (installed) {
      setCookie('dc_installed', 'true', 365);
      setStep(2);
      
      // Phase 4: Track DC installation confirmation
      posthog.capture('dc_installation_confirmed', {
        prompt_title: promptTitle,
        wizard_step: 1,
        time_to_confirm_seconds: timeInWizard,
        user_action: 'has_dc_installed',
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        conversion_funnel_step: 'installation_confirmed'
      });
    } else {
      // Phase 4: Track DC installation needed
      posthog.capture('dc_installation_needed', {
        prompt_title: promptTitle,
        wizard_step: 1,
        time_to_redirect_seconds: timeInWizard,
        user_action: 'needs_dc_install',
        redirect_url: 'https://desktopcommander.app/#installation',
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        conversion_funnel_step: 'installation_redirect'
      });
      
      // Redirect to installation page
      window.open('https://desktopcommander.app/#installation', '_blank');
      onClose();
    }
  };

  const handleClientSelection = () => {
    if (selectedClient) {
      setCookie('dc_client', selectedClient, 365);
      setStep(3);
      
      // Get context for tracking
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;
      const timeInWizard = window.wizardOpenTime ? 
        Math.round((new Date().getTime() - window.wizardOpenTime) / 1000) : 0;
      
      // Phase 4: Track platform/client selection
      posthog.capture('dc_platform_selected', {
        prompt_title: promptTitle,
        wizard_step: 2,
        selected_client: selectedClient,
        time_to_select_seconds: timeInWizard,
        platform_category: selectedClient === 'claude-desktop' ? 'claude' : 
                          selectedClient === 'other' ? 'other' : 'ide',
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        conversion_funnel_step: 'platform_selected'
      });
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      
      // Get context for tracking
      const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
      const viralSession = localStorage.getItem('style_scout_viral_session');
      const viralInfo = viralSession ? JSON.parse(viralSession) : null;
      const timeInWizard = window.wizardOpenTime ? 
        Math.round((new Date().getTime() - window.wizardOpenTime) / 1000) : 0;
      
      // Phase 4: Track prompt copy completion
      posthog.capture('prompt_copied_to_clipboard', {
        prompt_title: promptTitle,
        wizard_step: 3,
        selected_client: selectedClient || 'unknown',
        time_to_copy_seconds: timeInWizard,
        prompt_length_chars: prompt.length,
        platform_category: selectedClient === 'claude-desktop' ? 'claude' : 
                          selectedClient === 'other' ? 'other' : 'ide',
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        conversion_funnel_step: 'prompt_copied'
      });
      
      // Track wizard completion
      posthog.capture('use_prompt_wizard_completed', {
        prompt_title: promptTitle,
        completion_type: 'copy_to_clipboard',
        total_time_seconds: timeInWizard,
        final_client: selectedClient || 'unknown',
        steps_completed: 3,
        // Phase 3: Enhanced context
        visit_count: visitCount,
        is_returning_user: visitCount > 1,
        is_viral_session: !!viralInfo,
        conversion_funnel_step: 'wizard_completed'
      });
      
      toast.success('Prompt copied to clipboard!');
      
      // Auto-close after a short delay
      setTimeout(() => {
        onClose();
        // Reset state for next time
        setCopied(false);
        setStep(1);
      }, 1500);
    } catch (err) {
      toast.error('Failed to copy prompt');
      console.error('Failed to copy:', err);
    }
  };

  const getProgressValue = () => {
    return (step / 3) * 100;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleWizardClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[85vh] flex flex-col">
        {/* Progress Bar - More subtle and with padding to avoid close button */}
        <div className="space-y-1 pr-10 sm:pr-8 flex-shrink-0 min-w-0">
          <Progress value={getProgressValue()} className="h-1 w-full" />
          <div className="flex justify-between text-[9px] sm:text-xs text-muted-foreground/60 min-w-0">
            <span className={`truncate ${step >= 1 ? 'text-muted-foreground' : ''}`}>
              1. Install
            </span>
            <span className={`truncate ${step >= 2 ? 'text-muted-foreground' : ''}`}>
              2. Client
            </span>
            <span className={`truncate ${step >= 3 ? 'text-muted-foreground' : ''}`}>
              3. Copy
            </span>
          </div>
        </div>

        {/* Step 1: Installation Check */}
        {step === 1 && (
          <div className="space-y-3 mt-3 sm:mt-4 flex-1 min-h-0 min-w-0">
            <div className="text-center space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold leading-tight">
                Have you installed Desktop Commander?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground px-1 break-words">
                To use this prompt, you'll need Desktop Commander installed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 mt-4 min-w-0">
              <Button 
                onClick={() => handleInstallationResponse(true)}
                className="flex-1 w-full h-11 min-w-0"
                size="lg"
              >
                <span className="truncate">Yes, I have it</span>
              </Button>
              <Button 
                onClick={() => handleInstallationResponse(false)}
                variant="outline"
                className="flex-1 w-full h-11 min-w-0"
                size="lg"
              >
                <span className="hidden sm:inline truncate">No, take me to install</span>
                <span className="sm:hidden truncate">Install Desktop Commander</span>
                <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Client Selection */}
        {step === 2 && (
          <div className="space-y-3 mt-3 sm:mt-4 flex-1 min-h-0 min-w-0 overflow-y-auto">
            <div className="text-center space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold leading-tight">
                Which client are you using?
              </h3>
            </div>
            <RadioGroup value={selectedClient || ''} onValueChange={(value) => setSelectedClient(value as ClientType)} className="mt-3 space-y-2">
              {CLIENT_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className="flex items-center space-x-3 p-3 sm:p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer border border-transparent hover:border-border min-h-[48px] sm:min-h-auto min-w-0"
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-0.5 flex-shrink-0" />
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base truncate">{option.label}</span>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>
            <Button 
              onClick={handleClientSelection}
              disabled={!selectedClient}
              className="w-full h-11 mt-3 min-w-0"
              size="lg"
            >
              <span className="truncate">Continue</span>
            </Button>
          </div>
        )}

        {/* Step 3: Copy Prompt */}
        {step === 3 && (
          <div className="space-y-3 mt-3 sm:mt-4 flex-1 min-h-0 min-w-0">
            <div className="text-center space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold leading-tight">
                Ready to use your prompt!
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground px-1 break-words">
                {selectedClient && getClientInstructions(selectedClient)}
              </p>
            </div>

            {/* Copy Button */}
            <Button 
              onClick={handleCopyPrompt}
              className="w-full h-11 mt-4 min-w-0"
              size="lg"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Copied! Closing...</span>
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Copy Prompt & Use</span>
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}