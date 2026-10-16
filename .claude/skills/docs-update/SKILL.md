---
name: docs-update
description: Update project documentation and ADRs after a change in behavior, data model, API, security or a decision. Keeps docs concise and non-duplicated.
argument-hint: '[what changed]'
---

Update documentation for: $ARGUMENTS (or the current branch diff).

1. From `git diff main...HEAD --stat` decide which docs are affected:
   - data model / migrations → `docs/DATABASE.md`
   - endpoints, actions, webhooks → `docs/API.md` (one row per endpoint)
   - roles, auth, secrets, headers → `docs/SECURITY.md`
   - commands, env vars, setup → `docs/DEVELOPMENT.md` + `.env.example`
   - modules, boundaries → `docs/ARCHITECTURE.md`
   - a decision (new tech, changed rule, rejected alternative) → new ADR in `docs/adr/` + index row
2. Edit only the affected sections. One fact lives in one place — link instead of copying.
3. Replace a `TBD` only with a decision that was actually made (cite the issue/PR/ADR). Never invent values.
4. Keep `CLAUDE.md` unchanged unless a hard rule or convention changed (ask first).
5. Run `pnpm format`, report changed files in Polish.
