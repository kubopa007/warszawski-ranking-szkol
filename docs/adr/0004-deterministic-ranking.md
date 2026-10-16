# 0004. Ranking deterministyczny, odseparowany od płatności i AI

Status: Accepted | Data: 2026-10-16

## Kontekst

Największe ryzyko biznesowe to zarzut konfliktu interesów (Decode IT obsługuje szkoły i robi ich ranking).

## Decyzja

Ranking liczy osobny pakiet `packages/ranking`: czyste, deterministyczne funkcje TypeScript, tylko dane oficjalne, wersjonowane edycje (szkic → przegląd → publikacja). W bazie rola `ranking_engine` czyta wyłącznie strefę oficjalną. Płatności, dane deklarowane przez szkoły i AI nie mają technicznego dostępu do rankingu.

## Konsekwencje

Pełne testy na danych wzorcowych; każda zmiana metodologii = nowa wersja metodologii w `ranking_editions` + review. Zmiany w `packages/ranking` wymagają przeglądu agentów AI (ADR-0010).
