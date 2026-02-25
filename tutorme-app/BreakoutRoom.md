# Unified Breakout Room Implementation Plan

## Overview

This document outlines the plan to combine the **Class Room Page** (Image 2) and **Tutor Live Class Page** (Image 1) breakout room implementations into a single, comprehensive system on the Tutor Live Class Page.

---

## 1. Goals

- ✅ Combine best features from both implementations
- ✅ Light theme UI with modern design
- ✅ Full real-time socket integration
- ✅ Video grid view in modal
- ✅ Complete student experience
- ✅ AI-powered smart grouping
- ✅ Comprehensive alert system

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     TUTOR LIVE CLASS PAGE (Image 1)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  UnifiedBreakoutManager (Light Theme)                               │   │
│  │  ┌──────────────┐  ┌─────────────────────────────────────────────┐  │   │
│  │  │  Room List   │  │  Room Detail / Create Panel                 │  │   │
│  │  │              │  │                                              │  │   │
│  │  │ • Group A    │  │  [AI Smart Grouping Banner]                 │  │   │
│  │  │ • Group B    │  │  [Room Config] [Distribution Strategy]      │  │   │
│  │  │ • Group C    │  │  [Start Sessions] [End All]                 │  │   │
│  │  │              │  │                                              │  │   │
│  │  │ [+ Create]   │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │  │   │
│  │  └──────────────┘  │  │ Room Card│ │ Room Card│ │ Room Card│    │  │   │
│  │                    │  └──────────┘ └──────────┘ └──────────┘    │  │   │
│  │  ┌──────────────┐  └─────────────────────────────────────────────┘  │   │
│  │  │  Sidebar     │                                                   │   │
│  │  │              │  When "Join Room" clicked:                        │   │
│  │  │ 📢 Broadcast │                                                   │   │
│  │  │ ⏱️ Extend    │  ┌─────────────────────────────────────────────┐  │   │
│  │  │ ⚠️ Alerts    │  │     UnifiedBreakoutModal (Light Theme)      │  │   │
│  │  │ 📊 Stats     │  │  ┌─────────────────────────────────────────┐ │  │   │
│  │  └──────────────┘  │  │ [Video] [Chat] [Students] [Screen Share]│ │  │   │
│  │                    │  │                                         │ │  │   │
│  └────────────────────┘  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │ │  │   │
│                          │  │Tutor│ │ S1 │ │ S2 │ │ S3 │  Video Grid │ │  │   │
│                          │  └────┘ └────┘ └────┘ └────┘            │ │  │   │
│                          │                                         │ │  │   │
│                          │  ┌─────────────────────────────────┐    │ │  │   │
│                          │  │ Chat Messages...                │    │ │  │   │
│                          │  │ [Type message...] [Send]        │    │ │  │   │
│                          │  └─────────────────────────────────┘    │ │  │   │
│                          └─────────────────────────────────────────┘ │  │   │
│                                                                      │  │   │
└──────────────────────────────────────────────────────────────────────┴──┴───┘

Backend: Socket.io + Daily.co Video + Prisma Database
```

---

## 3. Unified Data Models

### 3.1 BreakoutRoom Interface

```typescript
// File: src/app/tutor/live-class/types.ts (extended)

export interface BreakoutRoom {
  id: string
  name: string
  mainRoomId: string          // Parent session ID
  
  // Participants
  participants: BreakoutParticipant[]
  maxParticipants: number
  
  // Status
  status: 'forming' | 'active' | 'paused' | 'closed'
  
  // Time Management
  timeRemaining: number       // seconds
  timeLimit: number           // seconds
  startedAt?: Date
  endsAt?: Date
  
  // AI Features
  aiEnabled: boolean
  aiMode: 'passive' | 'active' | 'socratic'
  
  // Task/Assignment
  assignedTask?: {
    id: string
    title: string
    description: string
    type: 'discussion' | 'problem' | 'project' | 'quiz'
  }
  
  // Alerts & Monitoring
  alerts: BreakoutAlert[]
  
