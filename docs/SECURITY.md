# Security

> Cel: OWASP ASVS poziom 2. Szczegóły i uzasadnienia: [`source/architektura-techniczna.pdf`](source/architektura-techniczna.pdf), rozdz. „Logowanie…” i „Cyberbezpieczeństwo i RODO”.

## Role i uwierzytelnianie

| Rola                 | Logowanie                  | MFA                         | Uprawnienia                                   |
| -------------------- | -------------------------- | --------------------------- | --------------------------------------------- |
| Gość                 | —                          | —                           | przeglądanie                                  |
| Rodzic (etap 2)      | Google, Apple, link e-mail | opcjonalne                  | dopasowania, pakiet                           |
| Redaktor szkoły      | link e-mail, Google        | zalecane                    | edycja pól profilu jako szkic                 |
| Administrator szkoły | link e-mail, Google        | **wymagane** (passkey/TOTP) | wysyłka do moderacji, redaktorzy, subskrypcja |
| Moderator            | e-mail + passkey           | **wymagane**                | moderacja, importy, szkice edycji rankingu    |
| Superadmin           | passkey / klucz sprzętowy  | **wymagane**                | wszystko, publikacja rankingu                 |

## Reguły twarde dla kodu

- **Sesje** w bazie; ciasteczka `HttpOnly`, `Secure`, `SameSite=Lax`; panel personelu wygasa po 12 h, konto rodzica po 30 dniach.
- Zmiana roli / odebranie dostępu **unieważnia wszystkie sesje** użytkownika.
- **Uprawnienia Payload na poziomie kolekcji i pól**; pola oficjalne tylko do odczytu dla ról szkoły. **Test automatyczny dla każdej roli** przy każdej kolekcji.
- **Przejęcie profilu**: link jednorazowy (24 h) wyłącznie na oficjalny e-mail z RSPO — nigdy na adres podany przez użytkownika.
- **Walidacja Zod** na każdym wejściu; zapytania wyłącznie przez ORM / Local API (bez sklejanego SQL).
- **Ranking** nie ma dostępu do danych handlowych ani deklarowanych przez szkoły.
- **Pliki od szkół**: JPG, PNG, WebP, PDF, maks. 10 MB; przekodowanie (sharp), usuwanie EXIF, losowe nazwy, serwowanie z osobnej domeny R2; **bez SVG**.
- **Nagłówki**: HTTPS + HSTS preload, CSP z nonce, `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy.
- **Limity** prób logowania na IP i konto (Upstash); Turnstile na logowaniu, rejestracji i formularzach; blokada jednorazowych skrzynek.
- **Dziennik audytowy** append-only dla rankingu, ról, profili, płatności (retencja 24 mies.).
- **Logi i Sentry** z maskowaniem danych osobowych; nigdy nie logujemy tokenów, haseł, sekretów.

## Sekrety

- W repo **tylko** `.env.example` z placeholderami. `.env*` są w `.gitignore`.
- Lokalnie: `.env` (poza gitem). CI: GitHub Actions secrets / Environments. Hosting: zmienne Vercel, osobne dla produkcji i podglądów.
- Testy i rozwój: **tylko** klucze testowe (Stripe test mode itd.), nigdy produkcyjne sekrety ani dane użytkowników.
- Rotacja co 12 miesięcy i przy zmianie składu zespołu.
- Skan sekretów: gitleaks w CI.

## RODO (skrót)

Dane w UE; umowy powierzenia z dostawcami; minimalizacja (kwestionariusz bez imienia i wieku dziecka); tylko niezbędne ciasteczka, Plausible bez ciasteczek; retencja: nieaktywne konta 24 mies., odpowiedzi kwestionariusza 60 dni, logi 30–90 dni; eksport i usunięcie konta z panelu; DPIA przed etapem 2.

## Łańcuch dostaw

- Wersje przypięte dokładnie, lockfile w repo.
- pnpm: `minimumReleaseAge` (24 h) i domyślna blokada skryptów instalacyjnych — zezwalamy tylko zatwierdzonym pakietom.
- Renovate / Dependabot alerts, CodeQL, `pnpm audit` w CI.

## Zgłaszanie podatności

Publiczne repozytorium: zgłoszenia przez GitHub Private Vulnerability Reporting (do włączenia w ustawieniach repo — TBD). `security.txt` i adres `security@` — po ustaleniu domeny.
