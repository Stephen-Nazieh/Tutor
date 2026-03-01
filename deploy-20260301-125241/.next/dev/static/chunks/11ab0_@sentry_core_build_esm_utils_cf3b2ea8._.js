;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="1405bd6e-acdf-d67c-8238-d563556f0388")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/version.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SDK_VERSION",
    ()=>SDK_VERSION
]);
// This is a magic string replaced by rollup
const SDK_VERSION = "10.39.0";
;
 //# sourceMappingURL=version.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GLOBAL_OBJ",
    ()=>GLOBAL_OBJ
]);
/** Internal global with common properties and Sentry extensions  */ /** Get's the global object for the current JavaScript runtime */ const GLOBAL_OBJ = globalThis;
;
 //# sourceMappingURL=worldwide.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDOMError",
    ()=>isDOMError,
    "isDOMException",
    ()=>isDOMException,
    "isElement",
    ()=>isElement,
    "isError",
    ()=>isError,
    "isErrorEvent",
    ()=>isErrorEvent,
    "isEvent",
    ()=>isEvent,
    "isInstanceOf",
    ()=>isInstanceOf,
    "isParameterizedString",
    ()=>isParameterizedString,
    "isPlainObject",
    ()=>isPlainObject,
    "isPrimitive",
    ()=>isPrimitive,
    "isRegExp",
    ()=>isRegExp,
    "isRequest",
    ()=>isRequest,
    "isString",
    ()=>isString,
    "isSyntheticEvent",
    ()=>isSyntheticEvent,
    "isThenable",
    ()=>isThenable,
    "isVueViewModel",
    ()=>isVueViewModel
]);
// eslint-disable-next-line @typescript-eslint/unbound-method
const objectToString = Object.prototype.toString;
/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {@link isError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isError(wat) {
    switch(objectToString.call(wat)){
        case '[object Error]':
        case '[object Exception]':
        case '[object DOMException]':
        case '[object WebAssembly.Exception]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}
/**
 * Checks whether given value is an instance of the given built-in class.
 *
 * @param wat The value to be checked
 * @param className
 * @returns A boolean representing the result.
 */ function isBuiltin(wat, className) {
    return objectToString.call(wat) === `[object ${className}]`;
}
/**
 * Checks whether given value's type is ErrorEvent
 * {@link isErrorEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isErrorEvent(wat) {
    return isBuiltin(wat, 'ErrorEvent');
}
/**
 * Checks whether given value's type is DOMError
 * {@link isDOMError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isDOMError(wat) {
    return isBuiltin(wat, 'DOMError');
}
/**
 * Checks whether given value's type is DOMException
 * {@link isDOMException}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isDOMException(wat) {
    return isBuiltin(wat, 'DOMException');
}
/**
 * Checks whether given value's type is a string
 * {@link isString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isString(wat) {
    return isBuiltin(wat, 'String');
}
/**
 * Checks whether given string is parameterized
 * {@link isParameterizedString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isParameterizedString(wat) {
    return typeof wat === 'object' && wat !== null && '__sentry_template_string__' in wat && '__sentry_template_values__' in wat;
}
/**
 * Checks whether given value is a primitive (undefined, null, number, boolean, string, bigint, symbol)
 * {@link isPrimitive}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isPrimitive(wat) {
    return wat === null || isParameterizedString(wat) || typeof wat !== 'object' && typeof wat !== 'function';
}
/**
 * Checks whether given value's type is an object literal, or a class instance.
 * {@link isPlainObject}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isPlainObject(wat) {
    return isBuiltin(wat, 'Object');
}
/**
 * Checks whether given value's type is an Event instance
 * {@link isEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isEvent(wat) {
    return typeof Event !== 'undefined' && isInstanceOf(wat, Event);
}
/**
 * Checks whether given value's type is an Element instance
 * {@link isElement}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isElement(wat) {
    return typeof Element !== 'undefined' && isInstanceOf(wat, Element);
}
/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isRegExp(wat) {
    return isBuiltin(wat, 'RegExp');
}
/**
 * Checks whether given value has a then function.
 * @param wat A value to be checked.
 */ function isThenable(wat) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return Boolean(wat?.then && typeof wat.then === 'function');
}
/**
 * Checks whether given value's type is a SyntheticEvent
 * {@link isSyntheticEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isSyntheticEvent(wat) {
    return isPlainObject(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
}
/**
 * Checks whether given value's type is an instance of provided constructor.
 * {@link isInstanceOf}.
 *
 * @param wat A value to be checked.
 * @param base A constructor to be used in a check.
 * @returns A boolean representing the result.
 */ // TODO: fix in v11, convert any to unknown
// export function isInstanceOf<T>(wat: unknown, base: { new (...args: any[]): T }): wat is T {
function isInstanceOf(wat, base) {
    try {
        return wat instanceof base;
    } catch  {
        return false;
    }
}
/**
 * Checks whether given value's type is a Vue ViewModel or a VNode.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */ function isVueViewModel(wat) {
    // Not using Object.prototype.toString because in Vue 3 it would read the instance's Symbol(Symbol.toStringTag) property.
    // We also need to check for __v_isVNode because Vue 3 component render instances have an internal __v_isVNode property.
    return !!(typeof wat === 'object' && wat !== null && (wat.__isVue || wat._isVue || wat.__v_isVNode));
}
/**
 * Checks whether the given parameter is a Standard Web API Request instance.
 *
 * Returns false if Request is not available in the current runtime.
 */ function isRequest(request) {
    return typeof Request !== 'undefined' && isInstanceOf(request, Request);
}
;
 //# sourceMappingURL=is.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getComponentName",
    ()=>getComponentName,
    "getLocationHref",
    ()=>getLocationHref,
    "htmlTreeAsString",
    ()=>htmlTreeAsString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
const DEFAULT_MAX_STRING_LENGTH = 80;
/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */ function htmlTreeAsString(elem, options = {}) {
    if (!elem) {
        return '<unknown>';
    }
    // try/catch both:
    // - accessing event.target (see getsentry/raven-js#838, #768)
    // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
    // - can throw an exception in some circumstances.
    try {
        let currentElem = elem;
        const MAX_TRAVERSE_HEIGHT = 5;
        const out = [];
        let height = 0;
        let len = 0;
        const separator = ' > ';
        const sepLength = separator.length;
        let nextStr;
        const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
        const maxStringLength = !Array.isArray(options) && options.maxStringLength || DEFAULT_MAX_STRING_LENGTH;
        while(currentElem && height++ < MAX_TRAVERSE_HEIGHT){
            nextStr = _htmlElementAsString(currentElem, keyAttrs);
            // bail out if
            // - nextStr is the 'html' element
            // - the length of the string that would be created exceeds maxStringLength
            //   (ignore this limit if we are on the first iteration)
            if (nextStr === 'html' || height > 1 && len + out.length * sepLength + nextStr.length >= maxStringLength) {
                break;
            }
            out.push(nextStr);
            len += nextStr.length;
            currentElem = currentElem.parentNode;
        }
        return out.reverse().join(separator);
    } catch  {
        return '<unknown>';
    }
}
/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */ function _htmlElementAsString(el, keyAttrs) {
    const elem = el;
    const out = [];
    if (!elem?.tagName) {
        return '';
    }
    // @ts-expect-error WINDOW has HTMLElement
    if (WINDOW.HTMLElement) {
        // If using the component name annotation plugin, this value may be available on the DOM node
        if (elem instanceof HTMLElement && elem.dataset) {
            if (elem.dataset['sentryComponent']) {
                return elem.dataset['sentryComponent'];
            }
            if (elem.dataset['sentryElement']) {
                return elem.dataset['sentryElement'];
            }
        }
    }
    out.push(elem.tagName.toLowerCase());
    // Pairs of attribute keys defined in `serializeAttribute` and their values on element.
    const keyAttrPairs = keyAttrs?.length ? keyAttrs.filter((keyAttr)=>elem.getAttribute(keyAttr)).map((keyAttr)=>[
            keyAttr,
            elem.getAttribute(keyAttr)
        ]) : null;
    if (keyAttrPairs?.length) {
        keyAttrPairs.forEach((keyAttrPair)=>{
            out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
        });
    } else {
        if (elem.id) {
            out.push(`#${elem.id}`);
        }
        const className = elem.className;
        if (className && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isString"])(className)) {
            const classes = className.split(/\s+/);
            for (const c of classes){
                out.push(`.${c}`);
            }
        }
    }
    const allowedAttrs = [
        'aria-label',
        'type',
        'name',
        'title',
        'alt'
    ];
    for (const k of allowedAttrs){
        const attr = elem.getAttribute(k);
        if (attr) {
            out.push(`[${k}="${attr}"]`);
        }
    }
    return out.join('');
}
/**
 * A safe form of location.href
 */ function getLocationHref() {
    try {
        return WINDOW.document.location.href;
    } catch  {
        return '';
    }
}
/**
 * Given a DOM element, traverses up the tree until it finds the first ancestor node
 * that has the `data-sentry-component` or `data-sentry-element` attribute with `data-sentry-component` taking
 * precedence. This attribute is added at build-time by projects that have the component name annotation plugin installed.
 *
 * @returns a string representation of the component for the provided DOM element, or `null` if not found
 */ function getComponentName(elem) {
    // @ts-expect-error WINDOW has HTMLElement
    if (!WINDOW.HTMLElement) {
        return null;
    }
    let currentElem = elem;
    const MAX_TRAVERSE_HEIGHT = 5;
    for(let i = 0; i < MAX_TRAVERSE_HEIGHT; i++){
        if (!currentElem) {
            return null;
        }
        if (currentElem instanceof HTMLElement) {
            if (currentElem.dataset['sentryComponent']) {
                return currentElem.dataset['sentryComponent'];
            }
            if (currentElem.dataset['sentryElement']) {
                return currentElem.dataset['sentryElement'];
            }
        }
        currentElem = currentElem.parentNode;
    }
    return null;
}
;
 //# sourceMappingURL=browser.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONSOLE_LEVELS",
    ()=>CONSOLE_LEVELS,
    "consoleSandbox",
    ()=>consoleSandbox,
    "debug",
    ()=>debug,
    "originalConsoleMethods",
    ()=>originalConsoleMethods
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/carrier.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
;
const CONSOLE_LEVELS = [
    'debug',
    'info',
    'warn',
    'error',
    'log',
    'assert',
    'trace'
];
/** Prefix for logging strings */ const PREFIX = 'Sentry Logger ';
/** This may be mutated by the console instrumentation. */ const originalConsoleMethods = {};
/**
 * Temporarily disable sentry console instrumentations.
 *
 * @param callback The function to run against the original `console` messages
 * @returns The results of the callback
 */ function consoleSandbox(callback) {
    if (!('console' in __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"])) {
        return callback();
    }
    const console = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].console;
    const wrappedFuncs = {};
    const wrappedLevels = Object.keys(originalConsoleMethods);
    // Restore all wrapped console methods
    wrappedLevels.forEach((level)=>{
        const originalConsoleMethod = originalConsoleMethods[level];
        wrappedFuncs[level] = console[level];
        console[level] = originalConsoleMethod;
    });
    try {
        return callback();
    } finally{
        // Revert restoration to wrapped state
        wrappedLevels.forEach((level)=>{
            console[level] = wrappedFuncs[level];
        });
    }
}
function enable() {
    _getLoggerSettings().enabled = true;
}
function disable() {
    _getLoggerSettings().enabled = false;
}
function isEnabled() {
    return _getLoggerSettings().enabled;
}
function log(...args) {
    _maybeLog('log', ...args);
}
function warn(...args) {
    _maybeLog('warn', ...args);
}
function error(...args) {
    _maybeLog('error', ...args);
}
function _maybeLog(level, ...args) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
        return;
    }
    if (isEnabled()) {
        consoleSandbox(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].console[level](`${PREFIX}[${level}]:`, ...args);
        });
    }
}
function _getLoggerSettings() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
        return {
            enabled: false
        };
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalSingleton"])('loggerSettings', ()=>({
            enabled: false
        }));
}
/**
 * This is a logger singleton which either logs things or no-ops if logging is not enabled.
 */ const debug = {
    /** Enable logging. */ enable,
    /** Disable logging. */ disable,
    /** Check if logging is enabled. */ isEnabled,
    /** Log a message. */ log,
    /** Log a warning. */ warn,
    /** Log an error. */ error
};
;
 //# sourceMappingURL=debug-logger.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addNonEnumerableProperty",
    ()=>addNonEnumerableProperty,
    "convertToPlainObject",
    ()=>convertToPlainObject,
    "dropUndefinedKeys",
    ()=>dropUndefinedKeys,
    "extractExceptionKeysForMessage",
    ()=>extractExceptionKeysForMessage,
    "fill",
    ()=>fill,
    "getOriginalFunction",
    ()=>getOriginalFunction,
    "markFunctionWrapped",
    ()=>markFunctionWrapped,
    "objectify",
    ()=>objectify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
;
;
;
;
/* eslint-disable @typescript-eslint/no-explicit-any */ /**
 * Replace a method in an object with a wrapped version of itself.
 *
 * If the method on the passed object is not a function, the wrapper will not be applied.
 *
 * @param source An object that contains a method to be wrapped.
 * @param name The name of the method to be wrapped.
 * @param replacementFactory A higher-order function that takes the original version of the given method and returns a
 * wrapped version. Note: The function returned by `replacementFactory` needs to be a non-arrow function, in order to
 * preserve the correct value of `this`, and the original method must be called using `origMethod.call(this, <other
 * args>)` or `origMethod.apply(this, [<other args>])` (rather than being called directly), again to preserve `this`.
 * @returns void
 */ function fill(source, name, replacementFactory) {
    if (!(name in source)) {
        return;
    }
    // explicitly casting to unknown because we don't know the type of the method initially at all
    const original = source[name];
    if (typeof original !== 'function') {
        return;
    }
    const wrapped = replacementFactory(original);
    // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
    // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
    if (typeof wrapped === 'function') {
        markFunctionWrapped(wrapped, original);
    }
    try {
        source[name] = wrapped;
    } catch  {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`Failed to replace method "${name}" in object`, source);
    }
}
/**
 * Defines a non-enumerable property on the given object.
 *
 * @param obj The object on which to set the property
 * @param name The name of the property to be set
 * @param value The value to which to set the property
 */ function addNonEnumerableProperty(obj, name, value) {
    try {
        Object.defineProperty(obj, name, {
            // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
            value: value,
            writable: true,
            configurable: true
        });
    } catch  {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`Failed to add non-enumerable property "${name}" to object`, obj);
    }
}
/**
 * Remembers the original function on the wrapped function and
 * patches up the prototype.
 *
 * @param wrapped the wrapper function
 * @param original the original function that gets wrapped
 */ function markFunctionWrapped(wrapped, original) {
    try {
        const proto = original.prototype || {};
        wrapped.prototype = original.prototype = proto;
        addNonEnumerableProperty(wrapped, '__sentry_original__', original);
    } catch  {} // eslint-disable-line no-empty
}
/**
 * This extracts the original function if available.  See
 * `markFunctionWrapped` for more information.
 *
 * @param func the function to unwrap
 * @returns the unwrapped version of the function if available.
 */ // eslint-disable-next-line @typescript-eslint/ban-types
