import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, MessageCircle, Heart, Share2, CheckCircle2, Upload, Award } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';

interface HeroVideoPlayerProps {
  onOpenEnquiry?: () => void;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({ onOpenEnquiry }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [customVideoSrc, setCustomVideoSrc] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(842);
  const [activeTabScene, setActiveTabScene] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Synchronized scenes from the uploaded Amman Event Management wedding video
  const SCENES = [
    {
      time: 0,
      badge: 'Ponnu Mappillai',
      title: 'Flower Canopy & Pallakku Entry',
      tamil: 'மணமக்கள் மலர் பல்லக்கு வருகை',
      desc: 'Grand entrance of bride & groom with traditional fresh flower canopy and festive procession.',
      tag: 'Grand Entrance'
    },
    {
      time: 3.5,
      badge: 'Surprise Dance',
      title: 'Couple Stage Choreography & Pyros',
      tamil: 'மணமக்கள் சர்ப்ரைஸ் நடனம்',
      desc: 'Joyful couple dance on the illuminated stage with fountain pyros and golden confetti.',
      tag: 'Stage Reveal'
    },
    {
      time: 7.5,
      badge: 'Welcome Dance',
      title: 'Deepam Procession & Chenda Melam',
      tamil: 'தீப வரவேற்பு நடனம் & சண்ட மேளம்',
      desc: 'Traditional welcome troupe in Kasavu attire holding lit brass deepams with energetic beats.',
      tag: 'Cultural Heritage'
    },
    {
      time: 11.0,
      badge: 'A to Z Service',
      title: 'Melam, Nadaswaram, Stalls, Decor',
      tamil: 'அரசு அங்கீகாரம் பெற்ற அம்மன் ஈவென்ட்',
      desc: 'Complete wedding setup: Popcorn stall, Mehndi, Bangles, DJ, Audio-Visual, Shadow Entry.',
      tag: 'Complete Services'
    },
    {
      time: 14.0,
      badge: 'Client Review',
      title: 'Heartfelt Praise: "Super-ah irundhuchu!"',
      tamil: 'வாடிக்கையாளர் பாராட்டு · Thank you!',
      desc: 'Guest appreciation for J. Balamurugan: "Everything was coordinated so neatly!"',
      tag: 'Happy Family'
    }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const cur = video.currentTime;
        const dur = video.duration;
        setProgress((cur / dur) * 100);
        setCurrentTime(cur);

        if (cur < 3.5) setActiveTabScene(0);
        else if (cur < 7.5) setActiveTabScene(1);
        else if (cur < 11.0) setActiveTabScene(2);
        else if (cur < 14.0) setActiveTabScene(3);
        else setActiveTabScene(4);
      }
    };

