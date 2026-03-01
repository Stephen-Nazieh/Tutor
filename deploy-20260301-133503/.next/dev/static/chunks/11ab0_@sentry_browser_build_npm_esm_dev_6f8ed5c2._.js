;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="be195a5f-a224-409d-4e29-2bad779912fa")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventFromException",
    ()=>eventFromException,
    "eventFromMessage",
    ()=>eventFromMessage,
    "eventFromUnknownInput",
    ()=>eventFromUnknownInput,
    "exceptionFromError",
    ()=>exceptionFromError,
    "extractMessage",
    ()=>extractMessage,
    "extractType",
    ()=>extractType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/normalize.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$enhanceErrorWithSentryInfo__as__$5f$INTERNAL_enhanceErrorWithSentryInfo$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/eventbuilder.js [client] (ecmascript) <export _enhanceErrorWithSentryInfo as _INTERNAL_enhanceErrorWithSentryInfo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/syncpromise.js [client] (ecmascript)");
;
/**
 * This function creates an exception from a JavaScript Error
 */ function exceptionFromError(stackParser, ex) {
    // Get the frames first since Opera can lose the stack if we touch anything else first
    const frames = parseStackFrames(stackParser, ex);
    const exception = {
        type: extractType(ex),
        value: extractMessage(ex)
    };
    if (frames.length) {
        exception.stacktrace = {
            frames
        };
    }
    if (exception.type === undefined && exception.value === '') {
        exception.value = 'Unrecoverable error caught';
    }
    return exception;
}
function eventFromPlainObject(stackParser, exception, syntheticException, isUnhandledRejection) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    const normalizeDepth = client?.getOptions().normalizeDepth;
    // If we can, we extract an exception from the object properties
    const errorFromProp = getErrorPropertyFromObject(exception);
    const extra = {
        __serialized__: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeToSize"])(exception, normalizeDepth)
    };
    if (errorFromProp) {
        return {
            exception: {
                values: [
                    exceptionFromError(stackParser, errorFromProp)
                ]
            },
            extra
        };
    }
    const event = {
        exception: {
            values: [
                {
                    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isEvent"])(exception) ? exception.constructor.name : isUnhandledRejection ? 'UnhandledRejection' : 'Error',
                    value: getNonErrorObjectExceptionValue(exception, {
                        isUnhandledRejection
                    })
                }
            ]
        },
        extra
    };
    if (syntheticException) {
        const frames = parseStackFrames(stackParser, syntheticException);
        if (frames.length) {
            // event.exception.values[0] has been set above
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            event.exception.values[0].stacktrace = {
                frames
            };
        }
    }
    return event;
}
function eventFromError(stackParser, ex) {
    return {
        exception: {
            values: [
                exceptionFromError(stackParser, ex)
            ]
        }
    };
}
/** Parses stack frames from an error */ function parseStackFrames(stackParser, ex) {
    // Access and store the stacktrace property before doing ANYTHING
    // else to it because Opera is not very good at providing it
    // reliably in other circumstances.
    const stacktrace = ex.stacktrace || ex.stack || '';
    const skipLines = getSkipFirstStackStringLines(ex);
    const framesToPop = getPopFirstTopFrames(ex);
    try {
        return stackParser(stacktrace, skipLines, framesToPop);
    } catch  {
    // no-empty
    }
    return [];
}
// Based on our own mapping pattern - https://github.com/getsentry/sentry/blob/9f08305e09866c8bd6d0c24f5b0aabdd7dd6c59c/src/sentry/lang/javascript/errormapping.py#L83-L108
const reactMinifiedRegexp = /Minified React error #\d+;/i;
/**
 * Certain known React errors contain links that would be falsely
 * parsed as frames. This function check for these errors and
 * returns number of the stack string lines to skip.
 */ function getSkipFirstStackStringLines(ex) {
    if (ex && reactMinifiedRegexp.test(ex.message)) {
        return 1;
    }
    return 0;
}
/**
 * If error has `framesToPop` property, it means that the
 * creator tells us the first x frames will be useless
 * and should be discarded. Typically error from wrapper function
 * which don't point to the actual location in the developer's code.
 *
 * Example: https://github.com/zertosh/invariant/blob/master/invariant.js#L46
 */ function getPopFirstTopFrames(ex) {
    if (typeof ex.framesToPop === 'number') {
        return ex.framesToPop;
    }
    return 0;
}
// https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Exception
// @ts-expect-error - WebAssembly.Exception is a valid class
function isWebAssemblyException(exception) {
    // Check for support
    // @ts-expect-error - WebAssembly.Exception is a valid class
    if (typeof WebAssembly !== 'undefined' && typeof WebAssembly.Exception !== 'undefined') {
        // @ts-expect-error - WebAssembly.Exception is a valid class
        return exception instanceof WebAssembly.Exception;
    } else {
        return false;
    }
}
/**
 * Extracts from errors what we use as the exception `type` in error events.
 *
 * Usually, this is the `name` property on Error objects but WASM errors need to be treated differently.
 */ function extractType(ex) {
    const name = ex?.name;
    // The name for WebAssembly.Exception Errors needs to be extracted differently.
    // Context: https://github.com/getsentry/sentry-javascript/issues/13787
    if (!name && isWebAssemblyException(ex)) {
        // Emscripten sets array[type, message] to the "message" property on the WebAssembly.Exception object
        const hasTypeInMessage = ex.message && Array.isArray(ex.message) && ex.message.length == 2;
        return hasTypeInMessage ? ex.message[0] : 'WebAssembly.Exception';
    }
    return name;
}
/**
 * There are cases where stacktrace.message is an Event object
 * https://github.com/getsentry/sentry-javascript/issues/1949
 * In this specific case we try to extract stacktrace.message.error.message
 */ function extractMessage(ex) {
    const message = ex?.message;
    if (isWebAssemblyException(ex)) {
        // For Node 18, Emscripten sets array[type, message] to the "message" property on the WebAssembly.Exception object
        if (Array.isArray(ex.message) && ex.message.length == 2) {
            return ex.message[1];
        }
        return 'wasm exception';
    }
    if (!message) {
        return 'No error message';
    }
    if (message.error && typeof message.error.message === 'string') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$enhanceErrorWithSentryInfo__as__$5f$INTERNAL_enhanceErrorWithSentryInfo$3e$__["_INTERNAL_enhanceErrorWithSentryInfo"])(message.error);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$enhanceErrorWithSentryInfo__as__$5f$INTERNAL_enhanceErrorWithSentryInfo$3e$__["_INTERNAL_enhanceErrorWithSentryInfo"])(ex);
}
/**
 * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
 * @hidden
 */ function eventFromException(stackParser, exception, hint, attachStacktrace) {
    const syntheticException = hint?.syntheticException || undefined;
    const event = eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event); // defaults to { type: 'generic', handled: true }
    event.level = 'error';
    if (hint?.event_id) {
        event.event_id = hint.event_id;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolvedSyncPromise"])(event);
}
/**
 * Builds and Event from a Message
 * @hidden
 */ function eventFromMessage(stackParser, message, level = 'info', hint, attachStacktrace) {
    const syntheticException = hint?.syntheticException || undefined;
    const event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
    event.level = level;
    if (hint?.event_id) {
        event.event_id = hint.event_id;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resolvedSyncPromise"])(event);
}
/**
 * @hidden
 */ function eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace, isUnhandledRejection) {
    let event;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isErrorEvent"])(exception) && exception.error) {
        // If it is an ErrorEvent with `error` property, extract it to get actual Error
        const errorEvent = exception;
        return eventFromError(stackParser, errorEvent.error);
    }
    // If it is a `DOMError` (which is a legacy API, but still supported in some browsers) then we just extract the name
    // and message, as it doesn't provide anything else. According to the spec, all `DOMExceptions` should also be
    // `Error`s, but that's not the case in IE11, so in that case we treat it the same as we do a `DOMError`.
    //
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
    // https://webidl.spec.whatwg.org/#es-DOMException-specialness
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isDOMError"])(exception) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isDOMException"])(exception)) {
        const domException = exception;
        if ('stack' in exception) {
            event = eventFromError(stackParser, exception);
        } else {
            const name = domException.name || ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isDOMError"])(domException) ? 'DOMError' : 'DOMException');
            const message = domException.message ? `${name}: ${domException.message}` : name;
            event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionTypeValue"])(event, message);
        }
        if ('code' in domException) {
            // eslint-disable-next-line deprecation/deprecation
            event.tags = {
                ...event.tags,
                'DOMException.code': `${domException.code}`
            };
        }
        return event;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isError"])(exception)) {
        // we have a real Error object, do nothing
        return eventFromError(stackParser, exception);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(exception) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isEvent"])(exception)) {
        // If it's a plain object or an instance of `Event` (the built-in JS kind, not this SDK's `Event` type), serialize
        // it manually. This will allow us to group events based on top-level keys which is much better than creating a new
        // group on any key/value change.
        const objectException = exception;
        event = eventFromPlainObject(stackParser, objectException, syntheticException, isUnhandledRejection);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
            synthetic: true
        });
        return event;
    }
    // If none of previous checks were valid, then it means that it's not:
    // - an instance of DOMError
    // - an instance of DOMException
    // - an instance of Event
    // - an instance of Error
    // - a valid ErrorEvent (one with an error property)
    // - a plain Object
    //
    // So bail out and capture it as a simple message:
    event = eventFromString(stackParser, exception, syntheticException, attachStacktrace);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionTypeValue"])(event, `${exception}`, undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
        synthetic: true
    });
    return event;
}
function eventFromString(stackParser, message, syntheticException, attachStacktrace) {
    const event = {};
    if (attachStacktrace && syntheticException) {
        const frames = parseStackFrames(stackParser, syntheticException);
        if (frames.length) {
            event.exception = {
                values: [
                    {
                        value: message,
                        stacktrace: {
                            frames
                        }
                    }
                ]
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
            synthetic: true
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isParameterizedString"])(message)) {
        const { __sentry_template_string__, __sentry_template_values__ } = message;
        event.logentry = {
            message: __sentry_template_string__,
            params: __sentry_template_values__
        };
        return event;
    }
    event.message = message;
    return event;
}
function getNonErrorObjectExceptionValue(exception, { isUnhandledRejection }) {
    const keys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["extractExceptionKeysForMessage"])(exception);
    const captureType = isUnhandledRejection ? 'promise rejection' : 'exception';
    // Some ErrorEvent instances do not have an `error` property, which is why they are not handled before
    // We still want to try to get a decent message for these cases
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isErrorEvent"])(exception)) {
        return `Event \`ErrorEvent\` captured as ${captureType} with message \`${exception.message}\``;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isEvent"])(exception)) {
        const className = getObjectClassName(exception);
        return `Event \`${className}\` (type=${exception.type}) captured as ${captureType}`;
    }
    return `Object captured as ${captureType} with keys: ${keys}`;
}
function getObjectClassName(obj) {
    try {
        const prototype = Object.getPrototypeOf(obj);
        return prototype ? prototype.constructor.name : undefined;
    } catch  {
    // ignore errors here
    }
}
/** If a plain object has a property that is an `Error`, return this error. */ function getErrorPropertyFromObject(obj) {
    for(const prop in obj){
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            const value = obj[prop];
            if (value instanceof Error) {
                return value;
            }
        }
    }
    return undefined;
}
;
 //# sourceMappingURL=eventbuilder.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WINDOW",
    ()=>WINDOW,
    "getHttpRequestData",
    ()=>getHttpRequestData,
    "ignoreNextOnError",
    ()=>ignoreNextOnError,
    "shouldIgnoreOnError",
    ()=>shouldIgnoreOnError,
    "wrap",
    ()=>wrap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [client] (ecmascript)");
;
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
let ignoreOnError = 0;
/**
 * @hidden
 */ function shouldIgnoreOnError() {
    return ignoreOnError > 0;
}
/**
 * @hidden
 */ function ignoreNextOnError() {
    // onerror should trigger before setTimeout
    ignoreOnError++;
    setTimeout(()=>{
        ignoreOnError--;
    });
}
// eslint-disable-next-line @typescript-eslint/ban-types
/**
 * Instruments the given function and sends an event to Sentry every time the
 * function throws an exception.
 *
 * @param fn A function to wrap. It is generally safe to pass an unbound function, because the returned wrapper always
 * has a correct `this` context.
 * @returns The wrapped function.
 * @hidden
 */ function wrap(fn, options = {}) {
    // for future readers what this does is wrap a function and then create
    // a bi-directional wrapping between them.
    //
    // example: wrapped = wrap(original);
    //  original.__sentry_wrapped__ -> wrapped
    //  wrapped.__sentry_original__ -> original
    function isFunction(fn) {
        return typeof fn === 'function';
    }
    if (!isFunction(fn)) {
        return fn;
    }
    try {
        // if we're dealing with a function that was previously wrapped, return
        // the original wrapper.
        const wrapper = fn.__sentry_wrapped__;
        if (wrapper) {
            if (typeof wrapper === 'function') {
                return wrapper;
            } else {
                // If we find that the `__sentry_wrapped__` function is not a function at the time of accessing it, it means
                // that something messed with it. In that case we want to return the originally passed function.
                return fn;
            }
        }
        // We don't wanna wrap it twice
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getOriginalFunction"])(fn)) {
            return fn;
        }
    } catch  {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        // Bail on wrapping and return the function as-is (defers to window.onerror).
        return fn;
    }
    // Wrap the function itself
    // It is important that `sentryWrapped` is not an arrow function to preserve the context of `this`
    const sentryWrapped = function(...args) {
        try {
            // Also wrap arguments that are themselves functions
            const wrappedArguments = args.map((arg)=>wrap(arg, options));
            // Attempt to invoke user-land function
            // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
            //       means the sentry.javascript SDK caught an error invoking your application code. This
            //       is expected behavior and NOT indicative of a bug with sentry.javascript.
            return fn.apply(this, wrappedArguments);
        } catch (ex) {
            ignoreNextOnError();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
                scope.addEventProcessor((event)=>{
                    if (options.mechanism) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionTypeValue"])(event, undefined, undefined);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, options.mechanism);
                    }
                    event.extra = {
                        ...event.extra,
                        arguments: args
                    };
                    return event;
                });
                // no need to add a mechanism here, we already add it via an event processor above
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureException"])(ex);
            });
            throw ex;
        }
    };
    // Wrap the wrapped function in a proxy, to ensure any other properties of the original function remain available
    try {
        for(const property in fn){
            if (Object.prototype.hasOwnProperty.call(fn, property)) {
                sentryWrapped[property] = fn[property];
            }
        }
    } catch  {
    // Accessing some objects may throw
    // ref: https://github.com/getsentry/sentry-javascript/issues/1168
    }
    // Signal that this function has been wrapped/filled already
    // for both debugging and to prevent it to being wrapped/filled twice
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markFunctionWrapped"])(sentryWrapped, fn);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(fn, '__sentry_wrapped__', sentryWrapped);
    // Restore original function name (not all browsers allow that)
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name');
        if (descriptor.configurable) {
            Object.defineProperty(sentryWrapped, 'name', {
                get () {
                    return fn.name;
                }
            });
        }
    } catch  {
    // This may throw if e.g. the descriptor does not exist, or a browser does not allow redefining `name`.
    // to save some bytes we simply try-catch this
    }
    return sentryWrapped;
}
/**
 * Get HTTP request data from the current page.
 */ function getHttpRequestData() {
    // grab as much info as exists and add it to the event
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLocationHref"])();
    const { referrer } = WINDOW.document || {};
    const { userAgent } = WINDOW.navigator || {};
    const headers = {
        ...referrer && {
            Referer: referrer
        },
        ...userAgent && {
            'User-Agent': userAgent
        }
    };
    const request = {
        url,
        headers
    };
    return request;
}
;
 //# sourceMappingURL=helpers.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/client.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrowserClient",
    ()=>BrowserClient,
    "applyDefaultOptions",
    ()=>applyDefaultOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$env$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/env.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$sdkMetadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/sdkMetadata.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/logs/internal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$internal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/metrics/internal.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$ipAddress$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/ipAddress.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
;
/**
 * A magic string that build tooling can leverage in order to inject a release value into the SDK.
 */ /**
 * The Sentry Browser SDK Client.
 *
 * @see BrowserOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */ class BrowserClient extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Client"] {
    /**
   * Creates a new Browser SDK instance.
   *
   * @param options Configuration options for this SDK.
   */ constructor(options){
        const opts = applyDefaultOptions(options);
        const sdkSource = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].SENTRY_SDK_SOURCE || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$env$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSDKSource"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$sdkMetadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__["applySdkMetadata"])(opts, 'browser', [
            'browser'
        ], sdkSource);
        // Only allow IP inferral by Relay if sendDefaultPii is true
        if (opts._metadata?.sdk) {
            opts._metadata.sdk.settings = {
                infer_ip: opts.sendDefaultPii ? 'auto' : 'never',
                // purposefully allowing already passed settings to override the default
                ...opts._metadata.sdk.settings
            };
        }
        super(opts);
        const { sendDefaultPii, sendClientReports, enableLogs, _experiments, enableMetrics: enableMetricsOption } = this._options;
        // todo(v11): Remove the experimental flag
        // eslint-disable-next-line deprecation/deprecation
        const enableMetrics = enableMetricsOption ?? _experiments?.enableMetrics ?? true;
        // Flush logs and metrics when page becomes hidden (e.g., tab switch, navigation)
        // todo(v11): Remove the experimental flag
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document && (sendClientReports || enableLogs || enableMetrics)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.addEventListener('visibilitychange', ()=>{
                if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.visibilityState === 'hidden') {
                    if (sendClientReports) {
                        this._flushOutcomes();
                    }
                    if (enableLogs) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_flushLogsBuffer"])(this);
                    }
                    if (enableMetrics) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$internal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_flushMetricsBuffer"])(this);
                    }
                }
            });
        }
        if (sendDefaultPii) {
            this.on('beforeSendSession', __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$ipAddress$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addAutoIpAddressToSession"]);
        }
    }
    /**
   * @inheritDoc
   */ eventFromException(exception, hint) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["eventFromException"])(this._options.stackParser, exception, hint, this._options.attachStacktrace);
    }
    /**
   * @inheritDoc
   */ eventFromMessage(message, level = 'info', hint) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["eventFromMessage"])(this._options.stackParser, message, level, hint, this._options.attachStacktrace);
    }
    /**
   * @inheritDoc
   */ _prepareEvent(event, hint, currentScope, isolationScope) {
        event.platform = event.platform || 'javascript';
        return super._prepareEvent(event, hint, currentScope, isolationScope);
    }
}
/** Exported only for tests. */ function applyDefaultOptions(optionsArg) {
    return {
        release: typeof __SENTRY_RELEASE__ === 'string' // This allows build tooling to find-and-replace __SENTRY_RELEASE__ to inject a release value
         ? __SENTRY_RELEASE__ : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].SENTRY_RELEASE?.id,
        sendClientReports: true,
        // We default this to true, as it is the safer scenario
        parentSpanIsAlwaysRootSpan: true,
        ...optionsArg
    };
}
;
 //# sourceMappingURL=client.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEBUG_BUILD",
    ()=>DEBUG_BUILD
]);
/**
 * This serves as a build time flag that will be true by default, but false in non-debug builds or if users replace `__SENTRY_DEBUG__` in their generated code.
 *
 * ATTENTION: This constant must never cross package boundaries (i.e. be exported) to guarantee that it can be used for tree shaking.
 */ const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__;
;
 //# sourceMappingURL=debug-build.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/breadcrumbs.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "breadcrumbsIntegration",
    ()=>breadcrumbsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/instrument/console.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/instrument/fetch.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/severity.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/breadcrumbs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$breadcrumb$2d$log$2d$level$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/breadcrumb-log-level.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/url.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$dom$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/instrument/dom.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
;
;
/** maxStringLength gets capped to prevent 100 breadcrumbs exceeding 1MB event payload size */ const MAX_ALLOWED_STRING_LENGTH = 1024;
const INTEGRATION_NAME = 'Breadcrumbs';
const _breadcrumbsIntegration = (options = {})=>{
    const _options = {
        console: true,
        dom: true,
        fetch: true,
        history: true,
        sentry: true,
        xhr: true,
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            // TODO(v11): Remove this functionality and use `consoleIntegration` from @sentry/core instead.
            if (_options.console) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addConsoleInstrumentationHandler"])(_getConsoleBreadcrumbHandler(client));
            }
            if (_options.dom) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$dom$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addClickKeypressInstrumentationHandler"])(_getDomBreadcrumbHandler(client, _options.dom));
            }
            if (_options.xhr) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addXhrInstrumentationHandler"])(_getXhrBreadcrumbHandler(client));
            }
            if (_options.fetch) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addFetchInstrumentationHandler"])(_getFetchBreadcrumbHandler(client));
            }
            if (_options.history) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addHistoryInstrumentationHandler"])(_getHistoryBreadcrumbHandler(client));
            }
            if (_options.sentry) {
                client.on('beforeSendEvent', _getSentryBreadcrumbHandler(client));
            }
        }
    };
};
const breadcrumbsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_breadcrumbsIntegration);
/**
 * Adds a breadcrumb for Sentry events or transactions if this option is enabled.
 */ function _getSentryBreadcrumbHandler(client) {
    return function addSentryBreadcrumb(event) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])({
            category: `sentry.${event.type === 'transaction' ? 'transaction' : 'event'}`,
            event_id: event.event_id,
            level: event.level,
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getEventDescription"])(event)
        }, {
            event
        });
    };
}
/**
 * A HOC that creates a function that creates breadcrumbs from DOM API calls.
 * This is a HOC so that we get access to dom options in the closure.
 */ function _getDomBreadcrumbHandler(client, dom) {
    return function _innerDomBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        let target;
        let componentName;
        let keyAttrs = typeof dom === 'object' ? dom.serializeAttribute : undefined;
        let maxStringLength = typeof dom === 'object' && typeof dom.maxStringLength === 'number' ? dom.maxStringLength : undefined;
        if (maxStringLength && maxStringLength > MAX_ALLOWED_STRING_LENGTH) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`\`dom.maxStringLength\` cannot exceed ${MAX_ALLOWED_STRING_LENGTH}, but a value of ${maxStringLength} was configured. Sentry will use ${MAX_ALLOWED_STRING_LENGTH} instead.`);
            maxStringLength = MAX_ALLOWED_STRING_LENGTH;
        }
        if (typeof keyAttrs === 'string') {
            keyAttrs = [
                keyAttrs
            ];
        }
        // Accessing event.target can throw (see getsentry/raven-js#838, #768)
        try {
            const event = handlerData.event;
            const element = _isEvent(event) ? event.target : event;
            target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["htmlTreeAsString"])(element, {
                keyAttrs,
                maxStringLength
            });
            componentName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getComponentName"])(element);
        } catch  {
            target = '<unknown>';
        }
        if (target.length === 0) {
            return;
        }
        const breadcrumb = {
            category: `ui.${handlerData.name}`,
            message: target
        };
        if (componentName) {
            breadcrumb.data = {
                'ui.component_name': componentName
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, {
            event: handlerData.event,
            name: handlerData.name,
            global: handlerData.global
        });
    };
}
/**
 * Creates breadcrumbs from console API calls
 */ function _getConsoleBreadcrumbHandler(client) {
    return function _consoleBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const breadcrumb = {
            category: 'console',
            data: {
                arguments: handlerData.args,
                logger: 'console'
            },
            level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$client$5d$__$28$ecmascript$29$__["severityLevelFromString"])(handlerData.level),
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["safeJoin"])(handlerData.args, ' ')
        };
        if (handlerData.level === 'assert') {
            if (handlerData.args[0] === false) {
                breadcrumb.message = `Assertion failed: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["safeJoin"])(handlerData.args.slice(1), ' ') || 'console.assert'}`;
                breadcrumb.data.arguments = handlerData.args.slice(1);
            } else {
                // Don't capture a breadcrumb for passed assertions
                return;
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, {
            input: handlerData.args,
            level: handlerData.level
        });
    };
}
/**
 * Creates breadcrumbs from XHR API calls
 */ function _getXhrBreadcrumbHandler(client) {
    return function _xhrBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const { startTimestamp, endTimestamp } = handlerData;
        const sentryXhrData = handlerData.xhr[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SENTRY_XHR_DATA_KEY"]];
        // We only capture complete, non-sentry requests
        if (!startTimestamp || !endTimestamp || !sentryXhrData) {
            return;
        }
        const { method, url, status_code, body } = sentryXhrData;
        const data = {
            method,
            url,
            status_code
        };
        const hint = {
            xhr: handlerData.xhr,
            input: body,
            startTimestamp,
            endTimestamp
        };
        const breadcrumb = {
            category: 'xhr',
            data,
            type: 'http',
            level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$breadcrumb$2d$log$2d$level$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getBreadcrumbLogLevelFromHttpStatusCode"])(status_code)
        };
        client.emit('beforeOutgoingRequestBreadcrumb', breadcrumb, hint);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, hint);
    };
}
/**
 * Creates breadcrumbs from fetch API calls
 */ function _getFetchBreadcrumbHandler(client) {
    return function _fetchBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const { startTimestamp, endTimestamp } = handlerData;
        // We only capture complete fetch requests
        if (!endTimestamp) {
            return;
        }
        if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === 'POST') {
            // We will not create breadcrumbs for fetch requests that contain `sentry_key` (internal sentry requests)
            return;
        }
        ({
            method: handlerData.fetchData.method,
            url: handlerData.fetchData.url
        });
        if (handlerData.error) {
            const data = handlerData.fetchData;
            const hint = {
                data: handlerData.error,
                input: handlerData.args,
                startTimestamp,
                endTimestamp
            };
            const breadcrumb = {
                category: 'fetch',
                data,
                level: 'error',
                type: 'http'
            };
            client.emit('beforeOutgoingRequestBreadcrumb', breadcrumb, hint);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, hint);
        } else {
            const response = handlerData.response;
            const data = {
                ...handlerData.fetchData,
                status_code: response?.status
            };
            handlerData.fetchData.request_body_size;
            handlerData.fetchData.response_body_size;
            response?.status;
            const hint = {
                input: handlerData.args,
                response,
                startTimestamp,
                endTimestamp
            };
            const breadcrumb = {
                category: 'fetch',
                data,
                type: 'http',
                level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$breadcrumb$2d$log$2d$level$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getBreadcrumbLogLevelFromHttpStatusCode"])(data.status_code)
            };
            client.emit('beforeOutgoingRequestBreadcrumb', breadcrumb, hint);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb, hint);
        }
    };
}
/**
 * Creates breadcrumbs from history API calls
 */ function _getHistoryBreadcrumbHandler(client) {
    return function _historyBreadcrumb(handlerData) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        let from = handlerData.from;
        let to = handlerData.to;
        const parsedLoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].location.href);
        let parsedFrom = from ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseUrl"])(from) : undefined;
        const parsedTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseUrl"])(to);
        // Initial pushState doesn't provide `from` information
        if (!parsedFrom?.path) {
            parsedFrom = parsedLoc;
        }
        // Use only the path component of the URL if the URL matches the current
        // document (almost all the time when using pushState)
        if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
            to = parsedTo.relative;
        }
        if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
            from = parsedFrom.relative;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])({
            category: 'navigation',
            data: {
                from,
                to
            }
        });
    };
}
function _isEvent(event) {
    return !!event && !!event.target;
}
;
 //# sourceMappingURL=breadcrumbs.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browserapierrors.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "browserApiErrorsIntegration",
    ()=>browserApiErrorsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
