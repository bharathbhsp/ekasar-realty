# Supabase Database

**Date:** June 2026 (updated — API-only, no Prisma)

## What changed

Database access uses the **Supabase JavaScript API** — not direct Postgres connection strings.

See [supabase-api.md](./supabase-api.md) for the full migration details.

### Schema

- Tables: `User`, `Post`, `Project`, `Lead`
- SQL file: `supabase/schema.sql` — run once in Supabase SQL Editor

### Clients

| Client | File | Used for |
|--------|------|----------|
| Service (server) | `src/lib/supabase/server.ts` | API routes, Server Components, auth |
| Browser | `src/lib/supabase/client.ts` | Client components (when needed) |

## Environment variables

From **Supabase → Project Settings → API**:

| Variable | Notes |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (used on server and client) |

## Setup

```bash
# 1. Run supabase/schema.sql in Supabase SQL Editor
# 2. Configure .env.local
cp .env.example .env.local
# 3. Seed
npm run db:seed
```
