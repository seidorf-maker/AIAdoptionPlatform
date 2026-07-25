---
name: trpc-page-scaffolder
description: Generates a new Next.js page or component pre-wired to a tRPC procedure via React Query, with loading/error/success states handled. Use when starting any new employee- or admin-facing screen.
---

## What this does
Baseline scaffolding for any new screen, following the "no Redux" state-management convention — server state via tRPC + React Query, local UI state via `useState`/`useReducer` only (`research/tech-stack.md` §1).

## Instructions
1. Confirm the target tRPC procedure(s) already exist (or scaffold them first via the relevant router).
2. Generate the page/component using Tailwind CSS + shadcn/ui primitives, matching the brand's warm, non-"sci-fi" visual direction (`FinalProject.md` §3).
3. Wire data fetching through tRPC's React Query bindings — do not introduce Zustand or Redux unless a genuine cross-cutting client state need is identified first.
4. Handle loading, error, and empty states explicitly — never leave a bare blank screen while data loads.
5. Hand off to `accessibility-auditor` before considering the component done.

## Dependencies
- tRPC React Query bindings, Tailwind CSS, shadcn/ui

## References
- `research/tech-stack.md` §1
- `research/skills.md` §4.1
- [tRPC React Query integration](https://trpc.io/docs/client/react) · [shadcn/ui](https://ui.shadcn.com)
