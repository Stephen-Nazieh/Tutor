#!/bin/bash

# TutorMe Start Script with Test Accounts
# Sets up database and creates 5 student + 5 tutor test accounts
# Usage: bash tutorme-start.sh

set -e  # Exit on error

echo "╔════════════════════════════════════════════════════════╗"
echo "║         TutorMe Start with Test Accounts               ║"
echo "║     Database + Test Users + Dev Server                 ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

# Configuration
DB_PORT=5433
REDIS_PORT=6379
API_URL="http://localhost:3003"

# Check if Docker is running
echo -e "${BLUE}▶ Checking Docker Desktop...${NC}"
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker Desktop is not running!${NC}"
    echo "   Please start Docker Desktop first."
    exit 1
fi
echo -e "${GREEN}✅ Docker is running${NC}"
echo ""

# Start database stack via docker-compose (Postgres :5432 + PgBouncer :5433 + Redis)
echo -e "${BLUE}▶ Starting database (Postgres + PgBouncer + Redis)...${NC}"
if [ -f "docker-compose.yml" ]; then
    docker-compose up -d db pgbouncer redis
    echo "   Waiting for Postgres to be healthy..."
    RETRY_COUNT=0
    MAX_RETRIES=30
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        if docker exec tutorme-db pg_isready -U postgres -d tutorme > /dev/null 2>&1; then
            echo -e "${GREEN}✅ PostgreSQL is ready (port 5432)${NC}"
            break
        fi
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
            echo -e "${RED}❌ Database failed to start${NC}"
            docker-compose logs db --tail 20
            exit 1
        fi
        sleep 1
    done
    echo -e "${GREEN}✅ PgBouncer (port $DB_PORT) and Redis ready${NC}"
else
    echo -e "${YELLOW}⚠️  docker-compose.yml not found; starting standalone containers...${NC}"
    docker run -d --name tutorme-db \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_PASSWORD=postgres_password \
      -e POSTGRES_DB=tutorme \
      -p 5432:5432 \
      postgres:16-alpine
    sleep 3
    if docker ps -a | grep -q tutorme-redis; then
        docker start tutorme-redis 2>/dev/null || true
    else
        docker run -d --name tutorme-redis -p $REDIS_PORT:6379 redis:7-alpine
    fi
    echo -e "${GREEN}✅ Standalone Postgres (5432) and Redis started${NC}"
fi
echo ""

# Update .env.local for docker-compose (Option B: Postgres 5432 + PgBouncer 5433)
echo -e "${BLUE}▶ Configuring environment...${NC}"
if [ -f "docker-compose.yml" ]; then
    ENV_DATABASE="DATABASE_URL=\"postgresql://postgres:postgres_password@localhost:$DB_PORT/tutorme\""
    ENV_DIRECT="DIRECT_URL=\"postgresql://postgres:postgres_password@localhost:5432/tutorme\""
    if [ -f ".env.local" ]; then
        (grep -q "DATABASE_URL=" .env.local && sed -i '' "s|DATABASE_URL=.*|$ENV_DATABASE|" .env.local) || echo "$ENV_DATABASE" >> .env.local
        (grep -q "DIRECT_URL=" .env.local && sed -i '' "s|DIRECT_URL=.*|$ENV_DIRECT|" .env.local) || echo "$ENV_DIRECT" >> .env.local
        echo -e "${GREEN}✅ .env.local updated (app → 5433, Studio → 5432)${NC}"
    else
        cat > .env.local << ENVFILE
# Production-ready: app via PgBouncer (5433), Studio via direct Postgres (5432)
$ENV_DATABASE
$ENV_DIRECT

REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your-secret-key-here-min-32-chars-long"
NEXTAUTH_URL="http://localhost:3003"
NEXT_PUBLIC_APP_URL="http://localhost:3003"
NODE_ENV="development"
ENVFILE
        echo -e "${GREEN}✅ Created .env.local for docker-compose stack${NC}"
    fi
else
    if [ -f ".env.local" ]; then
        grep -q "localhost:5433" .env.local || sed -i '' 's/localhost:5432/localhost:5433/g' .env.local
        echo -e "${GREEN}✅ .env.local configured${NC}"
    else
        [ -f ".env.example" ] && cp .env.example .env.local && sed -i '' 's/localhost:5432/localhost:5433/g' .env.local
        echo -e "${GREEN}✅ Created .env.local from example${NC}"
    fi
fi
echo ""

# Run Drizzle structure and fallback Prisma generator
echo -e "${BLUE}▶ Syncing database schemas...${NC}"
npx drizzle-kit push || true
npx drizzle-kit generate
npx prisma generate
echo -e "${GREEN}✅ Migrations complete${NC}"
echo ""

# Seed test curriculum
echo -e "${BLUE}▶ Seeding test curriculum...${NC}"
if npx tsx scripts/seed-curriculum.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Curriculum seeded${NC}"
else
    echo -e "${YELLOW}⚠️  Curriculum seeding skipped (may already exist)${NC}"
fi
echo ""

# Seed admin system
echo -e "${BLUE}▶ Initializing admin dashboard...${NC}"
if npx tsx src/scripts/seed-admin.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Admin system initialized${NC}"
else
    echo -e "${YELLOW}⚠️  Admin system seeding skipped (may already exist)${NC}"
fi
echo ""

