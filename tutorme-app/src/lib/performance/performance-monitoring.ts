/**
 * Comprehensive Performance Monitoring System
 * 
 * Real-time performance metrics collection with:
 * - Frontend and backend performance tracking
 * - Chinese market specific monitoring
 * - WeChat/DingTalk/SMS alerting integration
 * - Web Vitals and custom metrics
 * - Error tracking and performance budgets
 * 
 * Usage:
 *   import { PerformanceMonitor, reportMetric, reportError } from '@/lib/performance/performance-monitoring'
 *   
 *   // Initialize monitor
 *   const monitor = new PerformanceMonitor()
 *   await monitor.initialize()
 *   
 *   // Report custom metric
 *   reportMetric('api_call_duration', 150, { endpoint: '/api/users' })
 *   
 *   // Report error
 *   reportError(new Error('API failed'), { context: 'user_dashboard' })
 */

import { db } from '@/lib/db'

// ============================================================================
// Types
// ============================================================================

export interface PerformanceMetric {
  name: string
  value: number
  unit: 'ms' | 'bytes' | 'count' | 'percentage'
  timestamp: number
  tags?: Record<string, string>
  userId?: string
  sessionId?: string
}

export interface PerformanceAlert {
  id: string
  type: 'error' | 'performance' | 'availability' | 'budget' | 'security'
  severity: 'critical' | 'warning' | 'info'
  message: string
  metric?: string
  threshold?: number
  currentValue?: number
  timestamp: number
  resolved?: boolean
  resolvedAt?: Date
}

export interface AlertChannel {
  wechat?: {
    enabled: boolean
    webhook?: string
    templateId?: string
  }
  dingtalk?: {
    enabled: boolean
    webhook?: string
  }
  sms?: {
    enabled: boolean
    provider?: 'aliyun' | 'tencent'
    accessKeyId?: string
    accessKeySecret?: string
    signName?: string
    templateCode?: string
  }
  email?: {
    enabled: boolean
    recipients?: string[]
  }
}

export interface PerformanceBudget {
  metric: string
  threshold: number
  window: '1m' | '5m' | '15m' | '1h' | '24h'
  alertOnBreach: boolean
}

export interface MonitoringConfig {
  // Collection settings
  enableFrontendMonitoring: boolean
  enableBackendMonitoring: boolean
  enableRealTimeMetrics: boolean
  sampleRate: number // 0-1, percentage of requests to monitor
  
  // Alerting
  alerts: AlertChannel
  alertThresholds: {
    errorRate: number // percentage
    responseTime: number // ms
    availability: number // percentage
  }
  
  // Performance budgets
  budgets: PerformanceBudget[]
  
  // Storage
  retentionDays: number
  batchSize: number
  
  // China-specific
  useChinaRegion: boolean
  chinaCDNMonitoring: boolean
}

// ============================================================================
// Metric Storage (In-Memory Buffer)
// ============================================================================

class MetricBuffer {
  private buffer: PerformanceMetric[] = []
  private maxSize: number
  private flushInterval: number
  private flushTimer: NodeJS.Timeout | null = null

  constructor(maxSize: number = 1000, flushInterval: number = 5000) {
    this.maxSize = maxSize
    this.flushInterval = flushInterval
  }

  add(metric: PerformanceMetric): void {
    this.buffer.push(metric)
    
    if (this.buffer.length >= this.maxSize) {
      this.flush()
    }
  }

  async flush(): Promise<void> {
    if (this.buffer.length === 0) return

    const metrics = [...this.buffer]
    this.buffer = []

    try {
      // Store metrics in database
      await db.$transaction(
        metrics.map((metric) =>
          db.performanceMetric.create({
            data: {
              name: metric.name,
              value: metric.value,
              unit: metric.unit,
              tags: metric.tags || {},
              userId: metric.userId,
              sessionId: metric.sessionId,
              timestamp: new Date(metric.timestamp),
            },
          })
        )
      )
    } catch (error) {
      console.error('Failed to flush metrics:', error)
      // Re-add to buffer on failure
      this.buffer.unshift(...metrics)
    }
  }

