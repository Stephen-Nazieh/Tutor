/**
 * CRDT (Conflict-free Replicated Data Type) Implementation for Math Whiteboard
 * 
 * This module provides operational transform and conflict resolution
 * for collaborative whiteboard editing.
 */

import type { AnyMathElement } from '@/types/math-whiteboard'

// =============================================================================
// Types
// =============================================================================

export interface VectorClock {
  [userId: string]: number
}

export interface Operation {
  id: string
  type: 'create' | 'update' | 'delete'
  elementId: string
  timestamp: number
  vectorClock: VectorClock
  userId: string
  sessionId: string
  data?: Partial<AnyMathElement>
  previousData?: Partial<AnyMathElement>
}

export interface CRDTState {
  elements: Map<string, AnyMathElement>
  operations: Operation[]
  vectorClock: VectorClock
  tombstones: Set<string> // Deleted element IDs
}

export interface ConflictResolution {
  winner: AnyMathElement
  loser: AnyMathElement
  strategy: 'timestamp' | 'vector-clock' | 'user-priority'
}

// =============================================================================
// Vector Clock Operations
// =============================================================================

export class VectorClockUtil {
  /**
   * Create a new vector clock
   */
  static create(): VectorClock {
    return {}
  }

  /**
   * Increment the clock for a specific user
   */
  static increment(clock: VectorClock, userId: string): VectorClock {
    return {
      ...clock,
      [userId]: (clock[userId] || 0) + 1,
    }
  }

  /**
   * Merge two vector clocks (take the maximum of each entry)
   */
  static merge(a: VectorClock, b: VectorClock): VectorClock {
    const result: VectorClock = { ...a }
    
    for (const [userId, count] of Object.entries(b)) {
      result[userId] = Math.max(result[userId] || 0, count)
    }
    
    return result
  }

  /**
   * Compare two vector clocks
   * Returns:
   *   -1: a < b (a happened before b)
   *    0: a || b (concurrent, no ordering)
   *    1: a > b (a happened after b)
   */
  static compare(a: VectorClock, b: VectorClock): -1 | 0 | 1 {
    let aGreater = false
    let bGreater = false

    // Check all keys from both clocks
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)])
    
    for (const key of allKeys) {
      const aVal = a[key] || 0
      const bVal = b[key] || 0
      
      if (aVal > bVal) aGreater = true
      if (bVal > aVal) bGreater = true
    }

    if (aGreater && !bGreater) return 1
    if (bGreater && !aGreater) return -1
    return 0
  }

  /**
   * Check if two operations are concurrent
   */
  static isConcurrent(a: VectorClock, b: VectorClock): boolean {
    return this.compare(a, b) === 0
  }

  /**
   * Create a string representation for debugging
   */
  static toString(clock: VectorClock): string {
    return Object.entries(clock)
      .map(([k, v]) => `${k}:${v}`)
      .join(',')
  }
}

// =============================================================================
// Operation Log
// =============================================================================

export class OperationLog {
  private operations: Operation[] = []
  private maxSize: number

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize
  }

  /**
   * Add an operation to the log
   */
  add(operation: Operation): void {
    this.operations.push(operation)
    
    // Trim old operations if exceeding max size
    if (this.operations.length > this.maxSize) {
      this.operations = this.operations.slice(-this.maxSize)
    }
  }

  /**
   * Get all operations
   */
  getAll(): Operation[] {
    return [...this.operations]
  }

  /**
   * Get operations since a specific timestamp
   */
  getSince(timestamp: number): Operation[] {
    return this.operations.filter(op => op.timestamp > timestamp)
  }

  /**
   * Get operations for a specific element
   */
  getForElement(elementId: string): Operation[] {
    return this.operations.filter(op => op.elementId === elementId)
  }

  /**
   * Get the last operation
   */
  getLast(): Operation | undefined {
    return this.operations[this.operations.length - 1]
  }

  /**
   * Clear all operations
   */
  clear(): void {
    this.operations = []
  }

  /**
   * Get operation count
   */
  get size(): number {
    return this.operations.length
  }

  /**
   * Serialize to JSON
   */
  toJSON(): string {
    return JSON.stringify(this.operations)
  }

  /**
   * Load from JSON
   */
  fromJSON(json: string): void {
    try {
      this.operations = JSON.parse(json)
    } catch {
      this.operations = []
    }
  }
}

