# sitelytc.com — web (v2.0)

Marketing + lead-generation site for Sitelytc. Next.js 15 App Router, TypeScript (strict), Tailwind CSS v4.

> Structured to drop into `apps/web/` inside the Kritvia Turborepo. Standalone-runnable as-is.

## Getting started

```bash
pnpm install        # or npm install
cp .env.example .env.local   # fill in secrets — never commit .env.local
pnpm dev            # http://localhost:3001
```

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Dev server on :3001 |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm typecheck` | `tsc --noEmit` |

## Structure

```
src/
  app/
    (marketing)/
      layout.tsx        ← Navbar + Footer shell
      page.tsx          ← Home (ISR 60s)
    layout.tsx          ← Root: Inter font + metadata
    globals.css         ← Tailwind v4 @theme design tokens
  components/
    ui/                 ← Button, Container, Section primitives
    site/               ← Navbar, Footer
    home/               ← 8 Home sections
  lib/
    site.ts             ← Site config + nav
    utils.ts            ← cn() class merge
  middleware.ts         ← nonce-based CSP
next.config.ts          ← static security headers
```

## Security (foundation in place)

- Static security headers in `next.config.ts` (HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP).
- Nonce-based Content-Security-Policy generated per request in `middleware.ts`.
- `poweredByHeader: false`.

Still to wire (per project brief, Phase 2+): Zod validation + rate limiting + Turnstile CAPTCHA on API routes, Razorpay/Stripe webhook signature verification, DOMPurify on any user HTML.

## Built next (remaining 8 pages)

Services · Work + case studies · Process · About · Contact (multi-step form) · Cybersecurity · Kritvia · Blog (MDX).
