# Detailed Implementation Instructions for Code Assistant

> **Context:** This document contains verified, actionable instructions for a second code assistant to implement architecture, performance, and security improvements in the TutorMe/Solocorn codebase. Every claim below was verified against the actual source code.

---

## Summary of Verified Findings vs. Original Observations

| Original Claim | Verified Status | Notes |
|---|---|---|
| Socket server monolith (>3,400 lines) | ✅ **CONFIRMED** | `socket-server.ts` (1,939 lines) + `socket-server-enhanced.ts` (1,332 lines) |
| Prisma traces in Dockerfiles | ❌ **FALSE** | No Prisma in Dockerfiles. Traces only in setup scripts, docs, tsconfig, eslint config |
| Mock data: "Upcoming Clinics" | ❌ **FALSE** | Doesn't exist in active code. Was renamed to `UpcomingClasses` |
| Mock data: "Study Groups" | ⚠️ **PARTIAL** | Component exists but receives props. Empty array `studyGroups: []` in `student/dashboard/page.tsx` |
| Missing web vitals endpoint | ❌ **FALSE** | Route EXISTS at `src/app/api/analytics/web-vitals/route.ts` |
| CORS `origin: '*'` | ❌ **FALSE** | CORS is properly configured with env-based origins. No wildcard fallback in production |
| Hydration mismatches | ✅ **CONFIRMED** | 8 files use `useSearchParams` without `<Suspense>` |
| Unbounded socket state | ✅ **CONFIRMED** | Multiple Maps in `socket-state.ts` and `socket-server.ts` with no cleanup |
| Socket events without role checks | ✅ **CONFIRMED** | 16+ events in `socket-server.ts` lack role gates |
| AI rate limiting missing | ⚠️ **PARTIAL** | `lcwb_ai_region_request` HAS rate limiting (10/min) but NO role check |

---

## A. Architecture & Code Quality

### A1. Socket Server Refactoring (HIGH PRIORITY)

**Problem:** All socket logic lives in only two massive files:
- `src/lib/socket-server.ts` — 1,939 lines (whiteboard, breakout, polls, feedback)
- `src/lib/socket-server-enhanced.ts` — 1,332 lines (bootstrap, auth, room join, inline handlers)

The enhanced server re-uses handlers from the monolith:
```typescript
// socket-server-enhanced.ts:581-585
registerLiveClassWhiteboardHandlers(io, socket)
initFeedbackHandlers(io, socket)
```

**Goal:** Split by domain into separate files under `src/lib/socket/handlers/`. Keep the registration function signatures identical so `socket-server-enhanced.ts` doesn't change its wiring.

**Files to create:**

```
src/lib/socket/handlers/
├── whiteboard.ts       // Move registerLiveClassWhiteboardHandlers (socket-server.ts:186-957)
├── breakout.ts         // Move initBreakoutHandlers (socket-server.ts:973-1309)
├── polls.ts            // Move initPollHandlers (socket-server.ts:1360-1548)
├── feedback.ts         // Move initFeedbackHandlers (socket-server.ts:1661-1939)
└── index.ts            // Re-export all registration functions
```

**Files to modify:**
- `src/lib/socket-server.ts` — Strip out the 4 handler functions. Keep only shared utilities/exports if any. Import and re-export the handlers from `./handlers` for backward compatibility.
- `src/lib/socket-server-enhanced.ts` — Update imports to use `src/lib/socket/handlers/` paths.
- `src/lib/socket/index.ts` — Export the new handler modules.

**Important:** The in-memory Maps used by handlers (`roomWhiteboards`, `studentWhiteboards`, `breakoutRooms`, `activePolls`, `deployedTasks`, etc.) currently live in `socket-server.ts` as module-level variables. Move these into `src/lib/socket/socket-state.ts` (which already exists) and import them from there in each handler file. This is the critical dependency that makes the split possible.

