import { useState } from 'react';
import { UseCase, sessionTypeExplanations } from '@/data/useCases';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCompactNumber } from '@/lib/utils';
import {
  Rocket,
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
  Zap
} from 'lucide-react';
import { EngagementMeter } from '@/components/EngagementMeter';


interface PromptCardProps {
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

export function PromptCard({ useCase, onVote: _onVote, onOpen }: PromptCardProps) {

  const IconComponent = iconMap[useCase.icon as keyof typeof iconMap] || Code;



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

  const getCardSessionTypeDisplay = (sessionType: string) => {
    // ⚠️ IMPORTANT: If you change this logic, also update it in src/pages/Index.tsx
    // The homepage has its own inline card rendering with duplicate logic
    switch (sessionType) {
      case 'Instant output':
        return { text: 'Instant', icon: Zap };
      case 'Step-by-step flow':
        return { text: 'Step-by-Step', icon: null };
      default:
        return { text: sessionType, icon: null };
    }
  };

  return (
    <Card
      className="dc-card h-full flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 relative group after:content-['↗'] after:absolute after:bottom-3 after:right-3 after:text-xs after:text-muted-foreground/70 after:pointer-events-none after:transition-transform after:transition-colors after:duration-200 hover:after:text-primary hover:after:translate-x-0.5 hover:after:-translate-y-0.5"
      onClick={() => onOpen?.(useCase)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen?.(useCase);
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-2 bg-dc-surface-elevated rounded-lg">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg leading-snug mb-2 min-h-[3rem] flex items-start">{useCase.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-foreground/70 border-foreground/20 bg-transparent font-normal ${getSessionTypeClass(useCase.sessionType)} whitespace-nowrap`}>
                  <div className="flex items-center gap-1">
                    {(() => {
                      const display = getCardSessionTypeDisplay(useCase.sessionType);
                      return (
                        <>
                          {display.icon && <display.icon className="h-3 w-3" />}
                          <span>{display.text}</span>
                        </>
                      );
                    })()}
                  </div>
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center shrink-0 min-w-[90px] whitespace-nowrap" aria-label="All-time engagement">
            <EngagementMeter count={useCase.votes} size="sm" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="text-sm leading-relaxed mb-4">
          {useCase.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}