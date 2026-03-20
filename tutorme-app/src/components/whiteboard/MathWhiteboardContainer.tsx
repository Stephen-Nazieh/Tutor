'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useMathWhiteboard } from '@/hooks/use-math-whiteboard'
import { useKeyboardShortcuts, KEYBOARD_SHORTCUTS } from '@/hooks/use-keyboard-shortcuts'
import { MathCanvas } from './MathCanvas'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Lock,
  Unlock,
  Users,
  MousePointer,
  Pencil,
  Eraser,
  Square,
  Circle,
  Minus,
  ArrowRight,
  Type,
  FunctionSquare,
  Grid3x3,
  Hand,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Palette,
  Download,
  Calculator,
  Undo2,
  Redo2,
  X,
  FileUp,
  FileDown,
  ImagePlus,
  Target,
  Command,
  Magnet,
} from 'lucide-react'
import { EquationEditor } from './MathRenderer'
import { GraphEditor } from './GraphRenderer'
import { PdfOverlay, PdfUploader, PdfPageManager, exportPdfWithAnnotations } from './PdfOverlay'
import { ElementPropertiesPanel } from './ElementPropertiesPanel'
import { LaserPointer, RemoteLaserPointer } from './LaserPointer'
import { BackgroundTemplates, BackgroundSelector, type BackgroundType } from './BackgroundTemplates'
import { ImageUpload } from './ImageUpload'
import { AIMathAssistant } from './AIMathAssistant'
import type { GraphElement, EquationElement, AnyMathElement } from '@/types/math-whiteboard'
import type { ToolType } from '@/types/math-whiteboard'

interface MathWhiteboardContainerProps {
  sessionId: string
  className?: string
}

const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 800

const COLORS = [
  '#000000',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#d946ef',
  '#f43f5e',
  '#78716c',
]

const STROKE_WIDTHS = [1, 2, 3, 5, 8, 12]

// Remote cursor type
interface RemoteCursor {
  userId: string
  name: string
  color: string
  x: number
  y: number
}