  // Metrics
  metrics: {
    messagesExchanged: number
    avgEngagement: number      // 0-100
    participationRate: number  // 0-100
    topicAdherence: number     // 0-100
    lastUpdated: Date
  }
  
  // Video/Daily.co Integration
  videoRoom?: {
    dailyRoomId: string
    url: string
    tutorToken: string
  }
}

export interface BreakoutParticipant {
  id: string
  userId: string
  name: string
  avatar?: string
  role: 'tutor' | 'student'
  joinedAt: Date
  leftAt?: Date
  
  // Real-time state
  isOnline: boolean
  isMuted: boolean
  isVideoOff: boolean
  isScreenSharing: boolean
  
  // Engagement
  engagementScore: number     // 0-100
  attentionLevel: 'high' | 'medium' | 'low'
  handRaised: boolean
  
  // Video track (for grid view)
  videoTrack?: MediaStreamTrack
  audioTrack?: MediaStreamTrack
}

export interface BreakoutAlert {
  id: string
  type: 'confusion' | 'conflict' | 'off_topic' | 'need_help' | 'quiet'
  message: string
  timestamp: Date
  severity: 'low' | 'medium' | 'high'
  participantId?: string      // Who triggered it
  acknowledged: boolean
}

export interface BreakoutMessage {
  id: string
  roomId: string
  senderId: string
  senderName: string
  senderRole: 'tutor' | 'student' | 'ai'
  content: string
  timestamp: Date
  type: 'text' | 'system' | 'ai_suggestion'
  isQuestion?: boolean
}

export interface SmartGroupingSuggestion {
  type: 'skill_based' | 'mixed_ability' | 'social' | 'random'
  description: string
  confidence: number          // AI confidence score
  groups: {
    roomIndex: number
    members: string[]         // student IDs
    rationale: string
    predictedOutcome: string
    skillProfile: {
      beginners: number
      intermediate: number
      advanced: number
    }
  }[]
}

export interface BreakoutSessionConfig {
  roomCount: number
  participantsPerRoom: number
  distributionMode: 'random' | 'skill_based' | 'manual' | 'self_select' | 'social'
  timeLimit: number          // minutes
  aiAssistantEnabled: boolean
  aiMode: 'passive' | 'active' | 'socratic'
  suggestedGroups?: SmartGroupingSuggestion
}
```

---

## 4. Component Structure

### 4.1 New File Structure

```
src/app/tutor/live-class/components/breakout/
├── index.ts                          # Public exports
├── UnifiedBreakoutManager.tsx        # Main manager component
├── UnifiedBreakoutModal.tsx          # Join room modal
├── RoomList.tsx                      # Left sidebar room list
├── RoomDetail.tsx                    # Right panel room detail
├── RoomCreatePanel.tsx               # Create rooms panel
├── RoomGrid.tsx                      # Grid of room cards
├── BreakoutSidebar.tsx               # Sidebar (broadcast, alerts, stats)
├── ParticipantVideoGrid.tsx          # Video tiles in modal
├── BreakoutChat.tsx                  # Chat panel in modal
├── BreakoutParticipants.tsx          # Participants list in modal
├── AlertPanel.tsx                    # Alert display component
├── BroadcastPanel.tsx                # Broadcast message UI
├── SmartGroupingBanner.tsx           # AI suggestion banner
└── hooks/
    ├── useBreakoutSocket.ts          # Socket integration
    ├── useBreakoutRooms.ts           # Room state management
    ├── useSmartGrouping.ts           # AI grouping logic
    ├── useDailyVideo.ts              # Daily.co video integration
    └── useBreakoutTimer.ts           # Countdown timer logic
```

### 4.2 Key Components

#### `UnifiedBreakoutManager.tsx`
Main container component replacing both `BreakoutRoomManager` and `BreakoutControlPanel`.

**Props:**
```typescript
interface UnifiedBreakoutManagerProps {
  sessionId: string
  students: LiveStudent[]
  onBreakoutStart?: () => void
  onBreakoutEnd?: () => void
}
```

**Features:**
- Light theme (bg-white, bg-gray-50)
- Left panel: Room list with status
- Center: Room detail or create panel
- Right sidebar: Broadcast, alerts, stats
- Real-time updates via socket

#### `UnifiedBreakoutModal.tsx`
Full-featured modal for joining breakout rooms.

**Props:**
```typescript
interface UnifiedBreakoutModalProps {
  room: BreakoutRoom | null
  isOpen: boolean
  onClose: () => void
  
