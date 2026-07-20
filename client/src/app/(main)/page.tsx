import { Shield, Leaf, Sparkles, Heart } from "lucide-react";

import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import Features from "@/components/home/Features";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Newsletter } from "@/components/home/Newsletter";
import { getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Comfortable Period Care for Girls",
  description:
    "Discover Kumfora's premium period pads designed for girls. Ultra-soft, leak-proof, and eco-friendly. Free shipping on orders over ₹499.",
};

export default async function HomePage() {
  const products = getAllProducts();

  return (
    <div className="flex-1">
      <Hero />
      <Features />
      <TrustStrip />
      <FeaturedProducts products={products} />
      <AboutPreview />
      <Newsletter />
    </div>
  );
}
