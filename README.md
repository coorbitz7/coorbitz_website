# Coorbitz — Marketing Website

Production-ready marketing site for **Coorbitz**, an IT Services & AI Solutions company,
built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features

- 10 pages: Home, Services (6 service areas), Industries (7), Work, About, Careers, Contact,
  Insights, Privacy Policy, Terms & Conditions, plus a designed 404.
- Interactive hero: a lazy-loaded React Three Fiber network scene on desktop (cursor parallax,
  data pulses), with a static SVG of the same system on touch devices, under reduced-motion,
  or without WebGL.
- Interactive services explorer, a seven-step "How we build" flow, and an animated
  business-data → systems → AI → agents → automation → action architecture diagram.
- Contact (Formspree) and Careers (Nodemailer, resume upload) forms with client + server
  validation, honeypot, time-trap and optional Cloudflare Turnstile.
- Production HTTP security headers (CSP, HSTS, and more) — see
  [`docs/security-audit.md`](docs/security-audit.md).
- Structured data (JSON-LD), per-page metadata, sitemap/robots and local SEO — see
  [`docs/seo-audit.md`](docs/seo-audit.md).
- Optional, env-gated analytics integrations (GA4, GTM, Clarity, Meta Pixel, LinkedIn) that add
  zero cost until configured.
- Single light theme, WCAG-minded contrast and keyboard support, `prefers-reduced-motion`
  honored by every animation.
- Docker and CI (GitHub Actions) support.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui (radix-nova style)
- **Type**: Roboto Slab (headings, matches the wordmark), IBM Plex Sans (body), IBM Plex Mono
  (labels) — all self-hosted via `next/font`
- **Animation**: Framer Motion (scroll reveals, word reveals, magnetic CTAs; all honor reduced motion)
- **3D**: three.js + React Three Fiber, loaded only on desktop as a separate client chunk
- **Forms**: react-hook-form + Zod validation
- **Email**: Formspree (Contact form) + Nodemailer/SMTP (Careers form & newsletter signups)
- **Icons**: lucide-react

## Project Structure

```
coorbitz/
  src/
    app/            Route segments (pages, API routes, sitemap/robots, icon/OG image)
    components/
      layout/       Navbar, footer, theme + motion providers, cookie consent, etc.
      sections/     Page sections (hero + 3D scene, services explorer, how-we-build, system flow, ...)
      forms/        Contact & career forms, shared form primitives
      shared/       Logo/mark, section heading, reveal, magnetic, split-reveal, schematics
      ui/           shadcn/ui components
    data/           Content as typed constants — edit these to update site copy
    lib/            seo.ts, brand-mark.ts, validations.ts, email.ts, rate-limit.ts, turnstile.ts
    hooks/          Shared client-side hooks
  public/           Static assets (logo.svg — favicon/OG image are generated at build time)
  docs/             Security/SEO/performance audits, deployment & integrations guides
  .github/          CI workflow (lint + typecheck + build on push/PR)
  Dockerfile, .dockerignore
  next.config.ts, package.json, .env.example
```

