const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const WORKS_DIR = path.join(IMAGES_DIR, 'works');
const DIST_DIR = path.resolve(__dirname, '../dist');
const DIST_IMAGES_DIR = path.join(DIST_DIR, 'images');
const DIST_WORKS_DIR = path.join(DIST_IMAGES_DIR, 'works');

// Ensure all target directories exist
[IMAGES_DIR, WORKS_DIR, DIST_IMAGES_DIR, DIST_WORKS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function syncAllImages() {
  console.log('--- Starting Complete Image Synchronization ---');

  const targets = [
    { id: 'wedding', isWork: false },
    { id: 'melam-nadhasvaram', isWork: false },
    { id: 'aiyar', isWork: false },
    { id: 'manamakal-malai', isWork: false },
    { id: 'arkestra-music', isWork: false },
    { id: 'food-stall', isWork: false },
    { id: 'horse-chariot', isWork: false },
    { id: 'mack-up', isWork: false },
    { id: 'bridal-groom', isWork: false },
    { id: 'certified-award-balamurugan', isWork: false },
  ];

  for (let i = 1; i <= 8; i++) {
    targets.push({ id: `work-${i}`, isWork: true });
  }

  for (const item of targets) {
    const srcDir = item.isWork ? WORKS_DIR : IMAGES_DIR;
    const distTargetDir = item.isWork ? DIST_WORKS_DIR : DIST_IMAGES_DIR;
    const baseSrcPath = path.join(srcDir, `${item.id}.png`);

    if (!fs.existsSync(baseSrcPath)) {
      console.warn(`Source not found for ${item.id}: ${baseSrcPath}`);
      continue;
    }

    const inputBuf = fs.readFileSync(baseSrcPath);
    const meta = await sharp(inputBuf).metadata();
    console.log(`Synchronizing ${item.id} (${meta.width}x${meta.height}, source format: ${meta.format})...`);

    // 1. Generate pristine WebP
    const webpBuffer = await sharp(inputBuf)
      .webp({ quality: 92, effort: 6 })
      .toBuffer();

    // 2. Generate genuine PNG
    const pngBuffer = await sharp(inputBuf)
      .png({ compressionLevel: 8 })
      .toBuffer();

    const targetPng = path.join(srcDir, `${item.id}.png`);
    const targetWebp = path.join(srcDir, `${item.id}.webp`);
    fs.writeFileSync(targetPng, pngBuffer);
    fs.writeFileSync(targetWebp, webpBuffer);

    // Sync to dist
    fs.writeFileSync(path.join(distTargetDir, `${item.id}.png`), pngBuffer);
    fs.writeFileSync(path.join(distTargetDir, `${item.id}.webp`), webpBuffer);

    // Handle Aliases
    if (item.id === 'certified-award-balamurugan') {
      fs.writeFileSync(path.join(IMAGES_DIR, 'award-balamurugan.png'), pngBuffer);
      fs.writeFileSync(path.join(IMAGES_DIR, 'award-balamurugan.webp'), webpBuffer);
      fs.writeFileSync(path.join(DIST_IMAGES_DIR, 'award-balamurugan.png'), pngBuffer);
      fs.writeFileSync(path.join(DIST_IMAGES_DIR, 'award-balamurugan.webp'), webpBuffer);
      console.log('✓ Award aliases synchronized (certified-award-balamurugan & award-balamurugan)');
    }

    if (item.id === 'wedding') {
      fs.writeFileSync(path.join(IMAGES_DIR, 'section-image.png'), pngBuffer);
      fs.writeFileSync(path.join(IMAGES_DIR, 'section-image.webp'), webpBuffer);
      fs.writeFileSync(path.join(PUBLIC_DIR, 'web_wedding_img_1.png'), pngBuffer);
      fs.writeFileSync(path.join(PUBLIC_DIR, 'web wedding img 1.png'), pngBuffer);

      fs.writeFileSync(path.join(DIST_IMAGES_DIR, 'section-image.png'), pngBuffer);
      fs.writeFileSync(path.join(DIST_IMAGES_DIR, 'section-image.webp'), webpBuffer);
      fs.writeFileSync(path.join(DIST_DIR, 'web_wedding_img_1.png'), pngBuffer);
      fs.writeFileSync(path.join(DIST_DIR, 'web wedding img 1.png'), pngBuffer);
      console.log('✓ Wedding aliases synchronized (section-image, web_wedding_img_1)');
    }

    console.log(`✓ ${item.id}: PNG (${(pngBuffer.length / 1024).toFixed(0)}KB) & WebP (${(webpBuffer.length / 1024).toFixed(0)}KB) synced`);
  }

  console.log('--- All Images Successfully Synchronized ---');
}

syncAllImages().catch((err) => {
  console.error('Failed to sync images:', err);
  process.exit(1);
});
