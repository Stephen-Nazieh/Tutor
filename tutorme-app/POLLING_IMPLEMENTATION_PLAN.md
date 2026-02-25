# Polling Feature Migration Plan
## Moving QuickPoll from Class Room to Tutor Live Class Page

---

## Executive Summary

Migrate the full-featured QuickPoll system from Class Room Page to Tutor Live Class Page, ensuring both pages can share the same polling infrastructure.

**Timeline:** 2-3 weeks  
**Priority:** High (Enhances tutor engagement capabilities)  
**Complexity:** Medium-High

---

## Phase 1: Database Schema (Week 1)

### 1.1 Add Prisma Models

**File:** `prisma/schema.prisma`

```prisma
model Poll {
  id            String         @id @default(cuid())
  sessionId     String         // Live session or classroom ID
  tutorId       String
  tutor         User           @relation(fields: [tutorId], references: [id])
  
  // Poll content
  question      String
  type          PollType       // MULTIPLE_CHOICE, TRUE_FALSE, RATING, SHORT_ANSWER, WORD_CLOUD
  options       PollOption[]
  
  // Settings
  isAnonymous   Boolean        @default(false)
  allowMultiple Boolean        @default(false)
  timeLimit     Int?           // seconds
  showResults   Boolean        @default(true)
  correctOptionId String?      // For quiz-type polls
  
  // Status
  status        PollStatus     @default(DRAFT) // DRAFT, ACTIVE, CLOSED
  startedAt     DateTime?
  endedAt       DateTime?
  
  // Responses
  responses     PollResponse[]
  totalResponses Int           @default(0)
  
  // Metadata
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  
  @@index([sessionId])
  @@index([tutorId])
  @@index([status])
}

model PollOption {
  id        String   @id @default(cuid())
  pollId    String
  poll      Poll     @relation(fields: [pollId], references: [id], onDelete: Cascade)
  
  label     String   // A, B, C, D, etc.
  text      String   // Option text
  color     String?  // For charts
  
  // Statistics (computed)
  responseCount Int  @default(0)
  percentage    Float @default(0)
  
  @@index([pollId])
}

model PollResponse {
  id          String   @id @default(cuid())
  pollId      String
  poll        Poll     @relation(fields: [pollId], references: [id], onDelete: Cascade)
  
  // Anonymous tracking
  respondentHash String? // SHA256 hash for deduplication without storing identity
  
  // Response content
  optionIds   String[] // For multiple choice
  rating      Int?     // For rating type
  textAnswer  String?  // For short answer/word cloud
  
  // For non-anonymous polls
  studentId   String?
  student     User?    @relation(fields: [studentId], references: [id])
  
  createdAt   DateTime @default(now())
  
  @@unique([pollId, respondentHash]) // Prevent duplicate votes
  @@index([pollId])
}

enum PollType {
  MULTIPLE_CHOICE
  TRUE_FALSE
  RATING
  SHORT_ANSWER
  WORD_CLOUD
}

enum PollStatus {
  DRAFT
  ACTIVE
  CLOSED
}
```

**Migration:**
```bash
npx prisma migrate dev --name add_poll_models
```

---

## Phase 2: Shared Components (Week 1-2)

### 2.1 Create Shared Poll Components

**Directory Structure:**
```
src/components/polls/
├── index.ts                    # Public exports
├── types.ts                    # Shared TypeScript interfaces
├── QuickPollPanel.tsx          # Main poll panel (from ClassRoom)
├── PollCreator.tsx             # Enhanced poll creator
├── ActivePollView.tsx          # Live results display
├── PollResults.tsx             # Final results view
├── PollHistory.tsx             # Past polls list
├── PollTemplates.tsx           # Pre-built templates
├── hooks/
│   ├── usePoll.ts              # Single poll management
│   ├── usePolls.ts             # Multiple polls list
│   └── usePollSocket.ts        # Real-time updates
└── utils/
    ├── pollCalculations.ts     # Statistics computation
    └── pollTemplates.ts        # Template definitions
```

### 2.2 Types Definition

**File:** `src/components/polls/types.ts`

```typescript
export type PollType = 'multiple_choice' | 'true_false' | 'rating' | 'short_answer' | 'word_cloud'
export type PollStatus = 'draft' | 'active' | 'closed'

export interface PollOption {
  id: string
  label: string  // A, B, C, D...
  text: string
  color?: string
  responseCount?: number
  percentage?: number
}

export interface PollResponse {
  id: string
  optionIds?: string[]
  rating?: number
  textAnswer?: string
  studentId?: string
  createdAt: string
}

export interface Poll {
  id: string
  sessionId: string
  tutorId: string
  question: string
  type: PollType
  options: PollOption[]
  isAnonymous: boolean
  allowMultiple: boolean
  timeLimit?: number
  showResults: boolean
  correctOptionId?: string
  status: PollStatus
  startedAt?: string
  endedAt?: string
  responses: PollResponse[]
  totalResponses: number
  createdAt: string
}

export interface PollTemplate {
  id: string
  name: string
  icon: string
  description: string
  defaultQuestion: string
  type: PollType
  options?: string[]
}
```

