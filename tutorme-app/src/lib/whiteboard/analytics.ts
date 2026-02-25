/**
 * Analytics Cockpit
 * 
 * Features:
 * - Ops/sec monitoring
 * - Conflict drop tracking
 * - Reconnect count
 * - Latency percentiles (p50, p95, p99)
 * - Real-time dashboard metrics
 */

export interface LatencySample {
  timestamp: number
  latencyMs: number
  operation: string
  userId: string
}

export interface OperationMetric {
  timestamp: number
  opType: string
  userId: string
  success: boolean
  dropped: boolean
  dropReason?: string
  latencyMs: number
}

export interface ReconnectEvent {
  timestamp: number
  userId: string
  durationMs: number
  missedOperations: number
}

export interface ConflictEvent {
  timestamp: number
  userId: string
  elementId: string
  resolution: 'timestamp' | 'vector_clock' | 'user_priority'
  resolvedInFavor: 'local' | 'remote'
}

export interface AnalyticsSnapshot {
  timestamp: number
  opsPerSecond: number
  conflictRate: number
  dropRate: number
  avgLatencyMs: number
  p50LatencyMs: number
  p95LatencyMs: number
  p99LatencyMs: number
  activeUsers: number
  reconnectRate: number
  queueDepth: number
}

export class WhiteboardAnalytics {
  private latencySamples: LatencySample[] = []
  private operationMetrics: OperationMetric[] = []
  private reconnectEvents: ReconnectEvent[] = []
  private conflictEvents: ConflictEvent[] = []
  
  private maxSamples = 10000
  private sampleWindowMs = 60000 // 1 minute
  
  private onSnapshot?: (snapshot: AnalyticsSnapshot) => void
  private snapshotInterval: ReturnType<typeof setInterval> | null = null

  constructor(options: {
    onSnapshot?: (snapshot: AnalyticsSnapshot) => void
    snapshotIntervalMs?: number
  } = {}) {
    this.onSnapshot = options.onSnapshot
    
    if (options.snapshotIntervalMs) {
      this.startSnapshotting(options.snapshotIntervalMs)
    }
  }

  // ============================================================================
  // Recording Metrics
  // ============================================================================

  /**
   * Record a latency sample
   */
  recordLatency(sample: Omit<LatencySample, 'timestamp'>): void {
    this.latencySamples.push({
      ...sample,
      timestamp: Date.now(),
    })
    
    this.trimSamples()
  }

  /**
   * Record an operation metric
   */
  recordOperation(metric: Omit<OperationMetric, 'timestamp'>): void {
    this.operationMetrics.push({
      ...metric,
      timestamp: Date.now(),
    })
    
    this.trimSamples()
  }

  /**
   * Record a reconnect event
   */
  recordReconnect(event: Omit<ReconnectEvent, 'timestamp'>): void {
    this.reconnectEvents.push({
      ...event,
      timestamp: Date.now(),
    })
    
    this.trimSamples()
  }

  /**
   * Record a conflict event
   */
  recordConflict(event: Omit<ConflictEvent, 'timestamp'>): void {
    this.conflictEvents.push({
      ...event,
      timestamp: Date.now(),
    })
    
    this.trimSamples()
  }

  /**
   * Trim old samples
   */
  private trimSamples(): void {
    const cutoff = Date.now() - this.sampleWindowMs
    
    this.latencySamples = this.latencySamples.filter((s) => s.timestamp > cutoff)
    this.operationMetrics = this.operationMetrics.filter((m) => m.timestamp > cutoff)
    this.reconnectEvents = this.reconnectEvents.filter((e) => e.timestamp > cutoff)
    this.conflictEvents = this.conflictEvents.filter((e) => e.timestamp > cutoff)

    // Enforce max samples
    if (this.latencySamples.length > this.maxSamples) {
      this.latencySamples = this.latencySamples.slice(-this.maxSamples)
    }
    if (this.operationMetrics.length > this.maxSamples) {
      this.operationMetrics = this.operationMetrics.slice(-this.maxSamples)
    }
  }

  // ============================================================================
  // Calculating Metrics
  // ============================================================================

  /**
   * Calculate operations per second
   */
  getOpsPerSecond(windowMs: number = 10000): number {
    const cutoff = Date.now() - windowMs
    const recentOps = this.operationMetrics.filter((m) => m.timestamp > cutoff)
    
    return recentOps.length / (windowMs / 1000)
  }

