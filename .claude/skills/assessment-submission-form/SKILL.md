---
name: assessment-submission-form
description: Scaffolds the scenario-response assessment submission UI, including the asynchronous grading-in-progress state required because grading runs as a background job. Use when building or modifying the assessment submission screen from research/PRD.md §3.5.
---

## What this does
Builds the UI half of the product's core differentiator. The async UX matters as much as the mechanics — an unexplained wait reads as "something went wrong" to a user whose core fear is public failure (`CLAUDE.md` §7).

## Instructions
1. Show the `assessments.scenario_prompt` in full.
2. Do **not** show the full grading rubric before submission — per `research/PRD.md` §5.1, exposing it risks turning the assessment into "answer to the rubric" instead of a genuine competence check. This is a product decision to confirm with the team, not something to silently relax.
3. Build the submission form with React Hook Form + Zod.
4. After submission, show a clear, reassuring "grading in progress" state (not a bare spinner) — poll or subscribe via Supabase Realtime for the result rather than blocking.
5. On a `needs_review` result, never present it to the user as a failure — see `grading-escalation-handler` for the required framing.
6. On `failed`, show specific, constructive rubric-tied feedback and a clear resubmission path.

## Dependencies
- React Hook Form, Zod, Supabase Realtime (or polling)
- Depends on `assessment-grading-integration` and `grading-escalation-handler`

## References
- `research/PRD.md` §3.5, §5.1
- `CLAUDE.md` §4, §7
- `research/skills.md` §4.3
- [React Hook Form](https://react-hook-form.com) · [Zod](https://zod.dev) · [Supabase Realtime](https://supabase.com/docs/guides/realtime)
