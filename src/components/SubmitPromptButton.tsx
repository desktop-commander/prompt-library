import { Button } from '@/components/ui/button';
import { Plus, ExternalLink } from 'lucide-react';
import { usePostHog } from '@/components/PostHogProvider';

interface SubmitPromptButtonProps {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  showIcon?: boolean;
  text?: string;
}

export function SubmitPromptButton({ 
  variant = 'default',
  size = 'default',
  className = '',
  showIcon = true,
  text = 'Submit Your Prompt'
}: SubmitPromptButtonProps) {
  const posthog = usePostHog();
  
  const handleClick = () => {
    // Track prompt submission intent
    posthog.capture('submit_prompt_clicked', {
      button_variant: variant,
      button_size: size,
      button_text: text,
      source_page: window.location.pathname
    });
    
    window.open('https://tally.so/r/m6BbEN', '_blank', 'noopener,noreferrer');
  };

  return (
    <Button 
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`${variant === 'default' ? 'dc-button-primary' : ''} ${className}`}
      title="Submit your prompt via our form"
    >
      {showIcon && <Plus className="h-4 w-4 mr-2" />}
      {text}
      <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
    </Button>
  );
}
