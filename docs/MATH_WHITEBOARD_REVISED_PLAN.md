# Math Whiteboard - Revised Implementation Plan

## Executive Summary

**Project**: Advanced Math Tutoring Whiteboard  
**Integration**: Extension of existing TutorMe platform  
**Location**: New tab in Live Class interface (`/tutor/live-class`)  
**Users**: Elementary to University (1-50 concurrent users)  
**Priority**: HIGH - Expert architect review upon completion  

---

## 1. Architecture Integration

### 1.1 Integration Points

```
┌─────────────────────────────────────────────────────────────────┐
│                     TutorMe Live Class                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Video   │  │  Chat    │  │  Polls   │  │ Math Whiteboard  │ │
│  │ (Daily)  │  │ (Socket) │  │ (Socket) │  │   (NEW TAB)      │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
│                                                                  │
│  Shared: Socket.io server at /api/socket                         │
│  Auth: NextAuth.js session                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Socket.io Event Integration

Extend existing socket server (`src/lib/socket-server.ts`):

```typescript
// New events to add alongside existing handlers
interface MathWhiteboardEvents {
  // Join/Leave
  'math_wb_join': (data: { roomId: string; userId: string; name: string; role: 'tutor' | 'student' }) => void
  'math_wb_leave': (roomId: string) => void
  
  // Element Operations (CRDT-based)
  'math_wb_element_create': (element: MathElement) => void
  'math_wb_element_update': (id: string, changes: Partial<MathElement>) => void
  'math_wb_element_delete': (id: string) => void
  'math_wb_elements_sync': (elements: MathElement[]) => void
  
  // View Control
  'math_wb_view_lock': (locked: boolean) => void
  'math_wb_page_change': (pageIndex: number) => void
  'math_wb_zoom': (scale: number, center: Point) => void
  
  // AI Features
  'math_wb_ai_solve': (problem: string) => void
  'math_wb_ai_hint': (context: string) => void
  'math_wb_ai_check': (problem: string, answer: string) => void
  
  // Session Management
  'math_wb_snapshot_save': (name: string) => void
  'math_wb_snapshot_load': (snapshotId: string) => void
  'math_wb_export': (format: 'pdf' | 'png') => void
}
```

### 1.3 Database Schema Extension

Extend existing Prisma schema:

```prisma
// Add to prisma/schema.prisma

model MathWhiteboardSession {
  id          String   @id @default(cuid())
  liveClassId String   // Links to existing LiveSession
  tutorId     String
  title       String
  status      SessionStatus @default(ACTIVE)
  
  // Permissions
  isLocked    Boolean  @default(false)
  allowStudentEdit Boolean @default(false)
  
  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  endedAt     DateTime?
  
  // Relations
  liveClass   LiveSession @relation(fields: [liveClassId], references: [id])
  tutor       User     @relation(fields: [tutorId], references: [id])
  pages       MathWhiteboardPage[]
  snapshots   MathWhiteboardSnapshot[]
  participants MathWhiteboardParticipant[]
  aiSessions  MathAIInteraction[]
  
  @@index([liveClassId])
  @@index([tutorId])
  @@index([status])
}

model MathWhiteboardPage {
  id              String   @id @default(cuid())
  sessionId       String
  name            String
  order           Int
  
  // Canvas Properties
  width           Int      @default(1920)
  height          Int      @default(1080)
  backgroundType  String   @default("grid") // white, grid, graph, dot, isometric
  backgroundColor String   @default("#ffffff")
  
  // Serialized Canvas State (Fabric.js JSON)
  elements        Json     // Array of MathElement
  
  // CRDT Vector Clock for conflict resolution
  vectorClock     Json     // Map<userId, timestamp>
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  session         MathWhiteboardSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  
  @@index([sessionId])
  @@index([order])
}

model MathWhiteboardParticipant {
  id          String   @id @default(cuid())
  sessionId   String
  userId      String
  role        Role     // TUTOR, STUDENT
  
  // Permissions
  canEdit     Boolean  @default(false)
  canChat     Boolean  @default(true)
  
  // Cursor tracking
  cursorX     Float?
  cursorY     Float?
  cursorColor String   // Assigned color for cursor
  
  joinedAt    DateTime @default(now())
  leftAt      DateTime?
  
  session     MathWhiteboardSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  user        User     @relation(fields: [userId], references: [id])
  
  @@unique([sessionId, userId])
  @@index([sessionId])
}