const DEFAULT_EVENT_TARGET = [
    'EventTarget',
    'Window',
    'Node',
    'ApplicationCache',
    'AudioTrackList',
    'BroadcastChannel',
    'ChannelMergerNode',
    'CryptoOperation',
    'EventSource',
    'FileReader',
    'HTMLUnknownElement',
    'IDBDatabase',
    'IDBRequest',
    'IDBTransaction',
    'KeyOperation',
    'MediaController',
    'MessagePort',
    'ModalWindow',
    'Notification',
    'SVGElementInstance',
    'Screen',
    'SharedWorker',
    'TextTrack',
    'TextTrackCue',
    'TextTrackList',
    'WebSocket',
    'WebSocketWorker',
    'Worker',
    'XMLHttpRequest',
    'XMLHttpRequestEventTarget',
    'XMLHttpRequestUpload'
];
const INTEGRATION_NAME = 'BrowserApiErrors';
const _browserApiErrorsIntegration = (options = {})=>{
    const _options = {
        XMLHttpRequest: true,
        eventTarget: true,
        requestAnimationFrame: true,
        setInterval: true,
        setTimeout: true,
        unregisterOriginalCallbacks: false,
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        // TODO: This currently only works for the first client this is setup
        // We may want to adjust this to check for client etc.
        setupOnce () {
            if (_options.setTimeout) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"], 'setTimeout', _wrapTimeFunction);
            }
            if (_options.setInterval) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"], 'setInterval', _wrapTimeFunction);
            }
            if (_options.requestAnimationFrame) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"], 'requestAnimationFrame', _wrapRAF);
            }
            if (_options.XMLHttpRequest && 'XMLHttpRequest' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"]) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(XMLHttpRequest.prototype, 'send', _wrapXHR);
            }
            const eventTargetOption = _options.eventTarget;
            if (eventTargetOption) {
                const eventTarget = Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET;
                eventTarget.forEach((target)=>_wrapEventTarget(target, _options));
            }
        }
    };
};
/**
 * Wrap timer functions and event targets to catch errors and provide better meta data.
 */ const browserApiErrorsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_browserApiErrorsIntegration);
function _wrapTimeFunction(original) {
    return function(...args) {
        const originalCallback = args[0];
        args[0] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["wrap"])(originalCallback, {
            mechanism: {
                handled: false,
                type: `auto.browser.browserapierrors.${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFunctionName"])(original)}`
            }
        });
        return original.apply(this, args);
    };
}
function _wrapRAF(original) {
    return function(callback) {
        return original.apply(this, [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["wrap"])(callback, {
                mechanism: {
                    data: {
                        handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFunctionName"])(original)
                    },
                    handled: false,
                    type: 'auto.browser.browserapierrors.requestAnimationFrame'
                }
            })
        ]);
    };
}
function _wrapXHR(originalSend) {
    return function(...args) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const xhr = this;
        const xmlHttpRequestProps = [
            'onload',
            'onerror',
            'onprogress',
            'onreadystatechange'
        ];
        xmlHttpRequestProps.forEach((prop)=>{
            if (prop in xhr && typeof xhr[prop] === 'function') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(xhr, prop, function(original) {
                    const wrapOptions = {
                        mechanism: {
                            data: {
                                handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFunctionName"])(original)
                            },
                            handled: false,
                            type: `auto.browser.browserapierrors.xhr.${prop}`
                        }
                    };
                    // If Instrument integration has been called before BrowserApiErrors, get the name of original function
                    const originalFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getOriginalFunction"])(original);
                    if (originalFunction) {
                        wrapOptions.mechanism.data.handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFunctionName"])(originalFunction);
                    }
                    // Otherwise wrap directly
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["wrap"])(original, wrapOptions);
                });
            }
        });
        return originalSend.apply(this, args);
    };
}
function _wrapEventTarget(target, integrationOptions) {
    const globalObject = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"];
    const proto = globalObject[target]?.prototype;
    // eslint-disable-next-line no-prototype-builtins
    if (!proto?.hasOwnProperty?.('addEventListener')) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(proto, 'addEventListener', function(original) {
        return function(eventName, fn, options) {
            try {
                if (isEventListenerObject(fn)) {
                    // ESlint disable explanation:
                    //  First, it is generally safe to call `wrap` with an unbound function. Furthermore, using `.bind()` would
                    //  introduce a bug here, because bind returns a new function that doesn't have our
                    //  flags(like __sentry_original__) attached. `wrap` checks for those flags to avoid unnecessary wrapping.
                    //  Without those flags, every call to addEventListener wraps the function again, causing a memory leak.
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    fn.handleEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["wrap"])(fn.handleEvent, {
                        mechanism: {
                            data: {
                                handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFunctionName"])(fn),
                                target
                            },
                            handled: false,
                            type: 'auto.browser.browserapierrors.handleEvent'
                        }
                    });
                }
            } catch  {
            // can sometimes get 'Permission denied to access property "handle Event'
            }
            if (integrationOptions.unregisterOriginalCallbacks) {
                unregisterOriginalCallback(this, eventName, fn);
            }
            return original.apply(this, [
                eventName,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["wrap"])(fn, {
                    mechanism: {
                        data: {
                            handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFunctionName"])(fn),
                            target
                        },
                        handled: false,
                        type: 'auto.browser.browserapierrors.addEventListener'
                    }
                }),
                options
            ]);
        };
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(proto, 'removeEventListener', function(originalRemoveEventListener) {
        return function(eventName, fn, options) {
            /**
       * There are 2 possible scenarios here:
       *
       * 1. Someone passes a callback, which was attached prior to Sentry initialization, or by using unmodified
       * method, eg. `document.addEventListener.call(el, name, handler). In this case, we treat this function
       * as a pass-through, and call original `removeEventListener` with it.
       *
       * 2. Someone passes a callback, which was attached after Sentry was initialized, which means that it was using
       * our wrapped version of `addEventListener`, which internally calls `wrap` helper.
       * This helper "wraps" whole callback inside a try/catch statement, and attached appropriate metadata to it,
       * in order for us to make a distinction between wrapped/non-wrapped functions possible.
       * If a function was wrapped, it has additional property of `__sentry_wrapped__`, holding the handler.
       *
       * When someone adds a handler prior to initialization, and then do it again, but after,
       * then we have to detach both of them. Otherwise, if we'd detach only wrapped one, it'd be impossible
       * to get rid of the initial handler and it'd stick there forever.
       */ try {
                const originalEventHandler = fn.__sentry_wrapped__;
                if (originalEventHandler) {
                    originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
                }
            } catch  {
            // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
            }
            return originalRemoveEventListener.call(this, eventName, fn, options);
        };
    });
}
function isEventListenerObject(obj) {
    return typeof obj.handleEvent === 'function';
}
function unregisterOriginalCallback(target, eventName, fn) {
    if (target && typeof target === 'object' && 'removeEventListener' in target && typeof target.removeEventListener === 'function') {
        target.removeEventListener(eventName, fn);
    }
}
;
 //# sourceMappingURL=browserapierrors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browsersession.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "browserSessionIntegration",
    ()=>browserSessionIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
;
;
/**
 * When added, automatically creates sessions which allow you to track adoption and crashes (crash free rate) in your Releases in Sentry.
 * More information: https://docs.sentry.io/product/releases/health/
 *
 * Note: In order for session tracking to work, you need to set up Releases: https://docs.sentry.io/product/releases/
 */ const browserSessionIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])((options = {})=>{
    const lifecycle = options.lifecycle ?? 'route';
    return {
        name: 'BrowserSession',
        setupOnce () {
            if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document === 'undefined') {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('Using the `browserSessionIntegration` in non-browser environments is not supported.');
                return;
            }
            // The session duration for browser sessions does not track a meaningful
            // concept that can be used as a metric.
            // Automatically captured sessions are akin to page views, and thus we
            // discard their duration.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startSession"])({
                ignoreDuration: true
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureSession"])();
            if (lifecycle === 'route') {
                // We want to create a session for every navigation as well
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addHistoryInstrumentationHandler"])(({ from, to })=>{
                    // Don't create an additional session for the initial route or if the location did not change
                    if (from !== undefined && from !== to) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startSession"])({
                            ignoreDuration: true
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureSession"])();
                    }
                });
            }
        }
    };
});
;
 //# sourceMappingURL=browsersession.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/culturecontext.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cultureContextIntegration",
    ()=>cultureContextIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
const INTEGRATION_NAME = 'CultureContext';
const _cultureContextIntegration = ()=>{
    return {
        name: INTEGRATION_NAME,
        preprocessEvent (event) {
            const culture = getCultureContext();
            if (culture) {
                event.contexts = {
                    ...event.contexts,
                    culture: {
                        ...culture,
                        ...event.contexts?.culture
                    }
                };
            }
        }
    };
};
/**
 * Captures culture context from the browser.
 *
 * Enabled by default.
 *
 * @example
 * ```js
 * import * as Sentry from '@sentry/browser';
 *
 * Sentry.init({
 *   integrations: [Sentry.cultureContextIntegration()],
 * });
 * ```
 */ const cultureContextIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_cultureContextIntegration);
/**
 * Returns the culture context from the browser's Intl API.
 */ function getCultureContext() {
    try {
        const intl = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].Intl;
        if (!intl) {
            return undefined;
        }
        const options = intl.DateTimeFormat().resolvedOptions();
        return {
            locale: options.locale,
            timezone: options.timeZone,
            calendar: options.calendar
        };
    } catch  {
        // Ignore errors
        return undefined;
    }
}
;
 //# sourceMappingURL=culturecontext.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/globalhandlers.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_eventFromRejectionWithPrimitive",
    ()=>_eventFromRejectionWithPrimitive,
    "_getUnhandledRejectionError",
    ()=>_getUnhandledRejectionError,
    "globalHandlersIntegration",
    ()=>globalHandlersIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalError$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/instrument/globalError.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalUnhandledRejection$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/url.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
;
;
const INTEGRATION_NAME = 'GlobalHandlers';
const _globalHandlersIntegration = (options = {})=>{
    const _options = {
        onerror: true,
        onunhandledrejection: true,
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        setupOnce () {
            Error.stackTraceLimit = 50;
        },
        setup (client) {
            if (_options.onerror) {
                _installGlobalOnErrorHandler(client);
                globalHandlerLog('onerror');
            }
            if (_options.onunhandledrejection) {
                _installGlobalOnUnhandledRejectionHandler(client);
                globalHandlerLog('onunhandledrejection');
            }
        }
    };
};
const globalHandlersIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_globalHandlersIntegration);
function _installGlobalOnErrorHandler(client) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalError$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addGlobalErrorInstrumentationHandler"])((data)=>{
        const { stackParser, attachStacktrace } = getOptions();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shouldIgnoreOnError"])()) {
            return;
        }
        const { msg, url, line, column, error } = data;
        const event = _enhanceEventWithInitialFrame((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["eventFromUnknownInput"])(stackParser, error || msg, undefined, attachStacktrace, false), url, line, column);
        event.level = 'error';
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureEvent"])(event, {
            originalException: error,
            mechanism: {
                handled: false,
                type: 'auto.browser.global_handlers.onerror'
            }
        });
    });
}
function _installGlobalOnUnhandledRejectionHandler(client) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$globalUnhandledRejection$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addGlobalUnhandledRejectionInstrumentationHandler"])((e)=>{
        const { stackParser, attachStacktrace } = getOptions();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shouldIgnoreOnError"])()) {
            return;
        }
        const error = _getUnhandledRejectionError(e);
        const event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPrimitive"])(error) ? _eventFromRejectionWithPrimitive(error) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["eventFromUnknownInput"])(stackParser, error, undefined, attachStacktrace, true);
        event.level = 'error';
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureEvent"])(event, {
            originalException: error,
            mechanism: {
                handled: false,
                type: 'auto.browser.global_handlers.onunhandledrejection'
            }
        });
    });
}
/**
 *
 */ function _getUnhandledRejectionError(error) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPrimitive"])(error)) {
        return error;
    }
    // dig the object of the rejection out of known event types
    try {
        // PromiseRejectionEvents store the object of the rejection under 'reason'
        // see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
        if ('reason' in error) {
            return error.reason;
        }
        // something, somewhere, (likely a browser extension) effectively casts PromiseRejectionEvents
        // to CustomEvents, moving the `promise` and `reason` attributes of the PRE into
        // the CustomEvent's `detail` attribute, since they're not part of CustomEvent's spec
        // see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent and
        // https://github.com/getsentry/sentry-javascript/issues/2380
        if ('detail' in error && 'reason' in error.detail) {
            return error.detail.reason;
        }
    } catch  {} // eslint-disable-line no-empty
    return error;
}
/**
 * Create an event from a promise rejection where the `reason` is a primitive.
 *
 * @param reason: The `reason` property of the promise rejection
 * @returns An Event object with an appropriate `exception` value
 */ function _eventFromRejectionWithPrimitive(reason) {
    return {
        exception: {
            values: [
                {
                    type: 'UnhandledRejection',
                    // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
                    value: `Non-Error promise rejection captured with value: ${String(reason)}`
                }
            ]
        }
    };
}
function _enhanceEventWithInitialFrame(event, url, line, column) {
    // event.exception
    const e = event.exception = event.exception || {};
    // event.exception.values
    const ev = e.values = e.values || [];
    // event.exception.values[0]
    const ev0 = ev[0] = ev[0] || {};
    // event.exception.values[0].stacktrace
    const ev0s = ev0.stacktrace = ev0.stacktrace || {};
    // event.exception.values[0].stacktrace.frames
    const ev0sf = ev0s.frames = ev0s.frames || [];
    const colno = column;
    const lineno = line;
    const filename = getFilenameFromUrl(url) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLocationHref"])();
    // event.exception.values[0].stacktrace.frames
    if (ev0sf.length === 0) {
        ev0sf.push({
            colno,
            filename,
            function: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"],
            in_app: true,
            lineno
        });
    }
    return event;
}
function globalHandlerLog(type) {
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`Global Handler attached: ${type}`);
}
function getOptions() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    const options = client?.getOptions() || {
        stackParser: ()=>[],
        attachStacktrace: false
    };
    return options;
}
function getFilenameFromUrl(url) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isString"])(url) || url.length === 0) {
        return undefined;
    }
    // Strip data URL content to avoid long base64 strings in stack frames
    // (e.g. when initializing a Worker with a base64 encoded script)
    // Don't include data prefix for filenames as it's not useful for stack traces
    // Wrap with < > to indicate it's a placeholder
    if (url.startsWith('data:')) {
        return `<${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripDataUrlContent"])(url, false)}>`;
    }
    return url;
}
;
 //# sourceMappingURL=globalhandlers.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpcontext.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "httpContextIntegration",
    ()=>httpContextIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
/**
 * Collects information about HTTP request headers and
 * attaches them to the event.
 */ const httpContextIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'HttpContext',
        preprocessEvent (event) {
            // if none of the information we want exists, don't bother
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].navigator && !__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].location && !__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document) {
                return;
            }
            const reqData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getHttpRequestData"])();
            const headers = {
                ...reqData.headers,
                ...event.request?.headers
            };
            event.request = {
                ...reqData,
                ...event.request,
                headers
            };
        }
    };
});
;
 //# sourceMappingURL=httpcontext.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/linkederrors.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "linkedErrorsIntegration",
    ()=>linkedErrorsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$aggregate$2d$errors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/aggregate-errors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [client] (ecmascript)");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$aggregate$2d$errors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["applyAggregateErrorsToEvent"])(// This differs from the LinkedErrors integration in core by using a different exceptionFromError function
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["exceptionFromError"], options.stackParser, key, limit, event, hint);
        }
    };
};
/**
 * Aggregrate linked errors in an event.
 */ const linkedErrorsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_linkedErrorsIntegration);
;
 //# sourceMappingURL=linkederrors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/spotlight.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTEGRATION_NAME",
    ()=>INTEGRATION_NAME,
    "isSpotlightInteraction",
    ()=>isSpotlightInteraction,
    "spotlightBrowserIntegration",
    ()=>spotlightBrowserIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/getNativeImplementation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
;
;
;
const INTEGRATION_NAME = 'SpotlightBrowser';
const _spotlightIntegration = (options = {})=>{
    const sidecarUrl = options.sidecarUrl || 'http://localhost:8969/stream';
    return {
        name: INTEGRATION_NAME,
        setup: ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('Using Sidecar URL', sidecarUrl);
        },
        // We don't want to send interaction transactions/root spans created from
        // clicks within Spotlight to Sentry. Neither do we want them to be sent to
        // spotlight.
        processEvent: (event)=>isSpotlightInteraction(event) ? null : event,
        afterAllSetup: (client)=>{
            setupSidecarForwarding(client, sidecarUrl);
        }
    };
};
function setupSidecarForwarding(client, sidecarUrl) {
    const makeFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getNativeImplementation"])('fetch');
    let failCount = 0;
    client.on('beforeEnvelope', (envelope)=>{
        if (failCount > 3) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests:', failCount);
            return;
        }
        makeFetch(sidecarUrl, {
            method: 'POST',
            body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serializeEnvelope"])(envelope),
            headers: {
                'Content-Type': 'application/x-sentry-envelope'
            },
            mode: 'cors'
        }).then((res)=>{
            if (res.status >= 200 && res.status < 400) {
                // Reset failed requests counter on success
                failCount = 0;
            }
        }, (err)=>{
            failCount++;
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error("Sentry SDK can't connect to Sidecar is it running? See: https://spotlightjs.com/sidecar/npx/", err);
        });
    });
}
/**
 * Use this integration to send errors and transactions to Spotlight.
 *
 * Learn more about spotlight at https://spotlightjs.com
 */ const spotlightBrowserIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_spotlightIntegration);
/**
 * Flags if the event is a transaction created from an interaction with the spotlight UI.
 */ function isSpotlightInteraction(event) {
    return Boolean(event.type === 'transaction' && event.spans && event.contexts?.trace && event.contexts.trace.op === 'ui.action.click' && event.spans.some(({ description })=>description?.includes('#sentry-spotlight')));
}
;
 //# sourceMappingURL=spotlight.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/stack-parsers.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chromeStackLineParser",
    ()=>chromeStackLineParser,
    "defaultStackLineParsers",
    ()=>defaultStackLineParsers,
    "defaultStackParser",
    ()=>defaultStackParser,
    "geckoStackLineParser",
    ()=>geckoStackLineParser,
    "opera10StackLineParser",
    ()=>opera10StackLineParser,
    "opera11StackLineParser",
    ()=>opera11StackLineParser,
    "winjsStackLineParser",
    ()=>winjsStackLineParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [client] (ecmascript)");
