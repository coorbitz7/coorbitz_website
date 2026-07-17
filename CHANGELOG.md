# Changelog

All notable changes to this project are documented in this file.

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
