"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function ProductGallery({
  images,
  alt,
  currentIndex: controlledIndex,
  onIndexChange,
}: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(controlledIndex ?? 0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLargeScreen, setIsLargeScreen] = useState(true);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsLargeScreen(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const LENS_SIZE = 160;
  const ZOOM = 2.5;

  const index = controlledIndex ?? currentIndex;

  const goToPrevious = () => {
    const newIndex = index === 0 ? images.length - 1 : index - 1;
    if (!controlledIndex) setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const goToNext = () => {
    const newIndex = index === images.length - 1 ? 0 : index + 1;
    if (!controlledIndex) setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLensPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLargeScreen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-kumfora-cream rounded-2xl flex items-center justify-center">
        <span className="text-kumfora-gray">No images available</span>
      </div>
    );
  }

  return (
    <div className="relative group" onKeyDown={handleKeyDown}>
      <div
        ref={containerRef}
        className="relative aspect-square rounded-2xl overflow-hidden bg-kumfora-cream lg:cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[index]}
          alt={`${alt} - Image ${index + 1} of ${images.length}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
        />

        {isZoomed && (
          <div
            className="absolute rounded-full border-2 border-white/80 shadow-lg pointer-events-none z-30"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lensPosition.x - LENS_SIZE / 2,
              top: lensPosition.y - LENS_SIZE / 2,
              backgroundImage: `url(${images[index]})`,
              backgroundSize: `${containerSize.width * ZOOM}px ${containerSize.height * ZOOM}px`,
              backgroundPosition: `${LENS_SIZE / 2 - lensPosition.x * ZOOM}px ${LENS_SIZE / 2 - lensPosition.y * ZOOM}px`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-kumfora-charcoal hover:bg-kumfora-blush shadow-card opacity-0 group-hover:opacity-100 transition-opacity z-40"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-kumfora-charcoal hover:bg-kumfora-blush shadow-card opacity-0 group-hover:opacity-100 transition-opacity z-40"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-40"
            role="tablist"
            aria-label="Product images"
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!controlledIndex) setCurrentIndex(i);
                  onIndexChange?.(i);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === index
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75",
                )}
                role="tab"
                aria-selected={i === index}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          role="tablist"
          aria-label="Product thumbnails"
        >
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => {
                if (!controlledIndex) setCurrentIndex(i);
                onIndexChange?.(i);
              }}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                i === index
                  ? "border-kumfora-hotPink ring-2 ring-kumfora-hotPink/20"
                  : "border-transparent hover:border-kumfora-rose/50",
              )}
              role="tab"
              aria-selected={i === index}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={image}
                alt={`${alt} - Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
