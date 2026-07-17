# Coorbitz — SEO Audit Report

_Last updated: 2026-07-17._

## Executive Summary

The site already had solid on-page SEO fundamentals from the original build (unique metadata
per page, canonical URLs, sitemap, robots.txt, several JSON-LD types). This pass expanded
structured data coverage, added local/topical keyword targeting to the pages that benefit from
it, wired up search-engine verification, and made one deliberate call: **not** to build separate
"location pages" for Chicago and Mehsana, explained below.

## Meta Tags & Metadata

Every page exports unique title/description via `buildMetadata()` (`src/lib/seo.ts`), which
produces:
- `title` (templated as `Page | Coorbitz`, except the homepage)
- `description`
- `keywords` (page-specific arrays added this pass for Home, About, Services, Industries,
  Contact — see "Local & Topical SEO" below; other pages keep the site-wide default)
- `alternates.canonical`
- Open Graph (`og:title`, `og:description`, `og:url`, `og:site_name`, `og:type`, `og:locale`)
- Twitter Card (`summary_large_image`)
- `robots` (index/follow, or noindex when explicitly requested)

**Favicon / Apple / OG images** are handled via Next.js's file-convention metadata routes —
no manual `<meta>` tags needed:
- `src/app/icon.tsx` → favicon (dynamically rendered PNG, brand gradient + logo mark)
- `src/app/apple-icon.tsx` → 180×180 Apple touch icon
- `src/app/opengraph-image.tsx` → 1200×630 OG/Twitter share image (also auto-used for Twitter
  since no separate `twitter-image` file overrides it)

