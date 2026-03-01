(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/c427b_211564a9._.js",
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/routing/config.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "receiveRoutingConfig",
    ()=>receiveRoutingConfig
]);
function receiveRoutingConfig(input) {
    return {
        ...input,
        localePrefix: receiveLocalePrefixConfig(input.localePrefix),
        localeCookie: receiveLocaleCookie(input.localeCookie),
        localeDetection: input.localeDetection ?? true,
        alternateLinks: input.alternateLinks ?? true
    };
}
function receiveLocaleCookie(localeCookie) {
    return localeCookie ?? true ? {
        name: 'NEXT_LOCALE',
        sameSite: 'lax',
        ...typeof localeCookie === 'object' && localeCookie
    } : false;
}
function receiveLocalePrefixConfig(localePrefix) {
    return typeof localePrefix === 'object' ? localePrefix : {
        mode: localePrefix || 'always'
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/constants.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HEADER_LOCALE_NAME",
    ()=>HEADER_LOCALE_NAME
]);
// Used to read the locale from the middleware
const HEADER_LOCALE_NAME = 'X-NEXT-INTL-LOCALE';
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLocaleAsPrefix",
    ()=>getLocaleAsPrefix,
    "getLocalePrefix",
    ()=>getLocalePrefix,
    "getLocalizedTemplate",
    ()=>getLocalizedTemplate,
    "getSortedPathnames",
    ()=>getSortedPathnames,
    "hasPathnamePrefixed",
    ()=>hasPathnamePrefixed,
    "isLocalizableHref",
    ()=>isLocalizableHref,
    "isPromise",
    ()=>isPromise,
    "matchesPathname",
    ()=>matchesPathname,
    "normalizeTrailingSlash",
    ()=>normalizeTrailingSlash,
    "prefixPathname",
    ()=>prefixPathname,
    "templateToRegex",
    ()=>templateToRegex,
    "unprefixPathname",
    ()=>unprefixPathname
]);
function isRelativeHref(href) {
    const pathname = typeof href === 'object' ? href.pathname : href;
    return pathname != null && !pathname.startsWith('/');
}
function isLocalHref(href) {
    if (typeof href === 'object') {
        return href.host == null && href.hostname == null;
    } else {
        const hasProtocol = /^[a-z]+:/i.test(href);
        return !hasProtocol;
    }
}
function isLocalizableHref(href) {
    return isLocalHref(href) && !isRelativeHref(href);
}
function unprefixPathname(pathname, prefix) {
    return pathname.replace(new RegExp(`^${prefix}`), '') || '/';
}
function prefixPathname(prefix, pathname) {
    let localizedHref = prefix;
    // Avoid trailing slashes
    if (/^\/(\?.*)?$/.test(pathname)) {
        pathname = pathname.slice(1);
    }
    localizedHref += pathname;
    return localizedHref;
}
function hasPathnamePrefixed(prefix, pathname) {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
}
function hasTrailingSlash() {
    try {
        // Provided via `env` setting in `next.config.js` via the plugin
        return process.env._next_intl_trailing_slash === 'true';
    } catch  {
        return false;
    }
}
function getLocalizedTemplate(pathnameConfig, locale, internalTemplate) {
    return typeof pathnameConfig === 'string' ? pathnameConfig : pathnameConfig[locale] || internalTemplate;
}
function normalizeTrailingSlash(pathname) {
    const trailingSlash = hasTrailingSlash();
    const [path, ...hashParts] = pathname.split('#');
    const hash = hashParts.join('#');
    let normalizedPath = path;
    if (normalizedPath !== '/') {
        const pathnameEndsWithSlash = normalizedPath.endsWith('/');
        if (trailingSlash && !pathnameEndsWithSlash) {
            normalizedPath += '/';
        } else if (!trailingSlash && pathnameEndsWithSlash) {
            normalizedPath = normalizedPath.slice(0, -1);
        }
    }
    if (hash) {
        normalizedPath += '#' + hash;
    }
    return normalizedPath;
}
function matchesPathname(/** E.g. `/users/[userId]-[userName]` */ template, /** E.g. `/users/23-jane` */ pathname) {
    const normalizedTemplate = normalizeTrailingSlash(template);
    const normalizedPathname = normalizeTrailingSlash(pathname);
    const regex = templateToRegex(normalizedTemplate);
    return regex.test(normalizedPathname);
}
function getLocalePrefix(locale, localePrefix) {
    return localePrefix.mode !== 'never' && localePrefix.prefixes?.[locale] || // We return a prefix even if `mode: 'never'`. It's up to the consumer
    // to decide to use it or not.
    getLocaleAsPrefix(locale);
}
function getLocaleAsPrefix(locale) {
    return '/' + locale;
}
function templateToRegex(template) {
    const regexPattern = template// Replace optional catchall ('[[...slug]]')
    .replace(/\/\[\[(\.\.\.[^\]]+)\]\]/g, '(?:/(.*))?') // With leading slash
    .replace(/\[\[(\.\.\.[^\]]+)\]\]/g, '(?:/(.*))?') // Without leading slash
    // Replace catchall ('[...slug]')
    .replace(/\[(\.\.\.[^\]]+)\]/g, '(.+)')// Replace regular parameter ('[slug]')
    .replace(/\[([^\]]+)\]/g, '([^/]+)');
    return new RegExp(`^${regexPattern}$`);
}
function isOptionalCatchAllSegment(pathname) {
    return pathname.includes('[[...');
}
function isCatchAllSegment(pathname) {
    return pathname.includes('[...');
}
function isDynamicSegment(pathname) {
    return pathname.includes('[');
}
function comparePathnamePairs(a, b) {
    const pathA = a.split('/');
    const pathB = b.split('/');
    const maxLength = Math.max(pathA.length, pathB.length);
    for(let i = 0; i < maxLength; i++){
        const segmentA = pathA[i];
        const segmentB = pathB[i];
        // If one of the paths ends, prioritize the shorter path
        if (!segmentA && segmentB) return -1;
        if (segmentA && !segmentB) return 1;
        if (!segmentA && !segmentB) continue;
        // Prioritize static segments over dynamic segments
        if (!isDynamicSegment(segmentA) && isDynamicSegment(segmentB)) return -1;
        if (isDynamicSegment(segmentA) && !isDynamicSegment(segmentB)) return 1;
        // Prioritize non-catch-all segments over catch-all segments
        if (!isCatchAllSegment(segmentA) && isCatchAllSegment(segmentB)) return -1;
        if (isCatchAllSegment(segmentA) && !isCatchAllSegment(segmentB)) return 1;
        // Prioritize non-optional catch-all segments over optional catch-all segments
        if (!isOptionalCatchAllSegment(segmentA) && isOptionalCatchAllSegment(segmentB)) {
            return -1;
        }
        if (isOptionalCatchAllSegment(segmentA) && !isOptionalCatchAllSegment(segmentB)) {
            return 1;
        }
        if (segmentA === segmentB) continue;
    }
    // Both pathnames are completely static
    return 0;
}
function getSortedPathnames(pathnames) {
    return pathnames.sort(comparePathnamePairs);
}
function isPromise(value) {
    // https://github.com/amannn/next-intl/issues/1711
    return typeof value.then === 'function';
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/utils.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyBasePath",
    ()=>applyBasePath,
    "formatPathname",
    ()=>formatPathname,
    "formatPathnameTemplate",
    ()=>formatPathnameTemplate,
    "formatTemplatePathname",
    ()=>formatTemplatePathname,
    "getBestMatchingDomain",
    ()=>getBestMatchingDomain,
    "getHost",
    ()=>getHost,
    "getInternalTemplate",
    ()=>getInternalTemplate,
    "getLocaleAsPrefix",
    ()=>getLocaleAsPrefix,
    "getLocalePrefixes",
    ()=>getLocalePrefixes,
    "getNormalizedPathname",
    ()=>getNormalizedPathname,
    "getPathnameMatch",
    ()=>getPathnameMatch,
    "getRouteParams",
    ()=>getRouteParams,
    "isLocaleSupportedOnDomain",
    ()=>isLocaleSupportedOnDomain,
    "sanitizePathname",
    ()=>sanitizePathname
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
;
function getInternalTemplate(pathnames, pathname, locale) {
    const sortedPathnames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getSortedPathnames"])(Object.keys(pathnames));
    // Try to find a localized pathname that matches
    for (const internalPathname of sortedPathnames){
        const localizedPathnamesOrPathname = pathnames[internalPathname];
        if (typeof localizedPathnamesOrPathname === 'string') {
            const localizedPathname = localizedPathnamesOrPathname;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(localizedPathname, pathname)) {
                return [
                    undefined,
                    internalPathname
                ];
            }
        } else {
            // Prefer the entry with the current locale in case multiple
            // localized pathnames match the current pathname
            const sortedEntries = Object.entries(localizedPathnamesOrPathname);
            const curLocaleIndex = sortedEntries.findIndex(([entryLocale])=>entryLocale === locale);
            if (curLocaleIndex > 0) {
                sortedEntries.unshift(sortedEntries.splice(curLocaleIndex, 1)[0]);
            }
            for (const [entryLocale] of sortedEntries){
                const localizedTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnames[internalPathname], entryLocale, internalPathname);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(localizedTemplate, pathname)) {
                    return [
                        entryLocale,
                        internalPathname
                    ];
                }
            }
        }
    }
    // Try to find an internal pathname that matches (this can be the case
    // if all localized pathnames are different from the internal pathnames)
    for (const internalPathname of Object.keys(pathnames)){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(internalPathname, pathname)) {
            return [
                undefined,
                internalPathname
            ];
        }
    }
    // No match
    return [
        undefined,
        undefined
    ];
}
function formatTemplatePathname(sourcePathname, sourceTemplate, targetTemplate, prefix) {
    const params = getRouteParams(sourceTemplate, sourcePathname);
    let targetPathname = '';
    targetPathname += formatPathnameTemplate(targetTemplate, params);
    // A pathname with an optional catchall like `/categories/[[...slug]]`
    // should be normalized to `/categories` if the catchall is not present
    // and no trailing slash is configured
    targetPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(targetPathname);
    return targetPathname;
}
/**
 * Removes potential prefixes from the pathname.
 */ function getNormalizedPathname(pathname, locales, localePrefix) {
    // Add trailing slash for consistent handling
    // both for the root as well as nested paths
    if (!pathname.endsWith('/')) {
        pathname += '/';
    }
    const localePrefixes = getLocalePrefixes(locales, localePrefix);
    const regex = new RegExp(`^(${localePrefixes.map(([, prefix])=>prefix.replaceAll('/', '\\/')).join('|')})/(.*)`, 'i');
    const match = pathname.match(regex);
    let result = match ? '/' + match[2] : pathname;
    if (result !== '/') {
        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(result);
    }
    return result;
}
function getLocalePrefixes(locales, localePrefix, sort = true) {
    const prefixes = locales.map((locale)=>[
            locale,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, localePrefix)
        ]);
    if (sort) {
        // More specific ones first
        prefixes.sort((a, b)=>b[1].length - a[1].length);
    }
    return prefixes;
}
function getPathnameMatch(pathname, locales, localePrefix, domain) {
    const localePrefixes = getLocalePrefixes(locales, localePrefix);
    // Sort to prioritize domain locales
    if (domain) {
        localePrefixes.sort(([localeA], [localeB])=>{
            if (localeA === domain.defaultLocale) return -1;
            if (localeB === domain.defaultLocale) return 1;
            const isLocaleAInDomain = domain.locales.includes(localeA);
            const isLocaleBInDomain = domain.locales.includes(localeB);
            if (isLocaleAInDomain && !isLocaleBInDomain) return -1;
            if (!isLocaleAInDomain && isLocaleBInDomain) return 1;
            return 0;
        });
    }
    for (const [locale, prefix] of localePrefixes){
        let exact, matches;
        if (pathname === prefix || pathname.startsWith(prefix + '/')) {
            exact = matches = true;
        } else {
            const normalizedPathname = pathname.toLowerCase();
            const normalizedPrefix = prefix.toLowerCase();
            if (normalizedPathname === normalizedPrefix || normalizedPathname.startsWith(normalizedPrefix + '/')) {
                exact = false;
                matches = true;
            }
        }
        if (matches) {
            return {
                locale,
                prefix,
                matchedPrefix: pathname.slice(0, prefix.length),
                exact
            };
        }
    }
}
function getRouteParams(template, pathname) {
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(pathname);
    const normalizedTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(template);
    const regex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["templateToRegex"])(normalizedTemplate);
    const match = regex.exec(normalizedPathname);
    if (!match) return undefined;
    const params = {};
    const keys = normalizedTemplate.match(/\[([^\]]+)\]/g) ?? [];
    for(let i = 1; i < match.length; i++){
        const rawKey = keys[i - 1];
        if (!rawKey) continue;
        const key = rawKey.replace(/[[\]]/g, '');
        const value = match[i] ?? '';
        params[key] = value;
    }
    return params;
}
function formatPathnameTemplate(template, params) {
    if (!params) return template;
    // Simplify syntax for optional catchall ('[[...slug]]') so
    // we can replace the value with simple interpolation
    template = template.replace(/\[\[/g, '[').replace(/\]\]/g, ']');
    let result = template;
    Object.entries(params).forEach(([key, value])=>{
        result = result.replace(`[${key}]`, value);
    });
    return result;
}
function formatPathname(pathname, prefix, search) {
    let result = pathname;
    if (prefix) {
        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["prefixPathname"])(prefix, result);
    }
    if (search) {
        result += search;
    }
    return result;
}
function getHost(requestHeaders) {
    return requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? undefined;
}
function isLocaleSupportedOnDomain(locale, domain) {
    return domain.defaultLocale === locale || domain.locales.includes(locale);
}
function getBestMatchingDomain(curHostDomain, locale, domainsConfig) {
    let domainConfig;
    // Prio 1: Stay on current domain
    if (curHostDomain && isLocaleSupportedOnDomain(locale, curHostDomain)) {
        domainConfig = curHostDomain;
    }
    // Prio 2: Use alternative domain with matching default locale
    if (!domainConfig) {
        domainConfig = domainsConfig.find((cur)=>cur.defaultLocale === locale);
    }
    // Prio 3: Use alternative domain that supports the locale
    if (!domainConfig) {
        domainConfig = domainsConfig.find((cur)=>cur.locales.includes(locale));
    }
    return domainConfig;
}
function applyBasePath(pathname, basePath) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(basePath + pathname);
}
function getLocaleAsPrefix(locale) {
    return `/${locale}`;
}
function sanitizePathname(pathname) {
    // Sanitize malicious URIs, e.g.:
    // '/en/\\example.org → /en/%5C%5Cexample.org'
    // '/en////example.org → /en/example.org'
    return pathname.replace(/\\/g, '%5C').replace(/\/+/g, '/');
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/getAlternateLinksHeaderValue.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getAlternateLinksHeaderValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/utils.js [middleware-edge] (ecmascript)");
;
;
/**
 * See https://developers.google.com/search/docs/specialty/international/localized-versions
 */ function getAlternateLinksHeaderValue({ internalTemplateName, localizedPathnames, request, resolvedLocale, routing }) {
    const normalizedUrl = request.nextUrl.clone();
    const host = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getHost"])(request.headers);
    if (host) {
        normalizedUrl.port = '';
        normalizedUrl.host = host;
    }
    normalizedUrl.protocol = request.headers.get('x-forwarded-proto') ?? normalizedUrl.protocol;
    normalizedUrl.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getNormalizedPathname"])(normalizedUrl.pathname, routing.locales, routing.localePrefix);
    function getAlternateEntry(url, locale) {
        url.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(url.pathname);
        if (request.nextUrl.basePath) {
            url = new URL(url);
            url.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyBasePath"])(url.pathname, request.nextUrl.basePath);
        }
        return `<${url.toString()}>; rel="alternate"; hreflang="${locale}"`;
    }
    function getLocalizedPathname(pathname, locale) {
        if (localizedPathnames && typeof localizedPathnames === 'object') {
            const sourceTemplate = localizedPathnames[resolvedLocale];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatTemplatePathname"])(pathname, sourceTemplate ?? internalTemplateName, localizedPathnames[locale] ?? internalTemplateName);
        } else {
            return pathname;
        }
    }
    const links = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefixes"])(routing.locales, routing.localePrefix, false).flatMap(([locale, prefix])=>{
        function prefixPathname(pathname) {
            if (pathname === '/') {
                return prefix;
            } else {
                return prefix + pathname;
            }
        }
        let url;
        if (routing.domains) {
            const domainConfigs = routing.domains.filter((cur)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocaleSupportedOnDomain"])(locale, cur));
            return domainConfigs.map((domainConfig)=>{
                url = new URL(normalizedUrl);
                url.port = '';
                url.host = domainConfig.domain;
                // Important: Use `normalizedUrl` here, as `url` potentially uses
                // a `basePath` that automatically gets applied to the pathname
                url.pathname = getLocalizedPathname(normalizedUrl.pathname, locale);
                if (locale !== domainConfig.defaultLocale || routing.localePrefix.mode === 'always') {
                    url.pathname = prefixPathname(url.pathname);
                }
                return getAlternateEntry(url, locale);
            });
        } else {
            let pathname;
            if (localizedPathnames && typeof localizedPathnames === 'object') {
                pathname = getLocalizedPathname(normalizedUrl.pathname, locale);
            } else {
                pathname = normalizedUrl.pathname;
            }
            if (locale !== routing.defaultLocale || routing.localePrefix.mode === 'always') {
                pathname = prefixPathname(pathname);
            }
            url = new URL(pathname, normalizedUrl);
        }
        return getAlternateEntry(url, locale);
    });
    // Add x-default entry
    const shouldAddXDefault = // For domain-based routing there is no reasonable x-default
    !routing.domains || routing.domains.length === 0;
    if (shouldAddXDefault) {
        const localizedPathname = getLocalizedPathname(normalizedUrl.pathname, routing.defaultLocale);
        if (localizedPathname) {
            const url = new URL(localizedPathname, normalizedUrl);
            links.push(getAlternateEntry(url, 'x-default'));
        }
    }
    return links.join(', ');
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/resolveLocale.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>resolveLocale,
    "getAcceptLanguageLocale",
    ()=>getAcceptLanguageLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/intl-localematcher/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$node_modules$2f$negotiator$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/utils.js [middleware-edge] (ecmascript)");
;
;
;
function findDomainFromHost(requestHeaders, domains) {
    const host = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getHost"])(requestHeaders);
    if (host) {
        return domains.find((cur)=>cur.domain === host);
    }
    return undefined;
}
function orderLocales(locales) {
    // Workaround for https://github.com/formatjs/formatjs/issues/4469
    return locales.slice().sort((a, b)=>b.length - a.length);
}
function mapToProvidedLocale(locales, locale) {
    return locales.find((cur)=>cur.toLowerCase() === locale.toLowerCase());
}
function getAcceptLanguageLocale(requestHeaders, locales, defaultLocale) {
    let locale;
    const languages = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$node_modules$2f$negotiator$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]({
        headers: {
            'accept-language': requestHeaders.get('accept-language') || undefined
        }
    }).languages();
    try {
        const orderedLocales = orderLocales(locales);
        locale = mapToProvidedLocale(locales, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["match"])(languages, orderedLocales, defaultLocale));
    } catch  {
    // Invalid language
    }
    return locale;
}
function getLocaleFromCookie(routing, requestCookies) {
    if (routing.localeCookie && requestCookies.has(routing.localeCookie.name)) {
        const value = requestCookies.get(routing.localeCookie.name)?.value;
        if (value && routing.locales.includes(value)) {
            return value;
        }
    }
}
function resolveLocaleFromPrefix(routing, requestHeaders, requestCookies, pathname) {
    let locale;
    // Prio 1: Use route prefix
    if (pathname) {
        locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getPathnameMatch"])(pathname, routing.locales, routing.localePrefix)?.locale;
    }
    // Prio 2: Use existing cookie
    if (!locale && routing.localeDetection) {
        locale = getLocaleFromCookie(routing, requestCookies);
    }
    // Prio 3: Use the `accept-language` header
    if (!locale && routing.localeDetection) {
        locale = getAcceptLanguageLocale(requestHeaders, routing.locales, routing.defaultLocale);
    }
    // Prio 4: Use default locale
    if (!locale) {
        locale = routing.defaultLocale;
    }
    return locale;
}
function resolveLocaleFromDomain(routing, requestHeaders, requestCookies, pathname) {
    const domains = routing.domains;
    const domain = findDomainFromHost(requestHeaders, domains);
    if (!domain) {
        return {
            locale: resolveLocaleFromPrefix(routing, requestHeaders, requestCookies, pathname)
        };
    }
    let locale;
    // Prio 1: Use route prefix
    if (pathname) {
        const prefixLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getPathnameMatch"])(pathname, routing.locales, routing.localePrefix, domain)?.locale;
        if (prefixLocale) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocaleSupportedOnDomain"])(prefixLocale, domain)) {
                locale = prefixLocale;
            } else {
                // Causes a redirect to a domain that supports the locale
                return {
                    locale: prefixLocale,
                    domain
                };
            }
        }
    }
    // Prio 2: Use existing cookie
    if (!locale && routing.localeDetection) {
        const cookieLocale = getLocaleFromCookie(routing, requestCookies);
        if (cookieLocale) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocaleSupportedOnDomain"])(cookieLocale, domain)) {
                locale = cookieLocale;
            }
        }
    }
    // Prio 3: Use the `accept-language` header
    if (!locale && routing.localeDetection) {
        const headerLocale = getAcceptLanguageLocale(requestHeaders, domain.locales, domain.defaultLocale);
        if (headerLocale) {
            locale = headerLocale;
        }
    }
    // Prio 4: Use default locale
    if (!locale) {
        locale = domain.defaultLocale;
    }
    return {
        locale,
        domain
    };
}
function resolveLocale(routing, requestHeaders, requestCookies, pathname) {
    if (routing.domains) {
        return resolveLocaleFromDomain(routing, requestHeaders, requestCookies, pathname);
    } else {
        return {
            locale: resolveLocaleFromPrefix(routing, requestHeaders, requestCookies, pathname)
        };
    }
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/syncCookie.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>syncCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$resolveLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/resolveLocale.js [middleware-edge] (ecmascript)");
;
function syncCookie(request, response, locale, routing, domain) {
    if (!routing.localeCookie) return;
    const { name, ...rest } = routing.localeCookie;
    const hasLocaleCookie = request.cookies.has(name);
    const hasOutdatedCookie = hasLocaleCookie && request.cookies.get(name)?.value !== locale;
    if (hasOutdatedCookie) {
        response.cookies.set(name, locale, {
            path: request.nextUrl.basePath || undefined,
            ...rest
        });
    } else if (!hasLocaleCookie) {
        const acceptLanguageLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$resolveLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getAcceptLanguageLocale"])(request.headers, domain?.locales || routing.locales, routing.defaultLocale);
        if (acceptLanguageLocale !== locale) {
            response.cookies.set(name, locale, {
                path: request.nextUrl.basePath || undefined,
                ...rest
            });
        }
    }
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/routing/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$getAlternateLinksHeaderValue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/getAlternateLinksHeaderValue.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$resolveLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/resolveLocale.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$syncCookie$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/syncCookie.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/middleware/utils.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
function createMiddleware(routing) {
    const resolvedRouting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["receiveRoutingConfig"])(routing);
    return function middleware(request) {
        let unsafeExternalPathname;
        try {
            // Resolve potential foreign symbols (e.g. /ja/%E7%B4%84 → /ja/約))
            unsafeExternalPathname = decodeURI(request.nextUrl.pathname);
        } catch  {
            // In case an invalid pathname is encountered, forward
            // it to Next.js which in turn responds with a 400
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        }
        // Sanitize malicious URIs to prevent open redirect attacks due to
        // decodeURI doesn't escape encoded backslashes ('%5C' & '%5c')
        const externalPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sanitizePathname"])(unsafeExternalPathname);
        const { domain, locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$resolveLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(resolvedRouting, request.headers, request.cookies, externalPathname);
        const hasMatchedDefaultLocale = domain ? domain.defaultLocale === locale : locale === resolvedRouting.defaultLocale;
        const domainsConfig = resolvedRouting.domains?.filter((curDomain)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocaleSupportedOnDomain"])(locale, curDomain)) || [];
        const hasUnknownHost = resolvedRouting.domains != null && !domain;
        function next(url) {
            const urlObj = new URL(url, request.url);
            if (request.nextUrl.basePath) {
                urlObj.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyBasePath"])(urlObj.pathname, request.nextUrl.basePath);
            }
            const headers = new Headers(request.headers);
            headers.set(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HEADER_LOCALE_NAME"], locale);
            const isRewriteNecessary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(request.nextUrl.pathname) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(urlObj.pathname);
            if (isRewriteNecessary) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(urlObj, {
                    request: {
                        headers
                    }
                });
            } else {
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request: {
                        headers
                    }
                });
            }
        }
        function redirect(url, redirectDomain) {
            const urlObj = new URL(url, request.url);
            urlObj.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(urlObj.pathname);
            if (domainsConfig.length > 0 && !redirectDomain && domain) {
                const bestMatchingDomain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getBestMatchingDomain"])(domain, locale, domainsConfig);
                if (bestMatchingDomain) {
                    redirectDomain = bestMatchingDomain.domain;
                    if (bestMatchingDomain.defaultLocale === locale && resolvedRouting.localePrefix.mode === 'as-needed') {
                        urlObj.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getNormalizedPathname"])(urlObj.pathname, resolvedRouting.locales, resolvedRouting.localePrefix);
                    }
                }
            }
            if (redirectDomain) {
                urlObj.host = redirectDomain;
                if (request.headers.get('x-forwarded-host')) {
                    urlObj.protocol = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol;
                    const redirectDomainPort = redirectDomain.split(':')[1];
                    urlObj.port = redirectDomainPort ?? request.headers.get('x-forwarded-port') ?? '';
                }
            }
            if (request.nextUrl.basePath) {
                urlObj.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyBasePath"])(urlObj.pathname, request.nextUrl.basePath);
            }
            hasRedirected = true;
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(urlObj.toString());
        }
        const unprefixedExternalPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getNormalizedPathname"])(externalPathname, resolvedRouting.locales, resolvedRouting.localePrefix);
        const pathnameMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getPathnameMatch"])(externalPathname, resolvedRouting.locales, resolvedRouting.localePrefix, domain);
        const hasLocalePrefix = pathnameMatch != null;
        const isUnprefixedRouting = resolvedRouting.localePrefix.mode === 'never' || hasMatchedDefaultLocale && resolvedRouting.localePrefix.mode === 'as-needed';
        let response;
        let internalTemplateName;
        let hasRedirected;
        let unprefixedInternalPathname = unprefixedExternalPathname;
        const pathnames = resolvedRouting.pathnames;
        if (pathnames) {
            let resolvedTemplateLocale;
            [resolvedTemplateLocale, internalTemplateName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getInternalTemplate"])(pathnames, unprefixedExternalPathname, locale);
            if (internalTemplateName) {
                const pathnameConfig = pathnames[internalTemplateName];
                const localeTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnameConfig, locale, internalTemplateName);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(localeTemplate, unprefixedExternalPathname)) {
                    unprefixedInternalPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatTemplatePathname"])(unprefixedExternalPathname, localeTemplate, internalTemplateName);
                } else {
                    let sourceTemplate;
                    if (resolvedTemplateLocale) {
                        // A localized pathname from another locale has matched
                        sourceTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnameConfig, resolvedTemplateLocale, internalTemplateName);
                    } else {
                        // An internal pathname has matched that
                        // doesn't have a localized pathname
                        sourceTemplate = internalTemplateName;
                    }
                    const localePrefix = isUnprefixedRouting ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, resolvedRouting.localePrefix);
                    const template = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatTemplatePathname"])(unprefixedExternalPathname, sourceTemplate, localeTemplate);
                    response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(template, localePrefix, request.nextUrl.search));
                }
            }
        }
        if (!response) {
            if (unprefixedInternalPathname === '/' && !hasLocalePrefix) {
                if (isUnprefixedRouting) {
                    response = next((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedInternalPathname, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocaleAsPrefix"])(locale), request.nextUrl.search));
                } else {
                    response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, resolvedRouting.localePrefix), request.nextUrl.search));
                }
            } else {
                const internalHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedInternalPathname, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocaleAsPrefix"])(locale), request.nextUrl.search);
                if (hasLocalePrefix) {
                    const externalHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, pathnameMatch.prefix, request.nextUrl.search);
                    if (resolvedRouting.localePrefix.mode === 'never') {
                        response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, undefined, request.nextUrl.search));
                    } else if (pathnameMatch.exact) {
                        if (hasMatchedDefaultLocale && isUnprefixedRouting) {
                            response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, undefined, request.nextUrl.search));
                        } else {
                            if (resolvedRouting.domains) {
                                const pathDomain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getBestMatchingDomain"])(domain, pathnameMatch.locale, domainsConfig);
                                if (domain?.domain !== pathDomain?.domain && !hasUnknownHost) {
                                    response = redirect(externalHref, pathDomain?.domain);
                                } else {
                                    response = next(internalHref);
                                }
                            } else {
                                response = next(internalHref);
                            }
                        }
                    } else {
                        response = redirect(externalHref);
                    }
                } else {
                    if (isUnprefixedRouting) {
                        response = next(internalHref);
                    } else {
                        response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, resolvedRouting.localePrefix), request.nextUrl.search));
                    }
                }
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$syncCookie$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(request, response, locale, resolvedRouting, domain);
        if (!hasRedirected && resolvedRouting.localePrefix.mode !== 'never' && resolvedRouting.alternateLinks && resolvedRouting.locales.length > 1) {
            response.headers.set('Link', (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$getAlternateLinksHeaderValue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
                routing: resolvedRouting,
                internalTemplateName,
                localizedPathnames: internalTemplateName != null && pathnames ? pathnames[internalTemplateName] : undefined,
                request,
                resolvedLocale: locale
            }));
        }
        return response;
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>defineRouting
]);
function defineRouting(config) {
    if (config.domains) {
        validateUniqueLocalesPerDomain(config.domains);
    }
    return config;
}
function validateUniqueLocalesPerDomain(domains) {
    const domainsByLocale = new Map();
    for (const { domain, locales } of domains){
        for (const locale of locales){
            const localeDomains = domainsByLocale.get(locale) || new Set();
            localeDomains.add(domain);
            domainsByLocale.set(locale, localeDomains);
        }
    }
    const duplicateLocaleMessages = Array.from(domainsByLocale.entries()).filter(([, localeDomains])=>localeDomains.size > 1).map(([locale, localeDomains])=>`- "${locale}" is used by: ${Array.from(localeDomains).join(', ')}`);
    if (duplicateLocaleMessages.length > 0) {
        console.warn('Locales are expected to be unique per domain, but found overlap:\n' + duplicateLocaleMessages.join('\n') + '\nPlease see https://next-intl.dev/docs/routing/configuration#domains');
    }
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript) <export default as defineRouting>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineRouting",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/use.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>use
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
;
// @ts-expect-error -- Ooof, Next.js doesn't make this easy.
// `use` is only available in React 19 canary, but we can
// use it in Next.js already as Next.js "vendors" a fixed
// version of React. However, if we'd simply put `use` in
// ESM code, then the build doesn't work since React does
// not export `use` officially. Therefore, we have to use
// something that is not statically analyzable. Once React
// 19 is out, we can remove this in the next major version.
var use = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__['use'.trim()];
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [middleware-edge] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js <module evaluation>", "default");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [middleware-edge] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js", "default");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/utils.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyPathnamePrefix",
    ()=>applyPathnamePrefix,
    "compileLocalizedPathname",
    ()=>compileLocalizedPathname,
    "getBasePath",
    ()=>getBasePath,
    "getRoute",
    ()=>getRoute,
    "normalizeNameOrNameWithParams",
    ()=>normalizeNameOrNameWithParams,
    "serializeSearchParams",
    ()=>serializeSearchParams,
    "validateReceivedConfig",
    ()=>validateReceivedConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
