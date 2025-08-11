import { useState, useMemo } from 'react';
import { useCases as initialUseCases, UseCase } from '@/data/useCases';
import { UseCaseCard } from '@/components/UseCaseCard';
import { FilterControls } from '@/components/FilterControls';
import { SubmitUseCaseModal } from '@/components/SubmitUseCaseModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UseCaseDetailModal } from '@/components/UseCaseDetailModal';

export default function UseCases() {
  const [useCases, setUseCases] = useState<UseCase[]>(initialUseCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = (id: string) => {
    setUseCases(prev => 
      prev.map(useCase => 
        useCase.id === id 
          ? { ...useCase, votes: useCase.votes + 1 }
          : useCase
      )
    );
  };

  const handleSubmitUseCase = (newUseCase: UseCase) => {
    setUseCases(prev => [newUseCase, ...prev]);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedRole('All Roles');
    setSelectedDifficulty('All Difficulties');
  };

  const filteredAndSortedUseCases = useMemo(() => {
    let filtered = useCases.filter(useCase => {
      const matchesSearch = 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'All Categories' || useCase.category === selectedCategory;

      const matchesRole = 
        selectedRole === 'All Roles' || 
        useCase.targetRoles.includes(selectedRole) ||
        useCase.targetRoles.includes('Everyone');

      const matchesDifficulty = 
        selectedDifficulty === 'All Difficulties' || useCase.difficulty === selectedDifficulty;

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
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [useCases, searchTerm, selectedCategory, selectedRole, selectedDifficulty, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Desktop Commander Use Cases</h1>
                <p className="text-muted-foreground mt-1">
                  Discover and share powerful use cases for Desktop Commander
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SubmitUseCaseModal onSubmit={handleSubmitUseCase} />
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
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">

          {/* Filters */}
          <FilterControls
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedRole={selectedRole}
            selectedDifficulty={selectedDifficulty}
            sortBy={sortBy}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onRoleChange={setSelectedRole}
            onDifficultyChange={setSelectedDifficulty}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />

          {/* Use Cases Grid */}
          {filteredAndSortedUseCases.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                No use cases found matching your filters.
              </div>
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedUseCases.map((useCase) => (
                <UseCaseCard
                  key={useCase.id}
                  useCase={useCase}
                  onVote={handleVote}
                  onOpen={(uc) => { setSelectedUseCase(uc); setIsModalOpen(true); }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <UseCaseDetailModal
        useCase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVote={handleVote}
      />
    </div>
  );
}