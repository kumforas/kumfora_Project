"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlist";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
}

export function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const { toggleItem, items } = useWishlistStore();
  const isWishlisted = items.includes(product.id);
  const { addItem } = useCartStore();
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;
  const isOutOfStock = !product.inStock || product.stockCount === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem(product);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  const handleClick = () => {
    window.location.href = `/product/${product.slug}`;
  };

  if (variant === "compact") {
    return (
      <article
        className="group flex gap-4 p-4 bg-white rounded-2xl border border-kumfora-rose/10 hover:border-kumfora-pink/30 transition-colors cursor-pointer"
        onClick={handleClick}
      >
        <Link
          href={`/product/${product.slug}`}
          className="shrink-0"
          aria-hidden="true"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-kumfora-blush relative">
            <Image
              src={product.thumbnail}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-body-sm font-bold text-kumfora-charcoal truncate group-hover:text-kumfora-hotPink transition-colors">
              {product.name}
            </h3>
            <p className="text-caption text-kumfora-gray mt-1">
              {product.shortDescription}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-body font-bold text-kumfora-hotPink">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-body-sm line-through text-kumfora-gray">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="badge-primary text-[10px]">{discount}% OFF</span>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="group relative cursor-pointer" onClick={handleClick}>
        <div className="relative bg-white rounded-2xl border border-kumfora-rose/10 overflow-hidden shadow-card transition-shadow hover:shadow-card-hover">
          <div className="relative aspect-square overflow-hidden">
            <Link
              href={`/product/${product.slug}`}
              className="block"
              aria-hidden="true"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </Link>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {discount > 0 && (
                <span className="badge-primary text-[10px]">{discount}% OFF</span>
              )}
              {product.badges.includes("Best Seller") && (
                <span className="badge bg-kumfora-gold text-white text-[10px]">
                  Best Seller
                </span>
              )}
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleWishlist}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "bg-kumfora-hotPink text-white"
                    : "bg-white text-kumfora-charcoal hover:bg-kumfora-hotPink hover:text-white"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                />
              </button>
            </div>

            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary py-2 text-xs flex items-center justify-center gap-1.5"
                disabled={isOutOfStock}
              >
                <ShoppingBag className="w-4 h-4" />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          <div className="p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="badge bg-kumfora-sageLight text-kumfora-sage capitalize text-[10px]">
                {product.category}
              </span>
              <span className="badge bg-kumfora-blush text-kumfora-hotPink capitalize text-[10px]">
                {product.absorbency}
              </span>
            </div>
            <h3 className="text-sm font-bold text-kumfora-charcoal group-hover:text-kumfora-hotPink transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-kumfora-gray line-clamp-1">
              {product.tagline}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-kumfora-hotPink">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs line-through text-kumfora-gray">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div
                className="flex items-center gap-0.5"
                role="img"
                aria-label={`${product.rating} out of 5 stars`}
              >
                <Star className="w-3 h-3 fill-kumfora-gold text-kumfora-gold" />
                <span className="text-xs font-bold text-kumfora-charcoal">
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative cursor-pointer" onClick={handleClick}>
      <div className="relative bg-white rounded-3xl border border-kumfora-rose/10 overflow-hidden shadow-card transition-shadow hover:shadow-card-hover">
        <div className="relative aspect-square overflow-hidden">
          <Link
            href={`/product/${product.slug}`}
            className="block"
            aria-hidden="true"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {discount > 0 && (
              <span className="badge-primary">{discount}% OFF</span>
            )}
            {product.badges.includes("Best Seller") && (
              <span className="badge bg-kumfora-gold text-white">
                Best Seller
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isWishlisted
                  ? "bg-kumfora-hotPink text-white"
                  : "bg-white text-kumfora-charcoal hover:bg-kumfora-hotPink hover:text-white"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary py-3 text-body-sm flex items-center justify-center gap-2"
              disabled={isOutOfStock}
            >
              <ShoppingBag className="w-5 h-5" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge bg-kumfora-sageLight text-kumfora-sage capitalize">
              {product.category}
            </span>
            <span className="badge bg-kumfora-blush text-kumfora-hotPink capitalize">
              {product.absorbency}
            </span>
          </div>
          <h3 className="text-lg font-bold text-kumfora-charcoal group-hover:text-kumfora-hotPink transition-colors">
            {product.name}
          </h3>
          <p className="text-body-sm text-kumfora-gray line-clamp-2">
            {product.tagline}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-kumfora-hotPink">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-body line-through text-kumfora-gray">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div
              className="flex items-center gap-1"
              role="img"
              aria-label={`${product.rating} out of 5 stars`}
            >
              <Star className="w-4 h-4 fill-kumfora-gold text-kumfora-gold" />
              <span className="text-body-sm font-bold text-kumfora-charcoal">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
