# TutorMe (CogniClass) - AI Coding Agent Guide

## Project Overview

TutorMe is an AI-human hybrid tutoring platform combining 24/7 AI-powered Socratic tutoring with live group clinics led by human tutors. The platform supports multiple user roles (Student, Tutor, Parent, Admin) and is designed for global markets with particular focus on Chinese market adaptation.

**Core Value Proposition:**
- AI tutors use Socratic method (never give direct answers, guide students to discover)
- Live clinics with 1 tutor managing up to 50 students with real-time AI monitoring
- Video learning with inline quizzes and AI-generated assessments
- Gamification system with missions, achievements, badges, and leaderboards
- Multi-role dashboards: Student, Tutor, Parent, and Admin

**Target Ratio:** 1 tutor : 50 students  
**Primary Language:** English (en) with Chinese (zh-CN) and 8 other languages supported  
**Default Port:** 3003  
**Database Ports:** 5432 (PostgreSQL direct), 5433 (PgBouncer pool), 6379 (Redis)

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 16.1.6 (App Router) + React 18 + TypeScript 5.9 | Web application framework |
| **Styling** | Tailwind CSS 3.4 + shadcn/ui | UI components and styling |
| **Backend** | Next.js API Routes + Node.js + Socket.io 4.8.3 | Server-side logic and real-time |
| **Database** | PostgreSQL 16 + PgBouncer + Prisma 5.22 | Primary data store with ORM |
| **Cache** | Redis 7 + ioredis | Sessions, caching, real-time state |
| **Auth** | NextAuth.js v4.24.13 | Authentication with JWT strategy |
| **i18n** | next-intl 4.8.3 | Internationalization (10 languages) |
| **AI/LLM** | Ollama (local Llama 3.1) → Kimi K2.5 → Zhipu GLM | AI tutoring with fallback chain |
| **Video** | Daily.co (@daily-co/daily-js) | Video conferencing |
| **Whiteboard** | Custom Canvas + Yjs + Fabric.js | Collaborative whiteboard |
| **Validation** | Zod 4.3.6 | Schema validation |
| **Testing** | Vitest 2.1.8 + Playwright 1.49 + k6 | Unit, integration, E2E, load tests |
| **Monitoring** | Sentry 10.39.0 | Error tracking and performance |
| **State** | Zustand 5.0.11 | Client-side state management |
| **Drag & Drop** | @dnd-kit | Sortable UI components |

---

## Project Structure

