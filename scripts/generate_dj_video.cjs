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
const FPS = 15;
const DURATION_SEC = 14;
const TOTAL_FRAMES = FPS * DURATION_SEC; // 210 frames

const colorThemes = [
  { primary: '#A855F7', secondary: '#EC4899', strobe: '#E9D5FF', bg: '#2E1065' }, // 0-3s Purple/Pink
  { primary: '#3B82F6', secondary: '#06B6D4', strobe: '#BAE6FD', bg: '#082F49' }, // 3-6s Blue/Cyan
  { primary: '#22C55E', secondary: '#EAB308', strobe: '#FEF08A', bg: '#14532D' }, // 6-9s Green/Gold
  { primary: '#EF4444', secondary: '#F97316', strobe: '#FDE047', bg: '#7F1D1D' }, // 9-11s FLAME ERUPTION
  { primary: '#8B5CF6', secondary: '#38BDF8', strobe: '#DDD6FE', bg: '#1E1B4B' }, // 11-14s Violet/Blue
];

function getTheme(timeSec) {
  if (timeSec < 3) return colorThemes[0];
  if (timeSec < 6) return colorThemes[1];
  if (timeSec < 9) return colorThemes[2];
  if (timeSec < 11.5) return colorThemes[3];
  return colorThemes[4];
}

