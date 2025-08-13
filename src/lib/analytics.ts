// Analytics utility for tracking user interactions
// This can be integrated with Google Analytics, Mixpanel, Posthog, etc.

interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private queue: AnalyticsEvent[] = [];
  private isInitialized = false;

  init() {
    // Initialize your analytics provider here
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      this.isInitialized = true;
      console.log('Analytics initialized');
    }

    // Process any queued events
    this.processQueue();
  }

  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventName,
      properties,
      timestamp: Date.now()
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, properties);
    }

    // Store in localStorage for debugging
    this.storeEventLocally(event);

    // Send to analytics provider if initialized
    if (this.isInitialized && typeof window !== 'undefined') {
      // Google Analytics 4
      if ((window as any).gtag) {
        (window as any).gtag('event', eventName, {
          ...properties,
          event_category: 'Prompt Library',
          event_timestamp: event.timestamp
        });
      }

      // Add other providers here (Mixpanel, Amplitude, etc.)
    } else {
      // Queue event if not initialized
      this.queue.push(event);
    }
  }

  // Store events locally for debugging and analysis
  private storeEventLocally(event: AnalyticsEvent) {
    try {
      const storedEvents = localStorage.getItem('dc_analytics_events');
      const events = storedEvents ? JSON.parse(storedEvents) : [];
      
      // Keep only last 100 events
      if (events.length >= 100) {
        events.shift();
      }
      
      events.push(event);
      localStorage.setItem('dc_analytics_events', JSON.stringify(events));
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }

  // Process queued events
  private processQueue() {
    if (this.isInitialized && this.queue.length > 0) {
      this.queue.forEach(event => {
        this.track(event.eventName, event.properties);
      });
      this.queue = [];
    }
  }

  // Get stored analytics for debugging
  getStoredEvents(): AnalyticsEvent[] {
    try {
      const stored = localStorage.getItem('dc_analytics_events');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Get analytics summary
  getSummary() {
    const events = this.getStoredEvents();
    const summary: Record<string, number> = {};
    
    events.forEach(event => {
      summary[event.eventName] = (summary[event.eventName] || 0) + 1;
    });
    
    return {
      totalEvents: events.length,
      eventCounts: summary,
      mostRecent: events.slice(-10).reverse()
    };
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    analytics.init();
  });
}

// Export specific tracking functions for convenience
export const trackPromptView = (promptId: string, title: string) => {
  analytics.track('prompt_viewed', { prompt_id: promptId, title });
};

export const trackPromptVote = (promptId: string, title: string) => {
  analytics.track('prompt_voted', { prompt_id: promptId, title });
};

export const trackPromptCopied = (promptId: string, title: string, client: string) => {
  analytics.track('prompt_copied', { prompt_id: promptId, title, client });
};

export const trackInstallationStatus = (hasInstalled: boolean) => {
  analytics.track('dc_installation_status', { has_installed: hasInstalled });
};

export const trackClientSelection = (client: string) => {
  analytics.track('dc_client_selected', { client });
};

export const trackWizardCompletion = (promptId: string, skippedSteps: boolean) => {
  analytics.track('wizard_completed', { prompt_id: promptId, skipped_steps: skippedSteps });
};
