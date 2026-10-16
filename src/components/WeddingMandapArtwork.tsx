import React from 'react';
import { PermanentPhotoSlot } from './PermanentPhotoSlot';

interface WeddingMandapArtworkProps {
  className?: string;
  title?: string;
  allowUpload?: boolean;
}

export const WeddingMandapArtwork: React.FC<WeddingMandapArtworkProps> = ({
  className = '',
  title,
  allowUpload = false,
}) => {
  return (
    <PermanentPhotoSlot
      id="wedding"
      defaultLabel="Grand Stage Decor & Full Coordination"
      title={title || 'Grand Stage Decor & Full Coordination - Amman Event Management'}
      className={className}
      allowUpload={allowUpload}
    />
  );
};