;
const OPERA10_PRIORITY = 10;
const OPERA11_PRIORITY = 20;
const CHROME_PRIORITY = 30;
const WINJS_PRIORITY = 40;
const GECKO_PRIORITY = 50;
function createFrame(filename, func, lineno, colno) {
    const frame = {
        filename,
        function: func === '<anonymous>' ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"] : func,
        in_app: true
    };
    if (lineno !== undefined) {
        frame.lineno = lineno;
    }
    if (colno !== undefined) {
        frame.colno = colno;
    }
    return frame;
}
// This regex matches frames that have no function name (ie. are at the top level of a module).
// For example "at http://localhost:5000//script.js:1:126"
// Frames _with_ function names usually look as follows: "at commitLayoutEffects (react-dom.development.js:23426:1)"
const chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
// This regex matches all the frames that have a function name.
const chromeRegex = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
// Matches stack frames with data URIs instead of filename so we can still get the function name
// Example: "at dynamicFn (data:application/javascript,export function dynamicFn() {..."
const chromeDataUriRegex = /at (.+?) ?\(data:(.+?),/;
// Chromium based browsers: Chrome, Brave, new Opera, new Edge
// We cannot call this variable `chrome` because it can conflict with global `chrome` variable in certain environments
// See: https://github.com/getsentry/sentry-javascript/issues/6880
const chromeStackParserFn = (line)=>{
    const dataUriMatch = line.match(chromeDataUriRegex);
    if (dataUriMatch) {
        return {
            filename: `<data:${dataUriMatch[2]}>`,
            function: dataUriMatch[1]
        };
    }
    // If the stack line has no function name, we need to parse it differently
    const noFnParts = chromeRegexNoFnName.exec(line);
    if (noFnParts) {
        const [, filename, line, col] = noFnParts;
        return createFrame(filename, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], +line, +col);
    }
    const parts = chromeRegex.exec(line);
    if (parts) {
        const isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
        if (isEval) {
            const subMatch = chromeEvalRegex.exec(parts[2]);
            if (subMatch) {
                // throw out eval line/column and use top-most line/column number
                parts[2] = subMatch[1]; // url
                parts[3] = subMatch[2]; // line
                parts[4] = subMatch[3]; // column
            }
        }
        // Kamil: One more hack won't hurt us right? Understanding and adding more rules on top of these regexps right now
        // would be way too time consuming. (TODO: Rewrite whole RegExp to be more readable)
        const [func, filename] = extractSafariExtensionDetails(parts[1] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], parts[2]);
        return createFrame(filename, func, parts[3] ? +parts[3] : undefined, parts[4] ? +parts[4] : undefined);
    }
    return;
};
const chromeStackLineParser = [
    CHROME_PRIORITY,
    chromeStackParserFn
];
// gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
// generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
// We need this specific case for now because we want no other regex to match.
const geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
const gecko = (line)=>{
    const parts = geckoREgex.exec(line);
    if (parts) {
        const isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
        if (isEval) {
            const subMatch = geckoEvalRegex.exec(parts[3]);
            if (subMatch) {
                // throw out eval line/column and use top-most line number
                parts[1] = parts[1] || 'eval';
                parts[3] = subMatch[1];
                parts[4] = subMatch[2];
                parts[5] = ''; // no column when eval
            }
        }
        let filename = parts[3];
        let func = parts[1] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"];
        [func, filename] = extractSafariExtensionDetails(func, filename);
        return createFrame(filename, func, parts[4] ? +parts[4] : undefined, parts[5] ? +parts[5] : undefined);
    }
    return;
};
const geckoStackLineParser = [
    GECKO_PRIORITY,
    gecko
];
const winjsRegex = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
const winjs = (line)=>{
    const parts = winjsRegex.exec(line);
    return parts ? createFrame(parts[2], parts[1] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], +parts[3], parts[4] ? +parts[4] : undefined) : undefined;
};
const winjsStackLineParser = [
    WINJS_PRIORITY,
    winjs
];
const opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
const opera10 = (line)=>{
    const parts = opera10Regex.exec(line);
    return parts ? createFrame(parts[2], parts[3] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], +parts[1]) : undefined;
};
const opera10StackLineParser = [
    OPERA10_PRIORITY,
    opera10
];
const opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i;
const opera11 = (line)=>{
    const parts = opera11Regex.exec(line);
    return parts ? createFrame(parts[5], parts[3] || parts[4] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"], +parts[1], +parts[2]) : undefined;
};
const opera11StackLineParser = [
    OPERA11_PRIORITY,
    opera11
];
const defaultStackLineParsers = [
    chromeStackLineParser,
    geckoStackLineParser
];
const defaultStackParser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createStackParser"])(...defaultStackLineParsers);
/**
 * Safari web extensions, starting version unknown, can produce "frames-only" stacktraces.
 * What it means, is that instead of format like:
 *
 * Error: wat
 *   at function@url:row:col
 *   at function@url:row:col
 *   at function@url:row:col
 *
 * it produces something like:
 *
 *   function@url:row:col
 *   function@url:row:col
 *   function@url:row:col
 *
 * Because of that, it won't be captured by `chrome` RegExp and will fall into `Gecko` branch.
 * This function is extracted so that we can use it in both places without duplicating the logic.
 * Unfortunately "just" changing RegExp is too complicated now and making it pass all tests
 * and fix this case seems like an impossible, or at least way too time-consuming task.
 */ const extractSafariExtensionDetails = (func, filename)=>{
    const isSafariExtension = func.indexOf('safari-extension') !== -1;
    const isSafariWebExtension = func.indexOf('safari-web-extension') !== -1;
    return isSafariExtension || isSafariWebExtension ? [
        func.indexOf('@') !== -1 ? func.split('@')[0] : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UNKNOWN_FUNCTION"],
        isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`
    ] : [
        func,
        filename
    ];
};
;
 //# sourceMappingURL=stack-parsers.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/transports/fetch.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeFetchTransport",
    ()=>makeFetchTransport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$base$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/transports/base.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$promisebuffer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/promisebuffer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/getNativeImplementation.js [client] (ecmascript)");
;
;
const DEFAULT_BROWSER_TRANSPORT_BUFFER_SIZE = 40;
/**
 * Creates a Transport that uses the Fetch API to send events to Sentry.
 */ function makeFetchTransport(options, nativeFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getNativeImplementation"])('fetch')) {
    let pendingBodySize = 0;
    let pendingCount = 0;
    async function makeRequest(request) {
        const requestSize = request.body.length;
        pendingBodySize += requestSize;
        pendingCount++;
        const requestOptions = {
            body: request.body,
            method: 'POST',
            referrerPolicy: 'strict-origin',
            headers: options.headers,
            // Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
            // fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
            // The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
            // frequently sending events right before the user is switching pages (eg. when finishing navigation transactions).
            // Gotchas:
            // - `keepalive` isn't supported by Firefox
            // - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch):
            //   If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error.
            //   We will therefore only activate the flag when we're below that limit.
            // There is also a limit of requests that can be open at the same time, so we also limit this to 15
            // See https://github.com/getsentry/sentry-javascript/pull/7553 for details
            keepalive: pendingBodySize <= 60000 && pendingCount < 15,
            ...options.fetchOptions
        };
        try {
            // Note: We do not need to suppress tracing here, because we are using the native fetch, instead of our wrapped one.
            const response = await nativeFetch(options.url, requestOptions);
            return {
                statusCode: response.status,
                headers: {
                    'x-sentry-rate-limits': response.headers.get('X-Sentry-Rate-Limits'),
                    'retry-after': response.headers.get('Retry-After')
                }
            };
        } catch (e) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$getNativeImplementation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["clearCachedImplementation"])('fetch');
            throw e;
        } finally{
            pendingBodySize -= requestSize;
            pendingCount--;
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$base$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createTransport"])(options, makeRequest, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$promisebuffer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["makePromiseBuffer"])(options.bufferSize || DEFAULT_BROWSER_TRANSPORT_BUFFER_SIZE));
}
;
 //# sourceMappingURL=fetch.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/utils/detectBrowserExtension.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkAndWarnIfIsEmbeddedBrowserExtension",
    ()=>checkAndWarnIfIsEmbeddedBrowserExtension
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
;
/**
 * Returns true if the SDK is running in an embedded browser extension.
 * Stand-alone browser extensions (which do not share the same data as the main browser page) are fine.
 */ function checkAndWarnIfIsEmbeddedBrowserExtension() {
    if (_isEmbeddedBrowserExtension()) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["consoleSandbox"])(()=>{
                // eslint-disable-next-line no-console
                console.error('[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/');
            });
        }
        return true;
    }
    return false;
}
function _isEmbeddedBrowserExtension() {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].window === 'undefined') {
        // No need to show the error if we're not in a browser window environment (e.g. service workers)
        return false;
    }
    const _window = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"];
    // Running the SDK in NW.js, which appears like a browser extension but isn't, is also fine
    // see: https://github.com/getsentry/sentry-javascript/issues/12668
    if (_window.nw) {
        return false;
    }
    const extensionObject = _window['chrome'] || _window['browser'];
    if (!extensionObject?.runtime?.id) {
        return false;
    }
    const href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLocationHref"])();
    const extensionProtocols = [
        'chrome-extension',
        'moz-extension',
        'ms-browser-extension',
        'safari-web-extension'
    ];
    // Running the SDK in a dedicated extension page and calling Sentry.init is fine; no risk of data leakage
    const isDedicatedExtensionPage = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"] === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].top && extensionProtocols.some((protocol)=>href.startsWith(`${protocol}://`));
    return !isDedicatedExtensionPage;
}
;
 //# sourceMappingURL=detectBrowserExtension.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/sdk.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "forceLoad",
    ()=>forceLoad,
    "getDefaultIntegrations",
    ()=>getDefaultIntegrations,
    "init",
    ()=>init,
    "onLoad",
    ()=>onLoad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/eventFilters.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$functiontostring$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/functiontostring.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$conversationId$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/conversationId.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$dedupe$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/dedupe.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/sdk.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/breadcrumbs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browserapierrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browserapierrors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browsersession$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browsersession.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$culturecontext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/culturecontext.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/globalhandlers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpcontext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpcontext.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$linkederrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/linkederrors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$spotlight$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/spotlight.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/stack-parsers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/transports/fetch.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$detectBrowserExtension$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/utils/detectBrowserExtension.js [client] (ecmascript)");
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
/** Get the default integrations for the browser SDK. */ function getDefaultIntegrations(_options) {
    /**
   * Note: Please make sure this stays in sync with Angular SDK, which re-exports
   * `getDefaultIntegrations` but with an adjusted set of integrations.
   */ return [
        // TODO(v11): Replace with `eventFiltersIntegration` once we remove the deprecated `inboundFiltersIntegration`
        // eslint-disable-next-line deprecation/deprecation
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$client$5d$__$28$ecmascript$29$__["inboundFiltersIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$functiontostring$2e$js__$5b$client$5d$__$28$ecmascript$29$__["functionToStringIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$conversationId$2e$js__$5b$client$5d$__$28$ecmascript$29$__["conversationIdIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browserapierrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserApiErrorsIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["breadcrumbsIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalHandlersIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$linkederrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["linkedErrorsIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$dedupe$2e$js__$5b$client$5d$__$28$ecmascript$29$__["dedupeIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpcontext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["httpContextIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$culturecontext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["cultureContextIntegration"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browsersession$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserSessionIntegration"])()
    ];
}
/**
 * The Sentry Browser SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * loading the web page. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 *
 * ```
 *
 * import { init } from '@sentry/browser';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { addBreadcrumb } from '@sentry/browser';
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 *
 * ```
 *
 * import * as Sentry from '@sentry/browser';
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link BrowserOptions} for documentation on configuration options.
 */ function init(options = {}) {
    const shouldDisableBecauseIsBrowserExtenstion = !options.skipBrowserExtensionCheck && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$detectBrowserExtension$2e$js__$5b$client$5d$__$28$ecmascript$29$__["checkAndWarnIfIsEmbeddedBrowserExtension"])();
    let defaultIntegrations = options.defaultIntegrations == null ? getDefaultIntegrations() : options.defaultIntegrations;
    /* rollup-include-development-only */ if (options.spotlight) {
        if (!defaultIntegrations) {
            defaultIntegrations = [];
        }
        const args = typeof options.spotlight === 'string' ? {
            sidecarUrl: options.spotlight
        } : undefined;
        defaultIntegrations.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$spotlight$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spotlightBrowserIntegration"])(args));
    }
    /* rollup-include-development-only-end */ const clientOptions = {
        ...options,
        enabled: shouldDisableBecauseIsBrowserExtenstion ? false : options.enabled,
        stackParser: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stackParserFromStackParserOptions"])(options.stackParser || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defaultStackParser"]),
        integrations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getIntegrationsToSetup"])({
            integrations: options.integrations,
            defaultIntegrations
        }),
        transport: options.transport || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["makeFetchTransport"]
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__["initAndBind"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BrowserClient"], clientOptions);
}
/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */ function forceLoad() {
// Noop
}
/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */ function onLoad(callback) {
    callback();
}
;
 //# sourceMappingURL=sdk.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/backgroundtab.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "registerBackgroundTabDetection",
    ()=>registerBackgroundTabDetection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
;
/**
 * Add a listener that cancels and finishes a transaction when the global
 * document is hidden.
 */ function registerBackgroundTabDetection() {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.addEventListener('visibilitychange', ()=>{
            const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
            if (!activeSpan) {
                return;
            }
            const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.hidden && rootSpan) {
                const cancelledStatus = 'cancelled';
                const { op, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(rootSpan);
                if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Tracing] Transaction: ${cancelledStatus} -> since tab moved to the background, op: ${op}`);
                }
                // We should not set status if it is already set, this prevent important statuses like
                // error or data loss from being overwritten on transaction.
                if (!status) {
                    rootSpan.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                        message: cancelledStatus
                    });
                }
                rootSpan.setAttribute('sentry.cancellation_reason', 'document.hidden');
                rootSpan.end();
            }
        });
    } else {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Tracing] Could not set up background tab detection due to lack of global document');
    }
}
;
 //# sourceMappingURL=backgroundtab.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/linkedTraces.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PREVIOUS_TRACE_KEY",
    ()=>PREVIOUS_TRACE_KEY,
    "PREVIOUS_TRACE_MAX_DURATION",
    ()=>PREVIOUS_TRACE_MAX_DURATION,
    "PREVIOUS_TRACE_TMP_SPAN_ATTRIBUTE",
    ()=>PREVIOUS_TRACE_TMP_SPAN_ATTRIBUTE,
    "addPreviousTraceSpanLink",
    ()=>addPreviousTraceSpanLink,
    "getPreviousTraceFromSessionStorage",
    ()=>getPreviousTraceFromSessionStorage,
    "linkTraces",
    ()=>linkTraces,
    "spanContextSampled",
    ()=>spanContextSampled,
    "storePreviousTraceInSessionStorage",
    ()=>storePreviousTraceInSessionStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
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
// 1h in seconds
const PREVIOUS_TRACE_MAX_DURATION = 3600;
// session storage key
const PREVIOUS_TRACE_KEY = 'sentry_previous_trace';
const PREVIOUS_TRACE_TMP_SPAN_ATTRIBUTE = 'sentry.previous_trace';
/**
 * Takes care of linking traces and applying the (consistent) sampling behavoiour based on the passed options
 * @param options - options for linking traces and consistent trace sampling (@see BrowserTracingOptions)
 * @param client - Sentry client
 */ function linkTraces(client, { linkPreviousTrace, consistentTraceSampling }) {
    const useSessionStorage = linkPreviousTrace === 'session-storage';
    let inMemoryPreviousTraceInfo = useSessionStorage ? getPreviousTraceFromSessionStorage() : undefined;
    client.on('spanStart', (span)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span) !== span) {
            return;
        }
        const oldPropagationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().getPropagationContext();
        inMemoryPreviousTraceInfo = addPreviousTraceSpanLink(inMemoryPreviousTraceInfo, span, oldPropagationContext);
        if (useSessionStorage) {
            storePreviousTraceInSessionStorage(inMemoryPreviousTraceInfo);
        }
    });
    let isFirstTraceOnPageload = true;
    if (consistentTraceSampling) {
        /*
    When users opt into `consistentTraceSampling`, we need to ensure that we propagate
    the previous trace's sample rate and rand to the current trace. This is necessary because otherwise, span
    metric extrapolation is inaccurate, as we'd propagate too high of a sample rate for the subsequent traces.

    So therefore, we pretend that the previous trace was the parent trace of the newly started trace. To do that,
    we mutate the propagation context of the current trace and set the sample rate and sample rand of the previous trace.
    Timing-wise, it is fine because it happens before we even sample the root span.

    @see https://github.com/getsentry/sentry-javascript/issues/15754
    */ client.on('beforeSampling', (mutableSamplingContextData)=>{
            if (!inMemoryPreviousTraceInfo) {
                return;
            }
            const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
            const currentPropagationContext = scope.getPropagationContext();
            // We do not want to force-continue the sampling decision if we continue a trace
            // that was started on the backend. Most prominently, this will happen in MPAs where
            // users hard-navigate between pages. In this case, the sampling decision of a potentially
            // started trace on the server takes precedence.
            // Why? We want to prioritize inter-trace consistency over intra-trace consistency.
            if (isFirstTraceOnPageload && currentPropagationContext.parentSpanId) {
                isFirstTraceOnPageload = false;
                return;
            }
            scope.setPropagationContext({
                ...currentPropagationContext,
                dsc: {
                    ...currentPropagationContext.dsc,
                    sample_rate: String(inMemoryPreviousTraceInfo.sampleRate),
                    sampled: String(spanContextSampled(inMemoryPreviousTraceInfo.spanContext))
                },
                sampleRand: inMemoryPreviousTraceInfo.sampleRand
            });
            mutableSamplingContextData.parentSampled = spanContextSampled(inMemoryPreviousTraceInfo.spanContext);
            mutableSamplingContextData.parentSampleRate = inMemoryPreviousTraceInfo.sampleRate;
            mutableSamplingContextData.spanAttributes = {
                ...mutableSamplingContextData.spanAttributes,
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_PREVIOUS_TRACE_SAMPLE_RATE"]]: inMemoryPreviousTraceInfo.sampleRate
            };
        });
    }
}
/**
 * Adds a previous_trace span link to the passed span if the passed
 * previousTraceInfo is still valid.
 *
 * @returns the updated previous trace info (based on the current span/trace) to
 * be used on the next call
 */ function addPreviousTraceSpanLink(previousTraceInfo, span, oldPropagationContext) {
    const spanJson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span);
    function getSampleRate() {
        try {
            return Number(oldPropagationContext.dsc?.sample_rate) ?? Number(spanJson.data?.[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE"]]);
        } catch  {
            return 0;
        }
    }
    const updatedPreviousTraceInfo = {
        spanContext: span.spanContext(),
        startTimestamp: spanJson.start_timestamp,
        sampleRate: getSampleRate(),
        sampleRand: oldPropagationContext.sampleRand
    };
    if (!previousTraceInfo) {
        return updatedPreviousTraceInfo;
    }
    const previousTraceSpanCtx = previousTraceInfo.spanContext;
    if (previousTraceSpanCtx.traceId === spanJson.trace_id) {
        // This means, we're still in the same trace so let's not update the previous trace info
        // or add a link to the current span.
        // Once we move away from the long-lived, route-based trace model, we can remove this cases
        return previousTraceInfo;
    }
    // Only add the link if the startTimeStamp of the previous trace's root span is within
    // PREVIOUS_TRACE_MAX_DURATION (1h) of the current root span's startTimestamp
    // This is done to
    // - avoid adding links to "stale" traces
    // - enable more efficient querying for previous/next traces in Sentry
    if (Date.now() / 1000 - previousTraceInfo.startTimestamp <= PREVIOUS_TRACE_MAX_DURATION) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`Adding previous_trace \`${JSON.stringify(previousTraceSpanCtx)}\` link to span \`${JSON.stringify({
                op: spanJson.op,
                ...span.spanContext()
            })}\``);
        }
        span.addLink({
            context: previousTraceSpanCtx,
            attributes: {
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_LINK_ATTRIBUTE_LINK_TYPE"]]: 'previous_trace'
            }
        });
        // TODO: Remove this once EAP can store span links. We currently only set this attribute so that we
        // can obtain the previous trace information from the EAP store. Long-term, EAP will handle
        // span links and then we should remove this again. Also throwing in a TODO(v11), to remind us
        // to check this at v11 time :)
        span.setAttribute(PREVIOUS_TRACE_TMP_SPAN_ATTRIBUTE, `${previousTraceSpanCtx.traceId}-${previousTraceSpanCtx.spanId}-${spanContextSampled(previousTraceSpanCtx) ? 1 : 0}`);
    }
    return updatedPreviousTraceInfo;
}
/**
 * Stores @param previousTraceInfo in sessionStorage.
 */ function storePreviousTraceInSessionStorage(previousTraceInfo) {
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].sessionStorage.setItem(PREVIOUS_TRACE_KEY, JSON.stringify(previousTraceInfo));
    } catch (e) {
        // Ignore potential errors (e.g. if sessionStorage is not available)
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('Could not store previous trace in sessionStorage', e);
    }
}
/**
 * Retrieves the previous trace from sessionStorage if available.
 */ function getPreviousTraceFromSessionStorage() {
    try {
        const previousTraceInfo = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].sessionStorage?.getItem(PREVIOUS_TRACE_KEY);
        // @ts-expect-error - intentionally risking JSON.parse throwing when previousTraceInfo is null to save bundle size
        return JSON.parse(previousTraceInfo);
    } catch  {
        return undefined;
    }
}
/**
 * see {@link import('@sentry/core').spanIsSampled}
 */ function spanContextSampled(ctx) {
    return ctx.traceFlags === 0x1;
}
;
 //# sourceMappingURL=linkedTraces.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/utils.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baggageHeaderHasSentryValues",
    ()=>baggageHeaderHasSentryValues,
    "createHeadersSafely",
    ()=>createHeadersSafely,
    "getFullURL",
    ()=>getFullURL,
    "isPerformanceResourceTiming",
    ()=>isPerformanceResourceTiming
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
/**
 * Checks if the baggage header has Sentry values.
 */ function baggageHeaderHasSentryValues(baggageHeader) {
    return baggageHeader.split(',').some((value)=>value.trim().startsWith('sentry-'));
}
/**
 * Gets the full URL from a given URL string.
 */ function getFullURL(url) {
    try {
        // By adding a base URL to new URL(), this will also work for relative urls
        // If `url` is a full URL, the base URL is ignored anyhow
        const parsed = new URL(url, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].location.origin);
        return parsed.href;
    } catch  {
        return undefined;
    }
}
/**
 * Checks if the entry is a PerformanceResourceTiming.
 */ function isPerformanceResourceTiming(entry) {
    return entry.entryType === 'resource' && 'initiatorType' in entry && typeof entry.nextHopProtocol === 'string' && (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest');
}
/**
 * Creates a Headers object from a record of string key-value pairs, and returns undefined if it fails.
 */ function createHeadersSafely(headers) {
    try {
        return new Headers(headers);
    } catch  {
        // noop
        return undefined;
    }
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/request.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultRequestInstrumentationOptions",
    ()=>defaultRequestInstrumentationOptions,
    "instrumentOutgoingRequests",
    ()=>instrumentOutgoingRequests,
    "shouldAttachHeaders",
    ()=>shouldAttachHeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/instrument/fetch.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/fetch.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/url.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/trace.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$traceData$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/traceData.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$instrument$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/metrics/instrument.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$resourceTiming$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/metrics/resourceTiming.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/networkUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/utils.js [client] (ecmascript)");
;
;
;
/** Options for Request Instrumentation */ const responseToSpanId = new WeakMap();
const spanIdToEndTimestamp = new Map();
const defaultRequestInstrumentationOptions = {
    traceFetch: true,
    traceXHR: true,
    enableHTTPTimings: true,
    trackFetchStreamPerformance: false
};
/** Registers span creators for xhr and fetch requests  */ function instrumentOutgoingRequests(client, _options) {
    const { traceFetch, traceXHR, trackFetchStreamPerformance, shouldCreateSpanForRequest, enableHTTPTimings, tracePropagationTargets, onRequestSpanStart, onRequestSpanEnd } = {
        ...defaultRequestInstrumentationOptions,
        ..._options
    };
    const shouldCreateSpan = typeof shouldCreateSpanForRequest === 'function' ? shouldCreateSpanForRequest : (_)=>true;
    const shouldAttachHeadersWithTargets = (url)=>shouldAttachHeaders(url, tracePropagationTargets);
    const spans = {};
    const propagateTraceparent = client.getOptions().propagateTraceparent;
    if (traceFetch) {
        // Keeping track of http requests, whose body payloads resolved later than the initial resolved request
        // e.g. streaming using server sent events (SSE)
        client.addEventProcessor((event)=>{
            if (event.type === 'transaction' && event.spans) {
                event.spans.forEach((span)=>{
                    if (span.op === 'http.client') {
                        const updatedTimestamp = spanIdToEndTimestamp.get(span.span_id);
                        if (updatedTimestamp) {
                            span.timestamp = updatedTimestamp / 1000;
                            spanIdToEndTimestamp.delete(span.span_id);
                        }
                    }
                });
            }
            return event;
        });
        if (trackFetchStreamPerformance) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addFetchEndInstrumentationHandler"])((handlerData)=>{
                if (handlerData.response) {
                    const span = responseToSpanId.get(handlerData.response);
                    if (span && handlerData.endTimestamp) {
                        spanIdToEndTimestamp.set(span, handlerData.endTimestamp);
                    }
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addFetchInstrumentationHandler"])((handlerData)=>{
            const createdSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["instrumentFetchRequest"])(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans, {
                propagateTraceparent,
                onRequestSpanEnd
            });
            if (handlerData.response && handlerData.fetchData.__span) {
                responseToSpanId.set(handlerData.response, handlerData.fetchData.__span);
            }
            // We cannot use `window.location` in the generic fetch instrumentation,
            // but we need it for reliable `server.address` attribute.
            // so we extend this in here
            if (createdSpan) {
                const fullUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFullURL"])(handlerData.fetchData.url);
                const host = fullUrl ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseUrl"])(fullUrl).host : undefined;
                createdSpan.setAttributes({
                    'http.url': fullUrl ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripDataUrlContent"])(fullUrl) : undefined,
                    'server.address': host
                });
                if (enableHTTPTimings) {
                    addHTTPTimings(createdSpan);
                }
                onRequestSpanStart?.(createdSpan, {
                    headers: handlerData.headers
                });
            }
        });
    }
    if (traceXHR) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addXhrInstrumentationHandler"])((handlerData)=>{
            const createdSpan = xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans, propagateTraceparent, onRequestSpanEnd);
            if (createdSpan) {
                if (enableHTTPTimings) {
                    addHTTPTimings(createdSpan);
                }
                onRequestSpanStart?.(createdSpan, {
                    headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createHeadersSafely"])(handlerData.xhr.__sentry_xhr_v3__?.request_headers)
                });
            }
        });
    }
}
/**
 * Creates a temporary observer to listen to the next fetch/xhr resourcing timings,
 * so that when timings hit their per-browser limit they don't need to be removed.
 *
 * @param span A span that has yet to be finished, must contain `url` on data.
 */ function addHTTPTimings(span) {
    const { url } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).data;
    if (!url || typeof url !== 'string') {
        return;
    }
    const cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$instrument$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addPerformanceInstrumentationHandler"])('resource', ({ entries })=>{
        entries.forEach((entry)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPerformanceResourceTiming"])(entry) && entry.name.endsWith(url)) {
                span.setAttributes((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$resourceTiming$2e$js__$5b$client$5d$__$28$ecmascript$29$__["resourceTimingToSpanAttributes"])(entry));
                // In the next tick, clean this handler up
                // We have to wait here because otherwise this cleans itself up before it is fully done
                setTimeout(cleanup);
            }
        });
    });
}
/**
 * A function that determines whether to attach tracing headers to a request.
 * We only export this function for testing purposes.
 */ function shouldAttachHeaders(targetUrl, tracePropagationTargets) {
    // window.location.href not being defined is an edge case in the browser but we need to handle it.
    // Potentially dangerous situations where it may not be defined: Browser Extensions, Web Workers, patching of the location obj
    const href = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLocationHref"])();
    if (!href) {
        // If there is no window.location.origin, we default to only attaching tracing headers to relative requests, i.e. ones that start with `/`
        // BIG DISCLAIMER: Users can call URLs with a double slash (fetch("//example.com/api")), this is a shorthand for "send to the same protocol",
        // so we need a to exclude those requests, because they might be cross origin.
        const isRelativeSameOriginRequest = !!targetUrl.match(/^\/(?!\/)/);
        if (!tracePropagationTargets) {
            return isRelativeSameOriginRequest;
        } else {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(targetUrl, tracePropagationTargets);
        }
    } else {
        let resolvedUrl;
        let currentOrigin;
        // URL parsing may fail, we default to not attaching trace headers in that case.
        try {
            resolvedUrl = new URL(targetUrl, href);
            currentOrigin = new URL(href).origin;
        } catch  {
            return false;
        }
        const isSameOriginRequest = resolvedUrl.origin === currentOrigin;
        if (!tracePropagationTargets) {
            return isSameOriginRequest;
        } else {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(resolvedUrl.toString(), tracePropagationTargets) || isSameOriginRequest && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(resolvedUrl.pathname, tracePropagationTargets);
        }
    }
}
/**
 * Create and track xhr request spans
 *
 * @returns Span if a span was created, otherwise void.
 */ function xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeaders, spans, propagateTraceparent, onRequestSpanEnd) {
    const xhr = handlerData.xhr;
    const sentryXhrData = xhr?.[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SENTRY_XHR_DATA_KEY"]];
    if (!xhr || xhr.__sentry_own_request__ || !sentryXhrData) {
        return undefined;
    }
    const { url, method } = sentryXhrData;
    const shouldCreateSpanResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasSpansEnabled"])() && shouldCreateSpan(url);
    // check first if the request has finished and is tracked by an existing span which should now end
    if (handlerData.endTimestamp && shouldCreateSpanResult) {
        const spanId = xhr.__sentry_xhr_span_id__;
        if (!spanId) return;
        const span = spans[spanId];
        if (span && sentryXhrData.status_code !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(span, sentryXhrData.status_code);
            span.end();
            onRequestSpanEnd?.(span, {
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createHeadersSafely"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseXhrResponseHeaders"])(xhr)),
                error: handlerData.error
            });
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete spans[spanId];
        }
        return undefined;
    }
    const fullUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFullURL"])(url);
    const parsedUrl = fullUrl ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseUrl"])(fullUrl) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseUrl"])(url);
    const urlForSpanName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripDataUrlContent"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripUrlQueryAndFragment"])(url));
    const hasParent = !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
    const span = shouldCreateSpanResult && hasParent ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startInactiveSpan"])({
        name: `${method} ${urlForSpanName}`,
        attributes: {
            url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripDataUrlContent"])(url),
            type: 'xhr',
            'http.method': method,
            'http.url': fullUrl ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripDataUrlContent"])(fullUrl) : undefined,
            'server.address': parsedUrl?.host,
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.http.browser',
            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'http.client',
            ...parsedUrl?.search && {
                'http.query': parsedUrl?.search
            },
            ...parsedUrl?.hash && {
                'http.fragment': parsedUrl?.hash
            }
        }
    }) : new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SentryNonRecordingSpan"]();
    xhr.__sentry_xhr_span_id__ = span.spanContext().spanId;
    spans[xhr.__sentry_xhr_span_id__] = span;
    if (shouldAttachHeaders(url)) {
        addTracingHeadersToXhrRequest(xhr, // If performance is disabled (TWP) or there's no active root span (pageload/navigation/interaction),
        // we do not want to use the span as base for the trace headers,
        // which means that the headers will be generated from the scope and the sampling decision is deferred
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasSpansEnabled"])() && hasParent ? span : undefined, propagateTraceparent);
    }
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (client) {
        client.emit('beforeOutgoingRequestSpan', span, handlerData);
    }
    return span;
}
function addTracingHeadersToXhrRequest(xhr, span, propagateTraceparent) {
    const { 'sentry-trace': sentryTrace, baggage, traceparent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$traceData$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getTraceData"])({
        span,
        propagateTraceparent
    });
    if (sentryTrace) {
        setHeaderOnXhr(xhr, sentryTrace, baggage, traceparent);
    }
}
function setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader, traceparentHeader) {
    const originalHeaders = xhr.__sentry_xhr_v3__?.request_headers;
    if (originalHeaders?.['sentry-trace'] || !xhr.setRequestHeader) {
        // bail if a sentry-trace header is already set
        return;
    }
    try {
        xhr.setRequestHeader('sentry-trace', sentryTraceHeader);
        if (traceparentHeader && !originalHeaders?.['traceparent']) {
            xhr.setRequestHeader('traceparent', traceparentHeader);
        }
        if (sentryBaggageHeader) {
            // only add our headers if
            // - no pre-existing baggage header exists
            // - or it is set and doesn't yet contain sentry values
            const originalBaggageHeader = originalHeaders?.['baggage'];
            if (!originalBaggageHeader || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["baggageHeaderHasSentryValues"])(originalBaggageHeader)) {
                // From MDN: "If this method is called several times with the same header, the values are merged into one single request header."
                // We can therefore simply set a baggage header without checking what was there before
                // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
                xhr.setRequestHeader('baggage', sentryBaggageHeader);
            }
        }
    } catch  {
    // Error: InvalidStateError: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED.
    }
}
;
 //# sourceMappingURL=request.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/browserTracingIntegration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BROWSER_TRACING_INTEGRATION_ID",
    ()=>BROWSER_TRACING_INTEGRATION_ID,
    "browserTracingIntegration",
    ()=>browserTracingIntegration,
    "getMetaContent",
    ()=>getMetaContent,
    "getServerTiming",
    ()=>getServerTiming,
    "startBrowserTracingNavigationSpan",
    ()=>startBrowserTracingNavigationSpan,
    "startBrowserTracingPageLoadSpan",
    ()=>startBrowserTracingPageLoadSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$idleSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/idleSpan.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/time.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/url.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$errors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/errors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/propagationContext.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/tracing.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/trace.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/instrument/history.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$inp$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/metrics/inp.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$browserMetrics$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/metrics/browserMetrics.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$elementTiming$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/metrics/elementTiming.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$backgroundtab$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/backgroundtab.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$linkedTraces$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/linkedTraces.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/request.js [client] (ecmascript)");
