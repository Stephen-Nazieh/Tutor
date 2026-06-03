# Solocorn — AI Coding Agent Guide

> **Last updated:** 2026-06-03
> **Covers:** `tutorme-app/` (main Next.js app), `landing-page/` (Vite landing page), `services/adk/` (Google ADK microservice), `design-system/` (shared design tokens)

---

## Project Overview

Solocorn (also marketed as CogniClass) is an AI-human hybrid tutoring platform. It provides 24/7 Socratic AI tutoring alongside live group clinics led by human tutors. The platform supports four user roles — **Student**, **Tutor**, **Parent**, and **Admin** — and is built for global deployment with particular focus on Chinese market adaptation.

**Core capabilities**
- AI tutors use the Socratic method (never give direct answers; guide students to discover).
- Live clinics: 1 tutor can manage up to 50 students with real-time AI monitoring.
- Video learning with inline quizzes and AI-generated assessments.
- Gamification: XP, missions, achievements, badges, and leaderboards.
- Multi-role dashboards with distinct feature sets per role.
- Collaborative whiteboard (tldraw + Yjs + Fabric.js).
- Real-time polling, chat, and presence via Socket.io.
- Payment processing through Airwallex, Hitpay, WeChat Pay, and Alipay.

**Target tutor-to-student ratio:** 1 : 50
**Supported locales:** `en` (default), `zh-CN`, `es`, `fr`, `de`, `ja`, `ko`, `pt`, `ru`, `ar` (code supports 10 locales; only `en.json` and `zh-CN.json` translation files currently exist in `messages/`)
**Main app default port:** `3003`
**Landing page default port:** `3000`
**ADK service default port:** `8080` (configured via `PORT` env var; docker-compose maps to `4310`)

---

## Repository Layout

This repository contains three independent sub-projects. **There is no root `package.json`** and no npm workspace / Turborepo configuration. Each sub-project is managed independently.

```
c:\VSCODE\Tutor/
│
├── tutorme-app/              # Main Next.js application (all backend + primary frontend)
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   │   ├── [locale]/     # i18n route segments (pages per role)
│   │   │   │   ├── student/  # Student dashboard & features (35+ sub-routes)
│   │   │   │   ├── tutor/    # Tutor dashboard & clinic management (30+ sub-routes)
│   │   │   │   ├── parent/   # Parent dashboard & family management (20+ sub-routes)
│   │   │   │   ├── admin/    # Admin dashboard & system management (15+ sub-routes)
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── onboarding/
│   │   │   │   ├── payment/
│   │   │   │   ├── legal/
│   │   │   │   ├── forgot-password/
│   │   │   │   ├── api-docs/
│   │   │   │   ├── categories/
│   │   │   │   ├── session/
│   │   │   │   ├── tutors/
│   │   │   │   └── u/
│   │   │   └── api/          # REST API endpoints (45 top-level domains, 216+ route files)
│   │   ├── components/       # React components (feature-organized, 150+ files)
│   │   ├── lib/              # Business logic, utilities, AI, db, security, etc. (63 dirs, 258+ files)
│   │   ├── hooks/            # Custom React hooks (11 files)
│   │   └── stores/           # Zustand client stores (2 files)
│   ├── e2e/                  # Playwright E2E specs (10 test files)
│   ├── drizzle/              # Drizzle migration files (74 migrations)
│   ├── messages/             # next-intl JSON translations (en.json, zh-CN.json)
│   ├── scripts/              # Build, deployment & utility scripts (40+ files)
│   ├── src/scripts/          # TypeScript runtime scripts (seed, verify, etc.)
│   ├── server.ts             # Custom Next.js HTTP server with Socket.io
│   ├── Dockerfile            # Full .next + custom server build
│   ├── Dockerfile.production # Standalone-output build for GCP Cloud Run
│   ├── Dockerfile.test       # Test-specific Docker image
│   ├── docker-compose.prod.yml # Full production stack compose
│   ├── next.config.mjs       # Next.js configuration (standalone, Sentry, intl)
│   ├── tsconfig.json         # TypeScript strict config
│   ├── eslint.config.mjs     # ESLint flat config
│   ├── tailwind.config.ts    # Tailwind v3 with extensive custom theme
│   ├── drizzle.config.ts     # Drizzle Kit configuration
│   ├── vitest.config.ts      # Unit test configuration
│   ├── vitest.integration.config.ts # Integration test configuration
│   ├── playwright.config.ts  # E2E test configuration
│   └── package.json          # Node scripts & dependencies
│
├── landing-page/             # Vite + React 19 + TypeScript marketing site
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── vite-env.d.ts
│   │   └── components/
│   │       ├── Layout.tsx
│   │       ├── ProfilePage.tsx
│   │       ├── RegistrationPage.tsx
│   │       └── ContactModal.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
│
├── services/adk/             # Google ADK microservice (Express + TypeScript)
│   ├── src/
│   │   ├── server/           # Express server, routes, auth middleware
│   │   ├── agents/           # ADK agent definitions (briefing, content-generator, grading, live-monitor, pci-master, supervisor, tutor)
│   │   ├── adapters/         # External service adapters (cache, db, llm, daily)
│   │   ├── live-transcription/# Daily.co VTT polling worker
│   │   ├── memory/           # Memory / context storage
│   │   ├── observability/    # Logging & monitoring
│   │   ├── prompts/          # Prompt templates
│   │   ├── tools/            # Agent tools
│   │   └── validation/       # Zod schemas
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── design-system/            # Shared design tokens and guidelines
    └── solocorn/
        └── MASTER.md
```

