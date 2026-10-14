const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const WIDTH = 1200;
const HEIGHT = 675;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Evening Sky Gradient -->
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

    <!-- Golden Pillars Gradient -->
    <linearGradient id="goldPillar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5C4018" />
      <stop offset="25%" stop-color="#B8860B" />
      <stop offset="50%" stop-color="#F3E5AB" />
      <stop offset="75%" stop-color="#DAA520" />
      <stop offset="100%" stop-color="#4A3412" />
    </linearGradient>

    <!-- Brass Lamp & Vessels Gradient -->
    <linearGradient id="brassGold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7B591A" />
      <stop offset="35%" stop-color="#DFB76C" />
      <stop offset="65%" stop-color="#FFF2B2" />
      <stop offset="100%" stop-color="#8C6420" />
    </linearGradient>

    <!-- Copper Kalasam Gradient -->
    <linearGradient id="copperGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#803518" />
      <stop offset="30%" stop-color="#C25E35" />
      <stop offset="60%" stop-color="#F29368" />
      <stop offset="100%" stop-color="#6E2B10" />
    </linearGradient>

    <!-- Sacred Agni Fire Glow -->
    <radialGradient id="fireCore" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="25%" stop-color="#FFF066" />
      <stop offset="60%" stop-color="#FF7A00" />
      <stop offset="85%" stop-color="#E52E00" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#FF3700" stop-opacity="0" />
    </radialGradient>

    <!-- Flame Aura Filter -->
    <radialGradient id="fireAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE875" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#FF8A00" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#FF5100" stop-opacity="0" />
    </radialGradient>

    <!-- Spotlight Beam -->
    <linearGradient id="spotlightBeam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF8DC" stop-opacity="0.65" />
      <stop offset="40%" stop-color="#FFEAA7" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#FFEAA7" stop-opacity="0" />
    </linearGradient>

    <!-- Woven Mat Pattern -->
    <linearGradient id="reedMat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9C8255" />
      <stop offset="50%" stop-color="#B8A072" />
      <stop offset="100%" stop-color="#8C7043" />
    </linearGradient>

    <!-- Earthen Homam Kund Pot Gradient -->
    <linearGradient id="earthenPot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#A74D26" />
      <stop offset="40%" stop-color="#BD5B2F" />
      <stop offset="80%" stop-color="#863A18" />
      <stop offset="100%" stop-color="#63260C" />
    </linearGradient>
  </defs>

  <!-- 1. BACKDROP & SKY -->
  <rect width="100%" height="100%" fill="url(#skyGrad)" />
  <path d="M0 260 Q 300 240 600 255 T 1200 250 L 1200 380 L 0 380 Z" fill="#202A38" opacity="0.45" />

  <!-- 2. STAGE PLATFORM & FLOOR -->
  <polygon points="0,380 1200,380 1200,675 0,675" fill="url(#stageFloor)" />
  <!-- Stage Front Golden Edge -->
  <rect x="0" y="660" width="1200" height="15" fill="#DAA520" />
  <rect x="0" y="663" width="1200" height="4" fill="#FFF2B2" />

  <!-- 3. MANDAPAM GOLDEN PILLARS & ARCHITECTURE -->
  <!-- Left Outer Pillar -->
  <g id="leftPillarGroup">
    <rect x="60" y="90" width="110" height="340" fill="url(#goldPillar)" rx="4" />
    <rect x="40" y="70" width="150" height="25" fill="url(#goldPillar)" rx="2" />
    <rect x="50" y="420" width="130" height="30" fill="url(#goldPillar)" rx="2" />
    <line x1="85" y1="95" x2="85" y2="420" stroke="#FFE59E" stroke-width="2" opacity="0.6" />
    <line x1="115" y1="95" x2="115" y2="420" stroke="#FFE59E" stroke-width="3" opacity="0.8" />
    <line x1="145" y1="95" x2="145" y2="420" stroke="#5C4018" stroke-width="2" opacity="0.7" />
  </g>

  <!-- Left Inner Pillar -->
  <g id="leftInnerPillar">
    <rect x="220" y="120" width="70" height="310" fill="url(#goldPillar)" rx="3" />
    <rect x="210" y="105" width="90" height="18" fill="url(#goldPillar)" />
    <!-- Plantain Tree Trunk & Green Banana Leaves tied to Pillar -->
    <path d="M255,100 Q 200,60 170,95 Q 220,120 255,100" fill="#15803D" stroke="#166534" stroke-width="1.5" />
    <path d="M260,110 Q 310,70 340,105 Q 290,130 260,110" fill="#22C55E" stroke="#15803D" stroke-width="1.5" />
    <rect x="250" y="105" width="10" height="280" fill="#65A30D" opacity="0.9" rx="3" />
  </g>

  <!-- Right Inner Pillar -->
  <g id="rightInnerPillar">
    <rect x="910" y="120" width="70" height="310" fill="url(#goldPillar)" rx="3" />
    <rect x="900" y="105" width="90" height="18" fill="url(#goldPillar)" />
    <!-- Banana Leaves tied to Right Pillar -->
    <path d="M945,100 Q 890,60 860,95 Q 910,120 945,100" fill="#15803D" stroke="#166534" stroke-width="1.5" />
    <path d="M950,110 Q 1000,70 1030,105 Q 980,130 950,110" fill="#22C55E" stroke="#15803D" stroke-width="1.5" />
    <rect x="940" y="105" width="10" height="280" fill="#65A30D" opacity="0.9" rx="3" />
  </g>

  <!-- Right Outer Pillar -->
  <g id="rightPillarGroup">
    <rect x="1030" y="90" width="110" height="340" fill="url(#goldPillar)" rx="4" />
    <rect x="1010" y="70" width="150" height="25" fill="url(#goldPillar)" rx="2" />
    <rect x="1020" y="420" width="130" height="30" fill="url(#goldPillar)" rx="2" />
    <line x1="1055" y1="95" x2="1055" y2="420" stroke="#FFE59E" stroke-width="2" opacity="0.6" />
    <line x1="1085" y1="95" x2="1085" y2="420" stroke="#FFE59E" stroke-width="3" opacity="0.8" />
    <line x1="1115" y1="95" x2="1115" y2="420" stroke="#5C4018" stroke-width="2" opacity="0.7" />
  </g>

  <!-- Grand Cross Archway Beam at Top -->
  <rect x="40" y="75" width="1120" height="30" fill="url(#goldPillar)" rx="2" />
  <rect x="60" y="80" width="1080" height="8" fill="#FFF2B2" opacity="0.6" />

  <!-- 4. FLORAL GARLANDS & DRAPES (TORANS) -->
  <!-- Top Marigold & Jasmine Swags -->
  <path d="M60 90 Q 200 170 340 100 Q 480 180 600 100 Q 720 180 860 100 Q 1000 170 1140 90" 
        fill="none" stroke="#F59E0B" stroke-width="18" stroke-linecap="round" />
  <path d="M60 90 Q 200 170 340 100 Q 480 180 600 100 Q 720 180 860 100 Q 1000 170 1140 90" 
        fill="none" stroke="#DC2626" stroke-width="8" stroke-dasharray="14 10" />
  <path d="M60 90 Q 200 170 340 100 Q 480 180 600 100 Q 720 180 860 100 Q 1000 170 1140 90" 
        fill="none" stroke="#FEF08A" stroke-width="4" stroke-dasharray="8 8" />

  <!-- Central Deep U-Shaped Floral Garland behind Priest -->
  <path d="M420 105 Q 600 240 780 105" fill="none" stroke="#F97316" stroke-width="14" />
  <path d="M420 105 Q 600 240 780 105" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="10 8" />
  <path d="M440 115 Q 600 230 760 115" fill="none" stroke="#DC2626" stroke-width="4" />

  <!-- 5. STAGE SPOTLIGHT FIXTURES & GLOWING BEAMS -->
  <g id="spotlights">
    <circle cx="170" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="260" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="350" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="850" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="940" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />
    <circle cx="1030" cy="45" r="16" fill="#FFF2B2" stroke="#DAA520" stroke-width="4" />

    <!-- Warm Beams of Light Shining directly onto the Homam altar & Aiyar -->
    <polygon points="600,0 420,600 780,600" fill="url(#spotlightBeam)" opacity="0.85" />
    <polygon points="170,45 80,600 380,600" fill="url(#spotlightBeam)" opacity="0.5" />
    <polygon points="1030,45 820,600 1120,600" fill="url(#spotlightBeam)" opacity="0.5" />
  </g>

  <!-- 6. WOVEN STRAW REED MAT (PAAI) -->
  <polygon points="120,640 1080,640 1020,440 180,440" fill="url(#reedMat)" stroke="#6B532F" stroke-width="2" />
  <line x1="140" y1="460" x2="100" y2="620" stroke="#991B1B" stroke-width="8" />
  <line x1="160" y1="460" x2="120" y2="620" stroke="#1E40AF" stroke-width="6" />
  <line x1="1040" y1="460" x2="1080" y2="620" stroke="#991B1B" stroke-width="8" />
  <line x1="1020" y1="460" x2="1060" y2="620" stroke="#1E40AF" stroke-width="6" />

  <!-- 7. SEATED GENTLEMEN ATTENDEES (LEFT & RIGHT) -->
  <!-- Left Attendee (Olive Green Shirt) -->
  <g id="leftAttendee" transform="translate(310, 420)">
    <circle cx="0" cy="-60" r="30" fill="#784E2D" />
    <path d="M-20,-85 Q 0,-96 20,-85 Q 25,-65 20,-48 Q 0,-50 -20,-48 Z" fill="#18181B" />
    <!-- Moustache -->
    <path d="M-10,-42 Q 0,-38 12,-42 Q 0,-34 -10,-38 Z" fill="#09090B" />
    <path d="M-45,-25 C -40,-45 -25,-48 0,-48 C 25,-48 40,-45 45,-25 L 50,70 L -50,70 Z" fill="#3F5234" />
    <!-- Seated Veshti Dhoti -->
    <ellipse cx="0" cy="90" rx="65" ry="24" fill="#F4F4F5" />
    <path d="M-65,90 Q 0,114 65,90" fill="none" stroke="#DFB76C" stroke-width="5" />
  </g>

  <!-- Background Center-Right Attendee (Green Shirt) -->
  <g id="backAttendee" transform="translate(710, 430)">
    <circle cx="0" cy="-55" r="26" fill="#754826" />
    <path d="M-16,-78 Q 0,-88 16,-78 Q 20,-60 16,-45 Q 0,-48 -16,-45 Z" fill="#18181B" />
    <path d="M-38,-20 C -35,-38 -20,-42 0,-42 C 20,-42 35,-38 38,-20 L 42,60 L -42,60 Z" fill="#35482B" />
    <ellipse cx="0" cy="75" rx="55" ry="18" fill="#F4F4F5" />
  </g>

  <!-- Right Attendee 1 (Younger Gentleman in Maroon Shirt) -->
  <g id="rightAttendee1" transform="translate(850, 435)">
    <circle cx="0" cy="-55" r="26" fill="#734A29" />
    <path d="M-16,-78 Q 0,-88 16,-78 Q 20,-60 16,-45 Q 0,-48 -16,-45 Z" fill="#18181B" />
    <path d="M-40,-20 C -35,-40 -20,-44 0,-44 C 20,-44 35,-40 40,-20 L 45,65 L -45,65 Z" fill="#7F1D1D" />
    <ellipse cx="0" cy="80" rx="55" ry="20" fill="#F4F4F5" />
    <path d="M-55,80 Q 0,100 55,80" fill="none" stroke="#DFB76C" stroke-width="4" />
  </g>

  <!-- Right Attendee 2 (Senior Gentleman in Maroon Silk Shirt) -->
  <g id="rightAttendee2" transform="translate(970, 425)">
    <circle cx="0" cy="-60" r="32" fill="#7D4F2C" />
    <path d="M-22,-86 Q 0,-98 22,-86 Q 26,-66 22,-50 Q 0,-52 -22,-50 Z" fill="#18181B" />
    <path d="M-12,-44 Q 0,-40 14,-44 Q 0,-36 -12,-40 Z" fill="#09090B" />
    <path d="M-48,-25 C -42,-45 -25,-48 0,-48 C 25,-48 42,-45 48,-25 L 55,75 L -55,75 Z" fill="#881337" />
    <ellipse cx="0" cy="95" rx="70" ry="26" fill="#F4F4F5" />
    <path d="M-70,95 Q 0,121 70,95" fill="none" stroke="#DFB76C" stroke-width="6" />
  </g>

  <!-- 8. CENTRAL REVERED VEDIC AIYAR / PUROHIT PRIEST -->
  <g id="aiyarPriest" transform="translate(560, 375)">
    <!-- Bare Chested Torso -->
    <path d="M-55,20 C -55,-10 -35,-15 0,-15 C 35,-15 55,-10 55,20 L 60,110 L -60,110 Z" fill="#9A6945" />

    <!-- Sacred Poonal (Yajnopavita) Sacred Thread across Left Shoulder to Right Waist -->
    <path d="M-30,-12 Q 5,45 45,110" stroke="#FFFDF5" stroke-width="3" fill="none" />
    <path d="M-32,-10 Q 3,47 43,112" stroke="#FFFDF5" stroke-width="1.5" fill="none" opacity="0.8" />

    <!-- Sacred Rudraksha and Crystal Malas around Neck -->
    <path d="M-22,0 Q 0,42 22,0" stroke="#713F12" stroke-width="5" stroke-dasharray="4 2" fill="none" />
    <path d="M-26,-4 Q 0,55 26,-4" stroke="#D97706" stroke-width="4" stroke-dasharray="3 3" fill="none" />
    <circle cx="0" cy="55" r="4" fill="#B45309" />

    <!-- Sacred Vibhuti (Tripundra) Holy Ash Stripes across Chest & Arms -->
    <line x1="-30" y1="25" x2="30" y2="25" stroke="#F4F4F5" stroke-width="2.5" opacity="0.9" />
    <line x1="-30" y1="29" x2="30" y2="29" stroke="#F4F4F5" stroke-width="2.5" opacity="0.9" />
    <line x1="-30" y1="33" x2="30" y2="33" stroke="#F4F4F5" stroke-width="2.5" opacity="0.9" />
    <circle cx="0" cy="29" r="2.5" fill="#DC2626" />

    <line x1="-50" y1="45" x2="-35" y2="45" stroke="#F4F4F5" stroke-width="2" />
    <line x1="35" y1="45" x2="50" y2="45" stroke="#F4F4F5" stroke-width="2" />

    <!-- Head & Serene Devotional Expression -->
    <circle cx="0" cy="-60" r="38" fill="#9A6945" />
    <!-- Grey / White Receding Hair & Shaved Kudumi style hairline -->
    <path d="M-28,-86 Q 0,-100 28,-86 Q 32,-65 28,-50 Q 0,-52 -28,-50 Z" fill="#D4D4D8" />
    <!-- Forehead Tripundra (Three Sacred White Vibhuti Stripes) -->
    <line x1="-16" y1="-76" x2="16" y2="-76" stroke="#FFFFFF" stroke-width="3" />
    <line x1="-16" y1="-71" x2="16" y2="-71" stroke="#FFFFFF" stroke-width="3" />
    <line x1="-16" y1="-66" x2="16" y2="-66" stroke="#FFFFFF" stroke-width="3" />
    <!-- Red Kumkum Bindu in Center -->
    <circle cx="0" cy="-71" r="3.5" fill="#DC2626" />

    <!-- Face Details: Serene Eyes looking down at Sacred Agni -->
    <path d="M-15,-56 Q -10,-52 -5,-56" stroke="#451A03" stroke-width="2" fill="none" />
    <path d="M5,-56 Q 10,-52 15,-56" stroke="#451A03" stroke-width="2" fill="none" />
    <path d="M-2,-56 L 0,-48 L 4,-48" stroke="#451A03" stroke-width="1.8" fill="none" />
    <path d="M-8,-40 Q 0,-36 8,-40" stroke="#451A03" stroke-width="2" fill="none" />
    <!-- Gentle Grey Beard / Stubble -->
    <path d="M-15,-40 Q 0,-28 15,-40" stroke="#E4E4E7" stroke-width="2.5" fill="none" opacity="0.8" />

    <!-- Seated Padmasana Legs in White Veshti Dhoti -->
    <ellipse cx="0" cy="130" rx="130" ry="36" fill="#FAF5E8" stroke="#E5E7EB" stroke-width="1.5" />
    <path d="M-130,130 Q 0,166 130,130" fill="none" stroke="#DFB76C" stroke-width="8" />
    <path d="M-120,132 Q 0,164 120,132" fill="none" stroke="#991B1B" stroke-width="2" />
    <!-- Bare Feet crossed on Mat -->
    <ellipse cx="-45" cy="155" rx="18" ry="10" fill="#9A6945" />
    <ellipse cx="50" cy="150" rx="18" ry="10" fill="#9A6945" />

    <!-- Left Arm Resting on Knee / Thigh -->
    <path d="M-45,30 Q -75,80 -50,115" stroke="#9A6945" stroke-width="20" stroke-linecap="round" fill="none" />

    <!-- Right Arm Extending with Brass Ghee Ladle (Sruk / Udharani) into Agni -->
    <path d="M45,25 Q 10,75 -35,80" stroke="#9A6945" stroke-width="20" stroke-linecap="round" fill="none" />
    <!-- Hand holding Ladle -->
    <circle cx="-38" cy="80" r="10" fill="#9A6945" />
    <!-- Long Brass Ritual Ladle with Ghee Pouring -->
    <line x1="-38" y1="80" x2="-58" y2="105" stroke="#FFE59E" stroke-width="5" stroke-linecap="round" />
    <!-- Bowl of Ladle -->
    <ellipse cx="-60" cy="107" rx="9" ry="6" fill="#DFB76C" stroke="#B8860B" stroke-width="1.5" />
    <!-- Stream of Golden Ghee Offering into Agni -->
    <path d="M-60,110 Q -56,128 -52,145" stroke="#FDE047" stroke-width="3" fill="none" />
  </g>

  <!-- 9. SACRED AGNI HOMAM POT & BLAZING FIRE -->
  <g id="homamPot" transform="translate(510, 525)">
    <!-- Fire Aura Glow -->
    <circle cx="0" cy="-30" r="75" fill="url(#fireAura)" />

    <!-- Dancing Sacred Agni Flames leaping upwards -->
    <path d="M-25,0 Q -40,-45 -15,-75 Q 0,-50 10,-85 Q 25,-40 30,-20 Q 15,-10 0,-15 Z" fill="url(#fireCore)" />
    <path d="M-15,-10 Q -25,-55 0,-95 Q 15,-65 20,-30 Z" fill="#FFFBEB" opacity="0.9" />
    <path d="M-5,-15 Q -10,-60 5,-105 Q 12,-70 5,-20 Z" fill="#FFFFFF" />

    <!-- Golden & Orange Embers / Sparkles -->
    <circle cx="-12" cy="-65" r="2.5" fill="#FEF08A" />
    <circle cx="18" cy="-75" r="2" fill="#FEF08A" />
    <circle cx="2" cy="-90" r="2" fill="#FFFFFF" />

    <!-- The Earthen Homam Kund Pot (Ghatam) -->
    <ellipse cx="0" cy="30" rx="48" ry="32" fill="url(#earthenPot)" stroke="#431407" stroke-width="2" />
    <ellipse cx="0" cy="5" rx="36" ry="12" fill="#2E1005" stroke="#A74D26" stroke-width="2" />

    <!-- Painted Traditional Geometric Chevrons / Kolam on Pot -->
    <path d="M-36,25 L -26,38 L -16,25 L -6,38 L 4,25 L 14,38 L 24,25 L 34,38" 
          stroke="#FEF08A" stroke-width="3" fill="none" stroke-linecap="round" />

    <!-- Auspicious Yellow-Orange Fresh Marigold Garland wrapped around Pot -->
    <ellipse cx="0" cy="8" rx="44" ry="14" fill="none" stroke="#F59E0B" stroke-width="12" />
    <ellipse cx="0" cy="8" rx="44" ry="14" fill="none" stroke="#DC2626" stroke-width="5" stroke-dasharray="10 8" />
    <ellipse cx="0" cy="8" rx="44" ry="14" fill="none" stroke="#FEF08A" stroke-width="3" stroke-dasharray="6 6" />

    <!-- Earthen Pot Saucer Base -->
    <ellipse cx="0" cy="50" rx="55" ry="14" fill="#78350F" stroke="#451A03" stroke-width="2" />
  </g>

  <!-- 10. SACRED POORNA KUMBHAM / COPPER KALASAM WITH COCONUT & MANGO LEAVES -->
  <g id="kalasamGroup" transform="translate(290, 560)">
    <!-- Shiny Copper Kalasam Pot -->
    <ellipse cx="0" cy="30" rx="38" ry="26" fill="url(#copperGrad)" stroke="#5A200B" stroke-width="2" />
    <path d="M-22,10 L -18,-5 L 18,-5 L 22,10 Z" fill="url(#copperGrad)" stroke="#5A200B" stroke-width="1.5" />

    <!-- Sacred Mango Leaves (Maavilai) fanning out from rim -->
    <path d="M-18,-5 Q -38,-30 -42,-45 Q -25,-35 -14,-10" fill="#15803D" stroke="#166534" stroke-width="1" />
    <path d="M18,-5 Q 38,-30 42,-45 Q 25,-35 14,-10" fill="#15803D" stroke="#166534" stroke-width="1" />
    <path d="M-8,-5 Q -15,-40 -12,-55 Q -2,-40 0,-10" fill="#22C55E" stroke="#15803D" stroke-width="1" />
    <path d="M8,-5 Q 15,-40 12,-55 Q 2,-40 0,-10" fill="#22C55E" stroke="#15803D" stroke-width="1" />

    <!-- Husked Brown Coconut (Thengai) on top with tuft facing up -->
    <circle cx="0" cy="-35" r="24" fill="#78350F" stroke="#451A03" stroke-width="2" />
    <!-- White Vibhuti & Kumkum on Coconut -->
    <line x1="-12" y1="-38" x2="12" y2="-38" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="0" cy="-38" r="3" fill="#DC2626" />
    <!-- Coconut Fiber Tuft -->
    <path d="M-6,-58 L 0,-70 L 6,-58 Z" fill="#592808" />

    <!-- Sacred Raksha Thread wrapped around Kalasam -->
    <ellipse cx="0" cy="25" rx="36" ry="12" fill="none" stroke="#FDE047" stroke-width="2.5" stroke-dasharray="8 4" />
  </g>

  <!-- 11. PUJA OFFERINGS & BRASS PLATES ON THE MAT -->
  <!-- Brass Cup with Sacred Ghee / Panchapatram -->
  <g id="gheeCup" transform="translate(375, 595)">
    <ellipse cx="0" cy="15" rx="16" ry="10" fill="url(#brassGold)" stroke="#8C6420" stroke-width="1.5" />
    <path d="M-14,0 L -12,15 L 12,15 L 14,0 Z" fill="url(#brassGold)" />
    <ellipse cx="0" cy="0" rx="14" ry="5" fill="#FDE047" />
  </g>

  <!-- Brass Puja Plate with Kumkum, Chandanam & Betel Leaves -->
  <g id="poojaPlate1" transform="translate(425, 610)">
    <ellipse cx="0" cy="10" rx="42" ry="16" fill="url(#brassGold)" stroke="#8C6420" stroke-width="2" />
    <!-- Red Kumkum heap -->
    <circle cx="-16" cy="8" r="9" fill="#DC2626" />
    <!-- Sandalwood Chandanam paste -->
    <circle cx="0" cy="6" r="9" fill="#FDE047" stroke="#CA8A04" stroke-width="1" />
    <!-- Fresh Green Betel Leaves (Vetrilai) -->
    <path d="M12,4 Q 28,-4 30,12 Q 18,16 12,4" fill="#15803D" stroke="#166534" stroke-width="1" />
  </g>

  <!-- Brass Fruit Offering Plate (Bananas, Red Apples & Citrus) -->
  <g id="fruitPlate" transform="translate(670, 615)">
    <ellipse cx="0" cy="10" rx="55" ry="18" fill="url(#brassGold)" stroke="#8C6420" stroke-width="2" />
    <!-- Yellow Bananas Cluster -->
    <path d="M-35,6 Q -15,-14 5,6 Q -15,0 -35,6 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
    <path d="M-25,2 Q -8,-18 12,2 Q -8,-6 -25,2 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
    <!-- Red Kashmiri Apples -->
    <circle cx="15" cy="4" r="14" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
    <circle cx="35" cy="6" r="13" fill="#E11D48" stroke="#9F1239" stroke-width="1.5" />
    <!-- Green Citrus / Mosambi -->
    <circle cx="-5" cy="8" r="11" fill="#84CC16" stroke="#4D7C0F" stroke-width="1" />
  </g>

  <!-- Woven Cane Puja Basket on Left (Coconuts & Flowers) -->
  <g id="pujaBasket" transform="translate(85, 570)">
    <ellipse cx="0" cy="50" rx="75" ry="24" fill="#A16207" stroke="#78350F" stroke-width="3" />
    <ellipse cx="0" cy="46" rx="70" ry="20" fill="#B45309" />
    <path d="M-40,35 Q -20,10 0,35 Q -20,25 -40,35 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
    <circle cx="25" cy="35" r="16" fill="#713F12" stroke="#451A03" stroke-width="2" />
    <circle cx="25" cy="35" r="11" fill="#FFFFFF" />
    <path d="M-15,45 Q 0,20 15,45 Z" fill="#15803D" stroke="#166534" stroke-width="1" />
    <circle cx="-50" cy="48" r="7" fill="#DC2626" />
    <circle cx="50" cy="46" r="8" fill="#F97316" />
  </g>

  <!-- 12. TALL BRASS TRADITIONAL KUTHUVILAKKU OIL LAMPS (LEFT & RIGHT) -->
  <!-- Left Lamp -->
  <g id="leftLamp" transform="translate(180, 360)">
    <ellipse cx="0" cy="220" rx="35" ry="12" fill="url(#brassGold)" stroke="#8C6420" stroke-width="1.5" />
    <path d="M-25,220 Q 0,200 25,220" fill="#DFB76C" />
    <rect x="-6" y="50" width="12" height="160" fill="url(#brassGold)" />
    <circle cx="0" cy="160" r="14" fill="url(#brassGold)" />
    <circle cx="0" cy="110" r="16" fill="url(#brassGold)" />
    <ellipse cx="0" cy="50" rx="45" ry="12" fill="url(#brassGold)" stroke="#8C6420" stroke-width="2" />
    <path d="M0,50 L 0,-15 Q 12,-35 0,-45 Q -12,-35 0,-15 Z" fill="url(#brassGold)" />
    <!-- Glowing Flames -->
    <circle cx="-35" cy="46" r="10" fill="#FFF" />
    <circle cx="-35" cy="46" r="14" fill="#FFAE19" opacity="0.6" />
    <circle cx="-18" cy="48" r="12" fill="#FFAE19" opacity="0.7" />
    <circle cx="0" cy="49" r="15" fill="#FFAE19" opacity="0.8" />
    <circle cx="18" cy="48" r="12" fill="#FFAE19" opacity="0.7" />
    <circle cx="35" cy="46" r="10" fill="#FFF" />
    <circle cx="35" cy="46" r="14" fill="#FFAE19" opacity="0.6" />
    <circle cx="0" cy="45" r="50" fill="#FEF08A" opacity="0.15" />
  </g>

  <!-- Right Lamp -->
  <g id="rightLamp" transform="translate(1120, 360)">
    <ellipse cx="0" cy="220" rx="35" ry="12" fill="url(#brassGold)" stroke="#8C6420" stroke-width="1.5" />
    <path d="M-25,220 Q 0,200 25,220" fill="#DFB76C" />
    <rect x="-6" y="50" width="12" height="160" fill="url(#brassGold)" />
    <circle cx="0" cy="160" r="14" fill="url(#brassGold)" />
    <circle cx="0" cy="110" r="16" fill="url(#brassGold)" />
    <ellipse cx="0" cy="50" rx="45" ry="12" fill="url(#brassGold)" stroke="#8C6420" stroke-width="2" />
    <path d="M0,50 L 0,-15 Q 12,-35 0,-45 Q -12,-35 0,-15 Z" fill="url(#brassGold)" />
    <!-- Glowing Flames -->
    <circle cx="-35" cy="46" r="10" fill="#FFF" />
    <circle cx="-35" cy="46" r="14" fill="#FFAE19" opacity="0.6" />
    <circle cx="-18" cy="48" r="12" fill="#FFAE19" opacity="0.7" />
    <circle cx="0" cy="49" r="15" fill="#FFAE19" opacity="0.8" />
    <circle cx="18" cy="48" r="12" fill="#FFAE19" opacity="0.7" />
    <circle cx="35" cy="46" r="10" fill="#FFF" />
    <circle cx="35" cy="46" r="14" fill="#FFAE19" opacity="0.6" />
    <circle cx="0" cy="45" r="50" fill="#FEF08A" opacity="0.15" />
  </g>

  <!-- 13. VIGNETTE & GOLD BORDER -->
  <rect width="100%" height="100%" fill="none" stroke="#DFB76C" stroke-width="6" opacity="0.4" />
</svg>
`;

async function generate() {
  console.log('Generating Aiyar image matching W.jpeg...');

  const svgBuffer = Buffer.from(svg);
  const webpPath = path.join(IMAGES_DIR, 'aiyar.webp');
  const pngPath = path.join(IMAGES_DIR, 'aiyar.png');

  // 1. Generate WebP
  const webpBuf = await sharp(svgBuffer)
    .resize(WIDTH, HEIGHT)
    .webp({ quality: 92, effort: 5 })
    .toBuffer();
  fs.writeFileSync(webpPath, webpBuf);

  // 2. Generate PNG fallback
  const pngBuf = await sharp(svgBuffer)
    .resize(WIDTH, HEIGHT)
    .png({ compressionLevel: 9, effort: 7, palette: true })
    .toBuffer();
  fs.writeFileSync(pngPath, pngBuf);

  console.log(`✓ aiyar.webp generated (${(webpBuf.length / 1024).toFixed(0)} KB)`);
  console.log(`✓ aiyar.png generated (${(pngBuf.length / 1024).toFixed(0)} KB)`);
}

generate().catch(console.error);
