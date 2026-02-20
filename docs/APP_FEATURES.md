# TutorMe - Complete Application Features

## Executive Summary

TutorMe (also known as CogniClass) is an AI-human hybrid tutoring platform combining 24/7 AI-powered Socratic tutoring with live group clinics. The platform features a comprehensive gamification system designed to enhance student engagement and learning outcomes.

---

## Core Platform Features

### 1. User Management

| Feature | Description | Status |
|---------|-------------|--------|
| User Registration | Email/password authentication with profile setup | ✅ Complete |
| Student Onboarding | Grade level, subjects, learning style preferences | ✅ Complete |
| Tutor Onboarding | Credentials, availability, hourly rate setup | ✅ Complete |
| Profile Management | Update personal info, preferences, avatar | ✅ Complete |
| Role-Based Access | STUDENT, TUTOR, ADMIN roles | ✅ Complete |

### 2. AI Tutor System

| Feature | Description | Status |
|---------|-------------|--------|
| Multi-Subject Support | English, Math, Physics, Chemistry | ✅ Complete |
| Socratic Teaching Method | Guides students to discover answers | ✅ Complete |
| Real-time Chat | WebSocket-based messaging | ✅ Complete |
| Session Persistence | Chat history saved per session | ✅ Complete |
| AI Response Streaming | Real-time response generation | ✅ Complete |
| Usage Limits | Daily message quotas per tier | ✅ Complete |

### 3. Curriculum System

| Feature | Description | Status |
|---------|-------------|--------|
| Curriculum Management | Create, edit, organize curriculums | ✅ Complete |
| Module Structure | Hierarchical: Curriculum → Module → Lesson | ✅ Complete |
| Lesson Content | Video URLs, transcripts, exercises | ✅ Complete |
| Progress Tracking | Lesson completion status | ✅ Complete |
| Document Upload | PDF analysis and content extraction | ✅ Complete |

### 4. Live Clinic System

| Feature | Description | Status |
|---------|-------------|--------|
| Video Conferencing | Daily.co integration | ✅ Complete |
| Breakout Rooms | Small group discussions | ✅ Complete |
| AI Monitoring | Real-time engagement tracking | ✅ Complete |
| Session Recording | Record and store clinic sessions | ✅ Complete |
| 1:50 Tutor Ratio | One tutor manages up to 50 students | ✅ Complete |

---

## Gamification System Features

### 1. Progression System

#### XP & Leveling
- **XP Sources:**
  - Complete mission: 50 XP
  - Perfect quiz: +20 XP bonus
  - Daily login: 10 XP
  - 3-day streak: 50 XP
  - 7-day streak: 150 XP
  - 30-day streak: 500 XP
  - Speaking practice: 30 XP
  - AI conversation: 40 XP
  - First mission bonus: 100 XP

- **Level Progression:**
  | Level | XP Required | Unlocks |
  |-------|-------------|---------|
  | 1 | 0 | Survival World |
  | 2 | 200 | Daily Life World |
  | 3 | 500 | Workplace World |
  | 4 | 1,000 | Academic World |
  | 5 | 1,800 | Public Speaking Arena |
  | 6-20 | Exponential growth | New content, features |

#### Streak System
- **Daily Check-in:** Automatic streak tracking
- **Streak Recovery:** Double XP mission to recover broken streak
- **Streak Shield:** PRO/ELITE feature to protect streaks
- **Visual Indicators:** Flame icon with day count

### 2. Worlds & Missions

#### Learning Worlds (7 Total)
| World | Emoji | Level | Difficulty | Focus |
|-------|-------|-------|------------|-------|
| Survival | 🌍 | 1 | 1 | Everyday situations |
| Daily Life | 🏠 | 2 | 1 | Social conversations |
| Workplace | 💼 | 3 | 2 | Professional English |
| Academic | 🧠 | 4 | 3 | Study skills |
| Social | ❤️ | 3 | 2 | Relationships |
| Public Speaking | 🎤 | 5 | 3 | Presentations |
| Debate Arena | 🏆 | 8 | 4 | Advanced argumentation |

#### Mission Types
- **Lesson:** Structured learning with AI tutor
- **Roleplay:** Real-world scenario practice
- **Simulation:** Immersive situation training
- **Challenge:** Skill-testing exercises