model MathWhiteboardSnapshot {
  id          String   @id @default(cuid())
  sessionId   String
  name        String
  createdBy   String
  
  // Serialized state
  pages       Json     // Array of page states
  
  createdAt   DateTime @default(now())
  
  session     MathWhiteboardSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  
  @@index([sessionId])
}

model MathAIInteraction {
  id          String   @id @default(cuid())
  sessionId   String
  userId      String
  type        AIInteractionType // SOLVE, HINT, CHECK, EXPLAIN
  
  // Input/Output
  input       String   // Problem or context
  output      String   // AI response
  latexOutput String?  // Formatted math output
  
  // Metadata
  modelUsed   String   // Which AI provider responded
  latencyMs   Int
  
  createdAt   DateTime @default(now())
  
  session     MathWhiteboardSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  
  @@index([sessionId])
  @@index([type])
}

enum SessionStatus {
  ACTIVE
  PAUSED
  ENDED
  ARCHIVED
}

enum AIInteractionType {
  SOLVE
  HINT
  CHECK
  EXPLAIN
}
```

---

## 2. Component Architecture

### 2.1 File Structure

```
tutorme-app/src/
├── components/
│   └── whiteboard/
│       ├── MathWhiteboardContainer.tsx      # Main container
│       ├── toolbar/
│       │   ├── MathToolbar.tsx              # Primary toolbar
│       │   ├── DrawingTools.tsx             # Pen, eraser, shapes
│       │   ├── MathTools.tsx                # Equation, graph, geometry
│       │   ├── ViewControls.tsx             # Zoom, pan, grid
│       │   └── AITools.tsx                  # AI assistant panel
│       ├── canvas/
│       │   ├── MathCanvas.tsx               # Fabric.js canvas wrapper
│       │   ├── GridBackground.tsx           # Grid/graph paper
│       │   ├── CursorOverlay.tsx            # Multi-user cursors
│       │   ├── SelectionManager.tsx         # Object selection
│       │   └── ElementRenderer.tsx          # Render different element types
│       ├── math/
│       │   ├── EquationEditor.tsx           # LaTeX editor
│       │   ├── SymbolPalette.tsx            # Math symbols
│       │   ├── GraphingCalculator.tsx       # Function plotting
│       │   ├── GeometryTools.tsx            # Compass, protractor
│       │   └── NumberLine.tsx               # Interactive number line
│       ├── ai/
│       │   ├── AIAssistantPanel.tsx         # AI sidebar
│       │   ├── ProblemSolver.tsx            # Step-by-step solver
│       │   ├── HintGenerator.tsx            # Socratic hints
│       │   └── WorkChecker.tsx              # Check student work
│       ├── sidebar/
│       │   ├── PageNavigator.tsx            # Multi-page tabs
│       │   ├── LayersPanel.tsx              # Layer management
│       │   ├── ParticipantsList.tsx         # User presence
│       │   └── SnapshotsPanel.tsx           # Save/load states
│       └── shared/
│           ├── ColorPicker.tsx
│           ├── StrokeWidthSlider.tsx
│           ├── ZoomControls.tsx
│           └── LockIndicator.tsx
├── hooks/
│   ├── use-math-whiteboard.ts               # Main whiteboard hook
│   ├── use-canvas-sync.ts                   # Socket sync
│   ├── use-ai-math.ts                       # AI integration
│   ├── use-elements.ts                      # Element CRUD
│   └── use-view-transform.ts                # Zoom/pan
├── lib/
│   ├── whiteboard/
│   │   ├── canvas-manager.ts                # Fabric.js management
│   │   ├── element-factory.ts               # Create elements
│   │   ├── crdt.ts                          # Conflict resolution
│   │   ├── serializers.ts                   # Import/export
│   │   └── templates.ts                     # Pre-made templates
│   ├── math/
│   │   ├── equation-renderer.ts             # MathJax integration
│   │   ├── graphing-engine.ts               # Plotly integration
│   │   ├── geometry-calculations.ts         # Math utilities
│   │   └── handwriting-recognizer.ts        # OCR for math
│   └── ai/
│       └── math-tutor-prompts.ts            # AI prompts
└── types/
    └── whiteboard.ts                        # TypeScript definitions
