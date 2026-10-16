# 0003. Monorepo pnpm, TypeScript strict, przypięte wersje

Status: Accepted | Data: 2026-10-16

## Kontekst

Aplikacja, algorytm rankingu, importy, e-maile i konfiguracja mają osobne granice, ale wspólne narzędzia.

## Decyzja

Monorepo pnpm (`apps/*`, `packages/*`), TypeScript strict, Node 24 LTS, wersje przypięte dokładnie. Stan na 2026-10-16: pnpm 12.11.2, TypeScript **6.0.3**, ESLint 10.12, typescript-eslint 8.71, Prettier 3.9, Vitest 5.0.4.

TypeScript 7.x pominięty — typescript-eslint 8.71 wspiera TS `<6.1`. pnpm: `minimumReleaseAge` 24 h (ochrona przed świeżo opublikowanymi, potencjalnie złośliwymi wersjami).

## Konsekwencje

Przejście na TS 7 po wsparciu w typescript-eslint i Payload (nowy ADR). Wersje Next.js/Payload dobierane przy tworzeniu `apps/web`.
