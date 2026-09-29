import React from 'react';
import { STORE_CONFIG } from '../data/storeConfig';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0c0c10] border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00ff87]">
              <Compass className="h-3.5 w-3.5" />
              <span>Our Philosophy & Heritage</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {STORE_CONFIG.aboutStory.headline}
            </h2>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              {STORE_CONFIG.aboutStory.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              {STORE_CONFIG.aboutStory.coreValues.map((val, idx) => (
                <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-xs font-bold uppercase text-[#00ff87] font-heading tracking-wide">
                    {val.title}
                  </div>
                  <div className="text-xs text-zinc-400 leading-snug">
                    {val.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Pitch Graphic Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 shadow-2xl">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[10px] text-[#00ff87] bg-black/60 px-2 py-1 rounded border border-[#00ff87]/30">
                <Sparkles className="h-3 w-3" />
                <span>100% PLAYER TESTED</span>
              </div>

              <div className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-wider">
                {STORE_CONFIG.storeName}
              </div>
              <p className="text-xs uppercase font-mono text-[#00ff87] mt-1 tracking-widest">
                Official Football Performance Wear
              </p>

              <div className="mt-8 space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
                  <span>Product Discipline</span>
                  <span className="text-white font-bold">Match Kits & Training Trousers</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
                  <span>Primary Weave</span>
                  <span className="text-white font-bold">AeroKnit Recycled Polyester</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
                  <span>Courier Coverage</span>
                  <span className="text-white font-bold">All Pakistan (COD Supported)</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Return Guarantee</span>
                  <span className="text-[#00ff87] font-bold">7-Day Fit Guarantee</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-xs text-zinc-300">
                  <div className="font-bold text-white uppercase">Direct Manufacturer Guarantee</div>
                  <div className="text-zinc-500">Zero middlemen · Fair player pricing</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
