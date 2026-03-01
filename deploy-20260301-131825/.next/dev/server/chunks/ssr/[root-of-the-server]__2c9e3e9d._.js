;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="2b827c8c-7ab0-9f84-0282-dbf964e5aefd")}catch(e){}}();
module.exports = [
"[next]/internal/font/google/inter_3cd07401.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_3cd07401-module__-s62HG__className",
  "variable": "inter_3cd07401-module__-s62HG__variable",
});
}),
"[next]/internal/font/google/inter_3cd07401.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_3cd07401$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_3cd07401.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_3cd07401$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', sans-serif, system-ui",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_3cd07401$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_3cd07401$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/i18n/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_LOCALE",
    ()=>DEFAULT_LOCALE,
    "IntlLink",
    ()=>IntlLink,
    "LOCALES",
    ()=>LOCALES,
    "NAMESPACES",
    ()=>NAMESPACES,
    "detectLocale",
    ()=>detectLocale,
    "getLocaleInfo",
    ()=>getLocaleInfo,
    "getPathname",
    ()=>getPathname,
    "intlRedirect",
    ()=>intlRedirect,
    "routing",
    ()=>routing,
    "useIntlPathname",
    ()=>useIntlPathname,
    "useIntlRouter",
    ()=>useIntlRouter
]);
// Enterprise-grade internationalization with next-intl
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [app-rsc] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [app-rsc] (ecmascript) <export default as createNavigation>");
;
;
const LOCALES = [
    "en",
    "zh-CN",
    "es",
    "fr",
    "de",
    "ja",
    "ko",
    "pt",
    "ru",
    "ar"
];
const DEFAULT_LOCALE = "en";
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        ...LOCALES
    ],
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: "as-needed",
    pathnames: {
        "/": "/",
        "/courses": "/courses",
        "/dashboard": "/dashboard",
        "/parent": "/parent",
        "/tutor": "/tutor",
        "/login": "/login",
        "/register": "/register",
        "/ai-tutor": "/ai-tutor",
        "/live-class": "/live-class"
    }
});
const { Link: IntlLink, redirect: intlRedirect, usePathname: useIntlPathname, useRouter: useIntlRouter, getPathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
function detectLocale(requestHeaders) {
    const acceptLanguage = requestHeaders.get("accept-language");
    // Parse Accept-Language header
    if (acceptLanguage) {
        const preferredLanguages = acceptLanguage.split(",").map((lang)=>lang.trim().split(";")[0]).filter(Boolean);
        // Find best match for user's preferred language
        for (const language of preferredLanguages){
            const baseLanguage = language.split("-")[0];
            // Direct match
            const directMatch = LOCALES.find((locale)=>locale === language);
            if (directMatch) return directMatch;
            // Base language match
            const baseMatch = LOCALES.find((locale)=>locale === baseLanguage);
            if (baseMatch) return baseMatch;
        }
    }
    // Return default if no match found
    return DEFAULT_LOCALE;
}
const NAMESPACES = [
    "common",
    "navigation",
    "auth",
    "courses",
    "dashboard",
    "classroom",
    "parent",
    "tutor",
    "ai-tutor",
    "gamification",
    "payments",
    "notifications",
    "errors",
    "validation",
    "forms",
    "time",
    "accessibility"
];
function getLocaleInfo(locale) {
    const localeConfigs = {
        en: {
            direction: "ltr",
            language: "en",
            region: "en-US",
            currency: "USD",
            timezone: "America/New_York",
            dateFormat: "MM/DD/YYYY",
            numberFormat: "1,000.00",
            name: "English"
        },
        "zh-CN": {
            direction: "ltr",
            language: "zh",
            region: "zh-CN",
            currency: "CNY",
            timezone: "Asia/Shanghai",
            dateFormat: "YYYY/MM/DD",
            numberFormat: "1,0000.00",
            name: "中文 (简体)"
        },
        es: {
            direction: "ltr",
            language: "es",
            region: "es-ES",
            currency: "EUR",
            timezone: "Europe/Madrid",
            dateFormat: "DD/MM/YYYY",
            numberFormat: "1.000,00",
            name: "Español"
        },
        fr: {
            direction: "ltr",
            language: "fr",
            region: "fr-FR",
            currency: "EUR",
            timezone: "Europe/Paris",
            dateFormat: "DD/MM/YYYY",
            numberFormat: "1 000,00",
            name: "Français"
        },
        de: {
            direction: "ltr",
            language: "de",
            region: "de-DE",
            currency: "EUR",
            timezone: "Europe/Berlin",
            dateFormat: "DD.MM.YYYY",
            numberFormat: "1.000,00",
            name: "Deutsch"
        },
        ja: {
            direction: "ltr",
            language: "ja",
            region: "ja-JP",
            currency: "JPY",
            timezone: "Asia/Tokyo",
            dateFormat: "YYYY/MM/DD",
            numberFormat: "1,000",
            name: "日本語"
        },
        ko: {
            direction: "ltr",
            language: "ko",
            region: "ko-KR",
            currency: "KRW",
            timezone: "Asia/Seoul",
            dateFormat: "YYYY/MM/DD",
            numberFormat: "1,000",
            name: "한국어"
        },
        pt: {
            direction: "ltr",
            language: "pt",
            region: "pt-BR",
            currency: "BRL",
            timezone: "America/Sao_Paulo",
            dateFormat: "DD/MM/YYYY",
            numberFormat: "1.000,00",
            name: "Português"
        },
        ru: {
            direction: "ltr",
            language: "ru",
            region: "ru-RU",
            currency: "RUB",
            timezone: "Europe/Moscow",
            dateFormat: "DD.MM.YYYY",
            numberFormat: "1 000,00",
            name: "Русский"
        },
        ar: {
            direction: "rtl",
            language: "ar",
            region: "ar-SA",
            currency: "SAR",
            timezone: "Asia/Riyadh",
            dateFormat: "DD/MM/YYYY",
            numberFormat: "1,000.00",
            name: "العربية"
        }
    };
    return localeConfigs[locale] ?? localeConfigs[DEFAULT_LOCALE];
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/i18n/request.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [app-rsc] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/core.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/i18n/config.ts [app-rsc] (ecmascript)");
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasLocale"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].locales, requested) ? requested : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "../../messages/en.json": {
                id: ()=>"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/messages/en.json (json, async loader)",
                module: ()=>__turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/messages/en.json (json, async loader)")
            },
            "../../messages/zh-CN.json": {
                id: ()=>"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/messages/zh-CN.json (json, async loader)",
                module: ()=>__turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/messages/zh-CN.json (json, async loader)")
            }
        }).import(`../../messages/${locale}.json`)).default
    };
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/Providers.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/Providers.tsx <module evaluation>", "Providers");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/Providers.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/Providers.tsx", "Providers");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/Providers.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$Providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/Providers.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$Providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/Providers.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$Providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/PerformanceProviders.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PerformanceProviders",
    ()=>PerformanceProviders
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const PerformanceProviders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call PerformanceProviders() from the server but PerformanceProviders is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/PerformanceProviders.tsx <module evaluation>", "PerformanceProviders");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/PerformanceProviders.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PerformanceProviders",
    ()=>PerformanceProviders
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const PerformanceProviders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call PerformanceProviders() from the server but PerformanceProviders is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/PerformanceProviders.tsx", "PerformanceProviders");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/PerformanceProviders.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$PerformanceProviders$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/PerformanceProviders.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$PerformanceProviders$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/PerformanceProviders.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$PerformanceProviders$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_3cd07401$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_3cd07401.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getLocale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getLocale$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/getLocale.js [app-rsc] (ecmascript) <export default as getLocale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getMessages$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getMessages$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/getMessages.js [app-rsc] (ecmascript) <export default as getMessages>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$Providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/Providers.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$PerformanceProviders$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/components/PerformanceProviders.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
const metadata = {
    title: {
        default: 'TutorMe - AI-Powered Educational Platform',
        template: '%s | TutorMe'
    },
    description: 'AI-human hybrid tutoring platform with 24/7 Socratic AI tutoring and live group clinics',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'TutorMe'
    },
    other: {
        'theme-color': '#ffffff',
        'msapplication-TileColor': '#ffffff',
        'msapplication-TileImage': '/ms-icon-144x144.png'
    }
};
const dynamic = 'force-static';
async function getOptimizedLocaleData() {
    const [locale, messages] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getLocale$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getLocale$3e$__["getLocale"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getMessages$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getMessages$3e$__["getMessages"])()
    ]);
    return {
        locale,
        messages
    };
}
async function RootLayout({ children }) {
    const { locale, messages } = await getOptimizedLocaleData();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: locale,
        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_3cd07401$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} font-sans`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://daily.co"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "dns-prefetch",
                        href: "https://localhost:3003"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_3cd07401$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].className,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$Providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Providers"], {
                    locale: locale,
                    messages: messages,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f$components$2f$PerformanceProviders$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PerformanceProviders"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/layout.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
];

//# debugId=2b827c8c-7ab0-9f84-0282-dbf964e5aefd
//# sourceMappingURL=%5Broot-of-the-server%5D__2c9e3e9d._.js.map