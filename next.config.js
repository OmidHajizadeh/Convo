/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV !== "development",
  }),
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  env: {
    PUSHER_APP_ID: "1666659",
    PUSHER_APP_SECRET: "436c314268d1d9dcb974",
    NEXT_PUBLIC_PUSHER_APP_KEY: "db923cfb97eb4e41e7b9",

    NEXTAUTH_SECRET: "v2KDsXQyl6uFqJV1MuhiVAFPOgJ8kSJzWbps7VTgfE8",
    NEXTAUTH_URL: "https://convo-tan.vercel.app",
    NEXT_PUBLIC_NEXTAUTH_URL: "https://convo-tan.vercel.app",
    // "https://convo-tan.vercel.app"
    UPSTASH_REDIS_REST_URL: "https://eu1-nice-ostrich-39114.upstash.io",
    UPSTASH_REDIS_REST_TOKEN:
      "AZjKASQgMjc2ZTQ1OTEtZWFjMi00ZWZiLTliNjUtOGU0NTQzMmNmM2E3YTczNTllMzNjNjhhNGY4ZWE0YzZkYThjMjQ0Y2QwMWQ=",

    GOOGLE_CLIENT_ID:
      "711908709419-a4ci29ctod9b53505pboi7gt8409gto6.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",

    GITHUB_CLIENT_ID: "0479a102e794479d7c8a",
    GITHUB_CLIENT_SECRET: "392e7818ab4a1c5d87f05dcb6e4a2e9986e015a8",
  },
};

module.exports = nextConfig;
