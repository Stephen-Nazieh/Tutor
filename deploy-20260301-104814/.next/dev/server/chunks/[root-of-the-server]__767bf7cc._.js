;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="902a1c8d-3812-1615-ede7-e8594ea9ff5c")}catch(e){}}();
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/activity-log.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVITY_EVENTS",
    ()=>ACTIVITY_EVENTS,
    "calculateEngagementScore",
    ()=>calculateEngagementScore,
    "getActivityCounts",
    ()=>getActivityCounts,
    "getRecentActivities",
    ()=>getRecentActivities,
    "getStreakHistory",
    ()=>getStreakHistory,
    "logActivity",
    ()=>logActivity
]);
/**
 * Activity Log Service
 * 
 * Tracks user activities for analytics and retention insights
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
;
const ACTIVITY_EVENTS = {
    // XP & Leveling
    XP_EARNED: 'xp_earned',
    LEVEL_UP: 'level_up',
    // Streaks
    STREAK_UPDATED: 'streak_updated',
    STREAK_BROKEN: 'streak_broken',
    // Worlds & Missions
    WORLD_UNLOCK: 'world_unlock',
    MISSION_START: 'mission_start',
    MISSION_COMPLETE: 'mission_complete',
    MISSION_ABANDON: 'mission_abandon',
    // Skills
    CONFIDENCE_MILESTONE: 'confidence_milestone',
    SKILL_IMPROVEMENT: 'skill_improvement',
    // AI Tutor
    AI_SESSION_START: 'ai_session_start',
    AI_SESSION_END: 'ai_session_end',
    PERSONALITY_SWITCH: 'personality_switch',
    // Learning
    LESSON_COMPLETE: 'lesson_complete',
    QUIZ_COMPLETE: 'quiz_complete',
    // Subscription
    SUBSCRIPTION_UPGRADE: 'subscription_upgrade',
    SUBSCRIPTION_DOWNGRADE: 'subscription_downgrade',
    // Engagement
    DAILY_LOGIN: 'daily_login',
    QUEST_COMPLETE: 'quest_complete'
};
async function logActivity(userId, eventType, metadata) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userActivityLog.create({
            data: {
                userId,
                eventType,
                metadata: metadata || {}
            }
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
}
async function getRecentActivities(userId, limit = 20, eventTypes) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userActivityLog.findMany({
        where: {
            userId,
            ...eventTypes && {
                eventType: {
                    in: eventTypes
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    });
}
async function getActivityCounts(userId, startDate, endDate) {
    const activities = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userActivityLog.groupBy({
        by: [
            'eventType'
        ],
        where: {
            userId,
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        },
        _count: {
            eventType: true
        }
    });
    const result = {};
    activities.forEach((item)=>{
        result[item.eventType] = item._count.eventType;
    });
    return result;
}
async function getStreakHistory(userId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const activities = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userActivityLog.findMany({
        where: {
            userId,
            eventType: {
                in: [
                    'daily_login',
                    'streak_updated',
                    'streak_broken'
                ]
            },
            createdAt: {
                gte: startDate
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    return activities;
}
async function calculateEngagementScore(userId) {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const activities = await getActivityCounts(userId, last7Days, new Date());
    // Simple scoring algorithm
    let score = 0;
    // Daily login (up to 30 points)
    score += Math.min(30, (activities['daily_login'] || 0) * 5);
    // Mission completion (up to 40 points)
    score += Math.min(40, (activities['mission_complete'] || 0) * 10);
    // AI sessions (up to 20 points)
    score += Math.min(20, (activities['ai_session_end'] || 0) * 5);
    // Skill improvement (up to 10 points)
    score += Math.min(10, (activities['skill_improvement'] || 0) * 2);
    return Math.min(100, score);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVATAR_PERSONALITIES",
    ()=>AVATAR_PERSONALITIES,
    "XP_REWARDS",
    ()=>XP_REWARDS,
    "awardXp",
    ()=>awardXp,
    "calculateLevel",
    ()=>calculateLevel,
    "canAccessWorld",
    ()=>canAccessWorld,
    "checkDailyLogin",
    ()=>checkDailyLogin,
    "getGamificationSummary",
    ()=>getGamificationSummary,
    "getLevelProgress",
    ()=>getLevelProgress,
    "getOrCreateGamification",
    ()=>getOrCreateGamification,
    "getXpForNextLevel",
    ()=>getXpForNextLevel,
    "unlockWorld",
    ()=>unlockWorld,
    "updateSkillScores",
    ()=>updateSkillScores,
    "updateStreak",
    ()=>updateStreak
]);
/**
 * Gamification Service
 * 
 * Handles XP, Level, Streak, and Skill Score calculations
 * Merged Socratic teaching with Gamified Avatar personalities
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/activity-log.ts [app-route] (ecmascript)");
;
;
// XP required for each level (exponential growth)
const XP_LEVELS = {
    1: 0,
    2: 200,
    3: 500,
    4: 1000,
    5: 1800,
    6: 3000,
    7: 4600,
    8: 6600,
    9: 9100,
    10: 12100,
    11: 15600,
    12: 19600,
    13: 24100,
    14: 29100,
    15: 34600,
    16: 40600,
    17: 47100,
    18: 54100,
    19: 61600,
    20: 69600
};
const XP_REWARDS = {
    COMPLETE_MISSION: 50,
    PERFECT_QUIZ: 20,
    DAILY_LOGIN: 10,
    STREAK_3_DAYS: 50,
    STREAK_7_DAYS: 150,
    STREAK_30_DAYS: 500,
    SPEAKING_PRACTICE: 30,
    AI_CONVERSATION: 40,
    COMPLETE_LESSON: 40,
    FIRST_MISSION: 100
};
const AVATAR_PERSONALITIES = {
    friendly_mentor: {
        id: 'friendly_mentor',
        name: 'Friendly Mentor',
        description: 'Warm, supportive, and encouraging',
        tone: 'warm and supportive',
        usesEmojis: true,
        correctionStyle: 'gentle',
        encouragement: 'frequent',
        socraticBalance: 0.6,
        voiceStyle: 'encouraging',
        examplePhrases: {
            greeting: "Hey there! I'm so excited to learn with you today!",
            correction: "Almost perfect! Here's a slightly smoother way to say that:",
            encouragement: "You're doing amazing! I can see your confidence growing!",
            socraticPrompt: "That's a great start! What do you think would happen if...?"
        }
    },
    strict_coach: {
        id: 'strict_coach',
        name: 'Strict Coach',
        description: 'Professional, direct, and disciplined',
        tone: 'professional and direct',
        usesEmojis: false,
        correctionStyle: 'immediate',
        encouragement: 'achievement-based',
        socraticBalance: 0.4,
        voiceStyle: 'authoritative',
        examplePhrases: {
            greeting: "Let's begin. Today's focus is clear communication.",
            correction: "Correction: Use present perfect with 'for' + duration.",
            encouragement: "Good. Your accuracy improved by 15% this week.",
            socraticPrompt: "Consider this: what is the core issue in your sentence?"
        }
    },
    corporate_trainer: {
        id: 'corporate_trainer',
        name: 'Corporate Trainer',
        description: 'Business-focused and performance-oriented',
        tone: 'business professional',
        usesEmojis: false,
        correctionStyle: 'constructive',
        encouragement: 'performance-focused',
        socraticBalance: 0.5,
        voiceStyle: 'professional',
        examplePhrases: {
            greeting: "Welcome. Let's work on your professional communication skills.",
            correction: "In a business context, consider this phrasing instead:",
            encouragement: "Your professional articulation is showing measurable improvement.",
            socraticPrompt: "From a stakeholder perspective, how would you frame this?"
        }
    },
    funny_teacher: {
        id: 'funny_teacher',
        name: 'Funny Teacher',
        description: 'Light, humorous, and engaging',
        tone: 'light and humorous',
        usesEmojis: true,
        correctionStyle: 'playful',
        encouragement: 'enthusiastic',
        socraticBalance: 0.7,
        voiceStyle: 'friendly',
        examplePhrases: {
            greeting: "Ready to level up your English? Let's make some grammar magic!",
            correction: "Oops! Let's give that sentence a little makeover!",
            encouragement: "Boom! You're crushing it! High five!",
            socraticPrompt: "Ooh, interesting! But what if we looked at it this way...?"
        }
    },
    calm_professor: {
        id: 'calm_professor',
        name: 'Calm Professor',
        description: 'Patient, thoughtful, and explanatory',
        tone: 'patient and thoughtful',
        usesEmojis: false,
        correctionStyle: 'explanatory',
        encouragement: 'steady',
        socraticBalance: 0.8,
        voiceStyle: 'calm',
        examplePhrases: {
            greeting: "Welcome. Take your time, and let's explore this together.",
            correction: "I see your thought process. Let's refine it gently:",
            encouragement: "Your progress is steady and meaningful. Well done.",
            socraticPrompt: "That's an interesting approach. What led you to that conclusion?"
        }
    }
};
async function getOrCreateGamification(userId) {
    let gamification = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.findUnique({
        where: {
            userId
        }
    });
    if (!gamification) {
        gamification = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.create({
            data: {
                userId,
                level: 1,
                xp: 0,
                streakDays: 0,
                longestStreak: 0
            }
        });
    }
    return gamification;
}
function calculateLevel(xp) {
    let level = 1;
    for(let i = 1; i <= 20; i++){
        if (xp >= XP_LEVELS[i]) {
            level = i;
        } else {
            break;
        }
    }
    return level;
}
function getXpForNextLevel(currentLevel) {
    return XP_LEVELS[currentLevel + 1] || XP_LEVELS[20] * 2;
}
function getLevelProgress(xp, level) {
    const currentLevelXp = XP_LEVELS[level];
    const nextLevelXp = XP_LEVELS[level + 1] || XP_LEVELS[20] * 2;
    const xpInLevel = xp - currentLevelXp;
    const xpNeeded = nextLevelXp - currentLevelXp;
    return Math.min(100, Math.round(xpInLevel / xpNeeded * 100));
}
async function awardXp(userId, amount, source, metadata) {
    const gamification = await getOrCreateGamification(userId);
    const newXp = gamification.xp + amount;
    const newLevel = calculateLevel(newXp);
    const leveledUp = newLevel > gamification.level;
    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.update({
        where: {
            userId
        },
        data: {
            xp: newXp,
            level: newLevel
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'XP_EARNED', {
        amount,
        source,
        newTotal: newXp,
        leveledUp,
        ...metadata
    });
    return {
        ...updated,
        xpEarned: amount,
        leveledUp,
        previousLevel: gamification.level
    };
}
async function updateStreak(userId) {
    const gamification = await getOrCreateGamification(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastActive = gamification.lastActiveDate ? new Date(gamification.lastActiveDate) : null;
    let newStreak = gamification.streakDays;
    let streakBonus = 0;
    let streakContinued = false;
    let streakBroken = false;
    if (lastActive) {
        lastActive.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            newStreak += 1;
            streakContinued = true;
            if (newStreak === 3) streakBonus = XP_REWARDS.STREAK_3_DAYS;
            else if (newStreak === 7) streakBonus = XP_REWARDS.STREAK_7_DAYS;
            else if (newStreak === 30) streakBonus = XP_REWARDS.STREAK_30_DAYS;
        } else if (diffDays === 0) {
            streakContinued = true;
        } else {
            streakBroken = true;
            newStreak = 1;
        }
    } else {
        newStreak = 1;
    }
    const longestStreak = Math.max(gamification.longestStreak, newStreak);
    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.update({
        where: {
            userId
        },
        data: {
            streakDays: newStreak,
            longestStreak,
            lastActiveDate: today
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])(userId, streakBroken ? 'STREAK_BROKEN' : 'STREAK_UPDATED', {
        streakDays: newStreak,
        previousStreak: gamification.streakDays,
        streakBroken,
        streakContinued
    });
    return {
        ...updated,
        streakBonus,
        streakContinued,
        streakBroken
    };
}
async function checkDailyLogin(userId) {
    const gamification = await getOrCreateGamification(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastActive = gamification.lastActiveDate ? new Date(gamification.lastActiveDate) : null;
    if (!lastActive || lastActive.getTime() !== today.getTime()) {
        const streakResult = await updateStreak(userId);
        const xpResult = await awardXp(userId, XP_REWARDS.DAILY_LOGIN, 'daily_login');
        return {
            firstLoginToday: true,
            xpEarned: xpResult.xpEarned + streakResult.streakBonus,
            streakBonus: streakResult.streakBonus,
            streakDays: streakResult.streakDays,
            leveledUp: xpResult.leveledUp
        };
    }
    return {
        firstLoginToday: false,
        streakDays: gamification.streakDays
    };
}
async function updateSkillScores(userId, scores) {
    const gamification = await getOrCreateGamification(userId);
    const calculateScore = (existing, newScore)=>{
        if (newScore === undefined) return existing;
        return Math.round(existing * 0.7 + newScore * 0.3);
    };
    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.update({
        where: {
            userId
        },
        data: {
            grammarScore: calculateScore(gamification.grammarScore, scores.grammar),
            vocabularyScore: calculateScore(gamification.vocabularyScore, scores.vocabulary),
            speakingScore: calculateScore(gamification.speakingScore, scores.speaking),
            listeningScore: calculateScore(gamification.listeningScore, scores.listening),
            confidenceScore: calculateScore(gamification.confidenceScore, scores.confidence),
            fluencyScore: calculateScore(gamification.fluencyScore, scores.fluency)
        }
    });
    if (scores.confidence && scores.confidence > gamification.confidenceScore + 5) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'CONFIDENCE_MILESTONE', {
            previousScore: gamification.confidenceScore,
            newScore: updated.confidenceScore,
            delta: updated.confidenceScore - gamification.confidenceScore
        });
    }
    return updated;
}
async function getGamificationSummary(userId) {
    const gamification = await getOrCreateGamification(userId);
    const nextLevelXp = getXpForNextLevel(gamification.level);
    const currentLevelXp = XP_LEVELS[gamification.level];
    const progress = getLevelProgress(gamification.xp, gamification.level);
    return {
        level: gamification.level,
        xp: gamification.xp,
        nextLevelXp,
        currentLevelXp,
        progress,
        xpToNextLevel: nextLevelXp - gamification.xp,
        streakDays: gamification.streakDays,
        longestStreak: gamification.longestStreak,
        skills: {
            grammar: gamification.grammarScore,
            vocabulary: gamification.vocabularyScore,
            speaking: gamification.speakingScore,
            listening: gamification.listeningScore,
            confidence: gamification.confidenceScore,
            fluency: gamification.fluencyScore
        },
        unlockedWorlds: gamification.unlockedWorlds
    };
}
async function unlockWorld(userId, worldId) {
    const gamification = await getOrCreateGamification(userId);
    const current = gamification.unlockedWorlds ?? [];
    if (!current.includes(worldId)) {
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.update({
            where: {
                userId
            },
            data: {
                unlockedWorlds: [
                    ...current,
                    worldId
                ]
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'WORLD_UNLOCK', {
            worldId
        });
        return {
            unlocked: true,
            updated
        };
    }
    return {
        unlocked: false
    };
}
async function canAccessWorld(userId, requiredLevel) {
    const gamification = await getOrCreateGamification(userId);
    return gamification.level >= requiredLevel;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/badges.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BADGE_DEFINITIONS",
    ()=>BADGE_DEFINITIONS,
    "awardBadge",
    ()=>awardBadge,
    "checkAndAwardBadges",
    ()=>checkAndAwardBadges,
    "getAllBadgesWithProgress",
    ()=>getAllBadgesWithProgress,
    "getBadgeStats",
    ()=>getBadgeStats,
    "getUserBadges",
    ()=>getUserBadges,
    "initializeBadges",
    ()=>initializeBadges
]);
/**
 * Badge System
 * 
 * Defines all badges, their requirements, and handles badge awarding
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/activity-log.ts [app-route] (ecmascript)");
;
;
;
const BADGE_DEFINITIONS = [
    // === GENERAL BADGES ===
    {
        key: 'first_steps',
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: 'footprints',
        color: '#22c55e',
        category: 'general',
        rarity: 'common',
        xpBonus: 50,
        requirement: {
            type: 'complete_lessons',
            count: 1
        },
        order: 1
    },
    {
        key: 'quick_learner',
        name: 'Quick Learner',
        description: 'Complete 10 lessons',
        icon: 'zap',
        color: '#3b82f6',
        category: 'general',
        rarity: 'common',
        xpBonus: 100,
        requirement: {
            type: 'complete_lessons',
            count: 10
        },
        order: 2
    },
    {
        key: 'knowledge_seeker',
        name: 'Knowledge Seeker',
        description: 'Complete 50 lessons',
        icon: 'book-open',
        color: '#8b5cf6',
        category: 'general',
        rarity: 'rare',
        xpBonus: 250,
        requirement: {
            type: 'complete_lessons',
            count: 50
        },
        order: 3
    },
    {
        key: 'master_scholar',
        name: 'Master Scholar',
        description: 'Complete 100 lessons',
        icon: 'graduation-cap',
        color: '#f59e0b',
        category: 'general',
        rarity: 'epic',
        xpBonus: 500,
        requirement: {
            type: 'complete_lessons',
            count: 100
        },
        order: 4
    },
    // === STREAK BADGES ===
    {
        key: 'streak_3',
        name: 'On Fire',
        description: 'Maintain a 3-day learning streak',
        icon: 'flame',
        color: '#f97316',
        category: 'streak',
        rarity: 'common',
        xpBonus: 100,
        requirement: {
            type: 'streak_days',
            days: 3
        },
        order: 10
    },
    {
        key: 'streak_7',
        name: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        icon: 'flame',
        color: '#ef4444',
        category: 'streak',
        rarity: 'rare',
        xpBonus: 250,
        requirement: {
            type: 'streak_days',
            days: 7
        },
        order: 11
    },
    {
        key: 'streak_30',
        name: 'Monthly Master',
        description: 'Maintain a 30-day learning streak',
        icon: 'crown',
        color: '#eab308',
        category: 'streak',
        rarity: 'epic',
        xpBonus: 1000,
        requirement: {
            type: 'streak_days',
            days: 30
        },
        order: 12
    },
    {
        key: 'streak_100',
        name: 'Centurion',
        description: 'Maintain a 100-day learning streak',
        icon: 'medal',
        color: '#6366f1',
        category: 'streak',
        rarity: 'legendary',
        xpBonus: 5000,
        requirement: {
            type: 'streak_days',
            days: 100
        },
        order: 13
    },
    // === QUIZ BADGES ===
    {
        key: 'first_quiz',
        name: 'Quiz Taker',
        description: 'Complete your first quiz',
        icon: 'help-circle',
        color: '#10b981',
        category: 'quiz',
        rarity: 'common',
        xpBonus: 50,
        requirement: {
            type: 'complete_quizzes',
            count: 1
        },
        order: 20
    },
    {
        key: 'quiz_pro',
        name: 'Quiz Pro',
        description: 'Complete 20 quizzes',
        icon: 'check-circle',
        color: '#3b82f6',
        category: 'quiz',
        rarity: 'common',
        xpBonus: 150,
        requirement: {
            type: 'complete_quizzes',
            count: 20
        },
        order: 21
    },
    {
        key: 'perfect_score',
        name: 'Perfect Score',
        description: 'Score 100% on a quiz',
        icon: 'star',
        color: '#f59e0b',
        category: 'quiz',
        rarity: 'rare',
        xpBonus: 200,
        requirement: {
            type: 'perfect_quiz',
            count: 1
        },
        order: 22
    },
    {
        key: 'quiz_master',
        name: 'Quiz Master',
        description: 'Complete 50 quizzes with 80%+ average',
        icon: 'trophy',
        color: '#8b5cf6',
        category: 'quiz',
        rarity: 'epic',
        xpBonus: 500,
        requirement: {
            type: 'complete_quizzes_expert',
            count: 50,
            score: 80
        },
        order: 23
    },
    // === SOCIAL BADGES ===
    {
        key: 'social_butterfly',
        name: 'Social Butterfly',
        description: 'Join 5 live sessions',
        icon: 'users',
        color: '#ec4899',
        category: 'social',
        rarity: 'common',
        xpBonus: 100,
        requirement: {
            type: 'join_sessions',
            count: 5
        },
        order: 30
    },
    {
        key: 'active_participant',
        name: 'Active Participant',
        description: 'Send 50 messages in live sessions',
        icon: 'message-circle',
        color: '#06b6d4',
        category: 'social',
        rarity: 'rare',
        xpBonus: 200,
        requirement: {
            type: 'send_messages',
            count: 50
        },
        order: 31
    },
    {
        key: 'study_group_hero',
        name: 'Study Group Hero',
        description: 'Join or create 3 study groups',
        icon: 'users-round',
        color: '#84cc16',
        category: 'social',
        rarity: 'rare',
        xpBonus: 300,
        requirement: {
            type: 'join_groups',
            count: 3
        },
        order: 32
    },
    // === MASTERY BADGES ===
    {
        key: 'level_5',
        name: 'Rising Star',
        description: 'Reach level 5',
        icon: 'rocket',
        color: '#f97316',
        category: 'mastery',
        rarity: 'common',
        xpBonus: 200,
        requirement: {
            type: 'reach_level',
            level: 5
        },
        order: 40
    },
    {
        key: 'level_10',
        name: 'Expert Learner',
        description: 'Reach level 10',
        icon: 'award',
        color: '#3b82f6',
        category: 'mastery',
        rarity: 'rare',
        xpBonus: 500,
        requirement: {
            type: 'reach_level',
            level: 10
        },
        order: 41
    },
    {
        key: 'level_20',
        name: 'Grandmaster',
        description: 'Reach level 20',
        icon: 'crown',
        color: '#eab308',
        category: 'mastery',
        rarity: 'epic',
        xpBonus: 2000,
        requirement: {
            type: 'reach_level',
            level: 20
        },
        order: 42
    },
    {
        key: 'xp_10000',
        name: 'XP Hunter',
        description: 'Earn 10,000 total XP',
        icon: 'target',
        color: '#8b5cf6',
        category: 'mastery',
        rarity: 'rare',
        xpBonus: 500,
        requirement: {
            type: 'earn_xp',
            count: 10000
        },
        order: 43
    },
    // === SECRET BADGES ===
    {
        key: 'night_owl',
        name: 'Night Owl',
        description: 'Complete a lesson between midnight and 5 AM',
        icon: 'moon',
        color: '#6366f1',
        category: 'general',
        rarity: 'rare',
        xpBonus: 150,
        requirement: {
            type: 'night_study'
        },
        isSecret: true,
        order: 50
    },
    {
        key: 'early_bird',
        name: 'Early Bird',
        description: 'Complete a lesson before 7 AM',
        icon: 'sunrise',
        color: '#f59e0b',
        category: 'general',
        rarity: 'rare',
        xpBonus: 150,
        requirement: {
            type: 'morning_study'
        },
        isSecret: true,
        order: 51
    }
];
async function initializeBadges() {
    for (const badge of BADGE_DEFINITIONS){
        await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].badge.upsert({
            where: {
                key: badge.key
            },
            update: {
                name: badge.name,
                description: badge.description,
                icon: badge.icon,
                color: badge.color,
                category: badge.category,
                rarity: badge.rarity,
                xpBonus: badge.xpBonus,
                requirement: badge.requirement,
                isSecret: badge.isSecret ?? false,
                order: badge.order
            },
            create: {
                key: badge.key,
                name: badge.name,
                description: badge.description,
                icon: badge.icon,
                color: badge.color,
                category: badge.category,
                rarity: badge.rarity,
                xpBonus: badge.xpBonus,
                requirement: badge.requirement,
                isSecret: badge.isSecret ?? false,
                order: badge.order
            }
        });
    }
    console.log(`[Badges] Initialized ${BADGE_DEFINITIONS.length} badges`);
}
async function awardBadge(userId, badgeKey) {
    const badge = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].badge.findUnique({
        where: {
            key: badgeKey
        }
    });
    if (!badge) {
        throw new Error(`Badge not found: ${badgeKey}`);
    }
    // Check if user already has this badge
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userBadge.findFirst({
        where: {
            userId,
            badgeId: badge.id
        }
    });
    if (existing) {
        return {
            awarded: false,
            alreadyHad: true
        };
    }
    // Award the badge
    const userBadge = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userBadge.create({
        data: {
            userId,
            badgeId: badge.id,
            earnedAt: new Date()
        },
        include: {
            badge: true
        }
    });
    // Award XP bonus
    if (badge.xpBonus > 0) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardXp"])(userId, badge.xpBonus, 'badge_earned', {
            badgeKey
        });
    }
    // Log activity
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'BADGE_EARNED', {
        badgeKey,
        badgeName: badge.name,
        rarity: badge.rarity,
        xpBonus: badge.xpBonus
    });
    return {
        awarded: true,
        badge: userBadge.badge,
        xpBonus: badge.xpBonus
    };
}
async function getUserBadges(userId) {
    const userBadges = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userBadge.findMany({
        where: {
            userId
        },
        include: {
            badge: true
        },
        orderBy: {
            earnedAt: 'desc'
        }
    });
    return userBadges.map((ub)=>({
            ...ub.badge,
            earnedAt: ub.earnedAt
        }));
}
async function getAllBadgesWithProgress(userId) {
    const [allBadges, userBadges] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].badge.findMany({
            orderBy: {
                order: 'asc'
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userBadge.findMany({
            where: {
                userId
            },
            select: {
                badgeId: true,
                earnedAt: true,
                progress: true
            }
        })
    ]);
    const earnedBadgeIds = new Set(userBadges.map((ub)=>ub.badgeId));
    const userBadgeMap = new Map(userBadges.map((ub)=>[
            ub.badgeId,
            ub
        ]));
    return allBadges.map((badge)=>({
            ...badge,
            earned: earnedBadgeIds.has(badge.id),
            earnedAt: userBadgeMap.get(badge.id)?.earnedAt || null,
            progress: userBadgeMap.get(badge.id)?.progress || 0
        }));
}
async function checkAndAwardBadges(userId, stats) {
    const badgesToCheck = [];
    // Check lesson badges
    if (stats.lessonsCompleted !== undefined) {
        if (stats.lessonsCompleted >= 1) badgesToCheck.push('first_steps');
        if (stats.lessonsCompleted >= 10) badgesToCheck.push('quick_learner');
        if (stats.lessonsCompleted >= 50) badgesToCheck.push('knowledge_seeker');
        if (stats.lessonsCompleted >= 100) badgesToCheck.push('master_scholar');
    }
    // Check streak badges
    if (stats.streakDays !== undefined) {
        if (stats.streakDays >= 3) badgesToCheck.push('streak_3');
        if (stats.streakDays >= 7) badgesToCheck.push('streak_7');
        if (stats.streakDays >= 30) badgesToCheck.push('streak_30');
        if (stats.streakDays >= 100) badgesToCheck.push('streak_100');
    }
    // Check quiz badges
    if (stats.quizzesCompleted !== undefined) {
        if (stats.quizzesCompleted >= 1) badgesToCheck.push('first_quiz');
        if (stats.quizzesCompleted >= 20) badgesToCheck.push('quiz_pro');
    }
    if (stats.perfectQuizzes && stats.perfectQuizzes >= 1) {
        badgesToCheck.push('perfect_score');
    }
    if (stats.quizzesCompleted && stats.quizAverage && stats.quizzesCompleted >= 50 && stats.quizAverage >= 80) {
        badgesToCheck.push('quiz_master');
    }
    // Check social badges
    if (stats.sessionsJoined !== undefined) {
        if (stats.sessionsJoined >= 5) badgesToCheck.push('social_butterfly');
    }
    if (stats.messagesSent !== undefined) {
        if (stats.messagesSent >= 50) badgesToCheck.push('active_participant');
    }
    // Check mastery badges
    if (stats.currentLevel !== undefined) {
        if (stats.currentLevel >= 5) badgesToCheck.push('level_5');
        if (stats.currentLevel >= 10) badgesToCheck.push('level_10');
        if (stats.currentLevel >= 20) badgesToCheck.push('level_20');
    }
    if (stats.totalXp !== undefined) {
        if (stats.totalXp >= 10000) badgesToCheck.push('xp_10000');
    }
    // Award badges
    const awarded = [];
    for (const badgeKey of badgesToCheck){
        const result = await awardBadge(userId, badgeKey);
        if (result.awarded && result.badge) {
            awarded.push({
                badgeKey,
                badgeName: result.badge.name,
                xpBonus: result.xpBonus
            });
        }
    }
    return awarded;
}
async function getBadgeStats(userId) {
    const [earnedBadges, allBadges] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userBadge.findMany({
            where: {
                userId
            },
            include: {
                badge: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].badge.findMany()
    ]);
    const byRarity = {
        common: earnedBadges.filter((b)=>b.badge.rarity === 'common').length,
        rare: earnedBadges.filter((b)=>b.badge.rarity === 'rare').length,
        epic: earnedBadges.filter((b)=>b.badge.rarity === 'epic').length,
        legendary: earnedBadges.filter((b)=>b.badge.rarity === 'legendary').length
    };
    const byCategory = {
        general: earnedBadges.filter((b)=>b.badge.category === 'general').length,
        streak: earnedBadges.filter((b)=>b.badge.category === 'streak').length,
        quiz: earnedBadges.filter((b)=>b.badge.category === 'quiz').length,
        social: earnedBadges.filter((b)=>b.badge.category === 'social').length,
        mastery: earnedBadges.filter((b)=>b.badge.category === 'mastery').length
    };
    return {
        totalEarned: earnedBadges.length,
        totalAvailable: allBadges.length,
        completionPercentage: Math.round(earnedBadges.length / allBadges.length * 100),
        byRarity,
        byCategory,
        totalXpFromBadges: earnedBadges.reduce((sum, b)=>sum + b.badge.xpBonus, 0)
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/leaderboard.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLeaderboard",
    ()=>getLeaderboard,
    "getLeaderboardAroundUser",
    ()=>getLeaderboardAroundUser,
    "getUserLeaderboardStats",
    ()=>getUserLeaderboardStats,
    "initializeUserLeaderboard",
    ()=>initializeUserLeaderboard,
    "resetMonthlyLeaderboard",
    ()=>resetMonthlyLeaderboard,
    "resetWeeklyLeaderboard",
    ()=>resetWeeklyLeaderboard,
    "updateLeaderboardEntry",
    ()=>updateLeaderboardEntry
]);
/**
 * Leaderboard Service
 * 
 * Manages global, weekly, and class-specific leaderboards
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
;
async function updateLeaderboardEntry(userId, type, xpEarned, periodStart, periodEnd) {
    const where = {
        userId,
        type
    };
    if (periodStart) {
        where.periodStart = periodStart;
    }
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findFirst({
        where
    });
    if (existing) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.update({
            where: {
                id: existing.id
            },
            data: {
                score: {
                    increment: xpEarned
                }
            }
        });
    } else {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.create({
            data: {
                userId,
                type,
                score: xpEarned,
                periodStart,
                periodEnd
            }
        });
    }
}
async function getLeaderboard(type, limit = 100, userId) {
    const now = new Date();
    let periodStart;
    let periodEnd;
    // Calculate period for weekly/monthly leaderboards
    if (type === 'weekly') {
        const dayOfWeek = now.getDay();
        periodStart = new Date(now);
        periodStart.setDate(now.getDate() - dayOfWeek);
        periodStart.setHours(0, 0, 0, 0);
        periodEnd = new Date(periodStart);
        periodEnd.setDate(periodEnd.getDate() + 6);
        periodEnd.setHours(23, 59, 59, 999);
    } else if (type === 'monthly') {
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    }
    // Build where clause
    const where = {
        type
    };
    if (periodStart) {
        where.periodStart = {
            gte: periodStart
        };
    }
    // Get entries with user info
    const entries = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findMany({
        where,
        orderBy: {
            score: 'desc'
        },
        take: limit,
        include: {
            user: {
                include: {
                    profile: true,
                    gamification: true,
                    _count: {
                        select: {
                            badges: true
                        }
                    }
                }
            }
        }
    });
    // Format entries with ranks
    const formattedEntries = entries.map((entry, index)=>({
            rank: index + 1,
            userId: entry.userId,
            name: entry.user.profile?.name || `Student ${entry.userId.slice(-6)}`,
            avatar: entry.user.profile?.avatar || undefined,
            level: entry.user.gamification?.level || 1,
            xp: entry.user.gamification?.xp || 0,
            score: entry.score,
            streakDays: entry.user.gamification?.streakDays || 0,
            badges: entry.user._count.badges
        }));
    // Get user's rank if not in top entries
    let userRank;
    if (userId && !entries.find((e)=>e.userId === userId)) {
        userRank = await getUserRank(userId, type, periodStart);
    } else if (userId) {
        userRank = formattedEntries.find((e)=>e.userId === userId);
    }
    // Get total participants
    const totalParticipants = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.count({
        where
    });
    return {
        type,
        periodStart,
        periodEnd,
        entries: formattedEntries,
        userRank,
        totalParticipants
    };
}
/**
 * Get a specific user's rank
 */ async function getUserRank(userId, type, periodStart) {
    const where = {
        type
    };
    if (periodStart) {
        where.periodStart = {
            gte: periodStart
        };
    }
    // Get user's entry
    const userEntry = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findFirst({
        where: {
            ...where,
            userId
        },
        include: {
            user: {
                include: {
                    profile: true,
                    gamification: true,
                    _count: {
                        select: {
                            badges: true
                        }
                    }
                }
            }
        }
    });
    if (!userEntry) return undefined;
    // Count users with higher scores
    const higherRankCount = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.count({
        where: {
            ...where,
            score: {
                gt: userEntry.score
            }
        }
    });
    return {
        rank: higherRankCount + 1,
        userId: userEntry.userId,
        name: userEntry.user.profile?.name || `Student ${userEntry.userId.slice(-6)}`,
        avatar: userEntry.user.profile?.avatar || undefined,
        level: userEntry.user.gamification?.level || 1,
        xp: userEntry.user.gamification?.xp || 0,
        score: userEntry.score,
        streakDays: userEntry.user.gamification?.streakDays || 0,
        badges: userEntry.user._count.badges
    };
}
async function getLeaderboardAroundUser(userId, type, range = 5) {
    const now = new Date();
    let periodStart;
    if (type === 'weekly') {
        const dayOfWeek = now.getDay();
        periodStart = new Date(now);
        periodStart.setDate(now.getDate() - dayOfWeek);
        periodStart.setHours(0, 0, 0, 0);
    } else if (type === 'monthly') {
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    const where = {
        type
    };
    if (periodStart) {
        where.periodStart = {
            gte: periodStart
        };
    }
    // Get user's entry
    const userEntry = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findFirst({
        where: {
            ...where,
            userId
        }
    });
    if (!userEntry) {
        // User has no entry, return top entries
        const leaderboard = await getLeaderboard(type, range * 2 + 1, userId);
        return leaderboard.entries;
    }
    // Get users with higher scores (rank above)
    const aboveEntries = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findMany({
        where: {
            ...where,
            score: {
                gte: userEntry.score
            },
            userId: {
                not: userId
            }
        },
        orderBy: {
            score: 'asc'
        },
        take: range,
        include: {
            user: {
                include: {
                    profile: true,
                    gamification: true,
                    _count: {
                        select: {
                            badges: true
                        }
                    }
                }
            }
        }
    });
    // Get users with lower scores (rank below)
    const belowEntries = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findMany({
        where: {
            ...where,
            score: {
                lt: userEntry.score
            }
        },
        orderBy: {
            score: 'desc'
        },
        take: range,
        include: {
            user: {
                include: {
                    profile: true,
                    gamification: true,
                    _count: {
                        select: {
                            badges: true
                        }
                    }
                }
            }
        }
    });
    // Combine and calculate ranks
    const allEntries = [
        ...aboveEntries.reverse(),
        userEntry,
        ...belowEntries
    ];
    // Find user's rank
    const userRank = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.count({
        where: {
            ...where,
            score: {
                gt: userEntry.score
            }
        }
    });
    return allEntries.map((entry, index)=>({
            rank: userRank - aboveEntries.length + index + 1,
            userId: entry.userId,
            name: entry.user.profile?.name || `Student ${entry.userId.slice(-6)}`,
            avatar: entry.user.profile?.avatar || undefined,
            level: entry.user.gamification?.level || 1,
            xp: entry.user.gamification?.xp || 0,
            score: entry.score,
            streakDays: entry.user.gamification?.streakDays || 0,
            badges: entry.user._count.badges
        }));
}
async function resetWeeklyLeaderboard() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    // Archive old entries or just delete them
    // For now, we'll keep them for historical tracking
    console.log('[Leaderboard] Weekly leaderboard period ended');
}
async function resetMonthlyLeaderboard() {
    console.log('[Leaderboard] Monthly leaderboard period ended');
}
async function getUserLeaderboardStats(userId) {
    const [globalEntry, weeklyEntry, monthlyEntry] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findFirst({
            where: {
                userId,
                type: 'global'
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findFirst({
            where: {
                userId,
                type: 'weekly'
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.findFirst({
            where: {
                userId,
                type: 'monthly'
            }
        })
    ]);
    const globalRank = globalEntry ? await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.count({
        where: {
            type: 'global',
            score: {
                gt: globalEntry.score
            }
        }
    }) + 1 : null;
    const weeklyRank = weeklyEntry ? await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.count({
        where: {
            type: 'weekly',
            score: {
                gt: weeklyEntry.score
            }
        }
    }) + 1 : null;
    const monthlyRank = monthlyEntry ? await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.count({
        where: {
            type: 'monthly',
            score: {
                gt: monthlyEntry.score
            }
        }
    }) + 1 : null;
    return {
        global: {
            rank: globalRank,
            score: globalEntry?.score || 0
        },
        weekly: {
            rank: weeklyRank,
            score: weeklyEntry?.score || 0
        },
        monthly: {
            rank: monthlyRank,
            score: monthlyEntry?.score || 0
        }
    };
}
async function initializeUserLeaderboard(userId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].leaderboardEntry.create({
        data: {
            userId,
            type: 'global',
            score: 0
        }
    });
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/triggers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkTimeBasedBadges",
    ()=>checkTimeBasedBadges,
    "onAIConversation",
    ()=>onAIConversation,
    "onLessonComplete",
    ()=>onLessonComplete,
    "onLevelUp",
    ()=>onLevelUp,
    "onMessageSend",
    ()=>onMessageSend,
    "onMissionComplete",
    ()=>onMissionComplete,
    "onQuizComplete",
    ()=>onQuizComplete,
    "onSessionJoin",
    ()=>onSessionJoin,
    "onSpeakingPractice",
    ()=>onSpeakingPractice,
    "onUserLogin",
    ()=>onUserLogin
]);
/**
 * Gamification Triggers
 * 
 * Automatically triggers gamification events based on user actions
 * This should be called from various parts of the application
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/badges.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/leaderboard.ts [app-route] (ecmascript)");
;
;
;
;
async function onLessonComplete(userId, lessonId) {
    const results = {
        xpEarned: 0,
        badgesEarned: [],
        leveledUp: false
    };
    // Award XP
    const xpResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardXp"])(userId, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XP_REWARDS"].COMPLETE_LESSON, 'lesson_complete', {
        lessonId
    });
    results.xpEarned = xpResult.xpEarned;
    results.leveledUp = xpResult.leveledUp;
    results.newLevel = xpResult.level;
    // Update leaderboard
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'global', xpResult.xpEarned);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'weekly', xpResult.xpEarned);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'monthly', xpResult.xpEarned);
    // Check for badges
    const gamification = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateGamification"])(userId);
    const completedLessons = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].taskSubmission.count({
        where: {
            studentId: userId
        }
    });
    const badgeResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkAndAwardBadges"])(userId, {
        lessonsCompleted: completedLessons,
        streakDays: gamification.streakDays,
        currentLevel: gamification.level,
        totalXp: gamification.xp
    });
    results.badgesEarned = badgeResults;
    return results;
}
async function onQuizComplete(userId, quizId, score, isPerfect) {
    const results = {
        xpEarned: 0,
        badgesEarned: [],
        leveledUp: false
    };
    // Award XP based on score
    const xpAmount = isPerfect ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XP_REWARDS"].PERFECT_QUIZ : Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XP_REWARDS"].PERFECT_QUIZ * (score / 100));
    const xpResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardXp"])(userId, xpAmount, 'quiz_complete', {
        quizId,
        score,
        isPerfect
    });
    results.xpEarned = xpResult.xpEarned;
    results.leveledUp = xpResult.leveledUp;
    results.newLevel = xpResult.level;
    // Update leaderboard
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'global', xpResult.xpEarned);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'weekly', xpResult.xpEarned);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'monthly', xpResult.xpEarned);
    // Check for badges
    const gamification = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateGamification"])(userId);
    // Get quiz stats
    const quizAttempts = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].quizAttempt.count({
        where: {
            studentId: userId
        }
    });
    const perfectQuizzes = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].quizAttempt.count({
        where: {
            studentId: userId,
            score: 100
        }
    });
    const avgScore = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].quizAttempt.aggregate({
        where: {
            studentId: userId
        },
        _avg: {
            score: true
        }
    });
    const badgeResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkAndAwardBadges"])(userId, {
        quizzesCompleted: quizAttempts,
        perfectQuizzes,
        quizAverage: avgScore._avg.score || 0,
        streakDays: gamification.streakDays,
        currentLevel: gamification.level,
        totalXp: gamification.xp
    });
    results.badgesEarned = badgeResults;
    // Award perfect score badge immediately if applicable
    if (isPerfect) {
        const perfectBadge = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardBadge"])(userId, 'perfect_score');
        if (perfectBadge.awarded && perfectBadge.badge) {
            results.badgesEarned.push({
                badgeKey: 'perfect_score',
                badgeName: perfectBadge.badge.name,
                xpBonus: perfectBadge.xpBonus
            });
        }
    }
    return results;
}
async function onUserLogin(userId) {
    const results = {
        xpEarned: 0,
        badgesEarned: [],
        streakBonus: 0,
        leveledUp: false,
        firstLoginToday: false
    };
    // Check daily login
    const loginResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkDailyLogin"])(userId);
    results.firstLoginToday = loginResult.firstLoginToday;
    results.xpEarned = loginResult.xpEarned || 0;
    results.streakBonus = loginResult.streakBonus || 0;
    results.streakDays = loginResult.streakDays;
    results.leveledUp = loginResult.leveledUp;
    if (loginResult.firstLoginToday) {
        // Update leaderboard
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'global', loginResult.xpEarned || 0);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'weekly', loginResult.xpEarned || 0);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'monthly', loginResult.xpEarned || 0);
        // Check for streak badges
        const gamification = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateGamification"])(userId);
        const badgeResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkAndAwardBadges"])(userId, {
            streakDays: gamification.streakDays,
            currentLevel: gamification.level,
            totalXp: gamification.xp
        });
        results.badgesEarned = badgeResults;
    }
    return results;
}
async function onSessionJoin(userId, sessionId) {
    const results = {
        badgesEarned: []
    };
    // Check for social badges
    const gamification = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateGamification"])(userId);
    const sessionsJoined = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].sessionParticipant.count({
        where: {
            studentId: userId
        }
    });
    const badgeResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkAndAwardBadges"])(userId, {
        sessionsJoined,
        streakDays: gamification.streakDays,
        currentLevel: gamification.level,
        totalXp: gamification.xp
    });
    results.badgesEarned = badgeResults;
    return results;
}
async function onMessageSend(userId, sessionId) {
    const results = {
        badgesEarned: []
    };
    // Check for social badges
    const gamification = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateGamification"])(userId);
    const messagesSent = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].message.count({
        where: {
            userId
        }
    });
    const badgeResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkAndAwardBadges"])(userId, {
        messagesSent,
        streakDays: gamification.streakDays,
        currentLevel: gamification.level,
        totalXp: gamification.xp
    });
    results.badgesEarned = badgeResults;
    return results;
}
async function onLevelUp(userId, newLevel) {
    const results = {
        badgesEarned: []
    };
    // Check for level-based badges
    const gamification = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateGamification"])(userId);
    const badgeResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkAndAwardBadges"])(userId, {
        currentLevel: newLevel,
        streakDays: gamification.streakDays,
        totalXp: gamification.xp
    });
    results.badgesEarned = badgeResults;
    return results;
}
async function onMissionComplete(userId, missionId, xpReward) {
    const results = {
        xpEarned: xpReward,
        badgesEarned: [],
        leveledUp: false
    };
    // Award XP
    const xpResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardXp"])(userId, xpReward, 'mission_complete', {
        missionId
    });
    results.leveledUp = xpResult.leveledUp;
    results.newLevel = xpResult.level;
    // Update leaderboard
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'global', xpReward);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'weekly', xpReward);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'monthly', xpReward);
    return results;
}
async function onSpeakingPractice(userId, duration, score) {
    const results = {
        xpEarned: 0,
        badgesEarned: [],
        leveledUp: false
    };
    // Award XP based on duration (1 XP per minute, minimum 10)
    const xpAmount = Math.max(10, Math.round(duration / 60));
    const xpResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardXp"])(userId, xpAmount, 'speaking_practice', {
        duration,
        score
    });
    results.xpEarned = xpResult.xpEarned;
    results.leveledUp = xpResult.leveledUp;
    // Update leaderboard
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'global', xpResult.xpEarned);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'weekly', xpResult.xpEarned);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'monthly', xpResult.xpEarned);
    return results;
}
async function onAIConversation(userId, messageCount) {
    const results = {
        xpEarned: 0,
        badgesEarned: [],
        leveledUp: false
    };
    // Award XP for AI conversation
    const xpResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardXp"])(userId, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XP_REWARDS"].AI_CONVERSATION, 'ai_conversation', {
        messageCount
    });
    results.xpEarned = xpResult.xpEarned;
    results.leveledUp = xpResult.leveledUp;
    // Update leaderboard
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'global', xpResult.xpEarned);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'weekly', xpResult.xpEarned);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$leaderboard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateLeaderboardEntry"])(userId, 'monthly', xpResult.xpEarned);
    return results;
}
async function checkTimeBasedBadges(userId) {
    const hour = new Date().getHours();
    const results = {
        badgesEarned: []
    };
    // Night Owl: midnight to 5 AM
    if (hour >= 0 && hour < 5) {
        const badge = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardBadge"])(userId, 'night_owl');
        if (badge.awarded && badge.badge) {
            results.badgesEarned.push({
                badgeKey: 'night_owl',
                badgeName: badge.badge.name,
                xpBonus: badge.xpBonus
            });
        }
    }
    // Early Bird: before 7 AM
    if (hour >= 5 && hour < 7) {
        const badge = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$badges$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardBadge"])(userId, 'early_bird');
        if (badge.awarded && badge.badge) {
            results.badgesEarned.push({
                badgeKey: 'early_bird',
                badgeName: badge.badge.name,
                xpBonus: badge.xpBonus
            });
        }
    }
    return results;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/gamification/daily-login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
/**
 * Daily Login API
 * 
 * POST /api/gamification/daily-login - Check daily login and award streak/XP
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/api/middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$triggers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/triggers.ts [app-route] (ecmascript)");
;
;
;
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withCsrf"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(async (req, session)=>{
    // Check daily login, streak, and award XP
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$triggers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["onUserLogin"])(session.user.id);
    // Check for time-based badges (night owl, early bird)
    const timeBadges = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$triggers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkTimeBasedBadges"])(session.user.id);
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        data: {
            ...result,
            timeBasedBadges: timeBadges.badgesEarned
        }
    });
}, {
    role: 'STUDENT'
}));
}),
];

//# debugId=902a1c8d-3812-1615-ede7-e8594ea9ff5c
//# sourceMappingURL=%5Broot-of-the-server%5D__767bf7cc._.js.map