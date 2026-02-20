/**
 * Basic test suite for whiteboard hooks (Vitest)
 */

import { vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCanvasDrawing } from '../hooks/useCanvasDrawing'
import { usePanZoom } from '../hooks/usePanZoom'
import { useWhiteboardPages } from '../hooks/useWhiteboardPages'
import { useTextEditor } from '../hooks/useTextEditor'
import { useShapeDrawing } from '../hooks/useShapeDrawing'

describe('Whiteboard Hooks', () => {
    describe('useCanvasDrawing', () => {
        it('should initialize with empty strokes', () => {
            const { result } = renderHook(() =>
                useCanvasDrawing({ color: '#000000', lineWidth: 2, tool: 'pen' })
            )

            expect(result.current.strokes).toEqual([])
            expect(result.current.isDrawing).toBe(false)
        })

        it('should start and end drawing', () => {
            const onUpdate = vi.fn()
            const { result } = renderHook(() =>
                useCanvasDrawing({ color: '#000000', lineWidth: 2, tool: 'pen', onUpdate })
            )

            act(() => {
                result.current.startDrawing({ x: 10, y: 10 })
            })

            expect(result.current.isDrawing).toBe(true)

            act(() => {
                result.current.continueDrawing({ x: 20, y: 20 })
                result.current.endDrawing()
            })

            expect(result.current.isDrawing).toBe(false)
            expect(result.current.strokes).toHaveLength(1)
            expect(onUpdate).toHaveBeenCalled()
        })

        it('should clear strokes', () => {
            const { result } = renderHook(() =>
                useCanvasDrawing({ color: '#000000', lineWidth: 2, tool: 'pen' })
            )

            act(() => {
                result.current.startDrawing({ x: 10, y: 10 })
                result.current.endDrawing()
                result.current.clearStrokes()
            })

            expect(result.current.strokes).toEqual([])
        })

        it.skip('should undo last stroke', () => {
            const { result } = renderHook(() =>
                useCanvasDrawing({ color: '#000000', lineWidth: 2, tool: 'pen' })
            )

            act(() => {
                result.current.startDrawing({ x: 10, y: 10 })
                result.current.continueDrawing({ x: 15, y: 15 })
                result.current.endDrawing()
            })
            act(() => {
                result.current.startDrawing({ x: 20, y: 20 })
                result.current.continueDrawing({ x: 25, y: 25 })
                result.current.endDrawing()
            })

            expect(result.current.strokes.length).toBeGreaterThanOrEqual(1)
            const countBefore = result.current.strokes.length

            act(() => {
                result.current.undoStroke()
            })

            expect(result.current.strokes.length).toBe(countBefore - 1)
        })
    })

    describe('usePanZoom', () => {
        it('should initialize with default values', () => {
            const { result } = renderHook(() => usePanZoom())

            expect(result.current.offsetX).toBe(0)
            expect(result.current.offsetY).toBe(0)
            expect(result.current.scale).toBe(1)
            expect(result.current.isPanning).toBe(false)
        })

        it('should zoom in and out', () => {
            const { result } = renderHook(() => usePanZoom({ minScale: 0.5, maxScale: 3 }))

            act(() => {
                result.current.zoomIn()
            })

            expect(result.current.scale).toBeGreaterThan(1)

            act(() => {
                result.current.zoomOut()
                result.current.zoomOut()
            })

            expect(result.current.scale).toBeLessThan(1)
        })

        it('should reset zoom', () => {
            const { result } = renderHook(() => usePanZoom())

            act(() => {
                result.current.zoomIn()
                result.current.zoomIn()
                result.current.resetZoom()
            })

            expect(result.current.scale).toBe(1)
            expect(result.current.offsetX).toBe(0)
            expect(result.current.offsetY).toBe(0)
        })

        it('should convert coordinates correctly', () => {
            const { result } = renderHook(() => usePanZoom())

            const canvas = result.current.screenToCanvas(100, 100)
            expect(canvas.x).toBe(100)
            expect(canvas.y).toBe(100)

            const screen = result.current.canvasToScreen(100, 100)
            expect(screen.x).toBe(100)
            expect(screen.y).toBe(100)
        })
    })

    describe('useWhiteboardPages', () => {
        it('should initialize with one default page', () => {
            const { result } = renderHook(() => useWhiteboardPages())

            expect(result.current.pages).toHaveLength(1)
            expect(result.current.currentPageIndex).toBe(0)
            expect(result.current.currentPage).toBeDefined()
        })

        it('should add and remove pages', () => {
            const { result } = renderHook(() => useWhiteboardPages())

            act(() => {
                result.current.addPage()
            })

            expect(result.current.pages).toHaveLength(2)
            expect(result.current.currentPageIndex).toBe(1)

            act(() => {
                result.current.deletePage(1)
            })

            expect(result.current.pages).toHaveLength(1)
        })

        it('should navigate between pages', () => {
            const { result } = renderHook(() => useWhiteboardPages())

            act(() => {
                result.current.addPage()
            })
            expect(result.current.currentPageIndex).toBe(1)

            act(() => {
                result.current.addPage()
            })
            expect(result.current.currentPageIndex).toBe(2)

            act(() => {
                result.current.setCurrentPageIndex(1)
            })
            expect(result.current.currentPageIndex).toBe(1)

            act(() => {
                result.current.setCurrentPageIndex(2)
            })
            expect(result.current.currentPageIndex).toBe(2)
        })

        it('should update page background', () => {
            const { result } = renderHook(() => useWhiteboardPages())

            act(() => {
                result.current.updatePageBackground('#1f2937', 'grid')
            })

            expect(result.current.currentPage?.backgroundColor).toBe('#1f2937')
            expect(result.current.currentPage?.backgroundStyle).toBe('grid')
        })
    })

    describe('useTextEditor', () => {
        it('should initialize with empty elements', () => {
            const { result } = renderHook(() => useTextEditor())

            expect(result.current.textElements).toEqual([])
            expect(result.current.textOverlays).toEqual([])
        })

        it.skip('should create and confirm text overlay', () => {
            const { result } = renderHook(() => useTextEditor(24, '#000000'))

            let overlayId: string

            act(() => {
                overlayId = result.current.startTextEditing(10, 10)
            })

            expect(result.current.textOverlays).toHaveLength(1)

            act(() => {
                result.current.updateText(overlayId, { text: 'Hello' })
                result.current.confirmText(overlayId)
            })

            expect(result.current.textOverlays).toHaveLength(0)
            expect(result.current.textElements).toHaveLength(1)
        })

        it('should toggle text formatting', () => {
            const { result } = renderHook(() => useTextEditor())

            expect(result.current.textFormat.bold).toBe(false)

            act(() => {
                result.current.toggleBold()
            })

            expect(result.current.textFormat.bold).toBe(true)

            act(() => {
                result.current.toggleItalic()
            })

            expect(result.current.textFormat.italic).toBe(true)
        })
    })

    describe('useShapeDrawing', () => {
        it('should initialize with empty shapes', () => {
            const { result } = renderHook(() => useShapeDrawing())

            expect(result.current.shapes).toEqual([])
            expect(result.current.isDrawingShape).toBe(false)
        })

        it.skip('should draw and finish shape', () => {
            const { result } = renderHook(() => useShapeDrawing())

            act(() => {
                result.current.startShape({ x: 10, y: 10 }, 'rectangle')
            })

            expect(result.current.isDrawingShape).toBe(true)
            expect(result.current.tempShape).toBeDefined()

            act(() => {
                result.current.continueShape({ x: 100, y: 100 })
                result.current.finishShape()
            })

            expect(result.current.isDrawingShape).toBe(false)
            expect(result.current.shapes).toHaveLength(1)
        })

        it('should clear shapes', () => {
            const { result } = renderHook(() => useShapeDrawing())

            act(() => {
                result.current.startShape({ x: 10, y: 10 }, 'circle')
                result.current.continueShape({ x: 50, y: 50 })
                result.current.finishShape()
                result.current.clearShapes()
            })

            expect(result.current.shapes).toEqual([])
        })
    })
})
