import React from 'react';
import { Compass, SlidersHorizontal, Sparkles, Award, ArrowRight } from 'lucide-react';
import { PLANNING_STEPS } from '../data/eventData';

export const ProcessSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return <Compass className="w-5 h-5 text-[#070D1E]" />;
      case 'SlidersHorizontal': return <SlidersHorizontal className="w-5 h-5 text-[#070D1E]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#070D1E]" />;
      default: return <Award className="w-5 h-5 text-[#070D1E]" />;
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#070D1E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#13284F] border border-[#DFB76C]/30 text-xs text-[#E6CA65]">
            <span className="font-semibold uppercase tracking-wider">STRUCTURED EXECUTION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 [text-wrap:balance]">
            Our 4-Step Planning Journey
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg [text-wrap:balance]">
            How we translate your hopes and milestones into a seamless, stress-free celebration.
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-[#DFB76C]/10 via-[#DFB76C]/60 to-[#DFB76C]/10 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PLANNING_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="flex flex-col bg-[#0B152B] p-6 rounded-2xl border border-slate-800 hover:border-[#DFB76C]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                    {getIcon(step.icon)}
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#DFB76C]/60 group-hover:text-[#DFB76C] transition-colors">
                    {step.step}
                  </span>
                </div>

                <div className="mb-3">
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#DFB76C] tracking-wide">
                    {step.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 flex-1">
                  {step.desc}
                </p>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="font-medium text-[#E6CA65]">Outcome: </span>
                  <span>{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