---

## Key Configuration Files

| File | Project | Purpose |
|------|---------|---------|
| `tutorme-app/next.config.mjs` | Main app | Next.js standalone output, image remote patterns, webpack aliases for jspdf/fflate, async rewrites (root `/` → `index.html` for landing page integration), conditional Sentry wrapping |
| `tutorme-app/tsconfig.json` | Main app | Strict TypeScript (`strict: true`), `target: ES2017`, `moduleResolution: bundler`, path alias `@/*` → `./src/*`, excludes `scripts` and test files from compilation |
| `tutorme-app/eslint.config.mjs` | Main app | Flat ESLint config extending `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`, and `prettier`. Custom security rules and relaxed React hooks rules |
| `tutorme-app/tailwind.config.ts` | Main app | Tailwind CSS v3 with extensive custom design system: HSL color tokens, elevation shadows, animation keyframes, Chinese font stack, z-index scale |
| `tutorme-app/drizzle.config.ts` | Main app | Drizzle Kit pointing to `src/lib/db/schema/index.ts`, output to `./drizzle`, PostgreSQL dialect |
| `tutorme-app/vitest.config.ts` | Main app | Unit tests in jsdom, includes `src/**/*.test.{ts,tsx}`, mocks `@google/genai` |
| `tutorme-app/vitest.integration.config.ts` | Main app | Integration tests in node environment, 15s timeout, includes `src/__tests__/integration/**/*.test.ts` |
| `tutorme-app/playwright.config.ts` | Main app | E2E matching `e2e/**/*.spec.ts` and `src/__tests__/accessibility/**/*.test.ts`, Chromium only, webServer command `npm run dev:next` |
| `tutorme-app/.env.example` | Main app | Template for all required and optional environment variables |
| `landing-page/vite.config.ts` | Landing page | Vite 6 with React plugin, Tailwind CSS v4 vite plugin, port 3000 |
| `landing-page/tsconfig.json` | Landing page | ES2022, `moduleResolution: bundler`, path alias `@/*` → `./*`, `allowImportingTsExtensions: true` |
| `services/adk/tsconfig.json` | ADK | `module: NodeNext`, `outDir: dist`, `rootDir: src`, `strict: false` |
| `.github/workflows/ci.yml` | Root | CI pipeline: typecheck, build, test, lint, format, security |
| `.github/workflows/deploy-gcp.yml` | Root | GCP Cloud Run production deployment on push to `main` |

---

## Technology Stack

| Layer | Technology | Version / Notes |
|-------|------------|-----------------|
| **Framework** | Next.js (App Router) | `^16.1.6`, `output: 'standalone'` |
| **Language** | TypeScript | `^5.9.3`, strict mode (`strict: true`) |
| **UI** | React | `^18` (main app); `^19` (landing page) |
| **Styling** | Tailwind CSS | `^3.4.1` (main app); `^4.1.14` (landing page) |
| **Components** | shadcn/ui + Radix UI | Headless primitives installed to `src/components/ui/` |
| **Animation** | framer-motion / motion | `^12.34.0` (main app); `motion ^12.23.24` (landing page) |
| **State** | Zustand | `^5.0.11` |
| **Drag & Drop** | @dnd-kit | `^6.3.1` core, `^10.0.0` sortable |
| **ORM** | Drizzle ORM | `^0.45.2` (primary; Prisma is **not** used) |
| **DB Driver** | pg (node-postgres) | `^8.13.0`, connection pooling |
| **Database** | PostgreSQL | 16 (recommended) |
| **Cache / PubSub** | Redis | `^7` via `ioredis ^5.9.2` |
| **Real-time** | Socket.io | `^4.8.3` (server + client), Redis adapter |
| **Auth** | NextAuth.js | `^4.24.13`, JWT sessions, CredentialsProvider |
| **i18n** | next-intl | `^4.8.3`, 10 locales configured, RTL support for `ar` |
| **Validation** | Zod | `^4.3.6` (main app); `^3.23.8` (ADK service) |
| **Video** | Daily.co | `@daily-co/daily-js ^0.87.0` |
| **Whiteboard** | tldraw + Yjs + Fabric.js | Collaborative canvas |
| **AI Providers** | Kimi K2.5 (Moonshot) | Primary via `@/lib/ai/kimi.ts` |
| **AI Orchestration** | `@/lib/agents/orchestrator-llm.ts` | Fallback + response caching |
| **ADK Service** | Google ADK | Optional microservice in `services/adk/` |
| **Payments** | Airwallex, Hitpay, WeChat Pay, Alipay | Gateway abstraction in `lib/payments/` |
| **Monitoring** | Sentry | `@sentry/nextjs ^10.39.0` (optional, wrapped conditionally) |
| **Testing (unit)** | Vitest | `^4.1.0` with jsdom |
| **Testing (E2E)** | Playwright | `@playwright/test ^1.49.0` |
| **Load testing** | k6 | Scripts in `scripts/load/` |
| **Build tool** | esbuild | Service worker build, custom server compile |
| **Server runner** | tsx | `server.ts` in dev; `node` in production |

---

## Runtime Architecture

The main app does **not** use the standard Next.js dev server. Instead, it runs a custom HTTP server defined in `server.ts`:

