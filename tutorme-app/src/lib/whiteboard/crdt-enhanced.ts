/**
 * Enhanced CRDT (Conflict-free Replicated Data Type) System
 * 
 * Features:
 * - Schema validation for all operations
 * - Idempotency guarantees
 * - Causal ordering with vector clocks
 * - Dead letter queue for malformed operations
 * - Tombstone pruning
 */

import { z } from 'zod'

// =============================================================================
// Schema Definitions
// =============================================================================

export const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
  pressure: z.number().optional(),
})

export const StrokeSchema = z.object({
  id: z.string(),
  points: z.array(PointSchema).min(1),
  color: z.string(),
  width: z.number().positive(),
  type: z.enum(['pen', 'eraser', 'pencil', 'marker', 'highlighter', 'calligraphy', 'shape', 'text']),
  userId: z.string(),
  opacity: z.number().min(0).max(1).optional(),
  shapeType: z.enum(['line', 'arrow', 'rectangle', 'circle', 'triangle', 'connector']).optional(),
  text: z.string().optional(),
  fontSize: z.number().positive().optional(),
  fontFamily: z.string().optional(),
  textStyle: z.object({
    bold: z.boolean().optional(),
    italic: z.boolean().optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
  }).optional(),
  layerId: z.enum(['tutor-broadcast', 'tutor-private', 'student-personal', 'shared-group']).optional(),
  roomScope: z.enum(['main', 'breakout']).optional(),
  groupId: z.string().optional(),
  zIndex: z.number().optional(),
  locked: z.boolean().optional(),
  rotation: z.number().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  sourceStrokeId: z.string().optional(),
  targetStrokeId: z.string().optional(),
  sourcePort: z.enum(['top', 'right', 'bottom', 'left', 'center']).optional(),
  targetPort: z.enum(['top', 'right', 'bottom', 'left', 'center']).optional(),
})

export const VectorClockSchema = z.record(z.string(), z.number().nonnegative())

export const OperationSchema = z.object({
  id: z.string(),
  type: z.enum(['create', 'update', 'delete']),
  elementId: z.string(),
  timestamp: z.number(),
  vectorClock: VectorClockSchema,
  userId: z.string(),
  sessionId: z.string(),
  data: z.record(z.string(), z.unknown()).optional(),
  previousData: z.record(z.string(), z.unknown()).optional(),
})

export type ValidatedStroke = z.infer<typeof StrokeSchema>
export type ValidatedOperation = z.infer<typeof OperationSchema>
export type VectorClock = z.infer<typeof VectorClockSchema>

// =============================================================================
// Validation Result Types
// =============================================================================

export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: z.ZodError
  errorMessage?: string
}

export interface IdempotencyCheck {
  isDuplicate: boolean
  isNewer: boolean
  existingSeq?: number
  incomingSeq?: number
}

export interface CausalOrderResult {
  isOrdered: boolean
  canApply: boolean
  missingDependencies?: string[]
  isConcurrent: boolean
}

export interface DeadLetterEntry {
  operation: unknown
  validationErrors?: string[]
  causalErrors?: string[]
  timestamp: number
  retryCount: number
  lastError?: string
}

// =============================================================================
// Enhanced Vector Clock
// =============================================================================

export class VectorClockManager {
  private clocks = new Map<string, VectorClock>()

  /**
   * Create a new vector clock
   */
  create(): VectorClock {
    return {}
  }

  /**
   * Increment the clock for a specific user
   */
  increment(clock: VectorClock, userId: string): VectorClock {
    return {
      ...clock,
      [userId]: (clock[userId] || 0) + 1,
    }
  }

