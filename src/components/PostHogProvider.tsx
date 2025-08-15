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
      const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || 'phc_o3XE6MCo4vR8cnlszJv7kpP5iYwS7vx52wqR2ucsm80';
      const apiHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';
      
      console.log('PostHog Init - API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'MISSING');
      console.log('PostHog Init - API Host:', apiHost);
      
      posthog.init(apiKey, {
        api_host: apiHost,
        debug: import.meta.env.DEV,
        capture_pageview: true, // Enable automatic pageview tracking
        capture_pageleave: true, // Enable automatic pageleave tracking
        loaded: (posthog) => {
          console.log('PostHog loaded successfully!');
          
          // Track app initialization
          posthog.capture('app_loaded', {
            environment: import.meta.env.DEV ? 'development' : 'production',
            url: window.location.href
          });
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
