;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="6a7c0ba3-519f-d490-5ba6-f371f9847c8e")}catch(e){}}();
module.exports = [
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/straight-arrow.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStraightArrowInfo",
    ()=>getStraightArrowInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Mat.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-ssr] (ecmascript)");
;
;
function getStraightArrowInfo(editor, shape, bindings) {
    const { arrowheadStart, arrowheadEnd } = shape.props;
    const terminalsInArrowSpace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowTerminalsInArrowSpace"])(editor, shape, bindings);
    const a = terminalsInArrowSpace.start.clone();
    const b = terminalsInArrowSpace.end.clone();
    const c = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Med(a, b);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Equals(a, b)) {
        return {
            bindings,
            type: "straight",
            start: {
                handle: a,
                point: a,
                arrowhead: shape.props.arrowheadStart
            },
            end: {
                handle: b,
                point: b,
                arrowhead: shape.props.arrowheadEnd
            },
            middle: c,
            isValid: false,
            length: 0
        };
    }
    const uAB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(b, a).uni();
    const startShapeInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBoundShapeInfoForTerminal"])(editor, shape, "start");
    const endShapeInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBoundShapeInfoForTerminal"])(editor, shape, "end");
    const arrowPageTransform = editor.getShapePageTransform(shape);
    updateArrowheadPointWithBoundShape(b, // <-- will be mutated
    terminalsInArrowSpace.start, arrowPageTransform, endShapeInfo);
    updateArrowheadPointWithBoundShape(a, // <-- will be mutated
    terminalsInArrowSpace.end, arrowPageTransform, startShapeInfo);
    let offsetA = 0;
    let offsetB = 0;
    let strokeOffsetA = 0;
    let strokeOffsetB = 0;
    let minLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_ARROW_LENGTH"] * shape.props.scale;
    const isSelfIntersection = startShapeInfo && endShapeInfo && startShapeInfo.shape === endShapeInfo.shape;
    const relationship = startShapeInfo && endShapeInfo ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBoundShapeRelationships"])(editor, startShapeInfo.shape.id, endShapeInfo.shape.id) : "safe";
    if (relationship === "safe" && startShapeInfo && endShapeInfo && !isSelfIntersection && !startShapeInfo.isExact && !endShapeInfo.isExact) {
        if (endShapeInfo.didIntersect && !startShapeInfo.didIntersect) {
            if (startShapeInfo.isClosed) {
                a.setTo(b.clone().add(uAB.clone().mul(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_ARROW_LENGTH"] * shape.props.scale)));
            }
        } else if (!endShapeInfo.didIntersect) {
            if (endShapeInfo.isClosed) {
                b.setTo(a.clone().sub(uAB.clone().mul(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_ARROW_LENGTH"] * shape.props.scale)));
            }
        }
    }
    const distance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(b, a);
    const u = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Len(distance) ? distance.uni() : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(distance);
    const didFlip = !__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Equals(u, uAB);
    if (!isSelfIntersection) {
        if (relationship !== "start-contains-end" && startShapeInfo && arrowheadStart !== "none" && !startShapeInfo.isExact) {
            strokeOffsetA = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] / 2 + ("size" in startShapeInfo.shape.props ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][startShapeInfo.shape.props.size] / 2 : 0);
            offsetA = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOUND_ARROW_OFFSET"] + strokeOffsetA) * shape.props.scale;
            minLength += strokeOffsetA * shape.props.scale;
        }
        if (relationship !== "end-contains-start" && endShapeInfo && arrowheadEnd !== "none" && !endShapeInfo.isExact) {
            strokeOffsetB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] / 2 + ("size" in endShapeInfo.shape.props ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][endShapeInfo.shape.props.size] / 2 : 0);
            offsetB = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOUND_ARROW_OFFSET"] + strokeOffsetB) * shape.props.scale;
            minLength += strokeOffsetB * shape.props.scale;
        }
    }
    const tA = a.clone().add(u.clone().mul(offsetA * (didFlip ? -1 : 1)));
    const tB = b.clone().sub(u.clone().mul(offsetB * (didFlip ? -1 : 1)));
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].DistMin(tA, tB, minLength)) {
        if (offsetA !== 0 && offsetB !== 0) {
            offsetA *= -1.5;
            offsetB *= -1.5;
        } else if (offsetA !== 0) {
            offsetA *= -1;
        } else if (offsetB !== 0) {
            offsetB *= -1;
        } else {}
    }
    a.add(u.clone().mul(offsetA * (didFlip ? -1 : 1)));
    b.sub(u.clone().mul(offsetB * (didFlip ? -1 : 1)));
    if (didFlip) {
        if (startShapeInfo && endShapeInfo) {
            b.setTo(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(a, u.clone().mul(-__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_ARROW_LENGTH"] * shape.props.scale)));
        }
        c.setTo(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Med(terminalsInArrowSpace.start, terminalsInArrowSpace.end));
    } else {
        c.setTo(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Med(a, b));
    }
    const length = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(a, b);
    return {
        bindings,
        type: "straight",
        start: {
            handle: terminalsInArrowSpace.start,
            point: a,
            arrowhead: shape.props.arrowheadStart
        },
        end: {
            handle: terminalsInArrowSpace.end,
            point: b,
            arrowhead: shape.props.arrowheadEnd
        },
        middle: c,
        isValid: length > 0,
        length
    };
}
function updateArrowheadPointWithBoundShape(point, opposite, arrowPageTransform, targetShapeInfo) {
    if (targetShapeInfo === void 0) {
        return;
    }
    if (targetShapeInfo.isExact) {
        return;
    }
    const pageFrom = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(arrowPageTransform, opposite);
    const pageTo = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(arrowPageTransform, point);
    const targetFrom = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].Inverse(targetShapeInfo.transform), pageFrom);
    const targetTo = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].Inverse(targetShapeInfo.transform), pageTo);
    const intersection = Array.from(targetShapeInfo.geometry.intersectLineSegment(targetFrom, targetTo, {
        includeLabels: false,
        includeInternal: false
    }));
    let targetInt;
    if (intersection.length) {
        targetInt = intersection.sort((p1, p2)=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist2(p1, targetFrom) - __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist2(p2, targetFrom))[0] ?? (targetShapeInfo.isClosed ? void 0 : targetTo);
    }
    if (targetInt === void 0) {
        targetInt = targetShapeInfo.geometry.nearestPoint(targetTo, {
            includeLabels: false,
            includeInternal: false
        });
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].DistMin(targetInt, targetTo, 1)) {
            return;
        }
    }
    const pageInt = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(targetShapeInfo.transform, targetInt);
    const arrowInt = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].Inverse(arrowPageTransform), pageInt);
    point.setTo(arrowInt);
    targetShapeInfo.didIntersect = true;
}
;
 //# sourceMappingURL=straight-arrow.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/curved-arrow.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurvedArrowInfo",
    ()=>getCurvedArrowInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Mat.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$straight$2d$arrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/straight-arrow.mjs [app-ssr] (ecmascript)");
;
;
;
function getCurvedArrowInfo(editor, shape, bindings) {
    const { arrowheadEnd, arrowheadStart } = shape.props;
    const bend = shape.props.bend;
    if (Math.abs(bend) > Math.abs(shape.props.bend * (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WAY_TOO_BIG_ARROW_BEND_FACTOR"] * shape.props.scale))) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$straight$2d$arrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStraightArrowInfo"])(editor, shape, bindings);
    }
    const terminalsInArrowSpace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowTerminalsInArrowSpace"])(editor, shape, bindings);
    const med = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Med(terminalsInArrowSpace.start, terminalsInArrowSpace.end);
    const distance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(terminalsInArrowSpace.end, terminalsInArrowSpace.start);
    const u = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Len(distance) ? distance.uni() : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(distance);
    const middle = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(med, u.per().mul(-bend));
    const startShapeInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBoundShapeInfoForTerminal"])(editor, shape, "start");
    const endShapeInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBoundShapeInfoForTerminal"])(editor, shape, "end");
    const a = terminalsInArrowSpace.start.clone();
    const b = terminalsInArrowSpace.end.clone();
    const c = middle.clone();
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Equals(a, b)) {
        return {
            bindings,
            type: "straight",
            start: {
                handle: a,
                point: a,
                arrowhead: shape.props.arrowheadStart
            },
            end: {
                handle: b,
                point: b,
                arrowhead: shape.props.arrowheadEnd
            },
            middle: c,
            isValid: false,
            length: 0
        };
    }
    const isClockwise = shape.props.bend < 0;
    const distFn = isClockwise ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clockwiseAngleDist"] : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["counterClockwiseAngleDist"];
    const handleArc = getArcInfo(a, b, c);
    const handle_aCA = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(handleArc.center, a);
    const handle_aCB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(handleArc.center, b);
    const handle_dAB = distFn(handle_aCA, handle_aCB);
    if (handleArc.length === 0 || handleArc.size === 0 || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafeFloat"])(handleArc.length) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafeFloat"])(handleArc.size)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$straight$2d$arrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStraightArrowInfo"])(editor, shape, bindings);
    }
    const tempA = a.clone();
    const tempB = b.clone();
    const tempC = c.clone();
    const arrowPageTransform = editor.getShapePageTransform(shape);
    let offsetA = 0;
    let offsetB = 0;
    let minLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_ARROW_LENGTH"] * shape.props.scale;
    if (startShapeInfo && !startShapeInfo.isExact) {
        const startInPageSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(arrowPageTransform, tempA);
        const centerInPageSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(arrowPageTransform, handleArc.center);
        const endInPageSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(arrowPageTransform, tempB);
        const inverseTransform = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].Inverse(startShapeInfo.transform);
        const startInStartShapeLocalSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(inverseTransform, startInPageSpace);
        const centerInStartShapeLocalSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(inverseTransform, centerInPageSpace);
        const endInStartShapeLocalSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(inverseTransform, endInPageSpace);
        const { isClosed } = startShapeInfo;
        let point;
        let intersections = Array.from(startShapeInfo.geometry.intersectCircle(centerInStartShapeLocalSpace, handleArc.radius, {
            includeLabels: false,
            includeInternal: false
        }));
        if (intersections.length) {
            const angleToStart = centerInStartShapeLocalSpace.angle(startInStartShapeLocalSpace);
            const angleToEnd = centerInStartShapeLocalSpace.angle(endInStartShapeLocalSpace);
            const dAB2 = distFn(angleToStart, angleToEnd);
            intersections = intersections.filter((pt)=>distFn(angleToStart, centerInStartShapeLocalSpace.angle(pt)) <= dAB2);
            const targetDist = dAB2 * 0.25;
            intersections.sort(isClosed ? (p0, p1)=>Math.abs(distFn(angleToStart, centerInStartShapeLocalSpace.angle(p0)) - targetDist) < Math.abs(distFn(angleToStart, centerInStartShapeLocalSpace.angle(p1)) - targetDist) ? -1 : 1 : (p0, p1)=>distFn(angleToStart, centerInStartShapeLocalSpace.angle(p0)) < distFn(angleToStart, centerInStartShapeLocalSpace.angle(p1)) ? -1 : 1);
            point = intersections[0];
        }
        if (!point) {
            if (isClosed) {
                const nearestPoint = startShapeInfo.geometry.nearestPoint(startInStartShapeLocalSpace, {
                    includeInternal: false,
                    includeLabels: false
                });
                if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].DistMin(nearestPoint, startInStartShapeLocalSpace, 1)) {
                    point = nearestPoint;
                }
            } else {
                point = startInStartShapeLocalSpace;
            }
        }
        if (point) {
            tempA.setTo(editor.getPointInShapeSpace(shape, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(startShapeInfo.transform, point)));
            startShapeInfo.didIntersect = true;
            if (arrowheadStart !== "none") {
                const strokeOffset = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] / 2 + ("size" in startShapeInfo.shape.props ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][startShapeInfo.shape.props.size] / 2 : 0);
                offsetA = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOUND_ARROW_OFFSET"] + strokeOffset) * shape.props.scale;
                minLength += strokeOffset * shape.props.scale;
            }
        }
    }
    if (endShapeInfo && !endShapeInfo.isExact) {
        const startInPageSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(arrowPageTransform, tempA);
        const endInPageSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(arrowPageTransform, tempB);
        const centerInPageSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(arrowPageTransform, handleArc.center);
        const inverseTransform = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].Inverse(endShapeInfo.transform);
        const startInEndShapeLocalSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(inverseTransform, startInPageSpace);
        const centerInEndShapeLocalSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(inverseTransform, centerInPageSpace);
        const endInEndShapeLocalSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(inverseTransform, endInPageSpace);
        const isClosed = endShapeInfo.isClosed;
        let point;
        let intersections = Array.from(endShapeInfo.geometry.intersectCircle(centerInEndShapeLocalSpace, handleArc.radius, {
            includeLabels: false,
            includeInternal: false
        }));
        if (intersections.length) {
            const angleToStart = centerInEndShapeLocalSpace.angle(startInEndShapeLocalSpace);
            const angleToEnd = centerInEndShapeLocalSpace.angle(endInEndShapeLocalSpace);
            const dAB2 = distFn(angleToStart, angleToEnd);
            const targetDist = dAB2 * 0.75;
            intersections = intersections.filter((pt)=>distFn(angleToStart, centerInEndShapeLocalSpace.angle(pt)) <= dAB2);
            intersections.sort(isClosed ? (p0, p1)=>Math.abs(distFn(angleToStart, centerInEndShapeLocalSpace.angle(p0)) - targetDist) < Math.abs(distFn(angleToStart, centerInEndShapeLocalSpace.angle(p1)) - targetDist) ? -1 : 1 : (p0, p1)=>distFn(angleToStart, centerInEndShapeLocalSpace.angle(p0)) < distFn(angleToStart, centerInEndShapeLocalSpace.angle(p1)) ? -1 : 1);
            point = intersections[0];
        }
        if (!point) {
            if (isClosed) {
                const nearestPoint = endShapeInfo.geometry.nearestPoint(endInEndShapeLocalSpace, {
                    includeInternal: false,
                    includeLabels: false
                });
                if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].DistMin(nearestPoint, endInEndShapeLocalSpace, 1)) {
                    point = nearestPoint;
                }
            } else {
                point = endInEndShapeLocalSpace;
            }
        }
        if (point) {
            tempB.setTo(editor.getPointInShapeSpace(shape, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(endShapeInfo.transform, point)));
            endShapeInfo.didIntersect = true;
            if (arrowheadEnd !== "none") {
                const strokeOffset = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] / 2 + ("size" in endShapeInfo.shape.props ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][endShapeInfo.shape.props.size] / 2 : 0);
                offsetB = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOUND_ARROW_OFFSET"] + strokeOffset) * shape.props.scale;
                minLength += strokeOffset * shape.props.scale;
            }
        }
    }
    let aCA = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(handleArc.center, tempA);
    let aCB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(handleArc.center, tempB);
    let dAB = distFn(aCA, aCB);
    let lAB = dAB * handleArc.radius;
    const tA = tempA.clone();
    const tB = tempB.clone();
    if (offsetA !== 0) {
        tA.setTo(handleArc.center).add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].FromAngle(aCA + dAB * (offsetA / lAB * (isClockwise ? 1 : -1))).mul(handleArc.radius));
    }
    if (offsetB !== 0) {
        tB.setTo(handleArc.center).add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].FromAngle(aCB + dAB * (offsetB / lAB * (isClockwise ? -1 : 1))).mul(handleArc.radius));
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].DistMin(tA, tB, minLength)) {
        if (offsetA !== 0 && offsetB !== 0) {
            offsetA *= -1.5;
            offsetB *= -1.5;
        } else if (offsetA !== 0) {
            offsetA *= -2;
        } else if (offsetB !== 0) {
            offsetB *= -2;
        } else {}
        const minOffsetA = 0.1 - distFn(handle_aCA, aCA) * handleArc.radius;
        const minOffsetB = 0.1 - distFn(aCB, handle_aCB) * handleArc.radius;
        offsetA = Math.max(offsetA, minOffsetA);
        offsetB = Math.max(offsetB, minOffsetB);
    }
    if (offsetA !== 0) {
        tempA.setTo(handleArc.center).add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].FromAngle(aCA + dAB * (offsetA / lAB * (isClockwise ? 1 : -1))).mul(handleArc.radius));
    }
    if (offsetB !== 0) {
        tempB.setTo(handleArc.center).add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].FromAngle(aCB + dAB * (offsetB / lAB * (isClockwise ? -1 : 1))).mul(handleArc.radius));
    }
    if (startShapeInfo && endShapeInfo && !startShapeInfo.isExact && !endShapeInfo.isExact) {
        aCA = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(handleArc.center, tempA);
        aCB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(handleArc.center, tempB);
        dAB = distFn(aCA, aCB);
        lAB = dAB * handleArc.radius;
        const relationship = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBoundShapeRelationships"])(editor, startShapeInfo.shape.id, endShapeInfo.shape.id);
        if (relationship === "double-bound" && lAB < 30) {
            tempA.setTo(a);
            tempB.setTo(b);
            tempC.setTo(c);
        } else if (relationship === "safe") {
            if (startShapeInfo && !startShapeInfo.didIntersect) {
                tempA.setTo(a);
            }
            if (endShapeInfo && !endShapeInfo.didIntersect || distFn(handle_aCA, aCA) > distFn(handle_aCA, aCB)) {
                tempB.setTo(handleArc.center).add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].FromAngle(aCA + dAB * (Math.min(0.9, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_ARROW_LENGTH"] * shape.props.scale / lAB) * (isClockwise ? 1 : -1))).mul(handleArc.radius));
            }
        }
    }
    placeCenterHandle(handleArc.center, handleArc.radius, tempA, tempB, tempC, handle_dAB, isClockwise);
    if (tempA.equals(tempB)) {
        tempA.setTo(tempC.clone().addXY(1, 1));
        tempB.setTo(tempC.clone().subXY(1, 1));
    }
    a.setTo(tempA);
    b.setTo(tempB);
    c.setTo(tempC);
    const bodyArc = getArcInfo(a, b, c);
    return {
        bindings,
        type: "arc",
        start: {
            point: a,
            handle: terminalsInArrowSpace.start,
            arrowhead: shape.props.arrowheadStart
        },
        end: {
            point: b,
            handle: terminalsInArrowSpace.end,
            arrowhead: shape.props.arrowheadEnd
        },
        middle: c,
        handleArc,
        bodyArc,
        isValid: bodyArc.length !== 0 && isFinite(bodyArc.center.x) && isFinite(bodyArc.center.y)
    };
}
function getArcInfo(a, b, c) {
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["centerOfCircleFromThreePoints"])(a, b, c) ?? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Med(a, b);
    const radius = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(center, a);
    const sweepFlag = +__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Clockwise(a, c, b);
    const ab = ((a.y - b.y) ** 2 + (a.x - b.x) ** 2) ** 0.5;
    const bc = ((b.y - c.y) ** 2 + (b.x - c.x) ** 2) ** 0.5;
    const ca = ((c.y - a.y) ** 2 + (c.x - a.x) ** 2) ** 0.5;
    const theta = Math.acos((bc * bc + ca * ca - ab * ab) / (2 * bc * ca)) * 2;
    const largeArcFlag = +(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI"] > theta);
    const size = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI2"] - theta) * (sweepFlag ? 1 : -1);
    const length = size * radius;
    return {
        center,
        radius,
        size,
        length,
        largeArcFlag,
        sweepFlag
    };
}
function placeCenterHandle(center, radius, tempA, tempB, tempC, originalArcLength, isClockwise) {
    const aCA = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(center, tempA);
    const aCB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(center, tempB);
    let dAB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clockwiseAngleDist"])(aCA, aCB);
    if (!isClockwise) dAB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI2"] - dAB;
    tempC.setTo(center).add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].FromAngle(aCA + dAB * (0.5 * (isClockwise ? 1 : -1))).mul(radius));
    if (dAB > originalArcLength) {
        tempC.rotWith(center, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI"]);
        const t = tempB.clone();
        tempB.setTo(tempA);
        tempA.setTo(t);
    }
}
;
 //# sourceMappingURL=curved-arrow.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/definitions.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ElbowArrowAxes",
    ()=>ElbowArrowAxes,
    "ElbowArrowSideAxes",
    ()=>ElbowArrowSideAxes,
    "ElbowArrowSideDeltas",
    ()=>ElbowArrowSideDeltas,
    "ElbowArrowSideOpposites",
    ()=>ElbowArrowSideOpposites,
    "ElbowArrowSides",
    ()=>ElbowArrowSides
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
;
const ElbowArrowSides = [
    "right",
    "bottom",
    "left",
    "top"
];
const ElbowArrowSideDeltas = {
    top: {
        x: 0,
        y: -1
    },
    right: {
        x: 1,
        y: 0
    },
    bottom: {
        x: 0,
        y: 1
    },
    left: {
        x: -1,
        y: 0
    }
};
const ElbowArrowSideAxes = {
    left: "x",
    right: "x",
    top: "y",
    bottom: "y"
};
const ElbowArrowSideOpposites = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
};
const ElbowArrowAxes = {
    x: {
        v: (x, y)=>new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](x, y),
        loEdge: "left",
        hiEdge: "right",
        crossMid: "midY",
        gap: "gapX",
        midRange: "midXRange",
        self: "x",
        cross: "y",
        size: "width"
    },
    y: {
        v: (y, x)=>new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](x, y),
        loEdge: "top",
        hiEdge: "bottom",
        crossMid: "midX",
        gap: "gapY",
        midRange: "midYRange",
        self: "y",
        cross: "x",
        size: "height"
    }
};
;
 //# sourceMappingURL=definitions.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/range.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clampToRange",
    ()=>clampToRange,
    "createRange",
    ()=>createRange,
    "doRangesOverlap",
    ()=>doRangesOverlap,
    "expandRange",
    ()=>expandRange,
    "isWithinRange",
    ()=>isWithinRange,
    "rangeCenter",
    ()=>rangeCenter,
    "rangeSize",
    ()=>rangeSize,
    "subtractRange",
    ()=>subtractRange
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-ssr] (ecmascript)");
;
function expandRange(range, amount) {
    const newRange = {
        min: range.min - amount,
        max: range.max + amount
    };
    if (newRange.min > newRange.max) {
        return null;
    }
    return newRange;
}
function clampToRange(value, range) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(value, range.min, range.max);
}
function subtractRange(a, b) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(a.min <= a.max && b.min <= b.max);
    if (a.min <= b.min && b.max <= a.max) {
        return [
            {
                min: a.min,
                max: b.min
            },
            {
                min: b.max,
                max: a.max
            }
        ];
    }
    if (b.max <= a.min || b.min >= a.max) {
        return [
            a
        ];
    }
    if (b.min <= a.min && a.max <= b.max) {
        return [];
    }
    if (isWithinRange(a.min, b)) {
        return [
            {
                min: b.max,
                max: a.max
            }
        ];
    }
    if (isWithinRange(a.max, b)) {
        return [
            {
                min: a.min,
                max: b.min
            }
        ];
    }
    return [];
}
function createRange(a, b) {
    return {
        min: Math.min(a, b),
        max: Math.max(a, b)
    };
}
function doRangesOverlap(a, b) {
    return a.min <= b.max && a.max >= b.min;
}
function isWithinRange(value, range) {
    return value >= range.min && value <= range.max;
}
function rangeSize(range) {
    return range.max - range.min;
}
function rangeCenter(range) {
    return (range.min + range.max) / 2;
}
;
 //# sourceMappingURL=range.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/ElbowArrowWorkingInfo.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ElbowArrowTransform",
    ()=>ElbowArrowTransform,
    "ElbowArrowWorkingInfo",
    ()=>ElbowArrowWorkingInfo,
    "debugElbowArrowTransform",
    ()=>debugElbowArrowTransform,
    "transformElbowArrowTransform",
    ()=>transformElbowArrowTransform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
