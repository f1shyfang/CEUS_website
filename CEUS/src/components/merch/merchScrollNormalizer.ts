import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Observer } from "gsap/Observer";

/**
 * Single shared normalizeScroll Observer for the merch lookbook.
 * Nested horizontal tables pause it for the duration of an X-drag so
 * we never need allowNestedScroll (which fights scrub when reversing
 * back into the pin).
 */
let normalizer: Observer | null = null;

export function enableMerchNormalize() {
  if (ScrollTrigger.isTouch !== 1) return;
  if (normalizer) return;
  ScrollTrigger.config({ ignoreMobileResize: true });
  normalizer = ScrollTrigger.normalizeScroll(true) ?? null;
}

export function disableMerchNormalize() {
  normalizer?.kill();
  normalizer = null;
  ScrollTrigger.normalizeScroll(false);
}

export function pauseMerchNormalize() {
  normalizer?.disable();
}

export function resumeMerchNormalize() {
  normalizer?.enable();
}
