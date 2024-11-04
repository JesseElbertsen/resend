import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverRuntimeConfig: {
    RESEND_API_KEY: process.env.RESEND_API_KEY, // API-sleutel uit .env.local
  },
};

export default nextConfig;
