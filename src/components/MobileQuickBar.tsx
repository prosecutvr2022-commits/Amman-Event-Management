import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';

interface MobileQuickBarProps {
  onOpenEnquiry: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#070D1E]/95 backdrop-blur-md border-t border-[#DFB76C]/30 px-3 py-2 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2 items-center">
        <a
          href={`tel:${BRAND_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 active:bg-slate-800 text-[11px] font-medium"
        >
          <Phone className="w-4 h-4 text-[#DFB76C] mb-0.5" />
          <span>Call Now</span>
        </a>

        <a
          href={BRAND_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 active:bg-emerald-900 text-[11px] font-semibold"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenEnquiry}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-gold-gradient text-[#070D1E] active:scale-95 text-[11px] font-bold shadow-md cursor-pointer"
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>Plan Event</span>
        </button>
      </div>
    </div>
  );
};
