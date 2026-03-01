(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__dd0fdde8._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:assert [external] (node:assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:assert", () => require("node:assert"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'fs', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`fs`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'path', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`path`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'stream', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`stream`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'dns', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`dns`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'net', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`net`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'tls', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`tls`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'string_decoder', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`string_decoder`));
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [instrumentation-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
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
const isEdgeRuntime = typeof globalThis.EdgeRuntime !== 'undefined' || typeof process !== 'undefined' && ("TURBOPACK compile-time value", "edge") === 'edge';
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
        const { Redis } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ioredis/built/index.js [instrumentation-edge] (ecmascript)"));
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
        const { PrismaClient } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@prisma/client/default.js [instrumentation-edge] (ecmascript)");
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/enums.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventStatusEnum",
    ()=>eventStatusEnum,
    "eventTypeEnum",
    ()=>eventTypeEnum,
    "mathAIInteractionTypeEnum",
    ()=>mathAIInteractionTypeEnum,
    "mathSessionStatusEnum",
    ()=>mathSessionStatusEnum,
    "messageSourceEnum",
    ()=>messageSourceEnum,
    "paymentGatewayEnum",
    ()=>paymentGatewayEnum,
    "paymentStatusEnum",
    ()=>paymentStatusEnum,
    "pollStatusEnum",
    ()=>pollStatusEnum,
    "pollTypeEnum",
    ()=>pollTypeEnum,
    "refundStatusEnum",
    ()=>refundStatusEnum,
    "roleEnum",
    ()=>roleEnum,
    "sessionTypeEnum",
    ()=>sessionTypeEnum,
    "tierEnum",
    ()=>tierEnum
]);
/**
 * Drizzle enums (generated from Prisma schema).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/enum.js [instrumentation-edge] (ecmascript)");
;
const pollTypeEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('PollType', [
    'MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'RATING',
    'SHORT_ANSWER',
    'WORD_CLOUD'
]);
const pollStatusEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('PollStatus', [
    'DRAFT',
    'ACTIVE',
    'CLOSED'
]);
const roleEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('Role', [
    'STUDENT',
    'TUTOR',
    'PARENT',
    'ADMIN'
]);
const sessionTypeEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('SessionType', [
    'CLINIC',
    'GROUP',
    'ONE_ON_ONE'
]);
const messageSourceEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('MessageSource', [
    'AI',
    'TUTOR',
    'STUDENT'
]);
const tierEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('Tier', [
    'FREE',
    'PRO',
    'ELITE'
]);
const paymentStatusEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('PaymentStatus', [
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED',
    'REFUNDED',
    'CANCELLED'
]);
const paymentGatewayEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('PaymentGateway', [
    'AIRWALLEX',
    'HITPAY'
]);
const refundStatusEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('RefundStatus', [
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED'
]);
const eventTypeEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('EventType', [
    'LESSON',
    'CLINIC',
    'CONSULTATION',
    'BREAK',
    'PERSONAL',
    'OTHER'
]);
const eventStatusEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('EventStatus', [
    'CONFIRMED',
    'TENTATIVE',
    'CANCELLED'
]);
const mathSessionStatusEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('MathSessionStatus', [
    'ACTIVE',
    'PAUSED',
    'ENDED',
    'ARCHIVED'
]);
const mathAIInteractionTypeEnum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$enum$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgEnum"])('MathAIInteractionType', [
    'SOLVE',
    'HINT',
    'CHECK',
    'EXPLAIN',
    'RECOGNIZE'
]);
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/tables.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aIAssistantInsight",
    ()=>aIAssistantInsight,
    "aIAssistantMessage",
    ()=>aIAssistantMessage,
    "aIAssistantSession",
    ()=>aIAssistantSession,
    "aIInteractionSession",
    ()=>aIInteractionSession,
    "aITutorDailyUsage",
    ()=>aITutorDailyUsage,
    "aITutorEnrollment",
    ()=>aITutorEnrollment,
    "aITutorSubscription",
    ()=>aITutorSubscription,
    "account",
    ()=>account,
    "achievement",
    ()=>achievement,
    "adminAssignment",
    ()=>adminAssignment,
    "adminAuditLog",
    ()=>adminAuditLog,
    "adminRole",
    ()=>adminRole,
    "adminSession",
    ()=>adminSession,
    "apiKey",
    ()=>apiKey,
    "badge",
    ()=>badge,
    "bookmark",
    ()=>bookmark,
    "breakoutRoom",
    ()=>breakoutRoom,
    "breakoutRoomAssignment",
    ()=>breakoutRoomAssignment,
    "breakoutSession",
    ()=>breakoutSession,
    "budgetAlert",
    ()=>budgetAlert,
    "calendarAvailability",
    ()=>calendarAvailability,
    "calendarConnection",
    ()=>calendarConnection,
    "calendarEvent",
    ()=>calendarEvent,
    "calendarException",
    ()=>calendarException,
    "clinic",
    ()=>clinic,
    "clinicBooking",
    ()=>clinicBooking,
    "contentItem",
    ()=>contentItem,
    "contentProgress",
    ()=>contentProgress,
    "contentQuizCheckpoint",
    ()=>contentQuizCheckpoint,
    "conversation",
    ()=>conversation,
    "courseBatch",
    ()=>courseBatch,
    "curriculum",
    ()=>curriculum,
    "curriculumCatalog",
    ()=>curriculumCatalog,
    "curriculumEnrollment",
    ()=>curriculumEnrollment,
    "curriculumLesson",
    ()=>curriculumLesson,
    "curriculumLessonProgress",
    ()=>curriculumLessonProgress,
    "curriculumModule",
    ()=>curriculumModule,
    "curriculumProgress",
    ()=>curriculumProgress,
    "curriculumShare",
    ()=>curriculumShare,
    "directMessage",
    ()=>directMessage,
    "emergencyContact",
    ()=>emergencyContact,
    "familyAccount",
    ()=>familyAccount,
    "familyBudget",
    ()=>familyBudget,
    "familyMember",
    ()=>familyMember,
    "familyNotification",
    ()=>familyNotification,
    "familyPayment",
    ()=>familyPayment,
    "featureFlag",
    ()=>featureFlag,
    "featureFlagChange",
    ()=>featureFlagChange,
    "feedbackWorkflow",
    ()=>feedbackWorkflow,
    "generatedTask",
    ()=>generatedTask,
    "ipWhitelist",
    ()=>ipWhitelist,
    "leaderboardEntry",
    ()=>leaderboardEntry,
    "lessonSession",
    ()=>lessonSession,
    "libraryTask",
    ()=>libraryTask,
    "liveSession",
    ()=>liveSession,
    "llmModel",
    ()=>llmModel,
    "llmProvider",
    ()=>llmProvider,
    "llmRoutingRule",
    ()=>llmRoutingRule,
    "mathAIInteraction",
    ()=>mathAIInteraction,
    "mathWhiteboardPage",
    ()=>mathWhiteboardPage,
    "mathWhiteboardParticipant",
    ()=>mathWhiteboardParticipant,
    "mathWhiteboardSession",
    ()=>mathWhiteboardSession,
    "mathWhiteboardSnapshot",
    ()=>mathWhiteboardSnapshot,
    "message",
    ()=>message,
    "mission",
    ()=>mission,
    "missionProgress",
    ()=>missionProgress,
    "note",
    ()=>note,
    "notification",
    ()=>notification,
    "notificationPreference",
    ()=>notificationPreference,
    "parentActivityLog",
    ()=>parentActivityLog,
    "parentPaymentAuthorization",
    ()=>parentPaymentAuthorization,
    "parentSpendingLimit",
    ()=>parentSpendingLimit,
    "payment",
    ()=>payment,
    "paymentOnPayout",
    ()=>paymentOnPayout,
    "payout",
    ()=>payout,
    "performanceAlert",
    ()=>performanceAlert,
    "performanceMetric",
    ()=>performanceMetric,
    "platformRevenue",
    ()=>platformRevenue,
    "poll",
    ()=>poll,
    "pollOption",
    ()=>pollOption,
    "pollResponse",
    ()=>pollResponse,
    "profile",
    ()=>profile,
    "questionBankItem",
    ()=>questionBankItem,
    "quiz",
    ()=>quiz,
    "quizAssignment",
    ()=>quizAssignment,
    "quizAttempt",
    ()=>quizAttempt,
    "refund",
    ()=>refund,
    "resource",
    ()=>resource,
    "resourceShare",
    ()=>resourceShare,
    "reviewSchedule",
    ()=>reviewSchedule,
    "securityEvent",
    ()=>securityEvent,
    "sessionParticipant",
    ()=>sessionParticipant,
    "sessionReplayArtifact",
    ()=>sessionReplayArtifact,
    "studentPerformance",
    ()=>studentPerformance,
    "studentProgressSnapshot",
    ()=>studentProgressSnapshot,
    "studyGroup",
    ()=>studyGroup,
    "studyGroupMember",
    ()=>studyGroupMember,
    "systemSetting",
    ()=>systemSetting,
    "taskSubmission",
    ()=>taskSubmission,
    "user",
    ()=>user,
    "userActivityLog",
    ()=>userActivityLog,
    "userBadge",
    ()=>userBadge,
    "userDailyQuest",
    ()=>userDailyQuest,
    "userGamification",
    ()=>userGamification,
    "videoWatchEvent",
    ()=>videoWatchEvent,
    "webhookEvent",
    ()=>webhookEvent,
    "whiteboard",
    ()=>whiteboard,
    "whiteboardPage",
    ()=>whiteboardPage,
    "whiteboardSession",
    ()=>whiteboardSession,
    "whiteboardSnapshot",
    ()=>whiteboardSnapshot
]);
/**
 * Drizzle table definitions (generated from Prisma schema).
 * Do not edit by hand; re-run: node scripts/prisma-to-drizzle-schema.mjs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/table.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/text.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/integer.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/boolean.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/timestamp.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/jsonb.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/double-precision.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/indexes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/enums.ts [instrumentation-edge] (ecmascript)");
;
;
const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('User', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('email').notNull().unique(),
    password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('password'),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["roleEnum"]('role').notNull(),
    emailVerified: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('emailVerified', {
        withTimezone: true
    }),
    image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('image'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
});
const account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Account', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    provider: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('provider').notNull(),
    providerAccountId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('providerAccountId').notNull(),
    refresh_token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('refresh_token'),
    access_token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('access_token'),
    expires_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('expires_at'),
    token_type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('token_type'),
    scope: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('scope'),
    id_token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id_token'),
    session_state: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('session_state')
}, (table)=>({
        Account_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Account_userId_idx').on(table.userId),
        Account_provider_providerAccountId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('Account_provider_providerAccountId_key').on(table.provider, table.providerAccountId)
    }));
const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Profile', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull().unique(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name'),
    username: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('username').unique(),
    bio: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('bio'),
    avatarUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('avatarUrl'),
    dateOfBirth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('dateOfBirth', {
        withTimezone: true
    }),
    timezone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('timezone').notNull(),
    emailNotifications: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('emailNotifications').notNull(),
    smsNotifications: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('smsNotifications').notNull(),
    gradeLevel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('gradeLevel'),
    studentUniqueId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentUniqueId').unique(),
    subjectsOfInterest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subjectsOfInterest').array().notNull(),
    preferredLanguages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('preferredLanguages').array().notNull(),
    learningGoals: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('learningGoals').array().notNull(),
    tosAccepted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('tosAccepted').notNull(),
    tosAcceptedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('tosAcceptedAt', {
        withTimezone: true
    }),
    organizationName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('organizationName'),
    isOnboarded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isOnboarded').notNull(),
    hourlyRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('hourlyRate'),
    specialties: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('specialties').array().notNull(),
    credentials: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('credentials'),
    availability: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('availability'),
    paidClassesEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('paidClassesEnabled').notNull(),
    paymentGatewayPreference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('paymentGatewayPreference'),
    currency: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('currency'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
});
const curriculumCatalog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CurriculumCatalog', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    subject: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subject').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    code: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('code'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        CurriculumCatalog_subject_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumCatalog_subject_idx').on(table.subject),
        CurriculumCatalog_subject_name_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('CurriculumCatalog_subject_name_key').on(table.subject, table.name)
    }));
const curriculum = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Curriculum', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    subject: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subject').notNull(),
    gradeLevel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('gradeLevel'),
    difficulty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('difficulty').notNull(),
    estimatedHours: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('estimatedHours').notNull(),
    isPublished: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isPublished').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    creatorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('creatorId'),
    isLiveOnline: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isLiveOnline').notNull(),
    languageOfInstruction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('languageOfInstruction'),
    price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('price'),
    currency: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('currency'),
    curriculumSource: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumSource'),
    outlineSource: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('outlineSource'),
    schedule: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('schedule'),
    courseMaterials: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('courseMaterials'),
    coursePitch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('coursePitch')
}, (table)=>({
        Curriculum_subject_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Curriculum_subject_idx').on(table.subject),
        Curriculum_isPublished_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Curriculum_isPublished_idx').on(table.isPublished),
        Curriculum_creatorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Curriculum_creatorId_idx').on(table.creatorId)
    }));
const curriculumShare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CurriculumShare', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId').notNull(),
    sharedByTutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sharedByTutorId').notNull(),
    recipientId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('recipientId').notNull(),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('message').notNull(),
    isPublic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isPublic').notNull(),
    sharedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('sharedAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        CurriculumShare_sharedByTutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumShare_sharedByTutorId_idx').on(table.sharedByTutorId),
        CurriculumShare_recipientId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumShare_recipientId_idx').on(table.recipientId),
        CurriculumShare_curriculumId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumShare_curriculumId_idx').on(table.curriculumId),
        CurriculumShare_curriculumId_recipientId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('CurriculumShare_curriculumId_recipientId_key').on(table.curriculumId, table.recipientId)
    }));
const curriculumModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CurriculumModule', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    order: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('order').notNull(),
    builderData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('builderData')
}, (table)=>({
        CurriculumModule_curriculumId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumModule_curriculumId_idx').on(table.curriculumId),
        CurriculumModule_order_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumModule_order_idx').on(table.order)
    }));
const curriculumLesson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CurriculumLesson', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    moduleId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('moduleId').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('duration').notNull(),
    difficulty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('difficulty').notNull(),
    order: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('order').notNull(),
    learningObjectives: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('learningObjectives').array().notNull(),
    teachingPoints: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('teachingPoints').array().notNull(),
    keyConcepts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('keyConcepts').array().notNull(),
    examples: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('examples'),
    practiceProblems: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('practiceProblems'),
    commonMisconceptions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('commonMisconceptions').array().notNull(),
    prerequisiteLessonIds: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('prerequisiteLessonIds').array().notNull(),
    builderData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('builderData')
}, (table)=>({
        CurriculumLesson_moduleId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumLesson_moduleId_idx').on(table.moduleId),
        CurriculumLesson_order_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumLesson_order_idx').on(table.order)
    }));
const lessonSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('LessonSession', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    lessonId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('lessonId').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    currentSection: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('currentSection').notNull(),
    conceptMastery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('conceptMastery').notNull(),
    misconceptions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('misconceptions').array().notNull(),
    sessionContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('sessionContext'),
    whiteboardItems: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('whiteboardItems').array().notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    lastActivityAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastActivityAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('completedAt', {
        withTimezone: true
    })
}, (table)=>({
        LessonSession_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LessonSession_studentId_idx').on(table.studentId),
        LessonSession_lessonId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LessonSession_lessonId_idx').on(table.lessonId),
        LessonSession_studentId_lessonId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('LessonSession_studentId_lessonId_key').on(table.studentId, table.lessonId)
    }));
const curriculumLessonProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CurriculumLessonProgress', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    lessonId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('lessonId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    currentSection: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('currentSection').notNull(),
    score: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('score'),
    completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('completedAt', {
        withTimezone: true
    }),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        CurriculumLessonProgress_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumLessonProgress_studentId_idx').on(table.studentId),
        CurriculumLessonProgress_lessonId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('CurriculumLessonProgress_lessonId_studentId_key').on(table.lessonId, table.studentId)
    }));
const curriculumEnrollment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CurriculumEnrollment', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId').notNull(),
    batchId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('batchId'),
    enrolledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('enrolledAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('completedAt', {
        withTimezone: true
    }),
    lastActivity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastActivity', {
        withTimezone: true
    }).notNull().defaultNow(),
    lessonsCompleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('lessonsCompleted').notNull(),
    enrollmentSource: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('enrollmentSource')
}, (table)=>({
        CurriculumEnrollment_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumEnrollment_studentId_idx').on(table.studentId),
        CurriculumEnrollment_batchId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumEnrollment_batchId_idx').on(table.batchId),
        CurriculumEnrollment_studentId_curriculumId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('CurriculumEnrollment_studentId_curriculumId_key').on(table.studentId, table.curriculumId)
    }));
const courseBatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CourseBatch', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    startDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startDate', {
        withTimezone: true
    }),
    order: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('order').notNull(),
    difficulty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('difficulty'),
    schedule: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('schedule'),
    price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('price'),
    currency: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('currency'),
    languageOfInstruction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('languageOfInstruction'),
    isLive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isLive').notNull(),
    meetingUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('meetingUrl'),
    maxStudents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxStudents').notNull()
}, (table)=>({
        CourseBatch_curriculumId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CourseBatch_curriculumId_idx').on(table.curriculumId)
    }));
const curriculumProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CurriculumProgress', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId').notNull(),
    lessonsCompleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('lessonsCompleted').notNull(),
    totalLessons: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('totalLessons').notNull(),
    currentLessonId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('currentLessonId'),
    averageScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('averageScore'),
    isCompleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isCompleted').notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('completedAt', {
        withTimezone: true
    })
}, (table)=>({
        CurriculumProgress_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CurriculumProgress_studentId_idx').on(table.studentId),
        CurriculumProgress_studentId_curriculumId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('CurriculumProgress_studentId_curriculumId_key').on(table.studentId, table.curriculumId)
    }));
const studentPerformance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('StudentPerformance', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId'),
    averageScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('averageScore').notNull(),
    completionRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('completionRate').notNull(),
    engagementScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('engagementScore').notNull(),
    attendanceRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('attendanceRate').notNull(),
    participationRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('participationRate').notNull(),
    strengths: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('strengths').notNull(),
    weaknesses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('weaknesses').notNull(),
    taskHistory: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('taskHistory').notNull(),
    commonMistakes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('commonMistakes').notNull(),
    skillBreakdown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('skillBreakdown').notNull(),
    cluster: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('cluster').notNull(),
    learningStyle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('learningStyle'),
    pace: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('pace').notNull(),
    recommendedPeers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('recommendedPeers').notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        StudentPerformance_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('StudentPerformance_studentId_idx').on(table.studentId),
        StudentPerformance_curriculumId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('StudentPerformance_curriculumId_idx').on(table.curriculumId),
        StudentPerformance_cluster_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('StudentPerformance_cluster_idx').on(table.cluster),
        StudentPerformance_studentId_curriculumId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('StudentPerformance_studentId_curriculumId_key').on(table.studentId, table.curriculumId)
    }));
const taskSubmission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('TaskSubmission', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    taskId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('taskId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    answers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('answers').notNull(),
    timeSpent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('timeSpent').notNull(),
    attempts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('attempts').notNull(),
    questionResults: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('questionResults'),
    score: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('score'),
    maxScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxScore').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    aiFeedback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('aiFeedback'),
    tutorFeedback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorFeedback'),
    tutorApproved: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('tutorApproved').notNull(),
    submittedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('submittedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    gradedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('gradedAt', {
        withTimezone: true
    })
}, (table)=>({
        TaskSubmission_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('TaskSubmission_studentId_idx').on(table.studentId),
        TaskSubmission_taskId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('TaskSubmission_taskId_idx').on(table.taskId),
        TaskSubmission_taskId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('TaskSubmission_taskId_studentId_key').on(table.taskId, table.studentId)
    }));
const feedbackWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('FeedbackWorkflow', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    submissionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('submissionId').notNull().unique(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    aiScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('aiScore'),
    aiComments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('aiComments'),
    aiStrengths: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('aiStrengths').notNull(),
    aiImprovements: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('aiImprovements').notNull(),
    aiResources: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('aiResources').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    modifiedScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('modifiedScore'),
    modifiedComments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('modifiedComments'),
    addedNotes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('addedNotes'),
    approvedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('approvedAt', {
        withTimezone: true
    }),
    approvedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('approvedBy'),
    autoApproved: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('autoApproved').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        FeedbackWorkflow_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FeedbackWorkflow_studentId_idx').on(table.studentId),
        FeedbackWorkflow_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FeedbackWorkflow_status_idx').on(table.status)
    }));
const generatedTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('GeneratedTask', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    roomId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roomId'),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    difficulty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('difficulty').notNull(),
    questions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('questions').notNull(),
    distributionMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('distributionMode').notNull(),
    assignments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('assignments').notNull(),
    documentSource: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('documentSource'),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    assignedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('assignedAt', {
        withTimezone: true
    }),
    lessonId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('lessonId'),
    batchId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('batchId'),
    dueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('dueDate', {
        withTimezone: true
    }),
    maxScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxScore').notNull(),
    timeLimitMinutes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('timeLimitMinutes'),
    enforceTimeLimit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('enforceTimeLimit').notNull(),
    enforceDueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('enforceDueDate').notNull(),
    maxAttempts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxAttempts').notNull()
}, (table)=>({
        GeneratedTask_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('GeneratedTask_tutorId_idx').on(table.tutorId),
        GeneratedTask_roomId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('GeneratedTask_roomId_idx').on(table.roomId),
        GeneratedTask_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('GeneratedTask_status_idx').on(table.status),
        GeneratedTask_lessonId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('GeneratedTask_lessonId_idx').on(table.lessonId),
        GeneratedTask_batchId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('GeneratedTask_batchId_idx').on(table.batchId)
    }));
const breakoutSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('BreakoutSession', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    mainRoomId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('mainRoomId').notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    roomCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('roomCount').notNull(),
    participantsPerRoom: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('participantsPerRoom').notNull(),
    distributionMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('distributionMode').notNull(),
    timeLimit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('timeLimit').notNull(),
    aiAssistantEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('aiAssistantEnabled').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }),
    endedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endedAt', {
        withTimezone: true
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        BreakoutSession_mainRoomId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('BreakoutSession_mainRoomId_idx').on(table.mainRoomId),
        BreakoutSession_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('BreakoutSession_tutorId_idx').on(table.tutorId),
        BreakoutSession_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('BreakoutSession_status_idx').on(table.status)
    }));
const breakoutRoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('BreakoutRoom', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    aiEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('aiEnabled').notNull(),
    aiMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('aiMode').notNull(),
    assignedTaskId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('assignedTaskId'),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    endsAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endsAt', {
        withTimezone: true
    }),
    aiNotes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('aiNotes').notNull(),
    alerts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('alerts').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        BreakoutRoom_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('BreakoutRoom_sessionId_idx').on(table.sessionId),
        BreakoutRoom_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('BreakoutRoom_status_idx').on(table.status)
    }));
const breakoutRoomAssignment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('BreakoutRoomAssignment', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    roomId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roomId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    joinedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('joinedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    leftAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('leftAt', {
        withTimezone: true
    })
}, (table)=>({
        BreakoutRoomAssignment_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('BreakoutRoomAssignment_studentId_idx').on(table.studentId),
        BreakoutRoomAssignment_roomId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('BreakoutRoomAssignment_roomId_studentId_key').on(table.roomId, table.studentId)
    }));
const aITutorEnrollment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AITutorEnrollment', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    subjectCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subjectCode').notNull(),
    enrolledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('enrolledAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    lastSessionAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastSessionAt', {
        withTimezone: true
    }),
    totalSessions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('totalSessions').notNull(),
    totalMinutes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('totalMinutes').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull()
}, (table)=>({
        AITutorEnrollment_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AITutorEnrollment_studentId_idx').on(table.studentId),
        AITutorEnrollment_studentId_subjectCode_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('AITutorEnrollment_studentId_subjectCode_key').on(table.studentId, table.subjectCode)
    }));
const aIInteractionSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AIInteractionSession', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    subjectCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subjectCode').notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    endedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endedAt', {
        withTimezone: true
    }),
    messageCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('messageCount').notNull(),
    topicsCovered: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('topicsCovered').array().notNull(),
    summary: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('summary')
}, (table)=>({
        AIInteractionSession_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIInteractionSession_studentId_idx').on(table.studentId),
        AIInteractionSession_startedAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIInteractionSession_startedAt_idx').on(table.startedAt)
    }));
const aITutorDailyUsage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AITutorDailyUsage', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('date', {
        withTimezone: true
    }).notNull().defaultNow(),
    sessionCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('sessionCount').notNull(),
    messageCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('messageCount').notNull(),
    minutesUsed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('minutesUsed').notNull()
}, (table)=>({
        AITutorDailyUsage_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AITutorDailyUsage_userId_idx').on(table.userId),
        AITutorDailyUsage_userId_date_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('AITutorDailyUsage_userId_date_key').on(table.userId, table.date)
    }));
const aITutorSubscription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AITutorSubscription', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull().unique(),
    tier: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["tierEnum"]('tier').notNull(),
    dailySessions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('dailySessions').notNull(),
    dailyMessages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('dailyMessages').notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('expiresAt', {
        withTimezone: true
    }),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull()
});
const contentItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ContentItem', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    subject: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subject').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('url'),
    thumbnailUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('thumbnailUrl'),
    duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('duration'),
    difficulty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('difficulty').notNull(),
    isPublished: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isPublished').notNull(),
    transcript: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('transcript'),
    videoVariants: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('videoVariants'),
    uploadStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('uploadStatus'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        ContentItem_subject_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ContentItem_subject_idx').on(table.subject),
        ContentItem_isPublished_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ContentItem_isPublished_idx').on(table.isPublished)
    }));
const videoWatchEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('VideoWatchEvent', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    contentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('contentId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    eventType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('eventType').notNull(),
    videoSeconds: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('videoSeconds').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('metadata')
}, (table)=>({
        VideoWatchEvent_contentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('VideoWatchEvent_contentId_idx').on(table.contentId),
        VideoWatchEvent_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('VideoWatchEvent_studentId_idx').on(table.studentId),
        VideoWatchEvent_contentId_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('VideoWatchEvent_contentId_studentId_idx').on(table.contentId, table.studentId)
    }));
const contentQuizCheckpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ContentQuizCheckpoint', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    contentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('contentId').notNull(),
    videoTimestampSec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('videoTimestampSec').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title'),
    questions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('questions').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        ContentQuizCheckpoint_contentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ContentQuizCheckpoint_contentId_idx').on(table.contentId),
        ContentQuizCheckpoint_contentId_videoTimestampSec_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('ContentQuizCheckpoint_contentId_videoTimestampSec_key').on(table.contentId, table.videoTimestampSec)
    }));
const contentProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ContentProgress', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    contentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('contentId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    progress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('progress').notNull(),
    completed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('completed').notNull(),
    lastPosition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('lastPosition'),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        ContentProgress_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ContentProgress_studentId_idx').on(table.studentId),
        ContentProgress_contentId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('ContentProgress_contentId_studentId_key').on(table.contentId, table.studentId)
    }));
const reviewSchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ReviewSchedule', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    contentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('contentId').notNull(),
    lastReviewed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastReviewed', {
        withTimezone: true
    }).notNull().defaultNow(),
    nextReview: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('nextReview', {
        withTimezone: true
    }).notNull(),
    interval: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('interval').notNull(),
    easeFactor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('easeFactor').notNull(),
    stability: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('stability').notNull(),
    repetitionCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('repetitionCount').notNull(),
    performance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('performance').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        ReviewSchedule_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ReviewSchedule_studentId_idx').on(table.studentId),
        ReviewSchedule_nextReview_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ReviewSchedule_nextReview_idx').on(table.nextReview),
        ReviewSchedule_studentId_contentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('ReviewSchedule_studentId_contentId_key').on(table.studentId, table.contentId)
    }));
const quizAttempt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('QuizAttempt', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    quizId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('quizId').notNull(),
    assignmentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('assignmentId'),
    answers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('answers').notNull(),
    score: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('score').notNull(),
    maxScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxScore').notNull(),
    completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('completedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    timeSpent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('timeSpent').notNull(),
    questionResults: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('questionResults'),
    feedback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('feedback'),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    attemptNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('attemptNumber').notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        QuizAttempt_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuizAttempt_studentId_idx').on(table.studentId),
        QuizAttempt_quizId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuizAttempt_quizId_idx').on(table.quizId),
        QuizAttempt_assignmentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuizAttempt_assignmentId_idx').on(table.assignmentId),
        QuizAttempt_studentId_quizId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuizAttempt_studentId_quizId_idx').on(table.studentId, table.quizId)
    }));
const questionBankItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('QuestionBankItem', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    question: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('question').notNull(),
    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('options'),
    correctAnswer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('correctAnswer'),
    explanation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('explanation'),
    hint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('hint'),
    points: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('points').notNull(),
    difficulty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('difficulty').notNull(),
    tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tags').array().notNull(),
    subject: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subject'),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId'),
    lessonId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('lessonId'),
    isPublic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isPublic').notNull(),
    usageCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('usageCount').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        QuestionBankItem_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuestionBankItem_tutorId_idx').on(table.tutorId),
        QuestionBankItem_type_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuestionBankItem_type_idx').on(table.type),
        QuestionBankItem_difficulty_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuestionBankItem_difficulty_idx').on(table.difficulty),
        QuestionBankItem_subject_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuestionBankItem_subject_idx').on(table.subject),
        QuestionBankItem_tags_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuestionBankItem_tags_idx').on(table.tags)
    }));
const quiz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Quiz', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    timeLimit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('timeLimit'),
    allowedAttempts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('allowedAttempts').notNull(),
    shuffleQuestions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('shuffleQuestions').notNull(),
    shuffleOptions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('shuffleOptions').notNull(),
    showCorrectAnswers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('showCorrectAnswers').notNull(),
    passingScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('passingScore'),
    questions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('questions').notNull(),
    totalPoints: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('totalPoints').notNull(),
    tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tags').array().notNull(),
    startDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startDate', {
        withTimezone: true
    }),
    dueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('dueDate', {
        withTimezone: true
    }),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId'),
    lessonId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('lessonId'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        Quiz_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Quiz_tutorId_idx').on(table.tutorId),
        Quiz_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Quiz_status_idx').on(table.status),
        Quiz_type_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Quiz_type_idx').on(table.type),
        Quiz_curriculumId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Quiz_curriculumId_idx').on(table.curriculumId),
        Quiz_lessonId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Quiz_lessonId_idx').on(table.lessonId)
    }));
const quizAssignment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('QuizAssignment', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    quizId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('quizId').notNull(),
    assignedByTutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('assignedByTutorId').notNull(),
    assignedToType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('assignedToType').notNull(),
    assignedToId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('assignedToId'),
    assignedToAll: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('assignedToAll').notNull(),
    assignedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('assignedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    dueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('dueDate', {
        withTimezone: true
    }),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull()
}, (table)=>({
        QuizAssignment_quizId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuizAssignment_quizId_idx').on(table.quizId),
        QuizAssignment_assignedByTutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuizAssignment_assignedByTutorId_idx').on(table.assignedByTutorId),
        QuizAssignment_assignedToId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuizAssignment_assignedToId_idx').on(table.assignedToId),
        QuizAssignment_isActive_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('QuizAssignment_isActive_idx').on(table.isActive)
    }));
const note = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Note', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    contentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('contentId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('content').notNull(),
    timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('timestamp').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        Note_contentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Note_contentId_idx').on(table.contentId),
        Note_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Note_studentId_idx').on(table.studentId)
    }));
const bookmark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Bookmark', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    contentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('contentId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        Bookmark_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Bookmark_studentId_idx').on(table.studentId),
        Bookmark_contentId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('Bookmark_contentId_studentId_key').on(table.contentId, table.studentId)
    }));
const userGamification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('UserGamification', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull().unique(),
    level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('level').notNull(),
    xp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('xp').notNull(),
    streakDays: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('streakDays').notNull(),
    longestStreak: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('longestStreak').notNull(),
    lastLogin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastLogin', {
        withTimezone: true
    }).notNull().defaultNow(),
    lastActiveDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastActiveDate', {
        withTimezone: true
    }),
    totalStudyMinutes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('totalStudyMinutes').notNull(),
    grammarScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('grammarScore').notNull(),
    vocabularyScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('vocabularyScore').notNull(),
    speakingScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('speakingScore').notNull(),
    listeningScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('listeningScore').notNull(),
    confidenceScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('confidenceScore').notNull(),
    fluencyScore: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('fluencyScore').notNull(),
    unlockedWorlds: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('unlockedWorlds').array().notNull()
});
const achievement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Achievement', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description').notNull(),
    unlockedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('unlockedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    xpAwarded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('xpAwarded').notNull()
}, (table)=>({
        Achievement_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Achievement_userId_idx').on(table.userId)
    }));
const mission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Mission', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    xpReward: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('xpReward').notNull(),
    requirement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('requirement').notNull(),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull()
});
const missionProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('MissionProgress', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    missionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('missionId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    progress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('progress').notNull(),
    completed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('completed').notNull(),
    completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('completedAt', {
        withTimezone: true
    })
}, (table)=>({
        MissionProgress_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MissionProgress_studentId_idx').on(table.studentId),
        MissionProgress_missionId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('MissionProgress_missionId_studentId_key').on(table.missionId, table.studentId)
    }));
const userDailyQuest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('UserDailyQuest', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    missionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('missionId').notNull(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('date', {
        withTimezone: true
    }).notNull().defaultNow(),
    completed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('completed').notNull()
}, (table)=>({
        UserDailyQuest_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('UserDailyQuest_userId_idx').on(table.userId),
        UserDailyQuest_userId_missionId_date_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('UserDailyQuest_userId_missionId_date_key').on(table.userId, table.missionId, table.date)
    }));
const badge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Badge', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('key').notNull().unique(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description').notNull(),
    icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('icon').notNull(),
    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('color').notNull(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('category').notNull(),
    rarity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('rarity').notNull(),
    xpBonus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('xpBonus').notNull(),
    requirement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('requirement').notNull(),
    isSecret: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isSecret').notNull(),
    order: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('order').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
});
const userBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('UserBadge', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    badgeId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('badgeId').notNull(),
    earnedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('earnedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    progress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('progress').notNull()
}, (table)=>({
        UserBadge_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('UserBadge_userId_idx').on(table.userId),
        UserBadge_badgeId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('UserBadge_badgeId_idx').on(table.badgeId),
        UserBadge_userId_badgeId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('UserBadge_userId_badgeId_key').on(table.userId, table.badgeId)
    }));
const leaderboardEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('LeaderboardEntry', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    periodStart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('periodStart', {
        withTimezone: true
    }),
    periodEnd: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('periodEnd', {
        withTimezone: true
    }),
    score: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('score').notNull(),
    rank: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('rank')
}, (table)=>({
        LeaderboardEntry_type_score_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LeaderboardEntry_type_score_idx').on(table.type, table.score),
        LeaderboardEntry_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LeaderboardEntry_userId_idx').on(table.userId),
        LeaderboardEntry_userId_type_periodStart_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('LeaderboardEntry_userId_type_periodStart_key').on(table.userId, table.type, table.periodStart)
    }));
const liveSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('LiveSession', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId'),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    subject: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subject').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    gradeLevel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('gradeLevel'),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["sessionTypeEnum"]('type').notNull(),
    scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('scheduledAt', {
        withTimezone: true
    }),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }),
    endedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endedAt', {
        withTimezone: true
    }),
    maxStudents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxStudents').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    roomId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roomId'),
    roomUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roomUrl'),
    recordingUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('recordingUrl'),
    recordingAvailableAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('recordingAvailableAt', {
        withTimezone: true
    })
}, (table)=>({
        LiveSession_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LiveSession_tutorId_idx').on(table.tutorId),
        LiveSession_curriculumId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LiveSession_curriculumId_idx').on(table.curriculumId),
        LiveSession_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LiveSession_status_idx').on(table.status),
        LiveSession_scheduledAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LiveSession_scheduledAt_idx').on(table.scheduledAt)
    }));
const sessionReplayArtifact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('SessionReplayArtifact', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull().unique(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    recordingUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('recordingUrl'),
    transcript: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('transcript'),
    summary: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('summary'),
    summaryJson: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('summaryJson'),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }),
    endedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endedAt', {
        withTimezone: true
    }),
    generatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('generatedAt', {
        withTimezone: true
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        SessionReplayArtifact_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SessionReplayArtifact_tutorId_idx').on(table.tutorId),
        SessionReplayArtifact_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SessionReplayArtifact_status_idx').on(table.status),
        SessionReplayArtifact_generatedAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SessionReplayArtifact_generatedAt_idx').on(table.generatedAt)
    }));
const sessionParticipant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('SessionParticipant', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    joinedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('joinedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    leftAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('leftAt', {
        withTimezone: true
    })
}, (table)=>({
        SessionParticipant_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SessionParticipant_studentId_idx').on(table.studentId),
        SessionParticipant_sessionId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('SessionParticipant_sessionId_studentId_key').on(table.sessionId, table.studentId)
    }));
const poll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Poll', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    question: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('question').notNull(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pollTypeEnum"]('type').notNull(),
    isAnonymous: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isAnonymous').notNull(),
    allowMultiple: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('allowMultiple').notNull(),
    timeLimit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('timeLimit'),
    showResults: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('showResults').notNull(),
    correctOptionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('correctOptionId'),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pollStatusEnum"]('status').notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }),
    endedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endedAt', {
        withTimezone: true
    }),
    totalResponses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('totalResponses').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        Poll_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Poll_sessionId_idx').on(table.sessionId),
        Poll_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Poll_tutorId_idx').on(table.tutorId),
        Poll_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Poll_status_idx').on(table.status),
        Poll_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Poll_createdAt_idx').on(table.createdAt)
    }));
const pollOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('PollOption', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    pollId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('pollId').notNull(),
    label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('label').notNull(),
    text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('text').notNull(),
    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('color'),
    responseCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('responseCount').notNull(),
    percentage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('percentage').notNull()
}, (table)=>({
        PollOption_pollId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PollOption_pollId_idx').on(table.pollId)
    }));
const pollResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('PollResponse', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    pollId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('pollId').notNull(),
    respondentHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('respondentHash'),
    optionIds: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('optionIds').array().notNull(),
    rating: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('rating'),
    textAnswer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('textAnswer'),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        PollResponse_pollId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PollResponse_pollId_idx').on(table.pollId),
        PollResponse_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PollResponse_studentId_idx').on(table.studentId),
        PollResponse_pollId_respondentHash_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('PollResponse_pollId_respondentHash_key').on(table.pollId, table.respondentHash)
    }));
const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Message', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('content').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    source: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["messageSourceEnum"]('source').notNull(),
    timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('timestamp', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        Message_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Message_sessionId_idx').on(table.sessionId),
        Message_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Message_userId_idx').on(table.userId)
    }));
const conversation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Conversation', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    participant1Id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('participant1Id').notNull(),
    participant2Id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('participant2Id').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        Conversation_participant1Id_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Conversation_participant1Id_idx').on(table.participant1Id),
        Conversation_participant2Id_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Conversation_participant2Id_idx').on(table.participant2Id),
        Conversation_updatedAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Conversation_updatedAt_idx').on(table.updatedAt),
        Conversation_participant1Id_participant2Id_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('Conversation_participant1Id_participant2Id_key').on(table.participant1Id, table.participant2Id)
    }));
const directMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('DirectMessage', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    conversationId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('conversationId').notNull(),
    senderId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('senderId').notNull(),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('content').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    attachmentUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('attachmentUrl'),
    read: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('read').notNull(),
    readAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('readAt', {
        withTimezone: true
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        DirectMessage_conversationId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('DirectMessage_conversationId_idx').on(table.conversationId),
        DirectMessage_senderId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('DirectMessage_senderId_idx').on(table.senderId),
        DirectMessage_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('DirectMessage_createdAt_idx').on(table.createdAt)
    }));
const notification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Notification', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('message').notNull(),
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('data'),
    read: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('read').notNull(),
    readAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('readAt', {
        withTimezone: true
    }),
    actionUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('actionUrl'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        Notification_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Notification_userId_idx').on(table.userId),
        Notification_read_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Notification_read_idx').on(table.read),
        Notification_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Notification_createdAt_idx').on(table.createdAt),
        Notification_type_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Notification_type_idx').on(table.type),
        idx_notification_user_read_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_notification_user_read_created').on(table.userId, table.read, table.createdAt),
        idx_notification_user_type_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_notification_user_type_created').on(table.userId, table.type, table.createdAt)
    }));
const notificationPreference = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('NotificationPreference', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull().unique(),
    emailEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('emailEnabled').notNull(),
    pushEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('pushEnabled').notNull(),
    inAppEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('inAppEnabled').notNull(),
    channelOverrides: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('channelOverrides').notNull(),
    quietHoursStart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('quietHoursStart'),
    quietHoursEnd: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('quietHoursEnd'),
    timezone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('timezone').notNull(),
    emailDigest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('emailDigest').notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
});
const aIAssistantSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AIAssistantSession', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    context: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('context'),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        AIAssistantSession_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIAssistantSession_tutorId_idx').on(table.tutorId),
        AIAssistantSession_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIAssistantSession_status_idx').on(table.status),
        AIAssistantSession_updatedAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIAssistantSession_updatedAt_idx').on(table.updatedAt)
    }));
const aIAssistantMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AIAssistantMessage', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('role').notNull(),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('content').notNull(),
    metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('metadata'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        AIAssistantMessage_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIAssistantMessage_sessionId_idx').on(table.sessionId),
        AIAssistantMessage_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIAssistantMessage_createdAt_idx').on(table.createdAt)
    }));
const aIAssistantInsight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AIAssistantInsight', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('content').notNull(),
    relatedData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('relatedData'),
    applied: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('applied').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        AIAssistantInsight_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIAssistantInsight_sessionId_idx').on(table.sessionId),
        AIAssistantInsight_type_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIAssistantInsight_type_idx').on(table.type),
        AIAssistantInsight_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AIAssistantInsight_createdAt_idx').on(table.createdAt)
    }));
const clinic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Clinic', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    subject: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subject').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startTime', {
        withTimezone: true
    }).notNull(),
    duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('duration').notNull(),
    maxStudents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxStudents').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    roomUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roomUrl'),
    roomId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roomId'),
    requiresPayment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('requiresPayment').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        Clinic_startTime_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Clinic_startTime_idx').on(table.startTime),
        Clinic_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Clinic_status_idx').on(table.status)
    }));
const clinicBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ClinicBooking', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    clinicId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('clinicId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    bookedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('bookedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    attended: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('attended').notNull(),
    requiresPayment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('requiresPayment').notNull()
}, (table)=>({
        ClinicBooking_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ClinicBooking_studentId_idx').on(table.studentId),
        ClinicBooking_clinicId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('ClinicBooking_clinicId_studentId_key').on(table.clinicId, table.studentId)
    }));
const payment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Payment', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    bookingId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('bookingId').unique(),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('amount').notNull(),
    currency: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('currency').notNull(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["paymentStatusEnum"]('status').notNull(),
    gateway: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["paymentGatewayEnum"]('gateway').notNull(),
    gatewayPaymentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('gatewayPaymentId'),
    gatewayCheckoutUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('gatewayCheckoutUrl'),
    paidAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('paidAt', {
        withTimezone: true
    }),
    refundedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('refundedAt', {
        withTimezone: true
    }),
    metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('metadata'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    enrollmentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('enrollmentId'),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId')
}, (table)=>({
        Payment_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Payment_status_idx').on(table.status),
        Payment_gateway_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Payment_gateway_idx').on(table.gateway),
        Payment_gatewayPaymentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Payment_gatewayPaymentId_idx').on(table.gatewayPaymentId),
        Payment_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Payment_tutorId_idx').on(table.tutorId),
        idx_payment_tutor_status_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_payment_tutor_status_created').on(table.tutorId, table.status, table.createdAt),
        idx_payment_enrollment_status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_payment_enrollment_status').on(table.enrollmentId, table.status)
    }));
const refund = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Refund', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    paymentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('paymentId').notNull(),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('amount').notNull(),
    reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('reason'),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["refundStatusEnum"]('status').notNull(),
    gatewayRefundId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('gatewayRefundId'),
    processedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('processedAt', {
        withTimezone: true
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        Refund_paymentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Refund_paymentId_idx').on(table.paymentId)
    }));
const webhookEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('WebhookEvent', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    paymentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('paymentId'),
    gateway: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["paymentGatewayEnum"]('gateway').notNull(),
    eventType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('eventType').notNull(),
    payload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('payload').notNull(),
    processed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('processed').notNull(),
    processedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('processedAt', {
        withTimezone: true
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        WebhookEvent_gateway_eventType_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WebhookEvent_gateway_eventType_idx').on(table.gateway, table.eventType),
        WebhookEvent_processed_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WebhookEvent_processed_idx').on(table.processed)
    }));
const payout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Payout', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('amount').notNull(),
    currency: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('currency').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    method: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('method').notNull(),
    details: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('details'),
    notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('notes'),
    requestedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('requestedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    processedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('processedAt', {
        withTimezone: true
    }),
    completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('completedAt', {
        withTimezone: true
    }),
    transactionReference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('transactionReference')
}, (table)=>({
        Payout_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Payout_tutorId_idx').on(table.tutorId),
        Payout_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Payout_status_idx').on(table.status),
        Payout_requestedAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Payout_requestedAt_idx').on(table.requestedAt)
    }));
const paymentOnPayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('PaymentOnPayout', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    paymentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('paymentId').notNull(),
    payoutId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('payoutId').notNull(),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('amount').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        PaymentOnPayout_payoutId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PaymentOnPayout_payoutId_idx').on(table.payoutId),
        PaymentOnPayout_paymentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PaymentOnPayout_paymentId_idx').on(table.paymentId),
        PaymentOnPayout_paymentId_payoutId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('PaymentOnPayout_paymentId_payoutId_key').on(table.paymentId, table.payoutId)
    }));
const platformRevenue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('PlatformRevenue', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    paymentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('paymentId').notNull(),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('amount').notNull(),
    month: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('month').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        PlatformRevenue_paymentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PlatformRevenue_paymentId_idx').on(table.paymentId),
        PlatformRevenue_month_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PlatformRevenue_month_idx').on(table.month),
        PlatformRevenue_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PlatformRevenue_createdAt_idx').on(table.createdAt)
    }));
const studyGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('StudyGroup', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    subject: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subject').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    maxMembers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxMembers').notNull(),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('createdBy').notNull(),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        StudyGroup_subject_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('StudyGroup_subject_idx').on(table.subject),
        StudyGroup_isActive_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('StudyGroup_isActive_idx').on(table.isActive)
    }));
const studyGroupMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('StudyGroupMember', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    groupId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('groupId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    joinedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('joinedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('role').notNull()
}, (table)=>({
        StudyGroupMember_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('StudyGroupMember_studentId_idx').on(table.studentId),
        StudyGroupMember_groupId_studentId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('StudyGroupMember_groupId_studentId_key').on(table.groupId, table.studentId)
    }));
const userActivityLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('UserActivityLog', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('action').notNull(),
    metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('metadata'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        UserActivityLog_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('UserActivityLog_userId_idx').on(table.userId),
        UserActivityLog_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('UserActivityLog_createdAt_idx').on(table.createdAt),
        idx_user_activity_user_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_user_activity_user_created').on(table.userId, table.createdAt)
    }));
const apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ApiKey', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    keyHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('keyHash').notNull(),
    createdById: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('createdById'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    lastUsedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastUsedAt', {
        withTimezone: true
    })
}, (table)=>({
        ApiKey_keyHash_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ApiKey_keyHash_idx').on(table.keyHash)
    }));
const securityEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('SecurityEvent', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    eventType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('eventType').notNull(),
    ip: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('ip'),
    metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('metadata'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('action'),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId'),
    actorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('actorId'),
    targetType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('targetType'),
    targetId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('targetId'),
    severity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('severity'),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    originIp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('originIp'),
    userAgent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userAgent'),
    countryCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('countryCode'),
    region: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('region'),
    city: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('city'),
    deviceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('deviceId'),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId'),
    correlationId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('correlationId'),
    occurredAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('occurredAt', {
        withTimezone: true
    })
}, (table)=>({
        SecurityEvent_eventType_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SecurityEvent_eventType_idx').on(table.eventType),
        SecurityEvent_action_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SecurityEvent_action_idx').on(table.action),
        SecurityEvent_severity_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SecurityEvent_severity_idx').on(table.severity),
        SecurityEvent_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SecurityEvent_createdAt_idx').on(table.createdAt),
        SecurityEvent_occurredAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SecurityEvent_occurredAt_idx').on(table.occurredAt),
        SecurityEvent_ip_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SecurityEvent_ip_idx').on(table.ip),
        SecurityEvent_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SecurityEvent_userId_idx').on(table.userId)
    }));
const performanceMetric = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('PerformanceMetric', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    metricValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('metric_value').notNull(),
    unit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('unit').notNull(),
    tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('tags'),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId'),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId'),
    timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('timestamp', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        PerformanceMetric_name_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PerformanceMetric_name_idx').on(table.name),
        PerformanceMetric_timestamp_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PerformanceMetric_timestamp_idx').on(table.timestamp),
        PerformanceMetric_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PerformanceMetric_userId_idx').on(table.userId)
    }));
const performanceAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('PerformanceAlert', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    severity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('severity').notNull(),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('message').notNull(),
    metric: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('metric'),
    threshold: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('threshold'),
    currentValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('currentValue'),
    timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('timestamp', {
        withTimezone: true
    }).notNull().defaultNow(),
    resolved: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('resolved').notNull(),
    resolvedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('resolvedAt', {
        withTimezone: true
    })
}, (table)=>({
        PerformanceAlert_type_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PerformanceAlert_type_idx').on(table.type),
        PerformanceAlert_severity_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PerformanceAlert_severity_idx').on(table.severity),
        PerformanceAlert_resolved_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PerformanceAlert_resolved_idx').on(table.resolved),
        PerformanceAlert_timestamp_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('PerformanceAlert_timestamp_idx').on(table.timestamp)
    }));
const resource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Resource', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('size').notNull(),
    mimeType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('mimeType'),
    url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('url').notNull(),
    key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('key').notNull(),
    tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tags').array().notNull(),
    isPublic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isPublic').notNull(),
    downloadCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('downloadCount').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        Resource_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Resource_tutorId_idx').on(table.tutorId),
        Resource_type_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Resource_type_idx').on(table.type),
        Resource_tags_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Resource_tags_idx').on(table.tags),
        Resource_isPublic_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Resource_isPublic_idx').on(table.isPublic)
    }));
const resourceShare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ResourceShare', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    resourceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('resourceId').notNull(),
    sharedByTutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sharedByTutorId').notNull(),
    recipientId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('recipientId'),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId'),
    sharedWithAll: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('sharedWithAll').notNull(),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('message'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        ResourceShare_resourceId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ResourceShare_resourceId_idx').on(table.resourceId),
        ResourceShare_recipientId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ResourceShare_recipientId_idx').on(table.recipientId),
        ResourceShare_sharedByTutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ResourceShare_sharedByTutorId_idx').on(table.sharedByTutorId),
        ResourceShare_resourceId_recipientId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('ResourceShare_resourceId_recipientId_key').on(table.resourceId, table.recipientId),
        ResourceShare_resourceId_sharedWithAll_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('ResourceShare_resourceId_sharedWithAll_key').on(table.resourceId, table.sharedWithAll)
    }));
const libraryTask = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('LibraryTask', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    question: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('question').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('options'),
    correctAnswer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('correctAnswer'),
    explanation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('explanation'),
    difficulty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('difficulty').notNull(),
    subject: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('subject').notNull(),
    topics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('topics').notNull(),
    isFavorite: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isFavorite').notNull(),
    usageCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('usageCount').notNull(),
    lastUsedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastUsedAt', {
        withTimezone: true
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        LibraryTask_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LibraryTask_userId_idx').on(table.userId),
        LibraryTask_isFavorite_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LibraryTask_isFavorite_idx').on(table.isFavorite)
    }));
const adminRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AdminRole', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull().unique(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    permissions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('permissions').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
});
const adminAssignment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AdminAssignment', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    roleId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roleId').notNull(),
    assignedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('assignedBy'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('expiresAt', {
        withTimezone: true
    }),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull()
}, (table)=>({
        AdminAssignment_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminAssignment_userId_idx').on(table.userId),
        AdminAssignment_roleId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminAssignment_roleId_idx').on(table.roleId),
        AdminAssignment_userId_roleId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('AdminAssignment_userId_roleId_key').on(table.userId, table.roleId)
    }));
const featureFlag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('FeatureFlag', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('key').notNull().unique(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    enabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('enabled').notNull(),
    scope: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('scope').notNull(),
    targetValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('targetValue'),
    config: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('config').notNull(),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('createdBy'),
    updatedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('updatedBy'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('deletedAt', {
        withTimezone: true
    })
}, (table)=>({
        FeatureFlag_key_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FeatureFlag_key_idx').on(table.key),
        FeatureFlag_scope_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FeatureFlag_scope_idx').on(table.scope),
        FeatureFlag_enabled_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FeatureFlag_enabled_idx').on(table.enabled)
    }));
const featureFlagChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('FeatureFlagChange', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    flagId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('flagId').notNull(),
    changedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('changedBy').notNull(),
    previousValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('previousValue'),
    newValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('newValue'),
    changeReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('changeReason'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        FeatureFlagChange_flagId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FeatureFlagChange_flagId_idx').on(table.flagId),
        FeatureFlagChange_changedBy_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FeatureFlagChange_changedBy_idx').on(table.changedBy),
        FeatureFlagChange_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FeatureFlagChange_createdAt_idx').on(table.createdAt)
    }));
const llmProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('LlmProvider', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    providerType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('providerType').notNull(),
    apiKeyEncrypted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('apiKeyEncrypted'),
    baseUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('baseUrl'),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    isDefault: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isDefault').notNull(),
    priority: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('priority').notNull(),
    config: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('config').notNull(),
    rateLimits: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('rateLimits').notNull(),
    costPer1kTokens: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('costPer1kTokens'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
});
const llmModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('LlmModel', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    providerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('providerId').notNull(),
    modelId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('modelId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name'),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    maxTokens: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxTokens'),
    supportsVision: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('supportsVision').notNull(),
    supportsFunctions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('supportsFunctions').notNull(),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    config: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('config').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        LlmModel_providerId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LlmModel_providerId_idx').on(table.providerId),
        LlmModel_isActive_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LlmModel_isActive_idx').on(table.isActive),
        LlmModel_providerId_modelId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('LlmModel_providerId_modelId_key').on(table.providerId, table.modelId)
    }));
const llmRoutingRule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('LlmRoutingRule', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name'),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    priority: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('priority').notNull(),
    conditions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('conditions').notNull(),
    targetModelId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('targetModelId').notNull(),
    fallbackModelId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('fallbackModelId'),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    providerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('providerId').notNull()
}, (table)=>({
        LlmRoutingRule_targetModelId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LlmRoutingRule_targetModelId_idx').on(table.targetModelId),
        LlmRoutingRule_isActive_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LlmRoutingRule_isActive_idx').on(table.isActive),
        LlmRoutingRule_priority_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('LlmRoutingRule_priority_idx').on(table.priority)
    }));
const systemSetting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('SystemSetting', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('category').notNull(),
    key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('key').notNull(),
    settingValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('setting_value').notNull(),
    valueType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('valueType').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    isEditable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isEditable').notNull(),
    requiresRestart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('requiresRestart').notNull(),
    updatedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('updatedBy'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        SystemSetting_category_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SystemSetting_category_idx').on(table.category),
        SystemSetting_key_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('SystemSetting_key_idx').on(table.key),
        SystemSetting_category_key_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('SystemSetting_category_key_key').on(table.category, table.key)
    }));
const adminAuditLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AdminAuditLog', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    adminId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('adminId').notNull(),
    action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('action').notNull(),
    resourceType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('resourceType'),
    resourceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('resourceId'),
    previousState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('previousState'),
    newState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('newState'),
    metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('metadata'),
    ipAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('ipAddress'),
    userAgent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userAgent'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        AdminAuditLog_adminId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminAuditLog_adminId_idx').on(table.adminId),
        AdminAuditLog_action_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminAuditLog_action_idx').on(table.action),
        AdminAuditLog_resourceType_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminAuditLog_resourceType_idx').on(table.resourceType),
        AdminAuditLog_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminAuditLog_createdAt_idx').on(table.createdAt)
    }));
const adminSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('AdminSession', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    adminId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('adminId').notNull(),
    token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('token').notNull().unique(),
    ipAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('ipAddress'),
    userAgent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userAgent'),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    lastActiveAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastActiveAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('expiresAt', {
        withTimezone: true
    }).notNull(),
    isRevoked: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isRevoked').notNull()
}, (table)=>({
        AdminSession_adminId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminSession_adminId_idx').on(table.adminId),
        AdminSession_token_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminSession_token_idx').on(table.token),
        AdminSession_expiresAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('AdminSession_expiresAt_idx').on(table.expiresAt)
    }));
const ipWhitelist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('IpWhitelist', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    ipAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('ipAddress').notNull().unique(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('createdBy'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('expiresAt', {
        withTimezone: true
    })
}, (table)=>({
        IpWhitelist_ipAddress_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('IpWhitelist_ipAddress_idx').on(table.ipAddress),
        IpWhitelist_isActive_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('IpWhitelist_isActive_idx').on(table.isActive)
    }));
const calendarConnection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CalendarConnection', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    provider: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('provider').notNull(),
    providerAccountId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('providerAccountId'),
    accessToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('accessToken'),
    refreshToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('refreshToken'),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('expiresAt', {
        withTimezone: true
    }),
    syncEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('syncEnabled').notNull(),
    syncDirection: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('syncDirection').notNull(),
    lastSyncedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastSyncedAt', {
        withTimezone: true
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        CalendarConnection_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarConnection_userId_idx').on(table.userId),
        CalendarConnection_provider_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarConnection_provider_idx').on(table.provider),
        CalendarConnection_userId_provider_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('CalendarConnection_userId_provider_key').on(table.userId, table.provider)
    }));
const calendarEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CalendarEvent', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["eventTypeEnum"]('type').notNull(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["eventStatusEnum"]('status').notNull(),
    startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startTime', {
        withTimezone: true
    }).notNull(),
    endTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endTime', {
        withTimezone: true
    }).notNull(),
    timezone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('timezone').notNull(),
    isAllDay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isAllDay').notNull(),
    recurrenceRule: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('recurrenceRule'),
    recurringEventId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('recurringEventId'),
    isRecurring: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isRecurring').notNull(),
    location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('location'),
    meetingUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('meetingUrl'),
    isVirtual: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isVirtual').notNull(),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId'),
    batchId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('batchId'),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId'),
    attendees: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('attendees'),
    maxAttendees: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('maxAttendees').notNull(),
    reminders: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('reminders'),
    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('color'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('createdBy').notNull(),
    externalId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('externalId'),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('deletedAt', {
        withTimezone: true
    }),
    isCancelled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isCancelled').notNull()
}, (table)=>({
        CalendarEvent_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_tutorId_idx').on(table.tutorId),
        CalendarEvent_startTime_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_startTime_idx').on(table.startTime),
        CalendarEvent_endTime_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_endTime_idx').on(table.endTime),
        CalendarEvent_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_status_idx').on(table.status),
        CalendarEvent_type_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_type_idx').on(table.type),
        CalendarEvent_recurringEventId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_recurringEventId_idx').on(table.recurringEventId),
        CalendarEvent_tutorId_startTime_endTime_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_tutorId_startTime_endTime_idx').on(table.tutorId, table.startTime, table.endTime),
        CalendarEvent_curriculumId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_curriculumId_idx').on(table.curriculumId),
        CalendarEvent_batchId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarEvent_batchId_idx').on(table.batchId)
    }));
const calendarAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CalendarAvailability', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    dayOfWeek: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('dayOfWeek').notNull(),
    startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('startTime').notNull(),
    endTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('endTime').notNull(),
    timezone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('timezone').notNull(),
    isAvailable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isAvailable').notNull(),
    validFrom: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('validFrom', {
        withTimezone: true
    }),
    validUntil: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('validUntil', {
        withTimezone: true
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        CalendarAvailability_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarAvailability_tutorId_idx').on(table.tutorId),
        CalendarAvailability_dayOfWeek_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarAvailability_dayOfWeek_idx').on(table.dayOfWeek),
        CalendarAvailability_tutorId_dayOfWeek_startTime_endTime_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('CalendarAvailability_tutorId_dayOfWeek_startTime_endTime_key').on(table.tutorId, table.dayOfWeek, table.startTime, table.endTime)
    }));
const calendarException = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('CalendarException', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('date', {
        withTimezone: true
    }).notNull(),
    isAvailable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isAvailable').notNull(),
    startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('startTime'),
    endTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('endTime'),
    reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('reason'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        CalendarException_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarException_tutorId_idx').on(table.tutorId),
        CalendarException_date_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('CalendarException_date_idx').on(table.date),
        CalendarException_tutorId_date_startTime_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('CalendarException_tutorId_date_startTime_key').on(table.tutorId, table.date, table.startTime)
    }));
const whiteboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Whiteboard', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId'),
    roomId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roomId'),
    curriculumId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('curriculumId'),
    lessonId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('lessonId'),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    isTemplate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isTemplate').notNull(),
    isPublic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isPublic').notNull(),
    width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('width').notNull(),
    height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('height').notNull(),
    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('backgroundColor').notNull(),
    backgroundStyle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('backgroundStyle').notNull(),
    backgroundImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('backgroundImage'),
    collaborators: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('collaborators'),
    visibility: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('visibility').notNull(),
    isBroadcasting: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isBroadcasting').notNull(),
    ownerType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('ownerType').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('deletedAt', {
        withTimezone: true
    })
}, (table)=>({
        Whiteboard_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_tutorId_idx').on(table.tutorId),
        Whiteboard_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_sessionId_idx').on(table.sessionId),
        Whiteboard_roomId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_roomId_idx').on(table.roomId),
        Whiteboard_curriculumId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_curriculumId_idx').on(table.curriculumId),
        Whiteboard_lessonId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_lessonId_idx').on(table.lessonId),
        Whiteboard_isTemplate_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_isTemplate_idx').on(table.isTemplate),
        Whiteboard_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_createdAt_idx').on(table.createdAt),
        Whiteboard_visibility_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_visibility_idx').on(table.visibility),
        Whiteboard_isBroadcasting_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_isBroadcasting_idx').on(table.isBroadcasting),
        Whiteboard_sessionId_visibility_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_sessionId_visibility_idx').on(table.sessionId, table.visibility),
        Whiteboard_sessionId_ownerType_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('Whiteboard_sessionId_ownerType_idx').on(table.sessionId, table.ownerType)
    }));
const whiteboardPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('WhiteboardPage', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    whiteboardId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('whiteboardId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    order: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('order').notNull(),
    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('backgroundColor'),
    backgroundStyle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('backgroundStyle'),
    backgroundImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('backgroundImage'),
    strokes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('strokes').notNull(),
    shapes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('shapes').notNull(),
    texts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('texts').notNull(),
    images: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('images').notNull(),
    viewState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('viewState'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        WhiteboardPage_whiteboardId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WhiteboardPage_whiteboardId_idx').on(table.whiteboardId),
        WhiteboardPage_order_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WhiteboardPage_order_idx').on(table.order),
        WhiteboardPage_whiteboardId_order_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('WhiteboardPage_whiteboardId_order_key').on(table.whiteboardId, table.order)
    }));
const whiteboardSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('WhiteboardSnapshot', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    whiteboardId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('whiteboardId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    thumbnailUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('thumbnailUrl'),
    pages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('pages').notNull(),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('createdBy').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        WhiteboardSnapshot_whiteboardId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WhiteboardSnapshot_whiteboardId_idx').on(table.whiteboardId),
        WhiteboardSnapshot_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WhiteboardSnapshot_createdAt_idx').on(table.createdAt)
    }));
const whiteboardSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('WhiteboardSession', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    whiteboardId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('whiteboardId').notNull(),
    roomId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('roomId').notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    participants: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('participants').notNull(),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('startedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    endedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endedAt', {
        withTimezone: true
    }),
    operations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('operations'),
    finalPageStates: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('finalPageStates')
}, (table)=>({
        WhiteboardSession_whiteboardId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WhiteboardSession_whiteboardId_idx').on(table.whiteboardId),
        WhiteboardSession_roomId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WhiteboardSession_roomId_idx').on(table.roomId),
        WhiteboardSession_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WhiteboardSession_tutorId_idx').on(table.tutorId),
        WhiteboardSession_isActive_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('WhiteboardSession_isActive_idx').on(table.isActive)
    }));
const mathWhiteboardSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('MathWhiteboardSession', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    liveSessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('liveSessionId').notNull(),
    tutorId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('tutorId').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathSessionStatusEnum"]('status').notNull(),
    isLocked: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isLocked').notNull(),
    allowStudentEdit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('allowStudentEdit').notNull(),
    allowStudentTools: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('allowStudentTools').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    endedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('endedAt', {
        withTimezone: true
    })
}, (table)=>({
        MathWhiteboardSession_liveSessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardSession_liveSessionId_idx').on(table.liveSessionId),
        MathWhiteboardSession_tutorId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardSession_tutorId_idx').on(table.tutorId),
        MathWhiteboardSession_status_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardSession_status_idx').on(table.status),
        MathWhiteboardSession_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardSession_createdAt_idx').on(table.createdAt)
    }));
const mathWhiteboardPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('MathWhiteboardPage', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    order: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('order').notNull(),
    width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('width').notNull(),
    height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('height').notNull(),
    backgroundType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('backgroundType').notNull(),
    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('backgroundColor').notNull(),
    elements: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('elements').notNull(),
    vectorClock: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('vectorClock').notNull(),
    lastModified: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('lastModified', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    modifiedBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('modifiedBy'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        MathWhiteboardPage_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardPage_sessionId_idx').on(table.sessionId),
        MathWhiteboardPage_order_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardPage_order_idx').on(table.order),
        MathWhiteboardPage_sessionId_order_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('MathWhiteboardPage_sessionId_order_key').on(table.sessionId, table.order)
    }));
const mathWhiteboardParticipant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('MathWhiteboardParticipant', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["roleEnum"]('role').notNull(),
    canEdit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('canEdit').notNull(),
    canChat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('canChat').notNull(),
    canUseAI: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('canUseAI').notNull(),
    cursorX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('cursorX'),
    cursorY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('cursorY'),
    cursorColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('cursorColor').notNull(),
    isTyping: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isTyping').notNull(),
    joinedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('joinedAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    leftAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('leftAt', {
        withTimezone: true
    })
}, (table)=>({
        MathWhiteboardParticipant_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardParticipant_sessionId_idx').on(table.sessionId),
        MathWhiteboardParticipant_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardParticipant_userId_idx').on(table.userId),
        MathWhiteboardParticipant_sessionId_userId_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('MathWhiteboardParticipant_sessionId_userId_key').on(table.sessionId, table.userId)
    }));
const mathWhiteboardSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('MathWhiteboardSnapshot', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('description'),
    thumbnailUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('thumbnailUrl'),
    pages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('pages').notNull(),
    viewState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('viewState'),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('createdBy').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        MathWhiteboardSnapshot_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardSnapshot_sessionId_idx').on(table.sessionId),
        MathWhiteboardSnapshot_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathWhiteboardSnapshot_createdAt_idx').on(table.createdAt)
    }));
const mathAIInteraction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('MathAIInteraction', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionId').notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathAIInteractionTypeEnum"]('type').notNull(),
    inputText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('inputText'),
    inputLatex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('inputLatex'),
    inputImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('inputImage'),
    output: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('output').notNull(),
    outputLatex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('outputLatex'),
    modelUsed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('modelUsed').notNull(),
    latencyMs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('latencyMs').notNull(),
    tokensUsed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('tokensUsed'),
    steps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('steps'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        MathAIInteraction_sessionId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathAIInteraction_sessionId_idx').on(table.sessionId),
        MathAIInteraction_type_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathAIInteraction_type_idx').on(table.type),
        MathAIInteraction_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('MathAIInteraction_createdAt_idx').on(table.createdAt)
    }));
const familyAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('FamilyAccount', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    familyName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('familyName').notNull(),
    familyType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('familyType').notNull(),
    primaryEmail: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('primaryEmail').notNull().unique(),
    phoneNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('phoneNumber'),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('address'),
    country: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('country'),
    timezone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('timezone'),
    defaultCurrency: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('defaultCurrency').notNull(),
    monthlyBudget: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('monthlyBudget').notNull(),
    enableBudget: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('enableBudget').notNull(),
    allowAdults: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('allowAdults').notNull(),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    isVerified: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isVerified').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date()),
    verifiedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('verifiedAt', {
        withTimezone: true
    })
}, (table)=>({
        FamilyAccount_isActive_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FamilyAccount_isActive_idx').on(table.isActive),
        FamilyAccount_isVerified_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FamilyAccount_isVerified_idx').on(table.isVerified),
        FamilyAccount_createdAt_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FamilyAccount_createdAt_idx').on(table.createdAt),
        idx_family_account_status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_account_status').on(table.isActive, table.isVerified),
        idx_family_account_active_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_account_active_created').on(table.isActive, table.createdAt),
        idx_family_account_type_status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_account_type_status').on(table.familyType, table.isActive)
    }));
const familyMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('FamilyMember', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    familyAccountId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('familyAccountId').notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId'),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    relation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('relation').notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('email'),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('phone'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        FamilyMember_familyAccountId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FamilyMember_familyAccountId_idx').on(table.familyAccountId),
        FamilyMember_userId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FamilyMember_userId_idx').on(table.userId),
        idx_family_member_account_user: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_member_account_user').on(table.familyAccountId, table.userId),
        idx_family_member_user_relation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_member_user_relation').on(table.userId, table.relation)
    }));
const familyBudget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('FamilyBudget', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull(),
    month: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('month').notNull(),
    year: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["integer"])('year').notNull(),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('amount').notNull(),
    spent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('spent').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        FamilyBudget_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FamilyBudget_parentId_idx').on(table.parentId),
        idx_family_budget_parent_period: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_budget_parent_period').on(table.parentId, table.year, table.month),
        FamilyBudget_parentId_month_year_key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["uniqueIndex"])('FamilyBudget_parentId_month_year_key').on(table.parentId, table.month, table.year)
    }));
const familyPayment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('FamilyPayment', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull(),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('amount').notNull(),
    method: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('method').notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('status').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        FamilyPayment_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FamilyPayment_parentId_idx').on(table.parentId),
        idx_family_payment_parent_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_payment_parent_created').on(table.parentId, table.createdAt),
        idx_family_payment_parent_status_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_payment_parent_status_created').on(table.parentId, table.status, table.createdAt)
    }));
const budgetAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('BudgetAlert', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('type').notNull(),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('message').notNull(),
    isRead: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isRead').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        BudgetAlert_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('BudgetAlert_parentId_idx').on(table.parentId)
    }));
const parentActivityLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ParentActivityLog', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull(),
    action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('action').notNull(),
    details: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('details'),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        ParentActivityLog_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ParentActivityLog_parentId_idx').on(table.parentId),
        idx_parent_activity_parent_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_parent_activity_parent_created').on(table.parentId, table.createdAt)
    }));
const familyNotification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('FamilyNotification', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('title').notNull(),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('message').notNull(),
    isRead: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isRead').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        FamilyNotification_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('FamilyNotification_parentId_idx').on(table.parentId),
        idx_family_notification_parent_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_notification_parent_created').on(table.parentId, table.createdAt),
        idx_family_notification_parent_read_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_family_notification_parent_read_created').on(table.parentId, table.isRead, table.createdAt)
    }));
const emergencyContact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('EmergencyContact', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('name').notNull(),
    relation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('relation').notNull(),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('phone').notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('email'),
    isPrimary: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isPrimary').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        EmergencyContact_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('EmergencyContact_parentId_idx').on(table.parentId),
        idx_emergency_contact_parent_primary: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_emergency_contact_parent_primary').on(table.parentId, table.isPrimary),
        idx_emergency_contact_parent_primary_created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_emergency_contact_parent_primary_created').on(table.parentId, table.isPrimary, table.createdAt)
    }));
const studentProgressSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('StudentProgressSnapshot', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull(),
    studentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('studentId').notNull(),
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["jsonb"])('data').notNull(),
    capturedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('capturedAt', {
        withTimezone: true
    }).notNull().defaultNow()
}, (table)=>({
        StudentProgressSnapshot_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('StudentProgressSnapshot_parentId_idx').on(table.parentId),
        StudentProgressSnapshot_studentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('StudentProgressSnapshot_studentId_idx').on(table.studentId),
        idx_student_progress_parent_captured: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_student_progress_parent_captured').on(table.parentId, table.capturedAt),
        idx_student_progress_student_captured: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('idx_student_progress_student_captured').on(table.studentId, table.capturedAt)
    }));
const parentPaymentAuthorization = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ParentPaymentAuthorization', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull().unique(),
    level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('level').notNull(),
    maxAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('maxAmount'),
    methods: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('methods').array().notNull(),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        ParentPaymentAuthorization_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ParentPaymentAuthorization_parentId_idx').on(table.parentId)
    }));
const parentSpendingLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('ParentSpendingLimit', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey().notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('parentId').notNull(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('category').notNull(),
    limit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$double$2d$precision$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["doublePrecision"])('limit').notNull(),
    period: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('period').notNull(),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["boolean"])('isActive').notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('createdAt', {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('updatedAt', {
        withTimezone: true
    }).notNull().$onUpdate(()=>new Date())
}, (table)=>({
        ParentSpendingLimit_parentId_idx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["index"])('ParentSpendingLimit_parentId_idx').on(table.parentId)
    }));
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/next-auth.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "session",
    ()=>session,
    "verificationToken",
    ()=>verificationToken
]);
/**
 * NextAuth.js tables for Drizzle adapter.
 * Session and VerificationToken are optional (database session / magic link).
 * Our User and Account are in tables.ts (table names "User", "Account").
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/table.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/text.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/timestamp.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$primary$2d$keys$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/primary-keys.js [instrumentation-edge] (ecmascript)");
;
const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('Session', {
    sessionToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('sessionToken').primaryKey(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('userId').notNull(),
    expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('expires', {
        withTimezone: true
    }).notNull()
});
const verificationToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('VerificationToken', {
    identifier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('identifier').notNull(),
    token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('token').notNull(),
    expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('expires', {
        withTimezone: true
    }).notNull()
}, (table)=>({
        compositePk: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$primary$2d$keys$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["primaryKey"])({
            columns: [
                table.identifier,
                table.token
            ]
        })
    }));
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/index.ts [instrumentation-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
/**
 * Drizzle schema - re-exports enums, tables, and NextAuth tables.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/enums.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/tables.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$next$2d$auth$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/next-auth.ts [instrumentation-edge] (ecmascript)");
;
;
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/index.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aIAssistantInsight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["aIAssistantInsight"],
    "aIAssistantMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["aIAssistantMessage"],
    "aIAssistantSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["aIAssistantSession"],
    "aIInteractionSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["aIInteractionSession"],
    "aITutorDailyUsage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["aITutorDailyUsage"],
    "aITutorEnrollment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["aITutorEnrollment"],
    "aITutorSubscription",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["aITutorSubscription"],
    "account",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["account"],
    "achievement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["achievement"],
    "adminAssignment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["adminAssignment"],
    "adminAuditLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["adminAuditLog"],
    "adminRole",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["adminRole"],
    "adminSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["adminSession"],
    "apiKey",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["apiKey"],
    "badge",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["badge"],
    "bookmark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["bookmark"],
    "breakoutRoom",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["breakoutRoom"],
    "breakoutRoomAssignment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["breakoutRoomAssignment"],
    "breakoutSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["breakoutSession"],
    "budgetAlert",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["budgetAlert"],
    "calendarAvailability",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["calendarAvailability"],
    "calendarConnection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["calendarConnection"],
    "calendarEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["calendarEvent"],
    "calendarException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["calendarException"],
    "clinic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["clinic"],
    "clinicBooking",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["clinicBooking"],
    "contentItem",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["contentItem"],
    "contentProgress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["contentProgress"],
    "contentQuizCheckpoint",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["contentQuizCheckpoint"],
    "conversation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["conversation"],
    "courseBatch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["courseBatch"],
    "curriculum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["curriculum"],
    "curriculumCatalog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["curriculumCatalog"],
    "curriculumEnrollment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["curriculumEnrollment"],
    "curriculumLesson",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["curriculumLesson"],
    "curriculumLessonProgress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["curriculumLessonProgress"],
    "curriculumModule",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["curriculumModule"],
    "curriculumProgress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["curriculumProgress"],
    "curriculumShare",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["curriculumShare"],
    "directMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["directMessage"],
    "emergencyContact",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["emergencyContact"],
    "eventStatusEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["eventStatusEnum"],
    "eventTypeEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["eventTypeEnum"],
    "familyAccount",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["familyAccount"],
    "familyBudget",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["familyBudget"],
    "familyMember",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["familyMember"],
    "familyNotification",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["familyNotification"],
    "familyPayment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["familyPayment"],
    "featureFlag",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["featureFlag"],
    "featureFlagChange",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["featureFlagChange"],
    "feedbackWorkflow",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["feedbackWorkflow"],
    "generatedTask",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["generatedTask"],
    "ipWhitelist",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ipWhitelist"],
    "leaderboardEntry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["leaderboardEntry"],
    "lessonSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["lessonSession"],
    "libraryTask",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["libraryTask"],
    "liveSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["liveSession"],
    "llmModel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["llmModel"],
    "llmProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["llmProvider"],
    "llmRoutingRule",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["llmRoutingRule"],
    "mathAIInteraction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathAIInteraction"],
    "mathAIInteractionTypeEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathAIInteractionTypeEnum"],
    "mathSessionStatusEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathSessionStatusEnum"],
    "mathWhiteboardPage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathWhiteboardPage"],
    "mathWhiteboardParticipant",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathWhiteboardParticipant"],
    "mathWhiteboardSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathWhiteboardSession"],
    "mathWhiteboardSnapshot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mathWhiteboardSnapshot"],
    "message",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["message"],
    "messageSourceEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["messageSourceEnum"],
    "mission",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["mission"],
    "missionProgress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["missionProgress"],
    "note",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["note"],
    "notification",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["notification"],
    "notificationPreference",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["notificationPreference"],
    "parentActivityLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["parentActivityLog"],
    "parentPaymentAuthorization",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["parentPaymentAuthorization"],
    "parentSpendingLimit",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["parentSpendingLimit"],
    "payment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["payment"],
    "paymentGatewayEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["paymentGatewayEnum"],
    "paymentOnPayout",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["paymentOnPayout"],
    "paymentStatusEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["paymentStatusEnum"],
    "payout",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["payout"],
    "performanceAlert",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["performanceAlert"],
    "performanceMetric",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["performanceMetric"],
    "platformRevenue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["platformRevenue"],
    "poll",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["poll"],
    "pollOption",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pollOption"],
    "pollResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pollResponse"],
    "pollStatusEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pollStatusEnum"],
    "pollTypeEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pollTypeEnum"],
    "profile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["profile"],
    "questionBankItem",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["questionBankItem"],
    "quiz",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["quiz"],
    "quizAssignment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["quizAssignment"],
    "quizAttempt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["quizAttempt"],
    "refund",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["refund"],
    "refundStatusEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["refundStatusEnum"],
    "resource",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["resource"],
    "resourceShare",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["resourceShare"],
    "reviewSchedule",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reviewSchedule"],
    "roleEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["roleEnum"],
    "securityEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["securityEvent"],
    "session",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$next$2d$auth$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["session"],
    "sessionParticipant",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["sessionParticipant"],
    "sessionReplayArtifact",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["sessionReplayArtifact"],
    "sessionTypeEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["sessionTypeEnum"],
    "studentPerformance",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["studentPerformance"],
    "studentProgressSnapshot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["studentProgressSnapshot"],
    "studyGroup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["studyGroup"],
    "studyGroupMember",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["studyGroupMember"],
    "systemSetting",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["systemSetting"],
    "taskSubmission",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["taskSubmission"],
    "tierEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["tierEnum"],
    "user",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["user"],
    "userActivityLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["userActivityLog"],
    "userBadge",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["userBadge"],
    "userDailyQuest",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["userDailyQuest"],
    "userGamification",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["userGamification"],
    "verificationToken",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$next$2d$auth$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["verificationToken"],
    "videoWatchEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["videoWatchEvent"],
    "webhookEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["webhookEvent"],
    "whiteboard",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["whiteboard"],
    "whiteboardPage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["whiteboardPage"],
    "whiteboardSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["whiteboardSession"],
    "whiteboardSnapshot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["whiteboardSnapshot"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/index.ts [instrumentation-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$enums$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/enums.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/tables.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$next$2d$auth$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/next-auth.ts [instrumentation-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/drizzle.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drizzleDb",
    ()=>drizzleDb
]);
/**
 * Drizzle ORM client (Phase 1).
 * Use this for new code; existing app still uses Prisma via db from index.ts until Phase 3–4.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/node-postgres/driver.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$esm$2f$index$2e$mjs__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/esm/index.mjs [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/index.ts [instrumentation-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/index.ts [instrumentation-edge] (ecmascript)");
;
;
;
const connectionString = process.env.DATABASE_POOL_URL || process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('Missing database URL. Set DATABASE_URL, DIRECT_URL, or DATABASE_POOL_URL in .env or .env.local');
}
// Singleton pool for server (avoid many connections in dev)
const globalForDrizzle = globalThis;
const pool = globalForDrizzle.drizzlePool ?? new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$esm$2f$index$2e$mjs__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["Pool"]({
    connectionString,
    max: 50,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForDrizzle.drizzlePool = pool;
}
const drizzleDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["drizzle"])(pool, {
    schema: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/notifications/notify.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSSEListener",
    ()=>addSSEListener,
    "notify",
    ()=>notify,
    "notifyMany",
    ()=>notifyMany
]);
/**
 * Central Notification Service (Drizzle ORM)
 *
 * Handles in-app (DB), email (Resend), and real-time push (SSE).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$instrumentation$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [instrumentation-edge] (unsupported edge import 'crypto', ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/sql/expressions/conditions.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/drizzle.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/index.ts [instrumentation-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/tables.ts [instrumentation-edge] (ecmascript)");
;
;
;
;
const sseListeners = new Map();
function addSSEListener(userId, cb) {
    if (!sseListeners.has(userId)) sseListeners.set(userId, new Set());
    sseListeners.get(userId).add(cb);
    return ()=>{
        sseListeners.get(userId)?.delete(cb);
        if (sseListeners.get(userId)?.size === 0) sseListeners.delete(userId);
    };
}
function broadcastToUser(userId, notification) {
    const listeners = sseListeners.get(userId);
    if (listeners) {
        for (const cb of listeners){
            try {
                cb(notification);
            } catch  {
            /* ignore */ }
        }
    }
}
async function getChannelDecision(userId, type, force) {
    if (force) return {
        inApp: true,
        email: true,
        push: true
    };
    const [prefs] = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["drizzleDb"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["notificationPreference"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["notificationPreference"].userId, userId)).limit(1);
    if (!prefs) return {
        inApp: true,
        email: true,
        push: true
    };
    let decision = {
        inApp: prefs.inAppEnabled,
        email: prefs.emailEnabled,
        push: prefs.pushEnabled
    };
    const overrides = prefs.channelOverrides;
    if (overrides?.[type]) {
        const o = overrides[type];
        if (typeof o.inApp === 'boolean') decision.inApp = o.inApp;
        if (typeof o.email === 'boolean') decision.email = o.email;
        if (typeof o.push === 'boolean') decision.push = o.push;
    }
    if (prefs.quietHoursStart && prefs.quietHoursEnd) {
        const isQuiet = isInQuietHours(prefs.quietHoursStart, prefs.quietHoursEnd, prefs.timezone);
        if (isQuiet) decision.push = false;
    }
    if (prefs.emailDigest !== 'instant') {
        decision.email = false;
    }
    return decision;
}
function isInQuietHours(start, end, timezone) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        const currentTime = formatter.format(now);
        if (start <= end) return currentTime >= start && currentTime <= end;
        return currentTime >= start || currentTime <= end;
    } catch  {
        return false;
    }
}
async function sendNotificationEmail(userId, type, title, message, actionUrl) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.log(`[notify-email] (no RESEND_API_KEY) Would email user ${userId}: ${title}`);
        return;
    }
    const [u] = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["drizzleDb"].select({
        email: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["user"].email
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["user"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["user"].id, userId)).limit(1);
    if (!u?.email) return;
    const from = process.env.NOTIFICATION_EMAIL_FROM || 'TutorMe <notifications@tutorme.com>';
    const appUrl = ("TURBOPACK compile-time value", "http://localhost:3003") || 'http://localhost:3000';
    const actionButton = actionUrl ? `<p style="margin-top:16px"><a href="${appUrl}${actionUrl}" style="background:#3b82f6;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block">View Details</a></p>` : '';
    const html = `
    <div style="max-width:480px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
      <div style="padding:24px;background:#f8fafc;border-radius:12px">
        <h2 style="margin:0 0 8px;color:#1e293b;font-size:18px">${title}</h2>
        <p style="margin:0;color:#475569;font-size:14px;line-height:1.6">${message}</p>
        ${actionButton}
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px">
        You can <a href="${appUrl}/student/settings" style="color:#3b82f6">manage your notification preferences</a>.
      </p>
    </div>
  `;
    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                from,
                to: u.email,
                subject: `${title} – TutorMe`,
                html
            })
        });
        if (!res.ok) {
            const err = await res.text();
            console.error(`[notify-email] Resend failed:`, res.status, err);
        }
    } catch (e) {
        console.error(`[notify-email] Send failed:`, e);
    }
}
async function notify(params) {
    const { userId, type, title, message, data, actionUrl, force = false } = params;
    const channels = await getChannelDecision(userId, type, force);
    let inAppRecord = null;
    if (channels.inApp) {
        const [row] = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["drizzleDb"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$schema$2f$tables$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["notification"]).values({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$instrumentation$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["default"].randomUUID(),
            userId,
            type,
            title,
            message,
            data: data ?? undefined,
            actionUrl: actionUrl ?? null,
            read: false
        }).returning();
        inAppRecord = row ?? null;
    }
    if (channels.push) {
        broadcastToUser(userId, inAppRecord ?? {
            type,
            title,
            message,
            actionUrl,
            createdAt: new Date()
        });
    }
    if (channels.email) {
        sendNotificationEmail(userId, type, title, message, actionUrl).catch((e)=>console.error('[notify] Email send error:', e));
    }
    return inAppRecord;
}
async function notifyMany(params) {
    const { userIds, type, title, message, data, actionUrl, force = false } = params;
    const results = await Promise.allSettled(userIds.map((userId)=>notify({
            userId,
            type,
            title,
            message,
            data,
            actionUrl,
            force
        })));
    const succeeded = results.filter((r)=>r.status === 'fulfilled').length;
    const failed = results.filter((r)=>r.status === 'rejected').length;
    return {
        sent: succeeded,
        failed,
        total: userIds.length
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [instrumentation-edge] (ecmascript) <locals>");
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
            await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].$transaction(metrics.map((metric)=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.create({
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
            const performanceAlertModel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"]?.performanceAlert;
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
            const { notifyMany } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/notifications/notify.ts [instrumentation-edge] (ecmascript)"));
            // Get admin user IDs (simplified - would need proper admin lookup)
            const admins = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].user.findMany({
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
            const performanceAlertModel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"]?.performanceAlert;
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
            const avg = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.aggregate({
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
        const metrics = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].performanceMetric.findMany({
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [instrumentation-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/edge/index.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring.ts [instrumentation-edge] (ecmascript)");
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
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__.captureException(error, {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reportError"])(error, context);
        } catch  {
        /* ignore */ }
    },
    handleWarning (warning, context) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__.captureMessage(warning, 'warning', {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
    },
    addBreadcrumb (breadcrumb) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: breadcrumb.category ?? 'default',
            message: breadcrumb.message,
            data: breadcrumb.data,
            timestamp: Date.now() / 1000
        });
    }
};
function captureMetric(name, value, unit) {
    try {
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__.metrics;
        if (unit === 'count' && typeof m?.count === 'function') m.count(name, value);
        else if (typeof m?.distribution === 'function') m.distribution(name, value, {
            unit: 'millisecond'
        });
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    } catch  {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    }
}
const globalPerformanceMonitor = {
    trackApiEndpoint (endpoint, responseTime, errorCount) {
        captureMetric('api_response_time', responseTime, 'ms');
        if (errorCount > 0) captureMetric('api_error_count', errorCount, 'count');
    },
    trackInteraction (type, element, value) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: 'interaction',
            message: `${type} on ${element}`,
            data: value,
            timestamp: Date.now() / 1000
        });
    },
    trackCacheHit (cacheKey, hit) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reportMetric"])('cache_hit_rate', hit ? 1 : 0, 'count', {
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/sentry.edge.config.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/edge/index.js [instrumentation-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [instrumentation-edge] (ecmascript) <locals>");
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"]({
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSentryInitOptions"])(),
    tracesSampleRate: 0.1
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/instrumentation.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "onRequestError",
    ()=>onRequestError,
    "register",
    ()=>register
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$captureRequestError$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/common/captureRequestError.js [instrumentation-edge] (ecmascript)");
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@aws-sdk/client-s3": "^3.994.0",
    "@aws-sdk/s3-request-presigner": "^3.994.0",
    "@daily-co/daily-js": "^0.87.0",
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@next-auth/prisma-adapter": "^1.0.7",
    "@prisma/client": "^5.22.0",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.5.0",
    "@sentry/nextjs": "^10.39.0",
    "@tanstack/react-query": "^5.90.21",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/three": "^0.182.0",
    "@types/ws": "^8.18.1",
    "bcryptjs": "^3.0.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "drizzle-orm": "^0.38.0",
    "fabric": "^7.2.0",
    "framer-motion": "^12.34.0",
    "immer": "^11.1.4",
    "ioredis": "^5.9.2",
    "jose": "^6.1.3",
    "jsonwebtoken": "^9.0.3",
    "jspdf": "^4.2.0",
    "jspdf-autotable": "^5.0.7",
    "lucide-react": "^0.563.0",
    "mammoth": "^1.11.0",
    "mathjax": "^4.1.1",
    "nanoid": "^5.1.6",
    "next": "^16.1.6",
    "next-auth": "^4.24.13",
    "next-intl": "^4.8.3",
    "ollama": "^0.6.3",
    "openai": "^6.19.0",
    "pg": "^8.13.0",
    "pdf-lib": "^1.17.1",
    "pdf-parse": "^2.4.5",
    "pdfjs-dist": "^4.2.67",
    "plotly.js-dist": "^3.4.0",
    "prisma": "^5.22.0",
    "react": "^18",
    "react-day-picker": "^9.13.2",
    "react-dom": "^18",
    "react-resizable-panels": "^4.6.4",
    "recharts": "^3.7.0",
    "redis": "^5.11.0",
    "server-only": "^0.0.1",
    "socket.io": "^4.8.3",
    "socket.io-client": "^4.8.3",
    "sonner": "^2.0.7",
    "swagger-ui-react": "^5.31.2",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "tesseract.js": "^7.0.0",
    "three": "^0.182.0",
    "tldraw": "^4.4.0",
    "unpdf": "^1.4.0",
    "xlsx": "^0.18.5",
    "y-websocket": "^3.0.0",
    "yjs": "^13.6.29",
    "zod": "^4.3.6",
    "zustand": "^5.0.11",
    "@axe-core/playwright": "^4.11.1",
    "@playwright/test": "^1.49.0",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20.19.33",
    "@types/pg": "^8.11.0",
    "drizzle-kit": "^0.30.0",
    "@types/react": "^18.3.28",
    "@types/react-dom": "^18.3.7",
    "@types/swagger-ui-react": "^5.18.0",
    "dotenv": "^17.3.1",
    "eslint": "^9",
    "eslint-config-next": "^16.1.6",
    "eslint-config-prettier": "^10",
    "jsdom": "^25.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3",
    "vitest": "^2.1.8"
};
globalThis["_sentryNextJsVersion"] = "16.1.6";
;
async function register() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if ("TURBOPACK compile-time truthy", 1) {
        await Promise.resolve().then(()=>__turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/sentry.edge.config.ts [instrumentation-edge] (ecmascript)"));
    }
}
const onRequestError = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$captureRequestError$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureRequestError"];
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__dd0fdde8._.js.map