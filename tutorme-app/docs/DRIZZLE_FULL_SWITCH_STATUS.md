# Drizzle Full Switch – Status and Next Steps

**Last updated:** After Phase 3 and partial Phase 4.

---

## Done

### Phase 0–1 (already in place)
- Drizzle + Kit + `pg` driver; `drizzle.config.ts`; scripts: `drizzle:generate`, `drizzle:pull`, `drizzle:studio`, `drizzle:push`, `drizzle:migrate`.
- Drizzle client in `src/lib/db/drizzle.ts` (singleton pool, `drizzleDb` export).
- Full generated schema (13 enums, 110 tables) + `next-auth.ts` (Session, VerificationToken).

### Phase 2: NextAuth on Drizzle
- **`src/lib/auth.ts`** uses `DrizzleAdapter(drizzleDb, ...)` and Drizzle for credentials lookup.

### Phase 3: Core libs on Drizzle
- **`src/lib/db/queries.ts`** – fully migrated to `drizzleDb` (getUserById, getTutorDashboardStats, getStudentDashboardData, getClassDetails, getLeaderboard, getContentLibrary, cache invalidation).
- **`src/lib/db/dataloader.ts`** – fully migrated (batchLoadUsers, batchLoadProfiles, batchLoadContentProgress, batchLoadClassesByTutor, batchLoadBookingsByClass, batchLoadGamification, batchLoadAchievements, batchLoadEnrollments).
- **`src/lib/enrollment.ts`** – fully migrated (`enrollStudentInCurriculum` uses Drizzle for curriculum, modules, lessons count, curriculumProgress, curriculumEnrollment).

### Phase 4: API routes (partial)
- **`src/app/api/curriculums/catalog/route.ts`** – GET catalog, uses `drizzleDb` + `curriculumCatalog`.
- **`src/app/api/progress/route.ts`** – GET/POST progress, uses `drizzleDb` + `contentProgress` / `contentItem`.
- **`src/app/api/auth/register/route.ts`** – POST register uses `drizzleDb.transaction` with `user`, `profile`, `familyAccount`, `familyMember`, `emergencyContact`; unique username helper uses Drizzle select; studentUniqueId fetch after transaction uses Drizzle.
- **`src/app/api/student/reviews/snooze/route.ts`** – POST uses `drizzleDb` + `reviewSchedule` (select by id + studentId, update nextReview).
- **`src/app/api/gamification/dashboard/route.ts`** – GET uses `drizzleDb` for dailyQuests (join mission), userBadges (join badge), userActivityLog; other data from gamification libs (now Drizzle: service, daily-quests, activity-log).
- **`src/app/api/health/route.ts`** – GET detailed health uses `drizzleDb.execute(sql\`SELECT version() as version\`)` for DB version; `getHealthCheck`/monitor use Drizzle for DB ping (`drizzleDb.execute(sql\`SELECT 1\`)` in monitor).
- **`src/app/api/tutor/public-profile/route.ts`** – GET/PATCH use `drizzleDb` + `user`, `profile`, `curriculum` (tutor courses by creatorId, isPublished).

### Important paths
- **Prisma (still used by most API routes and many libs):** `src/lib/db/index.ts` → `db` / `prisma` (PrismaClient).
- **Drizzle:** `src/lib/db/drizzle.ts` → `drizzleDb`; schema in `src/lib/db/schema/`. Migrated code imports `drizzleDb` from `@/lib/db/drizzle` and tables from `@/lib/db/schema`.

---

## Current state

- **Drizzle:** Auth, `queries.ts`, `dataloader.ts`, `enrollment.ts`, catalog API, progress API.
- **Prisma:** Everything else (~140+ files still use `db` from `@/lib/db`).

To complete the full switch, migrate remaining API routes and libs to Drizzle, then switch `db` to `drizzleDb` and remove Prisma (Phase 5).

