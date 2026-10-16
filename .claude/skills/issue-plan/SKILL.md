---
name: issue-plan
description: Analyze and plan implementation of the current issue before writing code. Delegates analysis to the architect agent for non-trivial changes and saves the plan to the issue branch context.
argument-hint: '[issue-number]'
---

Plan the implementation of issue $ARGUMENTS (or the issue from the current branch name).

1. Get the issue goal and acceptance criteria (already in context, or `gh issue view <n>`).
2. Size it:
   - **Small** (≤ 3 files, no data model / permissions / ranking change): plan inline in ≤ 10 lines.
   - **Otherwise**: delegate to the `architect` agent with the issue text and acceptance criteria. Don't read the codebase yourself in parallel.
3. The plan must list: steps with files, tests per step, docs/ADR to update, open questions.
4. If there are blocking questions or anything requires owner approval (see CLAUDE.md "AI autonomy limits"), stop and ask.
5. Present the plan in Polish and wait for approval before `/implement`.

Keep the plan in the conversation; for multi-session work, post it as an issue comment only if the user asks (`gh issue comment`).
