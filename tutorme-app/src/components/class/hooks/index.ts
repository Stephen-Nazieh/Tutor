/**
 * Whiteboard Hooks Index
 * Exports all custom hooks for whiteboard functionality
 */

export { useCanvasDrawing } from './useCanvasDrawing'
export type { Point, Stroke, Tool } from './useCanvasDrawing'

export { usePanZoom } from './usePanZoom'
export type { PanZoomState } from './usePanZoom'

export { useWhiteboardPages } from './useWhiteboardPages'
export type { Page } from './useWhiteboardPages'

export { useTextEditor } from './useTextEditor'
export type { TextElement, TextFormat, TextOverlay } from './useTextEditor'

export { useShapeDrawing } from './useShapeDrawing'
export type { ShapeElement, ShapeType } from './useShapeDrawing'
