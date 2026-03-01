(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/36318_@sentry_core_build_esm_tracing_88dffb07._.js",
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SPAN_STATUS_ERROR",
    ()=>SPAN_STATUS_ERROR,
    "SPAN_STATUS_OK",
    ()=>SPAN_STATUS_OK,
    "SPAN_STATUS_UNSET",
    ()=>SPAN_STATUS_UNSET,
    "getSpanStatusFromHttpCode",
    ()=>getSpanStatusFromHttpCode,
    "setHttpStatus",
    ()=>setHttpStatus
]);
const SPAN_STATUS_UNSET = 0;
const SPAN_STATUS_OK = 1;
const SPAN_STATUS_ERROR = 2;
/**
 * Converts a HTTP status code into a sentry status with a message.
 *
 * @param httpStatus The HTTP response status code.
 * @returns The span status or internal_error.
 */ // https://develop.sentry.dev/sdk/event-payloads/span/
function getSpanStatusFromHttpCode(httpStatus) {
    if (httpStatus < 400 && httpStatus >= 100) {
        return {
            code: SPAN_STATUS_OK
        };
    }
    if (httpStatus >= 400 && httpStatus < 500) {
        switch(httpStatus){
            case 401:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'unauthenticated'
                };
            case 403:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'permission_denied'
                };
            case 404:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'not_found'
                };
            case 409:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'already_exists'
                };
            case 413:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'failed_precondition'
                };
            case 429:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'resource_exhausted'
                };
            case 499:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'cancelled'
                };
            default:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'invalid_argument'
                };
        }
    }
    if (httpStatus >= 500 && httpStatus < 600) {
        switch(httpStatus){
            case 501:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'unimplemented'
                };
            case 503:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'unavailable'
                };
            case 504:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'deadline_exceeded'
                };
            default:
                return {
                    code: SPAN_STATUS_ERROR,
                    message: 'internal_error'
                };
        }
    }
    return {
        code: SPAN_STATUS_ERROR,
        message: 'internal_error'
    };
}
/**
 * Sets the Http status attributes on the current span based on the http code.
 * Additionally, the span's status is updated, depending on the http code.
 */ function setHttpStatus(span, httpStatus) {
    span.setAttribute('http.response.status_code', httpStatus);
    const spanStatus = getSpanStatusFromHttpCode(httpStatus);
    if (spanStatus.message !== 'unknown_error') {
        span.setStatus(spanStatus);
    }
}
;
 //# sourceMappingURL=spanstatus.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCapturedScopesOnSpan",
    ()=>getCapturedScopesOnSpan,
    "setCapturedScopesOnSpan",
    ()=>setCapturedScopesOnSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/object.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/worldwide.js [instrumentation-edge] (ecmascript)");
;
;
const SCOPE_ON_START_SPAN_FIELD = '_sentryScope';
const ISOLATION_SCOPE_ON_START_SPAN_FIELD = '_sentryIsolationScope';
/** Wrap a scope with a WeakRef if available, falling back to a direct scope. */ function wrapScopeWithWeakRef(scope) {
    try {
        // @ts-expect-error - WeakRef is not available in all environments
        const WeakRefClass = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].WeakRef;
        if (typeof WeakRefClass === 'function') {
            return new WeakRefClass(scope);
        }
    } catch  {
    // WeakRef not available or failed to create
    // We'll fall back to a direct scope
    }
    return scope;
}
/** Try to unwrap a scope from a potential WeakRef wrapper. */ function unwrapScopeFromWeakRef(scopeRef) {
    if (!scopeRef) {
        return undefined;
    }
    if (typeof scopeRef === 'object' && 'deref' in scopeRef && typeof scopeRef.deref === 'function') {
        try {
            return scopeRef.deref();
        } catch  {
            return undefined;
        }
    }
    // Fallback to a direct scope
    return scopeRef;
}
/** Store the scope & isolation scope for a span, which can the be used when it is finished. */ function setCapturedScopesOnSpan(span, scope, isolationScope) {
    if (span) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(span, ISOLATION_SCOPE_ON_START_SPAN_FIELD, wrapScopeWithWeakRef(isolationScope));
        // We don't wrap the scope with a WeakRef here because webkit aggressively garbage collects
        // and scopes are not held in memory for long periods of time.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(span, SCOPE_ON_START_SPAN_FIELD, scope);
    }
}
/**
 * Grabs the scope and isolation scope off a span that were active when the span was started.
 * If WeakRef was used and scopes have been garbage collected, returns undefined for those scopes.
 */ function getCapturedScopesOnSpan(span) {
    const spanWithScopes = span;
    return {
        scope: spanWithScopes[SCOPE_ON_START_SPAN_FIELD],
        isolationScope: unwrapScopeFromWeakRef(spanWithScopes[ISOLATION_SCOPE_ON_START_SPAN_FIELD])
    };
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "freezeDscOnSpan",
    ()=>freezeDscOnSpan,
    "getDynamicSamplingContextFromClient",
    ()=>getDynamicSamplingContextFromClient,
    "getDynamicSamplingContextFromScope",
    ()=>getDynamicSamplingContextFromScope,
    "getDynamicSamplingContextFromSpan",
    ()=>getDynamicSamplingContextFromSpan,
    "spanToBaggageHeader",
    ()=>spanToBaggageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/baggage.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/dsn.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/object.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/utils.js [instrumentation-edge] (ecmascript)");
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
 * If you change this value, also update the terser plugin config to
 * avoid minification of the object property!
 */ const FROZEN_DSC_FIELD = '_frozenDsc';
/**
 * Freeze the given DSC on the given span.
 */ function freezeDscOnSpan(span, dsc) {
    const spanWithMaybeDsc = span;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(spanWithMaybeDsc, FROZEN_DSC_FIELD, dsc);
}
/**
 * Creates a dynamic sampling context from a client.
 *
 * Dispatches the `createDsc` lifecycle hook as a side effect.
 */ function getDynamicSamplingContextFromClient(trace_id, client) {
    const options = client.getOptions();
    const { publicKey: public_key } = client.getDsn() || {};
    // Instead of conditionally adding non-undefined values, we add them and then remove them if needed
    // otherwise, the order of baggage entries changes, which "breaks" a bunch of tests etc.
    const dsc = {
        environment: options.environment || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEFAULT_ENVIRONMENT"],
        release: options.release,
        public_key,
        trace_id,
        org_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractOrgIdFromClient"])(client)
    };
    client.emit('createDsc', dsc);
    return dsc;
}
/**
 * Get the dynamic sampling context for the currently active scopes.
 */ function getDynamicSamplingContextFromScope(client, scope) {
    const propagationContext = scope.getPropagationContext();
    return propagationContext.dsc || getDynamicSamplingContextFromClient(propagationContext.traceId, client);
}
/**
 * Creates a dynamic sampling context from a span (and client and scope)
 *
 * @param span the span from which a few values like the root span name and sample rate are extracted.
 *
 * @returns a dynamic sampling context
 */ function getDynamicSamplingContextFromSpan(span) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        return {};
    }
    const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(span);
    const rootSpanJson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(rootSpan);
    const rootSpanAttributes = rootSpanJson.data;
    const traceState = rootSpan.spanContext().traceState;
    // The span sample rate that was locally applied to the root span should also always be applied to the DSC, even if the DSC is frozen.
    // This is so that the downstream traces/services can use parentSampleRate in their `tracesSampler` to make consistent sampling decisions across the entire trace.
    const rootSpanSampleRate = traceState?.get('sentry.sample_rate') ?? rootSpanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE"]] ?? rootSpanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE"]];
    function applyLocalSampleRateToDsc(dsc) {
        if (typeof rootSpanSampleRate === 'number' || typeof rootSpanSampleRate === 'string') {
            dsc.sample_rate = `${rootSpanSampleRate}`;
        }
        return dsc;
    }
    // For core implementation, we freeze the DSC onto the span as a non-enumerable property
    const frozenDsc = rootSpan[FROZEN_DSC_FIELD];
    if (frozenDsc) {
        return applyLocalSampleRateToDsc(frozenDsc);
    }
    // For OpenTelemetry, we freeze the DSC on the trace state
    const traceStateDsc = traceState?.get('sentry.dsc');
    // If the span has a DSC, we want it to take precedence
    const dscOnTraceState = traceStateDsc && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["baggageHeaderToDynamicSamplingContext"])(traceStateDsc);
    if (dscOnTraceState) {
        return applyLocalSampleRateToDsc(dscOnTraceState);
    }
    // Else, we generate it from the span
    const dsc = getDynamicSamplingContextFromClient(span.spanContext().traceId, client);
    // We don't want to have a transaction name in the DSC if the source is "url" because URLs might contain PII
    const source = rootSpanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]];
    // after JSON conversion, txn.name becomes jsonSpan.description
    const name = rootSpanJson.description;
    if (source !== 'url' && name) {
        dsc.transaction = name;
    }
    // How can we even land here with hasSpansEnabled() returning false?
    // Otel creates a Non-recording span in Tracing Without Performance mode when handling incoming requests
    // So we end up with an active span that is not sampled (neither positively nor negatively)
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["hasSpansEnabled"])()) {
        dsc.sampled = String((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanIsSampled"])(rootSpan));
        dsc.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
        // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
        traceState?.get('sentry.sample_rand') ?? // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getCapturedScopesOnSpan"])(rootSpan).scope?.getPropagationContext().sampleRand.toString();
    }
    applyLocalSampleRateToDsc(dsc);
    client.emit('createDsc', dsc, rootSpan);
    return dsc;
}
/**
 * Convert a Span to a baggage header.
 */ function spanToBaggageHeader(span) {
    const dsc = getDynamicSamplingContextFromSpan(span);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["dynamicSamplingContextToSentryBaggageHeader"])(dsc);
}
;
 //# sourceMappingURL=dynamicSamplingContext.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/errors.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "registerSpanErrorInstrumentation",
    ()=>registerSpanErrorInstrumentation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalError$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/instrument/globalError.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalUnhandledRejection$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
;
let errorsInstrumented = false;
/**
 * Ensure that global errors automatically set the active span status.
 */ function registerSpanErrorInstrumentation() {
    if (errorsInstrumented) {
        return;
    }
    /**
   * If an error or unhandled promise occurs, we mark the active root span as failed
   */ function errorCallback() {
        const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getActiveSpan"])();
        const rootSpan = activeSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
        if (rootSpan) {
            const message = 'internal_error';
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log(`[Tracing] Root span: ${message} -> Global error occurred`);
            rootSpan.setStatus({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                message
            });
        }
    }
    // The function name will be lost when bundling but we need to be able to identify this listener later to maintain the
    // node.js default exit behaviour
    errorCallback.tag = 'sentry_tracingErrorCallback';
    errorsInstrumented = true;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalError$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addGlobalErrorInstrumentationHandler"])(errorCallback);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalUnhandledRejection$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addGlobalUnhandledRejectionInstrumentationHandler"])(errorCallback);
}
;
 //# sourceMappingURL=errors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/sampling.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sampleSpan",
    ()=>sampleSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parseSampleRate$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/parseSampleRate.js [instrumentation-edge] (ecmascript)");
