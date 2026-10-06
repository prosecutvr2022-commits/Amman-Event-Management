import React from 'react';

interface MandalaMotifProps {
  className?: string;
  size?: number;
  opacity?: number;
  variant?: 'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br' | 'full';
}

export const MandalaMotif: React.FC<MandalaMotifProps> = ({
  className = '',
  size = 180,
  opacity = 0.25,
  variant = 'full'
}) => {
  const getRotationClass = () => {
    switch (variant) {
      case 'corner-tl': return 'origin-top-left rotate-0';
      case 'corner-tr': return 'origin-top-right rotate-90';
      case 'corner-br': return 'origin-bottom-right rotate-180';
      case 'corner-bl': return 'origin-bottom-left -rotate-90';
      default: return '';
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none transition-transform select-none ${getRotationClass()} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldMGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFB76C" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8A6B22" />
        </linearGradient>
      </defs>

      {/* Central rings */}
      <circle cx="100" cy="100" r="16" stroke="url(#goldMGrad)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="28" stroke="url(#goldMGrad)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="44" stroke="url(#goldMGrad)" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="62" stroke="url(#goldMGrad)" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="82" stroke="url(#goldMGrad)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="96" stroke="url(#goldMGrad)" strokeWidth="0.8" />

      {/* 8 Main Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 100 100)`}>
          {/* Inner Petal */}
          <path
            d="M 100 84 C 93 72 93 54 100 42 C 107 54 107 72 100 84 Z"
            stroke="url(#goldMGrad)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Outer Ornamental Lotus Tip */}
          <path
            d="M 100 38 C 88 20 86 10 100 2 C 114 10 112 20 100 38 Z"
            stroke="url(#goldMGrad)"
            strokeWidth="1.2"
            fill="url(#goldMGrad)"
            fillOpacity="0.15"
          />
          {/* Radiating Ray */}
          <line
            x1="100"
            y1="42"
            x2="100"
            y2="18"
            stroke="url(#goldMGrad)"
            strokeWidth="0.8"
          />
          <circle cx="100" cy="8" r="2" fill="url(#goldMGrad)" />
        </g>
      ))}

      {/* 8 Intermediate Sub-petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <g key={`sub-${i}`} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M 100 70 C 95 62 95 50 100 44 C 105 50 105 62 100 70 Z"
            stroke="url(#goldMGrad)"
            strokeWidth="0.8"
            fill="none"
          />
          <line
            x1="100"
            y1="44"
            x2="100"
            y2="30"
            stroke="url(#goldMGrad)"
            strokeWidth="0.8"
            strokeDasharray="1 2"
          />
          <circle cx="100" cy="28" r="1.5" fill="url(#goldMGrad)" />
        </g>
      ))}

      {/* Center Flower */}
      <circle cx="100" cy="100" r="5" fill="url(#goldMGrad)" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <circle
          key={`core-${i}`}
          cx={100 + 10 * Math.cos((angle * Math.PI) / 180)}
          cy={100 + 10 * Math.sin((angle * Math.PI) / 180)}
          r="2.5"
          fill="url(#goldMGrad)"
          fillOpacity="0.8"
        />
      ))}
    </svg>
  );
};
