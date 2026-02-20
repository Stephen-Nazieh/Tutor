/**
 * Enhanced Whiteboard Component (Refactored)
 * Uses extracted hooks and separate canvas renderer
 * Reduced from 1436 lines to ~400 lines
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Plus, Trash2, ChevronLeft, ChevronRight,
  Type, Hand, MousePointer2, Square, Circle, Triangle, Minus,
  GripVertical, Volume2, Upload, Image as ImageIcon, FileText, FolderOpen, Bot
} from 'lucide-react'
import {
  useCanvasDrawing, usePanZoom, useWhiteboardPages,
  useTextEditor, useShapeDrawing, type Point, type Tool
} from '../hooks'
import { DrawingToolbar } from '../toolbar/DrawingToolbar'
import { ZoomControls } from '../toolbar/ZoomControls'
import { PageNavigator } from '../toolbar/PageNavigator'
import { CanvasRenderer } from './CanvasRenderer'
import { TeachingAssistant } from '../teaching-assistant'

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

interface Asset {
  id: string
  type: 'image' | 'document'
  name: string
  url: string
  thumbnail?: string
}

interface EnhancedWhiteboardProps {
  onUpdate?: (pages: any[]) => void
  readOnly?: boolean
  videoOverlay?: boolean
  onToggleVideoFullscreen?: () => void
  isVideoFullscreen?: boolean
  videoComponent?: React.ReactNode
  pages?: any[]
  currentPageIndex?: number
  onPagesChange?: (pages: any[]) => void
  onPageIndexChange?: (index: number) => void
  students?: Student[]
  onPushHint?: (studentId: string, hint: string) => void
}

const COLORS = ['#000000', '#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ffffff']
const BACKGROUND_COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#1f2937' },
  { name: 'Blue', value: '#1e3a5f' },
  { name: 'Green', value: '#1a3d2e' },
  { name: 'Dark Gray', value: '#374151' },
  { name: 'Cream', value: '#fef3c7' },
]

export function EnhancedWhiteboard({
  onUpdate, readOnly = false, videoOverlay = true,
  onToggleVideoFullscreen, isVideoFullscreen = false, videoComponent,
  pages: externalPages, currentPageIndex: externalPageIndex,
  onPagesChange, onPageIndexChange, students: externalStudents, onPushHint
}: EnhancedWhiteboardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use pages hook
  const {
    pages, currentPageIndex, currentPage,
    addPage, deletePage, setCurrentPageIndex,
    updatePageBackground, setPages
  } = useWhiteboardPages({
    externalPages, externalPageIndex, onPagesChange, onPageIndexChange
  })

  // Tool state
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(3)

  // Canvas hooks
  const { strokes, isDrawing, currentStroke, startDrawing, continueDrawing, endDrawing, undoStroke } = 
    useCanvasDrawing({ color, lineWidth, tool, onUpdate })
  
  const { scale, pan, zoomIn, zoomOut, resetZoom, startPanning, continuePanning, endPanning } = 
    usePanZoom()
  
  const { textOverlays, selectedTextId, startTextEditing, updateText, confirmText, deleteText } = 
    useTextEditor()
  
  const { shapes, tempShape, startShape, continueShape, finishShape } = 
    useShapeDrawing()

  // UI state
  const [showTeachingAssistant, setShowTeachingAssistant] = useState(false)
  const [showAssetSidebar, setShowAssetSidebar] = useState(false)
  const [assets, setAssets] = useState<Asset[]>([])
  const [selectedObject, setSelectedObject] = useState<{ type: string; id: string } | null>(null)

  // Mock students
  const mockStudents: Student[] = [
    { id: '1', name: 'Zhang Wei', status: 'active', engagement: 85, understanding: 80, frustration: 10, lastActive: new Date() },
    { id: '2', name: 'Li Na', status: 'struggling', engagement: 60, understanding: 45, frustration: 40, lastActive: new Date() },
    { id: '3', name: 'Wang Tao', status: 'active', engagement: 90, understanding: 85, frustration: 5, lastActive: new Date() },
    { id: '4', name: 'Chen Xi', status: 'needs_help', engagement: 70, understanding: 55, frustration: 30, lastActive: new Date() },
  ]
  const students = externalStudents ?? mockStudents

  // Sync page data
  useEffect(() => {
    if (!externalPages) {
      setPages(pages.map((p, i) => i === currentPageIndex ? { ...p, strokes, texts: textOverlays, shapes } : p))
    }
  }, [strokes, textOverlays, shapes])

  // Coordinate conversion
  const screenToCanvas = useCallback((x: number, y: number): Point => ({
    x: (x - pan.x) / scale,
    y: (y - pan.y) / scale
  }), [pan, scale])

  // Event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (readOnly) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const point = screenToCanvas(e.clientX - rect.left, e.clientY - rect.top)

    if (tool === 'hand') startPanning(e.clientX, e.clientY)
    else if (tool === 'pen' || tool === 'eraser') startDrawing(point)
    else if (tool === 'shape') startShape(point, 'rectangle', color, lineWidth)
  }, [readOnly, tool, screenToCanvas, startPanning, startDrawing, startShape, color, lineWidth])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const point = screenToCanvas(e.clientX - rect.left, e.clientY - rect.top)

    if (tool === 'hand' && pan) continuePanning(e.clientX, e.clientY)
    else if ((tool === 'pen' || tool === 'eraser') && isDrawing) continueDrawing(point)
    else if (tool === 'shape' && tempShape) continueShape(point)
  }, [tool, pan, isDrawing, tempShape, screenToCanvas, continuePanning, continueDrawing, continueShape])

  const handleMouseUp = useCallback(() => {
    if (tool === 'hand') endPanning()
    else if (tool === 'pen' || tool === 'eraser') endDrawing()
    else if (tool === 'shape' && tempShape) {
      const shape = finishShape()
      if (shape) {
        const newPages = [...pages]
        newPages[currentPageIndex].shapes.push(shape)
        setPages(newPages)
      }
    }
  }, [tool, tempShape, endPanning, endDrawing, finishShape, pages, currentPageIndex, setPages])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObject) {
      if (selectedObject.type === 'text') deleteText(selectedObject.id)
      setSelectedObject(null)
    }
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault()
      undoStroke()
    }
  }, [selectedObject, deleteText, undoStroke])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-white border-b">
        <DrawingToolbar
          tool={tool}
          onToolChange={setTool}
          color={color}
          onColorChange={setColor}
          lineWidth={lineWidth}
          onLineWidthChange={setLineWidth}
        />
        <div className="w-px h-8 bg-gray-200 mx-2" />
        <ZoomControls scale={scale} onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetZoom} />
        <div className="w-px h-8 bg-gray-200 mx-2" />
        <PageNavigator
          currentPage={currentPageIndex + 1}
          totalPages={pages.length}
          onPrevious={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
          onNext={() => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1))}
          onAdd={addPage}
        />
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={() => setShowAssetSidebar(!showAssetSidebar)}>
          <FolderOpen className="w-4 h-4 mr-1" /> Assets
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowTeachingAssistant(!showTeachingAssistant)}>
          <Bot className="w-4 h-4 mr-1" /> AI Assistant
        </Button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex overflow-hidden">
        <div ref={containerRef} className="flex-1 relative overflow-hidden bg-gray-100"
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          <CanvasRenderer
            strokes={currentPage.strokes}
            texts={currentPage.texts}
            shapes={currentPage.shapes}
            currentStroke={currentStroke}
            tempShape={tempShape}
            backgroundColor={currentPage.backgroundColor}
            backgroundStyle={currentPage.backgroundStyle}
            scale={scale}
            pan={pan}
            selectedObject={selectedObject}
          />
          
          {/* Video Overlay */}
          {videoOverlay && videoComponent && !isVideoFullscreen && (
            <div className="absolute top-4 right-4 w-64 h-48 bg-black rounded-lg overflow-hidden shadow-lg">
              {videoComponent}
            </div>
          )}
        </div>

        {/* Teaching Assistant Sidebar */}
        {showTeachingAssistant && (
          <div className="w-80 border-l bg-white">
            <TeachingAssistant
              students={students}
              onPushHint={onPushHint || ((id, hint) => console.log('Push hint:', id, hint))}
            />
          </div>
        )}

        {/* Asset Sidebar */}
        {showAssetSidebar && (
          <div className="w-64 border-l bg-white p-4">
            <h3 className="font-semibold mb-3">Assets</h3>
            <div className="space-y-2">
              {assets.map(asset => (
                <div key={asset.id} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50">
                  {asset.type === 'image' ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  <span className="text-sm truncate">{asset.name}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Upload className="w-4 h-4 mr-1" /> Upload
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EnhancedWhiteboard
