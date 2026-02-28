# Drizzle Studio – Fixes and Setup

## "Unexpected error happened" on https://local.drizzle.studio

The UI at **https://local.drizzle.studio** is a cloud page that connects to a **local** backend (the process started by `npm run db:studio` on port 4983). If you see a generic "Unexpected error happened" with an error ID:

1. **Ensure the backend is running**  
   Run `npm run db:studio` from `tutorme-app` and wait until it prints "Starting Drizzle Studio on port 4983". Only then open https://local.drizzle.studio.

2. **Use Chrome or Firefox**  
   Safari and Brave often block the cloud page from talking to localhost. Chrome/Firefox usually work. For Safari/Brave, Drizzle suggest [mkcert](https://github.com/FiloSottile/mkcert): run `mkcert -install`, then restart `npm run db:studio`.

3. **Missing PEM files (macOS/Windows)**  
   If the backend fails to start with `ENOENT ... localhost-key.pem`, the script now creates empty `localhost-key.pem` and `localhost.pem` in the drizzle-studio app data folder. If you run studio by hand, create that folder and touch those files (see [drizzle-orm#3455](https://github.com/drizzle-team/drizzle-orm/issues/3455)).

4. **Fallback: Prisma Studio**  
   This project still has Prisma. If Drizzle Studio keeps failing, you can use the local-only DB UI:
   ```bash
   npx prisma studio
   ```
   Then open **http://localhost:5555** (no cloud, no PEM). It uses the same Postgres; point it at `DATABASE_URL` or `DIRECT_URL` via `.env.local` if needed.

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
