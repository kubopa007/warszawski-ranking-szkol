# Database

> PostgreSQL na Neon (Frankfurt, `eu-central-1`), rozszerzenia: PostGIS, pg_trgm, unaccent. ADR-0002.
> Kolumny i typy **nie są jeszcze zaprojektowane** — powstają razem z kolekcjami Payload. Poniżej tylko ustalenia z dokumentu architektury.

## Strefy danych

| Strefa                      | Kto pisze                                                 | Kto czyta                                         |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------- |
| **Oficjalna**               | tylko import (`data-import`) i algorytm rankingu (wyniki) | wszyscy; `ranking_engine` **wyłącznie** tę strefę |
| **Edytowalna przez szkoły** | szkoła (szkic) → moderacja; pełna historia wersji         | aplikacja, AI (etap 2)                            |
| **Handlowa**                | Better Auth, panel, webhooki Stripe                       | aplikacja (nigdy ranking)                         |

## Kolekcje / tabele (z architektury)

| Kolekcja                                  | Zawartość                                                                                 | Strefa              | Kto zmienia                         |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------- | ----------------------------------- |
| `schools`                                 | RSPO, REGON, typ, publiczna/niepubliczna, dzielnica, adres, współrzędne, oficjalny e-mail | oficjalna           | tylko import (zablokowane w panelu) |
| `school_profiles`                         | opis, zdjęcia, oferta, języki, zajęcia, czesne, profil mocnych stron, tłumaczenia         | szkoły              | szkoła: szkic → moderacja           |
| `open_days`                               | dni otwarte, terminy rekrutacji                                                           | szkoły              | szkoła, moderacja                   |
| `exam_results`                            | szkoła, rok, przedmiot, liczba zdających, średni wynik                                    | oficjalna           | import CKE                          |
| `contest_awards`                          | laureaci/finaliści konkursów kuratoryjnych                                                | oficjalna           | import kuratorium                   |
| `sport_awards`                            | wyniki WOM                                                                                | oficjalna           | import WSZS                         |
| `ranking_editions`                        | edycja, wersja metodologii, wagi, status szkic/opublikowana                               | oficjalna           | moderator                           |
| `ranking_scores`                          | wynik i składowe, pozycje (ogólna, dzielnica, grupa)                                      | oficjalna           | tylko algorytm                      |
| `users`, `organizations`, `members`       | konta, szkoła jako organizacja, role                                                      | handlowa            | Better Auth + panel                 |
| `entitlements`, `orders`, `stripe_events` | uprawnienia z płatności, zamówienia, zdarzenia Stripe (etap 2)                            | handlowa            | tylko webhooki                      |
| `match_requests`, `ai_usage`              | anonimowe odpowiedzi kwestionariusza, koszt AI (etap 2)                                   | handlowa            | aplikacja                           |
| `audit_log`                               | kto, co, kiedy, IP, wartość przed/po                                                      | osobna, append-only | tylko dopisywanie                   |

## Migracje — zasady

- Migracje **w repozytorium**, generowane narzędziem (Payload migrate / drizzle-kit), nigdy ręczne zmiany na bazie.
- **Tylko addytywne** (nowe tabele/kolumny); usuwanie i zmiany typu w modelu _expand → migrate → contract_ w osobnych wdrożeniach — starsza wersja kodu musi działać na nowej bazie (instant rollback).
- Produkcja: migracje Payload **przed** przełączeniem wersji.
- Każdy PR z migracją: opis w PR + sprawdzenie na branchu Neon.

## Środowiska bazy

| Środowisko          | Baza                                                                              |
| ------------------- | --------------------------------------------------------------------------------- |
| Lokalne             | Neon Free — osobisty branch `dev` (ADR-0009); opcjonalnie Docker Postgres+PostGIS |
| CI                  | kontener `postgis/postgis` w GitHub Actions                                       |
| Podgląd PR          | branch Neon na PR z migracjami (wymaga integracji Vercel↔Neon — TBD)              |
| Staging / produkcja | branch Neon z zanonimizowaną kopią / gałąź główna Neon                            |

Nigdy nie używamy produkcyjnych danych użytkowników lokalnie ani w testach.

## Otwarte

- **Rozdzielenie stref**: osobne schematy Postgres (`official`, `school`, `commerce`, `audit`) i rola `ranking_engine` z `SELECT` tylko na `official` + zapis do `ranking_scores`? Jak to pogodzić z jednym połączeniem Payload — **TBD, ADR do napisania przed pierwszą migracją**.
- **Dwa systemy migracji** (Payload i Drizzle dla tabel rankingu) w jednej bazie: kolejność, nazwy, uniknięcie konfliktów — **TBD**.
- Append-only `audit_log`: wymuszenie na poziomie uprawnień bazy (REVOKE UPDATE/DELETE) — **TBD**.
- Dane wzorcowe (fixtures) do testów rankingu — źródło i anonimizacja — **TBD**.
