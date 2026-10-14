const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 1. Photo 1: main dec amman.jpeg (Teal Lotus Halo Stage with JP Crest)
const svg1 = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Teal Curtain Gradient -->
    <linearGradient id="tealCurtain" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F5B63" />
      <stop offset="50%" stop-color="#0A3E44" />
      <stop offset="100%" stop-color="#052226" />
    </linearGradient>

    <!-- Glowing Golden Outline -->
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Floor Pattern -->
    <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0D474E" />
      <stop offset="100%" stop-color="#042023" />
    </linearGradient>
  </defs>

  <!-- 1. Background Drapery -->
  <rect width="100%" height="100%" fill="url(#tealCurtain)" />
  <!-- Pleats -->
  <g opacity="0.35" stroke="#167D88" stroke-width="2">
    <line x1="80" y1="0" x2="80" y2="550" />
    <line x1="160" y1="0" x2="160" y2="550" />
    <line x1="240" y1="0" x2="240" y2="550" />
    <line x1="320" y1="0" x2="320" y2="550" />
    <line x1="880" y1="0" x2="880" y2="550" />
    <line x1="960" y1="0" x2="960" y2="550" />
    <line x1="1040" y1="0" x2="1040" y2="550" />
    <line x1="1120" y1="0" x2="1120" y2="550" />
  </g>

  <!-- 2. Stage Floor with Geometric Lines -->
  <polygon points="0,520 1200,520 1200,675 0,675" fill="url(#floorGrad)" />
  <g stroke="#2DD4BF" stroke-width="1.5" opacity="0.4">
    <line x1="200" y1="520" x2="0" y2="675" />
    <line x1="400" y1="520" x2="250" y2="675" />
    <line x1="600" y1="520" x2="600" y2="675" />
    <line x1="800" y1="520" x2="950" y2="675" />
    <line x1="1000" y1="520" x2="1200" y2="675" />
  </g>

  <!-- 3. Top Hanging Floral Ceiling & Wisteria Canopy -->
  <rect x="0" y="0" width="1200" height="70" fill="#063136" />
  <!-- Dense Top Flower Garland -->
  <g id="topFlowers">
    <rect x="0" y="0" width="1200" height="40" fill="#BE123C" />
    <path d="M0,20 Q 300,35 600,20 T 1200,20" stroke="#FDE047" stroke-width="18" fill="none" opacity="0.9" />
    <path d="M0,20 Q 300,35 600,20 T 1200,20" stroke="#FDA4AF" stroke-width="10" stroke-dasharray="14 10" fill="none" />
    <path d="M0,20 Q 300,35 600,20 T 1200,20" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="8 8" fill="none" />
  </g>
  <!-- Hanging Wisteria Tendrils & Foliage -->
  <g stroke="#FFFFFF" stroke-width="2.5" opacity="0.85">
    <line x1="150" y1="40" x2="150" y2="180" stroke-dasharray="6 4" />
    <line x1="200" y1="40" x2="200" y2="160" stroke-dasharray="6 4" />
    <line x1="250" y1="40" x2="250" y2="190" stroke-dasharray="6 4" />
    <line x1="320" y1="40" x2="320" y2="150" stroke-dasharray="6 4" />
    <line x1="400" y1="40" x2="400" y2="190" stroke-dasharray="6 4" />
    <line x1="480" y1="40" x2="480" y2="170" stroke-dasharray="6 4" />
    <line x1="550" y1="40" x2="550" y2="180" stroke-dasharray="6 4" />
    <line x1="650" y1="40" x2="650" y2="180" stroke-dasharray="6 4" />
    <line x1="720" y1="40" x2="720" y2="170" stroke-dasharray="6 4" />
    <line x1="800" y1="40" x2="800" y2="190" stroke-dasharray="6 4" />
    <line x1="880" y1="40" x2="880" y2="150" stroke-dasharray="6 4" />
    <line x1="950" y1="40" x2="950" y2="190" stroke-dasharray="6 4" />
    <line x1="1000" y1="40" x2="1000" y2="160" stroke-dasharray="6 4" />
    <line x1="1050" y1="40" x2="1050" y2="180" stroke-dasharray="6 4" />
  </g>
  <!-- Warm Hanging Drop Lamps -->
  <g fill="#FEF08A" stroke="#EAB308" stroke-width="1.5">
    <ellipse cx="200" cy="170" rx="14" ry="20" />
    <ellipse cx="320" cy="160" rx="14" ry="20" />
    <ellipse cx="430" cy="180" rx="14" ry="20" />
    <ellipse cx="550" cy="170" rx="14" ry="20" />
    <ellipse cx="650" cy="170" rx="14" ry="20" />
    <ellipse cx="770" cy="180" rx="14" ry="20" />
    <ellipse cx="880" cy="160" rx="14" ry="20" />
    <ellipse cx="1000" cy="170" rx="14" ry="20" />
  </g>

  <!-- 4. Grand Backlit Glowing Lotus / Ginkgo Fan Petals -->
  <!-- Left Outer Petal -->
  <path d="M260,500 C 240,320 380,310 460,500 Z" fill="#F8FAFC" fill-opacity="0.88" stroke="#FDE047" stroke-width="7" filter="url(#goldGlow)" />
  <path d="M300,500 Q 350,380 430,500" stroke="#E2E8F0" stroke-width="2" fill="none" />

  <!-- Right Outer Petal -->
  <path d="M940,500 C 960,320 820,310 740,500 Z" fill="#F8FAFC" fill-opacity="0.88" stroke="#FDE047" stroke-width="7" filter="url(#goldGlow)" />
  <path d="M900,500 Q 850,380 770,500" stroke="#E2E8F0" stroke-width="2" fill="none" />

  <!-- Left Inner Petal -->
  <path d="M380,500 C 370,220 560,200 580,500 Z" fill="#FFFFFF" fill-opacity="0.94" stroke="#FDE047" stroke-width="8" filter="url(#goldGlow)" />
  <path d="M440,500 Q 470,280 540,500" stroke="#CBD5E1" stroke-width="2.5" fill="none" />

  <!-- Right Inner Petal -->
  <path d="M820,500 C 830,220 640,200 620,500 Z" fill="#FFFFFF" fill-opacity="0.94" stroke="#FDE047" stroke-width="8" filter="url(#goldGlow)" />
  <path d="M760,500 Q 730,280 660,500" stroke="#CBD5E1" stroke-width="2.5" fill="none" />

  <!-- Central Crest Halo & "JP" Monogram -->
  <circle cx="560" cy="260" r="46" fill="#0A3E44" stroke="#FDE047" stroke-width="5" filter="url(#goldGlow)" />
  <circle cx="560" cy="260" r="38" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 3" />
  <text x="560" y="274" text-anchor="middle" font-family="serif" font-size="34" font-weight="bold" fill="#FFFFFF">JP</text>

  <!-- 5. Golden Candelabras & Fairy Light Columns (Left & Right) -->
  <g stroke="#EAB308" stroke-width="3">
    <!-- Left Candelabra -->
    <line x1="160" y1="360" x2="160" y2="520" />
    <line x1="180" y1="330" x2="180" y2="520" />
    <line x1="200" y1="380" x2="200" y2="520" />
    <line x1="220" y1="350" x2="220" y2="520" />
    <!-- Glowing Bulbs on Left -->
    <circle cx="160" cy="360" r="7" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />
    <circle cx="180" cy="330" r="8" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />
    <circle cx="200" cy="380" r="7" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />
    <circle cx="220" cy="350" r="8" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />

    <!-- Right Candelabra -->
    <line x1="980" y1="350" x2="980" y2="520" />
    <line x1="1000" y1="380" x2="1000" y2="520" />
    <line x1="1020" y1="330" x2="1020" y2="520" />
    <line x1="1040" y1="360" x2="1040" y2="520" />
    <!-- Glowing Bulbs on Right -->
    <circle cx="980" cy="350" r="8" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />
    <circle cx="1000" cy="380" r="7" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />
    <circle cx="1020" cy="330" r="8" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />
    <circle cx="1040" cy="360" r="7" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />
  </g>

  <!-- Globe Light Stems beside Couch -->
  <g fill="#FEF08A" stroke="#EAB308" stroke-width="2">
    <circle cx="410" cy="420" r="12" />
    <circle cx="395" cy="450" r="10" />
    <circle cx="425" cy="460" r="11" />
    <circle cx="790" cy="420" r="12" />
    <circle cx="805" cy="450" r="10" />
    <circle cx="775" cy="460" r="11" />
  </g>

  <!-- 6. White Urn Flower Vases -->
  <g>
    <!-- Left Urn -->
    <ellipse cx="270" cy="510" rx="22" ry="32" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
    <circle cx="270" cy="470" r="24" fill="#BE123C" />
    <circle cx="260" cy="465" r="12" fill="#F43F5E" />
    <circle cx="280" cy="470" r="14" fill="#FDE047" />

    <!-- Right Urn -->
    <ellipse cx="900" cy="510" rx="22" ry="32" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
    <circle cx="900" cy="470" r="24" fill="#BE123C" />
    <circle cx="890" cy="465" r="12" fill="#F43F5E" />
    <circle cx="910" cy="470" r="14" fill="#FDE047" />
  </g>

  <!-- 7. Camel / Beige Curved Shell-Back Couch -->
  <g id="couchGroup">
    <!-- Backrest with fluted ridges -->
    <path d="M460,470 C 450,380 750,380 740,470 Z" fill="#C29B7F" stroke="#8D6246" stroke-width="3" />
    <!-- Fluting Lines -->
    <line x1="500" y1="410" x2="510" y2="470" stroke="#A37B60" stroke-width="2.5" />
    <line x1="540" y1="395" x2="545" y2="470" stroke="#A37B60" stroke-width="2.5" />
    <line x1="600" y1="390" x2="600" y2="470" stroke="#A37B60" stroke-width="2.5" />
    <line x1="660" y1="395" x2="655" y2="470" stroke="#A37B60" stroke-width="2.5" />
    <line x1="700" y1="410" x2="690" y2="470" stroke="#A37B60" stroke-width="2.5" />
    <!-- Seat Cushion -->
    <rect x="450" y="470" width="300" height="70" rx="16" fill="#D4B096" stroke="#8D6246" stroke-width="3" />
    <!-- Legs -->
    <line x1="475" y1="540" x2="470" y2="560" stroke="#374151" stroke-width="5" />
    <line x1="725" y1="540" x2="730" y2="560" stroke="#374151" stroke-width="5" />
  </g>

  <!-- 8. Stage Front Skirting Floral Border -->
  <g id="stageSkirting">
    <rect x="0" y="590" width="1200" height="85" fill="#063136" />
    <path d="M0,600 Q 300,580 600,600 T 1200,600" stroke="#BE123C" stroke-width="28" fill="none" />
    <path d="M0,600 Q 300,580 600,600 T 1200,600" stroke="#FDE047" stroke-width="14" stroke-dasharray="20 15" fill="none" />
    <path d="M0,600 Q 300,580 600,600 T 1200,600" stroke="#FDA4AF" stroke-width="8" stroke-dasharray="10 10" fill="none" />
    <path d="M0,600 Q 300,580 600,600 T 1200,600" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="6 6" fill="none" />
  </g>

  <!-- Gold Frame Border -->
  <rect width="100%" height="100%" fill="none" stroke="#DFB76C" stroke-width="6" opacity="0.6" />
