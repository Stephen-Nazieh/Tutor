;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="dfd8086b-4d32-9c1e-70e6-6394231fa69c")}catch(e){}}();
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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/student/reviews/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
;
;
;
;
// Forgetting curve calculation (Ebbinghaus-inspired)
// R = e^(-t/S) where t is time elapsed, S is stability
function calculateRetention(hoursSinceLastReview, stability) {
    if (hoursSinceLastReview < 0) return 100;
    const retrievability = Math.exp(-hoursSinceLastReview / stability);
    return Math.min(100, Math.round(retrievability * 100));
}
// Calculate stability based on repetition history
function calculateStability(repetitionCount, easeFactor, baseStability = 24 // hours
) {
    if (repetitionCount === 0) return baseStability;
    if (repetitionCount === 1) return baseStability * easeFactor * 1;
    if (repetitionCount === 2) return baseStability * easeFactor * 1.5;
    return baseStability * easeFactor * Math.pow(1.2, repetitionCount - 2);
}
// Calculate when retention drops below threshold
function calculateReviewDueDate(lastReviewDate, stability, targetRetention = 0.85 // 85% threshold
) {
    // Solve for t: targetRetention = e^(-t/S)
    // t = -S * ln(targetRetention)
    const hoursUntilReview = -stability * Math.log(targetRetention);
    const dueDate = new Date(lastReviewDate);
    dueDate.setHours(dueDate.getHours() + hoursUntilReview);
    return dueDate;
}
async function GET() {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
        if (!session?.user?.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const studentId = session.user.id;
        const now = new Date();
        // Get all student content progress with review data
        const contentProgress = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].contentProgress.findMany({
            where: {
                studentId
            },
            include: {
                content: {
                    select: {
                        id: true,
                        title: true,
                        subjectId: true,
                        subject: {
                            select: {
                                id: true,
                                name: true,
                                code: true,
                                color: true
                            }
                        }
                    }
                }
            }
        });
        // No synthetic demo fallback: return empty review dataset.
        if (contentProgress.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: {
                    subjectCurves: [],
                    upcomingReviews: [],
                    overdueReviews: [],
                    totalDue: 0
                }
            });
        }
        // Get quiz attempts for performance data
        const quizAttempts = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].quizAttempt.findMany({
            where: {
                studentId
            },
            include: {
                quiz: {
                    select: {
                        contentId: true,
                        subjectId: true
                    }
                }
            },
            orderBy: {
                completedAt: 'desc'
            }
        });
        // Get existing review schedules or create default
        let reviewSchedules = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].reviewSchedule.findMany({
            where: {
                studentId
            },
            include: {
                content: {
                    select: {
                        id: true,
                        title: true,
                        subjectId: true,
                        subject: {
                            select: {
                                id: true,
                                name: true,
                                code: true,
                                color: true
                            }
                        }
                    }
                }
            }
        });
        // If no review schedules exist, create them from content progress
        if (reviewSchedules.length === 0) {
            const newSchedules = [];
            for (const progress of contentProgress){
                if (progress.progress > 0) {
                    // Calculate performance from quiz attempts for this content
                    const contentQuizzes = quizAttempts.filter((q)=>q.quiz?.contentId === progress.contentId && q.completedAt);
                    const avgPerformance = contentQuizzes.length > 0 ? contentQuizzes.reduce((sum, q)=>sum + (q.score || 0), 0) / contentQuizzes.length : 70 // Default assumption
                    ;
                    // Calculate ease factor based on performance (1.3 - 2.5)
                    const easeFactor = 1.3 + Math.min(100, avgPerformance) / 100 * 1.2;
                    // Calculate stability
                    const repetitionCount = contentQuizzes.length;
                    const stability = calculateStability(repetitionCount, easeFactor);
                    // Last review is either from quiz completion or content progress update
                    const lastReview = contentQuizzes[0]?.completedAt || progress.updatedAt;
                    // Calculate next review
                    const nextReview = calculateReviewDueDate(lastReview, stability);
                    newSchedules.push({
                        id: `${studentId}-${progress.contentId}`,
                        studentId,
                        contentId: progress.contentId,
                        content: progress.content,
                        lastReviewed: lastReview,
                        nextReview,
                        stability,
                        easeFactor,
                        repetitionCount,
                        performance: avgPerformance,
                        interval: Math.round(stability / 24),
                        priority: nextReview < now ? 'high' : nextReview.getTime() - now.getTime() < 2 * 24 * 60 * 60 * 1000 ? 'medium' : 'low'
                    });
                }
            }
            reviewSchedules = newSchedules;
        }
        // Generate retention curve data points for each subject
        const subjectsMap = new Map();
        const daysToProject = 30;
        // Group schedules by subject
        for (const schedule of reviewSchedules){
            const subjectId = schedule.content?.subjectId || 'general';
            const subjectName = schedule.content?.subject?.name || 'General';
            const subjectColor = schedule.content?.subject?.color || '#3B82F6';
            if (!subjectsMap.has(subjectId)) {
                subjectsMap.set(subjectId, {
                    id: subjectId,
                    name: subjectName,
                    color: subjectColor,
                    schedules: []
                });
            }
            subjectsMap.get(subjectId).schedules.push(schedule);
        }
        // Build retention curves for each subject
        const subjectCurves = [];
        for (const [subjectId, subjectData] of subjectsMap){
            const curve = {
                subjectId,
                subjectName: subjectData.name,
                color: subjectData.color,
                dataPoints: []
            };
            // Generate data points for each day over 30 days
            for(let day = 0; day <= daysToProject; day++){
                const pointDate = new Date(now);
                pointDate.setDate(pointDate.getDate() + day);
                // Calculate average retention for this subject on this day
                let totalRetention = 0;
                let hasReviewOnThisDay = false;
                let reviewData = null;
                for (const schedule of subjectData.schedules){
                    const lastReview = new Date(schedule.lastReviewed);
                    const hoursSinceLastReview = (pointDate.getTime() - lastReview.getTime()) / (1000 * 60 * 60);
                    // Check if there's a scheduled review on this day
                    const nextReview = new Date(schedule.nextReview);
                    const isSameDay = nextReview.toDateString() === pointDate.toDateString();
                    if (isSameDay) {
                        hasReviewOnThisDay = true;
                        reviewData = {
                            reviewId: schedule.id,
                            contentTitle: schedule.content?.title,
                            contentId: schedule.content?.id
                        };
                        // After review, retention resets to high
                        totalRetention += 95;
                    } else if (hoursSinceLastReview < 0) {
                        // Before last review (shouldn't happen in our range, but handle it)
                        totalRetention += 100;
                    } else {
                        // Normal forgetting curve decay
                        const retention = calculateRetention(hoursSinceLastReview, schedule.stability);
                        totalRetention += retention;
                    }
                }
                const avgRetention = subjectData.schedules.length > 0 ? Math.round(totalRetention / subjectData.schedules.length) : 0;
                curve.dataPoints.push({
                    day,
                    date: pointDate,
                    retention: Math.max(0, Math.min(100, avgRetention)),
                    isReviewPoint: hasReviewOnThisDay,
                    ...reviewData
                });
            }
            subjectCurves.push(curve);
        }
        // Get upcoming reviews (next 14 days)
        const upcomingReviews = reviewSchedules.filter((s)=>s.nextReview >= now && s.nextReview <= new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)).sort((a, b)=>a.nextReview.getTime() - b.nextReview.getTime()).slice(0, 10).map((s)=>({
                id: s.id,
                contentId: s.contentId,
                contentTitle: s.content?.title || 'Unknown',
                subjectId: s.content?.subjectId,
                subjectName: s.content?.subject?.name || 'General',
                subjectColor: s.content?.subject?.color || '#3B82F6',
                scheduledFor: s.nextReview,
                isOverdue: s.nextReview < now,
                daysUntilDue: Math.ceil((s.nextReview.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
                currentRetention: calculateRetention((now.getTime() - new Date(s.lastReviewed).getTime()) / (1000 * 60 * 60), s.stability),
                repetitionCount: s.repetitionCount,
                priority: s.priority
            }));
        // Get overdue reviews
        const overdueReviews = reviewSchedules.filter((s)=>s.nextReview < now).sort((a, b)=>a.nextReview.getTime() - b.nextReview.getTime()).map((s)=>({
                id: s.id,
                contentId: s.contentId,
                contentTitle: s.content?.title || 'Unknown',
                subjectId: s.content?.subjectId,
                subjectName: s.content?.subject?.name || 'General',
                subjectColor: s.content?.subject?.color || '#3B82F6',
                scheduledFor: s.nextReview,
                daysOverdue: Math.floor((now.getTime() - s.nextReview.getTime()) / (1000 * 60 * 60 * 24)),
                currentRetention: calculateRetention((now.getTime() - new Date(s.lastReviewed).getTime()) / (1000 * 60 * 60), s.stability)
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                subjectCurves,
                upcomingReviews,
                overdueReviews,
                totalDue: overdueReviews.length + upcomingReviews.filter((r)=>r.daysUntilDue === 0).length
            }
        });
    } catch (error) {
        console.error('Error fetching review schedule:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to fetch review schedule'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
        if (!session?.user?.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const body = await request.json();
        const { contentId, performance } = body;
        if (!contentId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Content ID required'
            }, {
                status: 400
            });
        }
        const studentId = session.user.id;
        const now = new Date();
        // Get or create review schedule
        let schedule = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].reviewSchedule.findFirst({
            where: {
                studentId,
                contentId
            }
        });
        if (!schedule) {
            // Create new schedule
            const easeFactor = 1.3 + Math.min(100, performance || 70) / 100 * 1.2;
            const stability = calculateStability(1, easeFactor);
            schedule = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].reviewSchedule.create({
                data: {
                    studentId,
                    contentId,
                    lastReviewed: now,
                    nextReview: calculateReviewDueDate(now, stability),
                    stability,
                    easeFactor,
                    repetitionCount: 1,
                    performance: performance || 70
                }
            });
        } else {
            // Update existing schedule
            const newRepetitionCount = schedule.repetitionCount + 1;
            // Adjust ease factor based on performance
            let newEaseFactor = schedule.easeFactor;
            if (performance !== undefined) {
                if (performance < 60) {
                    newEaseFactor = Math.max(1.3, schedule.easeFactor - 0.2);
                } else if (performance > 85) {
                    newEaseFactor = Math.min(2.5, schedule.easeFactor + 0.15);
                }
            }
            const newStability = calculateStability(newRepetitionCount, newEaseFactor, schedule.stability);
            await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].reviewSchedule.update({
                where: {
                    id: schedule.id
                },
                data: {
                    lastReviewed: now,
                    nextReview: calculateReviewDueDate(now, newStability),
                    stability: newStability,
                    easeFactor: newEaseFactor,
                    repetitionCount: newRepetitionCount,
                    performance: performance !== undefined ? performance : schedule.performance
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                schedule
            }
        });
    } catch (error) {
        console.error('Error recording review:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to record review'
        }, {
            status: 500
        });
    }
}
}),
];

//# debugId=dfd8086b-4d32-9c1e-70e6-6394231fa69c
//# sourceMappingURL=%5Broot-of-the-server%5D__2b0c54b0._.js.map