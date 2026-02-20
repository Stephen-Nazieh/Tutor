/**
 * Enhanced Whiteboard Component
 * Features:
 * - Changeable background colors and styles
 * - Multiple pages with navigation
 * - Scrollable, pannable, zoomable canvas (zoom affects viewport, not content size)
 * - Video overlay support (draggable, fullscreen 70%)
 * - Text typing on whiteboard with formatting and TTS
 * - Selectable and movable objects
 * - Straight line drawing
 * - Basic shapes (rectangle, circle, triangle)
 * - Multiple draggable and resizable text overlays
 * - Asset sidebar for documents and images
 * - Teaching Assistant panel with AI-powered features
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TeachingAssistant } from './teaching-assistant'
import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Type,
  Palette,
  Grid3X3,
  X,
  Hand,
  MousePointer2,
  Square,
  Circle,
  Triangle,
  Minus,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Edit3,
  GripVertical,
  Volume2,
  Upload,
  Image as ImageIcon,
  FileText,
  FolderOpen,
  Bot,
  ChevronUp,
  ChevronDown,
  Maximize2
} from 'lucide-react'

interface Point {
  x: number
  y: number
}

interface Student {
  id: string
  name: string
  status: 'active' | 'struggling' | 'idle' | 'needs_help'
  engagement: number
  understanding: number
  frustration: number
  lastActive: Date
  raisedHand?: boolean
  currentActivity?: string
}

interface TextFormat {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  align?: 'left' | 'center' | 'right'
  color?: string
}

interface TextElement {
  id: string
  text: string
  x: number
  y: number
  color: string
  fontSize: number
  format: TextFormat
  width: number
  height: number
}

interface ShapeElement {
  id: string
  type: 'rectangle' | 'circle' | 'line' | 'triangle'
  x: number
  y: number
  width: number
  height: number
  color: string
  lineWidth: number
}

interface Stroke {
  id: string
  points: Point[]
  color: string
  width: number
  type: 'pen' | 'eraser'
}

interface Page {
  id: string
  name: string
  strokes: Stroke[]
  texts: TextElement[]
  shapes: ShapeElement[]
  backgroundColor: string
  backgroundStyle: 'solid' | 'grid' | 'dots' | 'lines'
  backgroundImage?: string
}

interface Asset {
  id: string
  type: 'image' | 'document'
  name: string
  url: string
  thumbnail?: string
}

interface SelectedObject {
  type: 'text' | 'shape' | 'stroke'
  id: string
  x: number
  y: number
  width: number
  height: number
}

interface TextOverlay {
  id: string
  x: number
  y: number
  text: string
  fontSize: number
  format: TextFormat
  width: number
  height: number
}

interface EnhancedWhiteboardProps {
  onUpdate?: (pages: Page[]) => void
  readOnly?: boolean
  videoOverlay?: boolean
  onToggleVideoFullscreen?: () => void
  isVideoFullscreen?: boolean
  videoComponent?: React.ReactNode
  // External page control
  pages?: Page[]
  currentPageIndex?: number
  onPagesChange?: (pages: Page[]) => void
  onPageIndexChange?: (index: number) => void
  students?: Student[]
  onPushHint?: (studentId: string, hint: string) => void
}

const BACKGROUND_COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#1f2937' },
  { name: 'Blue', value: '#1e3a5f' },
  { name: 'Green', value: '#1a3d2e' },
  { name: 'Dark Gray', value: '#374151' },
  { name: 'Cream', value: '#fef3c7' },
]

const COLORS = ['#000000', '#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ffffff']

export function EnhancedWhiteboard({
  onUpdate,
  readOnly = false,
  videoOverlay = true,
  onToggleVideoFullscreen,
  isVideoFullscreen = false,
  videoComponent,
  pages: externalPages,
  currentPageIndex: externalPageIndex,
  onPagesChange,
  onPageIndexChange,
  students: externalStudents,
  onPushHint
}: EnhancedWhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayTextareaRefs = useRef<Record<string, HTMLTextAreaElement>>({})

  // Internal page state (used if external not provided)
  const [internalPages, setInternalPages] = useState<Page[]>([{
    id: 'page-1',
    name: 'Page 1',
    strokes: [],
    texts: [],
    shapes: [],
    backgroundColor: '#ffffff',
    backgroundStyle: 'solid'
  }])
  const [internalPageIndex, setInternalPageIndex] = useState(0)

  // Use external or internal state
  const pages = externalPages ?? internalPages
  const currentPageIndex = externalPageIndex ?? internalPageIndex
  const setPages = onPagesChange ?? setInternalPages
  const setCurrentPageIndex = onPageIndexChange ?? setInternalPageIndex

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStroke, setCurrentStroke] = useState<Point[]>([])
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(3)
  const [tool, setTool] = useState<'pen' | 'eraser' | 'text' | 'hand' | 'line' | 'rectangle' | 'circle' | 'triangle' | 'select'>('pen')

  // Line drawing state
  const [lineStart, setLineStart] = useState<Point | null>(null)
  const [tempLineEnd, setTempLineEnd] = useState<Point | null>(null)

  // Shape preview state
  const [shapeStart, setShapeStart] = useState<Point | null>(null)
  const [tempShape, setTempShape] = useState<ShapeElement | null>(null)

  // View state - scale affects the view transform, canvas stays full size
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  // Text overlays
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([])
  const [draggingOverlay, setDraggingOverlay] = useState<string | null>(null)
  const [overlayDragOffset, setOverlayDragOffset] = useState({ x: 0, y: 0 })
  const [resizingOverlay, setResizingOverlay] = useState<string | null>(null)
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  // Selection state
  const [selectedObject, setSelectedObject] = useState<SelectedObject | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // UI state
  const [showBackgroundPanel, setShowBackgroundPanel] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [videoPosition, setVideoPosition] = useState({ x: 0, y: 0 })
  const [isDraggingVideo, setIsDraggingVideo] = useState(false)
  const [videoDragOffset, setVideoDragOffset] = useState({ x: 0, y: 0 })
  const [showTeachingAssistant, setShowTeachingAssistant] = useState(false)

  // Mock students fallback
  const mockStudents: Student[] = [
    { id: '1', name: 'Zhang Wei', status: 'active', engagement: 85, understanding: 80, frustration: 10, lastActive: new Date() },
    { id: '2', name: 'Li Na', status: 'struggling', engagement: 60, understanding: 45, frustration: 60, lastActive: new Date() },
    { id: '3', name: 'Wang Tao', status: 'active', engagement: 90, understanding: 85, frustration: 5, lastActive: new Date() },
    { id: '4', name: 'Chen Xi', status: 'needs_help', engagement: 70, understanding: 55, frustration: 70, lastActive: new Date() },
  ]

  // Use external students or mock
  const students = externalStudents ?? mockStudents

  // Asset sidebar state
  const [showAssetSidebar, setShowAssetSidebar] = useState(false)
  const [assets, setAssets] = useState<Asset[]>([])
  const [draggingAsset, setDraggingAsset] = useState<Asset | null>(null)

  const currentPage = pages[currentPageIndex]

  // Canvas will be sized dynamically to fit container
  const [canvasSize, setCanvasSize] = useState({ width: 3000, height: 2000 })


  // Initialize canvas and handle resize - INFINITE CANVAS
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const updateCanvasSize = () => {
      // Set large canvas size for "infinite" canvas (10000x10000)
      // User can pan/zoom to access any part
      const CANVAS_WIDTH = 10000
      const CANVAS_HEIGHT = 10000

      setCanvasSize({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT })
      canvas.width = CANVAS_WIDTH
      canvas.height = CANVAS_HEIGHT

      // Initialize pan to center of canvas
      if (pan.x === 0 && pan.y === 0) {
        const rect = container.getBoundingClientRect()
        setPan({
          x: CANVAS_WIDTH / 2 - rect.width / 2,
          y: CANVAS_HEIGHT / 2 - rect.height / 2
        })
      }

      redrawCanvas()
    }

    updateCanvasSize()

    const resizeObserver = new ResizeObserver(updateCanvasSize)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  // Redraw canvas when state changes
  useEffect(() => {
    redrawCanvas()
  }, [pages, currentPageIndex, scale, pan, currentStroke, tempLineEnd, tempShape, selectedObject, canvasSize])

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Clear with background color
    ctx.fillStyle = currentPage.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw background image if set
    if (currentPage.backgroundImage) {
      // In a real implementation, you'd draw the image here
      // For now, we'll just draw a placeholder
      ctx.fillStyle = 'rgba(0,0,0,0.1)'
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    }

    // Draw background pattern
    drawBackgroundPattern(ctx, currentPage.backgroundStyle, currentPage.backgroundColor)

    ctx.save()
    ctx.translate(pan.x, pan.y)
    ctx.scale(scale, scale)

    currentPage.strokes.forEach(stroke => {
      if (stroke.type === 'eraser') drawEraserStroke(ctx, stroke.points)
      else drawStroke(ctx, stroke.points, stroke.color, stroke.width)
    })

    currentPage.shapes.forEach(shape => drawShape(ctx, shape))
    currentPage.texts.forEach(text => drawTextElement(ctx, text))

    if (currentStroke.length > 0) {
      if (tool === 'eraser') drawEraserStroke(ctx, currentStroke)
      else drawStroke(ctx, currentStroke, color, lineWidth)
    }

    if (lineStart && tempLineEnd) {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(lineStart.x, lineStart.y)
      ctx.lineTo(tempLineEnd.x, tempLineEnd.y)
      ctx.stroke()
    }

    if (tempShape) drawShape(ctx, tempShape, true)
    if (selectedObject) drawSelectionHighlight(ctx, selectedObject)

    ctx.restore()
  }, [pages, currentPageIndex, currentStroke, lineStart, tempLineEnd, tempShape, color, lineWidth, tool, scale, pan, selectedObject, currentPage, canvasSize])

  const drawBackgroundPattern = (ctx: CanvasRenderingContext2D, style: string, bgColor: string) => {
    const patternColor = bgColor === '#ffffff' ? '#e5e7eb' : '#4b5563'
    ctx.strokeStyle = patternColor
    ctx.lineWidth = 1

    switch (style) {
      case 'grid':
        for (let x = 0; x < canvasSize.width; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvasSize.height); ctx.stroke()
        }
        for (let y = 0; y < canvasSize.height; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvasSize.width, y); ctx.stroke()
        }
        break
      case 'dots':
        ctx.fillStyle = patternColor
        for (let x = 20; x < canvasSize.width; x += 40) {
          for (let y = 20; y < canvasSize.height; y += 40) {
            ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill()
          }
        }
        break
      case 'lines':
        for (let y = 0; y < canvasSize.height; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvasSize.width, y); ctx.stroke()
        }
        break
    }
  }

  const drawStroke = (ctx: CanvasRenderingContext2D, points: Point[], strokeColor: string, width: number) => {
    if (points.length < 2) return
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
    ctx.stroke()
  }

  const drawEraserStroke = (ctx: CanvasRenderingContext2D, points: Point[]) => {
    if (points.length < 2) return
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = 20
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
    ctx.stroke()
    ctx.globalCompositeOperation = 'source-over'
  }

  const drawShape = (ctx: CanvasRenderingContext2D, shape: ShapeElement, isTemp = false) => {
    ctx.strokeStyle = shape.color
    ctx.lineWidth = shape.lineWidth
    ctx.lineCap = 'round'

    if (shape.type === 'line') {
      ctx.beginPath()
      ctx.moveTo(shape.x, shape.y)
      ctx.lineTo(shape.width, shape.height)
      ctx.stroke()
    } else if (shape.type === 'rectangle') {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
    } else if (shape.type === 'circle') {
      ctx.beginPath()
      ctx.ellipse(shape.x + shape.width / 2, shape.y + shape.height / 2, Math.abs(shape.width) / 2, Math.abs(shape.height) / 2, 0, 0, Math.PI * 2)
      ctx.stroke()
    } else if (shape.type === 'triangle') {
      ctx.beginPath()
      ctx.moveTo(shape.x + shape.width / 2, shape.y)
      ctx.lineTo(shape.x + shape.width, shape.y + shape.height)
      ctx.lineTo(shape.x, shape.y + shape.height)
      ctx.closePath()
      ctx.stroke()
    }
  }

  const drawTextElement = (ctx: CanvasRenderingContext2D, text: TextElement) => {
    ctx.fillStyle = text.color
    const fontWeight = text.format.bold ? 'bold' : 'normal'
    const fontStyle = text.format.italic ? 'italic' : 'normal'
    ctx.font = `${fontStyle} ${fontWeight} ${text.fontSize}px sans-serif`

    const lines = text.text.split('\n')
    const lineHeight = text.fontSize * 1.2

    lines.forEach((line, i) => {
      let x = text.x
      if (text.format.align === 'center') {
        const metrics = ctx.measureText(line)
        x = text.x + (text.width - metrics.width) / 2
      } else if (text.format.align === 'right') {
        const metrics = ctx.measureText(line)
        x = text.x + text.width - metrics.width
      }
      ctx.fillText(line, x, text.y + (i + 1) * lineHeight)
    })

    if (text.format.underline) {
      ctx.strokeStyle = text.color
      ctx.lineWidth = 1
      lines.forEach((line, i) => {
        const y = text.y + (i + 1) * lineHeight
        const metrics = ctx.measureText(line)
        let x = text.x
        if (text.format.align === 'center') x = text.x + (text.width - metrics.width) / 2
        if (text.format.align === 'right') x = text.x + text.width - metrics.width
        ctx.beginPath()
        ctx.moveTo(x, y + 2)
        ctx.lineTo(x + metrics.width, y + 2)
        ctx.stroke()
      })
    }
  }

  const drawSelectionHighlight = (ctx: CanvasRenderingContext2D, selected: SelectedObject) => {
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2 / scale
    ctx.setLineDash([5 / scale, 5 / scale])
    ctx.strokeRect(selected.x - 5, selected.y - 5, selected.width + 10, selected.height + 10)
    ctx.setLineDash([])

    ctx.fillStyle = '#3b82f6'
    const handles = [
      { x: selected.x - 5, y: selected.y - 5 },
      { x: selected.x + selected.width / 2, y: selected.y - 5 },
      { x: selected.x + selected.width, y: selected.y - 5 },
      { x: selected.x - 5, y: selected.y + selected.height / 2 },
      { x: selected.x + selected.width, y: selected.y + selected.height / 2 },
      { x: selected.x - 5, y: selected.y + selected.height },
      { x: selected.x + selected.width / 2, y: selected.y + selected.height },
      { x: selected.x + selected.width, y: selected.y + selected.height },
    ]
    handles.forEach(h => ctx.fillRect(h.x - 3 / scale, h.y - 3 / scale, 6 / scale, 6 / scale))
  }

  const screenToCanvas = (screenX: number, screenY: number): Point => {
    const container = containerRef.current
    if (!container) return { x: 0, y: 0 }
    const rect = container.getBoundingClientRect()
    return {
      x: (screenX - rect.left - pan.x) / scale,
      y: (screenY - rect.top - pan.y) / scale
    }
  }

  const hitTest = (point: Point): SelectedObject | null => {
    for (let i = currentPage.texts.length - 1; i >= 0; i--) {
      const text = currentPage.texts[i]
      if (point.x >= text.x && point.x <= text.x + text.width &&
        point.y >= text.y && point.y <= text.y + text.height) {
        return { type: 'text', id: text.id, x: text.x, y: text.y, width: text.width, height: text.height }
      }
    }

    for (let i = currentPage.shapes.length - 1; i >= 0; i--) {
      const shape = currentPage.shapes[i]
      if (shape.type === 'line') {
        const minX = Math.min(shape.x, shape.width) - 10
        const maxX = Math.max(shape.x, shape.width) + 10
        const minY = Math.min(shape.y, shape.height) - 10
        const maxY = Math.max(shape.y, shape.height) + 10
        if (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY) {
          return { type: 'shape', id: shape.id, x: minX, y: minY, width: maxX - minX, height: maxY - minY }
        }
      } else {
        const tolerance = 10
        if (point.x >= shape.x - tolerance && point.x <= shape.x + shape.width + tolerance &&
          point.y >= shape.y - tolerance && point.y <= shape.y + shape.height + tolerance) {
          return { type: 'shape', id: shape.id, x: shape.x, y: shape.y, width: shape.width, height: shape.height }
        }
      }
    }

    for (let i = currentPage.strokes.length - 1; i >= 0; i--) {
      const stroke = currentPage.strokes[i]
      for (const p of stroke.points) {
        if (Math.abs(p.x - point.x) < 10 && Math.abs(p.y - point.y) < 10) {
          const minX = Math.min(...stroke.points.map(p => p.x))
          const maxX = Math.max(...stroke.points.map(p => p.x))
          const minY = Math.min(...stroke.points.map(p => p.y))
          const maxY = Math.max(...stroke.points.map(p => p.y))
          return { type: 'stroke', id: stroke.id, x: minX, y: minY, width: maxX - minX, height: maxY - minY }
        }
      }
    }

    return null
  }

  // Text to Speech function
  const speakText = (text: string) => {
    if (!window.speechSynthesis) {
      alert('Text-to-speech is not supported in your browser')
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN' // Default to Chinese since this is for Chinese market
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (readOnly) return

    const point = screenToCanvas(e.clientX, e.clientY)

    // Check if clicking on video
    if (showVideo && !isVideoFullscreen && videoComponent) {
      const container = containerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const videoX = rect.width - 320 - videoPosition.x
        const videoY = 16 + videoPosition.y
        if (e.clientX - rect.left >= videoX && e.clientX - rect.left <= videoX + 320 &&
          e.clientY - rect.top >= videoY && e.clientY - rect.top <= videoY + 180) {
          setIsDraggingVideo(true)
          setVideoDragOffset({ x: e.clientX - videoX, y: e.clientY - videoY })
          return
        }
      }
    }

    if (tool === 'hand') {
      setIsPanning(true)
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
      return
    }

    // Check for overlay drag/resize
    const overlayHit = textOverlays.find(ov => {
      const screenX = ov.x * scale + pan.x
      const screenY = ov.y * scale + pan.y
      const screenW = ov.width * scale
      const screenH = ov.height * scale

      // Check resize handle (bottom-right corner)
      if (e.clientX >= screenX + screenW - 16 && e.clientX <= screenX + screenW &&
        e.clientY >= screenY + screenH - 16 && e.clientY <= screenY + screenH) {
        return 'resize'
      }

      // Check entire overlay
      if (e.clientX >= screenX && e.clientX <= screenX + screenW &&
        e.clientY >= screenY && e.clientY <= screenY + screenH) {
        return 'drag'
      }
      return false
    })

    if (overlayHit) {
      // Check if clicking resize handle
      const screenX = overlayHit.x * scale + pan.x
      const screenY = overlayHit.y * scale + pan.y
      const screenW = overlayHit.width * scale
      const screenH = overlayHit.height * scale

      if (e.clientX >= screenX + screenW - 16 && e.clientX <= screenX + screenW &&
        e.clientY >= screenY + screenH - 16 && e.clientY <= screenY + screenH) {
        setResizingOverlay(overlayHit.id)
        setResizeStart({
          x: e.clientX,
          y: e.clientY,
          width: overlayHit.width,
          height: overlayHit.height
        })
        return
      }

      setDraggingOverlay(overlayHit.id)
      setOverlayDragOffset({
        x: (e.clientX - pan.x) / scale - overlayHit.x,
        y: (e.clientY - pan.y) / scale - overlayHit.y
      })
      return
    }

    if (tool === 'pen' || tool === 'eraser') {
      setIsDrawing(true)
      setCurrentStroke([point])
      setSelectedObject(null)
      return
    }

    if (tool === 'line') {
      if (!lineStart) {
        setLineStart(point)
      } else {
        const newShape: ShapeElement = {
          id: Date.now().toString(),
          type: 'line',
          x: lineStart.x, y: lineStart.y,
          width: point.x, height: point.y,
          color, lineWidth
        }
        updateCurrentPage({ ...currentPage, shapes: [...currentPage.shapes, newShape] })
        setLineStart(null)
        setTempLineEnd(null)
      }
      return
    }

    if (tool === 'rectangle' || tool === 'circle' || tool === 'triangle') {
      setShapeStart(point)
      return
    }

    if (tool === 'text') {
      const newOverlay: TextOverlay = {
        id: Date.now().toString(),
        x: point.x,
        y: point.y,
        text: '',
        fontSize: 20,
        format: { align: 'left', color: color },
        width: 300,
        height: 200
      }
      setTextOverlays(prev => [...prev, newOverlay])
      return
    }

    const hit = hitTest(point)
    if (hit) {
      setSelectedObject(hit)
      setIsDragging(true)
      setDragOffset({ x: point.x - hit.x, y: point.y - hit.y })
    } else {
      setSelectedObject(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const point = screenToCanvas(e.clientX, e.clientY)

    if (isDraggingVideo) {
      const container = containerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const newVideoX = e.clientX - rect.left - videoDragOffset.x
        const newVideoY = e.clientY - rect.top - videoDragOffset.y
        setVideoPosition({ x: rect.width - 320 - newVideoX, y: newVideoY - 16 })
      }
      return
    }

    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y })
      return
    }

    if (resizingOverlay) {
      const dx = (e.clientX - resizeStart.x) / scale
      const dy = (e.clientY - resizeStart.y) / scale
      setTextOverlays(overlays => overlays.map(ov =>
        ov.id === resizingOverlay
          ? {
            ...ov,
            width: Math.max(200, resizeStart.width + dx),
            height: Math.max(150, resizeStart.height + dy)
          }
          : ov
      ))
      return
    }

    if (draggingOverlay) {
      setTextOverlays(overlays => overlays.map(ov =>
        ov.id === draggingOverlay
          ? { ...ov, x: point.x - overlayDragOffset.x, y: point.y - overlayDragOffset.y }
          : ov
      ))
      return
    }

    if (lineStart && tool === 'line') {
      setTempLineEnd(point)
      return
    }

    if (shapeStart && (tool === 'rectangle' || tool === 'circle' || tool === 'triangle')) {
      setTempShape({
        id: 'temp',
        type: tool,
        x: shapeStart.x,
        y: shapeStart.y,
        width: point.x - shapeStart.x,
        height: point.y - shapeStart.y,
        color, lineWidth
      })
      return
    }

    if (!isDrawing && !isDragging) return

    if (isDragging && selectedObject) {
      const newX = point.x - dragOffset.x
      const newY = point.y - dragOffset.y

      if (selectedObject.type === 'text') {
        updateCurrentPage({
          ...currentPage,
          texts: currentPage.texts.map(t =>
            t.id === selectedObject.id ? { ...t, x: newX, y: newY } : t
          )
        })
        setSelectedObject({ ...selectedObject, x: newX, y: newY })
      } else if (selectedObject.type === 'shape') {
        const shape = currentPage.shapes.find(s => s.id === selectedObject.id)
        if (shape) {
          if (shape.type === 'line') {
            const dx = newX - shape.x
            const dy = newY - shape.y
            updateCurrentPage({
              ...currentPage,
              shapes: currentPage.shapes.map(s =>
                s.id === selectedObject.id
                  ? { ...s, x: newX, y: newY, width: s.width + dx, height: s.height + dy }
                  : s
              )
            })
          } else {
            updateCurrentPage({
              ...currentPage,
              shapes: currentPage.shapes.map(s =>
                s.id === selectedObject.id ? { ...s, x: newX, y: newY } : s
              )
            })
          }
          setSelectedObject({ ...selectedObject, x: newX, y: newY })
        }
      }
      return
    }

    if (isDrawing) setCurrentStroke(prev => [...prev, point])
  }

  const handleMouseUp = () => {
    if (isDraggingVideo) { setIsDraggingVideo(false); return }
    if (isPanning) { setIsPanning(false); return }
    if (resizingOverlay) { setResizingOverlay(null); return }
    if (draggingOverlay) { setDraggingOverlay(null); return }
    if (isDragging) { setIsDragging(false); return }

    if (shapeStart && tempShape) {
      const newShape: ShapeElement = {
        id: Date.now().toString(),
        type: tempShape.type,
        x: tempShape.x, y: tempShape.y,
        width: tempShape.width, height: tempShape.height,
        color, lineWidth
      }
      updateCurrentPage({ ...currentPage, shapes: [...currentPage.shapes, newShape] })
      setShapeStart(null)
      setTempShape(null)
      return
    }

    if (!isDrawing) return
    setIsDrawing(false)

    if (currentStroke.length > 0) {
      const newStroke: Stroke = {
        id: Date.now().toString(),
        points: currentStroke,
        color: tool === 'eraser' ? '' : color,
        width: lineWidth,
        type: tool === 'eraser' ? 'eraser' : 'pen'
      }
      updateCurrentPage({ ...currentPage, strokes: [...currentPage.strokes, newStroke] })
      setCurrentStroke([])
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale(prev => Math.max(0.1, Math.min(5, prev * delta)))
  }

  // Text overlay functions
  const confirmTextOverlay = (overlayId: string) => {
    const overlay = textOverlays.find(o => o.id === overlayId)
    if (!overlay || !overlay.text.trim()) {
      setTextOverlays(overlays => overlays.filter(o => o.id !== overlayId))
      return
    }

    const newText: TextElement = {
      id: overlayId,
      text: overlay.text,
      x: overlay.x,
      y: overlay.y,
      color: overlay.format.color || color,
      fontSize: overlay.fontSize,
      format: overlay.format,
      width: overlay.width,
      height: overlay.height
    }

    updateCurrentPage({ ...currentPage, texts: [...currentPage.texts, newText] })
    setTextOverlays(overlays => overlays.filter(o => o.id !== overlayId))
  }

  const cancelTextOverlay = (overlayId: string) => {
    setTextOverlays(overlays => overlays.filter(o => o.id !== overlayId))
  }

  const editTextElement = (textId: string) => {
    const text = currentPage.texts.find(t => t.id === textId)
    if (!text) return

    updateCurrentPage({
      ...currentPage,
      texts: currentPage.texts.filter(t => t.id !== textId)
    })

    const overlay: TextOverlay = {
      id: textId,
      x: text.x,
      y: text.y,
      text: text.text,
      fontSize: text.fontSize,
      format: text.format,
      width: text.width,
      height: text.height
    }
    setTextOverlays(prev => [...prev, overlay])
  }

  const updateOverlayText = (id: string, newText: string) => {
    setTextOverlays(overlays => overlays.map(o =>
      o.id === id ? { ...o, text: newText } : o
    ))
  }

  const updateOverlayFormat = (id: string, formatUpdate: Partial<TextFormat>) => {
    setTextOverlays(overlays => overlays.map(o =>
      o.id === id ? { ...o, format: { ...o.format, ...formatUpdate } } : o
    ))
  }

  // Asset handling
  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file)
      const newAsset: Asset = {
        id: Date.now().toString() + Math.random(),
        type: file.type.startsWith('image/') ? 'image' : 'document',
        name: file.name,
        url: url,
        thumbnail: file.type.startsWith('image/') ? url : undefined
      }
      setAssets(prev => [...prev, newAsset])
    })
  }

  const setAssetAsBackground = (asset: Asset) => {
    if (asset.type === 'image') {
      updateCurrentPage({
        ...currentPage,
        backgroundImage: asset.url,
        backgroundStyle: 'solid'
      })
    }
  }

  // Page management
  const addPage = () => {
    const newPage: Page = {
      id: `page-${pages.length + 1}`,
      name: `Page ${pages.length + 1}`,
      strokes: [], texts: [], shapes: [],
      backgroundColor: '#ffffff',
      backgroundStyle: 'solid'
    }
    setPages([...pages, newPage])
    setCurrentPageIndex(pages.length)
  }

  const deletePage = (index: number) => {
    if (pages.length <= 1) return
    const newPages = pages.filter((_, i) => i !== index)
    setPages(newPages)
    setCurrentPageIndex(Math.min(currentPageIndex, newPages.length - 1))
  }

  const updateCurrentPage = (updatedPage: Page) => {
    const newPages = [...pages]
    newPages[currentPageIndex] = updatedPage
    setPages(newPages)
    onUpdate?.(newPages)
  }

  const deleteSelected = () => {
    if (!selectedObject) return
    if (selectedObject.type === 'text') {
      updateCurrentPage({ ...currentPage, texts: currentPage.texts.filter(t => t.id !== selectedObject.id) })
    } else if (selectedObject.type === 'shape') {
      updateCurrentPage({ ...currentPage, shapes: currentPage.shapes.filter(s => s.id !== selectedObject.id) })
    } else if (selectedObject.type === 'stroke') {
      updateCurrentPage({ ...currentPage, strokes: currentPage.strokes.filter(s => s.id !== selectedObject.id) })
    }
    setSelectedObject(null)
  }

  const undoLast = () => {
    if (currentPage.shapes.length > 0) {
      updateCurrentPage({ ...currentPage, shapes: currentPage.shapes.slice(0, -1) })
    } else if (currentPage.strokes.length > 0) {
      updateCurrentPage({ ...currentPage, strokes: currentPage.strokes.slice(0, -1) })
    }
  }

  const clearPage = () => {
    updateCurrentPage({ ...currentPage, strokes: [], texts: [], shapes: [] })
    setSelectedObject(null)
    setTextOverlays([])
  }

  const zoomIn = () => setScale(prev => Math.min(5, prev * 1.2))
  const zoomOut = () => setScale(prev => Math.max(0.1, prev / 1.2))
  const resetView = () => { setScale(1); setPan({ x: 0, y: 0 }) }

  const updateBackground = (bgColor: string, style: Page['backgroundStyle']) => {
    updateCurrentPage({ ...currentPage, backgroundColor: bgColor, backgroundStyle: style })
    setShowBackgroundPanel(false)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        undoLast()
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObject && !textOverlays.some(o => document.activeElement?.tagName === 'TEXTAREA')) {
        deleteSelected()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedObject, textOverlays, currentPage])

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-lg overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-1">
          <Button variant={tool === 'select' ? 'default' : 'outline'} size="sm" onClick={() => setTool('select')} className="h-8 w-8 p-0" title="Select/Move">
            <MousePointer2 className="w-4 h-4" />
          </Button>
          <Button variant={tool === 'pen' ? 'default' : 'outline'} size="sm" onClick={() => setTool('pen')} className="h-8 w-8 p-0" title="Pen">
            <div className="w-3 h-3 rounded-full bg-current" />
          </Button>
          <Button variant={tool === 'line' ? 'default' : 'outline'} size="sm" onClick={() => { setTool('line'); setLineStart(null); }} className="h-8 w-8 p-0" title="Line">
            <Minus className="w-4 h-4" />
          </Button>
          <Button variant={tool === 'rectangle' ? 'default' : 'outline'} size="sm" onClick={() => setTool('rectangle')} className="h-8 w-8 p-0" title="Rectangle">
            <Square className="w-4 h-4" />
          </Button>
          <Button variant={tool === 'circle' ? 'default' : 'outline'} size="sm" onClick={() => setTool('circle')} className="h-8 w-8 p-0" title="Circle">
            <Circle className="w-4 h-4" />
          </Button>
          <Button variant={tool === 'triangle' ? 'default' : 'outline'} size="sm" onClick={() => setTool('triangle')} className="h-8 w-8 p-0" title="Triangle">
            <Triangle className="w-4 h-4" />
          </Button>
          <Button variant={tool === 'eraser' ? 'default' : 'outline'} size="sm" onClick={() => setTool('eraser')} className="h-8 w-8 p-0" title="Eraser">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant={tool === 'text' ? 'default' : 'outline'} size="sm" onClick={() => setTool('text')} className="h-8 w-8 p-0" title="Text">
            <Type className="w-4 h-4" />
          </Button>
          <Button variant={tool === 'hand' ? 'default' : 'outline'} size="sm" onClick={() => setTool('hand')} className="h-8 w-8 p-0" title="Pan">
            <Hand className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-slate-600" />

        <div className="flex items-center gap-1">
          {COLORS.map(c => (
            <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-white ring-1 ring-slate-400' : 'border-transparent'}`} style={{ backgroundColor: c }} />
          ))}
        </div>

        <div className="h-6 w-px bg-slate-600" />

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">Size:</span>
          <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} className="w-20" />
        </div>

        <div className="flex-1" />

        {selectedObject && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{selectedObject.type === 'text' ? 'Text' : selectedObject.type === 'shape' ? 'Shape' : 'Stroke'} selected</span>
            <Button variant="destructive" size="sm" onClick={deleteSelected} className="h-7 text-xs">Delete</Button>
            <div className="h-6 w-px bg-slate-600" />
          </div>
        )}

        {lineStart && <span className="text-xs text-yellow-400">Click to end line</span>}

        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={zoomOut} className="h-8 w-8 p-0"><ZoomOut className="w-4 h-4" /></Button>
          <span className="text-slate-400 text-sm min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="sm" onClick={zoomIn} className="h-8 w-8 p-0"><ZoomIn className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" onClick={resetView} className="text-xs">Reset</Button>
        </div>

        <div className="h-6 w-px bg-slate-600" />

        <Button variant="outline" size="sm" onClick={() => setShowBackgroundPanel(!showBackgroundPanel)} className="h-8">
          <Palette className="w-4 h-4 mr-1" /> Background
        </Button>

        <Button
          variant={showTeachingAssistant ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowTeachingAssistant(!showTeachingAssistant)}
          className="h-8"
        >
          <Bot className="w-4 h-4 mr-1" /> AI Assistant
        </Button>

        <div className="h-6 w-px bg-slate-600" />

        <Button variant="outline" size="sm" onClick={undoLast}>Undo</Button>
        <Button variant="destructive" size="sm" onClick={clearPage}>Clear</Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Asset Sidebar */}
        {showAssetSidebar && (
          <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
            <div className="p-3 border-b border-slate-700 flex items-center justify-between">
              <span className="font-medium text-sm">Assets</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowAssetSidebar(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-3 border-b border-slate-700">
              <label className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded cursor-pointer text-sm">
                <Upload className="w-4 h-4" />
                Upload Files
                <input type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={handleAssetUpload} />
              </label>
            </div>
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-2">
                {assets.length === 0 && (
                  <p className="text-slate-500 text-sm text-center py-4">No assets yet.<br />Upload images or documents.</p>
                )}
                {assets.map(asset => (
                  <div key={asset.id} className="group relative bg-slate-700 rounded-lg p-2 cursor-pointer hover:bg-slate-600" onClick={() => setAssetAsBackground(asset)}>
                    {asset.thumbnail ? (
                      <img src={asset.thumbnail} alt={asset.name} className="w-full h-24 object-cover rounded mb-2" />
                    ) : (
                      <div className="w-full h-24 bg-slate-600 rounded flex items-center justify-center mb-2">
                        <FileText className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                    <p className="text-xs text-slate-300 truncate">{asset.name}</p>
                    <p className="text-xs text-slate-500">Click to set as background</p>
                    <button
                      className="absolute top-1 right-1 p-1 bg-red-600 rounded opacity-0 group-hover:opacity-100"
                      onClick={(e) => { e.stopPropagation(); setAssets(prev => prev.filter(a => a.id !== asset.id)); }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Canvas Container */}
        <div ref={containerRef} className="flex-1 relative overflow-hidden bg-slate-700" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} style={{ cursor: tool === 'hand' ? (isPanning ? 'grabbing' : 'grab') : tool === 'text' ? 'text' : tool === 'pen' || tool === 'eraser' ? 'crosshair' : selectedObject && !isDrawing ? 'move' : lineStart ? 'crosshair' : resizingOverlay ? 'nw-resize' : 'default' }}>
          {/* Canvas - Fixed size, transformed by scale/pan */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transformOrigin: '0 0',
              width: canvasSize.width,
              height: canvasSize.height
            }}
          />

          {/* Confirmed Text Elements - with edit buttons */}
          {currentPage.texts.map(text => (
            <div key={text.id} className="absolute" style={{ left: text.x * scale + pan.x, top: text.y * scale + pan.y, width: text.width * scale, height: text.height * scale, pointerEvents: 'none' }}>
              {selectedObject?.id === text.id && (
                <div className="absolute inset-0 border-2 border-blue-500 border-dashed pointer-events-auto">
                  <button onClick={(e) => { e.stopPropagation(); editTextElement(text.id); }} className="absolute -top-6 -right-6 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 shadow-lg" title="Edit text">
                    <Edit3 className="w-3 h-3 text-white" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Draggable and Resizable Text Input Overlays */}
          {textOverlays.map(overlay => (
            <div key={overlay.id} className="absolute z-20" style={{ left: overlay.x * scale + pan.x, top: overlay.y * scale + pan.y, width: overlay.width * scale, height: overlay.height * scale }}>
              <div className="w-full h-full bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col">
                {/* Drag handle and header */}
                <div className="flex items-center justify-between px-2 py-1 bg-gray-100 border-b border-gray-200 cursor-move shrink-0">
                  <div className="flex items-center gap-1">
                    <GripVertical className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-500">Drag to move</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* TTS Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); speakText(overlay.text); }}
                      className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded"
                      title="Text to Speech"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); cancelTextOverlay(overlay.id); }}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Formatting toolbar */}
                <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-200 flex-wrap shrink-0">
                  <Button variant={overlay.format.bold ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => updateOverlayFormat(overlay.id, { bold: !overlay.format.bold })}>
                    <Bold className="w-3 h-3" />
                  </Button>
                  <Button variant={overlay.format.italic ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => updateOverlayFormat(overlay.id, { italic: !overlay.format.italic })}>
                    <Italic className="w-3 h-3" />
                  </Button>
                  <Button variant={overlay.format.underline ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => updateOverlayFormat(overlay.id, { underline: !overlay.format.underline })}>
                    <Underline className="w-3 h-3" />
                  </Button>
                  <div className="h-4 w-px bg-gray-300 mx-1" />
                  <Button variant={overlay.format.align === 'left' ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => updateOverlayFormat(overlay.id, { align: 'left' })}>
                    <AlignLeft className="w-3 h-3" />
                  </Button>
                  <Button variant={overlay.format.align === 'center' ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => updateOverlayFormat(overlay.id, { align: 'center' })}>
                    <AlignCenter className="w-3 h-3" />
                  </Button>
                  <Button variant={overlay.format.align === 'right' ? 'default' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => updateOverlayFormat(overlay.id, { align: 'right' })}>
                    <AlignRight className="w-3 h-3" />
                  </Button>
                  <div className="h-4 w-px bg-gray-300 mx-1" />
                  {COLORS.slice(0, 5).map(c => (
                    <button
                      key={c}
                      onClick={() => updateOverlayFormat(overlay.id, { color: c })}
                      className={`w-5 h-5 rounded-full border ${overlay.format.color === c ? 'ring-1 ring-offset-1 ring-gray-400' : ''}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                {/* Text area - flexible */}
                <textarea
                  ref={el => { if (el) overlayTextareaRefs.current[overlay.id] = el; }}
                  autoFocus
                  value={overlay.text}
                  onChange={(e) => updateOverlayText(overlay.id, e.target.value)}
                  placeholder="Type your text here..."
                  className="flex-1 w-full p-3 text-gray-800 resize-none outline-none min-h-0"
                  style={{
                    fontSize: `${overlay.fontSize}px`,
                    fontWeight: overlay.format.bold ? 'bold' : 'normal',
                    fontStyle: overlay.format.italic ? 'italic' : 'normal',
                    textDecoration: overlay.format.underline ? 'underline' : 'none',
                    textAlign: overlay.format.align || 'left',
                    color: overlay.format.color || '#000000'
                  }}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Size and actions */}
                <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-200 bg-gray-50 shrink-0">
                  <span className="text-xs text-slate-500">Size:</span>
                  <input type="range" min="12" max="72" value={overlay.fontSize} onChange={(e) => setTextOverlays(overlays => overlays.map(o => o.id === overlay.id ? { ...o, fontSize: Number(e.target.value) } : o))} className="flex-1" />
                  <span className="text-xs text-slate-500 w-10 text-right">{overlay.fontSize}px</span>
                </div>

                <div className="flex gap-2 p-2 border-t border-gray-200 bg-gray-50 shrink-0">
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); confirmTextOverlay(overlay.id); }} className="flex-1">Add</Button>
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); cancelTextOverlay(overlay.id); }}>Cancel</Button>
                </div>

                {/* Resize handle */}
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, transparent 50%, #3b82f6 50%)' }}
                  title="Drag to resize"
                />
              </div>
            </div>
          ))}

          {/* Video Overlay - Draggable */}
          {videoOverlay && videoComponent && showVideo && !isVideoFullscreen && (
            <div className="absolute z-10 bg-black rounded-lg shadow-lg overflow-hidden border border-slate-600" style={{ width: '320px', height: '180px', right: `${16 + videoPosition.x}px`, top: `${16 + videoPosition.y}px` }}>
              <div className="absolute top-2 left-2 z-20 cursor-move p-1 bg-slate-800/50 rounded hover:bg-slate-700" title="Drag to move">
                <GripVertical className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-2 right-2 z-20 flex gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-slate-800/50 hover:bg-slate-700" onClick={onToggleVideoFullscreen}>
                  <Maximize className="w-3 h-3 text-white" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-slate-800/50 hover:bg-slate-700" onClick={() => setShowVideo(false)}>
                  <X className="w-3 h-3 text-white" />
                </Button>
              </div>
              {videoComponent}
            </div>
          )}

          {/* Show Video Button */}
          {!showVideo && (
            <Button variant="outline" size="sm" className="absolute top-4 right-4 z-10" onClick={() => setShowVideo(true)}>Show Video</Button>
          )}

          {/* Page Info */}
          <div className="absolute bottom-4 left-4 bg-slate-800/80 px-3 py-1 rounded text-sm text-slate-300">
            Page {currentPageIndex + 1} of {pages.length} • {Math.round(scale * 100)}%
            {selectedObject && <span className="ml-2 text-blue-400">• Object selected</span>}
          </div>
        </div>

        {/* Video Fullscreen Overlay - 70% centered */}
        {isVideoFullscreen && videoComponent && (
          <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="relative bg-black rounded-lg shadow-2xl overflow-hidden border border-slate-600" style={{ width: '70%', height: '70%' }}>
              <div className="absolute top-4 right-4 z-10">
                <Button variant="outline" size="sm" onClick={onToggleVideoFullscreen}>
                  <Minimize className="w-4 h-4 mr-2" /> Minimize
                </Button>
              </div>
              <div className="w-full h-full">
                {videoComponent}
              </div>
            </div>
          </div>
        )}

        {/* Background Panel - Color & Style Selection */}
        {showBackgroundPanel && (
          <div className="absolute top-16 right-4 z-50 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4 w-80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Background</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowBackgroundPanel(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Background Colors */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {BACKGROUND_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => updateBackground(c.value, currentPage.backgroundStyle)}
                      className={`h-12 rounded border-2 transition-all flex flex-col items-center justify-center ${currentPage.backgroundColor === c.value
                        ? 'border-blue-500 ring-2 ring-blue-500/50'
                        : 'border-slate-600 hover:border-gray-400'
                        }`}
                      style={{ backgroundColor: c.value }}
                    >
                      <span className={`text-xs font-medium ${c.value === '#ffffff' || c.value === '#fef3c7' ? 'text-gray-800' : 'text-white'
                        }`}>
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Styles */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['solid', 'grid', 'dots', 'lines'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateBackground(currentPage.backgroundColor, style)}
                      className={`px-3 py-2 rounded border text-sm capitalize ${currentPage.backgroundStyle === style
                        ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                        : 'border-slate-600 text-slate-300 hover:border-gray-400'
                        }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teaching Assistant Panel */}
        {showTeachingAssistant && (
          <TeachingAssistant
            students={students}
            roomId="class-room"
            onPushHint={(studentId, hint, type: 'socratic' | 'direct' | 'encouragement') => onPushHint?.(studentId, hint)}
            onInviteBreakout={(studentId) => console.log('Invite to breakout:', studentId)}
          />
        )}
      </div>

      {/* Bottom Page Navigation - only show when using internal state */}
      {!externalPages && (
        <div className="flex items-center gap-2 px-4 py-2 border-t border-slate-700 bg-slate-800">
          <Button variant="outline" size="sm" onClick={addPage} className="gap-1 h-8">
            <Plus className="w-4 h-4" /> New Page
          </Button>
          <div className="h-6 w-px bg-slate-600 mx-1" />
          <Button variant="outline" size="sm" onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))} disabled={currentPageIndex === 0} className="h-8 w-8 p-0"><ChevronLeft className="w-4 h-4" /></Button>
          <div className="flex items-center gap-1 overflow-x-auto max-w-md">
            {pages.map((page, index) => (
              <button key={page.id} onClick={() => setCurrentPageIndex(index)} className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${index === currentPageIndex ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                <Grid3X3 className="w-3 h-3" />
                <span className="max-w-[80px] truncate">{page.name}</span>
                {pages.length > 1 && index === currentPageIndex && (
                  <X className="w-3 h-3 ml-1 opacity-70 hover:opacity-100 hover:bg-red-500 rounded" onClick={(e) => { e.stopPropagation(); deletePage(index); }} />
                )}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1))} disabled={currentPageIndex === pages.length - 1} className="h-8 w-8 p-0"><ChevronRight className="w-4 h-4" /></Button>
          <div className="flex-1" />
          <span className="text-xs text-slate-500">
            {tool === 'line' && !lineStart && 'Click to start line'}
            {tool === 'line' && lineStart && 'Click to end line'}
            {tool === 'rectangle' && 'Drag to draw rectangle'}
            {tool === 'circle' && 'Drag to draw circle'}
            {tool === 'triangle' && 'Drag to draw triangle'}
            {selectedObject && 'Drag to move, Delete key to remove'}
          </span>
        </div>
      )}
    </div>
  )
}
