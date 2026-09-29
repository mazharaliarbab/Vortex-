import React from 'react';
import { STORE_CONFIG } from '../data/storeConfig';
import { ShieldCheck, Truck, RotateCcw, Instagram, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string, categoryFilter?: 'all' | 'jerseys' | 'pants') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800 bg-[#070709] text-zinc-400">
      
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Truck className="h-5 w-5 text-[#00ff87]" />
              <div>
                <div className="text-xs font-bold uppercase text-white font-mono">Cash on Delivery</div>
                <div className="text-[11px] text-zinc-500">Pay upon parcel arrival at your doorstep</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#00ff87]" />
              <div>
                <div className="text-xs font-bold uppercase text-white font-mono">100% Quality Inspected</div>
                <div className="text-[11px] text-zinc-500">AeroKnit fabrics & reinforced stitching</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <RotateCcw className="h-5 w-5 text-[#00ff87]" />
              <div>
                <div className="text-xs font-bold uppercase text-white font-mono">7-Day Fit Exchange</div>
                <div className="text-[11px] text-zinc-500">Hassle-free size replacement support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Store Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-heading text-3xl font-black uppercase tracking-wider text-white">
                {STORE_CONFIG.storeName}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#00ff87]" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {STORE_CONFIG.tagline} Engineered for grassroots ballers, academy prospects, and dedicated fans across Pakistan.
            </p>
            <div className="text-xs font-mono text-zinc-500 space-y-1">
              <p>Direct Inquiries: <span className="text-zinc-300">{STORE_CONFIG.contact.phoneFormatted}</span></p>
              <p>Email: <span className="text-zinc-300">{STORE_CONFIG.contact.email}</span></p>
            </div>
          </div>

          {/* Column 2: Shop Catalog */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'jerseys')}
                  className="hover:text-[#00ff87] transition-colors"
                >
                  Match Jerseys
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'pants')}
                  className="hover:text-[#00ff87] transition-colors"
                >
                  Football Pants
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('new-arrivals')}
                  className="hover:text-[#00ff87] transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('special-offer')}
                  className="hover:text-[#00ff87] transition-colors text-[#00ff87]"
                >
                  Matchday Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#00ff87] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#00ff87] transition-colors"
                >
                  About Our Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#00ff87] transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE_CONFIG.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00ff87] transition-colors"
                >
                  WhatsApp Helpdesk
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Social */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Flagship Hub
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {STORE_CONFIG.contact.location}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={STORE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#00ff87] hover:border-[#00ff87] transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${STORE_CONFIG.contact.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#00ff87] hover:border-[#00ff87] transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={`tel:${STORE_CONFIG.contact.phone}`}
                aria-label="Phone"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#00ff87] hover:border-[#00ff87] transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-zinc-500">
            © {new Date().getFullYear()} {STORE_CONFIG.storeName}. All rights reserved. Built for football enthusiasts.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-[#00ff87] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
