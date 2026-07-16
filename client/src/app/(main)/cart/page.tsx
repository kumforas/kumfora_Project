'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Trash2, ArrowLeft, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { SHIPPING_FREE_THRESHOLD, SHIPPING_FLAT_RATE } from '@/constants';
import Image from 'next/image';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (items.length > 0) {
      setIsCheckingOut(true);
      router.push('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <main className="pt-16 min-h-screen bg-kumfora-cream/30 flex items-center justify-center">
        <div className="container-main text-center py-16">
          <div className="w-24 h-24 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-12 h-12 text-kumfora-terracotta" />
          </div>
          <h1 className="text-display-md font-display font-medium text-kumfora-charcoal mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-body-lg text-kumfora-slate mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added any comfort essentials yet. Let&apos;s fix that!
          </p>
          <Link href="/shop" className="btn-primary inline-flex">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <div className="container-main py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-display-sm font-display font-medium text-kumfora-charcoal">
                Shopping Cart ({items.length})
              </h1>
              <Button variant="link" onClick={clearCart} size="sm">
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </Button>
            </div>

            <ul className="space-y-4" role="list">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
              ))}
            </ul>

            {/* Continue Shopping */}
            <Link href="/shop" className="btn-link inline-flex items-center gap-2 mt-4">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <aside className="sticky top-24 card p-6 space-y-6">
              <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal">Order Summary</h2>

              <div className="space-y-3 text-body">
                <div className="flex justify-between text-kumfora-slate">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-kumfora-slate">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-caption text-kumfora-terracotta bg-kumfora-blush/50 p-2 rounded-lg">
                    Add {formatPrice(SHIPPING_FREE_THRESHOLD - subtotal)} more for free shipping!
                  </p>
                )}
                <div className="divider" />
                <div className="flex justify-between text-heading-md font-semibold text-kumfora-charcoal">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-caption text-kumfora-sage">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure checkout</span>
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Free shipping over ₹499</span>
                <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> 30-day returns</span>
              </div>

              <Button onClick={handleCheckout} disabled={isCheckingOut} className="w-full" size="lg" leftIcon={<CreditCard className="w-5 h-5" />}>
                {isCheckingOut ? 'Processing...' : `Proceed to Checkout — ${formatPrice(total)}`}
              </Button>

              <p className="text-caption text-center text-kumfora-gray">
                By proceeding, you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: { product: any; quantity: number };
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;
  const maxQty = product.stockCount || 10;

  return (
    <li className="card p-4 flex gap-4">
      <Link href={`/product/${product.slug}`} className="shrink-0" aria-label={product.name}>
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-kumfora-blush relative">
          <Image src={product.thumbnail} alt="" fill className="object-cover" sizes="96px" />
        </div>
      </Link>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link href={`/product/${product.slug}`} className="block" aria-label={product.name}>
            <h3 className="text-body font-medium text-kumfora-charcoal truncate">{product.name}</h3>
          </Link>
          <p className="text-body-sm text-kumfora-terracotta font-medium mt-1">{formatPrice(lineTotal)}</p>
          <p className="text-caption text-kumfora-gray mt-1">Pack of {product.count} • {product.absorbency}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 border border-kumfora-lightGray rounded-xl overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
              className="btn-ghost p-2 h-10 w-10"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-body font-medium text-kumfora-charcoal">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(product.id, Math.min(maxQty, quantity + 1))}
              className="btn-ghost p-2 h-10 w-10"
              aria-label="Increase quantity"
              disabled={quantity >= maxQty}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => onRemove(product.id)}
            className="btn-ghost p-2 text-kumfora-gray hover:text-kumfora-terracotta"
            aria-label={`Remove ${product.name}`}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </li>
  );
}
