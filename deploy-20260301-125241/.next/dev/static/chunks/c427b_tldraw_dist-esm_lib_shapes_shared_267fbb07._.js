;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="a233c737-c152-d59a-3d0d-d836ff72ca89")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/PathBuilder.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PathBuilder",
    ()=>PathBuilder,
    "PathBuilderGeometry2d",
    ()=>PathBuilderGeometry2d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$CubicBezier2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/CubicBezier2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Edge2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Edge2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Geometry2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$getPerfectDashProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/shapes/shared/getPerfectDashProps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$geometry$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/geometry-constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/geometry/Group2d.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
;
;
class PathBuilder {
    static lineThroughPoints(points, opts) {
        const path = new PathBuilder();
        path.moveTo(points[0].x, points[0].y, {
            ...opts,
            offset: opts?.endOffsets ?? opts?.offset
        });
        for(let i = 1; i < points.length; i++){
            const isLast = i === points.length - 1;
            path.lineTo(points[i].x, points[i].y, isLast ? {
                offset: opts?.endOffsets
            } : void 0);
        }
        return path;
    }
    static cubicSplineThroughPoints(points, opts) {
        const path = new PathBuilder();
        const len = points.length;
        const last = len - 2;
        const k = 1.25;
        path.moveTo(points[0].x, points[0].y, {
            ...opts,
            offset: opts?.endOffsets ?? opts?.offset
        });
        for(let i = 0; i < len - 1; i++){
            const p0 = i === 0 ? points[0] : points[i - 1];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = i === last ? p2 : points[i + 2];
            let cp1x, cp1y, cp2x, cp2y;
            if (i === 0) {
                cp1x = p0.x;
                cp1y = p0.y;
            } else {
                cp1x = p1.x + (p2.x - p0.x) / 6 * k;
                cp1y = p1.y + (p2.y - p0.y) / 6 * k;
            }
            let pointOpts = void 0;
            if (i === last) {
                cp2x = p2.x;
                cp2y = p2.y;
                pointOpts = {
                    offset: opts?.endOffsets
                };
            } else {
                cp2x = p2.x - (p3.x - p1.x) / 6 * k;
                cp2y = p2.y - (p3.y - p1.y) / 6 * k;
            }
            path.cubicBezierTo(p2.x, p2.y, cp1x, cp1y, cp2x, cp2y, pointOpts);
        }
        return path;
    }
    constructor(){}
    /** @internal */ commands = [];
    lastMoveTo = null;
    assertHasMoveTo() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(this.lastMoveTo, "Start an SVGPathBuilder with `.moveTo()`");
        return this.lastMoveTo;
    }
    moveTo(x, y, opts) {
        this.lastMoveTo = {
            type: "move",
            x,
            y,
            closeIdx: null,
            isClose: false,
            opts
        };
        this.commands.push(this.lastMoveTo);
        return this;
    }
    lineTo(x, y, opts) {
        this.assertHasMoveTo();
        this.commands.push({
            type: "line",
            x,
            y,
            isClose: false,
            opts
        });
        return this;
    }
    circularArcTo(radius, largeArcFlag, sweepFlag, x2, y2, opts) {
        return this.arcTo(radius, radius, largeArcFlag, sweepFlag, 0, x2, y2, opts);
    }
    arcTo(rx, ry, largeArcFlag, sweepFlag, xAxisRotationRadians, x2, y2, opts) {
        this.assertHasMoveTo();
        const x1 = this.commands[this.commands.length - 1].x;
        const y1 = this.commands[this.commands.length - 1].y;
        if (x1 === x2 && y1 === y2) {
            return this;
        }
        if (rx === 0 || ry === 0) {
            return this.lineTo(x2, y2, opts);
        }
        const phi = xAxisRotationRadians;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        let rx1 = Math.abs(rx);
        let ry1 = Math.abs(ry);
        const dx = (x1 - x2) / 2;
        const dy = (y1 - y2) / 2;
        const x1p = cosPhi * dx + sinPhi * dy;
        const y1p = -sinPhi * dx + cosPhi * dy;
        const lambda = x1p * x1p / (rx1 * rx1) + y1p * y1p / (ry1 * ry1);
        if (lambda > 1) {
            const sqrtLambda = Math.sqrt(lambda);
            rx1 *= sqrtLambda;
            ry1 *= sqrtLambda;
        }
        const sign = largeArcFlag !== sweepFlag ? 1 : -1;
        const term = rx1 * rx1 * ry1 * ry1 - rx1 * rx1 * y1p * y1p - ry1 * ry1 * x1p * x1p;
        const numerator = rx1 * rx1 * y1p * y1p + ry1 * ry1 * x1p * x1p;
        let radicand = term / numerator;
        radicand = radicand < 0 ? 0 : radicand;
        const coef = sign * Math.sqrt(radicand);
        const cxp = coef * (rx1 * y1p / ry1);
        const cyp = coef * (-(ry1 * x1p) / rx1);
        const cx = cosPhi * cxp - sinPhi * cyp + (x1 + x2) / 2;
        const cy = sinPhi * cxp + cosPhi * cyp + (y1 + y2) / 2;
        const ux = (x1p - cxp) / rx1;
        const uy = (y1p - cyp) / ry1;
        const vx = (-x1p - cxp) / rx1;
        const vy = (-y1p - cyp) / ry1;
        const startAngle = Math.atan2(uy, ux);
        let endAngle = Math.atan2(vy, vx);
        if (!sweepFlag && endAngle > startAngle) {
            endAngle -= 2 * Math.PI;
        } else if (sweepFlag && endAngle < startAngle) {
            endAngle += 2 * Math.PI;
        }
        const sweepAngle = endAngle - startAngle;
        const approximateArcLength = Math.max(rx1, ry1) * Math.abs(sweepAngle);
        const numSegments = Math.min(4, Math.ceil(Math.abs(sweepAngle) / (Math.PI / 2)));
        const resolutionPerSegment = Math.ceil((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$geometry$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerticesCountForArcLength"])(approximateArcLength) / numSegments);
        const anglePerSegment = sweepAngle / numSegments;
        const ellipsePoint = (angle)=>{
            return {
                x: cx + rx1 * Math.cos(angle) * cosPhi - ry1 * Math.sin(angle) * sinPhi,
                y: cy + rx1 * Math.cos(angle) * sinPhi + ry1 * Math.sin(angle) * cosPhi
            };
        };
        const ellipseDerivative = (angle)=>{
            return {
                x: -rx1 * Math.sin(angle) * cosPhi - ry1 * Math.cos(angle) * sinPhi,
                y: -rx1 * Math.sin(angle) * sinPhi + ry1 * Math.cos(angle) * cosPhi
            };
        };
        for(let i = 0; i < numSegments; i++){
            const theta1 = startAngle + i * anglePerSegment;
            const theta2 = startAngle + (i + 1) * anglePerSegment;
            const deltaTheta = theta2 - theta1;
            const start = ellipsePoint(theta1);
            const end = ellipsePoint(theta2);
            const d1 = ellipseDerivative(theta1);
            const d2 = ellipseDerivative(theta2);
            const handleScale = 4 / 3 * Math.tan(deltaTheta / 4);
            const cp1x = start.x + handleScale * d1.x;
            const cp1y = start.y + handleScale * d1.y;
            const cp2x = end.x - handleScale * d2.x;
            const cp2y = end.y - handleScale * d2.y;
            const bezierOpts = i === 0 ? opts : {
                ...opts,
                mergeWithPrevious: true
            };
            this.cubicBezierToWithResolution(end.x, end.y, cp1x, cp1y, cp2x, cp2y, bezierOpts, resolutionPerSegment);
        }
        return this;
    }
    cubicBezierTo(x, y, cp1X, cp1Y, cp2X, cp2Y, opts) {
        return this.cubicBezierToWithResolution(x, y, cp1X, cp1Y, cp2X, cp2Y, opts);
    }
    cubicBezierToWithResolution(x, y, cp1X, cp1Y, cp2X, cp2Y, opts, resolution) {
        this.assertHasMoveTo();
        this.commands.push({
            type: "cubic",
            x,
            y,
            cp1: {
                x: cp1X,
                y: cp1Y
            },
            cp2: {
                x: cp2X,
                y: cp2Y
            },
            isClose: false,
            opts,
            resolution
        });
        return this;
    }
    close() {
        const lastMoveTo = this.assertHasMoveTo();
        const lastCommand = this.commands[this.commands.length - 1];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["approximately"])(lastMoveTo.x, lastCommand.x) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["approximately"])(lastMoveTo.y, lastCommand.y)) {
            lastCommand.isClose = true;
        } else {
            this.commands.push({
                type: "line",
                x: lastMoveTo.x,
                y: lastMoveTo.y,
                isClose: true
            });
        }
        lastMoveTo.closeIdx = this.commands.length - 1;
        this.lastMoveTo = null;
        return this;
    }
    toD(opts = {}) {
        const { startIdx = 0, endIdx = this.commands.length, onlyFilled = false } = opts;
        const parts = [];
        let isSkippingCurrentLine = false;
        let didAddMove = false;
        let didAddNaturalMove = false;
        const addMoveIfNeeded = (i)=>{
            if (didAddMove || i === 0) return;
            didAddMove = true;
            const command = this.commands[i - 1];
            parts.push("M", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.y));
        };
        for(let i = startIdx; i < endIdx; i++){
            const command = this.commands[i];
            switch(command.type){
                case "move":
                    {
                        const isFilled = command.opts?.geometry === false ? false : command.opts?.geometry?.isFilled ?? false;
                        if (onlyFilled && !isFilled) {
                            isSkippingCurrentLine = true;
                        } else {
                            isSkippingCurrentLine = false;
                            didAddMove = true;
                            didAddNaturalMove = true;
                            parts.push("M", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.y));
                        }
                        break;
                    }
                case "line":
                    if (isSkippingCurrentLine) break;
                    addMoveIfNeeded(i);
                    if (command.isClose && didAddNaturalMove) {
                        parts.push("Z");
                    } else {
                        parts.push("L", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.y));
                    }
                    break;
                case "cubic":
                    if (isSkippingCurrentLine) break;
                    addMoveIfNeeded(i);
                    parts.push("C", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.cp1.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.cp1.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.cp2.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.cp2.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(command.y));
                    break;
                default:
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(command, "type");
            }
        }
        return parts.join(" ");
    }
    toSvg(opts) {
        if (opts.forceSolid) {
            return this.toSolidSvg(opts);
        }
        switch(opts.style){
            case "solid":
                return this.toSolidSvg(opts);
            case "dashed":
            case "dotted":
                return this.toDashedSvg(opts);
            case "draw":
                {
                    const d = this.toDrawSvg(opts);
                    return d;
                }
            default:
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(opts, "style");
        }
    }
    toPath2D(opts) {
        if (opts.forceSolid || opts.style === "solid") {
            return new Path2D(this.toD({
                onlyFilled: opts.onlyFilled
            }));
        }
        if (opts.style === "draw") {
            return new Path2D(this.toDrawD(opts));
        }
        return new Path2D(this.toD({
            onlyFilled: opts.onlyFilled
        }));
    }
    toGeometry() {
        const geometries = [];
        let current = null;
        for(let i = 0; i < this.commands.length; i++){
            const command = this.commands[i];
            if (command.type === "move") {
                if (current && current.opts?.geometry !== false) {
                    geometries.push(new PathBuilderGeometry2d(this, current.startIdx, i, {
                        ...current.opts?.geometry,
                        isFilled: current.opts?.geometry?.isFilled ?? false,
                        isClosed: current.moveCommand.closeIdx !== null
                    }));
                }
                current = {
                    startIdx: i,
                    moveCommand: command,
                    opts: command.opts,
                    isClosed: false
                };
            }
            if (command.isClose) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(current, "No current move command");
                current.isClosed = true;
            }
        }
        if (current && current.opts?.geometry !== false) {
            geometries.push(new PathBuilderGeometry2d(this, current.startIdx, this.commands.length, {
                ...current.opts?.geometry,
                isFilled: current.opts?.geometry?.isFilled ?? false,
                isClosed: current.moveCommand.closeIdx !== null
            }));
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(geometries.length > 0);
        if (geometries.length === 1) return geometries[0];
        return new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Group2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group2d"]({
            children: geometries
        });
    }
    toSolidSvg(opts) {
        const { strokeWidth, props } = opts;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            strokeWidth,
            d: this.toD({
                onlyFilled: opts.onlyFilled
            }),
            ...props
        });
    }
    toDashedSvg(opts) {
        const { style, strokeWidth, snap, lengthRatio, props: { markerStart, markerEnd, ...props } = {} } = opts;
        const parts = [];
        let isCurrentPathClosed = false;
        let isSkippingCurrentLine = false;
        let currentLineOpts = void 0;
        let currentRun = null;
        const addCurrentRun = ()=>{
            if (!currentRun) return;
            const { startIdx, endIdx, isFirst, isLast, length, lineOpts, pathIsClosed } = currentRun;
            currentRun = null;
            if (startIdx === endIdx && this.commands[startIdx].type === "move") return;
            const start = lineOpts?.dashStart ?? opts.start;
            const end = lineOpts?.dashEnd ?? opts.end;
            const { strokeDasharray, strokeDashoffset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$shapes$2f$shared$2f$getPerfectDashProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPerfectDashProps"])(length, strokeWidth, {
                style,
                snap,
                lengthRatio,
                start: isFirst ? start ?? (pathIsClosed ? "outset" : "none") : "outset",
                end: isLast ? end ?? (pathIsClosed ? "outset" : "none") : "outset"
            });
            const d = this.toD({
                startIdx,
                endIdx: endIdx + 1
            });
            parts.push(/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d,
                strokeDasharray,
                strokeDashoffset,
                markerStart: isFirst ? markerStart : void 0,
                markerEnd: isLast ? markerEnd : void 0
            }, parts.length));
        };
        for(let i = 0; i < this.commands.length; i++){
            const command = this.commands[i];
            const lastCommand = this.commands[i - 1];
            if (command.type === "move") {
                isCurrentPathClosed = command.closeIdx !== null;
                const isFilled = command.opts?.geometry === false ? false : command.opts?.geometry?.isFilled ?? false;
                if (opts.onlyFilled && !isFilled) {
                    isSkippingCurrentLine = true;
                } else {
                    isSkippingCurrentLine = false;
                    currentLineOpts = command.opts;
                }
                continue;
            }
            if (isSkippingCurrentLine) continue;
            const segmentLength = this.calculateSegmentLength(lastCommand, command);
            const isFirst = lastCommand.type === "move";
            const isLast = command.isClose || i === this.commands.length - 1 || this.commands[i + 1]?.type === "move";
            if (currentRun && command.opts?.mergeWithPrevious) {
                currentRun.length += segmentLength;
                currentRun.endIdx = i;
                currentRun.isLast = isLast;
            } else {
                addCurrentRun();
                currentRun = {
                    startIdx: i,
                    endIdx: i,
                    isFirst,
                    isLast,
                    length: segmentLength,
                    lineOpts: currentLineOpts,
                    pathIsClosed: isCurrentPathClosed
                };
            }
        }
        addCurrentRun();
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
            strokeWidth,
            ...props,
            children: parts
        });
    }
    toDrawSvg(opts) {
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            strokeWidth: opts.strokeWidth,
            d: this.toDrawD(opts),
            ...opts.props
        });
    }
    toDrawD(opts) {
        const { strokeWidth, randomSeed, offset: defaultOffset = strokeWidth / 3, roundness: defaultRoundness = strokeWidth * 2, passes = 2, onlyFilled = false } = opts;
        const parts = [];
        const commandInfo = this.getCommandInfo();
        const drawCommands = [];
        let lastMoveCommandIdx = null;
        for(let i = 0; i < this.commands.length; i++){
            const command = this.commands[i];
            const offset = command.opts?.offset ?? defaultOffset;
            const roundness = command.opts?.roundness ?? defaultRoundness;
            if (command.type === "move") {
                lastMoveCommandIdx = i;
            }
            const nextIdx = command.isClose ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertExists"])(lastMoveCommandIdx) + 1 : !this.commands[i + 1] || this.commands[i + 1].type === "move" ? void 0 : i + 1;
            const nextInfo = nextIdx !== void 0 && this.commands[nextIdx] && this.commands[nextIdx]?.type !== "move" ? commandInfo[nextIdx] : void 0;
            const currentSupportsRoundness = commandsSupportingRoundness[command.type];
            const nextSupportsRoundness = nextIdx !== void 0 ? commandsSupportingRoundness[this.commands[nextIdx].type] : false;
            const currentInfo = commandInfo[i];
            const tangentToPrev = currentInfo?.tangentEnd;
            const tangentToNext = nextInfo?.tangentStart;
            const roundnessClampedForAngle = currentSupportsRoundness && nextSupportsRoundness && tangentToPrev && tangentToNext && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Len2(tangentToPrev) > 0.01 && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Len2(tangentToNext) > 0.01 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modulate"])(Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].AngleBetween(tangentToPrev, tangentToNext)), [
                Math.PI / 2,
                Math.PI
            ], [
                roundness,
                0
            ], true) : 0;
            const shortestDistance = Math.min(currentInfo?.length ?? Infinity, nextInfo?.length ?? Infinity);
            const offsetLimit = shortestDistance - roundnessClampedForAngle * 2;
            const offsetAmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(offset, 0, offsetLimit / 4);
            const roundnessBeforeClampedForLength = Math.min(roundnessClampedForAngle, (currentInfo?.length ?? Infinity) / 4);
            const roundnessAfterClampedForLength = Math.min(roundnessClampedForAngle, (nextInfo?.length ?? Infinity) / 4);
            const drawCommand = {
                command,
                offsetAmount,
                roundnessBefore: roundnessBeforeClampedForLength,
                roundnessAfter: roundnessAfterClampedForLength,
                tangentToPrev: commandInfo[i]?.tangentEnd,
                tangentToNext: nextInfo?.tangentStart,
                moveDidClose: false
            };
            drawCommands.push(drawCommand);
            if (command.isClose && lastMoveCommandIdx !== null) {
                const lastMoveCommand = drawCommands[lastMoveCommandIdx];
                lastMoveCommand.moveDidClose = true;
                lastMoveCommand.roundnessAfter = roundnessAfterClampedForLength;
            } else if (command.type === "move") {
                lastMoveCommandIdx = i;
            }
        }
        for(let pass = 0; pass < passes; pass++){
            const random = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rng"])(randomSeed + pass);
            let lastMoveToOffset = {
                x: 0,
                y: 0
            };
            let isSkippingCurrentLine = false;
            for (const { command, offsetAmount, roundnessBefore, roundnessAfter, tangentToNext, tangentToPrev } of drawCommands){
                const offset = command.isClose ? lastMoveToOffset : {
                    x: random() * offsetAmount,
                    y: random() * offsetAmount
                };
                if (command.type === "move") {
                    lastMoveToOffset = offset;
                    const isFilled = command.opts?.geometry === false ? false : command.opts?.geometry?.isFilled ?? false;
                    if (onlyFilled && !isFilled) {
                        isSkippingCurrentLine = true;
                    } else {
                        isSkippingCurrentLine = false;
                    }
                }
                if (isSkippingCurrentLine) continue;
                const offsetPoint = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(command, offset);
                const endPoint = tangentToNext && roundnessAfter > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(tangentToNext, -roundnessAfter).add(offsetPoint) : offsetPoint;
                const startPoint = tangentToPrev && roundnessBefore > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(tangentToPrev, roundnessBefore).add(offsetPoint) : offsetPoint;
                if (endPoint === offsetPoint || startPoint === offsetPoint) {
                    switch(command.type){
                        case "move":
                            parts.push("M", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.y));
                            break;
                        case "line":
                            parts.push("L", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.y));
                            break;
                        case "cubic":
                            {
                                const offsetCp1 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(command.cp1, offset);
                                const offsetCp2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(command.cp2, offset);
                                parts.push("C", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetCp1.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetCp1.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetCp2.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetCp2.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.y));
                                break;
                            }
                        default:
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(command, "type");
                    }
                } else {
                    switch(command.type){
                        case "move":
                            parts.push("M", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.y));
                            break;
                        case "line":
                            parts.push("L", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(startPoint.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(startPoint.y), "Q", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetPoint.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetPoint.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(endPoint.y));
                            break;
                        case "cubic":
                            {
                                const offsetCp1 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(command.cp1, offset);
                                const offsetCp2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(command.cp2, offset);
                                parts.push("C", (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetCp1.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetCp1.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetCp2.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetCp2.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetPoint.x), (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(offsetPoint.y));
                                break;
                            }
                        default:
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(command, "type");
                    }
                }
            }
        }
        return parts.join(" ");
    }
    calculateSegmentLength(lastPoint, command) {
        switch(command.type){
            case "move":
                return 0;
            case "line":
                return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(lastPoint, command);
            case "cubic":
                return CubicBezier.length(lastPoint.x, lastPoint.y, command.cp1.x, command.cp1.y, command.cp2.x, command.cp2.y, command.x, command.y);
            default:
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(command, "type");
        }
    }
    /** @internal */ getCommands() {
        return this.commands;
    }
    /** @internal */ getCommandInfo() {
        const commandInfo = [];
        for(let i = 1; i < this.commands.length; i++){
            const previous = this.commands[i - 1];
            const current = this.commands[i];
            if (current._info) {
                commandInfo[i] = current._info;
                continue;
            }
            if (current.type === "move") {
                continue;
            }
            let tangentStart, tangentEnd;
            switch(current.type){
                case "line":
                    tangentStart = tangentEnd = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(previous, current).uni();
                    break;
                case "cubic":
                    {
                        tangentStart = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(current.cp1, previous).uni();
                        tangentEnd = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(current.cp2, current).uni();
                        break;
                    }
                default:
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(current, "type");
            }
            current._info = {
                tangentStart,
                tangentEnd,
                length: this.calculateSegmentLength(previous, current)
            };
            commandInfo[i] = current._info;
        }
        return commandInfo;
    }
}
const commandsSupportingRoundness = {
    line: true,
    move: true,
    cubic: false
};
class PathBuilderGeometry2d extends __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Geometry2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Geometry2d"] {
    constructor(path, startIdx, endIdx, options){
        super(options);
        this.path = path;
        this.startIdx = startIdx;
        this.endIdx = endIdx;
    }
    _segments = null;
    getSegments() {
        if (this._segments) return this._segments;
        this._segments = [];
        let last = this.path.commands[this.startIdx];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(last.type === "move");
        for(let i = this.startIdx + 1; i < this.endIdx; i++){
            const command = this.path.commands[i];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(command.type !== "move");
            switch(command.type){
                case "line":
                    this._segments.push(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$Edge2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Edge2d"]({
                        start: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(last),
                        end: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(command)
                    }));
                    break;
                case "cubic":
                    {
                        this._segments.push(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$geometry$2f$CubicBezier2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CubicBezier2d"]({
                            start: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(last),
                            cp1: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(command.cp1),
                            cp2: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(command.cp2),
                            end: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(command),
                            resolution: command.resolution
                        }));
                        break;
                    }
                default:
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exhaustiveSwitchError"])(command, "type");
            }
            last = command;
        }
        return this._segments;
    }
    getVertices(filters) {
        const vs = this.getSegments().flatMap((s)=>s.getVertices(filters)).filter((vertex, i, vertices)=>{
            const prev = vertices[i - 1];
            if (!prev) return true;
            return !__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Equals(prev, vertex);
        });
        if (this.isClosed) {
            const last = vs[vs.length - 1];
            const first = vs[0];
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Equals(last, first)) {
                vs.push(first);
            }
        }
        return vs;
    }
    nearestPoint(point, _filters) {
        let nearest = null;
        let nearestDistance = Infinity;
        for (const segment of this.getSegments()){
            const candidate = segment.nearestPoint(point);
            const distance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(point, candidate);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearest = candidate;
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(nearest, "No nearest point found");
        return nearest;
    }
    hitTestLineSegment(A, B, distance = 0, filters) {
        return super.hitTestLineSegment(A, B, distance, filters);
    }
    getSvgPathData() {
        return this.path.toD({
            startIdx: this.startIdx,
            endIdx: this.endIdx
        });
    }
}
/*!
 * Adapted from https://github.com/adobe-webplatform/Snap.svg/tree/master
 * Apache License: https://github.com/adobe-webplatform/Snap.svg/blob/master/LICENSE
 * https://github.com/adobe-webplatform/Snap.svg/blob/c8e483c9694517e24b282f8f59f985629f4994ce/dist/snap.svg.js#L5786
 */ const CubicBezier = {
    base3 (t, p1, p2, p3, p4) {
        const t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4;
        const t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
        return t * t2 - 3 * p1 + 3 * p2;
    },
    /**
   * Calculate the approximate length of a cubic bezier curve from (x1, y1) to (x4, y4) with
   * control points (x2, y2) and (x3, y3).
   */ length (x1, y1, x2, y2, x3, y3, x4, y4, z = 1) {
        z = z > 1 ? 1 : z < 0 ? 0 : z;
        const z2 = z / 2;
        const n = 12;
        let sum = 0;
        sum = 0;
        for(let i = 0; i < n; i++){
            const ct = z2 * CubicBezier.Tvalues[i] + z2;
            const xbase = CubicBezier.base3(ct, x1, x2, x3, x4);
            const ybase = CubicBezier.base3(ct, y1, y2, y3, y4);
            const comb = xbase * xbase + ybase * ybase;
            sum += CubicBezier.Cvalues[i] * Math.sqrt(comb);
        }
        return z2 * sum;
    },
    Tvalues: [
        -0.1252,
        0.1252,
        -0.3678,
        0.3678,
        -0.5873,
        0.5873,
        -0.7699,
        0.7699,
        -0.9041,
        0.9041,
        -0.9816,
        0.9816
    ],
    Cvalues: [
        0.2491,
        0.2491,
        0.2335,
        0.2335,
        0.2032,
        0.2032,
        0.1601,
        0.1601,
        0.1069,
        0.1069,
        0.0472,
        0.0472
    ]
};
;
 //# sourceMappingURL=PathBuilder.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/usePrefersReducedMotion.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrefersReducedMotion",
    ()=>usePrefersReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function usePrefersReducedMotion() {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMaybeEditor"])();
    const animationSpeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("animationSpeed", {
        "usePrefersReducedMotion.useValue[animationSpeed]": ()=>editor?.user.getAnimationSpeed()
    }["usePrefersReducedMotion.useValue[animationSpeed]"], [
        editor
    ]);
    const [prefersReducedMotion, setPrefersReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePrefersReducedMotion.useEffect": ()=>{
            if (animationSpeed !== void 0) {
                setPrefersReducedMotion(animationSpeed === 0 ? true : false);
                return;
            }
            if (typeof window === "undefined" || !("matchMedia" in window)) return;
            const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
            const handler = {
                "usePrefersReducedMotion.useEffect.handler": ()=>{
                    setPrefersReducedMotion(mql.matches);
                }
            }["usePrefersReducedMotion.useEffect.handler"];
            handler();
            mql.addEventListener("change", handler);
            return ({
                "usePrefersReducedMotion.useEffect": ()=>mql.removeEventListener("change", handler)
            })["usePrefersReducedMotion.useEffect"];
        }
    }["usePrefersReducedMotion.useEffect"], [
        animationSpeed
    ]);
    return prefersReducedMotion;
}
;
 //# sourceMappingURL=usePrefersReducedMotion.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDefaultColorTheme",
    ()=>useDefaultColorTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsDarkMode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useIsDarkMode.mjs [app-client] (ecmascript)");
