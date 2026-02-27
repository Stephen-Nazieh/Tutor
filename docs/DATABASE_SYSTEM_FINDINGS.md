# Database System Findings

Summary of the TutorMe database layer: architecture, migration status, and recommendations.

---

## 1. Architecture Overview

### 1.1 Dual stack (Prisma + Drizzle)

The app uses two database access layers in parallel:

| Layer | Entry point | Purpose |
|-------|-------------|---------|
| **Prisma** | `src/lib/db/index.ts` → `db` (and `prisma`) | Legacy; still used by most API routes and several libs. Uses `DATABASE_URL` and `DIRECT_URL`. |
| **Drizzle** | `src/lib/db/drizzle.ts` → `drizzleDb` | New layer; used by auth, core queries, dataloader, and an increasing set of libs and routes. Uses `DATABASE_POOL_URL` \|\| `DIRECT_URL` \|\| `DATABASE_URL`. |

- **Cache**: Redis-backed cache lives in `src/lib/db/index.ts` and is used by both (e.g. `cache.getOrSet`). Drizzle code that needs cache imports `cache` from `@/lib/db`.
- **Schema source of truth**: Prisma (`prisma/schema.prisma`). Drizzle schema in `src/lib/db/schema/` (tables, enums, relations, next-auth, index) is derived/kept in sync with Prisma.

### 1.2 Connection topology

- **PostgreSQL**: Direct (e.g. port 5432) for migrations and Drizzle Studio; pooled via PgBouncer (e.g. port 5433) for the app when using docker-compose.
- **Redis**: Used for caching and session/real-time state (port 6379).
- **Env**: `DIRECT_URL` = direct Postgres (Studio, migrations); `DATABASE_URL` = main app URL (often via PgBouncer). With docker-compose, app typically uses 5433, Studio uses 5432.

---

## 2. Usage Counts (as of review)

- **~155 files** import from `@/lib/db` (Prisma `db` / `prisma` / `cache`).
- **~55 files** use `drizzleDb` or `@/lib/db/drizzle` (including schema, queries, and libs that have been migrated).

So most of the codebase still talks to the DB through Prisma; the rest through Drizzle.

---

## 3. What Uses Drizzle

- **Auth**: `lib/auth.ts`, `api/auth/register/route.ts`, NextAuth adapters (schema in `schema/next-auth.ts`).
- **Core DB**: `lib/db/queries.ts`, `lib/db/dataloader.ts`, `lib/db/monitor.ts`.
- **Features**: enrollment, gamification (service, leaderboard, badges, triggers, worlds, daily-quests, activity-log), notifications (notify), parent-helpers, chat summary, feedback workflow.
- **API routes**: health, gamification dashboard, parent (dashboard, students, financial, messages, notifications, payments, progress, courses, assignments, ai-tutor), tutor (public-profile, stats, courses, enrollments, payouts, revenue, quizzes, classes, students), onboarding, study-groups, progress, curriculums (list, catalog), notifications, and others that were explicitly migrated.

---

## 4. What Still Uses Prisma

- **Libs**: `lesson-controller.ts`, `task-generator.ts`, `whiteboard/history.ts`, `performance/student-analytics.ts`, `performance/performance-monitoring.ts`, `reports/engagement-analytics.ts`, `commission/platform-revenue.ts`, `monitoring/compliance-audit.ts`, `security` (audit, payment-security, security-audit, api-key, pipl-compliance), `admin` (auth; feature-flags already on Drizzle), `financial/parent-financial-service.ts`, and others not yet migrated.
- **API routes**: Most of the remaining ~100+ route files (curriculum, content, class, tutor AI-assistant, payments, admin, student assignments/quizzes/content, whiteboards, polls, conversations, etc.).
- **Actions**: e.g. `app/actions/library.ts`, `app/[locale]/actions/library.ts`.
- **Scripts**: e.g. `scripts/seed-gamification.ts`, `scripts/generate-missions.ts`, `scripts/seed-admin.ts`.
- **Tests**: Some integration tests still use Prisma.

---

## 5. Schema and Migrations