;
;
;
;
/**
 * Makes a sampling decision for the given options.
 *
 * Called every time a root span is created. Only root spans which emerge with a `sampled` value of `true` will be
 * sent to Sentry.
 */ function sampleSpan(options, samplingContext, sampleRand) {
    // nothing to do if span recording is not enabled
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["hasSpansEnabled"])(options)) {
        return [
            false
        ];
    }
    let localSampleRateWasApplied = undefined;
    // we would have bailed already if neither `tracesSampler` nor `tracesSampleRate` were defined, so one of these should
    // work; prefer the hook if so
    let sampleRate;
    if (typeof options.tracesSampler === 'function') {
        sampleRate = options.tracesSampler({
            ...samplingContext,
            inheritOrSampleWith: (fallbackSampleRate)=>{
                // If we have an incoming parent sample rate, we'll just use that one.
                // The sampling decision will be inherited because of the sample_rand that was generated when the trace reached the incoming boundaries of the SDK.
                if (typeof samplingContext.parentSampleRate === 'number') {
                    return samplingContext.parentSampleRate;
                }
                // Fallback if parent sample rate is not on the incoming trace (e.g. if there is no baggage)
                // This is to provide backwards compatibility if there are incoming traces from older SDKs that don't send a parent sample rate or a sample rand. In these cases we just want to force either a sampling decision on the downstream traces via the sample rate.
                if (typeof samplingContext.parentSampled === 'boolean') {
                    return Number(samplingContext.parentSampled);
                }
                return fallbackSampleRate;
            }
        });
        localSampleRateWasApplied = true;
    } else if (samplingContext.parentSampled !== undefined) {
        sampleRate = samplingContext.parentSampled;
    } else if (typeof options.tracesSampleRate !== 'undefined') {
        sampleRate = options.tracesSampleRate;
        localSampleRateWasApplied = true;
    }
    // Since this is coming from the user (or from a function provided by the user), who knows what we might get.
    // (The only valid values are booleans or numbers between 0 and 1.)
    const parsedSampleRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parseSampleRate$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["parseSampleRate"])(sampleRate);
    if (parsedSampleRate === undefined) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn(`[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(sampleRate)} of type ${JSON.stringify(typeof sampleRate)}.`);
        return [
            false
        ];
    }
    // if the function returned 0 (or false), or if `tracesSampleRate` is 0, it's a sign the transaction should be dropped
    if (!parsedSampleRate) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log(`[Tracing] Discarding transaction because ${typeof options.tracesSampler === 'function' ? 'tracesSampler returned 0 or false' : 'a negative sampling decision was inherited or tracesSampleRate is set to 0'}`);
        return [
            false,
            parsedSampleRate,
            localSampleRateWasApplied
        ];
    }
    // We always compare the sample rand for the current execution context against the chosen sample rate.
    // Read more: https://develop.sentry.dev/sdk/telemetry/traces/#propagated-random-value
    const shouldSample = sampleRand < parsedSampleRate;
    // if we're not going to keep it, we're done
    if (!shouldSample) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(sampleRate)})`);
    }
    return [
        shouldSample,
        parsedSampleRate,
        localSampleRateWasApplied
    ];
}
;
 //# sourceMappingURL=sampling.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/measurement.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setMeasurement",
    ()=>setMeasurement,
    "timedEventsToMeasurements",
    ()=>timedEventsToMeasurements
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
;
;
;
;
/**
 * Adds a measurement to the active transaction on the current global scope. You can optionally pass in a different span
 * as the 4th parameter.
 */ function setMeasurement(name, value, unit, activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getActiveSpan"])()) {
    const rootSpan = activeSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
    if (rootSpan) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log(`[Measurement] Setting measurement on root span: ${name} = ${value} ${unit}`);
        rootSpan.addEvent(name, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE"]]: value,
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT"]]: unit
        });
    }
}
/**
 * Convert timed events to measurements.
 */ function timedEventsToMeasurements(events) {
    if (!events || events.length === 0) {
        return undefined;
    }
    const measurements = {};
    events.forEach((event)=>{
        const attributes = event.attributes || {};
        const unit = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT"]];
        const value = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE"]];
        if (typeof unit === 'string' && typeof value === 'number') {
            measurements[event.name] = {
                value,
                unit
            };
        }
    });
    return measurements;
}
;
 //# sourceMappingURL=measurement.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/logSpans.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logSpanEnd",
    ()=>logSpanEnd,
    "logSpanStart",
    ()=>logSpanStart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
;
;
;
/**
 * Print a log message for a started span.
 */ function logSpanStart(span) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) return;
    const { description = '< unknown name >', op = '< unknown op >', parent_span_id: parentSpanId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(span);
    const { spanId } = span.spanContext();
    const sampled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanIsSampled"])(span);
    const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(span);
    const isRootSpan = rootSpan === span;
    const header = `[Tracing] Starting ${sampled ? 'sampled' : 'unsampled'} ${isRootSpan ? 'root ' : ''}span`;
    const infoParts = [
        `op: ${op}`,
        `name: ${description}`,
        `ID: ${spanId}`
    ];
    if (parentSpanId) {
        infoParts.push(`parent ID: ${parentSpanId}`);
    }
    if (!isRootSpan) {
        const { op, description } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(rootSpan);
        infoParts.push(`root ID: ${rootSpan.spanContext().spanId}`);
        if (op) {
            infoParts.push(`root op: ${op}`);
        }
        if (description) {
            infoParts.push(`root description: ${description}`);
        }
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log(`${header}
  ${infoParts.join('\n  ')}`);
}
/**
 * Print a log message for an ended span.
 */ function logSpanEnd(span) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) return;
    const { description = '< unknown name >', op = '< unknown op >' } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(span);
    const { spanId } = span.spanContext();
    const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(span);
    const isRootSpan = rootSpan === span;
    const msg = `[Tracing] Finishing "${op}" ${isRootSpan ? 'root ' : ''}span "${description}" with ID ${spanId}`;
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log(msg);
}
;
 //# sourceMappingURL=logSpans.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SentryNonRecordingSpan",
    ()=>SentryNonRecordingSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/propagationContext.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
;
;
/**
 * A Sentry Span that is non-recording, meaning it will not be sent to Sentry.
 */ class SentryNonRecordingSpan {
    constructor(spanContext = {}){
        this._traceId = spanContext.traceId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["generateTraceId"])();
        this._spanId = spanContext.spanId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["generateSpanId"])();
    }
    /** @inheritdoc */ spanContext() {
        return {
            spanId: this._spanId,
            traceId: this._traceId,
            traceFlags: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["TRACE_FLAG_NONE"]
        };
    }
    /** @inheritdoc */ end(_timestamp) {}
    /** @inheritdoc */ setAttribute(_key, _value) {
        return this;
    }
    /** @inheritdoc */ setAttributes(_values) {
        return this;
    }
    /** @inheritdoc */ setStatus(_status) {
        return this;
    }
    /** @inheritdoc */ updateName(_name) {
        return this;
    }
    /** @inheritdoc */ isRecording() {
        return false;
    }
    /** @inheritdoc */ addEvent(_name, _attributesOrStartTime, _startTime) {
        return this;
    }
    /** @inheritDoc */ addLink(_link) {
        return this;
    }
    /** @inheritDoc */ addLinks(_links) {
        return this;
    }
    /**
   * This should generally not be used,
   * but we need it for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */ recordException(_exception, _time) {
    // noop
    }
}
;
 //# sourceMappingURL=sentryNonRecordingSpan.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/sentrySpan.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SentrySpan",
    ()=>SentrySpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$envelope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/envelope.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/propagationContext.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/time.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$logSpans$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/logSpans.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$measurement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/measurement.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/utils.js [instrumentation-edge] (ecmascript)");
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
;
;
const MAX_SPAN_COUNT = 1000;
/**
 * Span contains all data about a span
 */ class SentrySpan {
    /** Epoch timestamp in seconds when the span started. */ /** Epoch timestamp in seconds when the span ended. */ /** Internal keeper of the status */ /** The timed events added to this span. */ /** if true, treat span as a standalone span (not part of a transaction) */ /**
   * You should never call the constructor manually, always use `Sentry.startSpan()`
   * or other span methods.
   * @internal
   * @hideconstructor
   * @hidden
   */ constructor(spanContext = {}){
        this._traceId = spanContext.traceId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["generateTraceId"])();
        this._spanId = spanContext.spanId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["generateSpanId"])();
        this._startTime = spanContext.startTimestamp || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestampInSeconds"])();
        this._links = spanContext.links;
        this._attributes = {};
        this.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'manual',
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: spanContext.op,
            ...spanContext.attributes
        });
        this._name = spanContext.name;
        if (spanContext.parentSpanId) {
            this._parentSpanId = spanContext.parentSpanId;
        }
        // We want to include booleans as well here
        if ('sampled' in spanContext) {
            this._sampled = spanContext.sampled;
        }
        if (spanContext.endTimestamp) {
            this._endTime = spanContext.endTimestamp;
        }
        this._events = [];
        this._isStandaloneSpan = spanContext.isStandalone;
        // If the span is already ended, ensure we finalize the span immediately
        if (this._endTime) {
            this._onSpanEnded();
        }
    }
    /** @inheritDoc */ addLink(link) {
        if (this._links) {
            this._links.push(link);
        } else {
            this._links = [
                link
            ];
        }
        return this;
    }
    /** @inheritDoc */ addLinks(links) {
        if (this._links) {
            this._links.push(...links);
        } else {
            this._links = links;
        }
        return this;
    }
    /**
   * This should generally not be used,
   * but it is needed for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */ recordException(_exception, _time) {
    // noop
    }
    /** @inheritdoc */ spanContext() {
        const { _spanId: spanId, _traceId: traceId, _sampled: sampled } = this;
        return {
            spanId,
            traceId,
            traceFlags: sampled ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["TRACE_FLAG_SAMPLED"] : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["TRACE_FLAG_NONE"]
        };
    }
    /** @inheritdoc */ setAttribute(key, value) {
        if (value === undefined) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this._attributes[key];
        } else {
            this._attributes[key] = value;
        }
        return this;
    }
    /** @inheritdoc */ setAttributes(attributes) {
        Object.keys(attributes).forEach((key)=>this.setAttribute(key, attributes[key]));
        return this;
    }
    /**
   * This should generally not be used,
   * but we need it for browser tracing where we want to adjust the start time afterwards.
   * USE THIS WITH CAUTION!
   *
   * @hidden
   * @internal
   */ updateStartTime(timeInput) {
        this._startTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanTimeInputToSeconds"])(timeInput);
    }
    /**
   * @inheritDoc
   */ setStatus(value) {
        this._status = value;
        return this;
    }
    /**
   * @inheritDoc
   */ updateName(name) {
        this._name = name;
        this.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"], 'custom');
        return this;
    }
    /** @inheritdoc */ end(endTimestamp) {
        // If already ended, skip
        if (this._endTime) {
            return;
        }
        this._endTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanTimeInputToSeconds"])(endTimestamp);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$logSpans$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["logSpanEnd"])(this);
        this._onSpanEnded();
    }
    /**
   * Get JSON representation of this span.
   *
   * @hidden
   * @internal This method is purely for internal purposes and should not be used outside
   * of SDK code. If you need to get a JSON representation of a span,
   * use `spanToJSON(span)` instead.
   */ getSpanJSON() {
        return {
            data: this._attributes,
            description: this._name,
            op: this._attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]],
            parent_span_id: this._parentSpanId,
            span_id: this._spanId,
            start_timestamp: this._startTime,
            status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getStatusMessage"])(this._status),
            timestamp: this._endTime,
            trace_id: this._traceId,
            origin: this._attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]],
            profile_id: this._attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_PROFILE_ID"]],
            exclusive_time: this._attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME"]],
            measurements: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$measurement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timedEventsToMeasurements"])(this._events),
            is_segment: this._isStandaloneSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(this) === this || undefined,
            segment_id: this._isStandaloneSpan ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(this).spanContext().spanId : undefined,
            links: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["convertSpanLinksForEnvelope"])(this._links)
        };
    }
    /** @inheritdoc */ isRecording() {
        return !this._endTime && !!this._sampled;
    }
    /**
   * @inheritdoc
   */ addEvent(name, attributesOrStartTime, startTime) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log('[Tracing] Adding an event to span:', name);
        const time = isSpanTimeInput(attributesOrStartTime) ? attributesOrStartTime : startTime || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timestampInSeconds"])();
        const attributes = isSpanTimeInput(attributesOrStartTime) ? {} : attributesOrStartTime || {};
        const event = {
            name,
            time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanTimeInputToSeconds"])(time),
            attributes
        };
        this._events.push(event);
        return this;
    }
    /**
   * This method should generally not be used,
   * but for now we need a way to publicly check if the `_isStandaloneSpan` flag is set.
   * USE THIS WITH CAUTION!
   * @internal
   * @hidden
   * @experimental
   */ isStandaloneSpan() {
        return !!this._isStandaloneSpan;
    }
    /** Emit `spanEnd` when the span is ended. */ _onSpanEnded() {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
        if (client) {
            client.emit('spanEnd', this);
        }
        // A segment span is basically the root span of a local span tree.
        // So for now, this is either what we previously refer to as the root span,
        // or a standalone span.
        const isSegmentSpan = this._isStandaloneSpan || this === (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(this);
        if (!isSegmentSpan) {
            return;
        }
        // if this is a standalone span, we send it immediately
        if (this._isStandaloneSpan) {
            if (this._sampled) {
                sendSpanEnvelope((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$envelope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createSpanEnvelope"])([
                    this
                ], client));
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log('[Tracing] Discarding standalone span because its trace was not chosen to be sampled.');
                if (client) {
                    client.recordDroppedEvent('sample_rate', 'span');
                }
            }
            return;
        }
        const transactionEvent = this._convertSpanToTransaction();
        if (transactionEvent) {
            const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getCapturedScopesOnSpan"])(this).scope || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getCurrentScope"])();
            scope.captureEvent(transactionEvent);
        }
    }
    /**
   * Finish the transaction & prepare the event to send to Sentry.
   */ _convertSpanToTransaction() {
        // We can only convert finished spans
        if (!isFullFinishedSpan((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(this))) {
            return undefined;
        }
        if (!this._name) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].warn('Transaction has no name, falling back to `<unlabeled transaction>`.');
            this._name = '<unlabeled transaction>';
        }
        const { scope: capturedSpanScope, isolationScope: capturedSpanIsolationScope } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getCapturedScopesOnSpan"])(this);
        const normalizedRequest = capturedSpanScope?.getScopeData().sdkProcessingMetadata?.normalizedRequest;
        if (this._sampled !== true) {
            return undefined;
        }
        // The transaction span itself as well as any potential standalone spans should be filtered out
        const finishedSpans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanDescendants"])(this).filter((span)=>span !== this && !isStandaloneSpan(span));
        const spans = finishedSpans.map((span)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(span)).filter(isFullFinishedSpan);
        const source = this._attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]];
        // remove internal root span attributes we don't need to send.
        /* eslint-disable @typescript-eslint/no-dynamic-delete */ delete this._attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME"]];
        spans.forEach((span)=>{
            delete span.data[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME"]];
        });
        // eslint-enabled-next-line @typescript-eslint/no-dynamic-delete
        const transaction = {
            contexts: {
                trace: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToTransactionTraceContext"])(this)
            },
            spans: // spans.sort() mutates the array, but `spans` is already a copy so we can safely do this here
            // we do not use spans anymore after this point
            spans.length > MAX_SPAN_COUNT ? spans.sort((a, b)=>a.start_timestamp - b.start_timestamp).slice(0, MAX_SPAN_COUNT) : spans,
            start_timestamp: this._startTime,
            timestamp: this._endTime,
            transaction: this._name,
            type: 'transaction',
            sdkProcessingMetadata: {
                capturedSpanScope,
                capturedSpanIsolationScope,
                dynamicSamplingContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromSpan"])(this)
            },
            request: normalizedRequest,
            ...source && {
                transaction_info: {
                    source
                }
            }
        };
        const measurements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$measurement$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["timedEventsToMeasurements"])(this._events);
        const hasMeasurements = measurements && Object.keys(measurements).length;
        if (hasMeasurements) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log('[Measurements] Adding measurements to transaction event', JSON.stringify(measurements, undefined, 2));
            transaction.measurements = measurements;
        }
        return transaction;
    }
}
function isSpanTimeInput(value) {
    return value && typeof value === 'number' || value instanceof Date || Array.isArray(value);
}
// We want to filter out any incomplete SpanJSON objects
function isFullFinishedSpan(input) {
    return !!input.start_timestamp && !!input.timestamp && !!input.span_id && !!input.trace_id;
}
/** `SentrySpan`s can be sent as a standalone span rather than belonging to a transaction */ function isStandaloneSpan(span) {
    return span instanceof SentrySpan && span.isStandaloneSpan();
}
/**
 * Sends a `SpanEnvelope`.
 *
 * Note: If the envelope's spans are dropped, e.g. via `beforeSendSpan`,
 * the envelope will not be sent either.
 */ function sendSpanEnvelope(envelope) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        return;
    }
    const spanItems = envelope[1];
    if (!spanItems || spanItems.length === 0) {
        client.recordDroppedEvent('before_send', 'span');
        return;
    }
    // sendEnvelope should not throw
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    client.sendEnvelope(envelope);
}
;
 //# sourceMappingURL=sentrySpan.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "continueTrace",
    ()=>continueTrace,
    "startInactiveSpan",
    ()=>startInactiveSpan,
    "startNewTrace",
    ()=>startNewTrace,
    "startSpan",
    ()=>startSpan,
    "startSpanManual",
    ()=>startSpanManual,
    "suppressTracing",
    ()=>suppressTracing,
    "withActiveSpan",
    ()=>withActiveSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$asyncContext$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/asyncContext/index.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/carrier.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/baggage.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parseSampleRate$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/parseSampleRate.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/propagationContext.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/randomSafeContext.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/tracing.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$logSpans$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/logSpans.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sampling$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/sampling.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentrySpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/sentrySpan.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/utils.js [instrumentation-edge] (ecmascript)");
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
;
;
/* eslint-disable max-lines */ const SUPPRESS_TRACING_KEY = '__SENTRY_SUPPRESS_TRACING__';
/**
 * Wraps a function with a transaction/span and finishes the span after the function is done.
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getActiveSpan()`, as long as the function is executed while the scope is active.
 *
 * If you want to create a span that is not set as active, use {@link startInactiveSpan}.
 *
 * You'll always get a span passed to the callback,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */ function startSpan(options, callback) {
    const acs = getAcs();
    if (acs.startSpan) {
        return acs.startSpan(options, callback);
    }
    const spanArguments = parseSentrySpanArguments(options);
    const { forceTransaction, parentSpan: customParentSpan, scope: customScope } = options;
    // We still need to fork a potentially passed scope, as we set the active span on it
    // and we need to ensure that it is cleaned up properly once the span ends.
    const customForkedScope = customScope?.clone();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withScope"])(customForkedScope, ()=>{
        // If `options.parentSpan` is defined, we want to wrap the callback in `withActiveSpan`
        const wrapper = getActiveSpanWrapper(customParentSpan);
        return wrapper(()=>{
            const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getCurrentScope"])();
            const parentSpan = getParentSpan(scope, customParentSpan);
            const shouldSkipSpan = options.onlyIfParent && !parentSpan;
            const activeSpan = shouldSkipSpan ? new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SentryNonRecordingSpan"]() : createChildOrRootSpan({
                parentSpan,
                spanArguments,
                forceTransaction,
                scope
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_setSpanForScope"])(scope, activeSpan);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>callback(activeSpan), ()=>{
                // Only update the span status if it hasn't been changed yet, and the span is not yet finished
                const { status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(activeSpan);
                if (activeSpan.isRecording() && (!status || status === 'ok')) {
                    activeSpan.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                        message: 'internal_error'
                    });
                }
            }, ()=>{
                activeSpan.end();
            });
        });
    });
}
/**
 * Similar to `Sentry.startSpan`. Wraps a function with a transaction/span, but does not finish the span
 * after the function is done automatically. Use `span.end()` to end the span.
 *
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getActiveSpan()`, as long as the function is executed while the scope is active.
 *
 * You'll always get a span passed to the callback,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */ function startSpanManual(options, callback) {
    const acs = getAcs();
    if (acs.startSpanManual) {
        return acs.startSpanManual(options, callback);
    }
    const spanArguments = parseSentrySpanArguments(options);
    const { forceTransaction, parentSpan: customParentSpan, scope: customScope } = options;
    const customForkedScope = customScope?.clone();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withScope"])(customForkedScope, ()=>{
        // If `options.parentSpan` is defined, we want to wrap the callback in `withActiveSpan`
        const wrapper = getActiveSpanWrapper(customParentSpan);
        return wrapper(()=>{
            const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getCurrentScope"])();
            const parentSpan = getParentSpan(scope, customParentSpan);
            const shouldSkipSpan = options.onlyIfParent && !parentSpan;
            const activeSpan = shouldSkipSpan ? new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SentryNonRecordingSpan"]() : createChildOrRootSpan({
                parentSpan,
                spanArguments,
                forceTransaction,
                scope
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_setSpanForScope"])(scope, activeSpan);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(// We pass the `finish` function to the callback, so the user can finish the span manually
            // this is mainly here for historic purposes because previously, we instructed users to call
            // `finish` instead of `span.end()` to also clean up the scope. Nowadays, calling `span.end()`
            // or `finish` has the same effect and we simply leave it here to avoid breaking user code.
            ()=>callback(activeSpan, ()=>activeSpan.end()), ()=>{
                // Only update the span status if it hasn't been changed yet, and the span is not yet finished
                const { status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(activeSpan);
                if (activeSpan.isRecording() && (!status || status === 'ok')) {
                    activeSpan.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                        message: 'internal_error'
                    });
                }
            });
        });
    });
}
/**
 * Creates a span. This span is not set as active, so will not get automatic instrumentation spans
 * as children or be able to be accessed via `Sentry.getActiveSpan()`.
 *
 * If you want to create a span that is set as active, use {@link startSpan}.
 *
 * This function will always return a span,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */ function startInactiveSpan(options) {
    const acs = getAcs();
    if (acs.startInactiveSpan) {
        return acs.startInactiveSpan(options);
    }
    const spanArguments = parseSentrySpanArguments(options);
    const { forceTransaction, parentSpan: customParentSpan } = options;
    // If `options.scope` is defined, we use this as as a wrapper,
    // If `options.parentSpan` is defined, we want to wrap the callback in `withActiveSpan`
    const wrapper = options.scope ? (callback)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withScope"])(options.scope, callback) : customParentSpan !== undefined ? (callback)=>withActiveSpan(customParentSpan, callback) : (callback)=>callback();
    return wrapper(()=>{
        const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getCurrentScope"])();
        const parentSpan = getParentSpan(scope, customParentSpan);
        const shouldSkipSpan = options.onlyIfParent && !parentSpan;
        if (shouldSkipSpan) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SentryNonRecordingSpan"]();
        }
        return createChildOrRootSpan({
            parentSpan,
            spanArguments,
            forceTransaction,
            scope
        });
    });
}
/**
 * Continue a trace from `sentry-trace` and `baggage` values.
 * These values can be obtained from incoming request headers, or in the browser from `<meta name="sentry-trace">`
 * and `<meta name="baggage">` HTML tags.
 *
 * Spans started with `startSpan`, `startSpanManual` and `startInactiveSpan`, within the callback will automatically
 * be attached to the incoming trace.
 */ const continueTrace = (options, callback)=>{
    const carrier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getMainCarrier"])();
    const acs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$asyncContext$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getAsyncContextStrategy"])(carrier);
    if (acs.continueTrace) {
        return acs.continueTrace(options, callback);
    }
    const { sentryTrace, baggage } = options;
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    const incomingDsc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["baggageHeaderToDynamicSamplingContext"])(baggage);
    if (client && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["shouldContinueTrace"])(client, incomingDsc?.org_id)) {
        return startNewTrace(callback);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        const propagationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["propagationContextFromHeaders"])(sentryTrace, baggage);
        scope.setPropagationContext(propagationContext);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_setSpanForScope"])(scope, undefined);
        return callback();
    });
};
/**
 * Forks the current scope and sets the provided span as active span in the context of the provided callback. Can be
 * passed `null` to start an entirely new span tree.
 *
 * @param span Spans started in the context of the provided callback will be children of this span. If `null` is passed,
 * spans started within the callback will not be attached to a parent span.
 * @param callback Execution context in which the provided span will be active. Is passed the newly forked scope.
 * @returns the value returned from the provided callback function.
 */ function withActiveSpan(span, callback) {
    const acs = getAcs();
    if (acs.withActiveSpan) {
        return acs.withActiveSpan(span, callback);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_setSpanForScope"])(scope, span || undefined);
        return callback(scope);
    });
}
/** Suppress tracing in the given callback, ensuring no spans are generated inside of it. */ function suppressTracing(callback) {
    const acs = getAcs();
    if (acs.suppressTracing) {
        return acs.suppressTracing(callback);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        // Note: We do not wait for the callback to finish before we reset the metadata
        // the reason for this is that otherwise, in the browser this can lead to very weird behavior
        // as there is only a single top scope, if the callback takes longer to finish,
        // other, unrelated spans may also be suppressed, which we do not want
        // so instead, we only suppress tracing synchronoysly in the browser
        scope.setSDKProcessingMetadata({
            [SUPPRESS_TRACING_KEY]: true
        });
        const res = callback();
        scope.setSDKProcessingMetadata({
            [SUPPRESS_TRACING_KEY]: undefined
        });
        return res;
    });
}
/**
 * Starts a new trace for the duration of the provided callback. Spans started within the
 * callback will be part of the new trace instead of a potentially previously started trace.
 *
 * Important: Only use this function if you want to override the default trace lifetime and
 * propagation mechanism of the SDK for the duration and scope of the provided callback.
 * The newly created trace will also be the root of a new distributed trace, for example if
 * you make http requests within the callback.
 * This function might be useful if the operation you want to instrument should not be part
 * of a potentially ongoing trace.
 *
 * Default behavior:
 * - Server-side: A new trace is started for each incoming request.
 * - Browser: A new trace is started for each page our route. Navigating to a new route
 *            or page will automatically create a new trace.
 */ function startNewTrace(callback) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        scope.setPropagationContext({
            traceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["generateTraceId"])(),
            sampleRand: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["safeMathRandom"])()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log(`Starting a new trace with id ${scope.getPropagationContext().traceId}`);
        return withActiveSpan(null, callback);
    });
}
function createChildOrRootSpan({ parentSpan, spanArguments, forceTransaction, scope }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["hasSpansEnabled"])()) {
        const span = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SentryNonRecordingSpan"]();
        // If this is a root span, we ensure to freeze a DSC
        // So we can have at least partial data here
        if (forceTransaction || !parentSpan) {
            const dsc = {
                sampled: 'false',
                sample_rate: '0',
                transaction: spanArguments.name,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromSpan"])(span)
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["freezeDscOnSpan"])(span, dsc);
        }
        return span;
    }
    const isolationScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getIsolationScope"])();
    let span;
    if (parentSpan && !forceTransaction) {
        span = _startChildSpan(parentSpan, scope, spanArguments);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addChildSpanToSpan"])(parentSpan, span);
    } else if (parentSpan) {
        // If we forced a transaction but have a parent span, make sure to continue from the parent span, not the scope
        const dsc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromSpan"])(parentSpan);
        const { traceId, spanId: parentSpanId } = parentSpan.spanContext();
        const parentSampled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanIsSampled"])(parentSpan);
        span = _startRootSpan({
            traceId,
            parentSpanId,
            ...spanArguments
        }, scope, parentSampled);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["freezeDscOnSpan"])(span, dsc);
    } else {
        const { traceId, dsc, parentSpanId, sampled: parentSampled } = {
            ...isolationScope.getPropagationContext(),
            ...scope.getPropagationContext()
        };
        span = _startRootSpan({
            traceId,
            parentSpanId,
            ...spanArguments
        }, scope, parentSampled);
        if (dsc) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["freezeDscOnSpan"])(span, dsc);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$logSpans$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["logSpanStart"])(span);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setCapturedScopesOnSpan"])(span, scope, isolationScope);
    return span;
}
/**
 * This converts StartSpanOptions to SentrySpanArguments.
 * For the most part (for now) we accept the same options,
 * but some of them need to be transformed.
 */ function parseSentrySpanArguments(options) {
    const exp = options.experimental || {};
    const initialCtx = {
        isStandalone: exp.standalone,
        ...options
    };
    if (options.startTime) {
        const ctx = {
            ...initialCtx
        };
        ctx.startTimestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanTimeInputToSeconds"])(options.startTime);
        delete ctx.startTime;
        return ctx;
    }
    return initialCtx;
}
function getAcs() {
    const carrier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getMainCarrier"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$asyncContext$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getAsyncContextStrategy"])(carrier);
}
function _startRootSpan(spanArguments, scope, parentSampled) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    const options = client?.getOptions() || {};
    const { name = '' } = spanArguments;
    const mutableSpanSamplingData = {
        spanAttributes: {
            ...spanArguments.attributes
        },
        spanName: name,
        parentSampled
    };
    // we don't care about the decision for the moment; this is just a placeholder
    client?.emit('beforeSampling', mutableSpanSamplingData, {
        decision: false
    });
    // If hook consumers override the parentSampled flag, we will use that value instead of the actual one
    const finalParentSampled = mutableSpanSamplingData.parentSampled ?? parentSampled;
    const finalAttributes = mutableSpanSamplingData.spanAttributes;
    const currentPropagationContext = scope.getPropagationContext();
    const [sampled, sampleRate, localSampleRateWasApplied] = scope.getScopeData().sdkProcessingMetadata[SUPPRESS_TRACING_KEY] ? [
        false
    ] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sampling$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["sampleSpan"])(options, {
        name,
        parentSampled: finalParentSampled,
        attributes: finalAttributes,
        parentSampleRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parseSampleRate$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["parseSampleRate"])(currentPropagationContext.dsc?.sample_rate)
    }, currentPropagationContext.sampleRand);
    const rootSpan = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentrySpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SentrySpan"]({
        ...spanArguments,
        attributes: {
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: 'custom',
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE"]]: sampleRate !== undefined && localSampleRateWasApplied ? sampleRate : undefined,
            ...finalAttributes
        },
        sampled
    });
    if (!sampled && client) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].log('[Tracing] Discarding root span because its trace was not chosen to be sampled.');
        client.recordDroppedEvent('sample_rate', 'transaction');
    }
    if (client) {
        client.emit('spanStart', rootSpan);
    }
    return rootSpan;
}
/**
 * Creates a new `Span` while setting the current `Span.id` as `parentSpanId`.
 * This inherits the sampling decision from the parent span.
 */ function _startChildSpan(parentSpan, scope, spanArguments) {
    const { spanId, traceId } = parentSpan.spanContext();
    const sampled = scope.getScopeData().sdkProcessingMetadata[SUPPRESS_TRACING_KEY] ? false : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanIsSampled"])(parentSpan);
    const childSpan = sampled ? new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentrySpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SentrySpan"]({
        ...spanArguments,
        parentSpanId: spanId,
        traceId,
        sampled
    }) : new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SentryNonRecordingSpan"]({
        traceId
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addChildSpanToSpan"])(parentSpan, childSpan);
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    if (client) {
        client.emit('spanStart', childSpan);
        // If it has an endTimestamp, it's already ended
        if (spanArguments.endTimestamp) {
            client.emit('spanEnd', childSpan);
        }
    }
    return childSpan;
}
function getParentSpan(scope, customParentSpan) {
    // always use the passed in span directly
    if (customParentSpan) {
        return customParentSpan;
    }
    // This is different from `undefined` as it means the user explicitly wants no parent span
    if (customParentSpan === null) {
        return undefined;
    }
    const span = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_getSpanForScope"])(scope);
    if (!span) {
        return undefined;
    }
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])();
    const options = client ? client.getOptions() : {};
    if (options.parentSpanIsAlwaysRootSpan) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getRootSpan"])(span);
    }
    return span;
}
function getActiveSpanWrapper(parentSpan) {
    return parentSpan !== undefined ? (callback)=>{
        return withActiveSpan(parentSpan, callback);
    } : (callback)=>callback();
}
;
 //# sourceMappingURL=trace.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE",
    ()=>ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE,
    "GEN_AI_AGENT_NAME_ATTRIBUTE",
    ()=>GEN_AI_AGENT_NAME_ATTRIBUTE,
    "GEN_AI_CONVERSATION_ID_ATTRIBUTE",
    ()=>GEN_AI_CONVERSATION_ID_ATTRIBUTE,
    "GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE",
    ()=>GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE,
    "GEN_AI_EMBED_DO_EMBED_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_EMBED_DO_EMBED_OPERATION_ATTRIBUTE,
    "GEN_AI_EMBED_MANY_DO_EMBED_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_EMBED_MANY_DO_EMBED_OPERATION_ATTRIBUTE,
    "GEN_AI_EXECUTE_TOOL_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_EXECUTE_TOOL_OPERATION_ATTRIBUTE,
    "GEN_AI_GENERATE_OBJECT_DO_GENERATE_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_GENERATE_OBJECT_DO_GENERATE_OPERATION_ATTRIBUTE,
    "GEN_AI_GENERATE_TEXT_DO_GENERATE_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_GENERATE_TEXT_DO_GENERATE_OPERATION_ATTRIBUTE,
    "GEN_AI_INPUT_MESSAGES_ATTRIBUTE",
    ()=>GEN_AI_INPUT_MESSAGES_ATTRIBUTE,
    "GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE",
    ()=>GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE,
    "GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE,
    "GEN_AI_OPERATION_NAME_ATTRIBUTE",
    ()=>GEN_AI_OPERATION_NAME_ATTRIBUTE,
    "GEN_AI_PIPELINE_NAME_ATTRIBUTE",
    ()=>GEN_AI_PIPELINE_NAME_ATTRIBUTE,
    "GEN_AI_PROMPT_ATTRIBUTE",
    ()=>GEN_AI_PROMPT_ATTRIBUTE,
    "GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE,
    "GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE,
    "GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE,
    "GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE,
    "GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE,
    "GEN_AI_REQUEST_MODEL_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_MODEL_ATTRIBUTE,
    "GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE,
    "GEN_AI_REQUEST_STREAM_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_STREAM_ATTRIBUTE,
    "GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE,
    "GEN_AI_REQUEST_TOP_K_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_TOP_K_ATTRIBUTE,
    "GEN_AI_REQUEST_TOP_P_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_TOP_P_ATTRIBUTE,
    "GEN_AI_RERANK_DO_RERANK_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_RERANK_DO_RERANK_OPERATION_ATTRIBUTE,
    "GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE,
    "GEN_AI_RESPONSE_ID_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_ID_ATTRIBUTE,
    "GEN_AI_RESPONSE_MODEL_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_MODEL_ATTRIBUTE,
    "GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE,
    "GEN_AI_RESPONSE_STREAMING_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_STREAMING_ATTRIBUTE,
    "GEN_AI_RESPONSE_TEXT_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_TEXT_ATTRIBUTE,
    "GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE,
    "GEN_AI_STREAM_OBJECT_DO_STREAM_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_STREAM_OBJECT_DO_STREAM_OPERATION_ATTRIBUTE,
    "GEN_AI_STREAM_TEXT_DO_STREAM_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_STREAM_TEXT_DO_STREAM_OPERATION_ATTRIBUTE,
    "GEN_AI_SYSTEM_ATTRIBUTE",
    ()=>GEN_AI_SYSTEM_ATTRIBUTE,
    "GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE",
    ()=>GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE,
    "GEN_AI_TOOL_CALL_ID_ATTRIBUTE",
    ()=>GEN_AI_TOOL_CALL_ID_ATTRIBUTE,
    "GEN_AI_TOOL_INPUT_ATTRIBUTE",
    ()=>GEN_AI_TOOL_INPUT_ATTRIBUTE,
    "GEN_AI_TOOL_NAME_ATTRIBUTE",
    ()=>GEN_AI_TOOL_NAME_ATTRIBUTE,
    "GEN_AI_TOOL_OUTPUT_ATTRIBUTE",
    ()=>GEN_AI_TOOL_OUTPUT_ATTRIBUTE,
    "GEN_AI_TOOL_TYPE_ATTRIBUTE",
    ()=>GEN_AI_TOOL_TYPE_ATTRIBUTE,
    "GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE,
    "GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE,
    "GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE,
    "GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE",
    ()=>GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE,
    "GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE",
    ()=>GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE,
    "GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE,
    "GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE,
    "OPENAI_OPERATIONS",
    ()=>OPENAI_OPERATIONS,
    "OPENAI_RESPONSE_ID_ATTRIBUTE",
    ()=>OPENAI_RESPONSE_ID_ATTRIBUTE,
    "OPENAI_RESPONSE_MODEL_ATTRIBUTE",
    ()=>OPENAI_RESPONSE_MODEL_ATTRIBUTE,
    "OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE",
    ()=>OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE,
    "OPENAI_USAGE_COMPLETION_TOKENS_ATTRIBUTE",
    ()=>OPENAI_USAGE_COMPLETION_TOKENS_ATTRIBUTE,
    "OPENAI_USAGE_PROMPT_TOKENS_ATTRIBUTE",
    ()=>OPENAI_USAGE_PROMPT_TOKENS_ATTRIBUTE
]);
/**
 * OpenAI Integration Telemetry Attributes
 * Based on OpenTelemetry Semantic Conventions for Generative AI
 * @see https://opentelemetry.io/docs/specs/semconv/gen-ai/
 */ // =============================================================================
