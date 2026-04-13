#!/bin/bash
# Reset everything - WARNING: This deletes all data!

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}/.."

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
echo "  - Reset to clean state"
echo ""
if [ "${RESET_CONFIRM:-}" != "1" ]; then
    read -p "Are you sure? Type 'yes' to continue: " confirm
    if [ "$confirm" != "yes" ]; then
        echo "Cancelled."
        exit 0
    fi
fi

echo ""
echo "[→] Stopping Docker containers..."
docker-compose down -v

echo "[→] Starting fresh containers..."
docker-compose up -d

echo "[→] Waiting for database..."
sleep 5

echo "[→] Running initial migration..."
npm run db:migrate

echo "[→] Seeding database..."
npm run db:seed

echo ""
echo "Reset complete! Run 'bash scripts/dev.sh' to start the app."
