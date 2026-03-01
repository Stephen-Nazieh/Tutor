;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="3f300b14-ac8f-5905-e847-1bd505311d19")}catch(e){}}();
module.exports = [
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [instrumentation] (ecmascript) <locals>", ((__turbopack_context__) => {
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
// Drizzle is NOT re-exported here so that @/lib/db is safe for client/instrumentation (pg is Node-only).
// Server-only code that needs Drizzle: import { drizzleDb } from '@/lib/db/drizzle'
// Re-export Prisma types (will be empty on client)
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@prisma/client)");
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
const isEdgeRuntime = typeof globalThis.EdgeRuntime !== 'undefined' || typeof process !== 'undefined' && ("TURBOPACK compile-time value", "nodejs") === 'edge';
const isServer = ("TURBOPACK compile-time value", "undefined") === 'undefined' && !isEdgeRuntime;
// Initialize in-memory cache only on server
function getQueryCache() {
    if (!isServer) return null;
    if (!queryCache) {
        queryCache = new Map();
    }
    return queryCache;
}
// Initialize Redis client if available (server-side only)
async function initRedis() {
    if (!isServer) return null;
    if (redisInitialized) return redis;
    try {
        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
            console.log('[DB] Redis URL not configured, using in-memory cache');
            redisInitialized = true;
            return null;
        }
        // Dynamic import to avoid bundling issues
        const { Redis } = await __turbopack_context__.A("[externals]/ioredis [external] (ioredis, cjs, [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ioredis, async loader)");
        redis = new Redis(redisUrl, {
            retryStrategy: (times)=>Math.min(times * 50, 2000),
            maxRetriesPerRequest: 3
        });
        redis.on('error', (err)=>{
            console.error('[Redis] Connection error:', err);
            redis = null;
        });
        console.log('[DB] Redis cache initialized');
        redisInitialized = true;
        return redis;
    } catch (e) {
        console.warn('[DB] Failed to initialize Redis, using in-memory cache');
        redisInitialized = true;
        return null;
    }
}
// Initialize Prisma Client with connection pooling (server-side only)
if (isServer) {
    try {
        const { PrismaClient } = __turbopack_context__.r("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@prisma/client)");
        const globalForPrisma = globalThis;
        // Initialize Redis on first use (lazy initialization)
        if (globalForPrisma.redisInitialized) {
            redis = globalForPrisma.redis;
            redisInitialized = true;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            globalForPrisma.redis = redis;
            globalForPrisma.redisInitialized = redisInitialized;
        }
        // Initialize Prisma with connection pooling
        if (globalForPrisma.prisma) {
            db = globalForPrisma.prisma;
        } else {
            db = new PrismaClient({
                log: ("TURBOPACK compile-time truthy", 1) ? [
                    'query',
                    'error',
                    'warn'
                ] : "TURBOPACK unreachable",
                // Connection pooling configuration
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL
                    }
                }
            });
            // Add connection pool monitoring
            db.$on('query', (e)=>{
                if ("TURBOPACK compile-time truthy", 1) {
                    console.log('[Prisma Query]', e.query, `${e.duration}ms`);
                }
            });
            if ("TURBOPACK compile-time truthy", 1) {
                globalForPrisma.prisma = db;
            }
        }
        console.log('[DB] Prisma Client initialized with connection pooling');
    } catch (e) {
        console.error('[DB] Failed to initialize Prisma:', e);
        // Fallback for build time
        db = {
            $connect: async ()=>{},
            $disconnect: async ()=>{}
        };
    }
} else {
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
        if (!isServer) return null;
        if (!redisInitialized) {
            await initRedis();
        }
        return redis;
    },
    /**
   * Get cached value
   */ async get (key) {
        if (!isServer) return null;
        const fullKey = CACHE_CONFIG.prefix + key;
        // Try Redis first
        const client = await this.ensureRedis();
        if (client) {
            try {
                const value = await client.get(fullKey);
                if (value) return JSON.parse(value);
            } catch (e) {
                console.error('[Cache] Redis get error:', e);
            }
        }
        // Fallback to in-memory cache
        const cache = getQueryCache();
        if (!cache) return null;
        const cached = cache.get(fullKey);
        if (cached && cached.expires > Date.now()) {
            return cached.data;
        }
        cache.delete(fullKey);
        return null;
    },
    /**
   * Set cached value
   */ async set (key, value, ttlSeconds = CACHE_CONFIG.ttl) {
        if (!isServer) return;
        const fullKey = CACHE_CONFIG.prefix + key;
        // Try Redis first
        const client = await this.ensureRedis();
        if (client) {
            try {
                await client.setex(fullKey, ttlSeconds, JSON.stringify(value));
                return;
            } catch (e) {
                console.error('[Cache] Redis set error:', e);
            }
        }
        // Fallback to in-memory cache
        const cache = getQueryCache();
        if (cache) {
            cache.set(fullKey, {
                data: value,
                expires: Date.now() + ttlSeconds * 1000
            });
        }
    },
    /**
   * Delete cached value
   */ async delete (key) {
        if (!isServer) return;
        const fullKey = CACHE_CONFIG.prefix + key;
        const client = await this.ensureRedis();
        if (client) {
            try {
                await client.del(fullKey);
            } catch (e) {
                console.error('[Cache] Redis del error:', e);
            }
        }
        const cache = getQueryCache();
        if (cache) cache.delete(fullKey);
    },
    /**
   * Clear all cached values
   */ async clear () {
        if (!isServer) return;
        const client = await this.ensureRedis();
        if (client) {
            try {
                const keys = await client.keys(CACHE_CONFIG.prefix + '*');
                if (keys.length > 0) {
                    await client.del(...keys);
                }
            } catch (e) {
                console.error('[Cache] Redis clear error:', e);
            }
        }
        const cache = getQueryCache();
        if (cache) cache.clear();
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
        if (!isServer) return;
        const client = await this.ensureRedis();
        if (client) {
            try {
                const keys = await client.keys(CACHE_CONFIG.prefix + pattern);
                if (keys.length > 0) {
                    await client.del(...keys);
                }
            } catch (e) {
                console.error('[Cache] Pattern invalidation error:', e);
            }
        }
        // Clear in-memory cache matching pattern
        const cache = getQueryCache();
        if (cache) {
            const regex = new RegExp(CACHE_CONFIG.prefix + pattern.replace('*', '.*'));
            for (const key of cache.keys()){
                if (regex.test(key)) cache.delete(key);
            }
        }
    }
};
const queryOptimizer = {
    /**
   * Batch load function for N+1 prevention
   */ async batchLoad (ids, fetchFn, getId) {
        if (!isServer) return ids.map(()=>null);
        if (ids.length === 0) return [];
        // Deduplicate IDs
        const uniqueIds = [
            ...new Set(ids)
        ];
        // Fetch all items in one query
        const items = await fetchFn(uniqueIds);
        // Create lookup map
        const itemMap = new Map(items.map((item)=>[
                getId(item),
                item
            ]));
        // Return items in original order
        return ids.map((id)=>itemMap.get(id) || null);
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
        return isServer && !!process.env.DATABASE_READ_REPLICA_URL;
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
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [instrumentation] (ecmascript) <locals>");
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
            await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].$transaction(metrics.map((metric)=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.create({
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
            const performanceAlertModel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"]?.performanceAlert;
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
            const { notifyMany } = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/notifications/notify.ts [instrumentation] (ecmascript, async loader)");
            // Get admin user IDs (simplified - would need proper admin lookup)
            const admins = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].user.findMany({
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
            const performanceAlertModel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"]?.performanceAlert;
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
                    enabled: !!process.env.WECHAT_WEBHOOK_URL,
                    webhook: process.env.WECHAT_WEBHOOK_URL
                },
                dingtalk: {
                    enabled: !!process.env.DINGTALK_WEBHOOK_URL,
                    webhook: process.env.DINGTALK_WEBHOOK_URL
                },
                sms: {
                    enabled: !!process.env.SMS_PROVIDER,
                    provider: process.env.SMS_PROVIDER,
                    accessKeyId: process.env.SMS_ACCESS_KEY_ID,
                    accessKeySecret: process.env.SMS_ACCESS_KEY_SECRET,
                    signName: process.env.SMS_SIGN_NAME,
                    templateCode: process.env.SMS_TEMPLATE_CODE
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
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && this.config.enableFrontendMonitoring) //TURBOPACK unreachable
        ;
        // Setup budget checking
        if (this.config.budgets.length > 0) {
            this.startBudgetChecker();
        }
        this.initialized = true;
    }
    /**
   * Setup frontend monitoring
   */ setupFrontendMonitoring() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Observe Web Vitals
   */ observeWebVitals() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Intercept fetch for API monitoring
   */ interceptFetch() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const originalFetch = undefined;
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
            const avg = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.aggregate({
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
    getWindowMs(window) {
        const multipliers = {
            '1m': 60000,
            '5m': 300000,
            '15m': 900000,
            '1h': 3600000,
            '24h': 86400000
        };
        return multipliers[window] || 60000;
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
   */ async getMetricsSummary(metricName, window = '24h') {
        const windowMs = {
            '1h': 3600000,
            '24h': 86400000,
            '7d': 604800000
        }[window];
        const cutoff = new Date(Date.now() - windowMs);
        const metrics = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.findMany({
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
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [instrumentation] (ecmascript) <locals>", ((__turbopack_context__) => {
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
/**
 * Enterprise-grade Sentry monitoring for global platform
 * - Global error tracking, Core Web Vitals, PII filtering, GDPR/PIPL compliant
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/cjs/index.server.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring.ts [instrumentation] (ecmascript)");
;
;
function getSentryInitOptions(overrides) {
    const base = {
        dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
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
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__.captureException(error, {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["reportError"])(error, context);
        } catch  {
        /* ignore */ }
    },
    handleWarning (warning, context) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__.captureMessage(warning, 'warning', {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
    },
    addBreadcrumb (breadcrumb) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: breadcrumb.category ?? 'default',
            message: breadcrumb.message,
            data: breadcrumb.data,
            timestamp: Date.now() / 1000
        });
    }
};
function captureMetric(name, value, unit) {
    try {
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__.metrics;
        if (unit === 'count' && typeof m?.count === 'function') m.count(name, value);
        else if (typeof m?.distribution === 'function') m.distribution(name, value, {
            unit: 'millisecond'
        });
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    } catch  {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    }
}
const globalPerformanceMonitor = {
    trackApiEndpoint (endpoint, responseTime, errorCount) {
        captureMetric('api_response_time', responseTime, 'ms');
        if (errorCount > 0) captureMetric('api_error_count', errorCount, 'count');
    },
    trackInteraction (type, element, value) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: 'interaction',
            message: `${type} on ${element}`,
            data: value,
            timestamp: Date.now() / 1000
        });
    },
    trackCacheHit (cacheKey, hit) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["reportMetric"])('cache_hit_rate', hit ? 1 : 0, 'count', {
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
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/sentry.server.config.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/cjs/index.server.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [instrumentation] (ecmascript) <locals>");
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["init"]({
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSentryInitOptions"])(),
    tracesSampleRate: 0.1
});
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@prisma/client)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client-38ad48cf7901491a", () => require("@prisma/client-38ad48cf7901491a"));

module.exports = mod;
}),
];

//# debugId=3f300b14-ac8f-5905-e847-1bd505311d19
//# sourceMappingURL=%5Broot-of-the-server%5D__88d70b8d._.js.map