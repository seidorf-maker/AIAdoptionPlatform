# OnRamp — frontend prototype

A functional, mock-data-only Next.js prototype of OnRamp: a role-based AI
adoption platform for non-technical employees at mid-to-large companies.
No backend, database, or authentication is wired up yet — every screen
reads from `src/lib/mock-data.ts` so the whole product story (recommended
track → courses → a real scenario-based assessment → grading → a
verifiable certificate) can be demoed without any account setup.

See `../research/PRD.md` for the full product spec this prototype is
scoped from, and `../CLAUDE.md` for project-wide context.

## What's real vs. simulated here

- **Real:** the Next.js app, routing, and UI — this builds and deploys as
  a genuine working app.
- **Simulated:** grading (a `setTimeout` + simple heuristic stands in for
  the real Claude API pipeline in `research/PRD.md` §3.5), the LinkedIn
  Learning connection (explicitly labeled "Demo data" in the UI, per
  `research/viability-analysis.md`), and certificate issuance (no database
  — the same mock certificate renders every time).

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
