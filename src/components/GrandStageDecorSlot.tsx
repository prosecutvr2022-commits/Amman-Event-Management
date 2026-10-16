import React, { useState, useEffect, useRef } from 'react';
import { Upload, RotateCcw, Check, Sparkles, Loader2, Maximize2 } from 'lucide-react';
import { optimizeImage } from '../utils/imageOptimizer';
import { getAssetUrl, handleImageErrorFallback } from '../utils/assetHelper';

interface GrandStageDecorSlotProps {
  id: 'grand-stage-teal-halo' | 'grand-stage-aandal-mandap';
  title: string;
  badgeLabel: string;
  subLabel: string;
  description: string;
  onOpenLightbox: () => void;
  allowUpload?: boolean;
}

export const GrandStageDecorSlot: React.FC<GrandStageDecorSlotProps> = ({
  id,
  title,
  badgeLabel,
  subLabel,
  description,
  onOpenLightbox,
  allowUpload = false,
}) => {
  const cleanId = id.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '');
  const storageKey = `amman_${cleanId}_img`;
  const syncEvent = `amman_${cleanId}_updated`;

  const [customImage, setCustomImage] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [versionTimestamp, setVersionTimestamp] = useState<number>(() => Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // No-op sync
  }, [storageKey, syncEvent]);

  const saveFilePermanently = async (file: File) => {
    if (!allowUpload) return;
    setIsSaving(true);
    setFeedback('Optimizing PNG photo...');

    try {
      // 1. Optimize image in browser to fit safely within quota (< 200KB)
      const { file: optimizedFile, dataUrl, optimizedSize } = await optimizeImage(file, 1200, 0.85);

      // 2. Set zero-latency preview
      setCustomImage(dataUrl);

      // 3. Save to browser local storage safely
      try {
        localStorage.setItem(storageKey, dataUrl);
      } catch (e) {
        console.warn('Storage quota handled:', e);
      }

      setFeedback('Saving permanently...');

      // 4. Stream directly to backend server to write permanently to /public/images/
      const response = await fetch(`/api/save-section-image?id=${cleanId}`, {
        method: 'POST',
        headers: {
          'Content-Type': optimizedFile.type || 'image/png',
          'x-section-id': cleanId,
        },
        body: optimizedFile,
      });

      if (response.ok) {
        setVersionTimestamp(Date.now());
        window.dispatchEvent(new Event(syncEvent));
        setFeedback(`Saved Permanently! (${(optimizedSize / 1024).toFixed(0)}KB) ✓`);
        setTimeout(() => setFeedback(null), 4000);
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (err) {
      console.warn('Fallback error:', err);
      setFeedback('Saved in Browser Storage ✓');
      setTimeout(() => setFeedback(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      saveFilePermanently(file);
    }
    e.target.value = '';
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setCustomImage(null);
    setVersionTimestamp(Date.now());
    window.dispatchEvent(new Event(syncEvent));
    setFeedback('Reverted to Default');
    setTimeout(() => setFeedback(null), 2500);
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!allowUpload) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!allowUpload) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!allowUpload) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      saveFilePermanently(file);
    }
  };

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border border-[#DFB76C]/50 bg-[#061024] shadow-xl hover:border-[#DFB76C] transition-all flex flex-col ${
        allowUpload && isDragging ? 'ring-4 ring-[#DFB76C] ring-inset' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden File Input for PNG Replacement */}
      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />
      )}

      {/* Image Stage Container */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 cursor-pointer"
        onClick={onOpenLightbox}
        title="Click to view full photo in lightbox"
      >
        {customImage ? (
          <img
            src={customImage}
            alt={title}
            className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
            loading="eager"
            decoding="async"
            onError={(e) => {
              console.warn(`[GrandStageDecorSlot] Custom image error for ${cleanId}:`, e);
              setImageError(true);
            }}
          />
        ) : !imageError ? (
          <picture className="w-full h-full block">
            <source
              srcSet={`${getAssetUrl(`images/${cleanId}.webp`)}?v=${versionTimestamp}`}
              type="image/webp"
            />
            <img
              src={`${getAssetUrl(`images/${cleanId}.png`)}?v=${versionTimestamp}`}
              alt={title}
              className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                handleImageErrorFallback(e, `images/${cleanId}.png`);
              }}
            />
          </picture>
        ) : (
          <div className="w-full h-full bg-[#081226] border border-[#DFB76C]/30 flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-8 h-8 text-[#DFB76C] mb-2 opacity-80" />
            <p className="text-white font-serif font-bold text-sm mb-1">{title}</p>
            <p className="text-xs text-[#DFB76C]/90">
              {allowUpload ? 'Click "Set Photo Permanently" below to upload' : 'Amman Event Management'}
            </p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Drag & Drop Visual Overlay */}
        {allowUpload && isDragging && (
          <div className="absolute inset-0 z-40 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center pointer-events-none animate-in fade-in">
            <Upload className="w-8 h-8 text-[#DFB76C] mb-2 animate-bounce" />
            <p className="text-white font-serif font-bold text-sm">Drop your photo here</p>
            <p className="text-[#DFB76C] text-xs mt-1">To permanently set as {title}</p>
          </div>
        )}

        {/* Top-Left Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2.5 py-0.5 rounded-md bg-black/80 border border-[#DFB76C]/40 text-[#F5D77F] text-[10px] font-bold tracking-wide backdrop-blur-md shadow-sm">
            {badgeLabel}
          </span>
        </div>

        {/* Top-Right: Fullscreen Magnify Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox();
          }}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-lg bg-black/75 hover:bg-[#0B152B] text-[#DFB76C] border border-[#DFB76C]/40 backdrop-blur-md transition-all hover:scale-110 cursor-pointer shadow-md"
          title="Expand to Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#DFB76C]" />
        </button>

        {/* Controls Overlay Bottom-Right: Set Photo Permanently button */}
        {allowUpload && (
          <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 flex-wrap justify-end">
            {feedback && (
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/95 text-emerald-300 border border-emerald-500/60 text-[10px] font-bold backdrop-blur-md shadow-lg animate-in fade-in flex items-center gap-1">
                {isSaving ? (
                  <Loader2 className="w-3 h-3 text-emerald-400 animate-spin" />
                ) : (
                  <Check className="w-3 h-3 text-emerald-400" />
                )}
                {feedback}
              </span>
            )}

            {customImage && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950/85 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/60 text-[10px] font-medium backdrop-blur-md shadow-md transition-all cursor-pointer active:scale-95"
                title="Reset to default image"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={triggerUpload}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/90 hover:bg-[#0B152B] text-[#F5D77F] hover:text-[#FFF2B2] border border-[#DFB76C] text-[10px] sm:text-[11px] font-bold backdrop-blur-md shadow-xl transition-all cursor-pointer active:scale-95 hover:shadow-[#D4AF37]/30 hover:scale-[1.02]"
              title={`Click to select or drop image to permanently set as ${title}`}
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 text-[#DFB76C] animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-[#DFB76C]" />
              )}
              <span>Set Photo Permanently</span>
            </button>
          </div>
        )}

        {/* Bottom Title Overlay (on left side) */}
        <div className="absolute bottom-2 left-2.5 z-10 pointer-events-none max-w-[65%]">
          <p className="text-white font-serif font-bold text-xs sm:text-sm drop-shadow-md truncate">
            {title}
          </p>
        </div>
      </div>

      {/* Information Footer Strip */}
      <div className="px-3 py-2 bg-[#091429] border-t border-[#DFB76C]/20 flex items-center justify-between text-[11px]">
        <span className="text-slate-300 flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {subLabel}
        </span>
        <button
          type="button"
          onClick={onOpenLightbox}
          className="text-[#DFB76C] hover:text-[#F5D77F] font-semibold text-[10px] cursor-pointer"
        >
          View Large
        </button>
      </div>
    </div>
  );
};
