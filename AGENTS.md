<!-- From: /workspaces/Tutor/AGENTS.md -->
# Solocorn — AI Coding Agent Guide

> **Last updated:** 2026-04-26
> **Covers:** `tutorme-app/` (main Next.js app), `landing-page/` (Vite landing page), `services/adk/` (Google ADK microservice)

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
**Supported locales:** `en` (default), `zh-CN`, `es`, `fr`, `de`, `ja`, `ko`, `pt`, `ru`, `ar`
**Main app default port:** `3003`
**Landing page default port:** `3000`
**ADK service default port:** `8080` (configured via `PORT` env var)

---

## Repository Layout

This repository contains three independent sub-projects. **There is no root `package.json`** and no npm workspace / Turborepo configuration. Each sub-project is managed independently.

```
/workspaces/Tutor/
│
├── tutorme-app/              # Main Next.js application (all backend + primary frontend)
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   │   ├── [locale]/     # i18n route segments (pages per role)
│   │   │   │   ├── student/
│   │   │   │   ├── tutor/
│   │   │   │   ├── parent/
│   │   │   │   ├── admin/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── onboarding/
│   │   │   │   ├── payment/
│   │   │   │   └── ...
│   │   │   └── api/          # REST API routes (~45 top-level domains, 180+ route files)
│   │   ├── components/       # React components (feature-organized, ~130+ files)
│   │   ├── lib/              # Business logic, utilities, AI, db, security, etc.
│   │   ├── hooks/            # Custom React hooks
│   │   ├── stores/           # Zustand client stores
│   │   └── __tests__/        # Unit, integration, accessibility tests + mocks
│   ├── e2e/                  # Playwright E2E specs (11 spec files)
│   ├── drizzle/              # Drizzle migration files (22 active migrations: 0019–0040)
│   ├── messages/             # next-intl JSON translations (en.json, zh-CN.json, etc.)
│   ├── scripts/              # Build, deployment & utility scripts
│   ├── server.ts             # Custom Next.js HTTP server with Socket.io
│   ├── Dockerfile            # Full .next + custom server build
│   ├── Dockerfile.production # Standalone-output build for GCP Cloud Run
│   ├── Dockerfile.test       # Test-specific Docker image
│   └── package.json          # Node scripts & dependencies
│
├── landing-page/             # Vite + React 19 + TypeScript marketing site
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── components/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── services/adk/             # Google ADK microservice (Express + TypeScript)
    ├── src/
    │   ├── server/           # Express server, routes, auth middleware
    │   ├── agents/           # ADK agent definitions
    │   ├── adapters/         # External service adapters
    │   ├── memory/           # Memory / context storage
    │   ├── observability/    # Logging & monitoring
    │   ├── prompts/          # Prompt templates
    │   ├── tools/            # Agent tools
    │   └── validation/       # Zod schemas
    ├── package.json
    ├── tsconfig.json
    └── Dockerfile
```

---

## Technology Stack

| Layer | Technology | Version / Notes |
|-------|------------|-----------------|
| **Framework** | Next.js (App Router) | `^16.1.6` |
| **Language** | TypeScript | `^5.9.3`, strict mode (`strict: true`) |
| **UI** | React | `^18` (main app); `^19` (landing page) |
| **Styling** | Tailwind CSS | `^3.4.1` (main app); `^4.1.14` (landing page) |
| **Components** | shadcn/ui + Radix UI | Headless primitives |
| **Animation** | framer-motion | `^12.34.0` |
| **State** | Zustand | `^5.0.11` |
| **Drag & Drop** | @dnd-kit | latest |
| **ORM** | Drizzle ORM | `^0.45.2` (primary; Prisma is **not** used) |
| **DB Driver** | pg (node-postgres) | Connection pooling |
| **Database** | PostgreSQL | 16 (recommended) |
| **Cache / PubSub** | Redis | `^7` via `ioredis` |
| **Real-time** | Socket.io | `^4.8.3` (server + client), Redis adapter |
| **Auth** | NextAuth.js | `^4.24.13`, JWT sessions, CredentialsProvider |
| **i18n** | next-intl | `^4.8.3`, 10 locales, RTL support for `ar` |
| **Validation** | Zod | `^4.3.6` (main app); `^3.23.8` (ADK service) |
| **Video** | Daily.co | `@daily-co/daily-js ^0.87.0` |
| **Whiteboard** | tldraw + Yjs + Fabric.js | Collaborative canvas |
| **AI Providers** | Kimi K2.5 (Moonshot) | Primary via `@/lib/ai/kimi.ts` |
| **AI Orchestration** | `@/lib/agents/orchestrator-llm.ts` | Fallback + response caching |
| **ADK Service** | Google ADK | Optional microservice in `services/adk/` |
| **Payments** | Airwallex, Hitpay, WeChat Pay, Alipay | Gateway abstraction in `lib/payments/` |
| **Monitoring** | Sentry | `@sentry/nextjs ^10.39.0` (optional) |
| **Testing (unit)** | Vitest | `^4.1.0` with jsdom |
| **Testing (E2E)** | Playwright | `@playwright/test ^1.49.0` |
| **Load testing** | k6 | Scripts in `scripts/load/` |
| **Build tool** | esbuild | Service worker build, dev compile |
| **Server runner** | tsx | `server.ts` in dev; `node` in production |

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