- **Prisma**: 100+ models in `prisma/schema.prisma`; migrations in `prisma/migrations/`. Prisma is the source of truth for the DB shape.
- **Drizzle**: Schema in `src/lib/db/schema/`: `tables.ts`, `enums.ts`, `relations.ts`, `next-auth.ts`, `index.ts`. Intended to stay aligned with Prisma until migration is complete.
- **Migrations**: Today, schema changes are done via Prisma; Drizzle schema is updated to match. Post-migration, Drizzle would become the single migration path.

---

## 6. Infrastructure (docker-compose)

- **db**: Postgres 16, `tutorme` user, `tutorme` DB, port 5432, tuned for connections and WAL.
- **pgbouncer**: Transaction pooling, ports 5433 (host) → 6432 (container), depends on `db`, uses `tutorme` user.
- **redis**: Cache and real-time state.

**Issue**: The `db` service healthcheck runs `pg_isready -U postgres -d tutorme`, but `POSTGRES_USER` is set to `tutorme`. So the healthcheck is checking the default `postgres` user, not the app user. Recommendation: set healthcheck to `pg_isready -U tutorme -d tutorme` so readiness reflects the actual app credentials.

---

## 7. Monitoring and Performance

- **lib/db/monitor.ts**: Uses Drizzle and `cache` from `index.ts`. Tracks query performance, pool metrics, and cache hit rates.
- **Read replica**: `readReplica` in `lib/db/index.ts` is a stub; `getClient()` returns the same `db` (Prisma) until `DATABASE_READ_REPLICA_URL` and real replica support are added.

---

## 8. Drizzle Migration Progress (ongoing)

**Libs migrated to Drizzle this session:**
- `lib/commission/platform-revenue.ts` – trackPlatformRevenue, getPlatformRevenue
- `lib/ai/task-generator.ts` – getStudentProfiles (studentPerformance)
- `lib/curriculum/lesson-controller.ts` – full module (startLesson, advanceLesson, completeLesson, getNextLesson, getStudentProgress, getLessonContent)
- `lib/monitoring/compliance-audit.ts` – logComplianceAudit, verifyGDPRCompliance (securityEvent)
- `lib/whiteboard/history.ts` – removed unused `db` import (no DB usage)
- `lib/reports/engagement-analytics.ts` – full module (class engagement, attendance, participation, assignments, quizzes, discussion, daily trend, hourly pattern, at-risk students, live session engagement)
- `lib/security/audit.ts` – logAudit (userActivityLog)
- `lib/security/api-key.ts` – createApiKey, verifyApiKey, revokeApiKey, listApiKeys
- `lib/security/security-audit.ts` – logSecurityEvent (securityEvent)
- `lib/performance/student-analytics.ts` – full module (calculateStudentMetrics, analyzeSubjectPerformance, identifyCommonMistakes, getQuestionLevelBreakdown, getStudentPerformance, getClassPerformanceSummary, updateStudentPerformanceRecord)

