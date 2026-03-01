;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="36ccf36e-bda8-9351-9f26-891c41270657")}catch(e){}}();
module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * NextAuth Configuration
 * Handles authentication for students, tutors, and admins
 */ __turbopack_context__.s([
    "authOptions",
    ()=>authOptions,
    "hashPassword",
    ()=>hashPassword,
    "isAuthorized",
    ()=>isAuthorized
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$next$2d$auth$2f$prisma$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@next-auth/prisma-adapter/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
;
;
const authOptions = {
    adapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$next$2d$auth$2f$prisma$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"]),
    providers: [
        // Email/Password Login
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const normalizedEmail = credentials.email.trim().toLowerCase();
                // Find user by email
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].user.findFirst({
                    where: {
                        email: {
                            equals: normalizedEmail,
                            mode: 'insensitive'
                        }
                    },
                    include: {
                        profile: true
                    }
                });
                if (!user || !user.password) {
                    return null;
                }
                // Verify password
                const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.password);
                if (!isValid) {
                    const { logFailedLogin } = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/suspicious-activity.ts [app-route] (ecmascript, async loader)");
                    await logFailedLogin(null, normalizedEmail);
                    return null;
                }
                // Check if onboarding is complete
                const onboardingComplete = checkOnboardingComplete(user);
                const tosAccepted = user.profile?.tosAccepted || false;
                return {
                    id: user.id,
                    email: user.email,
                    name: user.profile?.name || user.email,
                    role: user.role,
                    image: user.profile?.avatarUrl,
                    onboardingComplete,
                    tosAccepted
                };
            }
        })
    ],
    // WeChat OAuth - To be added later
    // WeChatProvider({
    //   clientId: process.env.WECHAT_APP_ID!,
    //   clientSecret: process.env.WECHAT_APP_SECRET!,
    // })
    // ], // This was an extra closing bracket for providers array, removed it.
    callbacks: {
        async jwt ({ token, user, trigger, session }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.onboardingComplete = user.onboardingComplete;
                token.tosAccepted = user.tosAccepted;
            }
            // Handle session update (e.g., after onboarding completes)
            if (trigger === 'update' && session) {
                token.onboardingComplete = true;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.onboardingComplete = token.onboardingComplete;
                session.user.tosAccepted = token.tosAccepted;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET
};
// Helper function to check if onboarding is complete
function checkOnboardingComplete(user) {
    // Check if user profile exists and has completed onboarding
    if (!user?.profile) {
        return false;
    }
    // Profile exists but isOnboarded field is not set (null/undefined) - consider not onboarded
    if (user.profile.isOnboarded === null || user.profile.isOnboarded === undefined) {
        return false;
    }
    // Return the actual onboarding status
    return user.profile.isOnboarded;
}
async function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 12);
}
function isAuthorized(userRole, allowedRoles) {
    return allowedRoles.includes(userRole);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/notifications/notify.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
 * Central Notification Service
 *
 * Handles all three channels in one call:
 *  - In-app (DB record)
 *  - Email (via Resend API)
 *  - Real-time push (via SSE broadcast)
 *
 * Usage:
 *   import { notify, notifyMany } from '@/lib/notifications/notify'
 *   await notify({ userId, type: 'assignment', title, message, actionUrl })
 *   await notifyMany({ userIds: [...], type, title, message })
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
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
            } catch  {}
        }
    }
}
async function getChannelDecision(userId, type, force) {
    if (force) return {
        inApp: true,
        email: true,
        push: true
    };
    const prefs = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].notificationPreference.findUnique({
        where: {
            userId
        }
    });
    if (!prefs) return {
        inApp: true,
        email: true,
        push: true
    } // defaults
    ;
    // Start with global toggles
    let decision = {
        inApp: prefs.inAppEnabled,
        email: prefs.emailEnabled,
        push: prefs.pushEnabled
    };
    // Apply per-type overrides
    const overrides = prefs.channelOverrides;
    if (overrides && overrides[type]) {
        const typeOverride = overrides[type];
        if (typeof typeOverride.inApp === 'boolean') decision.inApp = typeOverride.inApp;
        if (typeof typeOverride.email === 'boolean') decision.email = typeOverride.email;
        if (typeof typeOverride.push === 'boolean') decision.push = typeOverride.push;
    }
    // Check quiet hours for push/email
    if (prefs.quietHoursStart && prefs.quietHoursEnd) {
        const isQuiet = isInQuietHours(prefs.quietHoursStart, prefs.quietHoursEnd, prefs.timezone);
        if (isQuiet) {
            decision.push = false;
        // Email follows digest preference during quiet hours
        }
    }
    // Email digest: if not "instant", skip immediate email
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
        const currentTime = formatter.format(now) // "HH:MM"
        ;
        // Simple string comparison works for HH:mm format
        if (start <= end) {
            return currentTime >= start && currentTime <= end;
        }
        // Wraps midnight (e.g. 22:00 - 07:00)
        return currentTime >= start || currentTime <= end;
    } catch  {
        return false;
    }
}
// ---- Email Sending ----
async function sendNotificationEmail(userId, type, title, message, actionUrl) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.log(`[notify-email] (no RESEND_API_KEY) Would email user ${userId}: ${title}`);
        return;
    }
    // Fetch user email
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            email: true,
            name: true
        }
    });
    if (!user?.email) return;
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
                to: user.email,
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
    let notification = null;
    // 1. In-app notification (DB)
    if (channels.inApp) {
        notification = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].notification.create({
            data: {
                userId,
                type,
                title,
                message,
                data: data ?? undefined,
                actionUrl
            }
        });
    }
    // 2. Real-time push via SSE
    if (channels.push) {
        broadcastToUser(userId, notification ?? {
            type,
            title,
            message,
            actionUrl,
            createdAt: new Date()
        });
    }
    // 3. Email
    if (channels.email) {
        // Fire-and-forget (don't block the response)
        sendNotificationEmail(userId, type, title, message, actionUrl).catch((e)=>console.error('[notify] Email send error:', e));
    }
    return notification;
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/notifications/stream/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SSE (Server-Sent Events) endpoint for real-time notifications.
 *
 * GET /api/notifications/stream
 *
 * The client opens a persistent connection and receives events as:
 *   event: notification
 *   data: { ...notification }
 *
 * Also sends a heartbeat ping every 30s to keep the connection alive.
 */ __turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$notifications$2f$notify$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/notifications/notify.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