;
function flipEdgeCrossInPlace(edge) {
    if (!edge) return;
    const tmp = edge.cross.min;
    edge.cross.min = -edge.cross.max;
    edge.cross.max = -tmp;
    edge.crossTarget = -edge.crossTarget;
}
function flipEdgeValueInPlace(edge) {
    if (!edge) return;
    edge.value = -edge.value;
    edge.expanded = edge.expanded === null ? null : -edge.expanded;
}
const ElbowArrowTransform = {
    Identity: {
        x: 1,
        y: 1,
        transpose: false
    },
    Rotate90: {
        x: -1,
        y: 1,
        transpose: true
    },
    Rotate180: {
        x: -1,
        y: -1,
        transpose: false
    },
    Rotate270: {
        x: 1,
        y: -1,
        transpose: true
    },
    FlipX: {
        x: -1,
        y: 1,
        transpose: false
    },
    FlipY: {
        x: 1,
        y: -1,
        transpose: false
    }
};
function invertElbowArrowTransform(transform) {
    if (transform.transpose) {
        return {
            x: transform.y,
            y: transform.x,
            transpose: true
        };
    }
    return transform;
}
function transformElbowArrowTransform(a, b) {
    const next = {
        ...a
    };
    if (b.transpose) {
        swap(next, "x", "y");
        next.transpose = !next.transpose;
    }
    if (b.x === -1) {
        next.x = -next.x;
    }
    if (b.y === -1) {
        next.y = -next.y;
    }
    return next;
}
function swap(object, a, b) {
    const temp = object[a];
    object[a] = object[b];
    object[b] = temp;
}
function transformVecInPlace(transform, point) {
    point.x = transform.x * point.x;
    point.y = transform.y * point.y;
    if (transform.transpose) {
        swap(point, "x", "y");
    }
}
function transformBoxInPlace(transform, box) {
    if (transform.x === -1) {
        box.x = -(box.x + box.width);
    }
    if (transform.y === -1) {
        box.y = -(box.y + box.height);
    }
    if (transform.transpose) {
        swap(box, "x", "y");
        swap(box, "width", "height");
    }
}
function transformEdgesInPlace(transform, edges) {
    if (transform.x === -1) {
        swap(edges, "left", "right");
        flipEdgeCrossInPlace(edges.top);
        flipEdgeCrossInPlace(edges.bottom);
        flipEdgeValueInPlace(edges.left);
        flipEdgeValueInPlace(edges.right);
    }
    if (transform.y === -1) {
        swap(edges, "top", "bottom");
        flipEdgeCrossInPlace(edges.left);
        flipEdgeCrossInPlace(edges.right);
        flipEdgeValueInPlace(edges.top);
        flipEdgeValueInPlace(edges.bottom);
    }
    if (transform.transpose) {
        swap(edges, "left", "top");
        swap(edges, "right", "bottom");
    }
}
function debugElbowArrowTransform(transform) {
    switch(`${transform.transpose ? "t" : ""}${transform.x === -1 ? "x" : ""}${transform.y === -1 ? "y" : ""}`){
        case "":
            return "Identity";
        case "t":
            return "Transpose";
        case "x":
            return "FlipX";
        case "y":
            return "FlipY";
        case "tx":
            return "Rotate90";
        case "ty":
            return "Rotate270";
        case "xy":
            return "Rotate180";
        case "txy":
            return "spooky (transpose + flip both)";
        default:
            throw new Error("Unknown transform");
    }
}
class ElbowArrowWorkingInfo {
    options;
    A;
    B;
    common;
    gapX;
    gapY;
    midX;
    midY;
    bias;
    constructor(info){
        this.options = info.options;
        this.A = info.A;
        this.B = info.B;
        this.common = info.common;
        this.midX = info.midX;
        this.midY = info.midY;
        this.gapX = info.gapX;
        this.gapY = info.gapY;
        this.bias = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](1, 1);
    }
    transform = ElbowArrowTransform.Identity;
    inverse = ElbowArrowTransform.Identity;
    apply(transform) {
        this.transform = transformElbowArrowTransform(transform, this.transform);
        this.inverse = invertElbowArrowTransform(this.transform);
        transformBoxInPlace(transform, this.A.original);
        transformBoxInPlace(transform, this.B.original);
        transformBoxInPlace(transform, this.common.original);
        transformBoxInPlace(transform, this.A.expanded);
        transformBoxInPlace(transform, this.B.expanded);
        transformBoxInPlace(transform, this.common.expanded);
        transformEdgesInPlace(transform, this.A.edges);
        transformEdgesInPlace(transform, this.B.edges);
        transformVecInPlace(transform, this.bias);
        if (transform.x === -1) {
            this.gapX = -this.gapX;
            this.midX = this.midX === null ? null : -this.midX;
        }
        if (transform.y === -1) {
            this.gapY = -this.gapY;
            this.midY = this.midY === null ? null : -this.midY;
        }
        if (transform.transpose) {
            let temp = this.midX;
            this.midX = this.midY;
            this.midY = temp;
            temp = this.gapX;
            this.gapX = this.gapY;
            this.gapY = temp;
        }
    }
    reset() {
        this.apply(this.inverse);
    }
    vec(x, y) {
        const point = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](x, y);
        transformVecInPlace(this.inverse, point);
        return point;
    }
}
;
 //# sourceMappingURL=ElbowArrowWorkingInfo.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/ElbowArrowRouteBuilder.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ElbowArrowRouteBuilder",
    ()=>ElbowArrowRouteBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
;
const MIN_DISTANCE = 0.01;
class ElbowArrowRouteBuilder {
    constructor(info, name){
        this.info = info;
        this.name = name;
    }
    points = [];
    add(x, y) {
        this.points.push(this.info.vec(x, y));
        return this;
    }
    _midpointHandle = null;
    midpointHandle(axis) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(this._midpointHandle === null, "midX/midY called multiple times");
        const point = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Lrp(this.points[this.points.length - 2], this.points[this.points.length - 1], 0.5);
        this._midpointHandle = {
            axis: this.info.transform.transpose ? axis === "x" ? "y" : "x" : axis,
            point,
            segmentStart: this.points[this.points.length - 2].clone(),
            segmentEnd: this.points[this.points.length - 1].clone()
        };
        return this;
    }
    build() {
        const finalPoints = [];
        for(let i = 0; i < this.points.length; i++){
            const p0 = this.points[i];
            const p1 = finalPoints[finalPoints.length - 1];
            const p2 = finalPoints[finalPoints.length - 2];
            if (!p1 || !p2) {
                finalPoints.push(p0);
            } else {
                const d1x = Math.abs(p0.x - p1.x);
                const d1y = Math.abs(p0.y - p1.y);
                const d2x = Math.abs(p0.x - p2.x);
                const d2y = Math.abs(p0.y - p2.y);
                if (d1x < MIN_DISTANCE && d1y < MIN_DISTANCE) {} else if (d1x < MIN_DISTANCE && d2x < MIN_DISTANCE) {
                    p1.y = p0.y;
                } else if (d1y < MIN_DISTANCE && d2y < MIN_DISTANCE) {
                    p1.x = p0.x;
                } else {
                    finalPoints.push(p0);
                }
            }
        }
        return {
            name: this.name,
            points: finalPoints,
            distance: measureRouteManhattanDistance(finalPoints),
            aEdgePicking: "manual",
            bEdgePicking: "manual",
            skipPointsWhenDrawing: /* @__PURE__ */ new Set(),
            midpointHandle: this._midpointHandle
        };
    }
}
function measureRouteManhattanDistance(path) {
    let distance = 0;
    for(let i = 0; i < path.length - 1; i++){
        const start = path[i];
        const end = path[i + 1];
        distance += Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
    }
    return distance;
}
;
 //# sourceMappingURL=ElbowArrowRouteBuilder.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/elbowArrowRoutes.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "routeRightToBottom",
    ()=>routeRightToBottom,
    "routeRightToLeft",
    ()=>routeRightToLeft,
    "routeRightToRight",
    ()=>routeRightToRight,
    "routeRightToTop",
    ()=>routeRightToTop,
    "tryRouteArrow",
    ()=>tryRouteArrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/ElbowArrowRouteBuilder.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/ElbowArrowWorkingInfo.mjs [app-ssr] (ecmascript)");
;
;
function routeRightToLeft(info) {
    const aEdge = info.A.edges.right;
    const bEdge = info.B.edges.left;
    if (!aEdge || !bEdge) return null;
    if (aEdge.crossTarget > bEdge.crossTarget) {
        info.apply(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].FlipY);
    }
    if (info.gapX > 0 && info.midX !== null) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to left 1").add(aEdge.value, aEdge.crossTarget).add(info.midX, aEdge.crossTarget).add(info.midX, bEdge.crossTarget).midpointHandle("x").add(bEdge.value, bEdge.crossTarget).build();
    }
    if (aEdge.expanded === null || bEdge.expanded === null) return null;
    if (info.midY !== null) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to left 2").add(aEdge.value, aEdge.crossTarget).add(aEdge.expanded, aEdge.crossTarget).add(aEdge.expanded, info.midY).add(bEdge.expanded, info.midY).midpointHandle("y").add(bEdge.expanded, bEdge.crossTarget).add(bEdge.value, bEdge.crossTarget).build();
    }
    const arrow3Distance = Math.abs(aEdge.value - info.common.expanded.right) + Math.abs(aEdge.crossTarget - info.common.expanded.bottom) + Math.abs(info.common.expanded.right - bEdge.expanded) + Math.abs(info.common.expanded.bottom - bEdge.crossTarget) + info.options.expandElbowLegLength + 6;
    const arrow4Distance = info.options.expandElbowLegLength + Math.abs(aEdge.crossTarget - info.common.expanded.top) + Math.abs(aEdge.expanded - info.common.expanded.left) + Math.abs(info.common.expanded.top - bEdge.crossTarget) + Math.abs(info.common.expanded.left - bEdge.value) + // 6 points in this arrow, plus bias towards down/right:
    6 + info.bias.y;
    const arrow5Distance = info.gapX < 0 && info.midX !== null ? info.options.expandElbowLegLength + Math.abs(aEdge.crossTarget - info.A.expanded.bottom) + info.common.expanded.width + Math.abs(info.A.expanded.bottom - info.B.expanded.top) + Math.abs(info.B.expanded.top - bEdge.crossTarget) + info.options.expandElbowLegLength + // 8 points in this arrow
    8 : Infinity;
    if (arrow3Distance < arrow4Distance && arrow3Distance < arrow5Distance) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to left 3").add(aEdge.value, aEdge.crossTarget).add(info.common.expanded.right, aEdge.crossTarget).add(info.common.expanded.right, info.common.expanded.bottom).add(bEdge.expanded, info.common.expanded.bottom).add(bEdge.expanded, bEdge.crossTarget).add(bEdge.value, bEdge.crossTarget).build();
    }
    if (arrow4Distance < arrow5Distance) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to left 4").add(aEdge.value, aEdge.crossTarget).add(aEdge.expanded, aEdge.crossTarget).add(aEdge.expanded, info.common.expanded.top).add(info.common.expanded.left, info.common.expanded.top).add(info.common.expanded.left, bEdge.crossTarget).add(bEdge.value, bEdge.crossTarget).build();
    }
    if (info.midX !== null) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to left 5").add(aEdge.value, aEdge.crossTarget).add(aEdge.expanded, aEdge.crossTarget).add(aEdge.expanded, info.A.expanded.bottom).add(info.midX, info.A.expanded.bottom).add(info.midX, info.B.expanded.top).midpointHandle("y").add(bEdge.expanded, info.B.expanded.top).add(bEdge.expanded, bEdge.crossTarget).add(bEdge.value, bEdge.crossTarget).build();
    }
    return null;
}
function routeRightToTop(info) {
    const aEdge = info.A.edges.right;
    const bEdge = info.B.edges.top;
    if (!aEdge || !bEdge) return null;
    if (aEdge.crossTarget < (bEdge.expanded ?? bEdge.value) && bEdge.crossTarget > (aEdge.expanded ?? aEdge.value) || info.A.isPoint && info.B.expanded.containsPoint(info.A.original.center)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to top 1").add(aEdge.value, aEdge.crossTarget).add(bEdge.crossTarget, aEdge.crossTarget).add(bEdge.crossTarget, bEdge.value).build();
    }
    if (info.gapX > 0 && info.midX !== null && bEdge.expanded !== null) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to top 2").add(aEdge.value, aEdge.crossTarget).add(info.midX, aEdge.crossTarget).add(info.midX, bEdge.expanded).midpointHandle("x").add(bEdge.crossTarget, bEdge.expanded).add(bEdge.crossTarget, bEdge.value).build();
    }
    if (info.gapY > 0 && aEdge.expanded !== null && bEdge.crossTarget < aEdge.expanded && info.midY !== null) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to top 3").add(aEdge.value, aEdge.crossTarget).add(aEdge.expanded, aEdge.crossTarget).add(aEdge.expanded, info.midY).add(bEdge.crossTarget, info.midY).midpointHandle("y").add(bEdge.crossTarget, bEdge.value).build();
    }
    const arrow4Length = Math.abs(aEdge.value - info.common.expanded.right) + Math.abs(aEdge.crossTarget - info.common.expanded.top) + Math.abs(bEdge.crossTarget - info.common.expanded.right) + Math.abs(bEdge.value - info.common.expanded.top);
    const arrow5Length = aEdge.expanded !== null && info.midY !== null && bEdge.expanded !== null ? Math.abs(aEdge.value - aEdge.expanded) + Math.abs(info.B.expanded.left - aEdge.expanded) + Math.abs(info.B.expanded.left - bEdge.crossTarget) + Math.abs(aEdge.crossTarget - info.B.expanded.top) + Math.abs(bEdge.value - bEdge.expanded) : Infinity;
    const arrow6Length = aEdge.expanded !== null && info.midX !== null && bEdge.expanded !== null ? Math.abs(aEdge.value - info.common.expanded.right) + Math.abs(aEdge.crossTarget - info.A.expanded.bottom) + Math.abs(aEdge.expanded - bEdge.crossTarget) + Math.abs(info.A.expanded.bottom - bEdge.expanded) + Math.abs(bEdge.expanded - bEdge.value) : Infinity;
    if (arrow4Length < arrow5Length && arrow4Length < arrow6Length) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to top 4").add(aEdge.value, aEdge.crossTarget).add(info.common.expanded.right, aEdge.crossTarget).add(info.common.expanded.right, info.common.expanded.top).add(bEdge.crossTarget, info.common.expanded.top).add(bEdge.crossTarget, bEdge.value).build();
    }
    if (bEdge.expanded !== null && aEdge.expanded !== null && info.midY !== null && arrow5Length < arrow6Length) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to top 5").add(aEdge.value, aEdge.crossTarget).add(aEdge.expanded, aEdge.crossTarget).add(aEdge.expanded, info.midY).add(info.B.expanded.left, info.midY).midpointHandle("y").add(info.B.expanded.left, bEdge.expanded).add(bEdge.crossTarget, bEdge.expanded).add(bEdge.crossTarget, bEdge.value).build();
    }
    if (bEdge.expanded !== null && aEdge.expanded !== null && info.midX !== null) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to top 6").add(aEdge.value, aEdge.crossTarget).add(aEdge.expanded, aEdge.crossTarget).add(aEdge.expanded, info.A.expanded.bottom).add(info.midX, info.A.expanded.bottom).add(info.midX, bEdge.expanded).midpointHandle("x").add(bEdge.crossTarget, bEdge.expanded).add(bEdge.crossTarget, bEdge.value).build();
    }
    return null;
}
function routeRightToBottom(info) {
    info.apply(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].FlipY);
    return routeRightToTop(info);
}
function routeRightToRight(info) {
    const aEdge = info.A.edges.right;
    const bEdge = info.B.edges.right;
    if (!aEdge || !bEdge) return null;
    if ((info.gapX <= 0 || aEdge.crossTarget > info.B.expanded.bottom || aEdge.crossTarget < info.B.expanded.top) && (bEdge.value > info.A.original.left || bEdge.crossTarget > info.A.expanded.bottom || bEdge.crossTarget < info.A.expanded.top)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, "to right 1").add(aEdge.value, aEdge.crossTarget).add(info.common.expanded.right, aEdge.crossTarget).add(info.common.expanded.right, bEdge.crossTarget).add(bEdge.value, bEdge.crossTarget).build();
    }
    if (info.midX === null) return null;
    if (bEdge.expanded !== null && info.gapX >= 0) {
        const viaBottomLength = Math.abs(bEdge.crossTarget - info.B.expanded.bottom) + Math.abs(aEdge.crossTarget - info.B.expanded.bottom);
        const viaTopLength = Math.abs(bEdge.crossTarget - info.B.expanded.top) + Math.abs(aEdge.crossTarget - info.B.expanded.top);
        const topOrBottom = viaBottomLength < viaTopLength ? "bottom" : "top";
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, `to right 2 via ${topOrBottom}`).add(aEdge.value, aEdge.crossTarget).add(info.midX, aEdge.crossTarget).add(info.midX, info.B.expanded[topOrBottom]).midpointHandle("x").add(bEdge.expanded, info.B.expanded[topOrBottom]).add(bEdge.expanded, bEdge.crossTarget).add(bEdge.value, bEdge.crossTarget).build();
    }
    if (aEdge.expanded !== null && info.gapX <= 0) {
        const viaBottomLength = Math.abs(bEdge.crossTarget - info.A.expanded.bottom) + Math.abs(aEdge.crossTarget - info.A.expanded.bottom);
        const viaTopLength = Math.abs(bEdge.crossTarget - info.A.expanded.top) + Math.abs(aEdge.crossTarget - info.A.expanded.top);
        const topOrBottom = viaBottomLength < viaTopLength ? "bottom" : "top";
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowRouteBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowRouteBuilder"](info, `to right 3 via ${topOrBottom}`).add(aEdge.value, aEdge.crossTarget).add(aEdge.expanded, aEdge.crossTarget).add(aEdge.expanded, info.A.expanded[topOrBottom]).add(info.midX, info.A.expanded[topOrBottom]).add(info.midX, bEdge.crossTarget).midpointHandle("x").add(bEdge.value, bEdge.crossTarget).build();
    }
    return null;
}
const routes = {
    top: {
        top: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate270,
            routeRightToRight
        ],
        left: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate270,
            routeRightToTop
        ],
        bottom: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate270,
            routeRightToLeft
        ],
        right: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate270,
            routeRightToBottom
        ]
    },
    right: {
        top: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Identity,
            routeRightToTop
        ],
        right: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Identity,
            routeRightToRight
        ],
        bottom: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Identity,
            routeRightToBottom
        ],
        left: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Identity,
            routeRightToLeft
        ]
    },
    bottom: {
        top: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate90,
            routeRightToLeft
        ],
        left: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate90,
            routeRightToBottom
        ],
        bottom: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate90,
            routeRightToRight
        ],
        right: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate90,
            routeRightToTop
        ]
    },
    left: {
        top: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate180,
            routeRightToBottom
        ],
        left: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate180,
            routeRightToRight
        ],
        bottom: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate180,
            routeRightToTop
        ],
        right: [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowTransform"].Rotate180,
            routeRightToLeft
        ]
    }
};
function tryRouteArrow(info, aEdge, bEdge) {
    const [transform, routeFn] = routes[aEdge][bEdge];
    info.apply(transform);
    const route = routeFn(info);
    info.reset();
    return route;
}
;
 //# sourceMappingURL=elbowArrowRoutes.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/routeArrowWithAutoEdgePicking.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "routeArrowWithAutoEdgePicking",
    ()=>routeArrowWithAutoEdgePicking,
    "routeArrowWithManualEdgePicking",
    ()=>routeArrowWithManualEdgePicking,
    "routeArrowWithPartialEdgePicking",
    ()=>routeArrowWithPartialEdgePicking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/definitions.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/elbowArrowRoutes.mjs [app-ssr] (ecmascript)");
