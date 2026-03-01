(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/36318_@sentry_core_build_esm_integrations_4620c811._.js",
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/dedupe.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_shouldDropEvent",
    ()=>_shouldDropEvent,
    "dedupeIntegration",
    ()=>dedupeIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/stacktrace.js [instrumentation-edge] (ecmascript)");
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn('Event dropped due to being a duplicate of previously captured event.');
                    return null;
                }
            } catch  {} // eslint-disable-line no-empty
            return previousEvent = currentEvent;
        }
    };
};
/**
 * Deduplication filter.
 */ const dedupeIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(_dedupeIntegration);
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
    let currentFrames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getFramesFromEvent"])(currentEvent);
    let previousFrames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getFramesFromEvent"])(previousEvent);
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/eventFilters.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventFiltersIntegration",
    ()=>eventFiltersIntegration,
    "inboundFiltersIntegration",
    ()=>inboundFiltersIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/eventUtils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/misc.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/string.js [instrumentation-edge] (ecmascript)");
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
 */ const eventFiltersIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])((options = {})=>{
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
 */ const inboundFiltersIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])((options = {})=>{
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
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}`);
            return true;
        }
        if (_isUselessError(event)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}`);
            return true;
        }
        if (_isDeniedUrl(event, options.denyUrls)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}.\nUrl: ${_getEventFilterUrl(event)}`);
            return true;
        }
        if (!_isAllowedUrl(event, options.allowUrls)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}.\nUrl: ${_getEventFilterUrl(event)}`);
            return true;
        }
    } else if (event.type === 'transaction') {
        // Filter transactions
        if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}`);
            return true;
        }
    }
    return false;
}
function _isIgnoredError(event, ignoreErrors) {
    if (!ignoreErrors?.length) {
        return false;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getPossibleEventMessages"])(event).some((message)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(message, ignoreErrors));
}
function _isIgnoredTransaction(event, ignoreTransactions) {
    if (!ignoreTransactions?.length) {
        return false;
    }
    const name = event.transaction;
    return name ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(name, ignoreTransactions) : false;
}
function _isDeniedUrl(event, denyUrls) {
    if (!denyUrls?.length) {
        return false;
    }
    const url = _getEventFilterUrl(event);
    return !url ? false : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(url, denyUrls);
}
function _isAllowedUrl(event, allowUrls) {
    if (!allowUrls?.length) {
        return true;
    }
    const url = _getEventFilterUrl(event);
    return !url ? true : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(url, allowUrls);
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
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].error(`Cannot extract url for event ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getEventDescription"])(event)}`);
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/functiontostring.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functionToStringIntegration",
    ()=>functionToStringIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/object.js [instrumentation-edge] (ecmascript)");
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
                    const originalFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getOriginalFunction"])(this);
                    const context = SETUP_CLIENTS.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])()) && originalFunction !== undefined ? originalFunction : this;
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
 */ const functionToStringIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(_functionToStringIntegration);
;
 //# sourceMappingURL=functiontostring.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/conversationId.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "conversationIdIntegration",
    ()=>conversationIdIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
;
;
;
const INTEGRATION_NAME = 'ConversationId';
const _conversationIdIntegration = ()=>{
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            client.on('spanStart', (span)=>{
                const scopeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getCurrentScope"])().getScopeData();
                const isolationScopeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getIsolationScope"])().getScopeData();
                const conversationId = scopeData.conversationId || isolationScopeData.conversationId;
                if (conversationId) {
                    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_CONVERSATION_ID_ATTRIBUTE"], conversationId);
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
 */ const conversationIdIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(_conversationIdIntegration);
;
 //# sourceMappingURL=conversationId.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/linkederrors.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "linkedErrorsIntegration",
    ()=>linkedErrorsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$aggregate$2d$errors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/aggregate-errors.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/eventbuilder.js [instrumentation-edge] (ecmascript)");
;
;
;
const DEFAULT_KEY = 'cause';
const DEFAULT_LIMIT = 5;
const INTEGRATION_NAME = 'LinkedErrors';
const _linkedErrorsIntegration = (options = {})=>{
    const limit = options.limit || DEFAULT_LIMIT;
    const key = options.key || DEFAULT_KEY;
    return {
        name: INTEGRATION_NAME,
        preprocessEvent (event, hint, client) {
            const options = client.getOptions();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$aggregate$2d$errors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["applyAggregateErrorsToEvent"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["exceptionFromError"], options.stackParser, key, limit, event, hint);
        }
    };
};
const linkedErrorsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(_linkedErrorsIntegration);
;
 //# sourceMappingURL=linkederrors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/console.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addConsoleBreadcrumb",
    ()=>addConsoleBreadcrumb,
    "consoleIntegration",
    ()=>consoleIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/breadcrumbs.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/instrument/console.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/severity.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/string.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/worldwide.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
;
;
;
const INTEGRATION_NAME = 'Console';
/**
 * Captures calls to the `console` API as breadcrumbs in Sentry.
 *
 * By default the integration instruments `console.debug`, `console.info`, `console.warn`, `console.error`,
 * `console.log`, `console.trace`, and `console.assert`. You can use the `levels` option to customize which
 * levels are captured.
 *
 * @example
 *
 * ```js
 * Sentry.init({
 *   integrations: [Sentry.consoleIntegration({ levels: ['error', 'warn'] })],
 * });
 * ```
 */ const consoleIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])((options = {})=>{
    const levels = new Set(options.levels || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CONSOLE_LEVELS"]);
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addConsoleInstrumentationHandler"])(({ args, level })=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])() !== client || !levels.has(level)) {
                    return;
                }
                addConsoleBreadcrumb(level, args);
            });
        }
    };
});
/**
 * Capture a console breadcrumb.
 *
 * Exported just for tests.
 */ function addConsoleBreadcrumb(level, args) {
    const breadcrumb = {
        category: 'console',
        data: {
            arguments: args,
            logger: 'console'
        },
        level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["severityLevelFromString"])(level),
        message: formatConsoleArgs(args)
    };
    if (level === 'assert') {
        if (args[0] === false) {
            const assertionArgs = args.slice(1);
            breadcrumb.message = assertionArgs.length > 0 ? `Assertion failed: ${formatConsoleArgs(assertionArgs)}` : 'Assertion failed';
            breadcrumb.data.arguments = assertionArgs;
        } else {
            // Don't capture a breadcrumb for passed assertions
            return;
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, {
        input: args,
        level
    });
}
function formatConsoleArgs(values) {
    return 'util' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].util.format === 'function' ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].util.format(...values) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["safeJoin"])(values, ' ');
}
;
 //# sourceMappingURL=console.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/requestdata.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requestDataIntegration",
    ()=>requestDataIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$cookie$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/cookie.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$vendor$2f$getIpAddress$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/vendor/getIpAddress.js [instrumentation-edge] (ecmascript)");
;
;
;
// TODO(v11): Change defaults based on `sendDefaultPii`
const DEFAULT_INCLUDE = {
    cookies: true,
    data: true,
    headers: true,
    query_string: true,
    url: true
};
const INTEGRATION_NAME = 'RequestData';
const _requestDataIntegration = (options = {})=>{
    const include = {
        ...DEFAULT_INCLUDE,
        ...options.include
    };
    return {
        name: INTEGRATION_NAME,
        processEvent (event, _hint, client) {
            const { sdkProcessingMetadata = {} } = event;
            const { normalizedRequest, ipAddress } = sdkProcessingMetadata;
            const includeWithDefaultPiiApplied = {
                ...include,
                ip: include.ip ?? client.getOptions().sendDefaultPii
            };
            if (normalizedRequest) {
                addNormalizedRequestDataToEvent(event, normalizedRequest, {
                    ipAddress
                }, includeWithDefaultPiiApplied);
            }
            return event;
        }
    };
};
/**
 * Add data about a request to an event. Primarily for use in Node-based SDKs, but included in `@sentry/core`
 * so it can be used in cross-platform SDKs like `@sentry/nextjs`.
 */ const requestDataIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(_requestDataIntegration);
/**
 * Add already normalized request data to an event.
 * This mutates the passed in event.
 */ function addNormalizedRequestDataToEvent(event, req, // Data that should not go into `event.request` but is somehow related to requests
additionalData, include) {
    event.request = {
        ...event.request,
        ...extractNormalizedRequestData(req, include)
    };
    if (include.ip) {
        const ip = req.headers && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$vendor$2f$getIpAddress$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClientIPAddress"])(req.headers) || additionalData.ipAddress;
        if (ip) {
            event.user = {
                ...event.user,
                ip_address: ip
            };
        }
    }
}
function extractNormalizedRequestData(normalizedRequest, include) {
    const requestData = {};
    const headers = {
        ...normalizedRequest.headers
    };
    if (include.headers) {
        requestData.headers = headers;
        // Remove the Cookie header in case cookie data should not be included in the event
        if (!include.cookies) {
            delete headers.cookie;
        }
        // Remove IP headers in case IP data should not be included in the event
        if (!include.ip) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$vendor$2f$getIpAddress$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ipHeaderNames"].forEach((ipHeaderName)=>{
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete headers[ipHeaderName];
            });
        }
    }
    requestData.method = normalizedRequest.method;
    if (include.url) {
        requestData.url = normalizedRequest.url;
    }
    if (include.cookies) {
        const cookies = normalizedRequest.cookies || (headers?.cookie ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$cookie$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["parseCookie"])(headers.cookie) : undefined);
        requestData.cookies = cookies || {};
    }
    if (include.query_string) {
        requestData.query_string = normalizedRequest.query_string;
    }
    if (include.data) {
        requestData.data = normalizedRequest.data;
    }
    return requestData;
}
;
 //# sourceMappingURL=requestdata.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/captureconsole.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "captureConsoleIntegration",
    ()=>captureConsoleIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/instrument/console.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/misc.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/severity.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/string.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/worldwide.js [instrumentation-edge] (ecmascript)");
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
    const levels = options.levels || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CONSOLE_LEVELS"];
    const handled = options.handled ?? true;
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            if (!('console' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"])) {
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addConsoleInstrumentationHandler"])(({ args, level })=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])() !== client || !levels.includes(level)) {
                    return;
                }
                consoleHandler(args, level, handled);
            });
        }
    };
};
/**
 * Send Console API calls as Sentry Events.
 */ const captureConsoleIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(_captureConsoleIntegration);
