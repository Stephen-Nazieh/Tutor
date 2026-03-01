;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="58749901-b141-d96e-a1a2-094fe043ed6c")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring-shared.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/index.client.js [client] (ecmascript)");
;
function reportMetric(name, value, unit = 'ms', tags) {
    try {
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.metrics;
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
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.captureException(error, {
            extra: context
        });
    } catch  {
    /* no-op */ }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * Enterprise-grade Sentry monitoring for global platform
 * - Global error tracking, Core Web Vitals, PII filtering, GDPR/PIPL compliant
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/index.client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring-shared.ts [client] (ecmascript)");
;
;
function getSentryInitOptions(overrides) {
    const base = {
        dsn: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SENTRY_DSN ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SENTRY_DSN,
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
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.captureException(error, {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["reportError"])(error, context);
        } catch  {
        /* ignore */ }
    },
    handleWarning (warning, context) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.captureMessage(warning, 'warning', {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
    },
    addBreadcrumb (breadcrumb) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: breadcrumb.category ?? 'default',
            message: breadcrumb.message,
            data: breadcrumb.data,
            timestamp: Date.now() / 1000
        });
    }
};
function captureMetric(name, value, unit) {
    try {
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.metrics;
        if (unit === 'count' && typeof m?.count === 'function') m.count(name, value);
        else if (typeof m?.distribution === 'function') m.distribution(name, value, {
            unit: 'millisecond'
        });
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    } catch  {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    }
}
const globalPerformanceMonitor = {
    trackApiEndpoint (endpoint, responseTime, errorCount) {
        captureMetric('api_response_time', responseTime, 'ms');
        if (errorCount > 0) captureMetric('api_error_count', errorCount, 'count');
    },
    trackInteraction (type, element, value) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: 'interaction',
            message: `${type} on ${element}`,
            data: value,
            timestamp: Date.now() / 1000
        });
    },
    trackCacheHit (cacheKey, hit) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["reportMetric"])('cache_hit_rate', hit ? 1 : 0, 'count', {
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.addEventListener('error', (event)=>{
        if (event.error?.message?.includes?.('loading') || event.error?.message?.includes?.('chunk') || event.message?.includes?.('loading') || event.message?.includes?.('chunk')) return;
        globalErrorHandler.handleError(event.error ?? new Error(event.message), {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
        });
    });
    window.addEventListener('unhandledrejection', (event)=>{
        const err = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
        if (err.message?.includes?.('loading') || err.message?.includes?.('chunk')) return;
        globalErrorHandler.handleError(err, {
            type: 'unhandledrejection',
            timestamp: Date.now()
        });
    });
    if ('PerformanceObserver' in window) {
        try {
            const o = new PerformanceObserver((list)=>{
                for (const entry of list.getEntries()){
                    const e = entry;
                    const value = e.value ?? e.renderTime ?? e.loadTime ?? e.duration ?? 0;
                    if (value > 0) {
                        const name = (e.name || e.entryType || '').toUpperCase();
                        const vital = name.includes('LCP') || name.includes('LARGEST') ? 'LCP' : name.includes('FID') || name.includes('FIRST-INPUT') ? 'FID' : name.includes('CLS') || name.includes('LAYOUT') ? 'CLS' : name.includes('TTFB') ? 'TTFB' : name.includes('FCP') ? 'FCP' : name;
                        globalPerformanceMonitor.trackWebVital(vital, value);
                    }
                }
            });
            o.observe({
                entryTypes: [
                    'largest-contentful-paint',
                    'first-input',
                    'layout-shift',
                    'navigation'
                ]
            });
        } catch  {
        /* ignore */ }
        try {
            const o2 = new PerformanceObserver((list)=>{
                for (const entry of list.getEntries()){
                    const e = entry;
                    globalPerformanceMonitor.trackLongTask(e.startTime, e.duration);
                }
            });
            o2.observe({
                entryTypes: [
                    'longtask'
                ]
            });
        } catch  {
        /* ignore */ }
    }
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/instrumentation-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "onRouterTransitionStart",
    ()=>onRouterTransitionStart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/client/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/client/routing/appRouterRoutingInstrumentation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [client] (ecmascript) <locals>");
globalThis["_sentryRouteManifest"] = "{\"dynamicRoutes\":[{\"path\":\"/:locale\",\"regex\":\"^/([^/]+)$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum\",\"regex\":\"^/([^/]+)/curriculum$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum/:curriculumId\",\"regex\":\"^/([^/]+)/curriculum/([^/]+)$\",\"paramNames\":[\"locale\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum/lessons/:lessonId\",\"regex\":\"^/([^/]+)/curriculum/lessons/([^/]+)$\",\"paramNames\":[\"locale\",\"lessonId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin\",\"regex\":\"^/([^/]+)/admin$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/analytics\",\"regex\":\"^/([^/]+)/admin/analytics$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/audit-log\",\"regex\":\"^/([^/]+)/admin/audit-log$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/content\",\"regex\":\"^/([^/]+)/admin/content$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/feature-flags\",\"regex\":\"^/([^/]+)/admin/feature-flags$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/llm\",\"regex\":\"^/([^/]+)/admin/llm$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/login\",\"regex\":\"^/([^/]+)/admin/login$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/payments\",\"regex\":\"^/([^/]+)/admin/payments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/security\",\"regex\":\"^/([^/]+)/admin/security$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/settings\",\"regex\":\"^/([^/]+)/admin/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/topology\",\"regex\":\"^/([^/]+)/admin/topology$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/users\",\"regex\":\"^/([^/]+)/admin/users$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/api-docs\",\"regex\":\"^/([^/]+)/api-docs$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/code-of-conduct\",\"regex\":\"^/([^/]+)/legal/code-of-conduct$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/privacy\",\"regex\":\"^/([^/]+)/legal/privacy$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/terms\",\"regex\":\"^/([^/]+)/legal/terms$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/login\",\"regex\":\"^/([^/]+)/login$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/onboarding/student\",\"regex\":\"^/([^/]+)/onboarding/student$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/onboarding/tutor\",\"regex\":\"^/([^/]+)/onboarding/tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/assignments\",\"regex\":\"^/([^/]+)/parent/assignments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/children\",\"regex\":\"^/([^/]+)/parent/children$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/classes\",\"regex\":\"^/([^/]+)/parent/classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/courses\",\"regex\":\"^/([^/]+)/parent/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/courses/:id\",\"regex\":\"^/([^/]+)/parent/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/dashboard\",\"regex\":\"^/([^/]+)/parent/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/invoices\",\"regex\":\"^/([^/]+)/parent/invoices$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/messages\",\"regex\":\"^/([^/]+)/parent/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/notifications\",\"regex\":\"^/([^/]+)/parent/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/payments\",\"regex\":\"^/([^/]+)/parent/payments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/profile\",\"regex\":\"^/([^/]+)/parent/profile$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/progress\",\"regex\":\"^/([^/]+)/parent/progress$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/settings\",\"regex\":\"^/([^/]+)/parent/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId/ai-tutor\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)/ai-tutor$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId/assignments\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)/assignments$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/teachers\",\"regex\":\"^/([^/]+)/parent/teachers$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment\",\"regex\":\"^/([^/]+)/payment$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment/cancel\",\"regex\":\"^/([^/]+)/payment/cancel$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment/success\",\"regex\":\"^/([^/]+)/payment/success$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register\",\"regex\":\"^/([^/]+)/register$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/admin\",\"regex\":\"^/([^/]+)/register/admin$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/parent\",\"regex\":\"^/([^/]+)/register/parent$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/student\",\"regex\":\"^/([^/]+)/register/student$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/tutor\",\"regex\":\"^/([^/]+)/register/tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/agreement\",\"regex\":\"^/([^/]+)/student/agreement$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor\",\"regex\":\"^/([^/]+)/student/ai-tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/browse\",\"regex\":\"^/([^/]+)/student/ai-tutor/browse$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/english\",\"regex\":\"^/([^/]+)/student/ai-tutor/english$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/schedule\",\"regex\":\"^/([^/]+)/student/ai-tutor/schedule$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/assignments\",\"regex\":\"^/([^/]+)/student/assignments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/courses\",\"regex\":\"^/([^/]+)/student/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/dashboard\",\"regex\":\"^/([^/]+)/student/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/favorites\",\"regex\":\"^/([^/]+)/student/favorites$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/gamification\",\"regex\":\"^/([^/]+)/student/gamification$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/help\",\"regex\":\"^/([^/]+)/student/help$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/learn/:contentId\",\"regex\":\"^/([^/]+)/student/learn/([^/]+)$\",\"paramNames\":[\"locale\",\"contentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/lesson-replays\",\"regex\":\"^/([^/]+)/student/lesson-replays$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/live/:sessionId\",\"regex\":\"^/([^/]+)/student/live/([^/]+)$\",\"paramNames\":[\"locale\",\"sessionId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/live/join\",\"regex\":\"^/([^/]+)/student/live/join$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/messages\",\"regex\":\"^/([^/]+)/student/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missed-classes\",\"regex\":\"^/([^/]+)/student/missed-classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missed-lessons\",\"regex\":\"^/([^/]+)/student/missed-lessons$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missions\",\"regex\":\"^/([^/]+)/student/missions$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/notifications\",\"regex\":\"^/([^/]+)/student/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/onboarding\",\"regex\":\"^/([^/]+)/student/onboarding$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/pdf-tutoring\",\"regex\":\"^/([^/]+)/student/pdf-tutoring$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/progress\",\"regex\":\"^/([^/]+)/student/progress$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/quizzes\",\"regex\":\"^/([^/]+)/student/quizzes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/quizzes/:id\",\"regex\":\"^/([^/]+)/student/quizzes/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/resources\",\"regex\":\"^/([^/]+)/student/resources$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/review/:contentId\",\"regex\":\"^/([^/]+)/student/review/([^/]+)$\",\"paramNames\":[\"locale\",\"contentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/scores\",\"regex\":\"^/([^/]+)/student/scores$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/settings\",\"regex\":\"^/([^/]+)/student/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/skills\",\"regex\":\"^/([^/]+)/student/skills$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/study-groups\",\"regex\":\"^/([^/]+)/student/study-groups$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/chat\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/chat$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses/:curriculumId\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"subjectCode\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses/:curriculumId/details\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses/([^/]+)/details$\",\"paramNames\":[\"locale\",\"subjectCode\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/signup\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/signup$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/tutors\",\"regex\":\"^/([^/]+)/student/tutors$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/worlds\",\"regex\":\"^/([^/]+)/student/worlds$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/ai-assistant\",\"regex\":\"^/([^/]+)/tutor/ai-assistant$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/calendar\",\"regex\":\"^/([^/]+)/tutor/calendar$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/classes\",\"regex\":\"^/([^/]+)/tutor/classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses\",\"regex\":\"^/([^/]+)/tutor/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/builder\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/builder$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/tasks\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/tasks$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/tasks/:taskId/analytics\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/tasks/([^/]+)/analytics$\",\"paramNames\":[\"locale\",\"id\",\"taskId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/new\",\"regex\":\"^/([^/]+)/tutor/courses/new$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/curriculum\",\"regex\":\"^/([^/]+)/tutor/curriculum$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/dashboard\",\"regex\":\"^/([^/]+)/tutor/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/group-builder\",\"regex\":\"^/([^/]+)/tutor/group-builder$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/groups\",\"regex\":\"^/([^/]+)/tutor/groups$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/help\",\"regex\":\"^/([^/]+)/tutor/help$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/live-class\",\"regex\":\"^/([^/]+)/tutor/live-class$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/live-class/:sessionId\",\"regex\":\"^/([^/]+)/tutor/live-class/([^/]+)$\",\"paramNames\":[\"locale\",\"sessionId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/messages\",\"regex\":\"^/([^/]+)/tutor/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/my-page\",\"regex\":\"^/([^/]+)/tutor/my-page$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/notifications\",\"regex\":\"^/([^/]+)/tutor/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/pdf-tutoring\",\"regex\":\"^/([^/]+)/tutor/pdf-tutoring$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/question-bank\",\"regex\":\"^/([^/]+)/tutor/question-bank$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/quizzes\",\"regex\":\"^/([^/]+)/tutor/quizzes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/quizzes/:id\",\"regex\":\"^/([^/]+)/tutor/quizzes/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/reports\",\"regex\":\"^/([^/]+)/tutor/reports$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/reports/:studentId\",\"regex\":\"^/([^/]+)/tutor/reports/([^/]+)$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/resources\",\"regex\":\"^/([^/]+)/tutor/resources$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/revenue\",\"regex\":\"^/([^/]+)/tutor/revenue$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/settings\",\"regex\":\"^/([^/]+)/tutor/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/students\",\"regex\":\"^/([^/]+)/tutor/students$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/whiteboards\",\"regex\":\"^/([^/]+)/tutor/whiteboards$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/whiteboards/:id\",\"regex\":\"^/([^/]+)/tutor/whiteboards/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/u/:username\",\"regex\":\"^/([^/]+)/u/([^/]+)$\",\"paramNames\":[\"locale\",\"username\"],\"hasOptionalPrefix\":true}],\"staticRoutes\":[],\"isrRoutes\":[]}";
globalThis["_sentryNextJsVersion"] = "16.1.6";
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"]({
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSentryInitOptions"])(),
    tracesSampleRate: ("TURBOPACK compile-time truthy", 1) ? 1.0 : "TURBOPACK unreachable"
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setupClientMonitoring"])();
const onRouterTransitionStart = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureRouterTransitionStart"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/pages/_error\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/error.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# debugId=58749901-b141-d96e-a1a2-094fe043ed6c
//# sourceMappingURL=%5Broot-of-the-server%5D__cdf5d116._.js.map