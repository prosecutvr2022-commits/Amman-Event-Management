import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Layers,
  Award,
  Sparkles,
  HeartHandshake,
  PhoneCall,
  Star,
  ExternalLink,
  MessageSquareQuote,
  Check,
} from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';

interface WhyChooseUsProps {
  onOpenEnquiry: () => void;
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.37 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.63 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const GOOGLE_REVIEWS = [
  {
    id: 'gr-1',
    author: 'Nagarajan Muthukrishnan',
    initial: 'N',
    avatarBg: 'bg-[#1A73E8]',
    reviewCount: '2 reviews',
    timeAgo: '8 months ago',
    tag: 'Equipment & Technician Service',
    rating: 5,
    reaction: '❤️ 2',
    quote:
      'They have provided excellent service with quality high standard equipment and accessories. The technician did his job well during the function. The rate is comparatively reasonable. I strongly recommend them for functions.',
  },
  {
    id: 'gr-2',
    author: 'DURGAGOWRI. G',
    initial: 'D',
    avatarBg: 'bg-[#EA4335]',
    reviewCount: '5 reviews · 1 photo',
    timeAgo: 'a month ago',
    tag: 'Sadangu & Engagement (Decor, Food & Photo)',
    headline: 'Reasonable price',
    rating: 5,
    reaction: null,
    quote:
      'I have booked for my sadangu and engagement for decor, food and photography.very satisfied with their work. Budget Friendly too.',
  },
  {
    id: 'gr-3',
    author: 'Amulkathir Amulkathir',
    initial: 'A',
    avatarBg: 'bg-[#188038]',
    reviewCount: '1 review',
    timeAgo: 'a year ago',
    tag: 'Wedding & Events · Bala & Team',
    headline: 'Highly recommended!',
    rating: 5,
    reaction: '🙏 1',
    quote:
      'I am glad we went with Amman wedding & events . The entire team and especially Bala made sure everything was as per the plan.They make everything turn out into the way you want it to be and fulfill all your expectations and demands. Loved their work. They were amazing!',
  },
];

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenEnquiry }) => {
  const reasons = [
    {
      title: 'Complete Event Planning',
      desc: 'From venue layout and guest timeline to vendor sequencing, we formulate the complete operational strategy.',
      icon: Layers,
    },
    {
      title: 'Creative & Customized Concepts',
      desc: 'Each family and organization has distinct tastes. We build custom stage themes, color palettes, and cultural settings.',
      icon: Sparkles,
    },
    {
      title: 'Attention to Every Detail',
      desc: 'No hurried compromises. We inspect every lighting fixture, floral stem, sound check, and table setting before guests arrive.',
      icon: CheckCircle2,
    },
    {
      title: 'Multiple Services Under One Roof',
      desc: 'You deal with J. Balamurugan directly rather than managing 10 disparate vendors, invoices, and schedules.',
      icon: HeartHandshake,
    },
    {
      title: 'Professional Coordination',
      desc: 'Live on-site direction throughout the event ensures that ceremonies start on time and transitions occur smoothly.',
      icon: ShieldCheck,
    },
    {
      title: 'Traditional & Modern Mastery',
      desc: 'From traditional South Indian Chenda Melam and Thamboolam bags to high-tech corporate LED screens.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#091224] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
        {/* Top 2-Column Grid: Left Narrative + Right 6 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
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
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shrink-0 text-[#070D1E] font-bold text-lg shadow-md">
                  JB
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {BRAND_INFO.plannerName}
                  </h3>
                  <p className="text-xs text-[#DFB76C] font-script text-base">
                    {BRAND_INFO.title} &amp; Founder
                  </p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed italic">
                    &ldquo;My personal commitment is to treat your celebration as if it were my own family’s. Every minute matters, every guest matters.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Google 5-Star Rating Trust Anchor Card */}
            <a
              href={BRAND_INFO.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0C172E] via-[#0E1F42] to-[#0A1428] border border-[#DFB76C]/40 hover:border-[#DFB76C] shadow-xl hover:shadow-[#D4AF37]/20 transition-all duration-300 group"
              title="Click to view our 5-star reviews on Google"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <GoogleIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-xl text-white tracking-tight">5.0</span>
                      <div className="flex items-center text-[#F5B800] gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#F5B800] text-[#F5B800]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      Google 5-Star Customer Reviews
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#DFB76C]/60 text-xs font-semibold text-[#DFB76C] group-hover:text-white transition-all shrink-0">
                  <span className="hidden sm:inline">View Reviews</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gold-gradient rounded-xl shadow-lg hover:shadow-[#D4AF37]/20 transition-all cursor-pointer active:scale-95"
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
                    className="p-5 rounded-2xl bg-[#0C172E] border border-slate-800 hover:border-[#DFB76C]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
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

        {/* Dedicated Google 5-Star Reviews Showcase Section */}
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-[#0D1B36] via-[#0A152B] to-[#070E1E] border border-[#DFB76C]/35 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(223,183,108,0.1),transparent_70%)] pointer-events-none blur-2xl" />

          {/* Header Row: Google Badge + Stats + Action Link */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-white mb-3 backdrop-blur-sm">
                <GoogleIcon className="w-4 h-4" />
                <span className="font-semibold tracking-wide uppercase text-[11px]">
                  Google Verified Reviews · 5.0 Rating
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Loved by Families Across Tamil Nadu
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Read authentic Google feedback from families and clients who trusted{' '}
                <strong className="text-[#DFB76C] font-semibold">{BRAND_INFO.businessName}</strong> for their auspicious celebrations.
              </p>
            </div>

            {/* Direct Google Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={BRAND_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-[#F8F9FA] text-xs font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>Read All Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              </a>

              <a
                href={BRAND_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-[#DFB76C] hover:text-[#FFF2B2] border border-[#DFB76C]/40 text-xs font-semibold transition-colors shadow-md"
              >
                <Star className="w-3.5 h-3.5 fill-[#DFB76C] text-[#DFB76C]" />
                <span>Rate Us on Google</span>
              </a>
            </div>
          </div>

          {/* 3 Authentic Google Review Cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {GOOGLE_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#091224]/90 border border-slate-800 hover:border-[#DFB76C]/60 transition-all duration-300 shadow-xl group hover:-translate-y-1 relative"
              >
                <div>
                  {/* Top Row: Stars + Google G Mark + Time */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-[#F5B800]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F5B800] text-[#F5B800]" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {review.timeAgo}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <GoogleIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Optional Review Title / Highlight */}
                  {review.headline && (
                    <div className="mb-2.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#DFB76C]/15 border border-[#DFB76C]/30 text-[#F5D77F] text-xs font-bold">
                        {review.headline}
                      </span>
                    </div>
                  )}

                  {/* Review Quote */}
                  <div className="relative mb-5">
                    <MessageSquareQuote className="w-6 h-6 text-[#DFB76C]/20 absolute -top-2 -left-1 pointer-events-none" />
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic pl-3">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  {/* Helpful Reaction Pill from Google */}
                  {review.reaction && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[11px] font-semibold text-slate-300">
                        <span>{review.reaction}</span>
                        <span className="text-slate-500 text-[10px]">· Google Helpful</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full ${review.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md`}
                    >
                      {review.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-white truncate">
                          {review.author}
                        </h4>
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0" title="Verified Google Reviewer">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {review.reviewCount}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#DFB76C] font-mono shrink-0 px-2 py-0.5 rounded bg-[#DFB76C]/10 border border-[#DFB76C]/20">
                    {review.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Assurance Strip */}
          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Verified 5.0 Rating based on customer reviews on Google Maps &amp; Google Search
              </span>
            </div>

            <a
              href={BRAND_INFO.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#DFB76C] hover:text-white font-semibold transition-colors group"
            >
              <span>Open Amman Event Management on Google</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