;
function useDefaultColorTheme() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultColorTheme"])({
        isDarkMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useIsDarkMode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsDarkMode"])()
    });
}
;
 //# sourceMappingURL=useDefaultColorTheme.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/crop.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ASPECT_RATIO_OPTIONS",
    ()=>ASPECT_RATIO_OPTIONS,
    "ASPECT_RATIO_TO_VALUE",
    ()=>ASPECT_RATIO_TO_VALUE,
    "MAX_ZOOM",
    ()=>MAX_ZOOM,
    "MIN_CROP_SIZE",
    ()=>MIN_CROP_SIZE,
    "getCropBox",
    ()=>getCropBox,
    "getCroppedImageDataForAspectRatio",
    ()=>getCroppedImageDataForAspectRatio,
    "getCroppedImageDataForReplacedImage",
    ()=>getCroppedImageDataForReplacedImage,
    "getCroppedImageDataWhenZooming",
    ()=>getCroppedImageDataWhenZooming,
    "getDefaultCrop",
    ()=>getDefaultCrop,
    "getUncroppedSize",
    ()=>getUncroppedSize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
;
const MIN_CROP_SIZE = 8;
function getDefaultCrop() {
    return {
        topLeft: {
            x: 0,
            y: 0
        },
        bottomRight: {
            x: 1,
            y: 1
        }
    };
}
const ASPECT_RATIO_OPTIONS = [
    "original",
    "square",
    "circle",
    "landscape",
    "portrait",
    "wide"
];
const ASPECT_RATIO_TO_VALUE = {
    original: 0,
    square: 1,
    circle: 1,
    landscape: 4 / 3,
    portrait: 3 / 4,
    wide: 16 / 9
};
function getUncroppedSize(shapeSize, crop) {
    if (!crop) return {
        w: shapeSize.w,
        h: shapeSize.h
    };
    const w = shapeSize.w / (crop.bottomRight.x - crop.topLeft.x);
    const h = shapeSize.h / (crop.bottomRight.y - crop.topLeft.y);
    return {
        w,
        h
    };
}
function getCropDimensions(crop) {
    return {
        width: crop.bottomRight.x - crop.topLeft.x,
        height: crop.bottomRight.y - crop.topLeft.y
    };
}
function getCropCenter(crop) {
    const { width, height } = getCropDimensions(crop);
    return {
        x: crop.topLeft.x + width / 2,
        y: crop.topLeft.y + height / 2
    };
}
function createCropAroundCenter(centerX, centerY, width, height, isCircle) {
    const topLeftX = Math.max(0, Math.min(1 - width, centerX - width / 2));
    const topLeftY = Math.max(0, Math.min(1 - height, centerY - height / 2));
    return {
        topLeft: {
            x: topLeftX,
            y: topLeftY
        },
        bottomRight: {
            x: topLeftX + width,
            y: topLeftY + height
        },
        isCircle
    };
}
function getCropBox(shape, info, opts = {}) {
    const { handle, change, crop, aspectRatioLocked } = info;
    const { w, h } = info.uncroppedSize;
    const { minWidth = MIN_CROP_SIZE, minHeight = MIN_CROP_SIZE } = opts;
    if (w < minWidth || h < minHeight || change.x === 0 && change.y === 0) {
        return;
    }
    const prevCropBox = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"](crop.topLeft.x * w, crop.topLeft.y * h, (crop.bottomRight.x - crop.topLeft.x) * w, (crop.bottomRight.y - crop.topLeft.y) * h);
    const targetRatio = prevCropBox.aspectRatio;
    const tempBox = prevCropBox.clone();
    if (handle === "top_left" || handle === "bottom_left" || handle === "left") {
        tempBox.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(tempBox.x + change.x, 0, prevCropBox.maxX - minWidth);
        tempBox.w = prevCropBox.maxX - tempBox.x;
    } else if (handle === "top_right" || handle === "bottom_right" || handle === "right") {
        const tempRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(tempBox.maxX + change.x, prevCropBox.x + minWidth, w);
        tempBox.w = tempRight - tempBox.x;
    }
    if (handle === "top_left" || handle === "top_right" || handle === "top") {
        tempBox.y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(tempBox.y + change.y, 0, prevCropBox.maxY - minHeight);
        tempBox.h = prevCropBox.maxY - tempBox.y;
    } else if (handle === "bottom_left" || handle === "bottom_right" || handle === "bottom") {
        const tempBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(tempBox.maxY + change.y, prevCropBox.y + minHeight, h);
        tempBox.h = tempBottom - tempBox.y;
    }
    if (aspectRatioLocked) {
        const isXLimiting = tempBox.aspectRatio > targetRatio;
        if (isXLimiting) {
            tempBox.h = tempBox.w / targetRatio;
        } else {
            tempBox.w = tempBox.h * targetRatio;
        }
        switch(handle){
            case "top_left":
                {
                    tempBox.x = prevCropBox.maxX - tempBox.w;
                    tempBox.y = prevCropBox.maxY - tempBox.h;
                    if (tempBox.x <= 0) {
                        tempBox.x = 0;
                        tempBox.w = prevCropBox.maxX - tempBox.x;
                        tempBox.h = tempBox.w / targetRatio;
                        tempBox.y = prevCropBox.maxY - tempBox.h;
                    }
                    if (tempBox.y <= 0) {
                        tempBox.y = 0;
                        tempBox.h = prevCropBox.maxY - tempBox.y;
                        tempBox.w = tempBox.h * targetRatio;
                        tempBox.x = prevCropBox.maxX - tempBox.w;
                    }
                    break;
                }
            case "top_right":
                {
                    tempBox.x = prevCropBox.x;
                    tempBox.y = prevCropBox.maxY - tempBox.h;
                    if (tempBox.maxX >= w) {
                        tempBox.w = w - prevCropBox.x;
                        tempBox.h = tempBox.w / targetRatio;
                        tempBox.y = prevCropBox.maxY - tempBox.h;
                    }
                    if (tempBox.y <= 0) {
                        tempBox.y = 0;
                        tempBox.h = prevCropBox.maxY - tempBox.y;
                        tempBox.w = tempBox.h * targetRatio;
                    }
                    break;
                }
            case "bottom_left":
                {
                    tempBox.x = prevCropBox.maxX - tempBox.w;
                    tempBox.y = prevCropBox.y;
                    if (tempBox.x <= 0) {
                        tempBox.x = 0;
                        tempBox.w = prevCropBox.maxX - tempBox.x;
                        tempBox.h = tempBox.w / targetRatio;
                    }
                    if (tempBox.maxY >= h) {
                        tempBox.h = h - prevCropBox.y;
                        tempBox.w = tempBox.h * targetRatio;
                        tempBox.x = prevCropBox.maxX - tempBox.w;
                    }
                    break;
                }
            case "bottom_right":
                {
                    tempBox.x = prevCropBox.x;
                    tempBox.y = prevCropBox.y;
                    if (tempBox.maxX >= w) {
                        tempBox.w = w - prevCropBox.x;
                        tempBox.h = tempBox.w / targetRatio;
                    }
                    if (tempBox.maxY >= h) {
                        tempBox.h = h - prevCropBox.y;
                        tempBox.w = tempBox.h * targetRatio;
                    }
                    break;
                }
            case "top":
                {
                    tempBox.h = prevCropBox.maxY - tempBox.y;
                    tempBox.w = tempBox.h * targetRatio;
                    tempBox.x -= (tempBox.w - prevCropBox.w) / 2;
                    if (tempBox.x <= 0) {
                        const leftSide = prevCropBox.midX;
                        tempBox.w = leftSide * 2;
                        tempBox.h = tempBox.w / targetRatio;
                        tempBox.x = 0;
                    }
                    if (tempBox.maxX >= w) {
                        const rightSide = w - prevCropBox.midX;
                        tempBox.w = rightSide * 2;
                        tempBox.h = tempBox.w / targetRatio;
                        tempBox.x = w - tempBox.w;
                    }
                    tempBox.y = prevCropBox.maxY - tempBox.h;
                    break;
                }
            case "right":
                {
                    tempBox.w = tempBox.maxX - prevCropBox.x;
                    tempBox.h = tempBox.w / targetRatio;
                    tempBox.y -= (tempBox.h - prevCropBox.h) / 2;
                    if (tempBox.y <= 0) {
                        const topSide = prevCropBox.midY;
                        tempBox.h = topSide * 2;
                        tempBox.w = tempBox.h * targetRatio;
                        tempBox.y = 0;
                    }
                    if (tempBox.maxY >= h) {
                        const bottomSide = h - prevCropBox.midY;
                        tempBox.h = bottomSide * 2;
                        tempBox.w = tempBox.h * targetRatio;
                        tempBox.y = h - tempBox.h;
                    }
                    break;
                }
            case "bottom":
                {
                    tempBox.h = tempBox.maxY - prevCropBox.y;
                    tempBox.w = tempBox.h * targetRatio;
                    tempBox.x -= (tempBox.w - prevCropBox.w) / 2;
                    if (tempBox.x <= 0) {
                        const leftSide = prevCropBox.midX;
                        tempBox.w = leftSide * 2;
                        tempBox.h = tempBox.w / targetRatio;
                        tempBox.x = 0;
                    }
                    if (tempBox.maxX >= w) {
                        const rightSide = w - prevCropBox.midX;
                        tempBox.w = rightSide * 2;
                        tempBox.h = tempBox.w / targetRatio;
                        tempBox.x = w - tempBox.w;
                    }
                    break;
                }
            case "left":
                {
                    tempBox.w = prevCropBox.maxX - tempBox.x;
                    tempBox.h = tempBox.w / targetRatio;
                    tempBox.y -= (tempBox.h - prevCropBox.h) / 2;
                    if (tempBox.y <= 0) {
                        const topSide = prevCropBox.midY;
                        tempBox.h = topSide * 2;
                        tempBox.w = tempBox.h * targetRatio;
                        tempBox.y = 0;
                    }
                    if (tempBox.maxY >= h) {
                        const bottomSide = h - prevCropBox.midY;
                        tempBox.h = bottomSide * 2;
                        tempBox.w = tempBox.h * targetRatio;
                        tempBox.y = h - tempBox.h;
                    }
                    tempBox.x = prevCropBox.maxX - tempBox.w;
                    break;
                }
        }
    }
    const newCrop = {
        topLeft: {
            x: tempBox.x / w,
            y: tempBox.y / h
        },
        bottomRight: {
            x: tempBox.maxX / w,
            y: tempBox.maxY / h
        },
        isCircle: crop.isCircle
    };
    if (newCrop.topLeft.x === crop.topLeft.x && newCrop.topLeft.y === crop.topLeft.y && newCrop.bottomRight.x === crop.bottomRight.x && newCrop.bottomRight.y === crop.bottomRight.y) {
        return;
    }
    const newPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](tempBox.x - crop.topLeft.x * w, tempBox.y - crop.topLeft.y * h).rot(shape.rotation).add(shape);
    return {
        id: shape.id,
        type: shape.type,
        x: newPoint.x,
        y: newPoint.y,
        props: {
            ...shape.props,
            w: tempBox.w,
            h: tempBox.h,
            crop: newCrop
        }
    };
}
function calculateCropChange(imageShape, newCropWidth, newCropHeight, centerOnCurrentCrop = true, isCircle = false) {
    const { w, h } = getUncroppedSize(imageShape.props, imageShape.props.crop ?? getDefaultCrop());
    const currentCrop = imageShape.props.crop || getDefaultCrop();
    const imageCenterX = imageShape.x + imageShape.props.w / 2;
    const imageCenterY = imageShape.y + imageShape.props.h / 2;
    let cropCenterX, cropCenterY;
    if (centerOnCurrentCrop) {
        const { x, y } = getCropCenter(currentCrop);
        cropCenterX = x;
        cropCenterY = y;
    } else {
        cropCenterX = 0.5;
        cropCenterY = 0.5;
    }
    const newCrop = createCropAroundCenter(cropCenterX, cropCenterY, newCropWidth, newCropHeight, isCircle);
    const croppedW = newCropWidth * w;
    const croppedH = newCropHeight * h;
    return {
        crop: newCrop,
        w: croppedW,
        h: croppedH,
        x: imageCenterX - croppedW / 2,
        y: imageCenterY - croppedH / 2
    };
}
const MAX_ZOOM = 3;
function getCroppedImageDataWhenZooming(zoom, imageShape, maxZoom) {
    const oldCrop = imageShape.props.crop || getDefaultCrop();
    const { width: oldWidth, height: oldHeight } = getCropDimensions(oldCrop);
    const aspectRatio = oldWidth / oldHeight;
    const derivedMaxZoom = maxZoom ? 1 / (1 - maxZoom) : MAX_ZOOM;
    const zoomScale = 1 + zoom * (derivedMaxZoom - 1);
    let newWidth, newHeight;
    if (aspectRatio > 1) {
        newWidth = Math.min(1, 1 / zoomScale);
        newHeight = newWidth / aspectRatio;
    } else {
        newHeight = Math.min(1, 1 / zoomScale);
        newWidth = newHeight * aspectRatio;
    }
    const result = calculateCropChange(imageShape, newWidth, newHeight, true, oldCrop.isCircle);
    const scaleFactor = Math.min(MAX_ZOOM, oldWidth / newWidth);
    result.w *= scaleFactor;
    result.h *= scaleFactor;
    const imageCenterX = imageShape.x + imageShape.props.w / 2;
    const imageCenterY = imageShape.y + imageShape.props.h / 2;
    result.x = imageCenterX - result.w / 2;
    result.y = imageCenterY - result.h / 2;
    return result;
}
function getCroppedImageDataForReplacedImage(imageShape, newImageWidth, newImageHeight) {
    const defaultCrop = getDefaultCrop();
    const currentCrop = imageShape.props.crop || defaultCrop;
    const origDisplayW = imageShape.props.w;
    const origDisplayH = imageShape.props.h;
    const newImageAspectRatio = newImageWidth / newImageHeight;
    let crop = defaultCrop;
    let newDisplayW = origDisplayW;
    let newDisplayH = origDisplayH;
    const isOriginalCrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEqual"])(imageShape.props.crop, defaultCrop);
    if (isOriginalCrop) {
        newDisplayW = origDisplayW;
        newDisplayH = origDisplayW * newImageHeight / newImageWidth;
    } else {
        const { w: uncroppedW, h: uncroppedH } = getUncroppedSize(imageShape.props, imageShape.props.crop || getDefaultCrop());
        const { width: cropW, height: cropH } = getCropDimensions(currentCrop);
        const targetRatio = cropW / cropH;
        const oldImageAspectRatio = uncroppedW / uncroppedH;
        let newRelativeWidth;
        let newRelativeHeight;
        const currentCropCenter = getCropCenter(currentCrop);
        newRelativeWidth = cropW;
        const ratioConversion = newImageAspectRatio / oldImageAspectRatio / targetRatio;
        newRelativeHeight = newRelativeWidth * ratioConversion;
        const maxRatioConversion = MAX_ZOOM / (MAX_ZOOM - 1);
        if (ratioConversion > maxRatioConversion) {
            const minDimension = 1 / MAX_ZOOM;
            if (1 / newRelativeHeight < 1 / newRelativeWidth) {
                const scale = newRelativeHeight / minDimension;
                newRelativeHeight = newRelativeHeight / scale;
                newRelativeWidth = newRelativeWidth / scale;
            } else {
                const scale = newRelativeWidth / minDimension;
                newRelativeWidth = newRelativeWidth / scale;
                newRelativeHeight = newRelativeHeight / scale;
            }
        }
        newRelativeWidth = Math.max(0, Math.min(1, newRelativeWidth));
        newRelativeHeight = Math.max(0, Math.min(1, newRelativeHeight));
        crop = createCropAroundCenter(currentCropCenter.x, currentCropCenter.y, newRelativeWidth, newRelativeHeight, currentCrop.isCircle);
    }
    const pageCenterX = imageShape.x + origDisplayW / 2;
    const pageCenterY = imageShape.y + origDisplayH / 2;
    const newX = pageCenterX - newDisplayW / 2;
    const newY = pageCenterY - newDisplayH / 2;
    return {
        crop,
        w: newDisplayW,
        h: newDisplayH,
        x: newX,
        y: newY
    };
}
function getCroppedImageDataForAspectRatio(aspectRatioOption, imageShape) {
    if (aspectRatioOption === "original") {
        const { w, h } = getUncroppedSize(imageShape.props, imageShape.props.crop ?? getDefaultCrop());
        const imageCenterX = imageShape.x + imageShape.props.w / 2;
        const imageCenterY = imageShape.y + imageShape.props.h / 2;
        return {
            crop: getDefaultCrop(),
            w,
            h,
            x: imageCenterX - w / 2,
            y: imageCenterY - h / 2
        };
    }
    const targetRatio = ASPECT_RATIO_TO_VALUE[aspectRatioOption];
    const isCircle = aspectRatioOption === "circle";
    const { w: uncroppedW, h: uncroppedH } = getUncroppedSize(imageShape.props, imageShape.props.crop || getDefaultCrop());
    const imageAspectRatio = uncroppedW / uncroppedH;
    const currentCrop = imageShape.props.crop || getDefaultCrop();
    const { width: cropW, height: cropH } = getCropDimensions(currentCrop);
    const currentCropCenter = getCropCenter(currentCrop);
    const currentCropZoom = Math.min(1 / cropW, 1 / cropH);
    let newRelativeWidth;
    let newRelativeHeight;
    if (imageAspectRatio === 0 || !Number.isFinite(imageAspectRatio) || targetRatio === 0) {
        newRelativeWidth = 1;
        newRelativeHeight = 1;
    } else {
        const currentAbsoluteWidth = cropW * uncroppedW;
        const currentAbsoluteHeight = cropH * uncroppedH;
        const longestCurrentDimension = Math.max(currentAbsoluteWidth, currentAbsoluteHeight);
        const isWidthLongest = currentAbsoluteWidth >= currentAbsoluteHeight;
        let newAbsoluteWidth;
        let newAbsoluteHeight;
        if (isWidthLongest) {
            newAbsoluteWidth = longestCurrentDimension;
            newAbsoluteHeight = newAbsoluteWidth / targetRatio;
        } else {
            newAbsoluteHeight = longestCurrentDimension;
            newAbsoluteWidth = newAbsoluteHeight * targetRatio;
        }
        newRelativeWidth = newAbsoluteWidth / uncroppedW;
        newRelativeHeight = newAbsoluteHeight / uncroppedH;
        if (newRelativeWidth > 1) {
            newRelativeWidth = 1;
            newRelativeHeight = imageAspectRatio / targetRatio;
        }
        if (newRelativeHeight > 1) {
            newRelativeHeight = 1;
            newRelativeWidth = targetRatio / imageAspectRatio;
        }
        newRelativeWidth = Math.max(0, Math.min(1, newRelativeWidth));
        newRelativeHeight = Math.max(0, Math.min(1, newRelativeHeight));
    }
    const newCropZoom = Math.min(1 / newRelativeWidth, 1 / newRelativeHeight);
    newRelativeWidth *= newCropZoom / currentCropZoom;
    newRelativeHeight *= newCropZoom / currentCropZoom;
    newRelativeWidth = Math.max(0, Math.min(1, newRelativeWidth));
    newRelativeHeight = Math.max(0, Math.min(1, newRelativeHeight));
    const newCrop = createCropAroundCenter(currentCropCenter.x, currentCropCenter.y, newRelativeWidth, newRelativeHeight, isCircle);
    const finalRelativeWidth = newCrop.bottomRight.x - newCrop.topLeft.x;
    const finalRelativeHeight = newCrop.bottomRight.y - newCrop.topLeft.y;
    const baseW = finalRelativeWidth * uncroppedW;
    const baseH = finalRelativeHeight * uncroppedH;
    let currentScale = 1;
    if (cropW > 0) {
        currentScale = imageShape.props.w / (cropW * uncroppedW);
    } else if (cropH > 0) {
        currentScale = imageShape.props.h / (cropH * uncroppedH);
    }
    const newW = baseW * currentScale;
    const newH = baseH * currentScale;
    const currentCenterXPage = imageShape.x + imageShape.props.w / 2;
    const currentCenterYPage = imageShape.y + imageShape.props.h / 2;
    const newX = currentCenterXPage - newW / 2;
    const newY = currentCenterYPage - newH / 2;
    return {
        crop: newCrop,
        w: newW,
        h: newH,
        x: newX,
        y: newY
    };
}
;
 //# sourceMappingURL=crop.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokeOutlinePoints.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStrokeOutlinePoints",
    ()=>getStrokeOutlinePoints,
    "getStrokeOutlineTracks",
    ()=>getStrokeOutlineTracks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
