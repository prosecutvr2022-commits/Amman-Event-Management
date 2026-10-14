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

  if (fallbackPath) {
    const resolvedFallback = getAssetUrl(fallbackPath);
    // Avoid infinite error loop if fallback itself fails
    if (target.src !== resolvedFallback && !target.dataset.fallbackTried) {
      target.dataset.fallbackTried = 'true';
      target.src = resolvedFallback;
      return;
    }
  }

  // If no fallback or fallback also failed, ensure broken image styling is graceful
  target.style.display = target.dataset.fallbackTried ? 'none' : target.style.display;
}

export default {
  getAssetUrl,
  handleImageErrorFallback,
};
