# Vercel Deployment

**Date:** June 2026

## What changed

Configured the project for production hosting on Vercel.

### Files

- `vercel.json` — build command, Next.js framework preset
- `.nvmrc` — Node 20
- `package.json` — `engines.node >= 20`, `postinstall: prisma generate`, build runs `prisma migrate deploy`

### Build command

```bash
prisma generate && prisma migrate deploy && next build
```

### Environment variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Supabase Transaction pooler (app runtime) |
| `DIRECT_URL` | Supabase direct connection (migrations at build) |
| `AUTH_SECRET` | NextAuth session signing (`openssl rand -base64 32`) |

`trustHost: true` is set in auth config — no `AUTH_URL` required on Vercel.

## Why

SQLite does not work on Vercel serverless. Production requires a hosted Postgres database and automated schema migrations at deploy time.

## How

1. Import `bharathbhsp/ekasar-realty` at [vercel.com/new](https://vercel.com/new)
2. Set env vars (see [supabase-database.md](./supabase-database.md))
3. Deploy
4. Seed production once: `npm run db:seed` with production env pulled locally
