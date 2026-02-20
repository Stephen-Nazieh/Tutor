# TutorMe - AI Coding Agent Guide

## Project Overview

TutorMe (also known as CogniClass) is an AI-human hybrid tutoring platform designed for the Chinese market. It combines 24/7 AI-powered Socratic tutoring with live group "clinics" led by human tutors supported by AI monitoring.

**Core Value Proposition:**
- AI tutors use Socratic method (never give direct answers, guide students to discover)
- Live clinics with 1 tutor managing up to 50 students
- Real-time AI monitoring during live sessions flags students needing help
- Video learning with inline quizzes and AI-generated assessments
- Gamification system with missions, achievements, and worlds

**Target Ratio:** 1 tutor : 50 students
**Primary Language:** Chinese (zh-CN) with English as secondary
**Default Port:** 3003

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 16 (App Router) + TypeScript | Web application framework |
| **Styling** | Tailwind CSS + shadcn/ui | UI components and styling |
| **Backend** | Next.js API Routes + Node.js | Server-side logic |
| **Real-time** | Socket.io | WebSocket connections for live sessions |
| **Database** | PostgreSQL 16 + PgBouncer | Primary data store with connection pooling |
| **Cache** | Redis 7 | Sessions, caching, real-time state |
| **ORM** | Prisma 5 | Database access and migrations |
| **AI/LLM** | Ollama (Llama 3.1) + Kimi K2.5 + Zhipu GLM | AI tutoring and generation |
| **Video** | Daily.co | Video conferencing |
| **Whiteboard** | tldraw + Yjs | Collaborative whiteboard |
| **Auth** | NextAuth.js v4 | Authentication with JWT strategy |
| **Validation** | Zod | Schema validation |
| **Testing** | Vitest + Playwright | Unit, integration, and E2E tests |

---

## Project Structure

```
tutorme-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (student)/            # Student route group
│   │   │   └── curriculum/       # Curriculum pages
│   │   ├── api/                  # API routes (100+ endpoints)
│   │   │   ├── ai/               # AI generation endpoints
│   │   │   ├── ai-tutor/         # AI tutor enrollment & chat
│   │   │   ├── auth/             # NextAuth.js handlers
│   │   │   ├── class/            # Live class & breakout rooms
│   │   │   ├── curriculum/       # Curriculum management
│   │   │   ├── payments/         # Payment processing
│   │   │   └── ...               # Many more API routes
│   │   ├── student/              # Student dashboard & features
│   │   ├── tutor/                # Tutor dashboard & features
│   │   ├── class/[roomId]/       # Live classroom
│   │   ├── layout.tsx            # Root layout (zh-CN lang)
│   │   ├── globals.css           # Global styles + CSS variables
│   │   └── page.tsx              # Landing page
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...               # 15+ shadcn components
│   │   ├── ai-tutor/             # AI tutor components
│   │   ├── class/                # Classroom components
│   │   │   ├── assets-panel.tsx
│   │   │   ├── whiteboard.tsx
│   │   │   ├── video-grid.tsx
│   │   │   └── breakout-*.tsx    # Breakout room components
│   │   ├── gamification/         # XP, missions, worlds UI
│   │   ├── quiz/                 # Quiz components
│   │   └── providers/            # Context providers
│   │
│   ├── lib/                      # Utility code & business logic
│   │   ├── ai/                   # AI provider implementations
│   │   │   ├── ollama.ts         # Local LLM (primary)
│   │   │   ├── kimi.ts           # Moonshot AI fallback
│   │   │   ├── zhipu.ts          # Zhipu AI fallback
│   │   │   ├── orchestrator.ts   # Provider fallback chain
│   │   │   ├── prompts.ts        # AI prompts (bilingual)
│   │   │   ├── tutor-service.ts  # AI tutor logic
│   │   │   ├── subjects/         # Subject-specific AI configs
│   │   │   └── teaching-prompts/ # Modular prompt system
│   │   ├── auth.ts               # NextAuth configuration
│   │   ├── curriculum/           # Curriculum lesson controller
│   │   ├── db/                   # Database client with caching
│   │   │   ├── index.ts          # Prisma client + Redis cache
│   │   │   └── queries.ts        # Optimized queries
│   │   ├── gamification/         # XP, missions, quests logic
│   │   ├── payments/             # Airwallex & Hitpay integration
│   │   ├── security/             # Rate limiting, RBAC, sanitization
│   │   ├── socket-server.ts      # Socket.io server initialization
│   │   └── video/                # Daily.co video provider
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-socket.ts         # Socket.io client hook
│   │   ├── use-breakout-rooms.ts # Breakout room management
│   │   └── use-daily-call.ts     # Video call hook
│   │
│   ├── __tests__/                # Unit & integration tests
│   │   ├── setup.ts              # Vitest setup
│   │   └── integration/          # API integration tests
│   │
│   ├── middleware.ts             # Next.js middleware (auth + rate limit)
│   └── types/next-auth.d.ts      # NextAuth type extensions
│
├── prisma/
│   ├── schema.prisma             # Database schema (1000+ lines)
│   └── seed.ts                   # Database seed script
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
│   ├── seed-curriculum.ts        # Seed curriculum data
│   └── load/                     # k6 load testing scripts
│
├── server.ts                     # Custom Next.js server with Socket.io
├── docker-compose.yml            # Postgres + Redis + Ollama + PgBouncer
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind + design tokens
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Vitest unit test config
├── vitest.integration.config.ts  # Vitest integration test config
├── playwright.config.ts          # Playwright E2E config
└── package.json                  # Dependencies and scripts
```

