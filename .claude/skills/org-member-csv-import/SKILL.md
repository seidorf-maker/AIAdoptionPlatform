---
name: org-member-csv-import
description: Parses and validates a CSV of employee invites (email, name, job function) for org onboarding, rejecting malformed rows individually rather than failing the whole batch. Use when bulk-inviting employees per research/PRD.md §3.1.
disable-model-invocation: true
---

## What this does
Implements the bulk-invite path from `research/PRD.md` §3.1: validated rows become `org_members` inserts with `status = 'invited'`; invalid rows are reported individually.

## Instructions
1. Parse the CSV (expected columns: `email`, `full_name`, `job_function`).
2. Validate each row with a Zod schema: email format, non-empty name, job function must match an existing `job_functions` row for the target org (or a global template).
3. Enforce `unique (org_id, email)` — skip and report duplicates rather than erroring the whole batch.
4. Insert valid rows as `org_members` with `status = 'invited'`.
5. Return a two-part result: inserted count, and a rejected-rows report with the specific reason per row.
6. Trigger `transactional-email-sender` for each successfully invited row.

## Dependencies
- Zod for row validation
- Depends on the `org_members` and `job_functions` tables already existing (via `supabase-migration-generator` + `rls-policy-scaffolder`)

## References
- `research/PRD.md` §3.1, §4.3
- `research/skills.md` §1.3
- [Zod](https://zod.dev)