// OPENTELEMETRY SEMANTIC CONVENTIONS FOR GENAI
// =============================================================================
/**
 * The input messages sent to the model
 */ const GEN_AI_PROMPT_ATTRIBUTE = 'gen_ai.prompt';
/**
 * The Generative AI system being used
 * For OpenAI, this should always be "openai"
 */ const GEN_AI_SYSTEM_ATTRIBUTE = 'gen_ai.system';
/**
 * The name of the model as requested
 * Examples: "gpt-4", "gpt-3.5-turbo"
 */ const GEN_AI_REQUEST_MODEL_ATTRIBUTE = 'gen_ai.request.model';
/**
 * Whether streaming was enabled for the request
 */ const GEN_AI_REQUEST_STREAM_ATTRIBUTE = 'gen_ai.request.stream';
/**
 * The temperature setting for the model request
 */ const GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE = 'gen_ai.request.temperature';
/**
 * The maximum number of tokens requested
 */ const GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE = 'gen_ai.request.max_tokens';
/**
 * The frequency penalty setting for the model request
 */ const GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE = 'gen_ai.request.frequency_penalty';
/**
 * The presence penalty setting for the model request
 */ const GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE = 'gen_ai.request.presence_penalty';
/**
 * The top_p (nucleus sampling) setting for the model request
 */ const GEN_AI_REQUEST_TOP_P_ATTRIBUTE = 'gen_ai.request.top_p';
/**
 * The top_k setting for the model request
 */ const GEN_AI_REQUEST_TOP_K_ATTRIBUTE = 'gen_ai.request.top_k';
/**
 * The encoding format for the model request
 */ const GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE = 'gen_ai.request.encoding_format';
/**
 * The dimensions for the model request
 */ const GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE = 'gen_ai.request.dimensions';
/**
 * Array of reasons why the model stopped generating tokens
 */ const GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE = 'gen_ai.response.finish_reasons';
/**
 * The name of the model that generated the response
 */ const GEN_AI_RESPONSE_MODEL_ATTRIBUTE = 'gen_ai.response.model';
/**
 * The unique identifier for the response
 */ const GEN_AI_RESPONSE_ID_ATTRIBUTE = 'gen_ai.response.id';
/**
 * The reason why the model stopped generating tokens
 */ const GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE = 'gen_ai.response.stop_reason';
/**
 * The number of tokens used in the prompt
 */ const GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE = 'gen_ai.usage.input_tokens';
/**
 * The number of tokens used in the response
 */ const GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE = 'gen_ai.usage.output_tokens';
/**
 * The total number of tokens used (input + output)
 */ const GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE = 'gen_ai.usage.total_tokens';
/**
 * The operation name
 */ const GEN_AI_OPERATION_NAME_ATTRIBUTE = 'gen_ai.operation.name';
/**
 * Original length of messages array, used to indicate truncations had occured
 */ const GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE = 'sentry.sdk_meta.gen_ai.input.messages.original_length';
/**
 * The prompt messages
 * Only recorded when recordInputs is enabled
 */ const GEN_AI_INPUT_MESSAGES_ATTRIBUTE = 'gen_ai.input.messages';
/**
 * The system instructions extracted from system messages
 * Only recorded when recordInputs is enabled
 * According to OpenTelemetry spec: https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/#gen-ai-system-instructions
 */ const GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE = 'gen_ai.system_instructions';
/**
 * The response text
 * Only recorded when recordOutputs is enabled
 */ const GEN_AI_RESPONSE_TEXT_ATTRIBUTE = 'gen_ai.response.text';
/**
 * The available tools from incoming request
 * Only recorded when recordInputs is enabled
 */ const GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE = 'gen_ai.request.available_tools';
/**
 * Whether the response is a streaming response
 */ const GEN_AI_RESPONSE_STREAMING_ATTRIBUTE = 'gen_ai.response.streaming';
/**
 * The tool calls from the response
 * Only recorded when recordOutputs is enabled
 */ const GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE = 'gen_ai.response.tool_calls';
/**
 * The agent name
 */ const GEN_AI_AGENT_NAME_ATTRIBUTE = 'gen_ai.agent.name';
/**
 * The pipeline name
 */ const GEN_AI_PIPELINE_NAME_ATTRIBUTE = 'gen_ai.pipeline.name';
/**
 * The conversation ID for linking messages across API calls
 * For OpenAI Assistants API: thread_id
 * For LangGraph: configurable.thread_id
 */ const GEN_AI_CONVERSATION_ID_ATTRIBUTE = 'gen_ai.conversation.id';
/**
 * The number of cache creation input tokens used
 */ const GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE = 'gen_ai.usage.cache_creation_input_tokens';
/**
 * The number of cache read input tokens used
 */ const GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE = 'gen_ai.usage.cache_read_input_tokens';
/**
 * The number of cache write input tokens used
 */ const GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE = 'gen_ai.usage.input_tokens.cache_write';
/**
 * The number of cached input tokens that were used
 */ const GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE = 'gen_ai.usage.input_tokens.cached';
/**
 * The span operation name for invoking an agent
 */ const GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE = 'gen_ai.invoke_agent';
/**
 * The span operation name for generating text
 */ const GEN_AI_GENERATE_TEXT_DO_GENERATE_OPERATION_ATTRIBUTE = 'gen_ai.generate_text';
/**
 * The span operation name for streaming text
 */ const GEN_AI_STREAM_TEXT_DO_STREAM_OPERATION_ATTRIBUTE = 'gen_ai.stream_text';
/**
 * The span operation name for generating object
 */ const GEN_AI_GENERATE_OBJECT_DO_GENERATE_OPERATION_ATTRIBUTE = 'gen_ai.generate_object';
/**
 * The span operation name for streaming object
 */ const GEN_AI_STREAM_OBJECT_DO_STREAM_OPERATION_ATTRIBUTE = 'gen_ai.stream_object';
/**
 * The embeddings input
 * Only recorded when recordInputs is enabled
 */ const GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE = 'gen_ai.embeddings.input';
/**
 * The span operation name for embedding
 */ const GEN_AI_EMBED_DO_EMBED_OPERATION_ATTRIBUTE = 'gen_ai.embed';
/**
 * The span operation name for embedding many
 */ const GEN_AI_EMBED_MANY_DO_EMBED_OPERATION_ATTRIBUTE = 'gen_ai.embed_many';
/**
 * The span operation name for reranking
 */ const GEN_AI_RERANK_DO_RERANK_OPERATION_ATTRIBUTE = 'gen_ai.rerank';
/**
 * The span operation name for executing a tool
 */ const GEN_AI_EXECUTE_TOOL_OPERATION_ATTRIBUTE = 'gen_ai.execute_tool';
/**
 * The tool name for tool call spans
 */ const GEN_AI_TOOL_NAME_ATTRIBUTE = 'gen_ai.tool.name';
/**
 * The tool call ID
 */ const GEN_AI_TOOL_CALL_ID_ATTRIBUTE = 'gen_ai.tool.call.id';
/**
 * The tool type (e.g., 'function')
 */ const GEN_AI_TOOL_TYPE_ATTRIBUTE = 'gen_ai.tool.type';
/**
 * The tool input/arguments
 */ const GEN_AI_TOOL_INPUT_ATTRIBUTE = 'gen_ai.tool.input';
/**
 * The tool output/result
 */ const GEN_AI_TOOL_OUTPUT_ATTRIBUTE = 'gen_ai.tool.output';
// =============================================================================
// OPENAI-SPECIFIC ATTRIBUTES
// =============================================================================
/**
 * The response ID from OpenAI
 */ const OPENAI_RESPONSE_ID_ATTRIBUTE = 'openai.response.id';
/**
 * The response model from OpenAI
 */ const OPENAI_RESPONSE_MODEL_ATTRIBUTE = 'openai.response.model';
/**
 * The response timestamp from OpenAI (ISO string)
 */ const OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE = 'openai.response.timestamp';
/**
 * The number of completion tokens used
 */ const OPENAI_USAGE_COMPLETION_TOKENS_ATTRIBUTE = 'openai.usage.completion_tokens';
/**
 * The number of prompt tokens used
 */ const OPENAI_USAGE_PROMPT_TOKENS_ATTRIBUTE = 'openai.usage.prompt_tokens';
// =============================================================================
// OPENAI OPERATIONS
// =============================================================================
/**
 * OpenAI API operations following OpenTelemetry semantic conventions
 * @see https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/#llm-request-spans
 */ const OPENAI_OPERATIONS = {
    CHAT: 'chat',
    EMBEDDINGS: 'embeddings'
};
// =============================================================================
// ANTHROPIC AI OPERATIONS
// =============================================================================
/**
 * The response timestamp from Anthropic AI (ISO string)
 */ const ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE = 'anthropic.response.timestamp';
;
 //# sourceMappingURL=gen-ai-attributes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMBEDDINGS_OPS",
    ()=>EMBEDDINGS_OPS,
    "GENERATE_CONTENT_OPS",
    ()=>GENERATE_CONTENT_OPS,
    "INVOKE_AGENT_OPS",
    ()=>INVOKE_AGENT_OPS,
    "RERANK_OPS",
    ()=>RERANK_OPS,
    "toolCallSpanMap",
    ()=>toolCallSpanMap
]);
// Global Map to track tool call IDs to their corresponding spans
// This allows us to capture tool errors and link them to the correct span
const toolCallSpanMap = new Map();
// Operation sets for efficient mapping to OpenTelemetry semantic convention values
const INVOKE_AGENT_OPS = new Set([
    'ai.generateText',
    'ai.streamText',
    'ai.generateObject',
    'ai.streamObject',
    'ai.embed',
    'ai.embedMany',
    'ai.rerank'
]);
const GENERATE_CONTENT_OPS = new Set([
    'ai.generateText.doGenerate',
    'ai.streamText.doStream',
    'ai.generateObject.doGenerate',
    'ai.streamObject.doStream'
]);
const EMBEDDINGS_OPS = new Set([
    'ai.embed.doEmbed',
    'ai.embedMany.doEmbed'
]);
const RERANK_OPS = new Set([
    'ai.rerank.doRerank'
]);
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT",
    ()=>DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT,
    "truncateGenAiMessages",
    ()=>truncateGenAiMessages,
    "truncateGenAiStringInput",
    ()=>truncateGenAiStringInput
]);
/**
 * Default maximum size in bytes for GenAI messages.
 * Messages exceeding this limit will be truncated.
 */ const DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT = 20000;
/**
 * Message format used by OpenAI and Anthropic APIs.
 */ /**
 * Calculate the UTF-8 byte length of a string.
 */ const utf8Bytes = (text)=>{
    return new TextEncoder().encode(text).length;
};
/**
 * Calculate the UTF-8 byte length of a value's JSON representation.
 */ const jsonBytes = (value)=>{
    return utf8Bytes(JSON.stringify(value));
};
/**
 * Truncate a string to fit within maxBytes when encoded as UTF-8.
 * Uses binary search for efficiency with multi-byte characters.
 *
 * @param text - The string to truncate
 * @param maxBytes - Maximum byte length (UTF-8 encoded)
 * @returns Truncated string that fits within maxBytes
 */ function truncateTextByBytes(text, maxBytes) {
    if (utf8Bytes(text) <= maxBytes) {
        return text;
    }
    let low = 0;
    let high = text.length;
    let bestFit = '';
    while(low <= high){
        const mid = Math.floor((low + high) / 2);
        const candidate = text.slice(0, mid);
        const byteSize = utf8Bytes(candidate);
        if (byteSize <= maxBytes) {
            bestFit = candidate;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return bestFit;
}
/**
 * Extract text content from a Google GenAI message part.
 * Parts are either plain strings or objects with a text property.
 *
 * @returns The text content
 */ function getPartText(part) {
    if (typeof part === 'string') {
        return part;
    }
    if ('text' in part) return part.text;
    return '';
}
/**
 * Create a new part with updated text content while preserving the original structure.
 *
 * @param part - Original part (string or object)
 * @param text - New text content
 * @returns New part with updated text
 */ function withPartText(part, text) {
    if (typeof part === 'string') {
        return text;
    }
    return {
        ...part,
        text
    };
}
/**
 * Check if a message has the OpenAI/Anthropic content format.
 */ function isContentMessage(message) {
    return message !== null && typeof message === 'object' && 'content' in message && typeof message.content === 'string';
}
/**
 * Check if a message has the OpenAI/Anthropic content array format.
 */ function isContentArrayMessage(message) {
    return message !== null && typeof message === 'object' && 'content' in message && Array.isArray(message.content);
}
/**
 * Check if a content part is an OpenAI/Anthropic media source
 */ function isContentMedia(part) {
    if (!part || typeof part !== 'object') return false;
    return isContentMediaSource(part) || hasInlineData(part) || 'media_type' in part && typeof part.media_type === 'string' && 'data' in part || 'image_url' in part && typeof part.image_url === 'string' && part.image_url.startsWith('data:') || 'type' in part && (part.type === 'blob' || part.type === 'base64') || 'b64_json' in part || 'type' in part && 'result' in part && part.type === 'image_generation' || 'uri' in part && typeof part.uri === 'string' && part.uri.startsWith('data:');
}
function isContentMediaSource(part) {
    return 'type' in part && typeof part.type === 'string' && 'source' in part && isContentMedia(part.source);
}
function hasInlineData(part) {
    return 'inlineData' in part && !!part.inlineData && typeof part.inlineData === 'object' && 'data' in part.inlineData && typeof part.inlineData.data === 'string';
}
/**
 * Check if a message has the Google GenAI parts format.
 */ function isPartsMessage(message) {
    return message !== null && typeof message === 'object' && 'parts' in message && Array.isArray(message.parts) && message.parts.length > 0;
}
/**
 * Truncate a message with `content: string` format (OpenAI/Anthropic).
 *
 * @param message - Message with content property
 * @param maxBytes - Maximum byte limit
 * @returns Array with truncated message, or empty array if it doesn't fit
 */ function truncateContentMessage(message, maxBytes) {
    // Calculate overhead (message structure without content)
    const emptyMessage = {
        ...message,
        content: ''
    };
    const overhead = jsonBytes(emptyMessage);
    const availableForContent = maxBytes - overhead;
    if (availableForContent <= 0) {
        return [];
    }
    const truncatedContent = truncateTextByBytes(message.content, availableForContent);
    return [
        {
            ...message,
            content: truncatedContent
        }
    ];
}
/**
 * Truncate a message with `parts: [...]` format (Google GenAI).
 * Keeps as many complete parts as possible, only truncating the first part if needed.
 *
 * @param message - Message with parts array
 * @param maxBytes - Maximum byte limit
 * @returns Array with truncated message, or empty array if it doesn't fit
 */ function truncatePartsMessage(message, maxBytes) {
    const { parts } = message;
    // Calculate overhead by creating empty text parts
    const emptyParts = parts.map((part)=>withPartText(part, ''));
    const overhead = jsonBytes({
        ...message,
        parts: emptyParts
    });
    let remainingBytes = maxBytes - overhead;
    if (remainingBytes <= 0) {
        return [];
    }
    // Include parts until we run out of space
    const includedParts = [];
    for (const part of parts){
        const text = getPartText(part);
        const textSize = utf8Bytes(text);
        if (textSize <= remainingBytes) {
            // Part fits: include it as-is
            includedParts.push(part);
            remainingBytes -= textSize;
        } else if (includedParts.length === 0) {
            // First part doesn't fit: truncate it
            const truncated = truncateTextByBytes(text, remainingBytes);
            if (truncated) {
                includedParts.push(withPartText(part, truncated));
            }
            break;
        } else {
            break;
        }
    }
    /* c8 ignore start
   * for type safety only, algorithm guarantees SOME text included */ if (includedParts.length <= 0) {
        return [];
    } else {
        /* c8 ignore stop */ return [
            {
                ...message,
                parts: includedParts
            }
        ];
    }
}
/**
 * Truncate a single message to fit within maxBytes.
 *
 * Supports two message formats:
 * - OpenAI/Anthropic: `{ ..., content: string }`
 * - Google GenAI: `{ ..., parts: Array<string | {text: string} | non-text> }`
 *
 * @param message - The message to truncate
 * @param maxBytes - Maximum byte limit for the message
 * @returns Array containing the truncated message, or empty array if truncation fails
 */ function truncateSingleMessage(message, maxBytes) {
    if (!message) return [];
    // Handle plain strings (e.g., embeddings input)
    if (typeof message === 'string') {
        const truncated = truncateTextByBytes(message, maxBytes);
        return truncated ? [
            truncated
        ] : [];
    }
    if (typeof message !== 'object') {
        return [];
    }
    if (isContentMessage(message)) {
        return truncateContentMessage(message, maxBytes);
    }
    if (isPartsMessage(message)) {
        return truncatePartsMessage(message, maxBytes);
    }
    // Unknown message format: cannot truncate safely
    return [];
}
const REMOVED_STRING = '[Filtered]';
const MEDIA_FIELDS = [
    'image_url',
    'data',
    'content',
    'b64_json',
    'result',
    'uri'
];
function stripInlineMediaFromSingleMessage(part) {
    const strip = {
        ...part
    };
    if (isContentMedia(strip.source)) {
        strip.source = stripInlineMediaFromSingleMessage(strip.source);
    }
    // google genai inline data blob objects
    if (hasInlineData(part)) {
        strip.inlineData = {
            ...part.inlineData,
            data: REMOVED_STRING
        };
    }
    for (const field of MEDIA_FIELDS){
        if (typeof strip[field] === 'string') strip[field] = REMOVED_STRING;
    }
    return strip;
}
/**
 * Strip the inline media from message arrays.
 *
 * This returns a stripped message. We do NOT want to mutate the data in place,
 * because of course we still want the actual API/client to handle the media.
 */ function stripInlineMediaFromMessages(messages) {
    const stripped = messages.map((message)=>{
        let newMessage = undefined;
        if (!!message && typeof message === 'object') {
            if (isContentArrayMessage(message)) {
                newMessage = {
                    ...message,
                    content: stripInlineMediaFromMessages(message.content)
                };
            } else if ('content' in message && isContentMedia(message.content)) {
                newMessage = {
                    ...message,
                    content: stripInlineMediaFromSingleMessage(message.content)
                };
            }
            if (isPartsMessage(message)) {
                newMessage = {
                    // might have to strip content AND parts
                    ...newMessage ?? message,
                    parts: stripInlineMediaFromMessages(message.parts)
                };
            }
            if (isContentMedia(newMessage)) {
                newMessage = stripInlineMediaFromSingleMessage(newMessage);
            } else if (isContentMedia(message)) {
                newMessage = stripInlineMediaFromSingleMessage(message);
            }
        }
        return newMessage ?? message;
    });
    return stripped;
}
/**
 * Truncate an array of messages to fit within a byte limit.
 *
 * Strategy:
 * - Always keeps only the last (newest) message
 * - Strips inline media from the message
 * - Truncates the message content if it exceeds the byte limit
 *
 * @param messages - Array of messages to truncate
 * @param maxBytes - Maximum total byte limit for the message
 * @returns Array containing only the last message (possibly truncated)
 *
 * @example
 * ```ts
 * const messages = [msg1, msg2, msg3, msg4]; // newest is msg4
 * const truncated = truncateMessagesByBytes(messages, 10000);
 * // Returns [msg4] (truncated if needed)
 * ```
 */ function truncateMessagesByBytes(messages, maxBytes) {
    // Early return for empty or invalid input
    if (!Array.isArray(messages) || messages.length === 0) {
        return messages;
    }
    // Always keep only the last message
    const lastMessage = messages[messages.length - 1];
    // Strip inline media from the single message
    const stripped = stripInlineMediaFromMessages([
        lastMessage
    ]);
    const strippedMessage = stripped[0];
    // Check if it fits
    const messageBytes = jsonBytes(strippedMessage);
    if (messageBytes <= maxBytes) {
        return stripped;
    }
    // Truncate the single message if needed
    return truncateSingleMessage(strippedMessage, maxBytes);
}
/**
 * Truncate GenAI messages using the default byte limit.
 *
 * Convenience wrapper around `truncateMessagesByBytes` with the default limit.
 *
 * @param messages - Array of messages to truncate
 * @returns Truncated array of messages
 */ function truncateGenAiMessages(messages) {
    return truncateMessagesByBytes(messages, DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT);
}
/**
 * Truncate GenAI string input using the default byte limit.
 *
 * @param input - The string to truncate
 * @returns Truncated string
 */ function truncateGenAiStringInput(input) {
    return truncateTextByBytes(input, DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT);
}
;
 //# sourceMappingURL=messageTruncation.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildMethodPath",
    ()=>buildMethodPath,
    "extractSystemInstructions",
    ()=>extractSystemInstructions,
    "getFinalOperationName",
    ()=>getFinalOperationName,
    "getSpanOperation",
    ()=>getSpanOperation,
    "getTruncatedJsonString",
    ()=>getTruncatedJsonString,
    "setTokenUsageAttributes",
    ()=>setTokenUsageAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [instrumentation-edge] (ecmascript)");
;
;
/**
 * Maps AI method paths to OpenTelemetry semantic convention operation names
 * @see https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/#llm-request-spans
 */ function getFinalOperationName(methodPath) {
    if (methodPath.includes('messages')) {
        return 'chat';
    }
    if (methodPath.includes('completions')) {
        return 'text_completion';
    }
    // Google GenAI: models.generateContent* -> generate_content (actually generates AI responses)
    if (methodPath.includes('generateContent')) {
        return 'generate_content';
    }
    // Anthropic: models.get/retrieve -> models (metadata retrieval only)
    if (methodPath.includes('models')) {
        return 'models';
    }
    if (methodPath.includes('chat')) {
        return 'chat';
    }
    return methodPath.split('.').pop() || 'unknown';
}
/**
 * Get the span operation for AI methods
 * Following Sentry's convention: "gen_ai.{operation_name}"
 */ function getSpanOperation(methodPath) {
    return `gen_ai.${getFinalOperationName(methodPath)}`;
}
/**
 * Build method path from current traversal
 */ function buildMethodPath(currentPath, prop) {
    return currentPath ? `${currentPath}.${prop}` : prop;
}
/**
 * Set token usage attributes
 * @param span - The span to add attributes to
 * @param promptTokens - The number of prompt tokens
 * @param completionTokens - The number of completion tokens
 * @param cachedInputTokens - The number of cached input tokens
 * @param cachedOutputTokens - The number of cached output tokens
 */ function setTokenUsageAttributes(span, promptTokens, completionTokens, cachedInputTokens, cachedOutputTokens) {
    if (promptTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]]: promptTokens
        });
    }
    if (completionTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]]: completionTokens
        });
    }
    if (promptTokens !== undefined || completionTokens !== undefined || cachedInputTokens !== undefined || cachedOutputTokens !== undefined) {
        /**
     * Total input tokens in a request is the summation of `input_tokens`,
     * `cache_creation_input_tokens`, and `cache_read_input_tokens`.
     */ const totalTokens = (promptTokens ?? 0) + (completionTokens ?? 0) + (cachedInputTokens ?? 0) + (cachedOutputTokens ?? 0);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]]: totalTokens
        });
    }
}
/**
 * Get the truncated JSON string for a string or array of strings.
 *
 * @param value - The string or array of strings to truncate
 * @returns The truncated JSON string
 */ function getTruncatedJsonString(value) {
    if (typeof value === 'string') {
        // Some values are already JSON strings, so we don't need to duplicate the JSON parsing
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["truncateGenAiStringInput"])(value);
    }
    if (Array.isArray(value)) {
        // truncateGenAiMessages returns an array of strings, so we need to stringify it
        const truncatedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["truncateGenAiMessages"])(value);
        return JSON.stringify(truncatedMessages);
    }
    // value is an object, so we need to stringify it
    return JSON.stringify(value);
}
/**
 * Extract system instructions from messages array.
 * Finds the first system message and formats it according to OpenTelemetry semantic conventions.
 *
 * @param messages - Array of messages to extract system instructions from
 * @returns systemInstructions (JSON string) and filteredMessages (without system message)
 */ function extractSystemInstructions(messages) {
    if (!Array.isArray(messages)) {
        return {
            systemInstructions: undefined,
            filteredMessages: messages
        };
    }
    const systemMessageIndex = messages.findIndex((msg)=>msg && typeof msg === 'object' && 'role' in msg && msg.role === 'system');
    if (systemMessageIndex === -1) {
        return {
            systemInstructions: undefined,
            filteredMessages: messages
        };
    }
    const systemMessage = messages[systemMessageIndex];
    const systemContent = typeof systemMessage.content === 'string' ? systemMessage.content : systemMessage.content !== undefined ? JSON.stringify(systemMessage.content) : undefined;
    if (!systemContent) {
        return {
            systemInstructions: undefined,
            filteredMessages: messages
        };
    }
    const systemInstructions = JSON.stringify([
        {
            type: 'text',
            content: systemContent
        }
    ]);
    const filteredMessages = [
        ...messages.slice(0, systemMessageIndex),
        ...messages.slice(systemMessageIndex + 1)
    ];
    return {
        systemInstructions,
        filteredMessages
    };
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/vercel-ai-attributes.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AI_MODEL_ID_ATTRIBUTE",
    ()=>AI_MODEL_ID_ATTRIBUTE,
    "AI_OPERATION_ID_ATTRIBUTE",
    ()=>AI_OPERATION_ID_ATTRIBUTE,
    "AI_PROMPT_ATTRIBUTE",
    ()=>AI_PROMPT_ATTRIBUTE,
    "AI_PROMPT_MESSAGES_ATTRIBUTE",
    ()=>AI_PROMPT_MESSAGES_ATTRIBUTE,
    "AI_PROMPT_TOOLS_ATTRIBUTE",
    ()=>AI_PROMPT_TOOLS_ATTRIBUTE,
    "AI_RESPONSE_OBJECT_ATTRIBUTE",
    ()=>AI_RESPONSE_OBJECT_ATTRIBUTE,
    "AI_RESPONSE_PROVIDER_METADATA_ATTRIBUTE",
    ()=>AI_RESPONSE_PROVIDER_METADATA_ATTRIBUTE,
    "AI_RESPONSE_TEXT_ATTRIBUTE",
    ()=>AI_RESPONSE_TEXT_ATTRIBUTE,
    "AI_RESPONSE_TOOL_CALLS_ATTRIBUTE",
    ()=>AI_RESPONSE_TOOL_CALLS_ATTRIBUTE,
    "AI_SCHEMA_ATTRIBUTE",
    ()=>AI_SCHEMA_ATTRIBUTE,
    "AI_TELEMETRY_FUNCTION_ID_ATTRIBUTE",
    ()=>AI_TELEMETRY_FUNCTION_ID_ATTRIBUTE,
    "AI_TOOL_CALL_ARGS_ATTRIBUTE",
    ()=>AI_TOOL_CALL_ARGS_ATTRIBUTE,
    "AI_TOOL_CALL_ID_ATTRIBUTE",
    ()=>AI_TOOL_CALL_ID_ATTRIBUTE,
    "AI_TOOL_CALL_NAME_ATTRIBUTE",
    ()=>AI_TOOL_CALL_NAME_ATTRIBUTE,
    "AI_TOOL_CALL_RESULT_ATTRIBUTE",
    ()=>AI_TOOL_CALL_RESULT_ATTRIBUTE,
    "AI_USAGE_CACHED_INPUT_TOKENS_ATTRIBUTE",
    ()=>AI_USAGE_CACHED_INPUT_TOKENS_ATTRIBUTE,
    "AI_USAGE_COMPLETION_TOKENS_ATTRIBUTE",
    ()=>AI_USAGE_COMPLETION_TOKENS_ATTRIBUTE,
    "AI_USAGE_PROMPT_TOKENS_ATTRIBUTE",
    ()=>AI_USAGE_PROMPT_TOKENS_ATTRIBUTE,
    "OPERATION_NAME_ATTRIBUTE",
    ()=>OPERATION_NAME_ATTRIBUTE
]);
/* eslint-disable max-lines */ /**
 * AI SDK Telemetry Attributes
 * Based on https://ai-sdk.dev/docs/ai-sdk-core/telemetry#collected-data
 */ // =============================================================================
