# 0009. Development bez Dockera

Status: Accepted | Data: 2026-10-16

## Kontekst

Architektura zakładała Docker Compose (Postgres+PostGIS, Mailpit). Na stacji roboczej (Windows 11 Home) Docker nie jest zainstalowany, a właściciel nie chce instalować zbędnego oprogramowania.

## Decyzja

- Lokalna baza: osobisty branch `dev` w Neon Free (ten sam dostawca co produkcja).
- CI: kontener `postgis/postgis` jako service w GitHub Actions.
- E-maile w development: log do konsoli zamiast Mailpit.
- Docker pozostaje opcją na później.

## Konsekwencje

Development wymaga internetu i konta Neon. Testy integracyjne lokalnie: osobny branch Neon `test` albo tylko w CI — do ustalenia przy pierwszym teście integracyjnym.
