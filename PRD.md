# Product Requirements Document (PRD)
## Ekasar Realty — Single Page Application (SPA)

| Field | Value |
|-------|-------|
| **Product** | Ekasar Realty Website |
| **Version** | 1.0 |
| **Status** | Draft |
| **Last Updated** | June 17, 2026 |
| **Reference** | [MSR Infraa](https://www.msrinfraa.in/) |

---

## 1. Executive Summary

Ekasar Realty requires a modern, client-rendered **Single Page Application (SPA)** that positions the brand as a premium, trustworthy real estate developer. The site will combine a **highly interactive marketing front page** with **role-based authentication**, enabling differentiated experiences for public visitors, registered users, and internal staff.

Design and content structure draw inspiration from [MSR Infraa](https://www.msrinfraa.in/) — bold hero messaging, science-of-building narrative pillars, project showcase cards, credibility metrics, and an insights/resources blog — adapted to Ekasar Realty's brand identity and product lifecycle.

---

## 2. Product Vision & Goals

### 2.1 Vision
Create a digital flagship for Ekasar Realty that converts curiosity into qualified leads, nurtures trust through transparent storytelling, and gives authenticated stakeholders timely access to project updates and editorial content.

### 2.2 Business Goals
- Generate qualified leads (site visits, brochure downloads, callback requests)
- Showcase flagship and upcoming projects with rich media
- Build brand authority through an insights/blog section
- Enable secure content management for marketing and sales teams
- Support long-term engagement via registered user accounts

### 2.3 Success Metrics (KPIs)

| Metric | Target (6 months post-launch) |
|--------|-------------------------------|
| Monthly unique visitors | Baseline + 40% |
| Lead form conversion rate | ≥ 3% |
| Avg. session duration (homepage) | ≥ 2 min |
| Blog read-through rate (auth users) | ≥ 45% |
| Time to publish new blog post | < 15 min (admin) |
| Core Web Vitals (LCP, INP, CLS) | All "Good" |

---

## 3. Target Audience & Personas

| Persona | Description | Primary Needs |
|---------|-------------|---------------|
| **Prospective Buyer (Public)** | First-time or upgrade homebuyer researching projects | Project details, location, pricing range, trust signals |
| **Registered Visitor** | Repeat visitor who signed up for updates | Early access posts, saved projects, personalized content |
| **Sales / Marketing Staff** | Internal team publishing content and managing leads | Blog CMS, lead dashboard, draft/publish workflow |
| **Admin** | Platform owner | User management, roles, site configuration |
| **Partner / Broker** | Channel partner (optional Phase 2) | Co-branded collateral, referral tracking |

---

## 4. Competitive Inspiration — MSR Infraa

The following patterns from [MSR Infraa](https://www.msrinfraa.in/) inform Ekasar Realty's information architecture and UX, with deliberate enhancements:

| MSR Infraa Pattern | Ekasar Realty Adaptation |
|--------------------|--------------------------|
| Bold hero: *"Real Estate? More like Rocket Science"* | Ekasar hero with animated tagline and scroll-driven storytelling |
| "The Sciences" — 7 value pillars | **"The Ekasar Promise"** — 5–7 brand pillars (trust, value, lifestyle, quality, timelines, sustainability) |
| Animated stats (projects, years, SFT) | Counter animations triggered on scroll into view |
| Flagship project cards with BHK, location, CTA | Interactive project carousel with filter by status (Ready / Under Construction / Upcoming) |
| Insights & Resources blog grid | Auth-gated premium articles + public teaser posts |
| Sticky announcement bar ("Coming Soon") | Configurable promo banner for new launches |
| Contact block with map, phone, email | Lead form + WhatsApp CTA + office locator |
| Minimal top nav | SPA nav with smooth scroll anchors + auth-aware menu items |

**Differentiators for Ekasar:**
- Full SPA with instant route transitions (no full page reloads)
- Authentication with tiered content access
- Interactive homepage (parallax, micro-interactions, project explorer)
- Admin-facing blog workflow with preview and scheduling

---

## 5. Functional Requirements

### 5.1 Interactive Front Page (Public)

The homepage is the primary conversion surface. All sections below are **public** unless noted.

#### 5.1.1 Announcement Bar
- Dismissible or persistent promo strip (e.g., "New launch at [Location] — Register interest")
- Admin-configurable text and link (Phase 2)

#### 5.1.2 Hero Section
- Full-viewport hero with background video or high-res image carousel
- Headline + subheadline (e.g., *"Spaces that move families forward"*)
- Primary CTA: **Explore Projects** | Secondary CTA: **Get in Touch**
- Scroll indicator animation
- Optional: mouse-parallax on hero imagery

#### 5.1.3 Brand Pillars — "The Ekasar Promise"
- Grid of 5–7 cards, each with icon, title, and short description
- Hover: subtle lift + expanded description
- Scroll-triggered staggered fade-in
- Inspired by MSR's "Science of trust, value, lifestyle…" blocks

#### 5.1.4 Credibility Metrics — "The Record"
- Animated counters on scroll: Projects Delivered, Years of Experience, SFT Developed, SFT Under Development
- Numbers sourced from CMS/config (not hardcoded)

#### 5.1.5 Flagship Projects
- Horizontal scroll or carousel of project cards
- Each card: hero image, name, BHK types, location, status badge, **Know More** CTA
- Click opens project detail route (`/projects/:slug`)
- Filter chips: All | Ready to Move | Under Construction | Upcoming

#### 5.1.6 Insights Preview
- Latest 3–4 blog posts (public teasers only)
- Locked posts show padlock icon + "Sign in to read" for auth-gated content
- **View All Insights** → `/blog`

#### 5.1.7 Contact / Lead Capture
- Short form: Name, Phone, Email, Project Interest (dropdown), Message
- Validation + success toast
- Optional: embedded map (Google Maps / Mapbox)

#### 5.1.8 Footer
- Quick links, social icons, legal (Privacy, Terms), copyright
- Office address and contact details

#### 5.1.9 Global Navigation
- Logo, anchor links (Science/Promise, Projects, About, Resources, Contact)
- **Sign In** / **Register** (unauthenticated) or **Account** dropdown (authenticated)
- Mobile: hamburger drawer with same links
- Smooth scroll to homepage sections; client-side routing for other pages

---

### 5.2 Authentication & Authorization

#### 5.2.1 Auth Methods
| Method | Phase | Notes |
|--------|-------|-------|
| Email + password | MVP | Primary |
| Magic link (passwordless) | Phase 2 | Optional |
| OAuth (Google) | Phase 2 | Optional for faster signup |

#### 5.2.2 User Roles & Permissions

| Role | Code | Permissions |
|------|------|-------------|
| **Guest** | `guest` | View public pages, submit lead forms, read public blog posts |
| **Registered User** | `user` | All guest + read member-only blog posts, save favorite projects, comment (Phase 2) |
| **Editor** | `editor` | All user + create/edit/publish own blog posts, upload media |
| **Admin** | `admin` | Full access: manage all posts, users, roles, site config, view leads |

#### 5.2.3 Authorization Matrix

| Resource / Action | Guest | User | Editor | Admin |
|-------------------|:-----:|:----:|:------:|:-----:|
| View homepage & static pages | ✅ | ✅ | ✅ | ✅ |
| Submit lead form | ✅ | ✅ | ✅ | ✅ |
| Read public blog posts | ✅ | ✅ | ✅ | ✅ |
| Read member-only blog posts | ❌ | ✅ | ✅ | ✅ |
| Read draft blog posts | ❌ | ❌ | Own only | ✅ |
| Create / edit blog posts | ❌ | ❌ | ✅ | ✅ |
| Publish / unpublish posts | ❌ | ❌ | ✅ | ✅ |
| Delete any post | ❌ | ❌ | ❌ | ✅ |
| Manage users & roles | ❌ | ❌ | ❌ | ✅ |
| View lead submissions | ❌ | ❌ | ❌ | ✅ |

#### 5.2.4 Auth Flows

**Registration**
1. User submits email, password, name, phone (optional)
2. Email verification sent (required before full access)
3. Default role: `user`
4. Redirect to homepage or intended protected route

**Sign In**
1. Email + password → JWT or session cookie
2. Remember me option (extended refresh token)
3. Redirect to `returnUrl` if present

**Password Reset**
1. Request reset link via email
2. Set new password via secure token (expires in 1 hour)

**Session Management**
- Access token: short-lived (15 min)
- Refresh token: httpOnly cookie (7 days, sliding)
- Logout clears tokens client- and server-side

#### 5.2.5 Route Protection (SPA)

| Route Pattern | Access |
|---------------|--------|
| `/`, `/about`, `/projects`, `/projects/:slug` | Public |
| `/blog`, `/blog/:slug` (public posts) | Public |
| `/blog/:slug` (member-only posts) | `user`+ (teaser shown to guests) |
| `/account`, `/account/saved-projects` | `user`+ |
| `/admin/*` | `editor` or `admin` (sub-routes scoped by role) |
| `/admin/users` | `admin` only |

Unauthenticated access to protected routes → redirect to `/auth/sign-in?returnUrl=...`  
Insufficient role → `/403` page with CTA to sign in or contact admin

---

### 5.3 Blog & Content (Auth-Based)

#### 5.3.1 Content Types

| Type | Visibility | Description |
|------|------------|-------------|
| **Public Post** | Everyone | Full article, indexable by search engines |
| **Member Post** | `user`+ | Teaser (title, excerpt, hero image) for guests; full body after login |
| **Draft** | Author + `admin` | Unpublished; preview via signed URL |
| **Scheduled** | Per publish date | Auto-publish at configured datetime |

#### 5.3.2 Blog Listing (`/blog`)
- Grid/list of posts with cover image, title, excerpt, date, author, visibility badge
- Filter: All | Public | Members Only (shown only if authenticated)
- Search by title/tags (Phase 2)
- Pagination or infinite scroll

#### 5.3.3 Blog Detail (`/blog/:slug`)
- Rich text body (headings, images, embeds, CTAs)
- Related posts sidebar
- Share buttons (WhatsApp, LinkedIn, copy link)
- For member posts: guest sees 2–3 paragraph teaser + **Sign in to continue reading** CTA
- SEO: `meta` tags for public posts; `noindex` for member-only full URLs when accessed without auth

#### 5.3.4 Admin Blog Editor (`/admin/blog`)
- WYSIWYG or Markdown editor with live preview
- Fields: title, slug, excerpt, cover image, body, tags, visibility (public / member / draft), publish date
- Image upload to object storage (S3 / Vercel Blob)
- Autosave drafts every 30s
- Role check: `editor` can only edit own posts unless `admin`

#### 5.3.5 Sample Content Themes (inspired by MSR playbook)
- *"Space is a real luxury — choosing the right floor plan"*
- *"Home organization secrets for apartment living"*
- *"Interior color palettes that reflect your personality"*
- *"Bringing nature indoors: balcony gardens and biophilic design"*
- Project spotlight articles (e.g., flagship community features)

---

### 5.4 Additional Pages (SPA Routes)

| Route | Description | Access |
|-------|-------------|--------|
| `/about` | Company story, leadership, values | Public |
| `/projects` | Full project catalog with filters | Public |
| `/projects/:slug` | Gallery, floor plans, amenities, location map, enquiry CTA | Public |
| `/contact` | Extended contact form + office details | Public |
| `/auth/sign-in` | Login form | Public |
| `/auth/register` | Registration form | Public |
| `/auth/forgot-password` | Password reset request | Public |
| `/account` | Profile, password change | `user`+ |
| `/admin` | Dashboard overview | `editor`+ |
| `/admin/blog` | Post list + editor | `editor`+ |
| `/admin/leads` | Lead inbox | `admin` |
| `/admin/users` | User & role management | `admin` |

---

## 6. Non-Functional Requirements

### 6.1 Performance
- First Contentful Paint < 1.5s on 4G
- Route transitions < 300ms perceived
- Lazy-load images, code-split by route
- Lighthouse Performance score ≥ 90

### 6.2 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigable, focus indicators, alt text on images
- Reduced-motion respect (`prefers-reduced-motion`)

### 6.3 SEO
- SSR or pre-rendering for public routes (homepage, projects, public blog)
- Structured data: `Organization`, `RealEstateAgent`, `BlogPosting`
- Sitemap.xml and robots.txt

### 6.4 Security
- HTTPS only; HSTS enabled
- Password hashing (bcrypt / Argon2)
- CSRF protection on mutations
- Rate limiting on auth and lead endpoints
- Input sanitization for blog HTML (XSS prevention)
- RBAC enforced server-side (never client-only)

### 6.5 Responsive Design
- Mobile-first breakpoints: 320, 768, 1024, 1280px
- Touch-friendly CTAs (min 44×44px)

### 6.6 Browser Support
- Latest 2 versions: Chrome, Firefox, Safari, Edge
- Graceful degradation on older browsers

---

## 7. Technical Architecture (Recommended)

### 7.1 Stack (Proposal)

| Layer | Technology |
|-------|------------|
| **Frontend** | React + TypeScript, Vite or Next.js (App Router with client navigation) |
| **Styling** | Tailwind CSS + Framer Motion (animations) |
| **Routing** | React Router or Next.js file-based routes |
| **State** | TanStack Query (server state) + Zustand (UI state) |
| **Auth** | NextAuth.js / Clerk / custom JWT + refresh |
| **API** | REST or tRPC; Node.js / Next.js API routes |
| **Database** | PostgreSQL (users, posts, leads, projects) |
| **CMS** | Custom admin UI (MVP) or headless CMS (Phase 2) |
| **Media** | Vercel Blob / S3 + CDN |
| **Email** | Resend / SendGrid (verification, password reset) |
| **Hosting** | Vercel (frontend + API) or similar |

### 7.2 SPA Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Ekasar Realty SPA                        │
├─────────────────────────────────────────────────────────────┤
│  Public Shell          │  Auth Shell        │  Admin Shell  │
│  ─────────────         │  ──────────        │  ───────────  │
│  Home (interactive)    │  /account          │  /admin/blog    │
│  /projects             │  /auth/*           │  /admin/leads   │
│  /blog (teaser/full)   │                    │  /admin/users   │
├─────────────────────────────────────────────────────────────┤
│              Client Router + Auth Guard Middleware           │
├─────────────────────────────────────────────────────────────┤
│                    API Layer (REST / tRPC)                   │
│   /api/auth/*  /api/posts/*  /api/projects/*  /api/leads/*  │
├─────────────────────────────────────────────────────────────┤
│   PostgreSQL   │   Object Storage   │   Email Service       │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 Data Models (Core Entities)

**User**
- `id`, `email`, `passwordHash`, `name`, `phone`, `role`, `emailVerified`, `createdAt`

**Post**
- `id`, `slug`, `title`, `excerpt`, `body`, `coverImageUrl`, `visibility` (public | member | draft), `authorId`, `publishedAt`, `tags[]`

**Project**
- `id`, `slug`, `name`, `status`, `location`, `bhkTypes[]`, `description`, `images[]`, `highlights[]`, `featured`

**Lead**
- `id`, `name`, `email`, `phone`, `projectInterest`, `message`, `source`, `createdAt`

---

## 8. User Experience — Interactive Front Page Details

### 8.1 Motion & Interaction Spec

| Element | Interaction |
|---------|-------------|
| Hero | Subtle parallax on scroll; text fade-up on load |
| Nav | Transparent → solid background on scroll; active section highlight |
| Pillar cards | Staggered reveal; hover scale 1.02 |
| Stat counters | Count-up animation when 50% visible |
| Project carousel | Drag/swipe on mobile; snap points; autoplay optional |
| Blog cards | Hover overlay with "Read more" |
| CTA buttons | Ripple or glow on hover |
| Page transitions | Cross-fade between routes |

### 8.2 Reduced Motion
When `prefers-reduced-motion: reduce`, disable parallax and count-up; use instant state changes.

---

## 9. Product Lifecycle

### Phase 0 — Discovery & Design (Weeks 1–2)
- [ ] Finalize brand guidelines (logo, colors, typography)
- [ ] Wireframes for homepage, project detail, blog, auth flows
- [ ] High-fidelity mockups (desktop + mobile)
- [ ] PRD sign-off (this document)
- [ ] Technical spike: auth provider choice, hosting

**Deliverables:** Figma designs, approved PRD, architecture decision record (ADR)

---

### Phase 1 — MVP Foundation (Weeks 3–6)

**Goal:** Launch public marketing site with basic auth and blog.

| Week | Focus | Outputs |
|------|-------|---------|
| 3 | Project setup, design system, routing shell | Repo, CI/CD, component library |
| 4 | Interactive homepage (all public sections) | Homepage with animations |
| 5 | Projects pages, lead form, API | `/projects`, lead capture |
| 6 | Auth (register, sign-in, email verify), public + member blog | Auth flows, `/blog` |

**MVP Scope:**
- ✅ Interactive homepage
- ✅ Project listing + detail pages
- ✅ Email/password auth with roles (`user`, `editor`, `admin`)
- ✅ Blog with public vs member visibility
- ✅ Basic admin blog editor
- ✅ Lead form storage
- ❌ OAuth, scheduling, comments (deferred)

**Launch Criteria:**
- All MVP routes functional on staging
- Security review on auth endpoints
- Lighthouse ≥ 85 on homepage
- 5 seed blog posts (mix of public + member)
- 2+ seed projects

---

### Phase 2 — Growth & Operations (Weeks 7–10)

- Admin lead dashboard with export (CSV)
- Blog search, tags, related posts
- Scheduled publishing
- Google OAuth signup
- SEO pre-rendering / SSR for public pages
- Analytics (Plausible / GA4) + conversion events
- WhatsApp floating CTA
- Email newsletter integration (optional)

---

### Phase 3 — Engagement & Scale (Weeks 11–16)

- User saved projects / wishlist
- Blog comments (moderated)
- Partner/broker portal (role: `partner`)
- A/B testing on hero CTAs
- Multi-language support (English + Kannada/Hindi)
- CRM integration (Zoho / HubSpot)
- Performance hardening, CDN tuning

---

### Phase 4 — Maintain & Iterate (Ongoing)

| Activity | Cadence |
|----------|---------|
| Content updates (blog, projects) | Weekly |
| Dependency & security patches | Monthly |
| Uptime / error monitoring review | Weekly |
| KPI dashboard review | Monthly |
| User feedback synthesis | Quarterly |
| Major feature planning | Quarterly |

**Operational Runbook:**
1. **Incident:** Roll back via Vercel deployment; notify stakeholders
2. **Content publish:** Editor drafts → admin review → publish
3. **New project launch:** Admin adds project → feature on homepage carousel
4. **Lead SLA:** Sales responds within 24 hours; tracked in admin dashboard

---

## 10. Content Strategy

### 10.1 Homepage Copy Framework (Draft)

| Section | Sample Copy Direction |
|---------|----------------------|
| Hero headline | *"Real estate, reimagined for modern families"* |
| Subheadline | *Ekasar Realty builds communities where trust, design, and value meet.* |
| Pillars | Trust & Compliance · Value Engineering · Lifestyle Design · Quality Standards · On-Time Delivery · Sustainable Living |
| CTA | *Explore Our Projects* / *Schedule a Site Visit* |

### 10.2 Blog Cadence
- 2 public posts/month (SEO + awareness)
- 1 member-only post/month (exclusive insights for registered users)
- 1 project spotlight per new launch

---

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Client-only auth checks bypassed | High | Server-side RBAC on every API route |
| Poor mobile performance with heavy animations | Medium | Lazy load, reduced motion, perf budget |
| Low blog engagement | Medium | Teaser strategy + email nudges to registered users |
| Lead form spam | Medium | honeypot, rate limit, optional reCAPTCHA |
| Scope creep on homepage interactions | Medium | Freeze MVP interaction spec; Phase 2 for extras |

---

## 12. Open Questions

| # | Question | Owner | Due |
|---|----------|-------|-----|
| 1 | Final brand tagline and color palette? | Marketing | Week 1 |
| 2 | Clerk vs NextAuth vs custom auth? | Engineering | Week 2 |
| 3 | Which projects to feature at launch? | Sales | Week 4 |
| 4 | Member-only blog: require registration or paid tier later? | Product | Week 3 |
| 5 | Google Maps API key and office coordinates? | Ops | Week 5 |
| 6 | Legal: Privacy Policy and Terms draft? | Legal | Week 5 |

---

## 13. Appendix

### 13.1 Glossary
- **SPA:** Single Page Application — client-side routing without full page reloads
- **RBAC:** Role-Based Access Control
- **SFT:** Square Feet (area metric, common in Indian real estate)
- **BHK:** Bedroom-Hall-Kitchen unit type (e.g., 2 BHK, 3 BHK)

### 13.2 Reference Links
- [MSR Infraa](https://www.msrinfraa.in/) — design and IA inspiration
- [MSR Infraa Blog Examples](https://www.msrinfraa.in/space-is-a-real-luxury/) — content tone reference

### 13.3 Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-06-17 | Product | Initial PRD draft |

---

*End of PRD*
