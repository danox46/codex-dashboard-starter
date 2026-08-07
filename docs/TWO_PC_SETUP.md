# Two-PC setup

The two installations share a repository and an approval protocol. They do not
share Codex application state or credentials.

## Before starting

The owner should create a private working repository for any real operational
use. Confirm that both people or machines have only the GitHub access they need.
Install Git and Node.js 22 or newer independently on both PCs.

## PC One: establish the private working repository

Clone the public starter:

```bash
git clone https://github.com/danox46/codex-dashboard-starter.git client-control-plane
cd client-control-plane
npm ci
npm run check
```

Create an empty private repository in the client's GitHub account or
organization. Do not initialize it with a README. Then replace the starter
remote and push the sanitized baseline:

```bash
git remote rename origin starter
git remote add origin git@github.com:CLIENT_ORG/CLIENT_PRIVATE_REPO.git
git push -u origin main
```

Keep `starter` read-only and optional. Never push client changes back to this
public repository.

## Customize through a review branch

```bash
git switch -c codex/initial-dashboard-setup
```

Replace only the fictional state described in `docs/CUSTOMIZATION.md`. Add a
dashboard decision describing scope, data sources, exclusions, acceptance
criteria, and the next owner decision. Do not add credentials or raw client
exports.

Run the checks, commit, push, and review before merging:

```bash
npm run check
git add AGENTS.md src/starter-state.ts docs
git commit -m "Configure sanitized project dashboard"
git push -u origin codex/initial-dashboard-setup
```

## PC Two: independent installation

Authenticate GitHub separately on PC Two. Do not copy `.ssh`, credential
manager data, browser profiles, cookies, or Codex folders from PC One.

```bash
git clone git@github.com:CLIENT_ORG/CLIENT_PRIVATE_REPO.git client-control-plane
cd client-control-plane
npm ci
npm run check
npm run dev
```

Open the repository in Codex. The nearest `AGENTS.md` and the dashboard's hidden
sanitized JSON provide the shared operating context. Codex sessions and memories
on PC Two remain independent.

## Daily collaboration

1. Start from a current `main`: `git switch main && git pull --ff-only`.
2. Create one focused branch per task: `git switch -c codex/short-task-name`.
3. Update the dashboard review decision before consequential implementation.
4. Wait for the owner to approve, revise, hold, or reject the recorded scope.
5. Implement only the approved boundary and run `npm run check`.
6. Push the branch and merge through the client's chosen review process.
7. The other PC runs `git switch main && git pull --ff-only`.

Never work on the same branch from both PCs at the same time. Use separate task
branches and reviewed merges.

## Recover from divergence

Do not force-push shared branches. First preserve work:

```bash
git status
git switch -c codex/recovery-copy
git add --all
git commit -m "Preserve local work before recovery"
git fetch origin
```

Review the branch and remote state before rebasing, merging, or cherry-picking.
If credentials, private data, or secrets entered Git history, stop normal work,
revoke affected credentials, and follow an incident-specific cleanup plan.

## What never synchronizes

- Codex sessions, memories, caches, databases, and settings
- GitHub, SSH, browser, or connector credentials
- `.env` files, tokens, cookies, and local authentication state
- `node_modules`, build output, and machine-specific configuration
- Raw client/customer data and unredacted operational artifacts
