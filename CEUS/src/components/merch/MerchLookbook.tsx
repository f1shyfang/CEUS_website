"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MERCH_ASSET_URLS } from "@/lib/storagePublicUrls";

gsap.registerPlugin(ScrollTrigger);

const ORDER_FORM_URL = "https://www.trybooking.com/DQRYV";

type LookbookFrame = {
  src: string;
  alt: string;
  /**
   * How this photo is cropped when it is taller than the screen.
   *   0    — keep the top, crop the bottom
   *   0.5  — crop the top and bottom equally
   *   1    — keep the bottom, crop the top
   */
  verticalCrop: number;
};

/** Opening frame — grows from the arcade window on the banner (no image swap). */
const OPENING: LookbookFrame = {
  src: MERCH_ASSET_URLS.arcade, // Jess, Mitch, Lucy, Josiah in arcade
  alt: "CEUS merch at the arcade",
  verticalCrop: 1,
};

/** Banner collage pixel size and the arcade window (DSCF0701) inside it. */
const BANNER = { w: 3240, h: 1350 };
const ARCADE_PHOTO = { x: 2260, y: 64, w: 490, h: 390 };
/** `object-position` for one photo's verticalCrop (0 = top, 1 = bottom). */
function photoObjectPosition(verticalCrop: number) {
  return `center ${verticalCrop * 100}%`;
}

/** Full-bleed photo. Crop is on the img itself so it updates with the number. */
function CroppedPhoto({
  src,
  alt,
  verticalCrop,
  priority = false,
}: {
  src: string;
  alt: string;
  verticalCrop: number;
  priority?: boolean;
}) {
  return (
    <img
      src={encodeURI(src)}
      alt={alt}
      data-crop={verticalCrop}
      fetchPriority={priority ? "high" : "auto"}
      className="absolute inset-0 h-full w-full"
      style={{
        objectFit: "cover",
        objectPosition: photoObjectPosition(verticalCrop),
      }}
    />
  );
}
/** Nudge past the thin window border so the plate matches photo content. */
const CHROME_INSET = { top: 0.04, side: 0.025, bottom: 0.03 };
/** Matches `object-[center_45%]` on the banner (cover / mobile). */
const BANNER_OBJECT_POS = { x: 0.5, y: 0.45 };

type FitMode = "cover" | "contain";