**Handler function signatures to preserve:**
```typescript
export function registerLiveClassWhiteboardHandlers(io: SocketIOServer, socket: Socket): void
export function initBreakoutHandlers(io: SocketIOServer, socket: Socket): void
export function initPollHandlers(io: SocketIOServer, socket: Socket): void
export function initFeedbackHandlers(io: SocketIOServer, socket: Socket): void
```

---

### A2. Purge Legacy Prisma Artifacts (MEDIUM PRIORITY)

**Problem:** Prisma was migrated to Drizzle but references remain in config files and scripts. This causes confusion.

**Files to modify:**

| File | Action | Details |
|---|---|---|
| `tutorme-app/tsconfig.json` | Remove `"prisma/seed.ts"` from `include` array | Line 41 |
| `tutorme-app/eslint.config.mjs` | Remove `'prisma/migrations/**'` from `ignores` | Line 20 |
| `tutorme-app/eslint.config.mjs` | Remove `'prisma/**/*.{js,ts}'` from `files` array | Line 80 |
| `tutorme-app/tutorme-start.sh` | Remove `npx prisma generate` call | Line 156 |
| `tutorme-app/tutorme-start.sh` | Update comments mentioning Prisma | Lines 41, 151 |
| `scripts/setup.sh` | Delete lines 114–688 (legacy Prisma setup block) | Or replace with Drizzle equivalents |
| `scripts/setup.bat` | Delete lines 77–238 (Windows Prisma setup) | Or replace with Drizzle equivalents |
| `scripts/deploy-to-ec2.sh` | Replace `npx prisma migrate deploy` with Drizzle migrate | Line 80 |

**Do NOT modify:**
- `package-lock.json` (transitive deps via Sentry — harmless)
- `AGENTS.md`, `QUICKSTART.md`, `CODEBASE_SCAN_REPORT.md`, etc. (documentation references are acceptable historical context)
- Any `*.md` plan documents (they are archived planning docs)

---

### A3. Remove Mock Data from Tutor Dashboard (MEDIUM PRIORITY)

**Problem:** Several tutor dashboard components contain hardcoded mock data that should be removed or made conditional on development mode.

**Files to modify:**

#### `src/app/[locale]/tutor/dashboard/components/UpcomingClassesCard.tsx` (lines 319–324)
```typescript
// REMOVE this mock injection:
const classesWithSessions = classes.map((cls, index) => ({
  ...cls,
  sessionNo: cls.sessionNo || (index % 4) + 1,
  totalSessions: cls.totalSessions || 12,
}))
```
Replace with: just use `classes` directly, or if `sessionNo`/`totalSessions` are needed for rendering, compute them from actual liveSession data via an API call.

#### `src/app/[locale]/tutor/dashboard/components/ModernHeroSection.tsx` (lines 90–125)
```typescript
// REMOVE the entire generateClassEvents() function
// It creates fake Math/Physics/Chemistry events based on day of week
```
Replace with: Fetch actual upcoming classes from `/api/tutor/classes` or similar. If no classes exist, show an empty state instead of fake data.

#### `src/app/[locale]/tutor/dashboard/components/CommunicationCenter.tsx` (lines 211–250)
```typescript
// REMOVE the "REAL-TIME SIMULATION (WebSocket mock)" block
// It creates fake typing indicators with names ['Alice', 'Bob', 'Carol', ...]
```
Replace with: Only show typing indicators when real WebSocket data arrives.

#### `src/app/[locale]/tutor/dashboard/components/CommunicationCenter.tsx` (lines 401–430)
```typescript
// REMOVE the mock thread messages block
// actions.setThreadMessages([message, { id: 'reply-1', ... }, { id: 'reply-2', ... }])
```
Replace with: Load thread messages from the actual API.

#### `src/app/[locale]/student/dashboard/page.tsx` (lines 88, 91)
```typescript
// These empty arrays are fine as placeholders, but wire them up:
dailyQuests: [],   // line 88 — either implement the feature or remove the card
studyGroups: [],   // line 91 — either implement the feature or remove the card
```
Decision needed: If these features are not planned, remove the cards from the dashboard JSX. If they are planned, add a TODO comment linking to the implementation ticket.

