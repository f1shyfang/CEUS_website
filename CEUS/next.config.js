/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'ddbdosutmmbyavtxqlks.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Allow unoptimized images for static export
  },
  // Turbopack configuration (Next.js 16 uses Turbopack by default)
  // Turbopack handles .glb and .gltf files as assets automatically, no config needed
  // Set root to current directory to avoid lockfile warning
  turbopack: {
    root: __dirname,
  },
  // Webpack config for handling 3D model files (.glb, .gltf)
  // This is kept for compatibility when using --webpack flag
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
  async rewrites() {
    const supabaseBase = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');

    if (!supabaseBase) {
      return [];
    }

    // Backward-compatibility layer for legacy local image paths.
    return [
      {
        source: '/images/assets/:path*',
        destination: `${supabaseBase}/storage/v1/object/public/assets/assets/:path*`,
      },
      {
        source: '/images/events/:path*',
        destination: `${supabaseBase}/storage/v1/object/public/events/events/:path*`,
      },
      {
        source: '/images/sponsors/:path*',
        destination: `${supabaseBase}/storage/v1/object/public/sponsors/sponsors/:path*`,
      },
      {
        source: '/images/team/:path*',
        destination: `${supabaseBase}/storage/v1/object/public/team/team/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
