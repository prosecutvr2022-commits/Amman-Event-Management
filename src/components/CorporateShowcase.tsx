import React from 'react';
import { Award, Eye, Share2, Star, CheckCircle, ArrowRight, PhoneCall } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';
import { ServiceArtwork } from './ServiceArtwork';

interface CorporateShowcaseProps {
  onDiscussCorporate: () => void;
}

export const CorporateShowcase: React.FC<CorporateShowcaseProps> = ({ onDiscussCorporate }) => {
  const corporateCapabilities = [
    {
      title: 'Corporate Conferences & AGMs',
      desc: 'High-definition AV projection, crystal sound, executive staging, and precise runtime scheduling.',
      icon: Award
    },
    {
      title: 'High-Impact Product Launches',
      desc: 'Curtain-drop mechanisms, synchronized cold pyros, LED reveals, and media broadcast setups.',
      icon: Eye
    },
    {
      title: 'Brand Promotions & Activations',
      desc: 'Canopy roadshows, commercial mall stalls, brand ambassadors, and experiential marketing kiosks.',
      icon: Share2
    },
    {
      title: 'Celebrity & VIP Coordination',
      desc: 'VIP green-rooms, secure backstage access, stage protocols, and media press management.',
      icon: Star
    }
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#091124] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Col */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13284F] border border-[#3B82F6]/30 text-xs text-[#93C5FD]">
              <Award className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span className="font-semibold uppercase tracking-wider">CORPORATE & BRAND PRODUCTION</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight [text-wrap:balance]">
              Events That Bring <br />
              <span className="text-gold-light italic">Brands to Life</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              From executive annual meets and dealer conventions to dramatic product reveals and regional retail activations, Amman Event Management delivers sharp, punctual, and technologically immaculate production.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {corporateCapabilities.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-2">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onDiscussCorporate}
                className="inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-xl shadow-lg hover:shadow-blue-900/30 transition-all cursor-pointer"
              >
                <span>Discuss Your Event</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${BRAND_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-700 bg-slate-900/60 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>Direct Line: {BRAND_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Media Col */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl bg-slate-950">
              <div className="h-80 sm:h-96 w-full">
                <ServiceArtwork id="corporate-events" title="Corporate Stage & LED Wall" />
              </div>
              <div className="p-5 bg-gradient-to-t from-[#091124] to-[#0A1633] border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      Full Audio-Visual & Keynote Rigging
                    </h3>
                    <p className="text-xs text-slate-400">
                      P3/P4 LED Video Walls · Truss Lighting · Wireless Mic Array · Branded Sets
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">
                      Zero Downtime
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
