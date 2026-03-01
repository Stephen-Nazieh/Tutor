;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="0b02627f-018c-5fa6-83fb-b3c9f1c8adcd")}catch(e){}}();
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/csrf.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSRF_HEADER_NAME",
    ()=>CSRF_HEADER_NAME,
    "getCsrfToken",
    ()=>getCsrfToken,
    "verifyCsrfToken",
    ()=>verifyCsrfToken
]);
/**
 * CSRF protection for state-changing API requests.
 * Uses a double-submit cookie pattern: cookie set on session, validated on POST/PUT/DELETE/PATCH.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
const CSRF_COOKIE_NAME = 'tutorme_csrf';
const CSRF_HEADER_NAME = 'x-csrf-token';
const SECRET = process.env.NEXTAUTH_SECRET || process.env.CSRF_SECRET || 'csrf-secret-change-in-production';
function hash(value) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', SECRET).update(value).digest('hex');
}
async function getCsrfToken() {
    const value = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(24).toString('hex');
    const token = `${value}.${hash(value)}`;
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(CSRF_COOKIE_NAME, token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/'
    });
    return token;
}
async function verifyCsrfToken(req) {
    try {
        const headerToken = req.headers.get(CSRF_HEADER_NAME);
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
        if (!headerToken || !cookieToken) return false;
        if (headerToken !== cookieToken) return false;
        const [value] = headerToken.split('.');
        if (!value) return false;
        const expected = `${value}.${hash(value)}`;
        const headerBuffer = Buffer.from(headerToken);
        const expectedBuffer = Buffer.from(expected);
        if (headerBuffer.length !== expectedBuffer.length) return false;
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(headerBuffer, expectedBuffer);
    } catch  {
        return false;
    }
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/rate-limit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RATE_LIMIT_PRESETS",
    ()=>RATE_LIMIT_PRESETS,
    "checkRateLimit",
    ()=>checkRateLimit,
    "checkRateLimitPreset",
    ()=>checkRateLimitPreset,
    "getClientIdentifier",
    ()=>getClientIdentifier
]);
/**
 * Rate limiting for API routes.
 * Uses Redis when REDIS_URL is set (shared across instances); otherwise in-memory store.
 */ const DEFAULT_WINDOW_MS = 60 * 1000 // 1 minute
