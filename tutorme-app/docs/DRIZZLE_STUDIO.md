# Drizzle Studio – Fixes and Setup

## Port 4983 already in use (EADDRINUSE)

If you see `Error: listen EADDRINUSE: address already in use 127.0.0.1:4983`:

- **`npm run db:studio`** now runs `scripts/studio.sh`, which **frees port 4983** (kills any existing Drizzle Studio process) before starting. Just run `npm run db:studio` again.
- Or manually: `lsof -ti :4983 | xargs kill -9` then `npm run db:studio`.

## “pgbouncer cannot connect to server”

This means **Postgres is not running** or Studio is using the wrong URL.

### If you use **docker-compose** (PgBouncer on 5433, Postgres on 5432)

1. **Start Postgres:**
   ```bash
   cd tutorme-app
   docker-compose up -d db
   ```
2. **Use direct Postgres for Studio** (not PgBouncer). In `.env.local`:
   - `DIRECT_URL="postgresql://postgres:postgres_password@localhost:5432/tutorme"`
   - `DATABASE_URL` can stay as the pool: `postgresql://postgres:postgres_password@localhost:5433/tutorme`
3. Run `npm run db:studio` and open https://local.drizzle.studio

### If you use **tutorme-start.sh** (single Postgres on 5433, no PgBouncer)

- Start script creates `tutorme-db` on port 5433 with user `tutorme`.
- In `.env.local`: `DIRECT_URL` and `DATABASE_URL` both `postgresql://tutorme:tutorme_password@localhost:5433/tutorme`.
- Don’t run docker-compose’s PgBouncer on 5433 at the same time, or stop it first.

### Quick check

- `docker ps` should show **tutorme-db** (Postgres) running.
- If you only see **tutorme-pgbouncer** and **tutorme-redis**, start Postgres: `docker-compose up -d db`.
