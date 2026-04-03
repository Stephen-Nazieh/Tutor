#!/bin/bash
# Comprehensive script to fix TypeScript errors after schema migration
# This script handles ID field renames from generic 'id' to table-specific names

echo "Starting schema ID field fixes..."

#==============================================================================
# PATTERNS FOR USER TABLE
#==============================================================================
echo "Fixing user table ID references..."

# Fix user.id in various contexts (select columns, where clauses, etc.)
find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/\.id,/.userId,/g' \
  -e 's/\.id}/.userId}/g' \
  -e 's/\.id \?===\?/.userId ===/g' \
  -e 's/eq(user\.id,/eq(user.userId,/g' \
  -e 's/eq(user\.id)/eq(user.userId)/g' \
  -e 's/inArray(user\.id,/inArray(user.userId,/g' \
  -e 's/\.{ id: user\.id }/{ userId: user.userId }/g' \
  -e 's/{ id: user\.id,/{ userId: user.userId,/g' \
  -e 's/columns: { id: true/columns: { userId: true/g' \
  {} \;

# Fix specific destructuring patterns
find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/const { id } = user/const { userId } = user/g' \
  -e 's/const { id, email } = user/const { userId, email } = user/g' \
  -e 's/user\.id ===/user.userId ===/g' \
  {} \;

#==============================================================================
# PATTERNS FOR COURSE TABLE (formerly curriculum)
#==============================================================================
echo "Fixing course table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/curriculum\.id/curriculum.courseId/g' \
  -e 's/curriculumId:/courseId:/g' \
  -e 's/curriculumId,/courseId,/g' \
  -e 's/\.curriculumId/.courseId/g' \
  -e 's/eq(curriculum\.id,/eq(curriculum.courseId,/g' \
  -e 's/inArray(curriculum\.id,/inArray(curriculum.courseId,/g' \
  {} \;

# Fix course table direct references
find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/course\.id,/course.courseId,/g' \
  -e 's/course\.id}/course.courseId}/g' \
  -e 's/eq(course\.id,/eq(course.courseId,/g' \
  -e 's/columns: { id: true/columns: { courseId: true/g' \
  {} \;

#==============================================================================
# PATTERNS FOR LIVE SESSION TABLE
#==============================================================================
echo "Fixing liveSession table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/liveSession\.id/liveSession.sessionId/g' \
  -e 's/liveSessionTable\.id/liveSessionTable.sessionId/g' \
  -e 's/\.sessionId:/.sessionId:/g' \
  -e 's/eq(liveSession\.id,/eq(liveSession.sessionId,/g' \
  -e 's/eq(liveSessionTable\.id,/eq(liveSessionTable.sessionId,/g' \
  -e 's/columns: { id: true/columns: { sessionId: true/g' \
  {} \;

#==============================================================================
# PATTERNS FOR CLINIC TABLE
#==============================================================================
echo "Fixing clinic table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/clinic\.id,/clinic.clinicId,/g' \
  -e 's/clinic\.id}/clinic.clinicId}/g' \
  -e 's/eq(clinic\.id,/eq(clinic.clinicId,/g' \
  -e 's/columns: { id: true/columns: { clinicId: true/g' \
  {} \;

#==============================================================================
# PATTERNS FOR CLINIC BOOKING TABLE
#==============================================================================
echo "Fixing clinicBooking table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/clinicBooking\.id,/clinicBooking.bookingId,/g' \
  -e 's/clinicBooking\.id}/clinicBooking.bookingId}/g' \
  -e 's/eq(clinicBooking\.id,/eq(clinicBooking.bookingId,/g' \
  -e 's/eq(clinicBooking\.id)/eq(clinicBooking.bookingId)/g' \
  -e 's/columns: { id: true/columns: { bookingId: true/g' \
  {} \;

#==============================================================================
# PATTERNS FOR PAYMENT TABLE
#==============================================================================
echo "Fixing payment table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/payment\.id,/payment.paymentId,/g' \
  -e 's/payment\.id}/payment.paymentId}/g' \
  -e 's/eq(payment\.id,/eq(payment.paymentId,/g' \
  -e 's/eq(payment\.id)/eq(payment.paymentId)/g' \
  -e 's/columns: { id: true/columns: { paymentId: true/g' \
  {} \;

#==============================================================================
# PATTERNS FOR CONTENT ITEM TABLE
#==============================================================================
echo "Fixing contentItem table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/contentItem\.id,/contentItem.contentId,/g' \
  -e 's/contentItem\.id}/contentItem.contentId}/g' \
  -e 's/eq(contentItem\.id,/eq(contentItem.contentId,/g' \
  -e 's/inArray(contentItem\.id,/inArray(contentItem.contentId,/g' \
  -e 's/columns: { id: true/columns: { contentId: true/g' \
  {} \;

#==============================================================================
# PATTERNS FOR GENERATED TASK TABLE
#==============================================================================
echo "Fixing generatedTask table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/generatedTask\.id,/generatedTask.taskId,/g' \
  -e 's/generatedTask\.id}/generatedTask.taskId}/g' \
  -e 's/eq(generatedTask\.id,/eq(generatedTask.taskId,/g' \
  -e 's/task\.id,/task.taskId,/g' \
  -e 's/task\.id}/task.taskId}/g' \
  -e 's/columns: { id: true/columns: { taskId: true/g' \
  {} \;

#==============================================================================
# PATTERNS FOR COURSE ENROLLMENT TABLE
#==============================================================================
echo "Fixing courseEnrollment table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/curriculumEnrollment\.id/curriculumEnrollment.enrollmentId/g' \
  -e 's/courseEnrollment\.id,/courseEnrollment.enrollmentId,/g' \
  -e 's/courseEnrollment\.id}/courseEnrollment.enrollmentId}/g' \
  -e 's/eq(courseEnrollment\.id,/eq(courseEnrollment.enrollmentId,/g' \
  -e 's/columns: { id: true/columns: { enrollmentId: true/g' \
  {} \;

#==============================================================================
# PATTERNS FOR WHITEBOARD TABLES
#==============================================================================
echo "Fixing whiteboard table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/whiteboard\.id,/whiteboard.whiteboardId,/g' \
  -e 's/whiteboard\.id}/whiteboard.whiteboardId}/g' \
  -e 's/eq(whiteboard\.id,/eq(whiteboard.whiteboardId,/g' \
  -e 's/whiteboardPage\.id,/whiteboardPage.pageId,/g' \
  -e 's/whiteboardPage\.id}/whiteboardPage.pageId}/g' \
  -e 's/eq(whiteboardPage\.id,/eq(whiteboardPage.pageId,/g' \
  -e 's/whiteboardSnapshot\.id,/whiteboardSnapshot.snapshotId,/g' \
  -e 's/whiteboardSnapshot\.id}/whiteboardSnapshot.snapshotId}/g' \
  -e 's/eq(whiteboardSnapshot\.id,/eq(whiteboardSnapshot.snapshotId,/g' \
  {} \;

#==============================================================================
# PATTERNS FOR POLL TABLES
#==============================================================================
echo "Fixing poll table ID references..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/poll\.id,/poll.pollId,/g' \
  -e 's/poll\.id}/poll.pollId}/g' \
  -e 's/eq(poll\.id,/eq(poll.pollId,/g' \
  -e 's/pollResponse\.id,/pollResponse.responseId,/g' \
  -e 's/pollResponse\.id}/pollResponse.responseId}/g' \
  -e 's/eq(pollResponse\.id,/eq(pollResponse.responseId,/g' \
  -e 's/pollOption\.id,/pollOption.optionId,/g' \
  -e 's/eq(pollOption\.id,/eq(pollOption.optionId,/g' \
  {} \;

#==============================================================================
# INSERT OPERATIONS - Fix ID field names in insert values
#==============================================================================
echo "Fixing insert operations..."

find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/\.values({\n        id:/.values({\n        userId:/g' \
  -e 's/\.values({\n      id:/.values({\n      userId:/g' \
  {} \;

#==============================================================================
# RELATIONSHIP FIXES
#==============================================================================
echo "Fixing relationship references..."

# Fix with: { curriculum: to with: { course:
find src -type f -name "*.ts" -exec sed -i '' \
  -e 's/with: {\n                  curriculum:/with: {\n                  course:/g' \
  -e 's/with: {\n                curriculum:/with: {\n                course:/g' \
  -e 's/with: {\n              curriculum:/with: {\n              course:/g' \
  -e 's/with: {\n            curriculum:/with: {\n            course:/g' \
  -e 's/with: {\n          curriculum:/with: {\n          course:/g' \
  -e 's/with: { curriculum:/with: { course:/g' \
  {} \;

echo "Schema ID field fixes complete!"
echo ""
echo "IMPORTANT: Review all changes manually before committing!"
echo "Some patterns may need manual adjustment, especially:"
echo "  1. Type interface definitions"
echo "  2. Complex nested queries"
echo "  3. Insert operations with id: that should be specificId:"
echo "  4. Removed fields like subject, gradeLevel, difficulty, estimatedHours"
