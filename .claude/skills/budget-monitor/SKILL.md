---
name: budget-monitor
description: Checks current Netlify and Supabase usage against the pilot budget in research/tech-stack.md §4, and flags before a change would push past the pilot budget tier. Use before adding any paid service, or when asked about hosting costs.
---

## What this does
Operationalizes the `CLAUDE.md` §4 rule: never add a paid third-party service without flagging the cost against the budget first.

## Instructions
1. Check current Netlify credit usage (300/mo on Free, 3,000+/mo on Pro) and Supabase resource usage against the cost table in `research/tech-stack.md` §4.
2. If a proposed change (new dependency, new background job volume, a new integration) would meaningfully increase usage, estimate the impact before implementing, not after.
3. Report status against the pilot target (~$31-45/month for a real pilot with client data) and flag clearly if a change would require moving to the next paid tier.
4. Never silently add a paid service (Credly, Accredible, SSO add-ons) — surface the cost and get explicit approval first.

## References
- `research/tech-stack.md` §4
- `CLAUDE.md` §4
- `research/skills.md` §6.3
- [Netlify pricing](https://www.netlify.com/pricing/) · [Supabase pricing](https://supabase.com/pricing)
