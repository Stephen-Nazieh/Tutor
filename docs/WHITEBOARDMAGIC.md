# Whiteboard Magic Implementation Plan
## Real-time Collaborative Whiteboards in Live Class

---

## Executive Summary

**Goal**: Enable real-time collaborative whiteboards within Live Class sessions where:
1. ✅ Tutors broadcast their whiteboard to all students (instant visibility)
2. ✅ Students have personal whiteboards they can write on
3. ✅ Tutor can view any student's whiteboard on demand
4. ✅ Students can toggle their whiteboard visibility (private/public to class)

**Technical Feasibility**: ✅ **Fully achievable** with existing Socket.io infrastructure

---

## Current Architecture Analysis

### Existing Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `useWhiteboardSocket` | `/hooks/use-whiteboard-socket.ts` | Real-time stroke sync |
| `WhiteboardEditorPage` | `/tutor/whiteboards/[id]/page.tsx` | Full whiteboard editor |
| `WhiteboardPanel` | `/tutor/live-class/components/WhiteboardPanel.tsx` | Simple popup whiteboard |
| `Socket Server` | `/lib/socket-server.ts` | WebSocket infrastructure |

### Existing Data Models
```prisma
// Whiteboard model already exists
model Whiteboard {
  id          String   @id @default(cuid())
  tutorId     String
  title       String
  pages       WhiteboardPage[]
  // ... existing fields
}

model WhiteboardPage {
  id          String   @id @default(cuid())
  whiteboardId String
  strokes     Json     // Array of stroke objects
  // ... existing fields
}
```

---

## Implementation Phases

### Phase 1: Core Infrastructure (Week 1)

#### 1.1 New Database Models

```prisma
// Session Whiteboard - ephemeral whiteboards for live sessions
model SessionWhiteboard {
  id            String   @id @default(cuid())
  sessionId     String   // Links to LiveSession
  userId        String   // Owner (tutor or student)
  userType      String   // 'tutor' | 'student'
  
  // Visibility settings
  visibility    String   @default("private") // 'private' | 'tutor-only' | 'public'
  isBroadcasting Boolean @default(false)    // Tutor broadcasting to all
  
  // Content
  strokes       Json     // Current strokes
  pages         Json     // Multiple pages support
  currentPage   Int      @default(0)
  
  // Metadata
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([sessionId])
  @@index([sessionId, userId])
  @@index([sessionId, visibility])
}

// Whiteboard View Permissions (for tracking who can see what)
model WhiteboardViewPermission {
  id              String   @id @default(cuid())
  whiteboardId    String
  viewerId        String   // User who has permission
  permissionType  String   // 'view' | 'write'
  grantedBy       String   // User who granted permission
  grantedAt       DateTime @default(now())
  
  @@unique([whiteboardId, viewerId])
}
```

#### 1.2 Enhanced Socket Events

Add to `/lib/socket-server.ts`:

```typescript
// Live Session Whiteboard Events
interface WhiteboardEvents {
  // Tutor broadcasting
  'whiteboard:broadcast-start': (sessionId: string, whiteboardId: string) => void
  'whiteboard:broadcast-stop': (sessionId: string) => void
  'whiteboard:stroke-broadcast': (sessionId: string, stroke: Stroke) => void
  
  // Student whiteboard management
  'whiteboard:student-create': (sessionId: string) => void
  'whiteboard:student-update': (sessionId: string, whiteboardId: string, strokes: Stroke[]) => void
  'whiteboard:student-share': (sessionId: string, visibility: 'private' | 'tutor-only' | 'public') => void
  
  // Tutor viewing student whiteboards
  'whiteboard:tutor-request-view': (sessionId: string, studentId: string) => void
  'whiteboard:tutor-stop-view': (sessionId: string, studentId: string) => void
  
  // Receiving updates
  'whiteboard:tutor-update': (whiteboardId: string, strokes: Stroke[], userId: string) => void
  'whiteboard:student-update-received': (studentId: string, whiteboardId: string, strokes: Stroke[]) => void
  'whiteboard:visibility-changed': (studentId: string, visibility: string) => void
}
```

