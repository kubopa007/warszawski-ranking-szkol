---
paths:
  - '**/*.test.ts'
  - '**/*.test.tsx'
  - '**/__fixtures__/**'
  - 'apps/web/e2e/**'
---

# Tests

- Vitest for unit/integration, Testing Library for components, Playwright for e2e (critical paths only).
- Test behavior through the public API of the module; no testing private internals.
- Deterministic: no real network, no wall-clock time, no random without a seed.
- Integration tests (`*.int.test.ts`) use a disposable database (CI PostGIS container or a dedicated Neon `test` branch) — never the `dev` branch data, never production.
- Fixtures: synthetic or public official data; no real personal data, no secrets.
- When a test fails, fix the cause; never weaken or skip an assertion to make it pass without stating why.