  start(): void {
    if (this.flushTimer) return
    
    this.flushTimer = setInterval(() => {
      this.flush()
    }, this.flushInterval)
  }

  stop(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }
    this.flush()
  }

  getBuffer(): PerformanceMetric[] {
    return [...this.buffer]
  }
}

// ============================================================================
// Alert Manager
// ============================================================================

class AlertManager {
  private config: AlertChannel
  private activeAlerts: Map<string, PerformanceAlert> = new Map()

  constructor(config: AlertChannel) {
    this.config = config
  }

  /**
   * Send alert through configured channels
   */
  async sendAlert(alert: PerformanceAlert): Promise<void> {
    // Store alert
    this.activeAlerts.set(alert.id, alert)

    // Send to database
    try {
      const performanceAlertModel = (db as unknown as {
        performanceAlert?: {
          create?: (args: {
            data: {
              id: string
              type: PerformanceAlert['type']
              severity: PerformanceAlert['severity']
              message: string
              metric?: string
              threshold?: number
              currentValue?: number
              timestamp: Date
            }
          }) => Promise<unknown>
          update?: (args: {
            where: { id: string }
            data: { resolved: boolean; resolvedAt: Date }
          }) => Promise<unknown>
        }
      } | null | undefined)?.performanceAlert

      if (typeof performanceAlertModel?.create === 'function') {
        await performanceAlertModel.create({
          data: {
            id: alert.id,
            type: alert.type,
            severity: alert.severity,
            message: alert.message,
            metric: alert.metric,
            threshold: alert.threshold,
            currentValue: alert.currentValue,
            timestamp: new Date(alert.timestamp),
          },
        })
      }
    } catch (error) {
      console.error('Failed to store alert:', error)
    }

    // Send through channels
    const promises: Promise<void>[] = []

    if (this.config.wechat?.enabled && this.config.wechat.webhook) {
      promises.push(this.sendWeChatAlert(alert))
    }

    if (this.config.dingtalk?.enabled && this.config.dingtalk.webhook) {
      promises.push(this.sendDingTalkAlert(alert))
    }

    if (this.config.sms?.enabled) {
      promises.push(this.sendSMSAlert(alert))
    }

    if (this.config.email?.enabled && this.config.email.recipients) {
      promises.push(this.sendEmailAlert(alert))
    }

    await Promise.allSettled(promises)
  }

