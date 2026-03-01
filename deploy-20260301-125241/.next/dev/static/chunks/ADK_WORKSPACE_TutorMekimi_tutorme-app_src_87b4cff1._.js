;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="34534463-88d5-8b62-75b1-98845cd77cae")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring-shared.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/index.client.js [app-client] (ecmascript)");
;
function reportMetric(name, value, unit = 'ms', tags) {
    try {
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.metrics;
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
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.captureException(error, {
            extra: context
        });
    } catch  {
    /* no-op */ }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// @ts-nocheck
/**
 * Enterprise-grade Sentry monitoring for global platform
 * - Global error tracking, Core Web Vitals, PII filtering, GDPR/PIPL compliant
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/index.client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/performance/performance-monitoring-shared.ts [app-client] (ecmascript)");
;
;
function getSentryInitOptions(overrides) {
    const base = {
        dsn: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SENTRY_DSN ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SENTRY_DSN,
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
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.captureException(error, {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportError"])(error, context);
        } catch  {
        /* ignore */ }
    },
    handleWarning (warning, context) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.captureMessage(warning, 'warning', {
            extra: context,
            tags: {
                source: 'global_handler',
                region: 'global'
            }
        });
    },
    addBreadcrumb (breadcrumb) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: breadcrumb.category ?? 'default',
            message: breadcrumb.message,
            data: breadcrumb.data,
            timestamp: Date.now() / 1000
        });
    }
};
function captureMetric(name, value, unit) {
    try {
        const m = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.metrics;
        if (unit === 'count' && typeof m?.count === 'function') m.count(name, value);
        else if (typeof m?.distribution === 'function') m.distribution(name, value, {
            unit: 'millisecond'
        });
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    } catch  {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportMetric"])(name, value, unit === 'count' ? 'count' : 'ms');
    }
}
const globalPerformanceMonitor = {
    trackApiEndpoint (endpoint, responseTime, errorCount) {
        captureMetric('api_response_time', responseTime, 'ms');
        if (errorCount > 0) captureMetric('api_error_count', errorCount, 'count');
    },
    trackInteraction (type, element, value) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.addBreadcrumb({
            category: 'interaction',
            message: `${type} on ${element}`,
            data: value,
            timestamp: Date.now() / 1000
        });
    },
    trackCacheHit (cacheKey, hit) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$performance$2f$performance$2d$monitoring$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportMetric"])('cache_hit_rate', hit ? 1 : 0, 'count', {
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/instrumentation-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "onRouterTransitionStart",
    ()=>onRouterTransitionStart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/client/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/nextjs/build/esm/client/routing/appRouterRoutingInstrumentation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/monitoring/sentry-setup.ts [app-client] (ecmascript) <locals>");
