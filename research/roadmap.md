# OnRamp — Build Roadmap

**Prepared for:** Meg Seidorf & Maritza Herbert
**Date:** 2026-07-24
**Requested via:** `@architecture-agent` — see note on agent assignment below.
**Source:** [research/PRD.md](PRD.md), [research/tech-stack.md](tech-stack.md), [research/viability-analysis.md](viability-analysis.md), [research/skills.md](skills.md), [research/agents.md](agents.md), [CLAUDE.md](../CLAUDE.md).

**A note on how this was produced:** `architecture-agent` is deliberately scoped as a read-only pattern reviewer (no Write tool, no roadmap-authorship responsibility — see its definition in `research/agents.md` and `.claude/agents/architecture-agent.md`). Roadmap authorship spans every domain and needs to be saved to disk, so it was drafted at the main-session level and is now being handed to `architecture-agent` for the review pass it's actually built for: checking the milestone sequencing against the project's established architectural patterns before this is treated as final. Its findings are appended at the bottom once that review completes.

---

## 1. MVP Definition

**MVP = the P0 features from `research/PRD.md` §3, and nothing more.** P1 features (tiered credentials, recertification, manager dashboard, champions/nudges, notifications) are real, planned, and sequenced — but after MVP launch, not inside it.

**The absolute smallest thing that delivers value to Denise:** the full pipeline, end to end, even in its plainest form —

> She logs in, sees one recommended track for her role (not a catalog), completes 2-3 short courses, submits a real scenario response, gets it graded against a rubric (not a quiz), and — if she passes — walks away with a real, verifiable certificate she can put in front of her manager.

That chain is the product. A partial version of it (say, courses without a real assessment, or an assessment without a real certificate) delivers none of the value the PRD's Executive Summary identifies — permission, relevance, and proof are only real once someone has gone through the whole loop. So MVP scope is deliberately the **full pipeline for one job function**, not a wider slice of features half-built.

**In scope for MVP (PRD §3 P0 items):**
- Organization & user onboarding (§3.1)
- Role assignment & role-based learning tracks (§3.2)
- Curated course content per track (§3.3)
- Connected-accounts / gap-mapping screen — **mocked data only** (§3.4)
- Competence-based assessment engine, including the mandatory `needs_review` escalation path (§3.5) — the core differentiator
- Self-issued certificate generation (§3.6)
- Admin content/competency management, internal-tooling fidelity is acceptable (§3.13)

**Explicitly deferred to post-MVP (already decided in PRD §7 — not re-litigated here):**
- P1 features: tiered credentials (§3.7), recertification (§3.8), manager dashboard (§3.9), champions/nudge program (§3.10), notifications (§3.11)
- P2: usage-linked ROI reporting (§3.12)
- Live LinkedIn Learning integration, a broad skills-gap engine, Credly/Accredible, formal accreditation, native mobile app, multi-LMS aggregation, SSO/SAML, billing/payments — all named explicitly in PRD §7 with the research finding that drove each exclusion.

---

## 2. Milestone Structure

Five milestones from Sprint Zero to MVP launch. Durations assume a two-person team (Meg + Maritza) working part-time alongside other responsibilities — treat these as planning estimates, not commitments.

### Milestone 1 — Foundation: Database & Auth
**Duration:** ~2 weeks
**Deliverables:**
- Full schema from PRD §4.3 migrated, with RLS on every tenant-scoped table in the *same* migration it's created in.
- Supabase Auth working: email/password + Google OAuth (pilot phase only — no SSO).
- RBAC role guards (`rbac-role-guard-generator`) proven on at least one smoke-test procedure.
- CI pipeline (lint/typecheck/test) green on every PR; Netlify preview deploys working.

**Agent assignments:**
- `database-agent` — schema, migrations, RLS (owns this milestone)
- `auth-security-agent` — auth flow, role guards
- `infra-devops-agent` — CI pipeline, preview deploy
- `testing-qa-agent` — RLS policy test suite (`rls-policy-tests`)
- `architecture-agent` — pattern review before the milestone is called done

**Dependencies:** Sprint Zero complete (§3 below) — specifically, real Supabase and Netlify projects provisioned and connected.

**Success criteria:** `rls-policy-tests` passes with zero cross-org leaks on every tenant-scoped table; a test user can sign up and log in; CI is green on a trivial PR; `architecture-agent` reports no unresolved findings.

