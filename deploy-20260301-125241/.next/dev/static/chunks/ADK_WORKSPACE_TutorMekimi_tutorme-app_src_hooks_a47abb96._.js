;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="87c36586-eb2f-ae1c-b08b-1230a7bfd514")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-socket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSocket",
    ()=>useSocket
]);
/**
 * React Hook for Socket.io Client
 * Provides real-time communication for live class sessions
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useSocket(options) {
    _s();
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSocket.useEffect": ()=>{
            let socket;
            const connect = {
                "useSocket.useEffect.connect": async ()=>{
                    const token = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/socket-auth.ts [app-client] (ecmascript, async loader)").then({
                        "useSocket.useEffect.connect": (m)=>m.getSocketToken()
                    }["useSocket.useEffect.connect"]);
                    if (!token) {
                        setError('Authentication required');
                        return;
                    }
                    socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])({
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
                    socket.on('connect', {
                        "useSocket.useEffect.connect": ()=>{
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
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('disconnect', {
                        "useSocket.useEffect.connect": ()=>{
                            console.log('Socket disconnected');
                            setIsConnected(false);
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('connect_error', {
                        "useSocket.useEffect.connect": (err)=>{
                            console.error('Socket connection error:', err);
                            setError(err.message);
                            setIsConnected(false);
                        }
                    }["useSocket.useEffect.connect"]);
                    // Room state (initial load)
                    socket.on('room_state', {
                        "useSocket.useEffect.connect": (state)=>{
                            options?.onRoomState?.(state);
                        }
                    }["useSocket.useEffect.connect"]);
                    // Student events
                    socket.on('student_joined', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onStudentJoined?.(data.state);
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('student_left', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onStudentLeft?.(data.userId);
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('student_state_update', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onStudentStateUpdate?.(data);
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('student_distress', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onStudentDistress?.(data);
                        }
                    }["useSocket.useEffect.connect"]);
                    // Chat events
                    socket.on('chat_message', {
                        "useSocket.useEffect.connect": (message)=>{
                            options?.onChatMessage?.(message);
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('tutor_broadcast', {
                        "useSocket.useEffect.connect": (message)=>{
                            options?.onTutorBroadcast?.(message);
                        }
                    }["useSocket.useEffect.connect"]);
                    // AI hints
                    socket.on('ai_hint', {
                        "useSocket.useEffect.connect": (hint)=>{
                            options?.onAIHint?.(hint);
                        }
                    }["useSocket.useEffect.connect"]);
                    // Whiteboard
                    socket.on('whiteboard_update', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onWhiteboardUpdate?.(data);
                        }
                    }["useSocket.useEffect.connect"]);
                    // Code editor
                    socket.on('code_update', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onCodeUpdate?.(data);
                        }
                    }["useSocket.useEffect.connect"]);
                    // Breakout
                    socket.on('breakout_invite', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onBreakoutInvite?.(data);
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('breakout_room_update', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onBreakoutRoomUpdate?.(data.rooms);
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('breakout_message', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onBreakoutMessage?.(data);
                        }
                    }["useSocket.useEffect.connect"]);
                    socket.on('notification', {
                        "useSocket.useEffect.connect": (data)=>{
                            options?.onNotification?.(data);
                        }
                    }["useSocket.useEffect.connect"]);
                }
            }["useSocket.useEffect.connect"];
            connect();
            return ({
                "useSocket.useEffect": ()=>{
                    if (socketRef.current) {
                        socketRef.current.disconnect();
                        socketRef.current = null;
                    }
                }
            })["useSocket.useEffect"];
        }
    }["useSocket.useEffect"], [
        options?.roomId,
        options?.userId,
        options?.name,
        options?.role,
        options?.tutorId
    ]);
    // Send chat message
    const sendChatMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[sendChatMessage]": (text)=>{
            socketRef.current?.emit('chat_message', {
                text
            });
        }
    }["useSocket.useCallback[sendChatMessage]"], []);
    // Send whiteboard update
    const sendWhiteboardUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[sendWhiteboardUpdate]": (strokes)=>{
            socketRef.current?.emit('whiteboard_update', {
                strokes
            });
        }
    }["useSocket.useCallback[sendWhiteboardUpdate]"], []);
    // Send code update
    const sendCodeUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[sendCodeUpdate]": (content, language)=>{
            socketRef.current?.emit('code_update', {
                content,
                language
            });
        }
    }["useSocket.useCallback[sendCodeUpdate]"], []);
    // Send activity ping
    const sendActivityPing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[sendActivityPing]": (data)=>{
            socketRef.current?.emit('activity_ping', data);
        }
    }["useSocket.useCallback[sendActivityPing]"], []);
    // Tutor broadcast
    const sendBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[sendBroadcast]": (text, targetGroup = 'all')=>{
            socketRef.current?.emit('tutor_broadcast', {
                text,
                targetGroup
            });
        }
    }["useSocket.useCallback[sendBroadcast]"], []);
    // Push hint to student
    const pushHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[pushHint]": (targetUserId, hint, type)=>{
            socketRef.current?.emit('push_hint', {
                targetUserId,
                hint,
                type
            });
        }
    }["useSocket.useCallback[pushHint]"], []);
    // Invite to breakout
    const inviteToBreakout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[inviteToBreakout]": (targetUserId, roomId)=>{
            socketRef.current?.emit('breakout_invite', {
                targetUserId,
                roomId
            });
        }
    }["useSocket.useCallback[inviteToBreakout]"], []);
    // Broadcast to all breakout rooms
    const sendBreakoutBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[sendBreakoutBroadcast]": (message)=>{
            socketRef.current?.emit('breakout_broadcast', {
                message
            });
        }
    }["useSocket.useCallback[sendBreakoutBroadcast]"], []);
    // Close a breakout room
    const closeBreakoutRoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[closeBreakoutRoom]": (breakoutRoomId)=>{
            socketRef.current?.emit('close_breakout', {
                breakoutRoomId
            });
        }
    }["useSocket.useCallback[closeBreakoutRoom]"], []);
    // Extend breakout room time
    const extendBreakoutTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[extendBreakoutTime]": (breakoutRoomId, minutes)=>{
            socketRef.current?.emit('extend_breakout_time', {
                breakoutRoomId,
                minutes
            });
        }
    }["useSocket.useCallback[extendBreakoutTime]"], []);
    // Send message in breakout room
    const sendBreakoutMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[sendBreakoutMessage]": (breakoutRoomId, message)=>{
            socketRef.current?.emit('breakout_message', {
                breakoutRoomId,
                message
            });
        }
    }["useSocket.useCallback[sendBreakoutMessage]"], []);
    // Request help in breakout room
    const requestHelp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSocket.useCallback[requestHelp]": (breakoutRoomId, reason)=>{
            socketRef.current?.emit('request_help', {
                breakoutRoomId,
                reason
            });
        }
    }["useSocket.useCallback[requestHelp]"], []);
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
_s(useSocket, "g7yKnbZVu67eStHdNIO3Ml7UM1k=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-simple-socket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
;
;
function useSimpleSocket(roomId, options = {}) {
    _s();
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [socketInstance, setSocketInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSimpleSocket.useEffect": ()=>{
            if (!roomId) return;
            const connect = {
                "useSimpleSocket.useEffect.connect": async ()=>{
                    const token = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/socket-auth.ts [app-client] (ecmascript, async loader)").then({
                        "useSimpleSocket.useEffect.connect": (m)=>m.getSocketToken()
                    }["useSimpleSocket.useEffect.connect"]);
                    if (!token) return;
                    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])({
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
                    socket.on('connect', {
                        "useSimpleSocket.useEffect.connect": ()=>{
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
                        }
                    }["useSimpleSocket.useEffect.connect"]);
                    socket.on('disconnect', {
                        "useSimpleSocket.useEffect.connect": ()=>{
                            setIsConnected(false);
                            setSocketInstance(null);
                        }
                    }["useSimpleSocket.useEffect.connect"]);
                    socket.on('connect_error', {
                        "useSimpleSocket.useEffect.connect": (err)=>{
                            console.warn('Socket connection error:', err?.message || err);
                            setIsConnected(false);
                        }
                    }["useSimpleSocket.useEffect.connect"]);
                }
            }["useSimpleSocket.useEffect.connect"];
            connect();
            return ({
                "useSimpleSocket.useEffect": ()=>{
                    socketRef.current?.disconnect();
                    socketRef.current = null;
                }
            })["useSimpleSocket.useEffect"];
        }
    }["useSimpleSocket.useEffect"], [
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
_s(useSimpleSocket, "pEnI4Xruy0mYq8TMmDi9A0XuO+Q=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-live-class-whiteboard.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-simple-socket.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useLiveClassWhiteboard(roomId, sessionId, role) {
    _s();
    const applyStrokeOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[applyStrokeOps]": (prev, ops)=>{
            if (!ops.length) return prev;
            let changed = false;
            const byId = new Map(prev.map({
                "useLiveClassWhiteboard.useCallback[applyStrokeOps]": (stroke)=>[
                        stroke.id,
                        stroke
                    ]
            }["useLiveClassWhiteboard.useCallback[applyStrokeOps]"]));
            ops.forEach({
                "useLiveClassWhiteboard.useCallback[applyStrokeOps]": (op)=>{
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
                }
            }["useLiveClassWhiteboard.useCallback[applyStrokeOps]"]);
            return changed ? Array.from(byId.values()) : prev;
        }
    }["useLiveClassWhiteboard.useCallback[applyStrokeOps]"], []);
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { socket, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSimpleSocket"])(roomId || '', {
        userId: session?.user?.id,
        name: session?.user?.name || role,
        role
    });
    // Whiteboard state
    const [myStrokes, setMyStrokes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tutorStrokes, setTutorStrokes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [studentWhiteboards, setStudentWhiteboards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [visibility, setVisibility] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('private');
    const [isBroadcasting, setIsBroadcasting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [viewingStudentId, setViewingStudentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeStudentBoards, setActiveStudentBoards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [remoteCursors, setRemoteCursors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [remoteSelections, setRemoteSelections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [availableBranches, setAvailableBranches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLayerLocked, setIsLayerLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submissions, setSubmissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [hasSubmitted, setHasSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [layerConfig, setLayerConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
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
    const [activeLayerId, setActiveLayerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(role === 'tutor' ? 'tutor-broadcast' : 'student-personal');
    const [assignmentOverlay, setAssignmentOverlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [spotlight, setSpotlight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        enabled: false,
        x: 160,
        y: 120,
        width: 420,
        height: 220,
        mode: 'rectangle'
    });
    const [snapshots, setSnapshots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [timelineIndex, setTimelineIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [aiRegionHints, setAiRegionHints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [moderationState, setModerationState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        mutedStudentIds: [],
        studentStrokeWindowLimit: 80,
        strokeWindowMs: 5000,
        lockedLayers: []
    });
    const strokesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const pendingOpsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const flushTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localOpSeqRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const boardSeqRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        student: 0,
        tutor: 0
    });
    // Keep ref in sync
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLiveClassWhiteboard.useEffect": ()=>{
            strokesRef.current = myStrokes;
        }
    }["useLiveClassWhiteboard.useEffect"], [
        myStrokes
    ]);
    const flushStrokeOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[flushStrokeOps]": ()=>{
            if (!socket || !roomId || !session?.user?.id) return;
            if (!pendingOpsRef.current.length) return;
            const merged = new Map();
            pendingOpsRef.current.forEach({
                "useLiveClassWhiteboard.useCallback[flushStrokeOps]": (op)=>{
                    if (op.kind === 'delete' && op.strokeId) {
                        merged.set(op.strokeId, op);
                    } else if (op.kind === 'upsert' && op.stroke) {
                        merged.set(op.stroke.id, op);
                    }
                }
            }["useLiveClassWhiteboard.useCallback[flushStrokeOps]"]);
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
        }
    }["useLiveClassWhiteboard.useCallback[flushStrokeOps]"], [
        role,
        roomId,
        session,
        socket,
        visibility
    ]);
    const enqueueStrokeOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[enqueueStrokeOps]": (ops)=>{
            if (!ops.length) return;
            pendingOpsRef.current.push(...ops);
            if (pendingOpsRef.current.length >= 120) {
                flushStrokeOps();
                return;
            }
            if (flushTimerRef.current) return;
            flushTimerRef.current = setTimeout({
                "useLiveClassWhiteboard.useCallback[enqueueStrokeOps]": ()=>{
                    flushTimerRef.current = null;
                    flushStrokeOps();
                }
            }["useLiveClassWhiteboard.useCallback[enqueueStrokeOps]"], 28);
        }
    }["useLiveClassWhiteboard.useCallback[enqueueStrokeOps]"], [
        flushStrokeOps
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLiveClassWhiteboard.useEffect": ()=>{
            return ({
                "useLiveClassWhiteboard.useEffect": ()=>{
                    if (flushTimerRef.current) {
                        clearTimeout(flushTimerRef.current);
                        flushTimerRef.current = null;
                    }
                    flushStrokeOps();
                }
            })["useLiveClassWhiteboard.useEffect"];
        }
    }["useLiveClassWhiteboard.useEffect"], [
        flushStrokeOps
    ]);
    // Initialize whiteboard on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLiveClassWhiteboard.useEffect": ()=>{
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
        }
    }["useLiveClassWhiteboard.useEffect"], [
        sessionId,
        roomId,
        socket,
        isConnected,
        role,
        session
    ]);
    // Set up socket listeners
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLiveClassWhiteboard.useEffect": ()=>{
            if (!socket) return;
            // Tutor broadcasting started
            socket.on('lcwb_tutor_broadcasting', {
                "useLiveClassWhiteboard.useEffect": ()=>{
                // reserved for UI indicators
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Tutor stopped broadcasting
            socket.on('lcwb_tutor_broadcast_stopped', {
                "useLiveClassWhiteboard.useEffect": ()=>{
                    setTutorStrokes([]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Receive tutor's stroke (for students)
            socket.on('lcwb_tutor_stroke', {
                "useLiveClassWhiteboard.useEffect": (stroke)=>{
                    setTutorStrokes({
                        "useLiveClassWhiteboard.useEffect": (prev)=>[
                                ...prev,
                                stroke
                            ]
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_tutor_strokes_reset', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setTutorStrokes(data.strokes || []);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_tutor_stroke_ops', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    const maxSeq = Math.max(0, ...(data.ops || []).map({
                        "useLiveClassWhiteboard.useEffect.maxSeq": (op)=>op._seq || 0
                    }["useLiveClassWhiteboard.useEffect.maxSeq"]));
                    if (maxSeq > 0) boardSeqRef.current.tutor = Math.max(boardSeqRef.current.tutor, maxSeq);
                    setTutorStrokes({
                        "useLiveClassWhiteboard.useEffect": (prev)=>applyStrokeOps(prev, data.ops || [])
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_student_whiteboard_state', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
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
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Student created a whiteboard (tutor receives)
            socket.on('lcwb_student_whiteboard_created', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setActiveStudentBoards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>[
                                ...new Set([
                                    ...prev,
                                    data.studentId
                                ])
                            ]
                    }["useLiveClassWhiteboard.useEffect"]);
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>new Map(prev.set(data.studentId, {
                                studentId: data.studentId,
                                studentName: data.name,
                                whiteboardId: '',
                                visibility: 'private',
                                strokes: [],
                                lastActivity: new Date()
                            }))
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Receive student's stroke (tutor receives)
            socket.on('lcwb_student_stroke', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const wb = prev.get(data.studentId);
                            if (wb) {
                                wb.strokes.push(data.stroke);
                                wb.lastActivity = new Date();
                                return new Map(prev);
                            }
                            return prev;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_student_strokes_reset', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const next = new Map(prev);
                            const wb = next.get(data.studentId);
                            if (wb) {
                                wb.strokes = data.strokes || [];
                                wb.lastActivity = new Date();
                                next.set(data.studentId, wb);
                            }
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_student_stroke_ops', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    const maxSeq = Math.max(0, ...(data.ops || []).map({
                        "useLiveClassWhiteboard.useEffect.maxSeq": (op)=>op._seq || 0
                    }["useLiveClassWhiteboard.useEffect.maxSeq"]));
                    if (maxSeq > 0 && session?.user?.id === data.studentId) {
                        boardSeqRef.current.student = Math.max(boardSeqRef.current.student, maxSeq);
                    }
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const next = new Map(prev);
                            const wb = next.get(data.studentId);
                            if (wb) {
                                wb.strokes = applyStrokeOps(wb.strokes, data.ops || []);
                                wb.lastActivity = new Date();
                                next.set(data.studentId, wb);
                            }
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Student visibility changed
            socket.on('lcwb_student_visibility_changed', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const wb = prev.get(data.studentId);
                            if (wb) {
                                wb.visibility = data.visibility;
                                return new Map(prev);
                            }
                            return prev;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Student made board public (other students receive)
            socket.on('lcwb_student_public', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setActiveStudentBoards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>[
                                ...new Set([
                                    ...prev,
                                    data.studentId
                                ])
                            ]
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Receive public student stroke (students receive from other students)
            socket.on('lcwb_public_student_stroke', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const wb = prev.get(data.studentId);
                            if (wb) {
                                wb.strokes.push(data.stroke);
                                return new Map(prev);
                            }
                            return prev;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_public_student_strokes_reset', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const next = new Map(prev);
                            const wb = next.get(data.studentId);
                            if (wb) {
                                wb.strokes = data.strokes || [];
                                next.set(data.studentId, wb);
                            }
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_public_student_stroke_ops', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setStudentWhiteboards({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const next = new Map(prev);
                            const wb = next.get(data.studentId);
                            if (wb) {
                                wb.strokes = applyStrokeOps(wb.strokes, data.ops || []);
                                next.set(data.studentId, wb);
                            }
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_replay_ops', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    if (data.scope === 'tutor') {
                        boardSeqRef.current.tutor = Math.max(boardSeqRef.current.tutor, data.latestSeq || 0);
                        setTutorStrokes({
                            "useLiveClassWhiteboard.useEffect": (prev)=>applyStrokeOps(prev, data.ops || [])
                        }["useLiveClassWhiteboard.useEffect"]);
                        return;
                    }
                    const myId = session?.user?.id;
                    if (!myId || data.userId && data.userId !== myId) return;
                    boardSeqRef.current.student = Math.max(boardSeqRef.current.student, data.latestSeq || 0);
                    setMyStrokes({
                        "useLiveClassWhiteboard.useEffect": (prev)=>applyStrokeOps(prev, data.ops || [])
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_selection_presence_update', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    if (!data?.userId || data.userId === session?.user?.id) return;
                    setRemoteSelections({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const next = new Map(prev);
                            next.set(data.userId, data);
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_selection_presence_remove', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    if (!data?.userId) return;
                    setRemoteSelections({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            if (!prev.has(data.userId)) return prev;
                            const next = new Map(prev);
                            next.delete(data.userId);
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_branch_list', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setAvailableBranches(data.branches || []);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Tutor is viewing this student's board
            socket.on('lcwb_tutor_viewing', {
                "useLiveClassWhiteboard.useEffect": ()=>{
                // reserved for UI indicators
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Tutor stopped viewing
            socket.on('lcwb_tutor_stopped_viewing', {
                "useLiveClassWhiteboard.useEffect": ()=>{
                // reserved for UI indicators
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Tutor annotated on student's board
            socket.on('lcwb_tutor_annotation', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setMyStrokes({
                        "useLiveClassWhiteboard.useEffect": (prev)=>[
                                ...prev,
                                data.stroke
                            ]
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Sync response
            socket.on('lcwb_sync_response', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setMyStrokes(data.strokes);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_cursor_update', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setRemoteCursors({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const next = new Map(prev);
                            next.set(data.userId, data);
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_cursor_remove', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setRemoteCursors({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const next = new Map(prev);
                            next.delete(data.userId);
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_layer_locked', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setIsLayerLocked(data.locked);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_layer_config', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setLayerConfig({
                        "useLiveClassWhiteboard.useEffect": (prev)=>prev.map({
                                "useLiveClassWhiteboard.useEffect": (layer)=>({
                                        ...layer,
                                        visible: data.visibility[layer.id] ?? layer.visible,
                                        locked: data.lockedLayers.includes(layer.id)
                                    })
                            }["useLiveClassWhiteboard.useEffect"])
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_student_submitted', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    if (role === 'tutor') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${data.studentName} submitted their board`);
                    }
                    setSubmissions({
                        "useLiveClassWhiteboard.useEffect": (prev)=>{
                            const next = new Map(prev);
                            next.set(data.studentId, {
                                studentId: data.studentId,
                                studentName: data.studentName,
                                submittedAt: data.submittedAt,
                                strokeCount: data.strokeCount,
                                reviewed: false
                            });
                            return next;
                        }
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_submission_reviewed', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    if (role === 'student' && session?.user?.id === data.studentId) {
                        setHasSubmitted(false);
                        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Your board was reviewed by the tutor');
                    }
                    if (role === 'tutor') {
                        setSubmissions({
                            "useLiveClassWhiteboard.useEffect": (prev)=>{
                                const next = new Map(prev);
                                const existing = next.get(data.studentId);
                                if (existing) {
                                    next.set(data.studentId, {
                                        ...existing,
                                        reviewed: true
                                    });
                                }
                                return next;
                            }
                        }["useLiveClassWhiteboard.useEffect"]);
                    }
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_moderation_state', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setModerationState(data);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_moderation_warning', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning(data.message || 'Board action blocked by moderation settings');
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_assignment_overlay', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setAssignmentOverlay(data.overlay);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_spotlight_update', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setSpotlight(data);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_ai_region_hint', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setAiRegionHints({
                        "useLiveClassWhiteboard.useEffect": (prev)=>[
                                data,
                                ...prev
                            ].slice(0, 20)
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_snapshot_created', {
                "useLiveClassWhiteboard.useEffect": (snapshot)=>{
                    setSnapshots({
                        "useLiveClassWhiteboard.useEffect": (prev)=>[
                                snapshot,
                                ...prev
                            ].slice(0, 80)
                    }["useLiveClassWhiteboard.useEffect"]);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_snapshot_timeline', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    setSnapshots(data.snapshots);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            socket.on('lcwb_breakout_promoted', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    if (role === 'tutor') {
                        setTutorStrokes({
                            "useLiveClassWhiteboard.useEffect": (prev)=>[
                                    ...prev,
                                    ...data.strokes
                                ]
                        }["useLiveClassWhiteboard.useEffect"]);
                    }
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // AI region hint error
            socket.on('lcwb_ai_region_error', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data.message || 'Failed to get AI hint');
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Export attached by tutor
            socket.on('lcwb_export_attached', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Export "${data.name}" attached by tutor`);
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Student cleared their own board
            socket.on('lcwb_student_cleared_own', {
                "useLiveClassWhiteboard.useEffect": (data)=>{
                    if (role === 'tutor') {
                        setStudentWhiteboards({
                            "useLiveClassWhiteboard.useEffect": (prev)=>{
                                const next = new Map(prev);
                                const wb = next.get(data.studentId);
                                if (wb) {
                                    wb.strokes = [];
                                    next.set(data.studentId, wb);
                                }
                                return next;
                            }
                        }["useLiveClassWhiteboard.useEffect"]);
                    }
                    if (role === 'student' && session?.user?.id === data.studentId) {
                        setMyStrokes([]);
                        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('Your board was cleared');
                    }
                }
            }["useLiveClassWhiteboard.useEffect"]);
            // Cleanup
            return ({
                "useLiveClassWhiteboard.useEffect": ()=>{
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
                }
            })["useLiveClassWhiteboard.useEffect"];
        }
    }["useLiveClassWhiteboard.useEffect"], [
        applyStrokeOps,
        role,
        session?.user?.id,
        socket
    ]);
    // Remove stale cursors (network drops / tab backgrounding).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLiveClassWhiteboard.useEffect": ()=>{
            const interval = setInterval({
                "useLiveClassWhiteboard.useEffect.interval": ()=>{
                    const cutoff = Date.now() - 5000;
                    setRemoteCursors({
                        "useLiveClassWhiteboard.useEffect.interval": (prev)=>{
                            const next = new Map(prev);
                            let changed = false;
                            next.forEach({
                                "useLiveClassWhiteboard.useEffect.interval": (cursor, userId)=>{
                                    if (cursor.lastUpdated < cutoff) {
                                        next.delete(userId);
                                        changed = true;
                                    }
                                }
                            }["useLiveClassWhiteboard.useEffect.interval"]);
                            return changed ? next : prev;
                        }
                    }["useLiveClassWhiteboard.useEffect.interval"]);
                }
            }["useLiveClassWhiteboard.useEffect.interval"], 2000);
            return ({
                "useLiveClassWhiteboard.useEffect": ()=>clearInterval(interval)
            })["useLiveClassWhiteboard.useEffect"];
        }
    }["useLiveClassWhiteboard.useEffect"], []);
    /** Tutor: Start broadcasting — your strokes are sent to all students in the room in real time. */ const startBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[startBroadcast]": ()=>{
            if (role !== 'tutor') return;
            if (!socket || !isConnected) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning('Connect to the class first');
                return;
            }
            if (!sessionId || !roomId) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning('Session or room not ready');
                return;
            }
            socket.emit('lcwb_broadcast_start', {
                roomId,
                whiteboardId: session?.user?.id
            });
            setIsBroadcasting(true);
        }
    }["useLiveClassWhiteboard.useCallback[startBroadcast]"], [
        socket,
        isConnected,
        role,
        roomId,
        sessionId,
        session
    ]);
    /** Tutor: Stop broadcasting — students no longer receive your strokes. */ const stopBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[stopBroadcast]": ()=>{
            if (!socket || role !== 'tutor') return;
            socket.emit('lcwb_broadcast_stop', {
                roomId
            });
            setIsBroadcasting(false);
        }
    }["useLiveClassWhiteboard.useCallback[stopBroadcast]"], [
        socket,
        role,
        roomId
    ]);
    // Tutor: Broadcast a stroke
    const broadcastStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[broadcastStroke]": (stroke)=>{
            if (!socket || role !== 'tutor') return;
            socket.emit('lcwb_stroke_broadcast', {
                roomId,
                stroke
            });
        }
    }["useLiveClassWhiteboard.useCallback[broadcastStroke]"], [
        socket,
        role,
        roomId
    ]);
    // Student: Add a stroke to their whiteboard
    const addStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[addStroke]": (stroke)=>{
            if (!socket || !session?.user?.id) return;
            if (role === 'student' && isLayerLocked) return;
            if (role === 'student' && moderationState.lockedLayers.includes(activeLayerId)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning('This layer is locked by the tutor');
                return;
            }
            // Update local state
            setMyStrokes({
                "useLiveClassWhiteboard.useCallback[addStroke]": (prev)=>[
                        ...prev,
                        stroke
                    ]
            }["useLiveClassWhiteboard.useCallback[addStroke]"]);
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
        }
    }["useLiveClassWhiteboard.useCallback[addStroke]"], [
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
    const addTutorStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[addTutorStroke]": (stroke)=>{
            if (!socket || role !== 'tutor') return;
            const normalizedStroke = {
                ...stroke,
                layerId: stroke.layerId || activeLayerId
            };
            setMyStrokes({
                "useLiveClassWhiteboard.useCallback[addTutorStroke]": (prev)=>[
                        ...prev,
                        normalizedStroke
                    ]
            }["useLiveClassWhiteboard.useCallback[addTutorStroke]"]);
            if (isBroadcasting || normalizedStroke.layerId === 'tutor-broadcast') {
                socket.emit('lcwb_stroke_broadcast', {
                    roomId,
                    stroke: normalizedStroke
                });
            }
        }
    }["useLiveClassWhiteboard.useCallback[addTutorStroke]"], [
        socket,
        role,
        activeLayerId,
        isBroadcasting,
        roomId
    ]);
    // Student: Change visibility
    const changeVisibility = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[changeVisibility]": (newVisibility)=>{
            if (!socket || role !== 'student' || !session?.user?.id) return;
            setVisibility(newVisibility);
            socket.emit('lcwb_visibility_change', {
                roomId,
                userId: session.user.id,
                visibility: newVisibility
            });
        }
    }["useLiveClassWhiteboard.useCallback[changeVisibility]"], [
        socket,
        role,
        roomId,
        session
    ]);
    // Tutor: View a specific student's whiteboard
    const viewStudentWhiteboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[viewStudentWhiteboard]": (studentId)=>{
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
        }
    }["useLiveClassWhiteboard.useCallback[viewStudentWhiteboard]"], [
        socket,
        role,
        roomId,
        viewingStudentId
    ]);
    // Tutor: Stop viewing student
    const stopViewingStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[stopViewingStudent]": ()=>{
            if (!socket || role !== 'tutor' || !viewingStudentId) return;
            socket.emit('lcwb_tutor_stop_view', {
                roomId,
                studentId: viewingStudentId
            });
            setViewingStudentId(null);
        }
    }["useLiveClassWhiteboard.useCallback[stopViewingStudent]"], [
        socket,
        role,
        roomId,
        viewingStudentId
    ]);
    // Tutor: Annotate on student's whiteboard
    const annotateOnStudentBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[annotateOnStudentBoard]": (studentId, stroke)=>{
            if (!socket || role !== 'tutor') return;
            socket.emit('lcwb_tutor_annotate', {
                roomId,
                studentId,
                stroke
            });
        }
    }["useLiveClassWhiteboard.useCallback[annotateOnStudentBoard]"], [
        socket,
        role,
        roomId
    ]);
    // Clear my whiteboard
    const clearMyWhiteboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[clearMyWhiteboard]": (pageId)=>{
            if (!pageId) {
                setMyStrokes([]);
                return;
            }
            setMyStrokes({
                "useLiveClassWhiteboard.useCallback[clearMyWhiteboard]": (prev)=>prev.filter({
                        "useLiveClassWhiteboard.useCallback[clearMyWhiteboard]": (stroke)=>stroke.pageId !== pageId
                    }["useLiveClassWhiteboard.useCallback[clearMyWhiteboard]"])
            }["useLiveClassWhiteboard.useCallback[clearMyWhiteboard]"]);
        }
    }["useLiveClassWhiteboard.useCallback[clearMyWhiteboard]"], []);
    // Undo last stroke
    const undoLastStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[undoLastStroke]": (pageId)=>{
            setMyStrokes({
                "useLiveClassWhiteboard.useCallback[undoLastStroke]": (prev)=>{
                    if (!pageId) return prev.slice(0, -1);
                    const lastIndex = [
                        ...prev
                    ].reverse().findIndex({
                        "useLiveClassWhiteboard.useCallback[undoLastStroke].lastIndex": (stroke)=>stroke.pageId === pageId
                    }["useLiveClassWhiteboard.useCallback[undoLastStroke].lastIndex"]);
                    if (lastIndex < 0) return prev;
                    const indexToRemove = prev.length - 1 - lastIndex;
                    return prev.filter({
                        "useLiveClassWhiteboard.useCallback[undoLastStroke]": (_, index)=>index !== indexToRemove
                    }["useLiveClassWhiteboard.useCallback[undoLastStroke]"]);
                }
            }["useLiveClassWhiteboard.useCallback[undoLastStroke]"]);
        }
    }["useLiveClassWhiteboard.useCallback[undoLastStroke]"], []);
    const updateCursor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[updateCursor]": (x, y, pointerMode = 'cursor')=>{
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
        }
    }["useLiveClassWhiteboard.useCallback[updateCursor]"], [
        socket,
        session,
        roomId,
        role
    ]);
    const updateSelectionPresence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[updateSelectionPresence]": (strokeIds, pageId, color = '#2563eb')=>{
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
        }
    }["useLiveClassWhiteboard.useCallback[updateSelectionPresence]"], [
        roomId,
        role,
        session,
        socket
    ]);
    const createBoardBranch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[createBoardBranch]": (branchName)=>{
            if (!socket || !roomId || !session?.user?.id || !branchName.trim()) return;
            socket.emit('lcwb_branch_create', {
                roomId,
                scope: role === 'tutor' ? 'tutor' : 'student',
                userId: session.user.id,
                branchName: branchName.trim()
            });
        }
    }["useLiveClassWhiteboard.useCallback[createBoardBranch]"], [
        roomId,
        role,
        session,
        socket
    ]);
    const switchBoardBranch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[switchBoardBranch]": (branchName)=>{
            if (!socket || !roomId || !session?.user?.id || !branchName.trim()) return;
            socket.emit('lcwb_branch_switch', {
                roomId,
                scope: role === 'tutor' ? 'tutor' : 'student',
                userId: session.user.id,
                branchName: branchName.trim()
            });
        }
    }["useLiveClassWhiteboard.useCallback[switchBoardBranch]"], [
        roomId,
        role,
        session,
        socket
    ]);
    /** Tutor: Lock/unlock student layers — when locked, students cannot draw on their boards until you unlock. */ const toggleLayerLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[toggleLayerLock]": (locked)=>{
            if (role !== 'tutor') return;
            if (!socket || !isConnected) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning('Connect to the class first');
                return;
            }
            if (!roomId) {
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning('Room not ready');
                return;
            }
            setIsLayerLocked(locked);
            socket.emit('lcwb_layer_lock', {
                roomId,
                locked
            });
        }
    }["useLiveClassWhiteboard.useCallback[toggleLayerLock]"], [
        socket,
        isConnected,
        role,
        roomId
    ]);
    const updateLayerConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[updateLayerConfig]": (nextConfig)=>{
            setLayerConfig(nextConfig);
            if (!socket || !roomId || role !== 'tutor') return;
            const visibility = nextConfig.reduce({
                "useLiveClassWhiteboard.useCallback[updateLayerConfig].visibility": (acc, layer)=>{
                    acc[layer.id] = layer.visible;
                    return acc;
                }
            }["useLiveClassWhiteboard.useCallback[updateLayerConfig].visibility"], {});
            socket.emit('lcwb_layer_config_update', {
                roomId,
                visibility,
                lockedLayers: nextConfig.filter({
                    "useLiveClassWhiteboard.useCallback[updateLayerConfig]": (layer)=>layer.locked
                }["useLiveClassWhiteboard.useCallback[updateLayerConfig]"]).map({
                    "useLiveClassWhiteboard.useCallback[updateLayerConfig]": (layer)=>layer.id
                }["useLiveClassWhiteboard.useCallback[updateLayerConfig]"])
            });
        }
    }["useLiveClassWhiteboard.useCallback[updateLayerConfig]"], [
        socket,
        roomId,
        role
    ]);
    const setLayerLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[setLayerLock]": (layerId, locked)=>{
            setLayerConfig({
                "useLiveClassWhiteboard.useCallback[setLayerLock]": (prev)=>{
                    const next = prev.map({
                        "useLiveClassWhiteboard.useCallback[setLayerLock].next": (layer)=>layer.id === layerId ? {
                                ...layer,
                                locked
                            } : layer
                    }["useLiveClassWhiteboard.useCallback[setLayerLock].next"]);
                    if (socket && roomId && role === 'tutor') {
                        const visibility = next.reduce({
                            "useLiveClassWhiteboard.useCallback[setLayerLock].visibility": (acc, layer)=>{
                                acc[layer.id] = layer.visible;
                                return acc;
                            }
                        }["useLiveClassWhiteboard.useCallback[setLayerLock].visibility"], {});
                        socket.emit('lcwb_layer_config_update', {
                            roomId,
                            visibility,
                            lockedLayers: next.filter({
                                "useLiveClassWhiteboard.useCallback[setLayerLock]": (layer)=>layer.locked
                            }["useLiveClassWhiteboard.useCallback[setLayerLock]"]).map({
                                "useLiveClassWhiteboard.useCallback[setLayerLock]": (layer)=>layer.id
                            }["useLiveClassWhiteboard.useCallback[setLayerLock]"])
                        });
                    }
                    return next;
                }
            }["useLiveClassWhiteboard.useCallback[setLayerLock]"]);
        }
    }["useLiveClassWhiteboard.useCallback[setLayerLock]"], [
        socket,
        roomId,
        role
    ]);
    const submitMyBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[submitMyBoard]": ()=>{
            if (!socket || role !== 'student' || !session?.user?.id || !roomId) return;
            socket.emit('lcwb_student_submit', {
                roomId,
                studentId: session.user.id,
                studentName: session.user.name || 'Student',
                strokeCount: strokesRef.current.length,
                submittedAt: Date.now()
            });
            setHasSubmitted(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Board submitted to tutor');
        }
    }["useLiveClassWhiteboard.useCallback[submitMyBoard]"], [
        socket,
        role,
        session,
        roomId
    ]);
    const markSubmissionReviewed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[markSubmissionReviewed]": (studentId)=>{
            if (!socket || role !== 'tutor' || !roomId) return;
            socket.emit('lcwb_tutor_mark_reviewed', {
                roomId,
                studentId
            });
            setSubmissions({
                "useLiveClassWhiteboard.useCallback[markSubmissionReviewed]": (prev)=>{
                    const next = new Map(prev);
                    const existing = next.get(studentId);
                    if (existing) next.set(studentId, {
                        ...existing,
                        reviewed: true
                    });
                    return next;
                }
            }["useLiveClassWhiteboard.useCallback[markSubmissionReviewed]"]);
        }
    }["useLiveClassWhiteboard.useCallback[markSubmissionReviewed]"], [
        socket,
        role,
        roomId
    ]);
    const pinSubmission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[pinSubmission]": (studentId, pinned)=>{
            setSubmissions({
                "useLiveClassWhiteboard.useCallback[pinSubmission]": (prev)=>{
                    const next = new Map(prev);
                    const existing = next.get(studentId);
                    if (existing) next.set(studentId, {
                        ...existing,
                        pinned
                    });
                    return next;
                }
            }["useLiveClassWhiteboard.useCallback[pinSubmission]"]);
        }
    }["useLiveClassWhiteboard.useCallback[pinSubmission]"], []);
    const markAllSubmissionsReviewed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed]": ()=>{
            if (!socket || role !== 'tutor' || !roomId) return;
            const pending = Array.from(submissions.values()).filter({
                "useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed].pending": (submission)=>!submission.reviewed
            }["useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed].pending"]);
            pending.forEach({
                "useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed]": (submission)=>{
                    socket.emit('lcwb_tutor_mark_reviewed', {
                        roomId,
                        studentId: submission.studentId
                    });
                }
            }["useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed]"]);
            setSubmissions({
                "useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed]": (prev)=>{
                    const next = new Map(prev);
                    next.forEach({
                        "useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed]": (submission, studentId)=>{
                            next.set(studentId, {
                                ...submission,
                                reviewed: true
                            });
                        }
                    }["useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed]"]);
                    return next;
                }
            }["useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed]"]);
        }
    }["useLiveClassWhiteboard.useCallback[markAllSubmissionsReviewed]"], [
        socket,
        role,
        roomId,
        submissions
    ]);
    const setDrawMuteForStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[setDrawMuteForStudent]": (studentId, muted)=>{
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
        }
    }["useLiveClassWhiteboard.useCallback[setDrawMuteForStudent]"], [
        socket,
        role,
        roomId,
        moderationState
    ]);
    const updateStrokeRateLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[updateStrokeRateLimit]": (limit, windowMs = moderationState.strokeWindowMs)=>{
            if (!socket || role !== 'tutor' || !roomId) return;
            socket.emit('lcwb_tutor_moderation_update', {
                roomId,
                mutedStudentIds: moderationState.mutedStudentIds,
                studentStrokeWindowLimit: limit,
                strokeWindowMs: windowMs,
                lockedLayers: moderationState.lockedLayers
            });
        }
    }["useLiveClassWhiteboard.useCallback[updateStrokeRateLimit]"], [
        socket,
        role,
        roomId,
        moderationState
    ]);
    const clearOwnStrokes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[clearOwnStrokes]": ()=>{
            if (!socket || !roomId || !session?.user?.id) return;
            setMyStrokes({
                "useLiveClassWhiteboard.useCallback[clearOwnStrokes]": (prev)=>prev.filter({
                        "useLiveClassWhiteboard.useCallback[clearOwnStrokes]": (stroke)=>stroke.userId !== session.user.id
                    }["useLiveClassWhiteboard.useCallback[clearOwnStrokes]"])
            }["useLiveClassWhiteboard.useCallback[clearOwnStrokes]"]);
            socket.emit('lcwb_clear_own', {
                roomId,
                userId: session.user.id
            });
        }
    }["useLiveClassWhiteboard.useCallback[clearOwnStrokes]"], [
        socket,
        roomId,
        session
    ]);
    const replaceMyStrokes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[replaceMyStrokes]": (nextOrUpdater)=>{
            setMyStrokes({
                "useLiveClassWhiteboard.useCallback[replaceMyStrokes]": (prev)=>{
                    const next = typeof nextOrUpdater === 'function' ? nextOrUpdater(prev) : nextOrUpdater;
                    if (socket && roomId && session?.user?.id) {
                        const prevMap = new Map(prev.map({
                            "useLiveClassWhiteboard.useCallback[replaceMyStrokes]": (stroke)=>[
                                    stroke.id,
                                    stroke
                                ]
                        }["useLiveClassWhiteboard.useCallback[replaceMyStrokes]"]));
                        const nextMap = new Map(next.map({
                            "useLiveClassWhiteboard.useCallback[replaceMyStrokes]": (stroke)=>[
                                    stroke.id,
                                    stroke
                                ]
                        }["useLiveClassWhiteboard.useCallback[replaceMyStrokes]"]));
                        const ops = [];
                        nextMap.forEach({
                            "useLiveClassWhiteboard.useCallback[replaceMyStrokes]": (stroke, id)=>{
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
                            }
                        }["useLiveClassWhiteboard.useCallback[replaceMyStrokes]"]);
                        prevMap.forEach({
                            "useLiveClassWhiteboard.useCallback[replaceMyStrokes]": (_, id)=>{
                                if (!nextMap.has(id)) {
                                    localOpSeqRef.current += 1;
                                    ops.push({
                                        kind: 'delete',
                                        strokeId: id,
                                        opId: `${session.user.id}:${Date.now()}:${localOpSeqRef.current}:${id}:d`,
                                        sentAt: Date.now()
                                    });
                                }
                            }
                        }["useLiveClassWhiteboard.useCallback[replaceMyStrokes]"]);
                        if (!ops.length) return prev;
                        enqueueStrokeOps(ops);
                    }
                    return next;
                }
            }["useLiveClassWhiteboard.useCallback[replaceMyStrokes]"]);
        }
    }["useLiveClassWhiteboard.useCallback[replaceMyStrokes]"], [
        enqueueStrokeOps,
        roomId,
        session,
        socket
    ]);
    const setAssignmentOverlayMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[setAssignmentOverlayMode]": (overlay)=>{
            setAssignmentOverlay(overlay);
            if (!socket || role !== 'tutor' || !roomId) return;
            socket.emit('lcwb_assignment_overlay', {
                roomId,
                overlay
            });
        }
    }["useLiveClassWhiteboard.useCallback[setAssignmentOverlayMode]"], [
        socket,
        role,
        roomId
    ]);
    const updateSpotlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[updateSpotlight]": (nextSpotlight)=>{
            setSpotlight(nextSpotlight);
            if (!socket || role !== 'tutor' || !roomId) return;
            socket.emit('lcwb_spotlight_update', {
                roomId,
                ...nextSpotlight
            });
        }
    }["useLiveClassWhiteboard.useCallback[updateSpotlight]"], [
        socket,
        role,
        roomId
    ]);
    const requestAIRegionHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[requestAIRegionHint]": (region, context)=>{
            if (!socket || !roomId) return;
            socket.emit('lcwb_ai_region_request', {
                roomId,
                region,
                context
            });
        }
    }["useLiveClassWhiteboard.useCallback[requestAIRegionHint]"], [
        socket,
        roomId
    ]);
    const captureSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[captureSnapshot]": (strokes)=>{
            if (!socket || !roomId) return;
            socket.emit('lcwb_snapshot_capture', {
                roomId,
                strokes
            });
        }
    }["useLiveClassWhiteboard.useCallback[captureSnapshot]"], [
        socket,
        roomId
    ]);
    const requestSnapshotTimeline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[requestSnapshotTimeline]": ()=>{
            if (!socket || !roomId) return;
            socket.emit('lcwb_snapshot_request', {
                roomId
            });
        }
    }["useLiveClassWhiteboard.useCallback[requestSnapshotTimeline]"], [
        socket,
        roomId
    ]);
    const promoteBreakoutBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[promoteBreakoutBoard]": (breakoutRoomId, strokes, sourceStudentId)=>{
            if (!socket || role !== 'tutor' || !roomId) return;
            socket.emit('lcwb_breakout_promote', {
                mainRoomId: roomId,
                breakoutRoomId,
                sourceStudentId,
                strokes
            });
        }
    }["useLiveClassWhiteboard.useCallback[promoteBreakoutBoard]"], [
        socket,
        role,
        roomId
    ]);
    const exportAndAttachBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLiveClassWhiteboard.useCallback[exportAndAttachBoard]": (data)=>{
            if (!socket || role !== 'tutor' || !roomId) return;
            socket.emit('lcwb_export_attach', {
                roomId,
                sessionId,
                studentId: data.studentId,
                format: data.format,
                fileName: data.fileName,
                dataUrl: data.dataUrl
            });
        }
    }["useLiveClassWhiteboard.useCallback[exportAndAttachBoard]"], [
        socket,
        role,
        roomId,
        sessionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLiveClassWhiteboard.useEffect": ()=>{
            if (!roomId || !socket) return;
            const interval = setInterval({
                "useLiveClassWhiteboard.useEffect.interval": ()=>{
                    const sourceStrokes = role === 'tutor' ? myStrokes : myStrokes;
                    if (sourceStrokes.length > 0) {
                        socket.emit('lcwb_snapshot_capture', {
                            roomId,
                            strokes: sourceStrokes
                        });
                    }
                }
            }["useLiveClassWhiteboard.useEffect.interval"], 2 * 60 * 1000);
            return ({
                "useLiveClassWhiteboard.useEffect": ()=>clearInterval(interval)
            })["useLiveClassWhiteboard.useEffect"];
        }
    }["useLiveClassWhiteboard.useEffect"], [
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
_s(useLiveClassWhiteboard, "JwE/XYa0pdM4mMdi3Qmazgf3SVk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSimpleSocket"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-pdf-collab-socket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePdfCollabSocket",
    ()=>usePdfCollabSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-simple-socket.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function usePdfCollabSocket({ roomId, userId, name, role = 'tutor', onCanvasEvent, onCanvasState, onPresenceState }) {
    _s();
    const { socket, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSimpleSocket"])(roomId, {
        userId,
        name,
        role
    });
    const [isLocked, setIsLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [latencyMs, setLatencyMs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [participants, setParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePdfCollabSocket.useEffect": ()=>{
            if (!socket || !roomId) return;
            socket.emit('pdf_join_room', {
                roomId,
                userId,
                name,
                role
            });
            const handleCanvasEvent = {
                "usePdfCollabSocket.useEffect.handleCanvasEvent": (payload)=>{
                    if (typeof payload.sentAt === 'number') {
                        setLatencyMs(Math.max(0, Date.now() - payload.sentAt));
                    }
                    onCanvasEvent?.(payload);
                }
            }["usePdfCollabSocket.useEffect.handleCanvasEvent"];
            const handleLockState = {
                "usePdfCollabSocket.useEffect.handleLockState": (data)=>{
                    if (data.roomId === roomId) setIsLocked(data.locked);
                }
            }["usePdfCollabSocket.useEffect.handleLockState"];
            const handleCanvasState = {
                "usePdfCollabSocket.useEffect.handleCanvasState": (data)=>{
                    if (data.roomId !== roomId) return;
                    onCanvasState?.(data);
                }
            }["usePdfCollabSocket.useEffect.handleCanvasState"];
            const handlePresenceState = {
                "usePdfCollabSocket.useEffect.handlePresenceState": (data)=>{
                    if (data.roomId !== roomId) return;
                    setParticipants(data.participants || []);
                    onPresenceState?.(data);
                }
            }["usePdfCollabSocket.useEffect.handlePresenceState"];
            socket.on('pdf_canvas_event', handleCanvasEvent);
            socket.on('pdf_lock_state', handleLockState);
            socket.on('pdf_canvas_state', handleCanvasState);
            socket.on('pdf_presence_state', handlePresenceState);
            socket.emit('pdf_request_state', {
                roomId
            });
            return ({
                "usePdfCollabSocket.useEffect": ()=>{
                    socket.off('pdf_canvas_event', handleCanvasEvent);
                    socket.off('pdf_lock_state', handleLockState);
                    socket.off('pdf_canvas_state', handleCanvasState);
                    socket.off('pdf_presence_state', handlePresenceState);
                }
            })["usePdfCollabSocket.useEffect"];
        }
    }["usePdfCollabSocket.useEffect"], [
        socket,
        roomId,
        userId,
        name,
        role,
        onCanvasEvent,
        onCanvasState,
        onPresenceState
    ]);
    const emitCanvasEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePdfCollabSocket.useCallback[emitCanvasEvent]": (payload)=>{
            if (!socket || !roomId) return;
            socket.emit('pdf_canvas_event', {
                roomId,
                actorId: userId,
                sentAt: Date.now(),
                ...payload
            });
        }
    }["usePdfCollabSocket.useCallback[emitCanvasEvent]"], [
        socket,
        roomId,
        userId
    ]);
    const setLock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePdfCollabSocket.useCallback[setLock]": (locked)=>{
            if (!socket || !roomId) return;
            socket.emit('pdf_lock_toggle', {
                roomId,
                locked
            });
        }
    }["usePdfCollabSocket.useCallback[setLock]"], [
        socket,
        roomId
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "usePdfCollabSocket.useMemo": ()=>({
                socket,
                isConnected,
                isLocked,
                latencyMs,
                participants,
                emitCanvasEvent,
                setLock
            })
    }["usePdfCollabSocket.useMemo"], [
        socket,
        isConnected,
        isLocked,
        latencyMs,
        participants,
        emitCanvasEvent,
        setLock
    ]);
}
_s(usePdfCollabSocket, "ewTN0VA2ZaPgIDn8Bm0HIoskYlY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$hooks$2f$use$2d$simple$2d$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSimpleSocket"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/hooks/use-daily-call.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDailyCall",
    ()=>useDailyCall
]);
/**
 * React Hook for Daily.co Video Calls
 * Manages video call state and Daily.co call object
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$daily$2d$co$2f$daily$2d$js$2f$dist$2f$daily$2d$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@daily-co/daily-js/dist/daily-esm.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
// Module-level singleton to prevent duplicate Daily instances
let globalCallInstance = null;
let instanceCount = 0;
function useDailyCall(options = {}) {
    _s();
    const callRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(globalCallInstance);
    const instanceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(++instanceCount);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isJoined: false,
        isAudioEnabled: false,
        isVideoEnabled: false,
        isScreenSharing: false,
        participants: [],
        error: null
    });
    // Initialize Daily call object
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDailyCall.useEffect": ()=>{
            // Only the first instance creates the call object
            if (globalCallInstance) {
                callRef.current = globalCallInstance;
                return;
            }
            let call = null;
            try {
                call = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$daily$2d$co$2f$daily$2d$js$2f$dist$2f$daily$2d$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createCallObject();
                globalCallInstance = call;
                callRef.current = call;
            } catch (error) {
                console.warn('Failed to create Daily call object:', error);
                return;
            }
            // Listen for participant events
            call.on('participant-joined', {
                "useDailyCall.useEffect": (event)=>{
                    const participant = mapDailyParticipant(event.participant);
                    options.onParticipantJoined?.(participant);
                    updateParticipants();
                }
            }["useDailyCall.useEffect"]);
            call.on('participant-updated', {
                "useDailyCall.useEffect": ()=>{
                    updateParticipants();
                }
            }["useDailyCall.useEffect"]);
            call.on('participant-left', {
                "useDailyCall.useEffect": (event)=>{
                    const participant = mapDailyParticipant(event.participant);
                    options.onParticipantLeft?.(participant);
                    updateParticipants();
                }
            }["useDailyCall.useEffect"]);
            call.on('error', {
                "useDailyCall.useEffect": (event)=>{
                    setState({
                        "useDailyCall.useEffect": (prev)=>({
                                ...prev,
                                error: event.errorMsg
                            })
                    }["useDailyCall.useEffect"]);
                    options.onError?.(new Error(event.errorMsg));
                }
            }["useDailyCall.useEffect"]);
            call.on('recording-started', {
                "useDailyCall.useEffect": ()=>{
                    options.onRecordingStarted?.();
                }
            }["useDailyCall.useEffect"]);
            call.on('recording-stopped', {
                "useDailyCall.useEffect": ()=>{
                    options.onRecordingStopped?.();
                }
            }["useDailyCall.useEffect"]);
        // Note: We don't destroy the call object on unmount
        // because we want it to persist for the session.
        // It's destroyed when the user explicitly leaves the call.
        }
    }["useDailyCall.useEffect"], []);
    const updateParticipants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[updateParticipants]": ()=>{
            const call = callRef.current;
            if (!call) return;
            const participantsMap = call.participants();
            const participants = Object.values(participantsMap).map(mapDailyParticipant);
            setState({
                "useDailyCall.useCallback[updateParticipants]": (prev)=>({
                        ...prev,
                        participants
                    })
            }["useDailyCall.useCallback[updateParticipants]"]);
        }
    }["useDailyCall.useCallback[updateParticipants]"], []);
    const join = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[join]": async (url, token)=>{
            // Check if this is a mock URL (for development without Daily API key)
            if (url.includes('mock.daily.co')) {
                console.log('Using mock video mode');
                setState({
                    "useDailyCall.useCallback[join]": (prev)=>({
                            ...prev,
                            isJoined: true,
                            isAudioEnabled: false,
                            isVideoEnabled: false,
                            error: null
                        })
                }["useDailyCall.useCallback[join]"]);
                return;
            }
            const call = callRef.current;
            if (!call) {
                console.warn('Daily call object not initialized - using mock mode');
                setState({
                    "useDailyCall.useCallback[join]": (prev)=>({
                            ...prev,
                            isJoined: true,
                            isAudioEnabled: false,
                            isVideoEnabled: false,
                            error: null
                        })
                }["useDailyCall.useCallback[join]"]);
                return;
            }
            try {
                await call.join({
                    url,
                    token,
                    audioSource: false,
                    videoSource: false
                });
                setState({
                    "useDailyCall.useCallback[join]": (prev)=>({
                            ...prev,
                            isJoined: true,
                            isAudioEnabled: false,
                            isVideoEnabled: false,
                            error: null
                        })
                }["useDailyCall.useCallback[join]"]);
            } catch (error) {
                console.error('Daily join error:', error);
                // Fall back to mock mode on error
                console.warn('Falling back to mock video mode');
                setState({
                    "useDailyCall.useCallback[join]": (prev)=>({
                            ...prev,
                            isJoined: true,
                            isAudioEnabled: false,
                            isVideoEnabled: false,
                            error: null
                        })
                }["useDailyCall.useCallback[join]"]);
            }
        }
    }["useDailyCall.useCallback[join]"], []);
    const leave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[leave]": ()=>{
            const call = callRef.current;
            if (!call) return;
            call.leave();
            call.destroy();
            globalCallInstance = null;
            callRef.current = null;
            setState({
                "useDailyCall.useCallback[leave]": (prev)=>({
                        ...prev,
                        isJoined: false,
                        isAudioEnabled: false,
                        isVideoEnabled: false,
                        isScreenSharing: false,
                        participants: []
                    })
            }["useDailyCall.useCallback[leave]"]);
        }
    }["useDailyCall.useCallback[leave]"], []);
    const toggleAudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[toggleAudio]": ()=>{
            const call = callRef.current;
            if (!call || !state.isJoined) return;
            const newState = !state.isAudioEnabled;
            call.setLocalAudio(newState);
            setState({
                "useDailyCall.useCallback[toggleAudio]": (prev)=>({
                        ...prev,
                        isAudioEnabled: newState
                    })
            }["useDailyCall.useCallback[toggleAudio]"]);
        }
    }["useDailyCall.useCallback[toggleAudio]"], [
        state.isJoined,
        state.isAudioEnabled
    ]);
    const toggleVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[toggleVideo]": ()=>{
            const call = callRef.current;
            if (!call || !state.isJoined) return;
            const newState = !state.isVideoEnabled;
            call.setLocalVideo(newState);
            setState({
                "useDailyCall.useCallback[toggleVideo]": (prev)=>({
                        ...prev,
                        isVideoEnabled: newState
                    })
            }["useDailyCall.useCallback[toggleVideo]"]);
        }
    }["useDailyCall.useCallback[toggleVideo]"], [
        state.isJoined,
        state.isVideoEnabled
    ]);
    const startScreenShare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[startScreenShare]": ()=>{
            const call = callRef.current;
            if (!call || !state.isJoined) return;
            call.startScreenShare();
            setState({
                "useDailyCall.useCallback[startScreenShare]": (prev)=>({
                        ...prev,
                        isScreenSharing: true
                    })
            }["useDailyCall.useCallback[startScreenShare]"]);
        }
    }["useDailyCall.useCallback[startScreenShare]"], [
        state.isJoined
    ]);
    const stopScreenShare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[stopScreenShare]": ()=>{
            const call = callRef.current;
            if (!call || !state.isJoined) return;
            call.stopScreenShare();
            setState({
                "useDailyCall.useCallback[stopScreenShare]": (prev)=>({
                        ...prev,
                        isScreenSharing: false
                    })
            }["useDailyCall.useCallback[stopScreenShare]"]);
        }
    }["useDailyCall.useCallback[stopScreenShare]"], [
        state.isJoined
    ]);
    // Start recording
    const startRecording = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[startRecording]": ()=>{
            const call = callRef.current;
            if (!call || !state.isJoined) return;
            call.startRecording();
        }
    }["useDailyCall.useCallback[startRecording]"], [
        state.isJoined
    ]);
    // Stop recording
    const stopRecording = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDailyCall.useCallback[stopRecording]": ()=>{
            const call = callRef.current;
            if (!call || !state.isJoined) return;
            call.stopRecording();
        }
    }["useDailyCall.useCallback[stopRecording]"], [
        state.isJoined
    ]);
    return {
        call: callRef.current,
        ...state,
        join,
        leave,
        toggleAudio,
        toggleVideo,
        startScreenShare,
        stopScreenShare,
        startRecording,
        stopRecording
    };
}
_s(useDailyCall, "fYrp+CihfjBBdfpm2PKpPNWpcVQ=");
function mapDailyParticipant(participant) {
    return {
        id: participant.session_id,
        userId: participant.user_id || participant.session_id,
        name: participant.user_name || 'Anonymous',
        isScreenSharing: participant.screen,
        isAudioEnabled: participant.audio,
        isVideoEnabled: participant.video
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=87c36586-eb2f-ae1c-b08b-1230a7bfd514
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_hooks_a47abb96._.js.map