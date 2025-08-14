
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Users, Search, Heart, User } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCases } from '@/data/useCases';
import { PromptDetailModal } from '@/components/PromptDetailModal';
import { SubmitPromptButton } from '@/components/SubmitPromptButton';
import TestimonialsRow from '@/components/TestimonialsRow';
import { SiteHeader } from '@/components/SiteHeader';
import { EngagementMeter } from '@/components/EngagementMeter';
import { RoleFilter } from '@/components/RoleFilter';


const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useCaseVotes, setUseCaseVotes] = useState({});
  const [selectedRole, setSelectedRole] = useState('For all');
  
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

  // Default featured prompts: specific curated list
  const defaultFeaturedUseCases = useMemo(() => {
    const featuredTitles = [
      'Explore and Understand New Repository',  // 1st with fire
      'Organise my Downloads folder',            // 2nd with fire
      'Build Complete Feature from Scratch',
      'Analyze My Data File',
      'Set Up Development Environment',
      'Understand React Component Architecture',
      'Clean Up Unused Code',
      'Build Personal Finance Tracker',
      'Automated Competitor Research'
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
    
    // If we don't find all 9, log a warning
    if (featured.length < 9) {
      console.warn(`Only found ${featured.length} of 9 default featured prompts`);
    }
    
    return featured;
  }, []);

  // Get available target roles from the entire library
  const availableRoles = useMemo(() => {
    const roles = new Set();
    useCases.forEach(uc => {
      uc.targetRoles.forEach(role => roles.add(role));
    });
    return ['For all', ...Array.from(roles).sort()];
  }, []);

  // Filter prompts by selected role
  const filteredByRole = useMemo(() => {
    if (selectedRole === 'For all') {
      return defaultFeaturedUseCases;
    }
    
    // Filter entire library by selected role, sort by usage, limit to 9
    const filtered = useCases
      .filter(uc => uc.targetRoles.includes(selectedRole))
      .sort((a, b) => {
        // Primary sort: usage count (gaClicks) descending
        if (b.gaClicks !== a.gaClicks) {
          return b.gaClicks - a.gaClicks;
        }
        // Tie-breaker: alphabetical by title
        return a.title.localeCompare(b.title);
      })
      .slice(0, 9);
    
    return filtered;
  }, [selectedRole, defaultFeaturedUseCases]);

  // Set fire emoji for first two prompts (only for default featured)
  const hotIds = new Set(
    selectedRole === 'For all' 
      ? defaultFeaturedUseCases.slice(0, 2).map((u) => u.id)
      : [] // No fire emojis for filtered results
  );

  // Dynamic section title based on selected role
  const sectionTitle = useMemo(() => {
    if (selectedRole === 'For all') {
      return 'Featured Prompts';
    }
    return `Featured Prompts for ${selectedRole}`;
  }, [selectedRole]);

  // Dynamic Browse All button text and URL
  const browseAllText = useMemo(() => {
    if (selectedRole === 'For all') {
      return 'Browse All Prompts';
    }
    return `Browse All ${selectedRole} Prompts`;
  }, [selectedRole]);

  const browseAllUrl = useMemo(() => {
    if (selectedRole === 'For all') {
      return '/prompts';
    }
    // Pass the selected role as a URL parameter for pre-filtering
    return `/prompts?role=${encodeURIComponent(selectedRole)}`;
  }, [selectedRole]);

  // Always display the filtered prompts
  const displayedUseCases = filteredByRole;

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

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <>
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
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              Discover powerful AI workflows and automation prompts for Desktop Commander
            </p>

          </div>
        </div>
      </div>

      {/* Featured Prompts */}
      <div className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              {sectionTitle}
            </h2>
          </div>
          
          {/* Role Filter */}
          <RoleFilter 
            roles={availableRoles}
            selectedRole={selectedRole}
            onRoleChange={handleRoleChange}
          />
          
          {displayedUseCases.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayedUseCases.map((useCase) => (
                <Card 
                  key={useCase.id} 
                  className={`dc-card cursor-pointer hover:shadow-lg transition-shadow relative group focus:outline-none focus:ring-2 focus:ring-primary/50 ${hotIds.has(useCase.id) ? 'border-2 border-primary hover:animate-pulse hover:ring-2 hover:ring-primary/30' : ''} after:content-['↗'] after:absolute after:bottom-3 after:right-3 after:text-xs after:text-muted-foreground/70 after:pointer-events-none after:transition-transform after:transition-colors after:duration-200 hover:after:text-primary hover:after:translate-x-0.5 hover:after:-translate-y-0.5`}
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
            </>
          )}
        </div>
      </div>

      {/* Browse All Prompts Section */}
      <div className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Explore our complete library of 50+ prompts
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="dc-button-primary">
                <Link to={browseAllUrl} className="flex items-center gap-2">
                  {browseAllText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <SubmitPromptButton 
                variant="outline" 
                size="lg"
                text="Submit your own prompt"
                showIcon={true}
              />
            </div>
          </div>
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
    </>
  );
};

export default Index;
