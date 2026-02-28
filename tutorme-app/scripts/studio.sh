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

# Workaround: drizzle-kit may require localhost-key.pem / localhost.pem in app support (see drizzle-orm#3455)
STUDIO_DIR=""
if [ -n "$HOME" ]; then
  case "$(uname -s)" in
    Darwin)  STUDIO_DIR="$HOME/Library/Application Support/drizzle-studio" ;;
    MINGW*|MSYS*) STUDIO_DIR="$HOME/AppData/Local/drizzle-studio" ;;
    *)       STUDIO_DIR="$HOME/.local/share/drizzle-studio" ;;
  esac
fi
if [ -n "$STUDIO_DIR" ] && [ ! -d "$STUDIO_DIR" ]; then
  mkdir -p "$STUDIO_DIR"
fi
if [ -n "$STUDIO_DIR" ]; then
  for f in localhost-key.pem localhost.pem; do
    if [ ! -f "$STUDIO_DIR/$f" ]; then
      touch "$STUDIO_DIR/$f"
    fi
  done
fi

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
echo "   (Backend listens on port $STUDIO_PORT; use Chrome/Firefox if Safari/Brave show an error)"
echo ""
echo "   If you see 'Unexpected error' on that page, see docs/DRIZZLE_STUDIO.md or use: npx prisma studio → http://localhost:5555"
echo ""
echo "   Press Ctrl+C to stop"
echo ""

npx drizzle-kit studio --port $STUDIO_PORT
