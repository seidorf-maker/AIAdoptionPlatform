---
name: transactional-email-sender
description: Sends invite emails, assessment-graded/certification-expiring notifications, and champion nudges, each paired with a notifications row. Use when triggering any user-facing email per research/PRD.md §3.1, §3.10, §3.11.
---

## What this does
Sends the transactional emails required by `research/PRD.md` §3.1 (invites), §3.11 (assessment graded, certification expiring), and §3.10 (champion nudges), always writing a matching `notifications` row so in-app and email stay in sync.

## Instructions
1. Confirm the notification `type` and recipient.
2. Render the appropriate template with the event's data (e.g., assessment result, expiring certification tier).
3. Send via the configured transactional email provider (not yet selected in the PRD — confirm the actual provider before hardcoding one; Resend is used below as a representative placeholder).
4. Write a corresponding `notifications` row regardless of email delivery success/failure, so in-app notifications don't silently depend on email deliverability.
5. No SMS in MVP — email and in-app only, per `research/PRD.md` §3.11.

## References
- `research/PRD.md` §3.1, §3.10, §3.11
- `research/skills.md` §3.5
- [Resend docs](https://resend.com/docs) (representative choice — confirm actual provider before building)
