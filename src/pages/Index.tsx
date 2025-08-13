
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, Code, Users, Search, Heart, Play, Clock, Shield, User } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCases } from '@/data/useCases';
import { PromptDetailModal } from '@/components/PromptDetailModal';
import { SubmitPromptButton } from '@/components/SubmitPromptButton';
import TestimonialsRow from '@/components/TestimonialsRow';
import { SiteHeader } from '@/components/SiteHeader';
import { EngagementMeter } from '@/components/EngagementMeter';
import { SearchBar } from '@/components/SearchBar';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useCaseVotes, setUseCaseVotes] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if there's a prompt ID in the URL on mount
  useEffect(() => {
    const id = searchParams.get('i');
    if (id) {
      const useCase = useCases.find(uc => uc.id === id);
      if (useCase) {
        setSelectedUseCase(useCase);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const stats = [
    { label: 'Prompts', value: '15+', icon: Code },
    { label: 'Community Votes', value: '2,000+', icon: Heart },
    { label: 'Categories', value: '12', icon: Search },
    { label: 'Active Users', value: '500+', icon: Users }
  ];

  // Search functionality
  const filteredUseCases = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return useCases.filter(useCase => {
      // Search through multiple fields
      const searchableText = [
        useCase.title,
        useCase.description,
        useCase.prompt,
        useCase.category,
        useCase.difficulty,
        ...(useCase.tags || []),
        ...(useCase.targetRoles || [])
      ].join(' ').toLowerCase();
      
      return searchableText.includes(query);
    });
  }, [searchQuery]);

  // Featured prompts: specific curated list
  const featuredUseCases = useMemo(() => {
    const featuredTitles = [
      'Explore and Understand New Repository',  // 1st with fire
      'Organise my Downloads folder',            // 2nd with fire
      'Build Complete Feature from Scratch',
      'Analyze My Data File',
      'Set Up Development Environment',
      'Understand React Component Architecture'
    ];
    
    // Find these specific prompts (with flexible matching for whitespace)
    const featured = [];
    for (const title of featuredTitles) {
      const useCase = useCases.find(uc => 
        uc.title.trim() === title || 
        uc.title.trim() === title.trim() ||
        uc.title.replace(/\s+/g, ' ').trim() === title.trim()
      );
      if (useCase) {
        featured.push(useCase);
      }
    }
    
    // If we don't find all 6, log a warning
    if (featured.length < 6) {
      console.warn(`Only found ${featured.length} of 6 featured prompts`);
    }
    
    return featured;
  }, []);
  
  // Set fire emoji for first two prompts
  const hotIds = new Set(featuredUseCases.slice(0, 2).map((u) => u.id));
  
  // Determine which prompts to display
  const displayedUseCases = searchQuery.trim() ? filteredUseCases : featuredUseCases;

  const handleUseCaseClick = (useCase) => {
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
    // Update URL with prompt ID
    setSearchParams({ i: useCase.id });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUseCase(null);
    // Clear URL params when closing
    setSearchParams({});
  };

  const handleVote = (id) => {
    setUseCaseVotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Prompt Library
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover powerful AI workflows and automation prompts for Desktop Commander
            </p>
            
            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by title, description, category, difficulty, or tags..."
                className="w-full"
              />
            </div>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="dc-button-primary">
                <Link to="/prompts" className="flex items-center gap-2">
                  Browse All Prompts
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <SubmitPromptButton size="lg" />
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://desktopcommander.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Get Desktop Commander
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Prompts or Search Results */}
      <div className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              {searchQuery.trim() 
                ? `Search Results (${filteredUseCases.length} found)` 
                : 'Featured Prompts'}
            </h2>
          </div>
          
          {displayedUseCases.length > 0 ? (
            <>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ${searchQuery ? 'search-results-grid' : ''}`}>
                {displayedUseCases.map((useCase) => (
                <Card 
                  key={useCase.id} 
                  className={`dc-card cursor-pointer hover:shadow-lg transition-shadow relative group focus:outline-none focus:ring-2 focus:ring-primary/50 ${!searchQuery && hotIds.has(useCase.id) ? 'border-2 border-primary hover:animate-pulse hover:ring-2 hover:ring-primary/30' : ''} after:content-['↗'] after:absolute after:bottom-3 after:right-3 after:text-xs after:text-muted-foreground/70 after:pointer-events-none after:transition-transform after:transition-colors after:duration-200 hover:after:text-primary hover:after:translate-x-0.5 hover:after:-translate-y-0.5`}
                  onClick={() => handleUseCaseClick(useCase)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleUseCaseClick(useCase);
                  }
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base leading-tight line-clamp-2">{useCase.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-foreground/70 border-foreground/20 bg-transparent font-normal">
                          {useCase.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{useCase.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <EngagementMeter count={useCase.votes + (useCaseVotes[useCase.id] || 0)} size="sm" showLabel={false} />
                      {hotIds.has(useCase.id) && (
                        <span aria-label="Hot prompt" title="Hot prompt" className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px]">🔥</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <User className="h-3 w-3" />
                    <span>{useCase.author}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed text-sm">
                    {useCase.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {useCase.targetRoles.slice(0, 2).map((role) => (
                      <Badge key={role} variant="secondary" className="role-tag text-xs">
                        {role}
                      </Badge>
                    ))}
                    {useCase.targetRoles.length > 2 && (
                      <Badge variant="secondary" className="role-tag text-xs">
                        +{useCase.targetRoles.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

              <div className="text-center">
                <Button asChild size="lg" variant="outline">
                  <Link to="/prompts" className="flex items-center gap-2">
                    Browse Library
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          ) : searchQuery.trim() ? (
            // Empty state for search with no results
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No prompts found matching "{searchQuery}"
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <section id="testimonials" aria-label="Testimonials">
        <TestimonialsRow />
      </section>

      <PromptDetailModal
        useCase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onVote={handleVote}
      />

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Supercharge Your AI Workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are using Desktop Commander to automate their daily tasks
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="dc-button-primary">
                <Link to="/use-cases">
                  Explore Prompts
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://desktopcommander.app/#installation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install Desktop Commander
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
