;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="39a428a2-a435-2d65-17bb-50616d101f44")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/getPath.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDrawShapeStrokeDashArray",
    ()=>getDrawShapeStrokeDashArray,
    "getFreehandOptions",
    ()=>getFreehandOptions,
    "getHighlightFreehandSettings",
    ()=>getHighlightFreehandSettings,
    "getPointsFromDrawSegment",
    ()=>getPointsFromDrawSegment,
    "getPointsFromDrawSegments",
    ()=>getPointsFromDrawSegments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$easings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/easings.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
;
const PEN_EASING = (t)=>t * 0.65 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIN"])(t * __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI"] / 2) * 0.35;
const simulatePressureSettings = (strokeWidth)=>{
    return {
        size: strokeWidth,
        thinning: 0.5,
        streamline: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modulate"])(strokeWidth, [
            9,
            16
        ], [
            0.64,
            0.74
        ], true),
        // 0.62 + ((1 + strokeWidth) / 8) * 0.06,
        smoothing: 0.62,
        easing: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$easings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASINGS"].easeOutSine,
        simulatePressure: true
    };
};
const realPressureSettings = (strokeWidth)=>{
    return {
        size: 1 + strokeWidth * 1.2,
        thinning: 0.62,
        streamline: 0.62,
        smoothing: 0.62,
        simulatePressure: false,
        easing: PEN_EASING
    };
};
const solidSettings = (strokeWidth)=>{
    return {
        size: strokeWidth,
        thinning: 0,
        streamline: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modulate"])(strokeWidth, [
            9,
            16
        ], [
            0.64,
            0.74
        ], true),
        // 0.62 + ((1 + strokeWidth) / 8) * 0.06,
        smoothing: 0.62,
        simulatePressure: false,
        easing: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$easings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASINGS"].linear
    };
};
const solidRealPressureSettings = (strokeWidth)=>{
    return {
        size: strokeWidth,
        thinning: 0,
        streamline: 0.62,
        smoothing: 0.62,
        simulatePressure: false,
        easing: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$easings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASINGS"].linear
    };
};
function getHighlightFreehandSettings({ strokeWidth, showAsComplete }) {
    return {
        size: 1 + strokeWidth,
        thinning: 0,
        streamline: 0.5,
        smoothing: 0.5,
        simulatePressure: false,
        easing: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$easings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASINGS"].easeOutSine,
        last: showAsComplete
    };
}
function getFreehandOptions(shapeProps, strokeWidth, forceComplete, forceSolid) {
    const last = shapeProps.isComplete || forceComplete;
    if (forceSolid) {
        if (shapeProps.isPen) {
            return {
                ...solidRealPressureSettings(strokeWidth),
                last
            };
        } else {
            return {
                ...solidSettings(strokeWidth),
                last
            };
        }
    }
    if (shapeProps.dash === "draw") {
        if (shapeProps.isPen) {
            return {
                ...realPressureSettings(strokeWidth),
                last
            };
        } else {
            return {
                ...simulatePressureSettings(strokeWidth),
                last
            };
        }
    }
    return {
        ...solidSettings(strokeWidth),
        last
    };
}
function getPointsFromDrawSegment(segment, scaleX, scaleY, points = []) {
    const _points = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodePoints(segment.path);
    if (scaleX !== 1 || scaleY !== 1) {
        for (const point of _points){
            point.x *= scaleX;
            point.y *= scaleY;
        }
    }
    if (segment.type === "free" || _points.length < 2) {
        points.push(..._points.map(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From));
    } else {
        const pointsToInterpolate = Math.max(4, Math.floor(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(_points[0], _points[1]) / 16));
        points.push(...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].PointsBetween(_points[0], _points[1], pointsToInterpolate));
    }
    return points;
}
function getPointsFromDrawSegments(segments, scaleX = 1, scaleY = 1) {
    const points = [];
    for (const segment of segments){
        getPointsFromDrawSegment(segment, scaleX, scaleY, points);
    }
    return points;
}
function getDrawShapeStrokeDashArray(shape, strokeWidth, dotAdjustment) {
    return ({
        draw: "none",
        solid: `none`,
        dotted: `${dotAdjustment} ${strokeWidth * 2}`,
        dashed: `${strokeWidth * 2} ${strokeWidth * 2}`
    })[shape.props.dash];
}
;
 //# sourceMappingURL=getPath.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/toolStates/Drawing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Drawing",
    ()=>Drawing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Mat.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)");
;
;
class Drawing extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "drawing";
    info = {};
    initialShape;
    shapeType = this.parent.id === "highlight" ? "highlight" : "draw";
    util = this.editor.getShapeUtil(this.shapeType);
    isPen = false;
    isPenOrStylus = false;
    segmentMode = "free";
    didJustShiftClickToExtendPreviousShapeLine = false;
    pagePointWhereCurrentSegmentChanged = {};
    pagePointWhereNextSegmentChanged = null;
    lastRecordedPoint = {};
    mergeNextPoint = false;
    currentLineLength = 0;
    // Cache for current segment's points to avoid repeated b64 decode/encode
    currentSegmentPoints = [];
    markId = null;
    onEnter(info) {
        this.markId = null;
        this.info = info;
        this.lastRecordedPoint = this.editor.inputs.getCurrentPagePoint().clone();
        this.startShape();
    }
    onPointerMove() {
        const { inputs } = this.editor;
        const isPen = inputs.getIsPen();
        if (this.isPen && !isPen) {
            if (this.markId) {
                this.editor.bailToMark(this.markId);
                this.startShape();
                return;
            }
        }
        if (this.isPenOrStylus) {
            const currentPagePoint = inputs.getCurrentPagePoint();
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(currentPagePoint, this.lastRecordedPoint) >= 1 / this.editor.getZoomLevel()) {
                this.lastRecordedPoint = currentPagePoint.clone();
                this.mergeNextPoint = false;
            } else {
                this.mergeNextPoint = true;
            }
        } else {
            this.mergeNextPoint = false;
        }
        this.updateDrawingShape();
    }
    onKeyDown(info) {
        if (info.key === "Shift") {
            switch(this.segmentMode){
                case "free":
                    {
                        this.segmentMode = "starting_straight";
                        this.pagePointWhereNextSegmentChanged = this.editor.inputs.getCurrentPagePoint().clone();
                        break;
                    }
                case "starting_free":
                    {
                        this.segmentMode = "starting_straight";
                    }
            }
        }
        this.updateDrawingShape();
    }
    onKeyUp(info) {
        if (info.key === "Shift") {
            this.editor.snaps.clearIndicators();
            switch(this.segmentMode){
                case "straight":
                    {
                        this.segmentMode = "starting_free";
                        this.pagePointWhereNextSegmentChanged = this.editor.inputs.getCurrentPagePoint().clone();
                        break;
                    }
                case "starting_straight":
                    {
                        this.pagePointWhereNextSegmentChanged = null;
                        this.segmentMode = "free";
                        break;
                    }
            }
        }
        this.updateDrawingShape();
    }
    onExit() {
        this.editor.snaps.clearIndicators();
        this.pagePointWhereCurrentSegmentChanged = this.editor.inputs.getCurrentPagePoint().clone();
    }
    canClose() {
        return this.shapeType !== "highlight";
    }
    getIsClosed(segments, size, scale) {
        if (!this.canClose()) return false;
        const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][size];
        const firstPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeFirstPoint(segments[0].path);
        const lastSegment = segments[segments.length - 1];
        const lastPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeLastPoint(lastSegment.path);
        return firstPoint !== null && lastPoint !== null && firstPoint !== lastPoint && this.currentLineLength > strokeWidth * 4 * scale && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].DistMin(firstPoint, lastPoint, strokeWidth * 2 * scale);
    }
    startShape() {
        const inputs = this.editor.inputs;
        const originPagePoint = inputs.getOriginPagePoint();
        const isPen = inputs.getIsPen();
        this.markId = this.editor.markHistoryStoppingPoint("draw start");
        const { z = 0.5 } = this.info.point;
        this.isPen = isPen;
        this.isPenOrStylus = isPen || z > 0 && z < 0.5 || z > 0.5 && z < 1;
        const pressure = this.isPenOrStylus ? z * 1.25 : 0.5;
        this.segmentMode = this.editor.inputs.getShiftKey() ? "straight" : "free";
        this.didJustShiftClickToExtendPreviousShapeLine = false;
        this.lastRecordedPoint = originPagePoint.clone();
        if (this.initialShape) {
            const shape2 = this.editor.getShape(this.initialShape.id);
            if (shape2 && this.segmentMode === "straight") {
                this.didJustShiftClickToExtendPreviousShapeLine = true;
                const prevSegment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(shape2.props.segments);
                if (!prevSegment) throw Error("Expected a previous segment!");
                const prevPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeLastPoint(prevSegment.path);
                if (!prevPoint) throw Error("Expected a previous point!");
                const { x, y } = this.editor.getPointInShapeSpace(shape2, originPagePoint).toFixed();
                const newSegment = {
                    type: this.segmentMode,
                    path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints([
                        {
                            x: prevPoint.x,
                            y: prevPoint.y,
                            z: +pressure.toFixed(2)
                        },
                        {
                            x,
                            y,
                            z: +pressure.toFixed(2)
                        }
                    ])
                };
                const prevPointPageSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(this.editor.getShapePageTransform(shape2.id), prevPoint);
                this.pagePointWhereCurrentSegmentChanged = prevPointPageSpace;
                this.pagePointWhereNextSegmentChanged = null;
                const segments = [
                    ...shape2.props.segments,
                    newSegment
                ];
                if (this.currentLineLength < __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape2.props.size] * 4) {
                    this.currentLineLength = this.getLineLength(segments);
                }
                const shapePartial = {
                    id: shape2.id,
                    type: this.shapeType,
                    props: {
                        segments
                    }
                };
                if (this.canClose()) {
                    ;
                    shapePartial.props.isClosed = this.getIsClosed(segments, shape2.props.size, shape2.props.scale);
                }
                this.editor.updateShapes([
                    shapePartial
                ]);
                return;
            }
        }
        this.pagePointWhereCurrentSegmentChanged = originPagePoint.clone();
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
        const initialPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, 0, +pressure.toFixed(2));
        this.currentSegmentPoints = [
            initialPoint
        ];
        this.editor.createShape({
            id,
            type: this.shapeType,
            x: originPagePoint.x,
            y: originPagePoint.y,
            props: {
                isPen: this.isPenOrStylus,
                scale: this.editor.user.getIsDynamicResizeMode() ? 1 / this.editor.getZoomLevel() : 1,
                segments: [
                    {
                        type: this.segmentMode,
                        path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints([
                            initialPoint
                        ])
                    }
                ]
            }
        });
        const shape = this.editor.getShape(id);
        if (!shape) {
            this.cancel();
            return;
        }
        this.currentLineLength = 0;
        this.initialShape = this.editor.getShape(id);
    }
    updateDrawingShape() {
        const { initialShape } = this;
        const { inputs } = this.editor;
        if (!initialShape) return;
        const { id, props: { size, scale } } = initialShape;
        const shape = this.editor.getShape(id);
        if (!shape) return;
        const { segments } = shape.props;
        const currentPagePoint = inputs.getCurrentPagePoint();
        const { x, y, z } = this.editor.getPointInShapeSpace(shape, currentPagePoint).toFixed();
        const pressure = this.isPenOrStylus ? +(currentPagePoint.z * 1.25).toFixed(2) : 0.5;
        const newPoint = {
            x,
            y,
            z: pressure
        };
        switch(this.segmentMode){
            case "starting_straight":
                {
                    const { pagePointWhereNextSegmentChanged } = this;
                    if (pagePointWhereNextSegmentChanged === null) {
                        throw Error("We should have a point where the segment changed");
                    }
                    const hasMovedFarEnough = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(pagePointWhereNextSegmentChanged, inputs.getCurrentPagePoint()) > this.editor.options.dragDistanceSquared;
                    if (hasMovedFarEnough) {
                        this.pagePointWhereCurrentSegmentChanged = this.pagePointWhereNextSegmentChanged.clone();
                        this.pagePointWhereNextSegmentChanged = null;
                        this.segmentMode = "straight";
                        const prevSegment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(segments);
                        if (!prevSegment) throw Error("Expected a previous segment!");
                        const prevLastPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeLastPoint(prevSegment.path);
                        if (!prevLastPoint) throw Error("Expected a previous last point!");
                        let newSegment;
                        const newLastPoint = this.editor.getPointInShapeSpace(shape, this.pagePointWhereCurrentSegmentChanged).toFixed().toJson();
                        if (prevSegment.type === "straight") {
                            this.currentLineLength += __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(prevLastPoint, newLastPoint);
                            newSegment = {
                                type: "straight",
                                path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints([
                                    prevLastPoint,
                                    newLastPoint
                                ])
                            };
                            const transform = this.editor.getShapePageTransform(shape);
                            this.pagePointWhereCurrentSegmentChanged = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(transform, prevLastPoint);
                        } else {
                            newSegment = {
                                type: "straight",
                                path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints([
                                    newLastPoint,
                                    newPoint
                                ])
                            };
                        }
                        const shapePartial = {
                            id,
                            type: this.shapeType,
                            props: {
                                segments: [
                                    ...segments,
                                    newSegment
                                ]
                            }
                        };
                        if (this.canClose()) {
                            ;
                            shapePartial.props.isClosed = this.getIsClosed(segments, size, scale);
                        }
                        this.editor.updateShapes([
                            shapePartial
                        ]);
                    }
                    break;
                }
            case "starting_free":
                {
                    const { pagePointWhereNextSegmentChanged } = this;
                    if (pagePointWhereNextSegmentChanged === null) {
                        throw Error("We should have a point where the segment changed");
                    }
                    const hasMovedFarEnough = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(pagePointWhereNextSegmentChanged, inputs.getCurrentPagePoint()) > this.editor.options.dragDistanceSquared;
                    if (hasMovedFarEnough) {
                        this.pagePointWhereCurrentSegmentChanged = this.pagePointWhereNextSegmentChanged.clone();
                        this.pagePointWhereNextSegmentChanged = null;
                        this.segmentMode = "free";
                        const newSegments = segments.slice();
                        const prevStraightSegment = newSegments[newSegments.length - 1];
                        const prevPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeLastPoint(prevStraightSegment.path);
                        if (!prevPoint) {
                            throw Error("No previous point!");
                        }
                        const interpolatedPoints = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].PointsBetween(prevPoint, newPoint, 6).map((p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toFixed"])(p.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toFixed"])(p.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toFixed"])(p.z)));
                        this.currentSegmentPoints = interpolatedPoints;
                        const newFreeSegment = {
                            type: "free",
                            path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints(interpolatedPoints)
                        };
                        const finalSegments = [
                            ...newSegments,
                            newFreeSegment
                        ];
                        if (this.currentLineLength < __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * 4) {
                            this.currentLineLength = this.getLineLength(finalSegments);
                        }
                        const shapePartial = {
                            id,
                            type: this.shapeType,
                            props: {
                                segments: finalSegments
                            }
                        };
                        if (this.canClose()) {
                            ;
                            shapePartial.props.isClosed = this.getIsClosed(finalSegments, size, scale);
                        }
                        this.editor.updateShapes([
                            shapePartial
                        ]);
                    }
                    break;
                }
            case "straight":
                {
                    const newSegments = segments.slice();
                    const newSegment = newSegments[newSegments.length - 1];
                    const { pagePointWhereCurrentSegmentChanged } = this;
                    const inputs2 = this.editor.inputs;
                    const ctrlKey = inputs2.getCtrlKey();
                    const currentPagePoint2 = inputs2.getCurrentPagePoint();
                    if (!pagePointWhereCurrentSegmentChanged) throw Error("We should have a point where the segment changed");
                    let pagePoint;
                    let shouldSnapToAngle = false;
                    if (this.didJustShiftClickToExtendPreviousShapeLine) {
                        if (this.editor.inputs.getIsDragging()) {
                            shouldSnapToAngle = !ctrlKey;
                            this.didJustShiftClickToExtendPreviousShapeLine = false;
                        } else {}
                    } else {
                        shouldSnapToAngle = !ctrlKey;
                    }
                    let newPoint2 = this.editor.getPointInShapeSpace(shape, currentPagePoint2).toFixed().toJson();
                    let didSnap = false;
                    let snapSegment = void 0;
                    const shouldSnap = this.editor.user.getIsSnapMode() ? !ctrlKey : ctrlKey;
                    if (shouldSnap) {
                        if (newSegments.length > 2) {
                            let nearestPoint = void 0;
                            let minDistance = 8 / this.editor.getZoomLevel();
                            for(let i = 0, n = segments.length - 2; i < n; i++){
                                const segment = segments[i];
                                if (!segment) break;
                                if (segment.type === "free") continue;
                                const first = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeFirstPoint(segment.path);
                                const lastPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeLastPoint(segment.path);
                                if (!(first && lastPoint)) continue;
                                const nearestPointOnSegment = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].NearestPointOnLineSegment(first, lastPoint, newPoint2);
                                if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].DistMin(nearestPointOnSegment, newPoint2, minDistance)) {
                                    nearestPoint = nearestPointOnSegment.toFixed().toJson();
                                    minDistance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(nearestPointOnSegment, newPoint2);
                                    snapSegment = segment;
                                    break;
                                }
                            }
                            if (nearestPoint) {
                                didSnap = true;
                                newPoint2 = nearestPoint;
                            }
                        }
                    }
                    if (didSnap && snapSegment) {
                        const transform = this.editor.getShapePageTransform(shape);
                        const first = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeFirstPoint(snapSegment.path);
                        const lastPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeLastPoint(snapSegment.path);
                        if (!first || !lastPoint) throw Error("Expected a last point!");
                        const A = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(transform, first);
                        const B = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(transform, lastPoint);
                        const snappedPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(transform, newPoint2);
                        this.editor.snaps.setIndicators([
                            {
                                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uniqueId"])(),
                                type: "points",
                                points: [
                                    A,
                                    snappedPoint,
                                    B
                                ]
                            }
                        ]);
                    } else {
                        this.editor.snaps.clearIndicators();
                        if (shouldSnapToAngle) {
                            const currentAngle = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Angle(pagePointWhereCurrentSegmentChanged, currentPagePoint2);
                            const snappedAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapAngle"])(currentAngle, 24);
                            const angleDiff = snappedAngle - currentAngle;
                            pagePoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].RotWith(currentPagePoint2, pagePointWhereCurrentSegmentChanged, angleDiff);
                        } else {
                            pagePoint = currentPagePoint2.clone();
                        }
                        newPoint2 = this.editor.getPointInShapeSpace(shape, pagePoint).toFixed().toJson();
                    }
                    this.currentLineLength += newSegments.length && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeFirstPoint(newSegment.path) ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeFirstPoint(newSegment.path), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(newPoint2)) : 0;
                    newSegments[newSegments.length - 1] = {
                        ...newSegment,
                        type: "straight",
                        path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints([
                            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodeFirstPoint(newSegment.path),
                            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(newPoint2)
                        ])
                    };
                    const shapePartial = {
                        id,
                        type: this.shapeType,
                        props: {
                            segments: newSegments
                        }
                    };
                    if (this.canClose()) {
                        ;
                        shapePartial.props.isClosed = this.getIsClosed(segments, size, scale);
                    }
                    this.editor.updateShapes([
                        shapePartial
                    ]);
                    break;
                }
            case "free":
                {
                    const cachedPoints = this.currentSegmentPoints;
                    if (cachedPoints.length && this.mergeNextPoint) {
                        const lastPoint = cachedPoints[cachedPoints.length - 1];
                        lastPoint.x = newPoint.x;
                        lastPoint.y = newPoint.y;
                        lastPoint.z = lastPoint.z ? Math.max(lastPoint.z, newPoint.z) : newPoint.z;
                    } else {
                        this.currentLineLength += cachedPoints.length ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(cachedPoints[cachedPoints.length - 1], newPoint) : 0;
                        cachedPoints.push(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](newPoint.x, newPoint.y, newPoint.z));
                    }
                    const newSegments = segments.slice();
                    const newSegment = newSegments[newSegments.length - 1];
                    newSegments[newSegments.length - 1] = {
                        ...newSegment,
                        path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints(cachedPoints)
                    };
                    if (this.currentLineLength < __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * 4) {
                        this.currentLineLength = this.getLineLength(newSegments);
                    }
                    const shapePartial = {
                        id,
                        type: this.shapeType,
                        props: {
                            segments: newSegments
                        }
                    };
                    if (this.canClose()) {
                        ;
                        shapePartial.props.isClosed = this.getIsClosed(newSegments, size, scale);
                    }
                    this.editor.updateShapes([
                        shapePartial
                    ]);
                    if (cachedPoints.length > this.util.options.maxPointsPerShape) {
                        this.editor.updateShapes([
                            {
                                id,
                                type: this.shapeType,
                                props: {
                                    isComplete: true
                                }
                            }
                        ]);
                        const newShapeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
                        const props = this.editor.getShape(id).props;
                        if (!this.editor.canCreateShapes([
                            newShapeId
                        ])) return this.cancel();
                        const currentPagePoint2 = inputs.getCurrentPagePoint();
                        const initialPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, 0, this.isPenOrStylus ? +(z * 1.25).toFixed() : 0.5);
                        this.currentSegmentPoints = [
                            initialPoint
                        ];
                        this.editor.createShape({
                            id: newShapeId,
                            type: this.shapeType,
                            x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toFixed"])(currentPagePoint2.x),
                            y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toFixed"])(currentPagePoint2.y),
                            props: {
                                isPen: this.isPenOrStylus,
                                scale: props.scale,
                                segments: [
                                    {
                                        type: "free",
                                        path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints([
                                            initialPoint
                                        ])
                                    }
                                ]
                            }
                        });
                        const shape2 = this.editor.getShape(newShapeId);
                        if (!shape2) {
                            return this.cancel();
                        }
                        this.initialShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["structuredClone"])(shape2);
                        this.mergeNextPoint = false;
                        this.lastRecordedPoint = currentPagePoint2.clone();
                        this.currentLineLength = 0;
                    }
                    break;
                }
        }
    }
    getLineLength(segments) {
        let length = 0;
        for(let j = 0; j < segments.length; j++){
            const points = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodePoints(segments[j].path);
            for(let i = 0; i < points.length - 1; i++){
                length += __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(points[i], points[i + 1]);
            }
        }
        return Math.sqrt(length);
    }
    onPointerUp() {
        this.complete();
    }
    onCancel() {
        this.cancel();
    }
    onComplete() {
        this.complete();
    }
    onInterrupt() {
        if (this.editor.inputs.getIsDragging()) {
            return;
        }
        if (this.markId) {
            this.editor.bailToMark(this.markId);
        }
        this.cancel();
    }
    complete() {
        const { initialShape } = this;
        if (!initialShape) return;
        this.editor.updateShapes([
            {
                id: initialShape.id,
                type: initialShape.type,
                props: {
                    isComplete: true
                }
            }
        ]);
        this.parent.transition("idle");
    }
    cancel() {
        this.parent.transition("idle", this.info);
    }
}
;
 //# sourceMappingURL=Drawing.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/toolStates/Idle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Idle",
    ()=>Idle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
;
class Idle extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "idle";
    onPointerDown(info) {
        this.parent.transition("drawing", info);
    }
    onEnter() {
        this.editor.setCursor({
            type: "cross",
            rotation: 0
        });
    }
    onCancel() {
        this.editor.setCurrentTool("select");
    }
}
;
 //# sourceMappingURL=Idle.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/DrawShapeTool.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrawShapeTool",
    ()=>DrawShapeTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$toolStates$2f$Drawing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/toolStates/Drawing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/toolStates/Idle.mjs [app-client] (ecmascript)");