function consoleHandler(args, level, handled) {
    const severityLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["severityLevelFromString"])(level);
    /*
    We create this error here already to attach a stack trace to captured messages,
    if users set `attachStackTrace` to `true` in Sentry.init.
    We do this here already because we want to minimize the number of Sentry SDK stack frames
    within the error. Technically, Client.captureMessage will also do it but this happens several
    stack frames deeper.
  */ const syntheticException = new Error();
    const captureContext = {
        level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["severityLevelFromString"])(level),
        extra: {
            arguments: args
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        scope.addEventProcessor((event)=>{
            event.logger = 'console';
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
                handled,
                type: 'auto.core.capture_console'
            });
            return event;
        });
        if (level === 'assert') {
            if (!args[0]) {
                const message = `Assertion failed: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["safeJoin"])(args.slice(1), ' ') || 'console.assert'}`;
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, captureContext);
            return;
        }
        const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["safeJoin"])(args, ' ');
        scope.captureMessage(message, severityLevel, {
            captureContext,
            syntheticException
        });
    });
}
;
 //# sourceMappingURL=captureconsole.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/consola.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConsolaReporter",
    ()=>createConsolaReporter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/logs/internal.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/logs/utils.js [instrumentation-edge] (ecmascript)");
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
            const client = providedClient || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
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
                messageParts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["formatConsoleArgs"])(args, normalizeDepth, normalizeMaxBreadth));
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_INTERNAL_captureLog"])({
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/extraerrordata.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extraErrorDataIntegration",
    ()=>extraErrorDataIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/is.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/normalize.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/object.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/string.js [instrumentation-edge] (ecmascript)");
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
const extraErrorDataIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(_extraErrorDataIntegration);
function _enhanceEventWithErrorData(event, hint = {}, depth, captureErrorCause, maxValueLength) {
    if (!hint.originalException || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isError"])(hint.originalException)) {
        return event;
    }
    const exceptionName = hint.originalException.name || hint.originalException.constructor.name;
    const errorData = _extractErrorData(hint.originalException, captureErrorCause, maxValueLength);
    if (errorData) {
        const contexts = {
            ...event.contexts
        };
        const normalizedErrorData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["normalize"])(errorData, depth);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isPlainObject"])(normalizedErrorData)) {
            // We mark the error data as "already normalized" here, because we don't want other normalization procedures to
            // potentially truncate the data we just already normalized, with a certain depth setting.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(normalizedErrorData, '__sentry_skip_normalization__', true);
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
            extraErrorInfo[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isError"])(value) || typeof value === 'string' ? maxValueLength ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["truncate"])(`${value}`, maxValueLength) : `${value}` : value;
        }
        // Error.cause is a standard property that is non enumerable, we therefore need to access it separately.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
        if (captureErrorCause && error.cause !== undefined) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isError"])(error.cause)) {
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
                extraErrorInfo[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isError"])(value) ? value.toString() : value;
            }
        }
        return extraErrorInfo;
    } catch (oO) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].error('Unable to extract extra data from the Error object:', oO);
    }
    return null;
}
;
 //# sourceMappingURL=extraerrordata.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/featureFlags/featureFlagsIntegration.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "featureFlagsIntegration",
    ()=>featureFlagsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/featureFlags.js [instrumentation-edge] (ecmascript)");
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
 */ const featureFlagsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'FeatureFlags',
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        },
        addFeatureFlag (name, value) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(name, value);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(name, value);
        }
    };
});
;
 //# sourceMappingURL=featureFlagsIntegration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/supabase.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/breadcrumbs.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/misc.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/is.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)");
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
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpan"])({
                name: `auth ${isAdmin ? '(admin) ' : ''}${operation.name}`,
                attributes: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.db.supabase',
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'db',
                    'db.system': 'postgresql',
                    'db.operation': `auth.${isAdmin ? 'admin.' : ''}${operation.name}`
                }
            }, (span)=>{
                return Reflect.apply(target, thisArg, argumentsList).then((res)=>{
                    if (res && typeof res === 'object' && 'error' in res && res.error) {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"]
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(res.error, {
                            mechanism: {
                                handled: false,
                                type: 'auto.db.supabase.auth'
                            }
                        });
                    } else {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_OK"]
                        });
                    }
                    span.end();
                    return res;
                }).catch((err)=>{
                    span.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"]
                    });
                    span.end();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(err, {
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
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isPlainObject"])(typedThis.body)) {
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
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.db.supabase',
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'db'
            };
            if (queryItems.length) {
                attributes['db.query'] = queryItems;
            }
            if (Object.keys(body).length) {
                attributes['db.body'] = body;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpan"])({
                name: description,
                attributes
            }, (span)=>{
                return Reflect.apply(target, thisArg, []).then((res)=>{
                    if (span) {
                        if (res && typeof res === 'object' && 'status' in res) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setHttpStatus"])(span, res.status || 500);
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
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(err, (scope)=>{
                            scope.addEventProcessor((e)=>{
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(e, {
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
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb);
                    return res;
                }, (err)=>{
                    // TODO: shouldn't we capture this error?
                    if (span) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setHttpStatus"])(span, 500);
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
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log(`Instrumenting ${operation} operation's PostgRESTFilterBuilder`);
                instrumentPostgRESTFilterBuilder(PostgRESTFilterBuilder);
                return rv;
            }
        });
        markAsInstrumented(PostgRESTQueryBuilder.prototype[operation]);
    }
}
const instrumentSupabaseClient = (supabaseClient)=>{
    if (!supabaseClient) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn('Supabase integration was not installed because no Supabase client was provided.');
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
const supabaseIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])((options)=>{
    return _supabaseIntegration(options.supabaseClient);
});
;
 //# sourceMappingURL=supabase.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/moduleMetadata.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "moduleMetadataIntegration",
    ()=>moduleMetadataIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/metadata.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/envelope.js [instrumentation-edge] (ecmascript)");
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
 */ const moduleMetadataIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'ModuleMetadata',
        setup (client) {
            // We need to strip metadata from stack frames before sending them to Sentry since these are client side only.
            client.on('beforeEnvelope', (envelope)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["forEachEnvelopeItem"])(envelope, (item, type)=>{
                    if (type === 'event') {
                        const event = Array.isArray(item) ? item[1] : undefined;
                        if (event) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["stripMetadataFromStackFrames"])(event);
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
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addMetadataToStackFrames"])(stackParser, event);
            });
        }
    };
});
;
 //# sourceMappingURL=moduleMetadata.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/rewriteframes.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateIteratee",
    ()=>generateIteratee,
    "rewriteFramesIntegration",
    ()=>rewriteFramesIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$path$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/path.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/worldwide.js [instrumentation-edge] (ecmascript)");
;
;
;
const INTEGRATION_NAME = 'RewriteFrames';
/**
 * Rewrite event frames paths.
 */ const rewriteFramesIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])((options = {})=>{
    const root = options.root;
    const prefix = options.prefix || 'app:///';
    const isBrowser = 'window' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"] && !!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].window;
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
                const base = root ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$path$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["relative"])(root, filename) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$path$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["basename"])(filename);
                frame.filename = `${prefix}${base}`;
            }
        }
        return frame;
    };
}
;
 //# sourceMappingURL=rewriteframes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/errorCapture.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "captureError",
    ()=>captureError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
;
;
;
;
/**
 * Safe error capture utilities for MCP server instrumentation
 *
 * Ensures error reporting never interferes with MCP server operation.
 * All capture operations are wrapped in try-catch to prevent side effects.
 */ /**
 * Captures an error without affecting MCP server operation.
 *
 * The active span already contains all MCP context (method, tool, arguments, etc.)
 * @param error - Error to capture
 * @param errorType - Classification of error type for filtering
 * @param extraData - Additional context data to include
 */ function captureError(error, errorType, extraData) {
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            return;
        }
        const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getActiveSpan"])();
        if (activeSpan?.isRecording()) {
            activeSpan.setStatus({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                message: 'internal_error'
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
            mechanism: {
                type: 'auto.ai.mcp_server',
                handled: false,
                data: {
                    error_type: errorType || 'handler_execution',
                    ...extraData
                }
            }
        });
    } catch  {
    // noop
    }
}
;
 //# sourceMappingURL=errorCapture.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/handlers.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapAllMCPHandlers",
    ()=>wrapAllMCPHandlers,
    "wrapPromptHandlers",
    ()=>wrapPromptHandlers,
    "wrapResourceHandlers",
    ()=>wrapResourceHandlers,
    "wrapToolHandlers",
    ()=>wrapToolHandlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/object.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/errorCapture.js [instrumentation-edge] (ecmascript)");
