/**
 * Math Whiteboard TypeScript Types
 * Defines all data structures for the math tutoring whiteboard
 */

// Element Types
export type MathElementType =
  | 'path'
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'line'
  | 'arrow'
  | 'text'
  | 'equation'
  | 'graph'
  | 'point'
  | 'angle'
  | 'image'

// Base element interface
export interface MathElement {
  id: string
  type: MathElementType
  authorId: string
  layer: number
  locked: boolean
  
  // Transform
  x: number
  y: number
  rotation: number
  scaleX: number
  scaleY: number
  
  // CRDT versioning
  version: number
  lastModified: number
  modifiedBy: string
}

// Specific element types
export interface PathElement extends MathElement {
  type: 'path'
  points: Array<{
    x: number
    y: number
    pressure?: number
  }>
  strokeColor: string
  strokeWidth: number
  isEraser: boolean
}

export interface RectangleElement extends MathElement {
  type: 'rectangle'
  width: number
  height: number
  fillColor?: string
  strokeColor: string
  strokeWidth: number
}

export interface CircleElement extends MathElement {
  type: 'circle'
  radius: number
  fillColor?: string
  strokeColor: string
  strokeWidth: number
}

export interface LineElement extends MathElement {
  type: 'line'
  x2: number
  y2: number
  strokeColor: string
  strokeWidth: number
  arrowStart?: boolean
  arrowEnd?: boolean
}

export interface TextElement extends MathElement {
  type: 'text'
  text: string
  fontSize: number
  fontFamily: string
  color: string
  bold?: boolean
  italic?: boolean
}

export interface EquationElement extends MathElement {
  type: 'equation'
  latex: string
  fontSize: number
  color: string
}

export interface GraphElement extends MathElement {
  type: 'graph'
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  functions: PlottedFunction[]
  showGrid: boolean
  showAxes: boolean
}

export interface ImageElement extends MathElement {
  type: 'image'
  src: string
  width: number
  height: number
}

// Union type for all elements
export type AnyMathElement =
  | PathElement
  | RectangleElement
  | CircleElement
  | LineElement
  | TextElement
  | EquationElement
  | GraphElement
  | ImageElement

// Graphing
export interface PlottedFunction {
  id: string
  expression: string
  color: string
  lineWidth: number
  lineStyle: 'solid' | 'dashed' | 'dotted'
  visible: boolean
}

// Tools
export type ToolType =
  | 'select'
  | 'hand'
  | 'pen'
  | 'eraser'
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'line'
  | 'arrow'
  | 'text'
  | 'equation'
  | 'graph'
  | 'laser'
  | 'image'

export interface ToolSettings {
  strokeColor: string
  strokeWidth: number
  fillColor?: string
  fontSize: number
  opacity: number
}

// View state
export interface ViewTransform {
  scale: number
  offsetX: number
  offsetY: number
}

// Whiteboard state
export interface MathWhiteboardState {
  sessionId: string | null
  currentPage: number
  totalPages: number
  elements: AnyMathElement[]
  selectedIds: string[]
  isLocked: boolean
  transform: ViewTransform
  activeTool: ToolType
  toolSettings: ToolSettings
}

// Participant
export interface MathWBParticipant {
  userId?: string
  name: string
  role: 'tutor' | 'student'
  color: string
  cursor?: { x: number; y: number }
  isTyping?: boolean
}

// Page
export interface MathWBPage {
  index: number
  name?: string
  backgroundType: 'white' | 'grid' | 'graph' | 'dot' | 'isometric'
  backgroundColor?: string
  elementIds?: string[]
  elements?: string[]
}

// Socket Events (Client -> Server)
export interface MathWBClientEvents {
  'math_wb_join': (data: {
    sessionId: string
    userId?: string
    name?: string
    role?: 'student' | 'tutor'
  }) => void
  
  'math_wb_leave': (sessionId: string) => void
  
  'math_wb_cursor': (data: {
    sessionId: string
    x: number
    y: number
  }) => void
  
  'math_wb_element_create': (payload: {
    sessionId: string
    element: AnyMathElement
  }) => void
  
  'math_wb_element_update': (payload: {
    sessionId: string
    elementId: string
    changes: Partial<AnyMathElement>
  }) => void
  
  'math_wb_element_delete': (payload: {
    sessionId: string
    elementId: string
  }) => void
  
  'math_wb_lock': (payload: {
    sessionId: string
    locked: boolean
  }) => void
  
  'math_wb_change_page': (payload: {
    sessionId: string
    pageIndex: number
  }) => void
  
  'math_wb_request_sync': (sessionId: string) => void
}

// Socket Events (Server -> Client)
export interface MathWBServerEvents {
  'math_wb_state': (state: {
    sessionId: string
    locked: boolean
    currentPage: number
    elements: AnyMathElement[]
    pages: MathWBPage[]
  }) => void
  
  'math_wb_presence': (data: {
    sessionId: string
    participants: MathWBParticipant[]
  }) => void
  
  'math_wb_cursor_moved': (data: {
    sessionId: string
    userId?: string
    name: string
    color: string
    x: number
    y: number
  }) => void
  
  'math_wb_element_created': (data: {
    sessionId: string
    element: AnyMathElement
    actorId?: string
  }) => void
  
  'math_wb_element_updated': (data: {
    sessionId: string
    elementId: string
    changes: Partial<AnyMathElement>
    version: number
    actorId?: string
  }) => void
  
  'math_wb_element_deleted': (data: {
    sessionId: string
    elementId: string
    actorId?: string
  }) => void
  
  'math_wb_lock_changed': (data: {
    sessionId: string
    locked: boolean
    by?: string
  }) => void
  
  'math_wb_page_changed': (data: {
    sessionId: string
    pageIndex: number
    elements: AnyMathElement[]
  }) => void
}

// AI Features
export interface MathProblem {
  id: string
  text: string
  latex?: string
  imageDataUrl?: string
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
}

export interface WorkCheckResult {
  isCorrect: boolean
  score: number
  errors: Array<{
    location: string
    description: string
    correction: string
  }>
  feedback: string
}
