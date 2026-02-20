#!/bin/bash

# Verify Database Setup
# Checks which database the app is actually using

echo "╔════════════════════════════════════════════════════════╗"
echo "║      Verifying Database Setup                          ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# 1. Check .env.local
echo "▶ Checking .env.local configuration:"
echo "   DATABASE_URL:"
grep DATABASE_URL .env.local | head -1
echo ""

# 2. Check all running containers
echo "▶ Docker containers with PostgreSQL:"
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}" | grep -E "postgres|tutorme" || echo "   No postgres containers"
echo ""

# 3. Check user count in both databases
echo "▶ User count in databases:"

echo "   Port 5433 (TutorMe):"
docker exec tutorme-db psql -U tutorme -d tutorme -c 'SELECT COUNT(*) as users FROM "User";' 2>/dev/null || echo "     (cannot connect)"

echo ""
echo "   Port 5432 (Nhost - for comparison):"
docker exec nhost-postgres-1 psql -U postgres -c 'SELECT COUNT(*) as users FROM "User";' 2>/dev/null || echo "     (nhost not running or different db)"
echo ""

# 4. Check which port the app is actually connecting to
echo "▶ Active connections to PostgreSQL ports:"
echo "   Connections to port 5432:"
lsof -Pi :5432 -sTCP:ESTABLISHED 2>/dev/null | grep -v "^COMMAND" | head -5 || echo "     (none)"

echo ""
echo "   Connections to port 5433:"
lsof -Pi :5433 -sTCP:ESTABLISHED 2>/dev/null | grep -v "^COMMAND" | head -5 || echo "     (none)"
echo ""

# 5. Test create a user directly via API
echo "▶ Testing API registration:"
TEST_EMAIL="verify$(date +%s)@test.com"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3003/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Verify Test\",\"email\":\"$TEST_EMAIL\",\"password\":\"password123\",\"role\":\"STUDENT\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
if [ "$HTTP_CODE" = "201" ]; then
    echo "   ✅ API returned 201 (created)"
    
    # Check if user exists in 5433
    sleep 1
    COUNT_5433=$(docker exec tutorme-db psql -U tutorme -d tutorme -t -c "SELECT COUNT(*) FROM \"User\" WHERE email = '$TEST_EMAIL';" 2>/dev/null | xargs)
    
    if [ "$COUNT_5433" = "1" ]; then
        echo "   ✅ User found in port 5433 database!"
    else
        echo "   ❌ User NOT found in port 5433 database"
        echo "      (App may be connecting to wrong database)"
    fi
else
    echo "   ❌ API returned $HTTP_CODE"
fi
echo ""

# 6. Recommendations
echo "╔════════════════════════════════════════════════════════╗"
echo "║      Diagnosis                                         ║"
echo "╠════════════════════════════════════════════════════════╣"

if [ "$COUNT_5433" = "1" ] 2>/dev/null; then
    echo "║  ✅ Database is working correctly!                     ║"
    echo "║                                                        ║"
    echo "║  If you don't see users in Prisma Studio:              ║"
    echo "║  1. Restart Prisma Studio (Ctrl+C then npm run studio) ║"
    echo "║  2. Refresh the page                                   ║"
else
    echo "║  ❌ App is not saving to port 5433 database            ║"
    echo "║                                                        ║"
    echo "║  The dev server needs to be restarted to pick up       ║"
    echo "║  the new DATABASE_URL in .env.local                    ║"
    echo "║                                                        ║"
    echo "║  Run these commands:                                   ║"
    echo "║  1. Stop the dev server (Ctrl+C in terminal)           ║"
    echo "║  2. npm run initialize                                 ║"
fi

echo "╚════════════════════════════════════════════════════════╝"
