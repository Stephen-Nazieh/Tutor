# AntiGravity Code Analysis & Recommendations
## TutorMekimi Online Tutoring Platform

**Analysis Date:** February 15, 2026  
**Analyzed By:** AntiGravity AI Code Reviewer

---

## Executive Summary

This document presents a comprehensive analysis of the TutorMekimi online tutoring platform codebase. The analysis identified several critical issues, redundancies, and architectural concerns that need immediate attention. The platform shows ambition with features like real-time collaboration, AI tutoring, breakout rooms, and performance analytics, but suffers from code duplication, resource management issues, and scaling problems.

**Critical Issues Found:**
- ⚠️ **40+ separate Prisma Client instances** causing memory leaks
- ⚠️ **Clinic tab layout broken** - writing areas have insufficient vertical space
- ⚠️ **Massive component file** (1,351 lines) violating Single Responsibility Principle
- ⚠️ **Inconsistent database client usage** across the codebase
- ⚠️ **Over-engineered database schema** with potential performance bottlenecks

---

## 1. Critical Issues & Redundancies

### 1.1 Prisma Client Memory Leak (CRITICAL)

> [!CAUTION]
> **IMMEDIATE ACTION REQUIRED**: This issue will cause severe performance degradation and potential crashes in production

**Problem:**  
Found **40+ separate `new PrismaClient()` instantiations** across the codebase instead of using a singleton pattern.

**Affected Files:**
- `/src/lib/auth.ts`
- `/src/lib/performance/student-analytics.ts`
- `/src/lib/feedback/workflow.ts`
- `/src/lib/ai/task-generator.ts`
- `/src/lib/whiteboard/history.ts`
- `/src/lib/chat/summary.ts`
- `/src/app/api/bookmarks/route.ts`
- `/src/app/api/analytics/students/[studentId]/route.ts`
- `/src/app/api/clinic/rooms/route.ts`
- `/src/app/api/clinic/breakout/route.ts`
- ... and 30+ more files

**Impact:**
- Each Prisma Client creates a new database connection pool (default: 10 connections)
- With 40 instances × 10 connections = **400 database connections**
- Causes connection pool exhaustion
- Increases memory usage dramatically (each client ~10-50MB)
- Slower query performance due to connection overhead

**Current Implementation:**
```typescript
// WRONG - Found in 40+ files
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

**Correct Implementation:**
```typescript
// Use the singleton from /src/lib/db/index.ts
import { db } from '@/lib/db'
```

**Why This Exists:**  
A singleton pattern EXISTS at `/src/lib/db/index.ts` but isn't being used consistently. Developers created new instances instead of importing the shared one.

**Fix:** Replace all `new PrismaClient()` with `import { db } from '@/lib/db'`

---

### 1.2 Component Size & Maintainability

#### EnhancedWhiteboard Component (1,351 lines)

**Location:** `/src/components/clinic/enhanced-whiteboard.tsx`

> [!WARNING]
> This single component file contains 1,351 lines of code, making it extremely difficult to maintain, test, and debug.

**Issues:**
- Violates Single Responsibility Principle
- Contains multiple concerns: drawing, text editing, video handling, pan/zoom, shapes, assets
- Difficult to unit test
- High cognitive load for developers
- Merge conflicts likely with multiple developers

**What it does (too much):**
- Canvas drawing (pen, eraser, shapes, lines)
- Text overlays with formatting
- Pan/zoom/scroll functionality
- Video overlay positioning
- Asset sidebar management
- Teaching assistant integration  
- Multi-page whiteboard management
- Selection and object manipulation

**Recommended Refactoring:**
- Extract to separate components: `DrawingCanvas`, `TextOverlay`, `VideoOverlay`, `AssetSidebar`, `ZoomControls`, `PageManager`
- Use composition pattern
- Create custom hooks: `useCanvasDrawing`, `useWhiteboardState`, `usePanZoom`
- Estimated reduction: 1,351 lines → 6-8 smaller files (~150-250 lines each)

---

### 1.3 API Route Redundancy

**Problem:** Duplicate authentication and database initialization patterns across 25+ API routes.

**Example Pattern (repeated 25+ times):**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... business logic
}
```

**Issues:**
- Authentication boilerplate duplicated 25+ times
- Error handling inconsistent
- No centralized request validation
- Missing rate limiting
- No request logging/monitoring

**Better Approach:**
Create middleware/helper functions:
```typescript
// /src/lib/api/auth-middleware.ts
export async function withAuth(
  handler: (req: NextRequest, session: Session) => Promise<Response>,
  options?: { role?: 'TUTOR' | 'STUDENT' | 'ADMIN' }
) {
  return async (req: NextRequest) => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) throw new UnauthorizedError()
    if (options?.role && session.user.role !== options.role) {
      throw new ForbiddenError()
    }
    return handler(req, session)
  }
}
```

