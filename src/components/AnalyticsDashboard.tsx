import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';
import { BarChart3, TrendingUp, Users, Download } from 'lucide-react';

export function AnalyticsDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      // Check for special key combination (Ctrl+Shift+A)
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
          setShowDashboard(!showDashboard);
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [showDashboard]);

  useEffect(() => {
    if (showDashboard) {
      setSummary(analytics.getSummary());
    }
  }, [showDashboard]);

  const exportData = () => {
    const data = analytics.getStoredEvents();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${new Date().toISOString()}.json`;
    a.click();
  };

  if (!showDashboard || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="shadow-lg border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics Dashboard (Dev)
            </span>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setShowDashboard(false)}
            >
              ✕
            </Button>
          </CardTitle>
          <CardDescription>
            Press Ctrl+Shift+A to toggle this panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {summary && (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-2xl font-bold">{summary.totalEvents}</div>
                  <div className="text-xs text-muted-foreground">Total Events</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-2xl font-bold">
                    {Object.keys(summary.eventCounts).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Event Types</div>
                </div>
              </div>

              {/* Event Counts */}
              <div>
                <h4 className="text-sm font-medium mb-2">Event Breakdown</h4>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {Object.entries(summary.eventCounts)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .map(([event, count]) => (
                      <div key={event} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{event}</span>
                        <span className="font-mono">{count}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Recent Events */}
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Events</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {summary.mostRecent.slice(0, 5).map((event: any, i: number) => (
                    <div key={i} className="text-xs text-muted-foreground">
                      <span className="font-mono">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                      {' - '}
                      <span>{event.eventName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setSummary(analytics.getSummary())}
                >
                  Refresh
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={exportData}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