function getOriginalFunction(func) {
    return func.__sentry_original__;
}
/**
 * Transforms any `Error` or `Event` into a plain object with all of their enumerable properties, and some of their
 * non-enumerable properties attached.
 *
 * @param value Initial source that we have to transform in order for it to be usable by the serializer
 * @returns An Event or Error turned into an object - or the value argument itself, when value is neither an Event nor
 *  an Error.
 */ function convertToPlainObject(value) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(value)) {
        return {
            message: value.message,
            name: value.name,
            stack: value.stack,
            ...getOwnProperties(value)
        };
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEvent"])(value)) {
        const newObj = {
            type: value.type,
            target: serializeEventTarget(value.target),
            currentTarget: serializeEventTarget(value.currentTarget),
            ...getOwnProperties(value)
        };
        if (typeof CustomEvent !== 'undefined' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInstanceOf"])(value, CustomEvent)) {
            newObj.detail = value.detail;
        }
        return newObj;
    } else {
        return value;
    }
}
/** Creates a string representation of the target of an `Event` object */ function serializeEventTarget(target) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["htmlTreeAsString"])(target) : Object.prototype.toString.call(target);
    } catch  {
        return '<unknown>';
    }
}
/** Filters out all but an object's own properties */ function getOwnProperties(obj) {
    if (typeof obj === 'object' && obj !== null) {
        const extractedProps = {};
        for(const property in obj){
            if (Object.prototype.hasOwnProperty.call(obj, property)) {
                extractedProps[property] = obj[property];
            }
        }
        return extractedProps;
    } else {
        return {};
    }
}
/**
 * Given any captured exception, extract its keys and create a sorted
 * and truncated list that will be used inside the event message.
 * eg. `Non-error exception captured with keys: foo, bar, baz`
 */ function extractExceptionKeysForMessage(exception) {
    const keys = Object.keys(convertToPlainObject(exception));
    keys.sort();
    return !keys[0] ? '[object has no keys]' : keys.join(', ');
}
/**
 * Given any object, return a new object having removed all fields whose value was `undefined`.
 * Works recursively on objects and arrays.
 *
 * Attention: This function keeps circular references in the returned object.
 *
 * @deprecated This function is no longer used by the SDK and will be removed in a future major version.
 */ function dropUndefinedKeys(inputValue) {
    // This map keeps track of what already visited nodes map to.
    // Our Set - based memoBuilder doesn't work here because we want to the output object to have the same circular
    // references as the input object.
    const memoizationMap = new Map();
    // This function just proxies `_dropUndefinedKeys` to keep the `memoBuilder` out of this function's API
    return _dropUndefinedKeys(inputValue, memoizationMap);
}
function _dropUndefinedKeys(inputValue, memoizationMap) {
    // Early return for primitive values
    if (inputValue === null || typeof inputValue !== 'object') {
        return inputValue;
    }
    // Check memo map first for all object types
    const memoVal = memoizationMap.get(inputValue);
    if (memoVal !== undefined) {
        return memoVal;
    }
    // handle arrays
    if (Array.isArray(inputValue)) {
        const returnValue = [];
        // Store mapping to handle circular references
        memoizationMap.set(inputValue, returnValue);
        inputValue.forEach((value)=>{
            returnValue.push(_dropUndefinedKeys(value, memoizationMap));
        });
        return returnValue;
    }
    if (isPojo(inputValue)) {
        const returnValue = {};
        // Store mapping to handle circular references
        memoizationMap.set(inputValue, returnValue);
        const keys = Object.keys(inputValue);
        keys.forEach((key)=>{
            const val = inputValue[key];
            if (val !== undefined) {
                returnValue[key] = _dropUndefinedKeys(val, memoizationMap);
            }
        });
        return returnValue;
    }
    // For other object types, return as is
    return inputValue;
}
function isPojo(input) {
    // Plain objects have Object as constructor or no constructor
    const constructor = input.constructor;
    return constructor === Object || constructor === undefined;
}
/**
 * Ensure that something is an object.
 *
 * Turns `undefined` and `null` into `String`s and all other primitives into instances of their respective wrapper
 * classes (String, Boolean, Number, etc.). Acts as the identity function on non-primitives.
 *
 * @param wat The subject of the objectification
 * @returns A version of `wat` which can safely be used with `Object` class methods
 */ function objectify(wat) {
    let objectified;
    switch(true){
        // this will catch both undefined and null
        case wat == undefined:
            objectified = new String(wat);
            break;
        // Though symbols and bigints do have wrapper classes (`Symbol` and `BigInt`, respectively), for whatever reason
        // those classes don't have constructors which can be used with the `new` keyword. We therefore need to cast each as
        // an object in order to wrap it.
        case typeof wat === 'symbol' || typeof wat === 'bigint':
            objectified = Object(wat);
            break;
        // this will catch the remaining primitives: `String`, `Number`, and `Boolean`
        case (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPrimitive"])(wat):
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            objectified = new wat.constructor(wat);
            break;
        // by process of elimination, at this point we know that `wat` must already be an object
        default:
            objectified = wat;
            break;
    }
    return objectified;
}
;
 //# sourceMappingURL=object.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/randomSafeContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "safeDateNow",
    ()=>safeDateNow,
    "safeMathRandom",
    ()=>safeMathRandom,
    "withRandomSafeContext",
    ()=>withRandomSafeContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
// undefined = not yet resolved, null = no runner found, function = runner found
let RESOLVED_RUNNER;
/**
 * Simple wrapper that allows SDKs to *secretly* set context wrapper to generate safe random IDs in cache components contexts
 */ function withRandomSafeContext(cb) {
    // Skips future symbol lookups if we've already resolved (or attempted to resolve) the runner once
    if (RESOLVED_RUNNER !== undefined) {
        return RESOLVED_RUNNER ? RESOLVED_RUNNER(cb) : cb();
    }
    const sym = Symbol.for('__SENTRY_SAFE_RANDOM_ID_WRAPPER__');
    const globalWithSymbol = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
    if (sym in globalWithSymbol && typeof globalWithSymbol[sym] === 'function') {
        RESOLVED_RUNNER = globalWithSymbol[sym];
        return RESOLVED_RUNNER(cb);
    }
    RESOLVED_RUNNER = null;
    return cb();
}
/**
 * Identical to Math.random() but wrapped in withRandomSafeContext
 * to ensure safe random number generation in certain contexts (e.g., Next.js Cache Components).
 */ function safeMathRandom() {
    return withRandomSafeContext(()=>Math.random());
}
/**
 * Identical to Date.now() but wrapped in withRandomSafeContext
 * to ensure safe time value generation in certain contexts (e.g., Next.js Cache Components).
 */ function safeDateNow() {
    return withRandomSafeContext(()=>Date.now());
}
;
 //# sourceMappingURL=randomSafeContext.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UNKNOWN_FUNCTION",
    ()=>UNKNOWN_FUNCTION,
    "createStackParser",
    ()=>createStackParser,
    "getFramesFromEvent",
    ()=>getFramesFromEvent,
    "getFunctionName",
    ()=>getFunctionName,
    "getVueInternalName",
    ()=>getVueInternalName,
    "normalizeStackTracePath",
    ()=>normalizeStackTracePath,
    "stackParserFromStackParserOptions",
    ()=>stackParserFromStackParserOptions,
    "stripSentryFramesAndReverse",
    ()=>stripSentryFramesAndReverse
]);
const STACKTRACE_FRAME_LIMIT = 50;
const UNKNOWN_FUNCTION = '?';
// Used to sanitize webpack (error: *) wrapped stack errors
const WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
const STRIP_FRAME_REGEXP = /captureMessage|captureException/;
/**
 * Creates a stack parser with the supplied line parsers
 *
 * StackFrames are returned in the correct order for Sentry Exception
 * frames and with Sentry SDK internal frames removed from the top and bottom
 *
 */ function createStackParser(...parsers) {
    const sortedParsers = parsers.sort((a, b)=>a[0] - b[0]).map((p)=>p[1]);
    return (stack, skipFirstLines = 0, framesToPop = 0)=>{
        const frames = [];
        const lines = stack.split('\n');
        for(let i = skipFirstLines; i < lines.length; i++){
            let line = lines[i];
            // Truncate lines over 1kb because many of the regular expressions use
            // backtracking which results in run time that increases exponentially
            // with input size. Huge strings can result in hangs/Denial of Service:
            // https://github.com/getsentry/sentry-javascript/issues/2286
            if (line.length > 1024) {
                line = line.slice(0, 1024);
            }
            // https://github.com/getsentry/sentry-javascript/issues/5459
            // Remove webpack (error: *) wrappers
            const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, '$1') : line;
            // https://github.com/getsentry/sentry-javascript/issues/7813
            // Skip Error: lines
            if (cleanedLine.match(/\S*Error: /)) {
                continue;
            }
            for (const parser of sortedParsers){
                const frame = parser(cleanedLine);
                if (frame) {
                    frames.push(frame);
                    break;
                }
            }
            if (frames.length >= STACKTRACE_FRAME_LIMIT + framesToPop) {
                break;
            }
        }
        return stripSentryFramesAndReverse(frames.slice(framesToPop));
    };
}
/**
 * Gets a stack parser implementation from Options.stackParser
 * @see Options
 *
 * If options contains an array of line parsers, it is converted into a parser
 */ function stackParserFromStackParserOptions(stackParser) {
    if (Array.isArray(stackParser)) {
        return createStackParser(...stackParser);
    }
    return stackParser;
}
/**
 * Removes Sentry frames from the top and bottom of the stack if present and enforces a limit of max number of frames.
 * Assumes stack input is ordered from top to bottom and returns the reverse representation so call site of the
 * function that caused the crash is the last frame in the array.
 * @hidden
 */ function stripSentryFramesAndReverse(stack) {
    if (!stack.length) {
        return [];
    }
    const localStack = Array.from(stack);
    // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)
    if (/sentryWrapped/.test(getLastStackFrame(localStack).function || '')) {
        localStack.pop();
    }
    // Reversing in the middle of the procedure allows us to just pop the values off the stack
    localStack.reverse();
    // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)
    if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || '')) {
        localStack.pop();
        // When using synthetic events, we will have a 2 levels deep stack, as `new Error('Sentry syntheticException')`
        // is produced within the scope itself, making it:
        //
        //   Sentry.captureException()
        //   scope.captureException()
        //
        // instead of just the top `Sentry` call itself.
        // This forces us to possibly strip an additional frame in the exact same was as above.
        if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || '')) {
            localStack.pop();
        }
    }
    return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame)=>({
            ...frame,
            filename: frame.filename || getLastStackFrame(localStack).filename,
            function: frame.function || UNKNOWN_FUNCTION
        }));
}
function getLastStackFrame(arr) {
    return arr[arr.length - 1] || {};
}
const defaultFunctionName = '<anonymous>';
/**
 * Safely extract function name from itself
 */ function getFunctionName(fn) {
    try {
        if (!fn || typeof fn !== 'function') {
            return defaultFunctionName;
        }
        return fn.name || defaultFunctionName;
    } catch  {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        return defaultFunctionName;
    }
}
/**
 * Get's stack frames from an event without needing to check for undefined properties.
 */ function getFramesFromEvent(event) {
    const exception = event.exception;
    if (exception) {
        const frames = [];
        try {
            // @ts-expect-error Object could be undefined
            exception.values.forEach((value)=>{
                // @ts-expect-error Value could be undefined
                if (value.stacktrace.frames) {
                    // @ts-expect-error Value could be undefined
                    frames.push(...value.stacktrace.frames);
                }
            });
            return frames;
        } catch  {
            return undefined;
        }
    }
    return undefined;
}
/**
 * Get the internal name of an internal Vue value, to represent it in a stacktrace.
 *
 * @param value The value to get the internal name of.
 */ function getVueInternalName(value) {
    // Check if it's a VNode (has __v_isVNode) or a component instance (has _isVue/__isVue)
    const isVNode = '__v_isVNode' in value && value.__v_isVNode;
    return isVNode ? '[VueVNode]' : '[VueViewModel]';
}
/**
 * Normalizes stack line paths by removing file:// prefix and leading slashes for Windows paths
 */ function normalizeStackTracePath(path) {
    let filename = path?.startsWith('file://') ? path.slice(7) : path;
    // If it's a Windows path, trim the leading slash so that `/C:/foo` becomes `C:/foo`
    if (filename?.match(/\/[A-Z]:/)) {
        filename = filename.slice(1);
    }
    return filename;
}
;
 //# sourceMappingURL=stacktrace.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isMatchingPattern",
    ()=>isMatchingPattern,
    "safeJoin",
    ()=>safeJoin,
    "snipLine",
    ()=>snipLine,
    "stringMatchesSomePattern",
    ()=>stringMatchesSomePattern,
    "truncate",
    ()=>truncate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)");
;
;
/**
 * Truncates given string to the maximum characters count
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string (0 = unlimited)
 * @returns string Encoded
 */ function truncate(str, max = 0) {
    if (typeof str !== 'string' || max === 0) {
        return str;
    }
    return str.length <= max ? str : `${str.slice(0, max)}...`;
}
/**
 * This is basically just `trim_line` from
 * https://github.com/getsentry/sentry/blob/master/src/sentry/lang/javascript/processor.py#L67
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */ function snipLine(line, colno) {
    let newLine = line;
    const lineLength = newLine.length;
    if (lineLength <= 150) {
        return newLine;
    }
    if (colno > lineLength) {
        // eslint-disable-next-line no-param-reassign
        colno = lineLength;
    }
    let start = Math.max(colno - 60, 0);
    if (start < 5) {
        start = 0;
    }
    let end = Math.min(start + 140, lineLength);
    if (end > lineLength - 5) {
        end = lineLength;
    }
    if (end === lineLength) {
        start = Math.max(end - 140, 0);
    }
    newLine = newLine.slice(start, end);
    if (start > 0) {
        newLine = `'{snip} ${newLine}`;
    }
    if (end < lineLength) {
        newLine += ' {snip}';
    }
    return newLine;
}
/**
 * Join values in array
 * @param input array of values to be joined together
 * @param delimiter string to be placed in-between values
 * @returns Joined values
 */ function safeJoin(input, delimiter) {
    if (!Array.isArray(input)) {
        return '';
    }
    const output = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i < input.length; i++){
        const value = input[i];
        try {
            // This is a hack to fix a Vue3-specific bug that causes an infinite loop of
            // console warnings. This happens when a Vue template is rendered with
            // an undeclared variable, which we try to stringify, ultimately causing
            // Vue to issue another warning which repeats indefinitely.
            // see: https://github.com/getsentry/sentry-javascript/pull/8981
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVueViewModel"])(value)) {
                output.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVueInternalName"])(value));
            } else {
                output.push(String(value));
            }
        } catch  {
            output.push('[value cannot be serialized]');
        }
    }
    return output.join(delimiter);
}
/**
 * Checks if the given value matches a regex or string
 *
 * @param value The string to test
 * @param pattern Either a regex or a string against which `value` will be matched
 * @param requireExactStringMatch If true, `value` must match `pattern` exactly. If false, `value` will match
 * `pattern` if it contains `pattern`. Only applies to string-type patterns.
 */ function isMatchingPattern(value, pattern, requireExactStringMatch = false) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isString"])(value)) {
        return false;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRegExp"])(pattern)) {
        return pattern.test(value);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isString"])(pattern)) {
        return requireExactStringMatch ? value === pattern : value.includes(pattern);
    }
    return false;
}
/**
 * Test the given string against an array of strings and regexes. By default, string matching is done on a
 * substring-inclusion basis rather than a strict equality basis
 *
 * @param testString The string to test
 * @param patterns The patterns against which to test the string
 * @param requireExactStringMatch If true, `testString` must match one of the given string patterns exactly in order to
 * count. If false, `testString` will match a string pattern if it contains that pattern.
 * @returns
 */ function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = false) {
    return patterns.some((pattern)=>isMatchingPattern(testString, pattern, requireExactStringMatch));
}
;
 //# sourceMappingURL=string.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addContextToFrame",
    ()=>addContextToFrame,
    "addExceptionMechanism",
    ()=>addExceptionMechanism,
    "addExceptionTypeValue",
    ()=>addExceptionTypeValue,
    "checkOrSetAlreadyCaught",
    ()=>checkOrSetAlreadyCaught,
    "getEventDescription",
    ()=>getEventDescription,
    "parseSemver",
    ()=>parseSemver,
    "uuid4",
    ()=>uuid4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/randomSafeContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
;
;
function getCrypto() {
    const gbl = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
    return gbl.crypto || gbl.msCrypto;
}
let emptyUuid;
function getRandomByte() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeMathRandom"])() * 16;
}
/**
 * UUID4 generator
 * @param crypto Object that provides the crypto API.
 * @returns string Generated UUID4.
 */ function uuid4(crypto = getCrypto()) {
    try {
        if (crypto?.randomUUID) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRandomSafeContext"])(()=>crypto.randomUUID()).replace(/-/g, '');
        }
    } catch  {
    // some runtimes can crash invoking crypto
    // https://github.com/getsentry/sentry-javascript/issues/8935
    }
    if (!emptyUuid) {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        // Concatenating the following numbers as strings results in '10000000100040008000100000000000'
        emptyUuid = [
            1e7
        ] + 1e3 + 4e3 + 8e3 + 1e11;
    }
    return emptyUuid.replace(/[018]/g, (c)=>// eslint-disable-next-line no-bitwise
        (c ^ (getRandomByte() & 15) >> c / 4).toString(16));
}
function getFirstException(event) {
    return event.exception?.values?.[0];
}
/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */ function getEventDescription(event) {
    const { message, event_id: eventId } = event;
    if (message) {
        return message;
    }
    const firstException = getFirstException(event);
    if (firstException) {
        if (firstException.type && firstException.value) {
            return `${firstException.type}: ${firstException.value}`;
        }
        return firstException.type || firstException.value || eventId || '<unknown>';
    }
    return eventId || '<unknown>';
}
/**
 * Adds exception values, type and value to an synthetic Exception.
 * @param event The event to modify.
 * @param value Value of the exception.
 * @param type Type of the exception.
 * @hidden
 */ function addExceptionTypeValue(event, value, type) {
    const exception = event.exception = event.exception || {};
    const values = exception.values = exception.values || [];
    const firstException = values[0] = values[0] || {};
    if (!firstException.value) {
        firstException.value = value || '';
    }
    if (!firstException.type) {
        firstException.type = type || 'Error';
    }
}
/**
 * Adds exception mechanism data to a given event. Uses defaults if the second parameter is not passed.
 *
 * @param event The event to modify.
 * @param newMechanism Mechanism data to add to the event.
 * @hidden
 */ function addExceptionMechanism(event, newMechanism) {
    const firstException = getFirstException(event);
    if (!firstException) {
        return;
    }
    const defaultMechanism = {
        type: 'generic',
        handled: true
    };
    const currentMechanism = firstException.mechanism;
    firstException.mechanism = {
        ...defaultMechanism,
        ...currentMechanism,
        ...newMechanism
    };
    if (newMechanism && 'data' in newMechanism) {
        const mergedData = {
            ...currentMechanism?.data,
            ...newMechanism.data
        };
        firstException.mechanism.data = mergedData;
    }
}
// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
/**
 * Represents Semantic Versioning object
 */ function _parseInt(input) {
    return parseInt(input || '', 10);
}
/**
 * Parses input into a SemVer interface
 * @param input string representation of a semver version
 */ function parseSemver(input) {
    const match = input.match(SEMVER_REGEXP) || [];
    const major = _parseInt(match[1]);
    const minor = _parseInt(match[2]);
    const patch = _parseInt(match[3]);
    return {
        buildmetadata: match[5],
        major: isNaN(major) ? undefined : major,
        minor: isNaN(minor) ? undefined : minor,
        patch: isNaN(patch) ? undefined : patch,
        prerelease: match[4]
    };
}
/**
 * This function adds context (pre/post/line) lines to the provided frame
 *
 * @param lines string[] containing all lines
 * @param frame StackFrame that will be mutated
 * @param linesOfContext number of context lines we want to add pre/post
 */ function addContextToFrame(lines, frame, linesOfContext = 5) {
    // When there is no line number in the frame, attaching context is nonsensical and will even break grouping
    if (frame.lineno === undefined) {
        return;
    }
    const maxLines = lines.length;
    const sourceLine = Math.max(Math.min(maxLines - 1, frame.lineno - 1), 0);
    frame.pre_context = lines.slice(Math.max(0, sourceLine - linesOfContext), sourceLine).map((line)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snipLine"])(line, 0));
    // We guard here to ensure this is not larger than the existing number of lines
    const lineIndex = Math.min(maxLines - 1, sourceLine);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    frame.context_line = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snipLine"])(lines[lineIndex], frame.colno || 0);
    frame.post_context = lines.slice(Math.min(sourceLine + 1, maxLines), sourceLine + 1 + linesOfContext).map((line)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snipLine"])(line, 0));
}
/**
 * Checks whether or not we've already captured the given exception (note: not an identical exception - the very object
 * in question), and marks it captured if not.
 *
 * This is useful because it's possible for an error to get captured by more than one mechanism. After we intercept and
 * record an error, we rethrow it (assuming we've intercepted it before it's reached the top-level global handlers), so
 * that we don't interfere with whatever effects the error might have had were the SDK not there. At that point, because
 * the error has been rethrown, it's possible for it to bubble up to some other code we've instrumented. If it's not
 * caught after that, it will bubble all the way up to the global handlers (which of course we also instrument). This
 * function helps us ensure that even if we encounter the same error more than once, we only record it the first time we
 * see it.
 *
 * Note: It will ignore primitives (always return `false` and not mark them as seen), as properties can't be set on
 * them. {@link: Object.objectify} can be used on exceptions to convert any that are primitives into their equivalent
 * object wrapper forms so that this check will always work. However, because we need to flag the exact object which
 * will get rethrown, and because that rethrowing happens outside of the event processing pipeline, the objectification
 * must be done before the exception captured.
 *
 * @param A thrown exception to check or flag as having been seen
 * @returns `true` if the exception has already been captured, `false` if not (with the side effect of marking it seen)
 */ function checkOrSetAlreadyCaught(exception) {
    if (isAlreadyCaptured(exception)) {
        return true;
    }
    try {
        // set it this way rather than by assignment so that it's not ennumerable and therefore isn't recorded by the
        // `ExtraErrorData` integration
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(exception, '__sentry_captured__', true);
    } catch  {
    // `exception` is a primitive, so we can't mark it seen
    }
    return false;
}
function isAlreadyCaptured(exception) {
    try {
        return exception.__sentry_captured__;
    } catch  {} // eslint-disable-line no-empty
}
;
 //# sourceMappingURL=misc.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/time.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "browserPerformanceTimeOrigin",
    ()=>browserPerformanceTimeOrigin,
    "dateTimestampInSeconds",
    ()=>dateTimestampInSeconds,
    "timestampInSeconds",
    ()=>timestampInSeconds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/randomSafeContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
const ONE_SECOND_IN_MS = 1000;
/**
 * A partial definition of the [Performance Web API]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance}
 * for accessing a high-resolution monotonic clock.
 */ /**
 * Returns a timestamp in seconds since the UNIX epoch using the Date API.
 */ function dateTimestampInSeconds() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDateNow"])() / ONE_SECOND_IN_MS;
}
/**
 * Returns a wrapper around the native Performance API browser implementation, or undefined for browsers that do not
 * support the API.
 *
 * Wrapping the native API works around differences in behavior from different browsers.
 */ function createUnixTimestampInSecondsFunc() {
    const { performance } = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
    // Some browser and environments don't have a performance or timeOrigin, so we fallback to
    // using Date.now() to compute the starting time.
    if (!performance?.now || !performance.timeOrigin) {
        return dateTimestampInSeconds;
    }
    const timeOrigin = performance.timeOrigin;
    // performance.now() is a monotonic clock, which means it starts at 0 when the process begins. To get the current
    // wall clock time (actual UNIX timestamp), we need to add the starting time origin and the current time elapsed.
    //
    // TODO: This does not account for the case where the monotonic clock that powers performance.now() drifts from the
    // wall clock time, which causes the returned timestamp to be inaccurate. We should investigate how to detect and
    // correct for this.
    // See: https://github.com/getsentry/sentry-javascript/issues/2590
    // See: https://github.com/mdn/content/issues/4713
    // See: https://dev.to/noamr/when-a-millisecond-is-not-a-millisecond-3h6
    return ()=>{
        return (timeOrigin + (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRandomSafeContext"])(()=>performance.now())) / ONE_SECOND_IN_MS;
    };
}
let _cachedTimestampInSeconds;
/**
 * Returns a timestamp in seconds since the UNIX epoch using either the Performance or Date APIs, depending on the
 * availability of the Performance API.
 *
 * BUG: Note that because of how browsers implement the Performance API, the clock might stop when the computer is
 * asleep. This creates a skew between `dateTimestampInSeconds` and `timestampInSeconds`. The
 * skew can grow to arbitrary amounts like days, weeks or months.
 * See https://github.com/getsentry/sentry-javascript/issues/2590.
 */ function timestampInSeconds() {
    // We store this in a closure so that we don't have to create a new function every time this is called.
    const func = _cachedTimestampInSeconds ?? (_cachedTimestampInSeconds = createUnixTimestampInSecondsFunc());
    return func();
}
/**
 * Cached result of getBrowserTimeOrigin.
 */ let cachedTimeOrigin = null;
/**
 * Gets the time origin and the mode used to determine it.
 *
 * Unfortunately browsers may report an inaccurate time origin data, through either performance.timeOrigin or
 * performance.timing.navigationStart, which results in poor results in performance data. We only treat time origin
 * data as reliable if they are within a reasonable threshold of the current time.
 *
 * TODO: move to `@sentry/browser-utils` package.
 */ function getBrowserTimeOrigin() {
    const { performance } = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
    if (!performance?.now) {
        return undefined;
    }
    const threshold = 300000; // 5 minutes in milliseconds
    const performanceNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRandomSafeContext"])(()=>performance.now());
    const dateNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDateNow"])();
    const timeOrigin = performance.timeOrigin;
    if (typeof timeOrigin === 'number') {
        const timeOriginDelta = Math.abs(timeOrigin + performanceNow - dateNow);
        if (timeOriginDelta < threshold) {
            return timeOrigin;
        }
    }
    // TODO: Remove all code related to `performance.timing.navigationStart` once we drop support for Safari 14.
    // `performance.timeSince` is available in Safari 15.
    // see: https://caniuse.com/mdn-api_performance_timeorigin
    // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
    // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.
    // Also as of writing, performance.timing is not available in Web Workers in mainstream browsers, so it is not always
    // a valid fallback. In the absence of an initial time provided by the browser, fallback to the current time from the
    // Date API.
    // eslint-disable-next-line deprecation/deprecation
    const navigationStart = performance.timing?.navigationStart;
    if (typeof navigationStart === 'number') {
        const navigationStartDelta = Math.abs(navigationStart + performanceNow - dateNow);
        if (navigationStartDelta < threshold) {
            return navigationStart;
        }
    }
    // Either both timeOrigin and navigationStart are skewed or neither is available, fallback to subtracting
    // `performance.now()` from `Date.now()`.
    return dateNow - performanceNow;
}
/**
 * The number of milliseconds since the UNIX epoch. This value is only usable in a browser, and only when the
 * performance API is available.
 */ function browserPerformanceTimeOrigin() {
    if (cachedTimeOrigin === null) {
        cachedTimeOrigin = getBrowserTimeOrigin();
    }
    return cachedTimeOrigin;
}
;
 //# sourceMappingURL=time.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/merge.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "merge",
    ()=>merge
]);
/**
 * Shallow merge two objects.
 * Does not mutate the passed in objects.
 * Undefined/empty values in the merge object will overwrite existing values.
 *
 * By default, this merges 2 levels deep.
 */ function merge(initialObj, mergeObj, levels = 2) {
    // If the merge value is not an object, or we have no merge levels left,
    // we just set the value to the merge value
    if (!mergeObj || typeof mergeObj !== 'object' || levels <= 0) {
        return mergeObj;
    }
    // If the merge object is an empty object, and the initial object is not undefined, we return the initial object
    if (initialObj && Object.keys(mergeObj).length === 0) {
        return initialObj;
    }
    // Clone object
    const output = {
        ...initialObj
    };
    // Merge values into output, resursively
    for(const key in mergeObj){
        if (Object.prototype.hasOwnProperty.call(mergeObj, key)) {
            output[key] = merge(output[key], mergeObj[key], levels - 1);
        }
    }
    return output;
}
;
 //# sourceMappingURL=merge.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/propagationContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateSpanId",
    ()=>generateSpanId,
    "generateTraceId",
    ()=>generateTraceId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
;
/**
 * Generate a random, valid trace ID.
 */ function generateTraceId() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])();
}
/**
 * Generate a random, valid span ID.
 */ function generateSpanId() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])().substring(16);
}
;
 //# sourceMappingURL=propagationContext.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_getSpanForScope",
    ()=>_getSpanForScope,
    "_setSpanForScope",
    ()=>_setSpanForScope
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
;
const SCOPE_SPAN_FIELD = '_sentrySpan';
/**
 * Set the active span for a given scope.
 * NOTE: This should NOT be used directly, but is only used internally by the trace methods.
 */ function _setSpanForScope(scope, span) {
    if (span) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(scope, SCOPE_SPAN_FIELD, span);
    } else {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete scope[SCOPE_SPAN_FIELD];
    }
}
/**
 * Get the active span for a given scope.
 * NOTE: This should NOT be used directly, but is only used internally by the trace methods.
 */ function _getSpanForScope(scope) {
    return scope[SCOPE_SPAN_FIELD];
}
;
 //# sourceMappingURL=spanOnScope.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/baggage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_BAGGAGE_STRING_LENGTH",
    ()=>MAX_BAGGAGE_STRING_LENGTH,
    "SENTRY_BAGGAGE_KEY_PREFIX",
    ()=>SENTRY_BAGGAGE_KEY_PREFIX,
    "SENTRY_BAGGAGE_KEY_PREFIX_REGEX",
    ()=>SENTRY_BAGGAGE_KEY_PREFIX_REGEX,
    "baggageHeaderToDynamicSamplingContext",
    ()=>baggageHeaderToDynamicSamplingContext,
    "dynamicSamplingContextToSentryBaggageHeader",
    ()=>dynamicSamplingContextToSentryBaggageHeader,
    "objectToBaggageHeader",
    ()=>objectToBaggageHeader,
    "parseBaggageHeader",
    ()=>parseBaggageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
