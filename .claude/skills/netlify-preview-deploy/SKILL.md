---
name: netlify-preview-deploy
description: Uses the Netlify and Supabase MCP servers to deploy a preview build and confirm it against a preview Supabase branch before merging to production. Consolidates deploy + verify into one skill. Use before merging any PR, or when asked to preview a change.
context: fork
background: true
allowed-tools: mcp__netlify__* mcp__supabase__create_branch mcp__supabase__apply_migration
---

## What this does
Deploys a git branch/PR to a Netlify preview URL, backed by a matching Supabase preview branch, and confirms both are reachable and consistent before anything reaches production. Runs in the background so work can continue while it deploys.

## Instructions
1. Confirm the target branch/PR is ready (lint/typecheck/test passing — see `ci-pipeline-setup`).
2. Use the Netlify MCP server to trigger and confirm a preview deploy.
3. If the change includes a migration, use `supabase-branch-preview` to apply it to a matching Supabase preview branch first — never point a Netlify preview at the production database.
4. Confirm the deployed preview is reachable and the expected change is visible.
5. Report the preview URL back once ready. If `/run-skill-generator` has already recorded this project's launch recipe, defer to that recipe rather than re-deriving deploy steps here.

## Dependencies
- Netlify MCP server, Supabase MCP server
- No npm packages required

## References
- `research/tech-stack.md` §4, §5
- `research/skills.md` §3.6, §6.1
- [Netlify MCP server](https://docs.netlify.com/build/build-with-ai/agent-setup-guides/set-up-claude-code-for-netlify/) · [Supabase MCP server](https://supabase.com/docs/guides/ai-tools/mcp)
