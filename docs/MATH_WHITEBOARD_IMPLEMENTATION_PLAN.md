# Math Tutoring Whiteboard - Complete Implementation Plan

## Executive Summary

A comprehensive, collaborative math tutoring whiteboard built from scratch with real-time synchronization, AI-powered tutoring assistance, and support for all mathematical notation types.

---

## 1. Feature Requirements

### 1.1 Core Drawing Tools
- **Freehand Drawing**: Pen with pressure sensitivity, eraser
- **Shapes**: Lines, rectangles, circles, triangles, polygons, arrows
- **Text**: Rich text with math equation support (LaTeX)
- **Graphing**: Coordinate planes with function plotting
- **Selection**: Move, resize, rotate, group objects
- **Layers**: Multiple layers (background, problems, solutions, annotations)

### 1.2 Math-Specific Features
- **Equation Editor**: WYSIWYG LaTeX editor with live preview
- **Symbol Palette**: Quick access to common math symbols (Greek, operators, etc.)
- **Graphing Calculator**: Plot functions, inequalities, parametric equations
- **Geometry Tools**: Compass, protractor, ruler with measurement
- **Matrix Editor**: Visual matrix creation and manipulation
- **Number Line**: Interactive number line with points and intervals

### 1.3 Collaboration Features
- **Real-time Sync**: Instant synchronization across all participants
- **Cursor Tracking**: See tutor/student cursors with names
- **Lock/Unlock**: Tutor controls when students can edit
- **Breakout Rooms**: Individual whiteboards for each student
- **Presence Indicators**: Who's online and viewing
- **Chat Integration**: Discuss problems while working

### 1.4 AI-Powered Features
- **Step-by-Step Solver**: AI guides through problem solving
- **Error Detection**: Highlight mistakes and suggest corrections
- **Hint System**: Socratic questioning to guide students
- **Auto-Grading**: Check student work against solutions
- **Formula Recognition**: Convert handwriting to typed equations
- **Problem Generator**: Create similar practice problems

### 1.5 Content Management
- **Templates**: Pre-made templates (coordinate plane, graph paper, etc.)
- **Import/Export**: PDF, images, GeoGebra files
- **Snapshots**: Save and restore whiteboard states
- **Sessions**: Persistent sessions that can be resumed
- **Library**: Store and reuse common problems/diagrams

### 1.6 Accessibility & UX
- **Zoom/Pan**: Navigate large whiteboards
- **Undo/Redo**: Full history management
- **Copy/Paste**: Duplicate elements
- **Keyboard Shortcuts**: Power user features
- **Mobile Support**: Touch-friendly interface
- **Screen Reader**: ARIA labels and descriptions

---

## 2. Technical Architecture

### 2.1 Technology Stack

```
Frontend:
├── React 18 + TypeScript
├── Next.js 14 (App Router)
├── Fabric.js 7.x (Canvas rendering)
├── MathJax 3 (Equation rendering)
├── Plotly.js / Chart.js (Graphing)
├── Socket.io-client (Real-time)
├── Zustand (State management)
└── Tailwind CSS + shadcn/ui

Backend:
├── Node.js + Express / Next.js API Routes
├── Socket.io (WebSocket server)
├── PostgreSQL (Persistent storage)
├── Redis (Session/cache)
├── AWS S3 (File storage)
└── OpenAI/Claude API (AI features)

Math Libraries:
├── Math.js (Calculations)
├── Algebrite (CAS - Computer Algebra System)
├── Plotly.js (Graphing)
└── MathJax (LaTeX rendering)
```

### 2.2 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   React UI   │  │ Math Canvas  │  │  Equation Editor │  │
│  │   (Tools)    │  │  (Fabric.js) │  │    (MathJax)     │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Graphing   │  │  AI Tutor    │  │   Chat Panel     │  │
│  │   (Plotly)   │  │   Widget     │  │                  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Socket.io Server                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Room Management                           │ │
│  │  • Session rooms (tutor + students)                    │ │
│  │  • Breakout rooms (1-on-1 sessions)                    │ │
│  │  • Cursor sync and presence                            │ │
│  │  • Lock/unlock state management                        │ │
│  └────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  PostgreSQL  │   │    Redis     │   │  AI Service  │
│  (Whiteboard │   │  (Sessions,  │   │  (OpenAI/    │
│   snapshots) │   │   cache)     │   │   Claude)    │
└──────────────┘   └──────────────┘   └──────────────┘
```

### 2.3 Data Models

```typescript
// Database Schema (Prisma)

