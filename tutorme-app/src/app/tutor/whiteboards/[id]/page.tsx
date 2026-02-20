'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  ArrowLeft,
  Save,
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Palette,
  Hand,
  MousePointer2,
  Minus,
  Loader2,
  Share2,
  Copy
} from 'lucide-react'
import { toast } from 'sonner'
import { useWhiteboardSocket } from '@/hooks/use-whiteboard-socket'
import { useSession } from 'next-auth/react'

type Tool = 'pen' | 'eraser' | 'hand' | 'select' | 'rectangle' | 'circle' | 'text'

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
  userId: string
}

interface Page {
  id: string
  name: string
  order: number
  strokes: Stroke[]
  backgroundColor: string
  backgroundStyle: string
}

const COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#333333', '#666666', '#999999', '#CCCCCC'
]

export default function WhiteboardEditorPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()
  const whiteboardId = params.id as string
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [whiteboard, setWhiteboard] = useState<any>(null)
  const [pages, setPages] = useState<Page[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(3)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStroke, setCurrentStroke] = useState<Point[]>([])
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [snapshotName, setSnapshotName] = useState('')
  const [showSnapshotDialog, setShowSnapshotDialog] = useState(false)
  
  const currentPage = pages[currentPageIndex]

  // Socket.io for real-time collaboration
  const {
    isConnected: isSocketConnected,
    activeUsers,
    sendStroke,
  } = useWhiteboardSocket({
    whiteboardId,
    roomId: whiteboardId,
    userId: session?.user?.id || '',
    userName: session?.user?.name || 'Anonymous',
    userColor: '#3b82f6',
    onStroke: (stroke) => {
      if (!pages[currentPageIndex]) return
      const newPages = [...pages]
      newPages[currentPageIndex].strokes.push(stroke)
      setPages(newPages)
      redrawCanvas()
    },
  })

  // Load whiteboard data
  useEffect(() => {
    if (!whiteboardId) return
    fetchWhiteboard()
  }, [whiteboardId])

  const fetchWhiteboard = async () => {
    try {
      const res = await fetch(`/api/whiteboards/${whiteboardId}?pages=true`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to fetch whiteboard')
      const data = await res.json()
      setWhiteboard(data.whiteboard)
      setPages(data.whiteboard.pages || [])
    } catch (error) {
      toast.error('Failed to load whiteboard')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || !currentPage) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      redrawCanvas()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [currentPage])

  // Redraw canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !currentPage) return

    // Clear and set background
    ctx.fillStyle = currentPage.backgroundColor || '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid/dots/lines if needed
    drawBackground(ctx, canvas.width, canvas.height, currentPage.backgroundStyle)

    ctx.save()
    ctx.translate(pan.x, pan.y)
    ctx.scale(scale, scale)

    // Draw strokes
    currentPage.strokes?.forEach(stroke => {
      drawStroke(ctx, stroke)
    })

    // Draw current stroke
    if (currentStroke.length > 0) {
      drawStroke(ctx, {
        id: 'temp',
        points: currentStroke,
        color: tool === 'eraser' ? '#ffffff' : color,
        width: tool === 'eraser' ? 20 : brushSize,
        type: tool === 'eraser' ? 'eraser' : 'pen',
        userId: '',
      })
    }

    ctx.restore()
  }, [currentPage, scale, pan, currentStroke, color, brushSize, tool])

  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, style: string) => {
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    switch (style) {
      case 'grid':
        for (let x = 0; x < width; x += 40) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.stroke()
        }
        for (let y = 0; y < height; y += 40) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }
        break
      case 'dots':
        ctx.fillStyle = '#e5e7eb'
        for (let x = 20; x < width; x += 40) {
          for (let y = 20; y < height; y += 40) {
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        break
      case 'lines':
        for (let y = 0; y < height; y += 40) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }
        break
    }
  }

  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length < 2) return

    if (stroke.type === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
    } else {
      ctx.strokeStyle = stroke.color
      ctx.globalCompositeOperation = 'source-over'
    }

    ctx.lineWidth = stroke.width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
    stroke.points.forEach((point, i) => {
      if (i > 0) ctx.lineTo(point.x, point.y)
    })
    ctx.stroke()
    ctx.globalCompositeOperation = 'source-over'
  }

  const screenToCanvas = (screenX: number, screenY: number): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: (screenX - rect.left - pan.x) / scale,
      y: (screenY - rect.top - pan.y) / scale,
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!currentPage) return

    if (tool === 'hand') {
      setIsPanning(true)
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
      return
    }

    setIsDrawing(true)
    const point = screenToCanvas(e.clientX, e.clientY)
    setCurrentStroke([point])
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y })
      return
    }

    if (!isDrawing) return
    const point = screenToCanvas(e.clientX, e.clientY)
    setCurrentStroke(prev => [...prev, point])
  }

  const handleMouseUp = async () => {
    if (isPanning) {
      setIsPanning(false)
      return
    }

    if (!isDrawing || currentStroke.length === 0) return
    setIsDrawing(false)

    const newStroke: Stroke = {
      id: Date.now().toString(),
      points: currentStroke,
      color: tool === 'eraser' ? '#ffffff' : color,
      width: tool === 'eraser' ? 20 : brushSize,
      type: tool === 'eraser' ? 'eraser' : 'pen',
      userId: session?.user?.id || '',
    }

    // Add to local state
    const newPages = [...pages]
    newPages[currentPageIndex].strokes.push(newStroke)
    setPages(newPages)
    setCurrentStroke([])

    // Send via socket
    sendStroke(newStroke)

    // Save to server
    await savePage()
  }

  const savePage = async () => {
    if (!currentPage) return
    setSaving(true)

    try {
      const res = await fetch(`/api/whiteboards/${whiteboardId}/pages/${currentPage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          strokes: currentPage.strokes,
          viewState: { scale, panX: pan.x, panY: pan.y },
        }),
      })

      if (!res.ok) throw new Error('Failed to save')
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleClear = async () => {
    if (!currentPage) return
    if (!confirm('Clear all content from this page?')) return

    const newPages = [...pages]
    newPages[currentPageIndex].strokes = []
    setPages(newPages)

    await savePage()
    toast.success('Page cleared')
  }

  const handleUndo = async () => {
    if (!currentPage || currentPage.strokes.length === 0) return

    const newPages = [...pages]
    newPages[currentPageIndex].strokes.pop()
    setPages(newPages)

    await savePage()
  }

  const handleExport = async (format: string) => {
    try {
      const res = await fetch(`/api/whiteboards/${whiteboardId}/export?format=${format}`, {
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Export failed')

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${whiteboard.title}.${format}`
      a.click()
      toast.success('Export downloaded')
    } catch (error) {
      toast.error('Export failed')
    }
  }

  const handleCreateSnapshot = async () => {
    if (!snapshotName.trim()) return

    try {
      const res = await fetch(`/api/whiteboards/${whiteboardId}/snapshots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: snapshotName }),
      })

      if (!res.ok) throw new Error('Failed to create snapshot')
      
      toast.success('Snapshot created')
      setShowSnapshotDialog(false)
      setSnapshotName('')
    } catch (error) {
      toast.error('Failed to create snapshot')
    }
  }

  const handleAddPage = async () => {
    try {
      const res = await fetch(`/api/whiteboards/${whiteboardId}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: `Page ${pages.length + 1}` }),
      })

      if (!res.ok) throw new Error('Failed to create page')
      
      const data = await res.json()
      setPages([...pages, data.page])
      setCurrentPageIndex(pages.length)
      toast.success('Page added')
    } catch (error) {
      toast.error('Failed to add page')
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale(prev => Math.max(0.1, Math.min(5, prev * delta)))
  }

  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!whiteboard) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Whiteboard not found</p>
        <Link href="/tutor/whiteboards">
          <Button>Back to Whiteboards</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/tutor/whiteboards">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold">{whiteboard.title}</h1>
            {isSocketConnected && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Live ({activeUsers.length} users)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          {pages.length > 1 && (
            <div className="flex items-center gap-2 mr-4">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPageIndex === 0}
                onClick={() => setCurrentPageIndex(prev => prev - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600">
                {currentPageIndex + 1} / {pages.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPageIndex === pages.length - 1}
                onClick={() => setCurrentPageIndex(prev => prev + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" onClick={() => handleAddPage()}>
            <Plus className="w-4 h-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSnapshotDialog(true)}
          >
            <Save className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('svg')}>
                <Download className="w-4 h-4 mr-2" />
                Export SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowShareDialog(true)}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {saving && (
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-14 bg-white border-b flex items-center px-4 gap-4">
        {/* Tools */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'pen', icon: Pencil, label: 'Pen' },
            { id: 'eraser', icon: Eraser, label: 'Eraser' },
            { id: 'hand', icon: Hand, label: 'Pan' },
          ].map(({ id, icon: Icon, label }) => (
            <TooltipProvider key={id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setTool(id as Tool)}
                    className={`p-2 rounded ${tool === id ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="w-px h-8 bg-gray-200" />

        {/* Colors */}
        <div className="flex items-center gap-1">
          {COLORS.slice(0, 8).map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="w-px h-8 bg-gray-200" />

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
          <span className="text-xs w-6">{brushSize}</span>
        </div>

        <div className="w-px h-8 bg-gray-200" />

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.1, s - 0.1))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm w-16 text-center">{Math.round(scale * 100)}%</span>
          <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.min(5, s + 0.1))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <Button variant="ghost" size="icon" onClick={handleUndo}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleClear}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Canvas */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-hidden relative"
        onWheel={handleWheel}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`absolute inset-0 ${tool === 'hand' ? 'cursor-grab' : 'cursor-crosshair'} ${isPanning ? 'cursor-grabbing' : ''}`}
        />
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Whiteboard</DialogTitle>
            <DialogDescription>
              Share this whiteboard with others to collaborate in real-time.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>Share Link</Label>
            <div className="flex gap-2 mt-2">
              <Input 
                value={`${window.location.origin}/class/${whiteboardId}`}
                readOnly
              />
              <Button 
                variant="outline" 
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/class/${whiteboardId}`)
                  toast.success('Link copied')
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Snapshot Dialog */}
      <Dialog open={showSnapshotDialog} onOpenChange={setShowSnapshotDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Snapshot</DialogTitle>
            <DialogDescription>
              Save a snapshot of the current whiteboard state.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>Snapshot Name</Label>
            <Input
              placeholder="e.g., Before Class"
              value={snapshotName}
              onChange={(e) => setSnapshotName(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSnapshotDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSnapshot} disabled={!snapshotName.trim()}>
              Create Snapshot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
