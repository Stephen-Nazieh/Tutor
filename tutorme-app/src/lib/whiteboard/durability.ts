/**
 * Operation Durability System
 * 
 * Features:
 * - Redis stream persistence for whiteboard operations
 * - Resumable replay with sequence numbers
 * - Snapshot-based recovery
 * - Dead letter queue for failed operations
 * - Compression for large payloads
 */

import { Redis } from 'ioredis'

export interface DurableOperation {
  id: string
  seq: number
  type: 'stroke' | 'delete' | 'update' | 'clear'
  userId: string
  roomId: string
  timestamp: number
  payload: unknown
  checksum?: string
  vectorClock?: Record<string, number>
}

export interface OperationSnapshot {
  id: string
  roomId: string
  seq: number
  timestamp: number
  state: unknown
  operationCount: number
}

export interface ReplayPosition {
  roomId: string
  lastSeq: number
  lastTimestamp: number
  vectorClock: Record<string, number>
}

export interface DeadLetterEntry {
  operation: DurableOperation
  error: string
  failedAt: number
  retryCount: number
  lastError?: string
}

export interface DurabilityMetrics {
  totalOperations: number
  totalSnapshots: number
  deadLetterCount: number
  avgOperationSize: number
  lastSnapshotTime: number
  replayLatencyMs: number
}

// Compression utilities
async function compress(data: string): Promise<Buffer> {
  const { gzip } = await import('zlib')
  const { promisify } = await import('util')
  const gzipAsync = promisify(gzip)
  return gzipAsync(Buffer.from(data))
}

async function decompress(data: Buffer): Promise<string> {
  const { gunzip } = await import('zlib')
  const { promisify } = await import('util')
  const gunzipAsync = promisify(gunzip)
  const result = await gunzipAsync(data)
  return result.toString('utf-8')
}

