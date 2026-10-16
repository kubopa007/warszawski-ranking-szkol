---
name: issue-start
description: Start work on a GitHub issue — read it, check Definition of Ready, create the feature branch from up-to-date main. Usage /issue-start <issue-number>
argument-hint: <issue-number>
disable-model-invocation: true
---

Start work on issue #$ARGUMENTS.

1. `git status --short` — if the tree is dirty, stop and ask what to do with the changes.
2. `gh issue view $ARGUMENTS --json number,title,body,labels,state` (if `gh` is missing or not logged in, ask the user to paste the issue).
3. Check Definition of Ready: clear goal, acceptance criteria, scope, dependencies resolved, no blocking TBD. If anything is missing, list it and stop.
4. Branch name: `<type>/<number>-<short-slug>` where type ∈ feat | fix | chore | docs | refactor | test (from the issue label/title). Slug: 3–5 English words, kebab-case.
5. `git switch main` → `git pull --ff-only` (skip pull if no remote) → `git switch -c <branch>`.
6. Report in Polish (max 10 lines): branch, goal, acceptance criteria, suggested next step (`/issue-plan` for non-trivial work, `/implement` for small changes).

Do not read source code yet — that is the planning step.
