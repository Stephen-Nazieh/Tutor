;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="f3db6641-ff5c-f39c-6dea-aa7348179d69")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/eventFilters.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventFiltersIntegration",
    ()=>eventFiltersIntegration,
    "inboundFiltersIntegration",
    ()=>inboundFiltersIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/eventUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [client] (ecmascript)");
;
;
;
;
;
;
// "Script error." is hard coded into browsers for errors that it can't read.
// this is the result of a script being pulled in from an external domain and CORS.
const DEFAULT_IGNORE_ERRORS = [
    /^Script error\.?$/,
    /^Javascript error: Script error\.? on line 0$/,
    /^ResizeObserver loop completed with undelivered notifications.$/,
    /^Cannot redefine property: googletag$/,
    /^Can't find variable: gmo$/,
    /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
    'can\'t redefine non-configurable property "solana"',
    "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)",
    "Can't find variable: _AutofillCallbackHandler",
    /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,
    /^Java exception was raised during method invocation$/
];
/** Options for the EventFilters integration */ const INTEGRATION_NAME = 'EventFilters';
/**
 * An integration that filters out events (errors and transactions) based on:
 *
 * - (Errors) A curated list of known low-value or irrelevant errors (see {@link DEFAULT_IGNORE_ERRORS})
 * - (Errors) A list of error messages or urls/filenames passed in via
 *   - Top level Sentry.init options (`ignoreErrors`, `denyUrls`, `allowUrls`)
 *   - The same options passed to the integration directly via @param options
 * - (Transactions/Spans) A list of root span (transaction) names passed in via
 *   - Top level Sentry.init option (`ignoreTransactions`)
 *   - The same option passed to the integration directly via @param options
 *
 * Events filtered by this integration will not be sent to Sentry.
 */ const eventFiltersIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])((options = {})=>{
    let mergedOptions;
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            const clientOptions = client.getOptions();
            mergedOptions = _mergeOptions(options, clientOptions);
        },
        processEvent (event, _hint, client) {
            if (!mergedOptions) {
                const clientOptions = client.getOptions();
                mergedOptions = _mergeOptions(options, clientOptions);
            }
            return _shouldDropEvent(event, mergedOptions) ? null : event;
        }
    };
});
/**
 * An integration that filters out events (errors and transactions) based on:
 *
 * - (Errors) A curated list of known low-value or irrelevant errors (see {@link DEFAULT_IGNORE_ERRORS})
 * - (Errors) A list of error messages or urls/filenames passed in via
 *   - Top level Sentry.init options (`ignoreErrors`, `denyUrls`, `allowUrls`)
 *   - The same options passed to the integration directly via @param options
 * - (Transactions/Spans) A list of root span (transaction) names passed in via
 *   - Top level Sentry.init option (`ignoreTransactions`)
 *   - The same option passed to the integration directly via @param options
 *
 * Events filtered by this integration will not be sent to Sentry.
 *
 * @deprecated this integration was renamed and will be removed in a future major version.
 * Use `eventFiltersIntegration` instead.
 */ const inboundFiltersIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])((options = {})=>{
    return {
        ...eventFiltersIntegration(options),
        name: 'InboundFilters'
    };
});
function _mergeOptions(internalOptions = {}, clientOptions = {}) {
    return {
        allowUrls: [
            ...internalOptions.allowUrls || [],
            ...clientOptions.allowUrls || []
        ],
        denyUrls: [
            ...internalOptions.denyUrls || [],
            ...clientOptions.denyUrls || []
        ],
        ignoreErrors: [
            ...internalOptions.ignoreErrors || [],
            ...clientOptions.ignoreErrors || [],
            ...internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS
        ],
        ignoreTransactions: [
            ...internalOptions.ignoreTransactions || [],
            ...clientOptions.ignoreTransactions || []
        ]
    };
}
function _shouldDropEvent(event, options) {
    if (!event.type) {
        // Filter errors
        if (_isIgnoredError(event, options.ignoreErrors)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}`);
            return true;
        }
        if (_isUselessError(event)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}`);
            return true;
        }
        if (_isDeniedUrl(event, options.denyUrls)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}.\nUrl: ${_getEventFilterUrl(event)}`);
            return true;
        }
        if (!_isAllowedUrl(event, options.allowUrls)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}.\nUrl: ${_getEventFilterUrl(event)}`);
            return true;
        }
    } else if (event.type === 'transaction') {
        // Filter transactions
        if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}`);
            return true;
        }
    }
    return false;
}
function _isIgnoredError(event, ignoreErrors) {
    if (!ignoreErrors?.length) {
        return false;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getPossibleEventMessages"])(event).some((message)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(message, ignoreErrors));
}
function _isIgnoredTransaction(event, ignoreTransactions) {
    if (!ignoreTransactions?.length) {
        return false;
    }
    const name = event.transaction;
    return name ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(name, ignoreTransactions) : false;
}
function _isDeniedUrl(event, denyUrls) {
    if (!denyUrls?.length) {
        return false;
    }
    const url = _getEventFilterUrl(event);
    return !url ? false : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(url, denyUrls);
}
function _isAllowedUrl(event, allowUrls) {
    if (!allowUrls?.length) {
        return true;
    }
    const url = _getEventFilterUrl(event);
    return !url ? true : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(url, allowUrls);
}
function _getLastValidUrl(frames = []) {
    for(let i = frames.length - 1; i >= 0; i--){
        const frame = frames[i];
        if (frame && frame.filename !== '<anonymous>' && frame.filename !== '[native code]') {
            return frame.filename || null;
        }
    }
    return null;
}
function _getEventFilterUrl(event) {
    try {
        // If there are linked exceptions or exception aggregates we only want to match against the top frame of the "root" (the main exception)
        // The root always comes last in linked exceptions
        const rootException = [
            ...event.exception?.values ?? []
        ].reverse().find((value)=>value.mechanism?.parent_id === undefined && value.stacktrace?.frames?.length);
        const frames = rootException?.stacktrace?.frames;
        return frames ? _getLastValidUrl(frames) : null;
    } catch  {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error(`Cannot extract url for event ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}`);
        return null;
    }
}
function _isUselessError(event) {
    // We only want to consider events for dropping that actually have recorded exception values.
    if (!event.exception?.values?.length) {
        return false;
    }
    return(// No top-level message
    !event.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !event.exception.values.some((value)=>value.stacktrace || value.type && value.type !== 'Error' || value.value));
}
;
 //# sourceMappingURL=eventFilters.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/functiontostring.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functionToStringIntegration",
    ()=>functionToStringIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [client] (ecmascript)");
;
;
;
let originalFunctionToString;
const INTEGRATION_NAME = 'FunctionToString';
const SETUP_CLIENTS = new WeakMap();
const _functionToStringIntegration = ()=>{
    return {
        name: INTEGRATION_NAME,
        setupOnce () {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            originalFunctionToString = Function.prototype.toString;
            // intrinsics (like Function.prototype) might be immutable in some environments
            // e.g. Node with --frozen-intrinsics, XS (an embedded JavaScript engine) or SES (a JavaScript proposal)
            try {
                Function.prototype.toString = function(...args) {
                    const originalFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getOriginalFunction"])(this);
                    const context = SETUP_CLIENTS.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])()) && originalFunction !== undefined ? originalFunction : this;
                    return originalFunctionToString.apply(context, args);
                };
            } catch  {
            // ignore errors here, just don't patch this
            }
        },
        setup (client) {
            SETUP_CLIENTS.set(client, true);
        }
    };
};
/**
 * Patch toString calls to return proper name for wrapped functions.
 *
 * ```js
 * Sentry.init({
 *   integrations: [
 *     functionToStringIntegration(),
 *   ],
 * });
 * ```
 */ const functionToStringIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_functionToStringIntegration);
;
 //# sourceMappingURL=functiontostring.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/conversationId.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "conversationIdIntegration",
    ()=>conversationIdIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [client] (ecmascript)");
;
;
;
const INTEGRATION_NAME = 'ConversationId';
const _conversationIdIntegration = ()=>{
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            client.on('spanStart', (span)=>{
                const scopeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().getScopeData();
                const isolationScopeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getIsolationScope"])().getScopeData();
                const conversationId = scopeData.conversationId || isolationScopeData.conversationId;
                if (conversationId) {
                    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GEN_AI_CONVERSATION_ID_ATTRIBUTE"], conversationId);
                }
            });
        }
    };
};
/**
 * Automatically applies conversation ID from scope to spans.
 *
 * This integration reads the conversation ID from the current or isolation scope
 * and applies it to spans when they start. This ensures the conversation ID is
 * available for all AI-related operations.
 */ const conversationIdIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_conversationIdIntegration);
;
 //# sourceMappingURL=conversationId.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/dedupe.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_shouldDropEvent",
    ()=>_shouldDropEvent,
    "dedupeIntegration",
    ()=>dedupeIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [client] (ecmascript)");
;
;
;
;
const INTEGRATION_NAME = 'Dedupe';
const _dedupeIntegration = ()=>{
    let previousEvent;
    return {
        name: INTEGRATION_NAME,
        processEvent (currentEvent) {
            // We want to ignore any non-error type events, e.g. transactions or replays
            // These should never be deduped, and also not be compared against as _previousEvent.
            if (currentEvent.type) {
                return currentEvent;
            }
            // Juuust in case something goes wrong
            try {
                if (_shouldDropEvent(currentEvent, previousEvent)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('Event dropped due to being a duplicate of previously captured event.');
                    return null;
                }
            } catch  {} // eslint-disable-line no-empty
            return previousEvent = currentEvent;
        }
    };
};
/**
 * Deduplication filter.
 */ const dedupeIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_dedupeIntegration);
/** only exported for tests. */ function _shouldDropEvent(currentEvent, previousEvent) {
    if (!previousEvent) {
        return false;
    }
    if (_isSameMessageEvent(currentEvent, previousEvent)) {
        return true;
    }
    if (_isSameExceptionEvent(currentEvent, previousEvent)) {
        return true;
    }
    return false;
}
function _isSameMessageEvent(currentEvent, previousEvent) {
    const currentMessage = currentEvent.message;
    const previousMessage = previousEvent.message;
    // If neither event has a message property, they were both exceptions, so bail out
    if (!currentMessage && !previousMessage) {
        return false;
    }
    // If only one event has a stacktrace, but not the other one, they are not the same
    if (currentMessage && !previousMessage || !currentMessage && previousMessage) {
        return false;
    }
    if (currentMessage !== previousMessage) {
        return false;
    }
    if (!_isSameFingerprint(currentEvent, previousEvent)) {
        return false;
    }
    if (!_isSameStacktrace(currentEvent, previousEvent)) {
        return false;
    }
    return true;
}
function _isSameExceptionEvent(currentEvent, previousEvent) {
    const previousException = _getExceptionFromEvent(previousEvent);
    const currentException = _getExceptionFromEvent(currentEvent);
    if (!previousException || !currentException) {
        return false;
    }
    if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
        return false;
    }
    if (!_isSameFingerprint(currentEvent, previousEvent)) {
        return false;
    }
    if (!_isSameStacktrace(currentEvent, previousEvent)) {
        return false;
    }
    return true;
}
function _isSameStacktrace(currentEvent, previousEvent) {
    let currentFrames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFramesFromEvent"])(currentEvent);
    let previousFrames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFramesFromEvent"])(previousEvent);
    // If neither event has a stacktrace, they are assumed to be the same
    if (!currentFrames && !previousFrames) {
        return true;
    }
    // If only one event has a stacktrace, but not the other one, they are not the same
    if (currentFrames && !previousFrames || !currentFrames && previousFrames) {
        return false;
    }
    currentFrames = currentFrames;
    previousFrames = previousFrames;
    // If number of frames differ, they are not the same
    if (previousFrames.length !== currentFrames.length) {
        return false;
    }
    // Otherwise, compare the two
    for(let i = 0; i < previousFrames.length; i++){
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const frameA = previousFrames[i];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const frameB = currentFrames[i];
        if (frameA.filename !== frameB.filename || frameA.lineno !== frameB.lineno || frameA.colno !== frameB.colno || frameA.function !== frameB.function) {
            return false;
        }
    }
    return true;
}
function _isSameFingerprint(currentEvent, previousEvent) {
    let currentFingerprint = currentEvent.fingerprint;
    let previousFingerprint = previousEvent.fingerprint;
    // If neither event has a fingerprint, they are assumed to be the same
    if (!currentFingerprint && !previousFingerprint) {
        return true;
    }
    // If only one event has a fingerprint, but not the other one, they are not the same
    if (currentFingerprint && !previousFingerprint || !currentFingerprint && previousFingerprint) {
        return false;
    }
    currentFingerprint = currentFingerprint;
    previousFingerprint = previousFingerprint;
    // Otherwise, compare the two
    try {
        return !!(currentFingerprint.join('') === previousFingerprint.join(''));
    } catch  {
        return false;
    }
}
function _getExceptionFromEvent(event) {
    return event.exception?.values?.[0];
}
;
 //# sourceMappingURL=dedupe.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/rewriteframes.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateIteratee",
    ()=>generateIteratee,
    "rewriteFramesIntegration",
    ()=>rewriteFramesIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$path$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/path.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
;
;
;
const INTEGRATION_NAME = 'RewriteFrames';
/**
 * Rewrite event frames paths.
 */ const rewriteFramesIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])((options = {})=>{
    const root = options.root;
    const prefix = options.prefix || 'app:///';
    const isBrowser = 'window' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"] && !!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].window;
    const iteratee = options.iteratee || generateIteratee({
        isBrowser,
        root,
        prefix
    });
    /** Process an exception event. */ function _processExceptionsEvent(event) {
        try {
            return {
                ...event,
                exception: {
                    ...event.exception,
                    // The check for this is performed inside `process` call itself, safe to skip here
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    values: event.exception.values.map((value)=>({
                            ...value,
                            ...value.stacktrace && {
                                stacktrace: _processStacktrace(value.stacktrace)
                            }
                        }))
                }
            };
        } catch  {
            return event;
        }
    }
    /** Process a stack trace. */ function _processStacktrace(stacktrace) {
        return {
            ...stacktrace,
            frames: stacktrace?.frames?.map((f)=>iteratee(f))
        };
    }
    return {
        name: INTEGRATION_NAME,
        processEvent (originalEvent) {
            let processedEvent = originalEvent;
            if (originalEvent.exception && Array.isArray(originalEvent.exception.values)) {
                processedEvent = _processExceptionsEvent(processedEvent);
            }
            return processedEvent;
        }
    };
});
/**
 * Exported only for tests.
 */ function generateIteratee({ isBrowser, root, prefix }) {
    return (frame)=>{
        if (!frame.filename) {
            return frame;
        }
        // Determine if this is a Windows frame by checking for a Windows-style prefix such as `C:\`
        const isWindowsFrame = /^[a-zA-Z]:\\/.test(frame.filename) || frame.filename.includes('\\') && !frame.filename.includes('/');
        // Check if the frame filename begins with `/`
        const startsWithSlash = /^\//.test(frame.filename);
        if (isBrowser) {
            if (root) {
                const oldFilename = frame.filename;
                if (oldFilename.indexOf(root) === 0) {
                    frame.filename = oldFilename.replace(root, prefix);
                }
            }
        } else {
            if (isWindowsFrame || startsWithSlash) {
                const filename = isWindowsFrame ? frame.filename.replace(/^[a-zA-Z]:/, '') // remove Windows-style prefix
                .replace(/\\/g, '/') // replace all `\\` instances with `/`
                 : frame.filename;
                const base = root ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$path$2e$js__$5b$client$5d$__$28$ecmascript$29$__["relative"])(root, filename) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$path$2e$js__$5b$client$5d$__$28$ecmascript$29$__["basename"])(filename);
                frame.filename = `${prefix}${base}`;
            }
        }
        return frame;
    };
}
;
 //# sourceMappingURL=rewriteframes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/captureconsole.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "captureConsoleIntegration",
    ()=>captureConsoleIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/instrument/console.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/severity.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const INTEGRATION_NAME = 'CaptureConsole';
const _captureConsoleIntegration = (options = {})=>{
    const levels = options.levels || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CONSOLE_LEVELS"];
    const handled = options.handled ?? true;
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            if (!('console' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"])) {
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addConsoleInstrumentationHandler"])(({ args, level })=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client || !levels.includes(level)) {
                    return;
                }
                consoleHandler(args, level, handled);
            });
        }
    };
};
/**
 * Send Console API calls as Sentry Events.
 */ const captureConsoleIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_captureConsoleIntegration);
function consoleHandler(args, level, handled) {
    const severityLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$client$5d$__$28$ecmascript$29$__["severityLevelFromString"])(level);
    /*
    We create this error here already to attach a stack trace to captured messages,
    if users set `attachStackTrace` to `true` in Sentry.init.
    We do this here already because we want to minimize the number of Sentry SDK stack frames
    within the error. Technically, Client.captureMessage will also do it but this happens several
    stack frames deeper.
  */ const syntheticException = new Error();
    const captureContext = {
        level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$client$5d$__$28$ecmascript$29$__["severityLevelFromString"])(level),
        extra: {
            arguments: args
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        scope.addEventProcessor((event)=>{
            event.logger = 'console';
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
                handled,
                type: 'auto.core.capture_console'
            });
            return event;
        });
        if (level === 'assert') {
            if (!args[0]) {
                const message = `Assertion failed: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["safeJoin"])(args.slice(1), ' ') || 'console.assert'}`;
                scope.setExtra('arguments', args.slice(1));
                scope.captureMessage(message, severityLevel, {
                    captureContext,
                    syntheticException
                });
            }
            return;
        }
        const error = args.find((arg)=>arg instanceof Error);
        if (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureException"])(error, captureContext);
            return;
        }
        const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["safeJoin"])(args, ' ');
        scope.captureMessage(message, severityLevel, {
            captureContext,
            syntheticException
        });
    });
}
;
 //# sourceMappingURL=captureconsole.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/consola.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConsolaReporter",
    ()=>createConsolaReporter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/logs/internal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/logs/utils.js [client] (ecmascript)");
;
;
;
/**
 * Options for the Sentry Consola reporter.
 */ const DEFAULT_CAPTURED_LEVELS = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal'
];
/**
 * Creates a new Sentry reporter for Consola that forwards logs to Sentry. Requires the `enableLogs` option to be enabled.
 *
 * **Note: This integration supports Consola v3.x only.** The reporter interface and log object structure
 * may differ in other versions of Consola.
 *
 * @param options - Configuration options for the reporter.
 * @returns A Consola reporter that can be added to consola instances.
 *
 * @example
 * ```ts
 * import * as Sentry from '@sentry/node';
 * import { consola } from 'consola';
 *
 * Sentry.init({
 *   enableLogs: true,
 * });
 *
 * const sentryReporter = Sentry.createConsolaReporter({
 *   // Optional: filter levels to capture
 *   levels: ['error', 'warn', 'info'],
 * });
 *
 * consola.addReporter(sentryReporter);
 *
 * // Now consola logs will be captured by Sentry
 * consola.info('This will be sent to Sentry');
 * consola.error('This error will also be sent to Sentry');
 * ```
 */ function createConsolaReporter(options = {}) {
    const levels = new Set(options.levels ?? DEFAULT_CAPTURED_LEVELS);
    const providedClient = options.client;
    return {
        log (logObj) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, level, message: consolaMessage, args, tag, date: _date, ...attributes } = logObj;
            // Get client - use provided client or current client
            const client = providedClient || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
            if (!client) {
                return;
            }
            // Determine the log severity level
            const logSeverityLevel = getLogSeverityLevel(type, level);
            // Early exit if this level should not be captured
            if (!levels.has(logSeverityLevel)) {
                return;
            }
            const { normalizeDepth = 3, normalizeMaxBreadth = 1000 } = client.getOptions();
            // Format the log message using the same approach as consola's basic reporter
            const messageParts = [];
            if (consolaMessage) {
                messageParts.push(consolaMessage);
            }
            if (args && args.length > 0) {
                messageParts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["formatConsoleArgs"])(args, normalizeDepth, normalizeMaxBreadth));
            }
            const message = messageParts.join(' ');
            // Build attributes
            attributes['sentry.origin'] = 'auto.log.consola';
            if (tag) {
                attributes['consola.tag'] = tag;
            }
            if (type) {
                attributes['consola.type'] = type;
            }
            // Only add level if it's a valid number (not null/undefined)
            if (level != null && typeof level === 'number') {
                attributes['consola.level'] = level;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_captureLog"])({
                level: logSeverityLevel,
                message,
                attributes
            });
        }
    };
}
// Mapping from consola log types to Sentry log severity levels
const CONSOLA_TYPE_TO_LOG_SEVERITY_LEVEL_MAP = {
    // Consola built-in types
    silent: 'trace',
    fatal: 'fatal',
    error: 'error',
    warn: 'warn',
    log: 'info',
    info: 'info',
    success: 'info',
    fail: 'error',
    ready: 'info',
    start: 'info',
    box: 'info',
    debug: 'debug',
    trace: 'trace',
    verbose: 'debug',
    // Custom types that might exist
    critical: 'fatal',
    notice: 'info'
};
// Mapping from consola log levels (numbers) to Sentry log severity levels
const CONSOLA_LEVEL_TO_LOG_SEVERITY_LEVEL_MAP = {
    0: 'fatal',
    1: 'warn',
    2: 'info',
    3: 'info',
    4: 'debug',
    5: 'trace'
};
/**
 * Determines the log severity level from Consola type and level.
 *
 * @param type - The Consola log type (e.g., 'error', 'warn', 'info')
 * @param level - The Consola numeric log level (0-5) or null for some types like 'verbose'
 * @returns The corresponding Sentry log severity level
 */ function getLogSeverityLevel(type, level) {
    // Handle special case for verbose logs (level can be null with infinite level in Consola)
    if (type === 'verbose') {
        return 'debug';
    }
    // Handle silent logs - these should be at trace level
    if (type === 'silent') {
        return 'trace';
    }
    // First try to map by type (more specific)
    if (type) {
        const mappedLevel = CONSOLA_TYPE_TO_LOG_SEVERITY_LEVEL_MAP[type];
        if (mappedLevel) {
            return mappedLevel;
        }
    }
    // Fallback to level mapping (handle null level)
    if (typeof level === 'number') {
        const mappedLevel = CONSOLA_LEVEL_TO_LOG_SEVERITY_LEVEL_MAP[level];
        if (mappedLevel) {
            return mappedLevel;
        }
    }
    // Default fallback
    return 'info';
}
;
 //# sourceMappingURL=consola.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/extraerrordata.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extraErrorDataIntegration",
    ()=>extraErrorDataIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/normalize.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [client] (ecmascript)");
;
;
;
;
;
;
;
const INTEGRATION_NAME = 'ExtraErrorData';
/**
 * Extract additional data for from original exceptions.
 */ const _extraErrorDataIntegration = (options = {})=>{
    const { depth = 3, captureErrorCause = true } = options;
    return {
        name: INTEGRATION_NAME,
        processEvent (event, hint, client) {
            const { maxValueLength } = client.getOptions();
            return _enhanceEventWithErrorData(event, hint, depth, captureErrorCause, maxValueLength);
        }
    };
};
const extraErrorDataIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_extraErrorDataIntegration);
function _enhanceEventWithErrorData(event, hint = {}, depth, captureErrorCause, maxValueLength) {
    if (!hint.originalException || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isError"])(hint.originalException)) {
        return event;
    }
    const exceptionName = hint.originalException.name || hint.originalException.constructor.name;
    const errorData = _extractErrorData(hint.originalException, captureErrorCause, maxValueLength);
    if (errorData) {
        const contexts = {
            ...event.contexts
        };
        const normalizedErrorData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalize"])(errorData, depth);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(normalizedErrorData)) {
            // We mark the error data as "already normalized" here, because we don't want other normalization procedures to
            // potentially truncate the data we just already normalized, with a certain depth setting.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(normalizedErrorData, '__sentry_skip_normalization__', true);
            contexts[exceptionName] = normalizedErrorData;
        }
        return {
            ...event,
            contexts
        };
    }
    return event;
}
/**
 * Extract extra information from the Error object
 */ function _extractErrorData(error, captureErrorCause, maxValueLength) {
    // We are trying to enhance already existing event, so no harm done if it won't succeed
    try {
        const nativeKeys = [
            'name',
            'message',
            'stack',
            'line',
            'column',
            'fileName',
            'lineNumber',
            'columnNumber',
            'toJSON'
        ];
        const extraErrorInfo = {};
        // We want only enumerable properties, thus `getOwnPropertyNames` is redundant here, as we filter keys anyway.
        for (const key of Object.keys(error)){
            if (nativeKeys.indexOf(key) !== -1) {
                continue;
            }
            const value = error[key];
            extraErrorInfo[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isError"])(value) || typeof value === 'string' ? maxValueLength ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["truncate"])(`${value}`, maxValueLength) : `${value}` : value;
        }
        // Error.cause is a standard property that is non enumerable, we therefore need to access it separately.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
        if (captureErrorCause && error.cause !== undefined) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isError"])(error.cause)) {
                const errorName = error.cause.name || error.cause.constructor.name;
                extraErrorInfo.cause = {
                    [errorName]: _extractErrorData(error.cause, false, maxValueLength)
                };
            } else {
                extraErrorInfo.cause = error.cause;
            }
        }
        // Check if someone attached `toJSON` method to grab even more properties (eg. axios is doing that)
        if (typeof error.toJSON === 'function') {
            const serializedError = error.toJSON();
            for (const key of Object.keys(serializedError)){
                const value = serializedError[key];
                extraErrorInfo[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isError"])(value) ? value.toString() : value;
            }
        }
        return extraErrorInfo;
    } catch (oO) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('Unable to extract extra data from the Error object:', oO);
    }
    return null;
}
;
 //# sourceMappingURL=extraerrordata.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/featureFlags/featureFlagsIntegration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "featureFlagsIntegration",
    ()=>featureFlagsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/featureFlags.js [client] (ecmascript)");
;
;
/**
 * Sentry integration for buffering feature flag evaluations manually with an API, and
 * capturing them on error events and spans.
 *
 * See the [feature flag documentation](https://develop.sentry.dev/sdk/expected-features/#feature-flags) for more information.
 *
 * @example
 * ```
 * import * as Sentry from '@sentry/browser';
 * import { type FeatureFlagsIntegration } from '@sentry/browser';
 *
 * // Setup
 * Sentry.init(..., integrations: [Sentry.featureFlagsIntegration()])
 *
 * // Verify
 * const flagsIntegration = Sentry.getClient()?.getIntegrationByName<FeatureFlagsIntegration>('FeatureFlags');
 * if (flagsIntegration) {
 *   flagsIntegration.addFeatureFlag('my-flag', true);
 * } else {
 *   // check your setup
 * }
 * Sentry.captureException(Exception('broke')); // 'my-flag' should be captured to this Sentry event.
 * ```
 */ const featureFlagsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'FeatureFlags',
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        },
        addFeatureFlag (name, value) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(name, value);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(name, value);
        }
    };
});
;
 //# sourceMappingURL=featureFlagsIntegration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/supabase.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DB_OPERATIONS_TO_INSTRUMENT",
    ()=>DB_OPERATIONS_TO_INSTRUMENT,
    "FILTER_MAPPINGS",
    ()=>FILTER_MAPPINGS,
    "extractOperation",
    ()=>extractOperation,
    "instrumentSupabaseClient",
    ()=>instrumentSupabaseClient,
    "supabaseIntegration",
    ()=>supabaseIntegration,
    "translateFiltersIntoMethods",
    ()=>translateFiltersIntoMethods
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/breadcrumbs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/trace.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
// Based on Kamil Ogórek's work on:
// https://github.com/supabase-community/sentry-integration-js
const AUTH_OPERATIONS_TO_INSTRUMENT = [
    'reauthenticate',
    'signInAnonymously',
    'signInWithOAuth',
    'signInWithIdToken',
    'signInWithOtp',
    'signInWithPassword',
    'signInWithSSO',
    'signOut',
    'signUp',
    'verifyOtp'
];
const AUTH_ADMIN_OPERATIONS_TO_INSTRUMENT = [
    'createUser',
    'deleteUser',
    'listUsers',
    'getUserById',
    'updateUserById',
    'inviteUserByEmail'
];
const FILTER_MAPPINGS = {
    eq: 'eq',
    neq: 'neq',
    gt: 'gt',
    gte: 'gte',
    lt: 'lt',
    lte: 'lte',
    like: 'like',
    'like(all)': 'likeAllOf',
    'like(any)': 'likeAnyOf',
    ilike: 'ilike',
    'ilike(all)': 'ilikeAllOf',
    'ilike(any)': 'ilikeAnyOf',
    is: 'is',
    in: 'in',
    cs: 'contains',
    cd: 'containedBy',
    sr: 'rangeGt',
    nxl: 'rangeGte',
    sl: 'rangeLt',
    nxr: 'rangeLte',
    adj: 'rangeAdjacent',
    ov: 'overlaps',
    fts: '',
    plfts: 'plain',
    phfts: 'phrase',
    wfts: 'websearch',
    not: 'not'
};
const DB_OPERATIONS_TO_INSTRUMENT = [
    'select',
    'insert',
    'upsert',
    'update',
    'delete'
];
function markAsInstrumented(fn) {
    try {
        fn.__SENTRY_INSTRUMENTED__ = true;
    } catch  {
    // ignore errors here
    }
}
function isInstrumented(fn) {
    try {
        return fn.__SENTRY_INSTRUMENTED__;
    } catch  {
        return false;
    }
}
/**
 * Extracts the database operation type from the HTTP method and headers
 * @param method - The HTTP method of the request
 * @param headers - The request headers
 * @returns The database operation type ('select', 'insert', 'upsert', 'update', or 'delete')
 */ function extractOperation(method, headers = {}) {
    switch(method){
        case 'GET':
            {
                return 'select';
            }
        case 'POST':
            {
                if (headers['Prefer']?.includes('resolution=')) {
                    return 'upsert';
                } else {
                    return 'insert';
                }
            }
        case 'PATCH':
            {
                return 'update';
            }
        case 'DELETE':
            {
                return 'delete';
            }
        default:
            {
                return '<unknown-op>';
            }
    }
}
/**
 * Translates Supabase filter parameters into readable method names for tracing
 * @param key - The filter key from the URL search parameters
 * @param query - The filter value from the URL search parameters
 * @returns A string representation of the filter as a method call
 */ function translateFiltersIntoMethods(key, query) {
    if (query === '' || query === '*') {
        return 'select(*)';
    }
    if (key === 'select') {
        return `select(${query})`;
    }
    if (key === 'or' || key.endsWith('.or')) {
        return `${key}${query}`;
    }
    const [filter, ...value] = query.split('.');
    let method;
    // Handle optional `configPart` of the filter
    if (filter?.startsWith('fts')) {
        method = 'textSearch';
    } else if (filter?.startsWith('plfts')) {
        method = 'textSearch[plain]';
    } else if (filter?.startsWith('phfts')) {
        method = 'textSearch[phrase]';
    } else if (filter?.startsWith('wfts')) {
        method = 'textSearch[websearch]';
    } else {
        method = filter && FILTER_MAPPINGS[filter] || 'filter';
    }
    return `${method}(${key}, ${value.join('.')})`;
}
function instrumentAuthOperation(operation, isAdmin = false) {
    return new Proxy(operation, {
        apply (target, thisArg, argumentsList) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startSpan"])({
                name: `auth ${isAdmin ? '(admin) ' : ''}${operation.name}`,
                attributes: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.db.supabase',
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'db',
                    'db.system': 'postgresql',
                    'db.operation': `auth.${isAdmin ? 'admin.' : ''}${operation.name}`
                }
            }, (span)=>{
                return Reflect.apply(target, thisArg, argumentsList).then((res)=>{
                    if (res && typeof res === 'object' && 'error' in res && res.error) {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"]
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureException"])(res.error, {
                            mechanism: {
                                handled: false,
                                type: 'auto.db.supabase.auth'
                            }
                        });
                    } else {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_OK"]
                        });
                    }
                    span.end();
                    return res;
                }).catch((err)=>{
                    span.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"]
                    });
                    span.end();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureException"])(err, {
                        mechanism: {
                            handled: false,
                            type: 'auto.db.supabase.auth'
                        }
                    });
                    throw err;
                }).then(...argumentsList);
            });
        }
    });
}
function instrumentSupabaseAuthClient(supabaseClientInstance) {
    const auth = supabaseClientInstance.auth;
    if (!auth || isInstrumented(supabaseClientInstance.auth)) {
        return;
    }
    for (const operation of AUTH_OPERATIONS_TO_INSTRUMENT){
        const authOperation = auth[operation];
        if (!authOperation) {
            continue;
        }
        if (typeof supabaseClientInstance.auth[operation] === 'function') {
            supabaseClientInstance.auth[operation] = instrumentAuthOperation(authOperation);
        }
    }
    for (const operation of AUTH_ADMIN_OPERATIONS_TO_INSTRUMENT){
        const authOperation = auth.admin[operation];
        if (!authOperation) {
            continue;
        }
        if (typeof supabaseClientInstance.auth.admin[operation] === 'function') {
            supabaseClientInstance.auth.admin[operation] = instrumentAuthOperation(authOperation, true);
        }
    }
    markAsInstrumented(supabaseClientInstance.auth);
}
function instrumentSupabaseClientConstructor(SupabaseClient) {
    if (isInstrumented(SupabaseClient.prototype.from)) {
        return;
    }
    SupabaseClient.prototype.from = new Proxy(SupabaseClient.prototype.from, {
        apply (target, thisArg, argumentsList) {
            const rv = Reflect.apply(target, thisArg, argumentsList);
            const PostgRESTQueryBuilder = rv.constructor;
            instrumentPostgRESTQueryBuilder(PostgRESTQueryBuilder);
            return rv;
        }
    });
    markAsInstrumented(SupabaseClient.prototype.from);
}
function instrumentPostgRESTFilterBuilder(PostgRESTFilterBuilder) {
    if (isInstrumented(PostgRESTFilterBuilder.prototype.then)) {
        return;
    }
    PostgRESTFilterBuilder.prototype.then = new Proxy(PostgRESTFilterBuilder.prototype.then, {
        apply (target, thisArg, argumentsList) {
            const operations = DB_OPERATIONS_TO_INSTRUMENT;
            const typedThis = thisArg;
            const operation = extractOperation(typedThis.method, typedThis.headers);
            if (!operations.includes(operation)) {
                return Reflect.apply(target, thisArg, argumentsList);
            }
            if (!typedThis?.url?.pathname || typeof typedThis.url.pathname !== 'string') {
                return Reflect.apply(target, thisArg, argumentsList);
            }
            const pathParts = typedThis.url.pathname.split('/');
            const table = pathParts.length > 0 ? pathParts[pathParts.length - 1] : '';
            const queryItems = [];
            for (const [key, value] of typedThis.url.searchParams.entries()){
                // It's possible to have multiple entries for the same key, eg. `id=eq.7&id=eq.3`,
                // so we need to use array instead of object to collect them.
                queryItems.push(translateFiltersIntoMethods(key, value));
            }
            const body = Object.create(null);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(typedThis.body)) {
                for (const [key, value] of Object.entries(typedThis.body)){
                    body[key] = value;
                }
            }
            // Adding operation to the beginning of the description if it's not a `select` operation
            // For example, it can be an `insert` or `update` operation but the query can be `select(...)`
            // For `select` operations, we don't need repeat it in the description
            const description = `${operation === 'select' ? '' : `${operation}${body ? '(...) ' : ''}`}${queryItems.join(' ')} from(${table})`;
            const attributes = {
                'db.table': table,
                'db.schema': typedThis.schema,
                'db.url': typedThis.url.origin,
                'db.sdk': typedThis.headers['X-Client-Info'],
                'db.system': 'postgresql',
                'db.operation': operation,
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.db.supabase',
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'db'
            };
            if (queryItems.length) {
                attributes['db.query'] = queryItems;
            }
            if (Object.keys(body).length) {
                attributes['db.body'] = body;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startSpan"])({
                name: description,
                attributes
            }, (span)=>{
                return Reflect.apply(target, thisArg, []).then((res)=>{
                    if (span) {
                        if (res && typeof res === 'object' && 'status' in res) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(span, res.status || 500);
                        }
                        span.end();
                    }
                    if (res.error) {
                        const err = new Error(res.error.message);
                        if (res.error.code) {
                            err.code = res.error.code;
                        }
                        if (res.error.details) {
                            err.details = res.error.details;
                        }
                        const supabaseContext = {};
                        if (queryItems.length) {
                            supabaseContext.query = queryItems;
                        }
                        if (Object.keys(body).length) {
                            supabaseContext.body = body;
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureException"])(err, (scope)=>{
                            scope.addEventProcessor((e)=>{
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(e, {
                                    handled: false,
                                    type: 'auto.db.supabase.postgres'
                                });
                                return e;
                            });
                            scope.setContext('supabase', supabaseContext);
                            return scope;
                        });
                    }
                    const breadcrumb = {
                        type: 'supabase',
                        category: `db.${operation}`,
                        message: description
                    };
                    const data = {};
                    if (queryItems.length) {
                        data.query = queryItems;
                    }
                    if (Object.keys(body).length) {
                        data.body = body;
                    }
                    if (Object.keys(data).length) {
                        breadcrumb.data = data;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb);
                    return res;
                }, (err)=>{
                    // TODO: shouldn't we capture this error?
                    if (span) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(span, 500);
                        span.end();
                    }
                    throw err;
                }).then(...argumentsList);
            });
        }
    });
    markAsInstrumented(PostgRESTFilterBuilder.prototype.then);
}
function instrumentPostgRESTQueryBuilder(PostgRESTQueryBuilder) {
    // We need to wrap _all_ operations despite them sharing the same `PostgRESTFilterBuilder`
    // constructor, as we don't know which method will be called first, and we don't want to miss any calls.
    for (const operation of DB_OPERATIONS_TO_INSTRUMENT){
        if (isInstrumented(PostgRESTQueryBuilder.prototype[operation])) {
            continue;
        }
        PostgRESTQueryBuilder.prototype[operation] = new Proxy(PostgRESTQueryBuilder.prototype[operation], {
            apply (target, thisArg, argumentsList) {
                const rv = Reflect.apply(target, thisArg, argumentsList);
                const PostgRESTFilterBuilder = rv.constructor;
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`Instrumenting ${operation} operation's PostgRESTFilterBuilder`);
                instrumentPostgRESTFilterBuilder(PostgRESTFilterBuilder);
                return rv;
            }
        });
        markAsInstrumented(PostgRESTQueryBuilder.prototype[operation]);
    }
}
const instrumentSupabaseClient = (supabaseClient)=>{
    if (!supabaseClient) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('Supabase integration was not installed because no Supabase client was provided.');
        return;
    }
    const SupabaseClientConstructor = supabaseClient.constructor === Function ? supabaseClient : supabaseClient.constructor;
    instrumentSupabaseClientConstructor(SupabaseClientConstructor);
    instrumentSupabaseAuthClient(supabaseClient);
};
const INTEGRATION_NAME = 'Supabase';
const _supabaseIntegration = (supabaseClient)=>{
    return {
        setupOnce () {
            instrumentSupabaseClient(supabaseClient);
        },
        name: INTEGRATION_NAME
    };
};
const supabaseIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])((options)=>{
    return _supabaseIntegration(options.supabaseClient);
});
;
 //# sourceMappingURL=supabase.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/moduleMetadata.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "moduleMetadataIntegration",
    ()=>moduleMetadataIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/metadata.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [client] (ecmascript)");