;
;
;
;
;
;
;
const BROWSER_TRACING_INTEGRATION_ID = 'BrowserTracing';
const DEFAULT_BROWSER_TRACING_OPTIONS = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$idleSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TRACING_DEFAULTS"],
    instrumentNavigation: true,
    instrumentPageLoad: true,
    markBackgroundSpan: true,
    enableLongTask: true,
    enableLongAnimationFrame: true,
    enableInp: true,
    enableElementTiming: true,
    ignoreResourceSpans: [],
    ignorePerformanceApiSpans: [],
    detectRedirects: true,
    linkPreviousTrace: 'in-memory',
    consistentTraceSampling: false,
    enableReportPageLoaded: false,
    _experiments: {},
    ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defaultRequestInstrumentationOptions"]
};
/**
 * The Browser Tracing integration automatically instruments browser pageload/navigation
 * actions as transactions, and captures requests, metrics and errors as spans.
 *
 * The integration can be configured with a variety of options, and can be extended to use
 * any routing library.
 *
 * We explicitly export the proper type here, as this has to be extended in some cases.
 */ const browserTracingIntegration = (options = {})=>{
    const latestRoute = {
        name: undefined,
        source: undefined
    };
    /**
   * This is just a small wrapper that makes `document` optional.
   * We want to be extra-safe and always check that this exists, to ensure weird environments do not blow up.
   */ const optionalWindowDocument = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document;
    const { enableInp, enableElementTiming, enableLongTask, enableLongAnimationFrame, _experiments: { enableInteractions, enableStandaloneClsSpans, enableStandaloneLcpSpans }, beforeStartSpan, idleTimeout, finalTimeout, childSpanTimeout, markBackgroundSpan, traceFetch, traceXHR, trackFetchStreamPerformance, shouldCreateSpanForRequest, enableHTTPTimings, ignoreResourceSpans, ignorePerformanceApiSpans, instrumentPageLoad, instrumentNavigation, detectRedirects, linkPreviousTrace, consistentTraceSampling, enableReportPageLoaded, onRequestSpanStart, onRequestSpanEnd } = {
        ...DEFAULT_BROWSER_TRACING_OPTIONS,
        ...options
    };
    let _collectWebVitals;
    let lastInteractionTimestamp;
    let _pageloadSpan;
    /** Create routing idle transaction. */ function _createRouteSpan(client, startSpanOptions, makeActive = true) {
        const isPageloadSpan = startSpanOptions.op === 'pageload';
        const initialSpanName = startSpanOptions.name;
        const finalStartSpanOptions = beforeStartSpan ? beforeStartSpan(startSpanOptions) : startSpanOptions;
        const attributes = finalStartSpanOptions.attributes || {};
        // If `finalStartSpanOptions.name` is different than `startSpanOptions.name`
        // it is because `beforeStartSpan` set a custom name. Therefore we set the source to 'custom'.
        if (initialSpanName !== finalStartSpanOptions.name) {
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]] = 'custom';
            finalStartSpanOptions.attributes = attributes;
        }
        if (!makeActive) {
            // We want to ensure this has 0s duration
            const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["dateTimestampInSeconds"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startInactiveSpan"])({
                ...finalStartSpanOptions,
                startTime: now
            }).end(now);
            return;
        }
        latestRoute.name = finalStartSpanOptions.name;
        latestRoute.source = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]];
        const idleSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$idleSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startIdleSpan"])(finalStartSpanOptions, {
            idleTimeout,
            finalTimeout,
            childSpanTimeout,
            // should wait for finish signal if it's a pageload transaction
            disableAutoFinish: isPageloadSpan,
            beforeSpanEnd: (span)=>{
                // This will generally always be defined here, because it is set in `setup()` of the integration
                // but technically, it is optional, so we guard here to be extra safe
                _collectWebVitals?.();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$browserMetrics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addPerformanceEntries"])(span, {
                    recordClsOnPageloadSpan: !enableStandaloneClsSpans,
                    recordLcpOnPageloadSpan: !enableStandaloneLcpSpans,
                    ignoreResourceSpans,
                    ignorePerformanceApiSpans
                });
                setActiveIdleSpan(client, undefined);
                // A trace should stay consistent over the entire timespan of one route - even after the pageload/navigation ended.
                // Only when another navigation happens, we want to create a new trace.
                // This way, e.g. errors that occur after the pageload span ended are still associated to the pageload trace.
                const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
                const oldPropagationContext = scope.getPropagationContext();
                scope.setPropagationContext({
                    ...oldPropagationContext,
                    traceId: idleSpan.spanContext().traceId,
                    sampled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanIsSampled"])(idleSpan),
                    dsc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromSpan"])(span)
                });
                if (isPageloadSpan) {
                    // clean up the stored pageload span on the intergration.
                    _pageloadSpan = undefined;
                }
            },
            trimIdleSpanEndTimestamp: !enableReportPageLoaded
        });
        if (isPageloadSpan && enableReportPageLoaded) {
            _pageloadSpan = idleSpan;
        }
        setActiveIdleSpan(client, idleSpan);
        function emitFinish() {
            if (optionalWindowDocument && [
                'interactive',
                'complete'
            ].includes(optionalWindowDocument.readyState)) {
                client.emit('idleSpanEnableAutoFinish', idleSpan);
            }
        }
        // Enable auto finish of the pageload span if users are not explicitly ending it
        if (isPageloadSpan && !enableReportPageLoaded && optionalWindowDocument) {
            optionalWindowDocument.addEventListener('readystatechange', ()=>{
                emitFinish();
            });
            emitFinish();
        }
    }
    return {
        name: BROWSER_TRACING_INTEGRATION_ID,
        setup (client) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$errors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["registerSpanErrorInstrumentation"])();
            _collectWebVitals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$browserMetrics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startTrackingWebVitals"])({
                recordClsStandaloneSpans: enableStandaloneClsSpans || false,
                recordLcpStandaloneSpans: enableStandaloneLcpSpans || false,
                client
            });
            if (enableInp) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$inp$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startTrackingINP"])();
            }
            if (enableElementTiming) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$elementTiming$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startTrackingElementTiming"])();
            }
            if (enableLongAnimationFrame && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].PerformanceObserver && PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes('long-animation-frame')) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$browserMetrics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startTrackingLongAnimationFrames"])();
            } else if (enableLongTask) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$browserMetrics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startTrackingLongTasks"])();
            }
            if (enableInteractions) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$browserMetrics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startTrackingInteractions"])();
            }
            if (detectRedirects && optionalWindowDocument) {
                const interactionHandler = ()=>{
                    lastInteractionTimestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timestampInSeconds"])();
                };
                addEventListener('click', interactionHandler, {
                    capture: true
                });
                addEventListener('keydown', interactionHandler, {
                    capture: true,
                    passive: true
                });
            }
            function maybeEndActiveSpan() {
                const activeSpan = getActiveIdleSpan(client);
                if (activeSpan && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(activeSpan).timestamp) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Tracing] Finishing current active span with op: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(activeSpan).op}`);
                    // If there's an open active span, we need to finish it before creating an new one.
                    activeSpan.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON"], 'cancelled');
                    activeSpan.end();
                }
            }
            client.on('startNavigationSpan', (startSpanOptions, navigationOptions)=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
                    return;
                }
                if (navigationOptions?.isRedirect) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Tracing] Detected redirect, navigation span will not be the root span, but a child span.');
                    _createRouteSpan(client, {
                        op: 'navigation.redirect',
                        ...startSpanOptions
                    }, false);
                    return;
                }
                // Reset the last interaction timestamp since we now start a new navigation.
                // Any subsequent navigation span starts could again be a redirect, so we
                // should reset our heuristic detectors.
                lastInteractionTimestamp = undefined;
                maybeEndActiveSpan();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getIsolationScope"])().setPropagationContext({
                    traceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateTraceId"])(),
                    sampleRand: Math.random(),
                    propagationSpanId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasSpansEnabled"])() ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateSpanId"])()
                });
                const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
                scope.setPropagationContext({
                    traceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateTraceId"])(),
                    sampleRand: Math.random(),
                    propagationSpanId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasSpansEnabled"])() ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateSpanId"])()
                });
                // We reset this to ensure we do not have lingering incorrect data here
                // places that call this hook may set this where appropriate - else, the URL at span sending time is used
                scope.setSDKProcessingMetadata({
                    normalizedRequest: undefined
                });
                _createRouteSpan(client, {
                    op: 'navigation',
                    ...startSpanOptions,
                    // Navigation starts a new trace and is NOT parented under any active interaction (e.g. ui.action.click)
                    parentSpan: null,
                    forceTransaction: true
                });
            });
            client.on('startPageLoadSpan', (startSpanOptions, traceOptions = {})=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
                    return;
                }
                maybeEndActiveSpan();
                const sentryTrace = traceOptions.sentryTrace || getMetaContent('sentry-trace') || getServerTiming('sentry-trace');
                const baggage = traceOptions.baggage || getMetaContent('baggage') || getServerTiming('baggage');
                const propagationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$client$5d$__$28$ecmascript$29$__["propagationContextFromHeaders"])(sentryTrace, baggage);
                const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
                scope.setPropagationContext(propagationContext);
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasSpansEnabled"])()) {
                    // for browser, we wanna keep the spanIds consistent during the entire lifetime of the trace
                    // this works by setting the propagationSpanId to a random spanId so that we have a consistent
                    // span id to propagate in TwP mode (!hasSpansEnabled())
                    scope.getPropagationContext().propagationSpanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["generateSpanId"])();
                }
                // We store the normalized request data on the scope, so we get the request data at time of span creation
                // otherwise, the URL etc. may already be of the following navigation, and we'd report the wrong URL
                scope.setSDKProcessingMetadata({
                    normalizedRequest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getHttpRequestData"])()
                });
                _createRouteSpan(client, {
                    op: 'pageload',
                    ...startSpanOptions
                });
            });
            client.on('endPageloadSpan', ()=>{
                if (enableReportPageLoaded && _pageloadSpan) {
                    _pageloadSpan.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON"], 'reportPageLoaded');
                    _pageloadSpan.end();
                }
            });
        },
        afterAllSetup (client) {
            let startingUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getLocationHref"])();
            if (linkPreviousTrace !== 'off') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$linkedTraces$2e$js__$5b$client$5d$__$28$ecmascript$29$__["linkTraces"])(client, {
                    linkPreviousTrace,
                    consistentTraceSampling
                });
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].location) {
                if (instrumentPageLoad) {
                    const origin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserPerformanceTimeOrigin"])();
                    startBrowserTracingPageLoadSpan(client, {
                        name: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].location.pathname,
                        // pageload should always start at timeOrigin (and needs to be in s, not ms)
                        startTime: origin ? origin / 1000 : undefined,
                        attributes: {
                            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: 'url',
                            [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.pageload.browser'
                        }
                    });
                }
                if (instrumentNavigation) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$history$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addHistoryInstrumentationHandler"])(({ to, from })=>{
                        /**
             * This early return is there to account for some cases where a navigation transaction starts right after
             * long-running pageload. We make sure that if `from` is undefined and a valid `startingURL` exists, we don't
             * create an uneccessary navigation transaction.
             *
             * This was hard to duplicate, but this behavior stopped as soon as this fix was applied. This issue might also
             * only be caused in certain development environments where the usage of a hot module reloader is causing
             * errors.
             */ if (from === undefined && startingUrl?.indexOf(to) !== -1) {
                            startingUrl = undefined;
                            return;
                        }
                        startingUrl = undefined;
                        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseStringToURLObject"])(to);
                        const activeSpan = getActiveIdleSpan(client);
                        const navigationIsRedirect = activeSpan && detectRedirects && isRedirect(activeSpan, lastInteractionTimestamp);
                        startBrowserTracingNavigationSpan(client, {
                            name: parsed?.pathname || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].location.pathname,
                            attributes: {
                                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: 'url',
                                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.navigation.browser'
                            }
                        }, {
                            url: to,
                            isRedirect: navigationIsRedirect
                        });
                    });
                }
            }
            if (markBackgroundSpan) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$backgroundtab$2e$js__$5b$client$5d$__$28$ecmascript$29$__["registerBackgroundTabDetection"])();
            }
            if (enableInteractions) {
                registerInteractionListener(client, idleTimeout, finalTimeout, childSpanTimeout, latestRoute);
            }
            if (enableInp) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$metrics$2f$inp$2e$js__$5b$client$5d$__$28$ecmascript$29$__["registerInpInteractionListener"])();
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$client$5d$__$28$ecmascript$29$__["instrumentOutgoingRequests"])(client, {
                traceFetch,
                traceXHR,
                trackFetchStreamPerformance,
                tracePropagationTargets: client.getOptions().tracePropagationTargets,
                shouldCreateSpanForRequest,
                enableHTTPTimings,
                onRequestSpanStart,
                onRequestSpanEnd
            });
        }
    };
};
/**
 * Manually start a page load span.
 * This will only do something if a browser tracing integration integration has been setup.
 *
 * If you provide a custom `traceOptions` object, it will be used to continue the trace
 * instead of the default behavior, which is to look it up on the <meta> tags.
 */ function startBrowserTracingPageLoadSpan(client, spanOptions, traceOptions) {
    client.emit('startPageLoadSpan', spanOptions, traceOptions);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().setTransactionName(spanOptions.name);
    const pageloadSpan = getActiveIdleSpan(client);
    if (pageloadSpan) {
        client.emit('afterStartPageLoadSpan', pageloadSpan);
    }
    return pageloadSpan;
}
/**
 * Manually start a navigation span.
 * This will only do something if a browser tracing integration has been setup.
 */ function startBrowserTracingNavigationSpan(client, spanOptions, options) {
    const { url, isRedirect } = options || {};
    client.emit('beforeStartNavigationSpan', spanOptions, {
        isRedirect
    });
    client.emit('startNavigationSpan', spanOptions, {
        isRedirect
    });
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
    scope.setTransactionName(spanOptions.name);
    // We store the normalized request data on the scope, so we get the request data at time of span creation
    // otherwise, the URL etc. may already be of the following navigation, and we'd report the wrong URL
    if (url && !isRedirect) {
        scope.setSDKProcessingMetadata({
            normalizedRequest: {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getHttpRequestData"])(),
                url
            }
        });
    }
    return getActiveIdleSpan(client);
}
/** Returns the value of a meta tag */ function getMetaContent(metaName) {
    /**
   * This is just a small wrapper that makes `document` optional.
   * We want to be extra-safe and always check that this exists, to ensure weird environments do not blow up.
   */ const optionalWindowDocument = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document;
    const metaTag = optionalWindowDocument?.querySelector(`meta[name=${metaName}]`);
    return metaTag?.getAttribute('content') || undefined;
}
/** Returns the description of a server timing entry */ function getServerTiming(name) {
    const navigation = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].performance?.getEntriesByType?.('navigation')[0];
    const entry = navigation?.serverTiming?.find((entry)=>entry.name === name);
    return entry?.description;
}
/** Start listener for interaction transactions */ function registerInteractionListener(client, idleTimeout, finalTimeout, childSpanTimeout, latestRoute) {
    /**
   * This is just a small wrapper that makes `document` optional.
   * We want to be extra-safe and always check that this exists, to ensure weird environments do not blow up.
   */ const optionalWindowDocument = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document;
    let inflightInteractionSpan;
    const registerInteractionTransaction = ()=>{
        const op = 'ui.action.click';
        const activeIdleSpan = getActiveIdleSpan(client);
        if (activeIdleSpan) {
            const currentRootSpanOp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(activeIdleSpan).op;
            if ([
                'navigation',
                'pageload'
            ].includes(currentRootSpanOp)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`[Tracing] Did not create ${op} span because a pageload or navigation span is in progress.`);
                return undefined;
            }
        }
        if (inflightInteractionSpan) {
            inflightInteractionSpan.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON"], 'interactionInterrupted');
            inflightInteractionSpan.end();
            inflightInteractionSpan = undefined;
        }
        if (!latestRoute.name) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`[Tracing] Did not create ${op} transaction because _latestRouteName is missing.`);
            return undefined;
        }
        inflightInteractionSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$idleSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startIdleSpan"])({
            name: latestRoute.name,
            op,
            attributes: {
                [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: latestRoute.source || 'url'
            }
        }, {
            idleTimeout,
            finalTimeout,
            childSpanTimeout
        });
    };
    if (optionalWindowDocument) {
        addEventListener('click', registerInteractionTransaction, {
            capture: true
        });
    }
}
// We store the active idle span on the client object, so we can access it from exported functions
const ACTIVE_IDLE_SPAN_PROPERTY = '_sentry_idleSpan';
function getActiveIdleSpan(client) {
    return client[ACTIVE_IDLE_SPAN_PROPERTY];
}
function setActiveIdleSpan(client, span) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(client, ACTIVE_IDLE_SPAN_PROPERTY, span);
}
// The max. time in seconds between two pageload/navigation spans that makes us consider the second one a redirect
const REDIRECT_THRESHOLD = 1.5;
function isRedirect(activeSpan, lastInteractionTimestamp) {
    const spanData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(activeSpan);
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["dateTimestampInSeconds"])();
    // More than REDIRECT_THRESHOLD seconds since last navigation/pageload span?
    // --> never consider this a redirect
    const startTimestamp = spanData.start_timestamp;
    if (now - startTimestamp > REDIRECT_THRESHOLD) {
        return false;
    }
    // A click happened in the last REDIRECT_THRESHOLD seconds?
    // --> never consider this a redirect
    if (lastInteractionTimestamp && now - lastInteractionTimestamp <= REDIRECT_THRESHOLD) {
        return false;
    }
    return true;
}
;
 //# sourceMappingURL=browserTracingIntegration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/index.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/utils/lazyLoadIntegration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lazyLoadIntegration",
    ()=>lazyLoadIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/version.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
// This is a map of integration function method to bundle file name.
const LazyLoadableIntegrations = {
    replayIntegration: 'replay',
    replayCanvasIntegration: 'replay-canvas',
    feedbackIntegration: 'feedback',
    feedbackModalIntegration: 'feedback-modal',
    feedbackScreenshotIntegration: 'feedback-screenshot',
    captureConsoleIntegration: 'captureconsole',
    contextLinesIntegration: 'contextlines',
    linkedErrorsIntegration: 'linkederrors',
    dedupeIntegration: 'dedupe',
    extraErrorDataIntegration: 'extraerrordata',
    graphqlClientIntegration: 'graphqlclient',
    httpClientIntegration: 'httpclient',
    reportingObserverIntegration: 'reportingobserver',
    rewriteFramesIntegration: 'rewriteframes',
    browserProfilingIntegration: 'browserprofiling',
    moduleMetadataIntegration: 'modulemetadata',
    instrumentAnthropicAiClient: 'instrumentanthropicaiclient',
    instrumentOpenAiClient: 'instrumentopenaiclient',
    instrumentGoogleGenAIClient: 'instrumentgooglegenaiclient',
    instrumentLangGraph: 'instrumentlanggraph',
    createLangChainCallbackHandler: 'createlangchaincallbackhandler'
};
const WindowWithMaybeIntegration = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"];
/**
 * Lazy load an integration from the CDN.
 * Rejects if the integration cannot be loaded.
 */ async function lazyLoadIntegration(name, scriptNonce) {
    const bundle = LazyLoadableIntegrations[name];
    // `window.Sentry` is only set when using a CDN bundle, but this method can also be used via the NPM package
    const sentryOnWindow = WindowWithMaybeIntegration.Sentry = WindowWithMaybeIntegration.Sentry || {};
    if (!bundle) {
        throw new Error(`Cannot lazy load integration: ${name}`);
    }
    // Bail if the integration already exists
    const existing = sentryOnWindow[name];
    // The `feedbackIntegration` is loaded by default in the CDN bundles,
    // so we need to differentiate between the real integration and the shim.
    // if only the shim exists, we still want to lazy load the real integration.
    if (typeof existing === 'function' && !('_isShim' in existing)) {
        return existing;
    }
    const url = getScriptURL(bundle);
    const script = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.createElement('script');
    script.src = url;
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'strict-origin';
    if (scriptNonce) {
        script.setAttribute('nonce', scriptNonce);
    }
    const waitForLoad = new Promise((resolve, reject)=>{
        script.addEventListener('load', ()=>resolve());
        script.addEventListener('error', reject);
    });
    const currentScript = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.currentScript;
    const parent = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.body || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.head || currentScript?.parentElement;
    if (parent) {
        parent.appendChild(script);
    } else {
        throw new Error(`Could not find parent element to insert lazy-loaded ${name} script`);
    }
    try {
        await waitForLoad;
    } catch  {
        throw new Error(`Error when loading integration: ${name}`);
    }
    const integrationFn = sentryOnWindow[name];
    if (typeof integrationFn !== 'function') {
        throw new Error(`Could not load integration: ${name}`);
    }
    return integrationFn;
}
function getScriptURL(bundle) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    const baseURL = client?.getOptions()?.cdnBaseUrl || 'https://browser.sentry-cdn.com';
    return new URL(`/${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SDK_VERSION"]}/${bundle}.min.js`, baseURL).toString();
}
;
 //# sourceMappingURL=lazyLoadIntegration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/feedbackAsync.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "feedbackAsyncIntegration",
    ()=>feedbackAsyncIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/feedback/build/npm/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$lazyLoadIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/utils/lazyLoadIntegration.js [client] (ecmascript)");
;
;
/**
 * An integration to add user feedback to your application,
 * while loading most of the code lazily only when it's needed.
 */ const feedbackAsyncIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["buildFeedbackIntegration"])({
    lazyLoadIntegration: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$lazyLoadIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["lazyLoadIntegration"]
});
;
 //# sourceMappingURL=feedbackAsync.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/feedbackSync.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "feedbackSyncIntegration",
    ()=>feedbackSyncIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/feedback/build/npm/esm/index.js [client] (ecmascript)");
;
/** Add a widget to capture user feedback to your application. */ const feedbackSyncIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["buildFeedbackIntegration"])({
    getModalIntegration: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["feedbackModalIntegration"],
    getScreenshotIntegration: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["feedbackScreenshotIntegration"]
});
;
 //# sourceMappingURL=feedbackSync.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uiProfiler",
    ()=>uiProfiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