;
// Minor false positive: A route that has both optional and
// required params will allow optional params.
// For `Link`
// For `getPathname` (hence also its consumers: `redirect`, `useRouter`, …)
function normalizeNameOrNameWithParams(href) {
    return typeof href === 'string' ? {
        pathname: href
    } : href;
}
function serializeSearchParams(searchParams) {
    function serializeValue(value) {
        return String(value);
    }
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)){
        if (Array.isArray(value)) {
            value.forEach((cur)=>{
                urlSearchParams.append(key, serializeValue(cur));
            });
        } else {
            urlSearchParams.set(key, serializeValue(value));
        }
    }
    return '?' + urlSearchParams.toString();
}
function compileLocalizedPathname({ pathname, locale, params, pathnames, query }) {
    function compilePath(value) {
        const pathnameConfig = pathnames[value];
        let compiled;
        if (pathnameConfig) {
            const template = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnameConfig, locale, value);
            compiled = template;
            if (params) {
                Object.entries(params).forEach(([key, paramValue])=>{
                    let regexp, replacer;
                    if (Array.isArray(paramValue)) {
                        regexp = `(\\[)?\\[...${key}\\](\\])?`;
                        replacer = paramValue.map((v)=>String(v)).join('/');
                    } else {
                        regexp = `\\[${key}\\]`;
                        replacer = String(paramValue);
                    }
                    compiled = compiled.replace(new RegExp(regexp, 'g'), replacer);
                });
            }
            // Clean up optional catch-all segments that were not replaced
            compiled = compiled.replace(/\[\[\.\.\..+\]\]/g, '');
            if (compiled.includes('[')) {
                // Next.js throws anyway, therefore better provide a more helpful error message
                throw new Error(`Insufficient params provided for localized pathname.\nTemplate: ${template}\nParams: ${JSON.stringify(params)}`);
            }
            compiled = encodePathname(compiled);
        } else {
            // Unknown pathnames
            compiled = value;
        }
        compiled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(compiled);
        if (query) {
            // This also encodes non-ASCII characters by
            // using `new URLSearchParams()` internally
            compiled += serializeSearchParams(query);
        }
        return compiled;
    }
    if (typeof pathname === 'string') {
        return compilePath(pathname);
    } else {
        const { pathname: internalPathname, ...rest } = pathname;
        const compiled = compilePath(internalPathname);
        const result = {
            ...rest,
            pathname: compiled
        };
        return result;
    }
}
function encodePathname(pathname) {
    // Generally, to comply with RFC 3986 and Google's best practices for URL structures
    // (https://developers.google.com/search/docs/crawling-indexing/url-structure),
    // we should always encode non-ASCII characters.
    //
    // There are two places where next-intl interacts with potentially non-ASCII URLs:
    // 1. Middleware: When mapping a localized pathname to a non-localized pathname internally
    // 2. Navigation APIs: When generating a URLs to be used for <Link /> & friends
    //
    // Next.js normalizes incoming pathnames to always be encoded, therefore we can safely
    // decode them there (see middleware.tsx). On the other hand, Next.js doesn't consistently
    // encode non-ASCII characters that are passed to navigation APIs:
    // 1. <Link /> doesn't encode non-ASCII characters
    // 2. useRouter() uses `new URL()` internally, which will encode—but only if necessary
    // 3. redirect() uses useRouter() on the client, but on the server side only
    //    assigns the location header without encoding.
    //
    // In addition to this, for getPathname() we need to encode non-ASCII characters.
    //
    // Therefore, the bottom line is that next-intl should take care of encoding non-ASCII
    // characters in all cases, but can rely on `new URL()` to not double-encode characters.
    return new URL(pathname, 'http://l').pathname;
}
function getRoute(locale, pathname, pathnames) {
    const sortedPathnames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getSortedPathnames"])(Object.keys(pathnames));
    const decoded = decodeURI(pathname);
    for (const internalPathname of sortedPathnames){
        const localizedPathnamesOrPathname = pathnames[internalPathname];
        if (typeof localizedPathnamesOrPathname === 'string') {
            const localizedPathname = localizedPathnamesOrPathname;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(localizedPathname, decoded)) {
                return internalPathname;
            }
        } else {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(localizedPathnamesOrPathname, locale, internalPathname), decoded)) {
                return internalPathname;
            }
        }
    }
    return pathname;
}
function getBasePath(pathname, windowPathname = window.location.pathname) {
    if (pathname === '/') {
        return windowPathname;
    } else {
        return windowPathname.replace(pathname, '');
    }
}
function applyPathnamePrefix(pathname, locale, routing, force) {
    const { mode } = routing.localePrefix;
    let shouldPrefix;
    if (force !== undefined) {
        shouldPrefix = force;
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocalizableHref"])(pathname)) {
        if (mode === 'always') {
            shouldPrefix = true;
        } else if (mode === 'as-needed') {
            shouldPrefix = routing.domains ? // Since locales are unique per domain, any locale that is a
            // default locale of a domain doesn't require a prefix
            !routing.domains.some((cur)=>cur.defaultLocale === locale) : locale !== routing.defaultLocale;
        }
    }
    return shouldPrefix ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["prefixPathname"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, routing.localePrefix), pathname) : pathname;
}
function validateReceivedConfig(config) {
    if (config.localePrefix?.mode === 'as-needed' && !('defaultLocale' in config)) {
        throw new Error("`localePrefix: 'as-needed' requires a `defaultLocale`.");
    }
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/createSharedNavigationFns.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createSharedNavigationFns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/esm/api/navigation.react-server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/esm/client/components/navigation.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/routing/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$use$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/use.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.react-server.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Shared implementations for `react-server` and `react-client`
 */ function createSharedNavigationFns(getLocale, routing) {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["receiveRoutingConfig"])(routing || {});
    {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateReceivedConfig"])(config);
    }
    const pathnames = config.pathnames;
    function Link({ href, locale, ...rest }, ref) {
        let pathname, params;
        if (typeof href === 'object') {
            pathname = href.pathname;
            // @ts-expect-error -- This is ok
            params = href.params;
        } else {
            pathname = href;
        }
        // @ts-expect-error -- This is ok
        const isLocalizable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocalizableHref"])(href);
        const localePromiseOrValue = getLocale();
        const curLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPromise"])(localePromiseOrValue) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$use$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(localePromiseOrValue) : localePromiseOrValue;
        const finalPathname = isLocalizable ? getPathname({
            locale: locale || curLocale,
            // @ts-expect-error -- This is ok
            href: pathnames == null ? pathname : {
                pathname,
                params
            },
            // Always include a prefix when changing locales
            forcePrefix: locale != null || undefined
        }) : pathname;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"], {
            ref: ref,
            href: typeof href === 'object' ? {
                ...href,
                pathname: finalPathname
            } : finalPathname,
            locale: locale,
            localeCookie: config.localeCookie,
            ...rest
        });
    }
    const LinkWithRef = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["forwardRef"])(Link);
    function getPathname(args) {
        const { forcePrefix, href, locale } = args;
        let pathname;
        if (pathnames == null) {
            if (typeof href === 'object') {
                pathname = href.pathname;
                if (href.query) {
                    pathname += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["serializeSearchParams"])(href.query);
                }
            } else {
                pathname = href;
            }
        } else {
            pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["compileLocalizedPathname"])({
                locale,
                // @ts-expect-error -- This is ok
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeNameOrNameWithParams"])(href),
                // @ts-expect-error -- This is ok
                pathnames: config.pathnames
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyPathnamePrefix"])(pathname, locale, config, forcePrefix);
    }
    function getRedirectFn(fn) {
        /** @see https://next-intl.dev/docs/routing/navigation#redirect */ return function redirectFn(args, ...rest) {
            return fn(getPathname(args), ...rest);
        };
    }
    const redirect$1 = getRedirectFn(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["redirect"]);
    const permanentRedirect$1 = getRedirectFn(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["permanentRedirect"]);
    return {
        config,
        Link: LinkWithRef,
        redirect: redirect$1,
        permanentRedirect: permanentRedirect$1,
        getPathname
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocaleCache.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedRequestLocale",
    ()=>getCachedRequestLocale,
    "setCachedRequestLocale",
    ()=>setCachedRequestLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
;
// See https://github.com/vercel/next.js/discussions/58862
function getCacheImpl() {
    const value = {
        locale: undefined
    };
    return value;
}
const getCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getCacheImpl);
function getCachedRequestLocale() {
    return getCache().locale;
}
function setCachedRequestLocale(locale) {
    getCache().locale = locale;
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocale.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRequestLocale",
    ()=>getRequestLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/esm/api/headers.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/esm/server/request/headers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocaleCache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocaleCache.js [middleware-edge] (ecmascript)");
;
;
;
;
;
async function getHeadersImpl() {
    const promiseOrValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["headers"])();
    // Compatibility with Next.js <15
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPromise"])(promiseOrValue) ? await promiseOrValue : promiseOrValue;
}
const getHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getHeadersImpl);
async function getLocaleFromHeaderImpl() {
    let locale;
    try {
        locale = (await getHeaders()).get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HEADER_LOCALE_NAME"]) || undefined;
    } catch (error) {
        if (error instanceof Error && error.digest === 'DYNAMIC_SERVER_USAGE') {
            const wrappedError = new Error('Usage of next-intl APIs in Server Components currently opts into dynamic rendering. This limitation will eventually be lifted, but as a stopgap solution, you can use the `setRequestLocale` API to enable static rendering, see https://next-intl.dev/docs/routing/setup#static-rendering', {
                cause: error
            });
            wrappedError.digest = error.digest;
            throw wrappedError;
        } else {
            throw error;
        }
    }
    return locale;
}
const getLocaleFromHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getLocaleFromHeaderImpl);
async function getRequestLocale() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocaleCache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCachedRequestLocale"])() || await getLocaleFromHeader();
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getRequestConfig
]);
/**
 * Should be called in `i18n/request.ts` to create the configuration for the current request.
 */ function getRequestConfig(createRequestConfig) {
    return createRequestConfig;
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript) <export default as getRequestConfig>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRequestConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/validateLocale.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>validateLocale
]);
function validateLocale(locale) {
    try {
        const constructed = new Intl.Locale(locale);
        if (!constructed.language) {
            throw new Error('Language is required');
        }
    } catch  {
        console.error(`An invalid locale was provided: "${locale}"\nPlease ensure you're using a valid Unicode locale identifier (e.g. "en-US").`);
    }
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/getConfig.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__i__as__initializeConfig$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/initializeConfig-DzxNJxi9.js [middleware-edge] (ecmascript) <export i as initializeConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__c__as__$5f$createIntlFormatters$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript) <export c as _createIntlFormatters>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__b__as__$5f$createCache$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript) <export b as _createCache>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocale.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$i18n$2f$request$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/i18n/request.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$validateLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/validateLocale.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
// This is automatically inherited by `NextIntlClientProvider` if
// the component is rendered from a Server Component
function getDefaultTimeZoneImpl() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
const getDefaultTimeZone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getDefaultTimeZoneImpl);
async function receiveRuntimeConfigImpl(getConfig, localeOverride) {
    if (typeof getConfig !== 'function') {
        throw new Error(`Invalid i18n request configuration detected.

Please verify that:
1. In case you've specified a custom location in your Next.js config, make sure that the path is correct.
2. You have a default export in your i18n request configuration file.

See also: https://next-intl.dev/docs/usage/configuration#i18n-request
`);
    }
    const params = {
        locale: localeOverride,
        // In case the consumer doesn't read `params.locale` and instead provides the
        // `locale` (either in a single-language workflow or because the locale is
        // read from the user settings), don't attempt to read the request locale.
        get requestLocale () {
            return localeOverride ? Promise.resolve(localeOverride) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRequestLocale"])();
        }
    };
    let result = getConfig(params);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPromise"])(result)) {
        result = await result;
    }
    if (!result.locale) {
        throw new Error('No locale was returned from `getRequestConfig`.\n\nSee https://next-intl.dev/docs/usage/configuration#i18n-request');
    }
    {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$validateLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(result.locale);
    }
    return result;
}
const receiveRuntimeConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(receiveRuntimeConfigImpl);
const getFormatters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__c__as__$5f$createIntlFormatters$3e$__["_createIntlFormatters"]);
const getCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__b__as__$5f$createCache$3e$__["_createCache"]);
async function getConfigImpl(localeOverride) {
    const runtimeConfig = await receiveRuntimeConfig(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$i18n$2f$request$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"], localeOverride);
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__i__as__initializeConfig$3e$__["initializeConfig"])(runtimeConfig),
        _formatters: getFormatters(getCache()),
        timeZone: runtimeConfig.timeZone || getDefaultTimeZone()
    };
}
const getConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getConfigImpl);
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/react-server/getServerLocale.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getServerLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/server/react-server/getConfig.js [middleware-edge] (ecmascript)");
;
/**
 * This is only moved to a separate module for easier mocking in
 * `../createNavigatoin.test.tsx` in order to avoid suspending.
 */ async function getServerLocale() {
    const config = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])();
    return config.locale;
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$createSharedNavigationFns$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/createSharedNavigationFns.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$getServerLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/react-server/getServerLocale.js [middleware-edge] (ecmascript)");
;
;
function createNavigation(routing) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { config, ...fns } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$createSharedNavigationFns$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$getServerLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"], routing);
    function notSupported(hookName) {
        return ()=>{
            throw new Error(`\`${hookName}\` is not supported in Server Components. You can use this hook if you convert the calling component to a Client Component.`);
        };
    }
    return {
        ...fns,
        usePathname: notSupported('usePathname'),
        useRouter: notSupported('useRouter')
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript) <export default as createNavigation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createNavigation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/fast-memoize/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memoize",
    ()=>memoize,
    "strategies",
    ()=>strategies
]);
function memoize(fn, options) {
    const cache = options && options.cache ? options.cache : cacheDefault;
    const serializer = options && options.serializer ? options.serializer : serializerDefault;
    const strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
        cache,
        serializer
    });
}
//
// Strategy
//
function isPrimitive(value) {
    return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
    const cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    let computedValue = cache.get(cacheKey);
    if (typeof computedValue === "undefined") {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function variadic(fn, cache, serializer) {
    const args = Array.prototype.slice.call(arguments, 3);
    const cacheKey = serializer(args);
    let computedValue = cache.get(cacheKey);
    if (typeof computedValue === "undefined") {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
    return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
    const strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
    return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
    return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
//
// Serializer
//
const serializerDefault = function() {
    return JSON.stringify(arguments);
};
//
// Cache
//
class ObjectWithoutPrototypeCache {
    cache;
    constructor(){
        this.cache = Object.create(null);
    }
    get(key) {
        return this.cache[key];
    }
    set(key, value) {
        this.cache[key] = value;
    }
}
const cacheDefault = {
    create: function create() {
        return new ObjectWithoutPrototypeCache();
    }
};
const strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/lib/charset.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;
/**
 * Module variables.
 * @private
 */ var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Charset header.
 * @private
 */ function parseAcceptCharset(accept) {
    var accepts = accept.split(',');
    for(var i = 0, j = 0; i < accepts.length; i++){
        var charset = parseCharset(accepts[i].trim(), i);
        if (charset) {
            accepts[j++] = charset;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */ function parseCharset(str, i) {
    var match = simpleCharsetRegExp.exec(str);
    if (!match) return null;
    var charset = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].trim().split('=');
            if (p[0] === 'q') {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return {
        charset: charset,
        q: q,
        i: i
    };
}
/**
 * Get the priority of a charset.
 * @private
 */ function getCharsetPriority(charset, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(charset, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the charset.
 * @private
 */ function specify(charset, spec, index) {
    var s = 0;
    if (spec.charset.toLowerCase() === charset.toLowerCase()) {
        s |= 1;
    } else if (spec.charset !== '*') {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */ function preferredCharsets(accept, provided) {
    // RFC 2616 sec 14.2: no header = *
    var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');
    if (!provided) {
        // sorted list of all charsets
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getCharsetPriority(type, accepts, index);
    });
    // sorted list of accepted charsets
    return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full charset string.
 * @private
 */ function getFullCharset(spec) {
    return spec.charset;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/lib/encoding.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;
/**
 * Module variables.
 * @private
 */ var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Encoding header.
 * @private
 */ function parseAcceptEncoding(accept) {
    var accepts = accept.split(',');
    var hasIdentity = false;
    var minQuality = 1;
    for(var i = 0, j = 0; i < accepts.length; i++){
        var encoding = parseEncoding(accepts[i].trim(), i);
        if (encoding) {
            accepts[j++] = encoding;
            hasIdentity = hasIdentity || specify('identity', encoding);
            minQuality = Math.min(minQuality, encoding.q || 1);
        }
    }
    if (!hasIdentity) {
        /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */ accepts[j++] = {
            encoding: 'identity',
            q: minQuality,
            i: i
        };
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */ function parseEncoding(str, i) {
    var match = simpleEncodingRegExp.exec(str);
    if (!match) return null;
    var encoding = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].trim().split('=');
            if (p[0] === 'q') {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return {
        encoding: encoding,
        q: q,
        i: i
    };
}
/**
 * Get the priority of an encoding.
 * @private
 */ function getEncodingPriority(encoding, accepted, index) {
    var priority = {
        encoding: encoding,
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(encoding, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the encoding.
 * @private
 */ function specify(encoding, spec, index) {
    var s = 0;
    if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
        s |= 1;
    } else if (spec.encoding !== '*') {
        return null;
    }
    return {
        encoding: encoding,
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
;
/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */ function preferredEncodings(accept, provided, preferred) {
    var accepts = parseAcceptEncoding(accept || '');
    var comparator = preferred ? function comparator(a, b) {
        if (a.q !== b.q) {
            return b.q - a.q // higher quality first
            ;
        }
        var aPreferred = preferred.indexOf(a.encoding);
        var bPreferred = preferred.indexOf(b.encoding);
        if (aPreferred === -1 && bPreferred === -1) {
            // consider the original specifity/order
            return b.s - a.s || a.o - b.o || a.i - b.i;
        }
        if (aPreferred !== -1 && bPreferred !== -1) {
            return aPreferred - bPreferred // consider the preferred order
            ;
        }
        return aPreferred === -1 ? 1 : -1 // preferred first
        ;
    } : compareSpecs;
    if (!provided) {
        // sorted list of all encodings
        return accepts.filter(isQuality).sort(comparator).map(getFullEncoding);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getEncodingPriority(type, accepts, index);
    });
    // sorted list of accepted encodings
    return priorities.filter(isQuality).sort(comparator).map(function getEncoding(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i;
}
/**
 * Get full encoding string.
 * @private
 */ function getFullEncoding(spec) {
    return spec.encoding;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/lib/language.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;
/**
 * Module variables.
 * @private
 */ var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Language header.
 * @private
 */ function parseAcceptLanguage(accept) {
    var accepts = accept.split(',');
    for(var i = 0, j = 0; i < accepts.length; i++){
        var language = parseLanguage(accepts[i].trim(), i);
        if (language) {
            accepts[j++] = language;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a language from the Accept-Language header.
 * @private
 */ function parseLanguage(str, i) {
    var match = simpleLanguageRegExp.exec(str);
    if (!match) return null;
    var prefix = match[1];
    var suffix = match[2];
    var full = prefix;
    if (suffix) full += "-" + suffix;
    var q = 1;
    if (match[3]) {
        var params = match[3].split(';');
        for(var j = 0; j < params.length; j++){
            var p = params[j].split('=');
            if (p[0] === 'q') q = parseFloat(p[1]);
        }
    }
    return {
        prefix: prefix,
        suffix: suffix,
        q: q,
        i: i,
        full: full
    };
}
/**
 * Get the priority of a language.
 * @private
 */ function getLanguagePriority(language, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(language, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the language.
 * @private
 */ function specify(language, spec, index) {
    var p = parseLanguage(language);
    if (!p) return null;
    var s = 0;
    if (spec.full.toLowerCase() === p.full.toLowerCase()) {
        s |= 4;
    } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
        s |= 2;
    } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
        s |= 1;
    } else if (spec.full !== '*') {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
;
/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */ function preferredLanguages(accept, provided) {
    // RFC 2616 sec 14.4: no header = *
    var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');
    if (!provided) {
        // sorted list of all languages
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getLanguagePriority(type, accepts, index);
    });
    // sorted list of accepted languages
    return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full language string.
 * @private
 */ function getFullLanguage(spec) {
    return spec.full;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/lib/mediaType.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;
/**
 * Module variables.
 * @private
 */ var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept header.
 * @private
 */ function parseAccept(accept) {
    var accepts = splitMediaTypes(accept);
    for(var i = 0, j = 0; i < accepts.length; i++){
        var mediaType = parseMediaType(accepts[i].trim(), i);
        if (mediaType) {
            accepts[j++] = mediaType;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a media type from the Accept header.
 * @private
 */ function parseMediaType(str, i) {
    var match = simpleMediaTypeRegExp.exec(str);
    if (!match) return null;
    var params = Object.create(null);
    var q = 1;
    var subtype = match[2];
    var type = match[1];
    if (match[3]) {
        var kvps = splitParameters(match[3]).map(splitKeyValuePair);
        for(var j = 0; j < kvps.length; j++){
            var pair = kvps[j];
            var key = pair[0].toLowerCase();
            var val = pair[1];
            // get the value, unwrapping quotes
            var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.slice(1, -1) : val;
            if (key === 'q') {
                q = parseFloat(value);
                break;
            }
            // store parameter
            params[key] = value;
        }
    }
    return {
        type: type,
        subtype: subtype,
        params: params,
        q: q,
        i: i
    };
}
/**
 * Get the priority of a media type.
 * @private
 */ function getMediaTypePriority(type, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(type, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the media type.
 * @private
 */ function specify(type, spec, index) {
    var p = parseMediaType(type);
    var s = 0;
    if (!p) {
        return null;
    }
    if (spec.type.toLowerCase() == p.type.toLowerCase()) {
        s |= 4;
    } else if (spec.type != '*') {
        return null;
    }
    if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
        s |= 2;
    } else if (spec.subtype != '*') {
        return null;
    }
    var keys = Object.keys(spec.params);
    if (keys.length > 0) {
        if (keys.every(function(k) {
            return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
        })) {
            s |= 1;
        } else {
            return null;
        }
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
/**
 * Get the preferred media types from an Accept header.
 * @public
 */ function preferredMediaTypes(accept, provided) {
    // RFC 2616 sec 14.2: no header = */*
    var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');
    if (!provided) {
        // sorted list of all types
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getMediaTypePriority(type, accepts, index);
    });
    // sorted list of accepted types
    return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full type string.
 * @private
 */ function getFullType(spec) {
    return spec.type + '/' + spec.subtype;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
/**
 * Count the number of quotes in a string.
 * @private
 */ function quoteCount(string) {
    var count = 0;
    var index = 0;
    while((index = string.indexOf('"', index)) !== -1){
        count++;
        index++;
    }
    return count;
}
/**
 * Split a key value pair.
 * @private
 */ function splitKeyValuePair(str) {
    var index = str.indexOf('=');
    var key;
    var val;
    if (index === -1) {
        key = str;
    } else {
        key = str.slice(0, index);
        val = str.slice(index + 1);
    }
    return [
        key,
        val
    ];
}
/**
 * Split an Accept header into media types.
 * @private
 */ function splitMediaTypes(accept) {
    var accepts = accept.split(',');
    for(var i = 1, j = 0; i < accepts.length; i++){
        if (quoteCount(accepts[j]) % 2 == 0) {
            accepts[++j] = accepts[i];
        } else {
            accepts[j] += ',' + accepts[i];
        }
    }
    // trim accepts
    accepts.length = j + 1;
    return accepts;
}
/**
 * Split a string of parameters.
 * @private
 */ function splitParameters(str) {
    var parameters = str.split(';');
    for(var i = 1, j = 0; i < parameters.length; i++){
        if (quoteCount(parameters[j]) % 2 == 0) {
            parameters[++j] = parameters[i];
        } else {
            parameters[j] += ';' + parameters[i];
        }
    }
    // trim parameters
    parameters.length = j + 1;
    for(var i = 0; i < parameters.length; i++){
        parameters[i] = parameters[i].trim();
    }
    return parameters;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ var preferredCharsets = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/lib/charset.js [middleware-edge] (ecmascript)");
var preferredEncodings = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/lib/encoding.js [middleware-edge] (ecmascript)");
var preferredLanguages = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/lib/language.js [middleware-edge] (ecmascript)");
var preferredMediaTypes = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/node_modules/negotiator/lib/mediaType.js [middleware-edge] (ecmascript)");
/**
 * Module exports.
 * @public
 */ module.exports = Negotiator;
module.exports.Negotiator = Negotiator;
/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */ function Negotiator(request) {
    if (!(this instanceof Negotiator)) {
        return new Negotiator(request);
    }
    this.request = request;
}
Negotiator.prototype.charset = function charset(available) {
    var set = this.charsets(available);
    return set && set[0];
};
Negotiator.prototype.charsets = function charsets(available) {
    return preferredCharsets(this.request.headers['accept-charset'], available);
};
Negotiator.prototype.encoding = function encoding(available, opts) {
    var set = this.encodings(available, opts);
    return set && set[0];
};
Negotiator.prototype.encodings = function encodings(available, options) {
    var opts = options || {};
    return preferredEncodings(this.request.headers['accept-encoding'], available, opts.preferred);
};
Negotiator.prototype.language = function language(available) {
    var set = this.languages(available);
    return set && set[0];
};
Negotiator.prototype.languages = function languages(available) {
    return preferredLanguages(this.request.headers['accept-language'], available);
};
Negotiator.prototype.mediaType = function mediaType(available) {
    var set = this.mediaTypes(available);
    return set && set[0];
};
Negotiator.prototype.mediaTypes = function mediaTypes(available) {
    return preferredMediaTypes(this.request.headers.accept, available);
};
// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@panva/hkdf/dist/web/runtime/hkdf.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const getGlobal = ()=>{
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    throw new Error('unable to locate global object');
};
const __TURBOPACK__default__export__ = async (digest, ikm, salt, info, keylen)=>{
    const { crypto: { subtle } } = getGlobal();
    return new Uint8Array(await subtle.deriveBits({
        name: 'HKDF',
        hash: `SHA-${digest.substr(3)}`,
        salt,
        info
    }, await subtle.importKey('raw', ikm, 'HKDF', false, [
        'deriveBits'
    ]), keylen << 3));
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@panva/hkdf/dist/web/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>hkdf,
    "hkdf",
    ()=>hkdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$web$2f$runtime$2f$hkdf$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@panva/hkdf/dist/web/runtime/hkdf.js [middleware-edge] (ecmascript)");
;
function normalizeDigest(digest) {
    switch(digest){
        case 'sha256':
        case 'sha384':
        case 'sha512':
        case 'sha1':
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === 'string') return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array)) throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, 'ikm');
    if (!ikm.byteLength) throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, 'info');
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function hkdf(digest, ikm, salt, info, keylen) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$web$2f$runtime$2f$hkdf$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/index.js [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/rng.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rng
]);
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
        if (!getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
    }
    return getRandomValues(rnds8);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/regex.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/validate.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/regex.js [middleware-edge] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/stringify.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/validate.js [middleware-edge] (ecmascript)");
;
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var byteToHex = [];
for(var i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).substr(1));
}
function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v1.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/rng.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/stringify.js [middleware-edge] (ecmascript)"); // **`v1()` - Generate time-based UUID**
;
;
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
var _nodeId;
var _clockseq; // Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || new Array(16);
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        var seedBytes = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])();
        if (node == null) {
            // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
            node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5]
            ];
        }
        if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
    } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    } // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000; // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff; // `time_mid`
    var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff; // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`
    b[i++] = clockseq & 0xff; // `node`
    for(var n = 0; n < 6; ++n){
        b[i + n] = node[n];
    }
    return buf || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(b);
}
const __TURBOPACK__default__export__ = v1;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/parse.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/validate.js [middleware-edge] (ecmascript)");
;
function parse(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    var v;
    var arr = new Uint8Array(16); // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff; // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff; // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff; // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff; // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
const __TURBOPACK__default__export__ = parse;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v35.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DNS",
    ()=>DNS,
    "URL",
    ()=>URL,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/stringify.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/parse.js [middleware-edge] (ecmascript)");
;
;
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    var bytes = [];
    for(var i = 0; i < str.length; ++i){
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function __TURBOPACK__default__export__(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        if (typeof value === 'string') {
            value = stringToBytes(value);
        }
        if (typeof namespace === 'string') {
            namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(namespace);
        }
        if (namespace.length !== 16) {
            throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
        } // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        var bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(var i = 0; i < 16; ++i){
                buf[offset + i] = bytes[i];
            }
            return buf;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(bytes);
    } // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name; // eslint-disable-next-line no-empty
    } catch (err) {} // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/md5.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */ function md5(bytes) {
    if (typeof bytes === 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = new Uint8Array(msg.length);
        for(var i = 0; i < msg.length; ++i){
            bytes[i] = msg.charCodeAt(i);
        }
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */ function md5ToHexEncodedArray(input) {
    var output = [];
    var length32 = input.length * 32;
    var hexTab = '0123456789abcdef';
    for(var i = 0; i < length32; i += 8){
        var x = input[i >> 5] >>> i % 32 & 0xff;
        var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
        output.push(hex);
    }
    return output;
}
/**
 * Calculate output length with padding and bit length
 */ function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */ function wordsToMd5(x, len) {
    /* append padding */ x[len >> 5] |= 0x80 << len % 32;
    x[getOutputLength(len) - 1] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for(var i = 0; i < x.length; i += 16){
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [
        a,
        b,
        c,
        d
    ];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */ function bytesToWords(input) {
    if (input.length === 0) {
        return [];
    }
    var length8 = input.length * 8;
    var output = new Uint32Array(getOutputLength(length8));
    for(var i = 0; i < length8; i += 8){
        output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
    }
    return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */ function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */ function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */ function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
const __TURBOPACK__default__export__ = md5;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v3.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v35.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$md5$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/md5.js [middleware-edge] (ecmascript)");
;
;
var v3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])('v3', 0x30, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$md5$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v3;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v4.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/rng.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/stringify.js [middleware-edge] (ecmascript)");
;
;
function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(var i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(rnds);
}
const __TURBOPACK__default__export__ = v4;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/sha1.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
    switch(s){
        case 0:
            return x & y ^ ~x & z;
        case 1:
            return x ^ y ^ z;
        case 2:
            return x & y ^ x & z ^ y & z;
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return x << n | x >>> 32 - n;
}
function sha1(bytes) {
    var K = [
        0x5a827999,
        0x6ed9eba1,
        0x8f1bbcdc,
        0xca62c1d6
    ];
    var H = [
        0x67452301,
        0xefcdab89,
        0x98badcfe,
        0x10325476,
        0xc3d2e1f0
    ];
    if (typeof bytes === 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = [];
        for(var i = 0; i < msg.length; ++i){
            bytes.push(msg.charCodeAt(i));
        }
    } else if (!Array.isArray(bytes)) {
        // Convert Array-like to Array
        bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(0x80);
    var l = bytes.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    for(var _i = 0; _i < N; ++_i){
        var arr = new Uint32Array(16);
        for(var j = 0; j < 16; ++j){
            arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
        }
        M[_i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
    for(var _i2 = 0; _i2 < N; ++_i2){
        var W = new Uint32Array(80);
        for(var t = 0; t < 16; ++t){
            W[t] = M[_i2][t];
        }
        for(var _t = 16; _t < 80; ++_t){
            W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
        }
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        for(var _t2 = 0; _t2 < 80; ++_t2){
            var s = Math.floor(_t2 / 20);
            var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
    }
    return [
        H[0] >> 24 & 0xff,
        H[0] >> 16 & 0xff,
        H[0] >> 8 & 0xff,
        H[0] & 0xff,
        H[1] >> 24 & 0xff,
        H[1] >> 16 & 0xff,
        H[1] >> 8 & 0xff,
        H[1] & 0xff,
        H[2] >> 24 & 0xff,
        H[2] >> 16 & 0xff,
        H[2] >> 8 & 0xff,
        H[2] & 0xff,
        H[3] >> 24 & 0xff,
        H[3] >> 16 & 0xff,
        H[3] >> 8 & 0xff,
        H[3] & 0xff,
        H[4] >> 24 & 0xff,
        H[4] >> 16 & 0xff,
        H[4] >> 8 & 0xff,
        H[4] & 0xff
    ];
}
const __TURBOPACK__default__export__ = sha1;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v5.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v35.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$sha1$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/sha1.js [middleware-edge] (ecmascript)");
;
;
var v5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])('v5', 0x50, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$sha1$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v5;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/nil.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = '00000000-0000-0000-0000-000000000000';
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/version.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/validate.js [middleware-edge] (ecmascript)");
;
function version(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.substr(14, 1), 16);
}
const __TURBOPACK__default__export__ = version;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NIL",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$nil$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    "parse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    "stringify",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    "v1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v1$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    "v3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v3$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    "v4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    "v5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    "validate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"],
    "version",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$version$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v1$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v1.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v3$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v3.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v4.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/v5.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$nil$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/nil.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$version$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/version.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/validate.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/stringify.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/parse.js [middleware-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/core/lib/cookie.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SessionStore = void 0;
exports.defaultCookies = defaultCookies;
function _classPrivateMethodInitSpec(e, a) {
    _checkPrivateRedeclaration(e, a), a.add(e);
}
function _classPrivateFieldInitSpec(e, t, a) {
    _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldGet(s, a) {
    return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldSet(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
}
function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
}
const ALLOWED_COOKIE_SIZE = 4096;
const ESTIMATED_EMPTY_COOKIE_SIZE = 163;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function defaultCookies(useSecureCookies) {
    const cookiePrefix = useSecureCookies ? "__Secure-" : "";
    return {
        sessionToken: {
            name: `${cookiePrefix}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        callbackUrl: {
            name: `${cookiePrefix}next-auth.callback-url`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        csrfToken: {
            name: `${useSecureCookies ? "__Host-" : ""}next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        pkceCodeVerifier: {
            name: `${cookiePrefix}next-auth.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        state: {
            name: `${cookiePrefix}next-auth.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        nonce: {
            name: `${cookiePrefix}next-auth.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        }
    };
}
var _chunks = new WeakMap();
var _option = new WeakMap();
var _logger = new WeakMap();
var _SessionStore_brand = new WeakSet();
class SessionStore {
    constructor(option, req, logger){
        _classPrivateMethodInitSpec(this, _SessionStore_brand);
        _classPrivateFieldInitSpec(this, _chunks, {});
        _classPrivateFieldInitSpec(this, _option, void 0);
        _classPrivateFieldInitSpec(this, _logger, void 0);
        _classPrivateFieldSet(_logger, this, logger);
        _classPrivateFieldSet(_option, this, option);
        const { cookies: _cookies } = req;
        const { name: cookieName } = option;
        if (typeof (_cookies === null || _cookies === void 0 ? void 0 : _cookies.getAll) === "function") {
            for (const { name, value } of _cookies.getAll()){
                if (name.startsWith(cookieName)) {
                    _classPrivateFieldGet(_chunks, this)[name] = value;
                }
            }
        } else if (_cookies instanceof Map) {
            for (const name of _cookies.keys()){
                if (name.startsWith(cookieName)) _classPrivateFieldGet(_chunks, this)[name] = _cookies.get(name);
            }
        } else {
            for(const name in _cookies){
                if (name.startsWith(cookieName)) _classPrivateFieldGet(_chunks, this)[name] = _cookies[name];
            }
        }
    }
    get value() {
        const sortedKeys = Object.keys(_classPrivateFieldGet(_chunks, this)).sort((a, b)=>{
            var _a$split$pop, _b$split$pop;
            const aSuffix = parseInt((_a$split$pop = a.split(".").pop()) !== null && _a$split$pop !== void 0 ? _a$split$pop : "0");
            const bSuffix = parseInt((_b$split$pop = b.split(".").pop()) !== null && _b$split$pop !== void 0 ? _b$split$pop : "0");
            return aSuffix - bSuffix;
        });
        return sortedKeys.map((key)=>_classPrivateFieldGet(_chunks, this)[key]).join("");
    }
    chunk(value, options) {
        const cookies = _assertClassBrand(_SessionStore_brand, this, _clean).call(this);
        const chunked = _assertClassBrand(_SessionStore_brand, this, _chunk).call(this, {
            name: _classPrivateFieldGet(_option, this).name,
            value,
            options: {
                ..._classPrivateFieldGet(_option, this).options,
                ...options
            }
        });
        for (const chunk of chunked){
            cookies[chunk.name] = chunk;
        }
        return Object.values(cookies);
    }
    clean() {
        return Object.values(_assertClassBrand(_SessionStore_brand, this, _clean).call(this));
    }
}
exports.SessionStore = SessionStore;
function _chunk(cookie) {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
    if (chunkCount === 1) {
        _classPrivateFieldGet(_chunks, this)[cookie.name] = cookie.value;
        return [
            cookie
        ];
    }
    const cookies = [];
    for(let i = 0; i < chunkCount; i++){
        const name = `${cookie.name}.${i}`;
        const value = cookie.value.substr(i * CHUNK_SIZE, CHUNK_SIZE);
        cookies.push({
            ...cookie,
            name,
            value
        });
        _classPrivateFieldGet(_chunks, this)[name] = value;
    }
    _classPrivateFieldGet(_logger, this).debug("CHUNKING_SESSION_COOKIE", {
        message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
        emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
        valueSize: cookie.value.length,
        chunks: cookies.map((c)=>c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
    });
    return cookies;
}
function _clean() {
    const cleanedChunks = {};
    for(const name in _classPrivateFieldGet(_chunks, this)){
        var _classPrivateFieldGet2;
        (_classPrivateFieldGet2 = _classPrivateFieldGet(_chunks, this)) === null || _classPrivateFieldGet2 === void 0 || delete _classPrivateFieldGet2[name];
        cleanedChunks[name] = {
            name,
            value: "",
            options: {
                ..._classPrivateFieldGet(_option, this).options,
                maxAge: 0
            }
        };
    }
    return cleanedChunks;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/jwt/types.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js [middleware-edge] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {
    encode: true,
    decode: true,
    getToken: true
};
exports.decode = decode;
exports.encode = encode;
exports.getToken = getToken;
var _jose = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/node_modules/jose/dist/browser/index.js [middleware-edge] (ecmascript)");
var _hkdf = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@panva/hkdf/dist/web/index.js [middleware-edge] (ecmascript)"));
var _uuid = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/uuid/dist/esm-browser/index.js [middleware-edge] (ecmascript)");
var _cookie = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/core/lib/cookie.js [middleware-edge] (ecmascript)");
var _types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/jwt/types.js [middleware-edge] (ecmascript)");
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _types[key];
        }
    });
});
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60;
const now = ()=>Date.now() / 1000 | 0;
async function encode(params) {
    const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt = "" } = params;
    const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
    return await new _jose.EncryptJWT(token).setProtectedHeader({
        alg: "dir",
        enc: "A256GCM"
    }).setIssuedAt().setExpirationTime(now() + maxAge).setJti((0, _uuid.v4)()).encrypt(encryptionSecret);
}
async function decode(params) {
    const { token, secret, salt = "" } = params;
    if (!token) return null;
    const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
    const { payload } = await (0, _jose.jwtDecrypt)(token, encryptionSecret, {
        clockTolerance: 15
    });
    return payload;
}
async function getToken(params) {
    var _process$env$NEXTAUTH, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _req$headers;
    const { req, secureCookie = (_process$env$NEXTAUTH = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL) === null || _process$env$NEXTAUTH2 === void 0 ? void 0 : _process$env$NEXTAUTH2.startsWith("https://")) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : !!process.env.VERCEL, cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token", raw, decode: _decode = decode, logger = console, secret = (_process$env$NEXTAUTH3 = process.env.NEXTAUTH_SECRET) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.AUTH_SECRET } = params;
    if (!req) throw new Error("Must pass `req` to JWT getToken()");
    const sessionStore = new _cookie.SessionStore({
        name: cookieName,
        options: {
            secure: secureCookie
        }
    }, {
        cookies: req.cookies,
        headers: req.headers
    }, logger);
    let token = sessionStore.value;
    const authorizationHeader = req.headers instanceof Headers ? req.headers.get("authorization") : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
    if (!token && (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[0]) === "Bearer") {
        const urlEncodedToken = authorizationHeader.split(" ")[1];
        token = decodeURIComponent(urlEncodedToken);
    }
    if (!token) return null;
    if (raw) return token;
    try {
        return await _decode({
            token,
            secret
        });
    } catch (_unused) {
        return null;
    }
}
async function getDerivedEncryptionKey(keyMaterial, salt) {
    return await (0, _hkdf.default)("sha256", keyMaterial, salt, `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ""}`, 32);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/utils/parse-url.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseUrl;
function parseUrl(url) {
    var _url2;
    const defaultUrl = new URL("http://localhost:3000/api/auth");
    if (url && !url.startsWith("http")) {
        url = `https://${url}`;
    }
    const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);
    const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
    const base = `${_url.origin}${path}`;
    return {
        origin: _url.origin,
        host: _url.host,
        path,
        base,
        toString: ()=>base
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/next/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js [middleware-edge] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
exports.withAuth = withAuth;
var _server = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript)");
var _jwt = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
var _parseUrl = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/utils/parse-url.js [middleware-edge] (ecmascript)"));
async function handleMiddleware(req, options, onSuccess) {
    var _options$pages$signIn, _options$pages, _options$pages$error, _options$pages2, _ref, _options$secret, _options$jwt, _options$cookies, _await$options$callba, _options$callbacks, _options$callbacks$au;
    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInPage = (_options$pages$signIn = options === null || options === void 0 || (_options$pages = options.pages) === null || _options$pages === void 0 ? void 0 : _options$pages.signIn) !== null && _options$pages$signIn !== void 0 ? _options$pages$signIn : "/api/auth/signin";
    const errorPage = (_options$pages$error = options === null || options === void 0 || (_options$pages2 = options.pages) === null || _options$pages2 === void 0 ? void 0 : _options$pages2.error) !== null && _options$pages$error !== void 0 ? _options$pages$error : "/api/auth/error";
    const authPath = (0, _parseUrl.default)(process.env.NEXTAUTH_URL).path;
    const publicPaths = [
        "/_next",
        "/favicon.ico"
    ];
    if (`${basePath}${pathname}`.startsWith(authPath) || [
        signInPage,
        errorPage
    ].includes(pathname) || publicPaths.some((p)=>pathname.startsWith(p))) {
        return;
    }
    const secret = (_ref = (_options$secret = options === null || options === void 0 ? void 0 : options.secret) !== null && _options$secret !== void 0 ? _options$secret : process.env.NEXTAUTH_SECRET) !== null && _ref !== void 0 ? _ref : process.env.AUTH_SECRET;
    if (!secret) {
        console.error(`[next-auth][error][NO_SECRET]`, `\nhttps://next-auth.js.org/errors#no_secret`);
        const errorUrl = new URL(`${basePath}${errorPage}`, origin);
        errorUrl.searchParams.append("error", "Configuration");
        return _server.NextResponse.redirect(errorUrl);
    }
    const token = await (0, _jwt.getToken)({
        req,
        decode: options === null || options === void 0 || (_options$jwt = options.jwt) === null || _options$jwt === void 0 ? void 0 : _options$jwt.decode,
        cookieName: options === null || options === void 0 || (_options$cookies = options.cookies) === null || _options$cookies === void 0 || (_options$cookies = _options$cookies.sessionToken) === null || _options$cookies === void 0 ? void 0 : _options$cookies.name,
        secret
    });
    const isAuthorized = (_await$options$callba = await (options === null || options === void 0 || (_options$callbacks = options.callbacks) === null || _options$callbacks === void 0 || (_options$callbacks$au = _options$callbacks.authorized) === null || _options$callbacks$au === void 0 ? void 0 : _options$callbacks$au.call(_options$callbacks, {
        req,
        token
    }))) !== null && _await$options$callba !== void 0 ? _await$options$callba : !!token;
    if (isAuthorized) return await (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(token));
    const signInUrl = new URL(`${basePath}${signInPage}`, origin);
    signInUrl.searchParams.append("callbackUrl", `${basePath}${pathname}${search}`);
    return _server.NextResponse.redirect(signInUrl);
}
function withAuth(...args) {
    if (!args.length || args[0] instanceof Request) {
        return handleMiddleware(...args);
    }
    if (typeof args[0] === "function") {
        const middleware = args[0];
        const options = args[1];
        return async (...args)=>await handleMiddleware(args[0], options, async (token)=>{
                args[0].nextauth = {
                    token
                };
                return await middleware(...args);
            });
    }
    const options = args[0];
    return async (...args)=>await handleMiddleware(args[0], options);
}
var _default = exports.default = withAuth;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _middleware.default;
    }
});
var _middleware = _interopRequireWildcard(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/next/middleware.js [middleware-edge] (ecmascript)"));
Object.keys(_middleware).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _middleware[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _middleware[key];
        }
    });
});
function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = new WeakMap(), t = new WeakMap();
    return (_getRequireWildcardCache = function(e) {
        return e ? t : r;
    })(e);
}
function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
    };
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = {
        __proto__: null
    }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var u in e)if ("default" !== u && ({}).hasOwnProperty.call(e, u)) {
        var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
        i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n.default = e, t && t.set(e, n), n;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/date-time.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseDateTimeSkeleton",
    ()=>parseDateTimeSkeleton
]);
/**
* https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
* with some tweaks
*/ const DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function parseDateTimeSkeleton(skeleton) {
    const result = {};
    skeleton.replace(DATE_TIME_REGEX, (match)=>{
        const len = match.length;
        switch(match[0]){
            case "G":
                result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
                break;
            case "y":
                result.year = len === 2 ? "2-digit" : "numeric";
                break;
            case "Y":
            case "u":
            case "U":
            case "r":
                throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
            case "q":
            case "Q":
                throw new RangeError("`q/Q` (quarter) patterns are not supported");
            case "M":
            case "L":
                result.month = [
                    "numeric",
                    "2-digit",
                    "short",
                    "long",
                    "narrow"
                ][len - 1];
                break;
            case "w":
            case "W":
                throw new RangeError("`w/W` (week) patterns are not supported");
            case "d":
                result.day = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "D":
            case "F":
            case "g":
                throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
            case "E":
                result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
                break;
            case "e":
                if (len < 4) {
                    throw new RangeError("`e..eee` (weekday) patterns are not supported");
                }
                result.weekday = [
                    "short",
                    "long",
                    "narrow",
                    "short"
                ][len - 4];
                break;
            case "c":
                if (len < 4) {
                    throw new RangeError("`c..ccc` (weekday) patterns are not supported");
                }
                result.weekday = [
                    "short",
                    "long",
                    "narrow",
                    "short"
                ][len - 4];
                break;
            case "a":
                result.hour12 = true;
                break;
            case "b":
            case "B":
                throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
            case "h":
                result.hourCycle = "h12";
                result.hour = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "H":
                result.hourCycle = "h23";
                result.hour = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "K":
                result.hourCycle = "h11";
                result.hour = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "k":
                result.hourCycle = "h24";
                result.hour = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "j":
            case "J":
            case "C":
                throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
            case "m":
                result.minute = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "s":
                result.second = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "S":
            case "A":
                throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
            case "z":
                result.timeZoneName = len < 4 ? "short" : "long";
                break;
            case "Z":
            case "O":
            case "v":
            case "V":
            case "X":
            case "x":
                throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
        }
        return "";
    });
    return result;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/regex.generated.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @generated from regex-gen.ts
__turbopack_context__.s([
    "WHITE_SPACE_REGEX",
    ()=>WHITE_SPACE_REGEX
]);
const WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/number.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseNumberSkeleton",
    ()=>parseNumberSkeleton,
    "parseNumberSkeletonFromString",
    ()=>parseNumberSkeletonFromString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$regex$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/regex.generated.js [middleware-edge] (ecmascript)");
;
function parseNumberSkeletonFromString(skeleton) {
    if (skeleton.length === 0) {
        throw new Error("Number skeleton cannot be empty");
    }
    // Parse the skeleton
    const stringTokens = skeleton.split(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$regex$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WHITE_SPACE_REGEX"]).filter((x)=>x.length > 0);
    const tokens = [];
    for (const stringToken of stringTokens){
        let stemAndOptions = stringToken.split("/");
        if (stemAndOptions.length === 0) {
            throw new Error("Invalid number skeleton");
        }
        const [stem, ...options] = stemAndOptions;
        for (const option of options){
            if (option.length === 0) {
                throw new Error("Invalid number skeleton");
            }
        }
        tokens.push({
            stem,
            options
        });
    }
    return tokens;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, "");
}
const FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
const SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
const INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
const CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
    const result = {};
    if (str[str.length - 1] === "r") {
        result.roundingPriority = "morePrecision";
    } else if (str[str.length - 1] === "s") {
        result.roundingPriority = "lessPrecision";
    }
    str.replace(SIGNIFICANT_PRECISION_REGEX, function(_, g1, g2) {
        // @@@ case
        if (typeof g2 !== "string") {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        } else if (g2 === "+") {
            result.minimumSignificantDigits = g1.length;
        } else if (g1[0] === "#") {
            result.maximumSignificantDigits = g1.length;
        } else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
        }
        return "";
    });
    return result;
}
function parseSign(str) {
    switch(str){
        case "sign-auto":
            return {
                signDisplay: "auto"
            };
        case "sign-accounting":
        case "()":
            return {
                currencySign: "accounting"
            };
        case "sign-always":
        case "+!":
            return {
                signDisplay: "always"
            };
        case "sign-accounting-always":
        case "()!":
            return {
                signDisplay: "always",
                currencySign: "accounting"
            };
        case "sign-except-zero":
        case "+?":
            return {
                signDisplay: "exceptZero"
            };
        case "sign-accounting-except-zero":
        case "()?":
            return {
                signDisplay: "exceptZero",
                currencySign: "accounting"
            };
        case "sign-never":
        case "+_":
            return {
                signDisplay: "never"
            };
    }
}
function parseConciseScientificAndEngineeringStem(stem) {
    // Engineering
    let result;
    if (stem[0] === "E" && stem[1] === "E") {
        result = {
            notation: "engineering"
        };
        stem = stem.slice(2);
    } else if (stem[0] === "E") {
        result = {
            notation: "scientific"
        };
        stem = stem.slice(1);
    }
    if (result) {
        const signDisplay = stem.slice(0, 2);
        if (signDisplay === "+!") {
            result.signDisplay = "always";
            stem = stem.slice(2);
        } else if (signDisplay === "+?") {
            result.signDisplay = "exceptZero";
            stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
            throw new Error("Malformed concise eng/scientific notation");
        }
        result.minimumIntegerDigits = stem.length;
    }
    return result;
}
function parseNotationOptions(opt) {
    const result = {};
    const signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
function parseNumberSkeleton(tokens) {
    let result = {};
    for (const token of tokens){
        switch(token.stem){
            case "percent":
            case "%":
                result.style = "percent";
                continue;
            case "%x100":
                result.style = "percent";
                result.scale = 100;
                continue;
            case "currency":
                result.style = "currency";
                result.currency = token.options[0];
                continue;
            case "group-off":
            case ",_":
                result.useGrouping = false;
                continue;
            case "precision-integer":
            case ".":
                result.maximumFractionDigits = 0;
                continue;
            case "measure-unit":
            case "unit":
                result.style = "unit";
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case "compact-short":
            case "K":
                result.notation = "compact";
                result.compactDisplay = "short";
                continue;
            case "compact-long":
            case "KK":
                result.notation = "compact";
                result.compactDisplay = "long";
                continue;
            case "scientific":
                result = {
                    ...result,
                    notation: "scientific",
                    ...token.options.reduce((all, opt)=>({
                            ...all,
                            ...parseNotationOptions(opt)
                        }), {})
                };
                continue;
            case "engineering":
                result = {
                    ...result,
                    notation: "engineering",
                    ...token.options.reduce((all, opt)=>({
                            ...all,
                            ...parseNotationOptions(opt)
                        }), {})
                };
                continue;
            case "notation-simple":
                result.notation = "standard";
                continue;
            case "unit-width-narrow":
                result.currencyDisplay = "narrowSymbol";
                result.unitDisplay = "narrow";
                continue;
            case "unit-width-short":
                result.currencyDisplay = "code";
                result.unitDisplay = "short";
                continue;
            case "unit-width-full-name":
                result.currencyDisplay = "name";
                result.unitDisplay = "long";
                continue;
            case "unit-width-iso-code":
                result.currencyDisplay = "symbol";
                continue;
            case "scale":
                result.scale = parseFloat(token.options[0]);
                continue;
            case "rounding-mode-floor":
                result.roundingMode = "floor";
                continue;
            case "rounding-mode-ceiling":
                result.roundingMode = "ceil";
                continue;
            case "rounding-mode-down":
                result.roundingMode = "trunc";
                continue;
            case "rounding-mode-up":
                result.roundingMode = "expand";
                continue;
            case "rounding-mode-half-even":
                result.roundingMode = "halfEven";
                continue;
            case "rounding-mode-half-down":
                result.roundingMode = "halfTrunc";
                continue;
            case "rounding-mode-half-up":
                result.roundingMode = "halfExpand";
                continue;
            case "integer-width":
                if (token.options.length > 1) {
                    throw new RangeError("integer-width stems only accept a single optional option");
                }
                token.options[0].replace(INTEGER_WIDTH_REGEX, function(_, g1, g2, g3, g4, g5) {
                    if (g1) {
                        result.minimumIntegerDigits = g2.length;
                    } else if (g3 && g4) {
                        throw new Error("We currently do not support maximum integer digits");
                    } else if (g5) {
                        throw new Error("We currently do not support exact integer digits");
                    }
                    return "";
                });
                continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
            result.minimumIntegerDigits = token.stem.length;
            continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            // Precision
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
            // precision-integer case
            if (token.options.length > 1) {
                throw new RangeError("Fraction-precision stems only accept a single optional option");
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function(_, g1, g2, g3, g4, g5) {
                // .000* case (before ICU67 it was .000+)
                if (g2 === "*") {
                    result.minimumFractionDigits = g1.length;
                } else if (g3 && g3[0] === "#") {
                    result.maximumFractionDigits = g3.length;
                } else if (g4 && g5) {
                    result.minimumFractionDigits = g4.length;
                    result.maximumFractionDigits = g4.length + g5.length;
                } else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits = g1.length;
                }
                return "";
            });
            const opt = token.options[0];
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#trailing-zero-display
            if (opt === "w") {
                result = {
                    ...result,
                    trailingZeroDisplay: "stripIfInteger"
                };
            } else if (opt) {
                result = {
                    ...result,
                    ...parseSignificantPrecision(opt)
                };
            }
            continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = {
                ...result,
                ...parseSignificantPrecision(token.stem)
            };
            continue;
        }
        const signOpts = parseSign(token.stem);
        if (signOpts) {
            result = {
                ...result,
                ...signOpts
            };
        }
        const conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
            result = {
                ...result,
                ...conciseScientificAndEngineeringOpts
            };
        }
    }
    return result;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/index.js [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$date$2d$time$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/date-time.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$number$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/number.js [middleware-edge] (ecmascript)");
;
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SKELETON_TYPE",
    ()=>SKELETON_TYPE,
    "TYPE",
    ()=>TYPE,
    "createLiteralElement",
    ()=>createLiteralElement,
    "createNumberElement",
    ()=>createNumberElement,
    "isArgumentElement",
    ()=>isArgumentElement,
    "isDateElement",
    ()=>isDateElement,
    "isDateTimeSkeleton",
    ()=>isDateTimeSkeleton,
    "isLiteralElement",
    ()=>isLiteralElement,
    "isNumberElement",
    ()=>isNumberElement,
    "isNumberSkeleton",
    ()=>isNumberSkeleton,
    "isPluralElement",
    ()=>isPluralElement,
    "isPoundElement",
    ()=>isPoundElement,
    "isSelectElement",
    ()=>isSelectElement,
    "isTagElement",
    ()=>isTagElement,
    "isTimeElement",
    ()=>isTimeElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/index.js [middleware-edge] (ecmascript) <locals>");
;
let TYPE = /* @__PURE__ */ function(TYPE) {
    /**
	* Raw text
	*/ TYPE[TYPE["literal"] = 0] = "literal";
    /**
	* Variable w/o any format, e.g `var` in `this is a {var}`
	*/ TYPE[TYPE["argument"] = 1] = "argument";
    /**
	* Variable w/ number format
	*/ TYPE[TYPE["number"] = 2] = "number";
    /**
	* Variable w/ date format
	*/ TYPE[TYPE["date"] = 3] = "date";
    /**
	* Variable w/ time format
	*/ TYPE[TYPE["time"] = 4] = "time";
    /**
	* Variable w/ select format
	*/ TYPE[TYPE["select"] = 5] = "select";
    /**
	* Variable w/ plural format
	*/ TYPE[TYPE["plural"] = 6] = "plural";
    /**
	* Only possible within plural argument.
	* This is the `#` symbol that will be substituted with the count.
	*/ TYPE[TYPE["pound"] = 7] = "pound";
    /**
	* XML-like tag
	*/ TYPE[TYPE["tag"] = 8] = "tag";
    return TYPE;
}({});
let SKELETON_TYPE = /* @__PURE__ */ function(SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
    return SKELETON_TYPE;
}({});
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isTagElement(el) {
    return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
}
function createLiteralElement(value) {
    return {
        type: TYPE.literal,
        value
    };
}
function createNumberElement(value, style) {
    return {
        type: TYPE.number,
        value,
        style
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/error.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorKind",
    ()=>ErrorKind
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [middleware-edge] (ecmascript)");
;
let ErrorKind = /* @__PURE__ */ function(ErrorKind) {
    /** Argument is unclosed (e.g. `{0`) */ ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
    /** Argument is empty (e.g. `{}`). */ ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
    /** Argument is malformed (e.g. `{foo!}``) */ ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
    /** Expect an argument type (e.g. `{foo,}`) */ ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
    /** Unsupported argument type (e.g. `{foo,foo}`) */ ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
    /** Expect an argument style (e.g. `{foo, number, }`) */ ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
    /** The number skeleton is invalid. */ ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
    /** The date time skeleton is invalid. */ ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
    /** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */ ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
    /** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */ ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
    /** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */ ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
    /** Missing select argument options (e.g. `{foo, select}`) */ ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
    /** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */ ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */ ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Expecting a selector in `select` argument (e.g `{foo, select}`) */ ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
    /** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */ ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
    /** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */ ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
    /**
	* Expecting a message fragment after the `plural` or `selectordinal` selector
	* (e.g. `{foo, plural, one}`)
	*/ ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
    /** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */ ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
    /**
	* Duplicate selectors in `plural` or `selectordinal` argument.
	* (e.g. {foo, plural, one {#} one {#}})
	*/ ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
    /** Duplicate selectors in `select` argument.
	* (e.g. {foo, select, apple {apple} apple {apple}})
	*/ ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
    /** Plural or select argument option must have `other` clause. */ ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
    /** The tag is malformed. (e.g. `<bold!>foo</bold!>) */ ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
    /** The tag name is invalid. (e.g. `<123>foo</123>`) */ ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
    /** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */ ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
    /** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */ ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
    return ErrorKind;
}({});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/regex.generated.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @generated from regex-gen.ts
__turbopack_context__.s([
    "SPACE_SEPARATOR_REGEX",
    ()=>SPACE_SEPARATOR_REGEX,
    "WHITE_SPACE_REGEX",
    ()=>WHITE_SPACE_REGEX
]);
const SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
const WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/time-data.generated.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @generated from time-data-gen.ts
// prettier-ignore
__turbopack_context__.s([
    "timeData",
    ()=>timeData
]);
const timeData = {
    "001": [
        "H",
        "h"
    ],
    "419": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "AC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AD": [
        "H",
        "hB"
    ],
    "AE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "AF": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "AG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AL": [
        "h",
        "H",
        "hB"
    ],
    "AM": [
        "H",
        "hB"
    ],
    "AO": [
        "H",
        "hB"
    ],
    "AR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "AS": [
        "h",
        "H"
    ],
    "AT": [
        "H",
        "hB"
    ],
    "AU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AW": [
        "H",
        "hB"
    ],
    "AX": [
        "H"
    ],
    "AZ": [
        "H",
        "hB",
        "h"
    ],
    "BA": [
        "H",
        "hB",
        "h"
    ],
    "BB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BD": [
        "h",
        "hB",
        "H"
    ],
    "BE": [
        "H",
        "hB"
    ],
    "BF": [
        "H",
        "hB"
    ],
    "BG": [
        "H",
        "hB",
        "h"
    ],
    "BH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "BI": [
        "H",
        "h"
    ],
    "BJ": [
        "H",
        "hB"
    ],
    "BL": [
        "H",
        "hB"
    ],
    "BM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BN": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "BO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "BQ": [
        "H"
    ],
    "BR": [
        "H",
        "hB"
    ],
    "BS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BT": [
        "h",
        "H"
    ],
    "BW": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "BY": [
        "H",
        "h"
    ],
    "BZ": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CA": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "CC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CD": [
        "hB",
        "H"
    ],
    "CF": [
        "H",
        "h",
        "hB"
    ],
    "CG": [
        "H",
        "hB"
    ],
    "CH": [
        "H",
        "hB",
        "h"
    ],
    "CI": [
        "H",
        "hB"
    ],
    "CK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CL": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CM": [
        "H",
        "h",
        "hB"
    ],
    "CN": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "CO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CP": [
        "H"
    ],
    "CR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CU": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CV": [
        "H",
        "hB"
    ],
    "CW": [
        "H",
        "hB"
    ],
    "CX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CY": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "CZ": [
        "H"
    ],
    "DE": [
        "H",
        "hB"
    ],
    "DG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "DJ": [
        "h",
        "H"
    ],
    "DK": [
        "H"
    ],
    "DM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "DO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "DZ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "EC": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "EE": [
        "H",
        "hB"
    ],
    "EG": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ER": [
        "h",
        "H"
    ],
    "ES": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "ET": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "FI": [
        "H"
    ],
    "FJ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "FM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FO": [
        "H",
        "h"
    ],
    "FR": [
        "H",
        "hB"
    ],
    "GA": [
        "H",
        "hB"
    ],
    "GB": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GD": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GE": [
        "H",
        "hB",
        "h"
    ],
    "GF": [
        "H",
        "hB"
    ],
    "GG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GH": [
        "h",
        "H"
    ],
    "GI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GL": [
        "H",
        "h"
    ],
    "GM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GN": [
        "H",
        "hB"
    ],
    "GP": [
        "H",
        "hB"
    ],
    "GQ": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "GR": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "GS": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GT": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "GU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GW": [
        "H",
        "hB"
    ],
    "GY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "HK": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "HN": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "HR": [
        "H",
        "hB"
    ],
    "HU": [
        "H",
        "h"
    ],
    "IC": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "ID": [
        "H"
    ],
    "IE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IL": [
        "H",
        "hB"
    ],
    "IM": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IN": [
        "h",
        "H"
    ],
    "IO": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IQ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "IR": [
        "hB",
        "H"
    ],
    "IS": [
        "H"
    ],
    "IT": [
        "H",
        "hB"
    ],
    "JE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "JM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "JO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "JP": [
        "H",
        "K",
        "h"
    ],
    "KE": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "KG": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KH": [
        "hB",
        "h",
        "H",
        "hb"
    ],
    "KI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KM": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KN": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KP": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KW": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "KY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KZ": [
        "H",
        "hB"
    ],
    "LA": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "LB": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "LC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LI": [
        "H",
        "hB",
        "h"
    ],
    "LK": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "LR": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LS": [
        "h",
        "H"
    ],
    "LT": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "LU": [
        "H",
        "h",
        "hB"
    ],
    "LV": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "LY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "MC": [
        "H",
        "hB"
    ],
    "MD": [
        "H",
        "hB"
    ],
    "ME": [
        "H",
        "hB",
        "h"
    ],
    "MF": [
        "H",
        "hB"
    ],
    "MG": [
        "H",
        "h"
    ],
    "MH": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ML": [
        "H"
    ],
    "MM": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "MN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MP": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MQ": [
        "H",
        "hB"
    ],
    "MR": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MS": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MT": [
        "H",
        "h"
    ],
    "MU": [
        "H",
        "h"
    ],
    "MV": [
        "H",
        "h"
    ],
    "MW": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MX": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "MY": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "MZ": [
        "H",
        "hB"
    ],
    "NA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "NC": [
        "H",
        "hB"
    ],
    "NE": [
        "H"
    ],
    "NF": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NI": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "NL": [
        "H",
        "hB"
    ],
    "NO": [
        "H",
        "h"
    ],
    "NP": [
        "H",
        "h",
        "hB"
    ],
    "NR": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NU": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "OM": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PE": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PF": [
        "H",
        "h",
        "hB"
    ],
    "PG": [
        "h",
        "H"
    ],
    "PH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PK": [
        "h",
        "hB",
        "H"
    ],
    "PL": [
        "H",
        "h"
    ],
    "PM": [
        "H",
        "hB"
    ],
    "PN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "PR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PS": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PT": [
        "H",
        "hB"
    ],
    "PW": [
        "h",
        "H"
    ],
    "PY": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "QA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "RE": [
        "H",
        "hB"
    ],
    "RO": [
        "H",
        "hB"
    ],
    "RS": [
        "H",
        "hB",
        "h"
    ],
    "RU": [
        "H"
    ],
    "RW": [
        "H",
        "h"
    ],
    "SA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SC": [
        "H",
        "h",
        "hB"
    ],
    "SD": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SE": [
        "H"
    ],
    "SG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SH": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SI": [
        "H",
        "hB"
    ],
    "SJ": [
        "H"
    ],
    "SK": [
        "H"
    ],
    "SL": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SM": [
        "H",
        "h",
        "hB"
    ],
    "SN": [
        "H",
        "h",
        "hB"
    ],
    "SO": [
        "h",
        "H"
    ],
    "SR": [
        "H",
        "hB"
    ],
    "SS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ST": [
        "H",
        "hB"
    ],
    "SV": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "SX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "TC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TD": [
        "h",
        "H",
        "hB"
    ],
    "TF": [
        "H",
        "h",
        "hB"
    ],
    "TG": [
        "H",
        "hB"
    ],
    "TH": [
        "H",
        "h"
    ],
    "TJ": [
        "H",
        "h"
    ],
    "TL": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "TM": [
        "H",
        "h"
    ],
    "TN": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "TO": [
        "h",
        "H"
    ],
    "TR": [
        "H",
        "hB"
    ],
    "TT": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TW": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "TZ": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UA": [
        "H",
        "hB",
        "h"
    ],
    "UG": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "US": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "UY": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "UZ": [
        "H",
        "hB",
        "h"
    ],
    "VA": [
        "H",
        "h",
        "hB"
    ],
    "VC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VE": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "VG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VN": [
        "H",
        "h"
    ],
    "VU": [
        "h",
        "H"
    ],
    "WF": [
        "H",
        "hB"
    ],
    "WS": [
        "h",
        "H"
    ],
    "XK": [
        "H",
        "hB",
        "h"
    ],
    "YE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "YT": [
        "H",
        "hB"
    ],
    "ZA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ZM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ZW": [
        "H",
        "h"
    ],
    "af-ZA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "ar-001": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ca-ES": [
        "H",
        "h",
        "hB"
    ],
    "en-001": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "en-HK": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "en-IL": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "en-MY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "es-BR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-ES": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-GQ": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "fr-CA": [
        "H",
        "h",
        "hB"
    ],
    "gl-ES": [
        "H",
        "h",
        "hB"
    ],
    "gu-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "hi-IN": [
        "hB",
        "h",
        "H"
    ],
    "it-CH": [
        "H",
        "h",
        "hB"
    ],
    "it-IT": [
        "H",
        "h",
        "hB"
    ],
    "kn-IN": [
        "hB",
        "h",
        "H"
    ],
    "ku-SY": [
        "H",
        "hB"
    ],
    "ml-IN": [
        "hB",
        "h",
        "H"
    ],
    "mr-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "pa-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "ta-IN": [
        "hB",
        "h",
        "hb",
        "H"
    ],
    "te-IN": [
        "hB",
        "h",
        "H"
    ],
    "zu-ZA": [
        "H",
        "hB",
        "hb",
        "h"
    ]
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/date-time-pattern-generator.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBestPattern",
    ()=>getBestPattern
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/time-data.generated.js [middleware-edge] (ecmascript)");
;
function getBestPattern(skeleton, locale) {
    let skeletonCopy = "";
    for(let patternPos = 0; patternPos < skeleton.length; patternPos++){
        const patternChar = skeleton.charAt(patternPos);
        if (patternChar === "j") {
            let extraLength = 0;
            while(patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar){
                extraLength++;
                patternPos++;
            }
            let hourLen = 1 + (extraLength & 1);
            let dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
            let dayPeriodChar = "a";
            let hourChar = getDefaultHourSymbolFromLocale(locale);
            if (hourChar == "H" || hourChar == "k") {
                dayPeriodLen = 0;
            }
            while(dayPeriodLen-- > 0){
                skeletonCopy += dayPeriodChar;
            }
            while(hourLen-- > 0){
                skeletonCopy = hourChar + skeletonCopy;
            }
        } else if (patternChar === "J") {
            skeletonCopy += "H";
        } else {
            skeletonCopy += patternChar;
        }
    }
    return skeletonCopy;
}
/**
* Maps the [hour cycle type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle)
* of the given `locale` to the corresponding time pattern.
* @param locale
*/ function getDefaultHourSymbolFromLocale(locale) {
    let hourCycle = locale.hourCycle;
    if (hourCycle === undefined && locale.hourCycles && locale.hourCycles.length) {
        // @ts-ignore
        hourCycle = locale.hourCycles[0];
    }
    if (hourCycle) {
        switch(hourCycle){
            case "h24":
                return "k";
            case "h23":
                return "H";
            case "h12":
                return "h";
            case "h11":
                return "K";
            default:
                throw new Error("Invalid hourCycle");
        }
    }
    // TODO: Once hourCycle is fully supported remove the following with data generation
    const languageTag = locale.language;
    let regionTag;
    if (languageTag !== "root") {
        regionTag = locale.maximize().region;
    }
    const hourCycles = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timeData"][regionTag || ""] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timeData"][languageTag || ""] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timeData"][`${languageTag}-001`] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["timeData"]["001"];
    return hourCycles[0];
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/parser.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Parser",
    ()=>Parser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/error.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$regex$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/regex.generated.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$number$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/number.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$date$2d$time$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/date-time.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$date$2d$time$2d$pattern$2d$generator$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/date-time-pattern-generator.js [middleware-edge] (ecmascript)");
