import React from 'react';
import { Instagram, Youtube, Facebook, QrCode, ExternalLink, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/eventData';
import { ServiceArtwork } from './ServiceArtwork';

export const SocialSection: React.FC = () => {
  const instaPosts = [
    { id: 'wedding', title: 'Grand Royal Mandapam Decor in Thiruthuraipoondi #AmmanEvents', likes: '342' },
    { id: 'chenda-melam', title: 'Electrifying Chenda Melam Entrance for Groom Procession #KeralaMelam', likes: '589' },
    { id: 'catering-services', title: 'Traditional South Indian Kalyana Virundhu Feast #TamilWeddingCatering', likes: '421' },
    { id: 'birthday-parties', title: 'Magical Fairytale 1st Birthday Setup #BirthdayPlanner', likes: '298' },
    { id: 'corporate-events', title: 'LED Wall Keynote & Summit Audio Production #CorporateEvents', likes: '264' },
    { id: 'thamboolam-bags', title: 'Handcrafted Jute Thamboolam Return Gifts with Auspicious Prints', likes: '377' },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#070D1E] border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-950/60 to-pink-950/60 border border-pink-500/30 text-xs text-pink-300">
            <Instagram className="w-3.5 h-3.5" />
            <span className="font-semibold">{BRAND_INFO.instagramHandle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 [text-wrap:balance]">
            Follow Our Event Stories
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg [text-wrap:balance]">
            Catch live glimpses of decor setups, Baraat beats, and banquet presentations as they happen across Tamil Nadu.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {instaPosts.map((post, idx) => (
            <a
              key={idx}
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-pink-500/50 aspect-square transition-all duration-300 shadow-md block"
            >
              <div className="w-full h-full">
                <ServiceArtwork id={post.id} title={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              {/* Instagram overlay on hover */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <div className="flex items-center justify-between">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span className="flex items-center gap-1 text-[11px] text-pink-200">
                    <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                    {post.likes}
                  </span>
                </div>
                <p className="text-[10px] text-slate-200 line-clamp-3 leading-tight">
                  {post.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Social Presence Card + QR Catalogue Card from Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* QR Catalogue Card inspired by banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F1E3D] to-[#0A1428] border border-[#DFB76C]/30 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-28 h-28 rounded-xl bg-white p-2.5 flex items-center justify-center shrink-0 shadow-lg border border-[#DFB76C]/40">
              {/* Clean vector QR code representation */}
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                {/* QR corners */}
                <rect x="5" y="5" width="30" height="30" fill="#0B132B" rx="3" />
                <rect x="10" y="10" width="20" height="20" fill="white" />
                <rect x="15" y="15" width="10" height="10" fill="#0B132B" />

                <rect x="65" y="5" width="30" height="30" fill="#0B132B" rx="3" />
                <rect x="70" y="10" width="20" height="20" fill="white" />
                <rect x="75" y="15" width="10" height="10" fill="#0B132B" />

                <rect x="5" y="65" width="30" height="30" fill="#0B132B" rx="3" />
                <rect x="10" y="70" width="20" height="20" fill="white" />
                <rect x="15" y="75" width="10" height="10" fill="#0B132B" />

                {/* QR payload dots */}
                <rect x="42" y="10" width="8" height="8" fill="#0B132B" />
                <rect x="42" y="24" width="8" height="8" fill="#0B132B" />
                <rect x="54" y="16" width="6" height="6" fill="#0B132B" />
                <rect x="42" y="42" width="16" height="16" fill="#25D366" rx="2" />
                <rect x="65" y="42" width="8" height="8" fill="#0B132B" />
                <rect x="78" y="52" width="12" height="6" fill="#0B132B" />
                <rect x="42" y="65" width="8" height="12" fill="#0B132B" />
                <rect x="55" y="75" width="10" height="10" fill="#0B132B" />
                <rect x="70" y="70" width="14" height="14" fill="#0B132B" />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <span className="text-[11px] text-[#DFB76C] uppercase font-bold tracking-widest">
                From The Official Banner
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                Scan for Digital Catalogue
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-3 leading-relaxed">
                Access full event packages, menu lists, and stage photography directly on WhatsApp.
              </p>
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Catalogue</span>
              </a>
            </div>
          </div>

          {/* Channels & Social Links */}
          <div className="p-6 rounded-2xl bg-[#0B152B] border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                Connect With Amman Events
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-0.5 mb-1">
                {BRAND_INFO.tamilName}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Watch full video recitals of Chenda Melam and wedding walkthroughs on our social channels.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-pink-600/20 text-pink-300 border border-pink-500/40 text-xs font-semibold hover:bg-pink-600/30 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>

              <a
                href={`https://www.facebook.com/search/top?q=Amman%20Event%20Management`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/40 text-xs font-semibold hover:bg-blue-600/30 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook</span>
              </a>

              <a
                href={`https://www.youtube.com/results?search_query=Amman+Event+Management+Thiruthuraipoondi`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600/20 text-red-300 border border-red-500/40 text-xs font-semibold hover:bg-red-600/30 transition-colors"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
