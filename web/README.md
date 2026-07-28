# OnRamp — frontend prototype

A Next.js prototype of OnRamp: a role-based AI adoption platform for
non-technical employees at mid-to-large companies. The live-demo surface
(`/`, `/login`, `/app` — Prompt Coach + Competence Assessment, ported from
`onramp-demo.html`) now runs on **real Supabase auth** (anonymous sessions,
cookie-based via `@supabase/ssr`) and can call the **real Anthropic API**
for grading once `ANTHROPIC_API_KEY` is set locally. `/verify/[code]` is
kept from the earlier mocked pilot-flow prototype and still reads from
`src/lib/mock-data.ts` — no real `certifications` table exists yet.

See `../research/PRD.md` for the full product spec this prototype is
scoped from, and `../CLAUDE.md` for project-wide context.

## What's real vs. simulated here

- **Real:** the Next.js app, routing, and UI. Login (`/login`) creates a
  genuine Supabase session via `supabase.auth.signInAnonymously()` — no
  password is checked, but the session, `src/proxy.ts` route protection,
  and sign-out are all real, not mocked. Prompt Coach and Competence
  Assessment (`/app`) call the real Anthropic Messages API server-side via
  `src/app/api/claude/route.ts` when `ANTHROPIC_API_KEY` is configured.
- **Demo-mode by design, not a shortcut that snuck in:** any typed email
  signs the visitor in as a fixed persona (Denise Carter, Senior Financial
  Analyst) — there's no real email verification, so this is not
  production auth. See `../CLAUDE.md` §4 before treating it as more than
  a live-pitch demo mechanism.
- **Simulated:** the `/verify/[code]` certificate page (mock data, no
  database) and the LinkedIn Learning connection concept described in the
  PRD (not present in this narrower demo surface at all).

## Environment variables (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=       # server-only; add your own to enable live grading
```

This is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

This repo includes a `netlify.toml` configured for the official
`@netlify/plugin-nextjs` runtime, which supports the App Router fully. To
deploy: push this repo to GitHub, then in the Netlify dashboard choose
"Import an existing project" → connect the GitHub repo → Netlify detects
the build settings from `netlify.toml` automatically. No environment
variables are required for this prototype.
