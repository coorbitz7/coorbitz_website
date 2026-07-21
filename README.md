# Coorbitz — Marketing Website

Production-ready marketing site for **Coorbitz**, an IT Services & AI Solutions company,
built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features

- 10 fully-built pages: Home, About, Services (14 services), Industries (15 industries),
  Careers, Contact, Privacy Policy, Terms & Conditions, Insights (blog-ready), 404.
- Contact and Careers forms with client + server validation, honeypot + time-trap + optional
  Cloudflare Turnstile anti-spam protection, and email delivery (Formspree / Nodemailer).
- Production HTTP security headers (CSP, HSTS, and more) — see
  [`docs/security-audit.md`](docs/security-audit.md).
- Structured data (JSON-LD), per-page metadata, sitemap/robots, and local SEO targeting — see
  [`docs/seo-audit.md`](docs/seo-audit.md).
- Optional, env-gated analytics/marketing integrations (GA4, GTM, Clarity, Meta Pixel,
  LinkedIn Insight Tag) that add zero cost until configured.
- Dark/light theming, scroll animations, and a WCAG 2.2 accessibility pass.
- Docker and CI (GitHub Actions) support for a self-hosted or containerized deployment path.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui (radix-nova style)
- **Animation**: Framer Motion
- **Forms**: react-hook-form + Zod validation
- **Email**: Formspree (Contact form) + Nodemailer/SMTP (Careers form & newsletter signups)
- **Theming**: next-themes (light/dark, system default)
- **Icons**: lucide-react
- **Fonts**: Geist Sans / Geist Mono (self-hosted via `next/font`)

## Project Structure

```
coorbitz/
  src/
    app/            Route segments (pages, API routes, sitemap/robots, icon/OG image)
    components/
      layout/       Navbar, footer, theme toggle, cookie consent, etc.
      sections/     Page-section building blocks (hero, stats, service sections, ...)
      forms/        Contact & career forms (react-hook-form + Zod), shared form primitives
      shared/       Reusable primitives (Container, SectionHeading, RevealOnScroll, ...)
      ui/           shadcn/ui components
    data/           Content as typed constants — edit these to update site copy
    lib/            email.ts, validations.ts, seo.ts, rate-limit.ts, turnstile.ts, utils.ts
    hooks/          Shared client-side hooks (e.g. useAntiSpamGuard for the two forms)
  public/           Static assets (logo.svg — favicon/OG image are generated, see SEO section)
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
npm run start   # run the production build locally
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
| Company name, tagline, addresses, phone, socials | `src/data/site.ts` |
| Navigation links | `src/data/nav.ts` |
| The 14 services (features, benefits, tech, CTA) | `src/data/services.ts` |
| The 15 industries | `src/data/industries.ts` |
| Core values | `src/data/team.ts` |
| Job openings | `src/data/jobs.ts` |
| Testimonials | `src/data/testimonials.ts` |
| FAQ | `src/data/faqs.ts` |
| Tech stack, process steps, stats, "why choose us" | `src/data/tech-stack.ts` |
| Insights/blog preview cards | `src/data/insights.ts` |

## SEO

- Per-page metadata (title/description/OG/Twitter) via `src/lib/seo.ts`'s `buildMetadata()`.
- `src/app/opengraph-image.tsx` and `src/app/icon.tsx` generate the social-share image and
  favicon at build time (no static image assets to maintain).
- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from a single route list.
- JSON-LD: `Organization` + `LocalBusiness` sitewide (root layout), `FAQPage` on the homepage
  FAQ section, `JobPosting` per role on Careers, `BreadcrumbList` on every subpage.

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
