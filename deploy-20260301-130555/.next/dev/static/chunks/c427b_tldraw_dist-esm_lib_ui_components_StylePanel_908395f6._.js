;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="80e4359e-04fc-12d3-bcf3-35f041c4cde7")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StylePanelContextProvider",
    ()=>StylePanelContextProvider,
    "useStylePanelContext",
    ()=>useStylePanelContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$context$2f$events$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/context/events.mjs [app-client] (ecmascript)");
;
;
;
;
const StylePanelContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function StylePanelContextProvider({ children, styles }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const trackEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$context$2f$events$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUiEvents"])();
    const onHistoryMark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StylePanelContextProvider.useCallback[onHistoryMark]": (id)=>editor.markHistoryStoppingPoint(id)
    }["StylePanelContextProvider.useCallback[onHistoryMark]"], [
        editor
    ]);
    const enhancedA11yMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("enhancedA11yMode", {
        "StylePanelContextProvider.useValue[enhancedA11yMode]": ()=>editor.user.getEnhancedA11yMode()
    }["StylePanelContextProvider.useValue[enhancedA11yMode]"], [
        editor
    ]);
    const onValueChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StylePanelContextProvider.useCallback[onValueChange]": function(style, value) {
            editor.run({
                "StylePanelContextProvider.useCallback[onValueChange]": ()=>{
                    if (editor.isIn("select")) {
                        editor.setStyleForSelectedShapes(style, value);
                    }
                    editor.setStyleForNextShapes(style, value);
                    editor.updateInstanceState({
                        isChangingStyle: true
                    });
                }
            }["StylePanelContextProvider.useCallback[onValueChange]"]);
            trackEvent("set-style", {
                source: "style-panel",
                id: style.id,
                value
            });
        }
    }["StylePanelContextProvider.useCallback[onValueChange]"], [
        editor,
        trackEvent
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelContext.Provider, {
        value: {
            styles,
            enhancedA11yMode,
            onHistoryMark,
            onValueChange
        },
        children
    });
}
function useStylePanelContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StylePanelContext);
    if (!context) {
        throw new Error("useStylePanelContext must be used within a StylePanelContextProvider");
    }
    return context;
}
;
 //# sourceMappingURL=StylePanelContext.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelSubheading.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StylePanelSubheading",
    ()=>StylePanelSubheading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
