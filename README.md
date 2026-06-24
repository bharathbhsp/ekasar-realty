# Ekasar Realty

Premium real estate marketing site built with Next.js 15, Prisma, and NextAuth.

## Stack

- **Frontend:** Next.js App Router, Tailwind CSS, Framer Motion
- **Database:** [Supabase](https://supabase.com) Postgres + Prisma
- **Auth:** NextAuth (credentials, JWT)
- **Hosting:** Vercel

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a project at [supabase.com](https://supabase.com), then copy connection strings from **Project Settings → Database**:

| Variable | Supabase connection |
|----------|---------------------|
| `DATABASE_URL` | **Transaction** pooler (port 6543) + `?pgbouncer=true&connection_limit=1` |
| `DIRECT_URL` | **Session** pooler or **Direct** (port 5432) |

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Generate an auth secret:

```bash
openssl rand -base64 32
```

### 3. Initialize database

```bash
npm run db:setup
```

### 4. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Seed accounts:** `admin@ekasar.com` / `password123`

## Deploy on Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. Add environment variables in Vercel (**Settings → Environment Variables**):
   - `DATABASE_URL` — Supabase Transaction pooler URL
   - `DIRECT_URL` — Supabase direct URL (for Prisma migrations at build time)
   - `AUTH_SECRET` — `openssl rand -base64 32`
3. Deploy — build runs `prisma migrate deploy` automatically
4. Seed production data once:

```bash
npx vercel env pull .env.production.local
export $(grep -v '^#' .env.production.local | xargs)
npm run db:seed
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (migrate + Next.js) |
| `npm run db:setup` | Run migrations and seed |
| `npm run db:seed` | Seed demo data |