;
;
;
/**
 * Adds module metadata to stack frames.
 *
 * Metadata can be injected by the Sentry bundler plugins using the `moduleMetadata` config option.
 *
 * When this integration is added, the metadata passed to the bundler plugin is added to the stack frames of all events
 * under the `module_metadata` property. This can be used to help in tagging or routing of events from different teams
 * our sources
 */ const moduleMetadataIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'ModuleMetadata',
        setup (client) {
            // We need to strip metadata from stack frames before sending them to Sentry since these are client side only.
            client.on('beforeEnvelope', (envelope)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forEachEnvelopeItem"])(envelope, (item, type)=>{
                    if (type === 'event') {
                        const event = Array.isArray(item) ? item[1] : undefined;
                        if (event) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripMetadataFromStackFrames"])(event);
                            item[1] = event;
                        }
                    }
                });
            });
            client.on('applyFrameMetadata', (event)=>{
                // Only apply stack frame metadata to error events
                if (event.type) {
                    return;
                }
                const stackParser = client.getOptions().stackParser;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addMetadataToStackFrames"])(stackParser, event);
            });
        }
    };
});
;
 //# sourceMappingURL=moduleMetadata.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/third-party-errors-filter.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "thirdPartyErrorFilterIntegration",
    ()=>thirdPartyErrorFilterIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/metadata.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [client] (ecmascript)");
