import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UseCase } from '@/data/useCases';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  useCase?: UseCase;
}

export const BreadcrumbNavigation = ({ items, useCase }: BreadcrumbNavigationProps) => {
  // Generate structured data for breadcrumbs
  const generateBreadcrumbSchema = () => {
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? `https://library.desktopcommander.app${item.href}` : undefined
      }))
    };

    return JSON.stringify(breadcrumbList);
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema() }}
      />
      
      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground/50" />
              )}
              {item.current ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link 
                  to={item.href} 
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

// Helper function to generate breadcrumbs for different pages
export const getBreadcrumbsForPrompt = (useCase: UseCase): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: 'Prompts', href: '/prompts' },
  { label: useCase.categories[0] || 'Uncategorized', href: `/prompts?category=${encodeURIComponent(useCase.categories[0] || '')}` },
  { label: useCase.title, current: true }
];

export const getBreadcrumbsForCategory = (category: string): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: 'Prompts', href: '/prompts' },
  { label: category, current: true }
];

export const getBreadcrumbsForPrompts = (): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: 'Prompts', current: true }
];
