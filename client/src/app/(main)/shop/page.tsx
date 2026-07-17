'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Filter, X, LayoutGrid, LayoutList, Search } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { getAllProducts } from '@/data/products';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import { CATEGORIES, SORT_OPTIONS } from '@/constants';

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card h-80 bg-kumfora-lightGray/50" />
          ))}
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  // Load products
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setIsLoading(false);
  }, []);

  // Filter products
  useEffect(() => {
    if (products.length === 0) return;

    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.badges.some((b) => b.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured first
        result.sort((a, b) => (b.badges.includes('Best Seller') ? 1 : 0) - (a.badges.includes('Best Seller') ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  // Update URL
  const updateURL = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy !== 'featured') params.set('sort', sortBy);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('featured');
    setPriceRange([0, 2000]);
  };

  const hasActiveFilters = searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < 2000;

  if (isLoading) {
    return (
      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card h-80 bg-kumfora-lightGray/50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kumfora-cream/30">
      {/* Page Header */}
      <header className="bg-white border-b border-kumfora-lightGray/50 pt-24 lg:pt-30 pb-8 lg:pb-12">
        <div className="container-main">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-body-sm text-kumfora-gray mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-kumfora-terracotta">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/shop" className="hover:text-kumfora-terracotta">Shop</Link>
              <span aria-hidden="true">/</span>
              <span className="text-kumfora-charcoal font-medium" aria-current="page">All Products</span>
            </nav>
            <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal mb-2">
              Shop Our Collection
            </h1>
            <p className="text-body-lg text-kumfora-slate">
              Discover comfortable, confidence-boosting period care designed for girls.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-main py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Mobile Filter Toggle */}
              <Button
                variant="secondary"
                className="lg:hidden w-full justify-between"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown className={cn('w-5 h-5 transition-transform', isFilterOpen && 'rotate-180')} />
              </Button>

              <div className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isFilterOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-[800px] lg:opacity-100'
              )}>
                {/* Search */}
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                    aria-label="Search products"
                  />
                  <Button type="submit" variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                    <Search className="w-4 h-4" />
                  </Button>
                </form>

                {/* Category Filter */}
                <fieldset>
                  <legend className="label">Category</legend>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      if (window.innerWidth < 1024) setIsFilterOpen(false);
                    }}
                    options={CATEGORIES}
                    placeholder="All Categories"
                  />
                </fieldset>

                {/* Price Range */}
                <fieldset>
                  <legend className="label">Price Range</legend>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-body-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-kumfora-lightGray rounded-lg appearance-none accent-kumfora-terracotta"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-kumfora-lightGray rounded-lg appearance-none accent-kumfora-terracotta"
                    />
                  </div>
                </fieldset>

                {/* Sort */}
                <fieldset>
                  <legend className="label">Sort By</legend>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    options={SORT_OPTIONS}
                  />
                </fieldset>

                {hasActiveFilters && (
                  <Button variant="link" onClick={clearFilters} className="w-full justify-start">
                    <X className="w-4 h-4" />
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <p className="text-body text-kumfora-slate">
                Showing <span className="font-medium text-kumfora-charcoal">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <LayoutGrid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <LayoutList className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  'gap-6',
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'space-y-4'
                )}
                role="list"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === 'list' ? 'compact' : 'featured'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 card">
                <div className="w-20 h-20 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-10 h-10 text-kumfora-terracotta" />
                </div>
                <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">
                  No products found
                </h3>
                <p className="text-body text-kumfora-gray mb-6">
                  Try adjusting your filters or search terms.
                </p>
                <Button variant="secondary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 12 && (
              <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
                <Button variant="secondary" size="sm" aria-label="Previous page">Previous</Button>
                <Button variant="primary" size="sm" aria-label="Page 1" aria-current="page">1</Button>
                <Button variant="secondary" size="sm" aria-label="Page 2">2</Button>
                <Button variant="secondary" size="sm" aria-label="Page 3">3</Button>
                <span className="px-2 text-kumfora-gray">…</span>
                <Button variant="secondary" size="sm" aria-label="Last page">5</Button>
                <Button variant="secondary" size="sm" aria-label="Next page">Next</Button>
              </nav>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}