```
tutorme-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/             # i18n route segments (en, zh-CN, es, fr, de, ja, ko, pt, ru, ar)
│   │   │   ├── (student)/        # Student route group (curriculum)
│   │   │   ├── student/          # Student dashboard & features
│   │   │   ├── tutor/            # Tutor dashboard & features
│   │   │   ├── parent/           # Parent dashboard & features
│   │   │   ├── admin/            # Admin dashboard & features
│   │   │   ├── actions/          # Server actions
│   │   │   ├── api-docs/         # API documentation
│   │   │   ├── legal/            # Legal pages (terms, privacy, code-of-conduct)
│   │   │   ├── login/            # Login page
│   │   │   ├── onboarding/       # User onboarding flows
│   │   │   ├── payment/          # Payment processing pages
│   │   │   └── register/         # Registration pages (student, tutor, parent, admin)
│   │   ├── actions/              # Global server actions
│   │   ├── api/                  # API routes (100+ endpoint groups)
│   │   │   ├── ai/               # AI generation endpoints
│   │   │   ├── ai-tutor/         # AI tutor enrollment & chat
│   │   │   ├── auth/             # NextAuth.js handlers
│   │   │   ├── class/            # Live class & breakout rooms
│   │   │   ├── curriculum/       # Curriculum management
│   │   │   ├── gamification/     # XP, achievements, missions
│   │   │   ├── parent/           # Parent-specific APIs
│   │   │   ├── payments/         # Payment processing
│   │   │   ├── polls/            # Live polling
│   │   │   ├── tutor/            # Tutor-specific APIs
│   │   │   └── ...               # Many more API routes
│   │   ├── layout.tsx            # Root layout with i18n
│   │   ├── globals.css           # Global styles + CSS variables
│   │   └── page.tsx              # Landing page
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components (26+ components)
│   │   ├── admin/                # Admin dashboard components
│   │   ├── ai-chat/              # AI chat interface
│   │   ├── ai-tutor/             # AI tutor components
│   │   ├── analytics/            # Analytics and reporting
│   │   ├── assignments/          # Assignment components
│   │   ├── class/                # Classroom components
│   │   │   ├── whiteboard/       # Whiteboard components
│   │   │   ├── breakout/         # Breakout room components
│   │   │   └── polls/            # Polling components
│   │   ├── course-builder/       # Course creation UI
│   │   ├── feedback/             # Feedback components
│   │   ├── gamification/         # XP, missions, badges UI
│   │   ├── parent/               # Parent dashboard components
│   │   ├── quiz/                 # Quiz components
│   │   └── video-player/         # Video components
│   │
│   ├── lib/                      # Utility code & business logic
│   │   ├── ai/                   # AI provider implementations
│   │   │   ├── ollama.ts         # Local LLM (primary)
│   │   │   ├── kimi.ts           # Moonshot AI fallback
│   │   │   ├── zhipu.ts          # Zhipu AI fallback
│   │   │   ├── orchestrator.ts   # Provider fallback chain
│   │   │   ├── prompts.ts        # AI prompts
│   │   │   ├── tutor-service.ts  # AI tutor logic
│   │   │   └── teaching-prompts/ # Modular prompt system
│   │   ├── api/                  # API utilities
│   │   ├── auth.ts               # NextAuth configuration
│   │   ├── cache-manager.ts      # Redis caching layer
│   │   ├── curriculum/           # Curriculum lesson controller
│   │   ├── db/                   # Database client with caching
│   │   │   ├── index.ts          # Prisma client + Redis cache
│   │   │   └── queries.ts        # Optimized queries
│   │   ├── gamification/         # XP, missions, quests logic
│   │   ├── i18n/                 # Internationalization config
│   │   ├── monitoring/           # Sentry & performance
│   │   ├── payments/             # Airwallex, Hitpay, WeChat, Alipay
│   │   ├── security/             # Rate limiting, RBAC, sanitization
│   │   ├── socket-server.ts      # Socket.io server initialization
│   │   └── video/                # Daily.co video provider
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-socket.ts         # Socket.io client hook
│   │   └── useParent.ts          # Parent data hooks
│   │
│   ├── stores/                   # Zustand stores
│   │   ├── live-class.store.ts   # Live class state
│   │   └── communication.store.ts # Messaging state
│   │
│   ├── __tests__/                # Unit & integration tests
│   │   ├── setup.ts              # Vitest setup
│   │   ├── integration/          # API integration tests
│   │   ├── security/             # Security tests
│   │   └── accessibility/        # a11y tests
│   │
│   ├── middleware.ts             # Next.js middleware (auth + i18n + rate limit)
│   ├── types/                    # TypeScript type definitions
│   └── i18n/                     # i18n configuration
│       ├── request.ts            # next-intl request config
│       └── routing.ts            # Locale routing re-export
│
├── prisma/
│   ├── schema.prisma             # Database schema (100+ models)
│   ├── migrations/               # Prisma migrations
│   ├── seed.ts                   # Database seed script
│   └── seed-curriculum-catalog.ts
│
├── e2e/                          # Playwright E2E tests
│   ├── ai-tutor.spec.ts
│   ├── payment.spec.ts
│   ├── registration.spec.ts
│   └── tutor-clinic.spec.ts
│
├── scripts/                      # Development & deployment scripts
│   ├── dev.sh                    # Start dev environment
│   ├── initialize.sh             # Full initialization (DB + app)
│   ├── setup-db.sh               # Setup database only
│   ├── reset.sh                  # Full reset (destructive)
│   ├── check-db.sh               # Database health check
│   ├── build-sw.js               # Build service worker
│   └── load/                     # k6 load testing scripts
│
├── messages/                     # i18n translation files
│   ├── en.json                   # English (default)
│   └── zh-CN.json                # Chinese (Simplified)
│
├── server.ts                     # Custom Next.js server with Socket.io
├── docker-compose.yml            # Postgres + Redis + Ollama + PgBouncer
├── next.config.mjs               # Next.js configuration with CSP
├── tailwind.config.ts            # Tailwind + design tokens
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Vitest unit test config
├── vitest.integration.config.ts  # Vitest integration test config
└── playwright.config.ts          # Playwright E2E config
```