#### 1.3 API Routes

```
POST   /api/sessions/[sessionId]/whiteboard        // Create session whiteboard
GET    /api/sessions/[sessionId]/whiteboard        // Get my whiteboard
GET    /api/sessions/[sessionId]/whiteboards       // List visible whiteboards (tutor view)
PATCH  /api/sessions/[sessionId]/whiteboard        // Update visibility/settings
POST   /api/sessions/[sessionId]/whiteboard/stroke // Save stroke batch
GET    /api/sessions/[sessionId]/whiteboard/[userId] // View specific user's whiteboard
```

---

### Phase 2: Tutor Whiteboard Broadcast (Week 2)

#### 2.1 Enhanced Tutor Live Class Interface

**New Component**: `TutorWhiteboardManager`

```tsx
// File: /app/tutor/live-class/components/TutorWhiteboardManager.tsx

interface TutorWhiteboardManagerProps {
  sessionId: string
  students: Student[]
}

export function TutorWhiteboardManager({ sessionId, students }: TutorWhiteboardManagerProps) {
  // State
  const [mode, setMode] = useState<'broadcast' | 'view-student' | 'individual'>('individual')
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null)
  const [whiteboard, setWhiteboard] = useState<WhiteboardState>()
  
  // Socket integration
  const { socket } = useSocket(sessionId)
  
  // Start broadcasting to all students
  const startBroadcast = () => {
    socket?.emit('whiteboard:broadcast-start', sessionId, whiteboard.id)
    setIsBroadcasting(true)
  }
  
  // View a specific student's whiteboard
  const viewStudentWhiteboard = (studentId: string) => {
    socket?.emit('whiteboard:tutor-request-view', sessionId, studentId)
    setViewingStudentId(studentId)
    setMode('view-student')
  }
  
  return (
    <div className="whiteboard-manager">
      {/* Toolbar with broadcast controls */}
      <WhiteboardToolbar 
        isBroadcasting={isBroadcasting}
        onStartBroadcast={startBroadcast}
        onStopBroadcast={() => {
          socket?.emit('whiteboard:broadcast-stop', sessionId)
          setIsBroadcasting(false)
        }}
      />
      
      {/* Main whiteboard canvas */}
      <CollaborativeCanvas
        whiteboard={whiteboard}
        onStroke={handleStroke}
        readOnly={mode === 'view-student'} // Tutor can annotate on student boards
      />
      
      {/* Student whiteboard gallery (tutor sees all student boards) */}
      <StudentWhiteboardGallery
        students={students}
        onViewWhiteboard={viewStudentWhiteboard}
        activeStudentId={viewingStudentId}
      />
    </div>
  )
}
```

#### 2.2 Student View: Receiving Tutor Broadcast

**New Component**: `StudentTutorWhiteboardView`

```tsx
// File: /app/student/live/components/StudentTutorWhiteboardView.tsx

export function StudentTutorWhiteboardView({ sessionId }: { sessionId: string }) {
  const [tutorStrokes, setTutorStrokes] = useState<Stroke[]>([])
  const { socket } = useSocket(sessionId)
  
  useEffect(() => {
    // Listen for tutor's broadcast strokes
    socket?.on('whiteboard:tutor-update', (whiteboardId, strokes, userId) => {
      setTutorStrokes(strokes)
    })
    
    return () => {
      socket?.off('whiteboard:tutor-update')
    }
  }, [socket])
  
  // Read-only view of tutor's whiteboard
  return (
    <div className="tutor-whiteboard-view">
      <div className="header">
        <Badge variant="secondary">Tutor's Whiteboard</Badge>
        <span className="text-sm text-muted-foreground">
          Watching live broadcast
        </span>
      </div>
      <WhiteboardCanvas strokes={tutorStrokes} readOnly />
    </div>
  )
}
```

---

### Phase 3: Student Personal Whiteboards (Week 3)

#### 3.1 Student Whiteboard Interface

**New Component**: `StudentLiveWhiteboard`

