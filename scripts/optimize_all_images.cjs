const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const BACKUP_DIR = path.resolve(IMAGES_DIR, 'originals');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

async function optimizeAll() {
  const files = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.png') && !f.includes('originals'));

  console.log(`Found ${files.length} PNG images to optimize...`);
  let totalOriginal = 0;
  let totalWebp = 0;
  let totalOptimizedPng = 0;

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);

    const stat = fs.statSync(filePath);
    totalOriginal += stat.size;

    // Backup if not already backed up
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    const baseName = path.basename(file, '.png');
    const webpPath = path.join(IMAGES_DIR, `${baseName}.webp`);

    const image = sharp(backupPath);
    const meta = await image.metadata();

    // Determine target size: max 900px wide/high
    const maxDim = 900;
    const resizeOptions = {
      fit: 'inside',
      withoutEnlargement: true
    };

    // 1. Generate WebP
    const webpBuffer = await sharp(backupPath)
      .resize(maxDim, maxDim, resizeOptions)
      .webp({ quality: 86, effort: 5 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuffer);
    totalWebp += webpBuffer.length;

    // 2. Generate Optimized PNG
    const pngBuffer = await sharp(backupPath)
      .resize(maxDim, maxDim, resizeOptions)
      .png({ compressionLevel: 9, effort: 7, palette: true })
      .toBuffer();
    fs.writeFileSync(filePath, pngBuffer);
    totalOptimizedPng += pngBuffer.length;

    console.log(`✓ ${file}: ${(stat.size / 1024 / 1024).toFixed(2)} MB -> PNG: ${(pngBuffer.length / 1024).toFixed(0)} KB | WebP: ${(webpBuffer.length / 1024).toFixed(0)} KB`);
  }

  console.log('--------------------------------------------------');
  console.log(`Original total size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized PNG total: ${(totalOptimizedPng / 1024 / 1024).toFixed(2)} MB (${((1 - totalOptimizedPng / totalOriginal) * 100).toFixed(1)}% reduction)`);
  console.log(`Optimized WebP total: ${(totalWebp / 1024 / 1024).toFixed(2)} MB (${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}% reduction)`);
  console.log('All images optimized successfully!');
}

optimizeAll().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
