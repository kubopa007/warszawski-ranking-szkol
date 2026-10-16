---
paths:
  - 'packages/ranking/**'
---

# Ranking engine rules (ADR-0004)

- Pure, deterministic functions only: same input → same output. No I/O, no `Date.now()`/`Math.random()` (pass time/seed as input), no env access.
- Input = official data only (exam results, contest awards, sport awards, school registry). Never accept entitlements, orders, school-declared profile data or AI output.
- No imports from `apps/web`, Payload, Drizzle or any DB client. Persistence happens outside this package.
- Weights and thresholds come from the methodology version (`ranking_editions`), never hard-coded magic numbers in logic.
- Every methodology rule has unit tests on reference fixtures in `__fixtures__/`; changing a rule = new methodology version + updated docs + owner approval.
- Changes here require the `security-reviewer` agent before PR.
