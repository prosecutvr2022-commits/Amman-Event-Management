import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  MessageCircle,
  Phone,
  Heart,
  CalendarCheck,
  ChevronRight,
  Film,
  Award,
  Check,
  AlertCircle,
} from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';
import { MandalaMotif } from './MandalaMotif';
import { getSavedVideoBlob, deleteSavedVideoBlob } from '../utils/videoStorage';
import { getAssetUrl } from '../utils/assetHelper';

interface CraftedMomentsVideoSectionProps {
  onOpenEnquiry?: (serviceName?: string) => void;
}

interface VideoPlaylistOption {
  id: string;
  title: string;
  tamil: string;
  badge: string;
  src: string;
  poster: string;
  durationLabel: string;
  description: string;
}

const STORAGE_VIDEO_KEY = 'amman_crafted_video_blob';
const STORAGE_FLAG_KEY = 'amman_crafted_has_custom';
const STORAGE_NAME_KEY = 'amman_crafted_video_name';
const STORAGE_VERSION_KEY = 'amman_crafted_version';
const VIDEO_SYNC_EVENT = 'amman_video_updated';

const PLAYLIST: VideoPlaylistOption[] = [
  {
    id: 'amman-wedding-reel',
    title: 'Grand Wedding Pallakku & Celebration Reel',
    tamil: 'மணமக்கள் மலர் பல்லக்கு வருகை & பிரம்மாண்ட வரவேற்பு',
    badge: 'Official Wedding Reel',
    src: getAssetUrl('amman_event_video.mp4'),
    poster: getAssetUrl('hero_event_poster.jpg'),
    durationLabel: '1:12 Min',
    description: 'Flower canopy pallakku procession, couple surprise dance on grand stage, traditional welcome deepams, and authentic catering stalls.',
  },
  {
    id: 'viral-dance-reel',
    title: 'Viral Bride & Groom Dance Celebration',
    tamil: 'மாப்பிள்ளை பொண்ணோட டான்ஸ் ✨',
    badge: 'Viral Instagram Highlight',
    src: getAssetUrl('instagram_reel.mp4'),
    poster: getAssetUrl('instagram_reel_poster.jpg'),
    durationLabel: '1:12 Min',
    description: 'High-energy celebration, cheerful family moments, and synchronized stage lighting orchestrated by Amman Event Management.',
  },
  {
    id: 'live-dj-flame',
    title: 'Live Concert DJ Console & Flame Jet Pyros',
    tamil: 'லைவ் டிஜே கன்சோல் & மேடை நெருப்பு எஃபெக்ட்ஸ்',
    badge: 'Live Audio-Visual FX',
    src: getAssetUrl('live_dj_flame_show.mp4'),
    poster: getAssetUrl('hero_event_poster.jpg'),
    durationLabel: '0:14 Min',
    description: 'Dynamic moving-head concert strobes, dual ATX-1800 bass stacks, custom honeycomb illuminated DJ booth, and vertical stage pyro fire jets.',
  },
];

const CHAPTERS = [
  { time: 0, label: '0:00', title: 'Flower Canopy Pallakku', tag: 'Grand Entry' },
  { time: 4, label: '0:04', title: 'Stage Dance & Pyros', tag: 'Celebration' },
  { time: 8, label: '0:08', title: 'Welcome Deepam Troupe', tag: 'Tradition' },
  { time: 11, label: '0:11', title: 'A-to-Z Stalls & Coordination', tag: 'Services' },
  { time: 14, label: '0:14', title: 'Family Praise & Satisfaction', tag: 'Reviews' },
];

