#!/bin/bash

# Fix Prisma Client Memory Leak - Automated Replacement
# This script replaces all PrismaClient instantiations with singleton pattern

echo "🔧 Fixing Prisma Client instances..."
echo ""

# Files to fix
FILES=(
  "src/lib/feedback/workflow.ts"
  "src/lib/ai/task-generator.ts"
  "src/lib/whiteboard/history.ts"
  "src/lib/chat/summary.ts"
  "src/app/api/clinic/rooms/route.ts"
  "src/app/api/clinic/breakout/route.ts"
  "src/app/api/clinic/rooms/[id]/join/route.ts"
  "src/app/api/bookmarks/route.ts"
  "src/app/api/clinics/route.ts"
  "src/app/api/recommendations/route.ts"
  "src/app/api/onboarding/tutor/route.ts"
  "src/app/api/onboarding/student/route.ts"
  "src/app/api/content/route.ts"
  "src/app/api/user/profile/route.ts"
  "src/app/api/health/route.ts"
  "src/app/api/curriculums/list/route.ts"
  "src/app/api/study-groups/route.ts"
  "src/app/api/quiz/attempt/route.ts"
  "src/app/api/quiz/generate/route.ts"
  "src/app/api/student/subjects/route.ts"
  "src/app/api/student/subjects/enroll/route.ts"
  "src/app/api/student/subjects/unenroll/route.ts"
  "src/app/api/student/subjects/[subjectCode]/route.ts"
  "src/app/api/auth/register/route.ts"
  "src/app/api/achievements/route.ts"
  "src/app/api/progress/route.ts"
  "src/app/api/chat/summary/route.ts"
  "src/app/api/ai-tutor/usage/route.ts"
  "src/app/api/ai-tutor/lesson-context/route.ts"
  "src/app/api/ai-tutor/subscription/route.ts"
  "src/app/api/ai-tutor/enroll/route.ts"
  "src/app/api/ai-tutor/enrollments/route.ts"
  "src/app/api/tasks/generate/route.ts"
  "src/app/api/analytics/students/[studentId]/route.ts"
  "src/app/api/analytics/class/[classId]/route.ts"
  "src/app/api/reports/students/[studentId]/route.ts"
  "src/app/api/reports/class/[classId]/route.ts"
)

COUNT=0

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Check if file contains the problem
    if grep -q "new PrismaClient()" "$file"; then
      echo "Fixing: $file"
      
      # Remove the import and instantiation
      sed -i '' '/import { PrismaClient } from/d' "$file"
      sed -i '' '/const prisma = new PrismaClient()/d' "$file"
      
      # Add the import (if not already present)
      if ! grep -q "import { db } from '@/lib/db'" "$file"; then
        # Find the last import line and add after it
        sed -i '' '/^import/a\
import { db } from "@/lib/db"
' "$file"
      fi
      
      # Replace all prisma. with db.
      sed -i '' 's/prisma\./db./g' "$file"
      
      ((COUNT++))
    fi
  else
    echo "⚠️  File not found: $file"
  fi
done

echo ""
echo "✅ Fixed $COUNT files"
echo ""
echo "Running audit again..."
./scripts/audit-prisma.sh