;
;
;
;
/**
 * Handler method wrapping for MCP server instrumentation
 *
 * Provides automatic error capture and span correlation for tool, resource,
 * and prompt handlers.
 */ /**
 * Generic function to wrap MCP server method handlers
 * @internal
 * @param serverInstance - MCP server instance
 * @param methodName - Method name to wrap (tool, resource, prompt)
 */ function wrapMethodHandler(serverInstance, methodName) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["fill"])(serverInstance, methodName, (originalMethod)=>{
        return function(name, ...args) {
            const handler = args[args.length - 1];
            if (typeof handler !== 'function') {
                return originalMethod.call(this, name, ...args);
            }
            const wrappedHandler = createWrappedHandler(handler, methodName, name);
            return originalMethod.call(this, name, ...args.slice(0, -1), wrappedHandler);
        };
    });
}
/**
 * Creates a wrapped handler with span correlation and error capture
 * @internal
 * @param originalHandler - Original handler function
 * @param methodName - MCP method name
 * @param handlerName - Handler identifier
 * @returns Wrapped handler function
 */ function createWrappedHandler(originalHandler, methodName, handlerName) {
    return function(...handlerArgs) {
        try {
            return createErrorCapturingHandler.call(this, originalHandler, methodName, handlerName, handlerArgs);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn('MCP handler wrapping failed:', error);
            return originalHandler.apply(this, handlerArgs);
        }
    };
}
/**
 * Creates an error-capturing wrapper for handler execution
 * @internal
 * @param originalHandler - Original handler function
 * @param methodName - MCP method name
 * @param handlerName - Handler identifier
 * @param handlerArgs - Handler arguments
 * @param extraHandlerData - Additional handler context
 * @returns Handler execution result
 */ function createErrorCapturingHandler(originalHandler, methodName, handlerName, handlerArgs) {
    try {
        const result = originalHandler.apply(this, handlerArgs);
        if (result && typeof result === 'object' && typeof result.then === 'function') {
            return Promise.resolve(result).catch((error)=>{
                captureHandlerError(error, methodName, handlerName);
                throw error;
            });
        }
        return result;
    } catch (error) {
        captureHandlerError(error, methodName, handlerName);
        throw error;
    }
}
/**
 * Captures handler execution errors based on handler type
 * @internal
 * @param error - Error to capture
 * @param methodName - MCP method name
 * @param handlerName - Handler identifier
 */ function captureHandlerError(error, methodName, handlerName) {
    try {
        const extraData = {};
        if (methodName === 'tool') {
            extraData.tool_name = handlerName;
            if (error.name === 'ProtocolValidationError' || error.message.includes('validation') || error.message.includes('protocol')) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureError"])(error, 'validation', extraData);
            } else if (error.name === 'ServerTimeoutError' || error.message.includes('timed out') || error.message.includes('timeout')) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureError"])(error, 'timeout', extraData);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureError"])(error, 'tool_execution', extraData);
            }
        } else if (methodName === 'resource') {
            extraData.resource_uri = handlerName;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureError"])(error, 'resource_execution', extraData);
        } else if (methodName === 'prompt') {
            extraData.prompt_name = handlerName;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureError"])(error, 'prompt_execution', extraData);
        }
    } catch (captureErr) {
    // noop
    }
}
/**
 * Wraps tool handlers to associate them with request spans
 * @param serverInstance - MCP server instance
 */ function wrapToolHandlers(serverInstance) {
    wrapMethodHandler(serverInstance, 'tool');
}
/**
 * Wraps resource handlers to associate them with request spans
 * @param serverInstance - MCP server instance
 */ function wrapResourceHandlers(serverInstance) {
    wrapMethodHandler(serverInstance, 'resource');
}
/**
 * Wraps prompt handlers to associate them with request spans
 * @param serverInstance - MCP server instance
 */ function wrapPromptHandlers(serverInstance) {
    wrapMethodHandler(serverInstance, 'prompt');
}
/**
 * Wraps all MCP handler types (tool, resource, prompt) for span correlation
 * @param serverInstance - MCP server instance
 */ function wrapAllMCPHandlers(serverInstance) {
    wrapToolHandlers(serverInstance);
    wrapResourceHandlers(serverInstance);
    wrapPromptHandlers(serverInstance);
}
;
 //# sourceMappingURL=handlers.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLIENT_ADDRESS_ATTRIBUTE",
    ()=>CLIENT_ADDRESS_ATTRIBUTE,
    "CLIENT_PORT_ATTRIBUTE",
    ()=>CLIENT_PORT_ATTRIBUTE,
    "MCP_FUNCTION_ORIGIN_VALUE",
    ()=>MCP_FUNCTION_ORIGIN_VALUE,
    "MCP_LOGGING_DATA_TYPE_ATTRIBUTE",
    ()=>MCP_LOGGING_DATA_TYPE_ATTRIBUTE,
    "MCP_LOGGING_LEVEL_ATTRIBUTE",
    ()=>MCP_LOGGING_LEVEL_ATTRIBUTE,
    "MCP_LOGGING_LOGGER_ATTRIBUTE",
    ()=>MCP_LOGGING_LOGGER_ATTRIBUTE,
    "MCP_LOGGING_MESSAGE_ATTRIBUTE",
    ()=>MCP_LOGGING_MESSAGE_ATTRIBUTE,
    "MCP_METHOD_NAME_ATTRIBUTE",
    ()=>MCP_METHOD_NAME_ATTRIBUTE,
    "MCP_NOTIFICATION_CLIENT_TO_SERVER_OP_VALUE",
    ()=>MCP_NOTIFICATION_CLIENT_TO_SERVER_OP_VALUE,
    "MCP_NOTIFICATION_ORIGIN_VALUE",
    ()=>MCP_NOTIFICATION_ORIGIN_VALUE,
    "MCP_NOTIFICATION_SERVER_TO_CLIENT_OP_VALUE",
    ()=>MCP_NOTIFICATION_SERVER_TO_CLIENT_OP_VALUE,
    "MCP_PROMPT_NAME_ATTRIBUTE",
    ()=>MCP_PROMPT_NAME_ATTRIBUTE,
    "MCP_PROMPT_RESULT_DESCRIPTION_ATTRIBUTE",
    ()=>MCP_PROMPT_RESULT_DESCRIPTION_ATTRIBUTE,
    "MCP_PROMPT_RESULT_MESSAGE_COUNT_ATTRIBUTE",
    ()=>MCP_PROMPT_RESULT_MESSAGE_COUNT_ATTRIBUTE,
    "MCP_PROTOCOL_VERSION_ATTRIBUTE",
    ()=>MCP_PROTOCOL_VERSION_ATTRIBUTE,
    "MCP_REQUEST_ARGUMENT",
    ()=>MCP_REQUEST_ARGUMENT,
    "MCP_REQUEST_ID_ATTRIBUTE",
    ()=>MCP_REQUEST_ID_ATTRIBUTE,
    "MCP_RESOURCE_URI_ATTRIBUTE",
    ()=>MCP_RESOURCE_URI_ATTRIBUTE,
    "MCP_ROUTE_SOURCE_VALUE",
    ()=>MCP_ROUTE_SOURCE_VALUE,
    "MCP_SERVER_NAME_ATTRIBUTE",
    ()=>MCP_SERVER_NAME_ATTRIBUTE,
    "MCP_SERVER_OP_VALUE",
    ()=>MCP_SERVER_OP_VALUE,
    "MCP_SERVER_TITLE_ATTRIBUTE",
    ()=>MCP_SERVER_TITLE_ATTRIBUTE,
    "MCP_SERVER_VERSION_ATTRIBUTE",
    ()=>MCP_SERVER_VERSION_ATTRIBUTE,
    "MCP_SESSION_ID_ATTRIBUTE",
    ()=>MCP_SESSION_ID_ATTRIBUTE,
    "MCP_TOOL_NAME_ATTRIBUTE",
    ()=>MCP_TOOL_NAME_ATTRIBUTE,
    "MCP_TOOL_RESULT_CONTENT_COUNT_ATTRIBUTE",
    ()=>MCP_TOOL_RESULT_CONTENT_COUNT_ATTRIBUTE,
    "MCP_TOOL_RESULT_IS_ERROR_ATTRIBUTE",
    ()=>MCP_TOOL_RESULT_IS_ERROR_ATTRIBUTE,
    "MCP_TRANSPORT_ATTRIBUTE",
    ()=>MCP_TRANSPORT_ATTRIBUTE,
    "NETWORK_PROTOCOL_VERSION_ATTRIBUTE",
    ()=>NETWORK_PROTOCOL_VERSION_ATTRIBUTE,
    "NETWORK_TRANSPORT_ATTRIBUTE",
    ()=>NETWORK_TRANSPORT_ATTRIBUTE
]);
/**
 * Essential MCP attribute constants for Sentry instrumentation
 *
 * Based on OpenTelemetry MCP semantic conventions
 * @see https://github.com/open-telemetry/semantic-conventions/blob/3097fb0af5b9492b0e3f55dc5f6c21a3dc2be8df/docs/gen-ai/mcp.md
 */ // =============================================================================
