# Live Class Page - Inactive Links Fix Implementation Plan

**Date:** 2026-02-20  
**Scope:** Fix all inactive/incomplete buttons and links on the live class page

---

## 📊 Current Issues Analysis

### 1. Left Sidebar Navigation
**Problem:** Links may not navigate or lack proper routing
**Root Cause:** Missing `onClick` handlers or incorrect `href` attributes

### 2. Top Tabs (Students, Progress, Rooms, Analytics)
**Problem:** Only "Rooms" tab shows content
**Root Cause:** Missing content components for other tabs

### 3. Right Panel (AI Assistant, Hand Raises, Chat)
**Problem:** Shows mock/demo data only
**Root Cause:** Not connected to real-time backend (Socket.io)

### 4. Breakout Room Actions
**Problem:** Buttons like "Broadcast", "Join Room", "Add" don't work
**Root Cause:** Missing socket events and backend integration

---

## 🔧 Implementation Phases

### Phase 1: Navigation Links (2-3 hours)

#### What Goes Into Each Link:

| Link | Destination | Features |
|------|-------------|----------|
| **Dashboard** | `/tutor/dashboard` | Tutor overview, upcoming classes, analytics summary |
| **My Classes** | `/tutor/classes` | List of all classes, schedule, manage enrollments |
| **Calendar** | `/tutor/calendar` | Full calendar view, create/edit sessions, availability |
| **Whiteboards** | `/tutor/whiteboards` | List of whiteboards, create new, recent activity |
| **Courses** | `/tutor/courses` | Course catalog, enrolled students, progress tracking |
| **Quizzes** | `/tutor/quizzes` | Quiz bank, results, analytics, create new |
| **Question Bank** | `/tutor/question-bank` | Searchable question database, tags, import/export |
| **Resources** | `/tutor/resources` | File manager, upload, share with students |
| **Students** | `/tutor/students` | Student roster, performance, messaging |
| **Messages** | `/tutor/messages` | Inbox, sent, conversations with students |
| **My Groups** | `/tutor/groups` | Study groups, discussions, group assignments |
| **Help & Support** | `/tutor/help` OR modal | FAQ, contact support, documentation |

#### Implementation:

```tsx
// Created: src/components/class/live-class-sidebar.tsx

// Key Features:
1. All links properly mapped to existing routes
2. Confirmation dialog before leaving active session
3. Active state highlighting
4. Responsive design
```

**Files to Modify:**
- Update existing sidebar component to use the new navigation handlers
- Add confirmation dialog for session leave

---

### Phase 2: Top Tab Navigation (4-6 hours)

#### What Goes Into Each Tab:

##### Students Tab
**Purpose:** Monitor and manage students in the live session

**Content:**
```tsx
interface StudentsTabContent {
  // Student List
  - All students currently in session
  - Online/offline status
  - Engagement score (0-100)
  - Attention level (focused/distracted/away)
  
  // Actions
  - Send direct message
  - Mute/unmute
  - Remove from session
  - Award participation points
  
  // Filters
  - Search by name
  - Filter by engagement level
  - Sort by name/status/score
  
  // Metrics
  - Total students
  - Active speakers
  - Hand raises count
  - Average engagement
}
```

**API Needed:**
```typescript
GET /api/class/:roomId/students
POST /api/class/:roomId/students/:id/mute
POST /api/class/:roomId/students/:id/remove
```

---

##### Progress Tab
**Purpose:** Track lesson progress and completion

**Content:**
```tsx
interface ProgressTabContent {
  // Lesson Structure
  - Current lesson/module name
  - List of lesson sections
  - Completion percentage per section
  
  // Timeline
  - Sections completed (green)
  - Current section (blue)
  - Upcoming sections (gray)
  - Estimated time remaining
  
  // Class Progress
  - % of students who completed each section
  - Average time per section
  - Students who are behind
  
  // Controls
  - Jump to specific section
  - Mark section complete
  - Add time extension
}
```

---

##### Rooms Tab (✅ Already Working)
**Purpose:** Manage breakout rooms

**Content:**
- List of breakout rooms
- Create/Edit/Delete rooms
- Assign students to rooms
- Monitor room activity

---

##### Analytics Tab
**Purpose:** Real-time session analytics