  // Actions
  onEndRoom: (roomId: string) => void
  onExtendTime: (roomId: string, minutes: number) => void
  onBroadcast: (roomId: string, message: string) => void
  onAssignTask: (roomId: string, task: any) => void
}
```

**Tabs:**
1. **Video** - Grid view with Daily.co integration
2. **Chat** - Real-time messaging with AI suggestions
3. **Participants** - List with engagement metrics
4. **Screen Share** - Screen sharing controls

---

## 5. Socket Events (Server-Side)

### 5.1 Events to Implement/Extend

```typescript
// File: src/lib/socket-server.ts

// Client → Server
interface BreakoutClientEvents {
  // Room Management
  'breakout:create': (data: {
    sessionId: string
    config: BreakoutSessionConfig
  }) => void
  
  'breakout:join': (data: {
    roomId: string
    userId: string
    role: 'tutor' | 'student'
  }) => void
  
  'breakout:leave': (data: {
    roomId: string
    userId: string
  }) => void
  
  'breakout:end': (data: {
    roomId: string
  }) => void
  
  'breakout:end_all': (data: {
    sessionId: string
  }) => void
  
  // Participant Management
  'breakout:assign': (data: {
    roomId: string
    studentId: string
  }) => void
  
  'breakout:remove': (data: {
    roomId: string
    studentId: string
  }) => void
  
  'breakout:rotate': (data: {
    sessionId: string
  }) => void
  
  // Communication
  'breakout:message': (data: {
    roomId: string
    content: string
    type?: 'text' | 'question'
  }) => void
  
  'breakout:broadcast': (data: {
    sessionId: string
    message: string
    target: 'all' | 'specific'
    roomIds?: string[]
  }) => void
  
  // Room Controls
  'breakout:extend': (data: {
    roomId: string
    minutes: number
  }) => void
  
  'breakout:assign_task': (data: {
    roomId: string
    task: any
  }) => void
  
  'breakout:toggle_ai': (data: {
    roomId: string
    enabled: boolean
  }) => void
  
  // Student Actions
  'breakout:request_help': (data: {
    roomId: string
  }) => void
  
  'breakout:raise_hand': (data: {
    roomId: string
    raised: boolean
  }) => void
  
  // Video Controls
  'breakout:video_state': (data: {
    roomId: string
    isMuted?: boolean
    isVideoOff?: boolean
    isScreenSharing?: boolean
  }) => void
}

// Server → Client
interface BreakoutServerEvents {
  // Room State
  'breakout:rooms_updated': (data: {
    rooms: BreakoutRoom[]
  }) => void
  
  'breakout:room_created': (data: {
    room: BreakoutRoom
  }) => void
  
  'breakout:room_ended': (data: {
    roomId: string
  }) => void
  
  // Participant Events
  'breakout:participant_joined': (data: {
    roomId: string
    participant: BreakoutParticipant
  }) => void
  
  'breakout:participant_left': (data: {
    roomId: string
    userId: string
  }) => void
  
  'breakout:participant_updated': (data: {
    roomId: string
    participant: Partial<BreakoutParticipant>
  }) => void
  
  // Communication
  'breakout:message': (data: BreakoutMessage) => void
  
  'breakout:broadcast': (data: {
    message: string
    fromTutor: boolean
  }) => void
  
  // Alerts
  'breakout:alert': (data: {
    roomId: string
    alert: BreakoutAlert
  }) => void
  
  'breakout:alert_resolved': (data: {
    roomId: string
    alertId: string
  }) => void
  
  // Time
  'breakout:countdown': (data: {
    roomId: string
    secondsRemaining: number
  }) => void
  
