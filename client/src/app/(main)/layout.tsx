'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PromoStrip } from '@/components/layout/PromoStrip';

const PROMO_HEIGHT = 40;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPromoHidden, setIsPromoHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPromoHidden(window.scrollY > PROMO_HEIGHT);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div
        className="transition-all duration-300 overflow-hidden"
        style={{ height: isPromoHidden ? 0 : PROMO_HEIGHT }}
      >
        <PromoStrip />
      </div>
      <Header isPromoHidden={isPromoHidden} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
