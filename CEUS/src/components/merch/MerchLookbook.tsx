"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MERCH_ASSET_URLS } from "@/lib/storagePublicUrls";
import {
  disableMerchNormalize,
  enableMerchNormalize,
} from "./merchScrollNormalizer";

gsap.registerPlugin(ScrollTrigger);

const ORDER_FORM_URL = "https://www.trybooking.com/DQRYV";

type ArcadeRect = { x: number; y: number; w: number; h: number };

type BannerConfig = {
  src: string;
  w: number;
  h: number;
  arcade: ArcadeRect;
  /** How the banner is fitted in the stage. */
  fit: "cover" | "contain";
  /**
   * object-position / layout anchor (0 = top/left, 1 = bottom/right).
   * Mobile uses bottom so wider viewports crop the top first.
   */
  posX: number;
  posY: number;
};

const BANNER_DESKTOP: BannerConfig = {
  src: MERCH_ASSET_URLS.banner,
  w: 3240,
  h: 1350,
  arcade: { x: 2260, y: 64, w: 490, h: 390 },
  fit: "contain",
  posX: 0.5,
  posY: 0,
};

const BANNER_MOBILE: BannerConfig = {
  src: MERCH_ASSET_URLS.bannerMobile,
  w: 1080,
  h: 1920,
  arcade: { x: 32, y: 1180, w: 487, h: 337 },
  // Cover the stage; pin to the bottom so wider devices crop MERCH/top first
  // and keep the asphalt dead space + arcade inset.
  fit: "cover",
  posX: 0.5,
  posY: 1,
};

/** Opening plate — grows from the arcade window on the banner. */
const OPENING = {
  src: MERCH_ASSET_URLS.arcade,
  alt: "CEUS merch at the arcade",
  /** Desktop: keep bottom of the landscape plate. */
  objectPositionDesktop: "center 100%",
  /**
   * Mobile: frame the two middle people (white tee + charcoal hoodie)
   * so both stay readable in a portrait viewport.
   */
  // Keep the two middle torsos (tee + hoodie graphics) centered in portrait.
  objectPositionMobile: "50% 52%",
};

/** Nudge past the thin window border so the plate matches photo content. */
const CHROME_INSET = { top: 0.04, side: 0.025, bottom: 0.03 };

/** object-cover / object-contain layout of an image inside a box. */
function imageLayout(
  imgW: number,
  imgH: number,
  boxW: number,
  boxH: number,
  posX: number,
  posY: number,
  mode: "cover" | "contain",
) {
  const scale =
    mode === "cover"
      ? Math.max(boxW / imgW, boxH / imgH)
      : Math.min(boxW / imgW, boxH / imgH);
  const drawnW = imgW * scale;
  const drawnH = imgH * scale;
  const left = (boxW - drawnW) * posX;
  const top = (boxH - drawnH) * posY;
  return { scale, left, top, drawnW, drawnH };
}

/** On-screen rect of the arcade photo within the media box. */
function arcadeWindowRect(mediaW: number, mediaH: number, banner: BannerConfig) {
  const fit = imageLayout(
    banner.w,
    banner.h,
    mediaW,
    mediaH,
    banner.posX,
    banner.posY,
    banner.fit,
  );
  let left = fit.left + banner.arcade.x * fit.scale;
  let top = fit.top + banner.arcade.y * fit.scale;
  let width = banner.arcade.w * fit.scale;
  let height = banner.arcade.h * fit.scale;

  left += width * CHROME_INSET.side;
  top += height * CHROME_INSET.top;
  width *= 1 - CHROME_INSET.side * 2;
  height *= 1 - CHROME_INSET.top - CHROME_INSET.bottom;

  return { left, top, width, height };
}

/** Full-screen rect. Crop is object-position on the image, not this box. */
function stageRect(mediaW: number, mediaH: number) {
  return { left: 0, top: 0, width: mediaW, height: mediaH };
}

