import type { NextConfig } from "next";

const APEX_ORIGIN = "https://janefinchcannabis.ca";
const WWW_HOST = "www.janefinchcannabis.ca";
const wwwHost = [{ type: "host" as const, value: WWW_HOST }];

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
      // Primary host is apex. 301 www → apex for all paths, including trailing-slash hygiene.
      {
        source: "/:path+/",
        has: wwwHost,
        destination: `${APEX_ORIGIN}/:path+`,
        statusCode: 301,
      },
      {
        source: "/",
        has: wwwHost,
        destination: `${APEX_ORIGIN}/`,
        statusCode: 301,
      },
      {
        source: "/:path+",
        has: wwwHost,
        destination: `${APEX_ORIGIN}/:path+`,
        statusCode: 301,
      },
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
      { source: "/info/north-york-weed-dispensary", destination: "/weed-dispensary-north-york", permanent: true },
      { source: "/info/york-weed-dispensary", destination: "/weed-dispensary-north-york", permanent: true },
      { source: "/info/weed-store-near-jane-and-finch-north-york", destination: "/weed-dispensary-north-york", permanent: true },
      { source: "/info/cheap-weed-york", destination: "/info/cheap-weed-north-york", permanent: true },
      { source: "/info/native-cigarettes-york", destination: "/info/native-cigarettes-north-york", permanent: true },
      { source: "/info/weed-store-near-brampton", destination: "/weed-dispensary-north-york", permanent: true },
      { source: "/info/weed-store-near-mississauga", destination: "/weed-dispensary-north-york", permanent: true },
      { source: "/info/dispensary-near-me-york", destination: "/info/dispensary-near-me-north-york", permanent: true },
      { source: "/24-hour-north-york-dispensary", destination: "/24-hour-dispensary-north-york", permanent: true },
    ];
  },
};

export default nextConfig;