;
const { PI } = Math;
const FIXED_PI = PI + 1e-4;
function getStrokeOutlineTracks(strokePoints, options = {}) {
    const { size = 16, smoothing = 0.5 } = options;
    if (strokePoints.length === 0 || size <= 0) {
        return {
            left: [],
            right: []
        };
    }
    const firstStrokePoint = strokePoints[0];
    const lastStrokePoint = strokePoints[strokePoints.length - 1];
    const totalLength = lastStrokePoint.runningLength;
    const minDistance = Math.pow(size * smoothing, 2);
    const leftPts = [];
    const rightPts = [];
    let prevVector = strokePoints[0].vector;
    let pl = strokePoints[0].point;
    let pr = pl;
    let tl = pl;
    let tr = pr;
    let isPrevPointSharpCorner = false;
    let strokePoint;
    for(let i = 0; i < strokePoints.length; i++){
        strokePoint = strokePoints[i];
        const { point, vector } = strokePoints[i];
        const prevDpr = strokePoint.vector.dpr(prevVector);
        const nextVector = (i < strokePoints.length - 1 ? strokePoints[i + 1] : strokePoints[i]).vector;
        const nextDpr = i < strokePoints.length - 1 ? nextVector.dpr(strokePoint.vector) : 1;
        const isPointSharpCorner = prevDpr < 0 && !isPrevPointSharpCorner;
        const isNextPointSharpCorner = nextDpr !== null && nextDpr < 0.2;
        if (isPointSharpCorner || isNextPointSharpCorner) {
            if (nextDpr > -0.62 && totalLength - strokePoint.runningLength > strokePoint.radius) {
                const offset2 = prevVector.clone().mul(strokePoint.radius);
                const cpr = prevVector.clone().cpr(nextVector);
                if (cpr < 0) {
                    tl = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(point, offset2);
                    tr = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(point, offset2);
                } else {
                    tl = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(point, offset2);
                    tr = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(point, offset2);
                }
                leftPts.push(tl);
                rightPts.push(tr);
            } else {
                const offset2 = prevVector.clone().mul(strokePoint.radius).per();
                const start = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(strokePoint.input, offset2);
                for(let step = 1 / 13, t = 0; t < 1; t += step){
                    tl = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].RotWith(start, strokePoint.input, FIXED_PI * t);
                    leftPts.push(tl);
                    tr = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].RotWith(start, strokePoint.input, FIXED_PI + FIXED_PI * -t);
                    rightPts.push(tr);
                }
            }
            pl = tl;
            pr = tr;
            if (isNextPointSharpCorner) {
                isPrevPointSharpCorner = true;
            }
            continue;
        }
        isPrevPointSharpCorner = false;
        if (strokePoint === firstStrokePoint || strokePoint === lastStrokePoint) {
            const offset2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Per(vector).mul(strokePoint.radius);
            leftPts.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(point, offset2));
            rightPts.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(point, offset2));
            continue;
        }
        const offset = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Lrp(nextVector, vector, nextDpr).per().mul(strokePoint.radius);
        tl = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(point, offset);
        if (i <= 1 || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(pl, tl) > minDistance) {
            leftPts.push(tl);
            pl = tl;
        }
        tr = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(point, offset);
        if (i <= 1 || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(pr, tr) > minDistance) {
            rightPts.push(tr);
            pr = tr;
        }
        prevVector = vector;
        continue;
    }
    return {
        left: leftPts,
        right: rightPts
    };
}
function getStrokeOutlinePoints(strokePoints, options = {}) {
    const { size = 16, start = {}, end = {}, last: isComplete = false } = options;
    const { cap: capStart = true } = start;
    const { cap: capEnd = true } = end;
    if (strokePoints.length === 0 || size <= 0) {
        return [];
    }
    const firstStrokePoint = strokePoints[0];
    const lastStrokePoint = strokePoints[strokePoints.length - 1];
    const totalLength = lastStrokePoint.runningLength;
    const taperStart = start.taper === false ? 0 : start.taper === true ? Math.max(size, totalLength) : start.taper;
    const taperEnd = end.taper === false ? 0 : end.taper === true ? Math.max(size, totalLength) : end.taper;
    const { left: leftPts, right: rightPts } = getStrokeOutlineTracks(strokePoints, options);
    const firstPoint = firstStrokePoint.point;
    const lastPoint = strokePoints.length > 1 ? strokePoints[strokePoints.length - 1].point : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].AddXY(firstStrokePoint.point, 1, 1);
    if (strokePoints.length === 1) {
        if (!(taperStart || taperEnd) || isComplete) {
            const start2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(firstPoint, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(firstPoint, lastPoint).uni().per().mul(-firstStrokePoint.radius));
            const dotPts = [];
            for(let step = 1 / 13, t = step; t <= 1; t += step){
                dotPts.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].RotWith(start2, firstPoint, FIXED_PI * 2 * t));
            }
            return dotPts;
        }
    }
    const startCap = [];
    if (taperStart || taperEnd && strokePoints.length === 1) {} else if (capStart) {
        for(let step = 1 / 8, t = step; t <= 1; t += step){
            const pt = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].RotWith(rightPts[0], firstPoint, FIXED_PI * t);
            startCap.push(pt);
        }
    } else {
        const cornersVector = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(leftPts[0], rightPts[0]);
        const offsetA = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(cornersVector, 0.5);
        const offsetB = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(cornersVector, 0.51);
        startCap.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(firstPoint, offsetA), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(firstPoint, offsetB), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(firstPoint, offsetB), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(firstPoint, offsetA));
    }
    const endCap = [];
    const direction = lastStrokePoint.vector.clone().per().neg();
    if (taperEnd || taperStart && strokePoints.length === 1) {
        endCap.push(lastPoint);
    } else if (capEnd) {
        const start2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(lastPoint, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, lastStrokePoint.radius));
        for(let step = 1 / 29, t = step; t < 1; t += step){
            endCap.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].RotWith(start2, lastPoint, FIXED_PI * 3 * t));
        }
    } else {
        endCap.push(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(lastPoint, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, lastStrokePoint.radius)), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(lastPoint, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, lastStrokePoint.radius * 0.99)), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(lastPoint, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, lastStrokePoint.radius * 0.99)), __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(lastPoint, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, lastStrokePoint.radius)));
    }
    return leftPts.concat(endCap, rightPts.reverse(), startCap);
}
;
 //# sourceMappingURL=getStrokeOutlinePoints.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokePoints.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStrokePoints",
    ()=>getStrokePoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