// CORE MCP ATTRIBUTES
// =============================================================================
/** The name of the request or notification method */ const MCP_METHOD_NAME_ATTRIBUTE = 'mcp.method.name';
/** JSON-RPC request identifier for the request. Unique within the MCP session. */ const MCP_REQUEST_ID_ATTRIBUTE = 'mcp.request.id';
/** Identifies the MCP session */ const MCP_SESSION_ID_ATTRIBUTE = 'mcp.session.id';
/** Transport method used for MCP communication */ const MCP_TRANSPORT_ATTRIBUTE = 'mcp.transport';
// =============================================================================
// SERVER ATTRIBUTES
// =============================================================================
/** Name of the MCP server application */ const MCP_SERVER_NAME_ATTRIBUTE = 'mcp.server.name';
/** Display title of the MCP server application */ const MCP_SERVER_TITLE_ATTRIBUTE = 'mcp.server.title';
/** Version of the MCP server application */ const MCP_SERVER_VERSION_ATTRIBUTE = 'mcp.server.version';
/** MCP protocol version used in the session */ const MCP_PROTOCOL_VERSION_ATTRIBUTE = 'mcp.protocol.version';
// =============================================================================
// METHOD-SPECIFIC ATTRIBUTES
// =============================================================================
/** Name of the tool being called */ const MCP_TOOL_NAME_ATTRIBUTE = 'mcp.tool.name';
/** The resource URI being accessed */ const MCP_RESOURCE_URI_ATTRIBUTE = 'mcp.resource.uri';
/** Name of the prompt template */ const MCP_PROMPT_NAME_ATTRIBUTE = 'mcp.prompt.name';
// =============================================================================
// TOOL RESULT ATTRIBUTES
// =============================================================================
/** Whether a tool execution resulted in an error */ const MCP_TOOL_RESULT_IS_ERROR_ATTRIBUTE = 'mcp.tool.result.is_error';
/** Number of content items in the tool result */ const MCP_TOOL_RESULT_CONTENT_COUNT_ATTRIBUTE = 'mcp.tool.result.content_count';
// =============================================================================
// PROMPT RESULT ATTRIBUTES
// =============================================================================
/** Description of the prompt result */ const MCP_PROMPT_RESULT_DESCRIPTION_ATTRIBUTE = 'mcp.prompt.result.description';
/** Number of messages in the prompt result */ const MCP_PROMPT_RESULT_MESSAGE_COUNT_ATTRIBUTE = 'mcp.prompt.result.message_count';
// =============================================================================
// REQUEST ARGUMENT ATTRIBUTES
// =============================================================================
/** Prefix for MCP request argument prefix for each argument */ const MCP_REQUEST_ARGUMENT = 'mcp.request.argument';
// =============================================================================
// LOGGING ATTRIBUTES
// =============================================================================
/** Log level for MCP logging operations */ const MCP_LOGGING_LEVEL_ATTRIBUTE = 'mcp.logging.level';
/** Logger name for MCP logging operations */ const MCP_LOGGING_LOGGER_ATTRIBUTE = 'mcp.logging.logger';
/** Data type of the logged message */ const MCP_LOGGING_DATA_TYPE_ATTRIBUTE = 'mcp.logging.data_type';
/** Log message content */ const MCP_LOGGING_MESSAGE_ATTRIBUTE = 'mcp.logging.message';
// =============================================================================
// NETWORK ATTRIBUTES (OpenTelemetry Standard)
// =============================================================================
/** OSI transport layer protocol */ const NETWORK_TRANSPORT_ATTRIBUTE = 'network.transport';
/** The version of JSON RPC protocol used */ const NETWORK_PROTOCOL_VERSION_ATTRIBUTE = 'network.protocol.version';
/** Client address - domain name if available without reverse DNS lookup; otherwise, IP address or Unix domain socket name */ const CLIENT_ADDRESS_ATTRIBUTE = 'client.address';
/** Client port number */ const CLIENT_PORT_ATTRIBUTE = 'client.port';
// =============================================================================
// SENTRY-SPECIFIC MCP ATTRIBUTE VALUES
// =============================================================================
/** Sentry operation value for MCP server spans */ const MCP_SERVER_OP_VALUE = 'mcp.server';
/**
 * Sentry operation value for client-to-server notifications
 * Following OpenTelemetry MCP semantic conventions
 */ const MCP_NOTIFICATION_CLIENT_TO_SERVER_OP_VALUE = 'mcp.notification.client_to_server';
/**
 * Sentry operation value for server-to-client notifications
 * Following OpenTelemetry MCP semantic conventions
 */ const MCP_NOTIFICATION_SERVER_TO_CLIENT_OP_VALUE = 'mcp.notification.server_to_client';
/** Sentry origin value for MCP function spans */ const MCP_FUNCTION_ORIGIN_VALUE = 'auto.function.mcp_server';
/** Sentry origin value for MCP notification spans */ const MCP_NOTIFICATION_ORIGIN_VALUE = 'auto.mcp.notification';
/** Sentry source value for MCP route spans */ const MCP_ROUTE_SOURCE_VALUE = 'route';
;
 //# sourceMappingURL=attributes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/validation.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isJsonRpcNotification",
    ()=>isJsonRpcNotification,
    "isJsonRpcRequest",
    ()=>isJsonRpcRequest,
    "isJsonRpcResponse",
    ()=>isJsonRpcResponse,
    "isValidContentItem",
    ()=>isValidContentItem,
    "validateMcpServerInstance",
    ()=>validateMcpServerInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
;
;
/**
 * Message validation functions for MCP server instrumentation
 *
 * Provides JSON-RPC 2.0 message type validation and MCP server instance validation.
 */ /**
 * Validates if a message is a JSON-RPC request
 * @param message - Message to validate
 * @returns True if message is a JSON-RPC request
 */ function isJsonRpcRequest(message) {
    return typeof message === 'object' && message !== null && 'jsonrpc' in message && message.jsonrpc === '2.0' && 'method' in message && 'id' in message;
}
/**
 * Validates if a message is a JSON-RPC notification
 * @param message - Message to validate
 * @returns True if message is a JSON-RPC notification
 */ function isJsonRpcNotification(message) {
    return typeof message === 'object' && message !== null && 'jsonrpc' in message && message.jsonrpc === '2.0' && 'method' in message && !('id' in message);
}
/**
 * Validates if a message is a JSON-RPC response
 * @param message - Message to validate
 * @returns True if message is a JSON-RPC response
 */ function isJsonRpcResponse(message) {
    return typeof message === 'object' && message !== null && 'jsonrpc' in message && message.jsonrpc === '2.0' && 'id' in message && ('result' in message || 'error' in message);
}
/**
 * Validates MCP server instance with type checking
 * @param instance - Object to validate as MCP server instance
 * @returns True if instance has required MCP server methods
 */ function validateMcpServerInstance(instance) {
    if (typeof instance === 'object' && instance !== null && 'resource' in instance && 'tool' in instance && 'prompt' in instance && 'connect' in instance) {
        return true;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn('Did not patch MCP server. Interface is incompatible.');
    return false;
}
/**
 * Check if the item is a valid content item
 * @param item - The item to check
 * @returns True if the item is a valid content item, false otherwise
 */ function isValidContentItem(item) {
    return item != null && typeof item === 'object';
}
;
 //# sourceMappingURL=validation.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/resultExtraction.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractPromptResultAttributes",
    ()=>extractPromptResultAttributes,
    "extractToolResultAttributes",
    ()=>extractToolResultAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/validation.js [instrumentation-edge] (ecmascript)");
;
;
/**
 * Result extraction functions for MCP server instrumentation
 *
 * Handles extraction of attributes from tool and prompt execution results.
 */ /**
 * Build attributes for tool result content items
 * @param content - Array of content items from tool result
 * @param includeContent - Whether to include actual content (text, URIs) or just metadata
 * @returns Attributes extracted from each content item
 */ function buildAllContentItemAttributes(content, includeContent) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_TOOL_RESULT_CONTENT_COUNT_ATTRIBUTE"]]: content.length
    };
    for (const [i, item] of content.entries()){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(item)) {
            continue;
        }
        const prefix = content.length === 1 ? 'mcp.tool.result' : `mcp.tool.result.${i}`;
        if (typeof item.type === 'string') {
            attributes[`${prefix}.content_type`] = item.type;
        }
        if (includeContent) {
            const safeSet = (key, value)=>{
                if (typeof value === 'string') {
                    attributes[`${prefix}.${key}`] = value;
                }
            };
            safeSet('mime_type', item.mimeType);
            safeSet('uri', item.uri);
            safeSet('name', item.name);
            if (typeof item.text === 'string') {
                attributes[`${prefix}.content`] = item.text;
            }
            if (typeof item.data === 'string') {
                attributes[`${prefix}.data_size`] = item.data.length;
            }
            const resource = item.resource;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(resource)) {
                safeSet('resource_uri', resource.uri);
                safeSet('resource_mime_type', resource.mimeType);
            }
        }
    }
    return attributes;
}
/**
 * Extract tool result attributes for span instrumentation
 * @param result - Tool execution result
 * @param recordOutputs - Whether to include actual content or just metadata (counts, error status)
 * @returns Attributes extracted from tool result content
 */ function extractToolResultAttributes(result, recordOutputs) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(result)) {
        return {};
    }
    const attributes = Array.isArray(result.content) ? buildAllContentItemAttributes(result.content, recordOutputs) : {};
    if (typeof result.isError === 'boolean') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_TOOL_RESULT_IS_ERROR_ATTRIBUTE"]] = result.isError;
    }
    return attributes;
}
/**
 * Extract prompt result attributes for span instrumentation
 * @param result - Prompt execution result
 * @param recordOutputs - Whether to include actual content or just metadata (counts)
 * @returns Attributes extracted from prompt result
 */ function extractPromptResultAttributes(result, recordOutputs) {
    const attributes = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(result)) {
        return attributes;
    }
    if (recordOutputs && typeof result.description === 'string') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_PROMPT_RESULT_DESCRIPTION_ATTRIBUTE"]] = result.description;
    }
    if (Array.isArray(result.messages)) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_PROMPT_RESULT_MESSAGE_COUNT_ATTRIBUTE"]] = result.messages.length;
        if (recordOutputs) {
            const messages = result.messages;
            for (const [i, message] of messages.entries()){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(message)) {
                    continue;
                }
                const prefix = messages.length === 1 ? 'mcp.prompt.result' : `mcp.prompt.result.${i}`;
                const safeSet = (key, value)=>{
                    if (typeof value === 'string') {
                        const attrName = messages.length === 1 ? `${prefix}.message_${key}` : `${prefix}.${key}`;
                        attributes[attrName] = value;
                    }
                };
                safeSet('role', message.role);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(message.content)) {
                    const content = message.content;
                    if (typeof content.text === 'string') {
                        const attrName = messages.length === 1 ? `${prefix}.message_content` : `${prefix}.content`;
                        attributes[attrName] = content.text;
                    }
                }
            }
        }
    }
    return attributes;
}
;
 //# sourceMappingURL=resultExtraction.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/sessionManagement.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanupSessionDataForTransport",
    ()=>cleanupSessionDataForTransport,
    "getClientInfoForTransport",
    ()=>getClientInfoForTransport,
    "getProtocolVersionForTransport",
    ()=>getProtocolVersionForTransport,
    "getSessionDataForTransport",
    ()=>getSessionDataForTransport,
    "storeSessionDataForTransport",
    ()=>storeSessionDataForTransport,
    "updateSessionDataForTransport",
    ()=>updateSessionDataForTransport
]);
/**
 * Session-scoped data storage for stateful transports (with sessionId)
 * @internal Using sessionId as key handles wrapper transport patterns
 */ const sessionToSessionData = new Map();
