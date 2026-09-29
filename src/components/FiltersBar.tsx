import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FilterState, ProductSize, SortOption } from '../types/store';

interface FiltersBarProps {
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  totalProductsCount: number;
}

const AVAILABLE_SIZES: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  onChangeFilters,
  totalProductsCount
}) => {
  const toggleSize = (size: ProductSize) => {
    const isSelected = filters.selectedSizes.includes(size);
    const updated = isSelected
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onChangeFilters({ ...filters, selectedSizes: updated });
  };

  const handleReset = () => {
    onChangeFilters({
      category: 'all',
      searchQuery: '',
      selectedSizes: [],
      onlyNewArrivals: false,
      onlySale: false,
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'featured'
    });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.selectedSizes.length > 0 ||
    filters.onlyNewArrivals ||
    filters.onlySale ||
    filters.searchQuery !== '';

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#101014] p-4 sm:p-5 mb-8 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        
        {/* Left: Category Segmented Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 rounded-lg border border-zinc-800 self-start">
          <button
            onClick={() => onChangeFilters({ ...filters, category: 'all' })}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
              filters.category === 'all'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => onChangeFilters({ ...filters, category: 'jerseys' })}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
              filters.category === 'jerseys'
                ? 'bg-[#00ff87] text-black font-extrabold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Jerseys
          </button>
          <button
            onClick={() => onChangeFilters({ ...filters, category: 'pants' })}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
              filters.category === 'pants'
                ? 'bg-[#00ff87] text-black font-extrabold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Football Pants
          </button>
        </div>

        {/* Right: Quick Toggles & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          {/* New Arrivals Toggle */}
          <button
            onClick={() => onChangeFilters({ ...filters, onlyNewArrivals: !filters.onlyNewArrivals })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
              filters.onlyNewArrivals
                ? 'bg-zinc-800 border-[#00ff87] text-[#00ff87]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            New Arrivals
          </button>

          {/* On Sale Toggle */}
          <button
            onClick={() => onChangeFilters({ ...filters, onlySale: !filters.onlySale })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
              filters.onlySale
                ? 'bg-zinc-800 border-[#00ff87] text-[#00ff87]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Sale Discounts
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
            <label htmlFor="sort-select" className="text-xs text-zinc-400 uppercase font-mono">
              Sort:
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) => onChangeFilters({ ...filters, sortBy: e.target.value as SortOption })}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-zinc-900 text-white">Featured</option>
              <option value="price-asc" className="bg-zinc-900 text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-zinc-900 text-white">Price: High to Low</option>
              <option value="newest" className="bg-zinc-900 text-white">Newest Drop</option>
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white px-2 py-1.5 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Bottom Sub-Row: Size Filter Bar and Product Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            <span>Size:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {AVAILABLE_SIZES.map((size) => {
              const selected = filters.selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`h-7 w-7 rounded font-mono text-xs font-bold transition-all ${
                    selected
                      ? 'bg-[#00ff87] text-black shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Count Display */}
        <div className="text-xs text-zinc-400 font-mono">
          Showing <span className="font-bold text-white tabular-nums">{totalProductsCount}</span> products
        </div>
      </div>
    </div>
  );
};