**Content:**
```tsx
interface AnalyticsTabContent {
  // Engagement Metrics
  - Overall class engagement score
  - Individual student engagement
  - Engagement over time (graph)
  
  // Participation
  - Speaking time distribution
  - Chat message counts
  - Hand raise frequency
  - Quiz response rates
  
  // Attention Tracking
  - Students tabbed away
  - Camera on/off stats
  - Microphone usage
  
  // Visualizations
  - Bar charts for participation
  - Line graph for engagement over time
  - Heatmap of student activity
  
  // AI Insights
  - Students who may need help
  - Suggested interventions
  - Engagement predictions
}
```

**API Needed:**
```typescript
GET /api/class/:roomId/analytics
GET /api/class/:roomId/analytics/realtime
```

---

### Phase 3: Right Panel Real-Time Features (8-12 hours)

#### AI Teaching Assistant Panel

**Tabs:**
1. **Insights** - Real-time AI analysis
2. **Socratic** - AI-generated questioning prompts
3. **Guide** - Lesson plan guide

**Implementation:**
```tsx
// Components needed:
- AIInsightsPanel.tsx      // Real-time student analysis
- SocraticPanel.tsx        // AI questioning suggestions
- LessonGuidePanel.tsx     // Lesson plan reference

// Data Flow:
Socket Events:
  - ai:insight:new         // New AI insight available
  - ai:socratic:suggestion // New Socratic question
  - ai:alert               // Urgent attention needed
```

**What Goes Into AI Insights:**
- Common misconception alerts (e.g., "3 students confusing derivative with slope")
- Socratic opportunities (when to ask deeper questions)
- Engagement drops (students losing focus)
- Struggling student alerts
- Participation imbalances

---

#### Hand Raises Panel

**Features:**
```tsx
interface HandRaise {
  id: string
  studentId: string
  studentName: string
  topic: string           // "Question about homework"
  priority: 'normal' | 'urgent'
  timestamp: Date
  status: 'waiting' | 'acknowledged' | 'answered'
}

// Actions:
- Acknowledge (notify student you're aware)
- Answer (mark as resolved)
- Dismiss (student resolved it themselves)
- Prioritize (move to top of queue)
```

**Socket Events:**
```typescript
// Student raises hand
socket.emit('hand:raise', { topic, priority })

// Tutor acknowledges
socket.emit('hand:acknowledge', { handRaiseId })

// Tutor answers
socket.emit('hand:answer', { handRaiseId })

// Listen for updates
socket.on('hand:update', (handRaise) => { ... })
```

---

#### Chat Panel

**Features:**
```tsx
interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: 'tutor' | 'student'
  message: string
  timestamp: Date
  type: 'text' | 'question' | 'reaction'
  isPinned?: boolean
}

// Features:
- Real-time messaging
- Question tagging (auto-detect questions)
- Pin important messages
- Filter by type (All, Questions, Pinned)
- Broadcast message to all students
```

**Socket Events:**
```typescript
// Send message
socket.emit('chat:message', { message, type })

// Receive messages
socket.on('chat:message:new', (message) => { ... })

// Pin message
socket.emit('chat:pin', { messageId })
```

---

### Phase 4: Breakout Room Actions (4-6 hours)

#### Broadcast Button
**Purpose:** Send message to all breakout rooms simultaneously

**Implementation:**
```tsx
// When clicked:
1. Open modal with text input
2. Tutor types message
3. On send:
   socket.emit('breakout:broadcast', {
     message: string,
     rooms: string[] // all active room IDs
   })
4. Students in all rooms see notification
```

---

#### Join Room Button
**Purpose:** Tutor joins a specific breakout room

**Implementation:**
```tsx
// When clicked:
1. Get selected room ID
2. socket.emit('breakout:join', { roomId })
3. Switch video view to breakout room
4. Show "Return to Main Room" button
```

---

#### Add Students Button
**Purpose:** Assign students to breakout rooms

**Implementation:**
```tsx
// When clicked:
1. Open modal with:
   - List of unassigned students
   - Drag-and-drop interface
   - Auto-assign options (random, skill-based)
2. On save:
   socket.emit('breakout:assign', {
     roomId: string,
     studentIds: string[]
   })
```

---

#### End All Sessions Button
**Purpose:** Close all breakout rooms and return students to main room

**Implementation:**
```tsx
// When clicked:
1. Show confirmation: "End all breakout sessions?"
2. On confirm:
   socket.emit('breakout:end-all')
3. All students receive:
   socket.on('breakout:return-to-main', () => {
     // Auto-redirect to main room
   })
```