;
const DEFAULT_MAX = 100 // requests per window per key
;
const REDIS_PREFIX = 'ratelimit:';
const memoryStore = new Map();
function prune() {
    const now = Date.now();
    for (const [key, entry] of memoryStore.entries()){
        if (entry.resetAt < now) memoryStore.delete(key);
    }
}
function checkRateLimitMemory(key, options) {
    const { windowMs, max } = options;
    const now = Date.now();
    if (memoryStore.size > 10000) prune();
    let entry = memoryStore.get(key);
    if (!entry || entry.resetAt < now) {
        entry = {
            count: 0,
            resetAt: now + windowMs
        };
        memoryStore.set(key, entry);
    }
    entry.count += 1;
    const allowed = entry.count <= max;
    const remaining = Math.max(0, max - entry.count);
    return {
        allowed,
        remaining,
        resetAt: entry.resetAt
    };
}
let redisClient = null;
let redisInitPromise = null;
async function getRedisClient() {
    if (redisClient) return redisClient;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
     // browser
    const url = process.env.REDIS_URL;
    if (!url) return null;
    if (!redisInitPromise) {
        redisInitPromise = (async ()=>{
            try {
                const { Redis } = await __turbopack_context__.A("[externals]/ioredis [external] (ioredis, cjs, [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ioredis, async loader)");
                const client = new Redis(url, {
                    retryStrategy: (times)=>Math.min(times * 50, 2000),
                    maxRetriesPerRequest: 3
                });
                client.on('error', ()=>{});
                redisClient = client;
                return client;
            } catch  {
                return null;
            }
        })();
    }
    return redisInitPromise;
}
async function checkRateLimitRedis(key, options) {
    const redis = await getRedisClient();
    if (!redis) return checkRateLimitMemory(key, options);
    const { windowMs, max } = options;
    const now = Date.now();
    const fullKey = REDIS_PREFIX + key;
    const ttlSeconds = Math.ceil(windowMs / 1000);
    try {
        // Atomic Lua: INCR + EXPIRE (when count=1) in single round-trip - no race conditions
        const result = await redis.eval(`local c=redis.call('INCR',KEYS[1]) if c==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end return {c,redis.call('PTTL',KEYS[1])}`, 1, fullKey, ttlSeconds);
        const [newCount, pttl] = result;
        const resetAt = pttl > 0 ? now + pttl : now + windowMs;
        const allowed = newCount <= max;
        const remaining = Math.max(0, max - newCount);
        return {
            allowed,
            remaining,
            resetAt
        };
    } catch  {
        return checkRateLimitMemory(key, options);
    }
}
async function checkRateLimit(key, maxOrOptions = DEFAULT_MAX) {
    const options = typeof maxOrOptions === 'number' ? {
        max: maxOrOptions,
        windowMs: DEFAULT_WINDOW_MS
    } : {
        windowMs: DEFAULT_WINDOW_MS,
        ...maxOrOptions
    };
    if (process.env.REDIS_URL) {
        return checkRateLimitRedis(key, options);
    }
    return checkRateLimitMemory(key, options);
}
const RATE_LIMIT_PRESETS = {
    /** Login: 10 attempts per 15 minutes per IP */ login: {
        max: 10,
        windowMs: 15 * 60 * 1000
    },
    /** Signup/register: allow multi-step retries and multi-role onboarding in the same browser */ register: {
        max: 12,
        windowMs: 15 * 60 * 1000
    },
    /** Payment create: 20 per minute per IP */ paymentCreate: {
        max: 20,
        windowMs: 60 * 1000
    },
    /** Enroll (subject or curriculum): 30 per minute per IP */ enroll: {
        max: 30,
        windowMs: 60 * 1000
    },
    /** Class booking: 20 per minute per IP */ booking: {
        max: 20,
        windowMs: 60 * 1000
    },
    /** AI generation/chat: 12 per minute per client identifier */ aiGenerate: {
        max: 12,
        windowMs: 60 * 1000
    }
};
async function checkRateLimitPreset(req, preset) {
    const ip = getClientIdentifier(req);
    const key = `${preset}:${ip}`;
    const options = RATE_LIMIT_PRESETS[preset];
    return checkRateLimit(key, options);
}
function getClientIdentifier(req) {
    const trustProxy = process.env.TRUST_PROXY === 'true';
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfIp = req.headers.get('cf-connecting-ip');
    const firstForwarded = forwarded?.split(',')[0]?.trim();
    const candidate = trustProxy ? firstForwarded || realIp || cfIp : realIp || cfIp;
    const ip = normalizeIp(candidate);
    if (ip !== 'unknown') return ip;
    // Fallback identifier when no reliable IP is available (prevents all unknown clients sharing one bucket).
    const ua = req.headers.get('user-agent') || 'unknown';
    const lang = req.headers.get('accept-language') || 'unknown';
    const fingerprint = simpleHash(`${ua}|${lang}`);
    return `unknown:${fingerprint}`;
}
function normalizeIp(ip) {
    if (!ip) return 'unknown';
    const trimmed = ip.trim();
    if (!trimmed) return 'unknown';
    if (trimmed === '::1') return '127.0.0.1';
    return trimmed;
}
function simpleHash(input) {
    let hash = 2166136261;
    for(let i = 0; i < input.length; i += 1){
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/rbac.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Role-based access control: granular permissions per role.
 * Use requirePermission() in admin/sensitive routes.
 */ __turbopack_context__.s([
    "PERMISSIONS",
    ()=>PERMISSIONS,
    "getPermissionsForRole",
    ()=>getPermissionsForRole,
    "hasPermission",
    ()=>hasPermission
]);
const PERMISSIONS = {
    // Admin
    ADMIN_VIEW_PAYMENTS: 'admin:payments:read',
    ADMIN_VIEW_WEBHOOKS: 'admin:webhooks:read',
    ADMIN_MANAGE_API_KEYS: 'admin:api_keys',
    ADMIN_VIEW_USERS: 'admin:users:read',
    // Tutor
    TUTOR_MANAGE_CLINICS: 'tutor:clinics',
    TUTOR_VIEW_REPORTS: 'tutor:reports:read',
    // Student
    STUDENT_VIEW_OWN: 'student:own:read',
    STUDENT_BOOK_CLASS: 'student:book'
};
const ROLE_PERMISSIONS = {
    ADMIN: [
        PERMISSIONS.ADMIN_VIEW_PAYMENTS,
        PERMISSIONS.ADMIN_VIEW_WEBHOOKS,
        PERMISSIONS.ADMIN_MANAGE_API_KEYS,
        PERMISSIONS.ADMIN_VIEW_USERS,
        PERMISSIONS.TUTOR_MANAGE_CLINICS,
        PERMISSIONS.TUTOR_VIEW_REPORTS,
        PERMISSIONS.STUDENT_VIEW_OWN,
        PERMISSIONS.STUDENT_BOOK_CLASS
    ],
    TUTOR: [
        PERMISSIONS.TUTOR_MANAGE_CLINICS,
        PERMISSIONS.TUTOR_VIEW_REPORTS,
        PERMISSIONS.STUDENT_VIEW_OWN,
        PERMISSIONS.STUDENT_BOOK_CLASS
    ],
    STUDENT: [
        PERMISSIONS.STUDENT_VIEW_OWN,
        PERMISSIONS.STUDENT_BOOK_CLASS
    ]
};
function hasPermission(role, permission) {
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
function getPermissionsForRole(role) {
    return ROLE_PERMISSIONS[role] ?? [];
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/admin-ip.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClientIp",
    ()=>getClientIp,
    "isAdminIpAllowed",
    ()=>isAdminIpAllowed
]);
/**
 * Admin panel IP whitelist. When set, only listed IPs can access /admin and admin API routes.
 * Env: ADMIN_IP_WHITELIST (comma-separated IPs or CIDRs, e.g. "1.2.3.4,10.0.0.0/8")
 */ function parseWhitelist() {
    const raw = process.env.ADMIN_IP_WHITELIST;
    if (!raw?.trim()) return [];
    return raw.split(',').map((s)=>s.trim()).filter(Boolean);
}
function ipToNum(ip) {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4) return 0;
    return parts[0] << 24 | parts[1] << 16 | parts[2] << 8 | parts[3];
}
function matchCidr(ip, cidr) {
    if (!cidr.includes('/')) return ip === cidr;
    const [net, bits] = cidr.split('/');
    if (!net || bits === undefined) return false;
    const mask = ~((1 << 32 - parseInt(bits, 10)) - 1) >>> 0;
    return (ipToNum(ip) & mask) === (ipToNum(net) & mask);
}
function isAdminIpAllowed(clientIp) {
    const whitelist = parseWhitelist();
    if (whitelist.length === 0) return true;
    return whitelist.some((entry)=>matchCidr(clientIp, entry) || clientIp === entry);
}
function getClientIp(req) {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0]?.trim() : null;
    return ip ?? req.headers.get('x-real-ip') ?? 'unknown';
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/api/middleware.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ForbiddenError",
    ()=>ForbiddenError,
    "NotFoundError",
    ()=>NotFoundError,
    "UnauthorizedError",
    ()=>UnauthorizedError,
    "ValidationError",
    ()=>ValidationError,
    "getCurrentSession",
    ()=>getCurrentSession,
    "getSessionOrApiKey",
    ()=>getSessionOrApiKey,
    "handleApiError",
    ()=>handleApiError,
    "parseBoundedInt",
    ()=>parseBoundedInt,
    "requireAdminIp",
    ()=>requireAdminIp,
    "requireAuth",
    ()=>requireAuth,
    "requireCsrf",
    ()=>requireCsrf,
    "requirePermission",
    ()=>requirePermission,
    "requireRole",
    ()=>requireRole,
    "withAuth",
    ()=>withAuth,
    "withCsrf",
    ()=>withCsrf,
    "withRateLimit",
    ()=>withRateLimit,
    "withRateLimitPreset",
    ()=>withRateLimitPreset
]);
/**
 * API Route Middleware Utilities
 * Provides authentication, authorization, CSRF, rate limiting, and error handling for API routes
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$csrf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/csrf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/rate-limit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$rbac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/rbac.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$admin$2d$ip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/admin-ip.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized - Please log in'){
        super(message);
        this.name = 'UnauthorizedError';
    }
}
class ForbiddenError extends Error {
    constructor(message = 'Forbidden - Insufficient permissions'){
        super(message);
        this.name = 'ForbiddenError';
    }
}
class ValidationError extends Error {
    constructor(message){
        super(message);
        this.name = 'ValidationError';
    }
}
class NotFoundError extends Error {
    constructor(message = 'Resource not found'){
        super(message);
        this.name = 'NotFoundError';
    }
}
function handleApiError(error, defaultMessage = 'Internal server error', logLabel = 'API Error') {
    console.error(`[${logLabel}]`, error);
    const message = error instanceof Error ? error.message : defaultMessage;
    const isDev = ("TURBOPACK compile-time value", "development") === 'development';
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: ("TURBOPACK compile-time truthy", 1) ? message : "TURBOPACK unreachable"
    }, {
        status: 500
    });
}
function normalizeRole(role) {
    if (typeof role !== 'string') return '';
    return role.trim().toUpperCase();
}
function withAuth(handler, options) {
    return async (req, context)=>{
        try {
            const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
            // Check if user is authenticated
            if (!session?.user?.id) {
                if (options?.optional) {
                    // Allow unauthenticated access
                    return handler(req, session, context);
                }
                throw new UnauthorizedError();
            }
            // Check role requirements
            if (options?.role && normalizeRole(session.user.role) !== normalizeRole(options.role)) {
                // Fallback: session role can be stale after account updates or seed resets.
                const { db } = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript, async loader)");
                const freshUser = await db.user.findUnique({
                    where: {
                        id: session.user.id
                    },
                    select: {
                        role: true
                    }
                });
                if (normalizeRole(freshUser?.role) !== normalizeRole(options.role)) {
                    throw new ForbiddenError(`This endpoint requires ${options.role} role`);
                }
            }
            // Call the actual handler
            return await handler(req, session, context);
        } catch (error) {
            // Handle known error types
            if (error instanceof UnauthorizedError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: error.message
                }, {
                    status: 401
                });
            }
            if (error instanceof ForbiddenError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: error.message
                }, {
                    status: 403
                });
            }
            if (error instanceof ValidationError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: error.message
                }, {
                    status: 400
                });
            }
            if (error instanceof NotFoundError) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: error.message
                }, {
                    status: 404
                });
            }
            // Handle unknown errors
            console.error('API Error:', error);
            // Don't expose internal errors in production
            const isDev = ("TURBOPACK compile-time value", "development") === 'development';
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: ("TURBOPACK compile-time truthy", 1) ? error instanceof Error ? error.message : 'Unknown error' : "TURBOPACK unreachable"
            }, {
                status: 500
            });
        }
    };
}
async function getCurrentSession() {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
}
async function requireAuth() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session?.user?.id) {
        throw new UnauthorizedError();
    }
    return session;
}
async function requireRole(role) {
    const session = await requireAuth();
    if (normalizeRole(session.user.role) !== normalizeRole(role)) {
        throw new ForbiddenError(`This action requires ${role} role`);
    }
    return session;
}
/** State-changing methods that require CSRF */ const CSRF_METHODS = new Set([
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
]);
/** API path prefixes that skip CSRF (webhooks, auth, public) */ const CSRF_SKIP_PATHS = [
    '/api/auth',
    '/api/payments/webhooks',
    '/api/csrf',
    '/api/health'
];
async function requireCsrf(req) {
    if (!CSRF_METHODS.has(req.method)) return null;
    const path = req.nextUrl?.pathname ?? '';
    if (CSRF_SKIP_PATHS.some((p)=>path.startsWith(p))) return null;
    const valid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$csrf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyCsrfToken"])(req);
    if (!valid) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid or missing CSRF token'
        }, {
            status: 403
        });
    }
    return null;
}
function withCsrf(handler) {
    return async (req, ...args)=>{
        const csrfError = await requireCsrf(req);
        if (csrfError) return csrfError;
        return handler(req, ...args);
    };
}
async function withRateLimit(req, max = 100) {
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClientIdentifier"])(req);
    const { allowed, remaining } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRateLimit"])(key, max);
    if (!allowed) {
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Too many requests'
        }, {
            status: 429,
            headers: {
                'Retry-After': '60'
            }
        });
        return {
            response: res,
            remaining: 0
        };
    }
    return {
        response: null,
        remaining
    };
}
async function withRateLimitPreset(req, preset) {
    const { allowed, remaining, resetAt } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRateLimitPreset"])(req, preset);
    if (!allowed) {
        const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Too many requests. Please try again later.'
        }, {
            status: 429,
            headers: {
                'Retry-After': String(Math.max(1, retryAfter))
            }
        });
        return {
            response: res,
            remaining: 0
        };
    }
    return {
        response: null,
        remaining
    };
}
function requirePermission(session, permission) {
    const role = session?.user?.role;
    if (!role || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$rbac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasPermission"])(role, permission)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden - Insufficient permissions'
        }, {
            status: 403
        });
    }
    return null;
}
function requireAdminIp(req) {
    const ip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$admin$2d$ip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClientIp"])(req);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$security$2f$admin$2d$ip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAdminIpAllowed"])(ip)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden - Admin access not allowed from this IP'
        }, {
            status: 403
        });
    }
    return null;
}
async function getSessionOrApiKey(req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        if (token.startsWith('tm_')) {
            const { verifyApiKey } = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/security/api-key.ts [app-route] (ecmascript, async loader)");
            const key = await verifyApiKey(token);
            if (key) return {
                type: 'apiKey',
                keyId: key.id
            };
        }
    }
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
    if (session?.user?.id) return {
        type: 'session',
        session
    };
    return null;
}
function parseBoundedInt(raw, defaultValue, options) {
    const min = options.min ?? 0;
    const parsed = Number.parseInt(raw ?? '', 10);
    if (!Number.isFinite(parsed)) return defaultValue;
    if (parsed < min) return min;
    if (parsed > options.max) return options.max;
    return parsed;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared payment gateway types
 */ __turbopack_context__.s([]);
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/airwallex.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AirwallexGateway",
    ()=>AirwallexGateway
]);
/**
 * Airwallex payment gateway implementation
 * - OAuth2-style token authentication (login with API key, use Bearer token)
 * - Create payment intent
 * - Webhook signature verification (HMAC-SHA256 of timestamp + raw body)
 * - Refund via payment_attempt_id (store attempt_id from webhook for refunds)
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const SANDBOX_BASE = 'https://api-demo.airwallex.com';
const PRODUCTION_BASE = 'https://api.airwallex.com';
let tokenCache = null;
function getBaseUrl() {
    const env = process.env.AIRWALLEX_ENV || 'sandbox';
    return env === 'production' ? PRODUCTION_BASE : SANDBOX_BASE;
}
async function getAccessToken() {
    const now = Date.now();
    if (tokenCache && tokenCache.expiresAt > now + 60_000) {
        return tokenCache.token;
    }
    const clientId = process.env.AIRWALLEX_CLIENT_ID;
    const apiKey = process.env.AIRWALLEX_API_KEY;
    if (!clientId || !apiKey) {
        throw new Error('Airwallex: AIRWALLEX_CLIENT_ID and AIRWALLEX_API_KEY are required');
    }
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/v1/authentication/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-client-id': clientId,
            'x-api-key': apiKey
        }
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Airwallex auth failed: ${res.status} ${text}`);
    }
    const data = await res.json();
    const token = data.token;
    const expiresAt = data.expires_at;
    if (!token) {
        throw new Error('Airwallex: no token in auth response');
    }
    const expiresAtMs = expiresAt ? new Date(expiresAt).getTime() : Date.now() + 25 * 60 * 1000;
    tokenCache = {
        token,
        expiresAt: expiresAtMs
    };
    return token;
}
/**
 * For Airwallex webhook verification, pass an object with rawBody and timestamp:
 * { rawBody: string, timestamp: string } (timestamp from x-timestamp header).
 * If payload is a string, it is treated as rawBody and timestamp must be in signature header context
 * (caller should pass timestamp separately - we don't have it in the interface, so we require the object form).
 */ function getRawBodyAndTimestamp(payload) {
    if (payload && typeof payload === 'object' && 'rawBody' in payload && 'timestamp' in payload) {
        const rawBody = payload.rawBody;
        const timestamp = payload.timestamp;
        if (typeof rawBody === 'string' && typeof timestamp === 'string') {
            return {
                rawBody,
                timestamp
            };
        }
    }
    return null;
}
class AirwallexGateway {
    async createPayment(request) {
        const token = await getAccessToken();
        const base = getBaseUrl();
        const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        const defaultReturn = process.env.PAYMENT_SUCCESS_URL || `${("TURBOPACK compile-time value", "http://localhost:3003") || ''}/payment/success`;
        const returnUrl = request.successUrl ?? defaultReturn;
        const body = {
            request_id: requestId,
            amount: request.amount,
            currency: request.currency.toUpperCase(),
            merchant_order_id: request.bookingId ?? (request.curriculumId ? `course:${request.curriculumId}` : 'payment'),
            return_url: returnUrl
        };
        const res = await fetch(`${base}/api/v1/pa/payment_intents/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-client-id': process.env.AIRWALLEX_CLIENT_ID
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Airwallex create payment intent failed: ${res.status} ${text}`);
        }
        const data = await res.json();
        const paymentId = data.id;
        if (!paymentId) {
            throw new Error('Airwallex: no payment intent id in response');
        }
        const checkoutUrl = data.url || `${("TURBOPACK compile-time value", "http://localhost:3003") || ''}/payment/checkout?intent_id=${paymentId}&client_secret=${encodeURIComponent(data.client_secret || '')}`;
        return {
            paymentId,
            checkoutUrl,
            status: data.status || 'REQUIRES_PAYMENT_METHOD'
        };
    }
    verifyWebhook(payload, signature) {
        const secret = process.env.AIRWALLEX_WEBHOOK_SECRET;
        if (!secret) {
            return false;
        }
        const parsed = getRawBodyAndTimestamp(payload);
        if (!parsed) {
            return false;
        }
        const { rawBody, timestamp } = parsed;
        const policy = `${timestamp}${rawBody}`;
        const expected = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', secret).update(policy).digest('hex');
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'));
    }
    async processWebhook(payload) {
        const body = payload;
        const eventName = body?.name || '';
        const data = body?.data;
        if (!data) {
            return {
                success: false,
                eventType: eventName,
                error: 'Missing event data'
            };
        }
        const paymentId = data.id;
        const status = data.status;
        if (eventName === 'payment_intent.succeeded') {
            return {
                success: true,
                paymentId,
                eventType: eventName,
                status: status || 'succeeded'
            };
        }
        if (eventName === 'payment_intent.cancelled' || eventName === 'payment_intent.failed') {
            return {
                success: true,
                paymentId,
                eventType: eventName,
                status: status || 'cancelled'
            };
        }
        return {
            success: true,
            paymentId,
            eventType: eventName,
            status
        };
    }
    async refundPayment(paymentId, amount) {
        const token = await getAccessToken();
        const base = getBaseUrl();
        const requestId = `refund_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        const body = {
            payment_attempt_id: paymentId,
            reason: 'customer_requested',
            request_id: requestId
        };
        if (amount != null && amount > 0) {
            body.amount = amount;
        }
        const res = await fetch(`${base}/api/v1/pa/refunds/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-client-id': process.env.AIRWALLEX_CLIENT_ID
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const text = await res.text();
            return {
                refundId: '',
                status: 'failed',
                error: `Airwallex refund failed: ${res.status} ${text}`
            };
        }
        const data = await res.json();
        return {
            refundId: data.id || requestId,
            status: data.status || 'RECEIVED',
            amountRefunded: data.amount
        };
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/hitpay.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HitpayGateway",
    ()=>HitpayGateway
]);
/**
 * Hitpay payment gateway implementation
 * - Create payment request (POST /v1/payment-requests)
 * - HMAC signature verification (Hitpay-Signature: SHA-256 derived from salt)
 * - Webhook processing (charge.created, payment_request.completed, etc.)
 * - Refund (POST /v1/refund)
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const SANDBOX_BASE = 'https://api.sandbox.hit-pay.com';
const PRODUCTION_BASE = 'https://api.hit-pay.com';
function getBaseUrl() {
    const env = process.env.HITPAY_ENV || 'sandbox';
    return env === 'production' ? PRODUCTION_BASE : SANDBOX_BASE;
}
class HitpayGateway {
    async createPayment(request) {
        const apiKey = process.env.HITPAY_API_KEY;
        if (!apiKey) {
            throw new Error('Hitpay: HITPAY_API_KEY is required');
        }
        const base = getBaseUrl();
        const defaultRedirect = process.env.PAYMENT_SUCCESS_URL || `${("TURBOPACK compile-time value", "http://localhost:3003") || ''}/payment/success`;
        const redirectUrl = request.successUrl ?? defaultRedirect;
        const webhookUrl = process.env.HITPAY_WEBHOOK_URL || `${("TURBOPACK compile-time value", "http://localhost:3003") || ''}/api/payments/webhooks/hitpay`;
        const body = {
            amount: request.amount,
            currency: request.currency.toLowerCase(),
            email: request.studentEmail,
            purpose: request.description,
            reference_number: request.bookingId ?? (request.curriculumId ? `course:${request.curriculumId}` : 'payment'),
            redirect_url: redirectUrl,
            webhook: webhookUrl
        };
        const res = await fetch(`${base}/v1/payment-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-BUSINESS-API-KEY': apiKey
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Hitpay create payment failed: ${res.status} ${text}`);
        }
        const data = await res.json();
        const paymentId = data.id;
        if (!paymentId) {
            throw new Error('Hitpay: no payment request id in response');
        }
        const checkoutUrl = data.url || '';
        return {
            paymentId,
            checkoutUrl,
            status: data.status || 'pending'
        };
    }
    /**
   * Verify Hitpay webhook signature.
   * Pass the raw request body string as payload and the Hitpay-Signature header value as signature.
   * Hitpay uses HMAC-SHA256 with the salt as key and the JSON payload as message.
   */ verifyWebhook(payload, signature) {
        const salt = process.env.HITPAY_SALT;
        if (!salt) {
            return false;
        }
        const rawBody = typeof payload === 'string' ? payload : JSON.stringify(payload);
        const expected = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', salt).update(rawBody).digest('hex');
        if (expected.length !== signature.length) {
            return false;
        }
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'));
    }
    async processWebhook(payload) {
        const body = payload;
        const paymentId = body?.id || body?.payment_request_id;
        const status = body?.status;
        if (!paymentId) {
            return {
                success: false,
                eventType: 'unknown',
                error: 'Missing payment id in webhook'
            };
        }
        const statusMap = {
            succeeded: 'succeeded',
            completed: 'completed',
            paid: 'completed',
            pending: 'pending',
            failed: 'failed',
            expired: 'expired',
            canceled: 'cancelled',
            cancelled: 'cancelled',
            partially_refunded: 'partially_refunded',
            refunded: 'refunded'
        };
        const normalizedStatus = status ? statusMap[status.toLowerCase()] || status : 'unknown';
        return {
            success: true,
            paymentId,
            eventType: 'payment_request.completed',
            status: normalizedStatus
        };
    }
    async refundPayment(paymentId, amount) {
        const apiKey = process.env.HITPAY_API_KEY;
        if (!apiKey) {
            return {
                refundId: '',
                status: 'failed',
                error: 'Hitpay: HITPAY_API_KEY is required'
            };
        }
        const base = getBaseUrl();
        const body = {
            payment_id: paymentId
        };
        if (amount != null && amount > 0) {
            body.amount = amount;
        }
        const res = await fetch(`${base}/v1/refund`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-BUSINESS-API-KEY': apiKey
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const text = await res.text();
            return {
                refundId: '',
                status: 'failed',
                error: `Hitpay refund failed: ${res.status} ${text}`
            };
        }
        const data = await res.json();
        return {
            refundId: data.id || '',
            status: data.status || 'succeeded',
            amountRefunded: data.amount_refunded
        };
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/factory.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Payment gateway factory
 * Returns the appropriate gateway implementation for the given provider.
 */ __turbopack_context__.s([
    "getPaymentGateway",
    ()=>getPaymentGateway
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$airwallex$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/airwallex.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$hitpay$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/hitpay.ts [app-route] (ecmascript)");
;
;
function getPaymentGateway(gateway) {
    switch(gateway){
        case 'AIRWALLEX':
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$airwallex$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AirwallexGateway"]();
        case 'HITPAY':
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$hitpay$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HitpayGateway"]();
        default:
            throw new Error(`Unsupported payment gateway: ${gateway}`);
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/chinese-gateways.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Enterprise Chinese Payment Gateway Integration
 * Multi-gateway system for Chinese market (CNY, Asia/Shanghai, PBOC compliance)
 *
 * Supported gateways:
 * - WeChat Pay (微信支付) - QR code Native payments
 * - Alipay (支付宝) - Page pay, mobile wallet
 * - UnionPay (银联) - Bank card payments
 * - Bank Transfer (银行转账) - B2B payments
 */ /** Asia/Shanghai timezone for all Chinese payment timing */ __turbopack_context__.s([
    "BANK_TRANSFER_CONFIG",
    ()=>BANK_TRANSFER_CONFIG,
    "CHINA_COUNTRY_CODE",
    ()=>CHINA_COUNTRY_CODE,
    "CHINESE_CURRENCY",
    ()=>CHINESE_CURRENCY,
    "CHINESE_ERROR_MESSAGES",
    ()=>CHINESE_ERROR_MESSAGES,
    "CHINESE_TIMEZONE",
    ()=>CHINESE_TIMEZONE,
    "PERFORMANCE_TARGETS",
    ()=>PERFORMANCE_TARGETS,
    "UNIONPAY_CONFIG",
    ()=>UNIONPAY_CONFIG,
    "cnyToFen",
    ()=>cnyToFen,
    "fenToCny",
    ()=>fenToCny,
    "formatAlipayAmount",
    ()=>formatAlipayAmount,
    "getChineseErrorMessage",
    ()=>getChineseErrorMessage,
    "isValidChineseAmount",
    ()=>isValidChineseAmount
]);
const CHINESE_TIMEZONE = 'Asia/Shanghai';
const CHINESE_CURRENCY = 'CNY';
const CHINA_COUNTRY_CODE = 'CN';
const PERFORMANCE_TARGETS = {
    PAYMENT_PROCESSING_MS: 2000,
    QR_CODE_GENERATION_MS: 1000,
    WEBHOOK_RESPONSE_MS: 500
};
const UNIONPAY_CONFIG = {
    DOMAIN: process.env.UNIONPAY_DOMAIN || 'https://gateway.95516.com',
    MERCHANT_ID: process.env.UNIONPAY_MERCHANT_ID,
    CURRENCY: CHINESE_CURRENCY,
    COUNTRY: CHINA_COUNTRY_CODE
};
const BANK_TRANSFER_CONFIG = {
    CURRENCY: CHINESE_CURRENCY,
    SUPPORTED_BANKS: [
        'ICBC',
        'CCB',
        'ABC',
        'BOC',
        'CMB'
    ],
    SETTLEMENT_DAYS: 1
};
const CHINESE_ERROR_MESSAGES = {
    // WeChat Pay
    WECHAT_PAY_INVALID_CONFIG: '微信支付配置错误，请联系客服',
    WECHAT_PAY_SIGN_FAILED: '微信支付签名验证失败',
    WECHAT_PAY_ORDER_FAILED: '微信支付下单失败，请稍后重试',
    WECHAT_PAY_QR_EXPIRED: '支付二维码已过期，请刷新后重试',
    WECHAT_PAY_USER_CANCEL: '用户已取消支付',
    // Alipay
    ALIPAY_INVALID_CONFIG: '支付宝配置错误，请联系客服',
    ALIPAY_SIGN_FAILED: '支付宝签名验证失败',
    ALIPAY_ORDER_FAILED: '支付宝下单失败，请稍后重试',
    ALIPAY_USER_CANCEL: '用户已取消支付',
    // UnionPay
    UNIONPAY_INVALID_CONFIG: '银联支付配置错误，请联系客服',
    UNIONPAY_ORDER_FAILED: '银联支付下单失败，请稍后重试',
    // Bank Transfer
    BANK_TRANSFER_INVALID: '银行转账信息无效',
    BANK_TRANSFER_PENDING: '银行转账处理中，请等待到账',
    // Generic
    PAYMENT_TIMEOUT: '支付超时，请重试',
    PAYMENT_AMOUNT_INVALID: '支付金额无效',
    PAYMENT_NETWORK_ERROR: '网络异常，请检查网络后重试',
    PAYMENT_SYSTEM_ERROR: '支付系统繁忙，请稍后重试',
    FRAUD_DETECTION: '交易存在风险，请联系客服核实',
    MFA_REQUIRED: '需要二次验证以完成支付'
};
function getChineseErrorMessage(key, fallback) {
    return CHINESE_ERROR_MESSAGES[key] ?? fallback ?? CHINESE_ERROR_MESSAGES.PAYMENT_SYSTEM_ERROR;
}
function isValidChineseAmount(amount) {
    return typeof amount === 'number' && amount >= 0.01 && amount < 1_000_000;
}
function cnyToFen(cny) {
    return Math.round(cny * 100);
}
function fenToCny(fen) {
    return fen / 100;
}
function formatAlipayAmount(cny) {
    return cny.toFixed(2);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/wechat-pay-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WECHAT_PAY_CONFIG",
    ()=>WECHAT_PAY_CONFIG,
    "WeChatPayClient",
    ()=>WeChatPayClient
]);
/**
 * Enterprise WeChat Pay SDK - Native QR Code Payments
 * API v3: https://pay.weixin.qq.com/docs/merchant/apis/native-payment/native-prepay.html
 *
 * Features:
 * - QR code generation for in-app payments (<1s target)
 * - SHA256-RSA signing (PBOC compliant)
 * - CNY (人民币) currency, CN country
 * - Chinese error messages
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/chinese-gateways.ts [app-route] (ecmascript)");
;
;
const WECHAT_PAY_CONFIG = {
    APP_ID: process.env.WECHAT_APP_ID,
    MCH_ID: process.env.WECHAT_MCH_ID,
    DOMAIN: 'https://api.mch.weixin.qq.com',
    SANDBOX_DOMAIN: 'https://api.mch.weixin.qq.com',
    CURRENCY: 'CNY',
    COUNTRY: 'CN'
};
function getWeChatPayDomain() {
    const env = process.env.WECHAT_PAY_ENV || 'production';
    return env === 'sandbox' ? WECHAT_PAY_CONFIG.SANDBOX_DOMAIN : WECHAT_PAY_CONFIG.DOMAIN;
}
function getPrivateKey() {
    const key = process.env.WECHAT_PAY_PRIVATE_KEY;
    if (!key) {
        throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_INVALID_CONFIG'));
    }
    return key.replace(/\\n/g, '\n');
}
function getApiV3Key() {
    const key = process.env.WECHAT_PAY_API_V3_KEY;
    if (!key) {
        throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_INVALID_CONFIG'));
    }
    return key;
}
/**
 * Build WeChat Pay v3 Authorization header (WECHATPAY2-SHA256-RSA2048)
 */ function buildAuthorization(method, url, body, privateKey) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(16).toString('hex');
    const message = `${method}\n${url}\n${timestamp}\n${nonce}\n${body}\n`;
    const sign = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createSign('RSA-SHA256').update(message).sign(privateKey, 'base64');
    return `WECHATPAY2-SHA256-RSA2048 mchid="${WECHAT_PAY_CONFIG.MCH_ID}",nonce_str="${nonce}",timestamp="${timestamp}",signature="${sign}"`;
}
/**
 * Verify WeChat Pay webhook signature (RSA-SHA256 with platform certificate)
 * Set WECHAT_PAY_PLATFORM_PUBLIC_KEY for production verification
 */ function verifyWebhookSignature(body, signature, timestamp, nonce) {
    const platformCert = process.env.WECHAT_PAY_PLATFORM_PUBLIC_KEY;
    if (!platformCert) {
        return true;
    }
    const publicKey = platformCert.replace(/\\n/g, '\n');
    const message = `${timestamp}\n${nonce}\n${body}\n`;
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createVerify('RSA-SHA256').update(message).verify(publicKey, signature, 'base64');
    } catch  {
        return false;
    }
}
/**
 * Decrypt WeChat Pay webhook resource (AES-256-GCM)
 */ function decryptWebhookResource(ciphertext, nonce, associatedData) {
    const apiV3Key = getApiV3Key();
    const key = Buffer.from(apiV3Key, 'utf8');
    const iv = Buffer.from(nonce, 'utf8');
    const authTag = Buffer.from(ciphertext.slice(-24), 'base64');
    const data = Buffer.from(ciphertext.slice(0, -24), 'base64');
    const decipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createDecipheriv('aes-256-gcm', key, iv, {
        authTagLength: 16
    });
    decipher.setAuthTag(authTag);
    decipher.setAAD(Buffer.from(associatedData, 'utf8'));
    return decipher.update(data) + decipher.final('utf8');
}
class WeChatPayClient {
    async createPayment(request) {
        const appId = WECHAT_PAY_CONFIG.APP_ID;
        const mchId = WECHAT_PAY_CONFIG.MCH_ID;
        if (!appId || !mchId) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_INVALID_CONFIG'));
        }
        const amount = request.amount;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidChineseAmount"])(amount)) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('PAYMENT_AMOUNT_INVALID'));
        }
        const outTradeNo = `T${Date.now()}${Math.random().toString(36).slice(2, 9)}`;
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3003") || '';
        const notifyUrl = process.env.WECHAT_PAY_NOTIFY_URL || `${baseUrl}/api/payments/webhooks/wechat-pay`;
        const body = {
            appid: appId,
            mchid: mchId,
            description: request.description.slice(0, 127),
            out_trade_no: outTradeNo,
            notify_url: notifyUrl,
            amount: {
                total: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cnyToFen"])(amount),
                currency: request.currency || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CHINESE_CURRENCY"]
            }
        };
        const path = '/v3/pay/transactions/native';
        const fullUrl = `${getWeChatPayDomain()}${path}`;
        const bodyStr = JSON.stringify(body);
        const privateKey = getPrivateKey();
        const auth = buildAuthorization('POST', path, bodyStr, privateKey);
        const startTime = Date.now();
        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'User-Agent': 'TutorMe-WeChatPay/1.0',
                Authorization: auth
            },
            body: bodyStr
        });
        if (Date.now() - startTime > 2000) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('PAYMENT_TIMEOUT'));
        }
        const data = await res.json();
        if (!res.ok || data.errcode || data.error_code) {
            const errMsg = data.errmsg || data.errcode || `HTTP ${res.status}`;
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_ORDER_FAILED', errMsg));
        }
        const codeUrl = data.code_url;
        if (!codeUrl) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_ORDER_FAILED'));
        }
        return {
            paymentId: outTradeNo,
            checkoutUrl: codeUrl,
            status: 'CREATED'
        };
    }
    verifyWebhook(payload, signature) {
        const headers = typeof payload === 'object' && payload !== null && 'headers' in payload ? payload.headers : null;
        const rawBody = typeof payload === 'object' && payload !== null && 'rawBody' in payload ? payload.rawBody : typeof payload === 'string' ? payload : JSON.stringify(payload);
        const wechatSignature = headers?.['wechatpay-signature'] ?? signature;
        const timestamp = headers?.['wechatpay-timestamp'] ?? '';
        const nonce = headers?.['wechatpay-nonce'] ?? '';
        const sigMatch = wechatSignature.match(/timestamp="([^"]+)",nonce="([^"]+)",signature="([^"]+)"/);
        if (!sigMatch) return false;
        const [, ts, n, sig] = sigMatch;
        return verifyWebhookSignature(rawBody, sig, ts, n);
    }
    async processWebhook(payload) {
        const body = payload;
        const eventType = body?.event_type || 'unknown';
        const resource = body?.resource;
        if (!resource?.ciphertext) {
            return {
                success: false,
                eventType,
                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_SIGN_FAILED')
            };
        }
        try {
            const decrypted = decryptWebhookResource(resource.ciphertext, resource.nonce || '', resource.associated_data || '');
            const data = JSON.parse(decrypted);
            const paymentId = data.out_trade_no;
            const tradeState = data.trade_state;
            const statusMap = {
                SUCCESS: 'completed',
                REFUND: 'refunded',
                NOTPAY: 'pending',
                CLOSED: 'cancelled',
                REVOKED: 'cancelled',
                USERPAYING: 'processing',
                PAYERROR: 'failed'
            };
            const status = tradeState ? statusMap[tradeState] || tradeState : 'unknown';
            return {
                success: true,
                paymentId: paymentId || '',
                eventType,
                status
            };
        } catch  {
            return {
                success: false,
                eventType,
                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_SIGN_FAILED')
            };
        }
    }
    async refundPayment(paymentId, amount) {
        const mchId = WECHAT_PAY_CONFIG.MCH_ID;
        if (!mchId) {
            return {
                refundId: '',
                status: 'failed',
                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_INVALID_CONFIG')
            };
        }
        const outRefundNo = `R${Date.now()}${Math.random().toString(36).slice(2, 9)}`;
        const body = {
            out_trade_no: paymentId,
            out_refund_no: outRefundNo,
            reason: '用户申请退款',
            amount: {
                refund: amount != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cnyToFen"])(amount) : undefined,
                total: amount != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cnyToFen"])(amount) : undefined,
                currency: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CHINESE_CURRENCY"]
            }
        };
        const path = '/v3/refund/domestic/refunds';
        const fullUrl = `${getWeChatPayDomain()}${path}`;
        const bodyStr = JSON.stringify(body);
        const privateKey = getPrivateKey();
        const auth = buildAuthorization('POST', path, bodyStr, privateKey);
        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: auth
            },
            body: bodyStr
        });
        const data = await res.json();
        if (!res.ok || data.errcode) {
            return {
                refundId: '',
                status: 'failed',
                error: data.errmsg || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('WECHAT_PAY_ORDER_FAILED')
            };
        }
        return {
            refundId: data.refund_id || outRefundNo,
            status: data.status || 'PROCESSING',
            amountRefunded: amount
        };
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/alipay-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALIPAY_CONFIG",
    ()=>ALIPAY_CONFIG,
    "AlipayClient",
    ()=>AlipayClient
]);
/**
 * Enterprise Alipay SDK - Page Pay & Mobile Wallet
 * https://opendocs.alipay.com/open/270/105898
 *
 * Features:
 * - PC web page payment (alipay.trade.page.pay)
 * - CNY (人民币), Asia/Shanghai timezone
 * - RSA2 (SHA256WithRSA) signing
 * - Chinese error messages
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/chinese-gateways.ts [app-route] (ecmascript)");
;
;
const ALIPAY_CONFIG = {
    APP_ID: process.env.ALIPAY_APP_ID,
    DOMAIN: 'https://openapi.alipay.com',
    SANDBOX_DOMAIN: 'https://openapi-sandbox.dl.alipaydev.com',
    CURRENCY: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CHINESE_CURRENCY"],
    TIMEZONE: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CHINESE_TIMEZONE"]
};
function getAlipayDomain() {
    const env = process.env.ALIPAY_ENV || 'production';
    return env === 'sandbox' ? ALIPAY_CONFIG.SANDBOX_DOMAIN : ALIPAY_CONFIG.DOMAIN;
}
function getPrivateKey() {
    const key = process.env.ALIPAY_PRIVATE_KEY;
    if (!key) {
        throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('ALIPAY_INVALID_CONFIG'));
    }
    return key.replace(/\\n/g, '\n');
}
/**
 * Build Alipay RSA2 signature
 */ function sign(params, privateKey) {
    const sortedKeys = Object.keys(params).sort();
    const signStr = sortedKeys.filter((k)=>params[k] !== '' && params[k] != null).map((k)=>`${k}=${params[k]}`).join('&');
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createSign('RSA-SHA256').update(signStr).sign(privateKey, 'base64');
}
/**
 * Verify Alipay webhook/return signature
 */ function verifySign(params, signature, publicKey) {
    const signType = params.sign_type || 'RSA2';
    if (signType !== 'RSA2') return false;
    const sortedKeys = Object.keys(params).filter((k)=>k !== 'sign' && k !== 'sign_type').sort();
    const signStr = sortedKeys.filter((k)=>params[k] !== '' && params[k] != null).map((k)=>`${k}=${params[k]}`).join('&');
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createVerify('RSA-SHA256').update(signStr).verify(publicKey, signature, 'base64');
    } catch  {
        return false;
    }
}
class AlipayClient {
    async createPayment(request) {
        const appId = ALIPAY_CONFIG.APP_ID;
        if (!appId) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('ALIPAY_INVALID_CONFIG'));
        }
        const amount = request.amount;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidChineseAmount"])(amount)) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('PAYMENT_AMOUNT_INVALID'));
        }
        const outTradeNo = `A${Date.now()}${Math.random().toString(36).slice(2, 9)}`;
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3003") || '';
        const returnUrl = request.successUrl ?? `${baseUrl}/payment/success`;
        const notifyUrl = process.env.ALIPAY_NOTIFY_URL || `${baseUrl}/api/payments/webhooks/alipay`;
        const bizContent = {
            out_trade_no: outTradeNo,
            total_amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAlipayAmount"])(amount),
            subject: request.description.slice(0, 256),
            product_code: 'FAST_INSTANT_TRADE_PAY'
        };
        const params = {
            app_id: appId,
            method: 'alipay.trade.page.pay',
            format: 'JSON',
            charset: 'utf-8',
            sign_type: 'RSA2',
            timestamp: new Date().toISOString().replace(/\\.\d{3}Z$/, 'Z'),
            version: '1.0',
            return_url: returnUrl,
            notify_url: notifyUrl,
            biz_content: JSON.stringify(bizContent)
        };
        const signature = sign(params, getPrivateKey());
        params.sign = signature;
        const gateway = `${getAlipayDomain()}/gateway.do`;
        const query = Object.entries(params).map(([k, v])=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
        const checkoutUrl = `${gateway}?${query}`;
        return {
            paymentId: outTradeNo,
            checkoutUrl,
            status: 'WAIT_BUYER_PAY'
        };
    }
    verifyWebhook(payload, signature) {
        const params = typeof payload === 'object' && payload !== null ? payload : {};
        const sig = params.sign ?? signature;
        const publicKey = process.env.ALIPAY_PUBLIC_KEY;
        if (!publicKey) return false;
        return verifySign(params, sig, publicKey.replace(/\\n/g, '\n'));
    }
    async processWebhook(payload) {
        const body = payload;
        const tradeStatus = body.trade_status;
        const outTradeNo = body.out_trade_no;
        if (!outTradeNo) {
            return {
                success: false,
                eventType: 'notify',
                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('ALIPAY_SIGN_FAILED')
            };
        }
        const statusMap = {
            WAIT_BUYER_PAY: 'pending',
            TRADE_CLOSED: 'cancelled',
            TRADE_SUCCESS: 'completed',
            TRADE_FINISHED: 'completed'
        };
        const status = tradeStatus ? statusMap[tradeStatus] || tradeStatus : 'unknown';
        return {
            success: true,
            paymentId: outTradeNo,
            eventType: 'trade.notify',
            status
        };
    }
    async refundPayment(paymentId, amount) {
        const appId = ALIPAY_CONFIG.APP_ID;
        if (!appId) {
            return {
                refundId: '',
                status: 'failed',
                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('ALIPAY_INVALID_CONFIG')
            };
        }
        const refundNo = `R${Date.now()}${Math.random().toString(36).slice(2, 9)}`;
        const bizContent = {
            out_trade_no: paymentId,
            refund_amount: amount != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatAlipayAmount"])(amount) : '0',
            out_request_no: refundNo
        };
        const params = {
            app_id: appId,
            method: 'alipay.trade.refund',
            format: 'JSON',
            charset: 'utf-8',
            sign_type: 'RSA2',
            timestamp: new Date().toISOString().replace(/\\.\d{3}Z$/, 'Z'),
            version: '1.0',
            biz_content: JSON.stringify(bizContent)
        };
        const signature = sign(params, getPrivateKey());
        params.sign = signature;
        const gateway = `${getAlipayDomain()}/gateway.do`;
        const query = Object.entries(params).map(([k, v])=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
        const startTime = Date.now();
        const res = await fetch(gateway, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: query
        });
        if (Date.now() - startTime > 2000) {
            return {
                refundId: '',
                status: 'failed',
                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('PAYMENT_TIMEOUT')
            };
        }
        const data = await res.json();
        const resp = data.alipay_trade_refund_response;
        if (!resp || resp.code !== '10000') {
            return {
                refundId: '',
                status: 'failed',
                error: resp?.sub_code || resp?.msg || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChineseErrorMessage"])('ALIPAY_ORDER_FAILED')
            };
        }
        return {
            refundId: refundNo,
            status: 'completed',
            amountRefunded: amount
        };
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$airwallex$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/airwallex.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$hitpay$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/hitpay.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$factory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/factory.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$chinese$2d$gateways$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/chinese-gateways.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$wechat$2d$pay$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/wechat-pay-client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$alipay$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/alipay-client.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/classes/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
/**
 * Classes API
 * GET /api/classes — list upcoming classes / my bookings (withAuth)
 * POST /api/classes — book a class (withAuth + CSRF)
 * DELETE /api/classes — cancel booking (withAuth + CSRF)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/api/middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$factory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/payments/factory.ts [app-route] (ecmascript)");
;
;
;
;
async function getHandler(req, session) {
    try {
        const { searchParams } = new URL(req.url);
        const myBookings = searchParams.get('myBookings') === 'true';
        const limit = parseInt(searchParams.get('limit') || '10');
        const subjectParam = searchParams.get('subject')?.trim() || null;
        let classes;
        if (myBookings) {
            // Get classes the user has booked (optionally filtered by subject)
            const bookingsWhere = {
                studentId: session.user.id
            };
            if (subjectParam) {
                bookingsWhere.clinic = {
                    subject: {
                        equals: subjectParam,
                        mode: 'insensitive'
                    }
                };
            }
            const bookings = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].clinicBooking.findMany({
                where: bookingsWhere,
                include: {
                    payment: {
                        select: {
                            id: true,
                            status: true,
                            gatewayCheckoutUrl: true
                        }
                    },
                    clinic: {
                        include: {
                            tutor: {
                                select: {
                                    id: true,
                                    profile: {
                                        select: {
                                            name: true,
                                            avatarUrl: true,
                                            hourlyRate: true
                                        }
                                    }
                                }
                            },
                            _count: {
                                select: {
                                    bookings: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    clinic: {
                        startTime: 'asc'
                    }
                },
                take: limit
            });
            classes = bookings.map((booking)=>{
                const clinic = booking.clinic;
                const hourlyRate = clinic.tutor?.profile?.hourlyRate ?? 0;
                const price = clinic.requiresPayment && hourlyRate > 0 ? Math.round(hourlyRate * (clinic.duration / 60) * 100) / 100 : null;
                const paymentStatus = booking.payment?.status ?? null;
                return {
                    ...clinic,
                    isBooked: true,
                    bookingId: booking.id,
                    currentBookings: clinic._count.bookings,
                    price,
                    requiresPayment: clinic.requiresPayment ?? false,
                    paymentStatus,
                    paymentCheckoutUrl: booking.payment?.gatewayCheckoutUrl ?? null
                };
            });
        } else {
            // Get upcoming classes (optionally filtered by subject)
            const now = new Date();
            const where = {
                startTime: {
                    gte: now
                },
                status: {
                    in: [
                        'scheduled',
                        'live'
                    ]
                }
            };
            if (subjectParam) {
                where.subject = {
                    equals: subjectParam,
                    mode: 'insensitive'
                };
            }
            classes = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].clinic.findMany({
                where,
                include: {
                    tutor: {
                        select: {
                            id: true,
                            profile: {
                                select: {
                                    name: true,
                                    avatarUrl: true,
                                    hourlyRate: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            bookings: true
                        }
                    },
                    bookings: {
                        where: {
                            studentId: session.user.id
                        },
                        select: {
                            id: true
                        }
                    }
                },
                orderBy: {
                    startTime: 'asc'
                },
                take: limit
            });
            classes = classes.map((cls)=>{
                const hourlyRate = cls.tutor?.profile?.hourlyRate ?? 0;
                const price = cls.requiresPayment && hourlyRate > 0 ? Math.round(hourlyRate * (cls.duration / 60) * 100) / 100 : null;
                return {
                    ...cls,
                    isBooked: cls.bookings.length > 0,
                    currentBookings: cls._count.bookings,
                    price
                };
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            classes
        });
    } catch (error) {
        console.error('Failed to fetch classes:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch classes'
        }, {
            status: 500
        });
    }
}
async function postHandler(req, session) {
    const csrfError = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireCsrf"])(req);
    if (csrfError) return csrfError;
    const { response: rateLimitResponse } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withRateLimitPreset"])(req, 'booking');
    if (rateLimitResponse) return rateLimitResponse;
    try {
        const body = await req.json().catch(()=>({}));
        const classId = typeof body.classId === 'string' ? body.classId.trim() : '';
        if (!classId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Class ID required'
            }, {
                status: 400
            });
        }
        // Check if class exists and has space
        const classItem = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].clinic.findUnique({
            where: {
                id: classId
            },
            include: {
                tutor: {
                    include: {
                        profile: true
                    }
                },
                _count: {
                    select: {
                        bookings: true
                    }
                }
            }
        });
        if (!classItem) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Class not found'
            }, {
                status: 404
            });
        }
        if (classItem.status !== 'scheduled') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Class is not open for booking'
            }, {
                status: 400
            });
        }
        if (classItem._count.bookings >= classItem.maxStudents) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Class is full'
            }, {
                status: 400
            });
        }
        // Check if already booked
        const existingBooking = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].clinicBooking.findFirst({
            where: {
                clinicId: classId,
                studentId: session.user.id
            }
        });
        if (existingBooking) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Already booked this class'
            }, {
                status: 400
            });
        }
        const requiresPayment = Boolean(classItem.requiresPayment);
        // Create booking
        const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].clinicBooking.create({
            data: {
                clinicId: classId,
                studentId: session.user.id,
                requiresPayment
            },
            include: {
                clinic: {
                    include: {
                        tutor: {
                            select: {
                                profile: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!requiresPayment) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                booking,
                message: `Booked ${classItem.title} with ${booking.clinic.tutor.profile?.name || 'Tutor'}`
            });
        }
        // Paid class: create payment and return checkout URL
        const hourlyRate = classItem.tutor.profile?.hourlyRate ?? 0;
        if (hourlyRate <= 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].clinicBooking.update({
                where: {
                    id: booking.id
                },
                data: {
                    requiresPayment: false
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                booking,
                message: `Booked ${classItem.title} with ${booking.clinic.tutor.profile?.name || 'Tutor'}`
            });
        }
        const durationHours = classItem.duration / 60;
        const amount = Math.round(hourlyRate * durationHours * 100) / 100;
        const tutorProfile = classItem.tutor.profile;
        const currency = tutorProfile?.currency || 'SGD';
        const preferredGateway = tutorProfile?.paymentGatewayPreference;
        const gatewayName = preferredGateway === 'AIRWALLEX' || preferredGateway === 'HITPAY' ? preferredGateway : process.env.PAYMENT_DEFAULT_GATEWAY || 'HITPAY';
        const gateway = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$payments$2f$factory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPaymentGateway"])(gatewayName);
        const studentEmail = session.user.email ?? '';
        const paymentResponse = await gateway.createPayment({
            amount,
            currency,
            bookingId: booking.id,
            studentEmail: studentEmail || '',
            description: `${classItem.title} - ${classItem.subject}`,
            metadata: {
                clinicId: classItem.id,
                clinicTitle: classItem.title
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].payment.create({
            data: {
                bookingId: booking.id,
                amount,
                currency,
                status: 'PENDING',
                gateway: gatewayName,
                gatewayPaymentId: paymentResponse.paymentId,
                gatewayCheckoutUrl: paymentResponse.checkoutUrl
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            requiresPayment: true,
            booking,
            checkoutUrl: paymentResponse.checkoutUrl,
            message: 'Booking created. Complete payment to confirm your spot.'
        });
    } catch (error) {
        console.error('Failed to book class:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to book class'
        }, {
            status: 500
        });
    }
}
async function deleteHandler(req, session) {
    const csrfError = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireCsrf"])(req);
    if (csrfError) return csrfError;
    try {
        const body = await req.json().catch(()=>({}));
        const bookingId = typeof body.bookingId === 'string' ? body.bookingId.trim() : '';
        if (!bookingId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Booking ID required'
            }, {
                status: 400
            });
        }
        // Verify the booking belongs to this user
        const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].clinicBooking.findFirst({
            where: {
                id: bookingId,
                studentId: session.user.id
            },
            include: {
                clinic: true
            }
        });
        if (!booking) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Booking not found'
            }, {
                status: 404
            });
        }
        // Check if class is in the past
        if (new Date(booking.clinic.startTime) < new Date()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Cannot cancel past class'
            }, {
                status: 400
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].clinicBooking.delete({
            where: {
                id: bookingId
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Booking cancelled'
        });
    } catch (error) {
        console.error('Failed to cancel booking:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to cancel booking'
        }, {
            status: 500
        });
    }
}
const GET = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(getHandler);
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(postHandler);
const DELETE = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(deleteHandler);
}),
];

//# debugId=0b02627f-018c-5fa6-83fb-b3c9f1c8adcd
//# sourceMappingURL=%5Broot-of-the-server%5D__279936c3._.js.map