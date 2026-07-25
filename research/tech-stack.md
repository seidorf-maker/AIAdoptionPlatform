# OnRamp — Tech Stack Recommendation

**Prepared for:** Meg Seidorf & Maritza Herbert
**Date:** 2026-07-24
**Builds on:** [viability-analysis.md](viability-analysis.md) (LinkedIn Learning API is gated, not self-serve; gap-mapping engine is a contested feature category; architecture should keep third-party integrations mockable/swappable) and [certification-strategy.md](certification-strategy.md) (differentiate on competence-based assessment, not badge format; buy issuance infrastructure rather than build it; multi-tenant, role/competency-based schema).

**Bottom line up front:** React (via Next.js) + Node/TypeScript + Supabase (Postgres) + **Netlify** is the right stack for this team and this budget. Per your preference, Netlify replaces Vercel from the original draft of this analysis — and the swap turns out to help on two fronts, not just satisfy a preference: **Netlify also has an official, verified MCP server with confirmed Claude Code support** (Section 5), so the MCP story is unaffected, and **Netlify's Free plan explicitly permits commercial deployments** (Vercel's free Hobby tier does not) — which actually closes most of the budget gap flagged in the original analysis. A responsible pilot handling a real company's employee data still needs Supabase's paid tier for backups, but with Netlify's hosting able to stay on its free tier even for real/commercial use, the realistic pilot floor now lands closer to **$31–45/month** — comfortably under your $50 target. Details and reasoning below.

---

## 1. Frontend Recommendation

