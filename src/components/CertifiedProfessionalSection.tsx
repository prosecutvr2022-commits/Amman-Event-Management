import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileCheck2,
  Building2,
  CalendarCheck,
  PhoneCall,
  Maximize2,
  X,
  BadgeCheck,
  Star,
  ExternalLink,
} from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';
import { PermanentPhotoSlot } from './PermanentPhotoSlot';
import { MandalaMotif } from './MandalaMotif';

interface CertifiedProfessionalSectionProps {
  onPlanEvent: () => void;
  onEnquire?: () => void;
}

export const CertifiedProfessionalSection: React.FC<CertifiedProfessionalSectionProps> = ({
  onPlanEvent,
  onEnquire,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const credentials = [
    {
      icon: ShieldCheck,
      title: 'Government Registered Company',
      highlight: 'MSME & Commercial Registration',
      description:
        'Officially registered with the Government of India / Tamil Nadu MSME. Full legal compliance, authenticated invoices, and professional commercial accountability.',
      accent: 'border-amber-500/40 bg-amber-950/20 text-[#F5D77F]',
    },
    {
      icon: Award,
      title: 'Certified Event Management Professional',
      highlight: 'Honored Director: J. Balamurugan',
      description:
        'Certified leadership with deep technical expertise in structural stage architecture, acoustic engineering, traditional ritual decor, and VIP protocol coordination.',
      accent: 'border-yellow-500/40 bg-yellow-950/20 text-[#DFB76C]',
    },
    {
      icon: FileCheck2,
      title: 'Complete Contract & Date Assurance',
      highlight: '100% Guaranteed Execution',
      description:
        'Clear written contracts, transparent milestone billing, zero hidden charges, and absolute booking guarantees for your sacred dates.',
      accent: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
    },
    {
      icon: Building2,
      title: 'Direct Physical Office & Warehouse',
      highlight: 'Vittukatti, Thiruthuraipoondi',
      description:
        'In-house structural trusses, stage panels, sound & lighting rigs, and dedicated floral teams — eliminate middlemen markups and delays.',
      accent: 'border-sky-500/40 bg-sky-950/20 text-sky-300',
    },
  ];

  return (
    <section
      id="certified-professional"
      className="relative py-20 lg:py-28 bg-[#040814] overflow-hidden border-b border-[#DFB76C]/30"
      aria-label="Certified Event Management Professional & Government Registered Company"
    >
      {/* Background radial ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(223,183,108,0.12),transparent_70%)] pointer-events-none blur-3xl z-0" />
      <div className="absolute bottom-10 left-10 hidden xl:block opacity-15 pointer-events-none">
        <MandalaMotif size={260} opacity={0.5} variant="full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Official Government Registered Pill */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          
          {/* Highlight Badge: Government Registered Company */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-[#DFB76C]/25 to-amber-500/20 border-2 border-[#DFB76C] text-[#F5D77F] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4 shadow-[0_0_25px_rgba(223,183,108,0.3)] animate-pulse">
            <ShieldCheck className="w-4 h-4 text-[#DFB76C]" />
            <span>★ GOVERNMENT REGISTERED COMPANY ★</span>
            <BadgeCheck className="w-4 h-4 text-[#DFB76C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight [text-wrap:balance]">
            Certified Event Management Professional
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-[#DFB76C] mb-4">
            Official Recognition &amp; Industry Excellence Awards
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Spearheaded by <strong className="text-white font-bold">{BRAND_INFO.plannerName}</strong>,{' '}
            <strong className="text-[#F5D77F]">{BRAND_INFO.businessName}</strong> is an officially certified, 
            government-registered event management firm delivering world-class wedding decor, cultural celebrations, 
            and corporate summit productions with uncompromising perfection.
          </p>
        </div>

        {/* 2-Column Showcase: Award Ceremony Photo on Left + Credential Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Official Award Photo Slot with Permanent Upload Ability */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Photo Card Container with Ornate Gold Border & Shadow */}
            <div className="relative w-full max-w-[540px] rounded-3xl overflow-hidden bg-slate-950 border-2 border-[#DFB76C]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              
              {/* Top Banner Ribbon */}
              <div className="bg-gradient-to-r from-[#0B152B] via-[#122347] to-[#0B152B] border-b border-[#DFB76C]/40 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#DFB76C]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Award Presentation Ceremony
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#DFB76C] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#DFB76C]/30">
                  <Star className="w-3 h-3 fill-[#DFB76C] text-[#DFB76C]" />
                  <span>J. Balamurugan</span>
                </div>
              </div>

              {/* Photo Display Slot (PermanentPhotoSlot with upload & drag-and-drop support) */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#070D1E] cursor-pointer"
                onClick={() => setLightboxOpen(true)}
                title="Click to expand award photo"
              >
                <PermanentPhotoSlot
                  id="certified-award-balamurugan"
                  defaultLabel="Certified Event Management Professional Award"
                  title="J. Balamurugan receiving Certified Event Management Professional Award"
                  allowUpload={false}
                  className="w-full h-full"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
                  <span className="text-xs text-white font-medium bg-black/75 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#DFB76C]" />
                    Click to Enlarge
                  </span>
                  <span className="text-xs font-bold text-[#F5D77F] bg-amber-950/80 px-2.5 py-1 rounded-md border border-[#DFB76C]/50">
                    Govt Registered
                  </span>
                </div>
              </div>

              {/* Bottom Caption Card */}
              <div className="p-4 bg-[#091124] border-t border-[#DFB76C]/30 text-left">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-white mb-1">
                      Certified Event Management Professional Felicitation
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      J. Balamurugan receiving the prestigious citation and trophy for pioneering excellence in South Indian wedding staging and event production.
                    </p>
                  </div>
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="p-2 rounded-xl bg-[#0B152B] hover:bg-[#DFB76C]/20 border border-[#DFB76C]/40 text-[#DFB76C] transition-colors cursor-pointer shrink-0"
                    title="View Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Verification Strip */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 text-[11px] sm:text-xs text-slate-300 flex-wrap">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified Registration
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#DFB76C]">
                <BadgeCheck className="w-4 h-4 text-[#DFB76C]" />
                Certified Director
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-sky-300">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                100% Date Protection
              </span>
            </div>

          </div>

          {/* Right Column: Key Government & Certification Pillars */}
          <div className="lg:col-span-6 space-y-5 text-left">
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#DFB76C] uppercase tracking-wider">
                Why Official Registration Matters
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Trust Your Life’s Biggest Celebrations to Certified Experts
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                When you celebrate once-in-a-lifetime weddings, corporate summits, or family milestones, you need 
                guaranteed reliability. Unlike unverified freelancers, <strong className="text-white font-semibold">Amman Event Management</strong> 
                operates as a legally verified entity with permanent logistics infrastructure.
              </p>
            </div>

            {/* Grid of 4 Credential Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {credentials.map((cred, idx) => {
                const IconComponent = cred.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${cred.accent}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/10">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        {cred.highlight}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5 font-serif">
                      {cred.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cred.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Highlighted Government Registered Company Callout Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0B152B] to-slate-950 border-2 border-[#DFB76C]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-5 h-5 text-[#070D1E]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#F5D77F]">
                    Government Registered Company
                  </p>
                  <p className="text-xs text-slate-300">
                    Reg. Office: Vittukatti, Thiruthuraipoondi - 614 715, Tiruvarur District
                  </p>
                </div>
              </div>

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Verify Credentials</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onPlanEvent}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#070D1E] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#070D1E]" />
                <span>Book Certified Event Planner</span>
              </button>

              <a
                href={`tel:${BRAND_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#DFB76C]" />
                <span>Call {BRAND_INFO.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Full View */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 border border-[#DFB76C]/60 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#0B152B] border-b border-[#DFB76C]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#DFB76C]" />
                <h3 className="font-serif font-bold text-white text-sm sm:text-base">
                  Certified Event Management Professional • Government Registered Company
                </h3>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
              <picture className="w-full h-full block">
                <source srcSet="/images/certified-award-balamurugan.webp" type="image/webp" />
                <img
                  src="/images/certified-award-balamurugan.png"
                  alt="Certified Event Management Professional Award - J. Balamurugan"
                  className="w-full h-full object-contain"
                />
              </picture>
            </div>

            <div className="p-4 sm:p-5 bg-[#091124] border-t border-[#DFB76C]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#F5D77F] uppercase tracking-wider mb-1">
                  Presented to J. Balamurugan — Amman Event Management
                </p>
                <p className="text-xs text-slate-300">
                  Government Registered Event Planning Enterprise • Vittukatti, Thiruthuraipoondi, Tiruvarur District
                </p>
              </div>

              <button
                onClick={() => {
                  setLightboxOpen(false);
                  onPlanEvent();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-[#070D1E] font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                <span>Plan Your Event</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
