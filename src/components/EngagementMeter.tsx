import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export type EngagementTier = {
  level: 1 | 2 | 3 | 4 | 5;
  label: 'New' | 'Emerging' | 'Growing' | 'Popular' | 'Hot';
};

function getEngagementTier(count: number): EngagementTier {
  if (count >= 200) return { level: 5, label: 'Hot' };
  if (count >= 100) return { level: 4, label: 'Popular' };
  if (count >= 30) return { level: 3, label: 'Growing' };
  if (count >= 10) return { level: 2, label: 'Emerging' };
  return { level: 1, label: 'New' };
}

interface EngagementMeterProps {
  count: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export const EngagementMeter: React.FC<EngagementMeterProps> = ({
  count,
  size = 'md',
  showLabel = true,
  className,
}) => {
  const tier = getEngagementTier(Math.max(0, count || 0));
  const barH = size === 'sm' ? 'h-1.5' : 'h-2';
  const barW = size === 'sm' ? 'w-3.5' : 'w-4';
  const gap = size === 'sm' ? 'gap-1' : 'gap-1.5';
  const labelClass = size === 'sm' ? 'text-[10px]' : 'text-xs';

  const content = (
    <div className={cn('flex items-center', className)} aria-label={`All-time engagement: ${tier.label}`}>
      <div className={cn('flex items-center', gap)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'rounded-full transition-colors',
              barH,
              barW,
              i < tier.level ? 'bg-primary' : 'bg-muted'
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className={cn('ml-2 text-muted-foreground', labelClass)}>{tier.label}</span>
      )}
    </div>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent>
        All-time engagement: {tier.label}
      </TooltipContent>
    </Tooltip>
  );
};

export default EngagementMeter;
