import React, { useState } from 'react';
import { getAssetUrl } from '../utils/assetHelper';

interface ManamakalMalaiArtworkProps {
  className?: string;
  title?: string;
}

const STORAGE_KEY = 'amman_manamakal_malai_img';

export const ManamakalMalaiArtwork: React.FC<ManamakalMalaiArtworkProps> = ({
  className = '',
  title,
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      title={title || 'Manamakal Malai (Bridal & Groom Garlands) - Amman Event Management'}
    >
      <picture className="w-full h-full block">
        <source srcSet={getAssetUrl('images/manamakal-malai.webp')} type="image/webp" />
        <img
          src={getAssetUrl('images/manamakal-malai.png')}
          alt={title || 'Manamakal Malai Handcrafted Wedding Garlands'}
          className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
};