---

## 📁 Files to Create/Modify

### New Files:
```
src/components/class/
├── live-class-sidebar.tsx       // Fixed sidebar with navigation
├── tabs/
│   ├── students-tab.tsx         // Students monitoring tab
│   ├── progress-tab.tsx         // Lesson progress tab
│   └── analytics-tab.tsx        // Real-time analytics tab
├── panels/
│   ├── ai-insights-panel.tsx    // AI insights content
│   ├── socratic-panel.tsx       // Socratic questions
│   ├── lesson-guide-panel.tsx   // Lesson plan guide
│   ├── hand-raises-panel.tsx    // Hand raise management
│   └── chat-panel.tsx           // Chat interface
└── breakout/
    ├── broadcast-modal.tsx      // Broadcast message modal
    ├── assign-students-modal.tsx // Student assignment modal
    └── room-controls.tsx        // Room action buttons
```

### Modified Files:
```
src/app/tutor/live-class/[sessionId]/
├── page.tsx                     // Integrate new components

src/lib/socket-server.ts         // Add new socket events
```

---

## 🔌 Socket.io Events Needed

### Server-Side Events (socket-server.ts)

```typescript
// Hand Raises
socket.on('hand:raise', handleHandRaise)
socket.on('hand:acknowledge', handleHandAcknowledge)
socket.on('hand:answer', handleHandAnswer)

// Chat
socket.on('chat:message', handleChatMessage)
socket.on('chat:pin', handlePinMessage)

// Breakout Rooms
socket.on('breakout:broadcast', handleBroadcast)
socket.on('breakout:join', handleJoinRoom)
socket.on('breakout:assign', handleAssignStudents)
socket.on('breakout:end-all', handleEndAllSessions)

// Analytics
socket.on('analytics:subscribe', handleAnalyticsSubscribe)
```

### Client-Side Events

```typescript
// Hand Raises
socket.on('hand:update', updateHandRaises)
socket.on('hand:new', notifyNewHandRaise)

// Chat
socket.on('chat:message:new', addChatMessage)
socket.on('chat:message:pinned', updatePinnedMessages)

// Breakout
socket.on('breakout:broadcast:received', showBroadcast)
socket.on('breakout:return-to-main', returnToMainRoom)

// Analytics
socket.on('analytics:update', updateAnalyticsData)
```

---

## 🗄️ Database Schema Additions

```sql
-- Hand Raises
CREATE TABLE hand_raises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES live_sessions(id),
  student_id UUID REFERENCES users(id),
  topic TEXT,
  priority VARCHAR(20) DEFAULT 'normal',
  status VARCHAR(20) DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT NOW(),
  acknowledged_at TIMESTAMP,
  answered_at TIMESTAMP
);

-- Chat Messages
CREATE TABLE session_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES live_sessions(id),
  sender_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'text',
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Snapshots
CREATE TABLE session_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES live_sessions(id),
  student_id UUID REFERENCES users(id),
  engagement_score INTEGER,
  attention_level VARCHAR(20),
  speaking_time_seconds INTEGER DEFAULT 0,
  messages_count INTEGER DEFAULT 0,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

---

## ⏱️ Timeline Estimate

| Phase | Duration | Priority |
|-------|----------|----------|
| Phase 1: Navigation Links | 2-3 hours | 🔴 High |
| Phase 2: Top Tabs | 4-6 hours | 🔴 High |
| Phase 3: Right Panel (AI, Chat, Hands) | 8-12 hours | 🔴 High |
| Phase 4: Breakout Actions | 4-6 hours | 🟡 Medium |
| Testing & Integration | 4-6 hours | 🔴 High |
| **Total** | **22-33 hours** | |

---

## 🎯 Success Criteria

- [ ] All sidebar links navigate correctly with session leave confirmation
- [ ] All 4 top tabs show relevant content
- [ ] AI panel shows real-time insights (or simulated with realistic data)
- [ ] Hand raises work end-to-end (raise → acknowledge → answer)
- [ ] Chat shows real messages and allows sending
- [ ] Breakout room buttons perform their actions
- [ ] No console errors
- [ ] Mobile responsive

---

## 🚀 Quick Start

Start with **Phase 1** (Navigation Links) as it's the quickest win and improves usability immediately. Then move to Phase 2 for the tabs, as they're the most visible missing content.

The sidebar component I created (`live-class-sidebar.tsx`) can be integrated right away!
