# API

> Kontrakty endpointów **nie są jeszcze zdefiniowane**. Ten plik ustala zasady; endpointy dopisujemy przy implementacji, jeden wiersz na endpoint.

## Zasady

1. **Server Actions** dla mutacji z własnego UI; **Route Handlers** (`app/api/...`) tylko dla wywołań zewnętrznych (webhooki, cron, przyszłe API publiczne).
2. **Payload Local API** po stronie serwera zamiast REST/GraphQL Payload tam, gdzie to możliwe. Publiczny REST/GraphQL Payload — wyłączony lub ograniczony uprawnieniami (TBD).
3. **Walidacja Zod na każdym wejściu** (body, query, params, formularze); te same schematy w przeglądarce i na serwerze.
4. **Autoryzacja na serwerze** w każdej akcji/handlerze; nigdy na podstawie danych z klienta (rola, cena, ID organizacji).
5. **Webhooki** (Stripe, etap 2): weryfikacja podpisu, idempotencja przez zapis zdarzenia z unikalnym ID przed efektem.
6. **Cron / zadania**: endpoint chroniony sekretem (`CRON_SECRET` — TBD), przez kolejkę zadań Payload z ponawianiem.
7. **Błędy**: spójny kształt `{ error: { code, message } }`, bez szczegółów wewnętrznych i stack trace; kody HTTP zgodne z semantyką.
8. **Limity**: Upstash Redis (logowanie, dopasowanie AI, formularze) + Turnstile tam, gdzie wskazuje [SECURITY.md](SECURITY.md).
9. **i18n**: komunikaty dla użytkownika przez next-intl, nie w kodzie API.

## Rejestr endpointów

| Metoda | Ścieżka                | Cel                 | Auth          | Etap | Status |
| ------ | ---------------------- | ------------------- | ------------- | ---- | ------ |
| POST   | `/api/webhooks/stripe` | zdarzenia Stripe    | podpis Stripe | 2    | TBD    |
| —      | —                      | pozostałe endpointy | —             | —    | TBD    |
