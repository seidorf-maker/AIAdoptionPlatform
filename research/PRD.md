# OnRamp — Product Requirements Document

**Prepared for:** Meg Seidorf & Maritza Herbert
**Date:** 2026-07-24
**Status:** Draft — ready for MVP build planning
**Builds on:** [viability-analysis.md](viability-analysis.md), [certification-strategy.md](certification-strategy.md), [tech-stack.md](tech-stack.md), and the avatar/brand work now folded into [CLAUDE.md §7](../CLAUDE.md).

This document is written so a developer with no prior context on this project can read it once and know what to build, in what order, and why. Where a decision traces back to prior research (a competitive risk, a budget constraint, a technical gating issue), the source document is cited inline rather than re-argued.

---

## 1. Executive Summary

**What we're building:** OnRamp is a role-based AI adoption platform for non-technical employees at mid-to-large companies. It routes employees into curated, function-specific AI training (accounting, finance, sales, ops), verifies real competence through scenario-based assessments rather than course-completion tracking, and issues credible certifications employees can point to in performance conversations. It is positioned to sit alongside a company's existing tools (starting with LinkedIn Learning, mocked for MVP — see §7) rather than replace them.

**Primary value proposition:** Most corporate AI training either has no clear starting point for non-technical staff, or issues a completion certificate that proves someone watched a video, not that they can do the job task. OnRamp's core bet, validated against the market research in [certification-strategy.md](certification-strategy.md), is that a **competence-based certification** — a real, job-specific scenario assessment, not a quiz-and-badge — is a defensible differentiator in a market where nearly every comparable product (including LinkedIn Learning's own certificates) issues completion records instead.

**Target user persona (psychographic detail):** Denise Carter, Senior Financial Analyst, Corporate Accounting, at a ~4,200-employee manufacturing company. Avatar summary and brand voice live in [CLAUDE.md §7](../CLAUDE.md); the parts that should drive every product decision in this PRD are:

- **Motivation:** She wants to walk into a leadership meeting and reference a specific way she used AI to solve a real problem — and be noticed for it — without having to become "the tech person."
- **Fear:** That she's quietly becoming obsolete, that colleagues who "just get" AI will pass her by, and that asking a basic question will expose how far behind she feels.
- **Goal:** A credential she can point to before her next performance review — something concrete, sanctioned, and specific to her actual job, not generic "AI 101."
- **Decision bias:** She trusts things that are structured, credentialed, and low-risk. She wants permission and a map before she'll try something new in front of others.

Every P0 feature in §3 exists because it removes a specific piece of Denise's anxiety (permission, relevance, or proof) — features that don't map to one of those three should be treated with suspicion at scope-review time.

**Market sizing (pitch context):** figures marked **[sourced]** come from public data; figures marked **[modeled]** are planning assumptions built on top of sourced inputs, not hard measurements.
- TAM: ~20,868 U.S. companies with 500+ employees **[sourced — 2019 U.S. Census Bureau, most recent specific count found]**; realistic early capture ~1% → **~210 companies [modeled]**.
- The cost of the status quo: 67% of employees already use AI at work, but only 33% of organizations train them on it, and only 18% have formal AI usage/security policies **[sourced — 2026 shadow-AI industry reporting]**. At enterprise L&D seat pricing (~$379.88/user/year for LinkedIn Learning Teams **[sourced]**), a 4,200-employee company spends roughly $1.6M/year on training seats; if ~60% of that isn't converting into applied skill, that's **~$960K/year in underutilized training spend at a single mid-size company [modeled, built on sourced inputs]**.
- Opportunity: OnRamp priced below the $300–500/user/year enterprise LMS band, at **~$96/user/year [modeled]**. At ~210 target companies averaging ~2,000 enrolled employees each: **420,000 seats × $96/year ≈ $40M in annual revenue potential at full capture [modeled build-up, not a Year 1 number]**.
- **One-line version:** *"67% of employees are already using AI at work, but only a third of companies train them on it — that gap costs a single mid-size company like Denise's roughly $960K a year in training spend that never turns into real skill. Multiply that across ~21,000 U.S. companies this size, and it's a multi-billion-dollar problem. OnRamp doesn't ask them to spend more — it makes the spend they've already made actually work."*

---

## 2. User Avatar Deep Dive

*(Condensed from the avatar summary in [CLAUDE.md §7](../CLAUDE.md); this section focuses on what changes in the product, not narrative detail.)*

**Who exactly is this for?** A conscientious, mid-career, non-technical professional in a function like accounting, finance, sales, or ops, at a company large enough to have formal L&D infrastructure and an explicit (if vague) "use AI more" expectation from leadership — but not so equipped that every employee already has a clear, role-specific AI onboarding path.

**Current painful workflow:**
1. Hears leadership say "AI is a priority" in an all-hands, with no accompanying guidance.
2. Sees a peer casually reference using AI to save real time on a task.
3. Searches for training on her own — finds generic AI courses (including on platforms the company already pays for) that never map to her actual job.
4. Either does nothing (avoids the risk of doing something "unapproved") or self-teaches inconsistently outside work hours, with no way to prove she did it.
5. Gets asked directly by leadership how her team is using AI, and has no concrete, credentialed answer.