/**
 * Transport-scoped data storage fallback for stateless transports (no sessionId)
 * @internal WeakMap allows automatic cleanup when transport is garbage collected
 */ const statelessSessionData = new WeakMap();
/**
 * Gets session data for a transport, checking sessionId first then fallback
 * @internal
 */ function getSessionData(transport) {
    const sessionId = transport.sessionId;
    if (sessionId) {
        return sessionToSessionData.get(sessionId);
    }
    return statelessSessionData.get(transport);
}
/**
 * Sets session data for a transport, using sessionId when available
 * @internal
 */ function setSessionData(transport, data) {
    const sessionId = transport.sessionId;
    if (sessionId) {
        sessionToSessionData.set(sessionId, data);
    } else {
        statelessSessionData.set(transport, data);
    }
}
/**
 * Stores session data for a transport
 * @param transport - MCP transport instance
 * @param sessionData - Session data to store
 */ function storeSessionDataForTransport(transport, sessionData) {
    // For stateful transports, always store (sessionId is the key)
    // For stateless transports, also store (transport instance is the key)
    setSessionData(transport, sessionData);
}
/**
 * Updates session data for a transport (merges with existing data)
 * @param transport - MCP transport instance
 * @param partialSessionData - Partial session data to merge with existing data
 */ function updateSessionDataForTransport(transport, partialSessionData) {
    const existingData = getSessionData(transport) || {};
    setSessionData(transport, {
        ...existingData,
        ...partialSessionData
    });
}
/**
 * Retrieves client information for a transport
 * @param transport - MCP transport instance
 * @returns Client information if available
 */ function getClientInfoForTransport(transport) {
    return getSessionData(transport)?.clientInfo;
}
/**
 * Retrieves protocol version for a transport
 * @param transport - MCP transport instance
 * @returns Protocol version if available
 */ function getProtocolVersionForTransport(transport) {
    return getSessionData(transport)?.protocolVersion;
}
/**
 * Retrieves full session data for a transport
 * @param transport - MCP transport instance
 * @returns Complete session data if available
 */ function getSessionDataForTransport(transport) {
    return getSessionData(transport);
}
/**
 * Cleans up session data for a specific transport (when that transport closes)
 * @param transport - MCP transport instance
 */ function cleanupSessionDataForTransport(transport) {
    const sessionId = transport.sessionId;
    if (sessionId) {
        sessionToSessionData.delete(sessionId);
    }
// Note: WeakMap entries are automatically cleaned up when transport is GC'd
// No explicit delete needed for statelessSessionData
}
;
 //# sourceMappingURL=sessionManagement.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/sessionExtraction.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildClientAttributesFromInfo",
    ()=>buildClientAttributesFromInfo,
    "buildServerAttributesFromInfo",
    ()=>buildServerAttributesFromInfo,
    "buildTransportAttributes",
    ()=>buildTransportAttributes,
    "extractClientInfo",
    ()=>extractClientInfo,
    "extractSessionDataFromInitializeRequest",
    ()=>extractSessionDataFromInitializeRequest,
    "extractSessionDataFromInitializeResponse",
    ()=>extractSessionDataFromInitializeResponse,
    "getClientAttributes",
    ()=>getClientAttributes,
    "getServerAttributes",
    ()=>getServerAttributes,
    "getTransportTypes",
    ()=>getTransportTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionManagement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/sessionManagement.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/validation.js [instrumentation-edge] (ecmascript)");
;
;
;
/**
 * Session and party info extraction functions for MCP server instrumentation
 *
 * Handles extraction of client/server info and session data from MCP messages.
 */ /**
 * Extracts and validates PartyInfo from an unknown object
 * @param obj - Unknown object that might contain party info
 * @returns Validated PartyInfo object with only string properties
 */ function extractPartyInfo(obj) {
    const partyInfo = {};
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(obj)) {
        if (typeof obj.name === 'string') {
            partyInfo.name = obj.name;
        }
        if (typeof obj.title === 'string') {
            partyInfo.title = obj.title;
        }
        if (typeof obj.version === 'string') {
            partyInfo.version = obj.version;
        }
    }
    return partyInfo;
}
/**
 * Extracts session data from "initialize" requests
 * @param request - JSON-RPC "initialize" request containing client info and protocol version
 * @returns Session data extracted from request parameters including protocol version and client info
 */ function extractSessionDataFromInitializeRequest(request) {
    const sessionData = {};
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(request.params)) {
        if (typeof request.params.protocolVersion === 'string') {
            sessionData.protocolVersion = request.params.protocolVersion;
        }
        if (request.params.clientInfo) {
            sessionData.clientInfo = extractPartyInfo(request.params.clientInfo);
        }
    }
    return sessionData;
}
/**
 * Extracts session data from "initialize" response
 * @param result - "initialize" response result containing server info and protocol version
 * @returns Partial session data extracted from response including protocol version and server info
 */ function extractSessionDataFromInitializeResponse(result) {
    const sessionData = {};
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(result)) {
        if (typeof result.protocolVersion === 'string') {
            sessionData.protocolVersion = result.protocolVersion;
        }
        if (result.serverInfo) {
            sessionData.serverInfo = extractPartyInfo(result.serverInfo);
        }
    }
    return sessionData;
}
/**
 * Build client attributes from stored client info
 * @param transport - MCP transport instance
 * @returns Client attributes for span instrumentation
 */ function getClientAttributes(transport) {
    const clientInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionManagement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClientInfoForTransport"])(transport);
    const attributes = {};
    if (clientInfo?.name) {
        attributes['mcp.client.name'] = clientInfo.name;
    }
    if (clientInfo?.title) {
        attributes['mcp.client.title'] = clientInfo.title;
    }
    if (clientInfo?.version) {
        attributes['mcp.client.version'] = clientInfo.version;
    }
    return attributes;
}
/**
 * Build client attributes from PartyInfo directly
 * @param clientInfo - Client party info
 * @returns Client attributes for span instrumentation
 */ function buildClientAttributesFromInfo(clientInfo) {
    const attributes = {};
    if (clientInfo?.name) {
        attributes['mcp.client.name'] = clientInfo.name;
    }
    if (clientInfo?.title) {
        attributes['mcp.client.title'] = clientInfo.title;
    }
    if (clientInfo?.version) {
        attributes['mcp.client.version'] = clientInfo.version;
    }
    return attributes;
}
/**
 * Build server attributes from stored server info
 * @param transport - MCP transport instance
 * @returns Server attributes for span instrumentation
 */ function getServerAttributes(transport) {
    const serverInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionManagement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSessionDataForTransport"])(transport)?.serverInfo;
    const attributes = {};
    if (serverInfo?.name) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SERVER_NAME_ATTRIBUTE"]] = serverInfo.name;
    }
    if (serverInfo?.title) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SERVER_TITLE_ATTRIBUTE"]] = serverInfo.title;
    }
    if (serverInfo?.version) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SERVER_VERSION_ATTRIBUTE"]] = serverInfo.version;
    }
    return attributes;
}
/**
 * Build server attributes from PartyInfo directly
 * @param serverInfo - Server party info
 * @returns Server attributes for span instrumentation
 */ function buildServerAttributesFromInfo(serverInfo) {
    const attributes = {};
    if (serverInfo?.name) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SERVER_NAME_ATTRIBUTE"]] = serverInfo.name;
    }
    if (serverInfo?.title) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SERVER_TITLE_ATTRIBUTE"]] = serverInfo.title;
    }
    if (serverInfo?.version) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SERVER_VERSION_ATTRIBUTE"]] = serverInfo.version;
    }
    return attributes;
}
/**
 * Extracts client connection info from extra handler data
 * @param extra - Extra handler data containing connection info
 * @returns Client address and port information
 */ function extractClientInfo(extra) {
    return {
        address: extra?.requestInfo?.remoteAddress || extra?.clientAddress || extra?.request?.ip || extra?.request?.connection?.remoteAddress,
        port: extra?.requestInfo?.remotePort || extra?.clientPort || extra?.request?.connection?.remotePort
    };
}
/**
 * Extracts transport types based on transport constructor name
 * @param transport - MCP transport instance
 * @returns Transport type mapping for span attributes
 */ function getTransportTypes(transport) {
    if (!transport?.constructor) {
        return {
            mcpTransport: 'unknown',
            networkTransport: 'unknown'
        };
    }
    const transportName = typeof transport.constructor?.name === 'string' ? transport.constructor.name : 'unknown';
    let networkTransport = 'unknown';
    const lowerTransportName = transportName.toLowerCase();
    if (lowerTransportName.includes('stdio')) {
        networkTransport = 'pipe';
    } else if (lowerTransportName.includes('http') || lowerTransportName.includes('sse')) {
        networkTransport = 'tcp';
    }
    return {
        mcpTransport: transportName,
        networkTransport
    };
}
/**
 * Build transport and network attributes
 * @param transport - MCP transport instance
 * @param extra - Optional extra handler data
 * @returns Transport attributes for span instrumentation
 * @note sessionId may be undefined during initial setup - session should be established by client during initialize flow
 */ function buildTransportAttributes(transport, extra) {
    const sessionId = transport && 'sessionId' in transport ? transport.sessionId : undefined;
    const clientInfo = extra ? extractClientInfo(extra) : {};
    const { mcpTransport, networkTransport } = getTransportTypes(transport);
    const clientAttributes = getClientAttributes(transport);
    const serverAttributes = getServerAttributes(transport);
    const protocolVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionManagement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getProtocolVersionForTransport"])(transport);
    const attributes = {
        ...sessionId && {
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SESSION_ID_ATTRIBUTE"]]: sessionId
        },
        ...clientInfo.address && {
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CLIENT_ADDRESS_ATTRIBUTE"]]: clientInfo.address
        },
        ...clientInfo.port && {
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CLIENT_PORT_ATTRIBUTE"]]: clientInfo.port
        },
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_TRANSPORT_ATTRIBUTE"]]: mcpTransport,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NETWORK_TRANSPORT_ATTRIBUTE"]]: networkTransport,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NETWORK_PROTOCOL_VERSION_ATTRIBUTE"]]: '2.0',
        ...protocolVersion && {
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_PROTOCOL_VERSION_ATTRIBUTE"]]: protocolVersion
        },
        ...clientAttributes,
        ...serverAttributes
    };
    return attributes;
}
;
 //# sourceMappingURL=sessionExtraction.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/correlation.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanupPendingSpansForTransport",
    ()=>cleanupPendingSpansForTransport,
    "completeSpanWithResults",
    ()=>completeSpanWithResults,
    "storeSpanForRequest",
    ()=>storeSpanForRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$resultExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/resultExtraction.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/sessionExtraction.js [instrumentation-edge] (ecmascript)");
