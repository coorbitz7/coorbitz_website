# Coorbitz — Performance Report & Lighthouse Expectations

_Last updated: 2026-07-17._

## Executive Summary

Coorbitz is a fully statically-generated Next.js site (every page route builds as `○ Static` —
confirmed via `npm run build`). Static generation is the single biggest performance lever
available for a marketing site: pages are pre-rendered HTML served from a CDN edge with no
per-request server work, which is what makes a 95+ Lighthouse score realistic. This report
covers what's already in place, what changed this pass, and what depends on the hosting/CDN
choice at deploy time (which this environment can't fully measure without a live deployment).

## What's already in place (from the original build)

- **Static Generation** — no page uses `force-dynamic`, cookies, headers, or other
  request-time APIs that would opt it out of prerendering. Only `/api/careers` and
  `/api/newsletter` are dynamic (server functions, not pages).
- **`next/font`** (Geist Sans + Geist Mono) — self-hosted, subset, zero layout shift, no
  render-blocking Google Fonts request.
- **`next/image`** — used for all raster images so Next.js serves responsive, modern-format
  (`AVIF`/`WebP`) images at the right size automatically, with `loading="lazy"` by default
  below the fold.
- **Server Components by default** — only the interactive islands (forms, theme toggle,
  mobile menu, carousels, animated counters, the Turnstile widget) are marked `"use client"`;
  everything else ships zero client JS.
- **Automatic code splitting** — App Router splits per-route by default; no large shared
  bundle is forced onto every page.

## What changed this pass

- **`compress: true`** and **`poweredByHeader: false`** set in `next.config.ts` (Brotli/gzip
  compression is also applied at the hosting/CDN layer — see below; this flag ensures Next's
  own dev/standalone server compresses too).
- **Explicit `Cache-Control`** added for `/logo.svg` (`public, max-age=86400,
  stale-while-revalidate=604800`) — a deliberately shorter cache than "immutable" since it's an
  un-hashed filename that could change; hashed build assets under `/_next/static/*` already get
  a 1-year immutable cache from Next.js itself, unchanged.
- **Analytics scripts** (`AnalyticsScripts`, GA4/GTM/Clarity/Meta Pixel/LinkedIn) all load via
  `next/script` with `strategy="afterInteractive"` — deferred until after hydration, so they
  never block first paint or contend with the main thread during initial render, and (being
  env-var gated) add **zero** bytes/requests today since none are configured.
  The Turnstile widget script uses the same deferred strategy and is likewise zero-cost until
  configured.
- **CSP** (see `docs/security-audit.md`) is header-based rather than nonce-based specifically
  *to preserve* full static generation — a nonce-based CSP would force every page to
  dynamic-render per request, which is a direct regression for performance. This was a
  deliberate performance-vs-security-hardening trade-off made in the security work, documented
  there and cross-referenced here.

## Compression, Caching, Brotli, HTTP/3 — hosting-layer, not app-layer

Brotli compression, HTTP/3/QUIC, and edge caching are configured at the hosting/CDN layer, not
in application code:
- **Vercel** (if used): Brotli and HTTP/3 are enabled automatically for all deployments — no
  configuration needed.
- **Cloudflare** (if placed in front, per `docs/integrations-setup.md`): enable Brotli under
  Speed → Optimization, and HTTP/3 (QUIC) under Network — both are one-click toggles, free on
  every plan.
- `compress: true` in `next.config.ts` ensures the fallback (Node.js server / `next start`)
  path also compresses responses if the site is ever self-hosted without a CDN in front.

## Tree Shaking, Code Splitting, Dynamic Imports

- Next.js's build (Turbopack) tree-shakes unused exports automatically — no manual
  configuration needed, verified via the build output's per-route JS size breakdown.
- Route-level code splitting is automatic under App Router (confirmed in build output: each
  route has its own small page-specific chunk plus the shared framework chunk).
- No heavy, rarely-used component (e.g., a chart library, a rich text editor) exists in this
  codebase that would benefit from `next/dynamic` — nothing was artificially split, since
  there's nothing large enough on any page to justify the added complexity of a lazy boundary.
  If a genuinely heavy client component is added later (e.g., a map library beyond the current
  iframe embed), wrap it in `next/dynamic(() => import(...), { ssr: false })`.

## Lazy Loading & Prefetching

- Images below the fold lazy-load via `next/image`'s default `loading="lazy"`.
- `next/link` prefetches linked routes' JS/RSC payload when a link enters the viewport (default
  App Router behavior) — navigation between Home/Services/Industries/etc. feels instant after
  the first page load.

## Lighthouse Expectations

A live, deployed measurement is required for exact numbers (Lighthouse scores depend on real
network conditions, the hosting provider's edge latency, and DNS — none of which exist in this
local/dev environment). Based on the architecture above, realistic expectations once deployed
behind a CDN (Vercel or Cloudflare) are:

| Category | Expected range | Basis |
|---|---|---|
| Performance | 90–99 | Static HTML, minimal client JS, optimized images/fonts, no render-blocking third-party scripts by default |
| Accessibility | 95–100 | See `docs/seo-audit.md`'s accessibility notes and the contrast fix made this pass |
| Best Practices | 95–100 | HTTPS assumed at hosting layer, security headers present, no console errors, no deprecated APIs |
| SEO | 100 | Valid metadata/canonical/structured data on every page, mobile-friendly, crawlable |

**Caveats that can lower the real score below this range:**
- If analytics/tag IDs are configured (GA4, GTM, Meta Pixel, etc.), each one adds real
  third-party JS weight and a small script-evaluation cost — this is an expected, accepted
  trade-off once marketing needs those tools; re-run Lighthouse after enabling any of them.
- Largest Contentful Paint depends on hosting edge latency to the visitor — a CDN with a
  Point-of-Presence near the target audience (US Midwest for Chicago, India for Mehsana)
  matters more than any code change at this point.
- Google Maps iframe embeds (About/Contact pages) load their own third-party JS and are a
  known, unavoidable Lighthouse "reduce unused JavaScript" flag for any site embedding Maps —
  accepted trade-off for the genuine value of an interactive map.

## How to measure for real

Once deployed:
1. Run PageSpeed Insights (`https://pagespeed.web.dev`) against the live URL for both mobile
   and desktop — this uses real Chrome UX Report field data once enough traffic accumulates,
   plus a lab Lighthouse run immediately.
2. Or run Lighthouse directly in Chrome DevTools against the deployed URL (not `localhost`,
   which skips real network/CDN conditions).
3. See `docs/integrations-setup.md` for wiring up ongoing monitoring (PageSpeed Insights API,
   Better Stack/UptimeRobot) so regressions are caught automatically rather than only checked
   manually.
