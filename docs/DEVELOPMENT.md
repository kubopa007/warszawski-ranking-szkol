# Development

## Wymagania

| Narzędzie  | Wersja                                      | Instalacja (Windows, oficjalne źródła)             |
| ---------- | ------------------------------------------- | -------------------------------------------------- |
| Node.js    | 24 LTS (`.nvmrc`)                           | `winget install OpenJS.NodeJS.LTS`                 |
| pnpm       | 12.11.2 (`packageManager` w `package.json`) | `npm install -g pnpm@12.11.2`                      |
| Git        | ≥ 2.40                                      | `winget install Git.Git`                           |
| GitHub CLI | aktualna                                    | `winget install GitHub.cli`, potem `gh auth login` |
| Docker     | **niewymagany** (ADR-0009)                  | opcjonalnie Docker Desktop + WSL2                  |

## Pierwsze uruchomienie

```bash
pnpm install
cp .env.example .env   # uzupełnij wartości — patrz niżej
pnpm check             # format + lint + typecheck + testy
```

`apps/web` jeszcze nie istnieje — `pnpm dev` pojawi się po jego utworzeniu (ADR-0001, ADR-0003).

## Baza danych w development (ADR-0009)

1. Załóż darmowe konto Neon, projekt w regionie **AWS eu-central-1 (Frankfurt)**.
2. Utwórz branch `dev` (osobny na osobę), włącz rozszerzenia: `CREATE EXTENSION postgis; CREATE EXTENSION pg_trgm; CREATE EXTENSION unaccent;`
3. Connection string z `sslmode=require` wpisz do `.env` jako `DATABASE_URL`.
4. Migracje: komenda **TBD** (po utworzeniu `apps/web`).

Alternatywa offline: Docker `postgis/postgis` — konfiguracja `docker-compose.yml` **TBD**, dodamy jeśli będzie potrzebna.

E-maile w development: bez `RESEND_API_KEY` treść e-maila logowana do konsoli (do zaimplementowania w `packages/emails`).

## Komendy

| Komenda                                  | Co robi                                    |
| ---------------------------------------- | ------------------------------------------ |
| `pnpm check`                             | wszystko poniżej — uruchom przed każdym PR |
| `pnpm format` / `pnpm format:check`      | Prettier zapis / sprawdzenie               |
| `pnpm lint`                              | ESLint (flat config z `packages/config`)   |
| `pnpm typecheck`                         | `tsc` w każdym pakiecie                    |
| `pnpm test`                              | Vitest w każdym pakiecie                   |
| `pnpm --filter @wrs/ranking test`        | testy jednego pakietu                      |
| `pnpm --filter @wrs/ranking exec vitest` | tryb watch                                 |

## Testy

| Rodzaj       | Narzędzie                                | Gdzie                 | Obowiązkowe dla                                                  |
| ------------ | ---------------------------------------- | --------------------- | ---------------------------------------------------------------- |
| Jednostkowe  | Vitest                                   | `*.test.ts` obok kodu | logika domenowa, ranking (100% reguł metodologii), walidacja Zod |
| Komponentów  | Vitest + Testing Library                 | `apps/web`            | interaktywne komponenty                                          |
| Uprawnień    | Vitest + Payload Local API               | `apps/web`            | każda kolekcja × każda rola                                      |
| Integracyjne | Vitest + Postgres (CI: kontener PostGIS) | `*.int.test.ts`       | importy, zapytania wyszukiwarki, migracje                        |
| E2E          | Playwright                               | `apps/web/e2e`        | ścieżki krytyczne: przejęcie profilu, moderacja, (etap 2) zakup  |

## Debugowanie

- Node/Next: `NODE_OPTIONS=--inspect pnpm dev` + VS Code „Attach to Node”.
- Testy: `pnpm --filter <pakiet> exec vitest --inspect-brk --no-file-parallelism`.
- SQL: logowanie zapytań Drizzle tylko lokalnie (flaga — TBD).

## Konwencje

- TypeScript strict, bez `any`; `import type` dla typów.
- Pliki: `kebab-case.ts`; komponenty React: `PascalCase.tsx`.
- Testy obok kodu; dane wzorcowe w `__fixtures__/`.
- Wersje zależności przypięte dokładnie (bez `^`).
- Branche, commity, PR: [GITHUB_WORKFLOW.md](GITHUB_WORKFLOW.md).