### 3. Skill Tracking

#### Six Core Skills (0-100%)
1. **Confidence** - Speaking without hesitation
2. **Speaking** - Oral fluency and clarity
3. **Grammar** - Sentence structure accuracy
4. **Vocabulary** - Word usage and variety
5. **Fluency** - Natural speech patterns
6. **Listening** - Comprehension ability

#### Adaptive Difficulty
- System adjusts mission difficulty based on skill scores
- Maintains 70-85% success rate (Flow State)
- Automatic simplification if struggling
- Progressive challenge as skills improve

### 4. AI Avatar Personalities

| Personality | Socratic Balance | Style | Use Case |
|-------------|------------------|-------|----------|
| Friendly Mentor | 60% | Warm, supportive, emojis | General learning |
| Strict Coach | 40% | Direct, disciplined | Test prep |
| Corporate Trainer | 50% | Professional, business | Workplace English |
| Funny Teacher | 70% | Humorous, light | Reluctant learners |
| Calm Professor | 80% | Patient, explanatory | Deep understanding |

### 5. Daily Quests

**Available Quests:**
- Word Master: Learn 5 new words (20 XP)
- Speaking Practice: 3-minute exercise (30 XP)
- Grammar Check: Complete exercise (25 XP)
- Confidence Boost: Speak 2 minutes (35 XP)
- Mission Complete: Finish any mission (40 XP)
- Listening Ear: 10 minutes of content (20 XP)
- Daily Streak: Log in and practice (10 XP)

**System:** 3 random quests daily, completion bonuses

### 6. Achievement System

| Achievement | Rarity | XP Bonus | Trigger |
|-------------|--------|----------|---------|
| First Steps | Common | 50 | First mission complete |
| Week Warrior | Rare | 100 | 7-day streak |
| Monthly Master | Epic | 300 | 30-day streak |
| Rising Star | Rare | 200 | Reach level 10 |
| Expert Learner | Epic | 500 | Reach level 20 |
| Pronunciation Pro | Epic | 150 | 90+ pronunciation score |
| Confidence Champion | Legendary | 500 | 90% confidence score |
| World Explorer | Legendary | 1,000 | Unlock all worlds |

---

## Subscription Tiers

### FREE Tier
**Features:**
- 5 AI messages per day
- 10 minutes speaking practice daily
- Survival World only
- Basic avatar
- Limited analytics
- Ads (optional)

**Limitations:**
- No streak shield
- No advanced features
- No pronunciation analysis

### PRO Tier ($9.99/month)
**Features:**
- Unlimited AI conversations
- Unlimited speaking practice
- All 5 avatar personalities
- All 7 worlds unlocked
- Streak shield (3 uses/month)
- Weekly progress reports
- Confidence analytics
- Pronunciation analysis (basic)
- No ads

### ELITE Tier ($19.99/month)
**Features:**
- Everything in PRO
- Unlimited streak shield
- 1-on-1 AI mock interviews
- Business English simulations
- Public speaking training mode
- Accent reduction module
- Personalized learning roadmap
- Downloadable certificates
- Advanced analytics dashboard
- Priority support

---

## Technical Architecture

### Frontend Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **3D Graphics:** Three.js + React Three Fiber

### Backend Stack
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **Database:** PostgreSQL 16
- **ORM:** Prisma 5
- **Cache:** Redis 7
- **Real-time:** Socket.io

### AI/LLM Stack
- **Primary:** Ollama (Llama 3.1)
- **Fallback 1:** Kimi K2.5 (Moonshot AI)
- **Fallback 2:** Zhipu GLM
- **Orchestrator:** Custom fallback chain
- **Prompts:** Layered architecture (6 layers)

### Third-Party Integrations
- **Video:** Daily.co (Tencent TRTC migration ready)
- **Whiteboard:** tldraw + Yjs
- **Auth:** NextAuth.js (WeChat OAuth planned)
- **Payments:** Stripe (planned)

---

## Database Schema Highlights

### Core Tables
- `User` - User accounts and roles
- `UserGamification` - XP, levels, streaks, skill scores
- `World` - Learning worlds
- `Mission` - Gamified lessons
- `MissionProgress` - User mission completion
- `AIInteractionSession` - Chat sessions with metrics
- `DailyQuest` / `UserDailyQuest` - Daily task system
- `UserActivityLog` - Analytics tracking
- `Curriculum` / `Module` / `Lesson` - Content structure
- `AITutorSubscription` - Subscription management

