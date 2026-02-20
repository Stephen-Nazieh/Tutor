#!/bin/bash

# Fix Database Configuration Script
# Ensures TutorMe uses port 5433 and has proper schema

echo "╔════════════════════════════════════════════════════════╗"
echo "║      Fixing Database Configuration                     ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check current containers
echo "▶ Current Docker containers:"
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}" | grep -E "tutorme|postgres" || echo "   No postgres containers found"
echo ""

# Check what's on port 5432 vs 5433
echo "▶ Checking port usage:"
echo "   Port 5432:"
lsof -Pi :5432 -sTCP:LISTEN 2>/dev/null | grep -v "^COMMAND" | head -3 || echo "     (not in use by this process)"

echo "   Port 5433:"
lsof -Pi :5433 -sTCP:LISTEN 2>/dev/null | grep -v "^COMMAND" | head -3 || echo "     (not in use)"
echo ""

# Check if tutorme-db exists and what port it's on
echo "▶ Checking tutorme-db container:"
if docker ps | grep -q tutorme-db; then
    echo "   Status: Running"
    docker port tutorme-db 2>/dev/null | grep 5432 || echo "   Port mapping unknown"
else
    echo "   Status: NOT RUNNING"
fi
echo ""

# Check DATABASE_URL in .env.local
echo "▶ Checking .env.local configuration:"
if [ -f ".env.local" ]; then
    grep "DATABASE_URL" .env.local || echo "   DATABASE_URL not found!"
else
    echo "   .env.local not found!"
fi
echo ""

# Show migration status
echo "▶ Checking Prisma migration status:"
npx prisma migrate status 2>&1 | head -20
echo ""

# Recommendations
echo "╔════════════════════════════════════════════════════════╗"
echo "║      Recommendations                                   ║"
echo "╠════════════════════════════════════════════════════════╣"

if docker ps | grep -q "tutorme-db.*5433"; then
    echo "║  ✅ tutorme-db is running on port 5433                 ║"
elif docker ps | grep -q "tutorme-db.*5432"; then
    echo "║  ⚠️  tutorme-db is on port 5432 (should be 5433)       ║"
    echo "║                                                        ║"
    echo "║  Run these commands to fix:                            ║"
    echo "║  docker stop tutorme-db                                ║"
    echo "║  docker rm tutorme-db                                  ║"
    echo "║  docker run -d --name tutorme-db \                     ║"
    echo "║    -e POSTGRES_USER=tutorme \                          ║"
    echo "║    -e POSTGRES_PASSWORD=tutorme_password \             ║"
    echo "║    -e POSTGRES_DB=tutorme \                            ║"
    echo "║    -p 5433:5432 postgres:16-alpine                     ║"
else
    echo "║  ❌ tutorme-db container not found                     ║"
    echo "║                                                        ║"
    echo "║  Run: npm run initialize                               ║"
fi

echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Ask to fix
read -p "Run automatic fix? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "▶ Stopping and removing old container..."
    docker stop tutorme-db 2>/dev/null || true
    docker rm tutorme-db 2>/dev/null || true
    
    echo "▶ Creating new container on port 5433..."
    docker run -d --name tutorme-db \
      -e POSTGRES_USER=tutorme \
      -e POSTGRES_PASSWORD=tutorme_password \
      -e POSTGRES_DB=tutorme \
      -p 5433:5432 \
      postgres:16-alpine
    
    echo "▶ Waiting for database..."
    sleep 5
    
    echo "▶ Updating .env.local..."
    if [ -f ".env.local" ]; then
        sed -i '' 's/localhost:5432/localhost:5433/g' .env.local 2>/dev/null || \
        sed -i 's/localhost:5432/localhost:5433/g' .env.local
        echo "   ✅ Updated DATABASE_URL to port 5433"
    fi
    
    echo "▶ Running migrations..."
    npx prisma migrate dev --name init
    
    echo "▶ Seeding curriculum..."
    npx tsx scripts/seed-curriculum.ts
    
    echo ""
    echo "✅ Database fixed! Try registering again."
fi