;
const MIN_START_PRESSURE = 0.025;
const MIN_END_PRESSURE = 0.01;
function getStrokePoints(rawInputPoints, options = {}) {
    const { streamline = 0.5, size = 16, simulatePressure = false } = options;
    if (rawInputPoints.length === 0) return [];
    const t = 0.15 + (1 - streamline) * 0.85;
    let pts = rawInputPoints.map(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From);
    let pointsRemovedFromNearEnd = 0;
    if (!simulatePressure) {
        let pt2 = pts[0];
        while(pt2){
            if (pt2.z >= MIN_START_PRESSURE) break;
            pts.shift();
            pt2 = pts[0];
        }
    }
    if (!simulatePressure) {
        let pt2 = pts[pts.length - 1];
        while(pt2){
            if (pt2.z >= MIN_END_PRESSURE) break;
            pts.pop();
            pt2 = pts[pts.length - 1];
        }
    }
    if (pts.length === 0) return [
        {
            point: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(rawInputPoints[0]),
            input: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].From(rawInputPoints[0]),
            pressure: simulatePressure ? 0.5 : 0.15,
            vector: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](1, 1),
            distance: 0,
            runningLength: 0,
            radius: 1
        }
    ];
    let pt = pts[1];
    while(pt){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(pt, pts[0]) > (size / 3) ** 2) break;
        pts[0].z = Math.max(pts[0].z, pt.z);
        pts.splice(1, 1);
        pt = pts[1];
    }
    const last = pts.pop();
    pt = pts[pts.length - 1];
    while(pt){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(pt, last) > (size / 3) ** 2) break;
        pts.pop();
        pt = pts[pts.length - 1];
        pointsRemovedFromNearEnd++;
    }
    pts.push(last);
    const isComplete = options.last || !options.simulatePressure || pts.length > 1 && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(pts[pts.length - 1], pts[pts.length - 2]) < size ** 2 || pointsRemovedFromNearEnd > 0;
    if (pts.length === 2 && options.simulatePressure) {
        const last2 = pts[1];
        pts = pts.slice(0, -1);
        for(let i = 1; i < 5; i++){
            const next = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Lrp(pts[0], last2, i / 4);
            next.z = (pts[0].z + (last2.z - pts[0].z)) * i / 4;
            pts.push(next);
        }
    }
    const strokePoints = [
        {
            point: pts[0],
            input: pts[0],
            pressure: simulatePressure ? 0.5 : pts[0].z,
            vector: new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](1, 1),
            distance: 0,
            runningLength: 0,
            radius: 1
        }
    ];
    let totalLength = 0;
    let prev = strokePoints[0];
    let point, distance;
    if (isComplete && streamline > 0) {
        pts.push(pts[pts.length - 1].clone());
    }
    for(let i = 1, n = pts.length; i < n; i++){
        point = !t || options.last && i === n - 1 ? pts[i].clone() : pts[i].clone().lrp(prev.point, 1 - t);
        if (prev.point.equals(point)) continue;
        distance = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist(point, prev.point);
        totalLength += distance;
        if (i < 4 && totalLength < size) {
            continue;
        }
        prev = {
            input: pts[i],
            // The adjusted point
            point,
            // The input pressure (or .5 if not specified)
            pressure: simulatePressure ? 0.5 : pts[i].z,
            // The vector from the current point to the previous point
            vector: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(prev.point, point).uni(),
            // The distance between the current point and the previous point
            distance,
            // The total distance so far
            runningLength: totalLength,
            // The stroke point's radius
            radius: 1
        };
        strokePoints.push(prev);
    }
    if (strokePoints[1]?.vector) {
        strokePoints[0].vector = strokePoints[1].vector.clone();
    }
    if (totalLength < 1) {
        const maxPressureAmongPoints = Math.max(0.5, ...strokePoints.map((s)=>s.pressure));
        strokePoints.forEach((s)=>s.pressure = maxPressureAmongPoints);
    }
    return strokePoints;
}
;
 //# sourceMappingURL=getStrokePoints.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/setStrokePointRadii.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setStrokePointRadii",
    ()=>setStrokePointRadii
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$easings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/easings.mjs [app-client] (ecmascript)");
;
const { min } = Math;
const RATE_OF_PRESSURE_CHANGE = 0.275;
function setStrokePointRadii(strokePoints, options) {
    const { size = 16, thinning = 0.5, simulatePressure = true, easing = (t)=>t, start = {}, end = {} } = options;
    const { easing: taperStartEase = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$easings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASINGS"].easeOutQuad } = start;
    const { easing: taperEndEase = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$easings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASINGS"].easeOutCubic } = end;
    const totalLength = strokePoints[strokePoints.length - 1].runningLength;
    let firstRadius;
    let prevPressure = strokePoints[0].pressure;
    let strokePoint;
    if (!simulatePressure && totalLength < size) {
        const max = strokePoints.reduce((max2, curr)=>Math.max(max2, curr.pressure), 0.5);
        strokePoints.forEach((sp)=>{
            sp.pressure = max;
            sp.radius = size * easing(0.5 - thinning * (0.5 - sp.pressure));
        });
        return strokePoints;
    } else {
        let p;
        for(let i = 0, n = strokePoints.length; i < n; i++){
            strokePoint = strokePoints[i];
            if (strokePoint.runningLength > size * 5) break;
            const sp = min(1, strokePoint.distance / size);
            if (simulatePressure) {
                const rp = min(1, 1 - sp);
                p = min(1, prevPressure + (rp - prevPressure) * (sp * RATE_OF_PRESSURE_CHANGE));
            } else {
                p = min(1, prevPressure + (strokePoint.pressure - prevPressure) * 0.5);
            }
            prevPressure = prevPressure + (p - prevPressure) * 0.5;
        }
        for(let i = 0; i < strokePoints.length; i++){
            strokePoint = strokePoints[i];
            if (thinning) {
                let { pressure } = strokePoint;
                const sp = min(1, strokePoint.distance / size);
                if (simulatePressure) {
                    const rp = min(1, 1 - sp);
                    pressure = min(1, prevPressure + (rp - prevPressure) * (sp * RATE_OF_PRESSURE_CHANGE));
                } else {
                    pressure = min(1, prevPressure + (pressure - prevPressure) * (sp * RATE_OF_PRESSURE_CHANGE));
                }
                strokePoint.radius = size * easing(0.5 - thinning * (0.5 - pressure));
                prevPressure = pressure;
            } else {
                strokePoint.radius = size / 2;
            }
            if (firstRadius === void 0) {
                firstRadius = strokePoint.radius;
            }
        }
    }
    const taperStart = start.taper === false ? 0 : start.taper === true ? Math.max(size, totalLength) : start.taper;
    const taperEnd = end.taper === false ? 0 : end.taper === true ? Math.max(size, totalLength) : end.taper;
    if (taperStart || taperEnd) {
        for(let i = 0; i < strokePoints.length; i++){
            strokePoint = strokePoints[i];
            const { runningLength } = strokePoint;
            const ts = runningLength < taperStart ? taperStartEase(runningLength / taperStart) : 1;
            const te = totalLength - runningLength < taperEnd ? taperEndEase((totalLength - runningLength) / taperEnd) : 1;
            strokePoint.radius = Math.max(0.01, strokePoint.radius * Math.min(ts, te));
        }
    }
    return strokePoints;
}
;
 //# sourceMappingURL=setStrokePointRadii.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStroke.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStroke",
    ()=>getStroke
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokeOutlinePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokeOutlinePoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokePoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$setStrokePointRadii$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/setStrokePointRadii.mjs [app-client] (ecmascript)");
;
;
;
function getStroke(points, options = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokeOutlinePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOutlinePoints"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$setStrokePointRadii$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStrokePointRadii"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(points, options), options), options);
}
;
 //# sourceMappingURL=getStroke.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ARROW_LABEL_FONT_SIZES",
    ()=>ARROW_LABEL_FONT_SIZES,
    "ARROW_LABEL_PADDING",
    ()=>ARROW_LABEL_PADDING,
    "FONT_FAMILIES",
    ()=>FONT_FAMILIES,
    "FONT_SIZES",
    ()=>FONT_SIZES,
    "LABEL_FONT_SIZES",
    ()=>LABEL_FONT_SIZES,
    "LABEL_PADDING",
    ()=>LABEL_PADDING,
    "LABEL_TO_ARROW_PADDING",
    ()=>LABEL_TO_ARROW_PADDING,
    "STROKE_SIZES",
    ()=>STROKE_SIZES,
    "TEXT_PROPS",
    ()=>TEXT_PROPS
]);
const TEXT_PROPS = {
    lineHeight: 1.35,
    fontWeight: "normal",
    fontVariant: "normal",
    fontStyle: "normal",
    padding: "0px"
};
const STROKE_SIZES = {
    s: 2,
    m: 3.5,
    l: 5,
    xl: 10
};
const FONT_SIZES = {
    s: 18,
    m: 24,
    l: 36,
    xl: 44
};
const LABEL_FONT_SIZES = {
    s: 18,
    m: 22,
    l: 26,
    xl: 32
};
const ARROW_LABEL_FONT_SIZES = {
    s: 18,
    m: 20,
    l: 24,
    xl: 28
};
const FONT_FAMILIES = {
    draw: "var(--tl-font-draw)",
    sans: "var(--tl-font-sans)",
    serif: "var(--tl-font-serif)",
    mono: "var(--tl-font-mono)"
};
const LABEL_TO_ARROW_PADDING = 20;
const ARROW_LABEL_PADDING = 4.25;
const LABEL_PADDING = 16;
;
 //# sourceMappingURL=default-shape-constants.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/defaultFonts.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultFontFaces",
    ()=>DefaultFontFaces,
    "allDefaultFontFaces",
    ()=>allDefaultFontFaces
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
;
const DefaultFontFaces = {
    tldraw_draw: {
        normal: {
            normal: {
                family: "tldraw_draw",
                src: {
                    url: "tldraw_draw",
                    format: "woff2"
                },
                weight: "normal"
            },
            bold: {
                family: "tldraw_draw",
                src: {
                    url: "tldraw_draw_bold",
                    format: "woff2"
                },
                weight: "bold"
            }
        },
        italic: {
            normal: {
                family: "tldraw_draw",
                src: {
                    url: "tldraw_draw_italic",
                    format: "woff2"
                },
                weight: "normal",
                style: "italic"
            },
            bold: {
                family: "tldraw_draw",
                src: {
                    url: "tldraw_draw_italic_bold",
                    format: "woff2"
                },
                weight: "bold",
                style: "italic"
            }
        }
    },
    tldraw_sans: {
        normal: {
            normal: {
                family: "tldraw_sans",
                src: {
                    url: "tldraw_sans",
                    format: "woff2"
                },
                weight: "normal",
                style: "normal"
            },
            bold: {
                family: "tldraw_sans",
                src: {
                    url: "tldraw_sans_bold",
                    format: "woff2"
                },
                weight: "bold",
                style: "normal"
            }
        },
        italic: {
            normal: {
                family: "tldraw_sans",
                src: {
                    url: "tldraw_sans_italic",
                    format: "woff2"
                },
                weight: "normal",
                style: "italic"
            },
            bold: {
                family: "tldraw_sans",
                src: {
                    url: "tldraw_sans_italic_bold",
                    format: "woff2"
                },
                weight: "bold",
                style: "italic"
            }
        }
    },
    tldraw_serif: {
        normal: {
            normal: {
                family: "tldraw_serif",
                src: {
                    url: "tldraw_serif",
                    format: "woff2"
                },
                weight: "normal",
                style: "normal"
            },
            bold: {
                family: "tldraw_serif",
                src: {
                    url: "tldraw_serif_bold",
                    format: "woff2"
                },
                weight: "bold",
                style: "normal"
            }
        },
        italic: {
            normal: {
                family: "tldraw_serif",
                src: {
                    url: "tldraw_serif_italic",
                    format: "woff2"
                },
                weight: "normal",
                style: "italic"
            },
            bold: {
                family: "tldraw_serif",
                src: {
                    url: "tldraw_serif_italic_bold",
                    format: "woff2"
                },
                weight: "bold",
                style: "italic"
            }
        }
    },
    tldraw_mono: {
        normal: {
            normal: {
                family: "tldraw_mono",
                src: {
                    url: "tldraw_mono",
                    format: "woff2"
                },
                weight: "normal",
                style: "normal"
            },
            bold: {
                family: "tldraw_mono",
                src: {
                    url: "tldraw_mono_bold",
                    format: "woff2"
                },
                weight: "bold",
                style: "normal"
            }
        },
        italic: {
            normal: {
                family: "tldraw_mono",
                src: {
                    url: "tldraw_mono_italic",
                    format: "woff2"
                },
                weight: "normal",
                style: "italic"
            },
            bold: {
                family: "tldraw_mono",
                src: {
                    url: "tldraw_mono_italic_bold",
                    format: "woff2"
                },
                weight: "bold",
                style: "italic"
            }
        }
    }
};
const allDefaultFontFaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["objectMapValues"])(DefaultFontFaces).flatMap((font)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["objectMapValues"])(font).flatMap((fontFace)=>Object.values(fontFace)));
;
 //# sourceMappingURL=defaultFonts.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/TextHelpers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INDENT",
    ()=>INDENT,
    "TextHelpers",
    ()=>TextHelpers
]);
const INDENT = "  ";
class TextHelpers {
    static fixNewLines = /\r?\n|\r/g;
    static normalizeText(text) {
        return text.replace(TextHelpers.fixNewLines, "\n");
    }
    static normalizeTextForDom(text) {
        return text.replace(TextHelpers.fixNewLines, "\n").split("\n").map((x)=>x || " ").join("\n");
    }
}
;
 //# sourceMappingURL=TextHelpers.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/legacyProps.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLegacyOffsetX",
    ()=>getLegacyOffsetX,
    "isLegacyAlign",
    ()=>isLegacyAlign
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
;
function getLegacyOffsetX(align, padding, spans, totalWidth) {
    if ((align === "start-legacy" || align === "end-legacy") && spans.length !== 0) {
        const spansBounds = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"].From(spans[0].box);
        for (const { box } of spans){
            spansBounds.union(box);
        }
        if (align === "start-legacy") {
            return (totalWidth - 2 * padding - spansBounds.width) / 2;
        } else if (align === "end-legacy") {
            return -(totalWidth - 2 * padding - spansBounds.width) / 2;
        }
    }
}
function isLegacyAlign(align) {
    return align === "start-legacy" || align === "middle-legacy" || align === "end-legacy";
}
;
 //# sourceMappingURL=legacyProps.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEditablePlainText.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEditablePlainText",
    ()=>useEditablePlainText,
    "useEditableTextCommon",
    ()=>useEditableTextCommon,
    "useIsReadyForEditing",
    ()=>useIsReadyForEditing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$getPointerInfo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/getPointerInfo.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$environment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/globals/environment.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$TextHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/TextHelpers.mjs [app-client] (ecmascript)");
