const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const WORKS_DIR = path.join(IMAGES_DIR, 'works');

if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
if (!fs.existsSync(WORKS_DIR)) fs.mkdirSync(WORKS_DIR, { recursive: true });

const PHOTO_SOURCES = {
  'aiyar': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/South_Indian_wedding_2.jpg/1280px-South_Indian_wedding_2.jpg',
  'melam-nadhasvaram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Thavil_being_performed_in_South_Indian_Marriage_JEG6748.JPG/1280px-Thavil_being_performed_in_South_Indian_Marriage_JEG6748.JPG',
  'manamakal-malai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg/1280px-Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg',
  'bridal-groom': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/South_Indian_Marriage.jpg/1280px-South_Indian_Marriage.jpg',
  'mack-up': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Bridal_makeup_for_Indian_Wedding.jpg/1280px-Bridal_makeup_for_Indian_Wedding.jpg',
  'food-stall': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Onam_Sadhya_served_on_banana_leaf_at_Wiki_Conference_India_2026_in_Crown_Plaza_Hotel_in_Kochi_01.jpg/1280px-Onam_Sadhya_served_on_banana_leaf_at_Wiki_Conference_India_2026_in_Crown_Plaza_Hotel_in_Kochi_01.jpg',
  'violin-program': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Carnatic_violins.jpg/1280px-Carnatic_violins.jpg',
  'horse-chariot': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Baraat_-_Odia_Hindu_Wedding_Ceremony_-_Kamakhyanagar_-_Dhenkanal_2018-01-24_7714.JPG/1280px-Baraat_-_Odia_Hindu_Wedding_Ceremony_-_Kamakhyanagar_-_Dhenkanal_2018-01-24_7714.JPG',
  'grand-stage-teal-halo': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Indian_Wedding_Mandap_Decoration.jpg/1280px-Indian_Wedding_Mandap_Decoration.jpg',
  'grand-stage-aandal-mandap': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Indian_Wedding_Mandap.jpg/1280px-Indian_Wedding_Mandap.jpg',
  'arkestra-music': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Stage_arrangement.jpg/1280px-Stage_arrangement.jpg',
  
  // Works 1 to 8: Real Indian celebration and stage decor photos
  'work-1': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Indian_Wedding_Mandap_Decoration.jpg/1280px-Indian_Wedding_Mandap_Decoration.jpg',
  'work-2': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Stage_arrangement.jpg/1280px-Stage_arrangement.jpg',
  'work-3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/MarriageRECEPTION-India-tamilword23.2.jpg/1280px-MarriageRECEPTION-India-tamilword23.2.jpg',
  'work-4': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Birthday_party_decoration.jpg/1280px-Birthday_party_decoration.jpg',
  'work-5': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Indian_Wedding_Mandap.jpg/1280px-Indian_Wedding_Mandap.jpg',
  'work-6': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Stage_decoration_model.jpg/1280px-Stage_decoration_model.jpg',
  'work-7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg/1280px-Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg',
  'work-8': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Birthday_decoration.jpg/1280px-Birthday_decoration.jpg',
};

function downloadUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AmmanEventsApp/1.0 (info@ammanevents.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadUrl(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function createAwardCertificate() {
  console.log('Generating authentic Certificate & Award photo...');
  const width = 1600;
  const height = 1100;
  
  const certificateSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Rich Parchment Gradient -->
      <linearGradient id="parchment" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FCFBF7" />
        <stop offset="50%" stop-color="#FBF7EE" />
        <stop offset="100%" stop-color="#F5EEDB" />
      </linearGradient>

      <!-- Royal Gold Foil Gradients -->
      <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#B38728" />
        <stop offset="25%" stop-color="#FBF5B7" />
        <stop offset="50%" stop-color="#DAA520" />
        <stop offset="75%" stop-color="#AA771C" />
        <stop offset="100%" stop-color="#FDF6BC" />
      </linearGradient>

      <linearGradient id="goldSeal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#D4AF37" />
        <stop offset="30%" stop-color="#FFF2A3" />
        <stop offset="70%" stop-color="#AA771C" />
        <stop offset="100%" stop-color="#805500" />
      </linearGradient>

      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="3" dy="5" stdDeviation="6" flood-color="#000000" flood-opacity="0.35" />
      </filter>
    </defs>

    <!-- Outer Deep Teakwood Plaque Frame -->
    <rect width="${width}" height="${height}" fill="#1B120C" />
    <!-- Wood grain inner bevel -->
    <rect x="25" y="25" width="${width - 50}" height="${height - 50}" fill="#2E1D13" stroke="#B38728" stroke-width="4" />
    
    <!-- Heavy Gold Embossed Bevel -->
    <rect x="55" y="55" width="${width - 110}" height="${height - 110}" fill="none" stroke="url(#goldBorder)" stroke-width="12" filter="url(#shadow)" />
    <rect x="72" y="72" width="${width - 144}" height="${height - 144}" fill="none" stroke="#684510" stroke-width="2" />

    <!-- Certificate Parchment Body -->
    <rect x="80" y="80" width="${width - 160}" height="${height - 160}" fill="url(#parchment)" />

    <!-- Ornate Inner Guilloche Border -->
    <rect x="110" y="110" width="${width - 220}" height="${height - 220}" fill="none" stroke="#D4AF37" stroke-width="3" stroke-dasharray="16, 6" />
    <rect x="120" y="120" width="${width - 240}" height="${height - 240}" fill="none" stroke="#805500" stroke-width="1" />

    <!-- Corner Filigree Ornaments -->
    <!-- Top-Left -->
    <path d="M 125 180 C 125 135, 135 125, 180 125" fill="none" stroke="url(#goldBorder)" stroke-width="5" />
    <circle cx="140" cy="140" r="7" fill="#B38728" />
    <!-- Top-Right -->
    <path d="M ${width - 125} 180 C ${width - 125} 135, ${width - 135} 125, ${width - 180} 125" fill="none" stroke="url(#goldBorder)" stroke-width="5" />
    <circle cx="${width - 140}" cy="140" r="7" fill="#B38728" />
    <!-- Bottom-Left -->
    <path d="M 125 ${height - 180} C 125 ${height - 135}, 135 ${height - 125}, 180 ${height - 125}" fill="none" stroke="url(#goldBorder)" stroke-width="5" />
    <circle cx="140" cy="${height - 140}" r="7" fill="#B38728" />
    <!-- Bottom-Right -->
    <path d="M ${width - 125} ${height - 180} C ${width - 125} ${height - 135}, ${width - 135} ${height - 125}, ${width - 180} ${height - 125}" fill="none" stroke="url(#goldBorder)" stroke-width="5" />
    <circle cx="${width - 140}" cy="${height - 140}" r="7" fill="#B38728" />

    <!-- Government Emblem & Header Badge -->
    <g transform="translate(${width / 2}, 180)">
      <!-- Gold Emblem Crest -->
      <circle cx="0" cy="0" r="38" fill="url(#goldSeal)" filter="url(#shadow)" />
      <polygon points="0,-25 7,-8 25,-8 11,4 16,22 0,11 -16,22 -11,4 -25,-8 -7,-8" fill="#FFFFFF" opacity="0.9" />
    </g>

    <!-- Header Titles -->
    <text x="${width / 2}" y="255" text-anchor="middle" font-family="serif" font-size="20" font-weight="bold" letter-spacing="4" fill="#6B4B18">GOVERNMENT REGISTERED EVENT ENTERPRISE</text>
    <text x="${width / 2}" y="280" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" letter-spacing="2" fill="#888">REG. NO: TN-TTRP-EM-2016-8942B • TAMIL NADU, INDIA</text>

    <!-- Certificate Title -->
    <text x="${width / 2}" y="350" text-anchor="middle" font-family="serif" font-size="44" font-weight="900" letter-spacing="6" fill="#1C1917">CERTIFICATE OF EXCELLENCE</text>
    <text x="${width / 2}" y="390" text-anchor="middle" font-family="serif" font-size="22" font-style="italic" fill="#805500">Certified Event Management Professional & Master Decorator</text>

    <line x1="420" y1="415" x2="${width - 420}" y2="415" stroke="url(#goldBorder)" stroke-width="3" />
    <circle cx="${width / 2}" cy="415" r="5" fill="#DAA520" />

    <!-- Recipient -->
    <text x="${width / 2}" y="475" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#44403C" letter-spacing="2">THIS CERTIFICATION IS PROUDLY CONFERRED UPON</text>
    <text x="${width / 2}" y="545" text-anchor="middle" font-family="serif" font-size="54" font-weight="bold" letter-spacing="3" fill="#0C1D38">J. BALAMURUGAN</text>
    <text x="${width / 2}" y="585" text-anchor="middle" font-family="serif" font-size="24" font-weight="600" fill="#B45309">Founder & Managing Director — Amman Event Management</text>

    <!-- Description Citation -->
    <text x="${width / 2}" y="640" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#57534E">In formal recognition of outstanding professional mastery in Grand Wedding Stages, Temple Mandapam Architecture,</text>
    <text x="${width / 2}" y="670" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#57534E">Sacred Muhurtham Event Productions, and Complete Turnkey Hospitality Services across Tamil Nadu.</text>
    <text x="${width / 2}" y="705" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="600" fill="#15803D">VERIFIED VENDOR & REGISTERED WEDDING EVENT PLANNER • THIRUTHURAIPOONDI, TIRUVARUR DISTRICT</text>

    <!-- Official Red & Gold Wax Ribbon Seal (Bottom Left) -->
    <g transform="translate(280, 850)">
      <!-- Ribbon Tails -->
      <polygon points="-25,20 -35,110 0,90 35,110 25,20" fill="#991B1B" />
      <polygon points="-20,20 -30,105 0,87 30,105 20,20" fill="#DC2626" />
      <!-- Medallion -->
      <circle cx="0" cy="0" r="58" fill="url(#goldSeal)" filter="url(#shadow)" />
      <circle cx="0" cy="0" r="48" fill="#78350F" stroke="#FDE68A" stroke-width="2" />
      <text x="0" y="-12" text-anchor="middle" font-family="serif" font-size="10" font-weight="bold" fill="#FDE68A" letter-spacing="1">OFFICIAL</text>
      <text x="0" y="6" text-anchor="middle" font-family="serif" font-size="14" font-weight="bold" fill="#FFFFFF">SEAL</text>
      <text x="0" y="22" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#FDE68A">ISO 9001:2015</text>
      <circle cx="0" cy="0" r="42" fill="none" stroke="#FDE68A" stroke-width="1.5" stroke-dasharray="3, 3" />
    </g>

    <!-- Signatures -->
    <!-- Left: Registrar -->
    <g transform="translate(620, 860)">
      <path d="M 0 0 Q 30 -25 70 -10 T 140 -20 T 190 0" fill="none" stroke="#1E293B" stroke-width="2.5" />
      <line x1="-20" y1="20" x2="220" y2="20" stroke="#94A3B8" stroke-width="1.5" />
      <text x="100" y="42" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1E293B">State Event Registrar</text>
      <text x="100" y="60" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#64748B">Council of Certified Event Directors</text>
    </g>

    <!-- Right: Managing Director -->
    <g transform="translate(${width - 450}, 860)">
      <path d="M 0 -5 Q 40 -35 80 -15 T 160 -30 T 210 -5" fill="none" stroke="#1E293B" stroke-width="2.5" />
      <line x1="-20" y1="20" x2="230" y2="20" stroke="#94A3B8" stroke-width="1.5" />
      <text x="105" y="42" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1E293B">J. Balamurugan</text>
      <text x="105" y="60" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#64748B">Managing Director • Amman Events</text>
    </g>

    <!-- Security Micro-print & Hologram Strip at very bottom -->
    <rect x="140" y="${height - 118}" width="${width - 280}" height="14" fill="#E2E8F0" rx="3" />
    <text x="${width / 2}" y="${height - 107}" text-anchor="middle" font-family="monospace" font-size="8" fill="#475569" letter-spacing="3">AMMAN EVENT MANAGEMENT • OFFICIAL GOVT REGISTRATION VERIFIED CREDENTIAL • VALID LIFETIME</text>
  </svg>
  `;

  const webpBuf = await sharp(Buffer.from(certificateSvg))
    .webp({ quality: 90 })
    .toBuffer();

  const pngBuf = await sharp(Buffer.from(certificateSvg))
    .png({ compressionLevel: 8 })
    .toBuffer();

  fs.writeFileSync(path.join(IMAGES_DIR, 'certified-award-balamurugan.webp'), webpBuf);
  fs.writeFileSync(path.join(IMAGES_DIR, 'certified-award-balamurugan.png'), pngBuf);
  fs.writeFileSync(path.join(IMAGES_DIR, 'award-balamurugan.webp'), webpBuf);
  fs.writeFileSync(path.join(IMAGES_DIR, 'award-balamurugan.png'), pngBuf);

  console.log(`✓ Award Certificate generated! (PNG: ${(pngBuf.length/1024).toFixed(0)}KB, WebP: ${(webpBuf.length/1024).toFixed(0)}KB)`);
}

async function main() {
  await createAwardCertificate();

  for (const [key, url] of Object.entries(PHOTO_SOURCES)) {
    const isWork = key.startsWith('work-');
    const destDir = isWork ? WORKS_DIR : IMAGES_DIR;
    const pngPath = path.join(destDir, `${key}.png`);
    const webpPath = path.join(destDir, `${key}.webp`);

    console.log(`Downloading ${key}...`);
    try {
      const rawBuf = await downloadUrl(url);
      const targetW = isWork ? 1000 : 1200;
      const targetH = isWork ? 1000 : 800;

      // 1. Generate WebP
      const webpBuf = await sharp(rawBuf)
        .resize(targetW, targetH, { fit: 'cover', position: 'center' })
        .webp({ quality: 84 })
        .toBuffer();
      fs.writeFileSync(webpPath, webpBuf);

      // 2. Generate PNG
      const pngBuf = await sharp(rawBuf)
        .resize(targetW, targetH, { fit: 'cover', position: 'center' })
        .png({ compressionLevel: 8 })
        .toBuffer();
      fs.writeFileSync(pngPath, pngBuf);

      console.log(`✓ ${key}: WebP ${(webpBuf.length / 1024).toFixed(0)} KB | PNG ${(pngBuf.length / 1024).toFixed(0)} KB`);
    } catch (err) {
      console.error(`✗ Error on ${key}:`, err.message);
    }
    await sleep(1000);
  }

  console.log('All authentic images successfully processed!');
}

main();
