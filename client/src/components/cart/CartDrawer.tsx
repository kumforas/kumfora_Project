'use client';

import { useCartStore } from '@/lib/store';
import { X, Plus, Minus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, cn } from '@/lib/utils';
import { SHIPPING_FREE_THRESHOLD, SHIPPING_FLAT_RATE } from '@/constants';
import type { CartItem } from '@/types';

export function CartDrawer() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart, isOpen, closeCart } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={closeCart} aria-hidden="true" />
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl flex flex-col',
          'lg:max-w-lg'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-kumfora-lightGray/50 sticky top-0 bg-white z-10">
          <h2 className="text-heading-md font-display font-medium text-kumfora-charcoal">
            Your Cart ({itemCount})
          </h2>
          <button onClick={closeCart} className="btn-ghost p-2" aria-label="Close cart">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center px-6">
              <div className="w-20 h-20 rounded-full bg-kumfora-blush flex items-center justify-center mb-4">
                <Tag className="w-10 h-10 text-kumfora-hotPink" />
              </div>
              <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">
                Your cart is empty
              </h3>
              <p className="text-body text-kumfora-gray mb-6 max-w-xs">
                Looks like you haven&apos;t picked your comfort essentials yet.
              </p>
              <Link href="/shop" onClick={closeCart} className="btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-4" role="list">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-kumfora-lightGray/50 p-6 space-y-4 sticky bottom-0 bg-white z-10">
            <div className="space-y-2 text-body-sm">
              <div className="flex justify-between text-kumfora-slate">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-kumfora-slate">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-caption text-kumfora-hotPink">
                  Add {formatPrice(SHIPPING_FREE_THRESHOLD - subtotal)} more for free shipping!
                </p>
              )}
              <div className="divider" />
              <div className="flex justify-between text-heading-sm font-semibold text-kumfora-charcoal">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full justify-center py-4">
              <ShoppingBag className="w-5 h-5" />
              Proceed to Checkout
            </Link>
            <button onClick={clearCart} className="btn-link w-full justify-center">
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <li className="flex gap-4 p-3 bg-kumfora-cream rounded-xl">
      <Link href={`/product/${product.slug}`} className="shrink-0" aria-label={product.name}>
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-kumfora-blush relative">
          <Image src={product.thumbnail} alt="" fill className="object-cover" sizes="80px" />
        </div>
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link href={`/product/${product.slug}`} className="block" aria-label={product.name}>
            <h3 className="text-body font-medium text-kumfora-charcoal truncate">{product.name}</h3>
          </Link>
          <p className="text-body-sm text-kumfora-hotPink font-medium mt-1">{formatPrice(lineTotal)}</p>
          <p className="text-caption text-kumfora-gray mt-1">Pack of {product.count}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 border border-kumfora-lightGray rounded-xl overflow-hidden">
            <button onClick={() => onUpdateQuantity(product.id, quantity - 1)} className="btn-ghost p-2 h-10 w-10" aria-label="Decrease quantity" disabled={quantity <= 1}>
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-body font-medium text-kumfora-charcoal">{quantity}</span>
            <button onClick={() => onUpdateQuantity(product.id, quantity + 1)} className="btn-ghost p-2 h-10 w-10">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => onRemove(product.id)} className="btn-ghost p-2 text-kumfora-gray hover:text-kumfora-hotPink" aria-label={`Remove ${product.name}`}>
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </li>
  );
}
