const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const WIDTH = 1200;
const HEIGHT = 675; // 16:9 cinematic aspect matching Wh.jpeg

// Build high-detail SVG replicating Wh.jpeg
const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Evening Sky -->
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3A506B" />
      <stop offset="45%" stop-color="#6B7082" />
      <stop offset="80%" stop-color="#9C8B82" />
      <stop offset="100%" stop-color="#BF9D7A" />
    </linearGradient>

    <!-- Stage Floor Gradient -->
    <linearGradient id="stageFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4E5D6C" />
      <stop offset="25%" stop-color="#687889" />
      <stop offset="65%" stop-color="#8FA0B2" />
      <stop offset="100%" stop-color="#B2C2D4" />
    </linearGradient>

    <!-- Golden Pillar Gradient -->
    <linearGradient id="goldPillar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5C4018" />
      <stop offset="25%" stop-color="#B8860B" />
      <stop offset="50%" stop-color="#F3E5AB" />
      <stop offset="75%" stop-color="#DAA520" />
      <stop offset="100%" stop-color="#4A3412" />
    </linearGradient>

    <!-- Banner Gradient -->
    <linearGradient id="bannerBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F2042" />
      <stop offset="50%" stop-color="#1A365D" />
      <stop offset="100%" stop-color="#0A192F" />
    </linearGradient>

    <!-- Brass Lamp Gradient -->
    <linearGradient id="brassLamp" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7B591A" />
      <stop offset="35%" stop-color="#DFB76C" />
      <stop offset="65%" stop-color="#FFF2B2" />
      <stop offset="100%" stop-color="#8C6420" />
    </linearGradient>

    <!-- Flame Glow Filter -->
    <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF" />
      <stop offset="30%" stop-color="#FFAE19" />
      <stop offset="70%" stop-color="#FF4500" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#FF4500" stop-opacity="0" />
    </radialGradient>

    <!-- Spotlight Beam -->
    <linearGradient id="spotlightBeam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF8DC" stop-opacity="0.65" />
      <stop offset="40%" stop-color="#FFEAA7" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#FFEAA7" stop-opacity="0" />
    </linearGradient>

    <!-- Mat Pattern -->
    <linearGradient id="reedMat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9C8255" />
      <stop offset="50%" stop-color="#B8A072" />
      <stop offset="100%" stop-color="#8C7043" />
    </linearGradient>
  </defs>

  <!-- 1. BACKDROP & SKY -->
  <rect width="100%" height="100%" fill="url(#skyGrad)" />

  <!-- Dusk Horizon / Silhouette of Trees -->
  <path d="M0 260 Q 300 240 600 255 T 1200 250 L 1200 380 L 0 380 Z" fill="#202A38" opacity="0.45" />

  <!-- 2. STAGE PLATFORM & FLOOR -->
  <polygon points="0,380 1200,380 1200,675 0,675" fill="url(#stageFloor)" />
  <!-- Stage Front Golden Edge -->
  <rect x="0" y="660" width="1200" height="15" fill="#DAA520" />
  <rect x="0" y="663" width="1200" height="4" fill="#FFF2B2" />

  <!-- 3. MANDAPAM GOLDEN PILLARS (LEFT & RIGHT) -->
  <!-- Left Outer Pillar -->
  <g id="leftPillarGroup">
    <rect x="60" y="90" width="110" height="340" fill="url(#goldPillar)" rx="4" />
    <!-- Pillar capital & base details -->
    <rect x="40" y="70" width="150" height="25" fill="url(#goldPillar)" rx="2" />
    <rect x="50" y="420" width="130" height="30" fill="url(#goldPillar)" rx="2" />
    <!-- Carved Fluting & Relief Patterns -->
    <line x1="85" y1="95" x2="85" y2="420" stroke="#FFE59E" stroke-width="2" opacity="0.6" />
    <line x1="115" y1="95" x2="115" y2="420" stroke="#FFE59E" stroke-width="3" opacity="0.8" />
    <line x1="145" y1="95" x2="145" y2="420" stroke="#5C4018" stroke-width="2" opacity="0.7" />
  </g>

  <!-- Left Inner Pillar -->
  <rect x="220" y="120" width="70" height="310" fill="url(#goldPillar)" rx="3" />
  <rect x="210" y="105" width="90" height="18" fill="url(#goldPillar)" />

  <!-- Right Inner Pillar -->
  <rect x="910" y="120" width="70" height="310" fill="url(#goldPillar)" rx="3" />
  <rect x="900" y="105" width="90" height="18" fill="url(#goldPillar)" />

  <!-- Right Outer Pillar -->
  <g id="rightPillarGroup">
    <rect x="1030" y="90" width="110" height="340" fill="url(#goldPillar)" rx="4" />
    <rect x="1010" y="70" width="150" height="25" fill="url(#goldPillar)" rx="2" />
    <rect x="1020" y="420" width="130" height="30" fill="url(#goldPillar)" rx="2" />
    <line x1="1055" y1="95" x2="1055" y2="420" stroke="#FFE59E" stroke-width="2" opacity="0.6" />
    <line x1="1085" y1="95" x2="1085" y2="420" stroke="#FFE59E" stroke-width="3" opacity="0.8" />
    <line x1="1115" y1="95" x2="1115" y2="420" stroke="#5C4018" stroke-width="2" opacity="0.7" />
  </g>

  <!-- 4. FLORAL GARLANDS & DRAPES ACROSS STAGE -->
  <!-- Top Floral Arch Garland Swags -->
  <path d="M60 90 Q 200 170 340 100 Q 480 180 600 100 Q 720 180 860 100 Q 1000 170 1140 90" 
        fill="none" stroke="#F59E0B" stroke-width="18" stroke-linecap="round" />
  <path d="M60 90 Q 200 170 340 100 Q 480 180 600 100 Q 720 180 860 100 Q 1000 170 1140 90" 
        fill="none" stroke="#DC2626" stroke-width="8" stroke-dasharray="14 10" />
  <path d="M60 90 Q 200 170 340 100 Q 480 180 600 100 Q 720 180 860 100 Q 1000 170 1140 90" 
        fill="none" stroke="#FEF08A" stroke-width="4" stroke-dasharray="8 8" />

  <!-- Lower Floral Swags & Jasmine Torans -->
  <path d="M220 180 Q 360 250 480 185" fill="none" stroke="#F97316" stroke-width="12" />
  <path d="M220 180 Q 360 250 480 185" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="8 6" />
  <path d="M720 185 Q 840 250 980 180" fill="none" stroke="#F97316" stroke-width="12" />
  <path d="M720 185 Q 840 250 980 180" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="8 6" />

  <!-- Hanging Floral Tassels -->
  <line x1="220" y1="180" x2="220" y2="280" stroke="#FBBF24" stroke-width="6" stroke-dasharray="10 4" />
  <line x1="980" y1="180" x2="980" y2="280" stroke="#FBBF24" stroke-width="6" stroke-dasharray="10 4" />

  <!-- 5. WARM STAGE SPOTLIGHTS (ROUND FIXTURES AT ROOF) -->
  <g id="spotlights">
    <!-- Spotlights row -->
    <circle cx="170" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="260" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="350" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="850" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="940" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="1030" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />

    <!-- Beams of Light Shining onto the Musicians -->
    <polygon points="170,45 60,600 380,600" fill="url(#spotlightBeam)" />
    <polygon points="1030,45 820,600 1140,600" fill="url(#spotlightBeam)" />
    <polygon points="600,0 350,650 850,650" fill="url(#spotlightBeam)" opacity="0.6" />
  </g>

  <!-- 6. THE CENTRAL STAGE BANNER ("மேளம் & நாதஸ்வரம் / MELAM & NADASWARAM") -->
  <g id="stageBanner" transform="translate(600, 75)">
    <!-- Scalloped Top Decorative Border -->
    <path d="M-280,-45 Q -210,-60 -140,-45 Q -70,-60 0,-45 Q 70,-60 140,-45 Q 210,-60 280,-45 L 280,-30 L -280,-30 Z" 
          fill="#DFB76C" />
    <path d="M-280,-30 L 280,-30 L 280,-20 L -280,-20 Z" fill="#991B1B" />

    <!-- Main Curved Banner Body -->
    <rect x="-270" y="-20" width="540" height="95" rx="8" fill="url(#bannerBg)" stroke="#DFB76C" stroke-width="4" />

    <!-- Ornate Inner Frame Line -->
    <rect x="-264" y="-14" width="528" height="83" rx="5" fill="none" stroke="#F5D77F" stroke-width="1.5" stroke-dasharray="10 5" opacity="0.8" />

    <!-- Tamil Typography (Exact Text from Wh.jpeg) -->
    <text x="0" y="24" text-anchor="middle" font-family="'Mukta Malar', 'Noto Sans Tamil', serif, sans-serif" 
          font-size="34" font-weight="900" fill="#FFFFFF" letter-spacing="1">
      மேளம் &amp; நாதஸ்வரம்
    </text>

    <!-- English Typography (Exact Text from Wh.jpeg) -->
    <text x="0" y="56" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif, sans-serif" 
          font-size="22" font-weight="800" fill="#FCE588" letter-spacing="3">
      MELAM &amp; NADASWARAM
    </text>

    <!-- Bottom Decorative Hanging Beads/Fringes -->
    <path d="M-260,75 C -250,85 -230,85 -220,75 C -210,85 -190,85 -180,75 C -170,85 -150,85 -140,75 C -130,85 -110,85 -100,75 C -90,85 -70,85 -60,75 C -50,85 -30,85 -20,75 C -10,85 10,85 20,75 C 30,85 50,85 60,75 C 70,85 90,85 100,75 C 110,85 130,85 140,75 C 150,85 170,85 180,75 C 190,85 210,85 220,75 C 230,85 250,85 260,75" 
          fill="none" stroke="#DFB76C" stroke-width="2.5" />
  </g>

  <!-- 7. WOVEN STRAW REED MAT (PAAI) -->
  <polygon points="120,640 1080,640 1020,440 180,440" fill="url(#reedMat)" stroke="#6B532F" stroke-width="2" />
  <!-- Red & Blue Border Bands on Mat -->
  <line x1="140" y1="460" x2="100" y2="620" stroke="#991B1B" stroke-width="8" />
  <line x1="160" y1="460" x2="120" y2="620" stroke="#1E40AF" stroke-width="6" />
  <line x1="1040" y1="460" x2="1080" y2="620" stroke="#991B1B" stroke-width="8" />
  <line x1="1020" y1="460" x2="1060" y2="620" stroke="#1E40AF" stroke-width="6" />
  <!-- Straw textures -->
  <line x1="190" y1="480" x2="1010" y2="480" stroke="#6B532F" stroke-width="0.8" opacity="0.4" />
  <line x1="170" y1="520" x2="1030" y2="520" stroke="#6B532F" stroke-width="0.8" opacity="0.4" />
  <line x1="150" y1="560" x2="1050" y2="560" stroke="#6B532F" stroke-width="0.8" opacity="0.4" />
  <line x1="130" y1="600" x2="1070" y2="600" stroke="#6B532F" stroke-width="0.8" opacity="0.4" />

  <!-- 8. BACKGROUND ACCOMPANYING MUSICIANS -->
  <!-- Back Musician Left (Olive Green Shirt) -->
  <g id="backMusician1" transform="translate(290, 410)">
    <circle cx="0" cy="-60" r="28" fill="#784E2D" /> <!-- Head -->
    <path d="M-18,-82 Q 0,-92 18,-82 Q 22,-65 18,-50 Q 0,-52 -18,-50 Z" fill="#18181B" /> <!-- Hair -->
    <path d="M-45,-25 C -40,-45 -25,-48 0,-48 C 25,-48 40,-45 45,-25 L 50,60 L -50,60 Z" fill="#3F5234" /> <!-- Shirt -->
    <path d="M-45,60 C -45,85 45,85 45,60 Z" fill="#F4F4F5" /> <!-- Dhoti -->
  </g>

  <!-- Back Musician Center (Green Shirt with Table / Shruti) -->
  <g id="backMusician2" transform="translate(690, 420)">
    <circle cx="0" cy="-60" r="28" fill="#734A29" />
    <path d="M-18,-82 Q 0,-92 18,-82 Q 22,-65 18,-50 Q 0,-52 -18,-50 Z" fill="#18181B" />
    <path d="M-45,-25 C -40,-45 -25,-48 0,-48 C 25,-48 40,-45 45,-25 L 50,60 L -50,60 Z" fill="#394D2E" />
    <path d="M-45,60 C -45,85 45,85 45,60 Z" fill="#F4F4F5" />
    <!-- Shruti / Percussion Box on Stand -->
    <rect x="-25" y="45" width="50" height="35" rx="3" fill="#854D0E" stroke="#DFB76C" stroke-width="1.5" />
    <circle cx="0" cy="62" r="10" fill="#3F2208" />
  </g>

  <!-- Back Musician Right (Dark Shirt) -->
  <g id="backMusician3" transform="translate(860, 425)">
    <circle cx="0" cy="-60" r="26" fill="#754826" />
    <path d="M-18,-82 Q 0,-92 18,-82 Q 22,-65 18,-50 Q 0,-52 -18,-50 Z" fill="#18181B" />
    <path d="M-40,-25 C -35,-45 -20,-48 0,-48 C 20,-48 35,-45 40,-25 L 45,55 L -45,55 Z" fill="#2E3C4D" />
    <path d="M-40,55 C -40,80 40,80 40,55 Z" fill="#F4F4F5" />
  </g>

  <!-- 9. FOREGROUND LEAD ARTISTS -->
  <!-- LEAD ARTIST 1: NADHASVARAM VIDWAN (LEFT-CENTER) -->
  <g id="nadhasvaramArtist" transform="translate(450, 410)">
    <!-- Seated Body in Cream Silk Kurta / Shirt -->
    <path d="M-85,180 C -85,150 -55,100 -30,50 C 0,50 35,50 65,100 C 95,150 115,180 85,180 Z" fill="#FAF5E8" />
    <!-- Gold Border Angavastram / Shawl across shoulder -->
    <path d="M-40,10 C -25,35 15,110 35,175 L 15,180 L -55,25 Z" fill="#DFB76C" opacity="0.9" />
    <path d="M-40,10 C -25,35 15,110 35,175" stroke="#991B1B" stroke-width="3" fill="none" />

    <!-- Head & Expression (Profile playing wind instrument) -->
    <circle cx="-10" cy="-60" r="38" fill="#805330" />
    <path d="M-35,-88 Q -5,-105 25,-85 Q 35,-55 25,-35 Q -5,-45 -35,-45 Z" fill="#18181B" /> <!-- Thick Hair -->
    <!-- Moustache -->
    <path d="M-5,-42 Q 15,-40 25,-46 Q 15,-36 -5,-38 Z" fill="#09090B" />
    <!-- Tilak / Vibhuti on Forehead -->
    <line x1="-12" y1="-75" x2="8" y2="-75" stroke="#FFF" stroke-width="2" />
    <line x1="-12" y1="-71" x2="8" y2="-71" stroke="#FFF" stroke-width="2" />
    <circle cx="-2" cy="-73" r="2" fill="#DC2626" />

    <!-- Seated Crossed Legs with Gold Border Dhoti (Veshti) -->
    <ellipse cx="0" cy="185" rx="140" ry="35" fill="#FAF5E8" stroke="#D1D5DB" stroke-width="1" />
    <path d="M-140,185 Q 0,225 140,185" fill="none" stroke="#DFB76C" stroke-width="8" />
    <path d="M-130,187 Q 0,223 130,187" fill="none" stroke="#991B1B" stroke-width="2" />
    <!-- Bare Feet on Mat -->
    <ellipse cx="-40" cy="210" rx="18" ry="10" fill="#805330" />
    <ellipse cx="60" cy="205" rx="18" ry="10" fill="#805330" />

    <!-- Arms & Hands Holding the Nadhasvaram -->
    <path d="M-45,30 Q 10,75 50,75" stroke="#805330" stroke-width="24" stroke-linecap="round" fill="none" />
    <path d="M20,30 Q 80,85 110,110" stroke="#805330" stroke-width="22" stroke-linecap="round" fill="none" />

    <!-- THE NADHASVARAM INSTRUMENT (Long conical wooden body with brass flare & tassel) -->
    <!-- Mouthpiece / Reed (Koodu) at Lips -->
    <line x1="12" y1="-42" x2="35" y2="-32" stroke="#DFB76C" stroke-width="7" />
    <!-- Main Long Dark Polished Wooden Body (Aacha wood) -->
    <polygon points="35,-32 42,-22 230,150 215,160" fill="#2E1807" stroke="#452309" stroke-width="1" />
    <!-- Finger Holes & Brass Rings (Kanjam) -->
    <circle cx="85" cy="15" r="3" fill="#DFB76C" />
    <circle cx="115" cy="45" r="3" fill="#DFB76C" />
    <circle cx="145" cy="75" r="3" fill="#DFB76C" />
    <circle cx="175" cy="105" r="3" fill="#DFB76C" />
    <circle cx="195" cy="125" r="3" fill="#DFB76C" />
    <!-- Brass Rings on Pipe -->
    <line x1="80" y1="8" x2="88" y2="16" stroke="#FFE59E" stroke-width="3" />
    <line x1="140" y1="68" x2="148" y2="76" stroke="#FFE59E" stroke-width="3" />
    <line x1="200" y1="128" x2="208" y2="136" stroke="#FFE59E" stroke-width="3" />

    <!-- Flared Bell (Anusu) at End of Nadhasvaram -->
    <path d="M210,140 Q 255,175 270,205 Q 235,215 200,165 Z" fill="url(#brassLamp)" stroke="#996515" stroke-width="2" />
    <ellipse cx="250" cy="195" rx="14" ry="24" fill="#3D2005" stroke="#DFB76C" stroke-width="3" />

    <!-- Ornate Hanging Gold Zari Silk Tassel (Thongal) -->
    <path d="M40,25 Q 45,95 25,125" stroke="#DFB76C" stroke-width="10" stroke-linecap="round" fill="none" />
    <path d="M35,120 Q 30,155 35,165" stroke="#DC2626" stroke-width="8" stroke-linecap="round" fill="none" />
    <circle cx="35" cy="168" r="6" fill="#FBBF24" />
  </g>

  <!-- LEAD ARTIST 2: THAVIL VIDWAN (RIGHT-CENTER) -->
  <g id="thavilArtist" transform="translate(930, 430)">
    <!-- Seated Body in Maroon / Deep Red Silk Shirt -->
    <path d="M-80,160 C -80,120 -50,80 -20,35 C 10,35 45,35 70,80 C 95,120 105,160 80,160 Z" fill="#7F1D1D" />
    <!-- Shirt Collar & Buttons -->
    <path d="M-15,35 L 0,85 L 15,35" stroke="#991B1B" stroke-width="2" fill="none" />
    <circle cx="0" cy="50" r="2" fill="#FDE047" />
    <circle cx="0" cy="70" r="2" fill="#FDE047" />

    <!-- Head & Expression -->
    <circle cx="-5" cy="-60" r="38" fill="#7D4F2C" />
    <path d="M-32,-88 Q 0,-102 28,-85 Q 35,-55 25,-35 Q -5,-45 -32,-45 Z" fill="#18181B" />
    <!-- Moustache -->
    <path d="M-15,-38 Q 0,-34 18,-42 Q 0,-30 -15,-34 Z" fill="#09090B" />
    <!-- Tilak / Chandanam on Forehead -->
    <line x1="-12" y1="-75" x2="8" y2="-75" stroke="#FDE047" stroke-width="3" />
    <circle cx="-2" cy="-75" r="2.5" fill="#DC2626" />

    <!-- Seated Crossed Legs with Gold Border Dhoti (Veshti) -->
    <ellipse cx="0" cy="170" rx="130" ry="32" fill="#FAF5E8" stroke="#D1D5DB" stroke-width="1" />
    <path d="M-130,170 Q 0,205 130,170" fill="none" stroke="#DFB76C" stroke-width="8" />
    <path d="M-120,172 Q 0,203 120,172" fill="none" stroke="#991B1B" stroke-width="2" />
    <!-- Bare Feet on Mat -->
    <ellipse cx="-45" cy="190" rx="16" ry="9" fill="#7D4F2C" />
    <ellipse cx="45" cy="190" rx="16" ry="9" fill="#7D4F2C" />

    <!-- THE THAVIL DRUM (Barrel Drum with Leather Skin, Red Velvet Belt & Straps) -->
    <g id="thavilDrum" transform="translate(-160, 50)">
      <!-- Barrel Wooden Body (Jackfruit Wood) -->
      <ellipse cx="60" cy="50" rx="95" ry="60" fill="#9A5B2D" stroke="#5C3414" stroke-width="3" />
      <path d="M-20,20 Q 60,-15 140,20 L 140,80 Q 60,115 -20,80 Z" fill="#80471C" />

      <!-- Red Velvet Protective Center Cloth Band -->
      <path d="M15,10 Q 60,-5 105,10 L 105,90 Q 60,105 15,90 Z" fill="#881337" stroke="#DFB76C" stroke-width="2" />
      <line x1="60" y1="2" x2="60" y2="98" stroke="#DFB76C" stroke-width="2" />

      <!-- Left Drum Face (Valanthalai - Played with Hard Thimbles / Koodu) -->
      <ellipse cx="-20" cy="50" rx="15" ry="50" fill="#E8D5B5" stroke="#452309" stroke-width="5" />
      <ellipse cx="-20" cy="50" rx="9" ry="35" fill="#D4BE98" />
      <!-- Black circular paste (Choru) -->
      <ellipse cx="-20" cy="50" rx="4" ry="16" fill="#262626" />

      <!-- Right Drum Face (Thoppi - Played with Curved Stick) -->
      <ellipse cx="140" cy="50" rx="15" ry="50" fill="#F5E6CC" stroke="#452309" stroke-width="5" />

      <!-- Tension Straps & Leather Braids -->
      <line x1="-15" y1="10" x2="135" y2="10" stroke="#DFB76C" stroke-width="2" />
      <line x1="-15" y1="30" x2="135" y2="30" stroke="#DFB76C" stroke-width="2" />
      <line x1="-15" y1="70" x2="135" y2="70" stroke="#DFB76C" stroke-width="2" />
      <line x1="-15" y1="90" x2="135" y2="90" stroke="#DFB76C" stroke-width="2" />
    </g>

    <!-- Hands & Thavil Stick -->
    <!-- Left Hand with Bandages / Thimbles Striking Valanthalai -->
    <path d="M-60,40 Q -110,60 -150,85" stroke="#7D4F2C" stroke-width="22" stroke-linecap="round" fill="none" />
    <!-- Hard Plaster Rings on Fingers -->
    <rect x="-165" y="80" width="14" height="20" rx="4" fill="#F4F4F5" stroke="#A1A1AA" stroke-width="1.5" />

    <!-- Right Hand Holding Curved Wooden Stick (Kaddi) -->
    <path d="M40,30 Q -10,75 -40,110" stroke="#7D4F2C" stroke-width="22" stroke-linecap="round" fill="none" />
    <!-- Curved Stick Striking Thoppi -->
    <path d="M-40,110 Q -25,120 -15,95" stroke="#451A03" stroke-width="6" stroke-linecap="round" fill="none" />
  </g>

  <!-- 10. BRASS KUTHUVILAKKU TRADITIONAL OIL LAMPS (LEFT & RIGHT) -->
  <!-- Left Kuthuvilakku Lamp -->
  <g id="leftLamp" transform="translate(180, 360)">
    <!-- Base -->
    <ellipse cx="0" cy="220" rx="35" ry="12" fill="url(#brassLamp)" stroke="#8C6420" stroke-width="1.5" />
    <path d="M-25,220 Q 0,200 25,220" fill="#DFB76C" />
    <!-- Stem / Shaft -->
    <rect x="-6" y="50" width="12" height="160" fill="url(#brassLamp)" />
    <!-- Moldings / Nodes -->
    <circle cx="0" cy="160" r="14" fill="url(#brassLamp)" />
    <circle cx="0" cy="110" r="16" fill="url(#brassLamp)" />
    <!-- Main Oil Reservoir Dish (Thattu) -->
    <ellipse cx="0" cy="50" rx="45" ry="12" fill="url(#brassLamp)" stroke="#8C6420" stroke-width="2" />
    <!-- Crown / Bird Finial (Annapakshi) -->
    <path d="M0,50 L 0,-15 Q 12,-35 0,-45 Q -12,-35 0,-15 Z" fill="url(#brassLamp)" />
    <circle cx="4" cy="-35" r="2" fill="#5C4018" />

    <!-- 5 Glowing Oil Wicks with Flames -->
    <circle cx="-35" cy="46" r="12" fill="url(#flameGlow)" />
    <circle cx="-18" cy="48" r="14" fill="url(#flameGlow)" />
    <circle cx="0" cy="49" r="16" fill="url(#flameGlow)" />
    <circle cx="18" cy="48" r="14" fill="url(#flameGlow)" />
    <circle cx="35" cy="46" r="12" fill="url(#flameGlow)" />

    <!-- Golden Aura around Lamp -->
    <circle cx="0" cy="45" r="60" fill="#FEF08A" opacity="0.15" />
  </g>

  <!-- Right Kuthuvilakku Lamp -->
  <g id="rightLamp" transform="translate(1120, 360)">
    <ellipse cx="0" cy="220" rx="35" ry="12" fill="url(#brassLamp)" stroke="#8C6420" stroke-width="1.5" />
    <path d="M-25,220 Q 0,200 25,220" fill="#DFB76C" />
    <rect x="-6" y="50" width="12" height="160" fill="url(#brassLamp)" />
    <circle cx="0" cy="160" r="14" fill="url(#brassLamp)" />
    <circle cx="0" cy="110" r="16" fill="url(#brassLamp)" />
    <ellipse cx="0" cy="50" rx="45" ry="12" fill="url(#brassLamp)" stroke="#8C6420" stroke-width="2" />
    <path d="M0,50 L 0,-15 Q 12,-35 0,-45 Q -12,-35 0,-15 Z" fill="url(#brassLamp)" />
    <circle cx="4" cy="-35" r="2" fill="#5C4018" />

    <circle cx="-35" cy="46" r="12" fill="url(#flameGlow)" />
    <circle cx="-18" cy="48" r="14" fill="url(#flameGlow)" />
    <circle cx="0" cy="49" r="16" fill="url(#flameGlow)" />
    <circle cx="18" cy="48" r="14" fill="url(#flameGlow)" />
    <circle cx="35" cy="46" r="12" fill="url(#flameGlow)" />

    <circle cx="0" cy="45" r="60" fill="#FEF08A" opacity="0.15" />
  </g>

  <!-- 11. AUSPICIOUS PUJA OFFERING BASKETS & FLOWERS IN FOREGROUND -->
  <!-- Left Offering Basket (Fruits, Bananas & Betel Leaves) -->
  <g id="leftPujaBasket" transform="translate(80, 560)">
    <!-- Cane Weave Basket Tray -->
    <ellipse cx="0" cy="50" rx="75" ry="24" fill="#A16207" stroke="#78350F" stroke-width="3" />
    <ellipse cx="0" cy="46" rx="70" ry="20" fill="#B45309" />
    <!-- Yellow Bananas Cluster -->
    <path d="M-40,35 Q -20,10 0,35 Q -20,25 -40,35 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
    <path d="M-30,30 Q -10,5 10,30 Q -10,20 -30,30 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
    <!-- Brown Coconut Halves -->
    <circle cx="25" cy="35" r="16" fill="#713F12" stroke="#451A03" stroke-width="2" />
    <circle cx="25" cy="35" r="11" fill="#FFFFFF" />
    <!-- Auspicious Green Betel Leaves (Vetrilai) -->
    <path d="M-15,45 Q 0,20 15,45 Z" fill="#15803D" stroke="#166534" stroke-width="1" />
    <!-- Red Flowers & Marigold Sprigs -->
    <circle cx="-50" cy="48" r="7" fill="#DC2626" />
    <circle cx="50" cy="46" r="8" fill="#F97316" />
  </g>

  <!-- Right Scattered Flower Petals -->
  <g id="rightFlowers" transform="translate(1100, 580)">
    <ellipse cx="0" cy="40" rx="55" ry="18" fill="#92400E" stroke="#78350F" stroke-width="2" />
    <circle cx="-25" cy="38" r="8" fill="#DC2626" />
    <circle cx="0" cy="35" r="10" fill="#F59E0B" />
    <circle cx="25" cy="38" r="8" fill="#DC2626" />
    <circle cx="10" cy="42" r="6" fill="#FFFFFF" />
  </g>

  <!-- 12. VIGNETTE & SUBTLE BRAND ACCENT -->
  <rect width="100%" height="100%" fill="none" stroke="#DFB76C" stroke-width="6" opacity="0.4" />
</svg>
`;

async function generate() {
  console.log('Generating Melam & Nadhasvaram image matching Wh.jpeg...');

  const svgBuffer = Buffer.from(svg);
  const webpPath = path.join(IMAGES_DIR, 'melam-nadhasvaram.webp');
  const pngPath = path.join(IMAGES_DIR, 'melam-nadhasvaram.png');

  // Generate WebP
  const webpBuf = await sharp(svgBuffer)
    .resize(WIDTH, HEIGHT)
    .webp({ quality: 92, effort: 5 })
    .toBuffer();
  fs.writeFileSync(webpPath, webpBuf);

  // Generate PNG
  const pngBuf = await sharp(svgBuffer)
    .resize(WIDTH, HEIGHT)
    .png({ compressionLevel: 9, effort: 7, palette: true })
    .toBuffer();
  fs.writeFileSync(pngPath, pngBuf);

  console.log(`✓ melam-nadhasvaram.webp generated (${(webpBuf.length / 1024).toFixed(0)} KB)`);
  console.log(`✓ melam-nadhasvaram.png generated (${(pngBuf.length / 1024).toFixed(0)} KB)`);
}

generate().catch(console.error);