;
;
;
;
/**
 * Request-span correlation system for MCP server instrumentation
 *
 * Handles mapping requestId to span data for correlation with handler execution.
 *
 * Uses sessionId as the primary key for stateful transports. This handles the wrapper
 * transport pattern (e.g., NodeStreamableHTTPServerTransport wrapping WebStandardStreamableHTTPServerTransport)
 * where onmessage and send may receive different `this` values but share the same sessionId.
 *
 * Falls back to WeakMap by transport instance for stateless transports (no sessionId).
 */ /**
 * Session-scoped correlation for stateful transports (with sessionId)
 * @internal Using sessionId as key handles wrapper transport patterns where
 * different transport objects share the same logical session
 */ const sessionToSpanMap = new Map();
/**
 * Transport-scoped correlation fallback for stateless transports (no sessionId)
 * @internal WeakMap allows automatic cleanup when transport is garbage collected
 */ const statelessSpanMap = new WeakMap();
/**
 * Gets or creates the span map for a transport, using sessionId when available
 * @internal
 * @param transport - MCP transport instance
 * @returns Span map for the transport/session
 */ function getOrCreateSpanMap(transport) {
    const sessionId = transport.sessionId;
    if (sessionId) {
        // Stateful transport - use sessionId as key (handles wrapper pattern)
        let spanMap = sessionToSpanMap.get(sessionId);
        if (!spanMap) {
            spanMap = new Map();
            sessionToSpanMap.set(sessionId, spanMap);
        }
        return spanMap;
    }
    // Stateless fallback - use transport instance as key
    let spanMap = statelessSpanMap.get(transport);
    if (!spanMap) {
        spanMap = new Map();
        statelessSpanMap.set(transport, spanMap);
    }
    return spanMap;
}
/**
 * Stores span context for later correlation with handler execution
 * @param transport - MCP transport instance
 * @param requestId - Request identifier
 * @param span - Active span to correlate
 * @param method - MCP method name
 */ function storeSpanForRequest(transport, requestId, span, method) {
    const spanMap = getOrCreateSpanMap(transport);
    spanMap.set(requestId, {
        span,
        method,
        // eslint-disable-next-line @sentry-internal/sdk/no-unsafe-random-apis
        startTime: Date.now()
    });
}
/**
 * Completes span with results and cleans up correlation
 * @param transport - MCP transport instance
 * @param requestId - Request identifier
 * @param result - Execution result for attribute extraction
 * @param options - Resolved MCP options
 */ function completeSpanWithResults(transport, requestId, result, options) {
    const spanMap = getOrCreateSpanMap(transport);
    const spanData = spanMap.get(requestId);
    if (spanData) {
        const { span, method } = spanData;
        if (method === 'initialize') {
            const sessionData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSessionDataFromInitializeResponse"])(result);
            const serverAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildServerAttributesFromInfo"])(sessionData.serverInfo);
            const initAttributes = {
                ...serverAttributes
            };
            if (sessionData.protocolVersion) {
                initAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_PROTOCOL_VERSION_ATTRIBUTE"]] = sessionData.protocolVersion;
            }
            span.setAttributes(initAttributes);
        } else if (method === 'tools/call') {
            const toolAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$resultExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractToolResultAttributes"])(result, options.recordOutputs);
            span.setAttributes(toolAttributes);
        } else if (method === 'prompts/get') {
            const promptAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$resultExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractPromptResultAttributes"])(result, options.recordOutputs);
            span.setAttributes(promptAttributes);
        }
        span.end();
        spanMap.delete(requestId);
    }
}
/**
 * Cleans up pending spans for a specific transport (when that transport closes)
 * @param transport - MCP transport instance
 */ function cleanupPendingSpansForTransport(transport) {
    const sessionId = transport.sessionId;
    // Try sessionId-based cleanup first (for stateful transports)
    if (sessionId) {
        const spanMap = sessionToSpanMap.get(sessionId);
        if (spanMap) {
            for (const [, spanData] of spanMap){
                spanData.span.setStatus({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                    message: 'cancelled'
                });
                spanData.span.end();
            }
            sessionToSpanMap.delete(sessionId);
        }
        return;
    }
    // Fallback to transport-based cleanup (for stateless transports)
    const spanMap = statelessSpanMap.get(transport);
    if (spanMap) {
        for (const [, spanData] of spanMap){
            spanData.span.setStatus({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                message: 'cancelled'
            });
            spanData.span.end();
        }
        spanMap.clear();
    // Note: WeakMap entries are automatically cleaned up when transport is GC'd
    }
}
;
 //# sourceMappingURL=correlation.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/methodConfig.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractTargetInfo",
    ()=>extractTargetInfo,
    "getRequestArguments",
    ()=>getRequestArguments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)");
;
/**
 * Method configuration and request processing for MCP server instrumentation
 */ /**
 * Configuration for MCP methods to extract targets and arguments
 * @internal Maps method names to their extraction configuration
 */ const METHOD_CONFIGS = {
    'tools/call': {
        targetField: 'name',
        targetAttribute: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_TOOL_NAME_ATTRIBUTE"],
        captureArguments: true,
        argumentsField: 'arguments'
    },
    'resources/read': {
        targetField: 'uri',
        targetAttribute: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_RESOURCE_URI_ATTRIBUTE"],
        captureUri: true
    },
    'resources/subscribe': {
        targetField: 'uri',
        targetAttribute: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_RESOURCE_URI_ATTRIBUTE"]
    },
    'resources/unsubscribe': {
        targetField: 'uri',
        targetAttribute: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_RESOURCE_URI_ATTRIBUTE"]
    },
    'prompts/get': {
        targetField: 'name',
        targetAttribute: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_PROMPT_NAME_ATTRIBUTE"],
        captureName: true,
        captureArguments: true,
        argumentsField: 'arguments'
    }
};
/**
 * Extracts target info from method and params based on method type
 * @param method - MCP method name
 * @param params - Method parameters
 * @returns Target name and attributes for span instrumentation
 */ function extractTargetInfo(method, params) {
    const config = METHOD_CONFIGS[method];
    if (!config) {
        return {
            attributes: {}
        };
    }
    const target = config.targetField && typeof params?.[config.targetField] === 'string' ? params[config.targetField] : undefined;
    return {
        target,
        attributes: target && config.targetAttribute ? {
            [config.targetAttribute]: target
        } : {}
    };
}
/**
 * Extracts request arguments based on method type
 * @param method - MCP method name
 * @param params - Method parameters
 * @returns Arguments as span attributes with mcp.request.argument prefix
 */ function getRequestArguments(method, params) {
    const args = {};
    const config = METHOD_CONFIGS[method];
    if (!config) {
        return args;
    }
    if (config.captureArguments && config.argumentsField && params?.[config.argumentsField]) {
        const argumentsObj = params[config.argumentsField];
        if (typeof argumentsObj === 'object' && argumentsObj !== null) {
            for (const [key, value] of Object.entries(argumentsObj)){
                args[`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_REQUEST_ARGUMENT"]}.${key.toLowerCase()}`] = JSON.stringify(value);
            }
        }
    }
    if (config.captureUri && params?.uri) {
        args[`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_REQUEST_ARGUMENT"]}.uri`] = JSON.stringify(params.uri);
    }
    if (config.captureName && params?.name) {
        args[`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_REQUEST_ARGUMENT"]}.name`] = JSON.stringify(params.name);
    }
    return args;
}
;
 //# sourceMappingURL=methodConfig.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributeExtraction.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildTypeSpecificAttributes",
    ()=>buildTypeSpecificAttributes,
    "getNotificationAttributes",
    ()=>getNotificationAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/url.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$methodConfig$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/methodConfig.js [instrumentation-edge] (ecmascript)");
