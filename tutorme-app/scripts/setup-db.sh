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
npx prisma migrate dev --name init

echo "Generating Prisma client..."
npx prisma generate

echo "Initializing admin system..."
npx tsx src/scripts/seed-admin.ts

echo ""
echo "Database ready!"
echo "Admin credentials:"
echo "  URL: http://localhost:3003/admin"
echo "  Email: admin@tutorme.com"
echo "  Password: admin123"