    const handleCanPlay = () => setVideoLoaded(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => setIsPlaying(false));
      });
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [customVideoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleSeekScene = (sceneIndex: number) => {
    setActiveTabScene(sceneIndex);
    if (videoRef.current) {
      videoRef.current.currentTime = SCENES[sceneIndex].time;
      if (!isPlaying) videoRef.current.play();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoSrc(url);
      setIsPlaying(true);
    }
  };

  const currentScene = SCENES[activeTabScene] || SCENES[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Outer Phone Bezel with Gold Shimmer */}
      <div className="relative w-[300px] sm:w-[330px] md:w-[350px] rounded-[36px] p-2.5 sm:p-3 bg-gradient-to-b from-[#DFB76C] via-[#1A2E59] to-[#0A1224] shadow-[0_0_60px_-10px_rgba(212,175,55,0.45)] border border-[#DFB76C]/40">
        
        {/* Main Viewport Container */}
        <div className="relative w-full h-[520px] sm:h-[570px] md:h-[600px] rounded-[28px] overflow-hidden bg-black shadow-2xl flex flex-col justify-between select-none">
          
          {/* HTML5 Video Element with source children for maximum browser compatibility */}
          <video
            ref={videoRef}
            poster="/hero_event_poster.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover cursor-pointer z-0"
            onClick={togglePlay}
            aria-label="Amman Event Management Wedding Reel"
          >
            <source src={customVideoSrc || '/hero_event_video.mp4'} type="video/mp4" />
          </video>

          {/* Fallback Graphic Simulation Layer if video is loading or decoding */}
          {!videoLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#09152B] via-[#0E1F42] to-[#060D1E] z-5">
              <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center text-[#070D1E] font-bold text-xl mb-3 shadow-lg">
                A
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-1">
                AMMAN EVENT MANAGEMENT
              </h4>
              <p className="text-xs text-[#E6CA65] mb-4">
                Wedding Reel · Loading Highlights
              </p>
              <div className="w-6 h-6 border-2 border-[#DFB76C] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Vignette Overlay for Crisp Readability of Captions and Branding */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/90 pointer-events-none z-10" />

          {/* 1. TOP HEADER: Brand Avatar, Title & Audio/Play Toggles */}
          <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9B782E] to-[#F5D77F] p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full rounded-full bg-[#070D1E] flex items-center justify-center font-display font-black text-sm text-[#DFB76C]">
                  A
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xs font-bold tracking-wider text-white drop-shadow">
                    AMMAN EVENTS
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-[#F5D77F] font-medium leading-none drop-shadow">
                  {BRAND_INFO.location.address}
                </p>
              </div>
            </div>

            {/* Quick Interactive Video Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-md"
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                )}
              </button>

              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-md"
                aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-slate-200" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5 text-[#DFB76C]" />
                )}
              </button>
            </div>
          </div>

          {/* 2. RIGHT SIDEBAR: Instagram Reel Action Stack */}
          <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3.5 text-white">
            {/* Heart / Like */}
            <button
              onClick={() => {
                setIsLiked(!isLiked);
                setLikeCount((p) => (isLiked ? p - 1 : p + 1));
              }}
              className="flex flex-col items-center gap-0.5 cursor-pointer group"
              aria-label="Like Video"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-125 shadow-lg ${
                  isLiked ? 'bg-rose-600 text-white' : 'bg-black/50 text-white border border-white/15'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[10px] font-mono font-medium drop-shadow">{likeCount}</span>
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 cursor-pointer group"
              aria-label="Enquire via WhatsApp"
              title="Chat with Planner"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-emerald-400/30">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-emerald-300 drop-shadow">Chat</span>
            </a>

            {/* Upload Video Selector */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-0.5 cursor-pointer group"
              aria-label="Upload custom MP4 video"
              title="Select local video file to play in reel"
            >
              <div className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#DFB76C] hover:text-[#070D1E] text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/15 shadow-lg">
                <Upload className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-medium text-slate-300 drop-shadow">Select</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="video/mp4,video/quicktime,video/webm"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* 3. CENTER: Play Overlay when Paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 z-30 flex items-center justify-center bg-black/45 backdrop-blur-[2px] cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center text-[#070D1E] shadow-2xl transform scale-110 active:scale-95 transition-all">
                <Play className="w-7 h-7 ml-1 fill-[#070D1E]" />
              </div>
            </div>
          )}

          {/* 4. BOTTOM CAPTION & REAL BANNER DETAILS */}
          <div className="relative z-20 p-3.5 sm:p-4 pr-14 text-white text-left">
            {/* Live Scene Badge from user video */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-[#DFB76C] text-[#070D1E] text-[11px] font-bold shadow-md mb-2">
              <Sparkles className="w-3 h-3 fill-[#070D1E]" />
              <span>{currentScene.badge}</span>
            </div>

            <h4 className="text-sm font-bold text-white drop-shadow leading-snug">
              {currentScene.title}
            </h4>
            <p className="text-xs text-[#F5D77F] font-medium drop-shadow mb-1">
              {currentScene.tamil}
            </p>
            <p className="text-[11px] text-slate-300 drop-shadow line-clamp-2 leading-relaxed mb-3">
              {currentScene.desc}
            </p>

            {/* Official Contact Strip from Banner */}
            <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-black/75 backdrop-blur-md border border-[#DFB76C]/30 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span className="font-semibold text-slate-200">அம்மன் ஈவென்ட்</span>
              </div>
              <a
                href={`tel:${BRAND_INFO.phoneRaw}`}
                className="font-mono font-bold text-[#E6CA65] hover:underline"
              >
                📞 {BRAND_INFO.phone}
              </a>
            </div>

            {/* Video Progress Bar Scrubber */}
            <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden cursor-pointer">
              <div
                className="h-full bg-gold-gradient transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5. SCENE SWITCHER TABS UNDER VIDEO */}
        <div className="mt-3 pt-1 border-t border-slate-800/80">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 text-center">
            Jump to Event Moments
          </p>
          <div className="grid grid-cols-5 gap-1 text-[10px]">
            {SCENES.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => handleSeekScene(idx)}
                className={`py-1 px-1 rounded-lg text-center transition-all cursor-pointer truncate ${
                  activeTabScene === idx
                    ? 'bg-gold-gradient text-[#070D1E] font-bold shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
                }`}
                title={sc.title}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Footer info pill */}
        <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-[#DFB76C]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300">Live Video Highlight</span>
          </span>
          <button
            onClick={onOpenEnquiry}
            className="text-[#DFB76C] hover:text-white underline font-semibold cursor-pointer"
          >
            Book This Setup →
          </button>
        </div>
      </div>
    </div>
  );
};