---

## Build and Development Commands

All commands run from `tutorme-app/` directory:

```bash
# Full Development Environment (recommended)
npm run initialize          # One-command setup: DB + migrations + seed + dev server
npm run dev:all             # Start Docker + migrations + dev server

# Development Server (requires Docker running)
npm run dev                 # Start Next.js + Socket.io server on port 3003 (via server.ts)
npm run dev:next            # Start only Next.js dev server

# Database Operations
npm run db:setup            # Setup database containers
npm run db:migrate          # Run Prisma migrations
npm run db:generate         # Generate Prisma client
npm run db:seed             # Seed database with sample data
npm run db:seed:admin       # Seed admin user
npm run db:studio           # Open Prisma Studio at http://localhost:5555
npm run db:reset            # Full database reset (DESTRUCTIVE!)
npm run studio              # Open Prisma Studio (via script)
npm run db:check            # Check database health

# Docker Operations
npm run docker:up           # Start all Docker containers
npm run docker:down         # Stop Docker containers
npm run docker:logs         # View container logs
npm run ollama:pull         # Pull Llama 3.1 model to Ollama

# Testing
npm run test                # Run Vitest unit tests
npm run test:unit           # Alias for test
npm run test:watch          # Run Vitest in watch mode
npm run test:integration    # Run integration tests
npm run test:e2e            # Run Playwright E2E tests
npm run test:e2e:ui         # Run E2E tests with UI
npm run test:e2e:a11y       # Run accessibility tests
npm run test:load           # k6 load test (concurrent users)
npm run test:load:ai        # k6 load test (AI stress)
npm run test:load:ws        # k6 load test (WebSocket)

# Code Quality
npm run lint                # Run ESLint
npm run lint:fix            # Fix ESLint issues
npm run format              # Format code with Prettier
npm run format:check        # Check code formatting
npm run typecheck           # TypeScript type checking

# Production Build
npm run build               # Build for production (includes service worker)
npm run build:sw            # Build service worker only
npm run start               # Start production server

# Utilities
npm run data-retention      # Run data retention cleanup
npm run test:register       # Test registration flow
npm run security:check      # Run npm audit
```

---

## Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
# =============================================================================
# Database Configuration
# =============================================================================

# Primary database connection (direct to PostgreSQL) - for migrations
DATABASE_URL="postgresql://postgres:postgres_password@localhost:5432/tutorme"

# Connection pool URL (PgBouncer) - for application queries
DATABASE_POOL_URL="postgresql://postgres:postgres_password@localhost:5433/tutorme"

# Redis Cache
REDIS_URL="redis://localhost:6379"

# =============================================================================
# AI Providers (Priority: Ollama -> Kimi -> Zhipu)
# =============================================================================

# Ollama (Local LLM)
OLLAMA_URL="http://localhost:11434"

# Kimi K2.5 (Moonshot AI) - Primary API fallback
KIMI_API_KEY="your_kimi_api_key_here"

# Zhipu AI (GLM models) - Secondary API fallback
ZHIPU_API_KEY="your_zhipu_api_key_here"

# =============================================================================
# Video Conferencing (Daily.co)
# =============================================================================

DAILY_API_KEY="your_daily_api_key_here"