async function renderFrame(i) {
  const timeSec = i / FPS;
  const theme = getTheme(timeSec);
  const isFlameActive = timeSec >= 9.8 && timeSec <= 11.2;
  const flameProgress = isFlameActive ? Math.sin((timeSec - 9.8) / 1.4 * Math.PI) : 0;
  const pulse = Math.sin(timeSec * 8) * 0.5 + 0.5;

  const svg = `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Ambient Glow -->
      <radialGradient id="stageGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${isFlameActive ? '#EA580C' : theme.primary}" stop-opacity="${0.6 + pulse * 0.3}" />
        <stop offset="60%" stop-color="${theme.bg}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#05070E" stop-opacity="0.98" />
      </radialGradient>

      <!-- Honeycomb Glow -->
      <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Flame Gradient -->
      <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#DC2626" />
        <stop offset="30%" stop-color="#EA580C" />
        <stop offset="70%" stop-color="#FBBF24" />
        <stop offset="100%" stop-color="#FEF08A" />
      </linearGradient>
    </defs>

    <!-- 1. Background Stage Room & Ambient Lighting -->
    <rect width="100%" height="100%" fill="#0A0C16" />
    <rect width="100%" height="100%" fill="url(#stageGlow)" />

    <!-- 2. Floor with Atmospheric Fog Waves -->
    <rect x="0" y="580" width="${WIDTH}" height="380" fill="#060913" />
    <!-- Low Lying Fog Clouds -->
    <ellipse cx="${180 + Math.sin(timeSec * 3) * 40}" cy="780" rx="220" ry="80" fill="#FFFFFF" opacity="${0.22 + pulse * 0.08}" />
    <ellipse cx="${360 - Math.cos(timeSec * 2) * 50}" cy="820" rx="240" ry="90" fill="#FFFFFF" opacity="${0.18 + pulse * 0.06}" />
    <ellipse cx="270" cy="740" rx="280" ry="70" fill="${theme.primary}" opacity="0.15" />

    <!-- 3. Overhead Moving Head Light Bar & Strobe Beams -->
    <rect x="140" y="160" width="260" height="24" rx="6" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <!-- 4 Spotlight Heads -->
    <circle cx="180" cy="172" r="12" fill="${theme.strobe}" opacity="${0.7 + pulse * 0.3}" />
    <circle cx="230" cy="172" r="12" fill="${theme.strobe}" opacity="${0.7 + Math.cos(timeSec * 10) * 0.3}" />
    <circle cx="310" cy="172" r="12" fill="${theme.strobe}" opacity="${0.7 + Math.sin(timeSec * 10) * 0.3}" />
    <circle cx="360" cy="172" r="12" fill="${theme.strobe}" opacity="${0.7 + pulse * 0.3}" />

    <!-- Downward Cone Light Beams -->
    <polygon points="180,180 ${100 + Math.sin(timeSec * 4) * 80},700 ${220 + Math.sin(timeSec * 4) * 80},700" fill="${theme.primary}" opacity="${0.2 + pulse * 0.15}" />
    <polygon points="360,180 ${320 - Math.sin(timeSec * 4) * 80},700 ${440 - Math.sin(timeSec * 4) * 80},700" fill="${theme.secondary}" opacity="${0.2 + pulse * 0.15}" />

    <!-- 4. Speaker Stacks (Left & Right) -->
    <!-- Left Concert Tower -->
    <rect x="25" y="220" width="95" height="420" rx="8" fill="#111827" stroke="#1F2937" stroke-width="3" />
    <circle cx="72" cy="280" r="28" fill="#1F2937" stroke="#374151" stroke-width="3" />
    <circle cx="72" cy="380" r="32" fill="#1F2937" stroke="#374151" stroke-width="3" />
    <circle cx="72" cy="490" r="34" fill="#1F2937" stroke="#374151" stroke-width="3" />
    <text x="72" y="580" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="bold" fill="#64748B">AMMAN PRO AUDIO</text>

    <!-- Right Concert Tower -->
    <rect x="420" y="220" width="95" height="420" rx="8" fill="#111827" stroke="#1F2937" stroke-width="3" />
    <circle cx="468" cy="280" r="28" fill="#1F2937" stroke="#374151" stroke-width="3" />
    <circle cx="468" cy="380" r="32" fill="#1F2937" stroke="#374151" stroke-width="3" />
    <circle cx="468" cy="490" r="34" fill="#1F2937" stroke="#374151" stroke-width="3" />
    <text x="468" y="580" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="bold" fill="#64748B">BASS ATX 1800</text>

    <!-- 5. DJ Artists Silhouette in Booth -->
    <g fill="#0F172A" stroke="#000000" stroke-width="2">
      <!-- Left DJ with headphones -->
      <circle cx="230" cy="380" r="26" />
      <path d="M190,440 C 190,400 270,400 270,440 Z" />
      <path d="M204,380 C 204,360 256,360 256,380" stroke="#DFB76C" stroke-width="4" fill="none" />
      <!-- Right DJ/Crew -->
      <circle cx="310" cy="390" r="24" />
      <path d="M275,445 C 275,410 345,410 345,445 Z" />
    </g>

    <!-- DJ Mixing Table Console -->
    <rect x="130" y="440" width="280" height="30" rx="4" fill="#0B132B" stroke="#DFB76C" stroke-width="2" />
    <circle cx="210" cy="455" r="10" fill="#DFB76C" />
    <circle cx="330" cy="455" r="10" fill="#DFB76C" />

    <!-- 6. Custom Geometric Honeycomb Hexagonal LED Light Booth -->
    <g id="honeycombBooth" transform="translate(135, 480)" filter="url(#neonGlow)">
      <!-- Hexagonal polygon helper: R=22 -->
      ${renderHexagonRow(0, 0, 6, theme, timeSec, 0)}
      ${renderHexagonRow(18, 30, 7, theme, timeSec, 1)}
      ${renderHexagonRow(0, 60, 6, theme, timeSec, 2)}
    </g>

    <!-- 7. REAL-TIME VERTICAL STAGE PYRO FLAME ERUPTION (AT 10 SECONDS) -->
    ${
      isFlameActive
        ? `
      <!-- Flame Jet Cannon Box on Floor -->
      <rect x="80" y="660" width="50" height="40" rx="4" fill="#1E293B" stroke="#F59E0B" stroke-width="2" />
      <!-- Vertical Flame Jet Blast -->
      <g filter="url(#neonGlow)">
        <!-- Outer Roaring Flame Body -->
        <path d="M105,660 C ${60 + Math.random() * 20},${550 - flameProgress * 280} ${70 + Math.random() * 30},${350 - flameProgress * 280} 105,${200 - flameProgress * 150} C ${140 + Math.random() * 30},${350 - flameProgress * 280} ${150 + Math.random() * 20},${550 - flameProgress * 280} 105,660 Z" fill="url(#flameGrad)" opacity="0.95" />
        <!-- Core White Hot Heart -->
        <path d="M105,660 C 85,500 85,380 105,250 C 125,380 125,500 105,660 Z" fill="#FFFFFF" opacity="0.8" />
        <!-- Fiery Sparks -->
        <circle cx="95" cy="${280 - flameProgress * 120}" r="6" fill="#FDE047" />
        <circle cx="120" cy="${320 - flameProgress * 120}" r="5" fill="#F97316" />
        <circle cx="100" cy="${210 - flameProgress * 120}" r="7" fill="#FEF08A" />
      </g>
      <!-- Ground Glow From Fire -->
      <ellipse cx="105" cy="680" rx="100" ry="25" fill="#F59E0B" opacity="0.65" />
    `
        : `
      <!-- Flame Machine in Ready Position -->
      <rect x="80" y="680" width="45" height="30" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1.5" />
      <circle cx="102" cy="680" r="5" fill="#DC2626" />
    `
    }

    <!-- 8. Subtle Watermark & Live Indicator Overlay -->
    <g transform="translate(20, 30)">
      <rect x="0" y="0" width="160" height="32" rx="16" fill="#000000" fill-opacity="0.75" stroke="#DFB76C" stroke-width="1.5" />
      <circle cx="16" cy="16" r="6" fill="#EF4444" />
      <text x="32" y="21" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">LIVE DJ &amp; FX</text>
      <text x="110" y="21" font-family="sans-serif" font-size="11" font-weight="900" fill="#FDE047">00:${Math.floor(timeSec).toString().padStart(2, '0')}</text>
    </g>

    <!-- Bottom Event Banner Branding -->
    <g transform="translate(20, 880)">
      <rect x="0" y="0" width="500" height="54" rx="12" fill="#050814" fill-opacity="0.9" stroke="#DFB76C" stroke-width="1.5" />
      <text x="250" y="24" text-anchor="middle" font-family="serif" font-size="15" font-weight="bold" fill="#F5D77F">AMMAN EVENT MANAGEMENT</text>
      <text x="250" y="42" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="600" fill="#94A3B8">Live DJ Console • Honeycomb LED • CO2 Flame Jet FX</text>
    </g>

    <!-- Gold Border Frame -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="none" stroke="#DFB76C" stroke-width="4" opacity="0.6" />
  </svg>
  `;

  const framePath = path.join(FRAMES_DIR, `frame_${i.toString().padStart(4, '0')}.png`);
  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .png({ compressionLevel: 6 })
    .toFile(framePath);
}

