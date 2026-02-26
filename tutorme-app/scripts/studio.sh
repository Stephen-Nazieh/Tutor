#!/bin/bash

# Start Drizzle Studio - Database GUI (no Prisma)
# Usage: npm run studio  or  npm run db:studio
# Or: bash scripts/studio.sh

STUDIO_PORT=4983

echo "╔════════════════════════════════════════════════════════╗"
echo "║         Drizzle Studio — Database UI                  ║"
echo "║   DIRECT_URL or DATABASE_URL from .env.local used      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Free port if already in use (e.g. previous Studio from start script)
if lsof -ti :$STUDIO_PORT >/dev/null 2>&1; then
    echo "▶ Freeing port $STUDIO_PORT (previous Drizzle Studio)..."
    lsof -ti :$STUDIO_PORT | xargs kill -9 2>/dev/null || true
    sleep 1
    echo "✅ Port $STUDIO_PORT free"
    echo ""
fi

# Load env so DIRECT_URL/DATABASE_URL is set (npm run does not load .env)
if [ -f .env.local ]; then set -a; . ./.env.local; set +a; fi
if [ -f .env ]; then set -a; . ./.env; set +a; fi

# Check if Postgres is running (tutorme-db = start script OR docker-compose)
if ! docker ps 2>/dev/null | grep -q tutorme-db; then
    echo "⚠️  Postgres container 'tutorme-db' is not running."
    echo "   Drizzle Studio will show 'pgbouncer cannot connect to server' until Postgres is up."
    echo ""
    echo "   Choose one:"
    echo "   • Standalone Postgres on 5433:  docker run -d --name tutorme-db -e POSTGRES_USER=tutorme -e POSTGRES_PASSWORD=tutorme_password -e POSTGRES_DB=tutorme -p 5433:5432 postgres:16-alpine"
    echo "   • Docker-compose (Postgres 5432, PgBouncer 5433):  docker-compose up -d db"
    echo "     Then in .env.local set DIRECT_URL=\"postgresql://postgres:postgres_password@localhost:5432/tutorme\""
    echo ""
fi

echo "🚀 Starting Drizzle Studio on port $STUDIO_PORT..."
echo ""
echo "   Open in browser: https://local.drizzle.studio"
echo "   (Studio server listens on port $STUDIO_PORT)"
echo ""
echo "   Press Ctrl+C to stop"
echo ""

npx drizzle-kit studio --port $STUDIO_PORT
