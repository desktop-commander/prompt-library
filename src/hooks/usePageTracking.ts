import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePostHog } from '@/components/PostHogProvider';

export function usePageTracking() {
  const location = useLocation();
  const posthog = usePostHog();

  useEffect(() => {
    // Track page view
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      pathname: location.pathname,
      search: location.search
    });
  }, [location, posthog]);
}