  /**
   * Send WeChat alert
   */
  private async sendWeChatAlert(alert: PerformanceAlert): Promise<void> {
    const webhook = this.config.wechat?.webhook
    if (!webhook) return

    try {
      const message = {
        msgtype: 'markdown',
        markdown: {
          content: `# ${this.getSeverityEmoji(alert.severity)} 性能告警\n\n` +
                   `**类型**: ${this.getTypeLabel(alert.type)}\n` +
                   `**严重程度**: ${alert.severity}\n` +
                   `**消息**: ${alert.message}\n` +
                   (alert.metric ? `**指标**: ${alert.metric}\n` : '') +
                   (alert.currentValue !== undefined ? `**当前值**: ${alert.currentValue}\n` : '') +
                   (alert.threshold !== undefined ? `**阈值**: ${alert.threshold}\n` : '') +
                   `**时间**: ${new Date(alert.timestamp).toLocaleString('zh-CN')}\n`
        },
      }

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      })
    } catch (error) {
      console.error('Failed to send WeChat alert:', error)
    }
  }

  /**
   * Send DingTalk alert
   */
  private async sendDingTalkAlert(alert: PerformanceAlert): Promise<void> {
    const webhook = this.config.dingtalk?.webhook
    if (!webhook) return

    try {
      const message = {
        msgtype: 'markdown',
        markdown: {
          title: `性能告警: ${this.getTypeLabel(alert.type)}`,
          text: `# ${this.getSeverityEmoji(alert.severity)} 性能告警\n\n` +
                `**类型**: ${this.getTypeLabel(alert.type)}\n` +
                `**严重程度**: ${alert.severity}\n` +
                `**消息**: ${alert.message}\n` +
                (alert.metric ? `**指标**: ${alert.metric}\n` : '') +
                (alert.currentValue !== undefined ? `**当前值**: ${alert.currentValue}\n` : '') +
                (alert.threshold !== undefined ? `**阈值**: ${alert.threshold}\n` : '') +
                `**时间**: ${new Date(alert.timestamp).toLocaleString('zh-CN')}\n`
        },
      }

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      })
    } catch (error) {
      console.error('Failed to send DingTalk alert:', error)
    }
  }

  /**
   * Send SMS alert
   */
  private async sendSMSAlert(alert: PerformanceAlert): Promise<void> {
    const smsConfig = this.config.sms
    if (!smsConfig?.enabled) return

    // Only send critical alerts via SMS
    if (alert.severity !== 'critical') return

    try {
      const message = `[TutorMe性能告警] ${this.getTypeLabel(alert.type)}: ${alert.message}`

      if (smsConfig.provider === 'aliyun') {
        await this.sendAliyunSMS(message, smsConfig)
      } else if (smsConfig.provider === 'tencent') {
        await this.sendTencentSMS(message, smsConfig)
      }
    } catch (error) {
      console.error('Failed to send SMS alert:', error)
    }
  }

  /**
   * Send Aliyun SMS
   */
  private async sendAliyunSMS(
    message: string,
    config: NonNullable<AlertChannel['sms']>
  ): Promise<void> {
    // Implementation would use Aliyun SMS SDK
    // This is a placeholder - actual implementation requires SDK
    console.log('Aliyun SMS:', message, config)
  }

  /**
   * Send Tencent SMS
   */
  private async sendTencentSMS(
    message: string,
    config: NonNullable<AlertChannel['sms']>
  ): Promise<void> {
    // Implementation would use Tencent SMS SDK
    // This is a placeholder - actual implementation requires SDK
    console.log('Tencent SMS:', message, config)
  }

  /**
   * Send email alert
   */
  private async sendEmailAlert(alert: PerformanceAlert): Promise<void> {
    const recipients = this.config.email?.recipients
    if (!recipients || recipients.length === 0) return

    try {
      // Use existing notification service
      const { notifyMany } = await import('@/lib/notifications/notify')
      
      // Get admin user IDs (simplified - would need proper admin lookup)
      const admins = await db.user.findMany({
        where: { role: 'ADMIN' },
        select: { id: true },
      })

      await notifyMany({
        userIds: admins.map((a) => a.id),
        type: 'system',
        title: `性能告警: ${this.getTypeLabel(alert.type)}`,
        message: alert.message,
      })
    } catch (error) {
      console.error('Failed to send email alert:', error)
    }
  }

  private getSeverityEmoji(severity: string): string {
    switch (severity) {
      case 'critical':
        return '🔴'
      case 'warning':
        return '🟡'
      case 'info':
        return '🔵'
      default:
        return '⚪'
    }
  }

  private getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      error: '错误',
      performance: '性能',
      availability: '可用性',
      budget: '预算',
      security: '安全',
    }
    return labels[type] || type
  }

  /**
   * Resolve alert
   */
  async resolveAlert(alertId: string): Promise<void> {
    const alert = this.activeAlerts.get(alertId)
    if (!alert) return

    alert.resolved = true
    alert.resolvedAt = new Date()

    try {
      const performanceAlertModel = (db as unknown as {
        performanceAlert?: {
          update?: (args: {
            where: { id: string }
            data: { resolved: boolean; resolvedAt: Date }
          }) => Promise<unknown>
        }
      } | null | undefined)?.performanceAlert

      if (typeof performanceAlertModel?.update === 'function') {
        await performanceAlertModel.update({
          where: { id: alertId },
          data: {
            resolved: true,
            resolvedAt: new Date(),
          },
        })
      }
    } catch (error) {
      console.error('Failed to resolve alert:', error)
    }

    this.activeAlerts.delete(alertId)
  }
}

