import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, Code, Users, Search, Heart, Clock, Shield, User, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCases } from '@/data/useCases';
import { UseCaseDetailModal } from '@/components/UseCaseDetailModal';
import { SubmitUseCaseModal } from '@/components/SubmitUseCaseModal';
import TestimonialsRow from '@/components/TestimonialsRow';
import { formatCompactNumber } from '@/lib/utils';

const Index = () => {
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useCaseVotes, setUseCaseVotes] = useState({});

  const stats = [
    { label: 'Use Cases', value: '15+', icon: Code },
    { label: 'Community Votes', value: '2,000+', icon: Heart },
    { label: 'Categories', value: '12', icon: Search },
    { label: 'Active Users', value: '500+', icon: Users }
  ];

  // Featured use cases: top 6 by popularity
  const featuredUseCases = useCases
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 6);
  const hotIds = new Set(featuredUseCases.slice(0, 2).map((u) => u.id));

  const handleUseCaseClick = (useCase) => {
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
  };

  const handleVote = (id) => {
    setUseCaseVotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleSubmitUseCase = (newUseCase) => {
    // In a real app, this would save to a backend
    console.log('New use case submitted:', newUseCase);
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Desktop Commander
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Use Case Library
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover powerful AI workflows and automation prompts for Desktop Commander
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="dc-button-primary">
                <Link to="/use-cases" className="flex items-center gap-2">
                  Browse All Use Cases
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <SubmitUseCaseModal onSubmit={handleSubmitUseCase} />
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

      {/* Featured Use Cases */}
      <div className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground">Featured Use Cases</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredUseCases.map((useCase) => (
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
                    <div className="flex-1">
                      <CardTitle className="text-base leading-tight">{useCase.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-foreground/70 border-foreground/20 bg-transparent font-normal">
                          {useCase.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{useCase.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1.5">
                        <Rocket className="h-4 w-4 text-primary" />
                        <span className="text-xs sm:text-sm">{formatCompactNumber(useCase.votes + (useCaseVotes[useCase.id] || 0))}</span>
                        <span className="hidden sm:inline text-xs sm:text-sm">tried</span>
                      </Badge>
                      {hotIds.has(useCase.id) && (
                        <span aria-label="Hot use case" title="Hot use case" className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px]">🔥</span>
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
              <Link to="/use-cases" className="flex items-center gap-2">
                Browse Library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsRow />

      <UseCaseDetailModal
        useCase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
                  Explore Use Cases
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