;
;
;
;
;
const SPACE_SEPARATOR_START_REGEX = new RegExp(`^${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$regex$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SPACE_SEPARATOR_REGEX"].source}*`);
const SPACE_SEPARATOR_END_REGEX = new RegExp(`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$regex$2e$generated$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SPACE_SEPARATOR_REGEX"].source}*$`);
function createLocation(start, end) {
    return {
        start,
        end
    };
}
// #region Ponyfills
// Consolidate these variables up top for easier toggling during debugging
const hasNativeFromEntries = !!Object.fromEntries;
const hasTrimStart = !!String.prototype.trimStart;
const hasTrimEnd = !!String.prototype.trimEnd;
const fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries(entries) {
    const obj = {};
    for (const [k, v] of entries){
        obj[k] = v;
    }
    return obj;
};
const trimStart = hasTrimStart ? function trimStart(s) {
    return s.trimStart();
} : function trimStart(s) {
    return s.replace(SPACE_SEPARATOR_START_REGEX, "");
};
const trimEnd = hasTrimEnd ? function trimEnd(s) {
    return s.trimEnd();
} : function trimEnd(s) {
    return s.replace(SPACE_SEPARATOR_END_REGEX, "");
};
// #endregion
const IDENTIFIER_PREFIX_RE = new RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
function matchIdentifierAtIndex(s, index) {
    IDENTIFIER_PREFIX_RE.lastIndex = index;
    const match = IDENTIFIER_PREFIX_RE.exec(s);
    return match[1] ?? "";
}
class Parser {
    message;
    position;
    locale;
    ignoreTag;
    requiresOtherClause;
    shouldParseSkeletons;
    constructor(message, options = {}){
        this.message = message;
        this.position = {
            offset: 0,
            line: 1,
            column: 1
        };
        this.ignoreTag = !!options.ignoreTag;
        this.locale = options.locale;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
    }
    parse() {
        if (this.offset() !== 0) {
            throw Error("parser can only be used once");
        }
        return this.parseMessage(0, "", false);
    }
    parseMessage(nestingLevel, parentArgType, expectingCloseTag) {
        let elements = [];
        while(!this.isEOF()){
            const char = this.char();
            if (char === 123) {
                const result = this.parseArgument(nestingLevel, expectingCloseTag);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            } else if (char === 125 && nestingLevel > 0) {
                break;
            } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
                const position = this.clonePosition();
                this.bump();
                elements.push({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].pound,
                    location: createLocation(position, this.clonePosition())
                });
            } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
                if (expectingCloseTag) {
                    break;
                } else {
                    return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
                }
            } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
                const result = this.parseTag(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            } else {
                const result = this.parseLiteral(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
        }
        return {
            val: elements,
            err: null
        };
    }
    /**
	* A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
	* [custom element name][] except that a dash is NOT always mandatory and uppercase letters
	* are accepted:
	*
	* ```
	* tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
	* tagName ::= [a-z] (PENChar)*
	* PENChar ::=
	*     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
	*     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
	*     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
	* ```
	*
	* [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
	* NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
	* since other tag-based engines like React allow it
	*/ parseTag(nestingLevel, parentArgType) {
        const startPosition = this.clonePosition();
        this.bump();
        const tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf("/>")) {
            // Self closing tag
            return {
                val: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].literal,
                    value: `<${tagName}/>`,
                    location: createLocation(startPosition, this.clonePosition())
                },
                err: null
            };
        } else if (this.bumpIf(">")) {
            const childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
            if (childrenResult.err) {
                return childrenResult;
            }
            const children = childrenResult.val;
            // Expecting a close tag
            const endTagStartPosition = this.clonePosition();
            if (this.bumpIf("</")) {
                if (this.isEOF() || !_isAlpha(this.char())) {
                    return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                const closingTagNameStartPosition = this.clonePosition();
                const closingTagName = this.parseTagName();
                if (tagName !== closingTagName) {
                    return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
                }
                this.bumpSpace();
                if (!this.bumpIf(">")) {
                    return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                return {
                    val: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].tag,
                        value: tagName,
                        children,
                        location: createLocation(startPosition, this.clonePosition())
                    },
                    err: null
                };
            } else {
                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
            }
        } else {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
    }
    /**
	* This method assumes that the caller has peeked ahead for the first tag character.
	*/ parseTagName() {
        const startOffset = this.offset();
        this.bump();
        while(!this.isEOF() && _isPotentialElementNameChar(this.char())){
            this.bump();
        }
        return this.message.slice(startOffset, this.offset());
    }
    parseLiteral(nestingLevel, parentArgType) {
        const start = this.clonePosition();
        let value = "";
        while(true){
            const parseQuoteResult = this.tryParseQuote(parentArgType);
            if (parseQuoteResult) {
                value += parseQuoteResult;
                continue;
            }
            const parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
            if (parseUnquotedResult) {
                value += parseUnquotedResult;
                continue;
            }
            const parseLeftAngleResult = this.tryParseLeftAngleBracket();
            if (parseLeftAngleResult) {
                value += parseLeftAngleResult;
                continue;
            }
            break;
        }
        const location = createLocation(start, this.clonePosition());
        return {
            val: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].literal,
                value,
                location
            },
            err: null
        };
    }
    tryParseLeftAngleBracket() {
        if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
            this.bump();
            return "<";
        }
        return null;
    }
    /**
	* Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
	* a character that requires quoting (that is, "only where needed"), and works the same in
	* nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
	*/ tryParseQuote(parentArgType) {
        if (this.isEOF() || this.char() !== 39) {
            return null;
        }
        // Parse escaped char following the apostrophe, or early return if there is no escaped char.
        // Check if is valid escaped character
        switch(this.peek()){
            case 39:
                // double quote, should return as a single quote.
                this.bump();
                this.bump();
                return "'";
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35:
                if (parentArgType === "plural" || parentArgType === "selectordinal") {
                    break;
                }
                return null;
            default:
                return null;
        }
        this.bump();
        const codePoints = [
            this.char()
        ];
        this.bump();
        // read chars until the optional closing apostrophe is found
        while(!this.isEOF()){
            const ch = this.char();
            if (ch === 39) {
                if (this.peek() === 39) {
                    codePoints.push(39);
                    // Bump one more time because we need to skip 2 characters.
                    this.bump();
                } else {
                    // Optional closing apostrophe.
                    this.bump();
                    break;
                }
            } else {
                codePoints.push(ch);
            }
            this.bump();
        }
        return String.fromCodePoint(...codePoints);
    }
    tryParseUnquoted(nestingLevel, parentArgType) {
        if (this.isEOF()) {
            return null;
        }
        const ch = this.char();
        if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
            return null;
        } else {
            this.bump();
            return String.fromCodePoint(ch);
        }
    }
    parseArgument(nestingLevel, expectingCloseTag) {
        const openingBracePosition = this.clonePosition();
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125) {
            this.bump();
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        // argument name
        let value = this.parseIdentifierIfPossible().value;
        if (!value) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch(this.char()){
            case 125:
                {
                    this.bump();
                    return {
                        val: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].argument,
                            value,
                            location: createLocation(openingBracePosition, this.clonePosition())
                        },
                        err: null
                    };
                }
            case 44:
                {
                    this.bump();
                    this.bumpSpace();
                    if (this.isEOF()) {
                        return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
                    }
                    return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
                }
            default:
                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
    }
    /**
	* Advance the parser until the end of the identifier, if it is currently on
	* an identifier character. Return an empty string otherwise.
	*/ parseIdentifierIfPossible() {
        const startingPosition = this.clonePosition();
        const startOffset = this.offset();
        const value = matchIdentifierAtIndex(this.message, startOffset);
        const endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        const endPosition = this.clonePosition();
        const location = createLocation(startingPosition, endPosition);
        return {
            value,
            location
        };
    }
    parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition) {
        // Parse this range:
        // {name, type, style}
        //        ^---^
        let typeStartPosition = this.clonePosition();
        let argType = this.parseIdentifierIfPossible().value;
        let typeEndPosition = this.clonePosition();
        switch(argType){
            case "":
                // Expecting a style string number, date, time, plural, selectordinal, or select.
                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
            case "number":
            case "date":
            case "time":
                {
                    // Parse this range:
                    // {name, number, style}
                    //              ^-------^
                    this.bumpSpace();
                    let styleAndLocation = null;
                    if (this.bumpIf(",")) {
                        this.bumpSpace();
                        const styleStartPosition = this.clonePosition();
                        const result = this.parseSimpleArgStyleIfPossible();
                        if (result.err) {
                            return result;
                        }
                        const style = trimEnd(result.val);
                        if (style.length === 0) {
                            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
                        }
                        const styleLocation = createLocation(styleStartPosition, this.clonePosition());
                        styleAndLocation = {
                            style,
                            styleLocation
                        };
                    }
                    const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                    if (argCloseResult.err) {
                        return argCloseResult;
                    }
                    const location = createLocation(openingBracePosition, this.clonePosition());
                    // Extract style or skeleton
                    if (styleAndLocation && styleAndLocation.style.startsWith("::")) {
                        // Skeleton starts with `::`.
                        let skeleton = trimStart(styleAndLocation.style.slice(2));
                        if (argType === "number") {
                            const result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                            if (result.err) {
                                return result;
                            }
                            return {
                                val: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].number,
                                    value,
                                    location,
                                    style: result.val
                                },
                                err: null
                            };
                        } else {
                            if (skeleton.length === 0) {
                                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_DATE_TIME_SKELETON, location);
                            }
                            let dateTimePattern = skeleton;
                            // Get "best match" pattern only if locale is passed, if not, let it
                            // pass as-is where `parseDateTimeSkeleton()` will throw an error
                            // for unsupported patterns.
                            if (this.locale) {
                                dateTimePattern = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$date$2d$time$2d$pattern$2d$generator$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getBestPattern"])(skeleton, this.locale);
                            }
                            const style = {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SKELETON_TYPE"].dateTime,
                                pattern: dateTimePattern,
                                location: styleAndLocation.styleLocation,
                                parsedOptions: this.shouldParseSkeletons ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$date$2d$time$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parseDateTimeSkeleton"])(dateTimePattern) : {}
                            };
                            const type = argType === "date" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].date : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].time;
                            return {
                                val: {
                                    type,
                                    value,
                                    location,
                                    style
                                },
                                err: null
                            };
                        }
                    }
                    // Regular style or no style.
                    return {
                        val: {
                            type: argType === "number" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].number : argType === "date" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].date : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].time,
                            value,
                            location,
                            style: styleAndLocation?.style ?? null
                        },
                        err: null
                    };
                }
            case "plural":
            case "selectordinal":
            case "select":
                {
                    // Parse this range:
                    // {name, plural, options}
                    //              ^---------^
                    const typeEndPosition = this.clonePosition();
                    this.bumpSpace();
                    if (!this.bumpIf(",")) {
                        return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition, {
                            ...typeEndPosition
                        }));
                    }
                    this.bumpSpace();
                    // Parse offset:
                    // {name, plural, offset:1, options}
                    //                ^-----^
                    //
                    // or the first option:
                    //
                    // {name, plural, one {...} other {...}}
                    //                ^--^
                    let identifierAndLocation = this.parseIdentifierIfPossible();
                    let pluralOffset = 0;
                    if (argType !== "select" && identifierAndLocation.value === "offset") {
                        if (!this.bumpIf(":")) {
                            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
                        }
                        this.bumpSpace();
                        const result = this.tryParseDecimalInteger(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                        if (result.err) {
                            return result;
                        }
                        // Parse another identifier for option parsing
                        this.bumpSpace();
                        identifierAndLocation = this.parseIdentifierIfPossible();
                        pluralOffset = result.val;
                    }
                    const optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
                    if (optionsResult.err) {
                        return optionsResult;
                    }
                    const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                    if (argCloseResult.err) {
                        return argCloseResult;
                    }
                    const location = createLocation(openingBracePosition, this.clonePosition());
                    if (argType === "select") {
                        return {
                            val: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].select,
                                value,
                                options: fromEntries(optionsResult.val),
                                location
                            },
                            err: null
                        };
                    } else {
                        return {
                            val: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].plural,
                                value,
                                options: fromEntries(optionsResult.val),
                                offset: pluralOffset,
                                pluralType: argType === "plural" ? "cardinal" : "ordinal",
                                location
                            },
                            err: null
                        };
                    }
                }
            default:
                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
    }
    tryParseArgumentClose(openingBracePosition) {
        // Parse: {value, number, ::currency/GBP }
        //
        if (this.isEOF() || this.char() !== 125) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump();
        return {
            val: true,
            err: null
        };
    }
    /**
	* See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
	*/ parseSimpleArgStyleIfPossible() {
        let nestedBraces = 0;
        const startPosition = this.clonePosition();
        while(!this.isEOF()){
            const ch = this.char();
            switch(ch){
                case 39:
                    {
                        // Treat apostrophe as quoting but include it in the style part.
                        // Find the end of the quoted literal text.
                        this.bump();
                        let apostrophePosition = this.clonePosition();
                        if (!this.bumpUntil("'")) {
                            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
                        }
                        this.bump();
                        break;
                    }
                case 123:
                    {
                        nestedBraces += 1;
                        this.bump();
                        break;
                    }
                case 125:
                    {
                        if (nestedBraces > 0) {
                            nestedBraces -= 1;
                        } else {
                            return {
                                val: this.message.slice(startPosition.offset, this.offset()),
                                err: null
                            };
                        }
                        break;
                    }
                default:
                    this.bump();
                    break;
            }
        }
        return {
            val: this.message.slice(startPosition.offset, this.offset()),
            err: null
        };
    }
    parseNumberSkeletonFromString(skeleton, location) {
        let tokens = [];
        try {
            tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$number$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parseNumberSkeletonFromString"])(skeleton);
        } catch  {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_NUMBER_SKELETON, location);
        }
        return {
            val: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SKELETON_TYPE"].number,
                tokens,
                location,
                parsedOptions: this.shouldParseSkeletons ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$number$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parseNumberSkeleton"])(tokens) : {}
            },
            err: null
        };
    }
    /**
	* @param nesting_level The current nesting level of messages.
	*     This can be positive when parsing message fragment in select or plural argument options.
	* @param parent_arg_type The parent argument's type.
	* @param parsed_first_identifier If provided, this is the first identifier-like selector of
	*     the argument. It is a by-product of a previous parsing attempt.
	* @param expecting_close_tag If true, this message is directly or indirectly nested inside
	*     between a pair of opening and closing tags. The nested message will not parse beyond
	*     the closing tag boundary.
	*/ tryParsePluralOrSelectOptions(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        let hasOtherClause = false;
        const options = [];
        const parsedSelectors = new Set();
        let { value: selector, location: selectorLocation } = parsedFirstIdentifier;
        // Parse:
        // one {one apple}
        // ^--^
        while(true){
            if (selector.length === 0) {
                const startPosition = this.clonePosition();
                if (parentArgType !== "select" && this.bumpIf("=")) {
                    // Try parse `={number}` selector
                    const result = this.tryParseDecimalInteger(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_SELECTOR, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (result.err) {
                        return result;
                    }
                    selectorLocation = createLocation(startPosition, this.clonePosition());
                    selector = this.message.slice(startPosition.offset, this.offset());
                } else {
                    break;
                }
            }
            // Duplicate selector clauses
            if (parsedSelectors.has(selector)) {
                return this.error(parentArgType === "select" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].DUPLICATE_SELECT_ARGUMENT_SELECTOR : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
            }
            if (selector === "other") {
                hasOtherClause = true;
            }
            // Parse:
            // one {one apple}
            //     ^----------^
            this.bumpSpace();
            const openingBracePosition = this.clonePosition();
            if (!this.bumpIf("{")) {
                return this.error(parentArgType === "select" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
            }
            const fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
            if (fragmentResult.err) {
                return fragmentResult;
            }
            const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
                return argCloseResult;
            }
            options.push([
                selector,
                {
                    value: fragmentResult.val,
                    location: createLocation(openingBracePosition, this.clonePosition())
                }
            ]);
            // Keep track of the existing selectors
            parsedSelectors.add(selector);
            // Prep next selector clause.
            this.bumpSpace();
            ({ value: selector, location: selectorLocation } = this.parseIdentifierIfPossible());
        }
        if (options.length === 0) {
            return this.error(parentArgType === "select" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_SELECT_ARGUMENT_SELECTOR : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"].MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return {
            val: options,
            err: null
        };
    }
    tryParseDecimalInteger(expectNumberError, invalidNumberError) {
        let sign = 1;
        const startingPosition = this.clonePosition();
        if (this.bumpIf("+")) {} else if (this.bumpIf("-")) {
            sign = -1;
        }
        let hasDigits = false;
        let decimal = 0;
        while(!this.isEOF()){
            const ch = this.char();
            if (ch >= 48 && ch <= 57) {
                hasDigits = true;
                decimal = decimal * 10 + (ch - 48);
                this.bump();
            } else {
                break;
            }
        }
        const location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
            return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!Number.isSafeInteger(decimal)) {
            return this.error(invalidNumberError, location);
        }
        return {
            val: decimal,
            err: null
        };
    }
    offset() {
        return this.position.offset;
    }
    isEOF() {
        return this.offset() === this.message.length;
    }
    clonePosition() {
        // This is much faster than `Object.assign` or spread.
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column
        };
    }
    /**
	* Return the code point at the current position of the parser.
	* Throws if the index is out of bound.
	*/ char() {
        const offset = this.position.offset;
        if (offset >= this.message.length) {
            throw Error("out of bound");
        }
        const code = this.message.codePointAt(offset);
        if (code === undefined) {
            throw Error(`Offset ${offset} is at invalid UTF-16 code unit boundary`);
        }
        return code;
    }
    error(kind, location) {
        return {
            val: null,
            err: {
                kind,
                message: this.message,
                location
            }
        };
    }
    /** Bump the parser to the next UTF-16 code unit. */ bump() {
        if (this.isEOF()) {
            return;
        }
        const code = this.char();
        if (code === 10) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
        } else {
            this.position.column += 1;
            // 0 ~ 0x10000 -> unicode BMP, otherwise skip the surrogate pair.
            this.position.offset += code < 65536 ? 1 : 2;
        }
    }
    /**
	* If the substring starting at the current position of the parser has
	* the given prefix, then bump the parser to the character immediately
	* following the prefix and return true. Otherwise, don't bump the parser
	* and return false.
	*/ bumpIf(prefix) {
        if (this.message.startsWith(prefix, this.offset())) {
            for(let i = 0; i < prefix.length; i++){
                this.bump();
            }
            return true;
        }
        return false;
    }
    /**
	* Bump the parser until the pattern character is found and return `true`.
	* Otherwise bump to the end of the file and return `false`.
	*/ bumpUntil(pattern) {
        const currentOffset = this.offset();
        const index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
            this.bumpTo(index);
            return true;
        } else {
            this.bumpTo(this.message.length);
            return false;
        }
    }
    /**
	* Bump the parser to the target offset.
	* If target offset is beyond the end of the input, bump the parser to the end of the input.
	*/ bumpTo(targetOffset) {
        if (this.offset() > targetOffset) {
            throw Error(`targetOffset ${targetOffset} must be greater than or equal to the current offset ${this.offset()}`);
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while(true){
            const offset = this.offset();
            if (offset === targetOffset) {
                break;
            }
            if (offset > targetOffset) {
                throw Error(`targetOffset ${targetOffset} is at invalid UTF-16 code unit boundary`);
            }
            this.bump();
            if (this.isEOF()) {
                break;
            }
        }
    }
    /** advance the parser through all whitespace to the next non-whitespace code unit. */ bumpSpace() {
        while(!this.isEOF() && _isWhiteSpace(this.char())){
            this.bump();
        }
    }
    /**
	* Peek at the *next* Unicode codepoint in the input without advancing the parser.
	* If the input has been exhausted, then this returns null.
	*/ peek() {
        if (this.isEOF()) {
            return null;
        }
        const code = this.char();
        const offset = this.offset();
        const nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
        return nextCode ?? null;
    }
}
/**
* This check if codepoint is alphabet (lower & uppercase)
* @param codepoint
* @returns
*/ function _isAlpha(codepoint) {
    return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
    return _isAlpha(codepoint) || codepoint === 47;
}
/** See `parseTag` function docs. */ function _isPotentialElementNameChar(c) {
    return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
}
/**
* Code point equivalent of regex `\p{White_Space}`.
* From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
*/ function _isWhiteSpace(c) {
    return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/manipulator.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hoistSelectors",
    ()=>hoistSelectors,
    "isStructurallySame",
    ()=>isStructurallySame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [middleware-edge] (ecmascript)");
;
function cloneDeep(obj) {
    if (Array.isArray(obj)) {
        // @ts-expect-error meh
        return obj.map(cloneDeep);
    }
    if (obj !== null && typeof obj === "object") {
        // @ts-expect-error meh
        return Object.keys(obj).reduce((cloned, k)=>{
            // @ts-expect-error meh
            cloned[k] = cloneDeep(obj[k]);
            return cloned;
        }, {});
    }
    return obj;
}
/**
* Replace pound elements with number elements referencing the given variable.
* This is needed when nesting plurals - the # in the outer plural should become
* an explicit variable reference when nested inside another plural.
* GH #4202
*/ function replacePoundWithArgument(ast, variableName) {
    return ast.map((el)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPoundElement"])(el)) {
            // Replace # with {variableName, number}
            return {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"].number,
                value: variableName,
                style: null,
                location: el.location
            };
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPluralElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isSelectElement"])(el)) {
            // Recursively process options
            const newOptions = {};
            for (const key of Object.keys(el.options)){
                newOptions[key] = {
                    value: replacePoundWithArgument(el.options[key].value, variableName)
                };
            }
            return {
                ...el,
                options: newOptions
            };
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            return {
                ...el,
                children: replacePoundWithArgument(el.children, variableName)
            };
        }
        return el;
    });
}
function hoistPluralOrSelectElement(ast, el, positionToInject) {
    // pull this out of the ast and move it to the top
    const cloned = cloneDeep(el);
    const { options } = cloned;
    // GH #4202: Check if there are other plural/select elements after this one
    const afterElements = ast.slice(positionToInject + 1);
    const hasSubsequentPluralOrSelect = afterElements.some(isPluralOrSelectElement);
    cloned.options = Object.keys(options).reduce((all, k)=>{
        let optionValue = options[k].value;
        // GH #4202: If there are subsequent plurals/selects and this is a plural,
        // replace # with explicit variable reference to avoid ambiguity
        if (hasSubsequentPluralOrSelect && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPluralElement"])(el)) {
            optionValue = replacePoundWithArgument(optionValue, el.value);
        }
        const newValue = hoistSelectors([
            ...ast.slice(0, positionToInject),
            ...optionValue,
            ...afterElements
        ]);
        all[k] = {
            value: newValue
        };
        return all;
    }, {});
    return cloned;
}
function isPluralOrSelectElement(el) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPluralElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isSelectElement"])(el);
}
function findPluralOrSelectElement(ast) {
    return !!ast.find((el)=>{
        if (isPluralOrSelectElement(el)) {
            return true;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            return findPluralOrSelectElement(el.children);
        }
        return false;
    });
}
function hoistSelectors(ast) {
    for(let i = 0; i < ast.length; i++){
        const el = ast[i];
        if (isPluralOrSelectElement(el)) {
            return [
                hoistPluralOrSelectElement(ast, el, i)
            ];
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTagElement"])(el) && findPluralOrSelectElement([
            el
        ])) {
            throw new Error("Cannot hoist plural/select within a tag element. Please put the tag element inside each plural/select option");
        }
    }
    return ast;
}
/**
* Collect all variables in an AST to Record<string, TYPE>
* @param ast AST to collect variables from
* @param vars Record of variable name to variable type
*/ function collectVariables(ast, vars = new Map()) {
    ast.forEach((el)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isArgumentElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isDateElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTimeElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isNumberElement"])(el)) {
            if (el.value in vars && vars.get(el.value) !== el.type) {
                throw new Error(`Variable ${el.value} has conflicting types`);
            }
            vars.set(el.value, el.type);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPluralElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isSelectElement"])(el)) {
            vars.set(el.value, el.type);
            Object.keys(el.options).forEach((k)=>{
                collectVariables(el.options[k].value, vars);
            });
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            vars.set(el.value, el.type);
            collectVariables(el.children, vars);
        }
    });
}
function isStructurallySame(a, b) {
    const aVars = new Map();
    const bVars = new Map();
    collectVariables(a, aVars);
    collectVariables(b, bVars);
    if (aVars.size !== bVars.size) {
        return {
            success: false,
            error: new Error(`Different number of variables: [${Array.from(aVars.keys()).join(", ")}] vs [${Array.from(bVars.keys()).join(", ")}]`)
        };
    }
    return Array.from(aVars.entries()).reduce((result, [key, type])=>{
        if (!result.success) {
            return result;
        }
        const bType = bVars.get(key);
        if (bType == null) {
            return {
                success: false,
                error: new Error(`Missing variable ${key} in message`)
            };
        }
        if (bType !== type) {
            return {
                success: false,
                error: new Error(`Variable ${key} has conflicting types: ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"][type]} vs ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["TYPE"][bType]}`)
            };
        }
        return result;
    }, {
        success: true
    });
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/index.js [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_Parser",
    ()=>_Parser,
    "parse",
    ()=>parse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/error.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$parser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/parser.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$manipulator$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/manipulator.js [middleware-edge] (ecmascript)");
;
;
;
function pruneLocation(els) {
    els.forEach((el)=>{
        delete el.location;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isSelectElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPluralElement"])(el)) {
            for(const k in el.options){
                delete el.options[k].location;
                pruneLocation(el.options[k].value);
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isNumberElement"])(el) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isNumberSkeleton"])(el.style)) {
            delete el.style.location;
        } else if (((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isDateElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTimeElement"])(el)) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isDateTimeSkeleton"])(el.style)) {
            delete el.style.location;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            pruneLocation(el.children);
        }
    });
}
function parse(message, opts = {}) {
    opts = {
        shouldParseSkeletons: true,
        requiresOtherClause: true,
        ...opts
    };
    const result = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$parser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Parser"](message, opts).parse();
    if (result.err) {
        const error = SyntaxError(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorKind"][result.err.kind]);
        // @ts-expect-error Assign to error object
        error.location = result.err.location;
        // @ts-expect-error Assign to error object
        error.originalMessage = result.err.message;
        throw error;
    }
    if (!opts?.captureLocation) {
        pruneLocation(result.val);
    }
    return result.val;
}
;
const _Parser = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$parser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Parser"];
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/error.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorCode",
    ()=>ErrorCode,
    "FormatError",
    ()=>FormatError,
    "InvalidValueError",
    ()=>InvalidValueError,
    "InvalidValueTypeError",
    ()=>InvalidValueTypeError,
    "MissingValueError",
    ()=>MissingValueError
]);
let ErrorCode = /* @__PURE__ */ function(ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
    // When value supplied is invalid
    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
    // When we need specific Intl API but it's not available
    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
    return ErrorCode;
}({});
class FormatError extends Error {
    code;
    /**
	* Original message we're trying to format
	* `undefined` if we're only dealing w/ AST
	*
	* @type {(string | undefined)}
	* @memberof FormatError
	*/ originalMessage;
    constructor(msg, code, originalMessage){
        super(msg);
        this.code = code;
        this.originalMessage = originalMessage;
    }
    toString() {
        return `[formatjs Error: ${this.code}] ${this.message}`;
    }
}
class InvalidValueError extends FormatError {
    constructor(variableId, value, options, originalMessage){
        super(`Invalid values for "${variableId}": "${value}". Options are "${Object.keys(options).join("\", \"")}"`, ErrorCode.INVALID_VALUE, originalMessage);
    }
}
class InvalidValueTypeError extends FormatError {
    constructor(value, type, originalMessage){
        super(`Value for "${value}" must be of type ${type}`, ErrorCode.INVALID_VALUE, originalMessage);
    }
}
class MissingValueError extends FormatError {
    constructor(variableId, originalMessage){
        super(`The intl string context variable "${variableId}" was not provided to the string "${originalMessage}"`, ErrorCode.MISSING_VALUE, originalMessage);
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/formatters.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PART_TYPE",
    ()=>PART_TYPE,
    "formatToParts",
    ()=>formatToParts,
    "isFormatXMLElementFn",
    ()=>isFormatXMLElementFn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/error.js [middleware-edge] (ecmascript)");
;
;
;
let PART_TYPE = /* @__PURE__ */ function(PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
    return PART_TYPE;
}({});
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce((all, part)=>{
        const lastPart = all[all.length - 1];
        if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
            all.push(part);
        } else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
function isFormatXMLElementFn(el) {
    return typeof el === "function";
}
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLiteralElement"])(els[0])) {
        return [
            {
                type: PART_TYPE.literal,
                value: els[0].value
            }
        ];
    }
    const result = [];
    for (const el of els){
        // Exit early for string parts.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLiteralElement"])(el)) {
            result.push({
                type: PART_TYPE.literal,
                value: el.value
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPoundElement"])(el)) {
            if (typeof currentPluralValue === "number") {
                result.push({
                    type: PART_TYPE.literal,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue)
                });
            }
            continue;
        }
        const { value: varName } = el;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MissingValueError"](varName, originalMessage);
        }
        let value = values[varName];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isArgumentElement"])(el)) {
            if (!value || typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
                value = typeof value === "string" || typeof value === "number" || typeof value === "bigint" ? String(value) : "";
            }
            result.push({
                type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
                value
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isDateElement"])(el)) {
            const style = typeof el.style === "string" ? formats.date[el.style] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isDateTimeSkeleton"])(el.style) ? el.style.parsedOptions : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters.getDateTimeFormat(locales, style).format(value)
            });
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTimeElement"])(el)) {
            const style = typeof el.style === "string" ? formats.time[el.style] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isDateTimeSkeleton"])(el.style) ? el.style.parsedOptions : formats.time.medium;
            result.push({
                type: PART_TYPE.literal,
                value: formatters.getDateTimeFormat(locales, style).format(value)
            });
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isNumberElement"])(el)) {
            const style = typeof el.style === "string" ? formats.number[el.style] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isNumberSkeleton"])(el.style) ? el.style.parsedOptions : undefined;
            if (style && style.scale) {
                const scale = style.scale || 1;
                // Handle bigint scale multiplication
                // BigInt can only be multiplied by BigInt
                if (typeof value === "bigint") {
                    // Check if scale is a safe integer that can be converted to BigInt
                    if (!Number.isInteger(scale)) {
                        throw new TypeError(`Cannot apply fractional scale ${scale} to bigint value. Scale must be an integer when formatting bigint.`);
                    }
                    value = value * BigInt(scale);
                } else {
                    value = value * scale;
                }
            }
            result.push({
                type: PART_TYPE.literal,
                value: formatters.getNumberFormat(locales, style).format(value)
            });
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            const { children, value } = el;
            const formatFn = values[value];
            if (!isFormatXMLElementFn(formatFn)) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvalidValueTypeError"](value, "function", originalMessage);
            }
            const parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
            let chunks = formatFn(parts.map((p)=>p.value));
            if (!Array.isArray(chunks)) {
                chunks = [
                    chunks
                ];
            }
            result.push(...chunks.map((c)=>{
                return {
                    type: typeof c === "string" ? PART_TYPE.literal : PART_TYPE.object,
                    value: c
                };
            }));
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isSelectElement"])(el)) {
            // GH #4490: Use hasOwnProperty to avoid prototype chain issues with keys like "constructor"
            const key = value;
            const opt = (Object.prototype.hasOwnProperty.call(el.options, key) ? el.options[key] : undefined) || el.options.other;
            if (!opt) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvalidValueError"](el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push(...formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPluralElement"])(el)) {
            // GH #4490: Use hasOwnProperty to avoid prototype chain issues
            const exactKey = `=${value}`;
            let opt = Object.prototype.hasOwnProperty.call(el.options, exactKey) ? el.options[exactKey] : undefined;
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FormatError"](`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ErrorCode"].MISSING_INTL_API, originalMessage);
                }
                // Convert bigint to number for PluralRules (which only accepts number)
                const numericValue = typeof value === "bigint" ? Number(value) : value;
                const rule = formatters.getPluralRules(locales, {
                    type: el.pluralType
                }).select(numericValue - (el.offset || 0));
                opt = (Object.prototype.hasOwnProperty.call(el.options, rule) ? el.options[rule] : undefined) || el.options.other;
            }
            if (!opt) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvalidValueError"](el.value, value, Object.keys(el.options), originalMessage);
            }
            // Convert bigint to number for currentPluralValue
            const numericValue = typeof value === "bigint" ? Number(value) : value;
            result.push(...formatToParts(opt.value, locales, formatters, formats, values, numericValue - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/core.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntlMessageFormat",
    ()=>IntlMessageFormat
]);
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/fast-memoize/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$formatters$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/formatters.js [middleware-edge] (ecmascript)");
;
;
;
// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return {
        ...c1,
        ...c2,
        ...Object.keys(c1).reduce((all, k)=>{
            all[k] = {
                ...c1[k],
                ...c2[k]
            };
            return all;
        }, {})
    };
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce((all, k)=>{
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, {
        ...defaultConfig
    });
}
function createFastMemoizeCache(store) {
    return {
        create () {
            return {
                get (key) {
                    return store[key];
                },
                set (key, value) {
                    store[key] = value;
                }
            };
        }
    };
}
function createDefaultFormatters(cache = {
    number: {},
    dateTime: {},
    pluralRules: {}
}) {
    return {
        getNumberFormat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["memoize"])((...args)=>new Intl.NumberFormat(...args), {
            cache: createFastMemoizeCache(cache.number),
            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["strategies"].variadic
        }),
        getDateTimeFormat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["memoize"])((...args)=>new Intl.DateTimeFormat(...args), {
            cache: createFastMemoizeCache(cache.dateTime),
            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["strategies"].variadic
        }),
        getPluralRules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["memoize"])((...args)=>new Intl.PluralRules(...args), {
            cache: createFastMemoizeCache(cache.pluralRules),
            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["strategies"].variadic
        })
    };
}
class IntlMessageFormat {
    ast;
    locales;
    resolvedLocale;
    formatters;
    formats;
    message;
    formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
    };
    constructor(message, locales = IntlMessageFormat.defaultLocale, overrideFormats, opts){
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.resolvedLocale = IntlMessageFormat.resolveLocale(locales);
        if (typeof message === "string") {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
            }
            const { ...parseOpts } = opts || {};
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, {
                ...parseOpts,
                locale: this.resolvedLocale
            });
        } else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError("A message must be provided as a String or AST.");
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
    }
    format = (values)=>{
        const parts = this.formatToParts(values);
        // Hot path for straight simple msg translations
        if (parts.length === 1) {
            return parts[0].value;
        }
        const result = parts.reduce((all, part)=>{
            if (!all.length || part.type !== __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$formatters$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PART_TYPE"].literal || typeof all[all.length - 1] !== "string") {
                all.push(part.value);
            } else {
                all[all.length - 1] += part.value;
            }
            return all;
        }, []);
        if (result.length <= 1) {
            return result[0] || "";
        }
        return result;
    };
    formatToParts = (values)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$formatters$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatToParts"])(this.ast, this.locales, this.formatters, this.formats, values, undefined, this.message);
    resolvedOptions = ()=>({
            locale: this.resolvedLocale?.toString() || Intl.NumberFormat.supportedLocalesOf(this.locales)[0]
        });
    getAst = ()=>this.ast;
    static memoizedDefaultLocale = null;
    static get defaultLocale() {
        if (!IntlMessageFormat.memoizedDefaultLocale) {
            IntlMessageFormat.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
        }
        return IntlMessageFormat.memoizedDefaultLocale;
    }
    static resolveLocale = (locales)=>{
        if (typeof Intl.Locale === "undefined") {
            return;
        }
        const supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
        if (supportedLocales.length > 0) {
            return new Intl.Locale(supportedLocales[0]);
        }
        return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
    };
    static __parse = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"];
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    static formats = {
        number: {
            integer: {
                maximumFractionDigits: 0
            },
            currency: {
                style: "currency"
            },
            percent: {
                style: "percent"
            }
        },
        date: {
            short: {
                month: "numeric",
                day: "numeric",
                year: "2-digit"
            },
            medium: {
                month: "short",
                day: "numeric",
                year: "numeric"
            },
            long: {
                month: "long",
                day: "numeric",
                year: "numeric"
            },
            full: {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        },
        time: {
            short: {
                hour: "numeric",
                minute: "numeric"
            },
            medium: {
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            },
            long: {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZoneName: "short"
            },
            full: {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZoneName: "short"
            }
        }
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I",
    ()=>IntlError,
    "a",
    ()=>IntlErrorCode,
    "b",
    ()=>createCache,
    "c",
    ()=>createIntlFormatters,
    "m",
    ()=>memoFn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/fast-memoize/index.js [middleware-edge] (ecmascript)");
;
class IntlError extends Error {
    constructor(code, originalMessage){
        let message = code;
        if (originalMessage) {
            message += ': ' + originalMessage;
        }
        super(message);
        this.code = code;
        if (originalMessage) {
            this.originalMessage = originalMessage;
        }
    }
}
var IntlErrorCode = /*#__PURE__*/ function(IntlErrorCode) {
    IntlErrorCode["MISSING_MESSAGE"] = "MISSING_MESSAGE";
    IntlErrorCode["MISSING_FORMAT"] = "MISSING_FORMAT";
    IntlErrorCode["ENVIRONMENT_FALLBACK"] = "ENVIRONMENT_FALLBACK";
    IntlErrorCode["INSUFFICIENT_PATH"] = "INSUFFICIENT_PATH";
    IntlErrorCode["INVALID_MESSAGE"] = "INVALID_MESSAGE";
    IntlErrorCode["INVALID_KEY"] = "INVALID_KEY";
    IntlErrorCode["FORMATTING_ERROR"] = "FORMATTING_ERROR";
    return IntlErrorCode;
}(IntlErrorCode || {});
function createCache() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
        list: {},
        displayNames: {}
    };
}
function createMemoCache(store) {
    return {
        create () {
            return {
                get (key) {
                    return store[key];
                },
                set (key, value) {
                    store[key] = value;
                }
            };
        }
    };
}
function memoFn(fn, cache) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["memoize"])(fn, {
        cache: createMemoCache(cache),
        strategy: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["strategies"].variadic
    });
}
function memoConstructor(ConstructorFn, cache) {
    return memoFn((...args)=>new ConstructorFn(...args), cache);
}
function createIntlFormatters(cache) {
    const getDateTimeFormat = memoConstructor(Intl.DateTimeFormat, cache.dateTime);
    const getNumberFormat = memoConstructor(Intl.NumberFormat, cache.number);
    const getPluralRules = memoConstructor(Intl.PluralRules, cache.pluralRules);
    const getRelativeTimeFormat = memoConstructor(Intl.RelativeTimeFormat, cache.relativeTime);
    const getListFormat = memoConstructor(Intl.ListFormat, cache.list);
    const getDisplayNames = memoConstructor(Intl.DisplayNames, cache.displayNames);
    return {
        getDateTimeFormat,
        getNumberFormat,
        getPluralRules,
        getRelativeTimeFormat,
        getListFormat,
        getDisplayNames
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/format-message/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>formatMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$core$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/core.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript)");
;
;
;
/**
 * `intl-messageformat` uses separate keys for `date` and `time`, but there's
 * only one native API: `Intl.DateTimeFormat`. Additionally you might want to
 * include both a time and a date in a value, therefore the separation doesn't
 * seem so useful. We offer a single `dateTime` namespace instead, but we have
 * to convert the format before `intl-messageformat` can be used.
 */ function convertFormatsToIntlMessageFormat(globalFormats, inlineFormats, timeZone) {
    const mfDateDefaults = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$core$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IntlMessageFormat"].formats.date;
    const mfTimeDefaults = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$core$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IntlMessageFormat"].formats.time;
    const dateTimeFormats = {
        ...globalFormats?.dateTime,
        ...inlineFormats?.dateTime
    };
    const allFormats = {
        date: {
            ...mfDateDefaults,
            ...dateTimeFormats
        },
        time: {
            ...mfTimeDefaults,
            ...dateTimeFormats
        },
        number: {
            ...globalFormats?.number,
            ...inlineFormats?.number
        }
    };
    if (timeZone) {
        // The only way to set a time zone with `intl-messageformat` is to merge it into the formats
        // https://github.com/formatjs/formatjs/blob/8256c5271505cf2606e48e3c97ecdd16ede4f1b5/packages/intl/src/message.ts#L15
        [
            'date',
            'time'
        ].forEach((property)=>{
            const formats = allFormats[property];
            for (const [key, value] of Object.entries(formats)){
                formats[key] = {
                    timeZone,
                    ...value
                };
            }
        });
    }
    return allFormats;
}
// Placed here for improved tree shaking. Somehow when this is placed in
// `formatters.tsx`, then it can't be shaken off from `next-intl`.
function createMessageFormatter(cache, intlFormatters) {
    const getMessageFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["m"])((...args)=>new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$core$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IntlMessageFormat"](args[0], args[1], args[2], {
            formatters: intlFormatters,
            ...args[3]
        }), cache.message);
    return getMessageFormat;
}
function getPlainMessage(candidate, values) {
    // To improve runtime performance, only compile message if:
    return(// 1. Values are provided
    values || // 2. There are escaped braces (e.g. "'{name'}")
    /'[{}]/.test(candidate) || // 3. There are missing arguments or tags (dev-only error handling)
    /<|{/.test(candidate) ? undefined // Compile
     : candidate // Don't compile
    );
}
/**
 * Compiles and formats an ICU message at runtime using intl-messageformat.
 * This is the default implementation used when messages are not precompiled.
 */ function formatMessage(/** The raw ICU message string (or precompiled message, though this implementation ignores precompilation) */ ...[key, message, values, options]) {
    if (Array.isArray(message)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].INVALID_MESSAGE, `Message at \`${key}\` resolved to an array, but only strings are supported. See https://next-intl.dev/docs/usage/translations#arrays-of-messages`);
    }
    if (typeof message === 'object') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].INSUFFICIENT_PATH, `Message at \`${key}\` resolved to \`${typeof message}\`, but only strings are supported. Use a \`.\` to retrieve nested messages. See https://next-intl.dev/docs/usage/translations#structuring-messages`);
    }
    // Hot path that avoids creating an `IntlMessageFormat` instance
    if (typeof message === 'string') {
        const plainMessage = getPlainMessage(message, values);
        if (plainMessage) return plainMessage;
    }
    const { cache, formats, formatters, globalFormats, locale, timeZone } = options;
    // Lazy init the message formatter for better tree
    // shaking in case message formatting is not used.
    if (!formatters.getMessageFormat) {
        formatters.getMessageFormat = createMessageFormatter(cache, formatters);
    }
    let messageFormat;
    try {
        messageFormat = formatters.getMessageFormat(message, locale, convertFormatsToIntlMessageFormat(globalFormats, formats, timeZone), {
            formatters: {
                ...formatters,
                getDateTimeFormat (locales, dateTimeOptions) {
                    // Workaround for https://github.com/formatjs/formatjs/issues/4279
                    return formatters.getDateTimeFormat(locales, {
                        ...dateTimeOptions,
                        timeZone: dateTimeOptions?.timeZone ?? timeZone
                    });
                }
            }
        });
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].INVALID_MESSAGE, `${error.message} (${error.originalMessage})`);
    }
    const formattedMessage = messageFormat.format(// @ts-expect-error `intl-messageformat` expects a different format
    // for rich text elements since a recent minor update. This
    // needs to be evaluated in detail, possibly also in regard
    // to be able to format to parts.
    values);
    // Limit the function signature to return strings or React elements
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isValidElement"])(formattedMessage) || // Arrays of React elements
    Array.isArray(formattedMessage) || typeof formattedMessage === 'string' ? formattedMessage : String(formattedMessage);
}
// `t.raw` is supported
formatMessage.raw = true;
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/initializeConfig-DzxNJxi9.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>createBaseTranslator,
    "b",
    ()=>defaultOnError,
    "c",
    ()=>createFormatter,
    "d",
    ()=>defaultGetMessageFallback,
    "i",
    ()=>initializeConfig,
    "r",
    ()=>resolveNamespace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$format$2d$message$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/format-message/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript)");