### Key Features
- **Soft Deletes:** All tables support soft deletion
- **Audit Logs:** Activity tracking for analytics
- **Real-time:** WebSocket support for live features
- **Scalability:** Indexed for performance

---

## User Flows

### Student Onboarding
1. Register account
2. Complete profile (grade, subjects, goals)
3. 60-second AI assessment conversation
4. Select AI avatar personality
5. Unlock Survival World
6. Complete first mission (instant win)
7. Dashboard tour

### Daily Learning Flow
1. Check daily quests
2. Review streak status
3. Select learning mode (Free Chat or Mission)
4. Choose world/mission
5. Complete mission with AI tutor
6. Earn XP and skill improvements
7. Track progress

### Mission Completion Flow
1. Start mission
2. AI introduces objective
3. Interactive learning segments
4. Speaking challenges
5. Real-time feedback
6. Mission completion scoring
7. XP and skill updates
8. Progress to next mission

---

## Analytics & Insights

### Tracked Metrics
- Session duration and engagement
- Skill score progression
- Mission completion rates
- Drop-off points
- Most challenging content
- Common mistakes patterns
- Speaking time and confidence

### Reports
- **Weekly Report:** Progress summary (PRO/ELITE)
- **Confidence Trends:** Speaking confidence over time
- **Skill Breakdown:** Performance per skill area
- **Achievement Progress:** Unlock status
- **Learning Velocity:** XP gain rate

---

## Competitive Advantages

1. **AI Confidence Engine™** - Unique confidence scoring system
2. **Socratic + Gamification** - Pedagogical rigor + engagement
3. **World-Based Learning** - Story-driven progression
4. **Adaptive Difficulty** - Personalized challenge level
5. **Personality-Based AI** - 5 distinct teaching styles
6. **1:50 Tutor Ratio** - Scalable human support
7. **Real-World Simulations** - Practical scenario training

---

## Roadmap

### Completed (Phase 1-3)
- ✅ Core gamification infrastructure
- ✅ XP/Level/Streak systems
- ✅ 7 Learning Worlds
- ✅ Mission system
- ✅ 5 AI Personalities
- ✅ Dashboard integration
- ✅ AI Tutor integration

### In Progress (Phase 4)
- 🔄 Streak shield mechanism
- 🔄 Weekly report generation
- 🔄 Pronunciation analysis
- 🔄 Achievement unlock animations
- 🔄 Leaderboard system

### Planned (Phase 5+)
- 📋 Mobile app (React Native)
- 📋 WeChat Mini Program
- 📋 Corporate licensing
- 📋 Certification system
- 📋 Marketplace (avatar skins)
- 📋 Social features

---

## API Endpoints

### Gamification APIs
- `GET /api/gamification` - User gamification data
- `POST /api/gamification/daily-login` - Check daily login
- `GET /api/gamification/worlds` - List worlds with status
- `GET /api/gamification/missions` - Mission operations
- `GET /api/gamification/quests` - Daily quests

### AI Tutor APIs
- `POST /api/ai-tutor/chat` - Send message with gamification
- `GET /api/ai-tutor/enrollments` - User enrollments
- `POST /api/ai-tutor/sessions` - Create/manage sessions
- `GET /api/ai-tutor/usage` - Usage statistics

### Content APIs
- `GET /api/curriculum` - Curriculum data
- `GET /api/content` - Video content
- `POST /api/quiz/attempt` - Quiz submissions
- `GET /api/progress` - Learning progress

---

## Security & Compliance

- **PII Protection:** Anonymized identifiers in AI prompts
- **Data Encryption:** At rest and in transit
- **GDPR Ready:** Data export and deletion
- **COPPA Compliant:** Age verification for minors
- **Content Moderation:** AI safety controls

---

## Performance Targets

- Page Load: < 2 seconds
- AI Response: < 3 seconds
- Real-time Latency: < 100ms
- Concurrent Users: 10,000+
- Uptime: 99.9%

---

*Last Updated: February 2026*
*Version: 2.0 (Gamification Release)*