```

### 2.2 TypeScript Types

```typescript
// types/whiteboard.ts

export interface MathElement {
  id: string
  type: ElementType
  authorId: string
  layer: number
  locked: boolean
  
  // Transform
  x: number
  y: number
  rotation: number
  scaleX: number
  scaleY: number
  
  // CRDT
  version: number
  lastModified: number
  modifiedBy: string
}

export type ElementType = 
  | 'path'           // Freehand drawing
  | 'shape'          // Rectangle, circle, etc.
  | 'line'           // Straight line with arrow option
  | 'text'           // Plain text
  | 'equation'       // LaTeX equation
  | 'graph'          // Plotted function
  | 'point'          // Single point
  | 'angle'          // Angle marker
  | 'measurement'    // Ruler measurement
  | 'image'          // Uploaded image

export interface PathElement extends MathElement {
  type: 'path'
  points: Array<{ x: number; y: number; pressure?: number }>
  strokeColor: string
  strokeWidth: number
  isEraser: boolean
}

export interface ShapeElement extends MathElement {
  type: 'shape'
  shapeType: 'rectangle' | 'circle' | 'triangle' | 'polygon' | 'arrow'
  width: number
  height: number
  fillColor?: string
  strokeColor: string
  strokeWidth: number
}

export interface EquationElement extends MathElement {
  type: 'equation'
  latex: string
  fontSize: number
  color: string
}

export interface GraphElement extends MathElement {
  type: 'graph'
  xRange: [number, number]
  yRange: [number, number]
  functions: PlottedFunction[]
  showGrid: boolean
  showAxes: boolean
}

export interface PlottedFunction {
  id: string
  expression: string      // "2*x + 1" or "sin(x)"
  color: string
  lineWidth: number
  lineStyle: 'solid' | 'dashed' | 'dotted'
  visible: boolean
}

export interface ViewTransform {
  scale: number
  offsetX: number
  offsetY: number
}

export interface WhiteboardState {
  sessionId: string
  currentPage: number
  totalPages: number
  elements: MathElement[]
  selectedIds: string[]
  isLocked: boolean
  transform: ViewTransform
  activeTool: ToolType
  toolSettings: ToolSettings
}

export type ToolType = 
  | 'select'
  | 'pen' 
  | 'eraser'
  | 'line'
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'text'
  | 'equation'
  | 'graph'
  | 'compass'
  | 'protractor'
  | 'hand'      // Pan tool

export interface ToolSettings {
  strokeColor: string
  strokeWidth: number
  fillColor?: string
  fontSize: number
  opacity: number
}

// AI Types
export interface MathProblem {
  id: string
  text: string
  latex?: string
  imageDataUrl?: string
  topic?: string
  difficulty?: number
}

export interface SolutionStep {
  step: number
  description: string
  latex: string
  explanation: string
}

