import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types';
import { Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 lg:py-15" aria-labelledby="featured-heading">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumfora-blush text-kumfora-hotPink text-body-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Customer Favorites
            </span>
            <h2 id="featured-heading" className="text-display-lg font-heading font-bold text-kumfora-charcoal">
              Featured <span className="text-kumfora-hotPink">products</span>
            </h2>
            <p className="text-body-lg text-kumfora-gray mt-3 max-w-md">
              Loved by thousands of girls across India for comfort and reliability
            </p>
          </div>
          <Link href="/shop" className="btn-secondary">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}
