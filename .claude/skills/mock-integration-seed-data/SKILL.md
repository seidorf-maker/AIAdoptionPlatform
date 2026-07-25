---
name: mock-integration-seed-data
description: Populates integration_connections, mocked courses, and sample gap-mapping data so the connected-accounts/gap-mapping demo screen has realistic content without a live third-party API call. Use when setting up a pilot org or demo environment.
disable-model-invocation: true
---

## What this does
Seeds `integration_connections` (status `mocked`), `courses` (source `linkedin_learning`, status `mocked`), and sample course-competency mappings for the gap-mapping screen in `research/PRD.md` §3.4.

## Instructions
1. Confirm the target org and job function.
2. Insert an `integration_connections` row with `provider = 'linkedin_learning'`, `status = 'mocked'`.
3. Insert 2-4 sample `courses` rows with `source = 'linkedin_learning'`, `status = 'mocked'`, mapped to real competencies via `course_competency_map`.
4. **Never** produce mock data that is visually indistinguishable from a live connection in the UI — this is a named credibility risk in `research/viability-analysis.md` §4 and a hard rule in `CLAUDE.md` §4. Confirm the UI surfaces the mocked status (e.g., a "demo data" label) before considering this complete.

## References
- `research/PRD.md` §3.4
- `research/viability-analysis.md` §1, §4
- `research/skills.md` §1.4