;
;
;
class DrawShapeTool extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "draw";
    static initial = "idle";
    static isLockable = false;
    static useCoalescedEvents = true;
    static children() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Idle"],
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$toolStates$2f$Drawing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Drawing"]
        ];
    }
    shapeType = "draw";
    onExit() {
        const drawingState = this.children["drawing"];
        drawingState.initialShape = void 0;
    }
}
;
 //# sourceMappingURL=DrawShapeTool.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/DrawShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrawShapeUtil",
    ()=>DrawShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Circle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Circle2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polygon2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Polygon2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polyline2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Polyline2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/SVGContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/ShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$ShapeFill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/ShapeFill.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/defaultStyleDefs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokePoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/svg.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svgInk$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/svgInk.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$interpolate$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/interpolate-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/getPath.mjs [app-client] (ecmascript)");
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
;
class DrawShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeUtil"] {
    static type = "draw";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawShapeMigrations"];
    options = {
        maxPointsPerShape: 600
    };
    hideResizeHandles(shape) {
        return getIsDot(shape);
    }
    hideRotateHandle(shape) {
        return getIsDot(shape);
    }
    hideSelectionBoundsFg(shape) {
        return getIsDot(shape);
    }
    getDefaultProps() {
        return {
            segments: [],
            color: "black",
            fill: "none",
            dash: "draw",
            size: "m",
            isComplete: false,
            isClosed: false,
            isPen: false,
            scale: 1,
            scaleX: 1,
            scaleY: 1
        };
    }
    getGeometry(shape) {
        const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsFromDrawSegments"])(shape.props.segments, shape.props.scaleX, shape.props.scaleY);
        const sw = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] + 1) * shape.props.scale;
        if (shape.props.segments.length === 1) {
            const box = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"].FromPoints(points);
            if (box.width < sw * 2 && box.height < sw * 2) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Circle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Circle2d"]({
                    x: -sw,
                    y: -sw,
                    radius: sw,
                    isFilled: true
                });
            }
        }
        const strokePoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(points, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreehandOptions"])(shape.props, sw, shape.props.isPen, true)).map((p)=>p.point);
        if (shape.props.isClosed && strokePoints.length > 2) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polygon2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Polygon2d"]({
                points: strokePoints,
                isFilled: shape.props.fill !== "none"
            });
        }
        if (strokePoints.length === 1) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Circle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Circle2d"]({
                x: -sw,
                y: -sw,
                radius: sw,
                isFilled: true
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polyline2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Polyline2d"]({
            points: strokePoints
        });
    }
    component(shape) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SVGContainer"], {
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DrawShapeSvg, {
                shape
            })
        });
    }
    indicator(shape) {
        const allPointsFromSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsFromDrawSegments"])(shape.props.segments, shape.props.scaleX, shape.props.scaleY);
        let sw = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] + 1) * shape.props.scale;
        const forceSolid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("force solid", {
            "useValue[forceSolid]": ()=>{
                const zoomLevel = this.editor.getEfficientZoomLevel();
                return zoomLevel < 0.5 && zoomLevel < 1.5 / sw;
            }
        }["useValue[forceSolid]"], [
            this.editor,
            sw
        ]);
        if (!forceSolid && !shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
            sw += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rng"])(shape.id)() * (sw / 6);
        }
        const showAsComplete = shape.props.isComplete || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(shape.props.segments)?.type === "straight";
        const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreehandOptions"])(shape.props, sw, showAsComplete, true);
        const strokePoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(allPointsFromSegments, options);
        const solidStrokePath = strokePoints.length > 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSvgPathFromStrokePoints"])(strokePoints, shape.props.isClosed) : getDot(allPointsFromSegments[0], sw);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: solidStrokePath
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const allPointsFromSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsFromDrawSegments"])(shape.props.segments, shape.props.scaleX, shape.props.scaleY);
        let sw = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] + 1) * shape.props.scale;
        const zoomLevel = this.editor.getEfficientZoomLevel();
        const forceSolid = zoomLevel < 0.5 && zoomLevel < 1.5 / sw;
        if (!forceSolid && !shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
            sw += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rng"])(shape.id)() * (sw / 6);
        }
        const showAsComplete = shape.props.isComplete || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(shape.props.segments)?.type === "straight";
        const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreehandOptions"])(shape.props, sw, showAsComplete, true);
        const strokePoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(allPointsFromSegments, options);
        const solidStrokePath = strokePoints.length > 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSvgPathFromStrokePoints"])(strokePoints, shape.props.isClosed) : getDot(allPointsFromSegments[0], sw);
        return new Path2D(solidStrokePath);
    }
    toSvg(shape, ctx) {
        ctx.addExportDef((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFillDefForExport"])(shape.props.fill));
        const scaleFactor = 1 / shape.props.scale;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            transform: `scale(${scaleFactor})`,
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DrawShapeSvg, {
                shape,
                zoomOverride: 1
            })
        });
    }
    getCanvasSvgDefs() {
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFillDefForCanvas"])()
        ];
    }
    onResize(shape, info) {
        const { scaleX, scaleY } = info;
        return {
            props: {
                scaleX: scaleX * shape.props.scaleX,
                scaleY: scaleY * shape.props.scaleY
            }
        };
    }
    expandSelectionOutlinePx(shape) {
        const multiplier = shape.props.dash === "draw" ? 1.6 : 1;
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * multiplier / 2 * shape.props.scale;
    }
    getInterpolatedProps(startShape, endShape, t) {
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            segments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$interpolate$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interpolateSegments"])(startShape.props.segments, endShape.props.segments, t),
            scale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.scale, endShape.props.scale, t)
        };
    }
}
function getDot(point, sw) {
    const r = (sw + 1) * 0.5;
    return `M ${point.x} ${point.y} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
}
function getIsDot(shape) {
    return shape.props.segments.length === 1 && shape.props.segments[0].path.length < 24;
}
function DrawShapeSvg({ shape, zoomOverride }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const allPointsFromSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsFromDrawSegments"])(shape.props.segments, shape.props.scaleX, shape.props.scaleY);
    const showAsComplete = shape.props.isComplete || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(shape.props.segments)?.type === "straight";
    let sw = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] + 1) * shape.props.scale;
    const forceSolid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("force solid", {
        "DrawShapeSvg.useValue[forceSolid]": ()=>{
            const zoomLevel = zoomOverride ?? editor.getEfficientZoomLevel();
            return zoomLevel < 0.5 && zoomLevel < 1.5 / sw;
        }
    }["DrawShapeSvg.useValue[forceSolid]"], [
        editor,
        sw,
        zoomOverride
    ]);
    const dotAdjustment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("dot adjustment", {
        "DrawShapeSvg.useValue[dotAdjustment]": ()=>{
            const zoomLevel = zoomOverride ?? editor.getEfficientZoomLevel();
            return zoomLevel < 0.2 ? 9 : 0.1;
        }
    }["DrawShapeSvg.useValue[dotAdjustment]"], [
        editor,
        zoomOverride
    ]);
    if (!forceSolid && !shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
        sw += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rng"])(shape.id)() * (sw / 6);
    }
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreehandOptions"])(shape.props, sw, showAsComplete, forceSolid);
    if (!forceSolid && shape.props.dash === "draw") {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                shape.props.isClosed && shape.props.fill && allPointsFromSegments.length > 1 ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$ShapeFill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeFill"], {
                    d: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSvgPathFromStrokePoints"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(allPointsFromSegments, options), shape.props.isClosed),
                    theme,
                    color: shape.props.color,
                    fill: shape.props.isClosed ? shape.props.fill : "none",
                    scale: shape.props.scale
                }) : null,
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svgInk$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgInk"])(allPointsFromSegments, options),
                    strokeLinecap: "round",
                    fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.color, "solid")
                })
            ]
        });
    }
    const strokePoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(allPointsFromSegments, options);
    const isDot = strokePoints.length < 2;
    const solidStrokePath = isDot ? getDot(allPointsFromSegments[0], 0) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSvgPathFromStrokePoints"])(strokePoints, shape.props.isClosed);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$ShapeFill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeFill"], {
                d: solidStrokePath,
                theme,
                color: shape.props.color,
                fill: isDot || shape.props.isClosed ? shape.props.fill : "none",
                scale: shape.props.scale
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: solidStrokePath,
                strokeLinecap: "round",
                fill: isDot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.color, "solid") : "none",
                stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.color, "solid"),
                strokeWidth: sw,
                strokeDasharray: isDot ? "none" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDrawShapeStrokeDashArray"])(shape, sw, dotAdjustment),
                strokeDashoffset: "0"
            })
        ]
    });
}
;
 //# sourceMappingURL=DrawShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/bookmark/bookmarks.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOOKMARK_HEIGHT",
    ()=>BOOKMARK_HEIGHT,
    "BOOKMARK_JUST_URL_HEIGHT",
    ()=>BOOKMARK_JUST_URL_HEIGHT,
    "BOOKMARK_WIDTH",
    ()=>BOOKMARK_WIDTH,
    "createBookmarkFromUrl",
    ()=>createBookmarkFromUrl,
    "getBookmarkHeight",
    ()=>getBookmarkHeight,
    "getHumanReadableAddress",
    ()=>getHumanReadableAddress,
    "setBookmarkHeight",
    ()=>setBookmarkHeight,
    "updateBookmarkAssetOnUrlChange",
    ()=>updateBookmarkAssetOnUrlChange
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
;
const BOOKMARK_WIDTH = 300;
const BOOKMARK_HEIGHT = 320;
const BOOKMARK_JUST_URL_HEIGHT = 46;
const SHORT_BOOKMARK_HEIGHT = 101;
function getBookmarkHeight(editor, assetId) {
    const asset = assetId ? editor.getAsset(assetId) : null;
    if (asset) {
        if (!asset.props.image) {
            if (!asset.props.title) {
                return BOOKMARK_JUST_URL_HEIGHT;
            } else {
                return SHORT_BOOKMARK_HEIGHT;
            }
        }
    }
    return BOOKMARK_HEIGHT;
}
function setBookmarkHeight(editor, shape) {
    return {
        ...shape,
        props: {
            ...shape.props,
            h: getBookmarkHeight(editor, shape.props.assetId)
        }
    };
}
const getHumanReadableAddress = (url)=>{
    try {
        const objUrl = new URL(url);
        return objUrl.hostname.replace(/^www\./, "");
    } catch  {
        return url;
    }
};
function updateBookmarkAssetOnUrlChange(editor, shape) {
    const { url } = shape.props;
    const assetId = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetRecordType"].createId((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHashForString"])(url));
    if (editor.getAsset(assetId)) {
        if (shape.props.assetId !== assetId) {
            editor.updateShapes([
                {
                    id: shape.id,
                    type: shape.type,
                    props: {
                        assetId
                    }
                }
            ]);
        }
    } else {
        editor.updateShapes([
            {
                id: shape.id,
                type: shape.type,
                props: {
                    assetId: null
                }
            }
        ]);
        createBookmarkAssetOnUrlChange(editor, shape);
    }
}
const createBookmarkAssetOnUrlChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debounce"])(async (editor, shape)=>{
    if (editor.isDisposed) return;
    const { url } = shape.props;
    const asset = await editor.getAssetForExternalContent({
        type: "url",
        url
    });
    if (!asset) {
        return;
    }
    editor.run(()=>{
        editor.createAssets([
            asset
        ]);
        editor.updateShapes([
            {
                id: shape.id,
                type: shape.type,
                props: {
                    assetId: asset.id
                }
            }
        ]);
    });
}, 500);
async function createBookmarkFromUrl(editor, { url, center = editor.getViewportPageBounds().center }) {
    try {
        const asset = await editor.getAssetForExternalContent({
            type: "url",
            url
        });
        const shapeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
        const shapePartial = {
            id: shapeId,
            type: "bookmark",
            x: center.x - BOOKMARK_WIDTH / 2,
            y: center.y - BOOKMARK_HEIGHT / 2,
            rotation: 0,
            opacity: 1,
            props: {
                url,
                assetId: asset?.id || null,
                w: BOOKMARK_WIDTH,
                h: getBookmarkHeight(editor, asset?.id)
            }
        };
        editor.run(()=>{
            if (asset) {
                editor.createAssets([
                    asset
                ]);
            }
            editor.createShapes([
                shapePartial
            ]);
        });
        const createdShape = editor.getShape(shapeId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Result"].ok(createdShape);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Result"].err(error instanceof Error ? error.message : "Failed to create bookmark");
    }
}
;
 //# sourceMappingURL=bookmarks.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/bookmark/BookmarkShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookmarkIndicatorComponent",
    ()=>BookmarkIndicatorComponent,
    "BookmarkShapeComponent",
    ()=>BookmarkShapeComponent,
    "BookmarkShapeUtil",
    ()=>BookmarkShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/BaseBoxShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/HTMLContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/validate/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$environment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/globals/environment.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/types/SvgExportContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/text.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/HyperlinkButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$icons$2d$editor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/icons-editor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$rotated$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/rotated-box-shadow.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/bookmark/bookmarks.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
class BookmarkShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseBoxShapeUtil"] {
    static type = "bookmark";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookmarkShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookmarkShapeMigrations"];
    canResize() {
        return false;
    }
    hideSelectionBoundsFg() {
        return true;
    }
    getText(shape) {
        return shape.props.url;
    }
    getAriaDescriptor(shape) {
        const asset = shape.props.assetId ? this.editor.getAsset(shape.props.assetId) : null;
        if (!asset?.props.title) return void 0;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertCommonTitleHTMLEntities"])(asset.props.title) + (asset.props.description ? ", " + asset.props.description : "");
    }
    getDefaultProps() {
        return {
            url: "",
            w: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMARK_WIDTH"],
            h: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMARK_HEIGHT"],
            assetId: null
        };
    }
    component(shape) {
        const { assetId, url, h } = shape.props;
        const rotation = this.editor.getShapePageTransform(shape).rotation();
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(BookmarkShapeComponent, {
            assetId,
            url,
            h,
            rotation
        });
    }
    indicator(shape) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(BookmarkIndicatorComponent, {
            w: shape.props.w,
            h: shape.props.h
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const path = new Path2D();
        path.roundRect(0, 0, shape.props.w, shape.props.h, 6);
        return path;
    }
    onBeforeCreate(next) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBookmarkHeight"])(this.editor, next);
    }
    onBeforeUpdate(prev, shape) {
        if (prev.props.url !== shape.props.url) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$validate$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["T"].linkUrl.isValid(shape.props.url)) {
                return {
                    ...shape,
                    props: {
                        ...shape.props,
                        url: prev.props.url
                    }
                };
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateBookmarkAssetOnUrlChange"])(this.editor, shape);
            }
        }
        if (prev.props.assetId !== shape.props.assetId) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBookmarkHeight"])(this.editor, shape);
        }
    }
    getInterpolatedProps(startShape, endShape, t) {
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            w: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.w, endShape.props.w, t),
            h: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.h, endShape.props.h, t)
        };
    }
}
function BookmarkIndicatorComponent({ w, h }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
        width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(w),
        height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(h),
        rx: "6",
        ry: "6"
    });
}
function BookmarkShapeComponent({ assetId, rotation, url, h, showImageContainer = true }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const asset = assetId ? editor.getAsset(assetId) : null;
    const isSafariExport = !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSvgExportContext"])() && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$environment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tlenv"].isSafari;
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHumanReadableAddress"])(url);
    const [isFaviconValid, setIsFaviconValid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const onFaviconError = ()=>setIsFaviconValid(false);
    const markAsHandledOnShiftKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookmarkShapeComponent.useCallback[markAsHandledOnShiftKey]": (e)=>{
            if (!editor.inputs.getShiftKey()) editor.markEventAsHandled(e);
        }
    }["BookmarkShapeComponent.useCallback[markAsHandledOnShiftKey]"], [
        editor
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLContainer"], {
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tl-bookmark__container", isSafariExport && "tl-bookmark__container--safariExport"),
            style: {
                boxShadow: isSafariExport ? void 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$rotated$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRotatedBoxShadow"])(rotation),
                maxHeight: h
            },
            children: [
                showImageContainer && (!asset || asset.props.image) && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: "tl-bookmark__image_container",
                    children: [
                        asset ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("img", {
                            className: "tl-bookmark__image",
                            draggable: false,
                            referrerPolicy: "strict-origin-when-cross-origin",
                            src: asset?.props.image,
                            alt: asset?.props.title || ""
                        }) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            className: "tl-bookmark__placeholder"
                        }),
                        asset?.props.image && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HyperlinkButton"], {
                            url
                        })
                    ]
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    className: "tl-bookmark__copy_container",
                    children: [
                        asset?.props.title ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
                            className: "tl-bookmark__link",
                            href: url || "",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            draggable: false,
                            onPointerDown: markAsHandledOnShiftKey,
                            onPointerUp: markAsHandledOnShiftKey,
                            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h2", {
                                className: "tl-bookmark__heading",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertCommonTitleHTMLEntities"])(asset.props.title)
                            })
                        }) : null,
                        asset?.props.description && asset?.props.image ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                            className: "tl-bookmark__description",
                            children: asset.props.description
                        }) : null,
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("a", {
                            className: "tl-bookmark__link",
                            href: url || "",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            draggable: false,
                            onPointerDown: markAsHandledOnShiftKey,
                            onPointerUp: markAsHandledOnShiftKey,
                            children: [
                                isFaviconValid && asset?.props.favicon ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("img", {
                                    className: "tl-bookmark__favicon",
                                    src: asset?.props.favicon,
                                    referrerPolicy: "strict-origin-when-cross-origin",
                                    onError: onFaviconError,
                                    alt: `favicon of ${address}`
                                }) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    className: "tl-hyperlink__icon",
                                    style: {
                                        mask: `url("${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$icons$2d$editor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LINK_ICON"]}") center 100% / 100% no-repeat`,
                                        WebkitMask: `url("${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$icons$2d$editor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LINK_ICON"]}") center 100% / 100% no-repeat`
                                    }
                                }),
                                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    children: address
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
;
 //# sourceMappingURL=BookmarkShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/FrameShapeTool.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FrameShapeTool",
    ()=>FrameShapeTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$BaseBoxShapeTool$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/BaseBoxShapeTool/BaseBoxShapeTool.mjs [app-client] (ecmascript)");
;
class FrameShapeTool extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$BaseBoxShapeTool$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseBoxShapeTool"] {
    static id = "frame";
    static initial = "idle";
    shapeType = "frame";
    onCreate(shape) {
        if (!shape) return;
        const bounds = this.editor.getShapePageBounds(shape);
        const shapesToAddToFrame = [];
        const ancestorIds = this.editor.getShapeAncestors(shape).map((shape2)=>shape2.id);
        this.editor.getSortedChildIdsForParent(shape.parentId).map((siblingShapeId)=>{
            const siblingShape = this.editor.getShape(siblingShapeId);
            if (!siblingShape) return;
            if (siblingShape.id === shape.id) return;
            if (siblingShape.isLocked) return;
            const pageShapeBounds = this.editor.getShapePageBounds(siblingShape);
            if (!pageShapeBounds) return;
            if (bounds.contains(pageShapeBounds)) {
                if (canEnclose(siblingShape, ancestorIds, shape)) {
                    shapesToAddToFrame.push(siblingShape.id);
                }
            }
        });
        this.editor.reparentShapes(shapesToAddToFrame, shape.id);
        if (this.editor.getInstanceState().isToolLocked) {
            this.editor.setCurrentTool("frame");
        } else {
            this.editor.setCurrentTool("select.idle");
        }
    }
}
function canEnclose(shape, ancestorIds, frame) {
    if (ancestorIds.includes(shape.id)) {
        return false;
    }
    if (shape.parentId === frame.parentId) {
        return true;
    }
    return false;
}
;
 //# sourceMappingURL=FrameShapeTool.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/frameHelpers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFrameHeadingOpts",
    ()=>getFrameHeadingOpts,
    "getFrameHeadingSide",
    ()=>getFrameHeadingSide,
    "getFrameHeadingSize",
    ()=>getFrameHeadingSize,
    "getFrameHeadingTranslation",
    ()=>getFrameHeadingTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$FrameShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/FrameShapeUtil.mjs [app-client] (ecmascript)");
;
;
function getFrameHeadingSide(editor, shape) {
    const pageRotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canonicalizeRotation"])(editor.getShapePageTransform(shape.id).rotation());
    const offsetRotation = pageRotation + Math.PI / 4;
    const scaledRotation = (offsetRotation * (2 / Math.PI) + 4) % 4;
    return Math.floor(scaledRotation);
}
const measurementWeakmap = /* @__PURE__ */ new WeakMap();
function getFrameHeadingSize(editor, shape, opts) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let width = measurementWeakmap.get(shape.props);
    if (!width) {
        const frameTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$FrameShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultEmptyAs"])(shape.props.name, "Frame") + String.fromCharCode(8203);
        const spans = editor.textMeasure.measureTextSpans(frameTitle, opts);
        const firstSpan = spans[0];
        const lastSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(spans);
        width = lastSpan.box.w + lastSpan.box.x - firstSpan.box.x;
        measurementWeakmap.set(shape.props, width);
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"](0, -opts.height, width, opts.height);
}
function getFrameHeadingOpts(width, isSvg) {
    return {
        fontSize: 12,
        fontFamily: isSvg ? "Arial" : "Inter, sans-serif",
        textAlign: "start",
        width,
        height: 24,
        // --frame-height
        padding: 0,
        lineHeight: 1,
        fontStyle: "normal",
        fontWeight: "normal",
        overflow: "truncate-ellipsis",
        verticalTextAlign: "middle",
        offsetY: -(32 + 2),
        // --frame-minimum-height + (border width * 2)
        offsetX: 0
    };
}
function getFrameHeadingTranslation(shape, side, isSvg) {
    const u = isSvg ? "" : "px";
    const r = isSvg ? "" : "deg";
    let labelTranslate;
    switch(side){
        case 0:
            labelTranslate = ``;
            break;
        case 3:
            labelTranslate = `translate(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.w)}${u}, 0${u}) rotate(90${r})`;
            break;
        case 2:
            labelTranslate = `translate(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.w)}${u}, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.h)}${u}) rotate(180${r})`;
            break;
        case 1:
            labelTranslate = `translate(0${u}, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.h)}${u}) rotate(270${r})`;
            break;
        default:
            throw Error("labelSide out of bounds");
    }
    return labelTranslate;
}
;
 //# sourceMappingURL=frameHelpers.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/components/FrameLabelInput.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FrameLabelInput",
    ()=>FrameLabelInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$context$2f$breakpoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/context/breakpoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/hooks/useTranslation/useTranslation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$FrameShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/FrameShapeUtil.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const FrameLabelInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ id, name, isEditing }, ref)=>{
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const breakpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$context$2f$breakpoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBreakpoint"])();
    const isCoarsePointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("isCoarsePointer", {
        "FrameLabelInput.useValue[isCoarsePointer]": ()=>editor.getInstanceState().isCoarsePointer
    }["FrameLabelInput.useValue[isCoarsePointer]"], [
        editor
    ]);
    const shouldUseWindowPrompt = breakpoint < __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PORTRAIT_BREAKPOINT"].TABLET_SM && isCoarsePointer;
    const promptOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FrameLabelInput.useCallback[handlePointerDown]": (e)=>{
            if (isEditing) editor.markEventAsHandled(e);
        }
    }["FrameLabelInput.useCallback[handlePointerDown]"], [
        editor,
        isEditing
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FrameLabelInput.useCallback[handleKeyDown]": (e)=>{
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                editor.markEventAsHandled(e);
                e.currentTarget.blur();
                editor.setEditingShape(null);
            }
        }
    }["FrameLabelInput.useCallback[handleKeyDown]"], [
        editor
    ]);
    const renameFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FrameLabelInput.useCallback[renameFrame]": (value)=>{
            const shape = editor.getShape(id);
            if (!shape) return;
            const name2 = shape.props.name;
            if (name2 === value) return;
            editor.updateShapes([
                {
                    id,
                    type: "frame",
                    props: {
                        name: value
                    }
                }
            ]);
        }
    }["FrameLabelInput.useCallback[renameFrame]"], [
        id,
        editor
    ]);
    const handleBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FrameLabelInput.useCallback[handleBlur]": (e)=>{
            renameFrame(e.currentTarget.value);
        }
    }["FrameLabelInput.useCallback[handleBlur]"], [
        renameFrame
    ]);
    const handleChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FrameLabelInput.useCallback[handleChange]": (e)=>{
            renameFrame(e.currentTarget.value);
        }
    }["FrameLabelInput.useCallback[handleChange]"], [
        renameFrame
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FrameLabelInput.useEffect": ()=>{
            if (!isEditing) {
                promptOpen.current = false;
                return;
            }
            if (isEditing && shouldUseWindowPrompt && !promptOpen.current) {
                promptOpen.current = true;
                const shape = editor.getShape(id);
                const currentName = shape?.props.name ?? "";
                const newName = window.prompt(msg("action.rename"), currentName);
                promptOpen.current = false;
                if (newName !== null) renameFrame(newName);
                editor.setEditingShape(null);
            }
        }
    }["FrameLabelInput.useEffect"], [
        isEditing,
        shouldUseWindowPrompt,
        id,
        msg,
        renameFrame,
        editor
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: `tl-frame-label ${isEditing && !shouldUseWindowPrompt ? "tl-frame-label__editing" : ""}`,
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("input", {
                className: "tl-frame-name-input",
                ref,
                disabled: !isEditing || shouldUseWindowPrompt,
                readOnly: !isEditing || shouldUseWindowPrompt,
                style: {
                    display: isEditing ? void 0 : "none"
                },
                value: name,
                autoFocus: !shouldUseWindowPrompt,
                onKeyDown: handleKeyDown,
                onBlur: handleBlur,
                onChange: handleChange,
                onPointerDown: handlePointerDown,
                draggable: false
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$FrameShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultEmptyAs"])(name, "Frame") + String.fromCharCode(8203)
        ]
    });
});
;
 //# sourceMappingURL=FrameLabelInput.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/components/FrameHeading.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FrameHeading",
    ()=>FrameHeading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useIsEditing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/frameHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$components$2f$FrameLabelInput$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/components/FrameLabelInput.mjs [app-client] (ecmascript)");