### Milestone 2 — Onboarding & Role-Based Content
**Duration:** ~1.5–2 weeks
**Deliverables:**
- Org creation + bulk CSV invite (§3.1) working end to end.
- Competency-map CRUD (`competency_domains`, `competencies`, `role_competency_map`, `course_competency_map`, `learning_tracks`, `courses`) — internal-tooling fidelity is fine (§3.13).
- One real, curated track (recommend starting with accounting, matching Denise directly) with 2-5 real courses, not placeholder content.
- The connected-accounts/gap-mapping screen, populated with clearly-labeled sample data (§3.4) — never presented as live.

**Agent assignments:**
- `database-agent` — CSV import, seed data
- `integration-agent` — the mocked adapter behind the gap-mapping screen
- `frontend-ux-agent` — onboarding flow, track/course screen, gap-mapping UI
- `documentation-agent` — generates a readable competency-map summary for Meg/Maritza to sanity-check before this milestone closes

**Dependencies:** Milestone 1 complete.

**Success criteria:** a seeded test employee logs in and sees one recommended track with real accounting-specific content, not lorem ipsum; the gap-mapping screen is honestly labeled as demo data; a partial `e2e-pilot-flow-test` run (through course viewing) passes.

### Milestone 3 — Core Differentiator: Assessment & Certification
**Duration:** ~2.5–3 weeks — **the highest-risk, highest-importance milestone; do not compress this one to protect a deadline.**
**Deliverables:**
- At least one real scenario-based assessment, with a written rubric, tied to an actual accounting job task — content quality here depends on Meg's own domain expertise, not just agent output (see Risk Register, item 7).
- Claude API grading integration running as a Netlify Background Function, with `grader_model_version` recorded on every graded submission.
- The `needs_review` escalation path fully implemented — a low-confidence result must never silently become `failed`.
- Self-issued certificate generation: verification code, PDF, QR code, and a public, unauthenticated `/verify/{code}` page.
- A `grading-regression-tests` baseline established against a labeled sample set (known-good, known-bad, borderline).

**Agent assignments:**
- `assessment-certification-agent` — owns this milestone in full
- `frontend-ux-agent` — submission form, "grading in progress" UX, `needs_review` framing (never presented as a failure)
- `error-handling-agent` — audit logging on any admin override of a `needs_review` case
- `testing-qa-agent` — grading regression baseline, submission tests including the cross-org negative case

**Dependencies:** Milestone 2 complete (at least one course/competency to attach an assessment to).

**Success criteria:** a known-good sample submission passes, a known-bad one fails with specific, constructive feedback, and an ambiguous one routes to `needs_review` — never to `failed`; the pass-rate distribution on the labeled sample set lands in the healthy 60-85% band from PRD §8; a real certificate is issued and independently verifiable at its public URL, no login required.

### Milestone 4 — Pilot Readiness: Hardening, Accessibility, Full E2E
**Duration:** ~1.5–2 weeks
**Deliverables:**
- WCAG 2.1 AA pass on every MVP screen (`accessibility-auditor`).
- Rate limiting live on `assessments.submit` and `/api/verify/[code]` (`rate-limit-guard`).
- Full `e2e-pilot-flow-test` green, top to bottom: invite → signup → track → course → assessment → grading → certificate.
- `budget-monitor` confirms actual Netlify/Supabase usage against the `research/tech-stack.md` §4 cost targets.
- A final full-system `architecture-agent` review.

**Agent assignments:**
- `frontend-ux-agent` — accessibility fixes
- `error-handling-agent` — rate limiting
- `testing-qa-agent` — full E2E pass
- `infra-devops-agent` — budget confirmation
- `architecture-agent` — final review

**Dependencies:** Milestones 1-3 complete.

**Success criteria:** `e2e-pilot-flow-test` green end to end; zero WCAG AA critical findings; real usage tracked against (or explicitly flagged versus) the ~$31-45/month pilot target from `research/tech-stack.md`; zero open `architecture-agent` findings.

### Milestone 5 — MVP Launch: Single-Department Pilot
**Duration:** ~1 week to launch, then ongoing tracking against the PRD §8 month-1/month-3 checkpoints.
**Deliverables:**
- A real pilot organization provisioned (not a test/demo org).
- A real employee cohort invited via the bulk CSV path.
- Launch-week success metrics captured from day one (≥50% activation target, PRD §8).
- `documentation-agent` confirms `research/PRD.md` §4-§5 still matches the shipped schema/API.

