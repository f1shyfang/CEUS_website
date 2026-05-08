/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

let supabaseRemotePatterns = []
if (supabaseUrl) {
  try {
    const parsed = new URL(supabaseUrl)
    supabaseRemotePatterns = [
      {
        protocol: parsed.protocol.replace(':', ''),
        hostname: parsed.hostname,
        pathname: '/storage/v1/object/public/**',
      },
    ]
  } catch {
    supabaseRemotePatterns = []
  }
}

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
      ...supabaseRemotePatterns,
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
        destination: `${supabaseBase}/storage/v1/object/public/public-images/assets/:path*`,
      },
      {
        source: '/images/events/:path*',
        destination: `${supabaseBase}/storage/v1/object/public/events/:path*`,
      },
      {
        source: '/images/sponsors/:path*',
        destination: `${supabaseBase}/storage/v1/object/public/sponsors/:path*`,
      },
      {
        source: '/images/team/:path*',
        destination: `${supabaseBase}/storage/v1/object/public/team/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
