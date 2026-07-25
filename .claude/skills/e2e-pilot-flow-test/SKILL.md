---
name: e2e-pilot-flow-test
description: Runs the full pilot journey end-to-end (invite through certificate issuance) as one automated check, since this is the whole product's value chain. Use before any pilot launch or major release.
context: fork
agent: general-purpose
disable-model-invocation: true
---

## What this does
Exercises invite → signup → track assignment → course completion → assessment submission → grading → certificate issuance (`research/PRD.md` §3.1-§3.6) as a single pass/fail chain, identifying exactly which stage broke rather than a generic failure.

## Instructions
1. Create a clean test org via `org-member-csv-import`.
2. Drive the flow through the actual UI (not direct DB writes) using Playwright: signup → view recommended track → complete a course → submit an assessment → wait for grading → verify certificate issuance and the public verification page.
3. Report pass/fail per stage.
4. This depends on every Category 1-4 skill already working correctly — treat a failure here as a signal to check the specific stage's dedicated skill, not just retry.

## Dependencies
- Playwright
- Depends on the full pipeline: Categories 1-4

## References
- `research/PRD.md` §3.1-§3.6
- `research/skills.md` §5.4
- [Playwright](https://playwright.dev)
