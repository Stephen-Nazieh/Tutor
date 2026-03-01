;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="534076e8-e3ea-de1f-8a72-781ceff7fec8")}catch(e){}}();
module.exports = [
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/[sessionId]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveClassSessionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f5b$locale$5d2f$tutor$2f$live$2d$class$2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f5b$locale$5d2f$tutor$2f$live$2d$class$2f$components$2f$LiveClassHub$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/components/LiveClassHub.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function LiveClassSessionPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const sessionId = params.sessionId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$app$2f5b$locale$5d2f$tutor$2f$live$2d$class$2f$components$2f$LiveClassHub$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveClassHub"], {
        sessionId: sessionId
    }, void 0, false, {
        fileName: "[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/[locale]/tutor/live-class/[sessionId]/page.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
];

//# debugId=534076e8-e3ea-de1f-8a72-781ceff7fec8
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_app_%5Blocale%5D_tutor_live-class_c1bcb5a7._.js.map