globalThis["_sentryRouteManifest"] = "{\"dynamicRoutes\":[{\"path\":\"/:locale\",\"regex\":\"^/([^/]+)$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum\",\"regex\":\"^/([^/]+)/curriculum$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum/:curriculumId\",\"regex\":\"^/([^/]+)/curriculum/([^/]+)$\",\"paramNames\":[\"locale\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/curriculum/lessons/:lessonId\",\"regex\":\"^/([^/]+)/curriculum/lessons/([^/]+)$\",\"paramNames\":[\"locale\",\"lessonId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin\",\"regex\":\"^/([^/]+)/admin$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/analytics\",\"regex\":\"^/([^/]+)/admin/analytics$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/audit-log\",\"regex\":\"^/([^/]+)/admin/audit-log$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/content\",\"regex\":\"^/([^/]+)/admin/content$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/feature-flags\",\"regex\":\"^/([^/]+)/admin/feature-flags$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/llm\",\"regex\":\"^/([^/]+)/admin/llm$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/login\",\"regex\":\"^/([^/]+)/admin/login$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/payments\",\"regex\":\"^/([^/]+)/admin/payments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/security\",\"regex\":\"^/([^/]+)/admin/security$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/settings\",\"regex\":\"^/([^/]+)/admin/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/topology\",\"regex\":\"^/([^/]+)/admin/topology$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/admin/users\",\"regex\":\"^/([^/]+)/admin/users$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/api-docs\",\"regex\":\"^/([^/]+)/api-docs$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/code-of-conduct\",\"regex\":\"^/([^/]+)/legal/code-of-conduct$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/privacy\",\"regex\":\"^/([^/]+)/legal/privacy$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/legal/terms\",\"regex\":\"^/([^/]+)/legal/terms$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/login\",\"regex\":\"^/([^/]+)/login$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/onboarding/student\",\"regex\":\"^/([^/]+)/onboarding/student$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/onboarding/tutor\",\"regex\":\"^/([^/]+)/onboarding/tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/assignments\",\"regex\":\"^/([^/]+)/parent/assignments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/children\",\"regex\":\"^/([^/]+)/parent/children$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/classes\",\"regex\":\"^/([^/]+)/parent/classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/courses\",\"regex\":\"^/([^/]+)/parent/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/courses/:id\",\"regex\":\"^/([^/]+)/parent/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/dashboard\",\"regex\":\"^/([^/]+)/parent/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/invoices\",\"regex\":\"^/([^/]+)/parent/invoices$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/messages\",\"regex\":\"^/([^/]+)/parent/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/notifications\",\"regex\":\"^/([^/]+)/parent/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/payments\",\"regex\":\"^/([^/]+)/parent/payments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/profile\",\"regex\":\"^/([^/]+)/parent/profile$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/progress\",\"regex\":\"^/([^/]+)/parent/progress$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/settings\",\"regex\":\"^/([^/]+)/parent/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId/ai-tutor\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)/ai-tutor$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/students/:studentId/assignments\",\"regex\":\"^/([^/]+)/parent/students/([^/]+)/assignments$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/parent/teachers\",\"regex\":\"^/([^/]+)/parent/teachers$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment\",\"regex\":\"^/([^/]+)/payment$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment/cancel\",\"regex\":\"^/([^/]+)/payment/cancel$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/payment/success\",\"regex\":\"^/([^/]+)/payment/success$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register\",\"regex\":\"^/([^/]+)/register$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/admin\",\"regex\":\"^/([^/]+)/register/admin$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/parent\",\"regex\":\"^/([^/]+)/register/parent$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/student\",\"regex\":\"^/([^/]+)/register/student$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/register/tutor\",\"regex\":\"^/([^/]+)/register/tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/agreement\",\"regex\":\"^/([^/]+)/student/agreement$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor\",\"regex\":\"^/([^/]+)/student/ai-tutor$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/browse\",\"regex\":\"^/([^/]+)/student/ai-tutor/browse$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/english\",\"regex\":\"^/([^/]+)/student/ai-tutor/english$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/ai-tutor/schedule\",\"regex\":\"^/([^/]+)/student/ai-tutor/schedule$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/assignments\",\"regex\":\"^/([^/]+)/student/assignments$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/courses\",\"regex\":\"^/([^/]+)/student/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/dashboard\",\"regex\":\"^/([^/]+)/student/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/favorites\",\"regex\":\"^/([^/]+)/student/favorites$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/gamification\",\"regex\":\"^/([^/]+)/student/gamification$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/help\",\"regex\":\"^/([^/]+)/student/help$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/learn/:contentId\",\"regex\":\"^/([^/]+)/student/learn/([^/]+)$\",\"paramNames\":[\"locale\",\"contentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/lesson-replays\",\"regex\":\"^/([^/]+)/student/lesson-replays$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/live/:sessionId\",\"regex\":\"^/([^/]+)/student/live/([^/]+)$\",\"paramNames\":[\"locale\",\"sessionId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/live/join\",\"regex\":\"^/([^/]+)/student/live/join$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/messages\",\"regex\":\"^/([^/]+)/student/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missed-classes\",\"regex\":\"^/([^/]+)/student/missed-classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missed-lessons\",\"regex\":\"^/([^/]+)/student/missed-lessons$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/missions\",\"regex\":\"^/([^/]+)/student/missions$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/notifications\",\"regex\":\"^/([^/]+)/student/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/onboarding\",\"regex\":\"^/([^/]+)/student/onboarding$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/pdf-tutoring\",\"regex\":\"^/([^/]+)/student/pdf-tutoring$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/progress\",\"regex\":\"^/([^/]+)/student/progress$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/quizzes\",\"regex\":\"^/([^/]+)/student/quizzes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/quizzes/:id\",\"regex\":\"^/([^/]+)/student/quizzes/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/resources\",\"regex\":\"^/([^/]+)/student/resources$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/review/:contentId\",\"regex\":\"^/([^/]+)/student/review/([^/]+)$\",\"paramNames\":[\"locale\",\"contentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/scores\",\"regex\":\"^/([^/]+)/student/scores$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/settings\",\"regex\":\"^/([^/]+)/student/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/skills\",\"regex\":\"^/([^/]+)/student/skills$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/study-groups\",\"regex\":\"^/([^/]+)/student/study-groups$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/chat\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/chat$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses/:curriculumId\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"subjectCode\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/courses/:curriculumId/details\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/courses/([^/]+)/details$\",\"paramNames\":[\"locale\",\"subjectCode\",\"curriculumId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/subjects/:subjectCode/signup\",\"regex\":\"^/([^/]+)/student/subjects/([^/]+)/signup$\",\"paramNames\":[\"locale\",\"subjectCode\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/tutors\",\"regex\":\"^/([^/]+)/student/tutors$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/student/worlds\",\"regex\":\"^/([^/]+)/student/worlds$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/ai-assistant\",\"regex\":\"^/([^/]+)/tutor/ai-assistant$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/calendar\",\"regex\":\"^/([^/]+)/tutor/calendar$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/classes\",\"regex\":\"^/([^/]+)/tutor/classes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses\",\"regex\":\"^/([^/]+)/tutor/courses$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/builder\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/builder$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/tasks\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/tasks$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/:id/tasks/:taskId/analytics\",\"regex\":\"^/([^/]+)/tutor/courses/([^/]+)/tasks/([^/]+)/analytics$\",\"paramNames\":[\"locale\",\"id\",\"taskId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/courses/new\",\"regex\":\"^/([^/]+)/tutor/courses/new$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/curriculum\",\"regex\":\"^/([^/]+)/tutor/curriculum$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/dashboard\",\"regex\":\"^/([^/]+)/tutor/dashboard$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/group-builder\",\"regex\":\"^/([^/]+)/tutor/group-builder$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/groups\",\"regex\":\"^/([^/]+)/tutor/groups$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/help\",\"regex\":\"^/([^/]+)/tutor/help$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/live-class\",\"regex\":\"^/([^/]+)/tutor/live-class$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/live-class/:sessionId\",\"regex\":\"^/([^/]+)/tutor/live-class/([^/]+)$\",\"paramNames\":[\"locale\",\"sessionId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/messages\",\"regex\":\"^/([^/]+)/tutor/messages$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/my-page\",\"regex\":\"^/([^/]+)/tutor/my-page$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/notifications\",\"regex\":\"^/([^/]+)/tutor/notifications$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/pdf-tutoring\",\"regex\":\"^/([^/]+)/tutor/pdf-tutoring$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/question-bank\",\"regex\":\"^/([^/]+)/tutor/question-bank$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/quizzes\",\"regex\":\"^/([^/]+)/tutor/quizzes$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/quizzes/:id\",\"regex\":\"^/([^/]+)/tutor/quizzes/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/reports\",\"regex\":\"^/([^/]+)/tutor/reports$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/reports/:studentId\",\"regex\":\"^/([^/]+)/tutor/reports/([^/]+)$\",\"paramNames\":[\"locale\",\"studentId\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/resources\",\"regex\":\"^/([^/]+)/tutor/resources$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/revenue\",\"regex\":\"^/([^/]+)/tutor/revenue$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/settings\",\"regex\":\"^/([^/]+)/tutor/settings$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/students\",\"regex\":\"^/([^/]+)/tutor/students$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/whiteboards\",\"regex\":\"^/([^/]+)/tutor/whiteboards$\",\"paramNames\":[\"locale\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/tutor/whiteboards/:id\",\"regex\":\"^/([^/]+)/tutor/whiteboards/([^/]+)$\",\"paramNames\":[\"locale\",\"id\"],\"hasOptionalPrefix\":true},{\"path\":\"/:locale/u/:username\",\"regex\":\"^/([^/]+)/u/([^/]+)$\",\"paramNames\":[\"locale\",\"username\"],\"hasOptionalPrefix\":true}],\"staticRoutes\":[],\"isrRoutes\":[]}";
globalThis["_sentryNextJsVersion"] = "16.1.6";
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"]({
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSentryInitOptions"])(),
    tracesSampleRate: ("TURBOPACK compile-time truthy", 1) ? 1.0 : "TURBOPACK unreachable"
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$monitoring$2f$sentry$2d$setup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setupClientMonitoring"])();
const onRouterTransitionStart = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureRouterTransitionStart"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=34534463-88d5-8b62-75b1-98845cd77cae
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_87b4cff1._.js.map