---

## 2. Clinic Page Tab Issues (THE SPECIFIC PROBLEM)

> [!IMPORTANT]
> You specifically asked about issues with the Clinic page tabs, especially the writing area on the classroom tab occupying only a small space vertically. Here's the detailed analysis:

### 2.1 Root Cause Analysis

**Location:** `/src/app/clinic/[roomId]/page.tsx`

**The Problem:**  
All three tabs (Classroom, Course Dev, Breakouts) have layout issues because the `TabsContent` components are fighting with the parent container's height constraints.

**Problematic Code (Lines 511, 582, 594):**

```typescript
{/* Classroom Tab */}
<TabsContent value="classroom" className="flex-1 flex m-0 mt-0 p-0 overflow-hidden">
  <div className="flex-1 flex overflow-hidden">
    <div className="flex-1 relative">
      <EnhancedWhiteboard ... />  {/* ISSUE: Height collapsed */}
    </div>
  </div>
</TabsContent>

{/* Course Dev Tab */}
<TabsContent value="coursedev" className="flex-1 flex m-0 mt-0 p-0 overflow-hidden">
  <CourseDevPanel ... />  {/* ISSUE: Height collapsed */}
</TabsContent>

{/* Breakouts Tab */}
<TabsContent value="breakouts" className="flex-1 flex m-0 mt-0 p-0 overflow-hidden">
  <BreakoutControlPanel ... />  {/* ISSUE: Height collapsed */}
</TabsContent>
```

### 2.2 Why The Writing Area is Small

The issue is **CSS flexbox height calculation**:

1. **Parent Container**: The `<Tabs>` component has `className="flex-1 flex flex-col"` which is correct
2. **TabsContent**: Has `className="flex-1 flex m-0 mt-0 p-0 overflow-hidden"`
3. **Problem**: Radix UI's `TabsContent` has `data-state="inactive"` display rules that conflict with flexbox height

When Radix UI switches tabs, inactive tabs get `display: none`, but the active tab doesn't properly calculate height due to the nested flex containers.

### 2.3 The Fix

**Option 1: Force Absolute Positioning (Recommended)**

```typescript
<TabsContent 
  value="classroom" 
  className="absolute inset-0 flex m-0 p-0 data-[state=active]:flex data-[state=inactive]:hidden"
>
```

**Option 2: Set Explicit Height**

```typescript
<TabsContent 
  value="classroom" 
  className="flex-1 flex m-0 mt-0 p-0 overflow-hidden h-full"
>
```

**Option 3: Restructure the Layout Container**

The best fix is to change the parent `Tabs` structure:

```typescript
<Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
  <div className="bg-gray-800 border-b border-gray-700 px-4">
    <TabsList className="bg-gray-700">
      {/* tabs */}
    </TabsList>
  </div>

  <div className="flex-1 relative min-h-0"> {/* NEW WRAPPER */}
    <TabsContent 
      value="classroom" 
      className="absolute inset-0 flex m-0 p-0"
    >
      {/* content */}
    </TabsContent>
    
    <TabsContent 
      value="coursedev" 
      className="absolute inset-0 flex m-0 p-0"
    >
      {/* content */}
    </TabsContent>
    
    <TabsContent 
      value="breakouts" 
      className="absolute inset-0 flex m-0 p-0"
    >
      {/* content */}
    </TabsContent>
  </div>
</Tabs>
```

**Why This Works:**
- Creates a positioned container for tabs
- Uses `absolute inset-0` to make tabs fill the container
- Avoids flexbox height calculation issues
- Ensures each tab gets full available height

---

## 3. Database Schema Concerns

### 3.1 Over-Engineering

**Current State:** 40+ Prisma models covering:
- User management (User, Profile, Account)
- Curriculum system (7 models)
- Student performance (5 models)
- AI tutoring (4 models)
- Gamification (6 models)
- Live sessions (4 models)
- Breakout rooms (3 models)
- Content & quizzes (5 models)
- Study groups, clinics, bookmarks, notes, etc.

**Issues:**
- Too many models for initial launch
- Complex relationships causing slow queries
- No database indexing strategy documented
- Missing query optimization

**Example of Complexity:**
```prisma
model User {
  id                       String                     @id @default(cuid())
  email                    String                     @unique
  password                 String?
  role                     Role                       @default(STUDENT)
  // ... 15+ direct relations
  aiTutorDailyUsages       AITutorDailyUsage[]
  aiTutorEnrollments       AITutorEnrollment[]
  aiTutorSubscription      AITutorSubscription?
  // ... and 30+ more relations
}
```

