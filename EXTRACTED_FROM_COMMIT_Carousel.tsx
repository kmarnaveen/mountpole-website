"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CarouselItem {
  id: string | number;
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  textPosition?: "start" | "top-center";
  href?: string; // Direct link for clickable banners
  cta?: {
    text: string;
    href: string;
  };
  content?: React.ReactNode; // Support for custom React components
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  className?: string;
  itemsPerSlide?: number; // Support for showing multiple items at once
}

export default function Carousel({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  className,
  itemsPerSlide = 1,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
      setTimeout(() => setIsAutoPlaying(true), 1000);
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
      setTimeout(() => setIsAutoPlaying(true), 1000);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(autoPlay);
  };

  return (
    <div
      ref={carouselRef}
      className={cn(
        "relative w-full overflow-hidden rounded-none sm:rounded-xl md:rounded-2xl select-none carousel-container",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      {/* Multi-item Carousel for Benefits/Cards */}
      {itemsPerSlide > 1 ? (
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 flex gap-4 md:gap-6"
                >
                  {items
                    .slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`flex-1 ${
                          itemsPerSlide === 3 ? "min-w-0" : ""
                        }`}
                      >
                        {item.content || (
                          <div className="p-4 bg-white rounded-lg shadow">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows for multi-item */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4 text-gray-700" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4 text-gray-700" />
              </button>
            </>
          )}

          {/* Dots Indicator for multi-item */}
          {showDots && totalSlides > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentIndex
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Single-item Carousel for Hero Banners */
        <>
          <div className="relative h-[250px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[520px]">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  index === currentIndex ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="w-full h-full relative">
                  {/* Clickable overlay for banners with href but no CTA */}
                  {item.href && !item.cta && (
                    <a
                      href={item.href}
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10 cursor-pointer"
                      aria-label={`Go to ${item.title}`}
                    />
                  )}
                  {item.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title || "Carousel image"}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 h-full flex px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 z-50 ${
                      item.textPosition === "top-center"
                        ? "items-start justify-center pt-3 sm:pt-6 md:pt-8 lg:pt-10"
                        : "items-center justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
                        item.textPosition === "top-center" ? "text-center" : ""
                      } bg-black/30 backdrop-blur-lg rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl relative z-50`}
                    >
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight text-white drop-shadow-lg">
                        {item.title}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-5 leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-white/90 drop-shadow-md">
                        {item.description}
                      </p>
                      {item.cta && (
                        <div
                          className={
                            item.textPosition === "top-center"
                              ? "flex justify-center items-center h-16 sm:h-20 md:h-24"
                              : ""
                          }
                        >
                          <Button
                            size="default"
                            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 font-semibold px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base transition-all duration-200 hover:scale-105 shadow-lg"
                            asChild
                          >
                            <a href={item.cta.href}>{item.cta.text}</a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows for single-item */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-200 group z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-200 group z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Indicator for single-item */}
          {showDots && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200",
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/70"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/20">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
