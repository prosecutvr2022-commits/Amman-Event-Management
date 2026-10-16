import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  CalendarCheck,
  X,
} from 'lucide-react';
import { getAssetUrl, handleImageErrorFallback } from '../utils/assetHelper';

export interface WorkItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  fallbackPng: string;
}

const WORKS_DATA: WorkItem[] = [
  {
    id: 'work-1',
    number: '01',
    title: 'Grand Triple-Arch Floral Stage & Royal 1st Birthday',
    category: 'Wedding Reception & 1st Birthday',
    description:
      'A magnificent dual setup featuring a majestic white concentric floral arch reception stage with golden royal sofa, paired with an illuminated royal blue "ONE" balloon arch and garden picket fence.',
    highlights: ['Concentric Floral Archway', 'Marquee "ONE" Lit Letters', 'Hanging Greenery Canopy', 'Royal Blue Balloon Decor'],
    imageSrc: getAssetUrl('images/works/work-1.webp'),
    fallbackPng: getAssetUrl('images/works/work-1.png'),
  },
  {
    id: 'work-2',
    number: '02',
    title: 'Pink Marble "Dhanya Sri" Halo & Green Gold Lattice Mandap',
    category: 'Luxury Engagement & Ear Piercing (காதணி விழா)',
    description:
      'Elegant blush pink marble floral arch backdrop with a rich violet velvet couch, complemented by an authentic South Indian emerald lattice and gold floral jaali mandap with yellow velvet seating.',
    highlights: ['Blush Pink Marble Rings', 'South Indian Green Lattice', 'Yellow Velvet Royal Couch', 'Jasmine Toran String Lights'],
    imageSrc: getAssetUrl('images/works/work-2.webp'),
    fallbackPng: getAssetUrl('images/works/work-2.png'),
  },
  {
    id: 'work-3',
    number: '03',
    title: 'Golden Arch Chandelier Pavilion & Royal Marble Throne ("JH")',
    category: 'Grand Reception & Muhurtham',
    description:
      'Opulent golden geometric pavilion with cascading warm chandeliers and camel velvet sofa, alongside modern multi-panel white marble floral walls framing an antique carved golden royal throne.',
    highlights: ['Warm Fairy Chandelier Arrays', 'Geometric Golden Arches', 'Carved Antique Golden Throne', 'Dense Exotic Flower Walls'],
    imageSrc: getAssetUrl('images/works/work-3.webp'),
    fallbackPng: getAssetUrl('images/works/work-3.png'),
  },
  {
    id: 'work-4',
    number: '04',
    title: 'Under-The-Sea Aquarium "AADHVIK" & Rainbow Unicorn "MOULYA"',
    category: 'Thematic 1st Birthday Mega Stages',
    description:
      'Immersive aquatic world with balloon waves, sea creatures and giant clam shell marquee, along with a dreamy pastel rainbow balloon arch, clouds, and illuminated marquee letters.',
    highlights: ['Aquatic Balloon Arch & Giant Clam', '3D Marquee "AADHVIK" Lights', 'Pastel Rainbow Cloud Arches', 'Glowing "MOULYA" Neon Display'],
    imageSrc: getAssetUrl('images/works/work-4.webp'),
    fallbackPng: getAssetUrl('images/works/work-4.png'),
  },
  {
    id: 'work-5',
    number: '05',
    title: 'Radiant Lotus Throne & Sacred Balaji Temple Sanctum',
    category: 'Traditional Wedding Reception & Temple Mandap',
    description:
      'Luminous golden-white multi-layered lotus petal backdrop with floral canopy, alongside an authentic carved South Indian temple sanctum featuring Lord Balaji and Goddess Padmavathi shrines.',
    highlights: ['Illuminated Lotus Backdrop', 'Traditional Temple Sanctum Arch', 'Deep Golden Floral Skirting', 'Divine Auspicious Lighting'],
    imageSrc: getAssetUrl('images/works/work-5.webp'),
    fallbackPng: getAssetUrl('images/works/work-5.png'),
  },
  {
    id: 'work-6',
    number: '06',
    title: 'Modern Lilac Symphony & Teal Glowing Lotus Mandap',
    category: 'Contemporary Wedding Stage Decor',
    description:
      'Sculptural geometric wave panels with lush purple orchid clouds and contemporary sofa, paired with rich peacock teal pleated drapery and a warm backlit golden lotus halo.',
    highlights: ['Contemporary Geometric Wave Panels', 'Plum & Lilac Floral Clouds', 'Backlit Golden Lotus Petal Halo', 'Peacock Teal Pleated Drapery'],
    imageSrc: getAssetUrl('images/works/work-6.webp'),
    fallbackPng: getAssetUrl('images/works/work-6.png'),
  },
  {
    id: 'work-7',
    number: '07',
    title: 'Traditional Wedding Golu Dolls & Sprouting Mulaipari Seer',
    category: 'Authentic South Indian Seer Display & Rituals',
    description:
      'Handcrafted wedding doll (Golu / Bommai) figurines with couple and family photo toppers, ceremonial silk umbrellas, sprouting auspicious Mulaipari pots, and "ALL IS WELL" marriage banners.',
    highlights: ['Ceremonial Wedding Doll Procession', 'Auspicious Mulaipari Pots', 'Royal Traditional Festive Umbrellas', 'Custom Tamil Marriage Keepsakes'],
    imageSrc: getAssetUrl('images/works/work-7.webp'),
    fallbackPng: getAssetUrl('images/works/work-7.png'),
  },
  {
    id: 'work-8',
    number: '08',
    title: 'Divine Amman Blessing Mandap & "ANVI\'S WILD 2" Jungle Safari',
    category: 'Sacred Deity Mandap & Safari 2nd Birthday',
    description:
      'Sacred Goddess Amman deity mandapam with floral garlands and wedding entourage, combined with a thrilling jungle safari birthday stage with safari jeep, animal cutouts, and marquee lights.',
    highlights: ['Goddess Amman Deity Blessing Stage', 'Safari Jeep & Jungle Animals', 'Balloon Jungle Garland Frame', 'Illuminated "HBD ANVI" Marquee'],
    imageSrc: getAssetUrl('images/works/work-8.webp'),
    fallbackPng: getAssetUrl('images/works/work-8.png'),
  },
];