;
;
;
;
;
const FrameHeading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function FrameHeading2({ id, name, width, height, fill, stroke, color, offsetX, showColors }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const { side, translation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("shape rotation", {
        "FrameHeading.FrameHeading2.useValue": ()=>{
            const shape = editor.getShape(id);
            if (!shape) {
                return {
                    side: 0,
                    translation: "translate(0, 0)"
                };
            }
            const labelSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingSide"])(editor, shape);
            return {
                side: labelSide,
                translation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingTranslation"])(shape, labelSide, false)
            };
        }
    }["FrameHeading.FrameHeading2.useValue"], [
        editor,
        offsetX,
        id
    ]);
    const rInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsEditing"])(id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FrameHeading.FrameHeading2.useEffect": ()=>{
            const el = rInput.current;
            if (el && isEditing) {
                el.focus();
                el.select();
            }
        }
    }["FrameHeading.FrameHeading2.useEffect"], [
        rInput,
        isEditing
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: "tl-frame-heading",
        style: {
            overflow: isEditing ? "visible" : "hidden",
            maxWidth: `calc(var(--tl-zoom) * ${side === 0 || side === 2 ? Math.ceil(width) : Math.ceil(height)}px + ${showColors ? "0px" : "var(--tl-frame-offset-width)"})`,
            bottom: "100%",
            transform: `${translation} scale(min(var(--tl-scale), 3.5)) translateX(${offsetX}px)`
        },
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: "tl-frame-heading-hit-area",
            style: {
                color,
                backgroundColor: fill,
                boxShadow: `inset 0px 0px 0px 1px ${stroke}`
            },
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$components$2f$FrameLabelInput$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FrameLabelInput"], {
                ref: rInput,
                id,
                name,
                isEditing
            })
        })
    });
});
;
 //# sourceMappingURL=FrameHeading.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/FrameShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FrameShapeUtil",
    ()=>FrameShapeUtil,
    "defaultEmptyAs",
    ()=>defaultEmptyAs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/BaseBoxShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Group2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Rectangle2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/SVGContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeBox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/shared/resizeBox.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$frames$2f$frames$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/frames/frames.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$createTextJsxFromSpans$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/createTextJsxFromSpans.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$components$2f$FrameHeading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/components/FrameHeading.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/frame/frameHelpers.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const FRAME_HEADING_EXTRA_WIDTH = 12;
const FRAME_HEADING_MIN_WIDTH = 32;
const FRAME_HEADING_NOCOLORS_OFFSET_X = -7;
const FRAME_HEADING_OFFSET_Y = 4;
function defaultEmptyAs(str, dflt) {
    if (str.match(/^\s*$/)) {
        return dflt;
    }
    return str;
}
class FrameShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseBoxShapeUtil"] {
    static type = "frame";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameShapeMigrations"];
    options = {
        showColors: false,
        resizeChildren: false
    };
    // evil crimes :)
    // By default, showColors is off. Because they use style props, which are picked up
    // automatically, we don't have DefaultColorStyle in the props in the schema by default.
    // Instead, when someone calls .configure to turn the option on, we manually add in the color
    // style here so it plays nicely with the other editor APIs.
    static configure(options) {
        const withOptions = super.configure.call(this, options);
        if (options.showColors) {
            ;
            withOptions.props = {
                ...withOptions.props,
                color: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultColorStyle"]
            };
        }
        return withOptions;
    }
    canEdit(shape, info) {
        return info.type === "click-header" || info.type === "unknown";
    }
    canResize() {
        return true;
    }
    canResizeChildren() {
        return this.options.resizeChildren;
    }
    isExportBoundsContainer() {
        return true;
    }
    getDefaultProps() {
        return {
            w: 160 * 2,
            h: 90 * 2,
            name: "",
            color: "black"
        };
    }
    getAriaDescriptor(shape) {
        return shape.props.name;
    }
    getGeometry(shape) {
        const { editor } = this;
        const z = editor.getEfficientZoomLevel();
        const labelSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingSide"])(editor, shape);
        const isVertical = labelSide % 2 === 1;
        const rotatedTopEdgeWidth = isVertical ? shape.props.h : shape.props.w;
        const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingOpts"])(rotatedTopEdgeWidth, false);
        const headingSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingSize"])(editor, shape, opts);
        const isShowingFrameColors = this.options.showColors;
        const extraWidth = FRAME_HEADING_EXTRA_WIDTH / z;
        const minWidth = FRAME_HEADING_MIN_WIDTH / z;
        const maxWidth = rotatedTopEdgeWidth + (isShowingFrameColors ? 1 : extraWidth);
        const labelWidth = headingSize.w / z;
        const labelHeight = headingSize.h / z;
        const clampedLabelWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(labelWidth + extraWidth, minWidth, maxWidth);
        const offsetX = (isShowingFrameColors ? -1 : FRAME_HEADING_NOCOLORS_OFFSET_X) / z;
        const offsetY = FRAME_HEADING_OFFSET_Y / z;
        const width = isVertical ? labelHeight : clampedLabelWidth;
        const height = isVertical ? clampedLabelWidth : labelHeight;
        let x, y;
        switch(labelSide){
            case 0:
                {
                    x = offsetX;
                    y = -(labelHeight + offsetY);
                    break;
                }
            case 1:
                {
                    x = -(labelHeight + offsetY);
                    y = shape.props.h - (offsetX + clampedLabelWidth);
                    break;
                }
            case 2:
                {
                    x = shape.props.w - (offsetX + clampedLabelWidth);
                    y = shape.props.h + offsetY;
                    break;
                }
            case 3:
                {
                    x = shape.props.w + offsetY;
                    y = offsetX;
                    break;
                }
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group2d"]({
            children: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rectangle2d"]({
                    width: shape.props.w,
                    height: shape.props.h,
                    isFilled: false
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rectangle2d"]({
                    x,
                    y,
                    width,
                    height,
                    isFilled: true,
                    isLabel: true,
                    excludeFromShapeBounds: true
                })
            ]
        });
    }
    getText(shape) {
        return shape.props.name;
    }
    component(shape) {
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
        const isCreating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("is creating this shape", {
            "useValue[isCreating]": ()=>{
                const resizingState = this.editor.getStateDescendant("select.resizing");
                if (!resizingState) return false;
                if (!resizingState.getIsActive()) return false;
                const info = resizingState?.info;
                if (!info) return false;
                return info.isCreating && this.editor.getOnlySelectedShapeId() === shape.id;
            }
        }["useValue[isCreating]"], [
            shape.id
        ]);
        const showFrameColors = this.options.showColors;
        const colorToUse = showFrameColors ? shape.props.color : "black";
        const frameFill = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameFill");
        const frameStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameStroke");
        const frameHeadingStroke = showFrameColors ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameHeadingStroke") : theme.background;
        const frameHeadingFill = showFrameColors ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameHeadingFill") : theme.background;
        const frameHeadingText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameText");
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SVGContainer"], {
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tl-frame__body", {
                            "tl-frame__creating": isCreating
                        }),
                        fill: frameFill,
                        stroke: frameStroke,
                        style: {
                            width: `calc(${shape.props.w}px + 1px / var(--tl-zoom))`,
                            height: `calc(${shape.props.h}px + 1px / var(--tl-zoom))`,
                            transform: `translate(calc(-0.5px / var(--tl-zoom)), calc(-0.5px / var(--tl-zoom)))`
                        }
                    })
                }),
                isCreating ? null : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$components$2f$FrameHeading$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FrameHeading"], {
                    id: shape.id,
                    name: shape.props.name,
                    fill: frameHeadingFill,
                    stroke: frameHeadingStroke,
                    color: frameHeadingText,
                    width: shape.props.w,
                    height: shape.props.h,
                    offsetX: showFrameColors ? -1 : -7,
                    showColors: this.options.showColors
                })
            ]
        });
    }
    toSvg(shape, ctx) {
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultColorTheme"])({
            isDarkMode: ctx.isDarkMode
        });
        const labelSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingSide"])(this.editor, shape);
        const isVertical = labelSide % 2 === 1;
        const rotatedTopEdgeWidth = isVertical ? shape.props.h : shape.props.w;
        const labelTranslate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingTranslation"])(shape, labelSide, true);
        const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingOpts"])(rotatedTopEdgeWidth - 12, true);
        const frameTitle = defaultEmptyAs(shape.props.name, "Frame") + String.fromCharCode(8203);
        const labelBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$frame$2f$frameHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameHeadingSize"])(this.editor, shape, opts);
        const spans = this.editor.textMeasure.measureTextSpans(frameTitle, opts);
        const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$createTextJsxFromSpans$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTextJsxFromSpans"])(this.editor, spans, opts);
        const showFrameColors = this.options.showColors;
        const colorToUse = showFrameColors ? shape.props.color : "black";
        const frameFill = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameFill");
        const frameStroke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameStroke");
        const frameHeadingStroke = showFrameColors ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameHeadingStroke") : theme.background;
        const frameHeadingFill = showFrameColors ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameHeadingFill") : theme.background;
        const frameHeadingText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, colorToUse, "frameText");
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                    width: shape.props.w,
                    height: shape.props.h,
                    fill: frameFill,
                    stroke: frameStroke,
                    strokeWidth: 1,
                    x: 0,
                    rx: 0,
                    ry: 0
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                    fill: frameHeadingText,
                    transform: labelTranslate,
                    children: [
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                            x: labelBounds.x - (showFrameColors ? 0 : 6),
                            y: labelBounds.y - 6,
                            width: Math.min(rotatedTopEdgeWidth, labelBounds.width + 12),
                            height: labelBounds.height,
                            fill: frameHeadingFill,
                            stroke: frameHeadingStroke,
                            rx: 4,
                            ry: 4
                        }),
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                            transform: `translate(${showFrameColors ? 8 : 0}, 4)`,
                            children: text
                        })
                    ]
                })
            ]
        });
    }
    indicator(shape) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.w),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.h)
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const path = new Path2D();
        path.rect(0, 0, shape.props.w, shape.props.h);
        return path;
    }
    providesBackgroundForChildren() {
        return true;
    }
    getClipPath(shape) {
        return this.editor.getShapeGeometry(shape.id).vertices;
    }
    canReceiveNewChildrenOfType(shape) {
        return !shape.isLocked;
    }
    onResize(shape, info) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeBox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resizeBox"])(shape, info);
    }
    getInterpolatedProps(startShape, endShape, t) {
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            w: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.w, endShape.props.w, t),
            h: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.h, endShape.props.h, t)
        };
    }
    onDoubleClickEdge(shape, info) {
        if (info.target !== "selection") return;
        const { handle } = info;
        if (!handle) return;
        const isHorizontalEdge = handle === "left" || handle === "right";
        const isVerticalEdge = handle === "top" || handle === "bottom";
        const childIds = this.editor.getSortedChildIdsForParent(shape.id);
        const children = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(childIds.map((id)=>this.editor.getShape(id)));
        if (!children.length) return;
        const { dx, dy, w, h } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$frames$2f$frames$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrameChildrenBounds"])(children, this.editor, {
            padding: 10
        });
        this.editor.run(()=>{
            const changes = childIds.map((childId)=>{
                const childShape = this.editor.getShape(childId);
                return {
                    id: childShape.id,
                    type: childShape.type,
                    x: isHorizontalEdge ? childShape.x + dx : childShape.x,
                    y: isVerticalEdge ? childShape.y + dy : childShape.y
                };
            });
            this.editor.updateShapes(changes);
        });
        return {
            id: shape.id,
            type: shape.type,
            props: {
                w: isHorizontalEdge ? w : shape.props.w,
                h: isVerticalEdge ? h : shape.props.h
            }
        };
    }
    onDoubleClickCorner(shape) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$frames$2f$frames$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fitFrameToContent"])(this.editor, shape.id, {
            padding: 10
        });
        return {
            id: shape.id,
            type: shape.type
        };
    }
    onDragShapesIn(shape, draggingShapes, { initialParentIds, initialIndices }) {
        const { editor } = this;
        if (draggingShapes.every((s)=>s.parentId === shape.id)) return;
        let canRestoreOriginalIndices = false;
        const previousChildren = draggingShapes.filter((s)=>shape.id === initialParentIds.get(s.id));
        if (previousChildren.length > 0) {
            const currentChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(editor.getSortedChildIdsForParent(shape).map((id)=>editor.getShape(id)));
            if (previousChildren.every((s)=>!currentChildren.find((c)=>c.index === s.index))) {
                canRestoreOriginalIndices = true;
            }
        }
        if (draggingShapes.some((s)=>editor.hasAncestor(shape, s.id))) return;
        editor.reparentShapes(draggingShapes, shape.id);
        if (canRestoreOriginalIndices) {
            for (const shape2 of previousChildren){
                editor.updateShape({
                    id: shape2.id,
                    type: shape2.type,
                    index: initialIndices.get(shape2.id)
                });
            }
        }
    }
    onDragShapesOut(shape, draggingShapes, info) {
        const { editor } = this;
        if (!info.nextDraggingOverShapeId) {
            editor.reparentShapes(draggingShapes.filter((s)=>s.parentId === shape.id && this.canReceiveNewChildrenOfType(s)), editor.getCurrentPageId());
        }
    }
}
;
 //# sourceMappingURL=FrameShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/toolStates/Idle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Idle",
    ()=>Idle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/tools/SelectTool/selectHelpers.mjs [app-client] (ecmascript)");
;
;
class Idle extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "idle";
    onPointerDown(info) {
        this.parent.transition("pointing", info);
    }
    onEnter() {
        this.editor.setCursor({
            type: "cross",
            rotation: 0
        });
    }
    onKeyUp(info) {
        const { editor } = this;
        if (info.key === "Enter") {
            const onlySelectedShape = editor.getOnlySelectedShape();
            if (editor.canEditShape(onlySelectedShape)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startEditingShapeWithRichText"])(editor, onlySelectedShape, {
                    selectAll: true
                });
            }
        }
    }
    onCancel() {
        this.editor.setCurrentTool("select");
    }
}
;
 //# sourceMappingURL=Idle.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/toolStates/Pointing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pointing",
    ()=>Pointing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/BaseBoxShapeTool/children/Pointing.mjs [app-client] (ecmascript)");
;
class Pointing extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "pointing";
    onPointerUp() {
        this.complete();
    }
    onPointerMove(info) {
        if (this.editor.inputs.getIsDragging()) {
            const originPagePoint = this.editor.inputs.getOriginPagePoint();
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
            const creatingMarkId = this.editor.markHistoryStoppingPoint(`creating_geo:${id}`);
            const newPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(originPagePoint, this.editor);
            this.editor.createShapes([
                {
                    id,
                    type: "geo",
                    x: newPoint.x,
                    y: newPoint.y,
                    props: {
                        w: 1,
                        h: 1,
                        geo: this.editor.getStyleForNextShape(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoShapeGeoStyle"]),
                        scale: this.editor.user.getIsDynamicResizeMode() ? 1 / this.editor.getZoomLevel() : 1
                    }
                }
            ]).select(id);
            const shape = this.editor.getShape(id);
            if (!shape) {
                this.cancel();
                return;
            }
            this.editor.setCurrentTool("select.resizing", {
                ...info,
                target: "selection",
                handle: "bottom_right",
                isCreating: true,
                creatingMarkId,
                creationCursorOffset: {
                    x: 1,
                    y: 1
                },
                onInteractionEnd: "geo"
            });
        }
    }
    onCancel() {
        this.cancel();
    }
    onComplete() {
        this.complete();
    }
    onInterrupt() {
        this.cancel();
    }
    complete() {
        const originPagePoint = this.editor.inputs.getOriginPagePoint();
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
        this.editor.markHistoryStoppingPoint(`creating_geo:${id}`);
        const scale = this.editor.user.getIsDynamicResizeMode() ? 1 / this.editor.getZoomLevel() : 1;
        const geo = this.editor.getStyleForNextShape(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoShapeGeoStyle"]);
        const size = geo === "star" ? {
            w: 200,
            h: 190
        } : geo === "cloud" ? {
            w: 300,
            h: 180
        } : {
            w: 200,
            h: 200
        };
        this.editor.createShapes([
            {
                id,
                type: "geo",
                x: originPagePoint.x,
                y: originPagePoint.y,
                props: {
                    geo: this.editor.getStyleForNextShape(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoShapeGeoStyle"]),
                    scale,
                    ...size
                }
            }
        ]);
        const shape = this.editor.getShape(id);
        if (!shape) {
            this.cancel();
            return;
        }
        const { w, h } = shape.props;
        const delta = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](w / 2, h / 2).mul(scale);
        const parentTransform = this.editor.getShapeParentTransform(shape);
        if (parentTransform) delta.rot(-parentTransform.rotation());
        const newPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](shape.x - delta.x, shape.y - delta.y), this.editor);
        this.editor.select(id);
        this.editor.updateShape({
            id: shape.id,
            type: "geo",
            x: newPoint.x,
            y: newPoint.y,
            props: {
                geo: this.editor.getStyleForNextShape(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoShapeGeoStyle"]),
                w: w * scale,
                h: h * scale
            }
        });
        if (this.editor.getInstanceState().isToolLocked) {
            this.parent.transition("idle");
        } else {
            this.editor.setCurrentTool("select", {});
        }
    }
    cancel() {
        this.parent.transition("idle");
    }
}
;
 //# sourceMappingURL=Pointing.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/GeoShapeTool.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeoShapeTool",
    ()=>GeoShapeTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/toolStates/Idle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/toolStates/Pointing.mjs [app-client] (ecmascript)");
;
;
;
class GeoShapeTool extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "geo";
    static initial = "idle";
    static children() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Idle"],
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pointing"]
        ];
    }
    shapeType = "geo";
}
;
 //# sourceMappingURL=GeoShapeTool.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/getGeoShapePath.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGeoShapePath",
    ()=>getGeoShapePath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/PathBuilder.mjs [app-client] (ecmascript)");
