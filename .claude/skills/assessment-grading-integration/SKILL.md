---
name: assessment-grading-integration
description: Wires a scenario-response assessment submission to a Claude API grading call against a stored rubric, running as a Netlify Background Function. This is the core product differentiator. Use when building or modifying the assessment-grading pipeline.
---

## What this does
Implements `research/PRD.md` §3.5 — the single most important feature in the product. Grades a real, job-specific submission against a rubric, not a quiz/completion check.

## Instructions
1. Read the linked `assessments.rubric` (jsonb) and `assessments.scenario_prompt`.
2. Call the Anthropic API with the submission text/file plus the rubric, requesting structured output (score + per-criterion feedback).
3. Because Netlify's standard function timeout is too short for a safe synchronous LLM call, this **must** run as a Netlify Background Function (15-minute timeout), not a standard function — see `research/tech-stack.md` §4.
4. Write the result to `assessment_submissions.ai_grading_result` and `score`, and transition `status`: `pending` → `graded` → `passed` / `failed` / `needs_review`.
5. **Never transition directly to `failed` on a low-confidence or ambiguous model response** — route to `needs_review` instead. This is a hard rule (`CLAUDE.md` §4), not a style preference — hand off to `grading-escalation-handler` for that path.
6. Record `grader_model_version` on every graded submission for auditability.
7. The UI must show a "grading in progress" state, never a blocking spinner that could time out — coordinate with `assessment-submission-form`.

## Dependencies
- `@anthropic-ai/sdk`
- Netlify Background Functions / Async Workloads
- Depends on `supabase-migration-generator` having created `assessments`/`assessment_submissions`, and `grading-escalation-handler` for the review path

## References
- `research/PRD.md` §3.5
- `research/certification-strategy.md` §2 (why this is the differentiator)
- `research/tech-stack.md` §4, §6
- `research/skills.md` §3.1
- [Claude API docs](https://platform.claude.com/docs) · [Netlify Background Functions](https://docs.netlify.com/build/async-workloads/optional-configuration/)
