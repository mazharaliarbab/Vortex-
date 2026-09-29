/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, ProductSize, Order, FilterState } from './types/store';
import { INITIAL_PRODUCTS } from './data/products';
import { STORE_CONFIG } from './data/storeConfig';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FiltersBar } from './components/FiltersBar';
import { ProductGrid } from './components/ProductGrid';
import { NewArrivals } from './components/NewArrivals';
import { SpecialOffer } from './components/SpecialOffer';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals & Overlays
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { ToastContainer, ToastMessage } from './components/Toast';

const CART_STORAGE_KEY = 'vortex_football_cart_v1';
const WISHLIST_STORAGE_KEY = 'vortex_football_wishlist_v1';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage quota or private browsing safeguard
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // storage quota safeguard
    }
  }, [wishlistIds]);

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Active section tracking
  const [activeSection, setActiveSection] = useState('hero');

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    searchQuery: '',
    selectedSizes: [],
    onlyNewArrivals: false,
    onlySale: false,
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'featured'
  });

  // Smooth Navigation
  const handleNavigate = (sectionId: string, categoryFilter?: 'all' | 'jerseys' | 'pants') => {
    if (categoryFilter) {
      setFilters((prev) => ({ ...prev, category: categoryFilter }));
    }

    if (sectionId === 'catalog') {
      const el = document.getElementById('featured-collection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(categoryFilter || 'catalog');
        return;
      }
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size?: ProductSize, quantity = 1) => {
    const chosenSize = size || product.sizes[0] || 'M';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { productId: product.id, product, size: chosenSize, quantity }];
      }
    });

    showToast(
      "Added to Cart",
      `${product.name} (Size ${chosenSize}) added to your match kit.`
    );
  };

  const handleBuyNow = (product: Product, size?: ProductSize, quantity = 1) => {
    const chosenSize = size || product.sizes[0] || 'M';
    handleAddToCart(product, chosenSize, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.size === size)));
    showToast("Item Removed", "Removed from your cart.");
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from Wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to Wishlist", "You can review saved kits anytime.");
        return [...prev, productId];
      }
    });
  };

  // Checkout & Order Placement
  const handleOrderPlaced = (order: Order) => {
    setCart([]);
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    showToast("Order Confirmed!", `Order #${order.orderId} placed via Cash on Delivery.`);
  };

  // Filtered & Sorted Products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (filters.category !== 'all' && p.category !== filters.category) {
          return false;
        }
        // New arrivals
        if (filters.onlyNewArrivals && !p.isNewArrival) {
          return false;
        }
        // Sale
        if (filters.onlySale && !p.isSale) {
          return false;
        }
        // Size
        if (filters.selectedSizes.length > 0) {
          const hasMatchingSize = filters.selectedSizes.some((s) => p.sizes.includes(s));
          if (!hasMatchingSize) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // Featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, filters]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#00ff87] selection:text-black">
      
      {/* 1. Sticky Navbar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main>
        {/* 2. Hero Section */}
        <div id="hero">
          <Hero
            onShopJerseys={() => handleNavigate('catalog', 'jerseys')}
            onShopPants={() => handleNavigate('catalog', 'pants')}
            onQuickViewJersey={() => {
              const jersey = products.find((p) => p.id === 'prod-2') || products[0];
              setSelectedProduct(jersey);
            }}
          />
        </div>

        {/* 3. Category Section */}
        <CategorySection
          onSelectCategory={(cat) => handleNavigate('catalog', cat)}
        />

        {/* 4. Featured Collection */}
        <section id="featured-collection" className="py-16 sm:py-24 bg-[#09090b] border-b border-zinc-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#00ff87] block mb-1.5">
                  Pro-Standard Performance Gear
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                  FEATURED COLLECTION
                </h2>
              </div>
              <p className="mt-2 md:mt-0 text-xs sm:text-sm text-zinc-400 max-w-md">
                Precision cut match shirts and athletic training trousers crafted with AeroKnit ventilation.
              </p>
            </div>

            {/* Interactive Filters Bar */}
            <FiltersBar
              filters={filters}
              onChangeFilters={setFilters}
              totalProductsCount={filteredProducts.length}
            />

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              onQuickView={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onResetFilters={() =>
                setFilters({
                  category: 'all',
                  searchQuery: '',
                  selectedSizes: [],
                  onlyNewArrivals: false,
                  onlySale: false,
                  minPrice: 0,
                  maxPrice: 10000,
                  sortBy: 'featured'
                })
              }
            />

          </div>
        </section>

        {/* 5. New Arrivals Carousel */}
        <NewArrivals
          products={products}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 6. Special Offer MATCHDAY SALE */}
        <div id="special-offer">
          <SpecialOffer
            onShopSale={() => {
              setFilters((prev) => ({ ...prev, onlySale: true }));
              handleNavigate('catalog');
            }}
          />
        </div>

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. About Section */}
        <AboutSection />

        {/* 9. Contact Section */}
        <ContactSection onShowToast={(msg) => showToast("Inquiry Received", msg)} />
      </main>

      {/* 10. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onStartShopping={() => handleNavigate('catalog')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmation Screen */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={products}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickView={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Floating Action Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}
