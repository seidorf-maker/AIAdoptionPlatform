---
name: grading-regression-tests
description: Runs a fixed set of sample submissions through the grading pipeline and checks the pass-rate distribution stays in the healthy 60-85% band. Use before changing an assessment rubric or the grading prompt, not on every commit (real Anthropic API cost per run).
context: fork
agent: general-purpose
disable-model-invocation: true
---

## What this does
Catches rubric drift or an overly harsh/lenient grading-prompt change before it ships, using the guardrail band defined in `research/PRD.md` §8: too high a pass rate suggests the assessment isn't testing real competence; too low risks recreating the shame/anxiety the product exists to remove (`CLAUDE.md` §7).

## Instructions
1. Maintain a labeled sample set per assessment: known-good, known-bad, and borderline submissions.
2. Run the full set through `assessment-grading-integration`'s live pipeline (real Anthropic API calls — this has a real cost, run deliberately).
3. Compare the resulting pass rate against the 60-85% healthy band from `research/PRD.md` §8.
4. If outside the band, report which submissions graded unexpectedly and why, rather than just the aggregate number.
5. Run this before merging any rubric or grading-prompt change — not as routine CI.

## Dependencies
- Depends on `assessment-grading-integration`; costs real Anthropic API usage per run

## References
- `research/PRD.md` §8
- `research/certification-strategy.md` §2
- `research/skills.md` §5.3
- [Claude API docs](https://platform.claude.com/docs)
