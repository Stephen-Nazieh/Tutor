'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Pencil,
  Eraser,
  Undo,
  Trash2,
  Play,
  Square as StopIcon,
  Users,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  CheckCircle2,
  Minus,
  Palette,
  MousePointer2,
  Pin,
  PinOff,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
  Sparkles,
  Clock3,
  Grid3X3,
  Ban,
  Type,
  MinusCircle,
  ArrowRight,
  RectangleHorizontal,
  Circle,
  Triangle,
  PenLine,
  Highlighter,
  Dot,
  Move,
  FileUp,
  WandSparkles,
  Copy,
  BringToFront,
  SendToBack,
  Group,
  Ungroup,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Gauge
} from 'lucide-react'
import { useLiveClassWhiteboard, WhiteboardStroke } from '@/hooks/use-live-class-whiteboard'
import { cn } from '@/lib/utils'
import { CourseStructureLinkPanel } from './CourseStructureLinkPanel'
import { PDFTutoringWorkbench } from '@/components/pdf-tutoring/PDFTutoringWorkbench'
import type { VisibleDocumentPayload } from '../../dashboard/components/CourseBuilder'

type Tool =
  | 'pencil'
  | 'pen'
  | 'marker'
  | 'highlighter'
  | 'calligraphy'
  | 'eraser'
  | 'line'
  | 'arrow'
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'connector'
  | 'text'
  | 'laser'
  | 'hand'
  | 'select'

interface TutorWhiteboardManagerProps {
  roomId: string
  sessionId: string
  initialCourseId?: string | null
  classSubject?: string
  students: Array<{ id: string; name: string }>
  onDocumentVisibleToStudents?: (payload: VisibleDocumentPayload) => void
}

const COLORS = [
  '#111827', '#2563EB', '#7C3AED', '#059669', '#DC2626', '#EA580C', '#0891B2', '#CA8A04', '#6B7280'
]

const TOOL_PRESET: Record<Tool, { width: number; opacity: number; strokeType: WhiteboardStroke['type'] }> = {
  pencil: { width: 2, opacity: 0.82, strokeType: 'pencil' },
  pen: { width: 3, opacity: 1, strokeType: 'pen' },
  marker: { width: 6, opacity: 0.9, strokeType: 'marker' },
  highlighter: { width: 16, opacity: 0.22, strokeType: 'highlighter' },
  calligraphy: { width: 5, opacity: 0.95, strokeType: 'calligraphy' },
  eraser: { width: 24, opacity: 1, strokeType: 'eraser' },
  line: { width: 3, opacity: 1, strokeType: 'shape' },
  arrow: { width: 3, opacity: 1, strokeType: 'shape' },
  rectangle: { width: 3, opacity: 1, strokeType: 'shape' },
  circle: { width: 3, opacity: 1, strokeType: 'shape' },
  triangle: { width: 3, opacity: 1, strokeType: 'shape' },
  connector: { width: 3, opacity: 1, strokeType: 'shape' },
  text: { width: 3, opacity: 1, strokeType: 'text' },
  laser: { width: 3, opacity: 1, strokeType: 'pen' },
  hand: { width: 3, opacity: 1, strokeType: 'pen' },
  select: { width: 3, opacity: 1, strokeType: 'pen' },
}

const DEFAULT_PAGE_ID = 'page-1'
type DrawPoint = { x: number; y: number; pressure?: number }
type ViewportState = { scale: number; offsetX: number; offsetY: number }
type ConnectorPort = 'top' | 'right' | 'bottom' | 'left' | 'center'
type ConnectorDragState = { strokeId: string; endpoint: 'source' | 'target' } | null