;
;
;
;
/**
 * This integration allows you to filter out, or tag error events that do not come from user code marked with a bundle key via the Sentry bundler plugins.
 */ const thirdPartyErrorFilterIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])((options)=>{
    return {
        name: 'ThirdPartyErrorsFilter',
        setup (client) {
            // We need to strip metadata from stack frames before sending them to Sentry since these are client side only.
            client.on('beforeEnvelope', (envelope)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forEachEnvelopeItem"])(envelope, (item, type)=>{
                    if (type === 'event') {
                        const event = Array.isArray(item) ? item[1] : undefined;
                        if (event) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripMetadataFromStackFrames"])(event);
                            item[1] = event;
                        }
                    }
                });
            });
            client.on('applyFrameMetadata', (event)=>{
                // Only apply stack frame metadata to error events
                if (event.type) {
                    return;
                }
                const stackParser = client.getOptions().stackParser;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addMetadataToStackFrames"])(stackParser, event);
            });
        },
        processEvent (event) {
            const frameKeys = getBundleKeysForAllFramesWithFilenames(event, options.ignoreSentryInternalFrames);
            if (frameKeys) {
                const arrayMethod = options.behaviour === 'drop-error-if-contains-third-party-frames' || options.behaviour === 'apply-tag-if-contains-third-party-frames' ? 'some' : 'every';
                const behaviourApplies = frameKeys[arrayMethod]((keys)=>!keys.some((key)=>options.filterKeys.includes(key)));
                if (behaviourApplies) {
                    const shouldDrop = options.behaviour === 'drop-error-if-contains-third-party-frames' || options.behaviour === 'drop-error-if-exclusively-contains-third-party-frames';
                    if (shouldDrop) {
                        return null;
                    } else {
                        event.tags = {
                            ...event.tags,
                            third_party_code: true
                        };
                    }
                }
            }
            return event;
        }
    };
});
/**
 * Checks if a stack frame is a Sentry internal frame by strictly matching:
 * 1. The frame must be the last frame in the stack
 * 2. The filename must indicate the internal helpers file
 * 3. The context_line must contain the exact pattern "fn.apply(this, wrappedArguments)"
 * 4. The comment pattern "Attempt to invoke user-land function" must be present in pre_context
 *
 */ function isSentryInternalFrame(frame, frameIndex) {
    // Only match the last frame (index 0 in reversed stack)
    if (frameIndex !== 0 || !frame.context_line || !frame.filename) {
        return false;
    }
    if (!frame.filename.includes('sentry') || !frame.filename.includes('helpers') || // Filename would look something like this: 'node_modules/@sentry/browser/build/npm/esm/helpers.js'
    !frame.context_line.includes(SENTRY_INTERNAL_FN_APPLY) // Must have context_line with the exact fn.apply pattern
    ) {
        return false;
    }
    // Check pre_context array for comment pattern
    if (frame.pre_context) {
        const len = frame.pre_context.length;
        for(let i = 0; i < len; i++){
            if (frame.pre_context[i]?.includes(SENTRY_INTERNAL_COMMENT)) {
                return true;
            }
        }
    }
    return false;
}
function getBundleKeysForAllFramesWithFilenames(event, ignoreSentryInternalFrames) {
    const frames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFramesFromEvent"])(event);
    if (!frames) {
        return undefined;
    }
    return frames.filter((frame, index)=>{
        // Exclude frames without a filename
        if (!frame.filename) {
            return false;
        }
        // Exclude frames without location info, since these are likely native code or built-ins.
        // JS frames have lineno/colno, WASM frames have instruction_addr instead.
        if (frame.lineno == null && frame.colno == null && frame.instruction_addr == null) {
            return false;
        }
        // Optionally ignore Sentry internal frames
        return !ignoreSentryInternalFrames || !isSentryInternalFrame(frame, index);
    }).map((frame)=>{
        if (!frame.module_metadata) {
            return [];
        }
        return Object.keys(frame.module_metadata).filter((key)=>key.startsWith(BUNDLER_PLUGIN_APP_KEY_PREFIX)).map((key)=>key.slice(BUNDLER_PLUGIN_APP_KEY_PREFIX.length));
    });
}
const BUNDLER_PLUGIN_APP_KEY_PREFIX = '_sentryBundlerPluginAppKey:';
const SENTRY_INTERNAL_COMMENT = 'Attempt to invoke user-land function';
const SENTRY_INTERNAL_FN_APPLY = 'fn.apply(this, wrappedArguments)';
;
 //# sourceMappingURL=third-party-errors-filter.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/zoderrors.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyZodErrorsToEvent",
    ()=>applyZodErrorsToEvent,
    "flattenIssue",
    ()=>flattenIssue,
    "flattenIssuePath",
    ()=>flattenIssuePath,
    "formatIssueMessage",
    ()=>formatIssueMessage,
    "zodErrorsIntegration",
    ()=>zodErrorsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [client] (ecmascript)");
