;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="66789ff0-c34d-38f1-25ba-a92aabe3a1a7")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cache",
    ()=>cache,
    "db",
    ()=>db,
    "prisma",
    ()=>prisma,
    "queryOptimizer",
    ()=>queryOptimizer,
    "readReplica",
    ()=>readReplica
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-require-imports */ /**
 * Database Client with Connection Pooling
 * 
 * Features:
 * - Connection pooling for high concurrency (100+ users)
 * - Query caching with Redis
 * - Read replica support for scaling
 * - N+1 query prevention with dataloaders
 * 
 * Note: Redis is lazily initialized to avoid bundling issues
 */ // Connection pool configuration
const POOL_CONFIG = {
    // Connection pool settings for 100+ concurrent users
    min: 5,
    max: 50,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    allowExitOnIdle: false
};
// Query cache configuration
const CACHE_CONFIG = {
    ttl: 60,
    staleWhileRevalidate: 30,
    prefix: 'tutorme:query:'
};
let db;
let redis = null;
let queryCache = null;
let redisInitialized = false;
// Safe check for server-side environment (not Edge Runtime)
// Edge Runtime (used by Next.js middleware) doesn't support Prisma Client
const isEdgeRuntime = typeof globalThis.EdgeRuntime !== 'undefined' || typeof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && ("TURBOPACK compile-time value", "") === 'edge';
const isServer = ("TURBOPACK compile-time value", "object") === 'undefined' && !isEdgeRuntime;
// Initialize in-memory cache only on server
function getQueryCache() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
// Initialize Redis client if available (server-side only)
async function initRedis() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
// Initialize Prisma Client with connection pooling (server-side only)
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    // Client-side mock
    db = {
        $connect: async ()=>{},
        $disconnect: async ()=>{}
    };
}
const cache = {
    /**
   * Ensure Redis is initialized
   */ async ensureRedis () {
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    },
    /**
   * Get cached value
   */ async get (key) {
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
        const fullKey = undefined;
        // Try Redis first
        const client = undefined;
        // Fallback to in-memory cache
        const cache = undefined;
        const cached = undefined;
    },
    /**
   * Set cached value
   */ async set (key, value, ttlSeconds = CACHE_CONFIG.ttl) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const fullKey = undefined;
        // Try Redis first
        const client = undefined;
        // Fallback to in-memory cache
        const cache = undefined;
    },
    /**
   * Delete cached value
   */ async delete (key) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const fullKey = undefined;
        const client = undefined;
        const cache = undefined;
    },
    /**
   * Clear all cached values
   */ async clear () {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const client = undefined;
        const cache = undefined;
    },
    /**
   * Get or set cached value
   */ async getOrSet (key, factory, ttlSeconds = CACHE_CONFIG.ttl) {
        const cached = await this.get(key);
        if (cached !== null) return cached;
        const value = await factory();
        await this.set(key, value, ttlSeconds);
        return value;
    },
    /**
   * Invalidate cache for a pattern
   */ async invalidatePattern (pattern) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const client = undefined;
        // Clear in-memory cache matching pattern
        const cache = undefined;
    }
};
const queryOptimizer = {
    /**
   * Batch load function for N+1 prevention
   */ async batchLoad (ids, fetchFn, getId) {
        if ("TURBOPACK compile-time truthy", 1) return ids.map(()=>null);
        //TURBOPACK unreachable
        ;
        // Deduplicate IDs
        const uniqueIds = undefined;
        // Fetch all items in one query
        const items = undefined;
        // Create lookup map
        const itemMap = undefined;
    },
    /**
   * Wrap a query with caching
   */ async cachedQuery (cacheKey, queryFn, ttlSeconds = CACHE_CONFIG.ttl) {
        return cache.getOrSet(cacheKey, queryFn, ttlSeconds);
    }
};
const readReplica = {
    /**
   * Check if read replicas are configured
   */ isConfigured () {
        return isServer && !!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.DATABASE_READ_REPLICA_URL;
    },
    /**
   * Get read-only database client
   * Falls back to primary if replicas not configured
   */ getClient () {
        // For now, return the same client
        // In production, this would return a connection to the read replica
        return db;
    }
};
;
const prisma = db;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParentDashboardPerformanceMonitor",
    ()=>ParentDashboardPerformanceMonitor,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getPerformanceMonitor",
    ()=>getPerformanceMonitor,
    "initializeMonitoring",
    ()=>initializeMonitoring,
    "parentDashboardPerformanceMonitor",
    ()=>parentDashboardPerformanceMonitor,
    "reportError",
    ()=>reportError,
    "reportMetric",
    ()=>reportMetric
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [client] (ecmascript) <locals>");
;
// ============================================================================
// Metric Storage (In-Memory Buffer)
// ============================================================================
class MetricBuffer {
    buffer = [];
    maxSize;
    flushInterval;
    flushTimer = null;
    constructor(maxSize = 1000, flushInterval = 5000){
        this.maxSize = maxSize;
        this.flushInterval = flushInterval;
    }
    add(metric) {
        this.buffer.push(metric);
        if (this.buffer.length >= this.maxSize) {
            this.flush();
        }
    }
    async flush() {
        if (this.buffer.length === 0) return;
        const metrics = [
            ...this.buffer
        ];
        this.buffer = [];
        try {
            // Store metrics in database
            await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].$transaction(metrics.map((metric)=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.create({
                    data: {
                        name: metric.name,
                        metricValue: metric.value,
                        unit: metric.unit,
                        tags: metric.tags || {},
                        userId: metric.userId,
                        sessionId: metric.sessionId,
                        timestamp: new Date(metric.timestamp)
                    }
                })));
        } catch (error) {
            console.error('Failed to flush metrics:', error);
            // Re-add to buffer on failure
            this.buffer.unshift(...metrics);
        }
    }
    start() {
        if (this.flushTimer) return;
        this.flushTimer = setInterval(()=>{
            this.flush();
        }, this.flushInterval);
    }
    stop() {
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
            this.flushTimer = null;
        }
        this.flush();
    }
    getBuffer() {
        return [
            ...this.buffer
        ];
    }
}
// ============================================================================
// Alert Manager
// ============================================================================
class AlertManager {
    config;
    activeAlerts = new Map();
    constructor(config){
        this.config = config;
    }
    /**
   * Send alert through configured channels
   */ async sendAlert(alert) {
        // Store alert
        this.activeAlerts.set(alert.id, alert);
        // Send to database
        try {
            const performanceAlertModel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"]?.performanceAlert;
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
                        timestamp: new Date(alert.timestamp)
                    }
                });
            }
        } catch (error) {
            console.error('Failed to store alert:', error);
        }
        // Send through channels
        const promises = [];
        if (this.config.wechat?.enabled && this.config.wechat.webhook) {
            promises.push(this.sendWeChatAlert(alert));
        }
        if (this.config.dingtalk?.enabled && this.config.dingtalk.webhook) {
            promises.push(this.sendDingTalkAlert(alert));
        }
        if (this.config.sms?.enabled) {
            promises.push(this.sendSMSAlert(alert));
        }
        if (this.config.email?.enabled && this.config.email.recipients) {
            promises.push(this.sendEmailAlert(alert));
        }
        await Promise.allSettled(promises);
    }
    /**
   * Send WeChat alert
   */ async sendWeChatAlert(alert) {
        const webhook = this.config.wechat?.webhook;
        if (!webhook) return;
        try {
            const message = {
                msgtype: 'markdown',
                markdown: {
                    content: `# ${this.getSeverityEmoji(alert.severity)} 性能告警\n\n` + `**类型**: ${this.getTypeLabel(alert.type)}\n` + `**严重程度**: ${alert.severity}\n` + `**消息**: ${alert.message}\n` + (alert.metric ? `**指标**: ${alert.metric}\n` : '') + (alert.currentValue !== undefined ? `**当前值**: ${alert.currentValue}\n` : '') + (alert.threshold !== undefined ? `**阈值**: ${alert.threshold}\n` : '') + `**时间**: ${new Date(alert.timestamp).toLocaleString('zh-CN')}\n`
                }
            };
            await fetch(webhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
        } catch (error) {
            console.error('Failed to send WeChat alert:', error);
        }
    }
    /**
   * Send DingTalk alert
   */ async sendDingTalkAlert(alert) {
        const webhook = this.config.dingtalk?.webhook;
        if (!webhook) return;
        try {
            const message = {
                msgtype: 'markdown',
                markdown: {
                    title: `性能告警: ${this.getTypeLabel(alert.type)}`,
                    text: `# ${this.getSeverityEmoji(alert.severity)} 性能告警\n\n` + `**类型**: ${this.getTypeLabel(alert.type)}\n` + `**严重程度**: ${alert.severity}\n` + `**消息**: ${alert.message}\n` + (alert.metric ? `**指标**: ${alert.metric}\n` : '') + (alert.currentValue !== undefined ? `**当前值**: ${alert.currentValue}\n` : '') + (alert.threshold !== undefined ? `**阈值**: ${alert.threshold}\n` : '') + `**时间**: ${new Date(alert.timestamp).toLocaleString('zh-CN')}\n`
                }
            };
            await fetch(webhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
        } catch (error) {
            console.error('Failed to send DingTalk alert:', error);
        }
    }
    /**
   * Send SMS alert
   */ async sendSMSAlert(alert) {
        const smsConfig = this.config.sms;
        if (!smsConfig?.enabled) return;
        // Only send critical alerts via SMS
        if (alert.severity !== 'critical') return;
        try {
            const message = `[TutorMe性能告警] ${this.getTypeLabel(alert.type)}: ${alert.message}`;
            if (smsConfig.provider === 'aliyun') {
                await this.sendAliyunSMS(message, smsConfig);
            } else if (smsConfig.provider === 'tencent') {
                await this.sendTencentSMS(message, smsConfig);
            }
        } catch (error) {
            console.error('Failed to send SMS alert:', error);
        }
    }
    /**
   * Send Aliyun SMS
   */ async sendAliyunSMS(message, config) {
        // Implementation would use Aliyun SMS SDK
        // This is a placeholder - actual implementation requires SDK
        console.log('Aliyun SMS:', message, config);
    }
    /**
   * Send Tencent SMS
   */ async sendTencentSMS(message, config) {
        // Implementation would use Tencent SMS SDK
        // This is a placeholder - actual implementation requires SDK
        console.log('Tencent SMS:', message, config);
    }
    /**
   * Send email alert
   */ async sendEmailAlert(alert) {
        const recipients = this.config.email?.recipients;
        if (!recipients || recipients.length === 0) return;
        try {
            // Use existing notification service
            const { notifyMany } = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/notifications/notify.ts [client] (ecmascript, async loader)");
            // Get admin user IDs (simplified - would need proper admin lookup)
            const admins = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].user.findMany({
                where: {
                    role: 'ADMIN'
                },
                select: {
                    id: true
                }
            });
            await notifyMany({
                userIds: admins.map((a)=>a.id),
                type: 'system',
                title: `性能告警: ${this.getTypeLabel(alert.type)}`,
                message: alert.message
            });
        } catch (error) {
            console.error('Failed to send email alert:', error);
        }
    }
    getSeverityEmoji(severity) {
        switch(severity){
            case 'critical':
                return '🔴';
            case 'warning':
                return '🟡';
            case 'info':
                return '🔵';
            default:
                return '⚪';
        }
    }
    getTypeLabel(type) {
        const labels = {
            error: '错误',
            performance: '性能',
            availability: '可用性',
            budget: '预算',
            security: '安全'
        };
        return labels[type] || type;
    }
    /**
   * Resolve alert
   */ async resolveAlert(alertId) {
        const alert = this.activeAlerts.get(alertId);
        if (!alert) return;
        alert.resolved = true;
        alert.resolvedAt = new Date();
        try {
            const performanceAlertModel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"]?.performanceAlert;
            if (typeof performanceAlertModel?.update === 'function') {
                await performanceAlertModel.update({
                    where: {
                        id: alertId
                    },
                    data: {
                        resolved: true,
                        resolvedAt: new Date()
                    }
                });
            }
        } catch (error) {
            console.error('Failed to resolve alert:', error);
        }
        this.activeAlerts.delete(alertId);
    }
}
// ============================================================================
// Performance Monitor
// ============================================================================
class PerformanceMonitor {
    config;
    metricBuffer;
    alertManager;
    initialized = false;
    constructor(config){
        this.config = {
            enableFrontendMonitoring: true,
            enableBackendMonitoring: true,
            enableRealTimeMetrics: true,
            sampleRate: 1.0,
            alerts: {
                wechat: {
                    enabled: !!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.WECHAT_WEBHOOK_URL,
                    webhook: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.WECHAT_WEBHOOK_URL
                },
                dingtalk: {
                    enabled: !!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.DINGTALK_WEBHOOK_URL,
                    webhook: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.DINGTALK_WEBHOOK_URL
                },
                sms: {
                    enabled: !!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SMS_PROVIDER,
                    provider: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SMS_PROVIDER,
                    accessKeyId: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SMS_ACCESS_KEY_ID,
                    accessKeySecret: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SMS_ACCESS_KEY_SECRET,
                    signName: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SMS_SIGN_NAME,
                    templateCode: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SMS_TEMPLATE_CODE
                },
                email: {
                    enabled: true
                }
            },
            alertThresholds: {
                errorRate: 5,
                responseTime: 1000,
                availability: 99
            },
            budgets: [],
            retentionDays: 30,
            batchSize: 100,
            useChinaRegion: true,
            chinaCDNMonitoring: true,
            ...config
        };
        this.metricBuffer = new MetricBuffer(this.config.batchSize);
        this.alertManager = new AlertManager(this.config.alerts);
    }
    /**
   * Initialize monitor
   */ async initialize() {
        if (this.initialized) return;
        // Start metric buffer
        this.metricBuffer.start();
        // Setup frontend monitoring if in browser
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && this.config.enableFrontendMonitoring) {
            this.setupFrontendMonitoring();
        }
        // Setup budget checking
        if (this.config.budgets.length > 0) {
            this.startBudgetChecker();
        }
        this.initialized = true;
    }
    /**
   * Setup frontend monitoring
   */ setupFrontendMonitoring() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Monitor Web Vitals
        if ('PerformanceObserver' in window) {
            this.observeWebVitals();
        }
        // Monitor API calls
        this.interceptFetch();
        // Monitor errors
        window.addEventListener('error', (event)=>{
            this.reportError(event.error || new Error(event.message), {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });
        window.addEventListener('unhandledrejection', (event)=>{
            this.reportError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)), {
                type: 'unhandledrejection'
            });
        });
    }
    /**
   * Observe Web Vitals
   */ observeWebVitals() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            // LCP
            const lcpObserver = new PerformanceObserver((list)=>{
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                const value = lastEntry.renderTime || lastEntry.loadTime;
                this.reportMetric('lcp', value, 'ms');
            });
            lcpObserver.observe({
                entryTypes: [
                    'largest-contentful-paint'
                ]
            });
            // FID
            const fidObserver = new PerformanceObserver((list)=>{
                for (const entry of list.getEntries()){
                    this.reportMetric('fid', entry.processingStart - entry.startTime, 'ms');
                }
            });
            fidObserver.observe({
                entryTypes: [
                    'first-input'
                ]
            });
            // CLS
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list)=>{
                for (const entry of list.getEntries()){
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.reportMetric('cls', clsValue, 'count');
            });
            clsObserver.observe({
                entryTypes: [
                    'layout-shift'
                ]
            });
        } catch (error) {
            console.warn('Web Vitals observation failed:', error);
        }
    }
    /**
   * Intercept fetch for API monitoring
   */ interceptFetch() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const originalFetch = window.fetch;
        window.fetch = async (...args)=>{
            const startTime = performance.now();
            const url = typeof args[0] === 'string' ? args[0] : args[0].url;
            try {
                const response = await originalFetch(...args);
                const duration = performance.now() - startTime;
                this.reportMetric('api_call_duration', duration, 'ms', {
                    endpoint: url,
                    method: args[1]?.method || 'GET',
                    status: response.status.toString()
                });
                return response;
            } catch (error) {
                const duration = performance.now() - startTime;
                this.reportMetric('api_call_error', duration, 'ms', {
                    endpoint: url,
                    error: error instanceof Error ? error.message : String(error)
                });
                throw error;
            }
        };
    }
    /**
   * Start budget checker
   */ startBudgetChecker() {
        setInterval(async ()=>{
            for (const budget of this.config.budgets){
                await this.checkBudget(budget);
            }
        }, 60000); // Check every minute
    }
    /**
   * Check performance budget
   */ async checkBudget(budget) {
        try {
            // Get average metric value for the window
            const windowMs = this.getWindowMs(budget.window);
            const cutoff = new Date(Date.now() - windowMs);
            const avg = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.aggregate({
                where: {
                    name: budget.metric,
                    timestamp: {
                        gte: cutoff
                    }
                },
                _avg: {
                    metricValue: true
                }
            });
            const avgValue = avg._avg.metricValue;
            if (avgValue && avgValue > budget.threshold && budget.alertOnBreach) {
                await this.alertManager.sendAlert({
                    id: `budget-${budget.metric}-${Date.now()}`,
                    type: 'budget',
                    severity: 'warning',
                    message: `性能预算超限: ${budget.metric} 超过阈值 ${budget.threshold}`,
                    metric: budget.metric,
                    threshold: budget.threshold,
                    currentValue: avgValue,
                    timestamp: Date.now()
                });
            }
        } catch (error) {
            console.error('Budget check failed:', error);
        }
    }
    getWindowMs(window1) {
        const multipliers = {
            '1m': 60000,
            '5m': 300000,
            '15m': 900000,
            '1h': 3600000,
            '24h': 86400000
        };
        return multipliers[window1] || 60000;
    }
    /**
   * Report metric
   */ reportMetric(name, value, unit = 'ms', tags) {
        // Apply sample rate
        if (Math.random() > this.config.sampleRate) return;
        const metric = {
            name,
            value,
            unit,
            timestamp: Date.now(),
            tags
        };
        this.metricBuffer.add(metric);
        // Check thresholds
        this.checkThresholds(name, value);
    }
    /**
   * Check alert thresholds
   */ checkThresholds(name, value) {
        const thresholds = this.config.alertThresholds;
        if (name === 'api_call_duration' && value > thresholds.responseTime) {
            this.alertManager.sendAlert({
                id: `threshold-${name}-${Date.now()}`,
                type: 'performance',
                severity: value > thresholds.responseTime * 2 ? 'critical' : 'warning',
                message: `API响应时间超限: ${name} = ${value}ms`,
                metric: name,
                threshold: thresholds.responseTime,
                currentValue: value,
                timestamp: Date.now()
            });
        }
    }
    /**
   * Report error
   */ reportError(error, context) {
        const errorMetric = {
            name: 'error',
            value: 1,
            unit: 'count',
            timestamp: Date.now(),
            tags: {
                message: error.message,
                stack: error.stack?.substring(0, 200) || '',
                ...context
            }
        };
        this.metricBuffer.add(errorMetric);
        // Send critical error alert
        this.alertManager.sendAlert({
            id: `error-${Date.now()}-${Math.random()}`,
            type: 'error',
            severity: 'critical',
            message: `错误: ${error.message}`,
            timestamp: Date.now()
        });
    }
    /**
   * Report security event (payment alerts, access attempts, role violations).
   * Enterprise security event tracking for compliance (GDPR, PIPL, PRC).
   */ reportSecurityEvent(eventType, tags) {
        this.reportMetric('security_event', 1, 'count', {
            eventType,
            ...tags
        });
    }
    /**
   * Get metrics summary
   */ async getMetricsSummary(metricName, window1 = '24h') {
        const windowMs = {
            '1h': 3600000,
            '24h': 86400000,
            '7d': 604800000
        }[window1];
        const cutoff = new Date(Date.now() - windowMs);
        const metrics = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.findMany({
            where: {
                name: metricName,
                timestamp: {
                    gte: cutoff
                }
            },
            orderBy: {
                metricValue: 'asc'
            }
        });
        if (metrics.length === 0) {
            return {
                avg: 0,
                min: 0,
                max: 0,
                p95: 0,
                p99: 0,
                count: 0
            };
        }
        const values = metrics.map((m)=>m.metricValue).sort((a, b)=>a - b);
        const sum = values.reduce((a, b)=>a + b, 0);
        return {
            avg: sum / values.length,
            min: values[0],
            max: values[values.length - 1],
            p95: values[Math.floor(values.length * 0.95)],
            p99: values[Math.floor(values.length * 0.99)],
            count: values.length
        };
    }
    /**
   * Cleanup
   */ async cleanup() {
        this.metricBuffer.stop();
        this.initialized = false;
    }
}
// ============================================================================
// Global Instance
// ============================================================================
let globalMonitor = null;
function getPerformanceMonitor() {
    if (!globalMonitor) {
        globalMonitor = new PerformanceMonitor();
    }
    return globalMonitor;
}
async function initializeMonitoring(config) {
    const monitor = config ? new PerformanceMonitor(config) : getPerformanceMonitor();
    await monitor.initialize();
    globalMonitor = monitor;
}
function reportMetric(name, value, unit = 'ms', tags) {
    const monitor = getPerformanceMonitor();
    monitor.reportMetric(name, value, unit, tags);
}
function reportError(error, context) {
    const monitor = getPerformanceMonitor();
    monitor.reportError(error, context);
}
const ParentDashboardPerformanceMonitor = PerformanceMonitor;
const parentDashboardPerformanceMonitor = getPerformanceMonitor;
const __TURBOPACK__default__export__ = PerformanceMonitor;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSentryInitOptions",
    ()=>getSentryInitOptions,
    "globalErrorHandler",
    ()=>globalErrorHandler,
    "globalPerformanceMonitor",
    ()=>globalPerformanceMonitor,
    "setupClientMonitoring",
    ()=>setupClientMonitoring
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * Enterprise-grade Sentry monitoring for global platform
 * - Global error tracking, Core Web Vitals, PII filtering, GDPR/PIPL compliant
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/index.client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring.ts [client] (ecmascript)");
;
;
function getSentryInitOptions(overrides) {
    const base = {
        dsn: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SENTRY_DSN ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SENTRY_DSN,
        environment: ("TURBOPACK compile-time value", "development") ?? 'development',
        tracesSampleRate: 0.1,
        profilesSampleRate: 0.1,
        normalizeDepth: 10,
        autoSessionTracking: true,
        maxBreadcrumbs: 50,
        maxValueLength: 10000,
        beforeSend (event) {
            if (event.extra) {
                const extra = event.extra;
                if ('password' in extra) delete extra.password;
                if ('creditCard' in extra) delete extra.creditCard;
                if ('token' in extra) delete extra.token;
                if ('apiKey' in extra) delete extra.apiKey;
            }
            const t = event.exception?.values?.[0]?.type;
            if (t === 'ChunkLoadError' || t === 'Loading chunk failed') return null;
            if (event.message?.includes?.('loading') || event.message?.includes?.('chunk')) return null;
            return event;
        },
        beforeBreadcrumb (breadcrumb) {
            if (breadcrumb.category === 'console' && breadcrumb.data?.arguments) {
                const args = breadcrumb.data.arguments;
                if (args.some((a)=>typeof a === 'string' && a.toLowerCase().includes('password'))) return null;
            }
            return breadcrumb;
        }
    };
    return {
        ...base,
        ...overrides
    };
}
const globalErrorHandler = {
    handleError (error, context) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.captureException(error, {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["reportError"])(error, context);
        } catch  {
        /* ignore */ }
    },
    handleWarning (warning, context) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.captureMessage(warning, 'warning', {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
    },
    addBreadcrumb (breadcrumb) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: breadcrumb.category ?? 'default',
            message: breadcrumb.message,
            data: breadcrumb.data,
            timestamp: Date.now() / 1000
        });
    }
};
function captureMetric(name, value, unit) {
    try {
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.metrics;
        if (unit === 'count' && typeof m?.count === 'function') m.count(name, value);
        else if (typeof m?.distribution === 'function') m.distribution(name, value, {
            unit: 'millisecond'
        });
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    } catch  {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    }
}
const globalPerformanceMonitor = {
    trackApiEndpoint (endpoint, responseTime, errorCount) {
        captureMetric('api_response_time', responseTime, 'ms');
        if (errorCount > 0) captureMetric('api_error_count', errorCount, 'count');
    },
    trackInteraction (type, element, value) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: 'interaction',
            message: `${type} on ${element}`,
            data: value,
            timestamp: Date.now() / 1000
        });
    },
    trackCacheHit (cacheKey, hit) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["reportMetric"])('cache_hit_rate', hit ? 1 : 0, 'count', {
            cacheKey,
            type: hit ? 'HIT' : 'MISS'
        });
    },
    trackWebVital (name, value) {
        captureMetric(`web_vital_${name.toLowerCase()}`, value, name === 'CLS' ? 'none' : 'ms');
    },
    trackLongTask (_startTime, duration) {
        captureMetric('long_task_duration', duration, 'ms');
    }
};
function setupClientMonitoring() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.addEventListener('error', (event)=>{
        if (event.error?.message?.includes?.('loading') || event.error?.message?.includes?.('chunk') || event.message?.includes?.('loading') || event.message?.includes?.('chunk')) return;
        globalErrorHandler.handleError(event.error ?? new Error(event.message), {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
        });
    });
    window.addEventListener('unhandledrejection', (event)=>{
        const err = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
        if (err.message?.includes?.('loading') || err.message?.includes?.('chunk')) return;
        globalErrorHandler.handleError(err, {
            type: 'unhandledrejection',
            timestamp: Date.now()
        });
    });
    if ('PerformanceObserver' in window) {
        try {
            const o = new PerformanceObserver((list)=>{
                for (const entry of list.getEntries()){
                    const e = entry;
                    const value = e.value ?? e.renderTime ?? e.loadTime ?? e.duration ?? 0;
                    if (value > 0) {
                        const name = (e.name || e.entryType || '').toUpperCase();
                        const vital = name.includes('LCP') || name.includes('LARGEST') ? 'LCP' : name.includes('FID') || name.includes('FIRST-INPUT') ? 'FID' : name.includes('CLS') || name.includes('LAYOUT') ? 'CLS' : name.includes('TTFB') ? 'TTFB' : name.includes('FCP') ? 'FCP' : name;
                        globalPerformanceMonitor.trackWebVital(vital, value);
                    }
                }
            });
            o.observe({
                entryTypes: [
                    'largest-contentful-paint',
                    'first-input',
                    'layout-shift',
                    'navigation'
                ]
            });
        } catch  {
        /* ignore */ }
        try {
            const o2 = new PerformanceObserver((list)=>{
                for (const entry of list.getEntries()){
                    const e = entry;
                    globalPerformanceMonitor.trackLongTask(e.startTime, e.duration);
                }
            });
            o2.observe({
                entryTypes: [
                    'longtask'
                ]
            });
        } catch  {
        /* ignore */ }
    }
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/instrumentation-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "onRouterTransitionStart",
    ()=>onRouterTransitionStart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/client/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/client/routing/appRouterRoutingInstrumentation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [client] (ecmascript) <locals>");
