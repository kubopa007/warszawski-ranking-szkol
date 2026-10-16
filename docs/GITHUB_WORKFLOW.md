# GitHub workflow

Issue → branch → kod + testy → `pnpm check` → PR → review → squash merge. Skille Claude Code dla każdego kroku: [AI_WORKFLOW.md](AI_WORKFLOW.md#1-cykl-pracy-nad-issue).

## Issues

### Struktura

- **Epik** (`type: epic`) = obszar funkcjonalny z etapu MVP; zawiera checklistę pod-Issues (`- [ ] #12`).
- **Issue** = zmiana mieszcząca się w jednym PR (orientacyjnie ≤ 1–2 dni pracy, ≤ ~400 linii diffu bez lockfile).
- Większe → podziel; badanie niepewności → `Technical task` typu _spike_ z wynikiem w ADR.

### Proponowane epiki MVP (do akceptacji — nie zostały utworzone)

| #   | Epik                                                                                                                                         | Zależy od |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| E1  | Fundament `apps/web`: Next.js + Payload, i18n `/pl`, połączenie z Neon, CI z buildem                                                         | —         |
| E2  | Spike'i z 1. tygodnia: Better Auth ↔ Payload (ADR-0006), dane E8 dla szkół niepublicznych, format list kuratorium, rozdzielenie stref danych | E1        |
| E3  | Model danych i migracje stref oficjalnej i szkolnej                                                                                          | E2        |
| E4  | Import RSPO + PRG (katalog szkół)                                                                                                            | E3        |
| E5  | Importy CKE, kuratorium, WSZS                                                                                                                | E3, E2    |
| E6  | Silnik rankingu + edycje (`packages/ranking`)                                                                                                | E5        |
| E7  | Strony publiczne: katalog, profil, mapa, porównywarka, dni otwarte, SEO                                                                      | E4        |
| E8  | Konta, przejęcie profilu, panel szkoły, moderacja                                                                                            | E2, E3    |

### Nazewnictwo

Tytuł w stylu Conventional Commits: `feat(ranking): wynik egzaminu względem średniej Warszawy`, `fix(import): duplikaty przy ponownym imporcie RSPO`, `chore(ci): cache pnpm`. Scope = obszar (`ranking`, `import`, `web`, `panel`, `auth`, `db`, `ci`, `docs`).

### Etykiety

Definicje: [`.github/labels.yml`](../.github/labels.yml) — `type:`, `priority: P0–P3`, `area:`, `status:`, `security-review`, `dependencies`.
Każde Issue: dokładnie jedna `type:`, jedna `priority:`, co najmniej jedna `area:`.

Utworzenie etykiet (ręcznie, po `gh auth login`; domyślne etykiety GitHub zostają):

```bash
gh label create "type: feature" --color 1d76db --description "Nowa funkcjonalność"
```

(analogicznie dla pozostałych wpisów z `labels.yml`; AI może przygotować pełną listę komend na prośbę).

### Zależności

- W treści Issue: `Blocked by #N` (blokujące), `Part of #N` (epik).
- Zablokowane Issue dostaje `status: blocked`; po odblokowaniu → `status: ready`.
- Opcjonalnie: natywne „sub-issues” i relacje „blocked by” w GitHub.

### Definition of Ready

- [ ] Cel i sprawdzalne kryteria akceptacji
- [ ] Zakres i „poza zakresem”
- [ ] Zależności rozwiązane lub jawnie oznaczone
- [ ] Brak blokujących `TBD` (albo jest spike, który je rozstrzyga)
- [ ] Etykiety type / priority / area
- [ ] Mieści się w jednym PR

### Definition of Done

Zgodnie z [`CLAUDE.md`](../CLAUDE.md#definition-of-done): kryteria spełnione · testy · `pnpm check` + CI zielone · docs/ADR zaktualizowane · review (w tym `security-reviewer` dla obszarów krytycznych) · PR zmergowany squashem · Issue zamknięte przez `Closes #N`.

## GitHub Projects (opcjonalnie, darmowe)

Jedna tablica „WRS — MVP” z kolumnami: `Backlog → Ready → In progress → In review → Done`, polami _Priority_, _Area_, _Epic_. Wbudowane automatyzacje: nowe Issue → Backlog, PR zmergowany → Done. Tworzysz ręcznie w GitHub (AI nie zakłada zasobów bez zgody).

## Branche

`<type>/<issue>-<slug>` — np. `feat/12-exam-score-normalization`, `fix/31-rspo-duplicates`, `chore/5-ci-cache`.
Typy: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`. Zawsze od aktualnego `main`; krótko żyjące; usuwane po merge.

## Commity

[Conventional Commits](https://www.conventionalcommits.org/): `type(scope): opis w trybie rozkazującym, po angielsku`.
W treści: `Refs #N`. Commity na branchu mogą być robocze — liczy się tytuł PR (squash).

## Pull Requests

- Szablon: [`.github/pull_request_template.md`](../.github/pull_request_template.md); pierwsza linia `Closes #N`.
- Tytuł PR = przyszły commit na `main` (Conventional Commits, ≤ 70 znaków).
- Jeden PR = jedno Issue. Draft PR dla wczesnej informacji zwrotnej.
- Tworzy: `/pr-prepare` (po Twoim potwierdzeniu AI pushuje branch i wykonuje `gh pr create`; merge zawsze Ty).

### Checklista code review

1. Spełnia kryteria akceptacji Issue — nic więcej, nic mniej.
2. Twarde reguły z `CLAUDE.md` (ranking izolowany, Zod, autoryzacja na serwerze, migracje addytywne, brak sekretów).
3. Testy sprawdzają zachowanie; przypadki brzegowe; uprawnienia per rola.
4. Czytelność i spójność z otoczeniem; brak martwego kodu i TODO bez Issue.
5. Zależności: dokładne wersje, uzasadnienie, licencja.
6. Dokumentacja/ADR.

Recenzenci: właściciel + `code-reviewer`; dodatkowo `security-reviewer` dla rankingu, auth, uprawnień, płatności, uploadów, importu (ADR-0010).

### Merge

- **Tylko squash merge**; branch usuwany automatycznie.
- Warunki: CI zielone (`CI / check`, `CI / audit`, `Security / gitleaks`, `Security / CodeQL`), rozwiązane wątki review, branch aktualny z `main`.
- Merge wykonuje właściciel. AI nie merguje (blokada w `.claude/settings.json`).

## CI

| Workflow                                            | Kiedy                | Kroki                                                                                            |
| --------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| [`ci.yml`](../.github/workflows/ci.yml)             | PR, push do `main`   | install (frozen lockfile), format, lint, typecheck, test, build; `pnpm audit --audit-level=high` |
| [`security.yml`](../.github/workflows/security.yml) | PR, push, co tydzień | gitleaks, CodeQL (darmowy dla repo publicznego)                                                  |
| Renovate ([`renovate.json`](../renovate.json))      | poniedziałki         | PR z aktualizacjami, wersje ≥ 3 dni, akcje przypięte do SHA                                      |

Do dodania później: testy integracyjne z kontenerem PostGIS (pierwszy `*.int.test.ts`), Playwright e2e (po `apps/web`), podglądy Vercel (po założeniu konta).

## Konfiguracja ręczna (właściciel)

1. Utwórz **publiczne** repozytorium (bez README/licencji — są lokalnie), potem:
   ```bash
   gh auth login
   git remote add origin https://github.com/<login>/<repo>.git
   git push -u origin main
   ```
2. Settings → General → Pull Requests: zaznacz tylko **Allow squash merging**, włącz **Automatically delete head branches**.
3. Settings → Rules → Rulesets → nowy ruleset dla `main`: wymagaj PR, wymagaj status checks (`check`, `audit`, `gitleaks`, `CodeQL` — pojawią się po pierwszym uruchomieniu CI), blokuj force push i usuwanie. Przy jednym właścicielu **nie** ustawiaj wymaganej liczby zatwierdzeń (nie da się zatwierdzić własnego PR).
4. Settings → Code security: Dependabot alerts, secret scanning + push protection, private vulnerability reporting.
5. Zainstaluj aplikację **Renovate** (github.com/apps/renovate, darmowa) dla repozytorium.
6. Etykiety z `labels.yml`, opcjonalnie tablica Projects.
7. Wybierz licencję (TBD) i dodaj `LICENSE`.
