# Project overview — Warszawski Ranking Szkół

> Źródło prawdy: [`source/architektura-techniczna.pdf`](source/architektura-techniczna.pdf) (16.10.2026).
> Biznesplan jest dokumentem prywatnym — trzymany lokalnie, poza repozytorium (ADR-0010).

## Cel

Portal z **rankingiem**, **katalogiem** i (etap 2) **dopasowaniem szkół przez AI** dla rodziców wybierających szkołę w Warszawie. Wyróżnik: ranking z jawną metodologią, liczony wyłącznie z danych oficjalnych.

Projekt jest obecnie rozwijany jako **open source, do nauki**, na darmowych planach usług (ADR-0010).

## Użytkownicy i role

| Rola                 | Etap | Opis                                                |
| -------------------- | ---- | --------------------------------------------------- |
| Gość                 | MVP  | przeglądanie, 1 dopasowanie AI (etap 2)             |
| Rodzic               | 2    | konto, dopasowania, pakiet „Wybór szkoły”           |
| Redaktor szkoły      | MVP  | edycja profilu jako szkic                           |
| Administrator szkoły | MVP  | wysyłka zmian do moderacji, zarządzanie redaktorami |
| Moderator            | MVP  | moderacja, importy, szkice edycji rankingu          |
| Superadmin           | MVP  | wszystko, w tym role i publikacja rankingu          |

Szczegóły uprawnień: [SECURITY.md](SECURITY.md).

## Zakres etapów

| Etap | Termin (plan) | Zakres                                                                                                                                                              |
| ---- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MVP  | 8.02.2027     | katalog szkół z RSPO, ranking podstawówek, profile + panel szkoły, przejmowanie profilu, porównywarka, mapa, kalendarz dni otwartych, panel moderatora, metodologia |
| 2    | 03–12.2027    | dopasowanie AI, konta rodziców, płatności (Stripe), premium dla szkół, ranking liceów i techników                                                                   |
| 3    | 2028          | oceny rodziców, raporty dla szkół, wersja EN, widget rankingowy                                                                                                     |

## Zasady nadrzędne (niezmienne bez ADR)

1. **Płatność nie wpływa na pozycję w rankingu ani w dopasowaniu AI.**
2. Ranking liczony **tylko z danych oficjalnych** (CKE, Kuratorium, WSZS, RSPO).
3. Dane osobowe dzieci **nie są przechowywane**.
4. Dane i usługi w regionach **UE**.

## Kryteria rankingu podstawówek (wstępne)

| Kryterium                                                  | Waga | Źródło             |
| ---------------------------------------------------------- | ---- | ------------------ |
| Egzamin ósmoklasisty (średnia 3 lat vs średnia Warszawy)   | 55%  | CKE / OKE          |
| Laureaci i finaliści konkursów kuratoryjnych / 100 uczniów | 25%  | Kuratorium Oświaty |
| Osiągnięcia sportowe / 100 uczniów                         | 10%  | WSZS (WOM)         |
| Stabilność wyników r/r                                     | 10%  | jw.                |

Próg ok. 20 zdających w 3 latach; osobne zestawienia publicznych i niepublicznych. **Wagi są wstępne — TBD.**

## Otwarte kwestie

| Kwestia                                                                       | Termin     |
| ----------------------------------------------------------------------------- | ---------- |
| Dostępność wyników E8 dla małych szkół niepublicznych, format list kuratorium | 13.12.2026 |
| Nazwa i domena portalu                                                        | 10.01.2027 |
| Licencja open source                                                          | **TBD**    |
| Dostawca modelu AI                                                            | 31.03.2027 |