1. **Immediate port binding** — The HTTP server binds to `PORT` (default `3003`) immediately so the host considers the container healthy.
2. **Background initialization** — After binding, the server initializes in this order:
   - Environment validation (`src/lib/env.ts`)
   - Idempotent schema drift fixes (dev/local only)
   - Next.js renderer preparation (`app.prepare()`)
   - Socket.io enhanced server initialization (`initEnhancedSocketServer`)
3. **Health endpoint** — `/api/health` and `/health` return `200` only when `isReady === true`. Until then, they return `503` with `Retry-After: 2`.
4. **Graceful degradation** — If Socket.io fails but Next.js prepares successfully, the server still serves UI traffic (real-time features are degraded).
5. **Memory monitoring** — A 15-second interval logs RSS and heap usage to help diagnose OOM kills.
6. **Request logging** — Set `DEBUG_SERVER=true` to log all incoming requests.

> **Important:** Always start the main app with `npm run dev` (which runs `NODE_ENV=production tsx server.ts`), not a bare Next.js server. Otherwise Socket.io and the health check will not be available.

---

## Build, Dev & Deploy Commands

All primary commands run from **`tutorme-app/`** unless noted.

### Development

```bash
# Start the custom Next.js server with Socket.io (production mode locally)
npm run dev

# Landing page (from landing-page/ directory)
cd ../landing-page && npm run dev     # http://localhost:3000

# ADK service (from services/adk/ directory)
cd ../services/adk && npm run dev     # default port 8080
```

> **Note:** `npm run dev` in `tutorme-app` sets `NODE_ENV=production` and launches `server.ts` via `tsx`. This is the intended local development path because it includes Socket.io and matches production behavior. `npm run dev:next` is an alias for `npm run dev`.

### Production Build

```bash
npm run build        # Builds service worker + Next.js standalone output (uses --webpack flag)
npm run build:sw     # Compiles src/lib/pwa/service-worker.ts → public/sw.js via esbuild
npm run start        # Production Next.js start (used inside Docker standalone image)
```

### Database

```bash
npm run db:migrate           # Run pending Drizzle migrations (drizzle-kit migrate)
npm run db:migrate:deploy    # Deploy migrations via script (scripts/migrate.js)
npm run db:apply-schema      # Apply schema changes via script (scripts/apply-schema-changes.js)
npm run db:check-schema      # Check for schema drift (scripts/check-schema-drift.js)
npm run drizzle:generate     # Generate new migration SQL
npm run drizzle:studio       # Open Drizzle Studio (https://local.drizzle.studio)
npm run drizzle:push         # Push schema changes (force)
npm run drizzle:pull         # Pull schema from database
npm run db:seed              # Seed sample data (tsx src/scripts/seed-db.ts)
npm run db:seed:admin        # Seed admin user and roles only
```

### Testing

```bash
npm run test                 # Vitest unit tests (jsdom)
npm run test:unit            # Alias for vitest run
npm run test:watch           # Vitest watch mode
npm run test:integration     # Integration tests (node env; needs Postgres)
npm run test:e2e             # Playwright E2E tests
npm run test:e2e:ui          # Playwright with interactive UI
npm run test:e2e:a11y        # Accessibility tests (Playwright)
```

> **E2E requirements:** The app must be running (default `http://localhost:3003`). Some specs expect seeded test users (e.g., `student@example.com` / `Password1`).
> **Integration requirements:** Requires `DATABASE_URL` pointing to a test database (e.g., `tutorme_test`). The integration test job in CI (`ci.yml`) is currently commented out.
> **Important:** The `playwright.config.ts` references `npm run dev:next` as the webServer command, which is an alias for `npm run dev`. Start the app manually with `npm run dev` before running E2E tests.

### Code Quality

```bash
npm run lint                 # ESLint flat config (eslint.config.mjs)
npm run lint:fix             # Auto-fix ESLint issues
npm run format               # Prettier format src/**/*.{ts,tsx}
npm run format:check         # Check formatting without writing
npm run typecheck            # tsc --noEmit
npm run security:check       # npm audit --audit-level=high
```

### ADK Service (optional)

```bash
cd services/adk
npm run dev       # ADK_START_LISTENER=true tsx src/server/index.ts
npm run build     # tsc build
npm run start     # ADK_START_LISTENER=true node dist/server/index.js
npm run lint      # eslint .
npm run test      # node --import tsx --test
```

---

## Environment Configuration

Copy `tutorme-app/.env.example` to `tutorme-app/.env.local` and configure.

**Critical variables**

