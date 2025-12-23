/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true, // Allow unoptimized images for static export
  },
  // Webpack config for handling 3D model files (.glb, .gltf)
  // Note: Next.js 16 uses Turbopack by default, which handles asset files automatically.
  // This webpack config is kept for compatibility when using --webpack flag.
  // Turbopack will handle .glb and .gltf files as assets by default without configuration.
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
}

module.exports = nextConfig
