import { useState, useMemo, useEffect } from 'react';
import { useCases as initialUseCases, UseCase } from '@/data/useCases';
import { PromptCard } from '@/components/PromptCard';
import { FilterControls } from '@/components/FilterControls';
import { SubmitPromptButton } from '@/components/SubmitPromptButton';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PromptDetailModal } from '@/components/PromptDetailModal';
import { SiteHeader } from '@/components/SiteHeader';

export default function Prompts() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial role filter from URL parameter
  const initialRoleFilter = useMemo(() => {
    const roleParam = searchParams.get('role');
    return roleParam ? [roleParam] : [];
  }, [searchParams]);
  
  const [useCases, setUseCases] = useState<UseCase[]>(initialUseCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoleFilter);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  
  const initialSelected = (() => {
    const id = searchParams.get('i') || new URLSearchParams(window.location.search).get('i');
    return initialUseCases.find((u) => u.id === id) || null;
  })();
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(initialSelected);
  const [isModalOpen, setIsModalOpen] = useState(!!initialSelected);
  
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
    setSelectedDifficulties([]);
  };

  const filteredAndSortedUseCases = useMemo(() => {
    let filtered = useCases.filter(useCase => {
      const matchesSearch = 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // For categories: show all if none selected, otherwise match any selected
      const matchesCategory = 
        selectedCategories.length === 0 || 
        selectedCategories.includes(useCase.category);

      // For roles: show all if none selected, otherwise match if any role matches
      const matchesRole = 
        selectedRoles.length === 0 || 
        useCase.targetRoles.some(role => selectedRoles.includes(role));

      // For difficulty: show all if none selected, otherwise match any selected
      const matchesDifficulty = 
        selectedDifficulties.length === 0 || 
        selectedDifficulties.includes(useCase.difficulty);

      return matchesSearch && matchesCategory && matchesRole && matchesDifficulty;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.votes - a.votes;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'difficulty':
          const difficultyOrder = { 'Simple': 1, 'Medium': 2, 'Complex': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'recent':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [useCases, searchTerm, selectedCategories, selectedRoles, selectedDifficulties, sortBy]);

  const handleUseCaseClick = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
    setSearchParams({ i: useCase.id });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchParams({});
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
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
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
              <Button variant="outline" asChild>
                <a
                  href="https://desktopcommander.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Visit Desktop Commander
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <FilterControls
            searchTerm={searchTerm}
            selectedCategories={selectedCategories}
            selectedRoles={selectedRoles}
            selectedDifficulties={selectedDifficulties}
            sortBy={sortBy}
            onSearchChange={setSearchTerm}
            onCategoriesChange={setSelectedCategories}
            onRolesChange={setSelectedRoles}
            onDifficultiesChange={setSelectedDifficulties}
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

      <PromptDetailModal
        useCase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onVote={(id) => handleVote(id)}
      />
    </>
  );
}
