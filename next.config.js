/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn-images-2.medium.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.credly.com",
        port: "",
        pathname: "/**"
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
