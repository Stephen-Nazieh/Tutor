/**
 * usePanZoom Hook
 * Handles canvas panning and zooming
 */

import { useCallback, useState } from 'react'

export interface PanZoomState {
    offsetX: number
    offsetY: number
    scale: number
}

interface UsePanZoomProps {
    minScale?: number
    maxScale?: number
    scaleStep?: number
}

export function usePanZoom({
    minScale = 0.5,
    maxScale = 3,
    scaleStep = 0.1
}: UsePanZoomProps = {}) {
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)
    const [scale, setScale] = useState(1)
    const [isPanning, setIsPanning] = useState(false)
    const [lastPanPoint, setLastPanPoint] = useState<{ x: number; y: number } | null>(null)

    const startPan = useCallback((x: number, y: number) => {
        setIsPanning(true)
        setLastPanPoint({ x, y })
    }, [])

    const continuePan = useCallback((x: number, y: number) => {
        if (!isPanning || !lastPanPoint) return

        const dx = x - lastPanPoint.x
        const dy = y - lastPanPoint.y

        setOffsetX(prev => prev + dx)
        setOffsetY(prev => prev + dy)
        setLastPanPoint({ x, y })
    }, [isPanning, lastPanPoint])

    const endPan = useCallback(() => {
        setIsPanning(false)
        setLastPanPoint(null)
    }, [])

    const zoomIn = useCallback(() => {
        setScale(prev => Math.min(maxScale, prev + scaleStep))
    }, [maxScale, scaleStep])

    const zoomOut = useCallback(() => {
        setScale(prev => Math.max(minScale, prev - scaleStep))
    }, [minScale, scaleStep])

    const resetZoom = useCallback(() => {
        setScale(1)
        setOffsetX(0)
        setOffsetY(0)
    }, [])

    const handleWheel = useCallback((deltaY: number, ctrlKey: boolean) => {
        if (ctrlKey) {
            // Zoom with Ctrl+Wheel
            const delta = deltaY > 0 ? -scaleStep : scaleStep
            setScale(prev => Math.max(minScale, Math.min(maxScale, prev + delta)))
        }
    }, [minScale, maxScale, scaleStep])

    // Convert screen coordinates to canvas coordinates
    const screenToCanvas = useCallback((screenX: number, screenY: number) => {
        return {
            x: (screenX - offsetX) / scale,
            y: (screenY - offsetY) / scale
        }
    }, [offsetX, offsetY, scale])

    // Convert canvas coordinates to screen coordinates
    const canvasToScreen = useCallback((canvasX: number, canvasY: number) => {
        return {
            x: canvasX * scale + offsetX,
            y: canvasY * scale + offsetY
        }
    }, [offsetX, offsetY, scale])

    return {
        offsetX,
        offsetY,
        scale,
        isPanning,
        startPan,
        continuePan,
        endPan,
        zoomIn,
        zoomOut,
        resetZoom,
        handleWheel,
        screenToCanvas,
        canvasToScreen
    }
}
