# Coorbitz — Security Audit Report

_Last updated: 2026-07-17. Scope: the Coorbitz Next.js marketing site (App Router, Next.js 16),
its two lead-capture forms, and its deployment configuration._

## Executive Summary

Coorbitz is a static-first marketing site with no user accounts, no admin panel, and no
database — the threat model is intentionally narrow: protect the two public forms from abuse,
prevent the site from being embedded/hijacked by third parties, and ship the HTTP security
headers a modern browser expects. This audit covers what was found, what was fixed, and what's
deliberately left as a documented trade-off rather than "fixed" at the cost of breaking the
site or its performance.

## What changed in this pass

| Area | Before | After |
|---|---|---|
| Security headers | None set | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COEP, COOP, CORP (`next.config.ts`) |
| `X-Powered-By` header | Sent (`Next.js`) | Removed (`poweredByHeader: false`) |
| Contact form spam defense | Honeypot + time-trap + Formspree's own filtering | Same, plus optional Cloudflare Turnstile (client-verified via Formspree's own Turnstile integration) |
| Careers form spam defense | Honeypot + time-trap + in-memory rate limit | Same, plus optional Cloudflare Turnstile verified **server-side** in `/api/careers` |
| Dark-mode badge contrast | 4.23:1 (fails WCAG AA) | 4.85:1 (passes) — see `docs/seo-audit.md` is not relevant here; see the Accessibility section below |

## Admin routes / authentication

**There are none.** The codebase has no admin panel, no login, no session, and no JWT
anywhere — the two API routes (`/api/careers`, `/api/newsletter`) are unauthenticated-by-design
write-only endpoints that only ever send an email. The "Authentication" checklist item in the
request (secure cookies, HttpOnly, SameSite, CSRF, JWT) doesn't apply to this codebase today.
**If an admin area is added later**, it should use HttpOnly + `Secure` + `SameSite=Lax` session
cookies (or a vetted auth provider like Auth.js/Clerk), CSRF tokens on any state-changing form,
and short-lived JWTs if used for API auth — not implemented now because there's nothing to
protect yet, and adding auth scaffolding with no real login would itself be a liability.

## HTTP Security Headers (implemented in `next.config.ts`)