;
;
;
function useEditablePlainText(shapeId, type, text) {
    const commonUseEditableTextHandlers = useEditableTextCommon(shapeId);
    const isEditing = commonUseEditableTextHandlers.isEditing;
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const rInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isEmpty = (text || "").trim().length === 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEditablePlainText.useEffect": ()=>{
            function selectAllIfEditing(event) {
                if (event.shapeId === shapeId) {
                    rInput.current?.select?.();
                }
            }
            editor.on("select-all-text", selectAllIfEditing);
            return ({
                "useEditablePlainText.useEffect": ()=>{
                    editor.off("select-all-text", selectAllIfEditing);
                }
            })["useEditablePlainText.useEffect"];
        }
    }["useEditablePlainText.useEffect"], [
        editor,
        shapeId,
        isEditing
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEditablePlainText.useEffect": ()=>{
            if (!isEditing) return;
            if (document.activeElement !== rInput.current) {
                rInput.current?.focus();
            }
            if (editor.getInstanceState().isCoarsePointer) {
                rInput.current?.select();
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$environment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tlenv"].isSafari) {
                rInput.current?.blur();
                rInput.current?.focus();
            }
        }
    }["useEditablePlainText.useEffect"], [
        editor,
        isEditing
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditablePlainText.useCallback[handleKeyDown]": (e)=>{
            if (editor.getEditingShapeId() !== shapeId) return;
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
    }["useEditablePlainText.useCallback[handleKeyDown]"], [
        editor,
        shapeId
    ]);
    const handleChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditablePlainText.useCallback[handleChange]": ({ plaintext })=>{
            if (editor.getEditingShapeId() !== shapeId) return;
            const normalizedPlaintext = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$TextHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextHelpers"].normalizeText(plaintext || "");
            editor.updateShape({
                id: shapeId,
                type,
                props: {
                    text: normalizedPlaintext
                }
            });
        }
    }["useEditablePlainText.useCallback[handleChange]"], [
        editor,
        shapeId,
        type
    ]);
    return {
        rInput,
        handleKeyDown,
        handleChange,
        isEmpty,
        ...commonUseEditableTextHandlers
    };
}
function useIsReadyForEditing(editor, shapeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("isReadyForEditing", {
        "useIsReadyForEditing.useValue": ()=>{
            const editingShapeId = editor.getEditingShapeId();
            return editingShapeId !== null && (editingShapeId === shapeId || editor.getHoveredShapeId() === shapeId);
        }
    }["useIsReadyForEditing.useValue"], [
        editor,
        shapeId
    ]);
}
function useEditableTextCommon(shapeId) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const isEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("isEditing", {
        "useEditableTextCommon.useValue[isEditing]": ()=>editor.getEditingShapeId() === shapeId
    }["useEditableTextCommon.useValue[isEditing]"], [
        editor
    ]);
    const isReadyForEditing = useIsReadyForEditing(editor, shapeId);
    const handleInputPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditableTextCommon.useCallback[handleInputPointerDown]": (e)=>{
            editor.dispatch({
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$getPointerInfo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPointerInfo"])(editor, e),
                type: "pointer",
                name: "pointer_down",
                target: "shape",
                shape: editor.getShape(shapeId)
            });
            e.stopPropagation();
        }
    }["useEditableTextCommon.useCallback[handleInputPointerDown]"], [
        editor,
        shapeId
    ]);
    const handlePaste = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditableTextCommon.useCallback[handlePaste]": (e)=>{
            if (editor.getEditingShapeId() !== shapeId) return;
            if (e.clipboardData) {
                const html = e.clipboardData.getData("text/html");
                if (html) {
                    if (html.includes("<div data-tldraw")) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preventDefault"])(e);
                    }
                }
            }
        }
    }["useEditableTextCommon.useCallback[handlePaste]"], [
        editor,
        shapeId
    ]);
    return {
        handleFocus: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"],
        handleBlur: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"],
        handleInputPointerDown,
        handleDoubleClick: editor.markEventAsHandled,
        handlePaste,
        isEditing,
        isReadyForEditing
    };
}
;
 //# sourceMappingURL=useEditablePlainText.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEditableRichText.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEditableRichText",
    ()=>useEditableRichText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$keyboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/keyboard.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/richText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditablePlainText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEditablePlainText.mjs [app-client] (ecmascript)");
