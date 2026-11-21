"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  pauseMerchNormalize,
  resumeMerchNormalize,
} from "./merchScrollNormalizer";

/**
 * Horizontal scroller that works with always-on normalizeScroll.
 * On a locked horizontal drag we pause the normalizer and drive
 * scrollLeft ourselves — vertical flicks never touch the normalizer,
 * so flying back up into the lookbook pin stays in sync.
 */
export default function NestedScrollArea({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let axis: "x" | "y" | null = null;
    let paused = false;

    const endGesture = () => {
      if (paused) {
        resumeMerchNormalize();
        paused = false;
      }
      axis = null;
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      startScroll = el.scrollLeft;
      axis = null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (axis === null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "x" && !paused) {
          pauseMerchNormalize();
          paused = true;
        }
      }

      if (axis !== "x") return;

      // Drive the table ourselves while the page normalizer is paused.
      event.preventDefault();
      el.scrollLeft = startScroll - dx;
    };

    const onTouchEnd = () => endGesture();
    const onTouchCancel = () => endGesture();

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    // non-passive so preventDefault works once we've locked to X
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchCancel);

    return () => {
      endGesture();
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchCancel);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-x pan-y pinch-zoom",
      }}
    >
      {children}
    </div>
  );
}