export interface AIHint {
  type: 'socratic' | 'direct' | 'encouragement'
  message: string
  relatedStep?: number
}
```

---

## 3. Implementation Phases (Revised)

### Phase 1: Foundation & Integration (Week 1-2)

**Goal**: Integrate with existing Live Class, basic canvas working

**Tasks**:
1. **Database Setup**
   - Add new tables to Prisma schema
   - Create migration
   - Seed default templates

2. **Socket Integration**
   - Extend `src/lib/socket-server.ts` with math whiteboard events
   - Implement room management for whiteboard sessions
   - Add participant tracking

3. **Basic UI Structure**
   - Create new tab in Live Class interface
   - Build `MathWhiteboardContainer` component
   - Integrate with existing auth/session

4. **Canvas Foundation**
   - Set up Fabric.js canvas
   - Implement basic drawing (pen, eraser)
   - Add zoom/pan functionality

**Deliverables**:
- [ ] Database migration complete
- [ ] Socket events working
- [ ] Tab visible in Live Class
- [ ] Can draw basic shapes

---

### Phase 2: Math Tools Core (Week 3-4)

**Goal**: All math-specific tools functional

**Tasks**:
1. **Equation System**
   - Integrate MathJax
   - Build LaTeX editor component
   - Create symbol palette
   - Support inline equation editing

2. **Graphing Calculator**
   - Integrate Plotly.js
   - Build function input UI
   - Support multiple functions
   - Interactive zoom/pan on graphs

3. **Geometry Tools**
   - Compass tool (draw circles with radius)
   - Protractor tool (measure angles)
   - Ruler tool (straight lines with measurement)
   - Triangle/polygon tools

4. **Backgrounds & Templates**
   - Grid paper (various sizes)
   - Coordinate plane (Cartesian)
   - Isometric grid
   - Number line

**Deliverables**:
- [ ] Equation editor working
- [ ] Can plot functions
- [ ] Geometry tools functional
- [ ] 5+ templates available

---

### Phase 3: Real-Time Collaboration (Week 5-6)

**Goal**: Multi-user synchronization working perfectly

**Tasks**:
1. **CRDT Implementation**
   - Implement vector clocks for each element
   - Build conflict resolution algorithm
   - Handle concurrent edits

2. **Cursor Tracking**
   - Real-time cursor positions
   - Show user names/colors
   - Smooth cursor animation

3. **Lock/Permission System**
   - Tutor can lock/unlock canvas
   - Individual element locking
   - Breakout room support (per-student boards)

4. **Session Persistence**
   - Auto-save every 30 seconds
   - Snapshot save/load
   - Session resume after disconnect

5. **Performance Optimization**
   - Virtual rendering for large whiteboards
   - Debounce rapid updates
   - Compress socket payloads

**Deliverables**:
- [ ] 50 concurrent users supported
- [ ] Sync latency < 100ms
- [ ] Lock system working
- [ ] Sessions persist across disconnects

---

### Phase 4: AI Integration (Week 7-8)

**Goal**: Basic AI features using existing providers

**Tasks**:
1. **AI Service Setup**
   - Create `math-tutor-prompts.ts`
   - Integrate with existing AI orchestrator
   - Build error handling/fallbacks

2. **Problem Solver**
   - "Solve this" button
   - Step-by-step display
   - Show LaTeX for each step
   - Cache common solutions

3. **Hint System**
   - Context-aware hints
   - Socratic questioning mode
   - Progress tracking

4. **Work Checker**
   - Compare student work to solution
   - Highlight errors
   - Explain mistakes
   - Score/grade feature

5. **Handwriting Recognition**
   - Use AI to convert drawing to LaTeX
   - Support equations and numbers
   - Fallback to manual entry

**Deliverables**:
- [ ] AI solves problems correctly
- [ ] Hints are helpful and not too revealing
- [ ] Can check student work
- [ ] Handwriting → LaTeX works

---

### Phase 5: Advanced Features (Week 9-10)

**Goal**: Professional tutoring features

**Tasks**:
1. **Multi-Page Support**
   - Tab interface for pages
   - Add/delete/reorder pages
   - Page thumbnails
   - Cross-page copy/paste

2. **Layers System**
   - Layer panel (like Photoshop)
   - Show/hide layers
   - Lock layers
   - Rename/reorder layers

3. **Import/Export**
   - Import PDF (integrate with existing PDF viewer)
   - Import images
   - Export as PDF with annotations
   - Export as PNG
   - Export as video (recording)

4. **Recording & Playback**
   - Record entire session
   - Playback with timeline
   - Jump to specific moments
   - Export recording

5. **Templates Library**
   - Pre-made math templates
   - User-saved templates
   - Template categories
   - Quick template access

**Deliverables**:
- [ ] Multi-page working
- [ ] Import PDF functional
- [ ] Export to PDF working
- [ ] Session recording/playback
- [ ] Template library

---

### Phase 6: Polish & Production (Week 11-12)

**Goal**: Expert-architect-ready code

**Tasks**:
1. **Code Quality**
   - Full TypeScript coverage
   - Comprehensive unit tests (>80% coverage)
   - E2E tests for critical paths
   - Clean code review

2. **Performance**
   - Lighthouse score > 90
   - Canvas 60fps with 1000+ elements
   - Lazy loading for AI features
   - Optimize bundle size

3. **Accessibility**
   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader support
   - High contrast mode

4. **Mobile/Tablet**
   - Touch-friendly interface
   - Responsive design
   - Apple Pencil / stylus support
   - Mobile-optimized toolbar

5. **Documentation**
   - API documentation
   - User guide for tutors
   - Student quick-start
   - Architecture decision records

**Deliverables**:
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed
- [ ] Mobile optimized
- [ ] Complete documentation

---

## 4. Key Technical Decisions

### 4.1 Real-Time: Socket.io vs Alternatives

**Decision**: Stick with Socket.io, but optimize

**Rationale**:
- Already integrated in codebase
- Free and open source
- Handles fallbacks automatically
- Good performance for 1-50 users

**Optimizations**:
- Binary serialization for canvas data (MessagePack)
- Delta compression for updates
- Room sharding for large classes

### 4.2 Canvas Library: Fabric.js

**Decision**: Fabric.js (already in PDF feature)

**Rationale**:
- Already in package.json (v7.2.0)
- Mature, well-documented
- Good performance
- Supports all needed features

### 4.3 Equation Rendering: MathJax

**Decision**: MathJax 3

**Rationale**:
- Industry standard for math on web
- Excellent LaTeX support
- Accessible (screen readers)
- Can export to SVG for canvas

### 4.4 Graphing: Plotly.js

**Decision**: Plotly.js

**Rationale**:
- Interactive by default
- Supports all math functions
- Good performance
- Free and open source

### 4.5 State Management

**Decision**: Zustand + React Context

**Structure**:
```typescript
// Global whiteboard state
const useWhiteboardStore = create<WhiteboardState>((set, get) => ({
  // Local state only - server state via sockets
  elements: [],
  selectedIds: [],
  transform: { scale: 1, offsetX: 0, offsetY: 0 },
  
  // Actions
  addElement: (el) => { /* local + emit socket */ },
  updateElement: (id, changes) => { /* local + emit socket */ },
  // ...
}))
```

---

## 5. AI Integration Details

### 5.1 Using Existing AI Orchestrator

```typescript
// lib/ai/math-tutor-prompts.ts

