const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const awardSvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#040914" />
      <stop offset="40%" stop-color="#0A1428" />
      <stop offset="75%" stop-color="#0F1E3D" />
      <stop offset="100%" stop-color="#050A14" />
    </linearGradient>

    <!-- Stage Floor Gradient -->
    <linearGradient id="stageFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4A0E17" />
      <stop offset="30%" stop-color="#7B1424" />
      <stop offset="70%" stop-color="#580E1B" />
      <stop offset="100%" stop-color="#24050A" />
    </linearGradient>

    <!-- Gold Gradients -->
    <linearGradient id="goldGrad1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE8A3" />
      <stop offset="25%" stop-color="#DFB76C" />
      <stop offset="50%" stop-color="#B8860B" />
      <stop offset="75%" stop-color="#F5D77F" />
      <stop offset="100%" stop-color="#8C6208" />
    </linearGradient>

    <linearGradient id="goldSheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF5D6" />
      <stop offset="50%" stop-color="#DFB76C" />
      <stop offset="100%" stop-color="#996515" />
    </linearGradient>

    <!-- Spotlight Cones -->
    <radialGradient id="spotCenter" cx="50%" cy="10%" r="60%">
      <stop offset="0%" stop-color="#DFB76C" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#DFB76C" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#000" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="leftBeam" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="#FFE8A3" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#DFB76C" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="rightBeam" x1="1" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#FFE8A3" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#DFB76C" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000" stop-opacity="0" />
    </linearGradient>

    <!-- Gold Glow Filter -->
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- 1. Background Stage Wall -->
  <rect width="1200" height="800" fill="url(#bgGrad)" />

  <!-- Backdrop Lighting Beams -->
  <polygon points="100,0 250,0 450,560 200,560" fill="url(#leftBeam)" />
  <polygon points="1100,0 950,0 750,560 1000,560" fill="url(#rightBeam)" />
  <circle cx="600" cy="200" r="450" fill="url(#spotCenter)" />

  <!-- Stage Truss Lighting Rig at Top -->
  <rect x="50" y="15" width="1100" height="12" rx="3" fill="#1E293B" stroke="#475569" stroke-width="1.5" />
  <g stroke="#DFB76C" stroke-width="1" opacity="0.6">
    <line x1="80" y1="15" x2="95" y2="27" />
    <line x1="95" y1="15" x2="80" y2="27" />
    <line x1="150" y1="15" x2="165" y2="27" />
    <line x1="165" y1="15" x2="150" y2="27" />
    <line x1="300" y1="15" x2="315" y2="27" />
    <line x1="315" y1="15" x2="300" y2="27" />
    <line x1="600" y1="15" x2="615" y2="27" />
    <line x1="615" y1="15" x2="600" y2="27" />
    <line x1="900" y1="15" x2="915" y2="27" />
    <line x1="915" y1="15" x2="900" y2="27" />
    <line x1="1050" y1="15" x2="1065" y2="27" />
    <line x1="1065" y1="15" x2="1050" y2="27" />
  </g>
  <!-- Spotlights on Truss -->
  <circle cx="120" cy="30" r="8" fill="#DFB76C" filter="url(#goldGlow)" />
  <circle cx="350" cy="30" r="8" fill="#FFE8A3" filter="url(#goldGlow)" />
  <circle cx="600" cy="30" r="10" fill="#FFF5D6" filter="url(#goldGlow)" />
  <circle cx="850" cy="30" r="8" fill="#FFE8A3" filter="url(#goldGlow)" />
  <circle cx="1080" cy="30" r="8" fill="#DFB76C" filter="url(#goldGlow)" />

  <!-- 2. Grand Awards Ceremony Stage Backdrop Frame -->
  <g transform="translate(150, 60)" filter="url(#softShadow)">
    <!-- Outer Golden Arch Frame -->
    <rect x="0" y="0" width="900" height="490" rx="24" fill="#071124" stroke="url(#goldGrad1)" stroke-width="4" />
    <rect x="12" y="12" width="876" height="466" rx="18" fill="none" stroke="#DFB76C" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.7" />

    <!-- Corner Gold Flourishes -->
    <path d="M 30 50 L 50 30 L 90 30 M 30 50 L 30 90" stroke="url(#goldGrad1)" stroke-width="2.5" fill="none" />
    <path d="M 870 50 L 850 30 L 810 30 M 870 50 L 870 90" stroke="url(#goldGrad1)" stroke-width="2.5" fill="none" />
    <path d="M 30 440 L 50 460 L 90 460 M 30 440 L 30 400" stroke="url(#goldGrad1)" stroke-width="2.5" fill="none" />
    <path d="M 870 440 L 850 460 L 810 460 M 870 440 L 870 400" stroke="url(#goldGrad1)" stroke-width="2.5" fill="none" />

    <!-- Top Ribbon / Crown Emblem -->
    <g transform="translate(450, 48)">
      <circle cx="0" cy="0" r="32" fill="#0B1A36" stroke="url(#goldGrad1)" stroke-width="3" filter="url(#goldGlow)" />
      <!-- Laurel Wreath in Center -->
      <path d="M -18 8 C -24 -6 -16 -20 0 -22 C 16 -20 24 -6 18 8" stroke="url(#goldSheen)" stroke-width="2.5" fill="none" />
      <polygon points="0,-16 4,-6 14,-6 6,0 10,10 0,4 -10,10 -6,0 -14,-6 -4,-6" fill="url(#goldSheen)" />
    </g>

    <!-- Stage Banner Typography -->
    <text x="450" y="112" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="14" font-weight="700" fill="#DFB76C" letter-spacing="4">
      ★ SOUTH INDIA EXCELLENCE FELICITATION &amp; AWARDS ★
    </text>

    <text x="450" y="146" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="28" font-weight="900" fill="#FFFFFF" letter-spacing="2" filter="url(#softShadow)">
      CERTIFIED EVENT MANAGEMENT PROFESSIONAL
    </text>

    <!-- Government Registered Badge Pill -->
    <g transform="translate(450, 185)">
      <rect x="-210" y="-16" width="420" height="32" rx="16" fill="url(#goldGrad1)" stroke="#FFF5D6" stroke-width="1.5" />
      <text x="0" y="5" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="800" fill="#070D1E" letter-spacing="2">
        🏛️ GOVERNMENT REGISTERED COMPANY • MSME RECOGNIZED
      </text>
    </g>

    <!-- Certificate Card Inside Stage Screen -->
    <g transform="translate(180, 220)">
      <rect x="0" y="0" width="540" height="230" rx="14" fill="#0A1835" stroke="#DFB76C" stroke-width="1.5" opacity="0.9" />
      <rect x="6" y="6" width="528" height="218" rx="10" fill="none" stroke="#DFB76C" stroke-width="0.8" stroke-dasharray="4 3" opacity="0.5" />

      <text x="270" y="32" text-anchor="middle" font-family="'Cinzel', serif" font-size="11" font-weight="700" fill="#DFB76C" letter-spacing="2">
        HONORARY CITATION &amp; PROFESSIONAL CERTIFICATION
      </text>

      <text x="270" y="56" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="13" font-style="italic" fill="#94A3B8">
        This prestigious credential is duly conferred upon
      </text>

      <text x="270" y="92" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="26" font-weight="900" fill="url(#goldSheen)" filter="url(#goldGlow)">
        J. BALAMURUGAN
      </text>

      <text x="270" y="118" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1">
        FOUNDER &amp; MANAGING DIRECTOR — AMMAN EVENT MANAGEMENT
      </text>

      <text x="270" y="140" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#DFB76C">
        Headquartered at Vittukatti, Thiruthuraipoondi, Tiruvarur District
      </text>

      <line x1="80" y1="155" x2="460" y2="155" stroke="#DFB76C" stroke-width="1" opacity="0.4" />

      <text x="270" y="176" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="600" fill="#E2E8F0">
        "Recognized for Exemplary Execution in Luxury Wedding Stages, Ritual Orchestration &amp; Elite Hospitality"
      </text>

      <!-- Seals at bottom of certificate -->
      <g transform="translate(100, 198)">
        <circle cx="0" cy="0" r="14" fill="#DFB76C" />
        <circle cx="0" cy="0" r="12" fill="#0A1835" stroke="#DFB76C" stroke-width="1" />
        <text x="0" y="3" text-anchor="middle" font-size="7" font-weight="900" fill="#DFB76C">VERIFIED</text>
      </g>
      <text x="125" y="202" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#DFB76C">
        OFFICIAL BOARD SEAL
      </text>

      <g transform="translate(420, 198)">
        <circle cx="0" cy="0" r="14" fill="#DFB76C" />
        <circle cx="0" cy="0" r="12" fill="#0A1835" stroke="#DFB76C" stroke-width="1" />
        <text x="0" y="3" text-anchor="middle" font-size="7" font-weight="900" fill="#DFB76C">GOVT</text>
      </g>
      <text x="320" y="202" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#DFB76C">
        REGD #TN-TVR-2022
      </text>
    </g>
  </g>

  <!-- 3. Stage Floor: Gleaming Red Carpet with Reflections -->
  <polygon points="0,560 1200,560 1200,800 0,800" fill="url(#stageFloor)" />
  <line x1="0" y1="560" x2="1200" y2="560" stroke="#DFB76C" stroke-width="3" />
  <!-- Spotlight reflection sheen on floor -->
  <ellipse cx="600" cy="620" rx="350" ry="45" fill="#FFE8A3" fill-opacity="0.12" filter="url(#goldGlow)" />
  <ellipse cx="400" cy="640" rx="180" ry="25" fill="#DFB76C" fill-opacity="0.15" />
  <ellipse cx="800" cy="640" rx="180" ry="25" fill="#DFB76C" fill-opacity="0.15" />

  <!-- 4. Left Stage Decor: Traditional South Indian Brass Kuthu Vilakku with Flame -->
  <g transform="translate(90, 520)" filter="url(#softShadow)">
    <!-- Base Pedestal -->
    <ellipse cx="0" cy="180" rx="55" ry="16" fill="url(#goldGrad1)" stroke="#FFF5D6" stroke-width="1" />
    <rect x="-18" y="90" width="36" height="90" fill="url(#goldSheen)" rx="4" />
    <ellipse cx="0" cy="90" rx="42" ry="12" fill="url(#goldGrad1)" />
    <!-- Oil Bowls Tier -->
    <ellipse cx="0" cy="40" rx="48" ry="14" fill="url(#goldGrad1)" />
    <ellipse cx="0" cy="38" rx="44" ry="11" fill="#78350F" />
    <!-- Oil Wicks with Glowing Flames -->
    <ellipse cx="-35" cy="38" rx="5" ry="12" fill="#F59E0B" filter="url(#goldGlow)" />
    <circle cx="-35" cy="34" r="3" fill="#FEF08A" />
    <ellipse cx="35" cy="38" rx="5" ry="12" fill="#F59E0B" filter="url(#goldGlow)" />
    <circle cx="35" cy="34" r="3" fill="#FEF08A" />
    <ellipse cx="0" cy="38" rx="6" ry="14" fill="#F59E0B" filter="url(#goldGlow)" />
    <circle cx="0" cy="34" r="3.5" fill="#FEF08A" />
    <!-- Kalasam Pinnacle on Lamp -->
    <path d="M -12 36 L 0 5 L 12 36 Z" fill="url(#goldSheen)" />
    <circle cx="0" cy="3" r="5" fill="#FFE8A3" filter="url(#goldGlow)" />
    <!-- Garland Draped on Lamp Base -->
    <path d="M -45 100 Q 0 130 45 100" stroke="#F59E0B" stroke-width="8" stroke-dasharray="5 3" fill="none" />
    <path d="M -45 100 Q 0 130 45 100" stroke="#DC2626" stroke-width="4" stroke-dasharray="6 6" fill="none" />
    <path d="M -45 100 Q 0 130 45 100" stroke="#FEF08A" stroke-width="2" stroke-dasharray="2 4" fill="none" />
  </g>

  <!-- Right Stage Decor: Traditional South Indian Brass Kuthu Vilakku with Flame -->
  <g transform="translate(1110, 520)" filter="url(#softShadow)">
    <ellipse cx="0" cy="180" rx="55" ry="16" fill="url(#goldGrad1)" stroke="#FFF5D6" stroke-width="1" />
    <rect x="-18" y="90" width="36" height="90" fill="url(#goldSheen)" rx="4" />
    <ellipse cx="0" cy="90" rx="42" ry="12" fill="url(#goldGrad1)" />
    <ellipse cx="0" cy="40" rx="48" ry="14" fill="url(#goldGrad1)" />
    <ellipse cx="0" cy="38" rx="44" ry="11" fill="#78350F" />
    <ellipse cx="-35" cy="38" rx="5" ry="12" fill="#F59E0B" filter="url(#goldGlow)" />
    <circle cx="-35" cy="34" r="3" fill="#FEF08A" />
    <ellipse cx="35" cy="38" rx="5" ry="12" fill="#F59E0B" filter="url(#goldGlow)" />
    <circle cx="35" cy="34" r="3" fill="#FEF08A" />
    <ellipse cx="0" cy="38" rx="6" ry="14" fill="#F59E0B" filter="url(#goldGlow)" />
    <circle cx="0" cy="34" r="3.5" fill="#FEF08A" />
    <path d="M -12 36 L 0 5 L 12 36 Z" fill="url(#goldSheen)" />
    <circle cx="0" cy="3" r="5" fill="#FFE8A3" filter="url(#goldGlow)" />
    <path d="M -45 100 Q 0 130 45 100" stroke="#F59E0B" stroke-width="8" stroke-dasharray="5 3" fill="none" />
    <path d="M -45 100 Q 0 130 45 100" stroke="#DC2626" stroke-width="4" stroke-dasharray="6 6" fill="none" />
    <path d="M -45 100 Q 0 130 45 100" stroke="#FEF08A" stroke-width="2" stroke-dasharray="2 4" fill="none" />
  </g>

  <!-- 5. Center Presentation Scene: J. Balamurugan Receiving the Prestigious Award -->
  <g transform="translate(600, 500)">
    
    <!-- Central Award Podium Pedestal -->
    <rect x="-110" y="130" width="220" height="90" rx="10" fill="#0E1A34" stroke="url(#goldGrad1)" stroke-width="2" filter="url(#softShadow)" />
    <rect x="-100" y="140" width="200" height="70" rx="6" fill="#081022" />
    <text x="0" y="165" text-anchor="middle" font-family="'Cinzel', serif" font-size="11" font-weight="700" fill="#DFB76C" letter-spacing="1">
      AMMAN EVENT MANAGEMENT
    </text>
    <text x="0" y="185" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="2">
      CERTIFIED DIRECTOR &amp; PLANNER
    </text>
    <text x="0" y="200" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#94A3B8">
      GOVT REGD • ISO COMPLIANT
    </text>

    <!-- Magnificent Multi-Tiered Golden Trophy -->
    <g transform="translate(0, 50)" filter="url(#goldGlow)">
      <!-- Trophy Base -->
      <polygon points="-30,80 30,80 25,60 -25,60" fill="url(#goldSheen)" />
      <rect x="-20" y="45" width="40" height="15" fill="url(#goldGrad1)" rx="2" />
      <rect x="-6" y="15" width="12" height="30" fill="url(#goldSheen)" rx="2" />
      <!-- Trophy Cup / Bowl -->
      <path d="M -30,15 C -30,45 30,45 30,15 Z" fill="url(#goldGrad1)" stroke="#FFF5D6" stroke-width="1.5" />
      <!-- Handles -->
      <path d="M -30,20 C -48,22 -48,36 -28,38" stroke="url(#goldSheen)" stroke-width="3" fill="none" />
      <path d="M 30,20 C 48,22 48,36 28,38" stroke="url(#goldSheen)" stroke-width="3" fill="none" />
      <!-- Crown / Star on Trophy -->
      <polygon points="0,-18 5,-4 19,-4 8,4 12,18 0,9 -12,18 -8,4 -19,-4 -5,-4" fill="url(#goldSheen)" stroke="#FFF5D6" stroke-width="1" />
      <circle cx="0" cy="0" r="4" fill="#FFF" />
    </g>

    <!-- Figure 1 (Right): J. Balamurugan - Recipient in Executive Navy Suit -->
    <g transform="translate(140, -10)" filter="url(#softShadow)">
      <!-- Shadow -->
      <ellipse cx="0" cy="230" rx="55" ry="12" fill="#000" opacity="0.6" />
      <!-- Trousers / Legs -->
      <path d="M -24 100 L -28 230 L -6 230 L -4 110 L 4 110 L 6 230 L 28 230 L 24 100 Z" fill="#0B132B" stroke="#060A17" stroke-width="1.5" />
      <!-- Polished Black Shoes -->
      <ellipse cx="-18" cy="232" rx="14" ry="6" fill="#020408" />
      <ellipse cx="18" cy="232" rx="14" ry="6" fill="#020408" />
      <!-- Suit Jacket Body -->
      <path d="M -45 -10 L 45 -10 L 40 105 L -40 105 Z" fill="#0E1E42" stroke="#DFB76C" stroke-width="1" />
      <!-- Crisp White Shirt & Gold Silk Tie -->
      <polygon points="-12,-10 0,25 12,-10" fill="#FFFFFF" />
      <polygon points="-4,-4 0,38 4,-4" fill="url(#goldGrad1)" />
      <!-- Suit Lapels -->
      <path d="M -40 -10 L -12 40 L -25 45 L -45 5 Z" fill="#09142E" stroke="#DFB76C" stroke-width="0.8" />
      <path d="M 40 -10 L 12 40 L 25 45 L 45 5 Z" fill="#09142E" stroke="#DFB76C" stroke-width="0.8" />
      <!-- Gold Pocket Square -->
      <polygon points="20,15 28,15 32,8 24,10" fill="url(#goldSheen)" />
      <!-- Name Badge / Gold Ribbon on Lapel -->
      <rect x="-36" y="16" width="16" height="8" rx="2" fill="url(#goldGrad1)" />
      
      <!-- Head / Face -->
      <!-- Neck -->
      <rect x="-10" y="-22" width="20" height="14" fill="#C28860" />
      <!-- Face -->
      <ellipse cx="0" cy="-42" rx="20" ry="24" fill="#C28860" />
      <!-- Professional Haircut -->
      <path d="M -22 -44 C -22 -68 22 -68 22 -44 C 18 -60 -18 -60 -22 -44 Z" fill="#1C140E" />
      <path d="M -22 -44 Q 0 -62 22 -48 L 22 -40 Q 0 -54 -22 -36 Z" fill="#0F0A07" />
      <!-- Well-groomed Moustache & Smile -->
      <path d="M -8 -32 Q 0 -28 8 -32 Q 0 -30 -8 -32" stroke="#1C140E" stroke-width="2" fill="#1C140E" />
      <path d="M -6 -28 Q 0 -24 6 -28" stroke="#FFFFFF" stroke-width="1.5" fill="none" />
      <!-- Eyes & Eyebrows -->
      <path d="M -12 -44 Q -7 -47 -2 -44" stroke="#1C140E" stroke-width="1.8" fill="none" />
      <path d="M 2 -44 Q 7 -47 12 -44" stroke="#1C140E" stroke-width="1.8" fill="none" />
      <circle cx="-7" cy="-40" r="2" fill="#1C140E" />
      <circle cx="7" cy="-40" r="2" fill="#1C140E" />

      <!-- Left Arm Extended Holding Framed Award Certificate -->
      <path d="M -40 5 L -85 40 L -70 52 L -35 22 Z" fill="#0E1E42" stroke="#09142E" stroke-width="1" />
      <!-- Hand -->
      <ellipse cx="-85" cy="46" rx="8" ry="7" fill="#C28860" />

      <!-- The Framed Certificate Held by Balamurugan -->
      <g transform="translate(-155, 10)">
        <rect x="0" y="0" width="100" height="135" rx="6" fill="#FFFBEB" stroke="url(#goldGrad1)" stroke-width="3.5" filter="url(#goldGlow)" />
        <rect x="5" y="5" width="90" height="125" rx="4" fill="#FFFDF5" stroke="#DFB76C" stroke-width="1" stroke-dasharray="3 2" />
        <text x="50" y="24" text-anchor="middle" font-family="'Cinzel', serif" font-size="6" font-weight="900" fill="#DFB76C">CERTIFICATE</text>
        <text x="50" y="34" text-anchor="middle" font-size="5" font-weight="700" fill="#0F172A">OF EXCELLENCE</text>
        <circle cx="50" cy="50" r="10" fill="url(#goldGrad1)" />
        <polygon points="50,44 52,48 57,48 53,51 55,56 50,53 45,56 47,51 43,48 48,48" fill="#FFF" />
        <text x="50" y="70" text-anchor="middle" font-family="'Playfair Display', serif" font-size="7" font-weight="900" fill="#78350F">J. BALAMURUGAN</text>
        <text x="50" y="82" text-anchor="middle" font-size="4" font-weight="600" fill="#334155">Certified Event Director</text>
        <text x="50" y="90" text-anchor="middle" font-size="4" font-weight="600" fill="#334155">Government Registered</text>
        <text x="50" y="98" text-anchor="middle" font-size="4" font-weight="600" fill="#334155">Amman Event Management</text>
        <rect x="15" y="108" width="25" height="1" fill="#DFB76C" />
        <rect x="60" y="108" width="25" height="1" fill="#DFB76C" />
        <text x="27" y="116" text-anchor="middle" font-size="3" fill="#64748B">CHIEF JURY</text>
        <text x="72" y="116" text-anchor="middle" font-size="3" fill="#64748B">PRESIDENT</text>
      </g>

      <!-- Label under figure -->
      <g transform="translate(0, 252)">
        <rect x="-80" y="-12" width="160" height="24" rx="6" fill="#060C1B" stroke="#DFB76C" stroke-width="1.5" />
        <text x="0" y="4" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#FFE8A3">
          J. BALAMURUGAN
        </text>
      </g>
    </g>

    <!-- Figure 2 (Left): VIP Dignitary / Award Presenter in Silk Attire & Blazer -->
    <g transform="translate(-140, 5)" filter="url(#softShadow)">
      <ellipse cx="0" cy="220" rx="55" ry="12" fill="#000" opacity="0.6" />
      <!-- Trousers -->
      <path d="M -22 95 L -26 220 L -6 220 L -4 105 L 4 105 L 6 220 L 26 220 L 22 95 Z" fill="#1E293B" stroke="#0F172A" stroke-width="1" />
      <ellipse cx="-16" cy="222" rx="13" ry="5.5" fill="#020408" />
      <ellipse cx="16" cy="222" rx="13" ry="5.5" fill="#020408" />
      <!-- Blazer Body - Traditional South Indian Silk Shawl over Charcoal Coat -->
      <path d="M -42 -5 L 42 -5 L 38 100 L -38 100 Z" fill="#1F2937" stroke="#374151" stroke-width="1" />
      <!-- Gold Silk Ponnada Shawl -->
      <path d="M -35 -5 Q 0 45 35 -5 L 42 20 Q 0 85 -42 20 Z" fill="url(#goldGrad1)" stroke="#FFF5D6" stroke-width="1" />
      <polygon points="-10,-5 0,20 10,-5" fill="#FFFFFF" />
      <!-- Head / Face -->
      <rect x="-9" y="-18" width="18" height="14" fill="#B7794D" />
      <ellipse cx="0" cy="-38" rx="19" ry="23" fill="#B7794D" />
      <!-- Silvering Gray Hair -->
      <path d="M -21 -40 C -21 -62 21 -62 21 -40 C 17 -54 -17 -54 -21 -40 Z" fill="#64748B" />
      <ellipse cx="0" cy="-28" rx="5" ry="2" fill="#4B5563" />
      <!-- Arm Handing the Trophy -->
      <path d="M 35 15 L 85 45 L 75 58 L 28 28 Z" fill="#1F2937" />
      <ellipse cx="85" cy="48" rx="7" ry="6" fill="#B7794D" />

      <!-- Label under figure -->
      <g transform="translate(0, 240)">
        <rect x="-85" y="-12" width="170" height="24" rx="6" fill="#060C1B" stroke="#DFB76C" stroke-width="1" />
        <text x="0" y="4" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#E2E8F0">
          AWARDS COMMITTEE CHAIR
        </text>
      </g>
    </g>

  </g>

  <!-- 6. Foreground Floral Stage Podium Garland -->
  <g transform="translate(600, 755)" filter="url(#softShadow)">
    <rect x="-420" y="0" width="840" height="35" rx="6" fill="#091428" stroke="#DFB76C" stroke-width="1.5" />
    <!-- Garland Blooms: Alternating Red Roses, Yellow Marigolds & White Jasmine -->
    <g>
      <!-- Marigold Base -->
      <path d="M -400 10 Q 0 30 400 10" stroke="#F59E0B" stroke-width="18" stroke-dasharray="14 4" fill="none" />
      <!-- Red Rose Highlights -->
      <path d="M -400 10 Q 0 30 400 10" stroke="#DC2626" stroke-width="12" stroke-dasharray="8 10" fill="none" />
      <!-- White Jasmine Dots -->
      <path d="M -400 10 Q 0 30 400 10" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="4 8" fill="none" />
    </g>
    <text x="0" y="24" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#FFE8A3" letter-spacing="3">
      ★ CERTIFIED EVENT MANAGEMENT PROFESSIONAL • GOVERNMENT REGISTERED ★
    </text>
  </g>

  <!-- Floating Sparkles & Stage Confetti -->
  <g fill="#FFE8A3" opacity="0.75" filter="url(#goldGlow)">
    <polygon points="260,180 263,188 271,191 263,194 260,202 257,194 249,191 257,188" />
    <polygon points="940,160 943,168 951,171 943,174 940,182 937,174 929,171 937,168" />
    <polygon points="600,100 602,106 608,108 602,110 600,116 598,110 592,108 598,106" />
    <polygon points="380,380 382,386 388,388 382,390 380,396 378,390 372,388 378,386" />
    <polygon points="820,380 822,386 828,388 822,390 820,396 818,390 812,388 818,386" />
  </g>
