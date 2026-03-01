(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0bf94ff3._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring-shared.ts [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reportError",
    ()=>reportError,
    "reportMetric",
    ()=>reportMetric
]);
/**
 * Client/Edge-safe performance reporting (no DB, no Node-only modules).
 * Use this from Sentry setup and client components so the bundle never pulls in
 * pg/drizzle or notify (which would break browser and Edge).
 *
 * For server-only features (DB persistence, alerting), use performance-monitoring.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/edge/index.js [instrumentation-edge] (ecmascript)");
;
function reportMetric(name, value, unit = 'ms', tags) {
    try {
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__.metrics;
        if (unit === 'count' && typeof m?.count === 'function') {
            m.count(name, value);
        } else if (typeof m?.distribution === 'function') {
            m.distribution(name, value, {
                unit: 'millisecond',
                tags
            });
        }
    } catch  {
    /* no-op */ }
}
function reportError(error, context) {
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__.captureException(error, {
            extra: context
        });
    } catch  {
    /* no-op */ }
}
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
// @ts-nocheck
/**
 * Enterprise-grade Sentry monitoring for global platform
 * - Global error tracking, Core Web Vitals, PII filtering, GDPR/PIPL compliant
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$edge$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/edge/index.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring-shared.ts [instrumentation-edge] (ecmascript)");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reportError"])(error, context);
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
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    } catch  {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["reportMetric"])('cache_hit_rate', hit ? 1 : 0, 'count', {
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
    "@react-three/drei": "^9.120.4",
    "@react-three/fiber": "^8.17.10",
    "@sentry/nextjs": "^10.39.0",
    "@socket.io/redis-adapter": "^8.3.0",
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
    "@types/pg": "^8.11.0",
    "@types/react": "^18.3.28",
    "@types/react-dom": "^18.3.7",
    "@types/swagger-ui-react": "^5.18.0",
    "dotenv": "^17.3.1",
    "drizzle-kit": "^0.30.0",
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0bf94ff3._.js.map