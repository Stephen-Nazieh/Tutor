# Implementation Plan: Advanced AI Assistant & Breakout Rooms

## Overview
This document outlines the implementation plan for:
1. Enhanced AI Teaching Assistant with student knowledge, personalized tasks, and visual reports
2. Breakout Rooms functionality for small group sessions

---

## Part 1: Enhanced AI Teaching Assistant

### 1.1 Student Knowledge & Performance Tracking

#### Data Model Extensions
```typescript
// Extended Student interface
interface StudentPerformance {
  studentId: string
  overallMetrics: {
    averageScore: number
    completionRate: number
    engagementScore: number
    attendanceRate: number
    participationRate: number
  }
  subjectStrengths: string[]        // Topics student excels at
  subjectWeaknesses: string[]       // Topics needing improvement
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  pace: 'fast' | 'normal' | 'slow'
  
  // Historical data
  taskHistory: {
    taskId: string
    score: number
    timeSpent: number
    attempts: number
    completedAt: Date
    strengths: string[]
    weaknesses: string[]
  }[]
  
  // Behavioral patterns
  commonMistakes: {
    type: string
    frequency: number
    lastOccurred: Date
  }[]
  
  // Grouping data
  performanceCluster: 'advanced' | 'intermediate' | 'struggling'
  recommendedPeerGroup: string[]  // Students with similar level for group work
}
```

#### Database Schema Additions
```prisma
model StudentPerformance {
  id              String   @id @default(cuid())
  studentId       String
  curriculumId    String
  
  // Metrics
  averageScore    Float    @default(0)
  completionRate  Float    @default(0)
  engagementScore Float    @default(0)
  
  // JSON stored data
  strengths       Json     @default("[]")
  weaknesses      Json     @default("[]")
  taskHistory     Json     @default("[]")
  commonMistakes  Json     @default("[]")
  
  // Clustering
  cluster         String   @default("intermediate") // advanced, intermediate, struggling
  
  updatedAt       DateTime @updatedAt
  createdAt       DateTime @default(now())
  
  @@unique([studentId, curriculumId])
}
```

#### Implementation Steps
1. **Create Performance Service** (`lib/performance/student-analytics.ts`)
   - Calculate metrics from task submissions
   - Identify strengths/weaknesses using AI analysis
   - Update cluster assignment based on performance
   - Track common mistake patterns

2. **Performance Tracking Hook** (`hooks/use-student-performance.ts`)
   - Real-time performance updates
   - Caching and optimization
   - Subscription to performance changes

---

### 1.2 Personalized Task Generation

#### Task Generation Modes
```typescript
type TaskDistributionMode = 
  | 'uniform'        // Same task for all
  | 'personalized'   // Individual customized tasks
  | 'clustered'      // Group by performance cluster
  | 'peer_groups'    // Similar-level students grouped

interface TaskGenerationRequest {
  mode: TaskDistributionMode
  basePrompt: string
  difficultyRange?: { min: number; max: number }
  
  // For personalized mode
  adaptToStudent?: boolean  // Adjust based on individual strengths/weaknesses
  
  // For clustered mode
  clusters?: ('advanced' | 'intermediate' | 'struggling')[]
  
  // For peer groups
  groupSize?: number
  
  // Content options
  topics?: string[]
  taskTypes?: ('quiz' | 'assignment' | 'practice' | 'project')[]
}
```

#### AI Prompt Templates
```typescript
// Uniform task generation
const UNIFORM_TASK_PROMPT = `Generate a {taskType} for {gradeLevel} students on {topic}.
Difficulty: {difficulty}
Learning Objectives: {objectives}

Requirements:
- Clear instructions
- Appropriate for all students
- Include answer key`;

// Personalized task generation
const PERSONALIZED_TASK_PROMPT = `Generate a customized {taskType} for student {studentName}.

Student Profile:
- Strengths: {strengths}
- Areas for improvement: {weaknesses}
- Learning pace: {pace}
- Previous scores: {scoreHistory}

Topic: {topic}
Base Difficulty: {difficulty}

Requirements:
- Emphasize student's strengths to build confidence
- Include targeted practice for weak areas
- Adjust complexity to match student's pace
- Provide scaffolding for challenging concepts`;

// Cluster-based task generation
const CLUSTER_TASK_PROMPT = `Generate a {taskType} for {cluster} performance level students.

Cluster Characteristics:
- Typical scores: {scoreRange}
- Common strengths: {clusterStrengths}
- Common challenges: {clusterWeaknesses}

Topic: {topic}
Difficulty: {adjustedDifficulty}

Requirements:
- Appropriate challenge level for this cluster
- Address common misconceptions
- Build on cluster strengths`;
```

