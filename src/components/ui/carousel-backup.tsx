"use client";

import { useRef, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks/useCarousel";
import { useGestureHandler } from "@/hooks/useGestureHandler";
import { CarouselControls, CarouselDots, CarouselProgress } from "./carousel-components";

// Simplified and focused interfaces
interface CarouselItem {
  id: string | number;
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  textPosition?: "start" | "top-center" | "bottom-center";
  href?: string;
  cta?: {
    text: string;
    href: string;
  };
  content?: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showProgress?: boolean;
  showControls?: boolean;
  className?: string;
  itemsPerSlide?: number;
  aspectRatio?: "16:9" | "21:9" | "4:3" | "1:1";
  priority?: boolean;
  onSlideChange?: (index: number) => void;
}

// Aspect ratio utility (memoized)
const getAspectRatioClass = (aspectRatio: string) => {
  switch (aspectRatio) {
    case "21:9": return "aspect-[21/9]";
    case "4:3": return "aspect-[4/3]";
    case "1:1": return "aspect-square";
    default: return "aspect-[16/9]";
  }
};

// Professional Slide Content Component
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCarousel } from "@/hooks/useCarousel";
import { useGestureHandler } from "@/hooks/useGestureHandler";
import { CarouselControls, CarouselDots, CarouselProgress } from "./carousel-components";

// Professional Carousel Item Interface
export interface CarouselItem {
  id: string | number;
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  content?: React.ReactNode;
  textPosition?: "start" | "center" | "top-center" | "bottom-center";
  href?: string;
  cta?: {
    text: string;
    href: string;
  };
}

// Professional Carousel Props Interface
export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  itemsPerSlide?: number;
  showControls?: boolean;
  showDots?: boolean;
  showProgress?: boolean;
  aspectRatio?: "16:9" | "21:9" | "4:3" | "1:1" | "auto";
  priority?: boolean;
  className?: string;
}

