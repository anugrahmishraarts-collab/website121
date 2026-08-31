import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xeiebhslecbtfhyuuvsl.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/artwork-images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
