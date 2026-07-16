import type { Product } from "@/types";
import product1Img from "@/assets/product-images/product1.png";
import product2Img from "@/assets/product-images/product2.png";

export const products: Product[] = [
  {
    id: "kumfora-day-pads",
    slug: "day-pads",
    name: "Kumfora XL Sanitary Pads – Family Pack | 20 PCS | Soft Cottony Feel | High Absorbency | Leak Protection",
    tagline: "Ultra-thin protection for everyday confidence",
    description: `Experience superior comfort and reliable protection with Kumfora XL Sanitary Pads. Designed with a soft, cottony-feel top layer, these pads provide a gentle touch against the skin while offering excellent absorbency for day and night protection. Kumfora helps you care for yourself while being mindful of the environment.`,
    shortDescription:
      "Ultra-thin, breathable pads for everyday comfort and confidence.",
    price: 110.0,
    originalPrice: 120.0,
    images: [
      product1Img.src,
      "https://images.unsplash.com/photo-1712842956495-473e00ae9ad8?w=800&q=80",
      "https://images.unsplash.com/photo-1603712509484-0a5004b4663e?w=800&q=80",
    ],
    thumbnail: product1Img.src,
    features: [
      "Ultra-thin 3mm core",
      "Breathable cotton-like top sheet",
      "Secure-fit wings",
      "Odor-lock technology",
      "Dermatologically tested",
      "Individually wrapped",
    ],
    specifications: {
      Absorbency: "Regular",
      Length: "240mm",
      Width: "70mm",
      "Count per pack": "10 pads",
      Wrapper: "Biodegradable",
      "Core material": "SAP + Airlaid",
      "Top sheet": "Perforated non-woven",
      "Back sheet": "Breathable film",
    },
    inStock: true,
    stockCount: 156,
    category: "day",
    absorbency: "regular",
    size: "regular",
    count: 10,
    badges: ["Best Seller", "Dermatologically Tested"],
    rating: 4.8,
    reviewCount: 234,
  },
  {
    id: "kumfora-night-pads",
    slug: "night-pads",
    name: "Kumfora XL Sanitary Pads – 6 PCS | Small Pack | Leak-Proof Protection | Soft Cottony Feel | Ultra Absorbent",
    tagline: "Sleep soundly with leak-free nights",
    description: `Stay comfortable and confident with Kumfora XL Sanitary Pads, designed to provide reliable protection throughout the day and night. The extra-long design offers enhanced coverage, while the highly absorbent core helps lock in fluid quickly to reduce the risk of leaks. The soft top layer feels gentle on the skin, making it suitable for everyday comfort.`,
    shortDescription:
      "Extra-long, super absorbent pads for worry-free overnight protection.",
    price: 40.0,
    originalPrice: 50.0,
    images: [
      product2Img.src,
      "https://images.unsplash.com/photo-1764312270936-adb508140a6d?w=800&q=80",
      "https://images.unsplash.com/photo-1603712509484-0a5004b4663e?w=800&q=80",
    ],
    thumbnail: product2Img.src,
    features: [
      "Extra-long 320mm length",
      "Super absorbent core",
      "Leak-guard barriers",
      "Ultra-soft top sheet",
      "Quiet biodegradable wrapper",
      "Dermatologically tested",
    ],
    specifications: {
      Absorbency: "Overnight / Heavy",
      Length: "320mm",
      Width: "80mm",
      "Count per pack": "8 pads",
      Wrapper: "Biodegradable",
      "Core material": "High-capacity SAP + Airlaid",
      "Top sheet": "Extra-soft non-woven",
      "Back sheet": "Leak-proof breathable film",
    },
    inStock: true,
    stockCount: 89,
    category: "night",
    absorbency: "overnight",
    size: "extra-large",
    count: 8,
    badges: ["Overnight Protection", "Leak-Guard"],
    rating: 4.9,
    reviewCount: 187,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getRelatedProducts(
  currentProductId: string,
  limit = 4,
): Product[] {
  return products.filter((p) => p.id !== currentProductId).slice(0, limit);
}