;
;
/**
 * Starts the Sentry UI profiler.
 * This mode is exclusive with the transaction profiler and will only work if the profilesSampleRate is set to a falsy value.
 * In UI profiling mode, the profiler will keep reporting profile chunks to Sentry until it is stopped, which allows for continuous profiling of the application.
 */ function startProfiler() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('No Sentry client available, profiling is not started');
        return;
    }
    const integration = client.getIntegrationByName('BrowserProfiling');
    if (!integration) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('BrowserProfiling integration is not available');
        return;
    }
    client.emit('startUIProfiler');
}
/**
 * Stops the Sentry UI profiler.
 * Calls to stop will stop the profiler and flush the currently collected profile data to Sentry.
 */ function stopProfiler() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('No Sentry client available, profiling is not started');
        return;
    }
    const integration = client.getIntegrationByName('BrowserProfiling');
    if (!integration) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('ProfilingIntegration is not available');
        return;
    }
    client.emit('stopUIProfiler');
}
/**
 * Profiler namespace for controlling the JS profiler in 'manual' mode.
 *
 * Requires the `browserProfilingIntegration` from the `@sentry/browser` package.
 */ const uiProfiler = {
    startProfiler,
    stopProfiler
};
;
 //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/userfeedback.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUserFeedbackEnvelope",
    ()=>createUserFeedbackEnvelope
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/dsn.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [client] (ecmascript)");
;
/**
 * Creates an envelope from a user feedback.
 */ function createUserFeedbackEnvelope(feedback, { metadata, tunnel, dsn }) {
    const headers = {
        event_id: feedback.event_id,
        sent_at: new Date().toISOString(),
        ...metadata?.sdk && {
            sdk: {
                name: metadata.sdk.name,
                version: metadata.sdk.version
            }
        },
        ...!!tunnel && !!dsn && {
            dsn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$client$5d$__$28$ecmascript$29$__["dsnToString"])(dsn)
        }
    };
    const item = createUserFeedbackEnvelopeItem(feedback);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createEnvelope"])(headers, [
        item
    ]);
}
function createUserFeedbackEnvelopeItem(feedback) {
    const feedbackHeaders = {
        type: 'user_report'
    };
    return [
        feedbackHeaders,
        feedback
    ];
}
;
 //# sourceMappingURL=userfeedback.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/report-dialog.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "showReportDialog",
    ()=>showReportDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/api.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
;
/**
 * Present the user with a report dialog.
 *
 * @param options Everything is optional, we try to fetch all info need from the current scope.
 */ function showReportDialog(options = {}) {
    const optionalDocument = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document;
    const injectionPoint = optionalDocument?.head || optionalDocument?.body;
    // doesn't work without a document (React Native)
    if (!injectionPoint) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('[showReportDialog] Global document not defined');
        return;
    }
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    const dsn = client?.getDsn();
    if (!dsn) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('[showReportDialog] DSN not configured');
        return;
    }
    const mergedOptions = {
        ...options,
        user: {
            ...scope.getUser(),
            ...options.user
        },
        eventId: options.eventId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["lastEventId"])()
    };
    const script = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getReportDialogEndpoint"])(dsn, mergedOptions);
    const { onLoad, onClose } = mergedOptions;
    if (onLoad) {
        script.onload = onLoad;
    }
    if (onClose) {
        const reportDialogClosedMessageHandler = (event)=>{
            if (event.data === '__sentry_reportdialog_closed__') {
                try {
                    onClose();
                } finally{
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].removeEventListener('message', reportDialogClosedMessageHandler);
                }
            }
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].addEventListener('message', reportDialogClosedMessageHandler);
    }
    injectionPoint.appendChild(script);
}
;
 //# sourceMappingURL=report-dialog.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/reportingobserver.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reportingObserverIntegration",
    ()=>reportingObserverIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$supports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/supports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
;
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
const INTEGRATION_NAME = 'ReportingObserver';
const SETUP_CLIENTS = new WeakMap();
const _reportingObserverIntegration = (options = {})=>{
    const types = options.types || [
        'crash',
        'deprecation',
        'intervention'
    ];
    /** Handler for the reporting observer. */ function handler(reports) {
        if (!SETUP_CLIENTS.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])())) {
            return;
        }
        for (const report of reports){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
                scope.setExtra('url', report.url);
                const label = `ReportingObserver [${report.type}]`;
                let details = 'No details available';
                if (report.body) {
                    // Object.keys doesn't work on ReportBody, as all properties are inherited
                    const plainBody = {};
                    // eslint-disable-next-line guard-for-in
                    for(const prop in report.body){
                        plainBody[prop] = report.body[prop];
                    }
                    scope.setExtra('body', plainBody);
                    if (report.type === 'crash') {
                        const body = report.body;
                        // A fancy way to create a message out of crashId OR reason OR both OR fallback
                        details = [
                            body.crashId || '',
                            body.reason || ''
                        ].join(' ').trim() || details;
                    } else {
                        const body = report.body;
                        details = body.message || details;
                    }
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureMessage"])(`${label}: ${details}`);
            });
        }
    }
    return {
        name: INTEGRATION_NAME,
        setupOnce () {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$supports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supportsReportingObserver"])()) {
                return;
            }
            const observer = new WINDOW.ReportingObserver(handler, {
                buffered: true,
                types
            });
            observer.observe();
        },
        setup (client) {
            SETUP_CLIENTS.set(client, true);
        }
    };
};
/**
 * Reporting API integration - https://w3c.github.io/reporting/
 */ const reportingObserverIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_reportingObserverIntegration);
;
 //# sourceMappingURL=reportingobserver.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpclient.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "httpClientIntegration",
    ()=>httpClientIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$supports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/supports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/instrument/fetch.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$isSentryRequestUrl$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/isSentryRequestUrl.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
;
;
;
const INTEGRATION_NAME = 'HttpClient';
const _httpClientIntegration = (options = {})=>{
    const _options = {
        failedRequestStatusCodes: [
            [
                500,
                599
            ]
        ],
        failedRequestTargets: [
            /.*/
        ],
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            _wrapFetch(client, _options);
            _wrapXHR(client, _options);
        }
    };
};
/**
 * Create events for failed client side HTTP requests.
 */ const httpClientIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_httpClientIntegration);
