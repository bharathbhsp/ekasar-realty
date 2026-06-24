# Ekasar Realty

Premium real estate marketing site built with Next.js 15 and NextAuth.

## Stack

- **Frontend:** Next.js App Router, Tailwind CSS, Framer Motion
- **Database:** [Supabase](https://supabase.com) via JavaScript API (no direct Postgres connection)
- **Auth:** NextAuth (credentials, JWT)
- **Hosting:** Vercel

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a project at [supabase.com](https://supabase.com).

1. Run `supabase/schema.sql` in **SQL Editor**
2. Copy API keys from **Project Settings → API**

| Variable | Where |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key |

```bash
cp .env.example .env.local
# Fill in values + AUTH_SECRET (openssl rand -base64 32)
```

### 3. Seed database

```bash
npm run db:seed
```

### 4. Start dev server

```bash
npm run dev
```

**Seed accounts:** `admin@ekasar.com` / `password123`

## Deploy on Vercel

Set these environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `AUTH_SECRET`

Then deploy and run `npm run db:seed` once against production.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run db:seed` | Seed demo data via Supabase API |
