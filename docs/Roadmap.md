# TutorMe / CogniClass - Development Roadmap

## Executive Summary

**Platform**: AI-Human Hybrid Tutoring Platform  
**Model**: Async-first learning with AI support + Live "clinics" with AI-assisted human tutors  
**Target Ratio**: 1 tutor : 50 students  
**Budget**: ¥15,000  
**Hosting**: Hong Kong (no ICP needed), ready for international expansion  
**Timeline**: 90-day MVP

---

## Phase 0: Foundation (Week 1)

### Goals
- Set up development environment
- Configure CI/CD pipeline
- Establish project structure

### Tasks
| Task | Description | Deliverable |
|------|-------------|-------------|
| 0.1 | Initialize Next.js 14 project with TypeScript | `package.json`, `tsconfig.json` |
| 0.2 | Configure Tailwind CSS and shadcn/ui | UI component library ready |
| 0.3 | Set up Docker Compose (Postgres, Redis, Ollama) | `docker-compose.yml` |
| 0.4 | Initialize Prisma schema | `schema.prisma` with core models |
| 0.5 | Configure environment variables | `.env.example` documented |
| 0.6 | Set up project structure | File organization per spec |

### Tech Stack Validation
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
- **Backend**: Node.js + Express + Socket.io
- **Database**: PostgreSQL (Neon/Supabase) + Redis
- **AI**: Ollama (Llama 3.1 8B) + Zhipu AI fallback
- **Video**: Daily.co (abstracted for Tencent TRTC migration)
- **Whiteboard**: tldraw + Yjs
- **Auth**: NextAuth.js (WeChat OAuth)

---

## Phase 1: Authentication & Onboarding (Weeks 2-3)

### Goals
- Complete user authentication system
- Implement onboarding flows for students and tutors

### 1.1 Authentication System
```
Endpoints to implement:
├── /api/auth/[...nextauth] (NextAuth.js)
├── WeChat OAuth integration
├── Credentials provider for tutors
└── Role-based access control (STUDENT | TUTOR | ADMIN)
```

**Database Models**:
- `User` - Core user entity
- `StudentProfile` - Grade level, subjects, knowledge graph
- `TutorProfile` - Credentials, subjects, hourly rate, availability

### 1.2 Student Onboarding
| Feature | Description | UI Components |
|---------|-------------|---------------|
| WeChat Login | OAuth flow with WeChat | Login button, callback handler |
| Profile Setup | Grade level, subjects of interest | Form wizard, subject selector |
| AI Diagnostic | 5-question assessment | Quiz interface, progress indicator |
| Knowledge Graph Init | Initial concept mastery scores | Radar chart visualization |

### 1.3 Tutor Onboarding
| Feature | Description | UI Components |
|---------|-------------|---------------|
| Credentials Upload | Document verification | File upload, preview |
| Subject Selection | Teaching areas | Multi-select dropdown |
| Availability Setup | Calendar configuration | Weekly scheduler |
| Hourly Rate | Pricing configuration | Currency input |

### Deliverables
- [ ] Student signup complete with WeChat OAuth
- [ ] Tutor signup with credentials
- [ ] Role-based dashboard routing
- [ ] Onboarding wizard functional

---

## Phase 2: Student Async Learning Core (Weeks 4-7)

### Goals
- Build student dashboard
- Implement video player with tracking
- Create AI chat widget
- Build quiz engine

### 2.1 Student Dashboard
```
/app/(student)/dashboard/
├── page.tsx - Main dashboard
├── components/
│   ├── subject-cards.tsx - Progress display
│   ├── continue-learning.tsx - CTA section
│   ├── clinic-schedule.tsx - Booking widget
│   ├── peer-suggestions.tsx - Study groups
│   └── weak-areas-chart.tsx - Radar visualization
```

**Features**:
- Subject cards with progress percentages
- "Continue Learning" CTA → video player
- Upcoming clinic schedule with booking
- Peer study group suggestions
- Weak areas radar chart

### 2.2 Video Player System
**Requirements**:
- Custom skin (playback speed, fullscreen)
- Event tracking (pause, rewind, completion)
- Auto-pause at timestamps for inline quizzes
- Note-taking sidebar synced to timestamp

