(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/c427b_9aa71ece._.js",
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
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-array/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.parse = function(source, transform) {
    return new ArrayParser(source, transform).parse();
};
class ArrayParser {
    constructor(source, transform){
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
    }
    isEof() {
        return this.position >= this.source.length;
    }
    nextCharacter() {
        var character = this.source[this.position++];
        if (character === '\\') {
            return {
                value: this.source[this.position++],
                escaped: true
            };
        }
        return {
            value: character,
            escaped: false
        };
    }
    record(character) {
        this.recorded.push(character);
    }
    newEntry(includeEmpty) {
        var entry;
        if (this.recorded.length > 0 || includeEmpty) {
            entry = this.recorded.join('');
            if (entry === 'NULL' && !includeEmpty) {
                entry = null;
            }
            if (entry !== null) entry = this.transform(entry);
            this.entries.push(entry);
            this.recorded = [];
        }
    }
    consumeDimensions() {
        if (this.source[0] === '[') {
            while(!this.isEof()){
                var char = this.nextCharacter();
                if (char.value === '=') break;
            }
        }
    }
    parse(nested) {
        var character, parser, quote;
        this.consumeDimensions();
        while(!this.isEof()){
            character = this.nextCharacter();
            if (character.value === '{' && !quote) {
                this.dimension++;
                if (this.dimension > 1) {
                    parser = new ArrayParser(this.source.substr(this.position - 1), this.transform);
                    this.entries.push(parser.parse(true));
                    this.position += parser.position - 2;
                }
            } else if (character.value === '}' && !quote) {
                this.dimension--;
                if (!this.dimension) {
                    this.newEntry();
                    if (nested) return this.entries;
                }
            } else if (character.value === '"' && !character.escaped) {
                if (quote) this.newEntry(true);
                quote = !quote;
            } else if (character.value === ',' && !quote) {
                this.newEntry();
            } else {
                this.record(character.value);
            }
        }
        if (this.dimension !== 0) {
            throw new Error('array dimension not balanced');
        }
        return this.entries;
    }
}
function identity(value) {
    return value;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/arrayParser.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

var array = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-array/index.js [instrumentation-edge] (ecmascript)");
module.exports = {
    create: function(source, transform) {
        return {
            parse: function() {
                return array.parse(source, transform);
            }
        };
    }
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/textParsers.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

var array = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-array/index.js [instrumentation-edge] (ecmascript)");
var arrayParser = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/arrayParser.js [instrumentation-edge] (ecmascript)");
var parseDate = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-date/index.js [instrumentation-edge] (ecmascript)");
var parseInterval = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-interval/index.js [instrumentation-edge] (ecmascript)");
var parseByteA = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-bytea/index.js [instrumentation-edge] (ecmascript)");
function allowNull(fn) {
    return function nullAllowed(value) {
        if (value === null) return value;
        return fn(value);
    };
}
function parseBool(value) {
    if (value === null) return value;
    return value === 'TRUE' || value === 't' || value === 'true' || value === 'y' || value === 'yes' || value === 'on' || value === '1';
}
function parseBoolArray(value) {
    if (!value) return null;
    return array.parse(value, parseBool);
}
function parseBaseTenInt(string) {
    return parseInt(string, 10);
}
function parseIntegerArray(value) {
    if (!value) return null;
    return array.parse(value, allowNull(parseBaseTenInt));
}
function parseBigIntegerArray(value) {
    if (!value) return null;
    return array.parse(value, allowNull(function(entry) {
        return parseBigInteger(entry).trim();
    }));
}
var parsePointArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
            entry = parsePoint(entry);
        }
        return entry;
    });
    return p.parse();
};
var parseFloatArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
            entry = parseFloat(entry);
        }
        return entry;
    });
    return p.parse();
};
var parseStringArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value);
    return p.parse();
};
var parseDateArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
            entry = parseDate(entry);
        }
        return entry;
    });
    return p.parse();
};
var parseIntervalArray = function(value) {
    if (!value) {
        return null;
    }
    var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
            entry = parseInterval(entry);
        }
        return entry;
    });
    return p.parse();
};
var parseByteAArray = function(value) {
    if (!value) {
        return null;
    }
    return array.parse(value, allowNull(parseByteA));
};
var parseInteger = function(value) {
    return parseInt(value, 10);
};
var parseBigInteger = function(value) {
    var valStr = String(value);
    if (/^\d+$/.test(valStr)) {
        return valStr;
    }
    return value;
};
var parseJsonArray = function(value) {
    if (!value) {
        return null;
    }
    return array.parse(value, allowNull(JSON.parse));
};
var parsePoint = function(value) {
    if (value[0] !== '(') {
        return null;
    }
    value = value.substring(1, value.length - 1).split(',');
    return {
        x: parseFloat(value[0]),
        y: parseFloat(value[1])
    };
};
var parseCircle = function(value) {
    if (value[0] !== '<' && value[1] !== '(') {
        return null;
    }
    var point = '(';
    var radius = '';
    var pointParsed = false;
    for(var i = 2; i < value.length - 1; i++){
        if (!pointParsed) {
            point += value[i];
        }
        if (value[i] === ')') {
            pointParsed = true;
            continue;
        } else if (!pointParsed) {
            continue;
        }
        if (value[i] === ',') {
            continue;
        }
        radius += value[i];
    }
    var result = parsePoint(point);
    result.radius = parseFloat(radius);
    return result;
};
var init = function(register) {
    register(20, parseBigInteger); // int8
    register(21, parseInteger); // int2
    register(23, parseInteger); // int4
    register(26, parseInteger); // oid
    register(700, parseFloat); // float4/real
    register(701, parseFloat); // float8/double
    register(16, parseBool);
    register(1082, parseDate); // date
    register(1114, parseDate); // timestamp without timezone
    register(1184, parseDate); // timestamp
    register(600, parsePoint); // point
    register(651, parseStringArray); // cidr[]
    register(718, parseCircle); // circle
    register(1000, parseBoolArray);
    register(1001, parseByteAArray);
    register(1005, parseIntegerArray); // _int2
    register(1007, parseIntegerArray); // _int4
    register(1028, parseIntegerArray); // oid[]
    register(1016, parseBigIntegerArray); // _int8
    register(1017, parsePointArray); // point[]
    register(1021, parseFloatArray); // _float4
    register(1022, parseFloatArray); // _float8
    register(1231, parseFloatArray); // _numeric
    register(1014, parseStringArray); //char
    register(1015, parseStringArray); //varchar
    register(1008, parseStringArray);
    register(1009, parseStringArray);
    register(1040, parseStringArray); // macaddr[]
    register(1041, parseStringArray); // inet[]
    register(1115, parseDateArray); // timestamp without time zone[]
    register(1182, parseDateArray); // _date
    register(1185, parseDateArray); // timestamp with time zone[]
    register(1186, parseInterval);
    register(1187, parseIntervalArray);
    register(17, parseByteA);
    register(114, JSON.parse.bind(JSON)); // json
    register(3802, JSON.parse.bind(JSON)); // jsonb
    register(199, parseJsonArray); // json[]
    register(3807, parseJsonArray); // jsonb[]
    register(3907, parseStringArray); // numrange[]
    register(2951, parseStringArray); // uuid[]
    register(791, parseStringArray); // money[]
    register(1183, parseStringArray); // time[]
    register(1270, parseStringArray); // timetz[]
};
module.exports = {
    init: init
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/binaryParsers.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

var parseInt64 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-int8/index.js [instrumentation-edge] (ecmascript)");
var parseBits = function(data, bits, offset, invert, callback) {
    offset = offset || 0;
    invert = invert || false;
    callback = callback || function(lastValue, newValue, bits) {
        return lastValue * Math.pow(2, bits) + newValue;
    };
    var offsetBytes = offset >> 3;
    var inv = function(value) {
        if (invert) {
            return ~value & 0xff;
        }
        return value;
    };
    // read first (maybe partial) byte
    var mask = 0xff;
    var firstBits = 8 - offset % 8;
    if (bits < firstBits) {
        mask = 0xff << 8 - bits & 0xff;
        firstBits = bits;
    }
    if (offset) {
        mask = mask >> offset % 8;
    }
    var result = 0;
    if (offset % 8 + bits >= 8) {
        result = callback(0, inv(data[offsetBytes]) & mask, firstBits);
    }
    // read bytes
    var bytes = bits + offset >> 3;
    for(var i = offsetBytes + 1; i < bytes; i++){
        result = callback(result, inv(data[i]), 8);
    }
    // bits to read, that are not a complete byte
    var lastBits = (bits + offset) % 8;
    if (lastBits > 0) {
        result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits);
    }
    return result;
};
var parseFloatFromBits = function(data, precisionBits, exponentBits) {
    var bias = Math.pow(2, exponentBits - 1) - 1;
    var sign = parseBits(data, 1);
    var exponent = parseBits(data, exponentBits, 1);
    if (exponent === 0) {
        return 0;
    }
    // parse mantissa
    var precisionBitsCounter = 1;
    var parsePrecisionBits = function(lastValue, newValue, bits) {
        if (lastValue === 0) {
            lastValue = 1;
        }
        for(var i = 1; i <= bits; i++){
            precisionBitsCounter /= 2;
            if ((newValue & 0x1 << bits - i) > 0) {
                lastValue += precisionBitsCounter;
            }
        }
        return lastValue;
    };
    var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
    // special cases
    if (exponent == Math.pow(2, exponentBits + 1) - 1) {
        if (mantissa === 0) {
            return sign === 0 ? Infinity : -Infinity;
        }
        return NaN;
    }
    // normale number
    return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
};
var parseInt16 = function(value) {
    if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 15, 1, true) + 1);
    }
    return parseBits(value, 15, 1);
};
var parseInt32 = function(value) {
    if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 31, 1, true) + 1);
    }
    return parseBits(value, 31, 1);
};
var parseFloat32 = function(value) {
    return parseFloatFromBits(value, 23, 8);
};
var parseFloat64 = function(value) {
    return parseFloatFromBits(value, 52, 11);
};
var parseNumeric = function(value) {
    var sign = parseBits(value, 16, 32);
    if (sign == 0xc000) {
        return NaN;
    }
    var weight = Math.pow(10000, parseBits(value, 16, 16));
    var result = 0;
    var digits = [];
    var ndigits = parseBits(value, 16);
    for(var i = 0; i < ndigits; i++){
        result += parseBits(value, 16, 64 + 16 * i) * weight;
        weight /= 10000;
    }
    var scale = Math.pow(10, parseBits(value, 16, 48));
    return (sign === 0 ? 1 : -1) * Math.round(result * scale) / scale;
};
var parseDate = function(isUTC, value) {
    var sign = parseBits(value, 1);
    var rawValue = parseBits(value, 63, 1);
    // discard usecs and shift from 2000 to 1970
    var result = new Date((sign === 0 ? 1 : -1) * rawValue / 1000 + 946684800000);
    if (!isUTC) {
        result.setTime(result.getTime() + result.getTimezoneOffset() * 60000);
    }
    // add microseconds to the date
    result.usec = rawValue % 1000;
    result.getMicroSeconds = function() {
        return this.usec;
    };
    result.setMicroSeconds = function(value) {
        this.usec = value;
    };
    result.getUTCMicroSeconds = function() {
        return this.usec;
    };
    return result;
};
var parseArray = function(value) {
    var dim = parseBits(value, 32);
    var flags = parseBits(value, 32, 32);
    var elementType = parseBits(value, 32, 64);
    var offset = 96;
    var dims = [];
    for(var i = 0; i < dim; i++){
        // parse dimension
        dims[i] = parseBits(value, 32, offset);
        offset += 32;
        // ignore lower bounds
        offset += 32;
    }
    var parseElement = function(elementType) {
        // parse content length
        var length = parseBits(value, 32, offset);
        offset += 32;
        // parse null values
        if (length == 0xffffffff) {
            return null;
        }
        var result;
        if (elementType == 0x17 || elementType == 0x14) {
            // int/bigint
            result = parseBits(value, length * 8, offset);
            offset += length * 8;
            return result;
        } else if (elementType == 0x19) {
            // string
            result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
            return result;
        } else {
            console.log("ERROR: ElementType not implemented: " + elementType);
        }
    };
    var parse = function(dimension, elementType) {
        var array = [];
        var i;
        if (dimension.length > 1) {
            var count = dimension.shift();
            for(i = 0; i < count; i++){
                array[i] = parse(dimension, elementType);
            }
            dimension.unshift(count);
        } else {
            for(i = 0; i < dimension[0]; i++){
                array[i] = parseElement(elementType);
            }
        }
        return array;
    };
    return parse(dims, elementType);
};
var parseText = function(value) {
    return value.toString('utf8');
};
var parseBool = function(value) {
    if (value === null) return null;
    return parseBits(value, 8) > 0;
};
var init = function(register) {
    register(20, parseInt64);
    register(21, parseInt16);
    register(23, parseInt32);
    register(26, parseInt32);
    register(1700, parseNumeric);
    register(700, parseFloat32);
    register(701, parseFloat64);
    register(16, parseBool);
    register(1114, parseDate.bind(null, false));
    register(1184, parseDate.bind(null, true));
    register(1000, parseArray);
    register(1007, parseArray);
    register(1016, parseArray);
    register(1008, parseArray);
    register(1009, parseArray);
    register(25, parseText);
};
module.exports = {
    init: init
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/builtins.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Following query was used to generate this file:

 SELECT json_object_agg(UPPER(PT.typname), PT.oid::int4 ORDER BY pt.oid)
 FROM pg_type PT
 WHERE typnamespace = (SELECT pgn.oid FROM pg_namespace pgn WHERE nspname = 'pg_catalog') -- Take only builting Postgres types with stable OID (extension types are not guaranted to be stable)
 AND typtype = 'b' -- Only basic types
 AND typelem = 0 -- Ignore aliases
 AND typisdefined -- Ignore undefined types
 */ module.exports = {
    BOOL: 16,
    BYTEA: 17,
    CHAR: 18,
    INT8: 20,
    INT2: 21,
    INT4: 23,
    REGPROC: 24,
    TEXT: 25,
    OID: 26,
    TID: 27,
    XID: 28,
    CID: 29,
    JSON: 114,
    XML: 142,
    PG_NODE_TREE: 194,
    SMGR: 210,
    PATH: 602,
    POLYGON: 604,
    CIDR: 650,
    FLOAT4: 700,
    FLOAT8: 701,
    ABSTIME: 702,
    RELTIME: 703,
    TINTERVAL: 704,
    CIRCLE: 718,
    MACADDR8: 774,
    MONEY: 790,
    MACADDR: 829,
    INET: 869,
    ACLITEM: 1033,
    BPCHAR: 1042,
    VARCHAR: 1043,
    DATE: 1082,
    TIME: 1083,
    TIMESTAMP: 1114,
    TIMESTAMPTZ: 1184,
    INTERVAL: 1186,
    TIMETZ: 1266,
    BIT: 1560,
    VARBIT: 1562,
    NUMERIC: 1700,
    REFCURSOR: 1790,
    REGPROCEDURE: 2202,
    REGOPER: 2203,
    REGOPERATOR: 2204,
    REGCLASS: 2205,
    REGTYPE: 2206,
    UUID: 2950,
    TXID_SNAPSHOT: 2970,
    PG_LSN: 3220,
    PG_NDISTINCT: 3361,
    PG_DEPENDENCIES: 3402,
    TSVECTOR: 3614,
    TSQUERY: 3615,
    GTSVECTOR: 3642,
    REGCONFIG: 3734,
    REGDICTIONARY: 3769,
    JSONB: 3802,
    REGNAMESPACE: 4089,
    REGROLE: 4096
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

var textParsers = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/textParsers.js [instrumentation-edge] (ecmascript)");
var binaryParsers = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/binaryParsers.js [instrumentation-edge] (ecmascript)");
var arrayParser = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/arrayParser.js [instrumentation-edge] (ecmascript)");
var builtinTypes = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/lib/builtins.js [instrumentation-edge] (ecmascript)");
exports.getTypeParser = getTypeParser;
exports.setTypeParser = setTypeParser;
exports.arrayParser = arrayParser;
exports.builtins = builtinTypes;
var typeParsers = {
    text: {},
    binary: {}
};
//the empty parse function
function noParse(val) {
    return String(val);
}
;
//returns a function used to convert a specific type (specified by
//oid) into a result javascript type
//note: the oid can be obtained via the following sql query:
//SELECT oid FROM pg_type WHERE typname = 'TYPE_NAME_HERE';
function getTypeParser(oid, format) {
    format = format || 'text';
    if (!typeParsers[format]) {
        return noParse;
    }
    return typeParsers[format][oid] || noParse;
}
;
function setTypeParser(oid, format, parseFn) {
    if (typeof format == 'function') {
        parseFn = format;
        format = 'text';
    }
    typeParsers[format][oid] = parseFn;
}
;
textParsers.init(function(oid, converter) {
    typeParsers.text[oid] = converter;
});
binaryParsers.init(function(oid, converter) {
    typeParsers.binary[oid] = converter;
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-date/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
var INFINITY = /^-?infinity$/;
module.exports = function parseDate(isoDate) {
    if (INFINITY.test(isoDate)) {
        // Capitalize to Infinity before passing to Number
        return Number(isoDate.replace('i', 'I'));
    }
    var matches = DATE_TIME.exec(isoDate);
    if (!matches) {
        // Force YYYY-MM-DD dates to be parsed as local time
        return getDate(isoDate) || null;
    }
    var isBC = !!matches[8];
    var year = parseInt(matches[1], 10);
    if (isBC) {
        year = bcYearToNegativeYear(year);
    }
    var month = parseInt(matches[2], 10) - 1;
    var day = matches[3];
    var hour = parseInt(matches[4], 10);
    var minute = parseInt(matches[5], 10);
    var second = parseInt(matches[6], 10);
    var ms = matches[7];
    ms = ms ? 1000 * parseFloat(ms) : 0;
    var date;
    var offset = timeZoneOffset(isoDate);
    if (offset != null) {
        date = new Date(Date.UTC(year, month, day, hour, minute, second, ms));
        // Account for years from 0 to 99 being interpreted as 1900-1999
        // by Date.UTC / the multi-argument form of the Date constructor
        if (is0To99(year)) {
            date.setUTCFullYear(year);
        }
        if (offset !== 0) {
            date.setTime(date.getTime() - offset);
        }
    } else {
        date = new Date(year, month, day, hour, minute, second, ms);
        if (is0To99(year)) {
            date.setFullYear(year);
        }
    }
    return date;
};
function getDate(isoDate) {
    var matches = DATE.exec(isoDate);
    if (!matches) {
        return;
    }
    var year = parseInt(matches[1], 10);
    var isBC = !!matches[4];
    if (isBC) {
        year = bcYearToNegativeYear(year);
    }
    var month = parseInt(matches[2], 10) - 1;
    var day = matches[3];
    // YYYY-MM-DD will be parsed as local time
    var date = new Date(year, month, day);
    if (is0To99(year)) {
        date.setFullYear(year);
    }
    return date;
}
// match timezones:
// Z (UTC)
// -05
// +06:30
function timeZoneOffset(isoDate) {
    if (isoDate.endsWith('+00')) {
        return 0;
    }
    var zone = TIME_ZONE.exec(isoDate.split(' ')[1]);
    if (!zone) return;
    var type = zone[1];
    if (type === 'Z') {
        return 0;
    }
    var sign = type === '-' ? -1 : 1;
    var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
    return offset * sign * 1000;
}
function bcYearToNegativeYear(year) {
    // Account for numerical difference between representations of BC years
    // See: https://github.com/bendrucker/postgres-date/issues/5
    return -(year - 1);
}
function is0To99(num) {
    return num >= 0 && num < 100;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/xtend/mutable.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function extend(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i];
        for(var key in source){
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-interval/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var extend = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/xtend/mutable.js [instrumentation-edge] (ecmascript)");
module.exports = PostgresInterval;
function PostgresInterval(raw) {
    if (!(this instanceof PostgresInterval)) {
        return new PostgresInterval(raw);
    }
    extend(this, parse(raw));
}
var properties = [
    'seconds',
    'minutes',
    'hours',
    'days',
    'months',
    'years'
];
PostgresInterval.prototype.toPostgres = function() {
    var filtered = properties.filter(this.hasOwnProperty, this);
    // In addition to `properties`, we need to account for fractions of seconds.
    if (this.milliseconds && filtered.indexOf('seconds') < 0) {
        filtered.push('seconds');
    }
    if (filtered.length === 0) return '0';
    return filtered.map(function(property) {
        var value = this[property] || 0;
        // Account for fractional part of seconds,
        // remove trailing zeroes.
        if (property === 'seconds' && this.milliseconds) {
            value = (value + this.milliseconds / 1000).toFixed(6).replace(/\.?0+$/, '');
        }
        return value + ' ' + property;
    }, this).join(' ');
};
var propertiesISOEquivalent = {
    years: 'Y',
    months: 'M',
    days: 'D',
    hours: 'H',
    minutes: 'M',
    seconds: 'S'
};
var dateProperties = [
    'years',
    'months',
    'days'
];
var timeProperties = [
    'hours',
    'minutes',
    'seconds'
];
// according to ISO 8601
PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
    var datePart = dateProperties.map(buildProperty, this).join('');
    var timePart = timeProperties.map(buildProperty, this).join('');
    return 'P' + datePart + 'T' + timePart;
    //TURBOPACK unreachable
    ;
    function buildProperty(property) {
        var value = this[property] || 0;
        // Account for fractional part of seconds,
        // remove trailing zeroes.
        if (property === 'seconds' && this.milliseconds) {
            value = (value + this.milliseconds / 1000).toFixed(6).replace(/0+$/, '');
        }
        return value + propertiesISOEquivalent[property];
    }
};
var NUMBER = '([+-]?\\d+)';
var YEAR = NUMBER + '\\s+years?';
var MONTH = NUMBER + '\\s+mons?';
var DAY = NUMBER + '\\s+days?';
var TIME = '([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?';
var INTERVAL = new RegExp([
    YEAR,
    MONTH,
    DAY,
    TIME
].map(function(regexString) {
    return '(' + regexString + ')?';
}).join('\\s*'));
// Positions of values in regex match
var positions = {
    years: 2,
    months: 4,
    days: 6,
    hours: 9,
    minutes: 10,
    seconds: 11,
    milliseconds: 12
};
// We can use negative time
var negatives = [
    'hours',
    'minutes',
    'seconds',
    'milliseconds'
];
function parseMilliseconds(fraction) {
    // add omitted zeroes
    var microseconds = fraction + '000000'.slice(fraction.length);
    return parseInt(microseconds, 10) / 1000;
}
function parse(interval) {
    if (!interval) return {};
    var matches = INTERVAL.exec(interval);
    var isNegative = matches[8] === '-';
    return Object.keys(positions).reduce(function(parsed, property) {
        var position = positions[property];
        var value = matches[position];
        // no empty string
        if (!value) return parsed;
        // milliseconds are actually microseconds (up to 6 digits)
        // with omitted trailing zeroes.
        value = property === 'milliseconds' ? parseMilliseconds(value) : parseInt(value, 10);
        // no zeros
        if (!value) return parsed;
        if (isNegative && ~negatives.indexOf(property)) {
            value *= -1;
        }
        parsed[property] = value;
        return parsed;
    }, {});
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/postgres-bytea/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
'use strict';
var bufferFrom = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from || __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"];
module.exports = function parseBytea(input) {
    if (/^\\x/.test(input)) {
        // new 'hex' style response (pg >9.0)
        return bufferFrom(input.substr(2), 'hex');
    }
    var output = '';
    var i = 0;
    while(i < input.length){
        if (input[i] !== '\\') {
            output += input[i];
            ++i;
        } else {
            if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
                output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
                i += 4;
            } else {
                var backslashes = 1;
                while(i + backslashes < input.length && input[i + backslashes] === '\\'){
                    backslashes++;
                }
                for(var k = 0; k < Math.floor(backslashes / 2); ++k){
                    output += '\\';
                }
                i += Math.floor(backslashes / 2) * 2;
            }
        }
    }
    return bufferFrom(output, 'binary');
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-int8/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// selected so (BASE - 1) * 0x100000000 + 0xffffffff is a safe integer
var BASE = 1000000;
function readInt8(buffer) {
    var high = buffer.readInt32BE(0);
    var low = buffer.readUInt32BE(4);
    var sign = '';
    if (high < 0) {
        high = ~high + (low === 0);
        low = ~low + 1 >>> 0;
        sign = '-';
    }
    var result = '';
    var carry;
    var t;
    var digits;
    var pad;
    var l;
    var i;
    {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 0x100000000 * carry + low;
        low = t / BASE >>> 0;
        digits = '' + (t - BASE * low);
        if (low === 0 && high === 0) {
            return sign + digits + result;
        }
        pad = '';
        l = 6 - digits.length;
        for(i = 0; i < l; i++){
            pad += '0';
        }
        result = pad + digits + result;
    }
    {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 0x100000000 * carry + low;
        low = t / BASE >>> 0;
        digits = '' + (t - BASE * low);
        if (low === 0 && high === 0) {
            return sign + digits + result;
        }
        pad = '';
        l = 6 - digits.length;
        for(i = 0; i < l; i++){
            pad += '0';
        }
        result = pad + digits + result;
    }
    {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 0x100000000 * carry + low;
        low = t / BASE >>> 0;
        digits = '' + (t - BASE * low);
        if (low === 0 && high === 0) {
            return sign + digits + result;
        }
        pad = '';
        l = 6 - digits.length;
        for(i = 0; i < l; i++){
            pad += '0';
        }
        result = pad + digits + result;
    }
    {
        carry = high % BASE;
        t = 0x100000000 * carry + low;
        digits = '' + t % BASE;
        return sign + digits + result;
    }
}
module.exports = readInt8;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let user;
try {
    user = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : process.env.USER;
} catch  {
// ignore, e.g., Deno without --allow-env
}
module.exports = {
    // database host. defaults to localhost
    host: 'localhost',
    // database user's name
    user,
    // name of database to connect
    database: undefined,
    // database user's password
    password: null,
    // a Postgres connection string to be used instead of setting individual connection items
    // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
    // in the defaults object.
    connectionString: undefined,
    // database port
    port: 5432,
    // number of rows to return at a time from a prepared statement's
    // portal. 0 will return all rows at once
    rows: 0,
    // binary result mode
    binary: false,
    // Connection pool options - see https://github.com/brianc/node-pg-pool
    // number of connections to use in connection pool
    // 0 will disable connection pooling
    max: 10,
    // max milliseconds a client can go unused before it is removed
    // from the pool and destroyed
    idleTimeoutMillis: 30000,
    client_encoding: '',
    ssl: false,
    application_name: undefined,
    fallback_application_name: undefined,
    options: undefined,
    parseInputDatesAsUTC: false,
    // max milliseconds any query using this connection will execute for before timing out in error.
    // false=unlimited
    statement_timeout: false,
    // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
    // false=unlimited
    lock_timeout: false,
    // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
    // false=unlimited
    idle_in_transaction_session_timeout: false,
    // max milliseconds to wait for query to complete (client side)
    query_timeout: false,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
};
const pgTypes = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [instrumentation-edge] (ecmascript)");
// save default parsers
const parseBigInteger = pgTypes.getTypeParser(20, 'text');
const parseBigIntegerArray = pgTypes.getTypeParser(1016, 'text');
// parse int8 so you can get your count values as actual numbers
module.exports.__defineSetter__('parseInt8', function(val) {
    pgTypes.setTypeParser(20, 'text', val ? pgTypes.getTypeParser(23, 'text') : parseBigInteger);
    pgTypes.setTypeParser(1016, 'text', val ? pgTypes.getTypeParser(1007, 'text') : parseBigIntegerArray);
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
'use strict';
const defaults = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [instrumentation-edge] (ecmascript)");
const util = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
const { isDate } = util.types || util // Node 8 doesn't have `util.types`
;
function escapeElement(elementRepresentation) {
    const escaped = elementRepresentation.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return '"' + escaped + '"';
}
// convert a JS array to a postgres array literal
// uses comma separator so won't work for types like box that use
// a different array separator.
function arrayString(val) {
    let result = '{';
    for(let i = 0; i < val.length; i++){
        if (i > 0) {
            result = result + ',';
        }
        if (val[i] === null || typeof val[i] === 'undefined') {
            result = result + 'NULL';
        } else if (Array.isArray(val[i])) {
            result = result + arrayString(val[i]);
        } else if (ArrayBuffer.isView(val[i])) {
            let item = val[i];
            if (!(item instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"])) {
                const buf = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(item.buffer, item.byteOffset, item.byteLength);
                if (buf.length === item.byteLength) {
                    item = buf;
                } else {
                    item = buf.slice(item.byteOffset, item.byteOffset + item.byteLength);
                }
            }
            result += '\\\\x' + item.toString('hex');
        } else {
            result += escapeElement(prepareValue(val[i]));
        }
    }
    result = result + '}';
    return result;
}
// converts values from javascript types
// to their 'raw' counterparts for use as a postgres parameter
// note: you can override this function to provide your own conversion mechanism
// for complex types, etc...
const prepareValue = function(val, seen) {
    // null and undefined are both null for postgres
    if (val == null) {
        return null;
    }
    if (typeof val === 'object') {
        if (val instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"]) {
            return val;
        }
        if (ArrayBuffer.isView(val)) {
            const buf = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(val.buffer, val.byteOffset, val.byteLength);
            if (buf.length === val.byteLength) {
                return buf;
            }
            return buf.slice(val.byteOffset, val.byteOffset + val.byteLength) // Node.js v4 does not support those Buffer.from params
            ;
        }
        if (isDate(val)) {
            if (defaults.parseInputDatesAsUTC) {
                return dateToStringUTC(val);
            } else {
                return dateToString(val);
            }
        }
        if (Array.isArray(val)) {
            return arrayString(val);
        }
        return prepareObject(val, seen);
    }
    return val.toString();
};
function prepareObject(val, seen) {
    if (val && typeof val.toPostgres === 'function') {
        seen = seen || [];
        if (seen.indexOf(val) !== -1) {
            throw new Error('circular reference detected while preparing "' + val + '" for query');
        }
        seen.push(val);
        return prepareValue(val.toPostgres(prepareValue), seen);
    }
    return JSON.stringify(val);
}
function dateToString(date) {
    let offset = -date.getTimezoneOffset();
    let year = date.getFullYear();
    const isBCYear = year < 1;
    if (isBCYear) year = Math.abs(year) + 1; // negative years are 1 off their BC representation
    let ret = String(year).padStart(4, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0') + 'T' + String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0') + '.' + String(date.getMilliseconds()).padStart(3, '0');
    if (offset < 0) {
        ret += '-';
        offset *= -1;
    } else {
        ret += '+';
    }
    ret += String(Math.floor(offset / 60)).padStart(2, '0') + ':' + String(offset % 60).padStart(2, '0');
    if (isBCYear) ret += ' BC';
    return ret;
}
function dateToStringUTC(date) {
    let year = date.getUTCFullYear();
    const isBCYear = year < 1;
    if (isBCYear) year = Math.abs(year) + 1; // negative years are 1 off their BC representation
    let ret = String(year).padStart(4, '0') + '-' + String(date.getUTCMonth() + 1).padStart(2, '0') + '-' + String(date.getUTCDate()).padStart(2, '0') + 'T' + String(date.getUTCHours()).padStart(2, '0') + ':' + String(date.getUTCMinutes()).padStart(2, '0') + ':' + String(date.getUTCSeconds()).padStart(2, '0') + '.' + String(date.getUTCMilliseconds()).padStart(3, '0');
    ret += '+00:00';
    if (isBCYear) ret += ' BC';
    return ret;
}
function normalizeQueryConfig(config, values, callback) {
    // can take in strings or config objects
    config = typeof config === 'string' ? {
        text: config
    } : config;
    if (values) {
        if (typeof values === 'function') {
            config.callback = values;
        } else {
            config.values = values;
        }
    }
    if (callback) {
        config.callback = callback;
    }
    return config;
}
// Ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
const escapeIdentifier = function(str) {
    return '"' + str.replace(/"/g, '""') + '"';
};
const escapeLiteral = function(str) {
    let hasBackslash = false;
    let escaped = "'";
    if (str == null) {
        return "''";
    }
    if (typeof str !== 'string') {
        return "''";
    }
    for(let i = 0; i < str.length; i++){
        const c = str[i];
        if (c === "'") {
            escaped += c + c;
        } else if (c === '\\') {
            escaped += c + c;
            hasBackslash = true;
        } else {
            escaped += c;
        }
    }
    escaped += "'";
    if (hasBackslash === true) {
        escaped = ' E' + escaped;
    }
    return escaped;
};
module.exports = {
    prepareValue: function prepareValueWrapper(value) {
        // this ensures that extra arguments do not get passed into prepareValue
        // by accident, eg: from calling values.map(utils.prepareValue)
        return prepareValue(value);
    },
    normalizeQueryConfig,
    escapeIdentifier,
    escapeLiteral
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils-webcrypto.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
const nodeCrypto = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'crypto', ecmascript)");
module.exports = {
    postgresMd5PasswordHash,
    randomBytes,
    deriveKey,
    sha256,
    hashByName,
    hmacSha256,
    md5
};
/**
 * The Web Crypto API - grabbed from the Node.js library or the global
 * @type Crypto
 */ // eslint-disable-next-line no-undef
const webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
/**
 * The SubtleCrypto API for low level crypto operations.
 * @type SubtleCrypto
 */ const subtleCrypto = webCrypto.subtle;
const textEncoder = new TextEncoder();
/**
 *
 * @param {*} length
 * @returns
 */ function randomBytes(length) {
    return webCrypto.getRandomValues(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].alloc(length));
}
async function md5(string) {
    try {
        return nodeCrypto.createHash('md5').update(string, 'utf-8').digest('hex');
    } catch (e) {
        // `createHash()` failed so we are probably not in Node.js, use the WebCrypto API instead.
        // Note that the MD5 algorithm on WebCrypto is not available in Node.js.
        // This is why we cannot just use WebCrypto in all environments.
        const data = typeof string === 'string' ? textEncoder.encode(string) : string;
        const hash = await subtleCrypto.digest('MD5', data);
        return Array.from(new Uint8Array(hash)).map((b)=>b.toString(16).padStart(2, '0')).join('');
    }
}
// See AuthenticationMD5Password at https://www.postgresql.org/docs/current/static/protocol-flow.html
async function postgresMd5PasswordHash(user, password, salt) {
    const inner = await md5(password + user);
    const outer = await md5(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].concat([
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(inner),
        salt
    ]));
    return 'md5' + outer;
}
/**
 * Create a SHA-256 digest of the given data
 * @param {Buffer} data
 */ async function sha256(text) {
    return await subtleCrypto.digest('SHA-256', text);
}
async function hashByName(hashName, text) {
    return await subtleCrypto.digest(hashName, text);
}
/**
 * Sign the message with the given key
 * @param {ArrayBuffer} keyBuffer
 * @param {string} msg
 */ async function hmacSha256(keyBuffer, msg) {
    const key = await subtleCrypto.importKey('raw', keyBuffer, {
        name: 'HMAC',
        hash: 'SHA-256'
    }, false, [
        'sign'
    ]);
    return await subtleCrypto.sign('HMAC', key, textEncoder.encode(msg));
}
/**
 * Derive a key from the password and salt
 * @param {string} password
 * @param {Uint8Array} salt
 * @param {number} iterations
 */ async function deriveKey(password, salt, iterations) {
    const key = await subtleCrypto.importKey('raw', textEncoder.encode(password), 'PBKDF2', false, [
        'deriveBits'
    ]);
    const params = {
        name: 'PBKDF2',
        hash: 'SHA-256',
        salt: salt,
        iterations: iterations
    };
    return await subtleCrypto.deriveBits(params, key, 32 * 8, [
        'deriveBits'
    ]);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils-legacy.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
'use strict';
// This file contains crypto utility functions for versions of Node.js < 15.0.0,
// which does not support the WebCrypto.subtle API.
const nodeCrypto = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'crypto', ecmascript)");
function md5(string) {
    return nodeCrypto.createHash('md5').update(string, 'utf-8').digest('hex');
}
// See AuthenticationMD5Password at https://www.postgresql.org/docs/current/static/protocol-flow.html
function postgresMd5PasswordHash(user, password, salt) {
    const inner = md5(password + user);
    const outer = md5(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].concat([
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(inner),
        salt
    ]));
    return 'md5' + outer;
}
function sha256(text) {
    return nodeCrypto.createHash('sha256').update(text).digest();
}
function hashByName(hashName, text) {
    hashName = hashName.replace(/(\D)-/, '$1'); // e.g. SHA-256 -> SHA256
    return nodeCrypto.createHash(hashName).update(text).digest();
}
function hmacSha256(key, msg) {
    return nodeCrypto.createHmac('sha256', key).update(msg).digest();
}
async function deriveKey(password, salt, iterations) {
    return nodeCrypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
}
module.exports = {
    postgresMd5PasswordHash,
    randomBytes: nodeCrypto.randomBytes,
    deriveKey,
    sha256,
    hashByName,
    hmacSha256,
    md5
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const useLegacyCrypto = parseInt(process.versions && process.versions.node && process.versions.node.split('.')[0]) < 15;
if (useLegacyCrypto) {
    // We are on an old version of Node.js that requires legacy crypto utilities.
    module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils-legacy.js [instrumentation-edge] (ecmascript)");
} else {
    module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils-webcrypto.js [instrumentation-edge] (ecmascript)");
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/cert-signatures.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

function x509Error(msg, cert) {
    return new Error('SASL channel binding: ' + msg + ' when parsing public certificate ' + cert.toString('base64'));
}
function readASN1Length(data, index) {
    let length = data[index++];
    if (length < 0x80) return {
        length,
        index
    };
    const lengthBytes = length & 0x7f;
    if (lengthBytes > 4) throw x509Error('bad length', data);
    length = 0;
    for(let i = 0; i < lengthBytes; i++){
        length = length << 8 | data[index++];
    }
    return {
        length,
        index
    };
}
function readASN1OID(data, index) {
    if (data[index++] !== 0x6) throw x509Error('non-OID data', data) // 6 = OID
    ;
    const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index);
    index = indexAfterOIDLength;
    const lastIndex = index + OIDLength;
    const byte1 = data[index++];
    let oid = (byte1 / 40 >> 0) + '.' + byte1 % 40;
    while(index < lastIndex){
        // loop over numbers in OID
        let value = 0;
        while(index < lastIndex){
            // loop over bytes in number
            const nextByte = data[index++];
            value = value << 7 | nextByte & 0x7f;
            if (nextByte < 0x80) break;
        }
        oid += '.' + value;
    }
    return {
        oid,
        index
    };
}
function expectASN1Seq(data, index) {
    if (data[index++] !== 0x30) throw x509Error('non-sequence data', data) // 30 = Sequence
    ;
    return readASN1Length(data, index);
}
function signatureAlgorithmHashFromCertificate(data, index) {
    // read this thread: https://www.postgresql.org/message-id/17760-b6c61e752ec07060%40postgresql.org
    if (index === undefined) index = 0;
    index = expectASN1Seq(data, index).index;
    const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index);
    index = indexAfterCertInfoLength + certInfoLength; // skip over certificate info
    index = expectASN1Seq(data, index).index; // skip over signature length field
    const { oid, index: indexAfterOID } = readASN1OID(data, index);
    switch(oid){
        // RSA
        case '1.2.840.113549.1.1.4':
            return 'MD5';
        case '1.2.840.113549.1.1.5':
            return 'SHA-1';
        case '1.2.840.113549.1.1.11':
            return 'SHA-256';
        case '1.2.840.113549.1.1.12':
            return 'SHA-384';
        case '1.2.840.113549.1.1.13':
            return 'SHA-512';
        case '1.2.840.113549.1.1.14':
            return 'SHA-224';
        case '1.2.840.113549.1.1.15':
            return 'SHA512-224';
        case '1.2.840.113549.1.1.16':
            return 'SHA512-256';
        // ECDSA
        case '1.2.840.10045.4.1':
            return 'SHA-1';
        case '1.2.840.10045.4.3.1':
            return 'SHA-224';
        case '1.2.840.10045.4.3.2':
            return 'SHA-256';
        case '1.2.840.10045.4.3.3':
            return 'SHA-384';
        case '1.2.840.10045.4.3.4':
            return 'SHA-512';
        // RSASSA-PSS: hash is indicated separately
        case '1.2.840.113549.1.1.10':
            {
                index = indexAfterOID;
                index = expectASN1Seq(data, index).index;
                if (data[index++] !== 0xa0) throw x509Error('non-tag data', data) // a0 = constructed tag 0
                ;
                index = readASN1Length(data, index).index; // skip over tag length field
                index = expectASN1Seq(data, index).index; // skip over sequence length field
                const { oid: hashOID } = readASN1OID(data, index);
                switch(hashOID){
                    // standalone hash OIDs
                    case '1.2.840.113549.2.5':
                        return 'MD5';
                    case '1.3.14.3.2.26':
                        return 'SHA-1';
                    case '2.16.840.1.101.3.4.2.1':
                        return 'SHA-256';
                    case '2.16.840.1.101.3.4.2.2':
                        return 'SHA-384';
                    case '2.16.840.1.101.3.4.2.3':
                        return 'SHA-512';
                }
                throw x509Error('unknown hash OID ' + hashOID, data);
            }
        // Ed25519 -- see https: return//github.com/openssl/openssl/issues/15477
        case '1.3.101.110':
        case '1.3.101.112':
            return 'SHA-512';
        // Ed448 -- still not in pg 17.2 (if supported, digest would be SHAKE256 x 64 bytes)
        case '1.3.101.111':
        case '1.3.101.113':
            throw x509Error('Ed448 certificate channel binding is not currently supported by Postgres');
    }
    throw x509Error('unknown OID ' + oid, data);
}
module.exports = {
    signatureAlgorithmHashFromCertificate
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/sasl.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
'use strict';
const crypto = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils.js [instrumentation-edge] (ecmascript)");
const { signatureAlgorithmHashFromCertificate } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/cert-signatures.js [instrumentation-edge] (ecmascript)");
function startSession(mechanisms, stream) {
    const candidates = [
        'SCRAM-SHA-256'
    ];
    if (stream) candidates.unshift('SCRAM-SHA-256-PLUS'); // higher-priority, so placed first
    const mechanism = candidates.find((candidate)=>mechanisms.includes(candidate));
    if (!mechanism) {
        throw new Error('SASL: Only mechanism(s) ' + candidates.join(' and ') + ' are supported');
    }
    if (mechanism === 'SCRAM-SHA-256-PLUS' && typeof stream.getPeerCertificate !== 'function') {
        // this should never happen if we are really talking to a Postgres server
        throw new Error('SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate');
    }
    const clientNonce = crypto.randomBytes(18).toString('base64');
    const gs2Header = mechanism === 'SCRAM-SHA-256-PLUS' ? 'p=tls-server-end-point' : stream ? 'y' : 'n';
    return {
        mechanism,
        clientNonce,
        response: gs2Header + ',,n=*,r=' + clientNonce,
        message: 'SASLInitialResponse'
    };
}
async function continueSession(session, password, serverData, stream) {
    if (session.message !== 'SASLInitialResponse') {
        throw new Error('SASL: Last message was not SASLInitialResponse');
    }
    if (typeof password !== 'string') {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string');
    }
    if (password === '') {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string');
    }
    if (typeof serverData !== 'string') {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string');
    }
    const sv = parseServerFirstMessage(serverData);
    if (!sv.nonce.startsWith(session.clientNonce)) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce');
    } else if (sv.nonce.length === session.clientNonce.length) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short');
    }
    const clientFirstMessageBare = 'n=*,r=' + session.clientNonce;
    const serverFirstMessage = 'r=' + sv.nonce + ',s=' + sv.salt + ',i=' + sv.iteration;
    // without channel binding:
    let channelBinding = stream ? 'eSws' : 'biws' // 'y,,' or 'n,,', base64-encoded
    ;
    // override if channel binding is in use:
    if (session.mechanism === 'SCRAM-SHA-256-PLUS') {
        const peerCert = stream.getPeerCertificate().raw;
        let hashName = signatureAlgorithmHashFromCertificate(peerCert);
        if (hashName === 'MD5' || hashName === 'SHA-1') hashName = 'SHA-256';
        const certHash = await crypto.hashByName(hashName, peerCert);
        const bindingData = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].concat([
            __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from('p=tls-server-end-point,,'),
            __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(certHash)
        ]);
        channelBinding = bindingData.toString('base64');
    }
    const clientFinalMessageWithoutProof = 'c=' + channelBinding + ',r=' + sv.nonce;
    const authMessage = clientFirstMessageBare + ',' + serverFirstMessage + ',' + clientFinalMessageWithoutProof;
    const saltBytes = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(sv.salt, 'base64');
    const saltedPassword = await crypto.deriveKey(password, saltBytes, sv.iteration);
    const clientKey = await crypto.hmacSha256(saltedPassword, 'Client Key');
    const storedKey = await crypto.sha256(clientKey);
    const clientSignature = await crypto.hmacSha256(storedKey, authMessage);
    const clientProof = xorBuffers(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(clientKey), __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(clientSignature)).toString('base64');
    const serverKey = await crypto.hmacSha256(saltedPassword, 'Server Key');
    const serverSignatureBytes = await crypto.hmacSha256(serverKey, authMessage);
    session.message = 'SASLResponse';
    session.serverSignature = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(serverSignatureBytes).toString('base64');
    session.response = clientFinalMessageWithoutProof + ',p=' + clientProof;
}
function finalizeSession(session, serverData) {
    if (session.message !== 'SASLResponse') {
        throw new Error('SASL: Last message was not SASLResponse');
    }
    if (typeof serverData !== 'string') {
        throw new Error('SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string');
    }
    const { serverSignature } = parseServerFinalMessage(serverData);
    if (serverSignature !== session.serverSignature) {
        throw new Error('SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match');
    }
}
/**
 * printable       = %x21-2B / %x2D-7E
 *                   ;; Printable ASCII except ",".
 *                   ;; Note that any "printable" is also
 *                   ;; a valid "value".
 */ function isPrintableChars(text) {
    if (typeof text !== 'string') {
        throw new TypeError('SASL: text must be a string');
    }
    return text.split('').map((_, i)=>text.charCodeAt(i)).every((c)=>c >= 0x21 && c <= 0x2b || c >= 0x2d && c <= 0x7e);
}
/**
 * base64-char     = ALPHA / DIGIT / "/" / "+"
 *
 * base64-4        = 4base64-char
 *
 * base64-3        = 3base64-char "="
 *
 * base64-2        = 2base64-char "=="
 *
 * base64          = *base64-4 [base64-3 / base64-2]
 */ function isBase64(text) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
}
function parseAttributePairs(text) {
    if (typeof text !== 'string') {
        throw new TypeError('SASL: attribute pairs text must be a string');
    }
    return new Map(text.split(',').map((attrValue)=>{
        if (!/^.=/.test(attrValue)) {
            throw new Error('SASL: Invalid attribute pair entry');
        }
        const name = attrValue[0];
        const value = attrValue.substring(2);
        return [
            name,
            value
        ];
    }));
}
function parseServerFirstMessage(data) {
    const attrPairs = parseAttributePairs(data);
    const nonce = attrPairs.get('r');
    if (!nonce) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing');
    } else if (!isPrintableChars(nonce)) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters');
    }
    const salt = attrPairs.get('s');
    if (!salt) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing');
    } else if (!isBase64(salt)) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64');
    }
    const iterationText = attrPairs.get('i');
    if (!iterationText) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing');
    } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count');
    }
    const iteration = parseInt(iterationText, 10);
    return {
        nonce,
        salt,
        iteration
    };
}
function parseServerFinalMessage(serverData) {
    const attrPairs = parseAttributePairs(serverData);
    const serverSignature = attrPairs.get('v');
    if (!serverSignature) {
        throw new Error('SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing');
    } else if (!isBase64(serverSignature)) {
        throw new Error('SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64');
    }
    return {
        serverSignature
    };
}
function xorBuffers(a, b) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].isBuffer(a)) {
        throw new TypeError('first argument must be a Buffer');
    }
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].isBuffer(b)) {
        throw new TypeError('second argument must be a Buffer');
    }
    if (a.length !== b.length) {
        throw new Error('Buffer lengths must match');
    }
    if (a.length === 0) {
        throw new Error('Buffers cannot be empty');
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(a.map((_, i)=>a[i] ^ b[i]));
}
module.exports = {
    startSession,
    continueSession,
    finalizeSession
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/type-overrides.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [instrumentation-edge] (ecmascript)");
function TypeOverrides(userTypes) {
    this._types = userTypes || types;
    this.text = {};
    this.binary = {};
}
TypeOverrides.prototype.getOverrides = function(format) {
    switch(format){
        case 'text':
            return this.text;
        case 'binary':
            return this.binary;
        default:
            return {};
    }
};
TypeOverrides.prototype.setTypeParser = function(oid, format, parseFn) {
    if (typeof format === 'function') {
        parseFn = format;
        format = 'text';
    }
    this.getOverrides(format)[oid] = parseFn;
};
TypeOverrides.prototype.getTypeParser = function(oid, format) {
    format = format || 'text';
    return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
};
module.exports = TypeOverrides;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection-parameters.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const dns = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'dns', ecmascript)");
const defaults = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [instrumentation-edge] (ecmascript)");
const parse = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-connection-string/index.js [instrumentation-edge] (ecmascript)").parse // parses a connection string
;
const val = function(key, config, envVar) {
    if (config[key]) {
        return config[key];
    }
    if (envVar === undefined) {
        envVar = process.env['PG' + key.toUpperCase()];
    } else if (envVar === false) {
    // do nothing ... use false
    } else {
        envVar = process.env[envVar];
    }
    return envVar || defaults[key];
};
const readSSLConfigFromEnvironment = function() {
    switch(process.env.PGSSLMODE){
        case 'disable':
            return false;
        case 'prefer':
        case 'require':
        case 'verify-ca':
        case 'verify-full':
            return true;
        case 'no-verify':
            return {
                rejectUnauthorized: false
            };
    }
    return defaults.ssl;
};
// Convert arg to a string, surround in single quotes, and escape single quotes and backslashes
const quoteParamValue = function(value) {
    return "'" + ('' + value).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
};
const add = function(params, config, paramName) {
    const value = config[paramName];
    if (value !== undefined && value !== null) {
        params.push(paramName + '=' + quoteParamValue(value));
    }
};
class ConnectionParameters {
    constructor(config){
        // if a string is passed, it is a raw connection string so we parse it into a config
        config = typeof config === 'string' ? parse(config) : config || {};
        // if the config has a connectionString defined, parse IT into the config we use
        // this will override other default values with what is stored in connectionString
        if (config.connectionString) {
            config = Object.assign({}, config, parse(config.connectionString));
        }
        this.user = val('user', config);
        this.database = val('database', config);
        if (this.database === undefined) {
            this.database = this.user;
        }
        this.port = parseInt(val('port', config), 10);
        this.host = val('host', config);
        // "hiding" the password so it doesn't show up in stack traces
        // or if the client is console.logged
        Object.defineProperty(this, 'password', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: val('password', config)
        });
        this.binary = val('binary', config);
        this.options = val('options', config);
        this.ssl = typeof config.ssl === 'undefined' ? readSSLConfigFromEnvironment() : config.ssl;
        if (typeof this.ssl === 'string') {
            if (this.ssl === 'true') {
                this.ssl = true;
            }
        }
        // support passing in ssl=no-verify via connection string
        if (this.ssl === 'no-verify') {
            this.ssl = {
                rejectUnauthorized: false
            };
        }
        if (this.ssl && this.ssl.key) {
            Object.defineProperty(this.ssl, 'key', {
                enumerable: false
            });
        }
        this.client_encoding = val('client_encoding', config);
        this.replication = val('replication', config);
        // a domain socket begins with '/'
        this.isDomainSocket = !(this.host || '').indexOf('/');
        this.application_name = val('application_name', config, 'PGAPPNAME');
        this.fallback_application_name = val('fallback_application_name', config, false);
        this.statement_timeout = val('statement_timeout', config, false);
        this.lock_timeout = val('lock_timeout', config, false);
        this.idle_in_transaction_session_timeout = val('idle_in_transaction_session_timeout', config, false);
        this.query_timeout = val('query_timeout', config, false);
        if (config.connectionTimeoutMillis === undefined) {
            this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
        } else {
            this.connect_timeout = Math.floor(config.connectionTimeoutMillis / 1000);
        }
        if (config.keepAlive === false) {
            this.keepalives = 0;
        } else if (config.keepAlive === true) {
            this.keepalives = 1;
        }
        if (typeof config.keepAliveInitialDelayMillis === 'number') {
            this.keepalives_idle = Math.floor(config.keepAliveInitialDelayMillis / 1000);
        }
    }
    getLibpqConnectionString(cb) {
        const params = [];
        add(params, this, 'user');
        add(params, this, 'password');
        add(params, this, 'port');
        add(params, this, 'application_name');
        add(params, this, 'fallback_application_name');
        add(params, this, 'connect_timeout');
        add(params, this, 'options');
        const ssl = typeof this.ssl === 'object' ? this.ssl : this.ssl ? {
            sslmode: this.ssl
        } : {};
        add(params, ssl, 'sslmode');
        add(params, ssl, 'sslca');
        add(params, ssl, 'sslkey');
        add(params, ssl, 'sslcert');
        add(params, ssl, 'sslrootcert');
        if (this.database) {
            params.push('dbname=' + quoteParamValue(this.database));
        }
        if (this.replication) {
            params.push('replication=' + quoteParamValue(this.replication));
        }
        if (this.host) {
            params.push('host=' + quoteParamValue(this.host));
        }
        if (this.isDomainSocket) {
            return cb(null, params.join(' '));
        }
        if (this.client_encoding) {
            params.push('client_encoding=' + quoteParamValue(this.client_encoding));
        }
        dns.lookup(this.host, function(err, address) {
            if (err) return cb(err, null);
            params.push('hostaddr=' + quoteParamValue(address));
            return cb(null, params.join(' '));
        });
    }
}
module.exports = ConnectionParameters;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/result.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
'use strict';
const types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [instrumentation-edge] (ecmascript)");
const matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
// result object returned from query
// in the 'end' event and also
// passed as second argument to provided callback
class Result {
    constructor(rowMode, types){
        this.command = null;
        this.rowCount = null;
        this.oid = null;
        this.rows = [];
        this.fields = [];
        this._parsers = undefined;
        this._types = types;
        this.RowCtor = null;
        this.rowAsArray = rowMode === 'array';
        if (this.rowAsArray) {
            this.parseRow = this._parseRowAsArray;
        }
        this._prebuiltEmptyResultObject = null;
    }
    // adds a command complete message
    addCommandComplete(msg) {
        let match;
        if (msg.text) {
            // pure javascript
            match = matchRegexp.exec(msg.text);
        } else {
            // native bindings
            match = matchRegexp.exec(msg.command);
        }
        if (match) {
            this.command = match[1];
            if (match[3]) {
                // COMMAND OID ROWS
                this.oid = parseInt(match[2], 10);
                this.rowCount = parseInt(match[3], 10);
            } else if (match[2]) {
                // COMMAND ROWS
                this.rowCount = parseInt(match[2], 10);
            }
        }
    }
    _parseRowAsArray(rowData) {
        const row = new Array(rowData.length);
        for(let i = 0, len = rowData.length; i < len; i++){
            const rawValue = rowData[i];
            if (rawValue !== null) {
                row[i] = this._parsers[i](rawValue);
            } else {
                row[i] = null;
            }
        }
        return row;
    }
    parseRow(rowData) {
        const row = {
            ...this._prebuiltEmptyResultObject
        };
        for(let i = 0, len = rowData.length; i < len; i++){
            const rawValue = rowData[i];
            const field = this.fields[i].name;
            if (rawValue !== null) {
                const v = this.fields[i].format === 'binary' ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(rawValue) : rawValue;
                row[field] = this._parsers[i](v);
            } else {
                row[field] = null;
            }
        }
        return row;
    }
    addRow(row) {
        this.rows.push(row);
    }
    addFields(fieldDescriptions) {
        // clears field definitions
        // multiple query statements in 1 action can result in multiple sets
        // of rowDescriptions...eg: 'select NOW(); select 1::int;'
        // you need to reset the fields
        this.fields = fieldDescriptions;
        if (this.fields.length) {
            this._parsers = new Array(fieldDescriptions.length);
        }
        const row = {};
        for(let i = 0; i < fieldDescriptions.length; i++){
            const desc = fieldDescriptions[i];
            row[desc.name] = null;
            if (this._types) {
                this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || 'text');
            } else {
                this._parsers[i] = types.getTypeParser(desc.dataTypeID, desc.format || 'text');
            }
        }
        this._prebuiltEmptyResultObject = {
            ...row
        };
    }
}
module.exports = Result;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/query.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { EventEmitter } = __turbopack_context__.r("[externals]/node:events [external] (node:events, cjs)");
const Result = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/result.js [instrumentation-edge] (ecmascript)");
const utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [instrumentation-edge] (ecmascript)");
class Query extends EventEmitter {
    constructor(config, values, callback){
        super();
        config = utils.normalizeQueryConfig(config, values, callback);
        this.text = config.text;
        this.values = config.values;
        this.rows = config.rows;
        this.types = config.types;
        this.name = config.name;
        this.queryMode = config.queryMode;
        this.binary = config.binary;
        // use unique portal name each time
        this.portal = config.portal || '';
        this.callback = config.callback;
        this._rowMode = config.rowMode;
        if (process.domain && config.callback) {
            this.callback = process.domain.bind(config.callback);
        }
        this._result = new Result(this._rowMode, this.types);
        // potential for multiple results
        this._results = this._result;
        this._canceledDueToError = false;
    }
    requiresPreparation() {
        if (this.queryMode === 'extended') {
            return true;
        }
        // named queries must always be prepared
        if (this.name) {
            return true;
        }
        // always prepare if there are max number of rows expected per
        // portal execution
        if (this.rows) {
            return true;
        }
        // don't prepare empty text queries
        if (!this.text) {
            return false;
        }
        // prepare if there are values
        if (!this.values) {
            return false;
        }
        return this.values.length > 0;
    }
    _checkForMultirow() {
        // if we already have a result with a command property
        // then we've already executed one query in a multi-statement simple query
        // turn our results into an array of results
        if (this._result.command) {
            if (!Array.isArray(this._results)) {
                this._results = [
                    this._result
                ];
            }
            this._result = new Result(this._rowMode, this._result._types);
            this._results.push(this._result);
        }
    }
    // associates row metadata from the supplied
    // message with this query object
    // metadata used when parsing row results
    handleRowDescription(msg) {
        this._checkForMultirow();
        this._result.addFields(msg.fields);
        this._accumulateRows = this.callback || !this.listeners('row').length;
    }
    handleDataRow(msg) {
        let row;
        if (this._canceledDueToError) {
            return;
        }
        try {
            row = this._result.parseRow(msg.fields);
        } catch (err) {
            this._canceledDueToError = err;
            return;
        }
        this.emit('row', row, this._result);
        if (this._accumulateRows) {
            this._result.addRow(row);
        }
    }
    handleCommandComplete(msg, connection) {
        this._checkForMultirow();
        this._result.addCommandComplete(msg);
        // need to sync after each command complete of a prepared statement
        // if we were using a row count which results in multiple calls to _getRows
        if (this.rows) {
            connection.sync();
        }
    }
    // if a named prepared statement is created with empty query text
    // the backend will send an emptyQuery message but *not* a command complete message
    // since we pipeline sync immediately after execute we don't need to do anything here
    // unless we have rows specified, in which case we did not pipeline the initial sync call
    handleEmptyQuery(connection) {
        if (this.rows) {
            connection.sync();
        }
    }
    handleError(err, connection) {
        // need to sync after error during a prepared statement
        if (this._canceledDueToError) {
            err = this._canceledDueToError;
            this._canceledDueToError = false;
        }
        // if callback supplied do not emit error event as uncaught error
        // events will bubble up to node process
        if (this.callback) {
            return this.callback(err);
        }
        this.emit('error', err);
    }
    handleReadyForQuery(con) {
        if (this._canceledDueToError) {
            return this.handleError(this._canceledDueToError, con);
        }
        if (this.callback) {
            try {
                this.callback(null, this._results);
            } catch (err) {
                process.nextTick(()=>{
                    throw err;
                });
            }
        }
        this.emit('end', this._results);
    }
    submit(connection) {
        if (typeof this.text !== 'string' && typeof this.name !== 'string') {
            return new Error('A query must have either text or a name. Supplying neither is unsupported.');
        }
        const previous = connection.parsedStatements[this.name];
        if (this.text && previous && this.text !== previous) {
            return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
        }
        if (this.values && !Array.isArray(this.values)) {
            return new Error('Query values must be an array');
        }
        if (this.requiresPreparation()) {
            // If we're using the extended query protocol we fire off several separate commands
            // to the backend. On some versions of node & some operating system versions
            // the network stack writes each message separately instead of buffering them together
            // causing the client & network to send more slowly. Corking & uncorking the stream
            // allows node to buffer up the messages internally before sending them all off at once.
            // note: we're checking for existence of cork/uncork because some versions of streams
            // might not have this (cloudflare?)
            connection.stream.cork && connection.stream.cork();
            try {
                this.prepare(connection);
            } finally{
                // while unlikely for this.prepare to throw, if it does & we don't uncork this stream
                // this client becomes unresponsive, so put in finally block "just in case"
                connection.stream.uncork && connection.stream.uncork();
            }
        } else {
            connection.query(this.text);
        }
        return null;
    }
    hasBeenParsed(connection) {
        return this.name && connection.parsedStatements[this.name];
    }
    handlePortalSuspended(connection) {
        this._getRows(connection, this.rows);
    }
    _getRows(connection, rows) {
        connection.execute({
            portal: this.portal,
            rows: rows
        });
        // if we're not reading pages of rows send the sync command
        // to indicate the pipeline is finished
        if (!rows) {
            connection.sync();
        } else {
            // otherwise flush the call out to read more rows
            connection.flush();
        }
    }
    // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
    prepare(connection) {
        // TODO refactor this poor encapsulation
        if (!this.hasBeenParsed(connection)) {
            connection.parse({
                text: this.text,
                name: this.name,
                types: this.types
            });
        }
        // because we're mapping user supplied values to
        // postgres wire protocol compatible values it could
        // throw an exception, so try/catch this section
        try {
            connection.bind({
                portal: this.portal,
                statement: this.name,
                values: this.values,
                binary: this.binary,
                valueMapper: utils.prepareValue
            });
        } catch (err) {
            this.handleError(err, connection);
            return;
        }
        connection.describe({
            type: 'P',
            name: this.portal || ''
        });
        this._getRows(connection, this.rows);
    }
    handleCopyInResponse(connection) {
        connection.sendCopyFail('No source stream defined');
    }
    handleCopyData(msg, connection) {
    // noop
    }
}
module.exports = Query;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/stream.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { getStream, getSecureStream } = getStreamFuncs();
module.exports = {
    /**
   * Get a socket stream compatible with the current runtime environment.
   * @returns {Duplex}
   */ getStream,
    /**
   * Get a TLS secured socket, compatible with the current environment,
   * using the socket and other settings given in `options`.
   * @returns {Duplex}
   */ getSecureStream
};
/**
 * The stream functions that work in Node.js
 */ function getNodejsStreamFuncs() {
    function getStream(ssl) {
        const net = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'net', ecmascript)");
        return new net.Socket();
    }
    function getSecureStream(options) {
        const tls = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'tls', ecmascript)");
        return tls.connect(options);
    }
    return {
        getStream,
        getSecureStream
    };
}
/**
 * The stream functions that work in Cloudflare Workers
 */ function getCloudflareStreamFuncs() {
    function getStream(ssl) {
        const { CloudflareSocket } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-cloudflare/dist/empty.js [instrumentation-edge] (ecmascript)");
        return new CloudflareSocket(ssl);
    }
    function getSecureStream(options) {
        options.socket.startTls(options);
        return options.socket;
    }
    return {
        getStream,
        getSecureStream
    };
}
/**
 * Are we running in a Cloudflare Worker?
 *
 * @returns true if the code is currently running inside a Cloudflare Worker.
 */ function isCloudflareRuntime() {
    // Since 2022-03-21 the `global_navigator` compatibility flag is on for Cloudflare Workers
    // which means that `navigator.userAgent` will be defined.
    // eslint-disable-next-line no-undef
    if (typeof navigator === 'object' && navigator !== null && typeof navigator.userAgent === 'string') {
        // eslint-disable-next-line no-undef
        return navigator.userAgent === 'Cloudflare-Workers';
    }
    // In case `navigator` or `navigator.userAgent` is not defined then try a more sneaky approach
    if (typeof Response === 'function') {
        const resp = new Response(null, {
            cf: {
                thing: true
            }
        });
        if (typeof resp.cf === 'object' && resp.cf !== null && resp.cf.thing) {
            return true;
        }
    }
    return false;
}
function getStreamFuncs() {
    if (isCloudflareRuntime()) {
        return getCloudflareStreamFuncs();
    }
    return getNodejsStreamFuncs();
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/node:events [external] (node:events, cjs)").EventEmitter;
const { parse, serialize } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/index.js [instrumentation-edge] (ecmascript)");
const { getStream, getSecureStream } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/stream.js [instrumentation-edge] (ecmascript)");
const flushBuffer = serialize.flush();
const syncBuffer = serialize.sync();
const endBuffer = serialize.end();
// TODO(bmc) support binary mode at some point
class Connection extends EventEmitter {
    constructor(config){
        super();
        config = config || {};
        this.stream = config.stream || getStream(config.ssl);
        if (typeof this.stream === 'function') {
            this.stream = this.stream(config);
        }
        this._keepAlive = config.keepAlive;
        this._keepAliveInitialDelayMillis = config.keepAliveInitialDelayMillis;
        this.parsedStatements = {};
        this.ssl = config.ssl || false;
        this._ending = false;
        this._emitMessage = false;
        const self = this;
        this.on('newListener', function(eventName) {
            if (eventName === 'message') {
                self._emitMessage = true;
            }
        });
    }
    connect(port, host) {
        const self = this;
        this._connecting = true;
        this.stream.setNoDelay(true);
        this.stream.connect(port, host);
        this.stream.once('connect', function() {
            if (self._keepAlive) {
                self.stream.setKeepAlive(true, self._keepAliveInitialDelayMillis);
            }
            self.emit('connect');
        });
        const reportStreamError = function(error) {
            // errors about disconnections should be ignored during disconnect
            if (self._ending && (error.code === 'ECONNRESET' || error.code === 'EPIPE')) {
                return;
            }
            self.emit('error', error);
        };
        this.stream.on('error', reportStreamError);
        this.stream.on('close', function() {
            self.emit('end');
        });
        if (!this.ssl) {
            return this.attachListeners(this.stream);
        }
        this.stream.once('data', function(buffer) {
            const responseCode = buffer.toString('utf8');
            switch(responseCode){
                case 'S':
                    break;
                case 'N':
                    self.stream.end();
                    return self.emit('error', new Error('The server does not support SSL connections'));
                default:
                    // Any other response byte, including 'E' (ErrorResponse) indicating a server error
                    self.stream.end();
                    return self.emit('error', new Error('There was an error establishing an SSL connection'));
            }
            const options = {
                socket: self.stream
            };
            if (self.ssl !== true) {
                Object.assign(options, self.ssl);
                if ('key' in self.ssl) {
                    options.key = self.ssl.key;
                }
            }
            const net = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'net', ecmascript)");
            if (net.isIP && net.isIP(host) === 0) {
                options.servername = host;
            }
            try {
                self.stream = getSecureStream(options);
            } catch (err) {
                return self.emit('error', err);
            }
            self.attachListeners(self.stream);
            self.stream.on('error', reportStreamError);
            self.emit('sslconnect');
        });
    }
    attachListeners(stream) {
        parse(stream, (msg)=>{
            const eventName = msg.name === 'error' ? 'errorMessage' : msg.name;
            if (this._emitMessage) {
                this.emit('message', msg);
            }
            this.emit(eventName, msg);
        });
    }
    requestSsl() {
        this.stream.write(serialize.requestSsl());
    }
    startup(config) {
        this.stream.write(serialize.startup(config));
    }
    cancel(processID, secretKey) {
        this._send(serialize.cancel(processID, secretKey));
    }
    password(password) {
        this._send(serialize.password(password));
    }
    sendSASLInitialResponseMessage(mechanism, initialResponse) {
        this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
    }
    sendSCRAMClientFinalMessage(additionalData) {
        this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
    }
    _send(buffer) {
        if (!this.stream.writable) {
            return false;
        }
        return this.stream.write(buffer);
    }
    query(text) {
        this._send(serialize.query(text));
    }
    // send parse message
    parse(query) {
        this._send(serialize.parse(query));
    }
    // send bind message
    bind(config) {
        this._send(serialize.bind(config));
    }
    // send execute message
    execute(config) {
        this._send(serialize.execute(config));
    }
    flush() {
        if (this.stream.writable) {
            this.stream.write(flushBuffer);
        }
    }
    sync() {
        this._ending = true;
        this._send(syncBuffer);
    }
    ref() {
        this.stream.ref();
    }
    unref() {
        this.stream.unref();
    }
    end() {
        // 0x58 = 'X'
        this._ending = true;
        if (!this._connecting || !this.stream.writable) {
            this.stream.end();
            return;
        }
        return this.stream.write(endBuffer, ()=>{
            this.stream.end();
        });
    }
    close(msg) {
        this._send(serialize.close(msg));
    }
    describe(msg) {
        this._send(serialize.describe(msg));
    }
    sendCopyFromChunk(chunk) {
        this._send(serialize.copyData(chunk));
    }
    endCopyFrom() {
        this._send(serialize.copyDone());
    }
    sendCopyFail(msg) {
        this._send(serialize.copyFail(msg));
    }
}
module.exports = Connection;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/client.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

