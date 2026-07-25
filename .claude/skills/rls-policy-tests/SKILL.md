---
name: rls-policy-tests
description: A standalone test suite exercising RLS policies directly at the database level (not through the API), confirming no row is readable across organizations. Use after any rls-policy-scaffolder run, and periodically as a full-suite check.
context: fork
agent: general-purpose
disable-model-invocation: true
---

## What this does
Because `research/PRD.md` §4.1/§6 treats multi-tenant isolation as non-negotiable, this gets its own test surface independent of application-layer bugs — a test that only checks the API could pass while the underlying policy is still wrong.

## Instructions
1. Seed at least two test organizations with overlapping/similar data shapes (same table structures, deliberately similar-looking rows).
2. For every tenant-scoped table, attempt a direct database read/write as an authenticated user of org A against org B's rows.
3. Confirm every attempt is denied by RLS, not by an incidental application-layer check.
4. Run against a Supabase preview branch (via `supabase-branch-preview`) — **never** run destructive cross-org test attempts against production.
5. Report pass/fail per table; any failure is a stop-ship issue, not a backlog item.

## Dependencies
- Depends on `rls-policy-scaffolder`, `supabase-branch-preview`

## References
- `research/PRD.md` §4.1, §6
- `CLAUDE.md` §4
- `research/skills.md` §5.2
- [Supabase RLS testing guide](https://supabase.com/docs/guides/database/postgres/row-level-security#testing-policies)
