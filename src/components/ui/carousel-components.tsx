"use client";

import { memo } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation Controls Component
interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  isPlaying: boolean;
  className?: string;
}

export const CarouselControls = memo(function CarouselControls({
  onPrevious,
  onNext,
  onTogglePlay,
  isPlaying,
  className,
}: CarouselControlsProps) {
  return (
    <>
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className={cn(
          // Professional positioning with safe areas
          "absolute left-4 sm:left-6 md:left-8 lg:left-12 top-1/2 -translate-y-1/2",
          // Accessible sizing (44px minimum)
          "w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14",
          "rounded-full flex items-center justify-center",
          // Professional glassmorphism
          "bg-white/15 hover:bg-white/25 active:bg-white/35",
          "backdrop-blur-xl border border-white/40 hover:border-white/60",
          // Smooth animations
          "transition-all duration-200 ease-out group/btn z-40",
          // Smart visibility
          "opacity-0 group-hover:opacity-80 hover:opacity-100 focus:opacity-100",
          // Premium micro-interactions
          "hover:scale-105 active:scale-95",
          "hover:-translate-x-1 hover:-translate-y-2",
          // Professional shadows
          "shadow-lg hover:shadow-xl shadow-black/25",
          "transform-gpu will-change-transform",
          // Accessibility
          "focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent",
          // Custom glow effect
          "before:absolute before:inset-0 before:rounded-full",
          "before:bg-gradient-to-r before:from-blue-400/10 before:to-purple-400/10",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
          className
        )}
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg transition-transform duration-200 group-hover/btn:scale-110" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className={cn(
          // Professional positioning with safe areas
          "absolute right-4 sm:right-6 md:right-8 lg:right-12 top-1/2 -translate-y-1/2",
          // Accessible sizing (44px minimum)
          "w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14",
          "rounded-full flex items-center justify-center",
          // Professional glassmorphism
          "bg-white/15 hover:bg-white/25 active:bg-white/35",
          "backdrop-blur-xl border border-white/40 hover:border-white/60",
          // Smooth animations
          "transition-all duration-200 ease-out group/btn z-40",
          // Smart visibility
          "opacity-0 group-hover:opacity-80 hover:opacity-100 focus:opacity-100",
          // Premium micro-interactions
          "hover:scale-105 active:scale-95",
          "hover:translate-x-1 hover:-translate-y-2",
          // Professional shadows
          "shadow-lg hover:shadow-xl shadow-black/25",
          "transform-gpu will-change-transform",
          // Accessibility
          "focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent",
          // Custom glow effect
          "before:absolute before:inset-0 before:rounded-full",
          "before:bg-gradient-to-r before:from-purple-400/10 before:to-pink-400/10",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
          className
        )}
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg transition-transform duration-200 group-hover/btn:scale-110" />
      </button>

      {/* Play/Pause Control */}
      <button
        onClick={onTogglePlay}
        className={cn(
          // Corner positioning for better UX hierarchy
          "absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8",
          "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center",
          "bg-black/25 hover:bg-black/40 active:bg-black/55",
          "backdrop-blur-xl border border-white/30 hover:border-white/50",
          "transition-all duration-200 ease-out z-30",
          "opacity-60 group-hover:opacity-90 hover:opacity-100",
          "hover:scale-105 active:scale-95",
          "shadow-md hover:shadow-lg shadow-black/20",
          "transform-gpu will-change-transform",
          "focus:opacity-100 focus:ring-2 focus:ring-white/50"
        )}
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        type="button"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white drop-shadow-lg" />
        ) : (
          <Play className="w-4 h-4 text-white drop-shadow-lg ml-0.5" />
        )}

        {/* Status Ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border transition-all duration-300",
            isPlaying
              ? "border-green-400/30 shadow-green-400/10 shadow-sm"
              : "border-yellow-400/30 shadow-yellow-400/10 shadow-sm"
          )}
        />
      </button>
    </>
  );
});

// Dot Indicators Component
interface CarouselDotsProps {
  totalSlides: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}

export const CarouselDots = memo(function CarouselDots({
  totalSlides,
  currentIndex,
  onDotClick,
  showProgress = false,
  progress = 0,
  className,
}: CarouselDotsProps) {
  if (totalSlides <= 1) return null;

  return (
    <div
      className={cn(
        "absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30",
        className
      )}
    >
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            "relative transition-all duration-300 group/dot",
            "hover:scale-125 active:scale-110 transform-gpu",
            index === currentIndex ? "scale-125" : "scale-100"
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === currentIndex ? "true" : "false"}
          type="button"
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

          {/* Hover Ring */}
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
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="transparent"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                />
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
  );
});

// Progress Bar Component
interface CarouselProgressProps {
  totalSlides: number;
  currentIndex: number;
  progress: number;
  className?: string;
}

export const CarouselProgress = memo(function CarouselProgress({
  totalSlides,
  currentIndex,
  progress,
  className,
}: CarouselProgressProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 w-full h-1 bg-black/20 backdrop-blur-sm z-30 overflow-hidden",
        className
      )}
    >
      {/* Background Track */}
      <div className="absolute inset-0 bg-white/20" />

      {/* Overall Progress */}
      <div
        className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-100 ease-linear shadow-lg"
        style={{
          width: `${((currentIndex + 1) / totalSlides) * 100}%`,
        }}
      />

      {/* Current Slide Progress */}
      <div
        className="absolute top-0 left-0 h-full bg-white/60 transition-all duration-100 ease-linear shadow-white/20 shadow-lg"
        style={{
          width: `${
            (currentIndex / totalSlides) * 100 + progress / totalSlides
          }%`,
        }}
      />

      {/* Shimmer Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"
        style={{ transform: "translateX(-100%)" }}
      />
    </div>
  );
});
