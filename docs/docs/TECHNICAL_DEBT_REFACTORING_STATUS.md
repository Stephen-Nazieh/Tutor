# Section 5 – Technical Debt & Refactoring: Implementation Status

This document records whether **section 5** of FinalThings.md (Technical Debt & Refactoring) has been fully implemented. It covers 5.1, 5.2, and 5.3.

---

## Summary

| Subsection | Status | Notes |
|------------|--------|--------|
| **5.1 API Route Refactoring** | **Done** | `withAuth` and `withCsrf` applied to all state-changing routes in the listed API groups. |
| **5.2 Component Refactoring** | Partially done | Student dashboard done; Tutor dashboard modularized (UpcomingClasses, StudentsNeedingAttention, AIInsights, QuickActions); AI Chat message handlers extracted to `useAIChat`; EnhancedWhiteboard not reduced to 300–400 lines. |
| **5.3 Database Optimizations** | Done | Connection pooling, dataloader, caching, read replicas in place. |

**Overall:** 5.1 and 5.3 are complete. 5.2 is partially complete (EnhancedWhiteboard refactor outstanding).

---

## 5.1 API Route Refactoring

**Requirement:** Apply new middleware pattern (withAuth, and withCsrf for state-changing requests) to:

- `/api/student/**` (8 routes)
- `/api/curriculum/**` (6 routes)
- `/api/content/**` (4 routes)
- `/api/quiz/**` (5 routes)
- `/api/ai-tutor/**` (7 routes)
- `/api/class/**` (5 routes)
- `/api/gamification/**` (6 routes)
- `/api/analytics/**` (4 routes)
- `/api/reports/**` (2 routes)

### What’s done

- **withAuth:** All route files in these groups use `withAuth` from `@/lib/api/middleware`.
- **withCsrf:** All POST/PUT/PATCH/DELETE handlers in the listed groups now use `withCsrf(withAuth(...))`. Affected routes include: student (enroll, unenroll), content (watch-events, quiz-skip, upload init/complete), curriculum (session, messages, lesson route, enroll, chat POST), quiz (grade, generate, attempt), ai-tutor (usage POST, subscription POST, enroll, chat), class (join, breakout, rooms POST, rooms/[id]/join), gamification (quests POST, missions POST, daily-login POST, route POST/PUT), and payments refund.

### Client requirement

- For any state-changing request (POST/PUT/PATCH/DELETE) to these endpoints, the client must send the CSRF token in the `X-CSRF-Token` header. Obtain the token via GET `/api/csrf`. The learn page and other flows that POST to progress/watch-events already do this.

---

## 5.2 Component Refactoring

### EnhancedWhiteboard.tsx (target: 1,351 → 300–400 lines)

- **Status:** Not done.
- **Current:** `src/components/class/enhanced-whiteboard.tsx` is **~1,436 lines** (as of audit).
- **Required:** Reduce to 300–400 lines by:
  - Composing extracted hooks
  - Using shared UI components
  - Separating canvas renderer into its own module

### Student Dashboard – break into smaller components

- **Status:** Done.
- **Current:** `src/app/student/dashboard/` uses a main `page.tsx` and a `components/` folder with: `ContinueLearning`, `StatsOverview`, `SkillRadar`, `StudyGroups`, `UpcomingClasses`, plus `components/index.ts`. The dashboard is already split into smaller components.

### Tutor Dashboard – modularize clinic controls

- **Status:** Done.
- **Current:** `src/app/tutor/dashboard/` now uses `UpcomingClassesCard`, `StudentsNeedingAttentionCard`, `AIInsightsCard`, and `QuickActionsCard` in addition to `CreateClassDialog` and `StatsCards`. The main page composes these components; class/clinic entry is via “Enter Room” in UpcomingClassesCard.

### AI Chat Widget – extract message handlers

- **Status:** Done.
- **Current:** `src/components/ai-chat/use-ai-chat.ts` provides `useAIChat(context)` with `messages`, `input`, `setInput`, `isLoading`, `sendMessage`, `handleKeyPress`. The widget in `index.tsx` uses the hook and renders `MessageBubble` and `LoadingBubble` subcomponents.

---

## 5.3 Database Optimizations

**Status:** Done (as in FinalThings.md).

- Connection pooling (PgBouncer, port 5433) configured for 100+ concurrent users.
- Query optimization: batch loaders in `src/lib/db/dataloader.ts`, optimized queries in `src/lib/db/queries.ts`.
- Caching layer: Redis with in-memory fallback, query result caching with TTL.
- Read replicas: infrastructure ready via `DATABASE_READ_REPLICA_URL`.

---

## Recommendations to complete Section 5

1. **5.2 – EnhancedWhiteboard (remaining)**  
   - Reduce `src/components/class/enhanced-whiteboard.tsx` from ~1,436 lines to 300–400 by:  
     - Extracting types to `whiteboard-types.ts`.  
     - Extracting draw helpers (e.g. `drawBackgroundPattern`, `drawStroke`, `drawShape`, `drawTextElement`) to `whiteboard-renderer.ts`.  
     - Composing existing `useWhiteboardPages` (or similar) for page state.  
     - Extracting toolbar and canvas UI into subcomponents.