// =============================================================================
// CRDT Manager
// =============================================================================

export class CRDTManager {
  private state: CRDTState
  private operationLog: OperationLog
  private userId: string
  private sessionId: string

  constructor(userId: string, sessionId: string) {
    this.userId = userId
    this.sessionId = sessionId
    this.state = {
      elements: new Map(),
      operations: [],
      vectorClock: VectorClockUtil.create(),
      tombstones: new Set(),
    }
    this.operationLog = new OperationLog()
  }

  /**
   * Create a new element
   */
  createElement(element: AnyMathElement): Operation {
    const clock = VectorClockUtil.increment(this.state.vectorClock, this.userId)
    this.state.vectorClock = clock

    const operation: Operation = {
      id: this.generateOpId(),
      type: 'create',
      elementId: element.id,
      timestamp: Date.now(),
      vectorClock: { ...clock },
      userId: this.userId,
      sessionId: this.sessionId,
      data: element,
    }

    this.applyOperation(operation)
    return operation
  }

  /**
   * Update an existing element
   */
  updateElement(elementId: string, changes: Partial<AnyMathElement>): Operation | null {
    const existing = this.state.elements.get(elementId)
    if (!existing) return null

    const clock = VectorClockUtil.increment(this.state.vectorClock, this.userId)
    this.state.vectorClock = clock

    const operation: Operation = {
      id: this.generateOpId(),
      type: 'update',
      elementId,
      timestamp: Date.now(),
      vectorClock: { ...clock },
      userId: this.userId,
      sessionId: this.sessionId,
      data: changes,
      previousData: this.extractChanges(existing, changes),
    }

    this.applyOperation(operation)
    return operation
  }

  /**
   * Delete an element
   */
  deleteElement(elementId: string): Operation | null {
    const existing = this.state.elements.get(elementId)
    if (!existing) return null

    const clock = VectorClockUtil.increment(this.state.vectorClock, this.userId)
    this.state.vectorClock = clock

    const operation: Operation = {
      id: this.generateOpId(),
      type: 'delete',
      elementId,
      timestamp: Date.now(),
      vectorClock: { ...clock },
      userId: this.userId,
      sessionId: this.sessionId,
      previousData: existing,
    }

    this.applyOperation(operation)
    return operation
  }

  /**
   * Apply an operation (local or remote)
   */
  applyOperation(operation: Operation): boolean {
    // Update vector clock
    this.state.vectorClock = VectorClockUtil.merge(
      this.state.vectorClock,
      operation.vectorClock
    )

    // Handle based on operation type
    switch (operation.type) {
      case 'create':
        return this.applyCreate(operation)
      case 'update':
        return this.applyUpdate(operation)
      case 'delete':
        return this.applyDelete(operation)
      default:
        return false
    }
  }

  /**
   * Apply a create operation
   */
  private applyCreate(operation: Operation): boolean {
    if (!operation.data) return false

    const element = operation.data as AnyMathElement
    
    // Check for conflicts (element already exists)
    const existing = this.state.elements.get(element.id)
    if (existing) {
      // Resolve conflict - keep the one with earlier timestamp
      if (element.version < existing.version) {
        this.state.elements.set(element.id, {
          ...element,
          version: Math.max(element.version, existing.version) + 1,
        })
        this.operationLog.add(operation)
        return true
      }
      return false
    }

    this.state.elements.set(element.id, element)
    this.operationLog.add(operation)
    return true
  }

  /**
   * Apply an update operation with conflict resolution
   */
  private applyUpdate(operation: Operation): boolean {
    const existing = this.state.elements.get(operation.elementId)
    if (!existing || this.state.tombstones.has(operation.elementId)) {
      return false
    }

    // Get all operations for this element
    const elementOps = this.operationLog.getForElement(operation.elementId)
    const lastUpdate = elementOps.filter(op => op.type === 'update').pop()

    // Check for conflicts
    if (lastUpdate && VectorClockUtil.isConcurrent(
      operation.vectorClock,
      lastUpdate.vectorClock
    )) {
      // Conflict detected - use Last-Writer-Wins with user priority
      const resolution = this.resolveConflict(existing, operation, lastUpdate)
      
      if (resolution.winner.id === operation.elementId) {
        // Apply the new operation
        const updated = { ...existing, ...operation.data } as AnyMathElement
        this.state.elements.set(operation.elementId, updated)
        this.operationLog.add(operation)
        return true
      }
      return false
    }

    // No conflict - apply update
    const updated = { ...existing, ...operation.data } as AnyMathElement
    updated.version = (updated.version || 0) + 1
    updated.lastModified = Date.now()
    updated.modifiedBy = operation.userId
    
    this.state.elements.set(operation.elementId, updated)
    this.operationLog.add(operation)
    return true
  }

