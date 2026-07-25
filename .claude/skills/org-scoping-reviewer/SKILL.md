---
name: org-scoping-reviewer
description: Audits a tRPC procedure or endpoint specifically for cross-org data leakage — the project's single named non-negotiable. Use before merging any PR that touches server/trpc/routers, or when explicitly asked to check multi-tenant isolation.
context: fork
agent: general-purpose
---

## What this does
Checks the application layer doesn't bypass the database-level RLS policies from `rls-policy-scaffolder` — for example, via a service-role Supabase client used where a scoped client should be used instead. This is a review skill, not a code-writing one.

## Instructions
1. Read the target procedure(s) and every table they touch.
2. For each query, confirm it runs with a session-scoped client (RLS-enforced), not the service-role key, unless there is a specific, justified reason (e.g., OnRamp-internal-admin operations) — and if so, confirm an equivalent manual `org_id` check exists in the procedure itself.
3. Check for any code path where `org_id` is taken from client input rather than derived server-side from the authenticated session.
4. Report a clear pass/fail. On fail, cite the exact file and line.
5. This check is the highest-stakes review in the project (`CLAUDE.md` §4) — when in doubt, fail the review and ask rather than assume it's fine.

## References
- `research/PRD.md` §4.1, §6
- `CLAUDE.md` §4
- `research/skills.md` §2.3
