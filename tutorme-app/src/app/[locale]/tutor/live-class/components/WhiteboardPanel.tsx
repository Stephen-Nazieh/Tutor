'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Pencil,
  Eraser,
  Square,
  Circle,
  Type,
  Undo,
  Redo,
  Download,
  Trash2,
  X,
  Palette,
  Minus,
  Plus
} from 'lucide-react'

type Tool = 'pencil' | 'eraser' | 'rectangle' | 'circle' | 'text'

interface WhiteboardPanelProps {
  onClose: () => void
}

const COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
]

export function WhiteboardPanel({ onClose }: WhiteboardPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<Tool>('pencil')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(3)
  const [isDrawing, setIsDrawing] = useState(false)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyStep, setHistoryStep] = useState(-1)

  const saveState = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newHistory = history.slice(0, historyStep + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryStep(newHistory.length - 1)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set white background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
  }, [])

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      setHistoryStep(historyStep - 1)
      ctx.putImageData(history[historyStep - 1], 0, 0)
    }
  }

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      setHistoryStep(historyStep + 1)
      ctx.putImageData(history[historyStep + 1], 0, 0)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveState()
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `whiteboard-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === 'pencil' || tool === 'eraser') {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveState()
    }
  }

  return (
    <div className="absolute inset-4 bg-white rounded-lg shadow-2xl z-40 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b">
        <div className="flex items-center gap-2">
          {/* Tools */}
          <div className="flex items-center bg-white rounded-lg p-1 border">
            {[
              { id: 'pencil', icon: Pencil },
              { id: 'eraser', icon: Eraser },
              { id: 'rectangle', icon: Square },
              { id: 'circle', icon: Circle },
              { id: 'text', icon: Type }
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTool(id as Tool)}
                className={`p-2 rounded ${tool === id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="w-px h-8 bg-gray-300" />

          {/* Colors */}
          <div className="flex items-center gap-1">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="w-px h-8 bg-gray-300" />

          {/* Brush Size */}
          <div className="flex items-center gap-2 w-32">
            <Minus className="w-3 h-3" />
            <Slider
              value={[brushSize]}
              onValueChange={([value]) => setBrushSize(value)}
              min={1}
              max={20}
              step={1}
            />
            <Plus className="w-3 h-3" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={undo} disabled={historyStep <= 0}>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={redo} disabled={historyStep >= history.length - 1}>
            <Redo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={clearCanvas}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={downloadCanvas}>
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="cursor-crosshair shadow-lg"
        />
      </div>
    </div>
  )
}
