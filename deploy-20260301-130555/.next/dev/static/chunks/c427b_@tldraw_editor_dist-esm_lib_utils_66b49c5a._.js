;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="95bb9aa2-5020-57ff-3962-703478451873")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/debug-flags.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDebugValue",
    ()=>createDebugValue,
    "debugFlags",
    ()=>debugFlags,
    "featureFlags",
    ()=>featureFlags,
    "pointerCaptureTrackingObject",
    ()=>pointerCaptureTrackingObject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Atom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/EffectScheduler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/storage.mjs [app-client] (ecmascript)");
;
;
const featureFlags = {};
const pointerCaptureTrackingObject = createDebugValue("pointerCaptureTrackingObject", // ideally we wouldn't store this mutable value in an atom but it's not
// a big deal for debug values
{
    defaults: {
        all: /* @__PURE__ */ new Map()
    },
    shouldStoreForSession: false
});
const debugFlags = {
    // --- DEBUG VALUES ---
    logPreventDefaults: createDebugValue("logPreventDefaults", {
        defaults: {
            all: false
        }
    }),
    logPointerCaptures: createDebugValue("logPointerCaptures", {
        defaults: {
            all: false
        }
    }),
    logElementRemoves: createDebugValue("logElementRemoves", {
        defaults: {
            all: false
        }
    }),
    debugSvg: createDebugValue("debugSvg", {
        defaults: {
            all: false
        }
    }),
    showFps: createDebugValue("showFps", {
        defaults: {
            all: false
        }
    }),
    measurePerformance: createDebugValue("measurePerformance", {
        defaults: {
            all: false
        }
    }),
    throwToBlob: createDebugValue("throwToBlob", {
        defaults: {
            all: false
        }
    }),
    reconnectOnPing: createDebugValue("reconnectOnPing", {
        defaults: {
            all: false
        }
    }),
    debugCursors: createDebugValue("debugCursors", {
        defaults: {
            all: false
        }
    }),
    forceSrgb: createDebugValue("forceSrgbColors", {
        defaults: {
            all: false
        }
    }),
    debugGeometry: createDebugValue("debugGeometry", {
        defaults: {
            all: false
        }
    }),
    hideShapes: createDebugValue("hideShapes", {
        defaults: {
            all: false
        }
    }),
    editOnType: createDebugValue("editOnType", {
        defaults: {
            all: false
        }
    }),
    a11y: createDebugValue("a11y", {
        defaults: {
            all: false
        }
    }),
    debugElbowArrows: createDebugValue("debugElbowArrows", {
        defaults: {
            all: false
        }
    })
};
if (typeof Element !== "undefined") {
    const nativeElementRemoveChild = Element.prototype.removeChild;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["react"])("element removal logging", ()=>{
        if (debugFlags.logElementRemoves.get()) {
            Element.prototype.removeChild = function(child) {
                console.warn("[tldraw] removing child:", child);
                return nativeElementRemoveChild.call(this, child);
            };
        } else {
            Element.prototype.removeChild = nativeElementRemoveChild;
        }
    });
}
function createDebugValue(name, { defaults, shouldStoreForSession = true }) {
    return createDebugValueBase({
        name,
        defaults,
        shouldStoreForSession
    });
}
function createDebugValueBase(def) {
    const defaultValue = getDefaultValue(def);
    const storedValue = def.shouldStoreForSession ? getStoredInitialValue(def.name) : null;
    const valueAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atom"])(`debug:${def.name}`, storedValue ?? defaultValue);
    if (typeof window !== "undefined") {
        if (def.shouldStoreForSession) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$EffectScheduler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["react"])(`debug:${def.name}`, ()=>{
                const currentValue = valueAtom.get();
                if (currentValue === defaultValue) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFromSessionStorage"])(`tldraw_debug:${def.name}`);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInSessionStorage"])(`tldraw_debug:${def.name}`, JSON.stringify(currentValue));
                }
            });
        }
        Object.defineProperty(window, `tldraw${def.name.replace(/^[a-z]/, (l)=>l.toUpperCase())}`, {
            get () {
                return valueAtom.get();
            },
            set (newValue) {
                valueAtom.set(newValue);
            },
            configurable: true
        });
    }
    return Object.assign(valueAtom, def, {
        reset: ()=>valueAtom.set(defaultValue)
    });
}
function getStoredInitialValue(name) {
    try {
        return JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFromSessionStorage"])(`tldraw_debug:${name}`) ?? "null");
    } catch  {
        return null;
    }
}
function readEnv(fn) {
    try {
        return fn();
    } catch  {
        return null;
    }
}
function getDefaultValue(def) {
    const env = readEnv(()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TLDRAW_ENV) ?? readEnv(()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VERCEL_PUBLIC_TLDRAW_ENV) ?? readEnv(()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_TLDRAW_ENV) ?? // default to production because if we don't have one of these, this is probably a library use
    "production";
    switch(env){
        case "production":
            return def.defaults.production ?? def.defaults.all;
        case "preview":
        case "staging":
            return def.defaults.staging ?? def.defaults.all;
        default:
            return def.defaults.development ?? def.defaults.all;
    }
}
;
 //# sourceMappingURL=debug-flags.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/dom.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeElementShouldCaptureKeys",
    ()=>activeElementShouldCaptureKeys,
    "loopToHtmlElement",
    ()=>loopToHtmlElement,
    "preventDefault",
    ()=>preventDefault,
    "releasePointerCapture",
    ()=>releasePointerCapture,
    "setPointerCapture",
    ()=>setPointerCapture,
    "setStyleProperty",
    ()=>setStyleProperty,
    "stopEventPropagation",
    ()=>stopEventPropagation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/debug-flags.mjs [app-client] (ecmascript)");
;
function loopToHtmlElement(elm) {
    if (elm.nodeType === Node.ELEMENT_NODE) return elm;
    if (elm.parentElement) return loopToHtmlElement(elm.parentElement);
    else throw Error("Could not find a parent element of an HTML type!");
}
function preventDefault(event) {
    event.preventDefault();
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debugFlags"].logPreventDefaults.get()) {
        console.warn("preventDefault called on event:", event);
    }
}
function setPointerCapture(element, event) {
    element.setPointerCapture(event.pointerId);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debugFlags"].logPointerCaptures.get()) {
        const trackingObj = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pointerCaptureTrackingObject"].get();
        trackingObj.set(element, (trackingObj.get(element) ?? 0) + 1);
        console.warn("setPointerCapture called on element:", element, event);
    }
}
function releasePointerCapture(element, event) {
    if (!element.hasPointerCapture(event.pointerId)) {
        return;
    }
    element.releasePointerCapture(event.pointerId);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debugFlags"].logPointerCaptures.get()) {
        const trackingObj = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pointerCaptureTrackingObject"].get();
        if (trackingObj.get(element) === 1) {
            trackingObj.delete(element);
        } else if (trackingObj.has(element)) {
            trackingObj.set(element, trackingObj.get(element) - 1);
        } else {
            console.warn("Release without capture");
        }
        console.warn("releasePointerCapture called on element:", element, event);
    }
}
const stopEventPropagation = (e)=>e.stopPropagation();
const setStyleProperty = (elm, property, value)=>{
    if (!elm) return;
    elm.style.setProperty(property, value);
};
function activeElementShouldCaptureKeys(allowButtons = false) {
    const { activeElement } = document;
    const elements = allowButtons ? [
        "input",
        "textarea"
    ] : [
        "input",
        "select",
        "button",
        "textarea"
    ];
    return !!(activeElement && (activeElement.isContentEditable || elements.indexOf(activeElement.tagName.toLowerCase()) > -1 || activeElement.classList.contains("tlui-slider__thumb")));
}
;
 //# sourceMappingURL=dom.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/keyboard.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAccelKey",
    ()=>isAccelKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$environment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/globals/environment.mjs [app-client] (ecmascript)");
