import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Instagram, Mail, Calendar, Users, Send, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { BRAND_INFO, ALL_SERVICES } from '../data/eventData';
import { EnquiryFormData } from '../types';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    eventDate: '',
    eventLocation: 'Thiruthuraipoondi',
    guestCount: '300-500 guests',
    services: initialService ? [initialService] : ['Wedding', 'Catering Services'],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const availableServices = [
    'Wedding',
    'Destination Wedding',
    'Birthday Parties',
    'Special Occasions',
    'Surprise Events',
    'Corporate Events',
    'Product Launches',
    'Brand Promotions',
    'Celebrity Events',
    'Theme Events',
    'Social Events',
    'Entertainments',
    'Catering Services',
    'Photography & Videography',
    'Wedding Invitation',
    'Thamboolam Bags',
    'Chenda Melam'
  ];

  const handleToggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(srv);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== srv) };
      } else {
        return { ...prev, services: [...prev.services, srv] };
      }
    });
  };

  const handlePhoneChange = (val: string) => {
    setFormData((prev) => ({ ...prev, phone: val }));
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setPhoneError('Please enter a valid 10-digit phone number so we can reach you.');
      return;
    }

    setSubmitted(true);
  };

  const buildWhatsAppUrl = () => {
    const text = `*New Event Enquiry - Amman Event Management*%0A%0A*Name:* ${encodeURIComponent(formData.name || 'Not provided')}%0A*Phone:* ${encodeURIComponent(formData.phone || 'Not provided')}%0A*Event Type:* ${encodeURIComponent(formData.eventType)}%0A*Date:* ${encodeURIComponent(formData.eventDate || 'To be decided')}%0A*Location:* ${encodeURIComponent(formData.eventLocation)}%0A*Estimated Guests:* ${encodeURIComponent(formData.guestCount)}%0A*Services Selected:* ${encodeURIComponent(formData.services.join(', ') || 'General Enquiry')}%0A*Additional Notes:* ${encodeURIComponent(formData.message || 'None')}`;
    return `https://wa.me/919524516821?text=${text}`;
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#091124] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[#13284F] border border-[#DFB76C]/30 text-xs text-[#E6CA65]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider">DIRECT PLANNER CONSULTATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 [text-wrap:balance]">
            Let’s Plan Your Next Celebration
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg [text-wrap:balance]">
            Tell us about your event and let us help turn your ideas into a memorable experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B152B] border border-slate-800 space-y-6">
              <div>
                <span className="text-xs text-[#DFB76C] font-semibold uppercase tracking-wider">
                  Contact The Event Planner
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {BRAND_INFO.plannerName}
                </h3>
                <p className="font-script text-xl text-[#F5D77F]">
                  {BRAND_INFO.title}
                </p>
                <p className="text-xs text-slate-400 mt-2 font-medium">
                  {BRAND_INFO.tamilName}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
                {/* Phone Call */}
                <a
                  href={`tel:${BRAND_INFO.phoneRaw}`}
                  className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#DFB76C]/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#DFB76C]/10 flex items-center justify-center text-[#DFB76C] shrink-0 group-hover:bg-gold-gradient group-hover:text-[#070D1E] transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Phone & WhatsApp</p>
                    <p className="text-base font-bold text-white tracking-wide">{BRAND_INFO.phoneFormatted}</p>
                    <p className="text-[11px] text-emerald-400 font-medium">Available 7 days · Quick reply</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-[#DFB76C]/10 flex items-center justify-center text-[#DFB76C] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Office & Studio Location</p>
                    <p className="text-sm font-bold text-white">Vittukatti, Thiruthuraipoondi</p>
                    <p className="text-xs text-slate-400">Pincode: 614 715, Tamil Nadu</p>
                  </div>
                </div>

                {/* Instagram */}
                <a
                  href={BRAND_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Official Instagram</p>
                    <p className="text-sm font-bold text-white">{BRAND_INFO.instagramHandle}</p>
                    <p className="text-[11px] text-pink-400">Direct Message & Recent Stories</p>
                  </div>
                </a>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Event Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B152B] border border-[#DFB76C]/30 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 px-4 text-center space-y-5 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Thank You, {formData.name || 'Valued Guest'}!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your enquiry for <span className="text-[#DFB76C] font-semibold">{formData.eventType}</span> has been received. J. Balamurugan will review your requirements and call you at <span className="text-white font-semibold font-mono">{formData.phone}</span> shortly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp Now</span>
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] focus:ring-1 focus:ring-[#DFB76C] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="e.g. 95245 16821"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-white text-sm focus:ring-1 outline-none transition-colors ${
                          phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-[#DFB76C] focus:ring-[#DFB76C]'
                        }`}
                      />
                      {phoneError && (
                        <p className="text-[11px] text-red-400 mt-1">{phoneError}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Event Type
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                      >
                        <option value="Wedding">Wedding</option>
                        <option value="Destination Wedding">Destination Wedding</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Product Launch">Product Launch</option>
                        <option value="Brand Promotion">Brand Promotion</option>
                        <option value="Special Occasion">Special Occasion (Sashtiapthapoorthi, etc.)</option>
                        <option value="Surprise Event">Surprise Event</option>
                        <option value="Theme Event">Theme Event</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Guest Count
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                      >
                        <option value="Under 150 guests">Intimate (&lt;150 guests)</option>
                        <option value="150-300 guests">150 – 300 guests</option>
                        <option value="300-600 guests">300 – 600 guests</option>
                        <option value="600-1000 guests">600 – 1,000 guests</option>
                        <option value="1000+ guests">Grand scale (1,000+ guests)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Event Location / Town
                    </label>
                    <input
                      type="text"
                      value={formData.eventLocation}
                      onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                      placeholder="e.g. Thiruthuraipoondi / Tiruvarur / Mannargudi / Chennai"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                    />
                  </div>

                  {/* Multi-Select Services Checkboxes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Services You Require (Check all that apply):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
                      {availableServices.map((srv) => {
                        const isChecked = formData.services.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => handleToggleService(srv)}
                            className={`p-2 rounded-lg text-left text-xs transition-all flex items-center gap-1.5 border cursor-pointer ${
                              isChecked
                                ? 'bg-[#152B52] border-[#DFB76C] text-white font-medium'
                                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 text-[10px] ${isChecked ? 'bg-[#DFB76C] text-[#070D1E]' : 'border border-slate-600'}`}>
                              {isChecked ? '✓' : ''}
                            </span>
                            <span className="truncate">{srv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Specific Requirements or Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your vision, ritual timings, special artist preferences, or specific budget considerations..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gold-gradient bg-gold-gradient-hover text-[#070D1E] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-[#D4AF37]/30 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Event Enquiry</span>
                    </button>

                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-emerald-500/40"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Via WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
