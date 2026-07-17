'use client';

import { useState } from 'react';
import { Star, Shield, Truck, RotateCcw, Leaf, Sparkles, Check, ChevronDown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductGallery } from '@/components/product/ProductGallery';
import { useCartStore } from '@/lib/store';
import { useWishlistStore } from '@/lib/wishlist';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews' | 'faq'>('details');
  const { addItem } = useCartStore();
  const { toggleItem, items } = useWishlistStore();
  const isWishlisted = items.includes(product.id);
  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;
  const isOutOfStock = !product.inStock || product.stockCount === 0;
  const maxQuantity = product.stockCount || 10;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem(product, selectedQuantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addItem(product, selectedQuantity);
      window.location.href = '/checkout';
    }
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: Sparkles },
    { id: 'specs', label: 'Specifications', icon: Shield },
    { id: 'reviews', label: `Reviews (${product.reviewCount})`, icon: Star },
    { id: 'faq', label: 'FAQs', icon: ChevronDown },
  ];

  const features = [
    { icon: Shield, title: 'Dermatologically Tested', desc: 'Safe for sensitive skin' },
    { icon: Leaf, title: 'Biodegradable Wrapper', desc: 'Eco-friendly disposal' },
    { icon: Sparkles, title: 'Ultra-Soft Top Sheet', desc: 'Cloud-like comfort' },
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹499' },
    { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free' },
  ];

  return (
    <div className="space-y-8">
      {/* Gallery & Info */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24">
          <ProductGallery images={product.images} alt={product.name} />

          {/* Trust Badges */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {features.slice(0, 3).map((feature) => (
              <div key={feature.title} className="text-center p-4 rounded-xl bg-kumfora-cream">
                <div className="w-10 h-10 rounded-xl bg-kumfora-blush flex items-center justify-center mx-auto mb-2">
                  <feature.icon className="w-5 h-5 text-kumfora-terracotta" />
                </div>
                <p className="text-caption font-medium text-kumfora-charcoal">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral" className="text-caption">{product.category}</Badge>
            <Badge variant="primary" className="text-caption">{product.absorbency}</Badge>
            {product.badges.map((badge) => (
              <Badge key={badge} variant="neutral" className="text-capitalize">
                {badge}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-display-md font-display font-medium text-kumfora-charcoal">{product.name}</h1>

          {/* Rating & Tagline */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1" role="img" aria-label={`${product.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5',
                      i < Math.floor(product.rating) ? 'fill-kumfora-coral text-kumfora-coral' : 'text-kumfora-lightGray'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-body font-medium text-kumfora-charcoal">{product.rating}</span>
              <span className="text-body-sm text-kumfora-gray">({product.reviewCount} reviews)</span>
            </div>
            {discount > 0 && (
              <Badge variant="danger" className="text-body-sm">{discount}% OFF</Badge>
            )}
          </div>

          <p className="text-body-lg text-kumfora-slate">{product.tagline}</p>

          {/* Price */}
          <div className="flex flex-wrap items-baseline gap-4">
            <span className="text-display-sm font-display font-bold text-kumfora-terracotta">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-heading-md line-through text-kumfora-gray">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <Badge variant="danger" className="text-body-sm ml-2">{discount}% OFF</Badge>
            )}
          </div>

          {/* Short Description */}
          <p className="text-body text-kumfora-gray border-y border-kumfora-lightGray/50 py-4">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-kumfora-sageLight flex items-center justify-center">
                  <Check className="w-4 h-4 text-kumfora-sage" />
                </div>
                <div>
                  <p className="text-body-sm font-medium text-kumfora-charcoal">{feature.title}</p>
                  <p className="text-body-sm text-kumfora-gray">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label className="label">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-kumfora-lightGray rounded-xl overflow-hidden">
                <button
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="btn-ghost p-3 h-12 w-12"
                  aria-label="Decrease quantity"
                  disabled={selectedQuantity <= 1}
                >
                  <span className="w-5 h-5">−</span>
                </button>
                <span className="w-16 text-center text-body font-medium text-kumfora-charcoal select-none">
                  {selectedQuantity}
                </span>
                <button
                  onClick={() => setSelectedQuantity(Math.min(maxQuantity, selectedQuantity + 1))}
                  className="btn-ghost p-3 h-12 w-12"
                  aria-label="Increase quantity"
                  disabled={selectedQuantity >= maxQuantity}
                >
                  <span className="w-5 h-5">+</span>
                </button>
              </div>
              <span className="text-body-sm text-kumfora-gray">
                {isOutOfStock ? 'Out of Stock' : `${product.stockCount} left in stock`}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              size="lg"
              className="flex-1"
              leftIcon={<span className="w-5 h-5">🛒</span>}
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              Buy Now
            </Button>
            <Button
              onClick={() => toggleItem(product.id)}
              variant={isWishlisted ? 'primary' : 'secondary'}
              size="lg"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Delivery & Returns */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-kumfora-lightGray/50">
            <div className="flex items-center gap-2 text-body-sm text-kumfora-slate">
              <Truck className="w-5 h-5 text-kumfora-terracotta" />
              <span>Delivery by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
            </div>
            <div className="flex items-center gap-2 text-body-sm text-kumfora-slate">
              <RotateCcw className="w-5 h-5 text-kumfora-terracotta" />
              <span>30-day easy returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-kumfora-lightGray/50 pt-8">
        <div className="flex gap-1 bg-kumfora-cream rounded-xl p-1 mb-8 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Product information">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-body font-medium transition-all whitespace-nowrap shrink-0',
                activeTab === tab.id
                  ? 'bg-white shadow-card text-kumfora-terracotta'
                  : 'text-kumfora-gray hover:text-kumfora-charcoal'
              )}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
            >
              <tab.icon className="w-5 h-5" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>

        <div id="panel-details" role="tabpanel" aria-labelledby="tab-details" hidden={activeTab !== 'details'}>
          <ProductDetailsContent product={product} />
        </div>
        <div id="panel-specs" role="tabpanel" aria-labelledby="tab-specs" hidden={activeTab !== 'specs'}>
          <ProductSpecsContent product={product} />
        </div>
        <div id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" hidden={activeTab !== 'reviews'}>
          <ProductReviewsContent product={product} />
        </div>
        <div id="panel-faq" role="tabpanel" aria-labelledby="tab-faq" hidden={activeTab !== 'faq'}>
          <ProductFAQContent product={product} />
        </div>
      </div>
    </div>
  );
}

function ProductDetailsContent({ product }: { product: Product }) {
  return (
    <div className="prose prose-kumfora max-w-none space-y-6">
      <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal">About This Product</h2>
      <p className="text-body text-kumfora-slate leading-relaxed">{product.description}</p>

      <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal">Key Features</h3>
      <ul className="space-y-3 list-disc list-inside text-body text-kumfora-slate">
        {product.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal">Why Choose {product.name}?</h3>
      <p className="text-body text-kumfora-slate leading-relaxed">
        Designed specifically for young girls, our pads combine superior absorption with ultra-soft comfort.
        Each pad features leak-guard barriers and a breathable design that keeps you feeling fresh and confident
        all day long. The biodegradable wrapper makes disposal easy and eco-friendly.
      </p>
    </div>
  );
}

function ProductSpecsContent({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal">Specifications</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(product.specifications).map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-4 bg-kumfora-cream rounded-xl">
            <dt className="text-body-sm font-medium text-kumfora-charcoal w-full sm:w-auto">{key}</dt>
            <dd className="text-body text-kumfora-slate font-medium text-kumfora-terracotta">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ProductReviewsContent({ product }: { product: Product }) {
  // Mock reviews data
  const reviews = [
    { id: 1, name: 'Priya S.', rating: 5, date: '2024-01-15', title: 'Best pads for my daughter!', text: 'My 12-year-old started her periods and these are perfect. No leaks, very comfortable, and she says they don\'t feel bulky at all.', verified: true },
    { id: 2, name: 'Anita M.', rating: 5, date: '2024-01-10', title: 'Great quality', text: 'Finally found pads that work for heavy flow nights. The extra length really helps. Will definitely buy again.', verified: true },
    { id: 3, name: 'Kavya R.', rating: 4, date: '2024-01-05', title: 'Good but packaging could be better', text: 'The pads themselves are excellent - soft and absorbent. Just wish the individual wrappers were easier to open.', verified: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal">Customer Reviews</h2>
        <Button variant="secondary" size="sm">Write a Review</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="text-center p-8 bg-kumfora-cream rounded-2xl">
            <p className="text-5xl font-display font-bold text-kumfora-terracotta">{product.rating}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={i < Math.floor(product.rating) ? 'fill-kumfora-coral text-kumfora-coral w-6 h-6' : 'text-kumfora-lightGray w-6 h-6'} />
              ))}
            </div>
            <p className="text-body text-kumfora-gray mt-2">Based on {product.reviewCount} reviews</p>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <article key={review.id} className="card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-kumfora-charcoal">{review.name}</span>
                    {review.verified && <Badge variant="success" className="text-caption">Verified</Badge>}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={i < review.rating ? 'fill-kumfora-coral text-kumfora-coral w-4 h-4' : 'text-kumfora-lightGray w-4 h-4'} />
                      ))}
                    </div>
                    <time className="text-caption text-kumfora-gray">{new Date(review.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                  </div>
                </div>
              </div>
              <h4 className="text-body font-medium text-kumfora-charcoal mt-3">{review.title}</h4>
              <p className="text-body text-kumfora-slate mt-1">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductFAQContent({ product }: { product: Product }) {
  const faqs = [
    { q: 'Are these pads suitable for sensitive skin?', a: 'Yes! Our pads are dermatologically tested and free from harsh chemicals, fragrances, and chlorine bleaching. The ultra-soft top sheet is designed specifically for sensitive young skin.' },
    { q: 'How long can I wear each pad?', a: 'For optimal hygiene and comfort, we recommend changing every 4-6 hours during the day. For overnight use, our night pads provide up to 8-10 hours of protection.' },
    { q: 'Are the wrappers really biodegradable?', a: 'Yes! Each pad comes in a plant-based biodegradable wrapper that breaks down naturally. It\'s our small step toward a greener planet.' },
    { q: 'What absorbency should I choose?', a: 'Day pads (Regular) are perfect for light to moderate flow. Night pads (Overnight) have extra length and absorbency for heavy flow or overnight protection.' },
    { q: 'Can these be used for first periods?', a: 'Absolutely! Our pads are designed with first-time users in mind. The slim profile and comfortable fit make them ideal for young girls starting their period journey.' },
  ];

  return (
    <div className="space-y-4 max-w-3xl">
      <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.q} answer={faq.a} index={index} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details className="group card overflow-hidden">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
        <span className="text-body font-medium text-kumfora-charcoal pr-4">{question}</span>
        <ChevronDown className={cn('w-5 h-5 text-kumfora-gray transition-transform', isOpen && 'rotate-180')} />
      </summary>
      <div className="px-5 pb-5">
        <p className="text-body text-kumfora-slate">{answer}</p>
      </div>
    </details>
  );
}