```bash
# Database (required)
DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:5433/tutorme"
DIRECT_URL="postgresql://tutorme:tutorme_password@localhost:5433/tutorme"

# Redis (required for cache + Socket.io adapter)
REDIS_URL="redis://localhost:6379"

# Auth (required)
NEXTAUTH_SECRET="min_32_chars_random"
NEXTAUTH_URL="http://localhost:3003"

# AI (required for AI features)
KIMI_API_KEY="your_kimi_api_key"
ADK_BASE_URL="http://localhost:4310"   # optional
ADK_AUTH_TOKEN="dev-token"             # optional

# Video (required for live clinics)
DAILY_API_KEY="your_daily_api_key"

# Payments (required for checkout flows)
AIRWALLEX_CLIENT_ID=...
AIRWALLEX_API_KEY=...
HITPAY_API_KEY=...
HITPAY_SALT=...
PAYMENT_DEFAULT_GATEWAY=HITPAY

# Chinese payment gateways (optional)
WECHAT_MCH_ID=...
WECHAT_PAY_PRIVATE_KEY="..."
WECHAT_PAY_API_V3_KEY=...
ALIPAY_APP_ID=...
ALIPAY_PRIVATE_KEY="..."

# Sentry (optional)
SENTRY_DSN=...
NEXT_PUBLIC_SENTRY_DSN=...

# App
NEXT_PUBLIC_APP_URL="http://localhost:3003"
NODE_ENV="development"
SKIP_MIGRATIONS=false
MIGRATIONS_REQUIRED=true

# Cache TTL settings (seconds)
CACHE_TTL_DEFAULT=60
CACHE_TTL_USER=300
CACHE_TTL_LEADERBOARD=300
CACHE_TTL_CONTENT=600
CACHE_TTL_PARENT_DASHBOARD=180
CACHE_TTL_STUDENT_ANALYTICS=45
CACHE_TTL_PARENT_FINANCIAL=120
CACHE_TTL_PARENT_FAMILY=300

# Security
SECURITY_COMPRESS=true
SECURITY_ENCRYPT=true
SECURITY_AUDIT=true
SECURITY_RATE_LIMIT=300
SECURITY_MAX_REQUESTS_PER_MINUTE=1000

# Google Cloud Storage (optional)
# GCS_BUCKET=...
# GCS_VIDEO_BUCKET=...
# GCP_PROJECT_ID=...
# GCP_SA_KEY='...'
```

There is **no `middleware.ts` at the Next.js app root** in this project. Route guards, i18n routing, CSP, and rate-limiting are handled via:
- `next-intl` routing configuration (`src/lib/i18n/config.ts`)
- API route middleware utilities (`src/lib/api/middleware.ts`)
- Edge-oriented helpers (`src/lib/middleware-edge/`)

Startup environment validation lives in `src/lib/env.ts` and is called from `server.ts`. It **requires** `DATABASE_URL` and `NEXTAUTH_SECRET` (min 32 chars) and warns if `REDIS_URL`, `KIMI_API_KEY`, or Sentry DSNs are missing in production.

---

## Code Organization

### App Router (`src/app/`)

- `src/app/layout.tsx` — Root layout with metadata, PWA manifest, theme init script, service worker unregister script, Google Fonts (Fira Code, Fira Sans), and top-level providers (`Providers`, `PerformanceProviders`).
- `src/app/[locale]/layout.tsx` — Locale layout wrapping `NextIntlClientProvider`, `ThemeProvider`, `NavigationOverlayProvider`, `FloatingVideoOverlay`, `PWAInstallPrompt`, `Toaster`, and `AuthProvider`. Validates locale param against configured locales.
- `src/app/[locale]/` — All user-facing pages grouped by role (`student/`, `tutor/`, `parent/`, `admin/`) plus shared pages (`login/`, `register/`, `onboarding/`, `payment/`, `legal/`, `forgot-password/`, `api-docs/`, `categories/`, `session/`, `tutors/`, `u/`).
- `src/app/api/` — REST API endpoints mirroring the UI structure. Each folder contains `route.ts` (or segment-specific route files). There are 45 top-level API domains and 216+ route files.

**Role-specific layout behaviors:**
- **Student layout** (`[locale]/student/layout.tsx`): Collapsible sidebar, special handling for `/student/tutors` (no sidebar), `/student/feedback` (hides nav entirely), and live class routes.
- **Tutor layout** (`[locale]/tutor/layout.tsx`): Realm-session check, redirects non-tutors, skips sidebar for Course Builder, Course Publish, Insights, Account, and Reports pages.
- **Parent layout** (`[locale]/parent/layout.tsx`): Sidebar with 5 sections (Overview, Learning, Financial, Communication, Settings), mobile slide-out menu via Sheet.
- **Admin layout** (`[locale]/admin/layout.tsx`): Completely separate auth system (not NextAuth.js). Checks session via `fetch('/api/admin/auth/session')`. Redirects unauthenticated to `/[locale]/admin/login`.

### Components (`src/components/`)

Organized by feature domain (150+ component files across 30+ top-level directories):
- `ui/` — shadcn/ui primitives (Button, Card, Dialog, etc.) — 30+ components
- `ai-chat/`, `ai-tutor/` — AI interaction UIs
- `class/` — Live classroom (whiteboard, polls, breakout rooms, engagement) — 23+ files
- `student/`, `tutor/`, `parent/`, `admin/` — Role-specific dashboards
- `video-player/`, `quiz/`, `polls/`, `whiteboard/`, `course-builder/` — Content & assessment UIs
- `spaced-repetition/` — 12 components for spaced repetition system
- `navigation/`, `notifications/`, `pwa/`, `pdf/`, `mentions/` — Supporting UI domains
- `achievements.tsx`, `bookmarks-list.tsx`, `knowledge-graph.tsx`, `my-subjects.tsx`, `study-recommendations.tsx`, `student-profile.tsx`, `payment-gateway-selector.tsx`, `user-nav.tsx` — Standalone shared components

### Library (`src/lib/`)

