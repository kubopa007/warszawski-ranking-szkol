---
name: review
description: Review the current branch before a PR — runs checks, then the code-reviewer agent, and the security-reviewer agent when security-critical paths changed.
---

Review the current branch against `main`.

1. `git diff --stat main...HEAD` and `git status --short` — summarize scope in 2–3 lines.
2. `pnpm check` — if it fails, stop and report the failing lines only.
3. Delegate to the `code-reviewer` agent (pass the branch name and issue goal; let it read the diff itself).
4. If the diff touches `packages/ranking/`, auth, sessions, roles/access, payments/webhooks, uploads, data import, `.env.example` or dependencies → also delegate to the `security-reviewer` agent. Run both agents in parallel.
5. Merge the results into one list in Polish, ordered by severity, with `path:line`. Don't repeat findings.
6. Ask the user which findings to fix. Fix only approved ones, then re-run `pnpm check` (no second full agent review unless the fixes were substantial).

Built-in alternatives the user can run themselves: `/code-review`, `/security-review`.
