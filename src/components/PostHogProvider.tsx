import { createContext, useContext, useEffect, ReactNode } from 'react';
import posthog from 'posthog-js';

const PostHogContext = createContext(posthog);

interface PostHogProviderProps {
  children: ReactNode;
}

// Phase 3: Advanced tracking utilities
function setupAdvancedTracking(posthog: any) {
  // 1. Viral tracking - detect users coming from shared links
  trackViralSource(posthog);
  
  // 2. Return visitor tracking - identify returning users
  trackReturnVisitor(posthog);
  
  // 3. Enhanced user identification
  setupUserIdentification(posthog);
}

function trackViralSource(posthog: any) {
  const urlParams = new URLSearchParams(window.location.search);
  const promptId = urlParams.get('i');
  const referrer = document.referrer;
  
  // Check if user came from a shared link
  if (promptId) {
    // Enhanced UTM and share tracking
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmContent = urlParams.get('utm_content');
    const sharedAt = urlParams.get('shared_at');
    
    // Determine share source type
    let shareSourceType = 'unknown';
    if (utmSource === 'style_scout' && utmMedium) {
      shareSourceType = utmMedium; // 'native_share', 'clipboard_copy', etc.
    } else if (utmMedium) {
      shareSourceType = utmMedium;
    }
    
    posthog.capture('viral_link_visit', {
      prompt_id: promptId,
      referrer: referrer,
      is_direct_link: !referrer || referrer === '',
      source_domain: referrer ? new URL(referrer).hostname : 'direct',
      timestamp: new Date().toISOString(),
      // Enhanced UTM tracking
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      // NEW: Share source analysis
      share_source_type: shareSourceType,
      shared_at: sharedAt,
      share_age_seconds: sharedAt ? Math.round((Date.now() - parseInt(sharedAt)) / 1000) : null,
      is_official_share: utmSource === 'style_scout' && utmCampaign === 'prompt_sharing'
    });
    
    // Store enhanced viral info in localStorage for session tracking
    localStorage.setItem('style_scout_viral_session', JSON.stringify({
      prompt_id: promptId,
      entry_time: new Date().toISOString(),
      referrer: referrer,
      share_source_type: shareSourceType,
      utm_source: utmSource,
      utm_medium: utmMedium,
      shared_at: sharedAt,
      is_official_share: utmSource === 'style_scout'
    }));
  }
}

function trackReturnVisitor(posthog: any) {
  const visitCountKey = 'style_scout_visit_count';
  const lastVisitKey = 'style_scout_last_visit';
  const firstVisitKey = 'style_scout_first_visit';
  
  // Get or initialize visit data
  let visitCount = parseInt(localStorage.getItem(visitCountKey) || '0');
  const lastVisit = localStorage.getItem(lastVisitKey);
  const firstVisit = localStorage.getItem(firstVisitKey) || new Date().toISOString();
  
  visitCount += 1;
  const currentVisit = new Date().toISOString();
  
  // Calculate days since last visit
  let daysSinceLastVisit = 0;
  if (lastVisit) {
    const lastVisitDate = new Date(lastVisit);
    const currentDate = new Date();
    daysSinceLastVisit = Math.floor((currentDate.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24));
  }
  
  // Determine visitor type
  let visitorType = 'new';
  if (visitCount > 1) {
    if (daysSinceLastVisit === 0) {
      visitorType = 'same_day_return';
    } else if (daysSinceLastVisit <= 7) {
      visitorType = 'recent_return';
    } else if (daysSinceLastVisit <= 30) {
      visitorType = 'monthly_return';
    } else {
      visitorType = 'long_term_return';
    }
  }
  
  // Track return visitor event
  posthog.capture('visitor_session_start', {
    visit_count: visitCount,
    visitor_type: visitorType,
    days_since_last_visit: daysSinceLastVisit,
    first_visit: firstVisit,
    last_visit: lastVisit,
    current_visit: currentVisit,
    is_returning_user: visitCount > 1
  });
  
  // Update stored values
  localStorage.setItem(visitCountKey, visitCount.toString());
  localStorage.setItem(lastVisitKey, currentVisit);
  localStorage.setItem(firstVisitKey, firstVisit);
}

function setupUserIdentification(posthog: any) {
  // Create or get persistent user ID
  const userIdKey = 'style_scout_user_id';
  let userId = localStorage.getItem(userIdKey);
  
  if (!userId) {
    // Generate unique user ID (timestamp + random)
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(userIdKey, userId);
  }
  
  // Set user properties
  posthog.identify(userId, {
    user_id: userId,
    created_at: localStorage.getItem('style_scout_first_visit'),
    browser: navigator.userAgent,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform
  });
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
        disable_session_recording: false, // Enable session recordings
        session_recording: {
          maskAllInputs: true, // Mask sensitive inputs for privacy
          maskAllText: false, // Keep text visible for UX insights
          recordCanvas: false, // Skip canvas recording for performance
          recordCrossOriginIframes: false, // Skip external iframes
          collectFonts: false, // Skip font collection for performance
        },
        persistence: 'localStorage+cookie', // Enable return visitor tracking
        cross_subdomain_cookie: false, // Single domain setup
        loaded: (posthog) => {
          console.log('PostHog loaded successfully!');
          
          // Phase 3: Advanced tracking setup
          setupAdvancedTracking(posthog);
          
          // Send initialization event
          posthog.capture('posthog_initialized', {
            timestamp: new Date().toISOString(),
            environment: import.meta.env.DEV ? 'development' : 'production',
            url: window.location.href,
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          });
          
          console.log('PostHog advanced tracking initialized!');
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
