const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.resolve(__dirname, '../public/images/works');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const WIDTH = 1000;
const HEIGHT = 1000; // Square composite matching the uploaded double-stage photos

const worksData = [
  {
    id: 'work-1',
    title: 'Grand White Floral Arches & "ONE" Birthday Stage',
    badge: 'Wedding Reception & 1st Birthday',
    topBg: '#1C1917',
    bottomBg: '#0F172A',
    svg: `
      <!-- TOP: Grand White Floral Arch Stage -->
      <rect x="0" y="0" width="1000" height="500" fill="#1C1917" />
      <!-- Floral Hanging Canopy -->
      <rect x="0" y="30" width="1000" height="40" fill="#15803D" />
      <path d="M0,70 Q 250,90 500,70 T 1000,70" stroke="#FFFFFF" stroke-width="25" fill="none" opacity="0.9" />
      <path d="M0,70 Q 250,90 500,70 T 1000,70" stroke="#F43F5E" stroke-width="12" stroke-dasharray="15 10" fill="none" />
      
      <!-- Triple White Floral Concentric Arches -->
      <path d="M150,380 C 150,150 850,150 850,380" stroke="#F5F5F4" stroke-width="70" fill="none" />
      <path d="M250,380 C 250,180 750,180 750,380" stroke="#E7E5E4" stroke-width="60" fill="none" />
      <path d="M350,380 C 350,220 650,220 650,380" stroke="#FFFFFF" stroke-width="50" fill="none" />

      <!-- Golden Stage Sofa -->
      <rect x="420" y="270" width="160" height="60" rx="15" fill="#DFB76C" stroke="#B45309" stroke-width="4" />
      <rect x="440" y="295" width="120" height="25" rx="6" fill="#FEF08A" />

      <!-- Flower Urns and Chandeliers -->
      <circle cx="280" cy="270" r="25" fill="#F43F5E" />
      <circle cx="720" cy="270" r="25" fill="#F43F5E" />
      <!-- Stage skirting -->
      <rect x="0" y="360" width="1000" height="140" fill="#E2E8F0" />
      <path d="M0,360 Q 50,370 100,360 T 1000,360" stroke="#10B981" stroke-width="24" fill="none" />
      <text x="500" y="470" text-anchor="middle" font-family="serif" font-size="20" font-weight="bold" fill="#0F172A">AMMAN GRAND FLORAL ARCH RECEPTION</text>

      <!-- DIVIDER LINE -->
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#DFB76C" stroke-width="6" />

      <!-- BOTTOM: Royal Blue "ONE" 1st Birthday Stage -->
      <rect x="0" y="500" width="1000" height="500" fill="#0B132B" />
      <!-- Balloon Ring Arch -->
      <circle cx="500" cy="720" r="160" fill="none" stroke="#2563EB" stroke-width="45" opacity="0.8" />
      <circle cx="500" cy="720" r="140" fill="none" stroke="#60A5FA" stroke-width="25" />
      <circle cx="500" cy="720" r="125" fill="#1E293B" />
      <text x="500" y="700" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#93C5FD">Happy 1st Birthday</text>
      <text x="500" y="735" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="900" fill="#FFFFFF">M. HARI KRISHNAN</text>

      <!-- Big Giant "ONE" Marquee Sign -->
      <text x="500" y="870" text-anchor="middle" font-family="sans-serif" font-size="110" font-weight="900" fill="#FFFFFF" stroke="#38BDF8" stroke-width="4">ONE</text>

      <!-- White Picket Fence on Left and Right -->
      <g fill="#E2E8F0" stroke="#94A3B8" stroke-width="2">
        <rect x="50" y="770" width="16" height="180" rx="3" />
        <rect x="80" y="770" width="16" height="180" rx="3" />
        <rect x="110" y="770" width="16" height="180" rx="3" />
        <rect x="140" y="770" width="16" height="180" rx="3" />
        <rect x="170" y="770" width="16" height="180" rx="3" />
        <line x1="40" y1="810" x2="200" y2="810" stroke="#94A3B8" stroke-width="10" />
        <line x1="40" y1="890" x2="200" y2="890" stroke="#94A3B8" stroke-width="10" />

        <rect x="810" y="770" width="16" height="180" rx="3" />
        <rect x="840" y="770" width="16" height="180" rx="3" />
        <rect x="870" y="770" width="16" height="180" rx="3" />
        <rect x="900" y="770" width="16" height="180" rx="3" />
        <rect x="930" y="770" width="16" height="180" rx="3" />
        <line x1="800" y1="810" x2="960" y2="810" stroke="#94A3B8" stroke-width="10" />
        <line x1="800" y1="890" x2="960" y2="890" stroke="#94A3B8" stroke-width="10" />
      </g>
      <!-- Blue balloon clusters -->
      <circle cx="100" cy="740" r="30" fill="#38BDF8" />
      <circle cx="880" cy="740" r="30" fill="#38BDF8" />
    `
  },
  {
    id: 'work-2',
    title: 'Pink Marble "Dhanya Sri" Stage & Green Gold Lattice Mandap',
    badge: 'Luxury Engagement & Haldi Ceremony',
    topBg: '#4A1D36',
    bottomBg: '#062817',
    svg: `
      <!-- TOP: Pink Marble & Ring Backdrop ("Dhanya Sri") -->
      <rect x="0" y="0" width="1000" height="500" fill="#9D4E7A" />
      <rect x="80" y="30" width="840" height="400" rx="12" fill="#E8B4CE" opacity="0.9" />
      <!-- Arch frames -->
      <path d="M200,400 C 200,100 450,100 450,400" stroke="#FDE047" stroke-width="12" fill="none" />
      <path d="M550,400 C 550,100 800,100 800,400" stroke="#FDE047" stroke-width="12" fill="none" />
      <!-- Center Floral Ring -->
      <circle cx="500" cy="220" r="110" stroke="#15803D" stroke-width="24" fill="none" />
      <circle cx="500" cy="220" r="110" stroke="#F43F5E" stroke-width="14" stroke-dasharray="18 10" fill="none" />
      <text x="500" y="235" text-anchor="middle" font-family="'Brush Script MT', cursive, serif" font-size="44" font-weight="bold" fill="#4A044E">Dhanya Sri</text>

      <!-- Violet Velvet Couch -->
      <rect x="360" y="310" width="280" height="80" rx="20" fill="#4A044E" stroke="#DFB76C" stroke-width="4" />
      <rect x="380" y="335" width="240" height="40" rx="10" fill="#6B21A8" />

      <!-- DIVIDER LINE -->
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#DFB76C" stroke-width="6" />

      <!-- BOTTOM: Green Floral Trellis with Yellow Velvet Couch -->
      <rect x="0" y="500" width="1000" height="500" fill="#062817" />
      <!-- Green Lattice / Jaali Backdrops -->
      <rect x="60" y="550" width="180" height="380" fill="#14532D" stroke="#EAB308" stroke-width="6" />
      <rect x="760" y="550" width="180" height="380" fill="#14532D" stroke="#EAB308" stroke-width="6" />
      <!-- Yellow floral printed panels -->
      <rect x="250" y="550" width="140" height="380" fill="#CA8A04" />
      <rect x="610" y="550" width="140" height="380" fill="#CA8A04" />
      <!-- Center Green Foliage Wall -->
      <rect x="400" y="550" width="200" height="380" fill="#166534" />
      <text x="500" y="650" text-anchor="middle" font-family="'Noto Sans Tamil', serif" font-size="24" font-weight="bold" fill="#FEF08A">காதணி விழா</text>
      <!-- Hanging Jasmine String Lights -->
      <line x1="430" y1="550" x2="430" y2="720" stroke="#FEF08A" stroke-width="3" stroke-dasharray="6 4" />
      <line x1="470" y1="550" x2="470" y2="740" stroke="#FEF08A" stroke-width="3" stroke-dasharray="6 4" />
      <line x1="530" y1="550" x2="530" y2="740" stroke="#FEF08A" stroke-width="3" stroke-dasharray="6 4" />
      <line x1="570" y1="550" x2="570" y2="720" stroke="#FEF08A" stroke-width="3" stroke-dasharray="6 4" />
      <!-- Yellow Velvet Sofa -->
      <rect x="390" y="760" width="220" height="70" rx="16" fill="#EAB308" stroke="#713F12" stroke-width="4" />
      <rect x="410" y="785" width="180" height="35" rx="8" fill="#FDE047" />
      <!-- Floor pattern -->
      <rect x="0" y="870" width="1000" height="130" fill="#15803D" opacity="0.6" />
    `
  },
  {
    id: 'work-3',
    title: 'Golden Arch "Ritika" Pavilion & Grand Marble Throne ("JH")',
    badge: 'Royal Reception & Grand Muhurtham',
    topBg: '#1C1917',
    bottomBg: '#3F1708',
    svg: `
      <!-- TOP: Golden Arches & Cascading Floral Chandeliers ("Ritika") -->
      <rect x="0" y="0" width="1000" height="500" fill="#1C1917" />
      <rect x="30" y="20" width="940" height="40" fill="#E11D48" />
      <rect x="30" y="55" width="940" height="20" fill="#FDE047" />

      <!-- Golden Wire Arches -->
      <path d="M280,380 C 280,180 500,180 500,380" stroke="#DFB76C" stroke-width="8" fill="none" />
      <path d="M500,380 C 500,180 720,180 720,380" stroke="#DFB76C" stroke-width="8" fill="none" />
      <!-- Central Golden Halo with "Ritika" -->
      <circle cx="500" cy="270" r="45" stroke="#DFB76C" stroke-width="4" fill="#000000" opacity="0.4" />
      <text x="500" y="278" text-anchor="middle" font-family="'Brush Script MT', cursive, serif" font-size="28" font-weight="bold" fill="#FDE047">Ritika</text>

      <!-- Chandeliers -->
      <circle cx="370" cy="230" r="16" fill="#FDE047" />
      <circle cx="630" cy="230" r="16" fill="#FDE047" />
      <!-- Camel Brown Sofa -->
      <rect x="380" y="330" width="240" height="70" rx="18" fill="#9A6B3D" stroke="#DFB76C" stroke-width="4" />

      <!-- Floral Skirting -->
      <rect x="0" y="420" width="1000" height="80" fill="#F43F5E" />
      <rect x="0" y="440" width="1000" height="25" fill="#FFFFFF" />

      <!-- DIVIDER LINE -->
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#DFB76C" stroke-width="6" />

      <!-- BOTTOM: Royal Marble Facet Panels & Throne ("JH") -->
      <rect x="0" y="500" width="1000" height="500" fill="#2E180E" />
      <!-- Angular Marble Wings -->
      <polygon points="60,500 200,530 200,850 60,890" fill="#F8FAFC" stroke="#DFB76C" stroke-width="6" />
      <polygon points="940,500 800,530 800,850 940,890" fill="#F8FAFC" stroke="#DFB76C" stroke-width="6" />
      <!-- Floral Paneling -->
      <rect x="170" y="570" width="90" height="280" fill="#E2E8F0" stroke="#DFB76C" stroke-width="4" />
      <rect x="740" y="570" width="90" height="280" fill="#E2E8F0" stroke="#DFB76C" stroke-width="4" />
      <!-- Center Dense Flower Wall -->
      <rect x="350" y="560" width="300" height="260" fill="#FCE7F3" stroke="#DFB76C" stroke-width="6" />
      <circle cx="500" cy="670" r="35" stroke="#DFB76C" stroke-width="4" fill="none" />
      <text x="500" y="682" text-anchor="middle" font-family="serif" font-size="34" font-weight="bold" fill="#DFB76C">JH</text>

      <!-- Royal Golden Carved Throne -->
      <path d="M360,780 Q 500,710 640,780 L 640,860 L 360,860 Z" fill="#713F12" stroke="#DFB76C" stroke-width="6" />
      <circle cx="500" cy="785" r="26" fill="#DFB76C" />
      <rect x="390" y="810" width="220" height="40" rx="8" fill="#DFB76C" />
    `
  },
  {
    id: 'work-4',
    title: 'Under-The-Sea Aquatic "AADHVIK" & Rainbow Unicorn "MOULYA"',
    badge: 'Thematic 1st Birthday Mega Stages',
    topBg: '#083344',
    bottomBg: '#3B0764',
    svg: `
      <!-- TOP: Under-the-Sea Aquatic ("AADHVIK") -->
      <rect x="0" y="0" width="1000" height="500" fill="#083344" />
      <!-- Turquoise Balloon Waves -->
      <path d="M0,150 Q 250,50 500,150 T 1000,150" stroke="#06B6D4" stroke-width="50" fill="none" opacity="0.8" />
      <path d="M0,170 Q 250,70 500,170 T 1000,170" stroke="#A5F3FC" stroke-width="25" fill="none" />
      <!-- Sea Creatures Cutouts -->
      <circle cx="70" cy="300" r="45" fill="#38BDF8" /> <!-- Seal -->
      <circle cx="920" cy="280" r="50" fill="#0EA5E9" /> <!-- Dolphin -->
      <!-- Center Shimmer Wall -->
      <rect x="440" y="40" width="120" height="340" fill="#CFFAFE" opacity="0.8" />
      <circle cx="500" cy="110" r="20" fill="#FDE047" />
      <text x="500" y="140" text-anchor="middle" font-family="'Brush Script MT', cursive" font-size="22" fill="#FFFFFF">Happy Birthday</text>
      <!-- Giant Clam Shell -->
      <path d="M640,280 C 640,210 770,210 770,280 Z" fill="#991B1B" stroke="#FDE047" stroke-width="3" />
      <!-- "AADHVIK" Marquee letters -->
      <text x="500" y="430" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="900" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" letter-spacing="8">AADHVIK</text>

      <!-- DIVIDER LINE -->
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#DFB76C" stroke-width="6" />

      <!-- BOTTOM: Rainbow Unicorn Birthday ("MOULYA") -->
      <rect x="0" y="500" width="1000" height="500" fill="#2E1065" />
      <!-- Rainbow Arches -->
      <path d="M150,850 C 150,600 850,600 850,850" stroke="#F43F5E" stroke-width="14" fill="none" />
      <path d="M170,850 C 170,620 830,620 830,850" stroke="#FB923C" stroke-width="14" fill="none" />
      <path d="M190,850 C 190,640 810,640 810,850" stroke="#FACC15" stroke-width="14" fill="none" />
      <path d="M210,850 C 210,660 790,660 790,850" stroke="#4ADE80" stroke-width="14" fill="none" />
      <path d="M230,850 C 230,680 770,680 770,850" stroke="#38BDF8" stroke-width="14" fill="none" />

      <!-- Cloud Balloon Toppers -->
      <circle cx="240" cy="590" r="35" fill="#FFFFFF" />
      <circle cx="760" cy="590" r="35" fill="#FFFFFF" />
      <circle cx="500" cy="560" r="45" fill="#EC4899" />
      <text x="500" y="730" text-anchor="middle" font-family="'Brush Script MT', cursive" font-size="36" fill="#FDE047">Moulya's 1st</text>

      <!-- Glowing "MOULYA" Marquee Sign -->
      <text x="500" y="910" text-anchor="middle" font-family="sans-serif" font-size="82" font-weight="900" fill="#FFFFFF" stroke="#F472B6" stroke-width="3" letter-spacing="12">MOULYA</text>
    `
  },
  {
    id: 'work-5',
    title: 'Golden Lotus Mandapam & Balaji Temple Sanctum',
    badge: 'Traditional Wedding Reception & Temple Mandap',
    topBg: '#15803D',
    bottomBg: '#78350F',
    svg: `
      <!-- TOP: Golden Lotus Floral Backdrop -->
      <rect x="0" y="0" width="1000" height="500" fill="#14532D" />
      <!-- Yellow floral perimeter -->
      <rect x="30" y="30" width="940" height="50" fill="#E11D48" />
      <rect x="50" y="40" width="900" height="25" fill="#FEF08A" />

      <!-- Center Giant Lotus Petal Frame -->
      <g transform="translate(500, 260)">
        <path d="M0,-120 Q -40,-40 0,0 Q 40,-40 0,-120" fill="#FEF08A" stroke="#CA8A04" stroke-width="3" />
        <path d="M-50,-100 Q -80,-30 0,0 Q -20,-70 -50,-100" fill="#FFFFFF" stroke="#CA8A04" stroke-width="3" />
        <path d="M50,-100 Q 80,-30 0,0 Q 20,-70 50,-100" fill="#FFFFFF" stroke="#CA8A04" stroke-width="3" />
        <path d="M-90,-70 Q -110,-10 0,0 Q -60,-50 -90,-70" fill="#FEF08A" stroke="#CA8A04" stroke-width="3" />
        <path d="M90,-70 Q 110,-10 0,0 Q 60,-50 90,-70" fill="#FEF08A" stroke="#CA8A04" stroke-width="3" />
      </g>
      <!-- Golden Royal Sofa -->
      <rect x="380" y="270" width="240" height="80" rx="18" fill="#CA8A04" stroke="#713F12" stroke-width="4" />
      <rect x="400" y="295" width="200" height="40" rx="8" fill="#FDE047" />

      <!-- Stage pleated yellow skirting -->
      <rect x="0" y="420" width="1000" height="80" fill="#CA8A04" />
      <path d="M0,420 Q 50,440 100,420 T 1000,420" stroke="#713F12" stroke-width="6" fill="none" />

      <!-- DIVIDER LINE -->
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#DFB76C" stroke-width="6" />

      <!-- BOTTOM: Golden Temple Sanctum with Deities (Balaji & Padmavathi) -->
      <rect x="0" y="500" width="1000" height="500" fill="#451A03" />
      <!-- Golden Pillars and Archway -->
      <rect x="150" y="530" width="80" height="400" fill="#CA8A04" stroke="#713F12" stroke-width="4" />
      <rect x="770" y="530" width="80" height="400" fill="#CA8A04" stroke="#713F12" stroke-width="4" />
      <rect x="150" y="530" width="700" height="40" fill="#EAB308" stroke="#713F12" stroke-width="4" />

      <!-- Sacred Shrines / Arches with Deities -->
      <rect x="320" y="700" width="140" height="200" rx="20" fill="#78350F" stroke="#EAB308" stroke-width="5" />
      <circle cx="390" cy="760" r="28" fill="#FEF08A" />
      <rect x="540" y="700" width="140" height="200" rx="20" fill="#78350F" stroke="#EAB308" stroke-width="5" />
      <circle cx="610" cy="760" r="28" fill="#FEF08A" />

      <!-- Sacred Symbol in Center -->
      <circle cx="500" cy="720" r="30" stroke="#FEF08A" stroke-width="4" fill="none" />
      <text x="500" y="730" text-anchor="middle" font-family="serif" font-size="28" font-weight="bold" fill="#FEF08A">ஓம்</text>

      <!-- Classical Wooden Diwan Sofa -->
      <rect x="420" y="820" width="160" height="50" rx="12" fill="#EAB308" stroke="#78350F" stroke-width="3" />
      <!-- Flower garlands along base -->
      <rect x="0" y="930" width="1000" height="70" fill="#713F12" />
      <line x1="0" y1="940" x2="1000" y2="940" stroke="#EAB308" stroke-width="12" />
    `
  },
  {
    id: 'work-6',
    title: 'Modern Lilac Symphony & Teal Glowing Lotus Stage',
    badge: 'Contemporary Wedding Stage Decor',
    topBg: '#1E1B4B',
    bottomBg: '#042F2E',
    svg: `
      <!-- TOP: Modern Lilac & Purple Floral Symphony -->
      <rect x="0" y="0" width="1000" height="500" fill="#1E1B4B" />
      <!-- Floral Hanging Ceiling -->
      <rect x="0" y="20" width="1000" height="40" fill="#6D28D9" />
      <rect x="0" y="55" width="1000" height="20" fill="#DDD6FE" />

      <!-- Geometric Wave Screens -->
      <path d="M120,400 L 240,150 L 240,400 Z" fill="#F8FAFC" stroke="#C4B5FD" stroke-width="4" />
      <path d="M880,400 L 760,150 L 760,400 Z" fill="#F8FAFC" stroke="#C4B5FD" stroke-width="4" />
      <!-- Center Circular Floral Ring -->
      <circle cx="500" cy="240" r="120" fill="#581C87" stroke="#A855F7" stroke-width="18" />
      <circle cx="500" cy="240" r="110" fill="#F3E8FF" />
      <circle cx="500" cy="240" r="30" stroke="#4C1D95" stroke-width="3" fill="none" />
      <text x="500" y="250" text-anchor="middle" font-family="serif" font-size="28" font-weight="bold" fill="#4C1D95">RV</text>

      <!-- Grey Sleek Couch -->
      <rect x="410" y="270" width="180" height="60" rx="15" fill="#E2E8F0" stroke="#7C3AED" stroke-width="3" />
      <!-- Purple & Indigo Floor Flowers -->
      <rect x="0" y="360" width="1000" height="140" fill="#312E81" />
      <path d="M0,370 Q 250,390 500,370 T 1000,370" stroke="#C084FC" stroke-width="24" fill="none" />

      <!-- DIVIDER LINE -->
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#DFB76C" stroke-width="6" />

      <!-- BOTTOM: Peacock Teal Silk & Glowing Lotus Mandap -->
      <rect x="0" y="500" width="1000" height="500" fill="#042F2E" />
      <!-- Peacock Teal Silk Curtains -->
      <rect x="180" y="530" width="640" height="380" fill="#0D9488" />
      <!-- Side Floral Grid Wings -->
      <rect x="30" y="530" width="130" height="380" fill="#14532D" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10 8" />
      <rect x="840" y="530" width="130" height="380" fill="#14532D" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10 8" />

      <!-- Radiant Glowing Lotus Backdrop -->
      <g transform="translate(500, 750)">
        <path d="M0,-140 Q -40,-50 0,0 Q 40,-50 0,-140" fill="#FEF08A" stroke="#EAB308" stroke-width="4" />
        <path d="M-60,-120 Q -90,-40 0,0 Q -20,-80 -60,-120" fill="#FEF08A" stroke="#EAB308" stroke-width="4" />
        <path d="M60,-120 Q 90,-40 0,0 Q 20,-80 60,-120" fill="#FEF08A" stroke="#EAB308" stroke-width="4" />
        <path d="M-110,-80 Q -130,-20 0,0 Q -70,-60 -110,-80" fill="#FFFFFF" stroke="#EAB308" stroke-width="4" />
        <path d="M110,-80 Q 130,-20 0,0 Q 70,-60 110,-80" fill="#FFFFFF" stroke="#EAB308" stroke-width="4" />
      </g>
      <!-- Royal Golden Lotus Throne -->
      <rect x="390" y="740" width="220" height="70" rx="16" fill="#CA8A04" stroke="#FEF08A" stroke-width="4" />
      <rect x="410" y="765" width="180" height="35" rx="8" fill="#FDE047" />

      <!-- Stage flower hedge -->
      <rect x="0" y="870" width="1000" height="130" fill="#0F766E" />
      <path d="M0,880 Q 250,900 500,880 T 1000,880" stroke="#FDE047" stroke-width="20" fill="none" />
    `
  },
  {
    id: 'work-7',
    title: 'Traditional Wedding Golu / Bommai Dolls & Mulaipari',
    badge: 'Authentic South Indian Seer Display',
    topBg: '#78350F',
    bottomBg: '#831843',
    svg: `
      <!-- TOP: Wedding Golu Dolls with Mulaipari Grass Pots -->
      <rect x="0" y="0" width="1000" height="500" fill="#78350F" />
      <!-- Gold & Red Festive Drapes -->
      <rect x="0" y="0" width="1000" height="80" fill="#FDE047" />
      <path d="M0,80 Q 125,120 250,80 T 1000,80" fill="#BE123C" />

      <!-- Row of Decorated Bride and Groom Dolls -->
      <g transform="translate(100, 240)">
        <circle cx="0" cy="-60" r="28" fill="#FDE047" stroke="#713F12" stroke-width="2" />
        <path d="M-30,-20 L 30,-20 L 40,80 L -40,80 Z" fill="#BE123C" stroke="#FDE047" stroke-width="3" />
        <circle cx="0" cy="-30" r="18" fill="#FDE047" />
      </g>
      <g transform="translate(250, 240)">
        <circle cx="0" cy="-60" r="28" fill="#FDE047" stroke="#713F12" stroke-width="2" />
        <path d="M-30,-20 L 30,-20 L 40,80 L -40,80 Z" fill="#15803D" stroke="#FDE047" stroke-width="3" />
      </g>
      <g transform="translate(400, 240)">
        <circle cx="0" cy="-60" r="28" fill="#FDE047" stroke="#713F12" stroke-width="2" />
        <path d="M-30,-20 L 30,-20 L 40,80 L -40,80 Z" fill="#1D4ED8" stroke="#FDE047" stroke-width="3" />
      </g>

      <!-- Mulaipari Sprouting Wheatgrass Baskets -->
      <g transform="translate(600, 320)">
        <ellipse cx="0" cy="40" rx="60" ry="15" fill="#713F12" />
        <path d="M-40,40 Q -10,-40 0,-70 Q 20,-30 40,40 Z" fill="#22C55E" />
        <path d="M-20,40 Q 0,-60 10,-80 Q 30,-40 20,40 Z" fill="#84CC16" />
      </g>
      <g transform="translate(800, 320)">
        <ellipse cx="0" cy="40" rx="60" ry="15" fill="#713F12" />
        <path d="M-40,40 Q -10,-40 0,-70 Q 20,-30 40,40 Z" fill="#22C55E" />
        <path d="M-20,40 Q 0,-60 10,-80 Q 30,-40 20,40 Z" fill="#84CC16" />
      </g>
      <!-- Traditional Royal Umbrella (Kavadi / Kudai) -->
      <path d="M680,140 C 680,60 780,60 780,140 Z" fill="#BE123C" stroke="#FDE047" stroke-width="4" />
      <line x1="730" y1="140" x2="730" y2="280" stroke="#FDE047" stroke-width="6" />

      <!-- Red Seer Table Border -->
      <rect x="0" y="380" width="1000" height="120" fill="#991B1B" />
      <text x="500" y="450" text-anchor="middle" font-family="'Noto Sans Tamil', serif" font-size="24" font-weight="bold" fill="#FEF08A">சீர்வரிசை தட்டு &amp; பாரம்பரிய பொம்மை அலங்காரம்</text>

      <!-- DIVIDER LINE -->
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#DFB76C" stroke-width="6" />

      <!-- BOTTOM: Auspicious Procession Dolls ("ALL IS WELL / Finally I Found You") -->
      <rect x="0" y="500" width="1000" height="500" fill="#831843" />
      <!-- Drapes -->
      <rect x="0" y="500" width="1000" height="60" fill="#FEF08A" />
      <path d="M0,560 Q 250,590 500,560 T 1000,560" fill="#BE123C" />

      <!-- Diverse Figurines row -->
      <g transform="translate(150, 740)">
        <circle cx="0" cy="-60" r="26" fill="#FDE047" />
        <rect x="-25" y="-30" width="50" height="90" fill="#1E3A8A" stroke="#FDE047" stroke-width="2" />
      </g>
      <g transform="translate(300, 740)">
        <circle cx="0" cy="-60" r="26" fill="#FDE047" />
        <rect x="-25" y="-30" width="50" height="90" fill="#15803D" stroke="#FDE047" stroke-width="2" />
      </g>
      <g transform="translate(450, 740)">
        <circle cx="0" cy="-60" r="26" fill="#FDE047" />
        <rect x="-25" y="-30" width="50" height="90" fill="#7C2D12" stroke="#FDE047" stroke-width="2" />
      </g>
      <g transform="translate(600, 740)">
        <circle cx="0" cy="-60" r="26" fill="#FDE047" />
        <rect x="-25" y="-30" width="50" height="90" fill="#BE123C" stroke="#FDE047" stroke-width="2" />
      </g>
      <g transform="translate(750, 740)">
        <circle cx="0" cy="-60" r="26" fill="#FDE047" />
        <rect x="-25" y="-30" width="50" height="90" fill="#FBBF24" stroke="#BE123C" stroke-width="2" />
      </g>

      <!-- Plaque Sign "ALL IS WELL" -->
      <rect x="420" y="810" width="160" height="35" rx="6" fill="#DC2626" stroke="#FEF08A" stroke-width="2" />
      <text x="500" y="834" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="900" fill="#FFFFFF">ALL IS WELL</text>

      <!-- Plaque Sign "Finally I Found You" -->
      <rect x="670" y="845" width="220" height="35" rx="6" fill="#FEF08A" stroke="#854D0E" stroke-width="2" />
      <text x="780" y="868" text-anchor="middle" font-family="'Brush Script MT', cursive, serif" font-size="20" font-weight="bold" fill="#78350F">Finally I Found You</text>
    `
  },
  {
    id: 'work-8',
    title: 'Divine Amman Blessing Mandap & "ANVI\'S WILD 2" Jungle Safari',
    badge: 'Sacred Deity Mandap & Safari 2nd Birthday',
    topBg: '#451A03',
    bottomBg: '#064E3B',
    svg: `
      <!-- TOP: Divine Goddess Amman Deity Mandapam -->
      <rect x="0" y="0" width="1000" height="500" fill="#451A03" />
      <!-- Goddess Crown & Garlands -->
      <g transform="translate(500, 200)">
        <!-- Crown (Kireedam) -->
        <polygon points="0,-120 -50,-40 50,-40" fill="#DFB76C" stroke="#B45309" stroke-width="4" />
        <circle cx="0" cy="-80" r="14" fill="#DC2626" />
        <!-- Deity Face -->
        <circle cx="0" cy="0" r="45" fill="#CA8A04" />
        <!-- Gold Ornaments & Flower malas -->
        <ellipse cx="0" cy="80" rx="90" ry="60" fill="#BE123C" stroke="#DFB76C" stroke-width="8" />
        <ellipse cx="0" cy="110" rx="120" ry="70" fill="#15803D" stroke="#FEF08A" stroke-width="6" />
      </g>
      <!-- Couple figurine cutouts flanking -->
      <g transform="translate(200, 240)">
        <circle cx="0" cy="-40" r="24" fill="#FDE047" />
        <rect x="-20" y="-15" width="40" height="85" fill="#FFFFFF" stroke="#DFB76C" stroke-width="2" />
      </g>
      <g transform="translate(800, 240)">
        <circle cx="0" cy="-40" r="24" fill="#FDE047" />
        <rect x="-20" y="-15" width="40" height="85" fill="#1E3A8A" stroke="#DFB76C" stroke-width="2" />
      </g>
      <!-- Auspicious Banner -->
      <rect x="340" y="320" width="320" height="40" rx="6" fill="#DC2626" stroke="#FEF08A" stroke-width="2" />
      <text x="500" y="347" text-anchor="middle" font-family="'Noto Sans Tamil', serif" font-size="20" font-weight="bold" fill="#FFFFFF">இரு மனங்கள் இணைவது திருமணம்</text>

      <!-- DIVIDER LINE -->
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#DFB76C" stroke-width="6" />

      <!-- BOTTOM: "ANVI'S WILD 2" Jungle Safari Birthday -->
      <rect x="0" y="500" width="1000" height="500" fill="#022C22" />
      <!-- Big Circular Safari Backdrop -->
      <circle cx="500" cy="690" r="140" fill="#ECFDF5" stroke="#EAB308" stroke-width="6" />
      <!-- Safari Jeep -->
      <rect x="440" y="720" width="120" height="60" rx="12" fill="#15803D" stroke="#14532D" stroke-width="3" />
      <rect x="460" y="740" width="80" height="20" rx="4" fill="#FEF08A" />
      <text x="500" y="755" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#000000">Anvi's Wild 2</text>
      <!-- Animal Balloon Garland encircling the backdrop -->
      <path d="M350,720 C 350,560 650,560 650,720" stroke="#EAB308" stroke-width="45" fill="none" opacity="0.9" />
      <path d="M350,720 C 350,560 650,560 650,720" stroke="#EA580C" stroke-width="25" stroke-dasharray="30 20" fill="none" />
      <path d="M350,720 C 350,560 650,560 650,720" stroke="#16A34A" stroke-width="12" stroke-dasharray="15 15" fill="none" />

      <!-- Animal Cutouts -->
      <g transform="translate(60, 680)"> <!-- Monkey -->
        <circle cx="0" cy="0" r="26" fill="#B45309" />
        <ellipse cx="0" cy="40" rx="20" ry="30" fill="#D97706" />
      </g>
      <g transform="translate(160, 690)"> <!-- Lion -->
        <circle cx="0" cy="0" r="34" fill="#EA580C" />
        <circle cx="0" cy="0" r="24" fill="#FBBF24" />
      </g>
      <g transform="translate(710, 690)"> <!-- Tiger -->
        <circle cx="0" cy="0" r="30" fill="#EA580C" />
        <ellipse cx="0" cy="40" rx="20" ry="30" fill="#D97706" stroke="#000" stroke-width="2" />
      </g>
      <g transform="translate(860, 680)"> <!-- Giraffe / Zebra -->
        <circle cx="0" cy="-30" r="22" fill="#FDE047" />
        <rect x="-10" y="-10" width="20" height="80" fill="#CA8A04" />
      </g>

      <!-- Wooden Picket Fence -->
      <g fill="#D97706" stroke="#78350F" stroke-width="2">
        <rect x="150" y="850" width="16" height="100" />
        <rect x="180" y="850" width="16" height="100" />
        <rect x="210" y="850" width="16" height="100" />
        <line x1="140" y1="880" x2="230" y2="880" stroke="#78350F" stroke-width="8" />

        <rect x="850" y="850" width="16" height="100" />
        <rect x="880" y="850" width="16" height="100" />
        <rect x="910" y="850" width="16" height="100" />
        <line x1="840" y1="880" x2="930" y2="880" stroke="#78350F" stroke-width="8" />
      </g>

      <!-- Illuminated Marquee "HBD ANVI" Letters -->
      <text x="500" y="930" text-anchor="middle" font-family="sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" stroke="#FDE047" stroke-width="3" letter-spacing="8">HBD ANVI</text>
    `
  }
];

