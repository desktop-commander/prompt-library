import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, Code, Users, Search, Heart, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCases } from '@/data/useCases';

const Index = () => {
  const stats = [
    { label: 'Use Cases', value: '15+', icon: Code },
    { label: 'Community Votes', value: '2,000+', icon: Heart },
    { label: 'Categories', value: '12', icon: Search },
    { label: 'Active Users', value: '500+', icon: Users }
  ];

  // Get top 10 most popular use cases
  const popularUseCases = useCases
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 10);

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16">
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
              Discover powerful AI workflows and automation prompts for Desktop Commander. 
              Browse, filter, and copy proven use cases from the community.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="dc-button-primary">
                <Link to="/use-cases" className="flex items-center gap-2">
                  Browse Use Cases
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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

      {/* Stats Section */}
      <div className="py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Use Cases */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Most Popular Use Cases</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Top-voted use cases from our community - ready to copy and use with Desktop Commander
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {popularUseCases.map((useCase) => (
              <Card key={useCase.id} className="dc-card">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-base leading-tight">{useCase.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={`difficulty-badge ${getDifficultyClass(useCase.difficulty)}`}>
                          {useCase.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{useCase.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{useCase.votes}</span>
                    </div>
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
                View All Use Cases
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

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
