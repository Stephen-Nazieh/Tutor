// @ts-nocheck
/**
 * Performance Optimization System
 * 
 * Features:
 * - Viewport culling for off-screen elements
 * - Stroke simplification (Ramer-Douglas-Peucker)
 * - Adaptive batching for high-frequency updates
 * - Spatial indexing for hit testing
 */

import type { WhiteboardStroke } from '@/hooks/use-live-class-whiteboard'

export interface Viewport {
  x: number
  y: number
  width: number
  height: number
  scale: number
}

export interface SpatialIndex {
  insert(stroke: WhiteboardStroke): void
  search(rect: { x: number; y: number; width: number; height: number }): string[]
  remove(strokeId: string): void
  clear(): void
}

export interface SimplifiedStroke extends WhiteboardStroke {
  originalPointCount: number
  simplifiedPointCount: number
  simplificationRatio: number
}

export interface BatchConfig {
  maxBatchSize: number
  maxWaitTime: number
  enableAdaptiveBatching: boolean
}

// =============================================================================
// Viewport Culling
// =============================================================================

export class ViewportCulling {
  private viewport: Viewport = { x: 0, y: 0, width: 0, height: 0, scale: 1 }
  private padding = 100 // Extra padding around viewport

  setViewport(viewport: Viewport): void {
    this.viewport = viewport
  }

  /**
   * Check if a stroke is visible in the current viewport
   */
  isVisible(stroke: WhiteboardStroke): boolean {
    const bounds = this.getStrokeBounds(stroke)
    
    // Add padding
    const viewBounds = {
      x: this.viewport.x - this.padding,
      y: this.viewport.y - this.padding,
      width: this.viewport.width + this.padding * 2,
      height: this.viewport.height + this.padding * 2,
    }

    return this.rectsIntersect(bounds, viewBounds)
  }

  /**
   * Filter strokes to only those visible in viewport
   */
  filterVisible(strokes: WhiteboardStroke[]): WhiteboardStroke[] {
    return strokes.filter((stroke) => this.isVisible(stroke))
  }

  /**
   * Calculate the number of visible strokes
   */
  countVisible(strokes: WhiteboardStroke[]): number {
    return strokes.filter((stroke) => this.isVisible(stroke)).length
  }

  /**
   * Get bounds of a stroke
   */
  private getStrokeBounds(stroke: WhiteboardStroke): { x: number; y: number; width: number; height: number } {
    if (stroke.points.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 }
    }

    const xs = stroke.points.map((p) => p.x)
    const ys = stroke.points.map((p) => p.y)

    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    }
  }

  /**
   * Check if two rectangles intersect
   */
  private rectsIntersect(
    a: { x: number; y: number; width: number; height: number },
    b: { x: number; y: number; width: number; height: number }
  ): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    )
  }
}

// =============================================================================
// Stroke Simplification (Ramer-Douglas-Peucker)
// =============================================================================

export class StrokeSimplifier {
  private readonly epsilon: number

  constructor(epsilon: number = 1.0) {
    this.epsilon = epsilon
  }

  /**
   * Simplify a stroke using Ramer-Douglas-Peucker algorithm
   */
  simplify(stroke: WhiteboardStroke): SimplifiedStroke {
    if (stroke.points.length <= 2) {
      return {
        ...stroke,
        originalPointCount: stroke.points.length,
        simplifiedPointCount: stroke.points.length,
        simplificationRatio: 1,
      }
    }

    const simplifiedPoints = this.rdpSimplify(stroke.points, this.epsilon)

    return {
      ...stroke,
      points: simplifiedPoints,
      originalPointCount: stroke.points.length,
      simplifiedPointCount: simplifiedPoints.length,
      simplificationRatio: simplifiedPoints.length / stroke.points.length,
    }
  }

  /**
   * Ramer-Douglas-Peucker algorithm
   */
  private rdpSimplify(
    points: Array<{ x: number; y: number; pressure?: number }>,
    epsilon: number
  ): Array<{ x: number; y: number; pressure?: number }> {
    if (points.length <= 2) return points

    // Find the point with maximum distance
    let maxDist = 0
    let maxIndex = 0

    const first = points[0]
    const last = points[points.length - 1]

    for (let i = 1; i < points.length - 1; i++) {
      const dist = this.perpendicularDistance(points[i], first, last)
      if (dist > maxDist) {
        maxDist = dist
        maxIndex = i
      }
    }

    // If max distance is greater than epsilon, recursively simplify
    if (maxDist > epsilon) {
      const left = this.rdpSimplify(points.slice(0, maxIndex + 1), epsilon)
      const right = this.rdpSimplify(points.slice(maxIndex), epsilon)

      // Concatenate (excluding duplicate point)
      return [...left.slice(0, -1), ...right]
    } else {
      return [first, last]
    }
  }

