export const SHIPPING_FREE_THRESHOLD = 499;
export const SHIPPING_FLAT_RATE = 99;

export const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "day", label: "Day Pads" },
  { value: "night", label: "Night Pads" },
  { value: "bundle", label: "Bundles" },
];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
];

export const INDIAN_STATES = [
  { value: "MH", label: "Maharashtra" },
  { value: "DL", label: "Delhi" },
  { value: "KA", label: "Karnataka" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "GJ", label: "Gujarat" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "WB", label: "West Bengal" },
  { value: "RJ", label: "Rajasthan" },
  { value: "OTHER", label: "Other" },
] as const;

export const CHECKOUT_STEPS = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
] as const;

export const MAX_CART_QUANTITY = 10;