All editable business content — services, industries, team bios, job openings, testimonials,
FAQs, company info, addresses — lives in `src/data/*.ts` as plain typed objects/arrays. Update
those files to change site content; no component code needs to change for content edits.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in real values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally (Next warns about output: "standalone"; it still serves — the Docker image uses node .next/standalone/server.js)
npm run lint     # ESLint
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL (used in metadata, sitemap, robots.txt, OG tags) |
| `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` | Formspree endpoint the Contact page form submits to (defaults to `https://formspree.io/f/xpqvpkol`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials Nodemailer uses to send Careers-form and newsletter email |
| `CONTACT_TO_EMAIL` | Inbox that receives newsletter-signup notifications (defaults to `info@coorbitz.com`) |
| `CAREERS_TO_EMAIL` | Inbox that receives job applications (defaults to `info@coorbitz.com`) |

### Contact form (Formspree)

The Contact page form (`src/components/forms/contact-form.tsx`) posts directly from the
browser to the Formspree endpoint in `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` — there's no
server-side route involved. Formspree delivers every submission to whichever email address is
configured on that form in the [Formspree dashboard](https://formspree.io/forms); that's set
there, not via an env var here. Client-side validation (Zod) plus a honeypot field and a
2-second time-trap still run before anything is sent, so obvious bot submissions don't count
against the Formspree plan's monthly submission quota.

To point the site at a different Formspree form (e.g. a staging form), create a new form at
[formspree.io/forms](https://formspree.io/forms) and set `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT`
to its endpoint URL.

### Setting up Gmail SMTP (recommended for `info@coorbitz.com`)

Only needed for the Careers form and newsletter signups — the Contact form doesn't use SMTP.

1. Enable 2-Step Verification on the Google account.
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and
   generate an **App Password** for "Mail".
3. Use that 16-character password as `SMTP_PASS` (not the normal account password), with
   `SMTP_USER` set to the full Gmail address, `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`.

Any standard SMTP provider (SendGrid, Postmark, Amazon SES, etc.) works the same way — just
swap in that provider's host/port/credentials.

Without `SMTP_*` set, the Careers form and newsletter signup still validate and submit
correctly, but the email send step fails with a clear, user-facing error ("we couldn't submit
your application right now") instead of crashing — this is intentional so the site never
silently pretends an email was sent when it wasn't.

## Content Editing Guide

| To change... | Edit |
|---|---|
| Company name, tagline, addresses, phone, email, socials | `src/data/site.ts` |
| Navigation and footer links, primary CTA | `src/data/nav.ts` |
| The 6 services (copy, what we build, tech, industries) | `src/data/services.ts` |
| The 7 industries | `src/data/industries.ts` |
| Selected work / case studies | `src/data/work.ts` |
| Working principles and "problems we solve" | `src/data/company.ts` |
| The 7 build-process steps and the technology list | `src/data/tech-stack.ts` |
| FAQ | `src/data/faqs.ts` |
| Job openings and internship info | `src/data/jobs.ts` |
| Insights categories and (future) posts | `src/data/insights.ts` |
| Brand mark geometry and colors | `src/lib/brand-mark.ts`, `--mark-*` in `src/app/globals.css` |

Nothing on the site is invented: the Work page describes real systems with client and prospect
names withheld, there are no testimonials or statistics, and the Insights page stays honest
about having no posts until real ones are added to `src/data/insights.ts`.

## SEO

- Per-page metadata (title/description/OG/Twitter) via `src/lib/seo.ts`'s `buildMetadata()`.
- `src/app/opengraph-image.tsx` and `src/app/icon.tsx` generate the social-share image and
  favicon at build time (no static image assets to maintain).
- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from a single route list.
- JSON-LD: `Organization`, `WebSite` and `LocalBusiness` sitewide (root layout), `Service` per service,
  `FAQPage` on the homepage, `ContactPage` on Contact, `JobPosting` per role on Careers, and
  `BreadcrumbList` on every subpage.

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Deploy — Vercel auto-detects Next.js, no build config needed.

### Netlify

1. Push the repository to a git provider and create a new site from it in Netlify.
2. Build command: `npm run build`. Publish directory: handled automatically by the
   [`@netlify/plugin-nextjs`](https://github.com/netlify/netlify-plugin-nextjs) plugin — add it
   via `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```
3. Add the same environment variables from `.env.example` under Site settings → Environment
   variables.

### Self-hosted VPS (Ubuntu + Nginx + PM2)

1. On the server: install Node.js 20+, then clone the repo and run:
   ```bash
   npm ci
   npm run build
   ```
2. Create `.env.local` (or export the vars via your process manager) with the values from
   `.env.example`.
3. Run persistently with PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name coorbitz -- start
   pm2 save
   pm2 startup
   ```
   This runs `next start` on port 3000 by default.
4. Reverse-proxy with Nginx:
   ```nginx
   server {
     listen 80;
     server_name coorbitz.com www.coorbitz.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```
5. Get a free TLS certificate with Certbot: `sudo certbot --nginx -d coorbitz.com -d www.coorbitz.com`.

### Docker

A multi-stage `Dockerfile` is included, using Next.js's `output: "standalone"` build (set in
`next.config.ts`) to keep the runtime image small — it doesn't need `node_modules` or the
source tree at runtime, only the traced server bundle.

```bash
docker build -t coorbitz .
docker run -p 3000:3000 --env-file .env.local coorbitz
```

Put your real environment variables in `.env.local` (or pass `-e KEY=value` flags / your
orchestrator's secret manager) — never bake secrets into the image itself, since image layers
are easy to inspect and can end up in a registry. For a production stack, put this container
behind the same TLS-terminating reverse proxy (Nginx/Caddy/Cloudflare) described in the
"Self-hosted VPS" section above; the container itself only serves plain HTTP on port 3000.

## Security Notes

- **No secrets in the client bundle.** Only environment variables prefixed `NEXT_PUBLIC_` are
  ever inlined into browser-side JavaScript by Next.js. Every real secret (`SMTP_PASS`,
  `TURNSTILE_SECRET_KEY`) deliberately has no `NEXT_PUBLIC_` prefix, so it only exists in
  server-side code.
- **`.env.local` is git-ignored** (see `.gitignore`) and must never be committed. `.env.example`
  ships with empty placeholder values only — copy it, then fill in real values locally or in
  your hosting provider's encrypted environment variable store.
- **HTTP security headers** (CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy, COEP/COOP/CORP) are set in `next.config.ts` for every
  route. See [`docs/security-audit.md`](docs/security-audit.md) for the full breakdown and the
  reasoning behind each choice.
- **Both forms** are protected by a honeypot field, a submission time-trap, and optional
  Cloudflare Turnstile verification (client + server). See
  [`docs/security-audit.md`](docs/security-audit.md) for details and
  [`docs/integrations-setup.md`](docs/integrations-setup.md) to enable Turnstile.
- **Found a security issue?** Please report it privately rather than opening a public GitHub
  issue — email `info@coorbitz.com`.
- See [`docs/`](docs) for the full security audit, SEO audit, performance report, deployment
  checklist, external-integrations setup guide, and recommended future improvements.

## License

This project's source code is licensed under the [MIT License](LICENSE). The Coorbitz name,
logo, and brand assets, along with the written site content (copy, testimonials, job listings,
etc.), are **not** covered by the MIT license and remain the property of Coorbitz — the MIT
grant applies to the code itself, not the brand or content.

## Notes on Placeholder Content

To keep the codebase honest, a few pieces of content are realistic but placeholder, and should
be replaced with real data before launch:

- Testimonials (`src/data/testimonials.ts`)
- Job openings (`src/data/jobs.ts`)
- Office addresses and phone numbers (`src/data/site.ts`)
- Social media links (`src/data/site.ts`)

Everything else — page structure, forms, email delivery, SEO wiring, animations — is fully
functional, not placeholder.
