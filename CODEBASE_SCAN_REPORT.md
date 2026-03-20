# TutorMe / Solocorn Codebase Scan Report

**Date:** 2026-03-07  
**Scope:** Deep scan of tech stack, architecture, coding standards, deployment context, and error diagnosis  
**Deployment Target:** Google Cloud Run (containerized, stateless)

---

## 1. Tech Stack & Architecture

### 1.1 Core Frameworks

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| **Framework** | Next.js | 16.1.6 | **App Router** (confirmed via `src/app/` structure) |
| **React** | React | 18.x | Concurrent features enabled |
| **Language** | TypeScript | 5.9.3 | Strict mode enabled |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first with CSS variables |
| **UI Components** | shadcn/ui + Radix | latest | Headless, accessible components |
| **State Management** | Zustand | 5.0.11 | Client-side state (stores in `/src/stores/`) |
| **ORM** | Drizzle ORM | 0.38.0 | Primary ORM (migrating from Prisma) |
| **Database** | PostgreSQL | 16 | Via `pg` driver with connection pooling |
| **Cache** | Redis | 7 | ioredis for sessions, real-time state |
| **Auth** | NextAuth.js | 4.24.13 | JWT-based with custom session handling |
| **i18n** | next-intl | 4.8.3 | 10 languages supported |
| **Real-time** | Socket.io | 4.8.3 | WebSocket connections with Redis adapter |

### 1.2 App Router Confirmation

The project uses **Next.js App Router** (not Pages Router):

```
src/app/
├── [locale]/           # i18n route segments
│   ├── (student)/      # Route groups
│   ├── student/        # Student dashboard
│   ├── tutor/          # Tutor dashboard
│   ├── parent/         # Parent dashboard
│   ├── admin/          # Admin dashboard
│   └── api/            # API routes
├── layout.tsx          # Root layout
└── page.tsx            # Landing page
```

### 1.3 Drizzle ORM Integration

**Connection Architecture:**

```typescript
// src/lib/db/drizzle.ts
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Singleton pool for server (avoid many connections in dev)
const globalForDrizzle = globalThis as unknown as { drizzlePool: Pool | undefined }

const pool = globalForDrizzle.drizzlePool ?? new Pool({
  connectionString: process.env.DATABASE_POOL_URL || process.env.DIRECT_URL || process.env.DATABASE_URL,
  max: 50,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

export const drizzleDb = drizzle(pool, { schema })
```

**Key Patterns:**
- Uses singleton pattern with global pool for development hot-reload
- Connection pooling via `pg` Pool (max 50 connections)
- Schema definition in `src/lib/db/schema/` with relational queries
- Dual ORM strategy: Drizzle (new code) + Prisma (legacy migrations)

**Database Schema Location:**
- Tables defined in `src/lib/db/schema/tables.ts`
- Relations in `src/lib/db/schema/relations.ts`
- Compliance tables in `src/lib/db/schema/compliance.ts`

---

## 2. Coding Standards

### 2.1 Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Files** | PascalCase (components), camelCase (utils) | `Button.tsx`, `formatDate.ts` |
| **Components** | PascalCase | `StudentDashboard`, `AIChat` |
| **Functions** | camelCase | `fetchUserData`, `handleSubmit` |
| **Hooks** | camelCase with `use` prefix | `useSocket`, `useParent` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| **Database Models** | PascalCase | `curriculum`, `user` |
| **API Routes** | kebab-case folders | `api/ai-chat/route.ts` |

### 2.2 ESLint Configuration

**File:** `eslint.config.mjs`

```javascript
// Key rules (many disabled for flexibility)
'@typescript-eslint/no-explicit-any': 'off'
'@typescript-eslint/no-unused-vars': 'off'
'@typescript-eslint/no-empty-object-type': 'off'
'react-hooks/exhaustive-deps': 'off'  // IMPORTANT: Hooks deps not enforced
'react-hooks/set-state-in-effect': 'off'
'no-console': 'off'
'prefer-const': 'off'
'no-var': 'off'
```

**Critical Observation:** ESLint rules are very permissive. React Hooks rules (especially `exhaustive-deps`) are disabled, which can lead to stale closures and performance issues.

### 2.3 Hooks Usage Patterns

**useCallback Usage Pattern:**