```
/components/video-player/
├── index.tsx - Main player wrapper
├── controls.tsx - Custom control bar
├── event-tracker.ts - Analytics tracking
├── quiz-overlay.tsx - Inline quiz modal
└── notes-sidebar.tsx - Timestamped notes
```

**Tracking Events**:
```javascript
{
  play: { timestamp, duration },
  pause: { timestamp, duration },
  seek: { from, to },
  completion: { percentage },
  quiz_trigger: { timestamp, quizId }
}
```

### 2.3 AI Chat Widget
**Requirements**:
- Socratic style (never give direct answer)
- Context-aware (current video, previous wrong answers)
- Local LLM first (Ollama), Zhipu fallback
- Conversation history per student

```
/components/ai-chat/
├── index.tsx - Chat widget (bottom-right)
├── message-list.tsx - Chat history
├── input-area.tsx - Text input
├── context-provider.ts - Video/problem context
└── hooks/
    ├── use-ollama.ts - Local LLM
    └── use-zhipu.ts - API fallback
```

**AI Prompts**:
```
Socratic Tutor:
---
You are a patient tutor helping a student learn {subject}.
Student is working on: {problem}
Their attempt: {studentAnswer}
History: {previousMistakes}

Rules:
1. Never give the direct answer
2. Ask one guiding question to help them discover the error
3. If they ask "just tell me," respond with encouragement + smaller hint
4. Reference specific concepts from their knowledge graph if relevant
5. Keep response under 3 sentences

Respond in Chinese if student wrote in Chinese, English if English.
```

### 2.4 AI Quiz Engine
**Endpoint**: `POST /api/quiz/generate`

**Process**:
1. Extract key concepts from transcript
2. Check student knowledge graph for weak areas
3. Generate 3 questions: 1 recall, 1 application, 1 challenge
4. Return JSON with questions

**Question Types**:
- `multiple_choice` - Instant auto-grade
- `fill_blank` - Pattern matching
- `short_answer` - LLM grading with rubric (0-100)
- `code_snippet` - Docker sandbox execution

**Grading Logic**:
```javascript
if (type === 'multiple_choice') {
  return instantGrade(answer, correct);
} else if (type === 'short_answer') {
  const { score, confidence } = await llmGrade(answer, rubric);
  if (confidence < 0.8) flagForTutorReview();
  return score;
} else if (type === 'code_snippet') {
  return await sandboxExecute(code, testCases);
}
```

**Database Models**:
- `Content` - Video metadata, transcript, duration
- `Quiz` - Generated questions
- `QuizAttempt` - Student answers, scores, AI confidence

### Deliverables
- [ ] Student dashboard with progress visualization
- [ ] Video player with custom controls and tracking
- [ ] AI chat widget with Socratic responses
- [ ] Inline quiz generation and grading
- [ ] Note-taking system

---

## Phase 3: Live Clinic System (Weeks 8-10)

### Goals
- Build real-time clinic infrastructure
- Implement AI monitoring dashboard
- Create tutor control interface

### 3.1 Video Infrastructure (Daily.co)
```
Integration Requirements:
├── Abstract video provider interface
├── Daily.co implementation (MVP)
├── Room creation and management
├── Screen sharing support
└── Recording capabilities
```

**Interface Design**:
```typescript
interface VideoProvider {
  createRoom(sessionId: string): Promise<Room>;
  joinRoom(roomUrl: string, token: string): Promise<void>;
  leaveRoom(): void;
  startScreenShare(): void;
  startRecording(): void;
  // Abstracted for Tencent TRTC migration
}
```

### 3.2 Whiteboard (tldraw + Yjs)
```
/components/whiteboard/
├── index.tsx - tldraw canvas wrapper
├── yjs-provider.ts - Sync provider
├── awareness.ts - Cursor/selection sync
└── history.ts - Undo/redo management
```

### 3.3 Real-Time Monitoring Engine