  /**
   * Merge two vector clocks (take the maximum of each entry)
   */
  merge(a: VectorClock, b: VectorClock): VectorClock {
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
  compare(a: VectorClock, b: VectorClock): -1 | 0 | 1 {
    let aGreater = false
    let bGreater = false

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
  isConcurrent(a: VectorClock, b: VectorClock): boolean {
    return this.compare(a, b) === 0
  }

  /**
   * Check if a happened before b
   */
  happenedBefore(a: VectorClock, b: VectorClock): boolean {
    return this.compare(a, b) === -1
  }

  /**
   * Get string representation for debugging
   */
  toString(clock: VectorClock): string {
    return Object.entries(clock)
      .map(([k, v]) => `${k}:${v}`)
      .join(',')
  }

  /**
   * Store clock for a session
   */
  storeClock(sessionId: string, clock: VectorClock): void {
    this.clocks.set(sessionId, { ...clock })
  }

  /**
   * Get stored clock for a session
   */
  getClock(sessionId: string): VectorClock | undefined {
    const clock = this.clocks.get(sessionId)
    return clock ? { ...clock } : undefined
  }
}

// =============================================================================
// Schema Validator
// =============================================================================

export class SchemaValidator {
  private seenIds = new Set<string>()
  private idTimestamps = new Map<string, number>()
  private readonly dedupWindowMs = 60000 // 1 minute

  /**
   * Validate a stroke
   */
  validateStroke(data: unknown): ValidationResult<ValidatedStroke> {
    const result = StrokeSchema.safeParse(data)
    
    if (!result.success) {
      return {
        success: false,
        errors: result.error,
        errorMessage: result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
      }
    }

    // Additional validations
    const stroke = result.data
    
    // Check for NaN values
    if (stroke.points.some((p) => isNaN(p.x) || isNaN(p.y))) {
      return {
        success: false,
        errorMessage: 'Stroke contains NaN coordinates',
      }
    }

    // Check for infinite values
    if (stroke.points.some((p) => !isFinite(p.x) || !isFinite(p.y))) {
      return {
        success: false,
        errorMessage: 'Stroke contains infinite coordinates',
      }
    }

    return { success: true, data: stroke }
  }

  /**
   * Validate an operation
   */
  validateOperation(data: unknown): ValidationResult<ValidatedOperation> {
    const result = OperationSchema.safeParse(data)
    
    if (!result.success) {
      return {
        success: false,
        errors: result.error,
        errorMessage: result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
      }
    }

    return { success: true, data: result.data }
  }

  /**
   * Check if an operation is a duplicate (idempotency)
   */
  checkIdempotency(operationId: string, timestamp: number): IdempotencyCheck {
    const existing = this.idTimestamps.get(operationId)
    const now = Date.now()

    // Clean up old entries
    this.cleanupOldEntries(now)

    if (existing !== undefined) {
      return {
        isDuplicate: true,
        isNewer: timestamp > existing,
        existingSeq: existing,
        incomingSeq: timestamp,
      }
    }

    // Record this operation
    this.idTimestamps.set(operationId, timestamp)
    this.seenIds.add(operationId)

    return {
      isDuplicate: false,
      isNewer: true,
    }
  }

  /**
   * Clean up old idempotency entries
   */
  private cleanupOldEntries(now: number): void {
    const cutoff = now - this.dedupWindowMs
    
    for (const [id, timestamp] of this.idTimestamps) {
      if (timestamp < cutoff) {
        this.idTimestamps.delete(id)
        this.seenIds.delete(id)
      }
    }
  }

  /**
   * Reset idempotency tracking
   */
  resetIdempotency(): void {
    this.seenIds.clear()
    this.idTimestamps.clear()
  }
}

// =============================================================================
// Causal Ordering Manager
// =============================================================================

export class CausalOrderingManager {
  private vectorClockManager = new VectorClockManager()
  private pendingOperations = new Map<string, ValidatedOperation[]>()
  private appliedClocks = new Map<string, VectorClock>()

  /**
   * Check if an operation can be applied (causal ordering)
   */
  checkCausalOrder(
    operation: ValidatedOperation,
    currentClock: VectorClock
  ): CausalOrderResult {
    const opClock = operation.vectorClock

    // Check if this operation causally depends on unseen operations
    const missingDependencies: string[] = []
    
    for (const [userId, seq] of Object.entries(opClock)) {
      const currentSeq = currentClock[userId] || 0
      if (seq > currentSeq + 1) {
        // We missed some operations from this user
        for (let i = currentSeq + 1; i < seq; i++) {
          missingDependencies.push(`${userId}:${i}`)
        }
      }
    }

    if (missingDependencies.length > 0) {
      // Queue this operation for later
      const key = this.getOperationKey(operation)
      const pending = this.pendingOperations.get(key) || []
      pending.push(operation)
      this.pendingOperations.set(key, pending)

      return {
        isOrdered: false,
        canApply: false,
        missingDependencies,
        isConcurrent: false,
      }
    }

    // Check for concurrency
    const isConcurrent = this.vectorClockManager.isConcurrent(opClock, currentClock)

    return {
      isOrdered: true,
      canApply: true,
      isConcurrent,
    }
  }

  /**
   * Update the current clock after applying an operation
   */
  updateClock(sessionId: string, operation: ValidatedOperation): VectorClock {
    const currentClock = this.appliedClocks.get(sessionId) || {}
    const newClock = this.vectorClockManager.merge(currentClock, operation.vectorClock)
    this.appliedClocks.set(sessionId, newClock)

    // Check if any pending operations can now be applied
    this.processPendingOperations(sessionId, newClock)

    return newClock
  }

  /**
   * Get current clock for a session
   */
  getClock(sessionId: string): VectorClock {
    return { ...(this.appliedClocks.get(sessionId) || {}) }
  }

  /**
   * Process pending operations that may now be applicable
   */
  private processPendingOperations(sessionId: string, currentClock: VectorClock): void {
    this.pendingOperations.forEach((operations, key) => {
      const stillPending: ValidatedOperation[] = []
      
      for (const op of operations) {
        const result = this.checkCausalOrder(op, currentClock)
        if (!result.canApply) {
          stillPending.push(op)
        }
      }

      if (stillPending.length === 0) {
        this.pendingOperations.delete(key)
      } else {
        this.pendingOperations.set(key, stillPending)
      }
    })
  }

  /**
   * Get pending operations count
   */
  getPendingCount(): number {
    let count = 0
    this.pendingOperations.forEach((ops) => {
      count += ops.length
    })
    return count
  }

  /**
   * Generate unique operation key
   */
  private getOperationKey(operation: ValidatedOperation): string {
    return `${operation.sessionId}:${operation.elementId}`
  }

  /**
   * Clear pending operations
   */
  clearPending(): void {
    this.pendingOperations.clear()
  }
}

// =============================================================================
// Dead Letter Queue
// =============================================================================

export class DeadLetterQueue {
  private entries: DeadLetterEntry[] = []
  private readonly maxSize: number
  private readonly maxRetries: number

  constructor(maxSize: number = 1000, maxRetries: number = 3) {
    this.maxSize = maxSize
    this.maxRetries = maxRetries
  }

  /**
   * Add an entry to the dead letter queue
   */
  add(
    operation: unknown,
    errors: { validation?: string[]; causal?: string[] }
  ): void {
    const entry: DeadLetterEntry = {
      operation,
      validationErrors: errors.validation,
      causalErrors: errors.causal,
      timestamp: Date.now(),
      retryCount: 0,
    }

    this.entries.push(entry)

    // Trim if exceeds max size
    if (this.entries.length > this.maxSize) {
      this.entries = this.entries.slice(-this.maxSize)
    }
  }

  /**
   * Get all entries
   */
  getEntries(): DeadLetterEntry[] {
    return [...this.entries]
  }

  /**
   * Get entries that can be retried
   */
  getRetryableEntries(): DeadLetterEntry[] {
    return this.entries.filter((e) => e.retryCount < this.maxRetries)
  }

  /**
   * Mark an entry as retried
   */
  markRetried(index: number, error?: string): void {
    if (index >= 0 && index < this.entries.length) {
      this.entries[index].retryCount++
      this.entries[index].lastError = error
    }
  }

  /**
   * Remove an entry
   */
  remove(index: number): void {
    if (index >= 0 && index < this.entries.length) {
      this.entries.splice(index, 1)
    }
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.entries = []
  }

  /**
   * Get queue stats
   */
  getStats(): {
    total: number
    retryable: number
    permanentlyFailed: number
  } {
    return {
      total: this.entries.length,
      retryable: this.getRetryableEntries().length,
      permanentlyFailed: this.entries.filter((e) => e.retryCount >= this.maxRetries).length,
    }
  }
}

// =============================================================================
// Tombstone Manager
// =============================================================================

export class TombstoneManager {
  private tombstones = new Map<string, {
    deletedAt: number
    deletedBy: string
    operationId: string
  }>()
  private readonly pruneThresholdMs: number

  constructor(pruneThresholdMs: number = 86400000) { // 24 hours
    this.pruneThresholdMs = pruneThresholdMs
  }

  /**
   * Add a tombstone for a deleted element
   */
  add(elementId: string, deletedBy: string, operationId: string): void {
    this.tombstones.set(elementId, {
      deletedAt: Date.now(),
      deletedBy,
      operationId,
    })
  }

  /**
   * Check if an element is deleted
   */
  isDeleted(elementId: string): boolean {
    return this.tombstones.has(elementId)
  }

  /**
   * Get tombstone info
   */
  getTombstone(elementId: string): {
    deletedAt: number
    deletedBy: string
    operationId: string
  } | undefined {
    return this.tombstones.get(elementId)
  }

  /**
   * Prune old tombstones
   */
  prune(): string[] {
    const now = Date.now()
    const pruned: string[] = []

    for (const [id, info] of this.tombstones) {
      if (now - info.deletedAt > this.pruneThresholdMs) {
        this.tombstones.delete(id)
        pruned.push(id)
      }
    }

    return pruned
  }

  /**
   * Get all tombstones
   */
  getAll(): Map<string, { deletedAt: number; deletedBy: string; operationId: string }> {
    return new Map(this.tombstones)
  }

  /**
   * Clear all tombstones
   */
  clear(): void {
    this.tombstones.clear()
  }
}

// =============================================================================
// Enhanced CRDT Manager
// =============================================================================

export class EnhancedCRDTManager {
  private validator = new SchemaValidator()
  private causalManager = new CausalOrderingManager()
  private vectorClockManager = new VectorClockManager()
  private dlq = new DeadLetterQueue()
  private tombstoneManager = new TombstoneManager()
  private elements = new Map<string, ValidatedStroke>()

  constructor(
    private userId: string,
    private sessionId: string
  ) {}

  /**
   * Apply an operation with full validation and ordering
   */
  applyOperation(operation: unknown): {
    success: boolean
    applied: boolean
    conflict?: boolean
    error?: string
  } {
    // Step 1: Schema validation
    const validation = this.validator.validateOperation(operation)
    if (!validation.success) {
      this.dlq.add(operation, { validation: [validation.errorMessage!] })
      return { success: false, applied: false, error: validation.errorMessage }
    }

    const op = validation.data!

    // Step 2: Idempotency check
    const idempotency = this.validator.checkIdempotency(op.id, op.timestamp)
    if (idempotency.isDuplicate && !idempotency.isNewer) {
      return { success: true, applied: false } // Already applied
    }

    // Step 3: Causal ordering check
    const currentClock = this.causalManager.getClock(this.sessionId)
    const causalResult = this.causalManager.checkCausalOrder(op, currentClock)
    
    if (!causalResult.canApply) {
      this.dlq.add(operation, {
        causal: [`Missing dependencies: ${causalResult.missingDependencies?.join(', ')}`],
      })
      return {
        success: false,
        applied: false,
        error: `Missing causal dependencies: ${causalResult.missingDependencies?.join(', ')}`,
      }
    }

    // Step 4: Apply the operation
    let applied = false
    let conflict = false

    switch (op.type) {
      case 'create':
        applied = this.applyCreate(op)
        break
      case 'update':
        const updateResult = this.applyUpdate(op)
        applied = updateResult.applied
        conflict = updateResult.conflict
        break
      case 'delete':
        applied = this.applyDelete(op)
        break
    }

    if (applied) {
      // Update causal clock
      this.causalManager.updateClock(this.sessionId, op)
    }

    return { success: true, applied, conflict }
  }

  /**
   * Apply a create operation
   */
  private applyCreate(op: ValidatedOperation): boolean {
    if (!op.data) return false

    const validation = this.validator.validateStroke(op.data)
    if (!validation.success) return false

    const stroke = validation.data!

    // Check tombstone
    if (this.tombstoneManager.isDeleted(stroke.id)) {
      return false
    }

    // Check if already exists
    if (this.elements.has(stroke.id)) {
      return false
    }

    this.elements.set(stroke.id, stroke)
    return true
  }

  /**
   * Apply an update operation
   */
  private applyUpdate(op: ValidatedOperation): { applied: boolean; conflict: boolean } {
    const existing = this.elements.get(op.elementId)
    if (!existing) {
      return { applied: false, conflict: false }
    }

    // Check tombstone
    if (this.tombstoneManager.isDeleted(op.elementId)) {
      return { applied: false, conflict: false }
    }

    // Check for concurrent modification
    const currentClock = this.causalManager.getClock(this.sessionId)
    if (op.vectorClock) {
      const isConcurrent = this.vectorClockManager.isConcurrent(op.vectorClock, currentClock)
      if (isConcurrent) {
        // Conflict detected - apply both changes (last-write-wins with merge)
        const merged = { ...existing, ...op.data }
        const validation = this.validator.validateStroke(merged)
        if (validation.success) {
          this.elements.set(op.elementId, validation.data!)
          return { applied: true, conflict: true }
        }
      }
    }

    // Apply update
    const updated = { ...existing, ...op.data }
    const validation = this.validator.validateStroke(updated)
    if (validation.success) {
      this.elements.set(op.elementId, validation.data!)
      return { applied: true, conflict: false }
    }

    return { applied: false, conflict: false }
  }

  /**
   * Apply a delete operation
   */
  private applyDelete(op: ValidatedOperation): boolean {
    const existing = this.elements.get(op.elementId)
    if (!existing) return false

    // Add tombstone
    this.tombstoneManager.add(op.elementId, op.userId, op.id)
    
    // Remove element
    this.elements.delete(op.elementId)
    return true
  }

  /**
   * Get current state
   */
  getState(): {
    elements: Map<string, ValidatedStroke>
    clock: VectorClock
    pendingCount: number
    dlqStats: ReturnType<DeadLetterQueue['getStats']>
  } {
    return {
      elements: new Map(this.elements),
      clock: this.causalManager.getClock(this.sessionId),
      pendingCount: this.causalManager.getPendingCount(),
      dlqStats: this.dlq.getStats(),
    }
  }

  /**
   * Get all elements
   */
  getElements(): ValidatedStroke[] {
    return Array.from(this.elements.values())
  }

  /**
   * Get dead letter queue
   */
  getDLQ(): DeadLetterQueue {
    return this.dlq
  }

  /**
   * Prune tombstones
   */
  pruneTombstones(): string[] {
    return this.tombstoneManager.prune()
  }

  /**
   * Create operation with vector clock
   */
  createOperation(
    type: ValidatedOperation['type'],
    elementId: string,
    data?: Record<string, unknown>,
    previousData?: Record<string, unknown>
  ): ValidatedOperation {
    const currentClock = this.causalManager.getClock(this.sessionId)
    const newClock = this.vectorClockManager.increment(currentClock, this.userId)

    const op: ValidatedOperation = {
      id: `${this.userId}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      type,
      elementId,
      timestamp: Date.now(),
      vectorClock: newClock,
      userId: this.userId,
      sessionId: this.sessionId,
      data,
      previousData,
    }

    return op
  }
}
