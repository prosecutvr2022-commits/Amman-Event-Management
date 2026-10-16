import React, { useState } from 'react';
import { getAssetUrl } from '../utils/assetHelper';

interface AiyarArtworkProps {
  className?: string;
  title?: string;
}

const STORAGE_KEY = 'amman_aiyar_custom_img';

export const AiyarArtwork: React.FC<AiyarArtworkProps> = ({
  className = '',
  title,
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      title={title || 'Aiyar (Vedic Vadhyar & Sacred Homam Rituals) - Amman Event Management'}
    >
      <picture className="w-full h-full block">
        <source srcSet={getAssetUrl('images/aiyar.webp')} type="image/webp" />
        <img
          src={getAssetUrl('images/aiyar.png')}
          alt={title || 'Aiyar Vedic Priest Sacred Homam Ceremony'}
          className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
};