**Impact:**
- Slow join queries
- N+1 query problems likely
- Difficult to maintain
- Hard to optimize
- Complex migrations

### 3.2 Missing Database Optimization

**No Evidence Of:**
- Query result caching (Redis integration exists but unused for DB queries)
- Database connection pooling configuration
- Read replicas strategy
- Materialized views for analytics
- Proper indexing strategy beyond basic `@@index`

**Recommendations:**
1. Create composite indexes for common queries
2. Implement database query monitoring
3. Add Redis caching layer for frequently accessed data
4. Consider view models for complex aggregations
5. Document query performance baselines

---

## 4. API Organization Issues

### 4.1 Inconsistent Structure

**Current API Organization:**

```
/api
├── achievements/
├── ai-tutor/ (7 routes)
├── analytics/ (2 subdirs)
├── auth/register
├── bookmarks/
├── chat/
├── clinic/ (3 subdirs)
├── clinics/
├── content/
├── curriculum/ (8 routes)
├── curriculums/
├── feedback/ (4 routes)
├── gamification/ (5 routes)
├── health/
├── onboarding/ (2 routes)
├── progress/
├── quiz/ (3 routes)
├── recommendations/
├── reports/ (2 subdirs)
├── socket/
├── student/ (4 subdirs)
├── study-groups/
├── tasks/
└── user/
```

**Issues:**
- Inconsistent naming (clinic vs clinics, curriculum vs curriculums)
- No versioning (what happens when you need breaking changes?)
- Flat structure makes related endpoints hard to find
- No clear API grouping by feature domain

### 4.2 Better API Structure

**Recommended Organization:**

```
/api
├── v1/
│   ├── auth/
│   │   ├── register/
│   │   ├── login/
│   │   └── session/
│   ├── users/
│   │   ├── [userId]/profile
│   │   └── [userId]/settings
│   ├── learning/
│   │   ├── curriculum/
│   │   ├── lessons/
│   │   ├── quizzes/
│   │   └── content/
│   ├── live-sessions/
│   │   ├── clinics/
│   │   ├── breakout-rooms/
│   │   └── study-groups/
│   ├── analytics/
│   │   ├── students/
│   │   ├── performance/
│   │   └── reports/
│   ├── ai/
│   │   ├── tutor/
│   │   ├── tasks/
│   │   └── feedback/
│   └── gamification/
│       ├── achievements/
│       ├── missions/
│       └── progress/
└── health/
```

**Benefits:**
- Version-aware (easy to add /v2)
- Domain-driven organization
- Related endpoints grouped together
- Easier to document and discover
- Clearer API surface

---

## 5. Code Organization Recommendations

### 5.1 Feature-Based Structure

**Current:** Type-based organization (components/, lib/, app/)

**Better:** Feature-based + shared

```
/src
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   ├── clinic/
│   │   ├── components/
│   │   │   ├── whiteboard/
│   │   │   ├── video/
│   │   │   └── controls/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   ├── curriculum/
│   ├── ai-tutor/
│   └── analytics/
├── shared/
│   ├── components/ (UI library)
│   ├── hooks/
│   ├── utils/
│   └── types/
├── lib/
│   ├── db/
│   ├── auth/
│   └── config/
└── app/ (Next.js pages only)
```

**Benefits:**
- Easier to find related code
- Clear feature boundaries
- Better code ownership
- Easier to extract to microservices later
- Reduced merge conflicts

### 5.2 Shared Code Extraction

**Current Issues:**
- Business logic mixed with API routes
- Validation logic duplicated
- No service layer

**Recommended Pattern:**

```typescript
// /src/features/clinic/services/clinic-service.ts
export class ClinicService {
  constructor(private db: PrismaClient) {}
  
  async createRoom(tutorId: string, options: CreateRoomOptions) {
    // Business logic here
    // Can be tested independently
    // Reusable across API routes and server actions
  }
  
  async joinRoom(roomId: string, userId: string) {
    // ...
  }
}

// /src/app/api/clinic/rooms/route.ts
import { withAuth } from '@/lib/api/middleware'
import { ClinicService } from '@/features/clinic/services'
import { db } from '@/lib/db'

export const POST = withAuth(async (req, session) => {
  const service = new ClinicService(db)
  const room = await service.createRoom(session.user.id, await req.json())
  return NextResponse.json(room)
}, { role: 'TUTOR' })
```

---

## 6. State Management Issues