#### Implementation Steps
1. **Enhanced Task Generator** (`lib/ai/task-generator.ts`)
   - Support all distribution modes
   - Fetch student profiles for personalization
   - Generate multiple task variants
   - Save tasks with student assignments

2. **Task Assignment Logic**
   ```typescript
   // Assignment strategies
   function assignTasks(
     generatedTasks: Task[],
     students: Student[],
     mode: TaskDistributionMode
   ): StudentTaskAssignment[] {
     switch(mode) {
       case 'uniform':
         return assignSameTaskToAll(students, generatedTasks[0])
       case 'personalized':
         return matchTasksToStudents(students, generatedTasks)
       case 'clustered':
         return assignByCluster(students, generatedTasks)
       case 'peer_groups':
         return assignToPeerGroups(students, generatedTasks)
     }
   }
   ```

3. **UI Updates**
   - Task generation dialog with mode selector
   - Student preview showing who gets what task
   - Visual indicators for personalized content

---

### 1.3 Tutor Approval Workflow for Feedback

#### Feedback Workflow States
```typescript
interface FeedbackWorkflow {
  id: string
  submissionId: string
  status: 'ai_generated' | 'pending_approval' | 'approved' | 'rejected' | 'sent'
  
  // AI Generated feedback
  aiFeedback: {
    score: number
    comments: string
    strengths: string[]
    improvements: string[]
    resources: string[]
  }
  
  // Tutor modifications
  tutorEdits?: {
    modifiedScore?: number
    modifiedComments?: string
    addedNotes?: string
    approvedAt?: Date
  }
  
  // Settings
  autoApproveThreshold?: number  // Auto-approve if score > threshold
  requiresApproval: boolean      // Tutor approval required
}
```

#### UI Components
1. **Feedback Review Panel**
   - Side-by-side AI feedback and editable fields
   - Approve/Reject/Edit buttons
   - Bulk approval for multiple submissions
   - Preview of student-facing feedback

2. **Approval Settings Dialog**
   - Toggle auto-approve for high scores
   - Set approval thresholds
   - Configure which task types require approval

#### Implementation Steps
1. **Workflow Service** (`lib/feedback/workflow.ts`)
   - Create feedback workflows
   - Handle approval/rejection
   - Manage auto-approval rules
   - Track feedback history

2. **Notification System**
   - Notify tutors of pending approvals
   - Notify students when feedback is sent
   - Email/push notification integration

---

### 1.4 Visual Reports & Analytics Dashboard

#### Chart Components Needed
```typescript
// Report visualization components
interface ReportCharts {
  // Overall performance
  ScoreDistributionChart      // Histogram of class scores
  PerformanceTrendLine        // Score trends over time
  
  // Comparative analytics
  ClassAverageComparison      // Student vs class average
  PeerGroupComparison         // Student vs similar peers
  
  // Skill breakdown
  SkillsRadarChart            // Multi-dimensional skills view
  TopicMasteryBarChart        // Mastery per topic
  
  // Behavioral insights
  EngagementTimeline          // Participation over lesson
  TimeSpentAnalysis           // Time per question/task
  AttemptsDistribution        // Number of attempts
}
```

#### Chart Library Selection
- **Recharts** (React-friendly, customizable)
- Alternative: **Chart.js** with react-chartjs-2

#### Report Views
1. **Individual Student Report**
   ```
   ┌─────────────────────────────────────────┐
   │ Student Name: Zhang Wei                 │
   │ Overall Score: 85% (B+)                 │
   │ ┌─────────────────────────────────────┐ │
   │ │ Score Trend (Line Chart)            │ │
   │ └─────────────────────────────────────┘ │
   │ ┌──────────┐ ┌──────────────────────┐  │
   │ │ Skills   │ │ Topic Mastery        │  │
   │ │ Radar    │ │ Bar Chart            │  │
   │ │ Chart    │ │                      │  │
   │ └──────────┘ └──────────────────────┘  │
   │ Strengths: [List]                      │
   │ Areas for Improvement: [List]          │
   │ Recommendations: [List]                │
   └─────────────────────────────────────────┘
   ```

2. **Class Overview Dashboard**
   ```
   ┌─────────────────────────────────────────┐
   │ Class Performance Dashboard             │
   │ ┌─────────────────────────────────────┐ │
   │ │ Score Distribution (Histogram)      │ │
   │ └─────────────────────────────────────┘ │
   │ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
   │ │ Top      │ │ Needs    │ │ Average │ │
   │ │ Students │ │ Attention│ │ Progress│ │
   │ │ Table    │ │ Table    │ │ Chart   │ │
   │ └──────────┘ └──────────┘ └─────────┘ │
   └─────────────────────────────────────────┘
   ```

