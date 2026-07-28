# OnRamp — Project Memory

Project-level instructions for Claude Code. Layers on top of the personal profile CLAUDE.md one directory up (Meg's role/comms preferences) — this file is scoped to the OnRamp project only. Full detail lives in the linked research docs; this file is the fast-context index, kept under ~200 lines per Claude Code's own guidance so it stays reliable to follow. Read the linked docs (not imported, so they don't bloat every session) before proposing anything non-trivial.

## 1. Project Identity

**OnRamp** *(alt. name explored: Threshold)* — a role-based AI adoption platform that gives non-technical employees at mid-to-large companies a sanctioned, job-specific path into using AI, and issues real competence-based certifications (not completion badges) they can point to in performance conversations.

**Core mission:** prove someone can actually do an AI-assisted job task, not that they watched a video. This is the product's one real differentiator — see `research/certification-strategy.md`.

**Success criteria (pilot):** ≥60% track completion, ≥1 certification per active user, +15–20% AI tool utilization, +2–3 hrs/week self-reported time saved, at least one real story of a certification changing a workplace interaction. Full targets: `research/PRD.md` §8.

**Full PRD:** `research/PRD.md` — read this before any feature-scoping conversation.

## 2. Technical Context

**Stack:** Next.js (React, TypeScript) · tRPC (internal API) · Node.js runtime · Supabase (Postgres, Auth, Storage, RLS) · Netlify (hosting, functions, MCP) · Anthropic API (assessment grading). Full rationale: `research/tech-stack.md`.

Key architectural decisions (don't relitigate without reading the source doc first):
- **tRPC for all internal client↔server calls; REST only for webhooks/public endpoints** (certificate verification, future Credly/Accredible callbacks). No GraphQL.
- **Postgres, not Firebase/MongoDB** — the domain (orgs → roles → competencies → assessments → certifications) is relational, and Supabase's MCP server is already active in this environment.
- **Row Level Security is mandatory on every tenant-scoped table** — multi-tenant isolation is a structural requirement, not an app-layer nice-to-have.
- **LLM-graded assessments run as Netlify Background Functions**, not standard functions — standard functions time out too fast (~30s) for a Claude API grading call.
- **No Redux** — server state via tRPC + React Query; local state via `useState`/Zustand only if truly cross-cutting.
- **Certificates are self-issued for MVP** (unique verification URL + QR code in Supabase Storage) — Credly/Accredible are deferred, quote-based, over budget. `certifications` table is the permanent source of truth regardless of future vendor.

Coding standards (partially in effect — see §3 for what's actually built vs. still forward-looking):
- TypeScript strict mode; Zod schemas shared between client validation and tRPC input validation.
- Postgres tables/columns: `snake_case`. TypeScript: `camelCase`.
- Every tenant-scoped table gets an `org_id` column + RLS policy before any data is seeded in it — never add data first and RLS later.
- SQL migrations as versioned files via Supabase CLI, never hand-edited through the dashboard.

## 3. Current State

**Update this section as work progresses — it should always reflect reality, not the plan.**

**Built so far:**
- Research/planning docs: `research/viability-analysis.md`, `research/certification-strategy.md`, `research/tech-stack.md`, `research/PRD.md` (authoritative spec), `research/agents.md`, `research/skills.md`, `research/roadmap.md`.
- `.claude/skills/` — 31 build skills scaffolded (see `research/skills.md` for the full inventory and MVP-vs-deferred status per skill).
- `.claude/agents/` — 12 subagents scaffolded and **active** in this session (meta-coordinator, orchestrator, architecture-agent, database-agent, auth-security-agent, assessment-certification-agent, integration-agent, frontend-ux-agent, testing-qa-agent, infra-devops-agent, documentation-agent, error-handling-agent). `.claude/settings.json` sets the subagent spawn depth so `orchestrator` can delegate to them.
- **`web/` — a functional Next.js 16 (App Router, TypeScript, Tailwind) frontend prototype, now positioned as an investor-pitch-facing MVP demo** (not "course project" framing — that language was deliberately scrubbed from every user-visible screen). As of 2026-07-28 the live-demo surface was rebuilt from a mocked `localStorage` login onto **real Supabase auth**: `/` (landing, with a locked non-interactive preview of the real Prompt Coach/Competence Assessment components), `/login` (any typed email triggers a real `supabase.auth.signInAnonymously()` — a genuine cookie-based session via `@supabase/ssr`, storing a fixed demo identity + the typed email in user metadata; not real email verification, see `web/README.md`), and `/app` (protected by `web/src/proxy.ts` — Next.js 16 renamed `middleware` → `proxy` — greets the signed-in user and hosts both tools). **Prompt Coach** and **Competence Assessment** were ported from a provided `onramp-demo.html`/`competence-assessment.html` pair and call the **real Anthropic Messages API** server-side (`web/src/app/api/claude/route.ts`, session-gated, `ANTHROPIC_API_KEY` never reaches the browser) once that key is set — this is real LLM grading for this demo surface, not the client-side heuristic simulation the earlier prototype used. The older mocked multi-track pilot flow (`/dashboard`, `/track`, `/assessment`, `/certificate`) was removed as superseded by this narrower, richer demo; `/verify/[code]` was kept as-is (still `web/src/lib/mock-data.ts`-backed — no real `certifications` table exists) since public certificate verification is a permanent PRD §3.6 requirement independent of this rebuild. **Anonymous sign-ins had to be manually enabled** in the Supabase dashboard (Auth → Providers) — disabled by default, no MCP tool exposes that toggle. **The live Netlify deployment does not yet have `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or `ANTHROPIC_API_KEY` set as environment variables** — until Meg adds them in the Netlify dashboard, `/login` and `/app` will work locally (via `web/.env.local`) but not on the deployed site.
- This is a git repository (initialized at the project root, not just `web/`), pushed to `github.com/seidorf-maker/AIAdoptionPlatform`, `main` branch. `gh` CLI is installed locally at `~/.local/bin/gh` (not on PATH by default — use the full path or add it), authenticated as `seidorf-maker`; an SSH key at `~/.ssh/id_ed25519_onramp` is configured for git push access. PR #1 (mock login flow) has been merged.
- **Live deployment:** `https://on-ramp.netlify.app`, auto-deploying from `main`. Netlify's Base directory must be `web` (Build command `npm run build`, Publish directory `web/.next`) — this was misconfigured once already (Netlify defaulted to the repo root, which has no `package.json`, and silently served a 404 for every path with zero build assets). If the live site ever goes blank/404 again, check that setting first before assuming a code regression.

**Not yet built — don't assume these exist:**
- Postgres schema/migrations, RLS policies, or tRPC routers from `research/PRD.md` §4–5 — the Supabase project has an empty `public` schema, no `organizations`/`org_members`/competency/assessment tables exist. The real Auth described in the PRD (org-scoped, role-based, real email/OAuth) does not exist — `/login`'s anonymous-sign-in-as-a-fixed-persona is a live-pitch demo mechanism, not that system, and doesn't touch org/RLS data at all.
- The full multi-tenant product (org onboarding, role-based tracks, gap-mapping, tiered certifications, manager dashboard, champions/nudges) — `web/` only implements the narrower Prompt Coach + Competence Assessment demo surface today.
- Any live third-party integration (LinkedIn Learning, Credly, Accredible) — intentionally mocked/deferred, not started.
- CI pipeline (no `.github/workflows/` yet — local `npm run build`/typecheck is the only verification today).

**In progress:** Sprint Zero infrastructure provisioning has started. A Supabase project named **On-Ramp-app** (ref `jjvhmagpsakgxhnckmhl`, org `seidorf-maker's Org`, us-east-1, Postgres 17.6, free tier/$0-month) was created 2026-07-28 via the Supabase MCP connector — status ACTIVE_HEALTHY, `public` schema still empty (no migrations applied). `web/` now points at this project for auth (`web/.env.local`), but no application data lives there yet. The database password was auto-generated by Supabase during creation and was not surfaced by the MCP tool; retrieve/reset it from the Supabase dashboard (Project Settings → Database) if direct `psql`/connection-string access is ever needed. Netlify/Google OAuth provisioning has not started. Next steps per `research/roadmap.md`: apply the Postgres schema from `research/PRD.md` §4 (with RLS from the start, per house rule) and add the Netlify env vars noted above.

**Known open decisions (not yet resolved, flag before assuming an answer):**
- Whether the homepage should stay anchored to Denise Carter specifically (Senior Financial Analyst, accounting) or broaden the persona framing if the investor pitch isn't accounting-specific — flagged, not yet decided.
- Whether assessment rubrics should be partially or fully hidden from users pre-submission (PRD §5.1 note).
- Supabase SSO/SAML pricing — sources were inconsistent (Team-tier vs. per-MAU add-on); confirm directly with Supabase before any enterprise SSO work.
- LinkedIn Learning Partner Program terms — unconfirmed; MVP assumes mocked data only (see §6 below).

## 4. Agent Instructions

**How to approach this codebase:** Before proposing or building any feature, check `research/PRD.md` first — it's the authoritative spec. If a request conflicts with a decision already made and justified in the research docs, say so explicitly rather than silently overriding it.

**Ask before proceeding when:**
- A change touches multi-tenant data isolation (RLS policies) — confirm the isolation model before altering it.
- A change would wire up a real (non-mocked) third-party integration (LinkedIn Learning, Credly, Accredible) — these are intentionally mocked/deferred for cost and access reasons, not unfinished TODOs.
- A change affects the assessment-grading logic — this is the core product differentiator; don't casually simplify it to a quiz/completion check.
- Scope creep would push MVP hosting/API costs meaningfully past the ~$45/month pilot budget in `research/tech-stack.md`.

**Never do without explicit approval:**
- Never remove or weaken a Row Level Security policy.
- Never auto-fail an assessment submission silently — the `needs_review` escalation path is mandatory, not optional (this is a UX/trust requirement tied directly to the target user's fear of public failure, not just an engineering nicety).
- Never commit secrets, API keys, or `.env` values to version control.
- Never add a paid third-party service (Credly, Accredible, SSO add-ons, etc.) without flagging the cost against the budget in `research/tech-stack.md` first.
- Never treat a `mocked`-status integration as if it were live in a demo without saying so out loud — this was flagged as a credibility risk in `research/viability-analysis.md`.

## 5. File Structure Map

**Current (actual):**
```
README.md                    # repo orientation
CLAUDE.md                    # this file
research/
  viability-analysis.md      # technical + market viability research
  certification-strategy.md  # certification/credentialing research
  tech-stack.md               # stack decision, MCP servers, cost analysis
  PRD.md                       # authoritative build-ready PRD
  agents.md                     # subagent architecture (source of truth for .claude/agents/)
  skills.md                     # build-skill inventory (source of truth for .claude/skills/)
  roadmap.md                    # MVP definition, milestones, Sprint Zero, launch checklist
.claude/
  agents/                     # 12 subagent definitions, active
  skills/                     # 31 skill definitions
  settings.json                # subagent spawn depth config
  launch.json                   # dev server launch config for /run and preview tooling
web/                          # Next.js frontend prototype — see web/README.md
  src/app/                     # App Router pages (dashboard, track, assessment, certificate, verify)
  src/lib/mock-data.ts          # all demo data; swap point for a real backend later
  src/components/               # shared UI primitives
  CLAUDE.md                     # imports ../CLAUDE.md + Next.js-version-specific AGENTS.md
```

**Planned (not yet created — per `research/PRD.md` §4–5, needed once the backend starts):**
```
web/src/server/
  trpc/routers/               # tRPC procedures, grouped by domain (org, tracks, assessments, certifications...)
  db/migrations/               # Supabase CLI-managed SQL migrations
.claude/rules/                  # add path-scoped conventions here if this file grows past ~200 lines
```

Naming conventions: research docs use kebab-case filenames; planned DB tables/columns use `snake_case`; TS files/exports use `camelCase`/`PascalCase` per standard React/TS convention.

## 6. External Dependencies

| Service | Purpose | Docs | Env var (name only) |
|---|---|---|---|
| Supabase | Postgres DB, Auth, Storage, RLS | supabase.com/docs | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Netlify | Hosting, serverless/background functions | docs.netlify.com | `NETLIFY_AUTH_TOKEN` (CLI/CI only) |
| Anthropic API | Assessment grading (Claude) | platform.claude.com/docs | `ANTHROPIC_API_KEY` |
| LinkedIn Learning | Course content/reporting — **mocked in MVP**, not a live integration | learn.microsoft.com/en-us/linkedin/learning | none yet — no live credentials in MVP |
| Credly / Accredible | Third-party credentialing — **deferred, not integrated** | credly.com/docs/web_service_api · docs.api.accredible.com | none — not in MVP scope |
| GitHub Actions | CI (lint/typecheck/test) | docs.github.com/en/actions | n/a |

## 7. User Avatar & Brand Voice

**Denise Carter** — Senior Financial Analyst, Corporate Accounting, ~4,200-employee company. She's not resistant to AI — she's anxious about it, and has never been shown a sanctioned, role-specific starting point. She fears looking incompetent in front of colleagues more than she fears the technology itself. Her arc in three moments (this is the emotional throughline every feature should serve): **before** — lying awake ashamed she doesn't already know this, no idea where she's allowed to start; **first use** — relief that something was finally built "for someone like me," a door instead of a locked one; **after** — a real credential she can name in a meeting, self-doubt quieter, not gone.

**UX principles that follow directly from that, non-negotiable in any feature work:**
- **Permission before exploration.** Every screen should feel sanctioned/approved, never like an open-ended catalog she has to guess her way through.
- **Role-specific, never generic.** "AI 101" content is the thing she already rejected twice before OnRamp.
- **Proof over participation.** A credential must mean she demonstrated something, not that she clicked through a course.
- **No public exposure by default.** No leaderboards, no visible failure states in front of peers — this is a direct product requirement, not a style preference.
- **Low time cost.** She evaluates everything against "I don't have time to go down a rabbit hole."

**Brand voice:** mentor/guide archetype, not a tech-disruptor brand. Plain language over jargon ("let AI draft the first pass" not "leverage generative AI capabilities"). Permission-giving phrasing ("here's exactly what to use," "this is approved," "step by step"). Quietly celebratory at milestones, never gamified hype. Tagline: *"AI, for the rest of us."* Visual direction: warm neutrals + one confident accent color (see `web/src/app/globals.css` for the implemented palette) — deliberately not the cold blue/purple "AI tech" gradient cliché.
