import { Button } from '@/components/ui/button';
import { Plus, ExternalLink } from 'lucide-react';

interface SubmitUseCaseButtonProps {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  showIcon?: boolean;
  text?: string;
}

export function SubmitUseCaseButton({ 
  variant = 'default',
  size = 'default',
  className = '',
  showIcon = true,
  text = 'Submit Use Case'
}: SubmitUseCaseButtonProps) {
  const handleClick = () => {
    window.open('https://tally.so/r/m6BbEN', '_blank', 'noopener,noreferrer');
  };

  return (
    <Button 
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`${variant === 'default' ? 'dc-button-primary' : ''} ${className}`}
      title="Submit your use case via our form"
    >
      {showIcon && <Plus className="h-4 w-4 mr-2" />}
      {text}
      <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
    </Button>
  );
}