</svg>
`;

// 2. Photo 2: aandal amman square.png (Sri Andal & Ranganathar Temple Mandapam with Golden Pillars & Floral Wall)
const svg2 = `
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gold Pillar Gradient -->
    <linearGradient id="goldCarved" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#713F12" />
      <stop offset="25%" stop-color="#B45309" />
      <stop offset="50%" stop-color="#FDE047" />
      <stop offset="75%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#58290B" />
    </linearGradient>

    <!-- Red & Gold Carpet -->
    <linearGradient id="royalCarpet" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#991B1B" />
      <stop offset="50%" stop-color="#7F1D1D" />
      <stop offset="100%" stop-color="#5B1212" />
    </linearGradient>

    <!-- Dense Floral Wall Pattern -->
    <pattern id="flowerWallPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="#F43F5E" />
      <circle cx="10" cy="10" r="8" fill="#FDA4AF" />
      <circle cx="30" cy="10" r="7" fill="#F43F5E" />
      <circle cx="10" cy="30" r="7" fill="#FECDD3" />
      <circle cx="30" cy="30" r="9" fill="#E11D48" />
      <circle cx="20" cy="20" r="6" fill="#FFFFFF" />
    </pattern>
  </defs>

  <!-- 1. Background Ceiling & Walls -->
  <rect width="100%" height="100%" fill="#2A1608" />

  <!-- 2. Dense Pink & Red Rose Wall Backdrop -->
  <rect x="180" y="80" width="840" height="420" fill="url(#flowerWallPattern)" />
  <rect x="180" y="80" width="840" height="420" fill="#881337" opacity="0.2" />

  <!-- 3. Red & Gold Royal Stage Carpet -->
  <polygon points="0,480 1200,480 1200,675 0,675" fill="url(#royalCarpet)" />
  <!-- Traditional Carpet Geometry -->
  <g stroke="#FDE047" stroke-width="2" opacity="0.6">
    <line x1="200" y1="480" x2="50" y2="675" />
    <line x1="400" y1="480" x2="300" y2="675" />
    <line x1="600" y1="480" x2="600" y2="675" />
    <line x1="800" y1="480" x2="900" y2="675" />
    <line x1="1000" y1="480" x2="1150" y2="675" />
  </g>

  <!-- 4. Top Mandapam Golden Filigree Canopy Frieze & Garlands -->
  <rect x="0" y="0" width="1200" height="60" fill="url(#goldCarved)" />
  <!-- Scalloped Gold Drop Frieze -->
  <path d="M0,60 Q 50,85 100,60 T 1200,60" fill="url(#goldCarved)" stroke="#FEF08A" stroke-width="2" />
  <!-- Hanging Top Rose & Jasmine Garlands -->
  <rect x="0" y="20" width="1200" height="25" fill="#E11D48" />
  <path d="M0,35 Q 200,50 400,35 T 1200,35" stroke="#FFFFFF" stroke-width="12" fill="none" opacity="0.9" />
  <!-- Hanging Jasmine Strings -->
  <g stroke="#FFFFFF" stroke-width="3" stroke-dasharray="6 4" opacity="0.95">
    <line x1="100" y1="60" x2="100" y2="280" />
    <line x1="115" y1="60" x2="115" y2="240" stroke="#DC2626" />
    <line x1="240" y1="60" x2="240" y2="260" />
    <line x1="380" y1="60" x2="380" y2="240" />
    <line x1="500" y1="60" x2="500" y2="240" stroke="#DC2626" />
    <line x1="700" y1="60" x2="700" y2="240" stroke="#DC2626" />
    <line x1="820" y1="60" x2="820" y2="240" />
    <line x1="960" y1="60" x2="960" y2="260" />
    <line x1="1085" y1="60" x2="1085" y2="240" stroke="#DC2626" />
    <line x1="1100" y1="60" x2="1100" y2="280" />
  </g>

  <!-- 5. Dual Divine Sanctum Shrines (Goddess Andal & Lord Ranganathar) -->
  <!-- Left Sanctum Arch (Goddess Andal / Amman) -->
  <g id="sanctumLeft" transform="translate(390, 290)">
    <!-- Ornate Golden Arch Frame -->
    <path d="M-85,120 L -85,-40 C -85,-110 85,-110 85,-40 L 85,120 Z" fill="#1E3A8A" stroke="url(#goldCarved)" stroke-width="18" />
    <path d="M-70,120 L -70,-35 C -70,-90 70,-90 70,-35 L 70,120 Z" fill="#0F172A" stroke="#FEF08A" stroke-width="3" />
    <!-- Goddess Andal Sacred Murti Figure in Red Silk & Crown -->
    <polygon points="0,-75 -24,-25 24,-25" fill="#FEF08A" stroke="#B45309" stroke-width="2" />
    <circle cx="0" cy="-10" r="22" fill="#B45309" />
    <ellipse cx="0" cy="50" rx="42" ry="60" fill="#DC2626" stroke="#FEF08A" stroke-width="4" />
    <!-- Sacred Flower Malas around Deity -->
    <ellipse cx="0" cy="40" rx="36" ry="46" fill="none" stroke="#FDE047" stroke-width="8" stroke-dasharray="10 6" />
    <ellipse cx="0" cy="40" rx="30" ry="40" fill="none" stroke="#FFFFFF" stroke-width="5" />
  </g>

  <!-- Right Sanctum Arch (Lord Ranganathar / Perumal) -->
  <g id="sanctumRight" transform="translate(690, 290)">
    <!-- Ornate Golden Arch Frame -->
    <path d="M-85,120 L -85,-40 C -85,-110 85,-110 85,-40 L 85,120 Z" fill="#1E3A8A" stroke="url(#goldCarved)" stroke-width="18" />
    <path d="M-70,120 L -70,-35 C -70,-90 70,-90 70,-35 L 70,120 Z" fill="#0F172A" stroke="#FEF08A" stroke-width="3" />
    <!-- Lord Deity Figure in Silk & Crown -->
    <polygon points="0,-75 -24,-25 24,-25" fill="#FEF08A" stroke="#B45309" stroke-width="2" />
    <circle cx="0" cy="-10" r="22" fill="#3B82F6" />
    <ellipse cx="0" cy="50" rx="42" ry="60" fill="#D97706" stroke="#FEF08A" stroke-width="4" />
    <!-- Sacred Flower Malas around Deity -->
    <ellipse cx="0" cy="40" rx="36" ry="46" fill="none" stroke="#FDE047" stroke-width="8" stroke-dasharray="10 6" />
    <ellipse cx="0" cy="40" rx="30" ry="40" fill="none" stroke="#FFFFFF" stroke-width="5" />
  </g>

  <!-- 6. Massive Dravidian Golden Carved Temple Pillars (Left & Right) -->
  <!-- Left Pillar Outer -->
  <g id="pillarLeft">
    <rect x="40" y="40" width="110" height="460" fill="url(#goldCarved)" rx="6" />
    <!-- Capital and Base Blocks -->
    <rect x="25" y="30" width="140" height="25" fill="url(#goldCarved)" />
    <rect x="25" y="480" width="140" height="30" fill="url(#goldCarved)" />
    <!-- Carved Fluting & Relief Lines -->
    <line x1="65" y1="60" x2="65" y2="480" stroke="#FEF08A" stroke-width="4" />
    <line x1="95" y1="60" x2="95" y2="480" stroke="#FEF08A" stroke-width="5" />
    <line x1="125" y1="60" x2="125" y2="480" stroke="#713F12" stroke-width="4" />
    <!-- Hanging Garlands on Pillar -->
    <path d="M40,150 Q 95,200 150,150" stroke="#BE123C" stroke-width="12" fill="none" />
    <path d="M40,280 Q 95,330 150,280" stroke="#FFFFFF" stroke-width="12" fill="none" />
  </g>

  <!-- Right Pillar Outer -->
  <g id="pillarRight">
    <rect x="1050" y="40" width="110" height="460" fill="url(#goldCarved)" rx="6" />
    <rect x="1035" y="30" width="140" height="25" fill="url(#goldCarved)" />
    <rect x="1035" y="480" width="140" height="30" fill="url(#goldCarved)" />
    <!-- Fluting Lines -->
    <line x1="1075" y1="60" x2="1075" y2="480" stroke="#FEF08A" stroke-width="4" />
    <line x1="1105" y1="60" x2="1105" y2="480" stroke="#FEF08A" stroke-width="5" />
    <line x1="1135" y1="60" x2="1135" y2="480" stroke="#713F12" stroke-width="4" />
    <!-- Garlands -->
    <path d="M1050,150 Q 1105,200 1160,150" stroke="#BE123C" stroke-width="12" fill="none" />
    <path d="M1050,280 Q 1105,330 1160,280" stroke="#FFFFFF" stroke-width="12" fill="none" />
  </g>

  <!-- 7. Royal Silver & White Carved Chaise Lounge Throne -->
  <g id="throneSilver" transform="translate(540, 480)">
    <!-- Backrest with graceful arch -->
    <path d="M-110,-70 C -110,-130 10,-110 30,-50 L 110,-20 L 110,20 L -110,20 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="5" />
    <!-- Silver Leaf Carvings on Crest -->
    <circle cx="-50" cy="-105" r="14" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
    <circle cx="20" cy="-60" r="10" fill="#E2E8F0" />
    <!-- Deep Button Tufting on White Velvet -->
    <g fill="#94A3B8">
      <circle cx="-60" cy="-60" r="4" />
      <circle cx="-20" cy="-55" r="4" />
      <circle cx="-40" cy="-30" r="4" />
      <circle cx="0" cy="-25" r="4" />
      <circle cx="40" cy="-20" r="4" />
      <circle cx="80" cy="-15" r="4" />
    </g>
    <!-- Throne Seat Cushion -->
    <rect x="-120" y="0" width="240" height="45" rx="12" fill="#FFFFFF" stroke="#94A3B8" stroke-width="4" />
    <!-- Silver Cabriole Legs -->
    <path d="M-105,45 Q -120,75 -100,85" stroke="#64748B" stroke-width="8" fill="none" stroke-linecap="round" />
    <path d="M105,45 Q 120,75 100,85" stroke="#64748B" stroke-width="8" fill="none" stroke-linecap="round" />
  </g>

  <!-- 8. Stage Front Skirting Floral Border -->
  <g id="frontSkirtingFlowers">
    <rect x="0" y="580" width="1200" height="95" fill="#78350F" />
    <path d="M0,590 Q 300,570 600,590 T 1200,590" stroke="#BE123C" stroke-width="32" fill="none" />
    <path d="M0,590 Q 300,570 600,590 T 1200,590" stroke="#FEF08A" stroke-width="16" stroke-dasharray="25 15" fill="none" />
    <path d="M0,590 Q 300,570 600,590 T 1200,590" stroke="#FDA4AF" stroke-width="10" stroke-dasharray="14 10" fill="none" />
    <path d="M0,590 Q 300,570 600,590 T 1200,590" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="8 8" fill="none" />
  </g>

  <!-- Gold Frame Border -->
  <rect width="100%" height="100%" fill="none" stroke="#DFB76C" stroke-width="6" opacity="0.6" />