  /**
   * Apply a delete operation
   */
  private applyDelete(operation: Operation): boolean {
    const existing = this.state.elements.get(operation.elementId)
    if (!existing) return false

    // Add to tombstones
    this.state.tombstones.add(operation.elementId)
    
    // Remove from elements
    this.state.elements.delete(operation.elementId)
    
    this.operationLog.add(operation)
    return true
  }

  /**
   * Resolve a conflict between concurrent operations
   */
  private resolveConflict(
    current: AnyMathElement,
    incoming: Operation,
    existing: Operation
  ): ConflictResolution {
    // Strategy: Last-Writer-Wins with user priority (tutor > student)
    const incomingPriority = this.getUserPriority(incoming.userId)
    const existingPriority = this.getUserPriority(existing.userId)

    if (incomingPriority !== existingPriority) {
      return {
        winner: incomingPriority > existingPriority 
          ? { ...current, ...incoming.data } as AnyMathElement
          : current,
        loser: incomingPriority > existingPriority 
          ? current
          : { ...current, ...incoming.data } as AnyMathElement,
        strategy: 'user-priority',
      }
    }

    // Same priority - use timestamp
    if (incoming.timestamp > existing.timestamp) {
      return {
        winner: { ...current, ...incoming.data } as AnyMathElement,
        loser: current,
        strategy: 'timestamp',
      }
    }

    return {
      winner: current,
      loser: { ...current, ...incoming.data } as AnyMathElement,
      strategy: 'timestamp',
    }
  }

  /**
   * Get user priority for conflict resolution
   * Tutors have higher priority than students
   */
  private getUserPriority(userId: string): number {
    // This is a simplified version - in production, you'd check the user's role
    // For now, we'll use a simple heuristic
    if (userId.startsWith('tutor')) return 2
    if (userId === this.userId) return 1
    return 0
  }

  /**
   * Get current state
   */
  getState(): CRDTState {
    return {
      elements: new Map(this.state.elements),
      operations: [...this.state.operations],
      vectorClock: { ...this.state.vectorClock },
      tombstones: new Set(this.state.tombstones),
    }
  }

  /**
   * Get all elements
   */
  getElements(): AnyMathElement[] {
    return Array.from(this.state.elements.values())
  }

  /**
   * Get a specific element
   */
  getElement(id: string): AnyMathElement | undefined {
    return this.state.elements.get(id)
  }

  /**
   * Get vector clock
   */
  getVectorClock(): VectorClock {
    return { ...this.state.vectorClock }
  }

  /**
   * Get operation log
   */
  getOperationLog(): OperationLog {
    return this.operationLog
  }

  /**
   * Set user ID (for reconnections)
   */
  setUserId(userId: string): void {
    this.userId = userId
  }

  /**
   * Import state from another CRDT (for syncing)
   */
  importState(state: CRDTState): void {
    this.state = {
      elements: new Map(state.elements),
      operations: [...state.operations],
      vectorClock: { ...state.vectorClock },
      tombstones: new Set(state.tombstones),
    }
  }

  /**
   * Serialize to JSON
   */
  toJSON(): string {
    return JSON.stringify({
      elements: Array.from(this.state.elements.entries()),
      vectorClock: this.state.vectorClock,
      tombstones: Array.from(this.state.tombstones),
    })
  }

  /**
   * Load from JSON
   */
  fromJSON(json: string): void {
    try {
      const data = JSON.parse(json)
      this.state.elements = new Map(data.elements)
      this.state.vectorClock = data.vectorClock
      this.state.tombstones = new Set(data.tombstones)
    } catch {
      // Ignore parse errors
    }
  }