#### Implementation Steps
1. **Install Chart Dependencies**
   ```bash
   npm install recharts
   ```

2. **Create Chart Components**
   - `components/analytics/score-distribution-chart.tsx`
   - `components/analytics/performance-trend-chart.tsx`
   - `components/analytics/skills-radar-chart.tsx`
   - `components/analytics/topic-mastery-chart.tsx`

3. **Report Dashboard Page**
   - `/tutor/reports/[studentId]` - Individual reports
   - `/tutor/reports/class-overview` - Class dashboard

---

### 1.5 API Routes

```typescript
// New API endpoints

// Performance tracking
GET    /api/students/:id/performance
POST   /api/students/:id/performance/update
GET    /api/class/:id/performance-summary

// Personalized task generation
POST   /api/tasks/generate-personalized
POST   /api/tasks/generate-by-clusters
POST   /api/tasks/generate-peer-groups

// Feedback workflow
GET    /api/feedback/pending
POST   /api/feedback/:id/approve
POST   /api/feedback/:id/reject
POST   /api/feedback/settings

// Reports
GET    /api/reports/student/:id
GET    /api/reports/class/:id
GET    /api/reports/analytics/:id
```

---

## Part 2: Breakout Rooms

### 2.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Room (Tutor)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Breakout 1   │  │ Breakout 2   │  │ Breakout 3   │      │
│  │ ┌──┐  ┌──┐  │  │ ┌──┐  ┌──┐  │  │ ┌──┐  ┌──┐  │      │
│  │ │S1│  │S2│  │  │ │S3│  │S4│  │  │ │S5│  │S6│  │      │
│  │ └──┘  └──┘  │  │ └──┘  └──┘  │  │ └──┘  └──┘  │      │
│  │ AI Assistant │  │ AI Assistant │  │ AI Assistant│      │
│  │ Available    │  │ Available    │  │ Available   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  Tutor can:                                                 │
│  • Broadcast to all rooms                                   │
│  • Join any room                                            │
│  • Monitor all rooms (dashboard view)                       │
│  • Assign different tasks per room                          │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Data Models

```typescript
interface BreakoutRoom {
  id: string
  mainRoomId: string        // Parent clinic room
  name: string
  
  // Participants
  participants: {
    studentId: string
    name: string
    joinedAt: Date
    role: 'student' | 'tutor'
  }[]
  
  // AI Assistant
  aiAssistant: {
    enabled: boolean
    mode: 'passive' | 'active' | 'socratic'
    currentTask?: string
  }
  
  // Session state
  status: 'forming' | 'active' | 'paused' | 'closed'
  createdAt: Date
  timeLimit?: number        // Minutes
  endsAt?: Date
  
  // Content
  assignedTask?: Task
  sharedWhiteboard: WhiteboardState
  chatHistory: ChatMessage[]
  
  // Monitoring
  aiNotes: string[]         // AI-generated observations
  alerts: {
    type: 'confusion' | 'conflict' | 'off_topic' | 'need_help'
    timestamp: Date
    message: string
  }[]
}

interface BreakoutSession {
  id: string
  mainRoomId: string
  tutorId: string
  
  // Configuration
  config: {
    roomCount: number
    participantsPerRoom: number
    distributionMode: 'random' | 'skill_based' | 'manual' | 'self_select'
    timeLimit: number
    aiAssistantEnabled: boolean
  }
  
  // Rooms
  rooms: BreakoutRoom[]
  
  // Control
  status: 'setting_up' | 'active' | 'closing' | 'ended'
  startedAt?: Date
  endedAt?: Date
}
```

### 2.3 Breakout Room Creation Flow

```
Tutor initiates breakout rooms
        ↓
┌───────────────────────────┐
│ Breakout Configuration    │
│ • Number of rooms         │
│ • Students per room       │
│ • Distribution method     │
│ • Time limit              │
│ • Enable AI assistant     │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│ Assign Students           │
│ Random: Auto-assign       │
│ Skill-based: By cluster   │
│ Manual: Tutor selects     │
│ Self-select: Students pick│
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│ Assign Tasks (Optional)   │
│ • Same task to all        │
│ • Different per room      │
│ • AI-generated per group  │
└───────────────────────────┘
        ↓
   Rooms Created → Students Join
```

### 2.4 UI Components

#### Breakout Control Panel (Tutor View)
```typescript
interface BreakoutControlPanelProps {
  session: BreakoutSession
  onCreateRooms: (config: BreakoutConfig) => void
  onCloseRooms: () => void
  onBroadcast: (message: string) => void
  onJoinRoom: (roomId: string) => void
  onAssignTask: (roomId: string, task: Task) => void
}
```

