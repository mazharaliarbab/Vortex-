import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Truck } from 'lucide-react';
import { ThreeFootball } from './ThreeFootball';
import { Card3DTilt } from './Card3DTilt';
import heroJerseyImg from '../assets/images/hero_football_jersey_1790657198942.jpg';

interface HeroProps {
  onShopJerseys: () => void;
  onShopPants: () => void;
  onQuickViewJersey: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopJerseys,
  onShopPants,
  onQuickViewJersey
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-zinc-800/80 bg-[#09090b]">
      {/* Background Stadium Grid & Subtle Particle Ambient Lights */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25"
        aria-hidden="true" 
      />
      {/* Dynamic stadium green aura */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#00ff87]/10 blur-[130px]"
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute -bottom-20 right-10 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subheading, CTAs & Value Badges */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left z-10">
            {/* Subtle Matchday Kicker */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-[#00ff87] animate-ping" />
              <span className="uppercase tracking-widest text-[#00ff87] font-mono text-[11px]">Season 26 Drop</span>
              <span className="text-zinc-500">·</span>
              <span>Pro Matchday & Training Kits</span>
            </div>

            {/* Main Headline with balanced wrap */}
            <div className="space-y-2">
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92]">
                WEAR THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2e8f0] to-[#00ff87]">GAME.</span>
              </h1>
              <p className="max-w-xl text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed mx-auto lg:mx-0">
                Premium football jerseys and pants built for fans who live for football.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopJerseys}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg bg-[#00ff87] px-8 py-4 text-base font-bold text-black uppercase tracking-wider transition-all duration-200 hover:bg-[#00e676] hover:shadow-[0_0_30px_rgba(0,255,135,0.4)] active:scale-[0.98]"
              >
                <span>Shop Jerseys</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onShopPants}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900/90 px-8 py-4 text-base font-bold text-white uppercase tracking-wider hover:border-[#00ff87] hover:bg-zinc-850 hover:text-[#00ff87] transition-all duration-200 active:scale-[0.98]"
              >
                <span>Shop Pants</span>
              </button>
            </div>

            {/* Quiet Value Props */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Zap className="h-3.5 w-3.5 text-[#00ff87]" />
                  <span>AeroKnit Tech</span>
                </div>
                <p className="text-[11px] text-zinc-400">Sweat-wicking micro-mesh</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00ff87]" />
                  <span>Pro Athletic Cut</span>
                </div>
                <p className="text-[11px] text-zinc-400">Ergonomic sprint flex</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Truck className="h-3.5 w-3.5 text-[#00ff87]" />
                  <span>Cash on Delivery</span>
                </div>
                <p className="text-[11px] text-zinc-400">Nationwide across Pakistan</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Football + High-Res Floating Jersey Presentation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Composition Container */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none flex items-center justify-center">
              
              {/* Backing 3D Interactive Rotating Football */}
              <div className="absolute -top-12 -right-4 sm:-right-8 z-0 pointer-events-auto">
                <ThreeFootball size={260} className="scale-90 sm:scale-100" />
              </div>

              {/* Foreground 3D Floating Jersey Card with Tilt & Shimmer */}
              <Card3DTilt 
                className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] rounded-2xl glass-panel-elevated p-3 border border-zinc-700/60 transition-all shadow-2xl"
                maxTilt={8}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900">
                  <img
                    src={heroJerseyImg}
                    alt="Pro Matchday Football Jersey"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                  {/* Top-Right Badge */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[11px] font-mono font-bold text-[#00ff87]">
                    MATCHDAY PRO
                  </div>

                  {/* Bottom Info Bar inside Card */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Flagship Silhouette</p>
                      <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wide">Pro Match Jersey</h2>
                    </div>
                    <button
                      onClick={onQuickViewJersey}
                      className="rounded bg-white/10 hover:bg-[#00ff87] hover:text-black border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Micro Footnote / Material Spec */}
                <div className="mt-3 px-2 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87]" />
                    Carbon / Volt Green Edition
                  </span>
                  <span className="font-mono text-zinc-300 font-semibold">Rs. 4,499</span>
                </div>
              </Card3DTilt>

              {/* Floating Match Spec Floating Tag */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 z-20 hidden sm:flex items-center gap-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 p-3 shadow-xl backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00ff87]/10 border border-[#00ff87]/30 text-[#00ff87]">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-zinc-400">HydroWick Weave</div>
                  <div className="text-xs font-bold text-white">Zero Sweat Saturation</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
