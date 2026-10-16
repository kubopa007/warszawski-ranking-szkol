# 0006. Better Auth jako jedno logowanie dla wszystkich ról

Status: Proposed (termin: 2026-11-15) | Data: 2026-10-16

## Kontekst

Biznesplan: „Better Auth lub Auth.js” tylko dla rodziców. Potrzebne: passkeys, TOTP, link e-mail, OAuth, organizacje (szkoła z rolami).

## Decyzja

Better Auth dla wszystkich ról (plugin organizacji); Payload korzysta z jego sesji przez własną strategię uwierzytelniania. Zapas: wbudowane logowanie Payload dla personelu i szkół.

## Konsekwencje

Integracja z Payload niepotwierdzona — **spike w 1. tygodniu budowy**, przed implementacją kont.
