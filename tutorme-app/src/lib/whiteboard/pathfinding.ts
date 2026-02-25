/**
 * Connector Pathfinding v2 - A* Grid Routing with Crossing Minimization
 * 
 * Features:
 * - A* pathfinding on a grid-based routing space
 * - Orthogonal (Manhattan) routing with segment optimization
 * - Crossing minimization using virtual edge costs
 * - Port-aware connection (top/right/bottom/left/center)
 * - Dynamic obstacle detection from existing strokes/shapes
 */

export interface Point {
  x: number
  y: number
}

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface PathNode extends Point {
  g: number // Cost from start
  h: number // Heuristic cost to end
  f: number // Total cost (g + h)
  parent?: PathNode
  direction?: 'horizontal' | 'vertical'
}

export interface RoutingOptions {
  gridSize?: number
  padding?: number
  preferHorizontal?: boolean
  avoidShapes?: Rect[]
  crossingPenalty?: number
  maxIterations?: number
}

export interface ConnectorPath {
  points: Point[]
  length: number
  crossings: number
}

type Port = 'top' | 'right' | 'bottom' | 'left' | 'center'

const GRID_SIZE = 10
const PADDING = 15
const CROSSING_PENALTY = 50
const DIRECTION_CHANGE_PENALTY = 10

/**
 * Get the attachment point for a specific port on a rectangle
 */
export function getPortPoint(rect: Rect, port: Port): Point {
  switch (port) {
    case 'top':
      return { x: rect.x + rect.width / 2, y: rect.y }
    case 'right':
      return { x: rect.x + rect.width, y: rect.y + rect.height / 2 }
    case 'bottom':
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height }
    case 'left':
      return { x: rect.x, y: rect.y + rect.height / 2 }
    case 'center':
    default:
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
  }
}

/**
 * Snap a point to the grid
 */
function snapToGrid(point: Point, gridSize: number): Point {
  return {
    x: Math.round(point.x / gridSize) * gridSize,
    y: Math.round(point.y / gridSize) * gridSize,
  }
}

/**
 * Check if a point is inside a rectangle (with padding)
 */
function isPointInRect(point: Point, rect: Rect, padding: number = 0): boolean {
  return (
    point.x >= rect.x - padding &&
    point.x <= rect.x + rect.width + padding &&
    point.y >= rect.y - padding &&
    point.y <= rect.y + rect.height + padding
  )
}

/**
 * Check if a line segment intersects with a rectangle
 */
function lineIntersectsRect(
  p1: Point,
  p2: Point,
  rect: Rect,
  padding: number = 0
): boolean {
  const left = rect.x - padding
  const right = rect.x + rect.width + padding
  const top = rect.y - padding
  const bottom = rect.y + rect.height + padding

  // Check if either endpoint is inside
  if (isPointInRect(p1, rect, padding) || isPointInRect(p2, rect, padding)) {
    return true
  }

  // Check intersection with each edge
  const edges = [
    { p1: { x: left, y: top }, p2: { x: right, y: top } }, // Top
    { p1: { x: right, y: top }, p2: { x: right, y: bottom } }, // Right
    { p1: { x: right, y: bottom }, p2: { x: left, y: bottom } }, // Bottom
    { p1: { x: left, y: bottom }, p2: { x: left, y: top } }, // Left
  ]

  return edges.some((edge) => segmentsIntersect(p1, p2, edge.p1, edge.p2))
}

/**
 * Check if two line segments intersect
 */
function segmentsIntersect(a1: Point, a2: Point, b1: Point, b2: Point): boolean {
  const d = (a2.x - a1.x) * (b2.y - b1.y) - (a2.y - a1.y) * (b2.x - b1.x)
  if (d === 0) return false // Parallel

  const t = ((b1.x - a1.x) * (b2.y - b1.y) - (b1.y - a1.y) * (b2.x - b1.x)) / d
  const u = ((b1.x - a1.x) * (a2.y - a1.y) - (b1.y - a1.y) * (a2.x - a1.x)) / d

  return t >= 0 && t <= 1 && u >= 0 && u <= 1
}

/**
 * Calculate Manhattan distance heuristic
 */
