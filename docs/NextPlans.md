# TutorMe - Next Development Plans

This document outlines the planned features and improvements for the TutorMe platform, organized by priority and development phase.

---

## Completed Features ✅

### Whiteboard Enhancements (Completed)
- [x] **Changeable background colors and styles** - 6 color options (White, Black, Blue, Green, Dark Gray, Cream)
- [x] **Multiple pages support** - Create, delete, and navigate between pages
- [x] **Zoom and Pan** - Zoom from 10% to 500%, pan around the canvas
- [x] **Video overlay on whiteboard** - Picture-in-picture video that can be hidden or fullscreened
- [x] **Text typing on whiteboard** - Click anywhere to add text with adjustable font size
- [x] **Drawing tools** - Pen, eraser, text, and hand (pan) tools
- [x] **Background patterns** - Grid, dots, lines, or solid background
- [x] **Improved text input** - Better UI with textarea, formatting toolbar, drag handle
- [x] **Selectable and movable objects** - Fixed selection, click to select, drag to move, Delete key to remove
- [x] **Straight line drawing** - Click to start, click to end line mode
- [x] **Basic shapes** - Rectangle, circle, and triangle drawing with drag-to-create
- [x] **Keyboard shortcuts** - Ctrl+Z to undo, Delete to remove selected objects
- [x] **Multiple text overlays** - Multiple editable text boxes at once
- [x] **Draggable text overlays** - Text inputs can be moved before confirming
- [x] **Text formatting** - Bold, italic, underline, left/center/right alignment
- [x] **Text confirmed as rectangle** - After adding, text shows with border and edit button
- [x] **Draggable video overlay** - Video can be moved around the whiteboard
- [x] **Video fullscreen 70% centered** - Fullscreen video is 70% of whiteboard, centered
- [x] **Triangle shape** - Added triangle to drawing tools
- [x] **Fixed zoom behavior** - Canvas stays full size, viewport zooms (10% shows entire page)
- [x] **Text-to-speech** - Volume button in text overlay reads text aloud
- [x] **Asset sidebar** - Upload images/documents, drag to set as background
- [x] **Resizable text overlays** - Drag bottom-right corner to resize
- [x] **Teaching Assistant Panel** - AI-powered teaching assistant with:
  - Live notes recording (manual and auto)
  - Task generation from notes, prompts, or documents
  - Task assignment to students
  - Auto-grading and manual grading
  - Detailed student reports with strengths/weaknesses/recommendations
  - Student monitoring with engagement/understanding tracking

### Curriculum System (Completed)
- [x] **Lesson Session Model** - Database schema for tracking structured lessons
- [x] **5-Stage Lesson Flow** - Introduction → Concept → Example → Practice → Review
- [x] **Progress Tracking** - Concept mastery, section completion, lesson status
- [x] **API Routes** - Full CRUD for lessons, sessions, progress
- [x] **Frontend Pages** - Curriculum listing, detail, and lesson session pages

---

## Phase 1: Testing & Stabilization (Week 1-2)

### 1.1 Curriculum System Testing
- **End-to-End Testing**
  - Test complete lesson flow from enrollment to completion
  - Verify AI tutor responses follow structured curriculum stages
  - Test section advancement logic (introduction → concept → example → practice → review)
  - Validate concept mastery tracking accuracy
  - Test prerequisite locking mechanism
  
- **Bug Fixes**
  - Fix any TypeScript type errors in API routes
  - Resolve database connection issues
  - Fix UI rendering issues on mobile devices
  - Address AI response parsing edge cases

### 1.2 AI Tutor Improvements
- **Prompt Engineering**
  - Refine curriculum-based prompts for better Chinese language support
  - Add subject-specific teaching prompts (Math, Science, English)
  - Implement better error handling for AI provider failures
  - Add fallback responses when AI is unavailable
  
- **Response Quality**
  - Improve whiteboard item extraction accuracy
  - Better understanding level assessment
  - Add support for mathematical formula rendering
  - Implement code syntax highlighting in whiteboard

