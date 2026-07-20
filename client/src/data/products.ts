import type { Product } from "@/types";
import product_1_1 from "@/assets/product-images/product-1/product-1_1.jpeg";
import product_1_2 from "@/assets/product-images/product-1/product-1_2.jpeg";
import product_1_3 from "@/assets/product-images/product-1/product-1_3.jpeg";
import product_1_4 from "@/assets/product-images/product-1/product-1_4.jpeg";
import product_2_1 from "@/assets/product-images/product-2/product-2_1.jpeg";
import product_2_2 from "@/assets/product-images/product-2/product-2_2.jpeg";
import product_2_3 from "@/assets/product-images/product-2/product-2_3.jpeg";
import product_2_4 from "@/assets/product-images/product-2/product-2_4.jpeg";

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
      product_1_1.src,
      product_1_2.src,
      product_1_3.src,
      product_1_4.src,
    ],
    thumbnail: product_1_1.src,
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
      product_2_1.src,
      product_2_2.src,
      product_2_3.src,
      product_2_4.src,
    ],
    thumbnail: product_2_1.src,
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
