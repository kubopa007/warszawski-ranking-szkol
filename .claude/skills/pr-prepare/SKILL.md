---
name: pr-prepare
description: Prepare a pull request for the current branch — verify Definition of Done, draft title and description from the template. Pushes and creates the PR only after explicit user confirmation.
disable-model-invocation: true
---

Prepare a PR for the current branch.

1. Verify Definition of Done (CLAUDE.md): `pnpm check` green, tests for new logic, docs/ADR updated, review done (`/review`), no TODO without issue, no secrets (`git diff main...HEAD` scan for keys/tokens/.env content).
2. Get the issue number from the branch name.
3. Draft:
   - Title: Conventional Commit style, ≤ 70 chars (becomes the squash-merge commit).
   - Body: fill `.github/pull_request_template.md` if present; must include `Closes #<n>`, summary, how it was tested, risks, docs updated.
4. Show the draft and ask: push branch and create PR? Only after an explicit yes:
   - `git push -u origin <branch>`
   - `gh pr create --title "..." --body-file <tmp-file> --base main`
5. Report the PR URL. Never merge.
