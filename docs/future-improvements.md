# Coorbitz — Recommended Future Improvements

_Last updated: 2026-07-18._

Items intentionally **not** done in this pass, with the reasoning for deferring each and what
would trigger picking it up.

## Security

- **Nonce-based strict CSP.** Current CSP is header-based (named allowlist, no
  `'unsafe-inline'` for scripts) to preserve full static generation — see
  `docs/security-audit.md` for the trade-off. If the site ever needs per-request dynamic
  rendering for another reason (auth, personalization), revisit switching to Next.js's
  nonce-based CSP pattern (`proxy.ts` generating a per-request nonce) at that point, since the
  static-generation cost would already be paid for other reasons.
- **Dependency / SCA scanning.** No automated dependency vulnerability scanning is configured.
  Recommend enabling GitHub Dependabot alerts (free, zero-config on GitHub) and/or adding
  `npm audit --audit-level=high` as a CI step. Low effort, meaningful ongoing benefit.
- **Sentry installation.** Documented in `docs/integrations-setup.md` but not installed — no
  DSN was available in this environment. Install via `npx @sentry/wizard@latest -i nextjs` once
  a Sentry account exists; this gives real production error visibility that `console.error`
  alone doesn't provide.
- **Admin area, if one is ever added.** Currently there are no admin routes, sessions, or auth
  anywhere in the codebase. If a CMS/admin panel is added later, it needs HttpOnly + Secure +
  SameSite cookies, CSRF protection on state-changing requests, and either a vetted auth
  provider (Auth.js/Clerk) or carefully-reviewed custom session handling — don't scaffold this
  ahead of an actual need, since unused auth code is itself a maintenance/attack-surface
  liability.
- **Cloudflare rate limiting rules.** The Free plan doesn't include custom rate-limiting rules
  (see `docs/integrations-setup.md`); the app's in-memory limiter is a reasonable free interim
  measure. If the forms attract targeted abuse, upgrading to Cloudflare Pro for real
  edge-level rate limiting is the next step.

## SEO

- **Location pages.** Deliberately not built now — see the full reasoning in
  `docs/seo-audit.md`. Revisit only if Coorbitz expands into genuinely distinct regional
  service offerings (not just an internal delivery center) in additional cities.
- **Sitemap index.** Not needed at the current ~10-route scale. Revisit once/if a full blog
  with many individual article pages pushes the URL count meaningfully higher.
- **Review / AggregateRating JSON-LD.** The `reviewJsonLd()` helper exists in `src/lib/seo.ts`
  but is intentionally unattached to any page — wire it up once real review data exists (a
  Google Business Profile rating, a testimonials CMS, Clutch/Trustpilot data), never with
  placeholder numbers.
- **Article JSON-LD for individual blog posts.** The `articleJsonLd()` helper is ready; there's
  no per-article page yet (see "Full blog build-out" below).
- **Real backlink / off-page SEO work.** Outside the scope of a codebase change — directory
  listings, guest posts, PR — worth planning once the site is live and indexed.

## Performance

- **Re-measure Lighthouse/PageSpeed after each analytics integration is turned on.** Each
  third-party script (GA4, GTM, Meta Pixel, etc.) has a real, small performance cost; the
  expected-score ranges in `docs/performance-report.md` assume none are yet configured.
- **`next/dynamic` for any future heavy client component.** Nothing on the site today is heavy
  enough to justify a lazy-loaded boundary; if a future feature adds something like a charting
  library or a richer map widget, that's the point to introduce dynamic imports — not before.

## Trust Signals / Content

- **Real case studies.** The About page currently has an honest "coming soon, contact us for
  references" placeholder rather than fabricated results — replace with real, specific case
  studies (client name or anonymized description, problem, solution, measurable outcome) as
  they become available.
- **Real certifications.** Same pattern — placeholder "expanding our certifications" copy
  rather than a fabricated ISO/SOC badge. Add real certification badges/JSON-LD `hasCredential`
  claims only once Coorbitz actually holds them.
- **Full blog build-out.** Today's `/insights` is a curated listing page with 5 sample posts
  across the requested 9-category taxonomy (`src/data/insights.ts`) — enough to be "blog
  ready" without publishing thin/empty category archive pages. A full build-out would add:
  - Individual article pages (`/insights/[slug]`) with real long-form content, using the
    already-built `articleJsonLd()` helper.
  - Per-category archive pages (`/insights/category/[category]`) once each category has enough
    real posts to not look empty.
  - An RSS feed (`app/insights/feed.xml/route.ts`) for syndication.
  - A sitemap index split (see SEO section above) once this grows large.

## Monitoring

- **LogRocket.** Documented in `docs/integrations-setup.md`, not installed — add once there's
  a specific behavioral-analytics need (e.g., diagnosing a confusing checkout/form flow) that
  GA4 + Clarity don't already answer, to avoid running two overlapping session-replay tools.
- **Status page.** Better Stack's free tier includes a basic public status page — worth turning
  on once the site has real traffic/customers who'd want visibility into an outage.

## Why these were deferred rather than done now

Every item above either (a) requires a real external account/credential this environment
doesn't have (Sentry DSN, LogRocket App ID, real domain for DNS verification), (b) depends on
business data that doesn't exist yet and shouldn't be fabricated (real case studies,
certifications, reviews), or (c) is a premature optimization for the site's current scale
(sitemap index, location pages, dynamic imports, nonce-based CSP) that would add complexity
without current benefit. Each is called out here specifically so it isn't silently forgotten.