async function GET(req) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session?.user) {
        return new Response('Unauthorized', {
            status: 401
        });
    }
    const userId = session.user.id;
    const encoder = new TextEncoder();
    let cleanup = null;
    let heartbeatInterval = null;
    const stream = new ReadableStream({
        start (controller) {
            // Send initial connection event
            controller.enqueue(encoder.encode(`event: connected\ndata: ${JSON.stringify({
                userId
            })}\n\n`));
            // Register SSE listener for this user
            cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$notifications$2f$notify$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addSSEListener"])(userId, (notification)=>{
                try {
                    const data = JSON.stringify(notification);
                    controller.enqueue(encoder.encode(`event: notification\ndata: ${data}\n\n`));
                } catch  {
                // Stream may be closed
                }
            });
            // Heartbeat every 30 seconds
            heartbeatInterval = setInterval(()=>{
                try {
                    controller.enqueue(encoder.encode(`:ping\n\n`));
                } catch  {
                    // Stream closed
                    if (heartbeatInterval) clearInterval(heartbeatInterval);
                    if (cleanup) cleanup();
                }
            }, 30_000);
        },
        cancel () {
            if (heartbeatInterval) clearInterval(heartbeatInterval);
            if (cleanup) cleanup();
        }
    });
    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no'
        }
    });
}
}),
];

//# debugId=36ccf36e-bda8-9351-9f26-891c41270657
//# sourceMappingURL=%5Broot-of-the-server%5D__22f1d5b7._.js.map