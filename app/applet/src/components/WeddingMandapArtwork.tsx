import React from 'react';
import { PermanentPhotoSlot } from '@/src/components/PermanentPhotoSlot';

interface WeddingMandapArtworkProps {
  className?: string;
  title?: string;
}

export const WeddingMandapArtwork: React.FC<WeddingMandapArtworkProps> = ({ className = '', title }) => {
  return (
    <PermanentPhotoSlot
      id="wedding"
      defaultLabel="Grand Stage Decor & Full Coordination"
      className={className}
      title={title}
    />
  );
};