;
;
;
function routeArrowWithAutoEdgePicking(info, reason) {
    let idealRoute = null;
    if (// +1 to bias us towards the x-axis. without this, we get flicker as we move an arrow locket
    // to 45 deg (as gapx/gapy are almost equal and the result depends on floating point
    // precision)
    Math.abs(info.gapX) + 1 > Math.abs(info.gapY) && info.midX !== null) {
        if (info.gapX > 0) {
            idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "right", "left");
        } else {
            idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "left", "right");
        }
    } else {
        const aRight = info.A.edges.right;
        const aLeft = info.A.edges.left;
        const bTop = info.B.edges.top;
        const bBottom = info.B.edges.bottom;
        if (info.A.isPoint && info.B.isPoint) {
            if (info.gapY > 0) {
                idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "bottom", "top");
            } else {
                idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "top", "bottom");
            }
        } else if (aRight && bTop && (aRight.expanded ?? aRight.value) <= bTop.crossTarget && aRight.crossTarget <= (bTop.expanded ?? bTop.value)) {
            idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "right", "top");
        } else if (aRight && bBottom && (aRight.expanded ?? aRight.value) <= bBottom.crossTarget && aRight.crossTarget >= (bBottom.expanded ?? bBottom.value)) {
            idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "right", "bottom");
        } else if (aLeft && bTop && (aLeft.expanded ?? aLeft.value) >= bTop.crossTarget && aLeft.crossTarget <= (bTop.expanded ?? bTop.value)) {
            idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "left", "top");
        } else if (aLeft && bBottom && (aLeft.expanded ?? aLeft.value) >= bBottom.crossTarget && aLeft.crossTarget >= (bBottom.expanded ?? bBottom.value)) {
            idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "left", "bottom");
        } else if (info.gapY > 0 && info.midY !== null) {
            idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "bottom", "top");
        } else if (info.gapY < 0 && info.midY !== null) {
            idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "top", "bottom");
        }
    }
    if (idealRoute) {
        idealRoute.aEdgePicking = reason;
        idealRoute.bEdgePicking = reason;
        return idealRoute;
    }
    const aAvailableSide = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSides"].filter((side)=>info.A.edges[side]);
    const bAvailableSides = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSides"].filter((side)=>info.B.edges[side]);
    const nonPartialRouteCandidates = aAvailableSide.flatMap((aSide)=>bAvailableSides.map((bSide)=>[
                aSide,
                bSide,
                reason,
                reason
            ]));
    return pickBest(info, nonPartialRouteCandidates);
}
function routeArrowWithPartialEdgePicking(info, aSide) {
    let idealRoute = null;
    const aRight = info.A.edges.right;
    const aLeft = info.A.edges.left;
    const bTop = info.B.edges.top;
    const bBottom = info.B.edges.bottom;
    switch(aSide){
        case "right":
            if (info.gapX > 0 && info.gapX > Math.abs(info.gapY) && info.midX !== null) {
                idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "right", "left");
            } else if (aRight && bTop && (aRight.expanded ?? aRight.value) <= bTop.crossTarget && aRight.crossTarget <= (bTop.expanded ?? bTop.value)) {
                idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "right", "top");
            } else if (aRight && bBottom && (aRight.expanded ?? aRight.value) <= bBottom.crossTarget && aRight.crossTarget >= (bBottom.expanded ?? bBottom.value)) {
                idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "right", "bottom");
            }
            break;
        case "left":
            if (info.gapX < 0 && Math.abs(info.gapX) > Math.abs(info.gapY) && info.midX !== null) {
                idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "left", "right");
            } else if (aLeft && bTop && (aLeft.expanded ?? aLeft.value) >= bTop.crossTarget && aLeft.crossTarget <= (bTop.expanded ?? bTop.value)) {
                idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "left", "top");
            } else if (aLeft && bBottom && (aLeft.expanded ?? aLeft.value) >= bBottom.crossTarget && aLeft.crossTarget >= (bBottom.expanded ?? bBottom.value)) {
                idealRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, "left", "bottom");
            }
            break;
        case "top":
        case "bottom":
            break;
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(aSide);
    }
    if (idealRoute) {
        idealRoute.aEdgePicking = "manual";
        idealRoute.bEdgePicking = "auto";
        return idealRoute;
    }
    switch(aSide){
        case "top":
            return pickBest(info, [
                [
                    "top",
                    "bottom",
                    "manual",
                    "auto"
                ],
                [
                    "top",
                    "right",
                    "manual",
                    "auto"
                ],
                [
                    "top",
                    "left",
                    "manual",
                    "auto"
                ],
                [
                    "top",
                    "top",
                    "manual",
                    "auto"
                ]
            ]);
        case "bottom":
            return pickBest(info, [
                [
                    "bottom",
                    "top",
                    "manual",
                    "auto"
                ],
                [
                    "bottom",
                    "right",
                    "manual",
                    "auto"
                ],
                [
                    "bottom",
                    "left",
                    "manual",
                    "auto"
                ],
                [
                    "bottom",
                    "bottom",
                    "manual",
                    "auto"
                ]
            ]);
        case "left":
            return pickBest(info, [
                [
                    "left",
                    "right",
                    "manual",
                    "auto"
                ],
                [
                    "left",
                    "bottom",
                    "manual",
                    "auto"
                ],
                [
                    "left",
                    "left",
                    "manual",
                    "auto"
                ],
                [
                    "left",
                    "top",
                    "manual",
                    "auto"
                ]
            ]);
        case "right":
            return pickBest(info, [
                [
                    "right",
                    "left",
                    "manual",
                    "auto"
                ],
                [
                    "right",
                    "bottom",
                    "manual",
                    "auto"
                ],
                [
                    "right",
                    "right",
                    "manual",
                    "auto"
                ],
                [
                    "right",
                    "top",
                    "manual",
                    "auto"
                ]
            ]);
    }
}
function routeArrowWithManualEdgePicking(info, aSide, bSide) {
    const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, aSide, bSide);
    if (route) return route;
    if (info.A.isPoint && info.B.isPoint) {
        return pickBest(info, [
            [
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSideOpposites"][aSide],
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSideOpposites"][bSide],
                "manual",
                "manual"
            ],
            [
                aSide,
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSideOpposites"][bSide],
                "manual",
                "auto"
            ],
            [
                __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSideOpposites"][aSide],
                bSide,
                "auto",
                "manual"
            ]
        ]);
    } else if (info.A.isPoint) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSideOpposites"][aSide], bSide);
    } else if (info.B.isPoint) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, aSide, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSideOpposites"][bSide]);
    }
    return null;
}
function pickBest(info, edges) {
    let bestRoute = null;
    let bestCornerCount = Infinity;
    let bestDistance = Infinity;
    let distanceBias = 0;
    for (const [aSide, bSide, aEdgePicking, bEdgePicking] of edges){
        distanceBias += 1;
        const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$elbowArrowRoutes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tryRouteArrow"])(info, aSide, bSide);
        if (route) {
            route.aEdgePicking = aEdgePicking;
            route.bEdgePicking = bEdgePicking;
            if (route.points.length < bestCornerCount) {
                bestCornerCount = route.points.length;
                bestDistance = route.distance;
                bestRoute = route;
            } else if (route.points.length === bestCornerCount && route.distance + distanceBias < bestDistance) {
                bestDistance = route.distance;
                bestRoute = route;
            }
        }
    }
    return bestRoute;
}
;
 //# sourceMappingURL=routeArrowWithAutoEdgePicking.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/getElbowArrowInfo.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEdgeFromNormalizedAnchor",
    ()=>getEdgeFromNormalizedAnchor,
    "getElbowArrowInfo",
    ()=>getElbowArrowInfo,
    "getRouteHandlePath",
    ()=>getRouteHandlePath,
    "getUsableEdge",
    ()=>getUsableEdge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Geometry2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Mat.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/definitions.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/range.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/ElbowArrowWorkingInfo.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$routeArrowWithAutoEdgePicking$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/routes/routeArrowWithAutoEdgePicking.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
