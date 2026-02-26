#!/bin/bash
# Setup database only

cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app

# Ensure .env file exists
if [ ! -f ".env" ]; then
    cp .env.local .env
fi

echo "Setting up database..."

docker-compose up -d db redis

sleep 5

echo "Running migrations..."
npx drizzle-kit push

echo "Generating schemas..."
npx drizzle-kit generate
npx prisma generate # Required temporarily until Phase 3 query migration is complete

echo "Initializing admin system..."
npx tsx src/scripts/seed-admin.ts

echo ""
echo "Database ready!"
echo "Admin credentials:"
echo "  URL: http://localhost:3003/admin"
echo "  Email: admin@tutorme.com"
echo "  Password: admin123"