**Agent assignments:**
- `infra-devops-agent` — production deploy
- `database-agent` — real org provisioning
- `documentation-agent` — final PRD-vs-shipped sync check
- `meta-coordinator` — first PRD §8 metrics check-in

**Dependencies:** Milestone 4 complete, **plus an explicit go-ahead from Meg and Maritza** — this is the point where the product touches a real company's real employees, not a test environment, and that decision isn't the agent architecture's to make on its own.

**Success criteria:** launch-week targets from PRD §8 tracked from day one; zero critical security or cross-org incidents in week one.

---

## 3. Sprint Zero Checklist

What must be true before any feature code gets written. Several of these are **real-world provisioning steps that need Meg's and Maritza's direct action** — accounts, credentials, and small real costs — not something the agent architecture can or should do autonomously. Those are marked explicitly.

**Repository setup**
- [ ] `git init`, initial Next.js (App Router, TypeScript) scaffold, `.gitignore`
- [ ] Branch protection on `main` if using GitHub (recommend requiring CI to pass before merge)

**CI/CD pipeline**
- [ ] `.github/workflows/ci.yml` scaffolded (`ci-pipeline-setup` skill) — lint/typecheck/test, even against a placeholder test initially

**Development environment**
- [ ] Supabase CLI installed locally; local dev server running
- [ ] `.env.example` documenting every variable named in `CLAUDE.md` §6 (names only, no values, per the existing rule)

**Database provisioning — ⚠️ requires Meg's action**
- [ ] A real Supabase project created under Meg's/the team's account — this cannot be done by an agent; it requires an actual Supabase account and a decision to start incurring (even Free-tier) resource usage
- [ ] Netlify site created and linked to the repo — same caveat, requires Meg's Netlify account
- [ ] Both connected so the `netlify-preview-deploy` and `supabase-branch-preview` skills actually target the right resources

**Authentication scaffolding — ⚠️ requires Meg's action for the OAuth piece**
- [ ] Supabase Auth enabled in the project dashboard
- [ ] Google OAuth provider configured — this requires creating a Google Cloud OAuth client, another external credential step outside what any agent can do on its own

**MCP connectivity**
- [ ] Confirm the Supabase MCP server is connected to *this specific* Supabase project (not just generically available)
- [ ] Confirm the Netlify MCP server is connected to *this specific* Netlify site