  'breakout:closing_soon': (data: {
    roomId: string
    seconds: number
  }) => void
  
  'breakout:time_extended': (data: {
    roomId: string
    newTimeRemaining: number
  }) => void
  
  // AI
  'breakout:ai_suggestion': (data: {
    roomId: string
    suggestion: string
    context: string
  }) => void
  
  // Help
  'breakout:help_requested': (data: {
    roomId: string
    userId: string
    userName: string
  }) => void
}
```

---

## 6. API Routes

### 6.1 Existing Routes to Extend

```typescript
// File: src/app/api/sessions/[sessionId]/breakout/route.ts

// POST - Create breakout rooms
// GET - List breakout rooms for session
// DELETE - End all breakout rooms

// File: src/app/api/sessions/[sessionId]/breakout/[roomId]/route.ts

// GET - Get room details
// PATCH - Update room (extend time, assign task, etc.)
// DELETE - End specific room

// File: src/app/api/sessions/[sessionId]/breakout/[roomId]/join/route.ts

// POST - Generate Daily.co tokens for joining

// File: src/app/api/sessions/[sessionId]/breakout/grouping/route.ts

// POST - Generate AI smart grouping suggestions
```

### 6.2 AI Grouping API

```typescript
// POST /api/sessions/[sessionId]/breakout/grouping
// Generates smart grouping suggestions based on student data

Request: {
  mode: 'skill_based' | 'mixed_ability' | 'social' | 'random'
  roomCount: number
  students: string[]  // student IDs
}

Response: {
  suggestion: SmartGroupingSuggestion
}
```

---

## 7. UI/UX Design Specifications

### 7.1 Color Scheme (Light Theme)

```css
/* Backgrounds */
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;      /* gray-50 */
--bg-tertiary: #f3f4f6;       /* gray-100 */
--bg-sidebar: #ffffff;

/* Status Colors */
--status-forming: #6b7280;    /* gray-500 */
--status-active: #22c55e;     /* green-500 */
--status-paused: #eab308;     /* yellow-500 */
--status-closed: #6b7280;     /* gray-500 */

/* Alert Colors */
--alert-low: #3b82f6;         /* blue-500 */
--alert-medium: #f59e0b;      /* amber-500 */
--alert-high: #ef4444;        /* red-500 */

/* AI Accent */
--ai-primary: #8b5cf6;        /* violet-500 */
--ai-secondary: #a78bfa;      /* violet-400 */

