import React from 'react';

interface WeddingMandapArtworkProps {
  className?: string;
  title?: string;
}

export const WeddingMandapArtwork: React.FC<WeddingMandapArtworkProps> = ({ className = '', title }) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      title={title || 'Grand Stage Decor & Full Coordination - Amman Event Management'}
    >
      <picture className="w-full h-full block">
        <source srcSet="/images/section-image.webp" type="image/webp" />
        <img
          src="/images/section-image.png"
          alt={title || 'Grand Stage Decor & Full Coordination'}
          className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
          loading="eager"
          decoding="async"
        />
      </picture>
    </div>
  );
};