;
;
;
;
function useEditableRichText(shapeId, type, richText) {
    const commonUseEditableTextHandlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditablePlainText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditableTextCommon"])(shapeId);
    const isEditing = commonUseEditableTextHandlers.isEditing;
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const rInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isEmpty = richText && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmptyRichText"])(richText);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEditableRichText.useEffect": ()=>{
            if (!isEditing) return;
            const contentEditable = rInput.current?.querySelector("[contenteditable]");
            if (contentEditable && document.activeElement !== rInput.current) {
                ;
                contentEditable.focus();
            }
        }
    }["useEditableRichText.useEffect"], [
        editor,
        isEditing
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditableRichText.useCallback[handleKeyDown]": (e)=>{
            if (editor.getEditingShapeId() !== shapeId) return;
            if (e.key === "Enter" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$keyboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAccelKey"])(e)) editor.complete();
        }
    }["useEditableRichText.useCallback[handleKeyDown]"], [
        editor,
        shapeId
    ]);
    const handleChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditableRichText.useCallback[handleChange]": ({ richText: richText2 })=>{
            if (editor.getEditingShapeId() !== shapeId) return;
            editor.updateShape({
                id: shapeId,
                type,
                props: {
                    richText: richText2
                }
            });
        }
    }["useEditableRichText.useCallback[handleChange]"], [
        editor,
        shapeId,
        type
    ]);
    return {
        rInput,
        handleKeyDown,
        handleChange,
        isEmpty,
        ...commonUseEditableTextHandlers
    };
}
;
 //# sourceMappingURL=useEditableRichText.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/RichTextLabel.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RichTextLabel",
    ()=>RichTextLabel,
    "RichTextSVG",
    ()=>RichTextSVG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$window$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/window-open.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/utils/text/richText.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$text$2f$RichTextArea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/RichTextArea.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/default-shape-constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$legacyProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/legacyProps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditableRichText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEditableRichText.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const RichTextLabel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(function RichTextLabel2({ shapeId, type, richText, labelColor, font, fontSize, lineHeight, align, verticalAlign, wrap, isSelected, padding = 0, onKeyDown: handleKeyDownCustom, classNamePrefix, style, textWidth, textHeight, hasCustomTabBehavior, showTextOutline = true }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const isDragging = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(false);
    const { rInput, isEmpty, isEditing, isReadyForEditing, ...editableTextRest } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditableRichText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditableRichText"])(shapeId, type, richText);
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RichTextLabel.RichTextLabel2.useMemo[html]": ()=>{
            if (richText) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderHtmlFromRichText"])(editor, richText);
            }
        }
    }["RichTextLabel.RichTextLabel2.useMemo[html]"], [
        editor,
        richText
    ]);
    const selectToolActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("isSelectToolActive", {
        "RichTextLabel.RichTextLabel2.useValue[selectToolActive]": ()=>editor.getCurrentToolId() === "select"
    }["RichTextLabel.RichTextLabel2.useValue[selectToolActive]"], [
        editor
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReactor"])("isDragging", {
        "RichTextLabel.RichTextLabel2.useReactor": ()=>{
            editor.getInstanceState();
            isDragging.current = editor.inputs.getIsDragging();
        }
    }["RichTextLabel.RichTextLabel2.useReactor"], [
        editor
    ]);
    const legacyAlign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$legacyProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLegacyAlign"])(align);
    const handlePointerDown = (e)=>{
        if (e.target instanceof HTMLElement && (e.target.tagName === "A" || e.target.closest("a"))) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preventDefault"])(e);
            if (!selectToolActive) return;
            const link = e.target.closest("a")?.getAttribute("href") ?? "";
            const handlePointerUp = (e2)=>{
                if (e2.name !== "pointer_up" || !link) return;
                if (!isDragging.current) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$window$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openWindow"])(link, "_blank", false);
                }
                editor.off("event", handlePointerUp);
            };
            editor.on("event", handlePointerUp);
        }
    };
    if (!isEditing && isEmpty) return null;
    const cssPrefix = classNamePrefix || "tl-text";
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(`${cssPrefix}-label tl-text-wrapper tl-rich-text-wrapper`, showTextOutline ? "tl-text__outline" : "tl-text__no-outline"),
        "aria-hidden": !isEditing,
        "data-font": font,
        "data-align": align,
        "data-hastext": !isEmpty,
        "data-isediting": isEditing,
        "data-textwrap": !!wrap,
        "data-isselected": isSelected,
        style: {
            justifyContent: align === "middle" || legacyAlign ? "center" : align,
            alignItems: verticalAlign === "middle" ? "center" : verticalAlign,
            padding,
            ...style
        },
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: `${cssPrefix}-label__inner tl-text-content__wrapper`,
            style: {
                fontSize,
                lineHeight: lineHeight.toString(),
                minHeight: Math.floor(fontSize * lineHeight) + "px",
                minWidth: Math.ceil(textWidth || 0),
                color: labelColor,
                width: textWidth ? Math.ceil(textWidth) : void 0,
                height: textHeight ? Math.ceil(textHeight) : void 0
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: `${cssPrefix} tl-text tl-text-content`,
                    dir: "auto",
                    children: richText && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: "tl-rich-text",
                        "data-is-select-tool-active": selectToolActive,
                        dangerouslySetInnerHTML: {
                            __html: html || ""
                        },
                        onPointerDown: handlePointerDown,
                        "data-is-ready-for-editing": isReadyForEditing
                    })
                }),
                (isReadyForEditing || isSelected) && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$text$2f$RichTextArea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextArea"], {
                    ref: rInput,
                    richText,
                    isEditing,
                    shapeId,
                    ...editableTextRest,
                    hasCustomTabBehavior,
                    handleKeyDown: handleKeyDownCustom ?? editableTextRest.handleKeyDown
                })
            ]
        })
    });
});
function RichTextSVG({ bounds, richText, fontSize, font, align, verticalAlign, wrap, labelColor, padding, showTextOutline = true }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$utils$2f$text$2f$richText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderHtmlFromRichText"])(editor, richText);
    const textAlign = align === "middle" ? "center" : align === "start" ? "start" : "end";
    const justifyContent = align === "middle" ? "center" : align === "start" ? "flex-start" : "flex-end";
    const alignItems = verticalAlign === "middle" ? "center" : verticalAlign === "start" ? "flex-start" : "flex-end";
    const wrapperStyle = {
        display: "flex",
        fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultFontFamilies"][font],
        height: `100%`,
        justifyContent,
        alignItems,
        padding: `${padding}px`
    };
    const style = {
        fontSize: `${fontSize}px`,
        wrap: wrap ? "wrap" : "nowrap",
        color: labelColor,
        lineHeight: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$default$2d$shape$2d$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEXT_PROPS"].lineHeight,
        textAlign,
        width: "100%",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
        textShadow: showTextOutline ? "var(--tl-text-outline)" : "none",
        tabSize: "var(--tl-tab-size, 2)"
    };
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("foreignObject", {
        x: bounds.minX,
        y: bounds.minY,
        width: bounds.w,
        height: bounds.h,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tl-export-embed-styles tl-rich-text tl-rich-text-svg", showTextOutline ? "tl-text__outline" : "tl-text__no-outline"),
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            style: wrapperStyle,
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                dangerouslySetInnerHTML: {
                    __html: html
                },
                style
            })
        })
    });
}
;
 //# sourceMappingURL=RichTextLabel.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/defaultStyleDefs.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFillDefForCanvas",
    ()=>getFillDefForCanvas,
    "getFillDefForExport",
    ()=>getFillDefForExport,
    "useGetHashPatternZoomName",
    ()=>useGetHashPatternZoomName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/debug-flags.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useSafeId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$environment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/globals/environment.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useDefaultColorTheme.mjs [app-client] (ecmascript)");
