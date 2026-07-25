---
name: db-index-query-auditor
description: Reviews a tRPC procedure's query pattern against the indexing strategy in research/PRD.md §4.4 and flags missing indexes before they cause a slow-query problem in production. Use before merging any new or changed database query.
context: fork
agent: general-purpose
---

## What this does
Checks a query's filter/sort/join pattern against the indexing strategy already decided in `research/PRD.md` §4.4 (composite `org_id`+`status` indexes, the unique `certifications.verification_code` index, etc.) and flags gaps.

## Instructions
1. Read the target procedure's query code.
2. Compare its `WHERE`/`ORDER BY`/`JOIN` columns against the indexes already documented in `research/PRD.md` §4.4.
3. If a needed index doesn't exist, run `EXPLAIN ANALYZE` against a preview branch to confirm the query is actually doing a sequential scan, not just theoretically missing an index.
4. If confirmed, hand off to `supabase-migration-generator` to add the index — don't add indexes speculatively without a demonstrated query pattern.
5. Pay special attention to `dashboard.orgRollup` (PRD §5.1) — flagged in the PRD as the most expensive read query in the app.

## References
- `research/PRD.md` §4.4, §5.1
- `research/skills.md` §1.5
- [Postgres indexes](https://www.postgresql.org/docs/current/indexes.html)
