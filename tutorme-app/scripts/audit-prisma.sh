#!/bin/bash

# Audit Prisma Client Usage
# This script finds all instances of "new PrismaClient()" to identify memory leak sources

echo "================================================"
echo "Prisma Client Audit Report"
echo "================================================"
echo ""

echo "🔍 Searching for 'new PrismaClient()' instances..."
echo ""

# Find all occurrences
RESULTS=$(grep -r "new PrismaClient()" src/ --include="*.ts" --include="*.tsx" 2>/dev/null)

if [ -z "$RESULTS" ]; then
    echo "✅ No instances of 'new PrismaClient()' found outside of singleton!"
    echo ""
    exit 0
fi

echo "⚠️  Found instances in the following files:"
echo "------------------------------------------------"
echo "$RESULTS"
echo "------------------------------------------------"
echo ""

# Count occurrences
COUNT=$(echo "$RESULTS" | wc -l | xargs)
echo "📊 Total instances found: $COUNT"
echo ""

# Check if singleton is being used correctly
echo "🔍 Checking singleton usage pattern..."
SINGLETON_CHECK=$(grep -r "import { db } from" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l | xargs)
echo "✅ Files using singleton pattern: $SINGLETON_CHECK"
echo ""

echo "================================================"
echo "Recommendation:"
echo "================================================"
echo "Replace all 'new PrismaClient()' instances with:"
echo "  import { db } from '@/lib/db'"
echo ""
echo "Expected result: 0 instances (singleton pattern only)"
echo "Current result: $COUNT instances"
echo "================================================"