globalThis["_sentryRouteManifest"] = "{\"dynamicRoutes\":[{\"path\":\"/:locale\",\"regex\":\"^/([^/]+)$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum\",\"regex\":\"^/([^/]+)/curriculum$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum/:curriculumId\",\"regex\":\"^/([^/]+)/curriculum/([^/]+)$\",\"paramNames\":[\"locale\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum/lessons/:lessonId\",\"regex\":\"^/([^/]+)/curriculum/lessons/([^/]+)$\",\"paramNames\":[\"locale\",\"lessonId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin\",\"regex\":\"^/([^/]+)/admin$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/analytics\",\"regex\":\"^/([^/]+)/admin/analytics$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/audit-log\",\"regex\":\"^/([^/]+)/admin/audit-log$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/content\",\"regex\":\"^/([^/]+)/admin/content$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/feature-flags\",\"regex\":\"^/([^/]+)/admin/feature-flags$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/llm\",\"regex\":\"^/([^/]+)/admin/llm$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/login\",\"regex\":\"^/([^/]+)/admin/login$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/payments\",\"regex\":\"^/([^/]+)/admin/payments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/security\",\"regex\":\"^/([^/]+)/admin/security$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/settings\",\"regex\":\"^/([^/]+)/admin/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/topology\",\"regex\":\"^/([^/]+)/admin/topology$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/users\",\"regex\":\"^/([^/]+)/admin/users$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/api-docs\",\"regex\":\"^/([^/]+)/api-docs$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/code-of-conduct\",\"regex\":\"^/([^/]+)/legal/code-of-conduct$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/privacy\",\"regex\":\"^/([^/]+)/legal/privacy$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/terms\",\"regex\":\"^/([^/]+)/legal/terms$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/login\",\"regex\":\"^/([^/]+)/login$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/onboarding/student\",\"regex\":\"^/([^/]+)/onboarding/student$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/onboarding/tutor\",\"regex\":\"^/([^/]+)/onboarding/tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/assignments\",\"regex\":\"^/([^/]+)/parent/assignments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/children\",\"regex\":\"^/([^/]+)/parent/children$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/classes\",\"regex\":\"^/([^/]+)/parent/classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/courses\",\"regex\":\"^/([^/]+)/parent/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/courses/:id\",\"regex\":\"^/([^/]+)/parent/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/dashboard\",\"regex\":\"^/([^/]+)/parent/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/invoices\",\"regex\":\"^/([^/]+)/parent/invoices$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/messages\",\"regex\":\"^/([^/]+)/parent/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/notifications\",\"regex\":\"^/([^/]+)/parent/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/payments\",\"regex\":\"^/([^/]+)/parent/payments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/profile\",\"regex\":\"^/([^/]+)/parent/profile$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/progress\",\"regex\":\"^/([^/]+)/parent/progress$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/settings\",\"regex\":\"^/([^/]+)/parent/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId/ai-tutor\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)/ai-tutor$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId/assignments\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)/assignments$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/teachers\",\"regex\":\"^/([^/]+)/parent/teachers$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment\",\"regex\":\"^/([^/]+)/payment$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment/cancel\",\"regex\":\"^/([^/]+)/payment/cancel$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment/success\",\"regex\":\"^/([^/]+)/payment/success$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register\",\"regex\":\"^/([^/]+)/register$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/admin\",\"regex\":\"^/([^/]+)/register/admin$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/parent\",\"regex\":\"^/([^/]+)/register/parent$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/student\",\"regex\":\"^/([^/]+)/register/student$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/tutor\",\"regex\":\"^/([^/]+)/register/tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/agreement\",\"regex\":\"^/([^/]+)/student/agreement$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor\",\"regex\":\"^/([^/]+)/student/ai-tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/browse\",\"regex\":\"^/([^/]+)/student/ai-tutor/browse$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/english\",\"regex\":\"^/([^/]+)/student/ai-tutor/english$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/schedule\",\"regex\":\"^/([^/]+)/student/ai-tutor/schedule$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/assignments\",\"regex\":\"^/([^/]+)/student/assignments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/courses\",\"regex\":\"^/([^/]+)/student/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/dashboard\",\"regex\":\"^/([^/]+)/student/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/favorites\",\"regex\":\"^/([^/]+)/student/favorites$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/gamification\",\"regex\":\"^/([^/]+)/student/gamification$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/help\",\"regex\":\"^/([^/]+)/student/help$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/learn/:contentId\",\"regex\":\"^/([^/]+)/student/learn/([^/]+)$\",\"paramNames\":[\"locale\",\"contentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/lesson-replays\",\"regex\":\"^/([^/]+)/student/lesson-replays$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/live/:sessionId\",\"regex\":\"^/([^/]+)/student/live/([^/]+)$\",\"paramNames\":[\"locale\",\"sessionId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/live/join\",\"regex\":\"^/([^/]+)/student/live/join$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/messages\",\"regex\":\"^/([^/]+)/student/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missed-classes\",\"regex\":\"^/([^/]+)/student/missed-classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missed-lessons\",\"regex\":\"^/([^/]+)/student/missed-lessons$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missions\",\"regex\":\"^/([^/]+)/student/missions$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/notifications\",\"regex\":\"^/([^/]+)/student/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/onboarding\",\"regex\":\"^/([^/]+)/student/onboarding$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/pdf-tutoring\",\"regex\":\"^/([^/]+)/student/pdf-tutoring$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/progress\",\"regex\":\"^/([^/]+)/student/progress$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/quizzes\",\"regex\":\"^/([^/]+)/student/quizzes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/quizzes/:id\",\"regex\":\"^/([^/]+)/student/quizzes/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/resources\",\"regex\":\"^/([^/]+)/student/resources$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/review/:contentId\",\"regex\":\"^/([^/]+)/student/review/([^/]+)$\",\"paramNames\":[\"locale\",\"contentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/scores\",\"regex\":\"^/([^/]+)/student/scores$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/settings\",\"regex\":\"^/([^/]+)/student/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/skills\",\"regex\":\"^/([^/]+)/student/skills$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/study-groups\",\"regex\":\"^/([^/]+)/student/study-groups$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/chat\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/chat$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses/:curriculumId\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"subjectCode\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses/:curriculumId/details\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses/([^/]+)/details$\",\"paramNames\":[\"locale\",\"subjectCode\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/signup\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/signup$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/tutors\",\"regex\":\"^/([^/]+)/student/tutors$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/worlds\",\"regex\":\"^/([^/]+)/student/worlds$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/ai-assistant\",\"regex\":\"^/([^/]+)/tutor/ai-assistant$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/calendar\",\"regex\":\"^/([^/]+)/tutor/calendar$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/classes\",\"regex\":\"^/([^/]+)/tutor/classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses\",\"regex\":\"^/([^/]+)/tutor/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/builder\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/builder$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/tasks\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/tasks$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/tasks/:taskId/analytics\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/tasks/([^/]+)/analytics$\",\"paramNames\":[\"locale\",\"id\",\"taskId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/new\",\"regex\":\"^/([^/]+)/tutor/courses/new$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/curriculum\",\"regex\":\"^/([^/]+)/tutor/curriculum$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/dashboard\",\"regex\":\"^/([^/]+)/tutor/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/group-builder\",\"regex\":\"^/([^/]+)/tutor/group-builder$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/groups\",\"regex\":\"^/([^/]+)/tutor/groups$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/help\",\"regex\":\"^/([^/]+)/tutor/help$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/live-class\",\"regex\":\"^/([^/]+)/tutor/live-class$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/live-class/:sessionId\",\"regex\":\"^/([^/]+)/tutor/live-class/([^/]+)$\",\"paramNames\":[\"locale\",\"sessionId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/messages\",\"regex\":\"^/([^/]+)/tutor/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/my-page\",\"regex\":\"^/([^/]+)/tutor/my-page$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/notifications\",\"regex\":\"^/([^/]+)/tutor/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/pdf-tutoring\",\"regex\":\"^/([^/]+)/tutor/pdf-tutoring$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/question-bank\",\"regex\":\"^/([^/]+)/tutor/question-bank$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/quizzes\",\"regex\":\"^/([^/]+)/tutor/quizzes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/quizzes/:id\",\"regex\":\"^/([^/]+)/tutor/quizzes/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/reports\",\"regex\":\"^/([^/]+)/tutor/reports$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/reports/:studentId\",\"regex\":\"^/([^/]+)/tutor/reports/([^/]+)$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/resources\",\"regex\":\"^/([^/]+)/tutor/resources$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/revenue\",\"regex\":\"^/([^/]+)/tutor/revenue$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/settings\",\"regex\":\"^/([^/]+)/tutor/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/students\",\"regex\":\"^/([^/]+)/tutor/students$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/whiteboards\",\"regex\":\"^/([^/]+)/tutor/whiteboards$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/whiteboards/:id\",\"regex\":\"^/([^/]+)/tutor/whiteboards/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/u/:username\",\"regex\":\"^/([^/]+)/u/([^/]+)$\",\"paramNames\":[\"locale\",\"username\"],\"hasOptionalPrefix\":true}],\"staticRoutes\":[],\"isrRoutes\":[]}";
globalThis["_sentryNextJsVersion"] = "16.1.6";
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"]({
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSentryInitOptions"])(),
    tracesSampleRate: ("TURBOPACK compile-time truthy", 1) ? 1.0 : "TURBOPACK unreachable"
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setupClientMonitoring"])();
const onRouterTransitionStart = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureRouterTransitionStart"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/pages/_app\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/app.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# debugId=66789ff0-c34d-38f1-25ba-a92aabe3a1a7
//# sourceMappingURL=%5Broot-of-the-server%5D__4ed1105d._.js.map