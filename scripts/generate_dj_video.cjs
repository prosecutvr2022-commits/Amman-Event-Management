const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const FRAMES_DIR = path.resolve(__dirname, '../tmp_frames');
if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const OUTPUT_MP4 = path.join(PUBLIC_DIR, 'live_dj_flame_show.mp4');

const WIDTH = 540;
const HEIGHT = 960;
const FPS = 30;
const DURATION_SEC = 14;
const TOTAL_FRAMES = FPS * DURATION_SEC; // 420 frames

async function main() {
  console.log(`Preparing realistic DJ video using uploaded photo background...`);
  
  // Load uploaded realistic background photo buffer
  const bgPhotoPath = path.join(PUBLIC_DIR, 'images/uploaded_dj_real.webp');
  let bgBuffer = null;
  if (fs.existsSync(bgPhotoPath)) {
    bgBuffer = await sharp(bgPhotoPath)
      .resize(WIDTH, HEIGHT, { fit: 'cover' })
      .toBuffer();
  }

  console.log(`Rendering ${TOTAL_FRAMES} frames at 30 FPS...`);
  const batchSize = 20;
  for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
    const promises = [];
    for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
      promises.push(renderFrame(j, bgBuffer));
    }
    await Promise.all(promises);
    process.stdout.write(`\rProgress: ${Math.min(i + batchSize, TOTAL_FRAMES)} / ${TOTAL_FRAMES} frames`);
  }
  console.log('\nAll frames rendered. Encoding MP4 with ffmpeg...');

  const ffmpegCmd = `ffmpeg -y -framerate ${FPS} -i "${path.join(FRAMES_DIR, 'frame_%04d.png')}" -f lavfi -i "sine=frequency=110:duration=${DURATION_SEC}" -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart -c:a aac -b:a 128k -shortest "${OUTPUT_MP4}"`;

  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log(`✓ Successfully generated realistic ${OUTPUT_MP4}`);

  // Copy to dist if dist exists
  const distPublic = path.resolve(__dirname, '../dist');
  if (fs.existsSync(distPublic)) {
    fs.copyFileSync(OUTPUT_MP4, path.join(distPublic, 'live_dj_flame_show.mp4'));
  }

  // Clean up tmp frames
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  console.log('Cleaned up temporary frames.');
}

async function renderFrame(i, bgBuffer) {
  const timeSec = i / FPS;
  const isFlameActive = timeSec >= 9.5 && timeSec <= 11.5;
  const flameProgress = isFlameActive ? Math.sin((timeSec - 9.5) / 2.0 * Math.PI) : 0;
  const pulse = Math.sin(timeSec * 8) * 0.5 + 0.5;

  let compositeInputs = [];

  if (bgBuffer) {
    compositeInputs.push({
      input: bgBuffer,
      top: 0,
      left: 0
    });
  }

  // Build SVG overlay for dynamic concert lights, smoke haze, and flame jet
  const svgOverlay = `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#DC2626" />
        <stop offset="30%" stop-color="#EA580C" />
        <stop offset="70%" stop-color="#FBBF24" />
        <stop offset="100%" stop-color="#FEF08A" />
      </linearGradient>
    </defs>

    <!-- Ambient Lighting Pulse overlay -->
    <rect width="100%" height="100%" fill="${timeSec < 3 ? '#A855F7' : timeSec < 6 ? '#3B82F6' : timeSec < 9 ? '#22C55E' : '#EF4444'}" opacity="${0.12 + pulse * 0.08}" style="mix-blend-mode: overlay;" />

    <!-- Atmospheric Fog / Smoke Waves drifting -->
    <ellipse cx="${180 + Math.sin(timeSec * 3) * 50}" cy="780" rx="240" ry="80" fill="#FFFFFF" opacity="${0.25 + pulse * 0.1}" />
    <ellipse cx="${360 - Math.cos(timeSec * 2) * 60}" cy="830" rx="260" ry="90" fill="${timeSec < 5 ? '#C084FC' : '#67E8F9'}" opacity="0.18" />

    <!-- REAL-TIME VERTICAL STAGE PYRO FLAME ERUPTION (AT 10 SECONDS) -->
    ${
      isFlameActive
        ? `
      <!-- Flame Jet Cannon Box on Floor -->
      <rect x="75" y="650" width="60" height="50" rx="6" fill="#1E293B" stroke="#F59E0B" stroke-width="2.5" />
      <!-- Vertical Flame Jet Blast -->
      <g filter="url(#neonGlow)">
        <path d="M105,650 C ${50 + Math.random() * 20},${500 - flameProgress * 320} ${60 + Math.random() * 30},${300 - flameProgress * 320} 105,${160 - flameProgress * 180} C ${150 + Math.random() * 30},${300 - flameProgress * 320} ${160 + Math.random() * 20},${500 - flameProgress * 320} 105,650 Z" fill="url(#flameGrad)" opacity="0.98" />
        <path d="M105,650 C 85,480 85,350 105,220 C 125,350 125,480 105,650 Z" fill="#FFFFFF" opacity="0.85" />
        <circle cx="95" cy="${260 - flameProgress * 140}" r="8" fill="#FDE047" />
        <circle cx="120" cy="${300 - flameProgress * 140}" r="7" fill="#F97316" />
        <circle cx="100" cy="${190 - flameProgress * 140}" r="9" fill="#FEF08A" />
      </g>
      <!-- Ground Glow From Fire -->
      <ellipse cx="105" cy="680" rx="120" ry="30" fill="#F59E0B" opacity="0.75" />
    `
        : ''
    }

    <!-- Live Indicator Overlay -->
    <g transform="translate(20, 30)">
      <rect x="0" y="0" width="165" height="32" rx="16" fill="#000000" fill-opacity="0.8" stroke="#DFB76C" stroke-width="1.5" />
      <circle cx="16" cy="16" r="6" fill="#EF4444" />
      <text x="32" y="21" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">LIVE DJ &amp; FX</text>
      <text x="115" y="21" font-family="sans-serif" font-size="11" font-weight="900" fill="#FDE047">00:${Math.floor(timeSec).toString().padStart(2, '0')}</text>
    </g>

    <!-- Bottom Event Banner Branding -->
    <g transform="translate(20, 880)">
      <rect x="0" y="0" width="500" height="54" rx="12" fill="#050814" fill-opacity="0.92" stroke="#DFB76C" stroke-width="1.5" />
      <text x="250" y="24" text-anchor="middle" font-family="serif" font-size="15" font-weight="bold" fill="#F5D77F">AMMAN EVENT MANAGEMENT</text>
      <text x="250" y="42" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="600" fill="#94A3B8">Live DJ Console • Honeycomb LED • CO2 Flame Jet FX</text>
    </g>

    <!-- Gold Border Frame -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="none" stroke="#DFB76C" stroke-width="4" opacity="0.7" />
  </svg>
  `;

  const svgBuffer = Buffer.from(svgOverlay);
  compositeInputs.push({ input: svgBuffer, top: 0, left: 0 });

  const framePath = path.join(FRAMES_DIR, `frame_${i.toString().padStart(4, '0')}.png`);
  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { r: 5, g: 10, b: 25, alpha: 1 }
    }
  })
    .composite(compositeInputs)
    .png({ compressionLevel: 6 })
    .toFile(framePath);
}

main().catch(console.error);
