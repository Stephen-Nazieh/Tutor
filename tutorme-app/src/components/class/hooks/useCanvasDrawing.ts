/**
 * useCanvasDrawing Hook
 * Handles drawing operations on the canvas
 */

import { useCallback, useRef, useState } from 'react'

export interface Point {
    x: number
    y: number
}

export interface Stroke {
    id: string
    points: Point[]
    color: string
    width: number
    type: 'pen' | 'eraser'
}

export type Tool = 'pen' | 'eraser' | 'pan' | 'select' | 'text' | 'shape' | 'ai'

interface UseCanvasDrawingProps {
    color: string
    lineWidth: number
    tool: Tool
    onUpdate?: (strokes: Stroke[]) => void
}

export function useCanvasDrawing({
    color,
    lineWidth,
    tool,
    onUpdate
}: UseCanvasDrawingProps) {
    const [strokes, setStrokes] = useState<Stroke[]>([])
    const [isDrawing, setIsDrawing] = useState(false)
    const currentStrokeRef = useRef<Point[]>([])

    const startDrawing = useCallback((point: Point) => {
        if (tool !== 'pen' && tool !== 'eraser') return

        setIsDrawing(true)
        currentStrokeRef.current = [point]
    }, [tool])

    const continueDrawing = useCallback((point: Point) => {
        if (!isDrawing) return

        currentStrokeRef.current.push(point)
    }, [isDrawing])

    const endDrawing = useCallback(() => {
        if (!isDrawing || currentStrokeRef.current.length === 0) {
            setIsDrawing(false)
            return
        }

        const newStroke: Stroke = {
            id: `stroke-${Date.now()}-${Math.random()}`,
            points: [...currentStrokeRef.current],
            color,
            width: lineWidth,
            type: tool as 'pen' | 'eraser'
        }

        setStrokes(prev => {
            const updated = [...prev, newStroke]
            onUpdate?.(updated)
            return updated
        })

        currentStrokeRef.current = []
        setIsDrawing(false)
    }, [isDrawing, color, lineWidth, tool, onUpdate])

    const clearStrokes = useCallback(() => {
        setStrokes([])
        onUpdate?.([])
    }, [onUpdate])

    const undoStroke = useCallback(() => {
        setStrokes(prev => {
            const updated = prev.slice(0, -1)
            onUpdate?.(updated)
            return updated
        })
    }, [onUpdate])

    const setStrokesDirectly = useCallback((newStrokes: Stroke[]) => {
        setStrokes(newStrokes)
    }, [])

    return {
        strokes,
        isDrawing,
        currentStroke: currentStrokeRef.current,
        startDrawing,
        continueDrawing,
        endDrawing,
        clearStrokes,
        undoStroke,
        setStrokes: setStrokesDirectly
    }
}