**Student State Tracking**:
```javascript
class StudentStateTracker {
  // Real-time state per student
  engagement: 0-100    // video progress, chat activity
  understanding: 0-100 // quiz accuracy
  frustration: 0-100   // retries, help requests
  
  update(event) {
    // Recalculate state based on event
    // Emit state change via WebSocket
  }
  
  shouldIntervene() {
    // Return: {hint, escalateToTutor, doNothing}
  }
}
```

**Monitoring Signals**:
| Signal | Detection | Action |
|--------|-----------|--------|
| Chat distress | "stuck", "don't get it", "???" | Flag for tutor |
| Whiteboard idle | No activity >90s | Send gentle prompt |
| Repeated erasing | Erase patterns | Suggest break |
| Code editor idle | No changes >2min | Offer hint |
| Error spam | Multiple errors | Escalate to tutor |

### 3.4 Tutor Dashboard (Live Session)

**Layout**:
```
┌─────────────────────────────────────────┐
│  [Video: Tutor Camera]  [Screen Share]  │
├─────────────────────────────────────────┤
│  AI Dashboard        │ Student Grid     │
│  ─────────────────   │ ─────────────    │
│  🔴 3 need help      │ [A] 🟡 [B] 🟢    │
│  🟡 7 slow progress  │ [C] 🔴 [D] 🟢    │
│  🟢 40 on track      │ ...              │
│                      │                  │
│  [Click 🔴 → Details → Join breakout]   │
└─────────────────────────────────────────┘
```

**Tutor Actions**:
- Broadcast message to subset (all/struggling/stuck)
- Pull student to 1:1 breakout room
- Push AI-generated hint to specific student
- End session → auto-generate recording + follow-up tasks

### 3.5 WebSocket Events
```javascript
// Client → Server
join_clinic: { sessionId, userId, role }
whiteboard_update: { strokes[] }
code_update: { content, language }
chat_message: { text, timestamp }
quiz_answer: { questionId, answer }

// Server → Client
student_status: { userId, status, reason }
ai_hint: { text, type: 'socratic'|'direct'|'encouragement' }
tutor_broadcast: { text, targetGroup }
breakout_invite: { roomUrl, tutorName }
```

### Deliverables
- [ ] Live clinic video + whiteboard
- [ ] AI monitoring dashboard
- [ ] Student status indicators (🔴🟡🟢)
- [ ] Tutor intervention controls
- [ ] Breakout room support
- [ ] Session recording

---

## Phase 4: Tutor Dashboard & AI Tools (Weeks 11-12)

### Goals
- Complete tutor dashboard
- Implement AI briefing system
- Build earnings tracking

### 4.1 Tutor Dashboard
```
/app/(tutor)/dashboard/
├── page.tsx - Main dashboard
├── components/
│   ├── calendar.tsx - Upcoming clinics
│   ├── prep-view.tsx - Pre-session briefing
│   ├── live-copilot.tsx - During session
│   ├── post-report.tsx - Auto-generated reports
│   └── earnings.tsx - Payout tracking
```

**Features**:
- Calendar: upcoming clinics, student bookings
- Prep view: enrolled students with recent scores
- Common mistakes (AI-generated summary)
- Suggested focus topics
- Earnings: session history, payouts, subscription revenue

### 4.2 AI Briefing Generator
```javascript
class TutorBriefing {
  generate(students[]) {
    return {
      commonWeaknesses: [...],
      studentsNeedingAttention: [...],
      suggestedOpening: "40% struggled with..."
    };
  }
}
```

**Prompt**:
```
Summarize for tutor in 3 bullet points:
- What % of enrolled students struggled with which concept
- Specific student names needing attention (top 3)
- Suggested opening line for clinic

Data: {studentAttempts[], recentQuizzes[]}
```

### 4.3 Session Types
| Mode | Ratio | Use Case | AI Support |
|------|-------|----------|------------|
| Oversight | 1:200 | Monitor async | Alerts for at-risk |
| Clinic Host | 1:50 | Live group | Real-time monitoring |
| Small Group | 1:8 | Targeted help | Personalized warm-up |
| 1:1 Premium | 1:1 | High-value | Full prep + follow-up |

