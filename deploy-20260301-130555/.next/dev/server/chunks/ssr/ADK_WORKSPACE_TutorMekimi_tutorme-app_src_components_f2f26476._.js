;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="29c6584b-d267-16ba-e7eb-c5f56365b8b6")}catch(e){}}();
module.exports = [
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFCollaborativeViewer",
    ()=>PDFCollaborativeViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-ssr] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$pdf$2d$collab$2d$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-pdf-collab-socket.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/pdf-tutoring/coordinates.ts [app-ssr] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any */ 'use client';
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
async function loadOptionalModule(moduleName) {
    try {
        const importer = new Function('name', 'return import(name)');
        return await importer(moduleName);
    } catch  {
        return null;
    }
}
function PDFCollaborativeViewer({ roomId, role = 'tutor', initialPdfUrl, forceLocked, showLockControl, showCollabStatus = true, showAiActions = true, capabilities }) {
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSession"])();
    const pdfCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fabricCanvasElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fabricInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renderTaskRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renderSeqRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const suppressBroadcastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('original');
    const [pdfBytes, setPdfBytes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pdfDoc, setPdfDoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pageNum, setPageNum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageCount, setPageCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [cleanedText, setCleanedText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [markedFeedback, setMarkedFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [fabricReady, setFabricReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('draw');
    const [strokeColor, setStrokeColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('#ef4444');
    const [strokeWidth, setStrokeWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2);
    const userId = session?.user?.id;
    const userName = session?.user?.name || 'Tutor';
    const effectiveCapabilities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            draw: capabilities?.draw ?? true,
            erase: capabilities?.erase ?? true,
            select: capabilities?.select ?? true,
            text: capabilities?.text ?? true,
            shapes: capabilities?.shapes ?? true,
            clear: capabilities?.clear ?? true,
            flatten: capabilities?.flatten ?? true
        }), [
        capabilities
    ]);
    const applyObjectPercentToPx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((object, width, height)=>{
        const next = {
            ...object,
            ...typeof object.left === 'number' ? {
                left: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(object.left, width)
            } : {},
            ...typeof object.top === 'number' ? {
                top: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(object.top, height)
            } : {},
            ...typeof object.width === 'number' ? {
                width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(object.width, width)
            } : {},
            ...typeof object.height === 'number' ? {
                height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(object.height, height)
            } : {},
            ...typeof object.radius === 'number' ? {
                radius: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(object.radius, Math.min(width, height))
            } : {},
            ...typeof object.strokeWidth === 'number' ? {
                strokeWidth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(object.strokeWidth, Math.min(width, height))
            } : {},
            ...typeof object.fontSize === 'number' ? {
                fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(object.fontSize, height)
            } : {}
        };
        if (Array.isArray(next.points)) {
            next.points = next.points.map((p)=>({
                    x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(p.x, width),
                    y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(p.y, height)
                }));
        }
        if (Array.isArray(next.path)) {
            next.path = next.path.map((segment)=>{
                if (!Array.isArray(segment) || segment.length < 3) return segment;
                const [cmd, ...nums] = segment;
                const converted = [
                    String(cmd)
                ];
                for(let i = 0; i < nums.length; i += 2){
                    const x = Number(nums[i]);
                    const y = Number(nums[i + 1]);
                    converted.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(x, width), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(y, height));
                }
                return converted;
            });
        }
        return next;
    }, []);
    const serializeObjectToPercent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((obj, width, height)=>{
        const raw = obj.toObject([
            'id',
            'type',
            'left',
            'top',
            'width',
            'height',
            'radius',
            'scaleX',
            'scaleY',
            'strokeWidth',
            'fontSize',
            'angle',
            'fill',
            'stroke',
            'text',
            'path',
            'points'
        ]);
        const next = {
            ...raw,
            id: raw.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            ...typeof raw.left === 'number' ? {
                left: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(raw.left, width)
            } : {},
            ...typeof raw.top === 'number' ? {
                top: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(raw.top, height)
            } : {},
            ...typeof raw.width === 'number' ? {
                width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(raw.width, width)
            } : {},
            ...typeof raw.height === 'number' ? {
                height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(raw.height, height)
            } : {},
            ...typeof raw.radius === 'number' ? {
                radius: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(raw.radius, Math.min(width, height))
            } : {},
            ...typeof raw.strokeWidth === 'number' ? {
                strokeWidth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(raw.strokeWidth, Math.min(width, height))
            } : {},
            ...typeof raw.fontSize === 'number' ? {
                fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(raw.fontSize, height)
            } : {}
        };
        if (Array.isArray(next.points)) {
            next.points = next.points.map((p)=>({
                    x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(p.x, width),
                    y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(p.y, height)
                }));
        }
        if (Array.isArray(next.path)) {
            next.path = next.path.map((segment)=>{
                if (!Array.isArray(segment) || segment.length < 3) return segment;
                const [cmd, ...nums] = segment;
                const converted = [
                    String(cmd)
                ];
                for(let i = 0; i < nums.length; i += 2){
                    const x = Number(nums[i]);
                    const y = Number(nums[i + 1]);
                    converted.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(x, width), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pxToPercent"])(y, height));
                }
                return converted;
            });
        }
        return next;
    }, []);
    const onCanvasEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (payload)=>{
        if (payload.page !== pageNum) return;
        const fabricCanvas = fabricInstanceRef.current;
        if (!fabricCanvas || payload.actorId === userId) return;
        suppressBroadcastRef.current = true;
        try {
            if (payload.action === 'removed' && payload.objectId) {
                const target = fabricCanvas.getObjects().find((obj)=>obj.id === payload.objectId);
                if (target) {
                    fabricCanvas.remove(target);
                    fabricCanvas.renderAll();
                }
                return;
            }
            if (!payload.object) return;
            const width = fabricCanvas.getWidth();
            const height = fabricCanvas.getHeight();
            const objectData = applyObjectPercentToPx(payload.object, width, height);
            if (!objectData.id) return;
            const existing = fabricCanvas.getObjects().find((obj)=>obj.id === objectData.id);
            if (existing) {
                existing.set(objectData);
                existing.setCoords();
                fabricCanvas.renderAll();
                return;
            }
            const fabricMod = await loadOptionalModule('fabric');
            const fabricApi = fabricMod?.fabric || fabricMod;
            const enliven = fabricApi?.util?.enlivenObjects;
            if (typeof enliven === 'function') {
                enliven([
                    objectData
                ], (objects)=>{
                    if (!objects?.[0]) return;
                    fabricCanvas.add(objects[0]);
                    fabricCanvas.renderAll();
                });
            }
        } finally{
            setTimeout(()=>{
                suppressBroadcastRef.current = false;
            }, 16);
        }
    }, [
        applyObjectPercentToPx,
        pageNum,
        userId
    ]);
    const onCanvasState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (payload)=>{
        const fabricCanvas = fabricInstanceRef.current;
        if (!fabricCanvas) return;
        // Rebuild last known state from event stream for late joiners.
        const byId = new Map();
        for (const evt of payload.events){
            if (evt.page !== pageNum || !evt.objectId) continue;
            if (evt.action === 'removed') {
                byId.delete(evt.objectId);
                continue;
            }
            byId.set(evt.objectId, evt);
        }
        suppressBroadcastRef.current = true;
        try {
            fabricCanvas.clear();
            const width = fabricCanvas.getWidth();
            const height = fabricCanvas.getHeight();
            const fabricMod = await loadOptionalModule('fabric');
            const fabricApi = fabricMod?.fabric || fabricMod;
            const enliven = fabricApi?.util?.enlivenObjects;
            if (typeof enliven !== 'function') return;
            const objects = Array.from(byId.values()).map((evt)=>evt.object).filter((obj)=>Boolean(obj)).map((obj)=>applyObjectPercentToPx(obj, width, height));
            enliven(objects, (liveObjects)=>{
                liveObjects.forEach((obj)=>fabricCanvas.add(obj));
                fabricCanvas.renderAll();
            });
        } finally{
            setTimeout(()=>{
                suppressBroadcastRef.current = false;
            }, 16);
        }
    }, [
        applyObjectPercentToPx,
        pageNum
    ]);
    const { isConnected, isLocked, latencyMs, participants, emitCanvasEvent, setLock } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$pdf$2d$collab$2d$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePdfCollabSocket"])({
        roomId,
        userId,
        name: userName,
        role,
        onCanvasEvent,
        onCanvasState
    });
    const effectiveLocked = typeof forceLocked === 'boolean' ? forceLocked : isLocked;
    const canDraw = effectiveCapabilities.draw && !effectiveLocked;
    const canErase = effectiveCapabilities.erase && !effectiveLocked;
    const canSelect = effectiveCapabilities.select && !effectiveLocked;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (tool === 'draw' && !effectiveCapabilities.draw) {
            setTool(effectiveCapabilities.erase ? 'erase' : 'select');
            return;
        }
        if (tool === 'erase' && !effectiveCapabilities.erase) {
            setTool(effectiveCapabilities.draw ? 'draw' : 'select');
            return;
        }
        if (tool === 'select' && !effectiveCapabilities.select) {
            setTool(effectiveCapabilities.draw ? 'draw' : 'erase');
        }
    }, [
        effectiveCapabilities.draw,
        effectiveCapabilities.erase,
        effectiveCapabilities.select,
        tool
    ]);
    const renderPdfPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (doc, pageIndex)=>{
        const canvas = pdfCanvasRef.current;
        if (!canvas || !doc) return;
        const renderToken = ++renderSeqRef.current;
        if (renderTaskRef.current) {
            try {
                renderTaskRef.current.cancel?.();
            } catch  {
            // Ignore cancellation failures; we'll continue with latest render request.
            }
            renderTaskRef.current = null;
        }
        const page = await doc.getPage(pageIndex);
        const viewport = page.getViewport({
            scale: 1.35
        });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const task = page.render({
            canvasContext: ctx,
            viewport
        });
        renderTaskRef.current = task;
        try {
            await task.promise;
        } catch (error) {
            if (error?.name === 'RenderingCancelledException') return;
            throw error;
        } finally{
            if (renderTaskRef.current === task) {
                renderTaskRef.current = null;
            }
        }
        if (renderSeqRef.current !== renderToken) return;
        const overlay = fabricCanvasElementRef.current;
        if (overlay) {
            overlay.width = viewport.width;
            overlay.height = viewport.height;
            overlay.style.width = `${viewport.width}px`;
            overlay.style.height = `${viewport.height}px`;
        }
        if (fabricInstanceRef.current) {
            fabricInstanceRef.current.setDimensions({
                width: viewport.width,
                height: viewport.height
            });
            fabricInstanceRef.current.renderAll();
        }
    }, []);
    const initializeFabric = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!fabricCanvasElementRef.current || fabricInstanceRef.current) return;
        try {
            const fabricMod = await loadOptionalModule('fabric');
            const fabricApi = fabricMod?.fabric || fabricMod;
            if (!fabricApi?.Canvas) {
                console.error('[PDFCollaborativeViewer] fabric library not found. Please run: npm install fabric');
                setFabricReady(false);
                return;
            }
            const fabricCanvas = new fabricApi.Canvas(fabricCanvasElementRef.current, {
                isDrawingMode: true,
                selection: true
            });
            fabricCanvas.freeDrawingBrush.width = 2;
            fabricCanvas.freeDrawingBrush.color = '#ef4444';
            fabricInstanceRef.current = fabricCanvas;
            setFabricReady(true);
            const broadcast = (action, target)=>{
                if (!target || suppressBroadcastRef.current) return;
                const width = fabricCanvas.getWidth();
                const height = fabricCanvas.getHeight();
                const objectData = serializeObjectToPercent(target, width, height);
                target.id = objectData.id;
                emitCanvasEvent({
                    page: pageNum,
                    action,
                    object: objectData,
                    objectId: objectData.id
                });
            };
            fabricCanvas.on('path:created', (evt)=>{
                if (!evt?.path) return;
                broadcast('created', evt.path);
            });
            fabricCanvas.on('object:modified', (evt)=>broadcast('modified', evt?.target));
            fabricCanvas.on('object:removed', (evt)=>broadcast('removed', evt?.target));
            return ()=>{
                fabricCanvas.dispose();
                fabricInstanceRef.current = null;
                setFabricReady(false);
            };
        } catch (err) {
            console.error('[PDFCollaborativeViewer] Error initializing fabric:', err);
            setFabricReady(false);
        }
    }, [
        emitCanvasEvent,
        pageNum,
        serializeObjectToPercent
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let dispose;
        initializeFabric().then((fn)=>{
            if (typeof fn === 'function') dispose = fn;
        }).catch(()=>{
            setFabricReady(false);
        });
        return ()=>{
            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel?.();
                } catch  {
                // no-op
                }
                renderTaskRef.current = null;
            }
            dispose?.();
        };
    }, [
        initializeFabric
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (fabricInstanceRef.current) {
            const canUseCurrentDrawTool = tool === 'draw' && canDraw || tool === 'erase' && canErase;
            fabricInstanceRef.current.isDrawingMode = canUseCurrentDrawTool;
            fabricInstanceRef.current.selection = canSelect;
            if (fabricInstanceRef.current.freeDrawingBrush) {
                fabricInstanceRef.current.freeDrawingBrush.width = strokeWidth;
                fabricInstanceRef.current.freeDrawingBrush.color = tool === 'erase' ? '#ffffff' : strokeColor;
            }
        }
    }, [
        canDraw,
        canErase,
        canSelect,
        strokeColor,
        strokeWidth,
        tool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!pdfDoc) return;
        renderPdfPage(pdfDoc, pageNum);
    }, [
        pdfDoc,
        pageNum,
        renderPdfPage
    ]);
    const onFileSelected = async (event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        const bytes = await file.arrayBuffer();
        setPdfBytes(bytes);
        const pdfjs = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pdfjs-dist/build/pdf.mjs [app-ssr] (ecmascript, async loader)");
        const opts = pdfjs.GlobalWorkerOptions;
        if (opts && !opts.workerSrc) opts.workerSrc = '/pdf.worker.min.mjs';
        const doc = await pdfjs.getDocument({
            data: bytes
        }).promise;
        setPdfDoc(doc);
        setPageCount(doc.numPages);
        setPageNum(1);
        await renderPdfPage(doc, 1);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!initialPdfUrl) return;
        let cancelled = false;
        const loadInitialPdf = async ()=>{
            try {
                const res = await fetch(initialPdfUrl, {
                    credentials: 'include'
                });
                if (!res.ok) return;
                const bytes = await res.arrayBuffer();
                if (cancelled) return;
                setPdfBytes(bytes);
                const pdfjs = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pdfjs-dist/build/pdf.mjs [app-ssr] (ecmascript, async loader)");
                const opts = pdfjs.GlobalWorkerOptions;
                if (opts && !opts.workerSrc) opts.workerSrc = '/pdf.worker.min.mjs';
                const doc = await pdfjs.getDocument({
                    data: bytes
                }).promise;
                if (cancelled) return;
                setPdfDoc(doc);
                setPageCount(doc.numPages);
                setPageNum(1);
                await renderPdfPage(doc, 1);
            } catch  {
            // Keep component usable even if initial URL fails to load.
            }
        };
        void loadInitialPdf();
        return ()=>{
            cancelled = true;
        };
    }, [
        initialPdfUrl,
        renderPdfPage
    ]);
    const callReadService = async ()=>{
        const png = pdfCanvasRef.current?.toDataURL('image/png');
        if (!png) return;
        const res = await fetch('/api/pdf-tutoring/read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageDataUrl: png
            })
        });
        const data = await res.json();
        setCleanedText(data.markdown || data.content || '');
        setMode('cleaned');
    };
    const callMarkService = async ()=>{
        const png = pdfCanvasRef.current?.toDataURL('image/png');
        if (!png) return;
        const res = await fetch('/api/pdf-tutoring/mark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageDataUrl: png,
                rubric: 'Award partial credit for correct setup and intermediate algebraic transformations.'
            })
        });
        const data = await res.json();
        setMarkedFeedback(JSON.stringify(data.result || data, null, 2));
        setMode('marked');
    };
    const applyAiErrorCircles = async ()=>{
        const canvas = fabricInstanceRef.current;
        if (!canvas || !markedFeedback) return;
        let parsed = null;
        try {
            parsed = JSON.parse(markedFeedback);
        } catch  {
            return;
        }
        const mistakes = Array.isArray(parsed?.mistakeLocations) ? parsed.mistakeLocations : [];
        if (mistakes.length === 0) return;
        const fabricMod = await loadOptionalModule('fabric');
        const fabricApi = fabricMod?.fabric || fabricMod;
        if (!fabricApi?.Circle) return;
        const width = canvas.getWidth();
        const height = canvas.getHeight();
        mistakes.forEach((mistake, idx)=>{
            const rawX = typeof mistake?.x === 'number' ? mistake.x : 40 + idx * 30;
            const rawY = typeof mistake?.y === 'number' ? mistake.y : 40 + idx * 22;
            const x = rawX <= 100 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(rawX, width) : rawX;
            const y = rawY <= 100 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$pdf$2d$tutoring$2f$coordinates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percentToPx"])(rawY, height) : rawY;
            const circle = new fabricApi.Circle({
                id: `ai-mistake-${Date.now()}-${idx}`,
                left: Math.max(8, x - 18),
                top: Math.max(8, y - 18),
                radius: 18,
                fill: 'rgba(239,68,68,0.06)',
                stroke: '#ef4444',
                strokeWidth: 2,
                selectable: true
            });
            canvas.add(circle);
        });
        canvas.renderAll();
    };
    const callFlattenService = async ()=>{
        if (!pdfBytes || !fabricInstanceRef.current) return;
        const bytes = new Uint8Array(pdfBytes);
        let binary = '';
        for(let i = 0; i < bytes.length; i++)binary += String.fromCharCode(bytes[i]);
        const originalPdfBase64 = btoa(binary);
        const canvas = fabricInstanceRef.current;
        const payload = {
            originalPdfBase64,
            fabric: {
                page: pageNum,
                width: canvas.getWidth(),
                height: canvas.getHeight(),
                objects: canvas.getObjects().map((obj)=>serializeObjectToPercent(obj, canvas.getWidth(), canvas.getHeight()))
            }
        };
        const res = await fetch('/api/pdf-tutoring/flatten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) return;
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const addTextBox = async ()=>{
        const canvas = fabricInstanceRef.current;
        if (!canvas || effectiveLocked || !effectiveCapabilities.text) return;
        const fabricMod = await loadOptionalModule('fabric');
        const fabricApi = fabricMod?.fabric || fabricMod;
        if (!fabricApi?.IText) return;
        const text = new fabricApi.IText('Type here', {
            id: `text-${Date.now()}`,
            left: 48,
            top: 48,
            fill: '#ef4444',
            fontSize: 20,
            editable: true
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing?.();
        canvas.renderAll();
    };
    const addRectangle = async ()=>{
        const canvas = fabricInstanceRef.current;
        if (!canvas || effectiveLocked || !effectiveCapabilities.shapes) return;
        const fabricMod = await loadOptionalModule('fabric');
        const fabricApi = fabricMod?.fabric || fabricMod;
        if (!fabricApi?.Rect) return;
        const rect = new fabricApi.Rect({
            id: `rect-${Date.now()}`,
            left: 48,
            top: 48,
            width: 140,
            height: 90,
            fill: 'transparent',
            stroke: strokeColor,
            strokeWidth
        });
        canvas.add(rect);
        canvas.setActiveObject(rect);
        canvas.renderAll();
    };
    const addCircle = async ()=>{
        const canvas = fabricInstanceRef.current;
        if (!canvas || effectiveLocked || !effectiveCapabilities.shapes) return;
        const fabricMod = await loadOptionalModule('fabric');
        const fabricApi = fabricMod?.fabric || fabricMod;
        if (!fabricApi?.Circle) return;
        const circle = new fabricApi.Circle({
            id: `circle-${Date.now()}`,
            left: 48,
            top: 48,
            radius: 55,
            fill: 'transparent',
            stroke: strokeColor,
            strokeWidth
        });
        canvas.add(circle);
        canvas.setActiveObject(circle);
        canvas.renderAll();
    };
    const clearCurrentPage = ()=>{
        const canvas = fabricInstanceRef.current;
        if (!canvas || effectiveLocked || !effectiveCapabilities.clear) return;
        canvas.clear();
        canvas.renderAll();
    };
    const saveSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const canvas = fabricInstanceRef.current;
        if (!canvas) return;
        await fetch('/api/pdf-tutoring/snapshots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomId,
                page: pageNum,
                width: canvas.getWidth(),
                height: canvas.getHeight(),
                objects: canvas.getObjects().map((obj)=>serializeObjectToPercent(obj, canvas.getWidth(), canvas.getHeight()))
            })
        });
    }, [
        roomId,
        pageNum,
        serializeObjectToPercent
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (role !== 'tutor') return;
        const interval = setInterval(()=>{
            const canvas = fabricInstanceRef.current;
            if (!canvas) return;
            if ((canvas.getObjects?.() || []).length === 0) return;
            void saveSnapshot();
        }, 60 * 1000);
        return ()=>clearInterval(interval);
    }, [
        role,
        saveSnapshot
    ]);
    const loadLatestSnapshot = async ()=>{
        const canvas = fabricInstanceRef.current;
        if (!canvas) return;
        const res = await fetch(`/api/pdf-tutoring/snapshots?roomId=${encodeURIComponent(roomId)}&limit=1`, {
            credentials: 'include'
        });
        if (!res.ok) return;
        const data = await res.json();
        const latest = data?.snapshots?.[0];
        const payload = latest?.pages?.[0];
        if (!payload?.objects || !Array.isArray(payload.objects)) return;
        canvas.clear();
        const width = canvas.getWidth();
        const height = canvas.getHeight();
        const fabricMod = await loadOptionalModule('fabric');
        const fabricApi = fabricMod?.fabric || fabricMod;
        const enliven = fabricApi?.util?.enlivenObjects;
        if (typeof enliven !== 'function') return;
        const mapped = payload.objects.map((obj)=>applyObjectPercentToPx(obj, width, height));
        enliven(mapped, (objects)=>{
            objects.forEach((obj)=>canvas.add(obj));
            canvas.renderAll();
        });
    };
    const connectionBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!isConnected) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            variant: "destructive",
            children: "Offline"
        }, void 0, false, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
            lineNumber: 686,
            columnNumber: 30
        }, this);
        if (latencyMs !== null && latencyMs > 50) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            variant: "secondary",
            children: [
                "Sync ",
                latencyMs,
                "ms"
            ]
        }, void 0, true, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
            lineNumber: 687,
            columnNumber: 54
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            variant: "default",
            children: "Sync <50ms"
        }, void 0, false, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
            lineNumber: 688,
            columnNumber: 12
        }, this);
    }, [
        isConnected,
        latencyMs
    ]);
    const participantSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const total = participants.length;
        const tutors = participants.filter((participant)=>participant.role === 'tutor').length;
        const students = total - tutors;
        return {
            total,
            tutors,
            students
        };
    }, [
        participants
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                        type: "file",
                        accept: "application/pdf",
                        onChange: onFileSelected,
                        className: "max-w-sm"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 700,
                        columnNumber: 9
                    }, this),
                    showCollabStatus && connectionBadge,
                    showCollabStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "outline",
                        children: [
                            "Live: ",
                            participantSummary.total,
                            " (",
                            participantSummary.tutors,
                            " tutor, ",
                            participantSummary.students,
                            " students)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 703,
                        columnNumber: 11
                    }, this),
                    showCollabStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: isLocked ? 'destructive' : 'secondary',
                        children: effectiveLocked ? 'Canvas Locked' : 'Canvas Unlocked'
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 708,
                        columnNumber: 11
                    }, this),
                    (showLockControl ?? role === 'tutor') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>setLock(!effectiveLocked),
                        children: [
                            effectiveLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 714,
                                columnNumber: 32
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 714,
                                columnNumber: 70
                            }, this),
                            effectiveLocked ? 'Unlock Canvas' : 'Lock Canvas'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 713,
                        columnNumber: 11
                    }, this),
                    showAiActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: callReadService,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 720,
                                columnNumber: 13
                            }, this),
                            "AI Cleaned Text"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 719,
                        columnNumber: 11
                    }, this),
                    showAiActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: callMarkService,
                        children: "Run AI Marking"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 724,
                        columnNumber: 27
                    }, this),
                    showAiActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: applyAiErrorCircles,
                        children: "Apply AI Error Circles"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 725,
                        columnNumber: 27
                    }, this),
                    effectiveCapabilities.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: addTextBox,
                        disabled: effectiveLocked,
                        children: "Add Text"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 727,
                        columnNumber: 11
                    }, this),
                    effectiveCapabilities.shapes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: addRectangle,
                                disabled: effectiveLocked,
                                children: "Rectangle"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 733,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: addCircle,
                                disabled: effectiveLocked,
                                children: "Circle"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 736,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: tool === 'draw' ? 'default' : 'outline',
                        size: "sm",
                        onClick: ()=>setTool('draw'),
                        disabled: !canDraw,
                        children: "Draw"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 741,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: tool === 'erase' ? 'default' : 'outline',
                        size: "sm",
                        onClick: ()=>setTool('erase'),
                        disabled: !canErase,
                        children: "Erase"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 744,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: tool === 'select' ? 'default' : 'outline',
                        size: "sm",
                        onClick: ()=>setTool('select'),
                        disabled: !canSelect,
                        children: "Select"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 747,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-1 text-xs",
                        children: [
                            "Color",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "color",
                                value: strokeColor,
                                onChange: (e)=>setStrokeColor(e.target.value),
                                disabled: effectiveLocked || !canDraw && !canErase,
                                className: "h-7 w-10 rounded border"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 752,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 750,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-1 text-xs",
                        children: [
                            "Width",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: 1,
                                max: 10,
                                step: 1,
                                value: strokeWidth,
                                onChange: (e)=>setStrokeWidth(Number(e.target.value)),
                                disabled: effectiveLocked || !canDraw && !canErase
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 762,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: strokeWidth
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 771,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 760,
                        columnNumber: 9
                    }, this),
                    effectiveCapabilities.clear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: clearCurrentPage,
                        disabled: effectiveLocked,
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 774,
                        columnNumber: 11
                    }, this),
                    role === 'tutor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: saveSnapshot,
                                children: "Save Snapshot"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 780,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: loadLatestSnapshot,
                                children: "Load Latest Snapshot"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                                lineNumber: 781,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    effectiveCapabilities.flatten && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        onClick: callFlattenService,
                        children: "Flatten PDF"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 784,
                        columnNumber: 43
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                lineNumber: 699,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                value: mode,
                onValueChange: (value)=>setMode(value),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "original",
                            children: "Original View"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                            lineNumber: 789,
                            columnNumber: 11
                        }, this),
                        showAiActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "cleaned",
                            children: "AI Cleaned Text"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                            lineNumber: 790,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "marked",
                            children: "Marked Feedback"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                            lineNumber: 791,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                    lineNumber: 788,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                lineNumber: 787,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        disabled: pageNum <= 1,
                        onClick: ()=>setPageNum((prev)=>prev - 1),
                        children: "Prev"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 796,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: [
                            "Page ",
                            pageNum,
                            " / ",
                            pageCount
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 797,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        disabled: pageNum >= pageCount,
                        onClick: ()=>setPageNum((prev)=>prev + 1),
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 798,
                        columnNumber: 9
                    }, this),
                    !fabricReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "secondary",
                        children: "Install `fabric` package to enable drawing sync"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 799,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                lineNumber: 795,
                columnNumber: 7
            }, this),
            mode === 'original' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative inline-block border rounded-md overflow-hidden bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: pdfCanvasRef,
                        className: "block"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 804,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: fabricCanvasElementRef,
                        className: "absolute inset-0"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 805,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                lineNumber: 803,
                columnNumber: 9
            }, this),
            mode === 'cleaned' && showAiActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "rounded-md border bg-muted p-4 text-xs whitespace-pre-wrap",
                children: cleanedText || 'No cleaned text generated yet.'
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                lineNumber: 810,
                columnNumber: 9
            }, this),
            mode === 'marked' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "rounded-md border bg-muted p-4 text-xs whitespace-pre-wrap",
                children: markedFeedback || 'No marking feedback generated yet.'
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                lineNumber: 814,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-muted-foreground flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                        className: "w-3.5 h-3.5"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                        lineNumber: 818,
                        columnNumber: 9
                    }, this),
                    "Coordinates are normalized as 0-100 percentages before sync for cross-device consistency."
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
                lineNumber: 817,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx",
        lineNumber: 698,
        columnNumber: 5
    }, this);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFTutoringWorkbench",
    ()=>PDFTutoringWorkbench
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$pdf$2d$tutoring$2f$PDFCollaborativeViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFCollaborativeViewer.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function PDFTutoringWorkbench({ roomId }) {
    const [extractResult, setExtractResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [preprocessUrl, setPreprocessUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Idle');
    const [extractParser, setExtractParser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('unknown');
    const [techCheck, setTechCheck] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const extractPdfText = async (event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setStatus('Extracting text...');
        const res = await fetch('/api/pdf-tutoring/extract', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        setExtractResult(data.markdown || data.text || '');
        setExtractParser(data.parser || 'unknown');
        setTechCheck(data.technologyCheck || null);
        setStatus(res.ok ? 'Text extracted' : 'Extraction failed');
    };
    const preprocessImage = async (event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setStatus('Preprocessing image...');
        const res = await fetch('/api/pdf-tutoring/preprocess', {
            method: 'POST',
            body: formData
        });
        if (!res.ok) {
            setStatus('Preprocess failed');
            return;
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPreprocessUrl(url);
        setStatus('Image preprocessed');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            children: "AI Tutoring Engine - PDF Workbench"
                        }, void 0, false, {
                            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        children: [
                                            "Room: ",
                                            roomId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        children: status
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 rounded-md border p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: "Document Pipeline"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                lineNumber: 78,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "secondary",
                                                        children: [
                                                            "Parser: ",
                                                            extractParser
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 17
                                                    }, this),
                                                    techCheck && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: techCheck.unpdfAvailable ? 'default' : 'outline',
                                                                children: [
                                                                    "unpdf ",
                                                                    techCheck.unpdfAvailable ? 'on' : 'off'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                                lineNumber: 83,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: techCheck.pdfParseAvailable ? 'default' : 'outline',
                                                                children: [
                                                                    "pdf-parse ",
                                                                    techCheck.pdfParseAvailable ? 'on' : 'off'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                                lineNumber: 86,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                lineNumber: 79,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "file",
                                                        accept: "application/pdf",
                                                        onChange: extractPdfText
                                                    }, void 0, false, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "file",
                                                        accept: "image/*",
                                                        onChange: preprocessImage
                                                    }, void 0, false, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                lineNumber: 92,
                                                columnNumber: 15
                                            }, this),
                                            extractResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: [
                                                                    extractResult.length,
                                                                    " chars extracted"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                variant: "outline",
                                                                onClick: async ()=>{
                                                                    await navigator.clipboard.writeText(extractResult);
                                                                    setStatus('Extracted text copied');
                                                                },
                                                                children: "Copy text"
                                                            }, void 0, false, {
                                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "max-h-48 overflow-auto rounded bg-muted p-2 text-xs whitespace-pre-wrap",
                                                        children: extractResult
                                                    }, void 0, false, {
                                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this),
                                            preprocessUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: preprocessUrl,
                                                alt: "Preprocessed homework",
                                                width: 512,
                                                height: 320,
                                                className: "max-h-48 w-auto rounded border",
                                                unoptimized: true
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 rounded-md border p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: "Live Collaboration + Marking"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: "Includes lock/unlock, mode toggles, low-latency sync broadcast, and PDF flattening output."
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                size: "sm",
                                                onClick: ()=>setStatus('Ready for live tutoring'),
                                                children: "Prepare Session"
                                            }, void 0, false, {
                                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$pdf$2d$tutoring$2f$PDFCollaborativeViewer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFCollaborativeViewer"], {
                roomId: roomId
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/pdf-tutoring/PDFTutoringWorkbench.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TldrawMathBoard",
    ()=>TldrawMathBoard,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$Tldraw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/Tldraw.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/yjs/dist/yjs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-ssr] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-ssr] (ecmascript) <export default as WifiOff>");
'use client';
;
;
;
;
;
;
;
;
function TldrawMathBoard({ sessionId, socket, userId, userName, role, className = '' }) {
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const applyingRemoteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const syncTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const yDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const yMetaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canEditRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const queueSnapshotSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLocked, setIsLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const canEdit = role === 'tutor' || !isLocked;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        socketRef.current = socket;
    }, [
        socket
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        canEditRef.current = canEdit;
    }, [
        canEdit
    ]);
    const applyReadonlyState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((editor, readonly)=>{
        if (!editor) return;
        editor.updateInstanceState({
            isReadonly: readonly
        });
    }, []);
    const queueSnapshotSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!editorRef.current || !canEditRef.current) return;
        const yMeta = yMetaRef.current;
        if (!yMeta) return;
        if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
        syncTimerRef.current = setTimeout(()=>{
            if (!editorRef.current || applyingRemoteRef.current) return;
            const rawSnapshot = editorRef.current.getSnapshot();
            // Store a detached JSON-safe snapshot so Yjs always sees state deltas across edits.
            const snapshot = typeof structuredClone === 'function' ? structuredClone(rawSnapshot) : JSON.parse(JSON.stringify(rawSnapshot));
            yMeta.set('snapshot', snapshot);
            yMeta.set('updatedAt', Date.now());
            socketRef.current?.emit('math_tl_snapshot', {
                sessionId,
                snapshot
            });
        }, 180);
    }, [
        sessionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        queueSnapshotSyncRef.current = queueSnapshotSync;
    }, [
        queueSnapshotSync
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!socket) return;
        const yDoc = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Doc"]();
        const yMeta = yDoc.getMap('meta');
        yDocRef.current = yDoc;
        yMetaRef.current = yMeta;
        const onYDocUpdate = (update, origin)=>{
            if (!socket || origin === 'remote') return;
            socket.emit('math_yjs_update', {
                sessionId,
                update: Array.from(update)
            });
        };
        const onYMetaUpdate = ()=>{
            const snapshot = yMeta.get('snapshot');
            if (!snapshot || !editorRef.current || applyingRemoteRef.current) return;
            applyingRemoteRef.current = true;
            try {
                editorRef.current.loadSnapshot(snapshot);
            } finally{
                window.setTimeout(()=>{
                    applyingRemoteRef.current = false;
                }, 0);
            }
        };
        yDoc.on('update', onYDocUpdate);
        yMeta.observe(onYMetaUpdate);
        const join = ()=>{
            socket.emit('math_wb_join', {
                sessionId,
                userId,
                name: userName || (role === 'tutor' ? 'Tutor' : 'Student'),
                role
            });
            socket.emit('math_wb_request_sync', sessionId);
            setIsConnected(true);
        };
        const onConnect = ()=>join();
        const onDisconnect = ()=>{
            setIsConnected(false);
        };
        const onState = (state)=>{
            setIsLocked(Boolean(state.locked));
            if (state.tldrawSnapshot && yMeta) {
                yMeta.set('snapshot', state.tldrawSnapshot);
            }
        };
        const onLockChanged = (data)=>{
            setIsLocked(Boolean(data.locked));
        };
        const onYjsSync = (payload)=>{
            if (payload.sessionId && payload.sessionId !== sessionId) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyUpdate"](yDoc, Uint8Array.from(payload.update || []), 'remote');
        };
        const onYjsUpdate = (payload)=>{
            if (payload.sessionId && payload.sessionId !== sessionId) return;
            if (payload.actorId && payload.actorId === userId) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyUpdate"](yDoc, Uint8Array.from(payload.update || []), 'remote');
        };
        const onSnapshot = (payload)=>{
            if (payload.sessionId && payload.sessionId !== sessionId) return;
            if (payload.actorId && payload.actorId === userId) return;
            if (!payload.snapshot || !editorRef.current) return;
            applyingRemoteRef.current = true;
            try {
                editorRef.current.loadSnapshot(payload.snapshot);
            } finally{
                window.setTimeout(()=>{
                    applyingRemoteRef.current = false;
                }, 0);
            }
        };
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('math_wb_state', onState);
        socket.on('math_wb_lock_changed', onLockChanged);
        socket.on('math_yjs_sync', onYjsSync);
        socket.on('math_yjs_update', onYjsUpdate);
        socket.on('math_tl_snapshot', onSnapshot);
        if (socket.connected) {
            join();
        }
        return ()=>{
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('math_wb_state', onState);
            socket.off('math_wb_lock_changed', onLockChanged);
            socket.off('math_yjs_sync', onYjsSync);
            socket.off('math_yjs_update', onYjsUpdate);
            socket.off('math_tl_snapshot', onSnapshot);
            socket.emit('math_wb_leave', sessionId);
            if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
            yMeta.unobserve(onYMetaUpdate);
            yDoc.off('update', onYDocUpdate);
            yDocRef.current = null;
            yMetaRef.current = null;
        };
    }, [
        role,
        sessionId,
        socket,
        userId,
        userName
    ]);
    const onMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((editor)=>{
        editorRef.current = editor;
        applyReadonlyState(editor, !canEdit);
        // Avoid remote font fetch failures (cdn.tldraw.com) from breaking runtime in restricted networks.
        const fontManager = editor.fonts;
        if (fontManager && !fontManager.__networkPatched) {
            fontManager.__networkPatched = true;
            fontManager.requestFonts = ()=>{};
            fontManager.ensureFontIsLoaded = async ()=>undefined;
            fontManager.loadRequiredFontsForCurrentPage = async ()=>undefined;
        }
        const existingSnapshot = yMetaRef.current?.get('snapshot');
        if (existingSnapshot) {
            editor.loadSnapshot(existingSnapshot);
        }
        const unlisten = editor.store.listen(()=>{
            if (applyingRemoteRef.current) return;
            queueSnapshotSyncRef.current?.();
        }, {
            source: 'user',
            scope: 'document'
        });
        return ()=>{
            unlisten();
            editorRef.current = null;
        };
    }, [
        applyReadonlyState,
        canEdit
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        applyReadonlyState(editorRef.current, !canEdit);
    }, [
        applyReadonlyState,
        canEdit
    ]);
    const statusBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (isConnected) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                variant: "outline",
                className: "gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                        className: "h-3 w-3 text-green-600"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    "Synced"
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            variant: "outline",
            className: "gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                    className: "h-3 w-3 text-amber-600"
                }, void 0, false, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this),
                "Reconnecting"
            ]
        }, void 0, true, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
            lineNumber: 230,
            columnNumber: 7
        }, this);
    }, [
        isConnected
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `h-full min-h-0 flex flex-col rounded-lg border bg-white ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between border-b px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold",
                                children: "Math Whiteboard"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            statusBadge,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: canEdit ? 'default' : 'secondary',
                                children: canEdit ? 'Editable' : 'Read only'
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    role === 'tutor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        className: "gap-1",
                        onClick: ()=>socket?.emit('math_wb_lock', {
                                sessionId,
                                locked: !isLocked
                            }),
                        children: [
                            isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                                lineNumber: 254,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                                lineNumber: 254,
                                columnNumber: 58
                            }, this),
                            isLocked ? 'Unlock Students' : 'Lock Students'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1 min-h-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$Tldraw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tldraw"], {
                    onMount: onMount
                }, void 0, false, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                    lineNumber: 260,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = TldrawMathBoard;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FabricMathBoard",
    ()=>FabricMathBoard,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$fabric$2f$dist$2f$index$2e$min$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/fabric/dist/index.min.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/yjs/dist/yjs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/pen.js [app-ssr] (ecmascript) <export default as Pen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/square.js [app-ssr] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/type.js [app-ssr] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-ssr] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/eraser.js [app-ssr] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-ssr] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-ssr] (ecmascript) <export default as WifiOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/lucide-react/dist/esm/icons/hand.js [app-ssr] (ecmascript) <export default as Hand>");
'use client';
;
;
;
;
;
;
;
function FabricMathBoard({ sessionId, socket, userId, userName, role, className = '' }) {
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasElRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawingShapeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startPointRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toolRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])('draw');
    const canEditRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    const queueSnapshotSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(()=>{});
    const yDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const yMetaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const syncTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const applyingRemoteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('draw');
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLocked, setIsLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasRequestedEditAccess, setHasRequestedEditAccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingEditRequests, setPendingEditRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const canEdit = role === 'tutor' || !isLocked;
    const applyReadonly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((readonly)=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.isDrawingMode = !readonly && (tool === 'draw' || tool === 'erase');
        canvas.selection = !readonly && tool === 'select';
        canvas.skipTargetFind = readonly || tool !== 'select';
        canvas.forEachObject((obj)=>{
            obj.selectable = !readonly;
            obj.evented = !readonly;
        });
        if (readonly) {
            canvas.discardActiveObject();
        }
        canvas.renderAll();
    }, [
        tool
    ]);
    const queueSnapshotSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const canvas = canvasRef.current;
        const yMeta = yMetaRef.current;
        if (!canvas || !yMeta || !canEdit) return;
        if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
        syncTimerRef.current = setTimeout(()=>{
            if (applyingRemoteRef.current || !canvasRef.current || !yMetaRef.current) return;
            const snapshot = canvasRef.current.toJSON();
            yMetaRef.current.set('snapshot', snapshot);
            yMetaRef.current.set('updatedAt', Date.now());
            socket?.emit('math_tl_snapshot', {
                sessionId,
                snapshot
            });
        }, 140);
    }, [
        canEdit,
        sessionId,
        socket
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        toolRef.current = tool;
    }, [
        tool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        canEditRef.current = canEdit;
    }, [
        canEdit
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        queueSnapshotSyncRef.current = queueSnapshotSync;
    }, [
        queueSnapshotSync
    ]);
    const applySnapshotToCanvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((snapshot)=>{
        const canvas = canvasRef.current;
        if (!canvas || !snapshot) return;
        applyingRemoteRef.current = true;
        let finalized = false;
        const finalize = ()=>{
            if (finalized) return;
            finalized = true;
            canvas.renderAll();
            window.setTimeout(()=>{
                applyingRemoteRef.current = false;
            }, 0);
        };
        try {
            const result = canvas.loadFromJSON(snapshot, finalize);
            if (result && typeof result.then === 'function') {
                result.then(finalize).catch(finalize);
            }
        } catch  {
            finalize();
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const yDoc = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Doc"]();
        const yMeta = yDoc.getMap('meta');
        yDocRef.current = yDoc;
        yMetaRef.current = yMeta;
        const onYDocUpdate = (update, origin)=>{
            if (!socket || origin === 'remote') return;
            socket.emit('math_yjs_update', {
                sessionId,
                update: Array.from(update)
            });
        };
        const onYMetaUpdate = ()=>{
            const snapshot = yMeta.get('snapshot');
            if (!snapshot || applyingRemoteRef.current) return;
            applySnapshotToCanvas(snapshot);
        };
        yDoc.on('update', onYDocUpdate);
        yMeta.observe(onYMetaUpdate);
        return ()=>{
            if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
            yMeta.unobserve(onYMetaUpdate);
            yDoc.off('update', onYDocUpdate);
            yDoc.destroy();
            yDocRef.current = null;
            yMetaRef.current = null;
        };
    }, [
        applySnapshotToCanvas,
        sessionId,
        socket
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!socket) return;
        const join = ()=>{
            socket.emit('math_wb_join', {
                sessionId,
                userId,
                name: userName || (role === 'tutor' ? 'Tutor' : 'Student'),
                role
            });
            socket.emit('math_wb_request_sync', sessionId);
            setIsConnected(true);
        };
        const onConnect = ()=>join();
        const onDisconnect = ()=>setIsConnected(false);
        const onState = (state)=>{
            setIsLocked(Boolean(state.locked));
            if (!state.locked) {
                setHasRequestedEditAccess(false);
                if (role === 'tutor') setPendingEditRequests([]);
            }
            if (state.tldrawSnapshot && yMetaRef.current) {
                yMetaRef.current.set('snapshot', state.tldrawSnapshot);
            }
        };
        const onLockChanged = (data)=>{
            setIsLocked(Boolean(data.locked));
            if (!data.locked) {
                setHasRequestedEditAccess(false);
                if (role === 'tutor') setPendingEditRequests([]);
            }
        };
        const onEditRequest = (data)=>{
            if (data.sessionId && data.sessionId !== sessionId) return;
            if (role !== 'tutor') return;
            const requesterName = data.requester?.name?.trim();
            if (!requesterName) return;
            setPendingEditRequests((prev)=>{
                const dedupeKey = data.requester?.userId || requesterName;
                const filtered = prev.filter((item)=>(item.userId || item.name) !== dedupeKey);
                return [
                    ...filtered,
                    {
                        userId: data.requester?.userId,
                        name: requesterName,
                        requestedAt: data.requestedAt || Date.now()
                    }
                ].slice(-6);
            });
        };
        const onYjsSync = (payload)=>{
            if (payload.sessionId && payload.sessionId !== sessionId) return;
            const yDoc = yDocRef.current;
            if (!yDoc) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyUpdate"](yDoc, Uint8Array.from(payload.update || []), 'remote');
        };
        const onYjsUpdate = (payload)=>{
            if (payload.sessionId && payload.sessionId !== sessionId) return;
            if (payload.actorId && payload.actorId === userId) return;
            const yDoc = yDocRef.current;
            if (!yDoc) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyUpdate"](yDoc, Uint8Array.from(payload.update || []), 'remote');
        };
        const onSnapshot = (payload)=>{
            if (payload.sessionId && payload.sessionId !== sessionId) return;
            if (payload.actorId && payload.actorId === userId) return;
            if (!payload.snapshot) return;
            applySnapshotToCanvas(payload.snapshot);
        };
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('math_wb_state', onState);
        socket.on('math_wb_lock_changed', onLockChanged);
        socket.on('math_wb_edit_request', onEditRequest);
        socket.on('math_yjs_sync', onYjsSync);
        socket.on('math_yjs_update', onYjsUpdate);
        socket.on('math_tl_snapshot', onSnapshot);
        if (socket.connected) join();
        return ()=>{
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('math_wb_state', onState);
            socket.off('math_wb_lock_changed', onLockChanged);
            socket.off('math_wb_edit_request', onEditRequest);
            socket.off('math_yjs_sync', onYjsSync);
            socket.off('math_yjs_update', onYjsUpdate);
            socket.off('math_tl_snapshot', onSnapshot);
            socket.emit('math_wb_leave', sessionId);
        };
    }, [
        applySnapshotToCanvas,
        role,
        sessionId,
        socket,
        userId,
        userName
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canvasElRef.current || canvasRef.current) return;
        const canvas = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$fabric$2f$dist$2f$index$2e$min$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Canvas"](canvasElRef.current, {
            width: 1280,
            height: 720,
            backgroundColor: '#ffffff',
            isDrawingMode: true,
            selection: false,
            preserveObjectStacking: true
        });
        canvasRef.current = canvas;
        canvasElRef.current.__fabricCanvas = canvas;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const interactiveCanvas = canvas.upperCanvasEl;
        if (interactiveCanvas) {
            interactiveCanvas.dataset.testid = 'fabric-math-interactive-canvas';
            interactiveCanvas.dataset.mathSession = sessionId;
            interactiveCanvas.__fabricCanvas = canvas;
            interactiveCanvas.style.pointerEvents = 'auto';
            interactiveCanvas.style.touchAction = 'none';
        }
        if (canvas.lowerCanvasEl) {
            canvas.lowerCanvasEl.style.pointerEvents = 'auto';
            canvas.lowerCanvasEl.style.touchAction = 'none';
        }
        const brush = canvas.freeDrawingBrush;
        if (brush) {
            brush.color = '#111827';
            brush.width = 2;
        }
        const onObjectMutate = ()=>{
            if (!applyingRemoteRef.current) {
                queueSnapshotSyncRef.current();
            }
        };
        const getPoint = (evt)=>{
            const maybeEvent = evt;
            if (maybeEvent.scenePoint && Number.isFinite(maybeEvent.scenePoint.x) && Number.isFinite(maybeEvent.scenePoint.y)) {
                return {
                    x: maybeEvent.scenePoint.x,
                    y: maybeEvent.scenePoint.y
                };
            }
            const pointerEvent = evt.e;
            if (!pointerEvent) return null;
            if (typeof canvas.getScenePoint === 'function') {
                const scenePoint = canvas.getScenePoint(pointerEvent);
                if (Number.isFinite(scenePoint.x) && Number.isFinite(scenePoint.y)) {
                    return {
                        x: scenePoint.x,
                        y: scenePoint.y
                    };
                }
            }
            if (typeof canvas.getPointer === 'function') {
                const fallbackPoint = canvas.getPointer(pointerEvent);
                if (Number.isFinite(fallbackPoint.x) && Number.isFinite(fallbackPoint.y)) {
                    return {
                        x: fallbackPoint.x,
                        y: fallbackPoint.y
                    };
                }
            }
            return null;
        };
        const onMouseDown = (evt)=>{
            if (!canEditRef.current) return;
            const pointer = getPoint(evt);
            if (!pointer) return;
            const activeTool = toolRef.current;
            if (activeTool === 'text') {
                const text = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$fabric$2f$dist$2f$index$2e$min$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IText"]('Text', {
                    left: pointer.x,
                    top: pointer.y,
                    fontSize: 20,
                    fill: '#111827'
                });
                canvas.add(text);
                canvas.setActiveObject(text);
                text.enterEditing();
                onObjectMutate();
                return;
            }
            if (activeTool !== 'rect' && activeTool !== 'circle') return;
            startPointRef.current = {
                x: pointer.x,
                y: pointer.y
            };
            if (activeTool === 'rect') {
                const rect = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$fabric$2f$dist$2f$index$2e$min$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Rect"]({
                    left: pointer.x,
                    top: pointer.y,
                    width: 1,
                    height: 1,
                    fill: 'rgba(37, 99, 235, 0.08)',
                    stroke: '#2563eb',
                    strokeWidth: 2
                });
                drawingShapeRef.current = rect;
                canvas.add(rect);
            } else {
                const circle = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$fabric$2f$dist$2f$index$2e$min$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Circle"]({
                    left: pointer.x,
                    top: pointer.y,
                    radius: 1,
                    fill: 'rgba(16, 185, 129, 0.08)',
                    stroke: '#10b981',
                    strokeWidth: 2
                });
                drawingShapeRef.current = circle;
                canvas.add(circle);
            }
        };
        const onMouseMove = (evt)=>{
            if (!canEditRef.current) return;
            if (!startPointRef.current || !drawingShapeRef.current) return;
            const pointer = getPoint(evt);
            if (!pointer) return;
            if (drawingShapeRef.current instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$fabric$2f$dist$2f$index$2e$min$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Rect"]) {
                const x = Math.min(startPointRef.current.x, pointer.x);
                const y = Math.min(startPointRef.current.y, pointer.y);
                const width = Math.abs(pointer.x - startPointRef.current.x);
                const height = Math.abs(pointer.y - startPointRef.current.y);
                drawingShapeRef.current.set({
                    left: x,
                    top: y,
                    width,
                    height
                });
            } else if (drawingShapeRef.current instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$fabric$2f$dist$2f$index$2e$min$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Circle"]) {
                const radius = Math.max(Math.abs(pointer.x - startPointRef.current.x), Math.abs(pointer.y - startPointRef.current.y)) / 2;
                drawingShapeRef.current.set({
                    radius,
                    left: startPointRef.current.x - radius,
                    top: startPointRef.current.y - radius
                });
            }
            canvas.renderAll();
        };
        const onMouseUp = ()=>{
            if (!canEditRef.current) return;
            if (drawingShapeRef.current) {
                drawingShapeRef.current = null;
                startPointRef.current = null;
                onObjectMutate();
            }
        };
        canvas.on('path:created', onObjectMutate);
        canvas.on('object:modified', onObjectMutate);
        canvas.on('object:removed', onObjectMutate);
        canvas.on('mouse:down', onMouseDown);
        canvas.on('mouse:move', onMouseMove);
        canvas.on('mouse:up', onMouseUp);
        const resize = ()=>{
            const root = rootRef.current;
            if (!root) return;
            const bounds = root.getBoundingClientRect();
            const width = Math.max(960, Math.floor(bounds.width - 12));
            const height = Math.max(520, Math.floor(bounds.height - 12));
            canvas.setDimensions({
                width,
                height
            });
            canvas.renderAll();
        };
        resize();
        const ro = new ResizeObserver(()=>resize());
        if (rootRef.current) ro.observe(rootRef.current);
        return ()=>{
            ro.disconnect();
            canvas.off('path:created', onObjectMutate);
            canvas.off('object:modified', onObjectMutate);
            canvas.off('object:removed', onObjectMutate);
            canvas.off('mouse:down', onMouseDown);
            canvas.off('mouse:move', onMouseMove);
            canvas.off('mouse:up', onMouseUp);
            canvas.dispose();
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            canvasRef.current = null;
        };
    }, [
        sessionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.isDrawingMode = canEdit && (tool === 'draw' || tool === 'erase');
        canvas.selection = canEdit && tool === 'select';
        canvas.skipTargetFind = !(canEdit && tool === 'select');
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = tool === 'erase' ? '#ffffff' : '#111827';
            canvas.freeDrawingBrush.width = tool === 'erase' ? 18 : 2;
        }
        if (tool !== 'select') {
            canvas.discardActiveObject();
        }
        applyReadonly(!canEdit);
    }, [
        applyReadonly,
        canEdit,
        tool
    ]);
    const statusBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (isConnected) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                variant: "outline",
                className: "gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                        className: "h-3 w-3 text-green-600"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                        lineNumber: 468,
                        columnNumber: 11
                    }, this),
                    "Synced"
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                lineNumber: 467,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            variant: "outline",
            className: "gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                    className: "h-3 w-3 text-amber-600"
                }, void 0, false, {
                    fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                    lineNumber: 475,
                    columnNumber: 9
                }, this),
                "Reconnecting"
            ]
        }, void 0, true, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
            lineNumber: 474,
            columnNumber: 7
        }, this);
    }, [
        isConnected
    ]);
    const toolButton = (value, label, icon)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
            type: "button",
            size: "sm",
            variant: tool === value ? 'default' : 'outline',
            onClick: ()=>setTool(value),
            disabled: !canEdit,
            className: "gap-1",
            children: [
                icon,
                label
            ]
        }, value, true, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
            lineNumber: 482,
            columnNumber: 5
        }, this);
    const requestEditAccess = ()=>{
        if (role !== 'student' || canEdit || !socket) return;
        socket.emit('math_wb_edit_request', {
            sessionId
        });
        setHasRequestedEditAccess(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `h-full min-h-0 flex flex-col rounded-lg border bg-white ${className}`,
        "data-testid": "fabric-math-board",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold",
                                children: "Math Whiteboard"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                lineNumber: 506,
                                columnNumber: 11
                            }, this),
                            statusBadge,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: canEdit ? 'default' : 'secondary',
                                children: canEdit ? 'Editable' : 'Read only'
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                lineNumber: 508,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-1",
                        children: [
                            canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    toolButton('select', 'Select', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 514,
                                        columnNumber: 47
                                    }, this)),
                                    toolButton('draw', 'Draw', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__["Pen"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 515,
                                        columnNumber: 43
                                    }, this)),
                                    toolButton('erase', 'Erase', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 516,
                                        columnNumber: 45
                                    }, this)),
                                    toolButton('rect', 'Rectangle', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 517,
                                        columnNumber: 48
                                    }, this)),
                                    toolButton('circle', 'Circle', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 518,
                                        columnNumber: 47
                                    }, this)),
                                    toolButton('text', 'Text', /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 519,
                                        columnNumber: 43
                                    }, this))
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "secondary",
                                children: "Toolbar disabled while locked"
                            }, void 0, false, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                lineNumber: 522,
                                columnNumber: 13
                            }, this),
                            role === 'student' && !canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "secondary",
                                size: "sm",
                                className: "gap-1",
                                onClick: requestEditAccess,
                                disabled: hasRequestedEditAccess,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 533,
                                        columnNumber: 15
                                    }, this),
                                    hasRequestedEditAccess ? 'Request sent' : 'Request edit access'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                lineNumber: 526,
                                columnNumber: 13
                            }, this),
                            role === 'tutor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "gap-1",
                                onClick: ()=>socket?.emit('math_wb_lock', {
                                        sessionId,
                                        locked: !isLocked
                                    }),
                                children: [
                                    isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 545,
                                        columnNumber: 27
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                        lineNumber: 545,
                                        columnNumber: 60
                                    }, this),
                                    isLocked ? 'Unlock Students' : 'Lock Students'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                lineNumber: 539,
                                columnNumber: 13
                            }, this),
                            role === 'tutor' && pendingEditRequests.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "secondary",
                                children: [
                                    pendingEditRequests.length,
                                    " edit request",
                                    pendingEditRequests.length === 1 ? '' : 's'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                                lineNumber: 550,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: rootRef,
                className: "relative flex-1 min-h-0 touch-none p-1",
                children: [
                    role === 'student' && !canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-3 right-3 top-3 z-10 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 shadow-sm",
                        children: "Board locked by tutor. You can view only until access is granted."
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                        lineNumber: 559,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasElRef,
                        "data-testid": "fabric-math-canvas",
                        "data-math-session": sessionId,
                        className: "h-full w-full rounded border border-slate-200"
                    }, void 0, false, {
                        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                        lineNumber: 563,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
                lineNumber: 557,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx",
        lineNumber: 503,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = FabricMathBoard;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/MathBoardHost.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MathBoardHost",
    ()=>MathBoardHost,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$whiteboard$2f$TldrawMathBoard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/TldrawMathBoard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$whiteboard$2f$FabricMathBoard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/FabricMathBoard.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function resolveEngine() {
    const raw = (process.env.NEXT_PUBLIC_MATH_ENGINE || 'fabric').toLowerCase();
    return raw === 'tldraw' ? 'tldraw' : 'fabric';
}
function MathBoardHost(props) {
    const engine = resolveEngine();
    if (engine === 'tldraw') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$whiteboard$2f$TldrawMathBoard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            ...props
        }, void 0, false, {
            fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/MathBoardHost.tsx",
            lineNumber: 25,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$components$2f$whiteboard$2f$FabricMathBoard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FabricMathBoard"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/components/whiteboard/MathBoardHost.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, this);
}
const __TURBOPACK__default__export__ = MathBoardHost;
}),
];

//# debugId=29c6584b-d267-16ba-e7eb-c5f56365b8b6
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_components_f2f26476._.js.map