export function MathWhiteboardContainer({
  sessionId,
  className = '',
}: MathWhiteboardContainerProps) {
  const { data: session } = useSession()
  const userId = session?.user?.id || 'anonymous'
  const userName = session?.user?.name || 'User'
  const userRole = (session?.user?.role?.toLowerCase() as 'tutor' | 'student') || 'student'

  const {
    isConnected,
    isConnecting,
    isLocked,
    canEdit,
    currentPage,
    totalPages,
    elements,
    selectedIds,
    participants,
    transform,
    activeTool,
    toolSettings,
    error,
    isLocalMode,
    canUndo,
    canRedo,
    setLock,
    changePage,
    createElement,
    updateElement,
    deleteElement,
    selectElements,
    clearSelection,
    setTransform,
    setActiveTool,
    setToolSettings,
    sendCursor,
    enableLocalMode,
    undo,
    redo,
  } = useMathWhiteboard({
    sessionId,
    userId,
    name: userName,
    role: userRole,
  })

  // State
  const [zoom, setZoom] = useState(100)
  const [showEquationEditor, setShowEquationEditor] = useState(false)
  const [showGraphEditor, setShowGraphEditor] = useState(false)
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('grid')
  const [snapToGrid, setSnapToGrid] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // PDF state
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfFileName, setPdfFileName] = useState<string>('')
  const [pdfPage, setPdfPage] = useState(1)
  const [pdfTotalPages, setPdfTotalPages] = useState(0)
  const [showPdfUploader, setShowPdfUploader] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const remoteCursors = useMemo<RemoteCursor[]>(
    () =>
      participants
        .filter(
          participant => participant.userId && participant.userId !== userId && participant.cursor
        )
        .map(participant => ({
          userId: participant.userId || participant.name,
          name: participant.name,
          color: participant.color,
          x: participant.cursor!.x,
          y: participant.cursor!.y,
        })),
    [participants, userId]
  )

  // Selected element for properties panel
  const selectedElement =
    selectedIds.length === 1 ? elements.find(el => el.id === selectedIds[0]) : null

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    const newScale = Math.min(transform.scale * 1.2, 3)
    setTransform({ ...transform, scale: newScale })
    setZoom(Math.round(newScale * 100))
  }, [transform, setTransform])

  const handleZoomOut = useCallback(() => {
    const newScale = Math.max(transform.scale / 1.2, 0.3)
    setTransform({ ...transform, scale: newScale })
    setZoom(Math.round(newScale * 100))
  }, [transform, setTransform])

  const handleResetZoom = useCallback(() => {
    setTransform({ ...transform, scale: 1 })
    setZoom(100)
  }, [transform, setTransform])

  // Clear all
  const handleClearAll = useCallback(() => {
    if (confirm('Are you sure you want to clear all elements?')) {
      elements.forEach(el => deleteElement(el.id))
    }
  }, [elements, deleteElement])

  // Delete selected
  const handleDeleteSelected = useCallback(() => {
    selectedIds.forEach(id => deleteElement(id))
    clearSelection()
  }, [selectedIds, deleteElement, clearSelection])

  // Export
  const handleExport = useCallback(() => {
    const data = {
      sessionId,
      page: currentPage,
      elements,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `whiteboard-${sessionId}-page-${currentPage + 1}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [sessionId, currentPage, elements])

  // Duplicate element
  const handleDuplicateElement = useCallback(() => {
    if (!selectedElement) return

    const duplicated: AnyMathElement = {
      ...selectedElement,
      id: `${selectedElement.type}-${Date.now()}`,
      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
      version: 1,
      lastModified: Date.now(),
    }
    createElement(duplicated)
  }, [selectedElement, createElement])

  // Show editors
  const handleShowEquationEditor = useCallback((pos: { x: number; y: number }) => {
    setPendingPosition(pos)
    setShowEquationEditor(true)
    setIsEditing(true)
  }, [])

  const handleShowGraphEditor = useCallback((pos: { x: number; y: number }) => {
    setPendingPosition(pos)
    setShowGraphEditor(true)
    setIsEditing(true)
  }, [])

  // Create elements
  const handleEquationCreate = useCallback(
    (latex: string) => {
      if (!pendingPosition) return

      const element: EquationElement = {
        id: `eq-${Date.now()}`,
        type: 'equation',
        authorId: userId,
        layer: 0,
        locked: false,
        x: snapToGrid ? Math.round(pendingPosition.x / 20) * 20 : pendingPosition.x,
        y: snapToGrid ? Math.round(pendingPosition.y / 20) * 20 : pendingPosition.y,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        version: 1,
        lastModified: Date.now(),
        modifiedBy: userId,
        latex,
        fontSize: toolSettings.fontSize,
        color: toolSettings.strokeColor,
      }

      createElement(element)
      setShowEquationEditor(false)
      setPendingPosition(null)
      setActiveTool('select')
      setIsEditing(false)
    },
    [pendingPosition, userId, toolSettings, createElement, snapToGrid]
  )

  const handleGraphCreate = useCallback(
    (graphElement: GraphElement) => {
      if (!pendingPosition) return

      const element: GraphElement = {
        ...graphElement,
        id: `graph-${Date.now()}`,
        x: snapToGrid ? Math.round(pendingPosition.x / 20) * 20 : pendingPosition.x,
        y: snapToGrid ? Math.round(pendingPosition.y / 20) * 20 : pendingPosition.y,
      }

      createElement(element)
      setShowGraphEditor(false)
      setPendingPosition(null)
      setActiveTool('select')
      setIsEditing(false)
    },
    [pendingPosition, createElement, snapToGrid]
  )

  // PDF handlers
  const handlePdfUpload = useCallback((file: File, url: string) => {
    setPdfUrl(url)
    setPdfFileName(file.name)
    setPdfPage(1)
    setShowPdfUploader(false)
  }, [])

  const handlePdfPageChange = useCallback((page: number) => {
    setPdfPage(page)
  }, [])

  const handlePdfRemove = useCallback(() => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
    }
    setPdfUrl(null)
    setPdfFileName('')
    setPdfPage(1)
    setPdfTotalPages(0)
  }, [pdfUrl])

  const handlePdfExport = useCallback(async () => {
    if (!pdfUrl) return

    setIsExporting(true)
    try {
      await exportPdfWithAnnotations({
        pdfUrl,
        annotations: elements,
        currentPage: pdfPage,
      })
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }, [pdfUrl, elements, pdfPage])

  // Image upload handler
  const handleImageUpload = useCallback(
    (element: AnyMathElement) => {
      createElement(element)
    },
    [createElement]
  )

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: undo,
    onRedo: redo,
    onExport: handleExport,
    onClear: handleClearAll,
    onDelete: handleDeleteSelected,
    onSetTool: setActiveTool,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onResetZoom: handleResetZoom,
    canUndo,
    canRedo,
    activeTool,
    isEditing,
  })

  // Loading state
  if (isConnecting) {
    return (
      <div className={`flex h-full items-center justify-center bg-slate-50 ${className}`}>
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
          <p className="mt-4 text-sm text-slate-600">Connecting to math whiteboard...</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={enableLocalMode}>
            Work Offline
          </Button>
        </div>
      </div>
    )
  }

  if (!isConnected && !isLocalMode) {
    return (
      <div className={`flex h-full items-center justify-center bg-slate-50 ${className}`}>
        <div className="max-w-md px-4 text-center">
          <p className="font-medium text-red-600">Connection failed</p>
          <p className="mt-2 text-sm text-slate-600">
            {error || 'Could not connect to the collaborative server.'}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="default" size="sm" onClick={() => window.location.reload()}>
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={enableLocalMode}>
              Work Offline
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const ToolButton = ({
    tool,
    icon: Icon,
    title,
    disabled = false,
  }: {
    tool: ToolType
    icon: any
    title: string
    disabled?: boolean
  }) => (
    <Button
      variant={activeTool === tool ? 'default' : 'outline'}
      size="sm"
      onClick={() => setActiveTool(tool)}
      disabled={disabled || !canEdit}
      title={title}
      className="h-9 w-9 p-0"
    >
      <Icon className="h-4 w-4" />
    </Button>
  )

  return (
    <div className={`flex h-full flex-col bg-slate-50 ${className}`}>
      {/* Header Toolbar */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2">
        {/* Left: Tools */}
        <div className="flex items-center gap-1">
          <ToolButton tool="select" icon={MousePointer} title="Select (V)" />
          <ToolButton tool="hand" icon={Hand} title="Pan (H)" />
          <ToolButton tool="laser" icon={Target} title="Laser (F)" />
          <div className="mx-1 h-6 w-px bg-slate-300" />
          <ToolButton tool="pen" icon={Pencil} title="Pen (P)" />
          <ToolButton tool="eraser" icon={Eraser} title="Eraser (E)" />
          <div className="mx-1 h-6 w-px bg-slate-300" />
          <ToolButton tool="rectangle" icon={Square} title="Rectangle (R)" />
          <ToolButton tool="circle" icon={Circle} title="Circle (C)" />
          <ToolButton tool="line" icon={Minus} title="Line (L)" />
          <ToolButton tool="arrow" icon={ArrowRight} title="Arrow (A)" />
          <div className="mx-1 h-6 w-px bg-slate-300" />
          <ToolButton tool="text" icon={Type} title="Text (T)" />
          <ToolButton tool="equation" icon={FunctionSquare} title="Equation (Q)" />
          <ToolButton tool="graph" icon={Grid3x3} title="Graph (G)" />

          <div className="mx-2 h-6 w-px bg-slate-300" />

          {/* Image Upload */}
          <ImageUpload onImageUpload={handleImageUpload} />

          {/* PDF Tools */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPdfUploader(true)}
            disabled={!canEdit}
            className="h-9 px-2"
          >
            <FileUp className="mr-1 h-4 w-4" />
            PDF
          </Button>

          {pdfUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePdfExport}
              disabled={!canEdit || isExporting}
              className="h-9 px-2"
            >
              <FileDown className="mr-1 h-4 w-4" />
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          )}

          <div className="mx-2 h-6 w-px bg-slate-300" />

          {/* Color Picker */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowColorPicker(!showColorPicker)}
              disabled={!canEdit}
              className="h-9 w-9 p-0"
              style={{
                backgroundColor: toolSettings.strokeColor,
                borderColor: '#cbd5e1',
              }}
            >
              <Palette
                className="h-4 w-4"
                style={{ color: toolSettings.strokeColor === '#000000' ? 'white' : 'black' }}
              />
            </Button>

            {showColorPicker && (
              <div className="absolute left-0 top-full z-50 mt-2 grid grid-cols-6 gap-1 rounded-lg border bg-white p-2 shadow-lg">
                {COLORS.map(color => (
                  <button
                    key={color}
                    className="h-6 w-6 rounded border"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setToolSettings({ strokeColor: color })
                      setShowColorPicker(false)
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Stroke Width */}
          <div className="ml-2 flex items-center gap-1">
            {STROKE_WIDTHS.map(width => (
              <button
                key={width}
                className={`flex h-6 w-6 items-center justify-center rounded ${
                  toolSettings.strokeWidth === width
                    ? 'border border-blue-500 bg-blue-100'
                    : 'hover:bg-slate-100'
                }`}
                onClick={() => setToolSettings({ strokeWidth: width })}
                disabled={!canEdit}
              >
                <div
                  className="rounded-full bg-current"
                  style={{
                    width: Math.min(width, 16),
                    height: Math.min(width, 16),
                    backgroundColor: toolSettings.strokeColor,
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Center: Status & AI */}
        <div className="flex items-center gap-3">
          {isLocalMode ? (
            <Badge variant="outline" className="gap-1 border-amber-500 text-amber-600">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              Local Mode
            </Badge>
          ) : (
            <Badge variant={isConnected ? 'default' : 'destructive'} className="gap-1">
              <div
                className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
              />
              {isConnected ? 'Live' : 'Offline'}
            </Badge>
          )}

          {userRole === 'tutor' && (
            <Button
              variant={isLocked ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setLock(!isLocked)}
            >
              {isLocked ? <Lock className="mr-1 h-4 w-4" /> : <Unlock className="mr-1 h-4 w-4" />}
              {isLocked ? 'Locked' : 'Unlocked'}
            </Button>
          )}

          {/* AI Assistant */}
          <AIMathAssistant
            elements={elements}
            onAddElement={createElement}
            selectedElement={selectedElement || null}
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Background Selector */}
          <BackgroundSelector value={backgroundType} onChange={setBackgroundType} />

          {/* Snap to Grid Toggle */}
          <Button
            variant={snapToGrid ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSnapToGrid(!snapToGrid)}
            className="h-9 px-2"
            title="Snap to Grid"
          >
            <Magnet className="h-4 w-4" />
          </Button>

          <Badge variant="outline" className="gap-1">
            <Users className="h-3 w-3" />
            {participants.length}
          </Badge>

          {selectedIds.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
              <Trash2 className="mr-1 h-4 w-4" />({selectedIds.length})
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            disabled={!canEdit || elements.length === 0}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Clear
          </Button>

          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-1 h-4 w-4" />
            Export
          </Button>

          {/* Keyboard Shortcuts Help */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="h-9 w-9 p-0"
          >
            <Command className="h-4 w-4" />
          </Button>

          <div className="mx-1 h-6 w-px bg-slate-300" />

          {/* Undo/Redo */}
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 overflow-hidden">
        {/* PDF Page Manager */}
        {pdfUrl && (
          <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
            <PdfPageManager
              totalPages={pdfTotalPages}
              currentPage={pdfPage}
              onPageChange={handlePdfPageChange}
              onClose={handlePdfRemove}
              fileName={pdfFileName}
            />
          </div>
        )}

        {/* Element Properties Panel */}
        {selectedElement && (
          <ElementPropertiesPanel
            element={selectedElement}
            onUpdate={changes => updateElement(selectedElement.id, changes)}
            onDelete={() => deleteElement(selectedElement.id)}
            onDuplicate={handleDuplicateElement}
            onClose={clearSelection}
          />
        )}

        <div className="absolute inset-0 overflow-auto p-4">
          <div className="relative mx-auto h-[800px] w-[1200px] shadow-lg">
            {/* Background Template */}
            <div className="absolute inset-0">
              <BackgroundTemplates
                type={backgroundType}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
              />
            </div>

            {/* PDF Overlay */}
            {pdfUrl && (
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <PdfOverlay
                  pdfUrl={pdfUrl}
                  pageNumber={pdfPage}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  onPageRender={info => setPdfTotalPages(info.totalPages)}
                />
              </div>
            )}

            <MathCanvas
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              elements={elements}
              activeTool={activeTool}
              toolSettings={toolSettings}
              transform={transform}
              canEdit={canEdit}
              currentUserId={userId}
              onCreateElement={createElement}
              onUpdateElement={updateElement}
              onSelectElements={selectElements}
              onShowEquationEditor={handleShowEquationEditor}
              onShowGraphEditor={handleShowGraphEditor}
              snapToGrid={snapToGrid}
            />

            {/* Laser Pointer Overlay */}
            {activeTool === 'laser' && (
              <LaserPointer
                isActive={activeTool === 'laser'}
                color="#ef4444"
                onPositionChange={(x, y) => {
                  sendCursor(x, y)
                }}
              />
            )}

            {/* Remote Cursors */}
            {remoteCursors.map(cursor => (
              <RemoteLaserPointer
                key={cursor.userId}
                x={cursor.x}
                y={cursor.y}
                color={cursor.color}
                name={cursor.name}
              />
            ))}

            {/* Selection info */}
            {selectedIds.length > 0 && (
              <div className="absolute -top-8 left-0 rounded bg-blue-600 px-2 py-1 text-xs text-white">
                {selectedIds.length} selected
              </div>
            )}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1 rounded-lg border bg-white p-1 shadow">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="py-1 text-center text-xs">{zoom}%</div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Tool hint */}
        <div className="absolute bottom-4 right-4 max-w-xs rounded-lg border bg-white/90 px-3 py-2 text-xs text-slate-600 shadow">
          <div className="font-medium">
            Current Tool: <span className="capitalize">{activeTool}</span>
          </div>
          <div className="mt-1 text-slate-400">
            {activeTool === 'select' && 'Click to select, drag to move'}
            {activeTool === 'hand' && 'Drag to pan the canvas'}
            {activeTool === 'laser' && 'Move mouse to point, others can see'}
            {activeTool === 'pen' && 'Draw freehand paths'}
            {activeTool === 'eraser' && 'Erase by drawing over elements'}
            {activeTool === 'rectangle' && 'Click and drag to draw rectangle'}
            {activeTool === 'circle' && 'Click and drag to draw circle'}
            {activeTool === 'line' && 'Click and drag to draw line'}
            {activeTool === 'arrow' && 'Click and drag to draw arrow'}
            {activeTool === 'text' && 'Click to place text'}
            {activeTool === 'equation' && 'Click to insert LaTeX equation'}
            {activeTool === 'graph' && 'Click to insert function graph'}
          </div>
          {snapToGrid && (
            <div className="mt-1 flex items-center gap-1 text-blue-500">
              <Magnet className="h-3 w-3" />
              Snap to grid enabled
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Page Navigation */}
      <div className="flex items-center justify-between border-t bg-white px-4 py-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 0}
            onClick={() => changePage(currentPage - 1)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <span className="min-w-[100px] text-center text-sm text-slate-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={!canEdit && currentPage >= totalPages - 1}
            onClick={() => changePage(currentPage + 1)}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>{elements.length} elements</span>
          {snapToGrid && (
            <Badge variant="secondary" className="gap-1">
              <Magnet className="h-3 w-3" />
              Snap
            </Badge>
          )}
          <span className="flex items-center gap-1">
            <Calculator className="h-4 w-4" />
            Math Whiteboard
          </span>
        </div>
      </div>

      {/* Equation Editor Overlay */}
      {showEquationEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative">
            <button
              onClick={() => {
                setShowEquationEditor(false)
                setPendingPosition(null)
                setActiveTool('select')
                setIsEditing(false)
              }}
              className="absolute -top-10 right-0 text-white hover:text-slate-300"
            >
              <X className="h-6 w-6" />
            </button>
            <EquationEditor
              onSubmit={handleEquationCreate}
              onCancel={() => {
                setShowEquationEditor(false)
                setPendingPosition(null)
                setActiveTool('select')
                setIsEditing(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Graph Editor Overlay */}
      {showGraphEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative">
            <button
              onClick={() => {
                setShowGraphEditor(false)
                setPendingPosition(null)
                setActiveTool('select')
                setIsEditing(false)
              }}
              className="absolute -top-10 right-0 text-white hover:text-slate-300"
            >
              <X className="h-6 w-6" />
            </button>
            <GraphEditor
              onSubmit={handleGraphCreate}
              onCancel={() => {
                setShowGraphEditor(false)
                setPendingPosition(null)
                setActiveTool('select')
                setIsEditing(false)
              }}
            />
          </div>
        </div>
      )}

      {/* PDF Uploader Overlay */}
      {showPdfUploader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-[500px]">
            <button
              onClick={() => setShowPdfUploader(false)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold">Upload PDF</h3>
              <PdfUploader onPdfUpload={handlePdfUpload} className="w-full" />
              <p className="mt-4 text-xs text-slate-500">
                Upload a PDF worksheet to annotate. Students will see the PDF and can draw on top of
                it.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[80vh] w-[500px] overflow-auto rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {KEYBOARD_SHORTCUTS.map(shortcut => (
                <div
                  key={shortcut.key}
                  className="flex items-center justify-between rounded bg-slate-50 p-2"
                >
                  <span className="text-sm text-slate-600">{shortcut.description}</span>
                  <kbd className="rounded border bg-white px-2 py-1 font-mono text-xs">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MathWhiteboardContainer
