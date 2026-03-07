#!/bin/bash
# Start development environment
# This script starts Docker, runs migrations, seeds data, and starts the dev server

set -e  # Exit on error

cd /Users/nazy/ADK_WORKSPACE/Solocornkimi/tutorme-app

# Ensure .env file exists
if [ ! -f ".env" ]; then
    echo "[→] Creating .env file from .env.local..."
    cp .env.local .env
fi

echo "========================================"
echo "  Solocorn Development Environment"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}[X] Docker is not running${NC}"
    echo "Please start Docker Desktop first, then run this script again."
    exit 1
fi

# Check if Docker containers are running
if ! docker ps | grep -q tutorme-db; then
    echo -e "${YELLOW}[→] Starting Docker containers...${NC}"
    docker-compose up -d
    
    # Wait for database to be healthy
    echo -e "${YELLOW}[→] Waiting for database to be ready...${NC}"
    for i in {1..30}; do
        if docker exec tutorme-db pg_isready -U postgres > /dev/null 2>&1; then
            echo -e "${GREEN}[OK] Database is ready${NC}"
            break
        fi
        sleep 1
        echo -n "."
    done
    
    # Run migrations
    echo -e "${YELLOW}[→] Running database migrations (Drizzle)...${NC}"
    npm run db:migrate

    # Seed database (safe to re-run; failures are ignored)
    echo -e "${YELLOW}[→] Seeding database with sample data...${NC}"
    npm run db:seed || true
    
    # Seed admin system
    echo -e "${YELLOW}[→] Initializing admin dashboard...${NC}"
    if npx tsx src/scripts/seed-admin.ts 2>/dev/null; then
        echo -e "${GREEN}[OK] Admin system initialized${NC}"
    else
        echo -e "${YELLOW}[!] Admin system already initialized or skipped${NC}"
    fi
    
    echo -e "${GREEN}[OK] Database setup complete${NC}"
else
    echo -e "${GREEN}[OK] Docker containers already running${NC}"
fi

echo ""
echo -e "${GREEN}[→] Starting Next.js development server...${NC}"
echo ""
echo "  App URL: http://localhost:3003"
echo "  Student Dashboard: http://localhost:3003/student/dashboard"
echo "  Tutor Dashboard: http://localhost:3003/tutor/dashboard"
echo "  Admin Dashboard: http://localhost:3003/admin"
echo "    - Email: admin@tutorme.com"
echo "    - Password: admin123"
echo "  Database UI: npm run db:studio (Drizzle Studio on :4983)"
echo "  Health Check: http://localhost:3003/api/health"
echo "  AI Status: http://localhost:3003/api/ai/status"
echo ""
echo -e "${YELLOW}  Press Ctrl+C to stop${NC}"
echo ""

npm run dev
