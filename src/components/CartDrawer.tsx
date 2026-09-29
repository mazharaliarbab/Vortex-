import React from 'react';
import { CartItem } from '../types/store';
import { formatPrice, STORE_CONFIG } from '../data/storeConfig';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
  onStartShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartShopping
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= STORE_CONFIG.freeDeliveryThreshold;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : STORE_CONFIG.standardDeliveryFee;
  const total = subtotal + deliveryFee;

  const amountNeededForFreeShipping = Math.max(0, STORE_CONFIG.freeDeliveryThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / STORE_CONFIG.freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101014] border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          
          {/* Top Header */}
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#00ff87]" />
                <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                  YOUR MATCH CART
                </h2>
                <span className="font-mono text-xs text-zinc-400">
                  ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-850"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress bar */}
            {items.length > 0 && (
              <div className="mt-4 pt-3 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-zinc-300 flex items-center gap-1">
                    <Truck className="h-3 w-3 text-[#00ff87]" />
                    {isFreeDelivery
                      ? 'You have unlocked FREE Nationwide Delivery!'
                      : `Add ${formatPrice(amountNeededForFreeShipping)} more for FREE delivery`}
                  </span>
                  <span className="text-[#00ff87] font-bold">{freeShippingProgress.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-[#00ff87] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="h-16 w-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <ShoppingBag className="h-8 w-8 text-zinc-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase text-white">
                  Your Cart Is Empty
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Looks like you haven't picked your kit yet. Check out our high-performance jerseys and tapered football trousers.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartShopping();
                  }}
                  className="rounded-lg bg-[#00ff87] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#00e676] transition-colors"
                >
                  Explore Football Gear
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 p-3 rounded-xl border border-zinc-800 bg-zinc-900/60"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 rounded-lg object-cover bg-zinc-950 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.productId, item.size)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="text-zinc-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mt-0.5">
                        <span>Size: <strong className="text-white">{item.size}</strong></span>
                        <span>·</span>
                        <span className="text-[#00ff87]">{formatPrice(item.product.price)}</span>
                      </div>
                    </div>

                    {/* Stepper + Total for line */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60">
                      <div className="flex items-center rounded-md bg-zinc-800 border border-zinc-700">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-bold text-white tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-[#0d0d10] space-y-4">
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Fee (Nationwide)</span>
                  <span className={deliveryFee === 0 ? "text-[#00ff87] font-bold" : "text-white tabular-nums"}>
                    {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Order Total (COD)</span>
                  <span className="text-[#00ff87] tabular-nums font-mono text-lg">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#00ff87] py-4 text-sm font-bold uppercase tracking-wider text-black hover:bg-[#00e676] transition-all hover:shadow-[0_0_20px_rgba(0,255,135,0.4)] active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00ff87]" />
                <span>Cash on Delivery · Verified Courier Partner</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