;
;
;
/**
 * Core attribute extraction and building functions for MCP server instrumentation
 */ /**
 * Formats logging data for span attributes
 * @internal
 */ function formatLoggingData(data) {
    return typeof data === 'string' ? data : JSON.stringify(data);
}
/**
 * Extracts additional attributes for specific notification types
 * @param method - Notification method name
 * @param params - Notification parameters
 * @param recordInputs - Whether to include actual content or just metadata
 * @returns Method-specific attributes for span instrumentation
 */ function getNotificationAttributes(method, params, recordInputs) {
    const attributes = {};
    switch(method){
        case 'notifications/cancelled':
            if (params?.requestId) {
                attributes['mcp.cancelled.request_id'] = String(params.requestId);
            }
            if (params?.reason) {
                attributes['mcp.cancelled.reason'] = String(params.reason);
            }
            break;
        case 'notifications/message':
            if (params?.level) {
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_LOGGING_LEVEL_ATTRIBUTE"]] = String(params.level);
            }
            if (params?.logger) {
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_LOGGING_LOGGER_ATTRIBUTE"]] = String(params.logger);
            }
            if (params?.data !== undefined) {
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_LOGGING_DATA_TYPE_ATTRIBUTE"]] = typeof params.data;
                if (recordInputs) {
                    attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_LOGGING_MESSAGE_ATTRIBUTE"]] = formatLoggingData(params.data);
                }
            }
            break;
        case 'notifications/progress':
            if (params?.progressToken) {
                attributes['mcp.progress.token'] = String(params.progressToken);
            }
            if (typeof params?.progress === 'number') {
                attributes['mcp.progress.current'] = params.progress;
            }
            if (typeof params?.total === 'number') {
                attributes['mcp.progress.total'] = params.total;
                if (typeof params?.progress === 'number') {
                    attributes['mcp.progress.percentage'] = params.progress / params.total * 100;
                }
            }
            if (params?.message) {
                attributes['mcp.progress.message'] = String(params.message);
            }
            break;
        case 'notifications/resources/updated':
            if (params?.uri) {
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_RESOURCE_URI_ATTRIBUTE"]] = String(params.uri);
                const urlObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["parseStringToURLObject"])(String(params.uri));
                if (urlObject && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isURLObjectRelative"])(urlObject)) {
                    attributes['mcp.resource.protocol'] = urlObject.protocol.replace(':', '');
                }
            }
            break;
        case 'notifications/initialized':
            attributes['mcp.lifecycle.phase'] = 'initialization_complete';
            attributes['mcp.protocol.ready'] = 1;
            break;
    }
    return attributes;
}
/**
 * Build type-specific attributes based on message type
 * @param type - Span type (request or notification)
 * @param message - JSON-RPC message
 * @param params - Optional parameters for attribute extraction
 * @param recordInputs - Whether to capture input arguments in spans
 * @returns Type-specific attributes for span instrumentation
 */ function buildTypeSpecificAttributes(type, message, params, recordInputs) {
    if (type === 'request') {
        const request = message;
        const targetInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$methodConfig$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractTargetInfo"])(request.method, params || {});
        return {
            ...request.id !== undefined && {
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_REQUEST_ID_ATTRIBUTE"]]: String(request.id)
            },
            ...targetInfo.attributes,
            ...recordInputs ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$methodConfig$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRequestArguments"])(request.method, params || {}) : {}
        };
    }
    return getNotificationAttributes(message.method, params || {}, recordInputs);
}
;
 //# sourceMappingURL=attributeExtraction.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/piiFiltering.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterMcpPiiFromSpanData",
    ()=>filterMcpPiiFromSpanData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)");
