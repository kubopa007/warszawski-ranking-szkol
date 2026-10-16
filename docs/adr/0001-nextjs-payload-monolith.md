# 0001. Jedna aplikacja Next.js z wbudowanym Payload CMS 3

Status: Accepted | Data: 2026-10-16

## Kontekst

Mały zespół; potrzebne SEO (SSG/ISR), panel z rolami, szkicami, wersjami, uprawnieniami do pól i lokalizacją.

## Decyzja

Next.js (App Router) z wbudowanym Payload CMS 3 w `apps/web`; hosting Vercel fra1. Odrzucone alternatywy: Astro (framework), Directus/Strapi (CMS).

## Konsekwencje

Jedna baza kodu dla stron, panelu, API i zadań. Payload 3 wymaga zgodnych wersji Next.js — dobieramy je razem przy tworzeniu `apps/web`. Plan B: ten sam kontener na Hetzner/OVH + Coolify.