type MerchTagSpec = {
  name: string;
  price: string;
  left: string;
  top: string;
  side: "left" | "right";
};

const ARCADE_TAGS_DESKTOP: MerchTagSpec[] = [
  {
    name: "Catalyst Tee",
    price: "$35",
    left: "44%",
    top: "54%",
    side: "right",
  },
  {
    name: "Charcoal hoodie",
    price: "$60",
    left: "61%",
    top: "60%",
    side: "right",
  },
];

/**
 * Portrait crop of the middle two.
 * Dots sit on the garment prints (tee burst / hoodie graphic);
 * labels open away from each other so they never overlap.
 */
const ARCADE_TAGS_MOBILE: MerchTagSpec[] = [
  {
    name: "Catalyst Tee",
    price: "$35",
    // Lower on the tee body — clears heads and the back graphic
    left: "30%",
    top: "62%",
    side: "left",
  },
  {
    name: "Charcoal hoodie",
    price: "$60",
    // Lower on the hoodie body — nudged left so the card fits on iPhone widths
    left: "62%",
    top: "62%",
    side: "right",
  },
];

function MerchPriceTag({
  name,
  price,
  left,
  top,
  side,
  tagRef,
  compact = false,
}: MerchTagSpec & {
  tagRef: (el: HTMLDivElement | null) => void;
  compact?: boolean;
}) {
  const card = (
    <div
      className={`shrink-0 rounded-sm bg-white shadow-md ${
        compact ? "px-2 py-1.5" : "px-3 py-2"
      }`}
    >
      <p
        className={`font-extrabold tracking-wide text-[#1B397E] uppercase ${
          compact ? "text-[10px]" : "text-[11px] sm:text-xs"
        }`}
      >
        {name}
      </p>
      <p
        className={`font-bold tabular-nums text-black ${
          compact ? "mt-0.5 text-xs" : "mt-0.5 text-sm sm:text-base"
        }`}
      >
        {price}
      </p>
    </div>
  );

  // Stem starts at the dot's outer edge (half of h-3 / h-3.5) so it doesn't float.
  const stemOffset = compact ? "translate-x-1.5" : "translate-x-[7px]";
  const stemOffsetLeft = compact ? "-translate-x-1.5" : "-translate-x-[7px]";

  return (
    <div
      ref={tagRef}
      className="pointer-events-none absolute z-20 opacity-0"
      style={{ left, top }}
    >
      <div className="relative">
        <span
          className={`absolute top-0 left-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1B397E] shadow-[0_0_0_1px_rgba(0,0,0,0.25)] ${
            compact ? "h-3 w-3" : "h-3.5 w-3.5"
          }`}
          aria-hidden
        >
          <span className="absolute inset-1 rounded-full bg-white/90" />
        </span>
        <div
          className={`absolute top-0 flex -translate-y-1/2 items-center ${
            side === "right"
              ? `left-0 flex-row ${stemOffset}`
              : `right-0 flex-row-reverse ${stemOffsetLeft}`
          }`}
        >
          <span
            className={`h-px shrink-0 bg-white ${compact ? "w-4" : "w-6 sm:w-8"}`}
            aria-hidden
          />
          {card}
        </div>
      </div>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function HeroButtons({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 md:gap-4 ${className}`}
    >
      <a
        href={ORDER_FORM_URL}
        target="_blank"
        rel="noreferrer"
        className="block min-w-0 rounded-md bg-white px-1.5 py-1 text-center text-[10px] leading-tight font-extrabold text-[#1B397E] shadow-md transition-colors duration-200 hover:bg-[#EEF1F8] sm:px-5 sm:py-3 sm:text-sm md:px-8 md:py-4 md:text-lg"
      >
        Order merch now
      </a>
      <a
        href="#size-guide"
        className="block min-w-0 rounded-md border-2 border-white bg-[#1B397E]/80 px-1.5 py-1 text-center text-[10px] leading-tight font-extrabold text-white shadow-md transition-colors duration-200 hover:bg-[#1B397E] sm:px-5 sm:py-3 sm:text-sm md:px-8 md:py-4 md:text-lg"
      >
        View size guide
      </a>
    </div>
  );
}

/** True for phone / touch layouts — not only narrow CSS width (iOS can lie). */
function getMobileLayout(): boolean {
  if (typeof window === "undefined") return false;
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const touchUi =
    window.matchMedia("(hover: none) and (pointer: coarse)").matches &&
    window.innerWidth < 1024;
  return narrow || touchUi;
}

export default function MerchLookbook() {
  const reducedMotion = usePrefersReducedMotion();
  // Outer shell is what React mounts/unmounts. ScrollTrigger must never pin
  // this node — pin wraps with a pin-spacer and breaks removeChild on navigate.
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bannerWrapRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const mobileTagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopTagRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Layout mode used only for GSAP math; visuals are CSS (md:) so SSR matches.
  const [layoutMobile, setLayoutMobile] = useState(false);

  useLayoutEffect(() => {
    const apply = () => setLayoutMobile(getMobileLayout());
    apply();
    const mqNarrow = window.matchMedia("(max-width: 767px)");
    const mqTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    mqNarrow.addEventListener("change", apply);
    mqTouch.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    return () => {
      mqNarrow.removeEventListener("change", apply);
      mqTouch.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  // useLayoutEffect so pin revert runs before React mutates the DOM on leave.
  useLayoutEffect(() => {
    if (reducedMotion) return;

    const root = rootRef.current;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const bannerWrap = bannerWrapRef.current;
    const buttons = buttonsRef.current;
    const plate = plateRef.current;
    if (!root || !section || !stage || !bannerWrap || !buttons || !plate) return;

    const mobile = getMobileLayout();
    const activeBanner = mobile ? BANNER_MOBILE : BANNER_DESKTOP;
    const tagRefs = mobile ? mobileTagRefs : desktopTagRefs;
    const tags = tagRefs.current.filter(Boolean) as HTMLDivElement[];
    const media = stage.querySelector<HTMLElement>("[data-lookbook-media]");
    if (!media) return;

    let alive = true;
    let refresh: (() => void) | undefined;
    let trigger: ScrollTrigger | undefined;
    let reverted = false;
    let ctx: gsap.Context | undefined;

    // Plain always-on normalizeScroll — no allowNestedScroll (that desyncs
    // when reversing back into the pin). Size tables pause this Observer
    // only during a locked horizontal drag via NestedScrollArea.
    const isTouch = ScrollTrigger.isTouch === 1;
    if (isTouch) {
      enableMerchNormalize();
    }

    const revertPin = () => {
      if (reverted) return;
      reverted = true;
      alive = false;
      if (refresh) {
        window.removeEventListener("load", refresh);
      }
      // Must undo pin-spacer before React's removeChild on client navigations.
      trigger?.kill(true);
      ctx?.revert();
      if (isTouch) {
        disableMerchNormalize();
      }
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    };

    ctx = gsap.context(() => {
      const placePlateAtWindow = () => {
        media.style.top = "0";
        media.style.bottom = "0";
        const { width: mediaW, height: mediaH } = media.getBoundingClientRect();
        const rect = arcadeWindowRect(mediaW, mediaH, activeBanner);
        const frame = stageRect(mediaW, mediaH);
        gsap.set(plate, {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });
        return { mediaW, mediaH, rect, frame };
      };

      let layout = placePlateAtWindow();

      gsap.set(plate, { autoAlpha: 0, zIndex: 15, force3D: true });
      // Opacity only (not autoAlpha) so visibility stays visible — browsers
      // often dump large remote bitmaps under visibility:hidden, then fail
      // to restore the banner when scrubbing back up.
      gsap.set(bannerWrap, {
        opacity: 1,
        visibility: "visible",
        scale: 1,
        zIndex: 1,
      });
      gsap.set(buttons, { autoAlpha: 1, zIndex: 20 });
      gsap.set(tags, { autoAlpha: 0 });

      const zoomEnd = mobile ? 1.6 : 2.1;
      // Banner → arcade zoom → price tags only (no further film).
      const scrollVh = mobile ? 3.2 : 4.2;

      const syncLayoutSize = () => {
        if (!alive || !media.isConnected) return;
        media.style.top = "0";
        media.style.bottom = "0";
        const { width: mediaW, height: mediaH } = media.getBoundingClientRect();
        layout = {
          mediaW,
          mediaH,
          rect: arcadeWindowRect(mediaW, mediaH, activeBanner),
          frame: stageRect(mediaW, mediaH),
        };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Pin the inner section only — outer root stays React's stable host.
          pin: section,
          // Transform pin is more reliable on iOS than position:fixed.
          pinType: isTouch ? "transform" : "fixed",
          // CEUS header is not sticky — pin flush to the viewport so the
          // arcade plate can fill the screen without a white gap on top.
          start: "top top",
          end: () => `+=${window.innerHeight * scrollVh}`,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: syncLayoutSize,
        },
      });
      trigger = tl.scrollTrigger ?? undefined;

      // Plate is live from the first tick — fade in over a tiny beat so the
      // zoom reads immediately instead of waiting on a long opacity ramp.
      tl.fromTo(
        plate,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: "none",
          duration: zoomEnd * 0.04,
        },
        0,
      );
      tl.fromTo(
        plate,
        {
          left: () => layout.rect.left,
          top: () => layout.rect.top,
          width: () => layout.rect.width,
          height: () => layout.rect.height,
        },
        {
          left: () => layout.frame.left,
          top: () => layout.frame.top,
          width: () => layout.frame.width,
          height: () => layout.frame.height,
          ease: "none",
          duration: zoomEnd,
        },
        0,
      );
      tl.to(
        buttons,
        {
          autoAlpha: 0,
          ease: "none",
          duration: Math.min(0.45, zoomEnd * 0.28),
        },
        0,
      );
      // Banner falls away behind the growing plate
      tl.to(
        bannerWrap,
        {
          opacity: 0,
          ease: "none",
          duration: zoomEnd * 0.55,
        },
        zoomEnd * 0.2,
      );
      // After the arcade fills the screen, hold briefly then reveal price tags
      const tagsAt = zoomEnd + 0.25;
      tags.forEach((tag, i) => {
        tl.to(
          tag,
          {
            autoAlpha: 1,
            ease: "none",
            duration: 0.35,
          },
          tagsAt + 0.08 + i * 0.12,
        );
      });

      // Hold on the tagged arcade plate before unpinning into the page below.
      tl.to({}, { duration: mobile ? 0.7 : 0.9 });

      refresh = () => {
        if (!alive) return;
        syncLayoutSize();
        ScrollTrigger.refresh();
      };
      window.addEventListener("load", refresh);
      const plateImg = plate.querySelector("img");
      if (plateImg && !plateImg.complete) {
        plateImg.addEventListener("load", refresh, { once: true });
      } else {
        refresh();
      }
    }, root);

    // Revert pin on in-app link click *before* Next soft-navigates / React
    // unmounts — useLayoutEffect cleanup alone is too late for removeChild.
    const onDocumentClickCapture = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        ) {
          return;
        }
      } catch {
        return;
      }
      revertPin();
    };
    document.addEventListener("click", onDocumentClickCapture, true);

    return () => {
      document.removeEventListener("click", onDocumentClickCapture, true);
      revertPin();
    };
  }, [reducedMotion, layoutMobile]);

  if (reducedMotion) {
    return (
      <div className="bg-white">
        <section className="relative w-full">
          <Image
            src={MERCH_ASSET_URLS.bannerMobile}
            alt="CEUS Merch 2026 banner"
            width={1080}
            height={1920}
            priority
            className="block h-auto w-full md:hidden"
          />
          <Image
            src={MERCH_ASSET_URLS.banner}
            alt="CEUS Merch 2026 banner"
            width={3240}
            height={1350}
            priority
            className="hidden h-auto w-full md:block"
          />
          <div className="absolute bottom-8 left-1/2 flex w-[82%] -translate-x-1/2 md:top-[66%] md:bottom-auto md:left-auto md:right-[14%] md:w-[40%] md:translate-x-0 md:-translate-y-1/2">
            <HeroButtons />
          </div>
        </section>

        <div className="relative aspect-[3/4] w-full md:aspect-[3/2]">
          <img
            src={encodeURI(OPENING.src)}
            alt={OPENING.alt}
            className="absolute inset-0 h-full w-full object-cover md:hidden"
            style={{ objectPosition: OPENING.objectPositionMobile }}
          />
          <img
            src={encodeURI(OPENING.src)}
            alt={OPENING.alt}
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            style={{ objectPosition: OPENING.objectPositionDesktop }}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative z-0 w-full bg-white">
      <section
        ref={sectionRef}
        className="relative z-0 w-full bg-white"
        aria-label="Merch lookbook"
      >
        <div
          ref={stageRef}
          className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-white"
        >
          <div data-lookbook-media className="absolute inset-0 overflow-hidden">
            <div ref={bannerWrapRef} className="absolute inset-0 z-[1]">
              {/*
                CSS (not React state) picks the banner so phones always get
                cover+bottom even before JS hydration. Desktop: contain+top.
              */}
              <div className="absolute inset-0">
                {/* Plain <img> + inline object-* so iOS can't drop Tailwind on Next/Image. */}
                <img
                  src={BANNER_MOBILE.src}
                  alt="CEUS Merch 2026 banner"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full md:hidden"
                  style={{ objectFit: "cover", objectPosition: "bottom" }}
                />
                <img
                  src={encodeURI(BANNER_DESKTOP.src)}
                  alt="CEUS Merch 2026 banner"
                  fetchPriority="high"
                  className="absolute inset-0 hidden h-full w-full md:block"
                  style={{ objectFit: "contain", objectPosition: "top" }}
                />
                <div
                  ref={buttonsRef}
                  className="absolute bottom-8 left-1/2 z-20 w-[82%] -translate-x-1/2 md:top-[66%] md:bottom-auto md:left-auto md:right-[14%] md:w-[40%] md:translate-x-0 md:-translate-y-1/2"
                >
                  <HeroButtons />
                </div>
              </div>
            </div>

            {/* Sharp photo plate — expands from the arcade window to full frame */}
            <div
              ref={plateRef}
              className="absolute z-[15] overflow-hidden will-change-transform"
              aria-hidden="true"
            >
              <img
                src={encodeURI(OPENING.src)}
                alt={OPENING.alt}
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover md:hidden"
                style={{ objectPosition: OPENING.objectPositionMobile }}
              />
              <img
                src={encodeURI(OPENING.src)}
                alt={OPENING.alt}
                fetchPriority="high"
                className="absolute inset-0 hidden h-full w-full object-cover md:block"
                style={{ objectPosition: OPENING.objectPositionDesktop }}
              />
              <div className="contents md:hidden">
                {ARCADE_TAGS_MOBILE.map((tag, i) => (
                  <MerchPriceTag
                    key={`m-${tag.name}`}
                    {...tag}
                    compact
                    tagRef={(el) => {
                      mobileTagRefs.current[i] = el;
                    }}
                  />
                ))}
              </div>
              <div className="hidden md:contents">
                {ARCADE_TAGS_DESKTOP.map((tag, i) => (
                  <MerchPriceTag
                    key={`d-${tag.name}`}
                    {...tag}
                    tagRef={(el) => {
                      desktopTagRefs.current[i] = el;
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { ORDER_FORM_URL };