> **Note:** `npm run dev` in `tutorme-app` sets `NODE_ENV=production` and launches `server.ts` via `tsx`. This is the intended local development path because it includes Socket.io and matches production behavior.

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
npm run db:seed              # Seed sample data (currently a no-op that prints "Seed skipped")
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
> **Integration requirements:** Requires `DATABASE_URL` pointing to a test database (e.g., `tutorme_test`). The integration test job in CI is currently commented out.

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
```

There is **no `middleware.ts` at the Next.js app root** in this project. Route guards, i18n routing, CSP, and rate-limiting are handled via:
- `next-intl` routing configuration (`src/lib/i18n/config.ts`)
- API route middleware utilities (`src/lib/api/middleware.ts`)
- Edge-oriented helpers (`src/lib/middleware-edge/`)

Startup environment validation lives in `src/lib/env.ts` and is called from `server.ts`. It **requires** `DATABASE_URL` and `NEXTAUTH_SECRET` (min 32 chars) and warns if `REDIS_URL`, `KIMI_API_KEY`, or Sentry DSNs are missing in production.

---

## Code Organization

### App Router (`src/app/`)

- `src/app/layout.tsx` — Root layout with metadata, PWA manifest, and top-level providers (`Providers`, `PerformanceProviders`).
- `src/app/[locale]/layout.tsx` — Locale layout wrapping `NextIntlClientProvider`, `ThemeProvider`, `AuthProvider`, `Toaster`, and `PWAInstallPrompt`.
- `src/app/[locale]/` — All user-facing pages grouped by role (`student/`, `tutor/`, `parent/`, `admin/`) plus shared pages (`login/`, `register/`, `onboarding/`, `payment/`, `legal/`).
- `src/app/api/` — REST API endpoints mirroring the UI structure. Each folder contains `route.ts` (or segment-specific route files). There are ~45 top-level API domains and 180+ route files.

### Components (`src/components/`)

Organized by feature domain (~130+ component files across 28 top-level directories):
- `ui/` — shadcn/ui primitives (Button, Card, Dialog, etc.)
- `ai-chat/`, `ai-tutor/` — AI interaction UIs
- `class/` — Live classroom (whiteboard, polls, breakout rooms, engagement)
- `student/`, `tutor/`, `parent/`, `admin/` — Role-specific dashboards
- `video-player/`, `quiz/`, `polls/`, `whiteboard/`, `course-builder/` — Content & assessment UIs
- `spaced-repetition/` — 11 components for spaced repetition system

### Library (`src/lib/`)

Domain-organized business logic (~45 directories):
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

### Stores (`src/stores/`)

Zustand stores for client state. Currently contains `communication-store.ts`.

---

## Database Architecture

### ORM & Schema

- **Drizzle ORM** is the only ORM in use. No Prisma client is present.
- Schema source of truth: `src/lib/db/schema/`
  - `enums.ts` — 24 PostgreSQL enums (Role, PollType, PaymentStatus, LiveSessionStatus, BuilderTaskType, etc.)
  - `tables/` — Table definitions (14 table modules: admin, analytics, assistant, auth, builder, calendar, classroom, collaboration, content, course, family, finance, index, live)
  - `relations.ts` — Drizzle relational definitions
  - `next-auth.ts` — NextAuth.js Drizzle adapter tables
  - `compliance.ts` — GDPR / COPPA / FERPA compliance tables
  - `landing.ts` — Landing page inquiry/signup tables
- Migrations live in `drizzle/` (22 active migrations numbered 0019–0040) and are managed by `drizzle-kit`.
- Runtime client: `src/lib/db/drizzle.ts` uses `pg.Pool` with singleton pooling (dev pool cached on `globalThis`).
- Legacy wrapper: `src/lib/db/index.ts` provides a query caching layer (Redis → in-memory fallback). Most app code imports `db` from here; new code should import `drizzleDb` from `./drizzle`.

### Connection Strategy

- `DATABASE_URL` / `DIRECT_URL` — Standard connections.
- `DATABASE_POOL_URL` — Optional PgBouncer connection string for production.
- Pool sizes: 5 max in development, 50 max in production.
- Redis is used for caching, session-like state, and the Socket.io Redis adapter.

### Key Tables

- **Auth/Users** (`tables/auth.ts`): `User`, `Account`, `Profile`, `TutorApplication`
- **Courses** (`tables/course.ts`): `Course`, `CourseLesson`, `CourseEnrollment`, `CourseProgress`, `CourseLessonProgress`, `LessonSession`, `StudentPerformance`, `TaskSubmission`, `FeedbackWorkflow`, `CourseVariant`
- **Live Sessions** (`tables/live.ts`): `LiveSession`, `SessionParticipant`, `Poll`, `PollOption`, `PollResponse`, `Message`, `Conversation`, `DirectMessage`, `Notification`, `DeployedMaterial`, `SessionReplayArtifact`
- **Payments** (`tables/finance.ts`): `Payment`, `Refund`, `WebhookEvent`, `Payout`, `PlatformRevenue`
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

### ESLint Rules (excerpt from `eslint.config.mjs`)

- `@typescript-eslint/no-explicit-any`: `warn`
- `@typescript-eslint/no-unused-vars`: `warn` (ignores `_` prefixes)
- `no-console`: `warn` in production, `off` in development
- `prefer-const`: `error`
- `no-var`: `error`
- `react-hooks/exhaustive-deps`: `warn`
- `jsx-a11y/alt-text`: `off` (project uses explicit a11y patterns)
- Security rules: `no-implied-eval`, `no-new-func`, `no-script-url`, `no-proto`, `no-iterator`, `no-extend-native`, `no-with`, `no-caller`, `no-unsafe-finally` are all `error`

### Prettier (`.prettierrc`)

- `semi: false`
- `singleQuote: true`
- `tabWidth: 2`
- `trailingComma: "es5"`
- `printWidth: 100`
- `arrowParens: "avoid"`
- `endOfLine: "lf"`
- `plugins: ["prettier-plugin-tailwindcss"]`
- `tailwindFunctions: ["cn", "clsx", "cva"]`

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
- **WebServer:** Playwright references `npm run dev:next` in config, but this script does not exist in `package.json`. You must start the app manually with `npm run dev` before running E2E tests.
- **Retries:** 2 in CI, 0 locally
- **Workers:** 1 in CI
- **Dependencies:** `@axe-core/playwright`

### Load Tests (k6)

- **Location:** `scripts/load/`
- **Scripts:** `concurrent-users.js`, `ai-stress.js`, `websocket.js`
- **Run:** `k6 run scripts/load/concurrent-users.js` (requires app running)

### CI Pipeline (GitHub Actions)

`.github/workflows/ci.yml` runs the following jobs on `push`/`pull_request` to `main` and `develop`:
1. **typecheck** — `drizzle-kit generate` then `tsc --noEmit`
2. **build** — install Linux native bindings, clean `.next`, generate Drizzle types, `npm run build`
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
- **`Dockerfile.production`** — Standalone-output focused multi-stage build. Copies `.next/standalone`, static assets, and drizzle migrations. Includes a health check on `/api/health`. Used by GCP Cloud Run deploy. Creates a dummy `.env.production` with fake secrets so `next build` can run.
- **`Dockerfile.test`** — Test-specific Docker image.

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
- **Env vars passed:** `NODE_ENV`, `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `REDIS_URL`
- **Flow:** `ci` job must pass → build & push image → deploy to Cloud Run → route 100% traffic.

### Landing Page Integration

`scripts/build-and-integrate-landing.sh` builds the landing page via Vite and copies `landing-page/dist/*` into `tutorme-app/public/`, serving it from the Next.js root URL.

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
- Health check at `/api/health` returns 503 until initialization completes.

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
The `playwright.config.ts` references `npm run dev:next` as the webServer command, but this script does **not exist** in `package.json`. Start the app manually with `npm run dev` before running E2E tests.

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
