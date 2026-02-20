# Curriculum Management System

A structured learning system for AI tutors that enables test prep (IELTS, TOEFL) and general English curriculums with AI-generated lessons.

## Overview

The curriculum system allows:
- **Admin**: Upload syllabus documents, auto-generate structured lessons with AI
- **Students**: Browse available curriculums, enroll with a structured learning path
- **AI Tutor**: Teach from curriculum context, track lesson progress

## Architecture

### Database Models

```
Curriculum
├── CurriculumModule[]
│   └── CurriculumLesson[]
├── CurriculumDocument[] (syllabi, scoring guides)
└── CurriculumEnrollment[] (student enrollments)

User (Student)
├── CurriculumEnrollment[]
├── CurriculumLessonProgress[]
└── AITutorEnrollment (linked to curriculum)
```

### Key Features

1. **Document Upload & AI Analysis**
   - Upload PDF/DOCX syllabi
   - AI extracts structure (modules, skills, topics)
   - Auto-generates lessons from extracted content

2. **Structured Learning Path**
   - Modules organized by skill (listening, reading, writing, speaking)
   - Lessons with objectives, exercises, materials
   - Progress tracking per lesson

3. **AI Tutor Integration**
   - Tutor teaches from current lesson context
   - Links tutoring sessions to specific lessons
   - Tracks weak areas across curriculum

## API Endpoints

### Admin APIs (Protected)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/curriculums` | GET/POST | List/create curriculums |
| `/api/admin/curriculums/seed` | POST | Auto-generate IELTS/TOEFL with AI |
| `/api/admin/curriculums/documents` | GET/POST/DELETE | Upload/manage syllabus docs |
| `/api/admin/curriculums/analyze` | POST | AI analysis of documents |

### Student APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/curriculums/list` | GET | Browse available curriculums |
| `/api/curriculum` | GET | Get assigned curriculum with progress |
| `/api/curriculum/lessons/[id]` | GET/POST | Lesson details & progress update |
| `/api/ai-tutor/lesson-context` | GET/POST | AI tutor lesson integration |

## Setup Instructions

### 1. Start Database

```bash
# Start PostgreSQL and Redis
docker run -d --name tutorme-db \
  -e POSTGRES_USER=tutorme \
  -e POSTGRES_PASSWORD=tutorme_password \
  -e POSTGRES_DB=tutorme \
  -p 5432:5432 \
  postgres:16-alpine

# Start Redis
docker run -d --name tutorme-redis \
  -p 6379:6379 \
  redis:7-alpine
```

### 2. Run Migrations

```bash
cd tutorme-app
npx prisma migrate dev
```

### 3. Seed Test Curriculum

```bash
# Run the seed script
npx tsx scripts/seed-curriculum.ts

# Or via API (as admin):
curl -X POST http://localhost:3003/api/admin/curriculums/seed \
  -H "Content-Type: application/json" \
  -d '{"type": "ielts"}' \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"
```

### 4. Start Development Server

```bash
npm run dev
```

## Testing the Flow

### 1. Student Enrolls with Curriculum

1. Go to `/student/ai-tutor/browse`
2. Click "Enroll Free" on English AI Tutor
3. In preferences dialog, select "Curriculum" tab
4. Choose IELTS Academic curriculum
5. Set age/gender/accent preferences
6. Click "Start Learning"

### 2. AI Tutor with Curriculum Context

1. Go to `/student/ai-tutor/english`
2. Left sidebar shows curriculum modules & lessons
3. Current lesson is highlighted
4. Click any lesson to start learning
5. AI tutor receives lesson context and teaches accordingly

### 3. Track Progress

1. Complete exercises in a lesson
2. Progress updates automatically
3. Curriculum sidebar shows completion status
4. Next lesson unlocks when previous is completed

## Curriculum Structure Example

### IELTS Academic

```
IELTS Academic (38 hours, 10 modules)
├── Listening Module (8 hours)
│   ├── Lesson 1: Section 1 & 2 (30 min)
│   ├── Lesson 2: Section 3 & 4 (35 min)
│   └── Lesson 3: Practice Test (45 min)
├── Reading Module (10 hours)
│   ├── Lesson 1: Skimming & Scanning (25 min)
│   ├── Lesson 2: T/F/Not Given (30 min)
│   └── ...
├── Writing Task 1 (6 hours)
├── Writing Task 2 (8 hours)
└── Speaking Module (6 hours)
```

## AI Lesson Generation

The system uses Kimi AI to generate lessons:

1. **From Documents**: Upload syllabus PDF → AI extracts structure → Generates lessons
2. **Seed Templates**: Pre-defined IELTS/TOEFL structures → AI generates detailed content

Generated lesson includes:
- Title & learning objectives
- Key concepts to teach
- Practice exercises with answers
- Study tips for test day
- Duration & difficulty

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── admin/curriculums/         # Admin management APIs
│   │   ├── curriculum/                # Student curriculum API
│   │   ├── curriculum/lessons/[id]/   # Lesson detail API
│   │   └── curriculums/list/          # Public curriculum list
│   └── student/ai-tutor/
│       ├── browse/page.tsx            # Enrollment with curriculum selection
│       └── english/page.tsx           # Tutor with curriculum sidebar
├── components/ai-tutor/
│   └── curriculum-sidebar.tsx         # Module/lesson navigator
└── scripts/
    └── seed-curriculum.ts             # Seed test data
```

## Future Enhancements

- [ ] Video lesson integration
- [ ] Adaptive learning paths based on weak areas
- [ ] Practice test scoring with AI feedback
- [ ] Peer study groups within curriculums
- [ ] Tutor dashboard for curriculum analytics

## Troubleshooting

### Build Errors

```bash
# If Prisma types are outdated
npx prisma generate

# If node_modules issues
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Database Issues

```bash
# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

### AI Generation Fails

- Check Kimi API key in `.env.local`
- Verify Ollama is running (fallback)
- Check logs in server console
