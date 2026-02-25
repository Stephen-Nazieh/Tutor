export type PdfViewMode = 'original' | 'cleaned' | 'marked'

export interface PercentFabricObject {
  id?: string
  type?: string
  left?: number
  top?: number
  width?: number
  height?: number
  radius?: number
  scaleX?: number
  scaleY?: number
  strokeWidth?: number
  fontSize?: number
  angle?: number
  fill?: string
  stroke?: string
  text?: string
  path?: Array<Array<string | number>>
  points?: Array<{ x: number; y: number }>
}

export interface PdfCanvasEventPayload {
  roomId: string
  page: number
  action: 'created' | 'modified' | 'removed' | 'sync-request'
  object?: PercentFabricObject
  objectId?: string
  actorId?: string
  sentAt: number
}

export interface MathMarkingResult {
  totalScore: number
  mistakeLocations: Array<{
    step: string
    errorDescription: string
    correction: string
    x?: number
    y?: number
  }>
  overallFeedback: string
}
