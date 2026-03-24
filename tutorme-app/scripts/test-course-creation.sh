#!/bin/bash
#
# Test Script: Create, Schedule, and Publish a Course
# Usage: ./scripts/test-course-creation.sh [tutor_session_cookie]
#

set -e

# Configuration
BASE_URL="http://localhost:3003"
API_PREFIX="/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "${YELLOW}[STEP]${NC} $1"; }

# Check dependencies
if ! command -v curl &> /dev/null; then
    log_error "curl is required but not installed"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    log_error "jq is required but not installed"
    exit 1
fi

# Get session cookie from argument or environment
SESSION_COOKIE="${1:-$TUTOR_SESSION_COOKIE}"
if [ -z "$SESSION_COOKIE" ]; then
    log_error "Session cookie required. Usage: $0 <session_cookie> or set TUTOR_SESSION_COOKIE"
    echo "To get your session cookie:"
    echo "1. Log in as a tutor in the browser"
    echo "2. Open DevTools -> Application/Storage -> Cookies"
    echo "3. Copy the value of 'next-auth.session-token'"
    exit 1
fi

log_info "Starting course creation test..."
log_info "Base URL: $BASE_URL"

# ============================================
# STEP 1: Create a Course
# ============================================
log_step "STEP 1: Creating course..."

COURSE_PAYLOAD=$(cat <<EOF
{
  "title": "Test Course $(date +%s)",
  "description": "This is an automated test course created via the test script",
  "subject": "Mathematics",
  "gradeLevel": "Grade 10",
  "difficulty": "intermediate",
  "estimatedHours": 20,
  "isLiveOnline": false,
  "categories": ["STEM", "Test"],
  "schedule": [
    {
      "dayOfWeek": "Monday",
      "startTime": "09:00",
      "durationMinutes": 60
    },
    {
      "dayOfWeek": "Wednesday",
      "startTime": "09:00",
      "durationMinutes": 60
    }
  ]
}
EOF
)

COURSE_RESPONSE=$(curl -s -X POST "${BASE_URL}${API_PREFIX}/tutor/courses" \
    -H "Content-Type: application/json" \
    -H "Cookie: next-auth.session-token=${SESSION_COOKIE}" \
    -d "$COURSE_PAYLOAD" 2>/dev/null)

if [ $? -ne 0 ]; then
    log_error "Failed to create course - curl error"
    exit 1
fi

# Check for error response
if echo "$COURSE_RESPONSE" | jq -e '.error' &>/dev/null; then
    log_error "Failed to create course: $(echo "$COURSE_RESPONSE" | jq -r '.error')"
    exit 1
fi

COURSE_ID=$(echo "$COURSE_RESPONSE" | jq -r '.course.id')
COURSE_NAME=$(echo "$COURSE_RESPONSE" | jq -r '.course.name')

if [ -z "$COURSE_ID" ] || [ "$COURSE_ID" = "null" ]; then
    log_error "Failed to create course - no course ID returned"
    echo "Response: $COURSE_RESPONSE"
    exit 1
fi

log_success "Course created successfully!"
log_info "Course ID: $COURSE_ID"
log_info "Course Name: $COURSE_NAME"

# ============================================
# STEP 2: Update Course with Price (required for publishing)
# ============================================
log_step "STEP 2: Setting course price..."

PRICE_PAYLOAD=$(cat <<EOF
{
  "price": 99.99,
  "currency": "SGD",
  "isFree": false
}
EOF
)

PRICE_RESPONSE=$(curl -s -X PATCH "${BASE_URL}${API_PREFIX}/tutor/courses/${COURSE_ID}" \
    -H "Content-Type: application/json" \
    -H "Cookie: next-auth.session-token=${SESSION_COOKIE}" \
    -d "$PRICE_PAYLOAD" 2>/dev/null)

if echo "$PRICE_RESPONSE" | jq -e '.error' &>/dev/null; then
    log_error "Failed to set price: $(echo "$PRICE_RESPONSE" | jq -r '.error')"
    exit 1
fi

log_success "Price set successfully!"

# ============================================
# STEP 3: Create a Batch (Schedule)
# ============================================
log_step "STEP 3: Creating batch/schedule..."

BATCH_PAYLOAD=$(cat <<EOF
{
  "name": "Batch A - $(date +%Y-%m-%d)",
  "startDate": "$(date -d '+7 days' +%Y-%m-%d)",
  "difficulty": "intermediate"
}
EOF
)

BATCH_RESPONSE=$(curl -s -X POST "${BASE_URL}${API_PREFIX}/tutor/courses/${COURSE_ID}/batches" \
    -H "Content-Type: application/json" \
    -H "Cookie: next-auth.session-token=${SESSION_COOKIE}" \
    -d "$BATCH_PAYLOAD" 2>/dev/null)

if echo "$BATCH_RESPONSE" | jq -e '.error' &>/dev/null; then
    log_error "Failed to create batch: $(echo "$BATCH_RESPONSE" | jq -r '.error')"
    exit 1
fi

