;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="4bd4e771-b1ee-7dfb-ebab-2957f5dcc265")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALERT_CONFIG",
    ()=>ALERT_CONFIG,
    "DISTRIBUTION_MODES",
    ()=>DISTRIBUTION_MODES,
    "PRESET_TASKS",
    ()=>PRESET_TASKS
]);
const PRESET_TASKS = [
    {
        id: 'discuss',
        title: 'Group Discussion',
        description: 'Discuss the key concepts covered in today\'s lesson. Share your understanding and ask clarifying questions.',
        type: 'discussion'
    },
    {
        id: 'problem',
        title: 'Problem Solving',
        description: 'Work together to solve the assigned problem set. Each member should contribute their approach.',
        type: 'problem'
    },
    {
        id: 'peer-teach',
        title: 'Peer Teaching',
        description: 'Each student takes turns explaining a concept to the group. Teach each other!',
        type: 'discussion'
    },
    {
        id: 'project',
        title: 'Mini Project',
        description: 'Collaborate on creating a presentation or solution to the given challenge.',
        type: 'project'
    }
];
const DISTRIBUTION_MODES = [
    {
        key: 'random',
        label: 'Random',
        description: 'Mix students randomly',
        icon: 'Shuffle'
    },
    {
        key: 'skill_based',
        label: 'Skill Based',
        description: 'Group by performance level',
        icon: 'Target'
    },
    {
        key: 'social',
        label: 'Social/Mixed',
        description: 'Mix abilities for peer teaching',
        icon: 'UserPlus'
    },
    {
        key: 'manual',
        label: 'Manual',
        description: 'You assign students',
        icon: 'Settings2'
    },
    {
        key: 'self_select',
        label: 'Self Select',
        description: 'Students choose their groups',
        icon: 'Users'
    }
];
const ALERT_CONFIG = {
    confusion: {
        icon: '❓',
        label: 'Confusion',
        color: 'blue'
    },
    conflict: {
        icon: '⚠️',
        label: 'Conflict',
        color: 'red'
    },
    off_topic: {
        icon: '🎯',
        label: 'Off Topic',
        color: 'yellow'
    },
    need_help: {
        icon: '🆘',
        label: 'Needs Help',
        color: 'red'
    },
    quiet: {
        icon: '🔇',
        label: 'Quiet Group',
        color: 'gray'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/[sessionId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveClassSessionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f5b$locale$5d2f$tutor$2f$live$2d$class$2f$components$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f5b$locale$5d2f$tutor$2f$live$2d$class$2f$components$2f$LiveClassHub$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/LiveClassHub.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function LiveClassSessionPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const sessionId = params.sessionId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f5b$locale$5d2f$tutor$2f$live$2d$class$2f$components$2f$LiveClassHub$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveClassHub"], {
        sessionId: sessionId
    }, void 0, false, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/[sessionId]/page.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_s(LiveClassSessionPage, "+jVsTcECDRo3yq2d7EQxlN9Ixog=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = LiveClassSessionPage;
var _c;
__turbopack_context__.k.register(_c, "LiveClassSessionPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=4bd4e771-b1ee-7dfb-ebab-2957f5dcc265
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_app_%5Blocale%5D_tutor_live-class_152301a9._.js.map