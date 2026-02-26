#!/usr/bin/env bash
# Runs on EC2 via SSM. Pulls latest code, builds app image, runs stack + migrations.
# Usage: from repo root on EC2, or pass REPO_ROOT (e.g. /opt/tutorme).
set -e

REPO_ROOT="${REPO_ROOT:-/opt/tutorme}"
APP_DIR="${REPO_ROOT}/tutorme-app"

echo "[deploy] Repo root: $REPO_ROOT"
if [[ ! -d "$REPO_ROOT/.git" ]]; then
  echo "[deploy] ERROR: $REPO_ROOT is not a git repo. Clone it first (see docs/AWS_DEPLOY.md)."
  exit 1
fi

cd "$REPO_ROOT"
echo "[deploy] Fetching and checking out main..."
git fetch origin main
git checkout -B main origin/main

cd "$APP_DIR"
if [[ ! -f .env ]]; then
  echo "[deploy] WARNING: .env not found. Create it (see docs/AWS_DEPLOY.md)."
fi

# Prefer Docker Compose V2 plugin; fallback to standalone binary
COMPOSE="docker compose"
if ! docker compose version >/dev/null 2>&1; then COMPOSE="docker-compose"; fi

echo "[deploy] Building and starting containers (profile prod)..."
$COMPOSE --profile prod build --pull
$COMPOSE --profile prod up -d

echo "[deploy] Waiting for db to be ready..."
for i in $(seq 1 60); do
  if $COMPOSE exec -T db pg_isready -U postgres -d tutorme 2>/dev/null; then
    break
  fi
  sleep 2
done

echo "[deploy] Running migrations..."
$COMPOSE exec -T app npx prisma migrate deploy || true

echo "[deploy] Done."
$COMPOSE --profile prod ps
