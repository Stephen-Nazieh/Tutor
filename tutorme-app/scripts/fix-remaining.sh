#!/bin/bash
# Targeted fixes for remaining TypeScript errors
# This script handles specific patterns that don't affect test mocks

echo "Applying targeted fixes..."

#==============================================================================
# FIX 1: Session tables (liveSession.id -> liveSession.sessionId)
#==============================================================================
echo "Fixing liveSession ID references..."
find src/app/api/sessions -type f -name "*.ts" ! -name "*.test.ts" -exec sed -i '' \
  -e 's/liveSession\.id,/liveSession.sessionId,/g' \
  -e 's/liveSession\.id}/liveSession.sessionId}/g' \
  -e 's/eq(liveSession\.id,/eq(liveSession.sessionId,/g' \
  -e 's/eq(liveSessionTable\.id,/eq(liveSessionTable.sessionId,/g' \
  {} \;

#==============================================================================
# FIX 2: Session participant (sessionParticipant.id -> participantId)
#==============================================================================
echo "Fixing sessionParticipant ID references..."
find src/app/api/sessions -type f -name "*.ts" ! -name "*.test.ts" -exec sed -i '' \
  -e 's/sessionParticipant\.id,/sessionParticipant.participantId,/g' \
  -e 's/sessionParticipant\.id}/sessionParticipant.participantId}/g' \
  -e 's/eq(sessionParticipant\.id,/eq(sessionParticipant.participantId,/g' \
  {} \;

#==============================================================================
# FIX 3: Whiteboard tables
#==============================================================================
echo "Fixing whiteboard ID references..."
find src/app/api/sessions -type f -name "*.ts" ! -name "*.test.ts" -exec sed -i '' \
  -e 's/whiteboard\.id,/whiteboard.whiteboardId,/g' \
  -e 's/whiteboard\.id}/whiteboard.whiteboardId}/g' \
  -e 's/eq(whiteboard\.id,/eq(whiteboard.whiteboardId,/g' \
  -e 's/whiteboardPage\.id,/whiteboardPage.pageId,/g' \
  -e 's/whiteboardPage\.id}/whiteboardPage.pageId}/g' \
  -e 's/eq(whiteboardPage\.id,/eq(whiteboardPage.pageId,/g' \
  {} \;

#==============================================================================
# FIX 4: Reports - user.id -> user.userId
#==============================================================================
echo "Fixing reports user ID references..."
find src/app/api/reports -type f -name "*.ts" ! -name "*.test.ts" -exec sed -i '' \
  -e 's/user\.id,/user.userId,/g' \
  -e 's/user\.id}/user.userId}/g' \
  -e 's/eq(user\.id,/eq(user.userId,/g' \
  -e 's/inArray(user\.id,/inArray(user.userId,/g' \
  {} \;

#==============================================================================
# FIX 5: Reports - course.id -> course.courseId
#==============================================================================
echo "Fixing reports course ID references..."
find src/app/api/reports -type f -name "*.ts" ! -name "*.test.ts" -exec sed -i '' \
  -e 's/course\.id,/course.courseId,/g' \
  -e 's/course\.id}/course.courseId}/g' \
  -e 's/eq(course\.id,/eq(course.courseId,/g' \
  {} \;

#==============================================================================
# FIX 6: Remove subject field references (replaced with categories)
#==============================================================================
echo "Fixing subject field references..."
find src/app/api/reports -type f -name "*.ts" ! -name "*.test.ts" -exec sed -i '' \
  -e 's/course\.subject/course.categories[0]/g' \
  {} \;

echo "Done with targeted fixes!"