**What success looks like for her:** A sanctioned, low-effort entry point specific to her role; a guided first attempt that produces a usable result in minutes, not hours; a real certification — not a participation badge — that she earns by demonstrating she can actually do a job-relevant AI-assisted task; and a visible moment (a leadership meeting, a performance review) where that credential changes how she's perceived.

**What would make her tell a colleague about this product:** Not the credential itself — the moment it *worked in a room*. Per her diary's "after" entry, the trigger for advocacy is a specific instance of using an OnRamp-trained workflow, having a leader's reaction visibly shift, and a peer independently noticing and validating it ("Priya caught my eye... mouthed 'nice'"). **Product implication:** the certification and its underlying skill need to be genuinely usable in a real meeting/deliverable within the first one to two modules — a credential that only pays off after a long program will miss this trigger entirely.

---

## 3. Feature Specification

Priority key: **P0** = MVP-critical (pilot cannot launch without it) · **P1** = important, targeted for the pilot-to-rollout window · **P2** = nice-to-have / explicitly deferred (see §7 for why).

### 3.1 Organization & user onboarding — **P0**

> As an OnRamp admin, I want to create an organization and invite its employees, so that a pilot company can start using the platform without manual data entry per user.

- **Acceptance criteria:**
  - An org record can be created with name, industry, and size tier.
  - Admin can bulk-invite users via CSV (email, name, job function) or individual invite.
  - Invited users receive an email with a signup link scoped to their org.
  - A user cannot see or query data belonging to another organization under any circumstance (see §4 multi-tenancy).
- **Technical notes/dependencies:** Supabase Auth (email/password + Google OAuth for pilot; SAML SSO explicitly deferred, see §7 and [tech-stack.md §2](tech-stack.md)). Row Level Security policies must exist before any org data is seeded — retrofitting RLS after real data exists is a named risk in [tech-stack.md §6](tech-stack.md).

### 3.2 Role assignment & role-based learning tracks — **P0**

> As an employee, I want to be assigned a track specific to my job function, so that I never have to guess which of many available courses actually applies to me.

- **Acceptance criteria:**
  - Every user has exactly one primary job function at a time.
  - On first login, the user sees a single recommended track for their function (not a full catalog to browse), consistent with the "sanctioned door, not an open catalog" brand promise.
  - Admins can create/edit job functions and the track(s) associated with each, scoped to their org.
- **Technical notes/dependencies:** `job_functions`, `learning_tracks` tables (§4). A small set of global template tracks (accounting, finance, sales, ops) ships pre-built; orgs can clone and customize.

### 3.3 Curated course content per track — **P0**

> As an employee, I want each track to contain a short, specific set of courses/modules, so that I don't face "40 courses, which do I take."

- **Acceptance criteria:**
  - Each track lists 2–5 courses/modules, each tagged to the competency it builds toward.
  - Course records store a `source` (`internal` | `linkedin_learning` | `other`) and a `status` (`mocked` | `live`) — **for MVP, all `linkedin_learning`-sourced courses are `status = mocked`**, per the LinkedIn Learning API access-gating finding in [viability-analysis.md §1](viability-analysis.md). This is a structural field, not a placeholder — the schema must support both states cleanly so no migration is needed when/if live access is obtained.
- **Technical notes/dependencies:** `courses`, `course_competency_map` tables. No live external API call required for MVP.

### 3.4 Connected-accounts / gap-mapping screen (mocked) — **P0 for the demo/pilot UI, P2 for a live engine**

> As an employee, I want to see which of my role's required skills I already have covered (via connected accounts) and which are still missing, so that I don't waste time re-doing training I've already completed.

- **Acceptance criteria:**
  - UI matches the wireframe in §4.4a below: role, connected-account status, a skill-gap card showing "already covered by" vs. "still missing."
  - For MVP, this screen is populated from **sample/seeded data**, explicitly labeled in the UI (or via demo framing, not a live OAuth flow) as illustrative — never presented as if it reflects a real, live LinkedIn Learning connection. This directly addresses the credibility risk flagged in [viability-analysis.md §4](viability-analysis.md) ("if the gap-mapping engine is demoed as if it's a live integration when it's actually mocked sample data, that's a credibility risk").
  - `integration_connections` table (see §4) records connection `status` per org/provider (`mocked` | `pending` | `connected` | `error`), so the mock-to-live transition is a data change, not a re-architecture.
- **Technical notes/dependencies:** No live third-party API integration in MVP. A real gap-mapping engine (semantic skill-matching via pgvector, per [tech-stack.md §3](tech-stack.md)) is explicitly **out of scope for MVP** — see §7.

### 3.5 Competence-based assessment engine — **P0 — this is the core differentiator**

> As an employee, I want to submit a real job-relevant task (not a multiple-choice quiz) and get evaluated against a defined standard, so that my certification actually proves I can do something, not just that I watched a video.

