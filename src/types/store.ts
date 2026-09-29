export type ProductCategory = 'jerseys' | 'pants';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  description: string;
  features: string[];
  sizes: ProductSize[];
  stock: number;
  sku: string;
  fit: string;
  material: string;
  colorway: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;
  completeAddress: string;
  orderNotes?: string;
}

export interface Order {
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'Cash on Delivery';
  createdAt: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export interface FilterState {
  category: 'all' | ProductCategory;
  searchQuery: string;
  selectedSizes: ProductSize[];
  onlyNewArrivals: boolean;
  onlySale: boolean;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
}