interface OurWorksCarouselSectionProps {
  onSelectWork?: (title: string) => void;
}

export const OurWorksCarouselSection: React.FC<OurWorksCarouselSectionProps> = ({
  onSelectWork,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxWork, setLightboxWork] = useState<WorkItem | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Custom photo overrides per work item (supports synchronized photos)
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    WORKS_DATA.forEach((w) => {
      try {
        const saved = localStorage.getItem(`amman_${w.id}_img`);
        if (saved) map[w.id] = saved;
      } catch {
        // ignore
      }
    });
    return map;
  });

  const [versionTimestamp, setVersionTimestamp] = useState<number>(() => Date.now());

  const totalWorks = WORKS_DATA.length;
  const currentWork = WORKS_DATA[currentIndex];

  // Sync across tabs and other components
  useEffect(() => {
    const handleSync = () => {
      const map: Record<string, string> = {};
      WORKS_DATA.forEach((w) => {
        try {
          const saved = localStorage.getItem(`amman_${w.id}_img`);
          if (saved) map[w.id] = saved;
        } catch {
          // ignore
        }
      });
      setCustomPhotos(map);
      setVersionTimestamp(Date.now());
    };

    WORKS_DATA.forEach((w) => {
      window.addEventListener(`amman_${w.id}_updated`, handleSync);
    });
    window.addEventListener('amman_works_updated', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      WORKS_DATA.forEach((w) => {
        window.removeEventListener(`amman_${w.id}_updated`, handleSync);
      });
      window.removeEventListener('amman_works_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalWorks);
  }, [totalWorks]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalWorks) % totalWorks);
  }, [totalWorks]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused || lightboxWork) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, lightboxWork, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') setLightboxWork(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    if (diff > 50) {
      nextSlide();
      setTouchStart(null);
    } else if (diff < -50) {
      prevSlide();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  return (
    <section
      id="our-works"
      className="relative py-20 bg-gradient-to-b from-[#070D1E] via-[#0B152B] to-[#070D1E] overflow-hidden border-t border-b border-[#DFB76C]/15"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-[radial-gradient(circle,rgba(56,189,248,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFB76C]/10 border border-[#DFB76C]/30 text-[#F5D77F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span>Signature Creations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Our Works &amp; Real Celebrations
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Take a visual tour through real stages, grand mandapams, and magical birthday decors
            handcrafted by <span className="text-[#F5D77F] font-medium">Amman Event Management</span>.
          </p>
        </div>

        {/* Carousel Showcase Container */}
        <div
          className="relative bg-slate-900/70 border border-[#DFB76C]/25 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Slide Grid: Image Stage + Details Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Main Stage Image Viewport */}
            <div className="lg:col-span-7 relative group">
              <div
                className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-[#DFB76C]/30 shadow-2xl cursor-pointer"
                onClick={() => setLightboxWork(currentWork)}
                title="Click to view full image in lightbox"
              >
                {/* Image element with responsive picture fallback & custom photo */}
                {customPhotos[currentWork.id] ? (
                  <img
                    src={customPhotos[currentWork.id]}
                    alt={currentWork.title}
                    className="w-full h-full object-cover object-center select-none transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <picture className="w-full h-full block">
                    <source
                      srcSet={`${currentWork.imageSrc}?v=${versionTimestamp}`}
                      type="image/webp"
                    />
                    <img
                      src={`${currentWork.fallbackPng}?v=${versionTimestamp}`}
                      alt={currentWork.title}
                      className="w-full h-full object-cover object-center select-none transition-transform duration-700 group-hover:scale-105 block"
                      loading="eager"
                      decoding="async"
                      onError={(e) => handleImageErrorFallback(e, currentWork.fallbackPng)}
                    />
                  </picture>
                )}

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Number Badge Top-Left */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-black/75 border border-[#DFB76C]/60 text-[#F5D77F] font-mono font-bold text-xs shadow-md">
                    {currentWork.number} / 08
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#DFB76C]/20 border border-[#DFB76C]/40 text-[#FFF2B2] font-semibold text-[11px] backdrop-blur-md">
                    {currentWork.category}
                  </span>
                </div>

                {/* Fullscreen Magnify Trigger Top-Right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxWork(currentWork);
                  }}
                  className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-black/70 hover:bg-black text-[#F5D77F] border border-[#DFB76C]/40 backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 text-[#DFB76C]" />
                </button>
              </div>

              {/* Navigation Arrows Floating on Sides */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/75 hover:bg-[#DFB76C] text-[#DFB76C] hover:text-black border border-[#DFB76C]/60 transition-all backdrop-blur-md shadow-xl active:scale-95 cursor-pointer"
                aria-label="Previous work slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/75 hover:bg-[#DFB76C] text-[#DFB76C] hover:text-black border border-[#DFB76C]/60 transition-all backdrop-blur-md shadow-xl active:scale-95 cursor-pointer"
                aria-label="Next work slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Work Information & Highlights */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#F5D77F] font-mono tracking-wider mb-2">
                  <span>EXEMPLARY PORTFOLIO</span>
                  <span>{currentWork.number} OF 08</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                  {currentWork.title}
                </h3>

                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {currentWork.description}
                </p>

                {/* Key Highlights Tags */}
                <div className="mt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DFB76C] mb-2.5">
                    Stage Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentWork.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#DFB76C]/10 border border-[#DFB76C]/25 text-slate-200 text-xs font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DFB76C]" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectWork?.(currentWork.title)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#DFB76C] to-[#B8860B] text-slate-950 font-semibold text-sm shadow-lg hover:shadow-[#DFB76C]/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <CalendarCheck className="w-4 h-4 text-slate-950" />
                  <span>Book This Stage Style</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxWork(currentWork)}
                  className="px-4 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[#F5D77F] border border-slate-700 text-sm font-medium transition-all cursor-pointer"
                >
                  View Large
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2">
            {WORKS_DATA.map((w, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-8 h-2.5 bg-[#DFB76C] shadow-md shadow-[#DFB76C]/30'
                      : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>

          {/* Thumbnail Preview Strip */}
          <div className="mt-6 grid grid-cols-4 sm:grid-cols-8 gap-2.5 pt-4 border-t border-slate-800/40">
            {WORKS_DATA.map((w, index) => {
              const isActive = index === currentIndex;
              const photo = customPhotos[w.id] || `${w.imageSrc}?v=${versionTimestamp}`;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer group ${
                    isActive
                      ? 'border-[#DFB76C] scale-105 shadow-md shadow-[#DFB76C]/25 ring-2 ring-[#DFB76C]/30'
                      : 'border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                  }`}
                  title={w.title}
                >
                  <img
                    src={photo}
                    alt={w.title}
                    className="w-full h-full object-cover object-center select-none"
                    loading="lazy"
                    onError={(e) => handleImageErrorFallback(e, `${w.fallbackPng}?v=${versionTimestamp}`)}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold text-white bg-black/70 px-1 rounded">
                    {w.number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxWork && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxWork(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-[#DFB76C]/40 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#DFB76C] font-bold">
                  WORK {lightboxWork.number} &bull; {lightboxWork.category}
                </span>
                <h4 className="text-lg font-serif font-bold text-white mt-0.5">
                  {lightboxWork.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxWork(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative aspect-square max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <picture className="w-full h-full flex items-center justify-center">
                <source
                  srcSet={customPhotos[lightboxWork.id] || `${lightboxWork.imageSrc}?v=${versionTimestamp}`}
                  type="image/webp"
                />
                <img
                  src={customPhotos[lightboxWork.id] || `${lightboxWork.fallbackPng}?v=${versionTimestamp}`}
                  alt={lightboxWork.title}
                  className="w-full h-full object-contain select-none"
                  onError={(e) => handleImageErrorFallback(e, `${lightboxWork.fallbackPng}?v=${versionTimestamp}`)}
                />
              </picture>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <p className="text-xs text-slate-300 text-center sm:text-left">
                {lightboxWork.description}
              </p>
              <button
                type="button"
                onClick={() => {
                  setLightboxWork(null);
                  onSelectWork?.(lightboxWork.title);
                }}
                className="px-5 py-2 rounded-lg bg-[#DFB76C] text-slate-950 text-xs font-bold hover:bg-[#F5D77F] transition-all cursor-pointer"
              >
                Book This Decor
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
