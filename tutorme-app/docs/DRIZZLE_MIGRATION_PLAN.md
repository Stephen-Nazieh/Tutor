# Prisma → Drizzle ORM Migration Plan

**TutorMe (tutorme-app)**  
**Objective:** Replace Prisma with Drizzle ORM to eliminate Studio/migrate issues while preserving type safety, relations, and multi-user reliability.

---

## 1. Current State Summary

| Area | Detail |
|------|--------|
| **ORM** | Prisma 5.22, 100+ models in `prisma/schema.prisma` |
| **DB** | PostgreSQL (direct on 5433 or via PgBouncer) |
| **Entry point** | `src/lib/db/index.ts` – singleton `db` (PrismaClient) + Redis cache |
| **Usage** | ~150+ files: API routes, lib services, auth, gamification, payments, curriculum, etc. |
| **Auth** | NextAuth with `PrismaAdapter(db)` |
| **Other** | `lib/db-enhanced.ts`, `lib/db/queries.ts`, `lib/db/dataloader.ts`, seeds, migrations |

---

## 2. High-Level Strategy

- **Incremental migration:** Run Prisma and Drizzle in parallel; move domain-by-domain, then remove Prisma.
- **Schema source of truth:** Start from existing Postgres (introspect) or from Prisma schema; then maintain only Drizzle schema and generate SQL migrations with Drizzle Kit.
- **Single connection layer:** Replace `lib/db` with a Drizzle-based client that keeps Redis caching and pooling behavior where needed.

---

## 3. Phases Overview

| Phase | Goal | Outcome |
|-------|------|----------|
| **0** | Prep & tooling | Drizzle + Kit installed; config and scripts in place |
| **1** | Schema & connection | Drizzle schema (introspect or hand-mirror); `db` export from `lib/db` is Drizzle |
| **2** | Adapter & auth | NextAuth works with Drizzle (custom or community adapter) |
| **3** | Core libs | Migrate `lib/db/queries.ts`, dataloaders, and high-traffic libs to Drizzle |
| **4** | API routes by domain | Migrate API routes in order: auth → user → curriculum → payments → rest |
| **5** | Seeds, tests, cleanup | Drizzle seeds; tests updated; Prisma removed |

---

## 4. Phase 0: Preparation and Tooling

**Goal:** Install Drizzle, configure Kit, and add scripts without changing app behavior.

### 4.1 Install dependencies

