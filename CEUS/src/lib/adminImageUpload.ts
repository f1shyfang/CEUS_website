import sharp from 'sharp';

const MAX_DIMENSION = 2560;
const WEBP_QUALITY = 80;

/**
 * Orient via EXIF, optionally downscale, encode as WebP.
 */
export async function convertRasterToWebp(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();
}

export function isSvgImage(mimeType: string, fileName: string): boolean {
  const lower = fileName.toLowerCase();
  return mimeType === 'image/svg+xml' || lower.endsWith('.svg');
}

export function isRasterImage(mimeType: string): boolean {
  return (
    mimeType === 'image/jpeg' ||
    mimeType === 'image/jpg' ||
    mimeType === 'image/png' ||
    mimeType === 'image/webp' ||
    mimeType === 'image/gif' ||
    mimeType === 'image/avif'
  );
}
