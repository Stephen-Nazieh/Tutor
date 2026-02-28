/**
 * useShapeDrawing Hook
 * Manages shape creation and manipulation on the whiteboard
 */

import { useCallback, useState, useRef } from 'react'
import type { Point } from './useCanvasDrawing'

export type ShapeType = 'rectangle' | 'circle' | 'line' | 'triangle'

export interface ShapeElement {
    id: string
    type: ShapeType
    x: number
    y: number
    width: number
    height: number
    color: string
    lineWidth: number
}

export function useShapeDrawing() {
    const [shapes, setShapes] = useState<ShapeElement[]>([])
    const [isDrawingShape, setIsDrawingShape] = useState(false)
    const [tempShape, setTempShape] = useState<ShapeElement | null>(null)
    const tempShapeRef = useRef<ShapeElement | null>(null)
    const shapeStartRef = useRef<Point | null>(null)
    const currentShapeTypeRef = useRef<ShapeType>('rectangle')
    const currentColorRef = useRef<string>('#000000')
    const currentLineWidthRef = useRef<number>(3)

    const startShape = useCallback((point: Point, shapeType: ShapeType = 'rectangle', color: string = '#000000', lineWidth: number = 3) => {
        shapeStartRef.current = point
        currentShapeTypeRef.current = shapeType
        currentColorRef.current = color
        currentLineWidthRef.current = lineWidth
        setIsDrawingShape(true)

        const newShape: ShapeElement = {
            id: `shape-temp-${Date.now()}`,
            type: shapeType,
            x: point.x,
            y: point.y,
            width: 0,
            height: 0,
            color,
            lineWidth
        }

        tempShapeRef.current = newShape
        setTempShape(newShape)
    }, [])

    const continueShape = useCallback((point: Point) => {
        if (!isDrawingShape || !shapeStartRef.current || !tempShapeRef.current) return

        const start = shapeStartRef.current
        const width = point.x - start.x
        const height = point.y - start.y

        const nextShape = {
            ...tempShapeRef.current,
            x: width < 0 ? point.x : start.x,
            y: height < 0 ? point.y : start.y,
            width: Math.abs(width),
            height: Math.abs(height)
        }
        tempShapeRef.current = nextShape
        setTempShape(prev => prev ? {
            ...prev,
            ...nextShape
        } : null)
    }, [isDrawingShape])

    const finishShape = useCallback(() => {
        const currentShape = tempShapeRef.current
        if (!currentShape || currentShape.width < 5 || currentShape.height < 5) {
            setIsDrawingShape(false)
            setTempShape(null)
            tempShapeRef.current = null
            shapeStartRef.current = null
            return null
        }

        const finalShape: ShapeElement = {
            ...currentShape,
            id: `shape-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
        }

        setShapes(prev => [...prev, finalShape])
        setIsDrawingShape(false)
        setTempShape(null)
        tempShapeRef.current = null
        shapeStartRef.current = null
        
        return finalShape
    }, [])

    const cancelShape = useCallback(() => {
        setIsDrawingShape(false)
        setTempShape(null)
        tempShapeRef.current = null
        shapeStartRef.current = null
    }, [])

    const deleteShape = useCallback((id: string) => {
        setShapes(prev => prev.filter(s => s.id !== id))
    }, [])

    const clearShapes = useCallback(() => {
        setShapes([])
    }, [])

    const setShapesDirectly = useCallback((newShapes: ShapeElement[]) => {
        setShapes(newShapes)
    }, [])

    return {
        shapes,
        tempShape,
        isDrawingShape,
        startShape,
        continueShape,
        finishShape,
        cancelShape,
        deleteShape,
        clearShapes,
        setShapes: setShapesDirectly
    }
}