const EventEmitter = __turbopack_context__.r("[externals]/node:events [external] (node:events, cjs)").EventEmitter;
const utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [instrumentation-edge] (ecmascript)");
const nodeUtils = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
const sasl = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/sasl.js [instrumentation-edge] (ecmascript)");
const TypeOverrides = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/type-overrides.js [instrumentation-edge] (ecmascript)");
const ConnectionParameters = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection-parameters.js [instrumentation-edge] (ecmascript)");
const Query = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/query.js [instrumentation-edge] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [instrumentation-edge] (ecmascript)");
const Connection = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection.js [instrumentation-edge] (ecmascript)");
const crypto = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/crypto/utils.js [instrumentation-edge] (ecmascript)");
const activeQueryDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Client.activeQuery is deprecated and will be removed in pg@9.0');
const queryQueueDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Client.queryQueue is deprecated and will be removed in pg@9.0.');
const pgPassDeprecationNotice = nodeUtils.deprecate(()=>{}, 'pgpass support is deprecated and will be removed in pg@9.0. ' + 'You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code.');
const byoPromiseDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0.');
const queryQueueLengthDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use asycn/await or an external async flow control mechanism instead.');
class Client extends EventEmitter {
    constructor(config){
        super();
        this.connectionParameters = new ConnectionParameters(config);
        this.user = this.connectionParameters.user;
        this.database = this.connectionParameters.database;
        this.port = this.connectionParameters.port;
        this.host = this.connectionParameters.host;
        // "hiding" the password so it doesn't show up in stack traces
        // or if the client is console.logged
        Object.defineProperty(this, 'password', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: this.connectionParameters.password
        });
        this.replication = this.connectionParameters.replication;
        const c = config || {};
        if (c.Promise) {
            byoPromiseDeprecationNotice();
        }
        this._Promise = c.Promise || /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
        this._types = new TypeOverrides(c.types);
        this._ending = false;
        this._ended = false;
        this._connecting = false;
        this._connected = false;
        this._connectionError = false;
        this._queryable = true;
        this._activeQuery = null;
        this.enableChannelBinding = Boolean(c.enableChannelBinding); // set true to use SCRAM-SHA-256-PLUS when offered
        this.connection = c.connection || new Connection({
            stream: c.stream,
            ssl: this.connectionParameters.ssl,
            keepAlive: c.keepAlive || false,
            keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
            encoding: this.connectionParameters.client_encoding || 'utf8'
        });
        this._queryQueue = [];
        this.binary = c.binary || defaults.binary;
        this.processID = null;
        this.secretKey = null;
        this.ssl = this.connectionParameters.ssl || false;
        // As with Password, make SSL->Key (the private key) non-enumerable.
        // It won't show up in stack traces
        // or if the client is console.logged
        if (this.ssl && this.ssl.key) {
            Object.defineProperty(this.ssl, 'key', {
                enumerable: false
            });
        }
        this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
    }
    get activeQuery() {
        activeQueryDeprecationNotice();
        return this._activeQuery;
    }
    set activeQuery(val) {
        activeQueryDeprecationNotice();
        this._activeQuery = val;
    }
    _getActiveQuery() {
        return this._activeQuery;
    }
    _errorAllQueries(err) {
        const enqueueError = (query)=>{
            process.nextTick(()=>{
                query.handleError(err, this.connection);
            });
        };
        const activeQuery = this._getActiveQuery();
        if (activeQuery) {
            enqueueError(activeQuery);
            this._activeQuery = null;
        }
        this._queryQueue.forEach(enqueueError);
        this._queryQueue.length = 0;
    }
    _connect(callback) {
        const self = this;
        const con = this.connection;
        this._connectionCallback = callback;
        if (this._connecting || this._connected) {
            const err = new Error('Client has already been connected. You cannot reuse a client.');
            process.nextTick(()=>{
                callback(err);
            });
            return;
        }
        this._connecting = true;
        if (this._connectionTimeoutMillis > 0) {
            this.connectionTimeoutHandle = setTimeout(()=>{
                con._ending = true;
                con.stream.destroy(new Error('timeout expired'));
            }, this._connectionTimeoutMillis);
            if (this.connectionTimeoutHandle.unref) {
                this.connectionTimeoutHandle.unref();
            }
        }
        if (this.host && this.host.indexOf('/') === 0) {
            con.connect(this.host + '/.s.PGSQL.' + this.port);
        } else {
            con.connect(this.port, this.host);
        }
        // once connection is established send startup message
        con.on('connect', function() {
            if (self.ssl) {
                con.requestSsl();
            } else {
                con.startup(self.getStartupConf());
            }
        });
        con.on('sslconnect', function() {
            con.startup(self.getStartupConf());
        });
        this._attachListeners(con);
        con.once('end', ()=>{
            const error = this._ending ? new Error('Connection terminated') : new Error('Connection terminated unexpectedly');
            clearTimeout(this.connectionTimeoutHandle);
            this._errorAllQueries(error);
            this._ended = true;
            if (!this._ending) {
                // if the connection is ended without us calling .end()
                // on this client then we have an unexpected disconnection
                // treat this as an error unless we've already emitted an error
                // during connection.
                if (this._connecting && !this._connectionError) {
                    if (this._connectionCallback) {
                        this._connectionCallback(error);
                    } else {
                        this._handleErrorEvent(error);
                    }
                } else if (!this._connectionError) {
                    this._handleErrorEvent(error);
                }
            }
            process.nextTick(()=>{
                this.emit('end');
            });
        });
    }
    connect(callback) {
        if (callback) {
            this._connect(callback);
            return;
        }
        return new this._Promise((resolve, reject)=>{
            this._connect((error)=>{
                if (error) {
                    reject(error);
                } else {
                    resolve(this);
                }
            });
        });
    }
    _attachListeners(con) {
        // password request handling
        con.on('authenticationCleartextPassword', this._handleAuthCleartextPassword.bind(this));
        // password request handling
        con.on('authenticationMD5Password', this._handleAuthMD5Password.bind(this));
        // password request handling (SASL)
        con.on('authenticationSASL', this._handleAuthSASL.bind(this));
        con.on('authenticationSASLContinue', this._handleAuthSASLContinue.bind(this));
        con.on('authenticationSASLFinal', this._handleAuthSASLFinal.bind(this));
        con.on('backendKeyData', this._handleBackendKeyData.bind(this));
        con.on('error', this._handleErrorEvent.bind(this));
        con.on('errorMessage', this._handleErrorMessage.bind(this));
        con.on('readyForQuery', this._handleReadyForQuery.bind(this));
        con.on('notice', this._handleNotice.bind(this));
        con.on('rowDescription', this._handleRowDescription.bind(this));
        con.on('dataRow', this._handleDataRow.bind(this));
        con.on('portalSuspended', this._handlePortalSuspended.bind(this));
        con.on('emptyQuery', this._handleEmptyQuery.bind(this));
        con.on('commandComplete', this._handleCommandComplete.bind(this));
        con.on('parseComplete', this._handleParseComplete.bind(this));
        con.on('copyInResponse', this._handleCopyInResponse.bind(this));
        con.on('copyData', this._handleCopyData.bind(this));
        con.on('notification', this._handleNotification.bind(this));
    }
    _getPassword(cb) {
        const con = this.connection;
        if (typeof this.password === 'function') {
            this._Promise.resolve().then(()=>this.password(this.connectionParameters)).then((pass)=>{
                if (pass !== undefined) {
                    if (typeof pass !== 'string') {
                        con.emit('error', new TypeError('Password must be a string'));
                        return;
                    }
                    this.connectionParameters.password = this.password = pass;
                } else {
                    this.connectionParameters.password = this.password = null;
                }
                cb();
            }).catch((err)=>{
                con.emit('error', err);
            });
        } else if (this.password !== null) {
            cb();
        } else {
            try {
                const pgPass = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pgpass/lib/index.js [instrumentation-edge] (ecmascript)");
                pgPass(this.connectionParameters, (pass)=>{
                    if (undefined !== pass) {
                        pgPassDeprecationNotice();
                        this.connectionParameters.password = this.password = pass;
                    }
                    cb();
                });
            } catch (e) {
                this.emit('error', e);
            }
        }
    }
    _handleAuthCleartextPassword(msg) {
        this._getPassword(()=>{
            this.connection.password(this.password);
        });
    }
    _handleAuthMD5Password(msg) {
        this._getPassword(async ()=>{
            try {
                const hashedPassword = await crypto.postgresMd5PasswordHash(this.user, this.password, msg.salt);
                this.connection.password(hashedPassword);
            } catch (e) {
                this.emit('error', e);
            }
        });
    }
    _handleAuthSASL(msg) {
        this._getPassword(()=>{
            try {
                this.saslSession = sasl.startSession(msg.mechanisms, this.enableChannelBinding && this.connection.stream);
                this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
            } catch (err) {
                this.connection.emit('error', err);
            }
        });
    }
    async _handleAuthSASLContinue(msg) {
        try {
            await sasl.continueSession(this.saslSession, this.password, msg.data, this.enableChannelBinding && this.connection.stream);
            this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
        } catch (err) {
            this.connection.emit('error', err);
        }
    }
    _handleAuthSASLFinal(msg) {
        try {
            sasl.finalizeSession(this.saslSession, msg.data);
            this.saslSession = null;
        } catch (err) {
            this.connection.emit('error', err);
        }
    }
    _handleBackendKeyData(msg) {
        this.processID = msg.processID;
        this.secretKey = msg.secretKey;
    }
    _handleReadyForQuery(msg) {
        if (this._connecting) {
            this._connecting = false;
            this._connected = true;
            clearTimeout(this.connectionTimeoutHandle);
            // process possible callback argument to Client#connect
            if (this._connectionCallback) {
                this._connectionCallback(null, this);
                // remove callback for proper error handling
                // after the connect event
                this._connectionCallback = null;
            }
            this.emit('connect');
        }
        const activeQuery = this._getActiveQuery();
        this._activeQuery = null;
        this.readyForQuery = true;
        if (activeQuery) {
            activeQuery.handleReadyForQuery(this.connection);
        }
        this._pulseQueryQueue();
    }
    // if we receive an error event or error message
    // during the connection process we handle it here
    _handleErrorWhileConnecting(err) {
        if (this._connectionError) {
            // TODO(bmc): this is swallowing errors - we shouldn't do this
            return;
        }
        this._connectionError = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
            return this._connectionCallback(err);
        }
        this.emit('error', err);
    }
    // if we're connected and we receive an error event from the connection
    // this means the socket is dead - do a hard abort of all queries and emit
    // the socket error on the client as well
    _handleErrorEvent(err) {
        if (this._connecting) {
            return this._handleErrorWhileConnecting(err);
        }
        this._queryable = false;
        this._errorAllQueries(err);
        this.emit('error', err);
    }
    // handle error messages from the postgres backend
    _handleErrorMessage(msg) {
        if (this._connecting) {
            return this._handleErrorWhileConnecting(msg);
        }
        const activeQuery = this._getActiveQuery();
        if (!activeQuery) {
            this._handleErrorEvent(msg);
            return;
        }
        this._activeQuery = null;
        activeQuery.handleError(msg, this.connection);
    }
    _handleRowDescription(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected rowDescription message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate rowDescription to active query
        activeQuery.handleRowDescription(msg);
    }
    _handleDataRow(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected dataRow message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate dataRow to active query
        activeQuery.handleDataRow(msg);
    }
    _handlePortalSuspended(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected portalSuspended message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate portalSuspended to active query
        activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected emptyQuery message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate emptyQuery to active query
        activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected commandComplete message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // delegate commandComplete to active query
        activeQuery.handleCommandComplete(msg, this.connection);
    }
    _handleParseComplete() {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected parseComplete message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        // if a prepared statement has a name and properly parses
        // we track that its already been executed so we don't parse
        // it again on the same client
        if (activeQuery.name) {
            this.connection.parsedStatements[activeQuery.name] = activeQuery.text;
        }
    }
    _handleCopyInResponse(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected copyInResponse message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        activeQuery.handleCopyInResponse(this.connection);
    }
    _handleCopyData(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
            const error = new Error('Received unexpected copyData message from backend.');
            this._handleErrorEvent(error);
            return;
        }
        activeQuery.handleCopyData(msg, this.connection);
    }
    _handleNotification(msg) {
        this.emit('notification', msg);
    }
    _handleNotice(msg) {
        this.emit('notice', msg);
    }
    getStartupConf() {
        const params = this.connectionParameters;
        const data = {
            user: params.user,
            database: params.database
        };
        const appName = params.application_name || params.fallback_application_name;
        if (appName) {
            data.application_name = appName;
        }
        if (params.replication) {
            data.replication = '' + params.replication;
        }
        if (params.statement_timeout) {
            data.statement_timeout = String(parseInt(params.statement_timeout, 10));
        }
        if (params.lock_timeout) {
            data.lock_timeout = String(parseInt(params.lock_timeout, 10));
        }
        if (params.idle_in_transaction_session_timeout) {
            data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
        }
        if (params.options) {
            data.options = params.options;
        }
        return data;
    }
    cancel(client, query) {
        if (client.activeQuery === query) {
            const con = this.connection;
            if (this.host && this.host.indexOf('/') === 0) {
                con.connect(this.host + '/.s.PGSQL.' + this.port);
            } else {
                con.connect(this.port, this.host);
            }
            // once connection is established send cancel message
            con.on('connect', function() {
                con.cancel(client.processID, client.secretKey);
            });
        } else if (client._queryQueue.indexOf(query) !== -1) {
            client._queryQueue.splice(client._queryQueue.indexOf(query), 1);
        }
    }
    setTypeParser(oid, format, parseFn) {
        return this._types.setTypeParser(oid, format, parseFn);
    }
    getTypeParser(oid, format) {
        return this._types.getTypeParser(oid, format);
    }
    // escapeIdentifier and escapeLiteral moved to utility functions & exported
    // on PG
    // re-exported here for backwards compatibility
    escapeIdentifier(str) {
        return utils.escapeIdentifier(str);
    }
    escapeLiteral(str) {
        return utils.escapeLiteral(str);
    }
    _pulseQueryQueue() {
        if (this.readyForQuery === true) {
            this._activeQuery = this._queryQueue.shift();
            const activeQuery = this._getActiveQuery();
            if (activeQuery) {
                this.readyForQuery = false;
                this.hasExecuted = true;
                const queryError = activeQuery.submit(this.connection);
                if (queryError) {
                    process.nextTick(()=>{
                        activeQuery.handleError(queryError, this.connection);
                        this.readyForQuery = true;
                        this._pulseQueryQueue();
                    });
                }
            } else if (this.hasExecuted) {
                this._activeQuery = null;
                this.emit('drain');
            }
        }
    }
    query(config, values, callback) {
        // can take in strings, config object or query object
        let query;
        let result;
        let readTimeout;
        let readTimeoutTimer;
        let queryCallback;
        if (config === null || config === undefined) {
            throw new TypeError('Client was passed a null or undefined query');
        } else if (typeof config.submit === 'function') {
            readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
            result = query = config;
            if (!query.callback) {
                if (typeof values === 'function') {
                    query.callback = values;
                } else if (callback) {
                    query.callback = callback;
                }
            }
        } else {
            readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
            query = new Query(config, values, callback);
            if (!query.callback) {
                result = new this._Promise((resolve, reject)=>{
                    query.callback = (err, res)=>err ? reject(err) : resolve(res);
                }).catch((err)=>{
                    // replace the stack trace that leads to `TCP.onStreamRead` with one that leads back to the
                    // application that created the query
                    Error.captureStackTrace(err);
                    throw err;
                });
            }
        }
        if (readTimeout) {
            queryCallback = query.callback || (()=>{});
            readTimeoutTimer = setTimeout(()=>{
                const error = new Error('Query read timeout');
                process.nextTick(()=>{
                    query.handleError(error, this.connection);
                });
                queryCallback(error);
                // we already returned an error,
                // just do nothing if query completes
                query.callback = ()=>{};
                // Remove from queue
                const index = this._queryQueue.indexOf(query);
                if (index > -1) {
                    this._queryQueue.splice(index, 1);
                }
                this._pulseQueryQueue();
            }, readTimeout);
            query.callback = (err, res)=>{
                clearTimeout(readTimeoutTimer);
                queryCallback(err, res);
            };
        }
        if (this.binary && !query.binary) {
            query.binary = true;
        }
        if (query._result && !query._result._types) {
            query._result._types = this._types;
        }
        if (!this._queryable) {
            process.nextTick(()=>{
                query.handleError(new Error('Client has encountered a connection error and is not queryable'), this.connection);
            });
            return result;
        }
        if (this._ending) {
            process.nextTick(()=>{
                query.handleError(new Error('Client was closed and is not queryable'), this.connection);
            });
            return result;
        }
        if (this._queryQueue.length > 0) {
            queryQueueLengthDeprecationNotice();
        }
        this._queryQueue.push(query);
        this._pulseQueryQueue();
        return result;
    }
    ref() {
        this.connection.ref();
    }
    unref() {
        this.connection.unref();
    }
    end(cb) {
        this._ending = true;
        // if we have never connected, then end is a noop, callback immediately
        if (!this.connection._connecting || this._ended) {
            if (cb) {
                cb();
            } else {
                return this._Promise.resolve();
            }
        }
        if (this._getActiveQuery() || !this._queryable) {
            // if we have an active query we need to force a disconnect
            // on the socket - otherwise a hung query could block end forever
            this.connection.stream.destroy();
        } else {
            this.connection.end();
        }
        if (cb) {
            this.connection.once('end', cb);
        } else {
            return new this._Promise((resolve)=>{
                this.connection.once('end', resolve);
            });
        }
    }
    get queryQueue() {
        queryQueueDeprecationNotice();
        return this._queryQueue;
    }
}
// expose a Query constructor
Client.Query = Query;
module.exports = Client;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/query.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/node:events [external] (node:events, cjs)").EventEmitter;
const util = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
const utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [instrumentation-edge] (ecmascript)");
const NativeQuery = module.exports = function(config, values, callback) {
    EventEmitter.call(this);
    config = utils.normalizeQueryConfig(config, values, callback);
    this.text = config.text;
    this.values = config.values;
    this.name = config.name;
    this.queryMode = config.queryMode;
    this.callback = config.callback;
    this.state = 'new';
    this._arrayMode = config.rowMode === 'array';
    // if the 'row' event is listened for
    // then emit them as they come in
    // without setting singleRowMode to true
    // this has almost no meaning because libpq
    // reads all rows into memory before returning any
    this._emitRowEvents = false;
    this.on('newListener', (function(event) {
        if (event === 'row') this._emitRowEvents = true;
    }).bind(this));
};
util.inherits(NativeQuery, EventEmitter);
const errorFieldMap = {
    sqlState: 'code',
    statementPosition: 'position',
    messagePrimary: 'message',
    context: 'where',
    schemaName: 'schema',
    tableName: 'table',
    columnName: 'column',
    dataTypeName: 'dataType',
    constraintName: 'constraint',
    sourceFile: 'file',
    sourceLine: 'line',
    sourceFunction: 'routine'
};
NativeQuery.prototype.handleError = function(err) {
    // copy pq error fields into the error object
    const fields = this.native.pq.resultErrorFields();
    if (fields) {
        for(const key in fields){
            const normalizedFieldName = errorFieldMap[key] || key;
            err[normalizedFieldName] = fields[key];
        }
    }
    if (this.callback) {
        this.callback(err);
    } else {
        this.emit('error', err);
    }
    this.state = 'error';
};
NativeQuery.prototype.then = function(onSuccess, onFailure) {
    return this._getPromise().then(onSuccess, onFailure);
};
NativeQuery.prototype.catch = function(callback) {
    return this._getPromise().catch(callback);
};
NativeQuery.prototype._getPromise = function() {
    if (this._promise) return this._promise;
    this._promise = new Promise((function(resolve, reject) {
        this._once('end', resolve);
        this._once('error', reject);
    }).bind(this));
    return this._promise;
};
NativeQuery.prototype.submit = function(client) {
    this.state = 'running';
    const self = this;
    this.native = client.native;
    client.native.arrayMode = this._arrayMode;
    let after = function(err, rows, results) {
        client.native.arrayMode = false;
        setImmediate(function() {
            self.emit('_done');
        });
        // handle possible query error
        if (err) {
            return self.handleError(err);
        }
        // emit row events for each row in the result
        if (self._emitRowEvents) {
            if (results.length > 1) {
                rows.forEach((rowOfRows, i)=>{
                    rowOfRows.forEach((row)=>{
                        self.emit('row', row, results[i]);
                    });
                });
            } else {
                rows.forEach(function(row) {
                    self.emit('row', row, results);
                });
            }
        }
        // handle successful result
        self.state = 'end';
        self.emit('end', results);
        if (self.callback) {
            self.callback(null, results);
        }
    };
    if (process.domain) {
        after = process.domain.bind(after);
    }
    // named query
    if (this.name) {
        if (this.name.length > 63) {
            console.error('Warning! Postgres only supports 63 characters for query names.');
            console.error('You supplied %s (%s)', this.name, this.name.length);
            console.error('This can cause conflicts and silent errors executing queries');
        }
        const values = (this.values || []).map(utils.prepareValue);
        // check if the client has already executed this named query
        // if so...just execute it again - skip the planning phase
        if (client.namedQueries[this.name]) {
            if (this.text && client.namedQueries[this.name] !== this.text) {
                const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
                return after(err);
            }
            return client.native.execute(this.name, values, after);
        }
        // plan the named query the first time, then execute it
        return client.native.prepare(this.name, this.text, values.length, function(err) {
            if (err) return after(err);
            client.namedQueries[self.name] = self.text;
            return self.native.execute(self.name, values, after);
        });
    } else if (this.values) {
        if (!Array.isArray(this.values)) {
            const err = new Error('Query values must be an array');
            return after(err);
        }
        const vals = this.values.map(utils.prepareValue);
        client.native.query(this.text, vals, after);
    } else if (this.queryMode === 'extended') {
        client.native.query(this.text, [], after);
    } else {
        client.native.query(this.text, after);
    }
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/client.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

const nodeUtils = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
// eslint-disable-next-line
var Native;
// eslint-disable-next-line no-useless-catch
try {
    // Wrap this `require()` in a try-catch to avoid upstream bundlers from complaining that this might not be available since it is an optional import
    Native = (()=>{
        const e = new Error("Cannot find module 'pg-native'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
} catch (e) {
    throw e;
}
const TypeOverrides = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/type-overrides.js [instrumentation-edge] (ecmascript)");
const EventEmitter = __turbopack_context__.r("[externals]/node:events [external] (node:events, cjs)").EventEmitter;
const util = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
const ConnectionParameters = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection-parameters.js [instrumentation-edge] (ecmascript)");
const NativeQuery = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/query.js [instrumentation-edge] (ecmascript)");
const queryQueueLengthDeprecationNotice = nodeUtils.deprecate(()=>{}, 'Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use asycn/await or an external async flow control mechanism instead.');
const Client = module.exports = function(config) {
    EventEmitter.call(this);
    config = config || {};
    this._Promise = config.Promise || /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
    this._types = new TypeOverrides(config.types);
    this.native = new Native({
        types: this._types
    });
    this._queryQueue = [];
    this._ending = false;
    this._connecting = false;
    this._connected = false;
    this._queryable = true;
    // keep these on the object for legacy reasons
    // for the time being. TODO: deprecate all this jazz
    const cp = this.connectionParameters = new ConnectionParameters(config);
    if (config.nativeConnectionString) cp.nativeConnectionString = config.nativeConnectionString;
    this.user = cp.user;
    // "hiding" the password so it doesn't show up in stack traces
    // or if the client is console.logged
    Object.defineProperty(this, 'password', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: cp.password
    });
    this.database = cp.database;
    this.host = cp.host;
    this.port = cp.port;
    // a hash to hold named queries
    this.namedQueries = {};
};
Client.Query = NativeQuery;
util.inherits(Client, EventEmitter);
Client.prototype._errorAllQueries = function(err) {
    const enqueueError = (query)=>{
        process.nextTick(()=>{
            query.native = this.native;
            query.handleError(err);
        });
    };
    if (this._hasActiveQuery()) {
        enqueueError(this._activeQuery);
        this._activeQuery = null;
    }
    this._queryQueue.forEach(enqueueError);
    this._queryQueue.length = 0;
};
// connect to the backend
// pass an optional callback to be called once connected
// or with an error if there was a connection error
Client.prototype._connect = function(cb) {
    const self = this;
    if (this._connecting) {
        process.nextTick(()=>cb(new Error('Client has already been connected. You cannot reuse a client.')));
        return;
    }
    this._connecting = true;
    this.connectionParameters.getLibpqConnectionString(function(err, conString) {
        if (self.connectionParameters.nativeConnectionString) conString = self.connectionParameters.nativeConnectionString;
        if (err) return cb(err);
        self.native.connect(conString, function(err) {
            if (err) {
                self.native.end();
                return cb(err);
            }
            // set internal states to connected
            self._connected = true;
            // handle connection errors from the native layer
            self.native.on('error', function(err) {
                self._queryable = false;
                self._errorAllQueries(err);
                self.emit('error', err);
            });
            self.native.on('notification', function(msg) {
                self.emit('notification', {
                    channel: msg.relname,
                    payload: msg.extra
                });
            });
            // signal we are connected now
            self.emit('connect');
            self._pulseQueryQueue(true);
            cb(null, this);
        });
    });
};
Client.prototype.connect = function(callback) {
    if (callback) {
        this._connect(callback);
        return;
    }
    return new this._Promise((resolve, reject)=>{
        this._connect((error)=>{
            if (error) {
                reject(error);
            } else {
                resolve(this);
            }
        });
    });
};
// send a query to the server
// this method is highly overloaded to take
// 1) string query, optional array of parameters, optional function callback
// 2) object query with {
//    string query
//    optional array values,
//    optional function callback instead of as a separate parameter
//    optional string name to name & cache the query plan
//    optional string rowMode = 'array' for an array of results
//  }
Client.prototype.query = function(config, values, callback) {
    let query;
    let result;
    let readTimeout;
    let readTimeoutTimer;
    let queryCallback;
    if (config === null || config === undefined) {
        throw new TypeError('Client was passed a null or undefined query');
    } else if (typeof config.submit === 'function') {
        readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
        result = query = config;
        // accept query(new Query(...), (err, res) => { }) style
        if (typeof values === 'function') {
            config.callback = values;
        }
    } else {
        readTimeout = config.query_timeout || this.connectionParameters.query_timeout;
        query = new NativeQuery(config, values, callback);
        if (!query.callback) {
            let resolveOut, rejectOut;
            result = new this._Promise((resolve, reject)=>{
                resolveOut = resolve;
                rejectOut = reject;
            }).catch((err)=>{
                Error.captureStackTrace(err);
                throw err;
            });
            query.callback = (err, res)=>err ? rejectOut(err) : resolveOut(res);
        }
    }
    if (readTimeout) {
        queryCallback = query.callback || (()=>{});
        readTimeoutTimer = setTimeout(()=>{
            const error = new Error('Query read timeout');
            process.nextTick(()=>{
                query.handleError(error, this.connection);
            });
            queryCallback(error);
            // we already returned an error,
            // just do nothing if query completes
            query.callback = ()=>{};
            // Remove from queue
            const index = this._queryQueue.indexOf(query);
            if (index > -1) {
                this._queryQueue.splice(index, 1);
            }
            this._pulseQueryQueue();
        }, readTimeout);
        query.callback = (err, res)=>{
            clearTimeout(readTimeoutTimer);
            queryCallback(err, res);
        };
    }
    if (!this._queryable) {
        query.native = this.native;
        process.nextTick(()=>{
            query.handleError(new Error('Client has encountered a connection error and is not queryable'));
        });
        return result;
    }
    if (this._ending) {
        query.native = this.native;
        process.nextTick(()=>{
            query.handleError(new Error('Client was closed and is not queryable'));
        });
        return result;
    }
    if (this._queryQueue.length > 0) {
        queryQueueLengthDeprecationNotice();
    }
    this._queryQueue.push(query);
    this._pulseQueryQueue();
    return result;
};
// disconnect from the backend server
Client.prototype.end = function(cb) {
    const self = this;
    this._ending = true;
    if (!this._connected) {
        this.once('connect', this.end.bind(this, cb));
    }
    let result;
    if (!cb) {
        result = new this._Promise(function(resolve, reject) {
            cb = (err)=>err ? reject(err) : resolve();
        });
    }
    this.native.end(function() {
        self._connected = false;
        self._errorAllQueries(new Error('Connection terminated'));
        process.nextTick(()=>{
            self.emit('end');
            if (cb) cb();
        });
    });
    return result;
};
Client.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== 'error' && this._activeQuery.state !== 'end';
};
Client.prototype._pulseQueryQueue = function(initialConnection) {
    if (!this._connected) {
        return;
    }
    if (this._hasActiveQuery()) {
        return;
    }
    const query = this._queryQueue.shift();
    if (!query) {
        if (!initialConnection) {
            this.emit('drain');
        }
        return;
    }
    this._activeQuery = query;
    query.submit(this);
    const self = this;
    query.once('_done', function() {
        self._pulseQueryQueue();
    });
};
// attempt to cancel an in-progress query
Client.prototype.cancel = function(query) {
    if (this._activeQuery === query) {
        this.native.cancel(function() {});
    } else if (this._queryQueue.indexOf(query) !== -1) {
        this._queryQueue.splice(this._queryQueue.indexOf(query), 1);
    }
};
Client.prototype.ref = function() {};
Client.prototype.unref = function() {};
Client.prototype.setTypeParser = function(oid, format, parseFn) {
    return this._types.setTypeParser(oid, format, parseFn);
};
Client.prototype.getTypeParser = function(oid, format) {
    return this._types.getTypeParser(oid, format);
};
Client.prototype.isConnected = function() {
    return this._connected;
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/client.js [instrumentation-edge] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Client = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/client.js [instrumentation-edge] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/defaults.js [instrumentation-edge] (ecmascript)");
const Connection = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/connection.js [instrumentation-edge] (ecmascript)");
const Result = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/result.js [instrumentation-edge] (ecmascript)");
const utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [instrumentation-edge] (ecmascript)");
const Pool = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-pool/index.js [instrumentation-edge] (ecmascript)");
const TypeOverrides = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/type-overrides.js [instrumentation-edge] (ecmascript)");
const { DatabaseError } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/index.js [instrumentation-edge] (ecmascript)");
const { escapeIdentifier, escapeLiteral } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/utils.js [instrumentation-edge] (ecmascript)");
const poolFactory = (Client)=>{
    return class BoundPool extends Pool {
        constructor(options){
            super(options, Client);
        }
    };
};
const PG = function(clientConstructor) {
    this.defaults = defaults;
    this.Client = clientConstructor;
    this.Query = this.Client.Query;
    this.Pool = poolFactory(this.Client);
    this._pools = [];
    this.Connection = Connection;
    this.types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-types/index.js [instrumentation-edge] (ecmascript)");
    this.DatabaseError = DatabaseError;
    this.TypeOverrides = TypeOverrides;
    this.escapeIdentifier = escapeIdentifier;
    this.escapeLiteral = escapeLiteral;
    this.Result = Result;
    this.utils = utils;
};
let clientConstructor = Client;
let forceNative = false;
try {
    forceNative = !!process.env.NODE_PG_FORCE_NATIVE;
} catch  {
// ignore, e.g., Deno without --allow-env
}
if (forceNative) {
    clientConstructor = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/index.js [instrumentation-edge] (ecmascript)");
}
module.exports = new PG(clientConstructor);
// lazy require native module...the native module may not have installed
Object.defineProperty(module.exports, 'native', {
    configurable: true,
    enumerable: false,
    get () {
        let native = null;
        try {
            native = new PG(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/native/index.js [instrumentation-edge] (ecmascript)"));
        } catch (err) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                throw err;
            }
        }
        // overwrite module.exports.native so that getter is never called again
        Object.defineProperty(module.exports, 'native', {
            value: native
        });
        return native;
    }
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/esm/index.mjs [instrumentation-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Client",
    ()=>Client,
    "Connection",
    ()=>Connection,
    "DatabaseError",
    ()=>DatabaseError,
    "Pool",
    ()=>Pool,
    "Query",
    ()=>Query,
    "Result",
    ()=>Result,
    "TypeOverrides",
    ()=>TypeOverrides,
    "default",
    ()=>__TURBOPACK__default__export__,
    "defaults",
    ()=>defaults,
    "escapeIdentifier",
    ()=>escapeIdentifier,
    "escapeLiteral",
    ()=>escapeLiteral,
    "types",
    ()=>types
]);
// ESM wrapper for pg
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/index.js [instrumentation-edge] (ecmascript)");
;
const Client = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].Client;
const Pool = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].Pool;
const Connection = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].Connection;
const types = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].types;
const Query = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].Query;
const DatabaseError = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].DatabaseError;
const escapeIdentifier = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].escapeIdentifier;
const escapeLiteral = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].escapeLiteral;
const Result = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].Result;
const TypeOverrides = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].TypeOverrides;
const defaults = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"].defaults;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$pg$2f$lib$2f$index$2e$js__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-connection-string/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

