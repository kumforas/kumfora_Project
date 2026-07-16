'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlist';
import { useCartStore } from '@/lib/store';
import { getAllProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const allProducts = getAllProducts();
  const wishlistProducts = allProducts.filter((p) => items.includes(p.id));

  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <div className="container-main py-8 lg:py-12">
        <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal mb-2">
          My Wishlist
        </h1>
        <p className="text-body text-kumfora-gray mb-8">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
        </p>

        {wishlistProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <article key={product.id} className="card overflow-hidden">
                <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-kumfora-blush">
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
                <div className="p-5">
                  <Link href={`/product/${product.slug}`}>
                    <h2 className="text-heading-md font-display font-medium text-kumfora-charcoal hover:text-kumfora-hotPink transition-colors">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="text-body-sm text-kumfora-gray mt-1 mb-3">{product.shortDescription}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-heading-md font-semibold text-kumfora-charcoal">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-body-sm text-kumfora-gray line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        addItem(product);
                        removeItem(product.id);
                      }}
                      leftIcon={<ShoppingBag className="w-4 h-4" />}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Trash2 className="w-4 h-4 text-kumfora-rose" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 card">
            <div className="w-20 h-20 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-kumfora-hotPink" />
            </div>
            <h2 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-body text-kumfora-gray mb-6">
              Save items you love for later by clicking the heart icon.
            </p>
            <Link href="/shop">
              <Button leftIcon={<ArrowRight className="w-4 h-4" />}>
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
