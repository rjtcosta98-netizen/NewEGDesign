/** @type {import('next').NextConfig} */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const supabaseConnectSrc = supabaseHost
  ? `https://${supabaseHost} wss://${supabaseHost}`
  : '';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  connect-src 'self' ${supabaseConnectSrc} https://wa.me;
  frame-src 'none';
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

// Cache-Control headers by route type.
// stale-while-revalidate lets CDN serve stale content while refreshing in background.
const cacheRules = [
  // Homepage + portfolio: ISR every 5 min, CDN keeps for 5 min, SWR up to 1h
  {
    source: '/',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600' }],
  },
  {
    source: '/portfolio/:path*',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600' }],
  },
  // Blog + recursos: ISR every 1h, CDN keeps for 1h, SWR up to 24h
  {
    source: '/blog/:path*',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' }],
  },
  {
    source: '/recursos/:path*',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' }],
  },
  // Content pages: static build, CDN keeps for 1h, SWR up to 24h
  {
    source: '/(servicos|sobre|parcerias|contacto)/:path*',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' }],
  },
  {
    source: '/(servicos|sobre|parcerias|contacto)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' }],
  },
  // Legal pages: rarely change, CDN keeps for 1 day, SWR up to 7 days
  {
    source: '/(politica-de-privacidade|politica-de-cookies|termos-e-condicoes|resolucao-de-litigios)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800' }],
  },
  // API routes: never cache
  {
    source: '/api/:path*',
    headers: [{ key: 'Cache-Control', value: 'no-store' }],
  },
  // Static public files that should not be indexed
  {
    source: '/pricing.md',
    headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
  },
  {
    source: '/llms.txt',
    headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    return [
      // Security headers on every route — production only (dev uses unsafe-eval for HMR)
      ...(isProd ? [{ source: '/(.*)', headers: securityHeaders }] : []),
      // Cache-Control per route group
      ...cacheRules,
    ];
  },
  async redirects() {
    return [
      {
        source: '/portfolio/matias-nature-serra-da-estrela',
        destination: '/portfolio/matias-nature-portugal',
        permanent: true,
      },
      {
        source: '/portfolio/football-nation-store-project',
        destination: '/portfolio/football-nation-store-loja',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/servicos',
        permanent: true,
      },
    ];
  },
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
