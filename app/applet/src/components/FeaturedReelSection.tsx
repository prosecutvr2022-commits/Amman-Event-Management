import React, { useState, useRef } from 'react';import { Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, Sparkles, Heart, Eye, MessageCircle, Share2, Instagram, ShieldCheck } from 'lucide-react';import { BRAND_INFO } from '../data/eventData';import { MandalaMotif } from './MandalaMotif';import { getAssetUrl } from '../utils/assetHelper';

interface FeaturedReelSectionProps {
  onPlanEvent: () => void;
}

export const FeaturedReelSection: React.FC<FeaturedReelSectionProps> = ({ onPlanEvent }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'player' | 'embed'>('player');
  const [hasInteracted, setHasInteracted] = useState(false);

  const instagramUrl = 'https://www.instagram.com/reel/DdnLeYTTu1V/?stkn=cWpwb2c3OXl1MWhp';
  const instagramEmbedUrl = 'https://www.instagram.com/reel/DdnLeYTTu1V/embed';

  const togglePlay = () => {
    if (!videoRef.current) return;
    setHasInteracted(true);
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Video play blocked or error:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#DFB76C] blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-600 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DFB76C]/10 border border-[#DFB76C]/30 text-[#F5D77F] text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span>Featured Viral Reel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            See Our Work In <span className="text-transparent bg-clip-text bg-gold-gradient">Motion</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience the grand ambiance, royal bride and groom entries, and meticulous stage lighting crafted by J. Balamurugan and team.
          </p>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Phone Frame Video Player */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mb-6 shadow-lg">
              <button
                onClick={() => setActiveTab('player')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'player'
                    ? 'bg-gold-gradient text-[#070D1E] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>HD Video Stream</span>
              </button>
              <button
                onClick={() => setActiveTab('embed')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'embed'
                    ? 'bg-gold-gradient text-[#070D1E] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram Embed</span>
              </button>
            </div>

            {/* Reel Container Card (Simulated Smartphone Frame with Gold Border) */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-2 border-[#DFB76C]/60 group">
              {activeTab === 'player' ? (
                <>
                  {/* HTML5 Native Stream Video */}
                  <video
                    ref={videoRef}
                    poster={getAssetUrl('instagram_reel_poster.jpg')}
                    loop
                    playsInline
                    className="w-full h-full object-cover object-center cursor-pointer"
                    onClick={togglePlay}
                    aria-label="Amman Event Management Bride and Groom Dance Reel"
                  >
                    <source src={getAssetUrl('instagram_reel.mp4')} type="video/mp4" />
                  </video>

                  {/* Play Overlay if paused or hasn't interacted */}
                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer z-20 transition-all hover:bg-black/30"
                    >
                      <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95">
                        <Play className="w-7 h-7 text-[#070D1E] ml-1 fill-[#070D1E]" />
                      </div>
                      <span className="mt-3 px-3 py-1 rounded-full bg-black/75 text-xs text-[#F5D77F] font-semibold border border-[#DFB76C]/40">
                        Tap to Watch Dance Reel
                      </span>
                    </div>
                  )}

                  {/* Top Creator Badge */}
                  <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] flex items-center justify-center text-white text-[10px] font-bold">
                        <Instagram className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-white leading-tight">sara_vlog_tn50</p>
                        <p className="text-[9px] text-[#DFB76C] leading-tight">Amman Event</p>
                      </div>
                    </div>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-colors"
                      title="Open on Instagram"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-white" />
                    </a>
                  </div>

                  {/* Bottom Interactive Controls Strip */}
                  <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-[#DFB76C] transition-colors cursor-pointer"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-[#DFB76C] transition-colors cursor-pointer"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleFullscreen}
                        className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Instagram Official Embed Iframe */
                <div className="w-full h-full bg-slate-900 flex flex-col">
                  <iframe
                    src={instagramEmbedUrl}
                    title="Instagram Reel"
                    className="w-full h-full border-0"
                    allowFullScreen
                    scrolling="no"
                  />
                </div>
              )}
            </div>

            {/* Social Engagement Counters */}
            <div className="flex items-center gap-6 mt-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span className="font-semibold text-white">1,200+ Likes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#DFB76C]" />
                <span className="font-semibold text-white">72,000+ Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-sky-400" />
                <span className="font-semibold text-white">Viral Reel</span>
              </div>
            </div>
          </div>

          {/* Right Column: Event Story & Call To Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Groom & Bride Special Stage Dance
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A magical wedding reception memory coordinated by <strong className="text-[#F5D77F]">J. Balamurugan</strong> in Thiruvarur. 
                Our team orchestrates every element to perfection: from stage backdrop lighting, synchronized cold pyros, smoke effects, and acoustic sound systems to choreographing memorable couple entries.
              </p>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-[#0B152B] border border-[#DFB76C]/25 backdrop-blur-sm">
                <p className="text-xs font-bold text-[#F5D77F] uppercase tracking-wider mb-1">Couple Grand Entry</p>
                <p className="text-xs text-slate-300">Custom bridal flower canopy, cold pyro sparklers, and synchronized music.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B152B] border border-[#DFB76C]/25 backdrop-blur-sm">
                <p className="text-xs font-bold text-[#F5D77F] uppercase tracking-wider mb-1">Stage & Lighting</p>
                <p className="text-xs text-slate-300">Cinematic stage design with ambient dynamic LED floodlighting and DJ setup.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B152B] border border-[#DFB76C]/25 backdrop-blur-sm">
                <p className="text-xs font-bold text-[#F5D77F] uppercase tracking-wider mb-1">Live Coordination</p>
                <p className="text-xs text-slate-300">Dedicated floor management so the couple and family enjoy stress-free moments.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B152B] border border-[#DFB76C]/25 backdrop-blur-sm">
                <p className="text-xs font-bold text-[#F5D77F] uppercase tracking-wider mb-1">Memories Captured</p>
                <p className="text-xs text-slate-300">High-definition photography and viral reels tailored for your social media.</p>
              </div>
            </div>

            {/* Interactive CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onPlanEvent}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#070D1E] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#070D1E]" />
                <span>Plan Your Wedding Event</span>
              </button>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#833ab4]/90 via-[#fd1d1d]/90 to-[#fcb045]/90 hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-lg transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Watch on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm border border-emerald-500/30 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
