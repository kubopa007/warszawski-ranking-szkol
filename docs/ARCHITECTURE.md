# Architecture

> Źródło prawdy: [`source/architektura-techniczna.pdf`](source/architektura-techniczna.pdf). Decyzje: [adr/](adr/README.md).
> Ten plik opisuje strukturę kodu i granice modułów; nie powtarza uzasadnień z PDF.

## Przegląd

Jedna aplikacja **Next.js (App Router) z wbudowanym Payload CMS 3**, TypeScript strict, PostgreSQL (Neon, Frankfurt). Import danych oficjalnych działa osobno (GitHub Actions) i pisze tylko do strefy oficjalnej bazy.

```
przeglądarka ──► Vercel (fra1): Next.js + Payload ──► Neon Postgres (eu-central-1)
                     │  strony SSG/ISR, panel, API, zadania       ▲
                     ├─► Upstash Redis (limity, cache, budżet AI) │
                     ├─► Cloudflare R2 (pliki), Turnstile         │
                     ├─► Resend (e-mail), Sentry (błędy)          │
                     └─► Stripe (etap 2), model AI (etap 2)       │
GitHub Actions: packages/data-import ──► strefa oficjalna ────────┘
```

## Stack (zatwierdzony)

| Warstwa                | Wybór                                                                      | ADR             |
| ---------------------- | -------------------------------------------------------------------------- | --------------- |
| Framework + CMS        | Next.js App Router + Payload CMS 3                                         | 0001            |
| Baza / ORM             | PostgreSQL (Neon) + adapter Payload (Drizzle) + Drizzle dla tabel rankingu | 0002            |
| Repo / język           | monorepo pnpm, TypeScript strict                                           | 0003            |
| Wyszukiwarka           | Postgres FTS + pg_trgm + unaccent                                          | 0005 (Proposed) |
| Logowanie              | Better Auth (zapas: logowanie Payload)                                     | 0006 (Proposed) |
| Brzeg sieci            | Vercel Firewall; Cloudflare: DNS, R2, Turnstile                            | 0007 (Proposed) |
| Mapa                   | Leaflet + react-leaflet, kafelki Protomaps (R2) lub MapTiler               | 0008 (Proposed) |
| UI                     | Tailwind CSS + shadcn/ui (Radix), WCAG 2.1 AA                              | —               |
| Formularze / walidacja | React Hook Form + Zod (ta sama walidacja klient/serwer)                    | —               |
| i18n                   | next-intl, ścieżki `/pl` i `/en`, lokalizacja pól Payload                  | —               |
| Wykresy / PDF / e-mail | Recharts / @react-pdf/renderer (etap 2) / React Email                      | —               |
| Testy                  | Vitest, Testing Library, Playwright                                        | —               |
| Jakość                 | ESLint, Prettier, (lint-staged — TBD)                                      | —               |
| Geokodowanie           | PRG (GUGiK) przy imporcie                                                  | —               |

Wersje bibliotek: przypięte dokładnie w `package.json`; dobór przy starcie budowy — patrz ADR-0003.

## Struktura repozytorium

| Ścieżka                | Zawartość                                               | Status                                                   |
| ---------------------- | ------------------------------------------------------- | -------------------------------------------------------- |
| `apps/web`             | Next.js + Payload: strony, panel, API, zadania          | **do utworzenia** (po zatwierdzeniu wersji Next/Payload) |
| `packages/ranking`     | algorytm rankingu + testy na danych wzorcowych          | szkielet                                                 |
| `packages/data-import` | importy RSPO, CKE, kuratorium, WSZS, PRG                | do utworzenia                                            |
| `packages/emails`      | szablony React Email                                    | do utworzenia                                            |
| `packages/config`      | wspólne ESLint, TypeScript, Prettier (Tailwind później) | gotowe                                                   |
| `infra/`               | OpenTofu: DNS Cloudflare, projekt Vercel                | etap 2                                                   |

## Granice modułów (reguły twarde)

1. **`packages/ranking` jest czysty**: funkcje deterministyczne, wejście = dane oficjalne, wyjście = wyniki edycji. Bez I/O, bez importów z `apps/web`, bez dostępu do `entitlements`, `orders`, danych deklarowanych przez szkoły ani AI.
2. **`packages/data-import`** pisze wyłącznie do strefy oficjalnej; surowe pliki zapisuje w R2 jako dowód źródła.
3. **AI (etap 2)** czyta gotowe dane z bazy; wybór i kolejność szkół liczy SQL, model pisze tylko uzasadnienie. Wyłącznik awaryjny i dzienny budżet.
4. **Płatności (etap 2)**: funkcje premium sprawdzają tylko `entitlements`; cena nigdy z przeglądarki.
5. `apps/web` może importować z `packages/*`; pakiety **nie** importują z `apps/web`.

## Przepływ importu danych oficjalnych

1. Skrypt `data-import` (GitHub Actions, ręcznie lub cron) → surowy plik do R2.
2. Parsowanie do tabel tymczasowych, walidacja Zod, dopasowanie do RSPO (numer RSPO → REGON → nazwa+adres); niedopasowane → kolejka w panelu.
3. Raport różnic → zatwierdzenie moderatora → publikacja.
4. Przeliczenie rankingu jako nowa edycja w statusie szkicu → przegląd → publikacja. Poprzednie edycje zostają dostępne.

## SEO

Statyczne strony szkół i dzielnic (ISR), adresy typu `/pl/szkoly/mokotow/nazwa-szkoly`, sitemap, schema.org (`School`, `EducationalOrganization`), obrazki Open Graph. Dokładny schemat URL — **TBD**.

## Otwarte (TBD)

- Integracja Better Auth ↔ Payload — test w 1. tygodniu budowy (ADR-0006).
- Technika rozdzielenia stref danych i dwóch systemów migracji — [DATABASE.md](DATABASE.md#otwarte).
- Kolejka zadań Payload na Vercel Cron — limity czasu funkcji do sprawdzenia przy implementacji.
