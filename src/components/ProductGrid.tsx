import React from 'react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';
import { Sparkles, PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onResetFilters
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-4">
            <div className="aspect-[4/3] w-full rounded-lg bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded bg-zinc-800" />
              <div className="h-3 w-1/2 rounded bg-zinc-800/60" />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
              <div className="h-5 w-20 rounded bg-zinc-800" />
              <div className="h-8 w-16 rounded bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#101014] p-12 text-center my-8 max-w-xl mx-auto">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 mb-4 border border-zinc-800">
          <PackageSearch className="h-7 w-7 text-[#00ff87]" />
        </div>
        <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-wide">
          No Football Kits Match Your Criteria
        </h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          Try clearing your size or price filters to explore our full collection of match jerseys and training pants.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#00ff87] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#00e676] transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlistIds.includes(product.id)}
        />
      ))}
    </div>
  );
};
