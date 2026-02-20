#!/bin/bash
# Reset everything - WARNING: This deletes all data!

set -e

cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app

# Ensure .env file exists
if [ ! -f ".env" ]; then
    echo "[→] Creating .env file from .env.local..."
    cp .env.local .env
fi

echo "========================================"
echo "  WARNING: FULL RESET"
echo "========================================"
echo ""
echo "This will:"
echo "  - Stop all Docker containers"
echo "  - DELETE all database data"
echo "  - DELETE all migration files"
echo "  - Reset to clean state"
echo ""
read -p "Are you sure? Type 'yes' to continue: " confirm

if [ "$confirm" != "yes" ]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "[→] Stopping Docker containers..."
docker-compose down -v

echo "[→] Removing migration files..."
rm -rf prisma/migrations

echo "[→] Starting fresh containers..."
docker-compose up -d

echo "[→] Waiting for database..."
sleep 5

echo "[→] Running initial migration..."
npx prisma migrate dev --name init

echo "[→] Generating Prisma client..."
npx prisma generate

echo "[→] Seeding database..."
npx prisma db seed

echo ""
echo "Reset complete! Run 'bash scripts/dev.sh' to start the app."