async function generateAll() {
  console.log('Generating 8 Our Works images in WebP and PNG...');

  for (const item of worksData) {
    const fullSvg = `
      <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5" />
          </filter>
        </defs>
        ${item.svg}
        <!-- Decorative Border Frame -->
        <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="none" stroke="#DFB76C" stroke-width="12" />
        <rect x="12" y="12" width="${WIDTH - 24}" height="${HEIGHT - 24}" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.4" />
      </svg>
    `;

    const svgBuf = Buffer.from(fullSvg);
    const webpPath = path.join(OUT_DIR, `${item.id}.webp`);
    const pngPath = path.join(OUT_DIR, `${item.id}.png`);

    // 1. WebP
    const webpBuf = await sharp(svgBuf)
      .resize(WIDTH, HEIGHT)
      .webp({ quality: 90, effort: 5 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuf);

    // 2. PNG
    const pngBuf = await sharp(svgBuf)
      .resize(WIDTH, HEIGHT)
      .png({ compressionLevel: 8 })
      .toBuffer();
    fs.writeFileSync(pngPath, pngBuf);

    console.log(`✓ ${item.id}: ${(webpBuf.length / 1024).toFixed(0)} KB WebP, ${(pngBuf.length / 1024).toFixed(0)} KB PNG`);
  }

  console.log('All 8 Our Works images generated successfully!');
}

generateAll().catch(console.error);