;
;
;
const DEFAULT_LIMIT = 10;
const INTEGRATION_NAME = 'ZodErrors';
/**
 * Simplified ZodIssue type definition
 */ function originalExceptionIsZodError(originalException) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isError"])(originalException) && originalException.name === 'ZodError' && Array.isArray(originalException.issues);
}
/**
 * Formats child objects or arrays to a string
 * that is preserved when sent to Sentry.
 *
 * Without this, we end up with something like this in Sentry:
 *
 * [
 *  [Object],
 *  [Object],
 *  [Object],
 *  [Object]
 * ]
 */ function flattenIssue(issue) {
    return {
        ...issue,
        path: 'path' in issue && Array.isArray(issue.path) ? issue.path.join('.') : undefined,
        keys: 'keys' in issue ? JSON.stringify(issue.keys) : undefined,
        unionErrors: 'unionErrors' in issue ? JSON.stringify(issue.unionErrors) : undefined
    };
}
/**
 * Takes ZodError issue path array and returns a flattened version as a string.
 * This makes it easier to display paths within a Sentry error message.
 *
 * Array indexes are normalized to reduce duplicate entries
 *
 * @param path ZodError issue path
 * @returns flattened path
 *
 * @example
 * flattenIssuePath([0, 'foo', 1, 'bar']) // -> '<array>.foo.<array>.bar'
 */ function flattenIssuePath(path) {
    return path.map((p)=>{
        if (typeof p === 'number') {
            return '<array>';
        } else {
            return p;
        }
    }).join('.');
}
/**
 * Zod error message is a stringified version of ZodError.issues
 * This doesn't display well in the Sentry UI. Replace it with something shorter.
 */ function formatIssueMessage(zodError) {
    const errorKeyMap = new Set();
    for (const iss of zodError.issues){
        const issuePath = flattenIssuePath(iss.path);
        if (issuePath.length > 0) {
            errorKeyMap.add(issuePath);
        }
    }
    const errorKeys = Array.from(errorKeyMap);
    if (errorKeys.length === 0) {
        // If there are no keys, then we're likely validating the root
        // variable rather than a key within an object. This attempts
        // to extract what type it was that failed to validate.
        // For example, z.string().parse(123) would return "string" here.
        let rootExpectedType = 'variable';
        if (zodError.issues.length > 0) {
            const iss = zodError.issues[0];
            if (iss !== undefined && 'expected' in iss && typeof iss.expected === 'string') {
                rootExpectedType = iss.expected;
            }
        }
        return `Failed to validate ${rootExpectedType}`;
    }
    return `Failed to validate keys: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["truncate"])(errorKeys.join(', '), 100)}`;
}
/**
 * Applies ZodError issues to an event extra and replaces the error message
 */ function applyZodErrorsToEvent(limit, saveZodIssuesAsAttachment = false, event, hint) {
    if (!event.exception?.values || !hint.originalException || !originalExceptionIsZodError(hint.originalException) || hint.originalException.issues.length === 0) {
        return event;
    }
    try {
        const issuesToFlatten = saveZodIssuesAsAttachment ? hint.originalException.issues : hint.originalException.issues.slice(0, limit);
        const flattenedIssues = issuesToFlatten.map(flattenIssue);
        if (saveZodIssuesAsAttachment) {
            // Sometimes having the full error details can be helpful.
            // Attachments have much higher limits, so we can include the full list of issues.
            if (!Array.isArray(hint.attachments)) {
                hint.attachments = [];
            }
            hint.attachments.push({
                filename: 'zod_issues.json',
                data: JSON.stringify({
                    issues: flattenedIssues
                })
            });
        }
        return {
            ...event,
            exception: {
                ...event.exception,
                values: [
                    {
                        ...event.exception.values[0],
                        value: formatIssueMessage(hint.originalException)
                    },
                    ...event.exception.values.slice(1)
                ]
            },
            extra: {
                ...event.extra,
                'zoderror.issues': flattenedIssues.slice(0, limit)
            }
        };
    } catch (e) {
        // Hopefully we never throw errors here, but record it
        // with the event just in case.
        return {
            ...event,
            extra: {
                ...event.extra,
                'zoderrors sentry integration parse error': {
                    message: 'an exception was thrown while processing ZodError within applyZodErrorsToEvent()',
                    error: e instanceof Error ? `${e.name}: ${e.message}\n${e.stack}` : 'unknown'
                }
            }
        };
    }
}
const _zodErrorsIntegration = (options = {})=>{
    const limit = options.limit ?? DEFAULT_LIMIT;
    return {
        name: INTEGRATION_NAME,
        processEvent (originalEvent, hint) {
            const processedEvent = applyZodErrorsToEvent(limit, options.saveZodIssuesAsAttachment, originalEvent, hint);
            return processedEvent;
        }
    };
};
/**
 * Sentry integration to process Zod errors, making them easier to work with in Sentry.
 */ const zodErrorsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_zodErrorsIntegration);