;
const isAccelKey = (e)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$environment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tlenv"].isDarwin ? e.metaKey : e.ctrlKey || e.metaKey;
};
;
 //# sourceMappingURL=keyboard.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/getPointerInfo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPointerInfo",
    ()=>getPointerInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$keyboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/keyboard.mjs [app-client] (ecmascript)");
;
function getPointerInfo(editor, e) {
    editor.markEventAsHandled(e);
    return {
        point: {
            x: e.clientX,
            y: e.clientY,
            z: e.pressure
        },
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        ctrlKey: e.metaKey || e.ctrlKey,
        metaKey: e.metaKey,
        accelKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$keyboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAccelKey"])(e),
        pointerId: e.pointerId,
        button: e.button,
        isPen: e.pointerType === "pen"
    };
}
;
 //# sourceMappingURL=getPointerInfo.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/runtime.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime,
    "setRuntimeOverrides",
    ()=>setRuntimeOverrides
]);
const runtime = {
    openWindow (url, target, allowReferrer = false) {
        return window.open(url, target, allowReferrer ? "noopener" : "noopener noreferrer");
    },
    refreshPage () {
        window.location.reload();
    },
    async hardReset () {
        return await window.__tldraw__hardReset?.();
    }
};
function setRuntimeOverrides(input) {
    Object.assign(runtime, input);
}
;
 //# sourceMappingURL=runtime.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/hardResetEditor.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hardResetEditor",
    ()=>hardResetEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$runtime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/runtime.mjs [app-client] (ecmascript)");
;
function hardResetEditor() {
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$runtime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].hardReset();
}
;
 //# sourceMappingURL=hardResetEditor.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/refreshPage.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "refreshPage",
    ()=>refreshPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$runtime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/runtime.mjs [app-client] (ecmascript)");
;
function refreshPage() {
    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$runtime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].refreshPage();
}
;
 //# sourceMappingURL=refreshPage.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/areShapesContentEqual.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "areShapesContentEqual",
    ()=>areShapesContentEqual
]);
const areShapesContentEqual = (a, b)=>a.props === b.props && a.meta === b.meta;
;
 //# sourceMappingURL=areShapesContentEqual.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/browserCanvasMaxSize.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clampToBrowserMaxCanvasSize",
    ()=>clampToBrowserMaxCanvasSize,
    "getCanvasSize",
    ()=>getCanvasSize
]);
let maxCanvasSizes = null;
function getBrowserCanvasMaxSize() {
    if (!maxCanvasSizes) {
        maxCanvasSizes = {
            maxWidth: getCanvasSize("width"),
            // test very wide but 1 pixel tall canvases
            maxHeight: getCanvasSize("height"),
            // test very tall but 1 pixel wide canvases
            maxArea: getCanvasSize("area")
        };
    }
    return maxCanvasSizes;
}
/*!
 * Extracted from https://github.com/jhildenbiddle/canvas-size
 * MIT License: https://github.com/jhildenbiddle/canvas-size/blob/master/LICENSE
 * Copyright (c) John Hildenbiddle
 */ const MAX_SAFE_CANVAS_DIMENSION = 8192;
const MAX_SAFE_CANVAS_AREA = 4096 * 4096;
const TEST_SIZES = {
    area: [
        // Chrome 70 (Mac, Win)
        // Chrome 68 (Android 4.4)
        // Edge 17 (Win)
        // Safari 7-12 (Mac)
        16384,
        // Chrome 68 (Android 7.1-9)
        14188,
        // Chrome 68 (Android 5)
        11402,
        // Firefox 63 (Mac, Win)
        11180,
        // Chrome 68 (Android 6)
        10836,
        // IE 9-11 (Win)
        8192,
        // IE Mobile (Windows Phone 8.x)
        // Safari (iOS 9 - 12)
        4096
    ],
    height: [
        // Safari 7-12 (Mac)
        // Safari (iOS 9-12)
        8388607,
        // Chrome 83 (Mac, Win)
        65535,
        // Chrome 70 (Mac, Win)
        // Chrome 68 (Android 4.4-9)
        // Firefox 63 (Mac, Win)
        32767,
        // Edge 17 (Win)
        // IE11 (Win)
        16384,
        // IE 9-10 (Win)
        8192,
        // IE Mobile (Windows Phone 8.x)
        4096
    ],
    width: [
        // Safari 7-12 (Mac)
        // Safari (iOS 9-12)
        4194303,
        // Chrome 83 (Mac, Win)
        65535,
        // Chrome 70 (Mac, Win)
        // Chrome 68 (Android 4.4-9)
        // Firefox 63 (Mac, Win)
        32767,
        // Edge 17 (Win)
        // IE11 (Win)
        16384,
        // IE 9-10 (Win)
        8192,
        // IE Mobile (Windows Phone 8.x)
        4096
    ]
};
function getCanvasSize(dimension) {
    const cropCvs = document.createElement("canvas");
    cropCvs.width = 1;
    cropCvs.height = 1;
    const cropCtx = cropCvs.getContext("2d");
    for (const size of TEST_SIZES[dimension]){
        const w = dimension === "height" ? 1 : size;
        const h = dimension === "width" ? 1 : size;
        const testCvs = document.createElement("canvas");
        testCvs.width = w;
        testCvs.height = h;
        const testCtx = testCvs.getContext("2d");
        testCtx.fillRect(w - 1, h - 1, 1, 1);
        cropCtx.drawImage(testCvs, w - 1, h - 1, 1, 1, 0, 0, 1, 1);
        const isTestPassed = cropCtx.getImageData(0, 0, 1, 1).data[3] !== 0;
        testCvs.width = 0;
        testCvs.height = 0;
        if (isTestPassed) {
            cropCvs.width = 0;
            cropCvs.height = 0;
            if (dimension === "area") {
                return size * size;
            } else {
                return size;
            }
        }
    }
    cropCvs.width = 0;
    cropCvs.height = 0;
    throw Error("Failed to determine maximum canvas dimension");
}
function clampToBrowserMaxCanvasSize(width, height) {
    if (width <= MAX_SAFE_CANVAS_DIMENSION && height <= MAX_SAFE_CANVAS_DIMENSION && width * height <= MAX_SAFE_CANVAS_AREA) {
        return [
            width,
            height
        ];
    }
    const { maxWidth, maxHeight, maxArea } = getBrowserCanvasMaxSize();
    const aspectRatio = width / height;
    if (width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
    }
    if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
    }
    if (width * height > maxArea) {
        const ratio = Math.sqrt(maxArea / (width * height));
        width *= ratio;
        height *= ratio;
    }
    return [
        width,
        height
    ];
}
;
 //# sourceMappingURL=browserCanvasMaxSize.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/SharedStylesMap.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReadonlySharedStyleMap",
    ()=>ReadonlySharedStyleMap,
    "SharedStyleMap",
    ()=>SharedStyleMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/control.mjs [app-client] (ecmascript)");
;
function sharedStyleEquals(a, b) {
    if (!b) return false;
    switch(a.type){
        case "mixed":
            return b.type === "mixed";
        case "shared":
            return b.type === "shared" && a.value === b.value;
        default:
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(a);
    }
}
class ReadonlySharedStyleMap {
    /** @internal */ map;
    constructor(entries){
        this.map = new Map(entries);
    }
    get(prop) {
        return this.map.get(prop);
    }
    getAsKnownValue(prop) {
        const value = this.get(prop);
        if (!value) return void 0;
        if (value.type === "mixed") return void 0;
        return value.value;
    }
    // eslint-disable-next-line no-restricted-syntax
    get size() {
        return this.map.size;
    }
    equals(other) {
        if (this.size !== other.size) return false;
        const checkedKeys = /* @__PURE__ */ new Set();
        for (const [styleProp, value] of this){
            if (!sharedStyleEquals(value, other.get(styleProp))) return false;
            checkedKeys.add(styleProp);
        }
        for (const [styleProp, value] of other){
            if (checkedKeys.has(styleProp)) continue;
            if (!sharedStyleEquals(value, this.get(styleProp))) return false;
        }
        return true;
    }
    keys() {
        return this.map.keys();
    }
    values() {
        return this.map.values();
    }
    entries() {
        return this.map.entries();
    }
    [Symbol.iterator]() {
        return this.map[Symbol.iterator]();
    }
}
class SharedStyleMap extends ReadonlySharedStyleMap {
    set(prop, value) {
        this.map.set(prop, value);
    }
    applyValue(prop, value) {
        const existingValue = this.get(prop);
        if (!existingValue) {
            this.set(prop, {
                type: "shared",
                value
            });
            return;
        }
        switch(existingValue.type){
            case "mixed":
                return;
            case "shared":
                if (existingValue.value !== value) {
                    this.set(prop, {
                        type: "mixed"
                    });
                }
                return;
            default:
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(existingValue, "type");
        }
    }
}
;
 //# sourceMappingURL=SharedStylesMap.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/assets.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataUrlToFile",
    ()=>dataUrlToFile,
    "getDefaultCdnBaseUrl",
    ()=>getDefaultCdnBaseUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$network$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/network.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$version$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/version.mjs [app-client] (ecmascript)");
