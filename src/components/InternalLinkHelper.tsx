import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { UseCase, categories } from '@/data/useCases';

interface InternalLinkHelperProps {
  className?: string;
}

export const InternalLinkHelper = ({ className = '' }: InternalLinkHelperProps) => {
  // Get random prompts for "Related Prompts" section
  const getRelatedPrompts = (currentPrompt?: UseCase, count: number = 3): UseCase[] => {
    // This would be implemented based on category, session type, or tags
    // For now, return empty array as placeholder
    return [];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quick Links Section */}
      <div>
        <h4 className="font-semibold text-foreground mb-2">Quick Links</h4>
        <div className="space-y-1">
          <Link 
            to="/" 
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse All Prompts
          </Link>
          <Link 
            to="/prompts" 
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Prompt Categories
          </Link>
          <a 
            href="https://desktopcommander.app#installation" 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install Desktop Commander
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <h4 className="font-semibold text-foreground mb-2">Browse by Category</h4>
        <div className="space-y-1">
          {categories.slice(0, 5).map((category) => (
            <Link
              key={category}
              to={`/prompts?category=${encodeURIComponent(category)}`}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {category}
            </Link>
          ))}
          {categories.length > 5 && (
            <Link 
              to="/prompts" 
              className="block text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all categories →
            </Link>
          )}
        </div>
      </div>

      {/* External Links to Main Site */}
      <div>
        <h4 className="font-semibold text-foreground mb-2">Desktop Commander</h4>
        <div className="space-y-1">
          <a 
            href="https://desktopcommander.app" 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Main Website
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
          <a 
            href="https://desktopcommander.app#testimonials" 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Testimonials
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
          <a 
            href="https://github.com/wonderwhy-er/DesktopCommanderMCP" 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Helper component for related prompts (can be used in prompt detail modal)
interface RelatedPromptsProps {
  currentPrompt: UseCase;
  className?: string;
}

export const RelatedPrompts = ({ currentPrompt, className = '' }: RelatedPromptsProps) => {
  // Get prompts from the same category or similar difficulty
  const getRelatedPrompts = (prompt: UseCase): UseCase[] => {
    // Implementation would filter by category, difficulty, or tags
    // For now, return empty array as placeholder
    return [];
  };

  const relatedPrompts = getRelatedPrompts(currentPrompt);

  if (relatedPrompts.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="font-semibold text-foreground">Related Prompts</h4>
      <div className="space-y-2">
        {relatedPrompts.map((prompt) => (
          <Link
            key={prompt.id}
            to={`/?i=${prompt.id}`}
            className="block p-3 rounded-lg border border-border hover:border-border/60 transition-colors"
          >
            <div className="font-medium text-sm text-foreground">{prompt.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{prompt.categories.join(', ')}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