;
;
;
const SENTRY_BAGGAGE_KEY_PREFIX = 'sentry-';
const SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/;
/**
 * Max length of a serialized baggage string
 *
 * https://www.w3.org/TR/baggage/#limits
 */ const MAX_BAGGAGE_STRING_LENGTH = 8192;
/**
 * Takes a baggage header and turns it into Dynamic Sampling Context, by extracting all the "sentry-" prefixed values
 * from it.
 *
 * @param baggageHeader A very bread definition of a baggage header as it might appear in various frameworks.
 * @returns The Dynamic Sampling Context that was found on `baggageHeader`, if there was any, `undefined` otherwise.
 */ function baggageHeaderToDynamicSamplingContext(// Very liberal definition of what any incoming header might look like
baggageHeader) {
    const baggageObject = parseBaggageHeader(baggageHeader);
    if (!baggageObject) {
        return undefined;
    }
    // Read all "sentry-" prefixed values out of the baggage object and put it onto a dynamic sampling context object.
    const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value])=>{
        if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
            const nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
            acc[nonPrefixedKey] = value;
        }
        return acc;
    }, {});
    // Only return a dynamic sampling context object if there are keys in it.
    // A keyless object means there were no sentry values on the header, which means that there is no DSC.
    if (Object.keys(dynamicSamplingContext).length > 0) {
        return dynamicSamplingContext;
    } else {
        return undefined;
    }
}
/**
 * Turns a Dynamic Sampling Object into a baggage header by prefixing all the keys on the object with "sentry-".
 *
 * @param dynamicSamplingContext The Dynamic Sampling Context to turn into a header. For convenience and compatibility
 * with the `getDynamicSamplingContext` method on the Transaction class ,this argument can also be `undefined`. If it is
 * `undefined` the function will return `undefined`.
 * @returns a baggage header, created from `dynamicSamplingContext`, or `undefined` either if `dynamicSamplingContext`
 * was `undefined`, or if `dynamicSamplingContext` didn't contain any values.
 */ function dynamicSamplingContextToSentryBaggageHeader(// this also takes undefined for convenience and bundle size in other places
dynamicSamplingContext) {
    if (!dynamicSamplingContext) {
        return undefined;
    }
    // Prefix all DSC keys with "sentry-" and put them into a new object
    const sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce((acc, [dscKey, dscValue])=>{
        if (dscValue) {
            acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
        }
        return acc;
    }, {});
    return objectToBaggageHeader(sentryPrefixedDSC);
}
/**
 * Take a baggage header and parse it into an object.
 */ function parseBaggageHeader(baggageHeader) {
    if (!baggageHeader || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isString"])(baggageHeader) && !Array.isArray(baggageHeader)) {
        return undefined;
    }
    if (Array.isArray(baggageHeader)) {
        // Combine all baggage headers into one object containing the baggage values so we can later read the Sentry-DSC-values from it
        return baggageHeader.reduce((acc, curr)=>{
            const currBaggageObject = baggageHeaderToObject(curr);
            Object.entries(currBaggageObject).forEach(([key, value])=>{
                acc[key] = value;
            });
            return acc;
        }, {});
    }
    return baggageHeaderToObject(baggageHeader);
}
/**
 * Will parse a baggage header, which is a simple key-value map, into a flat object.
 *
 * @param baggageHeader The baggage header to parse.
 * @returns a flat object containing all the key-value pairs from `baggageHeader`.
 */ function baggageHeaderToObject(baggageHeader) {
    return baggageHeader.split(',').map((baggageEntry)=>{
        const eqIdx = baggageEntry.indexOf('=');
        if (eqIdx === -1) {
            // Likely an invalid entry
            return [];
        }
        const key = baggageEntry.slice(0, eqIdx);
        const value = baggageEntry.slice(eqIdx + 1);
        return [
            key,
            value
        ].map((keyOrValue)=>{
            try {
                return decodeURIComponent(keyOrValue.trim());
            } catch  {
                // We ignore errors here, e.g. if the value cannot be URL decoded.
                // This will then be skipped in the next step
                return;
            }
        });
    }).reduce((acc, [key, value])=>{
        if (key && value) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
/**
 * Turns a flat object (key-value pairs) into a baggage header, which is also just key-value pairs.
 *
 * @param object The object to turn into a baggage header.
 * @returns a baggage header string, or `undefined` if the object didn't have any values, since an empty baggage header
 * is not spec compliant.
 */ function objectToBaggageHeader(object) {
    if (Object.keys(object).length === 0) {
        // An empty baggage header is not spec compliant: We return undefined.
        return undefined;
    }
    return Object.entries(object).reduce((baggageHeader, [objectKey, objectValue], currentIndex)=>{
        const baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`;
        const newBaggageHeader = currentIndex === 0 ? baggageEntry : `${baggageHeader},${baggageEntry}`;
        if (newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn(`Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`);
            return baggageHeader;
        } else {
            return newBaggageHeader;
        }
    }, '');
}
;
 //# sourceMappingURL=baggage.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleCallbackErrors",
    ()=>handleCallbackErrors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
;
/* eslint-disable */ // Vendor "Awaited" in to be TS 3.8 compatible
/**
 * Wrap a callback function with error handling.
 * If an error is thrown, it will be passed to the `onError` callback and re-thrown.
 *
 * If the return value of the function is a promise, it will be handled with `maybeHandlePromiseRejection`.
 *
 * If an `onFinally` callback is provided, this will be called when the callback has finished
 * - so if it returns a promise, once the promise resolved/rejected,
 * else once the callback has finished executing.
 * The `onFinally` callback will _always_ be called, no matter if an error was thrown or not.
 */ function handleCallbackErrors(fn, onError, onFinally = ()=>{}, onSuccess = ()=>{}) {
    let maybePromiseResult;
    try {
        maybePromiseResult = fn();
    } catch (e) {
        onError(e);
        onFinally();
        throw e;
    }
    return maybeHandlePromiseRejection(maybePromiseResult, onError, onFinally, onSuccess);
}
/**
 * Maybe handle a promise rejection.
 * This expects to be given a value that _may_ be a promise, or any other value.
 * If it is a promise, and it rejects, it will call the `onError` callback.
 * Other than this, it will generally return the given value as-is.
 */ function maybeHandlePromiseRejection(value, onError, onFinally, onSuccess) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isThenable"])(value)) {
        // @ts-expect-error - the isThenable check returns the "wrong" type here
        return value.then((res)=>{
            onFinally();
            onSuccess(res);
            return res;
        }, (e)=>{
            onError(e);
            onFinally();
            throw e;
        });
    }
    onFinally();
    onSuccess(value);
    return value;
}
;
 //# sourceMappingURL=handleCallbackErrors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasSpansEnabled",
    ()=>hasSpansEnabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
;
// Treeshakable guard to remove all code related to tracing
/**
 * Determines if span recording is currently enabled.
 *
 * Spans are recorded when at least one of `tracesSampleRate` and `tracesSampler`
 * is defined in the SDK config. This function does not make any assumption about
 * sampling decisions, it only checks if the SDK is configured to record spans.
 *
 * Important: This function only determines if span recording is enabled. Trace
 * continuation and propagation is separately controlled and not covered by this function.
 * If this function returns `false`, traces can still be propagated (which is what
 * we refer to by "Tracing without Performance")
 * @see https://develop.sentry.dev/sdk/telemetry/traces/tracing-without-performance/
 *
 * @param maybeOptions An SDK options object to be passed to this function.
 * If this option is not provided, the function will use the current client's options.
 */ function hasSpansEnabled(maybeOptions) {
    if (typeof __SENTRY_TRACING__ === 'boolean' && !__SENTRY_TRACING__) {
        return false;
    }
    const options = maybeOptions || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])()?.getOptions();
    return !!options && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
    (options.tracesSampleRate != null || !!options.tracesSampler);
}
;
 //# sourceMappingURL=hasSpansEnabled.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/parseSampleRate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseSampleRate",
    ()=>parseSampleRate
]);
/**
 * Parse a sample rate from a given value.
 * This will either return a boolean or number sample rate, if the sample rate is valid (between 0 and 1).
 * If a string is passed, we try to convert it to a number.
 *
 * Any invalid sample rate will return `undefined`.
 */ function parseSampleRate(sampleRate) {
    if (typeof sampleRate === 'boolean') {
        return Number(sampleRate);
    }
    const rate = typeof sampleRate === 'string' ? parseFloat(sampleRate) : sampleRate;
    if (typeof rate !== 'number' || isNaN(rate) || rate < 0 || rate > 1) {
        return undefined;
    }
    return rate;
}
;
 //# sourceMappingURL=parseSampleRate.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/dsn.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dsnFromString",
    ()=>dsnFromString,
    "dsnToString",
    ()=>dsnToString,
    "extractOrgIdFromClient",
    ()=>extractOrgIdFromClient,
    "extractOrgIdFromDsnHost",
    ()=>extractOrgIdFromDsnHost,
    "makeDsn",
    ()=>makeDsn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
;
;
/** Regular expression used to extract org ID from a DSN host. */ const ORG_ID_REGEX = /^o(\d+)\./;
/** Regular expression used to parse a Dsn. */ const DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;
function isValidProtocol(protocol) {
    return protocol === 'http' || protocol === 'https';
}
/**
 * Renders the string representation of this Dsn.
 *
 * By default, this will render the public representation without the password
 * component. To get the deprecated private representation, set `withPassword`
 * to true.
 *
 * @param withPassword When set to true, the password will be included.
 */ function dsnToString(dsn, withPassword = false) {
    const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
    return `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ''}` + `@${host}${port ? `:${port}` : ''}/${path ? `${path}/` : path}${projectId}`;
}
/**
 * Parses a Dsn from a given string.
 *
 * @param str A Dsn as string
 * @returns Dsn as DsnComponents or undefined if @param str is not a valid DSN string
 */ function dsnFromString(str) {
    const match = DSN_REGEX.exec(str);
    if (!match) {
        // This should be logged to the console
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["consoleSandbox"])(()=>{
            // eslint-disable-next-line no-console
            console.error(`Invalid Sentry Dsn: ${str}`);
        });
        return undefined;
    }
    const [protocol, publicKey, pass = '', host = '', port = '', lastPath = ''] = match.slice(1);
    let path = '';
    let projectId = lastPath;
    const split = projectId.split('/');
    if (split.length > 1) {
        path = split.slice(0, -1).join('/');
        projectId = split.pop();
    }
    if (projectId) {
        const projectMatch = projectId.match(/^\d+/);
        if (projectMatch) {
            projectId = projectMatch[0];
        }
    }
    return dsnFromComponents({
        host,
        pass,
        path,
        projectId,
        port,
        protocol: protocol,
        publicKey
    });
}
function dsnFromComponents(components) {
    return {
        protocol: components.protocol,
        publicKey: components.publicKey || '',
        pass: components.pass || '',
        host: components.host,
        port: components.port || '',
        path: components.path || '',
        projectId: components.projectId
    };
}
function validateDsn(dsn) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
        return true;
    }
    const { port, projectId, protocol } = dsn;
    const requiredComponents = [
        'protocol',
        'publicKey',
        'host',
        'projectId'
    ];
    const hasMissingRequiredComponent = requiredComponents.find((component)=>{
        if (!dsn[component]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error(`Invalid Sentry Dsn: ${component} missing`);
            return true;
        }
        return false;
    });
    if (hasMissingRequiredComponent) {
        return false;
    }
    if (!projectId.match(/^\d+$/)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
        return false;
    }
    if (!isValidProtocol(protocol)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
        return false;
    }
    if (port && isNaN(parseInt(port, 10))) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error(`Invalid Sentry Dsn: Invalid port ${port}`);
        return false;
    }
    return true;
}
/**
 * Extract the org ID from a DSN host.
 *
 * @param host The host from a DSN
 * @returns The org ID if found, undefined otherwise
 */ function extractOrgIdFromDsnHost(host) {
    const match = host.match(ORG_ID_REGEX);
    return match?.[1];
}
/**
 *  Returns the organization ID of the client.
 *
 *  The organization ID is extracted from the DSN. If the client options include a `orgId`, this will always take precedence.
 */ function extractOrgIdFromClient(client) {
    const options = client.getOptions();
    const { host } = client.getDsn() || {};
    let org_id;
    if (options.orgId) {
        org_id = String(options.orgId);
    } else if (host) {
        org_id = extractOrgIdFromDsnHost(host);
    }
    return org_id;
}
/**
 * Creates a valid Sentry Dsn object, identifying a Sentry instance and project.
 * @returns a valid DsnComponents object or `undefined` if @param from is an invalid DSN source
 */ function makeDsn(from) {
    const components = typeof from === 'string' ? dsnFromString(from) : dsnFromComponents(from);
    if (!components || !validateDsn(components)) {
        return undefined;
    }
    return components;
}
;
 //# sourceMappingURL=dsn.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/tracing.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TRACEPARENT_REGEXP",
    ()=>TRACEPARENT_REGEXP,
    "extractTraceparentData",
    ()=>extractTraceparentData,
    "generateSentryTraceHeader",
    ()=>generateSentryTraceHeader,
    "generateTraceparentHeader",
    ()=>generateTraceparentHeader,
    "propagationContextFromHeaders",
    ()=>propagationContextFromHeaders,
    "shouldContinueTrace",
    ()=>shouldContinueTrace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/baggage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/dsn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parseSampleRate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/parseSampleRate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/propagationContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/randomSafeContext.js [app-client] (ecmascript)");
;
;
;
;
;
;
// eslint-disable-next-line @sentry-internal/sdk/no-regexp-constructor -- RegExp is used for readability here
const TRACEPARENT_REGEXP = new RegExp('^[ \\t]*' + // whitespace
'([0-9a-f]{32})?' + // trace_id
'-?([0-9a-f]{16})?' + // span_id
'-?([01])?' + // sampled
'[ \\t]*$');
/**
 * Extract transaction context data from a `sentry-trace` header.
 *
 * This is terrible naming but the function has nothing to do with the W3C traceparent header.
 * It can only parse the `sentry-trace` header and extract the "trace parent" data.
 *
 * @param traceparent Traceparent string
 *
 * @returns Object containing data from the header, or undefined if traceparent string is malformed
 */ function extractTraceparentData(traceparent) {
    if (!traceparent) {
        return undefined;
    }
    const matches = traceparent.match(TRACEPARENT_REGEXP);
    if (!matches) {
        return undefined;
    }
    let parentSampled;
    if (matches[3] === '1') {
        parentSampled = true;
    } else if (matches[3] === '0') {
        parentSampled = false;
    }
    return {
        traceId: matches[1],
        parentSampled,
        parentSpanId: matches[2]
    };
}
/**
 * Create a propagation context from incoming headers or
 * creates a minimal new one if the headers are undefined.
 */ function propagationContextFromHeaders(sentryTrace, baggage) {
    const traceparentData = extractTraceparentData(sentryTrace);
    const dynamicSamplingContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baggageHeaderToDynamicSamplingContext"])(baggage);
    if (!traceparentData?.traceId) {
        return {
            traceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTraceId"])(),
            sampleRand: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeMathRandom"])()
        };
    }
    const sampleRand = getSampleRandFromTraceparentAndDsc(traceparentData, dynamicSamplingContext);
    // The sample_rand on the DSC needs to be generated based on traceparent + baggage.
    if (dynamicSamplingContext) {
        dynamicSamplingContext.sample_rand = sampleRand.toString();
    }
    const { traceId, parentSpanId, parentSampled } = traceparentData;
    return {
        traceId,
        parentSpanId,
        sampled: parentSampled,
        dsc: dynamicSamplingContext || {},
        sampleRand
    };
}
/**
 * Create sentry-trace header from span context values.
 */ function generateSentryTraceHeader(traceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTraceId"])(), spanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSpanId"])(), sampled) {
    let sampledString = '';
    if (sampled !== undefined) {
        sampledString = sampled ? '-1' : '-0';
    }
    return `${traceId}-${spanId}${sampledString}`;
}
/**
 * Creates a W3C traceparent header from the given trace and span ids.
 */ function generateTraceparentHeader(traceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTraceId"])(), spanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSpanId"])(), sampled) {
    return `00-${traceId}-${spanId}-${sampled ? '01' : '00'}`;
}
/**
 * Given any combination of an incoming trace, generate a sample rand based on its defined semantics.
 *
 * Read more: https://develop.sentry.dev/sdk/telemetry/traces/#propagated-random-value
 */ function getSampleRandFromTraceparentAndDsc(traceparentData, dsc) {
    // When there is an incoming sample rand use it.
    const parsedSampleRand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parseSampleRate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseSampleRate"])(dsc?.sample_rand);
    if (parsedSampleRand !== undefined) {
        return parsedSampleRand;
    }
    // Otherwise, if there is an incoming sampling decision + sample rate, generate a sample rand that would lead to the same sampling decision.
    const parsedSampleRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parseSampleRate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseSampleRate"])(dsc?.sample_rate);
    if (parsedSampleRate && traceparentData?.parentSampled !== undefined) {
        return traceparentData.parentSampled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeMathRandom"])() * parsedSampleRate : parsedSampleRate + (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeMathRandom"])() * (1 - parsedSampleRate);
    } else {
        // If nothing applies, return a random sample rand.
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeMathRandom"])();
    }
}
/**
 * Determines whether a new trace should be continued based on the provided baggage org ID and the client's `strictTraceContinuation` option.
 * If the trace should not be continued, a new trace will be started.
 *
 * The result is dependent on the `strictTraceContinuation` option in the client.
 * See https://develop.sentry.dev/sdk/telemetry/traces/#stricttracecontinuation
 */ function shouldContinueTrace(client, baggageOrgId) {
    const clientOrgId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractOrgIdFromClient"])(client);
    // Case: baggage orgID and Client orgID don't match - always start new trace
    if (baggageOrgId && clientOrgId && baggageOrgId !== clientOrgId) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`Won't continue trace because org IDs don't match (incoming baggage: ${baggageOrgId}, SDK options: ${clientOrgId})`);
        return false;
    }
    const strictTraceContinuation = client.getOptions().strictTraceContinuation || false; // default for `strictTraceContinuation` is `false`
    if (strictTraceContinuation) {
        // With strict continuation enabled, don't continue trace if:
        // - Baggage has orgID, but Client doesn't have one
        // - Client has orgID, but baggage doesn't have one
        if (baggageOrgId && !clientOrgId || !baggageOrgId && clientOrgId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`Starting a new trace because strict trace continuation is enabled but one org ID is missing (incoming baggage: ${baggageOrgId}, Sentry client: ${clientOrgId})`);
            return false;
        }
    }
    return true;
}
;
 //# sourceMappingURL=tracing.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TRACE_FLAG_NONE",
    ()=>TRACE_FLAG_NONE,
    "TRACE_FLAG_SAMPLED",
    ()=>TRACE_FLAG_SAMPLED,
    "addChildSpanToSpan",
    ()=>addChildSpanToSpan,
    "convertSpanLinksForEnvelope",
    ()=>convertSpanLinksForEnvelope,
    "getActiveSpan",
    ()=>getActiveSpan,
    "getRootSpan",
    ()=>getRootSpan,
    "getSpanDescendants",
    ()=>getSpanDescendants,
    "getStatusMessage",
    ()=>getStatusMessage,
    "removeChildSpanFromSpan",
    ()=>removeChildSpanFromSpan,
    "showSpanDropWarning",
    ()=>showSpanDropWarning,
    "spanIsSampled",
    ()=>spanIsSampled,
    "spanTimeInputToSeconds",
    ()=>spanTimeInputToSeconds,
    "spanToJSON",
    ()=>spanToJSON,
    "spanToTraceContext",
    ()=>spanToTraceContext,
    "spanToTraceHeader",
    ()=>spanToTraceHeader,
    "spanToTraceparentHeader",
    ()=>spanToTraceparentHeader,
    "spanToTransactionTraceContext",
    ()=>spanToTransactionTraceContext,
    "updateSpanName",
    ()=>updateSpanName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$asyncContext$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/asyncContext/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/carrier.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/propagationContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/time.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/tracing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [app-client] (ecmascript)");
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
// These are aligned with OpenTelemetry trace flags
const TRACE_FLAG_NONE = 0x0;
const TRACE_FLAG_SAMPLED = 0x1;
let hasShownSpanDropWarning = false;
/**
 * Convert a span to a trace context, which can be sent as the `trace` context in an event.
 * By default, this will only include trace_id, span_id & parent_span_id.
 * If `includeAllData` is true, it will also include data, op, status & origin.
 */ function spanToTransactionTraceContext(span) {
    const { spanId: span_id, traceId: trace_id } = span.spanContext();
    const { data, op, parent_span_id, status, origin, links } = spanToJSON(span);
    return {
        parent_span_id,
        span_id,
        trace_id,
        data,
        op,
        status,
        origin,
        links
    };
}
/**
 * Convert a span to a trace context, which can be sent as the `trace` context in a non-transaction event.
 */ function spanToTraceContext(span) {
    const { spanId, traceId: trace_id, isRemote } = span.spanContext();
    // If the span is remote, we use a random/virtual span as span_id to the trace context,
    // and the remote span as parent_span_id
    const parent_span_id = isRemote ? spanId : spanToJSON(span).parent_span_id;
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCapturedScopesOnSpan"])(span).scope;
    const span_id = isRemote ? scope?.getPropagationContext().propagationSpanId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$propagationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSpanId"])() : spanId;
    return {
        parent_span_id,
        span_id,
        trace_id
    };
}
/**
 * Convert a Span to a Sentry trace header.
 */ function spanToTraceHeader(span) {
    const { traceId, spanId } = span.spanContext();
    const sampled = spanIsSampled(span);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSentryTraceHeader"])(traceId, spanId, sampled);
}
/**
 * Convert a Span to a W3C traceparent header.
 */ function spanToTraceparentHeader(span) {
    const { traceId, spanId } = span.spanContext();
    const sampled = spanIsSampled(span);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTraceparentHeader"])(traceId, spanId, sampled);
}
/**
 *  Converts the span links array to a flattened version to be sent within an envelope.
 *
 *  If the links array is empty, it returns `undefined` so the empty value can be dropped before it's sent.
 */ function convertSpanLinksForEnvelope(links) {
    if (links && links.length > 0) {
        return links.map(({ context: { spanId, traceId, traceFlags, ...restContext }, attributes })=>({
                span_id: spanId,
                trace_id: traceId,
                sampled: traceFlags === TRACE_FLAG_SAMPLED,
                attributes,
                ...restContext
            }));
    } else {
        return undefined;
    }
}
/**
 * Convert a span time input into a timestamp in seconds.
 */ function spanTimeInputToSeconds(input) {
    if (typeof input === 'number') {
        return ensureTimestampInSeconds(input);
    }
    if (Array.isArray(input)) {
        // See {@link HrTime} for the array-based time format
        return input[0] + input[1] / 1e9;
    }
    if (input instanceof Date) {
        return ensureTimestampInSeconds(input.getTime());
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timestampInSeconds"])();
}
/**
 * Converts a timestamp to second, if it was in milliseconds, or keeps it as second.
 */ function ensureTimestampInSeconds(timestamp) {
    const isMs = timestamp > 9999999999;
    return isMs ? timestamp / 1000 : timestamp;
}
/**
 * Convert a span to a JSON representation.
 */ // Note: Because of this, we currently have a circular type dependency (which we opted out of in package.json).
// This is not avoidable as we need `spanToJSON` in `spanUtils.ts`, which in turn is needed by `span.ts` for backwards compatibility.
// And `spanToJSON` needs the Span class from `span.ts` to check here.
function spanToJSON(span) {
    if (spanIsSentrySpan(span)) {
        return span.getSpanJSON();
    }
    const { spanId: span_id, traceId: trace_id } = span.spanContext();
    // Handle a span from @opentelemetry/sdk-base-trace's `Span` class
    if (spanIsOpenTelemetrySdkTraceBaseSpan(span)) {
        const { attributes, startTime, name, endTime, status, links } = span;
        // In preparation for the next major of OpenTelemetry, we want to support
        // looking up the parent span id according to the new API
        // In OTel v1, the parent span id is accessed as `parentSpanId`
        // In OTel v2, the parent span id is accessed as `spanId` on the `parentSpanContext`
        const parentSpanId = 'parentSpanId' in span ? span.parentSpanId : 'parentSpanContext' in span ? span.parentSpanContext?.spanId : undefined;
        return {
            span_id,
            trace_id,
            data: attributes,
            description: name,
            parent_span_id: parentSpanId,
            start_timestamp: spanTimeInputToSeconds(startTime),
            // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
            timestamp: spanTimeInputToSeconds(endTime) || undefined,
            status: getStatusMessage(status),
            op: attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]],
            origin: attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]],
            links: convertSpanLinksForEnvelope(links)
        };
    }
    // Finally, at least we have `spanContext()`....
    // This should not actually happen in reality, but we need to handle it for type safety.
    return {
        span_id,
        trace_id,
        start_timestamp: 0,
        data: {}
    };
}
function spanIsOpenTelemetrySdkTraceBaseSpan(span) {
    const castSpan = span;
    return !!castSpan.attributes && !!castSpan.startTime && !!castSpan.name && !!castSpan.endTime && !!castSpan.status;
}
/** Exported only for tests. */ /**
 * Sadly, due to circular dependency checks we cannot actually import the Span class here and check for instanceof.
 * :( So instead we approximate this by checking if it has the `getSpanJSON` method.
 */ function spanIsSentrySpan(span) {
    return typeof span.getSpanJSON === 'function';
}
/**
 * Returns true if a span is sampled.
 * In most cases, you should just use `span.isRecording()` instead.
 * However, this has a slightly different semantic, as it also returns false if the span is finished.
 * So in the case where this distinction is important, use this method.
 */ function spanIsSampled(span) {
    // We align our trace flags with the ones OpenTelemetry use
    // So we also check for sampled the same way they do.
    const { traceFlags } = span.spanContext();
    return traceFlags === TRACE_FLAG_SAMPLED;
}
/** Get the status message to use for a JSON representation of a span. */ function getStatusMessage(status) {
    if (!status || status.code === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_UNSET"]) {
        return undefined;
    }
    if (status.code === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_OK"]) {
        return 'ok';
    }
    return status.message || 'internal_error';
}
const CHILD_SPANS_FIELD = '_sentryChildSpans';
const ROOT_SPAN_FIELD = '_sentryRootSpan';
/**
 * Adds an opaque child span reference to a span.
 */ function addChildSpanToSpan(span, childSpan) {
    // We store the root span reference on the child span
    // We need this for `getRootSpan()` to work
    const rootSpan = span[ROOT_SPAN_FIELD] || span;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(childSpan, ROOT_SPAN_FIELD, rootSpan);
    // We store a list of child spans on the parent span
    // We need this for `getSpanDescendants()` to work
    if (span[CHILD_SPANS_FIELD]) {
        span[CHILD_SPANS_FIELD].add(childSpan);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(span, CHILD_SPANS_FIELD, new Set([
            childSpan
        ]));
    }
}
/** This is only used internally by Idle Spans. */ function removeChildSpanFromSpan(span, childSpan) {
    if (span[CHILD_SPANS_FIELD]) {
        span[CHILD_SPANS_FIELD].delete(childSpan);
    }
}
/**
 * Returns an array of the given span and all of its descendants.
 */ function getSpanDescendants(span) {
    const resultSet = new Set();
    function addSpanChildren(span) {
        // This exit condition is required to not infinitely loop in case of a circular dependency.
        if (resultSet.has(span)) {
            return;
        // We want to ignore unsampled spans (e.g. non recording spans)
        } else if (spanIsSampled(span)) {
            resultSet.add(span);
            const childSpans = span[CHILD_SPANS_FIELD] ? Array.from(span[CHILD_SPANS_FIELD]) : [];
            for (const childSpan of childSpans){
                addSpanChildren(childSpan);
            }
        }
    }
    addSpanChildren(span);
    return Array.from(resultSet);
}
/**
 * Returns the root span of a given span.
 */ function getRootSpan(span) {
    return span[ROOT_SPAN_FIELD] || span;
}
/**
 * Returns the currently active span.
 */ function getActiveSpan() {
    const carrier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMainCarrier"])();
    const acs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$asyncContext$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAsyncContextStrategy"])(carrier);
    if (acs.getActiveSpan) {
        return acs.getActiveSpan();
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_getSpanForScope"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])());
}
/**
 * Logs a warning once if `beforeSendSpan` is used to drop spans.
 */ function showSpanDropWarning() {
    if (!hasShownSpanDropWarning) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["consoleSandbox"])(()=>{
            // eslint-disable-next-line no-console
            console.warn('[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.');
        });
        hasShownSpanDropWarning = true;
    }
}
/**
 * Updates the name of the given span and ensures that the span name is not
 * overwritten by the Sentry SDK.
 *
 * Use this function instead of `span.updateName()` if you want to make sure that
 * your name is kept. For some spans, for example root `http.server` spans the
 * Sentry SDK would otherwise overwrite the span name with a high-quality name
 * it infers when the span ends.
 *
 * Use this function in server code or when your span is started on the server
 * and on the client (browser). If you only update a span name on the client,
 * you can also use `span.updateName()` the SDK does not overwrite the name.
 *
 * @param span - The span to update the name of.
 * @param name - The name to set on the span.
 */ function updateSpanName(span, name) {
    span.updateName(name);
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: 'custom',
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME"]]: name
    });
}
;
 //# sourceMappingURL=spanUtils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/normalize.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalize",
    ()=>normalize,
    "normalizeToSize",
    ()=>normalizeToSize,
    "normalizeUrlToBase",
    ()=>normalizeUrlToBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)");
;
;
;
/**
 * Recursively normalizes the given object.
 *
 * - Creates a copy to prevent original input mutation
 * - Skips non-enumerable properties
 * - When stringifying, calls `toJSON` if implemented
 * - Removes circular references
 * - Translates non-serializable values (`undefined`/`NaN`/functions) to serializable format
 * - Translates known global objects/classes to a string representations
 * - Takes care of `Error` object serialization
 * - Optionally limits depth of final output
 * - Optionally limits number of properties/elements included in any single object/array
 *
 * @param input The object to be normalized.
 * @param depth The max depth to which to normalize the object. (Anything deeper stringified whole.)
 * @param maxProperties The max number of elements or properties to be included in any single array or
 * object in the normalized output.
 * @returns A normalized version of the object, or `"**non-serializable**"` if any errors are thrown during normalization.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(input, depth = 100, maxProperties = +Infinity) {
    try {
        // since we're at the outermost level, we don't provide a key
        return visit('', input, depth, maxProperties);
    } catch (err) {
        return {
            ERROR: `**non-serializable** (${err})`
        };
    }
}
/** JSDoc */ function normalizeToSize(// eslint-disable-next-line @typescript-eslint/no-explicit-any
object, // Default Node.js REPL depth
depth = 3, // 100kB, as 200kB is max payload size, so half sounds reasonable
maxSize = 100 * 1024) {
    const normalized = normalize(object, depth);
    if (jsonSize(normalized) > maxSize) {
        return normalizeToSize(object, depth - 1, maxSize);
    }
    return normalized;
}
/**
 * Visits a node to perform normalization on it
 *
 * @param key The key corresponding to the given node
 * @param value The node to be visited
 * @param depth Optional number indicating the maximum recursion depth
 * @param maxProperties Optional maximum number of properties/elements included in any single object/array
 * @param memo Optional Memo class handling decycling
 */ function visit(key, value, depth = +Infinity, maxProperties = +Infinity, memo = memoBuilder()) {
    const [memoize, unmemoize] = memo;
    // Get the simple cases out of the way first
    if (value == null || // this matches null and undefined -> eqeq not eqeqeq
    [
        'boolean',
        'string'
    ].includes(typeof value) || typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    const stringified = stringifyValue(key, value);
    // Anything we could potentially dig into more (objects or arrays) will have come back as `"[object XXXX]"`.
    // Everything else will have already been serialized, so if we don't see that pattern, we're done.
    if (!stringified.startsWith('[object ')) {
        return stringified;
    }
    // From here on, we can assert that `value` is either an object or an array.
    // Do not normalize objects that we know have already been normalized. As a general rule, the
    // "__sentry_skip_normalization__" property should only be used sparingly and only should only be set on objects that
    // have already been normalized.
    if (value['__sentry_skip_normalization__']) {
        return value;
    }
    // We can set `__sentry_override_normalization_depth__` on an object to ensure that from there
    // We keep a certain amount of depth.
    // This should be used sparingly, e.g. we use it for the redux integration to ensure we get a certain amount of state.
    const remainingDepth = typeof value['__sentry_override_normalization_depth__'] === 'number' ? value['__sentry_override_normalization_depth__'] : depth;
    // We're also done if we've reached the max depth
    if (remainingDepth === 0) {
        // At this point we know `serialized` is a string of the form `"[object XXXX]"`. Clean it up so it's just `"[XXXX]"`.
        return stringified.replace('object ', '');
    }
    // If we've already visited this branch, bail out, as it's circular reference. If not, note that we're seeing it now.
    if (memoize(value)) {
        return '[Circular ~]';
    }
    // If the value has a `toJSON` method, we call it to extract more information
    const valueWithToJSON = value;
    if (valueWithToJSON && typeof valueWithToJSON.toJSON === 'function') {
        try {
            const jsonValue = valueWithToJSON.toJSON();
            // We need to normalize the return value of `.toJSON()` in case it has circular references
            return visit('', jsonValue, remainingDepth - 1, maxProperties, memo);
        } catch  {
        // pass (The built-in `toJSON` failed, but we can still try to do it ourselves)
        }
    }
    // At this point we know we either have an object or an array, we haven't seen it before, and we're going to recurse
    // because we haven't yet reached the max depth. Create an accumulator to hold the results of visiting each
    // property/entry, and keep track of the number of items we add to it.
    const normalized = Array.isArray(value) ? [] : {};
    let numAdded = 0;
    // Before we begin, convert`Error` and`Event` instances into plain objects, since some of each of their relevant
    // properties are non-enumerable and otherwise would get missed.
    const visitable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertToPlainObject"])(value);
    for(const visitKey in visitable){
        // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
        if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
            continue;
        }
        if (numAdded >= maxProperties) {
            normalized[visitKey] = '[MaxProperties ~]';
            break;
        }
        // Recursively visit all the child nodes
        const visitValue = visitable[visitKey];
        normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo);
        numAdded++;
    }
    // Once we've visited all the branches, remove the parent from memo storage
    unmemoize(value);
    // Return accumulated values
    return normalized;
}
/* eslint-disable complexity */ /**
 * Stringify the given value. Handles various known special values and types.
 *
 * Not meant to be used on simple primitives which already have a string representation, as it will, for example, turn
 * the number 1231 into "[Object Number]", nor on `null`, as it will throw.
 *
 * @param value The value to stringify
 * @returns A stringified representation of the given value
 */ function stringifyValue(key, // this type is a tiny bit of a cheat, since this function does handle NaN (which is technically a number), but for
// our internal use, it'll do
value) {
    try {
        if (key === 'domain' && value && typeof value === 'object' && value._events) {
            return '[Domain]';
        }
        if (key === 'domainEmitter') {
            return '[DomainEmitter]';
        }
        // It's safe to use `global`, `window`, and `document` here in this manner, as we are asserting using `typeof` first
        // which won't throw if they are not present.
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && value === /*TURBOPACK member replacement*/ __turbopack_context__.g) {
            return '[Global]';
        }
        // eslint-disable-next-line no-restricted-globals
        if (typeof window !== 'undefined' && value === window) {
            return '[Window]';
        }
        // eslint-disable-next-line no-restricted-globals
        if (typeof document !== 'undefined' && value === document) {
            return '[Document]';
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVueViewModel"])(value)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVueInternalName"])(value);
        }
        // React's SyntheticEvent thingy
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSyntheticEvent"])(value)) {
            return '[SyntheticEvent]';
        }
        if (typeof value === 'number' && !Number.isFinite(value)) {
            return `[${value}]`;
        }
        if (typeof value === 'function') {
            return `[Function: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctionName"])(value)}]`;
        }
        if (typeof value === 'symbol') {
            return `[${String(value)}]`;
        }
        // stringified BigInts are indistinguishable from regular numbers, so we need to label them to avoid confusion
        if (typeof value === 'bigint') {
            return `[BigInt: ${String(value)}]`;
        }
        // Now that we've knocked out all the special cases and the primitives, all we have left are objects. Simply casting
        // them to strings means that instances of classes which haven't defined their `toStringTag` will just come out as
        // `"[object Object]"`. If we instead look at the constructor's name (which is the same as the name of the class),
        // we can make sure that only plain objects come out that way.
        const objName = getConstructorName(value);
        // Handle HTML Elements
        if (/^HTML(\w*)Element$/.test(objName)) {
            return `[HTMLElement: ${objName}]`;
        }
        return `[object ${objName}]`;
    } catch (err) {
        return `**non-serializable** (${err})`;
    }
}
/* eslint-enable complexity */ function getConstructorName(value) {
    const prototype = Object.getPrototypeOf(value);
    return prototype?.constructor ? prototype.constructor.name : 'null prototype';
}
/** Calculates bytes size of input string */ function utf8Length(value) {
    // eslint-disable-next-line no-bitwise
    return ~-encodeURI(value).split(/%..|./).length;
}
/** Calculates bytes size of input object */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function jsonSize(value) {
    return utf8Length(JSON.stringify(value));
}
/**
 * Normalizes URLs in exceptions and stacktraces to a base path so Sentry can fingerprint
 * across platforms and working directory.
 *
 * @param url The URL to be normalized.
 * @param basePath The application base path.
 * @returns The normalized URL.
 */ function normalizeUrlToBase(url, basePath) {
    const escapedBase = basePath// Backslash to forward
    .replace(/\\/g, '/')// Escape RegExp special characters
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    let newUrl = url;
    try {
        newUrl = decodeURI(url);
    } catch  {
    // Sometime this breaks
    }
    return newUrl.replace(/\\/g, '/').replace(/webpack:\/?/g, '') // Remove intermediate base path
    // eslint-disable-next-line @sentry-internal/sdk/no-regexp-constructor
    .replace(new RegExp(`(file://)?/*${escapedBase}/*`, 'ig'), 'app:///');
}
/**
 * Helper to decycle json objects
 */ function memoBuilder() {
    const inner = new WeakSet();
    function memoize(obj) {
        if (inner.has(obj)) {
            return true;
        }
        inner.add(obj);
        return false;
    }
    function unmemoize(obj) {
        inner.delete(obj);
    }
    return [
        memoize,
        unmemoize
    ];
}
;
 //# sourceMappingURL=normalize.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addItemToEnvelope",
    ()=>addItemToEnvelope,
    "createAttachmentEnvelopeItem",
    ()=>createAttachmentEnvelopeItem,
    "createEnvelope",
    ()=>createEnvelope,
    "createEventEnvelopeHeaders",
    ()=>createEventEnvelopeHeaders,
    "createSpanEnvelopeItem",
    ()=>createSpanEnvelopeItem,
    "envelopeContainsItemType",
    ()=>envelopeContainsItemType,
    "envelopeItemTypeToDataCategory",
    ()=>envelopeItemTypeToDataCategory,
    "forEachEnvelopeItem",
    ()=>forEachEnvelopeItem,
    "getSdkMetadataForEnvelopeHeader",
    ()=>getSdkMetadataForEnvelopeHeader,
    "parseEnvelope",
    ()=>parseEnvelope,
    "serializeEnvelope",
    ()=>serializeEnvelope
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/carrier.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/dsn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Creates an envelope.
 * Make sure to always explicitly provide the generic to this function
 * so that the envelope types resolve correctly.
 */ function createEnvelope(headers, items = []) {
    return [
        headers,
        items
    ];
}
/**
 * Add an item to an envelope.
 * Make sure to always explicitly provide the generic to this function
 * so that the envelope types resolve correctly.
 */ function addItemToEnvelope(envelope, newItem) {
    const [headers, items] = envelope;
    return [
        headers,
        [
            ...items,
            newItem
        ]
    ];
}
/**
 * Convenience function to loop through the items and item types of an envelope.
 * (This function was mostly created because working with envelope types is painful at the moment)
 *
 * If the callback returns true, the rest of the items will be skipped.
 */ function forEachEnvelopeItem(envelope, callback) {
    const envelopeItems = envelope[1];
    for (const envelopeItem of envelopeItems){
        const envelopeItemType = envelopeItem[0].type;
        const result = callback(envelopeItem, envelopeItemType);
        if (result) {
            return true;
        }
    }
    return false;
}
/**
 * Returns true if the envelope contains any of the given envelope item types
 */ function envelopeContainsItemType(envelope, types) {
    return forEachEnvelopeItem(envelope, (_, type)=>types.includes(type));
}
/**
 * Encode a string to UTF8 array.
 */ function encodeUTF8(input) {
    const carrier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSentryCarrier"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"]);
    return carrier.encodePolyfill ? carrier.encodePolyfill(input) : new TextEncoder().encode(input);
}
/**
 * Decode a UTF8 array to string.
 */ function decodeUTF8(input) {
    const carrier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSentryCarrier"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"]);
    return carrier.decodePolyfill ? carrier.decodePolyfill(input) : new TextDecoder().decode(input);
}
/**
 * Serializes an envelope.
 */ function serializeEnvelope(envelope) {
    const [envHeaders, items] = envelope;
    // Initially we construct our envelope as a string and only convert to binary chunks if we encounter binary data
    let parts = JSON.stringify(envHeaders);
    function append(next) {
        if (typeof parts === 'string') {
            parts = typeof next === 'string' ? parts + next : [
                encodeUTF8(parts),
                next
            ];
        } else {
            parts.push(typeof next === 'string' ? encodeUTF8(next) : next);
        }
    }
    for (const item of items){
        const [itemHeaders, payload] = item;
        append(`\n${JSON.stringify(itemHeaders)}\n`);
        if (typeof payload === 'string' || payload instanceof Uint8Array) {
            append(payload);
        } else {
            let stringifiedPayload;
            try {
                stringifiedPayload = JSON.stringify(payload);
            } catch  {
                // In case, despite all our efforts to keep `payload` circular-dependency-free, `JSON.stringify()` still
                // fails, we try again after normalizing it again with infinite normalization depth. This of course has a
                // performance impact but in this case a performance hit is better than throwing.
                stringifiedPayload = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(payload));
            }
            append(stringifiedPayload);
        }
    }
    return typeof parts === 'string' ? parts : concatBuffers(parts);
}
function concatBuffers(buffers) {
    const totalLength = buffers.reduce((acc, buf)=>acc + buf.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    for (const buffer of buffers){
        merged.set(buffer, offset);
        offset += buffer.length;
    }
    return merged;
}
/**
 * Parses an envelope
 */ function parseEnvelope(env) {
    let buffer = typeof env === 'string' ? encodeUTF8(env) : env;
    function readBinary(length) {
        const bin = buffer.subarray(0, length);
        // Replace the buffer with the remaining data excluding trailing newline
        buffer = buffer.subarray(length + 1);
        return bin;
    }
    function readJson() {
        let i = buffer.indexOf(0xa);
        // If we couldn't find a newline, we must have found the end of the buffer
        if (i < 0) {
            i = buffer.length;
        }
        return JSON.parse(decodeUTF8(readBinary(i)));
    }
    const envelopeHeader = readJson();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = [];
    while(buffer.length){
        const itemHeader = readJson();
        const binaryLength = typeof itemHeader.length === 'number' ? itemHeader.length : undefined;
        items.push([
            itemHeader,
            binaryLength ? readBinary(binaryLength) : readJson()
        ]);
    }
    return [
        envelopeHeader,
        items
    ];
}
/**
 * Creates envelope item for a single span
 */ function createSpanEnvelopeItem(spanJson) {
    const spanHeaders = {
        type: 'span'
    };
    return [
        spanHeaders,
        spanJson
    ];
}
/**
 * Creates attachment envelope items
 */ function createAttachmentEnvelopeItem(attachment) {
    const buffer = typeof attachment.data === 'string' ? encodeUTF8(attachment.data) : attachment.data;
    return [
        {
            type: 'attachment',
            length: buffer.length,
            filename: attachment.filename,
            content_type: attachment.contentType,
            attachment_type: attachment.attachmentType
        },
        buffer
    ];
}
const ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
    session: 'session',
    sessions: 'session',
    attachment: 'attachment',
    transaction: 'transaction',
    event: 'error',
    client_report: 'internal',
    user_report: 'default',
    profile: 'profile',
    profile_chunk: 'profile',
    replay_event: 'replay',
    replay_recording: 'replay',
    check_in: 'monitor',
    feedback: 'feedback',
    span: 'span',
    raw_security: 'security',
    log: 'log_item',
    metric: 'metric',
    trace_metric: 'metric'
};
/**
 * Maps the type of an envelope item to a data category.
 */ function envelopeItemTypeToDataCategory(type) {
    return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
}
/** Extracts the minimal SDK info from the metadata or an events */ function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
    if (!metadataOrEvent?.sdk) {
        return;
    }
    const { name, version } = metadataOrEvent.sdk;
    return {
        name,
        version
    };
}
/**
 * Creates event envelope headers, based on event, sdk info and tunnel
 * Note: This function was extracted from the core package to make it available in Replay
 */ function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn) {
    const dynamicSamplingContext = event.sdkProcessingMetadata?.dynamicSamplingContext;
    return {
        event_id: event.event_id,
        sent_at: new Date().toISOString(),
        ...sdkInfo && {
            sdk: sdkInfo
        },
        ...!!tunnel && dsn && {
            dsn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dsnToString"])(dsn)
        },
        ...dynamicSamplingContext && {
            trace: dynamicSamplingContext
        }
    };
}
;
 //# sourceMappingURL=envelope.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/should-ignore-span.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reparentChildSpans",
    ()=>reparentChildSpans,
    "shouldIgnoreSpan",
    ()=>shouldIgnoreSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)");
