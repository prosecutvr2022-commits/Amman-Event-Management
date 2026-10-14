import React, { useState } from 'react';
import { getAssetUrl, handleImageErrorFallback } from '../utils/assetHelper';

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
  'special-occasions': 'special-occasions',
  'surprise-events': 'surprise-events',
  'product-launches': 'product-launches',
  'celebrity-events': 'celebrity-events',
  'theme-events': 'theme-events',
  'social-events': 'social-events',
  entertainments: 'entertainments',
  'photography-videography': 'photography-videography',
  'wedding-invitation': 'wedding-invitation',
  'violin-program': 'violin-program',
  'melam-nadhasvaram': 'melam-nadhasvaram',
  aiyar: 'aiyar',
  'manamakal-malai': 'manamakal-malai',
  'arkestra-music': 'arkestra-music',
  'food-stall': 'food-stall',
  'horse-chariot': 'horse-chariot',
  'mack-up': 'mack-up',
  'bridal-groom': 'bridal-groom',
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

  const webpUrl = getAssetUrl(`images/${imageBase}.webp`);
  const pngUrl = getAssetUrl(`images/${imageBase}.png`);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      title={title || cleanId}
    >
      {!hasError ? (
        <picture className="w-full h-full block">
          <source srcSet={webpUrl} type="image/webp" />
          <img
            src={pngUrl}
            alt={title || cleanId}
            className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.dataset.failed === 'true') {
                setHasError(true);
              } else {
                target.dataset.failed = 'true';
                handleImageErrorFallback(e, `images/${imageBase}.png`);
              }
            }}
          />
        </picture>
      ) : (
        children
      )}
    </div>
  );
};