**API routes migrated this session:**
- `app/api/content/route.ts` – GET content list with profile subjects and progress (contentItem, contentProgress, profile)
- `app/api/health/enterprise/route.ts` – getDbVersion (raw SQL), getSecurityStats (securityEvent count)
- `app/api/health/deployment/route.ts` – checkDatabaseHealth (transaction counts: user, curriculum, liveSession, payment), checkSecurityHealth (securityEvent), checkInfrastructureHealth (raw pg_stat_replication)
- `app/api/class/join/route.ts` – liveSession find by roomId
- `app/api/ai-tutor/usage/route.ts` – checkUsage (aITutorSubscription, aITutorDailyUsage upsert/update)
- `app/api/student/enrollments/check/route.ts` – curriculumEnrollment + curriculumProgress + curriculum
- `app/api/bookmarks/route.ts` – GET/POST/DELETE (bookmark, contentItem)
- `app/api/achievements/route.ts` – GET/POST (achievement, contentProgress, bookmark counts and create)
- `app/api/recommendations/route.ts` – GET (quizAttempt, contentProgress, contentItem)
- `app/api/ai-tutor/subscription/route.ts` – GET/POST (aITutorSubscription, aITutorDailyUsage)
- `app/api/notifications/preferences/route.ts` – GET/PUT (notificationPreference)
- `app/api/content/[contentId]/route.ts` – GET (contentItem, contentQuizCheckpoint)
- `app/api/curriculums/[curriculumId]/route.ts` – GET (curriculum, modules, lessons, enrollment count, creator; enrolled via curriculumProgress)
- `app/api/polls/[pollId]/route.ts` – GET/PATCH/DELETE (poll, pollOption, pollResponse)
- `app/api/student/scores/route.ts` – GET (quizAttempt, taskSubmission, generatedTask, userGamification, curriculumEnrollment + curriculum)
- `app/api/curriculum/[curriculumId]/route.ts` – GET student curriculum detail (curriculum, curriculumModule, curriculumLesson, lessonSession, curriculumLessonProgress, curriculumProgress)
- `app/api/notifications/[id]/route.ts` – DELETE (notification by id + userId)
- `app/api/polls/[pollId]/vote/route.ts` – POST (poll, pollResponse create, poll totalResponses increment)
- `app/api/polls/route.ts` – GET list by sessionId (poll, pollOption, pollResponse); POST create poll + options
- `app/api/student/enrollments/route.ts` – GET (curriculumEnrollment + curriculum + module count); POST (curriculum, payment check, curriculumProgress check, curriculumEnrollment + curriculumProgress create)
- `app/api/curriculum/progress/route.ts` – GET (getStudentProgress + curriculum, modules, lessons, curriculumLessonProgress)
- `app/api/user/profile/route.ts` – GET/PUT (profile find/upsert)
- `app/api/classes/[id]/route.ts` – GET (clinic by id)
- `app/api/student/assignments/route.ts` – GET (generatedTask, taskSubmission filtered by student)
- `app/api/student/assignments/[taskId]/route.ts` – GET (generatedTask, taskSubmission)
- `app/api/curriculum/[curriculumId]/enroll/route.ts` – POST (curriculum, courseBatch, curriculumProgress, curriculumEnrollment upsert/create)
- `app/api/curriculum/lessons/[lessonId]/route.ts` – GET (curriculumLesson + curriculumModule for next lesson), POST (startLesson from lesson-controller)
- `app/api/ai-tutor/enrollments/route.ts` – GET (aITutorEnrollment, aITutorDailyUsage), PATCH (aITutorEnrollment update)
- `app/api/ai-tutor/enroll/route.ts` – POST (aITutorEnrollment find/create, curriculumEnrollment create, curriculum)
- `app/api/student/subjects/route.ts` – GET (curriculumEnrollment + curriculum, modules/lessons/progress per curriculum, quizAttempt)
- `app/api/curriculum/lessons/[lessonId]/session/route.ts` – POST (curriculumLesson, lessonSession find or startLesson)
- `app/api/student/subjects/unenroll/route.ts` – POST (curriculum by subject, curriculumEnrollment delete)
- `app/api/class/rooms/[id]/join/route.ts` – POST (liveSession, sessionParticipant, user/profile for tutor; Daily token)
- `app/api/student/progress/route.ts` – GET cached (curriculumEnrollment, curriculum, modules, lessons, curriculumLessonProgress, studentPerformance, userGamification, achievement, taskSubmission count)
- `app/api/student/subjects/enroll/route.ts` – POST (curriculum find/create, createDefaultModules = curriculumModule + curriculumLesson, curriculumEnrollment create, userGamification upsert)
- `app/api/content/[contentId]/quiz-skip/route.ts` – POST (contentItem check, videoWatchEvent create)
- `app/api/content/upload/init/route.ts` – POST (contentItem create for video upload)
- `app/api/student/subjects/[subjectCode]/route.ts` – GET (curriculum by subject, enrollment, modules/lessons/progress, quizAttempt, userGamification)
- `app/api/student/lesson-replays/route.ts` – GET (liveSession + sessionParticipant, sessionReplayArtifact, profile for tutor name, generatedTask/taskSubmission counts)
- `app/api/student/resources/route.ts` – GET (curriculumEnrollment + curriculum creatorId, resourceShare, resource, profile for tutor name)
- `app/api/student/quizzes/route.ts` – GET (curriculumEnrollment, quizAssignment, quiz, quizAttempt; filter by status)
- `app/api/user/gdpr/delete/route.ts` – POST (user + profile anonymization for GDPR delete)
- `app/api/user/gdpr/export/route.ts` – GET (user, profile, account, clinicBooking+clinic, payment for GDPR export)
- `app/api/admin/audit-log/route.ts` – GET (adminAuditLog with admin profile/email filters and pagination)
- `app/api/admin/settings/route.ts` – GET/POST (systemSetting list by category, upsert by category+key)
- `app/api/admin/auth/login/route.ts` – POST (ipWhitelist count, user by email ilike, profile, adminAssignment+role, user update for password migration)
- `app/api/admin/users/route.ts` – GET (user list with profile, adminAssignments, counts: curriculumEnrollment, liveSession, quizAttempt)
- `app/api/admin/payments/route.ts` – GET (payment with left join clinicBooking, clinic)
- `app/api/admin/webhook-events/route.ts` – GET (webhookEvent by gateway/processed, limit)
- `app/api/admin/llm/providers/route.ts` – GET/POST/PATCH (llmProvider with models and routing rule count; create/update provider)
- `app/api/admin/llm/routing/route.ts` – GET/POST/PATCH/DELETE (llmRoutingRule with targetModel/fallbackModel provider name)
- `app/api/admin/analytics/overview/route.ts` – GET (counts and recent data: user, userActivityLog, liveSession, contentItem, curriculumEnrollment, securityEvent, payment, refund, sessionParticipant, taskSubmission, quizAttempt, videoWatchEvent, curriculumLessonProgress, poll, whiteboardSession; groupBy role; DAU/funnel/enterprise)
- `app/api/admin/analytics/topology/route.ts` – GET (liveSession with participants, tutor/student user+profile, node/edge topology)
- `app/api/class/breakout/route.ts` – POST (liveSession check, breakoutRoom + breakoutRoomAssignment create)
- `app/api/class/payment-alert/route.ts` – POST (familyMember, curriculum, payment by enrollment/metadata, familyNotification create)
- `app/api/class/polls/route.ts` – GET/POST (poll by sessionId=roomId with options/responses; create poll + pollOption)
- `app/api/class/polls/[pollId]/route.ts` – PATCH/DELETE (poll update/delete by tutor)
- `app/api/class/polls/[pollId]/vote/route.ts` – POST (pollResponse create, poll totalResponses increment)
- `app/api/content/[contentId]/upload-complete/route.ts` – POST (contentItem update url, uploadStatus, duration, transcript)
- `app/api/content/[contentId]/watch-events/route.ts` – POST (contentItem check, videoWatchEvent createMany)
- `app/api/content/[contentId]/analytics/route.ts` – GET (contentItem, videoWatchEvent by studentId; watch time/completion/heatmap)

