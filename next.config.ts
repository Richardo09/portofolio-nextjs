import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ksocdwbjybounpspyhyg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/images/**",
      },
    ],
  },
};

export default nextConfig;