;
;
;
function logIgnoredSpan(droppedSpan) {
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`Ignoring span ${droppedSpan.op} - ${droppedSpan.description} because it matches \`ignoreSpans\`.`);
}
/**
 * Check if a span should be ignored based on the ignoreSpans configuration.
 */ function shouldIgnoreSpan(span, ignoreSpans) {
    if (!ignoreSpans?.length || !span.description) {
        return false;
    }
    for (const pattern of ignoreSpans){
        if (isStringOrRegExp(pattern)) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMatchingPattern"])(span.description, pattern)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && logIgnoredSpan(span);
                return true;
            }
            continue;
        }
        if (!pattern.name && !pattern.op) {
            continue;
        }
        const nameMatches = pattern.name ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMatchingPattern"])(span.description, pattern.name) : true;
        const opMatches = pattern.op ? span.op && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMatchingPattern"])(span.op, pattern.op) : true;
        // This check here is only correct because we can guarantee that we ran `isMatchingPattern`
        // for at least one of `nameMatches` and `opMatches`. So in contrary to how this looks,
        // not both op and name actually have to match. This is the most efficient way to check
        // for all combinations of name and op patterns.
        if (nameMatches && opMatches) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && logIgnoredSpan(span);
            return true;
        }
    }
    return false;
}
/**
 * Takes a list of spans, and a span that was dropped, and re-parents the child spans of the dropped span to the parent of the dropped span, if possible.
 * This mutates the spans array in place!
 */ function reparentChildSpans(spans, dropSpan) {
    const droppedSpanParentId = dropSpan.parent_span_id;
    const droppedSpanId = dropSpan.span_id;
    // This should generally not happen, as we do not apply this on root spans
    // but to be safe, we just bail in this case
    if (!droppedSpanParentId) {
        return;
    }
    for (const span of spans){
        if (span.parent_span_id === droppedSpanId) {
            span.parent_span_id = droppedSpanParentId;
        }
    }
}
function isStringOrRegExp(value) {
    return typeof value === 'string' || value instanceof RegExp;
}
;
 //# sourceMappingURL=should-ignore-span.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/syncpromise.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SyncPromise",
    ()=>SyncPromise,
    "rejectedSyncPromise",
    ()=>rejectedSyncPromise,
    "resolvedSyncPromise",
    ()=>resolvedSyncPromise
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
;
/* eslint-disable @typescript-eslint/no-explicit-any */ /** SyncPromise internal states */ const STATE_PENDING = 0;
const STATE_RESOLVED = 1;
const STATE_REJECTED = 2;
/**
 * Creates a resolved sync promise.
 *
 * @param value the value to resolve the promise with
 * @returns the resolved sync promise
 */ function resolvedSyncPromise(value) {
    return new SyncPromise((resolve)=>{
        resolve(value);
    });
}
/**
 * Creates a rejected sync promise.
 *
 * @param value the value to reject the promise with
 * @returns the rejected sync promise
 */ function rejectedSyncPromise(reason) {
    return new SyncPromise((_, reject)=>{
        reject(reason);
    });
}
/**
 * Thenable class that behaves like a Promise and follows it's interface
 * but is not async internally
 */ class SyncPromise {
    constructor(executor){
        this._state = STATE_PENDING;
        this._handlers = [];
        this._runExecutor(executor);
    }
    /** @inheritdoc */ then(onfulfilled, onrejected) {
        return new SyncPromise((resolve, reject)=>{
            this._handlers.push([
                false,
                (result)=>{
                    if (!onfulfilled) {
                        // TODO: ¯\_(ツ)_/¯
                        // TODO: FIXME
                        resolve(result);
                    } else {
                        try {
                            resolve(onfulfilled(result));
                        } catch (e) {
                            reject(e);
                        }
                    }
                },
                (reason)=>{
                    if (!onrejected) {
                        reject(reason);
                    } else {
                        try {
                            resolve(onrejected(reason));
                        } catch (e) {
                            reject(e);
                        }
                    }
                }
            ]);
            this._executeHandlers();
        });
    }
    /** @inheritdoc */ catch(onrejected) {
        return this.then((val)=>val, onrejected);
    }
    /** @inheritdoc */ finally(onfinally) {
        return new SyncPromise((resolve, reject)=>{
            let val;
            let isRejected;
            return this.then((value)=>{
                isRejected = false;
                val = value;
                if (onfinally) {
                    onfinally();
                }
            }, (reason)=>{
                isRejected = true;
                val = reason;
                if (onfinally) {
                    onfinally();
                }
            }).then(()=>{
                if (isRejected) {
                    reject(val);
                    return;
                }
                resolve(val);
            });
        });
    }
    /** Excute the resolve/reject handlers. */ _executeHandlers() {
        if (this._state === STATE_PENDING) {
            return;
        }
        const cachedHandlers = this._handlers.slice();
        this._handlers = [];
        cachedHandlers.forEach((handler)=>{
            if (handler[0]) {
                return;
            }
            if (this._state === STATE_RESOLVED) {
                handler[1](this._value);
            }
            if (this._state === STATE_REJECTED) {
                handler[2](this._value);
            }
            handler[0] = true;
        });
    }
    /** Run the executor for the SyncPromise. */ _runExecutor(executor) {
        const setResult = (state, value)=>{
            if (this._state !== STATE_PENDING) {
                return;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isThenable"])(value)) {
                void value.then(resolve, reject);
                return;
            }
            this._state = state;
            this._value = value;
            this._executeHandlers();
        };
        const resolve = (value)=>{
            setResult(STATE_RESOLVED, value);
        };
        const reject = (reason)=>{
            setResult(STATE_REJECTED, reason);
        };
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
}
;
 //# sourceMappingURL=syncpromise.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-ids.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDebugImagesForResources",
    ()=>getDebugImagesForResources,
    "getFilenameToDebugIdMap",
    ()=>getFilenameToDebugIdMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
let parsedStackResults;
let lastSentryKeysCount;
let lastNativeKeysCount;
let cachedFilenameDebugIds;
/**
 * Returns a map of filenames to debug identifiers.
 * Supports both proprietary _sentryDebugIds and native _debugIds (e.g., from Vercel) formats.
 */ function getFilenameToDebugIdMap(stackParser) {
    const sentryDebugIdMap = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"]._sentryDebugIds;
    const nativeDebugIdMap = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"]._debugIds;
    if (!sentryDebugIdMap && !nativeDebugIdMap) {
        return {};
    }
    const sentryDebugIdKeys = sentryDebugIdMap ? Object.keys(sentryDebugIdMap) : [];
    const nativeDebugIdKeys = nativeDebugIdMap ? Object.keys(nativeDebugIdMap) : [];
    // If the count of registered globals hasn't changed since the last call, we
    // can just return the cached result.
    if (cachedFilenameDebugIds && sentryDebugIdKeys.length === lastSentryKeysCount && nativeDebugIdKeys.length === lastNativeKeysCount) {
        return cachedFilenameDebugIds;
    }
    lastSentryKeysCount = sentryDebugIdKeys.length;
    lastNativeKeysCount = nativeDebugIdKeys.length;
    // Build a map of filename -> debug_id from both sources
    cachedFilenameDebugIds = {};
    if (!parsedStackResults) {
        parsedStackResults = {};
    }
    const processDebugIds = (debugIdKeys, debugIdMap)=>{
        for (const key of debugIdKeys){
            const debugId = debugIdMap[key];
            const result = parsedStackResults?.[key];
            if (result && cachedFilenameDebugIds && debugId) {
                // Use cached filename but update with current debug ID
                cachedFilenameDebugIds[result[0]] = debugId;
                // Update cached result with new debug ID
                if (parsedStackResults) {
                    parsedStackResults[key] = [
                        result[0],
                        debugId
                    ];
                }
            } else if (debugId) {
                const parsedStack = stackParser(key);
                for(let i = parsedStack.length - 1; i >= 0; i--){
                    const stackFrame = parsedStack[i];
                    const filename = stackFrame?.filename;
                    if (filename && cachedFilenameDebugIds && parsedStackResults) {
                        cachedFilenameDebugIds[filename] = debugId;
                        parsedStackResults[key] = [
                            filename,
                            debugId
                        ];
                        break;
                    }
                }
            }
        }
    };
    if (sentryDebugIdMap) {
        processDebugIds(sentryDebugIdKeys, sentryDebugIdMap);
    }
    // Native _debugIds will override _sentryDebugIds if same file
    if (nativeDebugIdMap) {
        processDebugIds(nativeDebugIdKeys, nativeDebugIdMap);
    }
    return cachedFilenameDebugIds;
}
/**
 * Returns a list of debug images for the given resources.
 */ function getDebugImagesForResources(stackParser, resource_paths) {
    const filenameDebugIdMap = getFilenameToDebugIdMap(stackParser);
    if (!filenameDebugIdMap) {
        return [];
    }
    const images = [];
    for (const path of resource_paths){
        const normalizedPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeStackTracePath"])(path);
        if (normalizedPath && filenameDebugIdMap[normalizedPath]) {
            images.push({
                type: 'sourcemap',
                code_file: path,
                debug_id: filenameDebugIdMap[normalizedPath]
            });
        }
    }
    return images;
}
;
 //# sourceMappingURL=debug-ids.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/scopeData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyScopeDataToEvent",
    ()=>applyScopeDataToEvent,
    "getCombinedScopeData",
    ()=>getCombinedScopeData,
    "mergeAndOverwriteScopeData",
    ()=>mergeAndOverwriteScopeData,
    "mergeScopeData",
    ()=>mergeScopeData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$merge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/merge.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Applies data from the scope to the event and runs all event processors on it.
 */ function applyScopeDataToEvent(event, data) {
    const { fingerprint, span, breadcrumbs, sdkProcessingMetadata } = data;
    // Apply general data
    applyDataToEvent(event, data);
    // We want to set the trace context for normal events only if there isn't already
    // a trace context on the event. There is a product feature in place where we link
    // errors with transaction and it relies on that.
    if (span) {
        applySpanToEvent(event, span);
    }
    applyFingerprintToEvent(event, fingerprint);
    applyBreadcrumbsToEvent(event, breadcrumbs);
    applySdkMetadataToEvent(event, sdkProcessingMetadata);
}
/** Merge data of two scopes together. */ function mergeScopeData(data, mergeData) {
    const { extra, tags, attributes, user, contexts, level, sdkProcessingMetadata, breadcrumbs, fingerprint, eventProcessors, attachments, propagationContext, transactionName, span } = mergeData;
    mergeAndOverwriteScopeData(data, 'extra', extra);
    mergeAndOverwriteScopeData(data, 'tags', tags);
    mergeAndOverwriteScopeData(data, 'attributes', attributes);
    mergeAndOverwriteScopeData(data, 'user', user);
    mergeAndOverwriteScopeData(data, 'contexts', contexts);
    data.sdkProcessingMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$merge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["merge"])(data.sdkProcessingMetadata, sdkProcessingMetadata, 2);
    if (level) {
        data.level = level;
    }
    if (transactionName) {
        data.transactionName = transactionName;
    }
    if (span) {
        data.span = span;
    }
    if (breadcrumbs.length) {
        data.breadcrumbs = [
            ...data.breadcrumbs,
            ...breadcrumbs
        ];
    }
    if (fingerprint.length) {
        data.fingerprint = [
            ...data.fingerprint,
            ...fingerprint
        ];
    }
    if (eventProcessors.length) {
        data.eventProcessors = [
            ...data.eventProcessors,
            ...eventProcessors
        ];
    }
    if (attachments.length) {
        data.attachments = [
            ...data.attachments,
            ...attachments
        ];
    }
    data.propagationContext = {
        ...data.propagationContext,
        ...propagationContext
    };
}
/**
 * Merges certain scope data. Undefined values will overwrite any existing values.
 * Exported only for tests.
 */ function mergeAndOverwriteScopeData(data, prop, mergeVal) {
    data[prop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$merge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["merge"])(data[prop], mergeVal, 1);
}
/**
 * Get the scope data for the current scope after merging with the
 * global scope and isolation scope.
 *
 * @param currentScope - The current scope.
 * @returns The scope data.
 */ function getCombinedScopeData(isolationScope, currentScope) {
    const scopeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalScope"])().getScopeData();
    isolationScope && mergeScopeData(scopeData, isolationScope.getScopeData());
    currentScope && mergeScopeData(scopeData, currentScope.getScopeData());
    return scopeData;
}
function applyDataToEvent(event, data) {
    const { extra, tags, user, contexts, level, transactionName } = data;
    if (Object.keys(extra).length) {
        event.extra = {
            ...extra,
            ...event.extra
        };
    }
    if (Object.keys(tags).length) {
        event.tags = {
            ...tags,
            ...event.tags
        };
    }
    if (Object.keys(user).length) {
        event.user = {
            ...user,
            ...event.user
        };
    }
    if (Object.keys(contexts).length) {
        event.contexts = {
            ...contexts,
            ...event.contexts
        };
    }
    if (level) {
        event.level = level;
    }
    // transaction events get their `transaction` from the root span name
    if (transactionName && event.type !== 'transaction') {
        event.transaction = transactionName;
    }
}
function applyBreadcrumbsToEvent(event, breadcrumbs) {
    const mergedBreadcrumbs = [
        ...event.breadcrumbs || [],
        ...breadcrumbs
    ];
    event.breadcrumbs = mergedBreadcrumbs.length ? mergedBreadcrumbs : undefined;
}
function applySdkMetadataToEvent(event, sdkProcessingMetadata) {
    event.sdkProcessingMetadata = {
        ...event.sdkProcessingMetadata,
        ...sdkProcessingMetadata
    };
}
function applySpanToEvent(event, span) {
    event.contexts = {
        trace: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToTraceContext"])(span),
        ...event.contexts
    };
    event.sdkProcessingMetadata = {
        dynamicSamplingContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromSpan"])(span),
        ...event.sdkProcessingMetadata
    };
    const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span);
    const transactionName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(rootSpan).description;
    if (transactionName && !event.transaction && event.type === 'transaction') {
        event.transaction = transactionName;
    }
}
/**
 * Applies fingerprint from the scope to the event if there's one,
 * uses message if there's one instead or get rid of empty fingerprint
 */ function applyFingerprintToEvent(event, fingerprint) {
    // Make sure it's an array first and we actually have something in place
    event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [
        event.fingerprint
    ] : [];
    // If we have something on the scope, then merge it with event
    if (fingerprint) {
        event.fingerprint = event.fingerprint.concat(fingerprint);
    }
    // If we have no data at all, remove empty array default
    if (!event.fingerprint.length) {
        delete event.fingerprint;
    }
}
;
 //# sourceMappingURL=scopeData.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/prepareEvent.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyClientOptions",
    ()=>applyClientOptions,
    "applyDebugIds",
    ()=>applyDebugIds,
    "applyDebugMeta",
    ()=>applyDebugMeta,
    "parseEventHintOrCaptureContext",
    ()=>parseEventHintOrCaptureContext,
    "prepareEvent",
    ()=>prepareEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$eventProcessors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/eventProcessors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/scope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$ids$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-ids.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$scopeData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/scopeData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/syncpromise.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/time.js [app-client] (ecmascript)");
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
 * This type makes sure that we get either a CaptureContext, OR an EventHint.
 * It does not allow mixing them, which could lead to unexpected outcomes, e.g. this is disallowed:
 * { user: { id: '123' }, mechanism: { handled: false } }
 */ /**
 * Adds common information to events.
 *
 * The information includes release and environment from `options`,
 * breadcrumbs and context (extra, tags and user) from the scope.
 *
 * Information that is already present in the event is never overwritten. For
 * nested objects, such as the context, keys are merged.
 *
 * @param event The original event.
 * @param hint May contain additional information about the original exception.
 * @param scope A scope containing event metadata.
 * @returns A new event with more information.
 * @hidden
 */ function prepareEvent(options, event, hint, scope, client, isolationScope) {
    const { normalizeDepth = 3, normalizeMaxBreadth = 1000 } = options;
    const prepared = {
        ...event,
        event_id: event.event_id || hint.event_id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])(),
        timestamp: event.timestamp || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateTimestampInSeconds"])()
    };
    const integrations = hint.integrations || options.integrations.map((i)=>i.name);
    applyClientOptions(prepared, options);
    applyIntegrationsMetadata(prepared, integrations);
    if (client) {
        client.emit('applyFrameMetadata', event);
    }
    // Only put debug IDs onto frames for error events.
    if (event.type === undefined) {
        applyDebugIds(prepared, options.stackParser);
    }
    // If we have scope given to us, use it as the base for further modifications.
    // This allows us to prevent unnecessary copying of data if `captureContext` is not provided.
    const finalScope = getFinalScope(scope, hint.captureContext);
    if (hint.mechanism) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(prepared, hint.mechanism);
    }
    const clientEventProcessors = client ? client.getEventProcessors() : [];
    // This should be the last thing called, since we want that
    // {@link Scope.addEventProcessor} gets the finished prepared event.
    // Merge scope data together
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$scopeData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedScopeData"])(isolationScope, finalScope);
    const attachments = [
        ...hint.attachments || [],
        ...data.attachments
    ];
    if (attachments.length) {
        hint.attachments = attachments;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$scopeData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyScopeDataToEvent"])(prepared, data);
    const eventProcessors = [
        ...clientEventProcessors,
        // Run scope event processors _after_ all other processors
        ...data.eventProcessors
    ];
    // Skip event processors for internal exceptions to prevent recursion
    const isInternalException = hint.data && hint.data.__sentry__ === true;
    const result = isInternalException ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvedSyncPromise"])(prepared) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$eventProcessors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyEventProcessors"])(eventProcessors, prepared, hint);
    return result.then((evt)=>{
        if (evt) {
            // We apply the debug_meta field only after all event processors have ran, so that if any event processors modified
            // file names (e.g.the RewriteFrames integration) the filename -> debug ID relationship isn't destroyed.
            // This should not cause any PII issues, since we're only moving data that is already on the event and not adding
            // any new data
            applyDebugMeta(evt);
        }
        if (typeof normalizeDepth === 'number' && normalizeDepth > 0) {
            return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
        }
        return evt;
    });
}
/**
 * Enhances event using the client configuration.
 * It takes care of all "static" values like environment, release and `dist`,
 * as well as truncating overly long values.
 *
 * Only exported for tests.
 *
 * @param event event instance to be enhanced
 */ function applyClientOptions(event, options) {
    const { environment, release, dist, maxValueLength } = options;
    // empty strings do not make sense for environment, release, and dist
    // so we handle them the same as if they were not provided
    event.environment = event.environment || environment || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ENVIRONMENT"];
    if (!event.release && release) {
        event.release = release;
    }
    if (!event.dist && dist) {
        event.dist = dist;
    }
    const request = event.request;
    if (request?.url && maxValueLength) {
        request.url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(request.url, maxValueLength);
    }
    if (maxValueLength) {
        event.exception?.values?.forEach((exception)=>{
            if (exception.value) {
                // Truncates error messages
                exception.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(exception.value, maxValueLength);
            }
        });
    }
}
/**
 * Puts debug IDs into the stack frames of an error event.
 */ function applyDebugIds(event, stackParser) {
    // Build a map of filename -> debug_id
    const filenameDebugIdMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$ids$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilenameToDebugIdMap"])(stackParser);
    event.exception?.values?.forEach((exception)=>{
        exception.stacktrace?.frames?.forEach((frame)=>{
            if (frame.filename) {
                frame.debug_id = filenameDebugIdMap[frame.filename];
            }
        });
    });
}
/**
 * Moves debug IDs from the stack frames of an error event into the debug_meta field.
 */ function applyDebugMeta(event) {
    // Extract debug IDs and filenames from the stack frames on the event.
    const filenameDebugIdMap = {};
    event.exception?.values?.forEach((exception)=>{
        exception.stacktrace?.frames?.forEach((frame)=>{
            if (frame.debug_id) {
                if (frame.abs_path) {
                    filenameDebugIdMap[frame.abs_path] = frame.debug_id;
                } else if (frame.filename) {
                    filenameDebugIdMap[frame.filename] = frame.debug_id;
                }
                delete frame.debug_id;
            }
        });
    });
    if (Object.keys(filenameDebugIdMap).length === 0) {
        return;
    }
    // Fill debug_meta information
    event.debug_meta = event.debug_meta || {};
    event.debug_meta.images = event.debug_meta.images || [];
    const images = event.debug_meta.images;
    Object.entries(filenameDebugIdMap).forEach(([filename, debug_id])=>{
        images.push({
            type: 'sourcemap',
            code_file: filename,
            debug_id
        });
    });
}
/**
 * This function adds all used integrations to the SDK info in the event.
 * @param event The event that will be filled with all integrations.
 */ function applyIntegrationsMetadata(event, integrationNames) {
    if (integrationNames.length > 0) {
        event.sdk = event.sdk || {};
        event.sdk.integrations = [
            ...event.sdk.integrations || [],
            ...integrationNames
        ];
    }
}
/**
 * Applies `normalize` function on necessary `Event` attributes to make them safe for serialization.
 * Normalized keys:
 * - `breadcrumbs.data`
 * - `user`
 * - `contexts`
 * - `extra`
 * @param event Event
 * @returns Normalized event
 */ function normalizeEvent(event, depth, maxBreadth) {
    if (!event) {
        return null;
    }
    const normalized = {
        ...event,
        ...event.breadcrumbs && {
            breadcrumbs: event.breadcrumbs.map((b)=>({
                    ...b,
                    ...b.data && {
                        data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(b.data, depth, maxBreadth)
                    }
                }))
        },
        ...event.user && {
            user: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(event.user, depth, maxBreadth)
        },
        ...event.contexts && {
            contexts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(event.contexts, depth, maxBreadth)
        },
        ...event.extra && {
            extra: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(event.extra, depth, maxBreadth)
        }
    };
    // event.contexts.trace stores information about a Transaction. Similarly,
    // event.spans[] stores information about child Spans. Given that a
    // Transaction is conceptually a Span, normalization should apply to both
    // Transactions and Spans consistently.
    // For now the decision is to skip normalization of Transactions and Spans,
    // so this block overwrites the normalized event to add back the original
    // Transaction information prior to normalization.
    if (event.contexts?.trace && normalized.contexts) {
        normalized.contexts.trace = event.contexts.trace;
        // event.contexts.trace.data may contain circular/dangerous data so we need to normalize it
        if (event.contexts.trace.data) {
            normalized.contexts.trace.data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(event.contexts.trace.data, depth, maxBreadth);
        }
    }
    // event.spans[].data may contain circular/dangerous data so we need to normalize it
    if (event.spans) {
        normalized.spans = event.spans.map((span)=>{
            return {
                ...span,
                ...span.data && {
                    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(span.data, depth, maxBreadth)
                }
            };
        });
    }
    // event.contexts.flags (FeatureFlagContext) stores context for our feature
    // flag integrations. It has a greater nesting depth than our other typed
    // Contexts, so we re-normalize with a fixed depth of 3 here. We do not want
    // to skip this in case of conflicting, user-provided context.
    if (event.contexts?.flags && normalized.contexts) {
        normalized.contexts.flags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(event.contexts.flags, 3, maxBreadth);
    }
    return normalized;
}
function getFinalScope(scope, captureContext) {
    if (!captureContext) {
        return scope;
    }
    const finalScope = scope ? scope.clone() : new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scope"]();
    finalScope.update(captureContext);
    return finalScope;
}
/**
 * Parse either an `EventHint` directly, or convert a `CaptureContext` to an `EventHint`.
 * This is used to allow to update method signatures that used to accept a `CaptureContext` but should now accept an `EventHint`.
 */ function parseEventHintOrCaptureContext(hint) {
    if (!hint) {
        return undefined;
    }
    // If you pass a Scope or `() => Scope` as CaptureContext, we just return this as captureContext
    if (hintIsScopeOrFunction(hint)) {
        return {
            captureContext: hint
        };
    }
    if (hintIsScopeContext(hint)) {
        return {
            captureContext: hint
        };
    }
    return hint;
}
function hintIsScopeOrFunction(hint) {
    return hint instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scope"] || typeof hint === 'function';
}
const captureContextKeys = [
    'user',
    'level',
    'extra',
    'contexts',
    'tags',
    'fingerprint',
    'propagationContext'
];
function hintIsScopeContext(hint) {
    return Object.keys(hint).some((key)=>captureContextKeys.includes(key));
}
;
 //# sourceMappingURL=prepareEvent.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/eventUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPossibleEventMessages",
    ()=>getPossibleEventMessages
]);
/**
 * Get a list of possible event messages from a Sentry event.
 */ function getPossibleEventMessages(event) {
    const possibleMessages = [];
    if (event.message) {
        possibleMessages.push(event.message);
    }
    try {
        // @ts-expect-error Try catching to save bundle size
        const lastException = event.exception.values[event.exception.values.length - 1];
        if (lastException?.value) {
            possibleMessages.push(lastException.value);
            if (lastException.type) {
                possibleMessages.push(`${lastException.type}: ${lastException.value}`);
            }
        }
    } catch  {
    // ignore errors here
    }
    return possibleMessages;
}
;
 //# sourceMappingURL=eventUtils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/trace-info.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_getTraceInfoFromScope",
    ()=>_getTraceInfoFromScope
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
;
;
;
/** Extract trace information from scope */ function _getTraceInfoFromScope(client, scope) {
    if (!scope) {
        return [
            undefined,
            undefined
        ];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])(scope, ()=>{
        const span = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
        const traceContext = span ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToTraceContext"])(span) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTraceContextFromScope"])(scope);
        const dynamicSamplingContext = span ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromSpan"])(span) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromScope"])(client, scope);
        return [
            dynamicSamplingContext,
            traceContext
        ];
    });
}
;
 //# sourceMappingURL=trace-info.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/timer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "safeUnref",
    ()=>safeUnref
]);
/**
 * Calls `unref` on a timer, if the method is available on @param timer.
 *
 * `unref()` is used to allow processes to exit immediately, even if the timer
 * is still running and hasn't resolved yet.
 *
 * Use this in places where code can run on browser or server, since browsers
 * do not support `unref`.
 */ function safeUnref(timer) {
    if (typeof timer === 'object' && typeof timer.unref === 'function') {
        timer.unref();
    }
    return timer;
}
;
 //# sourceMappingURL=timer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/promisebuffer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SENTRY_BUFFER_FULL_ERROR",
    ()=>SENTRY_BUFFER_FULL_ERROR,
    "makePromiseBuffer",
    ()=>makePromiseBuffer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/syncpromise.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/timer.js [app-client] (ecmascript)");