import { generateWithFallback } from '@/lib/ai/orchestrator'

export class MathAIHelper {
  async solveProblem(problem: string): Promise<SolutionStep[]> {
    const prompt = `Solve this math problem step by step:
${problem}

Format each step as:
Step N: [Description]
Math: [LaTeX expression]
Explanation: [Why this step]

Return as JSON array of steps.`

    const response = await generateWithFallback(prompt, {
      temperature: 0.3,
      maxTokens: 2000,
    })

    return this.parseSteps(response.content)
  }

  async generateHint(problem: string, studentWork: string): Promise<string> {
    const prompt = `You are a Socratic math tutor.

Problem: ${problem}
Student's current work: ${studentWork}

Provide a hint that guides them without giving the answer.
Use questions to prompt critical thinking.
Keep it under 100 words.`

    const response = await generateWithFallback(prompt, {
      temperature: 0.5,
      maxTokens: 300,
    })

    return response.content
  }

  async checkWork(problem: string, studentAnswer: string): Promise<WorkCheck> {
    const prompt = `Check this student's math work:

Problem: ${problem}
Student Answer: ${studentAnswer}

Analyze and return JSON:
{
  "isCorrect": boolean,
  "score": number (0-100),
  "errors": [
    {
      "location": "where the error is",
      "description": "what's wrong",
      "correction": "how to fix it"
    }
  ],
  "feedback": "encouraging feedback"
}`

    const response = await generateWithFallback(prompt, {
      temperature: 0.2,
      maxTokens: 1000,
    })

    return JSON.parse(response.content)
  }

  async recognizeHandwriting(imageDataUrl: string): Promise<string> {
    const prompt = `This is an image of handwritten math.
Convert it to LaTeX format.
Only return the LaTeX code, nothing else.`

    // Use vision-capable model if available (Kimi K2.5)
    const response = await generateWithFallback(prompt, {
      temperature: 0.2,
      maxTokens: 500,
      // Some models support image input
      imageData: imageDataUrl,
    })

    return response.content
  }
}
```

### 5.2 Caching Strategy

```typescript
// Cache AI responses to reduce costs
interface AICache {
  problemHash: string
  type: 'solve' | 'hint' | 'check'
  response: unknown
  timestamp: number
}

// Use Redis for distributed caching
const cacheKey = (type: string, input: string): string => {
  return `math_ai:${type}:${crypto.createHash('md5').update(input).digest('hex')}`
}
```

---

## 6. Testing Strategy

### 6.1 Unit Tests

```typescript
// __tests__/whiteboard/element-factory.test.ts

