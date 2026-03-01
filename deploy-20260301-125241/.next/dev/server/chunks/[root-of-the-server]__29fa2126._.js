;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="65198bb6-755d-ae41-aa9d-013287caef23")}catch(e){}}();
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/student/learning-path/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * GET /api/student/learning-path
 *
 * Returns a personalized learning path:
 *  - currentLesson: the lesson currently in progress
 *  - nextLessons: next 3 lessons in sequence (prioritising weak areas)
 *  - focusAreas: top 3 weak topics with links to relevant tasks
 *  - overallPath: full ordered list of lessons with status
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
;
;
;
;
async function GET(req) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session?.user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
    }
    const studentId = session.user.id;
    try {
        // 1. Get enrollments with full lesson tree
        const enrollments = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].curriculumEnrollment.findMany({
            where: {
                studentId
            },
            include: {
                curriculum: {
                    include: {
                        modules: {
                            include: {
                                lessons: {
                                    select: {
                                        id: true,
                                        title: true,
                                        description: true,
                                        order: true,
                                        duration: true,
                                        prerequisites: true
                                    },
                                    orderBy: {
                                        order: 'asc'
                                    }
                                }
                            },
                            orderBy: {
                                order: 'asc'
                            }
                        }
                    }
                }
            }
        });
        // 2. Lesson progress
        const allLessonIds = enrollments.flatMap((e)=>e.curriculum.modules.flatMap((m)=>m.lessons.map((l)=>l.id)));
        const lessonProgress = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].curriculumLessonProgress.findMany({
            where: {
                studentId,
                lessonId: {
                    in: allLessonIds
                }
            }
        });
        const progressMap = new Map(lessonProgress.map((lp)=>[
                lp.lessonId,
                lp
            ]));
        // 3. StudentPerformance for weaknesses
        const performances = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].studentPerformance.findMany({
            where: {
                studentId
            }
        });
        const allWeaknesses = performances.flatMap((p)=>p.weaknesses || []);
        // 4. Build ordered flat path across all curricula
        const pathEntries = [];
        let globalOrder = 0;
        for (const enrollment of enrollments){
            const curriculum = enrollment.curriculum;
            for (const mod of curriculum.modules){
                for (const lesson of mod.lessons){
                    const prog = progressMap.get(lesson.id);
                    const status = prog?.status === 'COMPLETED' ? 'completed' : prog?.status === 'IN_PROGRESS' ? 'in_progress' : 'not_started';
                    pathEntries.push({
                        lessonId: lesson.id,
                        title: lesson.title,
                        description: lesson.description ?? null,
                        duration: lesson.duration,
                        courseName: curriculum.title,
                        courseId: curriculum.id,
                        moduleTitle: mod.title,
                        status,
                        score: prog?.score ?? null,
                        order: globalOrder++
                    });
                }
            }
        }
        // 5. Find current lesson (first in_progress, or first not_started)
        const currentLesson = pathEntries.find((e)=>e.status === 'in_progress') ?? pathEntries.find((e)=>e.status === 'not_started') ?? null;
        // 6. Next 3 lessons after current
        const currentIdx = currentLesson ? pathEntries.findIndex((e)=>e.lessonId === currentLesson.lessonId) : -1;
        const notStarted = pathEntries.filter((e)=>e.status === 'not_started' && e.lessonId !== currentLesson?.lessonId);
        // Prioritise lessons covering weak topics
        const scored = notStarted.map((lesson)=>{
            const weaknessBoost = allWeaknesses.some((w)=>lesson.title.toLowerCase().includes(w.toLowerCase()) || (lesson.description || '').toLowerCase().includes(w.toLowerCase())) ? -100 : 0;
            return {
                ...lesson,
                sortKey: lesson.order + weaknessBoost
            };
        });
        scored.sort((a, b)=>a.sortKey - b.sortKey);
        const nextLessons = scored.slice(0, 3);
        // 7. Focus areas (top 3 unique weaknesses)
        const weakFreq = {};
        for (const w of allWeaknesses)weakFreq[w] = (weakFreq[w] || 0) + 1;
        const focusAreas = Object.entries(weakFreq).sort((a, b)=>b[1] - a[1]).slice(0, 3).map(([topic, count])=>({
                topic,
                frequency: count
            }));
        // 8. Summary stats
        const completedCount = pathEntries.filter((e)=>e.status === 'completed').length;
        const totalCount = pathEntries.length;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                currentLesson,
                nextLessons,
                focusAreas,
                completedCount,
                totalCount,
                progressPercent: totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0
            }
        });
    } catch (error) {
        console.error('Failed to fetch learning path:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch learning path'
        }, {
            status: 500
        });
    }
}
}),
];

//# debugId=65198bb6-755d-ae41-aa9d-013287caef23
//# sourceMappingURL=%5Broot-of-the-server%5D__29fa2126._.js.map