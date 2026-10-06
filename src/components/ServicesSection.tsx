import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Compass, Eye } from 'lucide-react';
import { ALL_SERVICES, SERVICE_CATEGORIES } from '../data/eventData';
import { ServiceCategory, EventService } from '../types';
import { ServiceArtwork } from './ServiceArtwork';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [selectedServiceModal, setSelectedServiceModal] = useState<EventService | null>(null);

  const filteredServices = activeCategory === 'all'
    ? ALL_SERVICES
    : ALL_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#070D1E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#13284F]/80 border border-[#DFB76C]/30 text-xs text-[#E6CA65]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider">WE UNDERTAKE 17+ EVENT CAPABILITIES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 [text-wrap:balance]">
            Everything You Need for a Perfect Event
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed [text-wrap:balance]">
            From intimate celebrations to large-scale events, we take care of the planning, coordination and details.
          </p>
        </div>

        {/* Filter Tabs - compliant with zero-pill rule (interactive segmented controls) */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 bg-[#0D1933] rounded-xl border border-slate-800">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as ServiceCategory)}
                  className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gold-gradient text-[#070D1E] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded ${isActive ? 'bg-[#070D1E]/20 text-[#070D1E]' : 'bg-slate-800 text-slate-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl bg-gradient-to-b from-[#0F1D38] to-[#0A1326] border border-slate-800 hover:border-[#DFB76C]/50 transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5 shadow-xl hover:shadow-[#D4AF37]/10"
            >
              {/* Visual Card Media */}
              <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-slate-950">
                <ServiceArtwork id={service.id} title={service.name} className="w-full h-full" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-[#DFB76C]/50 text-[11px] font-semibold text-[#DFB76C] shadow-lg z-20">
                  {service.highlight}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#DFB76C] transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mb-5 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Highlights feature bullets */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-800/80">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-[#DFB76C] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedServiceModal(service)}
                    className="text-xs font-semibold text-slate-300 hover:text-[#DFB76C] transition-colors inline-flex items-center gap-1.5 py-1.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectService(service.name)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-lg hover:shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0B152B] border border-[#DFB76C]/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-slate-950">
              <ServiceArtwork id={selectedServiceModal.id} title={selectedServiceModal.name} className="w-full h-full" />
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors z-30"
                aria-label="Close Modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#C5A059] uppercase tracking-wider font-semibold">
                  {selectedServiceModal.category}
                </span>
                <span className="text-xs text-slate-400">Amman Event Management</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                {selectedServiceModal.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                {selectedServiceModal.fullDesc}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Included Deliverables & Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {selectedServiceModal.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <Check className="w-3.5 h-3.5 text-[#DFB76C] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = selectedServiceModal.name;
                    setSelectedServiceModal(null);
                    onSelectService(name);
                  }}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-xl shadow-lg cursor-pointer"
                >
                  Book / Enquire For {selectedServiceModal.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
