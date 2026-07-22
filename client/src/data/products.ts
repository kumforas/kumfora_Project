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
      Absorbency: "2X",
      Length: "280mm",
      Width: "70mm",
      "Count per pack": "20 pads",
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
    reviews: [
      {
        name: "Priya S.",
        rating: 5,
        date: "2024-01-15",
        title: "Best pads for my daughter!",
        text: "I was looking for an affordable sanitary pad with good quality, and Kumfora met my expectations. It fits well and keeps me comfortable throughout the day.",
        verified: true,
      },
      {
        name: "Anita M.",
        rating: 5,
        date: "2024-01-10",
        title: "Great quality",
        text: "The pad absorbs well and doesn't feel bulky. I also liked that it was gentle on my skin. Overall, a good experience.",
        verified: true,
      },
      {
        name: "Kavya R.",
        rating: 4,
        date: "2024-01-05",
        title: "Good product",
        text: "The cotton-soft surface feels gentle on my skin. It stays comfortable for hours and provides reliable protection. Definitely worth trying.",
        verified: true,
      },
    ],
    faqs: [
      {
        q: "Are these pads suitable for sensitive skin?",
        a: "Yes! Our pads are dermatologically tested and free from harsh chemicals, fragrances, and chlorine bleaching. The ultra-soft top sheet is designed specifically for sensitive young skin.",
      },
      {
        q: "How long can I wear each pad?",
        a: "For optimal hygiene and comfort, we recommend changing every 4-6 hours during the day. The regular absorbency is ideal for light to moderate flow days.",
      },
      {
        q: "Are the wrappers really biodegradable?",
        a: "Yes! Each pad comes in a plant-based biodegradable wrapper that breaks down naturally. It's our small step toward a greener planet.",
      },
      {
        q: "How many pads come in a pack?",
        a: "The Family Pack contains 20 individually wrapped pads, perfect for stocking up. Each pad is 240mm long with secure-fit wings for all-day comfort.",
      },
      {
        q: "Can these be used for first periods?",
        a: "Absolutely! Our pads are designed with first-time users in mind. The slim profile and comfortable fit make them ideal for young girls starting their period journey.",
      },
    ],
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
      "Extra-long 280mm length",
      "Super absorbent core",
      "Leak-guard barriers",
      "Ultra-soft top sheet",
      "Quiet biodegradable pads",
      "Dermatologically tested",
    ],
    specifications: {
      Absorbency: "Overnight / Heavy",
      Length: "280mm",
      Width: "80mm",
      "Count per pack": "6 pads",
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
    reviews: [
      {
        name: "Meera K.",
        rating: 5,
        date: "2024-02-20",
        title: "No more midnight leaks!",
        text: "I've been using Kumfora for a few cycles now, and it's very comfortable. The absorbency is good, and I don't feel any irritation. It gives me confidence even on busy days.",
        verified: true,
      },
      {
        name: "Sneha P.",
        rating: 5,
        date: "2024-02-14",
        title: "Finally sleeping through the night",
        text: "The cotton-soft surface feels gentle on my skin. It stays comfortable for hours and provides reliable protection. Definitely worth trying.",
        verified: true,
      },
      {
        name: "Priyanka L.",
        rating: 5,
        date: "2024-02-08",
        title: "Great protection for overnight use",
        text: "Comfortable, soft, and reliable. I felt secure while traveling and during long work hours. I'm happy with the product.",
        verified: true,
      },
    ],
    faqs: [
      {
        q: "How are night pads different from day pads?",
        a: "Night pads are 280mm long (vs 240mm for day pads), with a wider 80mm design and leak-guard barriers for full overnight coverage. They also have a super absorbent core for heavy flow.",
      },
      {
        q: "How many hours can I use a night pad?",
        a: "Our night pads provide up to 8-10 hours of reliable protection, so you can sleep through the night without worrying about leaks.",
      },
      {
        q: "Are these good for heavy flow days too?",
        a: "Absolutely! The overnight absorbency level makes them perfect for heavy flow days as well, not just nighttime use.",
      },
      {
        q: "Do the night pads make noise when moving?",
        a: "No! We specifically designed the wrapper and backing to be quiet, so you can move freely without any rustling sounds.",
      },
      {
        q: "How many pads come in this pack?",
        a: "This small pack contains 6 individually wrapped night pads, great for trying them out or for occasional overnight use.",
      },
    ],
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
