import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "janefinchcannabis.ca" },
      { protocol: "https", hostname: "www.janefinchcannabis.ca" },
      { protocol: "https", hostname: "kennedyloudcannabis.com" },
      { protocol: "https", hostname: "stclaircannabis.com" },
      { protocol: "https", hostname: "milestone-1-demo.vercel.app" },
      { protocol: "https", hostname: "pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev", pathname: "/products/**" },
      { protocol: "https", hostname: "athena-cannabis-images.vercel.app", pathname: "/products/delivery/v1/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/exotic", destination: "/exotic-weed", permanent: true },
      { source: "/premium", destination: "/premium-weed", permanent: true },
      { source: "/aaa", destination: "/aaa-weed", permanent: true },
      { source: "/aa", destination: "/aa-weed", permanent: true },
      { source: "/budget", destination: "/budget-weed", permanent: true },
      { source: "/resources/flower-guides", destination: "/resources/weed-flower-guides", permanent: true },
      { source: "/resources/flower-guides/aa-vs-aaa-vs-premium-vs-exotic", destination: "/resources/weed-flower-guides/aa-vs-aaa-vs-premium-vs-exotic", permanent: true },
      { source: "/resources/flower-guides/budget-vs-premium-flower", destination: "/resources/weed-flower-guides/budget-vs-premium-flower", permanent: true },
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:path*", destination: "/resources", permanent: true },
      { source: "/edibles", destination: "/items/edibles", permanent: true },
      { source: "/product-category/edibles", destination: "/items/edibles", permanent: true },
      { source: "/vapes", destination: "/items/vapes", permanent: true },
      { source: "/product-category/vape-pens", destination: "/items/vapes", permanent: true },
      { source: "/vape-disposables", destination: "/items/vape-disposables", permanent: true },
      { source: "/concentrates", destination: "/items/concentrates", permanent: true },
      { source: "/prerolls", destination: "/items/prerolls", permanent: true },
      { source: "/add-ons", destination: "/items/add-ons", permanent: true },
      { source: "/cigarettes", destination: "/items/cigarettes", permanent: true },
      { source: "/magic", destination: "/items/magic", permanent: true },
      { source: "/info/york-weed-dispensary", destination: "/info/north-york-weed-dispensary", permanent: true },
      { source: "/info/cheap-weed-york", destination: "/info/cheap-weed-north-york", permanent: true },
      { source: "/info/native-cigarettes-york", destination: "/info/native-cigarettes-north-york", permanent: true },
      { source: "/info/weed-store-near-brampton", destination: "/info/weed-store-near-jane-and-finch-north-york", permanent: true },
      { source: "/info/weed-store-near-mississauga", destination: "/info/weed-store-near-jane-and-finch-north-york", permanent: true },
      { source: "/info/dispensary-near-me-york", destination: "/info/dispensary-near-me-north-york", permanent: true },
    ];
  },
};

export default nextConfig;