</svg>
`;

async function buildAwardPhotos() {
  console.log('Rendering Certified Award Photo for Bala Murugan...');
  const svgBuffer = Buffer.from(awardSvg);

  const targetPng = path.join(IMAGES_DIR, 'certified-award-balamurugan.png');
  const targetWebp = path.join(IMAGES_DIR, 'certified-award-balamurugan.webp');

  // Also create alias for award-balamurugan
  const aliasPng = path.join(IMAGES_DIR, 'award-balamurugan.png');
  const aliasWebp = path.join(IMAGES_DIR, 'award-balamurugan.webp');

  await sharp(svgBuffer)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(targetPng);
  console.log('✓ Created:', targetPng);

  await sharp(svgBuffer)
    .webp({ quality: 88, effort: 6 })
    .toFile(targetWebp);
  console.log('✓ Created:', targetWebp);

  fs.copyFileSync(targetPng, aliasPng);
  fs.copyFileSync(targetWebp, aliasWebp);
  console.log('✓ Aliases created successfully.');

  // Also ensure it is copied to dist/images if dist exists
  const distImagesDir = path.resolve(__dirname, '../dist/images');
  if (fs.existsSync(distImagesDir)) {
    fs.copyFileSync(targetPng, path.join(distImagesDir, 'certified-award-balamurugan.png'));
    fs.copyFileSync(targetWebp, path.join(distImagesDir, 'certified-award-balamurugan.webp'));
    fs.copyFileSync(aliasPng, path.join(distImagesDir, 'award-balamurugan.png'));
    fs.copyFileSync(aliasWebp, path.join(distImagesDir, 'award-balamurugan.webp'));
    console.log('✓ Copied to dist/images for immediate production readiness.');
  }
}

buildAwardPhotos().catch(err => {
  console.error('Failed to build award photos:', err);
  process.exit(1);
});
