#!/bin/bash
# Apply pending Drizzle migrations for Studio compatibility.
# Run this ONCE when your database is already running (e.g. after ~/tutorme-start.sh).
# Usage: from repo root: bash scripts/apply-studio-fix.sh
#    or: npm run db:migrate

set -e
cd "$(dirname "$0")/.."

echo "Applying pending Drizzle migrations..."
npm run db:migrate
echo "Done. Restart Drizzle Studio (https://local.drizzle.studio) if it was already open."
