import React from 'react';
import { Phone, MapPin, Instagram, Facebook, Youtube, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';

interface FooterProps {
  onOpenEnquiry: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'All Services', href: '#services' },
    { label: 'Weddings', href: '#wedding-showcase' },
    { label: 'Event Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact & Enquiry', href: '#contact' },
  ];

  const servicesList = [
    'Wedding',
    'Corporate Events',
    'Birthday Parties',
    'Product Launches',
    'Destination Wedding',
    'Catering Services',
    'Photography & Videography',
    'Chenda Melam',
    'Thamboolam Bags'
  ];

  return (
    <footer className="relative bg-[#050A15] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h3 className="font-display text-xl font-bold tracking-wider text-white">
                {BRAND_INFO.businessName}
              </h3>
              <p className="text-xs text-[#E6CA65] font-medium mt-0.5">
                {BRAND_INFO.tamilName}
              </p>
            </div>

            <div className="pt-1">
              <p className="font-serif text-lg font-bold text-white">
                {BRAND_INFO.plannerName}
              </p>
              <p className="font-script text-xl text-[#DFB76C]">
                {BRAND_INFO.title}
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Complete professional event management, creative wedding stages, corporate AV setups, traditional catering, and cultural entertainment orchestrated with heartfelt dedication.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/search/top?q=Amman%20Event%20Management"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/results?search_query=Amman+Event+Management+Thiruthuraipoondi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-500/50 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#DFB76C] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="space-y-1.5 text-xs">
              {servicesList.map((srv) => (
                <li key={srv}>
                  <button
                    onClick={() => onOpenEnquiry(srv)}
                    className="hover:text-[#DFB76C] transition-colors text-left cursor-pointer"
                  >
                    {srv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Office & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${BRAND_INFO.phoneRaw}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-[#DFB76C] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#DFB76C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{BRAND_INFO.phoneFormatted}</p>
                  <p className="text-[11px] text-slate-500">Call / WhatsApp</p>
                </div>
              </a>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#DFB76C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{BRAND_INFO.location.address}</p>
                  <p className="text-[11px] text-slate-400">Pincode: {BRAND_INFO.location.pincode}</p>
                  <p className="text-[11px] text-slate-500">{BRAND_INFO.location.district}, Tamil Nadu</p>
                </div>
              </div>

              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <span>{BRAND_INFO.instagramHandle}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-900 border border-[#DFB76C]/40 text-[#DFB76C] hover:bg-gold-gradient hover:text-[#070D1E] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {BRAND_INFO.businessName}. All rights reserved. Planned & managed by {BRAND_INFO.plannerName}.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-[#DFB76C] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
