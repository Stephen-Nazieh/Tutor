;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="314867d2-d5bb-2ebe-6567-9b2b881d5e0a")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/ai/memory-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Memory Service
 * The "Shared Brain" for AI Agents
 * Manages context persistence and retrieval
 */ __turbopack_context__.s([
    "MemoryService",
    ()=>MemoryService
]);
// Mock Database (In-Memory for now)
const profiles = new Map();
const states = new Map();
const signals = new Map();
const roomTranscripts = new Map();
// Initialize with some mock data for testing
const MOCK_STUDENT_ID = 'student-1';
profiles.set(MOCK_STUDENT_ID, {
    id: MOCK_STUDENT_ID,
    name: 'Sarah Chen',
    age: 16,
    level: 'B1',
    learningStyle: 'visual',
    interests: [
        'music',
        'technology',
        'travel'
    ],
    goals: [
        'improve_pronunciation',
        'vocabulary_expansion'
    ],
    preferredVoice: {
        gender: 'female',
        accent: 'us'
    }
});
states.set(MOCK_STUDENT_ID, {
    currentMood: 'neutral',
    energyLevel: 80,
    recentStruggles: [],
    masteredTopics: [
        'present_perfect',
        'basic_greetings'
    ],
    activeTopics: [
        'conditionals',
        'phrasal_verbs'
    ]
});
signals.set(MOCK_STUDENT_ID, []);
class MemoryService {
    /**
     * Get the full context for a student
     * Aggregates Profile + State + Signals
     */ static async getStudentContext(studentId) {
        const profile = profiles.get(studentId);
        if (!profile) return null;
        const state = states.get(studentId) || this.getInitialState();
        const studentSignals = signals.get(studentId) || [];
        // Filter out expired signals
        const activeSignals = studentSignals.filter((s)=>!s.expiresAt || s.expiresAt > Date.now());
        return {
            profile,
            state,
            signals: activeSignals
        };
    }
    /**
     * Transcript Management
     */ static appendTranscript(roomId, entry) {
        const current = roomTranscripts.get(roomId) || [];
        roomTranscripts.set(roomId, [
            ...current,
            entry
        ]);
    }
    static getTranscript(roomId) {
        return roomTranscripts.get(roomId) || [];
    }
    /**
     * Record a new signal from an agent
     */ static async recordSignal(studentId, signal) {
        const newSignal = {
            ...signal,
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now()
        };
        const currentSignals = signals.get(studentId) || [];
        signals.set(studentId, [
            ...currentSignals,
            newSignal
        ]);
        // Auto-update state based on signals
        if (signal.type === 'struggle_detected') {
            await this.updateState(studentId, (state)=>{
                state.recentStruggles.push({
                    topic: signal.context?.topic || 'unknown',
                    errorType: signal.context?.errorType || 'general',
                    severity: signal.context?.severity || 5,
                    detectedAt: Date.now()
                });
                // Keep only last 5 struggles
                if (state.recentStruggles.length > 5) state.recentStruggles.shift();
                return state;
            });
        }
    }
    /**
     * Update the dynamic learning state
     */ static async updateState(studentId, updateFn) {
        const currentState = states.get(studentId) || this.getInitialState();
        const newState = updateFn({
            ...currentState
        });
        states.set(studentId, newState);
    }
    /**
     * Get initial state for new students
     */ static getInitialState() {
        return {
            currentMood: 'neutral',
            energyLevel: 100,
            recentStruggles: [],
            masteredTopics: [],
            activeTopics: []
        };
    }
    /**
     * Analyze Transcript Summary and update context
     * This is the bridge from Classroom TA to Personal Tutor
     */ static async processClassSummary(studentId, summaryJson) {
        // 1. Record the summary signal
        await this.recordSignal(studentId, {
            source: 'classroom_ta',
            type: 'topic_requested',
            content: `Completed class on ${summaryJson.topic}. Status: ${summaryJson.status}`,
            context: summaryJson
        });
        // 2. Update state based on summary
        await this.updateState(studentId, (state)=>{
            // Add struggles
            if (summaryJson.struggles && Array.isArray(summaryJson.struggles)) {
                summaryJson.struggles.forEach((s)=>{
                    state.recentStruggles.push({
                        topic: s,
                        errorType: 'general',
                        severity: 7,
                        detectedAt: Date.now()
                    });
                });
            }
            // Update active topics
            if (summaryJson.topic) {
                if (!state.activeTopics.includes(summaryJson.topic)) {
                    state.activeTopics.push(summaryJson.topic);
                }
            }
            return state;
        });
    }
    /**
     * Record Quiz Result and Update Context
     * Updates student context based on quiz performance
     */ static async recordQuizResult(studentId, result) {
        const percentage = result.score / result.maxScore;
        // Record signal
        await this.recordSignal(studentId, {
            source: 'personal_tutor',
            type: percentage >= 0.7 ? 'mastery_achieved' : 'struggle_detected',
            content: `Quiz on ${result.topic}: ${result.score}/${result.maxScore} (${Math.round(percentage * 100)}%)`,
            context: result
        });
        // Update state based on performance
        await this.updateState(studentId, (state)=>{
            if (percentage < 0.7) {
                // Poor performance - add to struggles
                const existingStruggle = state.recentStruggles.find((s)=>s.topic === result.topic);
                if (!existingStruggle) {
                    state.recentStruggles.push({
                        topic: result.topic,
                        errorType: 'general',
                        severity: Math.round((1 - percentage) * 10),
                        detectedAt: Date.now()
                    });
                    // Keep only last 10 struggles
                    if (state.recentStruggles.length > 10) {
                        state.recentStruggles.shift();
                    }
                }
                // Add to active topics if not already there
                if (!state.activeTopics.includes(result.topic)) {
                    state.activeTopics.push(result.topic);
                }
            } else if (percentage >= 0.85) {
                // Excellent performance - add to mastered topics
                if (!state.masteredTopics.includes(result.topic)) {
                    state.masteredTopics.push(result.topic);
                }
                // Remove from struggles if present
                state.recentStruggles = state.recentStruggles.filter((s)=>s.topic !== result.topic);
            }
            return state;
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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

//# debugId=314867d2-d5bb-2ebe-6567-9b2b881d5e0a
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_c8ba934f._.js.map