Domain-organized business logic (63 directories, 258+ files):
- `lib/db/` — Drizzle client (`drizzle.ts`), schema (`schema/`), and migrations
- `lib/ai/` — AI provider integrations (`kimi.ts`), prompts, teaching prompts, types, memory services
- `lib/agents/` — Orchestrator (`orchestrator-llm.ts`), tutor agents, grading, live-monitor, content-generator, task-generator, tutor-chat-service
- `lib/payments/` — Payment gateway integrations (Airwallex, Hitpay, Chinese gateways)
- `lib/security/` — RBAC, rate limiting, CSRF, admin IP restrictions, suspicious-activity logging, client encryption, sanitization, comprehensive audit, PIPL compliance
- `lib/socket/` & `lib/socket-server-enhanced.ts` — Socket.io server and realtime state
- `lib/cache/` — Redis caching layer
- `lib/i18n/` & `lib/localization/` — i18n config and helpers
- `lib/validation/` — Zod schemas
- `lib/reports/`, `lib/analytics/` — Reporting & analytics
- `lib/monitoring/`, `lib/performance/` — Observability helpers
- `lib/api/middleware.ts` — Standardized API route middleware (auth, RBAC, rate limit, CSRF, error handling)

### Hooks (`src/hooks/`)

Custom React hooks (11 files):
- `use-socket.ts`, `use-simple-socket.ts` — Socket.io client hooks
- `use-daily-call.ts` — Daily.co video integration
- `use-realm-session.ts` — Multi-role session handling
- `useChat.ts` — General chat hook
- `useParent.ts`, `useParentFinancialCalculations.ts`, `useParentNotifications.ts`, `useParentRealTimeNotifications.ts` — Parent-specific hooks
- `use-course-assignments.ts` — Course assignment hook

### Stores (`src/stores/`)

Zustand stores for client state:
- `communication-store.ts`
- `video-overlay-store.ts`

---

## Database Architecture

### ORM & Schema

- **Drizzle ORM** is the only ORM in use. No Prisma client is present.
- Schema source of truth: `src/lib/db/schema/`
  - `enums.ts` — ~20 PostgreSQL enums (Role, PollType, PaymentStatus, LiveSessionStatus, BuilderTaskType, etc.)
  - `tables/` — Table definitions (14 table modules: admin, analytics, assistant, auth, builder, calendar, classroom, collaboration, content, course, family, finance, index, live)
  - `relations.ts` — Drizzle relational definitions
  - `next-auth.ts` — NextAuth.js Drizzle adapter tables
  - `compliance.ts` — GDPR / COPPA / FERPA compliance tables
  - `landing.ts` — Landing page inquiry/signup tables
- Migrations live in `drizzle/` (74 migrations) and are managed by `drizzle-kit`.
- Runtime client: `src/lib/db/drizzle.ts` uses `pg.Pool` with singleton pooling (dev pool cached on `globalThis`).
- Legacy wrapper: `src/lib/db/index.ts` provides a query caching layer (Redis → in-memory fallback). Most app code imports `db` from here; new code should import `drizzleDb` from `./drizzle`.

### Connection Strategy

- `DATABASE_URL` / `DIRECT_URL` — Standard connections.
- `DATABASE_POOL_URL` — Optional PgBouncer connection string for production.
- Pool sizes: 5 max in development, 50 max in production.
- Redis is used for caching, session-like state, and the Socket.io Redis adapter.

### Key Tables

- **Auth/Users** (`tables/auth.ts`): `User`, `Account`, `Profile`, `TutorApplication`, `AvatarStorage`
- **Courses** (`tables/course.ts`): `Course`, `CourseLesson`, `CourseEnrollment`, `CourseProgress`, `CourseLessonProgress`, `LessonSession`, `StudentPerformance`, `TaskSubmission`, `FeedbackWorkflow`, `CourseVariant`
- **Live Sessions** (`tables/live.ts`): `LiveSession`, `SessionParticipant`, `Poll`, `PollOption`, `PollResponse`, `Message`, `Conversation`, `DirectMessage`, `Notification`, `DeployedMaterial`, `SessionReplayArtifact`
- **Payments** (`tables/finance.ts`): `Payment`, `Refund`, `WebhookEvent`, `Payout`, `PaymentOnPayout`, `PlatformRevenue`
- **Family/Parent** (`tables/family.ts`): `FamilyAccount`, `FamilyMember`, `FamilyBudget`, `FamilyPayment`, `BudgetAlert`, `ParentActivityLog`, `StudentProgressSnapshot`, `ParentSpendingLimit`
- **Content** (`tables/content.ts`): `ContentItem`, `VideoWatchEvent`, `ContentQuizCheckpoint`, `ContentProgress`, `ReviewSchedule`, `Note`, `Bookmark`
- **Calendar** (`tables/calendar.ts`): `CalendarConnection`, `CalendarEvent`, `CalendarAvailability`, `CalendarException`, `OneOnOneBookingRequest`
- **Admin** (`tables/admin.ts`): `AdminRole`, `AdminAssignment`, `FeatureFlag`, `LlmProvider`, `LlmModel`, `LlmRoutingRule`, `SystemSetting`, `AdminAuditLog`, `AdminSession`, `IpWhitelist`
- **Builder** (`tables/builder.ts`): `BuilderTask`, `BuilderTaskExtension`, `BuilderTaskFile`, `BuilderTaskVersion`, `BuilderTaskDmi`, `TaskDeployment`, `TutorAsset`
- **Compliance** (`schema/compliance.ts`): `consent_logs`, `deletion_requests`, `pii_access_logs`, `third_party_audits`, `data_export_requests`, `age_verifications`, `privacy_policy_versions`

### Schema Patterns