```typescript
// Standard pattern found across codebase:
const handleAction = useCallback((param: Type) => {
  // implementation
}, [dependency1, dependency2])  // Dependencies vary

// Found in:
// - src/hooks/use-live-class-whiteboard.ts (12+ useCallbacks)
// - src/hooks/use-socket.ts
// - src/app/[locale]/tutor/dashboard/components/CourseBuilder.tsx
```

**State Management with Zustand:**

```typescript
// src/stores/classroom-store.ts
// src/stores/communication-store.ts

// Pattern: Single store files with multiple state slices
// Uses Zustand's vanilla store pattern with React bindings
```

**Common Hydration-Sensitive Patterns Found:**

1. **localStorage/sessionStorage access without guards:**
   ```typescript
   // RISKY - causes hydration mismatch:
   const savedNotes = localStorage.getItem(`notes-${videoId}`)
   
   // CORRECT pattern found in some files:
   if (typeof window !== 'undefined') {
     const savedNotes = localStorage.getItem(`notes-${videoId}`)
   }
   ```

2. **Navigator access without guards:**
   ```typescript
   // RISKY:
   const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
   
   // CORRECT:
   if (typeof navigator !== 'undefined') {
     // use navigator
   }
   ```

---

## 3. Deployment Context

### 3.1 Google Cloud Run Configuration

**File:** `.github/workflows/deploy-gcp.yml`

**Deployment Flow:**
1. **CI Job:** Build + lint on every PR
2. **Preview Job:** Deploy PR to Cloud Run with `--no-traffic` and tag `preview-pr-<number>`
3. **Production Job:** Deploy to Cloud Run with 100% traffic on merge to main

**Cloud Run Settings:**
```yaml
CPU: 1
Memory: 1Gi
Min Instances: 0
Max Instances: 2 (preview) / 10 (production)
Allow Unauthenticated: true
Concurrency: default (80)
```

**Container Configuration:**
- Base Image: `node:20-slim` (Debian-based to avoid Alpine musl issues)
- Port: 3003
- Output: `standalone` (Next.js standalone mode)
- Health Check: `GET /api/health`

### 3.2 Stateless Execution Requirements

**Verified Stateless Patterns:**
- ✅ Uses external Redis for session storage
- ✅ Uses external PostgreSQL for data persistence
- ✅ No local file system dependencies (uses S3 for uploads)
- ✅ Socket.io with Redis adapter for multi-instance WebSocket support

**Potential Statefulness Risks:**
- ⚠️ `globalForDrizzle.drizzlePool` singleton for connection pooling
- ⚠️ In-memory caching without TTL in some components
- ⚠️ LocalStorage/SessionStorage usage in client components

---

## 4. Error Diagnosis

### 4.1 React Minified Error #310 (Hydration Mismatch)

**Root Cause Analysis:**

Error #310 indicates a hydration mismatch - the server-rendered HTML doesn't match the client-side React tree.

**Likely Sources Found:**

1. **PerformanceProviders.tsx** (`src/app/components/PerformanceProviders.tsx`):
   ```typescript
   'use client';
   import { useReportWebVitals } from 'next/web-vitals';
   
   export function PerformanceProviders({ children }: { children: React.ReactNode }) {
     useReportWebVitals((metric: Record<string, unknown>) => {
       const url = '/api/analytics/web-vitals';
       if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
         navigator.sendBeacon(url, body);
       }
     });
     // ...
   }
   ```
   **Issue:** `useReportWebVitals` runs on client only, but the component is marked 'use client'. This is likely NOT the hydration source.

2. **localStorage/sessionStorage Access** (Found in 15+ files):
   ```typescript
   // src/components/video-player/notes-sidebar.tsx:30
   const savedNotes = localStorage.getItem(`notes-${videoId}`)
   
   // src/components/solocorn-chat/useSolocornChat.ts:41
   const stored = localStorage.getItem('solocorn-chat-messages');
   
   // src/components/parent/PerformanceOptimizedDashboard.tsx:318
   const cached = sessionStorage.getItem(cacheKey)
   ```
   **Issue:** These are in `useEffect` or behind `typeof window` checks in MOST cases, but some may execute during render.

3. **Browser API Access Without Guards**:
   ```typescript
   // src/hooks/use-keyboard-shortcuts.ts:42
   const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
   
   // src/components/video-player/index.tsx:114
   if (typeof navigator === 'undefined' || !('getBattery' in navigator)) return
   ```
   **Issue:** First example (`use-keyboard-shortcuts.ts`) may execute during render phase without guards.