// COMMON ATTRIBUTES
// =============================================================================
/**
 * Common attribute for operation name across all functions and spans
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#collected-data
 */ const OPERATION_NAME_ATTRIBUTE = 'operation.name';
/**
 * Common attribute for AI operation ID across all functions and spans
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#collected-data
 */ const AI_OPERATION_ID_ATTRIBUTE = 'ai.operationId';
// =============================================================================
// SHARED ATTRIBUTES
// =============================================================================
/**
 * `generateText` function - `ai.generateText` span
 * `streamText` function - `ai.streamText` span
 *
 * The prompt that was used when calling the function
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#generatetext-function
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#streamtext-function
 */ const AI_PROMPT_ATTRIBUTE = 'ai.prompt';
/**
 * `generateObject` function - `ai.generateObject` span
 * `streamObject` function - `ai.streamObject` span
 *
 * The JSON schema version of the schema that was passed into the function
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#generateobject-function
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#streamobject-function
 */ const AI_SCHEMA_ATTRIBUTE = 'ai.schema';
/**
 * `generateObject` function - `ai.generateObject` span
 * `streamObject` function - `ai.streamObject` span
 *
 * The object that was generated (stringified JSON)
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#generateobject-function
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#streamobject-function
 */ const AI_RESPONSE_OBJECT_ATTRIBUTE = 'ai.response.object';
// =============================================================================
// GENERATETEXT FUNCTION - UNIQUE ATTRIBUTES
// =============================================================================
/**
 * `generateText` function - `ai.generateText` span
 *
 * The text that was generated
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#generatetext-function
 */ const AI_RESPONSE_TEXT_ATTRIBUTE = 'ai.response.text';
/**
 * `generateText` function - `ai.generateText` span
 *
 * The tool calls that were made as part of the generation (stringified JSON)
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#generatetext-function
 */ const AI_RESPONSE_TOOL_CALLS_ATTRIBUTE = 'ai.response.toolCalls';
/**
 * `generateText` function - `ai.generateText.doGenerate` span
 *
 * The messages that were passed into the provider
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#generatetext-function
 */ const AI_PROMPT_MESSAGES_ATTRIBUTE = 'ai.prompt.messages';
/**
 * `generateText` function - `ai.generateText.doGenerate` span
 *
 * Array of stringified tool definitions
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#generatetext-function
 */ const AI_PROMPT_TOOLS_ATTRIBUTE = 'ai.prompt.tools';
/**
 * Basic LLM span information
 * Multiple spans
 *
 * The id of the model
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#basic-llm-span-information
 */ const AI_MODEL_ID_ATTRIBUTE = 'ai.model.id';
/**
 * Basic LLM span information
 * Multiple spans
 *
 * Provider specific metadata returned with the generation response
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#basic-llm-span-information
 */ const AI_RESPONSE_PROVIDER_METADATA_ATTRIBUTE = 'ai.response.providerMetadata';
/**
 * Basic LLM span information
 * Multiple spans
 *
 * The number of cached input tokens that were used
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#basic-llm-span-information
 */ const AI_USAGE_CACHED_INPUT_TOKENS_ATTRIBUTE = 'ai.usage.cachedInputTokens';
/**
 * Basic LLM span information
 * Multiple spans
 *
 * The functionId that was set through `telemetry.functionId`
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#basic-llm-span-information
 */ const AI_TELEMETRY_FUNCTION_ID_ATTRIBUTE = 'ai.telemetry.functionId';
/**
 * Basic LLM span information
 * Multiple spans
 *
 * The number of completion tokens that were used
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#basic-llm-span-information
 */ const AI_USAGE_COMPLETION_TOKENS_ATTRIBUTE = 'ai.usage.completionTokens';
/**
 * Basic LLM span information
 * Multiple spans
 *
 * The number of prompt tokens that were used
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#basic-llm-span-information
 */ const AI_USAGE_PROMPT_TOKENS_ATTRIBUTE = 'ai.usage.promptTokens';
// =============================================================================
// TOOL CALL SPANS
// =============================================================================
/**
 * Tool call spans
 * `ai.toolCall` span
 *
 * The name of the tool
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#tool-call-spans
 */ const AI_TOOL_CALL_NAME_ATTRIBUTE = 'ai.toolCall.name';
/**
 * Tool call spans
 * `ai.toolCall` span
 *
 * The id of the tool call
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#tool-call-spans
 */ const AI_TOOL_CALL_ID_ATTRIBUTE = 'ai.toolCall.id';
/**
 * Tool call spans
 * `ai.toolCall` span
 *
 * The parameters of the tool call
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#tool-call-spans
 */ const AI_TOOL_CALL_ARGS_ATTRIBUTE = 'ai.toolCall.args';
/**
 * Tool call spans
 * `ai.toolCall` span
 *
 * The result of the tool call
 * @see https://ai-sdk.dev/docs/ai-sdk-core/telemetry#tool-call-spans
 */ const AI_TOOL_CALL_RESULT_ATTRIBUTE = 'ai.toolCall.result';
;
 //# sourceMappingURL=vercel-ai-attributes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_INTERNAL_cleanupToolCallSpan",
    ()=>_INTERNAL_cleanupToolCallSpan,
    "_INTERNAL_getSpanForToolCallId",
    ()=>_INTERNAL_getSpanForToolCallId,
    "accumulateTokensForParent",
    ()=>accumulateTokensForParent,
    "applyAccumulatedTokens",
    ()=>applyAccumulatedTokens,
    "convertAvailableToolsToJsonString",
    ()=>convertAvailableToolsToJsonString,
    "convertUserInputToMessagesFormat",
    ()=>convertUserInputToMessagesFormat,
    "getSpanOpFromName",
    ()=>getSpanOpFromName,
    "requestMessagesFromPrompt",
    ()=>requestMessagesFromPrompt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/vercel-ai-attributes.js [instrumentation-edge] (ecmascript)");