;
;
const SENTRY_BUFFER_FULL_ERROR = Symbol.for('SentryBufferFullError');
/**
 * Creates an new PromiseBuffer object with the specified limit
 * @param limit max number of promises that can be stored in the buffer
 */ function makePromiseBuffer(limit = 100) {
    const buffer = new Set();
    function isReady() {
        return buffer.size < limit;
    }
    /**
   * Remove a promise from the queue.
   *
   * @param task Can be any PromiseLike<T>
   * @returns Removed promise.
   */ function remove(task) {
        buffer.delete(task);
    }
    /**
   * Add a promise (representing an in-flight action) to the queue, and set it to remove itself on fulfillment.
   *
   * @param taskProducer A function producing any PromiseLike<T>; In previous versions this used to be `task:
   *        PromiseLike<T>`, but under that model, Promises were instantly created on the call-site and their executor
   *        functions therefore ran immediately. Thus, even if the buffer was full, the action still happened. By
   *        requiring the promise to be wrapped in a function, we can defer promise creation until after the buffer
   *        limit check.
   * @returns The original promise.
   */ function add(taskProducer) {
        if (!isReady()) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rejectedSyncPromise"])(SENTRY_BUFFER_FULL_ERROR);
        }
        // start the task and add its promise to the queue
        const task = taskProducer();
        buffer.add(task);
        void task.then(()=>remove(task), ()=>remove(task));
        return task;
    }
    /**
   * Wait for all promises in the queue to resolve or for timeout to expire, whichever comes first.
   *
   * @param timeout The time, in ms, after which to resolve to `false` if the queue is still non-empty. Passing `0` (or
   * not passing anything) will make the promise wait as long as it takes for the queue to drain before resolving to
   * `true`.
   * @returns A promise which will resolve to `true` if the queue is already empty or drains before the timeout, and
   * `false` otherwise
   */ function drain(timeout) {
        if (!buffer.size) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$syncpromise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvedSyncPromise"])(true);
        }
        // We want to resolve even if one of the promises rejects
        const drainPromise = Promise.allSettled(Array.from(buffer)).then(()=>true);
        if (!timeout) {
            return drainPromise;
        }
        const promises = [
            drainPromise,
            new Promise((resolve)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeUnref"])(setTimeout(()=>resolve(false), timeout)))
        ];
        return Promise.race(promises);
    }
    return {
        get $ () {
            return Array.from(buffer);
        },
        add,
        drain
    };
}
;
 //# sourceMappingURL=promisebuffer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/ratelimit.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_RETRY_AFTER",
    ()=>DEFAULT_RETRY_AFTER,
    "disabledUntil",
    ()=>disabledUntil,
    "isRateLimited",
    ()=>isRateLimited,
    "parseRetryAfterHeader",
    ()=>parseRetryAfterHeader,
    "updateRateLimits",
    ()=>updateRateLimits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/randomSafeContext.js [app-client] (ecmascript)");