export const CraftedMomentsVideoSection: React.FC<CraftedMomentsVideoSectionProps> = ({
  onOpenEnquiry,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(948);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [customVideoSrc, setCustomVideoSrc] = useState<string | null>(null);
  const [customVideoName, setCustomVideoName] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_NAME_KEY);
    } catch {
      return null;
    }
  });

  const activeVideo = PLAYLIST[activeVideoIndex];
  const currentVideoSrc = customVideoSrc || activeVideo.src;

  // Load custom video on initial mount from IndexedDB or server
  useEffect(() => {
    let activeBlobUrl: string | null = null;

    const restoreCustomVideo = async () => {
      try {
        const hasCustom = localStorage.getItem(STORAGE_FLAG_KEY) === 'true';
        if (!hasCustom) return;

        // Try getting cached binary blob from IndexedDB
        const blob = await getSavedVideoBlob(STORAGE_VIDEO_KEY);
        if (blob) {
          activeBlobUrl = URL.createObjectURL(blob);
          setCustomVideoSrc(activeBlobUrl);
          const savedName = localStorage.getItem(STORAGE_NAME_KEY);
          if (savedName) setCustomVideoName(savedName);
        } else {
          // Fallback to server version
          const version = localStorage.getItem(STORAGE_VERSION_KEY) || Date.now();
          setCustomVideoSrc(`/amman_event_video.mp4?v=${version}`);
        }
      } catch (e) {
        console.warn('Failed restoring custom video:', e);
      }
    };

    restoreCustomVideo();

    const handleSync = () => {
      restoreCustomVideo();
    };

    window.addEventListener(VIDEO_SYNC_EVENT, handleSync);
    return () => {
      window.removeEventListener(VIDEO_SYNC_EVENT, handleSync);
      if (activeBlobUrl) {
        URL.revokeObjectURL(activeBlobUrl);
      }
    };
  }, []);

  // When currentVideoSrc changes, reload the video element immediately
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    video.muted = isMuted;

    try {
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy might pause until user interaction
            setIsPlaying(false);
          });
      }
    } catch (e) {
      console.warn('Video load error:', e);
    }
  }, [currentVideoSrc]);

  // Handle timeupdate, duration change, and state synchronization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration && !isNaN(video.duration)) {
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      console.warn('HTML5 Video playback error occurred on src:', currentVideoSrc);
      setHasError(true);
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('error', onError);
    };
  }, [currentVideoSrc]);

  // Autoplay gently when scrolled into view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true;
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [currentVideoSrc]);

  const togglePlay = () => {
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = ratio * duration;
  };

  const handleJumpToTime = (timeInSec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = timeInSec;
    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleVideoSelect = (index: number) => {
    setCustomVideoSrc(null);
    try {
      localStorage.removeItem(STORAGE_FLAG_KEY);
      localStorage.removeItem(STORAGE_NAME_KEY);
    } catch {
      // ignore
    }
    setCustomVideoName(null);
    setActiveVideoIndex(index);
    setProgress(0);
  };

  const handleResetToDefault = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    await deleteSavedVideoBlob(STORAGE_VIDEO_KEY);
    try {
      localStorage.removeItem(STORAGE_FLAG_KEY);
      localStorage.removeItem(STORAGE_NAME_KEY);
      localStorage.removeItem(STORAGE_VERSION_KEY);
    } catch {
      // ignore
    }
    setCustomVideoSrc(null);
    setCustomVideoName(null);
    setHasError(false);
    setStatusFeedback('Reverted to Default Video');
    setTimeout(() => setStatusFeedback(null), 2500);

    if (videoRef.current) {
      videoRef.current.src = PLAYLIST[0].src;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="crafted-moments-video"
      className="relative py-20 lg:py-28 bg-[#060D1E] border-t border-b border-[#DFB76C]/30 overflow-hidden"
    >

      {/* Background Mandala Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(223,183,108,0.08),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute -left-20 top-12 hidden lg:block opacity-20 pointer-events-none">
        <MandalaMotif size={320} opacity={0.35} variant="full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#0D1B36] border border-[#DFB76C]/40 text-xs text-[#F5D77F] shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span className="font-semibold uppercase tracking-widest">
              LIVE EVENT REEL · REAL CELEBRATION IN MOTION
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 [text-wrap:balance]">
            Experience Our Events Live
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#DFB76C] mb-3">
            &ldquo;மணமக்கள் மலர் பல்லக்கு வருகை &amp; பிரம்மாண்ட மேடை அலங்காரம்&rdquo;
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
            Witness the energy, auspicious rituals, and seamless coordination orchestrated by{' '}
            <strong className="text-white font-semibold">{BRAND_INFO.businessName}</strong>.
          </p>
        </div>

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Smartphone / Video Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* Outer Luxury Phone Bezel */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-[38px] p-3 bg-gradient-to-b from-[#DFB76C] via-[#1A2E59] to-[#0A1224] shadow-[0_20px_60px_rgba(0,0,0,0.85)] border-2 border-[#DFB76C]/60">
              {/* Inner Screen */}
              <div className="relative w-full aspect-[9/16] rounded-[28px] overflow-hidden bg-black shadow-2xl flex flex-col justify-between group">
                {/* HTML5 Native Video Stream - key ensures complete DOM re-render on video switch */}
                <video
                  ref={videoRef}
                  key={currentVideoSrc}
                  src={currentVideoSrc}
                  poster={activeVideo.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer z-0"
                  onClick={togglePlay}
                  aria-label={customVideoName || activeVideo.title}
                />

                {/* Ambient Dark Gradient Vignette for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none z-10" />

                {/* Error fallback overlay */}
                {hasError && (
                  <div className="absolute inset-0 z-35 bg-black/85 flex flex-col items-center justify-center p-6 text-center">
                    <AlertCircle className="w-10 h-10 text-rose-400 mb-2" />
                    <p className="text-sm font-bold text-white mb-1">Unable to Play Video</p>
                    <p className="text-xs text-slate-300 mb-4">
                      The video format or codec could not be decoded by this browser.
                    </p>
                    <button
                      onClick={handleResetToDefault}
                      className="px-3 py-1.5 rounded-lg bg-gold-gradient text-[#070D1E] text-xs font-bold"
                    >
                      Restore Default Video
                    </button>
                  </div>
                )}

                {/* 1. TOP HEADER: Brand Avatar, Status Pill, Audio & Fullscreen Buttons */}
                <div className="relative z-20 p-3.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9B782E] to-[#F5D77F] p-0.5 shadow-md shrink-0">
                      <div className="w-full h-full rounded-full bg-[#070D1E] flex items-center justify-center font-display font-black text-xs text-[#DFB76C]">
                        A
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display text-[11px] font-bold tracking-wider text-white">
                          AMMAN EVENTS
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <p className="text-[9px] text-[#F5D77F] font-medium leading-none">
                        Vittukatti, TTP
                      </p>
                    </div>
                  </div>

                  {/* Header Action Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/20 shadow-md cursor-pointer"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-rose-300" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                    <button
                      onClick={handleFullscreen}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/20 shadow-md cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-slate-200" />
                    </button>
                  </div>
                </div>

                {/* 2. RIGHT SIDEBAR ACTION BUTTONS */}
                <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3 text-white">
                  {/* Like Button */}
                  <button
                    onClick={() => {
                      setIsLiked(!isLiked);
                      setLikeCount((c) => (isLiked ? c - 1 : c + 1));
                    }}
                    className="flex flex-col items-center gap-0.5 cursor-pointer group"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-125 shadow-lg ${
                        isLiked
                          ? 'bg-rose-600 text-white'
                          : 'bg-black/60 text-white border border-white/20'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold drop-shadow">
                      {likeCount}
                    </span>
                  </button>

                  {/* WhatsApp Quick Chat */}
                  <a
                    href={BRAND_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-0.5 cursor-pointer group"
                    title="Direct WhatsApp Chat"
                  >
                    <div className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-emerald-400/30">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold text-emerald-300 drop-shadow">
                      Chat
                    </span>
                  </a>
                </div>

                {/* 3. CENTER: Play Overlay when Paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center text-[#070D1E] shadow-2xl transform scale-110 group-hover:scale-125 transition-transform active:scale-95">
                      <Play className="w-7 h-7 ml-1 fill-[#070D1E]" />
                    </div>
                    <span className="mt-3 px-3 py-1 rounded-full bg-black/80 text-[11px] font-bold text-[#F5D77F] border border-[#DFB76C]/40">
                      Tap to Play Celebration Reel
                    </span>
                  </div>
                )}

                {/* Feedback badge banner */}
                {statusFeedback && (
                  <div className="absolute top-16 left-3 right-3 z-40 px-3 py-2 rounded-xl bg-emerald-950/95 border border-emerald-500/60 text-emerald-300 text-xs text-center font-bold shadow-2xl flex items-center justify-center gap-1.5 animate-in fade-in">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{statusFeedback}</span>
                  </div>
                )}

                {/* 4. BOTTOM CAPTION & INTERACTIVE PROGRESS BAR */}
                <div className="relative z-20 p-3.5 pr-14 text-white text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-gradient text-[#070D1E] text-[10px] font-bold shadow-md mb-1.5">
                    <Sparkles className="w-3 h-3 fill-[#070D1E]" />
                    <span>{customVideoName ? 'Custom Event Video' : activeVideo.badge}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white drop-shadow leading-snug">
                    {customVideoName ? customVideoName : activeVideo.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#F5D77F] font-medium drop-shadow mb-1">
                    {activeVideo.tamil}
                  </p>
                  <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed mb-2">
                    {activeVideo.description}
                  </p>

                  {/* Scrubbing Timeline */}
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300">
                    <span>{formatTime(currentTime)}</span>
                    <div
                      onClick={handleSeek}
                      className="flex-1 h-1.5 bg-white/20 hover:h-2 rounded-full overflow-hidden cursor-pointer transition-all"
                    >
                      <div
                        className="h-full bg-gold-gradient transition-all duration-150"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span>{formatTime(duration || 72)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar below Phone */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {/* Sound toggle pill */}
              <button
                onClick={toggleMute}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0E1F42] hover:bg-[#132A5B] border border-[#DFB76C]/40 text-xs text-[#F5D77F] transition-all cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                    <span>Mute</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Playlist Selector, Scene Chapters & Booking Callout */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            {/* Playlist Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DFB76C]">
                  <Film className="w-4 h-4" />
                  <span>Choose Event Video to Play</span>
                </div>
              </div>

              <div className="space-y-3">
                {PLAYLIST.map((video, idx) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoSelect(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeVideoIndex === idx && !customVideoSrc
                        ? 'bg-gradient-to-r from-[#11244C] via-[#0E1B38] to-[#0A1428] border-[#DFB76C] shadow-lg shadow-[#D4AF37]/10'
                        : 'bg-slate-900/70 border-slate-800 hover:border-[#DFB76C]/40 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          activeVideoIndex === idx && !customVideoSrc
                            ? 'bg-gold-gradient text-[#070D1E]'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {activeVideoIndex === idx && isPlaying && !customVideoSrc ? (
                          <div className="flex items-center gap-0.5">
                            <span className="w-1 h-4 bg-current rounded-full animate-pulse" />
                            <span className="w-1 h-3 bg-current rounded-full animate-pulse delay-100" />
                            <span className="w-1 h-5 bg-current rounded-full animate-pulse delay-200" />
                          </div>
                        ) : (
                          <Play className="w-4 h-4 ml-0.5 fill-current" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DFB76C]/20 text-[#DFB76C] border border-[#DFB76C]/30">
                            {video.badge}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {video.durationLabel}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white leading-snug">
                          {video.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {video.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 shrink-0 ${
                        activeVideoIndex === idx && !customVideoSrc
                          ? 'text-[#DFB76C]'
                          : 'text-slate-600'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Jump-to-Moment Chapter Pills */}
            <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DFB76C] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Key Event Highlights in Video</span>
                </span>
                <span className="text-[10px] text-slate-400">Tap to jump timestamp</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CHAPTERS.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleJumpToTime(ch.time)}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-[#DFB76C]/50 text-left transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-[#DFB76C]/15 text-[#DFB76C] font-mono text-[10px] font-bold">
                        {ch.label}
                      </span>
                      <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate max-w-[170px]">
                        {ch.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 group-hover:text-[#DFB76C]">
                      {ch.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Planner Guarantee & Direct Contact Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0F1E3D] via-[#11244C] to-[#0A1428] border border-[#DFB76C]/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DFB76C] mb-2">
                <Award className="w-4 h-4 text-[#DFB76C]" />
                <span>Government Registered Event Organization</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                Want This Royal Setup For Your Event?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                From fresh flower entrance pallakku to high-energy sound rigs and banana-leaf banquets, let{' '}
                <strong className="text-white">{BRAND_INFO.plannerName}</strong> manage your entire event from start to finish.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry?.('Wedding')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient bg-gold-gradient-hover rounded-xl shadow-lg hover:shadow-[#D4AF37]/30 transition-all cursor-pointer active:scale-95"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book This Setup</span>
                </button>

                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/40 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Planner</span>
                </a>

                <a
                  href={`tel:${BRAND_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DFB76C]" />
                  <span>{BRAND_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