model MathWhiteboard {
  id          String   @id @default(cuid())
  tutorId     String
  sessionId   String   @unique
  title       String
  description String?
  status      WhiteboardStatus @default(ACTIVE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  tutor       User     @relation(fields: [tutorId], references: [id])
  pages       WhiteboardPage[]
  snapshots   WhiteboardSnapshot[]
  participants WhiteboardParticipant[]
  chatMessages ChatMessage[]
  
  @@index([tutorId])
  @@index([sessionId])
}

model WhiteboardPage {
  id              String   @id @default(cuid())
  whiteboardId    String
  name            String
  order           Int
  backgroundType  String   @default("white") // white, grid, graph, custom
  backgroundColor String   @default("#ffffff")
  width           Int      @default(1920)
  height          Int      @default(1080)
  
  // Serialized canvas state
  elements        Json     // Fabric.js objects
  
  whiteboard      MathWhiteboard @relation(fields: [whiteboardId], references: [id], onDelete: Cascade)
}

model WhiteboardSnapshot {
  id            String   @id @default(cuid())
  whiteboardId  String
  name          String
  createdBy     String
  pages         Json     // Array of page states
  createdAt     DateTime @default(now())
  
  whiteboard    MathWhiteboard @relation(fields: [whiteboardId], references: [id], onDelete: Cascade)
}

model WhiteboardParticipant {
  id            String   @id @default(cuid())
  whiteboardId  String
  userId        String
  role          ParticipantRole // TUTOR, STUDENT, OBSERVER
  canEdit       Boolean  @default(false)
  joinedAt      DateTime @default(now())
  leftAt        DateTime?
  
  whiteboard    MathWhiteboard @relation(fields: [whiteboardId], references: [id], onDelete: Cascade)
  user          User     @relation(fields: [userId], references: [id])
  
  @@unique([whiteboardId, userId])
}

// In-Memory State (Redis)
interface ActiveSession {
  sessionId: string
  tutorId: string
  participants: Map<string, Participant>
  currentPage: number
  isLocked: boolean
  cursors: Map<string, CursorPosition>
  lastActivity: number
}

interface Participant {
  userId: string
  name: string
  role: 'tutor' | 'student'
  socketId: string
  color: string // Cursor color
  isTyping: boolean
}

interface CursorPosition {
  x: number
  y: number
  timestamp: number
}
```

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
MathWhiteboardLayout
├── MathToolbar (tools palette)
│   ├── DrawingTools (pen, eraser, shapes)
│   ├── MathTools (equation, graph, geometry)
│   ├── InsertTools (image, text, template)
│   └── ViewControls (zoom, grid, lock)
├── CanvasArea
│   ├── CoordinateGrid (background)
│   ├── MathCanvas (Fabric.js canvas)
│   ├── SelectionOverlay (transform controls)
│   └── CursorOverlay (participant cursors)
├── Sidebar
│   ├── PageNavigator (multi-page support)
│   ├── LayersPanel (layer management)
│   ├── MathLibrary (saved equations/templates)
│   └── AIAssistant
│       ├── ProblemSolver
│       ├── HintGenerator
│       └── StepChecker
├── ChatPanel (collaborative chat)
└── StatusBar (connection, participants, zoom)
```

### 3.2 Key Components Detail

#### MathCanvas Component
```typescript
interface MathCanvasProps {
  sessionId: string
  pageId: string
  width: number
  height: number
  backgroundType: 'white' | 'grid' | 'graph' | 'dot' | 'custom'
  isEditable: boolean
  onElementChange: (elements: CanvasElement[]) => void
}

// Canvas element types
interface CanvasElement {
  id: string
  type: 'path' | 'shape' | 'text' | 'equation' | 'graph' | 'image'
  transform: {
    x: number
    y: number
    rotation: number
    scaleX: number
    scaleY: number
  }
  properties: PathProps | ShapeProps | TextProps | EquationProps | GraphProps
  layer: number
  locked: boolean
  authorId: string
}
```

#### EquationEditor Component
```typescript
interface EquationEditorProps {
  initialValue?: string
  onChange: (latex: string, rendered: string) => void
  placeholder?: string
  symbols: MathSymbol[]
}

interface MathSymbol {
  category: 'operators' | 'greek' | 'relations' | 'arrows' | 'sets' | 'calculus'
  latex: string
  display: string
  shortcut?: string
}
```

#### GraphingCalculator Component
```typescript
interface GraphingCalculatorProps {
  width: number
  height: number
  xRange: [number, number]
  yRange: [number, number]
  functions: PlottedFunction[]
  onFunctionAdd: (fn: PlottedFunction) => void
  interactive: boolean
}

interface PlottedFunction {
  id: string
  expression: string // "2*x + 1" or "sin(x)"
  color: string
  visible: boolean
  style: 'solid' | 'dashed' | 'dotted'
}
```

---

## 4. Real-Time Collaboration System

### 4.1 Socket Events

```typescript
// Server -> Client Events
interface ServerEvents {
  // Session management
  'wb:participant_joined': (p: Participant) => void
  'wb:participant_left': (userId: string) => void
  'wb:cursor_moved': (userId: string, pos: CursorPosition) => void
  
  // Canvas synchronization
  'wb:element_created': (element: CanvasElement, authorId: string) => void
  'wb:element_modified': (id: string, changes: Partial<CanvasElement>) => void
  'wb:element_deleted': (id: string) => void
  'wb:elements_sync': (elements: CanvasElement[]) => void
  
  // Page/Layer changes
  'wb:page_changed': (pageIndex: number) => void
  'wb:layer_visibility': (layerId: string, visible: boolean) => void
  
  // Control
  'wb:lock_changed': (locked: boolean, by: string) => void
  'wb:view_changed': (transform: ViewTransform) => void
  
  // Chat
  'wb:chat_message': (msg: ChatMessage) => void
  
  // AI
  'wb:ai_hint': (hint: string, targetElement?: string) => void
  'wb:ai_correction': (elementId: string, suggestion: string) => void
}

// Client -> Server Events
interface ClientEvents {
  'wb:join': (sessionId: string, user: UserInfo) => void
  'wb:leave': (sessionId: string) => void
  'wb:cursor': (pos: CursorPosition) => void
  
  'wb:create_element': (element: CanvasElement) => void
  'wb:modify_element': (id: string, changes: Partial<CanvasElement>) => void
  'wb:delete_element': (id: string) => void
  
  'wb:change_page': (pageIndex: number) => void
  'wb:set_lock': (locked: boolean) => void
  
  'wb:send_chat': (text: string) => void
  'wb:request_ai_hint': (context: string, elementId?: string) => void
}
```

### 4.2 Conflict Resolution (CRDT)

```typescript
// Use CRDT (Conflict-free Replicated Data Type) for elements
interface CRDTElement extends CanvasElement {
  vectorClock: Map<string, number>
  timestamp: number
  operationId: string // Unique ID for each operation
}

// Last-Writer-Wins with tombstones for deleted elements
class WhiteboardCRDT {
  elements: Map<string, CRDTElement>
  tombstones: Set<string> // Deleted element IDs
  
  merge(remote: CRDTElement[]): void {
    // Merge remote changes with local state
    // Resolve conflicts using vector clocks
  }
}
```

---

## 5. AI Integration Architecture

### 5.1 AI Features

```typescript
interface AITutorService {
  // Solve a math problem step by step
  solveProblem(problem: string): Promise<Step[]>
  
  // Check student's work and identify errors
  checkWork(problem: string, studentWork: string): Promise<Feedback>
  
  // Generate a hint without giving the answer
  generateHint(problem: string, studentProgress: string): Promise<string>
  
  // Generate similar practice problems
  generateProblems(topic: string, difficulty: number, count: number): Promise<Problem[]>
  
  // Convert handwriting to LaTeX
  recognizeMath(imageData: string): Promise<string>
  
  // Explain a concept
  explainConcept(concept: string, level: 'basic' | 'intermediate' | 'advanced'): Promise<string>
}

interface Step {
  number: number
  description: string
  latex: string
  explanation: string
}

interface Feedback {
  isCorrect: boolean
  score: number
  errors: ErrorLocation[]
  suggestions: string[]
}
```

### 5.2 AI Prompts

```typescript
const MATH_TUTOR_PROMPTS = {
  solve: `You are a math tutor. Solve this problem step by step:
- Show all work clearly
- Explain each step briefly
- Use LaTeX for mathematical expressions
- Identify the final answer

Problem: {{problem}}`,

  hint: `You are a Socratic math tutor. The student is working on:
{{problem}}

Their current work: {{work}}

Provide a hint that guides them to the next step WITHOUT giving the answer.
Use questions to prompt critical thinking.`,

  check: `Check this student's math work:

Problem: {{problem}}
Student's Answer: {{answer}}

Identify any errors and explain why they're wrong.
If correct, confirm and praise.
Return JSON format with isCorrect, errors array, and suggestions.`
}
```

---

## 6. Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
**Goal**: Basic whiteboard with drawing tools

**Tasks**:
1. Set up project structure and dependencies
2. Create database schema
3. Implement basic canvas with Fabric.js
4. Add drawing tools (pen, eraser, colors)
5. Basic shapes (line, rectangle, circle)
6. Selection and manipulation
7. Undo/redo system

**Deliverables**:
- Working canvas with basic tools
- Data persistence
- Unit tests

### Phase 2: Math Features (Weeks 3-4)
**Goal**: Math-specific tools and equation support

**Tasks**:
1. Integrate MathJax for equation rendering
2. Build equation editor with LaTeX support
3. Create symbol palette
4. Implement coordinate plane background
5. Add graphing calculator (Plotly.js)
6. Geometry tools (compass, protractor)
7. Matrix editor

**Deliverables**:
- Equation editor
- Graphing functionality
- Geometry tools

### Phase 3: Real-Time Collaboration (Weeks 5-6)
**Goal**: Multi-user synchronization

**Tasks**:
1. Set up Socket.io server
2. Implement room management
3. Add cursor tracking
4. Sync canvas state
5. Handle conflicts (CRDT)
6. Lock/unlock controls
7. Presence indicators

**Deliverables**:
- Real-time sync working
- Multi-user sessions
- Conflict resolution

### Phase 4: AI Integration (Weeks 7-8)
**Goal**: AI-powered tutoring features

**Tasks**:
1. Integrate AI API (OpenAI/Claude)
2. Build problem solver
3. Implement hint system
4. Add handwriting recognition
5. Create auto-grader
6. AI tutor chat interface
7. Step-by-step explanations

**Deliverables**:
- AI solver working
- Hint system
- Chat interface

### Phase 5: Advanced Features (Weeks 9-10)
**Goal**: Professional tutoring features

**Tasks**:
1. Multi-page support
2. Layer management
3. Templates library
4. Import/Export (PDF, images)
5. Session recording/playback
6. Breakout rooms
7. Screen sharing integration

**Deliverables**:
- Complete feature set
- Session management
- Import/export

### Phase 6: Polish & Launch (Weeks 11-12)
**Goal**: Production-ready system

**Tasks**:
1. Performance optimization
2. Mobile responsiveness
3. Accessibility (ARIA, keyboard)
4. Error handling
5. Security audit
6. Load testing
7. Documentation

**Deliverables**:
- Production deployment
- Documentation
- Training materials

---

## 7. API Endpoints

```typescript
// Whiteboard Sessions
POST   /api/whiteboard/sessions          // Create new session
GET    /api/whiteboard/sessions/:id      // Get session details
PUT    /api/whiteboard/sessions/:id      // Update session
DELETE /api/whiteboard/sessions/:id      // End session

// Pages
GET    /api/whiteboard/sessions/:id/pages
POST   /api/whiteboard/sessions/:id/pages
PUT    /api/whiteboard/pages/:pageId
DELETE /api/whiteboard/pages/:pageId

// Snapshots
GET    /api/whiteboard/sessions/:id/snapshots
POST   /api/whiteboard/sessions/:id/snapshots
GET    /api/whiteboard/snapshots/:snapshotId

// AI Features
POST   /api/whiteboard/ai/solve          // Solve problem
POST   /api/whiteboard/ai/hint           // Get hint
POST   /api/whiteboard/ai/check          // Check work
POST   /api/whiteboard/ai/recognize      // OCR for math

// Files
POST   /api/whiteboard/upload            // Upload image/PDF
GET    /api/whiteboard/export/:sessionId // Export session
```

---

## 8. File Structure

```
tutorme-app/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       └── whiteboard/
│   │           ├── page.tsx              # Main whiteboard page
│   │           └── layout.tsx
│   ├── components/
│   │   └── whiteboard/
│   │       ├── MathWhiteboard.tsx        # Main component
│   │       ├── Canvas/
│   │       │   ├── MathCanvas.tsx
│   │       │   ├── GridBackground.tsx
│   │       │   ├── CursorOverlay.tsx
│   │       │   └── SelectionOverlay.tsx
│   │       ├── Toolbar/
│   │       │   ├── MathToolbar.tsx
│   │       │   ├── DrawingTools.tsx
│   │       │   ├── MathTools.tsx
│   │       │   └── ViewControls.tsx
│   │       ├── Math/
│   │       │   ├── EquationEditor.tsx
│   │       │   ├── GraphingCalculator.tsx
│   │       │   ├── SymbolPalette.tsx
│   │       │   └── GeometryTools.tsx
│   │       ├── AI/
│   │       │   ├── AIAssistant.tsx
│   │       │   ├── ProblemSolver.tsx
│   │       │   └── HintGenerator.tsx
│   │       ├── Chat/
│   │       │   └── ChatPanel.tsx
│   │       └── Sidebar/
│   │           ├── PageNavigator.tsx
│   │           ├── LayersPanel.tsx
│   │           └── MathLibrary.tsx
│   ├── hooks/
│   │   ├── use-whiteboard.ts
│   │   ├── use-canvas.ts
│   │   ├── use-collaboration.ts
│   │   └── use-ai-tutor.ts
│   ├── lib/
│   │   ├── whiteboard/
│   │   │   ├── canvas-manager.ts
│   │   │   ├── element-factory.ts
│   │   │   ├── crdt.ts
│   │   │   └── serializers.ts
│   │   ├── math/
│   │   │   ├── equation-parser.ts
│   │   │   ├── graphing.ts
│   │   │   └── geometry.ts
│   │   └── ai/
│   │       └── math-tutor.ts
│   └── types/
│       └── whiteboard.ts
├── prisma/
│   └── schema.prisma
└── docs/
    └── MATH_WHITEBOARD_IMPLEMENTATION_PLAN.md
```

---

## 9. Testing Strategy

### 9.1 Unit Tests
- Canvas element creation/manipulation
- CRDT conflict resolution
- Equation parsing
- Math calculations

### 9.2 Integration Tests
- Socket event handling
- Database operations
- AI service integration
- File upload/download

### 9.3 E2E Tests
- Complete tutoring session flow
- Multi-user collaboration
- AI feature workflows
- Mobile responsiveness

### 9.4 Performance Tests
- Canvas with 1000+ elements
- 50+ concurrent users
- Real-time sync latency < 100ms

---

## 10. Success Metrics

| Metric | Target |
|--------|--------|
| Canvas Load Time | < 2 seconds |
| Sync Latency | < 100ms |
| AI Response Time | < 3 seconds |
| Concurrent Users | 50+ per room |
| Uptime | 99.9% |
| Mobile Support | Full functionality |
| Accessibility | WCAG 2.1 AA |

---

## 11. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Canvas performance with many elements | Implement virtualization, LOD |
| Socket disconnections | Auto-reconnect with state recovery |
| AI API failures | Fallback to local math.js |
| Browser compatibility | Polyfills, feature detection |
| Data loss | Auto-save every 30 seconds |
| Security | Input sanitization, rate limiting |

---

## 12. Future Enhancements

- **3D Graphing**: Plot 3D surfaces and vectors
- **Video Recording**: Record sessions for review
- **AR/VR**: Immersive math visualization
- **Handwriting Recognition**: Better OCR for math
- **Voice Commands**: "Plot sine of x"
- **Integration**: GeoGebra, Desmos, Wolfram Alpha

---

**Estimated Total Effort**: 12 weeks (3 months) with 2-3 developers
**Priority**: High - Core platform feature
