# 0002. PostgreSQL na Neon (Frankfurt) z Drizzle

Status: Accepted | Data: 2026-10-16

## Kontekst

Dane relacyjne (szkoły, wyniki, lata, dzielnice), geodane, wyszukiwanie z literówkami, dane w UE.

## Decyzja

PostgreSQL na Neon w AWS eu-central-1 z rozszerzeniami PostGIS, pg_trgm, unaccent. Adapter Postgres Payload (Drizzle) dla kolekcji + Drizzle dla tabel rankingu. Migracje w repo, tylko addytywne.

## Konsekwencje

Branch bazy na każdy PR, PITR. Otwarte: technika rozdzielenia stref danych i współistnienie dwóch systemów migracji — osobny ADR przed pierwszą migracją ([DATABASE.md](../DATABASE.md#otwarte)).