;
;
;
function joinPath(...parts) {
    return parts.filter(Boolean).join('.');
}
/**
 * Contains defaults that are used for all entry points into the core.
 * See also `InitializedIntlConfiguration`.
 */ function defaultGetMessageFallback(props) {
    return joinPath(props.namespace, props.key);
}
function defaultOnError(error) {
    console.error(error);
}
function prepareTranslationValues(values) {
    // Related to https://github.com/formatjs/formatjs/issues/1467
    const transformedValues = {};
    Object.keys(values).forEach((key)=>{
        let index = 0;
        const value = values[key];
        let transformed;
        if (typeof value === 'function') {
            transformed = (chunks)=>{
                const result = value(chunks);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isValidElement"])(result) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cloneElement"])(result, {
                    key: key + index++
                }) : result;
            };
        } else {
            transformed = value;
        }
        transformedValues[key] = transformed;
    });
    return transformedValues;
}
function resolvePath(locale, messages, key, namespace) {
    const fullKey = joinPath(namespace, key);
    if (!messages) {
        throw new Error(`No messages available at \`${namespace}\`.`);
    }
    let message = messages;
    key.split('.').forEach((part)=>{
        const next = message[part];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (part == null || next == null) {
            throw new Error(`Could not resolve \`${fullKey}\` in messages for locale \`${locale}\`.`);
        }
        message = next;
    });
    return message;
}
function getMessagesOrError(locale, messages, namespace) {
    try {
        if (!messages) {
            throw new Error(`No messages were configured.`);
        }
        const retrievedMessages = namespace ? resolvePath(locale, messages, namespace) : messages;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!retrievedMessages) {
            throw new Error(`No messages for namespace \`${namespace}\` found.`);
        }
        return retrievedMessages;
    } catch (error) {
        const intlError = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].MISSING_MESSAGE, error.message);
        return intlError;
    }
}
function createBaseTranslator(config) {
    const messagesOrError = getMessagesOrError(config.locale, config.messages, config.namespace);
    return createBaseTranslatorImpl({
        ...config,
        messagesOrError
    });
}
function createBaseTranslatorImpl({ cache, formats: globalFormats, formatters, getMessageFallback = defaultGetMessageFallback, locale, messagesOrError, namespace, onError, timeZone }) {
    const hasMessagesError = messagesOrError instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"];
    function getFallbackFromErrorAndNotify(key, code, message, fallback) {
        const error = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](code, message);
        onError(error);
        return fallback ?? getMessageFallback({
            error,
            key,
            namespace
        });
    }
    function translateBaseFn(/** Use a dot to indicate a level of nesting (e.g. `namespace.nestedLabel`). */ key, /** Key value pairs for values to interpolate into the message. */ values, /** Provide custom formats for numbers, dates and times. */ formats, _fallback) {
        const fallback = _fallback;
        let message;
        if (hasMessagesError) {
            if (fallback) {
                message = fallback;
            } else {
                onError(messagesOrError);
                return getMessageFallback({
                    error: messagesOrError,
                    key,
                    namespace
                });
            }
        } else {
            const messages = messagesOrError;
            try {
                message = resolvePath(locale, messages, key, namespace);
            } catch (error) {
                if (fallback) {
                    message = fallback;
                } else {
                    return getFallbackFromErrorAndNotify(key, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].MISSING_MESSAGE, error.message, fallback);
                }
            }
        }
        try {
            const messagePath = joinPath(namespace, key);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$format$2d$message$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(messagePath, // @ts-expect-error -- We have additional validation either in `compile-format.tsx` or in case of `format-only.tsx` in the loader
            message, values ? prepareTranslationValues(values) : values, {
                cache,
                formatters,
                globalFormats,
                formats,
                locale,
                timeZone
            });
        } catch (error) {
            let errorCode, errorMessage;
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"]) {
                errorCode = error.code;
                errorMessage = error.originalMessage;
            } else {
                errorCode = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].FORMATTING_ERROR;
                errorMessage = error.message;
            }
            return getFallbackFromErrorAndNotify(key, errorCode, errorMessage, fallback);
        }
    }
    function translateFn(/** Use a dot to indicate a level of nesting (e.g. `namespace.nestedLabel`). */ key, /** Key value pairs for values to interpolate into the message. */ values, /** Custom formats for numbers, dates and times. */ formats, _fallback) {
        const result = translateBaseFn(key, values, formats, _fallback);
        if (typeof result !== 'string') {
            return getFallbackFromErrorAndNotify(key, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].INVALID_MESSAGE, `The message \`${key}\` in ${namespace ? `namespace \`${namespace}\`` : 'messages'} didn't resolve to a string. If you want to format rich text, use \`t.rich\` instead.`);
        }
        return result;
    }
    translateFn.rich = translateBaseFn;
    // Augment `translateBaseFn` to return plain strings
    translateFn.markup = (key, values, formats, _fallback)=>{
        const result = translateBaseFn(key, // @ts-expect-error -- `MarkupTranslationValues` is practically a sub type
        // of `RichTranslationValues` but TypeScript isn't smart enough here.
        values, formats, _fallback);
        if (typeof result !== 'string') {
            const error = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].FORMATTING_ERROR, "`t.markup` only accepts functions for formatting that receive and return strings.\n\nE.g. t.markup('markup', {b: (chunks) => `<b>${chunks}</b>`})");
            onError(error);
            return getMessageFallback({
                error,
                key,
                namespace
            });
        }
        return result;
    };
    translateFn.raw = (key)=>{
        {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$format$2d$message$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].raw) {
                throw new Error('`t.raw` is not supported when messages are precompiled.');
            }
        }
        if (hasMessagesError) {
            onError(messagesOrError);
            return getMessageFallback({
                error: messagesOrError,
                key,
                namespace
            });
        }
        const messages = messagesOrError;
        try {
            return resolvePath(locale, messages, key, namespace);
        } catch (error) {
            return getFallbackFromErrorAndNotify(key, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].MISSING_MESSAGE, error.message);
        }
    };
    translateFn.has = (key)=>{
        if (hasMessagesError) {
            return false;
        }
        try {
            resolvePath(locale, messagesOrError, key, namespace);
            return true;
        } catch  {
            return false;
        }
    };
    return translateFn;
}
/**
 * For the strictly typed messages to work we have to wrap the namespace into
 * a mandatory prefix. See https://stackoverflow.com/a/71529575/343045
 */ function resolveNamespace(namespace, namespacePrefix) {
    return namespace === namespacePrefix ? undefined : namespace.slice((namespacePrefix + '.').length);
}
const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * (365 / 12); // Approximation
const QUARTER = MONTH * 3;
const YEAR = DAY * 365;
const UNIT_SECONDS = {
    second: SECOND,
    seconds: SECOND,
    minute: MINUTE,
    minutes: MINUTE,
    hour: HOUR,
    hours: HOUR,
    day: DAY,
    days: DAY,
    week: WEEK,
    weeks: WEEK,
    month: MONTH,
    months: MONTH,
    quarter: QUARTER,
    quarters: QUARTER,
    year: YEAR,
    years: YEAR
};
function resolveRelativeTimeUnit(seconds) {
    const absValue = Math.abs(seconds);
    if (absValue < MINUTE) {
        return 'second';
    } else if (absValue < HOUR) {
        return 'minute';
    } else if (absValue < DAY) {
        return 'hour';
    } else if (absValue < WEEK) {
        return 'day';
    } else if (absValue < MONTH) {
        return 'week';
    } else if (absValue < YEAR) {
        return 'month';
    }
    return 'year';
}
function calculateRelativeTimeValue(seconds, unit) {
    // We have to round the resulting values, as `Intl.RelativeTimeFormat`
    // will include fractions like '2.1 hours ago'.
    return Math.round(seconds / UNIT_SECONDS[unit]);
}
function createFormatter(props) {
    const { _cache: cache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["b"])(), _formatters: formatters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["c"])(cache), formats, locale, onError = defaultOnError, timeZone: globalTimeZone } = props;
    function applyTimeZone(options) {
        if (!options?.timeZone) {
            if (globalTimeZone) {
                options = {
                    ...options,
                    timeZone: globalTimeZone
                };
            } else {
                onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].ENVIRONMENT_FALLBACK, `The \`timeZone\` parameter wasn't provided and there is no global default configured. Consider adding a global default to avoid markup mismatches caused by environment differences. Learn more: https://next-intl.dev/docs/configuration#time-zone`));
            }
        }
        return options;
    }
    function resolveFormatOrOptions(typeFormats, formatOrOptions, overrides) {
        let options;
        if (typeof formatOrOptions === 'string') {
            const formatName = formatOrOptions;
            options = typeFormats?.[formatName];
            if (!options) {
                const error = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].MISSING_FORMAT, `Format \`${formatName}\` is not available.`);
                onError(error);
                throw error;
            }
        } else {
            options = formatOrOptions;
        }
        if (overrides) {
            options = {
                ...options,
                ...overrides
            };
        }
        return options;
    }
    function getFormattedValue(formatOrOptions, overrides, typeFormats, formatter, getFallback) {
        let options;
        try {
            options = resolveFormatOrOptions(typeFormats, formatOrOptions, overrides);
        } catch  {
            return getFallback();
        }
        try {
            return formatter(options);
        } catch (error) {
            onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].FORMATTING_ERROR, error.message));
            return getFallback();
        }
    }
    function dateTime(value, formatOrOptions, overrides) {
        return getFormattedValue(formatOrOptions, overrides, formats?.dateTime, (options)=>{
            options = applyTimeZone(options);
            return formatters.getDateTimeFormat(locale, options).format(value);
        }, ()=>String(value));
    }
    function dateTimeRange(start, end, formatOrOptions, overrides) {
        return getFormattedValue(formatOrOptions, overrides, formats?.dateTime, (options)=>{
            options = applyTimeZone(options);
            return formatters.getDateTimeFormat(locale, options).formatRange(start, end);
        }, ()=>[
                dateTime(start),
                dateTime(end)
            ].join(' – '));
    }
    function number(value, formatOrOptions, overrides) {
        return getFormattedValue(formatOrOptions, overrides, formats?.number, (options)=>formatters.getNumberFormat(locale, options).format(value), ()=>String(value));
    }
    function getGlobalNow() {
        // Only read when necessary to avoid triggering a `dynamicIO` error
        // unnecessarily (`now` is only needed for `format.relativeTime`)
        if (props.now) {
            return props.now;
        } else {
            onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].ENVIRONMENT_FALLBACK, `The \`now\` parameter wasn't provided to \`relativeTime\` and there is no global default configured, therefore the current time will be used as a fallback. See https://next-intl.dev/docs/usage/dates-times#relative-times-usenow`));
            return new Date();
        }
    }
    function relativeTime(date, nowOrOptions) {
        try {
            let nowDate, unit;
            const opts = {};
            if (nowOrOptions instanceof Date || typeof nowOrOptions === 'number') {
                nowDate = new Date(nowOrOptions);
            } else if (nowOrOptions) {
                if (nowOrOptions.now != null) {
                    nowDate = new Date(nowOrOptions.now);
                } else {
                    nowDate = getGlobalNow();
                }
                unit = nowOrOptions.unit;
                opts.style = nowOrOptions.style;
                // @ts-expect-error -- Types are slightly outdated
                opts.numberingSystem = nowOrOptions.numberingSystem;
            }
            if (!nowDate) {
                nowDate = getGlobalNow();
            }
            const dateDate = new Date(date);
            const seconds = (dateDate.getTime() - nowDate.getTime()) / 1000;
            if (!unit) {
                unit = resolveRelativeTimeUnit(seconds);
            }
            // `numeric: 'auto'` can theoretically produce output like "yesterday",
            // but it only works with integers. E.g. -1 day will produce "yesterday",
            // but -1.1 days will produce "-1.1 days". Rounding before formatting is
            // not desired, as the given dates might cross a threshold were the
            // output isn't correct anymore. Example: 2024-01-08T23:00:00.000Z and
            // 2024-01-08T01:00:00.000Z would produce "yesterday", which is not the
            // case. By using `always` we can ensure correct output. The only exception
            // is the formatting of times <1 second as "now".
            opts.numeric = unit === 'second' ? 'auto' : 'always';
            const value = calculateRelativeTimeValue(seconds, unit);
            return formatters.getRelativeTimeFormat(locale, opts).format(value, unit);
        } catch (error) {
            onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].FORMATTING_ERROR, error.message));
            return String(date);
        }
    }
    function list(value, formatOrOptions, overrides) {
        const serializedValue = [];
        const richValues = new Map();
        // `formatToParts` only accepts strings, therefore we have to temporarily
        // replace React elements with a placeholder ID that can be used to retrieve
        // the original value afterwards.
        let index = 0;
        for (const item of value){
            let serializedItem;
            if (typeof item === 'object') {
                serializedItem = String(index);
                richValues.set(serializedItem, item);
            } else {
                serializedItem = String(item);
            }
            serializedValue.push(serializedItem);
            index++;
        }
        return getFormattedValue(formatOrOptions, overrides, formats?.list, // @ts-expect-error -- `richValues.size` is used to determine the return type, but TypeScript can't infer the meaning of this correctly
        (options)=>{
            const result = formatters.getListFormat(locale, options).formatToParts(serializedValue).map((part)=>part.type === 'literal' ? part.value : richValues.get(part.value) || part.value);
            if (richValues.size > 0) {
                return result;
            } else {
                return result.join('');
            }
        }, ()=>String(value));
    }
    return {
        dateTime,
        number,
        relativeTime,
        list,
        dateTimeRange
    };
}
function validateMessagesSegment(messages, invalidKeyLabels, parentPath) {
    Object.entries(messages).forEach(([key, messageOrMessages])=>{
        if (key.includes('.')) {
            let keyLabel = key;
            if (parentPath) keyLabel += ` (at ${parentPath})`;
            invalidKeyLabels.push(keyLabel);
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (messageOrMessages != null && typeof messageOrMessages === 'object') {
            validateMessagesSegment(messageOrMessages, invalidKeyLabels, joinPath(parentPath, key));
        }
    });
}
function validateMessages(messages, onError) {
    const invalidKeyLabels = [];
    validateMessagesSegment(messages, invalidKeyLabels);
    if (invalidKeyLabels.length > 0) {
        onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"].INVALID_KEY, `Namespace keys can not contain the character "." as this is used to express nesting. Please remove it or replace it with another character.

Invalid ${invalidKeyLabels.length === 1 ? 'key' : 'keys'}: ${invalidKeyLabels.join(', ')}

If you're migrating from a flat structure, you can convert your messages as follows:

import {set} from "lodash";

const input = {
  "one.one": "1.1",
  "one.two": "1.2",
  "two.one.one": "2.1.1"
};

const output = Object.entries(input).reduce(
  (acc, [key, value]) => set(acc, key, value),
  {}
);

// Output:
//
// {
//   "one": {
//     "one": "1.1",
//     "two": "1.2"
//   },
//   "two": {
//     "one": {
//       "one": "2.1.1"
//     }
//   }
// }
`));
    }
}
/**
 * Enhances the incoming props with defaults.
 */ function initializeConfig({ formats, getMessageFallback, messages, onError, ...rest }) {
    const finalOnError = onError || defaultOnError;
    const finalGetMessageFallback = getMessageFallback || defaultGetMessageFallback;
    {
        if (messages) {
            validateMessages(messages, finalOnError);
        }
    }
    return {
        ...rest,
        formats: formats || undefined,
        messages: messages || undefined,
        onError: finalOnError,
        getMessageFallback: finalGetMessageFallback
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/initializeConfig-DzxNJxi9.js [middleware-edge] (ecmascript) <export i as initializeConfig>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initializeConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["i"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/initializeConfig-DzxNJxi9.js [middleware-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript) <export c as _createIntlFormatters>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_createIntlFormatters",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["c"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript) <export b as _createCache>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_createCache",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["b"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/core.js [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTranslator",
    ()=>createTranslator,
    "hasLocale",
    ()=>hasLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/initializeConfig-DzxNJxi9.js [middleware-edge] (ecmascript)");
;
;
;
;
function createTranslatorImpl({ messages, namespace, ...rest }, namespacePrefix) {
    // The `namespacePrefix` is part of the type system.
    // See the comment in the function invocation.
    messages = messages[namespacePrefix];
    namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["r"])(namespace, namespacePrefix);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["a"])({
        ...rest,
        messages,
        namespace
    });
}
// This type is slightly more loose than `AbstractIntlMessages`
// in order to avoid a type error.
/**
 * @private Not intended for direct use.
 */ /**
 * Translates messages from the given namespace by using the ICU syntax.
 * See https://formatjs.io/docs/core-concepts/icu-syntax.
 *
 * If no namespace is provided, all available messages are returned.
 * The namespace can also indicate nesting by using a dot
 * (e.g. `namespace.Component`).
 */ function createTranslator({ _cache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["b"])(), _formatters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["c"])(_cache), getMessageFallback = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["d"], messages, namespace, onError = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["b"], ...rest }) {
    // We have to wrap the actual function so the type inference for the optional
    // namespace works correctly. See https://stackoverflow.com/a/71529575/343045
    // The prefix ("!") is arbitrary.
    // @ts-expect-error Use the explicit annotation instead
    return createTranslatorImpl({
        ...rest,
        onError,
        cache: _cache,
        formatters: _formatters,
        getMessageFallback,
        // @ts-expect-error `messages` is allowed to be `undefined` here and will be handled internally
        messages: {
            '!': messages
        },
        namespace: namespace ? `!.${namespace}` : '!'
    }, '!');
}
/**
 * Checks if a locale exists in a list of locales.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale
 */ function hasLocale(locales, candidate) {
    return locales.includes(candidate);
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@ioredis/commands/built/commands.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"acl\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"append\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"asking\":{\"arity\":1,\"flags\":[\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"auth\":{\"arity\":-2,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"no_auth\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"bgrewriteaof\":{\"arity\":1,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"bgsave\":{\"arity\":-1,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"bitcount\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"bitfield\":{\"arity\":-2,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"bitfield_ro\":{\"arity\":-2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"bitop\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":2,\"keyStop\":-1,\"step\":1},\"bitpos\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"blmove\":{\"arity\":6,\"flags\":[\"write\",\"denyoom\",\"noscript\",\"blocking\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"blmpop\":{\"arity\":-5,\"flags\":[\"write\",\"blocking\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"blpop\":{\"arity\":-3,\"flags\":[\"write\",\"noscript\",\"blocking\"],\"keyStart\":1,\"keyStop\":-2,\"step\":1},\"brpop\":{\"arity\":-3,\"flags\":[\"write\",\"noscript\",\"blocking\"],\"keyStart\":1,\"keyStop\":-2,\"step\":1},\"brpoplpush\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"noscript\",\"blocking\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"bzmpop\":{\"arity\":-5,\"flags\":[\"write\",\"blocking\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"bzpopmax\":{\"arity\":-3,\"flags\":[\"write\",\"noscript\",\"blocking\",\"fast\"],\"keyStart\":1,\"keyStop\":-2,\"step\":1},\"bzpopmin\":{\"arity\":-3,\"flags\":[\"write\",\"noscript\",\"blocking\",\"fast\"],\"keyStart\":1,\"keyStop\":-2,\"step\":1},\"client\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"cluster\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"command\":{\"arity\":-1,\"flags\":[\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"config\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"copy\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"dbsize\":{\"arity\":1,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"debug\":{\"arity\":-2,\"flags\":[\"admin\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"decr\":{\"arity\":2,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"decrby\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"del\":{\"arity\":-2,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"discard\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"dump\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"echo\":{\"arity\":2,\"flags\":[\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"eval\":{\"arity\":-3,\"flags\":[\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"eval_ro\":{\"arity\":-3,\"flags\":[\"readonly\",\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"evalsha\":{\"arity\":-3,\"flags\":[\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"evalsha_ro\":{\"arity\":-3,\"flags\":[\"readonly\",\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"exec\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"skip_slowlog\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"exists\":{\"arity\":-2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"expire\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"expireat\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"expiretime\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"failover\":{\"arity\":-1,\"flags\":[\"admin\",\"noscript\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"fcall\":{\"arity\":-3,\"flags\":[\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"fcall_ro\":{\"arity\":-3,\"flags\":[\"readonly\",\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"flushall\":{\"arity\":-1,\"flags\":[\"write\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"flushdb\":{\"arity\":-1,\"flags\":[\"write\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"function\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"geoadd\":{\"arity\":-5,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geodist\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geohash\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geopos\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"georadius\":{\"arity\":-6,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"georadius_ro\":{\"arity\":-6,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"georadiusbymember\":{\"arity\":-5,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"georadiusbymember_ro\":{\"arity\":-5,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geosearch\":{\"arity\":-7,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geosearchstore\":{\"arity\":-8,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"get\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getbit\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getdel\":{\"arity\":2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getex\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getrange\":{\"arity\":4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getset\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hdel\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hello\":{\"arity\":-1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"no_auth\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"hexists\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hexpire\":{\"arity\":-6,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hpexpire\":{\"arity\":-6,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hget\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hgetall\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hincrby\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hincrbyfloat\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hkeys\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hlen\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hmget\":{\"arity\":-3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hmset\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hrandfield\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hscan\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hset\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hsetnx\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hstrlen\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hvals\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"incr\":{\"arity\":2,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"incrby\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"incrbyfloat\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"info\":{\"arity\":-1,\"flags\":[\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"keys\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"lastsave\":{\"arity\":1,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"latency\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"lcs\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"lindex\":{\"arity\":3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"linsert\":{\"arity\":5,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"llen\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lmove\":{\"arity\":5,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"lmpop\":{\"arity\":-4,\"flags\":[\"write\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"lolwut\":{\"arity\":-1,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"lpop\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lpos\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lpush\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lpushx\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lrange\":{\"arity\":4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lrem\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lset\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"ltrim\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"memory\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"mget\":{\"arity\":-2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"migrate\":{\"arity\":-6,\"flags\":[\"write\",\"movablekeys\"],\"keyStart\":3,\"keyStop\":3,\"step\":1},\"module\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"monitor\":{\"arity\":1,\"flags\":[\"admin\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"move\":{\"arity\":3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"mset\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":2},\"msetnx\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":2},\"multi\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"object\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"persist\":{\"arity\":2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pexpire\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pexpireat\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pexpiretime\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pfadd\":{\"arity\":-2,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pfcount\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"pfdebug\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"admin\"],\"keyStart\":2,\"keyStop\":2,\"step\":1},\"pfmerge\":{\"arity\":-2,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"pfselftest\":{\"arity\":1,\"flags\":[\"admin\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"ping\":{\"arity\":-1,\"flags\":[\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"psetex\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"psubscribe\":{\"arity\":-2,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"psync\":{\"arity\":-3,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\",\"no_multi\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"pttl\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"publish\":{\"arity\":3,\"flags\":[\"pubsub\",\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"pubsub\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"punsubscribe\":{\"arity\":-1,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"quit\":{\"arity\":-1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"no_auth\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"randomkey\":{\"arity\":1,\"flags\":[\"readonly\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"readonly\":{\"arity\":1,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"readwrite\":{\"arity\":1,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"rename\":{\"arity\":3,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"renamenx\":{\"arity\":3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"replconf\":{\"arity\":-1,\"flags\":[\"admin\",\"noscript\",\"loading\",\"stale\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"replicaof\":{\"arity\":3,\"flags\":[\"admin\",\"noscript\",\"stale\",\"no_async_loading\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"reset\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"no_auth\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"restore\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"restore-asking\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"asking\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"role\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"rpop\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"rpoplpush\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"rpush\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"rpushx\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"sadd\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"save\":{\"arity\":1,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\",\"no_multi\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"scan\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"scard\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"script\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"sdiff\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sdiffstore\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"select\":{\"arity\":2,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"set\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"setbit\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"setex\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"setnx\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"setrange\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"shutdown\":{\"arity\":-1,\"flags\":[\"admin\",\"noscript\",\"loading\",\"stale\",\"no_multi\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"sinter\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sintercard\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"sinterstore\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sismember\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"slaveof\":{\"arity\":3,\"flags\":[\"admin\",\"noscript\",\"stale\",\"no_async_loading\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"slowlog\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"smembers\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"smismember\":{\"arity\":-3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"smove\":{\"arity\":4,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"sort\":{\"arity\":-2,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"sort_ro\":{\"arity\":-2,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"spop\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"spublish\":{\"arity\":3,\"flags\":[\"pubsub\",\"loading\",\"stale\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"srandmember\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"srem\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"sscan\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"ssubscribe\":{\"arity\":-2,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"strlen\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"subscribe\":{\"arity\":-2,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"substr\":{\"arity\":4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"sunion\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sunionstore\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sunsubscribe\":{\"arity\":-1,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"swapdb\":{\"arity\":3,\"flags\":[\"write\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"sync\":{\"arity\":1,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\",\"no_multi\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"time\":{\"arity\":1,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"touch\":{\"arity\":-2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"ttl\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"type\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"unlink\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"unsubscribe\":{\"arity\":-1,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"unwatch\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"wait\":{\"arity\":3,\"flags\":[\"noscript\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"watch\":{\"arity\":-2,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"allow_busy\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"xack\":{\"arity\":-4,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xadd\":{\"arity\":-5,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xautoclaim\":{\"arity\":-6,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xclaim\":{\"arity\":-6,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xdel\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xdelex\":{\"arity\":-5,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xgroup\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"xinfo\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"xlen\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xpending\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xrange\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xread\":{\"arity\":-4,\"flags\":[\"readonly\",\"blocking\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"xreadgroup\":{\"arity\":-7,\"flags\":[\"write\",\"blocking\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"xrevrange\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xsetid\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xtrim\":{\"arity\":-4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zadd\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zcard\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zcount\":{\"arity\":4,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zdiff\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zdiffstore\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zincrby\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zinter\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zintercard\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zinterstore\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zlexcount\":{\"arity\":4,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zmpop\":{\"arity\":-4,\"flags\":[\"write\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zmscore\":{\"arity\":-3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zpopmax\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zpopmin\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrandmember\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrange\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrangebylex\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrangebyscore\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrangestore\":{\"arity\":-5,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"zrank\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrem\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zremrangebylex\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zremrangebyrank\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zremrangebyscore\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrevrange\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrevrangebylex\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrevrangebyscore\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrevrank\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zscan\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zscore\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zunion\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zunionstore\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1}}"));}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@ioredis/commands/built/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getKeyIndexes = exports.hasFlag = exports.exists = exports.list = void 0;
const commands_json_1 = __importDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@ioredis/commands/built/commands.json (json)"));
/**
 * Redis command list
 *
 * All commands are lowercased.
 */ exports.list = Object.keys(commands_json_1.default);
const flags = {};
exports.list.forEach((commandName)=>{
    flags[commandName] = commands_json_1.default[commandName].flags.reduce(function(flags, flag) {
        flags[flag] = true;
        return flags;
    }, {});
});
/**
 * Check if the command exists
 */ function exists(commandName, options) {
    commandName = (options === null || options === void 0 ? void 0 : options.caseInsensitive) ? String(commandName).toLowerCase() : commandName;
    return Boolean(commands_json_1.default[commandName]);
}
exports.exists = exists;
/**
 * Check if the command has the flag
 *
 * Some of possible flags: readonly, noscript, loading
 */ function hasFlag(commandName, flag, options) {
    commandName = (options === null || options === void 0 ? void 0 : options.nameCaseInsensitive) ? String(commandName).toLowerCase() : commandName;
    if (!flags[commandName]) {
        throw new Error("Unknown command " + commandName);
    }
    return Boolean(flags[commandName][flag]);
}
exports.hasFlag = hasFlag;
/**
 * Get indexes of keys in the command arguments
 *
 * @example
 * ```javascript
 * getKeyIndexes('set', ['key', 'value']) // [0]
 * getKeyIndexes('mget', ['key1', 'key2']) // [0, 1]
 * ```
 */ function getKeyIndexes(commandName, args, options) {
    commandName = (options === null || options === void 0 ? void 0 : options.nameCaseInsensitive) ? String(commandName).toLowerCase() : commandName;
    const command = commands_json_1.default[commandName];
    if (!command) {
        throw new Error("Unknown command " + commandName);
    }
    if (!Array.isArray(args)) {
        throw new Error("Expect args to be an array");
    }
    const keys = [];
    const parseExternalKey = Boolean(options && options.parseExternalKey);
    const takeDynamicKeys = (args, startIndex)=>{
        const keys = [];
        const keyStop = Number(args[startIndex]);
        for(let i = 0; i < keyStop; i++){
            keys.push(i + startIndex + 1);
        }
        return keys;
    };
    const takeKeyAfterToken = (args, startIndex, token)=>{
        for(let i = startIndex; i < args.length - 1; i += 1){
            if (String(args[i]).toLowerCase() === token.toLowerCase()) {
                return i + 1;
            }
        }
        return null;
    };
    switch(commandName){
        case "zunionstore":
        case "zinterstore":
        case "zdiffstore":
            keys.push(0, ...takeDynamicKeys(args, 1));
            break;
        case "eval":
        case "evalsha":
        case "eval_ro":
        case "evalsha_ro":
        case "fcall":
        case "fcall_ro":
        case "blmpop":
        case "bzmpop":
            keys.push(...takeDynamicKeys(args, 1));
            break;
        case "sintercard":
        case "lmpop":
        case "zunion":
        case "zinter":
        case "zmpop":
        case "zintercard":
        case "zdiff":
            {
                keys.push(...takeDynamicKeys(args, 0));
                break;
            }
        case "georadius":
            {
                keys.push(0);
                const storeKey = takeKeyAfterToken(args, 5, "STORE");
                if (storeKey) keys.push(storeKey);
                const distKey = takeKeyAfterToken(args, 5, "STOREDIST");
                if (distKey) keys.push(distKey);
                break;
            }
        case "georadiusbymember":
            {
                keys.push(0);
                const storeKey = takeKeyAfterToken(args, 4, "STORE");
                if (storeKey) keys.push(storeKey);
                const distKey = takeKeyAfterToken(args, 4, "STOREDIST");
                if (distKey) keys.push(distKey);
                break;
            }
        case "sort":
        case "sort_ro":
            keys.push(0);
            for(let i = 1; i < args.length - 1; i++){
                let arg = args[i];
                if (typeof arg !== "string") {
                    continue;
                }
                const directive = arg.toUpperCase();
                if (directive === "GET") {
                    i += 1;
                    arg = args[i];
                    if (arg !== "#") {
                        if (parseExternalKey) {
                            keys.push([
                                i,
                                getExternalKeyNameLength(arg)
                            ]);
                        } else {
                            keys.push(i);
                        }
                    }
                } else if (directive === "BY") {
                    i += 1;
                    if (parseExternalKey) {
                        keys.push([
                            i,
                            getExternalKeyNameLength(args[i])
                        ]);
                    } else {
                        keys.push(i);
                    }
                } else if (directive === "STORE") {
                    i += 1;
                    keys.push(i);
                }
            }
            break;
        case "migrate":
            if (args[2] === "") {
                for(let i = 5; i < args.length - 1; i++){
                    const arg = args[i];
                    if (typeof arg === "string" && arg.toUpperCase() === "KEYS") {
                        for(let j = i + 1; j < args.length; j++){
                            keys.push(j);
                        }
                        break;
                    }
                }
            } else {
                keys.push(2);
            }
            break;
        case "xreadgroup":
        case "xread":
            // Keys are 1st half of the args after STREAMS argument.
            for(let i = commandName === "xread" ? 0 : 3; i < args.length - 1; i++){
                if (String(args[i]).toUpperCase() === "STREAMS") {
                    for(let j = i + 1; j <= i + (args.length - 1 - i) / 2; j++){
                        keys.push(j);
                    }
                    break;
                }
            }
            break;
        default:
            // Step has to be at least one in this case, otherwise the command does
            // not contain a key.
            if (command.step > 0) {
                const keyStart = command.keyStart - 1;
                const keyStop = command.keyStop > 0 ? command.keyStop : args.length + command.keyStop + 1;
                for(let i = keyStart; i < keyStop; i += command.step){
                    keys.push(i);
                }
            }
            break;
    }
    return keys;
}
exports.getKeyIndexes = getKeyIndexes;
function getExternalKeyNameLength(key) {
    if (typeof key !== "string") {
        key = String(key);
    }
    const hashPos = key.indexOf("->");
    return hashPos === -1 ? key.length : hashPos;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/standard-as-callback/built/utils.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tryCatch = exports.errorObj = void 0;
//Try catch is not supported in optimizing
//compiler, so it is isolated
exports.errorObj = {
    e: {}
};
let tryCatchTarget;
function tryCatcher(err, val) {
    try {
        const target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        exports.errorObj.e = e;
        return exports.errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/standard-as-callback/built/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const utils_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/standard-as-callback/built/utils.js [middleware-edge] (ecmascript)");
function throwLater(e) {
    setTimeout(function() {
        throw e;
    }, 0);
}
function asCallback(promise, nodeback, options) {
    if (typeof nodeback === "function") {
        promise.then((val)=>{
            let ret;
            if (options !== undefined && Object(options).spread && Array.isArray(val)) {
                ret = utils_1.tryCatch(nodeback).apply(undefined, [
                    null
                ].concat(val));
            } else {
                ret = val === undefined ? utils_1.tryCatch(nodeback)(null) : utils_1.tryCatch(nodeback)(null, val);
            }
            if (ret === utils_1.errorObj) {
                throwLater(ret.e);
            }
        }, (cause)=>{
            if (!cause) {
                const newReason = new Error(cause + "");
                Object.assign(newReason, {
                    cause
                });
                cause = newReason;
            }
            const ret = utils_1.tryCatch(nodeback)(cause);
            if (ret === utils_1.errorObj) {
                throwLater(ret.e);
            }
        });
    }
    return promise;
}
exports.default = asCallback;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/lib/modern.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const assert = __turbopack_context__.r("[externals]/node:assert [external] (node:assert, cjs)");
class RedisError extends Error {
    get name() {
        return this.constructor.name;
    }
}
class ParserError extends RedisError {
    constructor(message, buffer, offset){
        assert(buffer);
        assert.strictEqual(typeof offset, 'number');
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
        this.offset = offset;
        this.buffer = buffer;
    }
    get name() {
        return this.constructor.name;
    }
}
class ReplyError extends RedisError {
    constructor(message){
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
    }
    get name() {
        return this.constructor.name;
    }
}
class AbortError extends RedisError {
    get name() {
        return this.constructor.name;
    }
}
class InterruptError extends AbortError {
    get name() {
        return this.constructor.name;
    }
}
module.exports = {
    RedisError,
    ParserError,
    ReplyError,
    AbortError,
    InterruptError
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/lib/old.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const assert = __turbopack_context__.r("[externals]/node:assert [external] (node:assert, cjs)");
const util = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
// RedisError
function RedisError(message) {
    Object.defineProperty(this, 'message', {
        value: message || '',
        configurable: true,
        writable: true
    });
    Error.captureStackTrace(this, this.constructor);
}
util.inherits(RedisError, Error);
Object.defineProperty(RedisError.prototype, 'name', {
    value: 'RedisError',
    configurable: true,
    writable: true
});
// ParserError
function ParserError(message, buffer, offset) {
    assert(buffer);
    assert.strictEqual(typeof offset, 'number');
    Object.defineProperty(this, 'message', {
        value: message || '',
        configurable: true,
        writable: true
    });
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    Error.captureStackTrace(this, this.constructor);
    Error.stackTraceLimit = tmp;
    this.offset = offset;
    this.buffer = buffer;
}
util.inherits(ParserError, RedisError);
Object.defineProperty(ParserError.prototype, 'name', {
    value: 'ParserError',
    configurable: true,
    writable: true
});
// ReplyError
function ReplyError(message) {
    Object.defineProperty(this, 'message', {
        value: message || '',
        configurable: true,
        writable: true
    });
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    Error.captureStackTrace(this, this.constructor);
    Error.stackTraceLimit = tmp;
}
util.inherits(ReplyError, RedisError);
Object.defineProperty(ReplyError.prototype, 'name', {
    value: 'ReplyError',
    configurable: true,
    writable: true
});
// AbortError
function AbortError(message) {
    Object.defineProperty(this, 'message', {
        value: message || '',
        configurable: true,
        writable: true
    });
    Error.captureStackTrace(this, this.constructor);
}
util.inherits(AbortError, RedisError);
Object.defineProperty(AbortError.prototype, 'name', {
    value: 'AbortError',
    configurable: true,
    writable: true
});
// InterruptError
function InterruptError(message) {
    Object.defineProperty(this, 'message', {
        value: message || '',
        configurable: true,
        writable: true
    });
    Error.captureStackTrace(this, this.constructor);
}
util.inherits(InterruptError, AbortError);
Object.defineProperty(InterruptError.prototype, 'name', {
    value: 'InterruptError',
    configurable: true,
    writable: true
});
module.exports = {
    RedisError,
    ParserError,
    ReplyError,
    AbortError,
    InterruptError
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Errors = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46 ? __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/lib/old.js [middleware-edge] (ecmascript)") : __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/lib/modern.js [middleware-edge] (ecmascript)");
module.exports = Errors;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/cluster-key-slot/lib/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
 * Copyright 2001-2010 Georges Menie (www.menie.org)
 * Copyright 2010 Salvatore Sanfilippo (adapted to Redis coding style)
 * Copyright 2015 Zihua Li (http://zihua.li) (ported to JavaScript)
 * Copyright 2016 Mike Diarmid (http://github.com/salakar) (re-write for performance, ~700% perf inc)
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the University of California, Berkeley nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */ /* CRC16 implementation according to CCITT standards.
 *
 * Note by @antirez: this is actually the XMODEM CRC 16 algorithm, using the
 * following parameters:
 *
 * Name                       : "XMODEM", also known as "ZMODEM", "CRC-16/ACORN"
 * Width                      : 16 bit
 * Poly                       : 1021 (That is actually x^16 + x^12 + x^5 + 1)
 * Initialization             : 0000
 * Reflect Input byte         : False
 * Reflect Output CRC         : False
 * Xor constant to output CRC : 0000
 * Output for "123456789"     : 31C3
 */ var lookup = [
    0x0000,
    0x1021,
    0x2042,
    0x3063,
    0x4084,
    0x50a5,
    0x60c6,
    0x70e7,
    0x8108,
    0x9129,
    0xa14a,
    0xb16b,
    0xc18c,
    0xd1ad,
    0xe1ce,
    0xf1ef,
    0x1231,
    0x0210,
    0x3273,
    0x2252,
    0x52b5,
    0x4294,
    0x72f7,
    0x62d6,
    0x9339,
    0x8318,
    0xb37b,
    0xa35a,
    0xd3bd,
    0xc39c,
    0xf3ff,
    0xe3de,
    0x2462,
    0x3443,
    0x0420,
    0x1401,
    0x64e6,
    0x74c7,
    0x44a4,
    0x5485,
    0xa56a,
    0xb54b,
    0x8528,
    0x9509,
    0xe5ee,
    0xf5cf,
    0xc5ac,
    0xd58d,
    0x3653,
    0x2672,
    0x1611,
    0x0630,
    0x76d7,
    0x66f6,
    0x5695,
    0x46b4,
    0xb75b,
    0xa77a,
    0x9719,
    0x8738,
    0xf7df,
    0xe7fe,
    0xd79d,
    0xc7bc,
    0x48c4,
    0x58e5,
    0x6886,
    0x78a7,
    0x0840,
    0x1861,
    0x2802,
    0x3823,
    0xc9cc,
    0xd9ed,
    0xe98e,
    0xf9af,
    0x8948,
    0x9969,
    0xa90a,
    0xb92b,
    0x5af5,
    0x4ad4,
    0x7ab7,
    0x6a96,
    0x1a71,
    0x0a50,
    0x3a33,
    0x2a12,
    0xdbfd,
    0xcbdc,
    0xfbbf,
    0xeb9e,
    0x9b79,
    0x8b58,
    0xbb3b,
    0xab1a,
    0x6ca6,
    0x7c87,
    0x4ce4,
    0x5cc5,
    0x2c22,
    0x3c03,
    0x0c60,
    0x1c41,
    0xedae,
    0xfd8f,
    0xcdec,
    0xddcd,
    0xad2a,
    0xbd0b,
    0x8d68,
    0x9d49,
    0x7e97,
    0x6eb6,
    0x5ed5,
    0x4ef4,
    0x3e13,
    0x2e32,
    0x1e51,
    0x0e70,
    0xff9f,
    0xefbe,
    0xdfdd,
    0xcffc,
    0xbf1b,
    0xaf3a,
    0x9f59,
    0x8f78,
    0x9188,
    0x81a9,
    0xb1ca,
    0xa1eb,
    0xd10c,
    0xc12d,
    0xf14e,
    0xe16f,
    0x1080,
    0x00a1,
    0x30c2,
    0x20e3,
    0x5004,
    0x4025,
    0x7046,
    0x6067,
    0x83b9,
    0x9398,
    0xa3fb,
    0xb3da,
    0xc33d,
    0xd31c,
    0xe37f,
    0xf35e,
    0x02b1,
    0x1290,
    0x22f3,
    0x32d2,
    0x4235,
    0x5214,
    0x6277,
    0x7256,
    0xb5ea,
    0xa5cb,
    0x95a8,
    0x8589,
    0xf56e,
    0xe54f,
    0xd52c,
    0xc50d,
    0x34e2,
    0x24c3,
    0x14a0,
    0x0481,
    0x7466,
    0x6447,
    0x5424,
    0x4405,
    0xa7db,
    0xb7fa,
    0x8799,
    0x97b8,
    0xe75f,
    0xf77e,
    0xc71d,
    0xd73c,
    0x26d3,
    0x36f2,
    0x0691,
    0x16b0,
    0x6657,
    0x7676,
    0x4615,
    0x5634,
    0xd94c,
    0xc96d,
    0xf90e,
    0xe92f,
    0x99c8,
    0x89e9,
    0xb98a,
    0xa9ab,
    0x5844,
    0x4865,
    0x7806,
    0x6827,
    0x18c0,
    0x08e1,
    0x3882,
    0x28a3,
    0xcb7d,
    0xdb5c,
    0xeb3f,
    0xfb1e,
    0x8bf9,
    0x9bd8,
    0xabbb,
    0xbb9a,
    0x4a75,
    0x5a54,
    0x6a37,
    0x7a16,
    0x0af1,
    0x1ad0,
    0x2ab3,
    0x3a92,
    0xfd2e,
    0xed0f,
    0xdd6c,
    0xcd4d,
    0xbdaa,
    0xad8b,
    0x9de8,
    0x8dc9,
    0x7c26,
    0x6c07,
    0x5c64,
    0x4c45,
    0x3ca2,
    0x2c83,
    0x1ce0,
    0x0cc1,
    0xef1f,
    0xff3e,
    0xcf5d,
    0xdf7c,
    0xaf9b,
    0xbfba,
    0x8fd9,
    0x9ff8,
    0x6e17,
    0x7e36,
    0x4e55,
    0x5e74,
    0x2e93,
    0x3eb2,
    0x0ed1,
    0x1ef0
];
/**
 * Convert a string to a UTF8 array - faster than via buffer
 * @param str
 * @returns {Array}
 */ var toUTF8Array = function toUTF8Array(str) {
    var char;
    var i = 0;
    var p = 0;
    var utf8 = [];
    var len = str.length;
    for(; i < len; i++){
        char = str.charCodeAt(i);
        if (char < 128) {
            utf8[p++] = char;
        } else if (char < 2048) {
            utf8[p++] = char >> 6 | 192;
            utf8[p++] = char & 63 | 128;
        } else if ((char & 0xFC00) === 0xD800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            char = 0x10000 + ((char & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
            utf8[p++] = char >> 18 | 240;
            utf8[p++] = char >> 12 & 63 | 128;
            utf8[p++] = char >> 6 & 63 | 128;
            utf8[p++] = char & 63 | 128;
        } else {
            utf8[p++] = char >> 12 | 224;
            utf8[p++] = char >> 6 & 63 | 128;
            utf8[p++] = char & 63 | 128;
        }
    }
    return utf8;
};
/**
 * Convert a string into a redis slot hash.
 * @param str
 * @returns {number}
 */ var generate = module.exports = function generate(str) {
    var char;
    var i = 0;
    var start = -1;
    var result = 0;
    var resultHash = 0;
    var utf8 = typeof str === 'string' ? toUTF8Array(str) : str;
    var len = utf8.length;
    while(i < len){
        char = utf8[i++];
        if (start === -1) {
            if (char === 0x7B) {
                start = i;
            }
        } else if (char !== 0x7D) {
            resultHash = lookup[(char ^ resultHash >> 8) & 0xFF] ^ resultHash << 8;
        } else if (i - 1 !== start) {
            return resultHash & 0x3FFF;
        }
        result = lookup[(char ^ result >> 8) & 0xFF] ^ result << 8;
    }
    return result & 0x3FFF;
};
/**
 * Convert an array of multiple strings into a redis slot hash.
 * Returns -1 if one of the keys is not for the same slot as the others
 * @param keys
 * @returns {number}
 */ module.exports.generateMulti = function generateMulti(keys) {
    var i = 1;
    var len = keys.length;
    var base = generate(keys[0]);
    while(i < len){
        if (generate(keys[i++]) !== base) return -1;
    }
    return base;
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lodash.defaults/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */ var argsTag = '[object Arguments]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]';
/** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */ function apply(func, thisArg, args) {
    switch(args.length){
        case 0:
            return func.call(thisArg);
        case 1:
            return func.call(thisArg, args[0]);
        case 2:
            return func.call(thisArg, args[0], args[1]);
        case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while(++index < n){
        result[index] = iteratee(index);
    }
    return result;
}
/** Used for built-in method references. */ var objectProto = Object.prototype;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Built-in value references. */ var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeMax = Math.max;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for(var key in value){
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
            result.push(key);
        }
    }
    return result;
}
/**
 * Used by `_.defaults` to customize its `_.assignIn` use.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */ function assignInDefaults(objValue, srcValue, key, object) {
    if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
        return srcValue;
    }
    return objValue;
}
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */ function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
        object[key] = value;
    }
}
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeysIn(object) {
    if (!isObject(object)) {
        return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for(var key in object){
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
        }
    }
    return result;
}
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */ function baseRest(func, start) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while(++index < length){
            array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while(++index < start){
            otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
    };
}
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */ function copyObject(source, props, object, customizer) {
    object || (object = {});
    var index = -1, length = props.length;
    while(++index < length){
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
        assignValue(object, key, newValue === undefined ? source[key] : newValue);
    }
    return object;
}
/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */ function createAssigner(assigner) {
    return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
        customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined : customizer;
            length = 1;
        }
        object = Object(object);
        while(++index < length){
            var source = sources[index];
            if (source) {
                assigner(object, source, index, customizer);
            }
        }
        return object;
    });
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */ function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
        return false;
    }
    var type = typeof index;
    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
        return eq(object[index], value);
    }
    return false;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
    return value === proto;
}
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
        for(var key in Object(object)){
            result.push(key);
        }
    }
    return result;
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function eq(value, other) {
    return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */ var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
    copyObject(source, keysIn(source), object, customizer);
});
/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */ var defaults = baseRest(function(args) {
    args.push(undefined, assignInDefaults);
    return apply(assignInWith, undefined, args);
});
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */ function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
module.exports = defaults;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lodash.isarguments/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */ var argsTag = '[object Arguments]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]';
/** Used for built-in method references. */ var objectProto = Object.prototype;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Built-in value references. */ var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
module.exports = isArguments;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ms/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
        return parse(val);
    } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch(type){
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/debug/src/common.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ms/index.js [middleware-edge] (ecmascript)");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                    return '%';
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === 'function') {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === 'string' ? namespaces : '').trim().replace(/\s+/g, ',').split(',').filter(Boolean);
        for (const ns of split){
            if (ns[0] === '-') {
                createDebug.skips.push(ns.slice(1));
            } else {
                createDebug.names.push(ns);
            }
        }
    }
    /**
	 * Checks if the given string matches a namespace template, honoring
	 * asterisks as wildcards.
	 *
	 * @param {String} search
	 * @param {String} template
	 * @return {Boolean}
	 */ function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while(searchIndex < search.length){
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
                // Match character or proceed with wildcard
                if (template[templateIndex] === '*') {
                    starIndex = templateIndex;
                    matchIndex = searchIndex;
                    templateIndex++; // Skip the '*'
                } else {
                    searchIndex++;
                    templateIndex++;
                }
            } else if (starIndex !== -1) {
                // Backtrack to the last '*' and try to match more characters
                templateIndex = starIndex + 1;
                matchIndex++;
                searchIndex = matchIndex;
            } else {
                return false; // No match
            }
        }
        // Handle trailing '*' in template
        while(templateIndex < template.length && template[templateIndex] === '*'){
            templateIndex++;
        }
        return templateIndex === template.length;
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace)=>'-' + namespace)
        ].join(',');
        createDebug.enable('');
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        for (const skip of createDebug.skips){
            if (matchesTemplate(name, skip)) {
                return false;
            }
        }
        for (const ns of createDebug.names){
            if (matchesTemplate(name, ns)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/debug/src/browser.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    let m;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    // eslint-disable-next-line no-return-assign
    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || ("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === '%%') {
            return;
        }
        index++;
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem('debug', namespaces);
        } else {
            exports.storage.removeItem('debug');
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG');
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/debug/src/common.js [middleware-edge] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
    }
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/denque/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Custom implementation of a double ended queue.
 */ function Denque(array, options) {
    var options = options || {};
    this._capacity = options.capacity;
    this._head = 0;
    this._tail = 0;
    if (Array.isArray(array)) {
        this._fromArray(array);
    } else {
        this._capacityMask = 0x3;
        this._list = new Array(4);
    }
}
/**
 * --------------
 *  PUBLIC API
 * -------------
 */ /**
 * Returns the item at the specified index from the list.
 * 0 is the first element, 1 is the second, and so on...
 * Elements at negative values are that many from the end: -1 is one before the end
 * (the last element), -2 is two before the end (one before last), etc.
 * @param index
 * @returns {*}
 */ Denque.prototype.peekAt = function peekAt(index) {
    var i = index;
    // expect a number or return undefined
    if (i !== (i | 0)) {
        return void 0;
    }
    var len = this.size();
    if (i >= len || i < -len) return undefined;
    if (i < 0) i += len;
    i = this._head + i & this._capacityMask;
    return this._list[i];
};
/**
 * Alias for peekAt()
 * @param i
 * @returns {*}
 */ Denque.prototype.get = function get(i) {
    return this.peekAt(i);
};
/**
 * Returns the first item in the list without removing it.
 * @returns {*}
 */ Denque.prototype.peek = function peek() {
    if (this._head === this._tail) return undefined;
    return this._list[this._head];
};
/**
 * Alias for peek()
 * @returns {*}
 */ Denque.prototype.peekFront = function peekFront() {
    return this.peek();
};
/**
 * Returns the item that is at the back of the queue without removing it.
 * Uses peekAt(-1)
 */ Denque.prototype.peekBack = function peekBack() {
    return this.peekAt(-1);
};
/**
 * Returns the current length of the queue
 * @return {Number}
 */ Object.defineProperty(Denque.prototype, 'length', {
    get: function length() {
        return this.size();
    }
});
/**
 * Return the number of items on the list, or 0 if empty.
 * @returns {number}
 */ Denque.prototype.size = function size() {
    if (this._head === this._tail) return 0;
    if (this._head < this._tail) return this._tail - this._head;
    else return this._capacityMask + 1 - (this._head - this._tail);
};
/**
 * Add an item at the beginning of the list.
 * @param item
 */ Denque.prototype.unshift = function unshift(item) {
    if (arguments.length === 0) return this.size();
    var len = this._list.length;
    this._head = this._head - 1 + len & this._capacityMask;
    this._list[this._head] = item;
    if (this._tail === this._head) this._growArray();
    if (this._capacity && this.size() > this._capacity) this.pop();
    if (this._head < this._tail) return this._tail - this._head;
    else return this._capacityMask + 1 - (this._head - this._tail);
};
/**
 * Remove and return the first item on the list,
 * Returns undefined if the list is empty.
 * @returns {*}
 */ Denque.prototype.shift = function shift() {
    var head = this._head;
    if (head === this._tail) return undefined;
    var item = this._list[head];
    this._list[head] = undefined;
    this._head = head + 1 & this._capacityMask;
    if (head < 2 && this._tail > 10000 && this._tail <= this._list.length >>> 2) this._shrinkArray();
    return item;
};
/**
 * Add an item to the bottom of the list.
 * @param item
 */ Denque.prototype.push = function push(item) {
    if (arguments.length === 0) return this.size();
    var tail = this._tail;
    this._list[tail] = item;
    this._tail = tail + 1 & this._capacityMask;
    if (this._tail === this._head) {
        this._growArray();
    }
    if (this._capacity && this.size() > this._capacity) {
        this.shift();
    }
    if (this._head < this._tail) return this._tail - this._head;
    else return this._capacityMask + 1 - (this._head - this._tail);
};
/**
 * Remove and return the last item on the list.
 * Returns undefined if the list is empty.
 * @returns {*}
 */ Denque.prototype.pop = function pop() {
    var tail = this._tail;
    if (tail === this._head) return undefined;
    var len = this._list.length;
    this._tail = tail - 1 + len & this._capacityMask;
    var item = this._list[this._tail];
    this._list[this._tail] = undefined;
    if (this._head < 2 && tail > 10000 && tail <= len >>> 2) this._shrinkArray();
    return item;
};
/**
 * Remove and return the item at the specified index from the list.
 * Returns undefined if the list is empty.
 * @param index
 * @returns {*}
 */ Denque.prototype.removeOne = function removeOne(index) {
    var i = index;
    // expect a number or return undefined
    if (i !== (i | 0)) {
        return void 0;
    }
    if (this._head === this._tail) return void 0;
    var size = this.size();
    var len = this._list.length;
    if (i >= size || i < -size) return void 0;
    if (i < 0) i += size;
    i = this._head + i & this._capacityMask;
    var item = this._list[i];
    var k;
    if (index < size / 2) {
        for(k = index; k > 0; k--){
            this._list[i] = this._list[i = i - 1 + len & this._capacityMask];
        }
        this._list[i] = void 0;
        this._head = this._head + 1 + len & this._capacityMask;
    } else {
        for(k = size - 1 - index; k > 0; k--){
            this._list[i] = this._list[i = i + 1 + len & this._capacityMask];
        }
        this._list[i] = void 0;
        this._tail = this._tail - 1 + len & this._capacityMask;
    }
    return item;
};
/**
 * Remove number of items from the specified index from the list.
 * Returns array of removed items.
 * Returns undefined if the list is empty.
 * @param index
 * @param count
 * @returns {array}
 */ Denque.prototype.remove = function remove(index, count) {
    var i = index;
    var removed;
    var del_count = count;
    // expect a number or return undefined
    if (i !== (i | 0)) {
        return void 0;
    }
    if (this._head === this._tail) return void 0;
    var size = this.size();
    var len = this._list.length;
    if (i >= size || i < -size || count < 1) return void 0;
    if (i < 0) i += size;
    if (count === 1 || !count) {
        removed = new Array(1);
        removed[0] = this.removeOne(i);
        return removed;
    }
    if (i === 0 && i + count >= size) {
        removed = this.toArray();
        this.clear();
        return removed;
    }
    if (i + count > size) count = size - i;
    var k;
    removed = new Array(count);
    for(k = 0; k < count; k++){
        removed[k] = this._list[this._head + i + k & this._capacityMask];
    }
    i = this._head + i & this._capacityMask;
    if (index + count === size) {
        this._tail = this._tail - count + len & this._capacityMask;
        for(k = count; k > 0; k--){
            this._list[i = i + 1 + len & this._capacityMask] = void 0;
        }
        return removed;
    }
    if (index === 0) {
        this._head = this._head + count + len & this._capacityMask;
        for(k = count - 1; k > 0; k--){
            this._list[i = i + 1 + len & this._capacityMask] = void 0;
        }
        return removed;
    }
    if (i < size / 2) {
        this._head = this._head + index + count + len & this._capacityMask;
        for(k = index; k > 0; k--){
            this.unshift(this._list[i = i - 1 + len & this._capacityMask]);
        }
        i = this._head - 1 + len & this._capacityMask;
        while(del_count > 0){
            this._list[i = i - 1 + len & this._capacityMask] = void 0;
            del_count--;
        }
        if (index < 0) this._tail = i;
    } else {
        this._tail = i;
        i = i + count + len & this._capacityMask;
        for(k = size - (count + index); k > 0; k--){
            this.push(this._list[i++]);
        }
        i = this._tail;
        while(del_count > 0){
            this._list[i = i + 1 + len & this._capacityMask] = void 0;
            del_count--;
        }
    }
    if (this._head < 2 && this._tail > 10000 && this._tail <= len >>> 2) this._shrinkArray();
    return removed;
};
/**
 * Native splice implementation.
 * Remove number of items from the specified index from the list and/or add new elements.
 * Returns array of removed items or empty array if count == 0.
 * Returns undefined if the list is empty.
 *
 * @param index
 * @param count
 * @param {...*} [elements]
 * @returns {array}
 */ Denque.prototype.splice = function splice(index, count) {
    var i = index;
    // expect a number or return undefined
    if (i !== (i | 0)) {
        return void 0;
    }
    var size = this.size();
    if (i < 0) i += size;
    if (i > size) return void 0;
    if (arguments.length > 2) {
        var k;
        var temp;
        var removed;
        var arg_len = arguments.length;
        var len = this._list.length;
        var arguments_index = 2;
        if (!size || i < size / 2) {
            temp = new Array(i);
            for(k = 0; k < i; k++){
                temp[k] = this._list[this._head + k & this._capacityMask];
            }
            if (count === 0) {
                removed = [];
                if (i > 0) {
                    this._head = this._head + i + len & this._capacityMask;
                }
            } else {
                removed = this.remove(i, count);
                this._head = this._head + i + len & this._capacityMask;
            }
            while(arg_len > arguments_index){
                this.unshift(arguments[--arg_len]);
            }
            for(k = i; k > 0; k--){
                this.unshift(temp[k - 1]);
            }
        } else {
            temp = new Array(size - (i + count));
            var leng = temp.length;
            for(k = 0; k < leng; k++){
                temp[k] = this._list[this._head + i + count + k & this._capacityMask];
            }
            if (count === 0) {
                removed = [];
                if (i != size) {
                    this._tail = this._head + i + len & this._capacityMask;
                }
            } else {
                removed = this.remove(i, count);
                this._tail = this._tail - leng + len & this._capacityMask;
            }
            while(arguments_index < arg_len){
                this.push(arguments[arguments_index++]);
            }
            for(k = 0; k < leng; k++){
                this.push(temp[k]);
            }
        }
        return removed;
    } else {
        return this.remove(i, count);
    }
};
/**
 * Soft clear - does not reset capacity.
 */ Denque.prototype.clear = function clear() {
    this._list = new Array(this._list.length);
    this._head = 0;
    this._tail = 0;
};
/**
 * Returns true or false whether the list is empty.
 * @returns {boolean}
 */ Denque.prototype.isEmpty = function isEmpty() {
    return this._head === this._tail;
};
/**
 * Returns an array of all queue items.
 * @returns {Array}
 */ Denque.prototype.toArray = function toArray() {
    return this._copyArray(false);
};
/**
 * -------------
 *   INTERNALS
 * -------------
 */ /**
 * Fills the queue with items from an array
 * For use in the constructor
 * @param array
 * @private
 */ Denque.prototype._fromArray = function _fromArray(array) {
    var length = array.length;
    var capacity = this._nextPowerOf2(length);
    this._list = new Array(capacity);
    this._capacityMask = capacity - 1;
    this._tail = length;
    for(var i = 0; i < length; i++)this._list[i] = array[i];
};
/**
 *
 * @param fullCopy
 * @param size Initialize the array with a specific size. Will default to the current list size
 * @returns {Array}
 * @private
 */ Denque.prototype._copyArray = function _copyArray(fullCopy, size) {
    var src = this._list;
    var capacity = src.length;
    var length = this.length;
    size = size | length;
    // No prealloc requested and the buffer is contiguous
    if (size == length && this._head < this._tail) {
        // Simply do a fast slice copy
        return this._list.slice(this._head, this._tail);
    }
    var dest = new Array(size);
    var k = 0;
    var i;
    if (fullCopy || this._head > this._tail) {
        for(i = this._head; i < capacity; i++)dest[k++] = src[i];
        for(i = 0; i < this._tail; i++)dest[k++] = src[i];
    } else {
        for(i = this._head; i < this._tail; i++)dest[k++] = src[i];
    }
    return dest;
};
/**
 * Grows the internal list array.
 * @private
 */ Denque.prototype._growArray = function _growArray() {
    if (this._head != 0) {
        // double array size and copy existing data, head to end, then beginning to tail.
        var newList = this._copyArray(true, this._list.length << 1);
        this._tail = this._list.length;
        this._head = 0;
        this._list = newList;
    } else {
        this._tail = this._list.length;
        this._list.length <<= 1;
    }
    this._capacityMask = this._capacityMask << 1 | 1;
};
/**
 * Shrinks the internal list array.
 * @private
 */ Denque.prototype._shrinkArray = function _shrinkArray() {
    this._list.length >>>= 1;
    this._capacityMask >>>= 1;
};
/**
 * Find the next power of 2, at least 4
 * @private
 * @param {number} num 
 * @returns {number}
 */ Denque.prototype._nextPowerOf2 = function _nextPowerOf2(num) {
    var log2 = Math.log(num) / Math.log(2);
    var nextPow2 = 1 << log2 + 1;
    return Math.max(nextPow2, 4);
};
module.exports = Denque;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-parser/lib/parser.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Buffer = __turbopack_context__.r("[externals]/node:buffer [external] (node:buffer, cjs)").Buffer;
const StringDecoder = __turbopack_context__.r("[project]/ [middleware-edge] (unsupported edge import 'string_decoder', ecmascript)").StringDecoder;
const decoder = new StringDecoder();
const errors = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/index.js [middleware-edge] (ecmascript)");
const ReplyError = errors.ReplyError;
const ParserError = errors.ParserError;
var bufferPool = Buffer.allocUnsafe(32 * 1024);
var bufferOffset = 0;
var interval = null;
var counter = 0;
var notDecreased = 0;
/**
 * Used for integer numbers only
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|number}
 */ function parseSimpleNumbers(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    var sign = 1;
    if (parser.buffer[offset] === 45) {
        sign = -1;
        offset++;
    }
    while(offset < length){
        const c1 = parser.buffer[offset++];
        if (c1 === 13) {
            parser.offset = offset + 1;
            return sign * number;
        }
        number = number * 10 + (c1 - 48);
    }
}
/**
 * Used for integer numbers in case of the returnNumbers option
 *
 * Reading the string as parts of n SMI is more efficient than
 * using a string directly.
 *
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|string}
 */ function parseStringNumbers(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    var res = '';
    if (parser.buffer[offset] === 45) {
        res += '-';
        offset++;
    }
    while(offset < length){
        var c1 = parser.buffer[offset++];
        if (c1 === 13) {
            parser.offset = offset + 1;
            if (number !== 0) {
                res += number;
            }
            return res;
        } else if (number > 429496728) {
            res += number * 10 + (c1 - 48);
            number = 0;
        } else if (c1 === 48 && number === 0) {
            res += 0;
        } else {
            number = number * 10 + (c1 - 48);
        }
    }
}
/**
 * Parse a '+' redis simple string response but forward the offsets
 * onto convertBufferRange to generate a string.
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|string|Buffer}
 */ function parseSimpleString(parser) {
    const start = parser.offset;
    const buffer = parser.buffer;
    const length = buffer.length - 1;
    var offset = start;
    while(offset < length){
        if (buffer[offset++] === 13) {
            parser.offset = offset + 1;
            if (parser.optionReturnBuffers === true) {
                return parser.buffer.slice(start, offset - 1);
            }
            return parser.buffer.toString('utf8', start, offset - 1);
        }
    }
}
/**
 * Returns the read length
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|number}
 */ function parseLength(parser) {
    const length = parser.buffer.length - 1;
    var offset = parser.offset;
    var number = 0;
    while(offset < length){
        const c1 = parser.buffer[offset++];
        if (c1 === 13) {
            parser.offset = offset + 1;
            return number;
        }
        number = number * 10 + (c1 - 48);
    }
}
/**
 * Parse a ':' redis integer response
 *
 * If stringNumbers is activated the parser always returns numbers as string
 * This is important for big numbers (number > Math.pow(2, 53)) as js numbers
 * are 64bit floating point numbers with reduced precision
 *
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|number|string}
 */ function parseInteger(parser) {
    if (parser.optionStringNumbers === true) {
        return parseStringNumbers(parser);
    }
    return parseSimpleNumbers(parser);
}
/**
 * Parse a '$' redis bulk string response
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|null|string}
 */ function parseBulkString(parser) {
    const length = parseLength(parser);
    if (length === undefined) {
        return;
    }
    if (length < 0) {
        return null;
    }
    const offset = parser.offset + length;
    if (offset + 2 > parser.buffer.length) {
        parser.bigStrSize = offset + 2;
        parser.totalChunkSize = parser.buffer.length;
        parser.bufferCache.push(parser.buffer);
        return;
    }
    const start = parser.offset;
    parser.offset = offset + 2;
    if (parser.optionReturnBuffers === true) {
        return parser.buffer.slice(start, offset);
    }
    return parser.buffer.toString('utf8', start, offset);
}
/**
 * Parse a '-' redis error response
 * @param {JavascriptRedisParser} parser
 * @returns {ReplyError}
 */ function parseError(parser) {
    var string = parseSimpleString(parser);
    if (string !== undefined) {
        if (parser.optionReturnBuffers === true) {
            string = string.toString();
        }
        return new ReplyError(string);
    }
}
/**
 * Parsing error handler, resets parser buffer
 * @param {JavascriptRedisParser} parser
 * @param {number} type
 * @returns {undefined}
 */ function handleError(parser, type) {
    const err = new ParserError('Protocol error, got ' + JSON.stringify(String.fromCharCode(type)) + ' as reply type byte', JSON.stringify(parser.buffer), parser.offset);
    parser.buffer = null;
    parser.returnFatalError(err);
}
/**
 * Parse a '*' redis array response
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|null|any[]}
 */ function parseArray(parser) {
    const length = parseLength(parser);
    if (length === undefined) {
        return;
    }
    if (length < 0) {
        return null;
    }
    const responses = new Array(length);
    return parseArrayElements(parser, responses, 0);
}
/**
 * Push a partly parsed array to the stack
 *
 * @param {JavascriptRedisParser} parser
 * @param {any[]} array
 * @param {number} pos
 * @returns {undefined}
 */ function pushArrayCache(parser, array, pos) {
    parser.arrayCache.push(array);
    parser.arrayPos.push(pos);
}
/**
 * Parse chunked redis array response
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|any[]}
 */ function parseArrayChunks(parser) {
    const tmp = parser.arrayCache.pop();
    var pos = parser.arrayPos.pop();
    if (parser.arrayCache.length) {
        const res = parseArrayChunks(parser);
        if (res === undefined) {
            pushArrayCache(parser, tmp, pos);
            return;
        }
        tmp[pos++] = res;
    }
    return parseArrayElements(parser, tmp, pos);
}
/**
 * Parse redis array response elements
 * @param {JavascriptRedisParser} parser
 * @param {Array} responses
 * @param {number} i
 * @returns {undefined|null|any[]}
 */ function parseArrayElements(parser, responses, i) {
    const bufferLength = parser.buffer.length;
    while(i < responses.length){
        const offset = parser.offset;
        if (parser.offset >= bufferLength) {
            pushArrayCache(parser, responses, i);
            return;
        }
        const response = parseType(parser, parser.buffer[parser.offset++]);
        if (response === undefined) {
            if (!(parser.arrayCache.length || parser.bufferCache.length)) {
                parser.offset = offset;
            }
            pushArrayCache(parser, responses, i);
            return;
        }
        responses[i] = response;
        i++;
    }
    return responses;
}
/**
 * Called the appropriate parser for the specified type.
 *
 * 36: $
 * 43: +
 * 42: *
 * 58: :
 * 45: -
 *
 * @param {JavascriptRedisParser} parser
 * @param {number} type
 * @returns {*}
 */ function parseType(parser, type) {
    switch(type){
        case 36:
            return parseBulkString(parser);
        case 43:
            return parseSimpleString(parser);
        case 42:
            return parseArray(parser);
        case 58:
            return parseInteger(parser);
        case 45:
            return parseError(parser);
        default:
            return handleError(parser, type);
    }
}
/**
 * Decrease the bufferPool size over time
 *
 * Balance between increasing and decreasing the bufferPool.
 * Decrease the bufferPool by 10% by removing the first 10% of the current pool.
 * @returns {undefined}
 */ function decreaseBufferPool() {
    if (bufferPool.length > 50 * 1024) {
        if (counter === 1 || notDecreased > counter * 2) {
            const minSliceLen = Math.floor(bufferPool.length / 10);
            const sliceLength = minSliceLen < bufferOffset ? bufferOffset : minSliceLen;
            bufferOffset = 0;
            bufferPool = bufferPool.slice(sliceLength, bufferPool.length);
        } else {
            notDecreased++;
            counter--;
        }
    } else {
        clearInterval(interval);
        counter = 0;
        notDecreased = 0;
        interval = null;
    }
}
/**
 * Check if the requested size fits in the current bufferPool.
 * If it does not, reset and increase the bufferPool accordingly.
 *
 * @param {number} length
 * @returns {undefined}
 */ function resizeBuffer(length) {
    if (bufferPool.length < length + bufferOffset) {
        const multiplier = length > 1024 * 1024 * 75 ? 2 : 3;
        if (bufferOffset > 1024 * 1024 * 111) {
            bufferOffset = 1024 * 1024 * 50;
        }
        bufferPool = Buffer.allocUnsafe(length * multiplier + bufferOffset);
        bufferOffset = 0;
        counter++;
        if (interval === null) {
            interval = setInterval(decreaseBufferPool, 50);
        }
    }
}
/**
 * Concat a bulk string containing multiple chunks
 *
 * Notes:
 * 1) The first chunk might contain the whole bulk string including the \r
 * 2) We are only safe to fully add up elements that are neither the first nor any of the last two elements
 *
 * @param {JavascriptRedisParser} parser
 * @returns {String}
 */ function concatBulkString(parser) {
    const list = parser.bufferCache;
    const oldOffset = parser.offset;
    var chunks = list.length;
    var offset = parser.bigStrSize - parser.totalChunkSize;
    parser.offset = offset;
    if (offset <= 2) {
        if (chunks === 2) {
            return list[0].toString('utf8', oldOffset, list[0].length + offset - 2);
        }
        chunks--;
        offset = list[list.length - 2].length + offset;
    }
    var res = decoder.write(list[0].slice(oldOffset));
    for(var i = 1; i < chunks - 1; i++){
        res += decoder.write(list[i]);
    }
    res += decoder.end(list[i].slice(0, offset - 2));
    return res;
}
/**
 * Concat the collected chunks from parser.bufferCache.
 *
 * Increases the bufferPool size beforehand if necessary.
 *
 * @param {JavascriptRedisParser} parser
 * @returns {Buffer}
 */ function concatBulkBuffer(parser) {
    const list = parser.bufferCache;
    const oldOffset = parser.offset;
    const length = parser.bigStrSize - oldOffset - 2;
    var chunks = list.length;
    var offset = parser.bigStrSize - parser.totalChunkSize;
    parser.offset = offset;
    if (offset <= 2) {
        if (chunks === 2) {
            return list[0].slice(oldOffset, list[0].length + offset - 2);
        }
        chunks--;
        offset = list[list.length - 2].length + offset;
    }
    resizeBuffer(length);
    const start = bufferOffset;
    list[0].copy(bufferPool, start, oldOffset, list[0].length);
    bufferOffset += list[0].length - oldOffset;
    for(var i = 1; i < chunks - 1; i++){
        list[i].copy(bufferPool, bufferOffset);
        bufferOffset += list[i].length;
    }
    list[i].copy(bufferPool, bufferOffset, 0, offset - 2);
    bufferOffset += offset - 2;
    return bufferPool.slice(start, bufferOffset);
}
class JavascriptRedisParser {
    /**
   * Javascript Redis Parser constructor
   * @param {{returnError: Function, returnReply: Function, returnFatalError?: Function, returnBuffers: boolean, stringNumbers: boolean }} options
   * @constructor
   */ constructor(options){
        if (!options) {
            throw new TypeError('Options are mandatory.');
        }
        if (typeof options.returnError !== 'function' || typeof options.returnReply !== 'function') {
            throw new TypeError('The returnReply and returnError options have to be functions.');
        }
        this.setReturnBuffers(!!options.returnBuffers);
        this.setStringNumbers(!!options.stringNumbers);
        this.returnError = options.returnError;
        this.returnFatalError = options.returnFatalError || options.returnError;
        this.returnReply = options.returnReply;
        this.reset();
    }
    /**
   * Reset the parser values to the initial state
   *
   * @returns {undefined}
   */ reset() {
        this.offset = 0;
        this.buffer = null;
        this.bigStrSize = 0;
        this.totalChunkSize = 0;
        this.bufferCache = [];
        this.arrayCache = [];
        this.arrayPos = [];
    }
    /**
   * Set the returnBuffers option
   *
   * @param {boolean} returnBuffers
   * @returns {undefined}
   */ setReturnBuffers(returnBuffers) {
        if (typeof returnBuffers !== 'boolean') {
            throw new TypeError('The returnBuffers argument has to be a boolean');
        }
        this.optionReturnBuffers = returnBuffers;
    }
    /**
   * Set the stringNumbers option
   *
   * @param {boolean} stringNumbers
   * @returns {undefined}
   */ setStringNumbers(stringNumbers) {
        if (typeof stringNumbers !== 'boolean') {
            throw new TypeError('The stringNumbers argument has to be a boolean');
        }
        this.optionStringNumbers = stringNumbers;
    }
    /**
   * Parse the redis buffer
   * @param {Buffer} buffer
   * @returns {undefined}
   */ execute(buffer) {
        if (this.buffer === null) {
            this.buffer = buffer;
            this.offset = 0;
        } else if (this.bigStrSize === 0) {
            const oldLength = this.buffer.length;
            const remainingLength = oldLength - this.offset;
            const newBuffer = Buffer.allocUnsafe(remainingLength + buffer.length);
            this.buffer.copy(newBuffer, 0, this.offset, oldLength);
            buffer.copy(newBuffer, remainingLength, 0, buffer.length);
            this.buffer = newBuffer;
            this.offset = 0;
            if (this.arrayCache.length) {
                const arr = parseArrayChunks(this);
                if (arr === undefined) {
                    return;
                }
                this.returnReply(arr);
            }
        } else if (this.totalChunkSize + buffer.length >= this.bigStrSize) {
            this.bufferCache.push(buffer);
            var tmp = this.optionReturnBuffers ? concatBulkBuffer(this) : concatBulkString(this);
            this.bigStrSize = 0;
            this.bufferCache = [];
            this.buffer = buffer;
            if (this.arrayCache.length) {
                this.arrayCache[0][this.arrayPos[0]++] = tmp;
                tmp = parseArrayChunks(this);
                if (tmp === undefined) {
                    return;
                }
            }
            this.returnReply(tmp);
        } else {
            this.bufferCache.push(buffer);
            this.totalChunkSize += buffer.length;
            return;
        }
        while(this.offset < this.buffer.length){
            const offset = this.offset;
            const type = this.buffer[this.offset++];
            const response = parseType(this, type);
            if (response === undefined) {
                if (!(this.arrayCache.length || this.bufferCache.length)) {
                    this.offset = offset;
                }
                return;
            }
            if (type === 45) {
                this.returnError(response);
            } else {
                this.returnReply(response);
            }
        }
        this.buffer = null;
    }
}
module.exports = JavascriptRedisParser;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-parser/index.js [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-parser/lib/parser.js [middleware-edge] (ecmascript)");
}),
]);

//# sourceMappingURL=c427b_211564a9._.js.map