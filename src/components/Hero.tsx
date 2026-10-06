import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, MessageCircle, ChevronRight, Volume2, VolumeX, Play, Pause, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';
import { MandalaMotif } from './MandalaMotif';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Guarantee seamless autoplay on mount across all mobile & desktop browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Critical DOM properties & attributes for mobile Safari & Chromium autoplay policies
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');

    const startPlayback = () => {
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay might be temporarily restricted until first user interaction
            setIsPlaying(false);
          });
      }
    };

    // Attempt playback immediately and on readiness events
    startPlayback();
    video.addEventListener('canplay', startPlayback, { once: true });
    video.addEventListener('loadedmetadata', startPlayback, { once: true });

    // Fallback: start on first touch, click, or scroll if strict browser policy delayed it
    const handleFirstGesture = () => {
      if (video && video.paused) {
        video.muted = true;
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const servicesList = [
    'Weddings',
    'Corporate Events',
    'Birthday Parties',
    'Product Launches',
    'Destination Weddings',
    'Theme Events',
    'Special Occasions',
  ];

  return (
    <section
      id="home"
      onClick={() => {
        // If paused on click anywhere on hero, resume playing
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:py-28"
    >
      {/* 1. Full-Bleed Background Video (Optimized Baseline, +faststart, Universal Playback) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#070D1E]">
        <video
          ref={videoRef}
          poster="/hero_event_poster.jpg"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center pointer-events-none"
          aria-label="Amman Event Management Promotional Video"
        >
          <source src="/hero_event_video.mp4" type="video/mp4" />
          <source src="./hero_event_video.mp4" type="video/mp4" />
        </video>

        {/* 2. Dark Subtle Overlay: Keeps Video Vibrant While Ensuring High Text Readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070D1E]/75 via-transparent to-[#070D1E]/90 pointer-events-none z-10" />
      </div>

      {/* Decorative Gold Mandala Accents */}
      <div className="absolute top-0 left-0 hidden md:block z-15 pointer-events-none">
        <MandalaMotif size={240} opacity={0.3} variant="corner-tl" />
      </div>
      <div className="absolute top-0 right-0 hidden md:block z-15 pointer-events-none">
        <MandalaMotif size={240} opacity={0.3} variant="corner-tr" />
      </div>

      {/* 3. Hero Text Content Layer (Positioned Above Video) */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 text-center flex flex-col items-center">
        
        {/* Brand Headline: AMMAN EVENT MANAGEMENT */}
        <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-black/65 border border-[#DFB76C]/50 backdrop-blur-md shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-display text-xs sm:text-sm font-bold tracking-[0.25em] text-[#F5D77F] uppercase drop-shadow">
            {BRAND_INFO.businessName}
          </span>
          <span className="text-[#DFB76C]">·</span>
          <span className="text-xs text-slate-200 font-medium drop-shadow">
            {BRAND_INFO.tamilName}
          </span>
        </div>

        {/* Organizer Lockup: J. Balamurugan / Event Planner */}
        <div className="mb-4 flex flex-col items-center">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-1 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            <span>J. </span>
            <span className="text-gold-gradient font-extrabold tracking-normal">Balamurugan</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#DFB76C]" />
            <p className="font-script text-2xl sm:text-3xl md:text-4xl text-[#F5D77F] tracking-wide transform -rotate-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {BRAND_INFO.title}
            </p>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#DFB76C]" />
          </div>
        </div>

        {/* Main Hero Slogan */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white leading-tight sm:leading-tight mb-6 max-w-3xl [text-wrap:balance] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          &ldquo;Your Vision. Our Planning.{' '}
          <span className="text-gold-light italic block sm:inline">An Unforgettable Event.&rdquo;</span>
        </h1>

        {/* WE UNDERTAKE Banner Pill & Services Strip */}
        <div className="w-full max-w-3xl mb-8 p-4 sm:p-5 rounded-2xl bg-black/65 border border-[#DFB76C]/40 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
            <p className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#FDFCF7]">
              WE UNDERTAKE:
            </p>
            <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm text-slate-100 font-medium">
            {servicesList.map((service, index) => (
              <React.Fragment key={service}>
                <span className="hover:text-[#F5D77F] transition-colors drop-shadow">
                  {service}
                </span>
                {index < servicesList.length - 1 && (
                  <span className="text-[#DFB76C] font-bold select-none">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Call to Actions (CTA & Secondary CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto mb-8">
          {/* Primary CTA */}
          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient bg-gold-gradient-hover rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#070D1E]" />
            <span>Plan Your Event</span>
            <ChevronRight className="w-4 h-4 text-[#070D1E]" />
          </button>

          {/* Secondary CTA */}
          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-semibold text-white bg-emerald-700/90 hover:bg-emerald-600 rounded-xl border border-emerald-500/40 shadow-xl hover:shadow-emerald-600/40 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>WhatsApp Us</span>
            <span className="text-xs bg-emerald-950/70 px-2 py-0.5 rounded text-emerald-200 font-mono">
              {BRAND_INFO.phone}
            </span>
          </a>
        </div>

        {/* Location & Trust Footer */}
        <div className="flex items-center gap-2 text-xs text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <MapPin className="w-3.5 h-3.5 text-[#DFB76C]" />
          <span>Vittukatti, Thiruthuraipoondi - 614 715</span>
        </div>
      </div>

      {/* Floating Bottom Video Controls (Mute/Unmute & Play/Pause) */}
      <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-black/75 hover:bg-black/95 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-slate-200" />
          ) : (
            <Play className="w-4 h-4 ml-0.5 text-[#DFB76C]" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/75 hover:bg-black/95 text-white backdrop-blur-md border border-white/20 text-xs shadow-lg transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-300" />
              <span className="text-[11px] text-slate-300 font-medium">Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-300 font-medium">Mute</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
