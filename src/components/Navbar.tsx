import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';

interface NavbarProps {
  onOpenEnquiry: (preSelectedService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Highlight Reel', href: '#featured-video' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Events', href: '#wedding-showcase' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070D1E]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#070D1E]/90 via-[#070D1E]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="flex flex-col group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
          >
            <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-slate-100 group-hover:text-[#DFB76C] transition-colors whitespace-nowrap">
              {BRAND_INFO.businessName}
            </span>
            <span className="text-[11px] text-[#C5A059] tracking-widest uppercase font-sans font-medium flex items-center gap-1.5">
              <span>{BRAND_INFO.plannerName}</span>
              <span className="text-slate-500">·</span>
              <span className="font-script text-sm capitalize text-[#F5D77F]">{BRAND_INFO.title}</span>
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#DFB76C] transition-colors relative py-1 focus-visible:outline-none focus-visible:text-[#DFB76C] whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${BRAND_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-[#DFB76C] transition-colors rounded-lg border border-slate-700 hover:border-[#C5A059]/50 whitespace-nowrap"
              title="Call J. Balamurugan"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFB76C]" />
              <span>{BRAND_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide uppercase text-[#070D1E] bg-gold-gradient bg-gold-gradient-hover rounded-lg shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan Your Event</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us"
              className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-[#DFB76C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070D1E]/98 border-b border-[#D4AF37]/30 px-5 pt-3 pb-6 space-y-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="text-xs text-[#C5A059] font-medium border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>{BRAND_INFO.tamilName}</span>
            <span>{BRAND_INFO.location.address}</span>
          </div>

          <div className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-[#DFB76C] text-base font-medium py-1.5 transition-colors border-b border-slate-800/60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-lg shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Your Event</span>
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${BRAND_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-[#DFB76C]"
              >
                <Phone className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span>Call Us</span>
              </a>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/40"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
