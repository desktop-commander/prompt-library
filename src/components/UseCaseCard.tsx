import { useState } from 'react';
import { UseCase } from '@/data/useCases';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
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

export function UseCaseCard({ useCase, onVote: _onVote, onOpen }: UseCaseCardProps) {

  const IconComponent = iconMap[useCase.icon as keyof typeof iconMap] || Code;



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
          <div className="flex items-center gap-1 min-w-[60px]" aria-label="Votes">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm">{useCase.votes}</span>
          </div>
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

      </CardContent>
    </Card>
  );
}