// ============================================================================
// Performance Monitor
// ============================================================================

class PerformanceMonitor {
  private config: MonitoringConfig
  private metricBuffer: MetricBuffer
  private alertManager: AlertManager
  private initialized: boolean = false

  constructor(config?: Partial<MonitoringConfig>) {
    this.config = {
      enableFrontendMonitoring: true,
      enableBackendMonitoring: true,
      enableRealTimeMetrics: true,
      sampleRate: 1.0,
      alerts: {
        wechat: {
          enabled: !!process.env.WECHAT_WEBHOOK_URL,
          webhook: process.env.WECHAT_WEBHOOK_URL,
        },
        dingtalk: {
          enabled: !!process.env.DINGTALK_WEBHOOK_URL,
          webhook: process.env.DINGTALK_WEBHOOK_URL,
        },
        sms: {
          enabled: !!process.env.SMS_PROVIDER,
          provider: process.env.SMS_PROVIDER as 'aliyun' | 'tencent',
          accessKeyId: process.env.SMS_ACCESS_KEY_ID,
          accessKeySecret: process.env.SMS_ACCESS_KEY_SECRET,
          signName: process.env.SMS_SIGN_NAME,
          templateCode: process.env.SMS_TEMPLATE_CODE,
        },
        email: {
          enabled: true,
        },
      },
      alertThresholds: {
        errorRate: 5, // 5%
        responseTime: 1000, // 1s
        availability: 99, // 99%
      },
      budgets: [],
      retentionDays: 30,
      batchSize: 100,
      useChinaRegion: true,
      chinaCDNMonitoring: true,
      ...config,
    }

    this.metricBuffer = new MetricBuffer(this.config.batchSize)
    this.alertManager = new AlertManager(this.config.alerts)
  }

  /**
   * Initialize monitor
   */
  async initialize(): Promise<void> {
    if (this.initialized) return

    // Start metric buffer
    this.metricBuffer.start()

    // Setup frontend monitoring if in browser
    if (typeof window !== 'undefined' && this.config.enableFrontendMonitoring) {
      this.setupFrontendMonitoring()
    }

    // Setup budget checking
    if (this.config.budgets.length > 0) {
      this.startBudgetChecker()
    }

    this.initialized = true
  }

