;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="a6bef4e8-0029-8af9-5c7c-7aad2f7c45ec")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/socket-auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Client-side helper to obtain a JWT for Socket.io authentication.
 * Used by use-socket, use-simple-socket, use-whiteboard-socket, etc.
 */ __turbopack_context__.s([
    "getSocketToken",
    ()=>getSocketToken
]);
async function getSocketToken() {
    try {
        const res = await fetch('/api/socket-token', {
            credentials: 'include'
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.token ?? null;
    } catch  {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=a6bef4e8-0029-8af9-5c7c-7aad2f7c45ec
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_socket-auth_ts_9b1d05b1._.js.map