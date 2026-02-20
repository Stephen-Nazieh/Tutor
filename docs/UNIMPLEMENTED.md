# TutorMe – Unimplemented Work

Items below are taken from **FinalThings.md** from the line **"STARTED HERE"** through **"END HERE"**. Only features that are **not implemented** are listed. Where something is already done (e.g. 5.1, 5.3, Student/Tutor dashboard, AI Chat hook), it is noted as done and omitted from the checklist.

---

## 5. Technical Debt & Refactoring

### 5.1 API Route Refactoring
**Status: Done.** withAuth and withCsrf are applied to all state-changing routes in the listed API groups (student, curriculum, content, quiz, ai-tutor, class, gamification, analytics, reports). See TECHNICAL_DEBT_REFACTORING_STATUS.md.

### 5.2 Component Refactoring

- [ ] **EnhancedWhiteboard.tsx** (1,351 → 300–400 lines)
  - Compose extracted hooks
  - Use new UI components
  - Separate canvas renderer

- **Student Dashboard** – Break into smaller components → **Done.**
- **Tutor Dashboard** – Modularize clinic controls → **Done.**
- **AI Chat Widget** – Extract message handlers → **Done.**

### 5.3 Database Optimizations
**Status: Done.** Connection pooling, query optimization, caching layer, read replicas.

---

## 1.0 High Priority Features

### 1.1 Mobile Experience

- [ ] **Responsive Design Audit**
  - Fix mobile layout issues
  - Touch-friendly controls (min 44px)
  - Optimize for 320px+ widths
  - Test on iOS Safari, Chrome Android

- [ ] **PWA Support**
  - Service worker implementation
  - Offline content caching
  - Add to home screen prompt
  - Push notifications

- [ ] **Mobile-Optimized Video**
  - Portrait mode support
  - Swipe gestures for navigation
  - Bottom sheet for controls
  - Battery-aware playback

### 1.2 AI Improvements

- [ ] **Code Execution Sandbox**
  - Docker-based code runner
  - Python, JavaScript support
  - Secure execution environment
  - Output capture and display

---

## 3.0 Video Learning System

- [ ] **Video Upload & Storage**
  - S3-compatible storage integration
  - Video compression and transcoding
  - Multiple quality levels (720p, 1080p)
  - Progress tracking during upload

- [ ] **Video Player Enhancements**
  - Custom skin with Chinese localization
  - Playback speed control (0.5x–2x)
  - Keyboard shortcuts (space, arrows)
  - Picture-in-picture mode
  - Variable quality selection

- [ ] **Video Analytics**
  - Watch time tracking
  - Pause/seek event logging
  - Completion percentage
  - Drop-off point analysis
  - Heatmaps of engagement

- [ ] **Inline Quizzes**
  - Auto-pause at quiz timestamps
  - Overlay quiz interface
  - Resume after completion
  - Skip option with note

---

## 6. Security Hardening

### 6.1 Critical Security Items

| Item                    | Description               | Priority  | Status         |
|-------------------------|---------------------------|----------|----------------|
| CSRF Protection         | Secure state-changing ops | Critical | Done           |
| XSS Prevention          | Sanitize all user inputs  | Critical | Not implemented (partial in code) |
| SQL Injection Review    | Audit all raw queries     | High     | Done           |
| Rate Limiting           | API abuse prevention     | Critical | Not implemented |
| Content Security Policy | CSP headers               | High     | Not implemented |

### 6.2 Data Protection

- [ ] **PII Encryption** – Encrypt sensitive fields at rest
- [ ] **Audit Logging** – Track all data access
- [ ] **Data Retention** – Auto-delete old data per policy
- [ ] **GDPR Compliance** – Data export and deletion
- [ ] **Backup Encryption** – Secure backup storage

### 6.3 Access Control

- [ ] **RBAC Implementation** – Granular permissions
- [ ] **API Key Management** – Secure third-party access
- [ ] **IP Whitelisting** – Admin panel restrictions
- [ ] **Suspicious Activity Detection** – Automated alerts

---

## 7. Performance Optimization

### 7.1 Frontend Performance

| Metric                 | Current | Target | Status        |
|------------------------|---------|--------|---------------|
| First Contentful Paint | ~2.5s   | <1.5s  | Not met       |
| Time to Interactive    | ~4s     | <2s    | Not met       |
| Bundle Size            | ~500KB  | <300KB | Not met       |
| Lighthouse Score       | ~70     | >90    | Not met       |

**Action Items:**

- [ ] Code splitting for route-level chunks
- [ ] Lazy load heavy components (whiteboard, video)
- [ ] Image optimization (WebP, responsive sizes)
- [ ] Font optimization (subset Chinese characters)
- [ ] Critical CSS extraction

### 7.2 Backend Performance

| Metric            | Current | Target   | Status  |
|-------------------|---------|----------|---------|
| API Response Time | ~200ms  | <100ms   | Not met |
| AI Response Time  | ~3s     | <2s      | Not met |
| Concurrent Users  | ~100    | 1000+    | Not met |

**Action Items:**

- [ ] Redis caching for frequent queries
- [ ] Database query optimization
- [ ] AI response streaming
- [ ] WebSocket connection pooling
- [ ] Load balancer configuration

### 7.3 AI Performance

- [ ] **Model Quantization** – Faster inference
- [ ] **Response Caching** – Cache common questions
- [ ] **Batch Processing** – Group similar requests
- [ ] **Provider Optimization** – Smart fallback chain

---

## 8. Testing & QA

### 8.1 Test Coverage

| Type              | Current | Target | Status        |
|-------------------|---------|--------|---------------|
| Unit Tests        | ~5%     | >70%   | Not started   |
| Integration Tests | ~0%     | >50%   | Not started   |
| E2E Tests         | ~0%     | >30%   | Not started   |

**Implementation Plan:**

- [ ] **Unit Tests** – Jest + React Testing Library
  - Custom hooks (5 created, need more)
  - Utility functions
  - API route handlers

- [ ] **Integration Tests**
  - Database operations
  - API endpoint chains
  - Auth flows

- [ ] **E2E Tests** – Playwright
  - Student registration flow
  - Tutor clinic hosting
  - AI tutor conversation
  - Payment flow

### 8.2 Load Testing

- [ ] **Concurrent User Simulation** – 1000+ users
- [ ] **AI Endpoint Stress Test** – Handle peak loads
- [ ] **WebSocket Load Test** – 50 students per clinic
- [ ] **Database Stress Test** – Connection pool limits

### 8.3 Monitoring

- [ ] **Error Tracking** – Sentry integration
- [ ] **Performance Monitoring** – APM (New Relic/Datadog)
- [ ] **Uptime Monitoring** – Pingdom/StatusCake
- [ ] **AI Latency Tracking** – Monitor provider response times
- [ ] **Cost Monitoring** – Track AI API usage costs

---

*Source: FinalThings.md from "STARTED HERE" to "END HERE". Implemented items (5.1, 5.3, Student/Tutor dashboard, AI Chat extraction, CSRF, SQL injection review) noted as done.*
