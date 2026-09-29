import React from 'react';
import { Award, Feather, Flame, ShoppingBag } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: "PREMIUM QUALITY",
      subtitle: "Pro AeroKnit Tech",
      description: "Reinforced micro-mesh fabrics that resist snagging, color fading, and shrinkage after repeated match washes."
    },
    {
      icon: Feather,
      title: "COMFORTABLE FIT",
      subtitle: "Engineered Athlete Cut",
      description: "Ergonomic 4-way stretch tailored specifically for football sprinting, striking, and active lifestyle wear."
    },
    {
      icon: Flame,
      title: "FAST DELIVERY",
      subtitle: "Nationwide 2-4 Days",
      description: "Swift dispatch to Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, and all cities across Pakistan."
    },
    {
      icon: ShoppingBag,
      title: "EASY ORDERING",
      subtitle: "Cash on Delivery",
      description: "Pay securely at your doorstep when your package arrives. No upfront online card hassle required."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#09090b] border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00ff87]">
            The Vortex Standard
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            WHY BALLERS CHOOSE US
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Every stitch and silhouette is tested by players who understand what real football kit quality demands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-xl border border-zinc-800 bg-[#111115] p-6 transition-all duration-300 hover:border-[#00ff87]/40 hover:bg-[#15151b] hover:-translate-y-1"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-[#00ff87] group-hover:scale-110 group-hover:bg-[#00ff87] group-hover:text-black transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-[11px] font-mono uppercase text-[#00ff87] mb-1 font-bold">
                  {item.subtitle}
                </div>
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