;
;
;
;
/**
 * Accumulates token data from a span to its parent in the token accumulator map.
 * This function extracts token usage from the current span and adds it to the
 * accumulated totals for its parent span.
 */ function accumulateTokensForParent(span, tokenAccumulator) {
    const parentSpanId = span.parent_span_id;
    if (!parentSpanId) {
        return;
    }
    const inputTokens = span.data[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]];
    const outputTokens = span.data[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]];
    if (typeof inputTokens === 'number' || typeof outputTokens === 'number') {
        const existing = tokenAccumulator.get(parentSpanId) || {
            inputTokens: 0,
            outputTokens: 0
        };
        if (typeof inputTokens === 'number') {
            existing.inputTokens += inputTokens;
        }
        if (typeof outputTokens === 'number') {
            existing.outputTokens += outputTokens;
        }
        tokenAccumulator.set(parentSpanId, existing);
    }
}
/**
 * Applies accumulated token data to the `gen_ai.invoke_agent` span.
 * Only immediate children of the `gen_ai.invoke_agent` span are considered,
 * since aggregation will automatically occur for each parent span.
 */ function applyAccumulatedTokens(spanOrTrace, tokenAccumulator) {
    const accumulated = tokenAccumulator.get(spanOrTrace.span_id);
    if (!accumulated || !spanOrTrace.data) {
        return;
    }
    if (accumulated.inputTokens > 0) {
        spanOrTrace.data[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]] = accumulated.inputTokens;
    }
    if (accumulated.outputTokens > 0) {
        spanOrTrace.data[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]] = accumulated.outputTokens;
    }
    if (accumulated.inputTokens > 0 || accumulated.outputTokens > 0) {
        spanOrTrace.data['gen_ai.usage.total_tokens'] = accumulated.inputTokens + accumulated.outputTokens;
    }
}
/**
 * Get the span associated with a tool call ID
 */ function _INTERNAL_getSpanForToolCallId(toolCallId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["toolCallSpanMap"].get(toolCallId);
}
/**
 * Clean up the span mapping for a tool call ID
 */ function _INTERNAL_cleanupToolCallSpan(toolCallId) {
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["toolCallSpanMap"].delete(toolCallId);
}
/**
 * Convert an array of tool strings to a JSON string
 */ function convertAvailableToolsToJsonString(tools) {
    const toolObjects = tools.map((tool)=>{
        if (typeof tool === 'string') {
            try {
                return JSON.parse(tool);
            } catch  {
                return tool;
            }
        }
        return tool;
    });
    return JSON.stringify(toolObjects);
}
/**
 * Filter out invalid entries in messages array
 * @param input - The input array to filter
 * @returns The filtered array
 */ function filterMessagesArray(input) {
    return input.filter((m)=>!!m && typeof m === 'object' && 'role' in m && 'content' in m);
}
/**
 * Normalize the user input (stringified object with prompt, system, messages) to messages array
 */ function convertUserInputToMessagesFormat(userInput) {
    try {
        const p = JSON.parse(userInput);
        if (!!p && typeof p === 'object') {
            let { messages } = p;
            const { prompt, system } = p;
            const result = [];
            // prepend top-level system instruction if present
            if (typeof system === 'string') {
                result.push({
                    role: 'system',
                    content: system
                });
            }
            // stringified messages array
            if (typeof messages === 'string') {
                try {
                    messages = JSON.parse(messages);
                } catch  {
                // ignore parse errors
                }
            }
            // messages array format: { messages: [...] }
            if (Array.isArray(messages)) {
                result.push(...filterMessagesArray(messages));
                return result;
            }
            // prompt array format: { prompt: [...] }
            if (Array.isArray(prompt)) {
                result.push(...filterMessagesArray(prompt));
                return result;
            }
            // prompt string format: { prompt: "..." }
            if (typeof prompt === 'string') {
                result.push({
                    role: 'user',
                    content: prompt
                });
            }
            if (result.length > 0) {
                return result;
            }
        }
    // eslint-disable-next-line no-empty
    } catch  {}
    return [];
}
/**
 * Generate a request.messages JSON array from the prompt field in the
 * invoke_agent op
 */ function requestMessagesFromPrompt(span, attributes) {
    if (typeof attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_ATTRIBUTE"]] === 'string' && !attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"]] && !attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_MESSAGES_ATTRIBUTE"]]) {
        // No messages array is present, so we need to convert the prompt to the proper messages format
        // This is the case for ai.generateText spans
        // The ai.prompt attribute is a stringified object with prompt, system, messages attributes
        // The format of these is described in the vercel docs, for instance: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-object#parameters
        const userInput = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_ATTRIBUTE"]];
        const messages = convertUserInputToMessagesFormat(userInput);
        if (messages.length) {
            const { systemInstructions, filteredMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSystemInstructions"])(messages);
            if (systemInstructions) {
                span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE"], systemInstructions);
            }
            const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
            const truncatedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(filteredMessages);
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_ATTRIBUTE"]]: truncatedMessages,
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"]]: truncatedMessages,
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"]]: filteredLength
            });
        }
    } else if (typeof attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_MESSAGES_ATTRIBUTE"]] === 'string') {
        // In this case we already get a properly formatted messages array, this is the preferred way to get the messages
        // This is the case for ai.generateText.doGenerate spans
        try {
            const messages = JSON.parse(attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_MESSAGES_ATTRIBUTE"]]);
            if (Array.isArray(messages)) {
                const { systemInstructions, filteredMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSystemInstructions"])(messages);
                if (systemInstructions) {
                    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE"], systemInstructions);
                }
                const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
                const truncatedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(filteredMessages);
                span.setAttributes({
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_MESSAGES_ATTRIBUTE"]]: truncatedMessages,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"]]: truncatedMessages,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"]]: filteredLength
                });
            }
        // eslint-disable-next-line no-empty
        } catch  {}
    }
}
/**
 * Maps a Vercel AI span name to the corresponding Sentry op.
 */ function getSpanOpFromName(name) {
    switch(name){
        case 'ai.generateText':
        case 'ai.streamText':
        case 'ai.generateObject':
        case 'ai.streamObject':
        case 'ai.embed':
        case 'ai.embedMany':
        case 'ai.rerank':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE"];
        case 'ai.generateText.doGenerate':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_GENERATE_TEXT_DO_GENERATE_OPERATION_ATTRIBUTE"];
        case 'ai.streamText.doStream':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_STREAM_TEXT_DO_STREAM_OPERATION_ATTRIBUTE"];
        case 'ai.generateObject.doGenerate':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_GENERATE_OBJECT_DO_GENERATE_OPERATION_ATTRIBUTE"];
        case 'ai.streamObject.doStream':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_STREAM_OBJECT_DO_STREAM_OPERATION_ATTRIBUTE"];
        case 'ai.embed.doEmbed':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_EMBED_DO_EMBED_OPERATION_ATTRIBUTE"];
        case 'ai.embedMany.doEmbed':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_EMBED_MANY_DO_EMBED_OPERATION_ATTRIBUTE"];
        case 'ai.rerank.doRerank':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RERANK_DO_RERANK_OPERATION_ATTRIBUTE"];
        case 'ai.toolCall':
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_EXECUTE_TOOL_OPERATION_ATTRIBUTE"];
        default:
            if (name.startsWith('ai.stream')) {
                return 'ai.run';
            }
            return undefined;
    }
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addVercelAiProcessors",
    ()=>addVercelAiProcessors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/spanUtils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/vercel-ai/vercel-ai-attributes.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
;
function addOriginToSpan(span, origin) {
    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"], origin);
}
/**
 * Maps Vercel AI SDK operation names to OpenTelemetry semantic convention values
 * @see https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/#llm-request-spans
 */ function mapVercelAiOperationName(operationName) {
    // Top-level pipeline operations map to invoke_agent
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["INVOKE_AGENT_OPS"].has(operationName)) {
        return 'invoke_agent';
    }
    // .do* operations are the actual LLM calls
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GENERATE_CONTENT_OPS"].has(operationName)) {
        return 'generate_content';
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["EMBEDDINGS_OPS"].has(operationName)) {
        return 'embeddings';
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["RERANK_OPS"].has(operationName)) {
        return 'rerank';
    }
    if (operationName === 'ai.toolCall') {
        return 'execute_tool';
    }
    // Return the original value for unknown operations
    return operationName;
}
/**
 * Post-process spans emitted by the Vercel AI SDK.
 * This is supposed to be used in `client.on('spanStart', ...)
 */ function onVercelAiSpanStart(span) {
    const { data: attributes, description: name } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["spanToJSON"])(span);
    if (!name) {
        return;
    }
    // Tool call spans
    // https://ai-sdk.dev/docs/ai-sdk-core/telemetry#tool-call-spans
    if (attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_TOOL_CALL_NAME_ATTRIBUTE"]] && attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_TOOL_CALL_ID_ATTRIBUTE"]] && name === 'ai.toolCall') {
        processToolCallSpan(span, attributes);
        return;
    }
    // V6+ Check if this is a Vercel AI span by checking if the operation ID attribute is present.
    // V5+ Check if this is a Vercel AI span by name pattern.
    if (!attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_OPERATION_ID_ATTRIBUTE"]] && !name.startsWith('ai.')) {
        return;
    }
    processGenerateSpan(span, name, attributes);
}
function vercelAiEventProcessor(event) {
    if (event.type === 'transaction' && event.spans) {
        // Map to accumulate token data by parent span ID
        const tokenAccumulator = new Map();
        // First pass: process all spans and accumulate token data
        for (const span of event.spans){
            processEndedVercelAiSpan(span);
            // Accumulate token data for parent spans
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["accumulateTokensForParent"])(span, tokenAccumulator);
        }
        // Second pass: apply accumulated token data to parent spans
        for (const span of event.spans){
            if (span.op !== 'gen_ai.invoke_agent') {
                continue;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["applyAccumulatedTokens"])(span, tokenAccumulator);
        }
        // Also apply to root when it is the invoke_agent pipeline
        const trace = event.contexts?.trace;
        if (trace && trace.op === 'gen_ai.invoke_agent') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["applyAccumulatedTokens"])(trace, tokenAccumulator);
        }
    }
    return event;
}
/**
 * Post-process spans emitted by the Vercel AI SDK.
 */ function processEndedVercelAiSpan(span) {
    const { data: attributes, origin } = span;
    if (origin !== 'auto.vercelai.otel') {
        return;
    }
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_USAGE_COMPLETION_TOKENS_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]);
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_USAGE_PROMPT_TOKENS_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]);
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_USAGE_CACHED_INPUT_TOKENS_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE"]);
    // Parent spans (ai.streamText, ai.streamObject, etc.) use inputTokens/outputTokens instead of promptTokens/completionTokens
    renameAttributeKey(attributes, 'ai.usage.inputTokens', __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]);
    renameAttributeKey(attributes, 'ai.usage.outputTokens', __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]);
    // AI SDK uses avgOutputTokensPerSecond, map to our expected attribute name
    renameAttributeKey(attributes, 'ai.response.avgOutputTokensPerSecond', 'ai.response.avgCompletionTokensPerSecond');
    // Input tokens is the sum of prompt tokens and cached input tokens
    if (typeof attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]] === 'number' && typeof attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE"]] === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]] = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]] + attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE"]];
    }
    if (typeof attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]] === 'number' && typeof attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]] === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]] = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]] + attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]];
    }
    // Convert the available tools array to a JSON string
    if (attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_TOOLS_ATTRIBUTE"]] && Array.isArray(attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_TOOLS_ATTRIBUTE"]])) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_TOOLS_ATTRIBUTE"]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["convertAvailableToolsToJsonString"])(attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_TOOLS_ATTRIBUTE"]]);
    }
    // Rename AI SDK attributes to standardized gen_ai attributes
    // Map operation.name to OpenTelemetry semantic convention values
    if (attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPERATION_NAME_ATTRIBUTE"]]) {
        const operationName = mapVercelAiOperationName(attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPERATION_NAME_ATTRIBUTE"]]);
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]] = operationName;
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPERATION_NAME_ATTRIBUTE"]];
    }
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_MESSAGES_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"]);
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_RESPONSE_TEXT_ATTRIBUTE"], 'gen_ai.response.text');
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"], 'gen_ai.response.tool_calls');
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_RESPONSE_OBJECT_ATTRIBUTE"], 'gen_ai.response.object');
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_PROMPT_TOOLS_ATTRIBUTE"], 'gen_ai.request.available_tools');
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_TOOL_CALL_ARGS_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_INPUT_ATTRIBUTE"]);
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_TOOL_CALL_RESULT_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_OUTPUT_ATTRIBUTE"]);
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_SCHEMA_ATTRIBUTE"], 'gen_ai.request.schema');
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_MODEL_ID_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]);
    addProviderMetadataToAttributes(attributes);
    // Change attributes namespaced with `ai.X` to `vercel.ai.X`
    for (const key of Object.keys(attributes)){
        if (key.startsWith('ai.')) {
            renameAttributeKey(attributes, key, `vercel.${key}`);
        }
    }
}
/**
 * Renames an attribute key in the provided attributes object if the old key exists.
 * This function safely handles null and undefined values.
 */ function renameAttributeKey(attributes, oldKey, newKey) {
    if (attributes[oldKey] != null) {
        attributes[newKey] = attributes[oldKey];
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete attributes[oldKey];
    }
}
function processToolCallSpan(span, attributes) {
    addOriginToSpan(span, 'auto.vercelai.otel');
    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"], 'gen_ai.execute_tool');
    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"], 'execute_tool');
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_TOOL_CALL_NAME_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_NAME_ATTRIBUTE"]);
    renameAttributeKey(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_TOOL_CALL_ID_ATTRIBUTE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_CALL_ID_ATTRIBUTE"]);
    // Store the span in our global map using the tool call ID
    // This allows us to capture tool errors and link them to the correct span
    const toolCallId = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_CALL_ID_ATTRIBUTE"]];
    if (typeof toolCallId === 'string') {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["toolCallSpanMap"].set(toolCallId, span);
    }
    // https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/#gen-ai-tool-type
    if (!attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_TYPE_ATTRIBUTE"]]) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_TYPE_ATTRIBUTE"], 'function');
    }
    const toolName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_NAME_ATTRIBUTE"]];
    if (toolName) {
        span.updateName(`execute_tool ${toolName}`);
    }
}
function processGenerateSpan(span, name, attributes) {
    addOriginToSpan(span, 'auto.vercelai.otel');
    const nameWthoutAi = name.replace('ai.', '');
    span.setAttribute('ai.pipeline.name', nameWthoutAi);
    span.updateName(nameWthoutAi);
    // If a telemetry name is set and the span represents a pipeline, use it as the operation name.
    // This name can be set at the request level by adding `experimental_telemetry.functionId`.
    const functionId = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_TELEMETRY_FUNCTION_ID_ATTRIBUTE"]];
    if (functionId && typeof functionId === 'string') {
        span.updateName(`${nameWthoutAi} ${functionId}`);
        span.setAttribute('gen_ai.function_id', functionId);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["requestMessagesFromPrompt"])(span, attributes);
    if (attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_MODEL_ID_ATTRIBUTE"]] && !attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"], attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_MODEL_ID_ATTRIBUTE"]]);
    }
    span.setAttribute('ai.streaming', name.includes('stream'));
    // Set the op based on the span name
    const op = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanOpFromName"])(name);
    if (op) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"], op);
    }
    // Update span names for .do* spans to include the model ID (only if model ID exists)
    const modelId = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_MODEL_ID_ATTRIBUTE"]];
    if (modelId) {
        switch(name){
            case 'ai.generateText.doGenerate':
                span.updateName(`generate_text ${modelId}`);
                break;
            case 'ai.streamText.doStream':
                span.updateName(`stream_text ${modelId}`);
                break;
            case 'ai.generateObject.doGenerate':
                span.updateName(`generate_object ${modelId}`);
                break;
            case 'ai.streamObject.doStream':
                span.updateName(`stream_object ${modelId}`);
                break;
            case 'ai.embed.doEmbed':
                span.updateName(`embed ${modelId}`);
                break;
            case 'ai.embedMany.doEmbed':
                span.updateName(`embed_many ${modelId}`);
                break;
            case 'ai.rerank.doRerank':
                span.updateName(`rerank ${modelId}`);
                break;
        }
    }
}
/**
 * Add event processors to the given client to process Vercel AI spans.
 */ function addVercelAiProcessors(client) {
    client.on('spanStart', onVercelAiSpanStart);
    // Note: We cannot do this on `spanEnd`, because the span cannot be mutated anymore at this point
    client.addEventProcessor(Object.assign(vercelAiEventProcessor, {
        id: 'VercelAiEventProcessor'
    }));
}
function addProviderMetadataToAttributes(attributes) {
    const providerMetadata = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$vercel$2d$ai$2f$vercel$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["AI_RESPONSE_PROVIDER_METADATA_ATTRIBUTE"]];
    if (providerMetadata) {
        try {
            const providerMetadataObject = JSON.parse(providerMetadata);
            // Handle OpenAI metadata (v5 uses 'openai', v6 Azure Responses API uses 'azure')
            const openaiMetadata = providerMetadataObject.openai ?? providerMetadataObject.azure;
            if (openaiMetadata) {
                setAttributeIfDefined(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE"], openaiMetadata.cachedPromptTokens);
                setAttributeIfDefined(attributes, 'gen_ai.usage.output_tokens.reasoning', openaiMetadata.reasoningTokens);
                setAttributeIfDefined(attributes, 'gen_ai.usage.output_tokens.prediction_accepted', openaiMetadata.acceptedPredictionTokens);
                setAttributeIfDefined(attributes, 'gen_ai.usage.output_tokens.prediction_rejected', openaiMetadata.rejectedPredictionTokens);
                setAttributeIfDefined(attributes, 'gen_ai.conversation.id', openaiMetadata.responseId);
            }
            if (providerMetadataObject.anthropic) {
                const cachedInputTokens = providerMetadataObject.anthropic.usage?.cache_read_input_tokens ?? providerMetadataObject.anthropic.cacheReadInputTokens;
                setAttributeIfDefined(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE"], cachedInputTokens);
                const cacheWriteInputTokens = providerMetadataObject.anthropic.usage?.cache_creation_input_tokens ?? providerMetadataObject.anthropic.cacheCreationInputTokens;
                setAttributeIfDefined(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE"], cacheWriteInputTokens);
            }
            if (providerMetadataObject.bedrock?.usage) {
                setAttributeIfDefined(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE"], providerMetadataObject.bedrock.usage.cacheReadInputTokens);
                setAttributeIfDefined(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE"], providerMetadataObject.bedrock.usage.cacheWriteInputTokens);
            }
            if (providerMetadataObject.deepseek) {
                setAttributeIfDefined(attributes, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE"], providerMetadataObject.deepseek.promptCacheHitTokens);
                setAttributeIfDefined(attributes, 'gen_ai.usage.input_tokens.cache_miss', providerMetadataObject.deepseek.promptCacheMissTokens);
            }
        } catch  {
        // Ignore
        }
    }
}
/**
 * Sets an attribute only if the value is not null or undefined.
 */ function setAttributeIfDefined(attributes, key, value) {
    if (value != null) {
        attributes[key] = value;
    }
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langchain/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LANGCHAIN_INTEGRATION_NAME",
    ()=>LANGCHAIN_INTEGRATION_NAME,
    "LANGCHAIN_ORIGIN",
    ()=>LANGCHAIN_ORIGIN,
    "ROLE_MAP",
    ()=>ROLE_MAP
]);
const LANGCHAIN_INTEGRATION_NAME = 'LangChain';
const LANGCHAIN_ORIGIN = 'auto.ai.langchain';
const ROLE_MAP = {
    human: 'user',
    ai: 'assistant',
    assistant: 'assistant',
    system: 'system',
    function: 'function',
    tool: 'tool'
};
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langchain/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractChatModelRequestAttributes",
    ()=>extractChatModelRequestAttributes,
    "extractLLMRequestAttributes",
    ()=>extractLLMRequestAttributes,
    "extractLlmResponseAttributes",
    ()=>extractLlmResponseAttributes,
    "getInvocationParams",
    ()=>getInvocationParams,
    "normalizeLangChainMessages",
    ()=>normalizeLangChainMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langchain/constants.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
/**
 * Assigns an attribute only when the value is neither `undefined` nor `null`.
 *
 * We keep this tiny helper because call sites are repetitive and easy to miswrite.
 * It also preserves falsy-but-valid values like `0` and `""`.
 */ const setIfDefined = (target, key, value)=>{
    if (value != null) target[key] = value;
};
/**
 * Like `setIfDefined`, but converts the value with `Number()` and skips only when the
 * result is `NaN`. This ensures numeric 0 makes it through (unlike truthy checks).
 */ const setNumberIfDefined = (target, key, value)=>{
    const n = Number(value);
    if (!Number.isNaN(n)) target[key] = n;
};
/**
 * Converts a value to a string. Avoids double-quoted JSON strings where a plain
 * string is desired, but still handles objects/arrays safely.
 */ function asString(v) {
    if (typeof v === 'string') return v;
    try {
        return JSON.stringify(v);
    } catch  {
        return String(v);
    }
}
/**
 * Normalizes a single role token to our canonical set.
 *
 * @param role Incoming role value (free-form, any casing)
 * @returns Canonical role: 'user' | 'assistant' | 'system' | 'function' | 'tool' | <passthrough>
 */ function normalizeMessageRole(role) {
    const normalized = role.toLowerCase();
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ROLE_MAP"][normalized] ?? normalized;
}
/**
 * Infers a role from a LangChain message constructor name.
 *
 * Checks for substrings like "System", "Human", "AI", etc.
 */ function normalizeRoleNameFromCtor(name) {
    if (name.includes('System')) return 'system';
    if (name.includes('Human')) return 'user';
    if (name.includes('AI') || name.includes('Assistant')) return 'assistant';
    if (name.includes('Function')) return 'function';
    if (name.includes('Tool')) return 'tool';
    return 'user';
}
/**
 * Returns invocation params from a LangChain `tags` object.
 *
 * LangChain often passes runtime parameters (model, temperature, etc.) via the
 * `tags.invocation_params` bag. If `tags` is an array (LangChain sometimes uses
 * string tags), we return `undefined`.
 *
 * @param tags LangChain tags (string[] or record)
 * @returns The `invocation_params` object, if present
 */ function getInvocationParams(tags) {
    if (!tags || Array.isArray(tags)) return undefined;
    return tags.invocation_params;
}
/**
 * Normalizes a heterogeneous set of LangChain messages to `{ role, content }`.
 *
 * Why so many branches? LangChain messages can arrive in several shapes:
 *  - Message classes with `_getType()` (most reliable)
 *  - Classes with meaningful constructor names (e.g. `SystemMessage`)
 *  - Plain objects with `type`, or `{ role, content }`
 *  - Serialized format with `{ lc: 1, id: [...], kwargs: { content } }`
 * We preserve the prioritization to minimize behavioral drift.
 *
 * @param messages Mixed LangChain messages
 * @returns Array of normalized `{ role, content }`
 */ function normalizeLangChainMessages(messages) {
    return messages.map((message)=>{
        // 1) Prefer _getType() when present
        const maybeGetType = message._getType;
        if (typeof maybeGetType === 'function') {
            const messageType = maybeGetType.call(message);
            return {
                role: normalizeMessageRole(messageType),
                content: asString(message.content)
            };
        }
        // 2) Serialized LangChain format (lc: 1) - check before constructor name
        // This is more reliable than constructor.name which can be lost during serialization
        if (message.lc === 1 && message.kwargs) {
            const id = message.id;
            const messageType = Array.isArray(id) && id.length > 0 ? id[id.length - 1] : '';
            const role = typeof messageType === 'string' ? normalizeRoleNameFromCtor(messageType) : 'user';
            return {
                role: normalizeMessageRole(role),
                content: asString(message.kwargs?.content)
            };
        }
        // 3) Then objects with `type`
        if (message.type) {
            const role = String(message.type).toLowerCase();
            return {
                role: normalizeMessageRole(role),
                content: asString(message.content)
            };
        }
        // 4) Then objects with `{ role, content }` - check before constructor name
        // Plain objects have constructor.name="Object" which would incorrectly default to "user"
        if (message.role) {
            return {
                role: normalizeMessageRole(String(message.role)),
                content: asString(message.content)
            };
        }
        // 5) Then try constructor name (SystemMessage / HumanMessage / ...)
        // Only use this if we haven't matched a more specific case
        const ctor = message.constructor?.name;
        if (ctor && ctor !== 'Object') {
            return {
                role: normalizeMessageRole(normalizeRoleNameFromCtor(ctor)),
                content: asString(message.content)
            };
        }
        // 6) Fallback: treat as user text
        return {
            role: 'user',
            content: asString(message.content)
        };
    });
}
/**
 * Extracts request attributes common to both LLM and ChatModel invocations.
 *
 * Source precedence:
 * 1) `invocationParams` (highest)
 * 2) `langSmithMetadata`
 *
 * Numeric values are set even when 0 (e.g. `temperature: 0`), but skipped if `NaN`.
 */ function extractCommonRequestAttributes(serialized, invocationParams, langSmithMetadata) {
    const attrs = {};
    // Get kwargs if available (from constructor type)
    const kwargs = 'kwargs' in serialized ? serialized.kwargs : undefined;
    const temperature = invocationParams?.temperature ?? langSmithMetadata?.ls_temperature ?? kwargs?.temperature;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE"], temperature);
    const maxTokens = invocationParams?.max_tokens ?? langSmithMetadata?.ls_max_tokens ?? kwargs?.max_tokens;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE"], maxTokens);
    const topP = invocationParams?.top_p ?? kwargs?.top_p;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_P_ATTRIBUTE"], topP);
    const frequencyPenalty = invocationParams?.frequency_penalty;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE"], frequencyPenalty);
    const presencePenalty = invocationParams?.presence_penalty;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE"], presencePenalty);
    // LangChain uses `stream`. We only set the attribute if the key actually exists
    // (some callbacks report `false` even on streamed requests, this stems from LangChain's callback handler).
    if (invocationParams && 'stream' in invocationParams) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_STREAM_ATTRIBUTE"], Boolean(invocationParams.stream));
    }
    return attrs;
}
/**
 * Small helper to assemble boilerplate attributes shared by both request extractors.
 * Always uses 'chat' as the operation type for all LLM and chat model operations.
 */ function baseRequestAttributes(system, modelName, serialized, invocationParams, langSmithMetadata) {
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_ATTRIBUTE"]]: asString(system ?? 'langchain'),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: 'chat',
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]]: asString(modelName),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"],
        ...extractCommonRequestAttributes(serialized, invocationParams, langSmithMetadata)
    };
}
/**
 * Extracts attributes for plain LLM invocations (string prompts).
 *
 * - Operation is tagged as `chat` following OpenTelemetry semantic conventions.
 *   LangChain LLM operations are treated as chat operations.
 * - When `recordInputs` is true, string prompts are wrapped into `{role:"user"}`
 *   messages to align with the chat schema used elsewhere.
 */ function extractLLMRequestAttributes(llm, prompts, recordInputs, invocationParams, langSmithMetadata) {
    const system = langSmithMetadata?.ls_provider;
    const modelName = invocationParams?.model ?? langSmithMetadata?.ls_model_name ?? 'unknown';
    const attrs = baseRequestAttributes(system, modelName, llm, invocationParams, langSmithMetadata);
    if (recordInputs && Array.isArray(prompts) && prompts.length > 0) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"], prompts.length);
        const messages = prompts.map((p)=>({
                role: 'user',
                content: p
            }));
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"], asString(messages));
    }
    return attrs;
}
/**
 * Extracts attributes for ChatModel invocations (array-of-arrays of messages).
 *
 * - Operation is tagged as `chat` following OpenTelemetry semantic conventions.
 *   LangChain chat model operations are chat operations.
 * - We flatten LangChain's `LangChainMessage[][]` and normalize shapes into a
 *   consistent `{ role, content }` array when `recordInputs` is true.
 * - Provider system value falls back to `serialized.id?.[2]`.
 */ function extractChatModelRequestAttributes(llm, langChainMessages, recordInputs, invocationParams, langSmithMetadata) {
    const system = langSmithMetadata?.ls_provider ?? llm.id?.[2];
    const modelName = invocationParams?.model ?? langSmithMetadata?.ls_model_name ?? 'unknown';
    const attrs = baseRequestAttributes(system, modelName, llm, invocationParams, langSmithMetadata);
    if (recordInputs && Array.isArray(langChainMessages) && langChainMessages.length > 0) {
        const normalized = normalizeLangChainMessages(langChainMessages.flat());
        const { systemInstructions, filteredMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSystemInstructions"])(normalized);
        if (systemInstructions) {
            setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE"], systemInstructions);
        }
        const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"], filteredLength);
        const truncated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["truncateGenAiMessages"])(filteredMessages);
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"], asString(truncated));
    }
    return attrs;
}
/**
 * Scans generations for Anthropic-style `tool_use` items and records them.
 *
 * LangChain represents some provider messages (e.g., Anthropic) with a `message.content`
 * array that may include objects `{ type: 'tool_use', ... }`. We collect and attach
 * them as a JSON array on `gen_ai.response.tool_calls` for downstream consumers.
 */ function addToolCallsAttributes(generations, attrs) {
    const toolCalls = [];
    const flatGenerations = generations.flat();
    for (const gen of flatGenerations){
        const content = gen.message?.content;
        if (Array.isArray(content)) {
            for (const item of content){
                const t = item;
                if (t.type === 'tool_use') toolCalls.push(t);
            }
        }
    }
    if (toolCalls.length > 0) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"], asString(toolCalls));
    }
}
/**
 * Adds token usage attributes, supporting both OpenAI (`tokenUsage`) and Anthropic (`usage`) formats.
 * - Preserve zero values (0 tokens) by avoiding truthy checks.
 * - Compute a total for Anthropic when not explicitly provided.
 * - Include cache token metrics when present.
 */ function addTokenUsageAttributes(llmOutput, attrs) {
    if (!llmOutput) return;
    const tokenUsage = llmOutput.tokenUsage;
    const anthropicUsage = llmOutput.usage;
    if (tokenUsage) {
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"], tokenUsage.promptTokens);
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"], tokenUsage.completionTokens);
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"], tokenUsage.totalTokens);
    } else if (anthropicUsage) {
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"], anthropicUsage.input_tokens);
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"], anthropicUsage.output_tokens);
        // Compute total when not provided by the provider.
        const input = Number(anthropicUsage.input_tokens);
        const output = Number(anthropicUsage.output_tokens);
        const total = (Number.isNaN(input) ? 0 : input) + (Number.isNaN(output) ? 0 : output);
        if (total > 0) setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"], total);
        // Extra Anthropic cache metrics (present only when caching is enabled)
        if (anthropicUsage.cache_creation_input_tokens !== undefined) setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE"], anthropicUsage.cache_creation_input_tokens);
        if (anthropicUsage.cache_read_input_tokens !== undefined) setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE"], anthropicUsage.cache_read_input_tokens);
    }
}
/**
 * Extracts response-related attributes based on a `LangChainLLMResult`.
 *
 * - Records finish reasons when present on generations (e.g., OpenAI)
 * - When `recordOutputs` is true, captures textual response content and any
 *   tool calls.
 * - Also propagates model name (`model_name` or `model`), response `id`, and
 *   `stop_reason` (for providers that use it).
 */ function extractLlmResponseAttributes(llmResult, recordOutputs) {
    if (!llmResult) return;
    const attrs = {};
    if (Array.isArray(llmResult.generations)) {
        const finishReasons = llmResult.generations.flat().map((g)=>{
            // v1 uses generationInfo.finish_reason
            if (g.generationInfo?.finish_reason) {
                return g.generationInfo.finish_reason;
            }
            // v0.3+ uses generation_info.finish_reason
            if (g.generation_info?.finish_reason) {
                return g.generation_info.finish_reason;
            }
            return null;
        }).filter((r)=>typeof r === 'string');
        if (finishReasons.length > 0) {
            setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"], asString(finishReasons));
        }
        // Tool calls metadata (names, IDs) are not PII, so capture them regardless of recordOutputs
        addToolCallsAttributes(llmResult.generations, attrs);
        if (recordOutputs) {
            const texts = llmResult.generations.flat().map((gen)=>gen.text ?? gen.message?.content).filter((t)=>typeof t === 'string');
            if (texts.length > 0) {
                setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"], asString(texts));
            }
        }
    }
    addTokenUsageAttributes(llmResult.llmOutput, attrs);
    const llmOutput = llmResult.llmOutput;
    // Extract from v1 generations structure if available
    const firstGeneration = llmResult.generations?.[0]?.[0];
    const v1Message = firstGeneration?.message;
    // Provider model identifier: `model_name` (OpenAI-style) or `model` (others)
    // v1 stores this in message.response_metadata.model_name
    const modelName = llmOutput?.model_name ?? llmOutput?.model ?? v1Message?.response_metadata?.model_name;
    if (modelName) setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"], modelName);
    // Response ID: v1 stores this in message.id
    const responseId = llmOutput?.id ?? v1Message?.id;
    if (responseId) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"], responseId);
    }
    // Stop reason: v1 stores this in message.response_metadata.finish_reason
    const stopReason = llmOutput?.stop_reason ?? v1Message?.response_metadata?.finish_reason;
    if (stopReason) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE"], asString(stopReason));
    }
    return attrs;
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langchain/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLangChainCallbackHandler",
    ()=>createLangChainCallbackHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langchain/constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langchain/utils.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Creates a Sentry callback handler for LangChain
 * Returns a plain object that LangChain will call via duck-typing
 *
 * This is a stateful handler that tracks spans across multiple LangChain executions.
 */ function createLangChainCallbackHandler(options = {}) {
    const recordInputs = options.recordInputs ?? false;
    const recordOutputs = options.recordOutputs ?? false;
    // Internal state - single instance tracks all spans
    const spanMap = new Map();
    /**
   * Exit a span and clean up
   */ const exitSpan = (runId)=>{
        const span = spanMap.get(runId);
        if (span?.isRecording()) {
            span.end();
            spanMap.delete(runId);
        }
    };
    /**
   * Handler for LLM Start
   * This handler will be called by LangChain's callback handler when an LLM event is detected.
   */ const handler = {
        // Required LangChain BaseCallbackHandler properties
        lc_serializable: false,
        lc_namespace: [
            'langchain_core',
            'callbacks',
            'sentry'
        ],
        lc_secrets: undefined,
        lc_attributes: undefined,
        lc_aliases: undefined,
        lc_serializable_keys: undefined,
        lc_id: [
            'langchain_core',
            'callbacks',
            'sentry'
        ],
        lc_kwargs: {},
        name: 'SentryCallbackHandler',
        // BaseCallbackHandlerInput boolean flags
        ignoreLLM: false,
        ignoreChain: false,
        ignoreAgent: false,
        ignoreRetriever: false,
        ignoreCustomEvent: false,
        raiseError: false,
        awaitHandlers: true,
        handleLLMStart (llm, prompts, runId, _parentRunId, _extraParams, tags, metadata, _runName) {
            const invocationParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getInvocationParams"])(tags);
            const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractLLMRequestAttributes"])(llm, prompts, recordInputs, invocationParams, metadata);
            const modelName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]];
            const operationName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `${operationName} ${modelName}`,
                op: 'gen_ai.chat',
                attributes: {
                    ...attributes,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.chat'
                }
            }, (span)=>{
                spanMap.set(runId, span);
                return span;
            });
        },
        // Chat Model Start Handler
        handleChatModelStart (llm, messages, runId, _parentRunId, _extraParams, tags, metadata, _runName) {
            const invocationParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getInvocationParams"])(tags);
            const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractChatModelRequestAttributes"])(llm, messages, recordInputs, invocationParams, metadata);
            const modelName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]];
            const operationName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `${operationName} ${modelName}`,
                op: 'gen_ai.chat',
                attributes: {
                    ...attributes,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.chat'
                }
            }, (span)=>{
                spanMap.set(runId, span);
                return span;
            });
        },
        // LLM End Handler - note: handleLLMEnd with capital LLM (used by both LLMs and chat models!)
        handleLLMEnd (output, runId, _parentRunId, _tags, _extraParams) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractLlmResponseAttributes"])(output, recordOutputs);
                if (attributes) {
                    span.setAttributes(attributes);
                }
                exitSpan(runId);
            }
        },
        // LLM Error Handler - note: handleLLMError with capital LLM
        handleLLMError (error, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                span.setStatus({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                    message: 'llm_error'
                });
                exitSpan(runId);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                mechanism: {
                    handled: false,
                    type: `${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"]}.llm_error_handler`
                }
            });
        },
        // Chain Start Handler
        handleChainStart (chain, inputs, runId, _parentRunId) {
            const chainName = chain.name || 'unknown_chain';
            const attributes = {
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.ai.langchain',
                'langchain.chain.name': chainName
            };
            // Add inputs if recordInputs is enabled
            if (recordInputs) {
                attributes['langchain.chain.inputs'] = JSON.stringify(inputs);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `chain ${chainName}`,
                op: 'gen_ai.invoke_agent',
                attributes: {
                    ...attributes,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.invoke_agent'
                }
            }, (span)=>{
                spanMap.set(runId, span);
                return span;
            });
        },
        // Chain End Handler
        handleChainEnd (outputs, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                // Add outputs if recordOutputs is enabled
                if (recordOutputs) {
                    span.setAttributes({
                        'langchain.chain.outputs': JSON.stringify(outputs)
                    });
                }
                exitSpan(runId);
            }
        },
        // Chain Error Handler
        handleChainError (error, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                span.setStatus({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                    message: 'chain_error'
                });
                exitSpan(runId);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                mechanism: {
                    handled: false,
                    type: `${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"]}.chain_error_handler`
                }
            });
        },
        // Tool Start Handler
        handleToolStart (tool, input, runId, _parentRunId) {
            const toolName = tool.name || 'unknown_tool';
            const attributes = {
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"],
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_NAME_ATTRIBUTE"]]: toolName
            };
            // Add input if recordInputs is enabled
            if (recordInputs) {
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_INPUT_ATTRIBUTE"]] = input;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `execute_tool ${toolName}`,
                op: 'gen_ai.execute_tool',
                attributes: {
                    ...attributes,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.execute_tool'
                }
            }, (span)=>{
                spanMap.set(runId, span);
                return span;
            });
        },
        // Tool End Handler
        handleToolEnd (output, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                // Add output if recordOutputs is enabled
                if (recordOutputs) {
                    span.setAttributes({
                        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_TOOL_OUTPUT_ATTRIBUTE"]]: JSON.stringify(output)
                    });
                }
                exitSpan(runId);
            }
        },
        // Tool Error Handler
        handleToolError (error, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                span.setStatus({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                    message: 'tool_error'
                });
                exitSpan(runId);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                mechanism: {
                    handled: false,
                    type: `${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"]}.tool_error_handler`
                }
            });
        },
        // LangChain BaseCallbackHandler required methods
        copy () {
            return handler;
        },
        toJSON () {
            return {
                lc: 1,
                type: 'not_implemented',
                id: handler.lc_id
            };
        },
        toJSONNotImplemented () {
            return {
                lc: 1,
                type: 'not_implemented',
                id: handler.lc_id
            };
        }
    };
    return handler;
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/streaming.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentAsyncIterableStream",
    ()=>instrumentAsyncIterableStream,
    "instrumentMessageStream",
    ()=>instrumentMessageStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)");