**Search engine verification** — `src/app/layout.tsx` now sets `metadata.verification.google`
and `.other['msvalidate.01']` from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` /
`NEXT_PUBLIC_BING_SITE_VERIFICATION`. Both are empty by default (no fake codes shipped) — see
`docs/integrations-setup.md` for how to get real ones. Note the DNS-TXT-record verification
method (no code change at all) is also fully viable and is what the setup guide recommends
first when using Cloudflare DNS.

## Structured Data (JSON-LD) — `src/lib/seo.ts`

| Schema | Where it's rendered | Status |
|---|---|---|
| `Organization` | Root layout (every page) | Existing, extended with `parentOrganization` (Coordinatez) |
| `WebSite` | Root layout (every page) | **New** this pass, includes a `SearchAction` |
| `LocalBusiness` ×2 | Root layout (every page) | Existing — one per office (Chicago, Mehsana) |
| `BreadcrumbList` | Every subpage | Existing |
| `FAQPage` | Home page FAQ section | Existing |
| `JobPosting` | Careers page, per open role | Existing |
| `Service` | Services page, once per service (×14) | **New** this pass |
| `ContactPage` | Contact page | **New** this pass |
| `Review`/`AggregateRating` | — | **New helper function, intentionally not attached to any page.** Do not wire this up with placeholder numbers — a fabricated rating/review count is a real, checkable factual claim, and Google can penalize sites for schema that doesn't match visible on-page content. Wire it up once real reviews exist (Google Business Profile, Clutch, a testimonials CMS, etc.). |
| `Article` | — | **New helper function, ready for individual blog-post pages** once a real article-detail route exists (see `docs/future-improvements.md` — the current `/insights` is a listing page, not individual articles, so there's nothing valid to attach it to yet). |

Validate any of these anytime with Google's Rich Results Test or the Schema.org validator
against a deployed URL.

## Sitemap & Robots

- `src/app/sitemap.ts` — generates `sitemap.xml` from a single route list (all indexable pages).
- `src/app/robots.ts` — allows all crawling except `/api/*`, references the sitemap.
- **No sitemap index** was added. A sitemap index is only useful once a single `sitemap.xml`
  approaches the 50,000-URL / 50MB practical limits, or you want per-section sitemaps (e.g., a
  large blog). At 10 static routes, a sitemap index would be pure overhead with zero benefit —
  revisit this once/if a full blog with many articles exists.

## Local SEO

Chicago, Illinois (HQ) and Mehsana, Gujarat (dev center) are both represented via:
- `LocalBusiness` JSON-LD for each address (name, address, phone).
- Full NAP (Name/Address/Phone) consistency across the Contact page, About page, and Footer.
- Page-level keyword targeting added this pass: `IT company Chicago Illinois`,
  `software development company Mehsana Gujarat`, plus the requested service-category terms
  (`AI integration company`, `business automation company`, `custom software development`,
  `AI chatbot development`, `software development company`, `web development company`, etc.)
  distributed naturally across Home, Services, About, Industries, and Contact — not stuffed
  into any single page.

### Location pages: deliberately not built

The request asked to "generate location pages if beneficial." **They aren't, for this
business, and building them would likely hurt more than help.** Dedicated `/locations/chicago`
and `/locations/mehsana` pages make sense for businesses with genuinely distinct local
offerings per city (e.g., a multi-branch retailer or clinic chain) — Coorbitz is a single
company with one HQ and one delivery center, and a thin page that just repeats the same
NAP/services with a city name swapped in is a textbook doorway-page pattern that Google's
guidelines specifically discourage, and that provides no unique value to a visitor. The
existing Contact and About pages already carry full local signals for both cities. If Coorbitz
ever expands into genuinely separate regional service offerings, revisit this.

## Page-by-Page SEO Status

| Page | Unique title/description | Keywords added this pass | JSON-LD |
|---|---|---|---|
| Home | Yes | Yes (core service + local terms) | Organization, WebSite, LocalBusiness, FAQPage |
| About | Yes | Yes (local + Coordinatez) | Breadcrumb |
| Services | Yes | Yes (service + local terms) | Breadcrumb, Service ×14 |
| Industries | Yes | Yes (industry/service terms) | Breadcrumb |
| Careers | Yes | (unchanged — job-seeker intent, not a target for the requested commercial keywords) | Breadcrumb, JobPosting |
| Contact | Yes | Yes (local + IT-company terms) | Breadcrumb, ContactPage |
| Privacy Policy | Yes | (unchanged — legal page, not a keyword target) | — |
| Terms & Conditions | Yes | (unchanged — legal page, not a keyword target) | — |
| 404 | N/A (`noindex` via Next's default not-found handling) | — | — |
| Insights | Yes | (unchanged) | Breadcrumb |

## Content & Internal Linking

- Headings: every page has exactly one `<h1>`, with `<h2>`/`<h3>` used consistently for section
  and card-level headings (verified live in-browser this pass, not just by reading source).
- Internal linking: Services ↔ Industries cross-link (each industry card links to its relevant
  services; each service section lists industries served), Home links out to Services/
  Industries/Contact, Footer links to every top-level page.
- Alt text: every `<img>`/`next/image` usage has a real `alt` (verified: zero images missing
  `alt` across Home, About, Services, Industries, Careers, Contact).
- FAQs: present on the homepage (`FaqSection`), schema-marked.
- CTAs: every service section, industry card, and page ends with a clear next action
  (Contact, "Get Started with [Service]", etc.) — not modified this pass since it was already
  in good shape from the original build.

## Blog-Readiness (see `docs/future-improvements.md` for the full build-out plan)

`src/data/insights.ts` now defines the complete requested category taxonomy (`AI`,
`Automation`, `Software Development`, `Web Development`, `Cloud`, `Cybersecurity`,
`Business Growth`, `SEO`, `Technology`) as a typed union, with 5 sample posts spread across
5 of those categories. The `/insights` page lists all of them; the homepage preview shows the
3 most recent. This is intentionally a listing page, not a full blog with individual article
routes/pages — building empty `/insights/[category]` archive pages or article pages with no
real content would create thin-content pages that hurt SEO rather than help it. The
`articleJsonLd()` helper is ready to attach to real article pages the day they're written.

## SEO Checklist

- [x] robots.txt, sitemap.xml generated and correct
- [x] Canonical URL on every page
- [x] Open Graph + Twitter Card metadata on every page
- [x] Organization, WebSite, LocalBusiness, BreadcrumbList, FAQPage, JobPosting, Service,
      ContactPage JSON-LD implemented
- [x] Review and Article JSON-LD helpers ready (intentionally unattached — no fake data)
- [x] Unique metadata on all 10 pages
- [x] Local SEO keywords on Home/Services/About/Industries/Contact
- [x] Search Console + Bing verification wired (meta-tag method, env-gated)
- [x] Blog category taxonomy in place, blog-ready
- [ ] Submit sitemap to Search Console + Bing Webmaster once domain is live (external step)
- [ ] Location pages — deliberately not built (see reasoning above)
- [ ] Sitemap index — not needed at current scale (see reasoning above)