/** object-cover / object-contain layout of an image inside a box. */
function imageLayout(
  imgW: number,
  imgH: number,
  boxW: number,
  boxH: number,
  posX: number,
  posY: number,
  mode: FitMode,
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

/** On-screen rect of the arcade photo content within the media box. */
function arcadeWindowRect(mediaW: number, mediaH: number, mode: FitMode) {
  // Desktop: contain + top so any leftover space is a white bar at the bottom.
  // Mobile: cover + existing focal point (crops).
  const posX = BANNER_OBJECT_POS.x;
  const posY = mode === "contain" ? 0 : BANNER_OBJECT_POS.y;
  const fit = imageLayout(
    BANNER.w,
    BANNER.h,
    mediaW,
    mediaH,
    posX,
    posY,
    mode,
  );
  let left = fit.left + ARCADE_PHOTO.x * fit.scale;
  let top = fit.top + ARCADE_PHOTO.y * fit.scale;
  let width = ARCADE_PHOTO.w * fit.scale;
  let height = ARCADE_PHOTO.h * fit.scale;

  left += width * CHROME_INSET.side;
  top += height * CHROME_INSET.top;
  width *= 1 - CHROME_INSET.side * 2;
  height *= 1 - CHROME_INSET.top - CHROME_INSET.bottom;

  return { left, top, width, height };
}

/** Full-screen rect. Vertical crop is object-position on the image, not this box. */
function stageRect(mediaW: number, mediaH: number) {
  return { left: 0, top: 0, width: mediaW, height: mediaH };
}

type MerchTagSpec = {
  name: string;
  price: string;
  /** Percent position of the hotspot on the arcade plate. */
  left: string;
  top: string;
  /** Which side the label sits relative to the dot. */
  side: "left" | "right";
};

const ARCADE_TAGS: MerchTagSpec[] = [
  {
    name: "Catalyst Tee",
    price: "$35",
    // Hotspot on the white tee; label sits in the gap to the right
    left: "44%",
    top: "54%",
    side: "right",
  },
  {
    name: "Charcoal hoodie",
    price: "$60",
    // Hotspot on the hoodie print; label sits further right
    left: "61%",
    top: "60%",
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
}: MerchTagSpec & { tagRef: (el: HTMLDivElement | null) => void }) {
  const card = (
    <div className="shrink-0 rounded-sm bg-white px-3 py-2 shadow-md">
      <p className="text-[11px] font-extrabold tracking-wide text-[#1B397E] uppercase sm:text-xs">
        {name}
      </p>
      <p className="mt-0.5 text-sm font-bold tabular-nums text-black sm:text-base">
        {price}
      </p>
    </div>
  );

  return (
    <div
      ref={tagRef}
      className="pointer-events-none absolute z-20 opacity-0"
      style={{ left, top }}
    >
      {/* Anchor at the hotspot; keep transforms off the GSAP node so labels stay level */}
      <div className="relative">
        <span
          className="absolute top-0 left-0 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1B397E] shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
          aria-hidden
        >
          <span className="absolute inset-1 rounded-full bg-white/90" />
        </span>
        <div
          className={`absolute top-0 flex -translate-y-1/2 items-center ${
            side === "right"
              ? "left-0 flex-row pl-2"
              : "right-0 flex-row-reverse pr-2"
          }`}
        >
          <span className="h-px w-6 shrink-0 bg-white sm:w-8" aria-hidden />
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

function ReducedMotionLookbook() {
  return (
    <div className="bg-white">
      <section className="relative w-full">
        <Image
          src={MERCH_ASSET_URLS.banner}
          alt="CEUS Merch 2026 banner"
          width={3240}
          height={1350}
          priority
          className="block h-auto w-full"
        />
        <div className="absolute top-[66%] left-[44%] right-[3%] flex -translate-y-1/2 sm:left-auto sm:right-[8%] sm:w-[46%] md:right-[14%] md:w-[40%]">
          <HeroButtons />
        </div>
      </section>

      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] md:aspect-[3/2]">
        <CroppedPhoto
          src={OPENING.src}
          alt={OPENING.alt}
          verticalCrop={OPENING.verticalCrop}
        />
      </div>
    </div>
  );
}

export default function MerchLookbook() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bannerWrapRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const stage = stageRef.current;
    const bannerWrap = bannerWrapRef.current;
    const buttons = buttonsRef.current;
    const plate = plateRef.current;
    if (!section || !stage || !bannerWrap || !buttons || !plate) return;

    const tags = tagRefs.current.filter(Boolean) as HTMLDivElement[];
    const media = stage.querySelector<HTMLElement>("[data-lookbook-media]");
    if (!media) return;

    const fitMode: FitMode = isMobile ? "cover" : "contain";

    const placePlateAtWindow = () => {
      media.style.top = "0";
      media.style.bottom = "0";
      const { width: mediaW, height: mediaH } = media.getBoundingClientRect();
      const rect = arcadeWindowRect(mediaW, mediaH, fitMode);
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
    gsap.set(bannerWrap, { opacity: 1, visibility: "visible", scale: 1, zIndex: 1 });
    gsap.set(buttons, { autoAlpha: 1, zIndex: 20 });
    gsap.set(tags, { autoAlpha: 0 });

    const zoomEnd = isMobile ? 1.6 : 2.1;
    // Banner → arcade zoom → price tags only (no further film).
    const scrollVh = isMobile ? 3.2 : 4.2;

    const syncLayoutSize = () => {
      media.style.top = "0";
      media.style.bottom = "0";
      const { width: mediaW, height: mediaH } = media.getBoundingClientRect();
      layout = {
        mediaW,
        mediaH,
        rect: arcadeWindowRect(mediaW, mediaH, fitMode),
        frame: stageRect(mediaW, mediaH),
      };
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        // CEUS header is not sticky — pin flush to the viewport so the
        // arcade plate can fill the screen without a white gap on top.
        start: "top top",
        end: () => `+=${window.innerHeight * scrollVh}`,
        scrub: 0.45,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: syncLayoutSize,
      },
    });

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
    tl.to({}, { duration: isMobile ? 0.7 : 0.9 });

    const refresh = () => {
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

    return () => {
      window.removeEventListener("load", refresh);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion, isMobile]);

  if (reducedMotion) {
    return <ReducedMotionLookbook />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-0 w-full bg-white"
      aria-label="Merch lookbook"
    >
      <div
        ref={stageRef}
        className="relative h-[100svh] w-full overflow-hidden bg-white"
      >
        <div
          data-lookbook-media
          className="absolute inset-0 overflow-hidden"
        >
          <div ref={bannerWrapRef} className="absolute inset-0 z-[1]">
            {/*
              Mobile: fill the stage and crop.
              Desktop: banner keeps its native aspect at the top — white bar below.
            */}
            <div className="relative h-full w-full md:h-auto md:aspect-[3240/1350]">
              <Image
                src={MERCH_ASSET_URLS.banner}
                alt="CEUS Merch 2026 banner"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_45%]"
              />
              <div
                ref={buttonsRef}
                className="absolute top-[66%] left-[44%] right-[3%] z-20 -translate-y-1/2 sm:left-auto sm:right-[8%] sm:w-[46%] md:right-[14%] md:w-[40%]"
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
            <CroppedPhoto
              src={OPENING.src}
              alt={OPENING.alt}
              verticalCrop={OPENING.verticalCrop}
              priority
            />
            {ARCADE_TAGS.map((tag, i) => (
              <MerchPriceTag
                key={tag.name}
                {...tag}
                tagRef={(el) => {
                  tagRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { ORDER_FORM_URL };
