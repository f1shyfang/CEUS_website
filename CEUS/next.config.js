/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
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
}

module.exports = nextConfig
