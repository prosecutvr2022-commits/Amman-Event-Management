import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/eventData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-[#091124] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#13284F] border border-[#DFB76C]/30 text-xs text-[#E6CA65]">
            <span className="font-semibold uppercase tracking-wider">CLIENT EXPERIENCES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 [text-wrap:balance]">
            Trusted by Families & Organizations
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg [text-wrap:balance]">
            Words from clients who entrusted their weddings, milestone birthdays, and company launches to Amman Event Management.
          </p>
        </div>

        {/* Testimonial Showcase */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0F1E3D] to-[#0A1428] border border-[#DFB76C]/30 p-8 sm:p-12 shadow-2xl">
            <Quote className="w-12 h-12 text-[#DFB76C]/20 mb-6" />

            <p className="font-serif text-lg sm:text-2xl text-slate-100 italic leading-relaxed mb-8 [text-wrap:balance]">
              "{current.quote}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#DFB76C] font-medium mt-0.5">
                  {current.event}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{current.location}</span>
                  <span>·</span>
                  <span>{current.date}</span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#DFB76C] transition-colors cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-xs text-slate-400 font-mono px-2">
                  {currentIndex + 1} / {TESTIMONIALS.length}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#DFB76C] transition-colors cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Miniature Grid of Other Clients */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#11244C] border-[#DFB76C] shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <p className="text-xs font-bold text-slate-200 truncate">{t.name}</p>
                <p className="text-[11px] text-[#DFB76C] truncate">{t.event}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
