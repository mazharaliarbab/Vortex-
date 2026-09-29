import React, { useState } from 'react';
import { CartItem, CustomerInfo, Order } from '../types/store';
import { formatPrice, STORE_CONFIG } from '../data/storeConfig';
import { X, ShieldCheck, Truck, CheckCircle2, Lock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phoneNumber: '',
    email: '',
    city: 'Lahore',
    completeAddress: '',
    orderNotes: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= STORE_CONFIG.freeDeliveryThreshold;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : STORE_CONFIG.standardDeliveryFee;
  const total = subtotal + deliveryFee;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!customer.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!customer.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required for delivery rider';
    } else if (customer.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid Pakistani phone number (e.g. 03001234567)';
    }
    if (!customer.email.trim() || !customer.email.includes('@')) {
      newErrors.email = 'Valid email is required for tracking updates';
    }
    if (!customer.city.trim()) newErrors.city = 'City is required';
    if (!customer.completeAddress.trim()) newErrors.completeAddress = 'Street & House address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `VTX-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        orderId: generatedOrderId,
        customer,
        items,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: 'Cash on Delivery',
        createdAt: new Date().toISOString()
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  const pakistaniMajorCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Other City'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl rounded-2xl border border-zinc-700 bg-[#121217] shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-[#0d0d11]">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#00ff87]" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-white">
              MATCHDAY EXPRESS CHECKOUT
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout modal"
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Customer Delivery Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00ff87] font-bold">
                  1. Shipping Information
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">Pakistan Nationwide</span>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Daniyal Khan"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#00ff87] focus:outline-none transition-colors"
                />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                    Phone Number (Rider Contact) *
                  </label>
                  <input
                    type="tel"
                    placeholder="0300 1234567"
                    value={customer.phoneNumber}
                    onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
                    className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#00ff87] focus:outline-none transition-colors"
                  />
                  {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="daniyal@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#00ff87] focus:outline-none transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                  City *
                </label>
                <select
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:border-[#00ff87] focus:outline-none transition-colors cursor-pointer"
                >
                  {pakistaniMajorCities.map((city) => (
                    <option key={city} value={city} className="bg-zinc-900 text-white">
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                  Complete Street Address & House # *
                </label>
                <textarea
                  rows={2}
                  placeholder="House #, Street #, Sector/Area, Landmark..."
                  value={customer.completeAddress}
                  onChange={(e) => setCustomer({ ...customer, completeAddress: e.target.value })}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-[#00ff87] focus:outline-none transition-colors"
                />
                {errors.completeAddress && <p className="text-red-400 text-xs mt-1">{errors.completeAddress}</p>}
              </div>

              {/* Order Notes (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before delivery, deliver after 3 PM"
                  value={customer.orderNotes}
                  onChange={(e) => setCustomer({ ...customer, orderNotes: e.target.value })}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-[#00ff87] focus:outline-none transition-colors"
                />
              </div>

              {/* Payment Method Badge: Cash on Delivery */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00ff87] font-bold block mb-2">
                  2. Payment Method
                </span>
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#00ff87]/50 bg-[#00ff87]/5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#00ff87]" />
                    <div>
                      <div className="text-sm font-bold text-white uppercase tracking-wide">
                        Cash on Delivery (COD)
                      </div>
                      <div className="text-xs text-zinc-400">
                        Pay cash to the courier rider upon package inspection at your door.
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#00ff87] bg-black/40 px-2 py-1 rounded">
                    VERIFIED
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="md:col-span-5 bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-bold">
                    Order Items ({items.length})
                  </span>
                  <span className="text-xs font-mono text-[#00ff87]">Review</span>
                </div>

                <div className="divide-y divide-zinc-800/80 max-h-56 overflow-y-auto my-3 pr-1">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="py-2.5 flex items-center gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded object-cover bg-zinc-950 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-heading font-bold text-white uppercase truncate">
                          {item.product.name}
                        </div>
                        <div className="text-zinc-400 font-mono text-[11px]">
                          Size: {item.size} · Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-mono text-white font-semibold tabular-nums shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal, Shipping, Total */}
                <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-white tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Courier Delivery</span>
                    <span className={deliveryFee === 0 ? "text-[#00ff87] font-bold" : "text-white tabular-nums"}>
                      {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                    <span>Total Amount (COD)</span>
                    <span className="text-[#00ff87] tabular-nums font-mono text-base">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#00ff87] py-4 text-sm font-extrabold uppercase tracking-wider text-black hover:bg-[#00e676] transition-all hover:shadow-[0_0_25px_rgba(0,255,135,0.4)] disabled:opacity-50 active:scale-98"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Processing Order...</span>
                    </span>
                  ) : (
                    <span>Place Order (Cash on Delivery)</span>
                  )}
                </button>

                <div className="text-center text-[11px] text-zinc-400 font-mono flex items-center justify-center gap-1.5">
                  <Truck className="h-3 w-3 text-[#00ff87]" />
                  <span>2–4 business days delivery across Pakistan</span>
                </div>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
