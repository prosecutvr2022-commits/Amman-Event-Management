import React, { useState } from 'react';import { Sparkles } from 'lucide-react';import { getAssetUrl } from '../utils/assetHelper';

interface WeddingMandapArtworkProps {
  className?: string;
  title?: string;
}

export const WeddingMandapArtwork: React.FC<WeddingMandapArtworkProps> = ({ className = '', title }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      title={title || 'Grand Stage Decor & Full Coordination - Amman Event Management'}
    >
      {!hasError ? (
        <picture className="w-full h-full block">
          <source srcSet={getAssetUrl('images/section-image.webp')} type="image/webp" />
          <img
            src={getAssetUrl('images/section-image.png')}
            alt={title || 'Grand Stage Decor & Full Coordination'}
            className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
            loading="eager"
            decoding="async"
            onError={() => {
              console.warn('[WeddingMandapArtwork] /images/section-image.png load issue, switching to fallback');
              setHasError(true);
            }}
          />
        </picture>
      ) : (
        <picture className="w-full h-full block">
          <img
            src={getAssetUrl('web_wedding_img_1.png')}
            alt={title || 'Grand Stage Decor & Full Coordination'}
            className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
            loading="lazy"
            decoding="async"
            onError={() => {
              console.warn('[WeddingMandapArtwork] All wedding images failed');
            }}
          />
        </picture>
      )}
    </div>
  );
};