- **Soft deletes:** Multiple tables support soft deletion via `deletedAt` timestamp (e.g., `Course`, `CourseLesson`, `BuilderTask`, `FeatureFlag`, `CalendarEvent`).
- **Heavy JSONB usage:** `builderData` (lessons), `availability` (profile), `metadata` (payments, tasks), `conceptMastery`, `answers`, `aiFeedback`, `schedule` (courses).
- **Indexes:** Almost every table has domain-relevant indexes on foreign keys, status columns, and composite unique indexes for junction tables.
- **Primary keys:** Most tables use `text('id').primaryKey()` with app-generated UUIDs; some use `uuid('id').defaultRandom()`.
- **Timestamps:** Standard pattern: `createdAt` (defaultNow) and `updatedAt` (defaultNow + $onUpdate).
- **Naming:** Table names PascalCase, columns camelCase. Exception: compliance tables use snake_case columns.

---

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** (`strict: true` in `tsconfig.json`).
- Use `interface` for object shapes; `type` for unions and complex types.
- Prefer explicit return types on exported functions.
- Path alias: `@/*` maps to `src/*`.

```typescript
// Good
interface UserProps {
  id: string;
  email: string;
  role: Role;
}

export async function fetchUser(id: string): Promise<User | null> {
  // implementation
}
```

### React Components

- Functional components with explicit props interfaces.
- shadcn/ui components follow Radix UI patterns and use `forwardRef`.
- Use `cn()` utility for conditional Tailwind classes.

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (components) | PascalCase | `Button.tsx`, `StudentDashboard.tsx` |
| Files (non-components) | kebab-case | `format-date.ts`, `use-socket.ts` |
| Components | PascalCase | `AIChatPanel` |
| Functions | camelCase, verb prefix | `fetchUserData`, `handleSubmit` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Database models | PascalCase | `QuizAttempt`, `LiveSession` |
| API routes | kebab-case folders | `api/ai-chat/route.ts` |
| Environment vars | UPPER_SNAKE_CASE | `DATABASE_URL` |

### ESLint Rules (`eslint.config.mjs`)

Flat config extending `nextVitals`, `nextTs`, and `prettier`:

- `@typescript-eslint/no-explicit-any`: `warn`
- `@typescript-eslint/no-require-imports`: `off`
- `@typescript-eslint/no-unused-vars`: `warn` (ignores `_` prefixes)
- `@typescript-eslint/no-empty-object-type`: `off`
- `import/no-anonymous-default-export`: `off`
- `@next/next/no-img-element`: `off`
- `@next/next/no-html-link-for-pages`: `off`
- `@next/next/no-assign-module-variable`: `off`
- `react/no-unescaped-entities`: `off`
- `react/jsx-no-undef`: `off`
- `react/no-children-prop`: `off`
- `react-hooks/exhaustive-deps`: `warn`
- `react-hooks/set-state-in-effect`: `off`
- `react-hooks/purity`: `off`
- `react-hooks/refs`: `off`
- `react-hooks/immutability`: `off`
- `react-hooks/static-components`: `off`
- `jsx-a11y/alt-text`: `off` (project uses explicit a11y patterns)
- `@typescript-eslint/no-unused-expressions`: `off`
- `no-console`: `warn` in production, `off` in development
- `prefer-const`: `error`
- `no-var`: `error`
- `@typescript-eslint/ban-ts-comment`: `warn`
- Security rules: `no-implied-eval`, `no-new-func`, `no-script-url`, `no-proto`, `no-iterator`, `no-extend-native`, `no-with`, `no-caller`, `no-unsafe-finally` are all `error`

### Prettier (`.prettierrc`)

- `semi: false`
- `singleQuote: true`
- `tabWidth: 2`
- `trailingComma: "es5"`
- `printWidth: 100`
- `bracketSpacing: true`
- `arrowParens: "avoid"`
- `endOfLine: "lf"`
- `plugins: ["prettier-plugin-tailwindcss"]`
- `tailwindFunctions: ["cn", "clsx", "cva"]`

### Tailwind / Design System

The main app uses a custom Tailwind v3 theme defined in `tailwind.config.ts` with:
- **HSL CSS variables** for theming (`--primary`, `--secondary`, `--background`, etc.)
- **Elevation shadow system** (`shadow-elevation-1` through `5`, soft shadows, glows)
- **Animation keyframes** (`fade-in`, `scale-in`, `slide-in-right`, `float`, `shimmer`, etc.)
- **Chinese font stack** (`font-chinese`) for `zh-CN` locale support
- **Z-index scale** (`z-dropdown` 100 → `z-toast` 800)
- **Custom spacing** (`18`, `22`, `26`, `30` in rems)

---

## Testing Strategy

### Unit Tests (Vitest)

- **Config:** `vitest.config.ts`
- **Environment:** jsdom
- **Setup:** `src/__tests__/setup.ts` (imports `@testing-library/jest-dom/vitest`, mocks `@google/genai`)
- **Include:** `src/**/*.test.{ts,tsx}` and `src/**/__tests__/**/*.{test,spec}.{ts,tsx}`
- **Exclude:** `node_modules`, `.next`, integration, accessibility
- **No database required.**

### Integration Tests (Vitest)

- **Config:** `vitest.integration.config.ts`
- **Environment:** node
- **Timeout:** 15 seconds
- **Include:** `src/__tests__/integration/**/*.test.ts`
- **Requires:** A running PostgreSQL instance. Set `DATABASE_URL` to a dedicated test database and run migrations before testing.
- **Note:** The integration test job in CI (`ci.yml`) is currently commented out.