;
;
;
;
/**
 * State object used to accumulate information from a stream of Anthropic AI events.
 */ /**
 * Checks if an event is an error event
 * @param event - The event to process
 * @param state - The state of the streaming process
 * @param recordOutputs - Whether to record outputs
 * @param span - The span to update
 * @returns Whether an error occurred
 */ function isErrorEvent(event, span) {
    if ('type' in event && typeof event.type === 'string') {
        // If the event is an error, set the span status and capture the error
        // These error events are not rejected by the API by default, but are sent as metadata of the response
        if (event.type === 'error') {
            span.setStatus({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                message: event.error?.type ?? 'internal_error'
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(event.error, {
                mechanism: {
                    handled: false,
                    type: 'auto.ai.anthropic.anthropic_error'
                }
            });
            return true;
        }
    }
    return false;
}
/**
 * Processes the message metadata of an event
 * @param event - The event to process
 * @param state - The state of the streaming process
 */ function handleMessageMetadata(event, state) {
    // The token counts shown in the usage field of the message_delta event are cumulative.
    // @see https://docs.anthropic.com/en/docs/build-with-claude/streaming#event-types
    if (event.type === 'message_delta' && event.usage) {
        if ('output_tokens' in event.usage && typeof event.usage.output_tokens === 'number') {
            state.completionTokens = event.usage.output_tokens;
        }
    }
    if (event.message) {
        const message = event.message;
        if (message.id) state.responseId = message.id;
        if (message.model) state.responseModel = message.model;
        if (message.stop_reason) state.finishReasons.push(message.stop_reason);
        if (message.usage) {
            if (typeof message.usage.input_tokens === 'number') state.promptTokens = message.usage.input_tokens;
            if (typeof message.usage.cache_creation_input_tokens === 'number') state.cacheCreationInputTokens = message.usage.cache_creation_input_tokens;
            if (typeof message.usage.cache_read_input_tokens === 'number') state.cacheReadInputTokens = message.usage.cache_read_input_tokens;
        }
    }
}
/**
 * Handle start of a content block (e.g., tool_use)
 */ function handleContentBlockStart(event, state) {
    if (event.type !== 'content_block_start' || typeof event.index !== 'number' || !event.content_block) return;
    if (event.content_block.type === 'tool_use' || event.content_block.type === 'server_tool_use') {
        state.activeToolBlocks[event.index] = {
            id: event.content_block.id,
            name: event.content_block.name,
            inputJsonParts: []
        };
    }
}
/**
 * Handle deltas of a content block, including input_json_delta for tool_use
 */ function handleContentBlockDelta(event, state, recordOutputs) {
    if (event.type !== 'content_block_delta' || !event.delta) return;
    // Accumulate tool_use input JSON deltas only when we have an index and an active tool block
    if (typeof event.index === 'number' && 'partial_json' in event.delta && typeof event.delta.partial_json === 'string') {
        const active = state.activeToolBlocks[event.index];
        if (active) {
            active.inputJsonParts.push(event.delta.partial_json);
        }
    }
    // Accumulate streamed response text regardless of index
    if (recordOutputs && typeof event.delta.text === 'string') {
        state.responseTexts.push(event.delta.text);
    }
}
/**
 * Handle stop of a content block; finalize tool_use entries
 */ function handleContentBlockStop(event, state) {
    if (event.type !== 'content_block_stop' || typeof event.index !== 'number') return;
    const active = state.activeToolBlocks[event.index];
    if (!active) return;
    const raw = active.inputJsonParts.join('');
    let parsedInput;
    try {
        parsedInput = raw ? JSON.parse(raw) : {};
    } catch  {
        parsedInput = {
            __unparsed: raw
        };
    }
    state.toolCalls.push({
        type: 'tool_use',
        id: active.id,
        name: active.name,
        input: parsedInput
    });
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete state.activeToolBlocks[event.index];
}
/**
 * Processes an event
 * @param event - The event to process
 * @param state - The state of the streaming process
 * @param recordOutputs - Whether to record outputs
 * @param span - The span to update
 */ function processEvent(event, state, recordOutputs, span) {
    if (!(event && typeof event === 'object')) {
        return;
    }
    const isError = isErrorEvent(event, span);
    if (isError) return;
    handleMessageMetadata(event, state);
    // Tool call events are sent via 3 separate events:
    // - content_block_start (start of the tool call)
    // - content_block_delta (delta aka input of the tool call)
    // - content_block_stop (end of the tool call)
    // We need to handle them all to capture the full tool call.
    handleContentBlockStart(event, state);
    handleContentBlockDelta(event, state, recordOutputs);
    handleContentBlockStop(event, state);
}
/**
 * Finalizes span attributes when stream processing completes
 */ function finalizeStreamSpan(state, span, recordOutputs) {
    if (!span.isRecording()) {
        return;
    }
    // Set common response attributes if available
    if (state.responseId) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: state.responseId
        });
    }
    if (state.responseModel) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: state.responseModel
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setTokenUsageAttributes"])(span, state.promptTokens, state.completionTokens, state.cacheCreationInputTokens, state.cacheReadInputTokens);
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STREAMING_ATTRIBUTE"]]: true
    });
    if (state.finishReasons.length > 0) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify(state.finishReasons)
        });
    }
    if (recordOutputs && state.responseTexts.length > 0) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: state.responseTexts.join('')
        });
    }
    // Set tool calls if any were captured
    if (recordOutputs && state.toolCalls.length > 0) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(state.toolCalls)
        });
    }
    span.end();
}
/**
 * Instruments an async iterable stream of Anthropic events, updates the span with
 * streaming attributes and (optionally) the aggregated output text, and yields
 * each event from the input stream unchanged.
 */ async function* instrumentAsyncIterableStream(stream, span, recordOutputs) {
    const state = {
        responseTexts: [],
        finishReasons: [],
        responseId: '',
        responseModel: '',
        promptTokens: undefined,
        completionTokens: undefined,
        cacheCreationInputTokens: undefined,
        cacheReadInputTokens: undefined,
        toolCalls: [],
        activeToolBlocks: {}
    };
    try {
        for await (const event of stream){
            processEvent(event, state, recordOutputs, span);
            yield event;
        }
    } finally{
        // Set common response attributes if available
        if (state.responseId) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: state.responseId
            });
        }
        if (state.responseModel) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: state.responseModel
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setTokenUsageAttributes"])(span, state.promptTokens, state.completionTokens, state.cacheCreationInputTokens, state.cacheReadInputTokens);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STREAMING_ATTRIBUTE"]]: true
        });
        if (state.finishReasons.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify(state.finishReasons)
            });
        }
        if (recordOutputs && state.responseTexts.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: state.responseTexts.join('')
            });
        }
        // Set tool calls if any were captured
        if (recordOutputs && state.toolCalls.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(state.toolCalls)
            });
        }
        span.end();
    }
}
/**
 * Instruments a MessageStream by registering event handlers and preserving the original stream API.
 */ function instrumentMessageStream(stream, span, recordOutputs) {
    const state = {
        responseTexts: [],
        finishReasons: [],
        responseId: '',
        responseModel: '',
        promptTokens: undefined,
        completionTokens: undefined,
        cacheCreationInputTokens: undefined,
        cacheReadInputTokens: undefined,
        toolCalls: [],
        activeToolBlocks: {}
    };
    stream.on('streamEvent', (event)=>{
        processEvent(event, state, recordOutputs, span);
    });
    // The event fired when a message is done being streamed by the API. Corresponds to the message_stop SSE event.
    // @see https://github.com/anthropics/anthropic-sdk-typescript/blob/d3be31f5a4e6ebb4c0a2f65dbb8f381ae73a9166/helpers.md?plain=1#L42-L44
    stream.on('message', ()=>{
        finalizeStreamSpan(state, span, recordOutputs);
    });
    stream.on('error', (error)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
            mechanism: {
                handled: false,
                type: 'auto.ai.anthropic.stream_error'
            }
        });
        if (span.isRecording()) {
            span.setStatus({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                message: 'stream_error'
            });
            span.end();
        }
    });
    return stream;
}
;
 //# sourceMappingURL=streaming.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANTHROPIC_AI_INSTRUMENTED_METHODS",
    ()=>ANTHROPIC_AI_INSTRUMENTED_METHODS,
    "ANTHROPIC_AI_INTEGRATION_NAME",
    ()=>ANTHROPIC_AI_INTEGRATION_NAME
]);
const ANTHROPIC_AI_INTEGRATION_NAME = 'Anthropic_AI';
// https://docs.anthropic.com/en/api/messages
// https://docs.anthropic.com/en/api/models-list
const ANTHROPIC_AI_INSTRUMENTED_METHODS = [
    'messages.create',
    'messages.stream',
    'messages.countTokens',
    'models.get',
    'completions.create',
    'models.retrieve',
    'beta.messages.create'
];
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleResponseError",
    ()=>handleResponseError,
    "messagesFromParams",
    ()=>messagesFromParams,
    "setMessagesAttribute",
    ()=>setMessagesAttribute,
    "shouldInstrument",
    ()=>shouldInstrument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/constants.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
/**
 * Check if a method path should be instrumented
 */ function shouldInstrument(methodPath) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ANTHROPIC_AI_INSTRUMENTED_METHODS"].includes(methodPath);
}
/**
 * Set the messages and messages original length attributes.
 * Extracts system instructions before truncation.
 */ function setMessagesAttribute(span, messages) {
    if (Array.isArray(messages) && messages.length === 0) {
        return;
    }
    const { systemInstructions, filteredMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSystemInstructions"])(messages);
    if (systemInstructions) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE"]]: systemInstructions
        });
    }
    const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 1;
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(filteredMessages),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"]]: filteredLength
    });
}
/**
 * Capture error information from the response
 * @see https://docs.anthropic.com/en/api/errors#error-shapes
 */ function handleResponseError(span, response) {
    if (response.error) {
        span.setStatus({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
            message: response.error.type || 'internal_error'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(response.error, {
            mechanism: {
                handled: false,
                type: 'auto.ai.anthropic.anthropic_error'
            }
        });
    }
}
/**
 * Include the system prompt in the messages list, if available
 */ function messagesFromParams(params) {
    const { system, messages, input } = params;
    const systemMessages = typeof system === 'string' ? [
        {
            role: 'system',
            content: params.system
        }
    ] : [];
    const inputParamMessages = Array.isArray(input) ? input : input != null ? [
        input
    ] : undefined;
    const messagesParamMessages = Array.isArray(messages) ? messages : messages != null ? [
        messages
    ] : [];
    const userMessages = inputParamMessages ?? messagesParamMessages;
    return [
        ...systemMessages,
        ...userMessages
    ];
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentAnthropicAiClient",
    ()=>instrumentAnthropicAiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$streaming$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/streaming.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/utils.js [instrumentation-edge] (ecmascript)");
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
 * Extract request attributes from method arguments
 */ function extractRequestAttributes(args, methodPath) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_ATTRIBUTE"]]: 'anthropic',
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getFinalOperationName"])(methodPath),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.ai.anthropic'
    };
    if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
        const params = args[0];
        if (params.tools && Array.isArray(params.tools)) {
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE"]] = JSON.stringify(params.tools);
        }
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = params.model ?? 'unknown';
        if ('temperature' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE"]] = params.temperature;
        if ('top_p' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_P_ATTRIBUTE"]] = params.top_p;
        if ('stream' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_STREAM_ATTRIBUTE"]] = params.stream;
        if ('top_k' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_K_ATTRIBUTE"]] = params.top_k;
        if ('frequency_penalty' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE"]] = params.frequency_penalty;
        if ('max_tokens' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE"]] = params.max_tokens;
    } else {
        if (methodPath === 'models.retrieve' || methodPath === 'models.get') {
            // models.retrieve(model-id) and models.get(model-id)
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = args[0];
        } else {
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = 'unknown';
        }
    }
    return attributes;
}
/**
 * Add private request attributes to spans.
 * This is only recorded if recordInputs is true.
 */ function addPrivateRequestAttributes(span, params) {
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["messagesFromParams"])(params);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setMessagesAttribute"])(span, messages);
    if ('prompt' in params) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_PROMPT_ATTRIBUTE"]]: JSON.stringify(params.prompt)
        });
    }
}
/**
 * Add content attributes when recordOutputs is enabled
 */ function addContentAttributes(span, response) {
    // Messages.create
    if ('content' in response) {
        if (Array.isArray(response.content)) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: response.content.map((item)=>item.text).filter((text)=>!!text).join('')
            });
            const toolCalls = [];
            for (const item of response.content){
                if (item.type === 'tool_use' || item.type === 'server_tool_use') {
                    toolCalls.push(item);
                }
            }
            if (toolCalls.length > 0) {
                span.setAttributes({
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(toolCalls)
                });
            }
        }
    }
    // Completions.create
    if ('completion' in response) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: response.completion
        });
    }
    // Models.countTokens
    if ('input_tokens' in response) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: JSON.stringify(response.input_tokens)
        });
    }
}
/**
 * Add basic metadata attributes from the response
 */ function addMetadataAttributes(span, response) {
    if ('id' in response && 'model' in response) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: response.id,
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: response.model
        });
        if ('created' in response && typeof response.created === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE"]]: new Date(response.created * 1000).toISOString()
            });
        }
        if ('created_at' in response && typeof response.created_at === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE"]]: new Date(response.created_at * 1000).toISOString()
            });
        }
        if ('usage' in response && response.usage) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setTokenUsageAttributes"])(span, response.usage.input_tokens, response.usage.output_tokens, response.usage.cache_creation_input_tokens, response.usage.cache_read_input_tokens);
        }
    }
}
/**
 * Add response attributes to spans
 */ function addResponseAttributes(span, response, recordOutputs) {
    if (!response || typeof response !== 'object') return;
    // capture error, do not add attributes if error (they shouldn't exist)
    if ('type' in response && response.type === 'error') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["handleResponseError"])(span, response);
        return;
    }
    // Private response attributes that are only recorded if recordOutputs is true.
    if (recordOutputs) {
        addContentAttributes(span, response);
    }
    // Add basic metadata attributes
    addMetadataAttributes(span, response);
}
/**
 * Handle common error catching and reporting for streaming requests
 */ function handleStreamingError(error, span, methodPath) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
        mechanism: {
            handled: false,
            type: 'auto.ai.anthropic',
            data: {
                function: methodPath
            }
        }
    });
    if (span.isRecording()) {
        span.setStatus({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
            message: 'internal_error'
        });
        span.end();
    }
    throw error;
}
/**
 * Handle streaming cases with common logic
 */ function handleStreamingRequest(originalMethod, target, context, args, requestAttributes, operationName, methodPath, params, options, isStreamRequested, isStreamingMethod) {
    const model = requestAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] ?? 'unknown';
    const spanConfig = {
        name: `${operationName} ${model} stream-response`,
        op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
        attributes: requestAttributes
    };
    // messages.stream() always returns a sync MessageStream, even with stream: true param
    if (isStreamRequested && !isStreamingMethod) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpanManual"])(spanConfig, async (span)=>{
            try {
                if (options.recordInputs && params) {
                    addPrivateRequestAttributes(span, params);
                }
                const result = await originalMethod.apply(context, args);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$streaming$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["instrumentAsyncIterableStream"])(result, span, options.recordOutputs ?? false);
            } catch (error) {
                return handleStreamingError(error, span, methodPath);
            }
        });
    } else {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpanManual"])(spanConfig, (span)=>{
            try {
                if (options.recordInputs && params) {
                    addPrivateRequestAttributes(span, params);
                }
                const messageStream = target.apply(context, args);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$streaming$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["instrumentMessageStream"])(messageStream, span, options.recordOutputs ?? false);
            } catch (error) {
                return handleStreamingError(error, span, methodPath);
            }
        });
    }
}
/**
 * Instrument a method with Sentry spans
 * Following Sentry AI Agents Manual Instrumentation conventions
 * @see https://docs.sentry.io/platforms/javascript/guides/node/tracing/instrumentation/ai-agents-module/#manual-instrumentation
 */ function instrumentMethod(originalMethod, methodPath, context, options) {
    return new Proxy(originalMethod, {
        apply (target, thisArg, args) {
            const requestAttributes = extractRequestAttributes(args, methodPath);
            const model = requestAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] ?? 'unknown';
            const operationName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getFinalOperationName"])(methodPath);
            const params = typeof args[0] === 'object' ? args[0] : undefined;
            const isStreamRequested = Boolean(params?.stream);
            const isStreamingMethod = methodPath === 'messages.stream';
            if (isStreamRequested || isStreamingMethod) {
                return handleStreamingRequest(originalMethod, target, context, args, requestAttributes, operationName, methodPath, params, options, isStreamRequested, isStreamingMethod);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpan"])({
                name: `${operationName} ${model}`,
                op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
                attributes: requestAttributes
            }, (span)=>{
                if (options.recordInputs && params) {
                    addPrivateRequestAttributes(span, params);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>target.apply(context, args), (error)=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.anthropic',
                            data: {
                                function: methodPath
                            }
                        }
                    });
                }, ()=>{}, (result)=>addResponseAttributes(span, result, options.recordOutputs));
            });
        }
    });
}
/**
 * Create a deep proxy for Anthropic AI client instrumentation
 */ function createDeepProxy(target, currentPath = '', options) {
    return new Proxy(target, {
        get (obj, prop) {
            const value = obj[prop];
            const methodPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildMethodPath"])(currentPath, String(prop));
            if (typeof value === 'function' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["shouldInstrument"])(methodPath)) {
                return instrumentMethod(value, methodPath, obj, options);
            }
            if (typeof value === 'function') {
                // Bind non-instrumented functions to preserve the original `this` context,
                return value.bind(obj);
            }
            if (value && typeof value === 'object') {
                return createDeepProxy(value, methodPath, options);
            }
            return value;
        }
    });
}
/**
 * Instrument an Anthropic AI client with Sentry tracing
 * Can be used across Node.js, Cloudflare Workers, and Vercel Edge
 *
 * @template T - The type of the client that extends object
 * @param client - The Anthropic AI client to instrument
 * @param options - Optional configuration for recording inputs and outputs
 * @returns The instrumented client with the same type as the input
 */ function instrumentAnthropicAiClient(anthropicAiClient, options) {
    const sendDefaultPii = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])()?.getOptions().sendDefaultPii);
    const _options = {
        recordInputs: sendDefaultPii,
        recordOutputs: sendDefaultPii,
        ...options
    };
    return createDeepProxy(anthropicAiClient, '', _options);
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/google-genai/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHATS_CREATE_METHOD",
    ()=>CHATS_CREATE_METHOD,
    "CHAT_PATH",
    ()=>CHAT_PATH,
    "GOOGLE_GENAI_INSTRUMENTED_METHODS",
    ()=>GOOGLE_GENAI_INSTRUMENTED_METHODS,
    "GOOGLE_GENAI_INTEGRATION_NAME",
    ()=>GOOGLE_GENAI_INTEGRATION_NAME,
    "GOOGLE_GENAI_SYSTEM_NAME",
    ()=>GOOGLE_GENAI_SYSTEM_NAME
]);
const GOOGLE_GENAI_INTEGRATION_NAME = 'Google_GenAI';
// https://ai.google.dev/api/rest/v1/models/generateContent
// https://ai.google.dev/api/rest/v1/chats/sendMessage
// https://googleapis.github.io/js-genai/release_docs/classes/models.Models.html#generatecontentstream
// https://googleapis.github.io/js-genai/release_docs/classes/chats.Chat.html#sendmessagestream
const GOOGLE_GENAI_INSTRUMENTED_METHODS = [
    'models.generateContent',
    'models.generateContentStream',
    'chats.create',
    'sendMessage',
    'sendMessageStream'
];
// Constants for internal use
const GOOGLE_GENAI_SYSTEM_NAME = 'google_genai';
const CHATS_CREATE_METHOD = 'chats.create';
const CHAT_PATH = 'chat';
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/google-genai/streaming.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentStream",
    ()=>instrumentStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
;
;
;
/**
 * State object used to accumulate information from a stream of Google GenAI events.
 */ /**
 * Checks if a response chunk contains an error
 * @param chunk - The response chunk to check
 * @param span - The span to update if error is found
 * @returns Whether an error occurred
 */ function isErrorChunk(chunk, span) {
    const feedback = chunk?.promptFeedback;
    if (feedback?.blockReason) {
        const message = feedback.blockReasonMessage ?? feedback.blockReason;
        span.setStatus({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
            message: `Content blocked: ${message}`
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(`Content blocked: ${message}`, {
            mechanism: {
                handled: false,
                type: 'auto.ai.google_genai'
            }
        });
        return true;
    }
    return false;
}
/**
 * Processes response metadata from a chunk
 * @param chunk - The response chunk to process
 * @param state - The state of the streaming process
 */ function handleResponseMetadata(chunk, state) {
    if (typeof chunk.responseId === 'string') state.responseId = chunk.responseId;
    if (typeof chunk.modelVersion === 'string') state.responseModel = chunk.modelVersion;
    const usage = chunk.usageMetadata;
    if (usage) {
        if (typeof usage.promptTokenCount === 'number') state.promptTokens = usage.promptTokenCount;
        if (typeof usage.candidatesTokenCount === 'number') state.completionTokens = usage.candidatesTokenCount;
        if (typeof usage.totalTokenCount === 'number') state.totalTokens = usage.totalTokenCount;
    }
}
/**
 * Processes candidate content from a response chunk
 * @param chunk - The response chunk to process
 * @param state - The state of the streaming process
 * @param recordOutputs - Whether to record outputs
 */ function handleCandidateContent(chunk, state, recordOutputs) {
    if (Array.isArray(chunk.functionCalls)) {
        state.toolCalls.push(...chunk.functionCalls);
    }
    for (const candidate of chunk.candidates ?? []){
        if (candidate?.finishReason && !state.finishReasons.includes(candidate.finishReason)) {
            state.finishReasons.push(candidate.finishReason);
        }
        for (const part of candidate?.content?.parts ?? []){
            if (recordOutputs && part.text) state.responseTexts.push(part.text);
            if (part.functionCall) {
                state.toolCalls.push({
                    type: 'function',
                    id: part.functionCall.id,
                    name: part.functionCall.name,
                    arguments: part.functionCall.args
                });
            }
        }
    }
}
/**
 * Processes a single chunk from the Google GenAI stream
 * @param chunk - The chunk to process
 * @param state - The state of the streaming process
 * @param recordOutputs - Whether to record outputs
 * @param span - The span to update
 */ function processChunk(chunk, state, recordOutputs, span) {
    if (!chunk || isErrorChunk(chunk, span)) return;
    handleResponseMetadata(chunk, state);
    handleCandidateContent(chunk, state, recordOutputs);
}
/**
 * Instruments an async iterable stream of Google GenAI response chunks, updates the span with
 * streaming attributes and (optionally) the aggregated output text, and yields
 * each chunk from the input stream unchanged.
 */ async function* instrumentStream(stream, span, recordOutputs) {
    const state = {
        responseTexts: [],
        finishReasons: [],
        toolCalls: []
    };
    try {
        for await (const chunk of stream){
            processChunk(chunk, state, recordOutputs, span);
            yield chunk;
        }
    } finally{
        const attrs = {
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STREAMING_ATTRIBUTE"]]: true
        };
        if (state.responseId) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]] = state.responseId;
        if (state.responseModel) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]] = state.responseModel;
        if (state.promptTokens !== undefined) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]] = state.promptTokens;
        if (state.completionTokens !== undefined) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]] = state.completionTokens;
        if (state.totalTokens !== undefined) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]] = state.totalTokens;
        if (state.finishReasons.length) {
            attrs[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]] = JSON.stringify(state.finishReasons);
        }
        if (recordOutputs && state.responseTexts.length) {
            attrs[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]] = state.responseTexts.join('');
        }
        if (recordOutputs && state.toolCalls.length) {
            attrs[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]] = JSON.stringify(state.toolCalls);
        }
        span.setAttributes(attrs);
        span.end();
    }
}
;
 //# sourceMappingURL=streaming.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/google-genai/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contentUnionToMessages",
    ()=>contentUnionToMessages,
    "isStreamingMethod",
    ()=>isStreamingMethod,
    "shouldInstrument",
    ()=>shouldInstrument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/google-genai/constants.js [instrumentation-edge] (ecmascript)");