/**
 * Interceptor function for fetch requests
 *
 * @param requestInfo The Fetch API request info
 * @param response The Fetch API response
 * @param requestInit The request init object
 */ function _fetchResponseHandler(options, requestInfo, response, requestInit, error) {
    if (_shouldCaptureResponse(options, response.status, response.url)) {
        const request = _getRequest(requestInfo, requestInit);
        let requestHeaders, responseHeaders, requestCookies, responseCookies;
        if (_shouldSendDefaultPii()) {
            [requestHeaders, requestCookies] = _parseCookieHeaders('Cookie', request);
            [responseHeaders, responseCookies] = _parseCookieHeaders('Set-Cookie', response);
        }
        const event = _createEvent({
            url: request.url,
            method: request.method,
            status: response.status,
            requestHeaders,
            responseHeaders,
            requestCookies,
            responseCookies,
            error,
            type: 'fetch'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureEvent"])(event);
    }
}
function _parseCookieHeaders(cookieHeader, obj) {
    const headers = _extractFetchHeaders(obj.headers);
    let cookies;
    try {
        const cookieString = headers[cookieHeader] || headers[cookieHeader.toLowerCase()] || undefined;
        if (cookieString) {
            cookies = _parseCookieString(cookieString);
        }
    } catch  {
    // ignore it if parsing fails
    }
    return [
        headers,
        cookies
    ];
}
/**
 * Interceptor function for XHR requests
 *
 * @param xhr The XHR request
 * @param method The HTTP method
 * @param headers The HTTP headers
 */ function _xhrResponseHandler(options, xhr, method, headers, error) {
    if (_shouldCaptureResponse(options, xhr.status, xhr.responseURL)) {
        let requestHeaders, responseCookies, responseHeaders;
        if (_shouldSendDefaultPii()) {
            try {
                const cookieString = xhr.getResponseHeader('Set-Cookie') || xhr.getResponseHeader('set-cookie') || undefined;
                if (cookieString) {
                    responseCookies = _parseCookieString(cookieString);
                }
            } catch  {
            // ignore it if parsing fails
            }
            try {
                responseHeaders = _getXHRResponseHeaders(xhr);
            } catch  {
            // ignore it if parsing fails
            }
            requestHeaders = headers;
        }
        const event = _createEvent({
            url: xhr.responseURL,
            method,
            status: xhr.status,
            requestHeaders,
            // Can't access request cookies from XHR
            responseHeaders,
            responseCookies,
            error,
            type: 'xhr'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureEvent"])(event);
    }
}
/**
 * Extracts response size from `Content-Length` header when possible
 *
 * @param headers
 * @returns The response size in bytes or undefined
 */ function _getResponseSizeFromHeaders(headers) {
    if (headers) {
        const contentLength = headers['Content-Length'] || headers['content-length'];
        if (contentLength) {
            return parseInt(contentLength, 10);
        }
    }
    return undefined;
}
/**
 * Creates an object containing cookies from the given cookie string
 *
 * @param cookieString The cookie string to parse
 * @returns The parsed cookies
 */ function _parseCookieString(cookieString) {
    return cookieString.split('; ').reduce((acc, cookie)=>{
        const [key, value] = cookie.split('=');
        if (key && value) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
/**
 * Extracts the headers as an object from the given Fetch API request or response object
 *
 * @param headers The headers to extract
 * @returns The extracted headers as an object
 */ function _extractFetchHeaders(headers) {
    const result = {};
    headers.forEach((value, key)=>{
        result[key] = value;
    });
    return result;
}
/**
 * Extracts the response headers as an object from the given XHR object
 *
 * @param xhr The XHR object to extract the response headers from
 * @returns The response headers as an object
 */ function _getXHRResponseHeaders(xhr) {
    const headers = xhr.getAllResponseHeaders();
    if (!headers) {
        return {};
    }
    return headers.split('\r\n').reduce((acc, line)=>{
        const [key, value] = line.split(': ');
        if (key && value) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
/**
 * Checks if the given target url is in the given list of targets
 *
 * @param target The target url to check
 * @returns true if the target url is in the given list of targets, false otherwise
 */ function _isInGivenRequestTargets(failedRequestTargets, target) {
    return failedRequestTargets.some((givenRequestTarget)=>{
        if (typeof givenRequestTarget === 'string') {
            return target.includes(givenRequestTarget);
        }
        return givenRequestTarget.test(target);
    });
}
/**
 * Checks if the given status code is in the given range
 *
 * @param status The status code to check
 * @returns true if the status code is in the given range, false otherwise
 */ function _isInGivenStatusRanges(failedRequestStatusCodes, status) {
    return failedRequestStatusCodes.some((range)=>{
        if (typeof range === 'number') {
            return range === status;
        }
        return status >= range[0] && status <= range[1];
    });
}
/**
 * Wraps `fetch` function to capture request and response data
 */ function _wrapFetch(client, options) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$supports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supportsNativeFetch"])()) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addFetchInstrumentationHandler"])((handlerData)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const { response, args, error, virtualError } = handlerData;
        const [requestInfo, requestInit] = args;
        if (!response) {
            return;
        }
        _fetchResponseHandler(options, requestInfo, response, requestInit, error || virtualError);
    }, false);
}
/**
 * Wraps XMLHttpRequest to capture request and response data
 */ function _wrapXHR(client, options) {
    if (!('XMLHttpRequest' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"])) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addXhrInstrumentationHandler"])((handlerData)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const { error, virtualError } = handlerData;
        const xhr = handlerData.xhr;
        const sentryXhrData = xhr[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SENTRY_XHR_DATA_KEY"]];
        if (!sentryXhrData) {
            return;
        }
        const { method, request_headers: headers } = sentryXhrData;
        try {
            _xhrResponseHandler(options, xhr, method, headers, error || virtualError);
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('Error while extracting response event form XHR response', e);
        }
    });
}
/**
 * Checks whether to capture given response as an event
 *
 * @param status response status code
 * @param url response url
 */ function _shouldCaptureResponse(options, status, url) {
    return _isInGivenStatusRanges(options.failedRequestStatusCodes, status) && _isInGivenRequestTargets(options.failedRequestTargets, url) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$isSentryRequestUrl$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isSentryRequestUrl"])(url, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])());
}
/**
 * Creates a synthetic Sentry event from given response data
 *
 * @param data response data
 * @returns event
 */ function _createEvent(data) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    const virtualStackTrace = client && data.error && data.error instanceof Error ? data.error.stack : undefined;
    // Remove the first frame from the stack as it's the HttpClient call
    const stack = virtualStackTrace && client ? client.getOptions().stackParser(virtualStackTrace, 0, 1) : undefined;
    const message = `HTTP Client Error with status code: ${data.status}`;
    const event = {
        message,
        exception: {
            values: [
                {
                    type: 'Error',
                    value: message,
                    stacktrace: stack ? {
                        frames: stack
                    } : undefined
                }
            ]
        },
        request: {
            url: data.url,
            method: data.method,
            headers: data.requestHeaders,
            cookies: data.requestCookies
        },
        contexts: {
            response: {
                status_code: data.status,
                headers: data.responseHeaders,
                cookies: data.responseCookies,
                body_size: _getResponseSizeFromHeaders(data.responseHeaders)
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
        type: `auto.http.client.${data.type}`,
        handled: false
    });
    return event;
}
function _getRequest(requestInfo, requestInit) {
    if (!requestInit && requestInfo instanceof Request) {
        return requestInfo;
    }
    // If both are set, we try to construct a new Request with the given arguments
    // However, if e.g. the original request has a `body`, this will throw an error because it was already accessed
    // In this case, as a fallback, we just use the original request - using both is rather an edge case
    if (requestInfo instanceof Request && requestInfo.bodyUsed) {
        return requestInfo;
    }
    return new Request(requestInfo, requestInit);
}
function _shouldSendDefaultPii() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    return client ? Boolean(client.getOptions().sendDefaultPii) : false;
}
;
 //# sourceMappingURL=httpclient.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/contextlines.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applySourceContextToFrame",
    ()=>applySourceContextToFrame,
    "contextLinesIntegration",
    ()=>contextLinesIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/url.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
;
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
const DEFAULT_LINES_OF_CONTEXT = 7;
const INTEGRATION_NAME = 'ContextLines';
const _contextLinesIntegration = (options = {})=>{
    const contextLines = options.frameContextLines != null ? options.frameContextLines : DEFAULT_LINES_OF_CONTEXT;
    return {
        name: INTEGRATION_NAME,
        processEvent (event) {
            return addSourceContext(event, contextLines);
        }
    };
};
/**
 * Collects source context lines around the lines of stackframes pointing to JS embedded in
 * the current page's HTML.
 *
 * This integration DOES NOT work for stack frames pointing to JS files that are loaded by the browser.
 * For frames pointing to files, context lines are added during ingestion and symbolication
 * by attempting to download the JS files to the Sentry backend.
 *
 * Use this integration if you have inline JS code in HTML pages that can't be accessed
 * by our backend (e.g. due to a login-protected page).
 */ const contextLinesIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_contextLinesIntegration);
/**
 * Processes an event and adds context lines.
 */ function addSourceContext(event, contextLines) {
    const doc = WINDOW.document;
    const htmlFilename = WINDOW.location && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stripUrlQueryAndFragment"])(WINDOW.location.href);
    if (!doc || !htmlFilename) {
        return event;
    }
    const exceptions = event.exception?.values;
    if (!exceptions?.length) {
        return event;
    }
    const html = doc.documentElement.innerHTML;
    if (!html) {
        return event;
    }
    const htmlLines = [
        '<!DOCTYPE html>',
        '<html>',
        ...html.split('\n'),
        '</html>'
    ];
    exceptions.forEach((exception)=>{
        const stacktrace = exception.stacktrace;
        if (stacktrace?.frames) {
            stacktrace.frames = stacktrace.frames.map((frame)=>applySourceContextToFrame(frame, htmlLines, htmlFilename, contextLines));
        }
    });
    return event;
}
/**
 * Only exported for testing
 */ function applySourceContextToFrame(frame, htmlLines, htmlFilename, linesOfContext) {
    if (frame.filename !== htmlFilename || !frame.lineno || !htmlLines.length) {
        return frame;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addContextToFrame"])(htmlLines, frame, linesOfContext);
    return frame;
}
;
 //# sourceMappingURL=contextlines.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/graphqlClient.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_getGraphQLOperation",
    ()=>_getGraphQLOperation,
    "getGraphQLRequestPayload",
    ()=>getGraphQLRequestPayload,
    "getRequestPayloadXhrOrFetch",
    ()=>getRequestPayloadXhrOrFetch,
    "graphqlClientIntegration",
    ()=>graphqlClientIntegration,
    "parseGraphQLQuery",
    ()=>parseGraphQLQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/browser-utils/build/esm/networkUtils.js [client] (ecmascript)");
;
;
const INTEGRATION_NAME = 'GraphQLClient';
const _graphqlClientIntegration = (options)=>{
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            _updateSpanWithGraphQLData(client, options);
            _updateBreadcrumbWithGraphQLData(client, options);
        }
    };
};
function _updateSpanWithGraphQLData(client, options) {
    client.on('beforeOutgoingRequestSpan', (span, hint)=>{
        const spanJSON = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span);
        const spanAttributes = spanJSON.data || {};
        const spanOp = spanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]];
        const isHttpClientSpan = spanOp === 'http.client';
        if (!isHttpClientSpan) {
            return;
        }
        const httpUrl = spanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_URL_FULL"]] || spanAttributes['http.url'];
        const httpMethod = spanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD"]] || spanAttributes['http.method'];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isString"])(httpUrl) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isString"])(httpMethod)) {
            return;
        }
        const { endpoints } = options;
        const isTracedGraphqlEndpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(httpUrl, endpoints);
        const payload = getRequestPayloadXhrOrFetch(hint);
        if (isTracedGraphqlEndpoint && payload) {
            const graphqlBody = getGraphQLRequestPayload(payload);
            if (graphqlBody) {
                const operationInfo = _getGraphQLOperation(graphqlBody);
                span.updateName(`${httpMethod} ${httpUrl} (${operationInfo})`);
                // Handle standard requests - always capture the query document
                if (isStandardRequest(graphqlBody)) {
                    span.setAttribute('graphql.document', graphqlBody.query);
                }
                // Handle persisted operations - capture hash for debugging
                if (isPersistedRequest(graphqlBody)) {
                    span.setAttribute('graphql.persisted_query.hash.sha256', graphqlBody.extensions.persistedQuery.sha256Hash);
                    span.setAttribute('graphql.persisted_query.version', graphqlBody.extensions.persistedQuery.version);
                }
            }
        }
    });
}
function _updateBreadcrumbWithGraphQLData(client, options) {
    client.on('beforeOutgoingRequestBreadcrumb', (breadcrumb, handlerData)=>{
        const { category, type, data } = breadcrumb;
        const isFetch = category === 'fetch';
        const isXhr = category === 'xhr';
        const isHttpBreadcrumb = type === 'http';
        if (isHttpBreadcrumb && (isFetch || isXhr)) {
            const httpUrl = data?.url;
            const { endpoints } = options;
            const isTracedGraphqlEndpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(httpUrl, endpoints);
            const payload = getRequestPayloadXhrOrFetch(handlerData);
            if (isTracedGraphqlEndpoint && data && payload) {
                const graphqlBody = getGraphQLRequestPayload(payload);
                if (!data.graphql && graphqlBody) {
                    const operationInfo = _getGraphQLOperation(graphqlBody);
                    data['graphql.operation'] = operationInfo;
                    if (isStandardRequest(graphqlBody)) {
                        data['graphql.document'] = graphqlBody.query;
                    }
                    if (isPersistedRequest(graphqlBody)) {
                        data['graphql.persisted_query.hash.sha256'] = graphqlBody.extensions.persistedQuery.sha256Hash;
                        data['graphql.persisted_query.version'] = graphqlBody.extensions.persistedQuery.version;
                    }
                }
            }
        }
    });
}
/**
 * @param requestBody - GraphQL request
 * @returns A formatted version of the request: 'TYPE NAME' or 'TYPE' or 'persisted NAME'
 */ function _getGraphQLOperation(requestBody) {
    // Handle persisted operations
    if (isPersistedRequest(requestBody)) {
        return `persisted ${requestBody.operationName}`;
    }
    // Handle standard GraphQL requests
    if (isStandardRequest(requestBody)) {
        const { query: graphqlQuery, operationName: graphqlOperationName } = requestBody;
        const { operationName = graphqlOperationName, operationType } = parseGraphQLQuery(graphqlQuery);
        const operationInfo = operationName ? `${operationType} ${operationName}` : `${operationType}`;
        return operationInfo;
    }
    // Fallback for unknown request types
    return 'unknown';
}
/**
 * Get the request body/payload based on the shape of the hint.
 *
 * Exported for tests only.
 */ function getRequestPayloadXhrOrFetch(hint) {
    const isXhr = 'xhr' in hint;
    let body;
    if (isXhr) {
        const sentryXhrData = hint.xhr[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SENTRY_XHR_DATA_KEY"]];
        body = sentryXhrData && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getBodyString"])(sentryXhrData.body)[0];
    } else {
        const sentryFetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFetchRequestArgBody"])(hint.input);
        body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getBodyString"])(sentryFetchData)[0];
    }
    return body;
}
/**
 * Extract the name and type of the operation from the GraphQL query.
 *
 * Exported for tests only.
 */ function parseGraphQLQuery(query) {
    const namedQueryRe = /^(?:\s*)(query|mutation|subscription)(?:\s*)(\w+)(?:\s*)[{(]/;
    const unnamedQueryRe = /^(?:\s*)(query|mutation|subscription)(?:\s*)[{(]/;
    const namedMatch = query.match(namedQueryRe);
    if (namedMatch) {
        return {
            operationType: namedMatch[1],
            operationName: namedMatch[2]
        };
    }
    const unnamedMatch = query.match(unnamedQueryRe);
    if (unnamedMatch) {
        return {
            operationType: unnamedMatch[1],
            operationName: undefined
        };
    }
    return {
        operationType: undefined,
        operationName: undefined
    };
}
/**
 * Helper to safely check if a value is a non-null object
 */ function isObject(value) {
    return typeof value === 'object' && value !== null;
}
/**
 * Type guard to check if a request is a standard GraphQL request
 */ function isStandardRequest(payload) {
    return isObject(payload) && typeof payload.query === 'string';
}
/**
 * Type guard to check if a request is a persisted operation request
 */ function isPersistedRequest(payload) {
    return isObject(payload) && typeof payload.operationName === 'string' && isObject(payload.extensions) && isObject(payload.extensions.persistedQuery) && typeof payload.extensions.persistedQuery.sha256Hash === 'string' && typeof payload.extensions.persistedQuery.version === 'number';
}
/**
 * Extract the payload of a request if it's GraphQL.
 * Exported for tests only.
 * @param payload - A valid JSON string
 * @returns A POJO or undefined
 */ function getGraphQLRequestPayload(payload) {
    try {
        const requestBody = JSON.parse(payload);
        // Return any valid GraphQL request (standard, persisted, or APQ retry with both)
        if (isStandardRequest(requestBody) || isPersistedRequest(requestBody)) {
            return requestBody;
        }
        // Not a GraphQL request
        return undefined;
    } catch  {
        // Invalid JSON
        return undefined;
    }
}
/**
 * This integration ensures that GraphQL requests made in the browser
 * have their GraphQL-specific data captured and attached to spans and breadcrumbs.
 */ const graphqlClientIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_graphqlClientIntegration);
;
 //# sourceMappingURL=graphqlClient.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/reportPageLoaded.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reportPageLoaded",
    ()=>reportPageLoaded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
;
/**
 * Manually report the end of the page load, resulting in the SDK ending the pageload span.
 * This only works if {@link BrowserTracingOptions.enableReportPageLoaded} is set to `true`.
 * Otherwise, the pageload span will end itself based on the {@link BrowserTracingOptions.finalTimeout},
 * {@link BrowserTracingOptions.idleTimeout} and {@link BrowserTracingOptions.childSpanTimeout}.
 *
 * @param client - The client to use. If not provided, the global client will be used.
 */ function reportPageLoaded(client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])()) {
    client?.emit('endPageloadSpan');
}
;
 //# sourceMappingURL=reportPageLoaded.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/setActiveSpan.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setActiveSpanInBrowser",
    ()=>setActiveSpanInBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$setSpanForScope__as__$5f$INTERNAL_setSpanForScope$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [client] (ecmascript) <export _setSpanForScope as _INTERNAL_setSpanForScope>");
;
/**
 * Sets an inactive span active on the current scope.
 *
 * This is useful in browser applications, if you want to create a span that cannot be finished
 * within its callback. Any spans started while the given span is active, will be children of the span.
 *
 * If there already was an active span on the scope prior to calling this function, it is replaced
 * with the given span and restored after the span ended. Otherwise, the span will simply be
 * removed, resulting in no active span on the scope.
 *
 * IMPORTANT: This function can ONLY be used in the browser! Calling this function in a server
 * environment (for example in a server-side rendered component) will result in undefined behaviour
 * and is not supported.
 * You MUST call `span.end()` manually, otherwise the span will never be finished.
 *
 * @example
 * ```js
 * let checkoutSpan;
 *
 * on('checkoutStarted', () => {
 *  checkoutSpan = Sentry.startInactiveSpan({ name: 'checkout-flow' });
 *  Sentry.setActiveSpanInBrowser(checkoutSpan);
 * })
 *
 * // during this time, any spans started will be children of `checkoutSpan`:
 * Sentry.startSpan({ name: 'checkout-step-1' }, () => {
 *  // ... `
 * })
 *
 * on('checkoutCompleted', () => {
 *  checkoutSpan?.end();
 * })
 * ```
 *
 * @param span - the span to set active
 */ function setActiveSpanInBrowser(span) {
    const maybePreviousActiveSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
    // If the span is already active, there's no need to double-patch or set it again.
    // This also guards against users (for whatever reason) calling setActiveSpanInBrowser on SDK-started
    // idle spans like pageload or navigation spans. These will already be handled correctly by the SDK.
    // For nested situations, we have to double-patch to ensure we restore the correct previous span (see tests)
    if (maybePreviousActiveSpan === span) {
        return;
    }
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
    // Putting a small patch onto the span.end method to ensure we
    // remove the span from the scope when it ends.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    span.end = new Proxy(span.end, {
        apply (target, thisArg, args) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$setSpanForScope__as__$5f$INTERNAL_setSpanForScope$3e$__["_INTERNAL_setSpanForScope"])(scope, maybePreviousActiveSpan);
            return Reflect.apply(target, thisArg, args);
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$setSpanForScope__as__$5f$INTERNAL_setSpanForScope$3e$__["_INTERNAL_setSpanForScope"])(scope, span);
}
;
 //# sourceMappingURL=setActiveSpan.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/transports/offline.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore,
    "makeBrowserOfflineTransport",
    ()=>makeBrowserOfflineTransport,
    "push",
    ()=>push,
    "shift",
    ()=>shift,
    "unshift",
    ()=>unshift
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$offline$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/transports/offline.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/transports/fetch.js [client] (ecmascript)");
;
;
;
// 'Store', 'promisifyRequest' and 'createStore' were originally copied from the 'idb-keyval' package before being
// modified and simplified: https://github.com/jakearchibald/idb-keyval
//
// At commit: 0420a704fd6cbb4225429c536b1f61112d012fca
// Original license:
// Copyright 2016, Jake Archibald
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function promisifyRequest(request) {
    return new Promise((resolve, reject)=>{
        // @ts-expect-error - file size hacks
        request.oncomplete = request.onsuccess = ()=>resolve(request.result);
        // @ts-expect-error - file size hacks
        request.onabort = request.onerror = ()=>reject(request.error);
    });
}
/** Create or open an IndexedDb store */ function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = ()=>request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (callback)=>dbp.then((db)=>callback(db.transaction(storeName, 'readwrite').objectStore(storeName)));
}
function keys(store) {
    return promisifyRequest(store.getAllKeys());
}
/** Insert into the end of the store */ function push(store, value, maxQueueSize) {
    return store((store)=>{
        return keys(store).then((keys)=>{
            if (keys.length >= maxQueueSize) {
                return;
            }
            // We insert with an incremented key so that the entries are popped in order
            store.put(value, Math.max(...keys, 0) + 1);
            return promisifyRequest(store.transaction);
        });
    });
}
/** Insert into the front of the store */ function unshift(store, value, maxQueueSize) {
    return store((store)=>{
        return keys(store).then((keys)=>{
            if (keys.length >= maxQueueSize) {
                return;
            }
            // We insert with an decremented key so that the entries are popped in order
            store.put(value, Math.min(...keys, 0) - 1);
            return promisifyRequest(store.transaction);
        });
    });
}
/** Pop the oldest value from the store */ function shift(store) {
    return store((store)=>{
        return keys(store).then((keys)=>{
            const firstKey = keys[0];
            if (firstKey == null) {
                return undefined;
            }
            return promisifyRequest(store.get(firstKey)).then((value)=>{
                store.delete(firstKey);
                return promisifyRequest(store.transaction).then(()=>value);
            });
        });
    });
}
function createIndexedDbStore(options) {
    let store;
    // Lazily create the store only when it's needed
    function getStore() {
        if (store == undefined) {
            store = createStore(options.dbName || 'sentry-offline', options.storeName || 'queue');
        }
        return store;
    }
    return {
        push: async (env)=>{
            try {
                const serialized = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serializeEnvelope"])(env);
                await push(getStore(), serialized, options.maxQueueSize || 30);
            } catch  {
            //
            }
        },
        unshift: async (env)=>{
            try {
                const serialized = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serializeEnvelope"])(env);
                await unshift(getStore(), serialized, options.maxQueueSize || 30);
            } catch  {
            //
            }
        },
        shift: async ()=>{
            try {
                const deserialized = await shift(getStore());
                if (deserialized) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseEnvelope"])(deserialized);
                }
            } catch  {
            //
            }
            return undefined;
        }
    };
}
function makeIndexedDbOfflineTransport(createTransport) {
    return (options)=>{
        const transport = createTransport({
            ...options,
            createStore: createIndexedDbStore
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].addEventListener('online', async (_)=>{
            await transport.flush();
        });
        return transport;
    };
}
/**
 * Creates a transport that uses IndexedDb to store events when offline.
 */ function makeBrowserOfflineTransport(createTransport = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["makeFetchTransport"]) {
    return makeIndexedDbOfflineTransport((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$offline$2e$js__$5b$client$5d$__$28$ecmascript$29$__["makeOfflineTransport"])(createTransport));
}
;
 //# sourceMappingURL=offline.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/utils.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_PROFILE_DURATION_MS",
    ()=>MAX_PROFILE_DURATION_MS,
    "PROFILER_THREAD_ID_STRING",
    ()=>PROFILER_THREAD_ID_STRING,
    "PROFILER_THREAD_NAME",
    ()=>PROFILER_THREAD_NAME,
    "addProfileToGlobalCache",
    ()=>addProfileToGlobalCache,
    "addProfilesToEnvelope",
    ()=>addProfilesToEnvelope,
    "applyDebugMetadata",
    ()=>applyDebugMetadata,
    "attachProfiledThreadToEvent",
    ()=>attachProfiledThreadToEvent,
    "convertJSSelfProfileToSampledFormat",
    ()=>convertJSSelfProfileToSampledFormat,
    "createProfileChunkPayload",
    ()=>createProfileChunkPayload,
    "createProfilePayload",
    ()=>createProfilePayload,
    "createProfilingEvent",
    ()=>createProfilingEvent,
    "enrichWithThreadInformation",
    ()=>enrichWithThreadInformation,
    "findProfiledTransactionsFromEnvelope",
    ()=>findProfiledTransactionsFromEnvelope,
    "getActiveProfilesCount",
    ()=>getActiveProfilesCount,
    "hasLegacyProfiling",
    ()=>hasLegacyProfiling,
    "isAutomatedPageLoadSpan",
    ()=>isAutomatedPageLoadSpan,
    "isValidSampleRate",
    ()=>isValidSampleRate,
    "shouldProfileSession",
    ()=>shouldProfileSession,
    "shouldProfileSpanLegacy",
    ()=>shouldProfileSpanLegacy,
    "startJSSelfProfile",
    ()=>startJSSelfProfile,
    "takeProfileFromGlobalCache",
    ()=>takeProfileFromGlobalCache,
    "validateProfileChunk",
    ()=>validateProfileChunk
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/time.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/constants.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$ids$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-ids.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
;
;
;
const MS_TO_NS = 1e6;
// Checking if we are in Main or Worker thread: `self` (not `window`) is the `globalThis` in Web Workers and `importScripts` are only available in Web Workers
const isMainThread = 'window' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].window === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"] && typeof importScripts === 'undefined';
// Setting ID to 0 as we cannot get an ID from Web Workers
const PROFILER_THREAD_ID_STRING = String(0);
const PROFILER_THREAD_NAME = isMainThread ? 'main' : 'worker';
// We force make this optional to be on the safe side...
const navigator = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].navigator;
// Machine properties (eval only once)
let OS_PLATFORM = '';
let OS_PLATFORM_VERSION = '';
let OS_ARCH = '';
let OS_BROWSER = navigator?.userAgent || '';
let OS_MODEL = '';
const OS_LOCALE = navigator?.language || navigator?.languages?.[0] || '';
function isUserAgentData(data) {
    return typeof data === 'object' && data !== null && 'getHighEntropyValues' in data;
}
// @ts-expect-error userAgentData is not part of the navigator interface yet
const userAgentData = navigator?.userAgentData;
if (isUserAgentData(userAgentData)) {
    userAgentData.getHighEntropyValues([
        'architecture',
        'model',
        'platform',
        'platformVersion',
        'fullVersionList'
    ]).then((ua)=>{
        OS_PLATFORM = ua.platform || '';
        OS_ARCH = ua.architecture || '';
        OS_MODEL = ua.model || '';
        OS_PLATFORM_VERSION = ua.platformVersion || '';
        if (ua.fullVersionList?.length) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const firstUa = ua.fullVersionList[ua.fullVersionList.length - 1];
            OS_BROWSER = `${firstUa.brand} ${firstUa.version}`;
        }
    }).catch((e)=>void 0);
}
function isProcessedJSSelfProfile(profile) {
    return !('thread_metadata' in profile);
}
// Enriches the profile with threadId of the current thread.
// This is done in node as we seem to not be able to get the info from C native code.
/**
 *
 */ function enrichWithThreadInformation(profile) {
    if (!isProcessedJSSelfProfile(profile)) {
        return profile;
    }
    return convertJSSelfProfileToSampledFormat(profile);
}
// Profile is marked as optional because it is deleted from the metadata
// by the integration before the event is processed by other integrations.
function getTraceId(event) {
    const traceId = event.contexts?.trace?.trace_id;
    // Log a warning if the profile has an invalid traceId (should be uuidv4).
    // All profiles and transactions are rejected if this is the case and we want to
    // warn users that this is happening if they enable debug flag
    if (typeof traceId === 'string' && traceId.length !== 32) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Invalid traceId: ${traceId} on profiled event`);
        }
    }
    if (typeof traceId !== 'string') {
        return '';
    }
    return traceId;
}
/**
 * Creates a profiling event envelope from a Sentry event. If profile does not pass
 * validation, returns null.
 * @param event
 * @param dsn
 * @param metadata
 * @param tunnel
 * @returns {EventEnvelope | null}
 */ /**
 * Creates a profiling event envelope from a Sentry event.
 */ function createProfilePayload(profile_id, start_timestamp, processed_profile, event) {
    if (event.type !== 'transaction') {
        // createProfilingEventEnvelope should only be called for transactions,
        // we type guard this behavior with isProfiledTransactionEvent.
        throw new TypeError('Profiling events may only be attached to transactions, this should never occur.');
    }
    if (processed_profile === undefined || processed_profile === null) {
        throw new TypeError(`Cannot construct profiling event envelope without a valid profile. Got ${processed_profile} instead.`);
    }
    const traceId = getTraceId(event);
    const enrichedThreadProfile = enrichWithThreadInformation(processed_profile);
    const transactionStartMs = start_timestamp ? start_timestamp : typeof event.start_timestamp === 'number' ? event.start_timestamp * 1000 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timestampInSeconds"])() * 1000;
    const transactionEndMs = typeof event.timestamp === 'number' ? event.timestamp * 1000 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timestampInSeconds"])() * 1000;
    const profile = {
        event_id: profile_id,
        timestamp: new Date(transactionStartMs).toISOString(),
        platform: 'javascript',
        version: '1',
        release: event.release || '',
        environment: event.environment || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$constants$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEFAULT_ENVIRONMENT"],
        runtime: {
            name: 'javascript',
            version: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].navigator.userAgent
        },
        os: {
            name: OS_PLATFORM,
            version: OS_PLATFORM_VERSION,
            build_number: OS_BROWSER
        },
        device: {
            locale: OS_LOCALE,
            model: OS_MODEL,
            manufacturer: OS_BROWSER,
            architecture: OS_ARCH,
            is_emulator: false
        },
        debug_meta: {
            images: applyDebugMetadata(processed_profile.resources)
        },
        profile: enrichedThreadProfile,
        transactions: [
            {
                name: event.transaction || '',
                id: event.event_id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["uuid4"])(),
                trace_id: traceId,
                active_thread_id: PROFILER_THREAD_ID_STRING,
                relative_start_ns: '0',
                relative_end_ns: ((transactionEndMs - transactionStartMs) * 1e6).toFixed(0)
            }
        ]
    };
    return profile;
}
/**
 * Create a profile chunk envelope item
 */ function createProfileChunkPayload(jsSelfProfile, client, profilerId) {
    // only == to catch null and undefined
    if (jsSelfProfile == null) {
        throw new TypeError(`Cannot construct profiling event envelope without a valid profile. Got ${jsSelfProfile} instead.`);
    }
    const continuousProfile = convertToContinuousProfile(jsSelfProfile);
    const options = client.getOptions();
    const sdk = client.getSdkMetadata?.()?.sdk;
    return {
        chunk_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["uuid4"])(),
        client_sdk: {
            name: sdk?.name ?? 'sentry.javascript.browser',
            version: sdk?.version ?? '0.0.0'
        },
        profiler_id: profilerId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["uuid4"])(),
        platform: 'javascript',
        version: '2',
        release: options.release ?? '',
        environment: options.environment ?? 'production',
        debug_meta: {
            // function name obfuscation
            images: applyDebugMetadata(jsSelfProfile.resources)
        },
        profile: continuousProfile
    };
}
/**
 * Validate a profile chunk against the Sample Format V2 requirements.
 * https://develop.sentry.dev/sdk/telemetry/profiles/sample-format-v2/
 * - Presence of samples, stacks, frames
 * - Required metadata fields
 */ function validateProfileChunk(chunk) {
    try {
        // Required metadata
        if (!chunk || typeof chunk !== 'object') {
            return {
                reason: 'chunk is not an object'
            };
        }
        // profiler_id and chunk_id must be 32 lowercase hex chars
        const isHex32 = (val)=>typeof val === 'string' && /^[a-f0-9]{32}$/.test(val);
        if (!isHex32(chunk.profiler_id)) {
            return {
                reason: 'missing or invalid profiler_id'
            };
        }
        if (!isHex32(chunk.chunk_id)) {
            return {
                reason: 'missing or invalid chunk_id'
            };
        }
        if (!chunk.client_sdk) {
            return {
                reason: 'missing client_sdk metadata'
            };
        }
        // Profile data must have frames, stacks, samples
        const profile = chunk.profile;
        if (!profile) {
            return {
                reason: 'missing profile data'
            };
        }
        if (!Array.isArray(profile.frames) || !profile.frames.length) {
            return {
                reason: 'profile has no frames'
            };
        }
        if (!Array.isArray(profile.stacks) || !profile.stacks.length) {
            return {
                reason: 'profile has no stacks'
            };
        }
        if (!Array.isArray(profile.samples) || !profile.samples.length) {
            return {
                reason: 'profile has no samples'
            };
        }
        return {
            valid: true
        };
    } catch (e) {
        return {
            reason: `unknown validation error: ${e}`
        };
    }
}
/**
 * Convert from JSSelfProfile format to ContinuousThreadCpuProfile format.
 */ function convertToContinuousProfile(input) {
    // Frames map 1:1 by index; fill only when present to avoid sparse writes
    const frames = [];
    for(let i = 0; i < input.frames.length; i++){
        const frame = input.frames[i];
        if (!frame) {
            continue;
        }
        frames[i] = {
            function: frame.name,
            abs_path: typeof frame.resourceId === 'number' ? input.resources[frame.resourceId] : undefined,
            lineno: frame.line,
            colno: frame.column
        };
    }
    // Build stacks by following parent links, top->down order (root last)
    const stacks = [];
    for(let i = 0; i < input.stacks.length; i++){
        const stackHead = input.stacks[i];
        if (!stackHead) {
            continue;
        }
        const list = [];
        let current = stackHead;
        while(current){
            list.push(current.frameId);
            current = current.parentId === undefined ? undefined : input.stacks[current.parentId];
        }
        stacks[i] = list;
    }
    // Align timestamps to SDK time origin to match span/event timelines
    const perfOrigin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserPerformanceTimeOrigin"])();
    const origin = typeof performance.timeOrigin === 'number' ? performance.timeOrigin : perfOrigin || 0;
    const adjustForOriginChange = origin - (perfOrigin || origin);
    const samples = [];
    for(let i = 0; i < input.samples.length; i++){
        const sample = input.samples[i];
        if (!sample) {
            continue;
        }
        // Convert ms to seconds epoch-based timestamp
        const timestampSeconds = (origin + (sample.timestamp - adjustForOriginChange)) / 1000;
        samples[i] = {
            stack_id: sample.stackId ?? 0,
            thread_id: PROFILER_THREAD_ID_STRING,
            timestamp: timestampSeconds
        };
    }
    return {
        frames,
        stacks,
        samples,
        thread_metadata: {
            [PROFILER_THREAD_ID_STRING]: {
                name: PROFILER_THREAD_NAME
            }
        }
    };
}
/*
  See packages/browser-utils/src/browser/router.ts
*/ /**
 *
 */ function isAutomatedPageLoadSpan(span) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).op === 'pageload';
}
/**
 * Converts a JSSelfProfile to a our sampled format.
 * Does not currently perform stack indexing.
 */ function convertJSSelfProfileToSampledFormat(input) {
    let EMPTY_STACK_ID = undefined;
    let STACK_ID = 0;
    // Initialize the profile that we will fill with data
    const profile = {
        samples: [],
        stacks: [],
        frames: [],
        thread_metadata: {
            [PROFILER_THREAD_ID_STRING]: {
                name: PROFILER_THREAD_NAME
            }
        }
    };
    const firstSample = input.samples[0];
    if (!firstSample) {
        return profile;
    }
    // We assert samples.length > 0 above and timestamp should always be present
    const start = firstSample.timestamp;
    // The JS SDK might change it's time origin based on some heuristic (see See packages/utils/src/time.ts)
    // when that happens, we need to ensure we are correcting the profile timings so the two timelines stay in sync.
    // Since JS self profiling time origin is always initialized to performance.timeOrigin, we need to adjust for
    // the drift between the SDK selected value and our profile time origin.
    const perfOrigin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserPerformanceTimeOrigin"])();
    const origin = typeof performance.timeOrigin === 'number' ? performance.timeOrigin : perfOrigin || 0;
    const adjustForOriginChange = origin - (perfOrigin || origin);
    input.samples.forEach((jsSample, i)=>{
        // If sample has no stack, add an empty sample
        if (jsSample.stackId === undefined) {
            if (EMPTY_STACK_ID === undefined) {
                EMPTY_STACK_ID = STACK_ID;
                profile.stacks[EMPTY_STACK_ID] = [];
                STACK_ID++;
            }
            profile['samples'][i] = {
                // convert ms timestamp to ns
                elapsed_since_start_ns: ((jsSample.timestamp + adjustForOriginChange - start) * MS_TO_NS).toFixed(0),
                stack_id: EMPTY_STACK_ID,
                thread_id: PROFILER_THREAD_ID_STRING
            };
            return;
        }
        let stackTop = input.stacks[jsSample.stackId];
        // Functions in top->down order (root is last)
        // We follow the stackTop.parentId trail and collect each visited frameId
        const stack = [];
        while(stackTop){
            stack.push(stackTop.frameId);
            const frame = input.frames[stackTop.frameId];
            // If our frame has not been indexed yet, index it
            if (frame && profile.frames[stackTop.frameId] === undefined) {
                profile.frames[stackTop.frameId] = {
                    function: frame.name,
                    abs_path: typeof frame.resourceId === 'number' ? input.resources[frame.resourceId] : undefined,
                    lineno: frame.line,
                    colno: frame.column
                };
            }
            stackTop = stackTop.parentId === undefined ? undefined : input.stacks[stackTop.parentId];
        }
        const sample = {
            // convert ms timestamp to ns
            elapsed_since_start_ns: ((jsSample.timestamp + adjustForOriginChange - start) * MS_TO_NS).toFixed(0),
            stack_id: STACK_ID,
            thread_id: PROFILER_THREAD_ID_STRING
        };
        profile['stacks'][STACK_ID] = stack;
        profile['samples'][i] = sample;
        STACK_ID++;
    });
    return profile;
}
/**
 * Adds items to envelope if they are not already present - mutates the envelope.
 * @param envelope
 */ function addProfilesToEnvelope(envelope, profiles) {
    if (!profiles.length) {
        return envelope;
    }
    for (const profile of profiles){
        envelope[1].push([
            {
                type: 'profile'
            },
            profile
        ]);
    }
    return envelope;
}
/**
 * Finds transactions with profile_id context in the envelope
 * @param envelope
 * @returns
 */ function findProfiledTransactionsFromEnvelope(envelope) {
    const events = [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forEachEnvelopeItem"])(envelope, (item, type)=>{
        if (type !== 'transaction') {
            return;
        }
        for(let j = 1; j < item.length; j++){
            const event = item[j];
            if (event?.contexts?.profile?.profile_id) {
                events.push(item[j]);
            }
        }
    });
    return events;
}
/**
 * Applies debug meta data to an event from a list of paths to resources (sourcemaps)
 */ function applyDebugMetadata(resource_paths) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    const options = client?.getOptions();
    const stackParser = options?.stackParser;
    if (!stackParser) {
        return [];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$ids$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDebugImagesForResources"])(stackParser, resource_paths);
}
/**
 * Checks the given sample rate to make sure it is valid type and value (a boolean, or a number between 0 and 1).
 */ function isValidSampleRate(rate) {
    // we need to check NaN explicitly because it's of type 'number' and therefore wouldn't get caught by this typecheck
    if (typeof rate !== 'number' && typeof rate !== 'boolean' || typeof rate === 'number' && isNaN(rate)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`[Profiling] Invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(rate)} of type ${JSON.stringify(typeof rate)}.`);
        return false;
    }
    // Boolean sample rates are always valid
    if (rate === true || rate === false) {
        return true;
    }
    // in case sampleRate is a boolean, it will get automatically cast to 1 if it's true and 0 if it's false
    if (rate < 0 || rate > 1) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn(`[Profiling] Invalid sample rate. Sample rate must be between 0 and 1. Got ${rate}.`);
        return false;
    }
    return true;
}
function isValidProfile(profile) {
    if (profile.samples.length < 2) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            // Log a warning if the profile has less than 2 samples so users can know why
            // they are not seeing any profiling data and we cant avoid the back and forth
            // of asking them to provide us with a dump of the profile data.
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because it contains less than 2 samples');
        }
        return false;
    }
    if (!profile.frames.length) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because it contains no frames');
        }
        return false;
    }
    return true;
}
// Keep a flag value to avoid re-initializing the profiler constructor. If it fails
// once, it will always fail and this allows us to early return.
let PROFILING_CONSTRUCTOR_FAILED = false;
const MAX_PROFILE_DURATION_MS = 30000;
/**
 * Check if profiler constructor is available.
 * @param maybeProfiler
 */ function isJSProfilerSupported(maybeProfiler) {
    return typeof maybeProfiler === 'function';
}
/**
 * Starts the profiler and returns the profiler instance.
 */ function startJSSelfProfile() {
    // Feature support check first
    const JSProfilerConstructor = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].Profiler;
    if (!isJSProfilerSupported(JSProfilerConstructor)) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling is not supported by this browser, Profiler interface missing on window object.');
        }
        return;
    }
    // From initial testing, it seems that the minimum value for sampleInterval is 10ms.
    const samplingIntervalMS = 10;
    // Start the profiler
    const maxSamples = Math.floor(MAX_PROFILE_DURATION_MS / samplingIntervalMS);
    // Attempt to initialize the profiler constructor, if it fails, we disable profiling for the current user session.
    // This is likely due to a missing 'Document-Policy': 'js-profiling' header. We do not want to throw an error if this happens
    // as we risk breaking the user's application, so just disable profiling and log an error.
    try {
        return new JSProfilerConstructor({
            sampleInterval: samplingIntervalMS,
            maxBufferSize: maxSamples
        });
    } catch (e) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log("[Profiling] Failed to initialize the Profiling constructor, this is likely due to a missing 'Document-Policy': 'js-profiling' header.");
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Disabling profiling for current user session.');
        }
        PROFILING_CONSTRUCTOR_FAILED = true;
    }
    return;
}
/**
 * Determine if a profile should be profiled.
 */ function shouldProfileSpanLegacy(span) {
    // If constructor failed once, it will always fail, so we can early return.
    if (PROFILING_CONSTRUCTOR_FAILED) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling has been disabled for the duration of the current user session.');
        }
        return false;
    }
    if (!span.isRecording()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because root span was not sampled.');
        return false;
    }
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    const options = client?.getOptions();
    if (!options) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling disabled, no options found.');
        return false;
    }
    // eslint-disable-next-line deprecation/deprecation
    const profilesSampleRate = options.profilesSampleRate;
    // Since this is coming from the user (or from a function provided by the user), who knows what we might get. (The
    // only valid values are booleans or numbers between 0 and 1.)
    if (!isValidSampleRate(profilesSampleRate)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Discarding profile because of invalid sample rate.');
        return false;
    }
    // if the function returned 0 (or false), or if `profileSampleRate` is 0, it's a sign the profile should be dropped
    if (!profilesSampleRate) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because a negative sampling decision was inherited or profileSampleRate is set to 0');
        return false;
    }
    // Now we roll the dice. Math.random is inclusive of 0, but not of 1, so strict < is safe here. In case sampleRate is
    // a boolean, the < comparison will cause it to be automatically cast to 1 if it's true and 0 if it's false.
    const sampled = profilesSampleRate === true ? true : Math.random() < profilesSampleRate;
    // Check if we should sample this profile
    if (!sampled) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Discarding profile because it's not included in the random sample (sampling rate = ${Number(profilesSampleRate)})`);
        return false;
    }
    return true;
}
/**
 * Determine if a profile should be created for the current session.
 */ function shouldProfileSession(options) {
    // If constructor failed once, it will always fail, so we can early return.
    if (PROFILING_CONSTRUCTOR_FAILED) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling has been disabled for the duration of the current user session as the JS Profiler could not be started.');
        }
        return false;
    }
    if (options.profileLifecycle !== 'trace' && options.profileLifecycle !== 'manual') {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Session not sampled. Invalid `profileLifecycle` option.');
        return false;
    }
    //  Session sampling: profileSessionSampleRate gates whether profiling is enabled for this session
    const profileSessionSampleRate = options.profileSessionSampleRate;
    if (!isValidSampleRate(profileSessionSampleRate)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Discarding profile because of invalid profileSessionSampleRate.');
        return false;
    }
    if (!profileSessionSampleRate) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because profileSessionSampleRate is not defined or set to 0');
        return false;
    }
    return Math.random() <= profileSessionSampleRate;
}
/**
 * Checks if legacy profiling is configured.
 */ function hasLegacyProfiling(options) {
    // eslint-disable-next-line deprecation/deprecation
    return typeof options.profilesSampleRate !== 'undefined';
}
/**
 * Creates a profiling envelope item, if the profile does not pass validation, returns null.
 * @param event
 * @returns {Profile | null}
 */ function createProfilingEvent(profile_id, start_timestamp, profile, event) {
    if (!isValidProfile(profile)) {
        return null;
    }
    return createProfilePayload(profile_id, start_timestamp, profile, event);
}
// TODO (v8): We need to obtain profile ids in @sentry-internal/tracing,
// but we don't have access to this map because importing this map would
// cause a circular dependency. We need to resolve this in v8.
const PROFILE_MAP = new Map();
/**
 *
 */ function getActiveProfilesCount() {
    return PROFILE_MAP.size;
}
/**
 * Retrieves profile from global cache and removes it.
 */ function takeProfileFromGlobalCache(profile_id) {
    const profile = PROFILE_MAP.get(profile_id);
    if (profile) {
        PROFILE_MAP.delete(profile_id);
    }
    return profile;
}
/**
 * Adds profile to global cache and evicts the oldest profile if the cache is full.
 */ function addProfileToGlobalCache(profile_id, profile) {
    PROFILE_MAP.set(profile_id, profile);
    if (PROFILE_MAP.size > 30) {
        const last = PROFILE_MAP.keys().next().value;
        if (last !== undefined) {
            PROFILE_MAP.delete(last);
        }
    }
}
/**
 * Attaches the profiled thread information to the event's trace context.
 */ function attachProfiledThreadToEvent(event) {
    if (!event?.contexts?.profile) {
        return event;
    }
    if (!event.contexts) {
        return event;
    }
    // @ts-expect-error the trace fallback value is wrong, though it should never happen
    // and in case it does, we dont want to override whatever was passed initially.
    event.contexts.trace = {
        ...event.contexts?.trace ?? {},
        data: {
            ...event.contexts?.trace?.data ?? {},
            ['thread.id']: PROFILER_THREAD_ID_STRING,
            ['thread.name']: PROFILER_THREAD_NAME
        }
    };
    // Attach thread info to individual spans so that spans can be associated with the profiled thread on the UI even if contexts are missing.
    event.spans?.forEach((span)=>{
        span.data = {
            ...span.data || {},
            ['thread.id']: PROFILER_THREAD_ID_STRING,
            ['thread.name']: PROFILER_THREAD_NAME
        };
    });
    return event;
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/startProfileForSpan.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startProfileForSpan",
    ()=>startProfileForSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/time.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/utils.js [client] (ecmascript)");
;
;
;
;
/**
 * Wraps startTransaction and stopTransaction with profiling related logic.
 * startProfileForTransaction is called after the call to startTransaction in order to avoid our own code from
 * being profiled. Because of that same reason, stopProfiling is called before the call to stopTransaction.
 */ function startProfileForSpan(span) {
    // Start the profiler and get the profiler instance.
    let startTimestamp;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isAutomatedPageLoadSpan"])(span)) {
        startTimestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$client$5d$__$28$ecmascript$29$__["timestampInSeconds"])() * 1000;
    }
    const profiler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startJSSelfProfile"])();
    // We failed to construct the profiler, so we skip.
    // No need to log anything as this has already been logged in startProfile.
    if (!profiler) {
        return;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] started profiling span: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description}`);
    }
    // We create "unique" span names to avoid concurrent spans with same names
    // from being ignored by the profiler. From here on, only this span name should be used when
    // calling the profiler methods. Note: we log the original name to the user to avoid confusion.
    const profileId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["uuid4"])();
    // A couple of important things to note here:
    // `CpuProfilerBindings.stopProfiling` will be scheduled to run in 30seconds in order to exceed max profile duration.
    // Whichever of the two (span.finish/timeout) is first to run, the profiling will be stopped and the gathered profile
    // will be processed when the original span is finished. Since onProfileHandler can be invoked multiple times in the
    // event of an error or user mistake (calling span.finish multiple times), it is important that the behavior of onProfileHandler
    // is idempotent as we do not want any timings or profiles to be overridden by the last call to onProfileHandler.
    // After the original finish method is called, the event will be reported through the integration and delegated to transport.
    let processedProfile = null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().setContext('profile', {
        profile_id: profileId,
        start_timestamp: startTimestamp
    });
    /**
   * Idempotent handler for profile stop
   */ async function onProfileHandler() {
        // Check if the profile exists and return it the behavior has to be idempotent as users may call span.finish multiple times.
        if (!span) {
            return;
        }
        // Satisfy the type checker, but profiler will always be defined here.
        if (!profiler) {
            return;
        }
        if (processedProfile) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] profile for:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description, 'already exists, returning early');
            }
            return;
        }
        return profiler.stop().then((profile)=>{
            if (maxDurationTimeoutID) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].clearTimeout(maxDurationTimeoutID);
                maxDurationTimeoutID = undefined;
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] stopped profiling of span: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description}`);
            }
            // In case of an overlapping span, stopProfiling may return null and silently ignore the overlapping profile.
            if (!profile) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] profiler returned null profile for: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description}`, 'this may indicate an overlapping span or a call to stopProfiling with a profile title that was never started');
                }
                return;
            }
            processedProfile = profile;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addProfileToGlobalCache"])(profileId, profile);
        }).catch((error)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] error while stopping profiler:', error);
            }
        });
    }
    // Enqueue a timeout to prevent profiles from running over max duration.
    let maxDurationTimeoutID = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].setTimeout(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] max profile duration elapsed, stopping profiling for:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description);
        }
        // If the timeout exceeds, we want to stop profiling, but not finish the span
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        onProfileHandler();
    }, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MAX_PROFILE_DURATION_MS"]);
    // We need to reference the original end call to avoid creating an infinite loop
    const originalEnd = span.end.bind(span);
    /**
   * Wraps span `end()` with profiling related logic.
   * startProfiling is called after the call to spanStart in order to avoid our own code from
   * being profiled. Because of that same reason, stopProfiling is called before the call to spanEnd.
   */ function profilingWrappedSpanEnd() {
        if (!span) {
            return originalEnd();
        }
        // onProfileHandler should always return the same profile even if this is called multiple times.
        // Always call onProfileHandler to ensure stopProfiling is called and the timeout is cleared.
        void onProfileHandler().then(()=>{
            originalEnd();
        }, ()=>{
            // If onProfileHandler fails, we still want to call the original finish method.
            originalEnd();
        });
        return span;
    }
    span.end = profilingWrappedSpanEnd;
}
;
 //# sourceMappingURL=startProfileForSpan.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/UIProfiler.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UIProfiler",
    ()=>UIProfiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/dsn.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/utils.js [client] (ecmascript)");
;
;
;
const CHUNK_INTERVAL_MS = 60000; // 1 minute
// Maximum length for trace lifecycle profiling per root span (e.g. if spanEnd never fires)
const MAX_ROOT_SPAN_PROFILE_MS = 300000; // 5 minutes max per root span in trace mode
/**
 * UIProfiler (Profiling V2):
 * Supports two lifecycle modes:
 *  - 'manual': controlled explicitly via start()/stop()
 *  - 'trace': automatically runs while there are active sampled root spans
 *
 * Profiles are emitted as standalone `profile_chunk` envelopes either when:
 * - there are no more sampled root spans, or
 * - the 60s chunk timer elapses while profiling is running.
 */ class UIProfiler {
    // Manual + Trace
    // one per Profiler session
    // current profiler instance active flag
    // sampling decision for entire session
    // Trace-only
    constructor(){
        this._client = undefined;
        this._profiler = undefined;
        this._chunkTimer = undefined;
        this._profilerId = undefined;
        this._isRunning = false;
        this._sessionSampled = false;
        this._lifecycleMode = undefined;
        this._activeRootSpanIds = new Set();
        this._rootSpanTimeouts = new Map();
    }
    /**
   * Initialize the profiler with client, session sampling and lifecycle mode.
   */ initialize(client) {
        const lifecycleMode = client.getOptions().profileLifecycle;
        const sessionSampled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shouldProfileSession"])(client.getOptions());
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Initializing profiler (lifecycle='${lifecycleMode}').`);
        if (!sessionSampled) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Session not sampled. Skipping lifecycle profiler initialization.');
        }
        // One Profiler ID per profiling session (user session)
        this._profilerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["uuid4"])();
        this._client = client;
        this._sessionSampled = sessionSampled;
        this._lifecycleMode = lifecycleMode;
        if (lifecycleMode === 'trace') {
            this._setupTraceLifecycleListeners(client);
        }
    }
    /** Starts UI profiling (only effective in 'manual' mode and when sampled). */ start() {
        if (this._lifecycleMode === 'trace') {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] `profileLifecycle` is set to "trace". Calls to `uiProfiler.start()` are ignored in trace mode.');
            return;
        }
        if (this._isRunning) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Profile session is already running, `uiProfiler.start()` is a no-op.');
            return;
        }
        if (!this._sessionSampled) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Session is not sampled, `uiProfiler.start()` is a no-op.');
            return;
        }
        this._beginProfiling();
    }
    /** Stops UI profiling (only effective in 'manual' mode). */ stop() {
        if (this._lifecycleMode === 'trace') {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] `profileLifecycle` is set to "trace". Calls to `uiProfiler.stop()` are ignored in trace mode.');
            return;
        }
        if (!this._isRunning) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Profiler is not running, `uiProfiler.stop()` is a no-op.');
            return;
        }
        this._endProfiling();
    }
    /** Handle an already-active root span at integration setup time (used only in trace mode). */ notifyRootSpanActive(rootSpan) {
        if (this._lifecycleMode !== 'trace' || !this._sessionSampled) {
            return;
        }
        const spanId = rootSpan.spanContext().spanId;
        if (!spanId || this._activeRootSpanIds.has(spanId)) {
            return;
        }
        this._registerTraceRootSpan(spanId);
        const rootSpanCount = this._activeRootSpanIds.size;
        if (rootSpanCount === 1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Detected already active root span during setup. Active root spans now:', rootSpanCount);
            this._beginProfiling();
        }
    }
    /**
   * Begin profiling if not already running.
   */ _beginProfiling() {
        if (this._isRunning) {
            return;
        }
        this._isRunning = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Started profiling with profiler ID:', this._profilerId);
        // Expose profiler_id to match root spans with profiles
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getGlobalScope"])().setContext('profile', {
            profiler_id: this._profilerId
        });
        this._startProfilerInstance();
        if (!this._profiler) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Failed to start JS Profiler; stopping.');
            this._resetProfilerInfo();
            return;
        }
        this._startPeriodicChunking();
    }
    /** End profiling session; final chunk will be collected and sent. */ _endProfiling() {
        if (!this._isRunning) {
            return;
        }
        this._isRunning = false;
        if (this._chunkTimer) {
            clearTimeout(this._chunkTimer);
            this._chunkTimer = undefined;
        }
        this._clearAllRootSpanTimeouts();
        // Collect whatever was currently recording
        this._collectCurrentChunk().catch((e)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('[Profiling] Failed to collect current profile chunk on `stop()`:', e);
        });
        // Manual: Clear profiling context so spans outside start()/stop() aren't marked as profiled
        // Trace: Profile context is kept for the whole session duration
        if (this._lifecycleMode === 'manual') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getGlobalScope"])().setContext('profile', {});
        }
    }
    /** Trace-mode: attach spanStart/spanEnd listeners. */ _setupTraceLifecycleListeners(client) {
        client.on('spanStart', (span)=>{
            if (!this._sessionSampled) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Span not profiled because of negative sampling decision for user session.');
                return;
            }
            if (span !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span)) {
                return; // only care about root spans
            }
            // Only count sampled root spans
            if (!span.isRecording()) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because root span was not sampled.');
                return;
            }
            const spanId = span.spanContext().spanId;
            if (!spanId || this._activeRootSpanIds.has(spanId)) {
                return;
            }
            this._registerTraceRootSpan(spanId);
            const rootSpanCount = this._activeRootSpanIds.size;
            if (rootSpanCount === 1) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Root span ${spanId} started. Profiling active while there are active root spans (count=${rootSpanCount}).`);
                this._beginProfiling();
            }
        });
        client.on('spanEnd', (span)=>{
            if (!this._sessionSampled) {
                return;
            }
            const spanId = span.spanContext().spanId;
            if (!spanId || !this._activeRootSpanIds.has(spanId)) {
                return;
            }
            this._activeRootSpanIds.delete(spanId);
            const rootSpanCount = this._activeRootSpanIds.size;
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Root span with ID ${spanId} ended. Will continue profiling for as long as there are active root spans (currently: ${rootSpanCount}).`);
            if (rootSpanCount === 0) {
                this._collectCurrentChunk().catch((e)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('[Profiling] Failed to collect current profile chunk on last `spanEnd`:', e);
                });
                this._endProfiling();
            }
        });
    }
    /**
   * Resets profiling information from scope and resets running state (used on failure)
   */ _resetProfilerInfo() {
        this._isRunning = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getGlobalScope"])().setContext('profile', {});
    }
    /**
   * Clear and reset all per-root-span timeouts.
   */ _clearAllRootSpanTimeouts() {
        this._rootSpanTimeouts.forEach((timeout)=>clearTimeout(timeout));
        this._rootSpanTimeouts.clear();
    }
    /** Keep track of root spans and schedule safeguard timeout (trace mode). */ _registerTraceRootSpan(spanId) {
        this._activeRootSpanIds.add(spanId);
        const timeout = setTimeout(()=>this._onRootSpanTimeout(spanId), MAX_ROOT_SPAN_PROFILE_MS);
        this._rootSpanTimeouts.set(spanId, timeout);
    }
    /**
   * Start a profiler instance if needed.
   */ _startProfilerInstance() {
        if (this._profiler?.stopped === false) {
            return; // already running
        }
        const profiler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startJSSelfProfile"])();
        if (!profiler) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Failed to start JS Profiler.');
            return;
        }
        this._profiler = profiler;
    }
    /**
   * Schedule the next 60s chunk while running.
   * Each tick collects a chunk and restarts the profiler.
   * A chunk should be closed when there are no active root spans anymore OR when the maximum chunk interval is reached.
   */ _startPeriodicChunking() {
        if (!this._isRunning) {
            return;
        }
        this._chunkTimer = setTimeout(()=>{
            this._collectCurrentChunk().catch((e)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('[Profiling] Failed to collect current profile chunk during periodic chunking:', e);
            });
            if (this._isRunning) {
                this._startProfilerInstance();
                if (!this._profiler) {
                    // If restart failed, stop scheduling further chunks and reset context.
                    this._resetProfilerInfo();
                    return;
                }
                this._startPeriodicChunking();
            }
        }, CHUNK_INTERVAL_MS);
    }
    /**
   * Handle timeout for a specific root span ID to avoid indefinitely running profiler if `spanEnd` never fires.
   * If this was the last active root span, collect the current chunk and stop profiling.
   */ _onRootSpanTimeout(rootSpanId) {
        // If span already ended, ignore
        if (!this._rootSpanTimeouts.has(rootSpanId)) {
            return;
        }
        this._rootSpanTimeouts.delete(rootSpanId);
        if (!this._activeRootSpanIds.has(rootSpanId)) {
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Reached 5-minute timeout for root span ${rootSpanId}. You likely started a manual root span that never called \`.end()\`.`);
        this._activeRootSpanIds.delete(rootSpanId);
        if (this._activeRootSpanIds.size === 0) {
            this._endProfiling();
        }
    }
    /**
   * Stop current profiler instance, convert profile to chunk & send.
   */ async _collectCurrentChunk() {
        const prevProfiler = this._profiler;
        this._profiler = undefined;
        if (!prevProfiler) {
            return;
        }
        try {
            const profile = await prevProfiler.stop();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const chunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createProfileChunkPayload"])(profile, this._client, this._profilerId);
            // Validate chunk before sending
            const validationReturn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["validateProfileChunk"])(chunk);
            if ('reason' in validationReturn) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding invalid profile chunk (this is probably a bug in the SDK):', validationReturn.reason);
                return;
            }
            this._sendProfileChunk(chunk);
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Collected browser profile chunk.');
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Error while stopping JS Profiler for chunk:', e);
        }
    }
    /**
   * Send a profile chunk as a standalone envelope.
   */ _sendProfileChunk(chunk) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const client = this._client;
        const sdkInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSdkMetadataForEnvelopeHeader"])(client.getSdkMetadata?.());
        const dsn = client.getDsn();
        const tunnel = client.getOptions().tunnel;
        const envelope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createEnvelope"])({
            event_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$client$5d$__$28$ecmascript$29$__["uuid4"])(),
            sent_at: new Date().toISOString(),
            ...sdkInfo && {
                sdk: sdkInfo
            },
            ...!!tunnel && dsn && {
                dsn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$client$5d$__$28$ecmascript$29$__["dsnToString"])(dsn)
            }
        }, [
            [
                {
                    type: 'profile_chunk',
                    platform: 'javascript'
                },
                chunk
            ]
        ]);
        client.sendEnvelope(envelope).then(null, (reason)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error('Error while sending profile chunk envelope:', reason);
        });
    }
}
;
 //# sourceMappingURL=UIProfiler.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/integration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "browserProfilingIntegration",
    ()=>browserProfilingIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$startProfileForSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/startProfileForSpan.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$UIProfiler$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/UIProfiler.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/utils.js [client] (ecmascript)");