export function TutorWhiteboardManager({ roomId, sessionId, initialCourseId, classSubject, students, onDocumentVisibleToStudents }: TutorWhiteboardManagerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const boardViewportRef = useRef<HTMLDivElement>(null)
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState('#111827')
  const [customColor, setCustomColor] = useState('#111827')
  const [brushSize, setBrushSize] = useState(3)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStroke, setCurrentStroke] = useState<DrawPoint[]>([])
  const [shapeStart, setShapeStart] = useState<DrawPoint | null>(null)
  const [shapePreview, setShapePreview] = useState<DrawPoint | null>(null)
  const [laserPoint, setLaserPoint] = useState<{ x: number; y: number } | null>(null)
  const [textDraft, setTextDraft] = useState<{ x: number; y: number; value: string } | null>(null)
  const [fontSize, setFontSize] = useState(22)
  const [viewport, setViewport] = useState<ViewportState>({ scale: 1, offsetX: 0, offsetY: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const panStartRef = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null)
  const [selectionRect, setSelectionRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [selectedStrokeIds, setSelectedStrokeIds] = useState<Set<string>>(new Set())
  const [selectionMode, setSelectionMode] = useState<'rect' | 'lasso'>('rect')
  const [selectionHitMode, setSelectionHitMode] = useState<'intersect' | 'contain'>('intersect')
  const [lassoPath, setLassoPath] = useState<Array<{ x: number; y: number }> | null>(null)
  const [isDraggingSelection, setIsDraggingSelection] = useState(false)
  const [activeTransformHandle, setActiveTransformHandle] = useState<'nw' | 'ne' | 'sw' | 'se' | null>(null)
  const transformRef = useRef<{ centerX: number; centerY: number; startDist: number } | null>(null)
  const [isRotatingSelection, setIsRotatingSelection] = useState(false)
  const rotateRef = useRef<{ centerX: number; centerY: number; startAngle: number } | null>(null)
  const [connectorDrag, setConnectorDrag] = useState<ConnectorDragState>(null)
  const dragStartRef = useRef<DrawPoint | null>(null)
  const selectionSnapshotRef = useRef<Map<string, DrawPoint[]>>(new Map())
  const [snapEnabled, setSnapEnabled] = useState(true)
  const [gridVisible, setGridVisible] = useState(true)
  const [gridSize, setGridSize] = useState(20)
  const [checkpointName, setCheckpointName] = useState('')
  const [namedCheckpoints, setNamedCheckpoints] = useState<Array<{ id: string; name: string; createdAt: number }>>([])
  const [importedAsset, setImportedAsset] = useState<{ kind: 'image' | 'pdf'; src: string; name: string } | null>(null)
  const [textPreset, setTextPreset] = useState<'plain' | 'latex' | 'code' | 'table' | 'sticky'>('plain')
  const [textStyle, setTextStyle] = useState<{ bold: boolean; italic: boolean; align: 'left' | 'center' | 'right' }>({
    bold: false,
    italic: false,
    align: 'left',
  })
  const [pdfPage, setPdfPage] = useState(1)
  const [showMiniMap, setShowMiniMap] = useState(true)
  const [showPerfHud, setShowPerfHud] = useState(false)
  const [fps, setFps] = useState(0)
  const [branchNameInput, setBranchNameInput] = useState('')
  const [auditTrail, setAuditTrail] = useState<Array<{ at: number; action: string; details?: string }>>([])
  const [srAnnouncement, setSrAnnouncement] = useState('')
  const [activeTab, setActiveTab] = useState('my-board')
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'submitted' | 'pending' | 'reviewed'>('all')
  const [reviewStudentId, setReviewStudentId] = useState<string | null>(null)
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false)
  const [timelinePreviewIndex, setTimelinePreviewIndex] = useState<number | null>(null)
  const [showHighContrast, setShowHighContrast] = useState(false)
  const [pages, setPages] = useState<Array<{ id: string; label: string }>>([{ id: DEFAULT_PAGE_ID, label: 'Page 1' }])
  const [activePageId, setActivePageId] = useState(DEFAULT_PAGE_ID)
  
  const {
    myStrokes,
    studentWhiteboards,
    isBroadcasting,
    viewingStudentId,
    activeStudentBoards,
    remoteCursors,
    remoteSelections,
    startBroadcast,
    stopBroadcast,
    viewStudentWhiteboard,
    stopViewingStudent,
    isLayerLocked,
    submissions,
    toggleLayerLock,
    markSubmissionReviewed,
    markAllSubmissionsReviewed,
    pinSubmission,
    clearMyWhiteboard,
    replaceMyStrokes,
    undoLastStroke,
    updateCursor,
    updateSelectionPresence,
    addTutorStroke,
    layerConfig,
    activeLayerId,
    setLayerConfig,
    setActiveLayerId,
    setLayerLock,
    moderationState,
    setDrawMuteForStudent,
    updateStrokeRateLimit,
    assignmentOverlay,
    setAssignmentOverlayMode,
    spotlight,
    updateSpotlight,
    requestAIRegionHint,
    aiRegionHints,
    snapshots,
    availableBranches,
    requestSnapshotTimeline,
    promoteBreakoutBoard,
    exportAndAttachBoard,
    createBoardBranch,
    switchBoardBranch
  } = useLiveClassWhiteboard(roomId, sessionId, 'tutor')

  const submissionByStudentId = new Map(submissions.map((submission) => [submission.studentId, submission]))
  const pendingSubmissions = submissions.filter((submission) => !submission.reviewed)
  const reviewSubmission = reviewStudentId ? submissionByStudentId.get(reviewStudentId) : undefined
  const reviewStudent = reviewStudentId ? students.find((student) => student.id === reviewStudentId) : undefined
  const reviewStudentBoard = reviewStudentId ? studentWhiteboards.get(reviewStudentId) : undefined
  const visibleStudents = students.filter((student) => {
    const submission = submissionByStudentId.get(student.id)
    if (submissionFilter === 'all') return true
    if (submissionFilter === 'submitted') return Boolean(submission)
    if (submissionFilter === 'pending') return Boolean(submission && !submission.reviewed)
    return Boolean(submission && submission.reviewed)
  })
  const timelineSource = useMemo(
    () => (timelinePreviewIndex !== null ? snapshots[timelinePreviewIndex]?.strokes || [] : myStrokes),
    [timelinePreviewIndex, snapshots, myStrokes]
  )
  const activePageStrokes = useMemo(
    () => timelineSource.filter((stroke) => (stroke.pageId || DEFAULT_PAGE_ID) === activePageId),
    [timelineSource, activePageId]
  )
  const activePageIndex = useMemo(
    () => pages.findIndex((page) => page.id === activePageId),
    [pages, activePageId]
  )

  const openReviewPanel = useCallback((studentId: string) => {
    setReviewStudentId(studentId)
    setIsReviewPanelOpen(true)
    viewStudentWhiteboard(studentId)
  }, [viewStudentWhiteboard])

  const reviewNextPending = useCallback(() => {
    if (!reviewStudentId) return
    const currentIndex = pendingSubmissions.findIndex((submission) => submission.studentId === reviewStudentId)
    const nextSubmission = pendingSubmissions[currentIndex + 1] || pendingSubmissions[0]
    if (nextSubmission) {
      setReviewStudentId(nextSubmission.studentId)
      viewStudentWhiteboard(nextSubmission.studentId)
    }
  }, [pendingSubmissions, reviewStudentId, viewStudentWhiteboard])

  const reviewPreviousPending = useCallback(() => {
    if (!reviewStudentId || pendingSubmissions.length === 0) return
    const currentIndex = pendingSubmissions.findIndex((submission) => submission.studentId === reviewStudentId)
    const previousSubmission =
      currentIndex > 0
        ? pendingSubmissions[currentIndex - 1]
        : pendingSubmissions[pendingSubmissions.length - 1]
    if (previousSubmission) {
      setReviewStudentId(previousSubmission.studentId)
      viewStudentWhiteboard(previousSubmission.studentId)
    }
  }, [pendingSubmissions, reviewStudentId, viewStudentWhiteboard])

  // Keyboard shortcuts for fast review workflow while panel is open.
  useEffect(() => {
    if (!isReviewPanelOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === 'INPUT' || (event.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return
      }

      if (event.key.toLowerCase() === 'r' && reviewSubmission && !reviewSubmission.reviewed) {
        event.preventDefault()
        markSubmissionReviewed(reviewSubmission.studentId)
      }
      if (event.key.toLowerCase() === 'j') {
        event.preventDefault()
        reviewNextPending()
      }
      if (event.key.toLowerCase() === 'k') {
        event.preventDefault()
        reviewPreviousPending()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isReviewPanelOpen, markSubmissionReviewed, reviewNextPending, reviewPreviousPending, reviewSubmission])

  const shapeTools = useMemo(() => new Set<Tool>(['line', 'arrow', 'rectangle', 'circle', 'triangle', 'connector']), [])
  const freeDrawTools = useMemo(() => new Set<Tool>(['pencil', 'pen', 'marker', 'highlighter', 'calligraphy', 'eraser']), [])

  const drawShape = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      shapeType: NonNullable<WhiteboardStroke['shapeType']>,
      from: { x: number; y: number },
      to: { x: number; y: number },
      stroke: Pick<WhiteboardStroke, 'color' | 'width' | 'opacity'>
    ) => {
      const x = Math.min(from.x, to.x)
      const y = Math.min(from.y, to.y)
      const width = Math.abs(to.x - from.x)
      const height = Math.abs(to.y - from.y)
      ctx.save()
      ctx.globalAlpha = stroke.opacity ?? 1
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.width
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      if (shapeType === 'line' || shapeType === 'arrow' || shapeType === 'connector') {
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
        if (shapeType === 'connector') {
          ctx.beginPath()
          ctx.arc(from.x, from.y, Math.max(3, stroke.width), 0, Math.PI * 2)
          ctx.arc(to.x, to.y, Math.max(3, stroke.width), 0, Math.PI * 2)
          ctx.fillStyle = stroke.color
          ctx.fill()
        }
        if (shapeType === 'arrow') {
          const angle = Math.atan2(to.y - from.y, to.x - from.x)
          const size = Math.max(10, stroke.width * 4)
          ctx.beginPath()
          ctx.moveTo(to.x, to.y)
          ctx.lineTo(to.x - size * Math.cos(angle - Math.PI / 6), to.y - size * Math.sin(angle - Math.PI / 6))
          ctx.lineTo(to.x - size * Math.cos(angle + Math.PI / 6), to.y - size * Math.sin(angle + Math.PI / 6))
          ctx.closePath()
          ctx.fillStyle = stroke.color
          ctx.fill()
        }
      } else if (shapeType === 'rectangle') {
        ctx.strokeRect(x, y, width, height)
      } else if (shapeType === 'circle') {
        ctx.beginPath()
        ctx.ellipse(x + width / 2, y + height / 2, Math.max(2, width / 2), Math.max(2, height / 2), 0, 0, Math.PI * 2)
        ctx.stroke()
      } else if (shapeType === 'triangle') {
        ctx.beginPath()
        ctx.moveTo(x + width / 2, y)
        ctx.lineTo(x + width, y + height)
        ctx.lineTo(x, y + height)
        ctx.closePath()
        ctx.stroke()
      }
      ctx.restore()
    },
    []
  )

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: WhiteboardStroke) => {
    if (stroke.type === 'text') {
      const anchor = stroke.points[0]
      if (!anchor || !stroke.text) return
      ctx.save()
      ctx.fillStyle = stroke.color
      ctx.globalAlpha = stroke.opacity ?? 1
      const textWeight = stroke.textStyle?.bold ? '700' : '400'
      const textItalic = stroke.textStyle?.italic ? 'italic' : 'normal'
      ctx.font = `${textItalic} ${textWeight} ${stroke.fontSize || fontSize}px ${stroke.fontFamily || 'ui-sans-serif, system-ui, sans-serif'}`
      ctx.textBaseline = 'top'
      ctx.textAlign = stroke.textStyle?.align || 'left'
      ctx.fillText(stroke.text, anchor.x, anchor.y)
      ctx.restore()
      return
    }

    if (stroke.type === 'shape' && stroke.shapeType && stroke.points.length >= 2) {
      if (stroke.shapeType === 'connector') {
        ctx.save()
        ctx.globalAlpha = stroke.opacity ?? 1
        ctx.strokeStyle = stroke.color
        ctx.lineWidth = stroke.width
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.beginPath()
        stroke.points.forEach((point, index) => {
          if (index === 0) ctx.moveTo(point.x, point.y)
          else ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
        const first = stroke.points[0]
        const last = stroke.points[stroke.points.length - 1]
        ctx.beginPath()
        ctx.arc(first.x, first.y, Math.max(3, stroke.width), 0, Math.PI * 2)
        ctx.arc(last.x, last.y, Math.max(3, stroke.width), 0, Math.PI * 2)
        ctx.fillStyle = stroke.color
        ctx.fill()
        ctx.restore()
        return
      }
      drawShape(ctx, stroke.shapeType, stroke.points[0], stroke.points[stroke.points.length - 1], stroke)
      return
    }

    if (stroke.points.length < 2) return
    ctx.save()
    ctx.globalAlpha = stroke.opacity ?? 1
    ctx.strokeStyle = stroke.color
    ctx.lineCap = stroke.type === 'calligraphy' ? 'square' : 'round'
    ctx.lineJoin = 'round'
    for (let i = 1; i < stroke.points.length; i += 1) {
      const prev = stroke.points[i - 1]
      const point = stroke.points[i]
      const pressure = typeof point.pressure === 'number' ? point.pressure : 0.5
      ctx.lineWidth = Math.max(1, stroke.width * (0.55 + pressure * 0.9))
      if (stroke.type === 'pencil') {
        ctx.setLineDash([1, 1.5])
      } else {
        ctx.setLineDash([])
      }
      ctx.beginPath()
      ctx.moveTo(prev.x, prev.y)
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
    }
    ctx.restore()
  }, [drawShape, fontSize])

  const getStrokeBounds = useCallback((stroke: WhiteboardStroke) => {
    if (stroke.type === 'text') {
      const anchor = stroke.points[0]
      if (!anchor) return null
      const width = Math.max(80, (stroke.text?.length || 0) * ((stroke.fontSize || fontSize) * 0.55))
      const height = (stroke.fontSize || fontSize) * 1.4
      return { x: anchor.x, y: anchor.y, width, height }
    }
    if (!stroke.points.length) return null
    const xs = stroke.points.map((point) => point.x)
    const ys = stroke.points.map((point) => point.y)
    const minX = Math.min(...xs)
    const minY = Math.min(...ys)
    const maxX = Math.max(...xs)
    const maxY = Math.max(...ys)
    const pad = Math.max(8, stroke.width)
    return { x: minX - pad, y: minY - pad, width: maxX - minX + pad * 2, height: maxY - minY + pad * 2 }
  }, [fontSize])

  const pointInPolygon = useCallback((point: { x: number; y: number }, polygon: Array<{ x: number; y: number }>) => {
    let inside = false
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x
      const yi = polygon[i].y
      const xj = polygon[j].x
      const yj = polygon[j].y
      const intersect = ((yi > point.y) !== (yj > point.y)) &&
        point.x < ((xj - xi) * (point.y - yi)) / ((yj - yi) || 1e-6) + xi
      if (intersect) inside = !inside
    }
    return inside
  }, [])

  const routeOrthogonalConnector = useCallback((from: DrawPoint, to: DrawPoint, obstacles: Array<{ x: number; y: number; width: number; height: number }>) => {
    const pad = 18
    const inflate = (b: { x: number; y: number; width: number; height: number }) => ({
      x: b.x - pad,
      y: b.y - pad,
      width: b.width + pad * 2,
      height: b.height + pad * 2,
    })
    const inflated = obstacles.map(inflate)
    const segmentHitsRect = (a: DrawPoint, b: DrawPoint, r: { x: number; y: number; width: number; height: number }) => {
      const minX = Math.min(a.x, b.x)
      const maxX = Math.max(a.x, b.x)
      const minY = Math.min(a.y, b.y)
      const maxY = Math.max(a.y, b.y)
      return maxX >= r.x && minX <= r.x + r.width && maxY >= r.y && minY <= r.y + r.height
    }
    const clearSegment = (a: DrawPoint, b: DrawPoint) => inflated.every((r) => !segmentHitsRect(a, b, r))
    const bestL = (firstHorizontal: boolean) => {
      const mid: DrawPoint = firstHorizontal ? { x: to.x, y: from.y } : { x: from.x, y: to.y }
      return [from, mid, to]
    }
    const candidates: DrawPoint[][] = [
      bestL(true),
      bestL(false),
      [from, { x: from.x, y: from.y - 80 }, { x: to.x, y: from.y - 80 }, to],
      [from, { x: from.x, y: from.y + 80 }, { x: to.x, y: from.y + 80 }, to],
      [from, { x: from.x - 80, y: from.y }, { x: from.x - 80, y: to.y }, to],
      [from, { x: from.x + 80, y: from.y }, { x: from.x + 80, y: to.y }, to],
    ]
    const pathCost = (path: DrawPoint[]) =>
      path.reduce((acc, point, i) => i === 0 ? 0 : acc + Math.abs(point.x - path[i - 1].x) + Math.abs(point.y - path[i - 1].y), 0)
    const valid = candidates
      .map((path) => ({
        path,
        ok: path.every((p, i) => i === 0 || clearSegment(path[i - 1], p)),
        cost: pathCost(path),
      }))
      .filter((p) => p.ok)
      .sort((a, b) => a.cost - b.cost)
    return (valid[0]?.path || bestL(true)).map((p) => ({ x: p.x, y: p.y }))
  }, [])

  const getPortAnchors = useCallback((bounds: { x: number; y: number; width: number; height: number }) => ({
    top: { x: bounds.x + bounds.width / 2, y: bounds.y },
    right: { x: bounds.x + bounds.width, y: bounds.y + bounds.height / 2 },
    bottom: { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height },
    left: { x: bounds.x, y: bounds.y + bounds.height / 2 },
    center: { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 },
  }), [])

  const closestPortForPoint = useCallback((point: DrawPoint, bounds: { x: number; y: number; width: number; height: number }) => {
    const anchors = getPortAnchors(bounds)
    let bestPort: ConnectorPort = 'center'
    let best = anchors.center
    let bestDist = Number.POSITIVE_INFINITY
    ;(Object.keys(anchors) as ConnectorPort[]).forEach((port) => {
      const candidate = anchors[port]
      const dx = candidate.x - point.x
      const dy = candidate.y - point.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < bestDist) {
        bestDist = dist
        bestPort = port
        best = candidate
      }
    })
    return { port: bestPort, anchor: best, distance: bestDist }
  }, [getPortAnchors])

  const resolveConnectorEndpoint = useCallback((point: DrawPoint, strokes: WhiteboardStroke[]) => {
    let best: {
      strokeId?: string
      port?: ConnectorPort
      anchor: DrawPoint
      distance: number
    } = {
      anchor: point,
      distance: Number.POSITIVE_INFINITY,
    }
    strokes
      .filter((stroke) => stroke.shapeType !== 'connector')
      .forEach((stroke) => {
        const bounds = getStrokeBounds(stroke)
        if (!bounds) return
        const candidate = closestPortForPoint(point, bounds)
        if (candidate.distance < best.distance) {
          best = {
            strokeId: stroke.id,
            port: candidate.port,
            anchor: candidate.anchor,
            distance: candidate.distance,
          }
        }
      })
    if (best.distance <= 56 && best.strokeId && best.port) {
      return {
        point: best.anchor,
        sourceStrokeId: best.strokeId,
        sourcePort: best.port,
      }
    }
    return { point }
  }, [closestPortForPoint, getStrokeBounds])

  const getSelectedBounds = useCallback((selectedIds: Set<string>) => {
    const selectedBounds = activePageStrokes
      .filter((stroke) => selectedIds.has(stroke.id))
      .map((stroke) => getStrokeBounds(stroke))
      .filter((bounds): bounds is NonNullable<ReturnType<typeof getStrokeBounds>> => Boolean(bounds))
    if (!selectedBounds.length) return null
    const minX = Math.min(...selectedBounds.map((bounds) => bounds.x))
    const minY = Math.min(...selectedBounds.map((bounds) => bounds.y))
    const maxX = Math.max(...selectedBounds.map((bounds) => bounds.x + bounds.width))
    const maxY = Math.max(...selectedBounds.map((bounds) => bounds.y + bounds.height))
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }, [activePageStrokes, getStrokeBounds])

  const nudgeSelection = useCallback((dx: number, dy: number) => {
    if (selectedStrokeIds.size === 0) return
    replaceMyStrokes((prev) =>
      prev.map((stroke) => {
        if (!selectedStrokeIds.has(stroke.id)) return stroke
        if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke
        return {
          ...stroke,
          points: stroke.points.map((point) => ({
            ...point,
            x: snapEnabled ? Math.round((point.x + dx) / gridSize) * gridSize : point.x + dx,
            y: snapEnabled ? Math.round((point.y + dy) / gridSize) * gridSize : point.y + dy,
          })),
        }
      }),
    )
  }, [activePageId, gridSize, replaceMyStrokes, selectedStrokeIds, snapEnabled])

  const scaleSelection = useCallback((factor: number) => {
    if (selectedStrokeIds.size === 0) return
    const bounds = getSelectedBounds(selectedStrokeIds)
    if (!bounds) return
    const centerX = bounds.x + bounds.width / 2
    const centerY = bounds.y + bounds.height / 2
    replaceMyStrokes((prev) =>
      prev.map((stroke) => {
        if (!selectedStrokeIds.has(stroke.id)) return stroke
        if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke
        return {
          ...stroke,
          points: stroke.points.map((point) => ({
            ...point,
            x: snapEnabled
              ? Math.round((centerX + (point.x - centerX) * factor) / gridSize) * gridSize
              : centerX + (point.x - centerX) * factor,
            y: snapEnabled
              ? Math.round((centerY + (point.y - centerY) * factor) / gridSize) * gridSize
              : centerY + (point.y - centerY) * factor,
          })),
        }
      }),
    )
  }, [activePageId, getSelectedBounds, gridSize, replaceMyStrokes, selectedStrokeIds, snapEnabled])

  const logAudit = useCallback((action: string, details?: string) => {
    const entry = { at: Date.now(), action, details }
    setAuditTrail((prev) => [entry, ...prev].slice(0, 80))
    setSrAnnouncement(`${action}${details ? `: ${details}` : ''}`)
  }, [])

  const updateSelectedStrokes = useCallback((updater: (stroke: WhiteboardStroke, index: number) => WhiteboardStroke) => {
    replaceMyStrokes((prev) => prev.map((stroke, index) => {
      if (!selectedStrokeIds.has(stroke.id)) return stroke
      if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke
      if (stroke.locked) return stroke
      return updater(stroke, index)
    }))
  }, [activePageId, replaceMyStrokes, selectedStrokeIds])

  const groupSelection = useCallback(() => {
    if (selectedStrokeIds.size < 2) return
    const gid = `group-${Date.now()}`
    updateSelectedStrokes((stroke) => ({ ...stroke, groupId: gid, updatedAt: Date.now() }))
    logAudit('Grouped selection', gid)
  }, [logAudit, selectedStrokeIds.size, updateSelectedStrokes])

  const ungroupSelection = useCallback(() => {
    if (selectedStrokeIds.size === 0) return
    updateSelectedStrokes((stroke) => ({ ...stroke, groupId: undefined, updatedAt: Date.now() }))
    logAudit('Ungrouped selection')
  }, [logAudit, selectedStrokeIds.size, updateSelectedStrokes])

  const lockSelection = useCallback((locked: boolean) => {
    updateSelectedStrokes((stroke) => ({ ...stroke, locked, updatedAt: Date.now() }))
    logAudit(locked ? 'Locked selection' : 'Unlocked selection')
  }, [logAudit, updateSelectedStrokes])

  const duplicateSelection = useCallback(() => {
    if (selectedStrokeIds.size === 0) return
    replaceMyStrokes((prev) => {
      const duplicates = prev
        .filter((stroke) => selectedStrokeIds.has(stroke.id) && (stroke.pageId || DEFAULT_PAGE_ID) === activePageId)
        .map((stroke) => ({
          ...stroke,
          id: `${stroke.id}-dup-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          points: stroke.points.map((p) => ({ ...p, x: p.x + 24, y: p.y + 24 })),
          zIndex: (stroke.zIndex || 0) + 1,
          locked: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }))
      return [...prev, ...duplicates]
    })
    logAudit('Duplicated selection')
  }, [activePageId, logAudit, replaceMyStrokes, selectedStrokeIds])

  const reorderSelection = useCallback((mode: 'front' | 'forward' | 'back') => {
    replaceMyStrokes((prev) => {
      const maxZ = Math.max(0, ...prev.map((stroke) => stroke.zIndex || 0))
      const minZ = Math.min(0, ...prev.map((stroke) => stroke.zIndex || 0))
      return prev.map((stroke) => {
        if (!selectedStrokeIds.has(stroke.id)) return stroke
        if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke
        const z = stroke.zIndex || 0
        if (mode === 'front') return { ...stroke, zIndex: maxZ + 1, updatedAt: Date.now() }
        if (mode === 'forward') return { ...stroke, zIndex: z + 1, updatedAt: Date.now() }
        return { ...stroke, zIndex: minZ - 1, updatedAt: Date.now() }
      })
    })
    logAudit('Reordered selection', mode)
  }, [activePageId, logAudit, replaceMyStrokes, selectedStrokeIds])

  const pushSelectionAsExemplar = useCallback(() => {
    if (!selectedStrokeIds.size) return
    replaceMyStrokes((prev) => {
      const maxZ = Math.max(0, ...prev.map((stroke) => stroke.zIndex || 0))
      const copies = prev
        .filter((stroke) => selectedStrokeIds.has(stroke.id))
        .map((stroke, index) => ({
          ...stroke,
          id: `${stroke.id}-exemplar-${Date.now()}-${index}`,
          layerId: 'tutor-broadcast' as const,
          zIndex: maxZ + 10 + index,
          updatedAt: Date.now(),
          createdAt: Date.now(),
        }))
      return [...prev, ...copies]
    })
    logAudit('Pushed exemplar to broadcast layer')
  }, [logAudit, replaceMyStrokes, selectedStrokeIds])

  const broadcastViewport = useCallback(() => {
    updateSpotlight({
      ...spotlight,
      enabled: true,
      x: Math.max(0, -viewport.offsetX / Math.max(0.1, viewport.scale)),
      y: Math.max(0, -viewport.offsetY / Math.max(0.1, viewport.scale)),
      width: 420 / Math.max(0.6, viewport.scale),
      height: 260 / Math.max(0.6, viewport.scale),
    })
    logAudit('Broadcasted viewport')
  }, [logAudit, spotlight, updateSpotlight, viewport.offsetX, viewport.offsetY, viewport.scale])

  const exportSvg = useCallback(() => {
    const strokes = activePageStrokes
    const width = 1600
    const height = 900
    const content = strokes.map((stroke) => {
      if (stroke.type === 'text') {
        const p = stroke.points[0]
        if (!p || !stroke.text) return ''
        return `<text x="${p.x}" y="${p.y}" fill="${stroke.color}" font-size="${stroke.fontSize || 20}">${stroke.text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`
      }
      const d = stroke.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
      return `<path d="${d}" fill="none" stroke="${stroke.color}" stroke-width="${stroke.width}" stroke-linecap="round" stroke-linejoin="round" />`
    }).join('\n')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const href = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = href
    anchor.download = `whiteboard_${roomId}_${Date.now()}.svg`
    anchor.click()
    URL.revokeObjectURL(href)
    logAudit('Exported SVG')
  }, [activePageStrokes, logAudit, roomId])

  const selectByAttribute = useCallback((attribute: 'color' | 'type' | 'layer') => {
    const seed = activePageStrokes.find((stroke) => selectedStrokeIds.has(stroke.id))
    if (!seed) return
    const selected = new Set<string>()
    activePageStrokes.forEach((stroke) => {
      if (attribute === 'color' && stroke.color === seed.color) selected.add(stroke.id)
      if (attribute === 'type' && stroke.type === seed.type) selected.add(stroke.id)
      if (attribute === 'layer' && (stroke.layerId || 'tutor-broadcast') === (seed.layerId || 'tutor-broadcast')) selected.add(stroke.id)
    })
    setSelectedStrokeIds(selected)
  }, [activePageStrokes, selectedStrokeIds])

  const selectedBounds = useMemo(() => getSelectedBounds(selectedStrokeIds), [getSelectedBounds, selectedStrokeIds])
  const activeSelectedConnector = useMemo(() => {
    if (selectedStrokeIds.size !== 1) return null
    const id = Array.from(selectedStrokeIds)[0]
    const stroke = activePageStrokes.find((item) => item.id === id)
    if (!stroke || stroke.shapeType !== 'connector' || stroke.points.length < 2) return null
    return stroke
  }, [activePageStrokes, selectedStrokeIds])

  const getConnectorScreenEndpoints = useCallback((stroke: WhiteboardStroke, strokes: WhiteboardStroke[]) => {
    let sourcePoint = stroke.points[0]
    let targetPoint = stroke.points[stroke.points.length - 1]
    if (stroke.sourceStrokeId && stroke.sourcePort) {
      const sourceStroke = strokes.find((item) => item.id === stroke.sourceStrokeId)
      const bounds = sourceStroke ? getStrokeBounds(sourceStroke) : null
      if (bounds) sourcePoint = getPortAnchors(bounds)[stroke.sourcePort]
    }
    if (stroke.targetStrokeId && stroke.targetPort) {
      const targetStroke = strokes.find((item) => item.id === stroke.targetStrokeId)
      const bounds = targetStroke ? getStrokeBounds(targetStroke) : null
      if (bounds) targetPoint = getPortAnchors(bounds)[stroke.targetPort]
    }
    return {
      source: {
        x: sourcePoint.x * viewport.scale + viewport.offsetX,
        y: sourcePoint.y * viewport.scale + viewport.offsetY,
      },
      target: {
        x: targetPoint.x * viewport.scale + viewport.offsetX,
        y: targetPoint.y * viewport.scale + viewport.offsetY,
      },
    }
  }, [getPortAnchors, getStrokeBounds, viewport.offsetX, viewport.offsetY, viewport.scale])

  const hitTestConnectorEndpointHandle = useCallback((screenX: number, screenY: number) => {
    if (!activeSelectedConnector) return null
    const endpoints = getConnectorScreenEndpoints(activeSelectedConnector, activePageStrokes)
    const radius = 10
    const sourceDist = Math.hypot(screenX - endpoints.source.x, screenY - endpoints.source.y)
    if (sourceDist <= radius) return { strokeId: activeSelectedConnector.id, endpoint: 'source' as const }
    const targetDist = Math.hypot(screenX - endpoints.target.x, screenY - endpoints.target.y)
    if (targetDist <= radius) return { strokeId: activeSelectedConnector.id, endpoint: 'target' as const }
    return null
  }, [activePageStrokes, activeSelectedConnector, getConnectorScreenEndpoints])

  useEffect(() => {
    updateSelectionPresence(Array.from(selectedStrokeIds), activePageId, '#0ea5e9')
  }, [activePageId, selectedStrokeIds, updateSelectionPresence])

  useEffect(() => {
    replaceMyStrokes((prev) => {
      const activeStrokes = prev.filter((stroke) => (stroke.pageId || DEFAULT_PAGE_ID) === activePageId)
      const byId = new Map(activeStrokes.map((stroke) => [stroke.id, stroke]))
      const obstacles = activeStrokes
        .filter((stroke) => stroke.shapeType !== 'connector')
        .map((stroke) => getStrokeBounds(stroke))
        .filter((bounds): bounds is NonNullable<ReturnType<typeof getStrokeBounds>> => Boolean(bounds))
      let changed = false
      const next: WhiteboardStroke[] = []
      prev.forEach((stroke) => {
        if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId || stroke.shapeType !== 'connector') {
          next.push(stroke)
          return
        }
        if (!stroke.sourceStrokeId || !stroke.targetStrokeId || !stroke.sourcePort || !stroke.targetPort) {
          next.push(stroke)
          return
        }
        const source = byId.get(stroke.sourceStrokeId)
        const target = byId.get(stroke.targetStrokeId)
        if (!source || !target) {
          changed = true
          return
        }
        const sourceBounds = getStrokeBounds(source)
        const targetBounds = getStrokeBounds(target)
        if (!sourceBounds || !targetBounds) {
          next.push(stroke)
          return
        }
        const from = getPortAnchors(sourceBounds)[stroke.sourcePort]
        const to = getPortAnchors(targetBounds)[stroke.targetPort]
        const rerouted = routeOrthogonalConnector(from, to, obstacles)
        const same =
          stroke.points.length === rerouted.length &&
          stroke.points.every((point, index) => {
            const nextPoint = rerouted[index]
            return Math.abs(point.x - nextPoint.x) < 0.5 && Math.abs(point.y - nextPoint.y) < 0.5
          })
        if (same) {
          next.push(stroke)
          return
        }
        changed = true
        next.push({
          ...stroke,
          points: rerouted,
          updatedAt: Date.now(),
        })
      })
      return changed ? next : prev
    })
  }, [activePageId, activePageStrokes, getPortAnchors, getStrokeBounds, replaceMyStrokes, routeOrthogonalConnector])

  const hitTestSelectionHandle = useCallback((screenX: number, screenY: number) => {
    if (!selectedBounds) return null
    const corners: Array<{ id: 'nw' | 'ne' | 'sw' | 'se'; x: number; y: number }> = [
      { id: 'nw', x: selectedBounds.x, y: selectedBounds.y },
      { id: 'ne', x: selectedBounds.x + selectedBounds.width, y: selectedBounds.y },
      { id: 'sw', x: selectedBounds.x, y: selectedBounds.y + selectedBounds.height },
      { id: 'se', x: selectedBounds.x + selectedBounds.width, y: selectedBounds.y + selectedBounds.height },
    ]
    const radius = 10
    for (const corner of corners) {
      const screen = {
        x: corner.x * viewport.scale + viewport.offsetX,
        y: corner.y * viewport.scale + viewport.offsetY,
      }
      const dx = screenX - screen.x
      const dy = screenY - screen.y
      if (Math.sqrt(dx * dx + dy * dy) <= radius) return corner.id
    }
    const rotateScreen = {
      x: (selectedBounds.x + selectedBounds.width / 2) * viewport.scale + viewport.offsetX,
      y: (selectedBounds.y - 36) * viewport.scale + viewport.offsetY,
    }
    const rdx = screenX - rotateScreen.x
    const rdy = screenY - rotateScreen.y
    if (Math.sqrt(rdx * rdx + rdy * rdy) <= 11) return 'rotate'
    return null
  }, [selectedBounds, viewport.offsetX, viewport.offsetY, viewport.scale])

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    
    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (gridVisible) {
      ctx.save()
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      ctx.restore()
    }

    ctx.save()
    ctx.translate(viewport.offsetX, viewport.offsetY)
    ctx.scale(viewport.scale, viewport.scale)

    const visibleLayerIds = new Set(layerConfig.filter((layer) => layer.visible).map((layer) => layer.id))
    const worldViewport = {
      left: (-viewport.offsetX) / viewport.scale,
      top: (-viewport.offsetY) / viewport.scale,
      right: (canvas.width - viewport.offsetX) / viewport.scale,
      bottom: (canvas.height - viewport.offsetY) / viewport.scale,
    }
    const isBoundsVisible = (bounds: { x: number; y: number; width: number; height: number } | null) => {
      if (!bounds) return true
      return (
        bounds.x <= worldViewport.right &&
        bounds.x + bounds.width >= worldViewport.left &&
        bounds.y <= worldViewport.bottom &&
        bounds.y + bounds.height >= worldViewport.top
      )
    }
    const orderedStrokes = [...activePageStrokes].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
    orderedStrokes.forEach(stroke => {
      const strokeLayer = stroke.layerId || 'tutor-broadcast'
      const bounds = getStrokeBounds(stroke)
      if (!isBoundsVisible(bounds)) return
      if (visibleLayerIds.has(strokeLayer)) {
        drawStroke(ctx, stroke)
        if (stroke.locked) {
          if (bounds) {
            ctx.save()
            ctx.strokeStyle = 'rgba(220, 38, 38, 0.7)'
            ctx.setLineDash([4, 4])
            ctx.lineWidth = 1
            ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height)
            ctx.restore()
          }
        }
        if (selectedStrokeIds.has(stroke.id)) {
          if (bounds) {
            ctx.save()
            ctx.strokeStyle = '#2563eb'
            ctx.setLineDash([6, 4])
            ctx.lineWidth = 1.5 / Math.max(0.4, viewport.scale)
            ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height)
            ctx.restore()
          }
        }
      }
    })
    remoteSelections.forEach((presence) => {
      if (presence.pageId && presence.pageId !== activePageId) return
      presence.strokeIds.forEach((id) => {
        const stroke = activePageStrokes.find((entry) => entry.id === id)
        if (!stroke) return
        const bounds = getStrokeBounds(stroke)
        if (!bounds || !isBoundsVisible(bounds)) return
        ctx.save()
        ctx.strokeStyle = presence.color || '#f59e0b'
        ctx.setLineDash([4, 4])
        ctx.lineWidth = 1.25 / Math.max(0.4, viewport.scale)
        ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height)
        ctx.restore()
      })
    })

    if (isDrawing && currentStroke.length > 1 && freeDrawTools.has(tool)) {
      const previewStroke: WhiteboardStroke = {
        id: 'preview',
        points: currentStroke,
        color: tool === 'eraser' ? '#ffffff' : color,
        width: tool === 'eraser' ? TOOL_PRESET.eraser.width : brushSize,
        opacity: TOOL_PRESET[tool].opacity,
        type: TOOL_PRESET[tool].strokeType,
        userId: 'preview',
      }
      drawStroke(ctx, previewStroke)
    }

    if (shapeStart && shapePreview && shapeTools.has(tool)) {
      const preset = TOOL_PRESET[tool]
      drawShape(ctx, tool as NonNullable<WhiteboardStroke['shapeType']>, shapeStart, shapePreview, {
        color,
        width: Math.max(1, brushSize),
        opacity: preset.opacity,
      })
    }

    if (laserPoint) {
      ctx.save()
      ctx.globalAlpha = 0.9
      const gradient = ctx.createRadialGradient(laserPoint.x, laserPoint.y, 1, laserPoint.x, laserPoint.y, 28)
      gradient.addColorStop(0, 'rgba(239,68,68,0.95)')
      gradient.addColorStop(1, 'rgba(239,68,68,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(laserPoint.x, laserPoint.y, 28, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
    ctx.restore()

    if (selectionRect) {
      ctx.save()
      ctx.strokeStyle = '#2563eb'
      ctx.fillStyle = 'rgba(37, 99, 235, 0.08)'
      ctx.setLineDash([6, 3])
      const x = Math.min(selectionRect.x, selectionRect.x + selectionRect.width)
      const y = Math.min(selectionRect.y, selectionRect.y + selectionRect.height)
      const width = Math.abs(selectionRect.width)
      const height = Math.abs(selectionRect.height)
      ctx.strokeRect(x, y, width, height)
      ctx.fillRect(x, y, width, height)
      ctx.restore()
    }
    if (lassoPath && lassoPath.length > 1) {
      ctx.save()
      ctx.strokeStyle = '#2563eb'
      ctx.fillStyle = 'rgba(37, 99, 235, 0.08)'
      ctx.setLineDash([6, 3])
      ctx.beginPath()
      lassoPath.forEach((point, index) => {
        const screen = {
          x: point.x * viewport.scale + viewport.offsetX,
          y: point.y * viewport.scale + viewport.offsetY,
        }
        if (index === 0) ctx.moveTo(screen.x, screen.y)
        else ctx.lineTo(screen.x, screen.y)
      })
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
      ctx.restore()
    }
    if (selectedBounds) {
      const corners: Array<{ x: number; y: number }> = [
        { x: selectedBounds.x, y: selectedBounds.y },
        { x: selectedBounds.x + selectedBounds.width, y: selectedBounds.y },
        { x: selectedBounds.x, y: selectedBounds.y + selectedBounds.height },
        { x: selectedBounds.x + selectedBounds.width, y: selectedBounds.y + selectedBounds.height },
      ]
      ctx.save()
      ctx.fillStyle = '#2563eb'
      corners.forEach((corner) => {
        const screenX = corner.x * viewport.scale + viewport.offsetX
        const screenY = corner.y * viewport.scale + viewport.offsetY
        ctx.beginPath()
        ctx.arc(screenX, screenY, 5, 0, Math.PI * 2)
        ctx.fill()
      })
      const centerX = (selectedBounds.x + selectedBounds.width / 2) * viewport.scale + viewport.offsetX
      const topY = selectedBounds.y * viewport.scale + viewport.offsetY
      const rotateY = (selectedBounds.y - 36) * viewport.scale + viewport.offsetY
      ctx.strokeStyle = '#2563eb'
      ctx.beginPath()
      ctx.moveTo(centerX, topY)
      ctx.lineTo(centerX, rotateY + 8)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(centerX, rotateY, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#0ea5e9'
      ctx.fill()
      ctx.restore()
    }
    if (activeSelectedConnector) {
      const endpoints = getConnectorScreenEndpoints(activeSelectedConnector, activePageStrokes)
      ctx.save()
      ctx.fillStyle = '#0ea5e9'
      ctx.strokeStyle = '#0369a1'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(endpoints.source.x, endpoints.source.y, 7, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#22c55e'
      ctx.strokeStyle = '#15803d'
      ctx.beginPath()
      ctx.arc(endpoints.target.x, endpoints.target.y, 7, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }
  }, [activePageId, activePageStrokes, activeSelectedConnector, brushSize, color, currentStroke, drawShape, drawStroke, freeDrawTools, getConnectorScreenEndpoints, getStrokeBounds, gridSize, gridVisible, isDrawing, lassoPath, laserPoint, layerConfig, remoteSelections, selectedBounds, selectedStrokeIds, selectionRect, shapePreview, shapeStart, shapeTools, tool, viewport.offsetX, viewport.offsetY, viewport.scale])
  
  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
      redrawCanvas()
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [redrawCanvas])
  
  // Redraw canvas when strokes change
  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])
  
  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>): DrawPoint => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const screenX = e.clientX - rect.left
    const screenY = e.clientY - rect.top
    return {
      x: (screenX - viewport.offsetX) / viewport.scale,
      y: (screenY - viewport.offsetY) / viewport.scale,
      pressure: e.pointerType === 'mouse' ? 0.5 : (e.pressure || 0.5),
    }
  }

  const pointerToScreen = useCallback((point: DrawPoint) => ({
    x: point.x * viewport.scale + viewport.offsetX,
    y: point.y * viewport.scale + viewport.offsetY,
  }), [viewport.offsetX, viewport.offsetY, viewport.scale])

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const target = e.currentTarget
    target.setPointerCapture(e.pointerId)
    const point = getCanvasPoint(e)
    const screenPoint = pointerToScreen(point)
    if (tool === 'hand') {
      setIsPanning(true)
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        offsetX: viewport.offsetX,
        offsetY: viewport.offsetY,
      }
      return
    }
    if (tool === 'select') {
      const connectorHandle = hitTestConnectorEndpointHandle(screenPoint.x, screenPoint.y)
      if (connectorHandle) {
        setConnectorDrag(connectorHandle)
        return
      }
      if (e.altKey) {
        const hitStroke = [...activePageStrokes].reverse().find((stroke) => {
          const bounds = getStrokeBounds(stroke)
          if (!bounds) return false
          return point.x >= bounds.x && point.x <= bounds.x + bounds.width && point.y >= bounds.y && point.y <= bounds.y + bounds.height
        })
        if (hitStroke) {
          setSelectedStrokeIds((prev) => {
            const next = new Set(prev)
            if (next.has(hitStroke.id)) next.delete(hitStroke.id)
            else next.add(hitStroke.id)
            return next
          })
        }
        return
      }
      const handle = hitTestSelectionHandle(screenPoint.x, screenPoint.y)
      if (handle) {
        if (selectedBounds) {
          const centerX = selectedBounds.x + selectedBounds.width / 2
          const centerY = selectedBounds.y + selectedBounds.height / 2
          selectionSnapshotRef.current = new Map(
            activePageStrokes
              .filter((stroke) => selectedStrokeIds.has(stroke.id))
              .map((stroke) => [stroke.id, stroke.points.map((p) => ({ ...p }))]),
          )
          if (handle === 'rotate') {
            rotateRef.current = { centerX, centerY, startAngle: Math.atan2(point.y - centerY, point.x - centerX) }
            setIsRotatingSelection(true)
          } else {
            const startDist = Math.max(1, Math.hypot(point.x - centerX, point.y - centerY))
            transformRef.current = { centerX, centerY, startDist }
            setActiveTransformHandle(handle)
          }
          return
        }
      }
      const hitSelectedStroke = activePageStrokes.some((stroke) => {
        if (!selectedStrokeIds.has(stroke.id)) return false
        const bounds = getStrokeBounds(stroke)
        if (!bounds) return false
        return (
          point.x >= bounds.x &&
          point.x <= bounds.x + bounds.width &&
          point.y >= bounds.y &&
          point.y <= bounds.y + bounds.height
        )
      })
      if (hitSelectedStroke) {
        const snapshot = new Map<string, DrawPoint[]>()
        activePageStrokes.forEach((stroke) => {
          if (!selectedStrokeIds.has(stroke.id)) return
          snapshot.set(stroke.id, stroke.points.map((p) => ({ ...p })))
        })
        selectionSnapshotRef.current = snapshot
        dragStartRef.current = point
        setIsDraggingSelection(true)
      } else if (selectionMode === 'lasso') {
        setLassoPath([point])
        setSelectionRect(null)
      } else {
        setSelectionRect({ x: screenPoint.x, y: screenPoint.y, width: 0, height: 0 })
        setLassoPath(null)
      }
      return
    }
    if (tool === 'text') {
      setTextDraft({ x: point.x, y: point.y, value: '' })
      return
    }
    if (tool === 'laser') {
      setLaserPoint(point)
      updateCursor(point.x, point.y, 'laser')
      return
    }
    if (shapeTools.has(tool)) {
      setIsDrawing(true)
      setShapeStart(point)
      setShapePreview(point)
      return
    }
    if (!freeDrawTools.has(tool)) return
    setIsDrawing(true)
    setCurrentStroke([point])
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isPanning && panStartRef.current) {
      const deltaX = e.clientX - panStartRef.current.x
      const deltaY = e.clientY - panStartRef.current.y
      setViewport((prev) => ({
        ...prev,
        offsetX: panStartRef.current!.offsetX + deltaX,
        offsetY: panStartRef.current!.offsetY + deltaY,
      }))
      return
    }
    const point = getCanvasPoint(e)
    updateCursor(point.x, point.y, tool === 'laser' ? 'laser' : 'cursor')
    if (connectorDrag) {
      replaceMyStrokes((prev) => {
        const pageStrokes = prev.filter((stroke) => (stroke.pageId || DEFAULT_PAGE_ID) === activePageId)
        const obstacles = pageStrokes
          .filter((stroke) => stroke.shapeType !== 'connector')
          .map((stroke) => getStrokeBounds(stroke))
          .filter((bounds): bounds is NonNullable<ReturnType<typeof getStrokeBounds>> => Boolean(bounds))
        const peers = pageStrokes.filter((stroke) => stroke.id !== connectorDrag.strokeId)
        return prev.map((stroke) => {
          if (stroke.id !== connectorDrag.strokeId || stroke.shapeType !== 'connector') return stroke
          const resolved = resolveConnectorEndpoint(point, peers)
          const from = connectorDrag.endpoint === 'source' ? resolved.point : stroke.points[0]
          const to = connectorDrag.endpoint === 'target' ? resolved.point : stroke.points[stroke.points.length - 1]
          return {
            ...stroke,
            points: routeOrthogonalConnector(from, to, obstacles),
            sourceStrokeId: connectorDrag.endpoint === 'source' ? resolved.sourceStrokeId : stroke.sourceStrokeId,
            sourcePort: connectorDrag.endpoint === 'source' ? resolved.sourcePort : stroke.sourcePort,
            targetStrokeId: connectorDrag.endpoint === 'target' ? resolved.sourceStrokeId : stroke.targetStrokeId,
            targetPort: connectorDrag.endpoint === 'target' ? resolved.sourcePort : stroke.targetPort,
            updatedAt: Date.now(),
          }
        })
      })
      return
    }
    if (isRotatingSelection && rotateRef.current) {
      const { centerX, centerY, startAngle } = rotateRef.current
      const currentAngle = Math.atan2(point.y - centerY, point.x - centerX)
      const delta = currentAngle - startAngle
      replaceMyStrokes((prev) =>
        prev.map((stroke) => {
          if (!selectedStrokeIds.has(stroke.id)) return stroke
          if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke
          const base = selectionSnapshotRef.current.get(stroke.id)
          if (!base) return stroke
          return {
            ...stroke,
            rotation: ((stroke.rotation || 0) + (delta * 180) / Math.PI) % 360,
            updatedAt: Date.now(),
            points: base.map((p) => {
              const dx = p.x - centerX
              const dy = p.y - centerY
              return {
                ...p,
                x: centerX + dx * Math.cos(delta) - dy * Math.sin(delta),
                y: centerY + dx * Math.sin(delta) + dy * Math.cos(delta),
              }
            }),
          }
        }),
      )
      return
    }
    if (activeTransformHandle && transformRef.current) {
      const { centerX, centerY, startDist } = transformRef.current
      const currentDist = Math.max(1, Math.hypot(point.x - centerX, point.y - centerY))
      const factor = currentDist / startDist
      replaceMyStrokes((prev) =>
        prev.map((stroke) => {
          if (!selectedStrokeIds.has(stroke.id)) return stroke
          if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke
          const base = selectionSnapshotRef.current.get(stroke.id)
          if (!base) return stroke
          return {
            ...stroke,
            points: base.map((p) => ({
              ...p,
              x: snapEnabled
                ? Math.round((centerX + (p.x - centerX) * factor) / gridSize) * gridSize
                : centerX + (p.x - centerX) * factor,
              y: snapEnabled
                ? Math.round((centerY + (p.y - centerY) * factor) / gridSize) * gridSize
                : centerY + (p.y - centerY) * factor,
            })),
          }
        }),
      )
      return
    }
    if (isDraggingSelection && dragStartRef.current) {
      const dx = point.x - dragStartRef.current.x
      const dy = point.y - dragStartRef.current.y
      replaceMyStrokes((prev) =>
        prev.map((stroke) => {
          if (!selectedStrokeIds.has(stroke.id)) return stroke
          if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke
          const base = selectionSnapshotRef.current.get(stroke.id)
          if (!base) return stroke
          return {
            ...stroke,
            points: base.map((p) => ({
              ...p,
              x: snapEnabled ? Math.round((p.x + dx) / gridSize) * gridSize : p.x + dx,
              y: snapEnabled ? Math.round((p.y + dy) / gridSize) * gridSize : p.y + dy,
            })),
          }
        }),
      )
      return
    }
    if (selectionRect) {
      const screen = pointerToScreen(point)
      setSelectionRect((prev) => prev ? { ...prev, width: screen.x - prev.x, height: screen.y - prev.y } : prev)
      return
    }
    if (lassoPath) {
      setLassoPath((prev) => (prev ? [...prev, point] : prev))
      return
    }
    if (tool === 'laser') {
      setLaserPoint(point)
      return
    }
    if (!isDrawing) return
    if (shapeTools.has(tool)) {
      setShapePreview(point)
      return
    }
    setCurrentStroke((prev) => {
      const last = prev[prev.length - 1]
      if (last) {
        const dx = point.x - last.x
        const dy = point.y - last.y
        if (dx * dx + dy * dy < 0.7) return prev
      }
      return [...prev, point]
    })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    if (isPanning) {
      setIsPanning(false)
      panStartRef.current = null
      return
    }
    if (connectorDrag) {
      setConnectorDrag(null)
      return
    }
    if (selectionRect) {
      const x = Math.min(selectionRect.x, selectionRect.x + selectionRect.width)
      const y = Math.min(selectionRect.y, selectionRect.y + selectionRect.height)
      const width = Math.abs(selectionRect.width)
      const height = Math.abs(selectionRect.height)
      const selected = new Set<string>()
      activePageStrokes.forEach((stroke) => {
        const bounds = getStrokeBounds(stroke)
        if (!bounds) return
        const topLeft = pointerToScreen({ x: bounds.x, y: bounds.y })
        const bottomRight = pointerToScreen({ x: bounds.x + bounds.width, y: bounds.y + bounds.height })
        const intersects = topLeft.x < x + width && bottomRight.x > x && topLeft.y < y + height && bottomRight.y > y
        const contains = topLeft.x >= x && bottomRight.x <= x + width && topLeft.y >= y && bottomRight.y <= y + height
        if ((selectionHitMode === 'intersect' && intersects) || (selectionHitMode === 'contain' && contains)) {
          selected.add(stroke.id)
        }
      })
      setSelectedStrokeIds(selected)
      setSelectionRect(null)
      return
    }
    if (lassoPath && lassoPath.length > 2) {
      const selected = new Set<string>()
      activePageStrokes.forEach((stroke) => {
        const strokePoints = stroke.points
        if (strokePoints.some((p) => pointInPolygon({ x: p.x, y: p.y }, lassoPath))) {
          selected.add(stroke.id)
        }
      })
      setSelectedStrokeIds(selected)
      setLassoPath(null)
      return
    }
    if (isRotatingSelection) {
      setIsRotatingSelection(false)
      rotateRef.current = null
      selectionSnapshotRef.current.clear()
      logAudit('Rotated selection')
      return
    }
    if (activeTransformHandle) {
      setActiveTransformHandle(null)
      transformRef.current = null
      selectionSnapshotRef.current.clear()
      logAudit('Scaled selection')
      return
    }
    if (isDraggingSelection) {
      setIsDraggingSelection(false)
      dragStartRef.current = null
      selectionSnapshotRef.current.clear()
      logAudit('Moved selection')
      return
    }
    if (tool === 'laser') {
      setLaserPoint(null)
      return
    }
    if (!isDrawing) return

    if (shapeTools.has(tool) && shapeStart && shapePreview) {
      const preset = TOOL_PRESET[tool]
      const fromResolved = tool === 'connector' ? resolveConnectorEndpoint(shapeStart, activePageStrokes) : { point: shapeStart }
      const toResolved = tool === 'connector' ? resolveConnectorEndpoint(shapePreview, activePageStrokes) : { point: shapePreview }
      const fromPoint = fromResolved.point
      const toPoint = toResolved.point
      const connectorPoints = tool === 'connector'
        ? routeOrthogonalConnector(
            fromPoint,
            toPoint,
            activePageStrokes
              .filter((stroke) => stroke.shapeType !== 'connector')
              .map((stroke) => getStrokeBounds(stroke))
              .filter((bounds): bounds is NonNullable<ReturnType<typeof getStrokeBounds>> => Boolean(bounds)),
          )
        : [fromPoint, toPoint]
      const stroke: WhiteboardStroke = {
        id: Date.now().toString(),
        points: connectorPoints,
        color,
        width: Math.max(1, brushSize),
        opacity: preset.opacity,
        shapeType: tool as NonNullable<WhiteboardStroke['shapeType']>,
        type: 'shape',
        userId: 'tutor',
        pageId: activePageId,
        zIndex: Math.max(0, ...activePageStrokes.map((s) => s.zIndex || 0)) + 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        sourceStrokeId: tool === 'connector' ? fromResolved.sourceStrokeId : undefined,
        targetStrokeId: tool === 'connector' ? toResolved.sourceStrokeId : undefined,
        sourcePort: tool === 'connector' ? fromResolved.sourcePort : undefined,
        targetPort: tool === 'connector' ? toResolved.sourcePort : undefined,
      }
      addTutorStroke(stroke)
      if (tool === 'connector') logAudit('Added orthogonal connector')
      setShapeStart(null)
      setShapePreview(null)
      setIsDrawing(false)
      return
    }

    if (currentStroke.length === 0) {
      setIsDrawing(false)
      return
    }

    const preset = TOOL_PRESET[tool]
    const stroke: WhiteboardStroke = {
      id: Date.now().toString(),
      points: currentStroke,
      color: tool === 'eraser' ? '#ffffff' : color,
      width: tool === 'eraser' ? preset.width : brushSize,
      opacity: preset.opacity,
      type: preset.strokeType,
      userId: 'tutor',
      pageId: activePageId,
      zIndex: Math.max(0, ...activePageStrokes.map((s) => s.zIndex || 0)) + 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    addTutorStroke(stroke)
    setIsDrawing(false)
    setCurrentStroke([])
  }

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92
    const nextScale = Math.min(3, Math.max(0.35, viewport.scale * zoomFactor))
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const cursorX = e.clientX - rect.left
    const cursorY = e.clientY - rect.top
    const worldX = (cursorX - viewport.offsetX) / viewport.scale
    const worldY = (cursorY - viewport.offsetY) / viewport.scale
    setViewport({
      scale: nextScale,
      offsetX: cursorX - worldX * nextScale,
      offsetY: cursorY - worldY * nextScale,
    })
  }, [viewport.offsetX, viewport.offsetY, viewport.scale])
  
  useEffect(() => {
    requestSnapshotTimeline()
  }, [requestSnapshotTimeline])

  const exportCurrentBoard = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    const fileName = `whiteboard_${roomId}_${Date.now()}.png`
    exportAndAttachBoard({
      format: 'png',
      fileName,
      dataUrl,
      studentId: reviewStudentId || undefined,
    })
  }

  const exportSelection = useCallback(() => {
    if (!selectedBounds || !canvasRef.current) return
    const canvas = canvasRef.current
    const temp = document.createElement('canvas')
    const startX = Math.round(selectedBounds.x * viewport.scale + viewport.offsetX)
    const startY = Math.round(selectedBounds.y * viewport.scale + viewport.offsetY)
    const width = Math.max(1, Math.round(selectedBounds.width * viewport.scale))
    const height = Math.max(1, Math.round(selectedBounds.height * viewport.scale))
    temp.width = width
    temp.height = height
    const tctx = temp.getContext('2d')
    if (!tctx) return
    tctx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height)
    exportAndAttachBoard({
      format: 'png',
      fileName: `whiteboard_selection_${roomId}_${Date.now()}.png`,
      dataUrl: temp.toDataURL('image/png'),
      studentId: reviewStudentId || undefined,
    })
  }, [exportAndAttachBoard, reviewStudentId, roomId, selectedBounds, viewport.offsetX, viewport.offsetY, viewport.scale])

  const addPage = useCallback(() => {
    setPages((prev) => {
      const nextPageNumber = prev.length + 1
      const nextPageId = `page-${nextPageNumber}`
      const next = [...prev, { id: nextPageId, label: `Page ${nextPageNumber}` }]
      setActivePageId(nextPageId)
      return next
    })
  }, [])

  const goToPage = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = pages.findIndex((page) => page.id === activePageId)
    if (currentIndex < 0) return
    if (direction === 'prev' && currentIndex > 0) {
      setActivePageId(pages[currentIndex - 1].id)
    }
    if (direction === 'next' && currentIndex < pages.length - 1) {
      setActivePageId(pages[currentIndex + 1].id)
    }
  }, [activePageId, pages])

  useEffect(() => {
    const preset = TOOL_PRESET[tool]
    if (!preset) return
    if (tool === 'eraser' || tool === 'highlighter' || tool === 'marker' || tool === 'calligraphy' || tool === 'pencil' || tool === 'pen') {
      setBrushSize(preset.width)
    }
  }, [tool])

  useEffect(() => {
    return () => {
      if (importedAsset?.src) URL.revokeObjectURL(importedAsset.src)
    }
  }, [importedAsset])

  const commitTextDraft = useCallback(() => {
    if (!textDraft || !textDraft.value.trim()) {
      setTextDraft(null)
      return
    }
    const value = textDraft.value.trim()
    const formattedText =
      textPreset === 'latex' ? `$$${value}$$` :
      textPreset === 'code' ? `\`\`\`\n${value}\n\`\`\`` :
      textPreset === 'table' ? `| Column A | Column B |\n|---|---|\n| ${value} |  |` :
      value
    const stroke: WhiteboardStroke = {
      id: Date.now().toString(),
      points: [{ x: textDraft.x, y: textDraft.y }],
      color,
      width: 1,
      opacity: 1,
      type: 'text',
      text: formattedText,
      fontSize,
      fontFamily: textPreset === 'sticky' ? 'Caveat, ui-sans-serif, system-ui, sans-serif' : 'Inter, Segoe UI, system-ui, sans-serif',
      textStyle,
      userId: 'tutor',
      pageId: activePageId,
      zIndex: Math.max(0, ...activePageStrokes.map((s) => s.zIndex || 0)) + 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    addTutorStroke(stroke)
    setTextDraft(null)
    logAudit('Added text', textPreset)
  }, [activePageId, activePageStrokes, addTutorStroke, color, fontSize, logAudit, textDraft, textPreset, textStyle])

  const saveNamedCheckpoint = useCallback(() => {
    const name = checkpointName.trim() || `Checkpoint ${new Date().toLocaleTimeString()}`
    setNamedCheckpoints((prev) => [{ id: `${Date.now()}`, name, createdAt: Date.now() }, ...prev].slice(0, 30))
    requestSnapshotTimeline()
    logAudit('Saved checkpoint', name)
    setCheckpointName('')
  }, [checkpointName, logAudit, requestSnapshotTimeline])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === 'INPUT' || (event.target as HTMLElement)?.tagName === 'TEXTAREA') return
      const step = event.shiftKey ? 20 : 6
      const key = event.key.toLowerCase()
      if (key === 'v') setTool('select')
      if (key === 'p') setTool('pen')
      if (key === 'e') setTool('eraser')
      if (key === 't') setTool('text')
      if (key === 'h') setTool('hand')
      if (selectedStrokeIds.size > 0) {
        if (event.key === 'ArrowUp') { event.preventDefault(); nudgeSelection(0, -step) }
        if (event.key === 'ArrowDown') { event.preventDefault(); nudgeSelection(0, step) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); nudgeSelection(-step, 0) }
        if (event.key === 'ArrowRight') { event.preventDefault(); nudgeSelection(step, 0) }
        if (event.key === '+') { event.preventDefault(); scaleSelection(1.08) }
        if (event.key === '-') { event.preventDefault(); scaleSelection(0.92) }
      }
      if ((event.metaKey || event.ctrlKey) && key === 'z') {
        event.preventDefault()
        undoLastStroke(activePageId)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePageId, nudgeSelection, scaleSelection, selectedStrokeIds.size, undoLastStroke])

  useEffect(() => {
    let rafId = 0
    let lastTs = performance.now()
    let frameCount = 0
    const tick = (ts: number) => {
      frameCount += 1
      if (ts - lastTs >= 1000) {
        setFps(Math.round((frameCount * 1000) / (ts - lastTs)))
        frameCount = 0
        lastTs = ts
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    if (!srAnnouncement) return
    const timer = window.setTimeout(() => setSrAnnouncement(''), 1200)
    return () => window.clearTimeout(timer)
  }, [srAnnouncement])

  const cursorColorForId = useCallback((userId: string) => {
    const palette = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2', '#ca8a04']
    let hash = 0
    for (let i = 0; i < userId.length; i += 1) hash = (hash * 31 + userId.charCodeAt(i)) | 0
    return palette[Math.abs(hash) % palette.length]
  }, [])

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          <span className="font-medium">Whiteboard</span>
          {isBroadcasting && (
            <Badge variant="destructive" className="animate-pulse">
              <Play className="w-3 h-3 mr-1" />
              Broadcasting
            </Badge>
          )}
          {viewingStudentId && (
            <Badge variant="secondary">
              <Eye className="w-3 h-3 mr-1" />
              Viewing Student
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={isLayerLocked ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => toggleLayerLock(!isLayerLocked)}
          >
            {isLayerLocked ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Unlock Student Layers
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4 mr-2" />
                Lock Student Layers
              </>
            )}
          </Button>
          {isBroadcasting ? (
            <Button variant="destructive" size="sm" onClick={stopBroadcast}>
              <StopIcon className="w-4 h-4 mr-2" />
              Stop Broadcast
            </Button>
          ) : (
            <Button variant="default" size="sm" onClick={startBroadcast}>
              <Play className="w-4 h-4 mr-2" />
              Broadcast
            </Button>
          )}
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="space-y-2 border-b bg-slate-50/95 px-4 py-2 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
            {[
              { id: 'pencil', icon: Pencil, label: 'Pencil' },
              { id: 'pen', icon: PenLine, label: 'Pen' },
              { id: 'marker', icon: Dot, label: 'Marker' },
              { id: 'highlighter', icon: Highlighter, label: 'Highlighter' },
              { id: 'calligraphy', icon: MinusCircle, label: 'Calligraphy' },
              { id: 'eraser', icon: Eraser, label: 'Eraser' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTool(id as Tool)}
                className={cn(
                  "rounded-md px-2 py-1.5 transition-colors",
                  tool === id ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                )}
                title={label}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
            {[
              { id: 'line', icon: Minus, label: 'Line' },
              { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
              { id: 'rectangle', icon: RectangleHorizontal, label: 'Rectangle' },
              { id: 'circle', icon: Circle, label: 'Circle' },
              { id: 'triangle', icon: Triangle, label: 'Triangle' },
              { id: 'connector', icon: Link2, label: 'Connector' },
              { id: 'text', icon: Type, label: 'Text' },
              { id: 'laser', icon: Ban, label: 'Laser Pointer' },
              { id: 'select', icon: MousePointer2, label: 'Select' },
              { id: 'hand', icon: Move, label: 'Pan' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTool(id as Tool)}
                className={cn(
                  "rounded-md px-2 py-1.5 transition-colors",
                  tool === id ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                )}
                title={label}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "h-6 w-6 rounded-full border transition-all",
                  color === c ? 'scale-110 border-slate-600' : 'border-transparent'
                )}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
            <input
              type="color"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value)
                setColor(e.target.value)
              }}
              className="h-6 w-8 cursor-pointer rounded border bg-transparent p-0"
              title="Custom color"
            />
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm">
            <span className="text-xs text-slate-500">Stroke</span>
            <Slider
              value={[brushSize]}
              onValueChange={([value]) => setBrushSize(value)}
              min={1}
              max={32}
              step={1}
              className="w-24"
            />
            <span className="w-7 text-xs font-medium text-slate-600">{brushSize}</span>
          </div>

          {tool === 'text' && (
            <div className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm">
              <span className="text-xs text-slate-500">Font</span>
              <Slider
                value={[fontSize]}
                onValueChange={([value]) => setFontSize(value)}
                min={14}
                max={56}
                step={1}
                className="w-24"
              />
              <span className="w-7 text-xs font-medium text-slate-600">{fontSize}</span>
            </div>
          )}
          {tool === 'text' && (
            <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
              {(['plain', 'latex', 'code', 'table', 'sticky'] as const).map((preset) => (
                <Button
                  key={preset}
                  variant={textPreset === preset ? 'default' : 'ghost'}
                  size="sm"
                  className="h-7 px-2 text-xs capitalize"
                  title={`Text preset: ${preset}`}
                  aria-label={`Text preset: ${preset}`}
                  onClick={() => setTextPreset(preset)}
                >
                  {preset}
                </Button>
              ))}
            </div>
          )}
          {tool === 'text' && (
            <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
              <Button size="sm" variant={textStyle.bold ? 'default' : 'ghost'} className="h-7 px-2 text-xs" title="Bold text" onClick={() => setTextStyle((prev) => ({ ...prev, bold: !prev.bold }))}>B</Button>
              <Button size="sm" variant={textStyle.italic ? 'default' : 'ghost'} className="h-7 px-2 text-xs italic" title="Italic text" onClick={() => setTextStyle((prev) => ({ ...prev, italic: !prev.italic }))}>I</Button>
              <Button size="sm" variant={textStyle.align === 'left' ? 'default' : 'ghost'} className="h-7 px-2 text-xs" title="Align left" onClick={() => setTextStyle((prev) => ({ ...prev, align: 'left' }))}><AlignLeft className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant={textStyle.align === 'center' ? 'default' : 'ghost'} className="h-7 px-2 text-xs" title="Align center" onClick={() => setTextStyle((prev) => ({ ...prev, align: 'center' }))}><AlignCenter className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant={textStyle.align === 'right' ? 'default' : 'ghost'} className="h-7 px-2 text-xs" title="Align right" onClick={() => setTextStyle((prev) => ({ ...prev, align: 'right' }))}><AlignRight className="h-3.5 w-3.5" /></Button>
            </div>
          )}
          {tool === 'select' && (
            <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
              <Button
                variant={selectionMode === 'rect' ? 'default' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                title="Selection mode: rectangle"
                onClick={() => setSelectionMode('rect')}
              >
                Rect
              </Button>
              <Button
                variant={selectionMode === 'lasso' ? 'default' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                title="Selection mode: lasso"
                onClick={() => setSelectionMode('lasso')}
              >
                Lasso
              </Button>
              <Button
                variant={selectionHitMode === 'intersect' ? 'default' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                title="Select items that intersect selection area"
                onClick={() => setSelectionHitMode('intersect')}
              >
                Intersect
              </Button>
              <Button
                variant={selectionHitMode === 'contain' ? 'default' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                title="Select only items fully contained in selection area"
                onClick={() => setSelectionHitMode('contain')}
              >
                Contain
              </Button>
            </div>
          )}
          {selectedStrokeIds.size > 0 && (
            <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Nudge selection up" onClick={() => nudgeSelection(0, -10)}>
                Up
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Nudge selection left" onClick={() => nudgeSelection(-10, 0)}>
                Left
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Nudge selection right" onClick={() => nudgeSelection(10, 0)}>
                Right
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Nudge selection down" onClick={() => nudgeSelection(0, 10)}>
                Down
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Scale selected items down" onClick={() => scaleSelection(0.9)}>
                Scale -
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Scale selected items up" onClick={() => scaleSelection(1.1)}>
                Scale +
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Select all with same color" onClick={() => selectByAttribute('color')}>
                Same Color
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Select all with same stroke type" onClick={() => selectByAttribute('type')}>
                Same Type
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Select all in same layer" onClick={() => selectByAttribute('layer')}>
                Same Layer
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Duplicate selection" onClick={duplicateSelection}>
                <Copy className="mr-1 h-3.5 w-3.5" /> Dup
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Group selected objects" onClick={groupSelection}>
                <Group className="mr-1 h-3.5 w-3.5" /> Group
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Ungroup selected objects" onClick={ungroupSelection}>
                <Ungroup className="mr-1 h-3.5 w-3.5" /> Ungroup
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Bring selected to front" onClick={() => reorderSelection('front')}>
                <BringToFront className="mr-1 h-3.5 w-3.5" /> Front
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Bring selected forward" onClick={() => reorderSelection('forward')}>
                <ArrowRight className="mr-1 h-3.5 w-3.5" /> Forward
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Send selected to back" onClick={() => reorderSelection('back')}>
                <SendToBack className="mr-1 h-3.5 w-3.5" /> Back
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Lock selected objects" onClick={() => lockSelection(true)}>
                Lock
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Unlock selected objects" onClick={() => lockSelection(false)}>
                Unlock
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Push selection as class exemplar" onClick={pushSelectionAsExemplar}>
                Exemplar
              </Button>
            </div>
          )}
          <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
            <input
              value={branchNameInput}
              onChange={(e) => setBranchNameInput(e.target.value)}
              placeholder="Branch name"
              className="h-7 w-28 rounded border px-2 text-xs"
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => {
                if (!branchNameInput.trim()) return
                createBoardBranch(branchNameInput)
                setBranchNameInput('')
              }}
              title="Create board branch"
            >
              Branch
            </Button>
            {availableBranches.length > 0 && (
              <select
                className="h-7 rounded border px-2 text-xs"
                onChange={(e) => e.target.value && switchBoardBranch(e.target.value)}
                defaultValue=""
                aria-label="Switch board branch"
              >
                <option value="" disabled>Switch branch</option>
                {availableBranches.map((branch) => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            )}
          </div>

          <div className="ml-auto flex items-center gap-1 rounded-md border bg-white px-1 py-1 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => goToPage('prev')}
              disabled={activePageIndex <= 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="min-w-[72px] text-center text-xs font-medium">
              {pages.find((page) => page.id === activePageId)?.label || 'Page'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => goToPage('next')}
              disabled={activePageIndex >= pages.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={addPage}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => undoLastStroke(activePageId)}>
            <Undo className="mr-1 h-4 w-4" /> Undo
          </Button>
          <Button variant="outline" size="sm" onClick={() => clearMyWhiteboard(activePageId)}>
            <Trash2 className="mr-1 h-4 w-4" /> Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHighContrast((prev) => !prev)}
          >
            {showHighContrast ? 'Standard' : 'High Contrast'}
          </Button>
          <Button variant={snapEnabled ? 'default' : 'outline'} size="sm" title="Toggle snap-to-grid" onClick={() => setSnapEnabled((prev) => !prev)}>
            Snap
          </Button>
          <Button variant={gridVisible ? 'default' : 'outline'} size="sm" title="Show or hide grid" onClick={() => setGridVisible((prev) => !prev)}>
            Grid
          </Button>
          <div className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm">
            <span className="text-xs text-slate-500">Grid</span>
            <Slider value={[gridSize]} onValueChange={([value]) => setGridSize(value)} min={8} max={64} step={2} className="w-20" />
            <span className="w-7 text-xs font-medium text-slate-600">{gridSize}</span>
          </div>
          <label className="inline-flex">
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (!file) return
                const src = URL.createObjectURL(file)
                setImportedAsset({ kind: file.type.includes('pdf') ? 'pdf' : 'image', src, name: file.name })
                setPdfPage(1)
                logAudit('Imported asset', file.name)
                event.currentTarget.value = ''
              }}
            />
            <span className="inline-flex h-9 cursor-pointer items-center rounded-md border px-3 text-sm">
              <FileUp className="mr-1 h-4 w-4" /> Import
            </span>
          </label>
          <Button variant="outline" size="sm" title="Export full whiteboard page" onClick={exportCurrentBoard}>
            <Download className="mr-1 h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm" title="Export as SVG vectors" onClick={exportSvg}>
            <Download className="mr-1 h-4 w-4" /> SVG
          </Button>
          <Button variant="outline" size="sm" title="Export current selection" onClick={exportSelection} disabled={!selectedBounds}>
            <Download className="mr-1 h-4 w-4" /> Export Sel
          </Button>
          <Button variant="outline" size="sm" title="Broadcast current viewport focus to class" onClick={broadcastViewport}>
            Broadcast View
          </Button>
          <Button variant={showMiniMap ? 'default' : 'outline'} size="sm" title="Toggle collaboration minimap" onClick={() => setShowMiniMap((prev) => !prev)}>
            Minimap
          </Button>
          <Button variant={showPerfHud ? 'default' : 'outline'} size="sm" title="Toggle performance HUD" onClick={() => setShowPerfHud((prev) => !prev)}>
            <Gauge className="mr-1 h-4 w-4" /> Perf
          </Button>
          <div className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm">
            <input
              value={checkpointName}
              onChange={(event) => setCheckpointName(event.target.value)}
              placeholder="Checkpoint"
              className="h-7 w-28 rounded border px-2 text-xs"
            />
            <Button size="sm" variant="outline" className="h-7 text-xs" title="Save named checkpoint" onClick={saveNamedCheckpoint}>
              <WandSparkles className="mr-1 h-3.5 w-3.5" /> Save
            </Button>
          </div>
          <Badge variant="outline" className="text-xs">
            {Math.round(viewport.scale * 100)}%
          </Badge>
          {selectedStrokeIds.size > 0 && (
            <Badge variant="secondary" className="text-xs">
              {selectedStrokeIds.size} selected
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            CP {namedCheckpoints.length}
          </Badge>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 relative">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="absolute top-2 left-2 z-10">
              <TabsTrigger value="my-board">My Board</TabsTrigger>
              <TabsTrigger value="student-boards">
                <Users className="w-4 h-4 mr-2" />
                Students ({activeStudentBoards.length})
              </TabsTrigger>
              <TabsTrigger value="pdf-board">PDF Tutoring</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-board" className="h-full m-0">
              <div className="h-full p-4">
                <div ref={boardViewportRef} className={cn("relative w-full h-full", showHighContrast && "contrast-125 saturate-150")}>
                  <div className="absolute left-2 top-14 z-20">
                    <CourseStructureLinkPanel
                      initialCourseId={initialCourseId}
                      classSubject={classSubject}
                      onMakeVisibleToStudents={onDocumentVisibleToStudents}
                    />
                  </div>
                  <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    onWheel={handleWheel}
                    className={cn(
                      "w-full h-full border rounded-lg bg-white",
                      (freeDrawTools.has(tool) || shapeTools.has(tool) || tool === 'text') && "cursor-crosshair",
                      tool === 'laser' && "cursor-none",
                      tool === 'hand' && "cursor-grab",
                      tool === 'select' && "cursor-default"
                    )}
                    aria-label="Tutor whiteboard canvas"
                  />
                  {importedAsset?.kind === 'image' && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={importedAsset.src}
                      alt={importedAsset.name}
                      className="pointer-events-none absolute inset-0 h-full w-full rounded-lg object-contain opacity-30"
                    />
                  )}
                  {importedAsset?.kind === 'pdf' && (
                    <>
                      <iframe
                        src={`${importedAsset.src}#page=${pdfPage}`}
                        title={importedAsset.name}
                        className="pointer-events-none absolute inset-0 h-full w-full rounded-lg opacity-25"
                      />
                      <div className="absolute right-3 top-16 z-30 flex items-center gap-1 rounded-md bg-white/90 p-1">
                        <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setPdfPage((prev) => Math.max(1, prev - 1))}>
                          Prev
                        </Button>
                        <span className="text-xs font-medium">PDF p.{pdfPage}</span>
                        <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setPdfPage((prev) => prev + 1)}>
                          Next
                        </Button>
                      </div>
                    </>
                  )}
                  {textDraft && (
                    <div
                      className="absolute z-30"
                      style={{ left: textDraft.x, top: textDraft.y }}
                    >
                      <div className="w-80 rounded-md border border-slate-300 bg-white/95 p-2 shadow-lg">
                        <textarea
                          autoFocus
                          value={textDraft.value}
                          rows={4}
                          onChange={(event) => setTextDraft((prev) => prev ? { ...prev, value: event.target.value } : prev)}
                          onKeyDown={(event) => {
                            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                              event.preventDefault()
                              commitTextDraft()
                            }
                            if (event.key === 'Escape') {
                              event.preventDefault()
                              setTextDraft(null)
                            }
                          }}
                          placeholder="Type here... (Cmd/Ctrl + Enter to place)"
                          className="w-full resize-none rounded-md border border-slate-200 bg-white p-2 text-sm outline-none ring-offset-2 focus:ring-2"
                        />
                        <div className="mt-2 flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => setTextDraft(null)}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={commitTextDraft}>
                            Place
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {Array.from(remoteCursors.values()).map((cursor) => (
                    <div
                      key={cursor.userId}
                      className="absolute pointer-events-none z-10"
                      style={{ left: cursor.x, top: cursor.y, transform: 'translate(-50%, -50%)' }}
                    >
                      {cursor.pointerMode === 'laser' ? (
                        <div className="h-10 w-10 rounded-full bg-red-500/30 ring-2 ring-red-500/60 blur-[1px]" />
                      ) : (
                        <div
                          className="h-2.5 w-2.5 rounded-full border border-white shadow"
                          style={{ backgroundColor: cursorColorForId(cursor.userId) }}
                        />
                      )}
                      <div
                        className="mt-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] text-white"
                        style={{ backgroundColor: cursorColorForId(cursor.userId) }}
                      >
                        {cursor.name} {Date.now() - cursor.lastUpdated > 2000 ? '(idle)' : ''}
                      </div>
                    </div>
                  ))}
                  {spotlight.enabled && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-black/35" />
                      <div
                        className={cn(
                          "absolute border-2 border-yellow-300 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]",
                          spotlight.mode === 'pen' ? 'rounded-full' : 'rounded-md'
                        )}
                        style={{
                          left: spotlight.x,
                          top: spotlight.y,
                          width: spotlight.width,
                          height: spotlight.height,
                        }}
                      />
                    </div>
                  )}
                  {showMiniMap && (
                    <div className="absolute bottom-3 right-3 z-30 h-28 w-44 rounded-md border bg-white/90 p-2">
                      <div className="mb-1 text-[10px] font-semibold uppercase text-slate-500">Presence Minimap</div>
                      <div className="relative h-[88px] w-full overflow-hidden rounded bg-slate-100">
                        <div
                          className="absolute border border-blue-500/70 bg-blue-200/20"
                          style={{
                            left: `${Math.max(0, Math.min(92, (-viewport.offsetX / 1600) * 100))}%`,
                            top: `${Math.max(0, Math.min(92, (-viewport.offsetY / 900) * 100))}%`,
                            width: `${Math.max(8, Math.min(100, (420 / Math.max(0.4, viewport.scale)) / 16))}%`,
                            height: `${Math.max(8, Math.min(100, (240 / Math.max(0.4, viewport.scale)) / 9))}%`,
                          }}
                        />
                        {Array.from(remoteCursors.values()).map((cursor) => (
                          <div
                            key={`mini-${cursor.userId}`}
                            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
                            style={{
                              left: `${Math.max(0, Math.min(100, (cursor.x / 1600) * 100))}%`,
                              top: `${Math.max(0, Math.min(100, (cursor.y / 900) * 100))}%`,
                              backgroundColor: cursorColorForId(cursor.userId),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {showPerfHud && (
                    <div className="absolute bottom-3 left-3 z-30 rounded-md border bg-white/90 px-2 py-1 text-xs">
                      FPS {fps} | Strokes {activePageStrokes.length} | Cursors {remoteCursors.size}
                    </div>
                  )}
                  <div className="sr-only" aria-live="polite">{srAnnouncement}</div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
                  <div className="rounded-md border p-2">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Grid3X3 className="w-4 h-4" />
                      Layer Model
                    </div>
                    <div className="space-y-2">
                      {layerConfig.map((layer) => (
                        <div key={layer.id} className="flex items-center justify-between gap-2 text-xs">
                          <button
                            className={cn(
                              "rounded border px-2 py-1",
                              activeLayerId === layer.id ? 'bg-blue-100 border-blue-400' : 'bg-white'
                            )}
                            onClick={() => setActiveLayerId(layer.id)}
                          >
                            {layer.label}
                          </button>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant={layer.visible ? 'default' : 'outline'}
                              className="h-6 px-2 text-[11px]"
                              onClick={() =>
                                setLayerConfig(layerConfig.map((item) =>
                                  item.id === layer.id ? { ...item, visible: !item.visible } : item
                                ))
                              }
                            >
                              {layer.visible ? 'Visible' : 'Hidden'}
                            </Button>
                            <Button
                              size="sm"
                              variant={layer.locked ? 'destructive' : 'outline'}
                              className="h-6 px-2 text-[11px]"
                              onClick={() => setLayerLock(layer.id, !layer.locked)}
                            >
                              {layer.locked ? 'Locked' : 'Unlocked'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md border p-2">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Sparkles className="w-4 h-4" />
                      Spotlight + AI
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={spotlight.enabled ? 'default' : 'outline'}
                        onClick={() =>
                          updateSpotlight({ ...spotlight, enabled: !spotlight.enabled })
                        }
                      >
                        {spotlight.enabled ? 'Disable Spotlight' : 'Enable Spotlight'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateSpotlight({
                            ...spotlight,
                            mode: spotlight.mode === 'rectangle' ? 'pen' : 'rectangle',
                            width: spotlight.mode === 'rectangle' ? 160 : 420,
                            height: spotlight.mode === 'rectangle' ? 160 : 220,
                          })
                        }
                      >
                        Spotlight Pen Mode
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          requestAIRegionHint({
                            x: spotlight.x,
                            y: spotlight.y,
                            width: spotlight.width,
                            height: spotlight.height,
                          }, 'Tutor review request')
                        }
                      >
                        AI Region Hint
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setAssignmentOverlayMode('none')}>
                        Template: None
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setAssignmentOverlayMode('graph-paper')}>
                        Template: Graph
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setAssignmentOverlayMode('coordinate-plane')}>
                        Template: Coordinate
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-2">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Clock3 className="w-4 h-4" />
                      Timeline + Export
                    </div>
                    <div className="space-y-2 text-xs">
                      <p>{snapshots.length} snapshots in timeline</p>
                      <p className="text-[11px] text-gray-500">
                        Delta vs live: {Math.max(0, myStrokes.length - (timelinePreviewIndex !== null ? (snapshots[timelinePreviewIndex]?.strokes.length || 0) : myStrokes.length))} stroke(s)
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Active page strokes: {activePageStrokes.length}
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={Math.max(0, snapshots.length - 1)}
                          value={timelinePreviewIndex ?? 0}
                          onChange={(e) => setTimelinePreviewIndex(Number(e.target.value))}
                          disabled={snapshots.length === 0}
                          className="w-full"
                        />
                        <Button size="sm" variant="ghost" onClick={() => setTimelinePreviewIndex(null)}>
                          Live
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={requestSnapshotTimeline}>
                          Refresh Timeline
                        </Button>
                        <Button size="sm" onClick={exportCurrentBoard}>
                          <Download className="w-3.5 h-3.5 mr-1" />
                          Export Attach
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-2">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Clock3 className="w-4 h-4" />
                      Audit Trail
                    </div>
                    <div className="max-h-24 space-y-1 overflow-auto text-[11px]">
                      {auditTrail.length === 0 ? (
                        <p className="text-slate-500">No actions yet.</p>
                      ) : (
                        auditTrail.map((entry) => (
                          <div key={`${entry.at}-${entry.action}`} className="rounded border px-2 py-1">
                            <p className="font-medium">{entry.action}</p>
                            {entry.details ? <p className="text-slate-500">{entry.details}</p> : null}
                            <p className="text-[10px] text-slate-400">{new Date(entry.at).toLocaleTimeString()}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="student-boards" className="h-full m-0">
              <ScrollArea className="h-full p-4 space-y-4">
                {submissions.length > 0 && (
                  <div className="mb-4 border rounded-lg p-3 bg-amber-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">Submission Queue</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{pendingSubmissions.length} pending</Badge>
                        {pendingSubmissions.length > 1 && (
                          <Button size="sm" variant="outline" onClick={markAllSubmissionsReviewed}>
                            Mark All Reviewed
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {submissions.map((submission) => (
                        <div key={submission.studentId} className="flex items-center justify-between rounded-md border bg-white px-2 py-1.5">
                          <div>
                            <p className="text-sm font-medium">{submission.studentName}</p>
                            <p className="text-xs text-gray-500">
                              {submission.strokeCount} strokes • {new Date(submission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm" onClick={() => viewStudentWhiteboard(submission.studentId)}>
                              View
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => openReviewPanel(submission.studentId)}>
                              Review
                            </Button>
                            <Button
                              variant={submission.pinned ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => pinSubmission(submission.studentId, !submission.pinned)}
                            >
                              {submission.pinned ? <PinOff className="w-3.5 h-3.5 mr-1" /> : <Pin className="w-3.5 h-3.5 mr-1" />}
                              {submission.pinned ? 'Unpin' : 'Pin'}
                            </Button>
                            {!submission.reviewed ? (
                              <Button size="sm" onClick={() => markSubmissionReviewed(submission.studentId)}>
                                Mark Reviewed
                              </Button>
                            ) : (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Reviewed
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Student Boards</h4>
                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    <Button
                      size="sm"
                      variant={submissionFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => setSubmissionFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      size="sm"
                      variant={submissionFilter === 'submitted' ? 'default' : 'outline'}
                      onClick={() => setSubmissionFilter('submitted')}
                    >
                      Submitted Only
                    </Button>
                    <Button
                      size="sm"
                      variant={submissionFilter === 'pending' ? 'default' : 'outline'}
                      onClick={() => setSubmissionFilter('pending')}
                    >
                      Pending
                    </Button>
                    <Button
                      size="sm"
                      variant={submissionFilter === 'reviewed' ? 'default' : 'outline'}
                      onClick={() => setSubmissionFilter('reviewed')}
                    >
                      Reviewed
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {visibleStudents.map(student => {
                    const wb = studentWhiteboards.get(student.id)
                    const isViewing = viewingStudentId === student.id
                    const submission = submissionByStudentId.get(student.id)
                    
                    return (
                      <div
                        key={student.id}
                        className={cn(
                          "border rounded-lg p-3 cursor-pointer transition-all",
                          isViewing ? 'ring-2 ring-blue-500' : 'hover:border-blue-300',
                          wb?.visibility === 'private' && "opacity-50"
                        )}
                        onClick={() => {
                          if (wb && wb.visibility !== 'private') {
                            viewStudentWhiteboard(student.id)
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{student.name}</span>
                          <div className="flex items-center gap-1">
                            {submission && (
                              <Badge className={cn(
                                "text-xs",
                                submission.reviewed
                                  ? 'bg-green-100 text-green-700 border-green-200'
                                  : 'bg-amber-100 text-amber-700 border-amber-200'
                              )}>
                                {submission.reviewed ? 'Reviewed' : 'Submitted'}
                              </Badge>
                            )}
                            {wb && (
                              <Badge variant={wb.visibility === 'public' ? 'default' : 'secondary'} className="text-xs">
                                {wb.visibility === 'public' ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                                {wb.visibility}
                              </Badge>
                            )}
                            {!wb && (
                              <Badge variant="outline" className="text-xs">No activity</Badge>
                            )}
                            <Button
                              size="sm"
                              variant={moderationState.mutedStudentIds.includes(student.id) ? 'destructive' : 'outline'}
                              className="h-6 px-2 text-[11px]"
                              onClick={(e) => {
                                e.stopPropagation()
                                setDrawMuteForStudent(student.id, !moderationState.mutedStudentIds.includes(student.id))
                              }}
                            >
                              <Ban className="w-3 h-3 mr-1" />
                              {moderationState.mutedStudentIds.includes(student.id) ? 'Muted' : 'Mute'}
                            </Button>
                          </div>
                        </div>
                        
                        {/* Mini preview */}
                        <div className="h-24 bg-gray-50 rounded border flex items-center justify-center">
                          {wb && wb.strokes.length > 0 ? (
                            <MiniCanvas strokes={wb.strokes} />
                          ) : (
                            <span className="text-xs text-gray-400">Empty</span>
                          )}
                        </div>
                        
                        {isViewing && (
                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                stopViewingStudent()
                              }}
                            >
                              Stop Viewing
                            </Button>
                            {submission && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openReviewPanel(student.id)
                                }}
                              >
                                Open Review
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {visibleStudents.length === 0 && (
                    <div className="col-span-3 border rounded-lg p-6 text-center text-sm text-gray-500">
                      No submitted boards yet.
                    </div>
                  )}
                </div>
                <div className="mt-4 rounded-md border p-3 bg-muted/20">
                  <h4 className="text-sm font-semibold mb-2">Moderation + Overlay + Breakout Sync</h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="space-y-2 text-xs">
                      <p className="font-medium">Anti-spam stroke throttle</p>
                      <Slider
                        value={[moderationState.studentStrokeWindowLimit]}
                        onValueChange={([value]) => updateStrokeRateLimit(value)}
                        min={20}
                        max={200}
                        step={5}
                      />
                      <p>{moderationState.studentStrokeWindowLimit} strokes / 5s</p>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p className="font-medium">Assignment overlay</p>
                      <div className="flex flex-wrap gap-1">
                        {(['none', 'graph-paper', 'geometry-grid', 'coordinate-plane', 'chemistry-structure'] as const).map((overlay) => (
                          <Button
                            key={overlay}
                            size="sm"
                            variant={assignmentOverlay === overlay ? 'default' : 'outline'}
                            className="h-6 px-2 text-[11px]"
                            onClick={() => setAssignmentOverlayMode(overlay)}
                          >
                            {overlay}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p className="font-medium">Breakout board sync</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => promoteBreakoutBoard('breakout-demo', activePageStrokes)}
                      >
                        Promote Best Board to Main Room
                      </Button>
                    </div>
                  </div>
                  {aiRegionHints.length > 0 && (
                    <div className="mt-3 rounded border bg-white p-2">
                      <p className="text-xs font-semibold mb-1">AI Board Insight</p>
                      <p className="text-xs text-gray-700">{aiRegionHints[0].hint}</p>
                      <p className="text-[11px] text-amber-700 mt-1">{aiRegionHints[0].misconception}</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="pdf-board" className="h-full m-0">
              <div className="h-full overflow-auto p-4">
                <PDFTutoringWorkbench roomId={`${roomId}:pdf`} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog
        open={isReviewPanelOpen}
        onOpenChange={(open) => {
          setIsReviewPanelOpen(open)
          if (!open) setReviewStudentId(null)
        }}
      >
        <DialogContent className="max-w-5xl max-h-[88vh] overflow-hidden p-0">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Tutor Review Panel</DialogTitle>
            <DialogDescription>
              Review submitted student work against your board and close feedback loops quickly.
              Shortcuts: `J` next, `K` previous, `R` mark reviewed.
            </DialogDescription>
          </DialogHeader>

          {!reviewStudentId || !reviewStudent ? (
            <div className="m-6 rounded-md border p-6 text-sm text-gray-500">
              Pick a student submission to begin review.
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/40 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{reviewStudent.name}</span>
                  {reviewSubmission ? (
                    <Badge className={cn(
                      reviewSubmission.reviewed
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-amber-100 text-amber-700 border-amber-200'
                    )}>
                      {reviewSubmission.reviewed ? 'Reviewed' : 'Pending review'}
                    </Badge>
                  ) : (
                    <Badge variant="outline">No submission metadata</Badge>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {reviewSubmission
                    ? `${reviewSubmission.strokeCount} strokes • ${new Date(reviewSubmission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : 'No timestamp available'}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Student Board</h4>
                    <Badge variant="secondary">{reviewStudentBoard?.strokes.length ?? 0} strokes</Badge>
                  </div>
                  <ReviewCanvas strokes={reviewStudentBoard?.strokes ?? []} />
                </div>
                <div className="rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Tutor Board Reference</h4>
                    <Badge variant="secondary">{myStrokes.length} strokes</Badge>
                  </div>
                  <ReviewCanvas strokes={activePageStrokes} />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="border-t px-6 py-4">
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={reviewPreviousPending}
                  disabled={pendingSubmissions.length === 0}
                >
                  Previous Pending (K)
                </Button>
                <Button
                  variant="secondary"
                  onClick={reviewNextPending}
                  disabled={pendingSubmissions.length === 0}
                >
                  Next Pending (J)
                </Button>
              </div>
              <div className="flex items-center gap-2">
                {reviewStudentId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      viewStudentWhiteboard(reviewStudentId)
                      setActiveTab('student-boards')
                      setIsReviewPanelOpen(false)
                    }}
                  >
                    Jump to Live Board
                  </Button>
                )}
                {reviewSubmission && !reviewSubmission.reviewed && (
                  <Button
                    onClick={() => markSubmissionReviewed(reviewSubmission.studentId)}
                  >
                    Mark Reviewed (R)
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Mini canvas for student preview
function MiniCanvas({ strokes }: { strokes: WhiteboardStroke[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    
    // Clear
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw strokes (scaled down)
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return
      
      ctx.beginPath()
      ctx.moveTo(stroke.points[0].x / 4, stroke.points[0].y / 4)
      stroke.points.forEach((point, i) => {
        if (i > 0) ctx.lineTo(point.x / 4, point.y / 4)
      })
      
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = Math.max(1, stroke.width / 4)
      ctx.lineCap = 'round'
      ctx.stroke()
    })
  }, [strokes])
  
  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={100}
      className="w-full h-full"
    />
  )
}

function ReviewCanvas({ strokes }: { strokes: WhiteboardStroke[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (strokes.length === 0) return

    // Fit all points into the panel while preserving their shape.
    const allPoints = strokes.flatMap((stroke) => stroke.points)
    if (allPoints.length === 0) return

    const minX = Math.min(...allPoints.map((p) => p.x))
    const minY = Math.min(...allPoints.map((p) => p.y))
    const maxX = Math.max(...allPoints.map((p) => p.x))
    const maxY = Math.max(...allPoints.map((p) => p.y))
    const width = Math.max(1, maxX - minX)
    const height = Math.max(1, maxY - minY)

    const padding = 16
    const scaleX = (canvas.width - padding * 2) / width
    const scaleY = (canvas.height - padding * 2) / height
    const scale = Math.max(0.2, Math.min(scaleX, scaleY))

    const offsetX = (canvas.width - width * scale) / 2 - minX * scale
    const offsetY = (canvas.height - height * scale) / 2 - minY * scale

    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return

      ctx.beginPath()
      ctx.moveTo(stroke.points[0].x * scale + offsetX, stroke.points[0].y * scale + offsetY)
      stroke.points.forEach((point, i) => {
        if (i > 0) ctx.lineTo(point.x * scale + offsetX, point.y * scale + offsetY)
      })

      ctx.strokeStyle = stroke.color
      ctx.lineWidth = Math.max(1, stroke.width * scale * 0.6)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    })
  }, [strokes])

  return (
    <div className="h-64 w-full rounded-md border bg-white">
      <canvas
        ref={canvasRef}
        width={600}
        height={320}
        className="h-full w-full"
      />
    </div>
  )
}
