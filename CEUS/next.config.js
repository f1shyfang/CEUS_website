/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization (WebP/AVIF conversion, resizing)
    // Remove 'unoptimized: true' to enable Next.js image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'www.ceusunsw.com',
      },
    ],
    // Optimize images with modern formats
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
