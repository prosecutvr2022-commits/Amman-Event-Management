import React from 'react';

/**
 * Resolves public asset URLs cleanly across local development, Vite preview,
 * and production deployment environments (e.g., Netlify, Vercel, Cloud Run).
 *
 * @param path Relative path to the asset (e.g. 'hero_event_video.mp4' or 'images/works/work-1.webp')
 * @returns Fully resolved URL string for the asset
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';

  // Return absolute or data URLs as-is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading slash to normalize path
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  // Use Vite's BASE_URL if set, defaulting to '/'
  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${prefix}${normalizedPath}`;
}

/**
 * Handles image error events by seamlessly falling back to an alternate format (e.g. PNG if WebP fails)
 * or a placeholder, preventing infinite fallback loops.
 * Also clears sibling <source> elements in a <picture> container to allow the <img> fallback to display.
 *
 * @param event The SyntheticEvent from the img onError handler
 * @param fallbackPath The fallback image path or URL
 */
export function handleImageErrorFallback(
  event: React.SyntheticEvent<HTMLImageElement, Event> | Event,
  fallbackPath?: string
): void {
  const target = (event.currentTarget || event.target) as HTMLImageElement | null;
  if (!target) return;

  // Clear sibling <source> elements in <picture> so the browser respects the <img> src
  if (target.parentElement && target.parentElement.tagName.toLowerCase() === 'picture') {
    const sources = target.parentElement.querySelectorAll('source');
    sources.forEach((source) => {
      source.removeAttribute('srcset');
    });
  }

  // If fallbackPath provided, try it first
  if (fallbackPath) {
    const resolvedFallback = getAssetUrl(fallbackPath);
    if (target.src !== resolvedFallback && target.dataset.fallbackTried !== 'true') {
      target.dataset.fallbackTried = 'true';
      target.src = resolvedFallback;
      return;
    }
  }

  // Automatic extension fallback (.webp -> .png)
  if (target.src && target.src.includes('.webp') && target.dataset.webpFallbackTried !== 'true') {
    target.dataset.webpFallbackTried = 'true';
    target.src = target.src.replace(/\.webp(\?.*)?$/, '.png$1');
    return;
  }
}

export default {
  getAssetUrl,
  handleImageErrorFallback,
};
