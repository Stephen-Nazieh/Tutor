'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import {
  Pencil,
  Eraser,
  EyeOff,
  UserCheck,
  Users,
  Trash2,
  Undo,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  Palette,
  Type,
  Minus,
  ArrowRight,
  RectangleHorizontal,
  Circle,
  Triangle,
  PenLine,
  Highlighter,
  Dot,
  Move,
  MousePointer2
} from 'lucide-react'
import { useLiveClassWhiteboard, WhiteboardStroke } from '@/hooks/use-live-class-whiteboard'
import { cn } from '@/lib/utils'
import type { LiveSharedDocument } from '@/app/[locale]/tutor/live-class/components/LiveSharedDocumentModal'

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

interface StudentLiveWhiteboardProps {
  roomId: string
  sessionId: string
  mode?: 'floating' | 'embedded'
  visibleTaskShares?: LiveSharedDocument[]
  onOpenTask?: (shareId: string) => void
}

const COLORS = ['#111827', '#2563EB', '#7C3AED', '#059669', '#DC2626', '#EA580C', '#0891B2', '#CA8A04', '#6B7280']

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
type DrawPoint = { x: number; y: number; pressure?: number }
type ViewportState = { scale: number; offsetX: number; offsetY: number }
type ConnectorPort = 'top' | 'right' | 'bottom' | 'left' | 'center'
type ConnectorDragState = { strokeId: string; endpoint: 'source' | 'target' } | null

