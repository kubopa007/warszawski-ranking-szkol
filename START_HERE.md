# START HERE — codzienna praca z projektem

Praktyczny przewodnik. Szczegóły są w `docs/` — tu tylko kroki, komendy i gotowe prompty.

## 0. Jednorazowo, przed pierwszym Issue

- [ ] Repozytorium na GitHub + pierwszy push, ustawienia repo, Renovate, etykiety → [GITHUB_WORKFLOW.md § Konfiguracja ręczna](docs/GITHUB_WORKFLOW.md#konfiguracja-ręczna-właściciel)
- [ ] `gh auth login`
- [ ] Konto Neon Free + branch `dev` → [DEVELOPMENT.md § Baza danych](docs/DEVELOPMENT.md#baza-danych-w-development-adr-0009) (potrzebne dopiero z `apps/web`)
- [ ] Decyzje z ADR „Proposed” (termin 15.11.2026) → [docs/adr](docs/adr/README.md)

## 1. Uruchomienie projektu lokalnie

```bash
pnpm install
```

```bash
pnpm check
```

`cp .env.example .env` i uzupełnienie wartości — gdy pojawi się `apps/web` (wtedy też `pnpm dev`). Problemy na Windows → [DEVELOPMENT.md § Rozwiązywanie problemów](docs/DEVELOPMENT.md#rozwiązywanie-problemów-windows).

## 2. Claude Code w projekcie

- **Aplikacja desktopowa (zakładka Code)**: nowa sesja → folder projektu. `CLAUDE.md`, agenci, skille, reguły i hooki ładują się automatycznie.
- **Terminal** (jeśli zainstalujesz CLI): `cd` do projektu → `claude`.
- Po zmianie plików w `.claude/` uruchom nową sesję.
- Wybór modelu: domyślnie Sonnet; Opus dla planowania trudnych zmian (agenci robią to sami) → [AI_WORKFLOW.md § Dobór modeli](docs/AI_WORKFLOW.md#2-dobór-modeli).

## 3. Nowe Issue — od zera do PR

| Krok                           | Wpisz w Claude Code                               |
| ------------------------------ | ------------------------------------------------- |
| Założenie Issue (Ty, w GitHub) | szablon Feature / Bug / Technical task            |
| Start                          | `/issue-start 12`                                 |
| Plan                           | `/issue-plan` → przeczytaj, zaakceptuj lub popraw |
| Kod + testy                    | `/implement`                                      |
| Review                         | `/review`                                         |
| PR                             | `/pr-prepare` → potwierdź push i utworzenie PR    |
| Merge                          | Ty, w GitHub (squash)                             |
| Następne Issue                 | `/clear` lub nowa sesja                           |

Gotowe prompty:

```text
Napisz treść Issue (szablon Feature) dla: <opis>. Podaj kryteria akceptacji i zależności. Nie twórz Issue w GitHub.
```

```text
Podziel epik "<nazwa>" na Issues mieszczące się w jednym PR. Tylko lista z tytułami, zależnościami i kryteriami — bez tworzenia w GitHub.
```

## 4. Delegowanie do agentów

Skille robią to same; ręcznie tylko gdy chcesz konkretnej analizy.

```text
Użyj agenta architect: jak zaprojektować <zmiana>? Ograniczenia: <...>.
```

```text
Użyj agenta security-reviewer dla zmian na tym branchu.
```

```text
Użyj agenta qa-engineer: sprawdź kryteria akceptacji Issue #12 i dopisz brakujące testy.
```

Kiedy który agent i kiedy żaden → [AI_WORKFLOW.md § Subagenci](docs/AI_WORKFLOW.md#3-subagenci--kiedy-tak-kiedy-nie).

## 5. Testy

```bash
pnpm check
```

```bash
pnpm --filter @wrs/ranking test
```

```bash
pnpm --filter @wrs/ranking exec vitest
```

Rodzaje testów i co jest obowiązkowe → [DEVELOPMENT.md § Testy](docs/DEVELOPMENT.md#testy). Błąd testu:

```text
/debug <wklej nazwę testu i 5–10 linii błędu>
```

## 6. Code review

- `/review` — `pnpm check` + `code-reviewer` (+ `security-reviewer` dla rankingu, auth, płatności, uploadów, importu).
- Wbudowane alternatywy: `/code-review`, `/security-review`.
- Checklista dla Ciebie → [GITHUB_WORKFLOW.md § Checklista](docs/GITHUB_WORKFLOW.md#checklista-code-review).

```text
Popraw tylko uwagi 1 i 3 z review, potem pnpm check.
```

## 7. Pull Request

`/pr-prepare` sprawdza Definition of Done, przygotowuje tytuł i opis z szablonu, a push i `gh pr create` wykonuje **dopiero po Twojej zgodzie**.

```bash
gh pr view --web
```

## 8. Merge

W GitHub: **Squash and merge** po zielonym CI i rozwiązanych wątkach. Potem lokalnie:

```bash
git switch main
```

```bash
git pull --ff-only
```

AI nie merguje i nie pushuje bez zgody (twarde blokady w `.claude/settings.json` i hooku).

## 9. Dokumentacja

```text
/docs-update
```

```text
Zapisz decyzję jako nowy ADR: <decyzja, alternatywy, powód>. Zaktualizuj indeks ADR.
```

Co gdzie trafia → [AI_WORKFLOW.md § Utrwalanie wiedzy](docs/AI_WORKFLOW.md#7-utrwalanie-wiedzy-w-repozytorium).

## 10. Kontekst i tokeny — 6 zasad

1. Jedno Issue = jedna sesja; po merge `/clear` lub nowa sesja.
2. Długa sesja przy tym samym zadaniu → `/compact zachowaj plan i listę zmienionych plików`.
3. Wskazuj pliki i linie zamiast „przeczytaj projekt”.
4. Wklejaj tylko istotne linie logów.
5. Agenci tylko dla dużych analiz i review — nie dla drobnych zmian.
6. Jeśli AI dwa razy poprawia to samo bez skutku — przerwij (Esc) i zmień podejście.

Pełna strategia → [docs/AI_WORKFLOW.md](docs/AI_WORKFLOW.md).

## Mapa dokumentów

[PROJECT_OVERVIEW](docs/PROJECT_OVERVIEW.md) · [ARCHITECTURE](docs/ARCHITECTURE.md) · [DATABASE](docs/DATABASE.md) · [API](docs/API.md) · [SECURITY](docs/SECURITY.md) · [DEVELOPMENT](docs/DEVELOPMENT.md) · [DEPLOYMENT](docs/DEPLOYMENT.md) · [GITHUB_WORKFLOW](docs/GITHUB_WORKFLOW.md) · [AI_WORKFLOW](docs/AI_WORKFLOW.md) · [ADR](docs/adr/README.md)