  /**
   * Calculate perpendicular distance from point to line
   */
  private perpendicularDistance(
    point: { x: number; y: number },
    lineStart: { x: number; y: number },
    lineEnd: { x: number; y: number }
  ): number {
    const dx = lineEnd.x - lineStart.x
    const dy = lineEnd.y - lineStart.y

    const area = Math.abs(
      dy * point.x - dx * point.y + lineEnd.x * lineStart.y - lineEnd.y * lineStart.x
    )
    const lineLength = Math.sqrt(dx * dx + dy * dy)

    return lineLength === 0 ? 0 : area / lineLength
  }

  /**
   * Batch simplify multiple strokes
   */
  simplifyBatch(strokes: WhiteboardStroke[]): SimplifiedStroke[] {
    return strokes.map((stroke) => this.simplify(stroke))
  }

  /**
   * Set epsilon value
   */
  setEpsilon(epsilon: number): void {
    this.epsilon = Math.max(0.1, epsilon)
  }
}

// =============================================================================
// Spatial Index (Simple Grid-based)
// =============================================================================

export class GridSpatialIndex implements SpatialIndex {
  private grid = new Map<string, Set<string>>()
  private strokeCells = new Map<string, Set<string>>()
  private cellSize: number

  constructor(cellSize: number = 100) {
    this.cellSize = cellSize
  }

  /**
   * Insert a stroke into the index
   */
  insert(stroke: WhiteboardStroke): void {
    const cells = this.getCellsForStroke(stroke)
    
    cells.forEach((cell) => {
      if (!this.grid.has(cell)) {
        this.grid.set(cell, new Set())
      }
      this.grid.get(cell)!.add(stroke.id)
    })

    this.strokeCells.set(stroke.id, cells)
  }

  /**
   * Search for strokes in a rectangle
   */
  search(rect: { x: number; y: number; width: number; height: number }): string[] {
    const results = new Set<string>()
    const cells = this.getCellsForRect(rect)

    cells.forEach((cell) => {
      const strokeIds = this.grid.get(cell)
      if (strokeIds) {
        strokeIds.forEach((id) => results.add(id))
      }
    })

    return Array.from(results)
  }

  /**
   * Remove a stroke from the index
   */
  remove(strokeId: string): void {
    const cells = this.strokeCells.get(strokeId)
    if (cells) {
      cells.forEach((cell) => {
        this.grid.get(cell)?.delete(strokeId)
      })
      this.strokeCells.delete(strokeId)
    }
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.grid.clear()
    this.strokeCells.clear()
  }

  /**
   * Update a stroke's position
   */
  update(stroke: WhiteboardStroke): void {
    this.remove(stroke.id)
    this.insert(stroke)
  }

  /**
   * Get cell key for a point
   */
  private getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / this.cellSize)
    const cellY = Math.floor(y / this.cellSize)
    return `${cellX},${cellY}`
  }

  /**
   * Get all cells that a stroke overlaps
   */
  private getCellsForStroke(stroke: WhiteboardStroke): Set<string> {
    const cells = new Set<string>()

    stroke.points.forEach((point) => {
      cells.add(this.getCellKey(point.x, point.y))
    })

    return cells
  }

  /**
   * Get all cells in a rectangle
   */
  private getCellsForRect(rect: { x: number; y: number; width: number; height: number }): Set<string> {
    const cells = new Set<string>()

    const startX = Math.floor(rect.x / this.cellSize)
    const endX = Math.floor((rect.x + rect.width) / this.cellSize)
    const startY = Math.floor(rect.y / this.cellSize)
    const endY = Math.floor((rect.y + rect.height) / this.cellSize)

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        cells.add(`${x},${y}`)
      }
    }

    return cells
  }
}

// =============================================================================
// Adaptive Batching
// =============================================================================

