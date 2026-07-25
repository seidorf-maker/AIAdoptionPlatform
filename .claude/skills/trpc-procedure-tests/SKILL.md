---
name: trpc-procedure-tests
description: Scaffolds unit/integration tests for a tRPC procedure, always including a cross-org-isolation negative test case. Use when adding or changing any tRPC procedure.
---

## What this does
Standard test coverage for a procedure, with a non-negotiable addition: at least one test proving org A cannot read/write org B's data through this procedure.

## Instructions
1. Write standard input/output tests for the procedure's happy path and validation failures.
2. Add a deny-path test: authenticate as a user in org A, attempt to access/mutate a resource belonging to org B, assert it fails.
3. If the procedure is role-guarded (via `rbac-role-guard-generator`), add a test per role tier confirming lower-privilege roles are rejected.
4. Use `org-scoping-reviewer`'s findings as the source of truth for what "correctly scoped" means — don't invent a different definition in the test.

## Dependencies
- Vitest (or equivalent test runner)
- Depends on `org-scoping-reviewer` for scoping correctness, `rbac-role-guard-generator` for role tiers

## References
- `research/PRD.md` §6
- `research/skills.md` §5.1
- [Vitest](https://vitest.dev)
