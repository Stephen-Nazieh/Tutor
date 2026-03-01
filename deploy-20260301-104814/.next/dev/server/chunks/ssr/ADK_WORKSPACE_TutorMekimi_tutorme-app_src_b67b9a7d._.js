;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="8bdf89b2-e8be-106a-9d37-2d63c1d01f93")}catch(e){}}();
module.exports = [
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-simple-socket.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSimpleSocket",
    ()=>useSimpleSocket
]);
/**
 * Simple Socket.io Hook
 * 
 * Provides a basic socket connection for room-based features.
 * Used by the Live Class Whiteboard system.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
;
;
function useSimpleSocket(roomId, options = {}) {
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [socketInstance, setSocketInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!roomId) return;
        const connect = async ()=>{
            const token = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/socket-auth.ts [app-ssr] (ecmascript, async loader)").then((m)=>m.getSocketToken());
            if (!token) return;
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])({
                path: '/api/socket',
                transports: [
                    'websocket',
                    'polling'
                ],
                timeout: 20000,
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 500,
                auth: {
                    token
                }
            });
            socketRef.current = socket;
            socket.on('connect', ()=>{
                setIsConnected(true);
                setSocketInstance(socket);
                if (roomId && options.userId && options.role) {
                    socket.emit('join_class', {
                        roomId,
                        userId: options.userId,
                        name: options.name || options.role,
                        role: options.role
                    });
                }
            });
            socket.on('disconnect', ()=>{
                setIsConnected(false);
                setSocketInstance(null);
            });
            socket.on('connect_error', (err)=>{
                console.warn('Socket connection error:', err?.message || err);
                setIsConnected(false);
            });
        };
        connect();
        return ()=>{
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, [
        roomId,
        options.name,
        options.role,
        options.userId
    ]);
    return {
        socket: socketInstance,
        isConnected
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-live-class-whiteboard.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLiveClassWhiteboard",
    ()=>useLiveClassWhiteboard
]);
/**
 * Live Class Whiteboard Hook
 * 
 * Manages whiteboard state and socket communication for Live Class sessions.
 * Supports both tutor broadcast mode and student personal whiteboards.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-simple-socket.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
;
function useLiveClassWhiteboard(roomId, sessionId, role) {
    const applyStrokeOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((prev, ops)=>{
        if (!ops.length) return prev;
        let changed = false;
        const byId = new Map(prev.map((stroke)=>[
                stroke.id,
                stroke
            ]));
        ops.forEach((op)=>{
            if (op.kind === 'delete') {
                if (op.strokeId && byId.has(op.strokeId)) {
                    byId.delete(op.strokeId);
                    changed = true;
                }
                return;
            }
            const stroke = op.stroke;
            if (!stroke) return;
            const existing = byId.get(stroke.id);
            const incomingVersion = stroke.updatedAt || stroke.createdAt || 0;
            const currentVersion = existing?.updatedAt || existing?.createdAt || 0;
            if (!existing || incomingVersion >= currentVersion && JSON.stringify(existing) !== JSON.stringify(stroke)) {
                byId.set(stroke.id, stroke);
                changed = true;
            }
        });
        return changed ? Array.from(byId.values()) : prev;
    }, []);
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSession"])();
    const { socket, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSimpleSocket"])(roomId || '', {
        userId: session?.user?.id,
        name: session?.user?.name || role,
        role
    });
    // Whiteboard state
    const [myStrokes, setMyStrokes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tutorStrokes, setTutorStrokes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [studentWhiteboards, setStudentWhiteboards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [visibility, setVisibility] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('private');
    const [isBroadcasting, setIsBroadcasting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [viewingStudentId, setViewingStudentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeStudentBoards, setActiveStudentBoards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [remoteCursors, setRemoteCursors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [remoteSelections, setRemoteSelections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [availableBranches, setAvailableBranches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLayerLocked, setIsLayerLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submissions, setSubmissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [hasSubmitted, setHasSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [layerConfig, setLayerConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 'tutor-broadcast',
            label: 'Tutor Broadcast',
            visible: true,
            locked: false
        },
        {
            id: 'tutor-private',
            label: 'Tutor Private',
            visible: true,
            locked: false
        },
        {
            id: 'student-personal',
            label: 'Student Personal',
            visible: true,
            locked: false
        },
        {
            id: 'shared-group',
            label: 'Shared Group',
            visible: true,
            locked: false
        }
    ]);
    const [activeLayerId, setActiveLayerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(role === 'tutor' ? 'tutor-broadcast' : 'student-personal');
    const [assignmentOverlay, setAssignmentOverlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('none');
    const [spotlight, setSpotlight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        enabled: false,
        x: 160,
        y: 120,
        width: 420,
        height: 220,
        mode: 'rectangle'
    });
    const [snapshots, setSnapshots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [timelineIndex, setTimelineIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [aiRegionHints, setAiRegionHints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [moderationState, setModerationState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        mutedStudentIds: [],
        studentStrokeWindowLimit: 80,
        strokeWindowMs: 5000,
        lockedLayers: []
    });
    const strokesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const pendingOpsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const flushTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localOpSeqRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const boardSeqRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        student: 0,
        tutor: 0
    });
    // Keep ref in sync
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        strokesRef.current = myStrokes;
    }, [
        myStrokes
    ]);
    const flushStrokeOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!socket || !roomId || !session?.user?.id) return;
        if (!pendingOpsRef.current.length) return;
        const merged = new Map();
        pendingOpsRef.current.forEach((op)=>{
            if (op.kind === 'delete' && op.strokeId) {
                merged.set(op.strokeId, op);
            } else if (op.kind === 'upsert' && op.stroke) {
                merged.set(op.stroke.id, op);
            }
        });
        pendingOpsRef.current = [];
        const ops = Array.from(merged.values());
        if (!ops.length) return;
        if (role === 'student') {
            socket.emit('lcwb_student_stroke_ops', {
                roomId,
                userId: session.user.id,
                ops,
                visibility
            });
        } else if (role === 'tutor') {
            socket.emit('lcwb_tutor_stroke_ops', {
                roomId,
                ops
            });
        }
    }, [
        role,
        roomId,
        session,
        socket,
        visibility
    ]);
    const enqueueStrokeOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ops)=>{
        if (!ops.length) return;
        pendingOpsRef.current.push(...ops);
        if (pendingOpsRef.current.length >= 120) {
            flushStrokeOps();
            return;
        }
        if (flushTimerRef.current) return;
        flushTimerRef.current = setTimeout(()=>{
            flushTimerRef.current = null;
            flushStrokeOps();
        }, 28);
    }, [
        flushStrokeOps
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (flushTimerRef.current) {
                clearTimeout(flushTimerRef.current);
                flushTimerRef.current = null;
            }
            flushStrokeOps();
        };
    }, [
        flushStrokeOps
    ]);
    // Initialize whiteboard on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!sessionId || !socket || !isConnected) return;
        const userId = session?.user?.id;
        if (!userId) return;
        if (role === 'student') {
            // Join student's personal whiteboard
            socket.emit('lcwb_student_join', {
                roomId,
                userId,
                name: session?.user?.name || 'Student'
            });
        }
        // Request initial sync
        socket.emit('lcwb_sync_request', {
            roomId,
            userId
        });
        socket.emit('lcwb_replay_request', {
            roomId,
            userId,
            scope: role === 'tutor' ? 'tutor' : 'student',
            sinceSeq: role === 'tutor' ? boardSeqRef.current.tutor : boardSeqRef.current.student
        });
        if (role === 'student') {
            socket.emit('lcwb_replay_request', {
                roomId,
                userId,
                scope: 'tutor',
                sinceSeq: boardSeqRef.current.tutor
            });
        }
    }, [
        sessionId,
        roomId,
        socket,
        isConnected,
        role,
        session
    ]);
    // Set up socket listeners
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!socket) return;
        // Tutor broadcasting started
        socket.on('lcwb_tutor_broadcasting', ()=>{
        // reserved for UI indicators
        });
        // Tutor stopped broadcasting
        socket.on('lcwb_tutor_broadcast_stopped', ()=>{
            setTutorStrokes([]);
        });
        // Receive tutor's stroke (for students)
        socket.on('lcwb_tutor_stroke', (stroke)=>{
            setTutorStrokes((prev)=>[
                    ...prev,
                    stroke
                ]);
        });
        socket.on('lcwb_tutor_strokes_reset', (data)=>{
            setTutorStrokes(data.strokes || []);
        });
        socket.on('lcwb_tutor_stroke_ops', (data)=>{
            const maxSeq = Math.max(0, ...(data.ops || []).map((op)=>op._seq || 0));
            if (maxSeq > 0) boardSeqRef.current.tutor = Math.max(boardSeqRef.current.tutor, maxSeq);
            setTutorStrokes((prev)=>applyStrokeOps(prev, data.ops || []));
        });
        socket.on('lcwb_student_whiteboard_state', (data)=>{
            setStudentWhiteboards((prev)=>{
                const next = new Map(prev);
                const wb = next.get(data.studentId);
                if (wb) {
                    wb.strokes = data.strokes;
                    wb.lastActivity = new Date();
                    next.set(data.studentId, wb);
                } else {
                    next.set(data.studentId, {
                        studentId: data.studentId,
                        studentName: 'Student',
                        whiteboardId: '',
                        visibility: 'tutor-only',
                        strokes: data.strokes,
                        lastActivity: new Date()
                    });
                }
                return next;
            });
        });
        // Student created a whiteboard (tutor receives)
        socket.on('lcwb_student_whiteboard_created', (data)=>{
            setActiveStudentBoards((prev)=>[
                    ...new Set([
                        ...prev,
                        data.studentId
                    ])
                ]);
            setStudentWhiteboards((prev)=>new Map(prev.set(data.studentId, {
                    studentId: data.studentId,
                    studentName: data.name,
                    whiteboardId: '',
                    visibility: 'private',
                    strokes: [],
                    lastActivity: new Date()
                })));
        });
        // Receive student's stroke (tutor receives)
        socket.on('lcwb_student_stroke', (data)=>{
            setStudentWhiteboards((prev)=>{
                const wb = prev.get(data.studentId);
                if (wb) {
                    wb.strokes.push(data.stroke);
                    wb.lastActivity = new Date();
                    return new Map(prev);
                }
                return prev;
            });
        });
        socket.on('lcwb_student_strokes_reset', (data)=>{
            setStudentWhiteboards((prev)=>{
                const next = new Map(prev);
                const wb = next.get(data.studentId);
                if (wb) {
                    wb.strokes = data.strokes || [];
                    wb.lastActivity = new Date();
                    next.set(data.studentId, wb);
                }
                return next;
            });
        });
        socket.on('lcwb_student_stroke_ops', (data)=>{
            const maxSeq = Math.max(0, ...(data.ops || []).map((op)=>op._seq || 0));
            if (maxSeq > 0 && session?.user?.id === data.studentId) {
                boardSeqRef.current.student = Math.max(boardSeqRef.current.student, maxSeq);
            }
            setStudentWhiteboards((prev)=>{
                const next = new Map(prev);
                const wb = next.get(data.studentId);
                if (wb) {
                    wb.strokes = applyStrokeOps(wb.strokes, data.ops || []);
                    wb.lastActivity = new Date();
                    next.set(data.studentId, wb);
                }
                return next;
            });
        });
        // Student visibility changed
        socket.on('lcwb_student_visibility_changed', (data)=>{
            setStudentWhiteboards((prev)=>{
                const wb = prev.get(data.studentId);
                if (wb) {
                    wb.visibility = data.visibility;
                    return new Map(prev);
                }
                return prev;
            });
        });
        // Student made board public (other students receive)
        socket.on('lcwb_student_public', (data)=>{
            setActiveStudentBoards((prev)=>[
                    ...new Set([
                        ...prev,
                        data.studentId
                    ])
                ]);
        });
        // Receive public student stroke (students receive from other students)
        socket.on('lcwb_public_student_stroke', (data)=>{
            setStudentWhiteboards((prev)=>{
                const wb = prev.get(data.studentId);
                if (wb) {
                    wb.strokes.push(data.stroke);
                    return new Map(prev);
                }
                return prev;
            });
        });
        socket.on('lcwb_public_student_strokes_reset', (data)=>{
            setStudentWhiteboards((prev)=>{
                const next = new Map(prev);
                const wb = next.get(data.studentId);
                if (wb) {
                    wb.strokes = data.strokes || [];
                    next.set(data.studentId, wb);
                }
                return next;
            });
        });
        socket.on('lcwb_public_student_stroke_ops', (data)=>{
            setStudentWhiteboards((prev)=>{
                const next = new Map(prev);
                const wb = next.get(data.studentId);
                if (wb) {
                    wb.strokes = applyStrokeOps(wb.strokes, data.ops || []);
                    next.set(data.studentId, wb);
                }
                return next;
            });
        });
        socket.on('lcwb_replay_ops', (data)=>{
            if (data.scope === 'tutor') {
                boardSeqRef.current.tutor = Math.max(boardSeqRef.current.tutor, data.latestSeq || 0);
                setTutorStrokes((prev)=>applyStrokeOps(prev, data.ops || []));
                return;
            }
            const myId = session?.user?.id;
            if (!myId || data.userId && data.userId !== myId) return;
            boardSeqRef.current.student = Math.max(boardSeqRef.current.student, data.latestSeq || 0);
            setMyStrokes((prev)=>applyStrokeOps(prev, data.ops || []));
        });
        socket.on('lcwb_selection_presence_update', (data)=>{
            if (!data?.userId || data.userId === session?.user?.id) return;
            setRemoteSelections((prev)=>{
                const next = new Map(prev);
                next.set(data.userId, data);
                return next;
            });
        });
        socket.on('lcwb_selection_presence_remove', (data)=>{
            if (!data?.userId) return;
            setRemoteSelections((prev)=>{
                if (!prev.has(data.userId)) return prev;
                const next = new Map(prev);
                next.delete(data.userId);
                return next;
            });
        });
        socket.on('lcwb_branch_list', (data)=>{
            setAvailableBranches(data.branches || []);
        });
        // Tutor is viewing this student's board
        socket.on('lcwb_tutor_viewing', ()=>{
        // reserved for UI indicators
        });
        // Tutor stopped viewing
        socket.on('lcwb_tutor_stopped_viewing', ()=>{
        // reserved for UI indicators
        });
        // Tutor annotated on student's board
        socket.on('lcwb_tutor_annotation', (data)=>{
            setMyStrokes((prev)=>[
                    ...prev,
                    data.stroke
                ]);
        });
        // Sync response
        socket.on('lcwb_sync_response', (data)=>{
            setMyStrokes(data.strokes);
        });
        socket.on('lcwb_cursor_update', (data)=>{
            setRemoteCursors((prev)=>{
                const next = new Map(prev);
                next.set(data.userId, data);
                return next;
            });
        });
        socket.on('lcwb_cursor_remove', (data)=>{
            setRemoteCursors((prev)=>{
                const next = new Map(prev);
                next.delete(data.userId);
                return next;
            });
        });
        socket.on('lcwb_layer_locked', (data)=>{
            setIsLayerLocked(data.locked);
        });
        socket.on('lcwb_layer_config', (data)=>{
            setLayerConfig((prev)=>prev.map((layer)=>({
                        ...layer,
                        visible: data.visibility[layer.id] ?? layer.visible,
                        locked: data.lockedLayers.includes(layer.id)
                    })));
        });
        socket.on('lcwb_student_submitted', (data)=>{
            if (role === 'tutor') {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`${data.studentName} submitted their board`);
            }
            setSubmissions((prev)=>{
                const next = new Map(prev);
                next.set(data.studentId, {
                    studentId: data.studentId,
                    studentName: data.studentName,
                    submittedAt: data.submittedAt,
                    strokeCount: data.strokeCount,
                    reviewed: false
                });
                return next;
            });
        });
        socket.on('lcwb_submission_reviewed', (data)=>{
            if (role === 'student' && session?.user?.id === data.studentId) {
                setHasSubmitted(false);
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Your board was reviewed by the tutor');
            }
            if (role === 'tutor') {
                setSubmissions((prev)=>{
                    const next = new Map(prev);
                    const existing = next.get(data.studentId);
                    if (existing) {
                        next.set(data.studentId, {
                            ...existing,
                            reviewed: true
                        });
                    }
                    return next;
                });
            }
        });
        socket.on('lcwb_moderation_state', (data)=>{
            setModerationState(data);
        });
        socket.on('lcwb_moderation_warning', (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning(data.message || 'Board action blocked by moderation settings');
        });
        socket.on('lcwb_assignment_overlay', (data)=>{
            setAssignmentOverlay(data.overlay);
        });
        socket.on('lcwb_spotlight_update', (data)=>{
            setSpotlight(data);
        });
        socket.on('lcwb_ai_region_hint', (data)=>{
            setAiRegionHints((prev)=>[
                    data,
                    ...prev
                ].slice(0, 20));
        });
        socket.on('lcwb_snapshot_created', (snapshot)=>{
            setSnapshots((prev)=>[
                    snapshot,
                    ...prev
                ].slice(0, 80));
        });
        socket.on('lcwb_snapshot_timeline', (data)=>{
            setSnapshots(data.snapshots);
        });
        socket.on('lcwb_breakout_promoted', (data)=>{
            if (role === 'tutor') {
                setTutorStrokes((prev)=>[
                        ...prev,
                        ...data.strokes
                    ]);
            }
        });
        // AI region hint error
        socket.on('lcwb_ai_region_error', (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data.message || 'Failed to get AI hint');
        });
        // Export attached by tutor
        socket.on('lcwb_export_attached', (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Export "${data.name}" attached by tutor`);
        });
        // Student cleared their own board
        socket.on('lcwb_student_cleared_own', (data)=>{
            if (role === 'tutor') {
                setStudentWhiteboards((prev)=>{
                    const next = new Map(prev);
                    const wb = next.get(data.studentId);
                    if (wb) {
                        wb.strokes = [];
                        next.set(data.studentId, wb);
                    }
                    return next;
                });
            }
            if (role === 'student' && session?.user?.id === data.studentId) {
                setMyStrokes([]);
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('Your board was cleared');
            }
        });
        // Cleanup
        return ()=>{
            socket.off('lcwb_tutor_broadcasting');
            socket.off('lcwb_tutor_broadcast_stopped');
            socket.off('lcwb_tutor_stroke');
            socket.off('lcwb_tutor_strokes_reset');
            socket.off('lcwb_tutor_stroke_ops');
            socket.off('lcwb_student_whiteboard_created');
            socket.off('lcwb_student_stroke');
            socket.off('lcwb_student_strokes_reset');
            socket.off('lcwb_student_stroke_ops');
            socket.off('lcwb_student_visibility_changed');
            socket.off('lcwb_student_public');
            socket.off('lcwb_public_student_stroke');
            socket.off('lcwb_public_student_strokes_reset');
            socket.off('lcwb_public_student_stroke_ops');
            socket.off('lcwb_replay_ops');
            socket.off('lcwb_selection_presence_update');
            socket.off('lcwb_selection_presence_remove');
            socket.off('lcwb_branch_list');
            socket.off('lcwb_tutor_viewing');
            socket.off('lcwb_tutor_stopped_viewing');
            socket.off('lcwb_tutor_annotation');
            socket.off('lcwb_sync_response');
            socket.off('lcwb_student_whiteboard_state');
            socket.off('lcwb_cursor_update');
            socket.off('lcwb_cursor_remove');
            socket.off('lcwb_layer_locked');
            socket.off('lcwb_layer_config');
            socket.off('lcwb_student_submitted');
            socket.off('lcwb_submission_reviewed');
            socket.off('lcwb_moderation_state');
            socket.off('lcwb_moderation_warning');
            socket.off('lcwb_assignment_overlay');
            socket.off('lcwb_spotlight_update');
            socket.off('lcwb_ai_region_hint');
            socket.off('lcwb_snapshot_created');
            socket.off('lcwb_snapshot_timeline');
            socket.off('lcwb_breakout_promoted');
            socket.off('lcwb_ai_region_error');
            socket.off('lcwb_export_attached');
            socket.off('lcwb_student_cleared_own');
        };
    }, [
        applyStrokeOps,
        role,
        session?.user?.id,
        socket
    ]);
    // Remove stale cursors (network drops / tab backgrounding).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            const cutoff = Date.now() - 5000;
            setRemoteCursors((prev)=>{
                const next = new Map(prev);
                let changed = false;
                next.forEach((cursor, userId)=>{
                    if (cursor.lastUpdated < cutoff) {
                        next.delete(userId);
                        changed = true;
                    }
                });
                return changed ? next : prev;
            });
        }, 2000);
        return ()=>clearInterval(interval);
    }, []);
    /** Tutor: Start broadcasting — your strokes are sent to all students in the room in real time. */ const startBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (role !== 'tutor') return;
        if (!socket || !isConnected) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning('Connect to the class first');
            return;
        }
        if (!sessionId || !roomId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning('Session or room not ready');
            return;
        }
        socket.emit('lcwb_broadcast_start', {
            roomId,
            whiteboardId: session?.user?.id
        });
        setIsBroadcasting(true);
    }, [
        socket,
        isConnected,
        role,
        roomId,
        sessionId,
        session
    ]);
    /** Tutor: Stop broadcasting — students no longer receive your strokes. */ const stopBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!socket || role !== 'tutor') return;
        socket.emit('lcwb_broadcast_stop', {
            roomId
        });
        setIsBroadcasting(false);
    }, [
        socket,
        role,
        roomId
    ]);
    // Tutor: Broadcast a stroke
    const broadcastStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((stroke)=>{
        if (!socket || role !== 'tutor') return;
        socket.emit('lcwb_stroke_broadcast', {
            roomId,
            stroke
        });
    }, [
        socket,
        role,
        roomId
    ]);
    // Student: Add a stroke to their whiteboard
    const addStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((stroke)=>{
        if (!socket || !session?.user?.id) return;
        if (role === 'student' && isLayerLocked) return;
        if (role === 'student' && moderationState.lockedLayers.includes(activeLayerId)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning('This layer is locked by the tutor');
            return;
        }
        // Update local state
        setMyStrokes((prev)=>[
                ...prev,
                stroke
            ]);
        // Send to server
        socket.emit('lcwb_student_update', {
            roomId,
            userId: session.user.id,
            stroke: {
                ...stroke,
                layerId: stroke.layerId || activeLayerId
            },
            visibility
        });
        if (role === 'student' && hasSubmitted) {
            setHasSubmitted(false);
        }
    }, [
        socket,
        session,
        role,
        isLayerLocked,
        roomId,
        visibility,
        hasSubmitted,
        activeLayerId,
        moderationState.lockedLayers
    ]);
    const addTutorStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((stroke)=>{
        if (!socket || role !== 'tutor') return;
        const normalizedStroke = {
            ...stroke,
            layerId: stroke.layerId || activeLayerId
        };
        setMyStrokes((prev)=>[
                ...prev,
                normalizedStroke
            ]);
        if (isBroadcasting || normalizedStroke.layerId === 'tutor-broadcast') {
            socket.emit('lcwb_stroke_broadcast', {
                roomId,
                stroke: normalizedStroke
            });
        }
    }, [
        socket,
        role,
        activeLayerId,
        isBroadcasting,
        roomId
    ]);
    // Student: Change visibility
    const changeVisibility = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newVisibility)=>{
        if (!socket || role !== 'student' || !session?.user?.id) return;
        setVisibility(newVisibility);
        socket.emit('lcwb_visibility_change', {
            roomId,
            userId: session.user.id,
            visibility: newVisibility
        });
    }, [
        socket,
        role,
        roomId,
        session
    ]);
    // Tutor: View a specific student's whiteboard
    const viewStudentWhiteboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((studentId)=>{
        if (!socket || role !== 'tutor') return;
        // Stop viewing previous student
        if (viewingStudentId) {
            socket.emit('lcwb_tutor_stop_view', {
                roomId,
                studentId: viewingStudentId
            });
        }
        socket.emit('lcwb_tutor_view_student', {
            roomId,
            studentId
        });
        setViewingStudentId(studentId);
    }, [
        socket,
        role,
        roomId,
        viewingStudentId
    ]);
    // Tutor: Stop viewing student
    const stopViewingStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!socket || role !== 'tutor' || !viewingStudentId) return;
        socket.emit('lcwb_tutor_stop_view', {
            roomId,
            studentId: viewingStudentId
        });
        setViewingStudentId(null);
    }, [
        socket,
        role,
        roomId,
        viewingStudentId
    ]);
    // Tutor: Annotate on student's whiteboard
    const annotateOnStudentBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((studentId, stroke)=>{
        if (!socket || role !== 'tutor') return;
        socket.emit('lcwb_tutor_annotate', {
            roomId,
            studentId,
            stroke
        });
    }, [
        socket,
        role,
        roomId
    ]);
    // Clear my whiteboard
    const clearMyWhiteboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((pageId)=>{
        if (!pageId) {
            setMyStrokes([]);
            return;
        }
        setMyStrokes((prev)=>prev.filter((stroke)=>stroke.pageId !== pageId));
    }, []);
    // Undo last stroke
    const undoLastStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((pageId)=>{
        setMyStrokes((prev)=>{
            if (!pageId) return prev.slice(0, -1);
            const lastIndex = [
                ...prev
            ].reverse().findIndex((stroke)=>stroke.pageId === pageId);
            if (lastIndex < 0) return prev;
            const indexToRemove = prev.length - 1 - lastIndex;
            return prev.filter((_, index)=>index !== indexToRemove);
        });
    }, []);
    const updateCursor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((x, y, pointerMode = 'cursor')=>{
        if (!socket || !session?.user?.id || !roomId) return;
        socket.emit('lcwb_cursor_update', {
            roomId,
            userId: session.user.id,
            name: session.user.name || role,
            role,
            x,
            y,
            pointerMode,
            lastUpdated: Date.now()
        });
    }, [
        socket,
        session,
        roomId,
        role
    ]);
    const updateSelectionPresence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((strokeIds, pageId, color = '#2563eb')=>{
        if (!socket || !roomId || !session?.user?.id) return;
        socket.emit('lcwb_selection_presence_update', {
            roomId,
            userId: session.user.id,
            name: session.user.name || role,
            role,
            strokeIds,
            pageId,
            color,
            updatedAt: Date.now()
        });
    }, [
        roomId,
        role,
        session,
        socket
    ]);
    const createBoardBranch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((branchName)=>{
        if (!socket || !roomId || !session?.user?.id || !branchName.trim()) return;
        socket.emit('lcwb_branch_create', {
            roomId,
            scope: role === 'tutor' ? 'tutor' : 'student',
            userId: session.user.id,
            branchName: branchName.trim()
        });
    }, [
        roomId,
        role,
        session,
        socket
    ]);
    const switchBoardBranch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((branchName)=>{
        if (!socket || !roomId || !session?.user?.id || !branchName.trim()) return;
        socket.emit('lcwb_branch_switch', {
            roomId,
            scope: role === 'tutor' ? 'tutor' : 'student',
            userId: session.user.id,
            branchName: branchName.trim()
        });
    }, [
        roomId,
        role,
        session,
        socket
    ]);
    /** Tutor: Lock/unlock student layers — when locked, students cannot draw on their boards until you unlock. */ const toggleLayerLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((locked)=>{
        if (role !== 'tutor') return;
        if (!socket || !isConnected) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning('Connect to the class first');
            return;
        }
        if (!roomId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning('Room not ready');
            return;
        }
        setIsLayerLocked(locked);
        socket.emit('lcwb_layer_lock', {
            roomId,
            locked
        });
    }, [
        socket,
        isConnected,
        role,
        roomId
    ]);
    const updateLayerConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextConfig)=>{
        setLayerConfig(nextConfig);
        if (!socket || !roomId || role !== 'tutor') return;
        const visibility = nextConfig.reduce((acc, layer)=>{
            acc[layer.id] = layer.visible;
            return acc;
        }, {});
        socket.emit('lcwb_layer_config_update', {
            roomId,
            visibility,
            lockedLayers: nextConfig.filter((layer)=>layer.locked).map((layer)=>layer.id)
        });
    }, [
        socket,
        roomId,
        role
    ]);
    const setLayerLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((layerId, locked)=>{
        setLayerConfig((prev)=>{
            const next = prev.map((layer)=>layer.id === layerId ? {
                    ...layer,
                    locked
                } : layer);
            if (socket && roomId && role === 'tutor') {
                const visibility = next.reduce((acc, layer)=>{
                    acc[layer.id] = layer.visible;
                    return acc;
                }, {});
                socket.emit('lcwb_layer_config_update', {
                    roomId,
                    visibility,
                    lockedLayers: next.filter((layer)=>layer.locked).map((layer)=>layer.id)
                });
            }
            return next;
        });
    }, [
        socket,
        roomId,
        role
    ]);
    const submitMyBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!socket || role !== 'student' || !session?.user?.id || !roomId) return;
        socket.emit('lcwb_student_submit', {
            roomId,
            studentId: session.user.id,
            studentName: session.user.name || 'Student',
            strokeCount: strokesRef.current.length,
            submittedAt: Date.now()
        });
        setHasSubmitted(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Board submitted to tutor');
    }, [
        socket,
        role,
        session,
        roomId
    ]);
    const markSubmissionReviewed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((studentId)=>{
        if (!socket || role !== 'tutor' || !roomId) return;
        socket.emit('lcwb_tutor_mark_reviewed', {
            roomId,
            studentId
        });
        setSubmissions((prev)=>{
            const next = new Map(prev);
            const existing = next.get(studentId);
            if (existing) next.set(studentId, {
                ...existing,
                reviewed: true
            });
            return next;
        });
    }, [
        socket,
        role,
        roomId
    ]);
    const pinSubmission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((studentId, pinned)=>{
        setSubmissions((prev)=>{
            const next = new Map(prev);
            const existing = next.get(studentId);
            if (existing) next.set(studentId, {
                ...existing,
                pinned
            });
            return next;
        });
    }, []);
    const markAllSubmissionsReviewed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!socket || role !== 'tutor' || !roomId) return;
        const pending = Array.from(submissions.values()).filter((submission)=>!submission.reviewed);
        pending.forEach((submission)=>{
            socket.emit('lcwb_tutor_mark_reviewed', {
                roomId,
                studentId: submission.studentId
            });
        });
        setSubmissions((prev)=>{
            const next = new Map(prev);
            next.forEach((submission, studentId)=>{
                next.set(studentId, {
                    ...submission,
                    reviewed: true
                });
            });
            return next;
        });
    }, [
        socket,
        role,
        roomId,
        submissions
    ]);
    const setDrawMuteForStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((studentId, muted)=>{
        if (!socket || role !== 'tutor' || !roomId) return;
        const nextMuted = new Set(moderationState.mutedStudentIds);
        if (muted) nextMuted.add(studentId);
        if (!muted) nextMuted.delete(studentId);
        socket.emit('lcwb_tutor_moderation_update', {
            roomId,
            mutedStudentIds: Array.from(nextMuted),
            studentStrokeWindowLimit: moderationState.studentStrokeWindowLimit,
            strokeWindowMs: moderationState.strokeWindowMs,
            lockedLayers: moderationState.lockedLayers
        });
    }, [
        socket,
        role,
        roomId,
        moderationState
    ]);
    const updateStrokeRateLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((limit, windowMs = moderationState.strokeWindowMs)=>{
        if (!socket || role !== 'tutor' || !roomId) return;
        socket.emit('lcwb_tutor_moderation_update', {
            roomId,
            mutedStudentIds: moderationState.mutedStudentIds,
            studentStrokeWindowLimit: limit,
            strokeWindowMs: windowMs,
            lockedLayers: moderationState.lockedLayers
        });
    }, [
        socket,
        role,
        roomId,
        moderationState
    ]);
    const clearOwnStrokes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!socket || !roomId || !session?.user?.id) return;
        setMyStrokes((prev)=>prev.filter((stroke)=>stroke.userId !== session.user.id));
        socket.emit('lcwb_clear_own', {
            roomId,
            userId: session.user.id
        });
    }, [
        socket,
        roomId,
        session
    ]);
    const replaceMyStrokes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextOrUpdater)=>{
        setMyStrokes((prev)=>{
            const next = typeof nextOrUpdater === 'function' ? nextOrUpdater(prev) : nextOrUpdater;
            if (socket && roomId && session?.user?.id) {
                const prevMap = new Map(prev.map((stroke)=>[
                        stroke.id,
                        stroke
                    ]));
                const nextMap = new Map(next.map((stroke)=>[
                        stroke.id,
                        stroke
                    ]));
                const ops = [];
                nextMap.forEach((stroke, id)=>{
                    const existing = prevMap.get(id);
                    if (!existing || JSON.stringify(existing) !== JSON.stringify(stroke)) {
                        localOpSeqRef.current += 1;
                        ops.push({
                            kind: 'upsert',
                            stroke,
                            opId: `${session.user.id}:${Date.now()}:${localOpSeqRef.current}:${id}:u`,
                            sentAt: Date.now(),
                            baseVersion: existing?.updatedAt || existing?.createdAt || 0
                        });
                    }
                });
                prevMap.forEach((_, id)=>{
                    if (!nextMap.has(id)) {
                        localOpSeqRef.current += 1;
                        ops.push({
                            kind: 'delete',
                            strokeId: id,
                            opId: `${session.user.id}:${Date.now()}:${localOpSeqRef.current}:${id}:d`,
                            sentAt: Date.now()
                        });
                    }
                });
                if (!ops.length) return prev;
                enqueueStrokeOps(ops);
            }
            return next;
        });
    }, [
        enqueueStrokeOps,
        roomId,
        session,
        socket
    ]);
    const setAssignmentOverlayMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((overlay)=>{
        setAssignmentOverlay(overlay);
        if (!socket || role !== 'tutor' || !roomId) return;
        socket.emit('lcwb_assignment_overlay', {
            roomId,
            overlay
        });
    }, [
        socket,
        role,
        roomId
    ]);
    const updateSpotlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextSpotlight)=>{
        setSpotlight(nextSpotlight);
        if (!socket || role !== 'tutor' || !roomId) return;
        socket.emit('lcwb_spotlight_update', {
            roomId,
            ...nextSpotlight
        });
    }, [
        socket,
        role,
        roomId
    ]);
    const requestAIRegionHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((region, context)=>{
        if (!socket || !roomId) return;
        socket.emit('lcwb_ai_region_request', {
            roomId,
            region,
            context
        });
    }, [
        socket,
        roomId
    ]);
    const captureSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((strokes)=>{
        if (!socket || !roomId) return;
        socket.emit('lcwb_snapshot_capture', {
            roomId,
            strokes
        });
    }, [
        socket,
        roomId
    ]);
    const requestSnapshotTimeline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!socket || !roomId) return;
        socket.emit('lcwb_snapshot_request', {
            roomId
        });
    }, [
        socket,
        roomId
    ]);
    const promoteBreakoutBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((breakoutRoomId, strokes, sourceStudentId)=>{
        if (!socket || role !== 'tutor' || !roomId) return;
        socket.emit('lcwb_breakout_promote', {
            mainRoomId: roomId,
            breakoutRoomId,
            sourceStudentId,
            strokes
        });
    }, [
        socket,
        role,
        roomId
    ]);
    const exportAndAttachBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((data)=>{
        if (!socket || role !== 'tutor' || !roomId) return;
        socket.emit('lcwb_export_attach', {
            roomId,
            sessionId,
            studentId: data.studentId,
            format: data.format,
            fileName: data.fileName,
            dataUrl: data.dataUrl
        });
    }, [
        socket,
        role,
        roomId,
        sessionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!roomId || !socket) return;
        const interval = setInterval(()=>{
            const sourceStrokes = role === 'tutor' ? myStrokes : myStrokes;
            if (sourceStrokes.length > 0) {
                socket.emit('lcwb_snapshot_capture', {
                    roomId,
                    strokes: sourceStrokes
                });
            }
        }, 2 * 60 * 1000);
        return ()=>clearInterval(interval);
    }, [
        roomId,
        socket,
        role,
        myStrokes
    ]);
    return {
        // State
        myStrokes,
        tutorStrokes,
        studentWhiteboards,
        visibility,
        isBroadcasting,
        viewingStudentId,
        activeStudentBoards,
        isConnected,
        remoteCursors,
        remoteSelections: Array.from(remoteSelections.values()),
        isLayerLocked,
        submissions: Array.from(submissions.values()).sort((a, b)=>b.submittedAt - a.submittedAt),
        hasSubmitted,
        layerConfig,
        activeLayerId,
        assignmentOverlay,
        spotlight,
        snapshots: [
            ...snapshots
        ].sort((a, b)=>b.createdAt - a.createdAt),
        timelineIndex,
        aiRegionHints,
        moderationState,
        availableBranches,
        // Actions
        startBroadcast,
        stopBroadcast,
        broadcastStroke,
        addStroke,
        addTutorStroke,
        changeVisibility,
        viewStudentWhiteboard,
        stopViewingStudent,
        annotateOnStudentBoard,
        clearMyWhiteboard,
        undoLastStroke,
        updateCursor,
        updateSelectionPresence,
        toggleLayerLock,
        submitMyBoard,
        markSubmissionReviewed,
        markAllSubmissionsReviewed,
        pinSubmission,
        setLayerConfig: updateLayerConfig,
        setActiveLayerId,
        setLayerLock,
        setDrawMuteForStudent,
        updateStrokeRateLimit,
        clearOwnStrokes,
        replaceMyStrokes,
        setAssignmentOverlayMode,
        updateSpotlight,
        requestAIRegionHint,
        captureSnapshot,
        requestSnapshotTimeline,
        setTimelineIndex,
        promoteBreakoutBoard,
        exportAndAttachBoard,
        createBoardBranch,
        switchBoardBranch
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-pdf-collab-socket.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePdfCollabSocket",
    ()=>usePdfCollabSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-simple-socket.ts [app-ssr] (ecmascript)");
'use client';
;
;
function usePdfCollabSocket({ roomId, userId, name, role = 'tutor', onCanvasEvent, onCanvasState, onPresenceState }) {
    const { socket, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSimpleSocket"])(roomId, {
        userId,
        name,
        role
    });
    const [isLocked, setIsLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [latencyMs, setLatencyMs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [participants, setParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!socket || !roomId) return;
        socket.emit('pdf_join_room', {
            roomId,
            userId,
            name,
            role
        });
        const handleCanvasEvent = (payload)=>{
            if (typeof payload.sentAt === 'number') {
                setLatencyMs(Math.max(0, Date.now() - payload.sentAt));
            }
            onCanvasEvent?.(payload);
        };
        const handleLockState = (data)=>{
            if (data.roomId === roomId) setIsLocked(data.locked);
        };
        const handleCanvasState = (data)=>{
            if (data.roomId !== roomId) return;
            onCanvasState?.(data);
        };
        const handlePresenceState = (data)=>{
            if (data.roomId !== roomId) return;
            setParticipants(data.participants || []);
            onPresenceState?.(data);
        };
        socket.on('pdf_canvas_event', handleCanvasEvent);
        socket.on('pdf_lock_state', handleLockState);
        socket.on('pdf_canvas_state', handleCanvasState);
        socket.on('pdf_presence_state', handlePresenceState);
        socket.emit('pdf_request_state', {
            roomId
        });
        return ()=>{
            socket.off('pdf_canvas_event', handleCanvasEvent);
            socket.off('pdf_lock_state', handleLockState);
            socket.off('pdf_canvas_state', handleCanvasState);
            socket.off('pdf_presence_state', handlePresenceState);
        };
    }, [
        socket,
        roomId,
        userId,
        name,
        role,
        onCanvasEvent,
        onCanvasState,
        onPresenceState
    ]);
    const emitCanvasEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((payload)=>{
        if (!socket || !roomId) return;
        socket.emit('pdf_canvas_event', {
            roomId,
            actorId: userId,
            sentAt: Date.now(),
            ...payload
        });
    }, [
        socket,
        roomId,
        userId
    ]);
    const setLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((locked)=>{
        if (!socket || !roomId) return;
        socket.emit('pdf_lock_toggle', {
            roomId,
            locked
        });
    }, [
        socket,
        roomId
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            socket,
            isConnected,
            isLocked,
            latencyMs,
            participants,
            emitCanvasEvent,
            setLock
        }), [
        socket,
        isConnected,
        isLocked,
        latencyMs,
        participants,
        emitCanvasEvent,
        setLock
    ]);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-socket.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSocket",
    ()=>useSocket
]);
/**
 * React Hook for Socket.io Client
 * Provides real-time communication for live class sessions
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
;
;
function useSocket(options) {
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let socket;
        const connect = async ()=>{
            const token = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/socket-auth.ts [app-ssr] (ecmascript, async loader)").then((m)=>m.getSocketToken());
            if (!token) {
                setError('Authentication required');
                return;
            }
            socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])({
                path: '/api/socket',
                transports: [
                    'websocket',
                    'polling'
                ],
                auth: {
                    token
                }
            });
            socketRef.current = socket;
            socket.on('connect', ()=>{
                console.log('Socket connected:', socket.id);
                setIsConnected(true);
                setError(null);
                // Join class room only when identity context is provided.
                if (options?.roomId && options.userId && options.name && options.role) {
                    socket.emit('join_class', {
                        roomId: options.roomId,
                        userId: options.userId,
                        name: options.name,
                        role: options.role,
                        tutorId: options.tutorId
                    });
                }
            });
            socket.on('disconnect', ()=>{
                console.log('Socket disconnected');
                setIsConnected(false);
            });
            socket.on('connect_error', (err)=>{
                console.error('Socket connection error:', err);
                setError(err.message);
                setIsConnected(false);
            });
            // Room state (initial load)
            socket.on('room_state', (state)=>{
                options?.onRoomState?.(state);
            });
            // Student events
            socket.on('student_joined', (data)=>{
                options?.onStudentJoined?.(data.state);
            });
            socket.on('student_left', (data)=>{
                options?.onStudentLeft?.(data.userId);
            });
            socket.on('student_state_update', (data)=>{
                options?.onStudentStateUpdate?.(data);
            });
            socket.on('student_distress', (data)=>{
                options?.onStudentDistress?.(data);
            });
            // Chat events
            socket.on('chat_message', (message)=>{
                options?.onChatMessage?.(message);
            });
            socket.on('tutor_broadcast', (message)=>{
                options?.onTutorBroadcast?.(message);
            });
            // AI hints
            socket.on('ai_hint', (hint)=>{
                options?.onAIHint?.(hint);
            });
            // Whiteboard
            socket.on('whiteboard_update', (data)=>{
                options?.onWhiteboardUpdate?.(data);
            });
            // Code editor
            socket.on('code_update', (data)=>{
                options?.onCodeUpdate?.(data);
            });
            // Breakout
            socket.on('breakout_invite', (data)=>{
                options?.onBreakoutInvite?.(data);
            });
            socket.on('breakout_room_update', (data)=>{
                options?.onBreakoutRoomUpdate?.(data.rooms);
            });
            socket.on('breakout_message', (data)=>{
                options?.onBreakoutMessage?.(data);
            });
            socket.on('notification', (data)=>{
                options?.onNotification?.(data);
            });
        };
        connect();
        return ()=>{
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [
        options?.roomId,
        options?.userId,
        options?.name,
        options?.role,
        options?.tutorId
    ]);
    // Send chat message
    const sendChatMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text)=>{
        socketRef.current?.emit('chat_message', {
            text
        });
    }, []);
    // Send whiteboard update
    const sendWhiteboardUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((strokes)=>{
        socketRef.current?.emit('whiteboard_update', {
            strokes
        });
    }, []);
    // Send code update
    const sendCodeUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((content, language)=>{
        socketRef.current?.emit('code_update', {
            content,
            language
        });
    }, []);
    // Send activity ping
    const sendActivityPing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((data)=>{
        socketRef.current?.emit('activity_ping', data);
    }, []);
    // Tutor broadcast
    const sendBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text, targetGroup = 'all')=>{
        socketRef.current?.emit('tutor_broadcast', {
            text,
            targetGroup
        });
    }, []);
    // Push hint to student
    const pushHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((targetUserId, hint, type)=>{
        socketRef.current?.emit('push_hint', {
            targetUserId,
            hint,
            type
        });
    }, []);
    // Invite to breakout
    const inviteToBreakout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((targetUserId, roomId)=>{
        socketRef.current?.emit('breakout_invite', {
            targetUserId,
            roomId
        });
    }, []);
    // Broadcast to all breakout rooms
    const sendBreakoutBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message)=>{
        socketRef.current?.emit('breakout_broadcast', {
            message
        });
    }, []);
    // Close a breakout room
    const closeBreakoutRoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((breakoutRoomId)=>{
        socketRef.current?.emit('close_breakout', {
            breakoutRoomId
        });
    }, []);
    // Extend breakout room time
    const extendBreakoutTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((breakoutRoomId, minutes)=>{
        socketRef.current?.emit('extend_breakout_time', {
            breakoutRoomId,
            minutes
        });
    }, []);
    // Send message in breakout room
    const sendBreakoutMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((breakoutRoomId, message)=>{
        socketRef.current?.emit('breakout_message', {
            breakoutRoomId,
            message
        });
    }, []);
    // Request help in breakout room
    const requestHelp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((breakoutRoomId, reason)=>{
        socketRef.current?.emit('request_help', {
            breakoutRoomId,
            reason
        });
    }, []);
    return {
        socket: socketRef.current,
        isConnected,
        error,
        sendChatMessage,
        sendWhiteboardUpdate,
        sendCodeUpdate,
        sendActivityPing,
        sendBroadcast,
        pushHint,
        inviteToBreakout,
        sendBreakoutBroadcast,
        closeBreakoutRoom,
        extendBreakoutTime,
        sendBreakoutMessage,
        requestHelp
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/extract-file-text.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @ts-nocheck
/**
 * Extract plain text from uploaded files: .txt, .md, .pdf, .docx, and images (OCR).
 * Used by the course/subject materials upload flow.
 */ __turbopack_context__.s([
    "extractTextFromFile",
    ()=>extractTextFromFile
]);
async function extractTextFromFile(file) {
    const name = file.name.toLowerCase();
    const type = file.type;
    // Plain text
    if (type === 'text/plain' || type.startsWith('text/') || name.endsWith('.txt') || name.endsWith('.md') || name.endsWith('.markdown')) {
        return readAsText(file);
    }
    // PDF
    if (type === 'application/pdf' || name.endsWith('.pdf')) {
        return extractPdfText(file);
    }
    // Word .docx
    if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || name.endsWith('.docx')) {
        return extractDocxText(file);
    }
    // Legacy .doc - treat as binary; we could try mammoth with .doc but support is limited
    if (name.endsWith('.doc')) {
        try {
            return extractDocxText(file);
        } catch  {
            return readAsText(file).catch(()=>'');
        }
    }
    // Images: OCR
    if (type.startsWith('image/')) {
        return extractImageText(file);
    }
    // Fallback: try as text
    return readAsText(file).catch(()=>'');
}
function readAsText(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(String(reader.result ?? ''));
        reader.onerror = ()=>reject(reader.error);
        reader.readAsText(file);
    });
}
async function extractPdfText(file) {
    const pdfjs = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pdfjs-dist/build/pdf.mjs [app-ssr] (ecmascript, async loader)");
    // Worker must be same-origin (CSP blocks external scripts). Served from public/ via copy-pdf-worker script.
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const data = await file.arrayBuffer();
    const doc = await pdfjs.getDocument({
        data
    }).promise;
    const numPages = doc.numPages;
    const parts = [];
    for(let i = 1; i <= numPages; i++){
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item)=>item.str ?? '').join(' ');
        parts.push(pageText);
    }
    return parts.join('\n\n').trim() || '';
}
async function extractDocxText(file) {
    const mammoth = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/mammoth/lib/index.js [app-ssr] (ecmascript, async loader)");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({
        arrayBuffer
    });
    return (result.value || '').trim();
}
async function extractImageText(file) {
    const mod = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tesseract.js/src/index.js [app-ssr] (ecmascript, async loader)");
    const api = mod.default ?? mod;
    const { data } = await api.recognize(file, 'eng', {
        logger: ()=>{}
    });
    return (data?.text || '').trim();
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/pdf-tutoring/coordinates.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "percentToPx",
    ()=>percentToPx,
    "pointToPercent",
    ()=>pointToPercent,
    "pointToPx",
    ()=>pointToPx,
    "pxToPercent",
    ()=>pxToPercent,
    "rectToPercent",
    ()=>rectToPercent,
    "rectToPx",
    ()=>rectToPx
]);
function clampPercent(value) {
    return Math.max(0, Math.min(100, value));
}
function pxToPercent(value, total) {
    if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return 0;
    return clampPercent(value / total * 100);
}
function percentToPx(value, total) {
    if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return 0;
    return value / 100 * total;
}
function pointToPercent(point, width, height) {
    return {
        x: pxToPercent(point.x, width),
        y: pxToPercent(point.y, height)
    };
}
function pointToPx(point, width, height) {
    return {
        x: percentToPx(point.x, width),
        y: percentToPx(point.y, height)
    };
}
function rectToPercent(rect, width, height) {
    return {
        ...rect,
        ...typeof rect.left === 'number' ? {
            left: pxToPercent(rect.left, width)
        } : {},
        ...typeof rect.top === 'number' ? {
            top: pxToPercent(rect.top, height)
        } : {},
        ...typeof rect.width === 'number' ? {
            width: pxToPercent(rect.width, width)
        } : {},
        ...typeof rect.height === 'number' ? {
            height: pxToPercent(rect.height, height)
        } : {}
    };
}
function rectToPx(rect, width, height) {
    return {
        ...rect,
        ...typeof rect.left === 'number' ? {
            left: percentToPx(rect.left, width)
        } : {},
        ...typeof rect.top === 'number' ? {
            top: percentToPx(rect.top, height)
        } : {},
        ...typeof rect.width === 'number' ? {
            width: percentToPx(rect.width, width)
        } : {},
        ...typeof rect.height === 'number' ? {
            height: percentToPx(rect.height, height)
        } : {}
    };
}
}),
];

//# debugId=8bdf89b2-e8be-106a-9d37-2d63c1d01f93
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_b67b9a7d._.js.map