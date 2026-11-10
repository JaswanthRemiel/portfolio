import type { NextConfig } from "next";
import { getContent } from "./lib/data";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [{ source: "/resume", destination: getContent().profile.resume, permanent: false }];
  },
};

export default nextConfig;
