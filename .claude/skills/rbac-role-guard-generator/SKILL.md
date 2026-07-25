---
name: rbac-role-guard-generator
description: Generates the tRPC middleware that enforces org_role checks (employee/manager/admin/OnRamp-internal-admin) from research/PRD.md §5.3, so every new procedure gets consistent authorization instead of hand-rolled checks. Use when adding a new tRPC procedure.
---

## What this does
Produces reusable tRPC middleware (`protectedProcedure`, `managerProcedure`, `adminProcedure`, `internalAdminProcedure`) matching the role tiers in `research/PRD.md` §5.3.

## Instructions
1. Identify the required role tier for the target procedure from its description in `research/PRD.md` §5.1 (e.g., "Org admin", "Manager (own team)", "OnRamp internal admin").
2. Apply the matching middleware — never write an inline, one-off role check inside a procedure body.
3. For "manager, own team only" scoping (e.g., `dashboard.orgRollup`), the middleware must resolve the actual team boundary via `org_members.manager_id`, not just confirm the caller has the `manager` role generally.
4. Confirm the middleware composes with RLS rather than replacing it — this is defense in depth, not a substitute for the database-level policy from `rls-policy-scaffolder`.

## References
- `research/PRD.md` §5.1, §5.3
- `research/skills.md` §2.2
- [tRPC middleware](https://trpc.io/docs/server/middlewares)
