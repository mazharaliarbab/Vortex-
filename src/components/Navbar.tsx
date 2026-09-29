import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { STORE_CONFIG } from '../data/storeConfig';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  activeSection: string;
  onNavigate: (sectionId: string, categoryFilter?: 'all' | 'jerseys' | 'pants') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId: string, categoryFilter?: 'all' | 'jerseys' | 'pants') => {
    onNavigate(sectionId, categoryFilter);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40 py-3'
            : 'bg-transparent border-b border-white/5 py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="group flex items-center gap-2 text-left focus-visible:outline-none"
            aria-label={`${STORE_CONFIG.storeName} Home`}
          >
            <span className="font-heading text-2xl sm:text-3xl font-black tracking-wider uppercase text-white transition-colors group-hover:text-[#00ff87]">
              {STORE_CONFIG.storeName}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] group-hover:scale-125 transition-transform" />
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase">
            <button
              onClick={() => handleLinkClick('hero')}
              className={`transition-colors hover:text-[#00ff87] ${
                activeSection === 'hero' ? 'text-[#00ff87]' : 'text-zinc-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('catalog', 'jerseys')}
              className={`transition-colors hover:text-[#00ff87] ${
                activeSection === 'jerseys' ? 'text-[#00ff87]' : 'text-zinc-300'
              }`}
            >
              Jerseys
            </button>
            <button
              onClick={() => handleLinkClick('catalog', 'pants')}
              className={`transition-colors hover:text-[#00ff87] ${
                activeSection === 'pants' ? 'text-[#00ff87]' : 'text-zinc-300'
              }`}
            >
              Football Pants
            </button>
            <button
              onClick={() => handleLinkClick('new-arrivals')}
              className="text-zinc-300 transition-colors hover:text-[#00ff87]"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-zinc-300 transition-colors hover:text-[#00ff87]"
            >
              About
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-zinc-300 transition-colors hover:text-[#00ff87]"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search football kits and pants"
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
              className="relative p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-700 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Cart with ${cartCount} items`}
              className="relative flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-700/80 px-3.5 py-2 text-sm font-semibold text-white hover:border-[#00ff87]/50 hover:bg-zinc-850 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]"
            >
              <ShoppingBag className="h-4 w-4 text-[#00ff87]" />
              <span className="hidden sm:inline font-mono tabular-nums text-xs">
                Cart
              </span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00ff87] px-1 text-xs font-bold text-black font-mono">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-zinc-300 hover:text-white rounded-lg lg:hidden hover:bg-zinc-800 focus-visible:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                  {STORE_CONFIG.storeName}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-3 font-heading uppercase text-lg">
                <button
                  onClick={() => handleLinkClick('hero')}
                  className="text-left px-3 py-2 text-zinc-200 hover:text-[#00ff87] hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleLinkClick('catalog', 'jerseys')}
                  className="text-left px-3 py-2 text-zinc-200 hover:text-[#00ff87] hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  Jerseys
                </button>
                <button
                  onClick={() => handleLinkClick('catalog', 'pants')}
                  className="text-left px-3 py-2 text-zinc-200 hover:text-[#00ff87] hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  Football Pants
                </button>
                <button
                  onClick={() => handleLinkClick('new-arrivals')}
                  className="text-left px-3 py-2 text-zinc-200 hover:text-[#00ff87] hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="text-left px-3 py-2 text-zinc-200 hover:text-[#00ff87] hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="text-left px-3 py-2 text-zinc-200 hover:text-[#00ff87] hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  Contact & WhatsApp
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-400 space-y-2">
              <p>Cash on Delivery across Pakistan</p>
              <p className="font-mono text-[#00ff87]">{STORE_CONFIG.contact.phoneFormatted}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