/* Borders */
--border-default: #e5e7eb;    /* gray-200 */
--border-active: #3b82f6;     /* blue-500 */
```

### 7.2 Layout Specifications

```
UnifiedBreakoutManager:
┌─────────────────────────────────────────────────────────────┐
│  Header: "Breakout Rooms"                    [+ Create Room]│
├────────────────┬──────────────────────────┬─────────────────┤
│                │                          │                 │
│  Room List     │  Main Content Area       │  Sidebar        │
│  (w-64)        │  (flex-1)                │  (w-80)         │
│                │                          │                 │
│  • Group A 🟢  │  Either:                 │  📢 Broadcast   │
│  • Group B 🟢  │  - Room Detail View      │  ⏱️ Extend      │
│  • Group C 🟡  │  - Create Panel          │  ⚠️ Alerts (3)  │
│                │  - Room Grid             │  📊 Stats       │
│ [+ Create]     │                          │                 │
│                │                          │                 │
└────────────────┴──────────────────────────┴─────────────────┘
```

### 7.3 Room Card Design

```
┌──────────────────────────────────────────┐
│ ┌────┐ Group A                    🟢 Active│
│ │ 👥 │ 3 participants    🤖 AI Enabled     │
│ └────┘                                    │
│ Topic: Practice Problems                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━ 8:32 remaining   │
│ Engagement: 85%  Messages: 12             │
│ ┌────────────────────────────────────┐   │
│ │ ⚠️ 2 alerts | ❓ 1 question        │   │
│ └────────────────────────────────────┘   │
│ [Broadcast] [Join Room]                   │
└──────────────────────────────────────────┘
```

---

## 8. Implementation Phases

### Phase 1: Core Infrastructure (Week 1)

- [ ] Extend `types.ts` with unified interfaces
- [ ] Create `useBreakoutSocket` hook
- [ ] Update socket-server.ts with new events
- [ ] Create API routes for AI grouping
- [ ] Set up Daily.co video integration

### Phase 2: Manager Component (Week 1-2)

- [ ] Create `UnifiedBreakoutManager.tsx` shell
- [ ] Implement `RoomList` component
- [ ] Implement `RoomDetail` component
- [ ] Implement `RoomCreatePanel` with smart grouping
- [ ] Implement `RoomGrid` for active rooms view
- [ ] Implement `BreakoutSidebar` with broadcast/alerts/stats

### Phase 3: Modal Component (Week 2)

- [ ] Create `UnifiedBreakoutModal.tsx` shell
- [ ] Implement `ParticipantVideoGrid` with Daily.co
- [ ] Implement `BreakoutChat` with real-time messages
- [ ] Implement `BreakoutParticipants` list
- [ ] Add screen share functionality
- [ ] Add media controls (mute/video/share)

### Phase 4: Advanced Features (Week 3)

- [ ] Implement AI smart grouping algorithm
- [ ] Implement 5 distribution modes
- [ ] Implement alert system (5 types)
- [ ] Implement real-time metrics
- [ ] Implement student "request help" flow
- [ ] Implement preset task assignment
- [ ] Implement rotate groups feature

### Phase 5: Student Experience (Week 3-4)

- [ ] Create student breakout room view
- [ ] Implement student join flow
- [ ] Add student chat with AI suggestions
- [ ] Add "Ask for Help" button
- [ ] Add "Return to Main" functionality
- [ ] Test end-to-end student experience

### Phase 6: Polish & Integration (Week 4)

- [ ] Integrate into `LiveClassHub.tsx`
- [ ] Remove old `BreakoutRoomManager`
- [ ] Remove from `ClassRoomContent.tsx`
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add animations
- [ ] Write tests
- [ ] Documentation

---

## 9. Migration Plan

### From Class Room Page:
1. Keep socket event handlers (copy to LiveClassHub)
2. Migrate smart grouping logic
3. Migrate alert system
4. Migrate AI features
5. Remove `BreakoutControlPanel` usage from `ClassRoomContent.tsx`

### From Tutor Live Class Page:
1. Keep modal design pattern
2. Keep video grid layout
3. Keep light theme
4. Keep tab navigation in modal
5. Remove old `BreakoutRoomManager`
6. Remove old `BreakoutRoomModal`

---

## 10. Testing Checklist

- [ ] Create rooms with all 5 distribution modes
- [ ] AI smart grouping generates suggestions
- [ ] Manually reassign students between rooms
- [ ] Start/stop breakout sessions
- [ ] Join room opens modal with video
- [ ] Chat messages flow in real-time
- [ ] Screen sharing works
- [ ] Alerts appear when triggered
- [ ] Broadcast reaches all/specific rooms
- [ ] Timer counts down and warns at 1 minute
- [ ] Extend time adds minutes
- [ ] Student can request help
- [ ] Student can join and leave room
- [ ] Rotate groups reassigns all students
- [ ] End room returns students to main
- [ ] Metrics update in real-time

---

## 11. Dependencies

```json
{
  "@daily-co/daily-js": "^0.87.0",
  "@daily-co/daily-react": "^0.17.0",
  "socket.io-client": "^4.7.0",
  "date-fns": "^4.1.0",
  "framer-motion": "^12.34.0"
}
```

---

## 12. Notes

1. **Video Integration**: Use Daily.co for video calls within breakout rooms
2. **AI Grouping**: Can start with rule-based algorithm, upgrade to ML later
3. **Performance**: Use React.memo for video tiles, virtualize if needed
4. **Accessibility**: Ensure keyboard navigation, ARIA labels
5. **Mobile**: Ensure responsive design for tablets

---

*Document Version: 1.0*
*Created: 2026-02-21*
*Status: Implementation Plan*
