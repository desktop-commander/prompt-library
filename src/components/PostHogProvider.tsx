import { createContext, useContext, useEffect, ReactNode } from 'react';
import posthog from 'posthog-js';

const PostHogContext = createContext(posthog);

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // Initialize PostHog only once when component mounts
    if (typeof window !== 'undefined' && !posthog.__loaded) {
      const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || 'phc_o3XE6MCo4vR8cnlszJy7kpPSiYwS7vx52wgR2ucsm8O';
      const apiHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';
      
      console.log('PostHog Init - API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'MISSING');
      console.log('PostHog Init - API Host:', apiHost);
      
      posthog.init(apiKey, {
        api_host: apiHost,
        debug: import.meta.env.DEV,
        capture_pageview: true, // Enable automatic pageview tracking
        capture_pageleave: true, // Enable automatic pageleave tracking
        capture_performance: {
          web_vitals_allowed_metrics: ['LCP', 'CLS', 'FCP', 'INP'], // Enable all web vitals metrics
          web_vitals_max_value: 900000, // 15 minutes in ms (default)
          web_vitals_delayed_flush_ms: 5000 // 5 second delay (default)
        },
        disable_session_recording: true, // Simplify setup
        loaded: (posthog) => {
          console.log('PostHog loaded successfully!');
          
          // Send a simple test event
          posthog.capture('posthog_initialized', {
            timestamp: new Date().toISOString(),
            environment: import.meta.env.DEV ? 'development' : 'production',
            url: window.location.href
          });
          
          console.log('PostHog test event sent!');
        }
      });
    }
  }, []);

  return (
    <PostHogContext.Provider value={posthog}>
      {children}
    </PostHogContext.Provider>
  );
}

export const usePostHog = () => {
  return useContext(PostHogContext);
};

export default posthog;
