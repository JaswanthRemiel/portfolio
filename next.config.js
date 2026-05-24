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
      }
    ]
  }
};

module.exports = nextConfig;
