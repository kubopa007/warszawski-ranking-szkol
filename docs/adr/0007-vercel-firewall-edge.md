# 0007. Vercel Firewall; Cloudflare tylko DNS, R2, Turnstile

Status: Proposed (termin: 2026-11-15) | Data: 2026-10-16

## Kontekst

Biznesplan zakładał Cloudflare jako proxy przed aplikacją; podwójne CDN komplikuje cache i ISR na Vercel.

## Decyzja

Ochrona brzegu przez Vercel Firewall (limity dla logowania, AI, panelu; tryb ochrony przy ataku). Cloudflare: DNS, R2, Turnstile.

## Konsekwencje

Część funkcji Vercel Firewall może wymagać płatnego planu — sprawdzić przy wdrożeniu (ADR-0010).
