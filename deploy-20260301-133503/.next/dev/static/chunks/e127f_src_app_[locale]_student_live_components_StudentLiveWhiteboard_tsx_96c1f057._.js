;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="bc048eae-de7c-164a-2e66-701b7c226b65")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudentLiveWhiteboard",
    ()=>StudentLiveWhiteboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/user-check.js [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/undo.js [app-client] (ecmascript) <export default as Undo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rectangle$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RectangleHorizontal$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/rectangle-horizontal.js [app-client] (ecmascript) <export default as RectangleHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/triangle.js [app-client] (ecmascript) <export default as Triangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-client] (ecmascript) <export default as PenLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$highlighter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Highlighter$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/highlighter.js [app-client] (ecmascript) <export default as Highlighter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dot$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/dot.js [app-client] (ecmascript) <export default as Dot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Move$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/move.js [app-client] (ecmascript) <export default as Move>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$live$2d$class$2d$whiteboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-live-class-whiteboard.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function StudentLiveWhiteboard({ roomId, sessionId, mode = 'floating', visibleTaskShares = [], onOpenTask }) {
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const myUserId = session?.user?.id;
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
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
    const [isMinimized, setIsMinimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTutorBoard, setShowTutorBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [stylusPriority, setStylusPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [highContrast, setHighContrast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [zoomPreset, setZoomPreset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [snapEnabled, setSnapEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [gridVisible, setGridVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [gridSize, setGridSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [followTutorCursor, setFollowTutorCursor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [textPreset, setTextPreset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('plain');
    const [branchNameInput, setBranchNameInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [taskPanelOpen, setTaskPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastCursorEmitRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastPointerTypeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('mouse');
    const shapeTools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StudentLiveWhiteboard.useMemo[shapeTools]": ()=>new Set([
                'line',
                'arrow',
                'rectangle',
                'circle',
                'triangle',
                'connector'
            ])
    }["StudentLiveWhiteboard.useMemo[shapeTools]"], []);
    const freeDrawTools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StudentLiveWhiteboard.useMemo[freeDrawTools]": ()=>new Set([
                'pencil',
                'pen',
                'marker',
                'highlighter',
                'calligraphy',
                'eraser'
            ])
    }["StudentLiveWhiteboard.useMemo[freeDrawTools]"], []);
    const { myStrokes, tutorStrokes, visibility, isConnected, remoteCursors, remoteSelections, isLayerLocked, hasSubmitted, addStroke, changeVisibility, submitMyBoard, undoLastStroke, updateCursor, updateSelectionPresence, clearOwnStrokes, replaceMyStrokes, assignmentOverlay, spotlight, activeLayerId, setActiveLayerId, availableBranches, createBoardBranch, switchBoardBranch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$live$2d$class$2d$whiteboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveClassWhiteboard"])(roomId, sessionId, 'student');
    const drawShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[drawShape]": (ctx, shapeType, from, to, stroke)=>{
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
    }["StudentLiveWhiteboard.useCallback[drawShape]"], []);
    const drawStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[drawStroke]": (ctx, stroke, alpha = 1)=>{
            if (stroke.type === 'text') {
                const anchor = stroke.points[0];
                if (!anchor || !stroke.text) return;
                ctx.save();
                ctx.fillStyle = stroke.color;
                ctx.globalAlpha = (stroke.opacity ?? 1) * alpha;
                const textWeight = stroke.textStyle?.bold ? '700' : '400';
                const textItalic = stroke.textStyle?.italic ? 'italic' : 'normal';
                ctx.font = `${textItalic} ${textWeight} ${stroke.fontSize || fontSize}px ${stroke.fontFamily || 'Inter, Segoe UI, system-ui, sans-serif'}`;
                ctx.textBaseline = 'top';
                ctx.textAlign = stroke.textStyle?.align || 'left';
                ctx.fillText(stroke.text, anchor.x, anchor.y);
                ctx.restore();
                return;
            }
            if (stroke.type === 'shape' && stroke.shapeType && stroke.points.length >= 2) {
                if (stroke.shapeType === 'connector') {
                    ctx.save();
                    ctx.globalAlpha = (stroke.opacity ?? 1) * alpha;
                    ctx.strokeStyle = stroke.color;
                    ctx.lineWidth = stroke.width;
                    ctx.lineJoin = 'round';
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    stroke.points.forEach({
                        "StudentLiveWhiteboard.useCallback[drawStroke]": (point, index)=>{
                            if (index === 0) ctx.moveTo(point.x, point.y);
                            else ctx.lineTo(point.x, point.y);
                        }
                    }["StudentLiveWhiteboard.useCallback[drawStroke]"]);
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
                drawShape(ctx, stroke.shapeType, stroke.points[0], stroke.points[stroke.points.length - 1], {
                    color: stroke.color,
                    width: stroke.width,
                    opacity: (stroke.opacity ?? 1) * alpha
                });
                return;
            }
            if (stroke.points.length < 2) return;
            ctx.save();
            ctx.globalAlpha = (stroke.opacity ?? 1) * alpha;
            ctx.strokeStyle = stroke.color;
            ctx.lineCap = stroke.type === 'calligraphy' ? 'square' : 'round';
            ctx.lineJoin = 'round';
            for(let i = 1; i < stroke.points.length; i += 1){
                const prev = stroke.points[i - 1];
                const point = stroke.points[i];
                const pressure = typeof point.pressure === 'number' ? point.pressure : 0.5;
                ctx.lineWidth = Math.max(1, stroke.width * (0.55 + pressure * 0.9));
                if (stroke.type === 'pencil') ctx.setLineDash([
                    1,
                    1.5
                ]);
                else ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
            ctx.restore();
        }
    }["StudentLiveWhiteboard.useCallback[drawStroke]"], [
        drawShape,
        fontSize
    ]);
    const getStrokeBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[getStrokeBounds]": (stroke)=>{
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
                "StudentLiveWhiteboard.useCallback[getStrokeBounds].xs": (point)=>point.x
            }["StudentLiveWhiteboard.useCallback[getStrokeBounds].xs"]);
            const ys = stroke.points.map({
                "StudentLiveWhiteboard.useCallback[getStrokeBounds].ys": (point)=>point.y
            }["StudentLiveWhiteboard.useCallback[getStrokeBounds].ys"]);
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
    }["StudentLiveWhiteboard.useCallback[getStrokeBounds]"], [
        fontSize
    ]);
    const pointInPolygon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[pointInPolygon]": (point, polygon)=>{
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
    }["StudentLiveWhiteboard.useCallback[pointInPolygon]"], []);
    const routeOrthogonalConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector]": (from, to, obstacles)=>{
            const pad = 18;
            const inflate = {
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].inflate": (b)=>({
                        x: b.x - pad,
                        y: b.y - pad,
                        width: b.width + pad * 2,
                        height: b.height + pad * 2
                    })
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].inflate"];
            const inflated = obstacles.map(inflate);
            const segmentHitsRect = {
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].segmentHitsRect": (a, b, r)=>{
                    const minX = Math.min(a.x, b.x);
                    const maxX = Math.max(a.x, b.x);
                    const minY = Math.min(a.y, b.y);
                    const maxY = Math.max(a.y, b.y);
                    return maxX >= r.x && minX <= r.x + r.width && maxY >= r.y && minY <= r.y + r.height;
                }
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].segmentHitsRect"];
            const clearSegment = {
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].clearSegment": (a, b)=>inflated.every({
                        "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].clearSegment": (r)=>!segmentHitsRect(a, b, r)
                    }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].clearSegment"])
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].clearSegment"];
            const bestL = {
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].bestL": (firstHorizontal)=>{
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
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].bestL"];
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
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].pathCost": (path)=>path.reduce({
                        "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].pathCost": (acc, point, i)=>i === 0 ? 0 : acc + Math.abs(point.x - path[i - 1].x) + Math.abs(point.y - path[i - 1].y)
                    }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].pathCost"], 0)
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].pathCost"];
            const valid = candidates.map({
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].valid": (path)=>({
                        path,
                        ok: path.every({
                            "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].valid": (p, i)=>i === 0 || clearSegment(path[i - 1], p)
                        }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].valid"]),
                        cost: pathCost(path)
                    })
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].valid"]).filter({
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].valid": (p)=>p.ok
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].valid"]).sort({
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].valid": (a, b)=>a.cost - b.cost
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector].valid"]);
            return (valid[0]?.path || bestL(true)).map({
                "StudentLiveWhiteboard.useCallback[routeOrthogonalConnector]": (p)=>({
                        x: p.x,
                        y: p.y
                    })
            }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector]"]);
        }
    }["StudentLiveWhiteboard.useCallback[routeOrthogonalConnector]"], []);
    const getPortAnchors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[getPortAnchors]": (bounds)=>({
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
    }["StudentLiveWhiteboard.useCallback[getPortAnchors]"], []);
    const closestPortForPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[closestPortForPoint]": (point, bounds)=>{
            const anchors = getPortAnchors(bounds);
            let bestPort = 'center';
            let best = anchors.center;
            let bestDist = Number.POSITIVE_INFINITY;
            Object.keys(anchors).forEach({
                "StudentLiveWhiteboard.useCallback[closestPortForPoint]": (port)=>{
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
            }["StudentLiveWhiteboard.useCallback[closestPortForPoint]"]);
            return {
                port: bestPort,
                anchor: best,
                distance: bestDist
            };
        }
    }["StudentLiveWhiteboard.useCallback[closestPortForPoint]"], [
        getPortAnchors
    ]);
    const resolveConnectorEndpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[resolveConnectorEndpoint]": (point, strokes)=>{
            let best = {
                anchor: point,
                distance: Number.POSITIVE_INFINITY
            };
            strokes.filter({
                "StudentLiveWhiteboard.useCallback[resolveConnectorEndpoint]": (stroke)=>stroke.shapeType !== 'connector'
            }["StudentLiveWhiteboard.useCallback[resolveConnectorEndpoint]"]).forEach({
                "StudentLiveWhiteboard.useCallback[resolveConnectorEndpoint]": (stroke)=>{
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
            }["StudentLiveWhiteboard.useCallback[resolveConnectorEndpoint]"]);
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
    }["StudentLiveWhiteboard.useCallback[resolveConnectorEndpoint]"], [
        closestPortForPoint,
        getStrokeBounds
    ]);
    const getSelectedBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[getSelectedBounds]": (selectedIds)=>{
            const selectedBounds = myStrokes.filter({
                "StudentLiveWhiteboard.useCallback[getSelectedBounds].selectedBounds": (stroke)=>selectedIds.has(stroke.id)
            }["StudentLiveWhiteboard.useCallback[getSelectedBounds].selectedBounds"]).map({
                "StudentLiveWhiteboard.useCallback[getSelectedBounds].selectedBounds": (stroke)=>getStrokeBounds(stroke)
            }["StudentLiveWhiteboard.useCallback[getSelectedBounds].selectedBounds"]).filter({
                "StudentLiveWhiteboard.useCallback[getSelectedBounds].selectedBounds": (bounds)=>Boolean(bounds)
            }["StudentLiveWhiteboard.useCallback[getSelectedBounds].selectedBounds"]);
            if (!selectedBounds.length) return null;
            const minX = Math.min(...selectedBounds.map({
                "StudentLiveWhiteboard.useCallback[getSelectedBounds].minX": (bounds)=>bounds.x
            }["StudentLiveWhiteboard.useCallback[getSelectedBounds].minX"]));
            const minY = Math.min(...selectedBounds.map({
                "StudentLiveWhiteboard.useCallback[getSelectedBounds].minY": (bounds)=>bounds.y
            }["StudentLiveWhiteboard.useCallback[getSelectedBounds].minY"]));
            const maxX = Math.max(...selectedBounds.map({
                "StudentLiveWhiteboard.useCallback[getSelectedBounds].maxX": (bounds)=>bounds.x + bounds.width
            }["StudentLiveWhiteboard.useCallback[getSelectedBounds].maxX"]));
            const maxY = Math.max(...selectedBounds.map({
                "StudentLiveWhiteboard.useCallback[getSelectedBounds].maxY": (bounds)=>bounds.y + bounds.height
            }["StudentLiveWhiteboard.useCallback[getSelectedBounds].maxY"]));
            return {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        }
    }["StudentLiveWhiteboard.useCallback[getSelectedBounds]"], [
        getStrokeBounds,
        myStrokes
    ]);
    const nudgeSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[nudgeSelection]": (dx, dy)=>{
            if (isLayerLocked || selectedStrokeIds.size === 0) return;
            replaceMyStrokes({
                "StudentLiveWhiteboard.useCallback[nudgeSelection]": (prev)=>prev.map({
                        "StudentLiveWhiteboard.useCallback[nudgeSelection]": (stroke)=>{
                            if (!selectedStrokeIds.has(stroke.id)) return stroke;
                            return {
                                ...stroke,
                                points: stroke.points.map({
                                    "StudentLiveWhiteboard.useCallback[nudgeSelection]": (point)=>({
                                            ...point,
                                            x: snapEnabled ? Math.round((point.x + dx) / gridSize) * gridSize : point.x + dx,
                                            y: snapEnabled ? Math.round((point.y + dy) / gridSize) * gridSize : point.y + dy
                                        })
                                }["StudentLiveWhiteboard.useCallback[nudgeSelection]"])
                            };
                        }
                    }["StudentLiveWhiteboard.useCallback[nudgeSelection]"])
            }["StudentLiveWhiteboard.useCallback[nudgeSelection]"]);
        }
    }["StudentLiveWhiteboard.useCallback[nudgeSelection]"], [
        gridSize,
        isLayerLocked,
        replaceMyStrokes,
        selectedStrokeIds,
        snapEnabled
    ]);
    const scaleSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[scaleSelection]": (factor)=>{
            if (isLayerLocked || selectedStrokeIds.size === 0) return;
            const bounds = getSelectedBounds(selectedStrokeIds);
            if (!bounds) return;
            const centerX = bounds.x + bounds.width / 2;
            const centerY = bounds.y + bounds.height / 2;
            replaceMyStrokes({
                "StudentLiveWhiteboard.useCallback[scaleSelection]": (prev)=>prev.map({
                        "StudentLiveWhiteboard.useCallback[scaleSelection]": (stroke)=>{
                            if (!selectedStrokeIds.has(stroke.id)) return stroke;
                            return {
                                ...stroke,
                                points: stroke.points.map({
                                    "StudentLiveWhiteboard.useCallback[scaleSelection]": (point)=>({
                                            ...point,
                                            x: snapEnabled ? Math.round((centerX + (point.x - centerX) * factor) / gridSize) * gridSize : centerX + (point.x - centerX) * factor,
                                            y: snapEnabled ? Math.round((centerY + (point.y - centerY) * factor) / gridSize) * gridSize : centerY + (point.y - centerY) * factor
                                        })
                                }["StudentLiveWhiteboard.useCallback[scaleSelection]"])
                            };
                        }
                    }["StudentLiveWhiteboard.useCallback[scaleSelection]"])
            }["StudentLiveWhiteboard.useCallback[scaleSelection]"]);
        }
    }["StudentLiveWhiteboard.useCallback[scaleSelection]"], [
        getSelectedBounds,
        gridSize,
        isLayerLocked,
        replaceMyStrokes,
        selectedStrokeIds,
        snapEnabled
    ]);
    const selectByAttribute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[selectByAttribute]": (attribute)=>{
            const seed = myStrokes.find({
                "StudentLiveWhiteboard.useCallback[selectByAttribute].seed": (stroke)=>selectedStrokeIds.has(stroke.id)
            }["StudentLiveWhiteboard.useCallback[selectByAttribute].seed"]);
            if (!seed) return;
            const selected = new Set();
            myStrokes.forEach({
                "StudentLiveWhiteboard.useCallback[selectByAttribute]": (stroke)=>{
                    if (attribute === 'color' && stroke.color === seed.color) selected.add(stroke.id);
                    if (attribute === 'type' && stroke.type === seed.type) selected.add(stroke.id);
                    if (attribute === 'layer' && (stroke.layerId || 'student-personal') === (seed.layerId || 'student-personal')) selected.add(stroke.id);
                }
            }["StudentLiveWhiteboard.useCallback[selectByAttribute]"]);
            setSelectedStrokeIds(selected);
        }
    }["StudentLiveWhiteboard.useCallback[selectByAttribute]"], [
        myStrokes,
        selectedStrokeIds
    ]);
    const selectedBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StudentLiveWhiteboard.useMemo[selectedBounds]": ()=>getSelectedBounds(selectedStrokeIds)
    }["StudentLiveWhiteboard.useMemo[selectedBounds]"], [
        getSelectedBounds,
        selectedStrokeIds
    ]);
    const activeSelectedConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StudentLiveWhiteboard.useMemo[activeSelectedConnector]": ()=>{
            if (selectedStrokeIds.size !== 1) return null;
            const id = Array.from(selectedStrokeIds)[0];
            const stroke = myStrokes.find({
                "StudentLiveWhiteboard.useMemo[activeSelectedConnector].stroke": (item)=>item.id === id
            }["StudentLiveWhiteboard.useMemo[activeSelectedConnector].stroke"]);
            if (!stroke || stroke.shapeType !== 'connector' || stroke.points.length < 2) return null;
            return stroke;
        }
    }["StudentLiveWhiteboard.useMemo[activeSelectedConnector]"], [
        myStrokes,
        selectedStrokeIds
    ]);
    const getConnectorScreenEndpoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[getConnectorScreenEndpoints]": (stroke, strokes)=>{
            let sourcePoint = stroke.points[0];
            let targetPoint = stroke.points[stroke.points.length - 1];
            if (stroke.sourceStrokeId && stroke.sourcePort) {
                const sourceStroke = strokes.find({
                    "StudentLiveWhiteboard.useCallback[getConnectorScreenEndpoints].sourceStroke": (item)=>item.id === stroke.sourceStrokeId
                }["StudentLiveWhiteboard.useCallback[getConnectorScreenEndpoints].sourceStroke"]);
                const bounds = sourceStroke ? getStrokeBounds(sourceStroke) : null;
                if (bounds) sourcePoint = getPortAnchors(bounds)[stroke.sourcePort];
            }
            if (stroke.targetStrokeId && stroke.targetPort) {
                const targetStroke = strokes.find({
                    "StudentLiveWhiteboard.useCallback[getConnectorScreenEndpoints].targetStroke": (item)=>item.id === stroke.targetStrokeId
                }["StudentLiveWhiteboard.useCallback[getConnectorScreenEndpoints].targetStroke"]);
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
    }["StudentLiveWhiteboard.useCallback[getConnectorScreenEndpoints]"], [
        getPortAnchors,
        getStrokeBounds,
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const hitTestConnectorEndpointHandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[hitTestConnectorEndpointHandle]": (screenX, screenY)=>{
            if (!activeSelectedConnector) return null;
            const endpoints = getConnectorScreenEndpoints(activeSelectedConnector, myStrokes);
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
    }["StudentLiveWhiteboard.useCallback[hitTestConnectorEndpointHandle]"], [
        activeSelectedConnector,
        getConnectorScreenEndpoints,
        myStrokes
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentLiveWhiteboard.useEffect": ()=>{
            updateSelectionPresence(Array.from(selectedStrokeIds), undefined, '#f59e0b');
        }
    }["StudentLiveWhiteboard.useEffect"], [
        selectedStrokeIds,
        updateSelectionPresence
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentLiveWhiteboard.useEffect": ()=>{
            replaceMyStrokes({
                "StudentLiveWhiteboard.useEffect": (prev)=>{
                    const byId = new Map(prev.map({
                        "StudentLiveWhiteboard.useEffect": (stroke)=>[
                                stroke.id,
                                stroke
                            ]
                    }["StudentLiveWhiteboard.useEffect"]));
                    const obstacles = prev.filter({
                        "StudentLiveWhiteboard.useEffect.obstacles": (stroke)=>stroke.shapeType !== 'connector'
                    }["StudentLiveWhiteboard.useEffect.obstacles"]).map({
                        "StudentLiveWhiteboard.useEffect.obstacles": (stroke)=>getStrokeBounds(stroke)
                    }["StudentLiveWhiteboard.useEffect.obstacles"]).filter({
                        "StudentLiveWhiteboard.useEffect.obstacles": (bounds)=>Boolean(bounds)
                    }["StudentLiveWhiteboard.useEffect.obstacles"]);
                    let changed = false;
                    const next = [];
                    prev.forEach({
                        "StudentLiveWhiteboard.useEffect": (stroke)=>{
                            if (stroke.shapeType !== 'connector') {
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
                                "StudentLiveWhiteboard.useEffect": (point, index)=>{
                                    const nextPoint = rerouted[index];
                                    return Math.abs(point.x - nextPoint.x) < 0.5 && Math.abs(point.y - nextPoint.y) < 0.5;
                                }
                            }["StudentLiveWhiteboard.useEffect"]);
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
                    }["StudentLiveWhiteboard.useEffect"]);
                    return changed ? next : prev;
                }
            }["StudentLiveWhiteboard.useEffect"]);
        }
    }["StudentLiveWhiteboard.useEffect"], [
        getPortAnchors,
        getStrokeBounds,
        myStrokes,
        replaceMyStrokes,
        routeOrthogonalConnector
    ]);
    const hitTestSelectionHandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[hitTestSelectionHandle]": (screenX, screenY)=>{
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
                const px = corner.x * viewport.scale + viewport.offsetX;
                const py = corner.y * viewport.scale + viewport.offsetY;
                const dx = screenX - px;
                const dy = screenY - py;
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
    }["StudentLiveWhiteboard.useCallback[hitTestSelectionHandle]"], [
        selectedBounds,
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const redrawCanvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[redrawCanvas]": ()=>{
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
            const worldViewport = {
                left: -viewport.offsetX / viewport.scale,
                top: -viewport.offsetY / viewport.scale,
                right: (canvas.width - viewport.offsetX) / viewport.scale,
                bottom: (canvas.height - viewport.offsetY) / viewport.scale
            };
            const isBoundsVisible = {
                "StudentLiveWhiteboard.useCallback[redrawCanvas].isBoundsVisible": (bounds)=>{
                    if (!bounds) return true;
                    return bounds.x <= worldViewport.right && bounds.x + bounds.width >= worldViewport.left && bounds.y <= worldViewport.bottom && bounds.y + bounds.height >= worldViewport.top;
                }
            }["StudentLiveWhiteboard.useCallback[redrawCanvas].isBoundsVisible"];
            // Draw tutor's strokes first (bottom layer)
            if (showTutorBoard) {
                tutorStrokes.forEach({
                    "StudentLiveWhiteboard.useCallback[redrawCanvas]": (stroke)=>{
                        const bounds = getStrokeBounds(stroke);
                        if (!isBoundsVisible(bounds)) return;
                        drawStroke(ctx, stroke, 0.5);
                    }
                }["StudentLiveWhiteboard.useCallback[redrawCanvas]"]);
            }
            // Draw student's strokes on top
            myStrokes.forEach({
                "StudentLiveWhiteboard.useCallback[redrawCanvas]": (stroke)=>{
                    const bounds = getStrokeBounds(stroke);
                    if (!isBoundsVisible(bounds)) return;
                    drawStroke(ctx, stroke, 1);
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
            }["StudentLiveWhiteboard.useCallback[redrawCanvas]"]);
            remoteSelections.forEach({
                "StudentLiveWhiteboard.useCallback[redrawCanvas]": (presence)=>{
                    presence.strokeIds.forEach({
                        "StudentLiveWhiteboard.useCallback[redrawCanvas]": (id)=>{
                            const stroke = myStrokes.find({
                                "StudentLiveWhiteboard.useCallback[redrawCanvas]": (entry)=>entry.id === id
                            }["StudentLiveWhiteboard.useCallback[redrawCanvas]"]) || tutorStrokes.find({
                                "StudentLiveWhiteboard.useCallback[redrawCanvas]": (entry)=>entry.id === id
                            }["StudentLiveWhiteboard.useCallback[redrawCanvas]"]);
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
                    }["StudentLiveWhiteboard.useCallback[redrawCanvas]"]);
                }
            }["StudentLiveWhiteboard.useCallback[redrawCanvas]"]);
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
                drawStroke(ctx, previewStroke, 1);
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
                    "StudentLiveWhiteboard.useCallback[redrawCanvas]": (point, index)=>{
                        const screen = {
                            x: point.x * viewport.scale + viewport.offsetX,
                            y: point.y * viewport.scale + viewport.offsetY
                        };
                        if (index === 0) ctx.moveTo(screen.x, screen.y);
                        else ctx.lineTo(screen.x, screen.y);
                    }
                }["StudentLiveWhiteboard.useCallback[redrawCanvas]"]);
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
                    "StudentLiveWhiteboard.useCallback[redrawCanvas]": (corner)=>{
                        const sx = corner.x * viewport.scale + viewport.offsetX;
                        const sy = corner.y * viewport.scale + viewport.offsetY;
                        ctx.beginPath();
                        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }["StudentLiveWhiteboard.useCallback[redrawCanvas]"]);
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
                const endpoints = getConnectorScreenEndpoints(activeSelectedConnector, myStrokes);
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
    }["StudentLiveWhiteboard.useCallback[redrawCanvas]"], [
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
        myStrokes,
        remoteSelections,
        selectedBounds,
        selectedStrokeIds,
        selectionRect,
        shapePreview,
        shapeStart,
        shapeTools,
        showTutorBoard,
        tool,
        tutorStrokes,
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const getOverlayBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[getOverlayBackground]": ()=>{
            switch(assignmentOverlay){
                case 'graph-paper':
                    return 'linear-gradient(to right, rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.15) 1px, transparent 1px)';
                case 'geometry-grid':
                    return 'linear-gradient(45deg, rgba(16,185,129,0.16) 1px, transparent 1px), linear-gradient(-45deg, rgba(16,185,129,0.16) 1px, transparent 1px)';
                case 'coordinate-plane':
                    return 'linear-gradient(to right, rgba(107,114,128,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,114,128,0.15) 1px, transparent 1px), linear-gradient(to right, transparent calc(50% - 1px), rgba(239,68,68,0.35) calc(50% - 1px), rgba(239,68,68,0.35) calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(to bottom, transparent calc(50% - 1px), rgba(239,68,68,0.35) calc(50% - 1px), rgba(239,68,68,0.35) calc(50% + 1px), transparent calc(50% + 1px))';
                case 'chemistry-structure':
                    return 'radial-gradient(circle at 20px 20px, rgba(245,158,11,0.18) 2px, transparent 2px), radial-gradient(circle at 60px 40px, rgba(245,158,11,0.18) 2px, transparent 2px), radial-gradient(circle at 100px 20px, rgba(245,158,11,0.18) 2px, transparent 2px)';
                default:
                    return 'none';
            }
        }
    }["StudentLiveWhiteboard.useCallback[getOverlayBackground]"], [
        assignmentOverlay
    ]);
    // Canvas setup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentLiveWhiteboard.useEffect": ()=>{
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;
            const resizeCanvas = {
                "StudentLiveWhiteboard.useEffect.resizeCanvas": ()=>{
                    canvas.width = container.clientWidth;
                    canvas.height = container.clientHeight;
                    redrawCanvas();
                }
            }["StudentLiveWhiteboard.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            return ({
                "StudentLiveWhiteboard.useEffect": ()=>window.removeEventListener('resize', resizeCanvas)
            })["StudentLiveWhiteboard.useEffect"];
        }
    }["StudentLiveWhiteboard.useEffect"], [
        redrawCanvas
    ]);
    // Redraw canvas when strokes change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentLiveWhiteboard.useEffect": ()=>{
            redrawCanvas();
        }
    }["StudentLiveWhiteboard.useEffect"], [
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
        "StudentLiveWhiteboard.useCallback[pointerToScreen]": (point)=>({
                x: point.x * viewport.scale + viewport.offsetX,
                y: point.y * viewport.scale + viewport.offsetY
            })
    }["StudentLiveWhiteboard.useCallback[pointerToScreen]"], [
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    const commitTextDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[commitTextDraft]": ()=>{
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
                fontFamily: 'Inter, Segoe UI, system-ui, sans-serif',
                userId: myUserId || 'student',
                layerId: activeLayerId
            };
            addStroke(stroke);
            setTextDraft(null);
        }
    }["StudentLiveWhiteboard.useCallback[commitTextDraft]"], [
        activeLayerId,
        addStroke,
        color,
        fontSize,
        myUserId,
        textDraft,
        textPreset
    ]);
    const handlePointerDown = (e)=>{
        lastPointerTypeRef.current = e.pointerType;
        if (isLayerLocked) return;
        if (stylusPriority && lastPointerTypeRef.current === 'touch') return;
        e.currentTarget.setPointerCapture(e.pointerId);
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
                    ...myStrokes
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
            if (handle && selectedBounds) {
                const centerX = selectedBounds.x + selectedBounds.width / 2;
                const centerY = selectedBounds.y + selectedBounds.height / 2;
                selectionSnapshotRef.current = new Map(myStrokes.filter((stroke)=>selectedStrokeIds.has(stroke.id)).map((stroke)=>[
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
            const hitSelectedStroke = myStrokes.some((stroke)=>{
                if (!selectedStrokeIds.has(stroke.id)) return false;
                const bounds = getStrokeBounds(stroke);
                if (!bounds) return false;
                return point.x >= bounds.x && point.x <= bounds.x + bounds.width && point.y >= bounds.y && point.y <= bounds.y + bounds.height;
            });
            if (hitSelectedStroke) {
                const snapshot = new Map();
                myStrokes.forEach((stroke)=>{
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
        updateCursor(point.x, point.y);
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
        const now = Date.now();
        if (now - lastCursorEmitRef.current > 50) {
            updateCursor(point.x, point.y, tool === 'laser' ? 'laser' : 'cursor');
            lastCursorEmitRef.current = now;
        }
        if (connectorDrag) {
            replaceMyStrokes((prev)=>{
                const obstacles = prev.filter((stroke)=>stroke.shapeType !== 'connector').map((stroke)=>getStrokeBounds(stroke)).filter((bounds)=>Boolean(bounds));
                const peers = prev.filter((stroke)=>stroke.id !== connectorDrag.strokeId);
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
            myStrokes.forEach((stroke)=>{
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
            myStrokes.forEach((stroke)=>{
                if (stroke.points.some((p)=>pointInPolygon({
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
            return;
        }
        if (activeTransformHandle) {
            setActiveTransformHandle(null);
            transformRef.current = null;
            selectionSnapshotRef.current.clear();
            return;
        }
        if (isDraggingSelection) {
            setIsDraggingSelection(false);
            dragStartRef.current = null;
            selectionSnapshotRef.current.clear();
            return;
        }
        if (tool === 'laser') {
            setLaserPoint(null);
            return;
        }
        if (!isDrawing) return;
        if (shapeTools.has(tool) && shapeStart && shapePreview) {
            const preset = TOOL_PRESET[tool];
            const fromResolved = tool === 'connector' ? resolveConnectorEndpoint(shapeStart, myStrokes) : {
                point: shapeStart
            };
            const toResolved = tool === 'connector' ? resolveConnectorEndpoint(shapePreview, myStrokes) : {
                point: shapePreview
            };
            const fromPoint = fromResolved.point;
            const toPoint = toResolved.point;
            const connectorPoints = tool === 'connector' ? routeOrthogonalConnector(fromPoint, toPoint, myStrokes.filter((stroke)=>stroke.shapeType !== 'connector').map((stroke)=>getStrokeBounds(stroke)).filter((bounds)=>Boolean(bounds))) : [
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
                userId: myUserId || 'student',
                layerId: activeLayerId,
                sourceStrokeId: tool === 'connector' ? fromResolved.sourceStrokeId : undefined,
                targetStrokeId: tool === 'connector' ? toResolved.sourceStrokeId : undefined,
                sourcePort: tool === 'connector' ? fromResolved.sourcePort : undefined,
                targetPort: tool === 'connector' ? toResolved.sourcePort : undefined
            };
            addStroke(stroke);
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
            userId: myUserId || 'student',
            layerId: activeLayerId
        };
        addStroke(stroke);
        setIsDrawing(false);
        setCurrentStroke([]);
    };
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[handleWheel]": (e)=>{
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
    }["StudentLiveWhiteboard.useCallback[handleWheel]"], [
        viewport.offsetX,
        viewport.offsetY,
        viewport.scale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentLiveWhiteboard.useEffect": ()=>{
            if (!followTutorCursor) return;
            const tutorCursor = Array.from(remoteCursors.values()).find({
                "StudentLiveWhiteboard.useEffect.tutorCursor": (cursor)=>cursor.role === 'tutor'
            }["StudentLiveWhiteboard.useEffect.tutorCursor"]);
            if (!tutorCursor) return;
            setViewport({
                "StudentLiveWhiteboard.useEffect": (prev)=>({
                        ...prev,
                        offsetX: (canvasRef.current?.width || 0) / 2 - tutorCursor.x * prev.scale,
                        offsetY: (canvasRef.current?.height || 0) / 2 - tutorCursor.y * prev.scale
                    })
            }["StudentLiveWhiteboard.useEffect"]);
        }
    }["StudentLiveWhiteboard.useEffect"], [
        followTutorCursor,
        remoteCursors
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentLiveWhiteboard.useEffect": ()=>{
            const handleKeyDown = {
                "StudentLiveWhiteboard.useEffect.handleKeyDown": (event)=>{
                    if (event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA') return;
                    const step = event.shiftKey ? 20 : 6;
                    const key = event.key.toLowerCase();
                    if (key === 'v') setTool('select');
                    if (key === 'p') setTool('pen');
                    if (key === 'e') setTool('eraser');
                    if (key === 't') setTool('text');
                    if (key === 'l') setTool('laser');
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
                    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
                        event.preventDefault();
                        undoLastStroke();
                    }
                    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'x') {
                        event.preventDefault();
                        clearOwnStrokes();
                    }
                }
            }["StudentLiveWhiteboard.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "StudentLiveWhiteboard.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["StudentLiveWhiteboard.useEffect"];
        }
    }["StudentLiveWhiteboard.useEffect"], [
        clearOwnStrokes,
        nudgeSelection,
        scaleSelection,
        selectedStrokeIds.size,
        undoLastStroke
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentLiveWhiteboard.useEffect": ()=>{
            const preset = TOOL_PRESET[tool];
            if (!preset) return;
            if (tool === 'eraser' || tool === 'highlighter' || tool === 'marker' || tool === 'calligraphy' || tool === 'pencil' || tool === 'pen') {
                setBrushSize(preset.width);
            }
        }
    }["StudentLiveWhiteboard.useEffect"], [
        tool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentLiveWhiteboard.useEffect": ()=>{
            setViewport({
                "StudentLiveWhiteboard.useEffect": (prev)=>({
                        ...prev,
                        scale: zoomPreset
                    })
            }["StudentLiveWhiteboard.useEffect"]);
        }
    }["StudentLiveWhiteboard.useEffect"], [
        zoomPreset
    ]);
    const cursorColorForId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StudentLiveWhiteboard.useCallback[cursorColorForId]": (userId)=>{
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
    }["StudentLiveWhiteboard.useCallback[cursorColorForId]"], []);
    const getVisibilityIcon = ()=>{
        switch(visibility){
            case 'private':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                    className: "w-4 h-4 mr-2"
                }, void 0, false, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                    lineNumber: 1381,
                    columnNumber: 30
                }, this);
            case 'tutor-only':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                    className: "w-4 h-4 mr-2"
                }, void 0, false, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                    lineNumber: 1382,
                    columnNumber: 33
                }, this);
            case 'public':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                    className: "w-4 h-4 mr-2"
                }, void 0, false, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                    lineNumber: 1383,
                    columnNumber: 29
                }, this);
        }
    };
    const getVisibilityLabel = ()=>{
        switch(visibility){
            case 'private':
                return 'Private';
            case 'tutor-only':
                return 'Tutor Only';
            case 'public':
                return 'Class Visible';
        }
    };
    if (mode === 'floating' && isMinimized) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-3 z-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1399,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: "My Whiteboard"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1400,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: visibility === 'public' ? 'default' : 'secondary',
                        className: "text-xs",
                        children: getVisibilityLabel()
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1401,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: ()=>setIsMinimized(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1405,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1404,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                lineNumber: 1398,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
            lineNumber: 1397,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-white border rounded-lg shadow-2xl flex flex-col", mode === 'floating' ? "fixed bottom-4 right-4 w-96 z-50" : "w-full h-full"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-3 py-2 border-b bg-gray-50 rounded-t-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1420,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-sm",
                                children: "My Whiteboard"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1421,
                                columnNumber: 11
                            }, this),
                            isLayerLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "destructive",
                                className: "text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-3 h-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1424,
                                        columnNumber: 15
                                    }, this),
                                    "Locked"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1423,
                                columnNumber: 13
                            }, this),
                            hasSubmitted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: "text-xs bg-green-100 text-green-700 border-green-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-3 h-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1430,
                                        columnNumber: 15
                                    }, this),
                                    "Submitted"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1429,
                                columnNumber: 13
                            }, this),
                            !isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "text-xs text-red-500",
                                children: "Offline"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1435,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1419,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                className: "h-7 text-xs",
                                onClick: ()=>setStylusPriority((prev)=>!prev),
                                "aria-label": "Toggle stylus priority",
                                children: stylusPriority ? 'Stylus Priority' : 'Touch Enabled'
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1440,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                className: "h-7 text-xs",
                                onClick: ()=>setHighContrast((prev)=>!prev),
                                "aria-label": "Toggle high contrast",
                                children: highContrast ? 'Standard' : 'High Contrast'
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1449,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                                open: taskPanelOpen,
                                onOpenChange: setTaskPanelOpen,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: visibleTaskShares.length > 0 ? 'default' : 'ghost',
                                            size: "sm",
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-7 text-xs', visibleTaskShares.length > 0 && 'animate-pulse'),
                                            children: visibleTaskShares.length > 0 ? `Live Tasks (${visibleTaskShares.length})` : 'Tasks (0)'
                                        }, void 0, false, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                            lineNumber: 1460,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1459,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                                        side: "right",
                                        className: "w-[420px] sm:w-[520px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                                    children: "Visible Tasks"
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                    lineNumber: 1470,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                lineNumber: 1469,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 space-y-3",
                                                children: visibleTaskShares.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "No visible tasks yet."
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                    lineNumber: 1474,
                                                    columnNumber: 19
                                                }, this) : visibleTaskShares.map((share)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-lg border p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium",
                                                                children: share.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                                lineNumber: 1478,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: share.description || 'Tutor shared task document'
                                                            }, void 0, false, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                                lineNumber: 1479,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-2 flex items-center justify-between text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "outline",
                                                                                children: share.visibleToAll ? 'Class Visible' : 'Private'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                                                lineNumber: 1484,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "secondary",
                                                                                children: share.allowCollaborativeWrite ? 'Collaborative' : 'Read only'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                                                lineNumber: 1485,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            share.submissions?.some((submission)=>submission.userId === myUserId) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                className: "bg-green-100 text-green-700 border-green-200",
                                                                                children: "Submitted"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                                                lineNumber: 1489,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                                        lineNumber: 1483,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        onClick: ()=>{
                                                                            onOpenTask?.(share.shareId);
                                                                            setTaskPanelOpen(false);
                                                                        },
                                                                        children: "Open Task"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                                        lineNumber: 1492,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                                lineNumber: 1482,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, share.shareId, true, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                        lineNumber: 1477,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                lineNumber: 1472,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1468,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1458,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            className: "h-7 text-xs",
                                            children: [
                                                getVisibilityIcon(),
                                                getVisibilityLabel(),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "w-3 h-3 ml-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                    lineNumber: 1514,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                            lineNumber: 1511,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1510,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        align: "end",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                onClick: ()=>changeVisibility('private'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                        className: "w-4 h-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                        lineNumber: 1519,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Private (Only Me)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                lineNumber: 1518,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                onClick: ()=>changeVisibility('tutor-only'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                        className: "w-4 h-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                        lineNumber: 1523,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Tutor Can View"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                lineNumber: 1522,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                onClick: ()=>changeVisibility('public'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                        className: "w-4 h-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                        lineNumber: 1527,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Class Can View"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                lineNumber: 1526,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1517,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1509,
                                columnNumber: 11
                            }, this),
                            mode === 'floating' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                className: "h-7",
                                onClick: ()=>setIsMinimized(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1535,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1534,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1439,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                lineNumber: 1418,
                columnNumber: 7
            }, this),
            visibleTaskShares.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b bg-blue-50 px-3 py-2 text-xs text-blue-800",
                children: [
                    "Tutor shared ",
                    visibleTaskShares.length,
                    " live task",
                    visibleTaskShares.length > 1 ? 's' : '',
                    ". Click",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        children: "Live Tasks"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1544,
                        columnNumber: 11
                    }, this),
                    " to open and work on your copy."
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                lineNumber: 1542,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 border-b bg-slate-50/95 px-3 py-2 backdrop-blur",
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
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"],
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
                                    "aria-label": label,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1570,
                                        columnNumber: 17
                                    }, this)
                                }, id, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1560,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1551,
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
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"],
                                    label: 'Connector'
                                },
                                {
                                    id: 'text',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"],
                                    label: 'Text'
                                },
                                {
                                    id: 'laser',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dot$3e$__["Dot"],
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
                                    "aria-label": label,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1597,
                                        columnNumber: 17
                                    }, this)
                                }, id, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1587,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1574,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm",
                            children: [
                                COLORS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setColor(c),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-5 w-5 rounded-full border transition-all", color === c ? 'scale-110 border-slate-600' : 'border-transparent'),
                                        style: {
                                            backgroundColor: c
                                        },
                                        title: c
                                    }, c, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1604,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "color",
                                    value: customColor,
                                    onChange: (e)=>{
                                        setCustomColor(e.target.value);
                                        setColor(e.target.value);
                                    },
                                    className: "h-5 w-7 cursor-pointer rounded border bg-transparent p-0",
                                    title: "Custom color"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1615,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1602,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Stroke"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1628,
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
                                    className: "w-20"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1629,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-6 text-xs font-medium text-slate-600",
                                    children: brushSize
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1637,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1627,
                            columnNumber: 11
                        }, this),
                        tool === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Font"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1641,
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
                                    className: "w-20"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1642,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-6 text-xs font-medium text-slate-600",
                                    children: fontSize
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1650,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1640,
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
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1656,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1654,
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
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1672,
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
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1681,
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
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1690,
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
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1699,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1671,
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
                                    disabled: isLayerLocked,
                                    children: "Up"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1712,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Nudge selection left",
                                    onClick: ()=>nudgeSelection(-10, 0),
                                    disabled: isLayerLocked,
                                    children: "Left"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1715,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Nudge selection right",
                                    onClick: ()=>nudgeSelection(10, 0),
                                    disabled: isLayerLocked,
                                    children: "Right"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1718,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Nudge selection down",
                                    onClick: ()=>nudgeSelection(0, 10),
                                    disabled: isLayerLocked,
                                    children: "Down"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1721,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Scale selected items down",
                                    onClick: ()=>scaleSelection(0.9),
                                    disabled: isLayerLocked,
                                    children: "Scale -"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1724,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Scale selected items up",
                                    onClick: ()=>scaleSelection(1.1),
                                    disabled: isLayerLocked,
                                    children: "Scale +"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1727,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Select all with same color",
                                    onClick: ()=>selectByAttribute('color'),
                                    disabled: isLayerLocked,
                                    children: "Same Color"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1730,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Select all with same stroke type",
                                    onClick: ()=>selectByAttribute('type'),
                                    disabled: isLayerLocked,
                                    children: "Same Type"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1733,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-7 px-2 text-xs",
                                    title: "Select all in same layer",
                                    onClick: ()=>selectByAttribute('layer'),
                                    disabled: isLayerLocked,
                                    children: "Same Layer"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1736,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1711,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: zoomPreset === 1 ? 'default' : 'outline',
                                    className: "h-7 px-2 text-xs",
                                    onClick: ()=>setZoomPreset(1),
                                    children: "100%"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1743,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: zoomPreset === 1.25 ? 'default' : 'outline',
                                    className: "h-7 px-2 text-xs",
                                    onClick: ()=>setZoomPreset(1.25),
                                    children: "125%"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1746,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: zoomPreset === 1.5 ? 'default' : 'outline',
                                    className: "h-7 px-2 text-xs",
                                    onClick: ()=>setZoomPreset(1.5),
                                    children: "150%"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1749,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1742,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: snapEnabled ? 'default' : 'outline',
                            className: "h-7 px-2 text-xs",
                            title: "Toggle snap-to-grid",
                            onClick: ()=>setSnapEnabled((prev)=>!prev),
                            children: "Snap"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1753,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: gridVisible ? 'default' : 'outline',
                            className: "h-7 px-2 text-xs",
                            title: "Show or hide grid",
                            onClick: ()=>setGridVisible((prev)=>!prev),
                            children: "Grid"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1756,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-lg border bg-white px-2 py-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Grid"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1760,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                    value: [
                                        gridSize
                                    ],
                                    onValueChange: ([v])=>setGridSize(v),
                                    min: 8,
                                    max: 64,
                                    step: 2,
                                    className: "w-20"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1761,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-6 text-xs font-medium text-slate-600",
                                    children: gridSize
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1762,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1759,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: followTutorCursor ? 'default' : 'outline',
                            className: "h-7 px-2 text-xs",
                            title: "Center viewport on tutor cursor",
                            onClick: ()=>setFollowTutorCursor((prev)=>!prev),
                            children: "Follow Tutor"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1764,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: activeLayerId === 'student-personal' ? 'default' : 'outline',
                                    className: "h-7 px-2 text-xs",
                                    onClick: ()=>setActiveLayerId('student-personal'),
                                    children: "My Layer"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1769,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: activeLayerId === 'shared-group' ? 'default' : 'outline',
                                    className: "h-7 px-2 text-xs",
                                    onClick: ()=>setActiveLayerId('shared-group'),
                                    children: "Shared Layer"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1777,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1768,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ml-auto flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "outline",
                                    className: "text-xs",
                                    children: [
                                        Math.round(viewport.scale * 100),
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1788,
                                    columnNumber: 13
                                }, this),
                                selectedStrokeIds.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "secondary",
                                    className: "text-xs",
                                    children: [
                                        selectedStrokeIds.size,
                                        " selected"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1792,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    className: "h-7 text-xs",
                                    onClick: submitMyBoard,
                                    disabled: isLayerLocked || myStrokes.length === 0 || hasSubmitted,
                                    children: hasSubmitted ? 'Submitted' : 'Submit'
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1796,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-7 w-7",
                                    onClick: ()=>undoLastStroke(),
                                    disabled: isLayerLocked,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo$3e$__["Undo"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1806,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1805,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-7 w-7",
                                    onClick: clearOwnStrokes,
                                    disabled: isLayerLocked,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1809,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1808,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1787,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                    lineNumber: 1550,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                lineNumber: 1549,
                columnNumber: 7
            }, this),
            tutorStrokes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-1.5 border-b bg-blue-50 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-blue-700",
                        children: [
                            tutorStrokes.length,
                            " strokes from tutor"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1818,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        className: "h-6 text-xs",
                        onClick: ()=>setShowTutorBoard(!showTutorBoard),
                        children: showTutorBoard ? 'Hide' : 'Show'
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                        lineNumber: 1821,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                lineNumber: 1817,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-3", mode === 'floating' ? "h-64" : "h-full min-h-[380px]"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-full h-full overflow-hidden", highContrast && "contrast-150 saturate-150"),
                    style: {
                        backgroundImage: getOverlayBackground(),
                        backgroundSize: assignmentOverlay === 'chemistry-structure' ? '120px 80px' : assignmentOverlay === 'geometry-grid' ? '24px 24px' : '20px 20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                            ref: canvasRef,
                            onPointerDown: handlePointerDown,
                            onPointerMove: handlePointerMove,
                            onPointerUp: handlePointerUp,
                            onPointerLeave: handlePointerUp,
                            onWheel: handleWheel,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full h-full border rounded bg-white", isLayerLocked ? 'cursor-not-allowed' : tool === 'laser' ? 'cursor-none' : tool === 'hand' ? 'cursor-grab' : tool === 'select' ? 'cursor-default' : 'cursor-crosshair'),
                            "aria-label": "Student whiteboard canvas"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1843,
                            columnNumber: 11
                        }, this),
                        textDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute z-30",
                            style: {
                                left: textDraft.x,
                                top: textDraft.y
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-72 rounded-md border border-slate-300 bg-white/95 p-2 shadow-lg",
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
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1866,
                                        columnNumber: 17
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
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                lineNumber: 1885,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                onClick: commitTextDraft,
                                                children: "Place"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                                lineNumber: 1888,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1884,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1865,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1861,
                            columnNumber: 13
                        }, this),
                        spotlight.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 pointer-events-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black/30"
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1897,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute border-2 border-yellow-300 shadow-[0_0_0_9999px_rgba(0,0,0,0.32)]", spotlight.mode === 'pen' ? 'rounded-full' : 'rounded-md'),
                                    style: {
                                        left: spotlight.x,
                                        top: spotlight.y,
                                        width: spotlight.width,
                                        height: spotlight.height
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                    lineNumber: 1898,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                            lineNumber: 1896,
                            columnNumber: 13
                        }, this),
                        Array.from(remoteCursors.values()).filter((cursor)=>cursor.userId !== myUserId).map((cursor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1921,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2.5 w-2.5 rounded-full border border-white shadow",
                                        style: {
                                            backgroundColor: cursorColorForId(cursor.userId)
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1923,
                                        columnNumber: 19
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
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                        lineNumber: 1928,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, cursor.userId, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                                lineNumber: 1915,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                    lineNumber: 1834,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
                lineNumber: 1833,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/student/live/components/StudentLiveWhiteboard.tsx",
        lineNumber: 1413,
        columnNumber: 5
    }, this);
}
_s(StudentLiveWhiteboard, "hwiFSSPxYf8twTJOIlP6HEA5K6I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$live$2d$class$2d$whiteboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveClassWhiteboard"]
    ];
});
_c = StudentLiveWhiteboard;
var _c;
__turbopack_context__.k.register(_c, "StudentLiveWhiteboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=bc048eae-de7c-164a-2e66-701b7c226b65
//# sourceMappingURL=e127f_src_app_%5Blocale%5D_student_live_components_StudentLiveWhiteboard_tsx_96c1f057._.js.map