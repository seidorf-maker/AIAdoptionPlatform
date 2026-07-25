---
name: rate-limit-guard
description: Implements rate limits on assessment submission (billed Anthropic API calls) and the public certificate verification endpoint (unauthenticated, scrapeable). Use when adding either endpoint, or auditing abuse protection.
---

## What this does
Protects the two endpoints in `research/PRD.md` §5 with real abuse/cost exposure: `assessments.submit` (each call costs money via the Anthropic API) and `/api/verify/[code]` (public, no auth, so codes must resist scraping/enumeration).

## Instructions
1. For `assessments.submit`: apply a per-user rate limit (e.g., max N submissions/hour) — in-memory limiting is acceptable at pilot scale; move to Upstash Redis for distributed limiting once past pilot scale (`research/tech-stack.md` §3).
2. For `/api/verify/[code]`: apply a per-IP rate limit, and confirm verification codes are unguessable (not sequential) as the primary defense — rate limiting is a second layer, not a substitute for that.
3. Return clear, explicit error responses on rate-limit rejection — never a silent drop.
4. Do not apply aggressive limits to read-only, self-scoped procedures (e.g., `certifications.myCertifications`) — this skill targets the two endpoints with real abuse/cost exposure, not every endpoint uniformly.

## Dependencies
- Upstash Redis (`@upstash/ratelimit`) for distributed limiting past pilot scale

## References
- `research/PRD.md` §5
- `research/tech-stack.md` §3
- `research/skills.md` §8.3
- [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)
