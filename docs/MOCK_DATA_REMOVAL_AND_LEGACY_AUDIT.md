# Mock Data Removal & Legacy Audit Report

**Date**: 2026-04-19  
**Commit**: (pending)  
**Scope**: Remove all mock/demo data + audit legacy tables (Clinic, Subject, etc.)

---

## Part 1: Mock/Demo Data Removal — COMPLETE

### Files Deleted (2)

| File | Reason |
|------|--------|
| `src/lib/public/mock-tutors.ts` | `MOCK_TUTORS` array with 3 fake tutor profiles; never imported in production code |
| `src/app/[locale]/actions/generator.ts` | `generateTasksWithAI()` returned mock AI tasks; never imported anywhere |

### Files Modified (12)

#### Video (`daily-provider.ts` + `use-daily-call.ts`)
- **Removed**: `mockMode` flag and all mock room/token creation
- **Behavior change**: Constructor throws if `DAILY_API_KEY` is missing (was silently entering mock mode)
- **`use-daily-call.ts`**: Removed mock URL detection and mock fallbacks; errors now propagate instead of faking a joined state

#### Admin Topology (`useLiveTopology.ts` + `LiveTopologyGlobe.tsx`)
- **Removed**: 20 stable mock users + 10 stable mock sessions with fake names/IPs/subjects
- **Behavior change**: Hook now returns empty `users[]` and `sessions[]` arrays with a TODO for real API integration
- **`LiveTopologyGlobe.tsx`**: Removed `isMock` indicator dots/labels; skip users with null coordinates

#### Geolocation (`ipGeolocation.ts` + `api/admin/geolocation/route.ts` + `useGeolocation.ts`)
- **Removed**: `getRandomMockCoordinates()` and `generateMockCoordinates()` — functions that returned random lat/lon across continents
- **Behavior change**: Private IPs and failed lookups now return `null` instead of fake coordinates
- **API route**: Private IPs return HTTP 400; failed external lookups return HTTP 404/503
- **Test updated**: `route.test.ts` now expects 400 for private IPs

#### Student Pages
- **`student/subjects/[subjectCode]/page.tsx`**: Removed `getMockSubjectData()` fallback that injected fake progress, XP, streaks, and lesson data on API failure
- **`student/tutors/page.tsx`**: Removed `dataSource === 'mock'` UI badge and state tracking
- **`u/[username]/page.tsx`**: Removed `source?: 'db' | 'mock'` type field (unused)

#### Tutor Reports
- **`tutor/reports/page.tsx`**: Renamed `mockData` → `reportData` (it was already an empty real data structure)

### Verification

- **TypeScript**: Passes (only pre-existing Sentry metrics error)
- **Tests**: 65/65 test files pass, 261/261 tests pass
- **Net lines removed**: ~622 lines

---

## Part 2: Legacy Subject Table — VERIFIED ABSENT

### Finding
There is **no `Subject` table** in the current database schema or in any active migration.

### Where "subject" still appears (legitimate uses only)

| Location | Context | Status |
|----------|---------|--------|
| `src/lib/db/schema/tables/auth.ts:139` | `certificateSubjects` text field on `Profile` | Active feature |
| `src/lib/db/schema/tables/auth.ts:112` | `subjectsOfInterest` array on `Profile` | Active feature |
| `src/lib/db/schema/tables/content.ts:43` | `ContentItem_subject_idx` index | Active index |
| `src/lib/ai/subjects/` | AI tutoring modules per subject (english, math, physics, chemistry) | Active feature |
| UI components | Labels like "Filter by subject" | Active copy |

### Historical note
Migration `0019_rename_curriculum_to_course.sql` dropped `subject` columns from `Course` and `LiveSession`, renaming them to `category`. Migration `0032_loose_jubilee.sql` and `0037_cleanup_deprecated_schema.sql` confirmed the drops.

**Action required**: None.

---

