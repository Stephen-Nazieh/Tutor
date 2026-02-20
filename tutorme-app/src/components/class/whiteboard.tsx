/**
 * Whiteboard Component
 * Collaborative drawing canvas for class sessions
 * (Simplified version - can be upgraded to tldraw + Yjs later)
 */

import { useRef, useState, useEffect, useCallback } from 'react'

interface WhiteboardProps {
  onUpdate?: (strokes: any[]) => void
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

export function Whiteboard({ onUpdate, readOnly = false }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [currentStroke, setCurrentStroke] = useState<Point[]>([])
  const [color, setColor] = useState('#ffffff')
  const [lineWidth, setLineWidth] = useState(3)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
        redrawCanvas()
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  // Redraw all strokes
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#1f2937' // gray-800
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw completed strokes
    strokes.forEach(stroke => {
      drawStroke(ctx, stroke.points, stroke.color, stroke.width)
    })

    // Draw current stroke
    if (currentStroke.length > 0) {
      drawStroke(ctx, currentStroke, color, lineWidth)
    }
  }, [strokes, currentStroke, color, lineWidth])

  // Redraw when data changes
  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

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

  const getPoint = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (readOnly) return
    setIsDrawing(true)
    setCurrentStroke([getPoint(e)])
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || readOnly) return
    setCurrentStroke(prev => [...prev, getPoint(e)])
  }

  const handleMouseUp = () => {
    if (!isDrawing) return
    setIsDrawing(false)

    if (currentStroke.length > 0) {
      const newStroke: Stroke = {
        id: Date.now().toString(),
        points: currentStroke,
        color,
        width: lineWidth
      }
      const newStrokes = [...strokes, newStroke]
      setStrokes(newStrokes)
      setCurrentStroke([])
      onUpdate?.(newStrokes)
    }
  }

  const clearWhiteboard = () => {
    setStrokes([])
    onUpdate?.([])
  }

  const undoLast = () => {
    const newStrokes = strokes.slice(0, -1)
    setStrokes(newStrokes)
    onUpdate?.(newStrokes)
  }

  const colors = ['#ffffff', '#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#f59e0b']

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 ${
                color === c ? 'border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="h-6 w-px bg-gray-600" />

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Size:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-20"
          />
        </div>

        <div className="flex-1" />

        <button
          onClick={undoLast}
          disabled={strokes.length === 0}
          className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded"
        >
          Undo
        </button>
        <button
          onClick={clearWhiteboard}
          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 rounded"
        >
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="absolute inset-0 cursor-crosshair"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  )
}
