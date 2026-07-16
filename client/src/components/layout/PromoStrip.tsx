'use client';

import { Sparkles, Truck, Gift, Tag } from 'lucide-react';

const promos = [
  {
    icon: Sparkles,
    text: "New Arrival: Ultra Thin Night Pads — Shop Now",
    href: "/shop?category=night",
  },
  {
    icon: Tag,
    text: "Flat 20% OFF on First Order — Use Code: KUMFORA20",
    href: "/shop",
  },
  {
    icon: Truck,
    text: "Free Shipping on Orders above ₹499",
    href: "/shipping",
  },
  {
    icon: Gift,
    text: "Buy 2 Bundles, Get 1 Free — Limited Period Offer",
    href: "/shop?category=bundle",
  },
  {
    icon: Sparkles,
    text: "Dermatologically Tested & 100% Safe",
    href: "/about",
  },
  {
    icon: Tag,
    text: "Refer a Friend & Earn ₹100 Off",
    href: "/feedback",
  },
];

const items = [...promos, ...promos, ...promos];

export function PromoStrip() {
  return (
    <div className="bg-kumfora-hotPink text-white relative z-50 overflow-hidden">
      <style>{`
        .promo-marquee {
          display: flex;
          align-items: center;
          gap: 2rem;
          width: max-content;
          animation: promo-scroll 30s linear infinite;
        }
        .promo-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes promo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
      <div className="promo-marquee h-10">
        {items.map((promo, i) => (
          <a
            key={i}
            href={promo.href}
            className="flex items-center gap-2 shrink-0 text-caption font-semibold whitespace-nowrap hover:text-kumfora-blush transition-colors"
          >
            <promo.icon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{promo.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}