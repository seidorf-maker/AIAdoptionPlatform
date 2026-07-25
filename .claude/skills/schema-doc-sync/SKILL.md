---
name: schema-doc-sync
description: Compares the actual database schema and tRPC router against research/PRD.md §4-5 and flags drift between what's built and what's documented. Use periodically, or when asked whether the PRD is still accurate.
allowed-tools: mcp__supabase__list_tables
---

## What this does
Keeps the authoritative spec honest as the codebase evolves — catches a field added in a migration that never made it back into the PRD, or vice versa.

## Instructions
1. Pull the current schema via `list_tables`.
2. Compare table-by-table against `research/PRD.md` §4.3.
3. Compare the current tRPC router structure against `research/PRD.md` §5.1.
4. Report a diff: undocumented schema/API changes in either direction.
5. This is a read-only comparison — propose the PRD update, don't silently edit `research/PRD.md` without confirming the drift is intentional.

## References
- `research/PRD.md` §4, §5
- `research/skills.md` §7.1