;
;
;
const pathCache = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
function getGeoShapePath(shape) {
    return pathCache.get(shape, _getGeoPath);
}
function _getGeoPath(shape) {
    const w = Math.max(1, shape.props.w);
    const h = Math.max(1, shape.props.h + shape.props.growY);
    const cx = w / 2;
    const cy = h / 2;
    const sw = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * shape.props.scale;
    const isFilled = shape.props.fill !== "none";
    switch(shape.props.geo){
        case "arrow-down":
            {
                const ox = w * 0.16;
                const oy = Math.min(w, h) * 0.38;
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(ox, 0, {
                    geometry: {
                        isFilled
                    }
                }).lineTo(w - ox, 0).lineTo(w - ox, h - oy).lineTo(w, h - oy).lineTo(w / 2, h).lineTo(0, h - oy).lineTo(ox, h - oy).close();
            }
        case "arrow-left":
            {
                const ox = Math.min(w, h) * 0.38;
                const oy = h * 0.16;
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(ox, 0, {
                    geometry: {
                        isFilled
                    }
                }).lineTo(ox, oy).lineTo(w, oy).lineTo(w, h - oy).lineTo(ox, h - oy).lineTo(ox, h).lineTo(0, h / 2).close();
            }
        case "arrow-right":
            {
                const ox = Math.min(w, h) * 0.38;
                const oy = h * 0.16;
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(0, oy, {
                    geometry: {
                        isFilled
                    }
                }).lineTo(w - ox, oy).lineTo(w - ox, 0).lineTo(w, h / 2).lineTo(w - ox, h).lineTo(w - ox, h - oy).lineTo(0, h - oy).close();
            }
        case "arrow-up":
            {
                const ox = w * 0.16;
                const oy = Math.min(w, h) * 0.38;
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(w / 2, 0, {
                    geometry: {
                        isFilled
                    }
                }).lineTo(w, oy).lineTo(w - ox, oy).lineTo(w - ox, h).lineTo(ox, h).lineTo(ox, oy).lineTo(0, oy).close();
            }
        case "check-box":
            {
                const size = Math.min(w, h) * 0.82;
                const ox = (w - size) / 2;
                const oy = (h - size) / 2;
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(0, 0, {
                    geometry: {
                        isFilled
                    }
                }).lineTo(w, 0).lineTo(w, h).lineTo(0, h).close().moveTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(ox + size * 0.25, 0, w), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(oy + size * 0.52, 0, h), {
                    geometry: {
                        isInternal: true,
                        isFilled: false
                    },
                    offset: 0
                }).lineTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(ox + size * 0.45, 0, w), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(oy + size * 0.82, 0, h)).lineTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(ox + size * 0.82, 0, w), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(oy + size * 0.22, 0, h), {
                    offset: 0
                });
            }
        case "diamond":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(cx, 0, {
                geometry: {
                    isFilled
                }
            }).lineTo(w, cy).lineTo(cx, h).lineTo(0, cy).close();
        case "ellipse":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(0, cy, {
                geometry: {
                    isFilled
                }
            }).arcTo(cx, cy, false, true, 0, w, cy).arcTo(cx, cy, false, true, 0, 0, cy).close();
        case "heart":
            {
                const o = w / 4;
                const k = h / 4;
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(cx, h, {
                    geometry: {
                        isFilled
                    }
                }).cubicBezierTo(0, k * 1.2, o * 1.5, k * 3, 0, k * 2.5).cubicBezierTo(cx, k * 0.9, 0, -k * 0.32, o * 1.85, -k * 0.32).cubicBezierTo(w, k * 1.2, o * 2.15, -k * 0.32, w, -k * 0.32).cubicBezierTo(cx, h, w, k * 2.5, o * 2.5, k * 3).close();
            }
        case "hexagon":
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"].lineThroughPoints((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPolygonVertices"])(w, h, 6), {
                geometry: {
                    isFilled
                }
            }).close();
        case "octagon":
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"].lineThroughPoints((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPolygonVertices"])(w, h, 8), {
                geometry: {
                    isFilled
                }
            }).close();
        case "oval":
            return getStadiumPath(w, h, isFilled);
        case "pentagon":
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"].lineThroughPoints((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPolygonVertices"])(w, h, 5), {
                geometry: {
                    isFilled
                }
            }).close();
        case "rectangle":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(0, 0, {
                geometry: {
                    isFilled
                }
            }).lineTo(w, 0).lineTo(w, h).lineTo(0, h).close();
        case "rhombus":
            {
                const offset = Math.min(w * 0.38, h * 0.38);
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(offset, 0, {
                    geometry: {
                        isFilled
                    }
                }).lineTo(w, 0).lineTo(w - offset, h).lineTo(0, h).close();
            }
        case "rhombus-2":
            {
                const offset = Math.min(w * 0.38, h * 0.38);
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(0, 0, {
                    geometry: {
                        isFilled
                    }
                }).lineTo(w - offset, 0).lineTo(w, h).lineTo(offset, h).close();
            }
        case "star":
            return getStarPath(w, h, isFilled);
        case "trapezoid":
            {
                const offset = Math.min(w * 0.38, h * 0.38);
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(offset, 0, {
                    geometry: {
                        isFilled
                    }
                }).lineTo(w - offset, 0).lineTo(w, h).lineTo(0, h).close();
            }
        case "triangle":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(cx, 0, {
                geometry: {
                    isFilled
                }
            }).lineTo(w, h).lineTo(0, h).close();
        case "x-box":
            return getXBoxPath(w, h, sw, shape.props.dash, isFilled);
        case "cloud":
            return getCloudPath(w, h, shape.id, shape.props.size, shape.props.scale, isFilled);
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(shape.props.geo);
    }
}
function getXBoxPath(w, h, sw, dash, isFilled) {
    const cx = w / 2;
    const cy = h / 2;
    const path = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(0, 0, {
        geometry: {
            isFilled
        }
    }).lineTo(w, 0).lineTo(w, h).lineTo(0, h).close();
    if (dash === "dashed" || dash === "dotted") {
        return path.moveTo(0, 0, {
            geometry: {
                isInternal: true,
                isFilled: false
            },
            dashStart: "skip",
            dashEnd: "outset"
        }).lineTo(cx, cy).moveTo(w, h, {
            geometry: {
                isInternal: true,
                isFilled: false
            },
            dashStart: "skip",
            dashEnd: "outset"
        }).lineTo(cx, cy).moveTo(0, h, {
            geometry: {
                isInternal: true,
                isFilled: false
            },
            dashStart: "skip",
            dashEnd: "outset"
        }).lineTo(cx, cy).moveTo(w, 0, {
            geometry: {
                isInternal: true,
                isFilled: false
            },
            dashStart: "skip",
            dashEnd: "outset"
        }).lineTo(cx, cy);
    }
    const inset = dash === "draw" ? 0.62 : 0;
    path.moveTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(sw * inset, 0, w), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(sw * inset, 0, h), {
        geometry: {
            isInternal: true,
            isFilled: false
        }
    }).lineTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(w - sw * inset, 0, w), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(h - sw * inset, 0, h)).moveTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(w - sw * inset, 0, w), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(sw * inset, 0, h)).lineTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(sw * inset, 0, w), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(h - sw * inset, 0, h));
    return path;
}
function getStadiumPath(w, h, isFilled) {
    if (h > w) {
        const r2 = w / 2;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(0, r2, {
            geometry: {
                isFilled
            }
        }).arcTo(r2, r2, false, true, 0, w, r2).lineTo(w, h - r2).arcTo(r2, r2, false, true, 0, 0, h - r2).close();
    }
    const r = h / 2;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(r, h, {
        geometry: {
            isFilled
        }
    }).arcTo(r, r, false, true, 0, r, 0).lineTo(w - r, 0).arcTo(r, r, false, true, 0, w - r, h).close();
}
function getStarPath(w, h, isFilled) {
    const sides = 5;
    const step = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI2"] / sides / 2;
    const rightMostIndex = Math.floor(sides / 4) * 2;
    const leftMostIndex = sides * 2 - rightMostIndex;
    const topMostIndex = 0;
    const bottomMostIndex = Math.floor(sides / 2) * 2;
    const maxX = Math.cos(-__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HALF_PI"] + rightMostIndex * step) * w / 2;
    const minX = Math.cos(-__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HALF_PI"] + leftMostIndex * step) * w / 2;
    const minY = Math.sin(-__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HALF_PI"] + topMostIndex * step) * h / 2;
    const maxY = Math.sin(-__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HALF_PI"] + bottomMostIndex * step) * h / 2;
    const diffX = w - Math.abs(maxX - minX);
    const diffY = h - Math.abs(maxY - minY);
    const offsetX = w / 2 + minX - (w / 2 - maxX);
    const offsetY = h / 2 + minY - (h / 2 - maxY);
    const ratio = 1;
    const cx = (w - offsetX) / 2;
    const cy = (h - offsetY) / 2;
    const ox = (w + diffX) / 2;
    const oy = (h + diffY) / 2;
    const ix = ox * ratio / 2;
    const iy = oy * ratio / 2;
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"].lineThroughPoints(Array.from(Array(sides * 2), (_, i)=>{
        const theta = -__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HALF_PI"] + i * step;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](cx + (i % 2 ? ix : ox) * Math.cos(theta), cy + (i % 2 ? iy : oy) * Math.sin(theta));
    }), {
        geometry: {
            isFilled
        }
    }).close();
}
function getOvalPerimeter(h, w) {
    if (h > w) return (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI"] * (w / 2) + (h - w)) * 2;
    else return (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI"] * (h / 2) + (w - h)) * 2;
}
function getPillPoints(width, height, numPoints) {
    const radius = Math.min(width, height) / 2;
    const longSide = Math.max(width, height) - radius * 2;
    const circumference = Math.PI * (radius * 2) + 2 * longSide;
    const spacing = circumference / numPoints;
    const sections = width > height ? [
        {
            type: "straight",
            start: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](radius, 0),
            delta: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](1, 0)
        },
        {
            type: "arc",
            center: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](width - radius, radius),
            startAngle: -__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI"] / 2
        },
        {
            type: "straight",
            start: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](width - radius, height),
            delta: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](-1, 0)
        },
        {
            type: "arc",
            center: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](radius, radius),
            startAngle: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI"] / 2
        }
    ] : [
        {
            type: "straight",
            start: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](width, radius),
            delta: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, 1)
        },
        {
            type: "arc",
            center: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](radius, height - radius),
            startAngle: 0
        },
        {
            type: "straight",
            start: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, height - radius),
            delta: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, -1)
        },
        {
            type: "arc",
            center: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](radius, radius),
            startAngle: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI"]
        }
    ];
    let sectionOffset = 0;
    const points = [];
    for(let i = 0; i < numPoints; i++){
        const section = sections[0];
        if (section.type === "straight") {
            points.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(section.start, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(section.delta, sectionOffset)));
        } else {
            points.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointOnCircle"])(section.center, radius, section.startAngle + sectionOffset / radius));
        }
        sectionOffset += spacing;
        let sectionLength = section.type === "straight" ? longSide : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI"] * radius;
        while(sectionOffset > sectionLength){
            sectionOffset -= sectionLength;
            sections.push(sections.shift());
            sectionLength = sections[0].type === "straight" ? longSide : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PI"] * radius;
        }
    }
    return points;
}
const SIZES = {
    s: 50,
    m: 70,
    l: 100,
    xl: 130
};
const BUMP_PROTRUSION = 0.2;
function getCloudPath(width, height, seed, size, scale, isFilled) {
    const path = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"]();
    const getRandom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rng"])(seed);
    const pillCircumference = getOvalPerimeter(width, height);
    const numBumps = Math.max(Math.ceil(pillCircumference / SIZES[size]), 6, Math.ceil(pillCircumference / Math.min(width, height)));
    const targetBumpProtrusion = pillCircumference / numBumps * BUMP_PROTRUSION;
    const innerWidth = Math.max(width - targetBumpProtrusion * 2, 1);
    const innerHeight = Math.max(height - targetBumpProtrusion * 2, 1);
    const innerCircumference = getOvalPerimeter(innerWidth, innerHeight);
    const distanceBetweenPointsOnPerimeter = innerCircumference / numBumps;
    const paddingX = (width - innerWidth) / 2;
    const paddingY = (height - innerHeight) / 2;
    const bumpPoints = getPillPoints(innerWidth, innerHeight, numBumps).map((p)=>{
        return p.addXY(paddingX, paddingY);
    });
    const maxWiggleX = width < 20 ? 0 : targetBumpProtrusion * 0.3;
    const maxWiggleY = height < 20 ? 0 : targetBumpProtrusion * 0.3;
    const wiggledPoints = bumpPoints.slice(0);
    for(let i = 0; i < Math.floor(numBumps / 2); i++){
        wiggledPoints[i] = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].AddXY(wiggledPoints[i], getRandom() * maxWiggleX * scale, getRandom() * maxWiggleY * scale);
        wiggledPoints[numBumps - i - 1] = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].AddXY(wiggledPoints[numBumps - i - 1], getRandom() * maxWiggleX * scale, getRandom() * maxWiggleY * scale);
    }
    for(let i = 0; i < wiggledPoints.length; i++){
        const j = i === wiggledPoints.length - 1 ? 0 : i + 1;
        const leftWigglePoint = wiggledPoints[i];
        const rightWigglePoint = wiggledPoints[j];
        const leftPoint = bumpPoints[i];
        const rightPoint = bumpPoints[j];
        const distanceBetweenOriginalPoints = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(leftPoint, rightPoint);
        const curvatureOffset = distanceBetweenPointsOnPerimeter - distanceBetweenOriginalPoints;
        const distanceBetweenWigglePoints = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(leftWigglePoint, rightWigglePoint);
        const relativeSize = distanceBetweenWigglePoints / distanceBetweenOriginalPoints;
        const finalDistance = (Math.max(paddingX, paddingY) + curvatureOffset) * relativeSize;
        const arcPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Lrp(leftPoint, rightPoint, 0.5).add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(rightPoint, leftPoint).uni().per().mul(finalDistance));
        if (arcPoint.x < 0) {
            arcPoint.x = 0;
        } else if (arcPoint.x > width) {
            arcPoint.x = width;
        }
        if (arcPoint.y < 0) {
            arcPoint.y = 0;
        } else if (arcPoint.y > height) {
            arcPoint.y = height;
        }
        const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["centerOfCircleFromThreePoints"])(leftWigglePoint, rightWigglePoint, arcPoint);
        const radius = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(center ? center : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Average([
            leftWigglePoint,
            rightWigglePoint
        ]), leftWigglePoint);
        if (i === 0) {
            path.moveTo(leftWigglePoint.x, leftWigglePoint.y, {
                geometry: {
                    isFilled
                }
            });
        }
        path.circularArcTo(radius, false, true, rightWigglePoint.x, rightWigglePoint.y);
    }
    return path.close();
}
;
 //# sourceMappingURL=getGeoShapePath.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/components/GeoShapeBody.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeoShapeBody",
    ()=>GeoShapeBody
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$ShapeFill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/ShapeFill.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$getGeoShapePath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/getGeoShapePath.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
function GeoShapeBody({ shape, shouldScale, forceSolid }) {
    const scaleToUse = shouldScale ? shape.props.scale : 1;
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
    const { props } = shape;
    const { color, fill, dash, size } = props;
    const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][size] * scaleToUse;
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$getGeoShapePath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGeoShapePath"])(shape);
    const fillPath = dash === "draw" && !forceSolid ? path.toDrawD({
        strokeWidth,
        randomSeed: shape.id,
        passes: 1,
        offset: 0,
        onlyFilled: true
    }) : path.toD({
        onlyFilled: true
    });
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$ShapeFill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeFill"], {
                theme,
                d: fillPath,
                color,
                fill,
                scale: scaleToUse
            }),
            path.toSvg({
                style: dash,
                strokeWidth,
                forceSolid,
                randomSeed: shape.id,
                props: {
                    fill: "none",
                    stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "solid")
                }
            })
        ]
    });
}
;
 //# sourceMappingURL=GeoShapeBody.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/GeoShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeoShapeUtil",
    ()=>GeoShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/BaseBoxShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Group2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/HTMLContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Rectangle2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/SVGContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/richText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/richText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/HyperlinkButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/RichTextLabel.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/defaultStyleDefs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditablePlainText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEditablePlainText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEfficientZoomThreshold.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$components$2f$GeoShapeBody$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/components/GeoShapeBody.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$getGeoShapePath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/geo/getGeoShapePath.mjs [app-client] (ecmascript)");
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
;
;
const MIN_SIZE_WITH_LABEL = 17 * 3;
class GeoShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseBoxShapeUtil"] {
    static type = "geo";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geoShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geoShapeMigrations"];
    options = {
        showTextOutline: true
    };
    canEdit() {
        return true;
    }
    getDefaultProps() {
        return {
            w: 100,
            h: 100,
            geo: "rectangle",
            dash: "draw",
            growY: 0,
            url: "",
            scale: 1,
            // Text properties
            color: "black",
            labelColor: "black",
            fill: "none",
            size: "m",
            font: "draw",
            align: "middle",
            verticalAlign: "middle",
            richText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRichText"])("")
        };
    }
    getGeometry(shape) {
        const { props } = shape;
        const { scale } = props;
        const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$getGeoShapePath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGeoShapePath"])(shape);
        const pathGeometry = path.toGeometry();
        const scaledW = Math.max(1, props.w);
        const scaledH = Math.max(1, props.h + props.growY);
        const unscaledW = scaledW / scale;
        const unscaledH = scaledH / scale;
        const isEmptyLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(props.richText);
        const unscaledLabelSize = isEmptyLabel ? EMPTY_LABEL_SIZE : getUnscaledLabelSize(this.editor, shape);
        const labelBounds = getLabelBounds(unscaledW, unscaledH, unscaledLabelSize, props.size, props.align, props.verticalAlign, scale);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group2d"]({
            children: [
                pathGeometry,
                new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rectangle2d"]({
                    ...labelBounds,
                    isFilled: true,
                    isLabel: true,
                    excludeFromShapeBounds: true,
                    isEmptyLabel
                })
            ]
        });
    }
    getHandleSnapGeometry(shape) {
        const geometry = this.getGeometry(shape);
        const outline = geometry.children[0];
        switch(shape.props.geo){
            case "arrow-down":
            case "arrow-left":
            case "arrow-right":
            case "arrow-up":
            case "check-box":
            case "diamond":
            case "hexagon":
            case "octagon":
            case "pentagon":
            case "rectangle":
            case "rhombus":
            case "rhombus-2":
            case "star":
            case "trapezoid":
            case "triangle":
            case "x-box":
                return {
                    outline,
                    points: [
                        ...outline.vertices,
                        geometry.bounds.center
                    ]
                };
            case "cloud":
            case "ellipse":
            case "heart":
            case "oval":
                return {
                    outline,
                    points: [
                        geometry.bounds.center
                    ]
                };
            default:
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(shape.props.geo);
        }
    }
    getText(shape) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderPlaintextFromRichText"])(this.editor, shape.props.richText);
    }
    getFontFaces(shape) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFontsFromRichText"])(this.editor, shape.props.richText, {
            family: `tldraw_${shape.props.font}`,
            weight: "normal",
            style: "normal"
        });
    }
    component(shape) {
        const { id, type, props } = shape;
        const { fill, font, align, verticalAlign, size, richText } = props;
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
        const { editor } = this;
        const isOnlySelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("isGeoOnlySelected", {
            "useValue[isOnlySelected]": ()=>shape.id === editor.getOnlySelectedShapeId()
        }["useValue[isOnlySelected]"], [
            editor
        ]);
        const isReadyForEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditablePlainText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsReadyForEditing"])(editor, shape.id);
        const isEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText);
        const showHtmlContainer = isReadyForEditing || !isEmpty;
        const isForceSolid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEfficientZoomThreshold"])(shape.props.scale * 0.25);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SVGContainer"], {
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$components$2f$GeoShapeBody$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoShapeBody"], {
                        shape,
                        shouldScale: true,
                        forceSolid: isForceSolid
                    })
                }),
                showHtmlContainer && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLContainer"], {
                    style: {
                        overflow: "hidden",
                        width: shape.props.w,
                        height: shape.props.h + props.growY
                    },
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextLabel"], {
                        shapeId: id,
                        type,
                        font,
                        fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FONT_SIZES"][size] * shape.props.scale,
                        lineHeight: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"].lineHeight,
                        padding: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * shape.props.scale,
                        fill,
                        align,
                        verticalAlign,
                        richText,
                        isSelected: isOnlySelected,
                        labelColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, props.labelColor, "solid"),
                        wrap: true,
                        showTextOutline: this.options.showTextOutline
                    })
                }),
                shape.props.url && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HyperlinkButton"], {
                    url: shape.props.url
                })
            ]
        });
    }
    indicator(shape) {
        const isZoomedOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEfficientZoomThreshold"])(shape.props.scale * 0.25);
        const { size, dash, scale } = shape.props;
        const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][size];
        const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$getGeoShapePath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGeoShapePath"])(shape);
        return path.toSvg({
            style: dash === "draw" ? "draw" : "solid",
            strokeWidth: 1,
            passes: 1,
            randomSeed: shape.id,
            offset: 0,
            roundness: strokeWidth * 2 * scale,
            props: {
                strokeWidth: void 0
            },
            forceSolid: isZoomedOut
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const isForceSolid = this.editor.getEfficientZoomLevel() < shape.props.scale * 0.25;
        const { size, dash, scale } = shape.props;
        const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][size];
        const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$getGeoShapePath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGeoShapePath"])(shape);
        return path.toPath2D({
            style: dash === "draw" ? "draw" : "solid",
            strokeWidth: 1,
            passes: 1,
            randomSeed: shape.id,
            offset: 0,
            roundness: strokeWidth * 2 * scale,
            forceSolid: isForceSolid
        });
    }
    toSvg(shape, ctx) {
        const scale = shape.props.scale;
        const newShape = {
            ...shape,
            props: {
                ...shape.props,
                w: shape.props.w / scale,
                h: (shape.props.h + shape.props.growY) / scale,
                growY: 0
            }
        };
        const props = newShape.props;
        ctx.addExportDef((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFillDefForExport"])(props.fill));
        let textEl;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(props.richText)) {
            const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultColorTheme"])(ctx);
            const bounds = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"](0, 0, props.w, (shape.props.h + shape.props.growY) / scale);
            textEl = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextSVG"], {
                fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FONT_SIZES"][props.size],
                font: props.font,
                align: props.align,
                verticalAlign: props.verticalAlign,
                richText: props.richText,
                labelColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, props.labelColor, "solid"),
                bounds,
                padding: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"],
                showTextOutline: this.options.showTextOutline
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$geo$2f$components$2f$GeoShapeBody$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoShapeBody"], {
                    shouldScale: false,
                    shape: newShape,
                    forceSolid: false
                }),
                textEl
            ]
        });
    }
    getCanvasSvgDefs() {
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFillDefForCanvas"])()
        ];
    }
    onResize(shape, { handle, newPoint, scaleX, scaleY, initialShape }) {
        const unscaledInitial = getUnscaledGeoProps(initialShape.props);
        let unscaledW = unscaledInitial.w * scaleX;
        let unscaledH = (unscaledInitial.h + unscaledInitial.growY) * scaleY;
        let overShrinkX = 0;
        let overShrinkY = 0;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText)) {
            const absUnscaledW = Math.abs(unscaledW);
            const absUnscaledH = Math.abs(unscaledH);
            const measureW = Math.max(absUnscaledW, MIN_SIZE_WITH_LABEL);
            const measureH = Math.max(absUnscaledH, MIN_SIZE_WITH_LABEL);
            const unscaledLabelSize = measureUnscaledLabelSize(this.editor, {
                ...shape,
                props: {
                    ...shape.props,
                    w: measureW * shape.props.scale,
                    h: measureH * shape.props.scale
                }
            });
            const constrainedW = Math.max(absUnscaledW, unscaledLabelSize.w);
            const constrainedH = Math.max(absUnscaledH, unscaledLabelSize.h);
            overShrinkX = constrainedW - absUnscaledW;
            overShrinkY = constrainedH - absUnscaledH;
            unscaledW = constrainedW * Math.sign(unscaledW || 1);
            unscaledH = constrainedH * Math.sign(unscaledH || 1);
        }
        const scaledW = unscaledW * shape.props.scale;
        const scaledH = unscaledH * shape.props.scale;
        const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, 0);
        if (scaleX < 0) {
            offset.x += scaledW;
        }
        if (handle === "left" || handle === "top_left" || handle === "bottom_left") {
            offset.x += scaleX < 0 ? overShrinkX : -overShrinkX;
        }
        if (scaleY < 0) {
            offset.y += scaledH;
        }
        if (handle === "top" || handle === "top_left" || handle === "top_right") {
            offset.y += scaleY < 0 ? overShrinkY : -overShrinkY;
        }
        const { x, y } = offset.rot(shape.rotation).add(newPoint);
        return {
            x,
            y,
            props: {
                w: Math.max(Math.abs(scaledW), 1),
                h: Math.max(Math.abs(scaledH), 1),
                growY: 0
            }
        };
    }
    onBeforeCreate(shape) {
        const { props } = shape;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(props.richText)) {
            return props.growY !== 0 ? {
                ...shape,
                props: {
                    ...props,
                    growY: 0
                }
            } : void 0;
        }
        const unscaledShapeH = props.h / props.scale;
        const unscaledLabelH = getUnscaledLabelSize(this.editor, shape).h;
        const unscaledGrowY = calculateGrowY(unscaledShapeH, unscaledLabelH, props.growY / props.scale);
        if (unscaledGrowY !== null) {
            return {
                ...shape,
                props: {
                    ...props,
                    growY: unscaledGrowY * props.scale
                }
            };
        }
    }
    onBeforeUpdate(prev, next) {
        const { props: prevProps } = prev;
        const { props: nextProps } = next;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEqual"])(prevProps.richText, nextProps.richText) && prevProps.font === nextProps.font && prevProps.size === nextProps.size) {
            return;
        }
        const wasEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(prevProps.richText);
        const isEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(nextProps.richText);
        if (wasEmpty && isEmpty) {
            return;
        }
        if (isEmpty) {
            return nextProps.growY !== 0 ? {
                ...next,
                props: {
                    ...nextProps,
                    growY: 0
                }
            } : void 0;
        }
        const unscaledPrev = getUnscaledGeoProps(prevProps);
        const unscaledLabelSize = getUnscaledLabelSize(this.editor, next);
        const { scale } = nextProps;
        if (wasEmpty && !isEmpty) {
            const expanded = expandShapeForFirstLabel(unscaledPrev.w, unscaledPrev.h, unscaledLabelSize);
            return {
                ...next,
                props: {
                    ...nextProps,
                    w: expanded.w * scale,
                    h: expanded.h * scale,
                    growY: 0
                }
            };
        }
        const unscaledNextW = next.props.w / scale;
        const needsWidthExpand = unscaledLabelSize.w > unscaledNextW;
        const unscaledGrowY = calculateGrowY(unscaledPrev.h, unscaledLabelSize.h, unscaledPrev.growY);
        if (unscaledGrowY !== null || needsWidthExpand) {
            return {
                ...next,
                props: {
                    ...nextProps,
                    growY: (unscaledGrowY ?? unscaledPrev.growY) * scale,
                    w: Math.max(unscaledNextW, unscaledLabelSize.w) * scale
                }
            };
        }
    }
    onDoubleClick(shape) {
        if (this.editor.inputs.getAltKey()) {
            switch(shape.props.geo){
                case "rectangle":
                    {
                        return {
                            ...shape,
                            props: {
                                geo: "check-box"
                            }
                        };
                    }
                case "check-box":
                    {
                        return {
                            ...shape,
                            props: {
                                geo: "rectangle"
                            }
                        };
                    }
            }
        }
        return;
    }
    getInterpolatedProps(startShape, endShape, t) {
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            w: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.w, endShape.props.w, t),
            h: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.h, endShape.props.h, t),
            scale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.scale, endShape.props.scale, t)
        };
    }
}
const MIN_WIDTHS = Object.freeze({
    s: 12,
    m: 14,
    l: 16,
    xl: 20
});
const EXTRA_PADDINGS = Object.freeze({
    s: 2,
    m: 3.5,
    l: 5,
    xl: 10
});
const EMPTY_LABEL_SIZE = Object.freeze({
    w: 0,
    h: 0
});
const LABEL_EDGE_MARGIN = 8;
function getLabelBounds(unscaledShapeW, unscaledShapeH, unscaledLabelSize, size, align, verticalAlign, scale) {
    const unscaledMinWidth = Math.min(100, unscaledShapeW / 2);
    const unscaledMinHeight = Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FONT_SIZES"][size] * __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"].lineHeight + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2, unscaledShapeH / 2);
    const unscaledLabelW = Math.min(unscaledShapeW, Math.max(unscaledLabelSize.w, Math.min(unscaledMinWidth, Math.max(1, unscaledShapeW - LABEL_EDGE_MARGIN))));
    const unscaledLabelH = Math.min(unscaledShapeH, Math.max(unscaledLabelSize.h, Math.min(unscaledMinHeight, Math.max(1, unscaledShapeH - LABEL_EDGE_MARGIN))));
    const unscaledX = align === "start" ? 0 : align === "end" ? unscaledShapeW - unscaledLabelW : (unscaledShapeW - unscaledLabelW) / 2;
    const unscaledY = verticalAlign === "start" ? 0 : verticalAlign === "end" ? unscaledShapeH - unscaledLabelH : (unscaledShapeH - unscaledLabelH) / 2;
    return {
        x: unscaledX * scale,
        y: unscaledY * scale,
        width: unscaledLabelW * scale,
        height: unscaledLabelH * scale
    };
}
function getUnscaledGeoProps(props) {
    const { w, h, growY, scale } = props;
    return {
        w: w / scale,
        h: h / scale,
        growY: growY / scale
    };
}
function calculateGrowY(unscaledShapeH, unscaledLabelH, unscaledCurrentGrowY) {
    if (unscaledLabelH > unscaledShapeH) {
        return unscaledLabelH - unscaledShapeH;
    }
    if (unscaledCurrentGrowY > 0) {
        return 0;
    }
    return null;
}
function expandShapeForFirstLabel(unscaledW, unscaledH, unscaledLabelSize) {
    let w = Math.max(unscaledW, unscaledLabelSize.w);
    let h = Math.max(unscaledH, unscaledLabelSize.h);
    if (unscaledW < MIN_SIZE_WITH_LABEL && unscaledH < MIN_SIZE_WITH_LABEL) {
        w = Math.max(w, MIN_SIZE_WITH_LABEL);
        h = Math.max(h, MIN_SIZE_WITH_LABEL);
        const maxDim = Math.max(w, h);
        w = maxDim;
        h = maxDim;
    }
    return {
        w,
        h
    };
}
const labelSizesForGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
function getUnscaledLabelSize(editor, shape) {
    return labelSizesForGeo.get(shape, ()=>{
        return measureUnscaledLabelSize(editor, shape);
    });
}
function measureUnscaledLabelSize(editor, shape) {
    const { richText, font, size, w } = shape.props;
    const minWidth = MIN_WIDTHS[size];
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderHtmlFromRichTextForMeasurement"])(editor, richText);
    const textSize = editor.textMeasure.measureHtml(html, {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"],
        fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_FAMILIES"][font],
        fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FONT_SIZES"][size],
        minWidth,
        maxWidth: Math.max(// Guard because a DOM nodes can't be less 0
        0, // A 'w' width that we're setting as the min-width
        Math.ceil(minWidth + EXTRA_PADDINGS[size]), // The actual text size
        Math.ceil(w / shape.props.scale - __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2))
    });
    return {
        w: textSize.w + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2,
        h: textSize.h + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2
    };
}
;
 //# sourceMappingURL=GeoShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/highlight/HighlightShapeTool.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighlightShapeTool",
    ()=>HighlightShapeTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$toolStates$2f$Drawing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/toolStates/Drawing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/toolStates/Idle.mjs [app-client] (ecmascript)");