function getElbowArrowInfo(editor, arrow, bindings) {
    const shapeOptions = editor.getShapeUtil(arrow.type).options;
    const options = {
        elbowMidpoint: arrow.props.elbowMidPoint,
        expandElbowLegLength: shapeOptions.expandElbowLegLength[arrow.props.size] * arrow.props.scale,
        minElbowLegLength: shapeOptions.minElbowLegLength[arrow.props.size] * arrow.props.scale
    };
    let startTerminal = getElbowArrowTerminalInfo(editor, arrow, bindings.start, arrow.props.start);
    let endTerminal = getElbowArrowTerminalInfo(editor, arrow, bindings.end, arrow.props.end);
    startTerminal = adjustTerminalForUnclosedPathIfNeeded(startTerminal, endTerminal, options);
    endTerminal = adjustTerminalForUnclosedPathIfNeeded(endTerminal, startTerminal, options);
    const swapOrder = !!(!startTerminal.side && endTerminal.side);
    let { aTerminal, bTerminal } = swapOrder ? {
        aTerminal: endTerminal,
        bTerminal: startTerminal
    } : {
        aTerminal: startTerminal,
        bTerminal: endTerminal
    };
    let edgesA = {
        top: getUsableEdge(aTerminal, bTerminal, "top", options),
        right: getUsableEdge(aTerminal, bTerminal, "right", options),
        bottom: getUsableEdge(aTerminal, bTerminal, "bottom", options),
        left: getUsableEdge(aTerminal, bTerminal, "left", options)
    };
    let edgesB = {
        top: getUsableEdge(bTerminal, aTerminal, "top", options),
        right: getUsableEdge(bTerminal, aTerminal, "right", options),
        bottom: getUsableEdge(bTerminal, aTerminal, "bottom", options),
        left: getUsableEdge(bTerminal, aTerminal, "left", options)
    };
    const aIsUsable = hasUsableEdge(edgesA, aTerminal.side);
    const bIsUsable = hasUsableEdge(edgesB, bTerminal.side);
    let needsNewEdges = false;
    if (!aIsUsable || !bIsUsable) {
        needsNewEdges = true;
        if (!aIsUsable) {
            bTerminal = convertTerminalToPoint(bTerminal);
        }
        if (!bIsUsable) {
            aTerminal = convertTerminalToPoint(aTerminal);
        }
        if (bTerminal.bounds.containsPoint(aTerminal.target, options.expandElbowLegLength)) {
            bTerminal = convertTerminalToPoint(bTerminal);
        }
        if (aTerminal.bounds.containsPoint(bTerminal.target, options.expandElbowLegLength)) {
            aTerminal = convertTerminalToPoint(aTerminal);
        }
    }
    if (needsNewEdges) {
        edgesA = {
            top: getUsableEdge(aTerminal, bTerminal, "top", options),
            right: getUsableEdge(aTerminal, bTerminal, "right", options),
            bottom: getUsableEdge(aTerminal, bTerminal, "bottom", options),
            left: getUsableEdge(aTerminal, bTerminal, "left", options)
        };
        edgesB = {
            top: getUsableEdge(bTerminal, aTerminal, "top", options),
            right: getUsableEdge(bTerminal, aTerminal, "right", options),
            bottom: getUsableEdge(bTerminal, aTerminal, "bottom", options),
            left: getUsableEdge(bTerminal, aTerminal, "left", options)
        };
    }
    const expandedA = aTerminal.isPoint ? aTerminal.bounds : aTerminal.bounds.clone().expandBy(options.expandElbowLegLength);
    const expandedB = bTerminal.isPoint ? bTerminal.bounds : bTerminal.bounds.clone().expandBy(options.expandElbowLegLength);
    const common = {
        original: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].Common([
            aTerminal.bounds,
            bTerminal.bounds
        ]),
        expanded: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].Common([
            expandedA,
            expandedB
        ])
    };
    let gapX = bTerminal.bounds.minX - aTerminal.bounds.maxX;
    if (gapX < 0) {
        gapX = aTerminal.bounds.minX - bTerminal.bounds.maxX;
        if (gapX < 0) {
            gapX = 0;
        }
        gapX = -gapX;
    }
    let gapY = bTerminal.bounds.minY - aTerminal.bounds.maxY;
    if (gapY < 0) {
        gapY = aTerminal.bounds.minY - bTerminal.bounds.maxY;
        if (gapY < 0) {
            gapY = 0;
        }
        gapY = -gapY;
    }
    const aMinLength = aTerminal.minEndSegmentLength * 3;
    const bMinLength = bTerminal.minEndSegmentLength * 3;
    const minLegDistanceNeeded = (aTerminal.isPoint ? aMinLength : options.minElbowLegLength) + (bTerminal.isPoint ? bMinLength : options.minElbowLegLength);
    let mxRange = null;
    if (gapX > minLegDistanceNeeded) {
        mxRange = {
            a: aTerminal.isPoint ? aTerminal.bounds.maxX + aMinLength : expandedA.maxX,
            b: bTerminal.isPoint ? bTerminal.bounds.minX - bMinLength : expandedB.minX
        };
    } else if (gapX < -minLegDistanceNeeded) {
        mxRange = {
            a: aTerminal.isPoint ? aTerminal.bounds.minX - aMinLength : expandedA.minX,
            b: bTerminal.isPoint ? bTerminal.bounds.maxX + bMinLength : expandedB.maxX
        };
    }
    let myRange = null;
    if (gapY > minLegDistanceNeeded) {
        myRange = {
            a: aTerminal.isPoint ? aTerminal.bounds.maxY + aMinLength : expandedA.maxY,
            b: bTerminal.isPoint ? bTerminal.bounds.minY - bMinLength : expandedB.minY
        };
    } else if (gapY < -minLegDistanceNeeded) {
        myRange = {
            a: aTerminal.isPoint ? aTerminal.bounds.minY - aMinLength : expandedA.minY,
            b: bTerminal.isPoint ? bTerminal.bounds.maxY + bMinLength : expandedB.maxY
        };
    }
    const midpoint = swapOrder ? 1 - options.elbowMidpoint : options.elbowMidpoint;
    const mx = mxRange ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(mxRange.a, mxRange.b, midpoint) : null;
    const my = myRange ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(myRange.a, myRange.b, midpoint) : null;
    const info = {
        options,
        swapOrder,
        A: {
            isPoint: aTerminal.isPoint,
            target: aTerminal.target,
            isExact: aTerminal.isExact,
            arrowheadOffset: aTerminal.arrowheadOffset,
            minEndSegmentLength: aTerminal.minEndSegmentLength,
            original: aTerminal.bounds,
            expanded: expandedA,
            edges: edgesA,
            geometry: aTerminal.geometry
        },
        B: {
            isPoint: bTerminal.isPoint,
            target: bTerminal.target,
            isExact: bTerminal.isExact,
            arrowheadOffset: bTerminal.arrowheadOffset,
            minEndSegmentLength: bTerminal.minEndSegmentLength,
            original: bTerminal.bounds,
            expanded: expandedB,
            edges: edgesB,
            geometry: bTerminal.geometry
        },
        common,
        gapX,
        gapY,
        midX: mx,
        midY: my
    };
    const workingInfo = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$ElbowArrowWorkingInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowWorkingInfo"](info);
    const aSide = getSideToUse(aTerminal, bTerminal, info.A.edges);
    const bSide = getSideToUse(bTerminal, aTerminal, info.B.edges);
    let route;
    if (aSide && bSide) {
        route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$routeArrowWithAutoEdgePicking$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routeArrowWithManualEdgePicking"])(workingInfo, aSide, bSide);
    } else if (aSide && !bSide) {
        route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$routeArrowWithAutoEdgePicking$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routeArrowWithPartialEdgePicking"])(workingInfo, aSide);
    }
    if (!route) {
        route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$routes$2f$routeArrowWithAutoEdgePicking$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routeArrowWithAutoEdgePicking"])(workingInfo, aSide || bSide ? "fallback" : "auto");
    }
    if (route) {
        castPathSegmentIntoGeometry("first", info.A, info.B, route);
        castPathSegmentIntoGeometry("last", info.B, info.A, route);
        fixTinyEndNubs(route, aTerminal, bTerminal);
        if (swapOrder) route.points.reverse();
    }
    return {
        ...info,
        route,
        midXRange: mxRange ? swapOrder ? {
            lo: mxRange.b,
            hi: mxRange.a
        } : {
            lo: mxRange.a,
            hi: mxRange.b
        } : null,
        midYRange: myRange ? swapOrder ? {
            lo: myRange.b,
            hi: myRange.a
        } : {
            lo: myRange.a,
            hi: myRange.b
        } : null
    };
}
function getRouteHandlePath(info, route) {
    const startTarget = info.swapOrder ? info.B.target : info.A.target;
    const endTarget = info.swapOrder ? info.A.target : info.B.target;
    const firstSegmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(route.points[0], route.points[1]);
    const lastSegmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(route.points[route.points.length - 2], route.points[route.points.length - 1]);
    const newFirstSegmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(startTarget, route.points[1]);
    const newLastSegmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(route.points[route.points.length - 2], endTarget);
    const firstSegmentLengthChange = firstSegmentLength - newFirstSegmentLength;
    const lastSegmentLengthChange = lastSegmentLength - newLastSegmentLength;
    const newPoints = [
        startTarget,
        ...route.points,
        endTarget
    ];
    return {
        name: route.name,
        distance: route.distance + firstSegmentLengthChange + lastSegmentLengthChange,
        points: newPoints.filter((p)=>!route.skipPointsWhenDrawing.has(p)),
        aEdgePicking: route.aEdgePicking,
        bEdgePicking: route.bEdgePicking,
        skipPointsWhenDrawing: route.skipPointsWhenDrawing,
        midpointHandle: route.midpointHandle
    };
}
function getEdgeFromNormalizedAnchor(normalizedAnchor) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["approximately"])(normalizedAnchor.x, 0.5) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["approximately"])(normalizedAnchor.y, 0.5)) {
        return null;
    }
    if (Math.abs(normalizedAnchor.x - 0.5) > // slightly bias towards x arrows to prevent flickering when the anchor is right on the line
    // between the two directions
    Math.abs(normalizedAnchor.y - 0.5) - 1e-4) {
        return normalizedAnchor.x < 0.5 ? "left" : "right";
    }
    return normalizedAnchor.y < 0.5 ? "top" : "bottom";
}
function getElbowArrowTerminalInfo(editor, arrow, binding, point) {
    const arrowStrokeSize = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][arrow.props.size] * arrow.props.scale / 2;
    const minEndSegmentLength = arrowStrokeSize * 3;
    if (binding) {
        const target = editor.getShape(binding.toId);
        const geometry = getBindingGeometryInArrowSpace(editor, arrow, binding.toId, binding.props);
        if (geometry && target) {
            let arrowheadOffset = 0;
            const arrowheadProp = binding.props.terminal === "start" ? "arrowheadStart" : "arrowheadEnd";
            if (arrow.props[arrowheadProp] !== "none") {
                const targetScale = "scale" in target.props ? target.props.scale : 1;
                const targetStrokeSize = "size" in target.props ? (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][target.props.size] ?? 0) * targetScale / 2 : 0;
                arrowheadOffset = arrowStrokeSize + targetStrokeSize + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOUND_ARROW_OFFSET"] * arrow.props.scale;
            }
            let side = null;
            const targetPoint = geometry.target;
            if (binding.props.isPrecise) {
                side = getEdgeFromNormalizedAnchor(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].RotWith(binding.props.normalizedAnchor, {
                    x: 0.5,
                    y: 0.5
                }, geometry.shapeToArrowTransform.rotation()));
            }
            return {
                targetShapeId: binding.toId,
                isPoint: false,
                isExact: binding.props.isExact,
                bounds: geometry.bounds,
                geometry: geometry.geometry,
                target: targetPoint,
                arrowheadOffset,
                minEndSegmentLength,
                side,
                snap: binding.props.snap
            };
        }
    }
    return {
        targetShapeId: null,
        bounds: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].FromCenter(point, {
            x: 0,
            y: 0
        }),
        geometry: null,
        isExact: false,
        isPoint: true,
        target: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(point),
        arrowheadOffset: 0,
        minEndSegmentLength,
        side: null,
        snap: "none"
    };
}
function getBindingGeometryInArrowSpace(editor, arrow, targetId, bindingProps) {
    const hasArrowhead = bindingProps.terminal === "start" ? arrow.props.arrowheadStart !== "none" : arrow.props.arrowheadEnd !== "none";
    const targetGeometryInTargetSpace = editor.getShapeGeometry(targetId, hasArrowhead ? void 0 : {
        context: "@tldraw/arrow-without-arrowhead"
    });
    if (!targetGeometryInTargetSpace) {
        return null;
    }
    const arrowTransform = editor.getShapePageTransform(arrow.id);
    const shapeTransform = editor.getShapePageTransform(targetId);
    const shapeToArrowTransform = arrowTransform.clone().invert().multiply(shapeTransform);
    const targetGeometryInArrowSpace = targetGeometryInTargetSpace.transform(shapeToArrowTransform);
    const center = {
        x: 0.5,
        y: 0.5
    };
    const normalizedAnchor = bindingProps.isPrecise ? bindingProps.normalizedAnchor : center;
    const targetInShapeSpace = {
        x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(targetGeometryInTargetSpace.bounds.minX, targetGeometryInTargetSpace.bounds.maxX, normalizedAnchor.x),
        y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(targetGeometryInTargetSpace.bounds.minY, targetGeometryInTargetSpace.bounds.maxY, normalizedAnchor.y)
    };
    const centerInShapeSpace = {
        x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(targetGeometryInTargetSpace.bounds.minX, targetGeometryInTargetSpace.bounds.maxX, center.x),
        y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(targetGeometryInTargetSpace.bounds.minY, targetGeometryInTargetSpace.bounds.maxY, center.y)
    };
    const targetInArrowSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(shapeToArrowTransform, targetInShapeSpace);
    const centerInArrowSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(shapeToArrowTransform, centerInShapeSpace);
    return {
        bounds: targetGeometryInArrowSpace.bounds,
        geometry: targetGeometryInArrowSpace,
        target: targetInArrowSpace,
        center: centerInArrowSpace,
        shapeToArrowTransform
    };
}
const sideProps = {
    top: {
        expand: -1,
        main: "minY",
        opposite: "maxY",
        crossMid: "midX",
        crossMin: "minX",
        crossMax: "maxX",
        bRangeExpand: "max",
        crossAxis: "x"
    },
    bottom: {
        expand: 1,
        main: "maxY",
        opposite: "minY",
        crossMid: "midX",
        crossMin: "minX",
        crossMax: "maxX",
        bRangeExpand: "min",
        crossAxis: "x"
    },
    left: {
        expand: -1,
        main: "minX",
        opposite: "maxX",
        crossMid: "midY",
        crossMin: "minY",
        crossMax: "maxY",
        bRangeExpand: "max",
        crossAxis: "y"
    },
    right: {
        expand: 1,
        main: "maxX",
        opposite: "minX",
        crossMid: "midY",
        crossMin: "minY",
        crossMax: "maxY",
        bRangeExpand: "min",
        crossAxis: "y"
    }
};
function getUsableEdge(a, b, side, options) {
    const props = sideProps[side];
    const isSelfBoundAndShouldRouteExternal = a.targetShapeId === b.targetShapeId && a.targetShapeId !== null && (a.snap === "edge" || a.snap === "edge-point") && (b.snap === "edge" || b.snap === "edge-point");
    const aValue = a.bounds[props.main];
    const aExpanded = a.isPoint ? null : aValue + props.expand * options.expandElbowLegLength;
    const originalACrossRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRange"])(a.bounds[props.crossMin], a.bounds[props.crossMax]);
    let aCrossRange = originalACrossRange;
    if (!aCrossRange) {
        return null;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(originalACrossRange);
    const bRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRange"])(b.bounds[props.main], b.bounds[props.opposite]);
    if (!b.isPoint) {
        bRange[props.bRangeExpand] -= options.minElbowLegLength * 2 * props.expand;
    }
    const bCrossRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["expandRange"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRange"])(b.bounds[props.crossMin], b.bounds[props.crossMax]), options.expandElbowLegLength);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(bRange && bCrossRange);
    let isPartial = false;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWithinRange"])(aValue, bRange) && !a.isPoint && !b.isPoint && !isSelfBoundAndShouldRouteExternal) {
        const subtracted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subtractRange"])(aCrossRange, bCrossRange);
        switch(subtracted.length){
            case 0:
                return null;
            case 1:
                isPartial = subtracted[0] !== aCrossRange;
                aCrossRange = subtracted[0];
                break;
            case 2:
                isPartial = true;
                aCrossRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rangeSize"])(subtracted[0]) > (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rangeSize"])(subtracted[1]) ? subtracted[0] : subtracted[1];
                break;
            default:
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(subtracted);
        }
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$range$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWithinRange"])(a.target[props.crossAxis], aCrossRange)) {
        return null;
    }
    const crossTarget = a.target[props.crossAxis];
    return {
        value: aValue,
        expanded: aExpanded,
        cross: aCrossRange,
        crossTarget,
        isPartial
    };
}
function hasUsableEdge(edges, side) {
    if (side === null) {
        return !!(edges.bottom || edges.left || edges.right || edges.top);
    }
    if (side === "x") {
        return !!edges.left || !!edges.right;
    }
    if (side === "y") {
        return !!edges.top || !!edges.bottom;
    }
    return !!edges[side];
}
function getSideToUse(binding, other, edges) {
    switch(binding.side){
        case null:
            return null;
        case "x":
            if (binding.bounds.center.x > other.bounds.center.x && edges?.left) {
                return "left";
            } else if (edges?.right) {
                return "right";
            }
            return null;
        case "y":
            if (binding.bounds.center.y > other.bounds.center.y && edges?.top) {
                return "top";
            } else if (edges?.bottom) {
                return "bottom";
            }
            return null;
        default:
            return binding.side;
    }
}
function convertTerminalToPoint(terminal) {
    if (terminal.isPoint) return terminal;
    let side = null;
    let arrowheadOffset = 0;
    if (terminal.snap === "edge" || terminal.snap === "edge-point") {
        arrowheadOffset = terminal.arrowheadOffset;
        if (terminal.side === "x" || terminal.side === "left" || terminal.side === "right") {
            side = "x";
        }
        if (terminal.side === "y" || terminal.side === "top" || terminal.side === "bottom") {
            side = "y";
        }
    }
    return {
        targetShapeId: terminal.targetShapeId,
        side,
        bounds: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"](terminal.target.x, terminal.target.y, 0, 0),
        geometry: terminal.geometry,
        target: terminal.target,
        arrowheadOffset,
        minEndSegmentLength: terminal.minEndSegmentLength,
        isExact: terminal.isExact,
        isPoint: true,
        snap: terminal.snap
    };
}
function castPathSegmentIntoGeometry(segment, target, other, route) {
    if (!target.geometry) return;
    const point1 = segment === "first" ? route.points[0] : route.points[route.points.length - 1];
    const point2 = segment === "first" ? route.points[1] : route.points[route.points.length - 2];
    const pointToFindClosestIntersectionTo = target.geometry.isClosed ? point2 : target.target;
    const initialDistance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(point1, pointToFindClosestIntersectionTo);
    let nearestIntersectionToPoint2 = null;
    let nearestDistanceToPoint2 = Infinity;
    if (target.isExact) {
        nearestIntersectionToPoint2 = target.target;
    } else if (target.geometry) {
        const intersections = target.geometry.intersectLineSegment(point2, target.target, {
            includeLabels: false,
            includeInternal: false
        });
        if (target.geometry.hitTestPoint(target.target, Math.max(1, target.arrowheadOffset), true, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Geometry2dFilters"].EXCLUDE_NON_STANDARD)) {
            intersections.push(target.target);
        }
        for (const intersection of intersections){
            const point2Distance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(pointToFindClosestIntersectionTo, intersection);
            if (point2Distance < nearestDistanceToPoint2) {
                nearestDistanceToPoint2 = point2Distance;
                nearestIntersectionToPoint2 = intersection;
            }
        }
    }
    if (nearestIntersectionToPoint2) {
        let offset = target.arrowheadOffset;
        const currentFinalSegmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(point2, nearestIntersectionToPoint2);
        const minLength = target.arrowheadOffset * 2;
        if (currentFinalSegmentLength < minLength) {
            const targetLength = minLength - target.arrowheadOffset;
            offset = currentFinalSegmentLength - targetLength;
        }
        if (offset < target.minEndSegmentLength) {
            if (target.geometry.bounds.containsPoint(other.target)) {
                offset = Math.max(0, offset);
            } else {
                offset = -target.arrowheadOffset;
            }
        }
        let nudgedPoint = nearestIntersectionToPoint2;
        let shouldAddExtraPointForNudge = false;
        if (!target.isExact && offset !== 0) {
            const nudged = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Nudge(nearestIntersectionToPoint2, point2, offset);
            nudgedPoint = nudged;
            if (offset < 0 && !target.geometry.hitTestPoint(nudged, 0, true, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Geometry2dFilters"].EXCLUDE_NON_STANDARD)) {
                nudgedPoint = nearestIntersectionToPoint2;
            } else {
                if (offset < 0) {
                    shouldAddExtraPointForNudge = true;
                }
                nudgedPoint = nudged;
            }
        }
        const newDistance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(point2, nudgedPoint);
        route.distance += newDistance - initialDistance;
        point1.x = nudgedPoint.x;
        point1.y = nudgedPoint.y;
        if (shouldAddExtraPointForNudge) {
            const midPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Lrp(point2, point1, 0.5);
            route.skipPointsWhenDrawing.add(midPoint);
            route.points.splice(segment === "first" ? 1 : route.points.length - 1, 0, midPoint);
        }
    }
}
function fixTinyEndNubs(route, aTerminal, bTerminal) {
    if (!route) return;
    if (route.points.length >= 3) {
        const a = route.points[0];
        const b = route.points[1];
        const firstSegmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(a, b);
        if (firstSegmentLength < aTerminal.minEndSegmentLength) {
            route.points.splice(1, 1);
            if (route.points.length >= 3) {
                const matchAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["approximately"])(a.x, b.x) ? "y" : "x";
                route.points[1][matchAxis] = a[matchAxis];
            }
        }
    }
    if (route.points.length >= 3) {
        const a = route.points[route.points.length - 1];
        const b = route.points[route.points.length - 2];
        const lastSegmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(a, b);
        if (lastSegmentLength < bTerminal.minEndSegmentLength) {
            route.points.splice(route.points.length - 2, 1);
            if (route.points.length >= 3) {
                const matchAxis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["approximately"])(a.x, b.x) ? "y" : "x";
                route.points[route.points.length - 2][matchAxis] = a[matchAxis];
            }
        }
    }
}
function adjustTerminalForUnclosedPathIfNeeded(terminal, otherTerminal, options) {
    if (!terminal.geometry || terminal.geometry.isClosed) return terminal;
    const normalizedPointAlongPath = terminal.geometry.uninterpolateAlongEdge(terminal.target, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Geometry2dFilters"].EXCLUDE_NON_STANDARD);
    const prev = terminal.geometry.interpolateAlongEdge(normalizedPointAlongPath - 0.01 / terminal.geometry.length);
    const next = terminal.geometry.interpolateAlongEdge(normalizedPointAlongPath + 0.01 / terminal.geometry.length);
    const normal = next.sub(prev).per().uni();
    const axis = Math.abs(normal.x) > Math.abs(normal.y) ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowAxes"].x : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowAxes"].y;
    if (terminal.geometry.bounds.containsPoint(otherTerminal.target, options.expandElbowLegLength)) {
        terminal.side = axis.self;
        return convertTerminalToPoint(terminal);
    }
    const min = axis.v(terminal.target[axis.self] - terminal.bounds[axis.size] * 2, terminal.target[axis.cross]);
    const max = axis.v(terminal.target[axis.self] + terminal.bounds[axis.size] * 2, terminal.target[axis.cross]);
    let furthestIntersectionTowardsMin = null;
    let furthestIntersectionTowardsMinDistance = 0;
    let furthestIntersectionTowardsMax = null;
    let furthestIntersectionTowardsMaxDistance = 0;
    let side = axis.self;
    for (const intersection of terminal.geometry.intersectLineSegment(min, max, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Geometry2dFilters"].EXCLUDE_NON_STANDARD)){
        if (Math.abs(intersection[axis.self] - terminal.target[axis.self]) < 1) {
            continue;
        }
        if (intersection[axis.self] < terminal.target[axis.self]) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(intersection, terminal.target) > furthestIntersectionTowardsMinDistance) {
                furthestIntersectionTowardsMinDistance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(intersection, terminal.target);
                furthestIntersectionTowardsMin = intersection;
            }
        } else {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(intersection, terminal.target) > furthestIntersectionTowardsMaxDistance) {
                furthestIntersectionTowardsMaxDistance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(intersection, terminal.target);
                furthestIntersectionTowardsMax = intersection;
            }
        }
    }
    if (furthestIntersectionTowardsMin && furthestIntersectionTowardsMax) {
        if (furthestIntersectionTowardsMinDistance > furthestIntersectionTowardsMaxDistance) {
            side = axis.hiEdge;
        } else {
            side = axis.loEdge;
        }
    } else if (furthestIntersectionTowardsMin && !furthestIntersectionTowardsMax) {
        side = axis.hiEdge;
    } else if (!furthestIntersectionTowardsMin && furthestIntersectionTowardsMax) {
        side = axis.loEdge;
    }
    terminal.side = side;
    return terminal;
}
;
 //# sourceMappingURL=getElbowArrowInfo.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOUND_ARROW_OFFSET",
    ()=>BOUND_ARROW_OFFSET,
    "MIN_ARROW_LENGTH",
    ()=>MIN_ARROW_LENGTH,
    "STROKE_SIZES",
    ()=>STROKE_SIZES,
    "WAY_TOO_BIG_ARROW_BEND_FACTOR",
    ()=>WAY_TOO_BIG_ARROW_BEND_FACTOR,
    "createOrUpdateArrowBinding",
    ()=>createOrUpdateArrowBinding,
    "getArrowBindings",
    ()=>getArrowBindings,
    "getArrowInfo",
    ()=>getArrowInfo,
    "getArrowTerminalInArrowSpace",
    ()=>getArrowTerminalInArrowSpace,
    "getArrowTerminalsInArrowSpace",
    ()=>getArrowTerminalsInArrowSpace,
    "getBoundShapeInfoForTerminal",
    ()=>getBoundShapeInfoForTerminal,
    "getBoundShapeRelationships",
    ()=>getBoundShapeRelationships,
    "getIsArrowStraight",
    ()=>getIsArrowStraight,
    "removeArrowBinding",
    ()=>removeArrowBinding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Mat.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/store/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$lib$2f$Store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/store/dist-esm/lib/Store.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$curved$2d$arrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/curved-arrow.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$getElbowArrowInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/getElbowArrowInfo.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$straight$2d$arrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/straight-arrow.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
const MIN_ARROW_BEND = 8;
function getIsArrowStraight(shape) {
    if (shape.props.kind !== "arc") return false;
    return Math.abs(shape.props.bend) < MIN_ARROW_BEND * shape.props.scale;
}
function getBoundShapeInfoForTerminal(editor, arrow, terminalName) {
    const binding = editor.getBindingsFromShape(arrow, "arrow").find((b)=>b.props.terminal === terminalName);
    if (!binding) return;
    const boundShape = editor.getShape(binding.toId);
    if (!boundShape) return;
    const transform = editor.getShapePageTransform(boundShape);
    const hasArrowhead = terminalName === "start" ? arrow.props.arrowheadStart !== "none" : arrow.props.arrowheadEnd !== "none";
    const geometry = editor.getShapeGeometry(boundShape, hasArrowhead ? void 0 : {
        context: "@tldraw/arrow-without-arrowhead"
    });
    return {
        shape: boundShape,
        transform,
        isClosed: geometry.isClosed,
        isExact: binding.props.isExact,
        didIntersect: false,
        geometry
    };
}
function getArrowTerminalInArrowSpace(editor, arrowPageTransform, binding, forceImprecise) {
    const boundShape = editor.getShape(binding.toId);
    if (!boundShape) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](0, 0);
    } else {
        const { point, size } = editor.getShapeGeometry(boundShape).bounds;
        const shapePoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].MulV(// if the parent is the bound shape, then it's ALWAYS precise
        binding.props.isPrecise || forceImprecise ? binding.props.normalizedAnchor : {
            x: 0.5,
            y: 0.5
        }, size));
        const pagePoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(editor.getShapePageTransform(boundShape), shapePoint);
        const arrowPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].applyToPoint(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Mat$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mat"].Inverse(arrowPageTransform), pagePoint);
        return arrowPoint;
    }
}
const arrowBindingsCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$lib$2f$Store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createComputedCache"])("arrow bindings", (editor, arrow)=>{
    const bindings = editor.getBindingsFromShape(arrow.id, "arrow");
    return {
        start: bindings.find((b)=>b.props.terminal === "start"),
        end: bindings.find((b)=>b.props.terminal === "end")
    };
}, {
    // we only look at the arrow IDs:
    areRecordsEqual: (a, b)=>a.id === b.id,
    // the records should stay the same:
    areResultsEqual: (a, b)=>a.start === b.start && a.end === b.end
});
function getArrowBindings(editor, shape) {
    return arrowBindingsCache.get(editor, shape.id);
}
const arrowInfoCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$lib$2f$Store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createComputedCache"])("arrow info", (editor, shape)=>{
    const bindings = getArrowBindings(editor, shape);
    if (shape.props.kind === "elbow") {
        const elbowInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$getElbowArrowInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElbowArrowInfo"])(editor, shape, bindings);
        if (!elbowInfo?.route) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$straight$2d$arrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStraightArrowInfo"])(editor, shape, bindings);
        const start = elbowInfo.swapOrder ? elbowInfo.B : elbowInfo.A;
        const end = elbowInfo.swapOrder ? elbowInfo.A : elbowInfo.B;
        return {
            type: "elbow",
            bindings,
            start: {
                handle: start.target,
                point: elbowInfo.route.points[0],
                arrowhead: shape.props.arrowheadStart
            },
            end: {
                handle: end.target,
                point: elbowInfo.route.points[elbowInfo.route.points.length - 1],
                arrowhead: shape.props.arrowheadEnd
            },
            elbow: elbowInfo,
            route: elbowInfo.route,
            isValid: true
        };
    }
    if (getIsArrowStraight(shape)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$straight$2d$arrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStraightArrowInfo"])(editor, shape, bindings);
    } else {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$curved$2d$arrow$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurvedArrowInfo"])(editor, shape, bindings);
    }
}, {
    areRecordsEqual: (a, b)=>a.props === b.props,
    areResultsEqual: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEqualAllowingForFloatingPointErrors"]
});
function getArrowInfo(editor, shape) {
    const id = typeof shape === "string" ? shape : shape.id;
    return arrowInfoCache.get(editor, id);
}
function getArrowTerminalsInArrowSpace(editor, shape, bindings) {
    const arrowPageTransform = editor.getShapePageTransform(shape);
    const boundShapeRelationships = getBoundShapeRelationships(editor, bindings.start?.toId, bindings.end?.toId);
    const start = bindings.start ? getArrowTerminalInArrowSpace(editor, arrowPageTransform, bindings.start, boundShapeRelationships === "double-bound" || boundShapeRelationships === "start-contains-end") : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(shape.props.start);
    const end = bindings.end ? getArrowTerminalInArrowSpace(editor, arrowPageTransform, bindings.end, boundShapeRelationships === "double-bound" || boundShapeRelationships === "end-contains-start") : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(shape.props.end);
    return {
        start,
        end
    };
}
function createOrUpdateArrowBinding(editor, arrow, target, props) {
    const arrowId = typeof arrow === "string" ? arrow : arrow.id;
    const targetId = typeof target === "string" ? target : target.id;
    const existingMany = editor.getBindingsFromShape(arrowId, "arrow").filter((b)=>b.props.terminal === props.terminal);
    if (existingMany.length > 1) {
        editor.deleteBindings(existingMany.slice(1));
    }
    const existing = existingMany[0];
    if (existing) {
        editor.updateBinding({
            ...existing,
            toId: targetId,
            props
        });
    } else {
        editor.createBinding({
            type: "arrow",
            fromId: arrowId,
            toId: targetId,
            props
        });
    }
}
function removeArrowBinding(editor, arrow, terminal) {
    const existing = editor.getBindingsFromShape(arrow, "arrow").filter((b)=>b.props.terminal === terminal);
    editor.deleteBindings(existing);
}
const MIN_ARROW_LENGTH = 10;
const BOUND_ARROW_OFFSET = 10;
const WAY_TOO_BIG_ARROW_BEND_FACTOR = 10;
const STROKE_SIZES = {
    s: 2,
    m: 3.5,
    l: 5,
    xl: 10
};
function getBoundShapeRelationships(editor, startShapeId, endShapeId) {
    if (!startShapeId || !endShapeId) return "safe";
    if (startShapeId === endShapeId) return "double-bound";
    const startBounds = editor.getShapePageBounds(startShapeId);
    const endBounds = editor.getShapePageBounds(endShapeId);
    if (startBounds && endBounds) {
        if (startBounds.contains(endBounds)) return "start-contains-end";
        if (endBounds.contains(startBounds)) return "end-contains-start";
    }
    return "safe";
}
;
 //# sourceMappingURL=shared.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/arrowTargetState.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearArrowTargetState",
    ()=>clearArrowTargetState,
    "getArrowTargetState",
    ()=>getArrowTargetState,
    "updateArrowTargetState",
    ()=>updateArrowTargetState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Geometry2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/definitions.mjs [app-ssr] (ecmascript)");
