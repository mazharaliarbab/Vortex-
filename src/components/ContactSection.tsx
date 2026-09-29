import React, { useState } from 'react';
import { STORE_CONFIG } from '../data/storeConfig';
import { MessageCircle, Phone, Mail, Instagram, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const whatsappUrl = `https://wa.me/${STORE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    STORE_CONFIG.contact.whatsappDefaultMessage
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    setIsSent(true);
    onShowToast("Inquiry sent! Our customer team will contact you shortly.");
    setTimeout(() => {
      setFormName('');
      setFormPhone('');
      setFormMessage('');
      setIsSent(false);
    }, 2500);
  };

  return (
    <section id="contact" className="py-20 bg-[#09090b] border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00ff87]">
            Connect With The Squad
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            CONTACT & SUPPORT
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Have questions regarding sizing, custom team kits, or delivery status? Chat with us on WhatsApp or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Action Cards */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Primary WhatsApp Card (Clickable) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-6 transition-all hover:bg-[#25D366]/15 hover:border-[#25D366] hover:shadow-[0_0_30px_rgba(37,211,102,0.2)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#25D366] text-black">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#25D366] font-bold">Fastest Response</div>
                    <div className="font-heading text-2xl font-bold uppercase text-white">Chat On WhatsApp</div>
                    <div className="text-xs text-zinc-300 font-mono mt-0.5">{STORE_CONFIG.contact.whatsappDisplay}</div>
                  </div>
                </div>
                <div className="hidden sm:block text-xs font-bold uppercase bg-black/60 px-3 py-1.5 rounded-lg text-[#25D366] border border-[#25D366]/30">
                  Open Chat
                </div>
              </div>
            </a>

            {/* Grid of Other Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone */}
              <a
                href={`tel:${STORE_CONFIG.contact.phone}`}
                className="rounded-xl border border-zinc-800 bg-[#121217] p-5 hover:border-zinc-700 transition-colors group block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-[#00ff87]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-zinc-500">Call Us</div>
                    <div className="text-xs font-bold text-white truncate">{STORE_CONFIG.contact.phoneFormatted}</div>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${STORE_CONFIG.contact.email}`}
                className="rounded-xl border border-zinc-800 bg-[#121217] p-5 hover:border-zinc-700 transition-colors group block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-[#00ff87]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-zinc-500">Email Inquiry</div>
                    <div className="text-xs font-bold text-white truncate">{STORE_CONFIG.contact.email}</div>
                  </div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={STORE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-zinc-800 bg-[#121217] p-5 hover:border-zinc-700 transition-colors group block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-[#00ff87]">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-zinc-500">Official Instagram</div>
                    <div className="text-xs font-bold text-white truncate">{STORE_CONFIG.contact.instagramHandle}</div>
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="rounded-xl border border-zinc-800 bg-[#121217] p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-zinc-500">Store Flagship</div>
                    <div className="text-xs font-bold text-white truncate">{STORE_CONFIG.contact.city}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Operating Hours Note */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
              <Clock className="h-4 w-4 text-[#00ff87] shrink-0" />
              <span>Customer Helpdesk Hours: {STORE_CONFIG.contact.openingHours}</span>
            </div>

          </div>

          {/* Right Column: Quick Web Message Form */}
          <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-[#121217] p-6 sm:p-8">
            <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-white mb-2">
              SEND US A DIRECT INQUIRY
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Need team kit customization or have specific questions? Leave a message below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bilal Ahmed"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#00ff87] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="0300 1234567"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#00ff87] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                  Message / Order Query
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What kit or sizes are you looking for?"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-[#00ff87] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSent}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#00ff87] py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black hover:bg-[#00e676] transition-all hover:shadow-[0_0_20px_rgba(0,255,135,0.4)] disabled:opacity-50 active:scale-98"
              >
                {isSent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Message Submitted</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