;
;
;
class HighlightShapeTool extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "highlight";
    static initial = "idle";
    static useCoalescedEvents = true;
    static children() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Idle"],
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$toolStates$2f$Drawing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Drawing"]
        ];
    }
    static isLockable = false;
    shapeType = "highlight";
    onExit() {
        const drawingState = this.children["drawing"];
        drawingState.initialShape = void 0;
    }
}
;
 //# sourceMappingURL=HighlightShapeTool.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/highlight/HighlightShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighlightShapeUtil",
    ()=>HighlightShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Circle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Circle2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polygon2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Polygon2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/SVGContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/ShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/draw/getPath.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokeOutlinePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokeOutlinePoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokePoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$setStrokePointRadii$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/setStrokePointRadii.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/svg.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$interpolate$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/interpolate-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useColorSpace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useColorSpace.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
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
;
class HighlightShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeUtil"] {
    static type = "highlight";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightShapeMigrations"];
    options = {
        maxPointsPerShape: 600,
        underlayOpacity: 0.82,
        overlayOpacity: 0.35
    };
    hideResizeHandles(shape) {
        return getIsDot(shape);
    }
    hideRotateHandle(shape) {
        return getIsDot(shape);
    }
    hideSelectionBoundsFg(shape) {
        return getIsDot(shape);
    }
    getDefaultProps() {
        return {
            segments: [],
            color: "black",
            size: "m",
            isComplete: false,
            isPen: false,
            scale: 1,
            scaleX: 1,
            scaleY: 1
        };
    }
    getGeometry(shape) {
        const strokeWidth = getStrokeWidth(shape);
        if (getIsDot(shape)) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Circle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Circle2d"]({
                x: -strokeWidth / 2,
                y: -strokeWidth / 2,
                radius: strokeWidth / 2,
                isFilled: true
            });
        }
        const { strokePoints, sw } = getHighlightStrokePoints(shape, strokeWidth, true);
        const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHighlightFreehandSettings"])({
            strokeWidth: sw,
            showAsComplete: true
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$setStrokePointRadii$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStrokePointRadii"])(strokePoints, opts);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polygon2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Polygon2d"]({
            points: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokeOutlinePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOutlinePoints"])(strokePoints, opts),
            isFilled: true
        });
    }
    component(shape) {
        const forceSolid = useHighlightForceSolid(this.editor, shape);
        const strokeWidth = getStrokeWidth(shape);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SVGContainer"], {
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(HighlightRenderer, {
                shape,
                forceSolid,
                strokeWidth,
                opacity: this.options.overlayOpacity
            })
        });
    }
    backgroundComponent(shape) {
        const forceSolid = useHighlightForceSolid(this.editor, shape);
        const strokeWidth = getStrokeWidth(shape);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SVGContainer"], {
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(HighlightRenderer, {
                shape,
                forceSolid,
                strokeWidth,
                opacity: this.options.underlayOpacity
            })
        });
    }
    indicator(shape) {
        const forceSolid = useHighlightForceSolid(this.editor, shape);
        const strokeWidth = getStrokeWidth(shape);
        const { strokePoints, sw } = getHighlightStrokePoints(shape, strokeWidth, forceSolid);
        const allPointsFromSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsFromDrawSegments"])(shape.props.segments, shape.props.scaleX, shape.props.scaleY);
        let strokePath;
        if (strokePoints.length < 2) {
            strokePath = getIndicatorDot(allPointsFromSegments[0], sw);
        } else {
            strokePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSvgPathFromStrokePoints"])(strokePoints, false);
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: strokePath
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const strokeWidth = getStrokeWidth(shape);
        const zoomLevel = this.editor.getEfficientZoomLevel();
        const forceSolid = strokeWidth / zoomLevel < 1.5;
        const { strokePoints, sw } = getHighlightStrokePoints(shape, strokeWidth, forceSolid);
        const allPointsFromSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsFromDrawSegments"])(shape.props.segments, shape.props.scaleX, shape.props.scaleY);
        let strokePath;
        if (strokePoints.length < 2) {
            strokePath = getIndicatorDot(allPointsFromSegments[0], sw);
        } else {
            strokePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSvgPathFromStrokePoints"])(strokePoints, false);
        }
        return new Path2D(strokePath);
    }
    toSvg(shape) {
        const strokeWidth = getStrokeWidth(shape);
        const forceSolid = strokeWidth < 1.5;
        const scaleFactor = 1 / shape.props.scale;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            transform: `scale(${scaleFactor})`,
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(HighlightRenderer, {
                forceSolid,
                strokeWidth,
                shape,
                opacity: this.options.overlayOpacity
            })
        });
    }
    toBackgroundSvg(shape) {
        const strokeWidth = getStrokeWidth(shape);
        const forceSolid = strokeWidth < 1.5;
        const scaleFactor = 1 / shape.props.scale;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            transform: `scale(${scaleFactor})`,
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(HighlightRenderer, {
                forceSolid,
                strokeWidth,
                shape,
                opacity: this.options.underlayOpacity
            })
        });
    }
    onResize(shape, info) {
        const { scaleX, scaleY } = info;
        return {
            props: {
                scaleX: scaleX * shape.props.scaleX,
                scaleY: scaleY * shape.props.scaleY
            }
        };
    }
    getInterpolatedProps(startShape, endShape, t) {
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            ...endShape.props,
            segments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$interpolate$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interpolateSegments"])(startShape.props.segments, endShape.props.segments, t),
            scale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.scale, endShape.props.scale, t)
        };
    }
}
function getShapeDot(point) {
    const r = 0.1;
    return `M ${point.x} ${point.y} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
}
function getIndicatorDot(point, sw) {
    const r = sw / 2;
    return `M ${point.x} ${point.y} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
}
function getHighlightStrokePoints(shape, strokeWidth, forceSolid) {
    const allPointsFromSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsFromDrawSegments"])(shape.props.segments, shape.props.scaleX, shape.props.scaleY);
    const showAsComplete = shape.props.isComplete || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(shape.props.segments)?.type === "straight";
    let sw = strokeWidth;
    if (!forceSolid && !shape.props.isPen && allPointsFromSegments.length === 1) {
        sw += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rng"])(shape.id)() * (strokeWidth / 6);
    }
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHighlightFreehandSettings"])({
        strokeWidth: sw,
        showAsComplete
    });
    const strokePoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(allPointsFromSegments, options);
    return {
        strokePoints,
        sw
    };
}
function getStrokeWidth(shape) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_SIZES"][shape.props.size] * 1.12 * shape.props.scale;
}
function getIsDot(shape) {
    return shape.props.segments.length === 1 && shape.props.segments[0].path.length < 24;
}
function HighlightRenderer({ strokeWidth, forceSolid, shape, opacity }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
    const allPointsFromSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointsFromDrawSegments"])(shape.props.segments, shape.props.scaleX, shape.props.scaleY);
    let sw = strokeWidth;
    if (!forceSolid && !shape.props.isPen && allPointsFromSegments.length === 1) {
        sw += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rng"])(shape.id)() * (sw / 6);
    }
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$draw$2f$getPath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHighlightFreehandSettings"])({
        strokeWidth: sw,
        showAsComplete: shape.props.isComplete || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(shape.props.segments)?.type === "straight"
    });
    const strokePoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(allPointsFromSegments, options);
    const solidStrokePath = strokePoints.length > 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$svg$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSvgPathFromStrokePoints"])(strokePoints, false) : getShapeDot(allPointsFromSegments[0]);
    const colorSpace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useColorSpace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useColorSpace"])();
    const color = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.color, colorSpace === "p3" ? "highlightP3" : "highlightSrgb");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
        d: solidStrokePath,
        strokeLinecap: "round",
        fill: "none",
        pointerEvents: "all",
        stroke: color,
        strokeWidth: sw,
        opacity
    });
}
function useHighlightForceSolid(editor, shape) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("forceSolid", {
        "useHighlightForceSolid.useValue": ()=>{
            const sw = getStrokeWidth(shape);
            const zoomLevel = editor.getEfficientZoomLevel();
            if (sw / zoomLevel < 1.5) {
                return true;
            }
            return false;
        }
    }["useHighlightForceSolid.useValue"], [
        editor
    ]);
}
;
 //# sourceMappingURL=HighlightShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/line/toolStates/Idle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Idle",
    ()=>Idle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
;
class Idle extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "idle";
    shapeId = "";
    onEnter(info) {
        this.shapeId = info.shapeId;
        this.editor.setCursor({
            type: "cross",
            rotation: 0
        });
    }
    onPointerDown() {
        this.parent.transition("pointing", {
            shapeId: this.shapeId
        });
    }
    onCancel() {
        this.editor.setCurrentTool("select");
    }
}
;
 //# sourceMappingURL=Idle.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/line/toolStates/Pointing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pointing",
    ()=>Pointing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Mat.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/BaseBoxShapeTool/children/Pointing.mjs [app-client] (ecmascript)");
;
const MINIMUM_DISTANCE_BETWEEN_SHIFT_CLICKED_HANDLES = 2;
class Pointing extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "pointing";
    shape = {};
    markId;
    onEnter(info) {
        const { inputs } = this.editor;
        const currentPagePoint = inputs.getCurrentPagePoint();
        this.markId = void 0;
        const shape = info.shapeId && this.editor.getShape(info.shapeId);
        if (shape && inputs.getShiftKey()) {
            this.markId = this.editor.markHistoryStoppingPoint(`creating_line:${shape.id}`);
            this.shape = shape;
            const handles = this.editor.getShapeHandles(this.shape);
            if (!handles) return;
            const vertexHandles = handles.filter((h)=>h.type === "vertex").sort(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortByIndex"]);
            const endHandle = vertexHandles[vertexHandles.length - 1];
            const prevEndHandle = vertexHandles[vertexHandles.length - 2];
            const shapePagePoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(this.editor.getShapeParentTransform(this.shape), new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](this.shape.x, this.shape.y));
            const nudgedPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(currentPagePoint, shapePagePoint).addXY(0.1, 0.1);
            const nextPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(nudgedPoint, this.editor);
            const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["structuredClone"])(this.shape.props.points);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].DistMin(endHandle, prevEndHandle, MINIMUM_DISTANCE_BETWEEN_SHIFT_CLICKED_HANDLES) || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].DistMin(nextPoint, endHandle, MINIMUM_DISTANCE_BETWEEN_SHIFT_CLICKED_HANDLES)) {
                points[endHandle.id] = {
                    id: endHandle.id,
                    index: endHandle.index,
                    x: nextPoint.x,
                    y: nextPoint.y
                };
            } else {
                const nextIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndexAbove"])(endHandle.index);
                points[nextIndex] = {
                    id: nextIndex,
                    index: nextIndex,
                    x: nextPoint.x,
                    y: nextPoint.y
                };
            }
            this.editor.updateShapes([
                {
                    id: this.shape.id,
                    type: this.shape.type,
                    props: {
                        points
                    }
                }
            ]);
        } else {
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
            this.markId = this.editor.markHistoryStoppingPoint(`creating_line:${id}`);
            const newPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(currentPagePoint, this.editor);
            this.editor.createShapes([
                {
                    id,
                    type: "line",
                    x: newPoint.x,
                    y: newPoint.y,
                    props: {
                        scale: this.editor.user.getIsDynamicResizeMode() ? 1 / this.editor.getZoomLevel() : 1
                    }
                }
            ]);
            if (!this.editor.getShape(id)) {
                this.cancel();
                return;
            }
            this.editor.select(id);
            this.shape = this.editor.getShape(id);
        }
    }
    onPointerMove() {
        if (!this.shape) return;
        if (this.editor.inputs.getIsDragging()) {
            const handles = this.editor.getShapeHandles(this.shape);
            if (!handles) {
                if (this.markId) this.editor.bailToMark(this.markId);
                throw Error("No handles found");
            }
            const lastHandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(handles);
            this.editor.setCurrentTool("select.dragging_handle", {
                shape: this.shape,
                isCreating: true,
                creatingMarkId: this.markId,
                // remove the offset that we added to the handle when we created it
                handle: {
                    ...lastHandle,
                    x: lastHandle.x - 0.1,
                    y: lastHandle.y - 0.1
                },
                onInteractionEnd: "line"
            });
        }
    }
    onPointerUp() {
        this.complete();
    }
    onCancel() {
        this.cancel();
    }
    onComplete() {
        this.complete();
    }
    onInterrupt() {
        this.parent.transition("idle");
        if (this.markId) this.editor.bailToMark(this.markId);
        this.editor.snaps.clearIndicators();
    }
    complete() {
        this.parent.transition("idle", {
            shapeId: this.shape.id
        });
        this.editor.snaps.clearIndicators();
    }
    cancel() {
        if (this.markId) this.editor.bailToMark(this.markId);
        this.parent.transition("idle", {
            shapeId: this.shape.id
        });
        this.editor.snaps.clearIndicators();
    }
}
;
 //# sourceMappingURL=Pointing.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/line/LineShapeTool.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineShapeTool",
    ()=>LineShapeTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$line$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/line/toolStates/Idle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$line$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/line/toolStates/Pointing.mjs [app-client] (ecmascript)");
;
;
;
class LineShapeTool extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "line";
    static initial = "idle";
    static children() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$line$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Idle"],
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$line$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pointing"]
        ];
    }
    shapeType = "line";
}
;
 //# sourceMappingURL=LineShapeTool.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/line/LineShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineShapeUtil",
    ()=>LineShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Group2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/SVGContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/ShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/BaseBoxShapeTool/children/Pointing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/PathBuilder.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
;
;
;
;
;
const handlesCache = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
class LineShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeUtil"] {
    static type = "line";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineShapeMigrations"];
    hideResizeHandles() {
        return true;
    }
    hideRotateHandle() {
        return true;
    }
    hideSelectionBoundsFg() {
        return true;
    }
    hideSelectionBoundsBg() {
        return true;
    }
    hideInMinimap() {
        return true;
    }
    getDefaultProps() {
        const [start, end] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndices"])(2);
        return {
            dash: "draw",
            size: "m",
            color: "black",
            spline: "line",
            points: {
                [start]: {
                    id: start,
                    index: start,
                    x: 0,
                    y: 0
                },
                [end]: {
                    id: end,
                    index: end,
                    x: 0.1,
                    y: 0.1
                }
            },
            scale: 1
        };
    }
    getGeometry(shape) {
        const geometry = getPathForLineShape(shape).toGeometry();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(geometry instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilderGeometry2d"]);
        return geometry;
    }
    getHandles(shape) {
        return handlesCache.get(shape.props, ()=>{
            const spline = this.getGeometry(shape);
            const points = linePointsToArray(shape);
            const results = points.map((point)=>({
                    ...point,
                    id: point.index,
                    type: "vertex",
                    canSnap: true
                }));
            for(let i = 0; i < points.length - 1; i++){
                const index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndexBetween"])(points[i].index, points[i + 1].index);
                const segment = spline.getSegments()[i];
                const point = segment.interpolateAlongEdge(0.5);
                results.push({
                    id: index,
                    type: "create",
                    index,
                    x: point.x,
                    y: point.y,
                    canSnap: true
                });
            }
            return results.sort(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortByIndex"]);
        });
    }
    //   Events
    onResize(shape, info) {
        const { scaleX, scaleY } = info;
        return {
            props: {
                points: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapObjectMapValues"])(shape.props.points, (_, { id, index, x, y })=>({
                        id,
                        index,
                        x: x * scaleX,
                        y: y * scaleY
                    }))
            }
        };
    }
    onBeforeCreate(next) {
        const { props: { points } } = next;
        const pointKeys = Object.keys(points);
        if (pointKeys.length < 2) {
            return;
        }
        const firstPoint = points[pointKeys[0]];
        const allSame = pointKeys.every((key)=>{
            const point = points[key];
            return point.x === firstPoint.x && point.y === firstPoint.y;
        });
        if (allSame) {
            const lastKey = pointKeys[pointKeys.length - 1];
            points[lastKey] = {
                ...points[lastKey],
                x: points[lastKey].x + 0.1,
                y: points[lastKey].y + 0.1
            };
            return next;
        }
        return;
    }
    onHandleDrag(shape, { handle }) {
        const newPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](handle.x, handle.y), this.editor);
        return {
            ...shape,
            props: {
                ...shape.props,
                points: {
                    ...shape.props.points,
                    [handle.id]: {
                        id: handle.id,
                        index: handle.index,
                        x: newPoint.x,
                        y: newPoint.y
                    }
                }
            }
        };
    }
    onHandleDragStart(shape, { handle }) {
        if (handle.type === "create") {
            return {
                ...shape,
                props: {
                    ...shape.props,
                    points: {
                        ...shape.props.points,
                        [handle.index]: {
                            id: handle.index,
                            index: handle.index,
                            x: handle.x,
                            y: handle.y
                        }
                    }
                }
            };
        }
        return;
    }
    component(shape) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SVGContainer"], {
            style: {
                minWidth: 50,
                minHeight: 50
            },
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(LineShapeSvg, {
                shape
            })
        });
    }
    indicator(shape) {
        const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * shape.props.scale;
        const path = getPathForLineShape(shape);
        const { dash } = shape.props;
        return path.toSvg({
            style: dash === "draw" ? "draw" : "solid",
            strokeWidth: 1,
            passes: 1,
            randomSeed: shape.id,
            offset: 0,
            roundness: strokeWidth * 2,
            props: {
                strokeWidth: void 0
            }
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * shape.props.scale;
        const path = getPathForLineShape(shape);
        const { dash } = shape.props;
        return path.toPath2D({
            style: dash === "draw" ? "draw" : "solid",
            strokeWidth: 1,
            passes: 1,
            randomSeed: shape.id,
            offset: 0,
            roundness: strokeWidth * 2
        });
    }
    toSvg(shape) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(LineShapeSvg, {
            shouldScale: true,
            shape
        });
    }
    getHandleSnapGeometry(shape) {
        const points = linePointsToArray(shape);
        return {
            points,
            getSelfSnapPoints: (handle)=>{
                const index = this.getHandles(shape).filter((h)=>h.type === "vertex").findIndex((h)=>h.id === handle.id);
                return points.filter((_, i)=>Math.abs(i - index) > 1).map(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From);
            },
            getSelfSnapOutline: (handle)=>{
                const index = this.getHandles(shape).filter((h)=>h.type === "vertex").findIndex((h)=>h.id === handle.id);
                const segments = this.getGeometry(shape).getSegments().filter((_, i)=>i !== index - 1 && i !== index);
                if (!segments.length) return null;
                return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group2d"]({
                    children: segments
                });
            }
        };
    }
    getInterpolatedProps(startShape, endShape, t) {
        const startPoints = linePointsToArray(startShape);
        const endPoints = linePointsToArray(endShape);
        const pointsToUseStart = [];
        const pointsToUseEnd = [];
        let index = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZERO_INDEX_KEY"];
        if (startPoints.length > endPoints.length) {
            for(let i = 0; i < startPoints.length; i++){
                pointsToUseStart[i] = {
                    ...startPoints[i]
                };
                if (endPoints[i] === void 0) {
                    pointsToUseEnd[i] = {
                        ...endPoints[endPoints.length - 1],
                        id: index
                    };
                } else {
                    pointsToUseEnd[i] = {
                        ...endPoints[i],
                        id: index
                    };
                }
                index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndexAbove"])(index);
            }
        } else if (endPoints.length > startPoints.length) {
            for(let i = 0; i < endPoints.length; i++){
                pointsToUseEnd[i] = {
                    ...endPoints[i]
                };
                if (startPoints[i] === void 0) {
                    pointsToUseStart[i] = {
                        ...startPoints[startPoints.length - 1],
                        id: index
                    };
                } else {
                    pointsToUseStart[i] = {
                        ...startPoints[i],
                        id: index
                    };
                }
                index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIndexAbove"])(index);
            }
        } else {
            for(let i = 0; i < endPoints.length; i++){
                pointsToUseStart[i] = startPoints[i];
                pointsToUseEnd[i] = endPoints[i];
            }
        }
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            points: Object.fromEntries(pointsToUseStart.map((point, i)=>{
                const endPoint = pointsToUseEnd[i];
                return [
                    point.id,
                    {
                        ...point,
                        x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(point.x, endPoint.x, t),
                        y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(point.y, endPoint.y, t)
                    }
                ];
            })),
            scale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.scale, endShape.props.scale, t)
        };
    }
}
function linePointsToArray(shape) {
    return Object.values(shape.props.points).sort(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortByIndex"]);
}
const pathCache = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
function getPathForLineShape(shape) {
    return pathCache.get(shape, ()=>{
        const points = linePointsToArray(shape).map(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From);
        switch(shape.props.spline){
            case "cubic":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"].cubicSplineThroughPoints(points, {
                        endOffsets: 0
                    });
                }
            case "line":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PathBuilder"].lineThroughPoints(points, {
                        endOffsets: 0
                    });
                }
        }
    });
}
function LineShapeSvg({ shape, shouldScale = false, forceSolid = false }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
    const path = getPathForLineShape(shape);
    const { dash, color, size } = shape.props;
    const scaleFactor = 1 / shape.props.scale;
    const scale = shouldScale ? scaleFactor : 1;
    const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_SIZES"][size] * shape.props.scale;
    return path.toSvg({
        style: dash,
        strokeWidth,
        forceSolid,
        randomSeed: shape.id,
        props: {
            transform: `scale(${scale})`,
            stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "solid"),
            fill: "none"
        }
    });
}
;
 //# sourceMappingURL=LineShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/toolStates/Idle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Idle",
    ()=>Idle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
;
class Idle extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "idle";
    onPointerDown(info) {
        this.parent.transition("pointing", info);
    }
    onEnter() {
        this.editor.setCursor({
            type: "cross",
            rotation: 0
        });
    }
    onCancel() {
        this.editor.setCurrentTool("select");
    }
}
;
 //# sourceMappingURL=Idle.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/noteHelpers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLONE_HANDLE_MARGIN",
    ()=>CLONE_HANDLE_MARGIN,
    "NOTE_ADJACENT_POSITION_SNAP_RADIUS",
    ()=>NOTE_ADJACENT_POSITION_SNAP_RADIUS,
    "NOTE_CENTER_OFFSET",
    ()=>NOTE_CENTER_OFFSET,
    "NOTE_SIZE",
    ()=>NOTE_SIZE,
    "getAvailableNoteAdjacentPositions",
    ()=>getAvailableNoteAdjacentPositions,
    "getNoteAdjacentPositions",
    ()=>getNoteAdjacentPositions,
    "getNoteShapeForAdjacentPosition",
    ()=>getNoteShapeForAdjacentPosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
