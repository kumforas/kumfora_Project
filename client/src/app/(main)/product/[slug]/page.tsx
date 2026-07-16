import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { ProductDetails } from '@/components/product/ProductDetails';
import { ProductCard } from '@/components/product/ProductCard';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.images,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.tagline,
      images: product.images,
    },
  };
}

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  return (
    <main className="pt-16 min-h-screen bg-white">
      <div className="container-main py-8 lg:py-12">
        <ProductDetails product={product} />
      </div>

      {relatedProducts.length > 0 && (
        <section className="py-12 lg:py-16 bg-kumfora-cream/30" aria-labelledby="related-heading">
          <div className="container-main">
            <div className="flex items-center justify-between mb-8">
              <h2 id="related-heading" className="text-display-sm font-display font-medium text-kumfora-charcoal">
                You May Also Like
              </h2>
              <Link href="/shop" className="btn-link">View All Products</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
