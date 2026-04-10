# TutorMekimi/Solocorn Code Review Report

**Date:** 2026-04-10  
**Scope:** Database Schema, Backend API, TypeScript Quality, Security, Performance  
**Files Analyzed:** 50+ files including all schema tables, key API routes, and security modules

---

## Executive Summary

The codebase demonstrates solid architecture with Drizzle ORM, proper authentication middleware, and good security practices. However, several issues were identified across TypeScript typing, missing database constraints, potential security gaps, and performance optimization opportunities.

**Severity Legend:**
- 🔴 **CRITICAL** - Immediate action required
- 🟠 **HIGH** - Fix before production
- 🟡 **MEDIUM** - Should be addressed
- 🟢 **LOW** - Nice to have improvements

---

## 1. DATABASE SCHEMA REVIEW

### 1.1 Missing Foreign Key Constraints 🔴 CRITICAL

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/db/schema/tables/content.ts` | 74-95 | `contentQuizCheckpoint.contentId` missing FK reference | Add `.references(() => contentItem.contentId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/content.ts` | 97-116 | `contentProgress.contentId` missing FK reference | Add `.references(() => contentItem.contentId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/content.ts` | 97-116 | `contentProgress.studentId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/content.ts` | 118-143 | `reviewSchedule.contentId` missing FK reference | Add `.references(() => contentItem.contentId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/content.ts` | 118-143 | `reviewSchedule.studentId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/content.ts` | 180-213 | `questionBankItem.curriculumId` missing FK reference | Add FK to course table or remove if truly optional |
| `src/lib/db/schema/tables/classroom.ts` | 117-137 | `aIInteractionSession.studentId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/classroom.ts` | 181-197 | `studentAgentSignal.studentId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/live.ts` | 155-168 | `sessionBookmark.sessionId` missing FK reference | Add `.references(() => liveSession.sessionId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/live.ts` | 170-196 | `resource.tutorId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/live.ts` | 198-223 | `resourceShare.resourceId` missing FK reference | Add `.references(() => resource.resourceId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/live.ts` | 225-250 | `libraryTask.userId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/analytics.ts` | 89-98 | `sessionEngagementSummary` missing all FK references | Add sessionId FK reference |
| `src/lib/db/schema/tables/calendar.ts` | 158-195 | `oneOnOneBookingRequest.studentId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/builder.ts` | 132-151 | `builderTaskDmi.taskId` missing FK reference | Add `.references(() => builderTask.taskId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/builder.ts` | 153-171 | `builderTaskDmiVersion.taskId` missing FK reference | Add `.references(() => builderTask.taskId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/builder.ts` | 177-198 | `taskPoll.taskId` missing FK reference | Add `.references(() => builderTask.taskId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/builder.ts` | 177-198 | `taskPoll.tutorId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/builder.ts` | 200-220 | `taskQuestion.taskId` missing FK reference | Add `.references(() => builderTask.taskId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/builder.ts` | 200-220 | `taskQuestion.tutorId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/builder.ts` | 222-240 | `taskDeployment.taskId` missing FK reference | Add `.references(() => builderTask.taskId, { onDelete: 'cascade' })` |
| `src/lib/db/schema/tables/builder.ts` | 222-240 | `taskDeployment.tutorId` missing FK reference | Add `.references(() => user.userId, { onDelete: 'cascade' })` |

### 1.2 Missing Indexes 🟡 MEDIUM

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/db/schema/tables/auth.ts` | 65-100 | `profile` table missing composite index on `(name, username)` | Add for user search performance |
| `src/lib/db/schema/tables/curriculum.ts` | 248-281 | `studentPerformance` missing index on `updatedAt` | Add for recent performance queries |
| `src/lib/db/schema/tables/curriculum.ts` | 312-339 | `feedbackWorkflow` missing index on `createdAt` | Add for date-range queries |
| `src/lib/db/schema/tables/content.ts` | 215-251 | `quiz` table missing composite index on `(status, createdAt)` | Add for quiz listing performance |
| `src/lib/db/schema/tables/finance.ts` | 151-167 | `platformRevenue` missing index on `(month, createdAt)` | Add for revenue reporting |
| `src/lib/db/schema/tables/family.ts` | 242-269 | `studentProgressSnapshot` missing index on `capturedAt` alone | Add for snapshot queries |
| `src/lib/db/schema/tables/classroom.ts` | 220-229 | `aITutorSubscription` missing indexes on foreign key | Add index on `userId` |

### 1.3 Data Type Issues 🟠 HIGH

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/db/schema/tables/curriculum.ts` | 248-281 | `studentPerformance.courseId` allows NULL without FK | Make NOT NULL or add proper FK with `onDelete: 'set null'` |
| `src/lib/db/schema/tables/content.ts` | 180-213 | `questionBankItem.lessonId` has no FK constraint | Add FK or document why it's loosely coupled |
| `src/lib/db/schema/tables/live.ts` | 300-332 | `notification.data` is jsonb without type | Define proper TypeScript type for notification data |
| `src/lib/db/schema/tables/live.ts` | 334-348 | `notificationPreference` missing `userId` FK | Add `.references(() => user.userId, { onDelete: 'cascade' })` |

---

## 2. BACKEND API REVIEW

### 2.1 Error Handling Issues 🟠 HIGH

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/app/api/payments/webhooks/hitpay/route.ts` | 116-146 | Fire-and-forget promise without proper error boundary | Wrap in try-catch with Sentry logging |
| `src/app/api/payments/webhooks/hitpay/route.ts` | 147-166 | Email sending not awaited, errors only logged to console | Use proper error handling with retries |
| `src/app/api/quiz/grade/route.ts` | 42-44 | `any` type used for student context properties | Define proper interface for learning style and mood |
| `src/app/api/admin/users/route.ts` | 44 | `ilike` with user input - potential for expensive queries | Add input length limit and sanitization |

### 2.2 TypeScript `any` Types 🟡 MEDIUM

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/auth.ts` | 101 | `(user as any).rememberMe` | Define proper user type with rememberMe field |
| `src/app/api/quiz/grade/route.ts` | 28, 42-43 | `learningStyle: any`, `currentMood: any` | Define `LearningStyle` and `Mood` enums/interfaces |
| `src/app/api/student/progress/route.ts` | 141 | `p.taskHistory as any[]` | Define proper TaskHistory interface |
| `src/lib/security/ai-sanitization.ts` | 60, 107 | `error.message` accessed without type check | Use proper error typing |
| `src/lib/agents/orchestrator-llm.ts` | 33, 38 | `require('crypto')` inline require | Use ES6 import at top of file |

### 2.3 Missing Return Types 🟢 LOW

| File | Line | Function | Recommendation |
|------|------|----------|----------------|
| `src/lib/db/drizzle.ts` | 41 | `getDrizzleDb()` | Add explicit return type `: NodePgDatabase<typeof schema>` |
| `src/lib/api/middleware.ts` | 128 | `withAuth` handler | Add return type `Promise<NextResponse>` |
| `src/app/api/socket/route.ts` | 15 | `GET()` | Add return type `Promise<NextResponse>` |

---

## 3. SECURITY REVIEW

### 3.1 SQL Injection Risks 🔴 CRITICAL

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/security/ai-sanitization.ts` | 1 | `@ts-nocheck` disables type checking | Remove and fix all type errors |
| `src/app/api/admin/users/route.ts` | 44 | `ilike(user.email, %${search}%)` - search not validated | Add max length validation (100 chars) and sanitize |
| `src/app/api/admin/users/route.ts` | 48 | `ilike(profile.name, %${search}%)` - search not validated | Add max length validation and sanitize |
| `src/lib/security/ai-sanitization.ts` | 49 | `error.message` - implicit any | Add proper error typing |

### 3.2 XSS Vulnerabilities 🟠 HIGH

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/security/sanitize.ts` | 17-25 | `sanitizeHtml` uses regex-based removal which can be bypassed | Use DOMPurify or similar library |
| `src/lib/security/sanitize.ts` | 56-57 | `sanitizeForDisplay` relies on `escapeHtml` but may miss edge cases | Add comprehensive test cases |
| `src/lib/security/ai-sanitization.ts` | 35 | HTML sanitization alone insufficient for AI contexts | Add additional prompt injection detection |

### 3.3 Missing Auth Checks 🟠 HIGH

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/security/ai-sanitization.ts` | 80 | Uses `NEXTAUTH_SECRET` but no validation that it's not default in dev | Add warning when using default secret |
| `src/app/api/content/[contentId]/route.ts` | 13-67 | No check if student is enrolled in course before viewing content | Add enrollment verification |
| `src/app/api/payments/webhooks/hitpay/route.ts` | 49 | JSON payload cast to `object` without validation | Validate payload structure with Zod |

### 3.4 Data Exposure Risks 🟡 MEDIUM

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/app/api/admin/users/route.ts` | 60-74 | Count query doesn't have LIMIT on subqueries | Add reasonable limits to prevent memory exhaustion |
| `src/app/api/tutor/students/route.ts` | 19-40 | Query may expose students from shared courses without enrollment check | Verify proper authorization |

---

## 4. PERFORMANCE ISSUES

### 4.1 N+1 Query Risks 🟠 HIGH

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/app/api/student/progress/route.ts` | 47-91 | Multiple sequential queries can be batched | Use `Promise.all()` for independent queries |
| `src/app/api/admin/users/route.ts` | 76-118 | Multiple separate queries for counts | Use single aggregation query with JOINs |
| `src/app/api/tutor/students/route.ts` | 19-40 | Relational query with `with:` may cause N+1 | Verify Drizzle's query optimization or use dataloader |

### 4.2 Missing Indexes (Query Performance) 🔴 CRITICAL

Based on query patterns in API routes:

| Table | Missing Index | Query Impact |
|-------|---------------|--------------|
| `CourseLessonProgress` | `(studentId, status)` | Progress dashboard queries |
| `QuizAttempt` | `(studentId, createdAt)` | Recent quiz attempts |
| `Payment` | `(studentId, status, createdAt)` | Student payment history |
| `ContentProgress` | `(contentId, completed)` | Content analytics |
| `FamilyMember` | `(familyAccountId, relation)` | Family lookups |

### 4.3 Memory Leaks 🟡 MEDIUM

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/socket-server-enhanced.ts` | N/A | Event listeners may accumulate | Review socket event cleanup on disconnect |
| `src/lib/cache-manager.ts` | N/A | Cache entries may grow unbounded | Implement LRU eviction policy |

### 4.4 Inefficient Queries 🟡 MEDIUM

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/app/api/payments/create/route.ts` | 111-131 | Loads all pending payments then filters in memory | Add proper WHERE clause for metadata filtering |
| `src/app/api/payments/create/route.ts` | 238-252 | Same pattern - loads all pending payments | Use indexed metadata query or separate lookup table |
| `src/lib/security/rate-limit.ts` | 25 | In-memory store grows without bounds | Implement pruning more aggressively |

---

## 5. TYPE CONSISTENCY ISSUES

### 5.1 Type Mismatches 🟡 MEDIUM

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/db/schema/tables/curriculum.ts` | 346-359 | Deprecated exports use table aliases | Remove deprecated exports after migration |
| `src/lib/db/schema/relations.ts` | Multiple | Some relations reference deprecated table names | Update to new table names |
| `src/lib/auth.ts` | 138-144 | Multiple `as` type assertions | Extend Session type properly in next-auth.d.ts |

### 5.2 Missing Type Exports 🟢 LOW

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `src/lib/db/schema/index.ts` | N/A | No centralized type exports | Export all table types from index |
| `src/lib/api/middleware.ts` | 95-99 | Handler type doesn't enforce return type | Add strict return type constraint |

---

## 6. RECOMMENDATIONS BY PRIORITY

### Immediate Actions (CRITICAL)

1. **Add missing foreign key constraints** to prevent orphaned records
2. **Remove `@ts-nocheck`** from `ai-sanitization.ts` and fix type errors
3. **Add input validation** for search queries in admin routes
4. **Implement enrollment check** for content access

### High Priority

1. Define proper TypeScript interfaces replacing all `any` types
2. Add XSS protection with DOMPurify
3. Implement proper error boundaries for webhook handlers
4. Optimize N+1 queries in progress and admin routes
5. Add missing database indexes for performance

### Medium Priority

1. Standardize error handling across all API routes
2. Implement comprehensive rate limiting for all sensitive endpoints
3. Add database constraint validation in application layer
4. Review and optimize socket event cleanup

### Low Priority

1. Add explicit return types to all functions
2. Remove deprecated schema exports
3. Standardize naming conventions across tables
4. Add comprehensive API documentation

---

## 7. POSITIVE FINDINGS

The codebase also demonstrates many good practices:

- ✅ **Drizzle ORM** used consistently for type-safe queries
- ✅ **Proper authentication middleware** with role checking
- ✅ **CSRF protection** implemented for state-changing routes
- ✅ **Rate limiting** with Redis fallback
- ✅ **Input validation** with Zod schemas
- ✅ **Audit logging** for security events
- ✅ **Foreign key constraints** on most tables (just need to complete)
- ✅ **Indexing strategy** mostly comprehensive
- ✅ **AI input sanitization** with security measures

---

## Appendix: Quick Fix Examples

### Adding Missing Foreign Key

```typescript
// Before
contentId: text('contentId').notNull(),

// After  
contentId: text('contentId')
  .notNull()
  .references(() => contentItem.contentId, { onDelete: 'cascade' }),
```

### Fixing `any` Type

```typescript
// Before
learningStyle: any

// After
interface LearningStyle {
  visual: number
  auditory: number
  kinesthetic: number
  reading: number
}
```

### Adding Input Validation

```typescript
// Before
if (search) {
  conditions.push(ilike(user.email, `%${search}%`))
}

// After
if (search) {
  const validatedSearch = validateTextInput(search, { maxLength: 100 })
  if (!validatedSearch.valid) {
    throw new ValidationError('Invalid search input')
  }
  conditions.push(ilike(user.email, `%${validatedSearch.value}%`))
}
```

---

*Report generated by comprehensive static analysis of the TutorMekimi codebase.*
