---
name: structured-error-responses
description: Standardizes tRPC error shapes and server-side logging across procedures so clients get consistent, actionable errors. Use when adding a new router or auditing error handling consistency.
---

## What this does
Prevents each procedure from inventing its own ad hoc error format, which makes client-side handling unpredictable and debugging harder.

## Instructions
1. Use tRPC's built-in `TRPCError` with a consistent set of codes (`UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `BAD_REQUEST`, etc.) mapped clearly to failure conditions.
2. Log enough server-side context to debug (procedure name, relevant IDs, cause) without leaking internals (stack traces, raw DB errors) to the client response.
3. Keep messages actionable for the client (what went wrong, not just that something did).
4. Apply consistently across routers — when auditing, flag any procedure returning a raw thrown error instead of a `TRPCError`.

## References
- `research/PRD.md` §5
- `research/skills.md` §8.4
- [tRPC error handling](https://trpc.io/docs/server/error-handling)