## Part 3: Legacy Clinic & Dead Code Audit — CATALOG

### 3.1 Clinic Table — ALREADY DROPPED

The `Clinic` and `ClinicBooking` tables were dropped in migration `0021_remove_legacy_tables.sql` and again in `0032_loose_jubilee.sql`. They do **not** appear in the latest Drizzle snapshot (`0034_snapshot.json`).

### 3.2 Legacy API Routes Returning `legacyRemoved()`

These 16 API route files still exist but return HTTP 410 (Gone) for all methods:

| Route File | Feature | Called By Frontend? |
|------------|---------|---------------------|
| `api/classes/route.ts` | Clinics list | ✅ `student/dashboard`, `student/dashboard-details`, `DashboardCalendar` |
| `api/classes/[id]/route.ts` | Clinic CRUD | ❌ No direct calls found |
| `api/achievements/route.ts` | Gamification achievements | ✅ `components/achievements.tsx` |
| `api/study-groups/route.ts` | Study groups | ✅ `student/study-groups/page.tsx`, `StudyGroups.tsx` |
| `api/student/assignments/route.ts` | Generated tasks | ✅ `student/assignments/page.tsx`, `student/work/page.tsx`, `PendingAssignmentsCard` |
| `api/student/assignments/[taskId]/route.ts` | Task detail | ✅ `student/assignments/page.tsx`, `student/work/page.tsx` |
| `api/student/assignments/[taskId]/submit/route.ts` | Task submission | ✅ `student/assignments/page.tsx`, `student/work/page.tsx` |
| `api/student/scores/route.ts` | Score reports | ❌ No direct calls found |
| `api/tasks/generate/route.ts` | AI task generation | ❌ No direct calls found |
| `api/tutor/courses/[id]/tasks/route.ts` | Tutor task management | ❌ No direct calls found |
| `api/tutor/courses/[id]/tasks/[taskId]/route.ts` | Task detail | ❌ No direct calls found |
| `api/tutor/courses/[id]/tasks/[taskId]/assign/route.ts` | Task assignment | ❌ No direct calls found |
| `api/tutor/courses/[id]/tasks/[taskId]/publish/route.ts` | Task publish | ❌ No direct calls found |
| `api/tutor/courses/[id]/tasks/[taskId]/analytics/route.ts` | Task analytics | ❌ No direct calls found |
| `api/tutor/courses/[id]/tasks/analytics/route.ts` | Bulk analytics | ❌ No direct calls found |
| `api/tutor/courses/[id]/tasks/publish-from-builder/route.ts` | Builder publish | ❌ No direct calls found |
| `api/parent/students/[studentId]/assignments/route.ts` | Parent assignments | ❌ No direct calls found |

**Frontend pages that call legacy APIs** (will receive 410 errors in production):
- `student/dashboard/page.tsx` — calls `/api/classes?limit=3`
- `student/dashboard-details/page.tsx` — calls `/api/classes`
- `student/dashboard/components/DashboardCalendar.tsx` — calls `/api/classes?myBookings=true`
- `student/assignments/page.tsx` — calls `/api/student/assignments`
- `student/work/page.tsx` — calls `/api/student/assignments`
- `student/study-groups/page.tsx` — calls `/api/study-groups`
- `components/achievements.tsx` — calls `/api/achievements`
- `components/assignments/FileUploadZone.tsx` — calls `/api/student/assignments/{id}/upload` (this one is **not** legacy)

### 3.3 Potentially Unused / Low-Usage Schema Tables

Tables in the latest snapshot (`0034`) with very few code references (possible dead weight):