export class AdaptiveBatcher {
  private pendingUpdates: Map<string, WhiteboardStroke> = new Map()
  private batchTimer: ReturnType<typeof setTimeout> | null = null
  private lastBatchTime = 0
  private updateCount = 0
  private readonly config: BatchConfig

  constructor(config: Partial<BatchConfig> = {}) {
    this.config = {
      maxBatchSize: 50,
      maxWaitTime: 16, // ~1 frame at 60fps
      enableAdaptiveBatching: true,
      ...config,
    }
  }

  /**
   * Add an update to the batch
   */
  add(stroke: WhiteboardStroke, flushCallback: (strokes: WhiteboardStroke[]) => void): void {
    this.pendingUpdates.set(stroke.id, stroke)
    this.updateCount++

    // Check if we should flush immediately
    if (this.pendingUpdates.size >= this.config.maxBatchSize) {
      this.flush(flushCallback)
      return
    }

    // Schedule a flush
    this.scheduleFlush(flushCallback)
  }

  /**
   * Schedule a flush
   */
  private scheduleFlush(flushCallback: (strokes: WhiteboardStroke[]) => void): void {
    if (this.batchTimer) return

    const waitTime = this.calculateWaitTime()

    this.batchTimer = setTimeout(() => {
      this.flush(flushCallback)
    }, waitTime)
  }

  /**
   * Calculate adaptive wait time based on update frequency
   */
  private calculateWaitTime(): number {
    if (!this.config.enableAdaptiveBatching) {
      return this.config.maxWaitTime
    }

    const now = Date.now()
    const timeSinceLastBatch = now - this.lastBatchTime

    // If updates are very frequent, reduce wait time
    if (timeSinceLastBatch < 50) {
      return Math.max(8, this.config.maxWaitTime / 2)
    }

    // If updates are less frequent, increase wait time
    if (timeSinceLastBatch > 200) {
      return this.config.maxWaitTime
    }

    return this.config.maxWaitTime
  }

  /**
   * Flush pending updates
   */
  flush(flushCallback: (strokes: WhiteboardStroke[]) => void): void {
    if (this.pendingUpdates.size === 0) return

    const strokes = Array.from(this.pendingUpdates.values())
    this.pendingUpdates.clear()
    this.lastBatchTime = Date.now()

    if (this.batchTimer) {
      clearTimeout(this.batchTimer)
      this.batchTimer = null
    }

    flushCallback(strokes)
  }

  /**
   * Get pending count
   */
  getPendingCount(): number {
    return this.pendingUpdates.size
  }

  /**
   * Clear pending updates
   */
  clear(): void {
    this.pendingUpdates.clear()
    if (this.batchTimer) {
      clearTimeout(this.batchTimer)
      this.batchTimer = null
    }
  }

  /**
   * Get stats
   */
  getStats(): {
    pendingCount: number
    totalUpdates: number
    avgBatchSize: number
  } {
    return {
      pendingCount: this.pendingUpdates.size,
      totalUpdates: this.updateCount,
      avgBatchSize: this.updateCount > 0 ? this.updateCount / Math.max(1, this.lastBatchTime) : 0,
    }
  }
}

// =============================================================================
// Performance Monitor
// =============================================================================

export class PerformanceMonitor {
  private frameTimings: number[] = []
  private renderCount = 0
  private lastFrameTime = 0
  private readonly maxSamples = 60

  /**
   * Record a frame timing
   */
  recordFrame(frameTime: number): void {
    this.frameTimings.push(frameTime)
    this.renderCount++

    if (this.frameTimings.length > this.maxSamples) {
      this.frameTimings.shift()
    }

    this.lastFrameTime = frameTime
  }

  /**
   * Get average frame time
   */
  getAverageFrameTime(): number {
    if (this.frameTimings.length === 0) return 0
    return this.frameTimings.reduce((a, b) => a + b, 0) / this.frameTimings.length
  }

  /**
   * Get FPS
   */
  getFPS(): number {
    const avgFrameTime = this.getAverageFrameTime()
    return avgFrameTime > 0 ? 1000 / avgFrameTime : 0
  }