```bash
cd tutorme-app
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

- Use `postgres` (postgres.js) as the driver for Drizzle (good pooling and Node compatibility).
- Optional: keep `@prisma/client` and `prisma` until Phase 5.

### 4.2 Config and folder layout

- **Config file:** `drizzle.config.ts` at repo root (or in `tutorme-app/` if monorepo).

  - Use `DATABASE_URL` (or `DIRECT_URL` if you keep it) for migrations.
  - Schema path: e.g. `./src/lib/db/schema` or `./src/db/schema`.
  - Migrations output: e.g. `./drizzle` or `./src/lib/db/migrations`.

- **Schema directory:** e.g. `src/lib/db/schema/` (or `src/db/schema/`).

  - One file per domain is fine (e.g. `users.ts`, `curriculum.ts`, `payments.ts`) or a single `index.ts` that re-exports.

- **Migrations directory:** e.g. `drizzle/` or `src/lib/db/migrations/` (do not overwrite Prisma’s `prisma/migrations`; keep that history until Prisma is removed).

### 4.3 Scripts in `package.json`

- `"db:generate"`: keep Prisma generate for now; add `"drizzle:generate": "drizzle-kit generate"` (or `drizzle-kit generate:pg`).
- `"drizzle:studio"`: optional, `drizzle-kit studio` (separate from Prisma Studio).
- `"drizzle:migrate"` or `"drizzle:push"`: run Drizzle migrations (e.g. `drizzle-kit migrate` or a small script that runs migrations from code).
- Keep existing `db:migrate`, `db:studio` until Phase 5.

### 4.4 Deliverables

- [x] `drizzle-orm`, `pg`, `drizzle-kit` installed (Phase 0 done).
- [x] `drizzle.config.ts` present and pointing at Postgres.
- [x] Schema (`src/lib/db/schema/`) and migrations (`drizzle/`) directories created.
- [x] New npm scripts added; existing app still runs on Prisma.

---

## 5. Phase 1: Schema and Connection Layer

**Goal:** Have a Drizzle schema that matches the current database and a single `db` export that uses Drizzle (with optional Redis caching preserved later).

### 5.1 Schema creation (choose one path)

**Option A – Introspect from existing DB (recommended to start)**

1. Ensure DB is running and migrated (Prisma migrations applied).
2. Run: `npx drizzle-kit introspect` (or `pull` depending on Kit version).
3. This generates Drizzle schema from Postgres. Move/edit generated files into `src/lib/db/schema/` and fix any types or naming (e.g. table names to match your conventions).
4. Add relations in Drizzle (e.g. `relations()` in Drizzle) so that relation APIs match how you use Prisma today where possible.

**Option B – Mirror from Prisma schema**

1. Manually create Drizzle table definitions and relations from `prisma/schema.prisma`.
2. Use Drizzle’s `pgTable`, enums, and `relations()` so that the shape is close to current Prisma usage.
3. Run a first migration with Drizzle in a throwaway DB or a copy to ensure it matches; then align production DB (either by applying Drizzle migrations or by marking “already applied” and continuing from current state).

### 5.2 Connection and `db` export

- **File:** `src/lib/db/drizzle.ts` (or `src/lib/db/client.ts`).

  - Create a Postgres connection (or pool) using `postgres(DATABASE_URL)` (or `DIRECT_URL` if you prefer one URL for app and migrations).
  - Export: `import { drizzle } from 'drizzle-orm/postgres-js'` (or `node-postgres`) and pass the pool + schema:
    - `export const db = drizzle(client, { schema })`.
  - Use a singleton pattern (e.g. global in dev to avoid many connections) similar to current Prisma usage.

- **Environment:** Use the same `DATABASE_URL` / `DIRECT_URL` as today. No PgBouncer-specific hacks needed for Drizzle.

### 5.3 Keep Prisma temporarily (parallel run)

- In `src/lib/db/index.ts`, keep exporting the existing Prisma `db` as e.g. `prismaDb` or leave as `db` and introduce a new export `drizzleDb` from `drizzle.ts`.
- Plan: once Phase 4 is done per domain, switch `db` to Drizzle and remove Prisma from this file in Phase 5.

### 5.4 Deliverables

- [x] Drizzle schema in `src/lib/db/schema/` with placeholder table (replace with introspect output: run `npm run drizzle:pull` when DB is up).
- [x] `src/lib/db/drizzle.ts` with pooled client and `drizzleDb` export.
- [x] App still runs on Prisma; `drizzleDb` exported from `@/lib/db` for new code.

---

## 6. Phase 2: NextAuth and Auth Layer

**Goal:** NextAuth works with Drizzle instead of Prisma so login/session and user creation use the new DB layer.

### 6.1 Adapter options

- **Option A:** Use `@auth/drizzle-adapter` (or current name: e.g. `next-auth`’s Drizzle adapter if available). Configure with your Drizzle `db` and the tables that NextAuth expects (User, Account, Session, VerificationToken).
- **Option B:** Implement a custom NextAuth adapter that uses your Drizzle `db` and existing table shapes (Prisma’s schema is compatible with NextAuth’s expected columns; keep the same table/column names so no DB change is needed).

### 6.2 Schema alignment

- Ensure Drizzle schema for `User`, `Account`, `Session`, `VerificationToken` matches what NextAuth expects (and what Prisma adapter used). If you introspected, this should already be the case.

### 6.3 Switch auth to Drizzle

- In `src/lib/auth.ts`:
  - Replace `PrismaAdapter(db)` with the Drizzle adapter (or custom adapter using `drizzleDb`).
  - Replace any direct `db.user.findFirst` (or similar) with Drizzle queries (e.g. `db.query.user.findFirst` or equivalent).
- Test: login, logout, session, registration (if it creates users via NextAuth).

### 6.4 Deliverables

- [ ] NextAuth configured with Drizzle adapter (or custom adapter).
- [ ] All auth flows (credentials, session, user lookup) use Drizzle.
- [ ] No Prisma usage left in `src/lib/auth.ts`.

---

## 7. Phase 3: Core Libs and Shared DB Usage

**Goal:** Migrate the central DB layer and high-impact libs so most API routes can depend on Drizzle without touching Prisma.

### 7.1 Replace `src/lib/db/index.ts` export

- Make `db` in `src/lib/db/index.ts` the Drizzle client (re-export from `drizzle.ts`).
- Keep Redis caching in this file if you use it: cache layer can sit in front of Drizzle (e.g. wrapper that checks cache then calls `db`).
- Remove Prisma client initialization from this file (or leave it as `prismaDb` for a short transition and delete in Phase 5).

### 7.2 Migrate shared DB modules

- **`src/lib/db/queries.ts`**  
  Rewrite all helpers to use Drizzle (e.g. `db.select()`, `db.insert()`, `db.update()`, `db.delete()`, and relation queries). Keep the same function signatures where possible so callers need minimal changes.

- **`src/lib/db/dataloader.ts`**  
  If dataloaders use Prisma, switch them to Drizzle queries. Batch by IDs and use `db.select().where(inArray(...))` (or equivalent) to preserve N+1 avoidance.

- **`src/lib/db/monitor.ts`**  
  Replace any Prisma health/version checks with a simple Drizzle raw query (e.g. `SELECT 1` or `SELECT version()`).

- **`src/lib/db-enhanced.ts`**  
  If still in use, replace its Prisma usage with Drizzle and keep the same public API (e.g. `client`, caching, monitoring).

### 7.3 Domain libs (order suggested)

Migrate these to use `db` (Drizzle) only; keep the same exported functions and types where possible:

1. **Auth & users:** Already done in Phase 2; ensure `lib/admin/auth.ts` uses Drizzle for admin session/tables if it touches DB.
2. **Curriculum:** `lib/curriculum/lesson-controller.ts`, `lib/enrollment.ts`.
3. **Gamification:** `lib/gamification/service.ts`, `leaderboard.ts`, `badges.ts`, `daily-quests.ts`, `triggers.ts`, `worlds.ts`, `activity-log.ts`.
4. **Payments & financial:** `lib/feedback/workflow.ts`, `lib/security/payment-security.ts`, `lib/commission/platform-revenue.ts`, `lib/financial/parent-financial-service.ts`.
5. **Security & audit:** `lib/security/audit.ts`, `api-key.ts`, `parent-child-queries.ts`, `security-audit.ts`, `pipl-compliance.ts`, `suspicious-activity.ts`, `comprehensive-audit.ts`.
6. **Other:** `lib/notifications/notify.ts`, `lib/admin/feature-flags.ts`, `lib/chat/summary.ts`, `lib/ai/task-generator.ts`, `lib/performance/performance-monitoring.ts`, `lib/performance/student-analytics.ts`, `lib/reports/engagement-analytics.ts`, `lib/monitoring/compliance-audit.ts`, `lib/api/parent-helpers.ts`, `lib/api/middleware.ts`.

For each file: replace `db.*` / `prisma.*` with Drizzle queries; adjust imports; run tests if any.

### 7.4 Deliverables

- [ ] `src/lib/db/index.ts` exports Drizzle as `db`; Redis/caching still works if applicable.
- [ ] `queries.ts`, `dataloader.ts`, `monitor.ts`, `db-enhanced.ts` migrated to Drizzle.
- [ ] All libs in the list above use only Drizzle (no Prisma).

---

## 8. Phase 4: API Routes by Domain

**Goal:** Every API route and server action that touches the DB uses Drizzle. No Prisma in routes or actions.

### 8.1 Order of migration (by domain)

1. **Auth & user**  
   `api/auth/*`, `api/user/*`, `api/onboarding/*`, `api/admin/auth/*`.
2. **Curriculum & progress**  
   `api/curriculum/*`, `api/curriculums/*`, `api/progress/*`, `api/student/progress`, `api/student/enrollments`, `api/student/learning-path`, etc.
3. **Classes & sessions**  
   `api/classes/*`, `api/class/*`, `api/sessions/*`.
4. **Tutor: courses & content**  
   `api/tutor/courses/*`, `api/tutor/classes/*`, `api/content/*`, `api/tutor/resources/*`, `api/tutor/question-bank/*`, `api/tutor/quizzes/*`.
5. **Tutor: calendar, AI, revenue**  
   `api/tutor/calendar/*`, `api/tutor/ai-assistant/*`, `api/tutor/revenue/*`, `api/tutor/payouts/*`, `api/tutor/stats/*`, etc.
6. **Payments**  
   `api/payments/*`, `api/class/payment-alert`.
7. **Student**  
   `api/student/*` (assignments, quizzes, reviews, subjects, resources, etc.).
8. **Parent**  
   `api/parent/*`.
9. **AI tutor**  
   `api/ai-tutor/*`.
10. **Admin**  
    `api/admin/*` (users, settings, analytics, audit, llm, webhooks, etc.).
11. **Other**  
    `api/health/*`, `api/notifications/*`, `api/conversations/*`, `api/whiteboards/*`, `api/polls/*`, `api/study-groups/*`, `api/gamification/*`, `api/achievements/*`, `api/recommendations/*`, `api/reports/*`, actions in `app/actions/*` and `app/[locale]/actions/*`.

For each route/action: replace `db` usage with Drizzle (same `db` import from `@/lib/db` once it’s Drizzle). Fix types (Prisma types → Drizzle inferred types or your own types). Run manual or automated tests for that area.

### 8.2 Patterns

- **Select one:** `db.select().from(table).where(eq(...)).limit(1)` or use Drizzle’s query builder with relations.
- **Select many:** `db.select().from(table).where(...)` or with relations.
- **Insert:** `db.insert(table).values({...}).returning()`.
- **Update:** `db.update(table).set({...}).where(eq(...)).returning()`.
- **Delete:** `db.delete(table).where(eq(...))`.
- **Transactions:** `db.transaction(async (tx) => { ... })`.
- **Raw SQL:** `db.execute(sql`...`)` or the equivalent in Drizzle when needed.

### 8.3 Deliverables

- [ ] All API routes and server actions use Drizzle only.
- [ ] No `import { db } from '@/lib/db'` that points at Prisma anywhere in `src/app`.

---

## 9. Phase 5: Seeds, Tests, and Prisma Removal

**Goal:** Seeds and tests use Drizzle; Prisma and its tooling are fully removed.

### 9.1 Seeds

- **Prisma seeds:** `prisma/seed.ts`, `scripts/seed-curriculum.ts`, `src/scripts/seed-admin.ts`, `scripts/seed-gamification.ts`, etc.
  - Rewrite to use Drizzle `db`: `db.insert(...).values(...)` (and relations as needed).
  - Run seeds via a script that uses your Drizzle connection (e.g. `tsx scripts/seed.ts` or existing script with DB import switched to Drizzle).

### 9.2 Tests

- **Unit/integration:** Replace any Prisma mocks or DB usage with Drizzle. Use a test DB and run Drizzle migrations (or a test schema) before tests.
- **E2E:** If they hit the real DB, ensure app and test run against the same Drizzle-backed app; no Prisma in the stack for that app instance.

### 9.3 Migrations and schema ownership

- **Going forward:** All new schema changes are done in Drizzle (edit `src/lib/db/schema/*`, run `drizzle-kit generate`, then apply with `drizzle-kit migrate` or your script).
- **History:** Keep `prisma/migrations` in git for history; no need to replay them if the DB is already in the desired state. New migrations are only Drizzle.

### 9.4 Remove Prisma

- Uninstall: `npm uninstall prisma @prisma/client @next-auth/prisma-adapter` (or keep a thin NextAuth adapter if it was Prisma-specific and you replaced it).
- Delete or stop using: `prisma/schema.prisma`, `prisma/migrations` (or keep read-only), and any `prisma generate` / `prisma migrate` / `prisma studio` scripts.
- Remove Prisma from `src/lib/db/index.ts` (and any leftover `prismaDb` or fallbacks).
- Update docs (e.g. AGENTS.md, README, QUICKSTART) to describe Drizzle commands (`drizzle:generate`, `drizzle:migrate`, `drizzle:studio`) and env (e.g. `DATABASE_URL`).

### 9.5 Deliverables

- [ ] All seeds run with Drizzle.
- [ ] Tests updated and passing with Drizzle.
- [ ] Prisma removed from dependencies and codebase.
- [ ] Docs updated; launcher/scripts use Drizzle only.

---

## 10. Risk and Rollback

- **Risk:** Large one-step switch could block the team. **Mitigation:** Incremental migration (Phase 3–4) and keeping Prisma in parallel until Phase 5.
- **Rollback:** Until Prisma is removed, you can revert a given route or lib to use Prisma again and keep both DB layers in the app temporarily.
- **Data:** No need to change DB contents; you’re only changing the client (Prisma → Drizzle). Keep using the same Postgres DB and, if needed, the same migration history until you’re fully on Drizzle.

---

## 11. Suggested Timeline (Rough)

| Phase | Effort (rough) | Notes |
|-------|----------------|-------|
| 0 | 0.5–1 day | Tooling and config |
| 1 | 1–2 days | Schema introspect + connection; can be split across people |
| 2 | 0.5–1 day | NextAuth adapter and auth.ts |
| 3 | 2–4 days | Core db + libs; highest impact |
| 4 | 3–5 days | Many routes; can be parallelized by domain |
| 5 | 1–2 days | Seeds, tests, cleanup, docs |

**Total:** about 8–15 days depending on team size and test coverage.

---

## 12. Checklist Summary

- [ ] Phase 0: Drizzle + Kit installed; config and scripts; app still on Prisma.
- [ ] Phase 1: Drizzle schema and `db` (Drizzle) export; optional parallel Prisma export.
- [ ] Phase 2: NextAuth on Drizzle; no Prisma in auth.
- [ ] Phase 3: `lib/db` and all listed libs on Drizzle.
- [ ] Phase 4: All API routes and actions on Drizzle.
- [ ] Phase 5: Seeds and tests on Drizzle; Prisma removed; docs updated.

---

## 13. References

- [Drizzle ORM – PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql)
- [Drizzle Kit – Introspect](https://orm.drizzle.team/docs/introspect)
- [Drizzle Kit – Migrations](https://orm.drizzle.team/docs/migrations)
- [NextAuth – Adapters](https://next-auth.js.org/tutorials/creating-a-database-adapter) (for custom Drizzle adapter if needed)