;
const CLONE_HANDLE_MARGIN = 0;
const NOTE_SIZE = 200;
const NOTE_CENTER_OFFSET = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](NOTE_SIZE / 2, NOTE_SIZE / 2);
const NOTE_ADJACENT_POSITION_SNAP_RADIUS = 10;
const BASE_NOTE_POSITIONS = (editor)=>[
        [
            [
                "a1"
            ],
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](NOTE_SIZE * 0.5, NOTE_SIZE * -0.5 - editor.options.adjacentShapeMargin)
        ],
        // t
        [
            [
                "a2"
            ],
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](NOTE_SIZE * 1.5 + editor.options.adjacentShapeMargin, NOTE_SIZE * 0.5)
        ],
        // r
        [
            [
                "a3"
            ],
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](NOTE_SIZE * 0.5, NOTE_SIZE * 1.5 + editor.options.adjacentShapeMargin)
        ],
        // b
        [
            [
                "a4"
            ],
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](NOTE_SIZE * -0.5 - editor.options.adjacentShapeMargin, NOTE_SIZE * 0.5)
        ]
    ];
function getBaseAdjacentNotePositions(editor, scale) {
    if (scale === 1) return BASE_NOTE_POSITIONS(editor);
    const s = NOTE_SIZE * scale;
    const m = editor.options.adjacentShapeMargin * scale;
    return [
        [
            [
                "a1"
            ],
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](s * 0.5, s * -0.5 - m)
        ],
        // t
        [
            [
                "a2"
            ],
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](s * 1.5 + m, s * 0.5)
        ],
        // r
        [
            [
                "a3"
            ],
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](s * 0.5, s * 1.5 + m)
        ],
        // b
        [
            [
                "a4"
            ],
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](s * -0.5 - m, s * 0.5)
        ]
    ];
}
function getNoteAdjacentPositions(editor, pagePoint, pageRotation, growY, extraHeight, scale) {
    return Object.fromEntries(getBaseAdjacentNotePositions(editor, scale).map(([id, v], i)=>{
        const point = v.clone();
        if (i === 0 && extraHeight) {
            point.y -= extraHeight;
        } else if (i === 2 && growY) {
            point.y += growY;
        }
        return [
            id,
            point.rot(pageRotation).add(pagePoint)
        ];
    }));
}
function getAvailableNoteAdjacentPositions(editor, rotation, scale, extraHeight) {
    const selectedShapeIds = new Set(editor.getSelectedShapeIds());
    const minSize = (NOTE_SIZE + editor.options.adjacentShapeMargin + extraHeight) ** 2;
    const allCenters = /* @__PURE__ */ new Map();
    const positions = [];
    for (const shape of editor.getCurrentPageShapes()){
        if (!editor.isShapeOfType(shape, "note") || scale !== shape.props.scale || selectedShapeIds.has(shape.id)) {
            continue;
        }
        const transform = editor.getShapePageTransform(shape.id);
        if (rotation !== transform.rotation()) continue;
        allCenters.set(shape, editor.getShapePageBounds(shape).center);
        positions.push(...Object.values(getNoteAdjacentPositions(editor, transform.point(), rotation, shape.props.growY, extraHeight, scale)));
    }
    const len = positions.length;
    let position;
    for (const [shape, center] of allCenters){
        for(let i = 0; i < len; i++){
            position = positions[i];
            if (!position) continue;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(center, position) > minSize) continue;
            if (editor.isPointInShape(shape, position)) {
                positions[i] = void 0;
            }
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compact"])(positions);
}
function getNoteShapeForAdjacentPosition(editor, shape, center, pageRotation, forceNew = false) {
    let nextNote;
    const allShapesOnPage = editor.getCurrentPageShapesSorted();
    const minDistance = (NOTE_SIZE + editor.options.adjacentShapeMargin ** 2) ** shape.props.scale;
    for(let i = allShapesOnPage.length - 1; i >= 0; i--){
        const otherNote = allShapesOnPage[i];
        if (otherNote.type === "note" && otherNote.id !== shape.id) {
            const otherBounds = editor.getShapePageBounds(otherNote);
            if (otherBounds && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(otherBounds.center, center) < minDistance && editor.isPointInShape(otherNote, center)) {
                nextNote = otherNote;
                break;
            }
        }
    }
    editor.complete();
    if (!nextNote || forceNew) {
        editor.markHistoryStoppingPoint("creating note shape");
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
        editor.createShape({
            id,
            type: "note",
            x: center.x,
            y: center.y,
            rotation: pageRotation,
            opacity: shape.opacity,
            props: {
                // Use the props of the shape we're cloning
                ...shape.props,
                richText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRichText"])(""),
                growY: 0,
                fontSizeAdjustment: 0,
                url: ""
            }
        });
        const createdShape = editor.getShape(id);
        if (!createdShape) return;
        const topLeft = editor.getPointInParentSpace(createdShape, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(center, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Rot(NOTE_CENTER_OFFSET.clone().mul(createdShape.props.scale), pageRotation)));
        editor.updateShape({
            id,
            type: "note",
            x: topLeft.x,
            y: topLeft.y
        });
        nextNote = editor.getShape(id);
    }
    editor.zoomToSelectionIfOffscreen(16, {
        animation: {
            duration: editor.options.animationMediumMs
        },
        inset: 0
    });
    return nextNote;
}
;
 //# sourceMappingURL=noteHelpers.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/toolStates/Pointing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pointing",
    ()=>Pointing,
    "createNoteShape",
    ()=>createNoteShape,
    "getNoteShapeAdjacentPositionOffset",
    ()=>getNoteShapeAdjacentPositionOffset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/BaseBoxShapeTool/children/Pointing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/tools/SelectTool/selectHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/noteHelpers.mjs [app-client] (ecmascript)");
;
;
;
class Pointing extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "pointing";
    dragged = false;
    info = {};
    markId = "";
    shape = {};
    onEnter() {
        const { editor } = this;
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
        this.markId = editor.markHistoryStoppingPoint(`creating_note:${id}`);
        const center = this.editor.inputs.getOriginPagePoint().clone();
        const offset = getNoteShapeAdjacentPositionOffset(this.editor, center, this.editor.user.getIsDynamicResizeMode() ? 1 / this.editor.getZoomLevel() : 1);
        if (offset) {
            center.sub(offset);
        }
        const shape = createNoteShape(this.editor, id, center);
        if (shape) {
            this.shape = shape;
        } else {
            this.cancel();
        }
    }
    onPointerMove(info) {
        if (this.editor.inputs.getIsDragging()) {
            this.editor.setCurrentTool("select.translating", {
                ...info,
                target: "shape",
                shape: this.shape,
                onInteractionEnd: "note",
                isCreating: true,
                creatingMarkId: this.markId,
                onCreate: ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startEditingShapeWithRichText"])(this.editor, this.shape.id);
                }
            });
        }
    }
    onPointerUp() {
        this.complete();
    }
    onInterrupt() {
        this.cancel();
    }
    onComplete() {
        this.complete();
    }
    onCancel() {
        this.cancel();
    }
    complete() {
        if (this.editor.getInstanceState().isToolLocked) {
            this.parent.transition("idle");
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startEditingShapeWithRichText"])(this.editor, this.shape.id, {
                info: this.info
            });
        }
    }
    cancel() {
        this.editor.bailToMark(this.markId);
        this.parent.transition("idle", this.info);
    }
}
function getNoteShapeAdjacentPositionOffset(editor, center, scale) {
    let min = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_ADJACENT_POSITION_SNAP_RADIUS"] / editor.getZoomLevel();
    let offset;
    for (const pit of (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAvailableNoteAdjacentPositions"])(editor, 0, scale, 0)){
        const deltaToPit = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(center, pit);
        const dist = deltaToPit.len();
        if (dist < min) {
            min = dist;
            offset = deltaToPit;
        }
    }
    return offset;
}
function createNoteShape(editor, id, center) {
    editor.createShape({
        id,
        type: "note",
        x: center.x,
        y: center.y,
        props: {
            scale: editor.user.getIsDynamicResizeMode() ? 1 / editor.getZoomLevel() : 1
        }
    });
    const shape = editor.getShape(id);
    if (!shape) return;
    editor.select(id);
    const bounds = editor.getShapeGeometry(shape).bounds;
    const newPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](shape.x - bounds.width / 2, shape.y - bounds.height / 2), editor);
    editor.updateShapes([
        {
            id,
            type: "note",
            x: newPoint.x,
            y: newPoint.y
        }
    ]);
    return editor.getShape(id);
}
;
 //# sourceMappingURL=Pointing.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/NoteShapeTool.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteShapeTool",
    ()=>NoteShapeTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/toolStates/Idle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/toolStates/Pointing.mjs [app-client] (ecmascript)");
;
;
;
class NoteShapeTool extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "note";
    static initial = "idle";
    static children() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Idle"],
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pointing"]
        ];
    }
    shapeType = "note";
}
;
 //# sourceMappingURL=NoteShapeTool.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/NoteShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoteShapeUtil",
    ()=>NoteShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Group2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Rectangle2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/ShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/richText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeScaled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/shared/resizeScaled.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/tools/SelectTool/selectHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/ui/hooks/useTranslation/useTranslation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/richText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/text.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/HyperlinkButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/RichTextLabel.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditablePlainText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEditablePlainText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEfficientZoomThreshold.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/note/noteHelpers.mjs [app-client] (ecmascript)");
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
;
;
;
;
class NoteShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeUtil"] {
    static type = "note";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noteShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noteShapeMigrations"];
    options = {
        resizeMode: "none"
    };
    canEdit() {
        return true;
    }
    hideResizeHandles() {
        const { resizeMode } = this.options;
        switch(resizeMode){
            case "none":
                {
                    return true;
                }
            case "scale":
                {
                    return false;
                }
            default:
                {
                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(resizeMode);
                }
        }
    }
    isAspectRatioLocked() {
        return this.options.resizeMode === "scale";
    }
    hideSelectionBoundsFg() {
        return false;
    }
    getDefaultProps() {
        return {
            color: "black",
            richText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRichText"])(""),
            size: "m",
            font: "draw",
            align: "middle",
            verticalAlign: "middle",
            labelColor: "black",
            growY: 0,
            fontSizeAdjustment: 0,
            url: "",
            scale: 1
        };
    }
    getGeometry(shape) {
        const { labelHeight, labelWidth } = getLabelSize(this.editor, shape);
        const { scale } = shape.props;
        const lh = labelHeight * scale;
        const lw = labelWidth * scale;
        const nw = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] * scale;
        const nh = getNoteHeight(shape);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group2d"]({
            children: [
                new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rectangle2d"]({
                    width: nw,
                    height: nh,
                    isFilled: true
                }),
                new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rectangle2d"]({
                    x: shape.props.align === "start" ? 0 : shape.props.align === "end" ? nw - lw : (nw - lw) / 2,
                    y: shape.props.verticalAlign === "start" ? 0 : shape.props.verticalAlign === "end" ? nh - lh : (nh - lh) / 2,
                    width: lw,
                    height: lh,
                    isFilled: true,
                    isLabel: true,
                    excludeFromShapeBounds: true
                })
            ]
        });
    }
    getHandles(shape) {
        const { scale } = shape.props;
        const isCoarsePointer = this.editor.getInstanceState().isCoarsePointer;
        if (isCoarsePointer) return [];
        const zoom = this.editor.getEfficientZoomLevel();
        if (zoom * scale < 0.25) return [];
        const nh = getNoteHeight(shape);
        const nw = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] * scale;
        const offset = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLONE_HANDLE_MARGIN"] / zoom * scale;
        if (zoom * scale < 0.5) {
            return [
                {
                    id: "bottom",
                    index: "a3",
                    type: "clone",
                    x: nw / 2,
                    y: nh + offset
                }
            ];
        }
        return [
            {
                id: "top",
                index: "a1",
                type: "clone",
                x: nw / 2,
                y: -offset
            },
            {
                id: "right",
                index: "a2",
                type: "clone",
                x: nw + offset,
                y: nh / 2
            },
            {
                id: "bottom",
                index: "a3",
                type: "clone",
                x: nw / 2,
                y: nh + offset
            },
            {
                id: "left",
                index: "a4",
                type: "clone",
                x: -offset,
                y: nh / 2
            }
        ];
    }
    onResize(shape, info) {
        const { resizeMode } = this.options;
        switch(resizeMode){
            case "none":
                {
                    return void 0;
                }
            case "scale":
                {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeScaled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resizeScaled"])(shape, info);
                }
            default:
                {
                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(resizeMode);
                }
        }
    }
    getText(shape) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderPlaintextFromRichText"])(this.editor, shape.props.richText);
    }
    getFontFaces(shape) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFontsFromRichText"])(this.editor, shape.props.richText, {
            family: `tldraw_${shape.props.font}`,
            weight: "normal",
            style: "normal"
        });
    }
    component(shape) {
        const { id, type, props: { labelColor, scale, color, font, size, align, richText, verticalAlign, fontSizeAdjustment } } = shape;
        const handleKeyDown = useNoteKeydownHandler(id);
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
        const nw = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] * scale;
        const nh = getNoteHeight(shape);
        const rotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("shape rotation", {
            "useValue[rotation]": ()=>this.editor.getShapePageTransform(id)?.rotation() ?? 0
        }["useValue[rotation]"], [
            this.editor
        ]);
        const isDarkMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("dark mode", {
            "useValue[isDarkMode]": ()=>this.editor.user.getIsDarkMode()
        }["useValue[isDarkMode]"], [
            this.editor
        ]);
        let hideShadows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEfficientZoomThreshold"])(scale * 0.25);
        if (isDarkMode) hideShadows = true;
        const isSelected = shape.id === this.editor.getOnlySelectedShapeId();
        const isReadyForEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditablePlainText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsReadyForEditing"])(this.editor, shape.id);
        const isEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(richText);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    id,
                    className: "tl-note__container",
                    style: {
                        width: nw,
                        height: nh,
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "noteFill"),
                        borderBottom: hideShadows ? isDarkMode ? `${2 * scale}px solid rgb(20, 20, 20)` : `${2 * scale}px solid rgb(144, 144, 144)` : "none",
                        boxShadow: hideShadows ? "none" : getNoteShadow(shape.id, rotation, scale)
                    },
                    children: (isSelected || isReadyForEditing || !isEmpty) && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextLabel"], {
                        shapeId: id,
                        type,
                        font,
                        fontSize: (fontSizeAdjustment || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FONT_SIZES"][size]) * scale,
                        lineHeight: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"].lineHeight,
                        align,
                        verticalAlign,
                        richText,
                        isSelected,
                        labelColor: labelColor === "black" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "noteText") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, labelColor, "fill"),
                        wrap: true,
                        padding: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * scale,
                        hasCustomTabBehavior: true,
                        showTextOutline: false,
                        onKeyDown: handleKeyDown
                    })
                }),
                "url" in shape.props && shape.props.url && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HyperlinkButton"], {
                    url: shape.props.url
                })
            ]
        });
    }
    indicator(shape) {
        const { scale } = shape.props;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
            rx: scale,
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] * scale),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(getNoteHeight(shape))
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const { scale } = shape.props;
        const path = new Path2D();
        path.roundRect(0, 0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] * scale, getNoteHeight(shape), scale);
        return path;
    }
    toSvg(shape, ctx) {
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultColorTheme"])({
            isDarkMode: ctx.isDarkMode
        });
        const bounds = getBoundsForSVG(shape);
        const textLabel = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextSVG"], {
            fontSize: shape.props.fontSizeAdjustment || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FONT_SIZES"][shape.props.size],
            font: shape.props.font,
            align: shape.props.align,
            verticalAlign: shape.props.verticalAlign,
            richText: shape.props.richText,
            labelColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.color, "noteText"),
            bounds,
            padding: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"],
            showTextOutline: false
        });
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                    x: 5,
                    y: 5,
                    rx: 1,
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] - 10,
                    height: bounds.h,
                    fill: "rgba(0,0,0,.1)"
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                    rx: 1,
                    width: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"],
                    height: bounds.h,
                    fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.color, "noteFill")
                }),
                textLabel
            ]
        });
    }
    onBeforeCreate(next) {
        return getNoteSizeAdjustments(this.editor, next);
    }
    onBeforeUpdate(prev, next) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEqual"])(prev.props.richText, next.props.richText) && prev.props.font === next.props.font && prev.props.size === next.props.size) {
            return;
        }
        return getNoteSizeAdjustments(this.editor, next);
    }
    getInterpolatedProps(startShape, endShape, t) {
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            scale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.scale, endShape.props.scale, t)
        };
    }
}
function getNoteSizeAdjustments(editor, shape) {
    const { labelHeight, fontSizeAdjustment } = getLabelSize(editor, shape);
    const growY = Math.max(0, labelHeight - __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"]);
    if (growY !== shape.props.growY || fontSizeAdjustment !== shape.props.fontSizeAdjustment) {
        return {
            ...shape,
            props: {
                ...shape.props,
                growY,
                fontSizeAdjustment
            }
        };
    }
}
function getNoteLabelSize(editor, shape) {
    const { richText } = shape.props;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(richText)) {
        const minHeight = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FONT_SIZES"][shape.props.size] * __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"].lineHeight + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2;
        return {
            labelHeight: minHeight,
            labelWidth: 100,
            fontSizeAdjustment: 0
        };
    }
    const unadjustedFontSize = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_FONT_SIZES"][shape.props.size];
    let fontSizeAdjustment = 0;
    let iterations = 0;
    let labelHeight = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"];
    let labelWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"];
    const FUZZ = 1;
    do {
        fontSizeAdjustment = Math.min(unadjustedFontSize, unadjustedFontSize - iterations);
        const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderHtmlFromRichTextForMeasurement"])(editor, richText);
        const nextTextSize = editor.textMeasure.measureHtml(html, {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"],
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_FAMILIES"][shape.props.font],
            fontSize: fontSizeAdjustment,
            maxWidth: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] - __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2 - FUZZ,
            disableOverflowWrapBreaking: true,
            measureScrollWidth: true
        });
        labelHeight = nextTextSize.h + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2;
        labelWidth = nextTextSize.w + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2;
        if (fontSizeAdjustment <= 14) {
            const html2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderHtmlFromRichTextForMeasurement"])(editor, richText);
            const nextTextSizeWithOverflowBreak = editor.textMeasure.measureHtml(html2, {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"],
                fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_FAMILIES"][shape.props.font],
                fontSize: fontSizeAdjustment,
                maxWidth: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] - __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2 - FUZZ
            });
            labelHeight = nextTextSizeWithOverflowBreak.h + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2;
            labelWidth = nextTextSizeWithOverflowBreak.w + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LABEL_PADDING"] * 2;
            break;
        }
        if (nextTextSize.scrollWidth.toFixed(0) === nextTextSize.w.toFixed(0)) {
            break;
        }
    }while (iterations++ < 50)
    return {
        labelHeight,
        labelWidth,
        fontSizeAdjustment
    };
}
const labelSizesForNote = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
function getLabelSize(editor, shape) {
    return labelSizesForNote.get(shape, ()=>getNoteLabelSize(editor, shape));
}
function useNoteKeydownHandler(id) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const translation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$ui$2f$hooks$2f$useTranslation$2f$useTranslation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TranslationsContext"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNoteKeydownHandler.useCallback": (e)=>{
            const shape = editor.getShape(id);
            if (!shape) return;
            const isTab = e.key === "Tab";
            const isCmdEnter = (e.metaKey || e.ctrlKey) && e.key === "Enter";
            if (isTab || isCmdEnter) {
                e.preventDefault();
                const pageTransform = editor.getShapePageTransform(id);
                const pageRotation = pageTransform.rotation();
                const isRTL = !!(translation?.dir === "rtl" || // todo: can we check a partial of the text, so that we don't have to render the whole thing?
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRightToLeftLanguage"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderPlaintextFromRichText"])(editor, shape.props.richText)));
                const offsetLength = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] + editor.options.adjacentShapeMargin + // If we're growing down, we need to account for the current shape's growY
                (isCmdEnter && !e.shiftKey ? shape.props.growY : 0)) * shape.props.scale;
                const adjacentCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](isTab ? e.shiftKey != isRTL ? -1 : 1 : 0, isCmdEnter ? e.shiftKey ? -1 : 1 : 0).mul(offsetLength).add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_CENTER_OFFSET"].clone().mul(shape.props.scale)).rot(pageRotation).add(pageTransform.point());
                const newNote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNoteShapeForAdjacentPosition"])(editor, shape, adjacentCenter, pageRotation);
                if (newNote) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startEditingShapeWithRichText"])(editor, newNote, {
                        selectAll: true
                    });
                }
            }
        }
    }["useNoteKeydownHandler.useCallback"], [
        id,
        editor,
        translation?.dir
    ]);
}
function getNoteHeight(shape) {
    return (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] + shape.props.growY) * shape.props.scale;
}
function getNoteShadow(id, rotation, scale) {
    const random = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rng"])(id);
    const lift = Math.abs(random()) + 0.5;
    const oy = Math.cos(rotation);
    const a = 5 * scale;
    const b = 4 * scale;
    const c = 6 * scale;
    const d = 7 * scale;
    return `0px ${a - lift}px ${a}px -${a}px rgba(15, 23, 31, .6),
	0px ${(b + lift * d) * Math.max(0, oy)}px ${c + lift * d}px -${b + lift * c}px rgba(15, 23, 31, ${(0.3 + lift * 0.1).toFixed(2)}), 
	0px ${48 * scale}px ${10 * scale}px -${10 * scale}px inset rgba(15, 23, 44, ${((0.022 + random() * 5e-3) * ((1 + oy) / 2)).toFixed(2)})`;
}
function getBoundsForSVG(shape) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"](0, 0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$note$2f$noteHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOTE_SIZE"] + shape.props.growY);
}
;
 //# sourceMappingURL=NoteShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/toolStates/Idle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Idle",
    ()=>Idle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$selection$2d$logic$2f$updateHoveredShapeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/tools/selection-logic/updateHoveredShapeId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/tools/SelectTool/selectHelpers.mjs [app-client] (ecmascript)");
;
;
;
class Idle extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "idle";
    onPointerMove(info) {
        switch(info.target){
            case "shape":
            case "canvas":
                {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$selection$2d$logic$2f$updateHoveredShapeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateHoveredShapeId"])(this.editor);
                }
        }
    }
    onPointerDown(info) {
        this.parent.transition("pointing", info);
    }
    onEnter() {
        this.editor.setCursor({
            type: "cross",
            rotation: 0
        });
    }
    onExit() {
        __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$selection$2d$logic$2f$updateHoveredShapeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateHoveredShapeId"].cancel();
    }
    onKeyDown(info) {
        if (info.key === "Enter") {
            const onlySelectedShape = this.editor.getOnlySelectedShape();
            if (!this.editor.canEditShape(onlySelectedShape)) return;
            this.editor.setCurrentTool("select");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startEditingShapeWithRichText"])(this.editor, onlySelectedShape.id, {
                info
            });
        }
    }
    onCancel() {
        this.editor.setCurrentTool("select");
    }
}
;
 //# sourceMappingURL=Idle.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/toolStates/Pointing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pointing",
    ()=>Pointing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/BaseBoxShapeTool/children/Pointing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/tools/SelectTool/selectHelpers.mjs [app-client] (ecmascript)");