BATCH_ID=$(echo "$BATCH_RESPONSE" | jq -r '.batch.id')
log_success "Batch created successfully!"
log_info "Batch ID: $BATCH_ID"

# ============================================
# STEP 4: Add Curriculum Content (Module & Lesson)
# ============================================
log_step "STEP 4: Adding curriculum content..."

CURRICULUM_PAYLOAD=$(cat <<EOF
{
  "modules": [
    {
      "id": "$(uuidgen 2>/dev/null || echo "mod-$(date +%s)")",
      "title": "Module 1: Introduction",
      "description": "Getting started with the basics",
      "order": 0,
      "lessons": [
        {
          "id": "$(uuidgen 2>/dev/null || echo "les-$(date +%s)")",
          "title": "Lesson 1: Course Overview",
          "description": "Introduction to the course structure",
          "duration": 30,
          "order": 0
        },
        {
          "id": "$(uuidgen 2>/dev/null || echo "les-$(date +%s)-2")",
          "title": "Lesson 2: Key Concepts",
          "description": "Understanding fundamental concepts",
          "duration": 45,
          "order": 1
        }
      ]
    }
  ]
}
EOF
)

CURRICULUM_RESPONSE=$(curl -s -X PUT "${BASE_URL}${API_PREFIX}/tutor/courses/${COURSE_ID}/curriculum" \
    -H "Content-Type: application/json" \
    -H "Cookie: next-auth.session-token=${SESSION_COOKIE}" \
    -d "$CURRICULUM_PAYLOAD" 2>/dev/null)

if echo "$CURRICULUM_RESPONSE" | jq -e '.error' &>/dev/null; then
    log_error "Failed to add curriculum: $(echo "$CURRICULUM_RESPONSE" | jq -r '.error')"
    exit 1
fi

log_success "Curriculum content added successfully!"

# ============================================
# STEP 5: Publish the Course
# ============================================
log_step "STEP 5: Publishing course..."

PUBLISH_PAYLOAD=$(cat <<EOF
{
  "isPublished": true
}
EOF
)

PUBLISH_RESPONSE=$(curl -s -X PATCH "${BASE_URL}${API_PREFIX}/tutor/courses/${COURSE_ID}" \
    -H "Content-Type: application/json" \
    -H "Cookie: next-auth.session-token=${SESSION_COOKIE}" \
    -d "$PUBLISH_PAYLOAD" 2>/dev/null)

if echo "$PUBLISH_RESPONSE" | jq -e '.error' &>/dev/null; then
    log_error "Failed to publish course: $(echo "$PUBLISH_RESPONSE" | jq -r '.error')"
    exit 1
fi

IS_PUBLISHED=$(echo "$PUBLISH_RESPONSE" | jq -r '.course.isPublished')

if [ "$IS_PUBLISHED" = "true" ]; then
    log_success "Course published successfully!"
else
    log_error "Course publication may have failed - isPublished is not true"
    echo "Response: $PUBLISH_RESPONSE"
    exit 1
fi

# ============================================
# STEP 6: Verify Course
# ============================================
log_step "STEP 6: Verifying course..."

VERIFY_RESPONSE=$(curl -s -X GET "${BASE_URL}${API_PREFIX}/tutor/courses/${COURSE_ID}" \
    -H "Cookie: next-auth.session-token=${SESSION_COOKIE}" 2>/dev/null)

if echo "$VERIFY_RESPONSE" | jq -e '.error' &>/dev/null; then
    log_error "Failed to verify course: $(echo "$VERIFY_RESPONSE" | jq -r '.error')"
    exit 1
fi

VERIFY_PUBLISHED=$(echo "$VERIFY_RESPONSE" | jq -r '.course.isPublished')
VERIFY_MODULES=$(echo "$VERIFY_RESPONSE" | jq -r '.course.modules | length')

log_info "Course Details:"
echo "  - Name: $(echo "$VERIFY_RESPONSE" | jq -r '.course.name')"
echo "  - Published: $VERIFY_PUBLISHED"
echo "  - Modules: $VERIFY_MODULES"
echo "  - Subject: $(echo "$VERIFY_RESPONSE" | jq -r '.course.subject')"
echo "  - Price: $(echo "$VERIFY_RESPONSE" | jq -r '.course.price') $(echo "$VERIFY_RESPONSE" | jq -r '.course.currency')"

# ============================================
# Summary
# ============================================
echo ""
echo "=========================================="
log_success "TEST COMPLETED SUCCESSFULLY!"
echo "=========================================="
echo ""
echo "Created Course:"
echo "  ID: $COURSE_ID"
echo "  Name: $COURSE_NAME"
echo "  URL: ${BASE_URL}/tutor/courses/${COURSE_ID}"
echo ""
echo "Batch/Schedule:"
echo "  ID: $BATCH_ID"
echo ""
echo "Next Steps:"
echo "  1. Open the course in browser: ${BASE_URL}/tutor/courses/${COURSE_ID}"
echo "  2. Or view in Insights: ${BASE_URL}/tutor/insights?courseId=${COURSE_ID}"
echo ""
