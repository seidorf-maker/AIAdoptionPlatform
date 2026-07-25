---
name: mocked-linkedin-learning-adapter
description: Builds the adapter layer behind integration_connections so the connected-accounts/gap-mapping UI reads cleanly from mock data today and can swap to a live connection later without a UI rewrite. Use when building the gap-mapping screen or any integration_connections consumer.
---

## What this does
Implements `research/PRD.md` §3.4. LinkedIn Learning's API is not self-serve (Partner Program or client-provisioned keys only, and skill-level metadata may not even be exposed — see `research/viability-analysis.md` §1), so **live mode is intentionally not built**. This skill builds only the mock-data path, behind an interface stable enough that live mode can be added later without touching the UI.

## Instructions
1. Define a single adapter interface (e.g., `getConnectionStatus(orgId, provider)`, `getGapMap(orgId, jobFunctionId)`) that the UI calls regardless of `integration_connections.status`.
2. Implement only the `mocked` branch, reading from data seeded by `mock-integration-seed-data`.
3. Leave the `live` branch as an explicit not-implemented stub, not a silent no-op — so a future attempt to flip a connection to `live` fails loudly rather than serving stale mock data.
4. Confirm the UI never presents mocked data as if it were a live connection — this is a named credibility risk, not a cosmetic detail.

## References
- `research/PRD.md` §3.4
- `research/viability-analysis.md` §1, §4
- `research/skills.md` §3.2
- [LinkedIn Learning Reporting API](https://learn.microsoft.com/en-us/linkedin/learning/reporting/reporting-docs/reporting-api) (reference only — not called)