**Still on Prisma:** class/engagement (raw SQL engagement_snapshots, sessionEngagementSummary); remaining API routes (tutor/*, classes, conversations, whiteboards, sessions, payments create/refund/webhooks, reports, student missed-classes, learning-path, calendar, quizzes attempt/submit, assignments submit, reviews, etc.); `lib/performance/*`, `lib/security/*`, `lib/financial/*`, actions, scripts, tests. See §4.

---

## 9. Recommendations

1. **Finish Drizzle migration**: Move remaining libs and API routes to Drizzle; then switch `db` in `index.ts` to `drizzleDb`, remove Prisma, and use Drizzle for seeds and migrations.
2. **Fix db healthcheck**: In `docker-compose.yml`, use `pg_isready -U tutorme -d tutorme` for the `db` service. (Done.)
3. **Single schema source**: After Prisma removal, maintain only Drizzle schema and migrations; document any conventions for schema changes and backfills.
4. **Read replicas**: When needed, implement read-replica support in the Drizzle layer and expose it via a dedicated client (and optionally keep using PgBouncer for the primary).

---

## 10. Quick Reference

| Concern | Location |
|--------|----------|
| Prisma client & cache | `src/lib/db/index.ts` |
| Drizzle client & connection logic | `src/lib/db/drizzle.ts` |
| Drizzle schema | `src/lib/db/schema/` |
| Prisma schema | `prisma/schema.prisma` |
| DB monitoring | `src/lib/db/monitor.ts` |
| Drizzle Studio | `docs/DRIZZLE_STUDIO.md` (and `drizzle.config.ts`) |
| Start script (DB + app) | `tutorme-start.sh` |