</svg>
`;

async function generate() {
  console.log('Generating Grand Stage Decor photos in WebP and PNG...');

  // 1. Teal Lotus Halo Stage
  const webp1 = await sharp(Buffer.from(svg1))
    .resize(1200, 675)
    .webp({ quality: 90, effort: 5 })
    .toBuffer();
  fs.writeFileSync(path.join(IMAGES_DIR, 'grand-stage-teal-halo.webp'), webp1);

  const png1 = await sharp(Buffer.from(svg1))
    .resize(1200, 675)
    .png({ compressionLevel: 8 })
    .toBuffer();
  fs.writeFileSync(path.join(IMAGES_DIR, 'grand-stage-teal-halo.png'), png1);
  console.log(`✓ grand-stage-teal-halo generated (${(webp1.length / 1024).toFixed(0)} KB WebP, ${(png1.length / 1024).toFixed(0)} KB PNG)`);

  // 2. Andal Temple Mandapam Stage
  const webp2 = await sharp(Buffer.from(svg2))
    .resize(1200, 675)
    .webp({ quality: 90, effort: 5 })
    .toBuffer();
  fs.writeFileSync(path.join(IMAGES_DIR, 'grand-stage-aandal-mandap.webp'), webp2);

  const png2 = await sharp(Buffer.from(svg2))
    .resize(1200, 675)
    .png({ compressionLevel: 8 })
    .toBuffer();
  fs.writeFileSync(path.join(IMAGES_DIR, 'grand-stage-aandal-mandap.png'), png2);
  console.log(`✓ grand-stage-aandal-mandap generated (${(webp2.length / 1024).toFixed(0)} KB WebP, ${(png2.length / 1024).toFixed(0)} KB PNG)`);
}

generate().catch(console.error);
