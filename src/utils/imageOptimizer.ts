/**
 * Client-Side Image Optimizer
 * Resizes and compresses uploaded images in the browser before saving or uploading.
 * Prevents QuotaExceededError in localStorage and optimizes network payload to < 200KB.
 */

export interface OptimizedResult {
  file: File;
  dataUrl: string;
  originalSize: number;
  optimizedSize: number;
}

export async function optimizeImage(
  file: File,
  maxDimension = 1200,
  quality = 0.82
): Promise<OptimizedResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();

      img.onerror = () => reject(new Error('Failed to load image for optimization'));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Proportional downscaling
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            file,
            dataUrl: src,
            originalSize: file.size,
            optimizedSize: file.size,
          });
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // First attempt WebP, fallback to JPEG
        const mimeType = canvas.toDataURL('image/webp').startsWith('data:image/webp')
          ? 'image/webp'
          : 'image/jpeg';

        const dataUrl = canvas.toDataURL(mimeType, quality);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({
                file,
                dataUrl,
                originalSize: file.size,
                optimizedSize: file.size,
              });
              return;
            }

            const optimizedFile = new File([blob], file.name.replace(/\.[^.]+$/, `.${mimeType === 'image/webp' ? 'webp' : 'jpg'}`), {
              type: mimeType,
              lastModified: Date.now(),
            });

            resolve({
              file: optimizedFile,
              dataUrl,
              originalSize: file.size,
              optimizedSize: optimizedFile.size,
            });
          },
          mimeType,
          quality
        );
      };

      img.src = src;
    };

    reader.readAsDataURL(file);
  });
}
