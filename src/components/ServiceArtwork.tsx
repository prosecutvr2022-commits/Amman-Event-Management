import React from 'react';
import { WeddingMandapArtwork } from './WeddingMandapArtwork';
import { SectionArtworkWrapper } from './SectionArtworkWrapper';

interface ServiceArtworkProps {
  id: string;
  className?: string;
  title?: string;
}

export const ServiceArtwork: React.FC<ServiceArtworkProps> = ({ id, className = '', title }) => {
  // Wedding has its own dedicated component that already has PNG only & Replace PNG
  if (id === 'wedding' || id === 'g1') {
    return <WeddingMandapArtwork className={className} title={title} />;
  }

  const renderDefaultArtwork = () => {
    switch (id) {
      case 'destination-wedding':
      case 'g7':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0C2036] via-[#0E172A] to-[#050C16] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.18),transparent_65%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 190 Q 100 185 200 190 T 400 190 L 400 260 L 0 260 Z" fill="#08182B" />
              <path d="M0 210 Q 100 205 200 210 T 400 210" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
              <path d="M0 230 Q 100 225 200 230 T 400 230" stroke="#38BDF8" strokeWidth="0.8" opacity="0.25" />
              <circle cx="200" cy="90" r="36" fill="#F59E0B" fillOpacity="0.15" />
              <circle cx="200" cy="90" r="28" fill="#FDE68A" fillOpacity="0.4" />
              <line x1="120" y1="130" x2="120" y2="230" stroke="#C5A059" strokeWidth="2.5" />
              <line x1="280" y1="130" x2="280" y2="230" stroke="#C5A059" strokeWidth="2.5" />
              <line x1="100" y1="135" x2="300" y2="135" stroke="#DFB76C" strokeWidth="3" />
              <path d="M 120 135 C 130 160 115 190 120 230" stroke="#F8FAFC" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <path d="M 280 135 C 270 160 285 190 280 230" stroke="#F8FAFC" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="160" cy="150" r="5" fill="#FFE59E" />
              <line x1="160" y1="135" x2="160" y2="150" stroke="#DFB76C" strokeWidth="1" />
              <circle cx="240" cy="150" r="5" fill="#FFE59E" />
              <line x1="240" y1="135" x2="240" y2="150" stroke="#DFB76C" strokeWidth="1" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E6CA65]/90 font-serif">
              <span>Scenic Outdoor Mandap</span>
              <span>Resort Logistics</span>
            </div>
          </div>
        );

      case 'corporate-events':
      case 'g3':
      case 'g8':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#09152E] via-[#0A1124] to-[#040814] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.22),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 40 0 L 160 200 L 240 200 L 360 0 Z" fill="url(#stageSpotlightCorp)" opacity="0.35" />
              <rect x="80" y="45" width="240" height="120" rx="4" fill="#0C1B3A" stroke="#3B82F6" strokeWidth="1.5" />
              <rect x="90" y="55" width="220" height="100" rx="2" fill="#071126" />
              <line x1="110" y1="100" x2="290" y2="100" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="6 4" />
              <circle cx="200" cy="100" r="18" stroke="#DFB76C" strokeWidth="1.5" />
              <circle cx="200" cy="100" r="6" fill="#60A5FA" />
              <path d="M 30 200 L 370 200 L 400 260 L 0 260 Z" fill="#0E1E40" stroke="#1E3A8A" strokeWidth="1" />
              <path d="M 185 180 L 215 180 L 218 215 L 182 215 Z" fill="#1E293B" stroke="#DFB76C" strokeWidth="1" />
              <circle cx="200" cy="174" r="2.5" fill="#DFB76C" />
              <line x1="20" y1="20" x2="380" y2="20" stroke="#64748B" strokeWidth="2" />
              {[50, 110, 170, 230, 290, 350].map((x, i) => (
                <rect key={i} x={x} y="20" width="10" height="8" rx="1" fill="#DFB76C" />
              ))}
              <defs>
                <linearGradient id="stageSpotlightCorp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#93C5FD] font-mono">
              <span>AV Production & LED</span>
              <span>Keynote Setup</span>
            </div>
          </div>
        );

      case 'product-launches':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#120826] via-[#0B0518] to-[#04020A] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 60 10 L 200 170 L 340 10 Z" fill="#9333EA" fillOpacity="0.15" />
              <rect x="140" y="80" width="120" height="110" rx="6" fill="#1E1035" stroke="#C084FC" strokeWidth="1.5" />
              <circle cx="200" cy="135" r="28" stroke="#DFB76C" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 185 135 L 200 115 L 215 135 Z" fill="#FDE047" />
              <path d="M 40 210 L 360 210" stroke="#A855F7" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E9D5FF] font-mono">
              <span>High-Impact Reveal</span>
              <span>Dramatic Unveil</span>
            </div>
          </div>
        );

      case 'chenda-melam':
      case 'g2':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#240F13] via-[#160A0D] to-[#0A0507] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.22),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(100, 70)">
                <rect x="0" y="20" width="55" height="110" rx="6" fill="#852E1E" stroke="#DFB76C" strokeWidth="1.5" />
                <ellipse cx="27.5" cy="20" rx="27.5" ry="9" fill="#E28938" stroke="#DFB76C" strokeWidth="1.2" />
                <ellipse cx="27.5" cy="130" rx="27.5" ry="9" fill="#581C10" stroke="#DFB76C" strokeWidth="1.2" />
                <path d="M 5 28 L 50 122 M 20 28 L 35 122 M 35 28 L 20 122 M 50 28 L 5 122" stroke="#DFB76C" strokeWidth="1" opacity="0.75" />
                <line x1="-15" y1="5" x2="25" y2="20" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
              </g>
              <g transform="translate(170, 50)">
                <rect x="0" y="22" width="65" height="130" rx="8" fill="#991B1B" stroke="#DFB76C" strokeWidth="2" />
                <ellipse cx="32.5" cy="22" rx="32.5" ry="11" fill="#F97316" stroke="#DFB76C" strokeWidth="1.5" />
                <ellipse cx="32.5" cy="152" rx="32.5" ry="11" fill="#581C10" stroke="#DFB76C" strokeWidth="1.5" />
                <path d="M 6 32 L 59 142 M 22 32 L 43 142 M 43 32 L 22 142 M 59 32 L 6 142" stroke="#FDE68A" strokeWidth="1.2" opacity="0.85" />
                <path d="M -8 80 Q 32.5 120 73 80" stroke="#FEF08A" strokeWidth="2.5" fill="none" opacity="0.7" />
                <line x1="-10" y1="0" x2="30" y2="22" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="75" y1="2" x2="35" y2="22" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />
              </g>
              <g transform="translate(265, 85)">
                <circle cx="28" cy="28" r="24" fill="#DFB76C" stroke="#FEF08A" strokeWidth="2" />
                <circle cx="28" cy="28" r="6" fill="#92400E" />
                <circle cx="50" cy="50" r="24" fill="#C5A059" stroke="#FEF08A" strokeWidth="2" opacity="0.85" />
                <circle cx="50" cy="50" r="6" fill="#92400E" />
              </g>
              <path d="M 120 40 Q 200 10 280 40" stroke="#DFB76C" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <path d="M 100 25 Q 200 -5 300 25" stroke="#DFB76C" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FCA5A5] font-serif">
              <span>Traditional Percussion Troupe</span>
              <span>Royal Procession</span>
            </div>
          </div>
        );

      case 'catering-services':
      case 'g5':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#241709] via-[#140D04] to-[#080501] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.2),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 40 180 C 100 130 300 130 360 180 C 310 220 90 220 40 180 Z" fill="#15803D" stroke="#22C55E" strokeWidth="1.2" />
              <line x1="45" y1="180" x2="355" y2="180" stroke="#166534" strokeWidth="1.5" />
              <circle cx="100" cy="165" r="9" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
              <circle cx="135" cy="160" r="10" fill="#F87171" stroke="#B91C1C" strokeWidth="0.8" />
              <circle cx="170" cy="160" r="11" fill="#4ADE80" stroke="#15803D" strokeWidth="0.8" />
              <circle cx="210" cy="162" r="14" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
              <circle cx="255" cy="165" r="10" fill="#FB923C" stroke="#EA580C" strokeWidth="0.8" />
              <circle cx="295" cy="170" r="8" fill="#F43F5E" stroke="#BE123C" strokeWidth="0.8" />
              <ellipse cx="200" cy="85" rx="70" ry="24" fill="#92400E" stroke="#DFB76C" strokeWidth="2" />
              <ellipse cx="200" cy="82" rx="64" ry="20" fill="#B45309" stroke="#FEF08A" strokeWidth="1" />
              {[160, 180, 200, 220, 240].map((x, i) => (
                <circle key={i} cx={x} cy={82 + (i % 2 === 0 ? 2 : -2)} r="6" fill="#F59E0B" stroke="#DFB76C" strokeWidth="0.8" />
              ))}
              <ellipse cx="200" cy="80" rx="7" ry="4" fill="#78350F" />
              <circle cx="200" cy="74" r="3" fill="#FDE047" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FDE68A] font-serif">
              <span>Kalyana Virundhu Feast</span>
              <span>Traditional Hospitality</span>
            </div>
          </div>
        );

      case 'thamboolam-bags':
      case 'g6':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0F2317] via-[#09150E] to-[#040905] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.2),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(130, 45)">
                <path d="M 40 40 C 40 5 100 5 100 40" stroke="#DFB76C" strokeWidth="3" fill="none" strokeLinecap="round" />
                <rect x="20" y="38" width="100" height="135" rx="6" fill="#1C3827" stroke="#DFB76C" strokeWidth="1.5" />
                <circle cx="70" cy="95" r="22" stroke="#DFB76C" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx="70" cy="95" r="14" stroke="#DFB76C" strokeWidth="1" />
                <circle cx="70" cy="95" r="5" fill="#DFB76C" />
                <line x1="20" y1="55" x2="120" y2="55" stroke="#DFB76C" strokeWidth="1.2" />
                <line x1="20" y1="145" x2="120" y2="145" stroke="#DFB76C" strokeWidth="1.2" />
              </g>
              <g transform="translate(230, 130)">
                <path d="M 20 40 C 0 10 50 0 55 45 C 55 60 25 70 20 40 Z" fill="#15803D" stroke="#4ADE80" strokeWidth="1" />
                <ellipse cx="65" cy="55" rx="8" ry="4" fill="#991B1B" />
                <ellipse cx="80" cy="58" rx="8" ry="4" fill="#CA8A04" />
              </g>
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#A7F3D0] font-serif">
              <span>Bespoke Thamboolam Bags</span>
              <span>Auspicious Return Gifts</span>
            </div>
          </div>
        );

      case 'photography-videography':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#101726] via-[#0A0E18] to-[#04060B] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(147,197,253,0.18),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(120, 60)">
                <rect x="30" y="30" width="100" height="75" rx="8" fill="#1E293B" stroke="#DFB76C" strokeWidth="1.5" />
                <path d="M 130 45 L 175 35 L 175 100 L 130 90 Z" fill="#0F172A" stroke="#DFB76C" strokeWidth="1.2" />
                <ellipse cx="175" cy="67.5" rx="6" ry="32.5" fill="#38BDF8" fillOpacity="0.3" stroke="#DFB76C" strokeWidth="1" />
                <rect x="55" y="18" width="35" height="12" rx="2" fill="#334155" stroke="#DFB76C" strokeWidth="1" />
                <circle cx="85" cy="24" r="3" fill="#EF4444" />
                <circle cx="80" cy="67.5" r="22" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="80" cy="67.5" r="14" stroke="#DFB76C" strokeWidth="1.2" />
                <circle cx="80" cy="67.5" r="6" fill="#38BDF8" />
                <line x1="80" y1="105" x2="30" y2="175" stroke="#475569" strokeWidth="2.5" />
                <line x1="80" y1="105" x2="80" y2="175" stroke="#475569" strokeWidth="2.5" />
                <line x1="80" y1="105" x2="130" y2="175" stroke="#475569" strokeWidth="2.5" />
              </g>
              <circle cx="200" cy="127.5" r="45" stroke="#38BDF8" strokeWidth="0.8" opacity="0.3" strokeDasharray="4 6" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#BAE6FD] font-mono">
              <span>4K Cinematic Films</span>
              <span>Candid Photography</span>
            </div>
          </div>
        );

      case 'birthday-parties':
      case 'g4':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#240B1D] via-[#140610] to-[#0A0208] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(236,72,153,0.2),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="160" cy="70" r="28" fill="#F43F5E" fillOpacity="0.8" stroke="#DFB76C" strokeWidth="1" />
              <circle cx="200" cy="55" r="32" fill="#EC4899" fillOpacity="0.8" stroke="#DFB76C" strokeWidth="1" />
              <circle cx="235" cy="75" r="26" fill="#A855F7" fillOpacity="0.8" stroke="#DFB76C" strokeWidth="1" />
              <circle cx="180" cy="95" r="24" fill="#3B82F6" fillOpacity="0.8" stroke="#DFB76C" strokeWidth="1" />
              <path d="M 160 98 Q 185 140 195 170" stroke="#DFB76C" strokeWidth="1" opacity="0.6" />
              <path d="M 200 87 Q 195 130 195 170" stroke="#DFB76C" strokeWidth="1" opacity="0.6" />
              <path d="M 235 101 Q 205 140 195 170" stroke="#DFB76C" strokeWidth="1" opacity="0.6" />
              <path d="M 180 119 Q 190 145 195 170" stroke="#DFB76C" strokeWidth="1" opacity="0.6" />
              <g transform="translate(160, 160)">
                <rect x="10" y="20" width="60" height="28" rx="3" fill="#FDF2F8" stroke="#DFB76C" strokeWidth="1.2" />
                <rect x="22" y="5" width="36" height="15" rx="2" fill="#FBCFE8" stroke="#DFB76C" strokeWidth="1" />
                <line x1="40" y1="5" x2="40" y2="-2" stroke="#DFB76C" strokeWidth="1.5" />
                <circle cx="40" cy="-5" r="3.5" fill="#F59E0B" />
              </g>
              {[50, 110, 290, 340].map((x, i) => (
                <circle key={i} cx={x} cy={60 + i * 25} r={2 + (i % 2)} fill="#FDE047" />
              ))}
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FBCFE8] font-serif">
              <span>Custom Themed Parties</span>
              <span>Festive Celebrations</span>
            </div>
          </div>
        );

      case 'special-occasions':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#241A0B] via-[#160F06] to-[#0A0702] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.22),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="110" r="55" stroke="#DFB76C" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="200" cy="110" r="35" stroke="#FDE68A" strokeWidth="2" />
              <circle cx="200" cy="110" r="10" fill="#DFB76C" />
              <path d="M 170 180 L 230 180 L 215 210 L 185 210 Z" fill="#92400E" stroke="#DFB76C" strokeWidth="1.2" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FDE68A] font-serif">
              <span>Traditional Sacred Ambience</span>
              <span>Milestone Rituals</span>
            </div>
          </div>
        );

      case 'surprise-events':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#1C0B29] via-[#100619] to-[#06020A] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(192,132,252,0.2),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="145" y="90" width="110" height="90" rx="8" fill="#2E1065" stroke="#DFB76C" strokeWidth="1.5" />
              <path d="M 200 90 L 200 180 M 145 135 L 255 135" stroke="#DFB76C" strokeWidth="3" />
              <circle cx="200" cy="78" r="16" stroke="#FDE68A" strokeWidth="2" fill="none" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E9D5FF] font-serif">
              <span>Discreet Planning</span>
              <span>Perfect Reveals</span>
            </div>
          </div>
        );

      case 'brand-promotions':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#061C24] via-[#041014] to-[#02080A] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.2),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="110" y="70" width="180" height="110" rx="6" fill="#0E2E3B" stroke="#22D3EE" strokeWidth="1.5" />
              <circle cx="200" cy="125" r="24" stroke="#DFB76C" strokeWidth="1.5" />
              <path d="M 180 125 L 220 125" stroke="#DFB76C" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#A5F3FC] font-mono">
              <span>Brand Promotions</span>
              <span>High Footfall Visibility</span>
            </div>
          </div>
        );

      case 'celebrity-events':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#241A0B] via-[#140F06] to-[#070502] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.25),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 200 60 L 212 98 L 252 98 L 220 122 L 232 160 L 200 136 L 168 160 L 180 122 L 148 98 L 188 98 Z" fill="#DFB76C" stroke="#FDE68A" strokeWidth="1.5" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FDE68A] font-serif">
              <span>VIP Protocol & Hospitality</span>
              <span>Celebrity Management</span>
            </div>
          </div>
        );

      case 'theme-events':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#062417] via-[#04150D] to-[#020A06] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.22),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="120" r="60" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="200" cy="120" r="35" stroke="#DFB76C" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#A7F3D0] font-serif">
              <span>360° Immersive Environments</span>
              <span>Concept Themes</span>
            </div>
          </div>
        );

      case 'social-events':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0A1B29] via-[#061019] to-[#03080D] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.2),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="160" cy="110" r="22" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="240" cy="110" r="22" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="200" cy="95" r="26" stroke="#DFB76C" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#BAE6FD] font-serif">
              <span>Community Infrastructure</span>
              <span>Large-Scale Festivals</span>
            </div>
          </div>
        );

      case 'entertainments':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#1C0B29] via-[#100619] to-[#06020A] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.22),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 160 160 L 160 80 L 240 60 L 240 140" stroke="#DFB76C" strokeWidth="3" fill="none" />
              <circle cx="145" cy="160" r="16" fill="#C084FC" stroke="#DFB76C" strokeWidth="1.5" />
              <circle cx="225" cy="140" r="16" fill="#C084FC" stroke="#DFB76C" strokeWidth="1.5" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E9D5FF] font-serif">
              <span>Top Artists & Live Stage Shows</span>
              <span>Musical Concerts</span>
            </div>
          </div>
        );

      case 'wedding-invitation':
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#241709] via-[#160E05] to-[#0A0602] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.22),transparent_70%)]" />
            <svg className="w-full h-full opacity-85" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="130" y="60" width="140" height="140" rx="6" fill="#1C1207" stroke="#DFB76C" strokeWidth="2" />
              <rect x="145" y="75" width="110" height="110" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <circle cx="200" cy="130" r="18" fill="#DFB76C" fillOpacity="0.3" stroke="#DFB76C" strokeWidth="1.2" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FDE68A] font-serif">
              <span>Bespoke Stationery & Invites</span>
              <span>Gold-Foil Cards</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#121E38] via-[#0E172C] to-[#080E1C] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.2),transparent_70%)]" />
            <svg className="w-full h-full opacity-80" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="120" r="70" stroke="#DFB76C" strokeWidth="1.2" strokeDasharray="3 4" />
              <circle cx="200" cy="120" r="45" stroke="#DFB76C" strokeWidth="1.5" />
              <circle cx="200" cy="120" r="15" fill="#C5A059" fillOpacity="0.4" stroke="#FFE59E" strokeWidth="1" />
              <path d="M 200 40 L 200 200 M 120 120 L 280 120" stroke="#DFB76C" strokeWidth="0.8" opacity="0.4" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E6CA65]/90 font-serif">
              <span>Amman Event Management</span>
              <span>J. Balamurugan</span>
            </div>
          </div>
        );
    }
  };

  return (
    <SectionArtworkWrapper id={id} className={className} title={title}>
      {renderDefaultArtwork()}
    </SectionArtworkWrapper>
  );
};
