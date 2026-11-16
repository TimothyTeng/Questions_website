import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Linear algebra used to live at the top level; it is now the /sc1004 course tab.
  redirects() {
    return [
      { source: "/learn", destination: "/sc1004/learn", permanent: true },
      { source: "/learn/:topic", destination: "/sc1004/learn/:topic", permanent: true },
      { source: "/practice", destination: "/sc1004/practice", permanent: true },
    ];
  },
};

export default nextConfig;
