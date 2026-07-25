---
name: supabase-migration-generator
description: Scaffolds a new versioned Supabase/Postgres migration for a table or column defined in the PRD schema, and applies it via the Supabase CLI/MCP rather than the dashboard. Use when adding or changing a table from research/PRD.md §4.3.
disable-model-invocation: true
allowed-tools: mcp__supabase__apply_migration mcp__supabase__list_tables mcp__supabase__create_branch
---

## What this does
Turns a table/field spec from `research/PRD.md` §4.3 into a real, versioned SQL migration file, applied through the Supabase CLI or MCP tools — never hand-edited through the dashboard, per `CLAUDE.md` §2.

## Instructions
1. Read the target table's definition in `research/PRD.md` §4.3 (fields, types, FKs, defaults).
2. Confirm whether the table is tenant-scoped (`org_id not null`) or a global-template table (`org_id nullable`) — this determines the RLS approach in the companion `rls-policy-scaffolder` skill, which **must run in the same migration**, not a later one.
3. Write the migration as a new file under `supabase/migrations/`, following existing naming/ordering conventions in that directory.
4. Apply it to a preview branch first (`create_branch` + `apply_migration`), not directly to production — see `supabase-branch-preview`.
5. Confirm the table exists as expected with `list_tables`.
6. Immediately invoke `rls-policy-scaffolder` for the new table before considering this skill complete — an un-policied tenant-scoped table is a security gap, not a follow-up task.

## References
- `research/PRD.md` §4 (full schema)
- `research/skills.md` §1.1
- [Supabase local development](https://supabase.com/docs/guides/local-development) · [Supabase MCP server](https://supabase.com/docs/guides/ai-tools/mcp)
