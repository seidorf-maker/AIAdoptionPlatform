---
name: rls-policy-scaffolder
description: Generates Row Level Security policies for a tenant-scoped Postgres table, following the org_members-lookup pattern (never a client-trusted org_id) from research/PRD.md §4.1. Use immediately after creating any new tenant-scoped table.
disable-model-invocation: true
allowed-tools: mcp__supabase__apply_migration mcp__supabase__get_advisors
---

## What this does
Writes the select/insert/update/delete RLS policies for a table, matching the pattern in `research/PRD.md` §4.1. This is the single highest-severity skill in the project — `CLAUDE.md` explicitly forbids weakening or skipping RLS on any tenant-scoped table.

## Instructions
1. Confirm the table has an `org_id uuid references organizations(id)` column. If not, stop — this skill only applies to tenant-scoped tables.
2. Write policies keyed off `org_members` membership, not a client-supplied value:
   ```sql
   create policy "org_isolation_select" on <table>
     for select using (
       org_id in (select org_id from org_members where auth_user_id = auth.uid())
     );
   -- equivalent insert/update/delete policies
   ```
3. Layer role checks (admin/manager/employee) on top where the operation requires it — see `rbac-role-guard-generator` for the matching application-layer guard.
4. For tables that also allow global-template rows (`org_id is null`), add an explicit `select`-only policy for those rows — never allow `insert`/`update`/`delete` on null-org rows from a non-internal-admin role.
5. Enable RLS on the table (`alter table <table> enable row level security;`) — policies do nothing if RLS isn't turned on.
6. Run `get_advisors` afterward and resolve any new security findings before considering this done.
7. Hand off to `rls-policy-tests` to add the cross-org negative test case for this table.

## References
- `research/PRD.md` §4.1, §6
- `research/skills.md` §1.2
- [Postgres Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) · [Supabase RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