//Parse method copied from https://github.com/brianc/node-postgres
//Copyright (c) 2010-2014 Brian Carlson (brian.m.carlson@gmail.com)
//MIT License
//parses a connection string
function parse(str, options = {}) {
    //unix socket
    if (str.charAt(0) === '/') {
        const config = str.split(' ');
        return {
            host: config[0],
            database: config[1]
        };
    }
    // Check for empty host in URL
    const config = {};
    let result;
    let dummyHost = false;
    if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
        // Ensure spaces are encoded as %20
        str = encodeURI(str).replace(/%25(\d\d)/g, '%$1');
    }
    try {
        try {
            result = new URL(str, 'postgres://base');
        } catch (e) {
            // The URL is invalid so try again with a dummy host
            result = new URL(str.replace('@/', '@___DUMMY___/'), 'postgres://base');
            dummyHost = true;
        }
    } catch (err) {
        // Remove the input from the error message to avoid leaking sensitive information
        err.input && (err.input = '*****REDACTED*****');
        throw err;
    }
    // We'd like to use Object.fromEntries() here but Node.js 10 does not support it
    for (const entry of result.searchParams.entries()){
        config[entry[0]] = entry[1];
    }
    config.user = config.user || decodeURIComponent(result.username);
    config.password = config.password || decodeURIComponent(result.password);
    if (result.protocol == 'socket:') {
        config.host = decodeURI(result.pathname);
        config.database = result.searchParams.get('db');
        config.client_encoding = result.searchParams.get('encoding');
        return config;
    }
    const hostname = dummyHost ? '' : result.hostname;
    if (!config.host) {
        // Only set the host if there is no equivalent query param.
        config.host = decodeURIComponent(hostname);
    } else if (hostname && /^%2f/i.test(hostname)) {
        // Only prepend the hostname to the pathname if it is not a URL encoded Unix socket host.
        result.pathname = hostname + result.pathname;
    }
    if (!config.port) {
        // Only set the port if there is no equivalent query param.
        config.port = result.port;
    }
    const pathname = result.pathname.slice(1) || null;
    config.database = pathname ? decodeURI(pathname) : null;
    if (config.ssl === 'true' || config.ssl === '1') {
        config.ssl = true;
    }
    if (config.ssl === '0') {
        config.ssl = false;
    }
    if (config.sslcert || config.sslkey || config.sslrootcert || config.sslmode) {
        config.ssl = {};
    }
    // Only try to load fs if we expect to read from the disk
    const fs = config.sslcert || config.sslkey || config.sslrootcert ? __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'fs', ecmascript)") : null;
    if (config.sslcert) {
        config.ssl.cert = fs.readFileSync(config.sslcert).toString();
    }
    if (config.sslkey) {
        config.ssl.key = fs.readFileSync(config.sslkey).toString();
    }
    if (config.sslrootcert) {
        config.ssl.ca = fs.readFileSync(config.sslrootcert).toString();
    }
    if (options.useLibpqCompat && config.uselibpqcompat) {
        throw new Error('Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.');
    }
    if (config.uselibpqcompat === 'true' || options.useLibpqCompat) {
        switch(config.sslmode){
            case 'disable':
                {
                    config.ssl = false;
                    break;
                }
            case 'prefer':
                {
                    config.ssl.rejectUnauthorized = false;
                    break;
                }
            case 'require':
                {
                    if (config.sslrootcert) {
                        // If a root CA is specified, behavior of `sslmode=require` will be the same as that of `verify-ca`
                        config.ssl.checkServerIdentity = function() {};
                    } else {
                        config.ssl.rejectUnauthorized = false;
                    }
                    break;
                }
            case 'verify-ca':
                {
                    if (!config.ssl.ca) {
                        throw new Error('SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security.');
                    }
                    config.ssl.checkServerIdentity = function() {};
                    break;
                }
            case 'verify-full':
                {
                    break;
                }
        }
    } else {
        switch(config.sslmode){
            case 'disable':
                {
                    config.ssl = false;
                    break;
                }
            case 'prefer':
            case 'require':
            case 'verify-ca':
            case 'verify-full':
                {
                    if (config.sslmode !== 'verify-full') {
                        deprecatedSslModeWarning(config.sslmode);
                    }
                    break;
                }
            case 'no-verify':
                {
                    config.ssl.rejectUnauthorized = false;
                    break;
                }
        }
    }
    return config;
}
// convert pg-connection-string ssl config to a ClientConfig.ConnectionOptions
function toConnectionOptions(sslConfig) {
    const connectionOptions = Object.entries(sslConfig).reduce((c, [key, value])=>{
        // we explicitly check for undefined and null instead of `if (value)` because some
        // options accept falsy values. Example: `ssl.rejectUnauthorized = false`
        if (value !== undefined && value !== null) {
            c[key] = value;
        }
        return c;
    }, {});
    return connectionOptions;
}
// convert pg-connection-string config to a ClientConfig
function toClientConfig(config) {
    const poolConfig = Object.entries(config).reduce((c, [key, value])=>{
        if (key === 'ssl') {
            const sslConfig = value;
            if (typeof sslConfig === 'boolean') {
                c[key] = sslConfig;
            }
            if (typeof sslConfig === 'object') {
                c[key] = toConnectionOptions(sslConfig);
            }
        } else if (value !== undefined && value !== null) {
            if (key === 'port') {
                // when port is not specified, it is converted into an empty string
                // we want to avoid NaN or empty string as a values in ClientConfig
                if (value !== '') {
                    const v = parseInt(value, 10);
                    if (isNaN(v)) {
                        throw new Error(`Invalid ${key}: ${value}`);
                    }
                    c[key] = v;
                }
            } else {
                c[key] = value;
            }
        }
        return c;
    }, {});
    return poolConfig;
}
// parses a connection string into ClientConfig
function parseIntoClientConfig(str) {
    return toClientConfig(parse(str));
}
function deprecatedSslModeWarning(sslmode) {
    if (!deprecatedSslModeWarning.warned && typeof process !== 'undefined' && process.emitWarning) {
        deprecatedSslModeWarning.warned = true;
        process.emitWarning(`SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=${sslmode}'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.`);
    }
}
module.exports = parse;
parse.parse = parse;
parse.toClientConfig = toClientConfig;
parse.parseIntoClientConfig = parseIntoClientConfig;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/messages.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoticeMessage = exports.DataRowMessage = exports.CommandCompleteMessage = exports.ReadyForQueryMessage = exports.NotificationResponseMessage = exports.BackendKeyDataMessage = exports.AuthenticationMD5Password = exports.ParameterStatusMessage = exports.ParameterDescriptionMessage = exports.RowDescriptionMessage = exports.Field = exports.CopyResponse = exports.CopyDataMessage = exports.DatabaseError = exports.copyDone = exports.emptyQuery = exports.replicationStart = exports.portalSuspended = exports.noData = exports.closeComplete = exports.bindComplete = exports.parseComplete = void 0;
exports.parseComplete = {
    name: 'parseComplete',
    length: 5
};
exports.bindComplete = {
    name: 'bindComplete',
    length: 5
};
exports.closeComplete = {
    name: 'closeComplete',
    length: 5
};
exports.noData = {
    name: 'noData',
    length: 5
};
exports.portalSuspended = {
    name: 'portalSuspended',
    length: 5
};
exports.replicationStart = {
    name: 'replicationStart',
    length: 4
};
exports.emptyQuery = {
    name: 'emptyQuery',
    length: 4
};
exports.copyDone = {
    name: 'copyDone',
    length: 4
};
class DatabaseError extends Error {
    constructor(message, length, name){
        super(message);
        this.length = length;
        this.name = name;
    }
}
exports.DatabaseError = DatabaseError;
class CopyDataMessage {
    constructor(length, chunk){
        this.length = length;
        this.chunk = chunk;
        this.name = 'copyData';
    }
}
exports.CopyDataMessage = CopyDataMessage;
class CopyResponse {
    constructor(length, name, binary, columnCount){
        this.length = length;
        this.name = name;
        this.binary = binary;
        this.columnTypes = new Array(columnCount);
    }
}
exports.CopyResponse = CopyResponse;
class Field {
    constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format){
        this.name = name;
        this.tableID = tableID;
        this.columnID = columnID;
        this.dataTypeID = dataTypeID;
        this.dataTypeSize = dataTypeSize;
        this.dataTypeModifier = dataTypeModifier;
        this.format = format;
    }
}
exports.Field = Field;
class RowDescriptionMessage {
    constructor(length, fieldCount){
        this.length = length;
        this.fieldCount = fieldCount;
        this.name = 'rowDescription';
        this.fields = new Array(this.fieldCount);
    }
}
exports.RowDescriptionMessage = RowDescriptionMessage;
class ParameterDescriptionMessage {
    constructor(length, parameterCount){
        this.length = length;
        this.parameterCount = parameterCount;
        this.name = 'parameterDescription';
        this.dataTypeIDs = new Array(this.parameterCount);
    }
}
exports.ParameterDescriptionMessage = ParameterDescriptionMessage;
class ParameterStatusMessage {
    constructor(length, parameterName, parameterValue){
        this.length = length;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.name = 'parameterStatus';
    }
}
exports.ParameterStatusMessage = ParameterStatusMessage;
class AuthenticationMD5Password {
    constructor(length, salt){
        this.length = length;
        this.salt = salt;
        this.name = 'authenticationMD5Password';
    }
}
exports.AuthenticationMD5Password = AuthenticationMD5Password;
class BackendKeyDataMessage {
    constructor(length, processID, secretKey){
        this.length = length;
        this.processID = processID;
        this.secretKey = secretKey;
        this.name = 'backendKeyData';
    }
}
exports.BackendKeyDataMessage = BackendKeyDataMessage;
class NotificationResponseMessage {
    constructor(length, processId, channel, payload){
        this.length = length;
        this.processId = processId;
        this.channel = channel;
        this.payload = payload;
        this.name = 'notification';
    }
}
exports.NotificationResponseMessage = NotificationResponseMessage;
class ReadyForQueryMessage {
    constructor(length, status){
        this.length = length;
        this.status = status;
        this.name = 'readyForQuery';
    }
}
exports.ReadyForQueryMessage = ReadyForQueryMessage;
class CommandCompleteMessage {
    constructor(length, text){
        this.length = length;
        this.text = text;
        this.name = 'commandComplete';
    }
}
exports.CommandCompleteMessage = CommandCompleteMessage;
class DataRowMessage {
    constructor(length, fields){
        this.length = length;
        this.fields = fields;
        this.name = 'dataRow';
        this.fieldCount = fields.length;
    }
}
exports.DataRowMessage = DataRowMessage;
class NoticeMessage {
    constructor(length, message){
        this.length = length;
        this.message = message;
        this.name = 'notice';
    }
}
exports.NoticeMessage = NoticeMessage; //# sourceMappingURL=messages.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/buffer-writer.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
"use strict";
//binary data writer tuned for encoding binary specific to the postgres binary protocol
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Writer = void 0;
class Writer {
    constructor(size = 256){
        this.size = size;
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(size);
    }
    ensure(size) {
        const remaining = this.buffer.length - this.offset;
        if (remaining < size) {
            const oldBuffer = this.buffer;
            // exponential growth factor of around ~ 1.5
            // https://stackoverflow.com/questions/2269063/buffer-growth-strategy
            const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
            this.buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(newSize);
            oldBuffer.copy(this.buffer);
        }
    }
    addInt32(num) {
        this.ensure(4);
        this.buffer[this.offset++] = num >>> 24 & 0xff;
        this.buffer[this.offset++] = num >>> 16 & 0xff;
        this.buffer[this.offset++] = num >>> 8 & 0xff;
        this.buffer[this.offset++] = num >>> 0 & 0xff;
        return this;
    }
    addInt16(num) {
        this.ensure(2);
        this.buffer[this.offset++] = num >>> 8 & 0xff;
        this.buffer[this.offset++] = num >>> 0 & 0xff;
        return this;
    }
    addCString(string) {
        if (!string) {
            this.ensure(1);
        } else {
            const len = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].byteLength(string);
            this.ensure(len + 1); // +1 for null terminator
            this.buffer.write(string, this.offset, 'utf-8');
            this.offset += len;
        }
        this.buffer[this.offset++] = 0; // null terminator
        return this;
    }
    addString(string = '') {
        const len = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].byteLength(string);
        this.ensure(len);
        this.buffer.write(string, this.offset);
        this.offset += len;
        return this;
    }
    add(otherBuffer) {
        this.ensure(otherBuffer.length);
        otherBuffer.copy(this.buffer, this.offset);
        this.offset += otherBuffer.length;
        return this;
    }
    join(code) {
        if (code) {
            this.buffer[this.headerPosition] = code;
            //length is everything in this packet minus the code
            const length = this.offset - (this.headerPosition + 1);
            this.buffer.writeInt32BE(length, this.headerPosition + 1);
        }
        return this.buffer.slice(code ? 0 : 5, this.offset);
    }
    flush(code) {
        const result = this.join(code);
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(this.size);
        return result;
    }
}
exports.Writer = Writer; //# sourceMappingURL=buffer-writer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/serializer.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serialize = void 0;
const buffer_writer_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/buffer-writer.js [instrumentation-edge] (ecmascript)");
const writer = new buffer_writer_1.Writer();
const startup = (opts)=>{
    // protocol version
    writer.addInt16(3).addInt16(0);
    for (const key of Object.keys(opts)){
        writer.addCString(key).addCString(opts[key]);
    }
    writer.addCString('client_encoding').addCString('UTF8');
    const bodyBuffer = writer.addCString('').flush();
    // this message is sent without a code
    const length = bodyBuffer.length + 4;
    return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
};
const requestSsl = ()=>{
    const response = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(8);
    response.writeInt32BE(8, 0);
    response.writeInt32BE(80877103, 4);
    return response;
};
const password = (password)=>{
    return writer.addCString(password).flush(112 /* code.startup */ );
};
const sendSASLInitialResponseMessage = function(mechanism, initialResponse) {
    // 0x70 = 'p'
    writer.addCString(mechanism).addInt32(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].byteLength(initialResponse)).addString(initialResponse);
    return writer.flush(112 /* code.startup */ );
};
const sendSCRAMClientFinalMessage = function(additionalData) {
    return writer.addString(additionalData).flush(112 /* code.startup */ );
};
const query = (text)=>{
    return writer.addCString(text).flush(81 /* code.query */ );
};
const emptyArray = [];
const parse = (query)=>{
    // expect something like this:
    // { name: 'queryName',
    //   text: 'select * from blah',
    //   types: ['int8', 'bool'] }
    // normalize missing query names to allow for null
    const name = query.name || '';
    if (name.length > 63) {
        console.error('Warning! Postgres only supports 63 characters for query names.');
        console.error('You supplied %s (%s)', name, name.length);
        console.error('This can cause conflicts and silent errors executing queries');
    }
    const types = query.types || emptyArray;
    const len = types.length;
    const buffer = writer.addCString(name) // name of query
    .addCString(query.text) // actual query text
    .addInt16(len);
    for(let i = 0; i < len; i++){
        buffer.addInt32(types[i]);
    }
    return writer.flush(80 /* code.parse */ );
};
const paramWriter = new buffer_writer_1.Writer();
const writeValues = function(values, valueMapper) {
    for(let i = 0; i < values.length; i++){
        const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
        if (mappedVal == null) {
            // add the param type (string) to the writer
            writer.addInt16(0 /* ParamType.STRING */ );
            // write -1 to the param writer to indicate null
            paramWriter.addInt32(-1);
        } else if (mappedVal instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"]) {
            // add the param type (binary) to the writer
            writer.addInt16(1 /* ParamType.BINARY */ );
            // add the buffer to the param writer
            paramWriter.addInt32(mappedVal.length);
            paramWriter.add(mappedVal);
        } else {
            // add the param type (string) to the writer
            writer.addInt16(0 /* ParamType.STRING */ );
            paramWriter.addInt32(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].byteLength(mappedVal));
            paramWriter.addString(mappedVal);
        }
    }
};
const bind = (config = {})=>{
    // normalize config
    const portal = config.portal || '';
    const statement = config.statement || '';
    const binary = config.binary || false;
    const values = config.values || emptyArray;
    const len = values.length;
    writer.addCString(portal).addCString(statement);
    writer.addInt16(len);
    writeValues(values, config.valueMapper);
    writer.addInt16(len);
    writer.add(paramWriter.flush());
    // all results use the same format code
    writer.addInt16(1);
    // format code
    writer.addInt16(binary ? 1 /* ParamType.BINARY */  : 0 /* ParamType.STRING */ );
    return writer.flush(66 /* code.bind */ );
};
const emptyExecute = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from([
    69 /* code.execute */ ,
    0x00,
    0x00,
    0x00,
    0x09,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00
]);
const execute = (config)=>{
    // this is the happy path for most queries
    if (!config || !config.portal && !config.rows) {
        return emptyExecute;
    }
    const portal = config.portal || '';
    const rows = config.rows || 0;
    const portalLength = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].byteLength(portal);
    const len = 4 + portalLength + 1 + 4;
    // one extra bit for code
    const buff = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(1 + len);
    buff[0] = 69 /* code.execute */ ;
    buff.writeInt32BE(len, 1);
    buff.write(portal, 5, 'utf-8');
    buff[portalLength + 5] = 0; // null terminate portal cString
    buff.writeUInt32BE(rows, buff.length - 4);
    return buff;
};
const cancel = (processID, secretKey)=>{
    const buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(16);
    buffer.writeInt32BE(16, 0);
    buffer.writeInt16BE(1234, 4);
    buffer.writeInt16BE(5678, 6);
    buffer.writeInt32BE(processID, 8);
    buffer.writeInt32BE(secretKey, 12);
    return buffer;
};
const cstringMessage = (code, string)=>{
    const stringLen = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].byteLength(string);
    const len = 4 + stringLen + 1;
    // one extra bit for code
    const buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(1 + len);
    buffer[0] = code;
    buffer.writeInt32BE(len, 1);
    buffer.write(string, 5, 'utf-8');
    buffer[len] = 0; // null terminate cString
    return buffer;
};
const emptyDescribePortal = writer.addCString('P').flush(68 /* code.describe */ );
const emptyDescribeStatement = writer.addCString('S').flush(68 /* code.describe */ );
const describe = (msg)=>{
    return msg.name ? cstringMessage(68 /* code.describe */ , `${msg.type}${msg.name || ''}`) : msg.type === 'P' ? emptyDescribePortal : emptyDescribeStatement;
};
const close = (msg)=>{
    const text = `${msg.type}${msg.name || ''}`;
    return cstringMessage(67 /* code.close */ , text);
};
const copyData = (chunk)=>{
    return writer.add(chunk).flush(100 /* code.copyFromChunk */ );
};
const copyFail = (message)=>{
    return cstringMessage(102 /* code.copyFail */ , message);
};
const codeOnlyBuffer = (code)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from([
        code,
        0x00,
        0x00,
        0x00,
        0x04
    ]);