- **Acceptance criteria:**
  - Each competency has at least one associated assessment with: a scenario prompt (e.g., "here's a messy variance report — use AI to help clean it up and flag anything that needs manual review"), a rubric (structured criteria, stored as `jsonb`), and a passing threshold.
  - User submits a text/file response; the system calls the Anthropic API to grade the submission against the stored rubric, returning a score and structured feedback.
  - Every AI-graded submission has a `status`: `pending` → `graded` → (`passed` | `failed` | `needs_review`). `needs_review` is the escalation path for low-confidence or borderline AI grading — **the system must never silently auto-fail someone without a human-reviewable trail**, since this directly touches Denise's core fear of public failure/embarrassment.
  - Because Netlify's standard function timeout is too short to safely run an LLM grading call synchronously ([tech-stack.md §4](tech-stack.md)), grading runs via a background job (`grading_jobs` pattern) and the UI shows a clear "grading in progress" state rather than blocking or timing out.
  - A failed attempt gives specific, constructive feedback tied to the rubric and allows resubmission — consistent with the certification-strategy.md finding that "plan for exceptions" (resubmission/appeals path) is a mark of a credible program, not an afterthought.
- **Technical notes/dependencies:** Anthropic API (Claude) called from a Netlify Background Function; `assessments`, `assessment_submissions` tables. This is the single most important feature in the MVP — see [certification-strategy.md §2](certification-strategy.md) for why completion-only tracking is not an acceptable substitute.

### 3.6 Certificate issuance (self-issued, MVP) — **P0**

> As an employee who passes an assessment, I want a real, shareable, verifiable certificate, so that I have something concrete to put in front of a manager or on LinkedIn.