# =============================================================================
# Authentication (NextAuth.js)
# =============================================================================

NEXTAUTH_SECRET="your_random_secret_here_min_32_chars"
NEXTAUTH_URL="http://localhost:3003"

# WeChat OAuth
WECHAT_APP_ID="your_wechat_app_id"
WECHAT_APP_SECRET="your_wechat_app_secret"

# =============================================================================
# Global Security Configuration
# =============================================================================

SECURITY_COMPRESS=true
SECURITY_ENCRYPT=true
SECURITY_AUDIT=true
SECURITY_PIPL_COMPLIANCE=true
SECURITY_GLOBAL_STANDARDS=true
SECURITY_RATE_LIMIT=300
SECURITY_MAX_REQUESTS_PER_MINUTE=1000

# =============================================================================
# Sentry (Error monitoring, performance, compliance)
# =============================================================================

SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# =============================================================================
# Application Settings
# =============================================================================

NEXT_PUBLIC_APP_URL="http://localhost:3003"
NODE_ENV="development"

# Cache TTL settings (in seconds)
CACHE_TTL_DEFAULT=60
CACHE_TTL_USER=300
CACHE_TTL_LEADERBOARD=300
CACHE_TTL_CONTENT=600
CACHE_TTL_PARENT_DASHBOARD=180
CACHE_TTL_STUDENT_ANALYTICS=45
CACHE_TTL_PARENT_FINANCIAL=120
CACHE_TTL_PARENT_FAMILY=300

# =============================================================================
# Payment Gateways
# =============================================================================

# Airwallex Configuration
AIRWALLEX_CLIENT_ID=your_client_id
AIRWALLEX_API_KEY=your_api_key
AIRWALLEX_ENV=sandbox  # or 'production'
AIRWALLEX_WEBHOOK_SECRET=your_webhook_secret

# Hitpay Configuration
HITPAY_API_KEY=your_api_key
HITPAY_SALT=your_salt_key
HITPAY_ENV=sandbox  # or 'production'
HITPAY_WEBHOOK_SECRET=your_webhook_secret

# Payment Settings
PAYMENT_DEFAULT_GATEWAY=HITPAY  # or 'AIRWALLEX'
PAYMENT_SUCCESS_URL=http://localhost:3000/payment/success
PAYMENT_CANCEL_URL=http://localhost:3000/payment/cancel

# Chinese Payment Gateways (WeChat Pay & Alipay)
WECHAT_MCH_ID=your_merchant_id
WECHAT_PAY_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
WECHAT_PAY_API_V3_KEY=your_32_char_api_v3_key
WECHAT_PAY_PLATFORM_PUBLIC_KEY="-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
WECHAT_PAY_ENV=sandbox  # or 'production'

ALIPAY_APP_ID=your_alipay_app_id
ALIPAY_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
ALIPAY_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
ALIPAY_ENV=sandbox  # or 'production'