;
;
;
;
function getFillDefForExport(fill) {
    return {
        key: `${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultFontStyle"].id}:${fill}`,
        async getElement () {
            if (fill !== "pattern") return null;
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(HashPatternForExport, {});
        }
    };
}
function HashPatternForExport() {
    const getHashPatternZoomName = useGetHashPatternZoomName();
    const maskId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUniqueSafeId"])();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useDefaultColorTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDefaultColorTheme"])();
    const t = 8 / 12;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("mask", {
                id: maskId,
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                        x: "0",
                        y: "0",
                        width: "8",
                        height: "8",
                        fill: "white"
                    }),
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                        strokeLinecap: "round",
                        stroke: "black",
                        children: [
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                                x1: t * 1,
                                y1: t * 3,
                                x2: t * 3,
                                y2: t * 1
                            }),
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                                x1: t * 5,
                                y1: t * 7,
                                x2: t * 7,
                                y2: t * 5
                            }),
                            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                                x1: t * 9,
                                y1: t * 11,
                                x2: t * 11,
                                y2: t * 9
                            })
                        ]
                    })
                ]
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("pattern", {
                id: getHashPatternZoomName(1, theme.id),
                width: "8",
                height: "8",
                patternUnits: "userSpaceOnUse",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                    x: "0",
                    y: "0",
                    width: "8",
                    height: "8",
                    fill: theme.solid,
                    mask: `url(#${maskId})`
                })
            })
        ]
    });
}
function getFillDefForCanvas() {
    return {
        key: `${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultFontStyle"].id}:pattern`,
        component: PatternFillDefForCanvas
    };
}
const TILE_PATTERN_SIZE = 8;
const generateImage = (dpr, currentZoom, darkMode)=>{
    return new Promise((resolve, reject)=>{
        const size = TILE_PATTERN_SIZE * currentZoom * dpr;
        const canvasEl = document.createElement("canvas");
        canvasEl.width = size;
        canvasEl.height = size;
        const ctx = canvasEl.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = darkMode ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultColorThemePalette"].darkMode.solid : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultColorThemePalette"].lightMode.solid;
        ctx.fillRect(0, 0, size, size);
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineCap = "round";
        ctx.lineWidth = 1.25 * currentZoom * dpr;
        const t = 8 / 12;
        const s = (v)=>v * currentZoom * dpr;
        ctx.beginPath();
        ctx.moveTo(s(t * 1), s(t * 3));
        ctx.lineTo(s(t * 3), s(t * 1));
        ctx.moveTo(s(t * 5), s(t * 7));
        ctx.lineTo(s(t * 7), s(t * 5));
        ctx.moveTo(s(t * 9), s(t * 11));
        ctx.lineTo(s(t * 11), s(t * 9));
        ctx.stroke();
        canvasEl.toBlob((blob)=>{
            if (!blob || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debugFlags"].throwToBlob.get()) {
                reject();
            } else {
                resolve(blob);
            }
        });
    });
};
const canvasBlob = (size, fn)=>{
    const canvas = document.createElement("canvas");
    canvas.width = size[0];
    canvas.height = size[1];
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    fn(ctx);
    return canvas.toDataURL();
};
let defaultPixels = null;
function getDefaultPixels() {
    if (!defaultPixels) {
        defaultPixels = {
            white: canvasBlob([
                1,
                1
            ], (ctx)=>{
                ctx.fillStyle = "#f8f9fa";
                ctx.fillRect(0, 0, 1, 1);
            }),
            black: canvasBlob([
                1,
                1
            ], (ctx)=>{
                ctx.fillStyle = "#212529";
                ctx.fillRect(0, 0, 1, 1);
            })
        };
    }
    return defaultPixels;
}
function getPatternLodForZoomLevel(zoom) {
    return Math.ceil(Math.log2(Math.max(1, zoom)));
}
function useGetHashPatternZoomName() {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSharedSafeId"])("hash_pattern");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGetHashPatternZoomName.useCallback": (zoom, theme)=>{
            const lod = getPatternLodForZoomLevel(zoom);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useSafeId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suffixSafeId"])(id, `${theme}_${lod}`);
        }
    }["useGetHashPatternZoomName.useCallback"], [
        id
    ]);
}
function getPatternLodsToGenerate(maxZoom) {
    const levels = [];
    const minLod = 0;
    const maxLod = getPatternLodForZoomLevel(maxZoom);
    for(let i = minLod; i <= maxLod; i++){
        levels.push(Math.pow(2, i));
    }
    return levels;
}
function getDefaultPatterns(maxZoom) {
    const defaultPixels2 = getDefaultPixels();
    return getPatternLodsToGenerate(maxZoom).flatMap((zoom)=>[
            {
                zoom,
                url: defaultPixels2.white,
                theme: "light"
            },
            {
                zoom,
                url: defaultPixels2.black,
                theme: "dark"
            }
        ]);
}
function usePattern() {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const dpr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("devicePixelRatio", {
        "usePattern.useValue[dpr]": ()=>editor.getInstanceState().devicePixelRatio
    }["usePattern.useValue[dpr]"], [
        editor
    ]);
    const maxZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("maxZoom", {
        "usePattern.useValue[maxZoom]": ()=>Math.ceil((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(editor.getCameraOptions().zoomSteps))
    }["usePattern.useValue[maxZoom]"], [
        editor
    ]);
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [backgroundUrls, setBackgroundUrls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "usePattern.useState": ()=>getDefaultPatterns(maxZoom)
    }["usePattern.useState"]);
    const getHashPatternZoomName = useGetHashPatternZoomName();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePattern.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const promise = Promise.all(getPatternLodsToGenerate(maxZoom).flatMap({
                "usePattern.useEffect.promise": (zoom)=>[
                        generateImage(dpr, zoom, false).then({
                            "usePattern.useEffect.promise": (blob)=>({
                                    zoom,
                                    theme: "light",
                                    url: URL.createObjectURL(blob)
                                })
                        }["usePattern.useEffect.promise"]),
                        generateImage(dpr, zoom, true).then({
                            "usePattern.useEffect.promise": (blob)=>({
                                    zoom,
                                    theme: "dark",
                                    url: URL.createObjectURL(blob)
                                })
                        }["usePattern.useEffect.promise"])
                    ]
            }["usePattern.useEffect.promise"]));
            let isCancelled = false;
            promise.then({
                "usePattern.useEffect": (urls)=>{
                    if (isCancelled) return;
                    setBackgroundUrls(urls);
                    setIsReady(true);
                }
            }["usePattern.useEffect"]);
            return ({
                "usePattern.useEffect": ()=>{
                    isCancelled = true;
                    setIsReady(false);
                    promise.then({
                        "usePattern.useEffect": (patterns)=>{
                            for (const { url } of patterns){
                                URL.revokeObjectURL(url);
                            }
                        }
                    }["usePattern.useEffect"]);
                }
            })["usePattern.useEffect"];
        }
    }["usePattern.useEffect"], [
        dpr,
        maxZoom
    ]);
    const defs = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: backgroundUrls.map((item)=>{
            const id = getHashPatternZoomName(item.zoom, item.theme);
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("pattern", {
                id,
                width: TILE_PATTERN_SIZE,
                height: TILE_PATTERN_SIZE,
                patternUnits: "userSpaceOnUse",
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("image", {
                    href: item.url,
                    width: TILE_PATTERN_SIZE,
                    height: TILE_PATTERN_SIZE
                })
            }, id);
        })
    });
    return {
        defs,
        isReady
    };
}
function PatternFillDefForCanvas() {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { defs, isReady } = usePattern();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatternFillDefForCanvas.useEffect": ()=>{
            if (isReady && __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$globals$2f$environment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tlenv"].isSafari) {
                const htmlLayer = findHtmlLayerParent(containerRef.current);
                if (htmlLayer) {
                    editor.timers.requestAnimationFrame({
                        "PatternFillDefForCanvas.useEffect": ()=>{
                            htmlLayer.style.display = "none";
                            editor.timers.requestAnimationFrame({
                                "PatternFillDefForCanvas.useEffect": ()=>{
                                    htmlLayer.style.display = "";
                                }
                            }["PatternFillDefForCanvas.useEffect"]);
                        }
                    }["PatternFillDefForCanvas.useEffect"]);
                }
            }
        }
    }["PatternFillDefForCanvas.useEffect"], [
        editor,
        isReady
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("g", {
        ref: containerRef,
        "data-testid": isReady ? "ready-pattern-fill-defs" : void 0,
        children: defs
    });
}
function findHtmlLayerParent(element) {
    if (element.classList.contains("tl-html-layer")) return element;
    if (element.parentElement) return findHtmlLayerParent(element.parentElement);
    return null;
}
;
 //# sourceMappingURL=defaultStyleDefs.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/ShapeFill.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatternFill",
    ()=>PatternFill,
    "ShapeFill",
    ()=>ShapeFill
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/types/SvgExportContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/defaultStyleDefs.mjs [app-client] (ecmascript)");
;
;
;
;
const ShapeFill = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(function ShapeFill2({ theme, d, color, fill, scale }) {
    switch(fill){
        case "none":
            {
                return null;
            }
        case "solid":
            {
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "semi"),
                    d
                });
            }
        case "semi":
            {
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: theme.solid,
                    d
                });
            }
        case "fill":
            {
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "fill"),
                    d
                });
            }
        case "pattern":
            {
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(PatternFill, {
                    theme,
                    color,
                    fill,
                    d,
                    scale
                });
            }
        case "lined-fill":
            {
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                    fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "linedFill"),
                    d
                });
            }
    }
});
function PatternFill({ d, color, theme }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const svgExport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSvgExportContext"])();
    const zoomLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("zoomLevel", {
        "PatternFill.useValue[zoomLevel]": ()=>editor.getEfficientZoomLevel()
    }["PatternFill.useValue[zoomLevel]"], [
        editor
    ]);
    const getHashPatternZoomName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$defaultStyleDefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetHashPatternZoomName"])();
    const teenyTiny = zoomLevel <= 0.18;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "pattern"),
                d
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                fill: svgExport ? `url(#${getHashPatternZoomName(1, theme.id)})` : teenyTiny ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getColorValue"])(theme, color, "semi") : `url(#${getHashPatternZoomName(zoomLevel, theme.id)})`,
                d
            })
        ]
    });
}
;
 //# sourceMappingURL=ShapeFill.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEfficientZoomThreshold.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEfficientZoomThreshold",
    ()=>useEfficientZoomThreshold
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
;
function useEfficientZoomThreshold(threshold = 0.25) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])("efficient zoom threshold", {
        "useEfficientZoomThreshold.useValue": ()=>editor.getEfficientZoomLevel() < threshold
    }["useEfficientZoomThreshold.useValue"], [
        editor,
        threshold
    ]);
}
;
 //# sourceMappingURL=useEfficientZoomThreshold.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/HyperlinkButton.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HyperlinkButton",
    ()=>HyperlinkButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEfficientZoomThreshold.mjs [app-client] (ecmascript)");
;
;
;
;
;
const LINK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='none'%3E%3Cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 5H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6M19 5h6m0 0v6m0-6L13 17'/%3E%3C/svg%3E";
function HyperlinkButton({ url }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const hideButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEfficientZoomThreshold$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEfficientZoomThreshold"])();
    const markAsHandledOnShiftKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HyperlinkButton.useCallback[markAsHandledOnShiftKey]": (e)=>{
            if (!editor.inputs.getShiftKey()) editor.markEventAsHandled(e);
        }
    }["HyperlinkButton.useCallback[markAsHandledOnShiftKey]"], [
        editor
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("tl-hyperlink-button", {
            "tl-hyperlink-button__hidden": hideButton
        }),
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        onPointerDown: markAsHandledOnShiftKey,
        onPointerUp: markAsHandledOnShiftKey,
        title: url,
        draggable: false,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: "tl-hyperlink__icon",
            style: {
                mask: `url("${LINK_ICON}") center 100% / 100% no-repeat`,
                WebkitMask: `url("${LINK_ICON}") center 100% / 100% no-repeat`
            }
        })
    });
}
;
 //# sourceMappingURL=HyperlinkButton.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/icons-editor.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LINK_ICON",
    ()=>LINK_ICON
]);
const LINK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='none'%3E%3Cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 5H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6M19 5h6m0 0v6m0-6L13 17'/%3E%3C/svg%3E";
;
 //# sourceMappingURL=icons-editor.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/rotated-box-shadow.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRotatedBoxShadow",
    ()=>getRotatedBoxShadow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
;
const ROTATING_BOX_SHADOWS = [
    {
        offsetX: 0,
        offsetY: 2,
        blur: 4,
        spread: 0,
        color: "#00000029"
    },
    {
        offsetX: 0,
        offsetY: 3,
        blur: 6,
        spread: 0,
        color: "#0000001f"
    }
];
function getRotatedBoxShadow(rotation) {
    const cssStrings = ROTATING_BOX_SHADOWS.map((shadow)=>{
        const { offsetX, offsetY, blur, spread, color } = shadow;
        const vec = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"](offsetX, offsetY);
        const { x, y } = vec.rot(-rotation);
        return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
    });
    return cssStrings.join(", ");
}
;
 //# sourceMappingURL=rotated-box-shadow.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/svg.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSvgPathFromStrokePoints",
    ()=>getSvgPathFromStrokePoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
;
function getSvgPathFromStrokePoints(points, closed = false) {
    const len = points.length;
    if (len < 2) {
        return "";
    }
    let a = points[0].point;
    let b = points[1].point;
    if (len === 2) {
        return `M${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(a)}L${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(b)}`;
    }
    let result = "";
    for(let i = 2, max = len - 1; i < max; i++){
        a = points[i].point;
        b = points[i + 1].point;
        result += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(a, b);
    }
    if (closed) {
        return `M${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[0].point, points[1].point)}Q${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(points[1].point)}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[1].point, points[2].point)}T${result}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[len - 1].point, points[0].point)}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[0].point, points[1].point)}Z`;
    } else {
        return `M${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(points[0].point)}Q${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(points[1].point)}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(points[1].point, points[2].point)}${points.length > 3 ? "T" : ""}${result}L${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(points[len - 1].point)}`;
    }
}
;
 //# sourceMappingURL=svg.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/svgInk.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "svgInk",
    ()=>svgInk
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Vec.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokeOutlinePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokeOutlinePoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/getStrokePoints.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$setStrokePointRadii$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/freehand/setStrokePointRadii.mjs [app-client] (ecmascript)");
;
;
;
;
function svgInk(rawInputPoints, options = {}) {
    const { start = {}, end = {} } = options;
    const { cap: capStart = true } = start;
    const { cap: capEnd = true } = end;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(!start.taper && !end.taper, "cap taper not supported here");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(!start.easing && !end.easing, "cap easing not supported here");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(capStart && capEnd, "cap must be true");
    const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokePoints"])(rawInputPoints, options);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$setStrokePointRadii$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStrokePointRadii"])(points, options);
    const partitions = partitionAtElbows(points);
    let svg = "";
    for (const partition of partitions){
        svg += renderPartition(partition, options);
    }
    return svg;
}
function partitionAtElbows(points) {
    if (points.length <= 2) return [
        points
    ];
    const result = [];
    let currentPartition = [
        points[0]
    ];
    let prevV = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(points[1].point, points[0].point).uni();
    let nextV;
    let dpr;
    let prevPoint, thisPoint, nextPoint;
    for(let i = 1, n = points.length; i < n - 1; i++){
        prevPoint = points[i - 1];
        thisPoint = points[i];
        nextPoint = points[i + 1];
        nextV = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(nextPoint.point, thisPoint.point).uni();
        dpr = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dpr(prevV, nextV);
        prevV = nextV;
        if (dpr < -0.8) {
            const elbowPoint = {
                ...thisPoint,
                point: thisPoint.input
            };
            currentPartition.push(elbowPoint);
            result.push(cleanUpPartition(currentPartition));
            currentPartition = [
                elbowPoint
            ];
            continue;
        }
        currentPartition.push(thisPoint);
        if (dpr > 0.7) {
            continue;
        }
        if ((__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(prevPoint.point, thisPoint.point) + __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(thisPoint.point, nextPoint.point)) / ((prevPoint.radius + thisPoint.radius + nextPoint.radius) / 3) ** 2 < 1.5) {
            currentPartition.push(thisPoint);
            result.push(cleanUpPartition(currentPartition));
            currentPartition = [
                thisPoint
            ];
            continue;
        }
    }
    currentPartition.push(points[points.length - 1]);
    result.push(cleanUpPartition(currentPartition));
    return result;
}
function cleanUpPartition(partition) {
    const startPoint = partition[0];
    let nextPoint;
    while(partition.length > 2){
        nextPoint = partition[1];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(startPoint.point, nextPoint.point) < ((startPoint.radius + nextPoint.radius) / 2 * 0.5) ** 2) {
            partition.splice(1, 1);
        } else {
            break;
        }
    }
    const endPoint = partition[partition.length - 1];
    let prevPoint;
    while(partition.length > 2){
        prevPoint = partition[partition.length - 2];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Dist2(endPoint.point, prevPoint.point) < ((endPoint.radius + prevPoint.radius) / 2 * 0.5) ** 2) {
            partition.splice(partition.length - 2, 1);
        } else {
            break;
        }
    }
    if (partition.length > 1) {
        partition[0] = {
            ...partition[0],
            vector: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(partition[0].point, partition[1].point).uni()
        };
        partition[partition.length - 1] = {
            ...partition[partition.length - 1],
            vector: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Sub(partition[partition.length - 2].point, partition[partition.length - 1].point).uni()
        };
    }
    return partition;
}
function circlePath(cx, cy, r) {
    return "M " + cx + " " + cy + " m -" + r + ", 0 a " + r + "," + r + " 0 1,1 " + r * 2 + ",0 a " + r + "," + r + " 0 1,1 -" + r * 2 + ",0";
}
function renderPartition(strokePoints, options = {}) {
    if (strokePoints.length === 0) return "";
    if (strokePoints.length === 1) {
        return circlePath(strokePoints[0].point.x, strokePoints[0].point.y, strokePoints[0].radius);
    }
    const { left, right } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$freehand$2f$getStrokeOutlinePoints$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOutlineTracks"])(strokePoints, options);
    right.reverse();
    let svg = `M${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(left[0])}T`;
    for(let i = 1; i < left.length; i++){
        svg += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(left[i - 1], left[i]);
    }
    {
        const point = strokePoints[strokePoints.length - 1];
        const radius = point.radius;
        const direction = point.vector.clone().per().neg();
        const arcStart = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(point.point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, radius));
        const arcEnd = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(point.point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, -radius));
        svg += `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(arcStart)}A${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(radius)},${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(radius)} 0 0 1 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(arcEnd)}T`;
    }
    for(let i = 1; i < right.length; i++){
        svg += (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["average"])(right[i - 1], right[i]);
    }
    {
        const point = strokePoints[0];
        const radius = point.radius;
        const direction = point.vector.clone().per();
        const arcStart = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(point.point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, radius));
        const arcEnd = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Add(point.point, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Vec$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec"].Mul(direction, -radius));
        svg += `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(arcStart)}A${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(radius)},${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDomPrecision"])(radius)} 0 0 1 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(arcEnd)}Z`;
    }
    return svg;
}
;
 //# sourceMappingURL=svgInk.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/interpolate-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "interpolateSegments",
    ()=>interpolateSegments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/tlschema/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/utils/dist-esm/index.mjs [app-client] (ecmascript)");
