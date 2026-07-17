import type { NextConfig } from "next";

// Domains allowlisted for the OPTIONAL, env-gated analytics/tag integrations
// (see src/components/shared/analytics-scripts.tsx). Every one of these is only
// actually loaded if its corresponding NEXT_PUBLIC_* env var is set — see .env.example.
const analyticsScriptSrc = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://www.googleadservices.com",
  "https://googleads.g.doubleclick.net",
  "https://www.clarity.ms",
  "https://connect.facebook.net",
  "https://snap.licdn.com",
  "https://challenges.cloudflare.com",
];

const analyticsConnectSrc = [
  "https://www.google-analytics.com",
  "https://analytics.google.com",
  "https://region1.google-analytics.com",
  "https://www.clarity.ms",
  "https://px.ads.linkedin.com",
  "https://connect.facebook.net",
];

// Not using a nonce-based CSP here on purpose: nonces require every page to render
// dynamically (no static generation/ISR), which would undo this site's static-first
// performance strategy for a marketing site with no sensitive data and no auth.
// See docs/security-audit.md for the full reasoning and the upgrade path.
function buildCsp() {
  const isDev = process.env.NODE_ENV === "development";
  const directives = [
    `default-src 'self'`,
    `script-src 'self'${isDev ? " 'unsafe-eval'" : ""} ${analyticsScriptSrc.join(" ")}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: https:`,
    `font-src 'self' data:`,
    `connect-src 'self' https://formspree.io ${analyticsConnectSrc.join(" ")}`,
    `frame-src 'self' https://www.google.com https://challenges.cloudflare.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self' https://formspree.io`,
    `frame-ancestors 'self'`,
    `upgrade-insecure-requests`,
  ];
  return directives.join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildCsp() },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "bluetooth=()",
      "interest-cohort=()",
    ].join(", "),
  },
  // require-corp would break the Google Maps iframe embeds (Google doesn't send a
  // compatible CORP header), and this site needs no cross-origin isolation (no
  // SharedArrayBuffer/WASM threading), so isolation is deliberately left off.
  { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  // Produces a minimal, self-contained server bundle (`.next/standalone`) for the Docker
  // image (see Dockerfile). Vercel ignores this and uses its own builder either way, so it's
  // safe to leave on for both deployment paths.
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Un-hashed static file — cache for a day rather than "immutable" so a
        // future logo update isn't stuck behind a year-long client-side cache.
        source: "/logo.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
