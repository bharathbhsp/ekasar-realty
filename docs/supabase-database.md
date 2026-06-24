# Supabase Database

**Date:** June 2026

## What changed

Database provider set to **Supabase Postgres** for local development and Vercel production.

### Schema

- `prisma/schema.prisma` uses `postgresql` with:
  - `DATABASE_URL` — Transaction pooler (port 6543, `pgbouncer=true`)
  - `DIRECT_URL` — Direct connection (port 5432) for `prisma migrate deploy`

### Models

- `User`, `Post`, `Project`, `Lead`
- Initial migration: `prisma/migrations/20250617000000_init/`

### Configuration

- `.env.example` — Supabase connection string templates
- Removed all Neon references; Supabase is the sole documented provider

## Why

Vercel serverless requires a hosted Postgres. Supabase provides pooling compatible with Prisma and serverless runtimes.

## How

### Supabase dashboard

**Project Settings → Database → Connection string**

| Env var | Supabase mode |
|---------|---------------|
| `DATABASE_URL` | **Transaction** pooler, port 6543 — append `&connection_limit=1` |
| `DIRECT_URL` | **Session** pooler or **Direct**, port 5432 |

### Local setup

```bash
cp .env.example .env
# Fill in Supabase URLs and AUTH_SECRET
npm run db:setup
```

### Vercel

Add `DATABASE_URL`, `DIRECT_URL`, and `AUTH_SECRET` in **Settings → Environment Variables** for Production and Preview.