;
;
function dataUrlToFile(url, filename, mimeType) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$network$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])(url).then(function(res) {
        return res.arrayBuffer();
    }).then(function(buf) {
        return new File([
            buf
        ], filename, {
            type: mimeType
        });
    });
}
const CDN_BASE_URL = "https://cdn.tldraw.com";
function getDefaultCdnBaseUrl() {
    return `${CDN_BASE_URL}/${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$version$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]}`;
}
;
 //# sourceMappingURL=assets.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/deepLinks.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDeepLinkString",
    ()=>createDeepLinkString,
    "parseDeepLinkString",
    ()=>parseDeepLinkString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLPage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/records/TLPage.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLShape$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/records/TLShape.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/control.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
;
;
;
function createDeepLinkString(deepLink) {
    switch(deepLink.type){
        case "shapes":
            {
                const ids = deepLink.shapeIds.map((id)=>encodeId(id.slice("shape:".length)));
                return `s${ids.join(".")}`;
            }
        case "page":
            {
                return "p" + encodeId(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLPage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageRecordType"].parseId(deepLink.pageId));
            }
        case "viewport":
            {
                const { bounds, pageId } = deepLink;
                let res = `v${Math.round(bounds.x)}.${Math.round(bounds.y)}.${Math.round(bounds.w)}.${Math.round(bounds.h)}`;
                if (pageId) {
                    res += "." + encodeId(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLPage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageRecordType"].parseId(pageId));
                }
                return res;
            }
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(deepLink);
    }
}
function parseDeepLinkString(deepLinkString) {
    const type = deepLinkString[0];
    switch(type){
        case "s":
            {
                const shapeIds = deepLinkString.slice(1).split(".").filter(Boolean).map((id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLShape$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])(decodeURIComponent(id)));
                return {
                    type: "shapes",
                    shapeIds
                };
            }
        case "p":
            {
                const pageId = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLPage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageRecordType"].createId(decodeURIComponent(deepLinkString.slice(1)));
                return {
                    type: "page",
                    pageId
                };
            }
        case "v":
            {
                const [x, y, w, h, pageId] = deepLinkString.slice(1).split(".");
                return {
                    type: "viewport",
                    bounds: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"](Number(x), Number(y), Number(w), Number(h)),
                    pageId: pageId ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLPage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageRecordType"].createId(decodeURIComponent(pageId)) : void 0
                };
            }
        default:
            throw Error("Invalid deep link string");
    }
}
function encodeId(str) {
    return encodeURIComponent(str).replace(/\./g, "%2E");
}
;
 //# sourceMappingURL=deepLinks.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/getIncrementedName.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getIncrementedName",
    ()=>getIncrementedName
]);
function getIncrementedName(name, others) {
    let result = name;
    const set = new Set(others);
    while(set.has(result)){
        result = /^.*(\d+)$/.exec(result)?.[1] ? result.replace(/(\d+)(?=\D?)$/, (m)=>{
            return (+m + 1).toString();
        }) : `${result} 1`;
    }
    return result;
}
;
 //# sourceMappingURL=getIncrementedName.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/reorderShapes.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getReorderingShapesChanges",
    ()=>getReorderingShapesChanges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/array.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/reordering.mjs [app-client] (ecmascript)");
;
function getReorderingShapesChanges(editor, operation, ids, opts) {
    if (ids.length === 0) return [];
    const parents = /* @__PURE__ */ new Map();
    for (const shape of (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(ids.map((id)=>editor.getShape(id)))){
        const { parentId } = shape;
        if (!parents.has(parentId)) {
            parents.set(parentId, {
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(editor.getSortedChildIdsForParent(parentId).map((id)=>editor.getShape(id))),
                moving: /* @__PURE__ */ new Set()
            });
        }
        parents.get(parentId).moving.add(shape);
    }
    const changes = [];
    switch(operation){
        case "toBack":
            {
                parents.forEach(({ moving, children })=>reorderToBack(moving, children, changes));
                break;
            }
        case "toFront":
            {
                parents.forEach(({ moving, children })=>reorderToFront(moving, children, changes));
                break;
            }
        case "forward":
            {
                parents.forEach(({ moving, children })=>reorderForward(editor, moving, children, changes, opts));
                break;
            }
        case "backward":
            {
                parents.forEach(({ moving, children })=>reorderBackward(editor, moving, children, changes, opts));
                break;
            }
    }
    return changes;
}
function reorderToBack(moving, children, changes) {
    const len = children.length;
    if (moving.size === len) return;
    let below;
    let above;
    for(let i = 0; i < len; i++){
        const shape = children[i];
        if (moving.has(shape)) {
            below = shape.index;
            moving.delete(shape);
        } else {
            above = shape.index;
            break;
        }
    }
    if (moving.size === 0) {
        return;
    } else {
        const indices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndicesBetween"])(below, above, moving.size);
        changes.push(...Array.from(moving.values()).sort(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortByIndex"]).map((shape, i)=>({
                ...shape,
                index: indices[i]
            })));
    }
}
function reorderToFront(moving, children, changes) {
    const len = children.length;
    if (moving.size === len) return;
    let below;
    let above;
    for(let i = len - 1; i > -1; i--){
        const shape = children[i];
        if (moving.has(shape)) {
            above = shape.index;
            moving.delete(shape);
        } else {
            below = shape.index;
            break;
        }
    }
    if (moving.size === 0) {
        return;
    } else {
        const indices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndicesBetween"])(below, above, moving.size);
        changes.push(...Array.from(moving.values()).sort(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortByIndex"]).map((shape, i)=>({
                ...shape,
                index: indices[i]
            })));
    }
}
function getOverlapChecker(editor, moving) {
    const movingBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(Array.from(moving).map((shape)=>{
        const bounds = editor.getShapePageBounds(shape);
        if (!bounds) return null;
        return {
            shape,
            bounds
        };
    }));
    const isOverlapping = (child)=>{
        const bounds = editor.getShapePageBounds(child);
        if (!bounds) return false;
        return movingBounds.some((other)=>{
            return other.bounds.includes(bounds);
        });
    };
    return isOverlapping;
}
function reorderForward(editor, moving, children, changes, opts) {
    const isOverlapping = getOverlapChecker(editor, moving);
    const len = children.length;
    if (moving.size === len) return;
    let state = {
        name: "skipping"
    };
    for(let i = 0; i < len; i++){
        const isMoving = moving.has(children[i]);
        switch(state.name){
            case "skipping":
                {
                    if (!isMoving) continue;
                    state = {
                        name: "selecting",
                        selectIndex: i
                    };
                    break;
                }
            case "selecting":
                {
                    if (isMoving) continue;
                    if (!opts?.considerAllShapes && !isOverlapping(children[i])) continue;
                    const { selectIndex } = state;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndicesBetween"])(children[i].index, children[i + 1]?.index, i - selectIndex).forEach((index, k)=>{
                        const child = children[selectIndex + k];
                        if (!moving.has(child)) return;
                        changes.push({
                            ...child,
                            index
                        });
                    });
                    state = {
                        name: "skipping"
                    };
                    break;
                }
        }
    }
}
function reorderBackward(editor, moving, children, changes, opts) {
    const isOverlapping = getOverlapChecker(editor, moving);
    const len = children.length;
    if (moving.size === len) return;
    let state = {
        name: "skipping"
    };
    for(let i = len - 1; i > -1; i--){
        const isMoving = moving.has(children[i]);
        switch(state.name){
            case "skipping":
                {
                    if (!isMoving) continue;
                    state = {
                        name: "selecting",
                        selectIndex: i
                    };
                    break;
                }
            case "selecting":
                {
                    if (isMoving) continue;
                    if (!opts?.considerAllShapes && !isOverlapping(children[i])) continue;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndicesBetween"])(children[i - 1]?.index, children[i].index, state.selectIndex - i).forEach((index, k)=>{
                        const child = children[i + k + 1];
                        if (!moving.has(child)) return;
                        changes.push({
                            ...child,
                            index
                        });
                    });
                    state = {
                        name: "skipping"
                    };
                    break;
                }
        }
    }
}
;
 //# sourceMappingURL=reorderShapes.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/rotation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyRotationToSnapshotShapes",
    ()=>applyRotationToSnapshotShapes,
    "getRotationSnapshot",
    ()=>getRotationSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLShape$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/records/TLShape.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/array.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Mat.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
