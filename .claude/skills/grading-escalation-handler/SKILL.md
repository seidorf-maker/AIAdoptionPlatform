---
name: grading-escalation-handler
description: Implements and audits the needs_review escalation path so a low-confidence or ambiguous AI grading result is never silently treated as a fail. Use when building the grading pipeline's failure paths, or auditing whether this rule is actually enforced.
---

## What this does
This is a product-trust requirement, not a generic error-handling nicety — it exists because of the target user's specific fear of public failure (`CLAUDE.md` §4, §7), and it's an explicit "never without approval" rule.

## Instructions
1. Define what counts as low-confidence or ambiguous in a grading response (e.g., malformed structured output, a score near the passing threshold with weak rubric-criterion coverage, an unparseable model response).
2. Route any such result to `assessment_submissions.status = 'needs_review'`, never directly to `'failed'`.
3. Ensure a `needs_review` submission has a human-reviewable trail (the raw grading output, the rubric, the submission) accessible to an admin via `assessments.review`.
4. Audit existing grading code paths for any silent-fail case that bypasses this — treat any finding as a bug to fix immediately, not a backlog item.

## Dependencies
- Depends on `assessment-grading-integration`

## References
- `research/PRD.md` §3.5
- `CLAUDE.md` §4, §7
- `research/skills.md` §8.2
