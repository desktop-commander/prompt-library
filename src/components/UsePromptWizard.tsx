import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Copy, Check, ExternalLink, ChevronRight, Terminal, MessageSquare, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { analytics, trackInstallationStatus, trackClientSelection, trackPromptCopied, trackWizardCompletion } from '@/lib/analytics';

interface UsePromptWizardProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  useCaseTitle: string;
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

export function UsePromptWizard({ isOpen, onClose, prompt, useCaseTitle }: UsePromptWizardProps) {
  const [step, setStep] = useState(1);
  const [hasInstalled, setHasInstalled] = useState<boolean | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [copied, setCopied] = useState(false);

  // Check cookies on mount
  useEffect(() => {
    if (isOpen) {
      const installed = getCookie('dc_installed');
      const client = getCookie('dc_client') as ClientType | null;

      if (installed === 'true') {
        setHasInstalled(true);
        if (client) {
          setSelectedClient(client);
          setStep(3); // Skip to final step
        } else {
          setStep(2); // Go to client selection
        }
      } else {
        setStep(1); // Start from beginning
      }

      // Track wizard opened
      analytics.track('use_prompt_wizard_opened', { 
        use_case: useCaseTitle,
        initial_step: step 
      });
    }
  }, [isOpen, useCaseTitle]);

  const handleInstallationResponse = (installed: boolean) => {
    setHasInstalled(installed);
    
    if (installed) {
      setCookie('dc_installed', 'true', 365);
      setStep(2);
      trackInstallationStatus(true);
      analytics.track('wizard_step_completed', { step: 1, action: 'has_dc' });
    } else {
      trackInstallationStatus(false);
      analytics.track('wizard_step_completed', { step: 1, action: 'needs_install' });
      // Redirect to installation page
      window.open('https://desktopcommander.app/#installation', '_blank');
      onClose();
    }
  };

  const handleClientSelection = () => {
    if (selectedClient) {
      setCookie('dc_client', selectedClient, 365);
      setStep(3);
      trackClientSelection(selectedClient);
      analytics.track('wizard_step_completed', { step: 2, client: selectedClient });
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      
      // Track completion with proper analytics
      trackPromptCopied(useCaseTitle, useCaseTitle, selectedClient || 'unknown');
      trackWizardCompletion(useCaseTitle, false);
      analytics.track('wizard_step_completed', { 
        step: 3, 
        client: selectedClient
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {/* Progress Bar - More subtle and with padding to avoid close button */}
        <div className="space-y-1 pr-8">
          <Progress value={getProgressValue()} className="h-1" />
          <div className="flex justify-between text-[10px] text-muted-foreground/60">
            <span className={step >= 1 ? 'text-muted-foreground' : ''}>
              1. Installation
            </span>
            <span className={step >= 2 ? 'text-muted-foreground' : ''}>
              2. Client
            </span>
            <span className={step >= 3 ? 'text-muted-foreground' : ''}>
              3. Copy & Use
            </span>
          </div>
        </div>

        {/* Step 1: Installation Check */}
        {step === 1 && (
          <div className="space-y-4 mt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">
                Have you installed Desktop Commander?
              </h3>
              <p className="text-sm text-muted-foreground">
                To use this prompt, you'll need Desktop Commander installed.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <Button 
                onClick={() => handleInstallationResponse(true)}
                className="flex-1"
                size="lg"
              >
                Yes, I have it
              </Button>
              <Button 
                onClick={() => handleInstallationResponse(false)}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                No, take me to install
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Client Selection */}
        {step === 2 && (
          <div className="space-y-4 mt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">
                Which client are you using with Desktop Commander?
              </h3>
            </div>
            <RadioGroup value={selectedClient || ''} onValueChange={(value) => setSelectedClient(value as ClientType)} className="mt-4">
              {CLIENT_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className="flex items-center gap-2 flex-1">
                      <Icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>
            <Button 
              onClick={handleClientSelection}
              disabled={!selectedClient}
              className="w-full"
              size="lg"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Copy Prompt */}
        {step === 3 && (
          <div className="space-y-4 mt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">
                Ready to use your prompt!
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedClient && getClientInstructions(selectedClient)}
              </p>
            </div>

            {/* Copy Button */}
            <Button 
              onClick={handleCopyPrompt}
              className="w-full"
              size="lg"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied! Closing...
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Prompt & Use
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}