---
name: competency-map-docs
description: Generates a human-readable summary of the competency graph (domains, competencies, role mappings, course mappings) for admin/content review. Use when asked to review or document the current competency map, or annually per governance practice.
---

## What this does
Supports the "review the competency map annually" governance practice from `research/certification-strategy.md` §3 — a competency map that never gets reviewed slowly drifts out of relevance.

## Instructions
1. Query `competency_domains` → `competencies` → `role_competency_map` → `course_competency_map` for the target org (or global templates).
2. Render a readable summary: each domain, its competencies, which job functions require them, and which courses cover them.
3. Flag any competency with no covering course, or any job function with no mapped competencies — both are gaps worth surfacing, not silently passing through.

## References
- `research/certification-strategy.md` §3
- `research/PRD.md` §3.13, §4.3
- `research/skills.md` §7.2
