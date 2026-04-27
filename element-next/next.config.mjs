/** @type {import('next').NextConfig} */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
  webpack(config) {
    // Bundle as raw strings at build time so _body.html and _scripts.js
    // work on Cloudflare's edge runtime (which has no node:fs).
    config.module.rules.unshift(
      { test: /\/_body\.html$/, type: 'asset/source' },
      { test: /\/_scripts\.js$/, type: 'asset/source' },
    );
    return config;
  },
};

export default nextConfig;
