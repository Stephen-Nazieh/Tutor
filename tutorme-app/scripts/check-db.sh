#!/bin/bash

# TutorMe Database Diagnostic Script
# Usage: ./scripts/check-db.sh
# Or from project root: bash scripts/check-db.sh

set -e  # Exit on error

echo "╔════════════════════════════════════════════════════════╗"
echo "║         TutorMe Database Diagnostic Tool               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check for port conflicts
echo -e "${BLUE}▶ Checking for port conflicts...${NC}"
if lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null 2>&1; then
    PORT_PID=$(lsof -Pi :5432 -sTCP:LISTEN -t)
    echo -e "${YELLOW}⚠️  Port 5432 is already in use!${NC}"
    echo "   Process ID: $PORT_PID"
    echo "   Process: $(ps -p $PORT_PID -o comm= 2>/dev/null || echo 'unknown')"
    echo ""
    
    # Check if it's a Docker container
    DOCKER_CONTAINER=$(docker ps --filter "publish=5432" --format "{{.Names}}" 2>/dev/null)
    if [ -n "$DOCKER_CONTAINER" ]; then
        echo -e "${GREEN}✅ It's a Docker container: $DOCKER_CONTAINER${NC}"
        echo "   This is probably your database already running!"
        echo ""
    else
        echo "   This might be a local PostgreSQL installation."
        echo "   You can:"
        echo "   1. Stop the local PostgreSQL: brew services stop postgresql"
        echo "   2. Or use the existing database by updating DATABASE_URL"
        echo ""
        read -p "   Stop the process using port 5432? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "   Stopping process $PORT_PID..."
            kill -9 $PORT_PID 2>/dev/null || sudo kill -9 $PORT_PID 2>/dev/null || true
            sleep 2
            echo -e "${GREEN}✅ Port 5432 freed${NC}"
        fi
        echo ""
    fi
fi

# Check PostgreSQL container
echo -e "${BLUE}▶ Checking PostgreSQL database...${NC}"
if docker ps | grep -q tutorme-db; then
    echo -e "${GREEN}✅ PostgreSQL container is running${NC}"
elif docker ps -a | grep -q tutorme-db; then
    echo -e "${YELLOW}⚠️  PostgreSQL container exists but is stopped${NC}"
    echo "   Starting it now..."
    if docker start tutorme-db 2>/dev/null; then
        sleep 3
        echo -e "${GREEN}✅ PostgreSQL container started${NC}"
    else
        echo -e "${RED}❌ Failed to start container${NC}"
        echo "   Trying to recreate..."
        docker rm tutorme-db 2>/dev/null || true
        docker run -d --name tutorme-db \
          -e POSTGRES_USER=tutorme \
          -e POSTGRES_PASSWORD=tutorme_password \
          -e POSTGRES_DB=tutorme \
          -p 5432:5432 \
          postgres:16-alpine
        sleep 5
        echo -e "${GREEN}✅ PostgreSQL container recreated and started${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  PostgreSQL container not found${NC}"
    echo "   Creating new container..."
    
    # Check if port is free first
    if lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${RED}❌ Cannot create container - port 5432 is in use${NC}"
        echo "   Please free the port first (see above)"
        exit 1
    fi
    
    docker run -d --name tutorme-db \
      -e POSTGRES_USER=tutorme \
      -e POSTGRES_PASSWORD=tutorme_password \
      -e POSTGRES_DB=tutorme \
      -p 5432:5432 \
      postgres:16-alpine
    sleep 5
    echo -e "${GREEN}✅ PostgreSQL container created and started${NC}"
fi
echo ""

# Check Redis container
echo -e "${BLUE}▶ Checking Redis cache...${NC}"
if docker ps | grep -q tutorme-redis; then
    echo -e "${GREEN}✅ Redis container is running${NC}"
elif docker ps -a | grep -q tutorme-redis; then
    echo -e "${YELLOW}⚠️  Redis container exists but is stopped${NC}"
    echo "   Starting it now..."
    docker start tutorme-redis || echo -e "${RED}❌ Failed to start Redis${NC}"
    echo -e "${GREEN}✅ Redis container started${NC}"
else
    echo -e "${YELLOW}⚠️  Redis container not found${NC}"
    echo "   Creating new container..."
    docker run -d --name tutorme-redis \
      -p 6379:6379 \
      redis:7-alpine
    echo -e "${GREEN}✅ Redis container created and started${NC}"
fi
echo ""