;
 //# sourceMappingURL=zoderrors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/featureFlags/growthbook.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "growthbookIntegration",
    ()=>growthbookIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/featureFlags.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [client] (ecmascript)");
;
;
;
/**
 * Sentry integration for capturing feature flag evaluations from GrowthBook.
 *
 * Only boolean results are captured at this time.
 *
 * @example
 * ```typescript
 * import { GrowthBook } from '@growthbook/growthbook';
 * import * as Sentry from '@sentry/browser'; // or '@sentry/node'
 *
 * Sentry.init({
 *   dsn: 'your-dsn',
 *   integrations: [
 *     Sentry.growthbookIntegration({ growthbookClass: GrowthBook })
 *   ]
 * });
 * ```
 */ const growthbookIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(({ growthbookClass })=>{
    return {
        name: 'GrowthBook',
        setupOnce () {
            const proto = growthbookClass.prototype;
            // Type guard and wrap isOn
            if (typeof proto.isOn === 'function') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(proto, 'isOn', _wrapAndCaptureBooleanResult);
            }
            // Type guard and wrap getFeatureValue
            if (typeof proto.getFeatureValue === 'function') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(proto, 'getFeatureValue', _wrapAndCaptureBooleanResult);
            }
        },
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
function _wrapAndCaptureBooleanResult(original) {
    return function(...args) {
        const flagName = args[0];
        const result = original.apply(this, args);
        if (typeof flagName === 'string' && typeof result === 'boolean') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(flagName, result);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(flagName, result);
        }
        return result;
    };
}
;
 //# sourceMappingURL=growthbook.js.map
}),
]);

//# debugId=f3db6641-ff5c-f39c-6dea-aa7348179d69
//# sourceMappingURL=11ab0_%40sentry_core_build_esm_integrations_f69e7edb._.js.map