```tsx
// File: /app/student/live/components/StudentLiveWhiteboard.tsx

export function StudentLiveWhiteboard({ sessionId }: { sessionId: string }) {
  const [myWhiteboard, setMyWhiteboard] = useState<SessionWhiteboard>()
  const [visibility, setVisibility] = useState<'private' | 'tutor-only' | 'public'>('private')
  const [isMinimized, setIsMinimized] = useState(false)
  const { socket } = useSocket(sessionId)
  const { data: session } = useSession()
  
  // Create my whiteboard on mount
  useEffect(() => {
    const createWhiteboard = async () => {
      const res = await fetch(`/api/sessions/${sessionId}/whiteboard`, {
        method: 'POST'
      })
      const data = await res.json()
      setMyWhiteboard(data.whiteboard)
    }
    createWhiteboard()
  }, [sessionId])
  
  // Handle stroke - send to server
  const handleStroke = (stroke: Stroke) => {
    // Update local state
    setMyWhiteboard(prev => ({
      ...prev,
      strokes: [...prev.strokes, stroke]
    }))
    
    // Emit to server (server handles visibility permissions)
    socket?.emit('whiteboard:student-update', sessionId, myWhiteboard.id, [stroke])
  }
  
  // Toggle visibility
  const toggleVisibility = (newVisibility: 'private' | 'tutor-only' | 'public') => {
    socket?.emit('whiteboard:student-share', sessionId, newVisibility)
    setVisibility(newVisibility)
  }
  
  return (
    <div className={`student-whiteboard ${isMinimized ? 'minimized' : ''}`}>
      {/* Header with visibility toggle */}
      <div className="flex items-center justify-between p-2 bg-gray-100 border-b">
        <span className="font-medium">My Whiteboard</span>
        
        {/* Visibility Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {visibility === 'private' && <EyeOff className="w-4 h-4 mr-2" />}
              {visibility === 'tutor-only' && <UserCheck className="w-4 h-4 mr-2" />}
              {visibility === 'public' && <Users className="w-4 h-4 mr-2" />}
              {visibility === 'private' ? 'Private' : visibility === 'tutor-only' ? 'Tutor Only' : 'Class Visible'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => toggleVisibility('private')}>
              <EyeOff className="w-4 h-4 mr-2" />
              Private (Only Me)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleVisibility('tutor-only')}>
              <UserCheck className="w-4 h-4 mr-2" />
              Tutor Can View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleVisibility('public')}>
              <Users className="w-4 h-4 mr-2" />
              Class Can View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)}>
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </Button>
      </div>
      
      {/* Whiteboard Canvas */}
      {!isMinimized && (
        <CollaborativeCanvas
          whiteboard={myWhiteboard}
          onStroke={handleStroke}
          readOnly={false}
        />
      )}
    </div>
  )
}
```

#### 3.2 Student Whiteboard Gallery (Peer View)

When a student sets visibility to "public", other students can see their whiteboard:

```tsx
// File: /app/student/live/components/PeerWhiteboardGallery.tsx

export function PeerWhiteboardGallery({ sessionId }: { sessionId: string }) {
  const [publicWhiteboards, setPublicWhiteboards] = useState<SessionWhiteboard[]>([])
  const { socket } = useSocket(sessionId)
  
  useEffect(() => {
    // Listen for public whiteboard updates
    socket?.on('whiteboard:student-update-received', (studentId, whiteboardId, strokes) => {
      setPublicWhiteboards(prev => {
        const exists = prev.find(wb => wb.id === whiteboardId)
        if (exists) {
          return prev.map(wb => wb.id === whiteboardId ? { ...wb, strokes } : wb)
        }
        return [...prev, { id: whiteboardId, studentId, strokes }]
      })
    })
    
    return () => {
      socket?.off('whiteboard:student-update-received')
    }
  }, [socket])
  
  return (
    <div className="peer-whiteboard-gallery">
      <h3 className="text-sm font-medium mb-2">Classmate Whiteboards</h3>
      <div className="grid grid-cols-2 gap-2">
        {publicWhiteboards.map(wb => (
          <div key={wb.id} className="border rounded p-2">
            <div className="text-xs text-muted-foreground mb-1">
              {wb.studentName}'s Board
            </div>
            <MiniWhiteboardPreview strokes={wb.strokes} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### Phase 4: Tutor Multi-View Dashboard (Week 4)

#### 4.1 Tutor's Student Whiteboard Grid

```tsx
// File: /app/tutor/live-class/components/StudentWhiteboardGrid.tsx