;
;
const arrowTargetStore = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WeakCache"]();
function getArrowTargetAtom(editor) {
    return arrowTargetStore.get(editor, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])("arrowTarget", null));
}
function getArrowTargetState(editor) {
    return getArrowTargetAtom(editor).get();
}
function clearArrowTargetState(editor) {
    getArrowTargetAtom(editor).set(null);
}
function updateArrowTargetState({ editor, pointInPageSpace, arrow, isPrecise, currentBinding, oppositeBinding }) {
    const util = editor.getShapeUtil("arrow");
    if (util.options.shouldIgnoreTargets(editor)) {
        getArrowTargetAtom(editor).set(null);
        return null;
    }
    const arrowKind = arrow ? arrow.props.kind : editor.getStyleForNextShape(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrowShapeKindStyle"]);
    const target = editor.getShapeAtPoint(pointInPageSpace, {
        hitInside: true,
        hitFrameInside: true,
        margin: arrowKind === "elbow" ? 8 : [
            8,
            0
        ],
        filter: (targetShape)=>{
            return !targetShape.isLocked && editor.canBindShapes({
                fromShape: arrow ?? targetFilterFallback,
                toShape: targetShape,
                binding: "arrow"
            });
        }
    });
    if (!target) {
        getArrowTargetAtom(editor).set(null);
        return null;
    }
    const targetGeometryInTargetSpace = editor.getShapeGeometry(target);
    const targetBoundsInTargetSpace = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].ZeroFix(targetGeometryInTargetSpace.bounds);
    const targetCenterInTargetSpace = targetGeometryInTargetSpace.center;
    const targetTransform = editor.getShapePageTransform(target);
    const pointInTargetSpace = editor.getPointInShapeSpace(target, pointInPageSpace);
    const castDistance = Math.max(targetGeometryInTargetSpace.bounds.width, targetGeometryInTargetSpace.bounds.height);
    const handlesInPageSpace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapObjectMapValues"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSideDeltas"], (side, delta)=>{
        const axis = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowAxes"][__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowSideAxes"][side]];
        const farPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Mul(delta, castDistance).add(targetCenterInTargetSpace);
        let isEnabled = false;
        let handlePointInTargetSpace = axis.v(targetBoundsInTargetSpace[side], targetBoundsInTargetSpace[axis.crossMid]);
        let furthestDistance = 0;
        const intersections = targetGeometryInTargetSpace.intersectLineSegment(targetCenterInTargetSpace, farPoint, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Geometry2dFilters"].EXCLUDE_NON_STANDARD);
        for (const intersection of intersections){
            const distance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist2(intersection, targetCenterInTargetSpace);
            if (distance > furthestDistance) {
                furthestDistance = distance;
                handlePointInTargetSpace = intersection;
                isEnabled = targetGeometryInTargetSpace.isClosed;
            }
        }
        const handlePointInPageSpace = targetTransform.applyToPoint(handlePointInTargetSpace);
        return {
            point: handlePointInPageSpace,
            isEnabled,
            far: targetTransform.applyToPoint(farPoint)
        };
    });
    const zoomLevel = editor.getZoomLevel();
    const minDistScaled = util.options.minElbowHandleDistance / zoomLevel;
    const targetCenterInPageSpace = targetTransform.applyToPoint(targetCenterInTargetSpace);
    for (const side of (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["objectMapKeys"])(handlesInPageSpace)){
        const handle = handlesInPageSpace[side];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].DistMin(handle.point, targetCenterInPageSpace, minDistScaled)) {
            handle.isEnabled = false;
        }
    }
    let precise = isPrecise;
    if (!precise) {
        if (!currentBinding || currentBinding && target.id !== currentBinding.toId) {
            precise = editor.inputs.getPointerVelocity().len() < 0.5;
        }
    }
    if (!isPrecise) {
        if (!targetGeometryInTargetSpace.isClosed) {
            precise = true;
        }
        if (oppositeBinding && target.id === oppositeBinding.toId && oppositeBinding.props.isPrecise) {
            precise = true;
        }
    }
    const isExact = util.options.shouldBeExact(editor, precise);
    if (isExact) precise = true;
    const shouldSnapCenter = !isExact && precise && targetGeometryInTargetSpace.isClosed;
    const shouldSnapEdges = !isExact && (precise && arrowKind === "elbow" || !targetGeometryInTargetSpace.isClosed);
    const shouldSnapEdgePoints = !isExact && precise && arrowKind === "elbow" && targetGeometryInTargetSpace.isClosed;
    const shouldSnapNone = precise && (targetGeometryInTargetSpace.isClosed || isExact);
    const shouldSnapCenterAxis = !isExact && precise && arrowKind === "elbow" && targetGeometryInTargetSpace.isClosed;
    let snap = "none";
    let anchorInPageSpace = pointInPageSpace;
    if (!shouldSnapNone) {
        snap = "center";
        anchorInPageSpace = targetCenterInPageSpace;
    }
    if (shouldSnapEdges) {
        const snapDistance = shouldSnapNone ? calculateSnapDistance(editor, targetBoundsInTargetSpace, util.options.elbowArrowEdgeSnapDistance) : Infinity;
        const nearestPointOnEdgeInTargetSpace = targetGeometryInTargetSpace.nearestPoint(pointInTargetSpace, {
            includeLabels: false,
            includeInternal: false
        });
        const nearestPointOnEdgeInPageSpace = targetTransform.applyToPoint(nearestPointOnEdgeInTargetSpace);
        const distance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(nearestPointOnEdgeInPageSpace, pointInPageSpace);
        if (distance < snapDistance) {
            snap = "edge";
            anchorInPageSpace = nearestPointOnEdgeInPageSpace;
        }
    }
    if (shouldSnapCenterAxis) {
        const snapDistance = calculateSnapDistance(editor, targetBoundsInTargetSpace, util.options.elbowArrowAxisSnapDistance);
        const distanceFromXAxis = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].DistanceToLineSegment(handlesInPageSpace.left.far, handlesInPageSpace.right.far, pointInPageSpace);
        const distanceFromYAxis = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].DistanceToLineSegment(handlesInPageSpace.top.far, handlesInPageSpace.bottom.far, pointInPageSpace);
        const snapAxis = distanceFromXAxis < distanceFromYAxis && distanceFromXAxis < snapDistance ? "x" : distanceFromYAxis < snapDistance ? "y" : null;
        if (snapAxis) {
            const axis = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowAxes"][snapAxis];
            const loDist2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist2(handlesInPageSpace[axis.loEdge].far, pointInPageSpace);
            const hiDist2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist2(handlesInPageSpace[axis.hiEdge].far, pointInPageSpace);
            const side = loDist2 < hiDist2 ? axis.loEdge : axis.hiEdge;
            if (handlesInPageSpace[side].isEnabled) {
                snap = "edge-point";
                anchorInPageSpace = handlesInPageSpace[side].point;
            }
        }
    }
    if (shouldSnapEdgePoints) {
        const snapDistance = calculateSnapDistance(editor, targetBoundsInTargetSpace, util.options.elbowArrowPointSnapDistance);
        let closestSide = null;
        let closestDistance = Infinity;
        for (const [side, handle] of (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["objectMapEntries"])(handlesInPageSpace)){
            if (!handle.isEnabled) continue;
            const distance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(handle.point, pointInPageSpace);
            if (distance < snapDistance && distance < closestDistance) {
                closestDistance = distance;
                closestSide = side;
            }
        }
        if (closestSide) {
            snap = "edge-point";
            anchorInPageSpace = handlesInPageSpace[closestSide].point;
        }
    }
    if (shouldSnapCenter) {
        const snapDistance = calculateSnapDistance(editor, targetBoundsInTargetSpace, arrowKind === "elbow" ? util.options.elbowArrowCenterSnapDistance : util.options.arcArrowCenterSnapDistance);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(pointInTargetSpace, targetBoundsInTargetSpace.center) < snapDistance) {
            snap = "center";
            anchorInPageSpace = targetCenterInPageSpace;
        }
    }
    const snapPointInTargetSpace = editor.getPointInShapeSpace(target, anchorInPageSpace);
    const normalizedAnchor = {
        x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invLerp"])(targetBoundsInTargetSpace.minX, targetBoundsInTargetSpace.maxX, snapPointInTargetSpace.x),
        y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invLerp"])(targetBoundsInTargetSpace.minY, targetBoundsInTargetSpace.maxY, snapPointInTargetSpace.y)
    };
    const result = {
        target,
        arrowKind,
        handlesInPageSpace,
        centerInPageSpace: targetCenterInPageSpace,
        anchorInPageSpace,
        isExact,
        isPrecise: precise,
        snap,
        normalizedAnchor
    };
    getArrowTargetAtom(editor).set(result);
    return result;
}
const targetFilterFallback = {
    type: "arrow"
};
function calculateSnapDistance(editor, targetBoundsInTargetSpace, idealSnapDistance) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(Math.min(targetBoundsInTargetSpace.width, targetBoundsInTargetSpace.height) * 0.15, 4, idealSnapDistance) / editor.getZoomLevel();
}
;
 //# sourceMappingURL=arrowTargetState.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/toolStates/Idle.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Idle",
    ()=>Idle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/tools/SelectTool/selectHelpers.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowTargetState$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/arrowTargetState.mjs [app-ssr] (ecmascript)");
;
;
;
class Idle extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "idle";
    isPrecise = false;
    isPreciseTimerId = null;
    preciseTargetId = null;
    onPointerMove() {
        this.update();
    }
    onPointerDown(info) {
        this.parent.transition("pointing", {
            ...info,
            isPrecise: this.isPrecise
        });
    }
    onEnter() {
        this.editor.setCursor({
            type: "cross",
            rotation: 0
        });
        this.update();
    }
    onCancel() {
        this.editor.setCurrentTool("select");
    }
    onExit() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowTargetState$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearArrowTargetState"])(this.editor);
        if (this.isPreciseTimerId !== null) {
            clearTimeout(this.isPreciseTimerId);
        }
    }
    onKeyDown() {
        this.update();
    }
    onKeyUp(info) {
        this.update();
        if (info.key === "Enter") {
            const onlySelectedShape = this.editor.getOnlySelectedShape();
            if (this.editor.canEditShape(onlySelectedShape)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$tools$2f$SelectTool$2f$selectHelpers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startEditingShapeWithRichText"])(this.editor, onlySelectedShape, {
                    selectAll: true
                });
            }
        }
    }
    update() {
        const arrowUtil = this.editor.getShapeUtil("arrow");
        const targetState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowTargetState$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateArrowTargetState"])({
            editor: this.editor,
            pointInPageSpace: this.editor.inputs.getCurrentPagePoint(),
            arrow: void 0,
            isPrecise: this.isPrecise,
            currentBinding: void 0,
            oppositeBinding: void 0
        });
        if (targetState && targetState.target.id !== this.preciseTargetId) {
            if (this.isPreciseTimerId !== null) {
                clearTimeout(this.isPreciseTimerId);
            }
            this.preciseTargetId = targetState.target.id;
            this.isPreciseTimerId = this.editor.timers.setTimeout(()=>{
                this.isPrecise = true;
                this.update();
            }, arrowUtil.options.hoverPreciseTimeout);
        } else if (!targetState && this.preciseTargetId) {
            this.isPrecise = false;
            this.preciseTargetId = null;
            if (this.isPreciseTimerId !== null) {
                clearTimeout(this.isPreciseTimerId);
            }
        }
    }
}
;
 //# sourceMappingURL=Idle.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/toolStates/Pointing.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pointing",
    ()=>Pointing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/BaseBoxShapeTool/children/Pointing.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowTargetState$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/arrowTargetState.mjs [app-ssr] (ecmascript)");
;
;
class Pointing extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "pointing";
    shape;
    isPrecise = false;
    isPreciseTimerId = null;
    markId = "";
    onEnter(info) {
        this.markId = "";
        this.isPrecise = !!info.isPrecise;
        const targetState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowTargetState$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateArrowTargetState"])({
            editor: this.editor,
            pointInPageSpace: this.editor.inputs.getCurrentPagePoint(),
            arrow: void 0,
            isPrecise: this.isPrecise,
            currentBinding: void 0,
            oppositeBinding: void 0
        });
        if (!targetState) {
            this.createArrowShape();
            if (!this.shape) {
                this.cancel();
                return;
            }
        }
        this.startPreciseTimeout();
    }
    onExit() {
        this.shape = void 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowTargetState$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearArrowTargetState"])(this.editor);
        this.clearPreciseTimeout();
    }
    onPointerMove() {
        if (this.editor.inputs.getIsDragging()) {
            if (!this.shape) {
                this.createArrowShape();
            }
            if (!this.shape) {
                this.cancel();
                return;
            }
            this.updateArrowShapeEndHandle();
            this.editor.setCurrentTool("select.dragging_handle", {
                shape: this.shape,
                handle: {
                    id: "end",
                    type: "vertex",
                    index: "a3",
                    x: 0,
                    y: 0
                },
                isCreating: true,
                creatingMarkId: this.markId || void 0,
                onInteractionEnd: "arrow"
            });
        }
    }
    onPointerUp() {
        this.cancel();
    }
    onCancel() {
        this.cancel();
    }
    onComplete() {
        this.cancel();
    }
    onInterrupt() {
        this.cancel();
    }
    cancel() {
        if (this.shape) {
            this.editor.bailToMark(this.markId);
        }
        this.parent.transition("idle");
    }
    createArrowShape() {
        const originPagePoint = this.editor.inputs.getOriginPagePoint();
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createShapeId"])();
        this.markId = this.editor.markHistoryStoppingPoint(`creating_arrow:${id}`);
        const newPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(originPagePoint, this.editor);
        this.editor.createShape({
            id,
            type: "arrow",
            x: newPoint.x,
            y: newPoint.y,
            props: {
                scale: this.editor.user.getIsDynamicResizeMode() ? 1 / this.editor.getZoomLevel() : 1
            }
        });
        const shape = this.editor.getShape(id);
        if (!shape) return;
        const handles = this.editor.getShapeHandles(shape);
        if (!handles) throw Error(`expected handles for arrow`);
        const util = this.editor.getShapeUtil("arrow");
        const initial = this.shape;
        const startHandle = handles.find((h)=>h.id === "start");
        const change = util.onHandleDrag?.(shape, {
            handle: {
                ...startHandle,
                x: 0,
                y: 0
            },
            isPrecise: true,
            isCreatingShape: true,
            initial
        });
        if (change) {
            this.editor.updateShapes([
                change
            ]);
        }
        this.shape = this.editor.getShape(id);
        this.editor.select(id);
    }
    updateArrowShapeEndHandle() {
        const shape = this.shape;
        if (!shape) throw Error(`expected shape`);
        const handles = this.editor.getShapeHandles(shape);
        if (!handles) throw Error(`expected handles for arrow`);
        {
            const util = this.editor.getShapeUtil("arrow");
            const initial = this.shape;
            const startHandle = handles.find((h)=>h.id === "start");
            const change = util.onHandleDrag?.(shape, {
                handle: {
                    ...startHandle,
                    x: 0,
                    y: 0
                },
                isPrecise: this.isPrecise,
                isCreatingShape: true,
                initial
            });
            if (change) {
                this.editor.updateShapes([
                    change
                ]);
            }
        }
        {
            const util = this.editor.getShapeUtil("arrow");
            const initial = this.shape;
            const point = this.editor.getPointInShapeSpace(shape, this.editor.inputs.getCurrentPagePoint());
            const endHandle = handles.find((h)=>h.id === "end");
            const change = util.onHandleDrag?.(this.editor.getShape(shape), {
                handle: {
                    ...endHandle,
                    x: point.x,
                    y: point.y
                },
                isPrecise: this.isPrecise,
                isCreatingShape: true,
                initial
            });
            if (change) {
                this.editor.updateShapes([
                    change
                ]);
            }
        }
        this.shape = this.editor.getShape(shape.id);
    }
    startPreciseTimeout() {
        const arrowUtil = this.editor.getShapeUtil("arrow");
        this.isPreciseTimerId = this.editor.timers.setTimeout(()=>{
            if (!this.getIsActive()) return;
            this.isPrecise = true;
        }, arrowUtil.options.pointingPreciseTimeout);
    }
    clearPreciseTimeout() {
        if (this.isPreciseTimerId !== null) {
            clearTimeout(this.isPreciseTimerId);
        }
    }
}
;
 //# sourceMappingURL=Pointing.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/ArrowShapeTool.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowShapeTool",
    ()=>ArrowShapeTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/StateNode.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/toolStates/Idle.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/toolStates/Pointing.mjs [app-ssr] (ecmascript)");
;
;
;
class ArrowShapeTool extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$StateNode$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = "arrow";
    static initial = "idle";
    static children() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$toolStates$2f$Idle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Idle"],
            __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$toolStates$2f$Pointing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pointing"]
        ];
    }
    shapeType = "arrow";
}
;
 //# sourceMappingURL=ArrowShapeTool.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/ArrowPath.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getArrowBodyPath",
    ()=>getArrowBodyPath,
    "getArrowBodyPathBuilder",
    ()=>getArrowBodyPathBuilder,
    "getArrowHandlePath",
    ()=>getArrowHandlePath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/PathBuilder.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$getElbowArrowInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/getElbowArrowInfo.mjs [app-ssr] (ecmascript)");
;
;
;
function getArrowBodyPathBuilder(info) {
    switch(info.type){
        case "straight":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(info.start.point.x, info.start.point.y, {
                offset: 0,
                roundness: 0
            }).lineTo(info.end.point.x, info.end.point.y, {
                offset: 0,
                roundness: 0
            });
        case "arc":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(info.start.point.x, info.start.point.y, {
                offset: 0,
                roundness: 0
            }).circularArcTo(info.bodyArc.radius, !!info.bodyArc.largeArcFlag, !!info.bodyArc.sweepFlag, info.end.point.x, info.end.point.y, {
                offset: 0,
                roundness: 0
            });
        case "elbow":
            {
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PathBuilder"]();
                path.moveTo(info.start.point.x, info.start.point.y, {
                    offset: 0
                });
                for(let i = 1; i < info.route.points.length; i++){
                    const point = info.route.points[i];
                    if (info.route.skipPointsWhenDrawing.has(point)) {
                        continue;
                    }
                    path.lineTo(point.x, point.y, {
                        offset: i === info.route.points.length - 1 ? 0 : void 0
                    });
                }
                return path;
            }
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(info, "type");
    }
}
function getArrowBodyPath(shape, info, opts) {
    return getArrowBodyPathBuilder(info).toSvg(opts);
}
function getArrowHandlePath(info, opts) {
    switch(info.type){
        case "straight":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(info.start.handle.x, info.start.handle.y).lineTo(info.end.handle.x, info.end.handle.y).toSvg(opts);
        case "arc":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PathBuilder"]().moveTo(info.start.handle.x, info.start.handle.y).circularArcTo(info.handleArc.radius, !!info.handleArc.largeArcFlag, !!info.handleArc.sweepFlag, info.end.handle.x, info.end.handle.y).toSvg(opts);
        case "elbow":
            {
                const handleRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$getElbowArrowInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRouteHandlePath"])(info.elbow, info.route);
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PathBuilder"].lineThroughPoints(handleRoute.points).toSvg(opts);
            }
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(info, "type");
    }
}
;
 //# sourceMappingURL=ArrowPath.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/arrowLabel.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getArrowBodyGeometry",
    ()=>getArrowBodyGeometry,
    "getArrowLabelDefaultPosition",
    ()=>getArrowLabelDefaultPosition,
    "getArrowLabelFontSize",
    ()=>getArrowLabelFontSize,
    "getArrowLabelPosition",
    ()=>getArrowLabelPosition,
    "isOverArrowLabel",
    ()=>isOverArrowLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Arc2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Arc2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Circle2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Circle2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Edge2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Edge2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Group2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polygon2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Polygon2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polyline2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Polyline2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/store/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/richText.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-ssr] (ecmascript)");
