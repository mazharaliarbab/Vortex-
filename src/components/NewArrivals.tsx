import React, { useRef } from 'react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const newItems = products.filter((p) => p.isNewArrival);

  return (
    <section id="new-arrivals" className="py-16 sm:py-24 bg-[#0a0a0d] border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Arrows */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00ff87] mb-1.5">
              <Zap className="h-3.5 w-3.5" />
              <span>Just Landed</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              NEW ARRIVALS
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-[#00ff87] hover:text-[#00ff87] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-[#00ff87] hover:text-[#00ff87] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newItems.map((product) => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] shrink-0 snap-start">
              <ProductCard
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