function StylePanelSubheading({ children }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h3", {
        className: "tlui-style-panel__subheading",
        children
    });
}
;
 //# sourceMappingURL=StylePanelSubheading.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelButtonPicker.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StylePanelButtonPicker",
    ()=>StylePanelButtonPicker,
    "StylePanelButtonPickerInline",
    ()=>StylePanelButtonPickerInline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$context$2f$breakpoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/context/breakpoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/hooks/useTranslation/useTranslation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/Button/TldrawUiButtonIcon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/TldrawUiToolbar.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$layout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/layout.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelSubheading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelSubheading.mjs [app-client] (ecmascript)");
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
function StylePanelButtonPickerInner(props) {
    const { enhancedA11yMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            enhancedA11yMode && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelSubheading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelSubheading"], {
                children: props.title
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
                label: props.title,
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelButtonPickerInline, {
                    ...props
                })
            })
        ]
    });
}
function StylePanelButtonPickerInlineInner(props) {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const { uiType, items, title, style, value, onValueChange = ctx.onValueChange, onHistoryMark = ctx.onHistoryMark } = props;
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const breakpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$context$2f$breakpoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBreakpoint"])();
    const rPointing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const rPointingOriginalActiveElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { handleButtonClick, handleButtonPointerDown, handleButtonPointerEnter, handleButtonPointerUp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StylePanelButtonPickerInlineInner.useMemo": ()=>{
            const handlePointerUp = {
                "StylePanelButtonPickerInlineInner.useMemo.handlePointerUp": ()=>{
                    rPointing.current = false;
                    window.removeEventListener("pointerup", handlePointerUp);
                    const origActiveEl = rPointingOriginalActiveElement.current;
                    if (origActiveEl && ([
                        "TEXTAREA",
                        "INPUT"
                    ].includes(origActiveEl.nodeName) || origActiveEl.isContentEditable)) {
                        origActiveEl.focus();
                    } else if (breakpoint >= __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PORTRAIT_BREAKPOINT"].TABLET_SM) {
                        editor.getContainer().focus();
                    }
                    rPointingOriginalActiveElement.current = null;
                }
            }["StylePanelButtonPickerInlineInner.useMemo.handlePointerUp"];
            const handleButtonClick2 = {
                "StylePanelButtonPickerInlineInner.useMemo.handleButtonClick2": (e)=>{
                    const { id } = e.currentTarget.dataset;
                    if (value.type === "shared" && value.value === id) return;
                    onHistoryMark?.("point picker item");
                    onValueChange(style, id);
                }
            }["StylePanelButtonPickerInlineInner.useMemo.handleButtonClick2"];
            const handleButtonPointerDown2 = {
                "StylePanelButtonPickerInlineInner.useMemo.handleButtonPointerDown2": (e)=>{
                    const { id } = e.currentTarget.dataset;
                    onHistoryMark?.("point picker item");
                    onValueChange(style, id);
                    rPointing.current = true;
                    rPointingOriginalActiveElement.current = document.activeElement;
                    window.addEventListener("pointerup", handlePointerUp);
                }
            }["StylePanelButtonPickerInlineInner.useMemo.handleButtonPointerDown2"];
            const handleButtonPointerEnter2 = {
                "StylePanelButtonPickerInlineInner.useMemo.handleButtonPointerEnter2": (e)=>{
                    if (!rPointing.current) return;
                    const { id } = e.currentTarget.dataset;
                    onValueChange(style, id);
                }
            }["StylePanelButtonPickerInlineInner.useMemo.handleButtonPointerEnter2"];
            const handleButtonPointerUp2 = {
                "StylePanelButtonPickerInlineInner.useMemo.handleButtonPointerUp2": (e)=>{
                    const { id } = e.currentTarget.dataset;
                    if (value.type === "shared" && value.value === id) return;
                    onValueChange(style, id);
                }
            }["StylePanelButtonPickerInlineInner.useMemo.handleButtonPointerUp2"];
            return {
                handleButtonClick: handleButtonClick2,
                handleButtonPointerDown: handleButtonPointerDown2,
                handleButtonPointerEnter: handleButtonPointerEnter2,
                handleButtonPointerUp: handleButtonPointerUp2
            };
        }
    }["StylePanelButtonPickerInlineInner.useMemo"], [
        editor,
        breakpoint,
        value,
        onHistoryMark,
        onValueChange,
        style
    ]);
    const Layout = items.length > 4 ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$layout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiGrid"] : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$layout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiRow"];
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarToggleGroup"], {
        "data-testid": `style.${uiType}`,
        type: "single",
        value: value.type === "shared" ? value.value : null,
        asChild: true,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Layout, {
            children: items.map((item)=>{
                const isActive = value.type === "shared" && value.value === item.value;
                const label = title + " \u2014 " + msg(`${uiType}-style.${item.value}`);
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarToggleItem"], {
                    type: "icon",
                    "data-id": item.value,
                    "data-testid": `style.${uiType}.${item.value}`,
                    "aria-label": label + (isActive ? ` (${msg("style-panel.selected")})` : ""),
                    tooltip: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                children: label
                            }),
                            isActive ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                children: [
                                    "(",
                                    msg("style-panel.selected"),
                                    ")"
                                ]
                            }) : null
                        ]
                    }),
                    value: item.value,
                    "data-state": value.type === "shared" && value.value === item.value ? "on" : "off",
                    "data-isactive": isActive,
                    title: label,
                    style: style === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultColorStyle"] ? {
                        color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, item.value, "solid")
                    } : void 0,
                    onPointerEnter: handleButtonPointerEnter,
                    onPointerDown: handleButtonPointerDown,
                    onPointerUp: handleButtonPointerUp,
                    onClick: handleButtonClick,
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                        icon: item.icon
                    })
                }, item.value);
            })
        })
    });
}
const StylePanelButtonPicker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(StylePanelButtonPickerInner);
const StylePanelButtonPickerInline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(StylePanelButtonPickerInlineInner);
;
 //# sourceMappingURL=StylePanelButtonPicker.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelDoubleDropdownPicker.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StylePanelDoubleDropdownPicker",
    ()=>StylePanelDoubleDropdownPicker,
    "StylePanelDoubleDropdownPickerInline",
    ()=>StylePanelDoubleDropdownPickerInline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$menus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/globals/menus.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/hooks/useTranslation/useTranslation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/Button/TldrawUiButtonIcon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/TldrawUiPopover.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/TldrawUiToolbar.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$menus$2f$TldrawUiMenuContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/menus/TldrawUiMenuContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelContext.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
