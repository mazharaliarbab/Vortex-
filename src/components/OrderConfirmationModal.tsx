import React from 'react';
import { Order } from '../types/store';
import { formatPrice, STORE_CONFIG } from '../data/storeConfig';
import { CheckCircle2, MessageCircle, ArrowRight, Package, Calendar, MapPin, Phone } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose
}) => {
  if (!order) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Vortex Football, I just placed order #${order.orderId} for ${formatPrice(
      order.total
    )} via Cash on Delivery. My name is ${order.customer.fullName}. Looking forward to dispatch details!`
  );

  const whatsappUrl = `https://wa.me/${STORE_CONFIG.contact.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl rounded-2xl border border-zinc-700 bg-[#121217] shadow-2xl p-6 sm:p-8 z-10 text-center my-8">
        
        {/* Pulsing Success Badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 text-[#00ff87] mb-5">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        {/* Headline */}
        <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
          ORDER CONFIRMED!
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-zinc-300">
          Thank you for your order. We will contact you shortly to confirm delivery.
        </p>

        {/* Order Identifier Box */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-left space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-400">Order Reference</span>
            <span className="font-bold text-[#00ff87] text-sm">{order.orderId}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-300">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>Placed On</span>
            </span>
            <span>{new Date(order.createdAt).toLocaleDateString('en-PK', { dateStyle: 'medium' })}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-300">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="h-3.5 w-3.5" />
              <span>Deliver To</span>
            </span>
            <span className="truncate max-w-[240px] text-right font-sans font-medium">
              {order.customer.fullName} · {order.customer.city}
            </span>
          </div>

          <div className="flex items-center justify-between text-zinc-300">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Phone className="h-3.5 w-3.5" />
              <span>Contact</span>
            </span>
            <span>{order.customer.phoneNumber}</span>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-800 pt-2 text-sm">
            <span className="text-zinc-400 font-bold">Total Due (COD):</span>
            <span className="font-bold text-[#00ff87] text-base">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Ordered Items Preview */}
        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-left">
          <div className="text-[11px] font-mono uppercase text-zinc-400 mb-2 flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5 text-[#00ff87]" />
            <span>Items in this shipment:</span>
          </div>
          <div className="space-y-1.5">
            {order.items.map((i) => (
              <div key={`${i.productId}-${i.size}`} className="flex justify-between text-xs text-zinc-300">
                <span className="truncate max-w-[280px]">
                  {i.quantity}x {i.product.name} ({i.size})
                </span>
                <span className="font-mono text-zinc-400">{formatPrice(i.product.price * i.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] px-4 py-3 text-xs font-bold uppercase tracking-wider text-black transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp Tracking</span>
          </a>

          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
