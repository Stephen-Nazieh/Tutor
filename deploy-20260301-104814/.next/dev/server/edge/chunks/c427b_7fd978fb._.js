(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/c427b_7fd978fb._.js",
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/context/context.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Get a key to uniquely identify a context value */ __turbopack_context__.s([
    "ROOT_CONTEXT",
    ()=>ROOT_CONTEXT,
    "createContextKey",
    ()=>createContextKey
]);
function createContextKey(description) {
    // The specification states that for the same input, multiple calls should
    // return different keys. Due to the nature of the JS dependency management
    // system, this creates problems where multiple versions of some package
    // could hold different keys for the same property.
    //
    // Therefore, we use Symbol.for which returns the same key for the same input.
    return Symbol.for(description);
}
var BaseContext = function() {
    /**
     * Construct a new context which inherits values from an optional parent context.
     *
     * @param parentContext a context from which to inherit values
     */ function BaseContext(parentContext) {
        // for minification
        var self = this;
        self._currentContext = parentContext ? new Map(parentContext) : new Map();
        self.getValue = function(key) {
            return self._currentContext.get(key);
        };
        self.setValue = function(key, value) {
            var context = new BaseContext(self._currentContext);
            context._currentContext.set(key, value);
            return context;
        };
        self.deleteValue = function(key) {
            var context = new BaseContext(self._currentContext);
            context._currentContext.delete(key);
            return context;
        };
    }
    return BaseContext;
}();
var ROOT_CONTEXT = new BaseContext(); //# sourceMappingURL=context.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoopContextManager",
    ()=>NoopContextManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/context/context.js [instrumentation-edge] (ecmascript)");
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __read = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spreadArray = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
var NoopContextManager = function() {
    function NoopContextManager() {}
    NoopContextManager.prototype.active = function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ROOT_CONTEXT"];
    };
    NoopContextManager.prototype.with = function(_context, fn, thisArg) {
        var args = [];
        for(var _i = 3; _i < arguments.length; _i++){
            args[_i - 3] = arguments[_i];
        }
        return fn.call.apply(fn, __spreadArray([
            thisArg
        ], __read(args), false));
    };
    NoopContextManager.prototype.bind = function(_context, target) {
        return target;
    };
    NoopContextManager.prototype.enable = function() {
        return this;
    };
    NoopContextManager.prototype.disable = function() {
        return this;
    };
    return NoopContextManager;
}();
;
 //# sourceMappingURL=NoopContextManager.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/platform/browser/globalThis.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Updates to this file should also be replicated to @opentelemetry/core too.
/**
 * - globalThis (New standard)
 * - self (Will return the current window instance for supported browsers)
 * - window (fallback for older browser implementations)
 * - global (NodeJS implementation)
 * - <object> (When all else fails)
 */ /** only globals that common to node and browsers are allowed */ // eslint-disable-next-line node/no-unsupported-features/es-builtins, no-undef
__turbopack_context__.s([
    "_globalThis",
    ()=>_globalThis
]);
var _globalThis = typeof globalThis === 'object' ? globalThis : typeof self === 'object' ? self : ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ("TURBOPACK compile-time truthy", 1) ? /*TURBOPACK member replacement*/ __turbopack_context__.g : "TURBOPACK unreachable"; //# sourceMappingURL=globalThis.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/version.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // this is autogenerated file, see scripts/version-update.js
__turbopack_context__.s([
    "VERSION",
    ()=>VERSION
]);
var VERSION = '1.9.0'; //# sourceMappingURL=version.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/internal/semver.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_makeCompatibilityCheck",
    ()=>_makeCompatibilityCheck,
    "isCompatible",
    ()=>isCompatible
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/version.js [instrumentation-edge] (ecmascript)");
;
var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function _makeCompatibilityCheck(ownVersion) {
    var acceptedVersions = new Set([
        ownVersion
    ]);
    var rejectedVersions = new Set();
    var myVersionMatch = ownVersion.match(re);
    if (!myVersionMatch) {
        // we cannot guarantee compatibility so we always return noop
        return function() {
            return false;
        };
    }
    var ownVersionParsed = {
        major: +myVersionMatch[1],
        minor: +myVersionMatch[2],
        patch: +myVersionMatch[3],
        prerelease: myVersionMatch[4]
    };
    // if ownVersion has a prerelease tag, versions must match exactly
    if (ownVersionParsed.prerelease != null) {
        return function isExactmatch(globalVersion) {
            return globalVersion === ownVersion;
        };
    }
    function _reject(v) {
        rejectedVersions.add(v);
        return false;
    }
    function _accept(v) {
        acceptedVersions.add(v);
        return true;
    }
    return function isCompatible(globalVersion) {
        if (acceptedVersions.has(globalVersion)) {
            return true;
        }
        if (rejectedVersions.has(globalVersion)) {
            return false;
        }
        var globalVersionMatch = globalVersion.match(re);
        if (!globalVersionMatch) {
            // cannot parse other version
            // we cannot guarantee compatibility so we always noop
            return _reject(globalVersion);
        }
        var globalVersionParsed = {
            major: +globalVersionMatch[1],
            minor: +globalVersionMatch[2],
            patch: +globalVersionMatch[3],
            prerelease: globalVersionMatch[4]
        };
        // if globalVersion has a prerelease tag, versions must match exactly
        if (globalVersionParsed.prerelease != null) {
            return _reject(globalVersion);
        }
        // major versions must match
        if (ownVersionParsed.major !== globalVersionParsed.major) {
            return _reject(globalVersion);
        }
        if (ownVersionParsed.major === 0) {
            if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
                return _accept(globalVersion);
            }
            return _reject(globalVersion);
        }
        if (ownVersionParsed.minor <= globalVersionParsed.minor) {
            return _accept(globalVersion);
        }
        return _reject(globalVersion);
    };
}
var isCompatible = _makeCompatibilityCheck(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["VERSION"]); //# sourceMappingURL=semver.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGlobal",
    ()=>getGlobal,
    "registerGlobal",
    ()=>registerGlobal,
    "unregisterGlobal",
    ()=>unregisterGlobal
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$platform$2f$browser$2f$globalThis$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/platform/browser/globalThis.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/version.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$semver$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/internal/semver.js [instrumentation-edge] (ecmascript)");
;
;
;
var major = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["VERSION"].split('.')[0];
var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
var _global = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$platform$2f$browser$2f$globalThis$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["_globalThis"];
function registerGlobal(type, instance, diag, allowOverride) {
    var _a;
    if (allowOverride === void 0) {
        allowOverride = false;
    }
    var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
        version: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["VERSION"]
    };
    if (!allowOverride && api[type]) {
        // already registered an API of this type
        var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
        diag.error(err.stack || err.message);
        return false;
    }
    if (api.version !== __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["VERSION"]) {
        // All registered APIs must be of the same version exactly
        var err = new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["VERSION"]);
        diag.error(err.stack || err.message);
        return false;
    }
    api[type] = instance;
    diag.debug("@opentelemetry/api: Registered a global for " + type + " v" + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["VERSION"] + ".");
    return true;
}
function getGlobal(type) {
    var _a, _b;
    var globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
    if (!globalVersion || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$semver$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isCompatible"])(globalVersion)) {
        return;
    }
    return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
function unregisterGlobal(type, diag) {
    diag.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["VERSION"] + ".");
    var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
    if (api) {
        delete api[type];
    }
} //# sourceMappingURL=global-utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagComponentLogger",
    ()=>DiagComponentLogger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js [instrumentation-edge] (ecmascript)");
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __read = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spreadArray = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
/**
 * Component Logger which is meant to be used as part of any component which
 * will add automatically additional namespace in front of the log message.
 * It will then forward all message to global diag logger
 * @example
 * const cLogger = diag.createComponentLogger({ namespace: '@opentelemetry/instrumentation-http' });
 * cLogger.debug('test');
 * // @opentelemetry/instrumentation-http test
 */ var DiagComponentLogger = function() {
    function DiagComponentLogger(props) {
        this._namespace = props.namespace || 'DiagComponentLogger';
    }
    DiagComponentLogger.prototype.debug = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++){
            args[_i] = arguments[_i];
        }
        return logProxy('debug', this._namespace, args);
    };
    DiagComponentLogger.prototype.error = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++){
            args[_i] = arguments[_i];
        }
        return logProxy('error', this._namespace, args);
    };
    DiagComponentLogger.prototype.info = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++){
            args[_i] = arguments[_i];
        }
        return logProxy('info', this._namespace, args);
    };
    DiagComponentLogger.prototype.warn = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++){
            args[_i] = arguments[_i];
        }
        return logProxy('warn', this._namespace, args);
    };
    DiagComponentLogger.prototype.verbose = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++){
            args[_i] = arguments[_i];
        }
        return logProxy('verbose', this._namespace, args);
    };
    return DiagComponentLogger;
}();
;
function logProxy(funcName, namespace, args) {
    var logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getGlobal"])('diag');
    // shortcut if logger not set
    if (!logger) {
        return;
    }
    args.unshift(namespace);
    return logger[funcName].apply(logger, __spreadArray([], __read(args), false));
} //# sourceMappingURL=ComponentLogger.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag/types.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Defines the available internal logging levels for the diagnostic logger, the numeric values
 * of the levels are defined to match the original values from the initial LogLevel to avoid
 * compatibility/migration issues for any implementation that assume the numeric ordering.
 */ __turbopack_context__.s([
    "DiagLogLevel",
    ()=>DiagLogLevel
]);
var DiagLogLevel;
(function(DiagLogLevel) {
    /** Diagnostic Logging level setting to disable all logging (except and forced logs) */ DiagLogLevel[DiagLogLevel["NONE"] = 0] = "NONE";
    /** Identifies an error scenario */ DiagLogLevel[DiagLogLevel["ERROR"] = 30] = "ERROR";
    /** Identifies a warning scenario */ DiagLogLevel[DiagLogLevel["WARN"] = 50] = "WARN";
    /** General informational log message */ DiagLogLevel[DiagLogLevel["INFO"] = 60] = "INFO";
    /** General debug log message */ DiagLogLevel[DiagLogLevel["DEBUG"] = 70] = "DEBUG";
    /**
     * Detailed trace level logging should only be used for development, should only be set
     * in a development environment.
     */ DiagLogLevel[DiagLogLevel["VERBOSE"] = 80] = "VERBOSE";
    /** Used to set the logging level to include all logging */ DiagLogLevel[DiagLogLevel["ALL"] = 9999] = "ALL";
})(DiagLogLevel || (DiagLogLevel = {})); //# sourceMappingURL=types.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLogLevelDiagLogger",
    ()=>createLogLevelDiagLogger
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag/types.js [instrumentation-edge] (ecmascript)");
;
function createLogLevelDiagLogger(maxLevel, logger) {
    if (maxLevel < __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].NONE) {
        maxLevel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].NONE;
    } else if (maxLevel > __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].ALL) {
        maxLevel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].ALL;
    }
    // In case the logger is null or undefined
    logger = logger || {};
    function _filterFunc(funcName, theLevel) {
        var theFunc = logger[funcName];
        if (typeof theFunc === 'function' && maxLevel >= theLevel) {
            return theFunc.bind(logger);
        }
        return function() {};
    }
    return {
        error: _filterFunc('error', __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].ERROR),
        warn: _filterFunc('warn', __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].WARN),
        info: _filterFunc('info', __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].INFO),
        debug: _filterFunc('debug', __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].DEBUG),
        verbose: _filterFunc('verbose', __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].VERBOSE)
    };
} //# sourceMappingURL=logLevelLogger.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/diag.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagAPI",
    ()=>DiagAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$ComponentLogger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$internal$2f$logLevelLogger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag/types.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js [instrumentation-edge] (ecmascript)");
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __read = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spreadArray = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
;
;
;
var API_NAME = 'diag';
/**
 * Singleton object which represents the entry point to the OpenTelemetry internal
 * diagnostic API
 */ var DiagAPI = function() {
    /**
     * Private internal constructor
     * @private
     */ function DiagAPI() {
        function _logProxy(funcName) {
            return function() {
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++){
                    args[_i] = arguments[_i];
                }
                var logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getGlobal"])('diag');
                // shortcut if logger not set
                if (!logger) return;
                return logger[funcName].apply(logger, __spreadArray([], __read(args), false));
            };
        }
        // Using self local variable for minification purposes as 'this' cannot be minified
        var self = this;
        // DiagAPI specific functions
        var setLogger = function(logger, optionsOrLogLevel) {
            var _a, _b, _c;
            if (optionsOrLogLevel === void 0) {
                optionsOrLogLevel = {
                    logLevel: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].INFO
                };
            }
            if (logger === self) {
                // There isn't much we can do here.
                // Logging to the console might break the user application.
                // Try to log to self. If a logger was previously registered it will receive the log.
                var err = new Error('Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation');
                self.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
                return false;
            }
            if (typeof optionsOrLogLevel === 'number') {
                optionsOrLogLevel = {
                    logLevel: optionsOrLogLevel
                };
            }
            var oldLogger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getGlobal"])('diag');
            var newLogger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$internal$2f$logLevelLogger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createLogLevelDiagLogger"])((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagLogLevel"].INFO, logger);
            // There already is an logger registered. We'll let it know before overwriting it.
            if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
                var stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : '<failed to generate stacktrace>';
                oldLogger.warn("Current logger will be overwritten from " + stack);
                newLogger.warn("Current logger will overwrite one already registered from " + stack);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["registerGlobal"])('diag', newLogger, self, true);
        };
        self.setLogger = setLogger;
        self.disable = function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["unregisterGlobal"])(API_NAME, self);
        };
        self.createComponentLogger = function(options) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$ComponentLogger$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagComponentLogger"](options);
        };
        self.verbose = _logProxy('verbose');
        self.debug = _logProxy('debug');
        self.info = _logProxy('info');
        self.warn = _logProxy('warn');
        self.error = _logProxy('error');
    }
    /** Get the singleton instance of the DiagAPI API */ DiagAPI.instance = function() {
        if (!this._instance) {
            this._instance = new DiagAPI();
        }
        return this._instance;
    };
    return DiagAPI;
}();
;
 //# sourceMappingURL=diag.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/context.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContextAPI",
    ()=>ContextAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$NoopContextManager$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/diag.js [instrumentation-edge] (ecmascript)");
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __read = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spreadArray = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
;
;
var API_NAME = 'context';
var NOOP_CONTEXT_MANAGER = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$NoopContextManager$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NoopContextManager"]();
/**
 * Singleton object which represents the entry point to the OpenTelemetry Context API
 */ var ContextAPI = function() {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ function ContextAPI() {}
    /** Get the singleton instance of the Context API */ ContextAPI.getInstance = function() {
        if (!this._instance) {
            this._instance = new ContextAPI();
        }
        return this._instance;
    };
    /**
     * Set the current context manager.
     *
     * @returns true if the context manager was successfully registered, else false
     */ ContextAPI.prototype.setGlobalContextManager = function(contextManager) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["registerGlobal"])(API_NAME, contextManager, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagAPI"].instance());
    };
    /**
     * Get the currently active context
     */ ContextAPI.prototype.active = function() {
        return this._getContextManager().active();
    };
    /**
     * Execute a function with an active context
     *
     * @param context context to be active during function execution
     * @param fn function to execute in a context
     * @param thisArg optional receiver to be used for calling fn
     * @param args optional arguments forwarded to fn
     */ ContextAPI.prototype.with = function(context, fn, thisArg) {
        var _a;
        var args = [];
        for(var _i = 3; _i < arguments.length; _i++){
            args[_i - 3] = arguments[_i];
        }
        return (_a = this._getContextManager()).with.apply(_a, __spreadArray([
            context,
            fn,
            thisArg
        ], __read(args), false));
    };
    /**
     * Bind a context to a target function or event emitter
     *
     * @param context context to bind to the event emitter or function. Defaults to the currently active context
     * @param target function or event emitter to bind
     */ ContextAPI.prototype.bind = function(context, target) {
        return this._getContextManager().bind(context, target);
    };
    ContextAPI.prototype._getContextManager = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getGlobal"])(API_NAME) || NOOP_CONTEXT_MANAGER;
    };
    /** Disable and remove the global context manager */ ContextAPI.prototype.disable = function() {
        this._getContextManager().disable();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["unregisterGlobal"])(API_NAME, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagAPI"].instance());
    };
    return ContextAPI;
}();
;
 //# sourceMappingURL=context.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/context-api.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "context",
    ()=>context
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/context.js [instrumentation-edge] (ecmascript)");
;
var context = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ContextAPI"].getInstance(); //# sourceMappingURL=context-api.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "TraceFlags",
    ()=>TraceFlags
]);
var TraceFlags;
(function(TraceFlags) {
    /** Represents no flag set. */ TraceFlags[TraceFlags["NONE"] = 0] = "NONE";
    /** Bit to represent whether trace is sampled in trace flags. */ TraceFlags[TraceFlags["SAMPLED"] = 1] = "SAMPLED";
})(TraceFlags || (TraceFlags = {})); //# sourceMappingURL=trace_flags.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INVALID_SPANID",
    ()=>INVALID_SPANID,
    "INVALID_SPAN_CONTEXT",
    ()=>INVALID_SPAN_CONTEXT,
    "INVALID_TRACEID",
    ()=>INVALID_TRACEID
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$trace_flags$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js [instrumentation-edge] (ecmascript)");
;
var INVALID_SPANID = '0000000000000000';
var INVALID_TRACEID = '00000000000000000000000000000000';
var INVALID_SPAN_CONTEXT = {
    traceId: INVALID_TRACEID,
    spanId: INVALID_SPANID,
    traceFlags: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$trace_flags$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["TraceFlags"].NONE
}; //# sourceMappingURL=invalid-span-constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NonRecordingSpan",
    ()=>NonRecordingSpan
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$invalid$2d$span$2d$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js [instrumentation-edge] (ecmascript)");
;
/**
 * The NonRecordingSpan is the default {@link Span} that is used when no Span
 * implementation is available. All operations are no-op including context
 * propagation.
 */ var NonRecordingSpan = function() {
    function NonRecordingSpan(_spanContext) {
        if (_spanContext === void 0) {
            _spanContext = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$invalid$2d$span$2d$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["INVALID_SPAN_CONTEXT"];
        }
        this._spanContext = _spanContext;
    }
    // Returns a SpanContext.
    NonRecordingSpan.prototype.spanContext = function() {
        return this._spanContext;
    };
    // By default does nothing
    NonRecordingSpan.prototype.setAttribute = function(_key, _value) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.setAttributes = function(_attributes) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.addEvent = function(_name, _attributes) {
        return this;
    };
    NonRecordingSpan.prototype.addLink = function(_link) {
        return this;
    };
    NonRecordingSpan.prototype.addLinks = function(_links) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.setStatus = function(_status) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.updateName = function(_name) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.end = function(_endTime) {};
    // isRecording always returns false for NonRecordingSpan.
    NonRecordingSpan.prototype.isRecording = function() {
        return false;
    };
    // By default does nothing
    NonRecordingSpan.prototype.recordException = function(_exception, _time) {};
    return NonRecordingSpan;
}();
;
 //# sourceMappingURL=NonRecordingSpan.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/context-utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteSpan",
    ()=>deleteSpan,
    "getActiveSpan",
    ()=>getActiveSpan,
    "getSpan",
    ()=>getSpan,
    "getSpanContext",
    ()=>getSpanContext,
    "setSpan",
    ()=>setSpan,
    "setSpanContext",
    ()=>setSpanContext
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/context/context.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/context.js [instrumentation-edge] (ecmascript)");
;
;
;
/**
 * span key
 */ var SPAN_KEY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createContextKey"])('OpenTelemetry Context Key SPAN');
function getSpan(context) {
    return context.getValue(SPAN_KEY) || undefined;
}
function getActiveSpan() {
    return getSpan(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ContextAPI"].getInstance().active());
}
function setSpan(context, span) {
    return context.setValue(SPAN_KEY, span);
}
function deleteSpan(context) {
    return context.deleteValue(SPAN_KEY);
}
function setSpanContext(context, spanContext) {
    return setSpan(context, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NonRecordingSpan"](spanContext));
}
function getSpanContext(context) {
    var _a;
    return (_a = getSpan(context)) === null || _a === void 0 ? void 0 : _a.spanContext();
} //# sourceMappingURL=context-utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSpanContextValid",
    ()=>isSpanContextValid,
    "isValidSpanId",
    ()=>isValidSpanId,
    "isValidTraceId",
    ()=>isValidTraceId,
    "wrapSpanContext",
    ()=>wrapSpanContext
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$invalid$2d$span$2d$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js [instrumentation-edge] (ecmascript)");
;
;
var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
function isValidTraceId(traceId) {
    return VALID_TRACEID_REGEX.test(traceId) && traceId !== __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$invalid$2d$span$2d$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["INVALID_TRACEID"];
}
function isValidSpanId(spanId) {
    return VALID_SPANID_REGEX.test(spanId) && spanId !== __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$invalid$2d$span$2d$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["INVALID_SPANID"];
}
function isSpanContextValid(spanContext) {
    return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NonRecordingSpan"](spanContext);
} //# sourceMappingURL=spancontext-utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoopTracer",
    ()=>NoopTracer
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/context.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/context-utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$spancontext$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js [instrumentation-edge] (ecmascript)");
;
;
;
;
var contextApi = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ContextAPI"].getInstance();
/**
 * No-op implementations of {@link Tracer}.
 */ var NoopTracer = function() {
    function NoopTracer() {}
    // startSpan starts a noop span.
    NoopTracer.prototype.startSpan = function(name, options, context) {
        if (context === void 0) {
            context = contextApi.active();
        }
        var root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NonRecordingSpan"]();
        }
        var parentFromContext = context && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanContext"])(context);
        if (isSpanContext(parentFromContext) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$spancontext$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isSpanContextValid"])(parentFromContext)) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NonRecordingSpan"](parentFromContext);
        } else {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NonRecordingSpan$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NonRecordingSpan"]();
        }
    };
    NoopTracer.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
        var opts;
        var ctx;
        var fn;
        if (arguments.length < 2) {
            return;
        } else if (arguments.length === 2) {
            fn = arg2;
        } else if (arguments.length === 3) {
            opts = arg2;
            fn = arg3;
        } else {
            opts = arg2;
            ctx = arg3;
            fn = arg4;
        }
        var parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        var span = this.startSpan(name, opts, parentContext);
        var contextWithSpanSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setSpan"])(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, undefined, span);
    };
    return NoopTracer;
}();
;
function isSpanContext(spanContext) {
    return typeof spanContext === 'object' && typeof spanContext['spanId'] === 'string' && typeof spanContext['traceId'] === 'string' && typeof spanContext['traceFlags'] === 'number';
} //# sourceMappingURL=NoopTracer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProxyTracer",
    ()=>ProxyTracer
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NoopTracer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js [instrumentation-edge] (ecmascript)");
;
var NOOP_TRACER = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NoopTracer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NoopTracer"]();
/**
 * Proxy tracer provided by the proxy tracer provider
 */ var ProxyTracer = function() {
    function ProxyTracer(_provider, name, version, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version;
        this.options = options;
    }
    ProxyTracer.prototype.startSpan = function(name, options, context) {
        return this._getTracer().startSpan(name, options, context);
    };
    ProxyTracer.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
        var tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
    };
    /**
     * Try to get a tracer from the proxy tracer provider.
     * If the proxy tracer provider has no delegate, return a noop tracer.
     */ ProxyTracer.prototype._getTracer = function() {
        if (this._delegate) {
            return this._delegate;
        }
        var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
            return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
    };
    return ProxyTracer;
}();
;
 //# sourceMappingURL=ProxyTracer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoopTracerProvider",
    ()=>NoopTracerProvider
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NoopTracer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js [instrumentation-edge] (ecmascript)");
;
/**
 * An implementation of the {@link TracerProvider} which returns an impotent
 * Tracer for all calls to `getTracer`.
 *
 * All operations are no-op.
 */ var NoopTracerProvider = function() {
    function NoopTracerProvider() {}
    NoopTracerProvider.prototype.getTracer = function(_name, _version, _options) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NoopTracer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NoopTracer"]();
    };
    return NoopTracerProvider;
}();
;
 //# sourceMappingURL=NoopTracerProvider.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProxyTracerProvider",
    ()=>ProxyTracerProvider
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$ProxyTracer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NoopTracerProvider$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js [instrumentation-edge] (ecmascript)");
;
;
var NOOP_TRACER_PROVIDER = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$NoopTracerProvider$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NoopTracerProvider"]();
/**
 * Tracer provider which provides {@link ProxyTracer}s.
 *
 * Before a delegate is set, tracers provided are NoOp.
 *   When a delegate is set, traces are provided from the delegate.
 *   When a delegate is set after tracers have already been provided,
 *   all tracers already provided will use the provided delegate implementation.
 */ var ProxyTracerProvider = function() {
    function ProxyTracerProvider() {}
    /**
     * Get a {@link ProxyTracer}
     */ ProxyTracerProvider.prototype.getTracer = function(name, version, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$ProxyTracer$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ProxyTracer"](this, name, version, options);
    };
    ProxyTracerProvider.prototype.getDelegate = function() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
    };
    /**
     * Set the delegate tracer provider
     */ ProxyTracerProvider.prototype.setDelegate = function(delegate) {
        this._delegate = delegate;
    };
    ProxyTracerProvider.prototype.getDelegateTracer = function(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
    };
    return ProxyTracerProvider;
}();
;
 //# sourceMappingURL=ProxyTracerProvider.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/trace.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TraceAPI",
    ()=>TraceAPI
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$ProxyTracerProvider$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$spancontext$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/context-utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/diag.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
var API_NAME = 'trace';
/**
 * Singleton object which represents the entry point to the OpenTelemetry Tracing API
 */ var TraceAPI = function() {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ function TraceAPI() {
        this._proxyTracerProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$ProxyTracerProvider$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ProxyTracerProvider"]();
        this.wrapSpanContext = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$spancontext$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["wrapSpanContext"];
        this.isSpanContextValid = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$spancontext$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isSpanContextValid"];
        this.deleteSpan = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["deleteSpan"];
        this.getSpan = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpan"];
        this.getActiveSpan = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getActiveSpan"];
        this.getSpanContext = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getSpanContext"];
        this.setSpan = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setSpan"];
        this.setSpanContext = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$context$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setSpanContext"];
    }
    /** Get the singleton instance of the Trace API */ TraceAPI.getInstance = function() {
        if (!this._instance) {
            this._instance = new TraceAPI();
        }
        return this._instance;
    };
    /**
     * Set the current global tracer.
     *
     * @returns true if the tracer provider was successfully registered, else false
     */ TraceAPI.prototype.setGlobalTracerProvider = function(provider) {
        var success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["registerGlobal"])(API_NAME, this._proxyTracerProvider, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagAPI"].instance());
        if (success) {
            this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
    };
    /**
     * Returns the global tracer provider.
     */ TraceAPI.prototype.getTracerProvider = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getGlobal"])(API_NAME) || this._proxyTracerProvider;
    };
    /**
     * Returns a tracer from the global tracer provider.
     */ TraceAPI.prototype.getTracer = function(name, version) {
        return this.getTracerProvider().getTracer(name, version);
    };
    /** Remove the global tracer provider */ TraceAPI.prototype.disable = function() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["unregisterGlobal"])(API_NAME, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagAPI"].instance());
        this._proxyTracerProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$ProxyTracerProvider$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ProxyTracerProvider"]();
    };
    return TraceAPI;
}();
;
 //# sourceMappingURL=trace.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace-api.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trace",
    ()=>trace
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/trace.js [instrumentation-edge] (ecmascript)");
;
var trace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$trace$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["TraceAPI"].getInstance(); //# sourceMappingURL=trace-api.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/span_kind.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "SpanKind",
    ()=>SpanKind
]);
var SpanKind;
(function(SpanKind) {
    /** Default value. Indicates that the span is used internally. */ SpanKind[SpanKind["INTERNAL"] = 0] = "INTERNAL";
    /**
     * Indicates that the span covers server-side handling of an RPC or other
     * remote request.
     */ SpanKind[SpanKind["SERVER"] = 1] = "SERVER";
    /**
     * Indicates that the span covers the client-side wrapper around an RPC or
     * other remote request.
     */ SpanKind[SpanKind["CLIENT"] = 2] = "CLIENT";
    /**
     * Indicates that the span describes producer sending a message to a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */ SpanKind[SpanKind["PRODUCER"] = 3] = "PRODUCER";
    /**
     * Indicates that the span describes consumer receiving a message from a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */ SpanKind[SpanKind["CONSUMER"] = 4] = "CONSUMER";
})(SpanKind || (SpanKind = {})); //# sourceMappingURL=span_kind.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoopTextMapPropagator",
    ()=>NoopTextMapPropagator
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * No-op implementations of {@link TextMapPropagator}.
 */ var NoopTextMapPropagator = function() {
    function NoopTextMapPropagator() {}
    /** Noop inject function does nothing */ NoopTextMapPropagator.prototype.inject = function(_context, _carrier) {};
    /** Noop extract function does nothing and returns the input context */ NoopTextMapPropagator.prototype.extract = function(context, _carrier) {
        return context;
    };
    NoopTextMapPropagator.prototype.fields = function() {
        return [];
    };
    return NoopTextMapPropagator;
}();
;
 //# sourceMappingURL=NoopTextMapPropagator.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "defaultTextMapGetter",
    ()=>defaultTextMapGetter,
    "defaultTextMapSetter",
    ()=>defaultTextMapSetter
]);
var defaultTextMapGetter = {
    get: function(carrier, key) {
        if (carrier == null) {
            return undefined;
        }
        return carrier[key];
    },
    keys: function(carrier) {
        if (carrier == null) {
            return [];
        }
        return Object.keys(carrier);
    }
};
var defaultTextMapSetter = {
    set: function(carrier, key, value) {
        if (carrier == null) {
            return;
        }
        carrier[key] = value;
    }
}; //# sourceMappingURL=TextMapPropagator.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteBaggage",
    ()=>deleteBaggage,
    "getActiveBaggage",
    ()=>getActiveBaggage,
    "getBaggage",
    ()=>getBaggage,
    "setBaggage",
    ()=>setBaggage
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/context.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/context/context.js [instrumentation-edge] (ecmascript)");
;
;
/**
 * Baggage key
 */ var BAGGAGE_KEY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createContextKey"])('OpenTelemetry Baggage Key');