;
// Intentionally keeping the key broad, as we don't know for sure what rate limit headers get returned from backend
const DEFAULT_RETRY_AFTER = 60 * 1000; // 60 seconds
/**
 * Extracts Retry-After value from the request header or returns default value
 * @param header string representation of 'Retry-After' header
 * @param now current unix timestamp
 *
 */ function parseRetryAfterHeader(header, now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDateNow"])()) {
    const headerDelay = parseInt(`${header}`, 10);
    if (!isNaN(headerDelay)) {
        return headerDelay * 1000;
    }
    const headerDate = Date.parse(`${header}`);
    if (!isNaN(headerDate)) {
        return headerDate - now;
    }
    return DEFAULT_RETRY_AFTER;
}
/**
 * Gets the time that the given category is disabled until for rate limiting.
 * In case no category-specific limit is set but a general rate limit across all categories is active,
 * that time is returned.
 *
 * @return the time in ms that the category is disabled until or 0 if there's no active rate limit.
 */ function disabledUntil(limits, dataCategory) {
    return limits[dataCategory] || limits.all || 0;
}
/**
 * Checks if a category is rate limited
 */ function isRateLimited(limits, dataCategory, now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDateNow"])()) {
    return disabledUntil(limits, dataCategory) > now;
}
/**
 * Update ratelimits from incoming headers.
 *
 * @return the updated RateLimits object.
 */ function updateRateLimits(limits, { statusCode, headers }, now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$randomSafeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDateNow"])()) {
    const updatedRateLimits = {
        ...limits
    };
    // "The name is case-insensitive."
    // https://developer.mozilla.org/en-US/docs/Web/API/Headers/get
    const rateLimitHeader = headers?.['x-sentry-rate-limits'];
    const retryAfterHeader = headers?.['retry-after'];
    if (rateLimitHeader) {
        /**
     * rate limit headers are of the form
     *     <header>,<header>,..
     * where each <header> is of the form
     *     <retry_after>: <categories>: <scope>: <reason_code>: <namespaces>
     * where
     *     <retry_after> is a delay in seconds
     *     <categories> is the event type(s) (error, transaction, etc) being rate limited and is of the form
     *         <category>;<category>;...
     *     <scope> is what's being limited (org, project, or key) - ignored by SDK
     *     <reason_code> is an arbitrary string like "org_quota" - ignored by SDK
     *     <namespaces> Semicolon-separated list of metric namespace identifiers. Defines which namespace(s) will be affected.
     *         Only present if rate limit applies to the metric_bucket data category.
     */ for (const limit of rateLimitHeader.trim().split(',')){
            const [retryAfter, categories, , , namespaces] = limit.split(':', 5);
            const headerDelay = parseInt(retryAfter, 10);
            const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1000; // 60sec default
            if (!categories) {
                updatedRateLimits.all = now + delay;
            } else {
                for (const category of categories.split(';')){
                    if (category === 'metric_bucket') {
                        // namespaces will be present when category === 'metric_bucket'
                        if (!namespaces || namespaces.split(';').includes('custom')) {
                            updatedRateLimits[category] = now + delay;
                        }
                    } else {
                        updatedRateLimits[category] = now + delay;
                    }
                }
            }
        }
    } else if (retryAfterHeader) {
        updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
    } else if (statusCode === 429) {
        updatedRateLimits.all = now + 60 * 1000;
    }
    return updatedRateLimits;
}
;
 //# sourceMappingURL=ratelimit.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/clientreport.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClientReportEnvelope",
    ()=>createClientReportEnvelope
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/time.js [app-client] (ecmascript)");
;
;
/**
 * Creates client report envelope
 * @param discarded_events An array of discard events
 * @param dsn A DSN that can be set on the header. Optional.
 */ function createClientReportEnvelope(discarded_events, dsn, timestamp) {
    const clientReportItem = [
        {
            type: 'client_report'
        },
        {
            timestamp: timestamp || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateTimestampInSeconds"])(),
            discarded_events
        }
    ];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEnvelope"])(dsn ? {
        dsn
    } : {}, [
        clientReportItem
    ]);
}
;
 //# sourceMappingURL=clientreport.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/transactionEvent.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertSpanJsonToTransactionEvent",
    ()=>convertSpanJsonToTransactionEvent,
    "convertTransactionEventToSpanJson",
    ()=>convertTransactionEventToSpanJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
;
/**
 * Converts a transaction event to a span JSON object.
 */ function convertTransactionEventToSpanJson(event) {
    const { trace_id, parent_span_id, span_id, status, origin, data, op } = event.contexts?.trace ?? {};
    return {
        data: data ?? {},
        description: event.transaction,
        op,
        parent_span_id,
        span_id: span_id ?? '',
        start_timestamp: event.start_timestamp ?? 0,
        status,
        timestamp: event.timestamp,
        trace_id: trace_id ?? '',
        origin,
        profile_id: data?.[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_PROFILE_ID"]],
        exclusive_time: data?.[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME"]],
        measurements: event.measurements,
        is_segment: true
    };
}
/**
 * Converts a span JSON object to a transaction event.
 */ function convertSpanJsonToTransactionEvent(span) {
    return {
        type: 'transaction',
        timestamp: span.timestamp,
        start_timestamp: span.start_timestamp,
        transaction: span.description,
        contexts: {
            trace: {
                trace_id: span.trace_id,
                span_id: span.span_id,
                parent_span_id: span.parent_span_id,
                op: span.op,
                status: span.status,
                origin: span.origin,
                data: {
                    ...span.data,
                    ...span.profile_id && {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_PROFILE_ID"]]: span.profile_id
                    },
                    ...span.exclusive_time && {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME"]]: span.exclusive_time
                    }
                }
            }
        },
        measurements: span.measurements
    };
}
;
 //# sourceMappingURL=transactionEvent.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/env.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSDKSource",
    ()=>getSDKSource,
    "isBrowserBundle",
    ()=>isBrowserBundle
]);
/*
 * This module exists for optimizations in the build process through rollup and terser.  We define some global
 * constants, which can be overridden during build. By guarding certain pieces of code with functions that return these
 * constants, we can control whether or not they appear in the final bundle. (Any code guarded by a false condition will
 * never run, and will hence be dropped during treeshaking.) The two primary uses for this are stripping out calls to
 * `debug` and preventing node-related code from appearing in browser bundles.
 *
 * Attention:
 * This file should not be used to define constants/flags that are intended to be used for tree-shaking conducted by
 * users. These flags should live in their respective packages, as we identified user tooling (specifically webpack)
 * having issues tree-shaking these constants across package boundaries.
 * An example for this is the __SENTRY_DEBUG__ constant. It is declared in each package individually because we want
 * users to be able to shake away expressions that it guards.
 */ /**
 * Figures out if we're building a browser bundle.
 *
 * @returns true if this is a browser bundle build.
 */ function isBrowserBundle() {
    return typeof __SENTRY_BROWSER_BUNDLE__ !== 'undefined' && !!__SENTRY_BROWSER_BUNDLE__;
}
/**
 * Get source of SDK.
 */ function getSDKSource() {
    // This comment is used to identify this line in the CDN bundle build step and replace this with "return 'cdn';"
    /* __SENTRY_SDK_SOURCE__ */ return 'npm';
}
;
 //# sourceMappingURL=env.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/sdkMetadata.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applySdkMetadata",
    ()=>applySdkMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/version.js [app-client] (ecmascript)");
