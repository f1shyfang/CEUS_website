import { getPublicStorageUrl } from '@/lib/storagePublicUrls'

const HERO_GALLERY_BUCKET = 'homepage-gallery'

const heroGalleryImage = (fileName: string): string =>
  getPublicStorageUrl(HERO_GALLERY_BUCKET, fileName)

/**
 * Homepage hero grid photos from the `homepage-gallery` Supabase bucket.
 * Order matches PANEL_CELLS_DESKTOP / PANEL_CELLS_MOBILE in HeroPhotoGallery.
 * Scrambled so similar / same-event shots are not edge-adjacent.
 */
export const HERO_GALLERY_DESKTOP: string[] = [
  // 4×1 small 16:9
  'IMG_2308.jpg',
  // 2×2 small portrait
  'IMG_7061.jpg',
  // 5×4 big 9:16
  'IMG_7077.jpg',
  // 5×2 square-ish
  '20260329-152717727.jpg',
  // 8×2 big 16:9
  '637677429_1282181713774673_476945023484784787_n.jpg',
  // 4×1 small 16:9
  '638688381_25842091705454688_8990033636710253558_n.jpg',
  // 6×2 big 16:9
  'IMG_2169.JPG',
  // 2×2 small portrait
  'IMG_7081.jpg',
  // 4×1 / 4×1 / 3×2 / 4×1 / 4×1
  'IMG_1675.jpg',
  '641215482_1232900665698451_4761857241085747444_n.jpg',
  'IMG_1134.jpg',
  'IMG_3221.jpg',
  '637892281_1276759127715338_7947301602258884620_n.jpg',
].map(heroGalleryImage)

export const HERO_GALLERY_MOBILE: string[] = [
  // 3×1
  'IMG_1135.jpg',
  // 6×2 big 16:9
  '638688381_25842091705454688_8990033636710253558_n.jpg',
  // 3×1
  '20260329-153048867.jpg',
  // 3×1
  'IMG_1687.jpg',
  // 3×3 9:16
  'IMG_7071.jpg',
  // 2×2 small 9:16
  'IMG_2427.jpg',
  // 4×1
  '640256411_1241603291412944_2942838422290309085_n.jpg',
  // 3×2 square-ish
  'IMG_2764.jpg',
  // 4×1
  'IMG_3239.jpg',
  // 6×1 wide
  '637677429_1282181713774673_476945023484784787_n.jpg',
  // 3×1 ×2
  'IMG_2867.jpg',
  'IMG_3413.jpg',
].map(heroGalleryImage)
