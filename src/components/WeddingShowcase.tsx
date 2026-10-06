import React from 'react';
import { Heart, Sparkles, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';
import { ServiceArtwork } from './ServiceArtwork';
import { MandalaMotif } from './MandalaMotif';

interface WeddingShowcaseProps {
  onPlanWedding: () => void;
}

export const WeddingShowcase: React.FC<WeddingShowcaseProps> = ({ onPlanWedding }) => {
  const weddingServices = [
    { title: 'Wedding & Reception Planning', desc: 'Auspicious Muhurtham stage decor, grand arches, and VIP guest management.' },
    { title: 'Destination Weddings', desc: 'Curated coastal, heritage and resort weddings across Tamil Nadu with guest transit.' },
    { title: 'Chenda Melam Percussion', desc: 'Authentic 10-15 artist royal Kerala / Tamil percussion for high-energy Baraat entries.' },
    { title: 'Traditional Catering & Banquets', desc: 'Sumptuous Kalyana Virundhu on fresh banana leaves prepared by premier culinary masters.' },
    { title: 'Candid 4K Photography & Drone', desc: 'Pre-wedding shoots, cinematic films, traditional photo albums, and live LED streaming.' },
    { title: 'Wedding Invitations & Thamboolam Bags', desc: 'Custom printed luxury invites, e-cards, and personalized eco-friendly return gift bags.' },
  ];

  return (
    <section id="wedding-showcase" className="relative py-20 lg:py-28 bg-[#070D1E] overflow-hidden">
      {/* Decorative Mandala watermark in background */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <MandalaMotif size={360} opacity={0.15} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase Col */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Grand Stage Decor & Full Coordination Showcase Card */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#DFB76C]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#050A18] flex flex-col items-center">
              {/* Header Ribbon */}
              <div className="w-full flex items-center justify-between px-5 py-3 border-b border-[#DFB76C]/30 bg-[#0B152B]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#DFB76C]" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5D77F]">
                    Grand Stage Decor &amp; Full Coordination
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#DFB76C] bg-black/60 px-3 py-1 rounded-full border border-[#DFB76C]/30">
                  Featured Masterpiece
                </span>
              </div>

              {/* Unobscured 1:1 Showcase Image Container */}
              <div className="w-full aspect-square max-w-[500px] flex items-center justify-center p-2 sm:p-4">
                <ServiceArtwork id="wedding" title="Grand Stage Decor & Full Coordination" className="w-full h-full" />
              </div>

              {/* Information Strip below the image without obscuring any details */}
              <div className="w-full px-5 py-3 border-t border-[#DFB76C]/25 bg-[#091224] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-serif font-bold text-white text-xs sm:text-sm">South Indian Wedding &amp; Reception Decor</span>
                </div>
                <span className="text-[#F5D77F] font-medium hidden sm:inline text-xs">All 5 Services Included</span>
              </div>
            </div>

            {/* Sub-strip with Chenda Melam & Thamboolam previews */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-36 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-950">
                <ServiceArtwork id="chenda-melam" title="Chenda Melam" />
                <div className="absolute bottom-2 left-2 text-[11px] font-bold text-[#FCA5A5] bg-black/70 px-2 py-0.5 rounded">
                  Chenda Melam Troupe
                </div>
              </div>
              <div className="h-36 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-950">
                <ServiceArtwork id="thamboolam-bags" title="Thamboolam Bags" />
                <div className="absolute bottom-2 left-2 text-[11px] font-bold text-[#A7F3D0] bg-black/70 px-2 py-0.5 rounded">
                  Thamboolam Return Gifts
                </div>
              </div>
            </div>
          </div>

          {/* Copy and Services Col */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13284F] border border-[#DFB76C]/30 text-xs text-[#E6CA65]">
              <Heart className="w-3.5 h-3.5 fill-[#DFB76C] text-[#DFB76C]" />
              <span className="font-semibold uppercase tracking-wider">WEDDINGS & CELEBRATIONS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight [text-wrap:balance]">
              Beautiful Beginnings Deserve <br />
              <span className="text-gold-light italic">Beautiful Celebrations</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your wedding is one of the most cherished milestones of your life. At Amman Event Management, J. Balamurugan blends sacred South Indian rituals with majestic visual elegance and attentive family hospitality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {weddingServices.map((srv, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0C172E] border border-slate-800/90 hover:border-[#DFB76C]/30 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#DFB76C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                        {srv.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onPlanWedding}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-xl shadow-xl hover:shadow-[#D4AF37]/30 transition-all cursor-pointer active:scale-95"
              >
                <span>Plan My Wedding</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/919524516821?text=Hi%20Amman%20Event%20Management%2C%20I%20would%20like%20to%20discuss%20our%20upcoming%20wedding%20planning.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white rounded-xl border border-slate-700 bg-slate-900/60 hover:border-slate-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Wedding Inquiry on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
