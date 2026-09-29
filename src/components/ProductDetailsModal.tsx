import React, { useState } from 'react';
import { Product, ProductSize } from '../types/store';
import { formatPrice, STORE_CONFIG } from '../data/storeConfig';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  Check,
  Heart,
  Ruler,
  ShieldCheck,
  Plus,
  Minus
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize, quantity: number) => void;
  onBuyNow: (product: Product, size: ProductSize, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl rounded-2xl border border-zinc-700/80 bg-[#121217] shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details modal"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          
          {/* Gallery (Left Column) */}
          <div className="md:col-span-6 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-all duration-300"
              />
              {product.discountPercent && product.discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-[#00ff87] text-black font-mono font-bold text-xs px-2.5 py-1 rounded">
                  SAVE {product.discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-18 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#00ff87] scale-102'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Specs Callouts */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="rounded-lg bg-zinc-900/70 border border-zinc-800 p-2.5">
                <span className="text-zinc-500 font-mono text-[10px] uppercase">Fabric Material</span>
                <p className="font-semibold text-zinc-300 mt-0.5">{product.material}</p>
              </div>
              <div className="rounded-lg bg-zinc-900/70 border border-zinc-800 p-2.5">
                <span className="text-zinc-500 font-mono text-[10px] uppercase">Fit Silhouette</span>
                <p className="font-semibold text-zinc-300 mt-0.5">{product.fit}</p>
              </div>
            </div>
          </div>

          {/* Product Details & Purchase Module (Right Column) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category, Rating, Wishlist */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#00ff87]">
                  {product.category === 'jerseys' ? 'Football Jersey' : 'Training Trousers'} · {product.sku}
                </span>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#00ff87] transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${isWishlisted ? 'fill-[#00ff87] text-[#00ff87]' : ''}`}
                  />
                  <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {product.name}
              </h2>

              {/* Rating Review Summary */}
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white font-mono">{product.rating}</span>
                <span>({product.reviewsCount} verified player ratings)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 py-2 border-y border-zinc-800/80">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="font-mono text-sm sm:text-base text-zinc-500 line-through tabular-nums">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-xs font-mono text-[#00ff87] ml-auto">
                  In Stock ({product.stock} units)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-zinc-300">
                    Select Size: <span className="text-[#00ff87] font-mono">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1 text-[#00ff87] hover:underline cursor-pointer"
                  >
                    <Ruler className="h-3.5 w-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-10 min-w-12 rounded-lg font-mono text-xs font-bold uppercase transition-all ${
                        selectedSize === sz
                          ? 'bg-[#00ff87] text-black shadow-md'
                          : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Size Guide Drawer */}
                {showSizeGuide && (
                  <div className="mt-2 rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-xs text-zinc-300 space-y-2">
                    <div className="font-bold uppercase tracking-wider text-[#00ff87]">Football Fit Chart (Inches)</div>
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead>
                        <tr className="text-zinc-500 border-b border-zinc-800">
                          <th className="py-1">Size</th>
                          <th>Chest</th>
                          <th>Waist</th>
                          <th>Length</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        <tr><td className="py-1 font-bold">S</td><td>36 - 38"</td><td>29 - 31"</td><td>28"</td></tr>
                        <tr><td className="py-1 font-bold">M</td><td>38 - 40"</td><td>31 - 33"</td><td>29"</td></tr>
                        <tr><td className="py-1 font-bold">L</td><td>40 - 42"</td><td>33 - 35"</td><td>30"</td></tr>
                        <tr><td className="py-1 font-bold">XL</td><td>42 - 44"</td><td>35 - 38"</td><td>31"</td></tr>
                        <tr><td className="py-1 font-bold">XXL</td><td>44 - 47"</td><td>38 - 41"</td><td>32"</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Quantity:</span>
                <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-800">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 text-zinc-400 hover:text-white disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 text-zinc-400 hover:text-white disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Technical Features Checklist */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-mono uppercase text-zinc-400 font-bold">Technical Specifications:</span>
                <div className="space-y-1">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <Check className="h-3.5 w-3.5 text-[#00ff87] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CTAs: Add to Cart & Buy Now */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-colors active:scale-98"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={handleBuy}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#00ff87] hover:bg-[#00e676] py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black transition-all hover:shadow-[0_0_20px_rgba(0,255,135,0.4)] active:scale-98"
                >
                  <Zap className="h-4 w-4" />
                  <span>Buy Now (COD)</span>
                </button>
              </div>

              {/* Delivery Assurance */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 font-mono">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-[#00ff87]" />
                  <span>Nationwide Cash on Delivery</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00ff87]" />
                  <span>7-Day Easy Exchange</span>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