---

## Build and Development Commands

All commands run from `tutorme-app/` directory:

```bash
# Full Development Environment (recommended)
npm run initialize          # One-command setup: DB + migrations + seed + dev server
npm run dev:all             # Start Docker + migrations + dev server

# Development Server Only (requires Docker running)
npm run dev                 # Start Next.js + Socket.io server on port 3003
npm run dev:next            # Start only Next.js dev server

# Database Operations
npm run db:setup            # Setup database containers
npm run db:migrate          # Run Prisma migrations
npm run db:generate         # Generate Prisma client
npm run db:seed             # Seed database with sample data
npm run db:studio           # Open Prisma Studio at http://localhost:5555
npm run db:reset            # Full database reset (DESTRUCTIVE!)
npm run studio              # Open Prisma Studio (via script)

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
npm run test:load           # k6 load test (concurrent users)
npm run test:load:ai        # k6 load test (AI stress)
npm run test:load:ws        # k6 load test (WebSocket)

# Code Quality
npm run lint                # Run ESLint

# Production Build
npm run build               # Build for production
npm run start               # Start production server
```

---

## Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
# Database (Required)
# Primary connection (for migrations)
DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:5433/tutorme"
# PgBouncer connection pool (for app queries, supports 100+ concurrent users)
DATABASE_POOL_URL="postgresql://tutorme:tutorme_password@localhost:5433/tutorme"

# Redis Cache (Required)
REDIS_URL="redis://localhost:6379"

# AI Providers (Priority: Ollama -> Kimi -> Zhipu)
OLLAMA_URL="http://localhost:11434"
KIMI_API_KEY="your_kimi_api_key_here"      # From https://platform.moonshot.cn/
ZHIPU_API_KEY="your_zhipu_api_key_here"    # From https://open.bigmodel.cn/

# Video Conferencing (Daily.co)
DAILY_API_KEY="your_daily_api_key_here"    # From https://dashboard.daily.co/

# Authentication (NextAuth.js)
NEXTAUTH_SECRET="your_random_secret_here_min_32_chars"
NEXTAUTH_URL="http://localhost:3003"

# WeChat OAuth (Optional)
WECHAT_APP_ID="your_wechat_app_id"
WECHAT_APP_SECRET="your_wechat_app_secret"

# Payment Gateways
# Airwallex
AIRWALLEX_CLIENT_ID=your_client_id
AIRWALLEX_API_KEY=your_api_key
AIRWALLEX_ENV=sandbox  # or 'production'
AIRWALLEX_WEBHOOK_SECRET=your_webhook_secret

# Hitpay
HITPAY_API_KEY=your_api_key
HITPAY_SALT=your_salt_key
HITPAY_ENV=sandbox  # or 'production'
HITPAY_WEBHOOK_SECRET=your_webhook_secret
PAYMENT_DEFAULT_GATEWAY=HITPAY  # or 'AIRWALLEX'

# Application Settings
NEXT_PUBLIC_APP_URL="http://localhost:3003"
NODE_ENV="development"

# Cache TTL Settings (seconds)
CACHE_TTL_DEFAULT=60
CACHE_TTL_USER=300
CACHE_TTL_LEADERBOARD=300
CACHE_TTL_CONTENT=600
```

---

## Database Architecture

### Key Models (Prisma Schema)

| Model | Purpose |
|-------|---------|
| **User** | Core user with role (STUDENT/TUTOR/ADMIN) |
| **Profile** | Extended profile with student/tutor specific fields |
| **Curriculum** | Course structure with modules and lessons |
| **CurriculumModule** | Course modules containing lessons |
| **CurriculumLesson** | Individual lessons with learning objectives |
| **LessonSession** | Active AI tutoring session state |
| **ContentItem** | Video learning content with transcripts |
| **VideoWatchEvent** | Video engagement analytics |
| **ContentQuizCheckpoint** | Inline video quizzes |
| **QuizAttempt** | Student quiz responses with AI grading |
| **LiveSession** | Scheduled clinic sessions |
| **SessionParticipant** | Student participation tracking |
| **Clinic** | Tutor-led group sessions (max 50 students) |
| **ClinicBooking** | Student bookings for clinics |
| **Payment** | Payment transactions |
| **Refund** | Refund records |
| **Message** | AI/student chat history |
| **Note** | Timestamped video notes |
| **Bookmark** | Saved content items |
| **UserGamification** | XP, level, streak data |
| **Achievement** | Unlocked achievements |
| **Mission** | Daily/weekly quests |
| **AITutorEnrollment** | AI tutor subject enrollments |
| **AITutorSubscription** | Subscription tiers (FREE/PRO/ELITE) |
| **BreakoutSession** | Group breakout room sessions |
| **BreakoutRoom** | Individual breakout rooms |
| **GeneratedTask** | AI-generated assignments |
| **TaskSubmission** | Student task submissions |
| **FeedbackWorkflow** | AI+tutor feedback system |
| **StudentPerformance** | Analytics and clustering data |
| **StudyGroup** | Student study groups |

### Connection Architecture

- **PostgreSQL**: Direct connection for migrations (port 5432)
- **PgBouncer**: Connection pooler for app queries (port 5433)
  - Pool mode: transaction
  - Max client connections: 1000
  - Default pool size: 50
- **Redis**: Caching and real-time state (port 6379)
- **Read Replicas**: Configurable via DATABASE_READ_REPLICA_URL

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
```