function manhattanDistance(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

/**
 * Check if a path segment crosses any existing path
 */
function countCrossings(
  p1: Point,
  p2: Point,
  existingPaths: Point[][]
): number {
  let crossings = 0
  for (const path of existingPaths) {
    for (let i = 0; i < path.length - 1; i++) {
      if (segmentsIntersect(p1, p2, path[i], path[i + 1])) {
        crossings++
      }
    }
  }
  return crossings
}

/**
 * A* pathfinding for orthogonal routing
 */
export function findOrthogonalPath(
  start: Point,
  end: Point,
  options: RoutingOptions = {}
): ConnectorPath {
  const {
    gridSize = GRID_SIZE,
    padding = PADDING,
    preferHorizontal = false,
    avoidShapes = [],
    crossingPenalty = CROSSING_PENALTY,
    maxIterations = 5000,
  } = options

  // Snap to grid
  const startGrid = snapToGrid(start, gridSize)
  const endGrid = snapToGrid(end, gridSize)

  // If start and end are the same, return single point
  if (startGrid.x === endGrid.x && startGrid.y === endGrid.y) {
    return { points: [start], length: 0, crossings: 0 }
  }

  // Check for simple direct path (no obstacles)
  const canGoDirect = !avoidShapes.some((shape) =>
    lineIntersectsRect(start, end, shape, padding)
  )

  if (canGoDirect) {
    // Try simple orthogonal paths first (L-shaped or direct)
    const directPaths = generateSimpleOrthogonalPaths(start, end, preferHorizontal)
    const validDirectPath = directPaths.find(
      (path) =>
        !path.some((point, i) =>
          i > 0 &&
          avoidShapes.some((shape) =>
            lineIntersectsRect(path[i - 1], point, shape, padding)
          )
        )
    )
    if (validDirectPath) {
      return {
        points: validDirectPath,
        length: calculatePathLength(validDirectPath),
        crossings: 0,
      }
    }
  }

  // A* search
  const openSet: PathNode[] = []
  const closedSet = new Set<string>()
  const existingPaths: Point[][] = [] // For crossing detection

  const startNode: PathNode = {
    ...startGrid,
    g: 0,
    h: manhattanDistance(startGrid, endGrid),
    f: manhattanDistance(startGrid, endGrid),
  }

  openSet.push(startNode)

  let iterations = 0
  while (openSet.length > 0 && iterations < maxIterations) {
    iterations++

    // Get node with lowest f score
    openSet.sort((a, b) => a.f - b.f)
    const current = openSet.shift()!
    const currentKey = `${current.x},${current.y}`

    if (closedSet.has(currentKey)) continue
    closedSet.add(currentKey)

    // Check if we reached the target
    if (
      Math.abs(current.x - endGrid.x) < gridSize &&
      Math.abs(current.y - endGrid.y) < gridSize
    ) {
      const path = reconstructPath(current, end)
      return {
        points: path,
        length: calculatePathLength(path),
        crossings: countPathCrossings(path, existingPaths),
      }
    }

    // Generate neighbors (only horizontal and vertical moves)
    const neighbors: PathNode[] = [
      { x: current.x + gridSize, y: current.y }, // Right
      { x: current.x - gridSize, y: current.y }, // Left
      { x: current.x, y: current.y + gridSize }, // Down
      { x: current.x, y: current.y - gridSize }, // Up
    ]

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x},${neighbor.y}`
      if (closedSet.has(neighborKey)) continue

      // Check if this move intersects any obstacle
      const moveDirection: 'horizontal' | 'vertical' =
        neighbor.x !== current.x ? 'horizontal' : 'vertical'

      const intersectsObstacle = avoidShapes.some((shape) =>
        lineIntersectsRect(current, neighbor, shape, padding)
      )

      if (intersectsObstacle) continue

      // Calculate costs
      const directionChange =
        current.direction && current.direction !== moveDirection
      const directionPenalty = directionChange ? DIRECTION_CHANGE_PENALTY : 0
      const preferencePenalty =
        preferHorizontal && moveDirection === 'vertical' ? 5 : 0

      // Count crossings with existing paths
      const crossings = countCrossings(current, neighbor, existingPaths)
      const crossingCost = crossings * crossingPenalty

      const g = current.g + gridSize + directionPenalty + preferencePenalty + crossingCost
      const h = manhattanDistance(neighbor, endGrid)
      const f = g + h

      const existingNeighbor = openSet.find(
        (n) => n.x === neighbor.x && n.y === neighbor.y
      )

      if (!existingNeighbor || g < existingNeighbor.g) {
        const newNode: PathNode = {
          ...neighbor,
          g,
          h,
          f,
          parent: current,
          direction: moveDirection,
        }

        if (!existingNeighbor) {
          openSet.push(newNode)
        } else {
          existingNeighbor.g = g
          existingNeighbor.f = f
          existingNeighbor.parent = current
          existingNeighbor.direction = moveDirection
        }
      }
    }
  }

  // If A* fails, return a simple direct path
  return {
    points: [start, end],
    length: manhattanDistance(start, end),
    crossings: 0,
  }
}

/**
 * Generate simple orthogonal paths (L-shaped)
 */
function generateSimpleOrthogonalPaths(
  start: Point,
  end: Point,
  preferHorizontal: boolean
): Point[][] {
  const paths: Point[][] = []

  if (preferHorizontal) {
    // Horizontal then vertical
    paths.push([
      start,
      { x: end.x, y: start.y },
      end,
    ])
    // Vertical then horizontal
    paths.push([
      start,
      { x: start.x, y: end.y },
      end,
    ])
  } else {
    // Vertical then horizontal
    paths.push([
      start,
      { x: start.x, y: end.y },
      end,
    ])
    // Horizontal then vertical
    paths.push([
      start,
      { x: end.x, y: start.y },
      end,
    ])
  }

  // Direct diagonal (if allowed)
  paths.push([start, end])

  return paths
}

/**
 * Reconstruct path from A* result
 */
function reconstructPath(endNode: PathNode, actualEnd: Point): Point[] {
  const path: Point[] = []
  let current: PathNode | undefined = endNode

  while (current) {
    path.unshift({ x: current.x, y: current.y })
    current = current.parent
  }

  // Replace last point with actual end (not snapped)
  path[path.length - 1] = actualEnd

  return path
}

/**
 * Calculate total path length
 */
function calculatePathLength(points: Point[]): number {
  let length = 0
  for (let i = 1; i < points.length; i++) {
    length += manhattanDistance(points[i - 1], points[i])
  }
  return length
}

/**
 * Count total crossings in a path
 */
function countPathCrossings(path: Point[], existingPaths: Point[][]): number {
  let crossings = 0
  for (let i = 1; i < path.length; i++) {
    crossings += countCrossings(path[i - 1], path[i], existingPaths)
  }
  return crossings
}

/**
 * Optimize a path by removing unnecessary waypoints
 */
export function optimizePath(points: Point[]): Point[] {
  if (points.length <= 2) return points

  const optimized: Point[] = [points[0]]
  let i = 0

  while (i < points.length - 1) {
    let j = points.length - 1

    // Find the farthest point that can be reached directly
    while (j > i + 1) {
      if (isCollinear(points[i], points[i + 1], points[j]) ||
          canConnectDirectly(points[i], points[j], points.slice(i + 1, j))) {
        break
      }
      j--
    }

    optimized.push(points[j])
    i = j
  }

  return optimized
}

/**
 * Check if three points are collinear
 */
function isCollinear(p1: Point, p2: Point, p3: Point): boolean {
  const area = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)
  return Math.abs(area) < 0.001
}

/**
 * Check if two points can be connected directly without passing through intermediate points
 */
function canConnectDirectly(start: Point, end: Point, intermediate: Point[]): boolean {
  // Check if any intermediate point lies on the line segment
  for (const point of intermediate) {
    const onSegment =
      point.x >= Math.min(start.x, end.x) &&
      point.x <= Math.max(start.x, end.x) &&
      point.y >= Math.min(start.y, end.y) &&
      point.y <= Math.max(start.y, end.y)

    if (onSegment && isCollinear(start, end, point)) {
      return false
    }
  }
  return true
}

/**
 * Route multiple connectors with global crossing minimization
 */
export function routeMultipleConnectors(
  connections: Array<{
    id: string
    source: { rect: Rect; port: Port }
    target: { rect: Rect; port: Port }
  }>,
  options: RoutingOptions = {}
): Map<string, ConnectorPath> {
  const results = new Map<string, ConnectorPath>()
  const existingPaths: Point[][] = []

  // Sort connections by priority (shorter connections first)
  const sortedConnections = [...connections].sort((a, b) => {
    const distA = manhattanDistance(
      getPortPoint(a.source.rect, a.source.port),
      getPortPoint(a.target.rect, a.target.port)
    )
    const distB = manhattanDistance(
      getPortPoint(b.source.rect, b.source.port),
      getPortPoint(b.target.rect, b.target.port)
    )
    return distA - distB
  })

  for (const connection of sortedConnections) {
    const start = getPortPoint(connection.source.rect, connection.source.port)
    const end = getPortPoint(connection.target.rect, connection.target.port)

    // Build obstacles from other shapes (excluding source and target)
    const otherRects = connections
      .filter(
        (c) =>
          c.id !== connection.id &&
          c.source.rect !== connection.source.rect &&
          c.target.rect !== connection.target.rect
      )
      .map((c) => [c.source.rect, c.target.rect])
      .flat()

    const path = findOrthogonalPath(start, end, {
      ...options,
      avoidShapes: [...(options.avoidShapes || []), ...otherRects],
    })

    // Optimize the path
    const optimizedPath = {
      ...path,
      points: optimizePath(path.points),
    }

    results.set(connection.id, optimizedPath)
    existingPaths.push(optimizedPath.points)
  }

  return results
}

/**
 * Create a connector stroke from a calculated path
 */
export function createConnectorStroke(
  path: ConnectorPath,
  options: {
    id: string
    color: string
    width: number
    userId: string
    sourceStrokeId?: string
    targetStrokeId?: string
    sourcePort?: Port
    targetPort?: Port
  }
): {
  id: string
  points: Array<{ x: number; y: number }>
  color: string
  width: number
  type: 'shape'
  shapeType: 'connector'
  userId: string
  sourceStrokeId?: string
  targetStrokeId?: string
  sourcePort?: Port
  targetPort?: Port
} {
  return {
    id: options.id,
    points: path.points,
    color: options.color,
    width: options.width,
    type: 'shape',
    shapeType: 'connector',
    userId: options.userId,
    sourceStrokeId: options.sourceStrokeId,
    targetStrokeId: options.targetStrokeId,
    sourcePort: options.sourcePort,
    targetPort: options.targetPort,
  }
}

// Export types
export type { Port }