;
;
;
;
;
function getRotationSnapshot({ editor, ids }) {
    const shapes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(ids.map((id)=>editor.getShape(id)));
    const rotation = editor.getShapesSharedRotation(ids);
    const rotatedPageBounds = editor.getShapesRotatedPageBounds(ids);
    if (!rotatedPageBounds) {
        return null;
    }
    const initialPageCenter = rotatedPageBounds.center.clone().rotWith(rotatedPageBounds.point, rotation);
    return {
        initialPageCenter,
        initialCursorAngle: initialPageCenter.angle(editor.inputs.getOriginPagePoint()),
        initialShapesRotation: rotation,
        shapeSnapshots: shapes.map((shape)=>({
                shape,
                initialPagePoint: editor.getShapePageTransform(shape.id).point()
            }))
    };
}
function applyRotationToSnapshotShapes({ delta, editor, snapshot, stage, centerOverride }) {
    const { initialPageCenter, shapeSnapshots } = snapshot;
    editor.updateShapes(shapeSnapshots.map(({ shape, initialPagePoint })=>{
        const parentTransform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$records$2f$TLShape$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isShapeId"])(shape.parentId) ? editor.getShapePageTransform(shape.parentId) : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].Identity();
        const newPagePoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].RotWith(initialPagePoint, centerOverride ?? initialPageCenter, delta);
        const newLocalPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(// use the current parent transform in case it has moved/resized since the start
        // (e.g. if rotating a shape at the edge of a group)
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].Inverse(parentTransform), newPagePoint);
        const newRotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canonicalizeRotation"])(shape.rotation + delta);
        return {
            id: shape.id,
            type: shape.type,
            x: newLocalPoint.x,
            y: newLocalPoint.y,
            rotation: newRotation
        };
    }));
    const changes = [];
    shapeSnapshots.forEach(({ shape })=>{
        const current = editor.getShape(shape.id);
        if (!current) return;
        const util = editor.getShapeUtil(shape);
        if (stage === "start" || stage === "one-off") {
            const changeStart = util.onRotateStart?.(shape);
            if (changeStart) changes.push(changeStart);
        }
        const changeUpdate = util.onRotate?.(shape, current);
        if (changeUpdate) changes.push(changeUpdate);
        if (stage === "end" || stage === "one-off") {
            const changeEnd = util.onRotateEnd?.(shape, current);
            if (changeEnd) changes.push(changeEnd);
        }
    });
    if (changes.length > 0) {
        editor.updateShapes(changes);
    }
}
;
 //# sourceMappingURL=rotation.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/sync/LocalIndexedDb.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocalIndexedDb",
    ()=>LocalIndexedDb,
    "Table",
    ()=>Table,
    "getAllIndexDbNames",
    ()=>getAllIndexDbNames
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/control.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/storage.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$function$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/function.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/idb/build/index.js [app-client] (ecmascript) <locals>");
;
;
const STORE_PREFIX = "TLDRAW_DOCUMENT_v2";
const LEGACY_ASSET_STORE_PREFIX = "TLDRAW_ASSET_STORE_v1";
const dbNameIndexKey = "TLDRAW_DB_NAME_INDEX_v2";
const Table = {
    Records: "records",
    Schema: "schema",
    SessionState: "session_state",
    Assets: "assets"
};
async function openLocalDb(persistenceKey) {
    const storeId = STORE_PREFIX + persistenceKey;
    addDbName(storeId);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["openDB"])(storeId, 4, {
        upgrade (database) {
            if (!database.objectStoreNames.contains(Table.Records)) {
                database.createObjectStore(Table.Records);
            }
            if (!database.objectStoreNames.contains(Table.Schema)) {
                database.createObjectStore(Table.Schema);
            }
            if (!database.objectStoreNames.contains(Table.SessionState)) {
                database.createObjectStore(Table.SessionState);
            }
            if (!database.objectStoreNames.contains(Table.Assets)) {
                database.createObjectStore(Table.Assets);
            }
        }
    });
}
async function migrateLegacyAssetDbIfNeeded(persistenceKey) {
    const databases = window.indexedDB.databases ? (await window.indexedDB.databases()).map((db)=>db.name) : getAllIndexDbNames();
    const oldStoreId = LEGACY_ASSET_STORE_PREFIX + persistenceKey;
    const existing = databases.find((dbName)=>dbName === oldStoreId);
    if (!existing) return;
    const oldAssetDb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["openDB"])(oldStoreId, 1, {
        upgrade (database) {
            if (!database.objectStoreNames.contains("assets")) {
                database.createObjectStore("assets");
            }
        }
    });
    if (!oldAssetDb.objectStoreNames.contains("assets")) return;
    const oldTx = oldAssetDb.transaction([
        "assets"
    ], "readonly");
    const oldAssetStore = oldTx.objectStore("assets");
    const oldAssetsKeys = await oldAssetStore.getAllKeys();
    const oldAssets = await Promise.all(oldAssetsKeys.map(async (key)=>[
            key,
            await oldAssetStore.get(key)
        ]));
    await oldTx.done;
    const newDb = await openLocalDb(persistenceKey);
    const newTx = newDb.transaction([
        Table.Assets
    ], "readwrite");
    const newAssetTable = newTx.objectStore(Table.Assets);
    for (const [key, value] of oldAssets){
        newAssetTable.put(value, key);
    }
    await newTx.done;
    oldAssetDb.close();
    newDb.close();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deleteDB"])(oldStoreId);
}
class LocalIndexedDb {
    getDbPromise;
    isClosed = false;
    pendingTransactionSet = /* @__PURE__ */ new Set();
    /** @internal */ static connectedInstances = /* @__PURE__ */ new Set();
    constructor(persistenceKey){
        LocalIndexedDb.connectedInstances.add(this);
        this.getDbPromise = (async ()=>{
            await migrateLegacyAssetDbIfNeeded(persistenceKey);
            return await openLocalDb(persistenceKey);
        })();
    }
    getDb() {
        return this.getDbPromise;
    }
    /**
   * Wait for any pending transactions to be completed. Useful for tests.
   *
   * @internal
   */ pending() {
        return Promise.allSettled([
            this.getDbPromise,
            ...this.pendingTransactionSet
        ]).then(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$function$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]);
    }
    async close() {
        if (this.isClosed) return;
        this.isClosed = true;
        await this.pending();
        (await this.getDb()).close();
        LocalIndexedDb.connectedInstances.delete(this);
    }
    tx(mode, names, cb) {
        const txPromise = (async ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(!this.isClosed, "db is closed");
            const db = await this.getDb();
            const tx = db.transaction(names, mode);
            const done = tx.done.catch((e)=>{
                if (!this.isClosed) {
                    throw e;
                }
            });
            try {
                return await cb(tx);
            } finally{
                if (!this.isClosed) {
                    await done;
                } else {
                    tx.abort();
                }
            }
        })();
        this.pendingTransactionSet.add(txPromise);
        txPromise.finally(()=>this.pendingTransactionSet.delete(txPromise));
        return txPromise;
    }
    async load({ sessionId } = {}) {
        return await this.tx("readonly", [
            Table.Records,
            Table.Schema,
            Table.SessionState
        ], async (tx)=>{
            const recordsStore = tx.objectStore(Table.Records);
            const schemaStore = tx.objectStore(Table.Schema);
            const sessionStateStore = tx.objectStore(Table.SessionState);
            let sessionStateSnapshot = sessionId ? (await sessionStateStore.get(sessionId))?.snapshot : null;
            if (!sessionStateSnapshot) {
                const all = await sessionStateStore.getAll();
                sessionStateSnapshot = all.sort((a, b)=>a.updatedAt - b.updatedAt).pop()?.snapshot;
            }
            const result = {
                records: await recordsStore.getAll(),
                schema: await schemaStore.get(Table.Schema),
                sessionStateSnapshot
            };
            return result;
        });
    }
    async storeChanges({ schema, changes, sessionId, sessionStateSnapshot }) {
        await this.tx("readwrite", [
            Table.Records,
            Table.Schema,
            Table.SessionState
        ], async (tx)=>{
            const recordsStore = tx.objectStore(Table.Records);
            const schemaStore = tx.objectStore(Table.Schema);
            const sessionStateStore = tx.objectStore(Table.SessionState);
            for (const [id, record] of Object.entries(changes.added)){
                await recordsStore.put(record, id);
            }
            for (const [_prev, updated] of Object.values(changes.updated)){
                await recordsStore.put(updated, updated.id);
            }
            for (const id of Object.keys(changes.removed)){
                await recordsStore.delete(id);
            }
            schemaStore.put(schema.serialize(), Table.Schema);
            if (sessionStateSnapshot && sessionId) {
                sessionStateStore.put({
                    snapshot: sessionStateSnapshot,
                    updatedAt: Date.now(),
                    id: sessionId
                }, sessionId);
            } else if (sessionStateSnapshot || sessionId) {
                console.error("sessionStateSnapshot and instanceId must be provided together");
            }
        });
    }
    async storeSnapshot({ schema, snapshot, sessionId, sessionStateSnapshot }) {
        await this.tx("readwrite", [
            Table.Records,
            Table.Schema,
            Table.SessionState
        ], async (tx)=>{
            const recordsStore = tx.objectStore(Table.Records);
            const schemaStore = tx.objectStore(Table.Schema);
            const sessionStateStore = tx.objectStore(Table.SessionState);
            await recordsStore.clear();
            for (const [id, record] of Object.entries(snapshot)){
                await recordsStore.put(record, id);
            }
            schemaStore.put(schema.serialize(), Table.Schema);
            if (sessionStateSnapshot && sessionId) {
                sessionStateStore.put({
                    snapshot: sessionStateSnapshot,
                    updatedAt: Date.now(),
                    id: sessionId
                }, sessionId);
            } else if (sessionStateSnapshot || sessionId) {
                console.error("sessionStateSnapshot and instanceId must be provided together");
            }
        });
    }
    async pruneSessions() {
        await this.tx("readwrite", [
            Table.SessionState
        ], async (tx)=>{
            const sessionStateStore = tx.objectStore(Table.SessionState);
            const all = (await sessionStateStore.getAll()).sort((a, b)=>a.updatedAt - b.updatedAt);
            if (all.length < 10) {
                await tx.done;
                return;
            }
            const toDelete = all.slice(0, all.length - 10);
            for (const { id } of toDelete){
                await sessionStateStore.delete(id);
            }
        });
    }
    async getAsset(assetId) {
        return await this.tx("readonly", [
            Table.Assets
        ], async (tx)=>{
            const assetsStore = tx.objectStore(Table.Assets);
            return await assetsStore.get(assetId);
        });
    }
    async storeAsset(assetId, blob) {
        await this.tx("readwrite", [
            Table.Assets
        ], async (tx)=>{
            const assetsStore = tx.objectStore(Table.Assets);
            await assetsStore.put(blob, assetId);
        });
    }
    async removeAssets(assetId) {
        await this.tx("readwrite", [
            Table.Assets
        ], async (tx)=>{
            const assetsStore = tx.objectStore(Table.Assets);
            for (const id of assetId){
                await assetsStore.delete(id);
            }
        });
    }
}
function getAllIndexDbNames() {
    const result = JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFromLocalStorage"])(dbNameIndexKey) || "[]") ?? [];
    if (!Array.isArray(result)) {
        return [];
    }
    return result;
}
function addDbName(name) {
    const all = new Set(getAllIndexDbNames());
    all.add(name);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInLocalStorage"])(dbNameIndexKey, JSON.stringify([
        ...all
    ]));
}
;
 //# sourceMappingURL=LocalIndexedDb.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/sync/alerts.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "showCantReadFromIndexDbAlert",
    ()=>showCantReadFromIndexDbAlert,
    "showCantWriteToIndexDbAlert",
    ()=>showCantWriteToIndexDbAlert
]);
function showCantWriteToIndexDbAlert() {
    window.alert(`Oops! We could not save changes to your browser's storage. We now need to reload the page and try again.

Keep seeing this message?
\u2022 If you're using tldraw in a private or "incognito" window, try loading tldraw in a regular window or in a different browser.
\u2022 If your hard disk is full, try clearing up some space and then reload the page.`);
}
function showCantReadFromIndexDbAlert() {
    window.alert(`Oops! We could not access your browser's storage\u2014and the app won't work correctly without that. We now need to reload the page and try again.

Keep seeing this message?
\u2022 If you're using tldraw in a private or "incognito" window, try loading tldraw in a regular window or in a different browser.`);
}
;
 //# sourceMappingURL=alerts.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/sync/TLLocalSyncClient.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BroadcastChannelMock",
    ()=>BroadcastChannelMock,
    "TLLocalSyncClient",
    ()=>TLLocalSyncClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/transactions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/store/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$lib$2f$RecordsDiff$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/store/dist-esm/lib/RecordsDiff.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/control.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$config$2f$TLSessionStateSnapshot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/config/TLSessionStateSnapshot.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$sync$2f$LocalIndexedDb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/sync/LocalIndexedDb.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$sync$2f$alerts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/sync/alerts.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