;
/**
 * A builder for the SDK metadata in the options for the SDK initialization.
 *
 * Note: This function is identical to `buildMetadata` in Remix and NextJS and SvelteKit.
 * We don't extract it for bundle size reasons.
 * @see https://github.com/getsentry/sentry-javascript/pull/7404
 * @see https://github.com/getsentry/sentry-javascript/pull/4196
 *
 * If you make changes to this function consider updating the others as well.
 *
 * @param options SDK options object that gets mutated
 * @param names list of package names
 */ function applySdkMetadata(options, name, names = [
    name
], source = 'npm') {
    const sdk = (options._metadata = options._metadata || {}).sdk = options._metadata.sdk || {};
    if (!sdk.name) {
        sdk.name = `sentry.javascript.${name}`;
        sdk.packages = names.map((name)=>({
                name: `${source}:@sentry/${name}`,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_VERSION"]
            }));
        sdk.version = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_VERSION"];
    }
}
;
 //# sourceMappingURL=sdkMetadata.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/ipAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addAutoIpAddressToSession",
    ()=>addAutoIpAddressToSession,
    "addAutoIpAddressToUser",
    ()=>addAutoIpAddressToUser
]);
// By default, we want to infer the IP address, unless this is explicitly set to `null`
// We do this after all other processing is done
// If `ip_address` is explicitly set to `null` or a value, we leave it as is
/**
 * @internal
 * @deprecated -- set ip inferral via via SDK metadata options on client instead.
 */ function addAutoIpAddressToUser(objWithMaybeUser) {
    if (objWithMaybeUser.user?.ip_address === undefined) {
        objWithMaybeUser.user = {
            ...objWithMaybeUser.user,
            ip_address: '{{auto}}'
        };
    }
}
/**
 * @internal
 */ function addAutoIpAddressToSession(session) {
    if ('aggregates' in session) {
        if (session.attrs?.['ip_address'] === undefined) {
            session.attrs = {
                ...session.attrs,
                ip_address: '{{auto}}'
            };
        }
    } else {
        if (session.ipAddress === undefined) {
            session.ipAddress = '{{auto}}';
        }
    }
}
;
 //# sourceMappingURL=ipAddress.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/eventbuilder.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_enhanceErrorWithSentryInfo",
    ()=>_enhanceErrorWithSentryInfo,
    "eventFromMessage",
    ()=>eventFromMessage,
    "eventFromUnknownInput",
    ()=>eventFromUnknownInput,
    "exceptionFromError",
    ()=>exceptionFromError,
    "parseStackFrames",
    ()=>parseStackFrames
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Extracts stack frames from the error.stack string
 */ function parseStackFrames(stackParser, error) {
    return stackParser(error.stack || '', 1);
}
function hasSentryFetchUrlHost(error) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(error) && '__sentry_fetch_url_host__' in error && typeof error.__sentry_fetch_url_host__ === 'string';
}
/**
 * Enhances the error message with the hostname for better Sentry error reporting.
 * This allows third-party packages to still match on the original error message,
 * while Sentry gets the enhanced version with context.
 *
 * Only used internally
 * @hidden
 */ function _enhanceErrorWithSentryInfo(error) {
    // If the error has a __sentry_fetch_url_host__ property (added by fetch instrumentation),
    // enhance the error message with the hostname.
    if (hasSentryFetchUrlHost(error)) {
        return `${error.message} (${error.__sentry_fetch_url_host__})`;
    }
    return error.message;
}
/**
 * Extracts stack frames from the error and builds a Sentry Exception
 */ function exceptionFromError(stackParser, error) {
    const exception = {
        type: error.name || error.constructor.name,
        value: _enhanceErrorWithSentryInfo(error)
    };
    const frames = parseStackFrames(stackParser, error);
    if (frames.length) {
        exception.stacktrace = {
            frames
        };
    }
    return exception;
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
function getMessageForObject(exception) {
    if ('name' in exception && typeof exception.name === 'string') {
        let message = `'${exception.name}' captured as exception`;
        if ('message' in exception && typeof exception.message === 'string') {
            message += ` with message '${exception.message}'`;
        }
        return message;
    } else if ('message' in exception && typeof exception.message === 'string') {
        return exception.message;
    }
    const keys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractExceptionKeysForMessage"])(exception);
    // Some ErrorEvent instances do not have an `error` property, which is why they are not handled before
    // We still want to try to get a decent message for these cases
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isErrorEvent"])(exception)) {
        return `Event \`ErrorEvent\` captured as exception with message \`${exception.message}\``;
    }
    const className = getObjectClassName(exception);
    return `${className && className !== 'Object' ? `'${className}'` : 'Object'} captured as exception with keys: ${keys}`;
}
function getObjectClassName(obj) {
    try {
        const prototype = Object.getPrototypeOf(obj);
        return prototype ? prototype.constructor.name : undefined;
    } catch  {
    // ignore errors here
    }
}
function getException(client, mechanism, exception, hint) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(exception)) {
        return [
            exception,
            undefined
        ];
    }
    // Mutate this!
    mechanism.synthetic = true;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlainObject"])(exception)) {
        const normalizeDepth = client?.getOptions().normalizeDepth;
        const extras = {
            ['__serialized__']: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeToSize"])(exception, normalizeDepth)
        };
        const errorFromProp = getErrorPropertyFromObject(exception);
        if (errorFromProp) {
            return [
                errorFromProp,
                extras
            ];
        }
        const message = getMessageForObject(exception);
        const ex = hint?.syntheticException || new Error(message);
        ex.message = message;
        return [
            ex,
            extras
        ];
    }
    // This handles when someone does: `throw "something awesome";`
    // We use synthesized Error here so we can extract a (rough) stack trace.
    const ex = hint?.syntheticException || new Error(exception);
    ex.message = `${exception}`;
    return [
        ex,
        undefined
    ];
}
/**
 * Builds and Event from a Exception
 * @hidden
 */ function eventFromUnknownInput(client, stackParser, exception, hint) {
    const providedMechanism = hint?.data && hint.data.mechanism;
    const mechanism = providedMechanism || {
        handled: true,
        type: 'generic'
    };
    const [ex, extras] = getException(client, mechanism, exception, hint);
    const event = {
        exception: {
            values: [
                exceptionFromError(stackParser, ex)
            ]
        }
    };
    if (extras) {
        event.extra = extras;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionTypeValue"])(event, undefined, undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, mechanism);
    return {
        ...event,
        event_id: hint?.event_id
    };
}
/**
 * Builds and Event from a Message
 * @hidden
 */ function eventFromMessage(stackParser, message, level = 'info', hint, attachStacktrace) {
    const event = {
        event_id: hint?.event_id,
        level
    };
    if (attachStacktrace && hint?.syntheticException) {
        const frames = parseStackFrames(stackParser, hint.syntheticException);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
                synthetic: true
            });
        }
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isParameterizedString"])(message)) {
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
;
 //# sourceMappingURL=eventbuilder.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/eventbuilder.js [app-client] (ecmascript) <export _enhanceErrorWithSentryInfo as _INTERNAL_enhanceErrorWithSentryInfo>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_INTERNAL_enhanceErrorWithSentryInfo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_enhanceErrorWithSentryInfo"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/eventbuilder.js [app-client] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/supports.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNativeFunction",
    ()=>isNativeFunction,
    "supportsDOMError",
    ()=>supportsDOMError,
    "supportsDOMException",
    ()=>supportsDOMException,
    "supportsErrorEvent",
    ()=>supportsErrorEvent,
    "supportsFetch",
    ()=>supportsFetch,
    "supportsHistory",
    ()=>supportsHistory,
    "supportsNativeFetch",
    ()=>supportsNativeFetch,
    "supportsReferrerPolicy",
    ()=>supportsReferrerPolicy,
    "supportsReportingObserver",
    ()=>supportsReportingObserver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
;
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
/**
 * Tells whether current environment supports ErrorEvent objects
 * {@link supportsErrorEvent}.
 *
 * @returns Answer to the given question.
 */ function supportsErrorEvent() {
    try {
        new ErrorEvent('');
        return true;
    } catch  {
        return false;
    }
}
/**
 * Tells whether current environment supports DOMError objects
 * {@link supportsDOMError}.
 *
 * @returns Answer to the given question.
 */ function supportsDOMError() {
    try {
        // Chrome: VM89:1 Uncaught TypeError: Failed to construct 'DOMError':
        // 1 argument required, but only 0 present.
        // @ts-expect-error It really needs 1 argument, not 0.
        new DOMError('');
        return true;
    } catch  {
        return false;
    }
}
/**
 * Tells whether current environment supports DOMException objects
 * {@link supportsDOMException}.
 *
 * @returns Answer to the given question.
 */ function supportsDOMException() {
    try {
        new DOMException('');
        return true;
    } catch  {
        return false;
    }
}
/**
 * Tells whether current environment supports History API
 * {@link supportsHistory}.
 *
 * @returns Answer to the given question.
 */ function supportsHistory() {
    return 'history' in WINDOW && !!WINDOW.history;
}
/**
 * Tells whether current environment supports Fetch API
 * {@link supportsFetch}.
 *
 * @returns Answer to the given question.
 * @deprecated This is no longer used and will be removed in a future major version.
 */ const supportsFetch = _isFetchSupported;
function _isFetchSupported() {
    if (!('fetch' in WINDOW)) {
        return false;
    }
    try {
        new Headers();
        // Deno requires a valid URL so '' cannot be used as an argument
        new Request('data:,');
        new Response();
        return true;
    } catch  {
        return false;
    }
}
/**
 * isNative checks if the given function is a native implementation
 */ // eslint-disable-next-line @typescript-eslint/ban-types
function isNativeFunction(func) {
    return func && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
/**
 * Tells whether current environment supports Fetch API natively
 * {@link supportsNativeFetch}.
 *
 * @returns true if `window.fetch` is natively implemented, false otherwise
 */ function supportsNativeFetch() {
    if (typeof EdgeRuntime === 'string') {
        return true;
    }
    if (!_isFetchSupported()) {
        return false;
    }
    // Fast path to avoid DOM I/O
    // eslint-disable-next-line @typescript-eslint/unbound-method
    if (isNativeFunction(WINDOW.fetch)) {
        return true;
    }
    // window.fetch is implemented, but is polyfilled or already wrapped (e.g: by a chrome extension)
    // so create a "pure" iframe to see if that has native fetch
    let result = false;
    const doc = WINDOW.document;
    // eslint-disable-next-line deprecation/deprecation
    if (doc && typeof doc.createElement === 'function') {
        try {
            const sandbox = doc.createElement('iframe');
            sandbox.hidden = true;
            doc.head.appendChild(sandbox);
            if (sandbox.contentWindow?.fetch) {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                result = isNativeFunction(sandbox.contentWindow.fetch);
            }
            doc.head.removeChild(sandbox);
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', err);
        }
    }
    return result;
}
/**
 * Tells whether current environment supports ReportingObserver API
 * {@link supportsReportingObserver}.
 *
 * @returns Answer to the given question.
 */ function supportsReportingObserver() {
    return 'ReportingObserver' in WINDOW;
}
/**
 * Tells whether current environment supports Referrer Policy API
 * {@link supportsReferrerPolicy}.
 *
 * @returns Answer to the given question.
 * @deprecated This is no longer used and will be removed in a future major version.
 */ function supportsReferrerPolicy() {
    // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default'
    // (see https://caniuse.com/#feat=referrer-policy),
    // it doesn't. And it throws an exception instead of ignoring this parameter...
    // REF: https://github.com/getsentry/raven-js/issues/1233
    if (!_isFetchSupported()) {
        return false;
    }
    try {
        new Request('_', {
            referrerPolicy: 'origin'
        });
        return true;
    } catch  {
        return false;
    }
}
;
 //# sourceMappingURL=supports.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/severity.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "severityLevelFromString",
    ()=>severityLevelFromString
]);
/**
 * Converts a string-based level into a `SeverityLevel`, normalizing it along the way.
 *
 * @param level String representation of desired `SeverityLevel`.
 * @returns The `SeverityLevel` corresponding to the given string, or 'log' if the string isn't a valid level.
 */ function severityLevelFromString(level) {
    return level === 'warn' ? 'warning' : [
        'fatal',
        'error',
        'warning',
        'log',
        'info',
        'debug'
    ].includes(level) ? level : 'log';
}
;
 //# sourceMappingURL=severity.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/breadcrumb-log-level.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBreadcrumbLogLevelFromHttpStatusCode",
    ()=>getBreadcrumbLogLevelFromHttpStatusCode
]);
/**
 * Determine a breadcrumb's log level (only `warning` or `error`) based on an HTTP status code.
 */ function getBreadcrumbLogLevelFromHttpStatusCode(statusCode) {
    // NOTE: undefined defaults to 'info' in Sentry
    if (statusCode === undefined) {
        return undefined;
    } else if (statusCode >= 400 && statusCode < 500) {
        return 'warning';
    } else if (statusCode >= 500) {
        return 'error';
    } else {
        return undefined;
    }
}
;
 //# sourceMappingURL=breadcrumb-log-level.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/url.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHttpSpanDetailsFromUrlObject",
    ()=>getHttpSpanDetailsFromUrlObject,
    "getSanitizedUrlString",
    ()=>getSanitizedUrlString,
    "getSanitizedUrlStringFromUrlObject",
    ()=>getSanitizedUrlStringFromUrlObject,
    "isURLObjectRelative",
    ()=>isURLObjectRelative,
    "parseStringToURLObject",
    ()=>parseStringToURLObject,
    "parseUrl",
    ()=>parseUrl,
    "stripDataUrlContent",
    ()=>stripDataUrlContent,
    "stripUrlQueryAndFragment",
    ()=>stripUrlQueryAndFragment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
;
// Curious about `thismessage:/`? See: https://www.rfc-editor.org/rfc/rfc2557.html
//  > When the methods above do not yield an absolute URI, a base URL
//  > of "thismessage:/" MUST be employed. This base URL has been
//  > defined for the sole purpose of resolving relative references
//  > within a multipart/related structure when no other base URI is
//  > specified.
//
// We need to provide a base URL to `parseStringToURLObject` because the fetch API gives us a
// relative URL sometimes.
//
// This is the only case where we need to provide a base URL to `parseStringToURLObject`
// because the relative URL is not valid on its own.
const DEFAULT_BASE_URL = 'thismessage:/';
/**
 * Checks if the URL object is relative
 *
 * @param url - The URL object to check
 * @returns True if the URL object is relative, false otherwise
 */ function isURLObjectRelative(url) {
    return 'isRelative' in url;
}
/**
 * Parses string to a URL object
 *
 * @param url - The URL to parse
 * @returns The parsed URL object or undefined if the URL is invalid
 */ function parseStringToURLObject(url, urlBase) {
    const isRelative = url.indexOf('://') <= 0 && url.indexOf('//') !== 0;
    const base = urlBase ?? (isRelative ? DEFAULT_BASE_URL : undefined);
    try {
        // Use `canParse` to short-circuit the URL constructor if it's not a valid URL
        // This is faster than trying to construct the URL and catching the error
        // Node 20+, Chrome 120+, Firefox 115+, Safari 17+
        if ('canParse' in URL && !URL.canParse(url, base)) {
            return undefined;
        }
        const fullUrlObject = new URL(url, base);
        if (isRelative) {
            // Because we used a fake base URL, we need to return a relative URL object.
            // We cannot return anything about the origin, host, etc. because it will refer to the fake base URL.
            return {
                isRelative,
                pathname: fullUrlObject.pathname,
                search: fullUrlObject.search,
                hash: fullUrlObject.hash
            };
        }
        return fullUrlObject;
    } catch  {
    // empty body
    }
    return undefined;
}
/**
 * Takes a URL object and returns a sanitized string which is safe to use as span name
 * see: https://develop.sentry.dev/sdk/data-handling/#structuring-data
 */ function getSanitizedUrlStringFromUrlObject(url) {
    if (isURLObjectRelative(url)) {
        return url.pathname;
    }
    const newUrl = new URL(url);
    newUrl.search = '';
    newUrl.hash = '';
    if ([
        '80',
        '443'
    ].includes(newUrl.port)) {
        newUrl.port = '';
    }
    if (newUrl.password) {
        newUrl.password = '%filtered%';
    }
    if (newUrl.username) {
        newUrl.username = '%filtered%';
    }
    return newUrl.toString();
}
function getHttpSpanNameFromUrlObject(urlObject, kind, request, routeName) {
    const method = request?.method?.toUpperCase() ?? 'GET';
    const route = routeName ? routeName : urlObject ? kind === 'client' ? getSanitizedUrlStringFromUrlObject(urlObject) : urlObject.pathname : '/';
    return `${method} ${route}`;
}
/**
 * Takes a parsed URL object and returns a set of attributes for the span
 * that represents the HTTP request for that url. This is used for both server
 * and client http spans.
 *
 * Follows https://opentelemetry.io/docs/specs/semconv/http/.
 *
 * @param urlObject - see {@link parseStringToURLObject}
 * @param kind - The type of HTTP operation (server or client)
 * @param spanOrigin - The origin of the span
 * @param request - The request object, see {@link PartialRequest}
 * @param routeName - The name of the route, must be low cardinality
 * @returns The span name and attributes for the HTTP operation
 */ function getHttpSpanDetailsFromUrlObject(urlObject, kind, spanOrigin, request, routeName) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: spanOrigin,
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: 'url'
    };
    if (routeName) {
        // This is based on https://opentelemetry.io/docs/specs/semconv/http/http-spans/#name
        attributes[kind === 'server' ? 'http.route' : 'url.template'] = routeName;
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]] = 'route';
    }
    if (request?.method) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD"]] = request.method.toUpperCase();
    }
    if (urlObject) {
        if (urlObject.search) {
            attributes['url.query'] = urlObject.search;
        }
        if (urlObject.hash) {
            attributes['url.fragment'] = urlObject.hash;
        }
        if (urlObject.pathname) {
            attributes['url.path'] = urlObject.pathname;
            if (urlObject.pathname === '/') {
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]] = 'route';
            }
        }
        if (!isURLObjectRelative(urlObject)) {
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_URL_FULL"]] = urlObject.href;
            if (urlObject.port) {
                attributes['url.port'] = urlObject.port;
            }
            if (urlObject.protocol) {
                attributes['url.scheme'] = urlObject.protocol;
            }
            if (urlObject.hostname) {
                attributes[kind === 'server' ? 'server.address' : 'url.domain'] = urlObject.hostname;
            }
        }
    }
    return [
        getHttpSpanNameFromUrlObject(urlObject, kind, request, routeName),
        attributes
    ];
}
/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */ function parseUrl(url) {
    if (!url) {
        return {};
    }
    const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    // coerce to undefined values to empty string so we don't get 'undefined'
    const query = match[6] || '';
    const fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        search: query,
        hash: fragment,
        relative: match[5] + query + fragment
    };
}
/**
 * Strip the query string and fragment off of a given URL or path (if present)
 *
 * @param urlPath Full URL or path, including possible query string and/or fragment
 * @returns URL or path without query string or fragment
 */ function stripUrlQueryAndFragment(urlPath) {
    return urlPath.split(/[?#]/, 1)[0];
}
/**
 * Takes a URL object and returns a sanitized string which is safe to use as span name
 * see: https://develop.sentry.dev/sdk/data-handling/#structuring-data
 */ function getSanitizedUrlString(url) {
    const { protocol, host, path } = url;
    const filteredHost = host?.replace(/^.*@/, '[filtered]:[filtered]@').replace(/(:80)$/, '').replace(/(:443)$/, '') || '';
    return `${protocol ? `${protocol}://` : ''}${filteredHost}${path}`;
}
/**
 * Strips the content from a data URL, returning a placeholder with the MIME type.
 *
 * Data URLs can be very long (e.g. base64 encoded scripts for Web Workers),
 * with little valuable information, often leading to envelopes getting dropped due
 * to size limit violations. Therefore, we strip data URLs and replace them with a
 * placeholder.
 *
 * @param url - The URL to process
 * @param includeDataPrefix - If true, includes the first 10 characters of the data stream
 *                            for debugging (e.g., to identify magic bytes like WASM's AGFzbQ).
 *                            Defaults to true.
 * @returns For data URLs, returns a short format like `data:text/javascript;base64,SGVsbG8gV2... [truncated]`.
 *          For non-data URLs, returns the original URL unchanged.
 */ function stripDataUrlContent(url, includeDataPrefix = true) {
    if (url.startsWith('data:')) {
        // Match the MIME type (everything after 'data:' until the first ';' or ',')
        const match = url.match(/^data:([^;,]+)/);
        const mimeType = match ? match[1] : 'text/plain';
        const isBase64 = url.includes(';base64,');
        // Find where the actual data starts (after the comma)
        const dataStart = url.indexOf(',');
        let dataPrefix = '';
        if (includeDataPrefix && dataStart !== -1) {
            const data = url.slice(dataStart + 1);
            // Include first 10 chars of data to help identify content (e.g., magic bytes)
            dataPrefix = data.length > 10 ? `${data.slice(0, 10)}... [truncated]` : data;
        }
        return `data:${mimeType}${isBase64 ? ',base64' : ''}${dataPrefix ? `,${dataPrefix}` : ''}`;
    }
    return url;
}
;
 //# sourceMappingURL=url.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/aggregate-errors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyAggregateErrorsToEvent",
    ()=>applyAggregateErrorsToEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
;
/**
 * Creates exceptions inside `event.exception.values` for errors that are nested on properties based on the `key` parameter.
 */ function applyAggregateErrorsToEvent(exceptionFromErrorImplementation, parser, key, limit, event, hint) {
    if (!event.exception?.values || !hint || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInstanceOf"])(hint.originalException, Error)) {
        return;
    }
    // Generally speaking the last item in `event.exception.values` is the exception originating from the original Error
    const originalException = event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : undefined;
    // We only create exception grouping if there is an exception in the event.
    if (originalException) {
        event.exception.values = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, hint.originalException, key, event.exception.values, originalException, 0);
    }
}
function aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error, key, prevExceptions, exception, exceptionId) {
    if (prevExceptions.length >= limit + 1) {
        return prevExceptions;
    }
    let newExceptions = [
        ...prevExceptions
    ];
    // Recursively call this function in order to walk down a chain of errors
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInstanceOf"])(error[key], Error)) {
        applyExceptionGroupFieldsForParentException(exception, exceptionId, error);
        const newException = exceptionFromErrorImplementation(parser, error[key]);
        const newExceptionId = newExceptions.length;
        applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
        newExceptions = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error[key], key, [
            newException,
            ...newExceptions
        ], newException, newExceptionId);
    }
    // This will create exception grouping for AggregateErrors
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
    if (isExceptionGroup(error)) {
        error.errors.forEach((childError, i)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInstanceOf"])(childError, Error)) {
                applyExceptionGroupFieldsForParentException(exception, exceptionId, error);
                const newException = exceptionFromErrorImplementation(parser, childError);
                const newExceptionId = newExceptions.length;
                applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
                newExceptions = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, childError, key, [
                    newException,
                    ...newExceptions
                ], newException, newExceptionId);
            }
        });
    }
    return newExceptions;
}
function isExceptionGroup(error) {
    return Array.isArray(error.errors);
}
function applyExceptionGroupFieldsForParentException(exception, exceptionId, error) {
    exception.mechanism = {
        handled: true,
        type: 'auto.core.linked_errors',
        ...isExceptionGroup(error) && {
            is_exception_group: true
        },
        ...exception.mechanism,
        exception_id: exceptionId
    };
}
function applyExceptionGroupFieldsForChildException(exception, source, exceptionId, parentId) {
    exception.mechanism = {
        handled: true,
        ...exception.mechanism,
        type: 'chained',
        source,
        exception_id: exceptionId,
        parent_id: parentId
    };
}
;
 //# sourceMappingURL=aggregate-errors.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/node.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNodeEnv",
    ()=>isNodeEnv,
    "loadModule",
    ()=>loadModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/env.js [app-client] (ecmascript)");
