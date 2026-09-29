import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types/store';
import { formatPrice } from '../data/storeConfig';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredProducts = products.filter((p) => {
    if (!normalizedQuery) return true;
    return (
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery) ||
      p.colorway.toLowerCase().includes(normalizedQuery) ||
      p.fit.toLowerCase().includes(normalizedQuery) ||
      p.material.toLowerCase().includes(normalizedQuery)
    );
  });

  const popularSearches = ['Jersey', 'Pants', 'Matchday', 'Training', 'AeroKnit'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-700 bg-[#121217] shadow-2xl overflow-hidden z-10">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-zinc-800 p-4">
          <Search className="h-5 w-5 text-[#00ff87] ml-2 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search football jerseys, pants, match kits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-4 py-2 text-base sm:text-lg text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-mono uppercase bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1.5 rounded"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 px-6 py-3 bg-zinc-900/60 border-b border-zinc-800/80 overflow-x-auto text-xs font-mono">
          <span className="text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-[#00ff87]" />
            Trending:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="rounded bg-zinc-800/80 px-2.5 py-1 text-zinc-300 hover:bg-[#00ff87] hover:text-black transition-colors shrink-0"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-zinc-400 text-sm">
              No products found matching "<span className="text-white font-semibold">{query}</span>".
              <p className="text-xs text-zinc-500 mt-1">Try searching for "jersey", "pants", or "training".</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="group flex items-center justify-between gap-4 p-3 rounded-xl border border-transparent hover:border-zinc-700 hover:bg-zinc-900/80 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="h-14 w-14 rounded-lg object-cover bg-zinc-950 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00ff87]">
                      {p.category === 'jerseys' ? 'Jersey' : 'Pants'}
                    </span>
                    <h4 className="font-heading text-base font-bold uppercase text-white truncate group-hover:text-[#00ff87] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate">{p.fit} · {p.colorway}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-sm font-bold text-white tabular-nums">
                    {formatPrice(p.price)}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-zinc-800 group-hover:bg-[#00ff87] group-hover:text-black flex items-center justify-center text-zinc-400 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
