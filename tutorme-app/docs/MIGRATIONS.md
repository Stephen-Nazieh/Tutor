# Applying Drizzle migrations

This project uses Drizzle for schema changes. SQL migration files live in `tutorme-app/drizzle/` and are applied with the Drizzle migrator.

## Quick steps (recommended)

1. **Ensure the database is running** (e.g. `npm run docker:up` or your usual Postgres).

2. **Set the connection URL** in `.env` or `.env.local`:
   - `DIRECT_URL` or `DATABASE_URL` (e.g. `postgresql://tutorme:…@localhost:5432/tutorme` for direct, or `…@localhost:5433/tutorme` for PgBouncer).

3. **Apply all pending migrations** from the project root (`tutorme-app/`):

   ```bash
   npm run drizzle:migrate
   ```

   This runs `tsx src/lib/db/drizzle-migrate.ts`, which:
   - Reads migrations from the `drizzle/` folder
   - Uses the journal in `drizzle/meta/_journal.json` to know which SQL files to run and in what order
   - Connects with `DIRECT_URL` or `DATABASE_URL` and executes each pending migration once (tracked in the `__drizzle_migrations` table)

## What was fixed for the new migration

The file `drizzle/0002_engagement_insights.sql` (engagement/insights tables) was not listed in `drizzle/meta/_journal.json`, so the migrator skipped it. An entry for `0002_engagement_insights` was added to the journal. After that, running `npm run drizzle:migrate` applies it along with any future migrations.

## Alternative: run one SQL file manually

If you prefer to run a single migration file yourself (e.g. for a one-off or debugging):

```bash
# From tutorme-app/ with DATABASE_URL or DIRECT_URL set
psql "$DIRECT_URL" -f drizzle/0002_engagement_insights.sql
# or
psql "$DATABASE_URL" -f drizzle/0002_engagement_insights.sql
```

Note: the Drizzle migrator records which migrations have run. If you run the SQL manually, the migrator will still try to run it later unless you insert a matching row into `__drizzle_migrations`. Prefer `npm run drizzle:migrate` so state stays consistent.

## Scripts reference

| Script | Command | Purpose |
|--------|---------|--------|
| Apply Drizzle migrations | `npm run drizzle:migrate` | Runs all pending SQL in `drizzle/` (recommended). |
| Deploy migrations (alias) | `npm run db:migrate:deploy` | Same as `drizzle:migrate`. |
| Push schema (no SQL files) | `npm run db:migrate` / `npm run drizzle:push` | `drizzle-kit push`: syncs schema to DB without using migration SQL; use with care. |
| Generate new migration | `npm run drizzle:generate` | Generates a new SQL file from schema changes. |

## Troubleshooting

- **“Migration failed”**  
  Check that Postgres is reachable and `DIRECT_URL` or `DATABASE_URL` is correct. For Docker, use the host port (e.g. `localhost:5432` or `5433`).

- **New SQL file not running**  
  Ensure it is listed in `drizzle/meta/_journal.json` with a `tag` that matches the filename (without `.sql`), e.g. `"tag": "0002_engagement_insights"` for `0002_engagement_insights.sql`.

- **Prisma migrations**  
  Prisma migrations in `prisma/migrations/` are still applied with `npx prisma migrate deploy` (or `prisma migrate dev` in development). Drizzle migrations are independent and live in `drizzle/`.
