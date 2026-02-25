/**
 * Connector Pathfinding Hook
 * 
 * Manages connector routing with A* pathfinding and automatic re-routing
 * when shapes move or when new obstacles appear.
 */

import { useCallback, useRef, useMemo } from 'react'
import {
  findOrthogonalPath,
  routeMultipleConnectors,
  createConnectorStroke,
  getPortPoint,
  optimizePath,
  type Point,
  type Rect,
  type Port,
  type ConnectorPath,
  type RoutingOptions,
} from '@/lib/whiteboard/pathfinding'

export interface Connector {
  id: string
  sourceId: string
  targetId: string
  sourcePort: Port
  targetPort: Port
  color: string
  width: number
  userId: string
}

export interface ShapeNode {
  id: string
  x: number
  y: number
  width: number
  height: number
}

interface ConnectorCache {
  [connectorId: string]: {
    path: ConnectorPath
    sourceRect: Rect
    targetRect: Rect
    timestamp: number
  }
}

export function useConnectorPathfinding(options: RoutingOptions = {}) {
  const cacheRef = useRef<ConnectorCache>({})
  const lastRoutingRef = useRef<number>(0)

  /**
   * Calculate the bounding rectangle of a stroke/shape
   */
  const getStrokeRect = useCallback((stroke: {
    points: Array<{ x: number; y: number }>
    type: string
    shapeType?: string
    x?: number
    y?: number
    width?: number
    height?: number
  }): Rect | null => {
    // For rectangle shapes
    if (stroke.type === 'shape' && stroke.shapeType === 'rectangle') {
      if (typeof stroke.x === 'number' && typeof stroke.y === 'number' &&
          typeof stroke.width === 'number' && typeof stroke.height === 'number') {
        return {
          x: stroke.x,
          y: stroke.y,
          width: stroke.width,
          height: stroke.height,
        }
      }
    }

    // For strokes with points
    if (stroke.points && stroke.points.length > 0) {
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

    return null
  }, [])

  /**
   * Route a single connector
   */
  const routeConnector = useCallback((
    connector: Connector,
    shapes: Map<string, ShapeNode>,
    otherStrokes: Array<{ id: string; points: Array<{ x: number; y: number }>; type: string }>,
    forceRecalculate: boolean = false
  ): ConnectorPath | null => {
    const sourceShape = shapes.get(connector.sourceId)
    const targetShape = shapes.get(connector.targetId)

    if (!sourceShape || !targetShape) return null

    const sourceRect: Rect = {
      x: sourceShape.x,
      y: sourceShape.y,
      width: sourceShape.width,
      height: sourceShape.height,
    }

    const targetRect: Rect = {
      x: targetShape.x,
      y: targetShape.y,
      width: targetShape.width,
      height: targetShape.height,
    }

    // Check cache
    const cached = cacheRef.current[connector.id]
    if (!forceRecalculate && cached) {
      const sourceMoved =
        cached.sourceRect.x !== sourceRect.x ||
        cached.sourceRect.y !== sourceRect.y ||
        cached.sourceRect.width !== sourceRect.width ||
        cached.sourceRect.height !== sourceRect.height

      const targetMoved =
        cached.targetRect.x !== targetRect.x ||
        cached.targetRect.y !== targetRect.y ||
        cached.targetRect.width !== targetRect.width ||
        cached.targetRect.height !== targetRect.height

      if (!sourceMoved && !targetMoved) {
        return cached.path
      }
    }

    // Build obstacles from other shapes
    const obstacles: Rect[] = []
    shapes.forEach((shape, id) => {
      if (id !== connector.sourceId && id !== connector.targetId) {
        obstacles.push({
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
        })
      }
    })

    // Add obstacles from other strokes
    otherStrokes.forEach((stroke) => {
      if (stroke.id !== connector.sourceId && stroke.id !== connector.targetId) {
        const rect = getStrokeRect(stroke)
        if (rect) {
          obstacles.push(rect)
        }
      }
    })

    const start = getPortPoint(sourceRect, connector.sourcePort)
    const end = getPortPoint(targetRect, connector.targetPort)

    const path = findOrthogonalPath(start, end, {
      ...options,
      avoidShapes: obstacles,
    })

    // Cache the result
    cacheRef.current[connector.id] = {
      path,
      sourceRect,
      targetRect,
      timestamp: Date.now(),
    }

    return path
  }, [options, getStrokeRect])

  /**
   * Route multiple connectors with global optimization
   */
  const routeMultiple = useCallback((
    connectors: Connector[],
    shapes: Map<string, ShapeNode>
  ): Map<string, ConnectorPath> => {
    const connections = connectors
      .map((connector) => {
        const sourceShape = shapes.get(connector.sourceId)
        const targetShape = shapes.get(connector.targetId)

        if (!sourceShape || !targetShape) return null

        return {
          id: connector.id,
          source: {
            rect: {
              x: sourceShape.x,
              y: sourceShape.y,
              width: sourceShape.width,
              height: sourceShape.height,
            },
            port: connector.sourcePort,
          },
          target: {
            rect: {
              x: targetShape.x,
              y: targetShape.y,
              width: targetShape.width,
              height: targetShape.height,
            },
            port: connector.targetPort,
          },
        }
      })
      .filter((c): c is NonNullable<typeof c> => c !== null)

    const results = routeMultipleConnectors(connections, options)

    // Update cache
    results.forEach((path, id) => {
      const connector = connectors.find((c) => c.id === id)
      const sourceShape = connector ? shapes.get(connector.sourceId) : null
      const targetShape = connector ? shapes.get(connector.targetId) : null

      if (sourceShape && targetShape) {
        cacheRef.current[id] = {
          path,
          sourceRect: {
            x: sourceShape.x,
            y: sourceShape.y,
            width: sourceShape.width,
            height: sourceShape.height,
          },
          targetRect: {
            x: targetShape.x,
            y: targetShape.y,
            width: targetShape.width,
            height: targetShape.height,
          },
          timestamp: Date.now(),
        }
      }
    })

    lastRoutingRef.current = Date.now()
    return results
  }, [options])

  /**
   * Create a stroke from a connector path
   */
  const createStrokeFromConnector = useCallback((
    connector: Connector,
    path: ConnectorPath
  ) => {
    return createConnectorStroke(path, {
      id: connector.id,
      color: connector.color,
      width: connector.width,
      userId: connector.userId,
      sourceStrokeId: connector.sourceId,
      targetStrokeId: connector.targetId,
      sourcePort: connector.sourcePort,
      targetPort: connector.targetPort,
    })
  }, [])

  /**
   * Invalidate cached path for a connector
   */
  const invalidateCache = useCallback((connectorId?: string) => {
    if (connectorId) {
      delete cacheRef.current[connectorId]
    } else {
      cacheRef.current = {}
    }
  }, [])

  /**
   * Check if a point is near a connector path
   */
  const isPointNearConnector = useCallback((
    point: Point,
    connectorPath: ConnectorPath,
    threshold: number = 5
  ): boolean => {
    const { points } = connectorPath

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i]
      const p2 = points[i + 1]

      // Check distance to line segment
      const distance = pointToSegmentDistance(point, p1, p2)
      if (distance <= threshold) {
        return true
      }
    }

    return false
  }, [])

  /**
   * Find connectors near a point
   */
  const findConnectorsNearPoint = useCallback((
    point: Point,
    connectorPaths: Map<string, ConnectorPath>,
    threshold: number = 5
  ): string[] => {
    const result: string[] = []

    connectorPaths.forEach((path, id) => {
      if (isPointNearConnector(point, path, threshold)) {
        result.push(id)
      }
    })

    return result
  }, [isPointNearConnector])

  /**
   * Update a connector's target
   */
  const updateConnectorTarget = useCallback((
    connectorId: string,
    newTargetId: string,
    newTargetPort?: Port
  ): boolean => {
    const cached = cacheRef.current[connectorId]
    if (!cached) return false

    // Invalidate cache to force recalculation
    invalidateCache(connectorId)
    return true
  }, [invalidateCache])

  /**
   * Get the last routing timestamp
   */
  const getLastRoutingTime = useCallback((): number => {
    return lastRoutingRef.current
  }, [])

  return useMemo(() => ({
    routeConnector,
    routeMultiple,
    createStrokeFromConnector,
    invalidateCache,
    isPointNearConnector,
    findConnectorsNearPoint,
    updateConnectorTarget,
    getLastRoutingTime,
    getPortPoint,
    optimizePath,
  }), [
    routeConnector,
    routeMultiple,
    createStrokeFromConnector,
    invalidateCache,
    isPointNearConnector,
    findConnectorsNearPoint,
    updateConnectorTarget,
    getLastRoutingTime,
  ])
}

/**
 * Calculate distance from a point to a line segment
 */
function pointToSegmentDistance(
  point: Point,
  segStart: Point,
  segEnd: Point
): number {
  const dx = segEnd.x - segStart.x
  const dy = segEnd.y - segStart.y
  const len = Math.sqrt(dx * dx + dy * dy)

  if (len === 0) {
    return Math.sqrt(
      Math.pow(point.x - segStart.x, 2) + Math.pow(point.y - segStart.y, 2)
    )
  }

  // Project point onto line segment
  const t = Math.max(
    0,
    Math.min(1, ((point.x - segStart.x) * dx + (point.y - segStart.y) * dy) / (len * len))
  )

  const projection = {
    x: segStart.x + t * dx,
    y: segStart.y + t * dy,
  }

  return Math.sqrt(
    Math.pow(point.x - projection.x, 2) + Math.pow(point.y - projection.y, 2)
  )
}
