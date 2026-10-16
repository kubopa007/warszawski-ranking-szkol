---
paths:
  - '**/auth/**'
  - '**/payments/**'
  - '**/webhooks/**'
  - '**/uploads/**'
  - '**/middleware.ts'
  - 'apps/web/**/api/**'
---

# Security-critical code

Full rules: `docs/SECURITY.md`. Before PR, run the `security-reviewer` agent.

- Authorization on the server in every action/handler; never trust role, price, org id or user id from the client.
- Sessions: HttpOnly, Secure, SameSite=Lax; invalidate all sessions on role change.
- Profile claim: one-time 24 h link sent only to the official RSPO e-mail.
- Webhooks: verify signature first, store event by unique id (idempotent), then act. Price always from server-side config.
- Uploads: JPG/PNG/WebP/PDF ≤ 10 MB, re-encode with sharp, strip EXIF, random names, no SVG.
- Rate limit + Turnstile on login, registration, forms and AI match.
- Errors returned to clients carry no internals; logs mask PII and never contain tokens.
