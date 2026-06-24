# Phase 1 MVP

**Date:** June 2026

## What changed

Initial implementation of the Ekasar Realty marketing SPA per `PRD.md` Phase 1 scope.

### Features

- Interactive homepage (hero, pillars, stats, project carousel, blog preview, lead form)
- Project listing and detail pages (`/projects`, `/projects/[slug]`)
- Blog with public and member-only visibility (`/blog`, `/blog/[slug]`)
- Authentication via NextAuth (email/password, JWT sessions)
- Role-based access: `USER`, `EDITOR`, `ADMIN`
- Admin dashboard, blog editor, leads inbox
- REST API routes for auth, posts, projects, and leads

### Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS v3, Framer Motion
- Prisma ORM, NextAuth v5 (Auth.js)
- SQLite for initial local development (later replaced by Supabase Postgres)

### Seed data

- 3 projects, 5 blog posts, 3 demo users
- Run: `npm run db:seed`
- Demo login: `admin@ekasar.com` / `password123`

## Why

Deliver a deployable MVP with marketing site, gated content, and admin tooling as defined in the PRD.

## How

```bash
npm install
cp .env.example .env   # configure Supabase + AUTH_SECRET
npm run db:setup
npm run dev
```