;
;
class Pointing extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "pointing";
    shape;
    markId = "";
    enterTime = 0;
    onEnter() {
        this.enterTime = Date.now();
    }
    onExit() {
        this.editor.setHintingShapes([]);
    }
    onPointerMove(info) {
        if (Date.now() - this.enterTime < 150) return;
        const { editor } = this;
        const isPointing = editor.inputs.getIsPointing();
        if (!isPointing) return;
        const originPagePoint = editor.inputs.getOriginPagePoint();
        const currentPagePoint = editor.inputs.getCurrentPagePoint();
        const currentDragDist = Math.abs(originPagePoint.x - currentPagePoint.x);
        const baseMinDragDistForFixedWidth = Math.sqrt(editor.getInstanceState().isCoarsePointer ? editor.options.coarseDragDistanceSquared : editor.options.dragDistanceSquared);
        const minSquaredDragDist = baseMinDragDistForFixedWidth * 6 / editor.getZoomLevel();
        if (currentDragDist > minSquaredDragDist) {
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
            this.markId = editor.markHistoryStoppingPoint(`creating_text:${id}`);
            const shape = this.createTextShape(id, originPagePoint, false, currentDragDist);
            if (!shape) {
                this.cancel();
                return;
            }
            this.shape = editor.getShape(shape);
            editor.select(id);
            const scale = this.editor.user.getIsDynamicResizeMode() ? 1 / this.editor.getZoomLevel() : 1;
            editor.setCurrentTool("select.resizing", {
                ...info,
                target: "selection",
                handle: "right",
                isCreating: true,
                creatingMarkId: this.markId,
                // Make sure the cursor offset takes into account how far we've already dragged
                creationCursorOffset: {
                    x: currentDragDist * scale,
                    y: 1
                },
                onInteractionEnd: "text",
                onCreate: ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startEditingShapeWithRichText"])(editor, shape.id);
                }
            });
        }
    }
    onPointerUp() {
        this.complete();
    }
    onComplete() {
        this.cancel();
    }
    onCancel() {
        this.cancel();
    }
    onInterrupt() {
        this.cancel();
    }
    complete() {
        this.editor.markHistoryStoppingPoint("creating text shape");
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createShapeId"])();
        const originPagePoint = this.editor.inputs.getOriginPagePoint();
        const shape = this.createTextShape(id, originPagePoint, true, 20);
        if (!shape) return;
        this.editor.select(id);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startEditingShapeWithRichText"])(this.editor, id);
    }
    cancel() {
        this.parent.transition("idle");
        this.editor.bailToMark(this.markId);
    }
    createTextShape(id, point, autoSize, width) {
        this.editor.createShape({
            id,
            type: "text",
            x: point.x,
            y: point.y,
            props: {
                richText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRichText"])(""),
                autoSize,
                w: width,
                scale: this.editor.user.getIsDynamicResizeMode() ? 1 / this.editor.getZoomLevel() : 1
            }
        });
        const shape = this.editor.getShape(id);
        if (!shape) {
            this.cancel();
            return;
        }
        const bounds = this.editor.getShapePageBounds(shape);
        const delta = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"]();
        if (autoSize) {
            switch(shape.props.textAlign){
                case "start":
                    {
                        delta.x = 0;
                        break;
                    }
                case "middle":
                    {
                        delta.x = -bounds.width / 2;
                        break;
                    }
                case "end":
                    {
                        delta.x = -bounds.width;
                        break;
                    }
            }
        } else {
            delta.x = 0;
        }
        delta.y = -bounds.height / 2;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isShapeId"])(shape.parentId)) {
            const transform = this.editor.getShapeParentTransform(shape);
            delta.rot(-transform.rotation());
        }
        const shapeX = shape.x + delta.x;
        const shapeY = shape.y + delta.y;
        if (this.editor.getInstanceState().isGridMode) {
            const topLeft = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](shapeX, shapeY);
            const gridSnappedPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(topLeft, this.editor);
            const gridDelta = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(topLeft, gridSnappedPoint);
            this.editor.updateShape({
                ...shape,
                x: shapeX - gridDelta.x,
                y: shapeY - gridDelta.y
            });
        } else {
            this.editor.updateShape({
                ...shape,
                x: shapeX,
                y: shapeY
            });
        }
        return shape;
    }
}
;
 //# sourceMappingURL=Pointing.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/TextShapeTool.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextShapeTool",
    ()=>TextShapeTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$text$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/toolStates/Idle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$text$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/toolStates/Pointing.mjs [app-client] (ecmascript)");
;
;
;
class TextShapeTool extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "text";
    static initial = "idle";
    static children() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$text$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Idle"],
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$text$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pointing"]
        ];
    }
    shapeType = "text";
}
;
 //# sourceMappingURL=TextShapeTool.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/RichTextArea.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RichTextArea",
    ()=>RichTextArea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tiptap/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEvent.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useSafeId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
const RichTextArea = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(function RichTextArea2({ shapeId, isEditing, richText, handleFocus, handleChange, handleBlur, handleKeyDown, handleDoubleClick, hasCustomTabBehavior, handlePaste }, ref) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const tipTapId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUniqueSafeId"])("tip-tap-editor");
    const tipTapConfig = editor.getTextOptions().tipTapConfig;
    const rInitialRichText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(richText);
    const rTextEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rTextEditorEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "RichTextArea.RichTextArea2.useLayoutEffect": ()=>{
            if (!rTextEditor.current) {
                rInitialRichText.current = richText;
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEqual"])(rInitialRichText.current, richText)) {
                rTextEditor.current.commands.setContent(richText);
            }
        }
    }["RichTextArea.RichTextArea2.useLayoutEffect"], [
        richText
    ]);
    const rCreateInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        selectAll: false,
        caretPosition: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "RichTextArea.RichTextArea2.useLayoutEffect": ()=>{
            function selectAllIfEditing(event) {
                if (event.shapeId === editor.getEditingShapeId()) {
                    rCreateInfo.current.selectAll = true;
                }
            }
            function placeCaret(event) {
                if (event.shapeId === editor.getEditingShapeId()) {
                    rCreateInfo.current.caretPosition = event.point;
                }
            }
            editor.on("select-all-text", selectAllIfEditing);
            editor.on("place-caret", placeCaret);
            return ({
                "RichTextArea.RichTextArea2.useLayoutEffect": ()=>{
                    editor.off("select-all-text", selectAllIfEditing);
                    editor.off("place-caret", placeCaret);
                }
            })["RichTextArea.RichTextArea2.useLayoutEffect"];
        }
    }["RichTextArea.RichTextArea2.useLayoutEffect"], [
        editor,
        isEditing
    ]);
    const onChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(handleChange);
    const onKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(handleKeyDown);
    const onFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(handleFocus);
    const onBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(handleBlur);
    const onDoubleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(handleDoubleClick);
    const onPaste = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEvent$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(handlePaste);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "RichTextArea.RichTextArea2.useLayoutEffect": ()=>{
            if (!isEditing || !tipTapConfig || !rTextEditorEl.current) return;
            const { editorProps, ...restOfTipTapConfig } = tipTapConfig;
            const textEditorInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Editor"]({
                element: rTextEditorEl.current,
                autofocus: true,
                editable: isEditing,
                onUpdate: {
                    "RichTextArea.RichTextArea2.useLayoutEffect": (props)=>{
                        const content = props.editor.state.doc.toJSON();
                        rInitialRichText.current = content;
                        onChange({
                            richText: content
                        });
                    }
                }["RichTextArea.RichTextArea2.useLayoutEffect"],
                onFocus,
                onBlur,
                // onCreate is called after a `setTimeout(0)`
                onCreate: {
                    "RichTextArea.RichTextArea2.useLayoutEffect": (props)=>{
                        if (editor.getEditingShapeId() !== shapeId) return;
                        const textEditor = props.editor;
                        editor.setRichTextEditor(textEditor);
                        const { selectAll, caretPosition } = rCreateInfo.current;
                        if (selectAll) {
                            textEditor.chain().focus().selectAll().run();
                        } else if (caretPosition) {
                            const pos = textEditor.view.posAtCoords({
                                left: caretPosition.x,
                                top: caretPosition.y
                            })?.pos;
                            if (pos) {
                                textEditor.chain().focus().setTextSelection(pos).run();
                            } else {
                                textEditor.chain().focus().selectAll().run();
                            }
                        }
                    }
                }["RichTextArea.RichTextArea2.useLayoutEffect"],
                editorProps: {
                    handleKeyDown: {
                        "RichTextArea.RichTextArea2.useLayoutEffect": (view, event)=>{
                            if (!hasCustomTabBehavior && event.key === "Tab") {
                                handleTab(editor, view, event);
                            }
                            onKeyDown(event);
                        }
                    }["RichTextArea.RichTextArea2.useLayoutEffect"],
                    handlePaste: {
                        "RichTextArea.RichTextArea2.useLayoutEffect": (view, event)=>{
                            onPaste(event);
                            if (event.defaultPrevented) return true;
                        }
                    }["RichTextArea.RichTextArea2.useLayoutEffect"],
                    handleDoubleClick: {
                        "RichTextArea.RichTextArea2.useLayoutEffect": (_view, _pos, event)=>onDoubleClick(event)
                    }["RichTextArea.RichTextArea2.useLayoutEffect"],
                    ...editorProps
                },
                coreExtensionOptions: {
                    clipboardTextSerializer: {
                        blockSeparator: "\n"
                    }
                },
                // N.B. We disable the text direction in the core list here,
                // but we add it back in again in our own extensions list so that
                // people can omit/override it if they want to.
                enableCoreExtensions: {
                    textDirection: false
                },
                textDirection: "auto",
                ...restOfTipTapConfig,
                content: rInitialRichText.current
            });
            const timeout = editor.timers.setTimeout({
                "RichTextArea.RichTextArea2.useLayoutEffect.timeout": ()=>{
                    if (rCreateInfo.current.caretPosition || rCreateInfo.current.selectAll) {
                        textEditorInstance.commands.focus();
                    } else {
                        textEditorInstance.commands.focus("end");
                    }
                    rCreateInfo.current.selectAll = false;
                    rCreateInfo.current.caretPosition = null;
                }
            }["RichTextArea.RichTextArea2.useLayoutEffect.timeout"], 100);
            rTextEditor.current = textEditorInstance;
            return ({
                "RichTextArea.RichTextArea2.useLayoutEffect": ()=>{
                    rTextEditor.current = null;
                    clearTimeout(timeout);
                    textEditorInstance.destroy();
                }
            })["RichTextArea.RichTextArea2.useLayoutEffect"];
        }
    }["RichTextArea.RichTextArea2.useLayoutEffect"], [
        isEditing,
        tipTapConfig,
        onFocus,
        onBlur,
        onDoubleClick,
        onChange,
        onPaste,
        onKeyDown,
        editor,
        shapeId,
        hasCustomTabBehavior
    ]);
    if (!isEditing || !tipTapConfig) {
        return null;
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        id: tipTapId,
        ref,
        tabIndex: -1,
        "data-testid": "rich-text-area",
        className: "tl-rich-text tl-text tl-text-input",
        onContextMenu: isEditing ? (e)=>e.stopPropagation() : void 0,
        onPointerDownCapture: (e)=>e.stopPropagation(),
        onTouchEnd: (e)=>e.stopPropagation(),
        onDragStart: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preventDefault"],
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: "tl-rich-text",
            ref: rTextEditorEl
        })
    });
});
function handleTab(editor, view, event) {
    event.preventDefault();
    const textEditor = editor.getRichTextEditor();
    if (textEditor?.isActive("bulletList") || textEditor?.isActive("orderedList")) return;
    const { state, dispatch } = view;
    const { $from, $to } = state.selection;
    const isShift = event.shiftKey;
    let tr = state.tr;
    let pos = $to.end();
    while(pos >= $from.start()){
        const line = state.doc.resolve(pos).blockRange();
        if (!line) break;
        const lineStart = line.start;
        const lineEnd = line.end;
        const lineText = state.doc.textBetween(lineStart, lineEnd, "\n");
        let isInList = false;
        state.doc.nodesBetween(lineStart, lineEnd, (node)=>{
            if (node.type.name === "bulletList" || node.type.name === "orderedList") {
                isInList = true;
                return false;
            }
        });
        if (!isInList) {
            if (!isShift) {
                tr = tr.insertText("	", lineStart + 1);
            } else {
                if (lineText.startsWith("	")) {
                    tr = tr.delete(lineStart + 1, lineStart + 2);
                }
            }
        }
        pos = lineStart - 1;
    }
    const mappedSelection = state.selection.map(tr.doc, tr.mapping);
    tr.setSelection(mappedSelection);
    if (tr.docChanged) {
        dispatch(tr);
    }
}
;
 //# sourceMappingURL=RichTextArea.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/TextShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextShapeUtil",
    ()=>TextShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Rectangle2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/ShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/store/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/richText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeScaled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/shared/resizeScaled.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/richText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/RichTextLabel.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const sizeCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createComputedCache"])("text size", (editor, shape)=>{
    editor.fonts.trackFontsForShape(shape);
    return getTextSize(editor, shape.props);
}, {
    areRecordsEqual: (a, b)=>a.props === b.props
});
class TextShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeUtil"] {
    static type = "text";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textShapeMigrations"];
    options = {
        extraArrowHorizontalPadding: 10,
        showTextOutline: true
    };
    getDefaultProps() {
        return {
            color: "black",
            size: "m",
            w: 8,
            font: "draw",
            textAlign: "start",
            autoSize: true,
            scale: 1,
            richText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRichText"])("")
        };
    }
    getMinDimensions(shape) {
        return sizeCache.get(this.editor, shape.id);
    }
    getGeometry(shape, opts) {
        const { scale } = shape.props;
        const { width, height } = this.getMinDimensions(shape);
        const context = opts?.context ?? "none";
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rectangle2d"]({
            x: (context === "@tldraw/arrow-without-arrowhead" ? -this.options.extraArrowHorizontalPadding : 0) * scale,
            width: (width + (context === "@tldraw/arrow-without-arrowhead" ? this.options.extraArrowHorizontalPadding * 2 : 0)) * scale,
            height: height * scale,
            isFilled: true,
            isLabel: true
        });
    }
    getFontFaces(shape) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFontsFromRichText"])(this.editor, shape.props.richText, {
            family: `tldraw_${shape.props.font}`,
            weight: "normal",
            style: "normal"
        });
    }
    getText(shape) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderPlaintextFromRichText"])(this.editor, shape.props.richText);
    }
    canEdit() {
        return true;
    }
    isAspectRatioLocked() {
        return true;
    }
    // WAIT NO THIS IS HARD CODED IN THE RESIZE HANDLER
    component(shape) {
        const { id, props: { font, size, richText, color, scale, textAlign } } = shape;
        const { width, height } = this.getMinDimensions(shape);
        const isSelected = shape.id === this.editor.getOnlySelectedShapeId();
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
        const handleKeyDown = useTextShapeKeydownHandler(id);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextLabel"], {
            shapeId: id,
            classNamePrefix: "tl-text-shape",
            type: "text",
            font,
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_SIZES"][size],
            lineHeight: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"].lineHeight,
            align: textAlign,
            verticalAlign: "middle",
            richText,
            labelColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "solid"),
            isSelected,
            textWidth: width,
            textHeight: height,
            showTextOutline: this.options.showTextOutline,
            style: {
                transform: `scale(${scale})`,
                transformOrigin: "top left"
            },
            wrap: true,
            onKeyDown: handleKeyDown
        });
    }
    indicator(shape) {
        const bounds = this.editor.getShapeGeometry(shape).bounds;
        const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
        if (shape.props.autoSize && editor.getEditingShapeId() === shape.id) return null;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(bounds.width),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(bounds.height)
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        if (shape.props.autoSize && this.editor.getEditingShapeId() === shape.id) return void 0;
        const bounds = this.editor.getShapeGeometry(shape).bounds;
        const path = new Path2D();
        path.rect(0, 0, bounds.width, bounds.height);
        return path;
    }
    toSvg(shape, ctx) {
        const bounds = this.editor.getShapeGeometry(shape).bounds;
        const width = bounds.width / (shape.props.scale ?? 1);
        const height = bounds.height / (shape.props.scale ?? 1);
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultColorTheme"])(ctx);
        const exportBounds = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"](0, 0, width, height);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextSVG"], {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_SIZES"][shape.props.size],
            font: shape.props.font,
            align: shape.props.textAlign,
            verticalAlign: "middle",
            richText: shape.props.richText,
            labelColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.color, "solid"),
            bounds: exportBounds,
            padding: 0,
            showTextOutline: this.options.showTextOutline
        });
    }
    onResize(shape, info) {
        const { newPoint, initialBounds, initialShape, scaleX, handle } = info;
        if (info.mode === "scale_shape" || handle !== "right" && handle !== "left") {
            return {
                id: shape.id,
                type: shape.type,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeScaled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resizeScaled"])(shape, info)
            };
        } else {
            const nextWidth = Math.max(1, Math.abs(initialBounds.width * scaleX));
            const { x, y } = scaleX < 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(newPoint, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].FromAngle(shape.rotation).mul(nextWidth)) : newPoint;
            return {
                id: shape.id,
                type: shape.type,
                x,
                y,
                props: {
                    w: nextWidth / initialShape.props.scale,
                    autoSize: false
                }
            };
        }
    }
    onEditEnd(shape) {
        const trimmedText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderPlaintextFromRichText"])(this.editor, shape.props.richText).trimEnd();
        if (trimmedText.length === 0) {
            this.editor.deleteShapes([
                shape.id
            ]);
        }
    }
    onBeforeUpdate(prev, next) {
        if (!next.props.autoSize) return;
        const styleDidChange = prev.props.size !== next.props.size || prev.props.textAlign !== next.props.textAlign || prev.props.font !== next.props.font || prev.props.scale !== 1 && next.props.scale === 1;
        const textDidChange = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEqual"])(prev.props.richText, next.props.richText);
        if (!styleDidChange && !textDidChange) return;
        const boundsA = this.getMinDimensions(prev);
        const boundsB = getTextSize(this.editor, next.props);
        const wA = boundsA.width * prev.props.scale;
        const hA = boundsA.height * prev.props.scale;
        const wB = boundsB.width * next.props.scale;
        const hB = boundsB.height * next.props.scale;
        let delta;
        switch(next.props.textAlign){
            case "middle":
                {
                    delta = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"]((wB - wA) / 2, textDidChange ? 0 : (hB - hA) / 2);
                    break;
                }
            case "end":
                {
                    delta = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](wB - wA, textDidChange ? 0 : (hB - hA) / 2);
                    break;
                }
            default:
                {
                    if (textDidChange) break;
                    delta = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, (hB - hA) / 2);
                    break;
                }
        }
        if (delta) {
            delta.rot(next.rotation);
            const { x, y } = next;
            return {
                ...next,
                x: x - delta.x,
                y: y - delta.y,
                props: {
                    ...next.props,
                    w: wB
                }
            };
        } else {
            return {
                ...next,
                props: {
                    ...next.props,
                    w: wB
                }
            };
        }
    }
}
function getTextSize(editor, props) {
    const { font, richText, size, w } = props;
    const minWidth = 16;
    const fontSize = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_SIZES"][size];
    const maybeFixedWidth = props.autoSize ? null : Math.max(minWidth, Math.floor(w));
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderHtmlFromRichTextForMeasurement"])(editor, richText);
    const result = editor.textMeasure.measureHtml(html, {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"],
        fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_FAMILIES"][font],
        fontSize,
        maxWidth: maybeFixedWidth
    });
    return {
        width: maybeFixedWidth ?? Math.max(minWidth, result.w + 1),
        height: Math.max(fontSize, result.h)
    };
}
function useTextShapeKeydownHandler(id) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTextShapeKeydownHandler.useCallback": (e)=>{
            if (editor.getEditingShapeId() !== id) return;
            switch(e.key){
                case "Enter":
                    {
                        if (e.ctrlKey || e.metaKey) {
                            editor.complete();
                        }
                        break;
                    }
            }
        }
    }["useTextShapeKeydownHandler.useCallback"], [
        editor,
        id
    ]);
}
;
 //# sourceMappingURL=TextShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/PlainTextArea.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlainTextArea",
    ()=>PlainTextArea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