---

## B. Performance & Scalability

### B1. Fix Hydration Mismatches (HIGH PRIORITY)

**Problem:** 8 files use `useSearchParams` without being wrapped in `<Suspense>`, which causes React hydration error #310.

**Files to wrap in `<Suspense>`:**

| File | Line with `useSearchParams` | Action |
|---|---|---|
| `src/components/tutor/MyPageTabsSection.tsx` | 62 | Wrap component return in `<Suspense fallback={null}>` or extract the `useSearchParams` usage into a child client component |
| `src/app/[locale]/tutor/insights/page.tsx` | 40 | Wrap in `<Suspense>` |
| `src/app/[locale]/tutor/insights/layout.tsx` | 58 | Wrap in `<Suspense>` |
| `src/app/[locale]/payment/page.tsx` | 30 | Wrap in `<Suspense>` |
| `src/app/[locale]/student/review/[contentId]/page.tsx` | 44 | Wrap in `<Suspense>` |
| `src/app/[locale]/tutor/courses/components/CourseBuilderInsightsRoute.tsx` | 108 | Wrap in `<Suspense>` |
| `src/app/[locale]/student/courses/page.tsx` | 92 | Wrap in `<Suspense>` |
| `src/app/[locale]/student/subjects/[subjectCode]/courses/[courseId]/page.tsx` | 29 | Wrap in `<Suspense>` |

**Pattern to apply:**
```typescript
// Before (in a Server Component or top-level Client Component):
const searchParams = useSearchParams() // ← causes hydration mismatch

// After: Extract to a child Client Component
function SearchParamsReader() {
  const searchParams = useSearchParams()
  // ... use it here
}

// Parent:
<Suspense fallback={null}>
  <SearchParamsReader />
</Suspense>
```

**Additional issue — Provider Duplication:**

`NextIntlClientProvider` and `SessionProvider` are mounted TWICE:
1. Root: `src/app/layout.tsx` lines 62–65 → `<Providers>`
2. Locale: `src/app/[locale]/layout.tsx` lines 34–42 → `<NextIntlClientProvider>` + `<AuthProvider>`

**Fix:** Remove the duplicate providers from `src/app/[locale]/layout.tsx`. The root `Providers` component already wraps the entire tree. Keep only locale-specific logic (e.g., `html lang={locale}`) in `[locale]/layout.tsx`.

---

### B2. Implement Socket State Cleanup (HIGH PRIORITY)

**Problem:** Multiple in-memory Maps in `socket-state.ts` and `socket-server.ts` grow forever with no cleanup.

**Maps needing cleanup in `src/lib/socket/socket-state.ts`:**

| Map | Line | Suggested Cleanup Strategy |
|---|---|---|
| `whiteboardOpMetrics` | 126 | Clear entries older than 24h in `cleanupInactiveWhiteboards()` |
| `whiteboardSelectionPresence` | 127 | Already cleared on disconnect; add TTL eviction |
| `lcwbAiRegionRateLimit` | 131 | Clear entries where `resetAt` has passed |
| `whiteboardOpSeenIds` | 132 | Clear per-room entries when room is cleaned up |
| `whiteboardOpSeq` | 141 | Clear per-room entries when room is cleaned up |
| `whiteboardBranches` | 142 | Clear when parent whiteboard is deleted |
| `liveClassModeration` | 144 | Clear when room is cleaned up |
| `mathWhiteboardRooms` | 383 | Add cleanup interval (similar to `cleanupInactiveWhiteboards`) |
| `mathSyncMetrics` | 384 | Clear entries older than 24h |
| `mainRoomBreakouts` | 468 | Delete when `closeBreakoutRoom()` is called |
| `activePolls` | 471 | Delete polls when `poll:end` or socket disconnect |
| `sessionPolls` | 472 | Delete when session ends |