function getBaggage(context) {
    return context.getValue(BAGGAGE_KEY) || undefined;
}
function getActiveBaggage() {
    return getBaggage(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ContextAPI"].getInstance().active());
}
function setBaggage(context, baggage) {
    return context.setValue(BAGGAGE_KEY, baggage);
}
function deleteBaggage(context) {
    return context.deleteValue(BAGGAGE_KEY);
} //# sourceMappingURL=context-helpers.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaggageImpl",
    ()=>BaggageImpl
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __read = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var __values = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var BaggageImpl = function() {
    function BaggageImpl(entries) {
        this._entries = entries ? new Map(entries) : new Map();
    }
    BaggageImpl.prototype.getEntry = function(key) {
        var entry = this._entries.get(key);
        if (!entry) {
            return undefined;
        }
        return Object.assign({}, entry);
    };
    BaggageImpl.prototype.getAllEntries = function() {
        return Array.from(this._entries.entries()).map(function(_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            return [
                k,
                v
            ];
        });
    };
    BaggageImpl.prototype.setEntry = function(key, entry) {
        var newBaggage = new BaggageImpl(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
    };
    BaggageImpl.prototype.removeEntry = function(key) {
        var newBaggage = new BaggageImpl(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
    };
    BaggageImpl.prototype.removeEntries = function() {
        var e_1, _a;
        var keys = [];
        for(var _i = 0; _i < arguments.length; _i++){
            keys[_i] = arguments[_i];
        }
        var newBaggage = new BaggageImpl(this._entries);
        try {
            for(var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()){
                var key = keys_1_1.value;
                newBaggage._entries.delete(key);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        return newBaggage;
    };
    BaggageImpl.prototype.clear = function() {
        return new BaggageImpl();
    };
    return BaggageImpl;
}();
;
 //# sourceMappingURL=baggage-impl.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Symbol used to make BaggageEntryMetadata an opaque type
 */ __turbopack_context__.s([
    "baggageEntryMetadataSymbol",
    ()=>baggageEntryMetadataSymbol
]);
var baggageEntryMetadataSymbol = Symbol('BaggageEntryMetadata'); //# sourceMappingURL=symbol.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baggageEntryMetadataFromString",
    ()=>baggageEntryMetadataFromString,
    "createBaggage",
    ()=>createBaggage
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/diag.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$internal$2f$baggage$2d$impl$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$internal$2f$symbol$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js [instrumentation-edge] (ecmascript)");
;
;
;
var diag = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagAPI"].instance();
function createBaggage(entries) {
    if (entries === void 0) {
        entries = {};
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$internal$2f$baggage$2d$impl$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BaggageImpl"](new Map(Object.entries(entries)));
}
function baggageEntryMetadataFromString(str) {
    if (typeof str !== 'string') {
        diag.error("Cannot create baggage metadata from unknown type: " + typeof str);
        str = '';
    }
    return {
        __TYPE__: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$internal$2f$symbol$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["baggageEntryMetadataSymbol"],
        toString: function() {
            return str;
        }
    };
} //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/propagation.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropagationAPI",
    ()=>PropagationAPI
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2f$NoopTextMapPropagator$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2f$TextMapPropagator$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$context$2d$helpers$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/diag.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
;
var API_NAME = 'propagation';
var NOOP_TEXT_MAP_PROPAGATOR = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2f$NoopTextMapPropagator$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["NoopTextMapPropagator"]();
/**
 * Singleton object which represents the entry point to the OpenTelemetry Propagation API
 */ var PropagationAPI = function() {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ function PropagationAPI() {
        this.createBaggage = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createBaggage"];
        this.getBaggage = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$context$2d$helpers$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getBaggage"];
        this.getActiveBaggage = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$context$2d$helpers$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getActiveBaggage"];
        this.setBaggage = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$context$2d$helpers$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setBaggage"];
        this.deleteBaggage = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$context$2d$helpers$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["deleteBaggage"];
    }
    /** Get the singleton instance of the Propagator API */ PropagationAPI.getInstance = function() {
        if (!this._instance) {
            this._instance = new PropagationAPI();
        }
        return this._instance;
    };
    /**
     * Set the current propagator.
     *
     * @returns true if the propagator was successfully registered, else false
     */ PropagationAPI.prototype.setGlobalPropagator = function(propagator) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["registerGlobal"])(API_NAME, propagator, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagAPI"].instance());
    };
    /**
     * Inject context into a carrier to be propagated inter-process
     *
     * @param context Context carrying tracing data to inject
     * @param carrier carrier to inject context into
     * @param setter Function used to set values on the carrier
     */ PropagationAPI.prototype.inject = function(context, carrier, setter) {
        if (setter === void 0) {
            setter = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2f$TextMapPropagator$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defaultTextMapSetter"];
        }
        return this._getGlobalPropagator().inject(context, carrier, setter);
    };
    /**
     * Extract context from a carrier
     *
     * @param context Context which the newly created context will inherit from
     * @param carrier Carrier to extract context from
     * @param getter Function used to extract keys from a carrier
     */ PropagationAPI.prototype.extract = function(context, carrier, getter) {
        if (getter === void 0) {
            getter = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2f$TextMapPropagator$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defaultTextMapGetter"];
        }
        return this._getGlobalPropagator().extract(context, carrier, getter);
    };
    /**
     * Return a list of all fields which may be used by the propagator.
     */ PropagationAPI.prototype.fields = function() {
        return this._getGlobalPropagator().fields();
    };
    /** Remove the global propagator */ PropagationAPI.prototype.disable = function() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["unregisterGlobal"])(API_NAME, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagAPI"].instance());
    };
    PropagationAPI.prototype._getGlobalPropagator = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getGlobal"])(API_NAME) || NOOP_TEXT_MAP_PROPAGATOR;
    };
    return PropagationAPI;
}();
;
 //# sourceMappingURL=propagation.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/propagation-api.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "propagation",
    ()=>propagation
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$propagation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/propagation.js [instrumentation-edge] (ecmascript)");
;
var propagation = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$propagation$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["PropagationAPI"].getInstance(); //# sourceMappingURL=propagation-api.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/status.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * An enumeration of status codes.
 */ __turbopack_context__.s([
    "SpanStatusCode",
    ()=>SpanStatusCode
]);
var SpanStatusCode;
(function(SpanStatusCode) {
    /**
     * The default status.
     */ SpanStatusCode[SpanStatusCode["UNSET"] = 0] = "UNSET";
    /**
     * The operation has been validated by an Application developer or
     * Operator to have completed successfully.
     */ SpanStatusCode[SpanStatusCode["OK"] = 1] = "OK";
    /**
     * The operation contains an error.
     */ SpanStatusCode[SpanStatusCode["ERROR"] = 2] = "ERROR";
})(SpanStatusCode || (SpanStatusCode = {})); //# sourceMappingURL=status.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @deprecated use the one declared in @opentelemetry/sdk-trace-base instead.
 * A sampling decision that determines how a {@link Span} will be recorded
 * and collected.
 */ __turbopack_context__.s([
    "SamplingDecision",
    ()=>SamplingDecision
]);
var SamplingDecision;
(function(SamplingDecision) {
    /**
     * `Span.isRecording() === false`, span will not be recorded and all events
     * and attributes will be dropped.
     */ SamplingDecision[SamplingDecision["NOT_RECORD"] = 0] = "NOT_RECORD";
    /**
     * `Span.isRecording() === true`, but `Sampled` flag in {@link TraceFlags}
     * MUST NOT be set.
     */ SamplingDecision[SamplingDecision["RECORD"] = 1] = "RECORD";
    /**
     * `Span.isRecording() === true` AND `Sampled` flag in {@link TraceFlags}
     * MUST be set.
     */ SamplingDecision[SamplingDecision["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})(SamplingDecision || (SamplingDecision = {})); //# sourceMappingURL=SamplingResult.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag-api.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "diag",
    ()=>diag
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/api/diag.js [instrumentation-edge] (ecmascript)");
;
var diag = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$api$2f$diag$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["DiagAPI"].instance(); //# sourceMappingURL=diag-api.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ //----------------------------------------------------------------------------------------------------------
// DO NOT EDIT, this is an Auto-generated file from scripts/semconv/templates/registry/stable/attributes.ts.j2
//----------------------------------------------------------------------------------------------------------
/**
 * ASP.NET Core exception middleware handling result.
 *
 * @example handled
 * @example unhandled
 */ __turbopack_context__.s([
    "ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED",
    ()=>ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED,
    "ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED",
    ()=>ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED,
    "ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED",
    ()=>ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED,
    "ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED",
    ()=>ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED,
    "ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED",
    ()=>ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED,
    "ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER",
    ()=>ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER,
    "ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER",
    ()=>ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER,
    "ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED",
    ()=>ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED,
    "ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE",
    ()=>ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE,
    "ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS",
    ()=>ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS,
    "ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT",
    ()=>ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT,
    "ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE",
    ()=>ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE,
    "ATTR_ASPNETCORE_RATE_LIMITING_POLICY",
    ()=>ATTR_ASPNETCORE_RATE_LIMITING_POLICY,
    "ATTR_ASPNETCORE_RATE_LIMITING_RESULT",
    ()=>ATTR_ASPNETCORE_RATE_LIMITING_RESULT,
    "ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED",
    ()=>ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED,
    "ATTR_ASPNETCORE_ROUTING_IS_FALLBACK",
    ()=>ATTR_ASPNETCORE_ROUTING_IS_FALLBACK,
    "ATTR_ASPNETCORE_ROUTING_MATCH_STATUS",
    ()=>ATTR_ASPNETCORE_ROUTING_MATCH_STATUS,
    "ATTR_ASPNETCORE_USER_IS_AUTHENTICATED",
    ()=>ATTR_ASPNETCORE_USER_IS_AUTHENTICATED,
    "ATTR_CLIENT_ADDRESS",
    ()=>ATTR_CLIENT_ADDRESS,
    "ATTR_CLIENT_PORT",
    ()=>ATTR_CLIENT_PORT,
    "ATTR_CODE_COLUMN_NUMBER",
    ()=>ATTR_CODE_COLUMN_NUMBER,
    "ATTR_CODE_FILE_PATH",
    ()=>ATTR_CODE_FILE_PATH,
    "ATTR_CODE_FUNCTION_NAME",
    ()=>ATTR_CODE_FUNCTION_NAME,
    "ATTR_CODE_LINE_NUMBER",
    ()=>ATTR_CODE_LINE_NUMBER,
    "ATTR_CODE_STACKTRACE",
    ()=>ATTR_CODE_STACKTRACE,
    "ATTR_DB_COLLECTION_NAME",
    ()=>ATTR_DB_COLLECTION_NAME,
    "ATTR_DB_NAMESPACE",
    ()=>ATTR_DB_NAMESPACE,
    "ATTR_DB_OPERATION_BATCH_SIZE",
    ()=>ATTR_DB_OPERATION_BATCH_SIZE,
    "ATTR_DB_OPERATION_NAME",
    ()=>ATTR_DB_OPERATION_NAME,
    "ATTR_DB_QUERY_SUMMARY",
    ()=>ATTR_DB_QUERY_SUMMARY,
    "ATTR_DB_QUERY_TEXT",
    ()=>ATTR_DB_QUERY_TEXT,
    "ATTR_DB_RESPONSE_STATUS_CODE",
    ()=>ATTR_DB_RESPONSE_STATUS_CODE,
    "ATTR_DB_STORED_PROCEDURE_NAME",
    ()=>ATTR_DB_STORED_PROCEDURE_NAME,
    "ATTR_DB_SYSTEM_NAME",
    ()=>ATTR_DB_SYSTEM_NAME,
    "ATTR_DOTNET_GC_HEAP_GENERATION",
    ()=>ATTR_DOTNET_GC_HEAP_GENERATION,
    "ATTR_ERROR_TYPE",
    ()=>ATTR_ERROR_TYPE,
    "ATTR_EXCEPTION_ESCAPED",
    ()=>ATTR_EXCEPTION_ESCAPED,
    "ATTR_EXCEPTION_MESSAGE",
    ()=>ATTR_EXCEPTION_MESSAGE,
    "ATTR_EXCEPTION_STACKTRACE",
    ()=>ATTR_EXCEPTION_STACKTRACE,
    "ATTR_EXCEPTION_TYPE",
    ()=>ATTR_EXCEPTION_TYPE,
    "ATTR_HTTP_REQUEST_HEADER",
    ()=>ATTR_HTTP_REQUEST_HEADER,
    "ATTR_HTTP_REQUEST_METHOD",
    ()=>ATTR_HTTP_REQUEST_METHOD,
    "ATTR_HTTP_REQUEST_METHOD_ORIGINAL",
    ()=>ATTR_HTTP_REQUEST_METHOD_ORIGINAL,
    "ATTR_HTTP_REQUEST_RESEND_COUNT",
    ()=>ATTR_HTTP_REQUEST_RESEND_COUNT,
    "ATTR_HTTP_RESPONSE_HEADER",
    ()=>ATTR_HTTP_RESPONSE_HEADER,
    "ATTR_HTTP_RESPONSE_STATUS_CODE",
    ()=>ATTR_HTTP_RESPONSE_STATUS_CODE,
    "ATTR_HTTP_ROUTE",
    ()=>ATTR_HTTP_ROUTE,
    "ATTR_JVM_GC_ACTION",
    ()=>ATTR_JVM_GC_ACTION,
    "ATTR_JVM_GC_NAME",
    ()=>ATTR_JVM_GC_NAME,
    "ATTR_JVM_MEMORY_POOL_NAME",
    ()=>ATTR_JVM_MEMORY_POOL_NAME,
    "ATTR_JVM_MEMORY_TYPE",
    ()=>ATTR_JVM_MEMORY_TYPE,
    "ATTR_JVM_THREAD_DAEMON",
    ()=>ATTR_JVM_THREAD_DAEMON,
    "ATTR_JVM_THREAD_STATE",
    ()=>ATTR_JVM_THREAD_STATE,
    "ATTR_NETWORK_LOCAL_ADDRESS",
    ()=>ATTR_NETWORK_LOCAL_ADDRESS,
    "ATTR_NETWORK_LOCAL_PORT",
    ()=>ATTR_NETWORK_LOCAL_PORT,
    "ATTR_NETWORK_PEER_ADDRESS",
    ()=>ATTR_NETWORK_PEER_ADDRESS,
    "ATTR_NETWORK_PEER_PORT",
    ()=>ATTR_NETWORK_PEER_PORT,
    "ATTR_NETWORK_PROTOCOL_NAME",
    ()=>ATTR_NETWORK_PROTOCOL_NAME,
    "ATTR_NETWORK_PROTOCOL_VERSION",
    ()=>ATTR_NETWORK_PROTOCOL_VERSION,
    "ATTR_NETWORK_TRANSPORT",
    ()=>ATTR_NETWORK_TRANSPORT,
    "ATTR_NETWORK_TYPE",
    ()=>ATTR_NETWORK_TYPE,
    "ATTR_OTEL_SCOPE_NAME",
    ()=>ATTR_OTEL_SCOPE_NAME,
    "ATTR_OTEL_SCOPE_VERSION",
    ()=>ATTR_OTEL_SCOPE_VERSION,
    "ATTR_OTEL_STATUS_CODE",
    ()=>ATTR_OTEL_STATUS_CODE,
    "ATTR_OTEL_STATUS_DESCRIPTION",
    ()=>ATTR_OTEL_STATUS_DESCRIPTION,
    "ATTR_SERVER_ADDRESS",
    ()=>ATTR_SERVER_ADDRESS,
    "ATTR_SERVER_PORT",
    ()=>ATTR_SERVER_PORT,
    "ATTR_SERVICE_NAME",
    ()=>ATTR_SERVICE_NAME,
    "ATTR_SERVICE_VERSION",
    ()=>ATTR_SERVICE_VERSION,
    "ATTR_SIGNALR_CONNECTION_STATUS",
    ()=>ATTR_SIGNALR_CONNECTION_STATUS,
    "ATTR_SIGNALR_TRANSPORT",
    ()=>ATTR_SIGNALR_TRANSPORT,
    "ATTR_TELEMETRY_SDK_LANGUAGE",
    ()=>ATTR_TELEMETRY_SDK_LANGUAGE,
    "ATTR_TELEMETRY_SDK_NAME",
    ()=>ATTR_TELEMETRY_SDK_NAME,
    "ATTR_TELEMETRY_SDK_VERSION",
    ()=>ATTR_TELEMETRY_SDK_VERSION,
    "ATTR_URL_FRAGMENT",
    ()=>ATTR_URL_FRAGMENT,
    "ATTR_URL_FULL",
    ()=>ATTR_URL_FULL,
    "ATTR_URL_PATH",
    ()=>ATTR_URL_PATH,
    "ATTR_URL_QUERY",
    ()=>ATTR_URL_QUERY,
    "ATTR_URL_SCHEME",
    ()=>ATTR_URL_SCHEME,
    "ATTR_USER_AGENT_ORIGINAL",
    ()=>ATTR_USER_AGENT_ORIGINAL,
    "DB_SYSTEM_NAME_VALUE_MARIADB",
    ()=>DB_SYSTEM_NAME_VALUE_MARIADB,
    "DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER",
    ()=>DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER,
    "DB_SYSTEM_NAME_VALUE_MYSQL",
    ()=>DB_SYSTEM_NAME_VALUE_MYSQL,
    "DB_SYSTEM_NAME_VALUE_POSTGRESQL",
    ()=>DB_SYSTEM_NAME_VALUE_POSTGRESQL,
    "DOTNET_GC_HEAP_GENERATION_VALUE_GEN0",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_GEN0,
    "DOTNET_GC_HEAP_GENERATION_VALUE_GEN1",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_GEN1,
    "DOTNET_GC_HEAP_GENERATION_VALUE_GEN2",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_GEN2,
    "DOTNET_GC_HEAP_GENERATION_VALUE_LOH",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_LOH,
    "DOTNET_GC_HEAP_GENERATION_VALUE_POH",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_POH,
    "ERROR_TYPE_VALUE_OTHER",
    ()=>ERROR_TYPE_VALUE_OTHER,
    "HTTP_REQUEST_METHOD_VALUE_CONNECT",
    ()=>HTTP_REQUEST_METHOD_VALUE_CONNECT,
    "HTTP_REQUEST_METHOD_VALUE_DELETE",
    ()=>HTTP_REQUEST_METHOD_VALUE_DELETE,
    "HTTP_REQUEST_METHOD_VALUE_GET",
    ()=>HTTP_REQUEST_METHOD_VALUE_GET,
    "HTTP_REQUEST_METHOD_VALUE_HEAD",
    ()=>HTTP_REQUEST_METHOD_VALUE_HEAD,
    "HTTP_REQUEST_METHOD_VALUE_OPTIONS",
    ()=>HTTP_REQUEST_METHOD_VALUE_OPTIONS,
    "HTTP_REQUEST_METHOD_VALUE_OTHER",
    ()=>HTTP_REQUEST_METHOD_VALUE_OTHER,
    "HTTP_REQUEST_METHOD_VALUE_PATCH",
    ()=>HTTP_REQUEST_METHOD_VALUE_PATCH,
    "HTTP_REQUEST_METHOD_VALUE_POST",
    ()=>HTTP_REQUEST_METHOD_VALUE_POST,
    "HTTP_REQUEST_METHOD_VALUE_PUT",
    ()=>HTTP_REQUEST_METHOD_VALUE_PUT,
    "HTTP_REQUEST_METHOD_VALUE_TRACE",
    ()=>HTTP_REQUEST_METHOD_VALUE_TRACE,
    "JVM_MEMORY_TYPE_VALUE_HEAP",
    ()=>JVM_MEMORY_TYPE_VALUE_HEAP,
    "JVM_MEMORY_TYPE_VALUE_NON_HEAP",
    ()=>JVM_MEMORY_TYPE_VALUE_NON_HEAP,
    "JVM_THREAD_STATE_VALUE_BLOCKED",
    ()=>JVM_THREAD_STATE_VALUE_BLOCKED,
    "JVM_THREAD_STATE_VALUE_NEW",
    ()=>JVM_THREAD_STATE_VALUE_NEW,
    "JVM_THREAD_STATE_VALUE_RUNNABLE",
    ()=>JVM_THREAD_STATE_VALUE_RUNNABLE,
    "JVM_THREAD_STATE_VALUE_TERMINATED",
    ()=>JVM_THREAD_STATE_VALUE_TERMINATED,
    "JVM_THREAD_STATE_VALUE_TIMED_WAITING",
    ()=>JVM_THREAD_STATE_VALUE_TIMED_WAITING,
    "JVM_THREAD_STATE_VALUE_WAITING",
    ()=>JVM_THREAD_STATE_VALUE_WAITING,
    "NETWORK_TRANSPORT_VALUE_PIPE",
    ()=>NETWORK_TRANSPORT_VALUE_PIPE,
    "NETWORK_TRANSPORT_VALUE_QUIC",
    ()=>NETWORK_TRANSPORT_VALUE_QUIC,
    "NETWORK_TRANSPORT_VALUE_TCP",
    ()=>NETWORK_TRANSPORT_VALUE_TCP,
    "NETWORK_TRANSPORT_VALUE_UDP",
    ()=>NETWORK_TRANSPORT_VALUE_UDP,
    "NETWORK_TRANSPORT_VALUE_UNIX",
    ()=>NETWORK_TRANSPORT_VALUE_UNIX,
    "NETWORK_TYPE_VALUE_IPV4",
    ()=>NETWORK_TYPE_VALUE_IPV4,
    "NETWORK_TYPE_VALUE_IPV6",
    ()=>NETWORK_TYPE_VALUE_IPV6,
    "OTEL_STATUS_CODE_VALUE_ERROR",
    ()=>OTEL_STATUS_CODE_VALUE_ERROR,
    "OTEL_STATUS_CODE_VALUE_OK",
    ()=>OTEL_STATUS_CODE_VALUE_OK,
    "SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN",
    ()=>SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN,
    "SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE",
    ()=>SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE,
    "SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT",
    ()=>SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT,
    "SIGNALR_TRANSPORT_VALUE_LONG_POLLING",
    ()=>SIGNALR_TRANSPORT_VALUE_LONG_POLLING,
    "SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS",
    ()=>SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS,
    "SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS",
    ()=>SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS,
    "TELEMETRY_SDK_LANGUAGE_VALUE_CPP",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_CPP,
    "TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET,
    "TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG,
    "TELEMETRY_SDK_LANGUAGE_VALUE_GO",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_GO,
    "TELEMETRY_SDK_LANGUAGE_VALUE_JAVA",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_JAVA,
    "TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS,
    "TELEMETRY_SDK_LANGUAGE_VALUE_PHP",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_PHP,
    "TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON,
    "TELEMETRY_SDK_LANGUAGE_VALUE_RUBY",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_RUBY,
    "TELEMETRY_SDK_LANGUAGE_VALUE_RUST",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_RUST,
    "TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT,
    "TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS
]);
const ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT = 'aspnetcore.diagnostics.exception.result';
const ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED = "aborted";
const ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED = "handled";
const ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED = "skipped";
const ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED = "unhandled";
const ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE = 'aspnetcore.diagnostics.handler.type';
const ATTR_ASPNETCORE_RATE_LIMITING_POLICY = 'aspnetcore.rate_limiting.policy';
const ATTR_ASPNETCORE_RATE_LIMITING_RESULT = 'aspnetcore.rate_limiting.result';
const ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED = "acquired";
const ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER = "endpoint_limiter";
const ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER = "global_limiter";
const ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED = "request_canceled";
const ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED = 'aspnetcore.request.is_unhandled';
const ATTR_ASPNETCORE_ROUTING_IS_FALLBACK = 'aspnetcore.routing.is_fallback';
const ATTR_ASPNETCORE_ROUTING_MATCH_STATUS = 'aspnetcore.routing.match_status';
const ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE = "failure";
const ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS = "success";
const ATTR_ASPNETCORE_USER_IS_AUTHENTICATED = 'aspnetcore.user.is_authenticated';
const ATTR_CLIENT_ADDRESS = 'client.address';
const ATTR_CLIENT_PORT = 'client.port';
const ATTR_CODE_COLUMN_NUMBER = 'code.column.number';
const ATTR_CODE_FILE_PATH = 'code.file.path';
const ATTR_CODE_FUNCTION_NAME = 'code.function.name';
const ATTR_CODE_LINE_NUMBER = 'code.line.number';
const ATTR_CODE_STACKTRACE = 'code.stacktrace';
const ATTR_DB_COLLECTION_NAME = 'db.collection.name';
const ATTR_DB_NAMESPACE = 'db.namespace';
const ATTR_DB_OPERATION_BATCH_SIZE = 'db.operation.batch.size';
const ATTR_DB_OPERATION_NAME = 'db.operation.name';
const ATTR_DB_QUERY_SUMMARY = 'db.query.summary';
const ATTR_DB_QUERY_TEXT = 'db.query.text';
const ATTR_DB_RESPONSE_STATUS_CODE = 'db.response.status_code';
const ATTR_DB_STORED_PROCEDURE_NAME = 'db.stored_procedure.name';
const ATTR_DB_SYSTEM_NAME = 'db.system.name';
const DB_SYSTEM_NAME_VALUE_MARIADB = "mariadb";
const DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER = "microsoft.sql_server";
const DB_SYSTEM_NAME_VALUE_MYSQL = "mysql";
const DB_SYSTEM_NAME_VALUE_POSTGRESQL = "postgresql";
const ATTR_DOTNET_GC_HEAP_GENERATION = 'dotnet.gc.heap.generation';
const DOTNET_GC_HEAP_GENERATION_VALUE_GEN0 = "gen0";
const DOTNET_GC_HEAP_GENERATION_VALUE_GEN1 = "gen1";
const DOTNET_GC_HEAP_GENERATION_VALUE_GEN2 = "gen2";
const DOTNET_GC_HEAP_GENERATION_VALUE_LOH = "loh";
const DOTNET_GC_HEAP_GENERATION_VALUE_POH = "poh";
const ATTR_ERROR_TYPE = 'error.type';
const ERROR_TYPE_VALUE_OTHER = "_OTHER";
const ATTR_EXCEPTION_ESCAPED = 'exception.escaped';
const ATTR_EXCEPTION_MESSAGE = 'exception.message';
const ATTR_EXCEPTION_STACKTRACE = 'exception.stacktrace';
const ATTR_EXCEPTION_TYPE = 'exception.type';
const ATTR_HTTP_REQUEST_HEADER = (key)=>`http.request.header.${key}`;
const ATTR_HTTP_REQUEST_METHOD = 'http.request.method';
const HTTP_REQUEST_METHOD_VALUE_OTHER = "_OTHER";
const HTTP_REQUEST_METHOD_VALUE_CONNECT = "CONNECT";
const HTTP_REQUEST_METHOD_VALUE_DELETE = "DELETE";
const HTTP_REQUEST_METHOD_VALUE_GET = "GET";
const HTTP_REQUEST_METHOD_VALUE_HEAD = "HEAD";
const HTTP_REQUEST_METHOD_VALUE_OPTIONS = "OPTIONS";
const HTTP_REQUEST_METHOD_VALUE_PATCH = "PATCH";
const HTTP_REQUEST_METHOD_VALUE_POST = "POST";
const HTTP_REQUEST_METHOD_VALUE_PUT = "PUT";
const HTTP_REQUEST_METHOD_VALUE_TRACE = "TRACE";
const ATTR_HTTP_REQUEST_METHOD_ORIGINAL = 'http.request.method_original';
const ATTR_HTTP_REQUEST_RESEND_COUNT = 'http.request.resend_count';
const ATTR_HTTP_RESPONSE_HEADER = (key)=>`http.response.header.${key}`;
const ATTR_HTTP_RESPONSE_STATUS_CODE = 'http.response.status_code';
const ATTR_HTTP_ROUTE = 'http.route';
const ATTR_JVM_GC_ACTION = 'jvm.gc.action';
const ATTR_JVM_GC_NAME = 'jvm.gc.name';
const ATTR_JVM_MEMORY_POOL_NAME = 'jvm.memory.pool.name';
const ATTR_JVM_MEMORY_TYPE = 'jvm.memory.type';
const JVM_MEMORY_TYPE_VALUE_HEAP = "heap";
const JVM_MEMORY_TYPE_VALUE_NON_HEAP = "non_heap";
const ATTR_JVM_THREAD_DAEMON = 'jvm.thread.daemon';
const ATTR_JVM_THREAD_STATE = 'jvm.thread.state';
const JVM_THREAD_STATE_VALUE_BLOCKED = "blocked";
const JVM_THREAD_STATE_VALUE_NEW = "new";
const JVM_THREAD_STATE_VALUE_RUNNABLE = "runnable";
const JVM_THREAD_STATE_VALUE_TERMINATED = "terminated";
const JVM_THREAD_STATE_VALUE_TIMED_WAITING = "timed_waiting";
const JVM_THREAD_STATE_VALUE_WAITING = "waiting";
const ATTR_NETWORK_LOCAL_ADDRESS = 'network.local.address';
const ATTR_NETWORK_LOCAL_PORT = 'network.local.port';
const ATTR_NETWORK_PEER_ADDRESS = 'network.peer.address';
const ATTR_NETWORK_PEER_PORT = 'network.peer.port';
const ATTR_NETWORK_PROTOCOL_NAME = 'network.protocol.name';
const ATTR_NETWORK_PROTOCOL_VERSION = 'network.protocol.version';
const ATTR_NETWORK_TRANSPORT = 'network.transport';
const NETWORK_TRANSPORT_VALUE_PIPE = "pipe";
const NETWORK_TRANSPORT_VALUE_QUIC = "quic";
const NETWORK_TRANSPORT_VALUE_TCP = "tcp";
const NETWORK_TRANSPORT_VALUE_UDP = "udp";
const NETWORK_TRANSPORT_VALUE_UNIX = "unix";
const ATTR_NETWORK_TYPE = 'network.type';
const NETWORK_TYPE_VALUE_IPV4 = "ipv4";
const NETWORK_TYPE_VALUE_IPV6 = "ipv6";
const ATTR_OTEL_SCOPE_NAME = 'otel.scope.name';
const ATTR_OTEL_SCOPE_VERSION = 'otel.scope.version';
const ATTR_OTEL_STATUS_CODE = 'otel.status_code';
const OTEL_STATUS_CODE_VALUE_ERROR = "ERROR";
const OTEL_STATUS_CODE_VALUE_OK = "OK";
const ATTR_OTEL_STATUS_DESCRIPTION = 'otel.status_description';
const ATTR_SERVER_ADDRESS = 'server.address';
const ATTR_SERVER_PORT = 'server.port';
const ATTR_SERVICE_NAME = 'service.name';
const ATTR_SERVICE_VERSION = 'service.version';
const ATTR_SIGNALR_CONNECTION_STATUS = 'signalr.connection.status';
const SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN = "app_shutdown";
const SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE = "normal_closure";
const SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT = "timeout";
const ATTR_SIGNALR_TRANSPORT = 'signalr.transport';
const SIGNALR_TRANSPORT_VALUE_LONG_POLLING = "long_polling";
const SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS = "server_sent_events";
const SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS = "web_sockets";
const ATTR_TELEMETRY_SDK_LANGUAGE = 'telemetry.sdk.language';
const TELEMETRY_SDK_LANGUAGE_VALUE_CPP = "cpp";
const TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = "dotnet";
const TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = "erlang";
const TELEMETRY_SDK_LANGUAGE_VALUE_GO = "go";
const TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = "java";
const TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = "nodejs";
const TELEMETRY_SDK_LANGUAGE_VALUE_PHP = "php";
const TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = "python";
const TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = "ruby";
const TELEMETRY_SDK_LANGUAGE_VALUE_RUST = "rust";
const TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = "swift";
const TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = "webjs";
const ATTR_TELEMETRY_SDK_NAME = 'telemetry.sdk.name';
const ATTR_TELEMETRY_SDK_VERSION = 'telemetry.sdk.version';
const ATTR_URL_FRAGMENT = 'url.fragment';
const ATTR_URL_FULL = 'url.full';
const ATTR_URL_PATH = 'url.path';
const ATTR_URL_QUERY = 'url.query';
const ATTR_URL_SCHEME = 'url.scheme';
const ATTR_USER_AGENT_ORIGINAL = 'user_agent.original'; //# sourceMappingURL=stable_attributes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/semantic-conventions/build/esm/internal/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Creates a const map from the given values
 * @param values - An array of values to be used as keys and values in the map.
 * @returns A populated version of the map with the values and keys derived from the values.
 */ /*#__NO_SIDE_EFFECTS__*/ __turbopack_context__.s([
    "createConstMap",
    ()=>createConstMap
]);
function createConstMap(values) {
    // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
    let res = {};
    const len = values.length;
    for(let lp = 0; lp < len; lp++){
        const val = values[lp];
        if (val) {
            res[String(val).toUpperCase().replace(/[-.]/g, '_')] = val;
        }
    }
    return res;
} //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DBCASSANDRACONSISTENCYLEVELVALUES_ALL",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_ALL,
    "DBCASSANDRACONSISTENCYLEVELVALUES_ANY",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_ANY,
    "DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM,
    "DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE,
    "DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM,
    "DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL,
    "DBCASSANDRACONSISTENCYLEVELVALUES_ONE",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_ONE,
    "DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM,
    "DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL,
    "DBCASSANDRACONSISTENCYLEVELVALUES_THREE",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_THREE,
    "DBCASSANDRACONSISTENCYLEVELVALUES_TWO",
    ()=>DBCASSANDRACONSISTENCYLEVELVALUES_TWO,
    "DBSYSTEMVALUES_ADABAS",
    ()=>DBSYSTEMVALUES_ADABAS,
    "DBSYSTEMVALUES_CACHE",
    ()=>DBSYSTEMVALUES_CACHE,
    "DBSYSTEMVALUES_CASSANDRA",
    ()=>DBSYSTEMVALUES_CASSANDRA,
    "DBSYSTEMVALUES_CLOUDSCAPE",
    ()=>DBSYSTEMVALUES_CLOUDSCAPE,
    "DBSYSTEMVALUES_COCKROACHDB",
    ()=>DBSYSTEMVALUES_COCKROACHDB,
    "DBSYSTEMVALUES_COLDFUSION",
    ()=>DBSYSTEMVALUES_COLDFUSION,
    "DBSYSTEMVALUES_COSMOSDB",
    ()=>DBSYSTEMVALUES_COSMOSDB,
    "DBSYSTEMVALUES_COUCHBASE",
    ()=>DBSYSTEMVALUES_COUCHBASE,
    "DBSYSTEMVALUES_COUCHDB",
    ()=>DBSYSTEMVALUES_COUCHDB,
    "DBSYSTEMVALUES_DB2",
    ()=>DBSYSTEMVALUES_DB2,
    "DBSYSTEMVALUES_DERBY",
    ()=>DBSYSTEMVALUES_DERBY,
    "DBSYSTEMVALUES_DYNAMODB",
    ()=>DBSYSTEMVALUES_DYNAMODB,
    "DBSYSTEMVALUES_EDB",
    ()=>DBSYSTEMVALUES_EDB,
    "DBSYSTEMVALUES_ELASTICSEARCH",
    ()=>DBSYSTEMVALUES_ELASTICSEARCH,
    "DBSYSTEMVALUES_FILEMAKER",
    ()=>DBSYSTEMVALUES_FILEMAKER,
    "DBSYSTEMVALUES_FIREBIRD",
    ()=>DBSYSTEMVALUES_FIREBIRD,
    "DBSYSTEMVALUES_FIRSTSQL",
    ()=>DBSYSTEMVALUES_FIRSTSQL,
    "DBSYSTEMVALUES_GEODE",
    ()=>DBSYSTEMVALUES_GEODE,
    "DBSYSTEMVALUES_H2",
    ()=>DBSYSTEMVALUES_H2,
    "DBSYSTEMVALUES_HANADB",
    ()=>DBSYSTEMVALUES_HANADB,
    "DBSYSTEMVALUES_HBASE",
    ()=>DBSYSTEMVALUES_HBASE,
    "DBSYSTEMVALUES_HIVE",
    ()=>DBSYSTEMVALUES_HIVE,
    "DBSYSTEMVALUES_HSQLDB",
    ()=>DBSYSTEMVALUES_HSQLDB,
    "DBSYSTEMVALUES_INFORMIX",
    ()=>DBSYSTEMVALUES_INFORMIX,
    "DBSYSTEMVALUES_INGRES",
    ()=>DBSYSTEMVALUES_INGRES,
    "DBSYSTEMVALUES_INSTANTDB",
    ()=>DBSYSTEMVALUES_INSTANTDB,
    "DBSYSTEMVALUES_INTERBASE",
    ()=>DBSYSTEMVALUES_INTERBASE,
    "DBSYSTEMVALUES_MARIADB",
    ()=>DBSYSTEMVALUES_MARIADB,
    "DBSYSTEMVALUES_MAXDB",
    ()=>DBSYSTEMVALUES_MAXDB,
    "DBSYSTEMVALUES_MEMCACHED",
    ()=>DBSYSTEMVALUES_MEMCACHED,
    "DBSYSTEMVALUES_MONGODB",
    ()=>DBSYSTEMVALUES_MONGODB,
    "DBSYSTEMVALUES_MSSQL",
    ()=>DBSYSTEMVALUES_MSSQL,
    "DBSYSTEMVALUES_MYSQL",
    ()=>DBSYSTEMVALUES_MYSQL,
    "DBSYSTEMVALUES_NEO4J",
    ()=>DBSYSTEMVALUES_NEO4J,
    "DBSYSTEMVALUES_NETEZZA",
    ()=>DBSYSTEMVALUES_NETEZZA,
    "DBSYSTEMVALUES_ORACLE",
    ()=>DBSYSTEMVALUES_ORACLE,
    "DBSYSTEMVALUES_OTHER_SQL",
    ()=>DBSYSTEMVALUES_OTHER_SQL,
    "DBSYSTEMVALUES_PERVASIVE",
    ()=>DBSYSTEMVALUES_PERVASIVE,
    "DBSYSTEMVALUES_POINTBASE",
    ()=>DBSYSTEMVALUES_POINTBASE,
    "DBSYSTEMVALUES_POSTGRESQL",
    ()=>DBSYSTEMVALUES_POSTGRESQL,
    "DBSYSTEMVALUES_PROGRESS",
    ()=>DBSYSTEMVALUES_PROGRESS,
    "DBSYSTEMVALUES_REDIS",
    ()=>DBSYSTEMVALUES_REDIS,
    "DBSYSTEMVALUES_REDSHIFT",
    ()=>DBSYSTEMVALUES_REDSHIFT,
    "DBSYSTEMVALUES_SQLITE",
    ()=>DBSYSTEMVALUES_SQLITE,
    "DBSYSTEMVALUES_SYBASE",
    ()=>DBSYSTEMVALUES_SYBASE,
    "DBSYSTEMVALUES_TERADATA",
    ()=>DBSYSTEMVALUES_TERADATA,
    "DBSYSTEMVALUES_VERTICA",
    ()=>DBSYSTEMVALUES_VERTICA,
    "DbCassandraConsistencyLevelValues",
    ()=>DbCassandraConsistencyLevelValues,
    "DbSystemValues",
    ()=>DbSystemValues,
    "FAASDOCUMENTOPERATIONVALUES_DELETE",
    ()=>FAASDOCUMENTOPERATIONVALUES_DELETE,
    "FAASDOCUMENTOPERATIONVALUES_EDIT",
    ()=>FAASDOCUMENTOPERATIONVALUES_EDIT,
    "FAASDOCUMENTOPERATIONVALUES_INSERT",
    ()=>FAASDOCUMENTOPERATIONVALUES_INSERT,
    "FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD",
    ()=>FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD,
    "FAASINVOKEDPROVIDERVALUES_AWS",
    ()=>FAASINVOKEDPROVIDERVALUES_AWS,
    "FAASINVOKEDPROVIDERVALUES_AZURE",
    ()=>FAASINVOKEDPROVIDERVALUES_AZURE,
    "FAASINVOKEDPROVIDERVALUES_GCP",
    ()=>FAASINVOKEDPROVIDERVALUES_GCP,
    "FAASTRIGGERVALUES_DATASOURCE",
    ()=>FAASTRIGGERVALUES_DATASOURCE,
    "FAASTRIGGERVALUES_HTTP",
    ()=>FAASTRIGGERVALUES_HTTP,
    "FAASTRIGGERVALUES_OTHER",
    ()=>FAASTRIGGERVALUES_OTHER,
    "FAASTRIGGERVALUES_PUBSUB",
    ()=>FAASTRIGGERVALUES_PUBSUB,
    "FAASTRIGGERVALUES_TIMER",
    ()=>FAASTRIGGERVALUES_TIMER,
    "FaasDocumentOperationValues",
    ()=>FaasDocumentOperationValues,
    "FaasInvokedProviderValues",
    ()=>FaasInvokedProviderValues,
    "FaasTriggerValues",
    ()=>FaasTriggerValues,
    "HTTPFLAVORVALUES_HTTP_1_0",
    ()=>HTTPFLAVORVALUES_HTTP_1_0,
    "HTTPFLAVORVALUES_HTTP_1_1",
    ()=>HTTPFLAVORVALUES_HTTP_1_1,
    "HTTPFLAVORVALUES_HTTP_2_0",
    ()=>HTTPFLAVORVALUES_HTTP_2_0,
    "HTTPFLAVORVALUES_QUIC",
    ()=>HTTPFLAVORVALUES_QUIC,
    "HTTPFLAVORVALUES_SPDY",
    ()=>HTTPFLAVORVALUES_SPDY,
    "HttpFlavorValues",
    ()=>HttpFlavorValues,
    "MESSAGETYPEVALUES_RECEIVED",
    ()=>MESSAGETYPEVALUES_RECEIVED,
    "MESSAGETYPEVALUES_SENT",
    ()=>MESSAGETYPEVALUES_SENT,
    "MESSAGINGDESTINATIONKINDVALUES_QUEUE",
    ()=>MESSAGINGDESTINATIONKINDVALUES_QUEUE,
    "MESSAGINGDESTINATIONKINDVALUES_TOPIC",
    ()=>MESSAGINGDESTINATIONKINDVALUES_TOPIC,
    "MESSAGINGOPERATIONVALUES_PROCESS",
    ()=>MESSAGINGOPERATIONVALUES_PROCESS,
    "MESSAGINGOPERATIONVALUES_RECEIVE",
    ()=>MESSAGINGOPERATIONVALUES_RECEIVE,
    "MessageTypeValues",
    ()=>MessageTypeValues,
    "MessagingDestinationKindValues",
    ()=>MessagingDestinationKindValues,
    "MessagingOperationValues",
    ()=>MessagingOperationValues,
    "NETHOSTCONNECTIONSUBTYPEVALUES_CDMA",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_CDMA,
    "NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT,
    "NETHOSTCONNECTIONSUBTYPEVALUES_EDGE",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_EDGE,
    "NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD,
    "NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0,
    "NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A,
    "NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B,
    "NETHOSTCONNECTIONSUBTYPEVALUES_GPRS",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_GPRS,
    "NETHOSTCONNECTIONSUBTYPEVALUES_GSM",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_GSM,
    "NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA,
    "NETHOSTCONNECTIONSUBTYPEVALUES_HSPA",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_HSPA,
    "NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP,
    "NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA,
    "NETHOSTCONNECTIONSUBTYPEVALUES_IDEN",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_IDEN,
    "NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN,
    "NETHOSTCONNECTIONSUBTYPEVALUES_LTE",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_LTE,
    "NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA,
    "NETHOSTCONNECTIONSUBTYPEVALUES_NR",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_NR,
    "NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA,
    "NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA,
    "NETHOSTCONNECTIONSUBTYPEVALUES_UMTS",
    ()=>NETHOSTCONNECTIONSUBTYPEVALUES_UMTS,
    "NETHOSTCONNECTIONTYPEVALUES_CELL",
    ()=>NETHOSTCONNECTIONTYPEVALUES_CELL,
    "NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE",
    ()=>NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE,
    "NETHOSTCONNECTIONTYPEVALUES_UNKNOWN",
    ()=>NETHOSTCONNECTIONTYPEVALUES_UNKNOWN,
    "NETHOSTCONNECTIONTYPEVALUES_WIFI",
    ()=>NETHOSTCONNECTIONTYPEVALUES_WIFI,
    "NETHOSTCONNECTIONTYPEVALUES_WIRED",
    ()=>NETHOSTCONNECTIONTYPEVALUES_WIRED,
    "NETTRANSPORTVALUES_INPROC",
    ()=>NETTRANSPORTVALUES_INPROC,
    "NETTRANSPORTVALUES_IP",
    ()=>NETTRANSPORTVALUES_IP,
    "NETTRANSPORTVALUES_IP_TCP",
    ()=>NETTRANSPORTVALUES_IP_TCP,
    "NETTRANSPORTVALUES_IP_UDP",
    ()=>NETTRANSPORTVALUES_IP_UDP,
    "NETTRANSPORTVALUES_OTHER",
    ()=>NETTRANSPORTVALUES_OTHER,
    "NETTRANSPORTVALUES_PIPE",
    ()=>NETTRANSPORTVALUES_PIPE,
    "NETTRANSPORTVALUES_UNIX",
    ()=>NETTRANSPORTVALUES_UNIX,
    "NetHostConnectionSubtypeValues",
    ()=>NetHostConnectionSubtypeValues,
    "NetHostConnectionTypeValues",
    ()=>NetHostConnectionTypeValues,
    "NetTransportValues",
    ()=>NetTransportValues,
    "RPCGRPCSTATUSCODEVALUES_ABORTED",
    ()=>RPCGRPCSTATUSCODEVALUES_ABORTED,
    "RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS",
    ()=>RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS,
    "RPCGRPCSTATUSCODEVALUES_CANCELLED",
    ()=>RPCGRPCSTATUSCODEVALUES_CANCELLED,
    "RPCGRPCSTATUSCODEVALUES_DATA_LOSS",
    ()=>RPCGRPCSTATUSCODEVALUES_DATA_LOSS,
    "RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED",
    ()=>RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED,
    "RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION",
    ()=>RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION,
    "RPCGRPCSTATUSCODEVALUES_INTERNAL",
    ()=>RPCGRPCSTATUSCODEVALUES_INTERNAL,
    "RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT",
    ()=>RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT,
    "RPCGRPCSTATUSCODEVALUES_NOT_FOUND",
    ()=>RPCGRPCSTATUSCODEVALUES_NOT_FOUND,
    "RPCGRPCSTATUSCODEVALUES_OK",
    ()=>RPCGRPCSTATUSCODEVALUES_OK,
    "RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE",
    ()=>RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE,
    "RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED",
    ()=>RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED,
    "RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED",
    ()=>RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED,
    "RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED",
    ()=>RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED,
    "RPCGRPCSTATUSCODEVALUES_UNAVAILABLE",
    ()=>RPCGRPCSTATUSCODEVALUES_UNAVAILABLE,
    "RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED",
    ()=>RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED,
    "RPCGRPCSTATUSCODEVALUES_UNKNOWN",
    ()=>RPCGRPCSTATUSCODEVALUES_UNKNOWN,
    "RpcGrpcStatusCodeValues",
    ()=>RpcGrpcStatusCodeValues,
    "SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET",
    ()=>SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET,
    "SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS",
    ()=>SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS,
    "SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ",
    ()=>SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ,
    "SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY",
    ()=>SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY,
    "SEMATTRS_AWS_DYNAMODB_COUNT",
    ()=>SEMATTRS_AWS_DYNAMODB_COUNT,
    "SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE",
    ()=>SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE,
    "SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES",
    ()=>SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES,
    "SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES",
    ()=>SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES,
    "SEMATTRS_AWS_DYNAMODB_INDEX_NAME",
    ()=>SEMATTRS_AWS_DYNAMODB_INDEX_NAME,
    "SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS",
    ()=>SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS,
    "SEMATTRS_AWS_DYNAMODB_LIMIT",
    ()=>SEMATTRS_AWS_DYNAMODB_LIMIT,
    "SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES",
    ()=>SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES,
    "SEMATTRS_AWS_DYNAMODB_PROJECTION",
    ()=>SEMATTRS_AWS_DYNAMODB_PROJECTION,
    "SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY",
    ()=>SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY,
    "SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY",
    ()=>SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY,
    "SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT",
    ()=>SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT,
    "SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD",
    ()=>SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD,
    "SEMATTRS_AWS_DYNAMODB_SEGMENT",
    ()=>SEMATTRS_AWS_DYNAMODB_SEGMENT,
    "SEMATTRS_AWS_DYNAMODB_SELECT",
    ()=>SEMATTRS_AWS_DYNAMODB_SELECT,
    "SEMATTRS_AWS_DYNAMODB_TABLE_COUNT",
    ()=>SEMATTRS_AWS_DYNAMODB_TABLE_COUNT,
    "SEMATTRS_AWS_DYNAMODB_TABLE_NAMES",
    ()=>SEMATTRS_AWS_DYNAMODB_TABLE_NAMES,
    "SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS",
    ()=>SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS,
    "SEMATTRS_AWS_LAMBDA_INVOKED_ARN",
    ()=>SEMATTRS_AWS_LAMBDA_INVOKED_ARN,
    "SEMATTRS_CODE_FILEPATH",
    ()=>SEMATTRS_CODE_FILEPATH,
    "SEMATTRS_CODE_FUNCTION",
    ()=>SEMATTRS_CODE_FUNCTION,
    "SEMATTRS_CODE_LINENO",
    ()=>SEMATTRS_CODE_LINENO,
    "SEMATTRS_CODE_NAMESPACE",
    ()=>SEMATTRS_CODE_NAMESPACE,
    "SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL",
    ()=>SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL,
    "SEMATTRS_DB_CASSANDRA_COORDINATOR_DC",
    ()=>SEMATTRS_DB_CASSANDRA_COORDINATOR_DC,
    "SEMATTRS_DB_CASSANDRA_COORDINATOR_ID",
    ()=>SEMATTRS_DB_CASSANDRA_COORDINATOR_ID,
    "SEMATTRS_DB_CASSANDRA_IDEMPOTENCE",
    ()=>SEMATTRS_DB_CASSANDRA_IDEMPOTENCE,
    "SEMATTRS_DB_CASSANDRA_KEYSPACE",
    ()=>SEMATTRS_DB_CASSANDRA_KEYSPACE,
    "SEMATTRS_DB_CASSANDRA_PAGE_SIZE",
    ()=>SEMATTRS_DB_CASSANDRA_PAGE_SIZE,
    "SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT",
    ()=>SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT,
    "SEMATTRS_DB_CASSANDRA_TABLE",
    ()=>SEMATTRS_DB_CASSANDRA_TABLE,
    "SEMATTRS_DB_CONNECTION_STRING",
    ()=>SEMATTRS_DB_CONNECTION_STRING,
    "SEMATTRS_DB_HBASE_NAMESPACE",
    ()=>SEMATTRS_DB_HBASE_NAMESPACE,
    "SEMATTRS_DB_JDBC_DRIVER_CLASSNAME",
    ()=>SEMATTRS_DB_JDBC_DRIVER_CLASSNAME,
    "SEMATTRS_DB_MONGODB_COLLECTION",
    ()=>SEMATTRS_DB_MONGODB_COLLECTION,
    "SEMATTRS_DB_MSSQL_INSTANCE_NAME",
    ()=>SEMATTRS_DB_MSSQL_INSTANCE_NAME,
    "SEMATTRS_DB_NAME",
    ()=>SEMATTRS_DB_NAME,
    "SEMATTRS_DB_OPERATION",
    ()=>SEMATTRS_DB_OPERATION,
    "SEMATTRS_DB_REDIS_DATABASE_INDEX",
    ()=>SEMATTRS_DB_REDIS_DATABASE_INDEX,
    "SEMATTRS_DB_SQL_TABLE",
    ()=>SEMATTRS_DB_SQL_TABLE,
    "SEMATTRS_DB_STATEMENT",
    ()=>SEMATTRS_DB_STATEMENT,
    "SEMATTRS_DB_SYSTEM",
    ()=>SEMATTRS_DB_SYSTEM,
    "SEMATTRS_DB_USER",
    ()=>SEMATTRS_DB_USER,
    "SEMATTRS_ENDUSER_ID",
    ()=>SEMATTRS_ENDUSER_ID,
    "SEMATTRS_ENDUSER_ROLE",
    ()=>SEMATTRS_ENDUSER_ROLE,
    "SEMATTRS_ENDUSER_SCOPE",
    ()=>SEMATTRS_ENDUSER_SCOPE,
    "SEMATTRS_EXCEPTION_ESCAPED",
    ()=>SEMATTRS_EXCEPTION_ESCAPED,
    "SEMATTRS_EXCEPTION_MESSAGE",
    ()=>SEMATTRS_EXCEPTION_MESSAGE,
    "SEMATTRS_EXCEPTION_STACKTRACE",
    ()=>SEMATTRS_EXCEPTION_STACKTRACE,
    "SEMATTRS_EXCEPTION_TYPE",
    ()=>SEMATTRS_EXCEPTION_TYPE,
    "SEMATTRS_FAAS_COLDSTART",
    ()=>SEMATTRS_FAAS_COLDSTART,
    "SEMATTRS_FAAS_CRON",
    ()=>SEMATTRS_FAAS_CRON,
    "SEMATTRS_FAAS_DOCUMENT_COLLECTION",
    ()=>SEMATTRS_FAAS_DOCUMENT_COLLECTION,
    "SEMATTRS_FAAS_DOCUMENT_NAME",
    ()=>SEMATTRS_FAAS_DOCUMENT_NAME,
    "SEMATTRS_FAAS_DOCUMENT_OPERATION",
    ()=>SEMATTRS_FAAS_DOCUMENT_OPERATION,
    "SEMATTRS_FAAS_DOCUMENT_TIME",
    ()=>SEMATTRS_FAAS_DOCUMENT_TIME,
    "SEMATTRS_FAAS_EXECUTION",
    ()=>SEMATTRS_FAAS_EXECUTION,
    "SEMATTRS_FAAS_INVOKED_NAME",
    ()=>SEMATTRS_FAAS_INVOKED_NAME,
    "SEMATTRS_FAAS_INVOKED_PROVIDER",
    ()=>SEMATTRS_FAAS_INVOKED_PROVIDER,
    "SEMATTRS_FAAS_INVOKED_REGION",
    ()=>SEMATTRS_FAAS_INVOKED_REGION,
    "SEMATTRS_FAAS_TIME",
    ()=>SEMATTRS_FAAS_TIME,
    "SEMATTRS_FAAS_TRIGGER",
    ()=>SEMATTRS_FAAS_TRIGGER,
    "SEMATTRS_HTTP_CLIENT_IP",
    ()=>SEMATTRS_HTTP_CLIENT_IP,
    "SEMATTRS_HTTP_FLAVOR",
    ()=>SEMATTRS_HTTP_FLAVOR,
    "SEMATTRS_HTTP_HOST",
    ()=>SEMATTRS_HTTP_HOST,
    "SEMATTRS_HTTP_METHOD",
    ()=>SEMATTRS_HTTP_METHOD,
    "SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH",
    ()=>SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH,
    "SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED",
    ()=>SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED,
    "SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH",
    ()=>SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH,
    "SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED",
    ()=>SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED,
    "SEMATTRS_HTTP_ROUTE",
    ()=>SEMATTRS_HTTP_ROUTE,
    "SEMATTRS_HTTP_SCHEME",
    ()=>SEMATTRS_HTTP_SCHEME,
    "SEMATTRS_HTTP_SERVER_NAME",
    ()=>SEMATTRS_HTTP_SERVER_NAME,
    "SEMATTRS_HTTP_STATUS_CODE",
    ()=>SEMATTRS_HTTP_STATUS_CODE,
    "SEMATTRS_HTTP_TARGET",
    ()=>SEMATTRS_HTTP_TARGET,
    "SEMATTRS_HTTP_URL",
    ()=>SEMATTRS_HTTP_URL,
    "SEMATTRS_HTTP_USER_AGENT",
    ()=>SEMATTRS_HTTP_USER_AGENT,
    "SEMATTRS_MESSAGE_COMPRESSED_SIZE",
    ()=>SEMATTRS_MESSAGE_COMPRESSED_SIZE,
    "SEMATTRS_MESSAGE_ID",
    ()=>SEMATTRS_MESSAGE_ID,
    "SEMATTRS_MESSAGE_TYPE",
    ()=>SEMATTRS_MESSAGE_TYPE,
    "SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE",
    ()=>SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE,
    "SEMATTRS_MESSAGING_CONSUMER_ID",
    ()=>SEMATTRS_MESSAGING_CONSUMER_ID,
    "SEMATTRS_MESSAGING_CONVERSATION_ID",
    ()=>SEMATTRS_MESSAGING_CONVERSATION_ID,
    "SEMATTRS_MESSAGING_DESTINATION",
    ()=>SEMATTRS_MESSAGING_DESTINATION,
    "SEMATTRS_MESSAGING_DESTINATION_KIND",
    ()=>SEMATTRS_MESSAGING_DESTINATION_KIND,
    "SEMATTRS_MESSAGING_KAFKA_CLIENT_ID",
    ()=>SEMATTRS_MESSAGING_KAFKA_CLIENT_ID,
    "SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP",
    ()=>SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP,
    "SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY",
    ()=>SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY,
    "SEMATTRS_MESSAGING_KAFKA_PARTITION",
    ()=>SEMATTRS_MESSAGING_KAFKA_PARTITION,
    "SEMATTRS_MESSAGING_KAFKA_TOMBSTONE",
    ()=>SEMATTRS_MESSAGING_KAFKA_TOMBSTONE,
    "SEMATTRS_MESSAGING_MESSAGE_ID",
    ()=>SEMATTRS_MESSAGING_MESSAGE_ID,
    "SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES",
    ()=>SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES,
    "SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES",
    ()=>SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES,
    "SEMATTRS_MESSAGING_OPERATION",
    ()=>SEMATTRS_MESSAGING_OPERATION,
    "SEMATTRS_MESSAGING_PROTOCOL",
    ()=>SEMATTRS_MESSAGING_PROTOCOL,
    "SEMATTRS_MESSAGING_PROTOCOL_VERSION",
    ()=>SEMATTRS_MESSAGING_PROTOCOL_VERSION,
    "SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY",
    ()=>SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY,
    "SEMATTRS_MESSAGING_SYSTEM",
    ()=>SEMATTRS_MESSAGING_SYSTEM,
    "SEMATTRS_MESSAGING_TEMP_DESTINATION",
    ()=>SEMATTRS_MESSAGING_TEMP_DESTINATION,
    "SEMATTRS_MESSAGING_URL",
    ()=>SEMATTRS_MESSAGING_URL,
    "SEMATTRS_NET_HOST_CARRIER_ICC",
    ()=>SEMATTRS_NET_HOST_CARRIER_ICC,
    "SEMATTRS_NET_HOST_CARRIER_MCC",
    ()=>SEMATTRS_NET_HOST_CARRIER_MCC,
    "SEMATTRS_NET_HOST_CARRIER_MNC",
    ()=>SEMATTRS_NET_HOST_CARRIER_MNC,
    "SEMATTRS_NET_HOST_CARRIER_NAME",
    ()=>SEMATTRS_NET_HOST_CARRIER_NAME,
    "SEMATTRS_NET_HOST_CONNECTION_SUBTYPE",
    ()=>SEMATTRS_NET_HOST_CONNECTION_SUBTYPE,
    "SEMATTRS_NET_HOST_CONNECTION_TYPE",
    ()=>SEMATTRS_NET_HOST_CONNECTION_TYPE,
    "SEMATTRS_NET_HOST_IP",
    ()=>SEMATTRS_NET_HOST_IP,
    "SEMATTRS_NET_HOST_NAME",
    ()=>SEMATTRS_NET_HOST_NAME,
    "SEMATTRS_NET_HOST_PORT",
    ()=>SEMATTRS_NET_HOST_PORT,
    "SEMATTRS_NET_PEER_IP",
    ()=>SEMATTRS_NET_PEER_IP,
    "SEMATTRS_NET_PEER_NAME",
    ()=>SEMATTRS_NET_PEER_NAME,
    "SEMATTRS_NET_PEER_PORT",
    ()=>SEMATTRS_NET_PEER_PORT,
    "SEMATTRS_NET_TRANSPORT",
    ()=>SEMATTRS_NET_TRANSPORT,
    "SEMATTRS_PEER_SERVICE",
    ()=>SEMATTRS_PEER_SERVICE,
    "SEMATTRS_RPC_GRPC_STATUS_CODE",
    ()=>SEMATTRS_RPC_GRPC_STATUS_CODE,
    "SEMATTRS_RPC_JSONRPC_ERROR_CODE",
    ()=>SEMATTRS_RPC_JSONRPC_ERROR_CODE,
    "SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE",
    ()=>SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE,
    "SEMATTRS_RPC_JSONRPC_REQUEST_ID",
    ()=>SEMATTRS_RPC_JSONRPC_REQUEST_ID,
    "SEMATTRS_RPC_JSONRPC_VERSION",
    ()=>SEMATTRS_RPC_JSONRPC_VERSION,
    "SEMATTRS_RPC_METHOD",
    ()=>SEMATTRS_RPC_METHOD,
    "SEMATTRS_RPC_SERVICE",
    ()=>SEMATTRS_RPC_SERVICE,
    "SEMATTRS_RPC_SYSTEM",
    ()=>SEMATTRS_RPC_SYSTEM,
    "SEMATTRS_THREAD_ID",
    ()=>SEMATTRS_THREAD_ID,
    "SEMATTRS_THREAD_NAME",
    ()=>SEMATTRS_THREAD_NAME,
    "SemanticAttributes",
    ()=>SemanticAttributes
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/semantic-conventions/build/esm/internal/utils.js [instrumentation-edge] (ecmascript)");
;
//----------------------------------------------------------------------------------------------------------
// DO NOT EDIT, this is an Auto-generated file from scripts/semconv/templates//templates/SemanticAttributes.ts.j2
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
// Constant values for SemanticAttributes
//----------------------------------------------------------------------------------------------------------
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_AWS_LAMBDA_INVOKED_ARN = 'aws.lambda.invoked_arn';
const TMP_DB_SYSTEM = 'db.system';
const TMP_DB_CONNECTION_STRING = 'db.connection_string';
const TMP_DB_USER = 'db.user';
const TMP_DB_JDBC_DRIVER_CLASSNAME = 'db.jdbc.driver_classname';
const TMP_DB_NAME = 'db.name';
const TMP_DB_STATEMENT = 'db.statement';
const TMP_DB_OPERATION = 'db.operation';
const TMP_DB_MSSQL_INSTANCE_NAME = 'db.mssql.instance_name';
const TMP_DB_CASSANDRA_KEYSPACE = 'db.cassandra.keyspace';
const TMP_DB_CASSANDRA_PAGE_SIZE = 'db.cassandra.page_size';
const TMP_DB_CASSANDRA_CONSISTENCY_LEVEL = 'db.cassandra.consistency_level';
const TMP_DB_CASSANDRA_TABLE = 'db.cassandra.table';
const TMP_DB_CASSANDRA_IDEMPOTENCE = 'db.cassandra.idempotence';
const TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = 'db.cassandra.speculative_execution_count';
const TMP_DB_CASSANDRA_COORDINATOR_ID = 'db.cassandra.coordinator.id';
const TMP_DB_CASSANDRA_COORDINATOR_DC = 'db.cassandra.coordinator.dc';
const TMP_DB_HBASE_NAMESPACE = 'db.hbase.namespace';
const TMP_DB_REDIS_DATABASE_INDEX = 'db.redis.database_index';
const TMP_DB_MONGODB_COLLECTION = 'db.mongodb.collection';
const TMP_DB_SQL_TABLE = 'db.sql.table';
const TMP_EXCEPTION_TYPE = 'exception.type';
const TMP_EXCEPTION_MESSAGE = 'exception.message';
const TMP_EXCEPTION_STACKTRACE = 'exception.stacktrace';
const TMP_EXCEPTION_ESCAPED = 'exception.escaped';
const TMP_FAAS_TRIGGER = 'faas.trigger';
const TMP_FAAS_EXECUTION = 'faas.execution';
const TMP_FAAS_DOCUMENT_COLLECTION = 'faas.document.collection';
const TMP_FAAS_DOCUMENT_OPERATION = 'faas.document.operation';
const TMP_FAAS_DOCUMENT_TIME = 'faas.document.time';
const TMP_FAAS_DOCUMENT_NAME = 'faas.document.name';
const TMP_FAAS_TIME = 'faas.time';
const TMP_FAAS_CRON = 'faas.cron';
const TMP_FAAS_COLDSTART = 'faas.coldstart';
const TMP_FAAS_INVOKED_NAME = 'faas.invoked_name';
const TMP_FAAS_INVOKED_PROVIDER = 'faas.invoked_provider';
const TMP_FAAS_INVOKED_REGION = 'faas.invoked_region';
const TMP_NET_TRANSPORT = 'net.transport';
const TMP_NET_PEER_IP = 'net.peer.ip';
const TMP_NET_PEER_PORT = 'net.peer.port';
const TMP_NET_PEER_NAME = 'net.peer.name';
const TMP_NET_HOST_IP = 'net.host.ip';
const TMP_NET_HOST_PORT = 'net.host.port';
const TMP_NET_HOST_NAME = 'net.host.name';
const TMP_NET_HOST_CONNECTION_TYPE = 'net.host.connection.type';
const TMP_NET_HOST_CONNECTION_SUBTYPE = 'net.host.connection.subtype';
const TMP_NET_HOST_CARRIER_NAME = 'net.host.carrier.name';
const TMP_NET_HOST_CARRIER_MCC = 'net.host.carrier.mcc';
const TMP_NET_HOST_CARRIER_MNC = 'net.host.carrier.mnc';
const TMP_NET_HOST_CARRIER_ICC = 'net.host.carrier.icc';
const TMP_PEER_SERVICE = 'peer.service';
const TMP_ENDUSER_ID = 'enduser.id';
const TMP_ENDUSER_ROLE = 'enduser.role';
const TMP_ENDUSER_SCOPE = 'enduser.scope';
const TMP_THREAD_ID = 'thread.id';
const TMP_THREAD_NAME = 'thread.name';
const TMP_CODE_FUNCTION = 'code.function';
const TMP_CODE_NAMESPACE = 'code.namespace';
const TMP_CODE_FILEPATH = 'code.filepath';
const TMP_CODE_LINENO = 'code.lineno';
const TMP_HTTP_METHOD = 'http.method';
const TMP_HTTP_URL = 'http.url';
const TMP_HTTP_TARGET = 'http.target';
const TMP_HTTP_HOST = 'http.host';
const TMP_HTTP_SCHEME = 'http.scheme';
const TMP_HTTP_STATUS_CODE = 'http.status_code';
const TMP_HTTP_FLAVOR = 'http.flavor';
const TMP_HTTP_USER_AGENT = 'http.user_agent';
const TMP_HTTP_REQUEST_CONTENT_LENGTH = 'http.request_content_length';
const TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = 'http.request_content_length_uncompressed';
const TMP_HTTP_RESPONSE_CONTENT_LENGTH = 'http.response_content_length';
const TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = 'http.response_content_length_uncompressed';
const TMP_HTTP_SERVER_NAME = 'http.server_name';
const TMP_HTTP_ROUTE = 'http.route';
const TMP_HTTP_CLIENT_IP = 'http.client_ip';
const TMP_AWS_DYNAMODB_TABLE_NAMES = 'aws.dynamodb.table_names';
const TMP_AWS_DYNAMODB_CONSUMED_CAPACITY = 'aws.dynamodb.consumed_capacity';
const TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = 'aws.dynamodb.item_collection_metrics';
const TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = 'aws.dynamodb.provisioned_read_capacity';
const TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = 'aws.dynamodb.provisioned_write_capacity';
const TMP_AWS_DYNAMODB_CONSISTENT_READ = 'aws.dynamodb.consistent_read';
const TMP_AWS_DYNAMODB_PROJECTION = 'aws.dynamodb.projection';
const TMP_AWS_DYNAMODB_LIMIT = 'aws.dynamodb.limit';
const TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET = 'aws.dynamodb.attributes_to_get';
const TMP_AWS_DYNAMODB_INDEX_NAME = 'aws.dynamodb.index_name';
const TMP_AWS_DYNAMODB_SELECT = 'aws.dynamodb.select';
const TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = 'aws.dynamodb.global_secondary_indexes';
const TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = 'aws.dynamodb.local_secondary_indexes';
const TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = 'aws.dynamodb.exclusive_start_table';
const TMP_AWS_DYNAMODB_TABLE_COUNT = 'aws.dynamodb.table_count';
const TMP_AWS_DYNAMODB_SCAN_FORWARD = 'aws.dynamodb.scan_forward';
const TMP_AWS_DYNAMODB_SEGMENT = 'aws.dynamodb.segment';
const TMP_AWS_DYNAMODB_TOTAL_SEGMENTS = 'aws.dynamodb.total_segments';
const TMP_AWS_DYNAMODB_COUNT = 'aws.dynamodb.count';
const TMP_AWS_DYNAMODB_SCANNED_COUNT = 'aws.dynamodb.scanned_count';
const TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = 'aws.dynamodb.attribute_definitions';
const TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = 'aws.dynamodb.global_secondary_index_updates';
const TMP_MESSAGING_SYSTEM = 'messaging.system';
const TMP_MESSAGING_DESTINATION = 'messaging.destination';
const TMP_MESSAGING_DESTINATION_KIND = 'messaging.destination_kind';
const TMP_MESSAGING_TEMP_DESTINATION = 'messaging.temp_destination';
const TMP_MESSAGING_PROTOCOL = 'messaging.protocol';
const TMP_MESSAGING_PROTOCOL_VERSION = 'messaging.protocol_version';
const TMP_MESSAGING_URL = 'messaging.url';
const TMP_MESSAGING_MESSAGE_ID = 'messaging.message_id';
const TMP_MESSAGING_CONVERSATION_ID = 'messaging.conversation_id';
const TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = 'messaging.message_payload_size_bytes';
const TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = 'messaging.message_payload_compressed_size_bytes';
const TMP_MESSAGING_OPERATION = 'messaging.operation';
const TMP_MESSAGING_CONSUMER_ID = 'messaging.consumer_id';
const TMP_MESSAGING_RABBITMQ_ROUTING_KEY = 'messaging.rabbitmq.routing_key';
const TMP_MESSAGING_KAFKA_MESSAGE_KEY = 'messaging.kafka.message_key';
const TMP_MESSAGING_KAFKA_CONSUMER_GROUP = 'messaging.kafka.consumer_group';
const TMP_MESSAGING_KAFKA_CLIENT_ID = 'messaging.kafka.client_id';
const TMP_MESSAGING_KAFKA_PARTITION = 'messaging.kafka.partition';
const TMP_MESSAGING_KAFKA_TOMBSTONE = 'messaging.kafka.tombstone';
const TMP_RPC_SYSTEM = 'rpc.system';
const TMP_RPC_SERVICE = 'rpc.service';
const TMP_RPC_METHOD = 'rpc.method';
const TMP_RPC_GRPC_STATUS_CODE = 'rpc.grpc.status_code';
const TMP_RPC_JSONRPC_VERSION = 'rpc.jsonrpc.version';
const TMP_RPC_JSONRPC_REQUEST_ID = 'rpc.jsonrpc.request_id';
const TMP_RPC_JSONRPC_ERROR_CODE = 'rpc.jsonrpc.error_code';
const TMP_RPC_JSONRPC_ERROR_MESSAGE = 'rpc.jsonrpc.error_message';
const TMP_MESSAGE_TYPE = 'message.type';
const TMP_MESSAGE_ID = 'message.id';
const TMP_MESSAGE_COMPRESSED_SIZE = 'message.compressed_size';
const TMP_MESSAGE_UNCOMPRESSED_SIZE = 'message.uncompressed_size';
const SEMATTRS_AWS_LAMBDA_INVOKED_ARN = TMP_AWS_LAMBDA_INVOKED_ARN;
const SEMATTRS_DB_SYSTEM = TMP_DB_SYSTEM;
const SEMATTRS_DB_CONNECTION_STRING = TMP_DB_CONNECTION_STRING;
const SEMATTRS_DB_USER = TMP_DB_USER;
const SEMATTRS_DB_JDBC_DRIVER_CLASSNAME = TMP_DB_JDBC_DRIVER_CLASSNAME;
const SEMATTRS_DB_NAME = TMP_DB_NAME;
const SEMATTRS_DB_STATEMENT = TMP_DB_STATEMENT;
const SEMATTRS_DB_OPERATION = TMP_DB_OPERATION;
const SEMATTRS_DB_MSSQL_INSTANCE_NAME = TMP_DB_MSSQL_INSTANCE_NAME;
const SEMATTRS_DB_CASSANDRA_KEYSPACE = TMP_DB_CASSANDRA_KEYSPACE;
const SEMATTRS_DB_CASSANDRA_PAGE_SIZE = TMP_DB_CASSANDRA_PAGE_SIZE;
const SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL = TMP_DB_CASSANDRA_CONSISTENCY_LEVEL;
const SEMATTRS_DB_CASSANDRA_TABLE = TMP_DB_CASSANDRA_TABLE;
const SEMATTRS_DB_CASSANDRA_IDEMPOTENCE = TMP_DB_CASSANDRA_IDEMPOTENCE;
const SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT;
const SEMATTRS_DB_CASSANDRA_COORDINATOR_ID = TMP_DB_CASSANDRA_COORDINATOR_ID;
const SEMATTRS_DB_CASSANDRA_COORDINATOR_DC = TMP_DB_CASSANDRA_COORDINATOR_DC;
const SEMATTRS_DB_HBASE_NAMESPACE = TMP_DB_HBASE_NAMESPACE;
const SEMATTRS_DB_REDIS_DATABASE_INDEX = TMP_DB_REDIS_DATABASE_INDEX;
const SEMATTRS_DB_MONGODB_COLLECTION = TMP_DB_MONGODB_COLLECTION;
const SEMATTRS_DB_SQL_TABLE = TMP_DB_SQL_TABLE;
const SEMATTRS_EXCEPTION_TYPE = TMP_EXCEPTION_TYPE;
const SEMATTRS_EXCEPTION_MESSAGE = TMP_EXCEPTION_MESSAGE;
const SEMATTRS_EXCEPTION_STACKTRACE = TMP_EXCEPTION_STACKTRACE;
const SEMATTRS_EXCEPTION_ESCAPED = TMP_EXCEPTION_ESCAPED;
const SEMATTRS_FAAS_TRIGGER = TMP_FAAS_TRIGGER;
const SEMATTRS_FAAS_EXECUTION = TMP_FAAS_EXECUTION;
const SEMATTRS_FAAS_DOCUMENT_COLLECTION = TMP_FAAS_DOCUMENT_COLLECTION;
const SEMATTRS_FAAS_DOCUMENT_OPERATION = TMP_FAAS_DOCUMENT_OPERATION;
const SEMATTRS_FAAS_DOCUMENT_TIME = TMP_FAAS_DOCUMENT_TIME;
const SEMATTRS_FAAS_DOCUMENT_NAME = TMP_FAAS_DOCUMENT_NAME;
const SEMATTRS_FAAS_TIME = TMP_FAAS_TIME;
const SEMATTRS_FAAS_CRON = TMP_FAAS_CRON;
const SEMATTRS_FAAS_COLDSTART = TMP_FAAS_COLDSTART;
const SEMATTRS_FAAS_INVOKED_NAME = TMP_FAAS_INVOKED_NAME;
const SEMATTRS_FAAS_INVOKED_PROVIDER = TMP_FAAS_INVOKED_PROVIDER;
const SEMATTRS_FAAS_INVOKED_REGION = TMP_FAAS_INVOKED_REGION;
const SEMATTRS_NET_TRANSPORT = TMP_NET_TRANSPORT;
const SEMATTRS_NET_PEER_IP = TMP_NET_PEER_IP;
const SEMATTRS_NET_PEER_PORT = TMP_NET_PEER_PORT;
const SEMATTRS_NET_PEER_NAME = TMP_NET_PEER_NAME;
const SEMATTRS_NET_HOST_IP = TMP_NET_HOST_IP;
const SEMATTRS_NET_HOST_PORT = TMP_NET_HOST_PORT;
const SEMATTRS_NET_HOST_NAME = TMP_NET_HOST_NAME;
const SEMATTRS_NET_HOST_CONNECTION_TYPE = TMP_NET_HOST_CONNECTION_TYPE;
const SEMATTRS_NET_HOST_CONNECTION_SUBTYPE = TMP_NET_HOST_CONNECTION_SUBTYPE;
const SEMATTRS_NET_HOST_CARRIER_NAME = TMP_NET_HOST_CARRIER_NAME;
const SEMATTRS_NET_HOST_CARRIER_MCC = TMP_NET_HOST_CARRIER_MCC;
const SEMATTRS_NET_HOST_CARRIER_MNC = TMP_NET_HOST_CARRIER_MNC;
const SEMATTRS_NET_HOST_CARRIER_ICC = TMP_NET_HOST_CARRIER_ICC;
const SEMATTRS_PEER_SERVICE = TMP_PEER_SERVICE;
const SEMATTRS_ENDUSER_ID = TMP_ENDUSER_ID;
const SEMATTRS_ENDUSER_ROLE = TMP_ENDUSER_ROLE;
const SEMATTRS_ENDUSER_SCOPE = TMP_ENDUSER_SCOPE;
const SEMATTRS_THREAD_ID = TMP_THREAD_ID;
const SEMATTRS_THREAD_NAME = TMP_THREAD_NAME;
const SEMATTRS_CODE_FUNCTION = TMP_CODE_FUNCTION;
const SEMATTRS_CODE_NAMESPACE = TMP_CODE_NAMESPACE;
const SEMATTRS_CODE_FILEPATH = TMP_CODE_FILEPATH;
const SEMATTRS_CODE_LINENO = TMP_CODE_LINENO;
const SEMATTRS_HTTP_METHOD = TMP_HTTP_METHOD;
const SEMATTRS_HTTP_URL = TMP_HTTP_URL;
const SEMATTRS_HTTP_TARGET = TMP_HTTP_TARGET;
const SEMATTRS_HTTP_HOST = TMP_HTTP_HOST;
const SEMATTRS_HTTP_SCHEME = TMP_HTTP_SCHEME;
const SEMATTRS_HTTP_STATUS_CODE = TMP_HTTP_STATUS_CODE;
const SEMATTRS_HTTP_FLAVOR = TMP_HTTP_FLAVOR;
const SEMATTRS_HTTP_USER_AGENT = TMP_HTTP_USER_AGENT;
const SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH = TMP_HTTP_REQUEST_CONTENT_LENGTH;
const SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED;
const SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH = TMP_HTTP_RESPONSE_CONTENT_LENGTH;
const SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED;
const SEMATTRS_HTTP_SERVER_NAME = TMP_HTTP_SERVER_NAME;
const SEMATTRS_HTTP_ROUTE = TMP_HTTP_ROUTE;
const SEMATTRS_HTTP_CLIENT_IP = TMP_HTTP_CLIENT_IP;
const SEMATTRS_AWS_DYNAMODB_TABLE_NAMES = TMP_AWS_DYNAMODB_TABLE_NAMES;
const SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY = TMP_AWS_DYNAMODB_CONSUMED_CAPACITY;
const SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS;
const SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY;
const SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY;
const SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ = TMP_AWS_DYNAMODB_CONSISTENT_READ;
const SEMATTRS_AWS_DYNAMODB_PROJECTION = TMP_AWS_DYNAMODB_PROJECTION;
const SEMATTRS_AWS_DYNAMODB_LIMIT = TMP_AWS_DYNAMODB_LIMIT;
const SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET = TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET;
const SEMATTRS_AWS_DYNAMODB_INDEX_NAME = TMP_AWS_DYNAMODB_INDEX_NAME;
const SEMATTRS_AWS_DYNAMODB_SELECT = TMP_AWS_DYNAMODB_SELECT;
const SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES;
const SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES;
const SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE;
const SEMATTRS_AWS_DYNAMODB_TABLE_COUNT = TMP_AWS_DYNAMODB_TABLE_COUNT;
const SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD = TMP_AWS_DYNAMODB_SCAN_FORWARD;
const SEMATTRS_AWS_DYNAMODB_SEGMENT = TMP_AWS_DYNAMODB_SEGMENT;
const SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS = TMP_AWS_DYNAMODB_TOTAL_SEGMENTS;
const SEMATTRS_AWS_DYNAMODB_COUNT = TMP_AWS_DYNAMODB_COUNT;
const SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT = TMP_AWS_DYNAMODB_SCANNED_COUNT;
const SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS;
const SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES;
const SEMATTRS_MESSAGING_SYSTEM = TMP_MESSAGING_SYSTEM;
const SEMATTRS_MESSAGING_DESTINATION = TMP_MESSAGING_DESTINATION;
const SEMATTRS_MESSAGING_DESTINATION_KIND = TMP_MESSAGING_DESTINATION_KIND;
const SEMATTRS_MESSAGING_TEMP_DESTINATION = TMP_MESSAGING_TEMP_DESTINATION;
const SEMATTRS_MESSAGING_PROTOCOL = TMP_MESSAGING_PROTOCOL;
const SEMATTRS_MESSAGING_PROTOCOL_VERSION = TMP_MESSAGING_PROTOCOL_VERSION;
const SEMATTRS_MESSAGING_URL = TMP_MESSAGING_URL;
const SEMATTRS_MESSAGING_MESSAGE_ID = TMP_MESSAGING_MESSAGE_ID;
const SEMATTRS_MESSAGING_CONVERSATION_ID = TMP_MESSAGING_CONVERSATION_ID;
const SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES;
const SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES;
const SEMATTRS_MESSAGING_OPERATION = TMP_MESSAGING_OPERATION;
const SEMATTRS_MESSAGING_CONSUMER_ID = TMP_MESSAGING_CONSUMER_ID;
const SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY = TMP_MESSAGING_RABBITMQ_ROUTING_KEY;
const SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY = TMP_MESSAGING_KAFKA_MESSAGE_KEY;
const SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP = TMP_MESSAGING_KAFKA_CONSUMER_GROUP;
const SEMATTRS_MESSAGING_KAFKA_CLIENT_ID = TMP_MESSAGING_KAFKA_CLIENT_ID;
const SEMATTRS_MESSAGING_KAFKA_PARTITION = TMP_MESSAGING_KAFKA_PARTITION;
const SEMATTRS_MESSAGING_KAFKA_TOMBSTONE = TMP_MESSAGING_KAFKA_TOMBSTONE;
const SEMATTRS_RPC_SYSTEM = TMP_RPC_SYSTEM;
const SEMATTRS_RPC_SERVICE = TMP_RPC_SERVICE;
const SEMATTRS_RPC_METHOD = TMP_RPC_METHOD;
const SEMATTRS_RPC_GRPC_STATUS_CODE = TMP_RPC_GRPC_STATUS_CODE;
const SEMATTRS_RPC_JSONRPC_VERSION = TMP_RPC_JSONRPC_VERSION;
const SEMATTRS_RPC_JSONRPC_REQUEST_ID = TMP_RPC_JSONRPC_REQUEST_ID;
const SEMATTRS_RPC_JSONRPC_ERROR_CODE = TMP_RPC_JSONRPC_ERROR_CODE;
const SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE = TMP_RPC_JSONRPC_ERROR_MESSAGE;
const SEMATTRS_MESSAGE_TYPE = TMP_MESSAGE_TYPE;
const SEMATTRS_MESSAGE_ID = TMP_MESSAGE_ID;
const SEMATTRS_MESSAGE_COMPRESSED_SIZE = TMP_MESSAGE_COMPRESSED_SIZE;
const SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE = TMP_MESSAGE_UNCOMPRESSED_SIZE;
const SemanticAttributes = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_AWS_LAMBDA_INVOKED_ARN,
    TMP_DB_SYSTEM,
    TMP_DB_CONNECTION_STRING,
    TMP_DB_USER,
    TMP_DB_JDBC_DRIVER_CLASSNAME,
    TMP_DB_NAME,
    TMP_DB_STATEMENT,
    TMP_DB_OPERATION,
    TMP_DB_MSSQL_INSTANCE_NAME,
    TMP_DB_CASSANDRA_KEYSPACE,
    TMP_DB_CASSANDRA_PAGE_SIZE,
    TMP_DB_CASSANDRA_CONSISTENCY_LEVEL,
    TMP_DB_CASSANDRA_TABLE,
    TMP_DB_CASSANDRA_IDEMPOTENCE,
    TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT,
    TMP_DB_CASSANDRA_COORDINATOR_ID,
    TMP_DB_CASSANDRA_COORDINATOR_DC,
    TMP_DB_HBASE_NAMESPACE,
    TMP_DB_REDIS_DATABASE_INDEX,
    TMP_DB_MONGODB_COLLECTION,
    TMP_DB_SQL_TABLE,
    TMP_EXCEPTION_TYPE,
    TMP_EXCEPTION_MESSAGE,
    TMP_EXCEPTION_STACKTRACE,
    TMP_EXCEPTION_ESCAPED,
    TMP_FAAS_TRIGGER,
    TMP_FAAS_EXECUTION,
    TMP_FAAS_DOCUMENT_COLLECTION,
    TMP_FAAS_DOCUMENT_OPERATION,
    TMP_FAAS_DOCUMENT_TIME,
    TMP_FAAS_DOCUMENT_NAME,
    TMP_FAAS_TIME,
    TMP_FAAS_CRON,
    TMP_FAAS_COLDSTART,
    TMP_FAAS_INVOKED_NAME,
    TMP_FAAS_INVOKED_PROVIDER,
    TMP_FAAS_INVOKED_REGION,
    TMP_NET_TRANSPORT,
    TMP_NET_PEER_IP,
    TMP_NET_PEER_PORT,
    TMP_NET_PEER_NAME,
    TMP_NET_HOST_IP,
    TMP_NET_HOST_PORT,
    TMP_NET_HOST_NAME,
    TMP_NET_HOST_CONNECTION_TYPE,
    TMP_NET_HOST_CONNECTION_SUBTYPE,
    TMP_NET_HOST_CARRIER_NAME,
    TMP_NET_HOST_CARRIER_MCC,
    TMP_NET_HOST_CARRIER_MNC,
    TMP_NET_HOST_CARRIER_ICC,
    TMP_PEER_SERVICE,
    TMP_ENDUSER_ID,
    TMP_ENDUSER_ROLE,
    TMP_ENDUSER_SCOPE,
    TMP_THREAD_ID,
    TMP_THREAD_NAME,
    TMP_CODE_FUNCTION,
    TMP_CODE_NAMESPACE,
    TMP_CODE_FILEPATH,
    TMP_CODE_LINENO,
    TMP_HTTP_METHOD,
    TMP_HTTP_URL,
    TMP_HTTP_TARGET,
    TMP_HTTP_HOST,
    TMP_HTTP_SCHEME,
    TMP_HTTP_STATUS_CODE,
    TMP_HTTP_FLAVOR,
    TMP_HTTP_USER_AGENT,
    TMP_HTTP_REQUEST_CONTENT_LENGTH,
    TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED,
    TMP_HTTP_RESPONSE_CONTENT_LENGTH,
    TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED,
    TMP_HTTP_SERVER_NAME,
    TMP_HTTP_ROUTE,
    TMP_HTTP_CLIENT_IP,
    TMP_AWS_DYNAMODB_TABLE_NAMES,
    TMP_AWS_DYNAMODB_CONSUMED_CAPACITY,
    TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS,
    TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY,
    TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY,
    TMP_AWS_DYNAMODB_CONSISTENT_READ,
    TMP_AWS_DYNAMODB_PROJECTION,
    TMP_AWS_DYNAMODB_LIMIT,
    TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET,
    TMP_AWS_DYNAMODB_INDEX_NAME,
    TMP_AWS_DYNAMODB_SELECT,
    TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES,
    TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES,
    TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE,
    TMP_AWS_DYNAMODB_TABLE_COUNT,
    TMP_AWS_DYNAMODB_SCAN_FORWARD,
    TMP_AWS_DYNAMODB_SEGMENT,
    TMP_AWS_DYNAMODB_TOTAL_SEGMENTS,
    TMP_AWS_DYNAMODB_COUNT,
    TMP_AWS_DYNAMODB_SCANNED_COUNT,
    TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS,
    TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES,
    TMP_MESSAGING_SYSTEM,
    TMP_MESSAGING_DESTINATION,
    TMP_MESSAGING_DESTINATION_KIND,
    TMP_MESSAGING_TEMP_DESTINATION,
    TMP_MESSAGING_PROTOCOL,
    TMP_MESSAGING_PROTOCOL_VERSION,
    TMP_MESSAGING_URL,
    TMP_MESSAGING_MESSAGE_ID,
    TMP_MESSAGING_CONVERSATION_ID,
    TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES,
    TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES,
    TMP_MESSAGING_OPERATION,
    TMP_MESSAGING_CONSUMER_ID,
    TMP_MESSAGING_RABBITMQ_ROUTING_KEY,
    TMP_MESSAGING_KAFKA_MESSAGE_KEY,
    TMP_MESSAGING_KAFKA_CONSUMER_GROUP,
    TMP_MESSAGING_KAFKA_CLIENT_ID,
    TMP_MESSAGING_KAFKA_PARTITION,
    TMP_MESSAGING_KAFKA_TOMBSTONE,
    TMP_RPC_SYSTEM,
    TMP_RPC_SERVICE,
    TMP_RPC_METHOD,
    TMP_RPC_GRPC_STATUS_CODE,
    TMP_RPC_JSONRPC_VERSION,
    TMP_RPC_JSONRPC_REQUEST_ID,
    TMP_RPC_JSONRPC_ERROR_CODE,
    TMP_RPC_JSONRPC_ERROR_MESSAGE,
    TMP_MESSAGE_TYPE,
    TMP_MESSAGE_ID,
    TMP_MESSAGE_COMPRESSED_SIZE,
    TMP_MESSAGE_UNCOMPRESSED_SIZE
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for DbSystemValues enum definition
 *
 * An identifier for the database management system (DBMS) product being used. See below for a list of well-known identifiers.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_DBSYSTEMVALUES_OTHER_SQL = 'other_sql';
const TMP_DBSYSTEMVALUES_MSSQL = 'mssql';
const TMP_DBSYSTEMVALUES_MYSQL = 'mysql';
const TMP_DBSYSTEMVALUES_ORACLE = 'oracle';
const TMP_DBSYSTEMVALUES_DB2 = 'db2';
const TMP_DBSYSTEMVALUES_POSTGRESQL = 'postgresql';
const TMP_DBSYSTEMVALUES_REDSHIFT = 'redshift';
const TMP_DBSYSTEMVALUES_HIVE = 'hive';
const TMP_DBSYSTEMVALUES_CLOUDSCAPE = 'cloudscape';
const TMP_DBSYSTEMVALUES_HSQLDB = 'hsqldb';
const TMP_DBSYSTEMVALUES_PROGRESS = 'progress';
const TMP_DBSYSTEMVALUES_MAXDB = 'maxdb';
const TMP_DBSYSTEMVALUES_HANADB = 'hanadb';
const TMP_DBSYSTEMVALUES_INGRES = 'ingres';
const TMP_DBSYSTEMVALUES_FIRSTSQL = 'firstsql';
const TMP_DBSYSTEMVALUES_EDB = 'edb';
const TMP_DBSYSTEMVALUES_CACHE = 'cache';
const TMP_DBSYSTEMVALUES_ADABAS = 'adabas';
const TMP_DBSYSTEMVALUES_FIREBIRD = 'firebird';
const TMP_DBSYSTEMVALUES_DERBY = 'derby';
const TMP_DBSYSTEMVALUES_FILEMAKER = 'filemaker';
const TMP_DBSYSTEMVALUES_INFORMIX = 'informix';
const TMP_DBSYSTEMVALUES_INSTANTDB = 'instantdb';
const TMP_DBSYSTEMVALUES_INTERBASE = 'interbase';
const TMP_DBSYSTEMVALUES_MARIADB = 'mariadb';
const TMP_DBSYSTEMVALUES_NETEZZA = 'netezza';
const TMP_DBSYSTEMVALUES_PERVASIVE = 'pervasive';
const TMP_DBSYSTEMVALUES_POINTBASE = 'pointbase';
const TMP_DBSYSTEMVALUES_SQLITE = 'sqlite';
const TMP_DBSYSTEMVALUES_SYBASE = 'sybase';
const TMP_DBSYSTEMVALUES_TERADATA = 'teradata';
const TMP_DBSYSTEMVALUES_VERTICA = 'vertica';
const TMP_DBSYSTEMVALUES_H2 = 'h2';
const TMP_DBSYSTEMVALUES_COLDFUSION = 'coldfusion';
const TMP_DBSYSTEMVALUES_CASSANDRA = 'cassandra';
const TMP_DBSYSTEMVALUES_HBASE = 'hbase';
const TMP_DBSYSTEMVALUES_MONGODB = 'mongodb';
const TMP_DBSYSTEMVALUES_REDIS = 'redis';
const TMP_DBSYSTEMVALUES_COUCHBASE = 'couchbase';
const TMP_DBSYSTEMVALUES_COUCHDB = 'couchdb';
const TMP_DBSYSTEMVALUES_COSMOSDB = 'cosmosdb';
const TMP_DBSYSTEMVALUES_DYNAMODB = 'dynamodb';
const TMP_DBSYSTEMVALUES_NEO4J = 'neo4j';
const TMP_DBSYSTEMVALUES_GEODE = 'geode';
const TMP_DBSYSTEMVALUES_ELASTICSEARCH = 'elasticsearch';
const TMP_DBSYSTEMVALUES_MEMCACHED = 'memcached';
const TMP_DBSYSTEMVALUES_COCKROACHDB = 'cockroachdb';
const DBSYSTEMVALUES_OTHER_SQL = TMP_DBSYSTEMVALUES_OTHER_SQL;
const DBSYSTEMVALUES_MSSQL = TMP_DBSYSTEMVALUES_MSSQL;
const DBSYSTEMVALUES_MYSQL = TMP_DBSYSTEMVALUES_MYSQL;
const DBSYSTEMVALUES_ORACLE = TMP_DBSYSTEMVALUES_ORACLE;
const DBSYSTEMVALUES_DB2 = TMP_DBSYSTEMVALUES_DB2;
const DBSYSTEMVALUES_POSTGRESQL = TMP_DBSYSTEMVALUES_POSTGRESQL;
const DBSYSTEMVALUES_REDSHIFT = TMP_DBSYSTEMVALUES_REDSHIFT;
const DBSYSTEMVALUES_HIVE = TMP_DBSYSTEMVALUES_HIVE;
const DBSYSTEMVALUES_CLOUDSCAPE = TMP_DBSYSTEMVALUES_CLOUDSCAPE;
const DBSYSTEMVALUES_HSQLDB = TMP_DBSYSTEMVALUES_HSQLDB;
const DBSYSTEMVALUES_PROGRESS = TMP_DBSYSTEMVALUES_PROGRESS;
const DBSYSTEMVALUES_MAXDB = TMP_DBSYSTEMVALUES_MAXDB;
const DBSYSTEMVALUES_HANADB = TMP_DBSYSTEMVALUES_HANADB;
const DBSYSTEMVALUES_INGRES = TMP_DBSYSTEMVALUES_INGRES;
const DBSYSTEMVALUES_FIRSTSQL = TMP_DBSYSTEMVALUES_FIRSTSQL;
const DBSYSTEMVALUES_EDB = TMP_DBSYSTEMVALUES_EDB;
const DBSYSTEMVALUES_CACHE = TMP_DBSYSTEMVALUES_CACHE;
const DBSYSTEMVALUES_ADABAS = TMP_DBSYSTEMVALUES_ADABAS;
const DBSYSTEMVALUES_FIREBIRD = TMP_DBSYSTEMVALUES_FIREBIRD;
const DBSYSTEMVALUES_DERBY = TMP_DBSYSTEMVALUES_DERBY;
const DBSYSTEMVALUES_FILEMAKER = TMP_DBSYSTEMVALUES_FILEMAKER;
const DBSYSTEMVALUES_INFORMIX = TMP_DBSYSTEMVALUES_INFORMIX;
const DBSYSTEMVALUES_INSTANTDB = TMP_DBSYSTEMVALUES_INSTANTDB;
const DBSYSTEMVALUES_INTERBASE = TMP_DBSYSTEMVALUES_INTERBASE;
const DBSYSTEMVALUES_MARIADB = TMP_DBSYSTEMVALUES_MARIADB;
const DBSYSTEMVALUES_NETEZZA = TMP_DBSYSTEMVALUES_NETEZZA;
const DBSYSTEMVALUES_PERVASIVE = TMP_DBSYSTEMVALUES_PERVASIVE;
const DBSYSTEMVALUES_POINTBASE = TMP_DBSYSTEMVALUES_POINTBASE;
const DBSYSTEMVALUES_SQLITE = TMP_DBSYSTEMVALUES_SQLITE;
const DBSYSTEMVALUES_SYBASE = TMP_DBSYSTEMVALUES_SYBASE;
const DBSYSTEMVALUES_TERADATA = TMP_DBSYSTEMVALUES_TERADATA;
const DBSYSTEMVALUES_VERTICA = TMP_DBSYSTEMVALUES_VERTICA;
const DBSYSTEMVALUES_H2 = TMP_DBSYSTEMVALUES_H2;
const DBSYSTEMVALUES_COLDFUSION = TMP_DBSYSTEMVALUES_COLDFUSION;
const DBSYSTEMVALUES_CASSANDRA = TMP_DBSYSTEMVALUES_CASSANDRA;
const DBSYSTEMVALUES_HBASE = TMP_DBSYSTEMVALUES_HBASE;
const DBSYSTEMVALUES_MONGODB = TMP_DBSYSTEMVALUES_MONGODB;
const DBSYSTEMVALUES_REDIS = TMP_DBSYSTEMVALUES_REDIS;
const DBSYSTEMVALUES_COUCHBASE = TMP_DBSYSTEMVALUES_COUCHBASE;
const DBSYSTEMVALUES_COUCHDB = TMP_DBSYSTEMVALUES_COUCHDB;
const DBSYSTEMVALUES_COSMOSDB = TMP_DBSYSTEMVALUES_COSMOSDB;
const DBSYSTEMVALUES_DYNAMODB = TMP_DBSYSTEMVALUES_DYNAMODB;
const DBSYSTEMVALUES_NEO4J = TMP_DBSYSTEMVALUES_NEO4J;
const DBSYSTEMVALUES_GEODE = TMP_DBSYSTEMVALUES_GEODE;
const DBSYSTEMVALUES_ELASTICSEARCH = TMP_DBSYSTEMVALUES_ELASTICSEARCH;
const DBSYSTEMVALUES_MEMCACHED = TMP_DBSYSTEMVALUES_MEMCACHED;
const DBSYSTEMVALUES_COCKROACHDB = TMP_DBSYSTEMVALUES_COCKROACHDB;
const DbSystemValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_DBSYSTEMVALUES_OTHER_SQL,
    TMP_DBSYSTEMVALUES_MSSQL,
    TMP_DBSYSTEMVALUES_MYSQL,
    TMP_DBSYSTEMVALUES_ORACLE,
    TMP_DBSYSTEMVALUES_DB2,
    TMP_DBSYSTEMVALUES_POSTGRESQL,
    TMP_DBSYSTEMVALUES_REDSHIFT,
    TMP_DBSYSTEMVALUES_HIVE,
    TMP_DBSYSTEMVALUES_CLOUDSCAPE,
    TMP_DBSYSTEMVALUES_HSQLDB,
    TMP_DBSYSTEMVALUES_PROGRESS,
    TMP_DBSYSTEMVALUES_MAXDB,
    TMP_DBSYSTEMVALUES_HANADB,
    TMP_DBSYSTEMVALUES_INGRES,
    TMP_DBSYSTEMVALUES_FIRSTSQL,
    TMP_DBSYSTEMVALUES_EDB,
    TMP_DBSYSTEMVALUES_CACHE,
    TMP_DBSYSTEMVALUES_ADABAS,
    TMP_DBSYSTEMVALUES_FIREBIRD,
    TMP_DBSYSTEMVALUES_DERBY,
    TMP_DBSYSTEMVALUES_FILEMAKER,
    TMP_DBSYSTEMVALUES_INFORMIX,
    TMP_DBSYSTEMVALUES_INSTANTDB,
    TMP_DBSYSTEMVALUES_INTERBASE,
    TMP_DBSYSTEMVALUES_MARIADB,
    TMP_DBSYSTEMVALUES_NETEZZA,
    TMP_DBSYSTEMVALUES_PERVASIVE,
    TMP_DBSYSTEMVALUES_POINTBASE,
    TMP_DBSYSTEMVALUES_SQLITE,
    TMP_DBSYSTEMVALUES_SYBASE,
    TMP_DBSYSTEMVALUES_TERADATA,
    TMP_DBSYSTEMVALUES_VERTICA,
    TMP_DBSYSTEMVALUES_H2,
    TMP_DBSYSTEMVALUES_COLDFUSION,
    TMP_DBSYSTEMVALUES_CASSANDRA,
    TMP_DBSYSTEMVALUES_HBASE,
    TMP_DBSYSTEMVALUES_MONGODB,
    TMP_DBSYSTEMVALUES_REDIS,
    TMP_DBSYSTEMVALUES_COUCHBASE,
    TMP_DBSYSTEMVALUES_COUCHDB,
    TMP_DBSYSTEMVALUES_COSMOSDB,
    TMP_DBSYSTEMVALUES_DYNAMODB,
    TMP_DBSYSTEMVALUES_NEO4J,
    TMP_DBSYSTEMVALUES_GEODE,
    TMP_DBSYSTEMVALUES_ELASTICSEARCH,
    TMP_DBSYSTEMVALUES_MEMCACHED,
    TMP_DBSYSTEMVALUES_COCKROACHDB
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for DbCassandraConsistencyLevelValues enum definition
 *
 * The consistency level of the query. Based on consistency values from [CQL](https://docs.datastax.com/en/cassandra-oss/3.0/cassandra/dml/dmlConfigConsistency.html).
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL = 'all';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = 'each_quorum';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = 'quorum';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = 'local_quorum';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE = 'one';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO = 'two';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE = 'three';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = 'local_one';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY = 'any';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = 'serial';
const TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = 'local_serial';
const DBCASSANDRACONSISTENCYLEVELVALUES_ALL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL;
const DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM;
const DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM;
const DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM;
const DBCASSANDRACONSISTENCYLEVELVALUES_ONE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE;
const DBCASSANDRACONSISTENCYLEVELVALUES_TWO = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO;
const DBCASSANDRACONSISTENCYLEVELVALUES_THREE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE;
const DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE;
const DBCASSANDRACONSISTENCYLEVELVALUES_ANY = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY;
const DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL;
const DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL;
const DbCassandraConsistencyLevelValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL,
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for FaasTriggerValues enum definition
 *
 * Type of the trigger on which the function is executed.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_FAASTRIGGERVALUES_DATASOURCE = 'datasource';
const TMP_FAASTRIGGERVALUES_HTTP = 'http';
const TMP_FAASTRIGGERVALUES_PUBSUB = 'pubsub';
const TMP_FAASTRIGGERVALUES_TIMER = 'timer';
const TMP_FAASTRIGGERVALUES_OTHER = 'other';
const FAASTRIGGERVALUES_DATASOURCE = TMP_FAASTRIGGERVALUES_DATASOURCE;
const FAASTRIGGERVALUES_HTTP = TMP_FAASTRIGGERVALUES_HTTP;
const FAASTRIGGERVALUES_PUBSUB = TMP_FAASTRIGGERVALUES_PUBSUB;
const FAASTRIGGERVALUES_TIMER = TMP_FAASTRIGGERVALUES_TIMER;
const FAASTRIGGERVALUES_OTHER = TMP_FAASTRIGGERVALUES_OTHER;
const FaasTriggerValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_FAASTRIGGERVALUES_DATASOURCE,
    TMP_FAASTRIGGERVALUES_HTTP,
    TMP_FAASTRIGGERVALUES_PUBSUB,
    TMP_FAASTRIGGERVALUES_TIMER,
    TMP_FAASTRIGGERVALUES_OTHER
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for FaasDocumentOperationValues enum definition
 *
 * Describes the type of the operation that was performed on the data.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_FAASDOCUMENTOPERATIONVALUES_INSERT = 'insert';
const TMP_FAASDOCUMENTOPERATIONVALUES_EDIT = 'edit';
const TMP_FAASDOCUMENTOPERATIONVALUES_DELETE = 'delete';
const FAASDOCUMENTOPERATIONVALUES_INSERT = TMP_FAASDOCUMENTOPERATIONVALUES_INSERT;
const FAASDOCUMENTOPERATIONVALUES_EDIT = TMP_FAASDOCUMENTOPERATIONVALUES_EDIT;
const FAASDOCUMENTOPERATIONVALUES_DELETE = TMP_FAASDOCUMENTOPERATIONVALUES_DELETE;
const FaasDocumentOperationValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_FAASDOCUMENTOPERATIONVALUES_INSERT,
    TMP_FAASDOCUMENTOPERATIONVALUES_EDIT,
    TMP_FAASDOCUMENTOPERATIONVALUES_DELETE
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for FaasInvokedProviderValues enum definition
 *
 * The cloud provider of the invoked function.
 *
 * Note: SHOULD be equal to the `cloud.provider` resource attribute of the invoked function.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = 'alibaba_cloud';
const TMP_FAASINVOKEDPROVIDERVALUES_AWS = 'aws';
const TMP_FAASINVOKEDPROVIDERVALUES_AZURE = 'azure';
const TMP_FAASINVOKEDPROVIDERVALUES_GCP = 'gcp';
const FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD;
const FAASINVOKEDPROVIDERVALUES_AWS = TMP_FAASINVOKEDPROVIDERVALUES_AWS;
const FAASINVOKEDPROVIDERVALUES_AZURE = TMP_FAASINVOKEDPROVIDERVALUES_AZURE;
const FAASINVOKEDPROVIDERVALUES_GCP = TMP_FAASINVOKEDPROVIDERVALUES_GCP;
const FaasInvokedProviderValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD,
    TMP_FAASINVOKEDPROVIDERVALUES_AWS,
    TMP_FAASINVOKEDPROVIDERVALUES_AZURE,
    TMP_FAASINVOKEDPROVIDERVALUES_GCP
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for NetTransportValues enum definition
 *
 * Transport protocol used. See note below.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_NETTRANSPORTVALUES_IP_TCP = 'ip_tcp';
const TMP_NETTRANSPORTVALUES_IP_UDP = 'ip_udp';
const TMP_NETTRANSPORTVALUES_IP = 'ip';
const TMP_NETTRANSPORTVALUES_UNIX = 'unix';
const TMP_NETTRANSPORTVALUES_PIPE = 'pipe';
const TMP_NETTRANSPORTVALUES_INPROC = 'inproc';
const TMP_NETTRANSPORTVALUES_OTHER = 'other';
const NETTRANSPORTVALUES_IP_TCP = TMP_NETTRANSPORTVALUES_IP_TCP;
const NETTRANSPORTVALUES_IP_UDP = TMP_NETTRANSPORTVALUES_IP_UDP;
const NETTRANSPORTVALUES_IP = TMP_NETTRANSPORTVALUES_IP;
const NETTRANSPORTVALUES_UNIX = TMP_NETTRANSPORTVALUES_UNIX;
const NETTRANSPORTVALUES_PIPE = TMP_NETTRANSPORTVALUES_PIPE;
const NETTRANSPORTVALUES_INPROC = TMP_NETTRANSPORTVALUES_INPROC;
const NETTRANSPORTVALUES_OTHER = TMP_NETTRANSPORTVALUES_OTHER;
const NetTransportValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_NETTRANSPORTVALUES_IP_TCP,
    TMP_NETTRANSPORTVALUES_IP_UDP,
    TMP_NETTRANSPORTVALUES_IP,
    TMP_NETTRANSPORTVALUES_UNIX,
    TMP_NETTRANSPORTVALUES_PIPE,
    TMP_NETTRANSPORTVALUES_INPROC,
    TMP_NETTRANSPORTVALUES_OTHER
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for NetHostConnectionTypeValues enum definition
 *
 * The internet connection type currently being used by the host.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI = 'wifi';
const TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED = 'wired';
const TMP_NETHOSTCONNECTIONTYPEVALUES_CELL = 'cell';
const TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = 'unavailable';
const TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = 'unknown';
const NETHOSTCONNECTIONTYPEVALUES_WIFI = TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI;
const NETHOSTCONNECTIONTYPEVALUES_WIRED = TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED;
const NETHOSTCONNECTIONTYPEVALUES_CELL = TMP_NETHOSTCONNECTIONTYPEVALUES_CELL;
const NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE;
const NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN;
const NetHostConnectionTypeValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI,
    TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED,
    TMP_NETHOSTCONNECTIONTYPEVALUES_CELL,
    TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE,
    TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for NetHostConnectionSubtypeValues enum definition
 *
 * This describes more details regarding the connection.type. It may be the type of cell technology connection, but it could be used for describing details about a wifi connection.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = 'gprs';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = 'edge';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = 'umts';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = 'cdma';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = 'evdo_0';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = 'evdo_a';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = 'cdma2000_1xrtt';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = 'hsdpa';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = 'hsupa';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = 'hspa';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = 'iden';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = 'evdo_b';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE = 'lte';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = 'ehrpd';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = 'hspap';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM = 'gsm';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = 'td_scdma';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = 'iwlan';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR = 'nr';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = 'nrnsa';
const TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = 'lte_ca';
const NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS;
const NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE;
const NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS;
const NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA;
const NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0;
const NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A;
const NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT;
const NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA;
const NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA;
const NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA;
const NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN;
const NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B;
const NETHOSTCONNECTIONSUBTYPEVALUES_LTE = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE;
const NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD;
const NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP;
const NETHOSTCONNECTIONSUBTYPEVALUES_GSM = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM;
const NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA;
const NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN;
const NETHOSTCONNECTIONSUBTYPEVALUES_NR = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR;
const NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA;
const NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA;
const NetHostConnectionSubtypeValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA,
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for HttpFlavorValues enum definition
 *
 * Kind of HTTP protocol used.
 *
 * Note: If `net.transport` is not specified, it can be assumed to be `IP.TCP` except if `http.flavor` is `QUIC`, in which case `IP.UDP` is assumed.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_HTTPFLAVORVALUES_HTTP_1_0 = '1.0';
const TMP_HTTPFLAVORVALUES_HTTP_1_1 = '1.1';
const TMP_HTTPFLAVORVALUES_HTTP_2_0 = '2.0';
const TMP_HTTPFLAVORVALUES_SPDY = 'SPDY';
const TMP_HTTPFLAVORVALUES_QUIC = 'QUIC';
const HTTPFLAVORVALUES_HTTP_1_0 = TMP_HTTPFLAVORVALUES_HTTP_1_0;
const HTTPFLAVORVALUES_HTTP_1_1 = TMP_HTTPFLAVORVALUES_HTTP_1_1;
const HTTPFLAVORVALUES_HTTP_2_0 = TMP_HTTPFLAVORVALUES_HTTP_2_0;
const HTTPFLAVORVALUES_SPDY = TMP_HTTPFLAVORVALUES_SPDY;
const HTTPFLAVORVALUES_QUIC = TMP_HTTPFLAVORVALUES_QUIC;
const HttpFlavorValues = {
    HTTP_1_0: TMP_HTTPFLAVORVALUES_HTTP_1_0,
    HTTP_1_1: TMP_HTTPFLAVORVALUES_HTTP_1_1,
    HTTP_2_0: TMP_HTTPFLAVORVALUES_HTTP_2_0,
    SPDY: TMP_HTTPFLAVORVALUES_SPDY,
    QUIC: TMP_HTTPFLAVORVALUES_QUIC
};
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for MessagingDestinationKindValues enum definition
 *
 * The kind of message destination.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE = 'queue';
const TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC = 'topic';
const MESSAGINGDESTINATIONKINDVALUES_QUEUE = TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE;
const MESSAGINGDESTINATIONKINDVALUES_TOPIC = TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC;
const MessagingDestinationKindValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE,
    TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for MessagingOperationValues enum definition
 *
 * A string identifying the kind of message consumption as defined in the [Operation names](#operation-names) section above. If the operation is &#34;send&#34;, this attribute MUST NOT be set, since the operation can be inferred from the span kind in that case.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_MESSAGINGOPERATIONVALUES_RECEIVE = 'receive';
const TMP_MESSAGINGOPERATIONVALUES_PROCESS = 'process';
const MESSAGINGOPERATIONVALUES_RECEIVE = TMP_MESSAGINGOPERATIONVALUES_RECEIVE;
const MESSAGINGOPERATIONVALUES_PROCESS = TMP_MESSAGINGOPERATIONVALUES_PROCESS;
const MessagingOperationValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_MESSAGINGOPERATIONVALUES_RECEIVE,
    TMP_MESSAGINGOPERATIONVALUES_PROCESS
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for RpcGrpcStatusCodeValues enum definition
 *
 * The [numeric status code](https://github.com/grpc/grpc/blob/v1.33.2/doc/statuscodes.md) of the gRPC request.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_RPCGRPCSTATUSCODEVALUES_OK = 0;
const TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED = 1;
const TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN = 2;
const TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = 3;
const TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = 4;
const TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND = 5;
const TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = 6;
const TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = 7;
const TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = 8;
const TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = 9;
const TMP_RPCGRPCSTATUSCODEVALUES_ABORTED = 10;
const TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = 11;
const TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = 12;
const TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL = 13;
const TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = 14;
const TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS = 15;
const TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = 16;
const RPCGRPCSTATUSCODEVALUES_OK = TMP_RPCGRPCSTATUSCODEVALUES_OK;
const RPCGRPCSTATUSCODEVALUES_CANCELLED = TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED;
const RPCGRPCSTATUSCODEVALUES_UNKNOWN = TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN;
const RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT;
const RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED;
const RPCGRPCSTATUSCODEVALUES_NOT_FOUND = TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND;
const RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS;
const RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED;
const RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED;
const RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION;
const RPCGRPCSTATUSCODEVALUES_ABORTED = TMP_RPCGRPCSTATUSCODEVALUES_ABORTED;
const RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE;
const RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED;
const RPCGRPCSTATUSCODEVALUES_INTERNAL = TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL;
const RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE;
const RPCGRPCSTATUSCODEVALUES_DATA_LOSS = TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS;
const RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED;
const RpcGrpcStatusCodeValues = {
    OK: TMP_RPCGRPCSTATUSCODEVALUES_OK,
    CANCELLED: TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED,
    UNKNOWN: TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN,
    INVALID_ARGUMENT: TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT,
    DEADLINE_EXCEEDED: TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED,
    NOT_FOUND: TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND,
    ALREADY_EXISTS: TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS,
    PERMISSION_DENIED: TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED,
    RESOURCE_EXHAUSTED: TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED,
    FAILED_PRECONDITION: TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION,
    ABORTED: TMP_RPCGRPCSTATUSCODEVALUES_ABORTED,
    OUT_OF_RANGE: TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE,
    UNIMPLEMENTED: TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED,
    INTERNAL: TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL,
    UNAVAILABLE: TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE,
    DATA_LOSS: TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS,
    UNAUTHENTICATED: TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED
};
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for MessageTypeValues enum definition
 *
 * Whether this is a received or sent message.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifiable export names for some package types
const TMP_MESSAGETYPEVALUES_SENT = 'SENT';
const TMP_MESSAGETYPEVALUES_RECEIVED = 'RECEIVED';
const MESSAGETYPEVALUES_SENT = TMP_MESSAGETYPEVALUES_SENT;
const MESSAGETYPEVALUES_RECEIVED = TMP_MESSAGETYPEVALUES_RECEIVED;
const MessageTypeValues = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$internal$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createConstMap"])([
    TMP_MESSAGETYPEVALUES_SENT,
    TMP_MESSAGETYPEVALUES_RECEIVED
]); //# sourceMappingURL=SemanticAttributes.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/internal/validators.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateKey",
    ()=>validateKey,
    "validateValue",
    ()=>validateValue
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const VALID_KEY_CHAR_RANGE = '[_0-9a-z-*/]';
const VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
const VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
const VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
const VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
const INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
function validateKey(key) {
    return VALID_KEY_REGEX.test(key);
}
function validateValue(value) {
    return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
} //# sourceMappingURL=validators.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/trace/TraceState.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TraceState",
    ()=>TraceState
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$validators$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/internal/validators.js [instrumentation-edge] (ecmascript)");
;
const MAX_TRACE_STATE_ITEMS = 32;
const MAX_TRACE_STATE_LEN = 512;
const LIST_MEMBERS_SEPARATOR = ',';
const LIST_MEMBER_KEY_VALUE_SPLITTER = '=';
class TraceState {
    _internalState = new Map();
    constructor(rawTraceState){
        if (rawTraceState) this._parse(rawTraceState);
    }
    set(key, value) {
        // TODO: Benchmark the different approaches(map vs list) and
        // use the faster one.
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
            traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
    }
    unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
    }
    get(key) {
        return this._internalState.get(key);
    }
    serialize() {
        return this._keys().reduce((agg, key)=>{
            agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
            return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
    }
    _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN) return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse() // Store in reverse so new keys (.set(...)) will be placed at the beginning
        .reduce((agg, part)=>{
            const listMember = part.trim(); // Optional Whitespace (OWS) handling
            const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
            if (i !== -1) {
                const key = listMember.slice(0, i);
                const value = listMember.slice(i + 1, part.length);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$validators$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["validateKey"])(key) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$validators$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["validateValue"])(value)) {
                    agg.set(key, value);
                } else {
                // TODO: Consider to add warning log
                }
            }
            return agg;
        }, new Map());
        // Because of the reverse() requirement, trunc must be done after map is created
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
            this._internalState = new Map(Array.from(this._internalState.entries()).reverse() // Use reverse same as original tracestate parse chain
            .slice(0, MAX_TRACE_STATE_ITEMS));
        }
    }
    _keys() {
        return Array.from(this._internalState.keys()).reverse();
    }
    _clone() {
        const traceState = new TraceState();
        traceState._internalState = new Map(this._internalState);
        return traceState;
    }
} //# sourceMappingURL=TraceState.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isTracingSuppressed",
    ()=>isTracingSuppressed,
    "suppressTracing",
    ()=>suppressTracing,
    "unsuppressTracing",
    ()=>unsuppressTracing
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/context/context.js [instrumentation-edge] (ecmascript)");
;
const SUPPRESS_TRACING_KEY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createContextKey"])('OpenTelemetry SDK Context Key SUPPRESS_TRACING');
function suppressTracing(context) {
    return context.setValue(SUPPRESS_TRACING_KEY, true);
}
function unsuppressTracing(context) {
    return context.deleteValue(SUPPRESS_TRACING_KEY);
}
function isTracingSuppressed(context) {
    return context.getValue(SUPPRESS_TRACING_KEY) === true;
} //# sourceMappingURL=suppress-tracing.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/baggage/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "BAGGAGE_HEADER",
    ()=>BAGGAGE_HEADER,
    "BAGGAGE_ITEMS_SEPARATOR",
    ()=>BAGGAGE_ITEMS_SEPARATOR,
    "BAGGAGE_KEY_PAIR_SEPARATOR",
    ()=>BAGGAGE_KEY_PAIR_SEPARATOR,
    "BAGGAGE_MAX_NAME_VALUE_PAIRS",
    ()=>BAGGAGE_MAX_NAME_VALUE_PAIRS,
    "BAGGAGE_MAX_PER_NAME_VALUE_PAIRS",
    ()=>BAGGAGE_MAX_PER_NAME_VALUE_PAIRS,
    "BAGGAGE_MAX_TOTAL_LENGTH",
    ()=>BAGGAGE_MAX_TOTAL_LENGTH,
    "BAGGAGE_PROPERTIES_SEPARATOR",
    ()=>BAGGAGE_PROPERTIES_SEPARATOR
]);
const BAGGAGE_KEY_PAIR_SEPARATOR = '=';
const BAGGAGE_PROPERTIES_SEPARATOR = ';';
const BAGGAGE_ITEMS_SEPARATOR = ',';
const BAGGAGE_HEADER = 'baggage';
const BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
const BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
const BAGGAGE_MAX_TOTAL_LENGTH = 8192; //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/baggage/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getKeyPairs",
    ()=>getKeyPairs,
    "parseKeyPairsIntoRecord",
    ()=>parseKeyPairsIntoRecord,
    "parsePairKeyValue",
    ()=>parsePairKeyValue,
    "serializeKeyPairs",
    ()=>serializeKeyPairs
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/baggage/utils.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/baggage/constants.js [instrumentation-edge] (ecmascript)");
;
;
function serializeKeyPairs(keyPairs) {
    return keyPairs.reduce((hValue, current)=>{
        const value = `${hValue}${hValue !== '' ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_ITEMS_SEPARATOR"] : ''}${current}`;
        return value.length > __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_MAX_TOTAL_LENGTH"] ? hValue : value;
    }, '');
}
function getKeyPairs(baggage) {
    return baggage.getAllEntries().map(([key, value])=>{
        let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
        // include opaque metadata if provided
        // NOTE: we intentionally don't URI-encode the metadata - that responsibility falls on the metadata implementation
        if (value.metadata !== undefined) {
            entry += __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_PROPERTIES_SEPARATOR"] + value.metadata.toString();
        }
        return entry;
    });
}
function parsePairKeyValue(entry) {
    if (!entry) return;
    const metadataSeparatorIndex = entry.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_PROPERTIES_SEPARATOR"]);
    const keyPairPart = metadataSeparatorIndex === -1 ? entry : entry.substring(0, metadataSeparatorIndex);
    const separatorIndex = keyPairPart.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_KEY_PAIR_SEPARATOR"]);
    if (separatorIndex <= 0) return;
    const rawKey = keyPairPart.substring(0, separatorIndex).trim();
    const rawValue = keyPairPart.substring(separatorIndex + 1).trim();
    if (!rawKey || !rawValue) return;
    let key;
    let value;
    try {
        key = decodeURIComponent(rawKey);
        value = decodeURIComponent(rawValue);
    } catch  {
        return;
    }
    let metadata;
    if (metadataSeparatorIndex !== -1 && metadataSeparatorIndex < entry.length - 1) {
        const metadataString = entry.substring(metadataSeparatorIndex + 1);
        metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["baggageEntryMetadataFromString"])(metadataString);
    }
    return {
        key,
        value,
        metadata
    };
}
function parseKeyPairsIntoRecord(value) {
    const result = {};
    if (typeof value === 'string' && value.length > 0) {
        value.split(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_ITEMS_SEPARATOR"]).forEach((entry)=>{
            const keyPair = parsePairKeyValue(entry);
            if (keyPair !== undefined && keyPair.value.length > 0) {
                result[keyPair.key] = keyPair.value;
            }
        });
    }
    return result;
} //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "W3CBaggagePropagator",
    ()=>W3CBaggagePropagator
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/propagation-api.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/baggage/constants.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/baggage/utils.js [instrumentation-edge] (ecmascript)");
;
;
;
;
class W3CBaggagePropagator {
    inject(context, carrier, setter) {
        const baggage = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["propagation"].getBaggage(context);
        if (!baggage || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isTracingSuppressed"])(context)) return;
        const keyPairs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getKeyPairs"])(baggage).filter((pair)=>{
            return pair.length <= __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_MAX_PER_NAME_VALUE_PAIRS"];
        }).slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_MAX_NAME_VALUE_PAIRS"]);
        const headerValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["serializeKeyPairs"])(keyPairs);
        if (headerValue.length > 0) {
            setter.set(carrier, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_HEADER"], headerValue);
        }
    }
    extract(context, carrier, getter) {
        const headerValue = getter.get(carrier, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_HEADER"]);
        const baggageString = Array.isArray(headerValue) ? headerValue.join(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_ITEMS_SEPARATOR"]) : headerValue;
        if (!baggageString) return context;
        const baggage = {};
        if (baggageString.length === 0) {
            return context;
        }
        const pairs = baggageString.split(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_ITEMS_SEPARATOR"]);
        pairs.forEach((entry)=>{
            const keyPair = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["parsePairKeyValue"])(entry);
            if (keyPair) {
                const baggageEntry = {
                    value: keyPair.value
                };
                if (keyPair.metadata) {
                    baggageEntry.metadata = keyPair.metadata;
                }
                baggage[keyPair.key] = baggageEntry;
            }
        });
        if (Object.entries(baggage).length === 0) {
            return context;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["propagation"].setBaggage(context, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["propagation"].createBaggage(baggage));
    }
    fields() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BAGGAGE_HEADER"]
        ];
    }
} //# sourceMappingURL=W3CBaggagePropagator.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/version.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // this is autogenerated file, see scripts/version-update.js
__turbopack_context__.s([
    "VERSION",
    ()=>VERSION
]);
const VERSION = '2.5.1'; //# sourceMappingURL=version.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/semconv.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * The name of the runtime of this process.
 *
 * @example OpenJDK Runtime Environment
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ __turbopack_context__.s([
    "ATTR_PROCESS_RUNTIME_NAME",
    ()=>ATTR_PROCESS_RUNTIME_NAME
]);
const ATTR_PROCESS_RUNTIME_NAME = 'process.runtime.name'; //# sourceMappingURL=semconv.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/platform/browser/sdk-info.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SDK_INFO",
    ()=>SDK_INFO
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/version.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$semconv$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/semconv.js [instrumentation-edge] (ecmascript)");
;
;
;
const SDK_INFO = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_NAME"]]: 'opentelemetry',
    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$semconv$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_PROCESS_RUNTIME_NAME"]]: 'browser',
    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_LANGUAGE"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_VERSION"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$version$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["VERSION"]
}; //# sourceMappingURL=sdk-info.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/sdk-trace-base/build/esm/Sampler.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A sampling decision that determines how a {@link Span} will be recorded
 * and collected.
 */ __turbopack_context__.s([
    "SamplingDecision",
    ()=>SamplingDecision
]);
var SamplingDecision;
(function(SamplingDecision) {
    /**
     * `Span.isRecording() === false`, span will not be recorded and all events
     * and attributes will be dropped.
     */ SamplingDecision[SamplingDecision["NOT_RECORD"] = 0] = "NOT_RECORD";
    /**
     * `Span.isRecording() === true`, but `Sampled` flag in {@link TraceFlags}
     * MUST NOT be set.
     */ SamplingDecision[SamplingDecision["RECORD"] = 1] = "RECORD";
    /**
     * `Span.isRecording() === true` AND `Sampled` flag in {@link TraceFlags}
     * MUST be set.
     */ SamplingDecision[SamplingDecision["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})(SamplingDecision || (SamplingDecision = {})); //# sourceMappingURL=Sampler.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/resources/build/esm/default-service-name.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_clearDefaultServiceNameCache",
    ()=>_clearDefaultServiceNameCache,
    "defaultServiceName",
    ()=>defaultServiceName
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let serviceName;
function defaultServiceName() {
    if (serviceName === undefined) {
        try {
            const argv0 = globalThis.process.argv0;
            serviceName = argv0 ? `unknown_service:${argv0}` : 'unknown_service';
        } catch  {
            serviceName = 'unknown_service';
        }
    }
    return serviceName;
}
function _clearDefaultServiceNameCache() {
    serviceName = undefined;
} //# sourceMappingURL=default-service-name.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/resources/build/esm/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "isPromiseLike",
    ()=>isPromiseLike
]);
const isPromiseLike = (val)=>{
    return val !== null && typeof val === 'object' && typeof val.then === 'function';
}; //# sourceMappingURL=utils.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/resources/build/esm/ResourceImpl.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultResource",
    ()=>defaultResource,
    "emptyResource",
    ()=>emptyResource,
    "resourceFromAttributes",
    ()=>resourceFromAttributes,
    "resourceFromDetectedResource",
    ()=>resourceFromDetectedResource
]);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/api/build/esm/diag-api.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$browser$2f$sdk$2d$info$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/core/build/esm/platform/browser/sdk-info.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$default$2d$service$2d$name$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/resources/build/esm/default-service-name.js [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@opentelemetry/resources/build/esm/utils.js [instrumentation-edge] (ecmascript)");
;
;
;
;
;
class ResourceImpl {
    _rawAttributes;
    _asyncAttributesPending = false;
    _schemaUrl;
    _memoizedAttributes;
    static FromAttributeList(attributes, options) {
        const res = new ResourceImpl({}, options);
        res._rawAttributes = guardedRawAttributes(attributes);
        res._asyncAttributesPending = attributes.filter(([_, val])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isPromiseLike"])(val)).length > 0;
        return res;
    }
    constructor(/**
     * A dictionary of attributes with string keys and values that provide
     * information about the entity as numbers, strings or booleans
     * TODO: Consider to add check/validation on attributes.
     */ resource, options){
        const attributes = resource.attributes ?? {};
        this._rawAttributes = Object.entries(attributes).map(([k, v])=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isPromiseLike"])(v)) {
                // side-effect
                this._asyncAttributesPending = true;
            }
            return [
                k,
                v
            ];
        });
        this._rawAttributes = guardedRawAttributes(this._rawAttributes);
        this._schemaUrl = validateSchemaUrl(options?.schemaUrl);
    }
    get asyncAttributesPending() {
        return this._asyncAttributesPending;
    }
    async waitForAsyncAttributes() {
        if (!this.asyncAttributesPending) {
            return;
        }
        for(let i = 0; i < this._rawAttributes.length; i++){
            const [k, v] = this._rawAttributes[i];
            this._rawAttributes[i] = [
                k,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isPromiseLike"])(v) ? await v : v
            ];
        }
        this._asyncAttributesPending = false;
    }
    get attributes() {
        if (this.asyncAttributesPending) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["diag"].error('Accessing resource attributes before async attributes settled');
        }
        if (this._memoizedAttributes) {
            return this._memoizedAttributes;
        }
        const attrs = {};
        for (const [k, v] of this._rawAttributes){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isPromiseLike"])(v)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["diag"].debug(`Unsettled resource attribute ${k} skipped`);
                continue;
            }
            if (v != null) {
                attrs[k] ??= v;
            }
        }
        // only memoize output if all attributes are settled
        if (!this._asyncAttributesPending) {
            this._memoizedAttributes = attrs;
        }
        return attrs;
    }
    getRawAttributes() {
        return this._rawAttributes;
    }
    get schemaUrl() {
        return this._schemaUrl;
    }
    merge(resource) {
        if (resource == null) return this;
        // Order is important
        // Spec states incoming attributes override existing attributes
        const mergedSchemaUrl = mergeSchemaUrl(this, resource);
        const mergedOptions = mergedSchemaUrl ? {
            schemaUrl: mergedSchemaUrl
        } : undefined;
        return ResourceImpl.FromAttributeList([
            ...resource.getRawAttributes(),
            ...this.getRawAttributes()
        ], mergedOptions);
    }
}
function resourceFromAttributes(attributes, options) {
    return ResourceImpl.FromAttributeList(Object.entries(attributes), options);
}
function resourceFromDetectedResource(detectedResource, options) {
    return new ResourceImpl(detectedResource, options);
}
function emptyResource() {
    return resourceFromAttributes({});
}
function defaultResource() {
    return resourceFromAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_SERVICE_NAME"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$default$2d$service$2d$name$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["defaultServiceName"])(),
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_LANGUAGE"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$browser$2f$sdk$2d$info$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SDK_INFO"][__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_LANGUAGE"]],
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_NAME"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$browser$2f$sdk$2d$info$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SDK_INFO"][__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_NAME"]],
        [__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_VERSION"]]: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$browser$2f$sdk$2d$info$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SDK_INFO"][__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_VERSION"]]
    });
}
function guardedRawAttributes(attributes) {
    return attributes.map(([k, v])=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["isPromiseLike"])(v)) {
            return [
                k,
                v.catch((err)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["diag"].debug('promise rejection for resource attribute: %s - %s', k, err);
                    return undefined;
                })
            ];
        }
        return [
            k,
            v
        ];
    });
}
function validateSchemaUrl(schemaUrl) {
    if (typeof schemaUrl === 'string' || schemaUrl === undefined) {
        return schemaUrl;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["diag"].warn('Schema URL must be string or undefined, got %s. Schema URL will be ignored.', schemaUrl);
    return undefined;
}
function mergeSchemaUrl(old, updating) {
    const oldSchemaUrl = old?.schemaUrl;
    const updatingSchemaUrl = updating?.schemaUrl;
    const isOldEmpty = oldSchemaUrl === undefined || oldSchemaUrl === '';
    const isUpdatingEmpty = updatingSchemaUrl === undefined || updatingSchemaUrl === '';
    if (isOldEmpty) {
        return updatingSchemaUrl;
    }
    if (isUpdatingEmpty) {
        return oldSchemaUrl;
    }
    if (oldSchemaUrl === updatingSchemaUrl) {
        return oldSchemaUrl;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["diag"].warn('Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.', oldSchemaUrl, updatingSchemaUrl);
    return undefined;
} //# sourceMappingURL=ResourceImpl.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/modern-browserslist-target.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Note: This file is JS because it's used by the taskfile-swc.js file, which is JS.
// Keep file changes in sync with the corresponding `.d.ts` files.
/**
 * These are the minimum browser versions that we consider "modern" and thus compile for by default.
 * This list was generated using `pnpm browserslist "baseline widely available"` on 2025-10-01.
 */ const MODERN_BROWSERSLIST_TARGET = [
    'chrome 111',
    'edge 111',
    'firefox 111',
    'safari 16.4'
];
module.exports = MODERN_BROWSERSLIST_TARGET; //# sourceMappingURL=modern-browserslist-target.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/entry-constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    UNDERSCORE_GLOBAL_ERROR_ROUTE: null,
    UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY: null,
    UNDERSCORE_NOT_FOUND_ROUTE: null,
    UNDERSCORE_NOT_FOUND_ROUTE_ENTRY: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UNDERSCORE_GLOBAL_ERROR_ROUTE: function() {
        return UNDERSCORE_GLOBAL_ERROR_ROUTE;
    },
    UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY: function() {
        return UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY;
    },
    UNDERSCORE_NOT_FOUND_ROUTE: function() {
        return UNDERSCORE_NOT_FOUND_ROUTE;
    },
    UNDERSCORE_NOT_FOUND_ROUTE_ENTRY: function() {
        return UNDERSCORE_NOT_FOUND_ROUTE_ENTRY;
    }
});
const UNDERSCORE_NOT_FOUND_ROUTE = '/_not-found';
const UNDERSCORE_NOT_FOUND_ROUTE_ENTRY = `${UNDERSCORE_NOT_FOUND_ROUTE}/page`;
const UNDERSCORE_GLOBAL_ERROR_ROUTE = '/_global-error';
const UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY = `${UNDERSCORE_GLOBAL_ERROR_ROUTE}/page`; //# sourceMappingURL=entry-constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    APP_CLIENT_INTERNALS: null,
    APP_PATHS_MANIFEST: null,
    APP_PATH_ROUTES_MANIFEST: null,
    AdapterOutputType: null,
    BARREL_OPTIMIZATION_PREFIX: null,
    BLOCKED_PAGES: null,
    BUILD_ID_FILE: null,
    BUILD_MANIFEST: null,
    CLIENT_PUBLIC_FILES_PATH: null,
    CLIENT_REFERENCE_MANIFEST: null,
    CLIENT_STATIC_FILES_PATH: null,
    CLIENT_STATIC_FILES_RUNTIME_MAIN: null,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP: null,
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS: null,
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL: null,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH: null,
    CLIENT_STATIC_FILES_RUNTIME_WEBPACK: null,
    COMPILER_INDEXES: null,
    COMPILER_NAMES: null,
    CONFIG_FILES: null,
    DEFAULT_RUNTIME_WEBPACK: null,
    DEFAULT_SANS_SERIF_FONT: null,
    DEFAULT_SERIF_FONT: null,
    DEV_CLIENT_MIDDLEWARE_MANIFEST: null,
    DEV_CLIENT_PAGES_MANIFEST: null,
    DYNAMIC_CSS_MANIFEST: null,
    EDGE_RUNTIME_WEBPACK: null,
    EDGE_UNSUPPORTED_NODE_APIS: null,
    EXPORT_DETAIL: null,
    EXPORT_MARKER: null,
    FUNCTIONS_CONFIG_MANIFEST: null,
    IMAGES_MANIFEST: null,
    INTERCEPTION_ROUTE_REWRITE_MANIFEST: null,
    MIDDLEWARE_BUILD_MANIFEST: null,
    MIDDLEWARE_MANIFEST: null,
    MIDDLEWARE_REACT_LOADABLE_MANIFEST: null,
    MODERN_BROWSERSLIST_TARGET: null,
    NEXT_BUILTIN_DOCUMENT: null,
    NEXT_FONT_MANIFEST: null,
    PAGES_MANIFEST: null,
    PHASE_ANALYZE: null,
    PHASE_DEVELOPMENT_SERVER: null,
    PHASE_EXPORT: null,
    PHASE_INFO: null,
    PHASE_PRODUCTION_BUILD: null,
    PHASE_PRODUCTION_SERVER: null,
    PHASE_TEST: null,
    PRERENDER_MANIFEST: null,
    REACT_LOADABLE_MANIFEST: null,
    ROUTES_MANIFEST: null,
    RSC_MODULE_TYPES: null,
    SERVER_DIRECTORY: null,
    SERVER_FILES_MANIFEST: null,
    SERVER_PROPS_ID: null,
    SERVER_REFERENCE_MANIFEST: null,
    STATIC_PROPS_ID: null,
    STATIC_STATUS_PAGES: null,
    STRING_LITERAL_DROP_BUNDLE: null,
    SUBRESOURCE_INTEGRITY_MANIFEST: null,
    SYSTEM_ENTRYPOINTS: null,
    TRACE_OUTPUT_VERSION: null,
    TURBOPACK_CLIENT_BUILD_MANIFEST: null,
    TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST: null,
    TURBO_TRACE_DEFAULT_MEMORY_LIMIT: null,
    UNDERSCORE_GLOBAL_ERROR_ROUTE: null,
    UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY: null,
    UNDERSCORE_NOT_FOUND_ROUTE: null,
    UNDERSCORE_NOT_FOUND_ROUTE_ENTRY: null,
    WEBPACK_STATS: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    APP_CLIENT_INTERNALS: function() {
        return APP_CLIENT_INTERNALS;
    },
    APP_PATHS_MANIFEST: function() {
        return APP_PATHS_MANIFEST;
    },
    APP_PATH_ROUTES_MANIFEST: function() {
        return APP_PATH_ROUTES_MANIFEST;
    },
    AdapterOutputType: function() {
        return AdapterOutputType;
    },
    BARREL_OPTIMIZATION_PREFIX: function() {
        return BARREL_OPTIMIZATION_PREFIX;
    },
    BLOCKED_PAGES: function() {
        return BLOCKED_PAGES;
    },
    BUILD_ID_FILE: function() {
        return BUILD_ID_FILE;
    },
    BUILD_MANIFEST: function() {
        return BUILD_MANIFEST;
    },
    CLIENT_PUBLIC_FILES_PATH: function() {
        return CLIENT_PUBLIC_FILES_PATH;
    },
    CLIENT_REFERENCE_MANIFEST: function() {
        return CLIENT_REFERENCE_MANIFEST;
    },
    CLIENT_STATIC_FILES_PATH: function() {
        return CLIENT_STATIC_FILES_PATH;
    },
    CLIENT_STATIC_FILES_RUNTIME_MAIN: function() {
        return CLIENT_STATIC_FILES_RUNTIME_MAIN;
    },
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP: function() {
        return CLIENT_STATIC_FILES_RUNTIME_MAIN_APP;
    },
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS: function() {
        return CLIENT_STATIC_FILES_RUNTIME_POLYFILLS;
    },
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL: function() {
        return CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL;
    },
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH: function() {
        return CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH;
    },
    CLIENT_STATIC_FILES_RUNTIME_WEBPACK: function() {
        return CLIENT_STATIC_FILES_RUNTIME_WEBPACK;
    },
    COMPILER_INDEXES: function() {
        return COMPILER_INDEXES;
    },
    COMPILER_NAMES: function() {
        return COMPILER_NAMES;
    },
    CONFIG_FILES: function() {
        return CONFIG_FILES;
    },
    DEFAULT_RUNTIME_WEBPACK: function() {
        return DEFAULT_RUNTIME_WEBPACK;
    },
    DEFAULT_SANS_SERIF_FONT: function() {
        return DEFAULT_SANS_SERIF_FONT;
    },
    DEFAULT_SERIF_FONT: function() {
        return DEFAULT_SERIF_FONT;
    },
    DEV_CLIENT_MIDDLEWARE_MANIFEST: function() {
        return DEV_CLIENT_MIDDLEWARE_MANIFEST;
    },
    DEV_CLIENT_PAGES_MANIFEST: function() {
        return DEV_CLIENT_PAGES_MANIFEST;
    },
    DYNAMIC_CSS_MANIFEST: function() {
        return DYNAMIC_CSS_MANIFEST;
    },
    EDGE_RUNTIME_WEBPACK: function() {
        return EDGE_RUNTIME_WEBPACK;
    },
    EDGE_UNSUPPORTED_NODE_APIS: function() {
        return EDGE_UNSUPPORTED_NODE_APIS;
    },
    EXPORT_DETAIL: function() {
        return EXPORT_DETAIL;
    },
    EXPORT_MARKER: function() {
        return EXPORT_MARKER;
    },
    FUNCTIONS_CONFIG_MANIFEST: function() {
        return FUNCTIONS_CONFIG_MANIFEST;
    },
    IMAGES_MANIFEST: function() {
        return IMAGES_MANIFEST;
    },
    INTERCEPTION_ROUTE_REWRITE_MANIFEST: function() {
        return INTERCEPTION_ROUTE_REWRITE_MANIFEST;
    },
    MIDDLEWARE_BUILD_MANIFEST: function() {
        return MIDDLEWARE_BUILD_MANIFEST;
    },
    MIDDLEWARE_MANIFEST: function() {
        return MIDDLEWARE_MANIFEST;
    },
    MIDDLEWARE_REACT_LOADABLE_MANIFEST: function() {
        return MIDDLEWARE_REACT_LOADABLE_MANIFEST;
    },
    MODERN_BROWSERSLIST_TARGET: function() {
        return _modernbrowserslisttarget.default;
    },
    NEXT_BUILTIN_DOCUMENT: function() {
        return NEXT_BUILTIN_DOCUMENT;
    },
    NEXT_FONT_MANIFEST: function() {
        return NEXT_FONT_MANIFEST;
    },
    PAGES_MANIFEST: function() {
        return PAGES_MANIFEST;
    },
    PHASE_ANALYZE: function() {
        return PHASE_ANALYZE;
    },
    PHASE_DEVELOPMENT_SERVER: function() {
        return PHASE_DEVELOPMENT_SERVER;
    },
    PHASE_EXPORT: function() {
        return PHASE_EXPORT;
    },
    PHASE_INFO: function() {
        return PHASE_INFO;
    },
    PHASE_PRODUCTION_BUILD: function() {
        return PHASE_PRODUCTION_BUILD;
    },
    PHASE_PRODUCTION_SERVER: function() {
        return PHASE_PRODUCTION_SERVER;
    },
    PHASE_TEST: function() {
        return PHASE_TEST;
    },
    PRERENDER_MANIFEST: function() {
        return PRERENDER_MANIFEST;
    },
    REACT_LOADABLE_MANIFEST: function() {
        return REACT_LOADABLE_MANIFEST;
    },
    ROUTES_MANIFEST: function() {
        return ROUTES_MANIFEST;
    },
    RSC_MODULE_TYPES: function() {
        return RSC_MODULE_TYPES;
    },
    SERVER_DIRECTORY: function() {
        return SERVER_DIRECTORY;
    },
    SERVER_FILES_MANIFEST: function() {
        return SERVER_FILES_MANIFEST;
    },
    SERVER_PROPS_ID: function() {
        return SERVER_PROPS_ID;
    },
    SERVER_REFERENCE_MANIFEST: function() {
        return SERVER_REFERENCE_MANIFEST;
    },
    STATIC_PROPS_ID: function() {
        return STATIC_PROPS_ID;
    },
    STATIC_STATUS_PAGES: function() {
        return STATIC_STATUS_PAGES;
    },
    STRING_LITERAL_DROP_BUNDLE: function() {
        return STRING_LITERAL_DROP_BUNDLE;
    },
    SUBRESOURCE_INTEGRITY_MANIFEST: function() {
        return SUBRESOURCE_INTEGRITY_MANIFEST;
    },
    SYSTEM_ENTRYPOINTS: function() {
        return SYSTEM_ENTRYPOINTS;
    },
    TRACE_OUTPUT_VERSION: function() {
        return TRACE_OUTPUT_VERSION;
    },
    TURBOPACK_CLIENT_BUILD_MANIFEST: function() {
        return TURBOPACK_CLIENT_BUILD_MANIFEST;
    },
    TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST: function() {
        return TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST;
    },
    TURBO_TRACE_DEFAULT_MEMORY_LIMIT: function() {
        return TURBO_TRACE_DEFAULT_MEMORY_LIMIT;
    },
    UNDERSCORE_GLOBAL_ERROR_ROUTE: function() {
        return _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE;
    },
    UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY: function() {
        return _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY;
    },
    UNDERSCORE_NOT_FOUND_ROUTE: function() {
        return _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE;
    },
    UNDERSCORE_NOT_FOUND_ROUTE_ENTRY: function() {
        return _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY;
    },
    WEBPACK_STATS: function() {
        return WEBPACK_STATS;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [instrumentation-edge] (ecmascript)");
const _modernbrowserslisttarget = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/modern-browserslist-target.js [instrumentation-edge] (ecmascript)"));
const _entryconstants = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/entry-constants.js [instrumentation-edge] (ecmascript)");
const COMPILER_NAMES = {
    client: 'client',
    server: 'server',
    edgeServer: 'edge-server'
};
const COMPILER_INDEXES = {
    [COMPILER_NAMES.client]: 0,
    [COMPILER_NAMES.server]: 1,
    [COMPILER_NAMES.edgeServer]: 2
};
var AdapterOutputType = /*#__PURE__*/ function(AdapterOutputType) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ AdapterOutputType["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ AdapterOutputType["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ AdapterOutputType["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ AdapterOutputType["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `PRERENDER` represents an ISR enabled route that might
   * have a seeded cache entry or fallback generated during build
   */ AdapterOutputType["PRERENDER"] = "PRERENDER";
    /**
   * `STATIC_FILE` represents a static file (ie /_next/static)
   */ AdapterOutputType["STATIC_FILE"] = "STATIC_FILE";
    /**
   * `MIDDLEWARE` represents the middleware output if present
   */ AdapterOutputType["MIDDLEWARE"] = "MIDDLEWARE";
    return AdapterOutputType;
}({});
const PHASE_EXPORT = 'phase-export';
const PHASE_ANALYZE = 'phase-analyze';
const PHASE_PRODUCTION_BUILD = 'phase-production-build';
const PHASE_PRODUCTION_SERVER = 'phase-production-server';
const PHASE_DEVELOPMENT_SERVER = 'phase-development-server';
const PHASE_TEST = 'phase-test';
const PHASE_INFO = 'phase-info';
const PAGES_MANIFEST = 'pages-manifest.json';
const WEBPACK_STATS = 'webpack-stats.json';
const APP_PATHS_MANIFEST = 'app-paths-manifest.json';
const APP_PATH_ROUTES_MANIFEST = 'app-path-routes-manifest.json';
const BUILD_MANIFEST = 'build-manifest.json';
const FUNCTIONS_CONFIG_MANIFEST = 'functions-config-manifest.json';
const SUBRESOURCE_INTEGRITY_MANIFEST = 'subresource-integrity-manifest';
const NEXT_FONT_MANIFEST = 'next-font-manifest';
const EXPORT_MARKER = 'export-marker.json';
const EXPORT_DETAIL = 'export-detail.json';
const PRERENDER_MANIFEST = 'prerender-manifest.json';
const ROUTES_MANIFEST = 'routes-manifest.json';
const IMAGES_MANIFEST = 'images-manifest.json';
const SERVER_FILES_MANIFEST = 'required-server-files';
const DEV_CLIENT_PAGES_MANIFEST = '_devPagesManifest.json';
const MIDDLEWARE_MANIFEST = 'middleware-manifest.json';
const TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST = '_clientMiddlewareManifest.json';
const TURBOPACK_CLIENT_BUILD_MANIFEST = 'client-build-manifest.json';
const DEV_CLIENT_MIDDLEWARE_MANIFEST = '_devMiddlewareManifest.json';
const REACT_LOADABLE_MANIFEST = 'react-loadable-manifest.json';
const SERVER_DIRECTORY = 'server';
const CONFIG_FILES = [
    'next.config.js',
    'next.config.mjs',
    'next.config.ts',
    // process.features can be undefined on Edge runtime
    // TODO: Remove `as any` once we bump @types/node to v22.10.0+
    ...process?.features?.typescript ? [
        'next.config.mts'
    ] : []
];
const BUILD_ID_FILE = 'BUILD_ID';
const BLOCKED_PAGES = [
    '/_document',
    '/_app',
    '/_error'
];
const CLIENT_PUBLIC_FILES_PATH = 'public';
const CLIENT_STATIC_FILES_PATH = 'static';
const STRING_LITERAL_DROP_BUNDLE = '__NEXT_DROP_CLIENT_FILE__';
const NEXT_BUILTIN_DOCUMENT = '__NEXT_BUILTIN_DOCUMENT__';
const BARREL_OPTIMIZATION_PREFIX = '__barrel_optimize__';
const CLIENT_REFERENCE_MANIFEST = 'client-reference-manifest';
const SERVER_REFERENCE_MANIFEST = 'server-reference-manifest';
const MIDDLEWARE_BUILD_MANIFEST = 'middleware-build-manifest';
const MIDDLEWARE_REACT_LOADABLE_MANIFEST = 'middleware-react-loadable-manifest';
const INTERCEPTION_ROUTE_REWRITE_MANIFEST = 'interception-route-rewrite-manifest';
const DYNAMIC_CSS_MANIFEST = 'dynamic-css-manifest';
const CLIENT_STATIC_FILES_RUNTIME_MAIN = `main`;
const CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = `${CLIENT_STATIC_FILES_RUNTIME_MAIN}-app`;
const APP_CLIENT_INTERNALS = 'app-pages-internals';
const CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = `react-refresh`;
const CLIENT_STATIC_FILES_RUNTIME_WEBPACK = `webpack`;
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = 'polyfills';
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = Symbol(CLIENT_STATIC_FILES_RUNTIME_POLYFILLS);
const DEFAULT_RUNTIME_WEBPACK = 'webpack-runtime';
const EDGE_RUNTIME_WEBPACK = 'edge-runtime-webpack';
const STATIC_PROPS_ID = '__N_SSG';
const SERVER_PROPS_ID = '__N_SSP';
const DEFAULT_SERIF_FONT = {
    name: 'Times New Roman',
    xAvgCharWidth: 821,
    azAvgWidth: 854.3953488372093,
    unitsPerEm: 2048
};
const DEFAULT_SANS_SERIF_FONT = {
    name: 'Arial',
    xAvgCharWidth: 904,
    azAvgWidth: 934.5116279069767,
    unitsPerEm: 2048
};
const STATIC_STATUS_PAGES = [
    '/500'
];
const TRACE_OUTPUT_VERSION = 1;
const TURBO_TRACE_DEFAULT_MEMORY_LIMIT = 6000;
const RSC_MODULE_TYPES = {
    client: 'client',
    server: 'server'
};
const EDGE_UNSUPPORTED_NODE_APIS = [
    'clearImmediate',
    'setImmediate',
    'BroadcastChannel',
    'ByteLengthQueuingStrategy',
    'CompressionStream',
    'CountQueuingStrategy',
    'DecompressionStream',
    'DomException',
    'MessageChannel',
    'MessageEvent',
    'MessagePort',
    'ReadableByteStreamController',
    'ReadableStreamBYOBRequest',
    'ReadableStreamDefaultController',
    'TransformStreamDefaultController',
    'WritableStreamDefaultController'
];
const SYSTEM_ENTRYPOINTS = new Set([
    CLIENT_STATIC_FILES_RUNTIME_MAIN,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP
]);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=constants.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/constants.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/constants.js [instrumentation-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/querystring-es3/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function() {
    "use strict";
    var e = {
        815: function(e) {
            function hasOwnProperty(e, r) {
                return Object.prototype.hasOwnProperty.call(e, r);
            }
            e.exports = function(e, n, t, o) {
                n = n || "&";
                t = t || "=";
                var a = {};
                if (typeof e !== "string" || e.length === 0) {
                    return a;
                }
                var i = /\+/g;
                e = e.split(n);
                var u = 1e3;
                if (o && typeof o.maxKeys === "number") {
                    u = o.maxKeys;
                }
                var c = e.length;
                if (u > 0 && c > u) {
                    c = u;
                }
                for(var p = 0; p < c; ++p){
                    var f = e[p].replace(i, "%20"), s = f.indexOf(t), _, l, y, d;
                    if (s >= 0) {
                        _ = f.substr(0, s);
                        l = f.substr(s + 1);
                    } else {
                        _ = f;
                        l = "";
                    }
                    y = decodeURIComponent(_);
                    d = decodeURIComponent(l);
                    if (!hasOwnProperty(a, y)) {
                        a[y] = d;
                    } else if (r(a[y])) {
                        a[y].push(d);
                    } else {
                        a[y] = [
                            a[y],
                            d
                        ];
                    }
                }
                return a;
            };
            var r = Array.isArray || function(e) {
                return Object.prototype.toString.call(e) === "[object Array]";
            };
        },
        577: function(e) {
            var stringifyPrimitive = function(e) {
                switch(typeof e){
                    case "string":
                        return e;
                    case "boolean":
                        return e ? "true" : "false";
                    case "number":
                        return isFinite(e) ? e : "";
                    default:
                        return "";
                }
            };
            e.exports = function(e, t, o, a) {
                t = t || "&";
                o = o || "=";
                if (e === null) {
                    e = undefined;
                }
                if (typeof e === "object") {
                    return map(n(e), function(n) {
                        var a = encodeURIComponent(stringifyPrimitive(n)) + o;
                        if (r(e[n])) {
                            return map(e[n], function(e) {
                                return a + encodeURIComponent(stringifyPrimitive(e));
                            }).join(t);
                        } else {
                            return a + encodeURIComponent(stringifyPrimitive(e[n]));
                        }
                    }).join(t);
                }
                if (!a) return "";
                return encodeURIComponent(stringifyPrimitive(a)) + o + encodeURIComponent(stringifyPrimitive(e));
            };
            var r = Array.isArray || function(e) {
                return Object.prototype.toString.call(e) === "[object Array]";
            };
            function map(e, r) {
                if (e.map) return e.map(r);
                var n = [];
                for(var t = 0; t < e.length; t++){
                    n.push(r(e[t], t));
                }
                return n;
            }
            var n = Object.keys || function(e) {
                var r = [];
                for(var n in e){
                    if (Object.prototype.hasOwnProperty.call(e, n)) r.push(n);
                }
                return r;
            };
        }
    };
    var r = {};
    function __nccwpck_require__(n) {
        var t = r[n];
        if (t !== undefined) {
            return t.exports;
        }
        var o = r[n] = {
            exports: {}
        };
        var a = true;
        try {
            e[n](o, o.exports, __nccwpck_require__);
            a = false;
        } finally{
            if (a) delete r[n];
        }
        return o.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/querystring-es3") + "/";
    var n = {};
    !function() {
        var e = n;
        e.decode = e.parse = __nccwpck_require__(815);
        e.encode = e.stringify = __nccwpck_require__(577);
    }();
    module.exports = n;
})();
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/native-url/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function() {
    var e = {
        452: function(e) {
            "use strict";
            e.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/querystring-es3/index.js [instrumentation-edge] (ecmascript)");
        }
    };
    var t = {};
    function __nccwpck_require__(o) {
        var a = t[o];
        if (a !== undefined) {
            return a.exports;
        }
        var s = t[o] = {
            exports: {}
        };
        var n = true;
        try {
            e[o](s, s.exports, __nccwpck_require__);
            n = false;
        } finally{
            if (n) delete t[o];
        }
        return s.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/native-url") + "/";
    var o = {};
    !function() {
        var e = o;
        var t, a = (t = __nccwpck_require__(452)) && "object" == typeof t && "default" in t ? t.default : t, s = /https?|ftp|gopher|file/;
        function r(e) {
            "string" == typeof e && (e = d(e));
            var t = function(e, t, o) {
                var a = e.auth, s = e.hostname, n = e.protocol || "", p = e.pathname || "", c = e.hash || "", i = e.query || "", u = !1;
                a = a ? encodeURIComponent(a).replace(/%3A/i, ":") + "@" : "", e.host ? u = a + e.host : s && (u = a + (~s.indexOf(":") ? "[" + s + "]" : s), e.port && (u += ":" + e.port)), i && "object" == typeof i && (i = t.encode(i));
                var f = e.search || i && "?" + i || "";
                return n && ":" !== n.substr(-1) && (n += ":"), e.slashes || (!n || o.test(n)) && !1 !== u ? (u = "//" + (u || ""), p && "/" !== p[0] && (p = "/" + p)) : u || (u = ""), c && "#" !== c[0] && (c = "#" + c), f && "?" !== f[0] && (f = "?" + f), {
                    protocol: n,
                    host: u,
                    pathname: p = p.replace(/[?#]/g, encodeURIComponent),
                    search: f = f.replace("#", "%23"),
                    hash: c
                };
            }(e, a, s);
            return "" + t.protocol + t.host + t.pathname + t.search + t.hash;
        }
        var n = "http://", p = "w.w", c = n + p, i = /^([a-z0-9.+-]*:\/\/\/)([a-z0-9.+-]:\/*)?/i, u = /https?|ftp|gopher|file/;
        function h(e, t) {
            var o = "string" == typeof e ? d(e) : e;
            e = "object" == typeof e ? r(e) : e;
            var a = d(t), s = "";
            o.protocol && !o.slashes && (s = o.protocol, e = e.replace(o.protocol, ""), s += "/" === t[0] || "/" === e[0] ? "/" : ""), s && a.protocol && (s = "", a.slashes || (s = a.protocol, t = t.replace(a.protocol, "")));
            var p = e.match(i);
            p && !a.protocol && (e = e.substr((s = p[1] + (p[2] || "")).length), /^\/\/[^/]/.test(t) && (s = s.slice(0, -1)));
            var f = new URL(e, c + "/"), m = new URL(t, f).toString().replace(c, ""), v = a.protocol || o.protocol;
            return v += o.slashes || a.slashes ? "//" : "", !s && v ? m = m.replace(n, v) : s && (m = m.replace(n, "")), u.test(m) || ~t.indexOf(".") || "/" === e.slice(-1) || "/" === t.slice(-1) || "/" !== m.slice(-1) || (m = m.slice(0, -1)), s && (m = s + ("/" === m[0] ? m.substr(1) : m)), m;
        }
        function l() {}
        l.prototype.parse = d, l.prototype.format = r, l.prototype.resolve = h, l.prototype.resolveObject = h;
        var f = /^https?|ftp|gopher|file/, m = /^(.*?)([#?].*)/, v = /^([a-z0-9.+-]*:)(\/{0,3})(.*)/i, _ = /^([a-z0-9.+-]*:)?\/\/\/*/i, b = /^([a-z0-9.+-]*:)(\/{0,2})\[(.*)\]$/i;
        function d(e, t, o) {
            if (void 0 === t && (t = !1), void 0 === o && (o = !1), e && "object" == typeof e && e instanceof l) return e;
            var s = (e = e.trim()).match(m);
            e = s ? s[1].replace(/\\/g, "/") + s[2] : e.replace(/\\/g, "/"), b.test(e) && "/" !== e.slice(-1) && (e += "/");
            var n = !/(^javascript)/.test(e) && e.match(v), i = _.test(e), u = "";
            n && (f.test(n[1]) || (u = n[1].toLowerCase(), e = "" + n[2] + n[3]), n[2] || (i = !1, f.test(n[1]) ? (u = n[1], e = "" + n[3]) : e = "//" + n[3]), 3 !== n[2].length && 1 !== n[2].length || (u = n[1], e = "/" + n[3]));
            var g, y = (s ? s[1] : e).match(/^https?:\/\/[^/]+(:[0-9]+)(?=\/|$)/), w = y && y[1], x = new l, C = "", U = "";
            try {
                g = new URL(e);
            } catch (t) {
                C = t, u || o || !/^\/\//.test(e) || /^\/\/.+[@.]/.test(e) || (U = "/", e = e.substr(1));
                try {
                    g = new URL(e, c);
                } catch (e) {
                    return x.protocol = u, x.href = u, x;
                }
            }
            x.slashes = i && !U, x.host = g.host === p ? "" : g.host, x.hostname = g.hostname === p ? "" : g.hostname.replace(/(\[|\])/g, ""), x.protocol = C ? u || null : g.protocol, x.search = g.search.replace(/\\/g, "%5C"), x.hash = g.hash.replace(/\\/g, "%5C");
            var j = e.split("#");
            !x.search && ~j[0].indexOf("?") && (x.search = "?"), x.hash || "" !== j[1] || (x.hash = "#"), x.query = t ? a.decode(g.search.substr(1)) : x.search.substr(1), x.pathname = U + (n ? function(e) {
                return e.replace(/['^|`]/g, function(e) {
                    return "%" + e.charCodeAt().toString(16).toUpperCase();
                }).replace(/((?:%[0-9A-F]{2})+)/g, function(e, t) {
                    try {
                        return decodeURIComponent(t).split("").map(function(e) {
                            var t = e.charCodeAt();
                            return t > 256 || /^[a-z0-9]$/i.test(e) ? e : "%" + t.toString(16).toUpperCase();
                        }).join("");
                    } catch (e) {
                        return t;
                    }
                });
            }(g.pathname) : g.pathname), "about:" === x.protocol && "blank" === x.pathname && (x.protocol = "", x.pathname = ""), C && "/" !== e[0] && (x.pathname = x.pathname.substr(1)), u && !f.test(u) && "/" !== e.slice(-1) && "/" === x.pathname && (x.pathname = ""), x.path = x.pathname + x.search, x.auth = [
                g.username,
                g.password
            ].map(decodeURIComponent).filter(Boolean).join(":"), x.port = g.port, w && !x.host.endsWith(w) && (x.host += w, x.port = w.slice(1)), x.href = U ? "" + x.pathname + x.search + x.hash : r(x);
            var q = /^(file)/.test(x.href) ? [
                "host",
                "hostname"
            ] : [];
            return Object.keys(x).forEach(function(e) {
                ~q.indexOf(e) || (x[e] = x[e] || null);
            }), x;
        }
        e.parse = d, e.format = r, e.resolve = h, e.resolveObject = function(e, t) {
            return d(h(e, t));
        }, e.Url = l;
    }();
    module.exports = o;
})();
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/esm/build/templates/edge-wrapper.js { MODULE => \"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/instrumentation.ts [instrumentation-edge] (ecmascript)\" } [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

// The wrapped module could be an async module, we handle that with the proxy
// here. The comma expression makes sure we don't call the function with the
// module as the "this" arg.
// Turn exports into functions that are also a thenable. This way you can await the whole object
// or  exports (e.g. for Components) or call them directly as though they are async functions
// (e.g. edge functions/middleware, this is what the Edge Runtime does).
// Catch promise to prevent UnhandledPromiseRejectionWarning, this will be propagated through
// the awaited export(s) anyway.
self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/instrumentation.ts [instrumentation-edge] (ecmascript)"));
modProm.catch(()=>{});
self._ENTRIES["middleware_instrumentation"] = new Proxy(modProm, {
    get (innerModProm, name) {
        if (name === 'then') {
            return (res, rej)=>innerModProm.then(res, rej);
        }
        let result = (...args)=>innerModProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>innerModProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
}); //# sourceMappingURL=edge-wrapper.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@prisma/client/runtime/index-browser.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var de = Object.defineProperty;
var We = Object.getOwnPropertyDescriptor;
var Ge = Object.getOwnPropertyNames;
var Je = Object.prototype.hasOwnProperty;
var Me = (e, n)=>{
    for(var i in n)de(e, i, {
        get: n[i],
        enumerable: !0
    });
}, Xe = (e, n, i, t)=>{
    if (n && typeof n == "object" || typeof n == "function") for (let r of Ge(n))!Je.call(e, r) && r !== i && de(e, r, {
        get: ()=>n[r],
        enumerable: !(t = We(n, r)) || t.enumerable
    });
    return e;
};
var Ke = (e)=>Xe(de({}, "__esModule", {
        value: !0
    }), e);
var Xn = {};
Me(Xn, {
    Decimal: ()=>je,
    Public: ()=>he,
    getRuntime: ()=>be,
    makeStrictEnum: ()=>Pe,
    objectEnumValues: ()=>Oe
});
module.exports = Ke(Xn);
var he = {};
Me(he, {
    validator: ()=>Ce
});
function Ce(...e) {
    return (n)=>n;
}
var ne = Symbol(), pe = new WeakMap, ge = class {
    constructor(n){
        n === ne ? pe.set(this, "Prisma.".concat(this._getName())) : pe.set(this, "new Prisma.".concat(this._getNamespace(), ".").concat(this._getName(), "()"));
    }
    _getName() {
        return this.constructor.name;
    }
    toString() {
        return pe.get(this);
    }
}, G = class extends ge {
    _getNamespace() {
        return "NullTypes";
    }
}, J = class extends G {
};
me(J, "DbNull");
var X = class extends G {
};
me(X, "JsonNull");
var K = class extends G {
};
me(K, "AnyNull");
var Oe = {
    classes: {
        DbNull: J,
        JsonNull: X,
        AnyNull: K
    },
    instances: {
        DbNull: new J(ne),
        JsonNull: new X(ne),
        AnyNull: new K(ne)
    }
};
function me(e, n) {
    Object.defineProperty(e, "name", {
        value: n,
        configurable: !0
    });
}
var xe = new Set([
    "toJSON",
    "$$typeof",
    "asymmetricMatch",
    Symbol.iterator,
    Symbol.toStringTag,
    Symbol.isConcatSpreadable,
    Symbol.toPrimitive
]);
function Pe(e) {
    return new Proxy(e, {
        get (n, i) {
            if (i in n) return n[i];
            if (!xe.has(i)) throw new TypeError("Invalid enum value: ".concat(String(i)));
        }
    });
}
var Qe = "Cloudflare-Workers", Ye = "node";
function Re() {
    var e, n, i;
    return typeof Netlify == "object" ? "netlify" : typeof ("TURBOPACK compile-time value", "edge-runtime") == "string" ? "edge-light" : ((e = globalThis.navigator) == null ? void 0 : e.userAgent) === Qe ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : ((i = (n = globalThis.process) == null ? void 0 : n.release) == null ? void 0 : i.name) === Ye ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
}
var ze = {
    node: "Node.js",
    workerd: "Cloudflare Workers",
    deno: "Deno and Deno Deploy",
    netlify: "Netlify Edge Functions",
    "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)"
};
function be() {
    let e = Re();
    return {
        id: e,
        prettyName: ze[e] || e,
        isEdge: [
            "workerd",
            "deno",
            "netlify",
            "edge-light"
        ].includes(e)
    };
}
var H = 9e15, $ = 1e9, we = "0123456789abcdef", te = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", re = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Ne = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -H,
    maxE: H,
    crypto: !1
}, Te, Z, w = !0, oe = "[DecimalError] ", V = oe + "Invalid argument: ", Le = oe + "Precision limit exceeded", De = oe + "crypto unavailable", Fe = "[object Decimal]", b = Math.floor, C = Math.pow, ye = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, en = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, nn = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Ie = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, D = 1e7, m = 7, tn = 9007199254740991, rn = te.length - 1, ve = re.length - 1, h = {
    toStringTag: Fe
};
h.absoluteValue = h.abs = function() {
    var e = new this.constructor(this);
    return e.s < 0 && (e.s = 1), p(e);
};
h.ceil = function() {
    return p(new this.constructor(this), this.e + 1, 2);
};
h.clampedTo = h.clamp = function(e, n) {
    var i, t = this, r = t.constructor;
    if (e = new r(e), n = new r(n), !e.s || !n.s) return new r(NaN);
    if (e.gt(n)) throw Error(V + n);
    return i = t.cmp(e), i < 0 ? e : t.cmp(n) > 0 ? n : new r(t);
};
h.comparedTo = h.cmp = function(e) {
    var n, i, t, r, s = this, o = s.d, u = (e = new s.constructor(e)).d, l = s.s, f = e.s;
    if (!o || !u) return !l || !f ? NaN : l !== f ? l : o === u ? 0 : !o ^ l < 0 ? 1 : -1;
    if (!o[0] || !u[0]) return o[0] ? l : u[0] ? -f : 0;
    if (l !== f) return l;
    if (s.e !== e.e) return s.e > e.e ^ l < 0 ? 1 : -1;
    for(t = o.length, r = u.length, n = 0, i = t < r ? t : r; n < i; ++n)if (o[n] !== u[n]) return o[n] > u[n] ^ l < 0 ? 1 : -1;
    return t === r ? 0 : t > r ^ l < 0 ? 1 : -1;
};
h.cosine = h.cos = function() {
    var e, n, i = this, t = i.constructor;
    return i.d ? i.d[0] ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = sn(t, $e(t, i)), t.precision = e, t.rounding = n, p(Z == 2 || Z == 3 ? i.neg() : i, e, n, !0)) : new t(1) : new t(NaN);
};
h.cubeRoot = h.cbrt = function() {
    var e, n, i, t, r, s, o, u, l, f, c = this, a = c.constructor;
    if (!c.isFinite() || c.isZero()) return new a(c);
    for(w = !1, s = c.s * C(c.s * c, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (i = O(c.d), e = c.e, (s = (e - i.length + 1) % 3) && (i += s == 1 || s == -2 ? "0" : "00"), s = C(i, 1 / 3), e = b((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? i = "5e" + e : (i = s.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + e), t = new a(i), t.s = c.s) : t = new a(s.toString()), o = (e = a.precision) + 3;;)if (u = t, l = u.times(u).times(u), f = l.plus(c), t = S(f.plus(c).times(u), f.plus(l), o + 2, 1), O(u.d).slice(0, o) === (i = O(t.d)).slice(0, o)) if (i = i.slice(o - 3, o + 1), i == "9999" || !r && i == "4999") {
        if (!r && (p(u, e + 1, 0), u.times(u).times(u).eq(c))) {
            t = u;
            break;
        }
        o += 4, r = 1;
    } else {
        (!+i || !+i.slice(1) && i.charAt(0) == "5") && (p(t, e + 1, 1), n = !t.times(t).times(t).eq(c));
        break;
    }
    return w = !0, p(t, e, a.rounding, n);
};
h.decimalPlaces = h.dp = function() {
    var e, n = this.d, i = NaN;
    if (n) {
        if (e = n.length - 1, i = (e - b(this.e / m)) * m, e = n[e], e) for(; e % 10 == 0; e /= 10)i--;
        i < 0 && (i = 0);
    }
    return i;
};
h.dividedBy = h.div = function(e) {
    return S(this, new this.constructor(e));
};
h.dividedToIntegerBy = h.divToInt = function(e) {
    var n = this, i = n.constructor;
    return p(S(n, new i(e), 0, 1, 1), i.precision, i.rounding);
};
h.equals = h.eq = function(e) {
    return this.cmp(e) === 0;
};
h.floor = function() {
    return p(new this.constructor(this), this.e + 1, 3);
};
h.greaterThan = h.gt = function(e) {
    return this.cmp(e) > 0;
};
h.greaterThanOrEqualTo = h.gte = function(e) {
    var n = this.cmp(e);
    return n == 1 || n === 0;
};
h.hyperbolicCosine = h.cosh = function() {
    var e, n, i, t, r, s = this, o = s.constructor, u = new o(1);
    if (!s.isFinite()) return new o(s.s ? 1 / 0 : NaN);
    if (s.isZero()) return u;
    i = o.precision, t = o.rounding, o.precision = i + Math.max(s.e, s.sd()) + 4, o.rounding = 1, r = s.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / fe(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), s = j(o, 1, s.times(n), new o(1), !0);
    for(var l, f = e, c = new o(8); f--;)l = s.times(s), s = u.minus(l.times(c.minus(l.times(c))));
    return p(s, o.precision = i, o.rounding = t, !0);
};
h.hyperbolicSine = h.sinh = function() {
    var e, n, i, t, r = this, s = r.constructor;
    if (!r.isFinite() || r.isZero()) return new s(r);
    if (n = s.precision, i = s.rounding, s.precision = n + Math.max(r.e, r.sd()) + 4, s.rounding = 1, t = r.d.length, t < 3) r = j(s, 2, r, r, !0);
    else {
        e = 1.4 * Math.sqrt(t), e = e > 16 ? 16 : e | 0, r = r.times(1 / fe(5, e)), r = j(s, 2, r, r, !0);
        for(var o, u = new s(5), l = new s(16), f = new s(20); e--;)o = r.times(r), r = r.times(u.plus(o.times(l.times(o).plus(f))));
    }
    return s.precision = n, s.rounding = i, p(r, n, i, !0);
};
h.hyperbolicTangent = h.tanh = function() {
    var e, n, i = this, t = i.constructor;
    return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 7, t.rounding = 1, S(i.sinh(), i.cosh(), t.precision = e, t.rounding = n)) : new t(i.s);
};
h.inverseCosine = h.acos = function() {
    var e, n = this, i = n.constructor, t = n.abs().cmp(1), r = i.precision, s = i.rounding;
    return t !== -1 ? t === 0 ? n.isNeg() ? L(i, r, s) : new i(0) : new i(NaN) : n.isZero() ? L(i, r + 4, s).times(.5) : (i.precision = r + 6, i.rounding = 1, n = n.asin(), e = L(i, r + 4, s).times(.5), i.precision = r, i.rounding = s, e.minus(n));
};
h.inverseHyperbolicCosine = h.acosh = function() {
    var e, n, i = this, t = i.constructor;
    return i.lte(1) ? new t(i.eq(1) ? 0 : NaN) : i.isFinite() ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(Math.abs(i.e), i.sd()) + 4, t.rounding = 1, w = !1, i = i.times(i).minus(1).sqrt().plus(i), w = !0, t.precision = e, t.rounding = n, i.ln()) : new t(i);
};
h.inverseHyperbolicSine = h.asinh = function() {
    var e, n, i = this, t = i.constructor;
    return !i.isFinite() || i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 2 * Math.max(Math.abs(i.e), i.sd()) + 6, t.rounding = 1, w = !1, i = i.times(i).plus(1).sqrt().plus(i), w = !0, t.precision = e, t.rounding = n, i.ln());
};
h.inverseHyperbolicTangent = h.atanh = function() {
    var e, n, i, t, r = this, s = r.constructor;
    return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = s.precision, n = s.rounding, t = r.sd(), Math.max(t, e) < 2 * -r.e - 1 ? p(new s(r), e, n, !0) : (s.precision = i = t - r.e, r = S(r.plus(1), new s(1).minus(r), i + e, 1), s.precision = e + 4, s.rounding = 1, r = r.ln(), s.precision = e, s.rounding = n, r.times(.5))) : new s(NaN);
};
h.inverseSine = h.asin = function() {
    var e, n, i, t, r = this, s = r.constructor;
    return r.isZero() ? new s(r) : (n = r.abs().cmp(1), i = s.precision, t = s.rounding, n !== -1 ? n === 0 ? (e = L(s, i + 4, t).times(.5), e.s = r.s, e) : new s(NaN) : (s.precision = i + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = i, s.rounding = t, r.times(2)));
};
h.inverseTangent = h.atan = function() {
    var e, n, i, t, r, s, o, u, l, f = this, c = f.constructor, a = c.precision, d = c.rounding;
    if (f.isFinite()) {
        if (f.isZero()) return new c(f);
        if (f.abs().eq(1) && a + 4 <= ve) return o = L(c, a + 4, d).times(.25), o.s = f.s, o;
    } else {
        if (!f.s) return new c(NaN);
        if (a + 4 <= ve) return o = L(c, a + 4, d).times(.5), o.s = f.s, o;
    }
    for(c.precision = u = a + 10, c.rounding = 1, i = Math.min(28, u / m + 2 | 0), e = i; e; --e)f = f.div(f.times(f).plus(1).sqrt().plus(1));
    for(w = !1, n = Math.ceil(u / m), t = 1, l = f.times(f), o = new c(f), r = f; e !== -1;)if (r = r.times(l), s = o.minus(r.div(t += 2)), r = r.times(l), o = s.plus(r.div(t += 2)), o.d[n] !== void 0) for(e = n; o.d[e] === s.d[e] && e--;);
    return i && (o = o.times(2 << i - 1)), w = !0, p(o, c.precision = a, c.rounding = d, !0);
};
h.isFinite = function() {
    return !!this.d;
};
h.isInteger = h.isInt = function() {
    return !!this.d && b(this.e / m) > this.d.length - 2;
};
h.isNaN = function() {
    return !this.s;
};
h.isNegative = h.isNeg = function() {
    return this.s < 0;
};
h.isPositive = h.isPos = function() {
    return this.s > 0;
};
h.isZero = function() {
    return !!this.d && this.d[0] === 0;
};
h.lessThan = h.lt = function(e) {
    return this.cmp(e) < 0;
};
h.lessThanOrEqualTo = h.lte = function(e) {
    return this.cmp(e) < 1;
};
h.logarithm = h.log = function(e) {
    var n, i, t, r, s, o, u, l, f = this, c = f.constructor, a = c.precision, d = c.rounding, g = 5;
    if (e == null) e = new c(10), n = !0;
    else {
        if (e = new c(e), i = e.d, e.s < 0 || !i || !i[0] || e.eq(1)) return new c(NaN);
        n = e.eq(10);
    }
    if (i = f.d, f.s < 0 || !i || !i[0] || f.eq(1)) return new c(i && !i[0] ? -1 / 0 : f.s != 1 ? NaN : i ? 0 : 1 / 0);
    if (n) if (i.length > 1) s = !0;
    else {
        for(r = i[0]; r % 10 === 0;)r /= 10;
        s = r !== 1;
    }
    if (w = !1, u = a + g, o = B(f, u), t = n ? se(c, u + 10) : B(e, u), l = S(o, t, u, 1), x(l.d, r = a, d)) do if (u += 10, o = B(f, u), t = n ? se(c, u + 10) : B(e, u), l = S(o, t, u, 1), !s) {
        +O(l.d).slice(r + 1, r + 15) + 1 == 1e14 && (l = p(l, a + 1, 0));
        break;
    }
    while (x(l.d, r += 10, d))
    return w = !0, p(l, a, d);
};
h.minus = h.sub = function(e) {
    var n, i, t, r, s, o, u, l, f, c, a, d, g = this, v = g.constructor;
    if (e = new v(e), !g.d || !e.d) return !g.s || !e.s ? e = new v(NaN) : g.d ? e.s = -e.s : e = new v(e.d || g.s !== e.s ? g : NaN), e;
    if (g.s != e.s) return e.s = -e.s, g.plus(e);
    if (f = g.d, d = e.d, u = v.precision, l = v.rounding, !f[0] || !d[0]) {
        if (d[0]) e.s = -e.s;
        else if (f[0]) e = new v(g);
        else return new v(l === 3 ? -0 : 0);
        return w ? p(e, u, l) : e;
    }
    if (i = b(e.e / m), c = b(g.e / m), f = f.slice(), s = c - i, s) {
        for(a = s < 0, a ? (n = f, s = -s, o = d.length) : (n = d, i = c, o = f.length), t = Math.max(Math.ceil(u / m), o) + 2, s > t && (s = t, n.length = 1), n.reverse(), t = s; t--;)n.push(0);
        n.reverse();
    } else {
        for(t = f.length, o = d.length, a = t < o, a && (o = t), t = 0; t < o; t++)if (f[t] != d[t]) {
            a = f[t] < d[t];
            break;
        }
        s = 0;
    }
    for(a && (n = f, f = d, d = n, e.s = -e.s), o = f.length, t = d.length - o; t > 0; --t)f[o++] = 0;
    for(t = d.length; t > s;){
        if (f[--t] < d[t]) {
            for(r = t; r && f[--r] === 0;)f[r] = D - 1;
            --f[r], f[t] += D;
        }
        f[t] -= d[t];
    }
    for(; f[--o] === 0;)f.pop();
    for(; f[0] === 0; f.shift())--i;
    return f[0] ? (e.d = f, e.e = ue(f, i), w ? p(e, u, l) : e) : new v(l === 3 ? -0 : 0);
};
h.modulo = h.mod = function(e) {
    var n, i = this, t = i.constructor;
    return e = new t(e), !i.d || !e.s || e.d && !e.d[0] ? new t(NaN) : !e.d || i.d && !i.d[0] ? p(new t(i), t.precision, t.rounding) : (w = !1, t.modulo == 9 ? (n = S(i, e.abs(), 0, 3, 1), n.s *= e.s) : n = S(i, e, 0, t.modulo, 1), n = n.times(e), w = !0, i.minus(n));
};
h.naturalExponential = h.exp = function() {
    return Ee(this);
};
h.naturalLogarithm = h.ln = function() {
    return B(this);
};
h.negated = h.neg = function() {
    var e = new this.constructor(this);
    return e.s = -e.s, p(e);
};
h.plus = h.add = function(e) {
    var n, i, t, r, s, o, u, l, f, c, a = this, d = a.constructor;
    if (e = new d(e), !a.d || !e.d) return !a.s || !e.s ? e = new d(NaN) : a.d || (e = new d(e.d || a.s === e.s ? a : NaN)), e;
    if (a.s != e.s) return e.s = -e.s, a.minus(e);
    if (f = a.d, c = e.d, u = d.precision, l = d.rounding, !f[0] || !c[0]) return c[0] || (e = new d(a)), w ? p(e, u, l) : e;
    if (s = b(a.e / m), t = b(e.e / m), f = f.slice(), r = s - t, r) {
        for(r < 0 ? (i = f, r = -r, o = c.length) : (i = c, t = s, o = f.length), s = Math.ceil(u / m), o = s > o ? s + 1 : o + 1, r > o && (r = o, i.length = 1), i.reverse(); r--;)i.push(0);
        i.reverse();
    }
    for(o = f.length, r = c.length, o - r < 0 && (r = o, i = c, c = f, f = i), n = 0; r;)n = (f[--r] = f[r] + c[r] + n) / D | 0, f[r] %= D;
    for(n && (f.unshift(n), ++t), o = f.length; f[--o] == 0;)f.pop();
    return e.d = f, e.e = ue(f, t), w ? p(e, u, l) : e;
};
h.precision = h.sd = function(e) {
    var n, i = this;
    if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(V + e);
    return i.d ? (n = Ze(i.d), e && i.e + 1 > n && (n = i.e + 1)) : n = NaN, n;
};
h.round = function() {
    var e = this, n = e.constructor;
    return p(new n(e), e.e + 1, n.rounding);
};
h.sine = h.sin = function() {
    var e, n, i = this, t = i.constructor;
    return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = un(t, $e(t, i)), t.precision = e, t.rounding = n, p(Z > 2 ? i.neg() : i, e, n, !0)) : new t(NaN);
};
h.squareRoot = h.sqrt = function() {
    var e, n, i, t, r, s, o = this, u = o.d, l = o.e, f = o.s, c = o.constructor;
    if (f !== 1 || !u || !u[0]) return new c(!f || f < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);
    for(w = !1, f = Math.sqrt(+o), f == 0 || f == 1 / 0 ? (n = O(u), (n.length + l) % 2 == 0 && (n += "0"), f = Math.sqrt(n), l = b((l + 1) / 2) - (l < 0 || l % 2), f == 1 / 0 ? n = "5e" + l : (n = f.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + l), t = new c(n)) : t = new c(f.toString()), i = (l = c.precision) + 3;;)if (s = t, t = s.plus(S(o, s, i + 2, 1)).times(.5), O(s.d).slice(0, i) === (n = O(t.d)).slice(0, i)) if (n = n.slice(i - 3, i + 1), n == "9999" || !r && n == "4999") {
        if (!r && (p(s, l + 1, 0), s.times(s).eq(o))) {
            t = s;
            break;
        }
        i += 4, r = 1;
    } else {
        (!+n || !+n.slice(1) && n.charAt(0) == "5") && (p(t, l + 1, 1), e = !t.times(t).eq(o));
        break;
    }
    return w = !0, p(t, l, c.rounding, e);
};
h.tangent = h.tan = function() {
    var e, n, i = this, t = i.constructor;
    return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 10, t.rounding = 1, i = i.sin(), i.s = 1, i = S(i, new t(1).minus(i.times(i)).sqrt(), e + 10, 0), t.precision = e, t.rounding = n, p(Z == 2 || Z == 4 ? i.neg() : i, e, n, !0)) : new t(NaN);
};
h.times = h.mul = function(e) {
    var n, i, t, r, s, o, u, l, f, c = this, a = c.constructor, d = c.d, g = (e = new a(e)).d;
    if (e.s *= c.s, !d || !d[0] || !g || !g[0]) return new a(!e.s || d && !d[0] && !g || g && !g[0] && !d ? NaN : !d || !g ? e.s / 0 : e.s * 0);
    for(i = b(c.e / m) + b(e.e / m), l = d.length, f = g.length, l < f && (s = d, d = g, g = s, o = l, l = f, f = o), s = [], o = l + f, t = o; t--;)s.push(0);
    for(t = f; --t >= 0;){
        for(n = 0, r = l + t; r > t;)u = s[r] + g[t] * d[r - t - 1] + n, s[r--] = u % D | 0, n = u / D | 0;
        s[r] = (s[r] + n) % D | 0;
    }
    for(; !s[--o];)s.pop();
    return n ? ++i : s.shift(), e.d = s, e.e = ue(s, i), w ? p(e, a.precision, a.rounding) : e;
};
h.toBinary = function(e, n) {
    return ke(this, 2, e, n);
};
h.toDecimalPlaces = h.toDP = function(e, n) {
    var i = this, t = i.constructor;
    return i = new t(i), e === void 0 ? i : (_(e, 0, $), n === void 0 ? n = t.rounding : _(n, 0, 8), p(i, e + i.e + 1, n));
};
h.toExponential = function(e, n) {
    var i, t = this, r = t.constructor;
    return e === void 0 ? i = F(t, !0) : (_(e, 0, $), n === void 0 ? n = r.rounding : _(n, 0, 8), t = p(new r(t), e + 1, n), i = F(t, !0, e + 1)), t.isNeg() && !t.isZero() ? "-" + i : i;
};
h.toFixed = function(e, n) {
    var i, t, r = this, s = r.constructor;
    return e === void 0 ? i = F(r) : (_(e, 0, $), n === void 0 ? n = s.rounding : _(n, 0, 8), t = p(new s(r), e + r.e + 1, n), i = F(t, !1, e + t.e + 1)), r.isNeg() && !r.isZero() ? "-" + i : i;
};
h.toFraction = function(e) {
    var n, i, t, r, s, o, u, l, f, c, a, d, g = this, v = g.d, N = g.constructor;
    if (!v) return new N(g);
    if (f = i = new N(1), t = l = new N(0), n = new N(t), s = n.e = Ze(v) - g.e - 1, o = s % m, n.d[0] = C(10, o < 0 ? m + o : o), e == null) e = s > 0 ? n : f;
    else {
        if (u = new N(e), !u.isInt() || u.lt(f)) throw Error(V + u);
        e = u.gt(n) ? s > 0 ? n : f : u;
    }
    for(w = !1, u = new N(O(v)), c = N.precision, N.precision = s = v.length * m * 2; a = S(u, n, 0, 1, 1), r = i.plus(a.times(t)), r.cmp(e) != 1;)i = t, t = r, r = f, f = l.plus(a.times(r)), l = r, r = n, n = u.minus(a.times(r)), u = r;
    return r = S(e.minus(i), t, 0, 1, 1), l = l.plus(r.times(f)), i = i.plus(r.times(t)), l.s = f.s = g.s, d = S(f, t, s, 1).minus(g).abs().cmp(S(l, i, s, 1).minus(g).abs()) < 1 ? [
        f,
        t
    ] : [
        l,
        i
    ], N.precision = c, w = !0, d;
};
h.toHexadecimal = h.toHex = function(e, n) {
    return ke(this, 16, e, n);
};
h.toNearest = function(e, n) {
    var i = this, t = i.constructor;
    if (i = new t(i), e == null) {
        if (!i.d) return i;
        e = new t(1), n = t.rounding;
    } else {
        if (e = new t(e), n === void 0 ? n = t.rounding : _(n, 0, 8), !i.d) return e.s ? i : e;
        if (!e.d) return e.s && (e.s = i.s), e;
    }
    return e.d[0] ? (w = !1, i = S(i, e, 0, n, 1).times(e), w = !0, p(i)) : (e.s = i.s, i = e), i;
};
h.toNumber = function() {
    return +this;
};
h.toOctal = function(e, n) {
    return ke(this, 8, e, n);
};
h.toPower = h.pow = function(e) {
    var n, i, t, r, s, o, u = this, l = u.constructor, f = +(e = new l(e));
    if (!u.d || !e.d || !u.d[0] || !e.d[0]) return new l(C(+u, f));
    if (u = new l(u), u.eq(1)) return u;
    if (t = l.precision, s = l.rounding, e.eq(1)) return p(u, t, s);
    if (n = b(e.e / m), n >= e.d.length - 1 && (i = f < 0 ? -f : f) <= tn) return r = Ue(l, u, i, t), e.s < 0 ? new l(1).div(r) : p(r, t, s);
    if (o = u.s, o < 0) {
        if (n < e.d.length - 1) return new l(NaN);
        if (e.d[n] & 1 || (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1) return u.s = o, u;
    }
    return i = C(+u, f), n = i == 0 || !isFinite(i) ? b(f * (Math.log("0." + O(u.d)) / Math.LN10 + u.e + 1)) : new l(i + "").e, n > l.maxE + 1 || n < l.minE - 1 ? new l(n > 0 ? o / 0 : 0) : (w = !1, l.rounding = u.s = 1, i = Math.min(12, (n + "").length), r = Ee(e.times(B(u, t + i)), t), r.d && (r = p(r, t + 5, 1), x(r.d, t, s) && (n = t + 10, r = p(Ee(e.times(B(u, n + i)), n), n + 5, 1), +O(r.d).slice(t + 1, t + 15) + 1 == 1e14 && (r = p(r, t + 1, 0)))), r.s = o, w = !0, l.rounding = s, p(r, t, s));
};
h.toPrecision = function(e, n) {
    var i, t = this, r = t.constructor;
    return e === void 0 ? i = F(t, t.e <= r.toExpNeg || t.e >= r.toExpPos) : (_(e, 1, $), n === void 0 ? n = r.rounding : _(n, 0, 8), t = p(new r(t), e, n), i = F(t, e <= t.e || t.e <= r.toExpNeg, e)), t.isNeg() && !t.isZero() ? "-" + i : i;
};
h.toSignificantDigits = h.toSD = function(e, n) {
    var i = this, t = i.constructor;
    return e === void 0 ? (e = t.precision, n = t.rounding) : (_(e, 1, $), n === void 0 ? n = t.rounding : _(n, 0, 8)), p(new t(i), e, n);
};
h.toString = function() {
    var e = this, n = e.constructor, i = F(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
    return e.isNeg() && !e.isZero() ? "-" + i : i;
};
h.truncated = h.trunc = function() {
    return p(new this.constructor(this), this.e + 1, 1);
};
h.valueOf = h.toJSON = function() {
    var e = this, n = e.constructor, i = F(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
    return e.isNeg() ? "-" + i : i;
};
function O(e) {
    var n, i, t, r = e.length - 1, s = "", o = e[0];
    if (r > 0) {
        for(s += o, n = 1; n < r; n++)t = e[n] + "", i = m - t.length, i && (s += U(i)), s += t;
        o = e[n], t = o + "", i = m - t.length, i && (s += U(i));
    } else if (o === 0) return "0";
    for(; o % 10 === 0;)o /= 10;
    return s + o;
}
function _(e, n, i) {
    if (e !== ~~e || e < n || e > i) throw Error(V + e);
}
function x(e, n, i, t) {
    var r, s, o, u;
    for(s = e[0]; s >= 10; s /= 10)--n;
    return --n < 0 ? (n += m, r = 0) : (r = Math.ceil((n + 1) / m), n %= m), s = C(10, m - n), u = e[r] % s | 0, t == null ? n < 3 ? (n == 0 ? u = u / 100 | 0 : n == 1 && (u = u / 10 | 0), o = i < 4 && u == 99999 || i > 3 && u == 49999 || u == 5e4 || u == 0) : o = (i < 4 && u + 1 == s || i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 100 | 0) == C(10, n - 2) - 1 || (u == s / 2 || u == 0) && (e[r + 1] / s / 100 | 0) == 0 : n < 4 ? (n == 0 ? u = u / 1e3 | 0 : n == 1 ? u = u / 100 | 0 : n == 2 && (u = u / 10 | 0), o = (t || i < 4) && u == 9999 || !t && i > 3 && u == 4999) : o = ((t || i < 4) && u + 1 == s || !t && i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 1e3 | 0) == C(10, n - 3) - 1, o;
}
function ie(e, n, i) {
    for(var t, r = [
        0
    ], s, o = 0, u = e.length; o < u;){
        for(s = r.length; s--;)r[s] *= n;
        for(r[0] += we.indexOf(e.charAt(o++)), t = 0; t < r.length; t++)r[t] > i - 1 && (r[t + 1] === void 0 && (r[t + 1] = 0), r[t + 1] += r[t] / i | 0, r[t] %= i);
    }
    return r.reverse();
}
function sn(e, n) {
    var i, t, r;
    if (n.isZero()) return n;
    t = n.d.length, t < 32 ? (i = Math.ceil(t / 3), r = (1 / fe(4, i)).toString()) : (i = 16, r = "2.3283064365386962890625e-10"), e.precision += i, n = j(e, 1, n.times(r), new e(1));
    for(var s = i; s--;){
        var o = n.times(n);
        n = o.times(o).minus(o).times(8).plus(1);
    }
    return e.precision -= i, n;
}
var S = function() {
    function e(t, r, s) {
        var o, u = 0, l = t.length;
        for(t = t.slice(); l--;)o = t[l] * r + u, t[l] = o % s | 0, u = o / s | 0;
        return u && t.unshift(u), t;
    }
    function n(t, r, s, o) {
        var u, l;
        if (s != o) l = s > o ? 1 : -1;
        else for(u = l = 0; u < s; u++)if (t[u] != r[u]) {
            l = t[u] > r[u] ? 1 : -1;
            break;
        }
        return l;
    }
    function i(t, r, s, o) {
        for(var u = 0; s--;)t[s] -= u, u = t[s] < r[s] ? 1 : 0, t[s] = u * o + t[s] - r[s];
        for(; !t[0] && t.length > 1;)t.shift();
    }
    return function(t, r, s, o, u, l) {
        var f, c, a, d, g, v, N, A, M, q, E, P, Y, I, le, z, W, ce, T, y, ee = t.constructor, ae = t.s == r.s ? 1 : -1, R = t.d, k = r.d;
        if (!R || !R[0] || !k || !k[0]) return new ee(!t.s || !r.s || (R ? k && R[0] == k[0] : !k) ? NaN : R && R[0] == 0 || !k ? ae * 0 : ae / 0);
        for(l ? (g = 1, c = t.e - r.e) : (l = D, g = m, c = b(t.e / g) - b(r.e / g)), T = k.length, W = R.length, M = new ee(ae), q = M.d = [], a = 0; k[a] == (R[a] || 0); a++);
        if (k[a] > (R[a] || 0) && c--, s == null ? (I = s = ee.precision, o = ee.rounding) : u ? I = s + (t.e - r.e) + 1 : I = s, I < 0) q.push(1), v = !0;
        else {
            if (I = I / g + 2 | 0, a = 0, T == 1) {
                for(d = 0, k = k[0], I++; (a < W || d) && I--; a++)le = d * l + (R[a] || 0), q[a] = le / k | 0, d = le % k | 0;
                v = d || a < W;
            } else {
                for(d = l / (k[0] + 1) | 0, d > 1 && (k = e(k, d, l), R = e(R, d, l), T = k.length, W = R.length), z = T, E = R.slice(0, T), P = E.length; P < T;)E[P++] = 0;
                y = k.slice(), y.unshift(0), ce = k[0], k[1] >= l / 2 && ++ce;
                do d = 0, f = n(k, E, T, P), f < 0 ? (Y = E[0], T != P && (Y = Y * l + (E[1] || 0)), d = Y / ce | 0, d > 1 ? (d >= l && (d = l - 1), N = e(k, d, l), A = N.length, P = E.length, f = n(N, E, A, P), f == 1 && (d--, i(N, T < A ? y : k, A, l))) : (d == 0 && (f = d = 1), N = k.slice()), A = N.length, A < P && N.unshift(0), i(E, N, P, l), f == -1 && (P = E.length, f = n(k, E, T, P), f < 1 && (d++, i(E, T < P ? y : k, P, l))), P = E.length) : f === 0 && (d++, E = [
                    0
                ]), q[a++] = d, f && E[0] ? E[P++] = R[z] || 0 : (E = [
                    R[z]
                ], P = 1);
                while ((z++ < W || E[0] !== void 0) && I--)
                v = E[0] !== void 0;
            }
            q[0] || q.shift();
        }
        if (g == 1) M.e = c, Te = v;
        else {
            for(a = 1, d = q[0]; d >= 10; d /= 10)a++;
            M.e = a + c * g - 1, p(M, u ? s + M.e + 1 : s, o, v);
        }
        return M;
    };
}();
function p(e, n, i, t) {
    var r, s, o, u, l, f, c, a, d, g = e.constructor;
    e: if (n != null) {
        if (a = e.d, !a) return e;
        for(r = 1, u = a[0]; u >= 10; u /= 10)r++;
        if (s = n - r, s < 0) s += m, o = n, c = a[d = 0], l = c / C(10, r - o - 1) % 10 | 0;
        else if (d = Math.ceil((s + 1) / m), u = a.length, d >= u) if (t) {
            for(; u++ <= d;)a.push(0);
            c = l = 0, r = 1, s %= m, o = s - m + 1;
        } else break e;
        else {
            for(c = u = a[d], r = 1; u >= 10; u /= 10)r++;
            s %= m, o = s - m + r, l = o < 0 ? 0 : c / C(10, r - o - 1) % 10 | 0;
        }
        if (t = t || n < 0 || a[d + 1] !== void 0 || (o < 0 ? c : c % C(10, r - o - 1)), f = i < 4 ? (l || t) && (i == 0 || i == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (i == 4 || t || i == 6 && (s > 0 ? o > 0 ? c / C(10, r - o) : 0 : a[d - 1]) % 10 & 1 || i == (e.s < 0 ? 8 : 7)), n < 1 || !a[0]) return a.length = 0, f ? (n -= e.e + 1, a[0] = C(10, (m - n % m) % m), e.e = -n || 0) : a[0] = e.e = 0, e;
        if (s == 0 ? (a.length = d, u = 1, d--) : (a.length = d + 1, u = C(10, m - s), a[d] = o > 0 ? (c / C(10, r - o) % C(10, o) | 0) * u : 0), f) for(;;)if (d == 0) {
            for(s = 1, o = a[0]; o >= 10; o /= 10)s++;
            for(o = a[0] += u, u = 1; o >= 10; o /= 10)u++;
            s != u && (e.e++, a[0] == D && (a[0] = 1));
            break;
        } else {
            if (a[d] += u, a[d] != D) break;
            a[d--] = 0, u = 1;
        }
        for(s = a.length; a[--s] === 0;)a.pop();
    }
    return w && (e.e > g.maxE ? (e.d = null, e.e = NaN) : e.e < g.minE && (e.e = 0, e.d = [
        0
    ])), e;
}
function F(e, n, i) {
    if (!e.isFinite()) return Ve(e);
    var t, r = e.e, s = O(e.d), o = s.length;
    return n ? (i && (t = i - o) > 0 ? s = s.charAt(0) + "." + s.slice(1) + U(t) : o > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (s = "0." + U(-r - 1) + s, i && (t = i - o) > 0 && (s += U(t))) : r >= o ? (s += U(r + 1 - o), i && (t = i - r - 1) > 0 && (s = s + "." + U(t))) : ((t = r + 1) < o && (s = s.slice(0, t) + "." + s.slice(t)), i && (t = i - o) > 0 && (r + 1 === o && (s += "."), s += U(t))), s;
}
function ue(e, n) {
    var i = e[0];
    for(n *= m; i >= 10; i /= 10)n++;
    return n;
}
function se(e, n, i) {
    if (n > rn) throw w = !0, i && (e.precision = i), Error(Le);
    return p(new e(te), n, 1, !0);
}
function L(e, n, i) {
    if (n > ve) throw Error(Le);
    return p(new e(re), n, i, !0);
}
function Ze(e) {
    var n = e.length - 1, i = n * m + 1;
    if (n = e[n], n) {
        for(; n % 10 == 0; n /= 10)i--;
        for(n = e[0]; n >= 10; n /= 10)i++;
    }
    return i;
}
function U(e) {
    for(var n = ""; e--;)n += "0";
    return n;
}
function Ue(e, n, i, t) {
    var r, s = new e(1), o = Math.ceil(t / m + 4);
    for(w = !1;;){
        if (i % 2 && (s = s.times(n), _e(s.d, o) && (r = !0)), i = b(i / 2), i === 0) {
            i = s.d.length - 1, r && s.d[i] === 0 && ++s.d[i];
            break;
        }
        n = n.times(n), _e(n.d, o);
    }
    return w = !0, s;
}
function Ae(e) {
    return e.d[e.d.length - 1] & 1;
}
function Be(e, n, i) {
    for(var t, r = new e(n[0]), s = 0; ++s < n.length;)if (t = new e(n[s]), t.s) r[i](t) && (r = t);
    else {
        r = t;
        break;
    }
    return r;
}
function Ee(e, n) {
    var i, t, r, s, o, u, l, f = 0, c = 0, a = 0, d = e.constructor, g = d.rounding, v = d.precision;
    if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
    for(n == null ? (w = !1, l = v) : l = n, u = new d(.03125); e.e > -2;)e = e.times(u), a += 5;
    for(t = Math.log(C(2, a)) / Math.LN10 * 2 + 5 | 0, l += t, i = s = o = new d(1), d.precision = l;;){
        if (s = p(s.times(e), l, 1), i = i.times(++c), u = o.plus(S(s, i, l, 1)), O(u.d).slice(0, l) === O(o.d).slice(0, l)) {
            for(r = a; r--;)o = p(o.times(o), l, 1);
            if (n == null) if (f < 3 && x(o.d, l - t, g, f)) d.precision = l += 10, i = s = u = new d(1), c = 0, f++;
            else return p(o, d.precision = v, g, w = !0);
            else return d.precision = v, o;
        }
        o = u;
    }
}
function B(e, n) {
    var i, t, r, s, o, u, l, f, c, a, d, g = 1, v = 10, N = e, A = N.d, M = N.constructor, q = M.rounding, E = M.precision;
    if (N.s < 0 || !A || !A[0] || !N.e && A[0] == 1 && A.length == 1) return new M(A && !A[0] ? -1 / 0 : N.s != 1 ? NaN : A ? 0 : N);
    if (n == null ? (w = !1, c = E) : c = n, M.precision = c += v, i = O(A), t = i.charAt(0), Math.abs(s = N.e) < 15e14) {
        for(; t < 7 && t != 1 || t == 1 && i.charAt(1) > 3;)N = N.times(e), i = O(N.d), t = i.charAt(0), g++;
        s = N.e, t > 1 ? (N = new M("0." + i), s++) : N = new M(t + "." + i.slice(1));
    } else return f = se(M, c + 2, E).times(s + ""), N = B(new M(t + "." + i.slice(1)), c - v).plus(f), M.precision = E, n == null ? p(N, E, q, w = !0) : N;
    for(a = N, l = o = N = S(N.minus(1), N.plus(1), c, 1), d = p(N.times(N), c, 1), r = 3;;){
        if (o = p(o.times(d), c, 1), f = l.plus(S(o, new M(r), c, 1)), O(f.d).slice(0, c) === O(l.d).slice(0, c)) if (l = l.times(2), s !== 0 && (l = l.plus(se(M, c + 2, E).times(s + ""))), l = S(l, new M(g), c, 1), n == null) if (x(l.d, c - v, q, u)) M.precision = c += v, f = o = N = S(a.minus(1), a.plus(1), c, 1), d = p(N.times(N), c, 1), r = u = 1;
        else return p(l, M.precision = E, q, w = !0);
        else return M.precision = E, l;
        l = f, r += 2;
    }
}
function Ve(e) {
    return String(e.s * e.s / 0);
}
function Se(e, n) {
    var i, t, r;
    for((i = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (t = n.search(/e/i)) > 0 ? (i < 0 && (i = t), i += +n.slice(t + 1), n = n.substring(0, t)) : i < 0 && (i = n.length), t = 0; n.charCodeAt(t) === 48; t++);
    for(r = n.length; n.charCodeAt(r - 1) === 48; --r);
    if (n = n.slice(t, r), n) {
        if (r -= t, e.e = i = i - t - 1, e.d = [], t = (i + 1) % m, i < 0 && (t += m), t < r) {
            for(t && e.d.push(+n.slice(0, t)), r -= m; t < r;)e.d.push(+n.slice(t, t += m));
            n = n.slice(t), t = m - n.length;
        } else t -= r;
        for(; t--;)n += "0";
        e.d.push(+n), w && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [
            0
        ]));
    } else e.e = 0, e.d = [
        0
    ];
    return e;
}
function on(e, n) {
    var i, t, r, s, o, u, l, f, c;
    if (n.indexOf("_") > -1) {
        if (n = n.replace(/(\d)_(?=\d)/g, "$1"), Ie.test(n)) return Se(e, n);
    } else if (n === "Infinity" || n === "NaN") return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
    if (en.test(n)) i = 16, n = n.toLowerCase();
    else if (ye.test(n)) i = 2;
    else if (nn.test(n)) i = 8;
    else throw Error(V + n);
    for(s = n.search(/p/i), s > 0 ? (l = +n.slice(s + 1), n = n.substring(2, s)) : n = n.slice(2), s = n.indexOf("."), o = s >= 0, t = e.constructor, o && (n = n.replace(".", ""), u = n.length, s = u - s, r = Ue(t, new t(i), s, s * 2)), f = ie(n, i, D), c = f.length - 1, s = c; f[s] === 0; --s)f.pop();
    return s < 0 ? new t(e.s * 0) : (e.e = ue(f, c), e.d = f, w = !1, o && (e = S(e, r, u * 4)), l && (e = e.times(Math.abs(l) < 54 ? C(2, l) : Q.pow(2, l))), w = !0, e);
}
function un(e, n) {
    var i, t = n.d.length;
    if (t < 3) return n.isZero() ? n : j(e, 2, n, n);
    i = 1.4 * Math.sqrt(t), i = i > 16 ? 16 : i | 0, n = n.times(1 / fe(5, i)), n = j(e, 2, n, n);
    for(var r, s = new e(5), o = new e(16), u = new e(20); i--;)r = n.times(n), n = n.times(s.plus(r.times(o.times(r).minus(u))));
    return n;
}
function j(e, n, i, t, r) {
    var s, o, u, l, f = 1, c = e.precision, a = Math.ceil(c / m);
    for(w = !1, l = i.times(i), u = new e(t);;){
        if (o = S(u.times(l), new e(n++ * n++), c, 1), u = r ? t.plus(o) : t.minus(o), t = S(o.times(l), new e(n++ * n++), c, 1), o = u.plus(t), o.d[a] !== void 0) {
            for(s = a; o.d[s] === u.d[s] && s--;);
            if (s == -1) break;
        }
        s = u, u = t, t = o, o = s, f++;
    }
    return w = !0, o.d.length = a + 1, o;
}
function fe(e, n) {
    for(var i = e; --n;)i *= e;
    return i;
}
function $e(e, n) {
    var i, t = n.s < 0, r = L(e, e.precision, 1), s = r.times(.5);
    if (n = n.abs(), n.lte(s)) return Z = t ? 4 : 1, n;
    if (i = n.divToInt(r), i.isZero()) Z = t ? 3 : 2;
    else {
        if (n = n.minus(i.times(r)), n.lte(s)) return Z = Ae(i) ? t ? 2 : 3 : t ? 4 : 1, n;
        Z = Ae(i) ? t ? 1 : 4 : t ? 3 : 2;
    }
    return n.minus(r).abs();
}
function ke(e, n, i, t) {
    var r, s, o, u, l, f, c, a, d, g = e.constructor, v = i !== void 0;
    if (v ? (_(i, 1, $), t === void 0 ? t = g.rounding : _(t, 0, 8)) : (i = g.precision, t = g.rounding), !e.isFinite()) c = Ve(e);
    else {
        for(c = F(e), o = c.indexOf("."), v ? (r = 2, n == 16 ? i = i * 4 - 3 : n == 8 && (i = i * 3 - 2)) : r = n, o >= 0 && (c = c.replace(".", ""), d = new g(1), d.e = c.length - o, d.d = ie(F(d), 10, r), d.e = d.d.length), a = ie(c, 10, r), s = l = a.length; a[--l] == 0;)a.pop();
        if (!a[0]) c = v ? "0p+0" : "0";
        else {
            if (o < 0 ? s-- : (e = new g(e), e.d = a, e.e = s, e = S(e, d, i, t, 0, r), a = e.d, s = e.e, f = Te), o = a[i], u = r / 2, f = f || a[i + 1] !== void 0, f = t < 4 ? (o !== void 0 || f) && (t === 0 || t === (e.s < 0 ? 3 : 2)) : o > u || o === u && (t === 4 || f || t === 6 && a[i - 1] & 1 || t === (e.s < 0 ? 8 : 7)), a.length = i, f) for(; ++a[--i] > r - 1;)a[i] = 0, i || (++s, a.unshift(1));
            for(l = a.length; !a[l - 1]; --l);
            for(o = 0, c = ""; o < l; o++)c += we.charAt(a[o]);
            if (v) {
                if (l > 1) if (n == 16 || n == 8) {
                    for(o = n == 16 ? 4 : 3, --l; l % o; l++)c += "0";
                    for(a = ie(c, r, n), l = a.length; !a[l - 1]; --l);
                    for(o = 1, c = "1."; o < l; o++)c += we.charAt(a[o]);
                } else c = c.charAt(0) + "." + c.slice(1);
                c = c + (s < 0 ? "p" : "p+") + s;
            } else if (s < 0) {
                for(; ++s;)c = "0" + c;
                c = "0." + c;
            } else if (++s > l) for(s -= l; s--;)c += "0";
            else s < l && (c = c.slice(0, s) + "." + c.slice(s));
        }
        c = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + c;
    }
    return e.s < 0 ? "-" + c : c;
}
function _e(e, n) {
    if (e.length > n) return e.length = n, !0;
}
function fn(e) {
    return new this(e).abs();
}
function ln(e) {
    return new this(e).acos();
}
function cn(e) {
    return new this(e).acosh();
}
function an(e, n) {
    return new this(e).plus(n);
}
function dn(e) {
    return new this(e).asin();
}
function hn(e) {
    return new this(e).asinh();
}
function pn(e) {
    return new this(e).atan();
}
function gn(e) {
    return new this(e).atanh();
}
function mn(e, n) {
    e = new this(e), n = new this(n);
    var i, t = this.precision, r = this.rounding, s = t + 4;
    return !e.s || !n.s ? i = new this(NaN) : !e.d && !n.d ? (i = L(this, s, 1).times(n.s > 0 ? .25 : .75), i.s = e.s) : !n.d || e.isZero() ? (i = n.s < 0 ? L(this, t, r) : new this(0), i.s = e.s) : !e.d || n.isZero() ? (i = L(this, s, 1).times(.5), i.s = e.s) : n.s < 0 ? (this.precision = s, this.rounding = 1, i = this.atan(S(e, n, s, 1)), n = L(this, s, 1), this.precision = t, this.rounding = r, i = e.s < 0 ? i.minus(n) : i.plus(n)) : i = this.atan(S(e, n, s, 1)), i;
}
function wn(e) {
    return new this(e).cbrt();
}
function Nn(e) {
    return p(e = new this(e), e.e + 1, 2);
}
function vn(e, n, i) {
    return new this(e).clamp(n, i);
}
function En(e) {
    if (!e || typeof e != "object") throw Error(oe + "Object expected");
    var n, i, t, r = e.defaults === !0, s = [
        "precision",
        1,
        $,
        "rounding",
        0,
        8,
        "toExpNeg",
        -H,
        0,
        "toExpPos",
        0,
        H,
        "maxE",
        0,
        H,
        "minE",
        -H,
        0,
        "modulo",
        0,
        9
    ];
    for(n = 0; n < s.length; n += 3)if (i = s[n], r && (this[i] = Ne[i]), (t = e[i]) !== void 0) if (b(t) === t && t >= s[n + 1] && t <= s[n + 2]) this[i] = t;
    else throw Error(V + i + ": " + t);
    if (i = "crypto", r && (this[i] = Ne[i]), (t = e[i]) !== void 0) if (t === !0 || t === !1 || t === 0 || t === 1) if (t) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[i] = !0;
    else throw Error(De);
    else this[i] = !1;
    else throw Error(V + i + ": " + t);
    return this;
}
function Sn(e) {
    return new this(e).cos();
}
function kn(e) {
    return new this(e).cosh();
}
function He(e) {
    var n, i, t;
    function r(s) {
        var o, u, l, f = this;
        if (!(f instanceof r)) return new r(s);
        if (f.constructor = r, qe(s)) {
            f.s = s.s, w ? !s.d || s.e > r.maxE ? (f.e = NaN, f.d = null) : s.e < r.minE ? (f.e = 0, f.d = [
                0
            ]) : (f.e = s.e, f.d = s.d.slice()) : (f.e = s.e, f.d = s.d ? s.d.slice() : s.d);
            return;
        }
        if (l = typeof s, l === "number") {
            if (s === 0) {
                f.s = 1 / s < 0 ? -1 : 1, f.e = 0, f.d = [
                    0
                ];
                return;
            }
            if (s < 0 ? (s = -s, f.s = -1) : f.s = 1, s === ~~s && s < 1e7) {
                for(o = 0, u = s; u >= 10; u /= 10)o++;
                w ? o > r.maxE ? (f.e = NaN, f.d = null) : o < r.minE ? (f.e = 0, f.d = [
                    0
                ]) : (f.e = o, f.d = [
                    s
                ]) : (f.e = o, f.d = [
                    s
                ]);
                return;
            } else if (s * 0 !== 0) {
                s || (f.s = NaN), f.e = NaN, f.d = null;
                return;
            }
            return Se(f, s.toString());
        } else if (l !== "string") throw Error(V + s);
        return (u = s.charCodeAt(0)) === 45 ? (s = s.slice(1), f.s = -1) : (u === 43 && (s = s.slice(1)), f.s = 1), Ie.test(s) ? Se(f, s) : on(f, s);
    }
    if (r.prototype = h, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = En, r.clone = He, r.isDecimal = qe, r.abs = fn, r.acos = ln, r.acosh = cn, r.add = an, r.asin = dn, r.asinh = hn, r.atan = pn, r.atanh = gn, r.atan2 = mn, r.cbrt = wn, r.ceil = Nn, r.clamp = vn, r.cos = Sn, r.cosh = kn, r.div = Mn, r.exp = Cn, r.floor = On, r.hypot = Pn, r.ln = Rn, r.log = bn, r.log10 = _n, r.log2 = An, r.max = qn, r.min = Tn, r.mod = Ln, r.mul = Dn, r.pow = Fn, r.random = In, r.round = Zn, r.sign = Un, r.sin = Bn, r.sinh = Vn, r.sqrt = $n, r.sub = Hn, r.sum = jn, r.tan = Wn, r.tanh = Gn, r.trunc = Jn, e === void 0 && (e = {}), e && e.defaults !== !0) for(t = [
        "precision",
        "rounding",
        "toExpNeg",
        "toExpPos",
        "maxE",
        "minE",
        "modulo",
        "crypto"
    ], n = 0; n < t.length;)e.hasOwnProperty(i = t[n++]) || (e[i] = this[i]);
    return r.config(e), r;
}
function Mn(e, n) {
    return new this(e).div(n);
}
function Cn(e) {
    return new this(e).exp();
}
function On(e) {
    return p(e = new this(e), e.e + 1, 3);
}
function Pn() {
    var e, n, i = new this(0);
    for(w = !1, e = 0; e < arguments.length;)if (n = new this(arguments[e++]), n.d) i.d && (i = i.plus(n.times(n)));
    else {
        if (n.s) return w = !0, new this(1 / 0);
        i = n;
    }
    return w = !0, i.sqrt();
}
function qe(e) {
    return e instanceof Q || e && e.toStringTag === Fe || !1;
}
function Rn(e) {
    return new this(e).ln();
}
function bn(e, n) {
    return new this(e).log(n);
}
function An(e) {
    return new this(e).log(2);
}
function _n(e) {
    return new this(e).log(10);
}
function qn() {
    return Be(this, arguments, "lt");
}
function Tn() {
    return Be(this, arguments, "gt");
}
function Ln(e, n) {
    return new this(e).mod(n);
}
function Dn(e, n) {
    return new this(e).mul(n);
}
function Fn(e, n) {
    return new this(e).pow(n);
}
function In(e) {
    var n, i, t, r, s = 0, o = new this(1), u = [];
    if (e === void 0 ? e = this.precision : _(e, 1, $), t = Math.ceil(e / m), this.crypto) if (crypto.getRandomValues) for(n = crypto.getRandomValues(new Uint32Array(t)); s < t;)r = n[s], r >= 429e7 ? n[s] = crypto.getRandomValues(new Uint32Array(1))[0] : u[s++] = r % 1e7;
    else if (crypto.randomBytes) {
        for(n = crypto.randomBytes(t *= 4); s < t;)r = n[s] + (n[s + 1] << 8) + (n[s + 2] << 16) + ((n[s + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, s) : (u.push(r % 1e7), s += 4);
        s = t / 4;
    } else throw Error(De);
    else for(; s < t;)u[s++] = Math.random() * 1e7 | 0;
    for(t = u[--s], e %= m, t && e && (r = C(10, m - e), u[s] = (t / r | 0) * r); u[s] === 0; s--)u.pop();
    if (s < 0) i = 0, u = [
        0
    ];
    else {
        for(i = -1; u[0] === 0; i -= m)u.shift();
        for(t = 1, r = u[0]; r >= 10; r /= 10)t++;
        t < m && (i -= m - t);
    }
    return o.e = i, o.d = u, o;
}
function Zn(e) {
    return p(e = new this(e), e.e + 1, this.rounding);
}
function Un(e) {
    return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function Bn(e) {
    return new this(e).sin();
}
function Vn(e) {
    return new this(e).sinh();
}
function $n(e) {
    return new this(e).sqrt();
}
function Hn(e, n) {
    return new this(e).sub(n);
}
function jn() {
    var e = 0, n = arguments, i = new this(n[e]);
    for(w = !1; i.s && ++e < n.length;)i = i.plus(n[e]);
    return w = !0, p(i, this.precision, this.rounding);
}
function Wn(e) {
    return new this(e).tan();
}
function Gn(e) {
    return new this(e).tanh();
}
function Jn(e) {
    return p(e = new this(e), e.e + 1, 1);
}
h[Symbol.for("nodejs.util.inspect.custom")] = h.toString;
h[Symbol.toStringTag] = "Decimal";
var Q = h.constructor = He(Ne);
te = new Q(te);
re = new Q(re);
var je = Q;
0 && (module.exports = {
    Decimal,
    Public,
    getRuntime,
    makeStrictEnum,
    objectEnumValues
}); /*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/  //# sourceMappingURL=index-browser.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@prisma/client/default.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    ...__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/.prisma/client/default.js [instrumentation-edge] (ecmascript)")
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/.prisma/client/index-browser.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, "__esModule", {
    value: true
});
const { Decimal, objectEnumValues, makeStrictEnum, Public, getRuntime, skip } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@prisma/client/runtime/index-browser.js [instrumentation-edge] (ecmascript)");
const Prisma = {};
exports.Prisma = Prisma;
exports.$Enums = {};
/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */ Prisma.prismaVersion = {
    client: "5.22.0",
    engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
};
Prisma.PrismaClientKnownRequestError = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientUnknownRequestError = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientRustPanicError = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientInitializationError = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientValidationError = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.NotFoundError = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.Decimal = Decimal;
/**
 * Re-export of sql-template-tag
 */ Prisma.sql = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.empty = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.join = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.raw = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.validator = Public.validator;
/**
* Extensions
*/ Prisma.getExtensionContext = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.defineExtension = ()=>{
    const runtimeName = getRuntime().prettyName;
    throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
/**
 * Shorthand utilities for JSON filtering
 */ Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;
Prisma.NullTypes = {
    DbNull: objectEnumValues.classes.DbNull,
    JsonNull: objectEnumValues.classes.JsonNull,
    AnyNull: objectEnumValues.classes.AnyNull
};
/**
 * Enums
 */ exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.Prisma.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.AccountScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
};
exports.Prisma.ProfileScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    username: 'username',
    bio: 'bio',
    avatarUrl: 'avatarUrl',
    dateOfBirth: 'dateOfBirth',
    timezone: 'timezone',
    emailNotifications: 'emailNotifications',
    smsNotifications: 'smsNotifications',
    gradeLevel: 'gradeLevel',
    studentUniqueId: 'studentUniqueId',
    subjectsOfInterest: 'subjectsOfInterest',
    preferredLanguages: 'preferredLanguages',
    learningGoals: 'learningGoals',
    tosAccepted: 'tosAccepted',
    tosAcceptedAt: 'tosAcceptedAt',
    organizationName: 'organizationName',
    isOnboarded: 'isOnboarded',
    hourlyRate: 'hourlyRate',
    specialties: 'specialties',
    credentials: 'credentials',
    availability: 'availability',
    paidClassesEnabled: 'paidClassesEnabled',
    paymentGatewayPreference: 'paymentGatewayPreference',
    currency: 'currency',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.CurriculumCatalogScalarFieldEnum = {
    id: 'id',
    subject: 'subject',
    name: 'name',
    code: 'code',
    createdAt: 'createdAt'
};
exports.Prisma.CurriculumScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    subject: 'subject',
    gradeLevel: 'gradeLevel',
    difficulty: 'difficulty',
    estimatedHours: 'estimatedHours',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    creatorId: 'creatorId',
    isLiveOnline: 'isLiveOnline',
    languageOfInstruction: 'languageOfInstruction',
    price: 'price',
    currency: 'currency',
    curriculumSource: 'curriculumSource',
    outlineSource: 'outlineSource',
    schedule: 'schedule',
    courseMaterials: 'courseMaterials',
    coursePitch: 'coursePitch'
};
exports.Prisma.CurriculumShareScalarFieldEnum = {
    id: 'id',
    curriculumId: 'curriculumId',
    sharedByTutorId: 'sharedByTutorId',
    recipientId: 'recipientId',
    message: 'message',
    isPublic: 'isPublic',
    sharedAt: 'sharedAt'
};
exports.Prisma.CurriculumModuleScalarFieldEnum = {
    id: 'id',
    curriculumId: 'curriculumId',
    title: 'title',
    description: 'description',
    order: 'order',
    builderData: 'builderData'
};
exports.Prisma.CurriculumLessonScalarFieldEnum = {
    id: 'id',
    moduleId: 'moduleId',
    title: 'title',
    description: 'description',
    duration: 'duration',
    difficulty: 'difficulty',
    order: 'order',
    learningObjectives: 'learningObjectives',
    teachingPoints: 'teachingPoints',
    keyConcepts: 'keyConcepts',
    examples: 'examples',
    practiceProblems: 'practiceProblems',
    commonMisconceptions: 'commonMisconceptions',
    prerequisiteLessonIds: 'prerequisiteLessonIds',
    builderData: 'builderData'
};
exports.Prisma.LessonSessionScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    lessonId: 'lessonId',
    status: 'status',
    currentSection: 'currentSection',
    conceptMastery: 'conceptMastery',
    misconceptions: 'misconceptions',
    sessionContext: 'sessionContext',
    whiteboardItems: 'whiteboardItems',
    startedAt: 'startedAt',
    lastActivityAt: 'lastActivityAt',
    completedAt: 'completedAt'
};
exports.Prisma.CurriculumLessonProgressScalarFieldEnum = {
    id: 'id',
    lessonId: 'lessonId',
    studentId: 'studentId',
    status: 'status',
    currentSection: 'currentSection',
    score: 'score',
    completedAt: 'completedAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.CurriculumEnrollmentScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    curriculumId: 'curriculumId',
    batchId: 'batchId',
    enrolledAt: 'enrolledAt',
    completedAt: 'completedAt',
    lastActivity: 'lastActivity',
    lessonsCompleted: 'lessonsCompleted',
    enrollmentSource: 'enrollmentSource'
};
exports.Prisma.CourseBatchScalarFieldEnum = {
    id: 'id',
    curriculumId: 'curriculumId',
    name: 'name',
    startDate: 'startDate',
    order: 'order',
    difficulty: 'difficulty',
    schedule: 'schedule',
    price: 'price',
    currency: 'currency',
    languageOfInstruction: 'languageOfInstruction',
    isLive: 'isLive',
    meetingUrl: 'meetingUrl',
    maxStudents: 'maxStudents'
};
exports.Prisma.CurriculumProgressScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    curriculumId: 'curriculumId',
    lessonsCompleted: 'lessonsCompleted',
    totalLessons: 'totalLessons',
    currentLessonId: 'currentLessonId',
    averageScore: 'averageScore',
    isCompleted: 'isCompleted',
    startedAt: 'startedAt',
    completedAt: 'completedAt'
};
exports.Prisma.StudentPerformanceScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    curriculumId: 'curriculumId',
    averageScore: 'averageScore',
    completionRate: 'completionRate',
    engagementScore: 'engagementScore',
    attendanceRate: 'attendanceRate',
    participationRate: 'participationRate',
    strengths: 'strengths',
    weaknesses: 'weaknesses',
    taskHistory: 'taskHistory',
    commonMistakes: 'commonMistakes',
    skillBreakdown: 'skillBreakdown',
    cluster: 'cluster',
    learningStyle: 'learningStyle',
    pace: 'pace',
    recommendedPeers: 'recommendedPeers',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
};
exports.Prisma.TaskSubmissionScalarFieldEnum = {
    id: 'id',
    taskId: 'taskId',
    studentId: 'studentId',
    answers: 'answers',
    timeSpent: 'timeSpent',
    attempts: 'attempts',
    questionResults: 'questionResults',
    score: 'score',
    maxScore: 'maxScore',
    status: 'status',
    aiFeedback: 'aiFeedback',
    tutorFeedback: 'tutorFeedback',
    tutorApproved: 'tutorApproved',
    submittedAt: 'submittedAt',
    gradedAt: 'gradedAt'
};
exports.Prisma.FeedbackWorkflowScalarFieldEnum = {
    id: 'id',
    submissionId: 'submissionId',
    studentId: 'studentId',
    aiScore: 'aiScore',
    aiComments: 'aiComments',
    aiStrengths: 'aiStrengths',
    aiImprovements: 'aiImprovements',
    aiResources: 'aiResources',
    status: 'status',
    modifiedScore: 'modifiedScore',
    modifiedComments: 'modifiedComments',
    addedNotes: 'addedNotes',
    approvedAt: 'approvedAt',
    approvedBy: 'approvedBy',
    autoApproved: 'autoApproved',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.GeneratedTaskScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    roomId: 'roomId',
    title: 'title',
    description: 'description',
    type: 'type',
    difficulty: 'difficulty',
    questions: 'questions',
    distributionMode: 'distributionMode',
    assignments: 'assignments',
    documentSource: 'documentSource',
    status: 'status',
    createdAt: 'createdAt',
    assignedAt: 'assignedAt',
    lessonId: 'lessonId',
    batchId: 'batchId',
    dueDate: 'dueDate',
    maxScore: 'maxScore',
    timeLimitMinutes: 'timeLimitMinutes',
    enforceTimeLimit: 'enforceTimeLimit',
    enforceDueDate: 'enforceDueDate',
    maxAttempts: 'maxAttempts'
};
exports.Prisma.BreakoutSessionScalarFieldEnum = {
    id: 'id',
    mainRoomId: 'mainRoomId',
    tutorId: 'tutorId',
    roomCount: 'roomCount',
    participantsPerRoom: 'participantsPerRoom',
    distributionMode: 'distributionMode',
    timeLimit: 'timeLimit',
    aiAssistantEnabled: 'aiAssistantEnabled',
    status: 'status',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    createdAt: 'createdAt'
};
exports.Prisma.BreakoutRoomScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    name: 'name',
    aiEnabled: 'aiEnabled',
    aiMode: 'aiMode',
    assignedTaskId: 'assignedTaskId',
    status: 'status',
    endsAt: 'endsAt',
    aiNotes: 'aiNotes',
    alerts: 'alerts',
    createdAt: 'createdAt'
};
exports.Prisma.BreakoutRoomAssignmentScalarFieldEnum = {
    id: 'id',
    roomId: 'roomId',
    studentId: 'studentId',
    joinedAt: 'joinedAt',
    leftAt: 'leftAt'
};
exports.Prisma.AITutorEnrollmentScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    subjectCode: 'subjectCode',
    enrolledAt: 'enrolledAt',
    lastSessionAt: 'lastSessionAt',
    totalSessions: 'totalSessions',
    totalMinutes: 'totalMinutes',
    status: 'status'
};
exports.Prisma.AIInteractionSessionScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    subjectCode: 'subjectCode',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    messageCount: 'messageCount',
    topicsCovered: 'topicsCovered',
    summary: 'summary'
};
exports.Prisma.AITutorDailyUsageScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    date: 'date',
    sessionCount: 'sessionCount',
    messageCount: 'messageCount',
    minutesUsed: 'minutesUsed'
};
exports.Prisma.AITutorSubscriptionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tier: 'tier',
    dailySessions: 'dailySessions',
    dailyMessages: 'dailyMessages',
    startedAt: 'startedAt',
    expiresAt: 'expiresAt',
    isActive: 'isActive'
};
exports.Prisma.ContentItemScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    subject: 'subject',
    type: 'type',
    url: 'url',
    thumbnailUrl: 'thumbnailUrl',
    duration: 'duration',
    difficulty: 'difficulty',
    isPublished: 'isPublished',
    transcript: 'transcript',
    videoVariants: 'videoVariants',
    uploadStatus: 'uploadStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.VideoWatchEventScalarFieldEnum = {
    id: 'id',
    contentId: 'contentId',
    studentId: 'studentId',
    eventType: 'eventType',
    videoSeconds: 'videoSeconds',
    createdAt: 'createdAt',
    metadata: 'metadata'
};
exports.Prisma.ContentQuizCheckpointScalarFieldEnum = {
    id: 'id',
    contentId: 'contentId',
    videoTimestampSec: 'videoTimestampSec',
    title: 'title',
    questions: 'questions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.ContentProgressScalarFieldEnum = {
    id: 'id',
    contentId: 'contentId',
    studentId: 'studentId',
    progress: 'progress',
    completed: 'completed',
    lastPosition: 'lastPosition',
    updatedAt: 'updatedAt'
};
exports.Prisma.ReviewScheduleScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    contentId: 'contentId',
    lastReviewed: 'lastReviewed',
    nextReview: 'nextReview',
    interval: 'interval',
    easeFactor: 'easeFactor',
    stability: 'stability',
    repetitionCount: 'repetitionCount',
    performance: 'performance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.QuizAttemptScalarFieldEnum = {
    id: 'id',
    studentId: 'studentId',
    quizId: 'quizId',
    assignmentId: 'assignmentId',
    answers: 'answers',
    score: 'score',
    maxScore: 'maxScore',
    completedAt: 'completedAt',
    timeSpent: 'timeSpent',
    questionResults: 'questionResults',
    feedback: 'feedback',
    status: 'status',
    attemptNumber: 'attemptNumber',
    startedAt: 'startedAt'
};
exports.Prisma.QuestionBankItemScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    type: 'type',
    question: 'question',
    options: 'options',
    correctAnswer: 'correctAnswer',
    explanation: 'explanation',
    hint: 'hint',
    points: 'points',
    difficulty: 'difficulty',
    tags: 'tags',
    subject: 'subject',
    curriculumId: 'curriculumId',
    lessonId: 'lessonId',
    isPublic: 'isPublic',
    usageCount: 'usageCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.QuizScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    title: 'title',
    description: 'description',
    type: 'type',
    status: 'status',
    timeLimit: 'timeLimit',
    allowedAttempts: 'allowedAttempts',
    shuffleQuestions: 'shuffleQuestions',
    shuffleOptions: 'shuffleOptions',
    showCorrectAnswers: 'showCorrectAnswers',
    passingScore: 'passingScore',
    questions: 'questions',
    totalPoints: 'totalPoints',
    tags: 'tags',
    startDate: 'startDate',
    dueDate: 'dueDate',
    curriculumId: 'curriculumId',
    lessonId: 'lessonId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.QuizAssignmentScalarFieldEnum = {
    id: 'id',
    quizId: 'quizId',
    assignedByTutorId: 'assignedByTutorId',
    assignedToType: 'assignedToType',
    assignedToId: 'assignedToId',
    assignedToAll: 'assignedToAll',
    assignedAt: 'assignedAt',
    dueDate: 'dueDate',
    isActive: 'isActive'
};
exports.Prisma.NoteScalarFieldEnum = {
    id: 'id',
    contentId: 'contentId',
    studentId: 'studentId',
    content: 'content',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
};
exports.Prisma.BookmarkScalarFieldEnum = {
    id: 'id',
    contentId: 'contentId',
    studentId: 'studentId',
    createdAt: 'createdAt'
};
exports.Prisma.UserGamificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    level: 'level',
    xp: 'xp',
    streakDays: 'streakDays',
    longestStreak: 'longestStreak',
    lastLogin: 'lastLogin',
    lastActiveDate: 'lastActiveDate',
    totalStudyMinutes: 'totalStudyMinutes',
    grammarScore: 'grammarScore',
    vocabularyScore: 'vocabularyScore',
    speakingScore: 'speakingScore',
    listeningScore: 'listeningScore',
    confidenceScore: 'confidenceScore',
    fluencyScore: 'fluencyScore',
    unlockedWorlds: 'unlockedWorlds'
};
exports.Prisma.AchievementScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    description: 'description',
    unlockedAt: 'unlockedAt',
    xpAwarded: 'xpAwarded'
};
exports.Prisma.MissionScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    type: 'type',
    xpReward: 'xpReward',
    requirement: 'requirement',
    isActive: 'isActive'
};
exports.Prisma.MissionProgressScalarFieldEnum = {
    id: 'id',
    missionId: 'missionId',
    studentId: 'studentId',
    progress: 'progress',
    completed: 'completed',
    completedAt: 'completedAt'
};
exports.Prisma.UserDailyQuestScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    missionId: 'missionId',
    date: 'date',
    completed: 'completed'
};
exports.Prisma.BadgeScalarFieldEnum = {
    id: 'id',
    key: 'key',
    name: 'name',
    description: 'description',
    icon: 'icon',
    color: 'color',
    category: 'category',
    rarity: 'rarity',
    xpBonus: 'xpBonus',
    requirement: 'requirement',
    isSecret: 'isSecret',
    order: 'order',
    createdAt: 'createdAt'
};
exports.Prisma.UserBadgeScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    badgeId: 'badgeId',
    earnedAt: 'earnedAt',
    progress: 'progress'
};
exports.Prisma.LeaderboardEntryScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    score: 'score',
    rank: 'rank'
};
exports.Prisma.LiveSessionScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    curriculumId: 'curriculumId',
    title: 'title',
    subject: 'subject',
    description: 'description',
    gradeLevel: 'gradeLevel',
    type: 'type',
    scheduledAt: 'scheduledAt',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    maxStudents: 'maxStudents',
    status: 'status',
    roomId: 'roomId',
    roomUrl: 'roomUrl',
    recordingUrl: 'recordingUrl',
    recordingAvailableAt: 'recordingAvailableAt'
};
exports.Prisma.SessionReplayArtifactScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    tutorId: 'tutorId',
    recordingUrl: 'recordingUrl',
    transcript: 'transcript',
    summary: 'summary',
    summaryJson: 'summaryJson',
    status: 'status',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    generatedAt: 'generatedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.SessionParticipantScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    studentId: 'studentId',
    joinedAt: 'joinedAt',
    leftAt: 'leftAt'
};
exports.Prisma.PollScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    tutorId: 'tutorId',
    question: 'question',
    type: 'type',
    isAnonymous: 'isAnonymous',
    allowMultiple: 'allowMultiple',
    timeLimit: 'timeLimit',
    showResults: 'showResults',
    correctOptionId: 'correctOptionId',
    status: 'status',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    totalResponses: 'totalResponses',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.PollOptionScalarFieldEnum = {
    id: 'id',
    pollId: 'pollId',
    label: 'label',
    text: 'text',
    color: 'color',
    responseCount: 'responseCount',
    percentage: 'percentage'
};
exports.Prisma.PollResponseScalarFieldEnum = {
    id: 'id',
    pollId: 'pollId',
    respondentHash: 'respondentHash',
    optionIds: 'optionIds',
    rating: 'rating',
    textAnswer: 'textAnswer',
    studentId: 'studentId',
    createdAt: 'createdAt'
};
exports.Prisma.MessageScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    content: 'content',
    type: 'type',
    source: 'source',
    timestamp: 'timestamp'
};
exports.Prisma.ConversationScalarFieldEnum = {
    id: 'id',
    participant1Id: 'participant1Id',
    participant2Id: 'participant2Id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.DirectMessageScalarFieldEnum = {
    id: 'id',
    conversationId: 'conversationId',
    senderId: 'senderId',
    content: 'content',
    type: 'type',
    attachmentUrl: 'attachmentUrl',
    read: 'read',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
exports.Prisma.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    message: 'message',
    data: 'data',
    read: 'read',
    readAt: 'readAt',
    actionUrl: 'actionUrl',
    createdAt: 'createdAt'
};
exports.Prisma.NotificationPreferenceScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    emailEnabled: 'emailEnabled',
    pushEnabled: 'pushEnabled',
    inAppEnabled: 'inAppEnabled',
    channelOverrides: 'channelOverrides',
    quietHoursStart: 'quietHoursStart',
    quietHoursEnd: 'quietHoursEnd',
    timezone: 'timezone',
    emailDigest: 'emailDigest',
    updatedAt: 'updatedAt'
};
exports.Prisma.AIAssistantSessionScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    title: 'title',
    context: 'context',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.AIAssistantMessageScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    role: 'role',
    content: 'content',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.Prisma.AIAssistantInsightScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    type: 'type',
    title: 'title',
    content: 'content',
    relatedData: 'relatedData',
    applied: 'applied',
    createdAt: 'createdAt'
};
exports.Prisma.ClinicScalarFieldEnum = {
    id: 'id',
    title: 'title',
    subject: 'subject',
    description: 'description',
    tutorId: 'tutorId',
    startTime: 'startTime',
    duration: 'duration',
    maxStudents: 'maxStudents',
    status: 'status',
    roomUrl: 'roomUrl',
    roomId: 'roomId',
    requiresPayment: 'requiresPayment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.ClinicBookingScalarFieldEnum = {
    id: 'id',
    clinicId: 'clinicId',
    studentId: 'studentId',
    bookedAt: 'bookedAt',
    attended: 'attended',
    requiresPayment: 'requiresPayment'
};
exports.Prisma.PaymentScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    gateway: 'gateway',
    gatewayPaymentId: 'gatewayPaymentId',
    gatewayCheckoutUrl: 'gatewayCheckoutUrl',
    paidAt: 'paidAt',
    refundedAt: 'refundedAt',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    enrollmentId: 'enrollmentId',
    tutorId: 'tutorId'
};
exports.Prisma.RefundScalarFieldEnum = {
    id: 'id',
    paymentId: 'paymentId',
    amount: 'amount',
    reason: 'reason',
    status: 'status',
    gatewayRefundId: 'gatewayRefundId',
    processedAt: 'processedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.WebhookEventScalarFieldEnum = {
    id: 'id',
    paymentId: 'paymentId',
    gateway: 'gateway',
    eventType: 'eventType',
    payload: 'payload',
    processed: 'processed',
    processedAt: 'processedAt',
    createdAt: 'createdAt'
};
exports.Prisma.PayoutScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    method: 'method',
    details: 'details',
    notes: 'notes',
    requestedAt: 'requestedAt',
    processedAt: 'processedAt',
    completedAt: 'completedAt',
    transactionReference: 'transactionReference'
};
exports.Prisma.PaymentOnPayoutScalarFieldEnum = {
    id: 'id',
    paymentId: 'paymentId',
    payoutId: 'payoutId',
    amount: 'amount',
    createdAt: 'createdAt'
};
exports.Prisma.PlatformRevenueScalarFieldEnum = {
    id: 'id',
    paymentId: 'paymentId',
    amount: 'amount',
    month: 'month',
    createdAt: 'createdAt'
};
exports.Prisma.StudyGroupScalarFieldEnum = {
    id: 'id',
    name: 'name',
    subject: 'subject',
    description: 'description',
    maxMembers: 'maxMembers',
    createdBy: 'createdBy',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.StudyGroupMemberScalarFieldEnum = {
    id: 'id',
    groupId: 'groupId',
    studentId: 'studentId',
    joinedAt: 'joinedAt',
    role: 'role'
};
exports.Prisma.UserActivityLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    action: 'action',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.Prisma.ApiKeyScalarFieldEnum = {
    id: 'id',
    name: 'name',
    keyHash: 'keyHash',
    createdById: 'createdById',
    createdAt: 'createdAt',
    lastUsedAt: 'lastUsedAt'
};
exports.Prisma.SecurityEventScalarFieldEnum = {
    id: 'id',
    eventType: 'eventType',
    ip: 'ip',
    metadata: 'metadata',
    createdAt: 'createdAt',
    action: 'action',
    userId: 'userId',
    actorId: 'actorId',
    targetType: 'targetType',
    targetId: 'targetId',
    severity: 'severity',
    description: 'description',
    originIp: 'originIp',
    userAgent: 'userAgent',
    countryCode: 'countryCode',
    region: 'region',
    city: 'city',
    deviceId: 'deviceId',
    sessionId: 'sessionId',
    correlationId: 'correlationId',
    occurredAt: 'occurredAt'
};
exports.Prisma.PerformanceMetricScalarFieldEnum = {
    id: 'id',
    name: 'name',
    metricValue: 'metricValue',
    unit: 'unit',
    tags: 'tags',
    userId: 'userId',
    sessionId: 'sessionId',
    timestamp: 'timestamp'
};
exports.Prisma.PerformanceAlertScalarFieldEnum = {
    id: 'id',
    type: 'type',
    severity: 'severity',
    message: 'message',
    metric: 'metric',
    threshold: 'threshold',
    currentValue: 'currentValue',
    timestamp: 'timestamp',
    resolved: 'resolved',
    resolvedAt: 'resolvedAt'
};
exports.Prisma.ResourceScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    name: 'name',
    description: 'description',
    type: 'type',
    size: 'size',
    mimeType: 'mimeType',
    url: 'url',
    key: 'key',
    tags: 'tags',
    isPublic: 'isPublic',
    downloadCount: 'downloadCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.ResourceShareScalarFieldEnum = {
    id: 'id',
    resourceId: 'resourceId',
    sharedByTutorId: 'sharedByTutorId',
    recipientId: 'recipientId',
    curriculumId: 'curriculumId',
    sharedWithAll: 'sharedWithAll',
    message: 'message',
    createdAt: 'createdAt'
};
exports.Prisma.LibraryTaskScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    question: 'question',
    type: 'type',
    options: 'options',
    correctAnswer: 'correctAnswer',
    explanation: 'explanation',
    difficulty: 'difficulty',
    subject: 'subject',
    topics: 'topics',
    isFavorite: 'isFavorite',
    usageCount: 'usageCount',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.AdminRoleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    permissions: 'permissions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.AdminAssignmentScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    roleId: 'roleId',
    assignedBy: 'assignedBy',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    isActive: 'isActive'
};
exports.Prisma.FeatureFlagScalarFieldEnum = {
    id: 'id',
    key: 'key',
    name: 'name',
    description: 'description',
    enabled: 'enabled',
    scope: 'scope',
    targetValue: 'targetValue',
    config: 'config',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.Prisma.FeatureFlagChangeScalarFieldEnum = {
    id: 'id',
    flagId: 'flagId',
    changedBy: 'changedBy',
    previousValue: 'previousValue',
    newValue: 'newValue',
    changeReason: 'changeReason',
    createdAt: 'createdAt'
};
exports.Prisma.LlmProviderScalarFieldEnum = {
    id: 'id',
    name: 'name',
    providerType: 'providerType',
    apiKeyEncrypted: 'apiKeyEncrypted',
    baseUrl: 'baseUrl',
    isActive: 'isActive',
    isDefault: 'isDefault',
    priority: 'priority',
    config: 'config',
    rateLimits: 'rateLimits',
    costPer1kTokens: 'costPer1kTokens',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.LlmModelScalarFieldEnum = {
    id: 'id',
    providerId: 'providerId',
    modelId: 'modelId',
    name: 'name',
    description: 'description',
    maxTokens: 'maxTokens',
    supportsVision: 'supportsVision',
    supportsFunctions: 'supportsFunctions',
    isActive: 'isActive',
    config: 'config',
    createdAt: 'createdAt'
};
exports.Prisma.LlmRoutingRuleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    priority: 'priority',
    conditions: 'conditions',
    targetModelId: 'targetModelId',
    fallbackModelId: 'fallbackModelId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    providerId: 'providerId'
};
exports.Prisma.SystemSettingScalarFieldEnum = {
    id: 'id',
    category: 'category',
    key: 'key',
    settingValue: 'settingValue',
    valueType: 'valueType',
    description: 'description',
    isEditable: 'isEditable',
    requiresRestart: 'requiresRestart',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.AdminAuditLogScalarFieldEnum = {
    id: 'id',
    adminId: 'adminId',
    action: 'action',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    previousState: 'previousState',
    newState: 'newState',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
};
exports.Prisma.AdminSessionScalarFieldEnum = {
    id: 'id',
    adminId: 'adminId',
    token: 'token',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    startedAt: 'startedAt',
    lastActiveAt: 'lastActiveAt',
    expiresAt: 'expiresAt',
    isRevoked: 'isRevoked'
};
exports.Prisma.IpWhitelistScalarFieldEnum = {
    id: 'id',
    ipAddress: 'ipAddress',
    description: 'description',
    isActive: 'isActive',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
};
exports.Prisma.CalendarConnectionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
    syncEnabled: 'syncEnabled',
    syncDirection: 'syncDirection',
    lastSyncedAt: 'lastSyncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.CalendarEventScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    title: 'title',
    description: 'description',
    type: 'type',
    status: 'status',
    startTime: 'startTime',
    endTime: 'endTime',
    timezone: 'timezone',
    isAllDay: 'isAllDay',
    recurrenceRule: 'recurrenceRule',
    recurringEventId: 'recurringEventId',
    isRecurring: 'isRecurring',
    location: 'location',
    meetingUrl: 'meetingUrl',
    isVirtual: 'isVirtual',
    curriculumId: 'curriculumId',
    batchId: 'batchId',
    studentId: 'studentId',
    attendees: 'attendees',
    maxAttendees: 'maxAttendees',
    reminders: 'reminders',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    externalId: 'externalId',
    deletedAt: 'deletedAt',
    isCancelled: 'isCancelled'
};
exports.Prisma.CalendarAvailabilityScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    dayOfWeek: 'dayOfWeek',
    startTime: 'startTime',
    endTime: 'endTime',
    timezone: 'timezone',
    isAvailable: 'isAvailable',
    validFrom: 'validFrom',
    validUntil: 'validUntil',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.CalendarExceptionScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    date: 'date',
    isAvailable: 'isAvailable',
    startTime: 'startTime',
    endTime: 'endTime',
    reason: 'reason',
    createdAt: 'createdAt'
};
exports.Prisma.WhiteboardScalarFieldEnum = {
    id: 'id',
    tutorId: 'tutorId',
    sessionId: 'sessionId',
    roomId: 'roomId',
    curriculumId: 'curriculumId',
    lessonId: 'lessonId',
    title: 'title',
    description: 'description',
    isTemplate: 'isTemplate',
    isPublic: 'isPublic',
    width: 'width',
    height: 'height',
    backgroundColor: 'backgroundColor',
    backgroundStyle: 'backgroundStyle',
    backgroundImage: 'backgroundImage',
    collaborators: 'collaborators',
    visibility: 'visibility',
    isBroadcasting: 'isBroadcasting',
    ownerType: 'ownerType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.Prisma.WhiteboardPageScalarFieldEnum = {
    id: 'id',
    whiteboardId: 'whiteboardId',
    name: 'name',
    order: 'order',
    backgroundColor: 'backgroundColor',
    backgroundStyle: 'backgroundStyle',
    backgroundImage: 'backgroundImage',
    strokes: 'strokes',
    shapes: 'shapes',
    texts: 'texts',
    images: 'images',
    viewState: 'viewState',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.WhiteboardSnapshotScalarFieldEnum = {
    id: 'id',
    whiteboardId: 'whiteboardId',
    name: 'name',
    thumbnailUrl: 'thumbnailUrl',
    pages: 'pages',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
};
exports.Prisma.WhiteboardSessionScalarFieldEnum = {
    id: 'id',
    whiteboardId: 'whiteboardId',
    roomId: 'roomId',
    tutorId: 'tutorId',
    participants: 'participants',
    isActive: 'isActive',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    operations: 'operations',
    finalPageStates: 'finalPageStates'
};
exports.Prisma.MathWhiteboardSessionScalarFieldEnum = {
    id: 'id',
    liveSessionId: 'liveSessionId',
    tutorId: 'tutorId',
    title: 'title',
    description: 'description',
    status: 'status',
    isLocked: 'isLocked',
    allowStudentEdit: 'allowStudentEdit',
    allowStudentTools: 'allowStudentTools',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    endedAt: 'endedAt'
};
exports.Prisma.MathWhiteboardPageScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    name: 'name',
    order: 'order',
    width: 'width',
    height: 'height',
    backgroundType: 'backgroundType',
    backgroundColor: 'backgroundColor',
    elements: 'elements',
    vectorClock: 'vectorClock',
    lastModified: 'lastModified',
    modifiedBy: 'modifiedBy',
    createdAt: 'createdAt'
};
exports.Prisma.MathWhiteboardParticipantScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    role: 'role',
    canEdit: 'canEdit',
    canChat: 'canChat',
    canUseAI: 'canUseAI',
    cursorX: 'cursorX',
    cursorY: 'cursorY',
    cursorColor: 'cursorColor',
    isTyping: 'isTyping',
    joinedAt: 'joinedAt',
    leftAt: 'leftAt'
};
exports.Prisma.MathWhiteboardSnapshotScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    name: 'name',
    description: 'description',
    thumbnailUrl: 'thumbnailUrl',
    pages: 'pages',
    viewState: 'viewState',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
};
exports.Prisma.MathAIInteractionScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    type: 'type',
    inputText: 'inputText',
    inputLatex: 'inputLatex',
    inputImage: 'inputImage',
    output: 'output',
    outputLatex: 'outputLatex',
    modelUsed: 'modelUsed',
    latencyMs: 'latencyMs',
    tokensUsed: 'tokensUsed',
    steps: 'steps',
    createdAt: 'createdAt'
};
exports.Prisma.FamilyAccountScalarFieldEnum = {
    id: 'id',
    familyName: 'familyName',
    familyType: 'familyType',
    primaryEmail: 'primaryEmail',
    phoneNumber: 'phoneNumber',
    address: 'address',
    country: 'country',
    timezone: 'timezone',
    defaultCurrency: 'defaultCurrency',
    monthlyBudget: 'monthlyBudget',
    enableBudget: 'enableBudget',
    allowAdults: 'allowAdults',
    isActive: 'isActive',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    verifiedAt: 'verifiedAt'
};
exports.Prisma.FamilyMemberScalarFieldEnum = {
    id: 'id',
    familyAccountId: 'familyAccountId',
    userId: 'userId',
    name: 'name',
    relation: 'relation',
    email: 'email',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.FamilyBudgetScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    month: 'month',
    year: 'year',
    amount: 'amount',
    spent: 'spent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.FamilyPaymentScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    amount: 'amount',
    method: 'method',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.BudgetAlertScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    type: 'type',
    message: 'message',
    isRead: 'isRead',
    createdAt: 'createdAt'
};
exports.Prisma.ParentActivityLogScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    action: 'action',
    details: 'details',
    createdAt: 'createdAt'
};
exports.Prisma.FamilyNotificationScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    title: 'title',
    message: 'message',
    isRead: 'isRead',
    createdAt: 'createdAt'
};
exports.Prisma.EmergencyContactScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    name: 'name',
    relation: 'relation',
    phone: 'phone',
    email: 'email',
    isPrimary: 'isPrimary',
    createdAt: 'createdAt'
};
exports.Prisma.StudentProgressSnapshotScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    studentId: 'studentId',
    data: 'data',
    capturedAt: 'capturedAt'
};
exports.Prisma.ParentPaymentAuthorizationScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    level: 'level',
    maxAmount: 'maxAmount',
    methods: 'methods',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.ParentSpendingLimitScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    category: 'category',
    limit: 'limit',
    period: 'period',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.Prisma.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.Prisma.NullableJsonNullValueInput = {
    DbNull: Prisma.DbNull,
    JsonNull: Prisma.JsonNull
};
exports.Prisma.JsonNullValueInput = {
    JsonNull: Prisma.JsonNull
};
exports.Prisma.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.Prisma.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.Prisma.JsonNullValueFilter = {
    DbNull: Prisma.DbNull,
    JsonNull: Prisma.JsonNull,
    AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
    STUDENT: 'STUDENT',
    TUTOR: 'TUTOR',
    PARENT: 'PARENT',
    ADMIN: 'ADMIN'
};
exports.Tier = exports.$Enums.Tier = {
    FREE: 'FREE',
    PRO: 'PRO',
    ELITE: 'ELITE'
};
exports.SessionType = exports.$Enums.SessionType = {
    CLINIC: 'CLINIC',
    GROUP: 'GROUP',
    ONE_ON_ONE: 'ONE_ON_ONE'
};
exports.PollType = exports.$Enums.PollType = {
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    TRUE_FALSE: 'TRUE_FALSE',
    RATING: 'RATING',
    SHORT_ANSWER: 'SHORT_ANSWER',
    WORD_CLOUD: 'WORD_CLOUD'
};
exports.PollStatus = exports.$Enums.PollStatus = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    CLOSED: 'CLOSED'
};
exports.MessageSource = exports.$Enums.MessageSource = {
    AI: 'AI',
    TUTOR: 'TUTOR',
    STUDENT: 'STUDENT'
};
exports.PaymentStatus = exports.$Enums.PaymentStatus = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
    CANCELLED: 'CANCELLED'
};
exports.PaymentGateway = exports.$Enums.PaymentGateway = {
    AIRWALLEX: 'AIRWALLEX',
    HITPAY: 'HITPAY'
};
exports.RefundStatus = exports.$Enums.RefundStatus = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};
exports.EventType = exports.$Enums.EventType = {
    LESSON: 'LESSON',
    CLINIC: 'CLINIC',
    CONSULTATION: 'CONSULTATION',
    BREAK: 'BREAK',
    PERSONAL: 'PERSONAL',
    OTHER: 'OTHER'
};
exports.EventStatus = exports.$Enums.EventStatus = {
    CONFIRMED: 'CONFIRMED',
    TENTATIVE: 'TENTATIVE',
    CANCELLED: 'CANCELLED'
};
exports.MathSessionStatus = exports.$Enums.MathSessionStatus = {
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    ENDED: 'ENDED',
    ARCHIVED: 'ARCHIVED'
};
exports.MathAIInteractionType = exports.$Enums.MathAIInteractionType = {
    SOLVE: 'SOLVE',
    HINT: 'HINT',
    CHECK: 'CHECK',
    EXPLAIN: 'EXPLAIN',
    RECOGNIZE: 'RECOGNIZE'
};
exports.Prisma.ModelName = {
    User: 'User',
    Account: 'Account',
    Profile: 'Profile',
    CurriculumCatalog: 'CurriculumCatalog',
    Curriculum: 'Curriculum',
    CurriculumShare: 'CurriculumShare',
    CurriculumModule: 'CurriculumModule',
    CurriculumLesson: 'CurriculumLesson',
    LessonSession: 'LessonSession',
    CurriculumLessonProgress: 'CurriculumLessonProgress',
    CurriculumEnrollment: 'CurriculumEnrollment',
    CourseBatch: 'CourseBatch',
    CurriculumProgress: 'CurriculumProgress',
    StudentPerformance: 'StudentPerformance',
    TaskSubmission: 'TaskSubmission',
    FeedbackWorkflow: 'FeedbackWorkflow',
    GeneratedTask: 'GeneratedTask',
    BreakoutSession: 'BreakoutSession',
    BreakoutRoom: 'BreakoutRoom',
    BreakoutRoomAssignment: 'BreakoutRoomAssignment',
    AITutorEnrollment: 'AITutorEnrollment',
    AIInteractionSession: 'AIInteractionSession',
    AITutorDailyUsage: 'AITutorDailyUsage',
    AITutorSubscription: 'AITutorSubscription',
    ContentItem: 'ContentItem',
    VideoWatchEvent: 'VideoWatchEvent',
    ContentQuizCheckpoint: 'ContentQuizCheckpoint',
    ContentProgress: 'ContentProgress',
    ReviewSchedule: 'ReviewSchedule',
    QuizAttempt: 'QuizAttempt',
    QuestionBankItem: 'QuestionBankItem',
    Quiz: 'Quiz',
    QuizAssignment: 'QuizAssignment',
    Note: 'Note',
    Bookmark: 'Bookmark',
    UserGamification: 'UserGamification',
    Achievement: 'Achievement',
    Mission: 'Mission',
    MissionProgress: 'MissionProgress',
    UserDailyQuest: 'UserDailyQuest',
    Badge: 'Badge',
    UserBadge: 'UserBadge',
    LeaderboardEntry: 'LeaderboardEntry',
    LiveSession: 'LiveSession',
    SessionReplayArtifact: 'SessionReplayArtifact',
    SessionParticipant: 'SessionParticipant',
    Poll: 'Poll',
    PollOption: 'PollOption',
    PollResponse: 'PollResponse',
    Message: 'Message',
    Conversation: 'Conversation',
    DirectMessage: 'DirectMessage',
    Notification: 'Notification',
    NotificationPreference: 'NotificationPreference',
    AIAssistantSession: 'AIAssistantSession',
    AIAssistantMessage: 'AIAssistantMessage',
    AIAssistantInsight: 'AIAssistantInsight',
    Clinic: 'Clinic',
    ClinicBooking: 'ClinicBooking',
    Payment: 'Payment',
    Refund: 'Refund',
    WebhookEvent: 'WebhookEvent',
    Payout: 'Payout',
    PaymentOnPayout: 'PaymentOnPayout',
    PlatformRevenue: 'PlatformRevenue',
    StudyGroup: 'StudyGroup',
    StudyGroupMember: 'StudyGroupMember',
    UserActivityLog: 'UserActivityLog',
    ApiKey: 'ApiKey',
    SecurityEvent: 'SecurityEvent',
    PerformanceMetric: 'PerformanceMetric',
    PerformanceAlert: 'PerformanceAlert',
    Resource: 'Resource',
    ResourceShare: 'ResourceShare',
    LibraryTask: 'LibraryTask',
    AdminRole: 'AdminRole',
    AdminAssignment: 'AdminAssignment',
    FeatureFlag: 'FeatureFlag',
    FeatureFlagChange: 'FeatureFlagChange',
    LlmProvider: 'LlmProvider',
    LlmModel: 'LlmModel',
    LlmRoutingRule: 'LlmRoutingRule',
    SystemSetting: 'SystemSetting',
    AdminAuditLog: 'AdminAuditLog',
    AdminSession: 'AdminSession',
    IpWhitelist: 'IpWhitelist',
    CalendarConnection: 'CalendarConnection',
    CalendarEvent: 'CalendarEvent',
    CalendarAvailability: 'CalendarAvailability',
    CalendarException: 'CalendarException',
    Whiteboard: 'Whiteboard',
    WhiteboardPage: 'WhiteboardPage',
    WhiteboardSnapshot: 'WhiteboardSnapshot',
    WhiteboardSession: 'WhiteboardSession',
    MathWhiteboardSession: 'MathWhiteboardSession',
    MathWhiteboardPage: 'MathWhiteboardPage',
    MathWhiteboardParticipant: 'MathWhiteboardParticipant',
    MathWhiteboardSnapshot: 'MathWhiteboardSnapshot',
    MathAIInteraction: 'MathAIInteraction',
    FamilyAccount: 'FamilyAccount',
    FamilyMember: 'FamilyMember',
    FamilyBudget: 'FamilyBudget',
    FamilyPayment: 'FamilyPayment',
    BudgetAlert: 'BudgetAlert',
    ParentActivityLog: 'ParentActivityLog',
    FamilyNotification: 'FamilyNotification',
    EmergencyContact: 'EmergencyContact',
    StudentProgressSnapshot: 'StudentProgressSnapshot',
    ParentPaymentAuthorization: 'ParentPaymentAuthorization',
    ParentSpendingLimit: 'ParentSpendingLimit'
};
/**
 * This is a stub Prisma Client that will error at runtime if called.
 */ class PrismaClient {
    constructor(){
        return new Proxy(this, {
            get (target, prop) {
                let message;
                const runtime = getRuntime();
                if (runtime.isEdge) {
                    message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
                } else {
                    message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).';
                }
                message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;
                throw new Error(message);
            }
        });
    }
}
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/.prisma/client/default.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    ...__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/.prisma/client/index-browser.js [instrumentation-edge] (ecmascript)")
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@ioredis/commands/built/commands.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"acl\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"append\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"asking\":{\"arity\":1,\"flags\":[\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"auth\":{\"arity\":-2,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"no_auth\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"bgrewriteaof\":{\"arity\":1,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"bgsave\":{\"arity\":-1,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"bitcount\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"bitfield\":{\"arity\":-2,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"bitfield_ro\":{\"arity\":-2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"bitop\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":2,\"keyStop\":-1,\"step\":1},\"bitpos\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"blmove\":{\"arity\":6,\"flags\":[\"write\",\"denyoom\",\"noscript\",\"blocking\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"blmpop\":{\"arity\":-5,\"flags\":[\"write\",\"blocking\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"blpop\":{\"arity\":-3,\"flags\":[\"write\",\"noscript\",\"blocking\"],\"keyStart\":1,\"keyStop\":-2,\"step\":1},\"brpop\":{\"arity\":-3,\"flags\":[\"write\",\"noscript\",\"blocking\"],\"keyStart\":1,\"keyStop\":-2,\"step\":1},\"brpoplpush\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"noscript\",\"blocking\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"bzmpop\":{\"arity\":-5,\"flags\":[\"write\",\"blocking\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"bzpopmax\":{\"arity\":-3,\"flags\":[\"write\",\"noscript\",\"blocking\",\"fast\"],\"keyStart\":1,\"keyStop\":-2,\"step\":1},\"bzpopmin\":{\"arity\":-3,\"flags\":[\"write\",\"noscript\",\"blocking\",\"fast\"],\"keyStart\":1,\"keyStop\":-2,\"step\":1},\"client\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"cluster\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"command\":{\"arity\":-1,\"flags\":[\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"config\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"copy\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"dbsize\":{\"arity\":1,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"debug\":{\"arity\":-2,\"flags\":[\"admin\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"decr\":{\"arity\":2,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"decrby\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"del\":{\"arity\":-2,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"discard\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"dump\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"echo\":{\"arity\":2,\"flags\":[\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"eval\":{\"arity\":-3,\"flags\":[\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"eval_ro\":{\"arity\":-3,\"flags\":[\"readonly\",\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"evalsha\":{\"arity\":-3,\"flags\":[\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"evalsha_ro\":{\"arity\":-3,\"flags\":[\"readonly\",\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"exec\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"skip_slowlog\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"exists\":{\"arity\":-2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"expire\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"expireat\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"expiretime\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"failover\":{\"arity\":-1,\"flags\":[\"admin\",\"noscript\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"fcall\":{\"arity\":-3,\"flags\":[\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"fcall_ro\":{\"arity\":-3,\"flags\":[\"readonly\",\"noscript\",\"stale\",\"skip_monitor\",\"no_mandatory_keys\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"flushall\":{\"arity\":-1,\"flags\":[\"write\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"flushdb\":{\"arity\":-1,\"flags\":[\"write\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"function\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"geoadd\":{\"arity\":-5,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geodist\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geohash\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geopos\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"georadius\":{\"arity\":-6,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"georadius_ro\":{\"arity\":-6,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"georadiusbymember\":{\"arity\":-5,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"georadiusbymember_ro\":{\"arity\":-5,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geosearch\":{\"arity\":-7,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"geosearchstore\":{\"arity\":-8,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"get\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getbit\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getdel\":{\"arity\":2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getex\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getrange\":{\"arity\":4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"getset\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hdel\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hello\":{\"arity\":-1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"no_auth\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"hexists\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hexpire\":{\"arity\":-6,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hpexpire\":{\"arity\":-6,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hget\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hgetall\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hincrby\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hincrbyfloat\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hkeys\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hlen\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hmget\":{\"arity\":-3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hmset\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hrandfield\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hscan\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hset\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hsetnx\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hstrlen\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"hvals\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"incr\":{\"arity\":2,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"incrby\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"incrbyfloat\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"info\":{\"arity\":-1,\"flags\":[\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"keys\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"lastsave\":{\"arity\":1,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"latency\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"lcs\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"lindex\":{\"arity\":3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"linsert\":{\"arity\":5,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"llen\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lmove\":{\"arity\":5,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"lmpop\":{\"arity\":-4,\"flags\":[\"write\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"lolwut\":{\"arity\":-1,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"lpop\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lpos\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lpush\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lpushx\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lrange\":{\"arity\":4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lrem\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"lset\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"ltrim\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"memory\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"mget\":{\"arity\":-2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"migrate\":{\"arity\":-6,\"flags\":[\"write\",\"movablekeys\"],\"keyStart\":3,\"keyStop\":3,\"step\":1},\"module\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"monitor\":{\"arity\":1,\"flags\":[\"admin\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"move\":{\"arity\":3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"mset\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":2},\"msetnx\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":2},\"multi\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"object\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"persist\":{\"arity\":2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pexpire\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pexpireat\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pexpiretime\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pfadd\":{\"arity\":-2,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"pfcount\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"pfdebug\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"admin\"],\"keyStart\":2,\"keyStop\":2,\"step\":1},\"pfmerge\":{\"arity\":-2,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"pfselftest\":{\"arity\":1,\"flags\":[\"admin\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"ping\":{\"arity\":-1,\"flags\":[\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"psetex\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"psubscribe\":{\"arity\":-2,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"psync\":{\"arity\":-3,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\",\"no_multi\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"pttl\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"publish\":{\"arity\":3,\"flags\":[\"pubsub\",\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"pubsub\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"punsubscribe\":{\"arity\":-1,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"quit\":{\"arity\":-1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"no_auth\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"randomkey\":{\"arity\":1,\"flags\":[\"readonly\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"readonly\":{\"arity\":1,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"readwrite\":{\"arity\":1,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"rename\":{\"arity\":3,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"renamenx\":{\"arity\":3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"replconf\":{\"arity\":-1,\"flags\":[\"admin\",\"noscript\",\"loading\",\"stale\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"replicaof\":{\"arity\":3,\"flags\":[\"admin\",\"noscript\",\"stale\",\"no_async_loading\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"reset\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"no_auth\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"restore\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"restore-asking\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"asking\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"role\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"rpop\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"rpoplpush\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"rpush\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"rpushx\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"sadd\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"save\":{\"arity\":1,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\",\"no_multi\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"scan\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"scard\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"script\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"sdiff\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sdiffstore\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"select\":{\"arity\":2,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"set\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"setbit\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"setex\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"setnx\":{\"arity\":3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"setrange\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"shutdown\":{\"arity\":-1,\"flags\":[\"admin\",\"noscript\",\"loading\",\"stale\",\"no_multi\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"sinter\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sintercard\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"sinterstore\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sismember\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"slaveof\":{\"arity\":3,\"flags\":[\"admin\",\"noscript\",\"stale\",\"no_async_loading\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"slowlog\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"smembers\":{\"arity\":2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"smismember\":{\"arity\":-3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"smove\":{\"arity\":4,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"sort\":{\"arity\":-2,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"sort_ro\":{\"arity\":-2,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"spop\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"spublish\":{\"arity\":3,\"flags\":[\"pubsub\",\"loading\",\"stale\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"srandmember\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"srem\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"sscan\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"ssubscribe\":{\"arity\":-2,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"strlen\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"subscribe\":{\"arity\":-2,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"substr\":{\"arity\":4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"sunion\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sunionstore\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"sunsubscribe\":{\"arity\":-1,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"swapdb\":{\"arity\":3,\"flags\":[\"write\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"sync\":{\"arity\":1,\"flags\":[\"admin\",\"noscript\",\"no_async_loading\",\"no_multi\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"time\":{\"arity\":1,\"flags\":[\"loading\",\"stale\",\"fast\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"touch\":{\"arity\":-2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"ttl\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"type\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"unlink\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"unsubscribe\":{\"arity\":-1,\"flags\":[\"pubsub\",\"noscript\",\"loading\",\"stale\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"unwatch\":{\"arity\":1,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"allow_busy\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"wait\":{\"arity\":3,\"flags\":[\"noscript\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"watch\":{\"arity\":-2,\"flags\":[\"noscript\",\"loading\",\"stale\",\"fast\",\"allow_busy\"],\"keyStart\":1,\"keyStop\":-1,\"step\":1},\"xack\":{\"arity\":-4,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xadd\":{\"arity\":-5,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xautoclaim\":{\"arity\":-6,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xclaim\":{\"arity\":-6,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xdel\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xdelex\":{\"arity\":-5,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xgroup\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"xinfo\":{\"arity\":-2,\"flags\":[],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"xlen\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xpending\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xrange\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xread\":{\"arity\":-4,\"flags\":[\"readonly\",\"blocking\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"xreadgroup\":{\"arity\":-7,\"flags\":[\"write\",\"blocking\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"xrevrange\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xsetid\":{\"arity\":-3,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"xtrim\":{\"arity\":-4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zadd\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zcard\":{\"arity\":2,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zcount\":{\"arity\":4,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zdiff\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zdiffstore\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zincrby\":{\"arity\":4,\"flags\":[\"write\",\"denyoom\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zinter\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zintercard\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zinterstore\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zlexcount\":{\"arity\":4,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zmpop\":{\"arity\":-4,\"flags\":[\"write\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zmscore\":{\"arity\":-3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zpopmax\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zpopmin\":{\"arity\":-2,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrandmember\":{\"arity\":-2,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrange\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrangebylex\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrangebyscore\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrangestore\":{\"arity\":-5,\"flags\":[\"write\",\"denyoom\"],\"keyStart\":1,\"keyStop\":2,\"step\":1},\"zrank\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrem\":{\"arity\":-3,\"flags\":[\"write\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zremrangebylex\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zremrangebyrank\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zremrangebyscore\":{\"arity\":4,\"flags\":[\"write\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrevrange\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrevrangebylex\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrevrangebyscore\":{\"arity\":-4,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zrevrank\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zscan\":{\"arity\":-3,\"flags\":[\"readonly\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zscore\":{\"arity\":3,\"flags\":[\"readonly\",\"fast\"],\"keyStart\":1,\"keyStop\":1,\"step\":1},\"zunion\":{\"arity\":-3,\"flags\":[\"readonly\",\"movablekeys\"],\"keyStart\":0,\"keyStop\":0,\"step\":0},\"zunionstore\":{\"arity\":-4,\"flags\":[\"write\",\"denyoom\",\"movablekeys\"],\"keyStart\":1,\"keyStop\":1,\"step\":1}}"));}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@ioredis/commands/built/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/standard-as-callback/built/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/standard-as-callback/built/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const utils_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/standard-as-callback/built/utils.js [instrumentation-edge] (ecmascript)");
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/lib/modern.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/lib/old.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Errors = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46 ? __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/lib/old.js [instrumentation-edge] (ecmascript)") : __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/lib/modern.js [instrumentation-edge] (ecmascript)");
module.exports = Errors;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/cluster-key-slot/lib/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lodash.defaults/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lodash.isarguments/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ms/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/debug/src/common.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
    createDebug.humanize = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/ms/index.js [instrumentation-edge] (ecmascript)");
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/debug/src/browser.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/debug/src/common.js [instrumentation-edge] (ecmascript)")(exports);
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/denque/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-parser/lib/parser.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Buffer = __turbopack_context__.r("[externals]/node:buffer [external] (node:buffer, cjs)").Buffer;
const StringDecoder = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'string_decoder', ecmascript)").StringDecoder;
const decoder = new StringDecoder();
const errors = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-errors/index.js [instrumentation-edge] (ecmascript)");
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-parser/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/redis-parser/lib/parser.js [instrumentation-edge] (ecmascript)");
}),
]);

//# sourceMappingURL=c427b_7fd978fb._.js.map