;
/**
 * NOTE: In order to avoid circular dependencies, if you add a function to this module and it needs to print something,
 * you must either a) use `console.log` rather than the `debug` singleton, or b) put your function elsewhere.
 */ /**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */ function isNodeEnv() {
    // explicitly check for browser bundles as those can be optimized statically
    // by terser/rollup.
    return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowserBundle"])() && Object.prototype.toString.call(typeof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] : 0) === '[object process]';
}
/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function dynamicRequire(mod, request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return mod.require(request);
}
/**
 * Helper for dynamically loading module that should work with linked dependencies.
 * The problem is that we _should_ be using `require(require.resolve(moduleName, { paths: [cwd()] }))`
 * However it's _not possible_ to do that with Webpack, as it has to know all the dependencies during
 * build time. `require.resolve` is also not available in any other way, so we cannot create,
 * a fake helper like we do with `dynamicRequire`.
 *
 * We always prefer to use local package, thus the value is not returned early from each `try/catch` block.
 * That is to mimic the behavior of `require.resolve` exactly.
 *
 * @param moduleName module name to require
 * @param existingModule module to use for requiring
 * @returns possibly required module
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadModule(moduleName, existingModule = module) {
    let mod;
    try {
        mod = dynamicRequire(existingModule, moduleName);
    } catch  {
    // no-empty
    }
    if (!mod) {
        try {
            const { cwd } = dynamicRequire(existingModule, 'process');
            mod = dynamicRequire(existingModule, `${cwd()}/node_modules/${moduleName}`);
        } catch  {
        // no-empty
        }
    }
    return mod;
}
;
 //# sourceMappingURL=node.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/isBrowser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBrowser",
    ()=>isBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$node$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/node.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
/**
 * Returns true if we are in the browser.
 */ function isBrowser() {
    // eslint-disable-next-line no-restricted-globals
    return typeof window !== 'undefined' && (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$node$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeEnv"])() || isElectronNodeRenderer());
}
// Electron renderers with nodeIntegration enabled are detected as Node.js so we specifically test for them
function isElectronNodeRenderer() {
    const process = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].process;
    return process?.type === 'renderer';
}
;
 //# sourceMappingURL=isBrowser.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/traceData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTraceData",
    ()=>getTraceData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$asyncContext$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/asyncContext/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/carrier.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/baggage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/tracing.js [app-client] (ecmascript)");
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
 * Extracts trace propagation data from the current span or from the client's scope (via transaction or propagation
 * context) and serializes it to `sentry-trace` and `baggage` values. These values can be used to propagate
 * a trace via our tracing Http headers or Html `<meta>` tags.
 *
 * This function also applies some validation to the generated sentry-trace and baggage values to ensure that
 * only valid strings are returned.
 *
 * If (@param options.propagateTraceparent) is `true`, the function will also generate a `traceparent` value,
 * following the W3C traceparent header format.
 *
 * @returns an object with the tracing data values. The object keys are the name of the tracing key to be used as header
 * or meta tag name.
 */ function getTraceData(options = {}) {
    const client = options.client || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEnabled"])() || !client) {
        return {};
    }
    const carrier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$carrier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMainCarrier"])();
    const acs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$asyncContext$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAsyncContextStrategy"])(carrier);
    if (acs.getTraceData) {
        return acs.getTraceData(options);
    }
    const scope = options.scope || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
    const span = options.span || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
    const sentryTrace = span ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToTraceHeader"])(span) : scopeToTraceHeader(scope);
    const dsc = span ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromSpan"])(span) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDynamicSamplingContextFromScope"])(client, scope);
    const baggage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$baggage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dynamicSamplingContextToSentryBaggageHeader"])(dsc);
    const isValidSentryTraceHeader = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACEPARENT_REGEXP"].test(sentryTrace);
    if (!isValidSentryTraceHeader) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('Invalid sentry-trace data. Cannot generate trace data');
        return {};
    }
    const traceData = {
        'sentry-trace': sentryTrace,
        baggage
    };
    if (options.propagateTraceparent) {
        traceData.traceparent = span ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToTraceparentHeader"])(span) : scopeToTraceparentHeader(scope);
    }
    return traceData;
}
/**
 * Get a sentry-trace header value for the given scope.
 */ function scopeToTraceHeader(scope) {
    const { traceId, sampled, propagationSpanId } = scope.getPropagationContext();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSentryTraceHeader"])(traceId, propagationSpanId, sampled);
}
function scopeToTraceparentHeader(scope) {
    const { traceId, sampled, propagationSpanId } = scope.getPropagationContext();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTraceparentHeader"])(traceId, propagationSpanId, sampled);
}
;
 //# sourceMappingURL=traceData.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/path.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "basename",
    ()=>basename,
    "dirname",
    ()=>dirname,
    "isAbsolute",
    ()=>isAbsolute,
    "join",
    ()=>join,
    "normalizePath",
    ()=>normalizePath,
    "relative",
    ()=>relative,
    "resolve",
    ()=>resolve
]);
// Slightly modified (no IE8 support, ES6) and transcribed to TypeScript
// https://github.com/calvinmetcalf/rollup-plugin-node-builtins/blob/63ab8aacd013767445ca299e468d9a60a95328d7/src/es6/path.js
//
// Copyright Joyent, Inc.and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/** JSDoc */ function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    let up = 0;
    for(let i = parts.length - 1; i >= 0; i--){
        const last = parts[i];
        if (last === '.') {
            parts.splice(i, 1);
        } else if (last === '..') {
            parts.splice(i, 1);
            up++;
        } else if (up) {
            parts.splice(i, 1);
            up--;
        }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
        for(; up--; up){
            parts.unshift('..');
        }
    }
    return parts;
}
// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
const splitPathRe = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
/** JSDoc */ function splitPath(filename) {
    // Truncate files names greater than 1024 characters to avoid regex dos
    // https://github.com/getsentry/sentry-javascript/pull/8737#discussion_r1285719172
    const truncated = filename.length > 1024 ? `<truncated>${filename.slice(-1024)}` : filename;
    const parts = splitPathRe.exec(truncated);
    return parts ? parts.slice(1) : [];
}
// path.resolve([from ...], to)
// posix version
/** JSDoc */ function resolve(...args) {
    let resolvedPath = '';
    let resolvedAbsolute = false;
    for(let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--){
        const path = i >= 0 ? args[i] : '/';
        // Skip empty entries
        if (!path) {
            continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charAt(0) === '/';
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path
    resolvedPath = normalizeArray(resolvedPath.split('/').filter((p)=>!!p), !resolvedAbsolute).join('/');
    return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
}
/** JSDoc */ function trim(arr) {
    let start = 0;
    for(; start < arr.length; start++){
        if (arr[start] !== '') {
            break;
        }
    }
    let end = arr.length - 1;
    for(; end >= 0; end--){
        if (arr[end] !== '') {
            break;
        }
    }
    if (start > end) {
        return [];
    }
    return arr.slice(start, end - start + 1);
}
// path.relative(from, to)
// posix version
/** JSDoc */ function relative(from, to) {
    /* eslint-disable no-param-reassign */ from = resolve(from).slice(1);
    to = resolve(to).slice(1);
    /* eslint-enable no-param-reassign */ const fromParts = trim(from.split('/'));
    const toParts = trim(to.split('/'));
    const length = Math.min(fromParts.length, toParts.length);
    let samePartsLength = length;
    for(let i = 0; i < length; i++){
        if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
        }
    }
    let outputParts = [];
    for(let i = samePartsLength; i < fromParts.length; i++){
        outputParts.push('..');
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join('/');
}
// path.normalize(path)
// posix version
/** JSDoc */ function normalizePath(path) {
    const isPathAbsolute = isAbsolute(path);
    const trailingSlash = path.slice(-1) === '/';
    // Normalize the path
    let normalizedPath = normalizeArray(path.split('/').filter((p)=>!!p), !isPathAbsolute).join('/');
    if (!normalizedPath && !isPathAbsolute) {
        normalizedPath = '.';
    }
    if (normalizedPath && trailingSlash) {
        normalizedPath += '/';
    }
    return (isPathAbsolute ? '/' : '') + normalizedPath;
}
// posix version
/** JSDoc */ function isAbsolute(path) {
    return path.charAt(0) === '/';
}
// posix version
/** JSDoc */ function join(...args) {
    return normalizePath(args.join('/'));
}
/** JSDoc */ function dirname(path) {
    const result = splitPath(path);
    const root = result[0] || '';
    let dir = result[1];
    if (!root && !dir) {
        // No dirname whatsoever
        return '.';
    }
    if (dir) {
        // It has a dirname, strip trailing slash
        dir = dir.slice(0, dir.length - 1);
    }
    return root + dir;
}
/** JSDoc */ function basename(path, ext) {
    let f = splitPath(path)[2] || '';
    if (ext && f.slice(ext.length * -1) === ext) {
        f = f.slice(0, f.length - ext.length);
    }
    return f;
}
;
 //# sourceMappingURL=path.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/featureFlags.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_INTERNAL_FLAG_BUFFER_SIZE",
    ()=>_INTERNAL_FLAG_BUFFER_SIZE,
    "_INTERNAL_MAX_FLAGS_PER_SPAN",
    ()=>_INTERNAL_MAX_FLAGS_PER_SPAN,
    "_INTERNAL_addFeatureFlagToActiveSpan",
    ()=>_INTERNAL_addFeatureFlagToActiveSpan,
    "_INTERNAL_copyFlagsFromScopeToEvent",
    ()=>_INTERNAL_copyFlagsFromScopeToEvent,
    "_INTERNAL_insertFlagToScope",
    ()=>_INTERNAL_insertFlagToScope,
    "_INTERNAL_insertToFlagBuffer",
    ()=>_INTERNAL_insertToFlagBuffer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Ordered LRU cache for storing feature flags in the scope context. The name
 * of each flag in the buffer is unique, and the output of getAll() is ordered
 * from oldest to newest.
 */ /**
 * Max size of the LRU flag buffer stored in Sentry scope and event contexts.
 */ const _INTERNAL_FLAG_BUFFER_SIZE = 100;
/**
 * Max number of flag evaluations to record per span.
 */ const _INTERNAL_MAX_FLAGS_PER_SPAN = 10;
const SPAN_FLAG_ATTRIBUTE_PREFIX = 'flag.evaluation.';
/**
 * Copies feature flags that are in current scope context to the event context
 */ function _INTERNAL_copyFlagsFromScopeToEvent(event) {
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
    const flagContext = scope.getScopeData().contexts.flags;
    const flagBuffer = flagContext ? flagContext.values : [];
    if (!flagBuffer.length) {
        return event;
    }
    if (event.contexts === undefined) {
        event.contexts = {};
    }
    event.contexts.flags = {
        values: [
            ...flagBuffer
        ]
    };
    return event;
}
/**
 * Inserts a flag into the current scope's context while maintaining ordered LRU properties.
 * Not thread-safe. After inserting:
 * - The flag buffer is sorted in order of recency, with the newest evaluation at the end.
 * - The names in the buffer are always unique.
 * - The length of the buffer never exceeds `maxSize`.
 *
 * @param name     Name of the feature flag to insert.
 * @param value    Value of the feature flag.
 * @param maxSize  Max number of flags the buffer should store. Default value should always be used in production.
 */ function _INTERNAL_insertFlagToScope(name, value, maxSize = _INTERNAL_FLAG_BUFFER_SIZE) {
    const scopeContexts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().getScopeData().contexts;
    if (!scopeContexts.flags) {
        scopeContexts.flags = {
            values: []
        };
    }
    const flags = scopeContexts.flags.values;
    _INTERNAL_insertToFlagBuffer(flags, name, value, maxSize);
}
/**
 * Exported for tests only. Currently only accepts boolean values (otherwise no-op).
 * Inserts a flag into a FeatureFlag array while maintaining the following properties:
 * - Flags are sorted in order of recency, with the newest evaluation at the end.
 * - The flag names are always unique.
 * - The length of the array never exceeds `maxSize`.
 *
 * @param flags      The buffer to insert the flag into.
 * @param name       Name of the feature flag to insert.
 * @param value      Value of the feature flag.
 * @param maxSize    Max number of flags the buffer should store. Default value should always be used in production.
 */ function _INTERNAL_insertToFlagBuffer(flags, name, value, maxSize) {
    if (typeof value !== 'boolean') {
        return;
    }
    if (flags.length > maxSize) {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error(`[Feature Flags] insertToFlagBuffer called on a buffer larger than maxSize=${maxSize}`);
        return;
    }
    // Check if the flag is already in the buffer - O(n)
    const index = flags.findIndex((f)=>f.flag === name);
    if (index !== -1) {
        // The flag was found, remove it from its current position - O(n)
        flags.splice(index, 1);
    }
    if (flags.length === maxSize) {
        // If at capacity, pop the earliest flag - O(n)
        flags.shift();
    }
    // Push the flag to the end - O(1)
    flags.push({
        flag: name,
        result: value
    });
}
/**
 * Records a feature flag evaluation for the active span. This is a no-op for non-boolean values.
 * The flag and its value is stored in span attributes with the `flag.evaluation` prefix. Once the
 * unique flags for a span reaches maxFlagsPerSpan, subsequent flags are dropped.
 *
 * @param name             Name of the feature flag.
 * @param value            Value of the feature flag. Non-boolean values are ignored.
 * @param maxFlagsPerSpan  Max number of flags a buffer should store. Default value should always be used in production.
 */ function _INTERNAL_addFeatureFlagToActiveSpan(name, value, maxFlagsPerSpan = _INTERNAL_MAX_FLAGS_PER_SPAN) {
    if (typeof value !== 'boolean') {
        return;
    }
    const span = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
    if (!span) {
        return;
    }
    const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).data;
    // If the flag already exists, always update it
    if (`${SPAN_FLAG_ATTRIBUTE_PREFIX}${name}` in attributes) {
        span.setAttribute(`${SPAN_FLAG_ATTRIBUTE_PREFIX}${name}`, value);
        return;
    }
    // Else, add the flag to the span if we have not reached the max number of flags
    const numOfAddedFlags = Object.keys(attributes).filter((key)=>key.startsWith(SPAN_FLAG_ATTRIBUTE_PREFIX)).length;
    if (numOfAddedFlags < maxFlagsPerSpan) {
        span.setAttribute(`${SPAN_FLAG_ATTRIBUTE_PREFIX}${name}`, value);
    }
}
;
 //# sourceMappingURL=featureFlags.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/parameterize.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fmt",
    ()=>fmt,
    "parameterize",
    ()=>parameterize
]);
/**
 * Tagged template function which returns parameterized representation of the message
 * For example: parameterize`This is a log statement with ${x} and ${y} params`, would return:
 * "__sentry_template_string__": 'This is a log statement with %s and %s params',
 * "__sentry_template_values__": ['first', 'second']
 *
 * @param strings An array of string values splitted between expressions
 * @param values Expressions extracted from template string
 *
 * @returns A `ParameterizedString` object that can be passed into `captureMessage` or Sentry.logger.X methods.
 */ function parameterize(strings, ...values) {
    const formatted = new String(String.raw(strings, ...values));
    formatted.__sentry_template_string__ = strings.join('\x00').replace(/%/g, '%%').replace(/\0/g, '%s');
    formatted.__sentry_template_values__ = values;
    return formatted;
}
/**
 * Tagged template function which returns parameterized representation of the message.
 *
 * @param strings An array of string values splitted between expressions
 * @param values Expressions extracted from template string
 * @returns A `ParameterizedString` object that can be passed into `captureMessage` or Sentry.logger.X methods.
 */ const fmt = parameterize;
;
 //# sourceMappingURL=parameterize.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/isSentryRequestUrl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSentryRequestUrl",
    ()=>isSentryRequestUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/url.js [app-client] (ecmascript)");
;
/**
 * Checks whether given url points to Sentry server
 *
 * @param url url to verify
 */ function isSentryRequestUrl(url, client) {
    const dsn = client?.getDsn();
    const tunnel = client?.getOptions().tunnel;
    return checkDsn(url, dsn) || checkTunnel(url, tunnel);
}
function checkTunnel(url, tunnel) {
    if (!tunnel) {
        return false;
    }
    return removeTrailingSlash(url) === removeTrailingSlash(tunnel);
}
function checkDsn(url, dsn) {
    // Requests to Sentry's ingest endpoint must have a `sentry_key` in the query string
    // This is equivalent to the public_key which is required in the DSN
    // see https://develop.sentry.dev/sdk/overview/#parsing-the-dsn
    // Therefore, a request to the same host and with a `sentry_key` in the query string
    // can be considered a request to the ingest endpoint.
    const urlParts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStringToURLObject"])(url);
    if (!urlParts || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isURLObjectRelative"])(urlParts)) {
        return false;
    }
    return dsn ? urlParts.host.includes(dsn.host) && /(^|&|\?)sentry_key=/.test(urlParts.search) : false;
}
function removeTrailingSlash(str) {
    return str[str.length - 1] === '/' ? str.slice(0, -1) : str;
}
;
 //# sourceMappingURL=isSentryRequestUrl.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/debounce.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debounce",
    ()=>debounce
]);
/**
 * Heavily simplified debounce function based on lodash.debounce.
 *
 * This function takes a callback function (@param fun) and delays its invocation
 * by @param wait milliseconds. Optionally, a maxWait can be specified in @param options,
 * which ensures that the callback is invoked at least once after the specified max. wait time.
 *
 * @param func the function whose invocation is to be debounced
 * @param wait the minimum time until the function is invoked after it was called once
 * @param options the options object, which can contain the `maxWait` property
 *
 * @returns the debounced version of the function, which needs to be called at least once to start the
 *          debouncing process. Subsequent calls will reset the debouncing timer and, in case @paramfunc
 *          was already invoked in the meantime, return @param func's return value.
 *          The debounced function has two additional properties:
 *          - `flush`: Invokes the debounced function immediately and returns its return value
 *          - `cancel`: Cancels the debouncing process and resets the debouncing timer
 */ function debounce(func, wait, options) {
    let callbackReturnValue;
    let timerId;
    let maxTimerId;
    const maxWait = options?.maxWait ? Math.max(options.maxWait, wait) : 0;
    const setTimeoutImpl = options?.setTimeoutImpl || setTimeout;
    function invokeFunc() {
        cancelTimers();
        callbackReturnValue = func();
        return callbackReturnValue;
    }
    function cancelTimers() {
        timerId !== undefined && clearTimeout(timerId);
        maxTimerId !== undefined && clearTimeout(maxTimerId);
        timerId = maxTimerId = undefined;
    }
    function flush() {
        if (timerId !== undefined || maxTimerId !== undefined) {
            return invokeFunc();
        }
        return callbackReturnValue;
    }
    function debounced() {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeoutImpl(invokeFunc, wait);
        if (maxWait && maxTimerId === undefined) {
            maxTimerId = setTimeoutImpl(invokeFunc, maxWait);
        }
        return callbackReturnValue;
    }
    debounced.cancel = cancelTimers;
    debounced.flush = flush;
    return debounced;
}
;
 //# sourceMappingURL=debounce.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [app-client] (ecmascript) <export _setSpanForScope as _INTERNAL_setSpanForScope>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_INTERNAL_setSpanForScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_setSpanForScope"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$sentry$2f$react$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@sentry/react/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [app-client] (ecmascript)");
}),
]);

//# debugId=1405bd6e-acdf-d67c-8238-d563556f0388
//# sourceMappingURL=11ab0_%40sentry_core_build_esm_utils_cf3b2ea8._.js.map