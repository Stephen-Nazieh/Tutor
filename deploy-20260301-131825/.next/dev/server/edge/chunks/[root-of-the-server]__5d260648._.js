(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__5d260648._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'dns', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`dns`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'fs', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`fs`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'net', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`net`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'tls', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`tls`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'path', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`path`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'stream', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`stream`));
}),
"[project]/ [instrumentation-edge] (unsupported edge import 'string_decoder', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`string_decoder`));
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/schema/index.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_drizzlePlaceholder",
    ()=>_drizzlePlaceholder
]);
/**
 * Drizzle schema (Phase 1).
 *
 * After running introspect with DB running:
 *   npm run drizzle:pull
 * Generated files appear in ./drizzle/ (schema and relations).
 * Copy or merge drizzle/schema.ts and drizzle/relations.ts into this folder
 * and re-export here. Until then, this is a minimal placeholder so the config and client load.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/table.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/text.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/drizzle-orm/pg-core/columns/timestamp.js [instrumentation-edge] (ecmascript)");
;
const _drizzlePlaceholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["pgTable"])('_drizzle_placeholder', {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["text"])('id').primaryKey(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestamp"])('created_at', {
        withTimezone: true
    }).defaultNow()
});
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
"[externals]/node:assert [external] (node:assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:assert", () => require("node:assert"));

module.exports = mod;
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
/** Drizzle ORM client (Phase 1 migration). Use for new code; existing code still uses db (Prisma). */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$drizzle$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/drizzle.ts [instrumentation-edge] (ecmascript)");
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
;
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [instrumentation-edge] (ecmascript) <locals>");
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
    const prefs = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].notificationPreference.findUnique({
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
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].user.findUnique({
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
        notification = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].notification.create({
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
    "pdf-lib": "^1.17.1",
    "pdf-parse": "^2.4.5",
    "pdfjs-dist": "^4.2.67",
    "pg": "^8.13.0",
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
    "@types/pg": "^8.16.0",
    "@types/react": "^18.3.28",
    "@types/react-dom": "^18.3.7",
    "@types/swagger-ui-react": "^5.18.0",
    "dotenv": "^17.3.1",
    "drizzle-kit": "^0.31.9",
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

//# sourceMappingURL=%5Broot-of-the-server%5D__5d260648._.js.map