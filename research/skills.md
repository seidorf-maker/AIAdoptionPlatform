# OnRamp — Skills Inventory

**Prepared for:** Meg Seidorf & Maritza Herbert
**Date:** 2026-07-24
**Source:** [research/PRD.md](PRD.md) (features §3, schema §4, API §5, non-functional requirements §6), cross-referenced against `research/tech-stack.md` for concrete libraries/services.
**Method note:** Per the official Claude Code skills docs ([code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills), which is where `docs.anthropic.com/en/docs/claude-code/skills` now redirects), a "skill" is a `SKILL.md` file with YAML frontmatter (`name`, `description`, optionally `allowed-tools`, `context: fork`, etc.) plus markdown instructions, invoked either automatically (Claude matches the `description`) or directly via `/skill-name`. Every entry below is written as a real candidate for a `.claude/skills/<name>/SKILL.md` file in this project, not just an abstract capability — the "Example Invocation" field shows the actual command or the natural-language phrasing that would trigger it.

**Before building any of these:** once application code exists, run `/run-skill-generator` once to teach the bundled `/run` and `/verify` skills how to launch this specific project (Next.js + Supabase + Netlify has a non-trivial launch sequence — env vars, a local Supabase instance, etc.). That's a bundled skill, not listed below, but it should be the very first skill set up in this repo.

35 skills identified across 8 categories. "Be exhaustive" was taken literally — several of these (e.g., the Credly/Accredible sync skill) are intentionally **not needed yet** per the PRD's own scope decisions, and are flagged as such rather than omitted, so nothing gets silently missed later.

---

## Category 1: Database Operations

