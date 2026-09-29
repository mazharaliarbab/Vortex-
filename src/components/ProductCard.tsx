import React from 'react';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '../types/store';
import { formatPrice } from '../data/storeConfig';
import { Card3DTilt } from './Card3DTilt';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  return (
    <Card3DTilt
      className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#111115] p-3 transition-all duration-300 hover:border-zinc-700 hover:bg-[#16161c] hover:shadow-xl"
      maxTilt={6}
    >
      <div>
        {/* Product Visual Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-900">
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
          />

          {/* Scrim Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Discount / Tag */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="font-mono text-[11px] font-bold bg-[#00ff87] text-black px-2 py-0.5 rounded tracking-tight shadow-sm">
                -{product.discountPercent}% OFF
              </span>
            )}
            {product.isNewArrival && (
              <span className="font-mono text-[10px] font-bold bg-zinc-900/90 text-white border border-white/20 px-2 py-0.5 rounded tracking-wide">
                NEW
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-black/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? 'fill-[#00ff87] text-[#00ff87]' : ''
              }`}
            />
          </button>

          {/* Quick View Button Hover Slide-Up */}
          <div className="absolute inset-x-2 bottom-2 z-10 translate-y-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-md bg-zinc-900/90 backdrop-blur-md border border-white/20 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#00ff87] hover:text-black hover:border-[#00ff87] transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Details Header */}
        <div className="pt-3.5 pb-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="uppercase tracking-widest text-[11px] font-mono text-zinc-400">
              {product.category === 'jerseys' ? 'Match Jersey' : 'Training Pants'}
            </span>
            <div className="flex items-center gap-1 text-zinc-300">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-mono text-xs font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-heading text-lg font-bold text-white tracking-wide uppercase line-clamp-1 cursor-pointer hover:text-[#00ff87] transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Fit & Colorway micro-info */}
          <p className="text-xs text-zinc-400 truncate mt-0.5">
            {product.fit} · {product.colorway}
          </p>
        </div>
      </div>

      {/* Card Footer: Pricing + Add to Cart Button */}
      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="font-mono text-xs text-zinc-500 line-through tabular-nums">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">Free delivery over Rs. 5,000</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          aria-label={`Add ${product.name} to cart`}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-[#00ff87] hover:text-black text-white px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </Card3DTilt>
  );
};