  /**
   * Extract only changed fields from an element
   */
  private extractChanges(
    element: AnyMathElement,
    changes: Partial<AnyMathElement>
  ): Partial<AnyMathElement> {
    const result: Partial<AnyMathElement> = {}
    for (const [key, value] of Object.entries(changes)) {
      if ((element as any)[key] !== value) {
        (result as any)[key] = (element as any)[key]
      }
    }
    return result
  }

  /**
   * Generate a unique operation ID
   */
  private generateOpId(): string {
    return `${this.userId}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
  }
}

// =============================================================================
// Undo/Redo System
// =============================================================================

export class UndoRedoManager {
  private undoStack: Operation[] = []
  private redoStack: Operation[] = []
  private maxStackSize: number = 50

  /**
   * Add an operation to the undo stack
   */
  push(operation: Operation): void {
    this.undoStack.push(operation)
    
    // Clear redo stack when new operation is added
    this.redoStack = []
    
    // Limit stack size
    if (this.undoStack.length > this.maxStackSize) {
      this.undoStack.shift()
    }
  }

  /**
   * Check if undo is available
   */
  canUndo(): boolean {
    return this.undoStack.length > 0
  }

  /**
   * Check if redo is available
   */
  canRedo(): boolean {
    return this.redoStack.length > 0
  }

  /**
   * Pop an operation from the undo stack
   */
  undo(): Operation | undefined {
    const operation = this.undoStack.pop()
    if (operation) {
      this.redoStack.push(operation)
    }
    return operation
  }

  /**
   * Pop an operation from the redo stack
   */
  redo(): Operation | undefined {
    const operation = this.redoStack.pop()
    if (operation) {
      this.undoStack.push(operation)
    }
    return operation
  }

  /**
   * Get the inverse of an operation (for undoing)
   */
  getInverseOperation(operation: Operation): Operation | null {
    switch (operation.type) {
      case 'create':
        // Inverse of create is delete
        return {
          ...operation,
          id: `inverse-${operation.id}`,
          type: 'delete',
          timestamp: Date.now(),
        }
      case 'update':
        // Inverse of update is update with previous data
        if (!operation.previousData) return null
        return {
          ...operation,
          id: `inverse-${operation.id}`,
          type: 'update',
          data: operation.previousData,
          previousData: operation.data,
          timestamp: Date.now(),
        }
      case 'delete':
        // Inverse of delete is create
        if (!operation.previousData) return null
        return {
          ...operation,
          id: `inverse-${operation.id}`,
          type: 'create',
          data: operation.previousData,
          timestamp: Date.now(),
        }
      default:
        return null
    }
  }

  /**
   * Clear all stacks
   */
  clear(): void {
    this.undoStack = []
    this.redoStack = []
  }

  /**
   * Get stack sizes for debugging
   */
  getStats(): { undo: number; redo: number } {
    return {
      undo: this.undoStack.length,
      redo: this.redoStack.length,
    }
  }
}

// =============================================================================
// Session Replay
// =============================================================================

export class SessionReplay {
  private operations: Operation[] = []
  private startTime: number

  constructor() {
    this.startTime = Date.now()
  }

  /**
   * Record an operation
   */
  record(operation: Operation): void {
    this.operations.push({
      ...operation,
      timestamp: Date.now() - this.startTime, // Relative timestamp
    })
  }

  /**
   * Get all operations
   */
  getOperations(): Operation[] {
    return [...this.operations]
  }

  /**
   * Export replay data
   */
  export(): string {
    return JSON.stringify({
      startTime: this.startTime,
      operations: this.operations,
    })
  }

  /**
   * Load replay data
   */
  import(data: string): void {
    try {
      const parsed = JSON.parse(data)
      this.startTime = parsed.startTime
      this.operations = parsed.operations
    } catch {
      // Ignore parse errors
    }
  }

  /**
   * Replay operations at a specific speed
   */
  async replay(
    onOperation: (op: Operation) => void,
    speed: number = 1
  ): Promise<void> {
    let lastTime = 0
    
    for (const op of this.operations) {
      const delay = (op.timestamp - lastTime) / speed
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
      onOperation(op)
      lastTime = op.timestamp
    }
  }
}

// =============================================================================
// Export
// =============================================================================

export const CRDT = {
  VectorClock: VectorClockUtil,
  Manager: CRDTManager,
  OperationLog,
  UndoRedo: UndoRedoManager,
  Replay: SessionReplay,
}

export default CRDT
