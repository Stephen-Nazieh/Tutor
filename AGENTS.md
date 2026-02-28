# TutorMe - AI Coding Agent Guide

## Project Overview

TutorMe (also known as CogniClass) is an AI-human hybrid tutoring platform that combines 24/7 AI-powered Socratic tutoring with live group clinics led by human tutors. The platform supports multiple user roles (Student, Tutor, Parent, Admin) and is designed for global markets with focus on Chinese market adaptation.

**Core Value Proposition:**
- AI tutors use Socratic method (never give direct answers, guide students to discover)
- Live clinics with 1 tutor managing up to 50 students with real-time AI monitoring
- Video learning with inline quizzes and AI-generated assessments
- Gamification system with missions, achievements, badges, and leaderboards
- Multi-role dashboards: Student, Tutor, Parent, and Admin

**Target Ratio:** 1 tutor : 50 students  
**Primary Languages:** English (en) with Chinese (zh-CN) and 8 other languages  
**Default Port:** 3003  

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | Next.js | 16.1.6 (App Router) | Web application framework |
| **UI** | React | 18 | Component library |
| **Language** | TypeScript | 5.9.3 | Type-safe development |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS |
| **Components** | shadcn/ui + Radix UI | latest | Headless UI components |
| **Backend** | Next.js API Routes + Node.js | 16.1.6 | Server-side logic |
| **Real-time** | Socket.io | 4.8.3 | WebSocket connections |
| **ORM (Primary)** | Drizzle ORM | 0.38.0 | Type-safe SQL queries |
| **ORM (Legacy)** | Prisma | 5.22.0 | Database client |
| **Database** | PostgreSQL | 16 | Primary data store |
| **Connection Pool** | PgBouncer | latest | Connection pooling |
| **Cache** | Redis | 7 | Sessions, caching, real-time state |
| **Auth** | NextAuth.js | 4.24.13 | JWT-based authentication |
| **i18n** | next-intl | 4.8.3 | Internationalization (10 languages) |
| **AI/LLM** | Ollama + Kimi + Zhipu | - | AI provider fallback chain |
| **Video** | Daily.co | 0.87.0 | Video conferencing |
| **Whiteboard** | tldraw + Yjs + Fabric.js | - | Collaborative whiteboard |
| **Validation** | Zod | 4.3.6 | Schema validation |
| **Testing** | Vitest + Playwright + k6 | - | Unit, E2E, load tests |
| **Monitoring** | Sentry | 10.39.0 | Error tracking |
| **State** | Zustand | 5.0.11 | Client-side state |
| **Drag & Drop** | @dnd-kit | latest | Sortable UI components |
| **Animation** | framer-motion | 12.34.0 | UI animations |

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
│   │   │   ├── payment/          # Payment processing pages
│   │   │   ├── login/            # Login page
│   │   │   ├── register/         # Registration pages
│   │   │   └── onboarding/       # User onboarding flows
│   │   ├── api/                  # API routes (REST endpoints)
│   │   ├── layout.tsx            # Root layout with i18n
│   │   ├── globals.css           # Global styles + CSS variables
│   │   └── page.tsx              # Landing page
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components (Button, Card, Dialog, etc.)
│   │   ├── admin/                # Admin dashboard components
│   │   ├── ai-chat/              # AI chat interface
│   │   ├── ai-tutor/             # AI tutor components
│   │   ├── class/                # Classroom components (whiteboard, polls, breakout)
│   │   ├── gamification/         # XP, missions, badges UI
│   │   ├── parent/               # Parent dashboard components
│   │   ├── quiz/                 # Quiz components
│   │   ├── polls/                # Live polling components
│   │   └── video-player/         # Video components
│   │
│   ├── lib/                      # Utility code & business logic
│   │   ├── ai/                   # AI provider implementations
│   │   │   ├── ollama.ts         # Local LLM (primary)
│   │   │   ├── kimi.ts           # Moonshot AI fallback
│   │   │   ├── zhipu.ts          # Zhipu AI fallback
│   │   │   ├── orchestrator.ts   # Provider fallback chain
│   │   │   ├── prompts.ts        # AI prompts
│   │   │   └── teaching-prompts/ # Modular prompt system
│   │   ├── api/                  # API utilities
│   │   ├── auth.ts               # NextAuth configuration (Drizzle adapter)
│   │   ├── cache/                # Redis caching layer
│   │   ├── db/                   # Database client and schema
│   │   │   ├── drizzle.ts        # Drizzle client
│   │   │   └── schema/           # Drizzle schema (tables, enums, relations)
│   │   ├── payments/             # Payment gateway integrations
│   │   ├── security/             # Rate limiting, RBAC, sanitization
│   │   ├── socket-server-enhanced.ts  # Socket.io server
│   │   ├── video/                # Daily.co video provider
│   │   ├── whiteboard/           # Whiteboard utilities
│   │   ├── curriculum/           # Curriculum lesson controller
│   │   ├── gamification/         # XP, missions logic
│   │   └── i18n/                 # i18n configuration
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
│   │   └── accessibility/        # a11y tests
│   │
│   ├── middleware.ts             # Next.js middleware (auth + i18n + rate limit)
│   ├── i18n/                     # i18n configuration
│   │   ├── request.ts            # next-intl request config
│   │   └── routing.ts            # Locale routing re-export
│   └── types/                    # TypeScript type definitions
│
├── prisma/
│   ├── schema.prisma             # Prisma schema (legacy, migrating to Drizzle)
│   ├── migrations/               # Prisma migrations
│   └── seed.ts                   # Database seed script
│
├── drizzle/                      # Drizzle migrations and schema
│
├── e2e/                          # Playwright E2E tests
│   ├── ai-tutor.spec.ts
│   ├── payment.spec.ts
│   ├── registration.spec.ts
│   └── tutor-clinic.spec.ts
│
├── scripts/                      # Development & deployment scripts
│   ├── initialize.sh             # Full initialization (DB + app)
│   ├── dev.sh                    # Start dev environment
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
├── docs/                         # Project documentation
│
├── server.ts                     # Custom Next.js server with Socket.io
├── docker-compose.yml            # Postgres + Redis + PgBouncer + Ollama
├── next.config.mjs               # Next.js configuration with CSP
├── tailwind.config.ts            # Tailwind + design tokens
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Vitest unit test config
├── vitest.integration.config.ts  # Vitest integration test config
├── playwright.config.ts          # Playwright E2E config
├── drizzle.config.ts             # Drizzle Kit configuration
└── eslint.config.mjs             # ESLint flat config
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
npm run db:migrate          # Run Drizzle migrations (drizzle-kit push)
npm run db:migrate:deploy   # Deploy migrations via script
npm run drizzle:generate    # Generate Drizzle migrations
npm run drizzle:studio      # Open Drizzle Studio
npm run db:seed             # Seed database with sample data
npm run db:seed:admin       # Seed admin user
npm run db:reset            # Full database reset (DESTRUCTIVE!)
npm run studio              # Open Drizzle Studio (via script)
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