### 1.1 Supabase Migration Generator
- **Description:** Scaffolds a new versioned SQL migration file for a schema change (new table, column, constraint) matching the entity definitions in PRD §4.3, and applies it via the Supabase CLI/MCP rather than the dashboard.
- **Input:** Table/field spec (name, types, FKs) from PRD §4.3; target environment (local/branch/prod).
- **Output:** A new migration file under `supabase/migrations/`, applied and confirmed via `list_tables`.
- **Dependencies:** Supabase CLI; Supabase MCP server (`apply_migration`, `create_branch`, `list_tables`). No other skill dependency.
- **Documentation:** [Supabase local development](https://supabase.com/docs/guides/local-development) · [Supabase MCP server](https://supabase.com/docs/guides/ai-tools/mcp)
- **Complexity:** Moderate — schema correctness matters (FKs, RLS must follow immediately, see 1.2).
- **Example invocation:** `/generate-migration assessment_submissions` or "Add the `assessment_submissions` table from the PRD schema."

### 1.2 RLS Policy Scaffolder
- **Description:** Generates the standard Row Level Security policy set (select/insert/update/delete) for a new tenant-scoped table, following the `org_members` lookup pattern in PRD §4.1 — never a client-trusted `org_id`.
- **Input:** Table name, whether it's tenant-scoped or a global-template table (nullable `org_id`).
- **Output:** SQL policy statements, included in the same migration as 1.1 (never a separate, later migration — PRD explicitly flags retrofitting RLS as risky).
- **Dependencies:** Postgres RLS; depends on 1.1 running first (or same migration).
- **Documentation:** [Postgres Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) · [Supabase RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- **Complexity:** Complex — getting this wrong is the single highest-severity risk named in the PRD (§6, §4.1).
- **Example invocation:** "Add RLS to the new `champions` table."

### 1.3 Org & User Bulk CSV Import Skill
- **Description:** Parses and validates a CSV of employee invites (email, name, job function) for org onboarding (PRD §3.1), rejecting malformed rows with specific errors rather than failing the whole batch.
- **Input:** CSV file, target `org_id`.
- **Output:** Validated `org_members` insert batch (status `invited`), plus a rejected-rows report.
- **Dependencies:** Zod (row-level validation); `org_members.email` uniqueness constraint (relies on 1.1/1.2 already existing for this table).
- **Documentation:** [Zod](https://zod.dev)
- **Complexity:** Simple.
- **Example invocation:** `/import-org-members acme-corp.csv`

### 1.4 Mock Integration Seed Data Generator
- **Description:** Populates `integration_connections` (status `mocked`), `courses` (source `linkedin_learning`, status `mocked`), and sample gap-mapping data so the demo screen in PRD §3.4 has realistic content without a live API call.
- **Input:** Org ID, job function, desired sample scenario.
- **Output:** Seeded rows clearly distinguishable as mock data (never silently indistinguishable from live data — see CLAUDE.md rule).
- **Dependencies:** Depends on 1.1/1.2 for the target tables existing.
- **Documentation:** n/a (internal seed script) — cross-reference [viability-analysis.md §1](viability-analysis.md) for why this stays mocked.
- **Complexity:** Simple.
- **Example invocation:** "Seed demo gap-mapping data for the accounting track."

### 1.5 Database Index/Query Auditor
- **Description:** Reviews a new or changed tRPC procedure's query pattern against the indexing strategy in PRD §4.4 (composite `org_id`+`status` indexes, etc.) and flags missing indexes before they become a production slow-query problem.
- **Input:** The procedure's query code or a description of its filter/sort pattern.
- **Output:** A pass/fail note plus a suggested index migration if needed (hands off to 1.1).
- **Dependencies:** `EXPLAIN ANALYZE` via Supabase; no external package.
- **Documentation:** [Postgres indexes](https://www.postgresql.org/docs/current/indexes.html)
- **Complexity:** Moderate.
- **Example invocation:** "Check whether `dashboard.orgRollup` needs a new index."

---

## Category 2: Authentication and Authorization

### 2.1 Supabase Auth Setup Skill
- **Description:** Scaffolds the pilot-phase auth flow — email/password + Google OAuth — per PRD §3.1/§6, including the Next.js SSR-compatible session handling.
- **Input:** None beyond confirming pilot vs. rollout phase (SSO is explicitly out of scope until rollout — see 2.4 below).
- **Output:** Working signup/login pages, session middleware.
- **Dependencies:** `@supabase/supabase-js`, `@supabase/ssr`; Supabase Auth.
- **Documentation:** [Supabase Auth](https://supabase.com/docs/guides/auth) · [Supabase SSR for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- **Complexity:** Moderate.
- **Example invocation:** `/setup-auth`

### 2.2 RBAC Role Guard Generator
- **Description:** Generates the tRPC middleware wrapper that enforces the `org_role` checks (`employee` / `manager` / `manager-own-team` / `admin` / OnRamp-internal-admin) described in PRD §5.3, so every new procedure gets consistent authorization without hand-rolled checks.
- **Input:** Required role tier for a given procedure.
- **Output:** A reusable tRPC middleware (`protectedProcedure`, `adminProcedure`, etc.) applied to the target procedure.
- **Dependencies:** tRPC middleware API; depends on 2.1 for session context.
- **Documentation:** [tRPC middleware](https://trpc.io/docs/server/middlewares)
- **Complexity:** Moderate.
- **Example invocation:** "Add an admin-only guard to `certifications.revoke`."

### 2.3 Multi-Tenant Org-Scoping Reviewer
- **Description:** Audits a new or modified procedure/endpoint specifically for cross-org data leakage — the PRD's single named non-negotiable. Distinct from 1.2 (which writes the DB-level policy) — this checks the application layer doesn't bypass it (e.g., via a service-role client used incorrectly).
- **Input:** The procedure code and the tables it touches.
- **Output:** A pass/fail report; on fail, the specific line where org scoping is missing.
- **Dependencies:** Depends on 1.2 and 2.2 already being in place to check against.
- **Documentation:** Internal — cross-reference PRD §4.1 and §6.
- **Complexity:** Complex — this is a review skill for the project's highest-stakes property, best run with `context: fork` and a dedicated review pass rather than inline.
- **Example invocation:** `/audit-org-scoping` (recommended before every PR touching `server/trpc/routers/`).

### 2.4 Enterprise SSO/SAML Scaffolder *(deferred — do not build yet)*
- **Description:** Would wire Supabase's SAML SSO for the company-wide rollout phase. **Explicitly out of scope until then** per PRD §7 — listed here so it isn't forgotten, not as a current task.
- **Input:** Client's IdP metadata (future).
- **Output:** SSO login path (future).
- **Dependencies:** Supabase enterprise SSO — pricing is unconfirmed (Team-tier vs. per-MAU add-on, per tech-stack.md §2) and must be resolved before this skill is ever invoked for real.
- **Documentation:** [Supabase SAML SSO](https://supabase.com/docs/guides/auth/enterprise-sso/auth-sso-saml)
- **Complexity:** Complex.
- **Example invocation:** Not invocable yet — flagged `disable-model-invocation: true` if scaffolded at all, to prevent accidental use before pricing is confirmed.

---

## Category 3: API Integration with External Services

### 3.1 Anthropic API Grading Integration
- **Description:** The core differentiator (PRD §3.5). Wires a scenario-response submission to a Claude API call graded against the stored rubric, running as a Netlify Background Function (not a standard function — timeout constraints per tech-stack.md §4).
- **Input:** `assessment_submissions` row (submission text/file, linked rubric).
- **Output:** Structured grading result (`score`, rubric-mapped feedback) written back to the row, status transitioned `pending → graded → passed/failed/needs_review`.
- **Dependencies:** `@anthropic-ai/sdk`; Netlify Background Functions / Async Workloads; depends on 1.1 (`assessments`, `assessment_submissions` tables) and 8.2 (escalation handling) existing.
- **Documentation:** [Claude API docs](https://platform.claude.com/docs) · [Netlify Background Functions](https://docs.netlify.com/build/async-workloads/optional-configuration/)
- **Complexity:** Complex — grading quality directly determines whether the certification means anything (certification-strategy.md §2).
- **Example invocation:** "Wire up grading for the finance variance-report assessment."

### 3.2 Mocked LinkedIn Learning Adapter
- **Description:** Builds and maintains the adapter layer behind `integration_connections` so the connected-accounts/gap-mapping UI (PRD §3.4) reads cleanly from mock data today and can swap to a live connection later without a UI rewrite.
- **Input:** `integration_connections.status`, sample or (future) live course/completion data.
- **Output:** A single interface the UI calls regardless of mock/live status.
- **Dependencies:** Depends on 1.4 (seed data) for MVP; **live mode is not built** — see [viability-analysis.md §1](viability-analysis.md) on LinkedIn's gated API access.
- **Documentation:** [LinkedIn Learning Reporting API](https://learn.microsoft.com/en-us/linkedin/learning/reporting/reporting-docs/reporting-api) (reference only — not called in MVP)
- **Complexity:** Moderate.
- **Example invocation:** "Build the adapter for the connected-accounts screen."

### 3.3 Self-Issued Certificate Generator (PDF + QR + Verification Page)
- **Description:** On a passed assessment, generates a certification record with an unguessable verification code, a PDF, and a QR code linking to the public `/verify/{code}` page (PRD §3.6).
- **Input:** Passed `assessment_submissions` row (or completed tier), holder identity, org, competency.
- **Output:** `certifications` row, PDF + QR stored in Supabase Storage, live verification URL.
- **Dependencies:** A PDF-generation library (e.g., `pdf-lib`), a QR-code library (e.g., `qrcode`); Supabase Storage.
- **Documentation:** [pdf-lib](https://pdf-lib.js.org) · [qrcode (npm)](https://www.npmjs.com/package/qrcode) · [Supabase Storage](https://supabase.com/docs/guides/storage)
- **Complexity:** Moderate.
- **Example invocation:** "Generate the certificate for this passed submission."

### 3.4 Future Credly/Accredible Sync Skill *(deferred — do not build yet)*
- **Description:** Would push issued certifications to Credly or Accredible via `external_credential_id` once a paid plan is affordable (PRD §3.6, certification-strategy.md §3). The schema already reserves the field; this skill is the future integration itself.
- **Input:** A `certifications` row with `external_credential_id is null`.
- **Output:** External badge/certificate created, ID written back.
- **Dependencies:** Credly or Accredible API contract (not yet purchased); depends on 3.3.
- **Documentation:** [Credly API](https://www.credly.com/docs/web_service_api) · [Accredible API](https://docs.api.accredible.com/)
- **Complexity:** Moderate.
- **Example invocation:** Not invocable yet — flag `disable-model-invocation: true` until a vendor contract exists, per the CLAUDE.md rule against adding paid services without approval.

### 3.5 Transactional Email Sender
- **Description:** Sends invite emails (§3.1), assessment-graded/certification-expiring notifications (§3.11), and champion nudges (§3.10).
- **Input:** Notification type, recipient, template data.
- **Output:** Sent email + a corresponding `notifications` row.
- **Dependencies:** A transactional email provider (not yet selected in the PRD — flagged there as an implementation decision, e.g. Resend or Postmark, either fits the existing budget).
- **Documentation:** [Resend docs](https://resend.com/docs) (representative choice — confirm actual provider before building)
- **Complexity:** Simple.
- **Example invocation:** "Send the assessment-graded notification for this submission."

### 3.6 Netlify/Supabase MCP-Driven Deploy Skill
- **Description:** Uses the Netlify and Supabase MCP servers (confirmed active in this environment per tech-stack.md §5) to deploy a build and verify it against a preview branch before merging to production.
- **Input:** A git branch/PR ready for preview.
- **Output:** A live preview URL, a preview-branch Supabase instance, and a pass/fail confirmation.
- **Dependencies:** Netlify MCP server, Supabase MCP server (`create_branch`, `apply_migration`); no npm packages.
- **Documentation:** [Netlify MCP server](https://docs.netlify.com/build/build-with-ai/agent-setup-guides/set-up-claude-code-for-netlify/) · [Supabase MCP server](https://supabase.com/docs/guides/ai-tools/mcp)
- **Complexity:** Moderate.
- **Example invocation:** `/preview-deploy` (candidate for `context: fork` since it's a multi-step action best run as a background task).

---

## Category 4: Frontend Component Generation

### 4.1 tRPC-Connected Page Scaffolder
- **Description:** Generates a new Next.js page/component pre-wired to a tRPC procedure via React Query, following the "no Redux" state-management convention in CLAUDE.md/tech-stack.md.
- **Input:** Target route, tRPC procedure name, rough UI intent.
- **Output:** A new page component with loading/error/success states already handled.
- **Dependencies:** tRPC React Query bindings, Tailwind CSS, shadcn/ui.
- **Documentation:** [tRPC React Query integration](https://trpc.io/docs/client/react) · [shadcn/ui](https://ui.shadcn.com)
- **Complexity:** Simple.
- **Example invocation:** "Scaffold the track list page."

### 4.2 Role-Based Track/Course UI Generator
- **Description:** Builds the single-recommended-track view (PRD §3.2/§3.3) — deliberately not a browsable catalog, per the brand's "sanctioned door, not an open catalog" principle in CLAUDE.md §7.
- **Input:** `job_function_id`, associated `learning_tracks`/`courses`.
- **Output:** The track/course screen.
- **Dependencies:** Depends on 4.1.
- **Documentation:** n/a beyond 4.1's stack.
- **Complexity:** Simple.
- **Example invocation:** "Build the recommended-track screen for a new employee."

### 4.3 Assessment Submission Form Builder
- **Description:** Scaffolds the scenario-response submission UI (PRD §3.5), including the asynchronous "grading in progress" state required because grading runs as a background job (see 3.1) rather than a blocking call.
- **Input:** `assessments.scenario_prompt` (rubric intentionally not shown in full — PRD §5.1 note).
- **Output:** A submission form + a polling/subscribing result view.
- **Dependencies:** React Hook Form, Zod; Supabase Realtime (for the polling/subscription pattern) or simple polling.
- **Documentation:** [React Hook Form](https://react-hook-form.com) · [Zod](https://zod.dev) · [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- **Complexity:** Moderate — the async UX matters as much as the mechanics here (Denise's anxiety profile, per CLAUDE.md §7).
- **Example invocation:** "Build the assessment submission screen."

### 4.4 Manager Dashboard Chart Builder
- **Description:** Scaffolds the rollup dashboard (PRD §3.9) — enrollment, completion, certification stats — scoped by RLS to the requesting manager/admin.
- **Input:** `dashboard.orgRollup` tRPC output shape.
- **Output:** A dashboard page with Recharts visualizations.
- **Dependencies:** Recharts; depends on 2.2/2.3 for correct scoping.
- **Documentation:** [Recharts](https://recharts.org)
- **Complexity:** Moderate.
- **Example invocation:** "Build the manager dashboard."

### 4.5 Accessible Component Auditor
- **Description:** Checks generated components against the WCAG 2.1 AA target (PRD §6), leaning on shadcn/ui's Radix-based accessibility defaults rather than starting from scratch.
- **Input:** A component or page to review.
- **Output:** A pass/fail list against common WCAG 2.1 AA criteria (contrast, focus order, labels, keyboard nav).
- **Dependencies:** `axe-core` or equivalent for automated checks; manual review for anything automated tools miss.
- **Documentation:** [WCAG 2.1 quick reference](https://www.w3.org/WAI/WCAG21/quickref/) · [axe-core](https://github.com/dequelabs/axe-core)
- **Complexity:** Moderate.
- **Example invocation:** `/audit-accessibility src/components/AssessmentForm.tsx`

---

## Category 5: Testing and Validation

### 5.1 tRPC Procedure Test Generator
- **Description:** Scaffolds unit/integration tests for a new or changed tRPC procedure, always including a cross-org-isolation negative test case (org A must never read org B's data).
- **Input:** The procedure's input/output schema and its expected RLS scope.
- **Output:** A test file with at least one deny-path test per procedure.
- **Dependencies:** A test runner (e.g., Vitest); depends on 2.3's scoping review as the source of truth for what "correct" looks like.
- **Documentation:** [Vitest](https://vitest.dev)
- **Complexity:** Moderate.
- **Example invocation:** "Write tests for `enrollments.enroll`."

### 5.2 RLS Policy Test Skill
- **Description:** A dedicated, standalone test suite that exercises the database's RLS policies directly (not just through the API layer) — because PRD §4.1/§6 treats multi-tenant isolation as non-negotiable, it gets its own test surface independent of application-layer bugs.
- **Input:** Two or more seeded test orgs with overlapping data shapes.
- **Output:** Pass/fail per table, confirming no row is readable across orgs at the database level.
- **Dependencies:** Depends on 1.2; runs against a Supabase preview branch (via 3.6), never production.
- **Documentation:** [Supabase RLS testing guide](https://supabase.com/docs/guides/database/postgres/row-level-security#testing-policies)
- **Complexity:** Complex.
- **Example invocation:** `/test-rls`

### 5.3 Assessment Grading Regression Tester
- **Description:** Runs a fixed set of sample submissions through the grading pipeline (3.1) and checks the resulting score distribution stays in the healthy 60–85% pass-rate band identified as a guardrail metric in PRD §8 — catches rubric drift or an overly harsh/lenient prompt change.
- **Input:** A labeled sample set (known-good, known-bad, borderline submissions).
- **Output:** Pass-rate report; flags if the distribution drifts outside the healthy band.
- **Dependencies:** Depends on 3.1; the Anthropic API (real calls, so this has a real per-run cost — run deliberately, not on every commit).
- **Documentation:** [Claude API docs](https://platform.claude.com/docs)
- **Complexity:** Complex.
- **Example invocation:** "Run the grading regression suite before we change the rubric."

### 5.4 E2E Pilot Flow Tester
- **Description:** Runs the full pilot journey end-to-end — invite → signup → track assignment → course completion → assessment submission → grading → certificate issuance — as a single automated check, since this is the whole product's value chain (PRD §3.1–§3.6).
- **Input:** A clean test org.
- **Output:** Pass/fail per stage, with the stage that broke clearly identified.
- **Dependencies:** Playwright or similar; depends on every skill in Categories 1–4 already working.
- **Documentation:** [Playwright](https://playwright.dev)
- **Complexity:** Complex.
- **Example invocation:** `/test-pilot-flow`

---

## Category 6: Deployment and Infrastructure

### 6.1 Netlify Deploy & Verify Skill
- **Description:** Complements the bundled `/run`/`/verify` skills by encoding this project's specific launch requirements (env vars, Supabase local instance) once `/run-skill-generator` has been run — see the note at the top of this document.
- **Input:** None beyond a clean checkout.
- **Output:** A running local or preview instance, confirmed reachable.
- **Dependencies:** Same as 3.6.
- **Documentation:** [Netlify docs](https://docs.netlify.com)
- **Complexity:** Simple (once `/run-skill-generator` has recorded the recipe).
- **Example invocation:** `/run` (bundled skill, project-specific behavior comes from the recorded recipe).

### 6.2 Supabase Branch/Migration Preview Skill
- **Description:** Same as 3.6's Supabase half, split out because it's useful independent of a full deploy — e.g., testing a migration in isolation before touching the app.
- **Input:** A pending migration.
- **Output:** A preview branch with the migration applied, `get_advisors` output reviewed for new security/perf issues.
- **Dependencies:** Supabase MCP (`create_branch`, `apply_migration`, `get_advisors`).
- **Documentation:** [Supabase branching](https://supabase.com/docs/guides/deployment/branching)
- **Complexity:** Simple.
- **Example invocation:** "Test this migration on a preview branch before merging."

### 6.3 Cost/Usage Budget Monitor
- **Description:** Checks current Netlify credit usage and Supabase resource usage against the cost table in tech-stack.md §4, and flags before any change would push the project past its pilot budget — directly operationalizes the CLAUDE.md rule "never exceed budget without flagging."
- **Input:** Current usage data (from Netlify/Supabase dashboards or MCP tools where available).
- **Output:** A budget status report; a warning if usage trends toward the next paid tier.
- **Dependencies:** Netlify MCP, Supabase MCP (where usage data is exposed); otherwise manual dashboard check.
- **Documentation:** [Netlify pricing](https://www.netlify.com/pricing/) · [Supabase pricing](https://supabase.com/pricing)
- **Complexity:** Simple.
- **Example invocation:** "Are we close to the Netlify free-tier credit cap?"

### 6.4 CI Pipeline Skill (GitHub Actions)
- **Description:** Scaffolds and maintains the lint/typecheck/test workflow that runs on every PR, per tech-stack.md §4 — no separate CI vendor.
- **Input:** The project's lint/test/typecheck commands.
- **Output:** A `.github/workflows/ci.yml` file.
- **Dependencies:** GitHub Actions; depends on whatever test runner 5.1/5.4 use.
- **Documentation:** [GitHub Actions](https://docs.github.com/en/actions)
- **Complexity:** Simple.
- **Example invocation:** "Set up CI for this repo."

---

## Category 7: Documentation Generation

### 7.1 API/Schema Doc Sync Skill
- **Description:** Compares the actual database schema and tRPC router against PRD §4/§5 and flags drift — e.g., a field added to a migration that was never reflected back in the PRD, or vice versa.
- **Input:** Current schema (via `list_tables`) and router definitions; PRD.md §4–5.
- **Output:** A diff report of undocumented changes.
- **Dependencies:** Supabase MCP (`list_tables`); no external package.
- **Documentation:** n/a (internal consistency check against [PRD.md](PRD.md))
- **Complexity:** Moderate.
- **Example invocation:** "Check if the PRD schema is still accurate."

### 7.2 Competency Map Documentation Generator
- **Description:** Generates a human-readable view of the competency graph (`competency_domains` → `competencies` → `role_competency_map` → `course_competency_map`) for admin/content review — supports the "review the competency map annually" governance practice from certification-strategy.md §3.
- **Input:** Current competency-map data for an org (or global templates).
- **Output:** A readable markdown or HTML summary of the map.
- **Dependencies:** Depends on 1.1's tables existing with real data.
- **Documentation:** n/a (internal) — cross-reference [certification-strategy.md §3](certification-strategy.md).
- **Complexity:** Simple.
- **Example invocation:** "Generate a readable summary of the accounting competency map."

---

## Category 8: Error Handling and Logging

### 8.1 Audit Log Writer
- **Description:** Ensures every admin-mutating procedure (certification revoke, competency/track/course edits, org membership changes) writes a row to `audit_logs` (PRD §3.13/§4.3) — reviews new admin procedures for compliance rather than trusting each one to remember.
- **Input:** A new or changed admin-only tRPC procedure.
- **Output:** Confirmation the procedure writes an audit entry, or a flag if it doesn't.
- **Dependencies:** Depends on 1.1 (`audit_logs` table) and 2.2 (role guards, to identify which procedures qualify as "admin-mutating").
- **Documentation:** n/a (internal) — PRD §4.3.
- **Complexity:** Simple.
- **Example invocation:** "Does `certifications.revoke` write to the audit log?"

### 8.2 Grading Failure/Escalation Handler
- **Description:** Implements and audits the `needs_review` escalation path (PRD §3.5) so a low-confidence or ambiguous AI grading result is never silently treated as a fail — this is a direct product-trust requirement tied to the target user's fear profile (CLAUDE.md §4/§7), not a generic error-handling nicety.
- **Input:** A grading result with a confidence signal below threshold, or a malformed/unparseable model response.
- **Output:** The submission is routed to `needs_review` with a human-reviewable trail, never auto-resolved to `failed`.
- **Dependencies:** Depends on 3.1.
- **Documentation:** n/a (internal) — PRD §3.5, CLAUDE.md §4.
- **Complexity:** Moderate.
- **Example invocation:** "Add the needs-review escalation path to the grading pipeline."

### 8.3 Rate Limiting & Abuse Protection Skill
- **Description:** Implements rate limits specifically flagged in PRD §5: per-user limits on `assessments.submit` (each call is a billed Anthropic API call) and per-IP limits on the public `/verify/{code}` endpoint (unauthenticated, so codes must resist scraping/enumeration).
- **Input:** The endpoint being protected and its abuse risk profile.
- **Output:** Rate-limiting middleware applied, with clear error responses (not silent drops).
- **Dependencies:** Upstash Redis (per tech-stack.md §3) for distributed rate-limit counters once past pilot scale; in-memory limiting acceptable at pilot scale.
- **Documentation:** [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)
- **Complexity:** Moderate.
- **Example invocation:** "Add rate limiting to the assessment submission endpoint."

### 8.4 Structured Error Response Skill
- **Description:** Standardizes tRPC error shapes and server-side logging across all procedures, so the client always gets a consistent, actionable error rather than an ad hoc message per procedure.
- **Input:** A procedure's failure modes.
- **Output:** Consistent `TRPCError` codes/messages, with server-side logs including enough context to debug without exposing internals to the client.
- **Dependencies:** tRPC's built-in error handling; no external package required at this scale.
- **Documentation:** [tRPC error handling](https://trpc.io/docs/server/error-handling)
- **Complexity:** Simple.
- **Example invocation:** "Standardize error handling across the tracks router."

---

## Summary table

| # | Skill | Category | Complexity | Status |
|---|---|---|---|---|
| 1.1 | Supabase Migration Generator | Database | Moderate | Build for MVP |
| 1.2 | RLS Policy Scaffolder | Database | Complex | Build for MVP |
| 1.3 | Org & User Bulk CSV Import | Database | Simple | Build for MVP |
| 1.4 | Mock Integration Seed Data Generator | Database | Simple | Build for MVP |
| 1.5 | Database Index/Query Auditor | Database | Moderate | Build for MVP |
| 2.1 | Supabase Auth Setup | Auth | Moderate | Build for MVP |
| 2.2 | RBAC Role Guard Generator | Auth | Moderate | Build for MVP |
| 2.3 | Multi-Tenant Org-Scoping Reviewer | Auth | Complex | Build for MVP |
| 2.4 | Enterprise SSO/SAML Scaffolder | Auth | Complex | **Deferred** |
| 3.1 | Anthropic API Grading Integration | API | Complex | Build for MVP — core differentiator |
| 3.2 | Mocked LinkedIn Learning Adapter | API | Moderate | Build for MVP (mock only) |
| 3.3 | Self-Issued Certificate Generator | API | Moderate | Build for MVP |
| 3.4 | Credly/Accredible Sync | API | Moderate | **Deferred** |
| 3.5 | Transactional Email Sender | API | Simple | Build for MVP |
| 3.6 | Netlify/Supabase MCP Deploy Skill | API/Infra | Moderate | Build for MVP |
| 4.1 | tRPC-Connected Page Scaffolder | Frontend | Simple | Build for MVP |
| 4.2 | Role-Based Track/Course UI Generator | Frontend | Simple | Build for MVP |
| 4.3 | Assessment Submission Form Builder | Frontend | Moderate | Build for MVP |
| 4.4 | Manager Dashboard Chart Builder | Frontend | Moderate | Build for P1 |
| 4.5 | Accessible Component Auditor | Frontend | Moderate | Build for MVP |
| 5.1 | tRPC Procedure Test Generator | Testing | Moderate | Build for MVP |
| 5.2 | RLS Policy Test Skill | Testing | Complex | Build for MVP |
| 5.3 | Assessment Grading Regression Tester | Testing | Complex | Build for MVP |
| 5.4 | E2E Pilot Flow Tester | Testing | Complex | Build for MVP |
| 6.1 | Netlify Deploy & Verify Skill | Infra | Simple | Build for MVP |
| 6.2 | Supabase Branch/Migration Preview | Infra | Simple | Build for MVP |
| 6.3 | Cost/Usage Budget Monitor | Infra | Simple | Build for MVP |
| 6.4 | CI Pipeline Skill | Infra | Simple | Build for MVP |
| 7.1 | API/Schema Doc Sync Skill | Docs | Moderate | Build for P1 |
| 7.2 | Competency Map Documentation Generator | Docs | Simple | Build for P1 |
| 8.1 | Audit Log Writer | Error handling | Simple | Build for MVP |
| 8.2 | Grading Failure/Escalation Handler | Error handling | Moderate | Build for MVP — trust-critical |
| 8.3 | Rate Limiting & Abuse Protection | Error handling | Moderate | Build for MVP |
| 8.4 | Structured Error Response Skill | Error handling | Simple | Build for MVP |

**Read together with:** [PRD.md](PRD.md) for the features/schema/API these skills implement, [tech-stack.md](tech-stack.md) for the underlying stack choices, and [CLAUDE.md](../CLAUDE.md) for the standing rules (never weaken RLS, never silently auto-fail a grading result, never add a paid integration without flagging cost) that several skills above exist specifically to enforce.
