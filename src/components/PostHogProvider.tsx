import { createContext, useContext, useEffect, ReactNode } from 'react';
import posthog from 'posthog-js';

// Initialize PostHog
if (typeof window !== 'undefined') {
  const options = {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: '2025-05-24',
    person_profiles: 'identified_only',
    loaded: (posthog) => {
      if (import.meta.env.DEV) console.log('PostHog loaded');
    }
  };
  
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, options);
}

const PostHogContext = createContext(posthog);

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // Track page views automatically
    const handleRouteChange = () => {
      posthog.capture('$pageview');
    };

    // Listen for browser navigation
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
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
