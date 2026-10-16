---
paths:
  - 'apps/web/**/collections/**'
  - 'apps/web/**/access/**'
  - 'apps/web/**/migrations/**'
  - '**/drizzle/**'
  - '**/*.sql'
---

# Payload collections, access control and migrations

- Every collection defines explicit `access` for each operation and field-level access where roles differ. Default deny.
- Official-zone fields (`schools`, `exam_results`, `contest_awards`, `sport_awards`, `ranking_scores`) are read-only for all school roles; only import / ranking jobs write them.
- School-editable data goes through drafts + moderation with version history.
- Each collection change ships with a permission test for every role (guest, parent, school editor, school admin, moderator, superadmin).
- Localized fields: mark user-facing text fields `localized: true` (`/pl` now, `/en` later).
- Migrations: generate with the tool (Payload migrate / drizzle-kit), commit them, **additive only**. Renames/drops/type changes use expand → contract across separate deploys. Never edit an applied migration.
- Data-zone separation and the two-migration-system setup are **TBD** (docs/DATABASE.md#otwarte) — stop and ask before the first migration.