  /**
   * Get performance metrics
   */
  getMetrics(): {
    fps: number
    avgFrameTime: number
    maxFrameTime: number
    minFrameTime: number
    totalRenders: number
    droppedFrames: number
  } {
    const avgFrameTime = this.getAverageFrameTime()
    const fps = avgFrameTime > 0 ? 1000 / avgFrameTime : 0

    return {
      fps,
      avgFrameTime,
      maxFrameTime: this.frameTimings.length > 0 ? Math.max(...this.frameTimings) : 0,
      minFrameTime: this.frameTimings.length > 0 ? Math.min(...this.frameTimings) : 0,
      totalRenders: this.renderCount,
      droppedFrames: this.frameTimings.filter((t) => t > 16.67).length,
    }
  }

  /**
   * Check if performance is degraded
   */
  isPerformanceDegraded(threshold: number = 30): boolean {
    return this.getFPS() < threshold
  }

  /**
   * Reset stats
   */
  reset(): void {
    this.frameTimings = []
    this.renderCount = 0
    this.lastFrameTime = 0
  }
}

// =============================================================================
// Combined Performance Manager
// =============================================================================

export class PerformanceManager {
  viewportCulling = new ViewportCulling()
  strokeSimplifier = new StrokeSimplifier()
  spatialIndex: SpatialIndex = new GridSpatialIndex()
  batcher = new AdaptiveBatcher()
  monitor = new PerformanceMonitor()

  private simplificationEnabled = true
  private targetFPS = 60

  /**
   * Optimize strokes for rendering
   */
  optimizeForRendering(
    strokes: WhiteboardStroke[],
    viewport: Viewport,
    options: {
      enableSimplification?: boolean
      simplificationThreshold?: number
    } = {}
  ): {
    visibleStrokes: WhiteboardStroke[]
    culledCount: number
    simplifiedCount: number
  } {
    // Update viewport
    this.viewportCulling.setViewport(viewport)

    // Filter visible strokes
    const visibleStrokes = this.viewportCulling.filterVisible(strokes)
    const culledCount = strokes.length - visibleStrokes.length

    // Simplify if enabled and performance is degraded
    let simplifiedCount = 0
    if (options.enableSimplification && this.simplificationEnabled) {
      const fps = this.monitor.getFPS()
      
      if (fps < this.targetFPS || visibleStrokes.length > options.simplificationThreshold || 500) {
        const simplified = visibleStrokes.map((stroke) => {
          if (stroke.points.length > 50) {
            simplifiedCount++
            return this.strokeSimplifier.simplify(stroke)
          }
          return stroke
        })
        
        return {
          visibleStrokes: simplified,
          culledCount,
          simplifiedCount,
        }
      }
    }

    return {
      visibleStrokes,
      culledCount,
      simplifiedCount,
    }
  }

  /**
   * Build spatial index for all strokes
   */
  buildIndex(strokes: WhiteboardStroke[]): void {
    this.spatialIndex.clear()
    strokes.forEach((stroke) => this.spatialIndex.insert(stroke))
  }

  /**
   * Find strokes near a point
   */
  findStrokesNearPoint(
    point: { x: number; y: number },
    radius: number
  ): string[] {
    return this.spatialIndex.search({
      x: point.x - radius,
      y: point.y - radius,
      width: radius * 2,
      height: radius * 2,
    })
  }

  /**
   * Record render timing
   */
  recordRender(frameTime: number): void {
    this.monitor.recordFrame(frameTime)

    // Auto-adjust simplification based on performance
    if (this.monitor.isPerformanceDegraded(30)) {
      this.strokeSimplifier.setEpsilon(this.strokeSimplifier['epsilon'] * 1.2)
    } else if (this.monitor.getFPS() > 55) {
      this.strokeSimplifier.setEpsilon(this.strokeSimplifier['epsilon'] * 0.9)
    }
  }

  /**
   * Enable/disable simplification
   */
  setSimplification(enabled: boolean): void {
    this.simplificationEnabled = enabled
  }

  /**
   * Get performance report
   */
  getReport(): {
    fps: number
    frameMetrics: ReturnType<PerformanceMonitor['getMetrics']>
    batchStats: ReturnType<AdaptiveBatcher['getStats']>
    simplificationEnabled: boolean
  } {
    return {
      fps: this.monitor.getFPS(),
      frameMetrics: this.monitor.getMetrics(),
      batchStats: this.batcher.getStats(),
      simplificationEnabled: this.simplificationEnabled,
    }
  }
}