function renderHexagonRow(startX, startY, count, theme, timeSec, rowIndex) {
  let res = '';
  const hexWidth = 42;
  for (let j = 0; j < count; j++) {
    const cx = startX + j * hexWidth + 20;
    const cy = startY + 18;
    const offsetPulse = (Math.sin(timeSec * 7 + j * 0.8 + rowIndex) + 1) / 2;
    const fillColor = offsetPulse > 0.5 ? theme.primary : theme.secondary;
    const strokeColor = '#FEF08A';
    res += `<polygon points="${getHexagonPoints(cx, cy, 18)}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" opacity="${0.75 + offsetPulse * 0.25}" />`;
  }
  return res;
}

function getHexagonPoints(cx, cy, r) {
  const pts = [];
  for (let a = 0; a < 6; a++) {
    const angle = (Math.PI / 3) * a + Math.PI / 6;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    pts.push(`${x},${y}`);
  }
  return pts.join(' ');
}

async function main() {
  console.log(`Rendering ${TOTAL_FRAMES} frames for Live DJ Flame Show video...`);
  const batchSize = 15;
  for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
    const promises = [];
    for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
      promises.push(renderFrame(j));
    }
    await Promise.all(promises);
    process.stdout.write(`\rProgress: ${Math.min(i + batchSize, TOTAL_FRAMES)} / ${TOTAL_FRAMES} frames`);
  }
  console.log('\nAll frames rendered. Encoding MP4 with ffmpeg...');

  // Generate MP4 with faststart, h264, and synthetic pulse audio
  const ffmpegCmd = `ffmpeg -y -framerate ${FPS} -i "${path.join(FRAMES_DIR, 'frame_%04d.png')}" -f lavfi -i "sine=frequency=110:duration=${DURATION_SEC}" -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart -c:a aac -b:a 128k -shortest "${OUTPUT_MP4}"`;

  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log(`✓ Successfully generated ${OUTPUT_MP4} (${(fs.statSync(OUTPUT_MP4).size / 1024 / 1024).toFixed(2)} MB)`);

  // Clean up tmp frames
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  console.log('Cleaned up temporary frames.');
}

main().catch(console.error);
