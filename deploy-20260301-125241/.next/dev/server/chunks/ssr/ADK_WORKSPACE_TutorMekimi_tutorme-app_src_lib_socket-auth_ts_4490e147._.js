;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="20e925f9-7cd0-4a94-4792-0b57f6c2d630")}catch(e){}}();
module.exports = [
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/socket-auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
];

//# debugId=20e925f9-7cd0-4a94-4792-0b57f6c2d630
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_socket-auth_ts_4490e147._.js.map