;
;
;
;
function getArrowBodyGeometry(editor, shape) {
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(editor, shape);
    switch(info.type){
        case "straight":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Edge2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Edge2d"]({
                start: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(info.start.point),
                end: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(info.end.point)
            });
        case "arc":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Arc2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Arc2d"]({
                center: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Cast(info.handleArc.center),
                start: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Cast(info.start.point),
                end: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Cast(info.end.point),
                sweepFlag: info.bodyArc.sweepFlag,
                largeArcFlag: info.bodyArc.largeArcFlag
            });
        case "elbow":
            return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polyline2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Polyline2d"]({
                points: info.route.points
            });
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(info, "type");
    }
}
const labelSizeCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$store$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createComputedCache"])("arrow label size", (editor, shape)=>{
    editor.fonts.trackFontsForShape(shape);
    let width = 0;
    let height = 0;
    const bodyGeom = getArrowBodyGeometry(editor, shape);
    const isEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText);
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderHtmlFromRichTextForMeasurement"])(editor, isEmpty ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toRichText"])("i") : shape.props.richText);
    const bodyBounds = bodyGeom.bounds;
    const fontSize = getArrowLabelFontSize(shape);
    const { w, h } = editor.textMeasure.measureHtml(html, {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEXT_PROPS"],
        fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FONT_FAMILIES"][shape.props.font],
        fontSize,
        maxWidth: null
    });
    width = w;
    height = h;
    let shouldSquish = false;
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(editor, shape);
    const labelToArrowPadding = getLabelToArrowPadding(shape);
    const margin = info.type === "elbow" ? Math.max(info.elbow.A.arrowheadOffset + labelToArrowPadding, 32) + Math.max(info.elbow.B.arrowheadOffset + labelToArrowPadding, 32) : 64;
    if (bodyBounds.width > bodyBounds.height) {
        width = Math.max(Math.min(w, margin), Math.min(bodyBounds.width - margin, w));
        shouldSquish = true;
    } else if (width > 16 * fontSize) {
        width = 16 * fontSize;
        shouldSquish = true;
    }
    if (shouldSquish) {
        const { w: squishedWidth, h: squishedHeight } = editor.textMeasure.measureHtml(html, {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEXT_PROPS"],
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FONT_FAMILIES"][shape.props.font],
            fontSize,
            maxWidth: width
        });
        width = squishedWidth;
        height = squishedHeight;
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](width, height).addScalar(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_LABEL_PADDING"] * 2 * shape.props.scale);
}, {
    areRecordsEqual: (a, b)=>{
        if (a.props === b.props) return true;
        const changedKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChangedKeys"])(a.props, b.props);
        return changedKeys.length === 1 && changedKeys[0] === "labelPosition";
    }
});
function getArrowLabelSize(editor, shape) {
    return labelSizeCache.get(editor, shape.id) ?? new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](0, 0);
}
function getLabelToArrowPadding(shape) {
    const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size];
    const labelToArrowPadding = (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LABEL_TO_ARROW_PADDING"] + (strokeWidth - __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"].s) * 2 + (strokeWidth === __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"].xl ? 20 : 0)) * shape.props.scale;
    return labelToArrowPadding;
}
function getArrowLabelRange(editor, shape, info) {
    const bodyGeom = getArrowBodyGeometry(editor, shape);
    const dbgPoints = [];
    const dbg = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group2d"]({
            children: [
                bodyGeom
            ],
            debugColor: "lime"
        })
    ];
    const labelSize = getArrowLabelSize(editor, shape);
    const labelToArrowPadding = getLabelToArrowPadding(shape);
    const paddingRelative = labelToArrowPadding / bodyGeom.length;
    let startBox, endBox;
    if (info.type === "elbow") {
        dbgPoints.push(info.start.point, info.end.point);
        startBox = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].FromCenter(info.start.point, labelSize).expandBy(labelToArrowPadding);
        endBox = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].FromCenter(info.end.point, labelSize).expandBy(labelToArrowPadding);
    } else {
        const startPoint = bodyGeom.interpolateAlongEdge(paddingRelative);
        const endPoint = bodyGeom.interpolateAlongEdge(1 - paddingRelative);
        dbgPoints.push(startPoint, endPoint);
        startBox = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].FromCenter(startPoint, labelSize);
        endBox = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].FromCenter(endPoint, labelSize);
    }
    const startIntersections = bodyGeom.intersectPolygon(startBox.corners);
    const endIntersections = bodyGeom.intersectPolygon(endBox.corners);
    const startConstrained = furthest(info.start.point, startIntersections);
    const endConstrained = furthest(info.end.point, endIntersections);
    let startRelative = startConstrained ? bodyGeom.uninterpolateAlongEdge(startConstrained) : 0.5;
    let endRelative = endConstrained ? bodyGeom.uninterpolateAlongEdge(endConstrained) : 0.5;
    if (startRelative > endRelative) {
        startRelative = 0.5;
        endRelative = 0.5;
    }
    for (const pt of [
        ...startIntersections,
        ...endIntersections,
        ...dbgPoints
    ]){
        dbg.push(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Circle2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Circle2d"]({
            x: pt.x - 3,
            y: pt.y - 3,
            radius: 3,
            isFilled: false,
            debugColor: "magenta",
            ignore: true
        }));
    }
    dbg.push(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polygon2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Polygon2d"]({
        points: startBox.corners,
        debugColor: "lime",
        isFilled: false,
        ignore: true
    }), new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polygon2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Polygon2d"]({
        points: endBox.corners,
        debugColor: "lime",
        isFilled: false,
        ignore: true
    }));
    return {
        start: startRelative,
        end: endRelative,
        dbg
    };
}
function getArrowLabelPosition(editor, shape) {
    const isEditing = editor.getEditingShapeId() === shape.id;
    if (!isEditing && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText)) {
        const bodyGeom2 = getArrowBodyGeometry(editor, shape);
        const labelCenter2 = bodyGeom2.interpolateAlongEdge(0.5);
        return {
            box: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].FromCenter(labelCenter2, new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](0, 0)),
            debugGeom: []
        };
    }
    const debugGeom = [];
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(editor, shape);
    const arrowheadInfo = {
        hasStartBinding: !!info.bindings.start,
        hasEndBinding: !!info.bindings.end,
        hasStartArrowhead: info.start.arrowhead !== "none",
        hasEndArrowhead: info.end.arrowhead !== "none"
    };
    const range = getArrowLabelRange(editor, shape, info);
    if (range.dbg) debugGeom.push(...range.dbg);
    const clampedPosition = getClampedPosition(shape, range, arrowheadInfo);
    const bodyGeom = getArrowBodyGeometry(editor, shape);
    const labelCenter = bodyGeom.interpolateAlongEdge(clampedPosition);
    const labelSize = getArrowLabelSize(editor, shape);
    return {
        box: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].FromCenter(labelCenter, labelSize),
        debugGeom
    };
}
function getClampedPosition(shape, range, arrowheadInfo) {
    const { hasEndArrowhead, hasEndBinding, hasStartBinding, hasStartArrowhead } = arrowheadInfo;
    const clampedPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(shape.props.labelPosition, hasStartArrowhead || hasStartBinding ? range.start : 0, hasEndArrowhead || hasEndBinding ? range.end : 1);
    return clampedPosition;
}
function furthest(from, candidates) {
    let furthest2 = null;
    let furthestDist = -Infinity;
    for (const candidate of candidates){
        const dist = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist2(from, candidate);
        if (dist > furthestDist) {
            furthest2 = candidate;
            furthestDist = dist;
        }
    }
    return furthest2;
}
function getArrowLabelFontSize(shape) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_LABEL_FONT_SIZES"][shape.props.size] * shape.props.scale;
}
function getArrowLabelDefaultPosition(editor, shape) {
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(editor, shape);
    switch(info.type){
        case "straight":
        case "arc":
            return 0.5;
        case "elbow":
            {
                const midpointHandle = info.route.midpointHandle;
                const bodyGeom = getArrowBodyGeometry(editor, shape);
                if (midpointHandle && bodyGeom) {
                    return bodyGeom.uninterpolateAlongEdge(midpointHandle.point);
                }
                return 0.5;
            }
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(info, "type");
    }
}
function isOverArrowLabel(editor, shape) {
    if (!editor.isShapeOfType(shape, "arrow")) return false;
    const pointInShapeSpace = editor.getPointInShapeSpace(shape, editor.inputs.getCurrentPagePoint());
    const labelGeometry = editor.getShapeGeometry(shape).children[1];
    return labelGeometry && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pointInPolygon"])(pointInShapeSpace, labelGeometry.vertices);
}
;
 //# sourceMappingURL=arrowLabel.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/arrowheads.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getArrowheadPathForType",
    ()=>getArrowheadPathForType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$intersect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/intersect.mjs [app-ssr] (ecmascript)");
