import React from 'react';
import { Calendar, Palette, Utensils, Music, Camera, Video, Gift, ShoppingBag, Bell, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';

interface CompleteSolutionsProps {
  onSelectService: (serviceName: string) => void;
}

export const CompleteSolutions: React.FC<CompleteSolutionsProps> = ({ onSelectService }) => {
  const solutions = [
    { title: 'Event Planning', icon: Calendar, highlight: 'Master schedules & coordination', target: 'Wedding' },
    { title: 'Decor & Theme', icon: Palette, highlight: 'Custom mandaps, florals & lighting', target: 'Theme Events' },
    { title: 'Catering Services', icon: Utensils, highlight: 'Kalyana virundhu & multi-cuisine', target: 'Catering Services' },
    { title: 'Entertainment', icon: Music, highlight: 'Bands, DJs, anchors & mimicry', target: 'Entertainments' },
    { title: 'Photography', icon: Camera, highlight: 'Candid portraits & traditional albums', target: 'Photography & Videography' },
    { title: 'Videography', icon: Video, highlight: 'Cinematic 4K films & drone shots', target: 'Photography & Videography' },
    { title: 'Wedding Invitations', icon: Gift, highlight: 'Luxury print cards & video invites', target: 'Wedding Invitation' },
    { title: 'Thamboolam Bags', icon: ShoppingBag, highlight: 'Eco-friendly printed return gifts', target: 'Thamboolam Bags' },
    { title: 'Chenda Melam', icon: Bell, highlight: 'Royal Kerala & Tamil percussion', target: 'Chenda Melam' },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#070D1E] overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#13284F] border border-[#DFB76C]/30 text-xs text-[#E6CA65]">
            <span className="font-semibold uppercase tracking-wider">ALL-IN-ONE CONVENIENCE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 [text-wrap:balance]">
            One Event Planner. Multiple Event Solutions.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg [text-wrap:balance]">
            Forget the stress of negotiating with ten separate vendors. J. Balamurugan unifies every service into one seamless, synchronized master contract.
          </p>
        </div>

        {/* 9 Icon Blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectService(item.target)}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0E1B36] to-[#0A1326] border border-slate-800 hover:border-[#DFB76C]/50 transition-all duration-300 group hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#DFB76C]/10 border border-[#DFB76C]/20 flex items-center justify-center text-[#DFB76C] mb-4 group-hover:bg-gold-gradient group-hover:text-[#070D1E] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-[#DFB76C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {item.highlight}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-[#E6CA65] font-medium">
                  <span>Explore service</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0B152B] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-white">
              Planning a complex multi-service celebration?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Bundle catering, decor, photography, invitations, and Chenda Melam for unified event pricing and zero miscommunication.
            </p>
          </div>
          <button
            onClick={() => onSelectService('Wedding')}
            className="shrink-0 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-xl shadow-md cursor-pointer hover:shadow-[#D4AF37]/20 transition-all"
          >
            Get Custom Bundle Quote
          </button>
        </div>
      </div>
    </section>
  );
};