### 6.1 No Centralized State Management

**Current:** 
- useState everywhere
- Props drilling through multiple levels
- Duplicated state across components
- No global state management library

**Example from clinic page:** 30+ useState hooks in single component:

```typescript
const [students, setStudents] = useState<StudentState[]>([])
const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
const [breakoutRooms, setBreakoutRooms] = useState<BreakoutRoom[]>([])
const [activeTab, setActiveTab] = useState('classroom')
const [roomData, setRoomData] = useState<...>(null)
const [isVideoFullscreen, setIsVideoFullscreen] = useState(false)
// ... 25+ more
```

**Recommendations:**

**Option 1: Zustand (Lightweight)**
```typescript
// /src/features/clinic/store/clinic-store.ts
import create from 'zustand'

export const useClinicStore = create((set) => ({
  students: [],
  chatMessages: [],
  breakoutRooms: [],
  activeTab: 'classroom',
  addChatMessage: (msg) => set((state) => ({ 
    chatMessages: [...state.chatMessages, msg] 
  })),
  // ...
}))
```

**Option 2: React Query (For Server State)**
```typescript
// Perfect for data fetching
const { data: students } = useQuery(['clinic', roomId, 'students'], 
  () => fetchStudents(roomId)
)
```

**Option 3: Jotai (Atomic State)**
```typescript
// atom-based approach
const studentsAtom = atom<StudentState[]>([])
const chatMessagesAtom = atom<ChatMessage[]>([])
```

---

## 7. Security Concerns

### 7.1 Authentication Issues

**Found Issues:**

1. **No rate limiting** on API endpoints
2. **No CSRF protection** documented
3. **Session expiration** not clearly defined
4. **Password requirements** not enforced in schema
5. **No 2FA support** mentioned
6. **API keys** exposed in API routes (if any)

### 7.2 Data Validation

**Missing:**
- Input sanitization layer
- Zod/Yup schema validation at API boundaries
- SQL injection protection (Prisma helps but not foolproof)
- XSS protection in client components
- File upload validation

**Recommendation:**
```typescript
// /src/lib/validation/schemas.ts
import { z } from 'zod'

export const CreateRoomSchema = z.object({
  title: z.string().min(3).max(100),
  subject: z.string().min(2),
  maxStudents: z.number().int().min(1).max(500),
  durationMinutes: z.number().int().min(15).max(480)
})

// In API route
export async function POST(req: NextRequest) {
  const body = await req.json()
  const validated = CreateRoomSchema.parse(body) // Throws if invalid
  // ...
}
```

---

## 8. Performance Concerns

### 8.1 Missing Optimizations

**Current State:**
- No evidence of code splitting
- No lazy loading for components
- Large bundle size likely (no analysis provided)
- No image optimization strategy
- No CDN configuration mentioned

### 8.2 Real-Time Performance

**Socket.IO Usage:**
- Good: Using Socket.IO for real-time features
- Concern: No connection pooling strategy
- Concern: No backpressure handling
- Concern: No message rate limiting
- Missing: Horizontal scaling strategy (sticky sessions?)

**Recommendations:**
1. Implement Redis adapter for Socket.IO clustering
2. Add rate limiting per user
3. Implement message queuing for high-traffic scenarios
4. Add connection health monitoring

---

## 9. Testing Coverage

### 9.1 No Evidence of Tests

**Missing:**
- Unit tests
- Integration tests
- E2E tests
- API endpoint tests
- Component tests

**Current Risk:**
- No confidence in refactoring
- Breaking changes undetected
- Hard to onboard new developers
- Regression bugs likely

**Recommendations:**

```typescript
// Example: /src/features/clinic/services/__tests__/clinic-service.test.ts
import { ClinicService } from '../clinic-service'
import { mockPrisma } from '@/test/mocks/prisma'

describe('ClinicService', () => {
  it('should create a clinic room', async () => {
    const service = new ClinicService(mockPrisma)
    const room = await service.createRoom('tutor-1', {
      title: 'Math Clinic',
      subject: 'Mathematics'
    })
    expect(room.title).toBe('Math Clinic')
  })
})
```

---

## 10. Expert Recommendations (Priority Order)

### 🔥 Critical (Fix Immediately)

1. **Fix Prisma Client Memory Leak**
   - Impact: High (production stability)
   - Effort: Low (2-4 hours)
   - Action: Replace all `new PrismaClient()` with `import { db }`

2. **Fix Clinic Tab Layout**
   - Impact: High (user experience)
   - Effort: Low (30 minutes)
   - Action: Apply CSS fixes from Section 2.3

