#!/bin/bash

# API Route Refactoring Helper
# Identifies API routes that need refactoring to use new middleware/validation

echo "================================================"
echo "API Route Refactoring Analysis"
echo "================================================"
echo ""

# Find all route.ts files
API_ROUTES=$(find src/app/api -name "route.ts" -type f)

echo "📊 Total API route files found: $(echo "$API_ROUTES" | wc -l | xargs)"
echo ""

echo "🔍 Analyzing routes for refactoring opportunities..."
echo ""

# Categories
NEEDS_REFACTOR=0
ALREADY_REFACTORED=0
NO_AUTH=0

for route in $API_ROUTES; do
  if grep -q "withAuth" "$route"; then
    ((ALREADY_REFACTORED++))
  elif grep -q "getServerSession" "$route"; then
    ((NEEDS_REFACTOR++))
    echo "⚠️  Needs refactor: $route"
  else
    ((NO_AUTH++))
  fi
done

echo ""
echo "================================================"
echo "Summary:"
echo "================================================"
echo "✅ Already refactored: $ALREADY_REFACTORED"
echo "⚠️  Needs refactoring: $NEEDS_REFACTOR"
echo "ℹ️  No auth (may not need): $NO_AUTH"
echo ""

# Detailed analysis for routes needing refactor
echo "================================================"
echo "Routes needing refactoring (detailed):"
echo "================================================"
echo ""

for route in $API_ROUTES; do
  if grep -q "getServerSession" "$route" && ! grep -q "withAuth" "$route"; then
    echo "File: $route"
    
    # Check for validation
    if grep -q "zod\|z\." "$route"; then
      echo "  ✅ Has validation"
    else
      echo "  ❌ Needs validation"
    fi
    
    # Check for role checks
    if grep -q "role.*TUTOR\|role.*STUDENT\|role.*ADMIN" "$route"; then
      ROLE=$(grep -o "role.*TUTOR\|role.*STUDENT\|role.*ADMIN" "$route" | head -1 | awk '{print $NF}' | tr -d "'\"")
      echo "  🔐 Role check: $ROLE"
    else
      echo "  ⚠️  No role check"
    fi
    
    # Count lines
    LINES=$(wc -l < "$route" | xargs)
    echo "  📏 Lines: $LINES"
    
    echo ""
  fi
done

echo "================================================"
echo "Recommended Action:"
echo "================================================"
echo "1. Refactor $NEEDS_REFACTOR routes using withAuth pattern"
echo "2. Add Zod validation schemas where missing"
echo "3. Expected code reduction: 40-60%"
echo ""
