# CLAUDE.md — Warszawski Ranking Szkół

School ranking + catalog portal for Warsaw. Open source, solo learning project, free-tier services only.
Reply to the user in **Polish**. Code, identifiers and commit messages in English; user-facing UI text in Polish via next-intl.

## Read on demand (do not preload)

| Need                          | File                                                                      |
| ----------------------------- | ------------------------------------------------------------------------- |
| Scope, roles, stages          | `docs/PROJECT_OVERVIEW.md`                                                |
| Modules, boundaries, stack    | `docs/ARCHITECTURE.md`                                                    |
| Data model, zones, migrations | `docs/DATABASE.md`                                                        |
| API rules                     | `docs/API.md`                                                             |
| Auth, roles, secrets, GDPR    | `docs/SECURITY.md`                                                        |
| Commands, tests, debugging    | `docs/DEVELOPMENT.md`                                                     |
| Decisions                     | `docs/adr/README.md` (index first, then one ADR)                          |
| AI workflow, token rules      | `docs/AI_WORKFLOW.md`                                                     |
| Original spec (17 pages)      | `docs/source/architektura-techniczna.pdf` — only if docs/ lack the answer |

## Stack (approved — do not change without an ADR + owner approval)

Next.js App Router + Payload CMS 3 (`apps/web`) · PostgreSQL on Neon + Drizzle · TypeScript strict · pnpm monorepo · Tailwind + shadcn/ui · React Hook Form + Zod · next-intl · Vitest, Testing Library, Playwright · ESLint + Prettier.
Versions are pinned exactly; TypeScript stays on 6.0.x (ADR-0003). No Docker locally (ADR-0009).

## Hard rules

1. **Payment never affects ranking or AI match.** `packages/ranking` is pure and deterministic: official data in, scores out; no I/O, no imports from `apps/web`, no access to commerce or school-declared data (ADR-0004).
2. Packages never import from `apps/web`.
3. Zod validation on every input; authorization checked server-side; never trust role/price/org id from the client.
4. Migrations: generated, committed, **additive only** (expand → contract across deploys).
5. Never read, print or edit `.env*` (except `.env.example`). No secrets in code, logs, tests or fixtures. Test keys only.
6. No personal data of children stored; user data never used for testing.

## Conventions

- Files `kebab-case.ts`, React components `PascalCase.tsx`; `import type` for types; no `any`.
- Tests next to code (`*.test.ts`, integration `*.int.test.ts`); fixtures in `__fixtures__/`.
- New dependency → exact version, published > 24 h ago, justify in PR.
- Small focused changes; no drive-by refactors; match surrounding code.

## Workflow

Issue → branch `type/<issue>-<slug>` → plan → code + tests → `pnpm check` → PR (`Closes #N`) → review → squash merge.
Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`), scope optional.
Skills: `/issue-start`, `/issue-plan`, `/implement`, `/review`, `/debug`, `/pr-prepare`, `/docs-update`.

**Mandatory before saying "done":** `pnpm check` passes (format, lint, typecheck, tests). Changes in `packages/ranking`, auth, payments or permissions also need the `security-reviewer` agent.

## Definition of Done

Acceptance criteria met · tests for new logic (ranking rules 100%, each role × collection for permissions) · `pnpm check` green · docs/ADR updated if behavior or decision changed · no TODO without an issue · PR description complete.

## AI autonomy limits — ask the owner first

- Changing the stack, architecture, data zones, ranking methodology or weights.
- Adding a dependency, service, MCP server or paid resource.
- `git push`, merge, rebase of shared branches, deleting branches/files, force operations.
- Creating GitHub issues/labels/PRs or changing repo settings.
- Any deploy, any cloud account action.
- Anything marked **TBD** in docs — surface it, don't invent it.

If a fix fails twice the same way, stop and report instead of looping.
