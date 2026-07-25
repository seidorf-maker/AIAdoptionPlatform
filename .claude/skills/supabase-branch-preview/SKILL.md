---
name: supabase-branch-preview
description: Tests a pending migration on a Supabase preview branch in isolation, reviewing security/perf advisories, before it touches the app or production. Use whenever testing a migration independent of a full deploy.
allowed-tools: mcp__supabase__create_branch mcp__supabase__apply_migration mcp__supabase__get_advisors
---

## What this does
The narrower, migration-only half of preview testing — useful on its own when you want to validate a schema change without a full app deploy (see `netlify-preview-deploy` for the combined flow).

## Instructions
1. Create a Supabase preview branch.
2. Apply the pending migration to it.
3. Run `get_advisors` and resolve any new security or performance findings before merging.
4. Confirm the resulting schema matches what `research/PRD.md` §4.3 specifies.

## Dependencies
- Supabase MCP server (`create_branch`, `apply_migration`, `get_advisors`)

## References
- `research/tech-stack.md` §3
- `research/skills.md` §6.2
- [Supabase branching](https://supabase.com/docs/guides/deployment/branching)
