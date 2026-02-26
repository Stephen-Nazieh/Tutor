#!/bin/bash
# Apply the migration that renames "value" columns so Prisma Studio works.
# Run this ONCE when your database is already running (e.g. after ~/tutorme-start.sh).
# Usage: from repo root: bash scripts/apply-studio-fix.sh
#    or: npm run db:migrate:deploy

set -e
cd "$(dirname "$0")/.."

echo "Applying pending Prisma migrations (fixes Prisma Studio count-query error)..."
npx prisma migrate deploy
echo "Done. Restart Prisma Studio and use 'Force reload to clear temporary data' if it was already open."