### Framework: Next.js (React), not React Native, for MVP
**[Next.js docs](https://nextjs.org/docs)** · **[React docs](https://react.dev)**

- Satisfies your stated preference for React directly, and is the dominant production framework for it — built-in API routes/Server Actions, and strong SSR/SSG support for fast initial page loads (worth noting given the brand promise is "the first door that doesn't feel like a wall" — a slow-loading app undercuts that). Netlify maintains a dedicated Next.js Runtime with confirmed full support for the App Router and React Server Components, so choosing Netlify over Vercel does not cost you any Next.js capability.
- **React Native is not recommended for MVP.** Every persona touchpoint in the research (Denise using the tool at her desk during lunch, a manager dashboard, an admin gap-mapping screen) is a workplace desktop/web use case, not a mobile-first one. Building React Native now would double the UI surface to maintain without validated mobile demand. If a mobile companion app is validated later, keeping business logic in framework-agnostic hooks/tRPC procedures (rather than tightly coupled to Next.js pages) keeps a future Expo/React Native port realistic without a full rewrite.

### Key libraries for OnRamp's specific features

| Need | Library | Why |
|---|---|---|
| Styling / brand system | **[Tailwind CSS](https://tailwindcss.com/docs)** + **[shadcn/ui](https://ui.shadcn.com)** | Fast to theme toward the brand identity's warm, human, non-"sci-fi" direction; shadcn ships accessible Radix primitives you own and customize rather than a heavy component-library dependency. |
| Assessment/form validation | **[React Hook Form](https://react-hook-form.com)** + **[Zod](https://zod.dev)** | Needed for the scenario-based assessment submissions that are the core certification differentiator — Zod schemas double as the validation layer on both client and server (and pair naturally with tRPC, below). |
| Data fetching / server state | **tRPC's React Query bindings** (see Backend section) | No separate state-management library needed for server data — see State management below. |
| Manager dashboard charts | **[Recharts](https://recharts.org)** | Lightweight, sufficient for the rollup views in PRD §4.4 (team enrollment/completion/certification stats) without a heavier charting dependency. |
| Supabase client | **[@supabase/supabase-js](https://supabase.com/docs/reference/javascript/introduction)** + **[@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs)** | Official client + Next.js SSR-compatible auth helpers. |

### State management approach
No Redux. Server state (courses, assessments, certifications, org data) is handled by **tRPC + TanStack Query** underneath it — tRPC's React Query integration gives caching, refetching, and optimistic updates for free. Local/client-only UI state (form steps, modal visibility) uses React's built-in `useState`/`useReducer`. Only reach for **[Zustand](https://zustand-demo.pmnd.rs)** if a genuine cross-cutting client state need shows up (e.g., a multi-step onboarding wizard) — don't add it preemptively.

---

## 2. Backend Recommendation

### Runtime: Node.js (TypeScript), not Python
**[Node.js docs](https://nodejs.org/en/docs)**

Your prompt asked which has better library support "for our needs" — here's the direct answer: **Node wins for this specific project**, and the reason is what "AI" actually means in this product. The assessment-grading and (eventual) gap-mapping features call a **hosted LLM API** (Anthropic's Claude), not custom-trained ML models. Node's Anthropic SDK is functionally equivalent to Python's for this use case, so Python's traditional advantage (numpy/pandas/scikit-learn for model training) doesn't apply — there's no model training in scope anywhere in the PRD.

What Node wins instead:
- **Full-stack TypeScript.** With tRPC, types flow from the database schema through the API to the React components with zero duplicated type definitions or manual API-schema syncing — a real speed and bug-reduction win for a 2-person team.
- **Runs natively as Netlify Functions** alongside the Next.js frontend — one deployment target, one bill, not two hosting platforms.
- If genuine data-science work emerges later (e.g., statistical analysis of assessment psychometrics), a small standalone Python service can be added *then* — it's not a reason to fragment the stack now.

### Framework and API architecture: tRPC over REST/GraphQL for internal calls
**[tRPC docs](https://trpc.io/docs)**

- **tRPC** for all internal client↔server calls (fetching tracks, submitting assessments, issuing certifications). It gives end-to-end type safety with far less setup than GraphQL (no schema files, no resolver boilerplate) — the right tradeoff for a small team building fast, not a large team optimizing for many independent API consumers.
- **REST (Next.js Route Handlers)** for anything a third party calls into — Credly/Accredible issuance webhooks, a future Stripe billing webhook, any future LinkedIn Learning callback. Third-party services expect standard REST/webhook conventions; forcing tRPC on inbound webhooks would add friction for no benefit.
- **GraphQL is explicitly not recommended.** It solves a problem (many heterogeneous API consumers, over/under-fetching at scale) that OnRamp doesn't have yet. Revisit only if a public partner API becomes a real product requirement.

### Authentication strategy
**[Supabase Auth docs](https://supabase.com/docs/guides/auth)**

- **Pilot phase:** email/password + Google OAuth. Low friction, matches the single-department pilot scope in the PRD, and Denise's persona work (she wants something "sanctioned," not something that requires a heavy IT lift to even log into).
- **Company-wide rollout phase:** Supabase supports **enterprise SSO via SAML 2.0** (docs: [supabase.com/docs/guides/auth/enterprise-sso/auth-sso-saml](https://supabase.com/docs/guides/auth/enterprise-sso/auth-sso-saml)) — this is the right moment to add it, not before. **Cost caveat worth confirming directly with Supabase before an enterprise pitch:** their pricing page lists SSO/SAML as a Team-tier ($599/mo) feature, but their own usage-docs page describes a separate per-MAU SSO pricing model (50 MAUs included, then metered) that reads as available outside the Team plan. The two sources weren't fully consistent in this research — get a direct quote before committing to either the Team tier or assuming per-MAU pricing applies.
- **Row Level Security (RLS)** in Postgres for multi-tenant data isolation between client organizations — this is a structural requirement, not optional, since OnRamp is B2B and every org's employee data must be provably isolated from every other org's. This also converts the brand's "sanctioned, approved" promise into an actual security architecture decision, not just messaging.

---

## 3. Database Recommendation

### Primary: Supabase (managed Postgres)
**[Supabase docs](https://supabase.com/docs)**

Three reasons, in order of weight:

1. **The domain model is relational, not document-shaped.** Organizations → users → roles/functions → competency domains → learning tracks → courses → assessments → submissions → certifications → integration connections is a graph of foreign-key relationships with real referential integrity needs (e.g., a certification should not be issuable without a passed assessment tied to a real submission). This fits Postgres far better than Firebase/Firestore's document model or MongoDB's — both of your other listed DB options would require you to hand-roll relational integrity that Postgres gives you for free.
2. **Supabase's MCP server is real, official, and already active in this Claude Code session** — see Section 5. Neither Firebase nor MongoDB Atlas has an equivalently direct, verified MCP integration for this workflow.
3. **One vendor covers DB + Auth + Storage + Edge Functions + (later) SSO**, which matters more for a 2-person team than it would for a larger one — fewer vendor dashboards, fewer bills, fewer integration seams to maintain.

### Schema approach (core tables, sketch-level)
`organizations`, `users` (linked to `auth.users`), `roles`, `competency_domains`, `learning_tracks`, `courses` (with a `source` field: `internal` | `linkedin_learning` | `other`, and a `status` field distinguishing `mocked` from `live` per the demo-scope note in viability-analysis.md — this cleanly separates the wireframed mock data from any future real integration), `assessments`, `submissions`, `certifications`, `integration_connections` (per-org, per-provider connection state — exactly where a mocked "LinkedIn Learning: connected" status lives before any real OAuth flow exists).

### Secondary data stores
- **Search:** Postgres native full-text search is sufficient at MVP scale. If the gap-mapping engine's semantic matching (skill description → course content) becomes real later, **pgvector** ships as a Postgres extension inside Supabase — no separate vector database vendor needed.
- **Cache:** none required at pilot scale (Supabase's connection pooler, Supavisor, is sufficient). If rate-limiting or session caching becomes necessary around the 1k-user mark, **[Upstash Redis](https://upstash.com/docs/redis)** is the recommended addition — its serverless, pay-per-request pricing matches the "don't pay for idle capacity" philosophy of the rest of this stack.
- **File storage:** Supabase Storage for org logos, any locally-generated certificate assets, screenshots.

### Backup and migration strategy
- **Backups:** Supabase's Free tier has **zero backups** — a real risk once real (non-demo) client data exists, not just a nice-to-have upgrade. Pro tier ($25/mo) includes 7-day automated backups; point-in-time recovery is a further paid add-on. Budget Pro tier from the moment a real pilot company's data is stored, not just at "1k users."
- **Migrations:** SQL migration files committed to the repo and applied via the **[Supabase CLI](https://supabase.com/docs/guides/local-development)**, not hand-edited through the dashboard — this matches Supabase's own recommended local-development-first workflow, and lines up with using the `create_branch`/`apply_migration` MCP tools to test schema changes on a preview branch before merging to production.

---

## 4. Infrastructure and Hosting

### Deployment platform: Netlify
**[Netlify docs](https://docs.netlify.com)**

One platform for the whole Next.js app — frontend, API routes, tRPC procedures, serverless functions. Netlify maintains a dedicated, actively developed Next.js Runtime with confirmed full support for the App Router and React Server Components, preview deployments per pull request (genuinely useful for a 2-person team reviewing each other's work before merge), and an official MCP server (Section 5).

**Worth stating plainly, since it changes the budget math:** unlike Vercel's Hobby tier, **Netlify's Free plan explicitly permits commercial deployments** — "you can deploy commercial projects... you want to share on the web" is Netlify's own language. That means OnRamp can pilot with a real company on Netlify's free tier without a forced upgrade the way Vercel would require. The tradeoff is a hard usage ceiling instead of a ToS restriction: Free gives **300 usage credits/month** (a unified metering unit covering deploys, compute, bandwidth, and requests) with a hard cap — the site pauses for the rest of the billing cycle if exceeded, with no surprise overage charges. For a single-department pilot this is very likely sufficient; monitor it, and upgrade to **Personal ($9/mo, 1,000 credits)** or **Pro ($20/mo flat, unlimited team members, 3,000+ credits)** as soon as usage approaches the cap. Note Netlify's Pro plan is a flat monthly fee with **unlimited seats** (no per-seat multiplier the way Vercel Pro charges $20/seat) — a real advantage for a growing team.

**One functions-specific tradeoff to design around:** Netlify's standard serverless functions default to a much shorter timeout (recently raised to 30 seconds) than Vercel's. This matters directly for the LLM-based assessment-grading calls central to the certification differentiator — see the mitigation in the Integration Map pain points below (use Netlify's **Background Functions**, which support a 15-minute timeout, for anything calling the Anthropic API).

### CI/CD
**[GitHub Actions](https://docs.github.com/en/actions)** for lint/typecheck/test on every pull request (free minutes are more than sufficient at this project's size), plus Netlify's native Git integration for automatic preview and production deploys. No separate CI/CD vendor needed. Run Supabase migrations as a reviewed step in the same workflow (or manually via the MCP tools pre-merge) so schema changes never land on production unreviewed.

### Estimated monthly costs

| | MVP / Pilot (demo-only) | MVP / Pilot (real client data) | ~1,000 users | ~10,000 users |
|---|---|---|---|---|
| Netlify | $0 (Free — commercial use allowed; watch the 300-credit/mo cap) | $0–9 (Free or Personal, if usage nears the cap) | $20 (Pro, flat, unlimited seats — may need a higher credit tier) | $20–200+ (higher Pro credit tier, or Enterprise/custom) |
| Supabase | $0 (Free — no backups) | $25 (Pro — 7-day backups) | $25–50 (Pro + possible overage) | $100–300 (Pro w/ overage), or $599 (Team, if SSO/SAML needed) |
| Anthropic API (assessment grading) | ~$5–10 | ~$5–10 | ~$50–150 (scales with assessment volume; use a smaller/faster model for routine grading) | ~$300–800+ |
| Upstash Redis (cache, optional) | $0 | $0 | $0–10 | $10–30 |
| Certificate issuance (Credly/Accredible) | $0 — deferred; see note below | $0 — deferred | Quote-based; get a direct quote once revenue justifies it | Quote-based, likely several hundred to $1,000+/mo depending on volume |
| Domain | ~$1 | ~$1 | ~$1 | ~$1 |
| **Total** | **~$6–11/mo** | **~$31–45/mo** | **~$115–230+/mo** | **~$700–2,500+/mo (wide range — get real vendor quotes)** |

**On the $50/month target specifically:** switching to Netlify resolves most of the earlier tension. A pure demo now costs next to nothing, and — because Netlify's free tier doesn't force a paid upgrade for commercial use the way Vercel's does — even a responsible pilot storing a real company's employee data lands around **$31–45/month**, comfortably under your $50 target. The remaining unavoidable cost is Supabase Pro ($25/mo) for backups, which is a data-safety requirement, not a hosting-vendor choice — no cheaper managed-Postgres alternative in your preferred list (Firebase, MongoDB Atlas) meaningfully improves on this once backups and auth are factored in equivalently.

**On certificate issuance specifically:** per certification-strategy.md, buying issuance infrastructure (Credly/Accredible) rather than building it is the right call *eventually*, but both are enterprise, quote-based products almost certainly priced well above the pilot budget. **Recommended interim approach for MVP/pilot:** issue your own simple verifiable-certificate record — a unique record in the `certifications` table, a shareable verification URL (e.g., `onramp.app/verify/{id}`), and a generated PDF/QR code stored in Supabase Storage. This costs nothing beyond what's already in the stack and can be swapped for Credly/Accredible once a real contract is affordable — keep OnRamp's own database as the source of truth either way (see Integration Map, pain point 5).

---

## 5. MCP Server Availability

| Component | MCP server? | What it enables |
|---|---|---|
| **Supabase** | **Yes — official, confirmed.** [supabase.com/docs/guides/ai-tools/mcp](https://supabase.com/docs/guides/ai-tools/mcp). Already active in this Claude Code session (`list_tables`, `execute_sql`, `apply_migration`, `create_branch`, `deploy_edge_function`, `get_advisors`, `get_logs`, and more). | Schema changes, migrations, and even branch-based testing of a change before it hits production — all drivable from inside Claude Code, without switching to the Supabase dashboard. This was a deciding factor (alongside the relational schema fit) in choosing Supabase over Firebase or MongoDB Atlas. |
| **Netlify** | **Yes — official, confirmed.** [docs.netlify.com/build/build-with-ai/agent-setup-guides/set-up-claude-code-for-netlify](https://docs.netlify.com/build/build-with-ai/agent-setup-guides/set-up-claude-code-for-netlify/), with a documented Claude Code setup command (`claude mcp add --transport http netlify https://netlify-mcp.netlify.app/mcp`). Netlify's MCP server gives agents direct access to the Netlify API and CLI — create projects, build, deploy, and manage resources via natural-language prompts. | Deployment management, build/deploy status, and project configuration from Claude Code — pairs naturally with the Supabase MCP tools for a schema-change → migrate → deploy → verify loop that mostly stays inside the coding session. |
| **GitHub** | Yes — GitHub publishes an official MCP server (`github/github-mcp-server`), one of the most widely used first-party MCP integrations. | PR review, issue triage, and CI status checks from Claude Code once the repo exists — recommended to set up alongside the above two. |
| **Anthropic API (Claude)** | Not applicable as "MCP" — it's the model/API being called by the app, not a service being managed via MCP. | Worth noting as a secondary benefit: Claude Code itself can help write and iterate on the assessment-grading prompts that call this API. |
| **Credly** | **No MCP server found.** Integration is via their standard REST API ([credly.com/docs/web_service_api](https://www.credly.com/docs/web_service_api)). | None via MCP — this is a real gap against your "prioritize MCP-available services" preference, and worth naming rather than glossing over. |
| **Accredible** | **No MCP server found.** Integration is via their standard REST API ([docs.api.accredible.com](https://docs.api.accredible.com/)). | Same gap as Credly. |

**Net effect on the dev workflow:** the core loop that matters most for a 2-person team building fast — database schema iteration, deployment, and verification — is almost entirely coverable through Claude Code via the Supabase and Netlify MCP servers. The one place the "prioritize MCP" preference doesn't get satisfied is certificate issuance (Credly/Accredible), which is a small, well-contained integration surface regardless — a reasonable tradeoff given neither offers a stronger MCP-native alternative in this space.

---

## 6. Integration Map

```
┌─────────────────────────────────────────────────────────────────┐
│  Next.js App (Netlify)                                           │
│  ┌───────────────┐        ┌──────────────────────────────────┐  │
│  │  React / UI    │◄──────►│  tRPC procedures (Node/TS)        │  │
│  │  (Tailwind,    │  React │  - tracks, assessments,           │  │
│  │   shadcn/ui)   │  Query │    submissions, certifications    │  │
│  └───────────────┘        └───────────────┬──────────────────┘  │
│                                            │                     │
│         REST Route Handlers (webhooks) ◄──┼──► Anthropic API     │
│                    │                       │    (assessment       │
└────────────────────┼───────────────────────┼──  grading calls)   │
                      │                       │                     
                      ▼                       ▼                     
        ┌─────────────────────┐   ┌───────────────────────────┐   
        │  Credly / Accredible │   │  Supabase                 │   
        │  (or interim self-   │   │  - Postgres (RLS, pgvector)│  
        │  issued verification │   │  - Auth (email/OAuth, SSO  │  
        │  page for MVP)        │   │    later)                 │   
        └─────────────────────┘   │  - Storage                 │   
                                    │  - Edge Functions          │   
                                    └───────────────┬───────────┘   
                                                     │                
                                                     ▼                
                              ┌───────────────────────────────────┐  
                              │  integration_connections table     │  
                              │  → LinkedIn Learning Reporting API │  
                              │    (MOCKED for demo/pilot per      │  
                              │    viability-analysis.md §4.5)     │  
                              └───────────────────────────────────┘  
```

### Potential integration pain points

1. **LinkedIn Learning API access gating** (already flagged in viability-analysis.md). The architecture keeps this behind an `integration_connections` adapter with an explicit mocked/live status, specifically so this external dependency can't block the rest of the build.
2. **Netlify standard function timeout limits.** Default serverless function timeout is short (recently raised to 30s) — too tight to safely rely on for LLM-based assessment grading under load, especially on longer or more complex submissions. Mitigate by routing grading calls through Netlify's **Background Functions** (15-minute timeout, part of Netlify's Async Workloads feature) instead of a standard synchronous function, paired with a `grading_jobs` table so the client polls or subscribes (via Supabase Realtime) for the result rather than waiting on a single blocking request-response call.
3. **Supabase Free tier auto-pauses after 1 week of inactivity.** Fine during active development; a real risk for a pilot with intermittent usage unless upgraded to Pro before going live with an actual client — another reason the "real pilot" cost line sits above $50/month rather than at the Free tier.
4. **Multi-tenant data isolation.** Postgres Row Level Security policies need to be correct per-organization from the very first migration — retrofitting RLS after real data exists is materially riskier than designing it in from day one.
5. **Certificate issuance vendor lock-in.** Credly (owned by Pearson) and Accredible both use their own proprietary verification URLs and branding. Mitigate by treating OnRamp's own `certifications` table as the permanent source of truth for "who earned what," and any external credentialing vendor as a downstream syndication target — this makes a future vendor switch (or a switch away from the interim self-issued MVP approach) a data-sync problem, not a data-migration crisis.
6. **tRPC vs. Next.js Server Actions overlap.** Both can technically handle mutations in a modern Next.js app; picking tRPC procedures as the single source of truth for all client↔server calls (rather than letting the codebase drift into a mix of both patterns) matters more for a 2-person team than it would for a larger one, since there's no one else to enforce the convention in review.

---

## Sources
- nextjs.org/docs, react.dev, trpc.io/docs, nodejs.org/en/docs, tailwindcss.com/docs, ui.shadcn.com, zod.dev, react-hook-form.com, recharts.org, upstash.com/docs/redis
- supabase.com/docs, supabase.com/docs/guides/ai-tools/mcp, supabase.com/docs/guides/auth/enterprise-sso/auth-sso-saml, supabase.com/docs/guides/local-development, supabase.com/pricing
- docs.netlify.com, docs.netlify.com/build/build-with-ai/agent-setup-guides/set-up-claude-code-for-netlify, docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview, netlify.com/pricing, docs.netlify.com/build/async-workloads/optional-configuration
- platform.claude.com/docs (Anthropic/Claude API developer docs)
- credly.com/docs/web_service_api, docs.api.accredible.com
- docs.github.com/en/actions