function generateChecksum(data: string): string {
  // Simple checksum using a hash-like approach
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

export class OperationDurabilityManager {
  private redis: Redis
  private readonly streamPrefix: string
  private readonly snapshotPrefix: string
  private readonly deadLetterPrefix: string
  private readonly positionPrefix: string
  private readonly maxStreamLength: number
  private readonly snapshotInterval: number
  private compressionEnabled: boolean

  constructor(
    redis: Redis,
    options: {
      streamPrefix?: string
      snapshotInterval?: number
      maxStreamLength?: number
      compressionEnabled?: boolean
    } = {}
  ) {
    this.redis = redis
    this.streamPrefix = options.streamPrefix || 'wb:stream'
    this.snapshotPrefix = options.streamPrefix ? `${options.streamPrefix}:snap` : 'wb:snap'
    this.deadLetterPrefix = options.streamPrefix ? `${options.streamPrefix}:dlq` : 'wb:dlq'
    this.positionPrefix = options.streamPrefix ? `${options.streamPrefix}:pos` : 'wb:pos'
    this.snapshotInterval = options.snapshotInterval || 100
    this.maxStreamLength = options.maxStreamLength || 10000
    this.compressionEnabled = options.compressionEnabled ?? true
  }

  /**
   * Append an operation to the durable stream
   */
  async appendOperation(
    roomId: string,
    operation: Omit<DurableOperation, 'seq' | 'timestamp'>
  ): Promise<DurableOperation> {
    const streamKey = `${this.streamPrefix}:${roomId}`
    const positionKey = `${this.positionPrefix}:${roomId}`

    // Get next sequence number
    const seq = await this.redis.incr(`${positionKey}:seq`)

    const durableOp: DurableOperation = {
      ...operation,
      seq,
      timestamp: Date.now(),
    }

    // Generate checksum
    const payloadStr = JSON.stringify(durableOp.payload)
    durableOp.checksum = generateChecksum(payloadStr)

    // Compress if enabled and payload is large
    let storedPayload: string | Buffer = payloadStr
    if (this.compressionEnabled && payloadStr.length > 1024) {
      storedPayload = await compress(payloadStr)
    }

    // Add to Redis stream
    const fields: Record<string, string | Buffer> = {
      id: durableOp.id,
      type: durableOp.type,
      userId: durableOp.userId,
      seq: String(seq),
      timestamp: String(durableOp.timestamp),
      checksum: durableOp.checksum,
      payload: storedPayload,
    }

    if (durableOp.vectorClock) {
      fields.vectorClock = JSON.stringify(durableOp.vectorClock)
    }

    await this.redis.xadd(
      streamKey,
      '*', // Auto-generate ID
      ...Object.entries(fields).flat()
    )

    // Trim stream if too long
    await this.redis.xtrim(streamKey, 'MAXLEN', this.maxStreamLength)

    // Check if we need to create a snapshot
    if (seq % this.snapshotInterval === 0) {
      await this.triggerSnapshot(roomId)
    }

    return durableOp
  }

  /**
   * Read operations from the stream
   */
  async readOperations(
    roomId: string,
    options: {
      startSeq?: number
      endSeq?: number
      count?: number
      reverse?: boolean
    } = {}
  ): Promise<DurableOperation[]> {
    const streamKey = `${this.streamPrefix}:${roomId}`
    const { startSeq = 0, endSeq, count = 100, reverse = false } = options

    // Read from stream
    let entries: [string, string[]][]

    if (reverse) {
      entries = await this.redis.xrevrange(
        streamKey,
        endSeq ? `${endSeq}` : '+',
        startSeq ? `${startSeq}` : '-',
        'COUNT',
        count
      ) as [string, string[]][]
    } else {
      entries = await this.redis.xrange(
        streamKey,
        startSeq ? `${startSeq}` : '-',
        endSeq ? `${endSeq}` : '+',
        'COUNT',
        count
      ) as [string, string[]][]
    }

    const operations: DurableOperation[] = []

    for (const [, fields] of entries) {
      const fieldMap = this.parseFields(fields)
      const payload = fieldMap.payload

      // Decompress if needed
      let parsedPayload: unknown
      try {
        if (Buffer.isBuffer(payload)) {
          const decompressed = await decompress(payload)
          parsedPayload = JSON.parse(decompressed)
        } else {
          parsedPayload = JSON.parse(payload)
        }
      } catch {
        parsedPayload = null
      }

      operations.push({
        id: fieldMap.id,
        seq: parseInt(fieldMap.seq, 10),
        type: fieldMap.type as DurableOperation['type'],
        userId: fieldMap.userId,
        roomId,
        timestamp: parseInt(fieldMap.timestamp, 10),
        payload: parsedPayload,
        checksum: fieldMap.checksum,
        vectorClock: fieldMap.vectorClock ? JSON.parse(fieldMap.vectorClock) : undefined,
      })
    }

    return operations
  }

  /**
   * Create a snapshot of current state
   */
  async createSnapshot(
    roomId: string,
    state: unknown,
    seq: number
  ): Promise<OperationSnapshot> {
    const snapshotKey = `${this.snapshotPrefix}:${roomId}`
    const positionKey = `${this.positionPrefix}:${roomId}`

    const snapshot: OperationSnapshot = {
      id: `snap-${roomId}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      roomId,
      seq,
      timestamp: Date.now(),
      state,
      operationCount: seq,
    }

    // Compress state
    let stateData: string | Buffer = JSON.stringify(state)
    if (this.compressionEnabled && stateData.length > 1024) {
      stateData = await compress(stateData)
    }

    // Store snapshot
    await this.redis.hset(snapshotKey, {
      id: snapshot.id,
      seq: String(seq),
      timestamp: String(snapshot.timestamp),
      state: stateData,
      operationCount: String(seq),
    })

    // Update last snapshot time
    await this.redis.hset(positionKey, 'lastSnapshot', String(snapshot.timestamp))

    return snapshot
  }

  /**
   * Get the latest snapshot for a room
   */
  async getLatestSnapshot(roomId: string): Promise<OperationSnapshot | null> {
    const snapshotKey = `${this.snapshotPrefix}:${roomId}`
    const data = await this.redis.hgetall(snapshotKey)

    if (!data || Object.keys(data).length === 0) {
      return null
    }

    // Decompress state if needed
    let state: unknown
    try {
      const stateData = data.state
      if (Buffer.isBuffer(stateData)) {
        const decompressed = await decompress(stateData)
        state = JSON.parse(decompressed)
      } else {
        state = JSON.parse(stateData)
      }
    } catch {
      state = null
    }

    return {
      id: data.id,
      roomId,
      seq: parseInt(data.seq, 10),
      timestamp: parseInt(data.timestamp, 10),
      state,
      operationCount: parseInt(data.operationCount, 10),
    }
  }

  /**
   * Replay operations from a specific position
   */
  async replayFromPosition(
    roomId: string,
    position: ReplayPosition,
    onOperation: (op: DurableOperation) => void | Promise<void>
  ): Promise<{ operationsApplied: number; lastSeq: number }> {
    const startTime = Date.now()
    const streamKey = `${this.streamPrefix}:${roomId}`

    // First, try to get a snapshot closer to the target position
    const snapshot = await this.getLatestSnapshot(roomId)
    let startSeq = position.lastSeq

    if (snapshot && snapshot.seq > position.lastSeq) {
      // Snapshot is ahead of our position, use it
      startSeq = snapshot.seq
    }

    // Read operations from the stream
    let operationsApplied = 0
    let lastSeq = startSeq
    let cursor = '0'

    while (true) {
      const result = (await this.redis.xread(
        'COUNT',
        100,
        'STREAMS',
        streamKey,
        cursor
      ) as unknown) as [string, [string, string[]][]] | null

      if (!result) break
      
      const [newCursor, entries] = result
      cursor = newCursor

      if (!entries || entries.length === 0) break

      for (const [, fields] of entries) {
        const fieldMap = this.parseFields(fields)
        const seq = parseInt(fieldMap.seq, 10)

        if (seq <= startSeq) continue

        const payload = fieldMap.payload
        let parsedPayload: unknown
        try {
          if (Buffer.isBuffer(payload)) {
            const decompressed = await decompress(payload)
            parsedPayload = JSON.parse(decompressed)
          } else {
            parsedPayload = JSON.parse(payload)
          }
        } catch {
          continue
        }

        const operation: DurableOperation = {
          id: fieldMap.id,
          seq,
          type: fieldMap.type as DurableOperation['type'],
          userId: fieldMap.userId,
          roomId,
          timestamp: parseInt(fieldMap.timestamp, 10),
          payload: parsedPayload,
          checksum: fieldMap.checksum,
          vectorClock: fieldMap.vectorClock ? JSON.parse(fieldMap.vectorClock) : undefined,
        }

        // Verify checksum
        const payloadStr = JSON.stringify(parsedPayload)
        if (generateChecksum(payloadStr) !== operation.checksum) {
          console.warn(`Checksum mismatch for operation ${operation.id}`)
          continue
        }

        await onOperation(operation)
        operationsApplied++
        lastSeq = seq
      }

      if (cursor === '0') break
    }

    // Update replay latency metric
    const replayLatency = Date.now() - startTime
    const positionKey = `${this.positionPrefix}:${roomId}`
    await this.redis.hset(positionKey, 'lastReplayLatency', String(replayLatency))

    return { operationsApplied, lastSeq }
  }

  /**
   * Add an operation to the dead letter queue
   */
  async addToDeadLetter(
    roomId: string,
    operation: DurableOperation,
    error: string
  ): Promise<void> {
    const dlqKey = `${this.deadLetterPrefix}:${roomId}`

    const entry: DeadLetterEntry = {
      operation,
      error,
      failedAt: Date.now(),
      retryCount: 0,
    }

    await this.redis.lpush(dlqKey, JSON.stringify(entry))
    await this.redis.ltrim(dlqKey, 0, 999) // Keep last 1000
  }

  /**
   * Get dead letter queue entries
   */
  async getDeadLetterEntries(roomId: string, count: number = 100): Promise<DeadLetterEntry[]> {
    const dlqKey = `${this.deadLetterPrefix}:${roomId}`
    const entries = await this.redis.lrange(dlqKey, 0, count - 1)

    return entries.map((entry) => {
      try {
        return JSON.parse(entry)
      } catch {
        return null
      }
    }).filter((e): e is DeadLetterEntry => e !== null)
  }

  /**
   * Retry a dead letter entry
   */
  async retryDeadLetter(
    roomId: string,
    operationId: string,
    retryFn: (op: DurableOperation) => Promise<boolean>
  ): Promise<boolean> {
    const dlqKey = `${this.deadLetterPrefix}:${roomId}`
    const entries = await this.redis.lrange(dlqKey, 0, -1)

    for (let i = 0; i < entries.length; i++) {
      const entry: DeadLetterEntry = JSON.parse(entries[i])
      if (entry.operation.id === operationId) {
        entry.retryCount++
        entry.lastError = undefined

        const success = await retryFn(entry.operation)

        if (success) {
          // Remove from DLQ
          await this.redis.lrem(dlqKey, 0, entries[i])
        } else {
          // Update retry count
          await this.redis.lset(dlqKey, i, JSON.stringify(entry))
        }

        return success
      }
    }

    return false
  }

  /**
   * Get replay position for a room
   */
  async getReplayPosition(roomId: string): Promise<ReplayPosition | null> {
    const positionKey = `${this.positionPrefix}:${roomId}`
    const data = await this.redis.hgetall(positionKey)

    if (!data || Object.keys(data).length === 0) {
      return null
    }

    return {
      roomId,
      lastSeq: parseInt(data.lastSeq || '0', 10),
      lastTimestamp: parseInt(data.lastTimestamp || '0', 10),
      vectorClock: data.vectorClock ? JSON.parse(data.vectorClock) : {},
    }
  }

  /**
   * Update replay position
   */
  async updateReplayPosition(roomId: string, position: Partial<ReplayPosition>): Promise<void> {
    const positionKey = `${this.positionPrefix}:${roomId}`
    const updates: Record<string, string> = {}

    if (position.lastSeq !== undefined) {
      updates.lastSeq = String(position.lastSeq)
    }
    if (position.lastTimestamp !== undefined) {
      updates.lastTimestamp = String(position.lastTimestamp)
    }
    if (position.vectorClock !== undefined) {
      updates.vectorClock = JSON.stringify(position.vectorClock)
    }

    await this.redis.hset(positionKey, updates)
  }

  /**
   * Get durability metrics
   */
  async getMetrics(roomId: string): Promise<DurabilityMetrics> {
    const streamKey = `${this.streamPrefix}:${roomId}`
    const snapshotKey = `${this.snapshotPrefix}:${roomId}`
    const dlqKey = `${this.deadLetterPrefix}:${roomId}`
    const positionKey = `${this.positionPrefix}:${roomId}`

    const [
      streamInfo,
      snapshotData,
      dlqLen,
      positionData,
    ] = await Promise.all([
      this.redis.xinfo('STREAM', streamKey).catch(() => null) as Promise<Record<string, string> | null>,
      this.redis.hgetall(snapshotKey),
      this.redis.llen(dlqKey),
      this.redis.hgetall(positionKey),
    ])

    // Calculate average operation size from sample
    const sampleEntries = await this.redis.xrange(streamKey, '-', '+', 'COUNT', 10)
    let totalSize = 0
    for (const [, fields] of sampleEntries as [string, string[]][]) {
      totalSize += JSON.stringify(fields).length
    }
    const avgSize = sampleEntries.length > 0 ? totalSize / sampleEntries.length : 0

    return {
      totalOperations: streamInfo ? parseInt(streamInfo[1], 10) : 0,
      totalSnapshots: snapshotData.operationCount ? 1 : 0,
      deadLetterCount: dlqLen,
      avgOperationSize: avgSize,
      lastSnapshotTime: parseInt(positionData.lastSnapshot || '0', 10),
      replayLatencyMs: parseInt(positionData.lastReplayLatency || '0', 10),
    }
  }

  /**
   * Clean up old data for a room
   */
  async cleanup(roomId: string, olderThanMs: number = 86400000): Promise<void> {
    const cutoff = Date.now() - olderThanMs

    // Clean up old snapshots
    const snapshotKey = `${this.snapshotPrefix}:${roomId}`
    const snapshot = await this.redis.hgetall(snapshotKey)
    if (snapshot.timestamp && parseInt(snapshot.timestamp, 10) < cutoff) {
      await this.redis.del(snapshotKey)
    }

    // Clean up old DLQ entries (simplified - in production, use a more sophisticated approach)
    const dlqKey = `${this.deadLetterPrefix}:${roomId}`
    await this.redis.ltrim(dlqKey, 0, 99) // Keep only recent
  }

  /**
   * Trigger snapshot creation
   */
  private async triggerSnapshot(roomId: string): Promise<void> {
    // This is a placeholder - in practice, the caller would provide state
    // This method is called automatically when the stream reaches certain thresholds
    console.log(`Snapshot triggered for room ${roomId}`)
  }

  /**
   * Parse Redis stream fields
   */
  private parseFields(fields: string[]): Record<string, string> {
    const result: Record<string, string> = {}
    for (let i = 0; i < fields.length; i += 2) {
      result[fields[i]] = fields[i + 1]
    }
    return result
  }
}

// Export singleton factory
let globalManager: OperationDurabilityManager | null = null

export function getDurabilityManager(redis?: Redis): OperationDurabilityManager {
  if (!globalManager && redis) {
    globalManager = new OperationDurabilityManager(redis)
  }
  if (!globalManager) {
    throw new Error('Durability manager not initialized')
  }
  return globalManager
}