**Maps needing cleanup in `src/lib/socket-server.ts`:**

| Map | Line | Suggested Cleanup Strategy |
|---|---|---|
| `deployedTasks` | 1620 | Delete when `feedback_session_end` fires or after 24h TTL |
| `feedbackPolls` | 1635 | Delete when poll is closed or session ends |
| `feedbackQuestions` | 1649 | Delete when session ends |

**Implementation approach:**
Add a unified `cleanupStaleSocketState()` function in `socket-state.ts` that runs on the existing 5-minute interval alongside `cleanupInactiveClassRooms` and `cleanupInactiveWhiteboards`. For each Map, implement a custom eviction function.

Example pattern for TTL-based cleanup:
```typescript
function cleanupRateLimitMap() {
  const now = Date.now()
  for (const [key, state] of lcwbAiRegionRateLimit.entries()) {
    if (now >= state.resetAt) {
      lcwbAiRegionRateLimit.delete(key)
    }
  }
}
```

---

### B3. Cap Whiteboard Stroke Arrays (MEDIUM PRIORITY)

**Problem:** Whiteboard stroke arrays grow indefinitely.

**Locations:**
- `src/lib/socket-server.ts:227` — `roomWB.strokes.push(...)`
- `src/lib/socket-server.ts:297` — `studentWB.strokes.push(...)`
- `src/lib/socket-server.ts:350` — `studentWB.strokes = result.next`
- `src/lib/socket-server.ts:405` — `roomWB.strokes = result.next`

**Fix:** Add a maximum stroke cap. After pushing/applying strokes, truncate the array:
```typescript
const MAX_STROKES = 5000
if (roomWB.strokes.length > MAX_STROKES) {
  roomWB.strokes = roomWB.strokes.slice(-MAX_STROKES)
}
```
Define `MAX_STROKES` in `src/lib/socket/socket-constants.ts` alongside existing constants.

---

### B4. Web Vitals Endpoint — ALREADY EXISTS (NO ACTION NEEDED)

The endpoint `src/app/api/analytics/web-vitals/route.ts` exists and handles POST + OPTIONS. The client posts via `src/app/components/PerformanceProviders.tsx`. The TODO on line 46 ("Store metrics in database") is optional — the current in-memory tracking is acceptable for now. **Skip this item.**

---

## C. Security & Reliability

### C1. Add Role Checks to Socket Events (HIGH PRIORITY)

**Problem:** Many socket events in `src/lib/socket-server.ts` accept any authenticated socket without verifying the role.

**Events WITHOUT role checks (security-relevant):**

| Event | Line | Required Role | Why |
|---|---|---|---|
| `lcwb_sync_request` | 646 | `student` or `tutor` | Only room participants should sync |
| `lcwb_replay_request` | 655 | `student` or `tutor` | Only room participants should replay |
| `lcwb_branch_create` | 706 | `tutor` | Branches are tutor-controlled |
| `lcwb_branch_switch` | 728 | `student` or `tutor` | Only room participants |
| `lcwb_branch_delete` | 754 | `tutor` | Branches are tutor-controlled |
| `lcwb_snapshot_capture` | 865 | `tutor` | Snapshots are tutor-controlled |
| `lcwb_snapshot_request` | 877 | `student` or `tutor` | Only room participants |
| `lcwb_ai_region_request` | 831 | `tutor` | LLM calls cost money; only tutors should trigger |
| `feedback_chat_message` | 1860 | `student` or `tutor` | Must verify sender; currently uses `io.emit` |

**Pattern to add:**
```typescript
// At the top of each handler:
if (socket.data.role !== 'tutor') {
  socket.emit('error', { code: 'FORBIDDEN', message: 'Tutor role required' })
  return
}
```

**For `feedback_chat_message` (line 1860):**
Currently broadcasts to ALL sockets:
```typescript
io.emit('feedback_chat_message', { ...data, senderId: socket.data.userId })
```
Change to emit only to the relevant room/session namespace, and validate that `socket.data.userId` matches the claimed sender.