### 1.3 Database & Performance
- **Optimization**
  - Add database indexes for frequently queried fields
  - Implement Redis caching for lesson content
  - Optimize Prisma queries to reduce N+1 issues
  - Add connection pooling for PostgreSQL

---

## Phase 2: Core Feature Completion (Week 3-6)

### 2.1 Video Content Integration
- **Video Learning System**
  - Upload and stream video lessons
  - Implement video progress tracking (watched duration, completion %)
  - Add inline quizzes during video playback
  - Support video chapters/segments
  - Generate AI summaries from video transcripts
  
- **Video Features**
  - Picture-in-picture mode
  - Variable playback speed (0.5x - 2x)
  - Video notes with timestamps
  - Auto-generated subtitles
  - Video quality selection

### 2.2 Quiz & Assessment System
- **Quiz Engine**
  - AI-generated quizzes based on lesson content
  - Multiple question types (MCQ, fill-in-blank, short answer, coding)
  - Adaptive difficulty based on student performance
  - Immediate feedback with explanations
  - Spaced repetition for review
  
- **Assessment Features**
  - AI grading for short answer questions
  - Manual review queue for human tutors
  - Detailed analytics on common mistakes
  - Progress reports for students and parents

### 2.3 Live Clinic Sessions
- **Real-time Tutoring**
  - WebSocket-based live sessions
  - 1 tutor : 50 students ratio support
  - AI monitoring to flag struggling students
  - Breakout rooms for group discussions
  - Screen sharing capabilities
  
- **Live Session Features**
  - Raise hand functionality
  - Real-time chat with moderation
  - Collaborative whiteboard (tldraw + Yjs)
  - Session recording for replay
  - AI-generated session summaries

---

## Phase 3: Gamification & Engagement (Week 7-9)

### 3.1 Gamification System
- **Achievement System**
  - Badges for lesson completion streaks
  - Achievement categories: Learning, Practice, Social, Special
  - Unlockable avatars and themes
  - Milestone celebrations
  
- **Points & Rewards**
  - XP system for all learning activities
  - Daily login bonuses
  - Challenge missions (complete 3 lessons, help a peer, etc.)
  - Leaderboards (weekly, monthly, all-time)
  - Virtual currency for rewards shop

### 3.2 Social Features
- **Study Groups**
  - Create/join study groups
  - Group challenges and competitions
  - Peer tutoring marketplace
  - Discussion forums per subject
  
- **Parent Dashboard**
  - Progress reports and analytics
  - Time spent learning
  - Strengths and areas for improvement
  - Notification system for milestones

---

## Phase 4: Platform Expansion (Week 10-12)

### 4.1 Multi-Subject Support
- **Subject Curriculum Templates**
  - Mathematics (Algebra, Geometry, Calculus)
  - Sciences (Physics, Chemistry, Biology)
  - Programming (Python, JavaScript, Java)
  - Languages (English, Chinese, Spanish)
  
- **Subject-Specific Features**
  - Math: LaTeX rendering, graph plotting
  - Programming: Code execution sandbox
  - Languages: Pronunciation practice, speech recognition
  - Science: Virtual labs, simulations

### 4.2 Tutor Dashboard
- **Tutor Tools**
  - Student progress monitoring
  - AI-assisted lesson preparation
  - Performance analytics
  - Earnings tracking
  - Schedule management
  
- **Live Clinic Management**
  - Queue management system
  - Student attention flags (AI-powered)
  - Quick intervention tools
  - Session templates

### 4.3 Admin Panel
- **Content Management**
  - Curriculum builder UI
  - Lesson editor with preview
  - AI prompt management
  - Content moderation tools
  
- **System Administration**
  - User management
  - Analytics dashboard
  - AI provider configuration
  - Billing and subscriptions

---

## Phase 5: Production Readiness (Week 13-15)

### 5.1 Authentication & Payments
- **Authentication**
  - WeChat OAuth integration
  - Phone number login
  - JWT token refresh mechanism
  - Role-based access control (RBAC)
  