const flushBuffer = codeOnlyBuffer(72 /* code.flush */ );
const syncBuffer = codeOnlyBuffer(83 /* code.sync */ );
const endBuffer = codeOnlyBuffer(88 /* code.end */ );
const copyDoneBuffer = codeOnlyBuffer(99 /* code.copyDone */ );
const serialize = {
    startup,
    password,
    requestSsl,
    sendSASLInitialResponseMessage,
    sendSCRAMClientFinalMessage,
    query,
    parse,
    bind,
    execute,
    describe,
    close,
    flush: ()=>flushBuffer,
    sync: ()=>syncBuffer,
    end: ()=>endBuffer,
    copyData,
    copyDone: ()=>copyDoneBuffer,
    copyFail,
    cancel
};
exports.serialize = serialize; //# sourceMappingURL=serializer.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/buffer-reader.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BufferReader = void 0;
class BufferReader {
    constructor(offset = 0){
        this.offset = offset;
        this.buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(0);
        // TODO(bmc): support non-utf8 encoding?
        this.encoding = 'utf-8';
    }
    setBuffer(offset, buffer) {
        this.offset = offset;
        this.buffer = buffer;
    }
    int16() {
        const result = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return result;
    }
    byte() {
        const result = this.buffer[this.offset];
        this.offset++;
        return result;
    }
    int32() {
        const result = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return result;
    }
    uint32() {
        const result = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return result;
    }
    string(length) {
        const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
        this.offset += length;
        return result;
    }
    cstring() {
        const start = this.offset;
        let end = start;
        // eslint-disable-next-line no-empty
        while(this.buffer[end++] !== 0){}
        this.offset = end;
        return this.buffer.toString(this.encoding, start, end - 1);
    }
    bytes(length) {
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
    }
}
exports.BufferReader = BufferReader; //# sourceMappingURL=buffer-reader.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/parser.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Parser = void 0;
const messages_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/messages.js [instrumentation-edge] (ecmascript)");
const buffer_reader_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/buffer-reader.js [instrumentation-edge] (ecmascript)");
// every message is prefixed with a single bye
const CODE_LENGTH = 1;
// every message has an int32 length which includes itself but does
// NOT include the code in the length
const LEN_LENGTH = 4;
const HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
// A placeholder for a `BackendMessage`’s length value that will be set after construction.
const LATEINIT_LENGTH = -1;
const emptyBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(0);
class Parser {
    constructor(opts){
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
        this.reader = new buffer_reader_1.BufferReader();
        if ((opts === null || opts === void 0 ? void 0 : opts.mode) === 'binary') {
            throw new Error('Binary mode not supported yet');
        }
        this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || 'text';
    }
    parse(buffer, callback) {
        this.mergeBuffer(buffer);
        const bufferFullLength = this.bufferOffset + this.bufferLength;
        let offset = this.bufferOffset;
        while(offset + HEADER_LENGTH <= bufferFullLength){
            // code is 1 byte long - it identifies the message type
            const code = this.buffer[offset];
            // length is 1 Uint32BE - it is the length of the message EXCLUDING the code
            const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
            const fullMessageLength = CODE_LENGTH + length;
            if (fullMessageLength + offset <= bufferFullLength) {
                const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
                callback(message);
                offset += fullMessageLength;
            } else {
                break;
            }
        }
        if (offset === bufferFullLength) {
            // No more use for the buffer
            this.buffer = emptyBuffer;
            this.bufferLength = 0;
            this.bufferOffset = 0;
        } else {
            // Adjust the cursors of remainingBuffer
            this.bufferLength = bufferFullLength - offset;
            this.bufferOffset = offset;
        }
    }
    mergeBuffer(buffer) {
        if (this.bufferLength > 0) {
            const newLength = this.bufferLength + buffer.byteLength;
            const newFullLength = newLength + this.bufferOffset;
            if (newFullLength > this.buffer.byteLength) {
                // We can't concat the new buffer with the remaining one
                let newBuffer;
                if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
                    // We can move the relevant part to the beginning of the buffer instead of allocating a new buffer
                    newBuffer = this.buffer;
                } else {
                    // Allocate a new larger buffer
                    let newBufferLength = this.buffer.byteLength * 2;
                    while(newLength >= newBufferLength){
                        newBufferLength *= 2;
                    }
                    newBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].allocUnsafe(newBufferLength);
                }
                // Move the remaining buffer to the new one
                this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
                this.buffer = newBuffer;
                this.bufferOffset = 0;
            }
            // Concat the new buffer with the remaining one
            buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
            this.bufferLength = newLength;
        } else {
            this.buffer = buffer;
            this.bufferOffset = 0;
            this.bufferLength = buffer.byteLength;
        }
    }
    handlePacket(offset, code, length, bytes) {
        const { reader } = this;
        // NOTE: This undesirably retains the buffer in `this.reader` if the `parse*Message` calls below throw. However, those should only throw in the case of a protocol error, which normally results in the reader being discarded.
        reader.setBuffer(offset, bytes);
        let message;
        switch(code){
            case 50 /* MessageCodes.BindComplete */ :
                message = messages_1.bindComplete;
                break;
            case 49 /* MessageCodes.ParseComplete */ :
                message = messages_1.parseComplete;
                break;
            case 51 /* MessageCodes.CloseComplete */ :
                message = messages_1.closeComplete;
                break;
            case 110 /* MessageCodes.NoData */ :
                message = messages_1.noData;
                break;
            case 115 /* MessageCodes.PortalSuspended */ :
                message = messages_1.portalSuspended;
                break;
            case 99 /* MessageCodes.CopyDone */ :
                message = messages_1.copyDone;
                break;
            case 87 /* MessageCodes.ReplicationStart */ :
                message = messages_1.replicationStart;
                break;
            case 73 /* MessageCodes.EmptyQuery */ :
                message = messages_1.emptyQuery;
                break;
            case 68 /* MessageCodes.DataRow */ :
                message = parseDataRowMessage(reader);
                break;
            case 67 /* MessageCodes.CommandComplete */ :
                message = parseCommandCompleteMessage(reader);
                break;
            case 90 /* MessageCodes.ReadyForQuery */ :
                message = parseReadyForQueryMessage(reader);
                break;
            case 65 /* MessageCodes.NotificationResponse */ :
                message = parseNotificationMessage(reader);
                break;
            case 82 /* MessageCodes.AuthenticationResponse */ :
                message = parseAuthenticationResponse(reader, length);
                break;
            case 83 /* MessageCodes.ParameterStatus */ :
                message = parseParameterStatusMessage(reader);
                break;
            case 75 /* MessageCodes.BackendKeyData */ :
                message = parseBackendKeyData(reader);
                break;
            case 69 /* MessageCodes.ErrorMessage */ :
                message = parseErrorMessage(reader, 'error');
                break;
            case 78 /* MessageCodes.NoticeMessage */ :
                message = parseErrorMessage(reader, 'notice');
                break;
            case 84 /* MessageCodes.RowDescriptionMessage */ :
                message = parseRowDescriptionMessage(reader);
                break;
            case 116 /* MessageCodes.ParameterDescriptionMessage */ :
                message = parseParameterDescriptionMessage(reader);
                break;
            case 71 /* MessageCodes.CopyIn */ :
                message = parseCopyInMessage(reader);
                break;
            case 72 /* MessageCodes.CopyOut */ :
                message = parseCopyOutMessage(reader);
                break;
            case 100 /* MessageCodes.CopyData */ :
                message = parseCopyData(reader, length);
                break;
            default:
                return new messages_1.DatabaseError('received invalid response: ' + code.toString(16), length, 'error');
        }
        reader.setBuffer(0, emptyBuffer);
        message.length = length;
        return message;
    }
}
exports.Parser = Parser;
const parseReadyForQueryMessage = (reader)=>{
    const status = reader.string(1);
    return new messages_1.ReadyForQueryMessage(LATEINIT_LENGTH, status);
};
const parseCommandCompleteMessage = (reader)=>{
    const text = reader.cstring();
    return new messages_1.CommandCompleteMessage(LATEINIT_LENGTH, text);
};
const parseCopyData = (reader, length)=>{
    const chunk = reader.bytes(length - 4);
    return new messages_1.CopyDataMessage(LATEINIT_LENGTH, chunk);
};
const parseCopyInMessage = (reader)=>parseCopyMessage(reader, 'copyInResponse');
const parseCopyOutMessage = (reader)=>parseCopyMessage(reader, 'copyOutResponse');
const parseCopyMessage = (reader, messageName)=>{
    const isBinary = reader.byte() !== 0;
    const columnCount = reader.int16();
    const message = new messages_1.CopyResponse(LATEINIT_LENGTH, messageName, isBinary, columnCount);
    for(let i = 0; i < columnCount; i++){
        message.columnTypes[i] = reader.int16();
    }
    return message;
};
const parseNotificationMessage = (reader)=>{
    const processId = reader.int32();
    const channel = reader.cstring();
    const payload = reader.cstring();
    return new messages_1.NotificationResponseMessage(LATEINIT_LENGTH, processId, channel, payload);
};
const parseRowDescriptionMessage = (reader)=>{
    const fieldCount = reader.int16();
    const message = new messages_1.RowDescriptionMessage(LATEINIT_LENGTH, fieldCount);
    for(let i = 0; i < fieldCount; i++){
        message.fields[i] = parseField(reader);
    }
    return message;
};
const parseField = (reader)=>{
    const name = reader.cstring();
    const tableID = reader.uint32();
    const columnID = reader.int16();
    const dataTypeID = reader.uint32();
    const dataTypeSize = reader.int16();
    const dataTypeModifier = reader.int32();
    const mode = reader.int16() === 0 ? 'text' : 'binary';
    return new messages_1.Field(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
};
const parseParameterDescriptionMessage = (reader)=>{
    const parameterCount = reader.int16();
    const message = new messages_1.ParameterDescriptionMessage(LATEINIT_LENGTH, parameterCount);
    for(let i = 0; i < parameterCount; i++){
        message.dataTypeIDs[i] = reader.int32();
    }
    return message;
};
const parseDataRowMessage = (reader)=>{
    const fieldCount = reader.int16();
    const fields = new Array(fieldCount);
    for(let i = 0; i < fieldCount; i++){
        const len = reader.int32();
        // a -1 for length means the value of the field is null
        fields[i] = len === -1 ? null : reader.string(len);
    }
    return new messages_1.DataRowMessage(LATEINIT_LENGTH, fields);
};
const parseParameterStatusMessage = (reader)=>{
    const name = reader.cstring();
    const value = reader.cstring();
    return new messages_1.ParameterStatusMessage(LATEINIT_LENGTH, name, value);
};
const parseBackendKeyData = (reader)=>{
    const processID = reader.int32();
    const secretKey = reader.int32();
    return new messages_1.BackendKeyDataMessage(LATEINIT_LENGTH, processID, secretKey);
};
const parseAuthenticationResponse = (reader, length)=>{
    const code = reader.int32();
    // TODO(bmc): maybe better types here
    const message = {
        name: 'authenticationOk',
        length
    };
    switch(code){
        case 0:
            break;
        case 3:
            if (message.length === 8) {
                message.name = 'authenticationCleartextPassword';
            }
            break;
        case 5:
            if (message.length === 12) {
                message.name = 'authenticationMD5Password';
                const salt = reader.bytes(4);
                return new messages_1.AuthenticationMD5Password(LATEINIT_LENGTH, salt);
            }
            break;
        case 10:
            {
                message.name = 'authenticationSASL';
                message.mechanisms = [];
                let mechanism;
                do {
                    mechanism = reader.cstring();
                    if (mechanism) {
                        message.mechanisms.push(mechanism);
                    }
                }while (mechanism)
            }
            break;
        case 11:
            message.name = 'authenticationSASLContinue';
            message.data = reader.string(length - 8);
            break;
        case 12:
            message.name = 'authenticationSASLFinal';
            message.data = reader.string(length - 8);
            break;
        default:
            throw new Error('Unknown authenticationOk message type ' + code);
    }
    return message;
};
const parseErrorMessage = (reader, name)=>{
    const fields = {};
    let fieldType = reader.string(1);
    while(fieldType !== '\0'){
        fields[fieldType] = reader.cstring();
        fieldType = reader.string(1);
    }
    const messageValue = fields.M;
    const message = name === 'notice' ? new messages_1.NoticeMessage(LATEINIT_LENGTH, messageValue) : new messages_1.DatabaseError(messageValue, LATEINIT_LENGTH, name);
    message.severity = fields.S;
    message.code = fields.C;
    message.detail = fields.D;
    message.hint = fields.H;
    message.position = fields.P;
    message.internalPosition = fields.p;
    message.internalQuery = fields.q;
    message.where = fields.W;
    message.schema = fields.s;
    message.table = fields.t;
    message.column = fields.c;
    message.dataType = fields.d;
    message.constraint = fields.n;
    message.file = fields.F;
    message.line = fields.L;
    message.routine = fields.R;
    return message;
}; //# sourceMappingURL=parser.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatabaseError = exports.serialize = exports.parse = void 0;
const messages_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/messages.js [instrumentation-edge] (ecmascript)");
Object.defineProperty(exports, "DatabaseError", {
    enumerable: true,
    get: function() {
        return messages_1.DatabaseError;
    }
});
const serializer_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/serializer.js [instrumentation-edge] (ecmascript)");
Object.defineProperty(exports, "serialize", {
    enumerable: true,
    get: function() {
        return serializer_1.serialize;
    }
});
const parser_1 = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-protocol/dist/parser.js [instrumentation-edge] (ecmascript)");
function parse(stream, callback) {
    const parser = new parser_1.Parser();
    stream.on('data', (buffer)=>parser.parse(buffer, callback));
    return new Promise((resolve)=>stream.on('end', ()=>resolve()));
}
exports.parse = parse; //# sourceMappingURL=index.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-cloudflare/dist/empty.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// This is an empty module that is served up when outside of a workerd environment
// See the `exports` field in package.json
exports.default = {}; //# sourceMappingURL=empty.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/split2/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*
Copyright (c) 2014-2021, Matteo Collina <hello@matteocollina.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/ const { Transform } = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'stream', ecmascript)");
const { StringDecoder } = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'string_decoder', ecmascript)");
const kLast = Symbol('last');
const kDecoder = Symbol('decoder');
function transform(chunk, enc, cb) {
    let list;
    if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb() // Line ending not found. Discard entire chunk.
        ;
        // Line ending found. Discard trailing fragment of previous line and reset overflow state.
        list.shift();
        this.overflow = false;
    } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
    }
    this[kLast] = list.pop();
    for(let i = 0; i < list.length; i++){
        try {
            push(this, this.mapper(list[i]));
        } catch (error) {
            return cb(error);
        }
    }
    this.overflow = this[kLast].length > this.maxLength;
    if (this.overflow && !this.skipOverflow) {
        cb(new Error('maximum buffer reached'));
        return;
    }
    cb();
}
function flush(cb) {
    // forward any gibberish left in there
    this[kLast] += this[kDecoder].end();
    if (this[kLast]) {
        try {
            push(this, this.mapper(this[kLast]));
        } catch (error) {
            return cb(error);
        }
    }
    cb();
}
function push(self, val) {
    if (val !== undefined) {
        self.push(val);
    }
}
function noop(incoming) {
    return incoming;
}
function split(matcher, mapper, options) {
    // Set defaults for any arguments not supplied.
    matcher = matcher || /\r?\n/;
    mapper = mapper || noop;
    options = options || {};
    // Test arguments explicitly.
    switch(arguments.length){
        case 1:
            // If mapper is only argument.
            if (typeof matcher === 'function') {
                mapper = matcher;
                matcher = /\r?\n/;
            // If options is only argument.
            } else if (typeof matcher === 'object' && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
                options = matcher;
                matcher = /\r?\n/;
            }
            break;
        case 2:
            // If mapper and options are arguments.
            if (typeof matcher === 'function') {
                options = mapper;
                mapper = matcher;
                matcher = /\r?\n/;
            // If matcher and options are arguments.
            } else if (typeof mapper === 'object') {
                options = mapper;
                mapper = noop;
            }
    }
    options = Object.assign({}, options);
    options.autoDestroy = true;
    options.transform = transform;
    options.flush = flush;
    options.readableObjectMode = true;
    const stream = new Transform(options);
    stream[kLast] = '';
    stream[kDecoder] = new StringDecoder('utf8');
    stream.matcher = matcher;
    stream.mapper = mapper;
    stream.maxLength = options.maxLength;
    stream.skipOverflow = options.skipOverflow || false;
    stream.overflow = false;
    stream._destroy = function(err, cb) {
        // Weird Node v12 bug that we need to work around
        this._writableState.errorEmitted = false;
        cb(err);
    };
    return stream;
}
module.exports = split;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pgpass/lib/helper.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var path = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'path', ecmascript)"), Stream = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'stream', ecmascript)").Stream, split = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/split2/index.js [instrumentation-edge] (ecmascript)"), util = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)"), defaultPort = 5432, isWin = process.platform === 'win32', warnStream = process.stderr;
var S_IRWXG = 56 //    00070(8)
, S_IRWXO = 7 //    00007(8)
, S_IFMT = 61440 // 00170000(8)
, S_IFREG = 32768 //  0100000(8)
;
function isRegFile(mode) {
    return (mode & S_IFMT) == S_IFREG;
}
var fieldNames = [
    'host',
    'port',
    'database',
    'user',
    'password'
];
var nrOfFields = fieldNames.length;
var passKey = fieldNames[nrOfFields - 1];
function warn() {
    var isWritable = warnStream instanceof Stream && true === warnStream.writable;
    if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
    }
}
Object.defineProperty(module.exports, 'isWin', {
    get: function() {
        return isWin;
    },
    set: function(val) {
        isWin = val;
    }
});
module.exports.warnTo = function(stream) {
    var old = warnStream;
    warnStream = stream;
    return old;
};
module.exports.getFileName = function(rawEnv) {
    var env = rawEnv || process.env;
    var file = env.PGPASSFILE || (isWin ? path.join(env.APPDATA || './', 'postgresql', 'pgpass.conf') : path.join(env.HOME || './', '.pgpass'));
    return file;
};
module.exports.usePgPass = function(stats, fname) {
    if (Object.prototype.hasOwnProperty.call(process.env, 'PGPASSWORD')) {
        return false;
    }
    if (isWin) {
        return true;
    }
    fname = fname || '<unkn>';
    if (!isRegFile(stats.mode)) {
        warn('WARNING: password file "%s" is not a plain file', fname);
        return false;
    }
    if (stats.mode & (S_IRWXG | S_IRWXO)) {
        /* If password file is insecure, alert the user and ignore it. */ warn('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
    }
    return true;
};
var matcher = module.exports.match = function(connInfo, entry) {
    return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
            // the port
            if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
                return prev && true;
            }
        }
        return prev && (entry[field] === '*' || entry[field] === connInfo[field]);
    }, true);
};
module.exports.getPassword = function(connInfo, stream, cb) {
    var pass;
    var lineStream = stream.pipe(split());
    function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
            pass = entry[passKey];
            lineStream.end(); // -> calls onEnd(), but pass is set now
        }
    }
    var onEnd = function() {
        stream.destroy();
        cb(pass);
    };
    var onErr = function(err) {
        stream.destroy();
        warn('WARNING: error on reading file: %s', err);
        cb(undefined);
    };
    stream.on('error', onErr);
    lineStream.on('data', onLine).on('end', onEnd).on('error', onErr);
};
var parseLine = module.exports.parseLine = function(line) {
    if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
    }
    var curChar = '';
    var prevChar = '';
    var fieldIdx = 0;
    var startIdx = 0;
    var endIdx = 0;
    var obj = {};
    var isLastField = false;
    var addToObj = function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, 'PGPASS_NO_DEESCAPE')) {
            field = field.replace(/\\([:\\])/g, '$1');
        }
        obj[fieldNames[idx]] = field;
    };
    for(var i = 0; i < line.length - 1; i += 1){
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
            addToObj(fieldIdx, startIdx);
            break;
        }
        if (i >= 0 && curChar == ':' && prevChar !== '\\') {
            addToObj(fieldIdx, startIdx, i + 1);
            startIdx = i + 2;
            fieldIdx += 1;
        }
    }
    obj = Object.keys(obj).length === nrOfFields ? obj : null;
    return obj;
};
var isValidEntry = module.exports.isValidEntry = function(entry) {
    var rules = {
        // host
        0: function(x) {
            return x.length > 0;
        },
        // port
        1: function(x) {
            if (x === '*') {
                return true;
            }
            x = Number(x);
            return isFinite(x) && x > 0 && x < 9007199254740992 && Math.floor(x) === x;
        },
        // database
        2: function(x) {
            return x.length > 0;
        },
        // username
        3: function(x) {
            return x.length > 0;
        },
        // password
        4: function(x) {
            return x.length > 0;
        }
    };
    for(var idx = 0; idx < fieldNames.length; idx += 1){
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || '';
        var res = rule(value);
        if (!res) {
            return false;
        }
    }
    return true;
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pgpass/lib/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var path = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'path', ecmascript)"), fs = __turbopack_context__.r("[project]/ [instrumentation-edge] (unsupported edge import 'fs', ecmascript)"), helper = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pgpass/lib/helper.js [instrumentation-edge] (ecmascript)");
module.exports = function(connInfo, cb) {
    var file = helper.getFileName();
    fs.stat(file, function(err, stat) {
        if (err || !helper.usePgPass(stat, file)) {
            return cb(undefined);
        }
        var st = fs.createReadStream(file);
        helper.getPassword(connInfo, st, cb);
    });
};
module.exports.warnTo = helper.warnTo;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg-pool/index.js [instrumentation-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/node:events [external] (node:events, cjs)").EventEmitter;
const NOOP = function() {};
const removeWhere = (list, predicate)=>{
    const i = list.findIndex(predicate);
    return i === -1 ? undefined : list.splice(i, 1)[0];
};
class IdleItem {
    constructor(client, idleListener, timeoutId){
        this.client = client;
        this.idleListener = idleListener;
        this.timeoutId = timeoutId;
    }
}
class PendingItem {
    constructor(callback){
        this.callback = callback;
    }
}
function throwOnDoubleRelease() {
    throw new Error('Release called on client which has already been released to the pool.');
}
function promisify(Promise, callback) {
    if (callback) {
        return {
            callback: callback,
            result: undefined
        };
    }
    let rej;
    let res;
    const cb = function(err, client) {
        err ? rej(err) : res(client);
    };
    const result = new Promise(function(resolve, reject) {
        res = resolve;
        rej = reject;
    }).catch((err)=>{
        // replace the stack trace that leads to `TCP.onStreamRead` with one that leads back to the
        // application that created the query
        Error.captureStackTrace(err);
        throw err;
    });
    return {
        callback: cb,
        result: result
    };
}
function makeIdleListener(pool, client) {
    return function idleListener(err) {
        err.client = client;
        client.removeListener('error', idleListener);
        client.on('error', ()=>{
            pool.log('additional client error after disconnection due to error', err);
        });
        pool._remove(client);
        // TODO - document that once the pool emits an error
        // the client has already been closed & purged and is unusable
        pool.emit('error', err, client);
    };
}
class Pool extends EventEmitter {
    constructor(options, Client){
        super();
        this.options = Object.assign({}, options);
        if (options != null && 'password' in options) {
            // "hiding" the password so it doesn't show up in stack traces
            // or if the client is console.logged
            Object.defineProperty(this.options, 'password', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: options.password
            });
        }
        if (options != null && options.ssl && options.ssl.key) {
            // "hiding" the ssl->key so it doesn't show up in stack traces
            // or if the client is console.logged
            Object.defineProperty(this.options.ssl, 'key', {
                enumerable: false
            });
        }
        this.options.max = this.options.max || this.options.poolSize || 10;
        this.options.min = this.options.min || 0;
        this.options.maxUses = this.options.maxUses || Infinity;
        this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
        this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
        this.log = this.options.log || function() {};
        this.Client = this.options.Client || Client || __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pg/lib/index.js [instrumentation-edge] (ecmascript)").Client;
        this.Promise = this.options.Promise || /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
        if (typeof this.options.idleTimeoutMillis === 'undefined') {
            this.options.idleTimeoutMillis = 10000;
        }
        this._clients = [];
        this._idle = [];
        this._expired = new WeakSet();
        this._pendingQueue = [];
        this._endCallback = undefined;
        this.ending = false;
        this.ended = false;
    }
    _isFull() {
        return this._clients.length >= this.options.max;
    }
    _isAboveMin() {
        return this._clients.length > this.options.min;
    }
    _pulseQueue() {
        this.log('pulse queue');
        if (this.ended) {
            this.log('pulse queue ended');
            return;
        }
        if (this.ending) {
            this.log('pulse queue on ending');
            if (this._idle.length) {
                this._idle.slice().map((item)=>{
                    this._remove(item.client);
                });
            }
            if (!this._clients.length) {
                this.ended = true;
                this._endCallback();
            }
            return;
        }
        // if we don't have any waiting, do nothing
        if (!this._pendingQueue.length) {
            this.log('no queued requests');
            return;
        }
        // if we don't have any idle clients and we have no more room do nothing
        if (!this._idle.length && this._isFull()) {
            return;
        }
        const pendingItem = this._pendingQueue.shift();
        if (this._idle.length) {
            const idleItem = this._idle.pop();
            clearTimeout(idleItem.timeoutId);
            const client = idleItem.client;
            client.ref && client.ref();
            const idleListener = idleItem.idleListener;
            return this._acquireClient(client, pendingItem, idleListener, false);
        }
        if (!this._isFull()) {
            return this.newClient(pendingItem);
        }
        throw new Error('unexpected condition');
    }
    _remove(client, callback) {
        const removed = removeWhere(this._idle, (item)=>item.client === client);
        if (removed !== undefined) {
            clearTimeout(removed.timeoutId);
        }
        this._clients = this._clients.filter((c)=>c !== client);
        const context = this;
        client.end(()=>{
            context.emit('remove', client);
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
    connect(cb) {
        if (this.ending) {
            const err = new Error('Cannot use a pool after calling end on the pool');
            return cb ? cb(err) : this.Promise.reject(err);
        }
        const response = promisify(this.Promise, cb);
        const result = response.result;
        // if we don't have to connect a new client, don't do so
        if (this._isFull() || this._idle.length) {
            // if we have idle clients schedule a pulse immediately
            if (this._idle.length) {
                process.nextTick(()=>this._pulseQueue());
            }
            if (!this.options.connectionTimeoutMillis) {
                this._pendingQueue.push(new PendingItem(response.callback));
                return result;
            }
            const queueCallback = (err, res, done)=>{
                clearTimeout(tid);
                response.callback(err, res, done);
            };
            const pendingItem = new PendingItem(queueCallback);
            // set connection timeout on checking out an existing client
            const tid = setTimeout(()=>{
                // remove the callback from pending waiters because
                // we're going to call it with a timeout error
                removeWhere(this._pendingQueue, (i)=>i.callback === queueCallback);
                pendingItem.timedOut = true;
                response.callback(new Error('timeout exceeded when trying to connect'));
            }, this.options.connectionTimeoutMillis);
            if (tid.unref) {
                tid.unref();
            }
            this._pendingQueue.push(pendingItem);
            return result;
        }
        this.newClient(new PendingItem(response.callback));
        return result;
    }
    newClient(pendingItem) {
        const client = new this.Client(this.options);
        this._clients.push(client);
        const idleListener = makeIdleListener(this, client);
        this.log('checking client timeout');
        // connection timeout logic
        let tid;
        let timeoutHit = false;
        if (this.options.connectionTimeoutMillis) {
            tid = setTimeout(()=>{
                if (client.connection) {
                    this.log('ending client due to timeout');
                    timeoutHit = true;
                    client.connection.stream.destroy();
                } else if (!client.isConnected()) {
                    this.log('ending client due to timeout');
                    timeoutHit = true;
                    // force kill the node driver, and let libpq do its teardown
                    client.end();
                }
            }, this.options.connectionTimeoutMillis);
        }
        this.log('connecting new client');
        client.connect((err)=>{
            if (tid) {
                clearTimeout(tid);
            }
            client.on('error', idleListener);
            if (err) {
                this.log('client failed to connect', err);
                // remove the dead client from our list of clients
                this._clients = this._clients.filter((c)=>c !== client);
                if (timeoutHit) {
                    err = new Error('Connection terminated due to connection timeout', {
                        cause: err
                    });
                }
                // this client won’t be released, so move on immediately
                this._pulseQueue();
                if (!pendingItem.timedOut) {
                    pendingItem.callback(err, undefined, NOOP);
                }
            } else {
                this.log('new client connected');
                if (this.options.maxLifetimeSeconds !== 0) {
                    const maxLifetimeTimeout = setTimeout(()=>{
                        this.log('ending client due to expired lifetime');
                        this._expired.add(client);
                        const idleIndex = this._idle.findIndex((idleItem)=>idleItem.client === client);
                        if (idleIndex !== -1) {
                            this._acquireClient(client, new PendingItem((err, client, clientRelease)=>clientRelease()), idleListener, false);
                        }
                    }, this.options.maxLifetimeSeconds * 1000);
                    maxLifetimeTimeout.unref();
                    client.once('end', ()=>clearTimeout(maxLifetimeTimeout));
                }
                return this._acquireClient(client, pendingItem, idleListener, true);
            }
        });
    }
    // acquire a client for a pending work item
    _acquireClient(client, pendingItem, idleListener, isNew) {
        if (isNew) {
            this.emit('connect', client);
        }
        this.emit('acquire', client);
        client.release = this._releaseOnce(client, idleListener);
        client.removeListener('error', idleListener);
        if (!pendingItem.timedOut) {
            if (isNew && this.options.verify) {
                this.options.verify(client, (err)=>{
                    if (err) {
                        client.release(err);
                        return pendingItem.callback(err, undefined, NOOP);
                    }
                    pendingItem.callback(undefined, client, client.release);
                });
            } else {
                pendingItem.callback(undefined, client, client.release);
            }
        } else {
            if (isNew && this.options.verify) {
                this.options.verify(client, client.release);
            } else {
                client.release();
            }
        }
    }
    // returns a function that wraps _release and throws if called more than once
    _releaseOnce(client, idleListener) {
        let released = false;
        return (err)=>{
            if (released) {
                throwOnDoubleRelease();
            }
            released = true;
            this._release(client, idleListener, err);
        };
    }
    // release a client back to the poll, include an error
    // to remove it from the pool
    _release(client, idleListener, err) {
        client.on('error', idleListener);
        client._poolUseCount = (client._poolUseCount || 0) + 1;
        this.emit('release', err, client);
        // TODO(bmc): expose a proper, public interface _queryable and _ending
        if (err || this.ending || !client._queryable || client._ending || client._poolUseCount >= this.options.maxUses) {
            if (client._poolUseCount >= this.options.maxUses) {
                this.log('remove expended client');
            }
            return this._remove(client, this._pulseQueue.bind(this));
        }
        const isExpired = this._expired.has(client);
        if (isExpired) {
            this.log('remove expired client');
            this._expired.delete(client);
            return this._remove(client, this._pulseQueue.bind(this));
        }
        // idle timeout
        let tid;
        if (this.options.idleTimeoutMillis && this._isAboveMin()) {
            tid = setTimeout(()=>{
                if (this._isAboveMin()) {
                    this.log('remove idle client');
                    this._remove(client, this._pulseQueue.bind(this));
                }
            }, this.options.idleTimeoutMillis);
            if (this.options.allowExitOnIdle) {
                // allow Node to exit if this is all that's left
                tid.unref();
            }
        }
        if (this.options.allowExitOnIdle) {
            client.unref();
        }
        this._idle.push(new IdleItem(client, idleListener, tid));
        this._pulseQueue();
    }
    query(text, values, cb) {
        // guard clause against passing a function as the first parameter
        if (typeof text === 'function') {
            const response = promisify(this.Promise, text);
            setImmediate(function() {
                return response.callback(new Error('Passing a function as the first parameter to pool.query is not supported'));
            });
            return response.result;
        }
        // allow plain text query without values
        if (typeof values === 'function') {
            cb = values;
            values = undefined;
        }
        const response = promisify(this.Promise, cb);
        cb = response.callback;
        this.connect((err, client)=>{
            if (err) {
                return cb(err);
            }
            let clientReleased = false;
            const onError = (err)=>{
                if (clientReleased) {
                    return;
                }
                clientReleased = true;
                client.release(err);
                cb(err);
            };
            client.once('error', onError);
            this.log('dispatching query');
            try {
                client.query(text, values, (err, res)=>{
                    this.log('query dispatched');
                    client.removeListener('error', onError);
                    if (clientReleased) {
                        return;
                    }
                    clientReleased = true;
                    client.release(err);
                    if (err) {
                        return cb(err);
                    }
                    return cb(undefined, res);
                });
            } catch (err) {
                client.release(err);
                return cb(err);
            }
        });
        return response.result;
    }
    end(cb) {
        this.log('ending');
        if (this.ending) {
            const err = new Error('Called end on pool more than once');
            return cb ? cb(err) : this.Promise.reject(err);
        }
        this.ending = true;
        const promised = promisify(this.Promise, cb);
        this._endCallback = promised.callback;
        this._pulseQueue();
        return promised.result;
    }
    get waitingCount() {
        return this._pendingQueue.length;
    }
    get idleCount() {
        return this._idle.length;
    }
    get expiredCount() {
        return this._clients.reduce((acc, client)=>acc + (this._expired.has(client) ? 1 : 0), 0);
    }
    get totalCount() {
        return this._clients.length;
    }
}
module.exports = Pool;
}),
]);

//# sourceMappingURL=c427b_9aa71ece._.js.map