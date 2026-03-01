;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="f9ed9037-ef8e-7387-1e8f-dde9217b228a")}catch(e){}}();
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/worlds.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_WORLDS",
    ()=>DEFAULT_WORLDS,
    "completeMission",
    ()=>completeMission,
    "getMissionSummary",
    ()=>getMissionSummary,
    "getRecommendedMission",
    ()=>getRecommendedMission,
    "getWorldWithMissions",
    ()=>getWorldWithMissions,
    "getWorldsWithStatus",
    ()=>getWorldsWithStatus,
    "initializeWorlds",
    ()=>initializeWorlds,
    "startMission",
    ()=>startMission
]);
/**
 * Worlds and Missions Service
 *
 * Worlds are in-memory (DEFAULT_WORLDS); unlock status from UserGamification.
 * Missions use schema: Mission, MissionProgress (studentId, progress, completed).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/activity-log.ts [app-route] (ecmascript)");
;
;
;
const DEFAULT_WORLDS = [
    {
        id: 'survival',
        name: 'Survival World',
        emoji: '🌍',
        description: 'Master everyday English for real-life situations',
        storyArc: 'You have arrived in an English-speaking country. Learn to navigate daily life, from ordering food to asking for directions.',
        unlockLevel: 1,
        difficultyLevel: 1
    },
    {
        id: 'workplace',
        name: 'Workplace World',
        emoji: '💼',
        description: 'Professional English for career advancement',
        storyArc: 'You have started a new job. Navigate meetings, emails, and professional conversations with confidence.',
        unlockLevel: 3,
        difficultyLevel: 2
    },
    {
        id: 'daily_life',
        name: 'Daily Life World',
        emoji: '🏠',
        description: 'Conversations with friends, family, and neighbors',
        storyArc: 'Build relationships and connect with people around you through natural everyday conversations.',
        unlockLevel: 2,
        difficultyLevel: 1
    },
    {
        id: 'academic',
        name: 'Academic World',
        emoji: '🧠',
        description: 'Study skills and academic English',
        storyArc: 'Prepare for academic success with essay writing, presentations, and research skills.',
        unlockLevel: 4,
        difficultyLevel: 3
    },
    {
        id: 'social',
        name: 'Social & Relationships',
        emoji: '❤️',
        description: 'Make friends and build connections',
        storyArc: 'Navigate social situations, from casual hangouts to meaningful conversations and dating.',
        unlockLevel: 3,
        difficultyLevel: 2
    },
    {
        id: 'public_speaking',
        name: 'Public Speaking Arena',
        emoji: '🎤',
        description: 'Speak confidently in front of others',
        storyArc: 'Face your fears and master the art of presenting to groups, large and small.',
        unlockLevel: 5,
        difficultyLevel: 3
    },
    {
        id: 'debate',
        name: 'Debate Arena',
        emoji: '🏆',
        description: 'Advanced argumentation and persuasion',
        storyArc: 'Enter the arena of ideas. Defend your positions and respectfully challenge others.',
        unlockLevel: 8,
        difficultyLevel: 4
    }
];
async function initializeWorlds() {
// Worlds are defined in DEFAULT_WORLDS; no DB persistence.
}
async function getWorldsWithStatus(userId) {
    const gamification = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateGamification"])(userId);
    const unlocked = gamification.unlockedWorlds ?? [];
    return DEFAULT_WORLDS.map((world)=>({
            ...world,
            isUnlocked: unlocked.includes(world.id) || gamification.level >= world.unlockLevel,
            canAccess: gamification.level >= world.unlockLevel,
            progress: 0
        }));
}
async function getWorldWithMissions(worldId, userId) {
    const world = DEFAULT_WORLDS.find((w)=>w.id === worldId);
    if (!world) return null;
    const gamification = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateGamification"])(userId);
    const isUnlocked = (gamification.unlockedWorlds ?? []).includes(world.id) || gamification.level >= world.unlockLevel;
    return {
        ...world,
        isUnlocked,
        canAccess: gamification.level >= world.unlockLevel,
        missions: []
    };
}
async function startMission(userId, missionId) {
    const mission = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].mission.findUnique({
        where: {
            id: missionId
        }
    });
    if (!mission) {
        throw new Error('Mission not found');
    }
    const canAccess = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["canAccessWorld"])(userId, 1) // requirement level 1 for any mission
    ;
    if (!canAccess) {
        throw new Error('World not unlocked yet');
    }
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.findUnique({
        where: {
            missionId_studentId: {
                missionId,
                studentId: userId
            }
        }
    });
    if (existing) {
        if (existing.completed) {
            return existing;
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'MISSION_START', {
            missionId
        });
        return existing;
    }
    const progress = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.create({
        data: {
            missionId,
            studentId: userId,
            progress: 0,
            completed: false
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'MISSION_START', {
        missionId
    });
    return progress;
}
async function completeMission(userId, missionId, score, _confidenceDelta = 0) {
    const mission = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].mission.findUnique({
        where: {
            id: missionId
        }
    });
    if (!mission) {
        throw new Error('Mission not found');
    }
    let xpEarned = mission.xpReward;
    if (score >= 90) xpEarned += __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XP_REWARDS"].PERFECT_QUIZ;
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.findUnique({
        where: {
            missionId_studentId: {
                missionId,
                studentId: userId
            }
        }
    });
    if (!existing || !existing.completed) {
        xpEarned += __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XP_REWARDS"].FIRST_MISSION;
    }
    const progress = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.upsert({
        where: {
            missionId_studentId: {
                missionId,
                studentId: userId
            }
        },
        update: {
            progress: Math.round(score),
            completed: true,
            completedAt: new Date()
        },
        create: {
            missionId,
            studentId: userId,
            progress: Math.round(score),
            completed: true,
            completedAt: new Date()
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awardXp"])(userId, xpEarned, 'mission_complete', {
        missionId,
        score
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'MISSION_COMPLETE', {
        missionId,
        score,
        xpEarned
    });
    return {
        progress,
        xpEarned
    };
}
async function getMissionSummary(userId) {
    const totalMissions = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].mission.count({
        where: {
            isActive: true
        }
    });
    const completed = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.count({
        where: {
            studentId: userId,
            completed: true
        }
    });
    const inProgress = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.count({
        where: {
            studentId: userId,
            completed: false
        }
    });
    const notStarted = Math.max(0, totalMissions - completed - inProgress);
    const progressRecords = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.findMany({
        where: {
            studentId: userId
        }
    });
    const totalXpEarned = progressRecords.length * 50 // approximate; schema has no xpEarned on MissionProgress
    ;
    return {
        total: totalMissions,
        completed,
        inProgress,
        notStarted,
        totalXpEarned,
        completionRate: totalMissions > 0 ? Math.round(completed / totalMissions * 100) : 0
    };
}
async function getRecommendedMission(userId) {
    const inProgress = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.findFirst({
        where: {
            studentId: userId,
            completed: false
        },
        include: {
            mission: true
        }
    });
    if (inProgress) {
        return inProgress.mission;
    }
    const completedMissionIds = (await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].missionProgress.findMany({
        where: {
            studentId: userId,
            completed: true
        },
        select: {
            missionId: true
        }
    })).map((p)=>p.missionId);
    const next = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].mission.findFirst({
        where: {
            isActive: true,
            id: {
                notIn: completedMissionIds
            }
        }
    });
    return next ?? null;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/gamification/worlds/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * Worlds API
 * 
 * GET /api/gamification/worlds - Get all worlds with user unlock status
 * GET /api/gamification/worlds/[id] - Get specific world with missions
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/api/middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$worlds$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/worlds.ts [app-route] (ecmascript)");
;
;
;
const GET = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$api$2f$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(async (request, session)=>{
    const { searchParams } = new URL(request.url);
    const worldId = searchParams.get('id');
    if (worldId) {
        // Get specific world with missions
        const world = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$worlds$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWorldWithMissions"])(worldId, session.user.id);
        if (!world) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'World not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: world
        });
    }
    // Get all worlds
    const worlds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$worlds$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWorldsWithStatus"])(session.user.id);
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        data: worlds
    });
}, {
    role: 'STUDENT'
});
}),
];

//# debugId=f9ed9037-ef8e-7387-1e8f-dde9217b228a
//# sourceMappingURL=%5Broot-of-the-server%5D__6d545a6a._.js.map