### Deliverables
- [ ] Tutor calendar and booking management
- [ ] Pre-session AI briefing
- [ ] Live copilot view
- [ ] Post-session reports
- [ ] Earnings dashboard

---

## Phase 5: Payments & Polish (Weeks 13-14)

### Goals
- Integrate WeChat Pay
- Complete i18n (zh-CN primary)
- Mobile responsiveness
- Testing and bug fixes

### 5.1 Payment Integration (WeChat Pay)
**Revenue Streams**:
| Tier | Student Price | Tutor Price | Features |
|------|--------------|-------------|----------|
| Freemium | Free | N/A | 3 AI questions/day |
| Basic | ¥99/mo | N/A | Unlimited AI, 2 clinics/week |
| Pro | ¥199/mo | N/A | Unlimited AI + clinics |
| Tutor Basic | N/A | ¥199/mo | AI tools for 50 students |
| Tutor Pro | N/A | ¥499/mo | White-label, unlimited |
| Pay-Per-Session | ¥50-150 | Tutor sets rate | Premium 1:1 |

**Platform takes 20% commission on tutor-generated fees**

### 5.2 Internationalization
- Primary: Chinese (zh-CN)
- Secondary: English
- All UI strings extracted to i18n files

### 5.3 Mobile Responsiveness
- Responsive breakpoints
- Touch-friendly controls
- Mobile-optimized video player

### 5.4 Testing & QA
- Unit tests for API endpoints
- Integration tests for WebSocket events
- E2E tests for critical flows
- Load testing for 50:1 ratio

### Deliverables
- [ ] WeChat Pay integration
- [ ] Subscription management
- [ ] Chinese i18n complete
- [ ] Mobile responsive
- [ ] Test suite passing

---

## Phase 6: Deployment (Week 15)

### Goals
- Deploy to Hong Kong server
- Configure production environment
- Monitor and optimize

### 6.1 Infrastructure
```
Production Stack:
├── VPS: 8-core, 32GB RAM, 1x GPU (¥3,000/mo)
├── Docker Swarm/Kubernetes
├── PostgreSQL (managed or containerized)
├── Redis (caching + sessions)
├── Ollama (local LLM)
├── Nginx reverse proxy
└── SSL certificates (Let's Encrypt)
```

### 6.2 Deployment Checklist
- [ ] Docker images built and pushed
- [ ] Database migrations run
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Monitoring (Prometheus/Grafana)
- [ ] Log aggregation
- [ ] Backup strategy

### 6.3 Post-Deployment
- [ ] Health checks passing
- [ ] Load testing results acceptable
- [ ] Monitoring dashboards active
- [ ] Alerting configured

---

## Database Schema (Prisma)

