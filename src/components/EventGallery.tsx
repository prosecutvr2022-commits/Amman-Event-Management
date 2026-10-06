import React, { useState } from 'react';
import { Sparkles, Eye, ArrowRight, MapPin, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/eventData';
import { GalleryItem } from '../types';
import { ServiceArtwork } from './ServiceArtwork';

interface EventGalleryProps {
  onStartPlanning: () => void;
}

export const EventGallery: React.FC<EventGalleryProps> = ({ onStartPlanning }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Highlights' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'corporate', label: 'Corporate Events' },
    { id: 'birthday', label: 'Birthday Events' },
    { id: 'themes', label: 'Theme Events' },
    { id: 'special', label: 'Special Occasions' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => {
        if (selectedCategory === 'themes') return item.category === 'birthday' || item.id === 'g1';
        return item.category === selectedCategory;
      });

  return (
    <section id="gallery" className="relative py-20 lg:py-28 bg-[#091124] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#13284F] border border-[#DFB76C]/30 text-xs text-[#E6CA65]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider">EVENT PORTFOLIO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 [text-wrap:balance]">
            Moments We’ve Crafted
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg [text-wrap:balance]">
            Explore our stage decorations, cultural processions, corporate summit setups, and celebratory moments.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1 bg-slate-900 rounded-xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gold-gradient text-[#070D1E] font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-[#DFB76C]/50 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-lg"
            >
              <div className="h-56 relative w-full overflow-hidden bg-slate-950">
                <ServiceArtwork id={item.id} title={item.title} className="w-full h-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity pointer-events-none" />

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[11px] font-medium text-[#DFB76C] border border-white/10">
                  {item.tag}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 pointer-events-none">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-[#DFB76C]" />
                    {item.location}
                  </span>
                  <span className="p-1 rounded bg-[#DFB76C]/20 text-[#DFB76C] group-hover:bg-gold-gradient group-hover:text-[#070D1E] transition-colors pointer-events-auto">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-serif text-base font-bold text-white group-hover:text-[#DFB76C] transition-colors line-clamp-1 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0F1E3D] via-[#11244C] to-[#0A1428] border border-[#DFB76C]/40 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#DFB76C]/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
            Want Your Event to Look Like This?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Let J. Balamurugan customize every detail of your stage, flowers, lighting, and hospitality.
          </p>
          <button
            onClick={onStartPlanning}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient bg-gold-gradient-hover rounded-xl shadow-xl hover:shadow-[#D4AF37]/30 transition-all cursor-pointer active:scale-95"
          >
            <span>Start Planning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B152B] border border-[#DFB76C]/40 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-slate-950">
              <ServiceArtwork id={activeItem.id} title={activeItem.title} className="w-full h-full" />
              <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-xs text-[#DFB76C] border border-[#DFB76C]/30">
                {activeItem.tag}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>{activeItem.location}</span>
                <span>·</span>
                <span>Amman Event Management</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                {activeItem.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {activeItem.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveItem(null);
                    onStartPlanning();
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-xl shadow-md cursor-pointer"
                >
                  Plan Similar Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