;
/**
 * Check if a method path should be instrumented
 */ function shouldInstrument(methodPath) {
    // Check for exact matches first (like 'models.generateContent')
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GOOGLE_GENAI_INSTRUMENTED_METHODS"].includes(methodPath)) {
        return true;
    }
    // Check for method name matches (like 'sendMessage' from chat instances)
    const methodName = methodPath.split('.').pop();
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GOOGLE_GENAI_INSTRUMENTED_METHODS"].includes(methodName);
}
/**
 * Check if a method is a streaming method
 */ function isStreamingMethod(methodPath) {
    return methodPath.includes('Stream');
}
// Copied from https://googleapis.github.io/js-genai/release_docs/index.html
/**
 *
 */ function contentUnionToMessages(content, role = 'user') {
    if (typeof content === 'string') {
        return [
            {
                role,
                content
            }
        ];
    }
    if (Array.isArray(content)) {
        return content.flatMap((content)=>contentUnionToMessages(content, role));
    }
    if (typeof content !== 'object' || !content) return [];
    if ('role' in content && typeof content.role === 'string') {
        return [
            content
        ];
    }
    if ('parts' in content) {
        return [
            {
                ...content,
                role
            }
        ];
    }
    return [
        {
            role,
            content
        }
    ];
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/google-genai/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractModel",
    ()=>extractModel,
    "instrumentGoogleGenAIClient",
    ()=>instrumentGoogleGenAIClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/google-genai/constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$streaming$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/google-genai/streaming.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/google-genai/utils.js [instrumentation-edge] (ecmascript)");
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
;
;
/**
 * Extract model from parameters or chat context object
 * For chat instances, the model is available on the chat object as 'model' (older versions) or 'modelVersion' (newer versions)
 */ function extractModel(params, context) {
    if ('model' in params && typeof params.model === 'string') {
        return params.model;
    }
    // Try to get model from chat context object (chat instance has model property)
    if (context && typeof context === 'object') {
        const contextObj = context;
        // Check for 'model' property (older versions, and streaming)
        if ('model' in contextObj && typeof contextObj.model === 'string') {
            return contextObj.model;
        }
        // Check for 'modelVersion' property (newer versions)
        if ('modelVersion' in contextObj && typeof contextObj.modelVersion === 'string') {
            return contextObj.modelVersion;
        }
    }
    return 'unknown';
}
/**
 * Extract generation config parameters
 */ function extractConfigAttributes(config) {
    const attributes = {};
    if ('temperature' in config && typeof config.temperature === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE"]] = config.temperature;
    }
    if ('topP' in config && typeof config.topP === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_P_ATTRIBUTE"]] = config.topP;
    }
    if ('topK' in config && typeof config.topK === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_K_ATTRIBUTE"]] = config.topK;
    }
    if ('maxOutputTokens' in config && typeof config.maxOutputTokens === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE"]] = config.maxOutputTokens;
    }
    if ('frequencyPenalty' in config && typeof config.frequencyPenalty === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE"]] = config.frequencyPenalty;
    }
    if ('presencePenalty' in config && typeof config.presencePenalty === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE"]] = config.presencePenalty;
    }
    return attributes;
}
/**
 * Extract request attributes from method arguments
 * Builds the base attributes for span creation including system info, model, and config
 */ function extractRequestAttributes(methodPath, params, context) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_ATTRIBUTE"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GOOGLE_GENAI_SYSTEM_NAME"],
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getFinalOperationName"])(methodPath),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.ai.google_genai'
    };
    if (params) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = extractModel(params, context);
        // Extract generation config parameters
        if ('config' in params && typeof params.config === 'object' && params.config) {
            const config = params.config;
            Object.assign(attributes, extractConfigAttributes(config));
            // Extract available tools from config
            if ('tools' in config && Array.isArray(config.tools)) {
                const functionDeclarations = config.tools.flatMap((tool)=>tool.functionDeclarations);
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE"]] = JSON.stringify(functionDeclarations);
            }
        }
    } else {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = extractModel({}, context);
    }
    return attributes;
}
/**
 * Add private request attributes to spans.
 * This is only recorded if recordInputs is true.
 * Handles different parameter formats for different Google GenAI methods.
 */ function addPrivateRequestAttributes(span, params) {
    const messages = [];
    // config.systemInstruction: ContentUnion
    if ('config' in params && params.config && typeof params.config === 'object' && 'systemInstruction' in params.config && params.config.systemInstruction) {
        messages.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["contentUnionToMessages"])(params.config.systemInstruction, 'system'));
    }
    // For chats.create: history contains the conversation history
    if ('history' in params) {
        messages.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["contentUnionToMessages"])(params.history, 'user'));
    }
    // For models.generateContent: ContentListUnion
    if ('contents' in params) {
        messages.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["contentUnionToMessages"])(params.contents, 'user'));
    }
    // For chat.sendMessage: message can be PartListUnion
    if ('message' in params) {
        messages.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["contentUnionToMessages"])(params.message, 'user'));
    }
    if (Array.isArray(messages) && messages.length) {
        const { systemInstructions, filteredMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSystemInstructions"])(messages);
        if (systemInstructions) {
            span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE"], systemInstructions);
        }
        const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"]]: filteredLength,
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"]]: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["truncateGenAiMessages"])(filteredMessages))
        });
    }
}
/**
 * Add response attributes from the Google GenAI response
 * @see https://github.com/googleapis/js-genai/blob/v1.19.0/src/types.ts#L2313
 */ function addResponseAttributes(span, response, recordOutputs) {
    if (!response || typeof response !== 'object') return;
    if (response.modelVersion) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"], response.modelVersion);
    }
    // Add usage metadata if present
    if (response.usageMetadata && typeof response.usageMetadata === 'object') {
        const usage = response.usageMetadata;
        if (typeof usage.promptTokenCount === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]]: usage.promptTokenCount
            });
        }
        if (typeof usage.candidatesTokenCount === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]]: usage.candidatesTokenCount
            });
        }
        if (typeof usage.totalTokenCount === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]]: usage.totalTokenCount
            });
        }
    }
    // Add response text if recordOutputs is enabled
    if (recordOutputs && Array.isArray(response.candidates) && response.candidates.length > 0) {
        const responseTexts = response.candidates.map((candidate)=>{
            if (candidate.content?.parts && Array.isArray(candidate.content.parts)) {
                return candidate.content.parts.map((part)=>typeof part.text === 'string' ? part.text : '').filter((text)=>text.length > 0).join('');
            }
            return '';
        }).filter((text)=>text.length > 0);
        if (responseTexts.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: responseTexts.join('')
            });
        }
    }
    // Add tool calls if recordOutputs is enabled
    if (recordOutputs && response.functionCalls) {
        const functionCalls = response.functionCalls;
        if (Array.isArray(functionCalls) && functionCalls.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(functionCalls)
            });
        }
    }
}
/**
 * Instrument any async or synchronous genai method with Sentry spans
 * Handles operations like models.generateContent and chat.sendMessage and chats.create
 * @see https://docs.sentry.io/platforms/javascript/guides/node/tracing/instrumentation/ai-agents-module/#manual-instrumentation
 */ function instrumentMethod(originalMethod, methodPath, context, options) {
    const isSyncCreate = methodPath === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CHATS_CREATE_METHOD"];
    return new Proxy(originalMethod, {
        apply (target, _, args) {
            const params = args[0];
            const requestAttributes = extractRequestAttributes(methodPath, params, context);
            const model = requestAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] ?? 'unknown';
            const operationName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getFinalOperationName"])(methodPath);
            // Check if this is a streaming method
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isStreamingMethod"])(methodPath)) {
                // Use startSpanManual for streaming methods to control span lifecycle
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpanManual"])({
                    name: `${operationName} ${model} stream-response`,
                    op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
                    attributes: requestAttributes
                }, async (span)=>{
                    try {
                        if (options.recordInputs && params) {
                            addPrivateRequestAttributes(span, params);
                        }
                        const stream = await target.apply(context, args);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$streaming$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["instrumentStream"])(stream, span, Boolean(options.recordOutputs));
                    } catch (error) {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                            message: 'internal_error'
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                            mechanism: {
                                handled: false,
                                type: 'auto.ai.google_genai',
                                data: {
                                    function: methodPath
                                }
                            }
                        });
                        span.end();
                        throw error;
                    }
                });
            }
            // Single span for both sync and async operations
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpan"])({
                name: isSyncCreate ? `${operationName} ${model} create` : `${operationName} ${model}`,
                op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
                attributes: requestAttributes
            }, (span)=>{
                if (options.recordInputs && params) {
                    addPrivateRequestAttributes(span, params);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>target.apply(context, args), (error)=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.google_genai',
                            data: {
                                function: methodPath
                            }
                        }
                    });
                }, ()=>{}, (result)=>{
                    // Only add response attributes for content-producing methods, not for chats.create
                    if (!isSyncCreate) {
                        addResponseAttributes(span, result, options.recordOutputs);
                    }
                });
            });
        }
    });
}
/**
 * Create a deep proxy for Google GenAI client instrumentation
 * Recursively instruments methods and handles special cases like chats.create
 */ function createDeepProxy(target, currentPath = '', options) {
    return new Proxy(target, {
        get: (t, prop, receiver)=>{
            const value = Reflect.get(t, prop, receiver);
            const methodPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildMethodPath"])(currentPath, String(prop));
            if (typeof value === 'function' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["shouldInstrument"])(methodPath)) {
                // Special case: chats.create is synchronous but needs both instrumentation AND result proxying
                if (methodPath === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CHATS_CREATE_METHOD"]) {
                    const instrumentedMethod = instrumentMethod(value, methodPath, t, options);
                    return function instrumentedAndProxiedCreate(...args) {
                        const result = instrumentedMethod(...args);
                        // If the result is an object (like a chat instance), proxy it too
                        if (result && typeof result === 'object') {
                            return createDeepProxy(result, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["CHAT_PATH"], options);
                        }
                        return result;
                    };
                }
                return instrumentMethod(value, methodPath, t, options);
            }
            if (typeof value === 'function') {
                // Bind non-instrumented functions to preserve the original `this` context
                return value.bind(t);
            }
            if (value && typeof value === 'object') {
                return createDeepProxy(value, methodPath, options);
            }
            return value;
        }
    });
}
/**
 * Instrument a Google GenAI client with Sentry tracing
 * Can be used across Node.js, Cloudflare Workers, and Vercel Edge
 *
 * @template T - The type of the client that extends client object
 * @param client - The Google GenAI client to instrument
 * @param options - Optional configuration for recording inputs and outputs
 * @returns The instrumented client with the same type as the input
 *
 * @example
 * ```typescript
 * import { GoogleGenAI } from '@google/genai';
 * import { instrumentGoogleGenAIClient } from '@sentry/core';
 *
 * const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
 * const instrumentedClient = instrumentGoogleGenAIClient(genAI);
 *
 * // Now both chats.create and sendMessage will be instrumented
 * const chat = instrumentedClient.chats.create({ model: 'gemini-1.5-pro' });
 * const response = await chat.sendMessage({ message: 'Hello' });
 * ```
 */ function instrumentGoogleGenAIClient(client, options) {
    const sendDefaultPii = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])()?.getOptions().sendDefaultPii);
    const _options = {
        recordInputs: sendDefaultPii,
        recordOutputs: sendDefaultPii,
        ...options
    };
    return createDeepProxy(client, '', _options);
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langgraph/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LANGGRAPH_INTEGRATION_NAME",
    ()=>LANGGRAPH_INTEGRATION_NAME,
    "LANGGRAPH_ORIGIN",
    ()=>LANGGRAPH_ORIGIN
]);
const LANGGRAPH_INTEGRATION_NAME = 'LangGraph';
const LANGGRAPH_ORIGIN = 'auto.ai.langgraph';
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langgraph/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractModelMetadata",
    ()=>extractModelMetadata,
    "extractTokenUsageFromMessage",
    ()=>extractTokenUsageFromMessage,
    "extractToolCalls",
    ()=>extractToolCalls,
    "extractToolsFromCompiledGraph",
    ()=>extractToolsFromCompiledGraph,
    "setResponseAttributes",
    ()=>setResponseAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langchain/utils.js [instrumentation-edge] (ecmascript)");
