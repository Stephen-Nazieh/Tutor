# Drizzle Phase 0–1 Complete – Next Steps

Phase 0 and Phase 1 are implemented in the repo. Do the following once your database is running.

## 1. Install dependencies (if not already)

```bash
cd tutorme-app
npm install --legacy-peer-deps
```

## 2. Introspect the database (generate Drizzle schema from Postgres)

With your DB up (e.g. after running `~/tutorme-start.sh` or `npm run start:demo`):

```bash
npm run drizzle:pull
```

This writes generated files under `drizzle/` (e.g. `drizzle/schema.ts`, `drizzle/relations.ts`).

- Copy or merge the generated schema and relations into `src/lib/db/schema/` (e.g. replace the contents of `schema/index.ts` or add new files and re-export).
- Remove the `_drizzlePlaceholder` table from the schema and from `schema/index.ts` once the real tables are in place.
- Optional: delete `drizzle/0000_placeholder.sql` if you do not want to create the placeholder table in the DB.

## 3. Use the Drizzle client in new code (server-only)

Import from `@/lib/db/drizzle` so the main `@/lib/db` barrel is not pulled into client or instrumentation (pg is Node-only).

```ts
import { drizzleDb } from '@/lib/db/drizzle'
import * as schema from '@/lib/db/schema'

// Example: select
const users = await drizzleDb.select().from(schema.user)

// Example: with relations (after you add relations to schema)
// const withProfile = await drizzleDb.query.user.findFirst({ with: { profile: true } })
```

Existing code continues to use `db` (Prisma) until Phase 3–4.

## 4. Apply Drizzle migrations (optional, when you add new schema changes)

After editing `src/lib/db/schema/`:

```bash
npm run drizzle:generate   # generate SQL in drizzle/
npm run drizzle:migrate    # apply to DB (or use npx drizzle-kit migrate)
```

## Scripts added

| Script | Purpose |
|--------|---------|
| `npm run drizzle:generate` | Generate migration SQL from schema |
| `npm run drizzle:pull` | Introspect DB → generate schema (run when DB is up) |
| `npm run drizzle:studio` | Open Drizzle Studio (optional) |
| `npm run drizzle:push` | Push schema changes to DB (dev only) |
| `npm run drizzle:migrate` | Apply migrations from `drizzle/` to DB |

## Files created/updated

- `drizzle.config.ts` – Drizzle Kit config (schema path, `out`, dialect, URL).
- `src/lib/db/schema/index.ts` – Placeholder schema (replace after introspect).
- `src/lib/db/drizzle.ts` – Drizzle client singleton (`drizzleDb`).
- `src/lib/db/drizzle-migrate.ts` – Script to run migrations.
- `src/lib/db/index.ts` – Exports `drizzleDb` and `DrizzleDb` type.
- `drizzle/README.md` – Notes on migrations and introspect output.
- `drizzle/0000_placeholder.sql` – Migration for placeholder table (safe to delete if you skip creating it).
- `package.json` – Added `drizzle-orm`, `pg`, `drizzle-kit`, `@types/pg` and the scripts above.
