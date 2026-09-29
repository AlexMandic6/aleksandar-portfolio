import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  devIndicators: false,
  async redirects() {
    return [{ source: "/work/saloon-booking", destination: "/work/salon-booking", permanent: true }];
  },
};

export default createMDX()(nextConfig);