;
;
/**
 * Extract tool calls from messages
 */ function extractToolCalls(messages) {
    if (!messages || messages.length === 0) {
        return null;
    }
    const toolCalls = [];
    for (const message of messages){
        if (message && typeof message === 'object') {
            const msgToolCalls = message.tool_calls;
            if (msgToolCalls && Array.isArray(msgToolCalls)) {
                toolCalls.push(...msgToolCalls);
            }
        }
    }
    return toolCalls.length > 0 ? toolCalls : null;
}
/**
 * Extract token usage from a message's usage_metadata or response_metadata
 * Returns token counts without setting span attributes
 */ function extractTokenUsageFromMessage(message) {
    const msg = message;
    let inputTokens = 0;
    let outputTokens = 0;
    let totalTokens = 0;
    // Extract from usage_metadata (newer format)
    if (msg.usage_metadata && typeof msg.usage_metadata === 'object') {
        const usage = msg.usage_metadata;
        if (typeof usage.input_tokens === 'number') {
            inputTokens = usage.input_tokens;
        }
        if (typeof usage.output_tokens === 'number') {
            outputTokens = usage.output_tokens;
        }
        if (typeof usage.total_tokens === 'number') {
            totalTokens = usage.total_tokens;
        }
        return {
            inputTokens,
            outputTokens,
            totalTokens
        };
    }
    // Fallback: Extract from response_metadata.tokenUsage
    if (msg.response_metadata && typeof msg.response_metadata === 'object') {
        const metadata = msg.response_metadata;
        if (metadata.tokenUsage && typeof metadata.tokenUsage === 'object') {
            const tokenUsage = metadata.tokenUsage;
            if (typeof tokenUsage.promptTokens === 'number') {
                inputTokens = tokenUsage.promptTokens;
            }
            if (typeof tokenUsage.completionTokens === 'number') {
                outputTokens = tokenUsage.completionTokens;
            }
            if (typeof tokenUsage.totalTokens === 'number') {
                totalTokens = tokenUsage.totalTokens;
            }
        }
    }
    return {
        inputTokens,
        outputTokens,
        totalTokens
    };
}
/**
 * Extract model and finish reason from a message's response_metadata
 */ function extractModelMetadata(span, message) {
    const msg = message;
    if (msg.response_metadata && typeof msg.response_metadata === 'object') {
        const metadata = msg.response_metadata;
        if (metadata.model_name && typeof metadata.model_name === 'string') {
            span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"], metadata.model_name);
        }
        if (metadata.finish_reason && typeof metadata.finish_reason === 'string') {
            span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"], [
                metadata.finish_reason
            ]);
        }
    }
}
/**
 * Extract tools from compiled graph structure
 *
 * Tools are stored in: compiledGraph.builder.nodes.tools.runnable.tools
 */ function extractToolsFromCompiledGraph(compiledGraph) {
    if (!compiledGraph.builder?.nodes?.tools?.runnable?.tools) {
        return null;
    }
    const tools = compiledGraph.builder?.nodes?.tools?.runnable?.tools;
    if (!tools || !Array.isArray(tools) || tools.length === 0) {
        return null;
    }
    // Extract name, description, and schema from each tool's lc_kwargs
    return tools.map((tool)=>({
            name: tool.lc_kwargs?.name,
            description: tool.lc_kwargs?.description,
            schema: tool.lc_kwargs?.schema
        }));
}
/**
 * Set response attributes on the span
 */ function setResponseAttributes(span, inputMessages, result) {
    // Extract messages from result
    const resultObj = result;
    const outputMessages = resultObj?.messages;
    if (!outputMessages || !Array.isArray(outputMessages)) {
        return;
    }
    // Get new messages (delta between input and output)
    const inputCount = inputMessages?.length ?? 0;
    const newMessages = outputMessages.length > inputCount ? outputMessages.slice(inputCount) : [];
    if (newMessages.length === 0) {
        return;
    }
    // Extract and set tool calls from new messages BEFORE normalization
    // (normalization strips tool_calls, so we need to extract them first)
    const toolCalls = extractToolCalls(newMessages);
    if (toolCalls) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"], JSON.stringify(toolCalls));
    }
    // Normalize the new messages
    const normalizedNewMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["normalizeLangChainMessages"])(newMessages);
    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"], JSON.stringify(normalizedNewMessages));
    // Accumulate token usage across all messages
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let totalTokens = 0;
    // Extract metadata from messages
    for (const message of newMessages){
        // Accumulate token usage
        const tokens = extractTokenUsageFromMessage(message);
        totalInputTokens += tokens.inputTokens;
        totalOutputTokens += tokens.outputTokens;
        totalTokens += tokens.totalTokens;
        // Extract model metadata (last message's metadata wins for model/finish_reason)
        extractModelMetadata(span, message);
    }
    // Set accumulated token usage on span
    if (totalInputTokens > 0) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"], totalInputTokens);
    }
    if (totalOutputTokens > 0) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"], totalOutputTokens);
    }
    if (totalTokens > 0) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"], totalTokens);
    }
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langgraph/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentLangGraph",
    ()=>instrumentLangGraph,
    "instrumentStateGraphCompile",
    ()=>instrumentStateGraphCompile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langchain/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langgraph/constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/langgraph/utils.js [instrumentation-edge] (ecmascript)");
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
 * Instruments StateGraph's compile method to create spans for agent creation and invocation
 *
 * Wraps the compile() method to:
 * - Create a `gen_ai.create_agent` span when compile() is called
 * - Automatically wrap the invoke() method on the returned compiled graph with a `gen_ai.invoke_agent` span
 *
 */ function instrumentStateGraphCompile(originalCompile, options) {
    return new Proxy(originalCompile, {
        apply (target, thisArg, args) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpan"])({
                op: 'gen_ai.create_agent',
                name: 'create_agent',
                attributes: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["LANGGRAPH_ORIGIN"],
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.create_agent',
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: 'create_agent'
                }
            }, (span)=>{
                try {
                    const compiledGraph = Reflect.apply(target, thisArg, args);
                    const compileOptions = args.length > 0 ? args[0] : {};
                    // Extract graph name
                    if (compileOptions?.name && typeof compileOptions.name === 'string') {
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_AGENT_NAME_ATTRIBUTE"], compileOptions.name);
                        span.updateName(`create_agent ${compileOptions.name}`);
                    }
                    // Instrument agent invoke method on the compiled graph
                    const originalInvoke = compiledGraph.invoke;
                    if (originalInvoke && typeof originalInvoke === 'function') {
                        compiledGraph.invoke = instrumentCompiledGraphInvoke(originalInvoke.bind(compiledGraph), compiledGraph, compileOptions, options);
                    }
                    return compiledGraph;
                } catch (error) {
                    span.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                        message: 'internal_error'
                    });
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.langgraph.error'
                        }
                    });
                    throw error;
                }
            });
        }
    });
}
/**
 * Instruments CompiledGraph's invoke method to create spans for agent invocation
 *
 * Creates a `gen_ai.invoke_agent` span when invoke() is called
 */ function instrumentCompiledGraphInvoke(originalInvoke, graphInstance, compileOptions, options) {
    return new Proxy(originalInvoke, {
        apply (target, thisArg, args) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpan"])({
                op: 'gen_ai.invoke_agent',
                name: 'invoke_agent',
                attributes: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["LANGGRAPH_ORIGIN"],
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE"],
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: 'invoke_agent'
                }
            }, async (span)=>{
                try {
                    const graphName = compileOptions?.name;
                    if (graphName && typeof graphName === 'string') {
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_PIPELINE_NAME_ATTRIBUTE"], graphName);
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_AGENT_NAME_ATTRIBUTE"], graphName);
                        span.updateName(`invoke_agent ${graphName}`);
                    }
                    // Extract thread_id from the config (second argument)
                    // LangGraph uses config.configurable.thread_id for conversation/session linking
                    const config = args.length > 1 ? args[1] : undefined;
                    const configurable = config?.configurable;
                    const threadId = configurable?.thread_id;
                    if (threadId && typeof threadId === 'string') {
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_CONVERSATION_ID_ATTRIBUTE"], threadId);
                    }
                    // Extract available tools from the graph instance
                    const tools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractToolsFromCompiledGraph"])(graphInstance);
                    if (tools) {
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE"], JSON.stringify(tools));
                    }
                    // Parse input messages
                    const recordInputs = options.recordInputs;
                    const recordOutputs = options.recordOutputs;
                    const inputMessages = args.length > 0 ? args[0].messages ?? [] : [];
                    if (inputMessages && recordInputs) {
                        const normalizedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["normalizeLangChainMessages"])(inputMessages);
                        const { systemInstructions, filteredMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSystemInstructions"])(normalizedMessages);
                        if (systemInstructions) {
                            span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE"], systemInstructions);
                        }
                        const truncatedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["truncateGenAiMessages"])(filteredMessages);
                        const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
                        span.setAttributes({
                            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"]]: JSON.stringify(truncatedMessages),
                            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"]]: filteredLength
                        });
                    }
                    // Call original invoke
                    const result = await Reflect.apply(target, thisArg, args);
                    // Set response attributes
                    if (recordOutputs) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setResponseAttributes"])(span, inputMessages ?? null, result);
                    }
                    return result;
                } catch (error) {
                    span.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                        message: 'internal_error'
                    });
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.langgraph.error'
                        }
                    });
                    throw error;
                }
            });
        }
    });
}
/**
 * Directly instruments a StateGraph instance to add tracing spans
 *
 * This function can be used to manually instrument LangGraph StateGraph instances
 * in environments where automatic instrumentation is not available or desired.
 *
 * @param stateGraph - The StateGraph instance to instrument
 * @param options - Optional configuration for recording inputs/outputs
 *
 * @example
 * ```typescript
 * import { instrumentLangGraph } from '@sentry/cloudflare';
 * import { StateGraph } from '@langchain/langgraph';
 *
 * const graph = new StateGraph(MessagesAnnotation)
 *   .addNode('agent', mockLlm)
 *   .addEdge(START, 'agent')
 *   .addEdge('agent', END);
 *
 * instrumentLangGraph(graph, { recordInputs: true, recordOutputs: true });
 * const compiled = graph.compile({ name: 'my_agent' });
 * ```
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function instrumentLangGraph(stateGraph, options) {
    const _options = options || {};
    stateGraph.compile = instrumentStateGraphCompile(stateGraph.compile.bind(stateGraph), _options);
    return stateGraph;
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INSTRUMENTED_METHODS",
    ()=>INSTRUMENTED_METHODS,
    "OPENAI_INTEGRATION_NAME",
    ()=>OPENAI_INTEGRATION_NAME,
    "RESPONSES_TOOL_CALL_EVENT_TYPES",
    ()=>RESPONSES_TOOL_CALL_EVENT_TYPES,
    "RESPONSE_EVENT_TYPES",
    ()=>RESPONSE_EVENT_TYPES
]);
const OPENAI_INTEGRATION_NAME = 'OpenAI';
// https://platform.openai.com/docs/quickstart?api-mode=responses
// https://platform.openai.com/docs/quickstart?api-mode=chat
// https://platform.openai.com/docs/api-reference/conversations
const INSTRUMENTED_METHODS = [
    'responses.create',
    'chat.completions.create',
    'embeddings.create',
    // Conversations API - for conversation state management
    // https://platform.openai.com/docs/guides/conversation-state
    'conversations.create'
];
const RESPONSES_TOOL_CALL_EVENT_TYPES = [
    'response.output_item.added',
    'response.function_call_arguments.delta',
    'response.function_call_arguments.done',
    'response.output_item.done'
];
const RESPONSE_EVENT_TYPES = [
    'response.created',
    'response.in_progress',
    'response.failed',
    'response.completed',
    'response.incomplete',
    'response.queued',
    'response.output_text.delta',
    ...RESPONSES_TOOL_CALL_EVENT_TYPES
];
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addChatCompletionAttributes",
    ()=>addChatCompletionAttributes,
    "addConversationAttributes",
    ()=>addConversationAttributes,
    "addEmbeddingsAttributes",
    ()=>addEmbeddingsAttributes,
    "addResponsesApiAttributes",
    ()=>addResponsesApiAttributes,
    "buildMethodPath",
    ()=>buildMethodPath,
    "extractRequestParameters",
    ()=>extractRequestParameters,
    "getOperationName",
    ()=>getOperationName,
    "getSpanOperation",
    ()=>getSpanOperation,
    "isChatCompletionChunk",
    ()=>isChatCompletionChunk,
    "isChatCompletionResponse",
    ()=>isChatCompletionResponse,
    "isConversationResponse",
    ()=>isConversationResponse,
    "isEmbeddingsResponse",
    ()=>isEmbeddingsResponse,
    "isResponsesApiResponse",
    ()=>isResponsesApiResponse,
    "isResponsesApiStreamEvent",
    ()=>isResponsesApiStreamEvent,
    "setCommonResponseAttributes",
    ()=>setCommonResponseAttributes,
    "setTokenUsageAttributes",
    ()=>setTokenUsageAttributes,
    "shouldInstrument",
    ()=>shouldInstrument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/constants.js [instrumentation-edge] (ecmascript)");
;
;
/**
 * Maps OpenAI method paths to OpenTelemetry semantic convention operation names
 * @see https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/#llm-request-spans
 */ function getOperationName(methodPath) {
    if (methodPath.includes('chat.completions')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_OPERATIONS"].CHAT;
    }
    if (methodPath.includes('responses')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_OPERATIONS"].CHAT;
    }
    if (methodPath.includes('embeddings')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_OPERATIONS"].EMBEDDINGS;
    }
    if (methodPath.includes('conversations')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_OPERATIONS"].CHAT;
    }
    return methodPath.split('.').pop() || 'unknown';
}
/**
 * Get the span operation for OpenAI methods
 * Following Sentry's convention: "gen_ai.{operation_name}"
 */ function getSpanOperation(methodPath) {
    return `gen_ai.${getOperationName(methodPath)}`;
}
/**
 * Check if a method path should be instrumented
 */ function shouldInstrument(methodPath) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["INSTRUMENTED_METHODS"].includes(methodPath);
}
/**
 * Build method path from current traversal
 */ function buildMethodPath(currentPath, prop) {
    return currentPath ? `${currentPath}.${prop}` : prop;
}
/**
 * Check if response is a Chat Completion object
 */ function isChatCompletionResponse(response) {
    return response !== null && typeof response === 'object' && 'object' in response && response.object === 'chat.completion';
}
/**
 * Check if response is a Responses API object
 */ function isResponsesApiResponse(response) {
    return response !== null && typeof response === 'object' && 'object' in response && response.object === 'response';
}
/**
 * Check if response is an Embeddings API object
 */ function isEmbeddingsResponse(response) {
    if (response === null || typeof response !== 'object' || !('object' in response)) {
        return false;
    }
    const responseObject = response;
    return responseObject.object === 'list' && typeof responseObject.model === 'string' && responseObject.model.toLowerCase().includes('embedding');
}
/**
 * Check if response is a Conversations API object
 * @see https://platform.openai.com/docs/api-reference/conversations
 */ function isConversationResponse(response) {
    return response !== null && typeof response === 'object' && 'object' in response && response.object === 'conversation';
}
/**
 * Check if streaming event is from the Responses API
 */ function isResponsesApiStreamEvent(event) {
    return event !== null && typeof event === 'object' && 'type' in event && typeof event.type === 'string' && event.type.startsWith('response.');
}
/**
 * Check if streaming event is a chat completion chunk
 */ function isChatCompletionChunk(event) {
    return event !== null && typeof event === 'object' && 'object' in event && event.object === 'chat.completion.chunk';
}
/**
 * Add attributes for Chat Completion responses
 */ function addChatCompletionAttributes(span, response, recordOutputs) {
    setCommonResponseAttributes(span, response.id, response.model, response.created);
    if (response.usage) {
        setTokenUsageAttributes(span, response.usage.prompt_tokens, response.usage.completion_tokens, response.usage.total_tokens);
    }
    if (Array.isArray(response.choices)) {
        const finishReasons = response.choices.map((choice)=>choice.finish_reason).filter((reason)=>reason !== null);
        if (finishReasons.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify(finishReasons)
            });
        }
        // Extract tool calls from all choices (only if recordOutputs is true)
        if (recordOutputs) {
            const toolCalls = response.choices.map((choice)=>choice.message?.tool_calls).filter((calls)=>Array.isArray(calls) && calls.length > 0).flat();
            if (toolCalls.length > 0) {
                span.setAttributes({
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(toolCalls)
                });
            }
        }
    }
}
/**
 * Add attributes for Responses API responses
 */ function addResponsesApiAttributes(span, response, recordOutputs) {
    setCommonResponseAttributes(span, response.id, response.model, response.created_at);
    if (response.status) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify([
                response.status
            ])
        });
    }
    if (response.usage) {
        setTokenUsageAttributes(span, response.usage.input_tokens, response.usage.output_tokens, response.usage.total_tokens);
    }
    // Extract function calls from output (only if recordOutputs is true)
    if (recordOutputs) {
        const responseWithOutput = response;
        if (Array.isArray(responseWithOutput.output) && responseWithOutput.output.length > 0) {
            // Filter for function_call type objects in the output array
            const functionCalls = responseWithOutput.output.filter((item)=>typeof item === 'object' && item !== null && item.type === 'function_call');
            if (functionCalls.length > 0) {
                span.setAttributes({
                    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(functionCalls)
                });
            }
        }
    }
}
/**
 * Add attributes for Embeddings API responses
 */ function addEmbeddingsAttributes(span, response) {
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_MODEL_ATTRIBUTE"]]: response.model,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: response.model
    });
    if (response.usage) {
        setTokenUsageAttributes(span, response.usage.prompt_tokens, undefined, response.usage.total_tokens);
    }
}
/**
 * Add attributes for Conversations API responses
 * @see https://platform.openai.com/docs/api-reference/conversations
 */ function addConversationAttributes(span, response) {
    const { id, created_at } = response;
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_ID_ATTRIBUTE"]]: id,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: id,
        // The conversation id is used to link messages across API calls
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_CONVERSATION_ID_ATTRIBUTE"]]: id
    });
    if (created_at) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE"]]: new Date(created_at * 1000).toISOString()
        });
    }
}
/**
 * Set token usage attributes
 * @param span - The span to add attributes to
 * @param promptTokens - The number of prompt tokens
 * @param completionTokens - The number of completion tokens
 * @param totalTokens - The number of total tokens
 */ function setTokenUsageAttributes(span, promptTokens, completionTokens, totalTokens) {
    if (promptTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_USAGE_PROMPT_TOKENS_ATTRIBUTE"]]: promptTokens,
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]]: promptTokens
        });
    }
    if (completionTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_USAGE_COMPLETION_TOKENS_ATTRIBUTE"]]: completionTokens,
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]]: completionTokens
        });
    }
    if (totalTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]]: totalTokens
        });
    }
}
/**
 * Set common response attributes
 * @param span - The span to add attributes to
 * @param id - The response id
 * @param model - The response model
 * @param timestamp - The response timestamp
 */ function setCommonResponseAttributes(span, id, model, timestamp) {
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_ID_ATTRIBUTE"]]: id,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: id
    });
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_MODEL_ATTRIBUTE"]]: model,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: model
    });
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE"]]: new Date(timestamp * 1000).toISOString()
    });
}
/**
 * Extract conversation ID from request parameters
 * Supports both Conversations API and previous_response_id chaining
 * @see https://platform.openai.com/docs/guides/conversation-state
 */ function extractConversationId(params) {
    // Conversations API: conversation parameter (e.g., "conv_...")
    if ('conversation' in params && typeof params.conversation === 'string') {
        return params.conversation;
    }
    // Responses chaining: previous_response_id links to parent response
    if ('previous_response_id' in params && typeof params.previous_response_id === 'string') {
        return params.previous_response_id;
    }
    return undefined;
}
/**
 * Extract request parameters including model settings and conversation context
 */ function extractRequestParameters(params) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]]: params.model ?? 'unknown'
    };
    if ('temperature' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE"]] = params.temperature;
    if ('top_p' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_P_ATTRIBUTE"]] = params.top_p;
    if ('frequency_penalty' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE"]] = params.frequency_penalty;
    if ('presence_penalty' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE"]] = params.presence_penalty;
    if ('stream' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_STREAM_ATTRIBUTE"]] = params.stream;
    if ('encoding_format' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE"]] = params.encoding_format;
    if ('dimensions' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE"]] = params.dimensions;
    // Capture conversation ID for linking messages across API calls
    const conversationId = extractConversationId(params);
    if (conversationId) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_CONVERSATION_ID_ATTRIBUTE"]] = conversationId;
    }
    return attributes;
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/streaming.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentStream",
    ()=>instrumentStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/utils.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
/**
 * State object used to accumulate information from a stream of OpenAI events/chunks.
 */ /**
 * Processes tool calls from a chat completion chunk delta.
 * Follows the pattern: accumulate by index, then convert to array at the end.
 *
 * @param toolCalls - Array of tool calls from the delta.
 * @param state - The current streaming state to update.
 *
 *  @see https://platform.openai.com/docs/guides/function-calling#streaming
 */ function processChatCompletionToolCalls(toolCalls, state) {
    for (const toolCall of toolCalls){
        const index = toolCall.index;
        if (index === undefined || !toolCall.function) continue;
        // Initialize tool call if this is the first chunk for this index
        if (!(index in state.chatCompletionToolCalls)) {
            state.chatCompletionToolCalls[index] = {
                ...toolCall,
                function: {
                    name: toolCall.function.name,
                    arguments: toolCall.function.arguments || ''
                }
            };
        } else {
            // Accumulate function arguments from subsequent chunks
            const existingToolCall = state.chatCompletionToolCalls[index];
            if (toolCall.function.arguments && existingToolCall?.function) {
                existingToolCall.function.arguments += toolCall.function.arguments;
            }
        }
    }
}
/**
 * Processes a single OpenAI ChatCompletionChunk event, updating the streaming state.
 *
 * @param chunk - The ChatCompletionChunk event to process.
 * @param state - The current streaming state to update.
 * @param recordOutputs - Whether to record output text fragments.
 */ function processChatCompletionChunk(chunk, state, recordOutputs) {
    state.responseId = chunk.id ?? state.responseId;
    state.responseModel = chunk.model ?? state.responseModel;
    state.responseTimestamp = chunk.created ?? state.responseTimestamp;
    if (chunk.usage) {
        // For stream responses, the input tokens remain constant across all events in the stream.
        // Output tokens, however, are only finalized in the last event.
        // Since we can't guarantee that the last event will include usage data or even be a typed event,
        // we update the output token values on every event that includes them.
        // This ensures that output token usage is always set, even if the final event lacks it.
        state.promptTokens = chunk.usage.prompt_tokens;
        state.completionTokens = chunk.usage.completion_tokens;
        state.totalTokens = chunk.usage.total_tokens;
    }
    for (const choice of chunk.choices ?? []){
        if (recordOutputs) {
            if (choice.delta?.content) {
                state.responseTexts.push(choice.delta.content);
            }
            // Handle tool calls from delta
            if (choice.delta?.tool_calls) {
                processChatCompletionToolCalls(choice.delta.tool_calls, state);
            }
        }
        if (choice.finish_reason) {
            state.finishReasons.push(choice.finish_reason);
        }
    }
}
/**
 * Processes a single OpenAI Responses API streaming event, updating the streaming state and span.
 *
 * @param streamEvent - The event to process (may be an error or unknown object).
 * @param state - The current streaming state to update.
 * @param recordOutputs - Whether to record output text fragments.
 * @param span - The span to update with error status if needed.
 */ function processResponsesApiEvent(streamEvent, state, recordOutputs, span) {
    if (!(streamEvent && typeof streamEvent === 'object')) {
        state.eventTypes.push('unknown:non-object');
        return;
    }
    if (streamEvent instanceof Error) {
        span.setStatus({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
            message: 'internal_error'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(streamEvent, {
            mechanism: {
                handled: false,
                type: 'auto.ai.openai.stream-response'
            }
        });
        return;
    }
    if (!('type' in streamEvent)) return;
    const event = streamEvent;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["RESPONSE_EVENT_TYPES"].includes(event.type)) {
        state.eventTypes.push(event.type);
        return;
    }
    // Handle output text delta
    if (recordOutputs) {
        // Handle tool call events for Responses API
        if (event.type === 'response.output_item.done' && 'item' in event) {
            state.responsesApiToolCalls.push(event.item);
        }
        if (event.type === 'response.output_text.delta' && 'delta' in event && event.delta) {
            state.responseTexts.push(event.delta);
            return;
        }
    }
    if ('response' in event) {
        const { response } = event;
        state.responseId = response.id ?? state.responseId;
        state.responseModel = response.model ?? state.responseModel;
        state.responseTimestamp = response.created_at ?? state.responseTimestamp;
        if (response.usage) {
            // For stream responses, the input tokens remain constant across all events in the stream.
            // Output tokens, however, are only finalized in the last event.
            // Since we can't guarantee that the last event will include usage data or even be a typed event,
            // we update the output token values on every event that includes them.
            // This ensures that output token usage is always set, even if the final event lacks it.
            state.promptTokens = response.usage.input_tokens;
            state.completionTokens = response.usage.output_tokens;
            state.totalTokens = response.usage.total_tokens;
        }
        if (response.status) {
            state.finishReasons.push(response.status);
        }
        if (recordOutputs && response.output_text) {
            state.responseTexts.push(response.output_text);
        }
    }
}
/**
 * Instruments a stream of OpenAI events, updating the provided span with relevant attributes and
 * optionally recording output text. This function yields each event from the input stream as it is processed.
 *
 * @template T - The type of events in the stream.
 * @param stream - The async iterable stream of events to instrument.
 * @param span - The span to add attributes to and to finish at the end of the stream.
 * @param recordOutputs - Whether to record output text fragments in the span.
 * @returns An async generator yielding each event from the input stream.
 */ async function* instrumentStream(stream, span, recordOutputs) {
    const state = {
        eventTypes: [],
        responseTexts: [],
        finishReasons: [],
        responseId: '',
        responseModel: '',
        responseTimestamp: 0,
        promptTokens: undefined,
        completionTokens: undefined,
        totalTokens: undefined,
        chatCompletionToolCalls: {},
        responsesApiToolCalls: []
    };
    try {
        for await (const event of stream){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isChatCompletionChunk"])(event)) {
                processChatCompletionChunk(event, state, recordOutputs);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isResponsesApiStreamEvent"])(event)) {
                processResponsesApiEvent(event, state, recordOutputs, span);
            }
            yield event;
        }
    } finally{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setCommonResponseAttributes"])(span, state.responseId, state.responseModel, state.responseTimestamp);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setTokenUsageAttributes"])(span, state.promptTokens, state.completionTokens, state.totalTokens);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STREAMING_ATTRIBUTE"]]: true
        });
        if (state.finishReasons.length) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify(state.finishReasons)
            });
        }
        if (recordOutputs && state.responseTexts.length) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: state.responseTexts.join('')
            });
        }
        // Set tool calls attribute if any were accumulated
        const chatCompletionToolCallsArray = Object.values(state.chatCompletionToolCalls);
        const allToolCalls = [
            ...chatCompletionToolCallsArray,
            ...state.responsesApiToolCalls
        ];
        if (allToolCalls.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(allToolCalls)
            });
        }
        span.end();
    }
}
;
 //# sourceMappingURL=streaming.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentOpenAiClient",
    ()=>instrumentOpenAiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/currentScopes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/debug-build.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/exports.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/semanticAttributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/debug-logger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/utils/is.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/trace.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$streaming$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/streaming.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/vercel-edge/node_modules/@sentry/core/build/esm/tracing/openai/utils.js [instrumentation-edge] (ecmascript)");
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
;
;
/**
 * Extract available tools from request parameters
 */ function extractAvailableTools(params) {
    const tools = Array.isArray(params.tools) ? params.tools : [];
    const hasWebSearchOptions = params.web_search_options && typeof params.web_search_options === 'object';
    const webSearchOptions = hasWebSearchOptions ? [
        {
            type: 'web_search_options',
            ...params.web_search_options
        }
    ] : [];
    const availableTools = [
        ...tools,
        ...webSearchOptions
    ];
    if (availableTools.length === 0) {
        return undefined;
    }
    try {
        return JSON.stringify(availableTools);
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["debug"].error('Failed to serialize OpenAI tools:', error);
        return undefined;
    }
}
/**
 * Extract request attributes from method arguments
 */ function extractRequestAttributes(args, methodPath) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_ATTRIBUTE"]]: 'openai',
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getOperationName"])(methodPath),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.ai.openai'
    };
    if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
        const params = args[0];
        const availableTools = extractAvailableTools(params);
        if (availableTools) {
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE"]] = availableTools;
        }
        Object.assign(attributes, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractRequestParameters"])(params));
    } else {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = 'unknown';
    }
    return attributes;
}
/**
 * Add response attributes to spans
 * This supports Chat Completion, Responses API, Embeddings, and Conversations API responses
 */ function addResponseAttributes(span, result, recordOutputs) {
    if (!result || typeof result !== 'object') return;
    const response = result;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isChatCompletionResponse"])(response)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addChatCompletionAttributes"])(span, response, recordOutputs);
        if (recordOutputs && response.choices?.length) {
            const responseTexts = response.choices.map((choice)=>choice.message?.content || '');
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: JSON.stringify(responseTexts)
            });
        }
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isResponsesApiResponse"])(response)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addResponsesApiAttributes"])(span, response, recordOutputs);
        if (recordOutputs && response.output_text) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: response.output_text
            });
        }
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isEmbeddingsResponse"])(response)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addEmbeddingsAttributes"])(span, response);
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isConversationResponse"])(response)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["addConversationAttributes"])(span, response);
    }
}
// Extract and record AI request inputs, if present. This is intentionally separate from response attributes.
function addRequestAttributes(span, params, operationName) {
    // Store embeddings input on a separate attribute and do not truncate it
    if (operationName === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["OPENAI_OPERATIONS"].EMBEDDINGS && 'input' in params) {
        const input = params.input;
        // No input provided
        if (input == null) {
            return;
        }
        // Empty input string
        if (typeof input === 'string' && input.length === 0) {
            return;
        }
        // Empty array input
        if (Array.isArray(input) && input.length === 0) {
            return;
        }
        // Store strings as-is, arrays/objects as JSON
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE"], typeof input === 'string' ? input : JSON.stringify(input));
        return;
    }
    const src = 'input' in params ? params.input : 'messages' in params ? params.messages : undefined;
    if (!src) {
        return;
    }
    if (Array.isArray(src) && src.length === 0) {
        return;
    }
    const { systemInstructions, filteredMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["extractSystemInstructions"])(src);
    if (systemInstructions) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE"], systemInstructions);
    }
    const truncatedInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(filteredMessages);
    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ATTRIBUTE"], truncatedInput);
    if (Array.isArray(filteredMessages)) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"], filteredMessages.length);
    } else {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE"], 1);
    }
}
/**
 * Creates a wrapped version of .withResponse() that replaces the data field
 * with the instrumented result while preserving metadata (response, request_id).
 */ async function createWithResponseWrapper(originalWithResponse, instrumentedPromise) {
    // Attach catch handler to originalWithResponse immediately to prevent unhandled rejection
    // If instrumentedPromise rejects first, we still need this handled
    const safeOriginalWithResponse = originalWithResponse.catch((error)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
            mechanism: {
                handled: false,
                type: 'auto.ai.openai'
            }
        });
        throw error;
    });
    const instrumentedResult = await instrumentedPromise;
    const originalWrapper = await safeOriginalWithResponse;
    // Combine instrumented result with original metadata
    if (originalWrapper && typeof originalWrapper === 'object' && 'data' in originalWrapper) {
        return {
            ...originalWrapper,
            data: instrumentedResult
        };
    }
    return instrumentedResult;
}
/**
 * Wraps a promise-like object to preserve additional methods (like .withResponse())
 */ function wrapPromiseWithMethods(originalPromiseLike, instrumentedPromise) {
    // If the original result is not thenable, return the instrumented promise
    // Should not happen with current OpenAI SDK instrumented methods, but just in case.
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isThenable"])(originalPromiseLike)) {
        return instrumentedPromise;
    }
    // Create a proxy that forwards Promise methods to instrumentedPromise
    // and preserves additional methods from the original result
    return new Proxy(originalPromiseLike, {
        get (target, prop) {
            // For standard Promise methods (.then, .catch, .finally, Symbol.toStringTag),
            // use instrumentedPromise to preserve Sentry instrumentation.
            // For custom methods (like .withResponse()), use the original target.
            const useInstrumentedPromise = prop in Promise.prototype || prop === Symbol.toStringTag;
            const source = useInstrumentedPromise ? instrumentedPromise : target;
            const value = Reflect.get(source, prop);
            // Special handling for .withResponse() to preserve instrumentation
            // .withResponse() returns { data: T, response: Response, request_id: string }
            if (prop === 'withResponse' && typeof value === 'function') {
                return function wrappedWithResponse() {
                    const originalWithResponse = value.call(target);
                    return createWithResponseWrapper(originalWithResponse, instrumentedPromise);
                };
            }
            return typeof value === 'function' ? value.bind(source) : value;
        }
    });
}
/**
 * Instrument a method with Sentry spans
 * Following Sentry AI Agents Manual Instrumentation conventions
 * @see https://docs.sentry.io/platforms/javascript/guides/node/tracing/instrumentation/ai-agents-module/#manual-instrumentation
 */ function instrumentMethod(originalMethod, methodPath, context, options) {
    return function instrumentedMethod(...args) {
        const requestAttributes = extractRequestAttributes(args, methodPath);
        const model = requestAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] || 'unknown';
        const operationName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getOperationName"])(methodPath);
        const params = args[0];
        const isStreamRequested = params && typeof params === 'object' && params.stream === true;
        const spanConfig = {
            name: `${operationName} ${model}${isStreamRequested ? ' stream-response' : ''}`,
            op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
            attributes: requestAttributes
        };
        if (isStreamRequested) {
            let originalResult;
            const instrumentedPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpanManual"])(spanConfig, (span)=>{
                originalResult = originalMethod.apply(context, args);
                if (options.recordInputs && params) {
                    addRequestAttributes(span, params, operationName);
                }
                // Return async processing
                return (async ()=>{
                    try {
                        const result = await originalResult;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$streaming$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["instrumentStream"])(result, span, options.recordOutputs ?? false);
                    } catch (error) {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                            message: 'internal_error'
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                            mechanism: {
                                handled: false,
                                type: 'auto.ai.openai.stream',
                                data: {
                                    function: methodPath
                                }
                            }
                        });
                        span.end();
                        throw error;
                    }
                })();
            });
            return wrapPromiseWithMethods(originalResult, instrumentedPromise);
        }
        // Non-streaming
        let originalResult;
        const instrumentedPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["startSpan"])(spanConfig, (span)=>{
            // Call synchronously to capture the promise
            originalResult = originalMethod.apply(context, args);
            if (options.recordInputs && params) {
                addRequestAttributes(span, params, operationName);
            }
            return originalResult.then((result)=>{
                addResponseAttributes(span, result, options.recordOutputs);
                return result;
            }, (error)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error, {
                    mechanism: {
                        handled: false,
                        type: 'auto.ai.openai',
                        data: {
                            function: methodPath
                        }
                    }
                });
                throw error;
            });
        });
        return wrapPromiseWithMethods(originalResult, instrumentedPromise);
    };
}
/**
 * Create a deep proxy for OpenAI client instrumentation
 */ function createDeepProxy(target, currentPath = '', options) {
    return new Proxy(target, {
        get (obj, prop) {
            const value = obj[prop];
            const methodPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["buildMethodPath"])(currentPath, String(prop));
            if (typeof value === 'function' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["shouldInstrument"])(methodPath)) {
                return instrumentMethod(value, methodPath, obj, options);
            }
            if (typeof value === 'function') {
                // Bind non-instrumented functions to preserve the original `this` context,
                // which is required for accessing private class fields (e.g. #baseURL) in OpenAI SDK v5.
                return value.bind(obj);
            }
            if (value && typeof value === 'object') {
                return createDeepProxy(value, methodPath, options);
            }
            return value;
        }
    });
}
/**
 * Instrument an OpenAI client with Sentry tracing
 * Can be used across Node.js, Cloudflare Workers, and Vercel Edge
 */ function instrumentOpenAiClient(client, options) {
    const sendDefaultPii = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$vercel$2d$edge$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getClient"])()?.getOptions().sendDefaultPii);
    const _options = {
        recordInputs: sendDefaultPii,
        recordOutputs: sendDefaultPii,
        ...options
    };
    return createDeepProxy(client, '', _options);
}
;
 //# sourceMappingURL=index.js.map
}),
]);

//# sourceMappingURL=36318_%40sentry_core_build_esm_tracing_88dffb07._.js.map