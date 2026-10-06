import React from 'react';
import { Sparkles, MessageCircle, ChevronRight, Phone } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';
import { MandalaMotif } from './MandalaMotif';

interface FinalCTAProps {
  onPlanEvent: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onPlanEvent }) => {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[#091124] via-[#0D1A38] to-[#060B18] overflow-hidden border-t border-[#DFB76C]/30 text-center">
      {/* Decorative Mandalas */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
        <MandalaMotif size={480} opacity={0.08} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-slate-900/90 border border-[#DFB76C]/40 text-xs text-[#E6CA65]">
          <span className="font-semibold">{BRAND_INFO.businessName}</span>
          <span>·</span>
          <span>{BRAND_INFO.tamilName}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 [text-wrap:balance]">
          Let’s Create Something <br />
          <span className="text-gold-light italic">Unforgettable.</span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed [text-wrap:balance]">
          From the first idea to the final celebration, let Amman Event Management take care of your event.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
          <button
            onClick={onPlanEvent}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 text-sm font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient bg-gold-gradient-hover rounded-xl shadow-2xl hover:shadow-[#D4AF37]/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            <span>Plan Your Event</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl border border-emerald-500/40 shadow-xl hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 text-emerald-200" />
            <span>WhatsApp Us</span>
            <span className="text-xs bg-emerald-950/60 px-2.5 py-0.5 rounded text-emerald-200 font-mono">
              {BRAND_INFO.phone}
            </span>
          </a>
        </div>

        {/* Reassurance text */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DFB76C]" />
            Free Consultation & Estimate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DFB76C]" />
            Direct Planner Commitment
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DFB76C]" />
            Serving All Tamil Nadu Districts
          </span>
        </div>
      </div>
    </section>
  );
};
