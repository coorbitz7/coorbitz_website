# Coorbitz — Marketing Website

Production-ready marketing site for **Coorbitz**, an IT Services & AI Solutions company,
built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui (radix-nova style)
- **Animation**: Framer Motion
- **Forms**: react-hook-form + Zod validation
- **Email**: Nodemailer (SMTP)
- **Theming**: next-themes (light/dark, system default)
- **Icons**: lucide-react
- **Fonts**: Geist Sans / Geist Mono (self-hosted via `next/font`)

## Project Structure

```
src/
  app/            Route segments (pages, API routes, sitemap/robots, icon/OG image)
  components/
    layout/       Navbar, footer, theme toggle, cookie consent, etc.
    sections/     Page-section building blocks (hero, stats, service sections, ...)
    forms/        Contact & career forms (react-hook-form + Zod)
    shared/       Reusable primitives (Container, SectionHeading, RevealOnScroll, ...)
    ui/           shadcn/ui components
  data/           Content as typed constants — edit these to update site copy
  lib/            email.ts, validations.ts, seo.ts, rate-limit.ts, utils.ts
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
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials Nodemailer uses to send email |
| `CONTACT_TO_EMAIL` | Inbox that receives contact-form submissions (defaults to `coorbitz7@gmail.com`) |
| `CAREERS_TO_EMAIL` | Inbox that receives job applications (defaults to `coorbitz7@gmail.com`) |

### Setting up Gmail SMTP (recommended for `coorbitz7@gmail.com`)

1. Enable 2-Step Verification on the Google account.
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and
   generate an **App Password** for "Mail".
3. Use that 16-character password as `SMTP_PASS` (not the normal account password), with
   `SMTP_USER` set to the full Gmail address, `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`.

Any standard SMTP provider (SendGrid, Postmark, Amazon SES, etc.) works the same way — just
swap in that provider's host/port/credentials.

Without these variables set, both forms still validate and submit correctly, but the email
send step will fail with a clear, user-facing error ("we couldn't send your message right
now") instead of crashing — this is intentional so the site never silently pretends an email
was sent when it wasn't.

## Content Editing Guide

| To change... | Edit |
|---|---|
| Company name, tagline, addresses, phone, socials | `src/data/site.ts` |
| Navigation links | `src/data/nav.ts` |
| The 14 services (features, benefits, tech, CTA) | `src/data/services.ts` |
| The 15 industries | `src/data/industries.ts` |
| Leadership bios, core values, company timeline | `src/data/team.ts` |
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

## Notes on Placeholder Content

To keep the codebase honest, a few pieces of content are realistic but placeholder, and should
be replaced with real data before launch:

- Leadership names/bios (`src/data/team.ts`)
- Testimonials (`src/data/testimonials.ts`)
- Job openings (`src/data/jobs.ts`)
- Office addresses and phone numbers (`src/data/site.ts`)
- Social media links (`src/data/site.ts`)

Everything else — page structure, forms, email delivery, SEO wiring, animations — is fully
functional, not placeholder.