;
function getArrowPoints(info, side, strokeWidth) {
    const point = side === "end" ? info.end.point : info.start.point;
    let int;
    switch(info.type){
        case "straight":
            {
                const opposite = side === "end" ? info.start.point : info.end.point;
                const compareLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(opposite, point);
                const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(compareLength / 5, strokeWidth, strokeWidth * 3);
                int = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Nudge(point, opposite, length);
                break;
            }
        case "arc":
            {
                const compareLength = Math.abs(info.bodyArc.length);
                const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(compareLength / 5, strokeWidth, strokeWidth * 3);
                const intersections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$intersect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["intersectCircleCircle"])(point, length, info.handleArc.center, info.handleArc.radius);
                int = side === "end" ? info.handleArc.sweepFlag ? intersections[0] : intersections[1] : info.handleArc.sweepFlag ? intersections[1] : intersections[0];
                break;
            }
        case "elbow":
            {
                const previousPoint = side === "end" ? info.route.points[info.route.points.length - 2] : info.route.points[1];
                const previousSegmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].ManhattanDist(previousPoint, point);
                const length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(previousSegmentLength / 2, strokeWidth, strokeWidth * 3);
                int = previousPoint ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Nudge(point, previousPoint, length) : point;
                break;
            }
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(info, "type");
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].IsNaN(int)) {
        int = point;
    }
    return {
        point,
        int
    };
}
function getArrowhead({ point, int }) {
    const PL = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].RotWith(int, point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI"] / 6);
    const PR = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].RotWith(int, point, -__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI"] / 6);
    return `M ${PL.x} ${PL.y} L ${point.x} ${point.y} L ${PR.x} ${PR.y}`;
}
function getTriangleHead({ point, int }) {
    const PL = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].RotWith(int, point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI"] / 6);
    const PR = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].RotWith(int, point, -__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI"] / 6);
    return `M ${PL.x} ${PL.y} L ${PR.x} ${PR.y} L ${point.x} ${point.y} Z`;
}
function getInvertedTriangleHead({ point, int }) {
    const d = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(int, point).div(2);
    const PL = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Rot(d, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HALF_PI"]));
    const PR = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Rot(d, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HALF_PI"]));
    return `M ${PL.x} ${PL.y} L ${int.x} ${int.y} L ${PR.x} ${PR.y} Z`;
}
function getDotHead({ point, int }) {
    const A = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Lrp(point, int, 0.45);
    const r = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(A, point);
    return `M ${A.x - r},${A.y}
  a ${r},${r} 0 1,0 ${r * 2},0
  a ${r},${r} 0 1,0 -${r * 2},0 `;
}
function getDiamondHead({ point, int }) {
    const PB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Lrp(point, int, 0.75);
    const PL = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].RotWith(PB, point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI"] / 4);
    const PR = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].RotWith(PB, point, -__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI"] / 4);
    const PQ = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Lrp(PL, PR, 0.5);
    PQ.add(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(PQ, point));
    return `M ${PQ.x} ${PQ.y} L ${PR.x} ${PR.y} ${point.x} ${point.y} L ${PL.x} ${PL.y} Z`;
}
function getSquareHead({ int, point }) {
    const PB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Lrp(point, int, 0.85);
    const d = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(PB, point).div(2);
    const PL1 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Rot(d, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HALF_PI"]));
    const PR1 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Rot(d, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HALF_PI"]));
    const PL2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(PB, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Rot(d, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HALF_PI"]));
    const PR2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(PB, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Rot(d, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HALF_PI"]));
    return `M ${PL1.x} ${PL1.y} L ${PL2.x} ${PL2.y} L ${PR2.x} ${PR2.y} L ${PR1.x} ${PR1.y} Z`;
}
function getBarHead({ int, point }) {
    const d = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(int, point).div(2);
    const PL = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Rot(d, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HALF_PI"]));
    const PR = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Rot(d, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HALF_PI"]));
    return `M ${PL.x} ${PL.y} L ${PR.x} ${PR.y}`;
}
function getArrowheadPathForType(info, side, strokeWidth) {
    const type = side === "end" ? info.end.arrowhead : info.start.arrowhead;
    if (type === "none") return;
    const points = getArrowPoints(info, side, strokeWidth);
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    switch(type){
        case "bar":
            return getBarHead(points);
        case "square":
            return getSquareHead(points);
        case "diamond":
            return getDiamondHead(points);
        case "dot":
            return getDotHead(points);
        case "inverted":
            return getInvertedTriangleHead(points);
        case "arrow":
            return getArrowhead(points);
        case "triangle":
            return getTriangleHead(points);
    }
    return "";
}
;
 //# sourceMappingURL=arrowheads.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/ElbowArrowDebug.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ElbowArrowDebug",
    ()=>ElbowArrowDebug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$getElbowArrowInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/getElbowArrowInfo.mjs [app-ssr] (ecmascript)");
;
;
;
;
function ElbowArrowDebug({ arrow }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useValue"])("elbow arrow grid", ()=>{
        try {
            const info2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$getElbowArrowInfo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElbowArrowInfo"])(editor, editor.getShape(arrow.id), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(editor, arrow));
            return info2;
        } catch (err) {
            console.error(err);
            return void 0;
        }
    }, [
        editor,
        arrow.id
    ]);
    if (!info) return null;
    const fullBox = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].Common([
        info.A.original,
        info.B.original
    ]).expandBy(50);
    const label = info.route?.name ?? "";
    const midPoint = info.route?.midpointHandle;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            info.midX !== null && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugLine, {
                a: {
                    x: info.midX,
                    y: fullBox.minY
                },
                b: {
                    x: info.midX,
                    y: fullBox.maxY
                },
                stroke: "red"
            }),
            info.midY !== null && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugLine, {
                a: {
                    x: fullBox.minX,
                    y: info.midY
                },
                b: {
                    x: fullBox.maxX,
                    y: info.midY
                },
                stroke: "blue"
            }),
            midPoint?.axis === "x" && info.midXRange && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugLine, {
                a: {
                    x: info.midXRange.lo,
                    y: midPoint.point.y
                },
                b: {
                    x: info.midXRange.hi,
                    y: midPoint.point.y
                },
                stroke: "red",
                strokeDasharray: "0 2"
            }),
            midPoint?.axis === "y" && info.midYRange && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugLine, {
                a: {
                    x: midPoint.point.x,
                    y: info.midYRange.lo
                },
                b: {
                    x: midPoint.point.x,
                    y: info.midYRange.hi
                },
                stroke: "blue",
                strokeDasharray: "0 2"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugBox, {
                box: info.A.original,
                stroke: "orange"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugBox, {
                box: info.A.expanded,
                stroke: "orange",
                strokeWidth: 0.5
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugBox, {
                box: info.A.original.clone().expandBy(info.options.minElbowLegLength),
                stroke: "orange",
                strokeWidth: 0.5
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugBox, {
                box: info.B.original,
                stroke: "lightskyblue"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugBox, {
                box: info.B.expanded,
                stroke: "lightskyblue",
                strokeWidth: 0.5
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugBox, {
                box: info.B.original.clone().expandBy(info.options.minElbowLegLength),
                stroke: "lightskyblue",
                strokeWidth: 0.5
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugEdge, {
                edge: info.A.edges.top,
                axis: "x",
                stroke: "orange"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugEdge, {
                edge: info.B.edges.top,
                axis: "x",
                stroke: "lightskyblue"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugEdge, {
                edge: info.A.edges.right,
                axis: "y",
                stroke: "orange"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugEdge, {
                edge: info.B.edges.right,
                axis: "y",
                stroke: "lightskyblue"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugEdge, {
                edge: info.A.edges.bottom,
                axis: "x",
                stroke: "orange"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugEdge, {
                edge: info.B.edges.bottom,
                axis: "x",
                stroke: "lightskyblue"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugEdge, {
                edge: info.A.edges.left,
                axis: "y",
                stroke: "orange"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugEdge, {
                edge: info.B.edges.left,
                axis: "y",
                stroke: "lightskyblue"
            }),
            info.route && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugRoute, {
                route: info.route.points,
                strokeWidth: 10
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("text", {
                x: fullBox.minX + 5,
                y: fullBox.minY - 3,
                fontSize: 10,
                fill: "black",
                stroke: "var(--tl-color-background)",
                strokeWidth: 2,
                paintOrder: "stroke",
                children: label
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("text", {
                x: info.A.expanded.x,
                y: info.A.expanded.y,
                fontSize: 10,
                fill: "black",
                stroke: "var(--tl-color-background)",
                strokeWidth: 2,
                paintOrder: "stroke",
                children: [
                    "A",
                    info.route && `, ${info.route.aEdgePicking}`,
                    info.A.isPoint && `, point`
                ]
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("text", {
                x: info.B.expanded.x,
                y: info.B.expanded.y,
                fontSize: 10,
                fill: "black",
                stroke: "var(--tl-color-background)",
                strokeWidth: 2,
                paintOrder: "stroke",
                children: [
                    "B",
                    info.route && `, ${info.route.bEdgePicking}`,
                    info.B.isPoint && `, point`
                ]
            })
        ]
    });
}
function DebugLine({ a, b, ...props }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("line", {
        fill: "none",
        strokeWidth: 1,
        strokeDasharray: "4,4",
        stroke: "green",
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y,
        ...props
    });
}
function DebugRoute({ route, ...props }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
        fill: "none",
        stroke: "darkorchid",
        strokeWidth: 3,
        opacity: 0.5,
        points: route.map((r)=>`${r.x},${r.y}`).join(" "),
        ...props
    });
}
function DebugEdge({ edge, axis, ...props }) {
    if (!edge || edge.expanded === null) return null;
    const vec = (vec2)=>axis === "x" ? {
            x: vec2.y,
            y: vec2.x
        } : vec2;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("g", {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugLine, {
                a: vec({
                    x: edge.expanded,
                    y: edge.cross.min
                }),
                b: vec({
                    x: edge.expanded,
                    y: edge.cross.max
                }),
                strokeDasharray: "0",
                strokeWidth: 1.5,
                ...props
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugLine, {
                a: vec({
                    x: edge.expanded - 4,
                    y: edge.cross.min
                }),
                b: vec({
                    x: edge.expanded + 4,
                    y: edge.cross.min
                }),
                strokeDasharray: "0",
                strokeWidth: 1.5,
                ...props
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DebugLine, {
                a: vec({
                    x: edge.expanded - 4,
                    y: edge.cross.max
                }),
                b: vec({
                    x: edge.expanded + 4,
                    y: edge.cross.max
                }),
                strokeDasharray: "0",
                strokeWidth: 1.5,
                ...props
            })
        ]
    });
}
function DebugBox({ box, ...props }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
        x: box.minX,
        y: box.minY,
        width: box.width,
        height: box.height,
        strokeDasharray: "4,4",
        strokeWidth: 1,
        fill: "none",
        ...props
    });
}
;
 //# sourceMappingURL=ElbowArrowDebug.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/elbowArrowSnapLines.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getElbowArrowSnapLines",
    ()=>getElbowArrowSnapLines,
    "perpDistanceToLine",
    ()=>perpDistanceToLine,
    "perpDistanceToLineAngle",
    ()=>perpDistanceToLineAngle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-ssr] (ecmascript)");
;
;
const snapLinesStore = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WeakCache"]();
function getElbowArrowSnapLines(editor) {
    return snapLinesStore.get(editor, (editor2)=>{
        const currentSelectedArrowShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computed"])("current selected arrow shape", ()=>{
            const shape = editor2.getOnlySelectedShape();
            if (!shape || !editor2.isShapeOfType(shape, "arrow")) return null;
            return shape.id;
        });
        const unselectedArrowShapeIds = editor2.store.query.ids("shape", ()=>{
            const activeArrowShapeId = currentSelectedArrowShape.get();
            if (!activeArrowShapeId) return {
                type: {
                    eq: "arrow"
                }
            };
            return {
                type: {
                    eq: "arrow"
                },
                id: {
                    neq: activeArrowShapeId
                }
            };
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computed"])("elbow arrow snap lines", ()=>{
            const result = /* @__PURE__ */ new Map();
            const currentPageShapeIds = editor2.getCurrentPageShapeIds();
            const viewportBounds = editor2.getViewportPageBounds();
            for (const id of unselectedArrowShapeIds.get()){
                if (!currentPageShapeIds.has(id)) continue;
                const shape = editor2.getShape(id);
                if (shape?.type !== "arrow") continue;
                const shapeBounds = editor2.getShapePageBounds(id);
                if (!shapeBounds || !viewportBounds.includes(shapeBounds)) continue;
                const bindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(editor2, shape);
                const pageTransform = editor2.getShapePageTransform(id);
                if (!pageTransform) continue;
                const geometry = editor2.getShapeGeometry(id);
                const pageVertices = pageTransform.applyToPoints(geometry.vertices);
                for(let i = 1; i < pageVertices.length; i++){
                    const prev = pageVertices[i - 1];
                    const curr = pageVertices[i];
                    let angle = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(prev, curr);
                    if (angle < 0) angle += Math.PI;
                    let set = result.get(angle);
                    if (!set) {
                        set = /* @__PURE__ */ new Set();
                        result.set(angle, set);
                    }
                    const perpDistance = perpDistanceToLineAngle(prev, angle);
                    set.add({
                        perpDistance,
                        startBoundShapeId: bindings.start?.toId,
                        endBoundShapeId: bindings.end?.toId
                    });
                }
            }
            return result;
        });
    }).get();
}
function perpDistanceToLineAngle(pointOnLine, lineAngle) {
    const perpDir = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].FromAngle(lineAngle).per();
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dpr(pointOnLine, perpDir);
}
function perpDistanceToLine(A, B) {
    return perpDistanceToLineAngle(A, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(A, B));
}
;
 //# sourceMappingURL=elbowArrowSnapLines.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/ArrowShapeUtil.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowShapeUtil",
    ()=>ArrowShapeUtil,
    "getArrowLength",
    ()=>getArrowLength
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Arc2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Arc2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Edge2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Edge2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Group2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polyline2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Polyline2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Rectangle2d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/components/SVGContainer.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/ShapeUtil.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/debug-flags.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/richText.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/tools/BaseBoxShapeTool/children/Pointing.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useIsEditing.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useSafeId.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$bindings$2f$arrow$2f$ArrowBindingUtil$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/bindings/arrow/ArrowBindingUtil.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/richText.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/PathBuilder.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/RichTextLabel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$ShapeFill$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/ShapeFill.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/defaultStyleDefs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEfficientZoomThreshold.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$ArrowPath$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/ArrowPath.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/arrowLabel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowTargetState$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/arrowTargetState.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowheads$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/arrowheads.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$ElbowArrowDebug$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/ElbowArrowDebug.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/definitions.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$elbowArrowSnapLines$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/elbow/elbowArrowSnapLines.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/arrow/shared.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
var ArrowHandles = /* @__PURE__ */ ((ArrowHandles2)=>{
    ArrowHandles2["Start"] = "start";
    ArrowHandles2["Middle"] = "middle";
    ArrowHandles2["End"] = "end";
    return ArrowHandles2;
})(ArrowHandles || {});
class ArrowShapeUtil extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$ShapeUtil$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapeUtil"] {
    static type = "arrow";
    static props = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arrowShapeProps"];
    static migrations = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arrowShapeMigrations"];
    options = {
        expandElbowLegLength: {
            s: 28,
            m: 36,
            l: 44,
            xl: 66
        },
        minElbowLegLength: {
            s: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"].s * 3,
            m: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"].m * 3,
            l: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"].l * 3,
            xl: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"].xl * 3
        },
        minElbowHandleDistance: 16,
        arcArrowCenterSnapDistance: 16,
        elbowArrowCenterSnapDistance: 24,
        elbowArrowEdgeSnapDistance: 20,
        elbowArrowPointSnapDistance: 24,
        elbowArrowAxisSnapDistance: 16,
        labelCenterSnapDistance: 10,
        elbowMidpointSnapDistance: 10,
        elbowMinSegmentLengthToShowMidpointHandle: 20,
        hoverPreciseTimeout: 600,
        pointingPreciseTimeout: 320,
        shouldBeExact (editor) {
            return editor.inputs.getAltKey();
        },
        shouldIgnoreTargets (editor) {
            return editor.inputs.getCtrlKey();
        },
        showTextOutline: true
    };
    canEdit() {
        return true;
    }
    canBind({ toShape }) {
        return toShape.type !== "arrow";
    }
    canSnap() {
        return false;
    }
    hideResizeHandles() {
        return true;
    }
    hideRotateHandle() {
        return true;
    }
    hideSelectionBoundsBg() {
        return true;
    }
    hideSelectionBoundsFg() {
        return true;
    }
    hideInMinimap() {
        return true;
    }
    canBeLaidOut(shape, info) {
        if (info.type === "flip") {
            const bindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(this.editor, shape);
            const { start, end } = bindings;
            const { shapes = [] } = info;
            if (start && !shapes.find((s)=>s.id === start.toId)) return false;
            if (end && !shapes.find((s)=>s.id === end.toId)) return false;
        }
        return true;
    }
    getFontFaces(shape) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText)) return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFontsFromRichText"])(this.editor, shape.props.richText, {
            family: `tldraw_${shape.props.font}`,
            weight: "normal",
            style: "normal"
        });
    }
    getDefaultProps() {
        return {
            kind: "arc",
            elbowMidPoint: 0.5,
            dash: "draw",
            size: "m",
            fill: "none",
            color: "black",
            labelColor: "black",
            bend: 0,
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 2,
                y: 0
            },
            arrowheadStart: "none",
            arrowheadEnd: "arrow",
            richText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toRichText"])(""),
            labelPosition: 0.5,
            font: "draw",
            scale: 1
        };
    }
    getGeometry(shape) {
        const isEditing = this.editor.getEditingShapeId() === shape.id;
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(this.editor, shape);
        const debugGeom = [];
        const bodyGeom = info.type === "straight" ? new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Edge2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Edge2d"]({
            start: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(info.start.point),
            end: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(info.end.point)
        }) : info.type === "arc" ? new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Arc2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Arc2d"]({
            center: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Cast(info.handleArc.center),
            start: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Cast(info.start.point),
            end: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Cast(info.end.point),
            sweepFlag: info.bodyArc.sweepFlag,
            largeArcFlag: info.bodyArc.largeArcFlag
        }) : new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Polyline2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Polyline2d"]({
            points: info.route.points
        });
        let labelGeom;
        if (isEditing || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText)) {
            const labelPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowLabelPosition"])(this.editor, shape);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["debugFlags"].debugGeometry.get()) {
                debugGeom.push(...labelPosition.debugGeom);
            }
            labelGeom = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Rectangle2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Rectangle2d"]({
                x: labelPosition.box.x,
                y: labelPosition.box.y,
                width: labelPosition.box.w,
                height: labelPosition.box.h,
                isFilled: true,
                isLabel: true
            });
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group2d"]({
            children: [
                ...labelGeom ? [
                    bodyGeom,
                    labelGeom
                ] : [
                    bodyGeom
                ],
                ...debugGeom
            ]
        });
    }
    getHandles(shape) {
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(this.editor, shape);
        const handles = [
            {
                id: "start" /* Start */ ,
                type: "vertex",
                index: "a1",
                x: info.start.handle.x,
                y: info.start.handle.y
            },
            {
                id: "end" /* End */ ,
                type: "vertex",
                index: "a3",
                x: info.end.handle.x,
                y: info.end.handle.y
            }
        ];
        if (shape.props.kind === "arc" && (info.type === "straight" || info.type === "arc")) {
            handles.push({
                id: "middle" /* Middle */ ,
                type: "virtual",
                index: "a2",
                x: info.middle.x,
                y: info.middle.y
            });
        }
        if (shape.props.kind === "elbow" && info.type === "elbow" && info.route.midpointHandle) {
            const shapePageTransform = this.editor.getShapePageTransform(shape.id);
            const segmentStart = shapePageTransform.applyToPoint(info.route.midpointHandle.segmentStart);
            const segmentEnd = shapePageTransform.applyToPoint(info.route.midpointHandle.segmentEnd);
            const segmentLength = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(segmentStart, segmentEnd) * this.editor.getEfficientZoomLevel();
            if (segmentLength > this.options.elbowMinSegmentLengthToShowMidpointHandle) {
                handles.push({
                    id: "middle" /* Middle */ ,
                    type: "vertex",
                    index: "a2",
                    x: info.route.midpointHandle.point.x,
                    y: info.route.midpointHandle.point.y
                });
            }
        }
        return handles;
    }
    getText(shape) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderPlaintextFromRichText"])(this.editor, shape.props.richText);
    }
    onHandleDrag(shape, info) {
        const handleId = info.handle.id;
        switch(handleId){
            case "middle" /* Middle */ :
                switch(shape.props.kind){
                    case "arc":
                        return this.onArcMidpointHandleDrag(shape, info);
                    case "elbow":
                        return this.onElbowMidpointHandleDrag(shape, info);
                    default:
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(shape.props.kind);
                }
            case "start" /* Start */ :
            case "end" /* End */ :
                return this.onTerminalHandleDrag(shape, info, handleId);
            default:
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(handleId);
        }
    }
    onArcMidpointHandleDrag(shape, { handle }) {
        const bindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(this.editor, shape);
        const { start, end } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowTerminalsInArrowSpace"])(this.editor, shape, bindings);
        const delta = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(end, start);
        const v = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Per(delta);
        const med = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Med(end, start);
        const A = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(med, v);
        const B = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(med, v);
        const point = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].NearestPointOnLineSegment(A, B, handle, false);
        let bend = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(point, med);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Clockwise(point, end, med)) bend *= -1;
        return {
            id: shape.id,
            type: shape.type,
            props: {
                bend
            }
        };
    }
    onElbowMidpointHandleDrag(shape, { handle }) {
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(this.editor, shape);
        if (info?.type !== "elbow") return;
        const shapeToPageTransform = this.editor.getShapePageTransform(shape.id);
        const handlePagePoint = shapeToPageTransform.applyToPoint(handle);
        const axisName = info.route.midpointHandle?.axis;
        if (!axisName) return;
        const axis = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$definitions$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowAxes"][axisName];
        const midRange = info.elbow[axis.midRange];
        if (!midRange) return;
        let angle = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Angle(shapeToPageTransform.applyToPoint(axis.v(0, 0)), shapeToPageTransform.applyToPoint(axis.v(0, 1)));
        if (angle < 0) angle += Math.PI;
        const handlePoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$elbowArrowSnapLines$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["perpDistanceToLineAngle"])(handlePagePoint, angle);
        const loPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$elbowArrowSnapLines$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["perpDistanceToLineAngle"])(shapeToPageTransform.applyToPoint(axis.v(midRange.lo, 0)), angle);
        const hiPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$elbowArrowSnapLines$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["perpDistanceToLineAngle"])(shapeToPageTransform.applyToPoint(axis.v(midRange.hi, 0)), angle);
        const maxSnapDistance = this.options.elbowMidpointSnapDistance / this.editor.getEfficientZoomLevel();
        const midPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$elbowArrowSnapLines$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["perpDistanceToLineAngle"])(shapeToPageTransform.applyToPoint(axis.v((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(midRange.lo, midRange.hi, 0.5), 0)), angle);
        let snapPoint = midPoint;
        let snapDistance = Math.abs(midPoint - handlePoint);
        for (const [snapAngle, snapLines] of (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$elbowArrowSnapLines$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElbowArrowSnapLines"])(this.editor)){
            const { isParallel, isFlippedParallel } = anglesAreApproximatelyParallel(angle, snapAngle);
            if (isParallel || isFlippedParallel) {
                for (const snapLine of snapLines){
                    const doesShareStartIntersection = snapLine.startBoundShapeId && (snapLine.startBoundShapeId === info.bindings.start?.toId || snapLine.startBoundShapeId === info.bindings.end?.toId);
                    const doesShareEndIntersection = snapLine.endBoundShapeId && (snapLine.endBoundShapeId === info.bindings.start?.toId || snapLine.endBoundShapeId === info.bindings.end?.toId);
                    if (!doesShareStartIntersection && !doesShareEndIntersection) continue;
                    const point = isFlippedParallel ? -snapLine.perpDistance : snapLine.perpDistance;
                    const distance = Math.abs(point - handlePoint);
                    if (distance < snapDistance) {
                        snapPoint = point;
                        snapDistance = distance;
                    }
                }
            }
        }
        if (snapDistance > maxSnapDistance) {
            snapPoint = handlePoint;
        }
        const newMid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invLerp"])(loPoint, hiPoint, snapPoint), 0, 1);
        return {
            id: shape.id,
            type: shape.type,
            props: {
                elbowMidPoint: newMid
            }
        };
    }
    onTerminalHandleDrag(shape, { handle, isPrecise }, handleId) {
        const bindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(this.editor, shape);
        const update = {
            id: shape.id,
            type: "arrow",
            props: {}
        };
        const currentBinding = bindings[handleId];
        const oppositeHandleId = handleId === "start" /* Start */  ? "end" /* End */  : "start" /* Start */ ;
        const oppositeBinding = bindings[oppositeHandleId];
        const targetInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowTargetState$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateArrowTargetState"])({
            editor: this.editor,
            pointInPageSpace: this.editor.getShapePageTransform(shape.id).applyToPoint(handle),
            arrow: shape,
            isPrecise,
            currentBinding,
            oppositeBinding
        });
        if (!targetInfo) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeArrowBinding"])(this.editor, shape, handleId);
            const newPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$tools$2f$BaseBoxShapeTool$2f$children$2f$Pointing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maybeSnapToGrid"])(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"](handle.x, handle.y), this.editor);
            update.props[handleId] = {
                x: newPoint.x,
                y: newPoint.y
            };
            return update;
        }
        const bindingProps = {
            terminal: handleId,
            normalizedAnchor: targetInfo.normalizedAnchor,
            isPrecise: targetInfo.isPrecise,
            isExact: targetInfo.isExact,
            snap: targetInfo.snap
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOrUpdateArrowBinding"])(this.editor, shape, targetInfo.target.id, bindingProps);
        const newBindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(this.editor, shape);
        if (newBindings.start && newBindings.end && newBindings.start.toId === newBindings.end.toId) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Equals(newBindings.start.props.normalizedAnchor, newBindings.end.props.normalizedAnchor)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOrUpdateArrowBinding"])(this.editor, shape, newBindings.end.toId, {
                    ...newBindings.end.props,
                    normalizedAnchor: {
                        x: newBindings.end.props.normalizedAnchor.x + 0.05,
                        y: newBindings.end.props.normalizedAnchor.y
                    }
                });
            }
        }
        return update;
    }
    onTranslateStart(shape) {
        const bindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(this.editor, shape);
        if (shape.props.kind === "elbow" && this.editor.getOnlySelectedShapeId() === shape.id) {
            const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(this.editor, shape);
            if (!info) return;
            const update = {
                id: shape.id,
                type: "arrow",
                props: {}
            };
            if (bindings.start) {
                update.props.start = {
                    x: info.start.point.x,
                    y: info.start.point.y
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeArrowBinding"])(this.editor, shape, "start");
            }
            if (bindings.end) {
                update.props.end = {
                    x: info.end.point.x,
                    y: info.end.point.y
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeArrowBinding"])(this.editor, shape, "end");
            }
            return update;
        }
        const terminalsInArrowSpace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowTerminalsInArrowSpace"])(this.editor, shape, bindings);
        const shapePageTransform = this.editor.getShapePageTransform(shape.id);
        const selectedShapeIds = this.editor.getSelectedShapeIds();
        if (bindings.start && (selectedShapeIds.includes(bindings.start.toId) || this.editor.isAncestorSelected(bindings.start.toId)) || bindings.end && (selectedShapeIds.includes(bindings.end.toId) || this.editor.isAncestorSelected(bindings.end.toId))) {
            return;
        }
        shapeAtTranslationStart.set(shape, {
            pagePosition: shapePageTransform.applyToPoint(shape),
            terminalBindings: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapObjectMapValues"])(terminalsInArrowSpace, (terminalName, point)=>{
                const binding = bindings[terminalName];
                if (!binding) return null;
                return {
                    binding,
                    shapePosition: point,
                    pagePosition: shapePageTransform.applyToPoint(point)
                };
            })
        });
        if (bindings.start) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$bindings$2f$arrow$2f$ArrowBindingUtil$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateArrowTerminal"])({
                editor: this.editor,
                arrow: shape,
                terminal: "start",
                useHandle: true
            });
            shape = this.editor.getShape(shape.id);
        }
        if (bindings.end) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$bindings$2f$arrow$2f$ArrowBindingUtil$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateArrowTerminal"])({
                editor: this.editor,
                arrow: shape,
                terminal: "end",
                useHandle: true
            });
        }
        for (const handleName of [
            "start" /* Start */ ,
            "end" /* End */ 
        ]){
            const binding = bindings[handleName];
            if (!binding) continue;
            this.editor.updateBinding({
                ...binding,
                props: {
                    ...binding.props,
                    isPrecise: true
                }
            });
        }
        return;
    }
    onTranslate(initialShape, shape) {
        const atTranslationStart = shapeAtTranslationStart.get(initialShape);
        if (!atTranslationStart) return;
        const shapePageTransform = this.editor.getShapePageTransform(shape.id);
        const pageDelta = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Sub(shapePageTransform.applyToPoint(shape), atTranslationStart.pagePosition);
        for (const terminalBinding of Object.values(atTranslationStart.terminalBindings)){
            if (!terminalBinding) continue;
            const newPagePoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Add(terminalBinding.pagePosition, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Mul(pageDelta, 0.5));
            const newTarget = this.editor.getShapeAtPoint(newPagePoint, {
                hitInside: true,
                hitFrameInside: true,
                margin: 0,
                filter: (targetShape)=>{
                    return !targetShape.isLocked && this.editor.canBindShapes({
                        fromShape: shape,
                        toShape: targetShape,
                        binding: "arrow"
                    });
                }
            });
            if (newTarget?.id === terminalBinding.binding.toId) {
                const targetBounds = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].ZeroFix(this.editor.getShapeGeometry(newTarget).bounds);
                const pointInTargetSpace = this.editor.getPointInShapeSpace(newTarget, newPagePoint);
                const normalizedAnchor = {
                    x: (pointInTargetSpace.x - targetBounds.minX) / targetBounds.width,
                    y: (pointInTargetSpace.y - targetBounds.minY) / targetBounds.height
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOrUpdateArrowBinding"])(this.editor, shape, newTarget.id, {
                    ...terminalBinding.binding.props,
                    normalizedAnchor,
                    isPrecise: true
                });
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeArrowBinding"])(this.editor, shape, terminalBinding.binding.props.terminal);
            }
        }
    }
    _resizeInitialBindings = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WeakCache"]();
    onResize(shape, info) {
        const { scaleX, scaleY } = info;
        const bindings = this._resizeInitialBindings.get(shape, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(this.editor, shape));
        const terminals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowTerminalsInArrowSpace"])(this.editor, shape, bindings);
        const { start, end } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["structuredClone"])(shape.props);
        let { bend } = shape.props;
        if (!bindings.start) {
            start.x = terminals.start.x * scaleX;
            start.y = terminals.start.y * scaleY;
        }
        if (!bindings.end) {
            end.x = terminals.end.x * scaleX;
            end.y = terminals.end.y * scaleY;
        }
        const mx = Math.abs(scaleX);
        const my = Math.abs(scaleY);
        const startNormalizedAnchor = bindings?.start ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(bindings.start.props.normalizedAnchor) : null;
        const endNormalizedAnchor = bindings?.end ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].From(bindings.end.props.normalizedAnchor) : null;
        if (scaleX < 0 && scaleY >= 0) {
            if (bend !== 0) {
                bend *= -1;
                bend *= Math.max(mx, my);
            }
            if (startNormalizedAnchor) {
                startNormalizedAnchor.x = 1 - startNormalizedAnchor.x;
            }
            if (endNormalizedAnchor) {
                endNormalizedAnchor.x = 1 - endNormalizedAnchor.x;
            }
        } else if (scaleX >= 0 && scaleY < 0) {
            if (bend !== 0) {
                bend *= -1;
                bend *= Math.max(mx, my);
            }
            if (startNormalizedAnchor) {
                startNormalizedAnchor.y = 1 - startNormalizedAnchor.y;
            }
            if (endNormalizedAnchor) {
                endNormalizedAnchor.y = 1 - endNormalizedAnchor.y;
            }
        } else if (scaleX >= 0 && scaleY >= 0) {
            if (bend !== 0) {
                bend *= Math.max(mx, my);
            }
        } else if (scaleX < 0 && scaleY < 0) {
            if (bend !== 0) {
                bend *= Math.max(mx, my);
            }
            if (startNormalizedAnchor) {
                startNormalizedAnchor.x = 1 - startNormalizedAnchor.x;
                startNormalizedAnchor.y = 1 - startNormalizedAnchor.y;
            }
            if (endNormalizedAnchor) {
                endNormalizedAnchor.x = 1 - endNormalizedAnchor.x;
                endNormalizedAnchor.y = 1 - endNormalizedAnchor.y;
            }
        }
        if (bindings.start && startNormalizedAnchor) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOrUpdateArrowBinding"])(this.editor, shape, bindings.start.toId, {
                ...bindings.start.props,
                normalizedAnchor: startNormalizedAnchor.toJson()
            });
        }
        if (bindings.end && endNormalizedAnchor) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOrUpdateArrowBinding"])(this.editor, shape, bindings.end.toId, {
                ...bindings.end.props,
                normalizedAnchor: endNormalizedAnchor.toJson()
            });
        }
        const next = {
            props: {
                start,
                end,
                bend
            }
        };
        return next;
    }
    onDoubleClickHandle(shape, handle) {
        switch(handle.id){
            case "start" /* Start */ :
                {
                    return {
                        id: shape.id,
                        type: shape.type,
                        props: {
                            ...shape.props,
                            arrowheadStart: shape.props.arrowheadStart === "none" ? "arrow" : "none"
                        }
                    };
                }
            case "end" /* End */ :
                {
                    return {
                        id: shape.id,
                        type: shape.type,
                        props: {
                            ...shape.props,
                            arrowheadEnd: shape.props.arrowheadEnd === "none" ? "arrow" : "none"
                        }
                    };
                }
        }
    }
    component(shape) {
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
        const onlySelectedShape = this.editor.getOnlySelectedShape();
        const shouldDisplayHandles = this.editor.isInAny("select.idle", "select.pointing_handle", "select.dragging_handle", "select.translating", "arrow.dragging") && !this.editor.getIsReadonly();
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(this.editor, shape);
        if (!info?.isValid) return null;
        const labelPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowLabelPosition"])(this.editor, shape);
        const isSelected = shape.id === this.editor.getOnlySelectedShapeId();
        const isEditing = this.editor.getEditingShapeId() === shape.id;
        const showArrowLabel = isEditing || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$components$2f$SVGContainer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SVGContainer"], {
                    style: {
                        minWidth: 50,
                        minHeight: 50
                    },
                    children: [
                        /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ArrowSvg, {
                            shape,
                            shouldDisplayHandles: shouldDisplayHandles && onlySelectedShape?.id === shape.id
                        }),
                        shape.props.kind === "elbow" && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["debugFlags"].debugElbowArrows.get() && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$elbow$2f$ElbowArrowDebug$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElbowArrowDebug"], {
                            arrow: shape
                        })
                    ]
                }),
                showArrowLabel && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextLabel"], {
                    shapeId: shape.id,
                    type: "arrow",
                    font: shape.props.font,
                    fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowLabelFontSize"])(shape),
                    lineHeight: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEXT_PROPS"].lineHeight,
                    align: "middle",
                    verticalAlign: "middle",
                    labelColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.labelColor, "solid"),
                    richText: shape.props.richText,
                    textWidth: labelPosition.box.w - __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_LABEL_PADDING"] * 2 * shape.props.scale,
                    isSelected,
                    padding: 0,
                    showTextOutline: this.options.showTextOutline,
                    style: {
                        transform: `translate(${labelPosition.box.center.x}px, ${labelPosition.box.center.y}px)`
                    }
                })
            ]
        });
    }
    indicator(shape) {
        const isEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsEditing"])(shape.id);
        const clipPathId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSharedSafeId"])(shape.id + "_clip");
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(this.editor, shape);
        if (!info) return null;
        const { start, end } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowTerminalsInArrowSpace"])(this.editor, shape, info?.bindings);
        const geometry = this.editor.getShapeGeometry(shape);
        const bounds = geometry.bounds;
        const isEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText);
        const labelGeometry = isEditing || !isEmpty ? geometry.children[1] : null;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Equals(start, end)) return null;
        const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * shape.props.scale;
        const as = info.start.arrowhead && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowheads$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowheadPathForType"])(info, "start", strokeWidth);
        const ae = info.end.arrowhead && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowheads$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowheadPathForType"])(info, "end", strokeWidth);
        const includeClipPath = as && info.start.arrowhead !== "arrow" || ae && info.end.arrowhead !== "arrow" || !!labelGeometry;
        const labelBounds = labelGeometry ? labelGeometry.getBounds() : new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"](0, 0, 0, 0);
        if (isEditing && labelGeometry) {
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDomPrecision"])(labelBounds.x),
                y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDomPrecision"])(labelBounds.y),
                width: labelBounds.w,
                height: labelBounds.h,
                rx: 3.5 * shape.props.scale,
                ry: 3.5 * shape.props.scale
            });
        }
        const clipStartArrowhead = !(info.start.arrowhead === "none" || info.start.arrowhead === "arrow");
        const clipEndArrowhead = !(info.end.arrowhead === "none" || info.end.arrowhead === "arrow");
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("g", {
            children: [
                includeClipPath && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("defs", {
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ArrowClipPath, {
                        radius: 3.5 * shape.props.scale,
                        hasText: !isEmpty,
                        bounds,
                        labelBounds,
                        as: clipStartArrowhead && as ? as : "",
                        ae: clipEndArrowhead && ae ? ae : ""
                    })
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                    style: {
                        clipPath: includeClipPath ? `url(#${clipPathId})` : void 0,
                        WebkitClipPath: includeClipPath ? `url(#${clipPathId})` : void 0
                    },
                    children: [
                        includeClipPath && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                            x: bounds.minX - 100,
                            y: bounds.minY - 100,
                            width: bounds.width + 200,
                            height: bounds.height + 200,
                            opacity: 0
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$ArrowPath$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBodyPath"])(shape, info, shape.props.dash === "draw" ? {
                            style: "draw",
                            randomSeed: shape.id,
                            strokeWidth: 1,
                            passes: 1,
                            offset: 0,
                            roundness: strokeWidth * 2,
                            props: {
                                strokeWidth: void 0
                            }
                        } : {
                            style: "solid",
                            strokeWidth: 1,
                            props: {
                                strokeWidth: void 0
                            }
                        })
                    ]
                }),
                as && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: as
                }),
                ae && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    d: ae
                }),
                labelGeometry && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                    x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDomPrecision"])(labelBounds.x),
                    y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDomPrecision"])(labelBounds.y),
                    width: labelBounds.w,
                    height: labelBounds.h,
                    rx: 3.5,
                    ry: 3.5
                })
            ]
        });
    }
    useLegacyIndicator() {
        return false;
    }
    getIndicatorPath(shape) {
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(this.editor, shape);
        if (!info) return void 0;
        const isEditing = this.editor.getEditingShapeId() === shape.id;
        const { start, end } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowTerminalsInArrowSpace"])(this.editor, shape, info?.bindings);
        const geometry = this.editor.getShapeGeometry(shape);
        const isEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText);
        const labelGeometry = isEditing || !isEmpty ? geometry.children[1] : null;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Equals(start, end)) return void 0;
        const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * shape.props.scale;
        if (isEditing && labelGeometry) {
            const labelBounds = labelGeometry.getBounds();
            const path = new Path2D();
            path.roundRect(labelBounds.x, labelBounds.y, labelBounds.w, labelBounds.h, 3.5 * shape.props.scale);
            return path;
        }
        const isForceSolid = this.editor.getEfficientZoomLevel() < shape.props.scale * 0.25;
        const bodyPathBuilder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$ArrowPath$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBodyPathBuilder"])(info);
        const bodyPath2D = bodyPathBuilder.toPath2D(shape.props.dash === "draw" && !isForceSolid ? {
            style: "draw",
            randomSeed: shape.id,
            strokeWidth: 1,
            passes: 1,
            offset: 0,
            roundness: strokeWidth * 2
        } : {
            style: "solid",
            strokeWidth: 1
        });
        const as = info.start.arrowhead && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowheads$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowheadPathForType"])(info, "start", strokeWidth);
        const ae = info.end.arrowhead && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowheads$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowheadPathForType"])(info, "end", strokeWidth);
        const clipStartArrowhead = !!(as && info.start.arrowhead !== "arrow");
        const clipEndArrowhead = !!(ae && info.end.arrowhead !== "arrow");
        const needsClipping = labelGeometry || clipStartArrowhead || clipEndArrowhead;
        if (needsClipping) {
            const bounds = geometry.bounds;
            const clipPath = new Path2D();
            clipPath.rect(bounds.minX - 100, bounds.minY - 100, bounds.width + 200, bounds.height + 200);
            if (labelGeometry) {
                const labelBounds = labelGeometry.getBounds();
                const radius = 3.5 * shape.props.scale;
                const lb = labelBounds;
                clipPath.moveTo(lb.x, lb.y + radius);
                clipPath.lineTo(lb.x, lb.maxY - radius);
                clipPath.arcTo(lb.x, lb.maxY, lb.x + radius, lb.maxY, radius);
                clipPath.lineTo(lb.maxX - radius, lb.maxY);
                clipPath.arcTo(lb.maxX, lb.maxY, lb.maxX, lb.maxY - radius, radius);
                clipPath.lineTo(lb.maxX, lb.y + radius);
                clipPath.arcTo(lb.maxX, lb.y, lb.maxX - radius, lb.y, radius);
                clipPath.lineTo(lb.x + radius, lb.y);
                clipPath.arcTo(lb.x, lb.y, lb.x, lb.y + radius, radius);
                clipPath.closePath();
            }
            if (clipStartArrowhead && as) {
                clipPath.addPath(new Path2D(as));
            }
            if (clipEndArrowhead && ae) {
                clipPath.addPath(new Path2D(ae));
            }
            const additionalPaths = [];
            if (as) additionalPaths.push(new Path2D(as));
            if (ae) additionalPaths.push(new Path2D(ae));
            if (labelGeometry) {
                const labelBounds = labelGeometry.getBounds();
                const labelPath = new Path2D();
                labelPath.roundRect(labelBounds.x, labelBounds.y, labelBounds.w, labelBounds.h, 3.5);
                additionalPaths.push(labelPath);
            }
            return {
                path: bodyPath2D,
                clipPath,
                additionalPaths
            };
        }
        const combinedPath = new Path2D();
        combinedPath.addPath(bodyPath2D);
        if (as) {
            combinedPath.addPath(new Path2D(as));
        }
        if (ae) {
            combinedPath.addPath(new Path2D(ae));
        }
        return combinedPath;
    }
    onEditStart(shape) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText)) {
            const labelPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowLabelDefaultPosition"])(this.editor, shape);
            this.editor.updateShape({
                id: shape.id,
                type: shape.type,
                props: {
                    labelPosition
                }
            });
        }
    }
    toSvg(shape, ctx) {
        ctx.addExportDef((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFillDefForExport"])(shape.props.fill));
        const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultColorTheme"])(ctx);
        const scaleFactor = 1 / shape.props.scale;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("g", {
            transform: `scale(${scaleFactor})`,
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ArrowSvg, {
                    shape,
                    shouldDisplayHandles: false
                }),
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$RichTextLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RichTextSVG"], {
                    fontSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowLabelFontSize"])(shape),
                    font: shape.props.font,
                    align: "middle",
                    verticalAlign: "middle",
                    labelColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.labelColor, "solid"),
                    richText: shape.props.richText,
                    bounds: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowLabelPosition"])(this.editor, shape).box.clone().expandBy(-__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_LABEL_PADDING"] * shape.props.scale),
                    padding: 0,
                    showTextOutline: this.options.showTextOutline
                })
            ]
        });
    }
    getCanvasSvgDefs() {
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFillDefForCanvas"])(),
            {
                key: `arrow:dot`,
                component: ArrowheadDotDef
            },
            {
                key: `arrow:cross`,
                component: ArrowheadCrossDef
            }
        ];
    }
    getInterpolatedProps(startShape, endShape, progress) {
        return {
            ...progress > 0.5 ? endShape.props : startShape.props,
            scale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.scale, endShape.props.scale, progress),
            start: {
                x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.start.x, endShape.props.start.x, progress),
                y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.start.y, endShape.props.start.y, progress)
            },
            end: {
                x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.end.x, endShape.props.end.x, progress),
                y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.end.y, endShape.props.end.y, progress)
            },
            bend: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.bend, endShape.props.bend, progress),
            labelPosition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lerp"])(startShape.props.labelPosition, endShape.props.labelPosition, progress)
        };
    }
}
function getArrowLength(editor, shape) {
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(editor, shape);
    return info.type === "straight" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec"].Dist(info.start.handle, info.end.handle) : info.type === "arc" ? Math.abs(info.handleArc.length) : info.route.distance;
}
const ArrowSvg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["track"])(function ArrowSvg2({ shape, shouldDisplayHandles }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowInfo"])(editor, shape);
    const isForceSolid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEfficientZoomThreshold"])(shape.props.scale * 0.25);
    const clipPathId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSharedSafeId"])(shape.id + "_clip");
    const arrowheadDotId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSharedSafeId"])("arrowhead-dot");
    const arrowheadCrossId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSharedSafeId"])("arrowhead-cross");
    const isEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsEditing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsEditing"])(shape.id);
    const geometry = editor.getShapeGeometry(shape);
    if (!geometry) return null;
    const bounds = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"].ZeroFix(geometry.bounds);
    const bindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$shared$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBindings"])(editor, shape);
    const isEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmptyRichText"])(shape.props.richText);
    if (!info?.isValid) return null;
    const strokeWidth = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STROKE_SIZES"][shape.props.size] * shape.props.scale;
    const as = info.start.arrowhead && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowheads$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowheadPathForType"])(info, "start", strokeWidth);
    const ae = info.end.arrowhead && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowheads$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowheadPathForType"])(info, "end", strokeWidth);
    let handlePath = null;
    if (shouldDisplayHandles && (bindings.start || bindings.end)) {
        handlePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$ArrowPath$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowHandlePath"])(info, {
            style: "dashed",
            start: "skip",
            end: "skip",
            lengthRatio: 2.5,
            strokeWidth: 2 / editor.getEfficientZoomLevel(),
            props: {
                className: "tl-arrow-hint",
                markerStart: bindings.start ? bindings.start.props.isExact ? "" : bindings.start.props.isPrecise ? `url(#${arrowheadCrossId})` : `url(#${arrowheadDotId})` : "",
                markerEnd: bindings.end ? bindings.end.props.isExact ? "" : bindings.end.props.isPrecise ? `url(#${arrowheadCrossId})` : `url(#${arrowheadDotId})` : "",
                opacity: 0.16
            }
        });
    }
    const labelPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$arrowLabel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowLabelPosition"])(editor, shape);
    const clipStartArrowhead = !(info.start.arrowhead === "none" || info.start.arrowhead === "arrow");
    const clipEndArrowhead = !(info.end.arrowhead === "none" || info.end.arrowhead === "arrow");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("defs", {
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("clipPath", {
                    id: clipPathId,
                    children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ArrowClipPath, {
                        radius: 3.5 * shape.props.scale,
                        hasText: isEditing || !isEmpty,
                        bounds,
                        labelBounds: labelPosition.box,
                        as: clipStartArrowhead && as ? as : "",
                        ae: clipEndArrowhead && ae ? ae : ""
                    })
                })
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                fill: "none",
                stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getColorValue"])(theme, shape.props.color, "solid"),
                strokeWidth,
                strokeLinejoin: "round",
                strokeLinecap: "round",
                pointerEvents: "none",
                children: [
                    handlePath,
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                        style: {
                            clipPath: `url(#${clipPathId})`,
                            WebkitClipPath: `url(#${clipPathId})`
                        },
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                                x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDomPrecision"])(bounds.minX - 100),
                                y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDomPrecision"])(bounds.minY - 100),
                                width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDomPrecision"])(bounds.width + 200),
                                height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toDomPrecision"])(bounds.height + 200),
                                opacity: 0
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$arrow$2f$ArrowPath$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowBodyPath"])(shape, info, {
                                style: shape.props.dash,
                                strokeWidth,
                                forceSolid: isForceSolid,
                                randomSeed: shape.id
                            })
                        ]
                    }),
                    as && clipStartArrowhead && shape.props.fill !== "none" && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$ShapeFill$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapeFill"], {
                        theme,
                        d: as,
                        color: shape.props.color,
                        fill: shape.props.fill,
                        scale: shape.props.scale
                    }),
                    ae && clipEndArrowhead && shape.props.fill !== "none" && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$ShapeFill$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapeFill"], {
                        theme,
                        d: ae,
                        color: shape.props.color,
                        fill: shape.props.fill,
                        scale: shape.props.scale
                    }),
                    as && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        d: as
                    }),
                    ae && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        d: ae
                    })
                ]
            })
        ]
    });
});
function ArrowClipPath({ radius, hasText, bounds, labelBounds, as, ae }) {
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const path2 = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$PathBuilder$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PathBuilder"]();
        path2.moveTo(bounds.left - 100, bounds.top - 100).lineTo(bounds.right + 100, bounds.top - 100).lineTo(bounds.right + 100, bounds.bottom + 100).lineTo(bounds.left - 100, bounds.bottom + 100).close();
        if (hasText) {
            path2.moveTo(labelBounds.left, labelBounds.top + radius).lineTo(labelBounds.left, labelBounds.bottom - radius).circularArcTo(radius, false, false, labelBounds.left + radius, labelBounds.bottom).lineTo(labelBounds.right - radius, labelBounds.bottom).circularArcTo(radius, false, false, labelBounds.right, labelBounds.bottom - radius).lineTo(labelBounds.right, labelBounds.top + radius).circularArcTo(radius, false, false, labelBounds.right - radius, labelBounds.top).lineTo(labelBounds.left + radius, labelBounds.top).circularArcTo(radius, false, false, labelBounds.left, labelBounds.top + radius).close();
        }
        return path2.toD();
    }, [
        radius,
        hasText,
        bounds.bottom,
        bounds.left,
        bounds.right,
        bounds.top,
        labelBounds.bottom,
        labelBounds.left,
        labelBounds.right,
        labelBounds.top
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
        d: `${path}${as}${ae}`
    });
}
const shapeAtTranslationStart = /* @__PURE__ */ new WeakMap();
function ArrowheadDotDef() {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSharedSafeId"])("arrowhead-dot");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("marker", {
        id,
        className: "tl-arrow-hint",
        refX: "3.0",
        refY: "3.0",
        orient: "0",
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
            cx: "3",
            cy: "3",
            r: "2",
            strokeDasharray: "100%"
        })
    });
}
function ArrowheadCrossDef() {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSharedSafeId"])("arrowhead-cross");
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("marker", {
        id,
        className: "tl-arrow-hint",
        refX: "3.0",
        refY: "3.0",
        orient: "auto",
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "1.5",
                y1: "1.5",
                x2: "4.5",
                y2: "4.5",
                strokeDasharray: "100%"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "1.5",
                y1: "4.5",
                x2: "4.5",
                y2: "1.5",
                strokeDasharray: "100%"
            })
        ]
    });
}
function anglesAreApproximatelyParallel(a, b, tolerance = 1e-4) {
    const diff = Math.abs(a - b);
    const isParallel = diff < tolerance;
    const isFlippedParallel = Math.abs(diff - Math.PI) < tolerance;
    const is360Parallel = Math.abs(diff - __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PI2"]) < tolerance;
    return {
        isParallel: isParallel || is360Parallel,
        isFlippedParallel
    };
}
;
 //# sourceMappingURL=ArrowShapeUtil.mjs.map
}),
];

//# debugId=6a7c0ba3-519f-d490-5ba6-f371f9847c8e
//# sourceMappingURL=c427b_tldraw_dist-esm_lib_shapes_arrow_16609105._.js.map