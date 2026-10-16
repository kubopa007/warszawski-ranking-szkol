# Deployment

> **Stan: nic nie jest wdrożone, żadne konto chmurowe nie jest założone.** Projekt działa na darmowych planach (ADR-0010). Docelowy model z architektury poniżej; elementy płatne oznaczone.

## Środowiska

| Środowisko   | Aplikacja                    | Baza                               | Status                                                                                         |
| ------------ | ---------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| Lokalne      | `pnpm dev`                   | Neon Free, branch `dev`            | szkielet repo gotowy                                                                           |
| CI           | GitHub Actions               | kontener PostGIS                   | Etap 5                                                                                         |
| Podgląd (PR) | Vercel Preview               | branch Neon na PR                  | TBD — wymaga kont Vercel + Neon                                                                |
| Staging      | Vercel, gałąź `main`         | branch Neon z zanonimizowaną kopią | TBD                                                                                            |
| Produkcja    | Vercel fra1, ręczna promocja | Neon, gałąź główna                 | **poza zakresem** do decyzji o komercjalizacji (Vercel Hobby nie pozwala na użytek komercyjny) |

## Potok (docelowy)

1. **PR**: format, lint, typecheck, Vitest, testy rankingu, gitleaks, `pnpm audit`, CodeQL.
2. **Podgląd**: deploy Vercel, branch Neon z migracjami, Playwright e2e.
3. **Review**: min. 1 osoba + obowiązkowy przegląd AI dla rankingu, logowania, płatności (ADR-0010).
4. **Merge do `main`** (squash): deploy na staging, testy dymne.
5. **Produkcja**: migracje przed przełączeniem, ręczna promocja, instant rollback (migracje tylko addytywne — [DATABASE.md](DATABASE.md#migracje--zasady)).

## Rollback

- Kod: Vercel instant rollback do poprzedniego deploymentu.
- Baza: brak migracji destrukcyjnych → stary kod działa na nowej bazie; awaryjnie Neon PITR.

## Backup i odtwarzanie (docelowo)

- Neon PITR (okno zależne od planu; Free ma krótkie okno — sprawdzić przy zakładaniu konta).
- Co noc zaszyfrowany `pg_dump` do R2 z blokadą usuwania 30 dni (GitHub Actions) — TBD.
- Test odtworzenia co kwartał; cele RPO: minuty, RTO: 4 h.

## Monitoring (docelowo)

Sentry (błędy, wydajność, region UE), Better Stack (dostępność), Plausible (analityka bez ciasteczek), Vercel Speed Insights. Cele: dostępność 99,9%, LCP < 2,5 s (mobile), < 0,5% żądań z błędem. Progi alertów: [`source/architektura-techniczna.pdf`](source/architektura-techniczna.pdf).

## Konfiguracja zewnętrzna (ręczna, przez właściciela)

- [ ] Repozytorium GitHub (publiczne), ochrona gałęzi `main`, tylko squash merge.
- [ ] Neon Free: projekt Frankfurt, branch `dev`.
- [ ] Vercel Hobby + integracja Neon (podglądy) — gdy powstanie `apps/web`.
- [ ] Pozostałe usługi (Cloudflare, Upstash, Resend, Sentry, Stripe test) — gdy funkcja ich wymaga.