;
;
;
;
;
;
const INTEGRATION_NAME = 'BrowserProfiling';
const _browserProfilingIntegration = ()=>{
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            const options = client.getOptions();
            const profiler = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$UIProfiler$2e$js__$5b$client$5d$__$28$ecmascript$29$__["UIProfiler"]();
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasLegacyProfiling"])(options) && !options.profileLifecycle) {
                // Set default lifecycle mode
                options.profileLifecycle = 'manual';
            }
            // eslint-disable-next-line deprecation/deprecation
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasLegacyProfiling"])(options) && !options.profilesSampleRate) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling disabled, no profiling options found.');
                return;
            }
            const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
            const rootSpan = activeSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasLegacyProfiling"])(options) && options.profileSessionSampleRate !== undefined) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Both legacy profiling (`profilesSampleRate`) and UI profiling settings are defined. `profileSessionSampleRate` has no effect when legacy profiling is enabled.');
            }
            // UI PROFILING (Profiling V2)
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasLegacyProfiling"])(options)) {
                const lifecycleMode = options.profileLifecycle;
                // Registering hooks in all lifecycle modes to be able to notify users in case they want to start/stop the profiler manually in `trace` mode
                client.on('startUIProfiler', ()=>profiler.start());
                client.on('stopUIProfiler', ()=>profiler.stop());
                if (lifecycleMode === 'manual') {
                    profiler.initialize(client);
                } else if (lifecycleMode === 'trace') {
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hasSpansEnabled"])(options)) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].warn("[Profiling] `profileLifecycle` is 'trace' but tracing is disabled. Set a `tracesSampleRate` or `tracesSampler` to enable span tracing.");
                        return;
                    }
                    profiler.initialize(client);
                    // If there is an active, sampled root span already, notify the profiler
                    if (rootSpan) {
                        profiler.notifyRootSpanActive(rootSpan);
                    }
                    // In case rootSpan is created slightly after setup -> schedule microtask to re-check and notify.
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"].setTimeout(()=>{
                        const laterActiveSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
                        const laterRootSpan = laterActiveSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getRootSpan"])(laterActiveSpan);
                        if (laterRootSpan) {
                            profiler.notifyRootSpanActive(laterRootSpan);
                        }
                    }, 0);
                }
            } else {
                // LEGACY PROFILING (v1)
                if (rootSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isAutomatedPageLoadSpan"])(rootSpan)) {
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shouldProfileSpanLegacy"])(rootSpan)) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$startProfileForSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startProfileForSpan"])(rootSpan);
                    }
                }
                client.on('spanStart', (span)=>{
                    if (span === (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["shouldProfileSpanLegacy"])(span)) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$startProfileForSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startProfileForSpan"])(span);
                    }
                });
                client.on('beforeEnvelope', (envelope)=>{
                    // if not profiles are in queue, there is nothing to add to the envelope.
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getActiveProfilesCount"])()) {
                        return;
                    }
                    const profiledTransactionEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["findProfiledTransactionsFromEnvelope"])(envelope);
                    if (!profiledTransactionEvents.length) {
                        return;
                    }
                    const profilesToAddToEnvelope = [];
                    for (const profiledTransaction of profiledTransactionEvents){
                        const context = profiledTransaction?.contexts;
                        const profile_id = context?.profile?.['profile_id'];
                        const start_timestamp = context?.profile?.['start_timestamp'];
                        if (typeof profile_id !== 'string') {
                            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] cannot find profile for a span without a profile context');
                            continue;
                        }
                        if (!profile_id) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] cannot find profile for a span without a profile context');
                            continue;
                        }
                        // Remove the profile from the span context before sending, relay will take care of the rest.
                        if (context?.profile) {
                            delete context.profile;
                        }
                        const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["takeProfileFromGlobalCache"])(profile_id);
                        if (!profile) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Could not retrieve profile for span: ${profile_id}`);
                            continue;
                        }
                        const profileEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createProfilingEvent"])(profile_id, start_timestamp, profile, profiledTransaction);
                        if (profileEvent) {
                            profilesToAddToEnvelope.push(profileEvent);
                        }
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addProfilesToEnvelope"])(envelope, profilesToAddToEnvelope);
                });
            }
        },
        processEvent (event) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["attachProfiledThreadToEvent"])(event);
        }
    };
};
const browserProfilingIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_browserProfilingIntegration);
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/launchdarkly/integration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildLaunchDarklyFlagUsedHandler",
    ()=>buildLaunchDarklyFlagUsedHandler,
    "launchDarklyIntegration",
    ()=>launchDarklyIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/featureFlags.js [client] (ecmascript)");
;
/**
 * Sentry integration for capturing feature flag evaluations from LaunchDarkly.
 *
 * See the [feature flag documentation](https://develop.sentry.dev/sdk/expected-features/#feature-flags) for more information.
 *
 * @example
 * ```
 * import * as Sentry from '@sentry/browser';
 * import {launchDarklyIntegration, buildLaunchDarklyFlagUsedInspector} from '@sentry/browser';
 * import * as LaunchDarkly from 'launchdarkly-js-client-sdk';
 *
 * Sentry.init(..., integrations: [launchDarklyIntegration()])
 * const ldClient = LaunchDarkly.initialize(..., {inspectors: [buildLaunchDarklyFlagUsedHandler()]});
 * ```
 */ const launchDarklyIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'LaunchDarkly',
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
/**
 * LaunchDarkly hook to listen for and buffer flag evaluations. This needs to
 * be registered as an 'inspector' in LaunchDarkly initialize() options,
 * separately from `launchDarklyIntegration`. Both the hook and the integration
 * are needed to capture LaunchDarkly flags.
 */ function buildLaunchDarklyFlagUsedHandler() {
    return {
        name: 'sentry-flag-auditor',
        type: 'flag-used',
        synchronous: true,
        /**
     * Handle a flag evaluation by storing its name and value on the current scope.
     */ method: (flagKey, flagDetail, _context)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(flagKey, flagDetail.value);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(flagKey, flagDetail.value);
        }
    };
}
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/openfeature/integration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenFeatureIntegrationHook",
    ()=>OpenFeatureIntegrationHook,
    "openFeatureIntegration",
    ()=>openFeatureIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/featureFlags.js [client] (ecmascript)");
;
const openFeatureIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'OpenFeature',
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
/**
 * OpenFeature Hook class implementation.
 */ class OpenFeatureIntegrationHook {
    /**
   * Successful evaluation result.
   */ after(_hookContext, evaluationDetails) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(evaluationDetails.flagKey, evaluationDetails.value);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(evaluationDetails.flagKey, evaluationDetails.value);
    }
    /**
   * On error evaluation result.
   */ error(hookContext, _error, _hookHints) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(hookContext.flagKey, hookContext.defaultValue);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(hookContext.flagKey, hookContext.defaultValue);
    }
}
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/unleash/integration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unleashIntegration",
    ()=>unleashIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/featureFlags.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
;
;
/**
 * Sentry integration for capturing feature flag evaluations from the Unleash SDK.
 *
 * See the [feature flag documentation](https://develop.sentry.dev/sdk/expected-features/#feature-flags) for more information.
 *
 * @example
 * ```
 * import { UnleashClient } from 'unleash-proxy-client';
 * import * as Sentry from '@sentry/browser';
 *
 * Sentry.init({
 *   dsn: '___PUBLIC_DSN___',
 *   integrations: [Sentry.unleashIntegration({featureFlagClientClass: UnleashClient})],
 * });
 *
 * const unleash = new UnleashClient(...);
 * unleash.start();
 *
 * unleash.isEnabled('my-feature');
 * Sentry.captureException(new Error('something went wrong'));
 * ```
 */ const unleashIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(({ featureFlagClientClass: unleashClientClass })=>{
    return {
        name: 'Unleash',
        setupOnce () {
            const unleashClientPrototype = unleashClientClass.prototype;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$client$5d$__$28$ecmascript$29$__["fill"])(unleashClientPrototype, 'isEnabled', _wrappedIsEnabled);
        },
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
/**
 * Wraps the UnleashClient.isEnabled method to capture feature flag evaluations. Its only side effect is writing to Sentry scope.
 *
 * This wrapper is safe for all isEnabled signatures. If the signature does not match (this: UnleashClient, toggleName: string, ...args: unknown[]) => boolean,
 * we log an error and return the original result.
 *
 * @param original - The original method.
 * @returns Wrapped method. Results should match the original.
 */ function _wrappedIsEnabled(original) {
    return function(...args) {
        const toggleName = args[0];
        const result = original.apply(this, args);
        if (typeof toggleName === 'string' && typeof result === 'boolean') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(toggleName, result);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(toggleName, result);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].error(`[Feature Flags] UnleashClient.isEnabled does not match expected signature. arg0: ${toggleName} (${typeof toggleName}), result: ${result} (${typeof result})`);
        }
        return result;
    };
}
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/growthbook/integration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "growthbookIntegration",
    ()=>growthbookIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$featureFlags$2f$growthbook$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/featureFlags/growthbook.js [client] (ecmascript)");
;
/**
 * Sentry integration for capturing feature flag evaluations from GrowthBook.
 *
 * See the feature flag documentation: https://develop.sentry.dev/sdk/expected-features/#feature-flags
 *
 * @example
 * ```
 * import { GrowthBook } from '@growthbook/growthbook';
 * import * as Sentry from '@sentry/browser';
 *
 * Sentry.init({
 *   dsn: '___PUBLIC_DSN___',
 *   integrations: [Sentry.growthbookIntegration({ growthbookClass: GrowthBook })],
 * });
 *
 * const gb = new GrowthBook();
 * gb.isOn('my-feature');
 * Sentry.captureException(new Error('something went wrong'));
 * ```
 */ const growthbookIntegration = ({ growthbookClass })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$featureFlags$2f$growthbook$2e$js__$5b$client$5d$__$28$ecmascript$29$__["growthbookIntegration"])({
        growthbookClass
    });
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/statsig/integration.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "statsigIntegration",
    ()=>statsigIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/featureFlags.js [client] (ecmascript)");
;
/**
 * Sentry integration for capturing feature flag evaluations from the Statsig js-client SDK.
 *
 * See the [feature flag documentation](https://develop.sentry.dev/sdk/expected-features/#feature-flags) for more information.
 *
 * @example
 * ```
 * import { StatsigClient } from '@statsig/js-client';
 * import * as Sentry from '@sentry/browser';
 *
 * const statsigClient = new StatsigClient();
 *
 * Sentry.init({
 *   dsn: '___PUBLIC_DSN___',
 *   integrations: [Sentry.statsigIntegration({featureFlagClient: statsigClient})],
 * });
 *
 * await statsigClient.initializeAsync();  // or statsigClient.initializeSync();
 *
 * const result = statsigClient.checkGate('my-feature-gate');
 * Sentry.captureException(new Error('something went wrong'));
 * ```
 */ const statsigIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(({ featureFlagClient: statsigClient })=>{
    return {
        name: 'Statsig',
        setup (_client) {
            statsigClient.on('gate_evaluation', (event)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(event.gate.name, event.gate.value);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(event.gate.name, event.gate.value);
            });
        },
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/diagnose-sdk.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "diagnoseSdkConnectivity",
    ()=>diagnoseSdkConnectivity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/trace.js [client] (ecmascript)");
;
/**
 * A function to diagnose why the SDK might not be successfully sending data.
 *
 * Possible return values wrapped in a Promise:
 * - `"no-client-active"` - There was no active client when the function was called. This possibly means that the SDK was not initialized yet.
 * - `"sentry-unreachable"` - The Sentry SaaS servers were not reachable. This likely means that there is an ad blocker active on the page or that there are other connection issues.
 *
 * If the function doesn't detect an issue it resolves to `undefined`.
 */ async function diagnoseSdkConnectivity() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        return 'no-client-active';
    }
    if (!client.getDsn()) {
        return 'no-dsn-configured';
    }
    // Check if a tunnel is configured and use it if available
    const tunnel = client.getOptions().tunnel;
    // We are using the
    // - "sentry-sdks" org with id 447951 not to pollute any actual organizations.
    // - "diagnose-sdk-connectivity" project with id 4509632503087104
    // - the public key of said org/project, which is disabled in the project settings
    // => this DSN: https://c1dfb07d783ad5325c245c1fd3725390@o447951.ingest.us.sentry.io/4509632503087104 (i.e. disabled)
    const defaultUrl = 'https://o447951.ingest.sentry.io/api/4509632503087104/envelope/?sentry_version=7&sentry_key=c1dfb07d783ad5325c245c1fd3725390&sentry_client=sentry.javascript.browser%2F1.33.7';
    const url = tunnel || defaultUrl;
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["suppressTracing"])(()=>// If fetch throws, there is likely an ad blocker active or there are other connective issues.
            fetch(url, {
                body: '{}',
                method: 'POST',
                mode: 'cors',
                credentials: 'omit'
            }));
    } catch  {
        return 'sentry-unreachable';
    }
}
;
 //# sourceMappingURL=diagnose-sdk.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/webWorker.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTEGRATION_NAME",
    ()=>INTEGRATION_NAME,
    "registerWebWorker",
    ()=>registerWebWorker,
    "webWorkerIntegration",
    ()=>webWorkerIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/globalhandlers.js [client] (ecmascript)");
;
;
;
;
;
const INTEGRATION_NAME = 'WebWorker';
/**
 * Use this integration to set up Sentry with web workers.
 *
 * IMPORTANT: This integration must be added **before** you start listening to
 * any messages from the worker. Otherwise, your message handlers will receive
 * messages from the Sentry SDK which you need to ignore.
 *
 * This integration only has an effect, if you call `Sentry.registerWebWorker(self)`
 * from within the worker(s) you're adding to the integration.
 *
 * Given that you want to initialize the SDK as early as possible, you most likely
 * want to add this integration **after** initializing the SDK:
 *
 * @example:
 * ```ts filename={main.js}
 * import * as Sentry from '@sentry/<your-sdk>';
 *
 * // some time earlier:
 * Sentry.init(...)
 *
 * // 1. Initialize the worker
 * const worker = new Worker(new URL('./worker.ts', import.meta.url));
 *
 * // 2. Add the integration
 * const webWorkerIntegration = Sentry.webWorkerIntegration({ worker });
 * Sentry.addIntegration(webWorkerIntegration);
 *
 * // 3. Register message listeners on the worker
 * worker.addEventListener('message', event => {
 *  // ...
 * });
 * ```
 *
 * If you initialize multiple workers at the same time, you can also pass an array of workers
 * to the integration:
 *
 * ```ts filename={main.js}
 * const webWorkerIntegration = Sentry.webWorkerIntegration({ worker: [worker1, worker2] });
 * Sentry.addIntegration(webWorkerIntegration);
 * ```
 *
 * If you have any additional workers that you initialize at a later point,
 * you can add them to the integration as follows:
 *
 * ```ts filename={main.js}
 * const webWorkerIntegration = Sentry.webWorkerIntegration({ worker: worker1 });
 * Sentry.addIntegration(webWorkerIntegration);
 *
 * // sometime later:
 * webWorkerIntegration.addWorker(worker2);
 * ```
 *
 * Of course, you can also directly add the integration in Sentry.init:
 * ```ts filename={main.js}
 * import * as Sentry from '@sentry/<your-sdk>';
 *
 * // 1. Initialize the worker
 * const worker = new Worker(new URL('./worker.ts', import.meta.url));
 *
 * // 2. Initialize the SDK
 * Sentry.init({
 *  integrations: [Sentry.webWorkerIntegration({ worker })]
 * });
 *
 * // 3. Register message listeners on the worker
 * worker.addEventListener('message', event => {
 *  // ...
 * });
 * ```
 *
 * @param options {WebWorkerIntegrationOptions} Integration options:
 *   - `worker`: The worker instance.
 */ const webWorkerIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defineIntegration"])(({ worker })=>({
        name: INTEGRATION_NAME,
        setupOnce: ()=>{
            (Array.isArray(worker) ? worker : [
                worker
            ]).forEach((w)=>listenForSentryMessages(w));
        },
        addWorker: (worker)=>listenForSentryMessages(worker)
    }));
function listenForSentryMessages(worker) {
    worker.addEventListener('message', (event)=>{
        if (isSentryMessage(event.data)) {
            event.stopImmediatePropagation(); // other listeners should not receive this message
            // Handle debug IDs
            if (event.data._sentryDebugIds) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('Sentry debugId web worker message received', event.data);
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"]._sentryDebugIds = {
                    ...event.data._sentryDebugIds,
                    // debugIds of the main thread have precedence over the worker's in case of a collision.
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"]._sentryDebugIds
                };
            }
            // Handle module metadata
            if (event.data._sentryModuleMetadata) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('Sentry module metadata web worker message received', event.data);
                // Merge worker's raw metadata into the global object
                // It will be parsed lazily when needed by getMetadataForUrl
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"]._sentryModuleMetadata = {
                    ...event.data._sentryModuleMetadata,
                    // Module metadata of the main thread have precedence over the worker's in case of a collision.
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"]._sentryModuleMetadata
                };
            }
            // Handle WASM images from worker
            if (event.data._sentryWasmImages) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('Sentry WASM images web worker message received', event.data);
                const existingImages = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"]._sentryWasmImages || [];
                const newImages = event.data._sentryWasmImages.filter((newImg)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(newImg) && typeof newImg.code_file === 'string' && !existingImages.some((existing)=>existing.code_file === newImg.code_file));
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"]._sentryWasmImages = [
                    ...existingImages,
                    ...newImages
                ];
            }
            // Handle unhandled rejections forwarded from worker
            if (event.data._sentryWorkerError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('Sentry worker rejection message received', event.data._sentryWorkerError);
                handleForwardedWorkerRejection(event.data._sentryWorkerError);
            }
        }
    });
}
function handleForwardedWorkerRejection(workerError) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        return;
    }
    const stackParser = client.getOptions().stackParser;
    const attachStacktrace = client.getOptions().attachStacktrace;
    const error = workerError.reason;
    // Follow same pattern as globalHandlers for unhandledrejection
    // Handle both primitives and errors the same way
    const event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPrimitive"])(error) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_eventFromRejectionWithPrimitive"])(error) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["eventFromUnknownInput"])(stackParser, error, undefined, attachStacktrace, true);
    event.level = 'error';
    // Add worker-specific context
    if (workerError.filename) {
        event.contexts = {
            ...event.contexts,
            worker: {
                filename: workerError.filename
            }
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureEvent"])(event, {
        originalException: error,
        mechanism: {
            handled: false,
            type: 'auto.browser.web_worker.onunhandledrejection'
        }
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('Captured worker unhandled rejection', error);
}
/**
 * Minimal interface for DedicatedWorkerGlobalScope, only requiring the postMessage method.
 * (which is the only thing we need from the worker's global object)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
 *
 * We can't use the actual type because it breaks everyone who doesn't have {"lib": ["WebWorker"]}
 * but uses {"skipLibCheck": true} in their tsconfig.json.
 */ /**
 * Use this function to register the worker with the Sentry SDK.
 *
 * This function will:
 * - Send debug IDs to the parent thread
 * - Send module metadata to the parent thread (for thirdPartyErrorFilterIntegration)
 * - Set up a handler for unhandled rejections in the worker
 * - Forward unhandled rejections to the parent thread for capture
 *
 * Note: Synchronous errors in workers are already captured by globalHandlers.
 * This only handles unhandled promise rejections which don't bubble to the parent.
 *
 * @example
 * ```ts filename={worker.js}
 * import * as Sentry from '@sentry/<your-sdk>';
 *
 * // Do this as early as possible in your worker.
 * Sentry.registerWebWorker({ self });
 *
 * // continue setting up your worker
 * self.postMessage(...)
 * ```
 * @param options {RegisterWebWorkerOptions} Integration options:
 *   - `self`: The worker instance you're calling this function from (self).
 */ function registerWebWorker({ self }) {
    // Send debug IDs and raw module metadata to parent thread
    // The metadata will be parsed lazily on the main thread when needed
    self.postMessage({
        _sentryMessage: true,
        _sentryDebugIds: self._sentryDebugIds ?? undefined,
        _sentryModuleMetadata: self._sentryModuleMetadata ?? undefined
    });
    // Set up unhandledrejection handler inside the worker
    // Following the same pattern as globalHandlers
    // unhandled rejections don't bubble to the parent thread, so we need to handle them here
    self.addEventListener('unhandledrejection', (event)=>{
        const reason = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_getUnhandledRejectionError"])(event);
        // Forward the raw reason to parent thread
        // The parent will handle primitives vs errors the same way globalHandlers does
        const serializedError = {
            reason: reason,
            filename: self.location?.href
        };
        // Forward to parent thread
        self.postMessage({
            _sentryMessage: true,
            _sentryWorkerError: serializedError
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Sentry Worker] Forwarding unhandled rejection to parent', serializedError);
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["debug"].log('[Sentry Worker] Registered worker with unhandled rejection handling');
}
function isSentryMessage(eventData) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(eventData) || eventData._sentryMessage !== true) {
        return false;
    }
    // Must have at least one of: debug IDs, module metadata, worker error, or WASM images
    const hasDebugIds = '_sentryDebugIds' in eventData;
    const hasModuleMetadata = '_sentryModuleMetadata' in eventData;
    const hasWorkerError = '_sentryWorkerError' in eventData;
    const hasWasmImages = '_sentryWasmImages' in eventData;
    if (!hasDebugIds && !hasModuleMetadata && !hasWorkerError && !hasWasmImages) {
        return false;
    }
    // Validate debug IDs if present
    if (hasDebugIds && !((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(eventData._sentryDebugIds) || eventData._sentryDebugIds === undefined)) {
        return false;
    }
    // Validate module metadata if present
    if (hasModuleMetadata && !((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(eventData._sentryModuleMetadata) || eventData._sentryModuleMetadata === undefined)) {
        return false;
    }
    // Validate worker error if present
    if (hasWorkerError && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(eventData._sentryWorkerError)) {
        return false;
    }
    // Validate WASM images if present
    if (hasWasmImages && (!Array.isArray(eventData._sentryWasmImages) || !eventData._sentryWasmImages.every((img)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isPlainObject"])(img) && typeof img.code_file === 'string'))) {
        return false;
    }
    return true;
}
;
 //# sourceMappingURL=webWorker.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrowserClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BrowserClient"],
    "MULTIPLEXED_TRANSPORT_EXTRA_KEY",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$multiplexed$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MULTIPLEXED_TRANSPORT_EXTRA_KEY"],
    "OpenFeatureIntegrationHook",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$openfeature$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["OpenFeatureIntegrationHook"],
    "SDK_VERSION",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SDK_VERSION"],
    "SEMANTIC_ATTRIBUTE_SENTRY_OP",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"],
    "SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"],
    "SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE"],
    "SEMANTIC_ATTRIBUTE_SENTRY_SOURCE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"],
    "Scope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Scope"],
    "WINDOW",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WINDOW"],
    "addBreadcrumb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addBreadcrumb"],
    "addEventProcessor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addEventProcessor"],
    "addIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addIntegration"],
    "breadcrumbsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["breadcrumbsIntegration"],
    "browserApiErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browserapierrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserApiErrorsIntegration"],
    "browserProfilingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserProfilingIntegration"],
    "browserSessionIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browsersession$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserSessionIntegration"],
    "browserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$browserTracingIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["browserTracingIntegration"],
    "buildLaunchDarklyFlagUsedHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$launchdarkly$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["buildLaunchDarklyFlagUsedHandler"],
    "captureConsoleIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$captureconsole$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureConsoleIntegration"],
    "captureEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureEvent"],
    "captureException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureException"],
    "captureFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$feedback$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureFeedback"],
    "captureMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureMessage"],
    "captureSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["captureSession"],
    "chromeStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["chromeStackLineParser"],
    "close",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["close"],
    "consoleLoggingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$console$2d$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["consoleLoggingIntegration"],
    "contextLinesIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$contextlines$2e$js__$5b$client$5d$__$28$ecmascript$29$__["contextLinesIntegration"],
    "continueTrace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["continueTrace"],
    "createConsolaReporter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$consola$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createConsolaReporter"],
    "createLangChainCallbackHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createLangChainCallbackHandler"],
    "createTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$base$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createTransport"],
    "createUserFeedbackEnvelope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$userfeedback$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createUserFeedbackEnvelope"],
    "cultureContextIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$culturecontext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["cultureContextIntegration"],
    "dedupeIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$dedupe$2e$js__$5b$client$5d$__$28$ecmascript$29$__["dedupeIntegration"],
    "defaultRequestInstrumentationOptions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defaultRequestInstrumentationOptions"],
    "defaultStackLineParsers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defaultStackLineParsers"],
    "defaultStackParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["defaultStackParser"],
    "diagnoseSdkConnectivity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$diagnose$2d$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__["diagnoseSdkConnectivity"],
    "endSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["endSession"],
    "eventFiltersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$client$5d$__$28$ecmascript$29$__["eventFiltersIntegration"],
    "eventFromException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["eventFromException"],
    "eventFromMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["eventFromMessage"],
    "exceptionFromError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__["exceptionFromError"],
    "extraErrorDataIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$extraerrordata$2e$js__$5b$client$5d$__$28$ecmascript$29$__["extraErrorDataIntegration"],
    "featureFlagsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$featureFlags$2f$featureFlagsIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["featureFlagsIntegration"],
    "feedbackAsyncIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackAsync$2e$js__$5b$client$5d$__$28$ecmascript$29$__["feedbackAsyncIntegration"],
    "feedbackIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackSync$2e$js__$5b$client$5d$__$28$ecmascript$29$__["feedbackSyncIntegration"],
    "feedbackSyncIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackSync$2e$js__$5b$client$5d$__$28$ecmascript$29$__["feedbackSyncIntegration"],
    "flush",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["flush"],
    "forceLoad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forceLoad"],
    "functionToStringIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$functiontostring$2e$js__$5b$client$5d$__$28$ecmascript$29$__["functionToStringIntegration"],
    "geckoStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["geckoStackLineParser"],
    "getActiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getActiveSpan"],
    "getClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getClient"],
    "getCurrentScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getCurrentScope"],
    "getDefaultIntegrations",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDefaultIntegrations"],
    "getFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFeedback"],
    "getGlobalScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getGlobalScope"],
    "getIsolationScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getIsolationScope"],
    "getReplay",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getReplay"],
    "getRootSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getRootSpan"],
    "getSpanDescendants",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSpanDescendants"],
    "getSpanStatusFromHttpCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getSpanStatusFromHttpCode"],
    "getTraceData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$traceData$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getTraceData"],
    "globalHandlersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["globalHandlersIntegration"],
    "graphqlClientIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$graphqlClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["graphqlClientIntegration"],
    "growthbookIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$growthbook$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["growthbookIntegration"],
    "httpClientIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpclient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["httpClientIntegration"],
    "httpContextIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpcontext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["httpContextIntegration"],
    "inboundFiltersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$client$5d$__$28$ecmascript$29$__["inboundFiltersIntegration"],
    "init",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__["init"],
    "instrumentAnthropicAiClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["instrumentAnthropicAiClient"],
    "instrumentGoogleGenAIClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["instrumentGoogleGenAIClient"],
    "instrumentLangGraph",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["instrumentLangGraph"],
    "instrumentOpenAiClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["instrumentOpenAiClient"],
    "instrumentOutgoingRequests",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$client$5d$__$28$ecmascript$29$__["instrumentOutgoingRequests"],
    "instrumentSupabaseClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$supabase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["instrumentSupabaseClient"],
    "isEnabled",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isEnabled"],
    "isInitialized",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isInitialized"],
    "lastEventId",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["lastEventId"],
    "launchDarklyIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$launchdarkly$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["launchDarklyIntegration"],
    "lazyLoadIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$lazyLoadIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["lazyLoadIntegration"],
    "linkedErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$linkederrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["linkedErrorsIntegration"],
    "logger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__logger$3e$__["logger"],
    "makeBrowserOfflineTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$offline$2e$js__$5b$client$5d$__$28$ecmascript$29$__["makeBrowserOfflineTransport"],
    "makeFetchTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__["makeFetchTransport"],
    "makeMultiplexedTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$multiplexed$2e$js__$5b$client$5d$__$28$ecmascript$29$__["makeMultiplexedTransport"],
    "metrics",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$public$2d$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__metrics$3e$__["metrics"],
    "moduleMetadataIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$moduleMetadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__["moduleMetadataIntegration"],
    "onLoad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onLoad"],
    "openFeatureIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$openfeature$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["openFeatureIntegration"],
    "opera10StackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["opera10StackLineParser"],
    "opera11StackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["opera11StackLineParser"],
    "parameterize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parameterize$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parameterize"],
    "registerSpanErrorInstrumentation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$errors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["registerSpanErrorInstrumentation"],
    "registerWebWorker",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$webWorker$2e$js__$5b$client$5d$__$28$ecmascript$29$__["registerWebWorker"],
    "replayCanvasIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2d$canvas$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["replayCanvasIntegration"],
    "replayIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["replayIntegration"],
    "reportPageLoaded",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$reportPageLoaded$2e$js__$5b$client$5d$__$28$ecmascript$29$__["reportPageLoaded"],
    "reportingObserverIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$reportingobserver$2e$js__$5b$client$5d$__$28$ecmascript$29$__["reportingObserverIntegration"],
    "rewriteFramesIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$rewriteframes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["rewriteFramesIntegration"],
    "sendFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["sendFeedback"],
    "setActiveSpanInBrowser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$setActiveSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setActiveSpanInBrowser"],
    "setContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setContext"],
    "setCurrentClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setCurrentClient"],
    "setExtra",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setExtra"],
    "setExtras",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setExtras"],
    "setHttpStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setHttpStatus"],
    "setMeasurement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$measurement$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setMeasurement"],
    "setTag",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setTag"],
    "setTags",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setTags"],
    "setUser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setUser"],
    "showReportDialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$report$2d$dialog$2e$js__$5b$client$5d$__$28$ecmascript$29$__["showReportDialog"],
    "spanToBaggageHeader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToBaggageHeader"],
    "spanToJSON",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToJSON"],
    "spanToTraceHeader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spanToTraceHeader"],
    "spotlightBrowserIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$spotlight$2e$js__$5b$client$5d$__$28$ecmascript$29$__["spotlightBrowserIntegration"],
    "startBrowserTracingNavigationSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$browserTracingIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startBrowserTracingNavigationSpan"],
    "startBrowserTracingPageLoadSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$browserTracingIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startBrowserTracingPageLoadSpan"],
    "startInactiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startInactiveSpan"],
    "startNewTrace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startNewTrace"],
    "startSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startSession"],
    "startSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startSpan"],
    "startSpanManual",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["startSpanManual"],
    "statsigIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$statsig$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["statsigIntegration"],
    "supabaseIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$supabase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supabaseIntegration"],
    "suppressTracing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["suppressTracing"],
    "thirdPartyErrorFilterIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$third$2d$party$2d$errors$2d$filter$2e$js__$5b$client$5d$__$28$ecmascript$29$__["thirdPartyErrorFilterIntegration"],
    "uiProfiler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["uiProfiler"],
    "unleashIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$unleash$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unleashIntegration"],
    "updateSpanName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["updateSpanName"],
    "webWorkerIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$webWorker$2e$js__$5b$client$5d$__$28$ecmascript$29$__["webWorkerIntegration"],
    "winjsStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__["winjsStackLineParser"],
    "withActiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__["withActiveSpan"],
    "withIsolationScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["withIsolationScope"],
    "withScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["withScope"],
    "zodErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$zoderrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__["zodErrorsIntegration"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackAsync$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/feedbackAsync.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackSync$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/feedbackSync.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$multiplexed$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/transports/multiplexed.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/version.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/scope.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/breadcrumbs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$captureconsole$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/captureconsole.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$feedback$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/feedback.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$console$2d$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/logs/console-integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/trace.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$consola$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/consola.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/langchain/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$base$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/transports/base.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$dedupe$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/dedupe.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/eventFilters.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$extraerrordata$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/extraerrordata.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$featureFlags$2f$featureFlagsIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/featureFlags/featureFlagsIntegration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$functiontostring$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/functiontostring.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$traceData$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/traceData.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/google-genai/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/langgraph/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/openai/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$supabase$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/supabase.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__logger$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/logs/public-api.js [client] (ecmascript) <export * as logger>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$public$2d$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__metrics$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/metrics/public-api.js [client] (ecmascript) <export * as metrics>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$moduleMetadata$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/moduleMetadata.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parameterize$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/parameterize.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$errors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/errors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$rewriteframes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/rewriteframes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/sdk.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$measurement$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/measurement.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$third$2d$party$2d$errors$2d$filter$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/third-party-errors-filter.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$zoderrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/integrations/zoderrors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/transports/fetch.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/stack-parsers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$userfeedback$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/userfeedback.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/sdk.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$report$2d$dialog$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/report-dialog.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$breadcrumbs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/breadcrumbs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/globalhandlers.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpcontext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpcontext.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$linkederrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/linkederrors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browserapierrors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browserapierrors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browsersession$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browsersession.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$lazyLoadIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/utils/lazyLoadIntegration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$reportingobserver$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/reportingobserver.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpclient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpclient.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$contextlines$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/contextlines.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$graphqlClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/graphqlClient.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/replay/build/npm/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2d$canvas$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/replay-canvas/build/npm/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry-internal/feedback/build/npm/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/request.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$browserTracingIntegration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/browserTracingIntegration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$reportPageLoaded$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/reportPageLoaded.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$setActiveSpan$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/tracing/setActiveSpan.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$offline$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/transports/offline.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/profiling/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$spotlight$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/spotlight.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$culturecontext$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/culturecontext.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$launchdarkly$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/launchdarkly/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$openfeature$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/openfeature/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$unleash$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/unleash/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$growthbook$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/growthbook/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$statsig$2f$integration$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/statsig/integration.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$diagnose$2d$sdk$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/diagnose-sdk.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$webWorker$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/browser/build/npm/esm/dev/integrations/webWorker.js [client] (ecmascript)");
}),
]);

//# debugId=be195a5f-a224-409d-4e29-2bad779912fa
//# sourceMappingURL=11ab0_%40sentry_browser_build_npm_esm_dev_6f8ed5c2._.js.map