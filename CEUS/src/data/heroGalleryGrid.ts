/**
 * Shared hero gallery grid cell maps.
 * Used by HeroPhotoGallery (marquee) and /admin/gallery (numbered map).
 */

export type HeroGalleryGridCell = {
  gridColumn: string
  gridRow: string
}

/**
 * Desktop on 48×4. Aspect 32/9 keeps unit tiles near 16:9.
 * Landscape-led (~2/3); verticals capped at ~3:5; no identical types
 * edge-adjacent; row spans staggered so bands don’t mirror.
 */
export const PANEL_CELLS_DESKTOP: HeroGalleryGridCell[] = [
  { gridColumn: '1 / 10', gridRow: '1 / 2' },
  { gridColumn: '10 / 18', gridRow: '1 / 2' },
  { gridColumn: '18 / 24', gridRow: '1 / 3' },
  { gridColumn: '24 / 31', gridRow: '1 / 2' },
  { gridColumn: '31 / 36', gridRow: '1 / 2' },
  { gridColumn: '36 / 41', gridRow: '1 / 3' },
  { gridColumn: '41 / 47', gridRow: '1 / 2' },
  { gridColumn: '47 / 49', gridRow: '1 / 2' },
  { gridColumn: '1 / 9', gridRow: '2 / 4' },
  { gridColumn: '9 / 16', gridRow: '2 / 3' },
  { gridColumn: '16 / 18', gridRow: '2 / 3' },
  { gridColumn: '24 / 34', gridRow: '2 / 4' },
  { gridColumn: '34 / 36', gridRow: '2 / 3' },
  { gridColumn: '41 / 46', gridRow: '2 / 3' },
  { gridColumn: '46 / 49', gridRow: '2 / 3' },
  { gridColumn: '9 / 17', gridRow: '3 / 4' },
  { gridColumn: '17 / 24', gridRow: '3 / 4' },
  { gridColumn: '34 / 43', gridRow: '3 / 4' },
  { gridColumn: '43 / 49', gridRow: '3 / 4' },
  { gridColumn: '1 / 8', gridRow: '4 / 5' },
  { gridColumn: '8 / 12', gridRow: '4 / 5' },
  { gridColumn: '12 / 21', gridRow: '4 / 5' },
  { gridColumn: '21 / 26', gridRow: '4 / 5' },
  { gridColumn: '26 / 29', gridRow: '4 / 5' },
  { gridColumn: '29 / 33', gridRow: '4 / 5' },
  { gridColumn: '33 / 35', gridRow: '4 / 5' },
  { gridColumn: '35 / 43', gridRow: '4 / 5' },
  { gridColumn: '43 / 45', gridRow: '4 / 5' },
  { gridColumn: '45 / 49', gridRow: '4 / 5' },
]

/**
 * Mobile on 24×5. Aspect 128/45 keeps unit tiles near 16:9.
 * Same anti-repetition rules as desktop.
 */
export const PANEL_CELLS_MOBILE: HeroGalleryGridCell[] = [
  { gridColumn: '1 / 9', gridRow: '1 / 2' },
  { gridColumn: '9 / 16', gridRow: '1 / 2' },
  { gridColumn: '16 / 20', gridRow: '1 / 3' },
  { gridColumn: '20 / 25', gridRow: '1 / 2' },
  { gridColumn: '1 / 7', gridRow: '2 / 3' },
  { gridColumn: '7 / 12', gridRow: '2 / 4' },
  { gridColumn: '12 / 16', gridRow: '2 / 3' },
  { gridColumn: '20 / 22', gridRow: '2 / 3' },
  { gridColumn: '22 / 25', gridRow: '2 / 3' },
  { gridColumn: '1 / 5', gridRow: '3 / 4' },
  { gridColumn: '5 / 7', gridRow: '3 / 4' },
  { gridColumn: '12 / 20', gridRow: '3 / 5' },
  { gridColumn: '20 / 25', gridRow: '3 / 4' },
  { gridColumn: '1 / 8', gridRow: '4 / 5' },
  { gridColumn: '8 / 12', gridRow: '4 / 6' },
  { gridColumn: '20 / 23', gridRow: '4 / 5' },
  { gridColumn: '23 / 25', gridRow: '4 / 5' },
  { gridColumn: '1 / 6', gridRow: '5 / 6' },
  { gridColumn: '6 / 8', gridRow: '5 / 6' },
  { gridColumn: '12 / 18', gridRow: '5 / 6' },
  { gridColumn: '18 / 25', gridRow: '5 / 6' },
]

export const HERO_GALLERY_GRID = {
  desktop: {
    cells: PANEL_CELLS_DESKTOP,
    columns: 48,
    rows: 4,
    aspectRatio: '32 / 9',
  },
  mobile: {
    cells: PANEL_CELLS_MOBILE,
    columns: 24,
    rows: 5,
    aspectRatio: '128 / 45',
  },
} as const

export const HERO_GALLERY_GRID_COLOR = '#000000'
export const HERO_GALLERY_GRID_GAP = '4px'
