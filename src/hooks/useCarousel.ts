"use client";

import { useReducer, useCallback, useEffect, useMemo } from "react";

// Professional carousel state interface
interface CarouselState {
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  direction: "forward" | "backward";
  userInteracting: boolean;
  velocity: number;
}

// Action types with payload typing
type CarouselAction =
  | { type: "NEXT_SLIDE"; totalSlides: number }
  | { type: "PREV_SLIDE"; totalSlides: number }
  | { type: "GO_TO_SLIDE"; index: number }
  | { type: "SET_PLAYING"; playing: boolean }
  | { type: "SET_PROGRESS"; progress: number }
  | { type: "SET_USER_INTERACTION"; interacting: boolean }
  | { type: "SET_VELOCITY"; velocity: number }
  | { type: "RESET_PROGRESS" };

// Professional reducer with immutable updates
function carouselReducer(
  state: CarouselState,
  action: CarouselAction
): CarouselState {
  switch (action.type) {
    case "NEXT_SLIDE":
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % action.totalSlides,
        direction: "forward",
        progress: 0,
        userInteracting: false,
      };

    case "PREV_SLIDE":
      return {
        ...state,
        currentIndex:
          state.currentIndex === 0
            ? action.totalSlides - 1
            : state.currentIndex - 1,
        direction: "backward",
        progress: 0,
        userInteracting: false,
      };

    case "GO_TO_SLIDE":
      return {
        ...state,
        currentIndex: action.index,
        direction: action.index > state.currentIndex ? "forward" : "backward",
        progress: 0,
        userInteracting: true,
      };

    case "SET_PLAYING":
      return {
        ...state,
        isPlaying: action.playing,
      };

    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.progress,
      };

    case "SET_USER_INTERACTION":
      return {
        ...state,
        userInteracting: action.interacting,
        isPlaying: action.interacting ? false : state.isPlaying,
      };

    case "SET_VELOCITY":
      return {
        ...state,
        velocity: action.velocity,
      };

    case "RESET_PROGRESS":
      return {
        ...state,
        progress: 0,
      };

    default:
      return state;
  }
}

// Professional carousel hook
interface UseCarouselProps {
  totalSlides: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onSlideChange?: (index: number) => void;
}

export function useCarousel({
  totalSlides,
  autoPlay = false, // Disabled by default for accessibility
  autoPlayInterval = 6000,
  onSlideChange,
}: UseCarouselProps) {
  // Initial state
  const initialState: CarouselState = {
    currentIndex: 0,
    isPlaying: autoPlay,
    progress: 0,
    direction: "forward",
    userInteracting: false,
    velocity: 0,
  };

  const [state, dispatch] = useReducer(carouselReducer, initialState);

  // Memoized navigation functions
  const nextSlide = useCallback(() => {
    dispatch({ type: "NEXT_SLIDE", totalSlides });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    dispatch({ type: "PREV_SLIDE", totalSlides });
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    dispatch({ type: "GO_TO_SLIDE", index });
  }, []);

  const toggleAutoPlay = useCallback(() => {
    dispatch({ type: "SET_PLAYING", playing: !state.isPlaying });
  }, [state.isPlaying]);

  const setUserInteracting = useCallback((interacting: boolean) => {
    dispatch({ type: "SET_USER_INTERACTION", interacting });
  }, []);

  // Auto-play effect with proper cleanup
  useEffect(() => {
    if (!state.isPlaying || state.userInteracting || totalSlides <= 1) {
      return;
    }

    // Progress tracking (using requestAnimationFrame for better performance)
    const lastTime = Date.now();
    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - lastTime;

      dispatch({
        type: "SET_PROGRESS",
        progress: Math.min(
          100,
          state.progress + (elapsed / autoPlayInterval) * 100
        ),
      });

      if (state.progress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    // Start progress tracking
    requestAnimationFrame(updateProgress);

    // Auto-advance slides
    const slideInterval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [
    state.isPlaying,
    state.userInteracting,
    autoPlayInterval,
    nextSlide,
    totalSlides,
    state.progress,
  ]);

  // Callback for slide changes
  useEffect(() => {
    onSlideChange?.(state.currentIndex);
  }, [state.currentIndex, onSlideChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if carousel is focused or no other element is focused
      if (document.activeElement?.closest("[data-carousel]")) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            prevSlide();
            break;
          case "ArrowRight":
            e.preventDefault();
            nextSlide();
            break;
          case " ":
            e.preventDefault();
            toggleAutoPlay();
            break;
          case "Home":
            e.preventDefault();
            goToSlide(0);
            break;
          case "End":
            e.preventDefault();
            goToSlide(totalSlides - 1);
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, toggleAutoPlay, goToSlide, totalSlides]);

  // Device-aware swipe threshold
  const swipeThreshold = useMemo(() => {
    const userAgent =
      typeof window !== "undefined" ? window.navigator.userAgent : "";
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    return isMobile ? 30 : 50; // Smaller threshold for mobile
  }, []);

  return {
    ...state,
    nextSlide,
    prevSlide,
    goToSlide,
    toggleAutoPlay,
    setUserInteracting,
    swipeThreshold,
  };
}