const PlainTextArea = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(function TextArea({ isEditing, text, handleFocus, handleChange, handleKeyDown, handlePaste, handleBlur, handleInputPointerDown, handleDoubleClick }, ref) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const onChange = (e)=>{
        handleChange({
            plaintext: e.target.value
        });
    };
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("textarea", {
        ref,
        className: "tl-text tl-text-input",
        name: "text",
        tabIndex: -1,
        disabled: !isEditing,
        readOnly: !isEditing,
        autoComplete: "off",
        autoCapitalize: "off",
        autoCorrect: "off",
        autoSave: "off",
        placeholder: "",
        spellCheck: "true",
        wrap: "off",
        dir: "auto",
        defaultValue: text,
        onFocus: handleFocus,
        onChange,
        onKeyDown: (e)=>handleKeyDown(e.nativeEvent),
        onBlur: handleBlur,
        onTouchEnd: editor.markEventAsHandled,
        onContextMenu: isEditing ? (e)=>e.stopPropagation() : void 0,
        onPointerDown: handleInputPointerDown,
        onPaste: handlePaste,
        onDoubleClick: handleDoubleClick,
        onDragStart: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preventDefault"]
    });
});
;
 //# sourceMappingURL=PlainTextArea.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/embed/EmbedShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbedShapeUtil",
    ()=>EmbedShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/BaseBoxShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/HTMLContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Rectangle2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeBox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/shared/resizeBox.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useIsEditing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/types/SvgExportContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$defaultEmbedDefinitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/defaultEmbedDefinitions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$embeds$2f$embeds$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/embeds/embeds.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$BookmarkShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/bookmark/BookmarkShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/bookmark/bookmarks.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$rotated$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/rotated-box-shadow.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const getSandboxPermissions = (permissions)=>{
    return Object.entries(permissions).filter(([_perm, isEnabled])=>isEnabled).map(([perm])=>perm).join(" ");
};
class EmbedShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseBoxShapeUtil"] {
    static type = "embed";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["embedShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["embedShapeMigrations"];
    static embedDefinitions = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$defaultEmbedDefinitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_EMBED_DEFINITIONS"];
    canEditWhileLocked(shape) {
        const result = this.getEmbedDefinition(shape.props.url);
        if (!result) return true;
        return result.definition.canEditWhileLocked ?? true;
    }
    static setEmbedDefinitions(embedDefinitions) {
        EmbedShapeUtil.embedDefinitions = embedDefinitions;
    }
    getEmbedDefinitions() {
        return EmbedShapeUtil.embedDefinitions;
    }
    getEmbedDefinition(url) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$embeds$2f$embeds$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEmbedInfo"])(EmbedShapeUtil.embedDefinitions, url);
    }
    getText(shape) {
        return shape.props.url;
    }
    getAriaDescriptor(shape) {
        const embedInfo = this.getEmbedDefinition(shape.props.url);
        return embedInfo?.definition.title;
    }
    hideSelectionBoundsFg(shape) {
        return !this.canResize(shape);
    }
    canEdit() {
        return true;
    }
    canResize(shape) {
        return !!this.getEmbedDefinition(shape.props.url)?.definition?.doesResize;
    }
    canEditInReadonly() {
        return true;
    }
    getDefaultProps() {
        return {
            w: 300,
            h: 300,
            url: ""
        };
    }
    getGeometry(shape) {
        const embedInfo = this.getEmbedDefinition(shape.props.url);
        if (!embedInfo?.definition) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rectangle2d"]({
                width: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMARK_WIDTH"],
                height: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMARK_JUST_URL_HEIGHT"],
                isFilled: true
            });
        }
        return super.getGeometry(shape);
    }
    isAspectRatioLocked(shape) {
        const embedInfo = this.getEmbedDefinition(shape.props.url);
        return embedInfo?.definition.isAspectRatioLocked ?? false;
    }
    onResize(shape, info) {
        const isAspectRatioLocked = this.isAspectRatioLocked(shape);
        const embedInfo = this.getEmbedDefinition(shape.props.url);
        let minWidth = embedInfo?.definition.minWidth ?? 200;
        let minHeight = embedInfo?.definition.minHeight ?? 200;
        if (isAspectRatioLocked) {
            const aspectRatio = shape.props.w / shape.props.h;
            if (aspectRatio > 1) {
                minWidth *= aspectRatio;
            } else {
                minHeight /= aspectRatio;
            }
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeBox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resizeBox"])(shape, info, {
            minWidth,
            minHeight
        });
    }
    component(shape) {
        const svgExport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSvgExportContext"])();
        const { w, h, url } = shape.props;
        const isEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsEditing"])(shape.id);
        const embedInfo = this.getEmbedDefinition(url);
        const isHoveringWhileEditingSameShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("is hovering", {
            "useValue[isHoveringWhileEditingSameShape]": ()=>{
                const { editingShapeId, hoveredShapeId } = this.editor.getCurrentPageState();
                if (editingShapeId && hoveredShapeId !== editingShapeId) {
                    const editingShape = this.editor.getShape(editingShapeId);
                    if (editingShape && this.editor.isShapeOfType(editingShape, "embed")) {
                        return true;
                    }
                }
                return false;
            }
        }["useValue[isHoveringWhileEditingSameShape]"], []);
        const pageRotation = this.editor.getShapePageTransform(shape).rotation();
        if (svgExport) {
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLContainer"], {
                className: "tl-embed-container",
                id: shape.id,
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: "tl-embed",
                    style: {
                        border: 0,
                        boxShadow: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$rotated$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRotatedBoxShadow"])(pageRotation),
                        borderRadius: embedInfo?.definition.overrideOutlineRadius ?? 8,
                        background: embedInfo?.definition.backgroundColor ?? "var(--tl-color-background)",
                        width: w,
                        height: h
                    }
                })
            });
        }
        const isInteractive = isEditing || isHoveringWhileEditingSameShape;
        const isIframe = typeof window !== "undefined" && (window !== window.top || window.self !== window.parent);
        if (isIframe && embedInfo?.definition.type === "tldraw") return null;
        if (embedInfo?.definition.type === "github_gist") {
            const idFromGistUrl = embedInfo.url.split("/").pop();
            if (!idFromGistUrl) throw Error("No gist id!");
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLContainer"], {
                className: "tl-embed-container",
                id: shape.id,
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Gist, {
                    id: idFromGistUrl,
                    width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(w),
                    height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(h),
                    isInteractive,
                    pageRotation
                })
            });
        }
        const sandbox = getSandboxPermissions({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$defaultEmbedDefinitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["embedShapePermissionDefaults"],
            ...embedInfo?.definition.overridePermissions ?? {}
        });
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLContainer"], {
            className: "tl-embed-container",
            id: shape.id,
            children: embedInfo?.definition ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("iframe", {
                className: "tl-embed",
                sandbox,
                src: embedInfo.embedUrl,
                width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(w),
                height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(h),
                draggable: false,
                frameBorder: "0",
                referrerPolicy: "no-referrer-when-downgrade",
                tabIndex: isEditing ? 0 : -1,
                allowFullScreen: true,
                style: {
                    border: 0,
                    pointerEvents: isInteractive ? "auto" : "none",
                    // Fix for safari <https://stackoverflow.com/a/49150908>
                    zIndex: isInteractive ? "" : "-1",
                    boxShadow: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$rotated$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRotatedBoxShadow"])(pageRotation),
                    borderRadius: embedInfo?.definition.overrideOutlineRadius ?? 8,
                    background: embedInfo?.definition.backgroundColor
                }
            }) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$BookmarkShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookmarkShapeComponent"], {
                url,
                h,
                rotation: pageRotation,
                assetId: null,
                showImageContainer: false
            })
        });
    }
    indicator(shape) {
        const embedInfo = this.getEmbedDefinition(shape.props.url);
        return embedInfo?.definition ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.w),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.h),
            rx: embedInfo?.definition.overrideOutlineRadius ?? 8,
            ry: embedInfo?.definition.overrideOutlineRadius ?? 8
        }) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$BookmarkShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookmarkIndicatorComponent"], {
            w: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMARK_WIDTH"],
            h: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMARK_JUST_URL_HEIGHT"]
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const path = new Path2D();
        const embedInfo = this.getEmbedDefinition(shape.props.url);
        if (embedInfo?.definition) {
            const radius = embedInfo.definition.overrideOutlineRadius ?? 8;
            path.roundRect(0, 0, shape.props.w, shape.props.h, radius);
        } else {
            path.roundRect(0, 0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMARK_WIDTH"], __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$bookmark$2f$bookmarks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMARK_JUST_URL_HEIGHT"], 6);
        }
        return path;
    }
    getInterpolatedProps(startShape, endShape, t) {
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            w: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.w, endShape.props.w, t),
            h: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.h, endShape.props.h, t)
        };
    }
}
function Gist({ id, isInteractive, width, height, style, pageRotation }) {
    if (!id.match(/^[0-9a-f]+$/)) throw Error("No gist id!");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("iframe", {
        className: "tl-embed",
        draggable: false,
        width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(width),
        height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(height),
        frameBorder: "0",
        scrolling: "no",
        referrerPolicy: "no-referrer-when-downgrade",
        tabIndex: isInteractive ? 0 : -1,
        style: {
            ...style,
            pointerEvents: isInteractive ? "all" : "none",
            // Fix for safari <https://stackoverflow.com/a/49150908>
            zIndex: isInteractive ? "" : "-1",
            boxShadow: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$rotated$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRotatedBoxShadow"])(pageRotation)
        },
        srcDoc: `
			<html>
				<head>
					<base target="_blank">
				</head>
				<body>
					<script src=${`https://gist.github.com/${id}.js`}></script>
					<style type="text/css">
						* { margin: 0px; }
						table { height: 100%; background-color: red; }
						.gist { background-color: none; height: 100%;  }
						.gist .gist-file { height: calc(100vh - 2px); padding: 0px; display: grid; grid-template-rows: 1fr auto; }
					</style>
				</body>
			</html>`
    });
}
;
 //# sourceMappingURL=EmbedShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/image/ImageShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageShapeUtil",
    ()=>ImageShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/BaseBoxShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Ellipse2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Ellipse2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/HTMLContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Rectangle2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeBox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/shared/resizeBox.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useSafeId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$BrokenAssetIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/BrokenAssetIcon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/HyperlinkButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$crop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/crop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useImageOrVideoAsset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useImageOrVideoAsset.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$usePrefersReducedMotion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/usePrefersReducedMotion.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
async function getDataURIFromURL(url) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetch"])(url);
    const blob = await response.blob();
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileHelpers"].blobToDataUrl(blob);
}
const imageSvgExportCache = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
class ImageShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseBoxShapeUtil"] {
    static type = "image";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageShapeMigrations"];
    isAspectRatioLocked() {
        return true;
    }
    canCrop() {
        return true;
    }
    isExportBoundsContainer() {
        return true;
    }
    getDefaultProps() {
        return {
            w: 100,
            h: 100,
            assetId: null,
            playing: true,
            url: "",
            crop: null,
            flipX: false,
            flipY: false,
            altText: ""
        };
    }
    getGeometry(shape) {
        if (shape.props.crop?.isCircle) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Ellipse2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ellipse2d"]({
                width: shape.props.w,
                height: shape.props.h,
                isFilled: true
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rectangle2d"]({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true
        });
    }
    getAriaDescriptor(shape) {
        return shape.props.altText;
    }
    onResize(shape, info) {
        let resized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$resizeBox$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resizeBox"])(shape, info);
        const { flipX, flipY } = info.initialShape.props;
        const { scaleX, scaleY, mode } = info;
        resized = {
            ...resized,
            props: {
                ...resized.props,
                flipX: scaleX < 0 !== flipX,
                flipY: scaleY < 0 !== flipY
            }
        };
        if (!shape.props.crop) return resized;
        const flipCropHorizontally = mode === "scale_shape" && scaleX === -1 || mode === "resize_bounds" && flipX !== resized.props.flipX;
        const flipCropVertically = mode === "scale_shape" && scaleY === -1 || mode === "resize_bounds" && flipY !== resized.props.flipY;
        const { topLeft, bottomRight } = shape.props.crop;
        resized.props.crop = {
            topLeft: {
                x: flipCropHorizontally ? 1 - bottomRight.x : topLeft.x,
                y: flipCropVertically ? 1 - bottomRight.y : topLeft.y
            },
            bottomRight: {
                x: flipCropHorizontally ? 1 - topLeft.x : bottomRight.x,
                y: flipCropVertically ? 1 - topLeft.y : bottomRight.y
            },
            isCircle: shape.props.crop.isCircle
        };
        return resized;
    }
    component(shape) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ImageShape, {
            shape
        });
    }
    indicator(shape) {
        const isCropping = this.editor.getCroppingShapeId() === shape.id;
        if (isCropping) return null;
        if (shape.props.crop?.isCircle) {
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ellipse", {
                cx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.w / 2),
                cy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.h / 2),
                rx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.w / 2),
                ry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.h / 2)
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.w),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.h)
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        if (this.editor.getCroppingShapeId() === shape.id) return void 0;
        const path = new Path2D();
        if (shape.props.crop?.isCircle) {
            const cx = shape.props.w / 2;
            const cy = shape.props.h / 2;
            path.ellipse(cx, cy, cx, cy, 0, 0, Math.PI * 2);
        } else {
            path.rect(0, 0, shape.props.w, shape.props.h);
        }
        return path;
    }
    async toSvg(shape, ctx) {
        const props = shape.props;
        if (!props.assetId) return null;
        const asset = this.editor.getAsset(props.assetId);
        if (!asset) return null;
        const { w } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$crop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUncroppedSize"])(shape.props, props.crop);
        const src = await imageSvgExportCache.get(asset, async ()=>{
            let src2 = await ctx.resolveAssetUrl(asset.id, w);
            if (!src2) return null;
            if (src2.startsWith("blob:") || src2.startsWith("http") || src2.startsWith("/") || src2.startsWith("./")) {
                src2 = await getDataURIFromURL(src2) || "";
            }
            if (getIsAnimated(this.editor, asset.id)) {
                const { promise } = getFirstFrameOfAnimatedImage(src2);
                src2 = await promise;
            }
            return src2;
        });
        if (!src) return null;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SvgImage, {
            shape,
            src
        });
    }
    onDoubleClickEdge(shape) {
        const props = shape.props;
        if (!props) return;
        if (this.editor.getCroppingShapeId() !== shape.id) {
            return;
        }
        const crop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["structuredClone"])(props.crop) || {
            topLeft: {
                x: 0,
                y: 0
            },
            bottomRight: {
                x: 1,
                y: 1
            }
        };
        const { w, h } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$crop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUncroppedSize"])(shape.props, crop);
        const pointDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](crop.topLeft.x * w, crop.topLeft.y * h).rot(shape.rotation);
        const partial = {
            id: shape.id,
            type: shape.type,
            x: shape.x - pointDelta.x,
            y: shape.y - pointDelta.y,
            props: {
                crop: {
                    topLeft: {
                        x: 0,
                        y: 0
                    },
                    bottomRight: {
                        x: 1,
                        y: 1
                    }
                },
                w,
                h
            }
        };
        this.editor.updateShapes([
            partial
        ]);
    }
    getInterpolatedProps(startShape, endShape, t) {
        function interpolateCrop(startShape2, endShape2) {
            if (startShape2.props.crop === null && endShape2.props.crop === null) return null;
            const startTL = startShape2.props.crop?.topLeft || {
                x: 0,
                y: 0
            };
            const startBR = startShape2.props.crop?.bottomRight || {
                x: 1,
                y: 1
            };
            const endTL = endShape2.props.crop?.topLeft || {
                x: 0,
                y: 0
            };
            const endBR = endShape2.props.crop?.bottomRight || {
                x: 1,
                y: 1
            };
            return {
                topLeft: {
                    x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startTL.x, endTL.x, t),
                    y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startTL.y, endTL.y, t)
                },
                bottomRight: {
                    x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startBR.x, endBR.x, t),
                    y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startBR.y, endBR.y, t)
                }
            };
        }
        return {
            ...t > 0.5 ? endShape.props : startShape.props,
            w: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.w, endShape.props.w, t),
            h: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.h, endShape.props.h, t),
            crop: interpolateCrop(startShape, endShape)
        };
    }
}
const ImageShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function ImageShape2({ shape }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const { w } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$crop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUncroppedSize"])(shape.props, shape.props.crop);
    const { asset, url } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useImageOrVideoAsset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImageOrVideoAsset"])({
        shapeId: shape.id,
        assetId: shape.props.assetId,
        width: w
    });
    const prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$usePrefersReducedMotion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"])();
    const [staticFrameSrc, setStaticFrameSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadedUrl, setLoadedUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isAnimated = asset && getIsAnimated(editor, asset.id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageShape.ImageShape2.useEffect": ()=>{
            if (url && isAnimated) {
                const { promise, cancel } = getFirstFrameOfAnimatedImage(url);
                promise.then({
                    "ImageShape.ImageShape2.useEffect": (dataUrl)=>{
                        setStaticFrameSrc(dataUrl);
                        setLoadedUrl(url);
                    }
                }["ImageShape.ImageShape2.useEffect"]);
                return ({
                    "ImageShape.ImageShape2.useEffect": ()=>{
                        cancel();
                    }
                })["ImageShape.ImageShape2.useEffect"];
            }
        }
    }["ImageShape.ImageShape2.useEffect"], [
        editor,
        isAnimated,
        prefersReducedMotion,
        url
    ]);
    const showCropPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("show crop preview", {
        "ImageShape.ImageShape2.useValue[showCropPreview]": ()=>shape.id === editor.getOnlySelectedShapeId() && editor.getCroppingShapeId() === shape.id && editor.isIn("select.crop")
    }["ImageShape.ImageShape2.useValue[showCropPreview]"], [
        editor,
        shape.id
    ]);
    const reduceMotion = prefersReducedMotion && (asset?.props.mimeType?.includes("video") || isAnimated);
    const containerStyle = getCroppedContainerStyle(shape);
    const nextSrc = url === loadedUrl ? null : url;
    const loadedSrc = reduceMotion ? staticFrameSrc : loadedUrl;
    if (!url && !asset?.props.src) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLContainer"], {
            id: shape.id,
            style: {
                overflow: "hidden",
                width: shape.props.w,
                height: shape.props.h,
                color: "var(--tl-color-text-3)",
                backgroundColor: "var(--tl-color-low)",
                border: "1px solid var(--tl-color-low-border)"
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tl-image-container", asset && "tl-image-container-loading"),
                    style: containerStyle,
                    children: asset ? null : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$BrokenAssetIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrokenAssetIcon"], {})
                }),
                "url" in shape.props && shape.props.url && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HyperlinkButton"], {
                    url: shape.props.url
                })
            ]
        });
    }
    const crossOrigin = isAnimated ? "anonymous" : void 0;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showCropPreview && loadedSrc && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: containerStyle,
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("img", {
                    className: "tl-image",
                    style: {
                        ...getFlipStyle(shape),
                        opacity: 0.1
                    },
                    crossOrigin,
                    src: loadedSrc,
                    referrerPolicy: "strict-origin-when-cross-origin",
                    draggable: false,
                    alt: ""
                })
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLContainer"], {
                id: shape.id,
                style: {
                    overflow: "hidden",
                    width: shape.props.w,
                    height: shape.props.h,
                    borderRadius: shape.props.crop?.isCircle ? "50%" : void 0
                },
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tl-image-container"),
                        style: containerStyle,
                        children: [
                            loadedSrc && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("img", {
                                className: "tl-image",
                                style: getFlipStyle(shape),
                                crossOrigin,
                                src: loadedSrc,
                                referrerPolicy: "strict-origin-when-cross-origin",
                                draggable: false,
                                alt: ""
                            }, loadedSrc),
                            nextSrc && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("img", {
                                className: "tl-image",
                                style: getFlipStyle(shape),
                                crossOrigin,
                                src: nextSrc,
                                referrerPolicy: "strict-origin-when-cross-origin",
                                draggable: false,
                                alt: shape.props.altText,
                                onLoad: ()=>setLoadedUrl(nextSrc)
                            }, nextSrc)
                        ]
                    }),
                    shape.props.url && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HyperlinkButton"], {
                        url: shape.props.url
                    })
                ]
            })
        ]
    });
});
function getIsAnimated(editor, assetId) {
    const asset = assetId ? editor.getAsset(assetId) : void 0;
    if (!asset) return false;
    return "mimeType" in asset.props && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaHelpers"].isAnimatedImageType(asset?.props.mimeType) || "isAnimated" in asset.props && asset.props.isAnimated;
}
function getCroppedContainerStyle(shape) {
    const crop = shape.props.crop;
    const topLeft = crop?.topLeft;
    if (!topLeft) {
        return {
            width: shape.props.w,
            height: shape.props.h
        };
    }
    const { w, h } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$crop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUncroppedSize"])(shape.props, crop);
    const offsetX = -topLeft.x * w;
    const offsetY = -topLeft.y * h;
    return {
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        width: w,
        height: h
    };
}
function getFlipStyle(shape, size) {
    const { flipX, flipY, crop } = shape.props;
    if (!flipX && !flipY) return void 0;
    let cropOffsetX;
    let cropOffsetY;
    if (crop) {
        const { w, h } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$crop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUncroppedSize"])(shape.props, crop);
        const cropWidth = crop.bottomRight.x - crop.topLeft.x;
        const cropHeight = crop.bottomRight.y - crop.topLeft.y;
        cropOffsetX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modulate"])(crop.topLeft.x, [
            0,
            1 - cropWidth
        ], [
            0,
            w - shape.props.w
        ]);
        cropOffsetY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modulate"])(crop.topLeft.y, [
            0,
            1 - cropHeight
        ], [
            0,
            h - shape.props.h
        ]);
    }
    const scale = `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`;
    const translate = size ? `translate(${(flipX ? size.width : 0) - (cropOffsetX ? cropOffsetX : 0)}px,
		             ${(flipY ? size.height : 0) - (cropOffsetY ? cropOffsetY : 0)}px)` : "";
    return {
        transform: `${translate} ${scale}`,
        // in SVG, flipping around the center doesn't work so we use explicit width/height
        transformOrigin: size ? "0 0" : "center center"
    };
}
function SvgImage({ shape, src }) {
    const cropClipId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUniqueSafeId"])();
    const containerStyle = getCroppedContainerStyle(shape);
    const crop = shape.props.crop;
    if (containerStyle.transform && crop) {
        const { transform: cropTransform, width, height } = containerStyle;
        const croppedWidth = (crop.bottomRight.x - crop.topLeft.x) * width;
        const croppedHeight = (crop.bottomRight.y - crop.topLeft.y) * height;
        const points = [
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, 0),
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](croppedWidth, 0),
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](croppedWidth, croppedHeight),
            new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](0, croppedHeight)
        ];
        const flip = getFlipStyle(shape, {
            width,
            height
        });
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("defs", {
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("clipPath", {
                        id: cropClipId,
                        children: crop.isCircle ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ellipse", {
                            cx: croppedWidth / 2,
                            cy: croppedHeight / 2,
                            rx: croppedWidth / 2,
                            ry: croppedHeight / 2
                        }) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polygon", {
                            points: points.map((p)=>`${p.x},${p.y}`).join(" ")
                        })
                    })
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
                    clipPath: `url(#${cropClipId})`,
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("image", {
                        href: src,
                        width,
                        height,
                        "aria-label": shape.props.altText,
                        style: flip ? {
                            ...flip
                        } : {
                            transform: cropTransform
                        }
                    })
                })
            ]
        });
    } else {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("image", {
            href: src,
            width: shape.props.w,
            height: shape.props.h,
            "aria-label": shape.props.altText,
            style: getFlipStyle(shape, {
                width: shape.props.w,
                height: shape.props.h
            })
        });
    }
}
function getFirstFrameOfAnimatedImage(url) {
    let cancelled = false;
    const promise = new Promise((resolve)=>{
        const image = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"])();
        image.onload = ()=>{
            if (cancelled) return;
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.drawImage(image, 0, 0);
            resolve(canvas.toDataURL());
        };
        image.crossOrigin = "anonymous";
        image.src = url;
    });
    return {
        promise,
        cancel: ()=>cancelled = true
    };
}
;
 //# sourceMappingURL=ImageShapeUtil.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/video/VideoShapeUtil.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VideoShapeUtil",
    ()=>VideoShapeUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/BaseBoxShapeUtil.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/HTMLContainer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditorComponents$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditorComponents.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useIsEditing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$BrokenAssetIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/BrokenAssetIcon.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/HyperlinkButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useImageOrVideoAsset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useImageOrVideoAsset.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$usePrefersReducedMotion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/usePrefersReducedMotion.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const videoSvgExportCache = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeakCache"]();
class VideoShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$BaseBoxShapeUtil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseBoxShapeUtil"] {
    static type = "video";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["videoShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["videoShapeMigrations"];
    options = {
        autoplay: true
    };
    canEdit() {
        return true;
    }
    isAspectRatioLocked() {
        return true;
    }
    getDefaultProps() {
        return {
            w: 100,
            h: 100,
            assetId: null,
            autoplay: this.options.autoplay,
            url: "",
            altText: "",
            // Not used, but once upon a time were used to sync video state between users
            time: 0,
            playing: true
        };
    }
    getAriaDescriptor(shape) {
        return shape.props.altText;
    }
    component(shape) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(VideoShape, {
            shape
        });
    }
    indicator(shape) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.w),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(shape.props.h)
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const path = new Path2D();
        path.rect(0, 0, shape.props.w, shape.props.h);
        return path;
    }
    async toSvg(shape, ctx) {
        const props = shape.props;
        if (!props.assetId) return null;
        const asset = this.editor.getAsset(props.assetId);
        if (!asset) return null;
        const src = await videoSvgExportCache.get(asset, async ()=>{
            const assetUrl = await ctx.resolveAssetUrl(asset.id, props.w);
            if (!assetUrl) return null;
            const video = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaHelpers"].loadVideo(assetUrl);
            return await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaHelpers"].getVideoFrameAsDataUrl(video, 0);
        });
        if (!src) return null;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("image", {
            href: src,
            width: props.w,
            height: props.h,
            "aria-label": shape.props.altText
        });
    }
}
const VideoShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function VideoShape2({ shape }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const showControls = editor.getShapeGeometry(shape).bounds.w * editor.getEfficientZoomLevel() >= 110;
    const isEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsEditing"])(shape.id);
    const prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$usePrefersReducedMotion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"])();
    const { Spinner } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditorComponents$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorComponents"])();
    const { asset, url } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useImageOrVideoAsset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImageOrVideoAsset"])({
        shapeId: shape.id,
        assetId: shape.props.assetId,
        width: shape.props.w
    });
    const rVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLoadedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoShape.VideoShape2.useCallback[handleLoadedData]": (e)=>{
            const video = e.currentTarget;
            if (!video) return;
            setIsLoaded(true);
        }
    }["VideoShape.VideoShape2.useCallback[handleLoadedData]"], []);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoShape.VideoShape2.useEffect": ()=>{
            const fullscreenChange = {
                "VideoShape.VideoShape2.useEffect.fullscreenChange": ()=>setIsFullscreen(document.fullscreenElement === rVideo.current)
            }["VideoShape.VideoShape2.useEffect.fullscreenChange"];
            document.addEventListener("fullscreenchange", fullscreenChange);
            return ({
                "VideoShape.VideoShape2.useEffect": ()=>document.removeEventListener("fullscreenchange", fullscreenChange)
            })["VideoShape.VideoShape2.useEffect"];
        }
    }["VideoShape.VideoShape2.useEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoShape.VideoShape2.useEffect": ()=>{
            const video = rVideo.current;
            if (!video) return;
            if (isEditing) {
                if (document.activeElement !== video) {
                    video.focus();
                }
            }
        }
    }["VideoShape.VideoShape2.useEffect"], [
        isEditing,
        isLoaded
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$HTMLContainer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLContainer"], {
                id: shape.id,
                style: {
                    color: "var(--tl-color-text-3)",
                    backgroundColor: asset ? "transparent" : "var(--tl-color-low)",
                    border: asset ? "none" : "1px solid var(--tl-color-low-border)"
                },
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: "tl-counter-scaled",
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: "tl-video-container",
                        children: !asset ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$BrokenAssetIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrokenAssetIcon"], {}) : Spinner && !asset.props.src ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Spinner, {}) : url ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("video", {
                                    ref: rVideo,
                                    style: isEditing ? {
                                        pointerEvents: "all"
                                    } : !isLoaded ? {
                                        display: "none"
                                    } : void 0,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tl-video", `tl-video-shape-${shape.id.split(":")[1]}`, {
                                        "tl-video-is-fullscreen": isFullscreen
                                    }),
                                    width: "100%",
                                    height: "100%",
                                    draggable: false,
                                    playsInline: true,
                                    autoPlay: shape.props.autoplay && !prefersReducedMotion,
                                    muted: true,
                                    loop: true,
                                    disableRemotePlayback: true,
                                    disablePictureInPicture: true,
                                    controls: isEditing && showControls,
                                    onLoadedData: handleLoadedData,
                                    hidden: !isLoaded,
                                    "aria-label": shape.props.altText,
                                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("source", {
                                        src: url
                                    })
                                }, url),
                                !isLoaded && Spinner && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Spinner, {})
                            ]
                        }) : null
                    })
                })
            }),
            "url" in shape.props && shape.props.url && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$HyperlinkButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HyperlinkButton"], {
                url: shape.props.url
            })
        ]
    });
});
;
 //# sourceMappingURL=VideoShapeUtil.mjs.map
}),
]);

//# debugId=39a428a2-a435-2d65-17bb-50616d101f44
//# sourceMappingURL=c427b_tldraw_dist-esm_lib_shapes_e124d274._.js.map