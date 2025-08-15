import { createContext, useContext, useEffect, ReactNode } from 'react';
import posthog from 'posthog-js';

// Initialize PostHog
if (typeof window !== 'undefined') {
  const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  const apiHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;
  
  if (import.meta.env.DEV) {
    console.log('PostHog Init - API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'MISSING');
    console.log('PostHog Init - API Host:', apiHost);
  }
  
  const options = {
    api_host: apiHost,
    debug: import.meta.env.DEV,
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        console.log('PostHog loaded successfully!');
      }
      
      // Track app initialization
      posthog.capture('app_loaded', {
        environment: import.meta.env.DEV ? 'development' : 'production'
      });
    }
  };
  
  posthog.init(apiKey, options);
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