export function StudentLiveWhiteboard({
  roomId,
  sessionId,
  mode = 'floating',
  visibleTaskShares = [],
  onOpenTask,
}: StudentLiveWhiteboardProps) {
  const { data: session } = useSession()
  const myUserId = session?.user?.id
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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
  const [fontSize, setFontSize] = useState(20)
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
  const [isMinimized, setIsMinimized] = useState(false)
  const [showTutorBoard, setShowTutorBoard] = useState(true)
  const [stylusPriority, setStylusPriority] = useState(true)
  const [highContrast, setHighContrast] = useState(false)
  const [zoomPreset, setZoomPreset] = useState(1)
  const [snapEnabled, setSnapEnabled] = useState(true)
  const [gridVisible, setGridVisible] = useState(true)
  const [gridSize, setGridSize] = useState(20)
  const [followTutorCursor, setFollowTutorCursor] = useState(false)
  const [textPreset, setTextPreset] = useState<'plain' | 'latex' | 'code' | 'table' | 'sticky'>('plain')
  const [branchNameInput, setBranchNameInput] = useState('')
  const [taskPanelOpen, setTaskPanelOpen] = useState(false)
  const lastCursorEmitRef = useRef(0)
  const lastPointerTypeRef = useRef<string>('mouse')
  const shapeTools = useMemo(() => new Set<Tool>(['line', 'arrow', 'rectangle', 'circle', 'triangle', 'connector']), [])
  const freeDrawTools = useMemo(() => new Set<Tool>(['pencil', 'pen', 'marker', 'highlighter', 'calligraphy', 'eraser']), [])
  
  const {
    myStrokes,
    tutorStrokes,
    visibility,
    isConnected,
    remoteCursors,
    remoteSelections,
    isLayerLocked,
    hasSubmitted,
    addStroke,
    changeVisibility,
    submitMyBoard,
    undoLastStroke,
    updateCursor,
    updateSelectionPresence,
    clearOwnStrokes,
    replaceMyStrokes,
    assignmentOverlay,
    spotlight,
    activeLayerId,
    setActiveLayerId,
    availableBranches,
    createBoardBranch,
    switchBoardBranch
  } = useLiveClassWhiteboard(roomId, sessionId, 'student')

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

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: WhiteboardStroke, alpha: number = 1) => {
    if (stroke.type === 'text') {
      const anchor = stroke.points[0]
      if (!anchor || !stroke.text) return
      ctx.save()
      ctx.fillStyle = stroke.color
      ctx.globalAlpha = (stroke.opacity ?? 1) * alpha
      const textWeight = stroke.textStyle?.bold ? '700' : '400'
      const textItalic = stroke.textStyle?.italic ? 'italic' : 'normal'
      ctx.font = `${textItalic} ${textWeight} ${stroke.fontSize || fontSize}px ${stroke.fontFamily || 'Inter, Segoe UI, system-ui, sans-serif'}`
      ctx.textBaseline = 'top'
      ctx.textAlign = stroke.textStyle?.align || 'left'
      ctx.fillText(stroke.text, anchor.x, anchor.y)
      ctx.restore()
      return
    }

    if (stroke.type === 'shape' && stroke.shapeType && stroke.points.length >= 2) {
      if (stroke.shapeType === 'connector') {
        ctx.save()
        ctx.globalAlpha = (stroke.opacity ?? 1) * alpha
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
      drawShape(ctx, stroke.shapeType, stroke.points[0], stroke.points[stroke.points.length - 1], {
        color: stroke.color,
        width: stroke.width,
        opacity: (stroke.opacity ?? 1) * alpha,
      })
      return
    }

    if (stroke.points.length < 2) return

    ctx.save()
    ctx.globalAlpha = (stroke.opacity ?? 1) * alpha
    ctx.strokeStyle = stroke.color
    ctx.lineCap = stroke.type === 'calligraphy' ? 'square' : 'round'
    ctx.lineJoin = 'round'
    for (let i = 1; i < stroke.points.length; i += 1) {
      const prev = stroke.points[i - 1]
      const point = stroke.points[i]
      const pressure = typeof point.pressure === 'number' ? point.pressure : 0.5
      ctx.lineWidth = Math.max(1, stroke.width * (0.55 + pressure * 0.9))
      if (stroke.type === 'pencil') ctx.setLineDash([1, 1.5])
      else ctx.setLineDash([])
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
    const selectedBounds = myStrokes
      .filter((stroke) => selectedIds.has(stroke.id))
      .map((stroke) => getStrokeBounds(stroke))
      .filter((bounds): bounds is NonNullable<ReturnType<typeof getStrokeBounds>> => Boolean(bounds))
    if (!selectedBounds.length) return null
    const minX = Math.min(...selectedBounds.map((bounds) => bounds.x))
    const minY = Math.min(...selectedBounds.map((bounds) => bounds.y))
    const maxX = Math.max(...selectedBounds.map((bounds) => bounds.x + bounds.width))
    const maxY = Math.max(...selectedBounds.map((bounds) => bounds.y + bounds.height))
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }, [getStrokeBounds, myStrokes])

  const nudgeSelection = useCallback((dx: number, dy: number) => {
    if (isLayerLocked || selectedStrokeIds.size === 0) return
    replaceMyStrokes((prev) =>
      prev.map((stroke) => {
        if (!selectedStrokeIds.has(stroke.id)) return stroke
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
  }, [gridSize, isLayerLocked, replaceMyStrokes, selectedStrokeIds, snapEnabled])

  const scaleSelection = useCallback((factor: number) => {
    if (isLayerLocked || selectedStrokeIds.size === 0) return
    const bounds = getSelectedBounds(selectedStrokeIds)
    if (!bounds) return
    const centerX = bounds.x + bounds.width / 2
    const centerY = bounds.y + bounds.height / 2
    replaceMyStrokes((prev) =>
      prev.map((stroke) => {
        if (!selectedStrokeIds.has(stroke.id)) return stroke
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
  }, [getSelectedBounds, gridSize, isLayerLocked, replaceMyStrokes, selectedStrokeIds, snapEnabled])

  const selectByAttribute = useCallback((attribute: 'color' | 'type' | 'layer') => {
    const seed = myStrokes.find((stroke) => selectedStrokeIds.has(stroke.id))
    if (!seed) return
    const selected = new Set<string>()
    myStrokes.forEach((stroke) => {
      if (attribute === 'color' && stroke.color === seed.color) selected.add(stroke.id)
      if (attribute === 'type' && stroke.type === seed.type) selected.add(stroke.id)
      if (attribute === 'layer' && (stroke.layerId || 'student-personal') === (seed.layerId || 'student-personal')) selected.add(stroke.id)
    })
    setSelectedStrokeIds(selected)
  }, [myStrokes, selectedStrokeIds])

  const selectedBounds = useMemo(() => getSelectedBounds(selectedStrokeIds), [getSelectedBounds, selectedStrokeIds])
  const activeSelectedConnector = useMemo(() => {
    if (selectedStrokeIds.size !== 1) return null
    const id = Array.from(selectedStrokeIds)[0]
    const stroke = myStrokes.find((item) => item.id === id)
    if (!stroke || stroke.shapeType !== 'connector' || stroke.points.length < 2) return null
    return stroke
  }, [myStrokes, selectedStrokeIds])

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
    const endpoints = getConnectorScreenEndpoints(activeSelectedConnector, myStrokes)
    const radius = 10
    const sourceDist = Math.hypot(screenX - endpoints.source.x, screenY - endpoints.source.y)
    if (sourceDist <= radius) return { strokeId: activeSelectedConnector.id, endpoint: 'source' as const }
    const targetDist = Math.hypot(screenX - endpoints.target.x, screenY - endpoints.target.y)
    if (targetDist <= radius) return { strokeId: activeSelectedConnector.id, endpoint: 'target' as const }
    return null
  }, [activeSelectedConnector, getConnectorScreenEndpoints, myStrokes])

  useEffect(() => {
    updateSelectionPresence(Array.from(selectedStrokeIds), undefined, '#f59e0b')
  }, [selectedStrokeIds, updateSelectionPresence])

  useEffect(() => {
    replaceMyStrokes((prev) => {
      const byId = new Map(prev.map((stroke) => [stroke.id, stroke]))
      const obstacles = prev
        .filter((stroke) => stroke.shapeType !== 'connector')
        .map((stroke) => getStrokeBounds(stroke))
        .filter((bounds): bounds is NonNullable<ReturnType<typeof getStrokeBounds>> => Boolean(bounds))
      let changed = false
      const next: WhiteboardStroke[] = []
      prev.forEach((stroke) => {
        if (stroke.shapeType !== 'connector') {
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
  }, [getPortAnchors, getStrokeBounds, myStrokes, replaceMyStrokes, routeOrthogonalConnector])

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
      const px = corner.x * viewport.scale + viewport.offsetX
      const py = corner.y * viewport.scale + viewport.offsetY
      const dx = screenX - px
      const dy = screenY - py
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

    // Draw tutor's strokes first (bottom layer)
    if (showTutorBoard) {
      tutorStrokes.forEach(stroke => {
        const bounds = getStrokeBounds(stroke)
        if (!isBoundsVisible(bounds)) return
        drawStroke(ctx, stroke, 0.5)
      })
    }
    
    // Draw student's strokes on top
    myStrokes.forEach(stroke => {
      const bounds = getStrokeBounds(stroke)
      if (!isBoundsVisible(bounds)) return
      drawStroke(ctx, stroke, 1)
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
    })
    remoteSelections.forEach((presence) => {
      presence.strokeIds.forEach((id) => {
        const stroke = myStrokes.find((entry) => entry.id === id) || tutorStrokes.find((entry) => entry.id === id)
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
      drawStroke(ctx, previewStroke, 1)
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
        const sx = corner.x * viewport.scale + viewport.offsetX
        const sy = corner.y * viewport.scale + viewport.offsetY
        ctx.beginPath()
        ctx.arc(sx, sy, 5, 0, Math.PI * 2)
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
      const endpoints = getConnectorScreenEndpoints(activeSelectedConnector, myStrokes)
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
  }, [activeSelectedConnector, brushSize, color, currentStroke, drawShape, drawStroke, freeDrawTools, getConnectorScreenEndpoints, getStrokeBounds, gridSize, gridVisible, isDrawing, lassoPath, laserPoint, myStrokes, remoteSelections, selectedBounds, selectedStrokeIds, selectionRect, shapePreview, shapeStart, shapeTools, showTutorBoard, tool, tutorStrokes, viewport.offsetX, viewport.offsetY, viewport.scale])

  const getOverlayBackground = useCallback(() => {
    switch (assignmentOverlay) {
      case 'graph-paper':
        return 'linear-gradient(to right, rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.15) 1px, transparent 1px)'
      case 'geometry-grid':
        return 'linear-gradient(45deg, rgba(16,185,129,0.16) 1px, transparent 1px), linear-gradient(-45deg, rgba(16,185,129,0.16) 1px, transparent 1px)'
      case 'coordinate-plane':
        return 'linear-gradient(to right, rgba(107,114,128,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,114,128,0.15) 1px, transparent 1px), linear-gradient(to right, transparent calc(50% - 1px), rgba(239,68,68,0.35) calc(50% - 1px), rgba(239,68,68,0.35) calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(to bottom, transparent calc(50% - 1px), rgba(239,68,68,0.35) calc(50% - 1px), rgba(239,68,68,0.35) calc(50% + 1px), transparent calc(50% + 1px))'
      case 'chemistry-structure':
        return 'radial-gradient(circle at 20px 20px, rgba(245,158,11,0.18) 2px, transparent 2px), radial-gradient(circle at 60px 40px, rgba(245,158,11,0.18) 2px, transparent 2px), radial-gradient(circle at 100px 20px, rgba(245,158,11,0.18) 2px, transparent 2px)'
      default:
        return 'none'
    }
  }, [assignmentOverlay])
  
  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
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
      fontFamily: 'Inter, Segoe UI, system-ui, sans-serif',
      userId: myUserId || 'student',
      layerId: activeLayerId,
    }
    addStroke(stroke)
    setTextDraft(null)
  }, [activeLayerId, addStroke, color, fontSize, myUserId, textDraft, textPreset])
  
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    lastPointerTypeRef.current = e.pointerType
    if (isLayerLocked) return
    if (stylusPriority && lastPointerTypeRef.current === 'touch') return
    e.currentTarget.setPointerCapture(e.pointerId)
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
        const hitStroke = [...myStrokes].reverse().find((stroke) => {
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
      if (handle && selectedBounds) {
        const centerX = selectedBounds.x + selectedBounds.width / 2
        const centerY = selectedBounds.y + selectedBounds.height / 2
        selectionSnapshotRef.current = new Map(
          myStrokes
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
      const hitSelectedStroke = myStrokes.some((stroke) => {
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
        myStrokes.forEach((stroke) => {
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
    updateCursor(point.x, point.y)
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
    const now = Date.now()
    if (now - lastCursorEmitRef.current > 50) {
      updateCursor(point.x, point.y, tool === 'laser' ? 'laser' : 'cursor')
      lastCursorEmitRef.current = now
    }
    if (connectorDrag) {
      replaceMyStrokes((prev) => {
        const obstacles = prev
          .filter((stroke) => stroke.shapeType !== 'connector')
          .map((stroke) => getStrokeBounds(stroke))
          .filter((bounds): bounds is NonNullable<ReturnType<typeof getStrokeBounds>> => Boolean(bounds))
        const peers = prev.filter((stroke) => stroke.id !== connectorDrag.strokeId)
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
      myStrokes.forEach((stroke) => {
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
      myStrokes.forEach((stroke) => {
        if (stroke.points.some((p) => pointInPolygon({ x: p.x, y: p.y }, lassoPath))) {
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
      return
    }
    if (activeTransformHandle) {
      setActiveTransformHandle(null)
      transformRef.current = null
      selectionSnapshotRef.current.clear()
      return
    }
    if (isDraggingSelection) {
      setIsDraggingSelection(false)
      dragStartRef.current = null
      selectionSnapshotRef.current.clear()
      return
    }
    if (tool === 'laser') {
      setLaserPoint(null)
      return
    }
    if (!isDrawing) return

    if (shapeTools.has(tool) && shapeStart && shapePreview) {
      const preset = TOOL_PRESET[tool]
      const fromResolved = tool === 'connector' ? resolveConnectorEndpoint(shapeStart, myStrokes) : { point: shapeStart }
      const toResolved = tool === 'connector' ? resolveConnectorEndpoint(shapePreview, myStrokes) : { point: shapePreview }
      const fromPoint = fromResolved.point
      const toPoint = toResolved.point
      const connectorPoints = tool === 'connector'
        ? routeOrthogonalConnector(
            fromPoint,
            toPoint,
            myStrokes
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
        userId: myUserId || 'student',
        layerId: activeLayerId,
        sourceStrokeId: tool === 'connector' ? fromResolved.sourceStrokeId : undefined,
        targetStrokeId: tool === 'connector' ? toResolved.sourceStrokeId : undefined,
        sourcePort: tool === 'connector' ? fromResolved.sourcePort : undefined,
        targetPort: tool === 'connector' ? toResolved.sourcePort : undefined,
      }
      addStroke(stroke)
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
      userId: myUserId || 'student',
      layerId: activeLayerId
    }
    addStroke(stroke)
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
    if (!followTutorCursor) return
    const tutorCursor = Array.from(remoteCursors.values()).find((cursor) => cursor.role === 'tutor')
    if (!tutorCursor) return
    setViewport((prev) => ({
      ...prev,
      offsetX: (canvasRef.current?.width || 0) / 2 - tutorCursor.x * prev.scale,
      offsetY: (canvasRef.current?.height || 0) / 2 - tutorCursor.y * prev.scale,
    }))
  }, [followTutorCursor, remoteCursors])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === 'INPUT' || (event.target as HTMLElement)?.tagName === 'TEXTAREA') return
      const step = event.shiftKey ? 20 : 6
      const key = event.key.toLowerCase()
      if (key === 'v') setTool('select')
      if (key === 'p') setTool('pen')
      if (key === 'e') setTool('eraser')
      if (key === 't') setTool('text')
      if (key === 'l') setTool('laser')
      if (key === 'h') setTool('hand')
      if (selectedStrokeIds.size > 0) {
        if (event.key === 'ArrowUp') { event.preventDefault(); nudgeSelection(0, -step) }
        if (event.key === 'ArrowDown') { event.preventDefault(); nudgeSelection(0, step) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); nudgeSelection(-step, 0) }
        if (event.key === 'ArrowRight') { event.preventDefault(); nudgeSelection(step, 0) }
        if (event.key === '+') { event.preventDefault(); scaleSelection(1.08) }
        if (event.key === '-') { event.preventDefault(); scaleSelection(0.92) }
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        undoLastStroke()
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'x') {
        event.preventDefault()
        clearOwnStrokes()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [clearOwnStrokes, nudgeSelection, scaleSelection, selectedStrokeIds.size, undoLastStroke])

  useEffect(() => {
    const preset = TOOL_PRESET[tool]
    if (!preset) return
    if (tool === 'eraser' || tool === 'highlighter' || tool === 'marker' || tool === 'calligraphy' || tool === 'pencil' || tool === 'pen') {
      setBrushSize(preset.width)
    }
  }, [tool])

  useEffect(() => {
    setViewport((prev) => ({ ...prev, scale: zoomPreset }))
  }, [zoomPreset])

  const cursorColorForId = useCallback((userId: string) => {
    const palette = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2', '#ca8a04']
    let hash = 0
    for (let i = 0; i < userId.length; i += 1) hash = (hash * 31 + userId.charCodeAt(i)) | 0
    return palette[Math.abs(hash) % palette.length]
  }, [])
  
  const getVisibilityIcon = () => {
    switch (visibility) {
      case 'private': return <EyeOff className="w-4 h-4 mr-2" />
      case 'tutor-only': return <UserCheck className="w-4 h-4 mr-2" />
      case 'public': return <Users className="w-4 h-4 mr-2" />
    }
  }
  
  const getVisibilityLabel = () => {
    switch (visibility) {
      case 'private': return 'Private'
      case 'tutor-only': return 'Tutor Only'
      case 'public': return 'Class Visible'
    }
  }
  
  if (mode === 'floating' && isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-3 z-50">
        <div className="flex items-center gap-3">
          <Palette className="w-5 h-5" />
          <span className="font-medium">My Whiteboard</span>
          <Badge variant={visibility === 'public' ? 'default' : 'secondary'} className="text-xs">
            {getVisibilityLabel()}
          </Badge>
          <Button variant="ghost" size="sm" onClick={() => setIsMinimized(false)}>
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className={cn(
      "bg-white border rounded-lg shadow-2xl flex flex-col",
      mode === 'floating' ? "fixed bottom-4 right-4 w-96 z-50" : "w-full h-full"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <span className="font-medium text-sm">My Whiteboard</span>
          {isLayerLocked && (
            <Badge variant="destructive" className="text-xs">
              <Lock className="w-3 h-3 mr-1" />
              Locked
            </Badge>
          )}
          {hasSubmitted && (
            <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Submitted
            </Badge>
          )}
          {!isConnected && (
            <Badge variant="outline" className="text-xs text-red-500">Offline</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setStylusPriority((prev) => !prev)}
            aria-label="Toggle stylus priority"
          >
            {stylusPriority ? 'Stylus Priority' : 'Touch Enabled'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setHighContrast((prev) => !prev)}
            aria-label="Toggle high contrast"
          >
            {highContrast ? 'Standard' : 'High Contrast'}
          </Button>
          <Sheet open={taskPanelOpen} onOpenChange={setTaskPanelOpen}>
            <SheetTrigger asChild>
              <Button
                variant={visibleTaskShares.length > 0 ? 'default' : 'ghost'}
                size="sm"
                className={cn('h-7 text-xs', visibleTaskShares.length > 0 && 'animate-pulse')}
              >
                {visibleTaskShares.length > 0 ? `Live Tasks (${visibleTaskShares.length})` : 'Tasks (0)'}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[420px] sm:w-[520px]">
              <SheetHeader>
                <SheetTitle>Visible Tasks</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {visibleTaskShares.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No visible tasks yet.</p>
                ) : (
                  visibleTaskShares.map((share) => (
                    <div key={share.shareId} className="rounded-lg border p-3">
                      <p className="text-sm font-medium">{share.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {share.description || 'Tutor shared task document'}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Badge variant="outline">{share.visibleToAll ? 'Class Visible' : 'Private'}</Badge>
                          <Badge variant="secondary">
                            {share.allowCollaborativeWrite ? 'Collaborative' : 'Read only'}
                          </Badge>
                          {share.submissions?.some((submission) => submission.userId === myUserId) && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">Submitted</Badge>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            onOpenTask?.(share.shareId)
                            setTaskPanelOpen(false)
                          }}
                        >
                          Open Task
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>
          {/* Visibility Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                {getVisibilityIcon()}
                {getVisibilityLabel()}
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeVisibility('private')}>
                <EyeOff className="w-4 h-4 mr-2" />
                Private (Only Me)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeVisibility('tutor-only')}>
                <UserCheck className="w-4 h-4 mr-2" />
                Tutor Can View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeVisibility('public')}>
                <Users className="w-4 h-4 mr-2" />
                Class Can View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {mode === 'floating' && (
            <Button variant="ghost" size="sm" className="h-7" onClick={() => setIsMinimized(true)}>
              <ChevronDown className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {visibleTaskShares.length > 0 && (
        <div className="border-b bg-blue-50 px-3 py-2 text-xs text-blue-800">
          Tutor shared {visibleTaskShares.length} live task{visibleTaskShares.length > 1 ? 's' : ''}. Click{' '}
          <span className="font-semibold">Live Tasks</span> to open and work on your copy.
        </div>
      )}
      
      {/* Toolbar */}
      <div className="space-y-2 border-b bg-slate-50/95 px-3 py-2 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
            {[
              { id: 'pencil', icon: Pencil, label: 'Pencil' },
              { id: 'pen', icon: PenLine, label: 'Pen' },
              { id: 'marker', icon: Dot, label: 'Marker' },
              { id: 'highlighter', icon: Highlighter, label: 'Highlighter' },
              { id: 'calligraphy', icon: Minus, label: 'Calligraphy' },
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
                aria-label={label}
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
              { id: 'connector', icon: ArrowRight, label: 'Connector' },
              { id: 'text', icon: Type, label: 'Text' },
              { id: 'laser', icon: Dot, label: 'Laser Pointer' },
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
                aria-label={label}
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
                  "h-5 w-5 rounded-full border transition-all",
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
              className="h-5 w-7 cursor-pointer rounded border bg-transparent p-0"
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
              className="w-20"
            />
            <span className="w-6 text-xs font-medium text-slate-600">{brushSize}</span>
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
                className="w-20"
              />
              <span className="w-6 text-xs font-medium text-slate-600">{fontSize}</span>
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
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Nudge selection up" onClick={() => nudgeSelection(0, -10)} disabled={isLayerLocked}>
                Up
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Nudge selection left" onClick={() => nudgeSelection(-10, 0)} disabled={isLayerLocked}>
                Left
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Nudge selection right" onClick={() => nudgeSelection(10, 0)} disabled={isLayerLocked}>
                Right
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Nudge selection down" onClick={() => nudgeSelection(0, 10)} disabled={isLayerLocked}>
                Down
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Scale selected items down" onClick={() => scaleSelection(0.9)} disabled={isLayerLocked}>
                Scale -
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Scale selected items up" onClick={() => scaleSelection(1.1)} disabled={isLayerLocked}>
                Scale +
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Select all with same color" onClick={() => selectByAttribute('color')} disabled={isLayerLocked}>
                Same Color
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Select all with same stroke type" onClick={() => selectByAttribute('type')} disabled={isLayerLocked}>
                Same Type
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" title="Select all in same layer" onClick={() => selectByAttribute('layer')} disabled={isLayerLocked}>
                Same Layer
              </Button>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Button size="sm" variant={zoomPreset === 1 ? 'default' : 'outline'} className="h-7 px-2 text-xs" onClick={() => setZoomPreset(1)}>
              100%
            </Button>
            <Button size="sm" variant={zoomPreset === 1.25 ? 'default' : 'outline'} className="h-7 px-2 text-xs" onClick={() => setZoomPreset(1.25)}>
              125%
            </Button>
            <Button size="sm" variant={zoomPreset === 1.5 ? 'default' : 'outline'} className="h-7 px-2 text-xs" onClick={() => setZoomPreset(1.5)}>
              150%
            </Button>
          </div>
          <Button size="sm" variant={snapEnabled ? 'default' : 'outline'} className="h-7 px-2 text-xs" title="Toggle snap-to-grid" onClick={() => setSnapEnabled((prev) => !prev)}>
            Snap
          </Button>
          <Button size="sm" variant={gridVisible ? 'default' : 'outline'} className="h-7 px-2 text-xs" title="Show or hide grid" onClick={() => setGridVisible((prev) => !prev)}>
            Grid
          </Button>
          <div className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm">
            <span className="text-xs text-slate-500">Grid</span>
            <Slider value={[gridSize]} onValueChange={([v]) => setGridSize(v)} min={8} max={64} step={2} className="w-20" />
            <span className="w-6 text-xs font-medium text-slate-600">{gridSize}</span>
          </div>
          <Button size="sm" variant={followTutorCursor ? 'default' : 'outline'} className="h-7 px-2 text-xs" title="Center viewport on tutor cursor" onClick={() => setFollowTutorCursor((prev) => !prev)}>
            Follow Tutor
          </Button>

          <div className="flex items-center gap-1 text-xs">
            <Button
              size="sm"
              variant={activeLayerId === 'student-personal' ? 'default' : 'outline'}
              className="h-7 px-2 text-xs"
              onClick={() => setActiveLayerId('student-personal')}
            >
              My Layer
            </Button>
            <Button
              size="sm"
              variant={activeLayerId === 'shared-group' ? 'default' : 'outline'}
              className="h-7 px-2 text-xs"
              onClick={() => setActiveLayerId('shared-group')}
            >
              Shared Layer
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {Math.round(viewport.scale * 100)}%
            </Badge>
            {selectedStrokeIds.size > 0 && (
              <Badge variant="secondary" className="text-xs">
                {selectedStrokeIds.size} selected
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={submitMyBoard}
              disabled={isLayerLocked || myStrokes.length === 0 || hasSubmitted}
            >
              {hasSubmitted ? 'Submitted' : 'Submit'}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => undoLastStroke()} disabled={isLayerLocked}>
              <Undo className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={clearOwnStrokes} disabled={isLayerLocked}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tutor Board Toggle */}
      {tutorStrokes.length > 0 && (
        <div className="px-3 py-1.5 border-b bg-blue-50 flex items-center justify-between">
          <span className="text-xs text-blue-700">
            {tutorStrokes.length} strokes from tutor
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => setShowTutorBoard(!showTutorBoard)}
          >
            {showTutorBoard ? 'Hide' : 'Show'}
          </Button>
        </div>
      )}
      
      {/* Canvas */}
      <div ref={containerRef} className={cn("p-3", mode === 'floating' ? "h-64" : "h-full min-h-[380px]")}>
        <div
          className={cn("relative w-full h-full overflow-hidden", highContrast && "contrast-150 saturate-150")}
          style={{
            backgroundImage: getOverlayBackground(),
            backgroundSize:
              assignmentOverlay === 'chemistry-structure' ? '120px 80px' :
              assignmentOverlay === 'geometry-grid' ? '24px 24px' : '20px 20px',
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onWheel={handleWheel}
            className={cn(
              "w-full h-full border rounded bg-white",
              isLayerLocked ? 'cursor-not-allowed' :
                tool === 'laser' ? 'cursor-none' :
                tool === 'hand' ? 'cursor-grab' :
                tool === 'select' ? 'cursor-default' :
                'cursor-crosshair'
            )}
            aria-label="Student whiteboard canvas"
          />
          {textDraft && (
            <div
              className="absolute z-30"
              style={{ left: textDraft.x, top: textDraft.y }}
            >
              <div className="w-72 rounded-md border border-slate-300 bg-white/95 p-2 shadow-lg">
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
          {spotlight.enabled && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-black/30" />
              <div
                className={cn(
                  "absolute border-2 border-yellow-300 shadow-[0_0_0_9999px_rgba(0,0,0,0.32)]",
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
          {Array.from(remoteCursors.values())
            .filter((cursor) => cursor.userId !== myUserId)
            .map((cursor) => (
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
        </div>
      </div>
    </div>
  )
}