### Database Access Patterns

```typescript
// Use the singleton db instance
import { db, cache, queryOptimizer } from '@/lib/db'

// Basic query
const user = await db.user.findUnique({ where: { id } })

// With caching
const cached = await cache.get<User>(`user:${id}`)
if (cached) return cached

// Cached query
const result = await queryOptimizer.cachedQuery(
  `content:list`,
  () => db.contentItem.findMany({ where: { isPublished: true } }),
  300 // TTL seconds
)

// Batch load to prevent N+1
const items = await queryOptimizer.batchLoad(
  ids,
  (ids) => db.item.findMany({ where: { id: { in: ids } } }),
  (item) => item.id
)
```

### Bilingual Support

- All user-facing strings use Chinese (zh-CN) as primary language
- AI prompts defined in `lib/ai/prompts.ts` and `lib/ai/teaching-prompts/` with language parameter
- UI text in components currently hardcoded in Chinese
- HTML lang attribute set to "zh-CN" in layout.tsx

---

## Testing Instructions

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test

# Run in watch mode
npm run test:watch

# Run with coverage (if configured)
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

Located in `src/__tests__/integration/`. **Requires a running database:** set `DATABASE_URL` (e.g. to a dedicated test DB like `tutorme_test` in CI). Unit tests (`npm run test` / `npm run test:unit`) exclude integration and do not require a DB.

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

- NextAuth.js with JWT session strategy (30-day expiry)
- Role-based access control (STUDENT/TUTOR/ADMIN)
- Middleware (`src/middleware.ts`) handles:
  - Route protection based on role
  - Rate limiting (100 requests/minute per IP)
  - Security headers (CSP, X-Frame-Options, etc.)
- Onboarding flow redirects new users to complete profile

### Rate Limiting

```typescript
// Configured in middleware.ts
const API_RATE_LIMIT_MAX = 100 // per minute per IP
const RATE_LIMIT_SKIP = ['/api/auth', '/api/health', '/api/payments/webhooks']
```

### Security Headers (next.config.mjs)

- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy: Strict CSP with script/style/connect restrictions

### Database Security

- Prisma prevents SQL injection
- Connection strings in environment only
- Row-level security via application logic
- Security event logging in `SecurityEvent` model

### CSRF Protection

CSRF tokens required for state-changing operations:

```typescript
// Get token
const { token } = await fetch('/api/csrf').then(r => r.json())

// Include in requests
fetch('/api/some-action', {
  headers: { 'X-CSRF-Token': token }
})
```

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

- All UI must be responsive (minimum 320px width)
- Touch-friendly controls (min 44px touch targets via `min-h-touch`)
- Test on mobile devices/screensizes
- PWA support with manifest.json

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

- **VPS**: 8-core, 32GB RAM, 1x GPU (¥3,000/mo)
- **Container Orchestration**: Docker Compose or Kubernetes
- **Reverse Proxy**: Nginx with SSL (Let's Encrypt)
- **Monitoring**: Prometheus/Grafana (postgres-exporter included)
- **Backups**: Automated database backups

### Environment Variables for Production

- Update `NEXTAUTH_URL` to production domain
- Use production API keys for AI/video services
- Configure WeChat Pay credentials
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

- PostgreSQL: 5432 (direct), 5433 (PgBouncer)
- Redis: 6379
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
docker exec tutorme-db pg_isready -U postgres

# View connection pool status
docker logs tutorme-pgbouncer

# Reset connection pool
docker restart tutorme-pgbouncer
```

---

## Resources

- **Project Docs**: See `docs/` directory in project root
- **Roadmap**: See `Roadmap.md` for development timeline
- **Quick Start**: See `QUICKSTART.md` for setup instructions
- **Features**: See `APP_FEATURES.md` for feature specifications

### External Documentation

- **shadcn/ui**: https://ui.shadcn.com/docs
- **Prisma**: https://www.prisma.io/docs
- **Next.js**: https://nextjs.org/docs
- **NextAuth.js**: https://next-auth.js.org
- **Socket.io**: https://socket.io/docs/
- **Ollama**: https://github.com/ollama/ollama
- **Daily.co**: https://docs.daily.co/
- **Kimi API**: https://platform.moonshot.cn/docs
- **Zhipu API**: https://open.bigmodel.cn/dev/howuse/model
