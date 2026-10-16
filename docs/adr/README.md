# Architecture Decision Records

Krótkie zapisy decyzji. Nowa decyzja = nowy plik `NNNN-tytul.md` z szablonu poniżej; zmiana decyzji = nowy ADR, stary dostaje status `Superseded by NNNN`.
Statusy: `Proposed` (czeka na akceptację), `Accepted`, `Superseded`, `Rejected`.

| ADR                                      | Decyzja                                                  | Status   |
| ---------------------------------------- | -------------------------------------------------------- | -------- |
| [0001](0001-nextjs-payload-monolith.md)  | Jedna aplikacja Next.js z wbudowanym Payload CMS 3       | Accepted |
| [0002](0002-postgres-neon-drizzle.md)    | PostgreSQL na Neon (Frankfurt), Drizzle                  | Accepted |
| [0003](0003-pnpm-monorepo-typescript.md) | Monorepo pnpm, TypeScript strict, przypięte wersje       | Accepted |
| [0004](0004-deterministic-ranking.md)    | Ranking deterministyczny, odseparowany od płatności i AI | Accepted |
| [0005](0005-postgres-search.md)          | Wyszukiwanie w Postgres zamiast Meilisearch              | Proposed |
| [0006](0006-better-auth.md)              | Better Auth jako jedno logowanie dla wszystkich ról      | Proposed |
| [0007](0007-vercel-firewall-edge.md)     | Vercel Firewall; Cloudflare tylko DNS, R2, Turnstile     | Proposed |
| [0008](0008-map-tiles.md)                | Kafelki mapy Protomaps (R2) lub MapTiler                 | Proposed |
| [0009](0009-dev-without-docker.md)       | Development bez Dockera: Neon branch, PostGIS w CI       | Accepted |
| [0010](0010-open-source-free-tier.md)    | Open source na darmowych planach                         | Accepted |

## Szablon

```markdown
# NNNN. Tytuł

Status: Proposed | Data: RRRR-MM-DD

## Kontekst

## Decyzja

## Konsekwencje
```
