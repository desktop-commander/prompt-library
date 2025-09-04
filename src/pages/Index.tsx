import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Users, Search, Heart, Zap } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCases, sessionTypeExplanations, categories } from '@/data/useCases';
import { PromptDetailModal } from '@/components/PromptDetailModal';
import { SubmitPromptButton } from '@/components/SubmitPromptButton';
import TestimonialsRow from '@/components/TestimonialsRow';
import { MainSiteHeader } from '@/components/MainSiteHeader';
import { PromptsPageFooter } from '@/components/PromptsPageFooter';
import { EngagementMeter } from '@/components/EngagementMeter';
import { CategoryFilter } from '@/components/CategoryFilter';
import { usePostHog } from '@/components/PostHogProvider';
import { DynamicMetaTags } from '@/components/DynamicMetaTags';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useCaseVotes, setUseCaseVotes] = useState({});
  
  // Session type display logic for cards (same as PromptCard component)
  // ⚠️ IMPORTANT: If you change this logic, also update it in src/components/PromptCard.tsx
  // This homepage uses INLINE card rendering, NOT the PromptCard component
  const getCardSessionTypeDisplay = (sessionType: string) => {
    switch (sessionType) {
      case 'Instant output':
        return { text: 'Instant', icon: Zap };
      case 'Step-by-step flow':
        return { text: 'Step-by-Step', icon: null };
      default:
        return { text: sessionType, icon: null };
    }
  };
  
  // Get initial role from URL parameter, default to 'For all'
  const initialRole = useMemo(() => {
    const roleParam = searchParams.get('role');
    return roleParam || 'For all';
  }, [searchParams]);
  
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const posthog = usePostHog();
  
  // Phase 3: Track page load time for performance monitoring
  useEffect(() => {
    window.pageLoadTime = new Date().getTime();
  }, []);
  
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
  
  // Sync role state with URL parameter changes (for back/forward navigation and direct links)
  useEffect(() => {
    const roleParam = searchParams.get('role');
    const urlRole = roleParam || 'For all';
    if (urlRole !== selectedRole) {
      setSelectedRole(urlRole);
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
    { label: 'Prompts', value: '53+', icon: Code },
    { label: 'Community Votes', value: '2,000+', icon: Heart },
    { label: 'Categories', value: '10', icon: Search },
    { label: 'Active Users', value: '500+', icon: Users }
  ];

  // Default featured prompts: specific curated list
  const defaultFeaturedUseCases = useMemo(() => {
    const featuredTitles = [
      'Organise my Downloads folder',
      'Explain Codebase or Repository',  
      'Build A Feature from Scratch',
      'Set Up WordPress Environment',
      'Set Up Cloud Infrastructure',
      'Build and Deploy Landing Page',
      'Generate Docker Configuration',
      'Set Up Local Development Environment',
      'Extract Data from PDFs'
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

  // Featured categories for homepage
  const featuredCategories = ['All Categories', 'Explore codebase', 'Deploy', 'Write documentation', 'Automate tasks', 'Optimize workflow'];

  // Get available target roles from the entire library
  const availableRoles = useMemo(() => {
    const roles = new Set();
    useCases.forEach(uc => {
      uc.targetRoles.forEach(role => roles.add(role));
    });
    return ['For all', ...Array.from(roles).sort()];
  }, []);

  // Filter prompts by selected role and category
  const filteredByRole = useMemo(() => {
    let filtered = useCases;
    
    // Filter by role first
    if (selectedRole !== 'For all') {
      filtered = filtered.filter(uc => uc.targetRoles.includes(selectedRole));
    }
    
    // Then filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(uc => uc.categories && uc.categories.includes(selectedCategory));
    }
    
    // If both filters are default, show curated featured prompts
    if (selectedRole === 'For all' && selectedCategory === 'All Categories') {
      return defaultFeaturedUseCases;
    }
    
    // Otherwise sort by usage and limit to 9
    const sorted = filtered
      .sort((a, b) => {
        // Primary sort: usage count (gaClicks) descending
        if (b.gaClicks !== a.gaClicks) {
          return b.gaClicks - a.gaClicks;
        }
        // Tie-breaker: alphabetical by title
        return a.title.localeCompare(b.title);
      })
      .slice(0, 9);
    
    return sorted;
  }, [selectedRole, selectedCategory, defaultFeaturedUseCases]);

  // Set fire emoji for specific featured prompts
  const hotIds = new Set(
    (selectedRole === 'For all' && selectedCategory === 'All Categories') 
      ? [
          defaultFeaturedUseCases[0], // Organise my Downloads folder
          defaultFeaturedUseCases[3], // Set Up WordPress Environment
          defaultFeaturedUseCases[7], // Set Up Local Development Environment
          defaultFeaturedUseCases[8]  // Extract Data from PDFs
        ].filter(Boolean).map((u) => u.id)
      : (selectedCategory === 'Deploy')
      ? [
          defaultFeaturedUseCases[3], // Set Up WordPress Environment
          defaultFeaturedUseCases[4], // Set Up Cloud Infrastructure
          defaultFeaturedUseCases[6]  // Generate Docker Configuration (Optimize Docker Setup)
        ].filter(Boolean).map((u) => u.id)
      : (selectedCategory === 'Explore codebase')
      ? [
          useCases.find(uc => uc.title === 'Explain Codebase or Repository'),
          useCases.find(uc => uc.title === 'Explain React Component Architecture'),
          useCases.find(uc => uc.title === 'Compare Config Files to Baseline')
        ].filter(Boolean).map((u) => u.id)
      : (selectedCategory === 'Write documentation')
      ? [
          useCases.find(uc => uc.title === 'Create Project Documentation'),
          useCases.find(uc => uc.title === 'Create Database Schema Diagram')
        ].filter(Boolean).map((u) => u.id)
      : (selectedCategory === 'Automate tasks')
      ? [
          useCases.find(uc => uc.title === 'Extract Data from PDFs'),
          useCases.find(uc => uc.title === 'Convert HEIC to PNG'),
          useCases.find(uc => uc.title === 'Automate Competitor Research')
        ].filter(Boolean).map((u) => u.id)
      : (selectedCategory === 'Optimize workflow')
      ? [
          useCases.find(uc => uc.title === 'Create folder with images'),
          useCases.find(uc => uc.title === 'Create Knowledge Base Folder'),
          useCases.find(uc => uc.title === 'Convert EDOC to DOC')
        ].filter(Boolean).map((u) => u.id)
      : [] // No fire emojis for other filtered results
  );

  // Dynamic Browse All button text and URL
  const browseAllText = useMemo(() => {
    if (selectedRole === 'For all' && selectedCategory === 'All Categories') {
      return 'Browse All Prompts';
    } else if (selectedRole !== 'For all' && selectedCategory !== 'All Categories') {
      return `Browse All ${selectedRole} ${selectedCategory} Prompts`;
    } else if (selectedRole !== 'For all') {
      return `Browse All ${selectedRole} Prompts`;
    } else {
      return `Browse All ${selectedCategory} Prompts`;
    }
  }, [selectedRole, selectedCategory]);

  const browseAllUrl = useMemo(() => {
    if (selectedRole === 'For all' && selectedCategory === 'All Categories') {
      return '/prompts';
    }
    
    // Build URL with filters
    const params = new URLSearchParams();
    if (selectedRole !== 'For all') {
      params.set('role', selectedRole);
    }
    // Note: We'll need to implement category filtering in the prompts page if needed
    
    return `/prompts?${params.toString()}`;
  }, [selectedRole, selectedCategory]);

  // Always display the filtered prompts
  const displayedUseCases = filteredByRole;

  const handleUseCaseClick = (useCase) => {
    // Get viral session info if available
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;
    
    // Track prompt click with enhanced metadata including current filter context
    posthog.capture('prompt_clicked', {
      prompt_id: useCase.id,
      prompt_title: useCase.title,
      prompt_categories: useCase.categories,
      prompt_session_type: useCase.sessionType,
      prompt_author: useCase.author,
      target_roles: useCase.targetRoles,
      // Current filter context
      current_role_filter: selectedRole,
      current_category_filter: selectedCategory,
      source_page: 'homepage',
      // Phase 3: Viral tracking data
      is_viral_session: !!viralInfo,
      viral_entry_prompt: viralInfo?.prompt_id,
      viral_referrer: viralInfo?.referrer,
      time_since_viral_entry: viralInfo ? 
        Math.round((new Date().getTime() - new Date(viralInfo.entry_time).getTime()) / 1000) : null
    });
    
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
    // Update URL with prompt ID while preserving role filter
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('i', useCase.id);
    setSearchParams(newSearchParams);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUseCase(null);
    // Remove only the prompt ID while preserving role filter
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('i');
    setSearchParams(newSearchParams);
  };

  const handleVote = (id) => {
    const useCase = useCases.find(uc => uc.id === id);
    
    // Track vote
    posthog.capture('prompt_voted', {
      prompt_id: id,
      prompt_title: useCase?.title,
      prompt_categories: useCase?.categories,
      source_page: 'homepage'
    });
    
    setUseCaseVotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleRoleChange = (role: string) => {
    // Get visitor info for enhanced tracking
    const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;
    
    // Track role filter change with enhanced metadata
    posthog.capture('role_filter_changed', {
      previous_role: selectedRole,
      new_role: role,
      current_category: selectedCategory,
      source_page: 'homepage',
      // Phase 3: Enhanced tracking
      visit_count: visitCount,
      is_returning_user: visitCount > 1,
      is_viral_session: !!viralInfo,
      session_duration_seconds: viralInfo ? 
        Math.round((new Date().getTime() - new Date(viralInfo.entry_time).getTime()) / 1000) : null
    });
    
    setSelectedRole(role);
    
    // Update URL to reflect selected role (without page navigation)
    const newSearchParams = new URLSearchParams(searchParams);
    if (role === 'For all') {
      // Remove role parameter for default state
      newSearchParams.delete('role');
    } else {
      // Set role parameter
      newSearchParams.set('role', role);
    }
    
    // Preserve any existing modal parameters (like 'i' for prompt modals)
    const currentPromptId = searchParams.get('i');
    if (currentPromptId) {
      newSearchParams.set('i', currentPromptId);
    }
    
    // Update URL without navigation
    setSearchParams(newSearchParams, { replace: true });
  };

  const handleCategoryChange = (category: string) => {
    // Get visitor info for enhanced tracking
    const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;
    
    // Track category filter change
    posthog.capture('category_filter_changed', {
      previous_category: selectedCategory,
      new_category: category,
      current_role: selectedRole,
      source_page: 'homepage',
      visit_count: visitCount,
      is_returning_user: visitCount > 1,
      is_viral_session: !!viralInfo,
      session_duration_seconds: viralInfo ? 
        Math.round((new Date().getTime() - new Date(viralInfo.entry_time).getTime()) / 1000) : null
    });
    
    setSelectedCategory(category);
  };

  return (
    <>
      <MainSiteHeader />
      
      <div className="min-h-screen bg-background mt-20">
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
              
              {/* Primary Filter: Category buttons (prominent) */}
              <CategoryFilter 
                categories={featuredCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              
              {/* Secondary Filter: Role links (subtle) */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {availableRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`
                        text-sm transition-colors duration-200 hover:text-foreground
                        ${selectedRole === role 
                          ? "text-foreground font-medium underline underline-offset-2" 
                          : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Prompts - No separate heading */}
        <div className="pb-20">
          <div className="container mx-auto px-4 max-w-6xl">
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
                            <CardTitle className="text-base leading-snug mb-2 min-h-[2.5rem] flex items-start">{useCase.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-foreground/70 border-foreground/20 bg-transparent font-normal whitespace-nowrap">
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
                          <div className="flex items-center gap-2 shrink-0">
                            <EngagementMeter count={useCase.votes + (useCaseVotes[useCase.id] || 0)} size="sm" showLabel={false} />
                            {hotIds.has(useCase.id) && (
                              <span aria-label="Hot prompt" title="Hot prompt" className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px]">🔥</span>
                            )}
                          </div>
                        </div>

                      </CardHeader>
                      <CardContent>
                        <CardDescription className="leading-relaxed text-sm">
                          {useCase.description}
                        </CardDescription>

                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Browse All Prompts Section */}
        <div className="pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
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
              <p className="text-muted-foreground mt-2">
                Explore our complete library of 50+ prompts
              </p>
            </div>
          </div>
        </div>

        <section id="testimonials" aria-label="Testimonials">
          <TestimonialsRow />
        </section>

        {/* CTA Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Found Something That Works? Share It!
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers contributing to the Desktop Commander community
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <SubmitPromptButton 
                  variant="default" 
                  size="lg"
                  text="Submit Your Prompt"
                  showIcon={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PromptsPageFooter />

      <PromptDetailModal
        useCase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onVote={handleVote}
      />
      
      <DynamicMetaTags 
        useCase={selectedUseCase} 
        isPromptPage={isModalOpen && !!selectedUseCase} 
      />
    </>
  );
};

export default Index;
