;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="f46f7047-393a-e8cc-1ff0-56fe8faa6337")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TutorWhiteboardManager",
    ()=>TutorWhiteboardManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/undo.js [app-client] (ecmascript) <export default as Undo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/pin.js [app-client] (ecmascript) <export default as Pin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PinOff$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/pin-off.js [app-client] (ecmascript) <export default as PinOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/clock-3.js [app-client] (ecmascript) <export default as Clock3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3X3$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid3X3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/ban.js [app-client] (ecmascript) <export default as Ban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusCircle$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/circle-minus.js [app-client] (ecmascript) <export default as MinusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rectangle$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RectangleHorizontal$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/rectangle-horizontal.js [app-client] (ecmascript) <export default as RectangleHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/triangle.js [app-client] (ecmascript) <export default as Triangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-client] (ecmascript) <export default as PenLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$highlighter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Highlighter$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/highlighter.js [app-client] (ecmascript) <export default as Highlighter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dot$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/dot.js [app-client] (ecmascript) <export default as Dot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Move$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/move.js [app-client] (ecmascript) <export default as Move>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/file-up.js [app-client] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-client] (ecmascript) <export default as WandSparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bring$2d$to$2d$front$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BringToFront$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/bring-to-front.js [app-client] (ecmascript) <export default as BringToFront>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$to$2d$back$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SendToBack$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/send-to-back.js [app-client] (ecmascript) <export default as SendToBack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$group$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Group$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/group.js [app-client] (ecmascript) <export default as Group>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ungroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ungroup$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/ungroup.js [app-client] (ecmascript) <export default as Ungroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/text-align-start.js [app-client] (ecmascript) <export default as AlignLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/text-align-center.js [app-client] (ecmascript) <export default as AlignCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/text-align-end.js [app-client] (ecmascript) <export default as AlignRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$live$2d$class$2d$whiteboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-live-class-whiteboard.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f5b$locale$5d2f$tutor$2f$live$2d$class$2f$components$2f$CourseStructureLinkPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/CourseStructureLinkPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$pdf$2d$tutoring$2f$PDFTutoringWorkbench$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
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
const COLORS = [
    '#111827',
    '#2563EB',
    '#7C3AED',
    '#059669',
    '#DC2626',
    '#EA580C',
    '#0891B2',
    '#CA8A04',
    '#6B7280'
];
const TOOL_PRESET = {
    pencil: {
        width: 2,
        opacity: 0.82,
        strokeType: 'pencil'
    },
    pen: {
        width: 3,
        opacity: 1,
        strokeType: 'pen'
    },
    marker: {
        width: 6,
        opacity: 0.9,
        strokeType: 'marker'
    },
    highlighter: {
        width: 16,
        opacity: 0.22,
        strokeType: 'highlighter'
    },
    calligraphy: {
        width: 5,
        opacity: 0.95,
        strokeType: 'calligraphy'
    },
    eraser: {
        width: 24,
        opacity: 1,
        strokeType: 'eraser'
    },
    line: {
        width: 3,
        opacity: 1,
        strokeType: 'shape'
    },
    arrow: {
        width: 3,
        opacity: 1,
        strokeType: 'shape'
    },
    rectangle: {
        width: 3,
        opacity: 1,
        strokeType: 'shape'
    },
    circle: {
        width: 3,
        opacity: 1,
        strokeType: 'shape'
    },
    triangle: {
        width: 3,
        opacity: 1,
        strokeType: 'shape'
    },
    connector: {
        width: 3,
        opacity: 1,
        strokeType: 'shape'
    },
    text: {
        width: 3,
        opacity: 1,
        strokeType: 'text'
    },
    laser: {
        width: 3,
        opacity: 1,
        strokeType: 'pen'
    },
    hand: {
        width: 3,
        opacity: 1,
        strokeType: 'pen'
    },
    select: {
        width: 3,
        opacity: 1,
        strokeType: 'pen'
    }
};
const DEFAULT_PAGE_ID = 'page-1';
function TutorWhiteboardManager({ roomId, sessionId, initialCourseId, classSubject, students, onDocumentVisibleToStudents }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const boardViewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pen');
    const [color, setColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#111827');
    const [customColor, setCustomColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#111827');
    const [brushSize, setBrushSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentStroke, setCurrentStroke] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [shapeStart, setShapeStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [shapePreview, setShapePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [laserPoint, setLaserPoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [textDraft, setTextDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(22);
    const [viewport, setViewport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        scale: 1,
        offsetX: 0,
        offsetY: 0
    });
    const [isPanning, setIsPanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const panStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectionRect, setSelectionRect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedStrokeIds, setSelectedStrokeIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [selectionMode, setSelectionMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('rect');
    const [selectionHitMode, setSelectionHitMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('intersect');
    const [lassoPath, setLassoPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDraggingSelection, setIsDraggingSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTransformHandle, setActiveTransformHandle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const transformRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isRotatingSelection, setIsRotatingSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const rotateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [connectorDrag, setConnectorDrag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const dragStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectionSnapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const [snapEnabled, setSnapEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [gridVisible, setGridVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [gridSize, setGridSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [checkpointName, setCheckpointName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [namedCheckpoints, setNamedCheckpoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [importedAsset, setImportedAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [textPreset, setTextPreset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('plain');
    const [textStyle, setTextStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        bold: false,
        italic: false,
        align: 'left'
    });
    const [pdfPage, setPdfPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showMiniMap, setShowMiniMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showPerfHud, setShowPerfHud] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fps, setFps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [branchNameInput, setBranchNameInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [auditTrail, setAuditTrail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [srAnnouncement, setSrAnnouncement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('my-board');
    const [submissionFilter, setSubmissionFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [reviewStudentId, setReviewStudentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isReviewPanelOpen, setIsReviewPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timelinePreviewIndex, setTimelinePreviewIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showHighContrast, setShowHighContrast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pages, setPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: DEFAULT_PAGE_ID,
            label: 'Page 1'
        }
    ]);
    const [activePageId, setActivePageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PAGE_ID);
    const { myStrokes, studentWhiteboards, isBroadcasting, isConnected, viewingStudentId, activeStudentBoards, remoteCursors, remoteSelections, startBroadcast, stopBroadcast, viewStudentWhiteboard, stopViewingStudent, isLayerLocked, submissions, toggleLayerLock, markSubmissionReviewed, markAllSubmissionsReviewed, pinSubmission, clearMyWhiteboard, replaceMyStrokes, undoLastStroke, updateCursor, updateSelectionPresence, addTutorStroke, layerConfig, activeLayerId, setLayerConfig, setActiveLayerId, setLayerLock, moderationState, setDrawMuteForStudent, updateStrokeRateLimit, assignmentOverlay, setAssignmentOverlayMode, spotlight, updateSpotlight, requestAIRegionHint, aiRegionHints, snapshots, availableBranches, requestSnapshotTimeline, promoteBreakoutBoard, exportAndAttachBoard, createBoardBranch, switchBoardBranch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$live$2d$class$2d$whiteboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveClassWhiteboard"])(roomId, sessionId, 'tutor');
    const submissionByStudentId = new Map(submissions.map((submission)=>[
            submission.studentId,
            submission
        ]));
    const pendingSubmissions = submissions.filter((submission)=>!submission.reviewed);
    const reviewSubmission = reviewStudentId ? submissionByStudentId.get(reviewStudentId) : undefined;
    const reviewStudent = reviewStudentId ? students.find((student)=>student.id === reviewStudentId) : undefined;
    const reviewStudentBoard = reviewStudentId ? studentWhiteboards.get(reviewStudentId) : undefined;
    const visibleStudents = students.filter((student)=>{
        const submission = submissionByStudentId.get(student.id);
        if (submissionFilter === 'all') return true;
        if (submissionFilter === 'submitted') return Boolean(submission);
        if (submissionFilter === 'pending') return Boolean(submission && !submission.reviewed);
        return Boolean(submission && submission.reviewed);
    });
    const timelineSource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TutorWhiteboardManager.useMemo[timelineSource]": ()=>timelinePreviewIndex !== null ? snapshots[timelinePreviewIndex]?.strokes || [] : myStrokes
    }["TutorWhiteboardManager.useMemo[timelineSource]"], [
        timelinePreviewIndex,
        snapshots,
        myStrokes
    ]);
    const activePageStrokes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TutorWhiteboardManager.useMemo[activePageStrokes]": ()=>timelineSource.filter({
                "TutorWhiteboardManager.useMemo[activePageStrokes]": (stroke)=>(stroke.pageId || DEFAULT_PAGE_ID) === activePageId
            }["TutorWhiteboardManager.useMemo[activePageStrokes]"])
    }["TutorWhiteboardManager.useMemo[activePageStrokes]"], [
        timelineSource,
        activePageId
    ]);
    const activePageIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TutorWhiteboardManager.useMemo[activePageIndex]": ()=>pages.findIndex({
                "TutorWhiteboardManager.useMemo[activePageIndex]": (page)=>page.id === activePageId
            }["TutorWhiteboardManager.useMemo[activePageIndex]"])
    }["TutorWhiteboardManager.useMemo[activePageIndex]"], [
        pages,
        activePageId
    ]);
    const openReviewPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[openReviewPanel]": (studentId)=>{
            setReviewStudentId(studentId);
            setIsReviewPanelOpen(true);
            viewStudentWhiteboard(studentId);
        }
    }["TutorWhiteboardManager.useCallback[openReviewPanel]"], [
        viewStudentWhiteboard
    ]);
    const reviewNextPending = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[reviewNextPending]": ()=>{
            if (!reviewStudentId) return;
            const currentIndex = pendingSubmissions.findIndex({
                "TutorWhiteboardManager.useCallback[reviewNextPending].currentIndex": (submission)=>submission.studentId === reviewStudentId
            }["TutorWhiteboardManager.useCallback[reviewNextPending].currentIndex"]);
            const nextSubmission = pendingSubmissions[currentIndex + 1] || pendingSubmissions[0];
            if (nextSubmission) {
                setReviewStudentId(nextSubmission.studentId);
                viewStudentWhiteboard(nextSubmission.studentId);
            }
        }
    }["TutorWhiteboardManager.useCallback[reviewNextPending]"], [
        pendingSubmissions,
        reviewStudentId,
        viewStudentWhiteboard
    ]);
    const reviewPreviousPending = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[reviewPreviousPending]": ()=>{
            if (!reviewStudentId || pendingSubmissions.length === 0) return;
            const currentIndex = pendingSubmissions.findIndex({
                "TutorWhiteboardManager.useCallback[reviewPreviousPending].currentIndex": (submission)=>submission.studentId === reviewStudentId
            }["TutorWhiteboardManager.useCallback[reviewPreviousPending].currentIndex"]);
            const previousSubmission = currentIndex > 0 ? pendingSubmissions[currentIndex - 1] : pendingSubmissions[pendingSubmissions.length - 1];
            if (previousSubmission) {
                setReviewStudentId(previousSubmission.studentId);
                viewStudentWhiteboard(previousSubmission.studentId);
            }
        }
    }["TutorWhiteboardManager.useCallback[reviewPreviousPending]"], [
        pendingSubmissions,
        reviewStudentId,
        viewStudentWhiteboard
    ]);
    // Keyboard shortcuts for fast review workflow while panel is open.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            if (!isReviewPanelOpen) return;
            const handleKeyDown = {
                "TutorWhiteboardManager.useEffect.handleKeyDown": (event)=>{
                    if (event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA') {
                        return;
                    }
                    if (event.key.toLowerCase() === 'r' && reviewSubmission && !reviewSubmission.reviewed) {
                        event.preventDefault();
                        markSubmissionReviewed(reviewSubmission.studentId);
                    }
                    if (event.key.toLowerCase() === 'j') {
                        event.preventDefault();
                        reviewNextPending();
                    }
                    if (event.key.toLowerCase() === 'k') {
                        event.preventDefault();
                        reviewPreviousPending();
                    }
                }
            }["TutorWhiteboardManager.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "TutorWhiteboardManager.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["TutorWhiteboardManager.useEffect"];
        }
    }["TutorWhiteboardManager.useEffect"], [
        isReviewPanelOpen,
        markSubmissionReviewed,
        reviewNextPending,
        reviewPreviousPending,
        reviewSubmission
    ]);
    const shapeTools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TutorWhiteboardManager.useMemo[shapeTools]": ()=>new Set([
                'line',
                'arrow',
                'rectangle',
                'circle',
                'triangle',
                'connector'
            ])
    }["TutorWhiteboardManager.useMemo[shapeTools]"], []);
    const freeDrawTools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TutorWhiteboardManager.useMemo[freeDrawTools]": ()=>new Set([
                'pencil',
                'pen',
                'marker',
                'highlighter',
                'calligraphy',
                'eraser'
            ])
    }["TutorWhiteboardManager.useMemo[freeDrawTools]"], []);
    const drawShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[drawShape]": (ctx, shapeType, from, to, stroke)=>{
            const x = Math.min(from.x, to.x);
            const y = Math.min(from.y, to.y);
            const width = Math.abs(to.x - from.x);
            const height = Math.abs(to.y - from.y);
            ctx.save();
            ctx.globalAlpha = stroke.opacity ?? 1;
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            if (shapeType === 'line' || shapeType === 'arrow' || shapeType === 'connector') {
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
                if (shapeType === 'connector') {
                    ctx.beginPath();
                    ctx.arc(from.x, from.y, Math.max(3, stroke.width), 0, Math.PI * 2);
                    ctx.arc(to.x, to.y, Math.max(3, stroke.width), 0, Math.PI * 2);
                    ctx.fillStyle = stroke.color;
                    ctx.fill();
                }
                if (shapeType === 'arrow') {
                    const angle = Math.atan2(to.y - from.y, to.x - from.x);
                    const size = Math.max(10, stroke.width * 4);
                    ctx.beginPath();
                    ctx.moveTo(to.x, to.y);
                    ctx.lineTo(to.x - size * Math.cos(angle - Math.PI / 6), to.y - size * Math.sin(angle - Math.PI / 6));
                    ctx.lineTo(to.x - size * Math.cos(angle + Math.PI / 6), to.y - size * Math.sin(angle + Math.PI / 6));
                    ctx.closePath();
                    ctx.fillStyle = stroke.color;
                    ctx.fill();
                }
            } else if (shapeType === 'rectangle') {
                ctx.strokeRect(x, y, width, height);
            } else if (shapeType === 'circle') {
                ctx.beginPath();
                ctx.ellipse(x + width / 2, y + height / 2, Math.max(2, width / 2), Math.max(2, height / 2), 0, 0, Math.PI * 2);
                ctx.stroke();
            } else if (shapeType === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(x + width / 2, y);
                ctx.lineTo(x + width, y + height);
                ctx.lineTo(x, y + height);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.restore();
        }
    }["TutorWhiteboardManager.useCallback[drawShape]"], []);
    const drawStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[drawStroke]": (ctx, stroke)=>{
            if (stroke.type === 'text') {
                const anchor = stroke.points[0];
                if (!anchor || !stroke.text) return;
                ctx.save();
                ctx.fillStyle = stroke.color;
                ctx.globalAlpha = stroke.opacity ?? 1;
                const textWeight = stroke.textStyle?.bold ? '700' : '400';
                const textItalic = stroke.textStyle?.italic ? 'italic' : 'normal';
                ctx.font = `${textItalic} ${textWeight} ${stroke.fontSize || fontSize}px ${stroke.fontFamily || 'ui-sans-serif, system-ui, sans-serif'}`;
                ctx.textBaseline = 'top';
                ctx.textAlign = stroke.textStyle?.align || 'left';
                ctx.fillText(stroke.text, anchor.x, anchor.y);
                ctx.restore();
                return;
            }
            if (stroke.type === 'shape' && stroke.shapeType && stroke.points.length >= 2) {
                if (stroke.shapeType === 'connector') {
                    ctx.save();
                    ctx.globalAlpha = stroke.opacity ?? 1;
                    ctx.strokeStyle = stroke.color;
                    ctx.lineWidth = stroke.width;
                    ctx.lineJoin = 'round';
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    stroke.points.forEach({
                        "TutorWhiteboardManager.useCallback[drawStroke]": (point, index)=>{
                            if (index === 0) ctx.moveTo(point.x, point.y);
                            else ctx.lineTo(point.x, point.y);
                        }
                    }["TutorWhiteboardManager.useCallback[drawStroke]"]);
                    ctx.stroke();
                    const first = stroke.points[0];
                    const last = stroke.points[stroke.points.length - 1];
                    ctx.beginPath();
                    ctx.arc(first.x, first.y, Math.max(3, stroke.width), 0, Math.PI * 2);
                    ctx.arc(last.x, last.y, Math.max(3, stroke.width), 0, Math.PI * 2);
                    ctx.fillStyle = stroke.color;
                    ctx.fill();
                    ctx.restore();
                    return;
                }
                drawShape(ctx, stroke.shapeType, stroke.points[0], stroke.points[stroke.points.length - 1], stroke);
                return;
            }
            if (stroke.points.length < 2) return;
            ctx.save();
            ctx.globalAlpha = stroke.opacity ?? 1;
            ctx.strokeStyle = stroke.color;
            ctx.lineCap = stroke.type === 'calligraphy' ? 'square' : 'round';
            ctx.lineJoin = 'round';
            for(let i = 1; i < stroke.points.length; i += 1){
                const prev = stroke.points[i - 1];
                const point = stroke.points[i];
                const pressure = typeof point.pressure === 'number' ? point.pressure : 0.5;
                ctx.lineWidth = Math.max(1, stroke.width * (0.55 + pressure * 0.9));
                if (stroke.type === 'pencil') {
                    ctx.setLineDash([
                        1,
                        1.5
                    ]);
                } else {
                    ctx.setLineDash([]);
                }
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
            ctx.restore();
        }
    }["TutorWhiteboardManager.useCallback[drawStroke]"], [
        drawShape,
        fontSize
    ]);
    const getStrokeBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[getStrokeBounds]": (stroke)=>{
            if (stroke.type === 'text') {
                const anchor = stroke.points[0];
                if (!anchor) return null;
                const width = Math.max(80, (stroke.text?.length || 0) * ((stroke.fontSize || fontSize) * 0.55));
                const height = (stroke.fontSize || fontSize) * 1.4;
                return {
                    x: anchor.x,
                    y: anchor.y,
                    width,
                    height
                };
            }
            if (!stroke.points.length) return null;
            const xs = stroke.points.map({
                "TutorWhiteboardManager.useCallback[getStrokeBounds].xs": (point)=>point.x
            }["TutorWhiteboardManager.useCallback[getStrokeBounds].xs"]);
            const ys = stroke.points.map({
                "TutorWhiteboardManager.useCallback[getStrokeBounds].ys": (point)=>point.y
            }["TutorWhiteboardManager.useCallback[getStrokeBounds].ys"]);
            const minX = Math.min(...xs);
            const minY = Math.min(...ys);
            const maxX = Math.max(...xs);
            const maxY = Math.max(...ys);
            const pad = Math.max(8, stroke.width);
            return {
                x: minX - pad,
                y: minY - pad,
                width: maxX - minX + pad * 2,
                height: maxY - minY + pad * 2
            };
        }
    }["TutorWhiteboardManager.useCallback[getStrokeBounds]"], [
        fontSize
    ]);
    const pointInPolygon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[pointInPolygon]": (point, polygon)=>{
            let inside = false;
            for(let i = 0, j = polygon.length - 1; i < polygon.length; j = i++){
                const xi = polygon[i].x;
                const yi = polygon[i].y;
                const xj = polygon[j].x;
                const yj = polygon[j].y;
                const intersect = yi > point.y !== yj > point.y && point.x < (xj - xi) * (point.y - yi) / (yj - yi || 1e-6) + xi;
                if (intersect) inside = !inside;
            }
            return inside;
        }
    }["TutorWhiteboardManager.useCallback[pointInPolygon]"], []);
    const routeOrthogonalConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[routeOrthogonalConnector]": (from, to, obstacles)=>{
            const pad = 18;
            const inflate = {
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].inflate": (b)=>({
                        x: b.x - pad,
                        y: b.y - pad,
                        width: b.width + pad * 2,
                        height: b.height + pad * 2
                    })
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].inflate"];
            const inflated = obstacles.map(inflate);
            const segmentHitsRect = {
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].segmentHitsRect": (a, b, r)=>{
                    const minX = Math.min(a.x, b.x);
                    const maxX = Math.max(a.x, b.x);
                    const minY = Math.min(a.y, b.y);
                    const maxY = Math.max(a.y, b.y);
                    return maxX >= r.x && minX <= r.x + r.width && maxY >= r.y && minY <= r.y + r.height;
                }
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].segmentHitsRect"];
            const clearSegment = {
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].clearSegment": (a, b)=>inflated.every({
                        "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].clearSegment": (r)=>!segmentHitsRect(a, b, r)
                    }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].clearSegment"])
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].clearSegment"];
            const bestL = {
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].bestL": (firstHorizontal)=>{
                    const mid = firstHorizontal ? {
                        x: to.x,
                        y: from.y
                    } : {
                        x: from.x,
                        y: to.y
                    };
                    return [
                        from,
                        mid,
                        to
                    ];
                }
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].bestL"];
            const candidates = [
                bestL(true),
                bestL(false),
                [
                    from,
                    {
                        x: from.x,
                        y: from.y - 80
                    },
                    {
                        x: to.x,
                        y: from.y - 80
                    },
                    to
                ],
                [
                    from,
                    {
                        x: from.x,
                        y: from.y + 80
                    },
                    {
                        x: to.x,
                        y: from.y + 80
                    },
                    to
                ],
                [
                    from,
                    {
                        x: from.x - 80,
                        y: from.y
                    },
                    {
                        x: from.x - 80,
                        y: to.y
                    },
                    to
                ],
                [
                    from,
                    {
                        x: from.x + 80,
                        y: from.y
                    },
                    {
                        x: from.x + 80,
                        y: to.y
                    },
                    to
                ]
            ];
            const pathCost = {
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].pathCost": (path)=>path.reduce({
                        "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].pathCost": (acc, point, i)=>i === 0 ? 0 : acc + Math.abs(point.x - path[i - 1].x) + Math.abs(point.y - path[i - 1].y)
                    }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].pathCost"], 0)
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].pathCost"];
            const valid = candidates.map({
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].valid": (path)=>({
                        path,
                        ok: path.every({
                            "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].valid": (p, i)=>i === 0 || clearSegment(path[i - 1], p)
                        }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].valid"]),
                        cost: pathCost(path)
                    })
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].valid"]).filter({
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].valid": (p)=>p.ok
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].valid"]).sort({
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector].valid": (a, b)=>a.cost - b.cost
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector].valid"]);
            return (valid[0]?.path || bestL(true)).map({
                "TutorWhiteboardManager.useCallback[routeOrthogonalConnector]": (p)=>({
                        x: p.x,
                        y: p.y
                    })
            }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector]"]);
        }
    }["TutorWhiteboardManager.useCallback[routeOrthogonalConnector]"], []);
    const getPortAnchors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[getPortAnchors]": (bounds)=>({
                top: {
                    x: bounds.x + bounds.width / 2,
                    y: bounds.y
                },
                right: {
                    x: bounds.x + bounds.width,
                    y: bounds.y + bounds.height / 2
                },
                bottom: {
                    x: bounds.x + bounds.width / 2,
                    y: bounds.y + bounds.height
                },
                left: {
                    x: bounds.x,
                    y: bounds.y + bounds.height / 2
                },
                center: {
                    x: bounds.x + bounds.width / 2,
                    y: bounds.y + bounds.height / 2
                }
            })
    }["TutorWhiteboardManager.useCallback[getPortAnchors]"], []);
    const closestPortForPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[closestPortForPoint]": (point, bounds)=>{
            const anchors = getPortAnchors(bounds);
            let bestPort = 'center';
            let best = anchors.center;
            let bestDist = Number.POSITIVE_INFINITY;
            Object.keys(anchors).forEach({
                "TutorWhiteboardManager.useCallback[closestPortForPoint]": (port)=>{
                    const candidate = anchors[port];
                    const dx = candidate.x - point.x;
                    const dy = candidate.y - point.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < bestDist) {
                        bestDist = dist;
                        bestPort = port;
                        best = candidate;
                    }
                }
            }["TutorWhiteboardManager.useCallback[closestPortForPoint]"]);
            return {
                port: bestPort,
                anchor: best,
                distance: bestDist
            };
        }
    }["TutorWhiteboardManager.useCallback[closestPortForPoint]"], [
        getPortAnchors
    ]);
    const resolveConnectorEndpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[resolveConnectorEndpoint]": (point, strokes)=>{
            let best = {
                anchor: point,
                distance: Number.POSITIVE_INFINITY
            };
            strokes.filter({
                "TutorWhiteboardManager.useCallback[resolveConnectorEndpoint]": (stroke)=>stroke.shapeType !== 'connector'
            }["TutorWhiteboardManager.useCallback[resolveConnectorEndpoint]"]).forEach({
                "TutorWhiteboardManager.useCallback[resolveConnectorEndpoint]": (stroke)=>{
                    const bounds = getStrokeBounds(stroke);
                    if (!bounds) return;
                    const candidate = closestPortForPoint(point, bounds);
                    if (candidate.distance < best.distance) {
                        best = {
                            strokeId: stroke.id,
                            port: candidate.port,
                            anchor: candidate.anchor,
                            distance: candidate.distance
                        };
                    }
                }
            }["TutorWhiteboardManager.useCallback[resolveConnectorEndpoint]"]);
            if (best.distance <= 56 && best.strokeId && best.port) {
                return {
                    point: best.anchor,
                    sourceStrokeId: best.strokeId,
                    sourcePort: best.port
                };
            }
            return {
                point
            };
        }
    }["TutorWhiteboardManager.useCallback[resolveConnectorEndpoint]"], [
        closestPortForPoint,
        getStrokeBounds
    ]);
    const getSelectedBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[getSelectedBounds]": (selectedIds)=>{
            const selectedBounds = activePageStrokes.filter({
                "TutorWhiteboardManager.useCallback[getSelectedBounds].selectedBounds": (stroke)=>selectedIds.has(stroke.id)
            }["TutorWhiteboardManager.useCallback[getSelectedBounds].selectedBounds"]).map({
                "TutorWhiteboardManager.useCallback[getSelectedBounds].selectedBounds": (stroke)=>getStrokeBounds(stroke)
            }["TutorWhiteboardManager.useCallback[getSelectedBounds].selectedBounds"]).filter({
                "TutorWhiteboardManager.useCallback[getSelectedBounds].selectedBounds": (bounds)=>Boolean(bounds)
            }["TutorWhiteboardManager.useCallback[getSelectedBounds].selectedBounds"]);
            if (!selectedBounds.length) return null;
            const minX = Math.min(...selectedBounds.map({
                "TutorWhiteboardManager.useCallback[getSelectedBounds].minX": (bounds)=>bounds.x
            }["TutorWhiteboardManager.useCallback[getSelectedBounds].minX"]));
            const minY = Math.min(...selectedBounds.map({
                "TutorWhiteboardManager.useCallback[getSelectedBounds].minY": (bounds)=>bounds.y
            }["TutorWhiteboardManager.useCallback[getSelectedBounds].minY"]));
            const maxX = Math.max(...selectedBounds.map({
                "TutorWhiteboardManager.useCallback[getSelectedBounds].maxX": (bounds)=>bounds.x + bounds.width
            }["TutorWhiteboardManager.useCallback[getSelectedBounds].maxX"]));
            const maxY = Math.max(...selectedBounds.map({
                "TutorWhiteboardManager.useCallback[getSelectedBounds].maxY": (bounds)=>bounds.y + bounds.height
            }["TutorWhiteboardManager.useCallback[getSelectedBounds].maxY"]));
            return {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        }
    }["TutorWhiteboardManager.useCallback[getSelectedBounds]"], [
        activePageStrokes,
        getStrokeBounds
    ]);
    const nudgeSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[nudgeSelection]": (dx, dy)=>{
            if (selectedStrokeIds.size === 0) return;
            replaceMyStrokes({
                "TutorWhiteboardManager.useCallback[nudgeSelection]": (prev)=>prev.map({
                        "TutorWhiteboardManager.useCallback[nudgeSelection]": (stroke)=>{
                            if (!selectedStrokeIds.has(stroke.id)) return stroke;
                            if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke;
                            return {
                                ...stroke,
                                points: stroke.points.map({
                                    "TutorWhiteboardManager.useCallback[nudgeSelection]": (point)=>({
                                            ...point,
                                            x: snapEnabled ? Math.round((point.x + dx) / gridSize) * gridSize : point.x + dx,
                                            y: snapEnabled ? Math.round((point.y + dy) / gridSize) * gridSize : point.y + dy
                                        })
                                }["TutorWhiteboardManager.useCallback[nudgeSelection]"])
                            };
                        }
                    }["TutorWhiteboardManager.useCallback[nudgeSelection]"])
            }["TutorWhiteboardManager.useCallback[nudgeSelection]"]);
        }
    }["TutorWhiteboardManager.useCallback[nudgeSelection]"], [
        activePageId,
        gridSize,
        replaceMyStrokes,
        selectedStrokeIds,
        snapEnabled
    ]);
    const scaleSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[scaleSelection]": (factor)=>{
            if (selectedStrokeIds.size === 0) return;
            const bounds = getSelectedBounds(selectedStrokeIds);
            if (!bounds) return;
            const centerX = bounds.x + bounds.width / 2;
            const centerY = bounds.y + bounds.height / 2;
            replaceMyStrokes({
                "TutorWhiteboardManager.useCallback[scaleSelection]": (prev)=>prev.map({
                        "TutorWhiteboardManager.useCallback[scaleSelection]": (stroke)=>{
                            if (!selectedStrokeIds.has(stroke.id)) return stroke;
                            if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke;
                            return {
                                ...stroke,
                                points: stroke.points.map({
                                    "TutorWhiteboardManager.useCallback[scaleSelection]": (point)=>({
                                            ...point,
                                            x: snapEnabled ? Math.round((centerX + (point.x - centerX) * factor) / gridSize) * gridSize : centerX + (point.x - centerX) * factor,
                                            y: snapEnabled ? Math.round((centerY + (point.y - centerY) * factor) / gridSize) * gridSize : centerY + (point.y - centerY) * factor
                                        })
                                }["TutorWhiteboardManager.useCallback[scaleSelection]"])
                            };
                        }
                    }["TutorWhiteboardManager.useCallback[scaleSelection]"])
            }["TutorWhiteboardManager.useCallback[scaleSelection]"]);
        }
    }["TutorWhiteboardManager.useCallback[scaleSelection]"], [
        activePageId,
        getSelectedBounds,
        gridSize,
        replaceMyStrokes,
        selectedStrokeIds,
        snapEnabled
    ]);
    const logAudit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[logAudit]": (action, details)=>{
            const entry = {
                at: Date.now(),
                action,
                details
            };
            setAuditTrail({
                "TutorWhiteboardManager.useCallback[logAudit]": (prev)=>[
                        entry,
                        ...prev
                    ].slice(0, 80)
            }["TutorWhiteboardManager.useCallback[logAudit]"]);
            setSrAnnouncement(`${action}${details ? `: ${details}` : ''}`);
        }
    }["TutorWhiteboardManager.useCallback[logAudit]"], []);
    const updateSelectedStrokes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[updateSelectedStrokes]": (updater)=>{
            replaceMyStrokes({
                "TutorWhiteboardManager.useCallback[updateSelectedStrokes]": (prev)=>prev.map({
                        "TutorWhiteboardManager.useCallback[updateSelectedStrokes]": (stroke, index)=>{
                            if (!selectedStrokeIds.has(stroke.id)) return stroke;
                            if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke;
                            if (stroke.locked) return stroke;
                            return updater(stroke, index);
                        }
                    }["TutorWhiteboardManager.useCallback[updateSelectedStrokes]"])
            }["TutorWhiteboardManager.useCallback[updateSelectedStrokes]"]);
        }
    }["TutorWhiteboardManager.useCallback[updateSelectedStrokes]"], [
        activePageId,
        replaceMyStrokes,
        selectedStrokeIds
    ]);
    const groupSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[groupSelection]": ()=>{
            if (selectedStrokeIds.size < 2) return;
            const gid = `group-${Date.now()}`;
            updateSelectedStrokes({
                "TutorWhiteboardManager.useCallback[groupSelection]": (stroke)=>({
                        ...stroke,
                        groupId: gid,
                        updatedAt: Date.now()
                    })
            }["TutorWhiteboardManager.useCallback[groupSelection]"]);
            logAudit('Grouped selection', gid);
        }
    }["TutorWhiteboardManager.useCallback[groupSelection]"], [
        logAudit,
        selectedStrokeIds.size,
        updateSelectedStrokes
    ]);
    const ungroupSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[ungroupSelection]": ()=>{
            if (selectedStrokeIds.size === 0) return;
            updateSelectedStrokes({
                "TutorWhiteboardManager.useCallback[ungroupSelection]": (stroke)=>({
                        ...stroke,
                        groupId: undefined,
                        updatedAt: Date.now()
                    })
            }["TutorWhiteboardManager.useCallback[ungroupSelection]"]);
            logAudit('Ungrouped selection');
        }
    }["TutorWhiteboardManager.useCallback[ungroupSelection]"], [
        logAudit,
        selectedStrokeIds.size,
        updateSelectedStrokes
    ]);
    const lockSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[lockSelection]": (locked)=>{
            updateSelectedStrokes({
                "TutorWhiteboardManager.useCallback[lockSelection]": (stroke)=>({
                        ...stroke,
                        locked,
                        updatedAt: Date.now()
                    })
            }["TutorWhiteboardManager.useCallback[lockSelection]"]);
            logAudit(locked ? 'Locked selection' : 'Unlocked selection');
        }
    }["TutorWhiteboardManager.useCallback[lockSelection]"], [
        logAudit,
        updateSelectedStrokes
    ]);
    const duplicateSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[duplicateSelection]": ()=>{
            if (selectedStrokeIds.size === 0) return;
            replaceMyStrokes({
                "TutorWhiteboardManager.useCallback[duplicateSelection]": (prev)=>{
                    const duplicates = prev.filter({
                        "TutorWhiteboardManager.useCallback[duplicateSelection].duplicates": (stroke)=>selectedStrokeIds.has(stroke.id) && (stroke.pageId || DEFAULT_PAGE_ID) === activePageId
                    }["TutorWhiteboardManager.useCallback[duplicateSelection].duplicates"]).map({
                        "TutorWhiteboardManager.useCallback[duplicateSelection].duplicates": (stroke)=>({
                                ...stroke,
                                id: `${stroke.id}-dup-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                                points: stroke.points.map({
                                    "TutorWhiteboardManager.useCallback[duplicateSelection].duplicates": (p)=>({
                                            ...p,
                                            x: p.x + 24,
                                            y: p.y + 24
                                        })
                                }["TutorWhiteboardManager.useCallback[duplicateSelection].duplicates"]),
                                zIndex: (stroke.zIndex || 0) + 1,
                                locked: false,
                                createdAt: Date.now(),
                                updatedAt: Date.now()
                            })
                    }["TutorWhiteboardManager.useCallback[duplicateSelection].duplicates"]);
                    return [
                        ...prev,
                        ...duplicates
                    ];
                }
            }["TutorWhiteboardManager.useCallback[duplicateSelection]"]);
            logAudit('Duplicated selection');
        }
    }["TutorWhiteboardManager.useCallback[duplicateSelection]"], [
        activePageId,
        logAudit,
        replaceMyStrokes,
        selectedStrokeIds
    ]);
    const reorderSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[reorderSelection]": (mode)=>{
            replaceMyStrokes({
                "TutorWhiteboardManager.useCallback[reorderSelection]": (prev)=>{
                    const maxZ = Math.max(0, ...prev.map({
                        "TutorWhiteboardManager.useCallback[reorderSelection].maxZ": (stroke)=>stroke.zIndex || 0
                    }["TutorWhiteboardManager.useCallback[reorderSelection].maxZ"]));
                    const minZ = Math.min(0, ...prev.map({
                        "TutorWhiteboardManager.useCallback[reorderSelection].minZ": (stroke)=>stroke.zIndex || 0
                    }["TutorWhiteboardManager.useCallback[reorderSelection].minZ"]));
                    return prev.map({
                        "TutorWhiteboardManager.useCallback[reorderSelection]": (stroke)=>{
                            if (!selectedStrokeIds.has(stroke.id)) return stroke;
                            if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke;
                            const z = stroke.zIndex || 0;
                            if (mode === 'front') return {
                                ...stroke,
                                zIndex: maxZ + 1,
                                updatedAt: Date.now()
                            };
                            if (mode === 'forward') return {
                                ...stroke,
                                zIndex: z + 1,
                                updatedAt: Date.now()
                            };
                            return {
                                ...stroke,
                                zIndex: minZ - 1,
                                updatedAt: Date.now()
                            };
                        }
                    }["TutorWhiteboardManager.useCallback[reorderSelection]"]);
                }
            }["TutorWhiteboardManager.useCallback[reorderSelection]"]);
            logAudit('Reordered selection', mode);
        }
    }["TutorWhiteboardManager.useCallback[reorderSelection]"], [
        activePageId,
        logAudit,
        replaceMyStrokes,
        selectedStrokeIds
    ]);
    const pushSelectionAsExemplar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[pushSelectionAsExemplar]": ()=>{
            if (!selectedStrokeIds.size) return;
            replaceMyStrokes({
                "TutorWhiteboardManager.useCallback[pushSelectionAsExemplar]": (prev)=>{
                    const maxZ = Math.max(0, ...prev.map({
                        "TutorWhiteboardManager.useCallback[pushSelectionAsExemplar].maxZ": (stroke)=>stroke.zIndex || 0
                    }["TutorWhiteboardManager.useCallback[pushSelectionAsExemplar].maxZ"]));
                    const copies = prev.filter({
                        "TutorWhiteboardManager.useCallback[pushSelectionAsExemplar].copies": (stroke)=>selectedStrokeIds.has(stroke.id)
                    }["TutorWhiteboardManager.useCallback[pushSelectionAsExemplar].copies"]).map({
                        "TutorWhiteboardManager.useCallback[pushSelectionAsExemplar].copies": (stroke, index)=>({
                                ...stroke,
                                id: `${stroke.id}-exemplar-${Date.now()}-${index}`,
                                layerId: 'tutor-broadcast',
                                zIndex: maxZ + 10 + index,
                                updatedAt: Date.now(),
                                createdAt: Date.now()
                            })
                    }["TutorWhiteboardManager.useCallback[pushSelectionAsExemplar].copies"]);
                    return [
                        ...prev,
                        ...copies
                    ];
                }
            }["TutorWhiteboardManager.useCallback[pushSelectionAsExemplar]"]);
            logAudit('Pushed exemplar to broadcast layer');
        }
    }["TutorWhiteboardManager.useCallback[pushSelectionAsExemplar]"], [
        logAudit,
        replaceMyStrokes,
        selectedStrokeIds
    ]);
    const broadcastViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[broadcastViewport]": ()=>{
            updateSpotlight({
                ...spotlight,
                enabled: true,
                x: Math.max(0, -viewport.offsetX / Math.max(0.1, viewport.scale)),
                y: Math.max(0, -viewport.offsetY / Math.max(0.1, viewport.scale)),
                width: 420 / Math.max(0.6, viewport.scale),
                height: 260 / Math.max(0.6, viewport.scale)
            });
            logAudit('Broadcasted viewport');
        }
    }["TutorWhiteboardManager.useCallback[broadcastViewport]"], [
        logAudit,
        spotlight,
        updateSpotlight,
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const exportSvg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[exportSvg]": ()=>{
            const strokes = activePageStrokes;
            const width = 1600;
            const height = 900;
            const content = strokes.map({
                "TutorWhiteboardManager.useCallback[exportSvg].content": (stroke)=>{
                    if (stroke.type === 'text') {
                        const p = stroke.points[0];
                        if (!p || !stroke.text) return '';
                        return `<text x="${p.x}" y="${p.y}" fill="${stroke.color}" font-size="${stroke.fontSize || 20}">${stroke.text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`;
                    }
                    const d = stroke.points.map({
                        "TutorWhiteboardManager.useCallback[exportSvg].content.d": (p, i)=>`${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
                    }["TutorWhiteboardManager.useCallback[exportSvg].content.d"]).join(' ');
                    return `<path d="${d}" fill="none" stroke="${stroke.color}" stroke-width="${stroke.width}" stroke-linecap="round" stroke-linejoin="round" />`;
                }
            }["TutorWhiteboardManager.useCallback[exportSvg].content"]).join('\n');
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;
            const blob = new Blob([
                svg
            ], {
                type: 'image/svg+xml'
            });
            const href = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = href;
            anchor.download = `whiteboard_${roomId}_${Date.now()}.svg`;
            anchor.click();
            URL.revokeObjectURL(href);
            logAudit('Exported SVG');
        }
    }["TutorWhiteboardManager.useCallback[exportSvg]"], [
        activePageStrokes,
        logAudit,
        roomId
    ]);
    const selectByAttribute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[selectByAttribute]": (attribute)=>{
            const seed = activePageStrokes.find({
                "TutorWhiteboardManager.useCallback[selectByAttribute].seed": (stroke)=>selectedStrokeIds.has(stroke.id)
            }["TutorWhiteboardManager.useCallback[selectByAttribute].seed"]);
            if (!seed) return;
            const selected = new Set();
            activePageStrokes.forEach({
                "TutorWhiteboardManager.useCallback[selectByAttribute]": (stroke)=>{
                    if (attribute === 'color' && stroke.color === seed.color) selected.add(stroke.id);
                    if (attribute === 'type' && stroke.type === seed.type) selected.add(stroke.id);
                    if (attribute === 'layer' && (stroke.layerId || 'tutor-broadcast') === (seed.layerId || 'tutor-broadcast')) selected.add(stroke.id);
                }
            }["TutorWhiteboardManager.useCallback[selectByAttribute]"]);
            setSelectedStrokeIds(selected);
        }
    }["TutorWhiteboardManager.useCallback[selectByAttribute]"], [
        activePageStrokes,
        selectedStrokeIds
    ]);
    const selectedBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TutorWhiteboardManager.useMemo[selectedBounds]": ()=>getSelectedBounds(selectedStrokeIds)
    }["TutorWhiteboardManager.useMemo[selectedBounds]"], [
        getSelectedBounds,
        selectedStrokeIds
    ]);
    const activeSelectedConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TutorWhiteboardManager.useMemo[activeSelectedConnector]": ()=>{
            if (selectedStrokeIds.size !== 1) return null;
            const id = Array.from(selectedStrokeIds)[0];
            const stroke = activePageStrokes.find({
                "TutorWhiteboardManager.useMemo[activeSelectedConnector].stroke": (item)=>item.id === id
            }["TutorWhiteboardManager.useMemo[activeSelectedConnector].stroke"]);
            if (!stroke || stroke.shapeType !== 'connector' || stroke.points.length < 2) return null;
            return stroke;
        }
    }["TutorWhiteboardManager.useMemo[activeSelectedConnector]"], [
        activePageStrokes,
        selectedStrokeIds
    ]);
    const getConnectorScreenEndpoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[getConnectorScreenEndpoints]": (stroke, strokes)=>{
            let sourcePoint = stroke.points[0];
            let targetPoint = stroke.points[stroke.points.length - 1];
            if (stroke.sourceStrokeId && stroke.sourcePort) {
                const sourceStroke = strokes.find({
                    "TutorWhiteboardManager.useCallback[getConnectorScreenEndpoints].sourceStroke": (item)=>item.id === stroke.sourceStrokeId
                }["TutorWhiteboardManager.useCallback[getConnectorScreenEndpoints].sourceStroke"]);
                const bounds = sourceStroke ? getStrokeBounds(sourceStroke) : null;
                if (bounds) sourcePoint = getPortAnchors(bounds)[stroke.sourcePort];
            }
            if (stroke.targetStrokeId && stroke.targetPort) {
                const targetStroke = strokes.find({
                    "TutorWhiteboardManager.useCallback[getConnectorScreenEndpoints].targetStroke": (item)=>item.id === stroke.targetStrokeId
                }["TutorWhiteboardManager.useCallback[getConnectorScreenEndpoints].targetStroke"]);
                const bounds = targetStroke ? getStrokeBounds(targetStroke) : null;
                if (bounds) targetPoint = getPortAnchors(bounds)[stroke.targetPort];
            }
            return {
                source: {
                    x: sourcePoint.x * viewport.scale + viewport.offsetX,
                    y: sourcePoint.y * viewport.scale + viewport.offsetY
                },
                target: {
                    x: targetPoint.x * viewport.scale + viewport.offsetX,
                    y: targetPoint.y * viewport.scale + viewport.offsetY
                }
            };
        }
    }["TutorWhiteboardManager.useCallback[getConnectorScreenEndpoints]"], [
        getPortAnchors,
        getStrokeBounds,
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const hitTestConnectorEndpointHandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[hitTestConnectorEndpointHandle]": (screenX, screenY)=>{
            if (!activeSelectedConnector) return null;
            const endpoints = getConnectorScreenEndpoints(activeSelectedConnector, activePageStrokes);
            const radius = 10;
            const sourceDist = Math.hypot(screenX - endpoints.source.x, screenY - endpoints.source.y);
            if (sourceDist <= radius) return {
                strokeId: activeSelectedConnector.id,
                endpoint: 'source'
            };
            const targetDist = Math.hypot(screenX - endpoints.target.x, screenY - endpoints.target.y);
            if (targetDist <= radius) return {
                strokeId: activeSelectedConnector.id,
                endpoint: 'target'
            };
            return null;
        }
    }["TutorWhiteboardManager.useCallback[hitTestConnectorEndpointHandle]"], [
        activePageStrokes,
        activeSelectedConnector,
        getConnectorScreenEndpoints
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            updateSelectionPresence(Array.from(selectedStrokeIds), activePageId, '#0ea5e9');
        }
    }["TutorWhiteboardManager.useEffect"], [
        activePageId,
        selectedStrokeIds,
        updateSelectionPresence
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            replaceMyStrokes({
                "TutorWhiteboardManager.useEffect": (prev)=>{
                    const activeStrokes = prev.filter({
                        "TutorWhiteboardManager.useEffect.activeStrokes": (stroke)=>(stroke.pageId || DEFAULT_PAGE_ID) === activePageId
                    }["TutorWhiteboardManager.useEffect.activeStrokes"]);
                    const byId = new Map(activeStrokes.map({
                        "TutorWhiteboardManager.useEffect": (stroke)=>[
                                stroke.id,
                                stroke
                            ]
                    }["TutorWhiteboardManager.useEffect"]));
                    const obstacles = activeStrokes.filter({
                        "TutorWhiteboardManager.useEffect.obstacles": (stroke)=>stroke.shapeType !== 'connector'
                    }["TutorWhiteboardManager.useEffect.obstacles"]).map({
                        "TutorWhiteboardManager.useEffect.obstacles": (stroke)=>getStrokeBounds(stroke)
                    }["TutorWhiteboardManager.useEffect.obstacles"]).filter({
                        "TutorWhiteboardManager.useEffect.obstacles": (bounds)=>Boolean(bounds)
                    }["TutorWhiteboardManager.useEffect.obstacles"]);
                    let changed = false;
                    const next = [];
                    prev.forEach({
                        "TutorWhiteboardManager.useEffect": (stroke)=>{
                            if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId || stroke.shapeType !== 'connector') {
                                next.push(stroke);
                                return;
                            }
                            if (!stroke.sourceStrokeId || !stroke.targetStrokeId || !stroke.sourcePort || !stroke.targetPort) {
                                next.push(stroke);
                                return;
                            }
                            const source = byId.get(stroke.sourceStrokeId);
                            const target = byId.get(stroke.targetStrokeId);
                            if (!source || !target) {
                                changed = true;
                                return;
                            }
                            const sourceBounds = getStrokeBounds(source);
                            const targetBounds = getStrokeBounds(target);
                            if (!sourceBounds || !targetBounds) {
                                next.push(stroke);
                                return;
                            }
                            const from = getPortAnchors(sourceBounds)[stroke.sourcePort];
                            const to = getPortAnchors(targetBounds)[stroke.targetPort];
                            const rerouted = routeOrthogonalConnector(from, to, obstacles);
                            const same = stroke.points.length === rerouted.length && stroke.points.every({
                                "TutorWhiteboardManager.useEffect": (point, index)=>{
                                    const nextPoint = rerouted[index];
                                    return Math.abs(point.x - nextPoint.x) < 0.5 && Math.abs(point.y - nextPoint.y) < 0.5;
                                }
                            }["TutorWhiteboardManager.useEffect"]);
                            if (same) {
                                next.push(stroke);
                                return;
                            }
                            changed = true;
                            next.push({
                                ...stroke,
                                points: rerouted,
                                updatedAt: Date.now()
                            });
                        }
                    }["TutorWhiteboardManager.useEffect"]);
                    return changed ? next : prev;
                }
            }["TutorWhiteboardManager.useEffect"]);
        }
    }["TutorWhiteboardManager.useEffect"], [
        activePageId,
        activePageStrokes,
        getPortAnchors,
        getStrokeBounds,
        replaceMyStrokes,
        routeOrthogonalConnector
    ]);
    const hitTestSelectionHandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[hitTestSelectionHandle]": (screenX, screenY)=>{
            if (!selectedBounds) return null;
            const corners = [
                {
                    id: 'nw',
                    x: selectedBounds.x,
                    y: selectedBounds.y
                },
                {
                    id: 'ne',
                    x: selectedBounds.x + selectedBounds.width,
                    y: selectedBounds.y
                },
                {
                    id: 'sw',
                    x: selectedBounds.x,
                    y: selectedBounds.y + selectedBounds.height
                },
                {
                    id: 'se',
                    x: selectedBounds.x + selectedBounds.width,
                    y: selectedBounds.y + selectedBounds.height
                }
            ];
            const radius = 10;
            for (const corner of corners){
                const screen = {
                    x: corner.x * viewport.scale + viewport.offsetX,
                    y: corner.y * viewport.scale + viewport.offsetY
                };
                const dx = screenX - screen.x;
                const dy = screenY - screen.y;
                if (Math.sqrt(dx * dx + dy * dy) <= radius) return corner.id;
            }
            const rotateScreen = {
                x: (selectedBounds.x + selectedBounds.width / 2) * viewport.scale + viewport.offsetX,
                y: (selectedBounds.y - 36) * viewport.scale + viewport.offsetY
            };
            const rdx = screenX - rotateScreen.x;
            const rdy = screenY - rotateScreen.y;
            if (Math.sqrt(rdx * rdx + rdy * rdy) <= 11) return 'rotate';
            return null;
        }
    }["TutorWhiteboardManager.useCallback[hitTestSelectionHandle]"], [
        selectedBounds,
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const redrawCanvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[redrawCanvas]": ()=>{
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx) return;
            // Clear canvas
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            if (gridVisible) {
                ctx.save();
                ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
                ctx.lineWidth = 1;
                for(let x = 0; x < canvas.width; x += gridSize){
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.stroke();
                }
                for(let y = 0; y < canvas.height; y += gridSize){
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvas.width, y);
                    ctx.stroke();
                }
                ctx.restore();
            }
            ctx.save();
            ctx.translate(viewport.offsetX, viewport.offsetY);
            ctx.scale(viewport.scale, viewport.scale);
            const visibleLayerIds = new Set(layerConfig.filter({
                "TutorWhiteboardManager.useCallback[redrawCanvas]": (layer)=>layer.visible
            }["TutorWhiteboardManager.useCallback[redrawCanvas]"]).map({
                "TutorWhiteboardManager.useCallback[redrawCanvas]": (layer)=>layer.id
            }["TutorWhiteboardManager.useCallback[redrawCanvas]"]));
            const worldViewport = {
                left: -viewport.offsetX / viewport.scale,
                top: -viewport.offsetY / viewport.scale,
                right: (canvas.width - viewport.offsetX) / viewport.scale,
                bottom: (canvas.height - viewport.offsetY) / viewport.scale
            };
            const isBoundsVisible = {
                "TutorWhiteboardManager.useCallback[redrawCanvas].isBoundsVisible": (bounds)=>{
                    if (!bounds) return true;
                    return bounds.x <= worldViewport.right && bounds.x + bounds.width >= worldViewport.left && bounds.y <= worldViewport.bottom && bounds.y + bounds.height >= worldViewport.top;
                }
            }["TutorWhiteboardManager.useCallback[redrawCanvas].isBoundsVisible"];
            const orderedStrokes = [
                ...activePageStrokes
            ].sort({
                "TutorWhiteboardManager.useCallback[redrawCanvas].orderedStrokes": (a, b)=>(a.zIndex || 0) - (b.zIndex || 0)
            }["TutorWhiteboardManager.useCallback[redrawCanvas].orderedStrokes"]);
            orderedStrokes.forEach({
                "TutorWhiteboardManager.useCallback[redrawCanvas]": (stroke)=>{
                    const strokeLayer = stroke.layerId || 'tutor-broadcast';
                    const bounds = getStrokeBounds(stroke);
                    if (!isBoundsVisible(bounds)) return;
                    if (visibleLayerIds.has(strokeLayer)) {
                        drawStroke(ctx, stroke);
                        if (stroke.locked) {
                            if (bounds) {
                                ctx.save();
                                ctx.strokeStyle = 'rgba(220, 38, 38, 0.7)';
                                ctx.setLineDash([
                                    4,
                                    4
                                ]);
                                ctx.lineWidth = 1;
                                ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
                                ctx.restore();
                            }
                        }
                        if (selectedStrokeIds.has(stroke.id)) {
                            if (bounds) {
                                ctx.save();
                                ctx.strokeStyle = '#2563eb';
                                ctx.setLineDash([
                                    6,
                                    4
                                ]);
                                ctx.lineWidth = 1.5 / Math.max(0.4, viewport.scale);
                                ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
                                ctx.restore();
                            }
                        }
                    }
                }
            }["TutorWhiteboardManager.useCallback[redrawCanvas]"]);
            remoteSelections.forEach({
                "TutorWhiteboardManager.useCallback[redrawCanvas]": (presence)=>{
                    if (presence.pageId && presence.pageId !== activePageId) return;
                    presence.strokeIds.forEach({
                        "TutorWhiteboardManager.useCallback[redrawCanvas]": (id)=>{
                            const stroke = activePageStrokes.find({
                                "TutorWhiteboardManager.useCallback[redrawCanvas].stroke": (entry)=>entry.id === id
                            }["TutorWhiteboardManager.useCallback[redrawCanvas].stroke"]);
                            if (!stroke) return;
                            const bounds = getStrokeBounds(stroke);
                            if (!bounds || !isBoundsVisible(bounds)) return;
                            ctx.save();
                            ctx.strokeStyle = presence.color || '#f59e0b';
                            ctx.setLineDash([
                                4,
                                4
                            ]);
                            ctx.lineWidth = 1.25 / Math.max(0.4, viewport.scale);
                            ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
                            ctx.restore();
                        }
                    }["TutorWhiteboardManager.useCallback[redrawCanvas]"]);
                }
            }["TutorWhiteboardManager.useCallback[redrawCanvas]"]);
            if (isDrawing && currentStroke.length > 1 && freeDrawTools.has(tool)) {
                const previewStroke = {
                    id: 'preview',
                    points: currentStroke,
                    color: tool === 'eraser' ? '#ffffff' : color,
                    width: tool === 'eraser' ? TOOL_PRESET.eraser.width : brushSize,
                    opacity: TOOL_PRESET[tool].opacity,
                    type: TOOL_PRESET[tool].strokeType,
                    userId: 'preview'
                };
                drawStroke(ctx, previewStroke);
            }
            if (shapeStart && shapePreview && shapeTools.has(tool)) {
                const preset = TOOL_PRESET[tool];
                drawShape(ctx, tool, shapeStart, shapePreview, {
                    color,
                    width: Math.max(1, brushSize),
                    opacity: preset.opacity
                });
            }
            if (laserPoint) {
                ctx.save();
                ctx.globalAlpha = 0.9;
                const gradient = ctx.createRadialGradient(laserPoint.x, laserPoint.y, 1, laserPoint.x, laserPoint.y, 28);
                gradient.addColorStop(0, 'rgba(239,68,68,0.95)');
                gradient.addColorStop(1, 'rgba(239,68,68,0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(laserPoint.x, laserPoint.y, 28, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            ctx.restore();
            if (selectionRect) {
                ctx.save();
                ctx.strokeStyle = '#2563eb';
                ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
                ctx.setLineDash([
                    6,
                    3
                ]);
                const x = Math.min(selectionRect.x, selectionRect.x + selectionRect.width);
                const y = Math.min(selectionRect.y, selectionRect.y + selectionRect.height);
                const width = Math.abs(selectionRect.width);
                const height = Math.abs(selectionRect.height);
                ctx.strokeRect(x, y, width, height);
                ctx.fillRect(x, y, width, height);
                ctx.restore();
            }
            if (lassoPath && lassoPath.length > 1) {
                ctx.save();
                ctx.strokeStyle = '#2563eb';
                ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
                ctx.setLineDash([
                    6,
                    3
                ]);
                ctx.beginPath();
                lassoPath.forEach({
                    "TutorWhiteboardManager.useCallback[redrawCanvas]": (point, index)=>{
                        const screen = {
                            x: point.x * viewport.scale + viewport.offsetX,
                            y: point.y * viewport.scale + viewport.offsetY
                        };
                        if (index === 0) ctx.moveTo(screen.x, screen.y);
                        else ctx.lineTo(screen.x, screen.y);
                    }
                }["TutorWhiteboardManager.useCallback[redrawCanvas]"]);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.restore();
            }
            if (selectedBounds) {
                const corners = [
                    {
                        x: selectedBounds.x,
                        y: selectedBounds.y
                    },
                    {
                        x: selectedBounds.x + selectedBounds.width,
                        y: selectedBounds.y
                    },
                    {
                        x: selectedBounds.x,
                        y: selectedBounds.y + selectedBounds.height
                    },
                    {
                        x: selectedBounds.x + selectedBounds.width,
                        y: selectedBounds.y + selectedBounds.height
                    }
                ];
                ctx.save();
                ctx.fillStyle = '#2563eb';
                corners.forEach({
                    "TutorWhiteboardManager.useCallback[redrawCanvas]": (corner)=>{
                        const screenX = corner.x * viewport.scale + viewport.offsetX;
                        const screenY = corner.y * viewport.scale + viewport.offsetY;
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }["TutorWhiteboardManager.useCallback[redrawCanvas]"]);
                const centerX = (selectedBounds.x + selectedBounds.width / 2) * viewport.scale + viewport.offsetX;
                const topY = selectedBounds.y * viewport.scale + viewport.offsetY;
                const rotateY = (selectedBounds.y - 36) * viewport.scale + viewport.offsetY;
                ctx.strokeStyle = '#2563eb';
                ctx.beginPath();
                ctx.moveTo(centerX, topY);
                ctx.lineTo(centerX, rotateY + 8);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(centerX, rotateY, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#0ea5e9';
                ctx.fill();
                ctx.restore();
            }
            if (activeSelectedConnector) {
                const endpoints = getConnectorScreenEndpoints(activeSelectedConnector, activePageStrokes);
                ctx.save();
                ctx.fillStyle = '#0ea5e9';
                ctx.strokeStyle = '#0369a1';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(endpoints.source.x, endpoints.source.y, 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#22c55e';
                ctx.strokeStyle = '#15803d';
                ctx.beginPath();
                ctx.arc(endpoints.target.x, endpoints.target.y, 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }
    }["TutorWhiteboardManager.useCallback[redrawCanvas]"], [
        activePageId,
        activePageStrokes,
        activeSelectedConnector,
        brushSize,
        color,
        currentStroke,
        drawShape,
        drawStroke,
        freeDrawTools,
        getConnectorScreenEndpoints,
        getStrokeBounds,
        gridSize,
        gridVisible,
        isDrawing,
        lassoPath,
        laserPoint,
        layerConfig,
        remoteSelections,
        selectedBounds,
        selectedStrokeIds,
        selectionRect,
        shapePreview,
        shapeStart,
        shapeTools,
        tool,
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    // Canvas setup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const resizeCanvas = {
                "TutorWhiteboardManager.useEffect.resizeCanvas": ()=>{
                    const parent = canvas.parentElement;
                    if (parent) {
                        canvas.width = parent.clientWidth;
                        canvas.height = parent.clientHeight;
                    }
                    redrawCanvas();
                }
            }["TutorWhiteboardManager.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            return ({
                "TutorWhiteboardManager.useEffect": ()=>window.removeEventListener('resize', resizeCanvas)
            })["TutorWhiteboardManager.useEffect"];
        }
    }["TutorWhiteboardManager.useEffect"], [
        redrawCanvas
    ]);
    // Redraw canvas when strokes change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            redrawCanvas();
        }
    }["TutorWhiteboardManager.useEffect"], [
        redrawCanvas
    ]);
    const getCanvasPoint = (e)=>{
        const canvas = canvasRef.current;
        if (!canvas) return {
            x: 0,
            y: 0
        };
        const rect = canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        return {
            x: (screenX - viewport.offsetX) / viewport.scale,
            y: (screenY - viewport.offsetY) / viewport.scale,
            pressure: e.pointerType === 'mouse' ? 0.5 : e.pressure || 0.5
        };
    };
    const pointerToScreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[pointerToScreen]": (point)=>({
                x: point.x * viewport.scale + viewport.offsetX,
                y: point.y * viewport.scale + viewport.offsetY
            })
    }["TutorWhiteboardManager.useCallback[pointerToScreen]"], [
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const handlePointerDown = (e)=>{
        const target = e.currentTarget;
        target.setPointerCapture(e.pointerId);
        const point = getCanvasPoint(e);
        const screenPoint = pointerToScreen(point);
        if (tool === 'hand') {
            setIsPanning(true);
            panStartRef.current = {
                x: e.clientX,
                y: e.clientY,
                offsetX: viewport.offsetX,
                offsetY: viewport.offsetY
            };
            return;
        }
        if (tool === 'select') {
            const connectorHandle = hitTestConnectorEndpointHandle(screenPoint.x, screenPoint.y);
            if (connectorHandle) {
                setConnectorDrag(connectorHandle);
                return;
            }
            if (e.altKey) {
                const hitStroke = [
                    ...activePageStrokes
                ].reverse().find((stroke)=>{
                    const bounds = getStrokeBounds(stroke);
                    if (!bounds) return false;
                    return point.x >= bounds.x && point.x <= bounds.x + bounds.width && point.y >= bounds.y && point.y <= bounds.y + bounds.height;
                });
                if (hitStroke) {
                    setSelectedStrokeIds((prev)=>{
                        const next = new Set(prev);
                        if (next.has(hitStroke.id)) next.delete(hitStroke.id);
                        else next.add(hitStroke.id);
                        return next;
                    });
                }
                return;
            }
            const handle = hitTestSelectionHandle(screenPoint.x, screenPoint.y);
            if (handle) {
                if (selectedBounds) {
                    const centerX = selectedBounds.x + selectedBounds.width / 2;
                    const centerY = selectedBounds.y + selectedBounds.height / 2;
                    selectionSnapshotRef.current = new Map(activePageStrokes.filter((stroke)=>selectedStrokeIds.has(stroke.id)).map((stroke)=>[
                            stroke.id,
                            stroke.points.map((p)=>({
                                    ...p
                                }))
                        ]));
                    if (handle === 'rotate') {
                        rotateRef.current = {
                            centerX,
                            centerY,
                            startAngle: Math.atan2(point.y - centerY, point.x - centerX)
                        };
                        setIsRotatingSelection(true);
                    } else {
                        const startDist = Math.max(1, Math.hypot(point.x - centerX, point.y - centerY));
                        transformRef.current = {
                            centerX,
                            centerY,
                            startDist
                        };
                        setActiveTransformHandle(handle);
                    }
                    return;
                }
            }
            const hitSelectedStroke = activePageStrokes.some((stroke)=>{
                if (!selectedStrokeIds.has(stroke.id)) return false;
                const bounds = getStrokeBounds(stroke);
                if (!bounds) return false;
                return point.x >= bounds.x && point.x <= bounds.x + bounds.width && point.y >= bounds.y && point.y <= bounds.y + bounds.height;
            });
            if (hitSelectedStroke) {
                const snapshot = new Map();
                activePageStrokes.forEach((stroke)=>{
                    if (!selectedStrokeIds.has(stroke.id)) return;
                    snapshot.set(stroke.id, stroke.points.map((p)=>({
                            ...p
                        })));
                });
                selectionSnapshotRef.current = snapshot;
                dragStartRef.current = point;
                setIsDraggingSelection(true);
            } else if (selectionMode === 'lasso') {
                setLassoPath([
                    point
                ]);
                setSelectionRect(null);
            } else {
                setSelectionRect({
                    x: screenPoint.x,
                    y: screenPoint.y,
                    width: 0,
                    height: 0
                });
                setLassoPath(null);
            }
            return;
        }
        if (tool === 'text') {
            setTextDraft({
                x: point.x,
                y: point.y,
                value: ''
            });
            return;
        }
        if (tool === 'laser') {
            setLaserPoint(point);
            updateCursor(point.x, point.y, 'laser');
            return;
        }
        if (shapeTools.has(tool)) {
            setIsDrawing(true);
            setShapeStart(point);
            setShapePreview(point);
            return;
        }
        if (!freeDrawTools.has(tool)) return;
        setIsDrawing(true);
        setCurrentStroke([
            point
        ]);
    };
    const handlePointerMove = (e)=>{
        if (isPanning && panStartRef.current) {
            const deltaX = e.clientX - panStartRef.current.x;
            const deltaY = e.clientY - panStartRef.current.y;
            setViewport((prev)=>({
                    ...prev,
                    offsetX: panStartRef.current.offsetX + deltaX,
                    offsetY: panStartRef.current.offsetY + deltaY
                }));
            return;
        }
        const point = getCanvasPoint(e);
        updateCursor(point.x, point.y, tool === 'laser' ? 'laser' : 'cursor');
        if (connectorDrag) {
            replaceMyStrokes((prev)=>{
                const pageStrokes = prev.filter((stroke)=>(stroke.pageId || DEFAULT_PAGE_ID) === activePageId);
                const obstacles = pageStrokes.filter((stroke)=>stroke.shapeType !== 'connector').map((stroke)=>getStrokeBounds(stroke)).filter((bounds)=>Boolean(bounds));
                const peers = pageStrokes.filter((stroke)=>stroke.id !== connectorDrag.strokeId);
                return prev.map((stroke)=>{
                    if (stroke.id !== connectorDrag.strokeId || stroke.shapeType !== 'connector') return stroke;
                    const resolved = resolveConnectorEndpoint(point, peers);
                    const from = connectorDrag.endpoint === 'source' ? resolved.point : stroke.points[0];
                    const to = connectorDrag.endpoint === 'target' ? resolved.point : stroke.points[stroke.points.length - 1];
                    return {
                        ...stroke,
                        points: routeOrthogonalConnector(from, to, obstacles),
                        sourceStrokeId: connectorDrag.endpoint === 'source' ? resolved.sourceStrokeId : stroke.sourceStrokeId,
                        sourcePort: connectorDrag.endpoint === 'source' ? resolved.sourcePort : stroke.sourcePort,
                        targetStrokeId: connectorDrag.endpoint === 'target' ? resolved.sourceStrokeId : stroke.targetStrokeId,
                        targetPort: connectorDrag.endpoint === 'target' ? resolved.sourcePort : stroke.targetPort,
                        updatedAt: Date.now()
                    };
                });
            });
            return;
        }
        if (isRotatingSelection && rotateRef.current) {
            const { centerX, centerY, startAngle } = rotateRef.current;
            const currentAngle = Math.atan2(point.y - centerY, point.x - centerX);
            const delta = currentAngle - startAngle;
            replaceMyStrokes((prev)=>prev.map((stroke)=>{
                    if (!selectedStrokeIds.has(stroke.id)) return stroke;
                    if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke;
                    const base = selectionSnapshotRef.current.get(stroke.id);
                    if (!base) return stroke;
                    return {
                        ...stroke,
                        rotation: ((stroke.rotation || 0) + delta * 180 / Math.PI) % 360,
                        updatedAt: Date.now(),
                        points: base.map((p)=>{
                            const dx = p.x - centerX;
                            const dy = p.y - centerY;
                            return {
                                ...p,
                                x: centerX + dx * Math.cos(delta) - dy * Math.sin(delta),
                                y: centerY + dx * Math.sin(delta) + dy * Math.cos(delta)
                            };
                        })
                    };
                }));
            return;
        }
        if (activeTransformHandle && transformRef.current) {
            const { centerX, centerY, startDist } = transformRef.current;
            const currentDist = Math.max(1, Math.hypot(point.x - centerX, point.y - centerY));
            const factor = currentDist / startDist;
            replaceMyStrokes((prev)=>prev.map((stroke)=>{
                    if (!selectedStrokeIds.has(stroke.id)) return stroke;
                    if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke;
                    const base = selectionSnapshotRef.current.get(stroke.id);
                    if (!base) return stroke;
                    return {
                        ...stroke,
                        points: base.map((p)=>({
                                ...p,
                                x: snapEnabled ? Math.round((centerX + (p.x - centerX) * factor) / gridSize) * gridSize : centerX + (p.x - centerX) * factor,
                                y: snapEnabled ? Math.round((centerY + (p.y - centerY) * factor) / gridSize) * gridSize : centerY + (p.y - centerY) * factor
                            }))
                    };
                }));
            return;
        }
        if (isDraggingSelection && dragStartRef.current) {
            const dx = point.x - dragStartRef.current.x;
            const dy = point.y - dragStartRef.current.y;
            replaceMyStrokes((prev)=>prev.map((stroke)=>{
                    if (!selectedStrokeIds.has(stroke.id)) return stroke;
                    if ((stroke.pageId || DEFAULT_PAGE_ID) !== activePageId) return stroke;
                    const base = selectionSnapshotRef.current.get(stroke.id);
                    if (!base) return stroke;
                    return {
                        ...stroke,
                        points: base.map((p)=>({
                                ...p,
                                x: snapEnabled ? Math.round((p.x + dx) / gridSize) * gridSize : p.x + dx,
                                y: snapEnabled ? Math.round((p.y + dy) / gridSize) * gridSize : p.y + dy
                            }))
                    };
                }));
            return;
        }
        if (selectionRect) {
            const screen = pointerToScreen(point);
            setSelectionRect((prev)=>prev ? {
                    ...prev,
                    width: screen.x - prev.x,
                    height: screen.y - prev.y
                } : prev);
            return;
        }
        if (lassoPath) {
            setLassoPath((prev)=>prev ? [
                    ...prev,
                    point
                ] : prev);
            return;
        }
        if (tool === 'laser') {
            setLaserPoint(point);
            return;
        }
        if (!isDrawing) return;
        if (shapeTools.has(tool)) {
            setShapePreview(point);
            return;
        }
        setCurrentStroke((prev)=>{
            const last = prev[prev.length - 1];
            if (last) {
                const dx = point.x - last.x;
                const dy = point.y - last.y;
                if (dx * dx + dy * dy < 0.7) return prev;
            }
            return [
                ...prev,
                point
            ];
        });
    };
    const handlePointerUp = (e)=>{
        e.currentTarget.releasePointerCapture(e.pointerId);
        if (isPanning) {
            setIsPanning(false);
            panStartRef.current = null;
            return;
        }
        if (connectorDrag) {
            setConnectorDrag(null);
            return;
        }
        if (selectionRect) {
            const x = Math.min(selectionRect.x, selectionRect.x + selectionRect.width);
            const y = Math.min(selectionRect.y, selectionRect.y + selectionRect.height);
            const width = Math.abs(selectionRect.width);
            const height = Math.abs(selectionRect.height);
            const selected = new Set();
            activePageStrokes.forEach((stroke)=>{
                const bounds = getStrokeBounds(stroke);
                if (!bounds) return;
                const topLeft = pointerToScreen({
                    x: bounds.x,
                    y: bounds.y
                });
                const bottomRight = pointerToScreen({
                    x: bounds.x + bounds.width,
                    y: bounds.y + bounds.height
                });
                const intersects = topLeft.x < x + width && bottomRight.x > x && topLeft.y < y + height && bottomRight.y > y;
                const contains = topLeft.x >= x && bottomRight.x <= x + width && topLeft.y >= y && bottomRight.y <= y + height;
                if (selectionHitMode === 'intersect' && intersects || selectionHitMode === 'contain' && contains) {
                    selected.add(stroke.id);
                }
            });
            setSelectedStrokeIds(selected);
            setSelectionRect(null);
            return;
        }
        if (lassoPath && lassoPath.length > 2) {
            const selected = new Set();
            activePageStrokes.forEach((stroke)=>{
                const strokePoints = stroke.points;
                if (strokePoints.some((p)=>pointInPolygon({
                        x: p.x,
                        y: p.y
                    }, lassoPath))) {
                    selected.add(stroke.id);
                }
            });
            setSelectedStrokeIds(selected);
            setLassoPath(null);
            return;
        }
        if (isRotatingSelection) {
            setIsRotatingSelection(false);
            rotateRef.current = null;
            selectionSnapshotRef.current.clear();
            logAudit('Rotated selection');
            return;
        }
        if (activeTransformHandle) {
            setActiveTransformHandle(null);
            transformRef.current = null;
            selectionSnapshotRef.current.clear();
            logAudit('Scaled selection');
            return;
        }
        if (isDraggingSelection) {
            setIsDraggingSelection(false);
            dragStartRef.current = null;
            selectionSnapshotRef.current.clear();
            logAudit('Moved selection');
            return;
        }
        if (tool === 'laser') {
            setLaserPoint(null);
            return;
        }
        if (!isDrawing) return;
        if (shapeTools.has(tool) && shapeStart && shapePreview) {
            const preset = TOOL_PRESET[tool];
            const fromResolved = tool === 'connector' ? resolveConnectorEndpoint(shapeStart, activePageStrokes) : {
                point: shapeStart
            };
            const toResolved = tool === 'connector' ? resolveConnectorEndpoint(shapePreview, activePageStrokes) : {
                point: shapePreview
            };
            const fromPoint = fromResolved.point;
            const toPoint = toResolved.point;
            const connectorPoints = tool === 'connector' ? routeOrthogonalConnector(fromPoint, toPoint, activePageStrokes.filter((stroke)=>stroke.shapeType !== 'connector').map((stroke)=>getStrokeBounds(stroke)).filter((bounds)=>Boolean(bounds))) : [
                fromPoint,
                toPoint
            ];
            const stroke = {
                id: Date.now().toString(),
                points: connectorPoints,
                color,
                width: Math.max(1, brushSize),
                opacity: preset.opacity,
                shapeType: tool,
                type: 'shape',
                userId: 'tutor',
                pageId: activePageId,
                zIndex: Math.max(0, ...activePageStrokes.map((s)=>s.zIndex || 0)) + 1,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                sourceStrokeId: tool === 'connector' ? fromResolved.sourceStrokeId : undefined,
                targetStrokeId: tool === 'connector' ? toResolved.sourceStrokeId : undefined,
                sourcePort: tool === 'connector' ? fromResolved.sourcePort : undefined,
                targetPort: tool === 'connector' ? toResolved.sourcePort : undefined
            };
            addTutorStroke(stroke);
            if (tool === 'connector') logAudit('Added orthogonal connector');
            setShapeStart(null);
            setShapePreview(null);
            setIsDrawing(false);
            return;
        }
        if (currentStroke.length === 0) {
            setIsDrawing(false);
            return;
        }
        const preset = TOOL_PRESET[tool];
        const stroke = {
            id: Date.now().toString(),
            points: currentStroke,
            color: tool === 'eraser' ? '#ffffff' : color,
            width: tool === 'eraser' ? preset.width : brushSize,
            opacity: preset.opacity,
            type: preset.strokeType,
            userId: 'tutor',
            pageId: activePageId,
            zIndex: Math.max(0, ...activePageStrokes.map((s)=>s.zIndex || 0)) + 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        addTutorStroke(stroke);
        setIsDrawing(false);
        setCurrentStroke([]);
    };
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[handleWheel]": (e)=>{
            e.preventDefault();
            const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
            const nextScale = Math.min(3, Math.max(0.35, viewport.scale * zoomFactor));
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const cursorX = e.clientX - rect.left;
            const cursorY = e.clientY - rect.top;
            const worldX = (cursorX - viewport.offsetX) / viewport.scale;
            const worldY = (cursorY - viewport.offsetY) / viewport.scale;
            setViewport({
                scale: nextScale,
                offsetX: cursorX - worldX * nextScale,
                offsetY: cursorY - worldY * nextScale
            });
        }
    }["TutorWhiteboardManager.useCallback[handleWheel]"], [
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            requestSnapshotTimeline();
        }
    }["TutorWhiteboardManager.useEffect"], [
        requestSnapshotTimeline
    ]);
    const exportCurrentBoard = ()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL('image/png');
        const fileName = `whiteboard_${roomId}_${Date.now()}.png`;
        exportAndAttachBoard({
            format: 'png',
            fileName,
            dataUrl,
            studentId: reviewStudentId || undefined
        });
    };
    const exportSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[exportSelection]": ()=>{
            if (!selectedBounds || !canvasRef.current) return;
            const canvas = canvasRef.current;
            const temp = document.createElement('canvas');
            const startX = Math.round(selectedBounds.x * viewport.scale + viewport.offsetX);
            const startY = Math.round(selectedBounds.y * viewport.scale + viewport.offsetY);
            const width = Math.max(1, Math.round(selectedBounds.width * viewport.scale));
            const height = Math.max(1, Math.round(selectedBounds.height * viewport.scale));
            temp.width = width;
            temp.height = height;
            const tctx = temp.getContext('2d');
            if (!tctx) return;
            tctx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);
            exportAndAttachBoard({
                format: 'png',
                fileName: `whiteboard_selection_${roomId}_${Date.now()}.png`,
                dataUrl: temp.toDataURL('image/png'),
                studentId: reviewStudentId || undefined
            });
        }
    }["TutorWhiteboardManager.useCallback[exportSelection]"], [
        exportAndAttachBoard,
        reviewStudentId,
        roomId,
        selectedBounds,
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const addPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[addPage]": ()=>{
            setPages({
                "TutorWhiteboardManager.useCallback[addPage]": (prev)=>{
                    const nextPageNumber = prev.length + 1;
                    const nextPageId = `page-${nextPageNumber}`;
                    const next = [
                        ...prev,
                        {
                            id: nextPageId,
                            label: `Page ${nextPageNumber}`
                        }
                    ];
                    setActivePageId(nextPageId);
                    return next;
                }
            }["TutorWhiteboardManager.useCallback[addPage]"]);
        }
    }["TutorWhiteboardManager.useCallback[addPage]"], []);
    const goToPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[goToPage]": (direction)=>{
            const currentIndex = pages.findIndex({
                "TutorWhiteboardManager.useCallback[goToPage].currentIndex": (page)=>page.id === activePageId
            }["TutorWhiteboardManager.useCallback[goToPage].currentIndex"]);
            if (currentIndex < 0) return;
            if (direction === 'prev' && currentIndex > 0) {
                setActivePageId(pages[currentIndex - 1].id);
            }
            if (direction === 'next' && currentIndex < pages.length - 1) {
                setActivePageId(pages[currentIndex + 1].id);
            }
        }
    }["TutorWhiteboardManager.useCallback[goToPage]"], [
        activePageId,
        pages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            const preset = TOOL_PRESET[tool];
            if (!preset) return;
            if (tool === 'eraser' || tool === 'highlighter' || tool === 'marker' || tool === 'calligraphy' || tool === 'pencil' || tool === 'pen') {
                setBrushSize(preset.width);
            }
        }
    }["TutorWhiteboardManager.useEffect"], [
        tool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            return ({
                "TutorWhiteboardManager.useEffect": ()=>{
                    if (importedAsset?.src) URL.revokeObjectURL(importedAsset.src);
                }
            })["TutorWhiteboardManager.useEffect"];
        }
    }["TutorWhiteboardManager.useEffect"], [
        importedAsset
    ]);
    const commitTextDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[commitTextDraft]": ()=>{
            if (!textDraft || !textDraft.value.trim()) {
                setTextDraft(null);
                return;
            }
            const value = textDraft.value.trim();
            const formattedText = textPreset === 'latex' ? `$$${value}$$` : textPreset === 'code' ? `\`\`\`\n${value}\n\`\`\`` : textPreset === 'table' ? `| Column A | Column B |\n|---|---|\n| ${value} |  |` : value;
            const stroke = {
                id: Date.now().toString(),
                points: [
                    {
                        x: textDraft.x,
                        y: textDraft.y
                    }
                ],
                color,
                width: 1,
                opacity: 1,
                type: 'text',
                text: formattedText,
                fontSize,
                fontFamily: textPreset === 'sticky' ? 'Caveat, ui-sans-serif, system-ui, sans-serif' : 'Inter, Segoe UI, system-ui, sans-serif',
                textStyle,
                userId: 'tutor',
                pageId: activePageId,
                zIndex: Math.max(0, ...activePageStrokes.map({
                    "TutorWhiteboardManager.useCallback[commitTextDraft]": (s)=>s.zIndex || 0
                }["TutorWhiteboardManager.useCallback[commitTextDraft]"])) + 1,
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            addTutorStroke(stroke);
            setTextDraft(null);
            logAudit('Added text', textPreset);
        }
    }["TutorWhiteboardManager.useCallback[commitTextDraft]"], [
        activePageId,
        activePageStrokes,
        addTutorStroke,
        color,
        fontSize,
        logAudit,
        textDraft,
        textPreset,
        textStyle
    ]);
    const saveNamedCheckpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[saveNamedCheckpoint]": ()=>{
            const name = checkpointName.trim() || `Checkpoint ${new Date().toLocaleTimeString()}`;
            setNamedCheckpoints({
                "TutorWhiteboardManager.useCallback[saveNamedCheckpoint]": (prev)=>[
                        {
                            id: `${Date.now()}`,
                            name,
                            createdAt: Date.now()
                        },
                        ...prev
                    ].slice(0, 30)
            }["TutorWhiteboardManager.useCallback[saveNamedCheckpoint]"]);
            requestSnapshotTimeline();
            logAudit('Saved checkpoint', name);
            setCheckpointName('');
        }
    }["TutorWhiteboardManager.useCallback[saveNamedCheckpoint]"], [
        checkpointName,
        logAudit,
        requestSnapshotTimeline
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            const handleKeyDown = {
                "TutorWhiteboardManager.useEffect.handleKeyDown": (event)=>{
                    if (event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA') return;
                    const step = event.shiftKey ? 20 : 6;
                    const key = event.key.toLowerCase();
                    if (key === 'v') setTool('select');
                    if (key === 'p') setTool('pen');
                    if (key === 'e') setTool('eraser');
                    if (key === 't') setTool('text');
                    if (key === 'h') setTool('hand');
                    if (selectedStrokeIds.size > 0) {
                        if (event.key === 'ArrowUp') {
                            event.preventDefault();
                            nudgeSelection(0, -step);
                        }
                        if (event.key === 'ArrowDown') {
                            event.preventDefault();
                            nudgeSelection(0, step);
                        }
                        if (event.key === 'ArrowLeft') {
                            event.preventDefault();
                            nudgeSelection(-step, 0);
                        }
                        if (event.key === 'ArrowRight') {
                            event.preventDefault();
                            nudgeSelection(step, 0);
                        }
                        if (event.key === '+') {
                            event.preventDefault();
                            scaleSelection(1.08);
                        }
                        if (event.key === '-') {
                            event.preventDefault();
                            scaleSelection(0.92);
                        }
                    }
                    if ((event.metaKey || event.ctrlKey) && key === 'z') {
                        event.preventDefault();
                        undoLastStroke(activePageId);
                    }
                }
            }["TutorWhiteboardManager.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "TutorWhiteboardManager.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["TutorWhiteboardManager.useEffect"];
        }
    }["TutorWhiteboardManager.useEffect"], [
        activePageId,
        nudgeSelection,
        scaleSelection,
        selectedStrokeIds.size,
        undoLastStroke
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            let rafId = 0;
            let lastTs = performance.now();
            let frameCount = 0;
            const tick = {
                "TutorWhiteboardManager.useEffect.tick": (ts)=>{
                    frameCount += 1;
                    if (ts - lastTs >= 1000) {
                        setFps(Math.round(frameCount * 1000 / (ts - lastTs)));
                        frameCount = 0;
                        lastTs = ts;
                    }
                    rafId = requestAnimationFrame(tick);
                }
            }["TutorWhiteboardManager.useEffect.tick"];
            rafId = requestAnimationFrame(tick);
            return ({
                "TutorWhiteboardManager.useEffect": ()=>cancelAnimationFrame(rafId)
            })["TutorWhiteboardManager.useEffect"];
        }
    }["TutorWhiteboardManager.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TutorWhiteboardManager.useEffect": ()=>{
            if (!srAnnouncement) return;
            const timer = window.setTimeout({
                "TutorWhiteboardManager.useEffect.timer": ()=>setSrAnnouncement('')
            }["TutorWhiteboardManager.useEffect.timer"], 1200);
            return ({
                "TutorWhiteboardManager.useEffect": ()=>window.clearTimeout(timer)
            })["TutorWhiteboardManager.useEffect"];
        }
    }["TutorWhiteboardManager.useEffect"], [
        srAnnouncement
    ]);
    const cursorColorForId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TutorWhiteboardManager.useCallback[cursorColorForId]": (userId)=>{
            const palette = [
                '#2563eb',
                '#7c3aed',
                '#059669',
                '#dc2626',
                '#ea580c',
                '#0891b2',
                '#ca8a04'
            ];
            let hash = 0;
            for(let i = 0; i < userId.length; i += 1)hash = hash * 31 + userId.charCodeAt(i) | 0;
            return palette[Math.abs(hash) % palette.length];
        }
    }["TutorWhiteboardManager.useCallback[cursorColorForId]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-white rounded-lg border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-2 border-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 1743,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Whiteboard"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 1744,
                                columnNumber: 11
                            }, this),
                            isBroadcasting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "destructive",
                                className: "animate-pulse",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "w-3 h-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1747,
                                        columnNumber: 15
                                    }, this),
                                    "Broadcasting"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 1746,
                                columnNumber: 13
                            }, this),
                            viewingStudentId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "secondary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                        className: "w-3 h-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1753,
                                        columnNumber: 15
                                    }, this),
                                    "Viewing Student"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 1752,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                        lineNumber: 1742,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: isLayerLocked ? 'destructive' : 'outline',
                                size: "sm",
                                disabled: !isConnected,
                                title: !isConnected ? 'Connect to the class to lock student boards' : isLayerLocked ? 'Unlock so students can draw again' : 'Lock student boards so only you can draw',
                                onClick: ()=>toggleLayerLock(!isLayerLocked),
                                children: isLayerLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            className: "w-4 h-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 1769,
                                            columnNumber: 17
                                        }, this),
                                        "Unlock Student Layers"
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                            className: "w-4 h-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 1774,
                                            columnNumber: 17
                                        }, this),
                                        "Lock Student Layers"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 1760,
                                columnNumber: 11
                            }, this),
                            isBroadcasting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "destructive",
                                size: "sm",
                                onClick: stopBroadcast,
                                title: "Stop sending your board to students",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1781,
                                        columnNumber: 15
                                    }, this),
                                    "Stop Broadcast"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 1780,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "default",
                                size: "sm",
                                disabled: !isConnected,
                                title: !isConnected ? 'Connect to the class to broadcast your board' : 'Send your whiteboard to all students in real time',
                                onClick: startBroadcast,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1792,
                                        columnNumber: 15
                                    }, this),
                                    "Broadcast"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 1785,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                        lineNumber: 1759,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                lineNumber: 1741,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 border-b bg-slate-50/95 px-4 py-2 backdrop-blur",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                {
                                    id: 'pencil',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"],
                                    label: 'Pencil'
                                },
                                {
                                    id: 'pen',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__["PenLine"],
                                    label: 'Pen'
                                },
                                {
                                    id: 'marker',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dot$3e$__["Dot"],
                                    label: 'Marker'
                                },
                                {
                                    id: 'highlighter',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$highlighter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Highlighter$3e$__["Highlighter"],
                                    label: 'Highlighter'
                                },
                                {
                                    id: 'calligraphy',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusCircle$3e$__["MinusCircle"],
                                    label: 'Calligraphy'
                                },
                                {
                                    id: 'eraser',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"],
                                    label: 'Eraser'
                                }
                            ].map(({ id, icon: Icon, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTool(id),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-md px-2 py-1.5 transition-colors", tool === id ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'),
                                    title: label,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1820,
                                        columnNumber: 17
                                    }, this)
                                }, id, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1811,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1802,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                {
                                    id: 'line',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"],
                                    label: 'Line'
                                },
                                {
                                    id: 'arrow',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"],
                                    label: 'Arrow'
                                },
                                {
                                    id: 'rectangle',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rectangle$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RectangleHorizontal$3e$__["RectangleHorizontal"],
                                    label: 'Rectangle'
                                },
                                {
                                    id: 'circle',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"],
                                    label: 'Circle'
                                },
                                {
                                    id: 'triangle',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__["Triangle"],
                                    label: 'Triangle'
                                },
                                {
                                    id: 'connector',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"],
                                    label: 'Connector'
                                },
                                {
                                    id: 'text',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"],
                                    label: 'Text'
                                },
                                {
                                    id: 'laser',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"],
                                    label: 'Laser Pointer'
                                },
                                {
                                    id: 'select',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"],
                                    label: 'Select'
                                },
                                {
                                    id: 'hand',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Move$3e$__["Move"],
                                    label: 'Pan'
                                }
                            ].map(({ id, icon: Icon, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTool(id),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-md px-2 py-1.5 transition-colors", tool === id ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'),
                                    title: label,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1847,
                                        columnNumber: 17
                                    }, this)
                                }, id, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1838,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1825,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                COLORS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setColor(c),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-6 w-6 rounded-full border transition-all", color === c ? 'scale-110 border-slate-600' : 'border-transparent'),
                                        style: {
                                            backgroundColor: c
                                        },
                                        title: c
                                    }, c, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1854,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "color",
                                    value: customColor,
                                    onChange: (e)=>{
                                        setCustomColor(e.target.value);
                                        setColor(e.target.value);
                                    },
                                    className: "h-6 w-8 cursor-pointer rounded border bg-transparent p-0",
                                    title: "Custom color"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1865,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1852,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Stroke"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1878,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                    value: [
                                        brushSize
                                    ],
                                    onValueChange: ([value])=>setBrushSize(value),
                                    min: 1,
                                    max: 32,
                                    step: 1,
                                    className: "w-24"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1879,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-7 text-xs font-medium text-slate-600",
                                    children: brushSize
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1887,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1877,
                            columnNumber: 11
                        }, this),
                        tool === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Font"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1892,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                    value: [
                                        fontSize
                                    ],
                                    onValueChange: ([value])=>setFontSize(value),
                                    min: 14,
                                    max: 56,
                                    step: 1,
                                    className: "w-24"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1893,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-7 text-xs font-medium text-slate-600",
                                    children: fontSize
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1901,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1891,
                            columnNumber: 13
                        }, this),
                        tool === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                'plain',
                                'latex',
                                'code',
                                'table',
                                'sticky'
                            ].map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: textPreset === preset ? 'default' : 'ghost',
                                    size: "sm",
                                    className: "h-7 px-2 text-xs capitalize",
                                    title: `Text preset: ${preset}`,
                                    "aria-label": `Text preset: ${preset}`,
                                    onClick: ()=>setTextPreset(preset),
                                    children: preset
                                }, preset, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1907,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1905,
                            columnNumber: 13
                        }, this),
                        tool === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: textStyle.bold ? 'default' : 'ghost',
                                    className: "h-7 px-2 text-xs",
                                    title: "Bold text",
                                    onClick: ()=>setTextStyle((prev)=>({
                                                ...prev,
                                                bold: !prev.bold
                                            })),
                                    children: "B"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1923,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: textStyle.italic ? 'default' : 'ghost',
                                    className: "h-7 px-2 text-xs italic",
                                    title: "Italic text",
                                    onClick: ()=>setTextStyle((prev)=>({
                                                ...prev,
                                                italic: !prev.italic
                                            })),
                                    children: "I"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1924,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: textStyle.align === 'left' ? 'default' : 'ghost',
                                    className: "h-7 px-2 text-xs",
                                    title: "Align left",
                                    onClick: ()=>setTextStyle((prev)=>({
                                                ...prev,
                                                align: 'left'
                                            })),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1925,
                                        columnNumber: 209
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1925,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: textStyle.align === 'center' ? 'default' : 'ghost',
                                    className: "h-7 px-2 text-xs",
                                    title: "Align center",
                                    onClick: ()=>setTextStyle((prev)=>({
                                                ...prev,
                                                align: 'center'
                                            })),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__["AlignCenter"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1926,
                                        columnNumber: 215
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1926,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: textStyle.align === 'right' ? 'default' : 'ghost',
                                    className: "h-7 px-2 text-xs",
                                    title: "Align right",
                                    onClick: ()=>setTextStyle((prev)=>({
                                                ...prev,
                                                align: 'right'
                                            })),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__["AlignRight"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 1927,
                                        columnNumber: 212
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1927,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1922,
                            columnNumber: 13
                        }, this),
                        tool === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: selectionMode === 'rect' ? 'default' : 'ghost',
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Selection mode: rectangle",
                                    onClick: ()=>setSelectionMode('rect'),
                                    children: "Rect"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1932,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: selectionMode === 'lasso' ? 'default' : 'ghost',
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Selection mode: lasso",
                                    onClick: ()=>setSelectionMode('lasso'),
                                    children: "Lasso"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1941,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: selectionHitMode === 'intersect' ? 'default' : 'ghost',
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Select items that intersect selection area",
                                    onClick: ()=>setSelectionHitMode('intersect'),
                                    children: "Intersect"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1950,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: selectionHitMode === 'contain' ? 'default' : 'ghost',
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Select only items fully contained in selection area",
                                    onClick: ()=>setSelectionHitMode('contain'),
                                    children: "Contain"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1959,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1931,
                            columnNumber: 13
                        }, this),
                        selectedStrokeIds.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Nudge selection up",
                                    onClick: ()=>nudgeSelection(0, -10),
                                    children: "Up"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1972,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Nudge selection left",
                                    onClick: ()=>nudgeSelection(-10, 0),
                                    children: "Left"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1975,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Nudge selection right",
                                    onClick: ()=>nudgeSelection(10, 0),
                                    children: "Right"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1978,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Nudge selection down",
                                    onClick: ()=>nudgeSelection(0, 10),
                                    children: "Down"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1981,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Scale selected items down",
                                    onClick: ()=>scaleSelection(0.9),
                                    children: "Scale -"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1984,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Scale selected items up",
                                    onClick: ()=>scaleSelection(1.1),
                                    children: "Scale +"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1987,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Select all with same color",
                                    onClick: ()=>selectByAttribute('color'),
                                    children: "Same Color"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1990,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Select all with same stroke type",
                                    onClick: ()=>selectByAttribute('type'),
                                    children: "Same Type"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1993,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Select all in same layer",
                                    onClick: ()=>selectByAttribute('layer'),
                                    children: "Same Layer"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1996,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Duplicate selection",
                                    onClick: duplicateSelection,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                            className: "mr-1 h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2000,
                                            columnNumber: 17
                                        }, this),
                                        " Dup"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 1999,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Group selected objects",
                                    onClick: groupSelection,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$group$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Group$3e$__["Group"], {
                                            className: "mr-1 h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2003,
                                            columnNumber: 17
                                        }, this),
                                        " Group"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2002,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Ungroup selected objects",
                                    onClick: ungroupSelection,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ungroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ungroup$3e$__["Ungroup"], {
                                            className: "mr-1 h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2006,
                                            columnNumber: 17
                                        }, this),
                                        " Ungroup"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2005,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Bring selected to front",
                                    onClick: ()=>reorderSelection('front'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bring$2d$to$2d$front$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BringToFront$3e$__["BringToFront"], {
                                            className: "mr-1 h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2009,
                                            columnNumber: 17
                                        }, this),
                                        " Front"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2008,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Bring selected forward",
                                    onClick: ()=>reorderSelection('forward'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "mr-1 h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2012,
                                            columnNumber: 17
                                        }, this),
                                        " Forward"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2011,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Send selected to back",
                                    onClick: ()=>reorderSelection('back'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$to$2d$back$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SendToBack$3e$__["SendToBack"], {
                                            className: "mr-1 h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2015,
                                            columnNumber: 17
                                        }, this),
                                        " Back"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2014,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Lock selected objects",
                                    onClick: ()=>lockSelection(true),
                                    children: "Lock"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2017,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Unlock selected objects",
                                    onClick: ()=>lockSelection(false),
                                    children: "Unlock"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2020,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Push selection as class exemplar",
                                    onClick: pushSelectionAsExemplar,
                                    children: "Exemplar"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2023,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 1971,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: branchNameInput,
                                    onChange: (e)=>setBranchNameInput(e.target.value),
                                    placeholder: "Branch name",
                                    className: "h-7 w-28 rounded border px-2 text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2029,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    onClick: ()=>{
                                        if (!branchNameInput.trim()) return;
                                        createBoardBranch(branchNameInput);
                                        setBranchNameInput('');
                                    },
                                    title: "Create board branch",
                                    children: "Branch"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2035,
                                    columnNumber: 13
                                }, this),
                                availableBranches.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "h-7 rounded border px-2 text-xs",
                                    onChange: (e)=>e.target.value && switchBoardBranch(e.target.value),
                                    defaultValue: "",
                                    "aria-label": "Switch board branch",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            disabled: true,
                                            children: "Switch branch"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2055,
                                            columnNumber: 17
                                        }, this),
                                        availableBranches.map((branch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: branch,
                                                children: branch
                                            }, branch, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                lineNumber: 2057,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2049,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2028,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ml-auto flex items-center gap-1 rounded-md border bg-white px-1 py-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-7 w-7",
                                    onClick: ()=>goToPage('prev'),
                                    disabled: activePageIndex <= 0,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2071,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2064,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "min-w-[72px] text-center text-xs font-medium",
                                    children: pages.find((page)=>page.id === activePageId)?.label || 'Page'
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2073,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-7 w-7",
                                    onClick: ()=>goToPage('next'),
                                    disabled: activePageIndex >= pages.length - 1,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2083,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2076,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-7 w-7",
                                    onClick: addPage,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2086,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2085,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2063,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            onClick: ()=>undoLastStroke(activePageId),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo$3e$__["Undo"], {
                                    className: "mr-1 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2090,
                                    columnNumber: 13
                                }, this),
                                " Undo"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2089,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            onClick: ()=>clearMyWhiteboard(activePageId),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "mr-1 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2093,
                                    columnNumber: 13
                                }, this),
                                " Clear"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2092,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            onClick: ()=>setShowHighContrast((prev)=>!prev),
                            children: showHighContrast ? 'Standard' : 'High Contrast'
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2095,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: snapEnabled ? 'default' : 'outline',
                            size: "sm",
                            title: "Toggle snap-to-grid",
                            onClick: ()=>setSnapEnabled((prev)=>!prev),
                            children: "Snap"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: gridVisible ? 'default' : 'outline',
                            size: "sm",
                            title: "Show or hide grid",
                            onClick: ()=>setGridVisible((prev)=>!prev),
                            children: "Grid"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Grid"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                    value: [
                                        gridSize
                                    ],
                                    onValueChange: ([value])=>setGridSize(value),
                                    min: 8,
                                    max: 64,
                                    step: 2,
                                    className: "w-20"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2110,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-7 text-xs font-medium text-slate-600",
                                    children: gridSize
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2111,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "inline-flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    accept: "image/*,application/pdf",
                                    className: "hidden",
                                    onChange: (event)=>{
                                        const file = event.target.files?.[0];
                                        if (!file) return;
                                        const src = URL.createObjectURL(file);
                                        setImportedAsset({
                                            kind: file.type.includes('pdf') ? 'pdf' : 'image',
                                            src,
                                            name: file.name
                                        });
                                        setPdfPage(1);
                                        logAudit('Imported asset', file.name);
                                        event.currentTarget.value = '';
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex h-9 cursor-pointer items-center rounded-md border px-3 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                            className: "mr-1 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2129,
                                            columnNumber: 15
                                        }, this),
                                        " Import"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2128,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            title: "Export full whiteboard page",
                            onClick: exportCurrentBoard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "mr-1 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2133,
                                    columnNumber: 13
                                }, this),
                                " Export"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            title: "Export as SVG vectors",
                            onClick: exportSvg,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "mr-1 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2136,
                                    columnNumber: 13
                                }, this),
                                " SVG"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2135,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            title: "Export current selection",
                            onClick: exportSelection,
                            disabled: !selectedBounds,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "mr-1 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2139,
                                    columnNumber: 13
                                }, this),
                                " Export Sel"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            title: "Broadcast current viewport focus to class",
                            onClick: broadcastViewport,
                            children: "Broadcast View"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: showMiniMap ? 'default' : 'outline',
                            size: "sm",
                            title: "Toggle collaboration minimap",
                            onClick: ()=>setShowMiniMap((prev)=>!prev),
                            children: "Minimap"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2144,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: showPerfHud ? 'default' : 'outline',
                            size: "sm",
                            title: "Toggle performance HUD",
                            onClick: ()=>setShowPerfHud((prev)=>!prev),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                    className: "mr-1 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2148,
                                    columnNumber: 13
                                }, this),
                                " Perf"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: checkpointName,
                                    onChange: (event)=>setCheckpointName(event.target.value),
                                    placeholder: "Checkpoint",
                                    className: "h-7 w-28 rounded border px-2 text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: "outline",
                                    className: "h-7 text-xs",
                                    title: "Save named checkpoint",
                                    onClick: saveNamedCheckpoint,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__["WandSparkles"], {
                                            className: "mr-1 h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2158,
                                            columnNumber: 15
                                        }, this),
                                        " Save"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2157,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "outline",
                            className: "text-xs",
                            children: [
                                Math.round(viewport.scale * 100),
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2161,
                            columnNumber: 11
                        }, this),
                        selectedStrokeIds.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "secondary",
                            className: "text-xs",
                            children: [
                                selectedStrokeIds.size,
                                " selected"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2165,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "outline",
                            className: "text-xs",
                            children: [
                                "CP ",
                                namedCheckpoints.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2169,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                    lineNumber: 1801,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                lineNumber: 1800,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                        value: activeTab,
                        onValueChange: setActiveTab,
                        className: "h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                className: "absolute top-2 left-2 z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                        value: "my-board",
                                        children: "My Board"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                        value: "student-boards",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                className: "w-4 h-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                lineNumber: 2183,
                                                columnNumber: 17
                                            }, this),
                                            "Students (",
                                            activeStudentBoards.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                        value: "pdf-board",
                                        children: "PDF Tutoring"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 2180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "my-board",
                                className: "h-full m-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: boardViewportRef,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-full h-full", showHighContrast && "contrast-125 saturate-150"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute left-2 top-14 z-20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f5b$locale$5d2f$tutor$2f$live$2d$class$2f$components$2f$CourseStructureLinkPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseStructureLinkPanel"], {
                                                        initialCourseId: initialCourseId,
                                                        classSubject: classSubject,
                                                        onMakeVisibleToStudents: onDocumentVisibleToStudents
                                                    }, void 0, false, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                        lineNumber: 2193,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2192,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                                    ref: canvasRef,
                                                    onPointerDown: handlePointerDown,
                                                    onPointerMove: handlePointerMove,
                                                    onPointerUp: handlePointerUp,
                                                    onPointerLeave: handlePointerUp,
                                                    onWheel: handleWheel,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full h-full border rounded-lg bg-white", (freeDrawTools.has(tool) || shapeTools.has(tool) || tool === 'text') && "cursor-crosshair", tool === 'laser' && "cursor-none", tool === 'hand' && "cursor-grab", tool === 'select' && "cursor-default"),
                                                    "aria-label": "Tutor whiteboard canvas"
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2199,
                                                    columnNumber: 19
                                                }, this),
                                                importedAsset?.kind === 'image' && // eslint-disable-next-line @next/next/no-img-element
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: importedAsset.src,
                                                    alt: importedAsset.name,
                                                    className: "pointer-events-none absolute inset-0 h-full w-full rounded-lg object-contain opacity-30"
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2217,
                                                    columnNumber: 21
                                                }, this),
                                                importedAsset?.kind === 'pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                                            src: `${importedAsset.src}#page=${pdfPage}`,
                                                            title: importedAsset.name,
                                                            className: "pointer-events-none absolute inset-0 h-full w-full rounded-lg opacity-25"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2225,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute right-3 top-16 z-30 flex items-center gap-1 rounded-md bg-white/90 p-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "ghost",
                                                                    className: "h-7 px-2",
                                                                    onClick: ()=>setPdfPage((prev)=>Math.max(1, prev - 1)),
                                                                    children: "Prev"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2231,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-medium",
                                                                    children: [
                                                                        "PDF p.",
                                                                        pdfPage
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2234,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "ghost",
                                                                    className: "h-7 px-2",
                                                                    onClick: ()=>setPdfPage((prev)=>prev + 1),
                                                                    children: "Next"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2235,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2230,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                textDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute z-30",
                                                    style: {
                                                        left: textDraft.x,
                                                        top: textDraft.y
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-80 rounded-md border border-slate-300 bg-white/95 p-2 shadow-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                autoFocus: true,
                                                                value: textDraft.value,
                                                                rows: 4,
                                                                onChange: (event)=>setTextDraft((prev)=>prev ? {
                                                                            ...prev,
                                                                            value: event.target.value
                                                                        } : prev),
                                                                onKeyDown: (event)=>{
                                                                    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                                                                        event.preventDefault();
                                                                        commitTextDraft();
                                                                    }
                                                                    if (event.key === 'Escape') {
                                                                        event.preventDefault();
                                                                        setTextDraft(null);
                                                                    }
                                                                },
                                                                placeholder: "Type here... (Cmd/Ctrl + Enter to place)",
                                                                className: "w-full resize-none rounded-md border border-slate-200 bg-white p-2 text-sm outline-none ring-offset-2 focus:ring-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2247,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-2 flex items-center justify-end gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        variant: "outline",
                                                                        onClick: ()=>setTextDraft(null),
                                                                        children: "Cancel"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                        lineNumber: 2266,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        onClick: commitTextDraft,
                                                                        children: "Place"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                        lineNumber: 2269,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2265,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                        lineNumber: 2246,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2242,
                                                    columnNumber: 21
                                                }, this),
                                                Array.from(remoteCursors.values()).map((cursor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute pointer-events-none z-10",
                                                        style: {
                                                            left: cursor.x,
                                                            top: cursor.y,
                                                            transform: 'translate(-50%, -50%)'
                                                        },
                                                        children: [
                                                            cursor.pointerMode === 'laser' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-10 w-10 rounded-full bg-red-500/30 ring-2 ring-red-500/60 blur-[1px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2283,
                                                                columnNumber: 25
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-2.5 w-2.5 rounded-full border border-white shadow",
                                                                style: {
                                                                    backgroundColor: cursorColorForId(cursor.userId)
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2285,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] text-white",
                                                                style: {
                                                                    backgroundColor: cursorColorForId(cursor.userId)
                                                                },
                                                                children: [
                                                                    cursor.name,
                                                                    " ",
                                                                    Date.now() - cursor.lastUpdated > 2000 ? '(idle)' : ''
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2290,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, cursor.userId, true, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                        lineNumber: 2277,
                                                        columnNumber: 21
                                                    }, this)),
                                                spotlight.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 pointer-events-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 bg-black/35"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2300,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute border-2 border-yellow-300 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]", spotlight.mode === 'pen' ? 'rounded-full' : 'rounded-md'),
                                                            style: {
                                                                left: spotlight.x,
                                                                top: spotlight.y,
                                                                width: spotlight.width,
                                                                height: spotlight.height
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2301,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2299,
                                                    columnNumber: 21
                                                }, this),
                                                showMiniMap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-3 right-3 z-30 h-28 w-44 rounded-md border bg-white/90 p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-1 text-[10px] font-semibold uppercase text-slate-500",
                                                            children: "Presence Minimap"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2317,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative h-[88px] w-full overflow-hidden rounded bg-slate-100",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute border border-blue-500/70 bg-blue-200/20",
                                                                    style: {
                                                                        left: `${Math.max(0, Math.min(92, -viewport.offsetX / 1600 * 100))}%`,
                                                                        top: `${Math.max(0, Math.min(92, -viewport.offsetY / 900 * 100))}%`,
                                                                        width: `${Math.max(8, Math.min(100, 420 / Math.max(0.4, viewport.scale) / 16))}%`,
                                                                        height: `${Math.max(8, Math.min(100, 240 / Math.max(0.4, viewport.scale) / 9))}%`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2319,
                                                                    columnNumber: 25
                                                                }, this),
                                                                Array.from(remoteCursors.values()).map((cursor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white",
                                                                        style: {
                                                                            left: `${Math.max(0, Math.min(100, cursor.x / 1600 * 100))}%`,
                                                                            top: `${Math.max(0, Math.min(100, cursor.y / 900 * 100))}%`,
                                                                            backgroundColor: cursorColorForId(cursor.userId)
                                                                        }
                                                                    }, `mini-${cursor.userId}`, false, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                        lineNumber: 2329,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2318,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2316,
                                                    columnNumber: 21
                                                }, this),
                                                showPerfHud && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-3 left-3 z-30 rounded-md border bg-white/90 px-2 py-1 text-xs",
                                                    children: [
                                                        "FPS ",
                                                        fps,
                                                        " | Strokes ",
                                                        activePageStrokes.length,
                                                        " | Cursors ",
                                                        remoteCursors.size
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2343,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "sr-only",
                                                    "aria-live": "polite",
                                                    children: srAnnouncement
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2347,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2191,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-md border p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-2 flex items-center gap-2 text-sm font-semibold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3X3$3e$__["Grid3X3"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2352,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Layer Model"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2351,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: layerConfig.map((layer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between gap-2 text-xs",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded border px-2 py-1", activeLayerId === layer.id ? 'bg-blue-100 border-blue-400' : 'bg-white'),
                                                                            onClick: ()=>setActiveLayerId(layer.id),
                                                                            children: layer.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2358,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    size: "sm",
                                                                                    variant: layer.visible ? 'default' : 'outline',
                                                                                    className: "h-6 px-2 text-[11px]",
                                                                                    onClick: ()=>setLayerConfig(layerConfig.map((item)=>item.id === layer.id ? {
                                                                                                ...item,
                                                                                                visible: !item.visible
                                                                                            } : item)),
                                                                                    children: layer.visible ? 'Visible' : 'Hidden'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                    lineNumber: 2368,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    size: "sm",
                                                                                    variant: layer.locked ? 'destructive' : 'outline',
                                                                                    className: "h-6 px-2 text-[11px]",
                                                                                    onClick: ()=>setLayerLock(layer.id, !layer.locked),
                                                                                    children: layer.locked ? 'Locked' : 'Unlocked'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                    lineNumber: 2380,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2367,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, layer.id, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2357,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2355,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2350,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-md border p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-2 flex items-center gap-2 text-sm font-semibold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2395,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Spotlight + AI"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2394,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: spotlight.enabled ? 'default' : 'outline',
                                                                    onClick: ()=>updateSpotlight({
                                                                            ...spotlight,
                                                                            enabled: !spotlight.enabled
                                                                        }),
                                                                    children: spotlight.enabled ? 'Disable Spotlight' : 'Enable Spotlight'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2399,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "outline",
                                                                    onClick: ()=>updateSpotlight({
                                                                            ...spotlight,
                                                                            mode: spotlight.mode === 'rectangle' ? 'pen' : 'rectangle',
                                                                            width: spotlight.mode === 'rectangle' ? 160 : 420,
                                                                            height: spotlight.mode === 'rectangle' ? 160 : 220
                                                                        }),
                                                                    children: "Spotlight Pen Mode"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2408,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "outline",
                                                                    onClick: ()=>requestAIRegionHint({
                                                                            x: spotlight.x,
                                                                            y: spotlight.y,
                                                                            width: spotlight.width,
                                                                            height: spotlight.height
                                                                        }, 'Tutor review request'),
                                                                    children: "AI Region Hint"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2422,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "outline",
                                                                    onClick: ()=>setAssignmentOverlayMode('none'),
                                                                    children: "Template: None"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2436,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "outline",
                                                                    onClick: ()=>setAssignmentOverlayMode('graph-paper'),
                                                                    children: "Template: Graph"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2439,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "outline",
                                                                    onClick: ()=>setAssignmentOverlayMode('coordinate-plane'),
                                                                    children: "Template: Coordinate"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2442,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2398,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2393,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-md border p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-2 flex items-center gap-2 text-sm font-semibold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__["Clock3"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2449,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Timeline + Export"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2448,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2 text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: [
                                                                        snapshots.length,
                                                                        " snapshots in timeline"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2453,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[11px] text-gray-500",
                                                                    children: [
                                                                        "Delta vs live: ",
                                                                        Math.max(0, myStrokes.length - (timelinePreviewIndex !== null ? snapshots[timelinePreviewIndex]?.strokes.length || 0 : myStrokes.length)),
                                                                        " stroke(s)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2454,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[11px] text-gray-500",
                                                                    children: [
                                                                        "Active page strokes: ",
                                                                        activePageStrokes.length
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2457,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "range",
                                                                            min: 0,
                                                                            max: Math.max(0, snapshots.length - 1),
                                                                            value: timelinePreviewIndex ?? 0,
                                                                            onChange: (e)=>setTimelinePreviewIndex(Number(e.target.value)),
                                                                            disabled: snapshots.length === 0,
                                                                            className: "w-full"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2461,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            size: "sm",
                                                                            variant: "ghost",
                                                                            onClick: ()=>setTimelinePreviewIndex(null),
                                                                            children: "Live"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2470,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2460,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            size: "sm",
                                                                            variant: "outline",
                                                                            onClick: requestSnapshotTimeline,
                                                                            children: "Refresh Timeline"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2475,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            size: "sm",
                                                                            onClick: exportCurrentBoard,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                                    className: "w-3.5 h-3.5 mr-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                    lineNumber: 2479,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                "Export Attach"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2478,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2474,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2452,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2447,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-md border p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-2 flex items-center gap-2 text-sm font-semibold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__["Clock3"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2487,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Audit Trail"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2486,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "max-h-24 space-y-1 overflow-auto text-[11px]",
                                                            children: auditTrail.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-500",
                                                                children: "No actions yet."
                                                            }, void 0, false, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2492,
                                                                columnNumber: 25
                                                            }, this) : auditTrail.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded border px-2 py-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-medium",
                                                                            children: entry.action
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2496,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        entry.details ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-slate-500",
                                                                            children: entry.details
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2497,
                                                                            columnNumber: 46
                                                                        }, this) : null,
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-[10px] text-slate-400",
                                                                            children: new Date(entry.at).toLocaleTimeString()
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2498,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, `${entry.at}-${entry.action}`, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2495,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2490,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2485,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2349,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2190,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 2189,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "student-boards",
                                className: "h-full m-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                    className: "h-full p-4 space-y-4",
                                    children: [
                                        submissions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 border rounded-lg p-3 bg-amber-50/50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-sm font-semibold",
                                                            children: "Submission Queue"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2513,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    children: [
                                                                        pendingSubmissions.length,
                                                                        " pending"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2515,
                                                                    columnNumber: 25
                                                                }, this),
                                                                pendingSubmissions.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "outline",
                                                                    onClick: markAllSubmissionsReviewed,
                                                                    children: "Mark All Reviewed"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2517,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2514,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2512,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: submissions.map((submission)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between rounded-md border bg-white px-2 py-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium",
                                                                            children: submission.studentName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2527,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: [
                                                                                submission.strokeCount,
                                                                                " strokes • ",
                                                                                new Date(submission.submittedAt).toLocaleTimeString([], {
                                                                                    hour: '2-digit',
                                                                                    minute: '2-digit'
                                                                                })
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2528,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2526,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "outline",
                                                                            size: "sm",
                                                                            onClick: ()=>viewStudentWhiteboard(submission.studentId),
                                                                            children: "View"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2533,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "secondary",
                                                                            size: "sm",
                                                                            onClick: ()=>openReviewPanel(submission.studentId),
                                                                            children: "Review"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2536,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: submission.pinned ? 'default' : 'outline',
                                                                            size: "sm",
                                                                            onClick: ()=>pinSubmission(submission.studentId, !submission.pinned),
                                                                            children: [
                                                                                submission.pinned ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PinOff$3e$__["PinOff"], {
                                                                                    className: "w-3.5 h-3.5 mr-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                    lineNumber: 2544,
                                                                                    columnNumber: 52
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__["Pin"], {
                                                                                    className: "w-3.5 h-3.5 mr-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                    lineNumber: 2544,
                                                                                    columnNumber: 94
                                                                                }, this),
                                                                                submission.pinned ? 'Unpin' : 'Pin'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2539,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        !submission.reviewed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            size: "sm",
                                                                            onClick: ()=>markSubmissionReviewed(submission.studentId),
                                                                            children: "Mark Reviewed"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2548,
                                                                            columnNumber: 31
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            className: "bg-green-100 text-green-700 border-green-200",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                    className: "w-3 h-3 mr-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                    lineNumber: 2553,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                "Reviewed"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2552,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2532,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, submission.studentId, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2525,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2523,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2511,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-3 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-semibold",
                                                    children: "Student Boards"
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2564,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 flex-wrap justify-end",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            variant: submissionFilter === 'all' ? 'default' : 'outline',
                                                            onClick: ()=>setSubmissionFilter('all'),
                                                            children: "All"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2566,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            variant: submissionFilter === 'submitted' ? 'default' : 'outline',
                                                            onClick: ()=>setSubmissionFilter('submitted'),
                                                            children: "Submitted Only"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2573,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            variant: submissionFilter === 'pending' ? 'default' : 'outline',
                                                            onClick: ()=>setSubmissionFilter('pending'),
                                                            children: "Pending"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2580,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            variant: submissionFilter === 'reviewed' ? 'default' : 'outline',
                                                            onClick: ()=>setSubmissionFilter('reviewed'),
                                                            children: "Reviewed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2587,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2565,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2563,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-4",
                                            children: [
                                                visibleStudents.map((student)=>{
                                                    const wb = studentWhiteboards.get(student.id);
                                                    const isViewing = viewingStudentId === student.id;
                                                    const submission = submissionByStudentId.get(student.id);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border rounded-lg p-3 cursor-pointer transition-all", isViewing ? 'ring-2 ring-blue-500' : 'hover:border-blue-300', wb?.visibility === 'private' && "opacity-50"),
                                                        onClick: ()=>{
                                                            if (wb && wb.visibility !== 'private') {
                                                                viewStudentWhiteboard(student.id);
                                                            }
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium text-sm",
                                                                        children: student.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                        lineNumber: 2617,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1",
                                                                        children: [
                                                                            submission && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs", submission.reviewed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'),
                                                                                children: submission.reviewed ? 'Reviewed' : 'Submitted'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                lineNumber: 2620,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            wb && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: wb.visibility === 'public' ? 'default' : 'secondary',
                                                                                className: "text-xs",
                                                                                children: [
                                                                                    wb.visibility === 'public' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                                        className: "w-3 h-3 mr-1"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                        lineNumber: 2631,
                                                                                        columnNumber: 63
                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                                                        className: "w-3 h-3 mr-1"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                        lineNumber: 2631,
                                                                                        columnNumber: 98
                                                                                    }, this),
                                                                                    wb.visibility
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                lineNumber: 2630,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            !wb && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "outline",
                                                                                className: "text-xs",
                                                                                children: "No activity"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                lineNumber: 2636,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                size: "sm",
                                                                                variant: moderationState.mutedStudentIds.includes(student.id) ? 'destructive' : 'outline',
                                                                                className: "h-6 px-2 text-[11px]",
                                                                                onClick: (e)=>{
                                                                                    e.stopPropagation();
                                                                                    setDrawMuteForStudent(student.id, !moderationState.mutedStudentIds.includes(student.id));
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                                                                                        className: "w-3 h-3 mr-1"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                        lineNumber: 2647,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    moderationState.mutedStudentIds.includes(student.id) ? 'Muted' : 'Mute'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                                lineNumber: 2638,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                        lineNumber: 2618,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2616,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-24 bg-gray-50 rounded border flex items-center justify-center",
                                                                children: wb && wb.strokes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniCanvas, {
                                                                    strokes: wb.strokes
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2656,
                                                                    columnNumber: 29
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-gray-400",
                                                                    children: "Empty"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2658,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2654,
                                                                columnNumber: 25
                                                            }, this),
                                                            isViewing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-2 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "sm",
                                                                        className: "flex-1",
                                                                        onClick: (e)=>{
                                                                            e.stopPropagation();
                                                                            stopViewingStudent();
                                                                        },
                                                                        children: "Stop Viewing"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                        lineNumber: 2664,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    submission && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        size: "sm",
                                                                        className: "flex-1",
                                                                        onClick: (e)=>{
                                                                            e.stopPropagation();
                                                                            openReviewPanel(student.id);
                                                                        },
                                                                        children: "Open Review"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                        lineNumber: 2676,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                lineNumber: 2663,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, student.id, true, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                        lineNumber: 2603,
                                                        columnNumber: 23
                                                    }, this);
                                                }),
                                                visibleStudents.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "col-span-3 border rounded-lg p-6 text-center text-sm text-gray-500",
                                                    children: "No submitted boards yet."
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2694,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2596,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 rounded-md border p-3 bg-muted/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-semibold mb-2",
                                                    children: "Moderation + Overlay + Breakout Sync"
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2700,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 gap-3 md:grid-cols-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2 text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-medium",
                                                                    children: "Anti-spam stroke throttle"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2703,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                                    value: [
                                                                        moderationState.studentStrokeWindowLimit
                                                                    ],
                                                                    onValueChange: ([value])=>updateStrokeRateLimit(value),
                                                                    min: 20,
                                                                    max: 200,
                                                                    step: 5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2704,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: [
                                                                        moderationState.studentStrokeWindowLimit,
                                                                        " strokes / 5s"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2711,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2702,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2 text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-medium",
                                                                    children: "Assignment overlay"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2714,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-wrap gap-1",
                                                                    children: [
                                                                        'none',
                                                                        'graph-paper',
                                                                        'geometry-grid',
                                                                        'coordinate-plane',
                                                                        'chemistry-structure'
                                                                    ].map((overlay)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            size: "sm",
                                                                            variant: assignmentOverlay === overlay ? 'default' : 'outline',
                                                                            className: "h-6 px-2 text-[11px]",
                                                                            onClick: ()=>setAssignmentOverlayMode(overlay),
                                                                            children: overlay
                                                                        }, overlay, false, {
                                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                            lineNumber: 2717,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2715,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2713,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2 text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-medium",
                                                                    children: "Breakout board sync"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2730,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "outline",
                                                                    onClick: ()=>promoteBreakoutBoard('breakout-demo', activePageStrokes),
                                                                    children: "Promote Best Board to Main Room"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                                    lineNumber: 2731,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2729,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2701,
                                                    columnNumber: 19
                                                }, this),
                                                aiRegionHints.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 rounded border bg-white p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-semibold mb-1",
                                                            children: "AI Board Insight"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2742,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-700",
                                                            children: aiRegionHints[0].hint
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2743,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] text-amber-700 mt-1",
                                                            children: aiRegionHints[0].misconception
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2744,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2741,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2699,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2509,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 2508,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "pdf-board",
                                className: "h-full m-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full overflow-auto p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$pdf$2d$tutoring$2f$PDFTutoringWorkbench$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFTutoringWorkbench"], {
                                        roomId: `${roomId}:pdf`
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2753,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2752,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 2751,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                        lineNumber: 2179,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                    lineNumber: 2178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                lineNumber: 2176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isReviewPanelOpen,
                onOpenChange: (open)=>{
                    setIsReviewPanelOpen(open);
                    if (!open) setReviewStudentId(null);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-5xl max-h-[88vh] overflow-hidden p-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            className: "border-b px-6 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Tutor Review Panel"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2769,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Review submitted student work against your board and close feedback loops quickly. Shortcuts: `J` next, `K` previous, `R` mark reviewed."
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2770,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2768,
                            columnNumber: 11
                        }, this),
                        !reviewStudentId || !reviewStudent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "m-6 rounded-md border p-6 text-sm text-gray-500",
                            children: "Pick a student submission to begin review."
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2777,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 overflow-y-auto px-6 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/40 px-3 py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: reviewStudent.name
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2784,
                                                    columnNumber: 19
                                                }, this),
                                                reviewSubmission ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(reviewSubmission.reviewed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'),
                                                    children: reviewSubmission.reviewed ? 'Reviewed' : 'Pending review'
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2786,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    children: "No submission metadata"
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2794,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2783,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-500",
                                            children: reviewSubmission ? `${reviewSubmission.strokeCount} strokes • ${new Date(reviewSubmission.submittedAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}` : 'No timestamp available'
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2797,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2782,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 md:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-lg border p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-2 flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-sm font-semibold",
                                                            children: "Student Board"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2807,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "secondary",
                                                            children: [
                                                                reviewStudentBoard?.strokes.length ?? 0,
                                                                " strokes"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2808,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2806,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCanvas, {
                                                    strokes: reviewStudentBoard?.strokes ?? []
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2810,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2805,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-lg border p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-2 flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-sm font-semibold",
                                                            children: "Tutor Board Reference"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2814,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "secondary",
                                                            children: [
                                                                myStrokes.length,
                                                                " strokes"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                            lineNumber: 2815,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2813,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCanvas, {
                                                    strokes: activePageStrokes
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                    lineNumber: 2817,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                            lineNumber: 2812,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                    lineNumber: 2804,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2781,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            className: "border-t px-6 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                onClick: reviewPreviousPending,
                                                disabled: pendingSubmissions.length === 0,
                                                children: "Previous Pending (K)"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                lineNumber: 2826,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                onClick: reviewNextPending,
                                                disabled: pendingSubmissions.length === 0,
                                                children: "Next Pending (J)"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                lineNumber: 2833,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2825,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            reviewStudentId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                onClick: ()=>{
                                                    viewStudentWhiteboard(reviewStudentId);
                                                    setActiveTab('student-boards');
                                                    setIsReviewPanelOpen(false);
                                                },
                                                children: "Jump to Live Board"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                lineNumber: 2843,
                                                columnNumber: 19
                                            }, this),
                                            reviewSubmission && !reviewSubmission.reviewed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: ()=>markSubmissionReviewed(reviewSubmission.studentId),
                                                children: "Mark Reviewed (R)"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                                lineNumber: 2855,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                        lineNumber: 2841,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                                lineNumber: 2824,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                            lineNumber: 2823,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                    lineNumber: 2767,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
                lineNumber: 2760,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
        lineNumber: 1739,
        columnNumber: 5
    }, this);
}
_s(TutorWhiteboardManager, "uqyBHbXaVZkghraOIDRaVsJF8EQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$live$2d$class$2d$whiteboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveClassWhiteboard"]
    ];
});
_c = TutorWhiteboardManager;
// Mini canvas for student preview
function MiniCanvas({ strokes }) {
    _s1();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MiniCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx) return;
            // Clear
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Draw strokes (scaled down)
            strokes.forEach({
                "MiniCanvas.useEffect": (stroke)=>{
                    if (stroke.points.length < 2) return;
                    ctx.beginPath();
                    ctx.moveTo(stroke.points[0].x / 4, stroke.points[0].y / 4);
                    stroke.points.forEach({
                        "MiniCanvas.useEffect": (point, i)=>{
                            if (i > 0) ctx.lineTo(point.x / 4, point.y / 4);
                        }
                    }["MiniCanvas.useEffect"]);
                    ctx.strokeStyle = stroke.color;
                    ctx.lineWidth = Math.max(1, stroke.width / 4);
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
            }["MiniCanvas.useEffect"]);
        }
    }["MiniCanvas.useEffect"], [
        strokes
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        width: 150,
        height: 100,
        className: "w-full h-full"
    }, void 0, false, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
        lineNumber: 2901,
        columnNumber: 5
    }, this);
}
_s1(MiniCanvas, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c1 = MiniCanvas;
function ReviewCanvas({ strokes }) {
    _s2();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReviewCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx) return;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            if (strokes.length === 0) return;
            // Fit all points into the panel while preserving their shape.
            const allPoints = strokes.flatMap({
                "ReviewCanvas.useEffect.allPoints": (stroke)=>stroke.points
            }["ReviewCanvas.useEffect.allPoints"]);
            if (allPoints.length === 0) return;
            const minX = Math.min(...allPoints.map({
                "ReviewCanvas.useEffect.minX": (p)=>p.x
            }["ReviewCanvas.useEffect.minX"]));
            const minY = Math.min(...allPoints.map({
                "ReviewCanvas.useEffect.minY": (p)=>p.y
            }["ReviewCanvas.useEffect.minY"]));
            const maxX = Math.max(...allPoints.map({
                "ReviewCanvas.useEffect.maxX": (p)=>p.x
            }["ReviewCanvas.useEffect.maxX"]));
            const maxY = Math.max(...allPoints.map({
                "ReviewCanvas.useEffect.maxY": (p)=>p.y
            }["ReviewCanvas.useEffect.maxY"]));
            const width = Math.max(1, maxX - minX);
            const height = Math.max(1, maxY - minY);
            const padding = 16;
            const scaleX = (canvas.width - padding * 2) / width;
            const scaleY = (canvas.height - padding * 2) / height;
            const scale = Math.max(0.2, Math.min(scaleX, scaleY));
            const offsetX = (canvas.width - width * scale) / 2 - minX * scale;
            const offsetY = (canvas.height - height * scale) / 2 - minY * scale;
            strokes.forEach({
                "ReviewCanvas.useEffect": (stroke)=>{
                    if (stroke.points.length < 2) return;
                    ctx.beginPath();
                    ctx.moveTo(stroke.points[0].x * scale + offsetX, stroke.points[0].y * scale + offsetY);
                    stroke.points.forEach({
                        "ReviewCanvas.useEffect": (point, i)=>{
                            if (i > 0) ctx.lineTo(point.x * scale + offsetX, point.y * scale + offsetY);
                        }
                    }["ReviewCanvas.useEffect"]);
                    ctx.strokeStyle = stroke.color;
                    ctx.lineWidth = Math.max(1, stroke.width * scale * 0.6);
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.stroke();
                }
            }["ReviewCanvas.useEffect"]);
        }
    }["ReviewCanvas.useEffect"], [
        strokes
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-64 w-full rounded-md border bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            width: 600,
            height: 320,
            className: "h-full w-full"
        }, void 0, false, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
            lineNumber: 2961,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/TutorWhiteboardManager.tsx",
        lineNumber: 2960,
        columnNumber: 5
    }, this);
}
_s2(ReviewCanvas, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c2 = ReviewCanvas;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TutorWhiteboardManager");
__turbopack_context__.k.register(_c1, "MiniCanvas");
__turbopack_context__.k.register(_c2, "ReviewCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=f46f7047-393a-e8cc-1ff0-56fe8faa6337
//# sourceMappingURL=c0d22_app_%5Blocale%5D_tutor_live-class_components_TutorWhiteboardManager_tsx_fdd5ffea._.js.map