;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="38e2418b-abd9-604c-df87-60e8d673da84")}catch(e){}}();
module.exports = [
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@apm-js-collab/code-transformer/index.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
// ./pkg/orchestrion_js.js has a side effect of loading the wasm binary. 
// We only want that if the library is actually used!
var cachedCreate;
/**
 * Create a new instrumentation matcher from an array of instrumentation configs.
 */ function create(configs, dc_module) {
    if (!cachedCreate) {
        cachedCreate = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@apm-js-collab/code-transformer/pkg/orchestrion_js.js [instrumentation] (ecmascript)").create;
    }
    if (cachedCreate === undefined) {
        throw new Error("Failed to load '@apm-js-collab/code-transformer'");
    }
    return cachedCreate(configs, dc_module);
}
}),
];

//# debugId=38e2418b-abd9-604c-df87-60e8d673da84
//# sourceMappingURL=c427b_%40apm-js-collab_code-transformer_index_233dfa3c.js.map