```prisma
// Core User Models
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  role          Role      // STUDENT | TUTOR | ADMIN
  createdAt     DateTime  @default(now())
  
  profile       Profile?
  sessions      SessionParticipant[]
  messages      Message[]
  quizAttempts  QuizAttempt[]
}

model Profile {
  id            String    @id @default(uuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  
  // Common fields
  name          String?
  avatar        String?
  
  // Student-specific
  gradeLevel    Int?
  subjects      String[]  // JSON array
  knowledgeGraph Json?    // Concept mastery
  learningStyle  Json?    // visual/auditory/kinesthetic
  
  // Tutor-specific
  credentials   String?   // Document URL
  hourlyRate    Decimal?  @db.Decimal(10, 2)
  availability  Json?     // Weekly schedule
}

// Content Models
model Content {
  id            String    @id @default(uuid())
  subject       String
  topic         String
  difficulty    String    // BEGINNER | INTERMEDIATE | ADVANCED
  videoUrl      String
  transcript    String?   @db.Text
  duration      Int       // seconds
  
  quizzes       Quiz[]
}

model Quiz {
  id            String    @id @default(uuid())
  contentId     String
  content       Content   @relation(fields: [contentId], references: [id])
  questions     Json      // Array of question objects
  
  attempts      QuizAttempt[]
}

model QuizAttempt {
  id            String    @id @default(uuid())
  studentId     String
  student       User      @relation(fields: [studentId], references: [id])
  quizId        String
  quiz          Quiz      @relation(fields: [quizId], references: [id])
  
  answers       Json
  score         Int
  aiConfidence  Float?
  tutorReviewed Boolean   @default(false)
  createdAt     DateTime  @default(now())
}

// Live Session Models
model LiveSession {
  id            String    @id @default(uuid())
  tutorId       String
  scheduledAt   DateTime
  maxStudents   Int       @default(50)
  type          SessionType // CLINIC | GROUP | ONE_ON_ONE
  
  participants  SessionParticipant[]
  recordingUrl  String?
  aiSummary     String?   @db.Text
  
  createdAt     DateTime  @default(now())
}

model SessionParticipant {
  id              String    @id @default(uuid())
  sessionId       String
  session         LiveSession @relation(fields: [sessionId], references: [id])
  studentId       String
  student         User      @relation(fields: [studentId], references: [id])
  
  joinTime        DateTime
  leaveTime       DateTime?
  engagementScore Float?
  aiInterventions Json?     // Log of hints given
}

// AI Interaction Model
model Message {
  id          String   @id @default(uuid())
  studentId   String
  student     User     @relation(fields: [studentId], references: [id])
  content     String   @db.Text
  source      MessageSource // AI | TUTOR | STUDENT
  context     Json?    // Video ID, problem context
  timestamp   DateTime @default(now())
}

// Enums
enum Role {
  STUDENT
  TUTOR
  ADMIN
}

enum SessionType {
  CLINIC
  GROUP
  ONE_ON_ONE
}

enum MessageSource {
  AI
  TUTOR
  STUDENT
}
```

---

## API Endpoints

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | ALL | NextAuth.js routes |

### Student
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/student/diagnostic` | POST | Initial assessment |
| `/api/student/progress` | GET | Dashboard data |
| `/api/student/schedule` | GET | Clinic schedule |

### Content
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/content/stream` | GET | Video with tracking |
| `/api/content/[id]/notes` | POST | Save timestamped notes |

### Quiz
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/quiz/generate` | POST | AI quiz creation |
| `/api/quiz/submit` | POST | Grade & store |
| `/api/quiz/attempts` | GET | Quiz history |

### AI
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/chat` | POST | Socratic tutor |
| `/api/ai/hint` | POST | Generate hint |

### Clinic
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/clinic/schedule` | GET/POST | Book sessions |
| `/api/clinic/join` | POST | Enter live room |
| `/api/clinic/monitor` | WS | Real-time updates |

### Tutor
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tutor/briefing` | GET | Pre-session prep |
| `/api/tutor/earnings` | GET | Payout data |
| `/api/tutor/sessions` | GET | Session history |

---

## File Structure