- **Content-Security-Policy** — `default-src 'self'`, with a narrow, named allowlist for the
  *optional* analytics/marketing scripts and Cloudflare Turnstile (all inactive until their env
  vars are set — see `docs/integrations-setup.md`), Formspree (`connect-src`/`form-action`),
  and Google Maps embeds (`frame-src`). `object-src 'none'`, `base-uri 'self'`,
  `frame-ancestors 'self'`.
  - **Deliberate trade-off — no nonces:** Next.js's documented strict-CSP pattern uses a
    per-request nonce generated in `proxy.ts`. That requires every page to render dynamically
    per request — nonces are incompatible with static generation, ISR, and Partial
    Prerendering. This site is 100% statically generated today (confirmed: every route shows
    `○ Static` in the build output), which is the foundation of its performance story. Trading
    that away for a nonce isn't justified for a marketing site with no sensitive data and no
    login — so `script-src` is `'self'` plus a named list of trusted third-party script hosts.
  - **`'unsafe-inline'` on `script-src` is required, not a hardening gap left open by
    choice.** An earlier version of this policy omitted it, on the assumption that no inline
    scripts were needed. That was wrong and shipped a production-breaking bug: without a
    nonce, Next.js's own unnonced inline bootstrap/hydration scripts (and the scripts that
    resolve a `loading.tsx` Suspense fallback into real content) were silently blocked by the
    browser, so client-side hydration never completed — every page stayed frozen on its
    loading fallback in production (confirmed via a live deployment; the local dev server
    didn't surface it, which is why running an actual `next build && next start` smoke test
    matters more than testing against `next dev`). `'unsafe-inline'` is the accepted trade-off
    until the nonce-based CSP above is implemented — see "Future Improvements".
  - `style-src` also allows `'unsafe-inline'`, a comparatively low-risk trade-off (inline CSS
    can't execute arbitrary JS) needed for Next's font-loading styles and Tailwind's runtime
    behavior.
- **Strict-Transport-Security** — `max-age=63072000; includeSubDomains; preload` (2 years).
  Submit to hstspreload.org once the real domain is live and consistently served over HTTPS.
- **X-Frame-Options: SAMEORIGIN** — legacy-browser backstop for the CSP `frame-ancestors` rule.
- **X-Content-Type-Options: nosniff** — stops MIME-sniffing-based attacks.
- **Referrer-Policy: strict-origin-when-cross-origin** — a reasonable balance of analytics
  usefulness and not leaking full URLs (which can contain query strings) to third parties.
- **Permissions-Policy** — blocks camera, microphone, geolocation, payment, USB, Bluetooth, and
  FLoC (`interest-cohort`) — none of these APIs are used anywhere in the app.
- **Cross-Origin-Embedder-Policy: `unsafe-none`** (deliberately, not `require-corp`) —
  `require-corp` would break the Google Maps iframe embeds on the About and Contact pages,
  since Google doesn't send a compatible `Cross-Origin-Resource-Policy` header on that embed.
  This site also has no need for cross-origin isolation (no `SharedArrayBuffer`, no WASM
  threading), so there's no upside to forcing it and a real, visible downside (broken maps).
- **Cross-Origin-Opener-Policy: same-origin** — isolates the browsing context from cross-origin
  popups (mitigates some cross-window leak attacks); doesn't affect iframe embeds, so this is
  safe to enable without breaking Maps.
- **Cross-Origin-Resource-Policy: same-origin** — stops other sites from hotlinking/embedding
  this site's own assets in a `<script>`/`<img>`; doesn't affect this site's own outbound
  requests to Formspree/Maps/analytics, and doesn't affect social-media OG image crawlers
  (crawlers are server-to-server fetches, not subject to browser-enforced CORP).

## Form Security

Both forms (`ContactForm`, `CareerForm`) share the same defense stack:

1. **Client + server validation** — Zod schemas (`src/lib/validations.ts`) validate every
   field; the Contact form's schema also runs client-side via `zodResolver`, and the Careers
   form's schema is re-validated server-side in `/api/careers` (never trust client validation
   alone — enforced here since the Careers route is our own backend).
2. **Honeypot field** — a visually- and `aria-hidden` input named `website` that real users
   (and screen readers) never see or fill; bots that auto-fill every field trip it, and the
   submission is silently accepted without actually sending — this avoids tipping the bot off
   that it was detected, discouraging repeat/adaptive attempts.
3. **Time-trap** — submissions faster than 2 seconds after the form rendered are silently
   dropped (no human fills a multi-field form that fast).
4. **Rate limiting** — `/api/careers` and `/api/newsletter` cap submissions per client IP via
   an in-memory limiter (`src/lib/rate-limit.ts`). This is best-effort on serverless (each
   instance has its own memory), not a substitute for Cloudflare-level rate limiting on a busy
   site — see `docs/integrations-setup.md` for the Cloudflare rate-limiting path.
