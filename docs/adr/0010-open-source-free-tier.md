# 0010. Projekt open source na darmowych planach

Status: Accepted | Data: 2026-10-16

## Kontekst

Właściciel rozwija projekt na razie samodzielnie, do nauki, bez płatnych subskrypcji. Architektura zakładała GitHub Team, Vercel Pro i 2 recenzentów dla obszarów krytycznych.

## Decyzja

- Repozytorium **publiczne** na GitHub Free; CodeQL i Actions są darmowe dla repo publicznego.
- Biznesplan **poza repozytorium** (`.gitignore`); architektura w `docs/source/`.
- Review: 1 osoba (właściciel) + **obowiązkowy przegląd agentów AI** (code review i security) dla rankingu, logowania i płatności. Reguła 2 recenzentów wraca przy powiększeniu zespołu.
- Usługi tylko w darmowych planach (Neon Free, Vercel Hobby, …); żadnych płatnych zasobów bez zgody właściciela.
- Licencja open source: **TBD** (wybiera właściciel).

## Konsekwencje

Vercel Hobby nie dopuszcza użytku komercyjnego — przed komercjalizacją wracamy do planu z architektury (nowy ADR). Publiczne repo wymaga szczególnej dbałości o brak sekretów (gitleaks, hooki).
