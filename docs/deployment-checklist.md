# Coorbitz — Deployment Checklist

_Last updated: 2026-07-18._

Use this checklist for every production deploy, and read `docs/security-audit.md` /
`docs/seo-audit.md` / `docs/performance-report.md` for the reasoning behind each item.

## Before first deploy

- [ ] Set every variable in `.env.example` in the hosting platform's environment variable
      store (Vercel/Netlify project settings) — **never** commit a `.env.local` with real
      values.
  - [ ] `NEXT_PUBLIC_SITE_URL` — the real production domain (e.g., `https://coorbitz.com`),
        used for canonical URLs, sitemap, OG tags. Wrong value here silently breaks SEO.
  - [ ] `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` — confirm it points at the real, live
        Formspree form (not a test form).
  - [ ] `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` — real SMTP credentials (Gmail
        App Password or a transactional provider); test the Careers form end-to-end after
        deploy, since this can't be verified from this dev environment.
  - [ ] `CONTACT_TO_EMAIL` / `CAREERS_TO_EMAIL` — confirm these are monitored inboxes.
  - [ ] Optional: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` if enabling bot
        protection (see `docs/integrations-setup.md`).
  - [ ] Optional: analytics IDs (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GTM_ID`,
        `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
        `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`) — only once each
        account actually exists; leaving them unset is safe and intentional otherwise.
  - [ ] Optional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION`
        — only if using the meta-tag verification method instead of DNS TXT.
- [ ] Confirm `.env.local` and any real secret files are in `.gitignore` and were never
      committed (`git log --all --oneline -- .env.local` should return nothing).
- [ ] DNS: point the domain at the hosting provider (or Cloudflare, if proxying — see
      `docs/integrations-setup.md`), confirm HTTPS is issued and forced.

## Every deploy

- [ ] `npm run lint` — clean.
- [ ] `npx tsc --noEmit` — clean.
- [ ] `npm run build` — succeeds, confirm the route table still shows `○ Static` for all page
      routes (a page silently becoming dynamic is a real performance regression worth
      investigating before shipping).
- [ ] Smoke-test in a browser against the deploy preview URL: Home, About, Services,
      Industries, Careers, Contact, Privacy, Terms, an unmatched route (404), dark/light mode
      toggle, mobile viewport.
- [ ] Submit the Contact form and the Careers form (with a small test resume file) against the
      preview URL and confirm both emails actually arrive.
- [ ] Check response headers on the deployed URL (`curl -sD - -o /dev/null <url>`) — confirm
      CSP/HSTS/X-Frame-Options/etc. are present (they're set in `next.config.ts` so this should
      always pass, but hosting-platform-level header overrides have been known to strip
      custom headers on some providers — verify, don't assume).

## After first deploy (one-time, external steps)

- [ ] Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools (see
      `docs/integrations-setup.md`).
- [ ] Submit the domain to `hstspreload.org` once HTTPS is confirmed stable (HSTS is already
      set with `preload` in the header — this is the follow-up submission step).
- [ ] Create/claim the Google Business Profile listing (see `docs/integrations-setup.md` for
      the recommendation on one listing vs. two).
- [ ] Set up Cloudflare (WAF/DDoS/bot protection/rate limiting) if not already proxying through
      it — see `docs/integrations-setup.md`.
- [ ] Run PageSpeed Insights against the live URL and record a baseline score (see
      `docs/performance-report.md`).
- [ ] Set up uptime monitoring (UptimeRobot or Better Stack — see
      `docs/integrations-setup.md`) so downtime is caught automatically.

## Rollback plan

- Hosting platforms with atomic deploys (Vercel/Netlify) keep prior deployments addressable —
  if a deploy introduces a regression, redeploy/promote the last known-good deployment rather
  than attempting a hot-fix under pressure.
- Because the site is static, a bad deploy is a content/behavior regression, not a data-loss
  risk — there is no database or persisted state to worry about restoring.
