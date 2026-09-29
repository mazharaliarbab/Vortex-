import React from 'react';
import { Product } from '../types/store';
import { formatPrice } from '../data/storeConfig';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onQuickView,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-700 bg-[#121217] shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-[#0d0d11]">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 fill-[#00ff87] text-[#00ff87]" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-white">
              SAVED KITS & PANTS ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase text-white">
                Your Wishlist Is Empty
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Tap the heart icon on any jersey or football trousers to save your favorite picks for later.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl border border-zinc-800 bg-zinc-900/60"
                >
                  <div
                    onClick={() => {
                      onQuickView(p);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer min-w-0"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="h-16 w-16 rounded-lg object-cover bg-zinc-950 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-heading text-base font-bold uppercase text-white truncate hover:text-[#00ff87] transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono">
                        {formatPrice(p.price)} · {p.category === 'jerseys' ? 'Jersey' : 'Pants'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onAddToCart(p)}
                      className="flex items-center gap-1.5 rounded-lg bg-[#00ff87] hover:bg-[#00e676] text-black px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(p.id)}
                      aria-label="Remove item"
                      className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
