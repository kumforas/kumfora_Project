// ─── Cart / Product Types (minimal, for order input) ────────────────────────

export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
  };
  quantity: number;
}

// ─── Database Entity Types ──────────────────────────────────────────────────

export interface FeedbackRecord {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  order_number: string | null;
  topic: string;
  message: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface OrderRecord {
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
  status: string;
  created_at: string;
}

// ─── API Input Types ────────────────────────────────────────────────────────

export interface FeedbackInput {
  name: string;
  email: string;
  rating: number;
  message: string;
}

export interface ContactInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  order_number?: string;
  topic: string;
  message: string;
}

export interface NewsletterInput {
  email: string;
}

export interface OrderInput {
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
}

// ─── API Response Types ─────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  warnings?: string[];
}
