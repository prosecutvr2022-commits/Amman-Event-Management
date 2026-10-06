import React, { useState } from 'react';

interface SectionArtworkWrapperProps {
  id: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
}

const GALLERY_IMAGE_MAP: Record<string, string> = {
  wedding: 'section-image',
  g1: 'section-image',
  g2: 'chenda-melam',
  'chenda-melam': 'chenda-melam',
  g3: 'corporate-events',
  'corporate-events': 'corporate-events',
  g4: 'birthday-parties',
  'birthday-parties': 'birthday-parties',
  g5: 'catering-services',
  'catering-services': 'catering-services',
  g6: 'thamboolam-bags',
  'thamboolam-bags': 'thamboolam-bags',
  g7: 'destination-wedding',
  'destination-wedding': 'destination-wedding',
  g8: 'brand-promotions',
  'brand-promotions': 'brand-promotions',
};

export const SectionArtworkWrapper: React.FC<SectionArtworkWrapperProps> = ({
  id,
  className = '',
  title,
  children,
}) => {
  const cleanId = id.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const imageBase = GALLERY_IMAGE_MAP[cleanId] || cleanId;

  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      title={title || cleanId}
    >
      {!hasError ? (
        <picture className="w-full h-full block">
          <source srcSet={`/images/${imageBase}.webp`} type="image/webp" />
          <img
            src={`/images/${imageBase}.png`}
            alt={title || cleanId}
            className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
            loading="lazy"
            decoding="async"
            onError={() => setHasError(true)}
          />
        </picture>
      ) : (
        children
      )}
    </div>
  );
};
