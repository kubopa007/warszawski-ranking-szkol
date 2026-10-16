# 0005. Wyszukiwanie w Postgres zamiast Meilisearch

Status: Proposed (termin: 2026-11-15) | Data: 2026-10-16

## Kontekst

Biznesplan zakładał Meilisearch; ok. 1,5 tys. placówek to mało danych.

## Decyzja

MVP: wyszukiwanie pełnotekstowe Postgres + pg_trgm (literówki) + unaccent. Meilisearch Cloud dopiero, gdy fasety przestaną wystarczać.

## Konsekwencje

Jedna usługa mniej, niższy koszt. Wymaga indeksów GIN i testów jakości wyszukiwania po polsku.
