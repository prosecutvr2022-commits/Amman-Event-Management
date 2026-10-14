import React, { useState } from 'react';
import { getAssetUrl } from '../utils/assetHelper';

interface MelamNadhasvaramArtworkProps {
  className?: string;
  title?: string;
}

const STORAGE_KEY = 'amman_melam_nadhasvaram_img';

export const MelamNadhasvaramArtwork: React.FC<MelamNadhasvaramArtworkProps> = ({
  className = '',
  title,
}) => {
  const [customImage, setCustomImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      title={title || 'Melam & Nadhasvaram (Mangala Vathiyam) - Amman Event Management'}
    >
      {customImage ? (
        <img
          src={customImage}
          alt={title || 'Melam & Nadhasvaram Custom Photo'}
          className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
          loading="eager"
          decoding="async"
          onError={() => setCustomImage(null)}
        />
      ) : (
        <picture className="w-full h-full block">
          <source srcSet={getAssetUrl('images/melam-nadhasvaram.webp')} type="image/webp" />
          <img
            src={getAssetUrl('images/melam-nadhasvaram.png')}
            alt={title || 'Melam & Nadhasvaram Traditional Procession'}
            className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
};