;
/**
 * Network PII attributes that should be removed when sendDefaultPii is false
 * @internal
 */ const NETWORK_PII_ATTRIBUTES = new Set([
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CLIENT_ADDRESS_ATTRIBUTE"],
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CLIENT_PORT_ATTRIBUTE"],
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_RESOURCE_URI_ATTRIBUTE"]
]);
/**
 * Checks if an attribute key should be considered network PII.
 *
 * Returns true for:
 * - client.address (IP address)
 * - client.port (port number)
 * - mcp.resource.uri (potentially sensitive URIs)
 *
 * @param key - Attribute key to evaluate
 * @returns true if the attribute should be filtered out (is network PII), false if it should be preserved
 * @internal
 */ function isNetworkPiiAttribute(key) {
    return NETWORK_PII_ATTRIBUTES.has(key);
}
/**
 * Removes network PII attributes from span data when sendDefaultPii is false
 * @param spanData - Raw span attributes
 * @param sendDefaultPii - Whether to include PII data
 * @returns Filtered span attributes
 */ function filterMcpPiiFromSpanData(spanData, sendDefaultPii) {
    if (sendDefaultPii) {
        return spanData;
    }
    return Object.entries(spanData).reduce((acc, [key, value])=>{
        if (!isNetworkPiiAttribute(key)) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
;
 //# sourceMappingURL=piiFiltering.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/spans.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildMcpServerSpanConfig",
    ()=>buildMcpServerSpanConfig,
    "createMcpNotificationSpan",
    ()=>createMcpNotificationSpan,
    "createMcpOutgoingNotificationSpan",
    ()=>createMcpOutgoingNotificationSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributeExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributeExtraction.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$methodConfig$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/methodConfig.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$piiFiltering$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/piiFiltering.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/sessionExtraction.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Span creation and management functions for MCP server instrumentation
 *
 * Provides unified span creation following OpenTelemetry MCP semantic conventions and our opinitionated take on MCP.
 * Handles both request and notification spans with attribute extraction.
 */ /**
 * Creates a span name based on the method and target
 * @internal
 * @param method - MCP method name
 * @param target - Optional target identifier
 * @returns Formatted span name
 */ function createSpanName(method, target) {
    return target ? `${method} ${target}` : method;
}
/**
 * Build Sentry-specific attributes based on span type
 * @internal
 * @param type - Span type configuration
 * @returns Sentry-specific attributes
 */ function buildSentryAttributes(type) {
    let op;
    let origin;
    switch(type){
        case 'request':
            op = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SERVER_OP_VALUE"];
            origin = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_FUNCTION_ORIGIN_VALUE"];
            break;
        case 'notification-incoming':
            op = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_NOTIFICATION_CLIENT_TO_SERVER_OP_VALUE"];
            origin = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_NOTIFICATION_ORIGIN_VALUE"];
            break;
        case 'notification-outgoing':
            op = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_NOTIFICATION_SERVER_TO_CLIENT_OP_VALUE"];
            origin = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_NOTIFICATION_ORIGIN_VALUE"];
            break;
    }
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: op,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: origin,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_ROUTE_SOURCE_VALUE"]
    };
}
/**
 * Unified builder for creating MCP spans
 * @internal
 * @param config - Span configuration
 * @returns Created span
 */ function createMcpSpan(config) {
    const { type, message, transport, extra, callback, options } = config;
    const { method } = message;
    const params = message.params;
    // Determine span name based on type and OTEL conventions
    let spanName;
    if (type === 'request') {
        const targetInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$methodConfig$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractTargetInfo"])(method, params || {});
        spanName = createSpanName(method, targetInfo.target);
    } else {
        // For notifications, use method name directly per OpenTelemetry conventions
        spanName = method;
    }
    const rawAttributes = {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildTransportAttributes"])(transport, extra),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_METHOD_NAME_ATTRIBUTE"]]: method,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributeExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildTypeSpecificAttributes"])(type, message, params, options?.recordInputs),
        ...buildSentryAttributes(type)
    };
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    const sendDefaultPii = Boolean(client?.getOptions().sendDefaultPii);
    const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$piiFiltering$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["filterMcpPiiFromSpanData"])(rawAttributes, sendDefaultPii);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpan"])({
        name: spanName,
        forceTransaction: true,
        attributes
    }, callback);
}
/**
 * Creates a span for incoming MCP notifications
 * @param jsonRpcMessage - Notification message
 * @param transport - MCP transport instance
 * @param extra - Extra handler data
 * @param options - Resolved MCP options
 * @param callback - Span execution callback
 * @returns Span execution result
 */ function createMcpNotificationSpan(jsonRpcMessage, transport, extra, options, callback) {
    return createMcpSpan({
        type: 'notification-incoming',
        message: jsonRpcMessage,
        transport,
        extra,
        callback,
        options
    });
}
/**
 * Creates a span for outgoing MCP notifications
 * @param jsonRpcMessage - Notification message
 * @param transport - MCP transport instance
 * @param options - Resolved MCP options
 * @param callback - Span execution callback
 * @returns Span execution result
 */ function createMcpOutgoingNotificationSpan(jsonRpcMessage, transport, options, callback) {
    return createMcpSpan({
        type: 'notification-outgoing',
        message: jsonRpcMessage,
        transport,
        options,
        callback
    });
}
/**
 * Builds span configuration for MCP server requests
 * @param jsonRpcMessage - Request message
 * @param transport - MCP transport instance
 * @param extra - Optional extra handler data
 * @param options - Resolved MCP options
 * @returns Span configuration object
 */ function buildMcpServerSpanConfig(jsonRpcMessage, transport, extra, options) {
    const { method } = jsonRpcMessage;
    const params = jsonRpcMessage.params;
    const targetInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$methodConfig$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractTargetInfo"])(method, params || {});
    const spanName = createSpanName(method, targetInfo.target);
    const rawAttributes = {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildTransportAttributes"])(transport, extra),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_METHOD_NAME_ATTRIBUTE"]]: method,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributeExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildTypeSpecificAttributes"])('request', jsonRpcMessage, params, options?.recordInputs),
        ...buildSentryAttributes('request')
    };
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    const sendDefaultPii = Boolean(client?.getOptions().sendDefaultPii);
    const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$piiFiltering$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["filterMcpPiiFromSpanData"])(rawAttributes, sendDefaultPii);
    return {
        name: spanName,
        op: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_SERVER_OP_VALUE"],
        forceTransaction: true,
        attributes
    };
}
;
 //# sourceMappingURL=spans.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/transport.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapTransportError",
    ()=>wrapTransportError,
    "wrapTransportOnClose",
    ()=>wrapTransportOnClose,
    "wrapTransportOnMessage",
    ()=>wrapTransportOnMessage,
    "wrapTransportSend",
    ()=>wrapTransportSend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/object.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$correlation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/correlation.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/errorCapture.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/sessionExtraction.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionManagement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/sessionManagement.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$spans$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/spans.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/validation.js [instrumentation-edge] (ecmascript)");
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
/**
 * Transport layer instrumentation for MCP server
 *
 * Handles message interception and response correlation.
 * @see https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
 */ /**
 * Wraps transport.onmessage to create spans for incoming messages.
 * For "initialize" requests, extracts and stores client info and protocol version
 * in the session data for the transport.
 * @param transport - MCP transport instance to wrap
 * @param options - Resolved MCP options
 */ function wrapTransportOnMessage(transport, options) {
    if (transport.onmessage) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["fill"])(transport, 'onmessage', (originalOnMessage)=>{
            return function(message, extra) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isJsonRpcRequest"])(message)) {
                    const isInitialize = message.method === 'initialize';
                    let initSessionData;
                    if (isInitialize) {
                        try {
                            initSessionData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSessionDataFromInitializeRequest"])(message);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionManagement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["storeSessionDataForTransport"])(this, initSessionData);
                        } catch  {
                        // noop
                        }
                    }
                    const isolationScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getIsolationScope"])().clone();
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withIsolationScope"])(isolationScope, ()=>{
                        const spanConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$spans$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildMcpServerSpanConfig"])(message, this, extra, options);
                        const span = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startInactiveSpan"])(spanConfig);
                        // For initialize requests, add client info directly to span (works even for stateless transports)
                        if (isInitialize && initSessionData) {
                            span.setAttributes({
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildClientAttributesFromInfo"])(initSessionData.clientInfo),
                                ...initSessionData.protocolVersion && {
                                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["MCP_PROTOCOL_VERSION_ATTRIBUTE"]]: initSessionData.protocolVersion
                                }
                            });
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$correlation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["storeSpanForRequest"])(this, message.id, span, message.method);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withActiveSpan"])(span, ()=>{
                            return originalOnMessage.call(this, message, extra);
                        });
                    });
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isJsonRpcNotification"])(message)) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$spans$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createMcpNotificationSpan"])(message, this, extra, options, ()=>{
                        return originalOnMessage.call(this, message, extra);
                    });
                }
                return originalOnMessage.call(this, message, extra);
            };
        });
    }
}
/**
 * Wraps transport.send to handle outgoing messages and response correlation.
 * For "initialize" responses, extracts and stores protocol version and server info
 * in the session data for the transport.
 * @param transport - MCP transport instance to wrap
 * @param options - Resolved MCP options
 */ function wrapTransportSend(transport, options) {
    if (transport.send) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["fill"])(transport, 'send', (originalSend)=>{
            return async function(...args) {
                const [message] = args;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isJsonRpcNotification"])(message)) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$spans$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createMcpOutgoingNotificationSpan"])(message, this, options, ()=>{
                        return originalSend.call(this, ...args);
                    });
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isJsonRpcResponse"])(message)) {
                    if (message.id !== null && message.id !== undefined) {
                        if (message.error) {
                            captureJsonRpcErrorResponse(message.error);
                        }
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isValidContentItem"])(message.result)) {
                            if (message.result.protocolVersion || message.result.serverInfo) {
                                try {
                                    const serverData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionExtraction$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSessionDataFromInitializeResponse"])(message.result);
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionManagement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["updateSessionDataForTransport"])(this, serverData);
                                } catch  {
                                // noop
                                }
                            }
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$correlation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["completeSpanWithResults"])(this, message.id, message.result, options);
                    }
                }
                return originalSend.call(this, ...args);
            };
        });
    }
}
/**
 * Wraps transport.onclose to clean up pending spans for this transport only
 * @param transport - MCP transport instance to wrap
 */ function wrapTransportOnClose(transport) {
    if (transport.onclose) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["fill"])(transport, 'onclose', (originalOnClose)=>{
            return function(...args) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$correlation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["cleanupPendingSpansForTransport"])(this);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$sessionManagement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["cleanupSessionDataForTransport"])(this);
                return originalOnClose.call(this, ...args);
            };
        });
    }
}
/**
 * Wraps transport error handlers to capture connection errors
 * @param transport - MCP transport instance to wrap
 */ function wrapTransportError(transport) {
    if (transport.onerror) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["fill"])(transport, 'onerror', (originalOnError)=>{
            return function(error) {
                captureTransportError(error);
                return originalOnError.call(this, error);
            };
        });
    }
}
/**
 * Captures JSON-RPC error responses for server-side errors.
 * @see https://www.jsonrpc.org/specification#error_object
 * @internal
 * @param errorResponse - JSON-RPC error response
 */ function captureJsonRpcErrorResponse(errorResponse) {
    try {
        if (errorResponse && typeof errorResponse === 'object' && 'code' in errorResponse && 'message' in errorResponse) {
            const jsonRpcError = errorResponse;
            const isServerError = jsonRpcError.code === -32603 || jsonRpcError.code >= -32099 && jsonRpcError.code <= -32000;
            if (isServerError) {
                const error = new Error(jsonRpcError.message);
                error.name = `JsonRpcError_${jsonRpcError.code}`;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureError"])(error, 'protocol');
            }
        }
    } catch  {
    // noop
    }
}
/**
 * Captures transport connection errors
 * @internal
 * @param error - Transport error
 */ function captureTransportError(error) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$errorCapture$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureError"])(error, 'transport');
    } catch  {
    // noop
    }
}
;
 //# sourceMappingURL=transport.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapMcpServerWithSentry",
    ()=>wrapMcpServerWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/object.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$handlers$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/handlers.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$transport$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/transport.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/mcp-server/validation.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
/**
 * Tracks wrapped MCP server instances to prevent double-wrapping
 * @internal
 */ const wrappedMcpServerInstances = new WeakSet();
/**
 * Wraps a MCP Server instance from the `@modelcontextprotocol/sdk` package with Sentry instrumentation.
 *
 * Compatible with versions `^1.9.0` of the `@modelcontextprotocol/sdk` package.
 * Automatically instruments transport methods and handler functions for comprehensive monitoring.
 *
 * @example
 * ```typescript
 * import * as Sentry from '@sentry/core';
 * import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
 * import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
 *
 * // Default: inputs/outputs captured based on sendDefaultPii option
 * const server = Sentry.wrapMcpServerWithSentry(
 *   new McpServer({ name: "my-server", version: "1.0.0" })
 * );
 *
 * // Explicitly control input/output capture
 * const server = Sentry.wrapMcpServerWithSentry(
 *   new McpServer({ name: "my-server", version: "1.0.0" }),
 *   { recordInputs: true, recordOutputs: false }
 * );
 *
 * const transport = new StreamableHTTPServerTransport();
 * await server.connect(transport);
 * ```
 *
 * @param mcpServerInstance - MCP server instance to instrument
 * @param options - Optional configuration for recording inputs and outputs
 * @returns Instrumented server instance (same reference)
 */ function wrapMcpServerWithSentry(mcpServerInstance, options) {
    if (wrappedMcpServerInstances.has(mcpServerInstance)) {
        return mcpServerInstance;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$validation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["validateMcpServerInstance"])(mcpServerInstance)) {
        return mcpServerInstance;
    }
    const serverInstance = mcpServerInstance;
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    const sendDefaultPii = Boolean(client?.getOptions().sendDefaultPii);
    const resolvedOptions = {
        recordInputs: options?.recordInputs ?? sendDefaultPii,
        recordOutputs: options?.recordOutputs ?? sendDefaultPii
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["fill"])(serverInstance, 'connect', (originalConnect)=>{
        return async function(transport, ...restArgs) {
            const result = await originalConnect.call(this, transport, ...restArgs);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$transport$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["wrapTransportOnMessage"])(transport, resolvedOptions);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$transport$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["wrapTransportSend"])(transport, resolvedOptions);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$transport$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["wrapTransportOnClose"])(transport);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$transport$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["wrapTransportError"])(transport);
            return result;
        };
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$mcp$2d$server$2f$handlers$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["wrapAllMCPHandlers"])(serverInstance);
    wrappedMcpServerInstances.add(mcpServerInstance);
    return mcpServerInstance;
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integrations/zoderrors.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/integration.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/is.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/string.js [instrumentation-edge] (ecmascript)");
;
;
;
const DEFAULT_LIMIT = 10;
const INTEGRATION_NAME = 'ZodErrors';
/**
 * Simplified ZodIssue type definition
 */ function originalExceptionIsZodError(originalException) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isError"])(originalException) && originalException.name === 'ZodError' && Array.isArray(originalException.issues);
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
    return `Failed to validate keys: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["truncate"])(errorKeys.join(', '), 100)}`;
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
 */ const zodErrorsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defineIntegration"])(_zodErrorsIntegration);
;
 //# sourceMappingURL=zoderrors.js.map
}),
]);

//# sourceMappingURL=36318_%40sentry_core_build_esm_integrations_4620c811._.js.map