**Primary Suspect Files for Hydration Errors:**
- `src/hooks/use-keyboard-shortcuts.ts` - navigator access
- `src/components/pwa/PWAInstallPrompt.tsx` - window/navigator access
- `src/components/video-player/notes-sidebar.tsx` - localStorage in useEffect (safe) but verify
- `src/components/parent/PerformanceOptimizedDashboard.tsx` - sessionStorage

### 4.2 404 Errors on API Routes

**Missing Route: `/api/analytics/web-vitals`**

**Evidence:**
```typescript
// src/app/components/PerformanceProviders.tsx:9
const url = '/api/analytics/web-vitals';
if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
  navigator.sendBeacon(url, body);
}
```

**Status:** The route does NOT exist in `src/app/api/analytics/`.

**File Structure Check:**
```
src/app/api/
├── analytics/          # Does not exist
├── auth/               # Exists
├── curriculum/         # Exists
├── health/             # Exists
├── payments/           # Exists
└── ...
```

**Missing Route: `/forgot-password` API endpoint**

The forgot-password page exists at `src/app/[locale]/forgot-password/page.tsx` but the API route for handling the POST request is not implemented.

**Current Implementation:**
```typescript
// src/app/[locale]/forgot-password/page.tsx:32
// Placeholder: wire to your auth API when available (e.g. POST /api/auth/forgot-password)
await new Promise((r) => setTimeout(r, 800))
```

### 4.3 CI/CD Error: "Failed to resolve tagged preview URL"

**Error Context:**
```
Run TAG="preview-pr-3"
Failed to resolve tagged preview URL for tag: preview-pr-3
Error: Process completed with exit code 1.
```

**Source:** `.github/workflows/deploy-gcp.yml` lines 121-132

```yaml
- name: Get preview revision URL
  id: preview-url
  run: |
    TAG="preview-pr-${{ github.event.pull_request.number }}"
    PREVIEW_URL=$(gcloud run services describe "${{ env.SERVICE_NAME }}" \
      --region="${{ env.REGION }}" \
      --format="value(status.traffic[?tag='${TAG}'].url)")
    if [ -z "$PREVIEW_URL" ]; then
      echo "Failed to resolve tagged preview URL for tag: ${TAG}" >&2
      exit 1
    fi
```

**Root Cause:**
The `gcloud run services describe` command is looking for traffic with a specific tag, but the preview deployment may not have propagated the tag correctly, or the service doesn't exist yet.

**Contributing Factors:**
1. The tag is set via `--tag=preview-pr-${{ github.event.pull_request.number }}` during deploy
2. Cloud Run may take time to propagate the tagged revision
3. The gcloud query `status.traffic[?tag='${TAG}'].url` may fail if the revision isn't fully deployed
4. Node.js 20 deprecation warnings suggest action versions may need updating

---

## 5. The 'Localhost' Rule

### 5.1 Local Development Setup

**Verified Local Development Commands:**
```bash
# Full setup (DB + migrations + seed + dev server)
npm run initialize

# Development server (requires Docker running)
npm run dev              # Uses server.ts with Socket.io on port 3003

# Database only
npm run db:setup
npm run db:migrate
npm run drizzle:studio   # Open Drizzle Studio
```

**Localhost URLs:**
- Application: `http://localhost:3003`
- Drizzle Studio: `https://local.drizzle.studio`
- PostgreSQL: `localhost:5433`
- Redis: `localhost:6379`

### 5.2 Local Testing Requirements

**All changes must be testable via:**
1. `npm run dev` (local Next.js + Socket.io server)
2. `npm run build` (production build simulation)
3. `npm run lint` (code quality)

**No production-direct changes allowed.**

---

## 6. Diagnostic Plan

### 6.1 Hydration Error Fix Strategy

**Phase 1: Identify Exact Source**
1. Add `suppressHydrationWarning` to root layout as temporary measure
2. Use React DevTools Profiler to identify component with mismatch
3. Check browser console for exact line numbers

**Phase 2: Fix Patterns**
1. **For localStorage/sessionStorage:**
   ```typescript
   // WRONG (causes hydration mismatch):
   const [data, setData] = useState(localStorage.getItem('key'))
   
   // CORRECT:
   const [data, setData] = useState(null)
   useEffect(() => {
     setData(localStorage.getItem('key'))
   }, [])
   ```

