# Test Scripts

This directory contains various test scripts for the TutorMe application.

## Course Creation Test

Two scripts are available for testing course creation, scheduling, and publishing:

### 1. TypeScript/Direct DB Script (Recommended)

**File:** `test-course-creation.ts`

This script creates a course directly via database operations (bypassing HTTP API).

**Usage:**
```bash
# Using tutor ID directly
npx tsx scripts/test-course-creation.ts <tutor_id>

# Or with environment variable
TUTOR_ID=<tutor_id> npx tsx scripts/test-course-creation.ts
```

**Requirements:**
- Database must be running
- Tutor must exist in the database
- No session cookie required (direct DB access)

### 2. Bash/API Script

**File:** `test-course-creation.sh`

This script uses the HTTP API and requires authentication.

**Usage:**
```bash
# Using session cookie
./scripts/test-course-creation.sh <session_cookie>

# Or with environment variable
TUTOR_SESSION_COOKIE=<cookie> ./scripts/test-course-creation.sh
```

**Requirements:**
- Application must be running (dev server)
- Valid tutor session cookie
- curl and jq must be installed

**Getting Session Cookie:**
1. Log in as a tutor in the browser
2. Open DevTools → Application/Storage → Cookies
3. Copy the value of `next-auth.session-token`

### NPM Scripts

You can also run via npm:

```bash
# Direct DB method (requires TUTOR_ID)
npm run test:course:create <tutor_id>

# API method (requires session cookie)
npm run test:course:api <session_cookie>
```

## What the Tests Do

Both scripts perform the following steps:

1. **Create Course**
   - Creates a new curriculum with title, description, subject, etc.
   - Sets price (99.99 SGD) for paid course
   - Adds schedule (Monday & Wednesday 9:00 AM)

2. **Add Curriculum Content**
   - Creates Module 1: "Introduction"
   - Adds 2 lessons: "Course Overview" (30 min) and "Key Concepts" (45 min)

3. **Create Batch/Schedule**
   - Creates a batch with the provided schedule
   - Sets start date to 7 days from now

4. **Publish Course**
   - Validates all required fields are present
   - Sets `isPublished` to true

5. **Verification**
   - Verifies course exists and is published
   - Displays course details and URLs

## Example Output

```
🚀 Starting Course Creation Test
=================================
Tutor ID: abc123
Base URL: http://localhost:3003

📝 Creating course...
✅ Course created: xyz789

📋 Course Details:
  ID: xyz789
  Name: Test Course 1234567890
  Subject: Mathematics
  Price: 99.99 SGD
  Modules: 1
  Batches: 1
  Published: No

📢 Publishing course...
✅ Course published!

🔍 Verifying...
✅ Verification passed: Course is published

=================================
✅ TEST COMPLETED SUCCESSFULLY!
=================================

Created Course:
  ID: xyz789
  URL: http://localhost:3003/tutor/courses/xyz789
  Insights: http://localhost:3003/tutor/insights?courseId=xyz789
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running: `npm run db:setup`
- Check `.env.local` has correct DATABASE_URL

### Session Cookie Invalid
- Make sure you're logged in as a tutor (not student/parent)
- Session may have expired - log in again
- Copy the full cookie value without quotes

### Port Already in Use
- Change BASE_URL in the script or use `PORT=3004 npm run dev`

## Other Scripts

- `backfill-handles.ts` - Backfill user handles
- `data-retention.ts` - Data retention cleanup
- `seed-curriculum.ts` - Seed curriculum data
- `seed-db.ts` - Seed database
- `seed-admin.ts` - Seed admin user
- `seed-gamification.ts` - Seed gamification data
