/**
 * Simple Whiteboard Component
 * A streamlined, reliable whiteboard for the Tutor Class Dashboard
 */

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Pencil, 
  Eraser, 
  Square,
  Circle,
  Triangle,
  Type,
  Trash2,
  Download,
  Palette,
  Minus,
  Undo,
  MousePointer,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X,
  Check
} from 'lucide-react'

type Tool = 'pen' | 'eraser' | 'rectangle' | 'circle' | 'triangle' | 'text' | 'select'
type AlignType = 'left' | 'center' | 'right'

interface Point {
  x: number
  y: number
}

interface Stroke {
  id: string
  points: Point[]
  color: string
  width: number
  type: 'pen' | 'eraser'
}

interface Shape {
  id: string
  type: 'rectangle' | 'circle' | 'triangle'
  x: number
  y: number
  width: number
  height: number
  color: string
  lineWidth: number
}

interface TextElement {
  id: string
  text: string
  x: number
  y: number
  color: string
  fontSize: number
  bold: boolean
  italic: boolean
  underline: boolean
  align: AlignType
}

export interface WhiteboardPage {
  strokes: Stroke[]
  shapes: Shape[]
  texts: TextElement[]
}

interface SimpleWhiteboardProps {
  onUpdate?: (strokes: Stroke[]) => void
  readOnly?: boolean
  className?: string
}

const COLORS = ['#000000', '#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#f59e0b']