  /**
   * Setup frontend monitoring
   */
  private setupFrontendMonitoring(): void {
    if (typeof window === 'undefined') return

    // Monitor Web Vitals
    if ('PerformanceObserver' in window) {
      this.observeWebVitals()
    }

    // Monitor API calls
    this.interceptFetch()

    // Monitor errors
    window.addEventListener('error', (event) => {
      this.reportError(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      })
    })

    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        { type: 'unhandledrejection' }
      )
    })
  }

  /**
   * Observe Web Vitals
   */
  private observeWebVitals(): void {
    if (typeof window === 'undefined') return

    try {
      // LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        const value = lastEntry.renderTime || lastEntry.loadTime
        this.reportMetric('lcp', value, 'ms')
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // FID
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          this.reportMetric('fid', entry.processingStart - entry.startTime, 'ms')
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // CLS
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        this.reportMetric('cls', clsValue, 'count')
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('Web Vitals observation failed:', error)
    }
  }

  /**
   * Intercept fetch for API monitoring
   */
  private interceptFetch(): void {
    if (typeof window === 'undefined') return

    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const startTime = performance.now()
      const url = typeof args[0] === 'string' ? args[0] : args[0].url

      try {
        const response = await originalFetch(...args)
        const duration = performance.now() - startTime

        this.reportMetric('api_call_duration', duration, 'ms', {
          endpoint: url,
          method: args[1]?.method || 'GET',
          status: response.status.toString(),
        })

        return response
      } catch (error) {
        const duration = performance.now() - startTime
        this.reportMetric('api_call_error', duration, 'ms', {
          endpoint: url,
          error: error instanceof Error ? error.message : String(error),
        })
        throw error
      }
    }
  }

  /**
   * Start budget checker
   */
  private startBudgetChecker(): void {
    setInterval(async () => {
      for (const budget of this.config.budgets) {
        await this.checkBudget(budget)
      }
    }, 60000) // Check every minute
  }

  /**
   * Check performance budget
   */
  private async checkBudget(budget: PerformanceBudget): Promise<void> {
    try {
      // Get average metric value for the window
      const windowMs = this.getWindowMs(budget.window)
      const cutoff = new Date(Date.now() - windowMs)

      const avg = await db.performanceMetric.aggregate({
        where: {
          name: budget.metric,
          timestamp: { gte: cutoff },
        },
        _avg: {
          value: true,
        },
      })

      const avgValue = avg._avg.value
      if (avgValue && avgValue > budget.threshold && budget.alertOnBreach) {
        await this.alertManager.sendAlert({
          id: `budget-${budget.metric}-${Date.now()}`,
          type: 'budget',
          severity: 'warning',
          message: `性能预算超限: ${budget.metric} 超过阈值 ${budget.threshold}`,
          metric: budget.metric,
          threshold: budget.threshold,
          currentValue: avgValue,
          timestamp: Date.now(),
        })
      }
    } catch (error) {
      console.error('Budget check failed:', error)
    }
  }

  private getWindowMs(window: string): number {
    const multipliers: Record<string, number> = {
      '1m': 60000,
      '5m': 300000,
      '15m': 900000,
      '1h': 3600000,
      '24h': 86400000,
    }
    return multipliers[window] || 60000
  }

  /**
   * Report metric
   */
  reportMetric(
    name: string,
    value: number,
    unit: 'ms' | 'bytes' | 'count' | 'percentage' = 'ms',
    tags?: Record<string, string>
  ): void {
    // Apply sample rate
    if (Math.random() > this.config.sampleRate) return

    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      tags,
    }

    this.metricBuffer.add(metric)

    // Check thresholds
    this.checkThresholds(name, value)
  }

  /**
   * Check alert thresholds
   */
  private checkThresholds(name: string, value: number): void {
    const thresholds = this.config.alertThresholds

    if (name === 'api_call_duration' && value > thresholds.responseTime) {
      this.alertManager.sendAlert({
        id: `threshold-${name}-${Date.now()}`,
        type: 'performance',
        severity: value > thresholds.responseTime * 2 ? 'critical' : 'warning',
        message: `API响应时间超限: ${name} = ${value}ms`,
        metric: name,
        threshold: thresholds.responseTime,
        currentValue: value,
        timestamp: Date.now(),
      })
    }
  }

  /**
   * Report error
   */
  reportError(error: Error, context?: Record<string, any>): void {
    const errorMetric: PerformanceMetric = {
      name: 'error',
      value: 1,
      unit: 'count',
      timestamp: Date.now(),
      tags: {
        message: error.message,
        stack: error.stack?.substring(0, 200) || '',
        ...context,
      },
    }

    this.metricBuffer.add(errorMetric)

    // Send critical error alert
    this.alertManager.sendAlert({
      id: `error-${Date.now()}-${Math.random()}`,
      type: 'error',
      severity: 'critical',
      message: `错误: ${error.message}`,
      timestamp: Date.now(),
    })
  }

  /**
   * Report security event (payment alerts, access attempts, role violations).
   * Enterprise security event tracking for compliance (GDPR, PIPL, PRC).
   */
  reportSecurityEvent(
    eventType: string,
    tags?: Record<string, string>
  ): void {
    this.reportMetric('security_event', 1, 'count', {
      eventType,
      ...tags,
    })
  }

  /**
   * Get metrics summary
   */
  async getMetricsSummary(
    metricName: string,
    window: '1h' | '24h' | '7d' = '24h'
  ): Promise<{
    avg: number
    min: number
    max: number
    p95: number
    p99: number
    count: number
  }> {
    const windowMs = {
      '1h': 3600000,
      '24h': 86400000,
      '7d': 604800000,
    }[window]

    const cutoff = new Date(Date.now() - windowMs)

    const metrics = await db.performanceMetric.findMany({
      where: {
        name: metricName,
        timestamp: { gte: cutoff },
      },
      orderBy: { value: 'asc' },
    })

    if (metrics.length === 0) {
      return { avg: 0, min: 0, max: 0, p95: 0, p99: 0, count: 0 }
    }

    const values = metrics.map((m) => m.value).sort((a, b) => a - b)
    const sum = values.reduce((a, b) => a + b, 0)

    return {
      avg: sum / values.length,
      min: values[0],
      max: values[values.length - 1],
      p95: values[Math.floor(values.length * 0.95)],
      p99: values[Math.floor(values.length * 0.99)],
      count: values.length,
    }
  }

  /**
   * Cleanup
   */
  async cleanup(): Promise<void> {
    this.metricBuffer.stop()
    this.initialized = false
  }
}

