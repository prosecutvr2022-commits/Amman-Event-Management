import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, MessageCircle, Check, Phone } from 'lucide-react';
import { BRAND_INFO, ALL_SERVICES } from '../data/eventData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  preSelectedService
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('Thiruthuraipoondi');
  const [guestCount, setGuestCount] = useState('300-600 guests');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (preSelectedService) {
      setSelectedServices((prev) => 
        prev.includes(preSelectedService) ? prev : [...prev, preSelectedService]
      );
      if (preSelectedService.toLowerCase().includes('wedding')) {
        setEventType('Wedding');
      } else if (preSelectedService.toLowerCase().includes('corporate')) {
        setEventType('Corporate Event');
      } else if (preSelectedService.toLowerCase().includes('birthday')) {
        setEventType('Birthday Party');
      }
    }
  }, [preSelectedService]);

  if (!isOpen) return null;

  const quickServices = [
    'Wedding',
    'Destination Wedding',
    'Catering Services',
    'Photography & Videography',
    'Chenda Melam',
    'Wedding Invitation',
    'Thamboolam Bags',
    'Corporate Events',
    'Product Launches',
    'Birthday Parties',
    'Theme Events',
    'Surprise Events'
  ];

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const getWhatsAppMessageUrl = () => {
    const text = `*New Event Planning Request*%0A%0A*Name:* ${encodeURIComponent(name || 'Customer')}%0A*Phone:* ${encodeURIComponent(phone || 'Not shared')}%0A*Event:* ${encodeURIComponent(eventType)}%0A*Date:* ${encodeURIComponent(eventDate || 'TBD')}%0A*Location:* ${encodeURIComponent(location)}%0A*Guests:* ${encodeURIComponent(guestCount)}%0A*Services:* ${encodeURIComponent(selectedServices.join(', ') || 'Consultation')}%0A*Details:* ${encodeURIComponent(notes || 'Please share packages & availability.')}`;
    return `https://wa.me/919524516821?text=${text}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 8) {
      setPhoneError('Please enter a valid phone number');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0B152B] border border-[#DFB76C]/40 shadow-2xl p-6 sm:p-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center hover:border-[#DFB76C] transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Event Request Received!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              J. Balamurugan will contact you shortly regarding your <span className="text-[#DFB76C] font-semibold">{eventType}</span> plans.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-medium hover:text-white"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-[#DFB76C] font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plan Your Celebration with J. Balamurugan</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Customize Your Event Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Tell us what you envision. We’ll curate the stage, catering, photography, and music to match your expectations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananth / Priya"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError('');
                    }}
                    placeholder="e.g. 95245 16821"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-white text-sm focus:border-[#DFB76C] outline-none ${
                      phoneError ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {phoneError && <p className="text-[11px] text-red-400 mt-1">{phoneError}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Destination Wedding">Destination Wedding</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Special Occasion">Special Occasion</option>
                    <option value="Surprise Event">Surprise Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Estimated Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Guest Count
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                  >
                    <option value="Under 150">Intimate (&lt;150)</option>
                    <option value="150-300">150 - 300 guests</option>
                    <option value="300-600">300 - 600 guests</option>
                    <option value="600-1000">600 - 1000 guests</option>
                    <option value="1000+">1000+ guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Event Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Thiruthuraipoondi / Tiruvarur"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Services to Include:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {quickServices.map((srv) => {
                    const active = selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`p-2 rounded-lg text-left text-xs transition-all flex items-center gap-1.5 border cursor-pointer ${
                          active
                            ? 'bg-[#152B52] border-[#DFB76C] text-white font-medium'
                            : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 text-[10px] ${active ? 'bg-[#DFB76C] text-[#070D1E]' : 'border border-slate-600'}`}>
                          {active ? '✓' : ''}
                        </span>
                        <span className="truncate">{srv}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specific Requests / Ideas
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any particular theme, budget, or family traditions..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-[#DFB76C] outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gold-gradient bg-gold-gradient-hover text-[#070D1E] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-[#D4AF37]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Request</span>
                </button>

                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-emerald-500/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
