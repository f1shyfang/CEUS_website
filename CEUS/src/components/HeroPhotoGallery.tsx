'use client'

import React, { useMemo, useSyncExternalStore } from 'react'
import OptimizedImage from './OptimizedImage'
import { HERO_GALLERY_DESKTOP, HERO_GALLERY_MOBILE } from '../data/heroGallery'

/** Visible gutter / grid lines. Change this hex to recolour the grid. */
const GRID_COLOR = '#000000'

/** Gutter thickness between photo cells. */
const GRID_GAP = '4px'

const DESKTOP_MQ = '(min-width: 768px)'

type GridCell = {
  gridColumn: string
  gridRow: string
}

/**
 * Desktop on 24×4. Panel aspect 8/3 keeps 4×1 / 8×2 at 16:9 and 5×4 at 9:16.
 * Large tiles are spaced across the banner (left / mid / right) with smalls between.
 */
const PANEL_CELLS_DESKTOP: GridCell[] = [
  { gridColumn: '1 / 5', gridRow: '1 / 2' }, // 4×1 small 16:9
  { gridColumn: '5 / 7', gridRow: '1 / 3' }, // 2×2 small portrait
  { gridColumn: '7 / 12', gridRow: '1 / 5' }, // 5×4 big 9:16 (mid-left)
  { gridColumn: '12 / 17', gridRow: '1 / 3' }, // 5×2 square-ish bridge
  { gridColumn: '17 / 25', gridRow: '1 / 3' }, // 8×2 big 16:9 (right)
  { gridColumn: '1 / 5', gridRow: '2 / 3' }, // 4×1 small 16:9
  { gridColumn: '1 / 7', gridRow: '3 / 5' }, // 6×2 big 16:9 (bottom-left)
  { gridColumn: '12 / 14', gridRow: '3 / 5' }, // 2×2 small portrait
  { gridColumn: '14 / 18', gridRow: '3 / 4' }, // 4×1 small 16:9
  { gridColumn: '18 / 22', gridRow: '3 / 4' }, // 4×1 small 16:9
  { gridColumn: '22 / 25', gridRow: '3 / 5' }, // 3×2 portrait accent
  { gridColumn: '14 / 18', gridRow: '4 / 5' }, // 4×1 small 16:9
  { gridColumn: '18 / 22', gridRow: '4 / 5' }, // 4×1 small 16:9
]

/**
 * Mobile on 12×5. Panel aspect 64/45 keeps 3×1 / 6×2 at 16:9.
 * Larger tiles on left-center and right, with smalls filling the gaps.
 */
const PANEL_CELLS_MOBILE: GridCell[] = [
  { gridColumn: '1 / 4', gridRow: '1 / 2' }, // 3×1 small 16:9
  { gridColumn: '4 / 10', gridRow: '1 / 3' }, // 6×2 big 16:9 (left-center)
  { gridColumn: '10 / 13', gridRow: '1 / 2' }, // 3×1 small 16:9
  { gridColumn: '1 / 4', gridRow: '2 / 3' }, // 3×1 small 16:9
  { gridColumn: '10 / 13', gridRow: '2 / 5' }, // 3×3 9:16 (right)
  { gridColumn: '1 / 3', gridRow: '3 / 5' }, // 2×2 small 9:16
  { gridColumn: '3 / 7', gridRow: '3 / 4' }, // 4×1 landscape
  { gridColumn: '7 / 10', gridRow: '3 / 5' }, // 3×2 square-ish
  { gridColumn: '3 / 7', gridRow: '4 / 5' }, // 4×1 landscape
  { gridColumn: '1 / 7', gridRow: '5 / 6' }, // 6×1 wide strip
  { gridColumn: '7 / 10', gridRow: '5 / 6' }, // 3×1 small 16:9
  { gridColumn: '10 / 13', gridRow: '5 / 6' }, // 3×1 small 16:9
]

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
}: GridCell & { src: string }) {
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
  cells: GridCell[]
  sources: string[]
  variant: 'desktop' | 'mobile'
}) {
  return (
    <div
      className={`hero-gallery-panel hero-gallery-panel--${variant} h-full shrink-0`}
      style={{ backgroundColor: GRID_COLOR }}
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
const HeroPhotoGallery: React.FC = () => {
  const isDesktop = useIsDesktop()
  const cells = isDesktop ? PANEL_CELLS_DESKTOP : PANEL_CELLS_MOBILE
  const variant = isDesktop ? 'desktop' : 'mobile'

  const panelSources = useMemo(() => {
    const images = isDesktop ? HERO_GALLERY_DESKTOP : HERO_GALLERY_MOBILE
    if (images.length === 0) return []
    return cells.map((_, index) => images[index % images.length])
  }, [isDesktop, cells])

  if (panelSources.length === 0) {
    return (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ backgroundColor: GRID_COLOR }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: GRID_COLOR }}
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
          padding: ${GRID_GAP} ${GRID_GAP} ${GRID_GAP} 0;
          row-gap: ${GRID_GAP};
          column-gap: ${GRID_GAP};
        }

        /*
          Panel width is derived from height so the unit tile is 16:9:
          desktop unit 4×1 → aspect 8/3; mobile unit 3×1 → aspect 64/45.
        */
        .hero-gallery-panel--desktop {
          width: auto;
          aspect-ratio: 8 / 3;
          grid-template-columns: repeat(24, minmax(0, 1fr));
          grid-template-rows: repeat(4, minmax(0, 1fr));
        }

        .hero-gallery-panel--mobile {
          width: auto;
          aspect-ratio: 64 / 45;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-template-rows: repeat(5, minmax(0, 1fr));
        }

        @keyframes heroGalleryScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .hero-gallery-track {
          animation: heroGalleryScroll 50s linear infinite;
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
