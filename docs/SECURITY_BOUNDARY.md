# Security boundary

## Public starter versus private working repository

This public repository contains infrastructure and fictional examples only. A
client's real project should live in a new private repository with its own
access policy, review process, and secret storage.

Making the dashboard private does not automatically make browser code a safe
place for secrets. Everything shipped to the browser can be inspected by a
person who can load the page.

## State classification

| State | Git | Browser dashboard | Each PC |
| --- | --- | --- | --- |
| Source and documentation | Yes | Built output | Clone |
| Sanitized pipeline and decisions | Yes | Yes | Cached clone |
| Local decision clicks | No | Local storage only | Browser profile |
| Codex sessions and memories | No | No | Local only |
| Credentials, tokens, cookies | No | No | Local/secret manager |
| Raw client or customer data | No by default | No | Approved system only |
| Build output and dependencies | No | Deployment artifact | Regenerated |

## External actions

Connector availability is capability, not permission. Private reads, CRM
changes, deployments, publication, messages, scheduling, invitations, access
control, and persistent configuration require exact owner approval after the
dashboard review entry exists.

## Hosting

This starter does not include hosting. If a dashboard is deployed later:

- Protect the owner control plane with real server- or platform-enforced access.
- Do not embed a shared password in JavaScript.
- Keep client-facing and owner-only surfaces separate.
- Add `Cache-Control: private, no-store` and `X-Robots-Tag: noindex, nofollow`
  where supported.
- Verify anonymous denial and authenticated access independently.
- Treat deployment and DNS as separate exact approvals.

## Pre-publication review

Before any push, inspect tracked files and history, run `npm run check`, and scan
for secrets with the client's approved tool. A clean current tree does not prove
that earlier commits are clean.
