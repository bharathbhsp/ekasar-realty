# Supabase API Migration

**Date:** June 2026

## What changed

Replaced Prisma direct Postgres connections with the **Supabase JavaScript API**.

- Removed `prisma`, `@prisma/client`, `DATABASE_URL`, `DIRECT_URL`
- Added `@supabase/supabase-js`, `@supabase/ssr`
- Server data access via `createServiceClient()` (publishable key)
- Browser client via `createBrowserClient()` (same env vars)
- Schema SQL moved to `supabase/schema.sql` (run in Supabase SQL Editor)
- Seed script: `scripts/seed.ts`

## Environment variables

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public | Publishable key (server + client) |

Per [Supabase Next.js docs](https://supabase.com/docs/guides/auth/server-side/creating-a-client), both server and browser clients use these two variables.

## Why

Supabase is used via its REST API only — no direct database connection strings in the app.

## How

1. Run `supabase/schema.sql` in Supabase SQL Editor
2. Set env vars in `.env.local` (copy from `.env.example`)
3. `npm install && npm run db:seed`