| Table | References | Assessment |
|-------|------------|------------|
| `BreakoutRoomAssignment` | 0 | May be dead — check if breakout rooms are still used |
| `CourseCatalog` | 0 | Deprecated per April 10 audit; confirm safe to drop |
| `AdminRole` | 1 | Minimal usage; verify if needed |
| `NotificationPreference` | 1 | Minimal usage |
| `SessionEngagementSummary` | 1 | Minimal usage |
| `BreakoutSession` | 2 | Low usage |
| `BudgetAlert` | 2 | Low usage |
| `BuilderTaskFile` | 2 | Low usage |
| `EmergencyContact` | 2 | Low usage |
| `FamilyNotification` | 2 | Low usage |
| `LlmProvider` | 2 | Low usage |
| `ParentActivityLog` | 2 | Low usage |
| `ParentPaymentAuthorization` | 2 | Low usage |
| `ParentSpendingLimit` | 2 | Low usage |
| `PostSessionReport` | 2 | Low usage |
| `SessionBookmark` | 2 | Low usage |
| `StudentLearningState` | 2 | Low usage |
| `StudentMemoryProfile` | 2 | Low usage |
| `StudentSessionInsight` | 2 | Low usage |
| `VerificationToken` | 2 | Low usage (NextAuth internal) |

> **Note**: "Low references" does not automatically mean "safe to drop." Some tables are used implicitly through Drizzle relations or may be write-heavy but read-light.

### 3.4 Other Legacy References Found

| File | Reference | Status |
|------|-----------|--------|
| `api/payments/create/route.ts:335` | "Clinic bookings have been removed" | Active guard clause |
| `api/payments/refund/route.ts:52` | "Clinic bookings have been removed" | Active guard clause |
| `api/payments/webhooks/airwallex/route.ts:166` | "Clinics removed: no booking notifications" | Comment only |
| `api/payments/webhooks/hitpay/route.ts:168` | "Clinics removed: no booking notifications" | Comment only |
| `api/tutor/revenue/route.ts` | Legacy clinic revenue logic | Needs review |
| `api/parent/dashboard/route.ts` | Legacy clinic dashboard | Needs review |
| `api/parent/progress/route.ts` | Legacy clinic progress | Needs review |
| `api/tutor/students/route.ts:3` | Comment references "booked tutor's clinics" | Stale comment |
| `api/user/gdpr/export/route.ts:49` | `clinicBookings: []` in GDPR export | Empty placeholder |

---

## Recommendations

### Immediate (this session)
1. ✅ Mock data removal — complete
2. ✅ Subject table audit — no action needed

### Short-term (next sprint)
3. **Remove or hide legacy frontend pages** that call 410 APIs:
   - `student/assignments/page.tsx`
   - `student/study-groups/page.tsx`
   - `student/dashboard` components referencing `/api/classes`
   - `components/achievements.tsx`
4. **Delete legacy API routes** that are not called by any frontend (see 3.2 above for the 10 uncalled routes)
5. **Update stale comments** in `api/tutor/students/route.ts` and webhook routes

### Medium-term (next month)
6. **Audit low-reference tables** (section 3.3) for safe removal
7. **Drop `CourseCatalog`** if confirmed unused for >30 days
8. **Clean up GDPR export** — remove `clinicBookings` placeholder

---

## Verification Commands

```bash
# Check for any remaining mock functions
grep -rn "getRandomMockCoordinates\|generateMockCoordinates\|MOCK_TUTORS\|mockMode\|mock.daily" src/

# Check for remaining legacyRemoved routes
grep -rn "legacyRemoved" src/app/api/ | grep "route.ts:"

# Check frontend pages still calling legacy APIs
grep -rn "/api/classes\|/api/achievements\|/api/study-groups\|/api/student/assignments\|/api/student/scores\|/api/tasks/generate" src/app/[locale]/ src/components/ --include="*.tsx"

# Check for Subject table (should return nothing)
grep -rn "export const.*=.*pgTable.*Subject" src/lib/db/schema/
```

---

**Related docs**: `DEPRECATED_ITEMS_AUDIT.md`, `DEPRECATED_ITEMS_CLEANUP_SUMMARY.md`, `AGENTS.md`