# Function to create a user via API
create_user() {
    local name=$1
    local email=$2
    local password=$3
    local role=$4
    
    curl -s -X POST "$API_URL/api/auth/register" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$name\",\"email\":\"$email\",\"password\":\"$password\",\"role\":\"$role\"}" \
        -o /dev/null -w "%{http_code}"
}

# Start the dev server in the background for user creation
echo -e "${BLUE}▶ Starting dev server temporarily for user creation...${NC}"
npm run dev > /tmp/tutorme-dev.log 2>&1 &
DEV_PID=$!

# Wait for server to be ready
echo "   Waiting for server to start..."
SERVER_READY=false
for i in {1..30}; do
    if curl -s "$API_URL/api/health" > /dev/null 2>&1; then
        SERVER_READY=true
        break
    fi
    sleep 1
done

if [ "$SERVER_READY" = false ]; then
    echo -e "${YELLOW}⚠️  Server may not be fully ready, but continuing...${NC}"
fi
echo ""

# Create test accounts
echo -e "${BLUE}▶ Creating test accounts...${NC}"
echo ""

# Create 5 student accounts
echo -e "${CYAN}Creating Student Accounts...${NC}"
for i in {1..5}; do
    NAME="Student$i"
    EMAIL="student$i@gmail.com"
    PASSWORD="Student${i}@tutorme"
    
    echo -n "   Creating $NAME ($EMAIL)... "
    HTTP_CODE=$(create_user "$NAME" "$EMAIL" "$PASSWORD" "STUDENT")
    
    if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Created${NC}"
    elif [ "$HTTP_CODE" = "400" ]; then
        echo -e "${YELLOW}⚠️  Already exists${NC}"
    else
        echo -e "${RED}❌ Failed (HTTP $HTTP_CODE)${NC}"
    fi
done
echo ""

# Create 5 tutor accounts
echo -e "${CYAN}Creating Tutor Accounts...${NC}"
for i in {1..5}; do
    NAME="Tutor$i"
    EMAIL="tutor$i@gmail.com"
    PASSWORD="Tutor${i}@tutorme"
    
    echo -n "   Creating $NAME ($EMAIL)... "
    HTTP_CODE=$(create_user "$NAME" "$EMAIL" "$PASSWORD" "TUTOR")
    
    if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Created${NC}"
    elif [ "$HTTP_CODE" = "400" ]; then
        echo -e "${YELLOW}⚠️  Already exists${NC}"
    else
        echo -e "${RED}❌ Failed (HTTP $HTTP_CODE)${NC}"
    fi
done
echo ""

# Summary
echo "╔════════════════════════════════════════════════════════╗"
echo "║         ✅ Setup Complete!                             ║"
echo "╠════════════════════════════════════════════════════════╣"
echo "║                                                        ║"
echo "║  🔐 ADMIN DASHBOARD:                                   ║"
echo "║     URL: http://localhost:3003/admin                   ║"
echo "║     Email: admin@tutorme.com                           ║"
echo "║     Password: admin123                                 ║"
echo "║     Role: SUPER_ADMIN                                  ║"
echo "║                                                        ║"
echo "║  📚 STUDENT ACCOUNTS:                                  ║"
echo "║     Student1 / student1@gmail.com / Student1@tutorme   ║"
echo "║     Student2 / student2@gmail.com / Student2@tutorme   ║"
echo "║     Student3 / student3@gmail.com / Student3@tutorme   ║"
echo "║     Student4 / student4@gmail.com / Student4@tutorme   ║"
echo "║     Student5 / student5@gmail.com / Student5@tutorme   ║"
echo "║                                                        ║"
echo "║  👨‍🏫 TUTOR ACCOUNTS:                                   ║"
echo "║     Tutor1 / tutor1@gmail.com / Tutor1@tutorme         ║"
echo "║     Tutor2 / tutor2@gmail.com / Tutor2@tutorme         ║"
echo "║     Tutor3 / tutor3@gmail.com / Tutor3@tutorme         ║"
echo "║     Tutor4 / tutor4@gmail.com / Tutor4@tutorme         ║"
echo "║     Tutor5 / tutor5@gmail.com / Tutor5@tutorme         ║"
echo "║                                                        ║"
echo "╠════════════════════════════════════════════════════════╣"
echo "║  🌐 App URL:  http://localhost:3003                    ║"
echo "║  🗄️  Database: Postgres :5432, PgBouncer :$DB_PORT     ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo -e "${CYAN}🚀 Development server is running!${NC}"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""

# Open admin dashboard in browser
echo -e "${BLUE}▶ Opening admin dashboard in browser...${NC}"
sleep 2
if command -v open >/dev/null 2>&1; then
    # macOS
    open "$API_URL/admin"
elif command -v xdg-open >/dev/null 2>&1; then
    # Linux
    xdg-open "$API_URL/admin"
else
    echo -e "${YELLOW}⚠️  Please open: $API_URL/admin${NC}"
fi
echo ""

# Handle Ctrl+C to clean up
trap 'echo ""; echo -e "${YELLOW}🛑 Shutting down...${NC}"; kill $DEV_PID 2>/dev/null || true; [ -f docker-compose.yml ] && docker-compose stop db pgbouncer redis 2>/dev/null || true; docker stop tutorme-db tutorme-redis 2>/dev/null || true; exit 0' INT

# Wait for the dev server process
wait $DEV_PID
