import { useState, useMemo, useEffect } from 'react';
import { useCases as initialUseCases, UseCase } from '@/data/useCases';
import { PromptCard } from '@/components/PromptCard';
import { FilterControls } from '@/components/FilterControls';
import { SubmitPromptButton } from '@/components/SubmitPromptButton';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PromptDetailModal } from '@/components/PromptDetailModal';
import { MainSiteHeader } from '@/components/MainSiteHeader';
import { PromptsPageFooter } from '@/components/PromptsPageFooter';
import { usePostHog } from '@/components/PostHogProvider';

export default function Prompts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const posthog = usePostHog();
  
  // Phase 3: Track page load time for performance monitoring
  useEffect(() => {
    window.pageLoadTime = new Date().getTime();
  }, []);
  
  // Get initial role filter from URL parameter
  const initialRoleFilter = useMemo(() => {
    const roleParam = searchParams.get('role');
    return roleParam ? [roleParam] : [];
  }, [searchParams]);
  
  const [useCases, setUseCases] = useState<UseCase[]>(initialUseCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoleFilter);
  const [selectedSessionTypes, setSelectedSessionTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  
  // Featured prompts - shown first when no filters are applied
  const featuredPromptIds = ['8', '59', '2', '55', '53', '82', '78', '4', '43'];
  
  const initialSelected = (() => {
    const id = searchParams.get('i') || new URLSearchParams(window.location.search).get('i');
    return initialUseCases.find((u) => u.id === id) || null;
  })();
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(initialSelected);
  const [isModalOpen, setIsModalOpen] = useState(!!initialSelected);
  
  // Phase 3: Viral tracking detection - check if user came from shared link
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const promptId = urlParams.get('i');
    
    if (promptId) {
      // Check for UTM parameters indicating this is from a share
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');
      
      if (utmSource === 'style_scout' && utmCampaign === 'prompt_sharing') {
        // This is from our share system - trigger viral tracking
        const referrer = document.referrer;
        const sharedAt = urlParams.get('shared_at');
        
        posthog.capture('viral_link_visit', {
          prompt_id: promptId,
          referrer: referrer,
          is_direct_link: !referrer || referrer === '',
          source_domain: referrer ? new URL(referrer).hostname : 'direct',
          timestamp: new Date().toISOString(),
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_content: urlParams.get('utm_content'),
          share_source_type: utmMedium,
          shared_at: sharedAt,
          share_age_seconds: sharedAt ? Math.round((Date.now() - parseInt(sharedAt)) / 1000) : null,
          is_official_share: true,
          page: 'prompts'
        });
        
        // Store viral session info
        localStorage.setItem('style_scout_viral_session', JSON.stringify({
          prompt_id: promptId,
          entry_time: new Date().toISOString(),
          referrer: referrer,
          share_source_type: utmMedium,
          utm_source: utmSource,
          utm_medium: utmMedium,
          shared_at: sharedAt,
          is_official_share: true
        }));
      }
    }
  }, [searchParams, posthog]);
  
  const handleVote = (id: string) => {
    setUseCases(prev => 
      prev.map(useCase => 
        useCase.id === id 
          ? { ...useCase, votes: useCase.votes + 1 }
          : useCase
      )
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedRoles([]);
    setSelectedSessionTypes([]);
  };

  const filteredAndSortedUseCases = useMemo(() => {
    let filtered = useCases.filter(useCase => {
      const matchesSearch = 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.prompt.toLowerCase().includes(searchTerm.toLowerCase());

      // For categories: show all if none selected, otherwise match any selected
      const matchesCategory = 
        selectedCategories.length === 0 || 
        useCase.categories.some(cat => selectedCategories.includes(cat));

      // For roles: show all if none selected, otherwise match if any role matches
      const matchesRole = 
        selectedRoles.length === 0 || 
        useCase.targetRoles.some(role => selectedRoles.includes(role));

      // For difficulty: show all if none selected, otherwise match any selected
      const matchesSessionType = 
        selectedSessionTypes.length === 0 || 
        selectedSessionTypes.includes(useCase.sessionType);

      return matchesSearch && matchesCategory && matchesRole && matchesSessionType;
    });

    // Check if we should show featured prompts (no filters applied)
    const noFiltersApplied = searchTerm === '' && 
                           selectedCategories.length === 0 && 
                           selectedRoles.length === 0 && 
                           selectedSessionTypes.length === 0;

    // Sort the filtered results
    filtered.sort((a, b) => {
      // If no filters are applied and sorting is NOT by popularity, prioritize featured prompts
      if (noFiltersApplied && sortBy !== 'popularity') {
        const aIsFeatured = featuredPromptIds.includes(a.id);
        const bIsFeatured = featuredPromptIds.includes(b.id);
        
        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;
        
        // If both are featured, maintain their featured order
        if (aIsFeatured && bIsFeatured) {
          const aIndex = featuredPromptIds.indexOf(a.id);
          const bIndex = featuredPromptIds.indexOf(b.id);
          return aIndex - bIndex;
        }
      }

      // Apply regular sorting (including when popularity is selected)
      switch (sortBy) {
        case 'popularity':
          return b.gaClicks - a.gaClicks;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'sessionType':
          const sessionTypeOrder = { 'Instant output': 1, 'Step-by-step flow': 2 };
          return sessionTypeOrder[a.sessionType] - sessionTypeOrder[b.sessionType];
        case 'recent':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [useCases, searchTerm, selectedCategories, selectedRoles, selectedSessionTypes, sortBy]);

  const handleUseCaseClick = (useCase: UseCase) => {
    // Get viral session info if available
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;
    
    // Track prompt click with enhanced metadata including current role filters
    posthog.capture('prompt_clicked', {
      prompt_id: useCase.id,
      prompt_title: useCase.title,
      prompt_categories: useCase.categories,
      prompt_session_type: useCase.sessionType,
      prompt_author: useCase.author,
      target_roles: useCase.targetRoles,
      // Current filter context
      current_role_filters: selectedRoles.length > 0 ? selectedRoles : ['All'],
      current_category_filters: selectedCategories,
      current_session_type_filters: selectedSessionTypes,
      search_term: searchTerm || null,
      sort_by: sortBy,
      source_page: 'prompts',
      // Phase 3: Viral tracking data
      is_viral_session: !!viralInfo,
      viral_entry_prompt: viralInfo?.prompt_id,
      viral_referrer: viralInfo?.referrer,
      time_since_viral_entry: viralInfo ? 
        Math.round((new Date().getTime() - new Date(viralInfo.entry_time).getTime()) / 1000) : null
    });
    
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
    setSearchParams({ i: useCase.id });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchParams({});
  };

  const handleRoleChange = (newRoles: string[]) => {
    // Get viral session info if available
    const visitCount = parseInt(localStorage.getItem('style_scout_visit_count') || '0');
    const viralSession = localStorage.getItem('style_scout_viral_session');
    const viralInfo = viralSession ? JSON.parse(viralSession) : null;
    
    // Track role filter change with enhanced metadata
    posthog.capture('role_filter_changed', {
      previous_roles: selectedRoles,
      new_roles: newRoles,
      current_categories: selectedCategories,
      current_session_types: selectedSessionTypes,
      search_term: searchTerm || null,
      sort_by: sortBy,
      source_page: 'prompts',
      // Phase 3: Enhanced tracking
      visit_count: visitCount,
      is_viral_session: !!viralInfo,
      viral_entry_prompt: viralInfo?.prompt_id,
      viral_referrer: viralInfo?.referrer,
      time_since_viral_entry: viralInfo ? 
        Math.round((new Date().getTime() - new Date(viralInfo.entry_time).getTime()) / 1000) : null
    });
    
    setSelectedRoles(newRoles);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      <MainSiteHeader />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Prompt Library</h1>
              <p className="text-muted-foreground mt-2">
                Discover and share powerful prompts for Desktop Commander
              </p>
            </div>
            <div className="flex items-center gap-3">
              <SubmitPromptButton />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <FilterControls
            searchTerm={searchTerm}
            selectedCategories={selectedCategories}
            selectedRoles={selectedRoles}
            selectedSessionTypes={selectedSessionTypes}
            sortBy={sortBy}
            onSearchChange={setSearchTerm}
            onCategoriesChange={setSelectedCategories}
            onRolesChange={handleRoleChange}
            onSessionTypesChange={setSelectedSessionTypes}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
        </div>

        {filteredAndSortedUseCases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No prompts found matching your filters.
            </p>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedUseCases.map((useCase) => (
              <PromptCard
                key={useCase.id}
                useCase={useCase}
                onOpen={() => handleUseCaseClick(useCase)}
                onVote={() => handleVote(useCase.id)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {filteredAndSortedUseCases.length} of {useCases.length} prompts
        </div>
      </div>

      <PromptsPageFooter />

      <PromptDetailModal
        useCase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onVote={(id) => handleVote(id)}
      />
    </>
  );
}