describe('ElementFactory', () => {
  it('creates path element with correct properties', () => {
    const element = createPathElement({
      points: [{ x: 0, y: 0 }, { x: 100, y: 100 }],
      strokeColor: '#ff0000',
    })
    
    expect(element.type).toBe('path')
    expect(element.points).toHaveLength(2)
    expect(element.id).toBeDefined()
  })
})
```

### 6.2 Integration Tests

```typescript
// __tests__/whiteboard/sync.test.ts

describe('Whiteboard Sync', () => {
  it('syncs element creation across clients', async () => {
    const tutor = await connectClient('tutor')
    const student = await connectClient('student')
    
    tutor.emit('math_wb_element_create', testElement)
    
    const received = await student.waitForEvent('math_wb_element_create')
    expect(received.id).toBe(testElement.id)
  })
})
```

### 6.3 E2E Tests (Playwright)

```typescript
// e2e/math-whiteboard.spec.ts

test('tutor can teach math lesson', async ({ page }) => {
  // Login as tutor
  await login(page, 'tutor@example.com')
  
  // Start live class
  await page.goto('/tutor/live-class')
  await page.click('button:has-text("Start Class")')
  
  // Switch to whiteboard tab
  await page.click('text=Whiteboard')
  
  // Draw equation
  await page.click('button:has-text("Equation")')
  await page.fill('[data-testid="latex-input"]', 'x^2 + y^2 = r^2')
  await page.click('button:has-text("Insert")')
  
  // Verify equation appears
  await expect(page.locator('.math-element')).toBeVisible()
})
```

---

## 7. Deployment & DevOps

### 7.1 Docker Integration

Existing Docker setup already supports this. Just ensure:

```dockerfile
# Dockerfile (no changes needed)
# Fabric.js, MathJax, Plotly all work in browser
# Socket.io server already configured
```

### 7.2 Environment Variables

```bash
# .env.local additions

# AI Configuration (use existing)
OLLAMA_URL=http://localhost:11434
KIMI_API_KEY=your_key
ZHIPU_API_KEY=your_key

# Whiteboard-specific
WHITEBOARD_MAX_ELEMENTS=1000
WHITEBOARD_SNAPSHOT_INTERVAL=30000
WHITEBOARD_AI_CACHE_TTL=3600
```

### 7.3 Database Migration

```bash
# Generate migration
npx prisma migrate dev --name add_math_whiteboard

# Deploy
npx prisma migrate deploy
```

---

## 8. Success Metrics (Revised)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Canvas Performance** | 60fps with 500 elements | Chrome DevTools |
| **Sync Latency** | < 100ms | Socket.io ping |
| **Concurrent Users** | 50 per room | Load test |
| **AI Response Time** | < 5 seconds | API timing |
| **Test Coverage** | > 80% | Jest coverage |
| **Accessibility** | WCAG 2.1 AA | axe-core audit |
| **Bundle Size** | < 500KB gzipped | webpack-bundle-analyzer |

---

## 9. Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Canvas performance with many elements | High | Virtualization, object pooling |
| AI API costs | Medium | Aggressive caching, fallbacks |
| Socket disconnections | Medium | Auto-reconnect, state recovery |
| Fabric.js learning curve | Low | Good docs, existing PDF feature |
| Browser compatibility | Medium | Feature detection, polyfills |
| Security (XSS via LaTeX) | High | Sanitize all inputs |

---

## 10. Next Steps

**Immediate Actions** (This Week):
1. ✅ Review and approve this plan
2. Create database migration
3. Set up file structure
4. Implement basic canvas component

**Week 1-2 Deliverable Preview**:
```
[Live Class Interface]
┌────────────────────────────────────────────────┐
│ Video │ Chat │ Polls │ Whiteboard [NEW] │      │
├────────────────────────────────────────────────┤
│                                                │
│  [Toolbar] Pen | Shapes | Equation | Graph    │
│                                                │
│  ┌─────────────────────────────────────────┐   │
│  │                                         │   │
│  │         [Canvas Area]                   │   │
│  │         Grid background                 │   │
│  │         Can draw here                   │   │
│  │                                         │   │
│  └─────────────────────────────────────────┘   │
│                                                │
└────────────────────────────────────────────────┘
```

---

**Ready to begin implementation?** 

I'll start with Phase 1 (Foundation) and create the database schema, Socket.io integration, and basic canvas.

Shall I proceed?
