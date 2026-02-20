#!/bin/bash

# Batch fix remaining Prisma Client instances in API routes

echo "🔧 Batch fixing remaining Prisma Client instances..."
echo ""

# Get list of files with new Prisma Client
FILES=$(grep -r "new PrismaClient()" src/ --include="*.ts" --include="*.tsx" -l | grep -v "src/lib/db/index.ts")

COUNT=0

for file in $FILES; do
  echo "Fixing: $file"
  
  # Remove PrismaClient import line
  sed -i '' '/^import { PrismaClient } from/d' "$file"
  
  # Remove const prisma = new PrismaClient() line
  sed -i '' '/^const prisma = new PrismaClient()/d' "$file"
  
  # Add db import after the last import (if not already present)
  if ! grep -q "import { db } from '@/lib/db'" "$file"; then
    # Find line number of last import
    LAST_IMPORT_LINE=$(grep -n "^import" "$file" | tail -1 | cut -d: -f1)
    
    if [ -n "$LAST_IMPORT_LINE" ]; then
      # Add new import after last import
      sed -i '' "${LAST_IMPORT_LINE}a\\
import { db } from '@/lib/db'
" "$file"
    fi
  fi
  
  # Replace all prisma. with db.
  sed -i '' 's/\bprisma\./db./g' "$file"
  
  ((COUNT++))
done

echo ""
echo "✅ Fixed $COUNT files"
echo ""
echo "Running final audit..."
./scripts/audit-prisma.sh
