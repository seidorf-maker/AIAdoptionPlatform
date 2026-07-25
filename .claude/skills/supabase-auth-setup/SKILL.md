---
name: supabase-auth-setup
description: Scaffolds the pilot-phase auth flow (email/password + Google OAuth) with Next.js SSR-compatible session handling. Use when setting up or modifying login/signup for OnRamp.
disable-model-invocation: true
---

## What this does
Builds the pilot-phase authentication flow from `research/PRD.md` §3.1/§6: email/password plus Google OAuth. **Enterprise SSO/SAML is explicitly out of scope until the company-wide rollout phase** — do not add it here; that's a separate, currently-deferred skill.

## Instructions
1. Install/configure `@supabase/supabase-js` and `@supabase/ssr`.
2. Build signup/login pages supporting email/password and Google OAuth.
3. Implement SSR-compatible session middleware so server components/tRPC procedures can read the authenticated user.
4. Confirm every authenticated route resolves `org_id` via `org_members`, never a client-supplied value (this feeds `rbac-role-guard-generator`).
5. Do not implement SAML/SSO as part of this skill — see `CLAUDE.md` §4 and `research/PRD.md` §7 for why it's deferred.

## References
- `research/PRD.md` §3.1, §6
- `research/skills.md` §2.1
- [Supabase Auth](https://supabase.com/docs/guides/auth) · [Supabase SSR for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