# Primary database connection
DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:5433/tutorme"

# Direct URL for migrations (same as DATABASE_URL when using port 5433)
DIRECT_URL="postgresql://tutorme:tutorme_password@localhost:5433/tutorme"

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

# WeChat OAuth (optional)
WECHAT_APP_ID="your_wechat_app_id"
WECHAT_APP_SECRET="your_wechat_app_secret"

# =============================================================================
# Global Security Configuration
# =============================================================================

SECURITY_COMPRESS=true
SECURITY_ENCRYPT=true
SECURITY_AUDIT=true
SECURITY_RATE_LIMIT=300
SECURITY_MAX_REQUESTS_PER_MINUTE=1000

# =============================================================================
# Sentry (Error monitoring)
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

# Hitpay Configuration
HITPAY_API_KEY=your_api_key
HITPAY_SALT=your_salt_key
HITPAY_ENV=sandbox  # or 'production'

# Payment Settings
PAYMENT_DEFAULT_GATEWAY=HITPAY  # or 'AIRWALLEX'

# Chinese Payment Gateways
WECHAT_MCH_ID=your_merchant_id
WECHAT_PAY_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
WECHAT_PAY_API_V3_KEY=your_32_char_api_v3_key
ALIPAY_APP_ID=your_alipay_app_id
ALIPAY_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

---

## Database Architecture

### Dual ORM Strategy

The project uses **Drizzle ORM** as the primary ORM (new code) while maintaining **Prisma** for legacy operations during migration:

- **Drizzle**: New code, type-safe SQL, better performance
- **Prisma**: Legacy migrations, being phased out

### Key Models

| Model | Purpose |
|-------|---------|
| **User** | Core user with role (STUDENT/TUTOR/PARENT/ADMIN) |
| **Profile** | Extended profile with role-specific fields |
| **Curriculum** | Course structure with modules and lessons |
| **CurriculumModule** | Course modules containing lessons |
| **CurriculumLesson** | Individual lessons with learning objectives |
| **CourseBatch** | Group-level course instances |
| **ContentItem** | Video learning content with transcripts |
| **QuizAttempt** | Student quiz responses with AI grading |
| **LiveSession** | Scheduled clinic sessions |
| **BreakoutSession** | Group breakout room sessions |
| **AITutorEnrollment** | AI tutor subject enrollments |
| **UserGamification** | XP, level, streak data |
| **FamilyMember** | Parent-student relationships |
| **Poll** | Live class polls |
| **Whiteboard** | Collaborative whiteboard data |
| **Payment** | Payment transactions |

### Connection Architecture

- **PostgreSQL** (port 5433): Direct connection for application (via launcher script)
- **PgBouncer** (port 6432): Connection pooler for production scaling
- **Redis** (port 6379): Caching and real-time state
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
// Use Drizzle for new code
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Query
const [userRow] = await drizzleDb
  .select()
  .from(user)
  .where(eq(user.id, id))
  .limit(1)

// With relations
const result = await drizzleDb.query.user.findFirst({
  where: eq(user.id, id),
  with: { profile: true }
})
```

### Internationalization (i18n)

- 10 languages supported: en, zh-CN, es, fr, de, ja, ko, pt, ru, ar
- Default locale: "en" (English)
- Translations in `/messages/{locale}.json`
- Use next-intl's `useTranslations` hook in components
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
- `src/lib/**/*.test.ts` - Library utility tests

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

### Security Headers

Configured in both `next.config.mjs` and `middleware.ts`:

- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy: Strict CSP with script/style/connect restrictions
- upgrade-insecure-requests (production only)

### Database Security

- Drizzle/Prisma prevents SQL injection
- Connection strings in environment only
- Row-level security via application logic
- Security event logging

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
# Generate Drizzle migration
npm run drizzle:generate

# Apply migration
npm run db:migrate
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

### Open Drizzle Studio

```bash
npm run drizzle:studio
# Opens at https://local.drizzle.studio
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

### Database connection issues

```bash
# Check database status
docker exec tutorme-db pg_isready -U tutorme -d tutorme

# View connection pool status
docker logs tutorme-pgbouncer

# Reset connection pool
docker restart tutorme-pgbouncer

# Check with script
npm run db:check
```

### Ollama not responding

```bash
# Pull model manually
docker exec tutorme-ollama ollama pull llama3.1

# Check logs
docker logs tutorme-ollama

# Test availability
curl http://localhost:11434/api/tags
```

### Socket.io connection issues

```bash
# Check if server.ts is being used (not next dev)
npm run dev  # Uses server.ts with Socket.io

# Verify Socket.io is initialized in logs
# Look for: "✅ Socket.io server initialized"
```

### TypeScript errors

```bash
# Check for errors
npm run typecheck

# View detailed error log
cat ts_errors.log
```

---

## Resources

- **Project Docs**: See `docs/` directory in `tutorme-app/`
- **Testing Guide**: See `tutorme-app/TESTING.md`
- **Implementation Plans**: See various `*_IMPLEMENTATION_PLAN.md` files in docs/

### External Documentation

- **shadcn/ui**: https://ui.shadcn.com/docs
- **Drizzle ORM**: https://orm.drizzle.team/docs
- **Prisma**: https://www.prisma.io/docs
- **Next.js**: https://nextjs.org/docs
- **NextAuth.js**: https://next-auth.js.org
- **Socket.io**: https://socket.io/docs/
- **next-intl**: https://next-intl-docs.vercel.app/
- **Ollama**: https://github.com/ollama/ollama
- **Daily.co**: https://docs.daily.co/
- **Kimi API**: https://platform.moonshot.cn/docs
- **Zhipu API**: https://open.bigmodel.cn/dev/howuse/model