  /**
   * Calculate latency percentiles
   */
  getLatencyPercentiles(): {
    p50: number
    p95: number
    p99: number
    min: number
    max: number
    avg: number
  } {
    if (this.latencySamples.length === 0) {
      return { p50: 0, p95: 0, p99: 0, min: 0, max: 0, avg: 0 }
    }

    const sorted = this.latencySamples
      .map((s) => s.latencyMs)
      .sort((a, b) => a - b)

    const len = sorted.length
    const sum = sorted.reduce((a, b) => a + b, 0)

    return {
      p50: sorted[Math.floor(len * 0.5)],
      p95: sorted[Math.floor(len * 0.95)],
      p99: sorted[Math.floor(len * 0.99)],
      min: sorted[0],
      max: sorted[len - 1],
      avg: sum / len,
    }
  }

  /**
   * Calculate conflict rate
   */
  getConflictRate(windowMs: number = 60000): number {
    const cutoff = Date.now() - windowMs
    const recentConflicts = this.conflictEvents.filter((e) => e.timestamp > cutoff)
    const recentOps = this.operationMetrics.filter((m) => m.timestamp > cutoff)
    
    if (recentOps.length === 0) return 0
    
    return recentConflicts.length / recentOps.length
  }

  /**
   * Calculate drop rate
   */
  getDropRate(windowMs: number = 60000): number {
    const cutoff = Date.now() - windowMs
    const recentOps = this.operationMetrics.filter((m) => m.timestamp > cutoff)
    const droppedOps = recentOps.filter((m) => m.dropped)
    
    if (recentOps.length === 0) return 0
    
    return droppedOps.length / recentOps.length
  }

  /**
   * Get drop reasons breakdown
   */
  getDropReasons(windowMs: number = 60000): Record<string, number> {
    const cutoff = Date.now() - windowMs
    const droppedOps = this.operationMetrics.filter(
      (m) => m.dropped && m.timestamp > cutoff
    )

    const reasons: Record<string, number> = {}
    droppedOps.forEach((op) => {
      const reason = op.dropReason || 'unknown'
      reasons[reason] = (reasons[reason] || 0) + 1
    })

    return reasons
  }

  /**
   * Calculate reconnect rate
   */
  getReconnectRate(windowMs: number = 60000): number {
    const cutoff = Date.now() - windowMs
    const recentReconnects = this.reconnectEvents.filter((e) => e.timestamp > cutoff)
    
    return recentReconnects.length / (windowMs / 60000) // Per minute
  }

  /**
   * Get active users count
   */
  getActiveUsers(windowMs: number = 300000): number {
    const cutoff = Date.now() - windowMs
    const recentUsers = new Set(
      this.operationMetrics
        .filter((m) => m.timestamp > cutoff)
        .map((m) => m.userId)
    )
    
    return recentUsers.size
  }

  // ============================================================================
  // Snapshot Generation
  // ============================================================================

  /**
   * Generate analytics snapshot
   */
  generateSnapshot(): AnalyticsSnapshot {
    const latencyPercentiles = this.getLatencyPercentiles()

    return {
      timestamp: Date.now(),
      opsPerSecond: this.getOpsPerSecond(),
      conflictRate: this.getConflictRate(),
      dropRate: this.getDropRate(),
      avgLatencyMs: latencyPercentiles.avg,
      p50LatencyMs: latencyPercentiles.p50,
      p95LatencyMs: latencyPercentiles.p95,
      p99LatencyMs: latencyPercentiles.p99,
      activeUsers: this.getActiveUsers(),
      reconnectRate: this.getReconnectRate(),
      queueDepth: this.getQueueDepth(),
    }
  }

  /**
   * Start automatic snapshotting
   */
  startSnapshotting(intervalMs: number = 5000): void {
    this.stopSnapshotting()
    
    this.snapshotInterval = setInterval(() => {
      const snapshot = this.generateSnapshot()
      this.onSnapshot?.(snapshot)
    }, intervalMs)
  }

  /**
   * Stop automatic snapshotting
   */
  stopSnapshotting(): void {
    if (this.snapshotInterval) {
      clearInterval(this.snapshotInterval)
      this.snapshotInterval = null
    }
  }

  // ============================================================================
  // Dashboard Data
  // ============================================================================