### E2E Tests (Playwright)

- **Config:** `playwright.config.ts`
- **Match:** `e2e/**/*.spec.ts` and `src/__tests__/accessibility/**/*.test.ts`
- **Base URL:** `http://localhost:3003` (override with `PLAYWRIGHT_BASE_URL`)
- **Browsers:** Chromium (Desktop Chrome)
- **WebServer:** Playwright references `npm run dev:next` as the webServer command, which is an alias for `npm run dev`. Start the app manually with `npm run dev` before running E2E tests.
- **Retries:** 2 in CI, 0 locally
- **Workers:** 1 in CI
- **Dependencies:** `@axe-core/playwright`
- **E2E spec files:** `ai-tutor.spec.ts`, `live-task-policy-toggle.spec.ts`, `payment.spec.ts`, `pdf-tutoring-lock-sync.spec.ts`, `pdf-tutoring.spec.ts`, `registration.spec.ts`, `student-assignment-document.spec.ts`, `tutor-clinic.spec.ts`, `tutor-course-config.spec.ts`, `tutor-registration.spec.ts`

### Load Tests (k6)

- **Location:** `scripts/load/`
- **Scripts:** `concurrent-users.js`, `ai-stress.js`, `websocket.js`
- **Run:** `k6 run scripts/load/concurrent-users.js` (requires app running)

### CI Pipeline (GitHub Actions)

`.github/workflows/ci.yml` runs the following jobs on `push`/`pull_request` to `main` and `develop`:
1. **typecheck** — `drizzle-kit generate` then `tsc --noEmit`
2. **build** — build landing page, copy to `public/`, install Linux native bindings, clean `.next`, generate Drizzle types, `npm run build`
3. **test** — install Rollup Linux binding, run `npm run test`
4. **lint** — `npm run lint:check -- --max-warnings=999999`
5. **format** — `npm run format:check` (continue-on-error)
6. **security** — `npm run security:check` (continue-on-error)

> **Working directory for CI:** `tutorme-app`

---

## Security Considerations

### Authentication & Authorization

- **NextAuth.js** with JWT session strategy and a custom `CredentialsProvider`.
- **Realm-scoped sessions** allow a user to stay logged in as both Tutor and Student in separate tabs (cookie names: `tutor_session`, `student_session`).
- Role-based access control (`STUDENT`, `TUTOR`, `PARENT`, `ADMIN`) enforced in API routes via `hasPermission()` in `lib/security/rbac.ts`.
- Onboarding and TOS acceptance are tracked in the `profile` table and enforced in auth flows.
- **Admin section uses a completely separate auth system** (not NextAuth.js). It has its own login/logout/session endpoints under `/api/admin/auth/*` and its own session validation in the admin layout.

### API Middleware (`src/lib/api/middleware.ts`)

Exported helpers for route handlers:
- `withAuth` — require login
- `withRole` / `withPermission` — RBAC enforcement
- `withRateLimit` — per-IP / per-user rate limiting
- `withCsrf` — CSRF token verification
- `withAdminIp` — admin IP allowlisting
- `handleApiError` — standardized error responses

Custom error classes: `UnauthorizedError`, `ForbiddenError`, `ValidationError`, `NotFoundError`.

### Rate Limiting

Implemented in `lib/security/rate-limit.ts`:
- General API: configurable per preset
- Stricter limits for login and sensitive endpoints
- Redis-backed sliding-window counters

### Data Protection

- **PII:** Never include real names or PII in AI prompts. Use anonymized student identifiers.
- **SQL Injection:** Prevented by Drizzle ORM (parameterized queries).
- **XSS:** Input sanitization with DOMPurify (`isomorphic-dompurify`).
- **CSP:** Configured dynamically; nonce-based CSP headers managed by edge middleware helpers.
- **Security headers** on `/sw.js`: `no-cache, no-store, must-revalidate`.

### Payment Security

- Webhook endpoints verify signatures (Airwallex, Hitpay).
- Chinese gateway credentials (WeChat Pay, Alipay) are stored as PEM/private keys in environment variables only.

---

## Deployment

### Docker

Three Dockerfiles exist in `tutorme-app/`:
- **`Dockerfile`** — Multi-stage build using `node:20-slim`. Installs LibreOffice for document conversion. Copies full `.next`, `server.ts`, `src`, `drizzle`, and `scripts`. Entrypoint: `node scripts/start-prod.js` (runs migrations, then launches server).
- **`Dockerfile.production`** — Standalone-output focused multi-stage build. Uses `node:20-slim` base with ca-certificates, curl, and LibreOffice. Builder stage creates dummy `.env.production` with fake secrets so `next build` can run, then compiles the custom server via `scripts/build-custom-server.js`. Runner stage copies `.next/standalone`, static assets, drizzle migrations, and the compiled `server.js`. Includes a health check on `/api/health`. Used by GCP Cloud Run deploy.
- **`Dockerfile.test`** — Test-specific Docker image.

The ADK service has its own `Dockerfile` in `services/adk/`:
- Two-stage Alpine build (`node:20-alpine`). Builder compiles TypeScript; production stage installs only production dependencies and runs `dist/server/index.js` on port `8080`.

### Docker Compose