// ============================================================================
// Global Instance
// ============================================================================

let globalMonitor: PerformanceMonitor | null = null

/**
 * Get or create global monitor instance
 */
export function getPerformanceMonitor(): PerformanceMonitor {
  if (!globalMonitor) {
    globalMonitor = new PerformanceMonitor()
  }
  return globalMonitor
}

/**
 * Initialize global monitor
 */
export async function initializeMonitoring(
  config?: Partial<MonitoringConfig>
): Promise<void> {
  const monitor = config ? new PerformanceMonitor(config) : getPerformanceMonitor()
  await monitor.initialize()
  globalMonitor = monitor
}

/**
 * Report metric (convenience function)
 */
export function reportMetric(
  name: string,
  value: number,
  unit: 'ms' | 'bytes' | 'count' | 'percentage' = 'ms',
  tags?: Record<string, string>
): void {
  const monitor = getPerformanceMonitor()
  monitor.reportMetric(name, value, unit, tags)
}

/**
 * Report error (convenience function)
 */
export function reportError(error: Error, context?: Record<string, any>): void {
  const monitor = getPerformanceMonitor()
  monitor.reportError(error, context)
}

// ============================================================================
// Database Schema Types (should match Prisma schema)
// ============================================================================

// Note: These types should match your Prisma schema
// You may need to add these models to your schema.prisma:
/*
model PerformanceMetric {
  id        String   @id @default(cuid())
  name      String
  value     Float
  unit      String
  tags      Json?
  userId    String?
  sessionId String?
  timestamp DateTime @default(now())

  @@index([name])
  @@index([timestamp])
  @@index([userId])
}

model PerformanceAlert {
  id           String    @id @default(cuid())
  type         String
  severity     String
  message      String
  metric       String?
  threshold    Float?
  currentValue Float?
  timestamp    DateTime  @default(now())
  resolved     Boolean   @default(false)
  resolvedAt   DateTime?

  @@index([type])
  @@index([severity])
  @@index([resolved])
  @@index([timestamp])
}
*/

/**
 * Parent dashboard performance monitor (alias for global monitor with parent context).
 * Tracks parent-specific metrics: responseTime, cacheHitRate, throughput.
 */
export const ParentDashboardPerformanceMonitor = PerformanceMonitor
export const parentDashboardPerformanceMonitor = getPerformanceMonitor

// ============================================================================
// Default Export
// ============================================================================

export default PerformanceMonitor
