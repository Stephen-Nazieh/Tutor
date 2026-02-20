#!/bin/bash

# Test Registration API
# Usage: bash scripts/test-register.sh

echo "╔════════════════════════════════════════════════════════╗"
echo "║      Testing Registration API                          ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Test data
TEST_EMAIL="testuser$(date +%s)@example.com"
TEST_PASSWORD="password123"
TEST_NAME="Test User"

echo "Testing with:"
echo "  Email: $TEST_EMAIL"
echo "  Name: $TEST_NAME"
echo "  Role: STUDENT"
echo ""

# Make API request
echo "Sending registration request..."
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3003/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$TEST_NAME\",\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\",\"role\":\"STUDENT\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "Response Status: $HTTP_CODE"
echo "Response Body: $BODY"
echo ""

if [ "$HTTP_CODE" = "201" ]; then
    echo "✅ Registration SUCCESS!"
    echo ""
    echo "You can now log in with:"
    echo "  Email: $TEST_EMAIL"
    echo "  Password: $TEST_PASSWORD"
elif [ "$HTTP_CODE" = "409" ]; then
    echo "⚠️  User already exists"
elif [ "$HTTP_CODE" = "500" ]; then
    echo "❌ Server error (check console logs)"
else
    echo "❌ Unexpected response"
fi

echo ""
echo "Check server console for detailed error logs."
