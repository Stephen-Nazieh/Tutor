/**
 * Infinite Whiteboard Component
 * Pan and zoom capable whiteboard with infinite canvas
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Move, Hand, Trash2, Undo } from 'lucide-react'

interface Page {
  id: string
  strokes: Stroke[]
  backgroundColor: string
}

interface InfiniteWhiteboardProps {
  onUpdate?: (pages: Page[]) => void
  readOnly?: boolean
}

interface Point {
  x: number
  y: number
}

interface Stroke {
  id: string
  points: Point[]
  color: string
  width: number
}

interface Viewport {
  x: number
  y: number
  zoom: number
}

export function InfiniteWhiteboard({ onUpdate, readOnly = false }: InfiniteWhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [isDrawing, setIsDrawing] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const [pages, setPages] = useState<Page[]>([{ id: 'page-1', strokes: [], backgroundColor: '#1f2937' }])
  const [currentPage, setCurrentPage] = useState(0)
  
  const strokes = pages[currentPage]?.strokes || []
  const setStrokes = (updater: Stroke[] | ((prev: Stroke[]) => Stroke[])) => {
    setPages(prev => {
      const newPages = [...prev]
      const newStrokes = typeof updater === 'function' ? updater(newPages[currentPage].strokes) : updater
      newPages[currentPage] = { ...newPages[currentPage], strokes: newStrokes }
      return newPages
    })
  }
  
  const [currentStroke, setCurrentStroke] = useState<Point[]>([])
  const [color, setColor] = useState('#ffffff')
  const [lineWidth, setLineWidth] = useState(3)
  const [tool, setTool] = useState<'pen' | 'pan'>('pen')
  
  // Viewport state for pan/zoom
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 })
  const lastPanPoint = useRef<Point | null>(null)

  // Colors palette
  const colors = ['#ffffff', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899']

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const container = containerRef.current
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        redrawCanvas()
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  // Convert screen coordinates to world coordinates
  const screenToWorld = useCallback((screenX: number, screenY: number): Point => {
    return {
      x: (screenX - viewport.x) / viewport.zoom,
      y: (screenY - viewport.y) / viewport.zoom
    }
  }, [viewport])

  // Convert world coordinates to screen coordinates
  const worldToScreen = useCallback((worldX: number, worldY: number): Point => {
    return {
      x: worldX * viewport.zoom + viewport.x,
      y: worldY * viewport.zoom + viewport.y
    }
  }, [viewport])

  // Redraw all strokes
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#1f2937' // gray-800
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw infinite grid
    drawGrid(ctx, canvas.width, canvas.height)

    // Draw completed strokes
    ctx.save()
    strokes.forEach(stroke => {
      const screenPoints = stroke.points.map(p => worldToScreen(p.x, p.y))
      drawStroke(ctx, screenPoints, stroke.color, stroke.width * viewport.zoom)
    })

    // Draw current stroke
    if (currentStroke.length > 0) {
      const screenPoints = currentStroke.map(p => worldToScreen(p.x, p.y))
      drawStroke(ctx, screenPoints, color, lineWidth * viewport.zoom)
    }
    ctx.restore()
  }, [strokes, currentStroke, color, lineWidth, viewport, worldToScreen])

  // Draw infinite grid
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 40 * viewport.zoom
    const offsetX = viewport.x % gridSize
    const offsetY = viewport.y % gridSize

    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1

    // Vertical lines
    for (let x = offsetX; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = offsetY; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw origin indicator
    const origin = worldToScreen(0, 0)
    if (origin.x >= 0 && origin.x <= width && origin.y >= 0 && origin.y <= height) {
      ctx.fillStyle = '#3b82f6'
      ctx.beginPath()
      ctx.arc(origin.x, origin.y, 6, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Draw a stroke
  const drawStroke = (
    ctx: CanvasRenderingContext2D,
    points: Point[],
    strokeColor: string,
    width: number
  ) => {
    if (points.length < 2) return

    ctx.strokeStyle = strokeColor
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    
    ctx.stroke()
  }

  // Redraw when data changes
  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

  // Mouse/Touch handlers
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (readOnly) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    
    const x = clientX - rect.left
    const y = clientY - rect.top

    if (tool === 'pan' || (e as React.MouseEvent).button === 1) {
      setIsPanning(true)
      lastPanPoint.current = { x, y }
    } else {
      setIsDrawing(true)
      const worldPoint = screenToWorld(x, y)
      setCurrentStroke([worldPoint])
    }
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    
    const x = clientX - rect.left
    const y = clientY - rect.top

    if (isPanning && lastPanPoint.current) {
      const dx = x - lastPanPoint.current.x
      const dy = y - lastPanPoint.current.y
      setViewport(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }))
      lastPanPoint.current = { x, y }
    } else if (isDrawing) {
      const worldPoint = screenToWorld(x, y)
      setCurrentStroke(prev => [...prev, worldPoint])
    }
  }

  const handleEnd = () => {
    if (isDrawing && currentStroke.length > 0) {
      const newStroke: Stroke = {
        id: `stroke-${Date.now()}`,
        points: currentStroke,
        color,
        width: lineWidth
      }
      const newStrokes = [...strokes, newStroke]
      setStrokes(newStrokes)
      onUpdate?.(pages.map((p, i) => i === currentPage ? { ...p, strokes: newStrokes } : p))
    }
    setIsDrawing(false)
    setIsPanning(false)
    lastPanPoint.current = null
    setCurrentStroke([])
  }

  // Zoom functions
  const zoomIn = () => {
    setViewport(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.2, 5) }))
  }

  const zoomOut = () => {
    setViewport(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.2, 0.2) }))
  }

  const resetView = () => {
    const canvas = canvasRef.current
    if (canvas) {
      setViewport({
        x: canvas.width / 2,
        y: canvas.height / 2,
        zoom: 1
      })
    }
  }

  const undo = () => {
    const newStrokes = strokes.slice(0, -1)
    setStrokes(newStrokes)
    onUpdate?.(pages.map((p, i) => i === currentPage ? { ...p, strokes: newStrokes } : p))
  }

  const clear = () => {
    setStrokes([])
    onUpdate?.(pages.map((p, i) => i === currentPage ? { ...p, strokes: [] } : p))
  }

  // Reset view on mount
  useEffect(() => {
    resetView()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gray-800 overflow-hidden">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${tool === 'pen' ? 'cursor-crosshair' : 'cursor-grab'} ${isPanning ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />

      {/* Toolbar */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 bg-gray-900/90 p-2 rounded-lg border border-gray-700">
        {/* Tools */}
        <div className="flex gap-1">
          <Button
            variant={tool === 'pen' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setTool('pen')}
            className="h-8 w-8"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </Button>
          <Button
            variant={tool === 'pan' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setTool('pan')}
            className="h-8 w-8"
          >
            <Hand className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-full h-px bg-gray-700" />

        {/* Colors */}
        <div className="grid grid-cols-2 gap-1">
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="w-full h-px bg-gray-700" />

        {/* Line width */}
        <div className="flex flex-col gap-1">
          {[2, 4, 8].map(width => (
            <button
              key={width}
              onClick={() => setLineWidth(width)}
              className={`w-full py-1 rounded ${lineWidth === width ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
            >
              <div
                className="mx-auto rounded-full bg-white"
                style={{ width: width * 2, height: width * 2 }}
              />
            </button>
          ))}
        </div>

        <div className="w-full h-px bg-gray-700" />

        {/* Actions */}
        <Button variant="ghost" size="icon" onClick={undo} className="h-8 w-8" disabled={strokes.length === 0}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={clear} className="h-8 w-8" disabled={strokes.length === 0}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-gray-900/90 p-2 rounded-lg border border-gray-700">
        <Button variant="ghost" size="icon" onClick={zoomOut} className="h-8 w-8">
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-sm w-16 text-center">{Math.round(viewport.zoom * 100)}%</span>
        <Button variant="ghost" size="icon" onClick={zoomIn} className="h-8 w-8">
          <Plus className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={resetView} className="text-xs">
          Reset
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-400 bg-gray-900/80 px-3 py-2 rounded-lg">
        <p>🖱️ Draw with mouse | ✋ Middle-click/Select Pan to move</p>
        <p>🔍 Zoom: Ctrl+Scroll or use buttons</p>
      </div>
    </div>
  )
}