---

### C2. Remove Mutable Role Overwrite (MEDIUM PRIORITY)

**Problem:** These events unconditionally overwrite `socket.data.role`:
- `student_feedback_join` (socket-server.ts:1666) — sets role to `student`
- `tutor_insights_join` (socket-server.ts:1673) — sets role to `tutor`

**Fix:** Do NOT overwrite `socket.data.role`. The role was already set during JWT authentication in `socket-server-enhanced.ts:410-437`. If you need to validate the room type, check it separately without mutating `socket.data`:
```typescript
// Instead of:
socket.data.role = 'student'

// Do:
const expectedRole = 'student'
if (socket.data.role !== expectedRole) {
  socket.emit('error', { code: 'WRONG_ROLE', message: `Expected ${expectedRole}` })
  return
}
```

---

### C3. Consolidate socketAuthMiddleware (MEDIUM PRIORITY)

**Problem:** Two implementations exist:
- `socket-server-enhanced.ts:410-437` — rejects bad tokens (the one actually used)
- `socket/socket-auth.ts:31-46` — does NOT reject bad tokens (exported but unused)

**Fix:**
1. Delete the unused `socketAuthMiddleware` from `socket/socket-auth.ts` (lines 31–46).
2. Move the enhanced server's version into `socket/socket-auth.ts` as the canonical export.
3. Update `socket-server-enhanced.ts` to import from `socket/socket-auth.ts`.
4. Update `socket-auth.ts` (the legacy stub at `src/lib/socket-auth.ts`) to also delegate to the canonical version.

---

### C4. AI Rate Limiting — ALREADY EXISTS (ENHANCE ONLY)

`lcwb_ai_region_request` already has rate limiting (10 requests/minute per room+user) in `socket-server.ts:830-862`. The gap is the missing **role check** (see C1 above). No additional rate limiting work is needed. **Skip this item** beyond adding the role gate.

---

### C5. CORS — ALREADY SAFE (NO ACTION NEEDED)

The CORS configuration does NOT use `origin: '*'`. It reads from `SOCKET_CORS_ORIGIN` env var with safe localhost fallbacks:
```typescript
origin: process.env.SOCKET_CORS_ORIGIN?.split(',') || [
  'http://localhost:3003',
  'http://localhost:3000',
]
```
The helper `getSocketCorsOrigin()` in `socket/socket-auth.ts` exists but is unused. You can optionally delete it as cleanup, but it's not a security issue. **Skip this item** unless doing general cleanup.

---

## Appendix: Files That Are Already Clean (Do Not Touch)

| File / Area | Status |
|---|---|
| `src/app/api/analytics/web-vitals/route.ts` | ✅ Exists and works |
| Socket CORS config | ✅ Safe, no wildcard |
| `lcwb_ai_region_request` rate limit | ✅ Already at 10/min |
| `join_class` in enhanced server | ✅ Has DB-verified role check |
| `poll:create`, `poll:start`, `poll:end`, `poll:delete` | ✅ Require `tutor` role |
| `task:deploy` | ✅ Requires `tutor` role |
| `insight:send` | ✅ Requires `tutor` role |
| Dockerfiles | ✅ No Prisma references |
| `package.json` dependencies | ✅ No Prisma packages |
| "Upcoming Clinics" mock | ✅ Already removed from active code |

---

## Suggested Implementation Order

1. **B1** — Hydration mismatches (high user impact, low risk)
2. **C3** — Consolidate socketAuthMiddleware (security foundation)
3. **C1** + **C2** — Add role checks + remove mutable role (security)
4. **B2** + **B3** — Socket state cleanup + stroke caps (performance/stability)
5. **A1** — Socket server file split (maintainability)
6. **A2** — Prisma artifact cleanup (developer experience)
7. **A3** — Mock data removal (polish)
