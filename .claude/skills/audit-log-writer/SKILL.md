---
name: audit-log-writer
description: Ensures every admin-mutating procedure writes a row to audit_logs, and reviews new admin procedures for compliance. Use when adding any admin-only tRPC procedure (certification revoke, competency/track/course edits, org membership changes).
---

## What this does
Operationalizes the "documented governance" credibility requirement from `research/certification-strategy.md` §3 — who can change the standards and when must be traceable, not assumed.

## Instructions
1. Identify whether the target procedure is admin-mutating (guarded by `adminProcedure` or `internalAdminProcedure` from `rbac-role-guard-generator`).
2. If so, confirm it writes an `audit_logs` row: `actor_org_member_id`, `action`, `target_type`, `target_id`, `metadata`.
3. If it doesn't, add the write — don't let a new admin action ship without one, even if it "seems minor."
4. Report which admin procedures are covered and which aren't, when asked for a general audit.

## References
- `research/PRD.md` §3.13, §4.3
- `research/skills.md` §8.1
