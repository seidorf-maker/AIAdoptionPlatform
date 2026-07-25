---
name: accessibility-auditor
description: Checks a component or page against the WCAG 2.1 AA target, leaning on shadcn/ui's Radix-based accessibility defaults. Use before considering any new employee-facing component done.
allowed-tools: Bash(npx axe-core *)
---

## What this does
Enforces the accessibility bar in `research/PRD.md` §6. Enterprise procurement for a B2B workplace tool commonly asks for a VPAT or equivalent attestation, so this is cheaper to build in now than retrofit later.

## Instructions
1. Run automated checks (`axe-core` or equivalent) against the target component/page for contrast, labels, and structural issues.
2. Manually verify keyboard navigation and focus order — automated tools miss most of this.
3. Confirm any custom component built on top of shadcn/ui/Radix primitives hasn't broken the underlying accessible behavior (e.g., a custom wrapper that drops `aria-*` attributes).
4. Report a clear pass/fail list against WCAG 2.1 AA criteria, not just a raw tool dump.

## Dependencies
- `axe-core`
- shadcn/ui (Radix primitives) as the accessible-by-default baseline

## References
- `research/PRD.md` §6
- `research/tech-stack.md` §1
- `research/skills.md` §4.5
- [WCAG 2.1 quick reference](https://www.w3.org/WAI/WCAG21/quickref/) · [axe-core](https://github.com/dequelabs/axe-core)
