---
paths:
  - 'packages/data-import/**'
---

# Data import rules

- Sources: RSPO (API), CKE/OKE (XLSX), Kuratorium (PDF/HTML), WSZS (HTML/PDF), GUGiK PRG (WFS/CSV). Formats for Kuratorium/E8 small schools are **TBD** — don't guess parsers, ask.
- Pipeline: raw file → R2 (evidence) → staging tables → Zod validation → match to RSPO (RSPO number → REGON → name+address) → unmatched to moderation queue → diff report → moderator approval → publish.
- Writes only to the official data zone. Never touches school-declared or commerce data.
- Idempotent: re-running the same file must not duplicate rows.
- Parsers are tested on small committed fixtures of public data; no network in unit tests.
- Logs: counts and IDs, never full records with personal data.
