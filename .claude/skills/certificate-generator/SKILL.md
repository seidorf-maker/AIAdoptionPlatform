---
name: certificate-generator
description: On a passed assessment, generates a certification record with an unguessable verification code, a PDF, and a QR code linking to the public verification page. Use when a submission transitions to status=passed, or a full track's competencies are complete.
---

## What this does
Implements `research/PRD.md` §3.6. OnRamp's `certifications` table is the **permanent source of truth** regardless of any future third-party credentialing vendor — see `research/tech-stack.md` §6 on vendor lock-in.

## Instructions
1. On a passed `assessment_submissions` row (or a completed tier per the competency map), create a `certifications` row with a cryptographically unguessable `verification_code` (not sequential, not derived from the user ID).
2. Enforce tier progression at the application layer: a `practitioner` or `advanced` certification cannot be issued unless the prerequisite lower tier is already `active` for that user (this is an app-layer rule, not a DB constraint — see `research/PRD.md` §4.5).
3. Generate a PDF and a QR code linking to `/verify/{code}`; store both in Supabase Storage.
4. Leave `external_credential_id` null — Credly/Accredible sync is deferred (`research/skills.md` §3.4) and not part of this skill.
5. Confirm the public `/verify/{code}` REST endpoint returns holder name, org, competency, and issue date with no authentication required.

## Dependencies
- `pdf-lib` (PDF generation), `qrcode` (npm)
- Supabase Storage
- Depends on `assessment-grading-integration` producing a `passed` status

## References
- `research/PRD.md` §3.6, §5.2
- `research/certification-strategy.md` §3 (issuance as a solved/low-risk problem, buy vs. build)
- `research/skills.md` §3.3
- [pdf-lib](https://pdf-lib.js.org) · [qrcode (npm)](https://www.npmjs.com/package/qrcode) · [Supabase Storage](https://supabase.com/docs/guides/storage)
