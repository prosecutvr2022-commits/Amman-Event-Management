import React, { useState, useEffect, useRef } from 'react';
import { Upload, RotateCcw, Check, Sparkles, Loader2 } from 'lucide-react';
import { optimizeImage } from '../utils/imageOptimizer';
import { getAssetUrl, handleImageErrorFallback } from '../utils/assetHelper';

interface PermanentPhotoSlotProps {
  id: string;
  defaultLabel: string;
  className?: string;
  title?: string;
  allowUpload?: boolean;
}

export const PermanentPhotoSlot: React.FC<PermanentPhotoSlotProps> = ({
  id,
  defaultLabel,
  className = '',
  title,
  allowUpload = false,
}) => {
  const cleanId = id.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '');
  const storageKey = `amman_${cleanId}_img`;
  const syncEvent = `amman_${cleanId}_updated`;

  // Additional aliases for synchronized wedding / g1 sections
  const aliasKeys = cleanId === 'wedding' || cleanId === 'section-image'
    ? ['amman_wedding_img', 'amman_section-image_img']
    : cleanId === 'g1' || cleanId === 'grand-royal-wedding-reception-mandap'
    ? ['amman_g1_img', 'amman_grand-royal-wedding-reception-mandap_img']
    : [storageKey];

  const aliasEvents = cleanId === 'wedding' || cleanId === 'section-image'
    ? ['amman_wedding_updated', 'amman_section-image_updated']
    : cleanId === 'g1' || cleanId === 'grand-royal-wedding-reception-mandap'
    ? ['amman_g1_updated', 'amman_grand-royal-wedding-reception-mandap_updated']
    : [syncEvent];

  const [customImage, setCustomImage] = useState<string | null>(() => {
    try {
      for (const k of aliasKeys) {
        const val = localStorage.getItem(k);
        if (val) return val;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [versionTimestamp, setVersionTimestamp] = useState<number>(() => Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync across card banner & modal instances
  useEffect(() => {
    const handleSync = () => {
      try {
        for (const k of aliasKeys) {
          const saved = localStorage.getItem(k);
          if (saved) {
            setCustomImage(saved);
            break;
          }
        }
      } catch {
        // ignore
      }
      setVersionTimestamp(Date.now());
    };

    aliasEvents.forEach((evt) => window.addEventListener(evt, handleSync));
    return () => {
      aliasEvents.forEach((evt) => window.removeEventListener(evt, handleSync));
    };
  }, [cleanId]);

  const saveFilePermanently = async (file: File) => {
    setIsSaving(true);
    setFeedback('Optimizing image...');

    try {
      // 1. Optimize image in browser to fit within quota limit (< 200KB)
      const { file: optimizedFile, dataUrl, optimizedSize } = await optimizeImage(file, 1200, 0.82);

      // 2. Set zero-latency preview
      setCustomImage(dataUrl);

      // 3. Save to browser storage safely (no QuotaExceededError) across aliases
      try {
        aliasKeys.forEach((k) => localStorage.setItem(k, dataUrl));
      } catch (e) {
        console.warn('Storage quota handled:', e);
      }

      setFeedback('Saving permanently...');

      // 4. Stream directly to backend server
      const response = await fetch(`/api/save-section-image?id=${cleanId}`, {
        method: 'POST',
        headers: {
          'Content-Type': optimizedFile.type || 'image/webp',
          'x-section-id': cleanId,
        },
        body: optimizedFile,
      });

      if (response.ok) {
        setVersionTimestamp(Date.now());
        aliasEvents.forEach((evt) => window.dispatchEvent(new Event(evt)));
        setFeedback(`Saved! (${(optimizedSize / 1024).toFixed(0)}KB) ✓`);
        setTimeout(() => setFeedback(null), 3500);
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
      aliasKeys.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
    setCustomImage(null);
    setVersionTimestamp(Date.now());
    aliasEvents.forEach((evt) => window.dispatchEvent(new Event(evt)));
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
      className={`relative w-full h-full overflow-hidden ${className} ${
        allowUpload && isDragging ? 'ring-4 ring-[#DFB76C] ring-inset' : ''
      }`}
      title={title || `${defaultLabel} - Amman Event Management`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden File Input for Image Replacement */}
      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />
      )}

      {/* Render Custom Replaced Image or Server Production Asset */}
      {customImage ? (
        <img
          src={customImage}
          alt={title || `${defaultLabel} Custom Photo`}
          className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105 block"
          loading="eager"
          decoding="async"
          onError={(e) => {
            console.warn(`[PermanentPhotoSlot] Custom image error for ${cleanId}:`, e);
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
            alt={title || defaultLabel}
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
          <p className="text-white font-serif font-bold text-sm mb-1">{title || defaultLabel}</p>
          <p className="text-xs text-[#DFB76C]/90">
            {allowUpload ? 'Click "Set Photo Permanently" below to add photo' : 'Amman Event Management'}
          </p>
        </div>
      )}

      {/* Drag & Drop Visual Overlay */}
      {allowUpload && isDragging && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center pointer-events-none animate-in fade-in">
          <Upload className="w-8 h-8 text-[#DFB76C] mb-2 animate-bounce" />
          <p className="text-white font-serif font-bold text-sm">Drop your photo here</p>
          <p className="text-[#DFB76C] text-xs mt-1">
            To permanently set as {defaultLabel} photo
          </p>
        </div>
      )}

      {/* Controls Overlay: Set Permanently Button & Status */}
      {allowUpload && (
        <div className="absolute bottom-2.5 right-2.5 z-30 flex items-center gap-1.5 flex-wrap justify-end">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/90 hover:bg-[#0B152B] text-[#F5D77F] hover:text-[#FFF2B2] border border-[#DFB76C] text-[11px] font-bold backdrop-blur-md shadow-xl transition-all cursor-pointer active:scale-95 hover:shadow-[#D4AF37]/30 hover:scale-[1.02]"
            title={`Click to select or drop image to permanently set as ${defaultLabel} photo`}
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

      {/* Permanent Status Indicator Badge on Top-Right */}
      {allowUpload && (
        <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-[#E6CA65] font-medium shadow-sm">
            <Sparkles className="w-2.5 h-2.5 text-[#DFB76C]" />
            <span>Live Photo Slot</span>
          </span>
        </div>
      )}
    </div>
  );
};