;
const interpolateSegments = (startSegments, endSegments, progress)=>{
    const startPoints = [];
    const endPoints = [];
    startSegments.forEach((segment)=>startPoints.push(...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodePoints(segment.path)));
    endSegments.forEach((segment)=>endPoints.push(...__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].decodePoints(segment.path)));
    const maxLength = Math.max(startPoints.length, endPoints.length);
    const pointsToUseStart = [];
    const pointsToUseEnd = [];
    for(let i = 0; i < maxLength; i++){
        pointsToUseStart.push(startPoints[i] || startPoints[startPoints.length - 1]);
        pointsToUseEnd.push(endPoints[i] || endPoints[endPoints.length - 1]);
    }
    const interpolatedPoints = pointsToUseStart.map((point, k)=>{
        let z = 0.5;
        if (pointsToUseEnd[k].z !== void 0 && point.z !== void 0) {
            z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(point.z, pointsToUseEnd[k].z, progress);
        }
        return {
            x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(point.x, pointsToUseEnd[k].x, progress),
            y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$utils$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(point.y, pointsToUseEnd[k].y, progress),
            z
        };
    });
    return [
        {
            type: "free",
            path: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$tlschema$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b64Vecs"].encodePoints(interpolatedPoints)
        }
    ];
};
;
 //# sourceMappingURL=interpolate-props.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/createTextJsxFromSpans.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTextJsxFromSpans",
    ()=>createTextJsxFromSpans
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/primitives/Box.mjs [app-client] (ecmascript)");
;
;
function correctSpacesToNbsp(input) {
    return input.replace(/\s/g, "\xA0");
}
function createTextJsxFromSpans(editor, spans, opts) {
    const { padding = 0 } = opts;
    if (spans.length === 0) return null;
    const bounds = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$primitives$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"].From(spans[0].box);
    for (const { box } of spans){
        bounds.union(box);
    }
    const offsetX = padding + (opts.offsetX ?? 0);
    const offsetY = (opts.offsetY ?? 0) + opts.fontSize / 2 + (opts.verticalTextAlign === "start" ? padding : opts.verticalTextAlign === "end" ? opts.height - padding - bounds.height : (Math.ceil(opts.height) - bounds.height) / 2);
    let currentLineTop = null;
    const children = [];
    for (const { text, box } of spans){
        const didBreakLine = currentLineTop !== null && box.y > currentLineTop;
        if (didBreakLine) {
            children.push(/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tspan", {
                alignmentBaseline: "mathematical",
                x: offsetX,
                y: box.y + offsetY,
                children: "\n"
            }, children.length));
        }
        children.push(/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tspan", {
            alignmentBaseline: "mathematical",
            x: box.x + offsetX,
            y: box.y + offsetY,
            unicodeBidi: "plaintext",
            children: correctSpacesToNbsp(text)
        }, children.length));
        currentLineTop = box.y;
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("text", {
        fontSize: opts.fontSize,
        fontFamily: opts.fontFamily,
        fontStyle: opts.fontStyle,
        fontWeight: opts.fontWeight,
        dominantBaseline: "mathematical",
        alignmentBaseline: "mathematical",
        stroke: opts.stroke,
        strokeWidth: opts.strokeWidth,
        fill: opts.fill,
        children
    });
}
;
 //# sourceMappingURL=createTextJsxFromSpans.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useColorSpace.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useColorSpace",
    ()=>useColorSpace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/utils/debug-flags.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state-react/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useColorSpace() {
    const [supportsP3, setSupportsP3] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useColorSpace.useEffect": ()=>{
            const supportsSyntax = CSS.supports("color", "color(display-p3 1 1 1)");
            const query = matchMedia("(color-gamut: p3)");
            setSupportsP3(supportsSyntax && query.matches);
            const onChange = {
                "useColorSpace.useEffect.onChange": ()=>setSupportsP3(supportsSyntax && query.matches)
            }["useColorSpace.useEffect.onChange"];
            query.addEventListener("change", onChange);
            return ({
                "useColorSpace.useEffect": ()=>query.removeEventListener("change", onChange)
            })["useColorSpace.useEffect"];
        }
    }["useColorSpace.useEffect"], []);
    const forceSrgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2d$react$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValue"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$utils$2f$debug$2d$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debugFlags"].forceSrgb);
    return forceSrgb || !supportsP3 ? "srgb" : "p3";
}
;
 //# sourceMappingURL=useColorSpace.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/BrokenAssetIcon.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrokenAssetIcon",
    ()=>BrokenAssetIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
function BrokenAssetIcon() {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 30 30",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M3,11 L3,3 11,3",
                strokeWidth: "2"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M19,27 L27,27 L27,19",
                strokeWidth: "2"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M27,3 L3,27",
                strokeWidth: "2"
            })
        ]
    });
}
;
 //# sourceMappingURL=BrokenAssetIcon.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useImageOrVideoAsset.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useImageOrVideoAsset",
    ()=>useImageOrVideoAsset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/state/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/editor/types/SvgExportContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@tldraw/editor/dist-esm/lib/hooks/useEditor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useImageOrVideoAsset({ shapeId, assetId, width }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$hooks$2f$useEditor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const exportInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSvgExportContext"])();
    const exportIsReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$lib$2f$editor$2f$types$2f$SvgExportContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDelaySvgExport"])();
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useImageOrVideoAsset.useState": ()=>({
                asset: assetId ? editor.getAsset(assetId) ?? null : null,
                url: null
            })
    }["useImageOrVideoAsset.useState"]);
    const didAlreadyResolve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const previousAssetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shouldRunImmediately = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const previousUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useImageOrVideoAsset.useEffect": ()=>{
            const assetIdChanged = previousAssetId.current !== assetId;
            previousAssetId.current = assetId;
            if (assetIdChanged) {
                shouldRunImmediately.current = true;
            }
            if (!assetId) return;
            let isCancelled = false;
            let cancelDebounceFn;
            const cleanupEffectScheduler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$tldraw$2f$state$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["react"])("update state", {
                "useImageOrVideoAsset.useEffect.cleanupEffectScheduler": ()=>{
                    if (!exportInfo && shapeId && editor.getCulledShapes().has(shapeId)) return;
                    const asset = editor.getAsset(assetId);
                    if (!asset) {
                        setResult({
                            "useImageOrVideoAsset.useEffect.cleanupEffectScheduler": (prev)=>({
                                    ...prev,
                                    asset: null,
                                    url: null
                                })
                        }["useImageOrVideoAsset.useEffect.cleanupEffectScheduler"]);
                        return;
                    }
                    if (!asset.props.src) {
                        const preview = editor.getTemporaryAssetPreview(asset.id);
                        if (preview) {
                            if (previousUrl.current !== preview) {
                                previousUrl.current = preview;
                                setResult({
                                    "useImageOrVideoAsset.useEffect.cleanupEffectScheduler": (prev)=>({
                                            ...prev,
                                            isPlaceholder: true,
                                            url: preview
                                        })
                                }["useImageOrVideoAsset.useEffect.cleanupEffectScheduler"]);
                                exportIsReady();
                            }
                            return;
                        }
                    }
                    const screenScale = exportInfo ? exportInfo.scale * (width / asset.props.w) : editor.getEfficientZoomLevel() * (width / asset.props.w);
                    function resolve(asset2, url) {
                        if (isCancelled) return;
                        if (previousUrl.current === url) return;
                        didAlreadyResolve.current = true;
                        previousUrl.current = url;
                        setResult({
                            asset: asset2,
                            url
                        });
                        exportIsReady();
                    }
                    if (didAlreadyResolve.current && !shouldRunImmediately.current) {
                        let tick = 0;
                        const resolveAssetAfterAWhile = {
                            "useImageOrVideoAsset.useEffect.cleanupEffectScheduler.resolveAssetAfterAWhile": ()=>{
                                tick++;
                                if (tick > 500 / 16) {
                                    resolveAssetUrl(editor, assetId, screenScale, exportInfo, {
                                        "useImageOrVideoAsset.useEffect.cleanupEffectScheduler.resolveAssetAfterAWhile": (url)=>resolve(asset, url)
                                    }["useImageOrVideoAsset.useEffect.cleanupEffectScheduler.resolveAssetAfterAWhile"]);
                                    cancelDebounceFn?.();
                                }
                            }
                        }["useImageOrVideoAsset.useEffect.cleanupEffectScheduler.resolveAssetAfterAWhile"];
                        cancelDebounceFn?.();
                        editor.on("tick", resolveAssetAfterAWhile);
                        cancelDebounceFn = ({
                            "useImageOrVideoAsset.useEffect.cleanupEffectScheduler": ()=>editor.off("tick", resolveAssetAfterAWhile)
                        })["useImageOrVideoAsset.useEffect.cleanupEffectScheduler"];
                    } else {
                        cancelDebounceFn?.();
                        resolveAssetUrl(editor, assetId, screenScale, exportInfo, {
                            "useImageOrVideoAsset.useEffect.cleanupEffectScheduler": (url)=>resolve(asset, url)
                        }["useImageOrVideoAsset.useEffect.cleanupEffectScheduler"]);
                        shouldRunImmediately.current = false;
                    }
                }
            }["useImageOrVideoAsset.useEffect.cleanupEffectScheduler"]);
            return ({
                "useImageOrVideoAsset.useEffect": ()=>{
                    cleanupEffectScheduler();
                    cancelDebounceFn?.();
                    isCancelled = true;
                }
            })["useImageOrVideoAsset.useEffect"];
        }
    }["useImageOrVideoAsset.useEffect"], [
        editor,
        assetId,
        exportInfo,
        exportIsReady,
        shapeId,
        width
    ]);
    return result;
}
function resolveAssetUrl(editor, assetId, screenScale, exportInfo, callback) {
    editor.resolveAssetUrl(assetId, {
        screenScale,
        shouldResolveToOriginal: exportInfo ? exportInfo.pixelRatio === null : false,
        dpr: exportInfo?.pixelRatio ?? void 0
    }).then((url)=>{
        callback(url);
    });
}
;
 //# sourceMappingURL=useImageOrVideoAsset.mjs.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/PlainTextLabel.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlainTextLabel",
    ()=>PlainTextLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/classnames/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$text$2f$PlainTextArea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/text/PlainTextArea.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$TextHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/TextHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$legacyProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/legacyProps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditablePlainText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/tldraw/dist-esm/lib/shapes/shared/useEditablePlainText.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const PlainTextLabel = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(function PlainTextLabel2({ shapeId, type, text: plaintext, labelColor, font, fontSize, lineHeight, align, verticalAlign, wrap, isSelected, padding = 0, onKeyDown: handleKeyDownCustom, classNamePrefix, style, textWidth, textHeight, showTextOutline = true }) {
    const { rInput, isEmpty, isEditing, isReadyForEditing, ...editableTextRest } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$useEditablePlainText$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditablePlainText"])(shapeId, type, plaintext);
    const finalPlainText = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$TextHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextHelpers"].normalizeTextForDom(plaintext || "");
    const hasText = finalPlainText.length > 0;
    const legacyAlign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$shared$2f$legacyProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLegacyAlign"])(align);
    if (!isEditing && !hasText) {
        return null;
    }
    const cssPrefix = classNamePrefix || "tl-text";
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: `${cssPrefix}-label tl-text-wrapper tl-plain-text-wrapper`,
        "aria-hidden": !isEditing,
        "data-font": font,
        "data-align": align,
        "data-hastext": !isEmpty,
        "data-isediting": isEditing,
        "data-is-ready-for-editing": isReadyForEditing,
        "data-textwrap": !!wrap,
        "data-isselected": isSelected,
        style: {
            justifyContent: align === "middle" || legacyAlign ? "center" : align,
            alignItems: verticalAlign === "middle" ? "center" : verticalAlign,
            padding,
            ...style
        },
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: `${cssPrefix}-label__inner tl-text-content__wrapper`,
            style: {
                fontSize,
                lineHeight: lineHeight.toString(),
                minHeight: Math.floor(fontSize * lineHeight) + "px",
                minWidth: Math.ceil(textWidth || 0),
                color: labelColor,
                width: textWidth ? Math.ceil(textWidth) : void 0,
                height: textHeight ? Math.ceil(textHeight) : void 0
            },
            children: [
                /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(`${cssPrefix} tl-text tl-text-content`, showTextOutline ? "tl-text__outline" : "tl-text__no-outline"),
                    dir: "auto",
                    children: finalPlainText.split("\n").map((lineOfText, index)=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            dir: "auto",
                            children: lineOfText
                        }, index))
                }),
                (isReadyForEditing || isSelected) && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$shapes$2f$text$2f$PlainTextArea$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlainTextArea"], {
                    ref: rInput,
                    text: plaintext,
                    isEditing,
                    shapeId,
                    ...editableTextRest,
                    handleKeyDown: handleKeyDownCustom ?? editableTextRest.handleKeyDown
                })
            ]
        })
    });
});
;
 //# sourceMappingURL=PlainTextLabel.mjs.map
}),
]);

//# debugId=a233c737-c152-d59a-3d0d-d836ff72ca89
//# sourceMappingURL=c427b_tldraw_dist-esm_lib_shapes_shared_267fbb07._.js.map