// Optimized Slide Content Component with Memoization
const SlideContent = React.memo<{
  item: CarouselItem;
  isActive: boolean;
  priority?: boolean;
}>(({ item, isActive, priority }) => (
  <div className="w-full h-full relative overflow-hidden">
    {/* Clickable overlay for banners with href but no CTA */}
    {item.href && !item.cta && (
      <a
        href={item.href}
        rel="noopener noreferrer"
        className="absolute inset-0 z-30 cursor-pointer"
        aria-label={`Go to ${item.title}`}
      />
    )}

    {/* Media Content */}
    {item.video ? (
      <video
        src={item.video}
        autoPlay={isActive}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        preload={isActive ? "auto" : "metadata"}
      />
    ) : item.image ? (
      <div className="relative w-full h-full">
        <Image
          src={item.image}
          alt={item.title || "Carousel image"}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isActive ? "scale-100" : "scale-105"
          )}
          priority={priority}
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
    )}

    {/* Content Overlay */}
    <div
      className={cn(
        "absolute inset-0 flex z-25",
        item.textPosition === "top-center"
          ? "items-start justify-center text-center px-4 sm:px-8 pt-6 sm:pt-16 md:pt-20"
          : item.textPosition === "bottom-center"
          ? "items-end justify-center text-center px-4 sm:px-8 pb-6 sm:pb-16 md:pb-20"
          : "items-center justify-start px-4 sm:px-8 md:px-12 lg:px-16",
        "py-4 sm:py-6"
      )}
    >
      <div
        className={cn(
          "relative z-30 group/content",
          "w-full max-w-[300px] sm:max-w-lg md:max-w-xl lg:max-w-2xl",
          item.textPosition?.includes("center") ? "text-center" : "text-left",
          "bg-gradient-to-br from-black/40 via-black/30 to-black/50",
          "sm:backdrop-blur-2xl border border-white/30 hover:border-white/40",
          "rounded-2xl sm:rounded-3xl lg:rounded-[2rem]",
          "shadow-2xl shadow-black/60 hover:shadow-black/80",
          "p-4 sm:p-8 md:p-10 lg:p-12",
          item.textPosition === "start" && "ml-0 sm:ml-4 md:ml-8",
          "transition-all duration-500 ease-out",
          "hover:scale-[1.02] hover:-translate-y-1",
          "transform-gpu will-change-transform"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] opacity-0 group-hover/content:opacity-100 transition-opacity duration-500" />

        <h2
          className={cn(
            "font-bold leading-tight tracking-tight relative z-10",
            "text-white drop-shadow-2xl",
            "text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl",
            "mb-3 sm:mb-4 md:mb-6 lg:mb-8",
            "bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text",
            "group-hover/content:scale-[1.02] transition-transform duration-300"
          )}
        >
          {item.title}
        </h2>

        <p
          className={cn(
            "leading-relaxed font-medium relative z-10",
            "text-white/95 drop-shadow-xl",
            "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl",
            "max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl",
            "mb-4 sm:mb-6 md:mb-8 lg:mb-10",
            "text-shadow-lg",
            "group-hover/content:text-white transition-colors duration-300"
          )}
        >
          {item.description}
        </p>

        {item.cta && (
          <div
            className={cn(
              "relative z-10",
              item.textPosition?.includes("center")
                ? "flex justify-center"
                : "flex justify-start",
              "mt-2 sm:mt-4"
            )}
          >
            <Button
              className={cn(
                "bg-gradient-to-r from-white/25 via-white/30 to-white/25",
                "hover:from-white/35 hover:via-white/40 hover:to-white/35",
                "active:from-white/45 active:via-white/50 active:to-white/45",
                "sm:backdrop-blur-xl border-2 border-white/40 hover:border-white/60",
                "text-white font-bold tracking-wide",
                "shadow-2xl hover:shadow-3xl shadow-black/40",
                "transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "hover:scale-110 hover:-translate-y-2 hover:rotate-1",
                "active:scale-105 active:translate-y-0 active:rotate-0",
                "px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5",
                "text-sm sm:text-base md:text-lg lg:text-xl",
                "rounded-xl sm:rounded-2xl",
                "focus:ring-4 focus:ring-white/50 focus:ring-offset-4 focus:ring-offset-transparent",
                "relative overflow-hidden group/btn",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
                "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
                "after:absolute after:inset-0 after:rounded-xl after:sm:rounded-2xl",
                "after:bg-gradient-to-r after:from-blue-400/20 after:via-purple-400/20 after:to-pink-400/20",
                "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
                "after:blur-xl after:-z-10"
              )}
              asChild
            >
              <a
                href={item.cta.href}
                className="relative z-10 flex items-center space-x-2"
              >
                <span>{item.cta.text}</span>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
));

SlideContent.displayName = "SlideContent";

// Professional Carousel Component
export function Carousel({
  items,
  autoPlay = true,
  interval = 5000,
  itemsPerSlide = 1,
  showControls = true,
  showDots = true,
  showProgress = true,
  aspectRatio = "16:9",
  priority = false,
  className,
}: CarouselProps) {
  // Professional state management
  const carousel = useCarousel(items, { autoPlay, interval });
  
  // Professional gesture handling
  const gestureHandlers = useGestureHandler({
    onPrevious: carousel.prevSlide,
    onNext: carousel.nextSlide,
  });

  // Calculate totals
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  // Professional aspect ratio utility
  const aspectRatioClass = {
    "16:9": "aspect-video",
    "21:9": "aspect-[21/9]",
    "4:3": "aspect-[4/3]", 
    "1:1": "aspect-square",
    auto: "",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "relative w-full group overflow-hidden",
        "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
        "rounded-3xl shadow-2xl",
        className
      )}
      {...gestureHandlers}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      {/* Multi-item Carousel */}
      {itemsPerSlide > 1 ? (
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${carousel.currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 flex gap-3 sm:gap-4 lg:gap-6 p-4"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${slideIndex + 1}`}
                >
                  {items
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((item) => (
                      <div key={item.id} className="flex-1 min-w-0">
                        {item.content || (
                          <div className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                            <h3 className="font-bold text-lg mb-2 text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
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
        </div>
      ) : (
        /* Single-item Hero Carousel */
        <div
          className={cn(
            "relative w-full overflow-hidden",
            "h-[180px] xs:h-[200px] sm:h-[360px] md:h-[440px] lg:h-[520px] xl:h-[580px]",
            aspectRatioClass
          )}
        >
          {items.map((item, index) => {
            const isActive = index === carousel.currentIndex;

            return (
              <div
                key={item.id}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-out",
                  isActive
                    ? "opacity-100 scale-100 z-20"
                    : "opacity-0 scale-105 z-10"
                )}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1}`}
                aria-hidden={!isActive}
              >
                <SlideContent
                  item={item}
                  isActive={isActive}
                  priority={priority && index <= 1}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Professional Controls */}
      {showControls && totalSlides > 1 && (
        <CarouselControls
          onPrevious={carousel.prevSlide}
          onNext={carousel.nextSlide}
          onTogglePlay={carousel.toggleAutoPlay}
          isPlaying={carousel.isPlaying}
        />
      )}

      {/* Professional Dots */}
      {showDots && (
        <CarouselDots
          totalSlides={totalSlides}
          currentIndex={carousel.currentIndex}
          onDotClick={carousel.goToSlide}
          showProgress={showProgress}
          progress={carousel.progress}
        />
      )}

      {/* Professional Progress Bar */}
      {showProgress && (
        <CarouselProgress
          totalSlides={totalSlides}
          currentIndex={carousel.currentIndex}
          progress={carousel.progress}
        />
      )}
    </div>
  );
}

// Main Carousel Component
export default function Carousel({
  items,
  autoPlay = false, // Disabled by default for accessibility
  autoPlayInterval = 6000,
  showDots = true,
  showProgress = true,
  showControls = true,
  className,
  itemsPerSlide = 1,
  aspectRatio = "16:9",
  priority = true,
  onSlideChange
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Calculate total slides
  const totalSlides = useMemo(
    () => Math.ceil(items.length / itemsPerSlide),
    [items.length, itemsPerSlide]
  );

  // Professional carousel state management
  const carousel = useCarousel({
    totalSlides,
    autoPlay,
    autoPlayInterval,
    onSlideChange
  });

  // Professional gesture handling
  const gestureHandlers = useGestureHandler({
    onSwipeLeft: carousel.nextSlide,
    onSwipeRight: carousel.prevSlide,
    threshold: carousel.swipeThreshold,
    onStart: () => carousel.setUserInteracting(true),
    onEnd: () => {
      // Re-enable autoplay after a delay
      setTimeout(() => carousel.setUserInteracting(false), 2000);
    }
  });

  // Memoized aspect ratio class
  const aspectRatioClass = useMemo(
    () => getAspectRatioClass(aspectRatio),
    [aspectRatio]
  );

  // CSS custom properties for animations (better performance)
  const carouselStyle = useMemo(() => ({
    '--current-index': carousel.currentIndex,
    '--progress': carousel.progress,
    '--total-slides': totalSlides,
    '--direction': carousel.direction === 'forward' ? 1 : -1
  } as React.CSSProperties), [carousel.currentIndex, carousel.progress, totalSlides, carousel.direction]);

  return (
    <div
      ref={carouselRef}
      data-carousel
      className={cn(
        "relative w-full overflow-hidden group",
        "rounded-none sm:rounded-xl lg:rounded-2xl",
        "bg-gray-900 shadow-2xl",
        "select-none focus-within:outline-none",
        className
      )}
      style={{
        ...carouselStyle,
        ...gestureHandlers.style
      }}
      {...gestureHandlers}
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      {/* Live Region for Screen Readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Slide {carousel.currentIndex + 1} of {totalSlides}
        {items[carousel.currentIndex]?.title && `: ${items[carousel.currentIndex].title}`}
      </div>

      {/* Multi-item Carousel */}
      {itemsPerSlide > 1 ? (
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${carousel.currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 flex gap-3 sm:gap-4 lg:gap-6 p-4"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${slideIndex + 1}`}
                >
                  {items
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((item) => (
                      <div key={item.id} className="flex-1 min-w-0">
                        {item.content || (
                          <div className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                            <h3 className="font-bold text-lg mb-2 text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
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
        </div>
      ) : (
        /* Single-item Hero Carousel */
        <div
          className={cn(
            "relative w-full overflow-hidden",
            "h-[180px] xs:h-[200px] sm:h-[360px] md:h-[440px] lg:h-[520px] xl:h-[580px]",
            aspectRatioClass
          )}
        >
          {items.map((item, index) => {
            const isActive = index === carousel.currentIndex;

            return (
              <div
                key={item.id}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-out",
                  isActive
                    ? "opacity-100 scale-100 z-20"
                    : "opacity-0 scale-105 z-10"
                )}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1}`}
                aria-hidden={!isActive}
              >
                <SlideContent
                  item={item}
                  isActive={isActive}
                  priority={priority && index <= 1}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Professional Controls */}
      {showControls && totalSlides > 1 && (
        <CarouselControls
          onPrevious={carousel.prevSlide}
          onNext={carousel.nextSlide}
          onTogglePlay={carousel.toggleAutoPlay}
          isPlaying={carousel.isPlaying}
        />
      )}

      {/* Professional Dots */}
      {showDots && (
        <CarouselDots
          totalSlides={totalSlides}
          currentIndex={carousel.currentIndex}
          onDotClick={carousel.goToSlide}
          showProgress={showProgress}
          progress={carousel.progress}
        />
      )}

      {/* Professional Progress Bar */}
      {showProgress && (
        <CarouselProgress
          totalSlides={totalSlides}
          currentIndex={carousel.currentIndex}
          progress={carousel.progress}
        />
      )}
    </div>
  );
}
      {/* Multi-item Carousel for Benefits/Cards */}
      {itemsPerSlide > 1 ? (
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 flex gap-3 sm:gap-4 lg:gap-6 p-4"
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
                          <div className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                            <h3 className="font-bold text-lg mb-2 text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
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
          {totalSlides > 1 && showControls && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
                          bg-white/90 hover:bg-white backdrop-blur-sm 
                          rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl 
                          transition-all duration-200 z-10 
                          opacity-60 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
                          bg-white/90 hover:bg-white backdrop-blur-sm 
                          rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl 
                          transition-all duration-200 z-10 
                          opacity-60 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
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
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    "hover:scale-125",
                    index === currentIndex
                      ? "bg-blue-600 scale-125 shadow-lg"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Single-item Carousel for Hero Banners - Optimized */
        <>
          <div
            className={cn(
              "relative w-full overflow-hidden",
              "h-[180px] xs:h-[200px] sm:h-[360px] md:h-[440px] lg:h-[520px] xl:h-[580px]",
              getAspectRatio()
            )}
          >
            {items.map((item, index) => {
              const isActive = index === currentIndex;
              const isNext = index === (currentIndex + 1) % items.length;
              const isPrev =
                index ===
                (currentIndex === 0 ? items.length - 1 : currentIndex - 1);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-out",
                    isActive
                      ? "opacity-100 scale-100 z-20"
                      : "opacity-0 scale-105 z-10",
                    (isNext || isPrev) && "z-15" // Preload adjacent slides
                  )}
                >
                  <div className="w-full h-full relative overflow-hidden">
                    {/* Clickable overlay for banners with href but no CTA */}
                    {item.href && !item.cta && (
                      <a
                        href={item.href}
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-30 cursor-pointer"
                        aria-label={`Go to ${item.title}`}
                      />
                    )}

                    {/* Media Content */}
                    {item.video ? (
                      <video
                        src={item.video}
                        autoPlay={isActive}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        preload={isActive ? "auto" : "metadata"}
                      />
                    ) : item.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title || "Carousel image"}
                          fill
                          className={cn(
                            "object-cover transition-transform duration-700",
                            isActive ? "scale-100" : "scale-105"
                          )}
                          priority={priority && index <= 1}
                          quality={90}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        />
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                    )}

                    {/* World-Class Content Overlay - Premium Professional Positioning */}
                    <div
                      className={cn(
                        "absolute inset-0 flex z-25",
                        // Strategic positioning based on text position with golden ratio
                        item.textPosition === "top-center"
                          ? "items-start justify-center text-center px-4 sm:px-8 pt-6 sm:pt-16 md:pt-20"
                          : item.textPosition === "bottom-center"
                          ? "items-end justify-center text-center px-4 sm:px-8 pb-6 sm:pb-16 md:pb-20"
                          : "items-center justify-start px-4 sm:px-8 md:px-12 lg:px-16", // Left positioning uses rule of thirds
                        // Mobile-optimized spacing
                        "py-4 sm:py-6"
                      )}
                    >
                      <div
                        className={cn(
                          "relative z-30 group/content",
                          // Professional max-width for optimal reading (45-75 characters)
                          "w-full max-w-[300px] sm:max-w-lg md:max-w-xl lg:max-w-2xl",
                          // Text alignment based on position
                          item.textPosition?.includes("center")
                            ? "text-center"
                            : "text-left",
                          // World-class glassmorphism with premium depth
                          "bg-gradient-to-br from-black/40 via-black/30 to-black/50",
                          "sm:backdrop-blur-2xl border border-white/30 hover:border-white/40",
                          "rounded-2xl sm:rounded-3xl lg:rounded-[2rem]",
                          "shadow-2xl shadow-black/60 hover:shadow-black/80",
                          // Premium responsive padding with mathematical proportions
                          "p-4 sm:p-8 md:p-10 lg:p-12",
                          // Professional content positioning offset
                          item.textPosition === "start" &&
                            "ml-0 sm:ml-4 md:ml-8",
                          // Premium hover effects
                          "transition-all duration-500 ease-out",
                          "hover:scale-[1.02] hover:-translate-y-1",
                          "transform-gpu will-change-transform",
                          // Subtle animation on load
                          "animate-in fade-in slide-in-from-bottom-8 duration-1000"
                        )}
                      >
                        {/* Premium Background Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] opacity-0 group-hover/content:opacity-100 transition-opacity duration-500" />

                        {/* Title with world-class typography hierarchy */}
                        <h2
                          className={cn(
                            "font-bold leading-tight tracking-tight relative z-10",
                            "text-white drop-shadow-2xl",
                            // Premium typography scale with perfect proportions
                            "text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl",
                            // Strategic spacing with golden ratio
                            "mb-3 sm:mb-4 md:mb-6 lg:mb-8",
                            "carousel-mobile-title",
                            // Premium text effects
                            "bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text",
                            // Micro-interaction animation
                            "group-hover/content:scale-[1.02] transition-transform duration-300"
                          )}
                        >
                          {item.title}
                        </h2>

                        {/* Description with optimal readability and premium styling */}
                        <p
                          className={cn(
                            "leading-relaxed font-medium relative z-10",
                            "text-white/95 drop-shadow-xl",
                            // Optimized readability sizes with perfect line height
                            "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl",
                            // Strategic content width for optimal reading
                            "max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl",
                            // Professional spacing with visual rhythm
                            "mb-4 sm:mb-6 md:mb-8 lg:mb-10",
                            "carousel-mobile-text",
                            // Premium text styling
                            "text-shadow-lg",
                            // Subtle animation delay
                            "group-hover/content:text-white transition-colors duration-300"
                          )}
                        >
                          {item.description}
                        </p>

                        {/* World-Class CTA with premium micro-interactions */}
                        {item.cta && (
                          <div
                            className={cn(
                              "relative z-10",
                              // Professional button alignment
                              item.textPosition?.includes("center")
                                ? "flex justify-center"
                                : "flex justify-start",
                              // Micro-interaction spacing
                              "mt-2 sm:mt-4"
                            )}
                          >
                            <Button
                              className={cn(
                                // World-class glassmorphism button design
                                "bg-gradient-to-r from-white/25 via-white/30 to-white/25",
                                "hover:from-white/35 hover:via-white/40 hover:to-white/35",
                                "active:from-white/45 active:via-white/50 active:to-white/45",
                                "sm:backdrop-blur-xl border-2 border-white/40 hover:border-white/60",
                                "text-white font-bold tracking-wide",
                                "shadow-2xl hover:shadow-3xl shadow-black/40",
                                // Premium micro-interactions with physics-based animation
                                "transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                                "hover:scale-110 hover:-translate-y-2 hover:rotate-1",
                                "active:scale-105 active:translate-y-0 active:rotate-0",
                                // Professional button sizing with golden ratio
                                "px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5",
                                "text-sm sm:text-base md:text-lg lg:text-xl",
                                "rounded-xl sm:rounded-2xl",
                                // Premium focus states for accessibility
                                "focus:ring-4 focus:ring-white/50 focus:ring-offset-4 focus:ring-offset-transparent",
                                // Advanced hover effects
                                "relative overflow-hidden group/btn",
                                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
                                "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
                                // Premium glow effect
                                "after:absolute after:inset-0 after:rounded-xl after:sm:rounded-2xl",
                                "after:bg-gradient-to-r after:from-blue-400/20 after:via-purple-400/20 after:to-pink-400/20",
                                "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
                                "after:blur-xl after:-z-10"
                              )}
                              asChild
                            >
                              <a
                                href={item.cta.href}
                                className="relative z-10 flex items-center space-x-2"
                              >
                                <span>{item.cta.text}</span>
                                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* World-Class Enhanced Navigation Controls */}
          {showControls && (
            <>
              {/* Left Navigation Arrow - Professional UX Positioning */}
              <button
                onClick={prevSlide}
                className={cn(
                  // Strategic positioning following 8pt grid and safe areas
                  "absolute left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 top-1/2 -translate-y-1/2",
                  // Professional glassmorphism with optimal readability
                  "bg-white/15 hover:bg-white/25 active:bg-white/35",
                  "backdrop-blur-2xl border border-white/40 hover:border-white/60",
                  // Accessibility-first sizing (44px+ touch targets)
                  "w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full",
                  "flex items-center justify-center",
                  // Professional timing and easing
                  "transition-all duration-200 ease-out group/btn z-40",
                  // Smart visibility - appears on hover, doesn't compete with content
                  "opacity-0 group-hover:opacity-80 hover:opacity-100 focus:opacity-100",
                  // Refined micro-interactions
                  "hover:scale-105 active:scale-95",
                  "hover:-translate-x-1 hover:-translate-y-2",
                  // Premium shadow system
                  "shadow-lg hover:shadow-xl shadow-black/25",
                  "transform-gpu will-change-transform",
                  // Enhanced accessibility
                  "focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent",
                  // Subtle premium glow
                  "before:absolute before:inset-0 before:rounded-full",
                  "before:bg-gradient-to-r before:from-blue-400/10 before:to-purple-400/10",
                  "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                )}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg transition-transform duration-200 group-hover/btn:scale-110" />
              </button>

              <button
                onClick={nextSlide}
                className={cn(
                  // Strategic positioning following 8pt grid and safe areas
                  "absolute right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2",
                  // Professional glassmorphism with optimal readability
                  "bg-white/15 hover:bg-white/25 active:bg-white/35",
                  "backdrop-blur-2xl border border-white/40 hover:border-white/60",
                  // Accessibility-first sizing (44px+ touch targets)
                  "w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full",
                  "flex items-center justify-center",
                  // Professional timing and easing
                  "transition-all duration-200 ease-out group/btn z-40",
                  // Smart visibility - appears on hover, doesn't compete with content
                  "opacity-0 group-hover:opacity-80 hover:opacity-100 focus:opacity-100",
                  // Refined micro-interactions
                  "hover:scale-105 active:scale-95",
                  "hover:translate-x-1 hover:-translate-y-2",
                  // Premium shadow system
                  "shadow-lg hover:shadow-xl shadow-black/25",
                  "transform-gpu will-change-transform",
                  // Enhanced accessibility
                  "focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent",
                  // Subtle premium glow
                  "before:absolute before:inset-0 before:rounded-full",
                  "before:bg-gradient-to-r before:from-purple-400/10 before:to-pink-400/10",
                  "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                )}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg transition-transform duration-200 group-hover/btn:scale-110" />
              </button>

              {/* Premium Auto-play Control - Repositioned */}
              <button
                onClick={toggleAutoPlay}
                className={cn(
                  // Moved away from arrows, better UX hierarchy
                  "absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8",
                  "bg-black/25 hover:bg-black/40 active:bg-black/55",
                  "backdrop-blur-xl border border-white/30 hover:border-white/50",
                  // Smaller, less competing size
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center",
                  "transition-all duration-200 ease-out z-30",
                  "opacity-60 group-hover:opacity-90 hover:opacity-100",
                  "hover:scale-105 active:scale-95",
                  "shadow-md hover:shadow-lg shadow-black/20",
                  "transform-gpu will-change-transform",
                  "focus:opacity-100 focus:ring-2 focus:ring-white/50"
                )}
                aria-label={
                  isAutoPlaying ? "Pause slideshow" : "Play slideshow"
                }
              >
                {isAutoPlaying ? (
                  <Pause className="w-4 h-4 text-white drop-shadow-lg" />
                ) : (
                  <Play className="w-4 h-4 text-white drop-shadow-lg ml-0.5" />
                )}

                {/* Subtle Status Ring */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full border transition-all duration-300",
                    isAutoPlaying
                      ? "border-green-400/30 shadow-green-400/10 shadow-sm"
                      : "border-yellow-400/30 shadow-yellow-400/10 shadow-sm"
                  )}
                />
              </button>
            </>
          )}

          {/* World-Class Enhanced Dots Indicator */}
          {showDots && items.length > 1 && (
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "relative transition-all duration-300 group/dot",
                    "hover:scale-125 active:scale-110 transform-gpu",
                    index === currentIndex ? "scale-125" : "scale-100"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {/* Main Dot */}
                  <div
                    className={cn(
                      "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300",
                      "border border-white/40 backdrop-blur-sm",
                      "shadow-lg hover:shadow-xl",
                      index === currentIndex
                        ? "bg-white shadow-white/50 border-white/80"
                        : "bg-white/30 hover:bg-white/60 hover:border-white/60"
                    )}
                  />

                  {/* Premium Hover Ring */}
                  <div
                    className={cn(
                      "absolute inset-0 -m-1 rounded-full border border-white/20 opacity-0 scale-110",
                      "group-hover/dot:opacity-100 group-hover/dot:scale-125 transition-all duration-300"
                    )}
                  />

                  {/* Progress Ring for Current Slide */}
                  {index === currentIndex && showProgress && (
                    <div className="absolute inset-0 -m-1">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 24 24"
                      >
                        {/* Background Circle */}
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="transparent"
                          stroke="white"
                          strokeWidth="2"
                          strokeOpacity="0.2"
                        />
                        {/* Progress Circle */}
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="transparent"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray={`${2 * Math.PI * 10}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 10 * (1 - progress / 100)
                          }`}
                          strokeLinecap="round"
                          className="transition-all duration-100 ease-linear filter drop-shadow-lg"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Premium Linear Progress Bar */}
          {showProgress && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 backdrop-blur-sm z-30 overflow-hidden">
              {/* Background Track */}
              <div className="absolute inset-0 bg-white/20" />

              {/* Overall Progress */}
              <div
                className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-100 ease-linear shadow-lg"
                style={{
                  width: `${((currentIndex + 1) / items.length) * 100}%`,
                }}
              />

              {/* Current Slide Progress Overlay */}
              <div
                className="absolute top-0 left-0 h-full bg-white/60 transition-all duration-100 ease-linear shadow-white/20 shadow-lg"
                style={{
                  width: `${
                    (currentIndex / items.length) * 100 +
                    progress / items.length
                  }%`,
                }}
              />

              {/* Animated Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_ease-in-out_infinite]" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