5. **Cloudflare Turnstile (optional, new this pass)** — `TurnstileWidget` renders nothing at
   all unless `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set, so both forms work exactly as before if
   it's left unconfigured. Once configured: the Contact form (which posts directly to
   Formspree) includes the `cf-turnstile-response` token in the payload for Formspree's native
   Turnstile verification (must also be enabled in the Formspree dashboard); the Careers form
   (our own `/api/careers` route) verifies the token server-side against Cloudflare's
   `siteverify` API via `src/lib/turnstile.ts`, rejecting the submission if verification fails.
6. **XSS protection** — React escapes all rendered text by default; the only
   `dangerouslySetInnerHTML` in the codebase is the JSON-LD `<script type="application/ld+json">`
   renderer, which serializes structured data via `JSON.stringify` (not user input) and is not
   an XSS vector. Email HTML bodies (`src/lib/email.ts`) run all user-supplied fields through
   an `escapeHtml()` helper before interpolating into the notification email's HTML.
7. **Email header injection protection** — Nodemailer's `sendMail` API takes structured
   `to`/`from`/`subject`/`html` fields rather than raw header strings, so user input can't
   inject additional headers (e.g., `Bcc:` or `\r\n`-smuggled headers) — this is a property of
   using Nodemailer's object API rather than hand-building raw SMTP headers, and no code here
   ever concatenates user input directly into a header string.
8. **SQL injection** — not applicable. Neither form persists to a database; both are
   email/webhook-only (Nodemailer / Formspree). There is no SQL, ORM, or raw query anywhere in
   the codebase.

## Environment Variables

- No secret ever reaches the client bundle: only variables explicitly prefixed
  `NEXT_PUBLIC_*` are inlined into client-side JavaScript by Next.js, and every genuinely
  secret value (`SMTP_PASS`, `TURNSTILE_SECRET_KEY`) is deliberately **not**
  `NEXT_PUBLIC_`-prefixed, so it only exists in server-side code (API routes, `lib/email.ts`,
  `lib/turnstile.ts`).
- `.env.local` is git-ignored (`.gitignore` excludes `.env*` except `.env.example`); real
  secrets should only ever live in `.env.local` (local dev) or the hosting platform's encrypted
  environment variable store (Vercel/Netlify project settings) — never committed.
- `.env.example` documents every variable the app reads, with placeholder/empty values, so a
  new developer can see exactly what's configurable without any real secret being present in
  the repo.

## Accessibility-adjacent security note

Not a vulnerability, but flagged during this pass: the dark-mode "secondary" badge color
(`--secondary: #8b5cf6`) had a 4.23:1 contrast ratio against its white text — just under the
WCAG AA 4.5:1 minimum for normal text. Adjusted to `#7c4fe0` (4.85:1) in `globals.css`. See
`docs/seo-audit.md`'s accessibility notes for the full contrast audit.

## Residual Risk / What This Doesn't Cover

- **No WAF/DDoS/bot-network protection at the network layer** until Cloudflare (or an
  equivalent) is placed in front of the hosting provider — see `docs/integrations-setup.md`.
  Vercel's own platform includes some DDoS mitigation by default, but Cloudflare adds a second,
  configurable layer plus rate limiting and bot scoring.
- **In-memory rate limiting resets on redeploy/cold start** and doesn't share state across
  serverless instances — acceptable as a second line of defense behind Cloudflare rate
  limiting, not sufficient alone against a determined attacker.
- **No dependency/SCA scanning configured** (e.g., `npm audit`, Dependabot, Snyk) — recommended
  as a lightweight, free addition; see Future Improvements.

## Security Checklist

- [x] CSP configured (script-src restricted to `'self'` + named third-party hosts; `'unsafe-inline'` required for Next.js's own inline hydration scripts — see reasoning above)
- [x] Verified against an actual `next build && next start` / production deployment, not just `next dev` (catches hydration-only issues like the one above)
- [x] HSTS configured (2-year max-age, includeSubDomains, preload-ready)
- [x] X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy set
- [x] COEP/COOP/CORP set with documented, deliberate values (not blindly maxed out)
- [x] `X-Powered-By` header removed
- [x] Both forms: honeypot + time-trap + server-side validation
- [x] Optional Turnstile support wired end-to-end (client widget + server verification)
- [x] No secrets in client bundle; `.env.local` git-ignored
- [x] XSS: no unsanitized `dangerouslySetInnerHTML`; email bodies HTML-escaped
- [x] No SQL injection surface (no database)
- [ ] Cloudflare WAF/DDoS/rate-limiting in front of production (external setup — see guide)
- [ ] HSTS preload submission (do this once the real domain is live on HTTPS)
- [ ] Dependency/SCA scanning (Dependabot or `npm audit` in CI) — recommended, not yet added
- [ ] Sentry error monitoring (documented, not installed — no DSN provided)