- **Acceptance criteria:**
  - On a passed assessment (or a full track's worth of passed assessments, per the competency map), a certification record is created with a unique, unguessable verification code.
  - A public, unauthenticated verification page exists at a stable URL (e.g., `/verify/{code}`) showing the certification's holder name, org, competency, and issue date — no login required, so anyone (a hiring manager, a colleague) can verify it.
  - A downloadable PDF and a QR code linking to the verification page are generated and stored.
  - Certification records store an `external_credential_id` field (nullable) reserved for a future Credly/Accredible sync — **no third-party credentialing vendor is integrated in MVP**, per the buy-vs-build cost tradeoff in [certification-strategy.md §4](certification-strategy.md) and the budget constraint in [tech-stack.md §4](tech-stack.md).
- **Technical notes/dependencies:** Supabase Storage for PDF/QR assets; `certifications` table is the permanent source of truth regardless of any future vendor integration (see [tech-stack.md §6](tech-stack.md), integration pain point on vendor lock-in).

### 3.7 Tiered credential pathway — **P1**

> As an employee, I want a foundational → practitioner → advanced progression within my track, so that earning one certification gives me a reason to come back rather than a one-and-done credential.

- **Acceptance criteria:**
  - Certifications carry a `tier` field; a higher tier cannot be issued unless the prerequisite lower tier is already active for that user.
  - Track/competency map supports tiering without a schema change per new tier added.
- **Technical notes/dependencies:** Enforced at the application layer with a DB constraint check on issuance; depends on §3.5 and §3.6 existing first.

### 3.8 Recertification / renewal — **P1**

> As an org admin, I want certifications to expire and require renewal on a defined cycle, so that the credential stays meaningful as AI tools change.

- **Acceptance criteria:**
  - `certifications.expires_at` is set on issuance based on a configurable renewal period (default 12–18 months).
  - Users approaching expiry are notified (see §3.11) with a path to re-assess.
- **Technical notes/dependencies:** Depends on §3.5 (reassessment reuses the same assessment engine) and §3.11 (notifications).

### 3.9 Manager/leadership dashboard — **P1**

> As a manager or org admin, I want a rollup view of my team's enrollment, completion, and certification status, so that I can report progress without asking each employee individually.

- **Acceptance criteria:**
  - Dashboard shows, per team/org: enrollment count, completion rate, certifications issued, and (once §3.4 has live data) utilization change over time.
  - Data is scoped by RLS to the manager's own team / the admin's own org — never cross-org, never below the requesting user's own management scope for a manager role.
- **Technical notes/dependencies:** Read-heavy aggregate queries; indexing strategy in §4 accounts for this.

### 3.10 Champions / nudge program — **P1**

> As an org admin, I want to designate peer "champions" per department and send periodic role-relevant prompts, so that adoption is reinforced by habit, not just a one-time training push.

- **Acceptance criteria:**
  - Admin can flag specific users as champions for a department.
  - A basic scheduled nudge (email or in-app) can be configured per track (e.g., "try this AI workflow this week").
- **Technical notes/dependencies:** `champions` table; notification infrastructure shared with §3.11. Full-featured version explicitly deferred beyond a basic version — see §7.

### 3.11 Notifications — **P1**

> As a user, I want to be notified about assessment results, certification expiry, and nudges, so that I don't have to actively check the platform to stay current.

- **Acceptance criteria:** In-app notification list + email for high-importance events (assessment graded, certification issued/expiring). No SMS in MVP.
- **Technical notes/dependencies:** `notifications` table; email delivery via a transactional email provider (not yet selected — flag as an implementation decision, not a research gap, since any standard provider, e.g. Resend or Postmark, fits the existing budget/stack without further research).

### 3.12 Usage-linked ROI reporting — **P2**

> As an org sponsor, I want to see AI tool license utilization change alongside OnRamp activity, so that I can justify the program's cost against existing AI/LMS spend.

- **Acceptance criteria (future):** Correlate OnRamp certification activity with org-reported AI tool usage data.
- **Technical notes/dependencies:** Requires a data source for AI tool utilization that does not exist in MVP scope (would require its own integration research) — explicitly deferred, see §7.

### 3.13 Admin content/competency management — **P0**

> As an OnRamp admin (or, later, an org's own L&D admin), I want to define competency domains, map them to roles, and curate courses against them, so that the platform's core "role → gap → course" logic has real data behind it.

- **Acceptance criteria:**
  - CRUD interface (internal/admin-only, not necessarily polished for external admins in MVP) for `competency_domains`, `competencies`, `role_competency_map`, `learning_tracks`, `courses`, `course_competency_map`.
  - Changes are versioned enough to support the "review the competency map annually" governance practice recommended in [certification-strategy.md §3](certification-strategy.md) — at minimum, an `updated_at` and `updated_by` on each record, feeding the `audit_logs` table.
- **Technical notes/dependencies:** This is internal tooling, not employee-facing — can be lower-fidelity UI than §3.2–3.6, but the underlying data model must be correct from day one since every other feature depends on it.

---

## 4. Database Schema

**Primary store:** Supabase (Postgres), per [tech-stack.md §3](tech-stack.md). All identifiers are `uuid` (`gen_random_uuid()` default) unless noted. All tables include `created_at timestamptz not null default now()`; mutable tables also include `updated_at timestamptz not null default now()`.

### 4.1 Multi-tenancy architecture

Every tenant-scoped table carries an `org_id uuid references organizations(id)` column. **Row Level Security (RLS) is enabled on every tenant-scoped table**, with policies keyed off a `org_members` lookup rather than trusting any client-supplied org ID:

```sql
-- Pattern applied to every tenant-scoped table:
create policy "org_isolation_select" on <table>
  for select using (
    org_id in (
      select org_id from org_members where auth_user_id = auth.uid()
    )
  );
-- equivalent insert/update/delete policies, plus a role check
-- (admin/manager/employee) layered on top where the operation requires it
```

A small number of tables (`job_functions`, `learning_tracks`, `courses`, `competency_domains`, `competencies` when acting as **global templates**) allow `org_id is null` to represent OnRamp-provided defaults that any org can clone — RLS policies must explicitly allow `select` on `org_id is null` rows in addition to the user's own org rows, but never allow `insert`/`update`/`delete` on null-org rows from a non-OnRamp-internal role.

### 4.2 Entity-relationship overview

```
organizations 1───* org_members *───1 auth.users (Supabase-managed)
organizations 1───* job_functions
job_functions 1───* learning_tracks
learning_tracks 1───* courses
competency_domains 1───* competencies
competencies *───* job_functions        (role_competency_map)
competencies *───* courses              (course_competency_map)
org_members 1───* enrollments *───1 learning_tracks
org_members 1───* course_completions *───1 courses
competencies 1───* assessments
assessments 1───* assessment_submissions *───1 org_members
org_members 1───* certifications
organizations 1───* integration_connections
organizations 1───* champions *───1 org_members
org_members 1───* notifications
organizations 1───* audit_logs
```

### 4.3 Table definitions

**organizations**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| name | text, not null | |
| slug | text, unique, not null | URL-safe identifier |
| industry | text | |
| size_tier | text | enum-like: `'<500'`, `'500-2000'`, `'2000-5000'`, `'5000+'` |
| subscription_status | text | `'pilot'`, `'active'`, `'paused'`, `'churned'` — default `'pilot'` |
| sso_enabled | boolean, not null, default false | deferred feature flag, see §7 |

**org_members** (the app-level user profile, one per person per org)
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_id | uuid, FK → organizations, not null | |
| auth_user_id | uuid, FK → auth.users, not null | Supabase-managed identity |
| email | text, not null | validated format at app layer + DB check constraint |
| full_name | text, not null | |
| org_role | text, not null | `'employee'` \| `'manager'` \| `'admin'` |
| job_function_id | uuid, FK → job_functions, nullable | nullable until onboarding assigns one |
| manager_id | uuid, FK → org_members, nullable | self-referential, for §3.9 scoping |
| status | text, not null, default `'invited'` | `'invited'` \| `'active'` \| `'deactivated'` |
| unique (org_id, email) | | prevents duplicate invites within an org |

**job_functions**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_id | uuid, FK → organizations, nullable | null = global template |
| name | text, not null | e.g. "Senior Financial Analyst" |
| department | text | e.g. "Accounting" |

**competency_domains**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_id | uuid, FK → organizations, nullable | null = global template |
| name | text, not null | 3–6 domains per competency-map best practice ([certification-strategy.md §3](certification-strategy.md)) |
| description | text | |

**competencies**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| domain_id | uuid, FK → competency_domains, not null | |
| name | text, not null | concrete, observable (not "understands AI") |
| proficiency_description | text, not null | the "can do X in scenario Y" statement |

**role_competency_map** (many-to-many)
| Field | Type | Notes |
|---|---|---|
| job_function_id | uuid, FK → job_functions | |
| competency_id | uuid, FK → competencies | |
| primary key (job_function_id, competency_id) | | |

**learning_tracks**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_id | uuid, FK → organizations, nullable | null = global template |
| job_function_id | uuid, FK → job_functions, not null | |
| title | text, not null | |
| status | text, not null, default `'active'` | `'draft'` \| `'active'` \| `'archived'` |

**courses**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| track_id | uuid, FK → learning_tracks, not null | |
| title | text, not null | |
| source | text, not null | `'internal'` \| `'linkedin_learning'` \| `'other'` |
| status | text, not null | `'mocked'` \| `'live'` — see §3.3 |
| external_url | text, nullable | |
| duration_minutes | integer, nullable | |

**course_competency_map** (many-to-many)
| Field | Type | Notes |
|---|---|---|
| course_id | uuid, FK → courses | |
| competency_id | uuid, FK → competencies | |
| primary key (course_id, competency_id) | | |

**enrollments**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_member_id | uuid, FK → org_members, not null | |
| track_id | uuid, FK → learning_tracks, not null | |
| status | text, not null, default `'enrolled'` | `'enrolled'` \| `'in_progress'` \| `'completed'` |
| started_at | timestamptz | |
| completed_at | timestamptz, nullable | |
| unique (org_member_id, track_id) | | |

**course_completions**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_member_id | uuid, FK → org_members, not null | |
| course_id | uuid, FK → courses, not null | |
| completed_at | timestamptz, not null | |
| source_data | jsonb | raw data from source if `live`; empty/sample if `mocked` |
| unique (org_member_id, course_id) | | |

**assessments**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| competency_id | uuid, FK → competencies, not null | |
| title | text, not null | |
| scenario_prompt | text, not null | |
| rubric | jsonb, not null | structured grading criteria |
| passing_threshold | numeric, not null | 0–100, check constraint enforced |
| version | integer, not null, default 1 | supports the "review annually" governance practice |

**assessment_submissions**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| assessment_id | uuid, FK → assessments, not null | |
| org_member_id | uuid, FK → org_members, not null | |
| submission_text | text | |
| submission_file_url | text, nullable | Supabase Storage reference |
| ai_grading_result | jsonb, nullable | structured rubric feedback |
| score | numeric, nullable | |
| status | text, not null, default `'pending'` | `'pending'` \| `'graded'` \| `'passed'` \| `'failed'` \| `'needs_review'` |
| grader_model_version | text, nullable | for auditability of AI-graded decisions |
| graded_at | timestamptz, nullable | |

**certifications**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_member_id | uuid, FK → org_members, not null | |
| org_id | uuid, FK → organizations, not null | denormalized for RLS simplicity/performance |
| competency_domain_id | uuid, FK → competency_domains, not null | |
| tier | text, not null | `'foundational'` \| `'practitioner'` \| `'advanced'` |
| verification_code | text, unique, not null | unguessable (nanoid/uuid), public verification key |
| status | text, not null, default `'active'` | `'active'` \| `'expired'` \| `'revoked'` |
| issued_at | timestamptz, not null | |
| expires_at | timestamptz, nullable | see §3.8 |
| external_credential_id | text, nullable | reserved for future Credly/Accredible sync, see §3.6 |

**integration_connections**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_id | uuid, FK → organizations, not null | |
| provider | text, not null | `'linkedin_learning'` \| `'internal_lms'` \| `'credly'` \| `'accredible'` |
| status | text, not null, default `'mocked'` | `'mocked'` \| `'pending'` \| `'connected'` \| `'error'` |
| credentials_encrypted | text, nullable | never store plaintext secrets; encrypted at rest, decrypted only server-side |
| connected_at | timestamptz, nullable | |

**champions**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_id | uuid, FK → organizations, not null | |
| org_member_id | uuid, FK → org_members, not null | |
| department | text | |
| appointed_at | timestamptz, not null | |

**notifications**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_member_id | uuid, FK → org_members, not null | |
| type | text, not null | e.g. `'assessment_graded'`, `'certification_expiring'`, `'nudge'` |
| payload | jsonb | |
| read_at | timestamptz, nullable | |

**audit_logs**
| Field | Type | Notes |
|---|---|---|
| id | uuid, PK | |
| org_id | uuid, FK → organizations, not null | |
| actor_org_member_id | uuid, FK → org_members, nullable | null = system-initiated |
| action | text, not null | e.g. `'competency_updated'`, `'certification_revoked'` |
| target_type | text, not null | |
| target_id | uuid, not null | |
| metadata | jsonb | |

### 4.4 Indexing strategy

- Every FK column gets a standard btree index (Postgres does not auto-index FKs).
- Composite index `(org_id, status)` on `org_members`, `learning_tracks`, `courses`, `certifications` — the dashboard queries in §3.9 filter by org and status together constantly.
- Composite index `(org_member_id, status)` on `assessment_submissions` — the most common query pattern is "this user's pending/graded submissions."
- Unique index on `certifications.verification_code` — this is the lookup key for the unauthenticated public verification page (§3.6) and must be fast and collision-proof.
- Composite index `(org_member_id, track_id)` on `enrollments` (already implied by the `unique` constraint above, which Postgres backs with an index automatically).
- `gin` index on `assessments.rubric` and `assessment_submissions.ai_grading_result` only if/when the app needs to query inside those jsonb blobs (not needed at MVP scale — flag as a future addition, not a day-one requirement).

### 4.5 Data validation rules

- Email format validated both client-side (Zod) and via a Postgres `check` constraint on `org_members.email`.
- `assessments.passing_threshold` constrained `between 0 and 100`.
- `certifications.tier` progression is enforced at the **application layer** (tRPC procedure), not the DB, because it requires checking the user's existing certifications before issuance — document this explicitly so it isn't assumed to be a DB constraint during implementation.
- `integration_connections.credentials_encrypted` must never be readable via any client-exposed query — enforce via RLS restricting `select` on that column to service-role-only contexts, not just "authenticated org admin."
- All `jsonb` rubric/grading fields should validate against a shared Zod schema at the application boundary before being written, even though Postgres itself won't enforce internal jsonb structure.

---

## 5. API Specification

Per [tech-stack.md §2](tech-stack.md): **tRPC** for all internal client↔server calls (type-safe, no separate schema to maintain), **REST route handlers** only for endpoints a third party or public visitor calls into.

### 5.1 tRPC procedures (internal, authenticated app)

| Router.Procedure | Description | Auth requirement | Rate limit note |
|---|---|---|---|
| `auth.getSession` | Current user + org context | Authenticated | Standard |
| `org.create` | Create a new organization (OnRamp-internal use during pilot setup) | OnRamp internal admin only | Low volume, no special limit |
| `org.inviteMembers` | Bulk or single invite | Org admin | Rate-limited per org (e.g., max N invites/hour) to prevent invite-spam abuse |
| `orgMembers.list` | List members of caller's org | Org admin/manager (scoped) | Standard |
| `orgMembers.updateJobFunction` | Assign/change a member's role/function | Org admin, or self on first onboarding | Standard |
| `jobFunctions.list` / `create` / `update` | Manage job functions | Admin (org-scoped or OnRamp-internal for global templates) | Standard |
| `competencyDomains.*`, `competencies.*` | CRUD for competency map (§3.13) | Admin | Standard |
| `tracks.list` | Tracks available to caller's job function | Authenticated (any org member) | Standard |
| `tracks.create` / `update` | Manage tracks | Admin | Standard |
| `courses.list` | Courses within a track, including `source`/`status` | Authenticated | Standard |
| `courses.create` / `update` | Manage courses | Admin | Standard |
| `enrollments.enroll` | Enroll self in a track | Authenticated | Standard |
| `enrollments.myProgress` | Caller's own enrollment/completion status | Authenticated (self only) | Standard |
| `assessments.get` | Fetch an assessment's prompt/rubric (rubric visibility to the *submitting* user may be partial — see note below) | Authenticated | Standard |
| `assessments.submit` | Submit a response for grading | Authenticated | **Rate-limited per user** (e.g., max N submissions/hour) — this is the endpoint that triggers a billed Anthropic API call, so abuse directly costs money |
| `assessments.mySubmissions` | Caller's own submission history/status | Authenticated (self only) | Standard |
| `assessments.review` (admin override) | Human review/override of a `needs_review` submission | Admin | Standard |
| `certifications.myCertifications` | Caller's own issued certifications | Authenticated (self only) | Standard |
| `certifications.revoke` | Admin revokes a certification (governance path per §3.13) | Admin | Standard, but every call writes to `audit_logs` |
| `integrationConnections.status` | Current mock/live status per provider for caller's org | Org admin | Standard |
| `dashboard.orgRollup` | Manager/admin dashboard aggregates (§3.9) | Manager (own team) / Admin (own org) | Standard, but cache aggressively — this is the most expensive read query in the app |
| `champions.list` / `assign` | §3.10 | Admin | Standard |
| `notifications.list` / `markRead` | §3.11 | Authenticated (self only) | Standard |

**Note on `assessments.get`:** exposing the full rubric to the user before submission risks turning the assessment into "answer to the rubric" rather than a genuine competence check. Recommend exposing the scenario prompt in full, but only a summary of what's being evaluated (not the literal scoring rubric) until after grading — a product decision worth confirming with the team building the actual rubric content, not a purely technical one.

### 5.2 REST endpoints (external-facing / webhooks)

| Endpoint | Method | Description | Auth | Rate limit note |
|---|---|---|---|---|
| `/api/verify/[code]` | GET | Public certificate verification page data (§3.6) | **None — intentionally public** | Rate-limit by IP to prevent scraping/enumeration of verification codes; codes must be unguessable (not sequential) as the primary defense |
| `/api/webhooks/credly` | POST | Future: receive issuance confirmation from Credly (not active in MVP) | Webhook signature verification | N/A until built |
| `/api/webhooks/accredible` | POST | Future: same, for Accredible | Webhook signature verification | N/A until built |
| `/api/grading/callback` | POST | Internal: Background Function reports grading completion back to the app | Service-role/internal secret only, never client-callable | N/A (internal) |

### 5.3 Authentication summary

- **Public, unauthenticated:** only the certificate verification endpoint (§5.2). Everything else requires a valid Supabase session.
- **Authenticated, self-scoped:** most employee-facing procedures — a user can only read/act on their own submissions, certifications, notifications (enforced by RLS, not just application logic, per §4.1).
- **Org admin / manager scoped:** dashboard, invites, competency/track/course management, certification revocation — enforced by `org_members.org_role` checks layered on top of RLS.
- **OnRamp-internal admin:** creating new organizations and editing global template content (`org_id is null` rows) — a role tier above org admin, not exposed to client orgs at all in MVP.

---

## 6. Non-Functional Requirements

### Performance targets
- Page load: Largest Contentful Paint under 2.5s on a standard broadband connection for all authenticated app pages (Next.js SSR + Netlify's CDN should make this comfortably achievable at MVP scale).
- tRPC procedure response time: p95 under 500ms for all read procedures; write procedures (enroll, submit) under 1s excluding the async grading step.
- Assessment grading turnaround: since grading runs as a Netlify Background Function (§3.5), target **under 60 seconds for 95% of submissions**, with the UI clearly communicating "grading in progress" rather than appearing frozen — this is a UX requirement as much as a performance one, directly tied to Denise's anxiety profile (an unexplained wait reads as something having gone wrong).

### Security requirements
- **Multi-tenant isolation via RLS is non-negotiable** — no query path, including admin tooling, should ever be able to read cross-org data without an explicit, audited OnRamp-internal-admin action.
- Secrets (`integration_connections.credentials_encrypted`, Anthropic API keys, service-role keys) never reach the client bundle; all third-party API calls happen server-side.
- All admin actions that change certifications, competency maps, or org membership are written to `audit_logs` — this operationalizes the "documented governance" credibility requirement from [certification-strategy.md §3](certification-strategy.md).
- Standard input validation (Zod) on every mutation, both client and server side (never trust client-side validation alone).
- Rate limiting on the assessment submission endpoint and the public verification endpoint specifically (§5), since both have real abuse/cost implications.

### Accessibility standards
- **WCAG 2.1 AA** as the target standard for all employee-facing screens. This is not just good practice here — enterprise procurement processes for a B2B workplace tool commonly request a VPAT or equivalent accessibility attestation, and this is cheaper to build in from the start than retrofit. The chosen UI library (Radix primitives via shadcn/ui, per [tech-stack.md §1](tech-stack.md)) is accessible by default, which materially reduces the cost of hitting this target.

### Mobile responsiveness requirements
- **Responsive web, not a native app**, per the explicit MVP decision in [tech-stack.md §1](tech-stack.md) (React Native deferred — no validated mobile-first use case). All screens must be usable on a tablet-width browser at minimum.
- Primary design target remains desktop/laptop, consistent with Denise's actual usage pattern in the diary ("at my desk during lunch") — phone-width layouts should degrade gracefully (readable, usable) rather than being a first-class design target for MVP.

---

## 7. Out of Scope

Explicitly **not** being built in MVP, with the research finding that drives each exclusion:

| Excluded from MVP | Why |
|---|---|
| **Live LinkedIn Learning API integration** | Access is not self-serve (Partner Program or client-provisioned keys only), and the documented API may not expose skill-level metadata at all — [viability-analysis.md §1](viability-analysis.md). Schema supports it (`mocked`/`live` status fields); the live connection itself is not built. |
| **General/broad skills-gap intelligence engine** | This category is already contested by well-resourced incumbents (Cornerstone Skills Engine, Disprz, WorkRamp) — [viability-analysis.md §2](viability-analysis.md). OnRamp stays narrow: AI-specific competencies only, not a general skills graph. |
| **Third-party credentialing platform integration (Credly/Accredible)** | Enterprise, quote-based pricing almost certainly exceeds pilot budget — [certification-strategy.md §3](certification-strategy.md) and [tech-stack.md §4](tech-stack.md). MVP uses a self-issued, verifiable certificate; the schema reserves a field for future sync. |
| **Formal third-party accreditation (e.g., NCCA)** | Not required for legal issuance, and legitimacy for an internal corporate credential comes from client-side executive sponsorship, not external accreditation — [certification-strategy.md §3](certification-strategy.md). |
| **Native mobile app (React Native)** | No validated mobile-first use case; the persona's actual usage pattern is desktop-at-work — [tech-stack.md §1](tech-stack.md). |
| **SSO/SAML** | Deferred to the company-wide rollout phase, not the single-department pilot; also has unresolved pricing ambiguity on Supabase's side worth confirming before committing — [tech-stack.md §2](tech-stack.md). |
| **Multi-LMS certificate aggregation beyond one mocked provider** | Each additional LMS integration multiplies the same access-gating problem found for LinkedIn Learning — [viability-analysis.md §3](viability-analysis.md). |
| **Custom AI model training/hosting** | The product calls a hosted LLM API (Anthropic) for grading; there is no scoped need for custom model training anywhere in this PRD — [tech-stack.md §2](tech-stack.md). |
| **Technical/developer-focused AI training tracks** | Explicitly a non-goal from the original product concept — this product is for non-technical staff. |
| **Gamified public leaderboards** | Conflicts directly with Denise's fear of public exposure/embarrassment — a structural anti-goal, not just an unbuilt feature. |
| **Full usage-linked ROI reporting (§3.12)** | Requires an AI-tool-utilization data source not yet defined or integrated — real research gap, not just a build-time deferral. |
| **Billing/payments system** | Not required for a single-org pilot; becomes necessary only when productizing beyond the first client relationship. |

### Future considerations for v2
- Live LinkedIn Learning integration (contingent on the Partner Program conversation recommended in [viability-analysis.md §4](viability-analysis.md)).
- Real semantic gap-mapping engine using pgvector over course content ([tech-stack.md §3](tech-stack.md)).
- Credly/Accredible sync once revenue justifies the cost (schema already supports it via `external_credential_id`).
- SSO/SAML for enterprise rollout.
- Full champions/nudge program with scheduling and engagement analytics.
- Usage-linked ROI dashboard, once an AI-tool-utilization data source is identified.
- Native mobile companion app, if usage data validates real demand for it.

---

## 8. Success Metrics

North-star framing, consistent with the core bet in §1: **certifications issued should represent real, verified competence** — so "certifications issued" alone is a vanity metric unless paired with pass-rate and time-to-value data that shows the assessment is doing its job (neither too easy to be meaningless, nor so punitive it recreates the exact anxiety the product exists to solve).

| Timeframe | Target | Why this target, this early |
|---|---|---|
| **Launch week** | ≥50% of invited pilot employees complete signup and log in at least once | Tests whether the "sanctioned door" framing and onboarding flow (§3.1–3.2) actually lowers the activation barrier described in Denise's diary — a low number here means the permission/relevance message isn't landing, not a downstream problem. |
| **Launch week** | 0 cross-org data leaks; 0 critical security findings in a pre-launch review | Non-negotiable given the multi-tenant architecture in §4 — this is a gate, not a soft target. |
| **Month 1** | ≥60% enrollment→completion rate on the first assigned track | Matches the original PRD's target (vs. a typical <20% for generic LMS content) — validates that role-specific, short tracks (§3.2–3.3) are actually more engaging than generic training. |
| **Month 1** | ≥1 certification issued per active user | Validates the full pipeline end-to-end: enrollment → course completion → assessment submission → AI grading → issuance (§3.2–3.6) actually works for a real cohort, not just in testing. |
| **Month 1** | Assessment pass rate on first attempt in a healthy band (roughly 60–85%) | A guardrail metric, not a vanity one — too high suggests the assessment isn't really testing competence (undermining the core differentiator); too low risks recreating the shame/anxiety the product is designed to remove. Tune rubric difficulty against this signal. |
| **Month 3** (matches original 90-day pilot framing) | +15–20% increase in AI tool license utilization in the pilot department | The primary ROI lever identified in the original business case — validates the "translator on top of existing spend" pitch with real usage data, not projections. |
| **Month 3** | Self-reported time saved: 2–3 hrs/week per active user (pilot survey) | Secondary ROI signal; also a leading indicator for word-of-mouth per §2 ("what would make her tell a colleague"). |
| **Month 3** | Manager-rated team AI proficiency: baseline → +1 point (5-point scale) | Validates that the certification is perceived as meaningful by the people who didn't earn it, not just the people who did — addresses the employer-recognition skepticism found in [certification-strategy.md §2](certification-strategy.md). |
| **Month 3** | At least one qualitative account of a certification changing a real workplace interaction (a review, a meeting, a promotion conversation) | Directly tests the §2 "what would make her tell a colleague" trigger — a pilot that hits every quantitative target without a single story like this should be treated as a warning sign, not a success. |

---

## Sources
This PRD synthesizes and operationalizes findings from three prior research documents in this directory — see [viability-analysis.md](viability-analysis.md), [certification-strategy.md](certification-strategy.md), and [tech-stack.md](tech-stack.md) for full citations and underlying research. No new external research was conducted for this document; all technical and product decisions here trace to those three sources or to direct product-requirement instructions from the project owner.