const PERSIST_THROTTLE_MS = 350;
const PERSIST_RETRY_THROTTLE_MS = 1e4;
const UPDATE_INSTANCE_STATE = Symbol("UPDATE_INSTANCE_STATE");
const msg = (msg2)=>msg2;
class BroadcastChannelMock {
    onmessage;
    constructor(_name){}
    postMessage(_msg) {}
    close() {}
}
const BC = typeof BroadcastChannel === "undefined" ? BroadcastChannelMock : BroadcastChannel;
class TLLocalSyncClient {
    constructor(store, { persistenceKey, sessionId = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$config$2f$TLSessionStateSnapshot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TAB_ID"], onLoad, onLoadError }, channel = new BC(`tldraw-tab-sync-${persistenceKey}`)){
        this.store = store;
        this.channel = channel;
        if (typeof window !== "undefined") {
            ;
            window.tlsync = this;
        }
        this.persistenceKey = persistenceKey;
        this.sessionId = sessionId;
        this.db = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$sync$2f$LocalIndexedDb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LocalIndexedDb"](persistenceKey);
        this.disposables.add(()=>this.db.close());
        this.serializedSchema = this.store.schema.serialize();
        this.$sessionStateSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$config$2f$TLSessionStateSnapshot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSessionStateSnapshotSignal"])(this.store);
        this.disposables.add(// Set up a subscription to changes from the store: When
        // the store changes (and if the change was made by the user)
        // then immediately send the diff to other tabs via postMessage
        // and schedule a persist.
        store.listen(({ changes })=>{
            this.diffQueue.push(changes);
            this.channel.postMessage(msg({
                type: "diff",
                storeId: this.store.id,
                changes,
                schema: this.serializedSchema
            }));
            this.schedulePersist();
        }, {
            source: "user",
            scope: "document"
        }));
        this.disposables.add(store.listen(()=>{
            this.diffQueue.push(UPDATE_INSTANCE_STATE);
            this.schedulePersist();
        }, {
            scope: "session"
        }));
        this.connect(onLoad, onLoadError);
        this.documentTypes = new Set(Object.values(this.store.schema.types).filter((t)=>t.scope === "document").map((t)=>t.typeName));
    }
    disposables = /* @__PURE__ */ new Set();
    diffQueue = [];
    didDispose = false;
    shouldDoFullDBWrite = true;
    isReloading = false;
    persistenceKey;
    sessionId;
    serializedSchema;
    isDebugging = false;
    documentTypes;
    $sessionStateSnapshot;
    /** @internal */ db;
    initTime = Date.now();
    debug(...args) {
        if (this.isDebugging) {
            console.debug(...args);
        }
    }
    async connect(onLoad, onLoadError) {
        this.debug("connecting");
        let data;
        try {
            data = await this.db.load({
                sessionId: this.sessionId
            });
        } catch (error) {
            onLoadError(error);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$sync$2f$alerts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showCantReadFromIndexDbAlert"])();
            return;
        }
        this.debug("loaded data from store", data, "didDispose", this.didDispose);
        if (this.didDispose) return;
        try {
            if (data) {
                const documentSnapshot = Object.fromEntries(data.records.map((r)=>[
                        r.id,
                        r
                    ]));
                const sessionStateSnapshot = data.sessionStateSnapshot ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$config$2f$TLSessionStateSnapshot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractSessionStateFromLegacySnapshot"])(documentSnapshot);
                const migrationResult = this.store.schema.migrateStoreSnapshot({
                    store: documentSnapshot,
                    // eslint-disable-next-line @typescript-eslint/no-deprecated
                    schema: data.schema ?? this.store.schema.serializeEarliestVersion()
                });
                if (migrationResult.type === "error") {
                    console.error("failed to migrate store", migrationResult);
                    onLoadError(new Error(`Failed to migrate store: ${migrationResult.reason}`));
                    return;
                }
                const records = Object.values(migrationResult.value).filter((r)=>this.documentTypes.has(r.typeName));
                if (records.length > 0) {
                    this.store.mergeRemoteChanges(()=>{
                        this.store.put(records, "initialize");
                    });
                }
                if (sessionStateSnapshot) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$config$2f$TLSessionStateSnapshot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadSessionStateSnapshotIntoStore"])(this.store, sessionStateSnapshot, {
                        forceOverwrite: true
                    });
                }
            }
            this.channel.onmessage = ({ data: data2 })=>{
                this.debug("got message", data2);
                const msg2 = data2;
                const res = this.store.schema.getMigrationsSince(msg2.schema);
                if (!res.ok) {
                    const timeSinceInit = Date.now() - this.initTime;
                    if (timeSinceInit < 5e3) {
                        onLoadError(new Error("Schema mismatch, please close other tabs and reload the page"));
                        return;
                    }
                    this.debug("reloading");
                    this.isReloading = true;
                    window?.location?.reload?.();
                    return;
                } else if (res.value.length > 0) {
                    this.debug("telling them to reload");
                    this.channel.postMessage({
                        type: "announce",
                        schema: this.serializedSchema
                    });
                    this.shouldDoFullDBWrite = true;
                    this.persistIfNeeded();
                    return;
                }
                if (msg2.type === "diff") {
                    this.debug("applying diff");
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$transactions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transact"])(()=>{
                        this.store.mergeRemoteChanges(()=>{
                            this.store.applyDiff(msg2.changes);
                        });
                    });
                }
            };
            this.channel.postMessage({
                type: "announce",
                schema: this.serializedSchema
            });
            this.disposables.add(()=>{
                this.channel.close();
            });
            onLoad(this);
        } catch (e) {
            this.debug("error loading data from store", e);
            if (this.didDispose) return;
            onLoadError(e);
            return;
        }
    }
    close() {
        this.debug("closing");
        this.didDispose = true;
        this.disposables.forEach((d)=>d());
    }
    isPersisting = false;
    didLastWriteError = false;
    scheduledPersistTimeout = null;
    /**
   * Schedule a persist. Persists don't happen immediately: they are throttled to avoid writing too
   * often, and will retry if failed.
   *
   * @internal
   */ schedulePersist() {
        this.debug("schedulePersist", this.scheduledPersistTimeout);
        if (this.scheduledPersistTimeout) return;
        this.scheduledPersistTimeout = setTimeout(()=>{
            this.scheduledPersistTimeout = null;
            this.persistIfNeeded();
        }, this.didLastWriteError ? PERSIST_RETRY_THROTTLE_MS : PERSIST_THROTTLE_MS);
    }
    /**
   * Persist to IndexedDB only under certain circumstances:
   *
   * - If we're not already persisting
   * - If we're not reloading the page
   * - And we have something to persist (a full db write scheduled or changes in the diff queue)
   *
   * @internal
   */ persistIfNeeded() {
        this.debug("persistIfNeeded", {
            isPersisting: this.isPersisting,
            isReloading: this.isReloading,
            shouldDoFullDBWrite: this.shouldDoFullDBWrite,
            diffQueueLength: this.diffQueue.length,
            storeIsPossiblyCorrupt: this.store.isPossiblyCorrupted()
        });
        if (this.scheduledPersistTimeout) {
            clearTimeout(this.scheduledPersistTimeout);
            this.scheduledPersistTimeout = null;
        }
        if (this.isPersisting) return;
        if (this.isReloading) return;
        if (this.store.isPossiblyCorrupted()) return;
        if (this.shouldDoFullDBWrite || this.diffQueue.length > 0) {
            this.doPersist();
        }
    }
    /**
   * Actually persist to IndexedDB. If the write fails, then we'll retry with a full db write after
   * a short delay.
   */ async doPersist() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(!this.isPersisting, "persist already in progress");
        if (this.didDispose) return;
        this.isPersisting = true;
        this.debug("doPersist start");
        const diffQueue = this.diffQueue;
        this.diffQueue = [];
        try {
            if (this.shouldDoFullDBWrite) {
                this.shouldDoFullDBWrite = false;
                await this.db.storeSnapshot({
                    schema: this.store.schema,
                    snapshot: this.store.serialize(),
                    sessionId: this.sessionId,
                    sessionStateSnapshot: this.$sessionStateSnapshot.get()
                });
            } else {
                const diffs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$lib$2f$RecordsDiff$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["squashRecordDiffs"])(diffQueue.filter((d)=>d !== UPDATE_INSTANCE_STATE));
                await this.db.storeChanges({
                    changes: diffs,
                    schema: this.store.schema,
                    sessionId: this.sessionId,
                    sessionStateSnapshot: this.$sessionStateSnapshot.get()
                });
            }
            this.didLastWriteError = false;
        } catch (e) {
            this.shouldDoFullDBWrite = true;
            this.didLastWriteError = true;
            console.error("failed to store changes in indexed db", e);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$sync$2f$alerts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showCantWriteToIndexDbAlert"])();
            if (typeof window !== "undefined") {
                window.location.reload();
            }
        }
        this.isPersisting = false;
        this.debug("doPersist end");
        this.schedulePersist();
    }
}
;
 //# sourceMappingURL=TLLocalSyncClient.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/licensing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "importPublicKey",
    ()=>importPublicKey,
    "str2ab",
    ()=>str2ab
]);
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for(let i = 0, strLen = str.length; i < strLen; i++){
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
function importPublicKey(pemContents) {
    const binaryDerString = atob(pemContents);
    const binaryDer = str2ab(binaryDerString);
    return crypto.subtle.importKey("spki", new Uint8Array(binaryDer), {
        name: "ECDSA",
        namedCurve: "P-256"
    }, true, [
        "verify"
    ]);
}
;
 //# sourceMappingURL=licensing.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/getSvgPathFromPoints.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSvgPathFromPoints",
    ()=>getSvgPathFromPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
;
function getSvgPathFromPoints(points, closed = true) {
    const len = points.length;
    if (len < 2) {
        return "";
    }
    let a = points[0];
    let b = points[1];
    if (len === 2) {
        return `M${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(a)}L${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(b)}`;
    }
    let result = "";
    for(let i = 2, max = len - 1; i < max; i++){
        a = points[i];
        b = points[i + 1];
        result += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(a, b);
    }
    if (closed) {
        return `M${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[0], points[1])}Q${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(points[1])}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[1], points[2])}T${result}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[len - 1], points[0])}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[0], points[1])}Z`;
    } else {
        return `M${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(points[0])}Q${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(points[1])}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[1], points[2])}${points.length > 3 ? "T" : ""}${result}L${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(points[len - 1])}`;
    }
}
;
 //# sourceMappingURL=getSvgPathFromPoints.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/normalizeWheel.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeWheel",
    ()=>normalizeWheel
]);
const MAX_ZOOM_STEP = 10;
const IS_DARWIN = /Mac|iPod|iPhone|iPad/.test(// eslint-disable-next-line @typescript-eslint/no-deprecated
typeof window === "undefined" ? "node" : window.navigator.platform);
function normalizeWheel(event) {
    let { deltaY, deltaX } = event;
    let deltaZ = 0;
    if (event.ctrlKey || event.altKey || event.metaKey) {
        deltaZ = (Math.abs(deltaY) > MAX_ZOOM_STEP ? MAX_ZOOM_STEP * Math.sign(deltaY) : deltaY) / 100;
    } else {
        if (event.shiftKey && !IS_DARWIN) {
            deltaX = deltaY;
            deltaY = 0;
        }
    }
    return {
        x: -deltaX,
        y: -deltaY,
        z: -deltaZ
    };
}
;
 //# sourceMappingURL=normalizeWheel.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/collaboratorState.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCollaboratorStateFromElapsedTime",
    ()=>getCollaboratorStateFromElapsedTime,
    "shouldShowCollaborator",
    ()=>shouldShowCollaborator
]);
function getCollaboratorStateFromElapsedTime(editor, elapsed) {
    return elapsed > editor.options.collaboratorInactiveTimeoutMs ? "inactive" : elapsed > editor.options.collaboratorIdleTimeoutMs ? "idle" : "active";
}
function shouldShowCollaborator(editor, presence, state) {
    const { followingUserId, highlightedUserIds } = editor.getInstanceState();
    switch(state){
        case "inactive":
            return followingUserId === presence.userId || highlightedUserIds.includes(presence.userId);
        case "idle":
            if (presence.followingUserId === editor.user.getId()) {
                return !!(presence.chatMessage || highlightedUserIds.includes(presence.userId));
            }
            return true;
        case "active":
            return true;
    }
}
;
 //# sourceMappingURL=collaboratorState.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/uniq.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uniq",
    ()=>uniq
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lodash$2e$uniq$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__uniq$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lodash.uniq/index.js [app-client] (ecmascript) <export default as uniq>");
;
function uniq(array) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lodash$2e$uniq$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__uniq$3e$__["uniq"])(array);
}
;
 //# sourceMappingURL=uniq.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/EditorAtom.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorAtom",
    ()=>EditorAtom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/Atom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$cache$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/cache.mjs [app-client] (ecmascript)");
