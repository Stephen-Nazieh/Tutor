#!/bin/bash
# Complete setup script - Run this after cloning the repo or when things break

set -e

cd /Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app

echo "========================================"
echo "  TutorMe Complete Setup"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Environment file
echo -e "${YELLOW}[1/7] Setting up environment...${NC}"
if [ ! -f ".env" ]; then
    cp .env.local .env
    echo -e "${GREEN}[OK] Created .env file${NC}"
else
    echo -e "${GREEN}[OK] .env file already exists${NC}"
fi

# Step 2: Clean install dependencies
echo -e "${YELLOW}[2/7] Installing dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    npm install --legacy-peer-deps --ignore-scripts
    echo -e "${GREEN}[OK] Dependencies installed${NC}"
else
    echo -e "${GREEN}[OK] Dependencies already installed${NC}"
fi

# Step 3: Generate Prisma client
echo -e "${YELLOW}[3/7] Generating Prisma client...${NC}"
npx prisma generate
echo -e "${GREEN}[OK] Prisma client generated${NC}"

# Step 4: Start Docker
echo -e "${YELLOW}[4/7] Starting Docker containers...${NC}"
if ! docker ps | grep -q tutorme-db; then
    docker-compose down -v 2>/dev/null || true
    docker-compose up -d db redis
    
    echo -e "${YELLOW}    Waiting for database...${NC}"
    for i in {1..30}; do
        if docker exec tutorme-db pg_isready -U postgres > /dev/null 2>&1; then
            echo -e "${GREEN}[OK] Database is ready${NC}"
            break
        fi
        sleep 1
        echo -n "."
    done
else
    echo -e "${GREEN}[OK] Docker containers already running${NC}"
fi

# Step 5: Run migrations
echo -e "${YELLOW}[5/7] Running database migrations...${NC}"
npx prisma migrate dev --name init --skip-generate
echo -e "${GREEN}[OK] Migrations complete${NC}"

# Step 6: Seed data
echo -e "${YELLOW}[6/7] Seeding database...${NC}"
npx prisma db seed
echo -e "${GREEN}[OK] Database seeded${NC}"

# Step 7: Build
echo -e "${YELLOW}[7/7] Building application...${NC}"
npm run build
echo -e "${GREEN}[OK] Build complete${NC}"

echo ""
echo "========================================"
echo -e "${GREEN}  [OK] Setup Complete!${NC}"
echo "========================================"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3003"
echo ""
