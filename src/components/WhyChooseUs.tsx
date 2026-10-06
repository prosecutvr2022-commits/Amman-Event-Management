import React from 'react';
import { ShieldCheck, CheckCircle2, Users, Layers, Award, Sparkles, HeartHandshake, PhoneCall } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';

interface WhyChooseUsProps {
  onOpenEnquiry: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenEnquiry }) => {
  const reasons = [
    {
      title: 'Complete Event Planning',
      desc: 'From venue layout and guest timeline to vendor sequencing, we formulate the complete operational strategy.',
      icon: Layers
    },
    {
      title: 'Creative & Customized Concepts',
      desc: 'Each family and organization has distinct tastes. We build custom stage themes, color palettes, and cultural settings.',
      icon: Sparkles
    },
    {
      title: 'Attention to Every Detail',
      desc: 'No hurried compromises. We inspect every lighting fixture, floral stem, sound check, and table setting before guests arrive.',
      icon: CheckCircle2
    },
    {
      title: 'Multiple Services Under One Roof',
      desc: 'You deal with J. Balamurugan directly rather than managing 10 disparate vendors, invoices, and schedules.',
      icon: HeartHandshake
    },
    {
      title: 'Professional Coordination',
      desc: 'Live on-site direction throughout the event ensures that ceremonies start on time and transitions occur smoothly.',
      icon: ShieldCheck
    },
    {
      title: 'Traditional & Modern Mastery',
      desc: 'From traditional South Indian Chenda Melam and Thamboolam bags to high-tech corporate LED screens.',
      icon: Award
    }
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#091224] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13284F] border border-[#DFB76C]/30 text-xs text-[#E6CA65]">
              <span className="font-semibold uppercase tracking-wider">WHY CHOOSE US</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight [text-wrap:balance]">
              Your Event. <br />
              <span className="text-gold-light italic">Carefully Planned.</span> <br />
              Beautifully Executed.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Organizing an event can easily become exhausting when you are juggling decorators, caterers, photographers, and audio teams. Amman Event Management gives you total peace of mind.
            </p>

            {/* Event Planner Direct Promise Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0F1E3D] to-[#0A1428] border border-[#DFB76C]/30 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shrink-0 text-[#070D1E] font-bold text-lg">
                  JB
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {BRAND_INFO.plannerName}
                  </h3>
                  <p className="text-xs text-[#DFB76C] font-script text-base">
                    {BRAND_INFO.title} & Founder
                  </p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed italic">
                    "My personal commitment is to treat your celebration as if it were my own family’s. Every minute matters, every guest matters."
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-xl shadow-lg hover:shadow-[#D4AF37]/20 transition-all cursor-pointer"
              >
                Schedule Consultation
              </button>
              <a
                href={`tel:${BRAND_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-700 hover:border-slate-500 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#DFB76C]" />
                <span>Call {BRAND_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: 6 Core Pillars Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {reasons.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0C172E] border border-slate-800 hover:border-[#DFB76C]/40 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#DFB76C]/10 border border-[#DFB76C]/20 flex items-center justify-center text-[#DFB76C] mb-3 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#DFB76C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