- **Payment System**
  - WeChat Pay integration
  - Subscription plans (Free, Basic, Pro)
  - One-time course purchases
  - Referral system
  - Coupon/discount codes

### 5.2 Infrastructure
- **Deployment**
  - Hong Kong VPS setup
  - Docker containerization
  - Nginx reverse proxy with SSL
  - Automated CI/CD pipeline
  - Database backup automation
  
- **Monitoring**
  - Prometheus + Grafana setup
  - Error tracking (Sentry)
  - Uptime monitoring
  - AI provider latency monitoring
  - Cost tracking for AI API usage

### 5.3 Mobile Experience
- **Mobile Optimization**
  - PWA (Progressive Web App) support
  - Responsive design improvements
  - Touch-optimized interactions
  - Offline mode for cached content
  - Push notifications
  
- **Mobile App (Future)**
  - React Native or Flutter evaluation
  - Native video player integration
  - Background audio for lessons

---

## Phase 6: AI Improvements (Ongoing)

### 6.1 AI Model Enhancements
- **Local AI Optimization**
  - Fine-tune Llama 3.1 for Chinese tutoring
  - Optimize Ollama for faster responses
  - Implement model quantization for speed
  
- **Multi-Provider Strategy**
  - Smart provider selection based on query type
  - Cost optimization across providers
  - Fallback chain improvements
  - Response quality evaluation

### 6.2 Advanced AI Features
- **Personalized Learning**
  - Learning style detection
  - Adaptive difficulty adjustment
  - Personalized study plans
  - Weakness identification and remediation
  
- **AI Content Generation**
  - Auto-generate practice problems
  - Create personalized quizzes
  - Generate study summaries
  - Translate content between languages

---

## Technical Debt & Maintenance

### Code Quality
- [ ] Increase test coverage (unit, integration, e2e)
- [ ] Implement API documentation (Swagger/OpenAPI)
- [ ] Add comprehensive error logging
- [ ] Set up code linting and formatting (ESLint, Prettier)
- [ ] Database migration strategy documentation

### Security
- [ ] Security audit for API endpoints
- [ ] PII data handling compliance
- [ ] Rate limiting implementation
- [ ] SQL injection prevention review
- [ ] XSS protection verification

### Documentation
- [ ] API documentation for all endpoints
- [ ] Frontend component documentation
- [ ] Database schema documentation
- [ ] Deployment guide
- [ ] Contributing guidelines

---

## Feature Priorities

### High Priority (Must Have)
1. Video content integration
2. Quiz/assessment system
3. WeChat OAuth & payments
4. Live clinic sessions
5. Mobile optimization

### Medium Priority (Should Have)
1. Gamification system
2. Parent dashboard
3. Tutor dashboard
4. Multi-subject support
5. Study groups

### Low Priority (Nice to Have)
1. Native mobile app
2. VR/AR learning experiences
3. Advanced analytics
4. White-label options
5. Integration with school systems

---

## Budget Considerations

### Development Costs (¥15,000 remaining)
- AI API usage: ¥3,000
- VPS hosting: ¥3,000
- Daily.co video: ¥2,000
- Domain & SSL: ¥500
- Third-party services: ¥2,000
- Contingency: ¥4,500

### Revenue Streams (Target)
- Student subscriptions: ¥50-100/month
- One-time course purchases: ¥100-500
- Tutor commissions: 20-30%
- Enterprise licenses for schools

---

## Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Average session duration
- Lesson completion rate
- Return rate (7-day, 30-day)

### Learning Effectiveness
- Concept mastery improvement
- Quiz scores over time
- Time to complete lessons
- Student satisfaction scores

### Business Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Churn rate

---

## Notes

- Keep architecture modular for easy feature additions
- Prioritize mobile experience for Chinese market
- Ensure AI responses are culturally appropriate
- Maintain strict data privacy compliance
- Plan for scalability from day one
- Regular user feedback collection and iteration

---

*Last Updated: February 2026*
*Next Review: End of Phase 1*