```
cogniclass/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (student)/
│   │   ├── dashboard/page.tsx
│   │   ├── learn/[contentId]/page.tsx
│   │   ├── clinic/[sessionId]/page.tsx
│   │   └── layout.tsx
│   ├── (tutor)/
│   │   ├── dashboard/page.tsx
│   │   ├── clinic/host/[sessionId]/page.tsx
│   │   ├── prep/[sessionId]/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── student/
│   │   ├── quiz/
│   │   ├── ai/
│   │   ├── clinic/
│   │   └── tutor/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── video-player/
│   ├── ai-chat/
│   ├── whiteboard/
│   ├── quiz/
│   ├── tutor-dashboard/
│   ├── student-grid/
│   └── charts/
├── lib/
│   ├── ai/
│   │   ├── ollama.ts         # Local LLM
│   │   ├── zhipu.ts          # API fallback
│   │   ├── prompts.ts        # All AI prompts
│   │   └── orchestrator.ts   # StudentStateTracker
│   ├── db/
│   │   ├── prisma.ts
│   │   └── schema.prisma
│   ├── realtime/
│   │   ├── socket-server.ts
│   │   └── events.ts
│   ├── video/
│   │   ├── provider.ts       # Abstract interface
│   │   └── daily.ts          # Daily.co impl
│   └── utils/
├── public/
├── docker-compose.yml
├── Dockerfile
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/cogniclass"
REDIS_URL="redis://localhost:6379"

# AI
OLLAMA_URL="http://localhost:11434"
ZHIPU_API_KEY="your_zhipu_key"

# Video
DAILY_API_KEY="your_daily_key"

# Auth
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
WECHAT_APP_ID="your_wechat_app_id"
WECHAT_APP_SECRET="your_wechat_secret"

# Payments
WECHAT_PAY_MCH_ID="your_merchant_id"
WECHAT_PAY_API_KEY="your_api_key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## Definition of Done (MVP)

- [x] Student can sign up, take diagnostic, watch video with inline quiz
- [x] AI chat answers questions Socratically using local LLM
- [x] Tutor can schedule clinic, see student briefing
- [x] Live clinic with 1 tutor + 10 students, AI monitoring works
- [x] AI generates quiz from video transcript
- [x] Payment integration (WeChat Pay) for subscriptions
- [x] Deployed to HK server, accessible in China

---

## Constraints & Reminders

| Constraint | Implementation |
|------------|----------------|
| Local LLM First | Always use Ollama/Llama 3.1, Zhipu only as fallback |
| Video Abstraction | Interface allows Daily.co → Tencent TRTC migration |
| Chinese i18n | All UI strings in zh-CN, English secondary |
| Mobile-First | Many students will use phones |
| No PII in AI | Use studentId hashes, not names |
| Docker Everything | Easy deployment and scaling |
| Budget Control | Target ¥15K, ¥3,000/mo infrastructure |

---

## Future Roadmap (Post-MVP)

### Phase 7: Scale to 1:100 (Months 4-6)
- Optimize GPU efficiency (quantized models, batch inference)
- Database partitioning and read replicas
- CDN for video content

### Phase 8: Tutor SaaS Tier (Months 6-9)
- White-label options
- Content marketplace
- Student import tools

### Phase 9: International Expansion (Months 9-12)
- ICP license for mainland China
- Tencent TRTC migration
- Multi-region deployment
- GDPR compliance

---

## Budget Breakdown (¥15,000)

| Category | Amount | Notes |
|----------|--------|-------|
| VPS (3 months) | ¥9,000 | 8-core, 32GB, 1x GPU |
| Domain + SSL | ¥500 | Annual |
| Daily.co | ¥1,500 | Video API |
| Zhipu AI | ¥1,000 | Fallback API |
| WeChat Pay | ¥500 | Integration |
| Misc/Buffer | ¥2,500 | Unexpected costs |
| **Total** | **¥15,000** | |

---

## Key Metrics for Success

| Sprint | Deliverable | Success Metric |
|--------|-------------|----------------|
| S1 | Async video + AI quiz | 50 beta users, 70% completion rate |
| S2 | Live clinic (1:20) | <5s AI latency, smooth experience |
| S3 | Multi-subject + SaaS | 5 tutors onboarded, ¥5K MRR |
| S4 | Payment + polish | First 100 paying students |

---

## Appendix: AI Prompts Reference

### Socratic Tutor
```
You are a patient tutor helping a student learn {subject}.
Student is working on: {problem}
Their attempt: {studentAnswer}
History: {previousMistakes}

Rules:
1. Never give the direct answer
2. Ask one guiding question to help them discover the error
3. If they ask "just tell me," respond with encouragement + smaller hint
4. Reference specific concepts from their knowledge graph if relevant
5. Keep response under 3 sentences

Respond in Chinese if student wrote in Chinese, English if English.
```

### Quiz Generator
```
Generate 3 questions about: {transcript}
Student level: {grade}, struggling with: {weakAreas}

Q1: Basic recall (multiple choice)
Q2: Application (short answer, AI-gradable)
Q3: Challenge (connects to prerequisite: {prereq})

Return valid JSON: {questions: [{type, question, options?, rubric?, answer}]}
```

### Tutor Briefing
```
Summarize for tutor in 3 bullet points:
- What % of enrolled students struggled with which concept
- Specific student names needing attention (top 3)
- Suggested opening line for clinic

Data: {studentAttempts[], recentQuizzes[]}
```