---

## Phase 3: Tutor Live Class Integration (Week 2)

### 3.1 Update LiveClassHub.tsx

**Add Imports:**
```typescript
import { QuickPollPanel } from '@/components/polls'
import { usePollSocket } from '@/components/polls/hooks'
```

**Add State:**
```typescript
const [showPollsPanel, setShowPollsPanel] = useState(false)
const [activePollId, setActivePollId] = useState<string | null>(null)
const { polls, createPoll, startPoll, endPoll, deletePoll } = usePollSocket(sessionId)
```

**Add to Tabs:**
```typescript
<TabsTrigger value="polls" className="gap-1">
  <BarChart3 className="w-3 h-3" />
  Polls
  {activePolls.length > 0 && (
    <Badge variant="secondary" className="ml-1">{activePolls.length}</Badge>
  )}
</TabsTrigger>

<TabsContent value="polls" className="flex-1 mt-4 overflow-hidden">
  <QuickPollPanel
    sessionId={sessionId}
    polls={polls}
    onCreatePoll={createPoll}
    onStartPoll={startPoll}
    onEndPoll={endPoll}
    onDeletePoll={deletePoll}
    students={students}
  />
</TabsContent>
```

### 3.2 Add Poll Button to Header

**In the header controls:**
```typescript
<Button
  variant="outline"
  size="sm"
  onClick={() => setShowPollsPanel(true)}
  className="gap-2"
>
  <BarChart3 className="h-4 w-4" />
  Polls
  {activePollCount > 0 && (
    <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
      {activePollCount}
    </span>
  )}
</Button>
```

---

## Phase 4: Socket Integration (Week 2-3)

### 4.1 Server-Side Socket Events

**File:** `src/lib/socket-server.ts`

Add to `initBreakoutHandlers` or create new `initPollHandlers`:

```typescript
// Poll Events
socket.on('poll:create', async (data: {
  sessionId: string
  poll: Omit<Poll, 'id' | 'createdAt'>
}) => {
  const poll = await db.poll.create({
    data: { ...data.poll, status: 'draft' }
  })
  
  io.to(`session:${data.sessionId}`).emit('poll:created', poll)
})

socket.on('poll:start', async (data: { pollId: string }) => {
  const poll = await db.poll.update({
    where: { id: data.pollId },
    data: { status: 'active', startedAt: new Date() }
  })
  
  io.to(`session:${poll.sessionId}`).emit('poll:started', poll)
  
  // Auto-end after time limit
  if (poll.timeLimit) {
    setTimeout(() => {
      endPoll(io, data.pollId)
    }, poll.timeLimit * 1000)
  }
})

socket.on('poll:vote', async (data: {
  pollId: string
  response: Partial<PollResponse>
}) => {
  const poll = await db.poll.findUnique({
    where: { id: data.pollId },
    include: { responses: true }
  })
  
  if (poll?.status !== 'active') return
  
  // Create response
  const newResponse = await db.pollResponse.create({
    data: {
      pollId: data.pollId,
      ...data.response
    }
  })
  
  // Update statistics
  await updatePollStatistics(poll.id)
  
  // Broadcast updated results
  const updatedPoll = await db.poll.findUnique({
    where: { id: data.pollId },
    include: { options: true, responses: true }
  })
  
  io.to(`session:${poll.sessionId}`).emit('poll:updated', updatedPoll)
})

socket.on('poll:end', async (data: { pollId: string }) => {
  await endPoll(io, data.pollId)
})
```

### 4.2 Client-Side Hook

**File:** `src/components/polls/hooks/usePollSocket.ts`

```typescript
export function usePollSocket(sessionId: string) {
  const { socket } = useSocket()
  const [polls, setPolls] = useState<Poll[]>([])
  
  useEffect(() => {
    if (!socket) return
    
    // Join session room
    socket.emit('session:join', { sessionId })
    
    // Listen for poll events
    socket.on('poll:created', (poll: Poll) => {
      setPolls(prev => [...prev, poll])
    })
    
    socket.on('poll:started', (poll: Poll) => {
      setPolls(prev => prev.map(p => 
        p.id === poll.id ? { ...p, status: 'active' } : p
      ))
    })
    
    socket.on('poll:updated', (poll: Poll) => {
      setPolls(prev => prev.map(p => 
        p.id === poll.id ? poll : p
      ))
    })
    
    socket.on('poll:ended', (poll: Poll) => {
      setPolls(prev => prev.map(p => 
        p.id === poll.id ? { ...p, status: 'closed' } : p
      ))
    })
    
    return () => {
      socket.off('poll:created')
      socket.off('poll:started')
      socket.off('poll:updated')
      socket.off('poll:ended')
    }
  }, [socket, sessionId])
  
  const createPoll = useCallback((poll: Partial<Poll>) => {
    socket?.emit('poll:create', { sessionId, poll })
  }, [socket, sessionId])
  
  const startPoll = useCallback((pollId: string) => {
    socket?.emit('poll:start', { pollId })
  }, [socket])
  
  const endPoll = useCallback((pollId: string) => {
    socket?.emit('poll:end', { pollId })
  }, [socket])
  
  const vote = useCallback((pollId: string, response: Partial<PollResponse>) => {
    socket?.emit('poll:vote', { pollId, response })
  }, [socket])
  
  return {
    polls,
    createPoll,
    startPoll,
    endPoll,
    vote,
    activePolls: polls.filter(p => p.status === 'active'),
    draftPolls: polls.filter(p => p.status === 'draft'),
    closedPolls: polls.filter(p => p.status === 'closed')
  }
}
```

