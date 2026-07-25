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

Coding standards (forward-looking — no app code exists yet):
- TypeScript strict mode; Zod schemas shared between client validation and tRPC input validation.
- Postgres tables/columns: `snake_case`. TypeScript: `camelCase`.
- Every tenant-scoped table gets an `org_id` column + RLS policy before any data is seeded in it — never add data first and RLS later.
- SQL migrations as versioned files via Supabase CLI, never hand-edited through the dashboard.

## 3. Current State

**Update this section as work progresses — it should always reflect reality, not the plan.**

**Built so far:** research and planning only. No application code exists yet; this is not currently a git repository.
- `FinalProject.md` — avatar, diary entries, brand identity, original lightweight PRD (course deliverable)
- `research/viability-analysis.md` — technical/market viability findings
- `research/certification-strategy.md` — certification/credentialing research
- `research/tech-stack.md` — full stack decision + cost analysis
- `research/PRD.md` — the authoritative, developer-ready PRD

**In progress:** nothing actively being built. Next step is implementation planning / scaffolding once Meg decides to proceed.

**Known open decisions (not yet resolved, flag before assuming an answer):**
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
FinalProject.md              # avatar, diary, brand identity, original PRD (course deliverable)
CLAUDE.md                    # this file
research/
  viability-analysis.md      # technical + market viability research
  certification-strategy.md  # certification/credentialing research
  tech-stack.md               # stack decision, MCP servers, cost analysis
  PRD.md                       # authoritative build-ready PRD
```

**Planned (not yet created — per `research/PRD.md` §4–5):**
```
src/
  app/                        # Next.js App Router pages
  server/
    trpc/routers/             # tRPC procedures, grouped by domain (org, tracks, assessments, certifications...)
    db/migrations/            # Supabase CLI-managed SQL migrations
  components/                 # React components (shadcn/ui-based)
.claude/rules/                 # add path-scoped conventions here if this file grows past ~200 lines
```

Naming conventions: research docs use kebab-case filenames; planned DB tables/columns use `snake_case`; planned TS files/exports use `camelCase`/`PascalCase` per standard React/TS convention.

## 6. External Dependencies

| Service | Purpose | Docs | Env var (name only) |
|---|---|---|---|
| Supabase | Postgres DB, Auth, Storage, RLS | supabase.com/docs | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Netlify | Hosting, serverless/background functions | docs.netlify.com | `NETLIFY_AUTH_TOKEN` (CLI/CI only) |
| Anthropic API | Assessment grading (Claude) | platform.claude.com/docs | `ANTHROPIC_API_KEY` |
| LinkedIn Learning | Course content/reporting — **mocked in MVP**, not a live integration | learn.microsoft.com/en-us/linkedin/learning | none yet — no live credentials in MVP |
| Credly / Accredible | Third-party credentialing — **deferred, not integrated** | credly.com/docs/web_service_api · docs.api.accredible.com | none — not in MVP scope |
| GitHub Actions | CI (lint/typecheck/test) | docs.github.com/en/actions | n/a |

## 7. User Avatar Reminder

**Denise Carter** — Senior Financial Analyst, Corporate Accounting, ~4,200-employee company. Full avatar: `FinalProject.md` §1.

She's not resistant to AI — she's anxious about it, and has never been shown a sanctioned, role-specific starting point. She fears looking incompetent in front of colleagues more than she fears the technology itself.

**UX principles that follow directly from that, non-negotiable in any feature work:**
- **Permission before exploration.** Every screen should feel sanctioned/approved, never like an open-ended catalog she has to guess her way through.
- **Role-specific, never generic.** "AI 101" content is the thing she already rejected twice before OnRamp.
- **Proof over participation.** A credential must mean she demonstrated something, not that she clicked through a course.
- **No public exposure by default.** No leaderboards, no visible failure states in front of peers — this is a direct product requirement, not a style preference.
- **Low time cost.** She evaluates everything against "I don't have time to go down a rabbit hole."