**Start script:** `~/tutorme-start.sh` starts the app and the database. Docker: Postgres on **localhost:5433** (this is the DB connection port—no web UI here), Redis on 6379. The script runs `prisma db push` / `prisma generate` and `npm run dev`, and opens only the **app** (http://localhost:3003). **Database UI:** Use **Drizzle Studio** (no Prisma): run `npm run db:studio` or `npm run studio`, then open **https://local.drizzle.studio** (connects to local server on port 4983). The script no longer starts Prisma Studio. **Docker:** Ensure **tutorme-db** is running (green); if stopped, start it so the app can connect.

---

## How to complete the full switch

### Phase 3: Core libs (queries + dataloader + enrollment done)
- **Also migrated:** `lib/security/suspicious-activity.ts`, `lib/admin/feature-flags.ts`, `lib/gamification/leaderboard.ts`, `lib/security/parent-child-queries.ts`, `lib/db/monitor.ts` (DB ping via Drizzle), `lib/gamification/activity-log.ts`, `lib/gamification/service.ts`, `lib/gamification/daily-quests.ts`.
- **Also migrated:** `lib/gamification/badges.ts`, `lib/gamification/triggers.ts`, `lib/gamification/worlds.ts`, `lib/notifications/notify.ts`, `lib/api/parent-helpers.ts`, `lib/chat/summary.ts`, `lib/feedback/workflow.ts`.
- **Remaining libs** that still use `db`: `lib/curriculum/lesson-controller.ts`, `lib/security/*` (audit, api-key, payment-security, pipl-compliance, comprehensive-audit, security-audit), `lib/admin/*`, `lib/reports/*`, `lib/performance/*`, `lib/ai/task-generator.ts`, `lib/financial/*`, `lib/whiteboard/history.ts` (in-memory only; no DB calls), `lib/commission/platform-revenue.ts`, `lib/monitoring/compliance-audit.ts`. Migrate each by replacing `db` with `drizzleDb` and Prisma calls with Drizzle (`eq`, `and`, `inArray`, `select`, `insert`, `update`, `delete`).

### Phase 4: API routes and actions
- Replace `db` with `drizzleDb` in every API route under `src/app/api/` and in server actions under `src/app/actions/` and `src/app/[locale]/actions/`.
- Replace Prisma patterns with Drizzle:
  - `db.model.findFirst({ where })` → `drizzleDb.select().from(table).where(eq(...)).limit(1)` (then take `[0]`).
  - `db.model.findMany(...)` → `drizzleDb.select().from(table).where(...)`.
  - `db.model.create({ data })` → `drizzleDb.insert(table).values(...).returning()`.
  - `db.model.update(...)` → `drizzleDb.update(table).set(...).where(...).returning()`.
  - `db.model.delete(...)` → `drizzleDb.delete(table).where(...)`.
  - For relations, use joins or separate queries (Drizzle has no `include`; use `leftJoin` or multiple selects).

### Phase 5: Seeds, tests, remove Prisma
1. **Seeds**  
   Rewrite `prisma/seed.ts`, `scripts/seed-curriculum.ts`, `src/scripts/seed-admin.ts`, etc., to use `drizzleDb` and Drizzle schema.

2. **Tests**  
   Update any test that mocks or uses `db` (Prisma) to use Drizzle or a test DB with Drizzle.

3. **Remove Prisma**  
   - In `src/lib/db/index.ts`: set `db = drizzleDb` (and re-export from `drizzle.ts` if desired), remove Prisma client init and `export * from '@prisma/client'`.
   - Uninstall: `npm uninstall prisma @prisma/client @next-auth/prisma-adapter`.
   - Delete `prisma/` (schema and migrations).
   - Remove Prisma scripts from `package.json` (`db:migrate`, `db:generate`, `db:studio`, etc.) or point them to Drizzle equivalents.
   - Update AGENTS.md and any other docs that reference Prisma.

---

## Regenerating the Drizzle schema

If you change `prisma/schema.prisma` and want to refresh Drizzle schema without touching the DB:

```bash
node scripts/prisma-to-drizzle-schema.mjs
```

If you prefer to pull from the current database (DB must be up and migrated):

```bash
npm run drizzle:pull
```

Then copy or merge the generated schema from `drizzle/` into `src/lib/db/schema/` as needed (and keep `next-auth.ts` for Session/VerificationToken).

---

## Enum/table naming

- **Tables:** Generated script uses Prisma model names as table names (e.g. `User`, `Account`), matching existing Prisma migrations.
- **Enums:** Generated script uses PascalCase enum names (e.g. `Role`, `SessionType`) so they match Prisma-created enums in PostgreSQL. If your DB has lowercase enum names, either change the script or the generated `enums.ts` to use lowercase in `pgEnum('name', [...])`.

---

## Summary

- **Done:** Full Drizzle schema; NextAuth on Drizzle; Phase 3 (queries, dataloader, enrollment); Phase 4 started (catalog, progress routes).
- **Remaining:** Migrate remaining libs and API routes to `drizzleDb`; then Phase 5: seeds, tests, set `db = drizzleDb` in `index.ts`, remove Prisma.
