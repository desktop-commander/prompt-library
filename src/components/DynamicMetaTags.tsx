import { useEffect } from 'react';
import { UseCase } from '@/data/useCases';

interface DynamicMetaTagsProps {
  useCase?: UseCase | null;
  isPromptPage?: boolean;
}

export const DynamicMetaTags = ({ useCase, isPromptPage }: DynamicMetaTagsProps) => {
  useEffect(() => {
    // Get existing meta tags
    const titleElement = document.querySelector('title');
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
    const canonicalLink = document.querySelector('link[rel="canonical"]');

    // Store original values
    const originalTitle = titleElement?.textContent || '';
    const originalDescription = descriptionMeta?.getAttribute('content') || '';
    const originalOgTitle = ogTitleMeta?.getAttribute('content') || '';
    const originalOgDescription = ogDescriptionMeta?.getAttribute('content') || '';
    const originalOgUrl = ogUrlMeta?.getAttribute('content') || '';
    const originalCanonical = canonicalLink?.getAttribute('href') || '';

    if (useCase && isPromptPage) {
      // Dynamic meta tags for individual prompts
      const promptTitle = `${useCase.title} - Desktop Commander Automation Template`;
      const promptDescription = `${useCase.description} Session Type: ${useCase.sessionType}. Categories: ${useCase.categories.join(', ')}. AI automation template for Desktop Commander.`;
      const promptUrl = `https://library.desktopcommander.app/?i=${useCase.id}`;

      // Update title
      if (titleElement) {
        titleElement.textContent = promptTitle;
      }

      // Update description
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', promptDescription);
      }

      // Update Open Graph tags
      if (ogTitleMeta) {
        ogTitleMeta.setAttribute('content', promptTitle);
      }
      if (ogDescriptionMeta) {
        ogDescriptionMeta.setAttribute('content', promptDescription);
      }
      if (ogUrlMeta) {
        ogUrlMeta.setAttribute('content', promptUrl);
      }

      // Update Twitter tags
      if (twitterTitleMeta) {
        twitterTitleMeta.setAttribute('content', promptTitle);
      }
      if (twitterDescriptionMeta) {
        twitterDescriptionMeta.setAttribute('content', promptDescription);
      }

      // Update canonical URL
      if (canonicalLink) {
        canonicalLink.setAttribute('href', promptUrl);
      }

      // Add structured data for the specific prompt
      const existingScript = document.querySelector('#prompt-structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = 'prompt-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": useCase.title,
        "description": useCase.description,
        "image": "https://library.desktopcommander.app/logo.png",
        "url": promptUrl,
        "author": {
          "@type": "Organization",
          "name": "Desktop Commander MCP Team",
          "url": "https://desktopcommander.app/"
        },
        "step": {
          "@type": "HowToStep",
          "name": `Use this prompt with Desktop Commander`,
          "text": useCase.prompt,
          "tool": {
            "@type": "SoftwareApplication",
            "name": "Desktop Commander MCP",
            "url": "https://desktopcommander.app/"
          }
        },
        "totalTime": "PT5M",
        "sessionType": useCase.sessionType,
        "keywords": `${useCase.categories.join(', ')}, ${useCase.targetRoles.join(', ')}, Desktop Commander, AI automation`,
        "aggregateRating": useCase.votes > 0 ? {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "ratingCount": useCase.votes.toString()
        } : undefined
      });
      document.head.appendChild(script);
    } else {
      // Restore original meta tags when not on a prompt page
      if (titleElement && originalTitle) {
        titleElement.textContent = originalTitle;
      }
      if (descriptionMeta && originalDescription) {
        descriptionMeta.setAttribute('content', originalDescription);
      }
      if (ogTitleMeta && originalOgTitle) {
        ogTitleMeta.setAttribute('content', originalOgTitle);
      }
      if (ogDescriptionMeta && originalOgDescription) {
        ogDescriptionMeta.setAttribute('content', originalOgDescription);
      }
      if (ogUrlMeta && originalOgUrl) {
        ogUrlMeta.setAttribute('content', originalOgUrl);
      }
      if (canonicalLink && originalCanonical) {
        canonicalLink.setAttribute('href', originalCanonical);
      }

      // Remove prompt-specific structured data
      const promptScript = document.querySelector('#prompt-structured-data');
      if (promptScript) {
        promptScript.remove();
      }
    }

    // Cleanup function to restore original values on unmount
    return () => {
      if (titleElement && originalTitle) {
        titleElement.textContent = originalTitle;
      }
      if (descriptionMeta && originalDescription) {
        descriptionMeta.setAttribute('content', originalDescription);
      }
      if (ogTitleMeta && originalOgTitle) {
        ogTitleMeta.setAttribute('content', originalOgTitle);
      }
      if (ogDescriptionMeta && originalOgDescription) {
        ogDescriptionMeta.setAttribute('content', originalOgDescription);
      }
      if (ogUrlMeta && originalOgUrl) {
        ogUrlMeta.setAttribute('content', originalOgUrl);
      }
      if (canonicalLink && originalCanonical) {
        canonicalLink.setAttribute('href', originalCanonical);
      }

      const promptScript = document.querySelector('#prompt-structured-data');
      if (promptScript) {
        promptScript.remove();
      }
    };
  }, [useCase, isPromptPage]);

  return null;
};
