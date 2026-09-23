'use client'

import React, { useMemo, useSyncExternalStore } from 'react'
import OptimizedImage from './OptimizedImage'
import {
  HERO_GALLERY_GRID,
  HERO_GALLERY_GRID_COLOR,
  HERO_GALLERY_GRID_GAP,
  type HeroGalleryGridCell,
} from '../data/heroGalleryGrid'

const DESKTOP_MQ = '(min-width: 768px)'

function subscribeDesktopMq(onChange: () => void): () => void {
  const mq = window.matchMedia(DESKTOP_MQ)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getDesktopMqSnapshot(): boolean {
  return window.matchMedia(DESKTOP_MQ).matches
}

/** SSR / first paint: assume mobile so phones never flash the desktop grid. */
function getDesktopMqServerSnapshot(): boolean {
  return false
}

function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribeDesktopMq,
    getDesktopMqSnapshot,
    getDesktopMqServerSnapshot,
  )
}

function GalleryCell({
  gridColumn,
  gridRow,
  src,
}: HeroGalleryGridCell & { src: string }) {
  return (
    <div
      className="relative min-h-0 min-w-0 overflow-hidden"
      style={{ gridColumn, gridRow }}
    >
      <OptimizedImage
        src={src}
        alt=""
        fill
        className="object-cover object-center"
        containerClassName="absolute inset-0"
      />
    </div>
  )
}

function GalleryPanel({
  keyPrefix,
  cells,
  sources,
  variant,
}: {
  keyPrefix: string
  cells: HeroGalleryGridCell[]
  sources: string[]
  variant: 'desktop' | 'mobile'
}) {
  return (
    <div
      className={`hero-gallery-panel hero-gallery-panel--${variant} h-full shrink-0`}
      style={{ backgroundColor: HERO_GALLERY_GRID_COLOR }}
    >
      {cells.map((cell, index) => (
        <GalleryCell
          key={`${keyPrefix}-${index}`}
          {...cell}
          src={sources[index]}
        />
      ))}
    </div>
  )
}

/**
 * Full-bleed sketch-like CSS grid marquee with configurable hex gutters.
 * Decorative only — title overlay lives in HomeClient.
 */
const HeroPhotoGallery: React.FC<{
  imagesDesktop: string[];
  imagesMobile: string[];
}> = ({ imagesDesktop, imagesMobile }) => {
  const isDesktop = useIsDesktop()
  const layout = isDesktop ? HERO_GALLERY_GRID.desktop : HERO_GALLERY_GRID.mobile
  const cells = layout.cells
  const variant = isDesktop ? 'desktop' : 'mobile'
  const images = isDesktop ? imagesDesktop : imagesMobile

  const panelSources = useMemo(() => {
    if (images.length === 0) return []
    return cells.map((_, index) => images[index % images.length])
  }, [images, cells])

  if (panelSources.length === 0) {
    return (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ backgroundColor: HERO_GALLERY_GRID_COLOR }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: HERO_GALLERY_GRID_COLOR }}
      aria-hidden="true"
    >
      <div className="hero-gallery-track flex h-full w-max">
        {/* Identical panels required for a seamless translateX(-50%) loop */}
        <GalleryPanel
          keyPrefix="a"
          cells={cells}
          sources={panelSources}
          variant={variant}
        />
        <GalleryPanel
          keyPrefix="b"
          cells={cells}
          sources={panelSources}
          variant={variant}
        />
      </div>

      <style>{`
        .hero-gallery-panel {
          display: grid;
          height: 100%;
          box-sizing: border-box;
          /*
            Top/bottom/right inset = one gutter. Left = 0 so the next panel
            does not stack into a double-wide seam (was padding on both sides).
          */
          padding: ${HERO_GALLERY_GRID_GAP} ${HERO_GALLERY_GRID_GAP} ${HERO_GALLERY_GRID_GAP} 0;
          row-gap: ${HERO_GALLERY_GRID_GAP};
          column-gap: ${HERO_GALLERY_GRID_GAP};
        }

        /*
          Panel width from height so unit tiles stay 16:9.
          Desktop: 48 cols → aspect 32/9.
          Mobile: 24 cols → aspect 128/45.
        */
        .hero-gallery-panel--desktop {
          width: auto;
          aspect-ratio: 32 / 9;
          grid-template-columns: repeat(48, minmax(0, 1fr));
          grid-template-rows: repeat(4, minmax(0, 1fr));
        }

        .hero-gallery-panel--mobile {
          width: auto;
          aspect-ratio: 128 / 45;
          grid-template-columns: repeat(24, minmax(0, 1fr));
          grid-template-rows: repeat(5, minmax(0, 1fr));
        }

        @keyframes heroGalleryScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* ~2× panel width vs before → 100s keeps similar scroll speed */
        .hero-gallery-track {
          animation: heroGalleryScroll 100s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-gallery-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default HeroPhotoGallery
