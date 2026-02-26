#!/bin/bash

# TutorMe Initialize Script
# Sets up database (port 5433 to avoid conflicts) and starts the app
# Usage: npm run initialize
# Or: bash scripts/initialize.sh

set -e  # Exit on error

echo "╔════════════════════════════════════════════════════════╗"
echo "║         TutorMe Initialization Tool                    ║"
echo "║     Database + Migrations + Seeding + Dev Server       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# Configuration
DB_PORT=5433
REDIS_PORT=6379

# Check if Docker is running
echo -e "${BLUE}▶ Checking Docker Desktop...${NC}"
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker Desktop is not running!${NC}"
    echo "   Please start Docker Desktop first."
    echo "   Download: https://www.docker.com/products/docker-desktop"
    exit 1
fi
echo -e "${GREEN}✅ Docker is running${NC}"
echo ""

# Check for port conflicts on 5433
echo -e "${BLUE}▶ Checking port $DB_PORT for PostgreSQL...${NC}"
if lsof -Pi :$DB_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    PORT_PID=$(lsof -Pi :$DB_PORT -sTCP:LISTEN -t)
    echo -e "${YELLOW}⚠️  Port $DB_PORT is already in use!${NC}"
    echo "   Process ID: $PORT_PID"
    echo ""
    read -p "   Kill the process using port $DB_PORT? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill -9 $PORT_PID 2>/dev/null || true
        sleep 1
        echo -e "${GREEN}✅ Port $DB_PORT freed${NC}"
    else
        echo -e "${RED}❌ Cannot continue - port $DB_PORT is required${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Port $DB_PORT is available${NC}"
fi
echo ""

# Stop and remove old container if exists (from port 5432)
if docker ps -a | grep -q "tutorme-db"; then
    echo -e "${BLUE}▶ Cleaning up old database container...${NC}"
    docker stop tutorme-db 2>/dev/null || true
    docker rm tutorme-db 2>/dev/null || true
    echo -e "${GREEN}✅ Old container removed${NC}"
    echo ""
fi

# Create PostgreSQL container with port 5433
echo -e "${BLUE}▶ Creating PostgreSQL database on port $DB_PORT...${NC}"
docker run -d --name tutorme-db \
  -e POSTGRES_USER=tutorme \
  -e POSTGRES_PASSWORD=tutorme_password \
  -e POSTGRES_DB=tutorme \
  -p $DB_PORT:5432 \
  postgres:16-alpine

# Wait for database to be ready
echo "   Waiting for database to initialize..."
RETRY_COUNT=0
MAX_RETRIES=10

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker exec tutorme-db pg_isready -U tutorme > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PostgreSQL is ready${NC}"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
            echo -e "${RED}❌ Database failed to start${NC}"
            docker logs tutorme-db --tail 20
            exit 1
        fi
        echo "   Waiting... ($RETRY_COUNT/$MAX_RETRIES)"
        sleep 2
    fi
done
echo ""

# Create Redis container
echo -e "${BLUE}▶ Creating Redis cache...${NC}"
if docker ps | grep -q tutorme-redis; then
    echo -e "${GREEN}✅ Redis is already running${NC}"
elif docker ps -a | grep -q tutorme-redis; then
    docker start tutorme-redis
    echo -e "${GREEN}✅ Redis started${NC}"
else
    docker run -d --name tutorme-redis \
      -p $REDIS_PORT:6379 \
      redis:7-alpine
    echo -e "${GREEN}✅ Redis created and started${NC}"
fi
echo ""

# Update .env.local with correct port
echo -e "${BLUE}▶ Configuring environment...${NC}"
if [ -f ".env.local" ]; then
    # Update existing DATABASE_URL if it uses port 5432
    if grep -q "localhost:5432" .env.local; then
        sed -i '' 's/localhost:5432/localhost:5433/g' .env.local
        echo -e "${GREEN}✅ Updated .env.local to use port 5433${NC}"
    elif grep -q "localhost:5433" .env.local; then
        echo -e "${GREEN}✅ .env.local already configured for port 5433${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not find DATABASE_URL in .env.local${NC}"
        echo "   Please add: DATABASE_URL=postgresql://tutorme:tutorme_password@localhost:5433/tutorme"
    fi
else
    # Create .env.local from example
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        sed -i '' 's/localhost:5432/localhost:5433/g' .env.local
        echo -e "${GREEN}✅ Created .env.local from example (port 5433)${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.local not found - creating minimal version${NC}"
        cat > .env.local << 'ENVFILE'
DATABASE_URL="postgresql://tutorme:tutorme_password@localhost:5433/tutorme"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your-secret-key-here-min-32-chars-long"
NEXTAUTH_URL="http://localhost:3003"
NEXT_PUBLIC_APP_URL="http://localhost:3003"
ENVFILE
        echo -e "${GREEN}✅ Created minimal .env.local${NC}"
    fi
fi
echo ""

# Run Prisma migrations
echo -e "${BLUE}▶ Running database migrations...${NC}"
MIGRATE_OUTPUT=$(npx prisma migrate dev --name init 2>&1)
MIGRATE_STATUS=$?

if [ $MIGRATE_STATUS -eq 0 ]; then
    echo -e "${GREEN}✅ Migrations complete${NC}"
else
    echo -e "${YELLOW}⚠️  Migration output:${NC}"
    echo "$MIGRATE_OUTPUT" | tail -20
    echo ""
    echo "   Trying to generate Prisma client..."
    npx prisma generate
fi
echo ""

# Seed test curriculum
echo -e "${BLUE}▶ Seeding test curriculum...${NC}"
if npx tsx scripts/seed-curriculum.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Curriculum seeded${NC}"
else
    echo -e "${YELLOW}⚠️  Curriculum seeding skipped (may already exist)${NC}"
fi
echo ""

# Summary
echo "╔════════════════════════════════════════════════════════╗"
echo "║         ✅ Initialization Complete!                    ║"
echo "╠════════════════════════════════════════════════════════╣"
echo "║                                                        ║"
echo "║  🗄️  Database:  postgresql://localhost:$DB_PORT        ║"
echo "║  ⚡ Redis:      localhost:$REDIS_PORT                  ║"
echo "║  🔑 Auth:       NEXTAUTH_SECRET configured             ║"
echo "║                                                        ║"
echo "╠════════════════════════════════════════════════════════╣"
docker ps --format "║  {{.Names}} - {{.Status}}" 2>/dev/null | grep -E "tutorme-db|tutorme-redis" || echo "║  (No containers)"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Start the development server
echo -e "${CYAN}🚀 Starting development server...${NC}"
echo ""
echo "   The app will be available at:"
echo -e "   ${GREEN}http://localhost:3003${NC}"
echo ""
echo "   To view/edit database (in a NEW terminal):"
echo -e "   ${YELLOW}npm run db:studio${NC} (Drizzle Studio)"
echo "   Then open: https://local.drizzle.studio"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""

# Start both servers concurrently
trap 'echo ""; echo -e "${YELLOW}🛑 Shutting down...${NC}"; docker stop tutorme-db tutorme-redis 2>/dev/null || true; exit 0' INT

# Start dev server
npm run dev