# =============================================================================
# Video Learning (S3-compatible upload)
# =============================================================================
# S3_BUCKET=your-bucket
# S3_REGION=us-east-1
# S3_ACCESS_KEY_ID=your-key
# S3_SECRET_ACCESS_KEY=your-secret
# S3_ENDPOINT=https://minio.example.com
```

---

## Database Architecture

### Key Models (Prisma Schema - 100+ models)

| Model | Purpose |
|-------|---------|
| **User** | Core user with role (STUDENT/TUTOR/PARENT/ADMIN) |
| **Profile** | Extended profile with role-specific fields |
| **Account** | OAuth provider accounts (NextAuth) |
| **Curriculum** | Course structure with modules and lessons |
| **CurriculumModule** | Course modules containing lessons |
| **CurriculumLesson** | Individual lessons with learning objectives |
| **CurriculumCatalog** | Catalog of curriculum types (IELTS, AP, etc.) |
| **CourseBatch** | Group-level course instances with schedule/difficulty overrides |
| **LessonSession** | Active AI tutoring session state |
| **ContentItem** | Video learning content with transcripts |
| **VideoWatchEvent** | Video engagement analytics |
| **ContentQuizCheckpoint** | Inline video quizzes |
| **QuizAttempt** | Student quiz responses with AI grading |
| **GeneratedTask** | AI-generated assignments/tasks |
| **TaskSubmission** | Student task submissions |
| **FeedbackWorkflow** | AI-tutor collaborative grading workflow |
| **LiveSession** | Scheduled clinic sessions |
| **SessionParticipant** | Live session participants |
| **BreakoutSession** | Group breakout room sessions |
| **BreakoutRoom** | Individual breakout rooms |
| **AITutorEnrollment** | AI tutor subject enrollments |
| **AITutorSubscription** | Subscription tiers (FREE/PRO/ELITE) |
| **AIInteractionSession** | AI tutoring conversation history |
| **Payment** | Payment transactions |
| **UserGamification** | XP, level, streak data |
| **Achievement** | Unlocked achievements |
| **Badge** | Collectible badges |
| **Mission** | Daily/weekly quests |
| **LeaderboardEntry** | Leaderboard rankings |
| **FamilyMember** | Parent-student relationships |
| **Poll** | Live class polls |
| **Whiteboard** | Collaborative whiteboard data |
| **CalendarEvent** | Scheduled calendar events |
| **Notification** | User notifications |
| **SecurityEvent** | Security audit log |
| **AdminAuditLog** | Admin action audit trail |

### Connection Architecture

- **PostgreSQL** (port 5432): Direct connection for migrations
- **PgBouncer** (port 5433): Connection pooler for app queries
  - Pool mode: transaction
  - Max client connections: 1000
  - Default pool size: 50
  - Reserve pool: 10 connections
- **Redis** (port 6379): Caching and real-time state
  - Max memory: 512MB
  - Eviction policy: allkeys-lru
- **Ollama** (port 11434): Local LLM inference

---

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All code must be type-safe
- Use `interface` for object shapes, `type` for unions/complex types
- Prefer explicit return types on exported functions
- Use path alias `@/*` for imports from src/

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

- Use functional components with explicit props interfaces
- shadcn/ui components follow Radix UI patterns
- Components use `forwardRef` for ref forwarding
- Style with Tailwind using `cn()` utility for conditional classes

```typescript
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md",
        variant === "primary" && "bg-primary text-white",
        className
      )}
      {...props}
    />
  );
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Files** | PascalCase for components, camelCase for utilities | `Button.tsx`, `formatDate.ts` |
| **Components** | PascalCase | `StudentDashboard`, `AIChat` |
| **Functions** | camelCase, async with verb prefix | `fetchUserData`, `handleSubmit` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| **Database Models** | PascalCase | `QuizAttempt`, `LiveSession` |
| **API Routes** | kebab-case folders, route.ts files | `api/ai-chat/route.ts` |
| **Environment Variables** | UPPER_SNAKE_CASE | `DATABASE_URL` |

### AI Integration Patterns

```typescript
// Always use orchestrator for AI calls, not direct providers
import { generateWithFallback, chatWithFallback } from '@/lib/ai/orchestrator'

// Generate with automatic fallback (Ollama -> Kimi -> Zhipu)
const result = await generateWithFallback(prompt, { temperature: 0.7 })

// Chat with history
const response = await chatWithFallback(messages, { maxTokens: 2048 })

// Response format: { content: string, provider: 'ollama'|'kimi'|'zhipu', latencyMs: number }

// MOCK MODE for testing without AI providers
if (process.env.MOCK_AI === 'true') {
  // Returns mock responses
}
```

### Database Access Patterns

```typescript
// Use the singleton db instance
import { db, cache } from '@/lib/db'

// Basic query
const user = await db.user.findUnique({ where: { id } })

// With caching
const result = await cache.getOrSet(
  `content:list`,
  () => db.contentItem.findMany({ where: { isPublished: true } }),
  300 // TTL seconds
)
```

### Internationalization (i18n)

- 10 languages supported: en, zh-CN, es, fr, de, ja, ko, pt, ru, ar
- Default locale: "en" (English)
- Translations in `/messages/{locale}.json`
- Use next-intl's `useTranslations` hook in components
- Locale detection via Accept-Language header
- RTL support for Arabic (ar)

```typescript
import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

---

## Testing Instructions

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

Test files location:
- `src/**/*.test.ts` - Unit tests co-located with source
- `src/__tests__/setup.ts` - Test setup and configuration
- `src/lib/security/*.test.ts` - Security utility tests

### Integration Tests

```bash
# Run API integration tests
npm run test:integration
```

Located in `src/__tests__/integration/`. **Requires a running database.**

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI for debugging
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e/ai-tutor.spec.ts
```

Test files:
- `e2e/ai-tutor.spec.ts` - AI tutor feature tests
- `e2e/payment.spec.ts` - Payment flow tests
- `e2e/registration.spec.ts` - User registration tests
- `e2e/tutor-clinic.spec.ts` - Live clinic tests

### Load Testing (k6)

```bash
# Test concurrent users
npm run test:load

# Test AI endpoint stress
npm run test:load:ai

# Test WebSocket connections
npm run test:load:ws
```

Load test scripts located in `scripts/load/`.

---

## Security Considerations

### PII Handling

- **Never include real names or PII in AI prompts** - Use studentId hashes
- Student identifiers in AI context should be anonymized
- All user data access goes through authenticated API routes

### API Keys

- All API keys stored in `.env.local` (gitignored)
- Keys never committed to repository
- Different keys for dev/staging/production
- API keys for server-to-server access stored in `ApiKey` model with hashed keys

### Authentication & Authorization

- NextAuth.js with JWT session strategy
- Role-based access control (STUDENT/TUTOR/PARENT/ADMIN)
- Middleware (`src/middleware.ts`) handles:
  - i18n locale routing
  - Route protection based on role
  - Rate limiting (100 requests/minute per IP for API)
  - Stricter rate limiting for login (5 attempts per 15 minutes)
  - Security headers (CSP, X-Frame-Options, etc.)
- Onboarding flow redirects new users to complete profile
- TOS acceptance enforced for all users

### Rate Limiting

```typescript
// Configured in middleware.ts
const API_RATE_LIMIT_MAX = 100 // per minute per IP
const RATE_LIMIT_SKIP = ['/api/auth', '/api/health', '/api/payments/webhooks']

// Stricter limits for login attempts
const LOGIN_RATE_LIMIT = 5 // attempts per 15 minutes
```

### Security Headers (next.config.mjs & middleware.ts)

- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy: Strict CSP with script/style/connect restrictions
- upgrade-insecure-requests (production only)

### Database Security

- Prisma prevents SQL injection
- Connection strings in environment only
- Row-level security via application logic
- Security event logging in `SecurityEvent` model

---

## Development Conventions

### Local-First AI Strategy

1. **Ollama (local Llama 3.1)** is always the first choice
2. **Kimi K2.5** is the first fallback for complex reasoning
3. **Zhipu GLM** is the second fallback
4. All AI calls go through `orchestrator.ts` which handles this chain
5. Set `MOCK_AI=true` for testing without AI providers

### Socratic Method Requirement

AI tutors must NEVER give direct answers. Use prompts in `lib/ai/prompts.ts`:
- `socraticTutorPrompt` - Main tutoring interaction
- `chatResponsePrompt` - General chat widget
- `quizGeneratorPrompt` - Create assessments
- `gradingPrompt` - Grade short answers

### Mobile-First Design

- All UI must be responsive (minimum 320px width via `xs` breakpoint)
- Touch-friendly controls (min 44px touch targets via `min-h-touch`)
- Test on mobile devices/screensizes
- PWA support with service worker

### Docker-First Development

- All services run in Docker for consistency
- No local PostgreSQL/Redis installations required
- Production deployment uses same containers
- PgBouncer for connection pooling at scale

### Code Organization Principles

1. **Co-location**: Keep tests, styles, and components together
2. **Feature-based folders**: Group by feature (ai-tutor/, class/, gamification/)
3. **API routes mirror UI**: `/app/api/ai-tutor/` matches `/app/student/ai-tutor/`
4. **Lib organization**: Group by domain (ai/, payments/, security/)

---

## Common Tasks

### Add a New shadcn/ui Component

```bash
npx shadcn@latest add <component-name>
```

Components are installed to `src/components/ui/`.

### Create a New Database Migration

```bash
# After modifying schema.prisma
npx prisma migrate dev --name <descriptive_name>
```

### Reset Development Environment

```bash
# Warning: Deletes all data!
npm run db:reset
```

### Add a New API Route

Create file in `src/app/api/<route>/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Handler logic
  return NextResponse.json({ data: 'response' })
}
```

### Run Database Studio

```bash
npm run db:studio
# Opens at http://localhost:5555
```

---

## Deployment

### Production Infrastructure

- **VPS**: 8-core, 32GB RAM, 1x GPU (recommended)
- **Container Orchestration**: Docker Compose or Kubernetes
- **Reverse Proxy**: Nginx with SSL (Let's Encrypt)
- **Monitoring**: Prometheus/Grafana (postgres-exporter included)
- **Backups**: Automated database backups

### Environment Variables for Production

- Update `NEXTAUTH_URL` to production domain
- Use production API keys for AI/video services
- Configure WeChat Pay/Alipay credentials for Chinese market
- Set `NODE_ENV=production`
- Configure `DATABASE_POOL_URL` for PgBouncer

### Build for Production

```bash
npm run build
npm run start
```

---

## Troubleshooting

### Docker containers won't start

```bash
docker-compose down -v  # Remove volumes
docker-compose up -d    # Fresh start
```

### Prisma client errors

```bash
npx prisma generate     # Regenerate client
```

### Port conflicts

- PostgreSQL: 5432 (direct), 5433 (PgBouncer/host mapping)
- Redis: 6379
- Redis Commander: 8081
- Ollama: 11434
- Next.js: 3003

Change in `docker-compose.yml` or use `next dev --port <port>`

### Ollama not responding

```bash
# Pull model manually
docker exec tutorme-ollama ollama pull llama3.1

# Check logs
docker logs tutorme-ollama

# Test availability
curl http://localhost:11434/api/tags
```

### Database connection issues

```bash
# Check database status
docker exec tutorme-db pg_isready -U postgres -d tutorme

# View connection pool status
docker logs tutorme-pgbouncer

# Reset connection pool
docker restart tutorme-pgbouncer

# Check with script
npm run db:check
```

### Socket.io connection issues

```bash
# Check if server.ts is being used (not next dev)
npm run dev  # Uses server.ts with Socket.io

# Verify Socket.io is initialized in logs
# Look for: "✅ Socket.io server initialized"
```

---

## Resources

- **Project Docs**: See `docs/` directory in project root
- **Features**: See `docs/APP_FEATURES.md` for feature specifications
- **Testing Guide**: See `tutorme-app/TESTING.md`
- **Implementation Plans**: See various `*_IMPLEMENTATION_PLAN.md` files in docs/

### External Documentation

- **shadcn/ui**: https://ui.shadcn.com/docs
- **Prisma**: https://www.prisma.io/docs
- **Next.js**: https://nextjs.org/docs
- **NextAuth.js**: https://next-auth.js.org
- **Socket.io**: https://socket.io/docs/
- **next-intl**: https://next-intl-docs.vercel.app/
- **Ollama**: https://github.com/ollama/ollama
- **Daily.co**: https://docs.daily.co/
- **Kimi API**: https://platform.moonshot.cn/docs
- **Zhipu API**: https://open.bigmodel.cn/dev/howuse/model
