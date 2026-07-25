---
name: manager-dashboard-charts
description: Scaffolds the manager/admin rollup dashboard (enrollment, completion, certification stats) using Recharts, correctly scoped by role. Use when building or modifying the dashboard from research/PRD.md §3.9.
---

## What this does
Implements the P1 manager/leadership dashboard. Data must be scoped by RLS and the `rbac-role-guard-generator` middleware to the manager's own team or the admin's own org — never cross-org, never below the requesting user's management scope.

## Instructions
1. Confirm `dashboard.orgRollup` is guarded correctly before building the UI against it — run `org-scoping-reviewer` on the procedure first if it hasn't already been reviewed.
2. Build visualizations with Recharts: enrollment count, completion rate, certifications issued, and (once live gap-mapping data exists — not in MVP) utilization change over time.
3. Cache aggressively — the PRD flags this as the most expensive read query in the app (`research/PRD.md` §5.1).

## Dependencies
- Recharts
- Depends on `rbac-role-guard-generator`, `org-scoping-reviewer`

## References
- `research/PRD.md` §3.9, §5.1
- `research/skills.md` §4.4
- [Recharts](https://recharts.org)