  /**
   * Get time-series data for charting
   */
  getTimeSeriesData(
    metric: 'opsPerSecond' | 'latency' | 'conflicts' | 'drops',
    points: number = 60,
    intervalMs: number = 1000
  ): Array<{ timestamp: number; value: number }> {
    const data: Array<{ timestamp: number; value: number }> = []
    const now = Date.now()

    for (let i = points - 1; i >= 0; i--) {
      const endTime = now - i * intervalMs
      const startTime = endTime - intervalMs

      let value = 0

      switch (metric) {
        case 'opsPerSecond':
          const opsInInterval = this.operationMetrics.filter(
            (m) => m.timestamp >= startTime && m.timestamp < endTime
          )
          value = opsInInterval.length / (intervalMs / 1000)
          break

        case 'latency':
          const latenciesInInterval = this.latencySamples.filter(
            (s) => s.timestamp >= startTime && s.timestamp < endTime
          )
          value = latenciesInInterval.length > 0
            ? latenciesInInterval.reduce((sum, s) => sum + s.latencyMs, 0) / latenciesInInterval.length
            : 0
          break

        case 'conflicts':
          const conflictsInInterval = this.conflictEvents.filter(
            (e) => e.timestamp >= startTime && e.timestamp < endTime
          )
          value = conflictsInInterval.length
          break

        case 'drops':
          const dropsInInterval = this.operationMetrics.filter(
            (m) => m.dropped && m.timestamp >= startTime && m.timestamp < endTime
          )
          value = dropsInInterval.length
          break
      }

      data.push({ timestamp: endTime, value })
    }

    return data
  }

  /**
   * Get user activity breakdown
   */
  getUserActivity(windowMs: number = 60000): Array<{
    userId: string
    operations: number
    conflicts: number
    avgLatency: number
  }> {
    const cutoff = Date.now() - windowMs
    const userStats = new Map<string, {
      operations: number
      conflicts: number
      latencies: number[]
    }>()

    // Aggregate operation metrics
    this.operationMetrics
      .filter((m) => m.timestamp > cutoff)
      .forEach((m) => {
        const stats = userStats.get(m.userId) || {
          operations: 0,
          conflicts: 0,
          latencies: [],
        }
        stats.operations++
        stats.latencies.push(m.latencyMs)
        userStats.set(m.userId, stats)
      })

    // Aggregate conflicts
    this.conflictEvents
      .filter((e) => e.timestamp > cutoff)
      .forEach((e) => {
        const stats = userStats.get(e.userId)
        if (stats) {
          stats.conflicts++
        }
      })

    return Array.from(userStats.entries()).map(([userId, stats]) => ({
      userId,
      operations: stats.operations,
      conflicts: stats.conflicts,
      avgLatency: stats.latencies.length > 0
        ? stats.latencies.reduce((a, b) => a + b, 0) / stats.latencies.length
        : 0,
    }))
  }

  /**
   * Get conflict resolution stats
   */
  getConflictResolutionStats(): {
    total: number
    byResolution: Record<string, number>
    byWinner: { local: number; remote: number }
  } {
    const byResolution: Record<string, number> = {}
    let localWins = 0
    let remoteWins = 0

    this.conflictEvents.forEach((e) => {
      byResolution[e.resolution] = (byResolution[e.resolution] || 0) + 1
      if (e.resolvedInFavor === 'local') {
        localWins++
      } else {
        remoteWins++
      }
    })

    return {
      total: this.conflictEvents.length,
      byResolution,
      byWinner: { local: localWins, remote: remoteWins },
    }
  }

  /**
   * Get queue depth (placeholder - would integrate with actual queue)
   */
  private getQueueDepth(): number {
    // This would integrate with the actual operation queue
    return 0
  }

  // ============================================================================
  // Export/Import
  // ============================================================================

  /**
   * Export all analytics data
   */
  exportData(): string {
    return JSON.stringify({
      latencySamples: this.latencySamples,
      operationMetrics: this.operationMetrics,
      reconnectEvents: this.reconnectEvents,
      conflictEvents: this.conflictEvents,
      exportedAt: Date.now(),
    })
  }