Features:
- Grid view of all rooms with participant thumbnails
- Room-level controls (close, extend time, assign task)
- Broadcast message to all rooms
- Individual room join button
- Alert notifications (AI-detected issues)
- Timer showing remaining time per room

#### Breakout Room View (Student View)
```typescript
interface BreakoutRoomViewProps {
  room: BreakoutRoom
  onSendMessage: (message: string) => void
  onRequestHelp: () => void
  onWhiteboardUpdate: (state: WhiteboardState) => void
}
```

Features:
- Small group video grid (2-6 students)
- Shared whiteboard
- Group chat
- "Ask for help" button (notifies tutor)
- AI Assistant button (if enabled)
- Countdown timer

### 2.5 Socket Events

```typescript
// Breakout room socket events
interface BreakoutSocketEvents {
  // Tutor → Server
  'breakout:create': (config: BreakoutConfig) => void
  'breakout:close': (sessionId: string) => void
  'breakout:broadcast': (sessionId: string, message: string) => void
  'breakout:join_room': (roomId: string) => void
  'breakout:assign_task': (roomId: string, task: Task) => void
  
  // Student → Server
  'breakout:join': (roomId: string) => void
  'breakout:send_message': (roomId: string, message: string) => void
  'breakout:request_help': (roomId: string) => void
  'breakout:whiteboard_update': (roomId: string, state: WhiteboardState) => void
  
  // Server → All
  'breakout:rooms_created': (rooms: BreakoutRoom[]) => void
  'breakout:countdown': (roomId: string, secondsRemaining: number) => void
  'breakout:closing_soon': (roomId: string, seconds: number) => void
  'breakout:closed': (roomId: string) => void
  'breakout:alert': (roomId: string, alert: Alert) => void
  
  // Server → Room participants
  'breakout:participant_joined': (roomId: string, participant: Participant) => void
  'breakout:participant_left': (roomId: string, studentId: string) => void
  'breakout:message': (roomId: string, message: ChatMessage) => void
  'breakout:tutor_broadcast': (message: string) => void
}
```

### 2.6 Implementation Steps

#### Phase 1: Core Infrastructure (Week 1)
1. Database schema for breakout rooms
2. Socket event handlers
3. Breakout room service (`lib/breakout/service.ts`)
4. Room management API routes

#### Phase 2: Tutor Interface (Week 2)
1. Breakout creation dialog
2. Breakout control panel
3. Room monitoring dashboard
4. Student assignment UI

#### Phase 3: Student Interface (Week 3)
1. Breakout room join flow
2. Room UI (video, chat, whiteboard)
3. "Request help" functionality
4. Countdown timer

#### Phase 4: AI Integration (Week 4)
1. AI assistant per room
2. Room activity monitoring
3. Alert generation
4. Auto-note taking

---

## Implementation Timeline

### Week 1: Foundation
- [ ] Set up database schema
- [ ] Create performance tracking service
- [ ] Build chart components infrastructure
- [ ] Implement basic breakout room structure

### Week 2: Personalized Tasks & Tutor Workflow
- [ ] Enhanced task generator with modes
- [ ] Student performance analytics
- [ ] Tutor approval workflow
- [ ] Breakout room creation UI

### Week 3: Visual Reports & Breakout UI
- [ ] Individual student report charts
- [ ] Class overview dashboard
- [ ] Breakout room student interface
- [ ] Real-time monitoring

### Week 4: Integration & Polish
- [ ] AI assistant in breakout rooms
- [ ] Feedback system integration
- [ ] Performance optimization
- [ ] Testing and bug fixes

---

## Technical Considerations

### Performance
- Cache student performance data (Redis)
- Lazy load chart components
- Debounce real-time updates
- Optimize socket event frequency

### Security
- Validate task permissions
- Sanitize AI-generated content
- Rate limit API calls
- Secure breakout room access

### Scalability
- Support up to 50 students per main room
- Up to 10 breakout rooms simultaneously
- Handle 1000+ concurrent connections

---

## API Endpoints Summary

```
# Performance & Analytics
GET  /api/students/:id/performance
GET  /api/class/:id/analytics
GET  /api/reports/student/:id/visual

# Personalized Tasks
POST /api/tasks/generate
POST /api/tasks/generate-personalized
POST /api/tasks/assign

# Feedback Workflow
GET  /api/feedback/pending
POST /api/feedback/:id/approve

# Breakout Rooms
POST /api/breakout/create
POST /api/breakout/:id/close
GET  /api/breakout/:id/rooms
POST /api/breakout/rooms/:id/join
POST /api/breakout/broadcast
```

---

*This plan provides a comprehensive roadmap for implementing the advanced AI Assistant features and Breakout Rooms functionality.*
