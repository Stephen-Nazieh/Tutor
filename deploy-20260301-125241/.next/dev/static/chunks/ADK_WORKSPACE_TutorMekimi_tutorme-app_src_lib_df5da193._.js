;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="68259fc5-4850-fc21-d461-f3aa95a1cbe1")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/extract-file-text.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    const pdfjs = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript, async loader)");
    // Worker must be same-origin (CSP blocks external scripts). Served from public/ via copy-pdf-worker script.
    if ("TURBOPACK compile-time truthy", 1) {
        const opts = pdfjs.GlobalWorkerOptions;
        if (opts && !opts.workerSrc) {
            opts.workerSrc = '/pdf.worker.min.mjs';
        }
    }
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
    const mammoth = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/mammoth/lib/index.js [app-client] (ecmascript, async loader)");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({
        arrayBuffer
    });
    return (result.value || '').trim();
}
async function extractImageText(file) {
    const mod = await __turbopack_context__.A("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tesseract.js/src/index.js [app-client] (ecmascript, async loader)");
    const api = mod.default ?? mod;
    const { data } = await api.recognize(file, 'eng', {
        logger: ()=>{}
    });
    return (data?.text || '').trim();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/pdf-tutoring/coordinates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=68259fc5-4850-fc21-d461-f3aa95a1cbe1
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_df5da193._.js.map