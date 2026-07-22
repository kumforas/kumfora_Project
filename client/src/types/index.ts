export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  thumbnail: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  category: 'day' | 'night' | 'liner' | 'bundle';
  absorbency: 'light' | 'regular' | 'heavy' | 'overnight';
  size: 'regular' | 'large' | 'extra-large';
  count: number;
  badges: string[];
  rating: number;
  reviewCount: number;
  reviews: { name: string; rating: number; date: string; title: string; text: string; verified: boolean }[];
  faqs: { q: string; a: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

// ─── Auth Types ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar_url: string | null;
  created_at: string;
}

// ─── Database Entity Types ──────────────────────────────────────────────────

export interface Order {
  id: string;
  order_id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment_method: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

// ─── Form Submission Hook Types ─────────────────────────────────────────────

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseFormSubmissionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export interface UseFormSubmissionReturn<T> {
  status: SubmissionStatus;
  error: string | null;
  warnings: string[];
  submit: (body: unknown) => Promise<boolean>;
  reset: () => void;
}