2. **For navigator/window:**
   ```typescript
   // WRONG:
   const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
   
   // CORRECT:
   const [isMac, setIsMac] = useState(false)
   useEffect(() => {
     setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
   }, [])
   ```

**Priority Files to Fix:**
1. `src/hooks/use-keyboard-shortcuts.ts` - navigator access at top level
2. `src/components/pwa/PWAInstallPrompt.tsx` - window/navigator in render
3. Any component using `localStorage.getItem` in `useState` initial value

### 6.2 Missing API Routes Fix Strategy

**Route 1: `/api/analytics/web-vitals`**

**Implementation Plan:**
```typescript
// Create: src/app/api/analytics/web-vitals/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'

export const POST = withAuth(async (req, session) => {
  const metric = await req.json()
  
  // Option 1: Log to console (dev)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vital]', metric)
  }
  
  // Option 2: Store in database via Drizzle
  // await drizzleDb.insert(webVitalsTable).values({...})
  
  // Option 3: Send to external analytics (Sentry, etc.)
  
  return NextResponse.json({ success: true })
})
```

**Route 2: `/api/auth/forgot-password`**

**Implementation Plan:**
```typescript
// Create: src/app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  
  const userRecord = await drizzleDb.query.user.findFirst({
    where: eq(user.email, email)
  })
  
  if (!userRecord) {
    // Return success even if user not found (security)
    return NextResponse.json({ success: true })
  }
  
  // Generate reset token
  // Store token in database
  // Send email
  
  return NextResponse.json({ success: true })
}
```

### 6.3 CI/CD Tag Resolution Fix Strategy

**Option 1: Add Retry Logic**
```yaml
- name: Get preview revision URL
  id: preview-url
  run: |
    TAG="preview-pr-${{ github.event.pull_request.number }}"
    MAX_RETRIES=5
    RETRY_DELAY=10
    
    for i in $(seq 1 $MAX_RETRIES); do
      PREVIEW_URL=$(gcloud run services describe "${{ env.SERVICE_NAME }}" \
        --region="${{ env.REGION }}" \
        --format="value(status.traffic[?tag='${TAG}'].url)")
      
      if [ -n "$PREVIEW_URL" ]; then
        echo "url=${PREVIEW_URL}" >> $GITHUB_OUTPUT
        echo "Preview URL: ${PREVIEW_URL}"
        exit 0
      fi
      
      echo "Attempt $i/$MAX_RETRIES failed. Retrying in ${RETRY_DELAY}s..."
      sleep $RETRY_DELAY
    done
    
    echo "Failed to resolve tagged preview URL for tag: ${TAG}" >&2
    exit 1
```

**Option 2: Use Deploy Output Directly**
The `google-github-actions/deploy-cloudrun` action outputs the URL directly:
```yaml
- name: Deploy to Cloud Run (no traffic)
  id: deploy-preview
  uses: google-github-actions/deploy-cloudrun@v2
  # ... config

- name: Use deploy output URL
  run: |
    echo "url=${{ steps.deploy-preview.outputs.url }}" >> $GITHUB_OUTPUT
```

**Option 3: Update Action Versions**
Update to versions that support Node.js 24:
```yaml
- uses: actions/checkout@v4  # Already latest
- uses: actions/setup-node@v4  # Already latest
- uses: google-github-actions/auth@v2  # Check for v3
- uses: google-github-actions/deploy-cloudrun@v2  # Check for v3
```

---

## 7. Summary & Action Items

### Critical Issues (Fix First)
1. **Hydration Errors:** Fix browser API access patterns in hooks/components
2. **Missing API Routes:** Create `/api/analytics/web-vitals` and `/api/auth/forgot-password`
3. **CI/CD Tag Resolution:** Add retry logic or use deploy action output

### High Priority
4. **ESLint Rules:** Re-enable `react-hooks/exhaustive-deps` to prevent stale closures
5. **Node.js Version:** Consider upgrading to Node.js 22/24 for LTS support

### Medium Priority
6. **Dependency Audit:** Address deprecation warnings in GitHub Actions
7. **State Management:** Audit Zustand stores for hydration safety

### Localhost Testing Checklist
- [ ] Run `npm run initialize` to verify local setup
- [ ] Run `npm run build` to verify production build
- [ ] Run `npm run lint` to verify code quality
- [ ] Test all changes on `http://localhost:3003` before pushing

---

**Report Generated By:** Kimi Code CLI  
**Repository:** TutorMe / Solocorn  
**Branch:** main
