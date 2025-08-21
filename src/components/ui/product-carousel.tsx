"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Eye,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimitedTime?: boolean;
  discount?: string;
  colors?: string[];
  features?: string[];
  quickSpecs?: { [key: string]: string };
}

interface ProductCarouselProps {
  products: Product[];
  title: string;
  subtitle?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showQuickView?: boolean;
  showAddToCart?: boolean;
}

export default function ProductCarousel({
  products,
  title,
  subtitle,
  className,
  autoPlay = false,
  autoPlayInterval = 4000,
  showQuickView = true,
  showAddToCart = false,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    large: 4,
  };

  // Get current items per page based on screen size
  const getCurrentItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return itemsPerPage.large; // xl
      if (window.innerWidth >= 1024) return itemsPerPage.desktop; // lg
      if (window.innerWidth >= 640) return itemsPerPage.tablet; // sm
      return itemsPerPage.mobile;
    }
    return itemsPerPage.large;
  };

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(
    getCurrentItemsPerPage()
  );

  // Update items per page on window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerPage(getCurrentItemsPerPage());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, products.length - currentItemsPerPage);
        return prevIndex >= maxIndex ? 0 : prevIndex + currentItemsPerPage;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [
    isAutoPlaying,
    autoPlay,
    autoPlayInterval,
    products.length,
    currentItemsPerPage,
  ]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(autoPlay);
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, products.length - currentItemsPerPage);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + currentItemsPerPage;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, products.length - currentItemsPerPage);
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - currentItemsPerPage;
      return prevIndexNew < 0 ? maxIndex : prevIndexNew;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    isDragging.current = true;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    if (autoPlay) {
      setTimeout(() => setIsAutoPlaying(true), 2000);
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    if (autoPlay) {
      setTimeout(() => setIsAutoPlaying(true), 2000);
    }
  };

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Progress indicator */}
          {autoPlay && (
            <div className="hidden md:flex items-center space-x-2">
              <div className="text-xs text-gray-500">
                {Math.floor(currentIndex / currentItemsPerPage) + 1} /{" "}
                {Math.ceil(products.length / currentItemsPerPage)}
              </div>
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((Math.floor(currentIndex / currentItemsPerPage) + 1) /
                        Math.ceil(products.length / currentItemsPerPage)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 hover:scale-105"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 hover:scale-105"
              disabled={
                currentIndex >=
                Math.max(0, products.length - currentItemsPerPage)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden select-none carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          userSelect: "none",
          touchAction: "pan-y",
          WebkitTouchCallout: "none",
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex / currentItemsPerPage) * 100
            }%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2 md:px-3"
            >
              <Card
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-[1.02] relative overflow-hidden"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div
                    className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg overflow-hidden"
                    onDragStart={(e) => e.preventDefault()}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Product Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* Badges */}
                    {/* <div className="absolute top-3 left-3 flex flex-col space-y-2 z-20">
                      {product.isNew && (
                        <Badge className="bg-green-500 text-white px-2 py-1 text-xs font-medium animate-pulse">
                          <Zap className="w-3 h-3 mr-1" />
                          New
                        </Badge>
                      )}
                      {product.isBestSeller && (
                        <Badge className="bg-orange-500 text-white px-2 py-1 text-xs font-medium">
                          🔥 Best Seller
                        </Badge>
                      )}
                      {product.isLimitedTime && (
                        <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-medium animate-bounce">
                          ⚡ Limited
                        </Badge>
                      )}
                      {product.discount && (
                        <Badge className="bg-red-600 text-white px-2 py-1 text-xs font-medium">
                          {product.discount}
                        </Badge>
                      )}
                    </div> */}

                    {/* Quick Actions */}
                    {/* <div className="absolute top-3 right-3 flex flex-col space-y-2 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4 transition-colors",
                            favorites.has(product.id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-600"
                          )}
                        />
                      </button>

                      {showQuickView && (
                        <Link href={`/product/${product.id}`}>
                          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                        </Link>
                      )}
                    </div> */}

                    {/* Hover overlay with quick actions */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 z-30",
                        hoveredProduct === product.id
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      <div className="flex space-x-3">
                        <Link href={`/product/${product.id}`}>
                          <Button
                            size="sm"
                            className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Quick View
                          </Button>
                        </Link>
                        {showAddToCart && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/90 text-black hover:bg-white border-white transform hover:scale-105 transition-all duration-200"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Color variants */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex space-x-1 z-20">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border border-white shadow-sm"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <div className="w-3 h-3 rounded-full bg-gray-400 border border-white shadow-sm flex items-center justify-center">
                            <span className="text-[6px] text-white font-bold">
                              +{product.colors.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-4">
                    {/* Brand */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs font-medium">
                        {product.brand}
                      </Badge>
                    </div>

                    {/* Product Name */}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {product.name}
                      </h3>

                      {/* Quick Specs */}
                      {product.quickSpecs && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {Object.entries(product.quickSpecs)
                            .slice(0, 2)
                            .map(([key, value]) => (
                              <span
                                key={key}
                                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                              >
                                {value}
                              </span>
                            ))}
                        </div>
                      )}

                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {product.features.slice(0, 2).join(" • ")}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center pt-2 border-t border-gray-100">
                      <div className="flex space-x-2">
                        <Link href={`/product/${product.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 hover:scale-105"
                          >
                            Details
                          </Button>
                        </Link>
                        {showAddToCart && (
                          <Button
                            size="sm"
                            className="text-xs bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({
          length: Math.ceil(products.length / currentItemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index * currentItemsPerPage)}
            className={cn(
              "transition-all duration-300 rounded-full hover:scale-125",
              Math.floor(currentIndex / currentItemsPerPage) === index
                ? "bg-blue-600 w-8 h-2"
                : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
    </div>
  );
}
