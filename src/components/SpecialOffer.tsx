import React from 'react';
import { ArrowRight, Tag, Percent } from 'lucide-react';

interface SpecialOfferProps {
  onShopSale: () => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ onShopSale }) => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#09090b] via-[#0d1310] to-[#09090b] border-b border-zinc-800/80">
      {/* 3D Dynamic Stadium Floodlight Radiance */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00ff87]/12 rounded-full blur-[140px]" 
        aria-hidden="true" 
      />
      
      {/* Subtle Geometric Pitch Markings SVG in Background */}
      <div className="pointer-events-none absolute inset-0 opacity-10 flex items-center justify-center">
        <div className="w-[800px] h-[400px] border border-white/20 rounded-full flex items-center justify-center">
          <div className="w-[300px] h-[300px] border border-white/20 rounded-full" />
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Neon Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-4 py-1.5 text-xs font-mono font-bold text-[#00ff87] mb-6">
          <Percent className="h-3.5 w-3.5" />
          <span>LIMITED TIME PROMOTIONAL EVENT</span>
        </div>

        {/* Big Athletic Headline */}
        <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
          MATCHDAY <span className="text-[#00ff87]">SALE</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-zinc-300 max-w-xl mx-auto font-medium">
          Upgrade your football collection today. Up to 20% off selected match kits and technical training trousers.
        </p>

        {/* Code Reassurance */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded border border-zinc-800">
            <Tag className="h-3 w-3 text-[#00ff87]" />
            <span>Discount Auto-Applied At Checkout</span>
          </span>
          <span className="text-zinc-600">·</span>
          <span>Free Nationwide Delivery over Rs. 5,000</span>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onShopSale}
            className="group inline-flex items-center gap-3 rounded-lg bg-[#00ff87] px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-black transition-all duration-200 hover:bg-[#00e676] hover:shadow-[0_0_35px_rgba(0,255,135,0.45)] active:scale-95"
          >
            <span>Shop The Sale</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
