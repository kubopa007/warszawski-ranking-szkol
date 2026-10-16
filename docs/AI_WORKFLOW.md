# AI workflow — efektywna praca z Claude Code

> Cel: niski koszt tokenów bez utraty jakości i bezpieczeństwa. Reguły dla AI są w `CLAUDE.md`; ten dokument jest dla człowieka i dla AI przy planowaniu pracy.

## 1. Cykl pracy nad Issue

```
/issue-start 12  →  /issue-plan  →  (akceptacja planu)  →  /implement  →  /review  →  /pr-prepare  →  merge (człowiek)
```

Jedno Issue = jedna sesja. Po merge: nowa sesja (lub `/clear`) dla następnego Issue.

## 2. Dobór modeli

| Praca                                                                                | Model                                              | Dlaczego                         |
| ------------------------------------------------------------------------------------ | -------------------------------------------------- | -------------------------------- |
| Implementacja, testy, dokumentacja, code review                                      | **Sonnet** (domyślny)                              | dobry stosunek jakości do kosztu |
| Plan dla zmian w danych/uprawnieniach/rankingu, security review, trudny debug        | **Opus** (agenci `architect`, `security-reviewer`) | błąd tu jest drogi               |
| Proste, mechaniczne zadania (zmiana nazw, formatowanie tabeli, szybkie wyszukiwanie) | **Haiku**                                          | najtańszy                        |

Model główny sesji wybierasz w aplikacji (selektor modelu). Agenci mają model przypisany w `.claude/agents/*.md`.

## 3. Subagenci — kiedy tak, kiedy nie

**Tak**, gdy praca wymaga czytania wielu plików, a do sesji głównej wystarczy wniosek (plan, lista problemów). Kontekst agenta nie obciąża sesji głównej.

| Agent               | Kiedy                                                             |
| ------------------- | ----------------------------------------------------------------- |
| `architect`         | Issue zmienia model danych, uprawnienia, ranking, granice modułów |
| `code-reviewer`     | przed każdym PR (przez `/review`)                                 |
| `security-reviewer` | ranking, auth, płatności, uploady, import, zależności             |
| `qa-engineer`       | luki w testach, weryfikacja kryteriów akceptacji                  |

**Nie**: dla zmian w 1–3 plikach, pytań, na które odpowiada jeden `grep`, ani „na wszelki wypadek”. Każdy agent startuje od zera i sam czyta kontekst — to kosztuje.
Maksymalnie 2 agentów równolegle (np. code + security review); nigdy agent recenzujący i edytujący ten sam kod jednocześnie.

## 4. Kontekst sesji

- **`CLAUDE.md` jest krótki celowo** — dokumentacja jest czytana na żądanie (tabela „Read on demand”). Nie dopisuj do niego treści dokumentów.
- **Rules** (`.claude/rules/`) dotyczą konkretnych ścieżek — reguły dla rankingu nie obciążają pracy nad UI.
- **`/compact`** — gdy sesja jest długa, a praca nad tym samym Issue trwa (np. po zakończeniu planowania, przed implementacją). Można dodać wskazówkę: `/compact zachowaj plan i listę zmienionych plików`.
- **`/clear`** — po zakończeniu Issue lub przy zmianie tematu. Tańsze i czystsze niż ciągnięcie starej historii.
- **Nowa sesja** zamiast `/clear`, gdy chcesz zachować starą do wglądu.
- **Równoległe Issues** — osobne sesje, każda we własnym git worktree (aplikacja desktopowa tworzy worktree dla sesji); nigdy dwie sesje edytujące te same pliki.

## 5. Oszczędne czytanie i wyniki narzędzi

- Najpierw `Grep`/`Glob`, potem czytanie **konkretnych** plików i fragmentów — nie całych katalogów.
- Nie czytaj: `node_modules/`, `pnpm-lock.yaml`, `docs/source/*.pdf` (chyba że docs/ nie mają odpowiedzi), wygenerowanych plików, `.env*`.
- Testy i lint uruchamiaj **najwęższe**: `pnpm --filter <pakiet> test`, jeden plik testu; pełne `pnpm check` na koniec.
- Długie logi: tylko błędy i ostatnie linie (`| tail -30`, `| grep -E "error|FAIL"`). Stack trace przycinaj do ramek projektu.
- Nie wklejaj do czatu całych plików ani logów — podaj ścieżkę i linię.

## 6. Nie analizuj ponownie tego, co się nie zmieniło

- Plan z `/issue-plan` zostaje w sesji; przy pracy wielosesyjnej zapisz go jako komentarz w Issue i w nowej sesji podaj link zamiast ponownej analizy.
- Po review poprawiaj tylko wskazane miejsca; drugi pełny review tylko przy dużych zmianach.
- Pytaj o diff (`git diff main...HEAD`), nie o cały kod.

## 7. Utrwalanie wiedzy w repozytorium

| Co                                                 | Gdzie                                                   |
| -------------------------------------------------- | ------------------------------------------------------- |
| Decyzja techniczna (wybór, odrzucenie alternatywy) | nowy ADR w `docs/adr/`                                  |
| Zmiana modelu danych / API / bezpieczeństwa        | odpowiedni `docs/*.md` (`/docs-update`)                 |
| Nowa twarda reguła lub konwencja                   | `CLAUDE.md` lub `.claude/rules/` (za zgodą właściciela) |
| Wynik ustaleń dla Issue                            | komentarz w Issue / opis PR                             |

Wiedza tylko w historii czatu przepada po `/clear` — i trzeba ją potem odtwarzać tokenami.

## 8. Ochrona przed pętlami

- Ta sama poprawka nie działa **2 razy** → stop, raport przyczyny i opcji (zapisane w `CLAUDE.md` i skillach).
- Nie „naprawiaj” testu przez osłabienie asercji, `any` ani `skip`.
- Plan obejmuje zakres Issue; wszystko poza nim → „follow-ups” w raporcie, nie w kodzie.
- Jeśli agent lub sesja kręci się w kółko — przerwij (Esc), `/clear`, podaj w nowym promcie zwięzły stan i jedną hipotezę.

## 9. Bezpieczeństwo pracy z AI

- Twarde blokady są w `.claude/settings.json` (`permissions.deny`) i hooku `.claude/hooks/guard.mjs` — nie w samych instrukcjach. Blokowane: odczyt/edycja `.env*`, `git push`, `reset --hard`, `clean`, `rm -rf`, merge PR, publikacja paczek, deploy produkcyjny.
- Push, merge, tworzenie Issues/PR, zmiany w ustawieniach repo i chmurze wykonujesz Ty albo AI po Twojej wyraźnej zgodzie.
- Znane ograniczenie hooka: blokuje każdą komendę zawierającą tekst `.env` (np. w treści commit message) — przeformułuj tekst zamiast wyłączać hook.

## 10. Szybka ściąga kosztów

| Sytuacja                              | Zrób                                              |
| ------------------------------------- | ------------------------------------------------- |
| Kończę Issue                          | merge → `/clear` lub nowa sesja                   |
| Długa sesja, ta sama praca            | `/compact` z wskazówką, co zachować               |
| Pytanie o projekt                     | wskaż plik z `docs/`, nie każ czytać całego repo  |
| Duży refaktor / nowa funkcja z danymi | `architect` (Opus) raz, potem Sonnet implementuje |
| Drobna poprawka                       | bez agentów, bez planu, od razu `pnpm check`      |
