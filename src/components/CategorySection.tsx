import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import classicJerseyImg from '../assets/images/product_classic_jersey_1790657214566.jpg';
import performancePantsImg from '../assets/images/product_performance_pants_1790657243667.jpg';

interface CategorySectionProps {
  onSelectCategory: (cat: 'jerseys' | 'pants') => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="relative py-16 sm:py-24 bg-[#09090b] border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00ff87] mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Browse Categories</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              GEAR UP BY DISCIPLINE
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-zinc-400 max-w-md">
            Engineered exclusively for matchday performance, rigorous training drills, and modern football lifestyle.
          </p>
        </div>

        {/* 2 Large Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Football Jerseys */}
          <Card3DTilt
            className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 transition-all duration-300 hover:border-[#00ff87]/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            maxTilt={5}
            onClick={() => onSelectCategory('jerseys')}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-950 mb-6">
              <img
                src={classicJerseyImg}
                alt="Football Jerseys Collection"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 font-mono text-xs uppercase tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded text-zinc-300 border border-white/10">
                Aerodynamic Knit Series
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#00ff87] transition-colors">
                FOOTBALL JERSEYS
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Breathable micro-mesh kits designed with player-issue precision. Zero cling, anti-friction seams, and striking geometric visuals.
              </p>
              
              <div className="pt-2 flex items-center gap-2 text-sm font-bold text-[#00ff87] uppercase tracking-wider">
                <span>Shop Jerseys Collection</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </Card3DTilt>

          {/* Card 2: Football Pants */}
          <Card3DTilt
            className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 transition-all duration-300 hover:border-[#00ff87]/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            maxTilt={5}
            onClick={() => onSelectCategory('pants')}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-950 mb-6">
              <img
                src={performancePantsImg}
                alt="Football Training Pants Collection"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 font-mono text-xs uppercase tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded text-zinc-300 border border-white/10">
                Precision Taper Cut
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#00ff87] transition-colors">
                FOOTBALL PANTS
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Modern tapered training trousers engineered with ankle zippers for fast transitions over boots and 4-way stretch knee flex.
              </p>
              
              <div className="pt-2 flex items-center gap-2 text-sm font-bold text-[#00ff87] uppercase tracking-wider">
                <span>Shop Pants Collection</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </Card3DTilt>

        </div>
      </div>
    </section>
  );
};