export function StudentWhiteboardGrid({ sessionId, students }: { 
  sessionId: string
  students: Student[] 
}) {
  const [studentBoards, setStudentBoards] = useState<Map<string, SessionWhiteboard>>(new Map())
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const { socket } = useSocket(sessionId)
  
  useEffect(() => {
    // Tutor receives updates from students based on visibility
    socket?.on('whiteboard:student-update-received', (studentId, whiteboardId, strokes) => {
      setStudentBoards(prev => new Map(prev.set(studentId, { id: whiteboardId, strokes })))
    })
    
    return () => {
      socket?.off('whiteboard:student-update-received')
    }
  }, [socket])
  
  return (
    <div className="student-whiteboard-grid">
      <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
        {students.map(student => {
          const board = studentBoards.get(student.id)
          return (
            <div 
              key={student.id}
              className={`border rounded p-2 cursor-pointer transition-all ${
                selectedStudentId === student.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedStudentId(student.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium truncate">{student.name}</span>
                {!board && <Badge variant="outline" className="text-xs">No board</Badge>}
              </div>
              {board ? (
                <MiniWhiteboardPreview strokes={board.strokes} />
              ) : (
                <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                  No activity
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Selected student whiteboard (larger view) */}
      {selectedStudentId && (
        <div className="mt-4 border rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">
              {students.find(s => s.id === selectedStudentId)?.name}'s Whiteboard
            </h4>
            <Button variant="ghost" size="sm" onClick={() => setSelectedStudentId(null)}>
              Close
            </Button>
          </div>
          <WhiteboardCanvas 
            strokes={studentBoards.get(selectedStudentId)?.strokes || []} 
            readOnly={false} // Tutor can annotate!
          />
        </div>
      )}
    </div>
  )
}
```

---

### Phase 5: Integration & Polish (Week 5)

#### 5.1 Layout Integration

**Tutor Live Class Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Video Grid (students)     │  Main Whiteboard Area          │
│                            │  [Tutor's broadcast whiteboard]│
├────────────────────────────┼────────────────────────────────┤
│  Student List              │  Whiteboard Toolbar            │
│  - Student 1 ●           │  [Tools | Colors | Broadcast]  │
│  - Student 2 ●           ├────────────────────────────────┤
│  - Student 3 ○ (viewing) │  Student Whiteboard Gallery     │
│                            │  [Thumbnails of student boards]│
└────────────────────────────┴────────────────────────────────┘
```

**Student Live Class Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Video Grid                │  Main Area (Tutor Whiteboard)  │
│                            │  [Read-only view of tutor]     │
├────────────────────────────┼────────────────────────────────┤
│  Chat / Participants       │  My Whiteboard (collapsible)   │
│                            │  ┌────────────────────────┐    │
│                            │  │ [Tools] [Visibility▼]  │    │
│                            │  │                        │    │
│                            │  │    [Canvas Area]       │    │
│                            │  │                        │    │
│                            │  └────────────────────────┘    │
└────────────────────────────┴────────────────────────────────┘
```

#### 5.2 Performance Optimizations

```typescript
// Stroke batching for network efficiency
const useStrokeBatching = () => {
  const pendingStrokes = useRef<Stroke[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  const queueStroke = (stroke: Stroke, sendFn: (strokes: Stroke[]) => void) => {
    pendingStrokes.current.push(stroke)
    
    // Batch send every 50ms or when buffer reaches 10 strokes
    if (pendingStrokes.current.length >= 10) {
      flushBuffer(sendFn)
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => flushBuffer(sendFn), 50)
    }
  }
  
  const flushBuffer = (sendFn: (strokes: Stroke[]) => void) => {
    if (pendingStrokes.current.length > 0) {
      sendFn([...pendingStrokes.current])
      pendingStrokes.current = []
    }
    clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
  }
  
  return { queueStroke }
}

// Delta updates - only send changed strokes
const useDeltaSync = () => {
  const lastSentStrokes = useRef<Map<string, number>>(new Map())
  
  const getDelta = (allStrokes: Stroke[]): Stroke[] => {
    return allStrokes.filter(stroke => {
      const lastSent = lastSentStrokes.current.get(stroke.id) || 0
      if (stroke.updatedAt > lastSent) {
        lastSentStrokes.current.set(stroke.id, Date.now())
        return true
      }
      return false
    })
  }
  
  return { getDelta }
}
```

---

## Key Features Summary

### Feature 1: Tutor Broadcast Mode ✅
- Tutor clicks "Start Broadcast"
- All strokes immediately pushed to all students
- Students see real-time drawing with <100ms latency
- Tutor can stop broadcast anytime

### Feature 2: Student Personal Whiteboards ✅
- Each student gets their own whiteboard on joining
- Persistent throughout the session
- Students can draw freely without affecting others

### Feature 3: Tutor View Student Boards ✅
- Tutor sees gallery of all student whiteboards
- Click to expand and view full-size
- Tutor can annotate on student boards (for feedback)
- Real-time updates as student draws

### Feature 4: Student Visibility Toggle ✅
Three visibility levels:
1. **Private** (default) - Only student sees their board
2. **Tutor Only** - Tutor can view, other students cannot
3. **Public** - Entire class can view (for presentations)

---

## Security & Permissions

```typescript
// Permission matrix
const PERMISSIONS = {
  tutor: {
    canBroadcast: true,
    canViewAllStudentBoards: true,
    canAnnotateOnStudentBoards: true,
    canCreateMultipleBoards: true
  },
  student: {
    canBroadcast: false,
    canViewOwnBoard: true,
    canViewOtherBoards: (visibility) => visibility === 'public',
    canShareWithTutor: true,
    canShareWithClass: true
  }
}

// Server-side validation
io.on('whiteboard:student-share', (sessionId, visibility) => {
  const user = getUser(socket)
  if (user.role !== 'student') return
  
  // Validate visibility change
  if (!['private', 'tutor-only', 'public'].includes(visibility)) {
    return socket.emit('error', 'Invalid visibility')
  }
  
  // Update and broadcast change
  updateWhiteboardVisibility(sessionId, user.id, visibility)
  
  // Notify relevant users based on visibility
  if (visibility === 'public') {
    io.to(sessionId).emit('whiteboard:visibility-changed', user.id, visibility)
  } else if (visibility === 'tutor-only') {
    io.to(getTutorId(sessionId)).emit('whiteboard:visibility-changed', user.id, visibility)
  }
})
```

---

## Technical Stack

| Component | Technology |
|-----------|------------|
| Real-time sync | Socket.io (existing) |
| Canvas rendering | HTML5 Canvas API |
| Drawing smoothing | Quadratic curve interpolation |
| State management | React hooks + Zustand |
| Persistence | PostgreSQL + Prisma |
| Stroke storage | JSON array in database |
| Export formats | PNG, SVG, PDF |

---

## Estimated Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1 | 1 week | Database, Socket events, API routes |
| Phase 2 | 1 week | Tutor broadcast functionality |
| Phase 3 | 1 week | Student whiteboards with visibility |
| Phase 4 | 1 week | Tutor multi-view dashboard |
| Phase 5 | 1 week | Integration, testing, polish |
| **Total** | **5 weeks** | **Full feature set** |

---

## Success Metrics

- [ ] Latency < 100ms for stroke propagation
- [ ] Support 50 concurrent students with whiteboards
- [ ] Zero data loss on page refresh
- [ ] < 5MB memory per whiteboard instance
- [ ] Smooth 60fps drawing experience

---

## Conclusion

This implementation plan enables a fully-featured, real-time collaborative whiteboard system within Live Class sessions. The architecture leverages existing Socket.io infrastructure and adds minimal complexity while providing powerful educational capabilities.

**All requested features are technically feasible and can be implemented within 5 weeks.**