function StylePanelDoubleDropdownPickerInner(props) {
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: "tlui-style-panel__double-select-picker",
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                title: msg(props.label),
                className: "tlui-style-panel__double-select-picker-label",
                children: msg(props.label)
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
                orientation: "horizontal",
                label: msg(props.label),
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelDoubleDropdownPickerInline, {
                    ...props
                })
            })
        ]
    });
}
function StylePanelDoubleDropdownPickerInlineInner(props) {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const { uiTypeA, uiTypeB, labelA, labelB, itemsA, itemsB, styleA, styleB, valueA, valueB, onValueChange = ctx.onValueChange } = props;
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [isOpenA, setIsOpenA] = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [isOpenB, setIsOpenB] = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const iconA = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "StylePanelDoubleDropdownPickerInlineInner.useMemo[iconA]": ()=>itemsA.find({
                "StylePanelDoubleDropdownPickerInlineInner.useMemo[iconA]": (item)=>valueA.type === "shared" && valueA.value === item.value
            }["StylePanelDoubleDropdownPickerInlineInner.useMemo[iconA]"])?.icon ?? "mixed"
    }["StylePanelDoubleDropdownPickerInlineInner.useMemo[iconA]"], [
        itemsA,
        valueA
    ]);
    const iconB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "StylePanelDoubleDropdownPickerInlineInner.useMemo[iconB]": ()=>itemsB.find({
                "StylePanelDoubleDropdownPickerInlineInner.useMemo[iconB]": (item)=>valueB.type === "shared" && valueB.value === item.value
            }["StylePanelDoubleDropdownPickerInlineInner.useMemo[iconB]"])?.icon ?? "mixed"
    }["StylePanelDoubleDropdownPickerInlineInner.useMemo[iconB]"], [
        itemsB,
        valueB
    ]);
    if (valueA === void 0 && valueB === void 0) return null;
    const idA = `style panel ${uiTypeA} A`;
    const idB = `style panel ${uiTypeB} B`;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopover"], {
                id: idA,
                open: isOpenA,
                onOpenChange: setIsOpenA,
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopoverTrigger"], {
                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarButton"], {
                            type: "icon",
                            "data-testid": `style.${uiTypeA}`,
                            title: msg(labelA) + " \u2014 " + (valueA === null || valueA.type === "mixed" ? msg("style-panel.mixed") : msg(`${uiTypeA}-style.${valueA.value}`)),
                            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                                icon: iconA,
                                small: true,
                                invertIcon: true
                            })
                        })
                    }),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopoverContent"], {
                        side: "left",
                        align: "center",
                        sideOffset: 80,
                        alignOffset: 0,
                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
                            orientation: "grid",
                            label: msg(labelA),
                            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$menus$2f$TldrawUiMenuContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiMenuContextProvider"], {
                                type: "icons",
                                sourceId: "style-panel",
                                children: itemsA.map((item)=>{
                                    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarButton"], {
                                        "data-testid": `style.${uiTypeA}.${item.value}`,
                                        type: "icon",
                                        onClick: ()=>{
                                            onValueChange(styleA, item.value);
                                            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$menus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tlmenus"].deleteOpenMenu(idA, editor.contextId);
                                            setIsOpenA(false);
                                        },
                                        title: `${msg(labelA)} \u2014 ${msg(`${uiTypeA}-style.${item.value}`)}`,
                                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                                            icon: item.icon,
                                            invertIcon: true
                                        })
                                    }, item.value);
                                })
                            })
                        })
                    })
                ]
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopover"], {
                id: idB,
                open: isOpenB,
                onOpenChange: setIsOpenB,
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopoverTrigger"], {
                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarButton"], {
                            type: "icon",
                            "data-testid": `style.${uiTypeB}`,
                            title: msg(labelB) + " \u2014 " + (valueB === null || valueB.type === "mixed" ? msg("style-panel.mixed") : msg(`${uiTypeB}-style.${valueB.value}`)),
                            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                                icon: iconB,
                                small: true
                            })
                        })
                    }),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopoverContent"], {
                        side: "left",
                        align: "center",
                        sideOffset: 116,
                        alignOffset: 0,
                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
                            orientation: "grid",
                            label: msg(labelB),
                            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$menus$2f$TldrawUiMenuContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiMenuContextProvider"], {
                                type: "icons",
                                sourceId: "style-panel",
                                children: itemsB.map((item)=>{
                                    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarButton"], {
                                        type: "icon",
                                        title: `${msg(labelB)} \u2014 ${msg(`${uiTypeB}-style.${item.value}`)}`,
                                        "data-testid": `style.${uiTypeB}.${item.value}`,
                                        onClick: ()=>{
                                            onValueChange(styleB, item.value);
                                            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$menus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tlmenus"].deleteOpenMenu(idB, editor.contextId);
                                            setIsOpenB(false);
                                        },
                                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                                            icon: item.icon
                                        })
                                    }, item.value);
                                })
                            })
                        })
                    })
                ]
            })
        ]
    });
}
const StylePanelDoubleDropdownPicker = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](StylePanelDoubleDropdownPickerInner);
const StylePanelDoubleDropdownPickerInline = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](StylePanelDoubleDropdownPickerInlineInner);
;
 //# sourceMappingURL=StylePanelDoubleDropdownPicker.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelDropdownPicker.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StylePanelDropdownPicker",
    ()=>StylePanelDropdownPicker,
    "StylePanelDropdownPickerInline",
    ()=>StylePanelDropdownPickerInline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$menus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/globals/menus.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/hooks/useTranslation/useTranslation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/Button/TldrawUiButtonIcon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/Button/TldrawUiButtonLabel.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/TldrawUiPopover.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/TldrawUiToolbar.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$menus$2f$TldrawUiMenuContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/menus/TldrawUiMenuContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelContext.mjs [app-client] (ecmascript)");
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
function StylePanelDropdownPickerInner(props) {
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const toolbarLabel = props.label ? msg(props.label) : msg(`style-panel.${props.stylePanelType}`);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
        label: toolbarLabel,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelDropdownPickerInline, {
            ...props
        })
    });
}
function StylePanelDropdownPickerInlineInner(props) {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const { id, label, uiType, stylePanelType, style, items, type, value, onValueChange = ctx.onValueChange, testIdType = uiType } = props;
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const icon = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "StylePanelDropdownPickerInlineInner.useMemo[icon]": ()=>{
            if (value.type === "mixed") return "mixed";
            const match = items.find({
                "StylePanelDropdownPickerInlineInner.useMemo[icon]": (item)=>item.value === value.value
            }["StylePanelDropdownPickerInlineInner.useMemo[icon]"])?.icon;
            return match ?? items[0]?.icon;
        }
    }["StylePanelDropdownPickerInlineInner.useMemo[icon]"], [
        items,
        value
    ]);
    const stylePanelName = msg(`style-panel.${stylePanelType}`);
    const titleStr = value.type === "mixed" ? msg("style-panel.mixed") : stylePanelName + " \u2014 " + msg(`${uiType}-style.${value.value}`);
    const labelStr = label ? msg(label) : "";
    const popoverId = `style panel ${id}`;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopover"], {
        id: popoverId,
        open: isOpen,
        onOpenChange: setIsOpen,
        className: "tlui-style-panel__dropdown-picker",
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopoverTrigger"], {
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarButton"], {
                    type,
                    "data-testid": `style.${testIdType}`,
                    "data-direction": "left",
                    title: titleStr,
                    children: [
                        labelStr && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonLabel"], {
                            children: labelStr
                        }),
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                            icon
                        })
                    ]
                })
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiPopover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiPopoverContent"], {
                side: "left",
                align: "center",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
                    orientation: items.length > 4 ? "grid" : "horizontal",
                    label: labelStr,
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$menus$2f$TldrawUiMenuContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiMenuContextProvider"], {
                        type: "icons",
                        sourceId: "style-panel",
                        children: items.map((item)=>{
                            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarButton"], {
                                type: "icon",
                                "data-testid": `style.${testIdType}.${item.value}`,
                                title: stylePanelName + " \u2014 " + msg(`${uiType}-style.${item.value}`),
                                isActive: icon === item.icon,
                                onClick: ()=>{
                                    ctx.onHistoryMark("select style dropdown item");
                                    onValueChange(style, item.value);
                                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$menus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tlmenus"].deleteOpenMenu(popoverId, editor.contextId);
                                    setIsOpen(false);
                                },
                                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                                    icon: item.icon
                                })
                            }, item.value);
                        })
                    })
                })
            })
        ]
    });
}
const StylePanelDropdownPicker = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](StylePanelDropdownPickerInner);
const StylePanelDropdownPickerInline = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](StylePanelDropdownPickerInlineInner);
;
 //# sourceMappingURL=StylePanelDropdownPicker.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/DefaultStylePanelContent.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultStylePanelContent",
    ()=>DefaultStylePanelContent,
    "StylePanelArrowKindPicker",
    ()=>StylePanelArrowKindPicker,
    "StylePanelArrowheadPicker",
    ()=>StylePanelArrowheadPicker,
    "StylePanelColorPicker",
    ()=>StylePanelColorPicker,
    "StylePanelDashPicker",
    ()=>StylePanelDashPicker,
    "StylePanelFillPicker",
    ()=>StylePanelFillPicker,
    "StylePanelFontPicker",
    ()=>StylePanelFontPicker,
    "StylePanelGeoShapePicker",
    ()=>StylePanelGeoShapePicker,
    "StylePanelLabelAlignPicker",
    ()=>StylePanelLabelAlignPicker,
    "StylePanelOpacityPicker",
    ()=>StylePanelOpacityPicker,
    "StylePanelSection",
    ()=>StylePanelSection,
    "StylePanelSizePicker",
    ()=>StylePanelSizePicker,
    "StylePanelSplinePicker",
    ()=>StylePanelSplinePicker,
    "StylePanelTextAlignPicker",
    ()=>StylePanelTextAlignPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$reparenting$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/reparenting.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/styles.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$context$2f$events$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/context/events.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/hooks/useTranslation/useTranslation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/Button/TldrawUiButtonIcon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiSlider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/TldrawUiSlider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/primitives/TldrawUiToolbar.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelButtonPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelButtonPicker.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelDoubleDropdownPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelDoubleDropdownPicker.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelDropdownPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelDropdownPicker.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelSubheading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelSubheading.mjs [app-client] (ecmascript)");
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
function DefaultStylePanelContent() {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(StylePanelSection, {
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelColorPicker, {}),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelOpacityPicker, {})
                ]
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(StylePanelSection, {
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelFillPicker, {}),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelDashPicker, {}),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelSizePicker, {})
                ]
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(StylePanelSection, {
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelFontPicker, {}),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelTextAlignPicker, {}),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelLabelAlignPicker, {})
                ]
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(StylePanelSection, {
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelGeoShapePicker, {}),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelArrowKindPicker, {}),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelArrowheadPicker, {}),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(StylePanelSplinePicker, {})
                ]
            })
        ]
    });
}
function StylePanelSection({ children }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: "tlui-style-panel__section",
        children
    });
}
function StylePanelColorPicker() {
    const { styles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const color = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultColorStyle"]);
    if (color === void 0) return null;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelButtonPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelButtonPicker"], {
        title: msg("style-panel.color"),
        uiType: "color",
        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultColorStyle"],
        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].color,
        value: color
    });
}
const tldrawSupportedOpacities = [
    0.1,
    0.25,
    0.5,
    0.75,
    1
];
function StylePanelOpacityPicker() {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const { onHistoryMark, enhancedA11yMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("opacity", {
        "StylePanelOpacityPicker.useValue[opacity]": ()=>editor.getSharedOpacity()
    }["StylePanelOpacityPicker.useValue[opacity]"], [
        editor
    ]);
    const trackEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$context$2f$events$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUiEvents"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const handleOpacityValueChange = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "StylePanelOpacityPicker.useCallback[handleOpacityValueChange]": (value)=>{
            const item = tldrawSupportedOpacities[value];
            editor.run({
                "StylePanelOpacityPicker.useCallback[handleOpacityValueChange]": ()=>{
                    if (editor.isIn("select")) {
                        editor.setOpacityForSelectedShapes(item);
                    }
                    editor.setOpacityForNextShapes(item);
                    editor.updateInstanceState({
                        isChangingStyle: true
                    });
                }
            }["StylePanelOpacityPicker.useCallback[handleOpacityValueChange]"]);
            trackEvent("set-style", {
                source: "style-panel",
                id: "opacity",
                value
            });
        }
    }["StylePanelOpacityPicker.useCallback[handleOpacityValueChange]"], [
        editor,
        trackEvent
    ]);
    if (opacity === void 0) return null;
    const opacityIndex = opacity.type === "mixed" ? -1 : tldrawSupportedOpacities.indexOf((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minBy"])(tldrawSupportedOpacities, (supportedOpacity)=>Math.abs(supportedOpacity - opacity.value)));
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            enhancedA11yMode && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelSubheading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelSubheading"], {
                children: msg("style-panel.opacity")
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiSlider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiSlider"], {
                "data-testid": "style.opacity",
                value: opacityIndex >= 0 ? opacityIndex : tldrawSupportedOpacities.length - 1,
                label: opacity.type === "mixed" ? "style-panel.mixed" : `opacity-style.${opacity.value}`,
                onValueChange: handleOpacityValueChange,
                steps: tldrawSupportedOpacities.length - 1,
                title: msg("style-panel.opacity"),
                onHistoryMark,
                ariaValueModifier: 25
            })
        ]
    });
}
function StylePanelFillPicker() {
    const { styles, enhancedA11yMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const fill = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultFillStyle"]);
    if (fill === void 0) return null;
    const title = msg("style-panel.fill");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            enhancedA11yMode && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelSubheading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelSubheading"], {
                children: title
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
                orientation: "horizontal",
                label: title,
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelButtonPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelButtonPickerInline"], {
                        title,
                        uiType: "fill",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultFillStyle"],
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].fill,
                        value: fill
                    }),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelDropdownPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelDropdownPickerInline"], {
                        type: "icon",
                        id: "fill-extra",
                        uiType: "fill",
                        testIdType: "fill-extra",
                        stylePanelType: "fill",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultFillStyle"],
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].fillExtra,
                        value: fill
                    })
                ]
            })
        ]
    });
}
function StylePanelDashPicker() {
    const { styles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const dash = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultDashStyle"]);
    if (dash === void 0) return null;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelButtonPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelButtonPicker"], {
        title: msg("style-panel.dash"),
        uiType: "dash",
        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultDashStyle"],
        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].dash,
        value: dash
    });
}
function StylePanelSizePicker() {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const { styles, onValueChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const size = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultSizeStyle"]);
    if (size === void 0) return null;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelButtonPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelButtonPicker"], {
        title: msg("style-panel.size"),
        uiType: "size",
        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultSizeStyle"],
        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].size,
        value: size,
        onValueChange: (style, value)=>{
            onValueChange(style, value);
            const selectedShapeIds = editor.getSelectedShapeIds();
            if (selectedShapeIds.length > 0) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$reparenting$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kickoutOccludedShapes"])(editor, selectedShapeIds);
            }
        }
    });
}
function StylePanelFontPicker() {
    const { styles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const font = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultFontStyle"]);
    if (font === void 0) return null;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelButtonPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelButtonPicker"], {
        title: msg("style-panel.font"),
        uiType: "font",
        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultFontStyle"],
        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].font,
        value: font
    });
}
function StylePanelTextAlignPicker() {
    const { styles, enhancedA11yMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const textAlign = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultTextAlignStyle"]);
    if (textAlign === void 0) return null;
    const title = msg("style-panel.align");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            enhancedA11yMode && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelSubheading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelSubheading"], {
                children: title
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
                orientation: "horizontal",
                label: title,
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelButtonPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelButtonPickerInline"], {
                        title,
                        uiType: "align",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultTextAlignStyle"],
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].textAlign,
                        value: textAlign
                    }),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarButton"], {
                        type: "icon",
                        title: msg("style-panel.vertical-align"),
                        "data-testid": "vertical-align",
                        disabled: true,
                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                            icon: "vertical-align-middle"
                        })
                    })
                ]
            })
        ]
    });
}
function StylePanelLabelAlignPicker() {
    const { styles, enhancedA11yMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const labelAlign = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultHorizontalAlignStyle"]);
    const verticalLabelAlign = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultVerticalAlignStyle"]);
    if (labelAlign === void 0) return null;
    const title = msg("style-panel.label-align");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            enhancedA11yMode && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelSubheading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelSubheading"], {
                children: title
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbar"], {
                orientation: "horizontal",
                label: title,
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelButtonPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelButtonPickerInline"], {
                        title,
                        uiType: "align",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultHorizontalAlignStyle"],
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].horizontalAlign,
                        value: labelAlign
                    }),
                    verticalLabelAlign === void 0 ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$TldrawUiToolbar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiToolbarButton"], {
                        type: "icon",
                        title: msg("style-panel.vertical-align"),
                        "data-testid": "vertical-align",
                        disabled: true,
                        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$primitives$2f$Button$2f$TldrawUiButtonIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TldrawUiButtonIcon"], {
                            icon: "vertical-align-middle"
                        })
                    }) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelDropdownPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelDropdownPickerInline"], {
                        type: "icon",
                        id: "geo-vertical-alignment",
                        uiType: "verticalAlign",
                        stylePanelType: "vertical-align",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultVerticalAlignStyle"],
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].verticalAlign,
                        value: verticalLabelAlign
                    })
                ]
            })
        ]
    });
}
function StylePanelGeoShapePicker() {
    const { styles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const geo = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoShapeGeoStyle"]);
    if (geo === void 0) return null;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelDropdownPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelDropdownPicker"], {
        label: "style-panel.geo",
        type: "menu",
        id: "geo",
        uiType: "geo",
        stylePanelType: "geo",
        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoShapeGeoStyle"],
        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].geo,
        value: geo
    });
}
function StylePanelArrowKindPicker() {
    const { styles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const arrowKind = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowShapeKindStyle"]);
    if (arrowKind === void 0) return null;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelDropdownPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelDropdownPicker"], {
        id: "arrow-kind",
        type: "menu",
        label: "style-panel.arrow-kind",
        uiType: "arrow-kind",
        stylePanelType: "arrow-kind",
        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowShapeKindStyle"],
        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].arrowKind,
        value: arrowKind
    });
}
function StylePanelArrowheadPicker() {
    const { styles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const arrowheadEnd = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowShapeArrowheadEndStyle"]);
    const arrowheadStart = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowShapeArrowheadStartStyle"]);
    if (arrowheadEnd === void 0 || arrowheadStart === void 0) return null;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelDoubleDropdownPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelDoubleDropdownPicker"], {
        label: "style-panel.arrowheads",
        uiTypeA: "arrowheadStart",
        styleA: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowShapeArrowheadStartStyle"],
        itemsA: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].arrowheadStart,
        valueA: arrowheadStart,
        uiTypeB: "arrowheadEnd",
        styleB: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowShapeArrowheadEndStyle"],
        itemsB: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].arrowheadEnd,
        valueB: arrowheadEnd,
        labelA: "style-panel.arrowhead-start",
        labelB: "style-panel.arrowhead-end"
    });
}
function StylePanelSplinePicker() {
    const { styles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStylePanelContext"])();
    const spline = styles.get(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineShapeSplineStyle"]);
    if (spline === void 0) return null;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelDropdownPicker$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelDropdownPicker"], {
        type: "menu",
        id: "spline",
        uiType: "spline",
        stylePanelType: "spline",
        label: "style-panel.spline",
        style: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineShapeSplineStyle"],
        items: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].spline,
        value: spline
    });
}
;
 //# sourceMappingURL=DefaultStylePanelContent.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/DefaultStylePanel.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultStylePanel",
    ()=>DefaultStylePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$usePassThroughWheelEvents$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/usePassThroughWheelEvents.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useRelevantStyles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/hooks/useRelevantStyles.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$DefaultStylePanelContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/DefaultStylePanelContent.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/components/StylePanel/StylePanelContext.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const DefaultStylePanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function DefaultStylePanel2({ isMobile, styles, children }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const enhancedA11yMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("enhancedA11yMode", {
        "DefaultStylePanel.DefaultStylePanel2.useValue[enhancedA11yMode]": ()=>editor.user.getEnhancedA11yMode()
    }["DefaultStylePanel.DefaultStylePanel2.useValue[enhancedA11yMode]"], [
        editor
    ]);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$usePassThroughWheelEvents$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePassThroughWheelEvents"])(ref);
    const handlePointerOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DefaultStylePanel.DefaultStylePanel2.useCallback[handlePointerOut]": ()=>{
            if (!isMobile) {
                editor.updateInstanceState({
                    isChangingStyle: false
                });
            }
        }
    }["DefaultStylePanel.DefaultStylePanel2.useCallback[handlePointerOut]"], [
        editor,
        isMobile
    ]);
    const defaultStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useRelevantStyles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRelevantStyles"])();
    if (styles === void 0) {
        styles = defaultStyles;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DefaultStylePanel.DefaultStylePanel2.useEffect": ()=>{
            function handleKeyDown(event) {
                if (event.key === "Escape" && ref.current?.contains(document.activeElement)) {
                    event.stopPropagation();
                    editor.getContainer().focus();
                }
            }
            const stylePanelContainerEl = ref.current;
            stylePanelContainerEl?.addEventListener("keydown", handleKeyDown, {
                capture: true
            });
            return ({
                "DefaultStylePanel.DefaultStylePanel2.useEffect": ()=>{
                    stylePanelContainerEl?.removeEventListener("keydown", handleKeyDown, {
                        capture: true
                    });
                }
            })["DefaultStylePanel.DefaultStylePanel2.useEffect"];
        }
    }["DefaultStylePanel.DefaultStylePanel2.useEffect"], [
        editor
    ]);
    return styles && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref,
        "data-testid": "style.panel",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tlui-style-panel", {
            "tlui-style-panel__wrapper": !isMobile
        }),
        "data-ismobile": isMobile,
        "data-enhanced-a11y-mode": enhancedA11yMode,
        onPointerLeave: handlePointerOut,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$StylePanelContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StylePanelContextProvider"], {
            styles,
            children: children ?? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$components$2f$StylePanel$2f$DefaultStylePanelContent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultStylePanelContent"], {})
        })
    });
});
;
 //# sourceMappingURL=DefaultStylePanel.mjs.map
}),
]);

//# debugId=80e4359e-04fc-12d3-bcf3-35f041c4cde7
//# sourceMappingURL=c427b_tldraw_dist-esm_lib_ui_components_StylePanel_908395f6._.js.map