export function SimpleWhiteboard({ 
  onUpdate, 
  readOnly = false,
  className = ''
}: SimpleWhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(3)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [shapes, setShapes] = useState<Shape[]>([])
  const [texts, setTexts] = useState<TextElement[]>([])
  const [currentStroke, setCurrentStroke] = useState<Point[]>([])
  const [shapeStart, setShapeStart] = useState<Point | null>(null)
  const [tempShape, setTempShape] = useState<Shape | null>(null)
  
  // Text editing state
  const [editingText, setEditingText] = useState<TextElement | null>(null)
  const [editTextValue, setEditTextValue] = useState('')
  const [editTextFormat, setEditTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: 'left' as AlignType
  })
  const [textEditPosition, setTextEditPosition] = useState({ x: 0, y: 0 })

  // Initialize canvas size
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      redrawCanvas()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  // Redraw when data changes
  useEffect(() => {
    redrawCanvas()
  }, [strokes, shapes, texts, currentStroke, tempShape])

  // Notify parent of changes
  useEffect(() => {
    onUpdate?.(strokes)
  }, [strokes, onUpdate])

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Clear with white background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid pattern (subtle)
    ctx.strokeStyle = '#e5e7eb'
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
      drawStroke(ctx, stroke.points, stroke.color, stroke.width, stroke.type === 'eraser')
    })

    // Draw completed shapes
    shapes.forEach(shape => drawShape(ctx, shape))

    // Draw completed texts
    texts.forEach(text => drawTextElement(ctx, text))

    // Draw current stroke
    if (currentStroke.length > 1) {
      drawStroke(ctx, currentStroke, color, lineWidth, tool === 'eraser')
    }

    // Draw temporary shape preview
    if (tempShape) {
      drawShape(ctx, tempShape, true)
    }
  }, [strokes, shapes, texts, currentStroke, tempShape, color, lineWidth, tool])

  const drawStroke = (
    ctx: CanvasRenderingContext2D, 
    points: Point[], 
    strokeColor: string, 
    width: number,
    isEraser: boolean
  ) => {
    if (points.length < 2) return

    ctx.save()
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = 20
    } else {
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = width
    }
    
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    
    ctx.stroke()
    ctx.restore()
  }

  const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape, isTemp = false) => {
    ctx.strokeStyle = shape.color
    ctx.lineWidth = shape.lineWidth
    ctx.lineCap = 'round'

    if (isTemp) {
      ctx.setLineDash([5, 5])
    }

    if (shape.type === 'rectangle') {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
    } else if (shape.type === 'circle') {
      ctx.beginPath()
      ctx.ellipse(
        shape.x + shape.width / 2, 
        shape.y + shape.height / 2, 
        Math.abs(shape.width) / 2, 
        Math.abs(shape.height) / 2, 
        0, 0, Math.PI * 2
      )
      ctx.stroke()
    } else if (shape.type === 'triangle') {
      ctx.beginPath()
      ctx.moveTo(shape.x + shape.width / 2, shape.y)
      ctx.lineTo(shape.x + shape.width, shape.y + shape.height)
      ctx.lineTo(shape.x, shape.y + shape.height)
      ctx.closePath()
      ctx.stroke()
    }

    if (isTemp) {
      ctx.setLineDash([])
    }
  }

  const drawTextElement = (ctx: CanvasRenderingContext2D, text: TextElement) => {
    ctx.fillStyle = text.color
    const fontStyle = `${text.italic ? 'italic ' : ''}${text.bold ? 'bold ' : 'normal'}${text.fontSize}px sans-serif`
    ctx.font = fontStyle
    ctx.textAlign = text.align
    ctx.textBaseline = 'top'

    const lines = text.text.split('\n')
    const lineHeight = text.fontSize * 1.2

    lines.forEach((line, i) => {
      let x = text.x
      if (text.align === 'center') {
        x = text.x + 150 // Approximate center
      } else if (text.align === 'right') {
        x = text.x + 300 // Approximate right
      }
      ctx.fillText(line, x, text.y + i * lineHeight)
    })

    if (text.underline) {
      ctx.strokeStyle = text.color
      ctx.lineWidth = 1
      lines.forEach((line, i) => {
        const y = text.y + (i + 1) * lineHeight - 2
        const metrics = ctx.measureText(line)
        let x = text.x
        if (text.align === 'center') x = text.x + 150 - metrics.width / 2
        if (text.align === 'right') x = text.x + 300 - metrics.width
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + metrics.width, y)
        ctx.stroke()
      })
    }
  }

  const getCanvasPoint = (e: React.MouseEvent): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (readOnly || editingText) return
    
    const point = getCanvasPoint(e)
    
    if (tool === 'pen' || tool === 'eraser') {
      setIsDrawing(true)
      setCurrentStroke([point])
    } else if (tool === 'rectangle' || tool === 'circle' || tool === 'triangle') {
      setShapeStart(point)
    } else if (tool === 'text') {
      // Start text editing
      setEditingText({
        id: 'temp',
        text: '',
        x: point.x,
        y: point.y,
        color: color,
        fontSize: 20,
        bold: false,
        italic: false,
        underline: false,
        align: 'left'
      })
      setEditTextValue('')
      setEditTextFormat({ bold: false, italic: false, underline: false, align: 'left' })
      setTextEditPosition({ x: e.clientX, y: e.clientY })
      // Focus textarea after render
      setTimeout(() => textareaRef.current?.focus(), 0)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (readOnly || editingText) return
    
    const point = getCanvasPoint(e)

    if (isDrawing && (tool === 'pen' || tool === 'eraser')) {
      setCurrentStroke(prev => [...prev, point])
    } else if (shapeStart && (tool === 'rectangle' || tool === 'circle' || tool === 'triangle')) {
      setTempShape({
        id: 'temp',
        type: tool,
        x: shapeStart.x,
        y: shapeStart.y,
        width: point.x - shapeStart.x,
        height: point.y - shapeStart.y,
        color,
        lineWidth
      })
    }
  }

  const handleMouseUp = () => {
    if (readOnly || editingText) return

    if (isDrawing && currentStroke.length > 0) {
      const newStroke: Stroke = {
        id: Date.now().toString(),
        points: currentStroke,
        color,
        width: lineWidth,
        type: tool === 'eraser' ? 'eraser' : 'pen'
      }
      setStrokes(prev => [...prev, newStroke])
      setCurrentStroke([])
      setIsDrawing(false)
    }

    if (shapeStart && tempShape) {
      const newShape: Shape = {
        id: Date.now().toString(),
        type: tempShape.type as 'rectangle' | 'circle' | 'triangle',
        x: tempShape.x,
        y: tempShape.y,
        width: tempShape.width,
        height: tempShape.height,
        color,
        lineWidth
      }
      setShapes(prev => [...prev, newShape])
      setShapeStart(null)
      setTempShape(null)
    }
  }

  const handleUndo = () => {
    if (strokes.length > 0) {
      setStrokes(prev => prev.slice(0, -1))
    } else if (shapes.length > 0) {
      setShapes(prev => prev.slice(0, -1))
    } else if (texts.length > 0) {
      setTexts(prev => prev.slice(0, -1))
    }
  }

  const confirmTextEdit = () => {
    if (editingText && editTextValue.trim()) {
      const newText: TextElement = {
        ...editingText,
        id: Date.now().toString(),
        text: editTextValue,
        ...editTextFormat
      }
      setTexts(prev => [...prev, newText])
    }
    setEditingText(null)
    setEditTextValue('')
  }

  const cancelTextEdit = () => {
    setEditingText(null)
    setEditTextValue('')
  }

  const clearCanvas = () => {
    setStrokes([])
    setShapes([])
    setTexts([])
    setCurrentStroke([])
    setTempShape(null)
    setEditingText(null)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `whiteboard-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-gray-50 flex-wrap">
        {/* Drawing Tools */}
        <div className="flex items-center gap-1">
          <Button
            variant={tool === 'pen' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setTool('pen')}
            className="h-9 w-9"
            title="Pen"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant={tool === 'eraser' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setTool('eraser')}
            className="h-9 w-9"
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Shapes */}
        <div className="flex items-center gap-1">
          <Button
            variant={tool === 'rectangle' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setTool('rectangle')}
            className="h-9 w-9"
            title="Rectangle"
          >
            <Square className="w-4 h-4" />
          </Button>
          <Button
            variant={tool === 'circle' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setTool('circle')}
            className="h-9 w-9"
            title="Circle"
          >
            <Circle className="w-4 h-4" />
          </Button>
          <Button
            variant={tool === 'triangle' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setTool('triangle')}
            className="h-9 w-9"
            title="Triangle"
          >
            <Triangle className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Text Tool */}
        <Button
          variant={tool === 'text' ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setTool('text')}
          className="h-9 w-9"
          title="Text"
        >
          <Type className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300" />

        {/* Color picker */}
        <div className="flex items-center gap-1">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                color === c ? 'border-gray-800 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Line width */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Size:</span>
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

        {/* Undo, Clear, Download */}
        <Button variant="outline" size="sm" onClick={handleUndo} title="Undo">
          <Undo className="w-4 h-4 mr-1" />
          Undo
        </Button>
        <Button variant="outline" size="sm" onClick={clearCanvas}>
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
        <Button variant="outline" size="sm" onClick={downloadCanvas}>
          <Download className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-crosshair"
        style={{ cursor: editingText ? 'default' : tool === 'eraser' ? 'cell' : tool === 'text' ? 'text' : 'crosshair' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        {/* Text Input Overlay */}
        {editingText && (
          <div 
            className="absolute bg-white border-2 border-blue-500 rounded-lg shadow-lg p-2 z-50"
            style={{ 
              left: editingText.x, 
              top: editingText.y, 
              minWidth: '300px',
              maxWidth: '500px'
            }}
          >
            {/* Formatting Toolbar */}
            <div className="flex items-center gap-1 mb-2 pb-2 border-b border-gray-200">
              <Button
                variant={editTextFormat.bold ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setEditTextFormat(prev => ({ ...prev, bold: !prev.bold }))}
                className="h-7 w-7"
              >
                <Bold className="w-3 h-3" />
              </Button>
              <Button
                variant={editTextFormat.italic ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setEditTextFormat(prev => ({ ...prev, italic: !prev.italic }))}
                className="h-7 w-7"
              >
                <Italic className="w-3 h-3" />
              </Button>
              <Button
                variant={editTextFormat.underline ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setEditTextFormat(prev => ({ ...prev, underline: !prev.underline }))}
                className="h-7 w-7"
              >
                <Underline className="w-3 h-3" />
              </Button>
              <div className="w-px h-4 bg-gray-300 mx-1" />
              <Button
                variant={editTextFormat.align === 'left' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setEditTextFormat(prev => ({ ...prev, align: 'left' }))}
                className="h-7 w-7"
              >
                <AlignLeft className="w-3 h-3" />
              </Button>
              <Button
                variant={editTextFormat.align === 'center' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setEditTextFormat(prev => ({ ...prev, align: 'center' }))}
                className="h-7 w-7"
              >
                <AlignCenter className="w-3 h-3" />
              </Button>
              <Button
                variant={editTextFormat.align === 'right' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setEditTextFormat(prev => ({ ...prev, align: 'right' }))}
                className="h-7 w-7"
              >
                <AlignRight className="w-3 h-3" />
              </Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" onClick={cancelTextEdit} className="h-7 w-7">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Text Area */}
            <textarea
              ref={textareaRef}
              value={editTextValue}
              onChange={(e) => setEditTextValue(e.target.value)}
              placeholder="Type your text here..."
              className="w-full min-h-[80px] p-2 border border-gray-200 rounded resize-none focus:outline-none focus:border-blue-500"
              style={{
                fontSize: '16px',
                fontWeight: editTextFormat.bold ? 'bold' : 'normal',
                fontStyle: editTextFormat.italic ? 'italic' : 'normal',
                textDecoration: editTextFormat.underline ? 'underline' : 'none',
                textAlign: editTextFormat.align
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) {
                  confirmTextEdit()
                }
                if (e.key === 'Escape') {
                  cancelTextEdit()
                }
              }}
            />

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-gray-200">
              <Button size="sm" variant="outline" onClick={cancelTextEdit}>
                Cancel
              </Button>
              <Button size="sm" onClick={confirmTextEdit}>
                <Check className="w-4 h-4 mr-1" />
                Add Text
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
        <span>
          {tool === 'pen' && 'Drawing mode - Click and drag to draw'}
          {tool === 'eraser' && 'Eraser mode - Click and drag to erase'}
          {tool === 'rectangle' && 'Rectangle mode - Click and drag to draw'}
          {tool === 'circle' && 'Circle mode - Click and drag to draw'}
          {tool === 'triangle' && 'Triangle mode - Click and drag to draw'}
          {tool === 'text' && 'Text mode - Click to place text'}
        </span>
        <span>{strokes.length} strokes, {shapes.length} shapes, {texts.length} texts</span>
      </div>
    </div>
  )
}
