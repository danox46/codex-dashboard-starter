# Customization

The starter ships with fictional data in `src/starter-state.ts`.

## Safe first changes

1. Rename `Sample Workspace` and update the descriptive project names.
2. Replace pipeline items with sanitized status summaries and source links.
3. Replace machine labels with non-identifying roles such as `Primary PC` and
   `Secondary PC`.
4. Adapt `AGENTS.md` to the project's approval lanes and systems of record.
5. Keep hidden portable context concise, sanitized, and aligned with visible
   dashboard state.

## Decision contract

Every review-ready decision should include:

- A clear title and short context
- The owner and current status
- Scope and source of truth
- Acceptance criteria
- Consequences of approve, hold, and reject
- The next action after the decision

Incomplete work should stay visible as planned or blocked, without implying
approval.

## Adding real integrations

Do not place connector calls or credentials directly in the browser app. Design
the integration boundary and exact permissions in a dashboard decision first.
Use a server-side component or approved platform secret store after explicit
approval, and keep the starter functional without private access.
