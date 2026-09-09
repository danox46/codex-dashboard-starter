# Project operating agreement

This repository is a sanitized starter for a shared project dashboard. Git and
the checked-in dashboard state are the shared coordination layer. Each Codex
installation remains independent.

## Dashboard-first development

For project, website, content, CRM, outreach, support, migration, or operating
work, use the dashboard as the agreement layer before implementation.

1. Create or update the relevant dashboard review decision.
2. Record scope, source of truth, blockers, acceptance criteria, requested
   decision, and next action.
3. Ask the owner to approve, revise, hold, or reject the recorded scope.
4. Implement only after approval and only inside the approved boundary.
5. Record evidence and the final outcome in dashboard state.

Dashboard preparation and implementation are separate gates. Connector access,
external writes, publishing, deployment, outreach, CRM mutations, scheduling,
access-control changes, and persistent configuration always require exact
approval.

## Shared and local state

Shared through reviewed Git commits:

- Application source and documentation
- Sanitized dashboard state and decision history
- Project-specific `AGENTS.md` guidance
- Validation scripts and public-safe evidence

Local to each PC and never copied through Git:

- Codex sessions, memories, databases, caches, and credentials
- Environment files, tokens, cookies, browser state, and SSH keys
- Build output, local authentication, and machine configuration
- Raw customer/client data or unredacted operational exports

Git is a collaboration protocol, not a machine-state synchronization system.
Each PC uses its own clone, credentials, branches, and Codex state.

## Dashboard layers

- Human layer: concise visible status, blockers, decisions, acceptance criteria,
  evidence, and next actions.
- Agent-only layer: sanitized structured context in a
  `<script type="application/json">` element for continuation state and source
  maps that do not help human review.

Never put secrets, credentials, personal data, private client material, or local
authentication state in either layer.

## Change safety

- Diagnose read-only first.
- Preserve unrelated edits and use focused branches.
- Prefer reversible, reviewable commits.
- Verify the current branch, dashboard decision, and source of truth before a
  mutation or publication.
- Stop at every review gate requested by the owner.

## Canonical dashboard presentation

Use `$dashboard-system-operator` for dashboard design, records, modules,
navigation, diagnosis, migrations, and private releases. Preserve its complete
visual doctrine: friendly HubSpot-inspired hierarchy, compact pulse links,
title-only lists, Requester-first provenance, one Action Item, acceptance work
as Line Items, readable responsive registered modules, an interactive module
inventory, and sanitized agent-only context behind a calm human layer. Avoid
crowded previews, tiny type, raw machine state, fake freshness, and fixed
layouts that overflow.