3. **Add API Authentication Middleware**
   - Impact: High (security)
   - Effort: Medium (4-8 hours)
   - Action: Create `withAuth` helper, refactor routes

### ⚠️ High Priority (Fix This Sprint)

4. **Refactor EnhancedWhiteboard**
   - Impact: Medium (maintainability)
   - Effort: High (2-3 days)
   - Action: Split into 6-8 components

5. **Add Input Validation**
   - Impact: High (security)
   - Effort: Medium (8-16 hours)
   - Action: Add Zod schemas to all API routes

6. **Implement State Management**
   - Impact: Medium (DX, performance)
   - Effort: Medium (1-2 days)
   - Action: Add Zustand for UI state, React Query for server state

### 📊 Medium Priority (Next Sprint)

7. **Reorganize API Structure**
   - Impact: Medium (DX, scalability)
   - Effort: High (3-5 days)
   - Action: Implement versioned API structure

8. **Add Database Indexes**
   - Impact: High (performance)
   - Effort: Medium (1-2 days)
   - Action: Analyze slow queries, add indexes

9. **Implement Caching Layer**
   - Impact: High (performance)
   - Effort: Medium (2-3 days)
   - Action: Add Redis caching for read-heavy queries

### 📝 Low Priority (Backlog)

10. **Refactor to Feature-Based Structure**
    - Impact: Low (DX)
    - Effort: Very High (1-2 weeks)
    - Action: Gradual migration

11. **Add Test Coverage**
    - Impact: Medium (quality)
    - Effort: Very High (ongoing)
    - Action: Start with critical paths, add gradually

12. **Simplify Database Schema**
    - Impact: Medium (performance, maintainability)
    - Effort: Very High (2-3 weeks)
    - Action: Identify unused models, merge similar tables

---

## 11. Architectural Improvements

### 11.1 Recommended Tech Stack Additions

**Current:**
- ✅ Next.js 16
- ✅ Prisma ORM
- ✅ NextAuth
- ✅ Socket.IO
- ✅ TailwindCSS
- ✅ Radix UI

**Add:**
- 🔧 **Zustand** - State management (5KB)
- 🔧 **React Query** - Server state & caching
- 🔧 **Zod** - Runtime validation
- 🔧 **Vitest** - Fast unit testing
- 🔧 **Playwright** - E2E testing
- 🔧 **Sentry** - Error monitoring
- 🔧 **OpenTelemetry** - Performance monitoring

### 11.2 Microservices Candidates

If the platform grows, consider extracting:

1. **AI Service** - LLM interactions, task generation, feedback
2. **Video Service** - Daily.co integration, recording management
3. **Real-time Service** - Socket.IO, presence, chat
4. **Analytics Service** - Performance tracking, reporting

**Current Monolith:** Easier to develop, deploy, debug  
**Future Microservices:** Better scaling, team ownership, independent deployment

---

## 12. Documentation Gaps

**Missing:**
- API documentation (OpenAPI/Swagger)
- Architecture decision records (ADRs)
- Database schema documentation
- Deployment guide
- Development setup guide
- Component library documentation (Storybook?)
- Performance benchmarks
- Security policies
- Backup & recovery procedures

---

## 13. Deployment & DevOps Concerns

**No Evidence Of:**
- CI/CD pipeline configuration
- Staging environment
- Database migrations strategy
- Monitoring & alerting
- Log aggregation
- Backup strategy
- Disaster recovery plan
- Rollback procedures

---

## Conclusion

The TutorMekimi platform shows **strong potential** with ambitious features, but **critical technical debt** must be addressed before scaling. The most urgent issues are:

1. ✅ Prisma Client memory leaks
2. ✅ Clinic page layout issues
3. ✅ Missing security measures
4. ✅ No testing infrastructure
5. ✅ Poor code organization

**Estimated Time to Address Critical Issues:** 2-3 weeks with 2 developers

**Recommended Next Steps:**
1. Fix Prisma Client issue (day 1)
2. Fix Clinic tabs (day 1)
3. Add authentication middleware (week 1)
4. Set up testing framework (week 1)
5. Begin EnhancedWhiteboard refactor (week 2)
6. Add validation layer (week 2-3)

**Long-term Vision:**
- Feature-based architecture
- Comprehensive test coverage
- Production monitoring
- Performance optimization
- Potential microservices migration

The codebase is **recoverable** with focused effort. Prioritize stability and security first, then tackle maintainability and performance.

---

**Questions or Need Clarification?**  
This analysis is comprehensive but happy to dive deeper into any specific area. The most impactful change you can make today is fixing the Prisma Client issue - it's a ticking time bomb.