---

## Phase 5: QuickPollPanel Component (Week 3)

### 5.1 Main Component Structure

**File:** `src/components/polls/QuickPollPanel.tsx`

```typescript
interface QuickPollPanelProps {
  sessionId: string
  polls: Poll[]
  students: Student[]
  onCreatePoll: (poll: Partial<Poll>) => void
  onStartPoll: (pollId: string) => void
  onEndPoll: (pollId: string) => void
  onDeletePoll: (pollId: string) => void
}

export function QuickPollPanel({
  sessionId,
  polls,
  students,
  onCreatePoll,
  onStartPoll,
  onEndPoll,
  onDeletePoll
}: QuickPollPanelProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'active' | 'history'>('create')
  const [selectedTemplate, setSelectedTemplate] = useState<PollTemplate | null>(null)
  
  const activePoll = polls.find(p => p.status === 'active')
  
  return (
    <div className="h-full flex flex-col bg-white rounded-lg border">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('create')}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium",
            activeTab === 'create' && "border-b-2 border-blue-600 text-blue-600"
          )}
        >
          Create Poll
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium",
            activeTab === 'active' && "border-b-2 border-blue-600 text-blue-600"
          )}
        >
          Active
          {activePoll && (
            <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
              LIVE
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium",
            activeTab === 'history' && "border-b-2 border-blue-600 text-blue-600"
          )}
        >
          History
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'create' && (
          <CreatePollView
            templates={POLL_TEMPLATES}
            onSelectTemplate={setSelectedTemplate}
            onCreate={onCreatePoll}
          />
        )}
        
        {activeTab === 'active' && (
          activePoll ? (
            <ActivePollView
              poll={activePoll}
              totalStudents={students.length}
              onEnd={() => onEndPoll(activePoll.id)}
            />
          ) : (
            <EmptyState message="No active polls" />
          )
        )}
        
        {activeTab === 'history' && (
          <PollHistory
            polls={polls.filter(p => p.status === 'closed')}
            onDelete={onDeletePoll}
          />
        )}
      </div>
    </div>
  )
}
```

---

## Phase 6: Testing & Polish (Week 3)

### 6.1 Test Scenarios

| Test Case | Expected Result |
|-----------|-----------------|
| Create poll from template | Poll created in draft state |
| Start poll | Status changes to active, students see it |
| Student votes | Real-time update of results |
| Anonymous poll | Student identity not shown |
| Time limit expires | Poll auto-closes |
| End poll manually | Poll status changes to closed |
| View history | All past polls displayed |
| Reuse poll | Can duplicate past poll |

### 6.2 Performance Optimizations

1. **Virtualize poll history** for large lists
2. **Debounce vote updates** to reduce re-renders
3. **Memoize statistics** calculations
4. **Lazy load** poll results charts

---

## API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/polls` | GET | List polls for session |
| `/api/polls` | POST | Create new poll |
| `/api/polls/[id]` | PATCH | Update poll |
| `/api/polls/[id]` | DELETE | Delete poll |
| `/api/polls/[id]/start` | POST | Start poll |
| `/api/polls/[id]/end` | POST | End poll |
| `/api/polls/[id]/vote` | POST | Submit vote |
| `/api/polls/[id]/results` | GET | Get poll results |

---

## Migration Checklist

- [ ] Add Prisma models
- [ ] Run migration
- [ ] Create shared poll components
- [ ] Implement socket events
- [ ] Integrate into LiveClassHub
- [ ] Add to Tutor Live Class tabs
- [ ] Test real-time updates
- [ ] Test all poll types
- [ ] Add to command palette
- [ ] Update documentation

---

## Success Metrics

- Poll creation time < 30 seconds
- Vote response time < 100ms
- Real-time updates within 500ms
- Support for 100+ concurrent voters
- Zero data loss on page refresh

---

*Plan Version: 1.0*  
*Last Updated: 2026-02-21*