  /**
   * Import analytics data
   */
  importData(json: string): void {
    const data = JSON.parse(json)
    
    if (data.latencySamples) {
      this.latencySamples = data.latencySamples
    }
    if (data.operationMetrics) {
      this.operationMetrics = data.operationMetrics
    }
    if (data.reconnectEvents) {
      this.reconnectEvents = data.reconnectEvents
    }
    if (data.conflictEvents) {
      this.conflictEvents = data.conflictEvents
    }
  }

  /**
   * Reset all data
   */
  reset(): void {
    this.latencySamples = []
    this.operationMetrics = []
    this.reconnectEvents = []
    this.conflictEvents = []
  }

  /**
   * Get summary statistics
   */
  getSummary(): {
    totalOperations: number
    totalConflicts: number
    totalReconnects: number
    avgOpsPerSecond: number
    currentLatencyP95: number
  } {
    const percentiles = this.getLatencyPercentiles()

    return {
      totalOperations: this.operationMetrics.length,
      totalConflicts: this.conflictEvents.length,
      totalReconnects: this.reconnectEvents.length,
      avgOpsPerSecond: this.getOpsPerSecond(60000),
      currentLatencyP95: percentiles.p95,
    }
  }
}

// =============================================================================
// Analytics Dashboard Helper
// =============================================================================

export class AnalyticsDashboard {
  private analytics: WhiteboardAnalytics
  private historicalSnapshots: AnalyticsSnapshot[] = []
  private maxHistory = 1440 // 24 hours at 1 sample per minute

  constructor(analytics: WhiteboardAnalytics) {
    this.analytics = analytics
    
    // Subscribe to snapshots
    analytics.startSnapshotting(5000)
  }

  /**
   * Record a snapshot
   */
  recordSnapshot(snapshot: AnalyticsSnapshot): void {
    this.historicalSnapshots.push(snapshot)
    
    if (this.historicalSnapshots.length > this.maxHistory) {
      this.historicalSnapshots.shift()
    }
  }

  /**
   * Get historical data for charts
   */
  getHistoricalData(
    metric: keyof AnalyticsSnapshot,
    durationMs: number = 3600000
  ): Array<{ timestamp: number; value: number }> {
    const cutoff = Date.now() - durationMs
    
    return this.historicalSnapshots
      .filter((s) => s.timestamp > cutoff)
      .map((s) => ({
        timestamp: s.timestamp,
        value: s[metric] as number,
      }))
  }

  /**
   * Get alerts based on thresholds
   */
  getAlerts(thresholds: {
    maxLatencyP95?: number
    maxDropRate?: number
    minOpsPerSecond?: number
  }): Array<{
    level: 'warning' | 'critical'
    message: string
    metric: string
    value: number
    threshold: number
  }> {
    const snapshot = this.analytics.generateSnapshot()
    const alerts: ReturnType<AnalyticsDashboard['getAlerts']> = []

    if (thresholds.maxLatencyP95 && snapshot.p95LatencyMs > thresholds.maxLatencyP95) {
      alerts.push({
        level: snapshot.p95LatencyMs > thresholds.maxLatencyP95 * 1.5 ? 'critical' : 'warning',
        message: `P95 latency (${snapshot.p95LatencyMs.toFixed(0)}ms) exceeds threshold (${thresholds.maxLatencyP95}ms)`,
        metric: 'p95LatencyMs',
        value: snapshot.p95LatencyMs,
        threshold: thresholds.maxLatencyP95,
      })
    }

    if (thresholds.maxDropRate && snapshot.dropRate > thresholds.maxDropRate) {
      alerts.push({
        level: snapshot.dropRate > thresholds.maxDropRate * 2 ? 'critical' : 'warning',
        message: `Drop rate (${(snapshot.dropRate * 100).toFixed(1)}%) exceeds threshold (${(thresholds.maxDropRate * 100).toFixed(1)}%)`,
        metric: 'dropRate',
        value: snapshot.dropRate,
        threshold: thresholds.maxDropRate,
      })
    }

    if (thresholds.minOpsPerSecond && snapshot.opsPerSecond < thresholds.minOpsPerSecond) {
      alerts.push({
        level: 'warning',
        message: `Ops/sec (${snapshot.opsPerSecond.toFixed(1)}) below threshold (${thresholds.minOpsPerSecond})`,
        metric: 'opsPerSecond',
        value: snapshot.opsPerSecond,
        threshold: thresholds.minOpsPerSecond,
      })
    }

    return alerts
  }
}