# Test PostgreSQL connection
echo -e "${BLUE}▶ Testing database connection...${NC}"
RETRY_COUNT=0
MAX_RETRIES=5

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker exec tutorme-db psql -U tutorme -d tutorme -c "SELECT 1;" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Database connection successful${NC}"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
            echo -e "${RED}❌ Cannot connect to database after $MAX_RETRIES attempts${NC}"
            echo "   Container logs:"
            docker logs tutorme-db --tail 20
            exit 1
        fi
        echo "   Waiting for database to be ready... ($RETRY_COUNT/$MAX_RETRIES)"
        sleep 3
    fi
done
echo ""

# Check if tables exist
echo -e "${BLUE}▶ Checking database tables...${NC}"
TABLE_COUNT=$(docker exec tutorme-db psql -U tutorme -d tutorme -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | xargs || echo "0")

if [ "$TABLE_COUNT" -eq "0" ] 2>/dev/null || [ -z "$TABLE_COUNT" ]; then
    echo -e "${YELLOW}⚠️  No tables found in database${NC}"
    echo ""
    echo "   You need to run Drizzle migrations:"
    echo -e "   ${BLUE}cd tutorme-app${NC}"
    echo -e "   ${BLUE}npm run db:migrate${NC}"
    echo ""
    read -p "   Run migrations now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run db:migrate
    fi
else
    echo -e "${GREEN}✅ Found $TABLE_COUNT tables in database${NC}"
fi
echo ""

# Count users
echo -e "${BLUE}▶ Checking user accounts...${NC}"
USER_COUNT=$(docker exec tutorme-db psql -U tutorme -d tutorme -t -c 'SELECT COUNT(*) FROM "User";' 2>/dev/null | xargs || echo "0")

if [ "$USER_COUNT" -gt "0" ] 2>/dev/null; then
    echo -e "${GREEN}✅ Found $USER_COUNT user(s) in database${NC}"
    echo ""
    echo "   Recent users:"
    docker exec tutorme-db psql -U tutorme -d tutorme -c 'SELECT email, role, "createdAt" FROM "User" ORDER BY "createdAt" DESC LIMIT 5;' 2>/dev/null || echo "   (Could not fetch users)"
else
    echo -e "${YELLOW}⚠️  No users found (or User table doesn't exist)${NC}"
    echo "   You may need to:"
    echo "   1. Run migrations: npm run db:migrate"
    echo "   2. Register a test user at http://localhost:3003/register"
fi
echo ""

# Check curriculums
echo -e "${BLUE}▶ Checking curriculums...${NC}"
CURRICULUM_COUNT=$(docker exec tutorme-db psql -U tutorme -d tutorme -t -c 'SELECT COUNT(*) FROM "Curriculum";' 2>/dev/null | xargs || echo "0")

if [ "$CURRICULUM_COUNT" -gt "0" ] 2>/dev/null; then
    echo -e "${GREEN}✅ Found $CURRICULUM_COUNT curriculum(s)${NC}"
    echo ""
    docker exec tutorme-db psql -U tutorme -d tutorme -c 'SELECT code, name, category FROM "Curriculum";' 2>/dev/null || true
else
    echo -e "${YELLOW}⚠️  No curriculums found${NC}"
    echo "   To seed a test curriculum:"
    echo -e "   ${BLUE}npx tsx scripts/seed-curriculum.ts${NC}"
    echo ""
    read -p "   Seed IELTS curriculum now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npx tsx scripts/seed-curriculum.ts
    fi
fi
echo ""

# Summary
echo "╔════════════════════════════════════════════════════════╗"
echo "║                      Summary                           ║"
echo "╠════════════════════════════════════════════════════════╣"
docker ps --format "║  {{.Names}} - {{.Status}}" 2>/dev/null | grep -E "tutorme-db|tutorme-redis" || echo "║  (No TutorMe containers running)"
echo "║                                                        ║"
echo "║  Database URL: postgresql://tutorme:tutorme_password   ║"
echo "║                @localhost:5433/tutorme                 ║"
echo "║                                                        ║"
echo "║  DB UI: https://local.drizzle.studio (run db:studio)   ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Useful commands
echo "Useful commands:"
echo "  npm run dev           - Start development server"
echo "  npm run db:studio     - Open database GUI"
echo "  npm run db:migrate    - Run migrations"
echo ""

# Open Drizzle Studio (DB UI) option
if command -v npx &> /dev/null; then
    read -p "🚀 Open Drizzle Studio (DB UI) now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Opening Drizzle Studio..."
        npx drizzle-kit studio --port 4983
    fi
fi