- **`docker-compose.prod.yml`** — Full production stack: `app` (uses `Dockerfile.production`), `adk-service` (port `4310`), `db` (Postgres 16), `redis` (Redis 7).
- **`services/adk/docker-compose.yml`** — Minimal single-service compose for ADK.

### GCP Deployment

`.github/workflows/deploy-gcp.yml` handles GCP Cloud Run deployment on push to `main`:
- **Region:** `asia-southeast1`
- **Service:** `tutorme-app`
- **Artifact Registry:** `tutorme-repo`
- **Dockerfile:** `Dockerfile.production`
- **Resources:** 1 CPU, 1Gi memory, 0–10 instances
- **Env vars passed:** `NODE_ENV`, `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `REDIS_URL`, `ADK_BASE_URL`, `ADK_AUTH_TOKEN`
- **Flow:** `ci` job must pass → build & push main app image + ADK image → deploy ADK service → run DB migrations inline (docker run with `node scripts/migrate.js`) → deploy main app to Cloud Run → route 100% traffic.

### Landing Page Integration

The CI build job and `deploy-gcp.yml` always build the landing page via Vite and copy `landing-page/dist/*` into `tutorme-app/public/`, serving it from the Next.js root URL. `next.config.mjs` rewrites the root path `/` to `/index.html`. `scripts/build-and-integrate-landing.sh` provides a standalone script gated by `INTEGRATE_LEGACY_VITE_LANDING=true`.

### Alternative Deployment

`scripts/deploy-to-ec2.sh` provides an alternative deployment path using Docker Compose + Nginx + Certbot on an EC2 instance.

---

## AI Integration Patterns

Always route AI calls through the orchestrator rather than direct provider imports:

```typescript
import { generateWithFallback, chatWithFallback } from '@/lib/agents'

const result = await generateWithFallback(prompt, { temperature: 0.7 })
const response = await chatWithFallback(messages, { maxTokens: 2048 })
```

- **Primary provider:** Kimi K2.5 (Moonshot AI)
- **Optional fallback:** Google ADK service (`services/adk/`)
- **Caching:** AI responses are cached in Redis for 5 minutes for identical prompts.
- **Mock mode:** Set `MOCK_AI=true` to return mock responses for testing without API keys.

### Socratic Method Requirement

AI tutors must **never** give direct answers. Use the prompt system in `lib/ai/prompts.ts`:
- `socraticTutorPrompt` — Main tutoring interaction
- `chatResponsePrompt` — General chat widget
- `quizGeneratorPrompt` — Assessment creation
- `gradingPrompt` — Short-answer grading

---

## Common Tasks

### Add a shadcn/ui Component

```bash
npx shadcn@latest add <component-name>
```
Components install to `src/components/ui/`.

### Create a Drizzle Migration

```bash
npm run drizzle:generate   # Generates SQL in drizzle/
npm run db:migrate         # Applies pending migrations
```

### Build the Service Worker

```bash
npm run build:sw
```
Compiles `src/lib/pwa/service-worker.ts` into `public/sw.js` via esbuild.

### Open Drizzle Studio

```bash
npm run drizzle:studio
```
Opens at `https://local.drizzle.studio`.

### Reset Dev Environment

There is **no built-in `db:reset` script** in the current `package.json`. To fully reset:
1. Drop and recreate the Postgres database.
2. Re-run `npm run db:migrate` and `npm run db:seed:admin`.

---

## Troubleshooting

### Server won't start / port binding issues
- Verify `DATABASE_URL` and `REDIS_URL` are set.
- Check that port `3003` is free.
- Review `server.ts` logs: it binds the port immediately and initializes Next.js + Socket.io in the background.
- Health check at `/api/health` returns `503` until initialization completes; returns `200` when fully ready.

### AI features not responding
- Verify `KIMI_API_KEY` is set.
- Check Redis connectivity (used for AI response caching).
- Use `MOCK_AI=true` to test without external providers.

### Socket.io not working
- Ensure you started with `npm run dev` (uses `server.ts`), not a bare Next.js dev server.
- Look for the log line: `🎉 [Server] FULLY OPERATIONAL.`
- The custom server implements graceful degradation: if Socket.io fails but Next.js prepares, the server still serves UI traffic (with degraded real-time features).

### TypeScript errors
```bash
npm run typecheck
```

### Build failures on Linux / CI
Native bindings may be missing. The CI installs:
- `@parcel/watcher-linux-x64-glibc`
- `@swc/core-linux-x64-gnu`
- `@next/swc-linux-x64-gnu`
- `@rollup/rollup-linux-x64-gnu` (for Vitest)
- `esbuild`

Install these locally if building on Linux without prebuilt binaries.

### Playwright E2E tests fail to start app
The `playwright.config.ts` references `npm run dev:next` as the webServer command, which is an alias for `npm run dev`. Start the app manually with `npm run dev` before running E2E tests.

---

## Resources

- **Next.js:** https://nextjs.org/docs
- **Drizzle ORM:** https://orm.drizzle.team/docs
- **NextAuth.js:** https://next-auth.js.org
- **next-intl:** https://next-intl-docs.vercel.app/
- **shadcn/ui:** https://ui.shadcn.com/docs
- **Socket.io:** https://socket.io/docs/
- **Daily.co:** https://docs.daily.co/
- **Kimi API:** https://platform.moonshot.cn/docs
- **Project docs:** `tutorme-app/docs/`, `tutorme-app/TESTING.md`, `tutorme-app/CURRICULUM_SYSTEM.md`
