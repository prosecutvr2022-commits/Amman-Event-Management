import React from 'react';
import { Sparkles, ShieldCheck, Gem, Heart, CheckCircle2 } from 'lucide-react';
import { TRUST_POINTS } from '../data/eventData';

export const TrustStrip: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#DFB76C]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#DFB76C]" />;
      case 'Gem': return <Gem className="w-5 h-5 text-[#DFB76C]" />;
      default: return <Heart className="w-5 h-5 text-[#DFB76C]" />;
    }
  };

  return (
    <section className="relative py-12 bg-[#091124] border-y border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
            Our Guiding Philosophy
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            From Concept to Celebration
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-[#DFB76C]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(point.icon)}
              </div>
              <h3 className="font-serif text-lg font-semibold text-slate-100 mb-2 group-hover:text-[#DFB76C] transition-colors">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
