"use client";

import { useCallback, useRef } from "react";

interface PointerData {
  x: number;
  y: number;
  time: number;
}

interface UseGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
  velocityThreshold?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

export function useGestureHandler({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  velocityThreshold = 0.3,
  onStart,
  onEnd,
}: UseGestureProps) {
  const startPointer = useRef<PointerData | null>(null);
  const isTracking = useRef(false);

  // Calculate velocity for natural feeling interactions
  const calculateVelocity = useCallback(
    (start: PointerData, end: PointerData) => {
      const deltaX = Math.abs(end.x - start.x);
      const deltaTime = end.time - start.time;
      return deltaTime > 0 ? deltaX / deltaTime : 0;
    },
    []
  );

  // Unified pointer event handlers (works for touch, mouse, pen)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only handle primary pointer (first finger, left mouse button)
      if (!e.isPrimary) return;

      startPointer.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      };

      isTracking.current = true;
      onStart?.();

      // Capture pointer to ensure we get all events
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [onStart]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isTracking.current || !startPointer.current || !e.isPrimary) return;

    // Prevent default for horizontal movements to avoid page scroll
    const deltaX = Math.abs(e.clientX - startPointer.current.x);
    const deltaY = Math.abs(e.clientY - startPointer.current.y);

    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isTracking.current || !startPointer.current || !e.isPrimary) return;

      const endPointer: PointerData = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      };

      const deltaX = endPointer.x - startPointer.current.x;
      const deltaY = Math.abs(endPointer.y - startPointer.current.y);
      const velocity = calculateVelocity(startPointer.current, endPointer);

      // Only trigger swipe if:
      // 1. Horizontal movement exceeds threshold OR velocity is high enough
      // 2. Vertical movement is less than horizontal (not a scroll)
      const exceedsThreshold = Math.abs(deltaX) > threshold;
      const hasVelocity = velocity > velocityThreshold;
      const isHorizontal = Math.abs(deltaX) > deltaY;

      if ((exceedsThreshold || hasVelocity) && isHorizontal) {
        if (deltaX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }

      // Cleanup
      isTracking.current = false;
      startPointer.current = null;
      onEnd?.();

      // Release pointer capture
      e.currentTarget.releasePointerCapture(e.pointerId);
    },
    [
      onSwipeLeft,
      onSwipeRight,
      threshold,
      velocityThreshold,
      calculateVelocity,
      onEnd,
    ]
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent) => {
      isTracking.current = false;
      startPointer.current = null;
      onEnd?.();

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [onEnd]
  );

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
    // Touch action to prevent browser interference
    style: {
      touchAction: "pan-y pinch-zoom" as const,
      userSelect: "none" as const,
      WebkitUserSelect: "none" as const,
      msUserSelect: "none" as const,
      WebkitTouchCallout: "none" as const,
    },
  };
}
