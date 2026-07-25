---
name: ci-pipeline-setup
description: Scaffolds and maintains the GitHub Actions workflow that runs lint, typecheck, and tests on every pull request. Use when setting up CI for the first time or adding a new check to the pipeline.
disable-model-invocation: true
---

## What this does
No separate CI/CD vendor — GitHub Actions covers lint/typecheck/test per `research/tech-stack.md` §4.

## Instructions
1. Create/update `.github/workflows/ci.yml` running lint, typecheck, and the test suite (from `trpc-procedure-tests`, `rls-policy-tests`, `e2e-pilot-flow-test`) on every PR.
2. Include a reviewed migration step (or a manual pre-merge check via `supabase-branch-preview`) so schema changes never land unreviewed, per `CLAUDE.md` §2.
3. Do not include `grading-regression-tests` in routine CI — it has a real per-run Anthropic API cost and should run deliberately, not on every push.

## References
- `research/tech-stack.md` §4
- `research/skills.md` §6.4
- [GitHub Actions](https://docs.github.com/en/actions)
