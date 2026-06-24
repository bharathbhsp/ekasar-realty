# Vercel Deployment

**Date:** June 2026 (updated — Supabase API)

## What changed

Configured the project for production hosting on Vercel.

### Files

- `vercel.json` — `next build` only (no Prisma migrations)
- `.nvmrc` — Node 20

### Environment variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key |
| `AUTH_SECRET` | NextAuth session signing |

## Why

App uses Supabase REST API — no direct Postgres connection or build-time migrations.

## How

1. Import repo at [vercel.com/new](https://vercel.com/new)
2. Set env vars above
3. Run `supabase/schema.sql` in Supabase SQL Editor (once)
4. Deploy, then `npm run db:seed` with production env
