---
name: role-based-track-ui
description: Builds the single-recommended-track screen for an employee's job function — deliberately not a browsable catalog. Use when building the track/course list experience from research/PRD.md §3.2-3.3.
---

## What this does
Implements the "sanctioned door, not an open catalog" principle from `CLAUDE.md` §7. On first login, a user sees one recommended track for their job function, not a full list to browse.

## Instructions
1. Fetch the user's `job_function_id` and its associated `learning_tracks`/`courses` via `tracks.list`/`courses.list`.
2. Render a single recommended track by default — do not default to a searchable/browsable catalog view.
3. Each track shows 2-5 courses tagged to the competency they build toward (`research/PRD.md` §3.3), not a long undifferentiated list.
4. For courses with `source = 'linkedin_learning'` and `status = 'mocked'`, use `mocked-linkedin-learning-adapter` rather than reading `integration_connections` directly.
5. Build on `trpc-page-scaffolder` for base scaffolding.

## References
- `research/PRD.md` §3.2, §3.3
- `CLAUDE.md` §7 (UX principles)
- `research/skills.md` §4.2