;
;
class EditorAtom {
    constructor(name, getInitialState){
        this.name = name;
        this.getInitialState = getInitialState;
    }
    states = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$cache$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
    getAtom(editor) {
        return this.states.get(editor, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$Atom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atom"])(this.name, this.getInitialState(editor)));
    }
    get(editor) {
        return this.getAtom(editor).get();
    }
    update(editor, update) {
        return this.getAtom(editor).update(update);
    }
    set(editor, state) {
        return this.getAtom(editor).set(state);
    }
}
;
 //# sourceMappingURL=EditorAtom.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/reparenting.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDroppedShapesToNewParents",
    ()=>getDroppedShapesToNewParents,
    "kickoutOccludedShapes",
    ()=>kickoutOccludedShapes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/lib/helpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/array.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/reordering.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$intersect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/intersect.mjs [app-client] (ecmascript)");
;
;
;
function kickoutOccludedShapes(editor, shapeIds, opts) {
    const parentsToCheck = /* @__PURE__ */ new Set();
    for (const id of shapeIds){
        const shape = editor.getShape(id);
        if (!shape) continue;
        parentsToCheck.add(shape);
        const parent = editor.getShape(shape.parentId);
        if (!parent) continue;
        parentsToCheck.add(parent);
    }
    const parentsToLostChildren = /* @__PURE__ */ new Map();
    for (const parent of parentsToCheck){
        const childIds = editor.getSortedChildIdsForParent(parent);
        if (opts?.filter && !opts.filter(parent)) {
            parentsToLostChildren.set(parent, childIds);
        } else {
            const overlappingChildren = getOverlappingShapes(editor, parent.id, childIds);
            if (overlappingChildren.length < childIds.length) {
                parentsToLostChildren.set(parent, childIds.filter((id)=>!overlappingChildren.includes(id)));
            }
        }
    }
    const sortedShapeIds = editor.getCurrentPageShapesSorted().map((s)=>s.id);
    const parentsToNewChildren = {};
    for (const [prevParent, lostChildrenIds] of parentsToLostChildren){
        const lostChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(lostChildrenIds.map((id)=>editor.getShape(id)));
        const { reparenting, remainingShapesToReparent } = getDroppedShapesToNewParents(editor, lostChildren, (shape, maybeNewParent)=>{
            if (opts?.filter && !opts.filter(maybeNewParent)) return false;
            return maybeNewParent.id !== prevParent.id && sortedShapeIds.indexOf(maybeNewParent.id) < sortedShapeIds.indexOf(shape.id);
        });
        reparenting.forEach((childrenToReparent, newParentId)=>{
            if (childrenToReparent.length === 0) return;
            if (!parentsToNewChildren[newParentId]) {
                parentsToNewChildren[newParentId] = {
                    parentId: newParentId,
                    shapeIds: []
                };
            }
            parentsToNewChildren[newParentId].shapeIds.push(...childrenToReparent.map((s)=>s.id));
        });
        if (remainingShapesToReparent.size > 0) {
            const newParentId = editor.findShapeAncestor(prevParent, (s)=>editor.isShapeOfType(s, "group"))?.id ?? editor.getCurrentPageId();
            remainingShapesToReparent.forEach((shape)=>{
                if (!parentsToNewChildren[newParentId]) {
                    let insertIndexKey;
                    const oldParentSiblingIds = editor.getSortedChildIdsForParent(newParentId);
                    const oldParentIndex = oldParentSiblingIds.indexOf(prevParent.id);
                    if (oldParentIndex > -1) {
                        const siblingsIndexAbove = oldParentSiblingIds[oldParentIndex + 1];
                        const indexKeyAbove = siblingsIndexAbove ? editor.getShape(siblingsIndexAbove).index : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndexAbove"])(prevParent.index);
                        insertIndexKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$reordering$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndexBetween"])(prevParent.index, indexKeyAbove);
                    } else {}
                    parentsToNewChildren[newParentId] = {
                        parentId: newParentId,
                        shapeIds: [],
                        index: insertIndexKey
                    };
                }
                parentsToNewChildren[newParentId].shapeIds.push(shape.id);
            });
        }
    }
    editor.run(()=>{
        Object.values(parentsToNewChildren).forEach(({ parentId, shapeIds: shapeIds2, index })=>{
            if (shapeIds2.length === 0) return;
            shapeIds2.sort((a, b)=>sortedShapeIds.indexOf(a) < sortedShapeIds.indexOf(b) ? -1 : 1);
            editor.reparentShapes(shapeIds2, parentId, index);
        });
    });
}
function getOverlappingShapes(editor, shape, otherShapes) {
    if (otherShapes.length === 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
    }
    const parentPageBounds = editor.getShapePageBounds(shape);
    if (!parentPageBounds) return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
    const parentGeometry = editor.getShapeGeometry(shape);
    const parentPageTransform = editor.getShapePageTransform(shape);
    const parentPageCorners = parentPageTransform.applyToPoints(parentGeometry.vertices);
    const _shape = editor.getShape(shape);
    if (!_shape) return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
    const pageTransform = editor.getShapePageTransform(shape);
    const clipPath = editor.getShapeUtil(_shape.type).getClipPath?.(_shape);
    const parentPageMaskVertices = clipPath ? pageTransform.applyToPoints(clipPath) : void 0;
    const parentPagePolygon = parentPageMaskVertices ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$intersect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intersectPolygonPolygon"])(parentPageMaskVertices, parentPageCorners) : parentPageCorners;
    if (!parentPagePolygon) return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$lib$2f$helpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
    return otherShapes.filter((childId)=>{
        const shapePageBounds = editor.getShapePageBounds(childId);
        if (!shapePageBounds || !parentPageBounds.includes(shapePageBounds)) return false;
        const parentPolygonInShapeShape = editor.getShapePageTransform(childId).clone().invert().applyToPoints(parentPagePolygon);
        const geometry = editor.getShapeGeometry(childId);
        return geometry.overlapsPolygon(parentPolygonInShapeShape);
    });
}
function getDroppedShapesToNewParents(editor, shapes, cb) {
    const shapesToActuallyCheck = new Set(shapes);
    const movingGroups = /* @__PURE__ */ new Set();
    for (const shape of shapes){
        const parent = editor.getShapeParent(shape);
        if (parent && editor.isShapeOfType(parent, "group")) {
            if (!movingGroups.has(parent)) {
                movingGroups.add(parent);
            }
        }
    }
    for (const movingGroup of movingGroups){
        const children = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(editor.getSortedChildIdsForParent(movingGroup).map((id)=>editor.getShape(id)));
        for (const child of children){
            shapesToActuallyCheck.delete(child);
        }
        shapesToActuallyCheck.add(movingGroup);
    }
    const shapeGroupIds = /* @__PURE__ */ new Map();
    const reparenting = /* @__PURE__ */ new Map();
    const remainingShapesToReparent = new Set(shapesToActuallyCheck);
    const potentialParentShapes = editor.getCurrentPageShapesSorted().filter((s)=>editor.getShapeUtil(s).canReceiveNewChildrenOfType?.(s, s.type) && !remainingShapesToReparent.has(s));
    parentCheck: for(let i = potentialParentShapes.length - 1; i >= 0; i--){
        const parentShape = potentialParentShapes[i];
        const parentShapeContainingGroupId = editor.findShapeAncestor(parentShape, (s)=>editor.isShapeOfType(s, "group"))?.id;
        const parentGeometry = editor.getShapeGeometry(parentShape);
        const parentPageTransform = editor.getShapePageTransform(parentShape);
        const parentPageMaskVertices = editor.getShapeMask(parentShape);
        const parentPageCorners = parentPageTransform.applyToPoints(parentGeometry.vertices);
        const parentPagePolygon = parentPageMaskVertices ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$intersect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intersectPolygonPolygon"])(parentPageMaskVertices, parentPageCorners) : parentPageCorners;
        if (!parentPagePolygon) continue parentCheck;
        const childrenToReparent = [];
        shapeCheck: for (const shape of remainingShapesToReparent){
            if (parentShape.id === shape.id) continue shapeCheck;
            if (cb && !cb(shape, parentShape)) continue shapeCheck;
            if (!shapeGroupIds.has(shape.id)) {
                shapeGroupIds.set(shape.id, editor.findShapeAncestor(shape, (s)=>editor.isShapeOfType(s, "group"))?.id);
            }
            const shapeGroupId = shapeGroupIds.get(shape.id);
            if (shapeGroupId !== parentShapeContainingGroupId) continue shapeCheck;
            if (editor.findShapeAncestor(parentShape, (s)=>shape.id === s.id)) continue shapeCheck;
            const parentPolygonInShapeSpace = editor.getShapePageTransform(shape).clone().invert().applyToPoints(parentPagePolygon);
            if (editor.getShapeGeometry(shape).overlapsPolygon(parentPolygonInShapeSpace)) {
                if (!editor.getShapeUtil(parentShape).canReceiveNewChildrenOfType?.(parentShape, shape.type)) continue shapeCheck;
                if (shape.parentId !== parentShape.id) {
                    childrenToReparent.push(shape);
                }
                remainingShapesToReparent.delete(shape);
                continue shapeCheck;
            }
        }
        if (childrenToReparent.length) {
            reparenting.set(parentShape.id, childrenToReparent);
        }
    }
    return {
        // these are the shapes that will be reparented to new parents
        reparenting,
        // these are the shapes that will be reparented to the page or their ancestral group
        remainingShapesToReparent
    };
}
;
 //# sourceMappingURL=reparenting.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/richText.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFontsFromRichText",
    ()=>getFontsFromRichText,
    "getTipTapSchema",
    ()=>getTipTapSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tiptap/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tiptap$2f$pm$2f$dist$2f$model$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tiptap/pm/dist/model/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$prosemirror$2d$model$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/prosemirror-model/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/control.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$cache$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/cache.mjs [app-client] (ecmascript)");
;
;
;
const schemaCache = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$cache$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
function getTipTapSchema(tipTapConfig) {
    return schemaCache.get(tipTapConfig, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSchema"])(tipTapConfig.extensions ?? []));
}
function getFontsFromRichText(editor, richText, initialState) {
    const { tipTapConfig, addFontsFromNode } = editor.getTextOptions();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(tipTapConfig, "textOptions.tipTapConfig must be set to use rich text");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$control$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(addFontsFromNode, "textOptions.addFontsFromNode must be set to use rich text");
    const schema = getTipTapSchema(tipTapConfig);
    const rootNode = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$prosemirror$2d$model$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"].fromJSON(schema, richText);
    const fonts = /* @__PURE__ */ new Set();
    function addFont(font) {
        fonts.add(font);
    }
    function visit(node, state) {
        state = addFontsFromNode(node, state, addFont);
        for (const child of node.children){
            visit(child, state);
        }
    }
    visit(rootNode, initialState);
    return Array.from(fonts);
}
;
 //# sourceMappingURL=richText.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/sync/hardReset.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hardReset",
    ()=>hardReset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/lib/storage.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/idb/build/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$sync$2f$LocalIndexedDb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/sync/LocalIndexedDb.mjs [app-client] (ecmascript)");
;
;
;
async function hardReset({ shouldReload = true } = {}) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSessionStorage"])();
    for (const instance of __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$sync$2f$LocalIndexedDb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LocalIndexedDb"].connectedInstances){
        await instance.close();
    }
    await Promise.all((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$sync$2f$LocalIndexedDb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllIndexDbNames"])().map((db)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deleteDB"])(db)));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$lib$2f$storage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearLocalStorage"])();
    if (shouldReload) {
        window.location.reload();
    }
}
if (typeof window !== "undefined") {
    if ("TURBOPACK compile-time truthy", 1) {
        ;
        window.hardReset = hardReset;
    }
    ;
    window.__tldraw__hardReset = hardReset;
}
;
 //# sourceMappingURL=hardReset.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/window-open.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "openWindow",
    ()=>openWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$runtime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/runtime.mjs [app-client] (ecmascript)");
;
function openWindow(url, target = "_blank", allowReferrer) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$runtime$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"].openWindow(url, target, allowReferrer);
}
;
 //# sourceMappingURL=window-open.mjs.map
}),
]);

//# debugId=95bb9aa2-5020-57ff-3962-703478451873
//# sourceMappingURL=c427b_%40tldraw_editor_dist-esm_lib_utils_66b49c5a._.js.map