"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCarousel } from "@/hooks/useCarousel";
import { useGestureHandler } from "@/hooks/useGestureHandler";
import {
  CarouselControls,
  CarouselDots,
  CarouselProgress,
} from "./carousel-components";

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
                    .slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    )
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
