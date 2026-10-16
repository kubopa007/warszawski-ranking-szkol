---
name: implement
description: Implement the approved plan for the current issue in small verified steps, with tests, ending with a green pnpm check.
argument-hint: '[step or scope]'
---

Implement the approved plan ($ARGUMENTS if a specific step is given).

For each plan step:

1. Read only the files the step needs (use Grep/Glob to locate; don't read whole directories).
2. Write the test first when the behavior is clear (ranking rules, Zod schemas, permissions), then the code.
3. Run the narrowest check: `pnpm --filter <package> test` / `typecheck`. Show only failing output (trim to the relevant lines).
4. If the same fix fails twice, stop and report the cause and options — no third blind attempt.
5. Commit when a step is green: Conventional Commit message, `Refs #<issue>` in the body. Pushing happens in `/pr-prepare`, not here.

After all steps:

- `pnpm check` must pass.
- Optionally hand test gaps to the `qa-engineer` agent.
- Update docs/ADR if behavior or a decision changed (`/docs-update`).
- Report in Polish: what changed (files), test results, anything left or TBD. Next step: `/review`.

Stay inside the plan's scope; anything new goes to "follow-ups" in the report, not into the code.
