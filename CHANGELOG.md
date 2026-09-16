# Changelog

All notable changes to this project are documented in this file.

## [1.1.1] — 2026-09-16

### Changed

- Single light theme: removed the dark theme, theme toggle and `next-themes`; the page
  declares `color-scheme: light` so browsers don't darken form controls.
- Office addresses are now city-level only (Chicago, Illinois, USA and Mehsana, Gujarat,
  India); the placeholder street addresses were removed from the site and structured data.
- India contact number updated to +91 82006 88817.

## [1.1.0] — 2026-09-16

Design and content overhaul: make the site read as a real engineering company, not a template.

### Added

- New brand mark (five-node network) shared across the logo, favicon, Apple icon, Open Graph
  image and `public/logo.svg` via `src/lib/brand-mark.ts`.
- Interactive hero with a lazy-loaded React Three Fiber network scene (desktop only, WebGL and
  reduced-motion aware) and a static SVG fallback.
- Services explorer (keyboard-navigable tabs with per-service schematics), seven-step
  "How we build" flow with auto-advance, and an animated system-architecture diagram.
- Work page (`/work`) describing real systems with names withheld and no invented outcomes.
- Magnetic CTAs, word-by-word headline reveal, sliding nav underline; all animation honors
  `prefers-reduced-motion` via a site-wide `MotionConfig`.
- Skip-to-content link.

### Changed

- Palette rebuilt from the mark (navy → sky); purple removed everywhere. Radius reduced,
  glassmorphism and gradient blobs removed, rounded-card grids replaced with ruled, editorial
  layouts.
- Typography: Roboto Slab headings (matching the wordmark), IBM Plex Sans body, IBM Plex Mono
  labels.
- Services consolidated from 14 to 6; industries rewritten as 7 we can actually speak to;
  every page rewritten in plain language with no unverifiable claims.
- Navigation restructured (Services, Industries, Work, About, Insights, Contact; "Start a
  project" CTA); footer simplified.
- Contact form fields: name, company, work email, project type, description, optional budget
  and timeline.
- Google Maps iframes replaced by links (lighter, no third-party frames).
- `tsconfig.json` and the lint script scoped to this app so sibling project folders in the
  workspace no longer break type-checking.

### Removed

- Placeholder testimonials, statistics, sample blog posts, mission/vision boilerplate and
  unverified careers benefits.

## [1.0.0] — 2026-07-18

Initial production release.

### Added

- Full marketing site: Home, About, Services (14 services), Industries (15 industries),
  Careers, Contact, Privacy Policy, Terms & Conditions, Insights (blog-ready), 404.
- Contact form (Formspree) and Careers application form (Nodemailer/SMTP, resume upload) with
  shared anti-spam protection: honeypot field, submission time-trap, and optional Cloudflare
  Turnstile verification.
- HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, COEP/COOP/CORP) — see `docs/security-audit.md`.
- Structured data (JSON-LD): Organization, WebSite, LocalBusiness (×2), BreadcrumbList,
  FAQPage, JobPosting, Service, ContactPage — see `docs/seo-audit.md`.
- Per-page SEO metadata, sitemap, robots.txt, local SEO keyword targeting for Chicago, IL and
  Mehsana, Gujarat.
- Optional, env-gated analytics/marketing integrations: GA4, Google Ads, Google Tag Manager,
  Microsoft Clarity, Meta Pixel, LinkedIn Insight Tag — see `docs/integrations-setup.md`.
- Search Console / Bing Webmaster meta-tag verification support.
- Dark/light theming, WCAG 2.2 accessibility pass (contrast, ARIA, keyboard navigation).
- Production documentation set in `docs/`: security audit, SEO audit, performance report,
  deployment checklist, integrations setup guide, future improvements.

### Fixed

- Dark-mode secondary badge color contrast (4.23:1 → 4.85:1) to meet WCAG AA.

### Changed

- Extracted shared anti-spam logic (`useAntiSpamGuard` hook) and duplicated UI
  (`HoneypotField`, `FormSuccessCard`) out of the Contact and Career forms to remove
  duplication between the two.

### Removed

- Unused `src/components/ui/input-group.tsx` (dead code, never imported).
- Legacy `/api/contact` route (Contact form now submits directly to Formspree).