**Already done, prior to this roadmap:**
- [x] `CLAUDE.md`, `.claude/skills/` (31 skills), `.claude/agents/` (12 agents), `.claude/settings.json` (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH: 2`)

---

## 4. Risk Register

| Risk | Affected milestone(s) | Mitigation |
|---|---|---|
| RLS misconfiguration allows cross-org data leakage | Milestone 1 | `rls-policy-tests` is a blocking gate, not advisory; RLS must ship in the same migration as the table; `architecture-agent` reviews before the milestone is called done |
| LLM grading pipeline produces inconsistent or unreliable results | Milestone 3 | `grading-regression-tests` against a labeled sample set before *and* after any rubric change; `needs_review` absorbs ambiguous cases instead of forcing a binary pass/fail |
| Async grading UX feels broken or too slow | Milestone 3 | PRD §6 target (<60s for 95% of submissions) tracked explicitly; Realtime-based feedback, not silent polling |
| Scope creep into deferred/P1 features before MVP is proven | All milestones | `research/PRD.md` §7's out-of-scope list is a hard gate; `orchestrator` and `architecture-agent` flag any deferred-feature work proposed before Milestone 5 |
| Budget overrun (Supabase backup tier, Netlify credit cap, Anthropic API cost during testing) | Milestones 3-4 | `budget-monitor` run before and after any heavy testing pass; `infra-devops-agent` escalates before crossing a tier threshold, per `CLAUDE.md` §4 |
| Real-world provisioning delay (Supabase/Netlify/Google OAuth accounts) stalls Sprint Zero | Sprint Zero → Milestone 1 | Called out explicitly above as the first action item — not assumed to happen automatically |
| Assessment/rubric content needs real domain expertise, not just AI-generated placeholder scenarios | Milestone 3 | `assessment-certification-agent`'s system prompt already forbids it from deciding rubric content unilaterally — Meg's accounting/finance domain expertise is a required input, not optional |
| Small two-person team has limited review bandwidth for agent-generated code | All milestones | `architecture-agent` and `testing-qa-agent` act as the "second reviewer" the team doesn't otherwise have — still recommend a human skim of P0 code before merge, not full automation |

---

## 5. Launch Checklist

**Security review items**
- [ ] `rls-policy-tests` fully green, zero cross-org leaks (blocking, non-negotiable)
- [ ] `org-scoping-reviewer` pass on every tRPC procedure shipped
- [ ] Secrets/env-var audit — nothing reaches the client bundle
- [ ] Rate limiting confirmed live on `assessments.submit` and `/api/verify/[code]`
- [ ] Audit log coverage confirmed on every admin-mutating procedure

**Performance benchmarks**
- [ ] LCP under 2.5s on authenticated pages (PRD §6)
- [ ] tRPC p95 under 500ms on reads, under 1s on writes (excluding async grading)
- [ ] Assessment grading turnaround under 60s for 95% of submissions

**User testing completed**
- [ ] At least one internal dry run of the full pilot flow, with Meg sanity-checking the accounting assessment content specifically for domain accuracy
- [ ] A manual keyboard-navigation accessibility pass, not just automated-tool-clean

**Documentation ready**
- [ ] `CLAUDE.md` §3 ("Current State") updated to reflect what's actually shipped — it should no longer say "no application code exists yet" by this point
- [ ] `research/PRD.md` §4-§5 confirmed in sync with the shipped schema/API via `documentation-agent`
- [ ] A pilot-facing onboarding communication for the real employee cohort drafted — this doesn't exist yet and isn't covered by any milestone above; flag as a new, separate deliverable before Milestone 5

**Final gate:** explicit go/no-go sign-off from Meg and Maritza before a real employee cohort is invited — this is the moment the product touches real people at a real company, and it stays a human decision regardless of how green the checklist is.

---

## Architecture Agent Review

**Note on how this review was produced:** `.claude/agents/` was created fresh in this session, and Claude Code only detects a *new* agent directory after a restart (existing agents in an already-watched directory reload live; a first-ever directory does not). So `architecture-agent` could not be invoked as a live subagent for this pass. The review below applies its exact defined criteria (per `.claude/agents/architecture-agent.md`) directly, as a stand-in — re-run this section through the real subagent next session to confirm.

| Check | Result | Finding |
|---|---|---|
| 1. RLS-before-data ordering | **Pass** | Milestone 1 (Database & Auth, including RLS) precedes Milestone 2 (onboarding, org/user data seeding). No content or user data is created before RLS is in place. |
| 2. `needs_review` treated as mandatory, not optional | **Pass** | Milestone 3 explicitly lists the escalation path as a deliverable and its success criteria requires an ambiguous submission to route to `needs_review`, "never to `failed`" — matches `CLAUDE.md` §4 exactly. |
| 3. Deferred/out-of-scope items kept out of MVP milestones | **Pass** | No milestone includes live LinkedIn Learning, Credly/Accredible, SSO, or any P1 feature (dashboard, champions, notifications, recertification, tiering). Milestone 2's gap-mapping screen is explicitly scoped to mocked data only, consistent with PRD §3.4/§7. |
| 4. Agent assignments match each agent's documented scope | **Pass, with one minor gap** | Every assignment in Milestones 1-4 maps directly to a skill or responsibility already documented for that agent. **Milestone 5 assigns `infra-devops-agent` a "production deploy,"** but the only deploy skill currently documented for that agent (`netlify-preview-deploy`) is scoped to preview deploys, per `research/skills.md` §6.1/§3.6. There's no separately documented production-deploy procedure. Not a blocking issue for MVP build order, but worth closing before Milestone 5: either extend `netlify-preview-deploy`'s scope to cover promotion-to-production, or document a distinct production-deploy skill before that milestone starts. |
| 5. No gaps in the dependency chain | **Pass** | Each milestone's stated dependency is fully satisfied by the prior milestone's success criteria — e.g., Milestone 3's need for "at least one course/competency to attach an assessment to" is concretely delivered by Milestone 2's success criteria, not just implied. |

**Overall:** the roadmap is architecturally sound as drafted. One real, minor finding (Milestone 5's production-deploy capability isn't a documented skill yet) — recommend addressing it during Milestone 4, not treating it as a launch blocker today.
